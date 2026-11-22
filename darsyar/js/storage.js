// لایه ذخیره‌سازی آفلاین دوگانه درس‌یار ۲.۰ (فایل نیتیو اندروید + LocalStorage) + موتور ارزشیابی عددی/توصیفی و خروجی‌ها
(function (global) {
  'use strict';

  const STORAGE_KEY = 'darsyar_offline_db_v1'; // حفظ کلید جهت سازگاری ۱۰۰٪ با نسخه قبلی

  const CLASS_COLORS = [
    '#0B6E75', '#059669', '#2563EB', '#7C3AED',
    '#DB2777', '#EA580C', '#4F46E5', '#B45309'
  ];

  // سطوح رسمی ارزشیابی کیفی-توصیفی آموزش و پرورش ایران
  const DESC_LEVELS = [
    { key: 'vg', score20: 19.5, label: 'خیلی خوب', short: 'خ.خوب', badgeCls: 'badge-success', pillCls: 'active-vg' },
    { key: 'g',  score20: 17,   label: 'خوب',       short: 'خوب',   badgeCls: 'badge-info',    pillCls: 'active-g'  },
    { key: 's',  score20: 14,   label: 'قابل قبول', short: 'ق.قبول', badgeCls: 'badge-warning', pillCls: 'active-s'  },
    { key: 'ni', score20: 10,   label: 'نیاز به تلاش بیشتر', short: 'نیاز به تلاش', badgeCls: 'badge-danger', pillCls: 'active-ni' }
  ];

  function score20ToDescriptive(val20) {
    if (val20 === null || val20 === undefined || isNaN(Number(val20))) {
      return { key: '', label: 'ثبت‌نشده', short: '—', badgeCls: 'badge-muted', pillCls: '' };
    }
    const n = Number(val20);
    if (n >= 18) return DESC_LEVELS[0];
    if (n >= 15) return DESC_LEVELS[1];
    if (n >= 12) return DESC_LEVELS[2];
    return DESC_LEVELS[3];
  }

  const AUTO_BACKUP_KEY = 'darsyar_auto_backup_v1';
  const BACKUP_ENC_KIND = 'darsyar-encrypted-backup-v1';
  const BACKUP_REMIND_DAYS = 7;
  const ENC_ITERATIONS = 150000;

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  }

  function createEmptyDb() {
    return {
      version: 2,
      updatedAt: new Date().toISOString(),
      settings: {
        teacherName: '',
        schoolName: '',
        academicYear: '۱۴۰۵-۱۴۰۶',
        darkMode: false,
        themePalette: 'teal', // teal | emerald | sapphire | amber
        pinCode: '',          // رمز ۴ رقمی اختیاری
        activeClassId: '',
        isSampleLoaded: false
        // backupIncludePhotos عمداً اینجا هم نیست؛ نبودنِ کلید = «عکس‌ها در پشتیبان باشند»
        
      },
      classes: [],
      students: [],
      attendance: [],
      assessments: [],
      homeworks: [],
      behaviors: [],
      timetable: [],
      lessons: [],
      events: [],
      seating: {},
      sessions: [],
      fees: []
    };
  }

  let db = createEmptyDb();
  let audioCtx = null;
  // The original database key and schema stay unchanged. A separate marker only
  // records whether the browser copy still needs to be synchronized to Android.
  const NATIVE_PENDING_KEY = 'darsyar_native_pending_v1';
  let hadPersistedData = false;
  let storageProtected = false;
  let storageNotice = '';
  let recoveryRaw = null;
  let lastStorageWarning = 0;

  function warnStorage(message) {
    const now = Date.now();
    if (now - lastStorageWarning < 3000) return;
    lastStorageWarning = now;
    // Display after the caller's own toast, so a false success is not the last message.
    if (global.App && typeof global.App.toast === 'function') {
      setTimeout(function () { global.App.toast(message); }, 0);
    }
  }

  function parseStoredCandidate(raw, source) {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
      if (!Array.isArray(parsed.classes)) return null;
      const normalized = normalizeDb(parsed);
      const stamp = Date.parse(parsed.updatedAt || '');
      return { source: source, raw: raw, db: normalized, stamp: Number.isFinite(stamp) ? stamp : 0 };
    } catch (e) {
      return null;
    }
  }

  function getAudioCtx() {
    try {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
      }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function hasNativeBridge() {
    return typeof global.AndroidBridge !== 'undefined' && global.AndroidBridge !== null;
  }

  function normalizeDb(parsed) {
    const base = createEmptyDb();
    if (!parsed || typeof parsed !== 'object') return base;
    // Retain unknown top-level fields from older/newer backups instead of
    // silently dropping user data when this version writes the database again.
    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(base, key)) Object.defineProperty(base, key, { value: parsed[key], enumerable: true, writable: true, configurable: true });
    });
    base.version = 2;
    base.updatedAt = parsed.updatedAt || base.updatedAt;
    base.settings = Object.assign({}, base.settings, parsed.settings || {});
    if (!base.settings.themePalette) base.settings.themePalette = 'teal';
    if (typeof base.settings.pinCode !== 'string') base.settings.pinCode = '';
    // backupIncludePhotos عمداً در normalizeDb نوشته نمی‌شود تا پایگاه‌داده‌های قدیمی
    // بی‌دلیل تغییر نکنند؛ مقدار «تعریف‌نشده» در خواندن به معنی «با عکس» است.

    const arrKeys = [
      'classes', 'students', 'attendance', 'assessments',
      'homeworks', 'behaviors', 'timetable', 'lessons',
      'events', 'sessions', 'fees'
    ];
    arrKeys.forEach(function (k) {
      base[k] = Array.isArray(parsed[k]) ? parsed[k] : [];
    });
    base.classes.forEach(function (c) {
      if (!c.gradingMode) c.gradingMode = 'numeric'; // numeric | descriptive
    });
    // عکس نامعتبر یا بیش از حد بزرگ در بارگذاری حذف می‌شود تا رابط کاربری و حافظه سالم بماند.
    base.students.forEach(function (s) {
      if (s && s.photo !== undefined && !isValidStudentPhoto(s.photo)) delete s.photo;
    });
    base.seating = (parsed.seating && typeof parsed.seating === 'object') ? parsed.seating : {};
    if (base.classes.length > 0) {
      const exists = base.classes.some(function (c) { return c.id === base.settings.activeClassId; });
      if (!exists) base.settings.activeClassId = base.classes[0].id;
    } else {
      base.settings.activeClassId = '';
    }
    return base;
  }

  function load() {
    let nativeRaw = '', localRaw = '', tempRaw = '', pending = false;
    const bridge = hasNativeBridge() && typeof global.AndroidBridge.loadDatabase === 'function';
    if (bridge) {
      try { nativeRaw = global.AndroidBridge.loadDatabase() || ''; }
      catch (e) { nativeRaw = '__DARSYAR_READ_ERROR__'; }
      if (typeof global.AndroidBridge.loadTemporaryDatabase === 'function') {
        try { tempRaw = global.AndroidBridge.loadTemporaryDatabase() || ''; }
        catch (e) { tempRaw = '__DARSYAR_READ_ERROR__'; }
      }
    }
    try {
      localRaw = localStorage.getItem(STORAGE_KEY) || '';
      pending = localStorage.getItem(NATIVE_PENDING_KEY) === '1';
    } catch (e) {}

    hadPersistedData = !!(nativeRaw || localRaw || tempRaw);
    storageProtected = false;
    storageNotice = '';
    recoveryRaw = null;
    const native = parseStoredCandidate(nativeRaw, 'native');
    const local = parseStoredCandidate(localRaw, 'local');
    const temp = parseStoredCandidate(tempRaw, 'temporary');
    let chosen = native || local || temp;
    // Native is normally authoritative. If the last write was not committed to
    // it, the explicitly pending local copy wins even if the device clock changed.
    if (pending && local) chosen = local;
    else if (chosen) {
      [local, temp].forEach(function (candidate) {
        if (candidate && candidate !== chosen && candidate.stamp && chosen.stamp && candidate.stamp > chosen.stamp) {
          chosen = candidate;
        }
      });
    }
    if (chosen) {
      db = chosen.db;
      if (bridge && chosen.source !== 'native' && nativeRaw !== chosen.raw) {
        storageNotice = 'اطلاعات از رونوشت سالم بازیابی شد؛ لطفاً یک پشتیبان تازه بگیرید.';
      }
    } else {
      db = createEmptyDb();
      if (hadPersistedData) {
        storageProtected = true;
        recoveryRaw = { native: nativeRaw, local: localRaw, temporary: tempRaw };
        storageNotice = 'خواندن اطلاعات ممکن نیست؛ برای جلوگیری از حذف، ذخیره متوقف شد. از تنظیمات یک پشتیبان معتبر بازیابی کنید.';
      }
    }
    // نخستین اجرای هر روز یک نسخهٔ خودکار محلی می‌سازد تا بازیابی سریع ممکن باشد.
    try { if (!storageProtected) autoBackupSnapshot(); } catch (e) {}
    return db;
  }

  function save() {
    if (storageProtected) {
      warnStorage('ذخیره متوقف است تا اطلاعات آسیب‌دیده بازنویسی نشوند؛ یک پشتیبان معتبر بازیابی کنید.');
      return false;
    }
    db.updatedAt = new Date().toISOString();
    const json = JSON.stringify(db);
    const nativeAvailable = hasNativeBridge() && typeof global.AndroidBridge.saveDatabase === 'function';
    let localOk = false, nativeOk = false;
    try {
      localStorage.setItem(STORAGE_KEY, json);
      localOk = true;
      if (nativeAvailable) localStorage.setItem(NATIVE_PENDING_KEY, '1');
    } catch (e) {}
    if (nativeAvailable) {
      try { nativeOk = global.AndroidBridge.saveDatabase(json) === true; } catch (e) {}
      if (nativeOk) {
        try { localStorage.removeItem(NATIVE_PENDING_KEY); } catch (e) {}
      }
    }
    if (localOk || nativeOk) {
      hadPersistedData = true;
      try { autoBackupSnapshot(); } catch (e) {}
    }
    if (!localOk && !nativeOk) {
      warnStorage('خطا: تغییرات ذخیره نشدند. فضای دستگاه را بررسی و پشتیبان تهیه کنید.');
      return false;
    }
    if (nativeAvailable && !nativeOk) {
      warnStorage('ذخیره اصلی ناموفق بود؛ اطلاعات فعلاً فقط در رونوشت محلی است. فوراً پشتیبان بگیرید.');
    }
    return true;
  }

  function getDb() {
    return db;
  }

  function getActiveClass() {
    if (!db.classes.length) return null;
    let found = db.classes.find(function (c) { return c.id === db.settings.activeClassId; });
    if (!found) {
      found = db.classes[0];
      db.settings.activeClassId = found.id;
    }
    return found;
  }

  function setActiveClass(classId) {
    db.settings.activeClassId = classId;
    save();
  }

  function getClassById(classId) {
    return db.classes.find(function (c) { return c.id === classId; }) || null;
  }

  function getStudentsByClass(classId) {
    return db.students
      .filter(function (s) { return s.classId === classId; })
      .sort(function (a, b) { return String(a.name || '').localeCompare(String(b.name || ''), 'fa'); });
  }

  function getStudentById(studentId) {
    return db.students.find(function (s) { return s.id === studentId; }) || null;
  }

  // محاسبه خلاصه وضعیت تحصیلی (عددی + توصیفی + تفکیک مستمر/پایانی) و انضباطی یک شاگرد
  function computeStudentStats(studentId, classId) {
    const attList = db.attendance.filter(function (a) { return a.classId === classId; });
    let present = 0, absent = 0, late = 0, excused = 0, totalAtt = 0;
    attList.forEach(function (a) {
      const st = a.records && a.records[studentId];
      if (st) {
        totalAtt++;
        if (st === 'present') present++;
        else if (st === 'absent') absent++;
        else if (st === 'late') late++;
        else if (st === 'excused') excused++;
      }
    });
    const attendanceRate = totalAtt > 0 ? Math.round(((present + late * 0.5 + excused) / totalAtt) * 100) : 100;

    const exams = db.assessments.filter(function (ex) { return ex.classId === classId; });
    let weightedSum20 = 0;
    let totalWeight = 0;
    let contSum20 = 0, contW = 0;
    let finalSum20 = 0, finalW = 0;
    const examDetails = [];

    exams.forEach(function (ex) {
      const raw = ex.scores ? ex.scores[studentId] : undefined;
      if (raw !== undefined && raw !== null && raw !== '') {
        const num = Number(raw);
        const max = Number(ex.maxScore) || 20;
        const w = Number(ex.weight) || 1;
        if (!isNaN(num) && max > 0) {
          const norm20 = (num / max) * 20;
          weightedSum20 += norm20 * w;
          totalWeight += w;
          if (ex.category && ex.category.indexOf('پایانی') !== -1) {
            finalSum20 += norm20 * w;
            finalW += w;
          } else {
            contSum20 += norm20 * w;
            contW += w;
          }
          examDetails.push({
            id: ex.id,
            title: ex.title,
            category: ex.category || 'ارزشیابی',
            date: ex.date,
            score: num,
            maxScore: max,
            weight: w,
            norm20: Math.round(norm20 * 100) / 100,
            desc: score20ToDescriptive(norm20)
          });
        }
      }
    });

    const avg20 = totalWeight > 0 ? Math.round((weightedSum20 / totalWeight) * 100) / 100 : null;
    const contAvg20 = contW > 0 ? Math.round((contSum20 / contW) * 100) / 100 : null;
    const finalAvg20 = finalW > 0 ? Math.round((finalSum20 / finalW) * 100) / 100 : null;

    const hws = db.homeworks.filter(function (h) { return h.classId === classId; });
    let hwDone = 0, hwPartial = 0, hwMissing = 0;
    hws.forEach(function (h) {
      const st = h.statuses && h.statuses[studentId];
      if (st === 'done') hwDone++;
      else if (st === 'partial') hwPartial++;
      else if (st === 'missing') hwMissing++;
    });

    const behs = db.behaviors.filter(function (b) { return b.studentId === studentId; });
    let posPoints = 0, negPoints = 0;
    behs.forEach(function (b) {
      const pts = Math.abs(Number(b.points) || 1);
      if (b.type === 'pos') posPoints += pts;
      else negPoints += pts;
    });

    const stuFees = db.fees.filter(function (f) { return f.studentId === studentId; });
    let totalFee = 0, paidFee = 0, dueFee = 0;
    stuFees.forEach(function (f) {
      const amount = Number(f.amount) || 0;
      const paid = Number(f.paidAmount) || 0;
      totalFee += amount;
      paidFee += paid;
      dueFee += Math.max(0, amount - paid);
    });

    return {
      present: present,
      absent: absent,
      late: late,
      excused: excused,
      totalAtt: totalAtt,
      attendanceRate: attendanceRate,
      avg20: avg20,
      contAvg20: contAvg20,
      finalAvg20: finalAvg20,
      descOverall: score20ToDescriptive(avg20),
      examDetails: examDetails,
      hwDone: hwDone,
      hwPartial: hwPartial,
      hwMissing: hwMissing,
      posPoints: posPoints,
      negPoints: negPoints,
      netBehavior: posPoints - negPoints,
      totalFee: totalFee,
      paidFee: paidFee,
      dueFee: dueFee
    };
  }

  // ==================== عکس دانش‌آموز (درس‌یار ۲.۲) ====================
  // فقط data URL تصویری پذیرفته می‌شود؛ سقف حجم، از پشتیبان و حافظهٔ دستگاه محافظت می‌کند.
  const PHOTO_MAX_CHARS = 400000;
  const PHOTO_DATA_URL_RE = /^data:image\/(?:png|jpeg|jpg|webp);base64,[A-Za-z0-9+/]+=*$/;

  function isValidStudentPhoto(value) {
    return typeof value === 'string' && value.length > 0 && value.length <= PHOTO_MAX_CHARS && PHOTO_DATA_URL_RE.test(value);
  }

  // ==================== نظام امتیاز و القاب افتخاری (درس‌یار ۲.۱) ====================
  // پله‌های نشان افتخاری: پیوسته، بدون شکاف امتیازی و قابل استفاده برای تراز مثبت.
  const POINT_TITLES = [
    { key: 'jvane',      min: 0,   max: 50,  label: 'جوانهٔ تلاش',       icon: '🌱', color: '#16A34A' },
    { key: 'poyande',    min: 51,  max: 80,  label: 'پویندهٔ جوان',      icon: '🌻', color: '#65A30D' },
    { key: 'talashgar',  min: 81,  max: 110, label: 'تلاشگر برتر',       icon: '🏅', color: '#0D9488' },
    { key: 'pishgam',    min: 111, max: 140, label: 'پیشگام علم',        icon: '🎯', color: '#2563EB' },
    { key: 'nabeghe',    min: 141, max: 170, label: 'نابغهٔ تلاش',       icon: '💎', color: '#7C3AED' },
    { key: 'eftekhar',   min: 171, max: 200, label: 'افتخار کلاس',       icon: '✨', color: '#CA8A04' },
    { key: 'talayedar',  min: 201, max: 230, label: 'طلایه‌دار موفقیت',  icon: '🌟', color: '#EA580C' },
    { key: 'osture',     min: 231, max: null, label: 'اسطورهٔ کلاس',     icon: '👑', color: '#DC2626' }
  ];

  // نشان متناسب با تراز امتیاز + درصد پیشرفت تا نشان بعدی
  function getPointTitle(points) {
    const net = Number(points) || 0;
    let idx = 0;
    for (let i = 0; i < POINT_TITLES.length; i++) {
      if (net >= POINT_TITLES[i].min) idx = i;
    }
    const title = POINT_TITLES[idx];
    const next = POINT_TITLES[idx + 1] || null;
    let progress = 100;
    let remaining = 0;
    if (next) {
      const span = next.min - title.min;
      progress = span > 0 ? Math.round(((net - title.min) / span) * 100) : 0;
      if (progress < 0) progress = 0;
      if (progress > 100) progress = 100;
      remaining = Math.max(0, next.min - net);
    }
    return { index: idx, title: title, next: next, progress: progress, remaining: remaining, net: net };
  }

  // رتبه‌بندی کلاس بر پایه تراز خالص امتیاز (مساوی‌ها بر اساس نام)
  function getClassPointRanking(classId) {
    const rows = getStudentsByClass(classId).map(function (s) {
      const st = computeStudentStats(s.id, classId);
      return {
        student: s,
        net: st.netBehavior,
        pos: st.posPoints,
        neg: st.negPoints,
        info: getPointTitle(st.netBehavior)
      };
    });
    rows.sort(function (a, b) {
      if (b.net !== a.net) return b.net - a.net;
      return String(a.student.name).localeCompare(String(b.student.name), 'fa');
    });
    rows.forEach(function (row, i) { row.rank = i + 1; });
    return rows;
  }

  function pointTotals(classId) {
    const rows = getClassPointRanking(classId);
    let sum = 0;
    let positive = 0;
    rows.forEach(function (r) {
      sum += r.net;
      if (r.net > 0) positive++;
    });
    return { count: rows.length, sum: sum, positive: positive, leader: rows.length ? rows[0] : null };
  }

  // ثبت یک رکورد امتیاز؛ روی همان آرایه behaviors ذخیره می‌شود تا سازگاری داده حفظ شود
  function addPointEntry(studentId, classId, points, label, type) {
    const amount = Math.max(1, Math.min(100, Math.abs(parseInt(points, 10) || 1)));
    const entry = {
      id: uid('beh'),
      classId: classId,
      studentId: studentId,
      date: global.Jalali ? global.Jalali.getTodayStr() : '',
      ts: Date.now(),
      type: type === 'neg' ? 'neg' : 'pos',
      points: amount,
      label: String(label || '').trim(),
      note: ''
    };
    db.behaviors.push(entry);
    return entry;
  }

  // ثبت گروهی: rows = [{studentId, delta}] ؛ مقادیر صفر نادیده گرفته می‌شوند
  function addBatchPointEntries(classId, rows, label) {
    const saved = [];
    (rows || []).forEach(function (r) {
      const delta = parseInt(r.delta, 10) || 0;
      if (!delta) return;
      saved.push(addPointEntry(r.studentId, classId, Math.abs(delta), label, delta < 0 ? 'neg' : 'pos'));
    });
    return saved;
  }

  // صفر کردن تراز با حفظ کامل سوابق: برای هر دانش‌آموز یک رکورد جبرانی ثبت می‌شود
  function resetClassPoints(classId, reason) {
    const rows = getClassPointRanking(classId);
    let count = 0;
    rows.forEach(function (r) {
      if (!r.net) return;
      addPointEntry(r.student.id, classId, Math.abs(r.net), reason || 'صفر کردن تراز امتیازات', r.net > 0 ? 'neg' : 'pos');
      count++;
    });
    return count;
  }

  // متن گزارش امتیاز کلاس (برای کپی، اشتراک‌گذاری یا پیامک به اولیا)
  function buildPointsReport(classId, opts) {
    const options = opts || {};
    const cls = getClassById(classId);
    if (!cls) return '';
    const J = global.Jalali;
    const rows = getClassPointRanking(classId);
    const totals = pointTotals(classId);
    const dateStr = options.date || (J ? J.getTodayStr() : '');
    const nf = function (n) { return J ? J.toFa(n) : String(n); };

    let out = '🏆 گزارش امتیاز و افتخار کلاس\n';
    out += 'کلاس: ' + cls.name + '\n';
    out += 'تاریخ: ' + (dateStr ? (J ? J.formatJalaliHuman(dateStr, true) : dateStr) : '—') + '\n';
    out += 'دانش‌آموز: ' + nf(totals.count) + ' نفر | مجموع امتیاز کلاس: ' + nf(totals.sum) + '\n';
    if (options.teacherName) out += 'دبیر: ' + options.teacherName + '\n';
    out += '————————————\n';

    if (!rows.length) {
      out += 'هنوز دانش‌آموزی در این کلاس ثبت نشده است.\n';
    } else {
      rows.forEach(function (r) {
        out += nf(r.rank) + '. ' + r.student.name + ' — ' + nf(r.net) + ' امتیاز — نشان: ' + r.info.title.label + '\n';
      });
    }

    if (options.includeToday) {
      const todayEntries = db.behaviors.filter(function (b) {
        return b.classId === classId && b.date === dateStr && b.label !== (options.resetReason || 'صفر کردن تراز امتیازات');
      });
      out += '————————————\n';
      if (todayEntries.length) {
        out += '📋 امتیازهای ثبت‌شده امروز (' + nf(todayEntries.length) + ' مورد):\n';
        todayEntries.slice(0, 25).forEach(function (b) {
          const stu = getStudentById(b.studentId);
          out += '• ' + (stu ? stu.name : 'حذف‌شده') + ': ' + (b.type === 'pos' ? '+' : '-') + nf(Math.abs(Number(b.points) || 1)) + (b.label ? ' — ' + b.label : '') + '\n';
        });
        if (todayEntries.length > 25) out += '• و ' + nf(todayEntries.length - 25) + ' مورد دیگر\n';
      } else {
        out += 'امروز هنوز امتیازی ثبت نشده است.\n';
      }
    }

    if (totals.leader) {
      out += '————————————\n';
      out += '🥇 رتبهٔ اول: ' + totals.leader.student.name + ' با ' + nf(totals.leader.net) + ' امتیاز (' + totals.leader.info.title.label + ')\n';
    }
    out += 'گزارش خودکار درس‌یار — ساخته‌شده روی گوشی، بدون ارسال به اینترنت';
    return out;
  }

  // متن پیام امتیاز یک دانش‌آموز برای ولی
  function buildStudentPointsMessage(studentId, classId) {
    const stu = getStudentById(studentId);
    if (!stu) return '';
    const st = computeStudentStats(studentId, classId);
    const info = getPointTitle(st.netBehavior);
    const rows = getClassPointRanking(classId);
    const mine = rows.filter(function (r) { return r.student.id === studentId; })[0];
    const J = global.Jalali;
    const nf = function (n) { return J ? J.toFa(n) : String(n); };
    let out = '👤 ' + stu.name + '\n';
    out += 'تراز امتیاز: ' + nf(st.netBehavior) + ' (مثبت ' + nf(st.posPoints) + ' / منفی ' + nf(st.negPoints) + ')\n';
    out += 'نشان فعلی: ' + info.title.icon + ' ' + info.title.label + '\n';
    if (mine) out += 'رتبهٔ کلاسی: ' + nf(mine.rank) + ' از ' + nf(rows.length) + '\n';
    if (info.next) out += 'تا نشان «' + info.next.label + '»: ' + nf(info.remaining) + ' امتیاز\n';
    out += 'با تشکر از همراهی شما — درس‌یار';
    return out;
  }

  function deleteClassCascade(classId) {
    db.classes = db.classes.filter(function (c) { return c.id !== classId; });
    db.students = db.students.filter(function (s) { return s.classId !== classId; });
    db.attendance = db.attendance.filter(function (a) { return a.classId !== classId; });
    db.assessments = db.assessments.filter(function (a) { return a.classId !== classId; });
    db.homeworks = db.homeworks.filter(function (h) { return h.classId !== classId; });
    db.behaviors = db.behaviors.filter(function (b) { return b.classId !== classId; });
    db.timetable = db.timetable.filter(function (t) { return t.classId !== classId; });
    db.lessons = db.lessons.filter(function (l) { return l.classId !== classId; });
    db.events = db.events.filter(function (e) { return e.classId !== classId; });
    db.sessions = db.sessions.filter(function (s) { return s.classId !== classId; });
    db.fees = db.fees.filter(function (f) { return f.studentId && false ? false : f.classId !== classId; });
    delete db.seating[classId];
    if (db.settings.activeClassId === classId) {
      db.settings.activeClassId = db.classes.length ? db.classes[0].id : '';
    }
    save();
  }

  function deleteStudentCascade(studentId) {
    db.students = db.students.filter(function (s) { return s.id !== studentId; });
    db.attendance.forEach(function (a) { if (a.records) delete a.records[studentId]; });
    db.assessments.forEach(function (ex) { if (ex.scores) delete ex.scores[studentId]; });
    db.homeworks.forEach(function (h) { if (h.statuses) delete h.statuses[studentId]; });
    db.behaviors = db.behaviors.filter(function (b) { return b.studentId !== studentId; });
    db.sessions = db.sessions.filter(function (s) { return s.studentId !== studentId; });
    db.fees = db.fees.filter(function (f) { return f.studentId !== studentId; });
    Object.keys(db.seating).forEach(function (cid) {
      const map = db.seating[cid] && db.seating[cid].seats;
      if (map) {
        Object.keys(map).forEach(function (k) {
          if (map[k] === studentId) delete map[k];
        });
      }
    });
    save();
  }

  function exportFile(filename, mimeType, content) {
    if (hasNativeBridge() && typeof global.AndroidBridge.exportFile === 'function') {
      global.AndroidBridge.exportFile(filename, mimeType, content);
      return;
    }
    const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
    if (global.App) global.App.toast('فایل آماده ذخیره شد ✓');
  }

  function exportBase64Image(filename, dataUrl) {
    if (hasNativeBridge() && typeof global.AndroidBridge.exportBase64File === 'function') {
      global.AndroidBridge.exportBase64File(filename, 'image/png', dataUrl);
      return;
    }
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { document.body.removeChild(a); }, 200);
    if (global.App) global.App.toast('تصویر تخته آماده ذخیره شد ✓');
  }

  function exportCsv(filename, headers, rows) {
    const esc = function (cell) {
      let s = cell === null || cell === undefined ? '' : String(cell);
      // Text beginning with a formula operator must not run when CSV is opened
      // in a spreadsheet. Real numeric values (including negatives) stay numeric.
      if (typeof cell === 'string' && /^[\s]*[=+@-]/.test(s)) s = "'" + s;
      if (/[",\n\r]/.test(s)) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const lines = [headers.map(esc).join(',')];
    rows.forEach(function (r) {
      lines.push(r.map(esc).join(','));
    });
    const csvWithBom = '\uFEFF' + lines.join('\r\n');
    exportFile(filename, 'text/csv', csvWithBom);
  }

  // اگر کاربر خواسته باشد پشتیبان بدون عکس باشد، رونوشت سبک ساخته می‌شود؛
  // خودِ پایگاه‌داده محلی دست‌نخورده می‌ماند.
  function getBackupPayload() {
    const includePhotos = db.settings ? db.settings.backupIncludePhotos !== false : true;
    if (includePhotos) return { includePhotos: true, data: db };
    let clone;
    try {
      clone = JSON.parse(JSON.stringify(db));
    } catch (e) {
      return { includePhotos: true, data: db };
    }
    (Array.isArray(clone.students) ? clone.students : []).forEach(function (s) {
      if (s && typeof s === 'object') delete s.photo;
    });
    return { includePhotos: false, data: clone };
  }

  function exportBackupJson() {
    if (storageProtected) {
      if (global.App) global.App.toast('اطلاعات خوانده نشده‌اند؛ پشتیبان خالی ساخته نشد. رونوشت خام را خصوصی ذخیره کنید.');
      return false;
    }
    const dateTag = global.Jalali.toEn(global.Jalali.getTodayStr()).replace(/\//g, '-');
    const payload = getBackupPayload();
    exportFile('DarsYar-Backup-' + dateTag + (payload.includePhotos ? '' : '-no-photos') + '.json',
      'application/json', JSON.stringify(payload.data, null, 2));
    return true;
  }

  function setBackupIncludePhotos(flag) {
    db.settings.backupIncludePhotos = flag !== false;
    save();
    return db.settings.backupIncludePhotos;
  }

  // ---------- حالت پشتیبان: رمزدار (پیش‌فرض) یا بدون رمز ----------
  function setBackupMode(mode) {
    db.settings.backupMode = mode === 'plain' ? 'plain' : 'encrypted';
    save();
    return db.settings.backupMode;
  }

  function getBackupMode() {
    return db.settings.backupMode === 'plain' ? 'plain' : 'encrypted';
  }

  function markBackupTaken() {
    db.settings.lastBackupAt = new Date().toISOString();
    save();
  }

  function daysSinceBackup() {
    const last = db.settings.lastBackupAt;
    if (!last) return null;
    const t = Date.parse(last);
    if (!isFinite(t)) return null;
    return Math.floor((Date.now() - t) / 86400000);
  }

  function needsBackupReminder() {
    if (!Array.isArray(db.students) || !db.students.length) return false;
    const today = new Date().toISOString().slice(0, 10);
    if (db.settings.backupRemindDismissedDay === today) return false;
    const d = daysSinceBackup();
    return d === null || d >= BACKUP_REMIND_DAYS;
  }

  function dismissBackupReminder() {
    db.settings.backupRemindDismissedDay = new Date().toISOString().slice(0, 10);
    save();
  }

  // ---------- نسخهٔ خودکار روزانه (فقط محلی، برای بازیابی سریع) ----------
  function autoBackupSnapshot() {
    if (!db || !Array.isArray(db.classes) || !db.classes.length) return false;
    const today = new Date().toISOString().slice(0, 10);
    try {
      const prev = localStorage.getItem(AUTO_BACKUP_KEY);
      if (prev) {
        try { if (JSON.parse(prev).day === today) return false; } catch (e) {}
      }
    } catch (e) { return false; }
    const record = { day: today, at: new Date().toISOString(), photosOmitted: false, db: db };
    try {
      localStorage.setItem(AUTO_BACKUP_KEY, JSON.stringify(record));
      return true;
    } catch (e) {
      // فضای ذخیره‌سازی کم است: نسخهٔ خودکار را بدون عکس نگه می‌داریم.
      try {
        const slim = JSON.parse(JSON.stringify(db));
        (slim.students || []).forEach(function (s) { if (s) delete s.photo; });
        record.db = slim;
        record.photosOmitted = true;
        localStorage.setItem(AUTO_BACKUP_KEY, JSON.stringify(record));
        return true;
      } catch (e2) { return false; }
    }
  }

  function getAutoBackupInfo() {
    try {
      const raw = localStorage.getItem(AUTO_BACKUP_KEY);
      if (!raw) return null;
      const rec = JSON.parse(raw);
      if (!rec || !rec.db || !Array.isArray(rec.db.classes)) return null;
      return {
        day: rec.day, at: rec.at, photosOmitted: !!rec.photosOmitted,
        classes: rec.db.classes.length,
        students: (rec.db.students || []).length
      };
    } catch (e) { return null; }
  }

  function restoreAutoBackup() {
    try {
      const raw = localStorage.getItem(AUTO_BACKUP_KEY);
      if (!raw) return false;
      const rec = JSON.parse(raw);
      if (!rec || !rec.db) return false;
      db = normalizeDb(rec.db);
      save();
      if (global.App) { global.App.applyTheme(); global.App.render(); }
      return true;
    } catch (e) { return false; }
  }

  // ---------- رمزگذاری پشتیبان (AES-GCM + PBKDF2، کاملاً آفلاین) ----------
  function bytesToB64(bytes) {
    let s = '';
    const CH = 0x8000;
    for (let i = 0; i < bytes.length; i += CH) {
      s += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    }
    return btoa(s);
  }

  function b64ToBytes(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function cryptoAvailable() {
    return !!(global.crypto && global.crypto.subtle && typeof global.TextEncoder === 'function');
  }

  async function deriveBackupKey(password, salt, iterations, usage) {
    const enc = new TextEncoder();
    const base = await global.crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
    return global.crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, [usage]
    );
  }

  async function encryptBackupString(plainText, password) {
    if (!cryptoAvailable()) throw new Error('NOSUBTLE');
    if (!password || String(password).length < 4) throw new Error('WEAKPASS');
    const enc = new TextEncoder();
    const salt = global.crypto.getRandomValues(new Uint8Array(16));
    const iv = global.crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveBackupKey(String(password), salt, ENC_ITERATIONS, 'encrypt');
    const cipher = await global.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(plainText));
    return JSON.stringify({
      kind: BACKUP_ENC_KIND,
      createdAt: new Date().toISOString(),
      app: 'DarsYar',
      kdf: { name: 'PBKDF2-SHA256', iterations: ENC_ITERATIONS, salt: bytesToB64(salt) },
      cipher: { name: 'AES-GCM', iv: bytesToB64(iv) },
      payload: bytesToB64(new Uint8Array(cipher))
    }, null, 2);
  }

  function isEncryptedBackup(text) {
    try {
      const o = JSON.parse(text);
      return !!(o && o.kind === BACKUP_ENC_KIND && typeof o.payload === 'string');
    } catch (e) { return false; }
  }

  async function decryptBackupString(envelopeText, password) {
    if (!cryptoAvailable()) throw new Error('NOSUBTLE');
    const env = JSON.parse(envelopeText);
    if (!env || env.kind !== BACKUP_ENC_KIND) throw new Error('NOTENCRYPTED');
    const iterations = Number((env.kdf || {}).iterations) || ENC_ITERATIONS;
    const salt = b64ToBytes(env.kdf.salt);
    const iv = b64ToBytes(env.cipher.iv);
    let key;
    try {
      key = await deriveBackupKey(String(password || ''), salt, iterations, 'decrypt');
    } catch (e) { throw new Error('BADKEY'); }
    let plain;
    try {
      plain = await global.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, b64ToBytes(env.payload));
    } catch (e) {
      throw new Error('BADPASSWORD');
    }
    return new TextDecoder('utf-8').decode(new Uint8Array(plain));
  }

  // خروجی پشتیبان: ورودی اختیاری رمز. بدون رمز در حالت «رمزدار» انجام نمی‌شود.
  async function exportBackupJson(password) {
    if (storageProtected) {
      if (global.App) global.App.toast('اطلاعات خوانده نشده‌اند؛ پشتیبان خالی ساخته نشد. رونوشت خام را خصوصی ذخیره کنید.');
      return { ok: false, reason: 'protected' };
    }
    const dateTag = global.Jalali.toEn(global.Jalali.getTodayStr()).replace(/\//g, '-');
    const payload = getBackupPayload();
    const plain = JSON.stringify(payload.data, null, 2);
    const encrypted = getBackupMode() === 'encrypted';
    if (encrypted) {
      if (!password) return { ok: false, reason: 'need-password' };
      if (!cryptoAvailable()) return { ok: false, reason: 'no-crypto' };
      let envelope;
      try { envelope = await encryptBackupString(plain, password); }
      catch (e) { return { ok: false, reason: e && e.message === 'WEAKPASS' ? 'weak-password' : 'encrypt-failed' }; }
      exportFile('DarsYar-Backup-' + dateTag + (payload.includePhotos ? '' : '-no-photos') + '.dsy.json',
        'application/json', envelope);
    } else {
      exportFile('DarsYar-Backup-' + dateTag + (payload.includePhotos ? '' : '-no-photos') + '.json',
        'application/json', plain);
    }
    markBackupTaken();
    return { ok: true, encrypted: encrypted, includePhotos: payload.includePhotos };
  }

  // بازیابی: هم فایل ساده و هم فایل رمزدار را می‌پذیرد.
  async function importBackupText(text, password) {
    if (isEncryptedBackup(text)) {
      if (!password) return { ok: false, reason: 'need-password' };
      let plain;
      try { plain = await decryptBackupString(text, password); }
      catch (e) { return { ok: false, reason: 'bad-password' }; }
      const ok = importBackupFromString(plain);
      return { ok: ok, decrypted: true };
    }
    const ok = importBackupFromString(text);
    return { ok: ok, decrypted: false };
  }

  function exportRawRecovery() {
    if (!storageProtected || !recoveryRaw) return false;
    const raw = {
      kind: 'darsyar-raw-recovery-not-a-normal-backup',
      exportedAt: new Date().toISOString(),
      native: recoveryRaw.native,
      local: recoveryRaw.local,
      temporary: recoveryRaw.temporary
    };
    // This diagnostic file can contain private student data. It is not encrypted.
    exportFile('DarsYar-Recovery-RAW.json', 'application/json', JSON.stringify(raw, null, 2));
    return true;
  }

  function importBackupFromString(jsonStr) {
    let replacement;
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed) || !Array.isArray(parsed.classes)) {
        throw new Error('فرمت نامعتبر');
      }
      const arrays = ['classes', 'students', 'attendance', 'assessments', 'homeworks', 'behaviors',
        'timetable', 'lessons', 'events', 'sessions', 'fees'];
      arrays.forEach(function (k) {
        if (parsed[k] !== undefined && (!Array.isArray(parsed[k]) || parsed[k].some(function (v) {
          return !v || typeof v !== 'object' || Array.isArray(v);
        }))) throw new Error('داده نامعتبر');
      });
      if (parsed.settings !== undefined && (!parsed.settings || typeof parsed.settings !== 'object' || Array.isArray(parsed.settings))) throw new Error('تنظیمات نامعتبر');
      if (parsed.seating !== undefined && (!parsed.seating || typeof parsed.seating !== 'object' || Array.isArray(parsed.seating))) throw new Error('چیدمان نامعتبر');
      // App-created names are strings. Reject a malformed backup before saving,
      // rather than persisting data that will crash initials/sorting on screen.
      ['classes', 'students'].forEach(function (k) {
        (parsed[k] || []).forEach(function (item) {
          if (item.name !== undefined && typeof item.name !== 'string') throw new Error('نام نامعتبر');
        });
      });
      replacement = normalizeDb(parsed);
    } catch (e) {
      if (global.App) global.App.toast('فایل پشتیبان معتبر نیست؛ اطلاعات فعلی حفظ شد.');
      return false;
    }
    // A restore is an explicit operation. Do not claim success if neither copy
    // could be saved, and do not discard the previous in-memory database.
    const previous = db;
    const previouslyProtected = storageProtected;
    db = replacement;
    storageProtected = false;
    if (!save()) {
      db = previous;
      storageProtected = previouslyProtected;
      if (global.App) global.App.toast('بازیابی ذخیره نشد؛ اطلاعات قبلی حفظ شد.');
      return false;
    }
    recoveryRaw = null;
    if (global.App) {
      global.App.applyTheme();
      global.App.render();
      global.App.toast('فایل پشتیبان با موفقیت بازیابی شد ✓');
    }
    return true;
  }

  global.__onNativeBackupImported = function (b64) {
    try {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const text = new TextDecoder('utf-8').decode(bytes);
      if (isEncryptedBackup(text)) {
        if (global.ToolModules && typeof global.ToolModules.askRestorePassword === 'function') {
          global.ToolModules.askRestorePassword(text);
        } else if (global.App) { global.App.toast('این پشتیبان رمزدار است و در این نسخه باز نمی‌شود.'); }
        return;
      }
      importBackupFromString(text);
    } catch (e) {
      if (global.App) global.App.toast('خطا در خوانش فایل پشتیبان');
    }
  };

  global.__onNativeToastB64 = function (b64) {
    try {
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const msg = new TextDecoder('utf-8').decode(bytes);
      if (global.App) global.App.toast(msg);
    } catch (e) {}
  };

  function printReportHtml(jobTitle, innerHtml) {
    const safeTitle = String(jobTitle || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const fullHtml = '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="utf-8">' +
      '<title>' + safeTitle + '</title>' +
      '<style>' +
        '@font-face { font-family: "Vazirmatn"; src: url("fonts/Vazirmatn.woff2") format("woff2"); font-weight: 100 900; }' +
        '* { box-sizing: border-box; font-family: "Vazirmatn", Tahoma, sans-serif; }' +
        'body { direction: rtl; margin: 0; padding: 18px; color: #0F172A; font-size: 12.5px; line-height: 1.65; background: #fff; }' +
        '.report-box { border: 2px solid #0B6E75; border-radius: 14px; padding: 16px; margin-bottom: 18px; page-break-inside: avoid; }' +
        '.report-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 12px; }' +
        'h1, h2, h3 { margin: 0 0 6px 0; color: #0B6E75; }' +
        'table { width: 100%; border-collapse: collapse; margin: 10px 0; }' +
        'th, td { border: 1px solid #CBD5E1; padding: 7px 9px; text-align: right; }' +
        'th { background: #F1F5F9; font-weight: 800; }' +
        '.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 10px 0; }' +
        '.stat-box { border: 1px solid #CBD5E1; border-radius: 8px; padding: 8px; text-align: center; background: #F8FAFC; }' +
        '.page-break { page-break-after: always; }' +
      '</style></head><body>' + innerHtml + '</body></html>';

    if (hasNativeBridge() && typeof global.AndroidBridge.printHtml === 'function') {
      global.AndroidBridge.printHtml(jobTitle, fullHtml);
      return;
    }
    const w = window.open('', '_blank');
    if (w) {
      w.document.open();
      w.document.write(fullHtml);
      w.document.close();
      setTimeout(function () { w.focus(); w.print(); }, 350);
    } else if (global.App) {
      global.App.toast('پنجره چاپ در پیش‌نمایش مسدود شد؛ در فایل APK مستقیم به PDF تبدیل می‌شود.');
    }
  }

  function shareText(title, body) {
    if (hasNativeBridge() && typeof global.AndroidBridge.shareText === 'function') {
      global.AndroidBridge.shareText(title, body);
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body).then(function () {
        if (global.App) global.App.toast('متن در حافظه کپی شد ✓');
      });
    }
  }

  function copyText(text) {
    if (hasNativeBridge() && typeof global.AndroidBridge.copyText === 'function') {
      global.AndroidBridge.copyText(text || '');
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text || '').then(function () {
        if (global.App) global.App.toast('در حافظه کپی شد ✓');
      });
    } else if (global.App) {
      global.App.toast('متن آماده کپی: ' + text);
    }
  }

  function sendSms(phone, body) {
    if (hasNativeBridge() && typeof global.AndroidBridge.sendSms === 'function') {
      global.AndroidBridge.sendSms(phone || '', body || '');
      return;
    }
    shareText('پیام به ولی', body);
  }

  function dialPhone(phone) {
    if (!phone) return;
    if (hasNativeBridge() && typeof global.AndroidBridge.dialPhone === 'function') {
      global.AndroidBridge.dialPhone(phone);
      return;
    }
    window.location.href = 'tel:' + phone;
  }

  function vibrate(ms) {
    if (hasNativeBridge() && typeof global.AndroidBridge.vibrate === 'function') {
      global.AndroidBridge.vibrate(ms || 35);
    } else if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(ms || 35);
    }
  }

  function playTone(freq, durationSec, type, gainVal) {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq || 660;
      gain.gain.setValueAtTime(gainVal || 0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (durationSec || 0.12));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (durationSec || 0.12));
    } catch (e) {}
  }

  function playWheelTick() {
    playTone(720, 0.04, 'triangle', 0.08);
  }

  function playWinFanfare() {
    vibrate(90);
    playTone(523.25, 0.16, 'sine', 0.15);
    setTimeout(function () { playTone(659.25, 0.16, 'sine', 0.15); }, 110);
    setTimeout(function () { playTone(783.99, 0.35, 'sine', 0.18); }, 220);
  }

  function playPointFeedback(isPos) {
    vibrate(25);
    if (isPos) {
      playTone(660, 0.1, 'sine', 0.1);
      setTimeout(function () { playTone(880, 0.15, 'sine', 0.11); }, 80);
    } else {
      playTone(300, 0.18, 'triangle', 0.1);
    }
  }

  function playAlarm() {
    playWinFanfare();
    if (hasNativeBridge() && typeof global.AndroidBridge.playTimerAlarm === 'function') {
      global.AndroidBridge.playTimerAlarm();
    }
  }

  function loadSampleData() {
    const today = global.Jalali.getTodayStr();
    const d1 = global.Jalali.addJalaliDays(today, -5);
    const d2 = global.Jalali.addJalaliDays(today, -2);
    const dNext = global.Jalali.addJalaliDays(today, 3);
    const todayWd = global.Jalali.getWeekdayFromStr(today).index;

    const c1 = 'cls_sample_math9';
    const cDesc = 'cls_sample_elem4';
    const c2 = 'cls_sample_priv';

    const sampleStudents1 = [
      { id: 'stu_1', classId: c1, name: 'امیرعلی رضایی', code: '۱۰۱', parentName: 'آقای رضایی', parentPhone: '', avatarColor: '#0B6E75', notes: 'علاقه‌مند به المپیاد ریاضی' },
      { id: 'stu_2', classId: c1, name: 'محمدمهدی کریمی', code: '۱۰۲', parentName: 'آقای کریمی', parentPhone: '', avatarColor: '#2563EB', notes: '' },
      { id: 'stu_3', classId: c1, name: 'کیان حسینی', code: '۱۰۳', parentName: 'خانم حسینی', parentPhone: '', avatarColor: '#7C3AED', notes: 'نیازمند تمرین بیشتر در اتحادها' },
      { id: 'stu_4', classId: c1, name: 'پارسا محمدی', code: '۱۰۴', parentName: 'آقای محمدی', parentPhone: '', avatarColor: '#DB2777', notes: '' },
      { id: 'stu_5', classId: c1, name: 'آرتین مرادی', code: '۱۰۵', parentName: 'آقای مرادی', parentPhone: '', avatarColor: '#EA580C', notes: 'مشارکت کلاسی عالی' },
      { id: 'stu_6', classId: c1, name: 'سینا احمدی', code: '۱۰۶', parentName: 'خانم احمدی', parentPhone: '', avatarColor: '#059669', notes: '' }
    ];

    const sampleStudentsElem = [
      { id: 'stu_e1', classId: cDesc, name: 'رادین کاظمی', code: '۱', parentName: 'آقای کاظمی', parentPhone: '', avatarColor: '#059669', notes: 'کنجکاو در آزمایشگاه علوم' },
      { id: 'stu_e2', classId: cDesc, name: 'ماهان جعفری', code: '۲', parentName: 'خانم جعفری', parentPhone: '', avatarColor: '#2563EB', notes: '' },
      { id: 'stu_e3', classId: cDesc, name: 'امیرعباس نوری', code: '۳', parentName: 'آقای نوری', parentPhone: '', avatarColor: '#EA580C', notes: 'نیاز به تشویق در کار گروهی' },
      { id: 'stu_e4', classId: cDesc, name: 'طاها قاسمی', code: '۴', parentName: 'آقای قاسمی', parentPhone: '', avatarColor: '#7C3AED', notes: '' }
    ];

    const sampleStudents2 = [
      { id: 'stu_7', classId: c2, name: 'سارا عباسی', code: '۲۰۱', parentName: 'خانم عباسی', parentPhone: '', avatarColor: '#4F46E5', notes: 'آمادگی کنکور تجربی' },
      { id: 'stu_8', classId: c2, name: 'نازنین صادقی', code: '۲۰۲', parentName: 'آقای صادقی', parentPhone: '', avatarColor: '#B45309', notes: 'جلسات دوشنبه و پنجشنبه' }
    ];

    const keepDark = db.settings.darkMode;
    const keepPalette = db.settings.themePalette || 'teal';
    const keepPin = db.settings.pinCode || '';
    db = createEmptyDb();
    db.settings = {
      teacherName: 'استاد نمونه',
      schoolName: 'دبیرستان و دبستان نمونه فرهنگیان',
      academicYear: '۱۴۰۵-۱۴۰۶',
      darkMode: keepDark,
      themePalette: keepPalette,
      pinCode: keepPin,
      activeClassId: c1,
      isSampleLoaded: true
    };

    db.classes = [
      { id: c1, name: 'ریاضی نهم - کلاس الف', subject: 'ریاضی', gradeLevel: 'پایه نهم', type: 'school', gradingMode: 'numeric', color: '#0B6E75', defaultFee: 0, room: 'کلاس ۲۰۴', notes: 'ارزشیابی عددی ۰ تا ۲۰' },
      { id: cDesc, name: 'علوم چهارم ابتدایی', subject: 'علوم تجربی', gradeLevel: 'پایه چهارم', type: 'school', gradingMode: 'descriptive', color: '#059669', defaultFee: 0, room: 'کلاس ۱۰۱', notes: 'ارزشیابی کیفی-توصیفی ۴ سطحی' },
      { id: c2, name: 'تدریس خصوصی کنکور', subject: 'ریاضی تجربی', gradeLevel: 'دوازدهم', type: 'private', gradingMode: 'numeric', color: '#7C3AED', defaultFee: 1800000, room: 'آموزشگاه / آنلاین', notes: 'شهریه ماهانه ۴ جلسه' }
    ];

    db.students = sampleStudents1.concat(sampleStudentsElem).concat(sampleStudents2);

    db.attendance = [
      { id: uid('att'), classId: c1, date: d1, records: { stu_1: 'present', stu_2: 'present', stu_3: 'absent', stu_4: 'present', stu_5: 'present', stu_6: 'late' }, note: 'تدریس فصل اول' },
      { id: uid('att'), classId: c1, date: d2, records: { stu_1: 'present', stu_2: 'present', stu_3: 'present', stu_4: 'excused', stu_5: 'present', stu_6: 'present' }, note: 'حل تمرین مجموعه‌ها' },
      { id: uid('att'), classId: c1, date: today, records: { stu_1: 'present', stu_2: 'present', stu_3: 'present', stu_4: 'present', stu_5: 'present', stu_6: 'absent' }, note: 'کوییز کلاسی' },
      { id: uid('att'), classId: cDesc, date: today, records: { stu_e1: 'present', stu_e2: 'present', stu_e3: 'present', stu_e4: 'present' }, note: 'آزمایش آهن‌ربا' }
    ];

    db.assessments = [
      { id: uid('ex'), classId: c1, title: 'کوییز فصل مجموعه‌ها', category: 'کوییز مستمر', date: d1, maxScore: 20, weight: 1, scores: { stu_1: 19.5, stu_2: 17, stu_3: 13.5, stu_4: 18, stu_5: 20, stu_6: 15.5 }, note: '' },
      { id: uid('ex'), classId: c1, title: 'آزمون مستمر آبان‌ماه', category: 'امتحان مستمر', date: today, maxScore: 20, weight: 2, scores: { stu_1: 20, stu_2: 18.25, stu_3: 14, stu_4: 17.5, stu_5: 19.25, stu_6: 16 }, note: '' },
      { id: uid('ex'), classId: cDesc, title: 'مشاهده و آزمایش فصل انرژی', category: 'فعالیت عملکردی', date: today, maxScore: 20, weight: 1, scores: { stu_e1: 19.5, stu_e2: 17, stu_e3: 14, stu_e4: 19.5 }, note: '' }
    ];

    db.homeworks = [
      { id: uid('hw'), classId: c1, title: 'تمارین صفحه ۲۴ تا ۲۸ کتاب درسی', description: 'حل کامل به همراه رسم نمودار ون', assignDate: d2, dueDate: dNext, statuses: { stu_1: 'done', stu_2: 'done', stu_3: 'partial', stu_4: 'done', stu_5: 'done', stu_6: 'missing' } }
    ];

    db.behaviors = [
      { id: uid('beh'), classId: c1, studentId: 'stu_5', date: d2, type: 'pos', label: 'حل خلاقانه پای تخته', points: 2, note: '' },
      { id: uid('beh'), classId: c1, studentId: 'stu_1', date: today, type: 'pos', label: 'کمک به هم‌کلاسی‌ها', points: 2, note: '' },
      { id: uid('beh'), classId: c1, studentId: 'stu_3', date: d1, type: 'neg', label: 'همراه نداشتن دفتر تمرین', points: 1, note: '' }
    ];

    db.timetable = [
      { id: uid('tt'), dayIndex: 0, startTime: '۰۸:۰۰', endTime: '۰۹:۳۰', classId: c1, customTitle: '', room: 'کلاس ۲۰۴' },
      { id: uid('tt'), dayIndex: 2, startTime: '۰۹:۴۵', endTime: '۱۱:۱۵', classId: cDesc, customTitle: '', room: 'کلاس ۱۰۱' },
      { id: uid('tt'), dayIndex: todayWd, startTime: '۱۰:۰۰', endTime: '۱۱:۳۰', classId: c1, customTitle: '', room: 'کلاس ۲۰۴' },
      { id: uid('tt'), dayIndex: todayWd, startTime: '۱۶:۳۰', endTime: '۱۸:۰۰', classId: c2, customTitle: '', room: 'آموزشگاه' }
    ];

    db.lessons = [
      { id: uid('lsn'), classId: c1, date: d1, title: 'فصل اول: معرفی مجموعه‌ها و زیرمجموعه', status: 'done', objectives: 'شناخت نمادهای ریاضی مجموعه و تشخیص مجموعه متناهی و نامتناهی', materials: 'کتاب درسی، کاربرگ شماره ۱', notes: '' },
      { id: uid('lsn'), classId: c1, date: dNext, title: 'فصل دوم: اعداد حقیقی و قدرمطلق', status: 'planned', objectives: 'نمایش اعداد گنگ روی محور و محاسبه قدرمطلق', materials: 'خط‌کش، پرگار، اسلاید آموزشی', notes: '' }
    ];

    db.events = [
      { id: uid('ev'), date: dNext, title: 'آزمون میان‌ترم ریاضی نهم', category: 'exam', classId: c1, note: 'از فصل ۱ و ۲' }
    ];

    db.seating[c1] = {
      rows: 2,
      cols: 3,
      seats: { '0-0': 'stu_1', '0-1': 'stu_5', '0-2': 'stu_2', '1-0': 'stu_4', '1-1': 'stu_3', '1-2': 'stu_6' }
    };

    db.sessions = [
      { id: uid('ses'), classId: c2, studentId: 'stu_7', date: d2, durationMin: 90, topic: 'تست‌زنی تابع و معادله درجه دوم', homework: '۴۰ تست از کتاب جامع', attended: true, note: 'تسلط بسیار خوب' },
      { id: uid('ses'), classId: c2, studentId: 'stu_8', date: today, durationMin: 90, topic: 'حد و پیوستگی', homework: 'مرور نکات رفع ابهام', attended: true, note: '' }
    ];

    db.fees = [
      { id: uid('fee'), classId: c2, studentId: 'stu_7', title: 'شهریه آبان‌ماه ۱۴۰۵ (۴ جلسه)', amount: 1800000, paidAmount: 1800000, dueDate: today, paidDate: today, note: 'کارت‌به‌کارت تسویه شد' },
      { id: uid('fee'), classId: c2, studentId: 'stu_8', title: 'شهریه آبان‌ماه ۱۴۰۵ (۴ جلسه)', amount: 1800000, paidAmount: 900000, dueDate: dNext, paidDate: today, note: 'قسط اول پرداخت شد' }
    ];

    save();
  }

  function clearAllData() {
    const keepDark = db.settings.darkMode;
    const keepPalette = db.settings.themePalette || 'teal';
    const keepPin = db.settings.pinCode || '';
    db = createEmptyDb();
    db.settings.darkMode = keepDark;
    db.settings.themePalette = keepPalette;
    db.settings.pinCode = keepPin;
    save();
  }

  global.Store = {
    CLASS_COLORS: CLASS_COLORS,
    DESC_LEVELS: DESC_LEVELS,
    isValidStudentPhoto: isValidStudentPhoto,
    PHOTO_MAX_CHARS: PHOTO_MAX_CHARS,
    POINT_TITLES: POINT_TITLES,
    getPointTitle: getPointTitle,
    getClassPointRanking: getClassPointRanking,
    pointTotals: pointTotals,
    addPointEntry: addPointEntry,
    addBatchPointEntries: addBatchPointEntries,
    resetClassPoints: resetClassPoints,
    buildPointsReport: buildPointsReport,
    buildStudentPointsMessage: buildStudentPointsMessage,
    score20ToDescriptive: score20ToDescriptive,
    uid: uid,
    load: load,
    save: save,
    hadPersistedData: function () { return hadPersistedData; },
    isStorageProtected: function () { return storageProtected; },
    getStorageNotice: function () { return storageNotice; },
    getDb: getDb,
    getActiveClass: getActiveClass,
    setActiveClass: setActiveClass,
    getClassById: getClassById,
    getStudentsByClass: getStudentsByClass,
    getStudentById: getStudentById,
    computeStudentStats: computeStudentStats,
    deleteClassCascade: deleteClassCascade,
    deleteStudentCascade: deleteStudentCascade,
    exportFile: exportFile,
    exportBase64Image: exportBase64Image,
    exportCsv: exportCsv,
    exportBackupJson: exportBackupJson,
    getBackupPayload: getBackupPayload,
    setBackupIncludePhotos: setBackupIncludePhotos,
    setBackupMode: setBackupMode,
    getBackupMode: getBackupMode,
    markBackupTaken: markBackupTaken,
    daysSinceBackup: daysSinceBackup,
    needsBackupReminder: needsBackupReminder,
    dismissBackupReminder: dismissBackupReminder,
    autoBackupSnapshot: autoBackupSnapshot,
    getAutoBackupInfo: getAutoBackupInfo,
    restoreAutoBackup: restoreAutoBackup,
    importBackupText: importBackupText,
    isEncryptedBackup: isEncryptedBackup,
    encryptBackupString: encryptBackupString,
    decryptBackupString: decryptBackupString,
    cryptoAvailable: cryptoAvailable,
    exportRawRecovery: exportRawRecovery,
    importBackupFromString: importBackupFromString,
    printReportHtml: printReportHtml,
    shareText: shareText,
    copyText: copyText,
    sendSms: sendSms,
    dialPhone: dialPhone,
    vibrate: vibrate,
    playWheelTick: playWheelTick,
    playWinFanfare: playWinFanfare,
    playPointFeedback: playPointFeedback,
    playAlarm: playAlarm,
    loadSampleData: loadSampleData,
    clearAllData: clearAllData,
    hasNativeBridge: hasNativeBridge
  };
})(typeof window !== 'undefined' ? window : globalThis);
