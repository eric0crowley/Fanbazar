// ماژول‌های هسته اصلی درس‌یار ۲.۰: داشبورد، کلاس‌ها، دانش‌آموزان (تکی/گروهی هوشمند/پروفایل/کاروسل)، حضور و غیاب، دفتر نمره دوگانه (عددی + توصیفی) و کارنامه رسمی
(function (global) {
  'use strict';

  function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // HTML escaping alone is insufficient inside a quoted JavaScript handler:
  // entities are decoded before the handler is compiled. Escape JS first.
  function escJsAttr(str) {
    const s = str === null || str === undefined ? '' : String(str);
    return esc(s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      .replace(/\r/g, '\\r').replace(/\n/g, '\\n')
      .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'));
  }

  // Object.values is absent from some original Android 7 WebViews.
  function objectValues(object) {
    const value = object || {};
    return Object.keys(value).map(function (key) { return value[key]; });
  }

  function initials(name) {
    if (!name) return '؟';
    const parts = String(name).trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2);
    return parts[0].charAt(0) + '‌' + parts[parts.length - 1].charAt(0);
  }

  // آواتار دانش‌آموز: عکس انتخابی (data URL) یا حرف اول نام
  function studentAvatarHtml(stu, cls, opts) {
    const o = opts || {};
    const size = o.size || 44;
    const radius = o.radius !== undefined ? o.radius : '50%';
    const bg = (stu && stu.avatarColor) || (cls && cls.color) || '#0B6E75';
    const extra = o.style ? ' ' + o.style : '';
    const photo = (stu && typeof stu.photo === 'string' && global.Store.isValidStudentPhoto(stu.photo)) ? stu.photo : '';
    if (photo) {
      return '<img class="avatar avatar-img" alt="' + esc(stu.name || '') + '" src="' + photo + '"' +
        ' style="width:' + size + 'px;height:' + size + 'px;border-radius:' + radius + ';object-fit:cover;background:' + esc(bg) + ';' + extra + '">';
    }
    return '<div class="avatar" style="width:' + size + 'px;height:' + size + 'px;border-radius:' + radius +
      ';font-size:' + Math.max(11, Math.round(size * 0.32)) + 'px;background:' + esc(bg) + ';' + extra + '">' +
      esc(initials(stu && stu.name)) + '</div>';
  }

  // وضعیت عکس در فرم دانش‌آموز
  let pendingStudentPhoto = '';

  function renderStudentPhotoPreview() {
    const box = document.getElementById('stu_photo_preview');
    if (!box) return;
    box.innerHTML = pendingStudentPhoto
      ? '<img src="' + pendingStudentPhoto + '" alt="عکس دانش‌آموز" style="width:64px;height:64px;border-radius:18px;object-fit:cover;border:2px solid var(--border);">'
      : '<div style="width:64px;height:64px;border-radius:18px;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-size:22px;">📷</div>';
  }

  function setStudentPhotoDataUrl(dataUrl) {
    if (!dataUrl) return false;
    if (!global.Store.isValidStudentPhoto(dataUrl)) {
      global.App.toast('عکس انتخابی معتبر نیست یا حجم آن بیش از حد است');
      return false;
    }
    pendingStudentPhoto = dataUrl;
    renderStudentPhotoPreview();
    return true;
  }

  function downscaleImageFile(file, cb) {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          try {
            const maxSide = 256;
            let w = img.width || maxSide;
            let h = img.height || maxSide;
            const scale = Math.min(1, maxSide / Math.max(w, h));
            w = Math.max(1, Math.round(w * scale));
            h = Math.max(1, Math.round(h * scale));
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            cb(canvas.toDataURL('image/jpeg', 0.82));
          } catch (e) { cb(''); }
        };
        img.onerror = function () { cb(''); };
        img.src = String(reader.result || '');
      };
      reader.onerror = function () { cb(''); };
      reader.readAsDataURL(file);
    } catch (e) { cb(''); }
  }

  function onPhotoFileChosen(ev) {
    const input = ev && ev.target;
    const file = input && input.files && input.files[0];
    if (!file) return;
    downscaleImageFile(file, function (dataUrl) {
      if (!setStudentPhotoDataUrl(dataUrl)) global.App.toast('خواندن این عکس ممکن نشد');
      if (input) input.value = '';
    });
  }

  function pickStudentPhoto() {
    if (global.Store.hasNativeBridge() && typeof global.AndroidBridge.pickStudentPhoto === 'function') {
      try { global.AndroidBridge.pickStudentPhoto(); return; } catch (e) {}
    }
    const input = document.getElementById('f_stu_photo_file');
    if (input) input.click();
    else global.App.toast('انتخابگر عکس در این دستگاه در دسترس نیست');
  }

  function clearStudentPhoto() {
    pendingStudentPhoto = '';
    renderStudentPhotoPreview();
  }

  global.__onNativePhotoPicked = function (dataUrl) {
    if (!setStudentPhotoDataUrl(dataUrl)) return;
    global.App.toast('عکس دانش‌آموز آماده ذخیره است ✓');
  };
  global.__onNativePhotoCancelled = function () {
    if (global.App) global.App.toast('عکسی انتخاب نشد');
  };

  function descriptiveRank(avg20, isDescClass) {
    if (avg20 === null || avg20 === undefined) return { label: 'ثبت‌نشده', short: '—', cls: 'badge-muted' };
    if (isDescClass) {
      const d = global.Store.score20ToDescriptive(avg20);
      return { label: d.label, short: d.short, cls: d.badgeCls };
    }
    if (avg20 >= 18) return { label: 'خیلی خوب (عالی)', short: 'عالی', cls: 'badge-success' };
    if (avg20 >= 15) return { label: 'خوب', short: 'خوب', cls: 'badge-info' };
    if (avg20 >= 12) return { label: 'قابل قبول', short: 'ق.قبول', cls: 'badge-warning' };
    if (avg20 >= 10) return { label: 'مرزی', short: 'مرزی', cls: 'badge-warning' };
    return { label: 'نیاز به تلاش بیشتر', short: 'نیاز به تلاش', cls: 'badge-danger' };
  }

  function formatExamCell(cls, score, maxScore) {
    const J = global.Jalali;
    if (score === undefined || score === null || score === '') return '—';
    if (cls && cls.gradingMode === 'descriptive') {
      const norm20 = (Number(score) / (Number(maxScore) || 20)) * 20;
      const d = global.Store.score20ToDescriptive(norm20);
      return '<span class="badge ' + d.badgeCls + '">' + d.short + '</span>';
    }
    return esc(J.toFa(score));
  }

  const state = {
    rosterTab: 'students', // students | classes | carousel
    studentSearch: '',
    carouselIdx: 0,
    academicTab: 'attendance', // attendance | gradebook | reportcards
    attDate: '',
    attShowSummary: false,
    selectedExamId: '',
    reportTeacherNote: 'با آرزوی موفقیت، سلامتی و پیشرفت روزافزون دانش‌آموز عزیز.'
  };

  function ensureAttDate() {
    if (!state.attDate) state.attDate = global.Jalali.getTodayStr();
    return state.attDate;
  }

  // ==================== ۱. داشبورد (خانه) ====================
  function renderHome() {
    const db = global.Store.getDb();
    const J = global.Jalali;
    const todayStr = J.getTodayStr();
    const todayWd = J.getWeekdayFromStr(todayStr);
    const activeCls = global.Store.getActiveClass();

    const todayAtt = db.attendance.filter(function (a) { return a.date === todayStr; });
    let presentToday = 0, absentToday = 0;
    todayAtt.forEach(function (a) {
      objectValues(a.records || {}).forEach(function (st) {
        if (st === 'present' || st === 'late') presentToday++;
        else if (st === 'absent') absentToday++;
      });
    });

    let totalDueFee = 0;
    db.fees.forEach(function (f) {
      const rem = (Number(f.amount) || 0) - (Number(f.paidAmount) || 0);
      if (rem > 0) totalDueFee += rem;
    });

    const todaySchedule = db.timetable
      .filter(function (t) { return Number(t.dayIndex) === todayWd.index; })
      .sort(function (a, b) { return (a.startTime || '').localeCompare(b.startTime || ''); });

    let html = '';

    if (db.settings.isSampleLoaded) {
      html += '<div class="card" style="background:var(--accent-soft);border-color:var(--accent);padding:10px 12px;">' +
        '<div class="flex-between">' +
          '<span style="font-size:12px;font-weight:800;">✨ داده‌های نمونه آزمایشی (عددی + توصیفی ابتدایی) فعال است.</span>' +
          '<button class="btn btn-sm btn-outline" onclick="CoreModules.confirmClearSample()">شروع از صفر</button>' +
        '</div>' +
      '</div>';
    }

    // یادآور پشتیبان‌گیری: داده فقط روی همین گوشی است.
    if (global.Store.needsBackupReminder && global.Store.needsBackupReminder()) {
      const days = global.Store.daysSinceBackup();
      const hasAuto = !!global.Store.getAutoBackupInfo();
      html += '<div class="card" id="backup_reminder" style="background:var(--danger-soft);border-color:var(--danger);padding:10px 12px;">' +
        '<div class="flex-between" style="gap:8px;flex-wrap:wrap;">' +
          '<div style="font-size:12px;font-weight:800;">🛡️ ' +
            (days === null ? 'هنوز پشتیبان نگرفته‌اید.' : global.Jalali.toFa(days) + ' روز است پشتیبان نگرفته‌اید.') +
            ' اگر گوشی گم شود یا برنامه پاک شود، همهٔ اطلاعات از بین می‌رود.' +
            (hasAuto ? '<span class="text-muted text-sm" style="font-weight:600;"> نسخهٔ خودکار روزانه فقط روی همین گوشی است.</span>' : '') +
          '</div>' +
          '<div class="flex-wrap">' +
            '<button class="btn btn-sm btn-primary" onclick="ToolModules.exportBackupFlow()">پشتیبان بگیر</button>' +
            '<button class="btn btn-sm btn-outline" onclick="ToolModules.dismissBackupReminder()">بعداً</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    // بنر قهرمان نسخه ۲.۰
    html += '<div class="hero-banner-v2">' +
      '<div class="flex-between" style="align-items:flex-start;">' +
        '<div>' +
          '<div style="font-size:12px;opacity:0.9;font-weight:700;">📅 ' + esc(J.formatJalaliHuman(todayStr, true)) + '</div>' +
          '<div style="font-size:19px;font-weight:900;margin-top:3px;">' +
            (db.settings.teacherName ? 'سلام، ' + esc(db.settings.teacherName) : 'به «درس‌یار ۲.۰» خوش آمدید') +
          '</div>' +
          '<div style="font-size:12px;opacity:0.9;margin-top:4px;">' +
            (db.settings.schoolName ? esc(db.settings.schoolName) + ' • ' : '') +
            'سال تحصیلی ' + esc(db.settings.academicYear || '۱۴۰۵-۱۴۰۶') +
          '</div>' +
          (activeCls ? '<div style="margin-top:8px;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.16);padding:4px 10px;border-radius:999px;font-size:11.5px;font-weight:800;">' +
            '<span>🏫 کلاس فعال: ' + esc(activeCls.name) + '</span>' +
            '<span style="opacity:0.85;">(' + (activeCls.gradingMode === 'descriptive' ? 'توصیفی' : '۰ تا ۲۰') + ')</span>' +
          '</div>' : '') +
        '</div>' +
        '<button class="btn btn-sm" style="background:rgba(255,255,255,0.18);color:#fff;border:1px solid rgba(255,255,255,0.24);" onclick="App.goTool(\'settings\')">⚙️ تنظیمات</button>' +
      '</div>' +
    '</div>';

    if (db.classes.length === 0) {
      html += '<div class="card" style="text-align:center;padding:22px 16px;">' +
        '<div style="font-size:40px;margin-bottom:6px;">🎓</div>' +
        '<h3 style="margin:0 0 6px 0;font-size:16px;">هنوز کلاسی تعریف نکرده‌اید</h3>' +
        '<p class="text-muted text-sm" style="margin:0 0 14px 0;">اولین کلاس خود (عددی ۰ تا ۲۰ یا توصیفی ابتدایی) را بسازید یا با یک کلیک داده‌های نمونه را بارگذاری کنید.</p>' +
        '<div class="flex-wrap" style="justify-content:center;gap:8px;">' +
          '<button class="btn btn-primary" onclick="CoreModules.openClassModal()">+ ساخت اولین کلاس من</button>' +
          '<button class="btn btn-soft" onclick="CoreModules.loadDemoNow()">✨ بارگذاری داده‌های نمونه</button>' +
        '</div>' +
      '</div>';
    }

    html += '<div class="stats-grid">' +
      '<div class="stat-card" onclick="CoreModules.goClassesTab(\'classes\')">' +
        '<div class="stat-icon" style="background:var(--primary-soft);color:var(--primary);">🏫</div>' +
        '<div><div class="stat-val">' + J.toFa(db.classes.length) + '</div><div class="stat-lbl">کلاس‌های فعال</div></div>' +
      '</div>' +
      '<div class="stat-card" onclick="CoreModules.goClassesTab(\'students\')">' +
        '<div class="stat-icon" style="background:var(--info-soft);color:var(--info);">👨‍🎓</div>' +
        '<div><div class="stat-val">' + J.toFa(db.students.length) + '</div><div class="stat-lbl">کل دانش‌آموزان</div></div>' +
      '</div>' +
      '<div class="stat-card" onclick="CoreModules.goAcademicTab(\'attendance\')">' +
        '<div class="stat-icon" style="background:var(--success-soft);color:var(--success);">✅</div>' +
        '<div><div class="stat-val">' + J.toFa(presentToday) + (absentToday ? ' <span style="font-size:12px;color:var(--danger);">(' + J.toFa(absentToday) + ' غایب)</span>' : '') + '</div><div class="stat-lbl">حاضرین امروز</div></div>' +
      '</div>' +
      '<div class="stat-card" onclick="App.goTool(\'fees\')">' +
        '<div class="stat-icon" style="background:var(--purple-soft);color:var(--purple);">💳</div>' +
        '<div><div class="stat-val" style="font-size:14.5px;">' + (totalDueFee > 0 ? J.formatMoney(totalDueFee) : J.toFa(db.assessments.length)) + '</div>' +
        '<div class="stat-lbl">' + (totalDueFee > 0 ? 'شهریه معوق (تومان)' : 'ارزشیابی‌های ثبت‌شده') + '</div></div>' +
      '</div>' +
    '</div>';

    // برنامه امروز
    html += '<div class="card">' +
      '<div class="card-header">' +
        '<h3 class="card-title">🕒 برنامه کلاسی امروز (' + esc(todayWd.name) + ')</h3>' +
        '<button class="btn btn-sm btn-soft" onclick="App.goTab(\'plan\', \'timetable\')">برنامه هفتگی</button>' +
      '</div>';
    if (!todaySchedule.length) {
      html += '<div class="text-muted text-sm">برای امروز زنگ کلاسی در برنامه هفتگی ثبت نشده است.</div>';
    } else {
      todaySchedule.forEach(function (slot) {
        const cls = global.Store.getClassById(slot.classId);
        const title = cls ? cls.name : (slot.customTitle || 'جلسه آموزشی');
        const color = cls ? cls.color : '#0B6E75';
        html += '<div class="list-row" style="margin-bottom:6px;border-right:4px solid ' + esc(color) + ';">' +
          '<div>' +
            '<div style="font-weight:800;">' + esc(title) + '</div>' +
            '<div class="text-muted text-sm">ساعت ' + esc(J.toFa(slot.startTime)) + ' تا ' + esc(J.toFa(slot.endTime)) + (slot.room ? ' • ' + esc(slot.room) : '') + '</div>' +
          '</div>' +
          (cls ? '<button class="btn btn-sm btn-outline" onclick="App.switchClassAndGo(\'' + escJsAttr(cls.id) + '\', \'academic\')">ثبت حضور</button>' : '') +
        '</div>';
      });
    }
    html += '</div>';

    // میز کار سریع معلم
    html += '<div class="section-label">میز کار سریع معلم' + (activeCls ? ' — ' + esc(activeCls.name) : '') + '</div>' +
      '<div class="tools-grid">' +
        quickTile('✅', 'حضور و غیاب', 'var(--success-soft)', "CoreModules.goAcademicTab('attendance')") +
        quickTile('📝', 'دفتر نمره', 'var(--info-soft)', "CoreModules.goAcademicTab('gradebook')") +
        quickTile('🏅', 'کارنامه PDF', 'var(--accent-soft)', "CoreModules.goAcademicTab('reportcards')") +
        quickTile('🎡', 'گردونه شانس', 'var(--purple-soft)', "App.goTool('picker')") +
        quickTile('🎨', 'تخته سفید کلاس', 'var(--primary-soft)', "App.goTool('whiteboard')") +
        quickTile('⏱️', 'تایمر سرِ کلاس', 'var(--danger-soft)', "App.goTool('timer')") +
        quickTile('👥', 'گروه‌بندی هوشمند', 'var(--info-soft)', "App.goTool('groups')") +
        quickTile('🪑', 'چیدمان صندلی', 'var(--warning-soft)', "App.goTool('seating')") +
        quickTile('🏆', 'امتیاز و افتخار', 'var(--warning-soft)', "App.goTool('points')") +
        quickTile('⭐', 'مثبت و منفی', 'var(--success-soft)', "App.goTool('behavior')") +
        quickTile('📚', 'تکالیف کلاس', 'var(--purple-soft)', "App.goTab('plan', 'homework')") +
        quickTile('📖', 'طرح درس', 'var(--primary-soft)', "App.goTab('plan', 'lessons')") +
        quickTile('📊', 'آمار و نمودار', 'var(--accent-soft)', "App.goTool('charts')") +
      '</div>';

    return html;
  }

  function quickTile(icon, title, bg, onclickJs) {
    return '<button type="button" class="tool-tile" onclick="' + onclickJs + '">' +
      '<div class="tool-tile-icon" style="background:' + bg + ';">' + icon + '</div>' +
      '<div class="tool-tile-title">' + title + '</div>' +
    '</button>';
  }

  // ==================== ۲. کلاس‌ها و دانش‌آموزان ====================
  function renderRoster() {
    const db = global.Store.getDb();
    const activeCls = global.Store.getActiveClass();
    const J = global.Jalali;

    let html = '<div class="seg-tabs">' +
      '<button class="seg-tab ' + (state.rosterTab === 'students' ? 'active' : '') + '" onclick="CoreModules.setRosterTab(\'students\')">👨‍🎓 شاگردان</button>' +
      '<button class="seg-tab ' + (state.rosterTab === 'classes' ? 'active' : '') + '" onclick="CoreModules.setRosterTab(\'classes\')">🏫 کلاس‌ها (' + J.toFa(db.classes.length) + ')</button>' +
      '<button class="seg-tab ' + (state.rosterTab === 'carousel' ? 'active' : '') + '" onclick="CoreModules.setRosterTab(\'carousel\')">🗂️ مرور کارتی</button>' +
    '</div>';

    if (state.rosterTab === 'classes') {
      html += '<div class="flex-between mb-2">' +
        '<span class="text-muted text-sm">کلاس‌های عددی (۰ تا ۲۰)، توصیفی ابتدایی و خصوصی</span>' +
        '<button class="btn btn-primary btn-sm" onclick="CoreModules.openClassModal()">+ کلاس جدید</button>' +
      '</div>';

      if (!db.classes.length) {
        html += '<div class="card empty-state"><div class="empty-state-icon">🏫</div><div>هنوز کلاسی ثبت نشده است.</div>' +
          '<button class="btn btn-primary mt-3" onclick="CoreModules.openClassModal()">+ افزودن اولین کلاس</button></div>';
        return html;
      }

      db.classes.forEach(function (cls) {
        const count = global.Store.getStudentsByClass(cls.id).length;
        const isCurrent = activeCls && activeCls.id === cls.id;
        const isDesc = cls.gradingMode === 'descriptive';
        html += '<div class="card" style="border-right:5px solid ' + esc(cls.color || '#0B6E75') + ';">' +
          '<div class="flex-between">' +
            '<div>' +
              '<div style="font-weight:900;font-size:15px;">' + esc(cls.name) + ' ' +
                (isCurrent ? '<span class="badge badge-primary">کلاس فعال</span>' : '') +
              '</div>' +
              '<div class="text-muted text-sm">' +
                esc(cls.subject || 'بدون درس') +
                (cls.gradeLevel ? ' • ' + esc(cls.gradeLevel) : '') +
                (cls.room ? ' • ' + esc(cls.room) : '') +
                ' • ' + J.toFa(count) + ' شاگرد' +
              '</div>' +
              '<div class="mt-2 flex-wrap">' +
                '<span class="badge ' + (isDesc ? 'badge-success' : 'badge-info') + '">' +
                  (isDesc ? '🌱 ارزشیابی کیفی-توصیفی' : '🔢 نمره‌دهی ۰ تا ۲۰') +
                '</span>' +
                '<span class="badge ' + (cls.type === 'private' ? 'badge-purple' : 'badge-muted') + '">' +
                  (cls.type === 'private' ? 'خصوصی / آموزشگاهی' : 'مدرسه‌ای') +
                '</span>' +
                (cls.defaultFee > 0 ? '<span class="badge badge-warning">شهریه: ' + J.formatMoney(cls.defaultFee) + ' ت</span>' : '') +
              '</div>' +
            '</div>' +
            '<div style="display:flex;flex-direction:column;gap:6px;">' +
              (!isCurrent ? '<button class="btn btn-sm btn-soft" onclick="CoreModules.activateClass(\'' + escJsAttr(cls.id) + '\')">انتخاب</button>' : '') +
              '<button class="btn btn-sm btn-outline" onclick="CoreModules.openClassModal(\'' + escJsAttr(cls.id) + '\')">ویرایش</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      });
      return html;
    }

    if (!activeCls) {
      html += '<div class="card empty-state"><div class="empty-state-icon">🏫</div><div>ابتدا یک کلاس ایجاد کنید تا دانش‌آموزان را به آن اضافه کنید.</div>' +
        '<button class="btn btn-primary mt-3" onclick="CoreModules.openClassModal()">+ ایجاد کلاس جدید</button></div>';
      return html;
    }

    const students = global.Store.getStudentsByClass(activeCls.id);
    const isDesc = activeCls.gradingMode === 'descriptive';

    if (state.rosterTab === 'carousel') {
      if (!students.length) {
        return html + '<div class="card empty-state">دانش‌آموزی در این کلاس ثبت نشده است.</div>';
      }
      if (state.carouselIdx >= students.length) state.carouselIdx = 0;
      if (state.carouselIdx < 0) state.carouselIdx = students.length - 1;
      const stu = students[state.carouselIdx];
      const st = global.Store.computeStudentStats(stu.id, activeCls.id);

      html += '<div class="card" style="text-align:center;padding:20px 14px;">' +
        '<div class="text-muted text-sm mb-2">شاگرد ' + J.toFa(state.carouselIdx + 1) + ' از ' + J.toFa(students.length) + ' — ' + esc(activeCls.name) + '</div>' +
        '<div style="margin:0 auto 10px;">' + studentAvatarHtml(stu, activeCls, { size: 68, radius: '20px' }) + '</div>' +
        '<h3 style="margin:0;font-size:19px;font-weight:900;">' + esc(stu.name) + '</h3>' +
        '<div class="text-muted text-sm">' + (stu.code ? 'کد: ' + esc(J.toFa(stu.code)) : 'بدون کد کلاسی') + (stu.parentName ? ' • ولی: ' + esc(stu.parentName) : '') + '</div>' +
        '<div class="stats-grid mt-3" style="grid-template-columns:repeat(3,1fr);">' +
          '<div class="stat-card" style="flex-direction:column;gap:2px;padding:9px;"><div class="stat-val" style="font-size:' + (isDesc ? '14px' : '18px') + ';">' +
            (st.avg20 !== null ? (isDesc ? st.descOverall.short : J.toFa(st.avg20)) : '—') +
          '</div><div class="stat-lbl">' + (isDesc ? 'سطح کیفی' : 'معدل از ۲۰') + '</div></div>' +
          '<div class="stat-card" style="flex-direction:column;gap:2px;padding:9px;"><div class="stat-val">' + J.toFa(st.attendanceRate) + '٪</div><div class="stat-lbl">حضور</div></div>' +
          '<div class="stat-card" style="flex-direction:column;gap:2px;padding:9px;"><div class="stat-val" style="color:' + (st.netBehavior >= 0 ? 'var(--success)' : 'var(--danger)') + ';">' + (st.netBehavior > 0 ? '+' : '') + J.toFa(st.netBehavior) + '</div><div class="stat-lbl">تراز کلاسی</div></div>' +
        '</div>' +
        (stu.notes ? '<div class="card" style="background:var(--surface-2);margin-top:8px;text-align:right;font-size:12.5px;">📌 یادداشت: ' + esc(stu.notes) + '</div>' : '') +
        '<div class="flex-wrap mt-3" style="justify-content:center;">' +
          '<button class="btn btn-sm btn-soft" onclick="CoreModules.quickBehavior(\'' + escJsAttr(stu.id) + '\', \'pos\', \'مشارکت فعال در کلاس\', 1)">➕ مثبت (+۱)</button>' +
          '<button class="btn btn-sm btn-danger" onclick="CoreModules.quickBehavior(\'' + escJsAttr(stu.id) + '\', \'neg\', \'تذکر کلاسی\', 1)">➖ منفی (-۱)</button>' +
          '<button class="btn btn-sm btn-outline" onclick="CoreModules.openStudentProfile(\'' + escJsAttr(stu.id) + '\')">پرونده کامل</button>' +
        '</div>' +
        '<div class="flex-between mt-3" style="border-top:1px solid var(--border);padding-top:12px;">' +
          '<button class="btn btn-outline" onclick="CoreModules.stepCarousel(-1)">◀ شاگرد قبلی</button>' +
          '<button class="btn btn-primary" onclick="CoreModules.stepCarousel(1)">شاگرد بعدی ▶</button>' +
        '</div>' +
      '</div>';
      return html;
    }

    // تب لیست دانش‌آموزان + دکمه‌های سریع + و -
    html += '<div class="card" style="padding:11px 12px;">' +
      '<div class="flex-between mb-2" style="flex-wrap:wrap;">' +
        '<div><span style="font-weight:900;">' + esc(activeCls.name) + '</span> <span class="badge badge-primary">' + J.toFa(students.length) + ' نفر</span></div>' +
        '<div class="flex-wrap">' +
          '<button class="btn btn-sm btn-soft" onclick="CoreModules.openBulkStudentsModal()">📋 ورود گروهی ۳۰ ثانیه‌ای</button>' +
          '<button class="btn btn-sm btn-primary" onclick="CoreModules.openStudentModal()">+ شاگرد جدید</button>' +
        '</div>' +
      '</div>' +
      '<input type="text" class="form-control" placeholder="🔍 جستجوی نام یا کد دانش‌آموز..." value="' + esc(state.studentSearch) + '" oninput="CoreModules.onStudentSearch(this.value)">' +
    '</div>';

    const q = state.studentSearch.trim();
    const filtered = !q ? students : students.filter(function (s) {
      return (s.name || '').indexOf(q) !== -1 || (s.code || '').indexOf(q) !== -1;
    });

    if (!filtered.length) {
      html += '<div class="card empty-state"><div class="empty-state-icon">👨‍🎓</div><div>' +
        (students.length ? 'دانش‌آموزی با این عبارت پیدا نشد.' : 'هنوز دانش‌آموزی به این کلاس اضافه نشده است.') +
      '</div></div>';
      return html;
    }

    filtered.forEach(function (stu) {
      const st = global.Store.computeStudentStats(stu.id, activeCls.id);
      html += '<div class="list-row" onclick="CoreModules.openStudentProfile(\'' + escJsAttr(stu.id) + '\')" style="cursor:pointer;">' +
        '<div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">' +
          studentAvatarHtml(stu, activeCls, { size: 44 }) +
          '<div style="min-width:0;flex:1;">' +
            '<div style="font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(stu.name) +
              (stu.code ? ' <span class="text-muted text-sm">(' + esc(J.toFa(stu.code)) + ')</span>' : '') +
            '</div>' +
            '<div class="flex-wrap" style="margin-top:3px;">' +
              '<span class="badge badge-muted">حضور: ' + J.toFa(st.attendanceRate) + '٪</span>' +
              (st.avg20 !== null ? (isDesc
                ? '<span class="badge ' + st.descOverall.badgeCls + '">' + st.descOverall.short + '</span>'
                : '<span class="badge badge-info">معدل: ' + J.toFa(st.avg20) + '</span>') : '') +
              (st.netBehavior !== 0 ? '<span class="badge ' + (st.netBehavior > 0 ? 'badge-success' : 'badge-danger') + '">امتیاز: ' + (st.netBehavior > 0 ? '+' : '') + J.toFa(st.netBehavior) + '</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="quick-pts-wrap" onclick="event.stopPropagation();">' +
          '<button type="button" class="quick-pt-btn pos" title="ثبت سریع امتیاز مثبت (+۱)" onclick="CoreModules.quickBehavior(\'' + escJsAttr(stu.id) + '\', \'pos\', \'فعالیت مثبت کلاسی\', 1)">+</button>' +
          '<button type="button" class="quick-pt-btn neg" title="ثبت سریع منفی (-۱)" onclick="CoreModules.quickBehavior(\'' + escJsAttr(stu.id) + '\', \'neg\', \'تذکر کلاسی\', 1)">−</button>' +
          '<button type="button" class="btn btn-sm btn-outline" style="padding:6px 8px;" onclick="CoreModules.openStudentModal(\'' + escJsAttr(stu.id) + '\')">✎</button>' +
        '</div>' +
      '</div>';
    });

    return html;
  }

  // ==================== ۳. حضور و غیاب، دفتر نمره دوگانه و کارنامه ====================
  function renderAcademic() {
    const activeCls = global.Store.getActiveClass();
    let html = '<div class="seg-tabs">' +
      '<button class="seg-tab ' + (state.academicTab === 'attendance' ? 'active' : '') + '" onclick="CoreModules.setAcademicTab(\'attendance\')">✅ حضور و غیاب</button>' +
      '<button class="seg-tab ' + (state.academicTab === 'gradebook' ? 'active' : '') + '" onclick="CoreModules.setAcademicTab(\'gradebook\')">📝 دفتر نمره</button>' +
      '<button class="seg-tab ' + (state.academicTab === 'reportcards' ? 'active' : '') + '" onclick="CoreModules.setAcademicTab(\'reportcards\')">🏅 کارنامه</button>' +
    '</div>';

    if (!activeCls) {
      return html + '<div class="card empty-state"><div class="empty-state-icon">🏫</div><div>ابتدا یک کلاس ایجاد یا انتخاب کنید.</div>' +
        '<button class="btn btn-primary mt-3" onclick="CoreModules.openClassModal()">+ ساخت کلاس</button></div>';
    }

    if (state.academicTab === 'attendance') return html + renderAttendanceSub(activeCls);
    if (state.academicTab === 'gradebook') return html + renderGradebookSub(activeCls);
    return html + renderReportCardsSub(activeCls);
  }

  function renderAttendanceSub(activeCls) {
    const db = global.Store.getDb();
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(activeCls.id);
    const curDate = ensureAttDate();

    if (!students.length) {
      return '<div class="card empty-state">ابتدا دانش‌آموزان کلاس «' + esc(activeCls.name) + '» را اضافه کنید.' +
        '<br><button class="btn btn-primary mt-3" onclick="CoreModules.goClassesTab(\'students\')">افزودن دانش‌آموزان</button></div>';
    }

    let html = '<div class="card">' +
      '<div class="attendance-date-nav mb-2">' +
        '<button class="btn btn-sm btn-outline" onclick="CoreModules.stepAttDate(-1)">◀ روز قبل</button>' +
        '<button class="btn btn-sm btn-soft" onclick="CoreModules.pickAttDate()">📅 ' + esc(J.formatJalaliHuman(curDate, true)) + '</button>' +
        '<button class="btn btn-sm btn-outline" onclick="CoreModules.stepAttDate(1)">روز بعد ▶</button>' +
      '</div>' +
      '<div class="flex-between" style="flex-wrap:wrap;gap:6px;">' +
        '<div class="flex-wrap">' +
          '<button class="btn btn-sm btn-success" onclick="CoreModules.markAllPresent()">✓ همه حاضر</button>' +
          '<button class="btn btn-sm btn-outline" onclick="CoreModules.toggleAttSummary()">' +
            (state.attShowSummary ? '📋 برگشت به ثبت روزانه' : '📊 گزارش کل حضور') +
          '</button>' +
        '</div>' +
        '<div class="flex-wrap">' +
          '<button class="btn btn-sm btn-outline" onclick="CoreModules.exportAttendanceCsv()">اکسل CSV</button>' +
          '<button class="btn btn-sm btn-outline" onclick="CoreModules.printAttendanceSheet()">🖨️ PDF</button>' +
        '</div>' +
      '</div>' +
    '</div>';

    if (state.attShowSummary) {
      html += '<div class="card"><h3 class="card-title mb-2">📊 گزارش تجمیعی حضور و غیاب — ' + esc(activeCls.name) + '</h3>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr>' +
          '<th>نام دانش‌آموز</th><th>حاضر</th><th>غایب</th><th>تأخیر</th><th>موجه</th><th>درصد حضور</th>' +
        '</tr></thead><tbody>';
      students.forEach(function (stu) {
        const st = global.Store.computeStudentStats(stu.id, activeCls.id);
        html += '<tr>' +
          '<td style="font-weight:800;"><span style="display:inline-flex;align-items:center;gap:8px;">' +
            studentAvatarHtml(stu, activeCls, { size: 26 }) + '<span>' + esc(stu.name) + '</span></span></td>' +
          '<td style="color:var(--success);font-weight:800;">' + J.toFa(st.present) + '</td>' +
          '<td style="color:var(--danger);font-weight:800;">' + J.toFa(st.absent) + '</td>' +
          '<td>' + J.toFa(st.late) + '</td>' +
          '<td>' + J.toFa(st.excused) + '</td>' +
          '<td><span class="badge ' + (st.attendanceRate >= 85 ? 'badge-success' : 'badge-danger') + '">' + J.toFa(st.attendanceRate) + '٪</span></td>' +
        '</tr>';
      });
      html += '</tbody></table></div></div>';
      return html;
    }

    const session = db.attendance.find(function (a) { return a.classId === activeCls.id && a.date === curDate; });
    const records = (session && session.records) ? session.records : {};

    let pCnt = 0, aCnt = 0, lCnt = 0, eCnt = 0;
    students.forEach(function (s) {
      const r = records[s.id];
      if (r === 'present') pCnt++;
      else if (r === 'absent') aCnt++;
      else if (r === 'late') lCnt++;
      else if (r === 'excused') eCnt++;
    });

    html += '<div class="flex-wrap mb-2">' +
      '<span class="badge badge-success">حاضر: ' + J.toFa(pCnt) + '</span>' +
      '<span class="badge badge-danger">غایب: ' + J.toFa(aCnt) + '</span>' +
      '<span class="badge badge-warning">تأخیر: ' + J.toFa(lCnt) + '</span>' +
      '<span class="badge badge-info">موجه: ' + J.toFa(eCnt) + '</span>' +
    '</div>';

    students.forEach(function (stu) {
      const st = records[stu.id] || '';
      html += '<div class="list-row" style="flex-wrap:wrap;">' +
        '<div style="display:flex;align-items:center;gap:8px;font-weight:800;min-width:150px;">' +
          studentAvatarHtml(stu, activeCls, { size: 28 }) +
          '<span>' + esc(stu.name) +
            (st === 'absent' ? ' <button type="button" class="badge badge-danger" style="cursor:pointer;" onclick="CoreModules.smsAbsence(\'' + escJsAttr(stu.id) + '\')">📩 پیامک غیبت</button>' : '') +
          '</span>' +
        '</div>' +
        '<div class="att-group">' +
          '<button type="button" class="att-btn ' + (st === 'present' ? 'active-present' : '') + '" onclick="CoreModules.setAtt(\'' + escJsAttr(stu.id) + '\', \'present\')">حاضر</button>' +
          '<button type="button" class="att-btn ' + (st === 'absent' ? 'active-absent' : '') + '" onclick="CoreModules.setAtt(\'' + escJsAttr(stu.id) + '\', \'absent\')">غایب</button>' +
          '<button type="button" class="att-btn ' + (st === 'late' ? 'active-late' : '') + '" onclick="CoreModules.setAtt(\'' + escJsAttr(stu.id) + '\', \'late\')">تأخیر</button>' +
          '<button type="button" class="att-btn ' + (st === 'excused' ? 'active-excused' : '') + '" onclick="CoreModules.setAtt(\'' + escJsAttr(stu.id) + '\', \'excused\')">موجه</button>' +
        '</div>' +
      '</div>';
    });

    html += '<div class="card mt-2">' +
      '<label class="form-label">یادداشت جلسه (' + esc(J.toFa(curDate)) + ')</label>' +
      '<input type="text" class="form-control" placeholder="مثلاً: تدریس فصل سوم / پرسش کلاسی..." value="' + esc(session ? session.note : '') + '" onchange="CoreModules.saveAttNote(this.value)">' +
    '</div>';

    return html;
  }

  function renderGradebookSub(activeCls) {
    const db = global.Store.getDb();
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(activeCls.id);
    const exams = db.assessments.filter(function (ex) { return ex.classId === activeCls.id; });
    const isDesc = activeCls.gradingMode === 'descriptive';

    let html = '<div class="flex-between mb-2" style="flex-wrap:wrap;gap:6px;">' +
      '<span class="badge ' + (isDesc ? 'badge-success' : 'badge-info') + '">' +
        (isDesc ? '🌱 حالت ارزشیابی کیفی-توصیفی (۴ سطحی)' : '🔢 حالت نمره‌دهی عددی (۰ تا ۲۰)') +
      '</span>' +
      '<div class="flex-wrap">' +
        (exams.length ? '<button class="btn btn-sm btn-outline" onclick="CoreModules.exportGradesCsv()">اکسل نمرات</button>' : '') +
        '<button class="btn btn-sm btn-primary" onclick="CoreModules.openExamModal()">+ ' + (isDesc ? 'ارزشیابی جدید' : 'آزمون / نمره جدید') + '</button>' +
      '</div>' +
    '</div>';

    if (!exams.length) {
      html += '<div class="card empty-state"><div class="empty-state-icon">📝</div><div>هنوز ارزشیابی یا آزمونی برای این کلاس ثبت نشده است.</div>' +
        '<button class="btn btn-primary mt-3" onclick="CoreModules.openExamModal()">+ ثبت اولین ارزشیابی</button></div>';
      return html;
    }

    exams.slice().reverse().forEach(function (ex) {
      const vals = objectValues(ex.scores || {}).map(Number).filter(function (v) { return !isNaN(v); });
      const avg = vals.length ? (Math.round((vals.reduce(function (a, b) { return a + b; }, 0) / vals.length) * 100) / 100) : null;
      const avgNorm20 = avg !== null ? (avg / (Number(ex.maxScore) || 20)) * 20 : null;
      html += '<div class="card">' +
        '<div class="flex-between">' +
          '<div>' +
            '<div style="font-weight:900;font-size:14.5px;">' + esc(ex.title) + '</div>' +
            '<div class="text-muted text-sm">' +
              esc(ex.category || 'ارزشیابی') + ' • ' + esc(J.formatJalaliHuman(ex.date, false)) +
              (isDesc ? '' : ' • بارم: ' + esc(J.toFa(ex.maxScore)) + ' • ضریب: ' + esc(J.toFa(ex.weight))) +
            '</div>' +
            '<div class="mt-2 flex-wrap">' +
              '<span class="badge badge-primary">ثبت‌شده: ' + J.toFa(vals.length) + ' از ' + J.toFa(students.length) + '</span>' +
              (avg !== null ? (isDesc
                ? '<span class="badge ' + global.Store.score20ToDescriptive(avgNorm20).badgeCls + '">میانگین کلاس: ' + global.Store.score20ToDescriptive(avgNorm20).label + '</span>'
                : '<span class="badge badge-success">میانگین کلاس: ' + J.toFa(avg) + ' از ' + esc(J.toFa(ex.maxScore)) + '</span>') : '') +
            '</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:6px;">' +
            '<button class="btn btn-sm btn-primary" onclick="CoreModules.openScoreEntryModal(\'' + escJsAttr(ex.id) + '\')">' + (isDesc ? 'ثبت توصیفی' : 'ثبت نمرات') + '</button>' +
            '<button class="btn btn-sm btn-outline" onclick="CoreModules.openExamModal(\'' + escJsAttr(ex.id) + '\')">ویرایش</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    });

    if (students.length) {
      html += '<div class="card"><h3 class="card-title mb-2">📈 جدول جامع عملکرد کلاس</h3>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr><th>#</th><th>دانش‌آموز</th>';
      exams.forEach(function (ex) {
        html += '<th>' + esc(ex.title) + (isDesc ? '' : '<br><span style="font-size:10px;font-weight:500;">(از ' + esc(J.toFa(ex.maxScore)) + ')</span>') + '</th>';
      });
      html += '<th>' + (isDesc ? 'ارزیابی کل' : 'معدل وزنی (از ۲۰)') + '</th><th>وضعیت</th></tr></thead><tbody>';

      students.forEach(function (stu, idx) {
        const st = global.Store.computeStudentStats(stu.id, activeCls.id);
        const rk = descriptiveRank(st.avg20, isDesc);
        html += '<tr><td>' + J.toFa(idx + 1) + '</td><td style="font-weight:800;">' + esc(stu.name) + '</td>';
        exams.forEach(function (ex) {
          const rawSc = ex.scores ? ex.scores[stu.id] : undefined;
          html += '<td>' + formatExamCell(activeCls, rawSc, ex.maxScore) + '</td>';
        });
        html += '<td style="font-weight:900;">' +
          (st.avg20 !== null ? (isDesc ? st.descOverall.label : J.toFa(st.avg20)) : '—') +
          '</td><td><span class="badge ' + rk.cls + '">' + rk.label + '</span></td></tr>';
      });
      html += '</tbody></table></div></div>';
    }

    return html;
  }

  function renderReportCardsSub(activeCls) {
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(activeCls.id);
    const isDesc = activeCls.gradingMode === 'descriptive';

    if (!students.length) {
      return '<div class="card empty-state">دانش‌آموزی در این کلاس وجود ندارد.</div>';
    }

    let html = '<div class="card">' +
      '<div class="flex-between mb-2" style="flex-wrap:wrap;gap:8px;">' +
        '<div>' +
          '<h3 class="card-title">🏅 صدور کارنامه رسمی — ' + esc(activeCls.name) + '</h3>' +
          '<div class="text-muted text-sm">خروجی کارنامه ' + (isDesc ? 'کیفی-توصیفی استاندارد' : 'عددی مستمر و پایانی') + ' با فرمت PDF یا ارسال متنی به اولیا</div>' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" onclick="CoreModules.printClassReportCards()">🖨️ چاپ / PDF کل کلاس</button>' +
      '</div>' +
      '<label class="form-label">پیام پایانی معلم در ذیل کارنامه‌ها</label>' +
      '<input type="text" class="form-control" value="' + esc(state.reportTeacherNote) + '" onchange="CoreModules.setReportNote(this.value)">' +
    '</div>';

    students.forEach(function (stu) {
      const st = global.Store.computeStudentStats(stu.id, activeCls.id);
      const rk = descriptiveRank(st.avg20, isDesc);
      html += '<div class="card">' +
        '<div class="flex-between" style="flex-wrap:wrap;gap:8px;">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px;font-weight:900;font-size:15px;">' +
              studentAvatarHtml(stu, activeCls, { size: 34 }) +
              '<span>' + esc(stu.name) + ' <span class="badge ' + rk.cls + '">' + rk.label + '</span></span>' +
            '</div>' +
            '<div class="text-muted text-sm mt-2">' +
              (isDesc
                ? 'نتیجه کیفی: <b>' + (st.avg20 !== null ? st.descOverall.label : 'ثبت‌نشده') + '</b> • '
                : 'معدل وزنی: <b>' + (st.avg20 !== null ? J.faNum(st.avg20) + ' از ۲۰' : 'ثبت‌نشده') + '</b> • ') +
              'حضور: <b>' + J.toFa(st.attendanceRate) + '٪</b> (' + J.toFa(st.absent) + ' غیبت) • ' +
              'تراز کلاسی: <b>' + (st.netBehavior > 0 ? '+' : (st.netBehavior < 0 ? '−' : '')) + J.toFa(Math.abs(st.netBehavior)) + '</b>' +
            '</div>' +
          '</div>' +
          '<div class="flex-wrap">' +
            '<button class="btn btn-sm btn-soft" onclick="CoreModules.printSingleReportCard(\'' + escJsAttr(stu.id) + '\')">🖨️ کارنامه PDF</button>' +
            '<button class="btn btn-sm btn-outline" onclick="CoreModules.shareTextReportCard(\'' + escJsAttr(stu.id) + '\')">📤 ارسال به ولی</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    });

    return html;
  }

  function buildReportCardHtmlBlock(stu, cls, db) {
    const J = global.Jalali;
    const st = global.Store.computeStudentStats(stu.id, cls.id);
    const isDesc = cls.gradingMode === 'descriptive';
    const rk = descriptiveRank(st.avg20, isDesc);
    const todayStr = J.formatJalaliHuman(J.getTodayStr(), false);

    let rowsHtml = '';
    if (!st.examDetails.length) {
      rowsHtml = '<tr><td colspan="5" style="text-align:center;">ارزشیابی ثبت نشده است</td></tr>';
    } else {
      st.examDetails.forEach(function (ex, idx) {
        rowsHtml += '<tr>' +
          '<td>' + J.toFa(idx + 1) + '</td>' +
          '<td>' + esc(ex.title) + ' (' + esc(ex.category) + ')</td>' +
          '<td>' + esc(J.toFa(ex.date)) + '</td>' +
          '<td>' + esc(J.toFa(ex.weight)) + '</td>' +
          '<td><b>' + (isDesc ? ex.desc.label : (J.toFa(ex.score) + ' از ' + esc(J.toFa(ex.maxScore)))) + '</b></td>' +
        '</tr>';
      });
    }

    return '<div class="report-box">' +
      '<div class="report-head">' +
        '<div>' +
          '<h2>کارنامه وضعیت تحصیلی و تربیتی (' + (isDesc ? 'کیفی-توصیفی' : 'عددی') + ')</h2>' +
          '<div>' + esc(db.settings.schoolName || 'سامانه آموزشی درس‌یار ۲.۰') + ' • سال تحصیلی ' + esc(db.settings.academicYear || '۱۴۰۵-۱۴۰۶') + '</div>' +
        '</div>' +
        '<div style="text-align:left;font-size:11.5px;">' +
          '<div>تاریخ صدور: ' + esc(todayStr) + '</div>' +
          '<div>دبیر / آموزگار: ' + esc(db.settings.teacherName || '—') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="grid-4">' +
        '<div class="stat-box"><div>نام دانش‌آموز</div><b>' + esc(stu.name) + '</b></div>' +
        '<div class="stat-box"><div>کلاس / درس</div><b>' + esc(cls.name) + '</b></div>' +
        '<div class="stat-box"><div>' + (isDesc ? 'نتیجه کیفی کل' : 'معدل وزنی (از ۲۰)') + '</div><b>' +
          (st.avg20 !== null ? (isDesc ? st.descOverall.label : (J.toFa(st.avg20) + ' (' + rk.label + ')')) : '—') +
        '</b></div>' +
        '<div class="stat-box"><div>حضور / انضباط</div><b>' + J.toFa(st.attendanceRate) + '٪ | امتیاز: ' + (st.netBehavior > 0 ? '+' : '') + J.toFa(st.netBehavior) + '</b></div>' +
      '</div>' +
      '<table><thead><tr><th>#</th><th>عنوان ارزشیابی / آزمون</th><th>تاریخ</th><th>ضریب</th><th>نتیجه مکتسبه</th></tr></thead><tbody>' +
        rowsHtml +
      '</tbody></table>' +
      '<div style="margin-top:8px;font-size:12px;">' +
        '<b>خلاصه حضور و تکالیف:</b> حاضر: ' + J.toFa(st.present) + ' جلسه | غایب: ' + J.toFa(st.absent) + ' جلسه | تأخیر: ' + J.toFa(st.late) + ' | تکالیف کامل: ' + J.toFa(st.hwDone) +
      '</div>' +
      '<div style="margin-top:8px;padding:8px;background:#F8FAFC;border-radius:8px;border:1px dashed #94A3B8;">' +
        '<b>توصیه و نظر معلم:</b> ' + esc(state.reportTeacherNote) +
      '</div>' +
    '</div>';
  }

  // ==================== پنجره‌های افزودن/ویرایش و اکشن‌ها ====================
  function openClassModal(editId) {
    const cls = editId ? global.Store.getClassById(editId) : null;
    const pickedColor = cls ? cls.color : global.Store.CLASS_COLORS[0];
    const gMode = (cls && cls.gradingMode) ? cls.gradingMode : 'numeric';

    let colorSwatches = '';
    global.Store.CLASS_COLORS.forEach(function (c) {
      colorSwatches += '<label style="cursor:pointer;display:inline-flex;align-items:center;gap:3px;">' +
        '<input type="radio" name="cls_color" value="' + c + '" ' + (c === pickedColor ? 'checked' : '') + '>' +
        '<span style="width:24px;height:24px;border-radius:8px;background:' + c + ';display:inline-block;"></span>' +
      '</label>';
    });

    const html = '<form onsubmit="CoreModules.saveClassForm(event, \'' + escJsAttr(editId || '') + '\')">' +
      '<div class="form-group"><label class="form-label">نام کلاس *</label>' +
        '<input id="f_cls_name" class="form-control" required placeholder="مثلاً: ریاضی نهم - الف / علوم چهارم" value="' + esc(cls ? cls.name : '') + '"></div>' +
      '<div class="form-group"><label class="form-label">شیوه ارزشیابی کلاس</label>' +
        '<select id="f_cls_gmode" class="form-control">' +
          '<option value="numeric" ' + (gMode === 'numeric' ? 'selected' : '') + '>🔢 عددی استاندارد (۰ تا ۲۰ — متوسطه، دانشگاه و آموزشگاه)</option>' +
          '<option value="descriptive" ' + (gMode === 'descriptive' ? 'selected' : '') + '>🌱 کیفی-توصیفی ۴ سطحی (خیلی خوب تا نیاز به تلاش — ابتدایی)</option>' +
        '</select></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">نام درس / رشته</label>' +
          '<input id="f_cls_subj" class="form-control" placeholder="مثلاً: ریاضی" value="' + esc(cls ? cls.subject : '') + '"></div>' +
        '<div class="form-group"><label class="form-label">پایه / مقطع</label>' +
          '<input id="f_cls_grade" class="form-control" placeholder="مثلاً: نهم" value="' + esc(cls ? cls.gradeLevel : '') + '"></div>' +
      '</div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">نوع کلاس</label>' +
          '<select id="f_cls_type" class="form-control">' +
            '<option value="school" ' + (!cls || cls.type === 'school' ? 'selected' : '') + '>مدرسه‌ای / عمومی</option>' +
            '<option value="private" ' + (cls && cls.type === 'private' ? 'selected' : '') + '>خصوصی / آموزشگاهی</option>' +
          '</select></div>' +
        '<div class="form-group"><label class="form-label">شماره اتاق / محل</label>' +
          '<input id="f_cls_room" class="form-control" placeholder="مثلاً: کلاس ۱۰۲" value="' + esc(cls ? cls.room : '') + '"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">شهریه پیش‌فرض ماهانه/دوره (تومان - اختیاری)</label>' +
        '<input id="f_cls_fee" type="text" inputmode="numeric" class="form-control" placeholder="مثلاً: 1500000" value="' + esc(cls && cls.defaultFee ? cls.defaultFee : '') + '"></div>' +
      '<div class="form-group"><label class="form-label">رنگ نماد کلاس</label><div class="flex-wrap">' + colorSwatches + '</div></div>' +
      '<div class="flex-between mt-3">' +
        (cls ? '<button type="button" class="btn btn-danger" onclick="CoreModules.deleteClass(\'' + escJsAttr(cls.id) + '\')">حذف کلاس</button>' : '<span></span>') +
        '<button type="submit" class="btn btn-primary">ذخیره کلاس ✓</button>' +
      '</div>' +
    '</form>';

    global.App.openModal(cls ? 'ویرایش کلاس' : 'افزودن کلاس جدید', html);
  }

  function saveClassForm(ev, editId) {
    ev.preventDefault();
    const db = global.Store.getDb();
    const name = document.getElementById('f_cls_name').value.trim();
    if (!name) return;
    const colorEl = document.querySelector('input[name="cls_color"]:checked');
    const data = {
      name: name,
      gradingMode: document.getElementById('f_cls_gmode').value || 'numeric',
      subject: document.getElementById('f_cls_subj').value.trim(),
      gradeLevel: document.getElementById('f_cls_grade').value.trim(),
      type: document.getElementById('f_cls_type').value,
      room: document.getElementById('f_cls_room').value.trim(),
      defaultFee: global.Jalali.parseNum(document.getElementById('f_cls_fee').value, 0),
      color: colorEl ? colorEl.value : '#0B6E75'
    };

    if (editId) {
      const target = global.Store.getClassById(editId);
      if (target) Object.assign(target, data);
    } else {
      const newId = global.Store.uid('cls');
      db.classes.push(Object.assign({ id: newId, createdAt: Date.now() }, data));
      db.settings.activeClassId = newId;
    }
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('کلاس ذخیره شد ✓');
  }

  function deleteClass(classId) {
    global.App.confirmDialog('آیا از حذف این کلاس و تمام دانش‌آموزان و سوابق آن مطمئن هستید؟', function () {
      global.Store.deleteClassCascade(classId);
      global.App.closeModal();
      global.App.render();
      global.App.toast('کلاس حذف شد');
    });
  }

  function openStudentModal(editId) {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const stu = editId ? global.Store.getStudentById(editId) : null;

    pendingStudentPhoto = (stu && typeof stu.photo === 'string' && global.Store.isValidStudentPhoto(stu.photo)) ? stu.photo : '';

    const html = '<form onsubmit="CoreModules.saveStudentForm(event, \'' + escJsAttr(editId || '') + '\')">' +
      '<div class="form-group"><label class="form-label">عکس دانش‌آموز (اختیاری)</label>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<div id="stu_photo_preview" style="flex:0 0 auto;"></div>' +
          '<div style="flex:1;display:flex;flex-direction:column;gap:6px;">' +
            '<button type="button" class="btn btn-outline btn-sm" onclick="CoreModules.pickStudentPhoto()">📷 انتخاب عکس</button>' +
            '<button type="button" class="btn btn-outline btn-sm" onclick="CoreModules.clearStudentPhoto()">حذف عکس</button>' +
          '</div>' +
        '</div>' +
        '<p class="text-muted" style="font-size:11px;line-height:1.7;margin:6px 0 0;">عکس روی همین گوشی کوچک و فشرده می‌شود و فقط در حافظهٔ برنامه می‌ماند؛ هیچ اینترنتی لازم نیست.</p>' +
      '</div>' +
      '<input id="f_stu_photo_file" type="file" accept="image/*" style="display:none;" onchange="CoreModules.onPhotoFileChosen(event)">' +
      '<div class="form-group"><label class="form-label">نام و نام خانوادگی دانش‌آموز *</label>' +
        '<input id="f_stu_name" class="form-control" required placeholder="مثلاً: علی محمدی" value="' + esc(stu ? stu.name : '') + '"></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">کد / شماره کلاسی</label>' +
          '<input id="f_stu_code" class="form-control" placeholder="مثلاً: ۱۰۵" value="' + esc(stu ? stu.code : '') + '"></div>' +
        '<div class="form-group"><label class="form-label">نام ولی</label>' +
          '<input id="f_stu_pname" class="form-control" placeholder="مثلاً: آقای محمدی" value="' + esc(stu ? stu.parentName : '') + '"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">شماره موبایل ولی (جهت تماس و پیامک)</label>' +
        '<input id="f_stu_phone" type="tel" dir="ltr" class="form-control" placeholder="0912..." value="' + esc(stu ? stu.parentPhone : '') + '"></div>' +
      '<div class="form-group"><label class="form-label">یادداشت آموزشی یا پزشکی</label>' +
        '<textarea id="f_stu_notes" rows="2" class="form-control" placeholder="نکات مهم درباره شاگرد...">' + esc(stu ? stu.notes : '') + '</textarea></div>' +
      '<div class="flex-between mt-3">' +
        (stu ? '<button type="button" class="btn btn-danger" onclick="CoreModules.deleteStudent(\'' + escJsAttr(stu.id) + '\')">حذف شاگرد</button>' : '<span></span>') +
        '<button type="submit" class="btn btn-primary">ذخیره دانش‌آموز</button>' +
      '</div>' +
    '</form>';

    global.App.openModal(stu ? 'ویرایش دانش‌آموز' : 'افزودن دانش‌آموز به «' + activeCls.name + '»', html);
    renderStudentPhotoPreview();
  }

  function saveStudentForm(ev, editId) {
    ev.preventDefault();
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    const name = document.getElementById('f_stu_name').value.trim();
    if (!name) return;

    const data = {
      name: name,
      code: document.getElementById('f_stu_code').value.trim(),
      parentName: document.getElementById('f_stu_pname').value.trim(),
      parentPhone: global.Jalali.toEn(document.getElementById('f_stu_phone').value.trim()),
      notes: document.getElementById('f_stu_notes').value.trim()
    };
    if (pendingStudentPhoto) data.photo = pendingStudentPhoto;

    if (editId) {
      const target = global.Store.getStudentById(editId);
      if (target) {
        Object.assign(target, data);
        if (!data.photo) delete target.photo;
      }
    } else {
      const colors = global.Store.CLASS_COLORS;
      db.students.push(Object.assign({
        id: global.Store.uid('stu'),
        classId: activeCls.id,
        avatarColor: colors[db.students.length % colors.length],
        createdAt: Date.now()
      }, data));
    }
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('اطلاعات شاگرد ذخیره شد ✓');
  }

  function deleteStudent(stuId) {
    global.App.confirmDialog('آیا از حذف این دانش‌آموز اطمینان دارید؟', function () {
      global.Store.deleteStudentCascade(stuId);
      global.App.closeModal();
      global.App.render();
      global.App.toast('دانش‌آموز حذف شد');
    });
  }

  // ورود گروهی هوشمند (حذف خودکار شماره ردیف + استخراج موبایل ولی در صورت وجود)
  function openBulkStudentsModal() {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const html = '<form onsubmit="CoreModules.saveBulkStudents(event)">' +
      '<p class="text-muted text-sm" style="margin-top:0;">اسامی شاگردان را از اکسل، سیدا یا شاد کپی و اینجا جایگذاری کنید (شماره ردیف ابتدای خط خودکار حذف می‌شود؛ درج شماره موبایل جلوی نام هم پشتیبانی می‌شود):</p>' +
      '<textarea id="f_bulk_names" rows="7" class="form-control" required placeholder="۱. امیرحسین علوی - 09121112233\n۲. محمدرضا صادقی\n۳. کیانوش رحیمی"></textarea>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">افزودن یکجای کل لیست ✓</button>' +
    '</form>';
    global.App.openModal('ورود گروهی ۳۰ ثانیه‌ای — ' + activeCls.name, html);
  }

  function saveBulkStudents(ev) {
    ev.preventDefault();
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const raw = document.getElementById('f_bulk_names').value || '';
    const lines = raw.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    if (!lines.length) return;
    const db = global.Store.getDb();
    const colors = global.Store.CLASS_COLORS;
    let added = 0;

    lines.forEach(function (line, idx) {
      let cleaned = global.Jalali.toEn(line)
        .replace(/^\s*\d+\s*[\.\-\)\/\|:]\s*/, '')
        .trim();
      let phone = '';
      const phoneMatch = cleaned.match(/(09\d{9})/);
      if (phoneMatch) {
        phone = phoneMatch[1];
        cleaned = cleaned.replace(phoneMatch[1], '').replace(/[\-،,\|\/]+/g, ' ').trim();
      }
      if (!cleaned) return;
      db.students.push({
        id: global.Store.uid('stu_' + idx),
        classId: activeCls.id,
        name: cleaned,
        code: String(db.students.filter(function (s) { return s.classId === activeCls.id; }).length + 1),
        parentName: '',
        parentPhone: phone,
        avatarColor: colors[(db.students.length + idx) % colors.length],
        notes: '',
        createdAt: Date.now()
      });
      added++;
    });

    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast(global.Jalali.toFa(added) + ' دانش‌آموز با موفقیت اضافه شد ✓');
  }

  function openStudentProfile(stuId) {
    const stu = global.Store.getStudentById(stuId);
    if (!stu) return;
    const cls = global.Store.getClassById(stu.classId);
    if (!cls) return;
    const J = global.Jalali;
    const isDesc = cls.gradingMode === 'descriptive';
    const st = global.Store.computeStudentStats(stu.id, cls.id);
    const rk = descriptiveRank(st.avg20, isDesc);

    let exList = '';
    st.examDetails.forEach(function (e) {
      exList += '<div class="flex-between text-sm" style="padding:6px 0;border-bottom:1px solid var(--border);">' +
        '<span>' + esc(e.title) + ' (' + esc(J.toFa(e.date)) + ')</span>' +
        '<b>' + (isDesc ? '<span class="badge ' + e.desc.badgeCls + '">' + e.desc.label + '</span>' : (J.toFa(e.score) + ' از ' + J.toFa(e.maxScore))) + '</b>' +
      '</div>';
    });

    const html = '<div style="text-align:center;margin-bottom:12px;">' +
        '<div style="margin:0 auto 6px;">' + studentAvatarHtml(stu, cls, { size: 58 }) + '</div>' +
        '<div style="font-size:17px;font-weight:900;">' + esc(stu.name) + '</div>' +
        '<div class="text-muted text-sm">' + esc(cls.name) + (stu.code ? ' • کد: ' + esc(J.toFa(stu.code)) : '') + '</div>' +
        '<div class="mt-2"><span class="badge ' + rk.cls + '">' + rk.label + '</span></div>' +
      '</div>' +
      '<div class="stats-grid" style="grid-template-columns:repeat(2,1fr);">' +
        '<div class="stat-card"><div class="stat-val" style="font-size:' + (isDesc ? '14px' : '18px') + ';">' +
          (st.avg20 !== null ? (isDesc ? st.descOverall.label : J.toFa(st.avg20)) : '—') +
        '</div><div class="stat-lbl">' + (isDesc ? 'ارزیابی توصیفی' : 'معدل وزنی از ۲۰') + '</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + J.toFa(st.attendanceRate) + '٪</div><div class="stat-lbl">حضور (' + J.toFa(st.absent) + ' غیبت)</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + (st.netBehavior > 0 ? '+' : '') + J.toFa(st.netBehavior) + '</div><div class="stat-lbl">تراز انضباطی</div></div>' +
        '<div class="stat-card"><div class="stat-val" style="font-size:14px;">' + (st.dueFee > 0 ? J.formatMoney(st.dueFee) : 'تسویه') + '</div><div class="stat-lbl">مانده شهریه</div></div>' +
      '</div>' +
      (exList ? '<div class="mb-2"><div class="form-label">ریز ارزشیابی‌های ثبت‌شده</div>' + exList + '</div>' : '') +
      (stu.notes ? '<div class="card" style="background:var(--surface-2);font-size:12.5px;">📌 ' + esc(stu.notes) + '</div>' : '') +
      '<div class="flex-wrap mt-3" style="justify-content:center;">' +
        (stu.parentPhone ? '<button class="btn btn-sm btn-soft" onclick="Store.dialPhone(\'' + escJsAttr(stu.parentPhone) + '\')">📞 تماس با ولی</button>' : '') +
        '<button class="btn btn-sm btn-outline" onclick="CoreModules.shareTextReportCard(\'' + escJsAttr(stu.id) + '\')">📩 ارسال گزارش به ولی</button>' +
        '<button class="btn btn-sm btn-primary" onclick="App.closeModal();CoreModules.printSingleReportCard(\'' + escJsAttr(stu.id) + '\')">🖨️ کارنامه PDF</button>' +
      '</div>';

    global.App.openModal('پرونده جامع دانش‌آموز', html);
  }

  function getOrCreateAttSession(classId, dateStr) {
    const db = global.Store.getDb();
    let s = db.attendance.find(function (a) { return a.classId === classId && a.date === dateStr; });
    if (!s) {
      s = { id: global.Store.uid('att'), classId: classId, date: dateStr, records: {}, note: '' };
      db.attendance.push(s);
    }
    return s;
  }

  function setAtt(stuId, status) {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const s = getOrCreateAttSession(activeCls.id, ensureAttDate());
    s.records[stuId] = status;
    global.Store.save();
    global.Store.vibrate(20);
    global.App.render();
  }

  function markAllPresent() {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const s = getOrCreateAttSession(activeCls.id, ensureAttDate());
    global.Store.getStudentsByClass(activeCls.id).forEach(function (stu) {
      s.records[stu.id] = 'present';
    });
    global.Store.save();
    global.App.render();
    global.App.toast('همه دانش‌آموزان حاضر ثبت شدند ✓');
  }

  function saveAttNote(val) {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const s = getOrCreateAttSession(activeCls.id, ensureAttDate());
    s.note = val.trim();
    global.Store.save();
  }

  function smsAbsence(stuId) {
    const stu = global.Store.getStudentById(stuId);
    const cls = global.Store.getActiveClass();
    if (!stu || !cls) return;
    const dateHuman = global.Jalali.formatJalaliHuman(ensureAttDate(), true);
    const msg = 'سلام و احترام، به اطلاع می‌رساند فرزند گرامی شما «' + stu.name + '» در جلسه روز ' + dateHuman + ' کلاس «' + cls.name + '» غیبت داشته‌اند. با تشکر.';
    global.Store.sendSms(stu.parentPhone || '', msg);
  }

  function openExamModal(editId) {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    const ex = editId ? db.assessments.find(function (e) { return e.id === editId; }) : null;
    const initDate = ex ? ex.date : global.Jalali.getTodayStr();
    const isDesc = activeCls.gradingMode === 'descriptive';

    const cats = isDesc
      ? ['فعالیت عملکردی', 'مشاهده کلاسی', 'آزمون مدادکاغذی', 'پروژه و پوشه‌کار', 'ارزشیابی پایانی']
      : ['کوییز مستمر', 'پرسش کلاسی', 'امتحان مستمر', 'میان‌ترم', 'آزمون پایانی', 'پروژه عملی'];
    let catOpts = '';
    cats.forEach(function (c) {
      catOpts += '<option value="' + c + '" ' + (ex && ex.category === c ? 'selected' : '') + '>' + c + '</option>';
    });

    const html = '<form onsubmit="CoreModules.saveExamForm(event, \'' + escJsAttr(editId || '') + '\')">' +
      '<div class="form-group"><label class="form-label">عنوان ارزشیابی یا آزمون *</label>' +
        '<input id="f_ex_title" class="form-control" required placeholder="مثلاً: ارزشیابی فصل دوم" value="' + esc(ex ? ex.title : '') + '"></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">دسته‌بندی</label>' +
          '<select id="f_ex_cat" class="form-control">' + catOpts + '</select></div>' +
        '<div class="form-group"><label class="form-label">تاریخ شمسی</label>' +
          '<input id="f_ex_date" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_ex_date\').value=d; })" value="' + esc(initDate) + '"></div>' +
      '</div>' +
      '<div class="form-row" style="' + (isDesc ? 'display:none;' : '') + '">' +
        '<div class="form-group"><label class="form-label">سقف نمره (بارم کل)</label>' +
          '<input id="f_ex_max" type="text" inputmode="decimal" class="form-control" value="' + esc(ex ? ex.maxScore : 20) + '"></div>' +
        '<div class="form-group"><label class="form-label">ضریب اهمیت در معدل</label>' +
          '<input id="f_ex_weight" type="text" inputmode="decimal" class="form-control" value="' + esc(ex ? ex.weight : 1) + '"></div>' +
      '</div>' +
      '<div class="flex-between mt-3">' +
        (ex ? '<button type="button" class="btn btn-danger" onclick="CoreModules.deleteExam(\'' + escJsAttr(ex.id) + '\')">حذف</button>' : '<span></span>') +
        '<button type="submit" class="btn btn-primary">ذخیره و ثبت نتایج</button>' +
      '</div>' +
    '</form>';

    global.App.openModal(ex ? 'ویرایش ارزشیابی' : 'تعریف ارزشیابی جدید', html);
  }

  function saveExamForm(ev, editId) {
    ev.preventDefault();
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    const title = document.getElementById('f_ex_title').value.trim();
    if (!title) return;
    const maxScore = Math.max(1, global.Jalali.parseNum(document.getElementById('f_ex_max').value, 20));
    const weight = Math.max(0.25, global.Jalali.parseNum(document.getElementById('f_ex_weight').value, 1));
    const date = document.getElementById('f_ex_date').value.trim() || global.Jalali.getTodayStr();
    const category = document.getElementById('f_ex_cat').value;

    let targetId = editId;
    if (editId) {
      const target = db.assessments.find(function (e) { return e.id === editId; });
      if (target) {
        const highest = objectValues(target.scores || {}).some(function (value) {
          return value !== null && value !== '' && Number.isFinite(Number(value)) && Number(value) > maxScore;
        });
        if (highest) {
          global.App.toast('سقف جدید از بعضی نمرات ثبت‌شده کمتر است؛ ابتدا آن نمرات را ویرایش کنید.');
          return;
        }
        Object.assign(target, { title: title, category: category, date: date, maxScore: maxScore, weight: weight });
      }
    } else {
      targetId = global.Store.uid('ex');
      db.assessments.push({
        id: targetId,
        classId: activeCls.id,
        title: title,
        category: category,
        date: date,
        maxScore: maxScore,
        weight: weight,
        scores: {},
        note: ''
      });
    }
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    if (!editId) {
      setTimeout(function () { openScoreEntryModal(targetId); }, 120);
    } else {
      global.App.toast('ارزشیابی بروزرسانی شد ✓');
    }
  }

  function deleteExam(exId) {
    global.App.confirmDialog('آیا این ارزشیابی و نتایج ثبت‌شده آن حذف شود؟', function () {
      const db = global.Store.getDb();
      db.assessments = db.assessments.filter(function (e) { return e.id !== exId; });
      global.Store.save();
      global.App.closeModal();
      global.App.render();
      global.App.toast('ارزشیابی حذف شد');
    });
  }

  // ثبت نمرات عددی یا ۴ سطحی توصیفی
  function openScoreEntryModal(examId) {
    const db = global.Store.getDb();
    const ex = db.assessments.find(function (e) { return e.id === examId; });
    if (!ex) return;
    const cls = global.Store.getClassById(ex.classId);
    const isDesc = cls && cls.gradingMode === 'descriptive';
    const students = global.Store.getStudentsByClass(ex.classId);
    const J = global.Jalali;

    let rows = '';
    if (isDesc) {
      students.forEach(function (stu) {
        const cur = (ex.scores && ex.scores[stu.id] !== undefined) ? Number(ex.scores[stu.id]) : null;
        const curKey = cur !== null ? global.Store.score20ToDescriptive((cur / (Number(ex.maxScore) || 20)) * 20).key : '';
        let pills = '';
        global.Store.DESC_LEVELS.forEach(function (lvl) {
          const activeClsName = curKey === lvl.key ? lvl.pillCls : '';
          pills += '<button type="button" class="desc-pill ' + activeClsName + '" data-stuid="' + esc(stu.id) + '" data-val="' + lvl.score20 + '" onclick="CoreModules.pickDescLevel(this)">' + lvl.short + '</button>';
        });
        rows += '<div style="padding:8px 0;border-bottom:1px solid var(--border);">' +
          '<div style="font-weight:800;font-size:13.5px;">' + esc(stu.name) + '</div>' +
          '<input type="hidden" class="score-inp" data-stuid="' + esc(stu.id) + '" value="' + (cur !== null ? cur : '') + '">' +
          '<div class="desc-grade-group">' + pills + '</div>' +
        '</div>';
      });
    } else {
      students.forEach(function (stu) {
        const cur = (ex.scores && ex.scores[stu.id] !== undefined) ? ex.scores[stu.id] : '';
        rows += '<div class="flex-between" style="padding:7px 0;border-bottom:1px solid var(--border);">' +
          '<span style="font-weight:800;">' + esc(stu.name) + '</span>' +
          '<input type="text" inputmode="decimal" dir="ltr" style="width:94px;text-align:center;font-weight:900;" class="form-control score-inp" data-stuid="' + esc(stu.id) + '" placeholder="از ' + esc(J.toFa(ex.maxScore)) + '" value="' + esc(cur) + '">' +
        '</div>';
      });
    }

    const html = '<form onsubmit="CoreModules.saveScoreBatch(event, \'' + escJsAttr(examId) + '\')">' +
      (isDesc
        ? '<div class="flex-between mb-2"><span class="text-muted text-sm">انتخاب سطح کیفی برای هر شاگرد:</span><button type="button" class="btn btn-sm btn-soft" onclick="CoreModules.fillAllDesc(19.5)">✓ همه خیلی‌خوب</button></div>'
        : '<div class="text-muted text-sm mb-2">بارم کل: ' + esc(J.toFa(ex.maxScore)) + ' (اعداد فارسی و انگلیسی هر دو قابل قبول‌اند)</div>') +
      '<div style="max-height:55vh;overflow-y:auto;padding-left:4px;">' + rows + '</div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ذخیره نتایج کلاس ✓</button>' +
    '</form>';

    global.App.openModal((isDesc ? 'ثبت توصیفی: ' : 'ثبت نمرات: ') + ex.title, html);
  }

  function pickDescLevel(btn) {
    const sid = btn.getAttribute('data-stuid');
    const val = btn.getAttribute('data-val');
    const group = btn.parentNode;
    group.querySelectorAll('.desc-pill').forEach(function (b) {
      b.className = 'desc-pill';
    });
    const lvl = global.Store.DESC_LEVELS.find(function (l) { return String(l.score20) === String(val); });
    if (lvl) btn.classList.add(lvl.pillCls);
    const hidden = group.parentNode.querySelector('input.score-inp');
    if (hidden) { hidden.value = val; hidden.dataset.descScale20 = '1'; }
    global.Store.vibrate(18);
  }

  function fillAllDesc(val) {
    document.querySelectorAll('input.score-inp').forEach(function (inp) {
      inp.value = String(val);
      inp.dataset.descScale20 = '1';
    });
    document.querySelectorAll('.desc-grade-group').forEach(function (g) {
      g.querySelectorAll('.desc-pill').forEach(function (b) {
        b.className = 'desc-pill';
        if (b.getAttribute('data-val') === String(val)) b.classList.add('active-vg');
      });
    });
    global.Store.vibrate(25);
  }

  function saveScoreBatch(ev, examId) {
    ev.preventDefault();
    const db = global.Store.getDb();
    const ex = db.assessments.find(function (e) { return e.id === examId; });
    if (!ex) return;
    const cls = global.Store.getClassById(ex.classId);
    const isDesc = !!(cls && cls.gradingMode === 'descriptive');
    const maxScore = Number(ex.maxScore) || 20;
    const inputs = document.querySelectorAll('.score-inp');
    const changes = [];
    for (let index = 0; index < inputs.length; index++) {
      const inp = inputs[index];
      const sid = inp.getAttribute('data-stuid');
      const raw = (inp.value || '').trim();
      if (!raw) { changes.push({ id: sid, value: null }); continue; }
      let num = global.Jalali.parseNum(raw, NaN);
      if (isDesc && inp.dataset.descScale20 === '1') num = num * maxScore / 20;
      if (!Number.isFinite(num) || num < 0 || num > maxScore) {
        global.App.toast('نمره معتبر، بین صفر و سقف آزمون وارد کنید؛ هیچ نمره‌ای تغییر نکرد.');
        inp.focus();
        return;
      }
      changes.push({ id: sid, value: Math.round(num * 100) / 100 });
    }
    const oldScores = ex.scores;
    ex.scores = Object.assign({}, oldScores || {});
    changes.forEach(function (change) {
      if (change.value === null) delete ex.scores[change.id];
      else ex.scores[change.id] = change.value;
    });
    if (!global.Store.save()) { ex.scores = oldScores; return; }
    global.App.closeModal();
    global.App.render();
    global.App.toast('نتایج با موفقیت ثبت شد ✓');
  }

  function exportAttendanceCsv() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const students = global.Store.getStudentsByClass(cls.id);
    const headers = ['نام دانش‌آموز', 'کد', 'تعداد حاضر', 'تعداد غایب', 'تأخیر', 'غیبت موجه', 'درصد حضور'];
    const rows = students.map(function (s) {
      const st = global.Store.computeStudentStats(s.id, cls.id);
      return [s.name, s.code || '', st.present, st.absent, st.late, st.excused, st.attendanceRate + '%'];
    });
    global.Store.exportCsv('Attendance-' + cls.name + '.csv', headers, rows);
  }

  function printAttendanceSheet() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(cls.id);
    let trs = '';
    students.forEach(function (s, idx) {
      const st = global.Store.computeStudentStats(s.id, cls.id);
      trs += '<tr><td>' + J.toFa(idx + 1) + '</td><td>' + esc(s.name) + '</td><td>' + J.toFa(st.present) + '</td><td>' + J.toFa(st.absent) + '</td><td>' + J.toFa(st.late) + '</td><td>' + J.toFa(st.excused) + '</td><td>' + J.toFa(st.attendanceRate) + '٪</td></tr>';
    });
    const html = '<div class="report-box"><div class="report-head"><h2>گزارش حضور و غیاب — ' + esc(cls.name) + '</h2><div>تاریخ: ' + esc(J.formatJalaliHuman(J.getTodayStr(), false)) + '</div></div>' +
      '<table><thead><tr><th>#</th><th>نام دانش‌آموز</th><th>حاضر</th><th>غایب</th><th>تأخیر</th><th>موجه</th><th>درصد حضور</th></tr></thead><tbody>' + trs + '</tbody></table></div>';
    global.Store.printReportHtml('لیست حضور و غیاب ' + cls.name, html);
  }

  function exportGradesCsv() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const isDesc = cls.gradingMode === 'descriptive';
    const db = global.Store.getDb();
    const students = global.Store.getStudentsByClass(cls.id);
    const exams = db.assessments.filter(function (e) { return e.classId === cls.id; });
    const headers = ['نام دانش‌آموز', 'کد'].concat(exams.map(function (e) { return e.title; })).concat([isDesc ? 'نتیجه کیفی کل' : 'معدل وزنی از ۲۰']);
    const rows = students.map(function (s) {
      const st = global.Store.computeStudentStats(s.id, cls.id);
      const scs = exams.map(function (e) {
        if (!e.scores || e.scores[s.id] === undefined) return '';
        if (isDesc) return global.Store.score20ToDescriptive((Number(e.scores[s.id]) / (Number(e.maxScore) || 20)) * 20).label;
        return e.scores[s.id];
      });
      return [s.name, s.code || ''].concat(scs).concat([st.avg20 !== null ? (isDesc ? st.descOverall.label : st.avg20) : '']);
    });
    global.Store.exportCsv('Grades-' + cls.name + '.csv', headers, rows);
  }

  function printSingleReportCard(stuId) {
    const stu = global.Store.getStudentById(stuId);
    const cls = stu ? global.Store.getClassById(stu.classId) : null;
    if (!stu || !cls) return;
    const html = buildReportCardHtmlBlock(stu, cls, global.Store.getDb());
    global.Store.printReportHtml('کارنامه ' + stu.name, html);
  }

  function printClassReportCards() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const db = global.Store.getDb();
    const students = global.Store.getStudentsByClass(cls.id);
    const blocks = students.map(function (s, idx) {
      return buildReportCardHtmlBlock(s, cls, db) + (idx < students.length - 1 ? '<div class="page-break"></div>' : '');
    }).join('');
    global.Store.printReportHtml('کارنامه کل کلاس ' + cls.name, blocks);
  }

  function shareTextReportCard(stuId) {
    const stu = global.Store.getStudentById(stuId);
    const cls = stu ? global.Store.getClassById(stu.classId) : null;
    if (!stu || !cls) return;
    const J = global.Jalali;
    const isDesc = cls.gradingMode === 'descriptive';
    const st = global.Store.computeStudentStats(stu.id, cls.id);
    const rk = descriptiveRank(st.avg20, isDesc);
    const lines = [
      '📄 کارنامه وضعیت تحصیلی دانش‌آموز: ' + stu.name,
      '🏫 کلاس: ' + cls.name,
      isDesc
        ? ('🌱 نتیجه کیفی کل: ' + (st.avg20 !== null ? st.descOverall.label : 'ثبت‌نشده'))
        : ('📊 معدل وزنی (از ۲۰): ' + (st.avg20 !== null ? J.toFa(st.avg20) + ' (' + rk.label + ')' : 'ثبت‌نشده')),
      '✅ درصد حضور: ' + J.toFa(st.attendanceRate) + '٪ (غیبت: ' + J.toFa(st.absent) + ')',
      '⭐ امتیاز کلاسی: ' + (st.netBehavior > 0 ? '+' : '') + J.toFa(st.netBehavior)
    ];
    st.examDetails.forEach(function (e) {
      lines.push('• ' + e.title + ': ' + (isDesc ? e.desc.label : (J.toFa(e.score) + ' از ' + J.toFa(e.maxScore))));
    });
    lines.push('📌 ' + state.reportTeacherNote);
    global.Store.shareText('کارنامه ' + stu.name, lines.join('\n'));
  }

  function quickBehavior(stuId, type, label, pts) {
    const stu = global.Store.getStudentById(stuId);
    if (!stu) return;
    const db = global.Store.getDb();
    db.behaviors.push({
      id: global.Store.uid('beh'),
      classId: stu.classId,
      studentId: stu.id,
      date: global.Jalali.getTodayStr(),
      type: type,
      label: label,
      points: pts,
      note: ''
    });
    global.Store.save();
    global.Store.playPointFeedback(type === 'pos');
    global.App.render();
    global.App.toast((type === 'pos' ? 'امتیاز مثبت برای «' + stu.name + '» ثبت شد ⭐' : 'تذکر برای «' + stu.name + '» ثبت شد'));
  }

  global.CoreModules = {
    studentAvatarHtml: studentAvatarHtml,
    pickStudentPhoto: pickStudentPhoto,
    clearStudentPhoto: clearStudentPhoto,
    onPhotoFileChosen: onPhotoFileChosen,
    setStudentPhotoDataUrl: setStudentPhotoDataUrl,
    esc: esc,
    escJsAttr: escJsAttr,
    initials: initials,
    renderHome: renderHome,
    renderRoster: renderRoster,
    renderAcademic: renderAcademic,
    setRosterTab: function (t) { state.rosterTab = t; global.App.render(); },
    goClassesTab: function (t) { state.rosterTab = t; global.App.goTab('roster'); },
    setAcademicTab: function (t) { state.academicTab = t; global.App.render(); },
    goAcademicTab: function (t) { state.academicTab = t; global.App.goTab('academic'); },
    onStudentSearch: function (v) { state.studentSearch = v; global.App.render(); },
    stepCarousel: function (d) { state.carouselIdx += d; global.App.render(); },
    activateClass: function (cid) { global.Store.setActiveClass(cid); state.rosterTab = 'students'; global.App.render(); global.App.toast('کلاس فعال تغییر کرد'); },
    openClassModal: openClassModal,
    saveClassForm: saveClassForm,
    deleteClass: deleteClass,
    openStudentModal: openStudentModal,
    saveStudentForm: saveStudentForm,
    deleteStudent: deleteStudent,
    openBulkStudentsModal: openBulkStudentsModal,
    saveBulkStudents: saveBulkStudents,
    openStudentProfile: openStudentProfile,
    stepAttDate: function (d) { state.attDate = global.Jalali.addJalaliDays(ensureAttDate(), d); global.App.render(); },
    pickAttDate: function () { global.Jalali.openDatePicker(ensureAttDate(), function (d) { state.attDate = d; global.App.render(); }); },
    toggleAttSummary: function () { state.attShowSummary = !state.attShowSummary; global.App.render(); },
    setAtt: setAtt,
    markAllPresent: markAllPresent,
    saveAttNote: saveAttNote,
    smsAbsence: smsAbsence,
    openExamModal: openExamModal,
    saveExamForm: saveExamForm,
    deleteExam: deleteExam,
    openScoreEntryModal: openScoreEntryModal,
    pickDescLevel: pickDescLevel,
    fillAllDesc: fillAllDesc,
    saveScoreBatch: saveScoreBatch,
    setReportNote: function (v) { state.reportTeacherNote = v; },
    exportAttendanceCsv: exportAttendanceCsv,
    printAttendanceSheet: printAttendanceSheet,
    exportGradesCsv: exportGradesCsv,
    printSingleReportCard: printSingleReportCard,
    printClassReportCards: printClassReportCards,
    shareTextReportCard: shareTextReportCard,
    quickBehavior: quickBehavior,
    loadDemoNow: function () {
      global.App.confirmDialog('بارگذاری نمونه، همه اطلاعات فعلی از جمله کلاس‌ها و نمرات واقعی را جایگزین می‌کند. ابتدا پشتیبان بگیرید. ادامه می‌دهید؟', function () {
        global.Store.loadSampleData(); global.App.render(); global.App.toast('داده‌های نمونه (عددی + توصیفی) بارگذاری شد ✓');
      });
    },
    confirmClearSample: function () {
      global.App.confirmDialog('شروع از صفر همه اطلاعات موجود، از جمله موارد واقعی ثبت‌شده در کنار نمونه‌ها را پاک می‌کند. ابتدا پشتیبان بگیرید. ادامه می‌دهید؟', function () {
        global.Store.clearAllData();
        global.App.render();
        global.App.toast('آماده ثبت اطلاعات واقعی شما ✓');
      });
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
