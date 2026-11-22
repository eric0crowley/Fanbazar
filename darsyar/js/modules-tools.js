// ماژول‌های برنامه و تکلیف + جعبه ابزار کامل معلم (قرعه‌کشی، گروه‌بندی، چیدمان صندلی، تایمر، انضباط، شهریه و جلسات خصوصی، پیام‌ساز اولیا، نمودارها و تنظیمات)
(function (global) {
  'use strict';

  const esc = function (s) { return global.CoreModules.esc(s); };
  const escJsAttr = function (s) { return global.CoreModules.escJsAttr(s); };

  const tState = {
    planTab: 'timetable', // timetable | homework | lessons | calendar
    calYear: 0,
    calMonth: 0,
    calSelectedDate: '',
    // Picker
    pickerOnlyPresent: false,
    pickerNoRepeat: true,
    pickerPool: [],
    pickerCurrentId: '',
    pickerAnimating: false,
    // Groups
    groupMode: 'count', // count | size
    groupVal: 3,
    groupBalanced: true,
    generatedGroups: [],
    // Seating
    selectedSeatKey: '',
    // Timer
    timerMode: 'countdown', // countdown | stopwatch
    timerTotalSec: 300,
    timerRemSec: 300,
    timerRunning: false,
    timerDeadlineMs: 0,
    swElapsedSec: 0,
    swRunning: false,
    swStartMs: 0,
    swBaseSec: 0,
    swLaps: [],
    // Fees & Private Sessions
    tutorTab: 'fees', // fees | sessions
    feeOnlyDebtors: false,
    // Messages
    msgStudentId: '',
    msgTemplateKey: 'praise',
    msgText: ''
  };

  let timerIntervalId = null;

  function ensureCalInit() {
    if (!tState.calYear) {
      const t = global.Jalali.getTodayObj();
      tState.calYear = t.jy;
      tState.calMonth = t.jm;
      tState.calSelectedDate = global.Jalali.formatJalaliStr(t.jy, t.jm, t.jd);
    }
  }

  // ==================== تب ۴: برنامه، تکلیف، طرح درس و تقویم ====================
  function renderPlan(subTab) {
    if (subTab) tState.planTab = subTab;
    let html = '<div class="seg-tabs">' +
      '<button class="seg-tab ' + (tState.planTab === 'timetable' ? 'active' : '') + '" onclick="ToolModules.setPlanTab(\'timetable\')">🕒 هفتگی</button>' +
      '<button class="seg-tab ' + (tState.planTab === 'homework' ? 'active' : '') + '" onclick="ToolModules.setPlanTab(\'homework\')">📚 تکالیف</button>' +
      '<button class="seg-tab ' + (tState.planTab === 'lessons' ? 'active' : '') + '" onclick="ToolModules.setPlanTab(\'lessons\')">📖 طرح درس</button>' +
      '<button class="seg-tab ' + (tState.planTab === 'calendar' ? 'active' : '') + '" onclick="ToolModules.setPlanTab(\'calendar\')">📅 تقویم</button>' +
    '</div>';

    if (tState.planTab === 'timetable') return html + renderTimetableSub();
    if (tState.planTab === 'homework') return html + renderHomeworkSub();
    if (tState.planTab === 'lessons') return html + renderLessonsSub();
    return html + renderCalendarSub();
  }

  function renderTimetableSub() {
    const db = global.Store.getDb();
    const J = global.Jalali;
    let html = '<div class="flex-between mb-2">' +
      '<span class="text-muted text-sm">برنامه کلاسی شنبه تا جمعه</span>' +
      '<button class="btn btn-primary btn-sm" onclick="ToolModules.openTimetableModal()">+ زنگ جدید</button>' +
    '</div>';

    // اگر هیچ زنگی ثبت نشده باشد، شش کارت خالی پشت‌سرهم نشان نمی‌دهیم؛
    // یک راهنمای واحد با انتخاب روز نمایش داده می‌شود.
    if (!db.timetable.length) {
      let dayChips = '';
      global.Jalali.WEEKDAYS.forEach(function (w, i) {
        if (i === 6) return;
        dayChips += '<button type="button" class="btn btn-sm btn-outline" onclick="ToolModules.openTimetableModal(\'\', ' + i + ')">+ ' + w + '</button>';
      });
      html += '<div class="card empty-state" style="gap:10px;">' +
        '<div class="empty-state-icon">🕒</div>' +
        '<div style="font-weight:800;">هنوز هیچ زنگی در برنامهٔ هفتگی ثبت نشده است.</div>' +
        '<div class="text-muted text-sm">روز را انتخاب کنید تا اولین زنگ را در همان روز اضافه کنید.</div>' +
        '<div class="flex-wrap" style="justify-content:center;margin-top:6px;">' + dayChips + '</div>' +
      '</div>';
      return html;
    }

    for (let d = 0; d < 7; d++) {
      const slots = db.timetable
        .filter(function (s) { return Number(s.dayIndex) === d; })
        .sort(function (a, b) { return (a.startTime || '').localeCompare(b.startTime || ''); });
      if (!slots.length && d === 6) continue;
      html += '<div class="card" style="padding:11px 12px;">' +
        '<div class="flex-between mb-2">' +
          '<b style="color:var(--primary);">' + J.WEEKDAYS[d] + '</b>' +
          '<button class="badge badge-muted" onclick="ToolModules.openTimetableModal(\'\', ' + d + ')">+ افزودن</button>' +
        '</div>';
      if (!slots.length) {
        html += '<div class="text-muted text-sm">برنامه‌ای ثبت نشده</div>';
      } else {
        slots.forEach(function (sl) {
          const cls = global.Store.getClassById(sl.classId);
          const title = cls ? cls.name : (sl.customTitle || 'جلسه');
          const col = cls ? cls.color : '#0F766E';
          html += '<div class="list-row" style="margin-bottom:6px;padding:8px 10px;border-right:4px solid ' + esc(col) + ';">' +
            '<div>' +
              '<div style="font-weight:800;">' + esc(title) + '</div>' +
              '<div class="text-muted text-sm">⏰ ' + esc(J.toFa(sl.startTime)) + ' تا ' + esc(J.toFa(sl.endTime)) + (sl.room ? ' • ' + esc(sl.room) : '') + '</div>' +
            '</div>' +
            '<button class="btn btn-sm btn-outline" onclick="ToolModules.openTimetableModal(\'' + escJsAttr(sl.id) + '\')">ویرایش</button>' +
          '</div>';
        });
      }
      html += '</div>';
    }
    return html;
  }

  function openTimetableModal(editId, defaultDay) {
    const db = global.Store.getDb();
    const slot = editId ? db.timetable.find(function (t) { return t.id === editId; }) : null;
    const dayVal = slot ? Number(slot.dayIndex) : (defaultDay !== undefined ? defaultDay : 0);

    let dayOpts = '';
    global.Jalali.WEEKDAYS.forEach(function (w, i) {
      dayOpts += '<option value="' + i + '" ' + (i === dayVal ? 'selected' : '') + '>' + w + '</option>';
    });

    let clsOpts = '<option value="">-- عنوان آزاد (غیرکلاسی) --</option>';
    db.classes.forEach(function (c) {
      clsOpts += '<option value="' + esc(c.id) + '" ' + (slot && slot.classId === c.id ? 'selected' : '') + '>' + esc(c.name) + '</option>';
    });

    const html = '<form onsubmit="ToolModules.saveTimetableForm(event, \'' + escJsAttr(editId || '') + '\')">' +
      '<div class="form-group"><label class="form-label">روز هفته</label><select id="f_tt_day" class="form-control">' + dayOpts + '</select></div>' +
      '<div class="form-group"><label class="form-label">کلاس مرتبط</label><select id="f_tt_cls" class="form-control">' + clsOpts + '</select></div>' +
      '<div class="form-group"><label class="form-label">عنوان سفارشی (در صورت عدم انتخاب کلاس)</label>' +
        '<input id="f_tt_title" class="form-control" placeholder="مثلاً: جلسه شورای دبیران" value="' + esc(slot ? slot.customTitle : '') + '"></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">ساعت شروع</label><input id="f_tt_start" class="form-control" placeholder="۰۸:۰۰" value="' + esc(slot ? slot.startTime : '۰۸:۰۰') + '"></div>' +
        '<div class="form-group"><label class="form-label">ساعت پایان</label><input id="f_tt_end" class="form-control" placeholder="۰۹:۳۰" value="' + esc(slot ? slot.endTime : '۰۹:۳۰') + '"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">مکان / شماره کلاس</label><input id="f_tt_room" class="form-control" value="' + esc(slot ? slot.room : '') + '"></div>' +
      '<div class="flex-between mt-3">' +
        (slot ? '<button type="button" class="btn btn-danger" onclick="ToolModules.deleteTimetable(\'' + escJsAttr(slot.id) + '\')">حذف زنگ</button>' : '<span></span>') +
        '<button type="submit" class="btn btn-primary">ذخیره در برنامه</button>' +
      '</div></form>';
    global.App.openModal(slot ? 'ویرایش زنگ کلاسی' : 'افزودن به برنامه هفتگی', html);
  }

  function saveTimetableForm(ev, editId) {
    ev.preventDefault();
    const db = global.Store.getDb();
    const data = {
      dayIndex: Number(document.getElementById('f_tt_day').value),
      classId: document.getElementById('f_tt_cls').value,
      customTitle: document.getElementById('f_tt_title').value.trim(),
      startTime: document.getElementById('f_tt_start').value.trim(),
      endTime: document.getElementById('f_tt_end').value.trim(),
      room: document.getElementById('f_tt_room').value.trim()
    };
    if (editId) {
      const target = db.timetable.find(function (t) { return t.id === editId; });
      if (target) Object.assign(target, data);
    } else {
      db.timetable.push(Object.assign({ id: global.Store.uid('tt') }, data));
    }
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('برنامه هفتگی بروز شد ✓');
  }

  function deleteTimetable(id) {
    global.App.confirmDialog('این زنگ از برنامه هفتگی حذف شود؟', function () {
      const db = global.Store.getDb();
      db.timetable = db.timetable.filter(function (t) { return t.id !== id; });
      global.Store.save();
      global.App.closeModal();
      global.App.render();
    });
  }

  // تکالیف
  function renderHomeworkSub() {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const db = global.Store.getDb();
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(activeCls.id);
    const list = db.homeworks.filter(function (h) { return h.classId === activeCls.id; }).slice().reverse();

    let html = '<div class="flex-between mb-2">' +
      '<span class="text-muted text-sm">تکالیف کلاس «' + esc(activeCls.name) + '»</span>' +
      '<button class="btn btn-primary btn-sm" onclick="ToolModules.openHomeworkModal()">+ تکلیف جدید</button>' +
    '</div>';

    if (!list.length) {
      return html + '<div class="card empty-state"><div class="empty-state-icon">📚</div><div>تکلیفی برای این کلاس ثبت نشده است.</div></div>';
    }

    list.forEach(function (hw) {
      let doneCnt = 0;
      students.forEach(function (s) {
        if (hw.statuses && hw.statuses[s.id] === 'done') doneCnt++;
      });
      html += '<div class="card">' +
        '<div class="flex-between">' +
          '<div>' +
            '<div style="font-weight:900;">' + esc(hw.title) + '</div>' +
            (hw.description ? '<div class="text-muted text-sm">' + esc(hw.description) + '</div>' : '') +
            '<div class="mt-2 flex-wrap">' +
              '<span class="badge badge-warning">تحویل: ' + esc(J.formatJalaliHuman(hw.dueDate, false)) + '</span>' +
              '<span class="badge badge-success">انجام‌شده: ' + J.toFa(doneCnt) + ' از ' + J.toFa(students.length) + '</span>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:6px;">' +
            '<button class="btn btn-sm btn-primary" onclick="ToolModules.openHwCheckModal(\'' + escJsAttr(hw.id) + '\')">بررسی تحویل</button>' +
            '<button class="btn btn-sm btn-danger" onclick="ToolModules.deleteHomework(\'' + escJsAttr(hw.id) + '\')">حذف</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    return html;
  }

  function openHomeworkModal() {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const dueDefault = global.Jalali.addJalaliDays(global.Jalali.getTodayStr(), 3);
    const html = '<form onsubmit="ToolModules.saveHomeworkForm(event)">' +
      '<div class="form-group"><label class="form-label">عنوان تکلیف *</label>' +
        '<input id="f_hw_title" class="form-control" required placeholder="مثلاً: حل تمرین‌های پایان فصل دوم"></div>' +
      '<div class="form-group"><label class="form-label">توضیحات تکمیلی</label>' +
        '<textarea id="f_hw_desc" rows="2" class="form-control" placeholder="جزئیات یا صفحات مورد نظر..."></textarea></div>' +
      '<div class="form-group"><label class="form-label">مهلت تحویل (شمسی)</label>' +
        '<input id="f_hw_due" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_hw_due\').value=d; })" value="' + esc(dueDefault) + '"></div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ثبت تکلیف</button></form>';
    global.App.openModal('تکلیف جدید — ' + activeCls.name, html);
  }

  function saveHomeworkForm(ev) {
    ev.preventDefault();
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    db.homeworks.push({
      id: global.Store.uid('hw'),
      classId: activeCls.id,
      title: document.getElementById('f_hw_title').value.trim(),
      description: document.getElementById('f_hw_desc').value.trim(),
      assignDate: global.Jalali.getTodayStr(),
      dueDate: document.getElementById('f_hw_due').value.trim(),
      statuses: {}
    });
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('تکلیف ثبت شد ✓');
  }

  function openHwCheckModal(hwId) {
    const db = global.Store.getDb();
    const hw = db.homeworks.find(function (h) { return h.id === hwId; });
    if (!hw) return;
    const students = global.Store.getStudentsByClass(hw.classId);
    if (!hw.statuses) hw.statuses = {};

    let rows = '';
    students.forEach(function (s) {
      const st = hw.statuses[s.id] || '';
      rows += '<div class="flex-between" style="padding:7px 0;border-bottom:1px solid var(--border);">' +
        '<span style="font-weight:700;">' + esc(s.name) + '</span>' +
        '<div class="att-group">' +
          '<button type="button" class="att-btn ' + (st === 'done' ? 'active-present' : '') + '" onclick="ToolModules.setHwStatus(\'' + escJsAttr(hw.id) + '\', \'' + escJsAttr(s.id) + '\', \'done\')">کامل ✓</button>' +
          '<button type="button" class="att-btn ' + (st === 'partial' ? 'active-late' : '') + '" onclick="ToolModules.setHwStatus(\'' + escJsAttr(hw.id) + '\', \'' + escJsAttr(s.id) + '\', \'partial\')">ناقص</button>' +
          '<button type="button" class="att-btn ' + (st === 'missing' ? 'active-absent' : '') + '" onclick="ToolModules.setHwStatus(\'' + escJsAttr(hw.id) + '\', \'' + escJsAttr(s.id) + '\', \'missing\')">ندارد ✗</button>' +
        '</div>' +
      '</div>';
    });
    global.App.openModal('تحویل تکلیف: ' + hw.title, '<div style="max-height:60vh;overflow-y:auto;">' + rows + '</div>');
  }

  function setHwStatus(hwId, stuId, status) {
    const db = global.Store.getDb();
    const hw = db.homeworks.find(function (h) { return h.id === hwId; });
    if (!hw) return;
    if (!hw.statuses) hw.statuses = {};
    hw.statuses[stuId] = status;
    global.Store.save();
    openHwCheckModal(hwId);
    global.App.render();
  }

  function deleteHomework(hwId) {
    global.App.confirmDialog('این تکلیف حذف شود؟', function () {
      const db = global.Store.getDb();
      db.homeworks = db.homeworks.filter(function (h) { return h.id !== hwId; });
      global.Store.save();
      global.App.render();
    });
  }

  // طرح درس و سرفصل‌ها
  function renderLessonsSub() {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const db = global.Store.getDb();
    const J = global.Jalali;
    const list = db.lessons.filter(function (l) { return l.classId === activeCls.id; }).slice().reverse();

    let html = '<div class="flex-between mb-2">' +
      '<span class="text-muted text-sm">طرح درس و سرفصل‌های «' + esc(activeCls.name) + '»</span>' +
      '<button class="btn btn-primary btn-sm" onclick="ToolModules.openLessonModal()">+ طرح درس جدید</button>' +
    '</div>';

    if (!list.length) {
      return html + '<div class="card empty-state"><div class="empty-state-icon">📖</div><div>هنوز طرح درس یا سرفصلی ثبت نشده است.</div></div>';
    }

    list.forEach(function (lsn) {
      const stMap = {
        planned: { t: 'برنامه‌ریزی شده', c: 'badge-info' },
        in_progress: { t: 'در حال تدریس', c: 'badge-warning' },
        done: { t: 'تدریس شده ✓', c: 'badge-success' }
      };
      const b = stMap[lsn.status] || stMap.planned;
      html += '<div class="card">' +
        '<div class="flex-between">' +
          '<div>' +
            '<div style="font-weight:900;">' + esc(lsn.title) + '</div>' +
            '<div class="mt-2 flex-wrap">' +
              '<span class="badge ' + b.c + '">' + b.t + '</span>' +
              '<span class="badge badge-muted">📅 ' + esc(J.formatJalaliHuman(lsn.date, false)) + '</span>' +
            '</div>' +
            (lsn.objectives ? '<div class="text-sm mt-2"><b>اهداف:</b> ' + esc(lsn.objectives) + '</div>' : '') +
            (lsn.materials ? '<div class="text-muted text-sm"><b>ابزار/منابع:</b> ' + esc(lsn.materials) + '</div>' : '') +
          '</div>' +
          '<button class="btn btn-sm btn-outline" onclick="ToolModules.openLessonModal(\'' + escJsAttr(lsn.id) + '\')">ویرایش</button>' +
        '</div>' +
      '</div>';
    });
    return html;
  }

  function openLessonModal(editId) {
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    const lsn = editId ? db.lessons.find(function (l) { return l.id === editId; }) : null;

    const html = '<form onsubmit="ToolModules.saveLessonForm(event, \'' + escJsAttr(editId || '') + '\')">' +
      '<div class="form-group"><label class="form-label">عنوان مبحث / جلسه *</label>' +
        '<input id="f_lsn_title" class="form-control" required placeholder="مثلاً: فصل سوم - معادلات خطی" value="' + esc(lsn ? lsn.title : '') + '"></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">تاریخ جلسه</label>' +
          '<input id="f_lsn_date" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_lsn_date\').value=d; })" value="' + esc(lsn ? lsn.date : global.Jalali.getTodayStr()) + '"></div>' +
        '<div class="form-group"><label class="form-label">وضعیت تدریس</label>' +
          '<select id="f_lsn_status" class="form-control">' +
            '<option value="planned" ' + (!lsn || lsn.status === 'planned' ? 'selected' : '') + '>برنامه‌ریزی شده</option>' +
            '<option value="in_progress" ' + (lsn && lsn.status === 'in_progress' ? 'selected' : '') + '>در حال تدریس</option>' +
            '<option value="done" ' + (lsn && lsn.status === 'done' ? 'selected' : '') + '>تدریس شده ✓</option>' +
          '</select></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">اهداف آموزشی جلسه</label>' +
        '<textarea id="f_lsn_obj" rows="2" class="form-control">' + esc(lsn ? lsn.objectives : '') + '</textarea></div>' +
      '<div class="form-group"><label class="form-label">وسایل کمک‌آموزشی / تکلیف پیشنهادی</label>' +
        '<input id="f_lsn_mat" class="form-control" value="' + esc(lsn ? lsn.materials : '') + '"></div>' +
      '<div class="flex-between mt-3">' +
        (lsn ? '<button type="button" class="btn btn-danger" onclick="ToolModules.deleteLesson(\'' + escJsAttr(lsn.id) + '\')">حذف</button>' : '<span></span>') +
        '<button type="submit" class="btn btn-primary">ذخیره طرح درس</button>' +
      '</div></form>';
    global.App.openModal(lsn ? 'ویرایش طرح درس' : 'ثبت طرح درس جدید', html);
  }

  function saveLessonForm(ev, editId) {
    ev.preventDefault();
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return;
    const db = global.Store.getDb();
    const data = {
      classId: activeCls.id,
      title: document.getElementById('f_lsn_title').value.trim(),
      date: document.getElementById('f_lsn_date').value.trim(),
      status: document.getElementById('f_lsn_status').value,
      objectives: document.getElementById('f_lsn_obj').value.trim(),
      materials: document.getElementById('f_lsn_mat').value.trim()
    };
    if (editId) {
      const t = db.lessons.find(function (l) { return l.id === editId; });
      if (t) Object.assign(t, data);
    } else {
      db.lessons.push(Object.assign({ id: global.Store.uid('lsn') }, data));
    }
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('طرح درس ذخیره شد ✓');
  }

  function deleteLesson(id) {
    global.App.confirmDialog('این طرح درس حذف شود؟', function () {
      const db = global.Store.getDb();
      db.lessons = db.lessons.filter(function (l) { return l.id !== id; });
      global.Store.save();
      global.App.closeModal();
      global.App.render();
    });
  }

  // تقویم ماهانه شمسی و رویدادها
  function renderCalendarSub() {
    ensureCalInit();
    const db = global.Store.getDb();
    const J = global.Jalali;
    const todayStr = J.getTodayStr();
    const daysCount = J.jalaliMonthLength(tState.calYear, tState.calMonth);
    const firstWd = J.getJalaliWeekdayIndex(tState.calYear, tState.calMonth, 1);

    let cells = '';
    for (let e = 0; e < firstWd; e++) cells += '<div></div>';
    for (let d = 1; d <= daysCount; d++) {
      const dStr = J.formatJalaliStr(tState.calYear, tState.calMonth, d);
      const wIdx = (firstWd + d - 1) % 7;
      const hasEv = db.events.some(function (ev) { return ev.date === dStr; });
      const hasEx = db.assessments.some(function (ex) { return ex.date === dStr; });
      const hasHw = db.homeworks.some(function (hw) { return hw.dueDate === dStr; });
      const cls = [
        'cal-day',
        dStr === todayStr ? 'today' : '',
        dStr === tState.calSelectedDate ? 'selected' : '',
        wIdx === 6 ? 'friday' : ''
      ].filter(Boolean).join(' ');

      let dots = '';
      if (hasEv || hasEx || hasHw) {
        dots = '<div class="cal-dot-row">' +
          (hasEv ? '<span class="cal-dot" style="background:#F59E0B;"></span>' : '') +
          (hasEx ? '<span class="cal-dot" style="background:#EF4444;"></span>' : '') +
          (hasHw ? '<span class="cal-dot" style="background:#3B82F6;"></span>' : '') +
        '</div>';
      }
      cells += '<div class="' + cls + '" onclick="ToolModules.selectCalDay(\'' + dStr + '\')"><span>' + J.toFa(d) + '</span>' + dots + '</div>';
    }

    const selDate = tState.calSelectedDate;
    const dayEvents = db.events.filter(function (ev) { return ev.date === selDate; });
    const dayExams = db.assessments.filter(function (ex) { return ex.date === selDate; });
    const dayHws = db.homeworks.filter(function (hw) { return hw.dueDate === selDate; });

    let html = '<div class="card">' +
      '<div class="flex-between mb-2">' +
        '<button class="btn btn-sm btn-outline" onclick="ToolModules.stepCalMonth(-1)">◀ ماه قبل</button>' +
        '<b style="font-size:15px;">' + J.MONTHS[tState.calMonth - 1] + ' ' + J.toFa(tState.calYear) + '</b>' +
        '<button class="btn btn-sm btn-outline" onclick="ToolModules.stepCalMonth(1)">ماه بعد ▶</button>' +
      '</div>' +
      '<div class="cal-weekdays">' + J.WEEKDAYS_SHORT.map(function (w) { return '<div>' + w + '</div>'; }).join('') + '</div>' +
      '<div class="cal-days">' + cells + '</div>' +
    '</div>';

    html += '<div class="card">' +
      '<div class="flex-between mb-2">' +
        '<b>رویدادهای ' + esc(J.formatJalaliHuman(selDate, true)) + '</b>' +
        '<button class="btn btn-sm btn-primary" onclick="ToolModules.openEventModal(\'' + escJsAttr(selDate) + '\')">+ رویداد</button>' +
      '</div>';

    if (!dayEvents.length && !dayExams.length && !dayHws.length) {
      html += '<div class="text-muted text-sm">رویداد یا آزمونی در این تاریخ ثبت نشده است.</div>';
    } else {
      dayEvents.forEach(function (ev) {
        html += '<div class="list-row" style="margin-bottom:6px;"><div><span class="badge badge-warning">رویداد</span> <b>' + esc(ev.title) + '</b>' +
          (ev.note ? '<div class="text-muted text-sm">' + esc(ev.note) + '</div>' : '') + '</div>' +
          '<button class="btn btn-sm btn-danger" onclick="ToolModules.deleteEvent(\'' + escJsAttr(ev.id) + '\')">حذف</button></div>';
      });
      dayExams.forEach(function (ex) {
        const c = global.Store.getClassById(ex.classId);
        html += '<div class="list-row" style="margin-bottom:6px;"><div><span class="badge badge-danger">آزمون</span> <b>' + esc(ex.title) + '</b>' +
          (c ? ' <span class="text-muted text-sm">(' + esc(c.name) + ')</span>' : '') + '</div></div>';
      });
      dayHws.forEach(function (hw) {
        const c = global.Store.getClassById(hw.classId);
        html += '<div class="list-row" style="margin-bottom:6px;"><div><span class="badge badge-info">مهلت تکلیف</span> <b>' + esc(hw.title) + '</b>' +
          (c ? ' <span class="text-muted text-sm">(' + esc(c.name) + ')</span>' : '') + '</div></div>';
      });
    }
    html += '</div>';
    return html;
  }

  function openEventModal(dateStr) {
    const html = '<form onsubmit="ToolModules.saveEventForm(event)">' +
      '<div class="form-group"><label class="form-label">عنوان رویداد یا یادآوری *</label>' +
        '<input id="f_ev_title" class="form-control" required placeholder="مثلاً: جلسه انجمن اولیا و مربیان"></div>' +
      '<div class="form-group"><label class="form-label">تاریخ شمسی</label>' +
        '<input id="f_ev_date" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_ev_date\').value=d; })" value="' + esc(dateStr || global.Jalali.getTodayStr()) + '"></div>' +
      '<div class="form-group"><label class="form-label">توضیحات</label><input id="f_ev_note" class="form-control"></div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ذخیره رویداد</button></form>';
    global.App.openModal('افزودن رویداد به تقویم', html);
  }

  function saveEventForm(ev) {
    ev.preventDefault();
    const db = global.Store.getDb();
    const d = document.getElementById('f_ev_date').value.trim();
    db.events.push({
      id: global.Store.uid('ev'),
      date: d,
      title: document.getElementById('f_ev_title').value.trim(),
      note: document.getElementById('f_ev_note').value.trim()
    });
    tState.calSelectedDate = d;
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('رویداد ثبت شد ✓');
  }

  function deleteEvent(id) {
    global.App.confirmDialog('این رویداد حذف شود؟', function () {
      const db = global.Store.getDb();
      db.events = db.events.filter(function (e) { return e.id !== id; });
      global.Store.save();
      global.App.render();
    });
  }

  // ==================== تب ۵: جعبه ابزار کامل معلم ====================
  function renderToolsHub() {
    return '' +
      '<div class="section-label" style="margin-top:2px;">ابزارهای زنده و تعاملی سرِ کلاس</div>' +
      '<div class="tools-grid">' +
        tile('🎡', 'گردونه شانس', 'var(--purple-soft)', 'picker') +
        tile('🎨', 'تخته سفید کلاس', 'var(--primary-soft)', 'whiteboard') +
        tile('⏱️', 'تایمر و کرنومتر', 'var(--danger-soft)', 'timer') +
        tile('👥', 'گروه‌بندی هوشمند', 'var(--info-soft)', 'groups') +
        tile('🪑', 'چیدمان صندلی', 'var(--warning-soft)', 'seating') +
        tile('🏆', 'امتیاز و افتخار', 'var(--warning-soft)', 'points') +
        tile('⭐', 'مثبت و منفی', 'var(--success-soft)', 'behavior') +
      '</div>' +
      '<div class="section-label">ارتباط با اولیا، آمار و تدریس خصوصی</div>' +
      '<div class="tools-grid">' +
        tile('💬', 'پیام‌ساز اولیا', 'var(--info-soft)', 'messages') +
        tile('📊', 'نمودار و تحلیل', 'var(--accent-soft)', 'charts') +
        tile('💰', 'شهریه و جلسات', 'var(--purple-soft)', 'fees') +
      '</div>' +
      '<div class="section-label">تنظیمات، امنیت و شناسنامه علمی</div>' +
      '<div class="tools-grid">' +
        tile('⚙️', 'تنظیمات و تم', 'var(--surface-3)', 'settings') +
        tile('🎓', 'شناسنامه علمی', 'var(--primary-soft)', 'about') +
      '</div>';
  }

  function tile(icon, title, bg, toolKey) {
    return '<button type="button" class="tool-tile" onclick="App.goTool(\'' + toolKey + '\')">' +
      '<div class="tool-tile-icon" style="background:' + bg + ';">' + icon + '</div>' +
      '<div class="tool-tile-title">' + title + '</div>' +
    '</button>';
  }

  // ---------- ابزار ۱: گردونه شانس گرافیکی شاگرد ----------
  function renderPickerTool() {
    if (global.LiveClassroom && typeof global.LiveClassroom.renderWheelPickerTool === 'function') {
      return global.LiveClassroom.renderWheelPickerTool();
    }
    return '';
  }

  function getPickerCandidates(classId) {
    const all = global.Store.getStudentsByClass(classId);
    if (!tState.pickerOnlyPresent) return all;
    const today = global.Jalali.getTodayStr();
    const att = global.Store.getDb().attendance.find(function (a) { return a.classId === classId && a.date === today; });
    if (!att || !att.records) return all;
    return all.filter(function (s) { return att.records[s.id] !== 'absent'; });
  }

  function spinPicker() {
    const cls = global.Store.getActiveClass();
    if (!cls || tState.pickerAnimating) return;
    const eligible = getPickerCandidates(cls.id);
    if (!eligible.length) {
      global.App.toast('دانش‌آموزی برای انتخاب وجود ندارد!');
      return;
    }

    let pool = eligible.map(function (s) { return s.id; });
    if (tState.pickerNoRepeat) {
      tState.pickerPool = tState.pickerPool.filter(function (id) { return pool.indexOf(id) !== -1; });
      if (!tState.pickerPool.length) tState.pickerPool = pool.slice();
      pool = tState.pickerPool;
    }

    tState.pickerAnimating = true;
    let ticks = 0;
    const maxTicks = 8;
    const iv = setInterval(function () {
      ticks++;
      const rnd = eligible[Math.floor(Math.random() * eligible.length)];
      tState.pickerCurrentId = rnd.id;
      global.App.render();
      if (ticks >= maxTicks) {
        clearInterval(iv);
        const winnerId = pool[Math.floor(Math.random() * pool.length)];
        tState.pickerCurrentId = winnerId;
        if (tState.pickerNoRepeat) {
          tState.pickerPool = tState.pickerPool.filter(function (id) { return id !== winnerId; });
        }
        tState.pickerAnimating = false;
        global.Store.vibrate(60);
        global.App.render();
      }
    }, 65);
  }

  // ---------- ابزار ۲: گروه‌بندی هوشمند ----------
  function renderGroupsTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const J = global.Jalali;

    let html = '<div class="card">' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">روش تقسیم‌بندی</label>' +
          '<select class="form-control" onchange="ToolModules.setGroupOpt(\'mode\', this.value)">' +
            '<option value="count" ' + (tState.groupMode === 'count' ? 'selected' : '') + '>تعداد گروه‌ها</option>' +
            '<option value="size" ' + (tState.groupMode === 'size' ? 'selected' : '') + '>نفرات هر گروه</option>' +
          '</select></div>' +
        '<div class="form-group"><label class="form-label">' + (tState.groupMode === 'count' ? 'چند گروه؟' : 'هر گروه چند نفر؟') + '</label>' +
          '<input type="number" min="2" max="20" class="form-control" value="' + tState.groupVal + '" onchange="ToolModules.setGroupOpt(\'val\', this.value)"></div>' +
      '</div>' +
      '<label style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
        '<span style="font-weight:700;font-size:13px;">توزیع متعادل بر اساس معدل دانش‌آموزان</span>' +
        '<input type="checkbox" ' + (tState.groupBalanced ? 'checked' : '') + ' onchange="ToolModules.setGroupOpt(\'balanced\', this.checked)">' +
      '</label>' +
      '<div class="flex-wrap">' +
        '<button class="btn btn-primary" style="flex:1;" onclick="ToolModules.generateGroups()">👥 ایجاد گروه‌ها</button>' +
        (tState.generatedGroups.length ? '<button class="btn btn-outline" onclick="ToolModules.shareGroups()">📤 کپی / ارسال</button>' : '') +
      '</div>' +
    '</div>';

    tState.generatedGroups.forEach(function (grp, idx) {
      html += '<div class="card">' +
        '<div class="card-header"><h3 class="card-title">گروه ' + J.toFa(idx + 1) + '</h3><span class="badge badge-primary">' + J.toFa(grp.length) + ' نفر</span></div>' +
        '<div class="flex-wrap">' +
          grp.map(function (s) { return '<span class="badge badge-muted" style="font-size:12.5px;padding:6px 11px;">' + esc(s.name) + '</span>'; }).join('') +
        '</div>' +
      '</div>';
    });
    return html;
  }

  function generateGroups() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const students = global.Store.getStudentsByClass(cls.id).slice();
    if (students.length < 2) {
      global.App.toast('حداقل ۲ دانش‌آموز نیاز است');
      return;
    }

    // بُر زدن اولیه
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = students[i]; students[i] = students[j]; students[j] = tmp;
    }

    if (tState.groupBalanced) {
      students.sort(function (a, b) {
        const sa = global.Store.computeStudentStats(a.id, cls.id).avg20 || 0;
        const sb = global.Store.computeStudentStats(b.id, cls.id).avg20 || 0;
        return sb - sa;
      });
    }

    const val = Math.max(2, parseInt(tState.groupVal, 10) || 2);
    const numGroups = tState.groupMode === 'count' ? Math.min(val, students.length) : Math.max(1, Math.ceil(students.length / val));
    const groups = [];
    for (let g = 0; g < numGroups; g++) groups.push([]);

    // پخش ماری (Snake Draft) برای تعادل کامل
    students.forEach(function (stu, idx) {
      const cycle = Math.floor(idx / numGroups);
      const pos = idx % numGroups;
      const gIdx = (cycle % 2 === 0) ? pos : (numGroups - 1 - pos);
      groups[gIdx].push(stu);
    });

    tState.generatedGroups = groups;
    global.Store.vibrate(35);
    global.App.render();
  }

  function shareGroups() {
    const cls = global.Store.getActiveClass();
    if (!cls || !tState.generatedGroups.length) return;
    const J = global.Jalali;
    const lines = ['👥 گروه‌بندی کلاس ' + cls.name + ':'];
    tState.generatedGroups.forEach(function (grp, i) {
      lines.push('🔹 گروه ' + J.toFa(i + 1) + ': ' + grp.map(function (s) { return s.name; }).join('، '));
    });
    global.Store.shareText('گروه‌بندی کلاس', lines.join('\n'));
  }

  // ---------- ابزار ۳: چیدمان صندلی کلاس ----------
  function renderSeatingTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const db = global.Store.getDb();
    const J = global.Jalali;
    if (!db.seating[cls.id]) {
      db.seating[cls.id] = { rows: 3, cols: 3, seats: {} };
    }
    const cfg = db.seating[cls.id];
    const students = global.Store.getStudentsByClass(cls.id);
    // A restored file is untrusted; never inject its raw column value in CSS.
    const parsedCols = Number(cfg.cols);
    const safeCols = Number.isFinite(parsedCols) && parsedCols >= 1 && parsedCols <= 100 ? Math.floor(parsedCols) : 3;

    let gridHtml = '';
    for (let r = 0; r < cfg.rows; r++) {
      for (let c = 0; c < cfg.cols; c++) {
        const key = r + '-' + c;
        const sid = cfg.seats[key];
        const stu = sid ? global.Store.getStudentById(sid) : null;
        const cellCls = [
          'seat-cell',
          stu ? 'occupied' : '',
          tState.selectedSeatKey === key ? 'selected' : ''
        ].filter(Boolean).join(' ');
        gridHtml += '<div class="' + cellCls + '" onclick="ToolModules.tapSeat(\'' + key + '\')">' +
          (stu ? '<span>' + esc(stu.name) + '</span>' : '<span class="text-muted" style="font-weight:500;">صندلی خالی</span>') +
        '</div>';
      }
    }

    return '<div class="card">' +
      '<div class="flex-between mb-2" style="flex-wrap:wrap;gap:6px;">' +
        '<div class="flex-wrap" style="align-items:center;">' +
          '<label class="text-sm" style="display:inline-flex;align-items:center;gap:4px;">ردیف: <select class="form-control" style="width:auto;padding:4px 8px;" onchange="ToolModules.resizeSeating(this.value, null)">' +
            Array.from({ length: Math.max(7, cfg.rows) - 1 }, function (_, i) { return i + 2; }).map(function (n) { return '<option value="' + n + '" ' + (cfg.rows === n ? 'selected' : '') + '>' + J.toFa(n) + '</option>'; }).join('') +
          '</select></label>' +
          '<label class="text-sm" style="display:inline-flex;align-items:center;gap:4px;">ستون: <select class="form-control" style="width:auto;padding:4px 8px;" onchange="ToolModules.resizeSeating(null, this.value)">' +
            [2, 3, 4, 5, 6].map(function (n) { return '<option value="' + n + '" ' + (cfg.cols === n ? 'selected' : '') + '>' + J.toFa(n) + '</option>'; }).join('') +
          '</select></label>' +
        '</div>' +
        '<div class="flex-wrap">' +
          '<button class="btn btn-sm btn-soft" onclick="ToolModules.autoSeatRandom()">🔀 چیدمان تصادفی</button>' +
          '<button class="btn btn-sm btn-outline" onclick="ToolModules.printSeating()">🖨️ PDF</button>' +
        '</div>' +
      '</div>' +
      '<div class="text-muted text-sm mb-2">💡 برای جابه‌جایی، ابتدا روی یک صندلی و سپس روی صندلی مقصد بزنید؛ یا روی صندلی خالی بزنید تا شاگرد انتخاب شود.</div>' +
      '<div class="seating-stage">📋 تخته کلاس / میز معلم</div>' +
      '<div class="seating-grid" style="grid-template-columns:repeat(' + safeCols + ', 1fr);">' + gridHtml + '</div>' +
      (students.length ? '<button class="btn btn-sm btn-danger" onclick="ToolModules.clearSeats()">پاک کردن چیدمان</button>' : '') +
    '</div>';
  }

  function tapSeat(key) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const cfg = global.Store.getDb().seating[cls.id];
    if (!cfg) return;

    if (!tState.selectedSeatKey) {
      if (cfg.seats[key]) {
        tState.selectedSeatKey = key;
        global.App.render();
      } else {
        openAssignSeatModal(key);
      }
      return;
    }

    if (tState.selectedSeatKey === key) {
      tState.selectedSeatKey = '';
      openAssignSeatModal(key);
      return;
    }

    // جابه‌جایی دو صندلی
    const prevKey = tState.selectedSeatKey;
    const temp = cfg.seats[prevKey];
    if (cfg.seats[key]) {
      cfg.seats[prevKey] = cfg.seats[key];
    } else {
      delete cfg.seats[prevKey];
    }
    if (temp) {
      cfg.seats[key] = temp;
    } else {
      delete cfg.seats[key];
    }
    tState.selectedSeatKey = '';
    global.Store.save();
    global.Store.vibrate(25);
    global.App.render();
  }

  function openAssignSeatModal(key) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const cfg = global.Store.getDb().seating[cls.id];
    const seats = cfg.seats || {};
    const seatedIds = Object.keys(seats).map(function (key) { return seats[key]; });
    const students = global.Store.getStudentsByClass(cls.id);

    let listHtml = '<button class="btn btn-danger btn-sm btn-block mb-2" onclick="ToolModules.assignSeat(\'' + key + '\', \'\')">خالی کردن این صندلی</button>';
    students.forEach(function (s) {
      const isSeated = seatedIds.indexOf(s.id) !== -1;
      listHtml += '<button class="list-row" style="width:100%;text-align:right;" onclick="ToolModules.assignSeat(\'' + key + '\', \'' + escJsAttr(s.id) + '\')">' +
        '<span style="font-weight:700;">' + esc(s.name) + '</span>' +
        '<span class="badge ' + (isSeated ? 'badge-warning' : 'badge-success') + '">' + (isSeated ? 'دارای صندلی (انتقال)' : 'بدون صندلی') + '</span>' +
      '</button>';
    });
    global.App.openModal('انتخاب دانش‌آموز برای صندلی', '<div style="max-height:55vh;overflow-y:auto;">' + listHtml + '</div>');
  }

  function assignSeat(key, stuId) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const cfg = global.Store.getDb().seating[cls.id];
    if (stuId) {
      Object.keys(cfg.seats).forEach(function (k) {
        if (cfg.seats[k] === stuId) delete cfg.seats[k];
      });
      cfg.seats[key] = stuId;
    } else {
      delete cfg.seats[key];
    }
    tState.selectedSeatKey = '';
    global.Store.save();
    global.App.closeModal();
    global.App.render();
  }

  function autoSeatRandom() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const cfg = global.Store.getDb().seating[cls.id];
    const students = global.Store.getStudentsByClass(cls.id).slice();
    if (students.length > cfg.rows * cfg.cols) {
      cfg.rows = Math.ceil(students.length / cfg.cols);
    }
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = students[i]; students[i] = students[j]; students[j] = t;
    }
    cfg.seats = {};
    let idx = 0;
    for (let r = 0; r < cfg.rows; r++) {
      for (let c = 0; c < cfg.cols; c++) {
        if (idx < students.length) cfg.seats[r + '-' + c] = students[idx++].id;
      }
    }
    global.Store.save();
    global.App.render();
    global.App.toast('چیدمان تصادفی انجام شد ✓');
  }

  function printSeating() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const cfg = global.Store.getDb().seating[cls.id];
    if (!cfg) return;
    let tableRows = '';
    for (let r = 0; r < cfg.rows; r++) {
      tableRows += '<tr>';
      for (let c = 0; c < cfg.cols; c++) {
        const stu = cfg.seats[r + '-' + c] ? global.Store.getStudentById(cfg.seats[r + '-' + c]) : null;
        tableRows += '<td style="text-align:center;height:58px;font-weight:800;">' + (stu ? esc(stu.name) : '—') + '</td>';
      }
      tableRows += '</tr>';
    }
    const html = '<div class="report-box"><div class="report-head"><h2>نقشه چیدمان صندلی کلاس — ' + esc(cls.name) + '</h2></div>' +
      '<div style="text-align:center;padding:8px;background:#F1F5F9;border:1px dashed #64748B;margin-bottom:10px;font-weight:800;">تخته کلاس / میز معلم</div>' +
      '<table><tbody>' + tableRows + '</tbody></table></div>';
    global.Store.printReportHtml('چیدمان صندلی ' + cls.name, html);
  }

  // ---------- ابزار ۴: تایمر و کرنومتر سر کلاس ----------
  function renderTimerTool() {
    syncTimerClocks();
    const J = global.Jalali;
    const isCd = tState.timerMode === 'countdown';
    const secs = isCd ? tState.timerRemSec : tState.swElapsedSec;
    const mm = Math.floor(secs / 60);
    const ss = secs % 60;
    const timeStr = J.toFa((mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss));
    const pct = isCd && tState.timerTotalSec > 0 ? (tState.timerRemSec / tState.timerTotalSec) : 1;
    const dash = Math.round(2 * Math.PI * 76);
    const offset = Math.round(dash * (1 - pct));
    const ringColor = isCd
      ? (tState.timerRemSec <= 15 ? 'var(--danger)' : (tState.timerRemSec <= 45 ? 'var(--warning)' : 'var(--primary)'))
      : 'var(--primary)';

    let html = '<div class="seg-tabs">' +
      '<button class="seg-tab ' + (isCd ? 'active' : '') + '" onclick="ToolModules.setTimerMode(\'countdown\')">⏳ تایمر شمارش معکوس</button>' +
      '<button class="seg-tab ' + (!isCd ? 'active' : '') + '" onclick="ToolModules.setTimerMode(\'stopwatch\')">⏱️ کرنومتر و ثبت دور</button>' +
    '</div>';

    html += '<div class="card timer-display-wrap">' +
      '<div style="position:relative;width:196px;height:196px;display:flex;align-items:center;justify-content:center;">' +
        '<svg width="196" height="196" style="position:absolute;transform:rotate(-90deg);">' +
          '<circle cx="98" cy="98" r="76" stroke="var(--surface-3)" stroke-width="11" fill="none"/>' +
          '<circle cx="98" cy="98" r="76" stroke="' + ringColor + '" stroke-width="11" stroke-linecap="round" fill="none" stroke-dasharray="' + dash + '" stroke-dashoffset="' + offset + '"/>' +
        '</svg>' +
        '<div id="live_timer_digits" class="timer-digits">' + timeStr + '</div>' +
      '</div>' +
      '<div class="flex-wrap mt-3" style="justify-content:center;gap:10px;">' +
        '<button class="btn btn-primary" style="min-width:118px;" onclick="ToolModules.toggleTimerRun()">' +
          ((isCd ? tState.timerRunning : tState.swRunning) ? '⏸ توقف' : '▶ شروع') +
        '</button>' +
        (!isCd && tState.swRunning ? '<button class="btn btn-soft" onclick="ToolModules.recordLap()">🏁 ثبت دور</button>' : '') +
        '<button class="btn btn-outline" onclick="ToolModules.resetTimer()">🔄 بازنشانی</button>' +
      '</div>';

    if (isCd) {
      html += '<div class="flex-wrap mt-3" style="justify-content:center;">' +
        [1, 2, 5, 10, 15, 30, 45, 90].map(function (m) {
          return '<button class="badge badge-primary" style="padding:7px 12px;font-size:12.5px;" onclick="ToolModules.setPresetMin(' + m + ')">' + J.toFa(m) + ' دقیقه</button>';
        }).join('') +
      '</div>' +
      '<div style="display:flex;gap:6px;align-items:center;justify-content:center;margin-top:12px;">' +
        '<input id="f_custom_timer_min" type="text" inputmode="numeric" class="form-control" style="width:135px;text-align:center;padding:7px 10px;" placeholder="زمان دلخواه (دقیقه)">' +
        '<button type="button" class="btn btn-sm btn-soft" onclick="ToolModules.applyCustomTimerMin()">تنظیم</button>' +
      '</div>';
    } else if (tState.swLaps.length > 0) {
      html += '<div style="width:100%;max-width:340px;margin-top:14px;border-top:1px solid var(--border);padding-top:10px;">' +
        '<div class="text-muted text-sm mb-2" style="text-align:right;font-weight:800;">🏁 دورهای ثبت‌شده:</div>';
      tState.swLaps.slice().reverse().forEach(function (lp, i) {
        const idx = tState.swLaps.length - i;
        html += '<div class="flex-between text-sm" style="padding:4px 6px;border-bottom:1px dashed var(--border);">' +
          '<span>دور ' + J.toFa(idx) + '</span><b>' + lp + '</b></div>';
      });
      html += '</div>';
    }
    html += '<div class="text-muted text-sm mt-3">برای هشدار به‌موقع، برنامه را باز و دستگاه را بیدار نگه دارید.</div></div>';
    return html;
  }

  function syncTimerClocks() {
    const now = Date.now();
    if (tState.timerRunning) {
      tState.timerRemSec = Math.max(0, Math.ceil((tState.timerDeadlineMs - now) / 1000));
      if (tState.timerRemSec === 0) {
        tState.timerRunning = false;
        global.Store.playAlarm();
        global.App.toast('⏰ زمان تایمر کلاس به پایان رسید!');
      }
    }
    if (tState.swRunning) {
      tState.swElapsedSec = tState.swBaseSec + Math.max(0, Math.floor((now - tState.swStartMs) / 1000));
    }
  }

  function ensureTimerLoop() {
    if (timerIntervalId) { clearInterval(timerIntervalId); timerIntervalId = null; }
    if (!tState.timerRunning && !tState.swRunning) return;
    timerIntervalId = setInterval(function () {
      syncTimerClocks();
      if (!tState.timerRunning && !tState.swRunning && timerIntervalId) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
      }
      if (global.App.getCurrentTool() === 'timer') global.App.render();
    }, 1000);
  }

  // ---------- ابزار ۵: ثبت رفتار و انضباط ----------
  function renderBehaviorTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const db = global.Store.getDb();
    const J = global.Jalali;
    const students = global.Store.getStudentsByClass(cls.id);
    const logs = db.behaviors.filter(function (b) { return b.classId === cls.id; }).slice().reverse();

    let html = '<div class="flex-between mb-2">' +
      '<span class="text-muted text-sm">امتیازهای مثبت و موارد انضباطی — ' + esc(cls.name) + '</span>' +
      '<button class="btn btn-primary btn-sm" onclick="ToolModules.openBehaviorModal()">+ ثبت مورد جدید</button>' +
    '</div>';

    if (students.length) {
      html += '<div class="card"><h3 class="card-title mb-2">🏆 تراز انضباطی دانش‌آموزان</h3><div class="flex-wrap">';
      students.forEach(function (s) {
        const net = global.Store.computeStudentStats(s.id, cls.id).netBehavior;
        html += '<button class="badge ' + (net > 0 ? 'badge-success' : net < 0 ? 'badge-danger' : 'badge-muted') + '" style="padding:6px 10px;font-size:12px;" onclick="ToolModules.openBehaviorModal(\'' + escJsAttr(s.id) + '\')">' +
          esc(s.name) + ': ' + (net > 0 ? '+' : '') + J.toFa(net) +
        '</button>';
      });
      html += '</div></div>';
    }

    if (!logs.length) {
      html += '<div class="card empty-state">هنوز مورد انضباطی ثبت نشده است.</div>';
    } else {
      logs.slice(0, 30).forEach(function (b) {
        const stu = global.Store.getStudentById(b.studentId);
        html += '<div class="list-row">' +
          '<div>' +
            '<span class="badge ' + (b.type === 'pos' ? 'badge-success' : 'badge-danger') + '">' + signedPoints(b.points, b.type === 'pos') + '</span> ' +
            '<b>' + esc(stu ? stu.name : 'حذف‌شده') + '</b> — ' + esc(b.label) +
            '<div class="text-muted text-sm">' + esc(J.formatJalaliHuman(b.date, false)) + '</div>' +
          '</div>' +
          '<button class="btn btn-sm btn-outline" onclick="ToolModules.deleteBehavior(\'' + escJsAttr(b.id) + '\')">حذف</button>' +
        '</div>';
      });
    }
    return html;
  }

  function openBehaviorModal(preStuId) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const students = global.Store.getStudentsByClass(cls.id);
    if (!students.length) { global.App.toast('ابتدا دانش‌آموز اضافه کنید'); return; }

    let sOpts = '';
    students.forEach(function (s) {
      sOpts += '<option value="' + esc(s.id) + '" ' + (s.id === preStuId ? 'selected' : '') + '>' + esc(s.name) + '</option>';
    });

    const html = '<form onsubmit="ToolModules.saveBehaviorForm(event)">' +
      '<div class="form-group"><label class="form-label">دانش‌آموز</label><select id="f_bh_stu" class="form-control">' + sOpts + '</select></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">نوع مورد</label>' +
          '<select id="f_bh_type" class="form-control"><option value="pos">مثبت / تشویقی ⭐</option><option value="neg">منفی / تذکر ⚠️</option></select></div>' +
        '<div class="form-group"><label class="form-label">مقدار امتیاز</label>' +
          '<input id="f_bh_pts" type="number" min="1" max="20" class="form-control" value="1"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">علت / شرح مورد *</label>' +
        '<input id="f_bh_lbl" class="form-control" required placeholder="مثلاً: مشارکت عالی در حل تمرین"></div>' +
      '<div class="flex-wrap mb-2">' +
        ['مشارکت عالی', 'اخلاق و نظم مثال‌زدنی', 'کمک به هم‌کلاسی', 'همراه نداشتن وسایل', 'بی‌توجهی در کلاس'].map(function (p) {
          return '<button type="button" class="badge badge-muted" onclick="document.getElementById(\'f_bh_lbl\').value=\'' + p + '\'">' + p + '</button>';
        }).join('') +
      '</div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ثبت در پرونده انضباطی</button></form>';
    global.App.openModal('ثبت رفتار و انضباط', html);
  }

  function saveBehaviorForm(ev) {
    ev.preventDefault();
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    global.Store.getDb().behaviors.push({
      id: global.Store.uid('beh'),
      classId: cls.id,
      studentId: document.getElementById('f_bh_stu').value,
      date: global.Jalali.getTodayStr(),
      type: document.getElementById('f_bh_type').value,
      points: Math.max(1, parseInt(document.getElementById('f_bh_pts').value, 10) || 1),
      label: document.getElementById('f_bh_lbl').value.trim(),
      note: ''
    });
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('مورد انضباطی ثبت شد ✓');
  }

  function deleteBehavior(id) {
    global.App.confirmDialog('این سابقه رفتاری حذف شود؟', function () {
      const db = global.Store.getDb();
      db.behaviors = db.behaviors.filter(function (b) { return b.id !== id; });
      global.Store.save();
      global.App.render();
    });
  }

  // ---------- ابزار ۵.۵: امتیاز و افتخار کلاس (۲.۱) ----------
  function pointTitleChip(info, extraStyle) {
    return '<span class="badge" style="background:' + info.title.color + '1A;color:' + info.title.color +
      ';border:1px solid ' + info.title.color + '55;font-weight:800;' + (extraStyle || '') + '">' +
      info.title.icon + ' ' + esc(info.title.label) + '</span>';
  }

  // علامت امتیاز یک‌بار و درست نمایش داده شود (رفع باگ نمایش «--۱۵»)
  function signedPoints(points, isPos) {
    const n = Number(points) || 0;
    const abs = global.Jalali.toFa(Math.abs(n));
    if (n === 0) return global.Jalali.toFa(0);
    return (n > 0 ? '+' : '−') + abs;
  }

  function renderPointsTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const J = global.Jalali;
    const rows = global.Store.getClassPointRanking(cls.id);
    const totals = global.Store.pointTotals(cls.id);
    const nf = function (n) { return J.toFa(n); };

    let html = '<div class="flex-between mb-2">' +
      '<span class="text-muted text-sm">امتیاز، رتبه و نشان افتخاری — ' + esc(cls.name) + '</span>' +
      '<button class="btn btn-primary btn-sm" onclick="ToolModules.openBehaviorModal()">+ ثبت مورد</button>' +
    '</div>';

    // کارت آمار کلاس
    html += '<div class="card" style="background:linear-gradient(135deg,#0B1120,#1E293B);color:#fff;">' +
      '<div style="display:flex;justify-content:space-around;text-align:center;gap:8px;">' +
        '<div><div style="font-size:22px;font-weight:900;">' + nf(totals.count) + '</div><div style="font-size:11px;opacity:.8;">دانش‌آموز</div></div>' +
        '<div><div style="font-size:22px;font-weight:900;">' + nf(totals.sum) + '</div><div style="font-size:11px;opacity:.8;">مجموع امتیاز</div></div>' +
        '<div><div style="font-size:22px;font-weight:900;">' + nf(totals.positive) + '</div><div style="font-size:11px;opacity:.8;">تراز مثبت</div></div>' +
      '</div>' +
      (totals.leader ? '<div style="margin-top:12px;text-align:center;font-size:12px;opacity:.95;">🥇 رتبهٔ اول: <b>' +
        esc(totals.leader.student.name) + '</b> با ' + nf(totals.leader.net) + ' امتیاز</div>' : '') +
    '</div>';

    // دکمه‌های عملیات
    html += '<div class="points-actions">' +
      '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.openBatchPointsModal()">⚡ ثبت گروهی</button>' +
      '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.openPointsReportModal()">📤 گزارش امتیاز</button>' +
      '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.openPointTitlesModal()">🏅 مسیر نشان‌ها</button>' +
      '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.confirmResetPoints()">♻️ صفر کردن تراز</button>' +
    '</div>';

    if (!rows.length) {
      html += '<div class="card empty-state">هنوز دانش‌آموزی در این کلاس ثبت نشده است.</div>';
      return html;
    }

    // سکوی سه‌نفره
    const top = rows.slice(0, 3);
    const podiumOrder = [top[1], top[0], top[2]].filter(Boolean);
    const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
    const heights = { 1: 96, 2: 74, 3: 58 };
    if (top.length) {
      html += '<div class="card" style="background:linear-gradient(180deg,#0F172A,#1E293B);color:#fff;padding:14px 10px 10px;">' +
        '<div style="display:flex;align-items:flex-end;justify-content:center;gap:6px;">';
      podiumOrder.forEach(function (r) {
        const h = heights[r.rank] || 50;
        html += '<div style="flex:1;text-align:center;">' +
          '<div style="font-size:24px;line-height:1;">' + (r.info.title.icon) + '</div>' +
          '<div style="font-size:12px;font-weight:800;margin:4px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(r.student.name) + '</div>' +
          '<div style="font-size:11px;opacity:.85;">' + nf(r.net) + ' امتیاز</div>' +
          '<div style="margin-top:6px;height:' + h + 'px;border-radius:8px 8px 0 0;background:linear-gradient(180deg,' +
            r.info.title.color + 'cc,' + r.info.title.color + '55);display:flex;align-items:flex-start;justify-content:center;padding-top:6px;font-size:18px;">' +
            (medals[r.rank] || '') +
          '</div>' +
        '</div>';
      });
      html += '</div></div>';
    }

    // فهرست رتبه‌بندی
    html += '<div class="section-label">رتبه‌بندی کلاس</div>';
    rows.forEach(function (r) {
      const sid = escJsAttr(r.student.id);
      html += '<div class="card" style="padding:12px;margin-bottom:8px;">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<div style="position:relative;flex:0 0 auto;">' +
            global.CoreModules.studentAvatarHtml(r.student, cls, { size: 38 }) +
            '<span style="position:absolute;bottom:-3px;left:-3px;min-width:18px;height:18px;padding:0 2px;border-radius:50%;background:' + r.info.title.color +
              ';color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:900;">' + nf(r.rank) + '</span>' +
          '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-weight:800;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(r.student.name) + '</div>' +
            '<div style="margin-top:4px;">' + pointTitleChip(r.info) + '</div>' +
          '</div>' +
          '<div style="text-align:center;min-width:52px;">' +
            '<div style="font-size:16px;font-weight:900;">' + nf(r.net) + '</div>' +
            '<div class="text-muted" style="font-size:10px;">امتیاز</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:8px;height:6px;border-radius:99px;background:var(--surface-3);overflow:hidden;">' +
          '<div style="height:100%;width:' + r.info.progress + '%;background:' + r.info.title.color + ';border-radius:99px;"></div>' +
        '</div>' +
        (r.info.next
          ? '<div class="text-muted" style="font-size:10.5px;margin-top:4px;">' + nf(r.info.remaining) + ' امتیاز تا «' + esc(r.info.next.label) + '»</div>'
          : '<div class="text-muted" style="font-size:10.5px;margin-top:4px;">بالاترین نشان کلاس کسب شد 👑</div>') +
        '<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">' +
          '<button class="btn btn-sm" style="flex:1;background:rgba(220,38,38,.12);color:#DC2626;border:1px solid rgba(220,38,38,.35);" onclick="ToolModules.quickAddPoint(\'' + sid + '\',-1)">−۱</button>' +
          '<button class="btn btn-sm" style="flex:1;background:rgba(22,163,74,.12);color:#16A34A;border:1px solid rgba(22,163,74,.35);" onclick="ToolModules.quickAddPoint(\'' + sid + '\',1)">+۱</button>' +
          '<button class="btn btn-sm" style="flex:1;background:rgba(22,163,74,.12);color:#16A34A;border:1px solid rgba(22,163,74,.35);" onclick="ToolModules.quickAddPoint(\'' + sid + '\',2)">+۲</button>' +
          '<button class="btn btn-sm" style="flex:1;background:rgba(22,163,74,.18);color:#15803D;border:1px solid rgba(22,163,74,.45);font-weight:900;" onclick="ToolModules.quickAddPoint(\'' + sid + '\',5)">+۵</button>' +
          '<button class="btn btn-sm btn-outline" style="flex:1;" onclick="ToolModules.openStudentPointsMessage(\'' + sid + '\')">💬 ولی</button>' +
        '</div>' +
      '</div>';
    });

    return html;
  }

  function quickAddPoint(studentId, delta) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const stu = global.Store.getStudentById(studentId);
    if (!stu) return;
    const type = delta < 0 ? 'neg' : 'pos';
    global.Store.addPointEntry(studentId, cls.id, Math.abs(delta), delta < 0 ? 'ثبت سریع تذکر' : 'ثبت سریع تشویق', type);
    global.Store.save();
    global.Store.vibrate(25);
    if (delta > 0 && global.Store.playPointFeedback) {
      try { global.Store.playPointFeedback(); } catch (e) {}
    }
    const st = global.Store.computeStudentStats(studentId, cls.id);
    const info = global.Store.getPointTitle(st.netBehavior);
    global.App.render();
    global.App.toast(stu.name + ': ' + (st.netBehavior > 0 ? '+' : '') + global.Jalali.toFa(st.netBehavior) + ' — ' + info.title.label);
  }

  // --- ثبت گروهی امتیاز ---
  let batchPointsState = { deltas: {}, label: '' };

  function renderBatchPointsBody() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '';
    const students = global.Store.getStudentsByClass(cls.id);
    const J = global.Jalali;
    const nf = function (n) { return J.toFa(n); };

    let html = '<div style="display:flex;gap:8px;margin-bottom:10px;">' +
      '<button type="button" class="btn btn-outline btn-sm" style="flex:1;" onclick="ToolModules.batchAll(1)">+۱ به همه</button>' +
      '<button type="button" class="btn btn-outline btn-sm" style="flex:1;" onclick="ToolModules.batchResetInModal()">ریست تغییرات</button>' +
    '</div>' +
    '<div class="form-group"><label class="form-label">علت گروهی (اختیاری)</label>' +
      '<input id="f_bp_label" class="form-control" placeholder="مثلاً: مشارکت گروهی در فعالیت کلاسی" value="' + esc(batchPointsState.label) + '"' +
        ' oninput="ToolModules.batchSetLabel(this.value)"></div>';

    html += '<div style="max-height:46vh;overflow:auto;">';
    students.forEach(function (s) {
      const st = global.Store.computeStudentStats(s.id, cls.id);
      const d = batchPointsState.deltas[s.id] || 0;
      const sid = escJsAttr(s.id);
      html += '<div class="list-row" style="align-items:center;gap:8px;">' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font-weight:800;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(s.name) + '</div>' +
          '<div class="text-muted" style="font-size:11px;">تراز فعلی: ' + nf(st.netBehavior) + '</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;">' +
          '<button type="button" class="btn btn-sm btn-outline" onclick="ToolModules.batchStep(\'' + sid + '\',-1)" style="min-width:36px;">−</button>' +
          '<span style="min-width:42px;text-align:center;font-weight:900;font-size:13px;color:' + (d > 0 ? '#16A34A' : d < 0 ? '#DC2626' : 'var(--text-muted)') + ';">' +
            (d > 0 ? '+' : '') + nf(d) + '</span>' +
          '<button type="button" class="btn btn-sm btn-outline" onclick="ToolModules.batchStep(\'' + sid + '\',1)" style="min-width:36px;">+</button>' +
        '</div>' +
      '</div>';
    });
    html += '</div>';

    html += '<button type="button" class="btn btn-primary btn-block mt-3" onclick="ToolModules.saveBatchPoints()">ثبت امتیازات گروهی</button>';
    return html;
  }

  function refreshBatchPointsModal() {
    const bEl = document.getElementById('modal_body');
    if (bEl) bEl.innerHTML = renderBatchPointsBody();
  }

  function openBatchPointsModal() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    if (!global.Store.getStudentsByClass(cls.id).length) {
      global.App.toast('ابتدا دانش‌آموز اضافه کنید');
      return;
    }
    batchPointsState = { deltas: {}, label: '' };
    global.App.openModal('ثبت گروهی امتیاز — ' + cls.name, renderBatchPointsBody());
  }

  function batchStep(studentId, delta) {
    const cur = batchPointsState.deltas[studentId] || 0;
    const next = Math.max(-20, Math.min(20, cur + delta));
    if (next === 0) delete batchPointsState.deltas[studentId];
    else batchPointsState.deltas[studentId] = next;
    refreshBatchPointsModal();
  }

  function batchAll(delta) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    global.Store.getStudentsByClass(cls.id).forEach(function (s) {
      const cur = batchPointsState.deltas[s.id] || 0;
      batchPointsState.deltas[s.id] = Math.max(-20, Math.min(20, cur + delta));
    });
    refreshBatchPointsModal();
  }

  function batchResetInModal() {
    batchPointsState.deltas = {};
    refreshBatchPointsModal();
  }

  function batchSetLabel(v) {
    batchPointsState.label = v;
  }

  function saveBatchPoints() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const rows = Object.keys(batchPointsState.deltas).map(function (sid) {
      return { studentId: sid, delta: batchPointsState.deltas[sid] };
    });
    if (!rows.length) {
      global.App.toast('تغییری برای ثبت وجود ندارد');
      return;
    }
    const label = (batchPointsState.label || '').trim() || 'ثبت گروهی امتیاز';
    const saved = global.Store.addBatchPointEntries(cls.id, rows, label);
    global.Store.save();
    global.Store.vibrate(35);
    batchPointsState = { deltas: {}, label: '' };
    global.App.closeModal();
    global.App.render();
    global.App.toast(global.Jalali.toFa(saved.length) + ' رکورد امتیاز ثبت شد ✓');
  }

  // --- گزارش امتیاز و پیام به اولیا ---
  function openPointsReportModal() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const db = global.Store.getDb();
    const text = global.Store.buildPointsReport(cls.id, {
      includeToday: true,
      teacherName: db.settings.teacherName || ''
    });
    const html = '<div class="form-group"><label class="form-label">متن گزارش (قابل ویرایش پیش از ارسال)</label>' +
      '<textarea id="f_pr_text" class="form-control" rows="12" style="font-size:12.5px;line-height:1.9;">' + esc(text) + '</textarea></div>' +
      '<div class="flex-wrap mb-2" style="gap:8px;">' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.copyPointsReport()">📋 کپی متن</button>' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.sharePointsReport()">📤 اشتراک‌گذاری</button>' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.savePointsReportFile()">💾 ذخیره فایل متنی</button>' +
      '</div>' +
      '<p class="text-muted" style="font-size:11px;line-height:1.8;margin:0;">این گزارش فقط روی همین گوشی ساخته می‌شود؛ برنامه هیچ مجوز اینترنت ندارد. ارسال به پیام‌رسان‌ها با انتخاب همان برنامه در صفحهٔ اشتراک‌گذاری انجام می‌شود.</p>';
    global.App.openModal('گزارش امتیاز و افتخار', html);
  }

  function currentReportText() {
    const el = document.getElementById('f_pr_text');
    return el ? el.value : '';
  }

  function copyPointsReport() {
    global.Store.copyText(currentReportText());
  }

  function sharePointsReport() {
    const cls = global.Store.getActiveClass();
    global.Store.shareText('گزارش امتیاز کلاس ' + (cls ? cls.name : ''), currentReportText());
  }

  function savePointsReportFile() {
    const cls = global.Store.getActiveClass();
    const datePart = (global.Jalali.getTodayStr() || '').replace(/\//g, '-');
    global.Store.exportFile('DarsYar-Points-' + (cls ? cls.id : 'class') + '-' + datePart + '.txt', 'text/plain', currentReportText());
    global.App.toast('فایل گزارش آماده شد ✓');
  }

  function openStudentPointsMessage(studentId) {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const stu = global.Store.getStudentById(studentId);
    if (!stu) return;
    const text = global.Store.buildStudentPointsMessage(studentId, cls.id);
    const hasPhone = !!(stu.parentPhone && String(stu.parentPhone).trim());
    const html = '<div class="form-group"><label class="form-label">پیام برای ولی ' + esc(stu.name) + '</label>' +
      '<textarea id="f_pm_text" class="form-control" rows="7" style="font-size:12.5px;line-height:1.9;">' + esc(text) + '</textarea></div>' +
      '<div class="flex-wrap mb-2" style="gap:8px;">' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.copyStudentPointsMessage()">📋 کپی</button>' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="ToolModules.shareStudentPointsMessage()">📤 اشتراک‌گذاری</button>' +
        (hasPhone ? '<button type="button" class="btn btn-primary btn-sm" onclick="ToolModules.smsStudentPointsMessage(\'' + escJsAttr(studentId) + '\')">✉️ پیامک</button>' : '') +
      '</div>' +
      (hasPhone ? '' : '<p class="text-muted" style="font-size:11px;">شمارهٔ ولی برای این دانش‌آموز ثبت نشده است؛ از بخش شاگردان می‌توانید اضافه کنید.</p>');
    global.App.openModal('پیام امتیاز به ولی', html);
  }

  function currentStudentMsgText() {
    const el = document.getElementById('f_pm_text');
    return el ? el.value : '';
  }

  function copyStudentPointsMessage() { global.Store.copyText(currentStudentMsgText()); }
  function shareStudentPointsMessage() { global.Store.shareText('پیام امتیاز به ولی', currentStudentMsgText()); }
  function smsStudentPointsMessage(studentId) {
    const stu = global.Store.getStudentById(studentId);
    global.Store.sendSms(stu ? stu.parentPhone : '', currentStudentMsgText());
  }

  // --- مسیر نشان‌های افتخاری ---
  function openPointTitlesModal() {
    const cls = global.Store.getActiveClass();
    const rows = cls ? global.Store.getClassPointRanking(cls.id) : [];
    const J = global.Jalali;
    let html = '<p class="text-muted" style="font-size:12px;line-height:1.9;margin:0 0 10px;">هر دانش‌آموز بر پایهٔ تراز خالص امتیاز (تشویق منهای تذکر) نشان می‌گیرد. نشان‌ها پله‌پله‌اند و با ادامهٔ تلاش ارتقا می‌یابند.</p>';
    global.Store.POINT_TITLES.forEach(function (t, i) {
      const holders = rows.filter(function (r) { return r.info.index === i; });
      html += '<div class="list-row" style="align-items:center;">' +
        '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">' +
          '<span style="font-size:18px;">' + t.icon + '</span>' +
          '<div>' +
            '<div style="font-weight:800;font-size:13px;color:' + t.color + ';">' + esc(t.label) + '</div>' +
            '<div class="text-muted" style="font-size:11px;">' + (t.max === null ? J.toFa(t.min) + ' امتیاز و بیشتر' : J.toFa(t.min) + ' تا ' + J.toFa(t.max) + ' امتیاز') + '</div>' +
          '</div>' +
        '</div>' +
        '<span class="badge badge-muted">' + J.toFa(holders.length) + ' نفر</span>' +
      '</div>';
    });
    html += '<p class="text-muted" style="font-size:11px;line-height:1.8;margin-top:10px;">تراز منفی هم نشان «جوانهٔ تلاش» را نگه می‌دارد و با ثبت تشویق‌های تازه بالا می‌رود.</p>';
    global.App.openModal('مسیر نشان‌های افتخاری', html);
  }

  function confirmResetPoints() {
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    global.App.confirmDialog(
      'تراز امتیاز همهٔ دانش‌آموزان این کلاس صفر شود؟ سوابق قبلی حذف نمی‌شوند و در پرونده باقی می‌مانند؛ فقط یک رکورد جبرانی ثبت می‌شود.',
      function () {
        const n = global.Store.resetClassPoints(cls.id);
        global.Store.save();
        global.App.render();
        global.App.toast(n ? 'تراز ' + global.Jalali.toFa(n) + ' دانش‌آموز صفر شد ✓' : 'تراز همه از قبل صفر بود');
      }
    );
  }

  // ---------- ابزار ۶: شهریه و جلسات تدریس خصوصی ----------
  function renderFeesAndSessionsTool() {
    const db = global.Store.getDb();
    const J = global.Jalali;
    let html = '<div class="seg-tabs">' +
      '<button class="seg-tab ' + (tState.tutorTab === 'fees' ? 'active' : '') + '" onclick="ToolModules.setTutorTab(\'fees\')">💰 شهریه و پرداخت</button>' +
      '<button class="seg-tab ' + (tState.tutorTab === 'sessions' ? 'active' : '') + '" onclick="ToolModules.setTutorTab(\'sessions\')">🕒 گزارش جلسات خصوصی</button>' +
    '</div>';

    if (tState.tutorTab === 'sessions') {
      html += '<div class="flex-between mb-2">' +
        '<span class="text-muted text-sm">لاگ جلسات تدریس خصوصی و آموزشگاهی</span>' +
        '<button class="btn btn-primary btn-sm" onclick="ToolModules.openSessionModal()">+ ثبت جلسه</button>' +
      '</div>';
      const sessions = db.sessions.slice().reverse();
      if (!sessions.length) {
        return html + '<div class="card empty-state"><div class="empty-state-icon">🕒</div><div>هنوز جلسه خصوصی ثبت نشده است.</div></div>';
      }
      sessions.forEach(function (ses) {
        const stu = global.Store.getStudentById(ses.studentId);
        html += '<div class="card">' +
          '<div class="flex-between">' +
            '<div>' +
              '<b>' + esc(stu ? stu.name : 'دانش‌آموز') + '</b> • <span class="badge badge-info">' + esc(J.toFa(ses.durationMin)) + ' دقیقه</span>' +
              '<div class="text-muted text-sm">📅 ' + esc(J.formatJalaliHuman(ses.date, true)) + '</div>' +
              '<div class="text-sm mt-2"><b>مبحث:</b> ' + esc(ses.topic) + '</div>' +
              (ses.homework ? '<div class="text-muted text-sm"><b>تکلیف جلسه بعد:</b> ' + esc(ses.homework) + '</div>' : '') +
            '</div>' +
            '<button class="btn btn-sm btn-danger" onclick="ToolModules.deleteSession(\'' + escJsAttr(ses.id) + '\')">حذف</button>' +
          '</div></div>';
      });
      return html;
    }

    // شهریه‌ها
    let totalAll = 0, paidAll = 0, dueAll = 0;
    db.fees.forEach(function (f) {
      const amount = Number(f.amount) || 0;
      const paid = Number(f.paidAmount) || 0;
      totalAll += amount;
      paidAll += paid;
      // An overpayment for one pupil/item cannot hide another unpaid item.
      dueAll += Math.max(0, amount - paid);
    });

    html += '<div class="stats-grid" style="grid-template-columns:repeat(2,1fr);">' +
      '<div class="stat-card"><div><div class="stat-val" style="color:var(--success);font-size:15px;">' + J.formatMoney(paidAll) + '</div><div class="stat-lbl">دریافتی کل (تومان)</div></div></div>' +
      '<div class="stat-card"><div><div class="stat-val" style="color:var(--danger);font-size:15px;">' + J.formatMoney(dueAll) + '</div><div class="stat-lbl">مانده بدهی شاگردان</div></div></div>' +
    '</div>';

    html += '<div class="flex-between mb-2" style="flex-wrap:wrap;gap:6px;">' +
      '<label style="display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;">' +
        '<input type="checkbox" ' + (tState.feeOnlyDebtors ? 'checked' : '') + ' onchange="ToolModules.toggleDebtors(this.checked)"> فقط بدهکاران' +
      '</label>' +
      '<div class="flex-wrap">' +
        (db.fees.length ? '<button class="btn btn-sm btn-outline" onclick="ToolModules.exportFeesCsv()">اکسل مالی</button>' : '') +
        '<button class="btn btn-sm btn-primary" onclick="ToolModules.openFeeModal()">+ ثبت شهریه</button>' +
      '</div>' +
    '</div>';

    const list = db.fees.slice().reverse().filter(function (f) {
      if (!tState.feeOnlyDebtors) return true;
      return (Number(f.amount) || 0) > (Number(f.paidAmount) || 0);
    });

    if (!list.length) {
      html += '<div class="card empty-state">مورد مالی در این بخش وجود ندارد.</div>';
    } else {
      list.forEach(function (f) {
        const stu = global.Store.getStudentById(f.studentId);
        const rem = Math.max(0, (Number(f.amount) || 0) - (Number(f.paidAmount) || 0));
        html += '<div class="card">' +
          '<div class="flex-between" style="flex-wrap:wrap;gap:8px;">' +
            '<div>' +
              '<div style="display:flex;align-items:center;gap:8px;font-weight:900;">' +
                (stu ? global.CoreModules.studentAvatarHtml(stu, global.Store.getClassById(stu.classId), { size: 30 }) : '') +
                '<span>' + esc(stu ? stu.name : 'دانش‌آموز') + ' — ' + esc(f.title) + '</span></div>' +
              '<div class="text-muted text-sm">مبلغ کل: ' + J.formatMoney(f.amount) + ' تومان • پرداختی: ' + J.formatMoney(f.paidAmount) + ' تومان</div>' +
              '<div class="mt-2">' +
                (rem === 0
                  ? '<span class="badge badge-success">تسویه کامل ✓</span>'
                  : '<span class="badge badge-danger">مانده بدهی: ' + J.formatMoney(rem) + ' تومان</span>') +
                ' <span class="badge badge-muted">موعد: ' + esc(J.toFa(f.dueDate)) + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="flex-wrap">' +
              (rem > 0 ? '<button class="btn btn-sm btn-success" onclick="ToolModules.settleFee(\'' + escJsAttr(f.id) + '\')">تسویه شد</button>' : '') +
              '<button class="btn btn-sm btn-outline" onclick="ToolModules.shareFeeReceipt(\'' + escJsAttr(f.id) + '\')">رسید</button>' +
              '<button class="btn btn-sm btn-danger" onclick="ToolModules.deleteFee(\'' + escJsAttr(f.id) + '\')">حذف</button>' +
            '</div>' +
          '</div></div>';
      });
    }
    return html;
  }

  function openFeeModal() {
    const db = global.Store.getDb();
    if (!db.students.length) { global.App.toast('ابتدا دانش‌آموز اضافه کنید'); return; }
    let sOpts = '';
    db.students.forEach(function (s) {
      const c = global.Store.getClassById(s.classId);
      sOpts += '<option value="' + esc(s.id) + '">' + esc(s.name) + (c ? ' (' + esc(c.name) + ')' : '') + '</option>';
    });
    const activeCls = global.Store.getActiveClass();
    const defFee = activeCls && activeCls.defaultFee ? activeCls.defaultFee : '';

    const html = '<form onsubmit="ToolModules.saveFeeForm(event)">' +
      '<div class="form-group"><label class="form-label">دانش‌آموز</label><select id="f_fee_stu" class="form-control">' + sOpts + '</select></div>' +
      '<div class="form-group"><label class="form-label">بابت / عنوان دوره *</label>' +
        '<input id="f_fee_title" class="form-control" required placeholder="مثلاً: شهریه آبان‌ماه (۴ جلسه)"></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">مبلغ کل (تومان) *</label>' +
          '<input id="f_fee_amt" type="text" inputmode="numeric" class="form-control" required value="' + esc(defFee) + '"></div>' +
        '<div class="form-group"><label class="form-label">مبلغ پرداخت‌شده (تومان)</label>' +
          '<input id="f_fee_paid" type="text" inputmode="numeric" class="form-control" value="0"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">تاریخ سررسید (شمسی)</label>' +
        '<input id="f_fee_due" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_fee_due\').value=d; })" value="' + esc(global.Jalali.getTodayStr()) + '"></div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ثبت شهریه</button></form>';
    global.App.openModal('ثبت شهریه جدید', html);
  }

  function saveFeeForm(ev) {
    ev.preventDefault();
    const stuId = document.getElementById('f_fee_stu').value;
    const stu = global.Store.getStudentById(stuId);
    if (!stu) return;
    const amount = global.Jalali.parseNum(document.getElementById('f_fee_amt').value, NaN);
    const paidText = document.getElementById('f_fee_paid').value.trim();
    const paidAmount = paidText ? global.Jalali.parseNum(paidText, NaN) : 0;
    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(paidAmount) || paidAmount < 0) {
      global.App.toast('مبلغ کل باید مثبت و پرداختی عددی نامنفی باشد؛ شهریه ثبت نشد.');
      return;
    }
    global.Store.getDb().fees.push({
      id: global.Store.uid('fee'),
      classId: stu.classId,
      studentId: stu.id,
      title: document.getElementById('f_fee_title').value.trim(),
      amount: amount,
      paidAmount: paidAmount,
      dueDate: document.getElementById('f_fee_due').value.trim(),
      paidDate: global.Jalali.getTodayStr(),
      note: ''
    });
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('شهریه ثبت شد ✓');
  }

  function settleFee(id) {
    const f = global.Store.getDb().fees.find(function (x) { return x.id === id; });
    if (!f) return;
    f.paidAmount = f.amount;
    f.paidDate = global.Jalali.getTodayStr();
    global.Store.save();
    global.App.render();
    global.App.toast('تسویه کامل ثبت شد ✓');
  }

  function shareFeeReceipt(id) {
    const f = global.Store.getDb().fees.find(function (x) { return x.id === id; });
    if (!f) return;
    const stu = global.Store.getStudentById(f.studentId);
    const J = global.Jalali;
    const rem = Math.max(0, (Number(f.amount) || 0) - (Number(f.paidAmount) || 0));
    const txt = '🧾 وضعیت شهریه آموزشی\nدانش‌آموز: ' + (stu ? stu.name : '') +
      '\nعنوان: ' + f.title +
      '\nمبلغ کل: ' + J.formatMoney(f.amount) + ' تومان' +
      '\nپرداخت‌شده: ' + J.formatMoney(f.paidAmount) + ' تومان' +
      '\nمانده: ' + (rem === 0 ? 'تسویه کامل ✓' : J.formatMoney(rem) + ' تومان') +
      '\nتاریخ: ' + J.formatJalaliHuman(J.getTodayStr(), false);
    global.Store.shareText('رسید شهریه', txt);
  }

  function deleteFee(id) {
    global.App.confirmDialog('این سابقه شهریه و پرداخت حذف شود؟', function () {
      const db = global.Store.getDb();
      db.fees = db.fees.filter(function (f) { return f.id !== id; });
      global.Store.save();
      global.App.render();
    });
  }

  function exportFeesCsv() {
    const db = global.Store.getDb();
    const rows = db.fees.map(function (f) {
      const s = global.Store.getStudentById(f.studentId);
      const rem = Math.max(0, (Number(f.amount) || 0) - (Number(f.paidAmount) || 0));
      return [s ? s.name : '', f.title, f.amount, f.paidAmount, rem, f.dueDate];
    });
    global.Store.exportCsv('DarsYar-Fees.csv', ['دانش‌آموز', 'بابت', 'مبلغ کل', 'پرداخت‌شده', 'مانده', 'سررسید'], rows);
  }

  function openSessionModal() {
    const db = global.Store.getDb();
    if (!db.students.length) { global.App.toast('ابتدا دانش‌آموز اضافه کنید'); return; }
    let sOpts = '';
    db.students.forEach(function (s) {
      sOpts += '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>';
    });
    const html = '<form onsubmit="ToolModules.saveSessionForm(event)">' +
      '<div class="form-group"><label class="form-label">شاگرد</label><select id="f_ses_stu" class="form-control">' + sOpts + '</select></div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label class="form-label">تاریخ جلسه</label>' +
          '<input id="f_ses_date" class="form-control" readonly onclick="Jalali.openDatePicker(this.value, function(d){ document.getElementById(\'f_ses_date\').value=d; })" value="' + esc(global.Jalali.getTodayStr()) + '"></div>' +
        '<div class="form-group"><label class="form-label">مدت (دقیقه)</label>' +
          '<input id="f_ses_dur" type="number" class="form-control" value="90"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label">مبحث تدریس‌شده *</label>' +
        '<input id="f_ses_topic" class="form-control" required placeholder="مثلاً: مشتق و کاربرد مشتق"></div>' +
      '<div class="form-group"><label class="form-label">تکلیف جلسه آینده</label>' +
        '<input id="f_ses_hw" class="form-control" placeholder="مثلاً: حل ۵۰ تست مضرب ۳"></div>' +
      '<button type="submit" class="btn btn-primary btn-block mt-3">ذخیره گزارش جلسه</button></form>';
    global.App.openModal('ثبت جلسه تدریس خصوصی', html);
  }

  function saveSessionForm(ev) {
    ev.preventDefault();
    const stu = global.Store.getStudentById(document.getElementById('f_ses_stu').value);
    if (!stu) return;
    global.Store.getDb().sessions.push({
      id: global.Store.uid('ses'),
      classId: stu.classId,
      studentId: stu.id,
      date: document.getElementById('f_ses_date').value.trim(),
      durationMin: parseInt(document.getElementById('f_ses_dur').value, 10) || 90,
      topic: document.getElementById('f_ses_topic').value.trim(),
      homework: document.getElementById('f_ses_hw').value.trim(),
      attended: true
    });
    global.Store.save();
    global.App.closeModal();
    global.App.render();
    global.App.toast('جلسه ثبت شد ✓');
  }

  function deleteSession(id) {
    global.App.confirmDialog('این سابقه جلسه حذف شود؟', function () {
      const db = global.Store.getDb();
      db.sessions = db.sessions.filter(function (s) { return s.id !== id; });
      global.Store.save();
      global.App.render();
    });
  }

  // ---------- ابزار ۷: پیام‌ساز اولیا ----------
  function renderMessagesTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const students = global.Store.getStudentsByClass(cls.id);
    if (!students.length) return '<div class="card empty-state">دانش‌آموزی در این کلاس وجود ندارد.</div>';

    if (!tState.msgStudentId || !students.some(function (s) { return s.id === tState.msgStudentId; })) {
      tState.msgStudentId = students[0].id;
      rebuildMsgTemplate();
    }

    const stu = global.Store.getStudentById(tState.msgStudentId);
    const tpls = [
      { k: 'praise', t: '🌟 تقدیر و تشکر' },
      { k: 'absence', t: '⚠️ اطلاع غیبت' },
      { k: 'homework', t: '📚 پیگیری تکلیف' },
      { k: 'exam', t: '📝 یادآوری آزمون' },
      { k: 'meeting', t: '🤝 دعوت به گفتگو' }
    ];

    let sOpts = '';
    students.forEach(function (s) {
      sOpts += '<option value="' + esc(s.id) + '" ' + (s.id === tState.msgStudentId ? 'selected' : '') + '>' + esc(s.name) + '</option>';
    });

    return '<div class="card">' +
      '<div class="form-group"><label class="form-label">انتخاب دانش‌آموز</label>' +
        '<select class="form-control" onchange="ToolModules.changeMsgStudent(this.value)">' + sOpts + '</select></div>' +
      '<div class="form-label">قالب آماده پیام</div>' +
      '<div class="flex-wrap mb-2">' +
        tpls.map(function (tp) {
          return '<button class="badge ' + (tState.msgTemplateKey === tp.k ? 'badge-primary' : 'badge-muted') + '" style="padding:7px 11px;" onclick="ToolModules.changeMsgTpl(\'' + tp.k + '\')">' + tp.t + '</button>';
        }).join('') +
      '</div>' +
      '<div class="form-group"><label class="form-label">متن قابل ویرایش پیام</label>' +
        '<textarea id="f_msg_body" rows="5" class="form-control" oninput="ToolModules.editMsgBody(this.value)">' + esc(tState.msgText) + '</textarea></div>' +
      '<div class="flex-wrap">' +
        '<button class="btn btn-primary" style="flex:1;" onclick="ToolModules.sendCurrentSms()">📩 ارسال پیامک به ولی</button>' +
        '<button class="btn btn-soft" style="flex:1;" onclick="ToolModules.shareCurrentMsg()">📤 ارسال در پیام‌رسان / کپی</button>' +
      '</div>' +
      (stu && stu.parentPhone ? '<div class="text-muted text-sm mt-2">شماره ثبت‌شده ولی: ' + esc(stu.parentPhone) + '</div>' : '') +
    '</div>';
  }

  function rebuildMsgTemplate() {
    const stu = global.Store.getStudentById(tState.msgStudentId);
    const cls = stu ? global.Store.getClassById(stu.classId) : null;
    const db = global.Store.getDb();
    if (!stu || !cls) return;
    const today = global.Jalali.formatJalaliHuman(global.Jalali.getTodayStr(), true);
    const sign = db.settings.teacherName ? ('\nبا احترام، ' + db.settings.teacherName) : '\nبا احترام و سپاس';
    const name = stu.name;

    const map = {
      praise: 'اولیای گرامی دانش‌آموز عزیز «' + name + '»، سلام و عرض ادب؛\nبدین‌وسیله از تلاش، نظم و مشارکت بسیار خوب فرزندتان در کلاس «' + cls.name + '» صمیمانه قدردانی می‌نمایم.' + sign,
      absence: 'اولیای گرامی، با سلام؛\nبه استحضار می‌رساند فرزندتان «' + name + '» امروز (' + today + ') در کلاس «' + cls.name + '» حضور نداشته‌اند. لطفاً علت غیبت را اطلاع فرمایید.' + sign,
      homework: 'اولیای گرامی، سلام و احترام؛\nجهت اطلاع، تکلیف جلسه اخیر کلاس «' + cls.name + '» توسط «' + name + '» عزیز تحویل داده نشده است. خواهشمند است پیگیری فرمایید.' + sign,
      exam: 'اولیای گرامی دانش‌آموز «' + name + '»، سلام؛\nیادآوری می‌شود آزمون کلاس «' + cls.name + '» به‌زودی برگزار خواهد شد. لطفاً بر مرور و آمادگی ایشان نظارت فرمایید.' + sign,
      meeting: 'اولیای محترم دانش‌آموز «' + name + '»، با سلام؛\nجهت هم‌فکری پیرامون روند تحصیلی فرزندتان در درس «' + cls.name + '»، تقاضا دارم در اولین فرصت هماهنگی لازم جهت گفتگو به عمل آید.' + sign
    };
    tState.msgText = map[tState.msgTemplateKey] || map.praise;
  }

  // ---------- ابزار ۸: آمار و نمودارهای تحلیلی ----------
  function renderChartsTool() {
    const db = global.Store.getDb();
    const J = global.Jalali;
    const activeCls = global.Store.getActiveClass();
    if (!activeCls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';

    const students = global.Store.getStudentsByClass(activeCls.id);
    let bEx = 0, bGood = 0, bFair = 0, bLow = 0;
    const ranked = [];

    students.forEach(function (s) {
      const st = global.Store.computeStudentStats(s.id, activeCls.id);
      ranked.push({ stu: s, st: st });
      if (st.avg20 !== null) {
        if (st.avg20 >= 18) bEx++;
        else if (st.avg20 >= 15) bGood++;
        else if (st.avg20 >= 12) bFair++;
        else bLow++;
      }
    });

    const maxBucket = Math.max(1, bEx, bGood, bFair, bLow);
    const totalRanked = bEx + bGood + bFair + bLow;
    const barRow = function (label, count, color) {
      const w = Math.round((count / maxBucket) * 100);
      const share = totalRanked ? Math.round((count / totalRanked) * 100) : 0;
      return '<div style="margin-bottom:10px;">' +
        '<div class="flex-between text-sm mb-2"><b>' + label + '</b><span>' + J.toFa(count) + ' نفر' +
          (totalRanked ? ' (' + J.toFa(share) + '٪)' : '') + '</span></div>' +
        '<div style="height:12px;background:var(--surface-3);border-radius:999px;overflow:hidden;">' +
          '<div style="width:' + w + '%;height:100%;background:' + color + ';border-radius:999px;"></div>' +
        '</div></div>';
    };

    let html = '<div class="card">' +
      '<h3 class="card-title mb-2">📊 توزیع سطح علمی — ' + esc(activeCls.name) + '</h3>' +
      barRow('خیلی خوب / عالی (۱۸ تا ۲۰)', bEx, '#10B981') +
      barRow('خوب (۱۵ تا ۱۷.۹۹)', bGood, '#3B82F6') +
      barRow('قابل قبول (۱۲ تا ۱۴.۹۹)', bFair, '#F59E0B') +
      barRow('نیازمند تلاش بیشتر (زیر ۱۲)', bLow, '#EF4444') +
    '</div>';

    // مقایسه کلاس‌ها
    if (db.classes.length > 0) {
      html += '<div class="card"><h3 class="card-title mb-2">🏫 مقایسه میانگین کلاس‌ها</h3>';
      db.classes.forEach(function (c) {
        const stus = global.Store.getStudentsByClass(c.id);
        const avgs = stus.map(function (s) { return global.Store.computeStudentStats(s.id, c.id).avg20; }).filter(function (v) { return v !== null; });
        const cAvg = avgs.length ? Math.round((avgs.reduce(function (a, b) { return a + b; }, 0) / avgs.length) * 100) / 100 : 0;
        const pct = Math.min(100, Math.round((cAvg / 20) * 100));
        html += '<div style="margin-bottom:10px;">' +
          '<div class="flex-between text-sm mb-2"><b>' + esc(c.name) + '</b><span>' + (avgs.length ? J.faNum(cAvg) + ' از ۲۰' : 'بدون نمره') + '</span></div>' +
          '<div style="height:12px;background:var(--surface-3);border-radius:999px;overflow:hidden;">' +
            '<div style="width:' + pct + '%;height:100%;background:' + esc(c.color || '#0F766E') + ';border-radius:999px;"></div>' +
          '</div></div>';
      });
      html += '</div>';
    }

    const needHelp = ranked.filter(function (r) {
      return (r.st.avg20 !== null && r.st.avg20 < 14) || r.st.attendanceRate < 80;
    });
    if (needHelp.length) {
      html += '<div class="card"><h3 class="card-title mb-2">⚠️ دانش‌آموزان نیازمند توجه ویژه</h3>';
      needHelp.forEach(function (r) {
        html += '<div class="list-row"><b>' + esc(r.stu.name) + '</b>' +
          '<div class="flex-wrap">' +
            (r.st.avg20 !== null ? '<span class="badge badge-warning">معدل: ' + J.faNum(r.st.avg20) + '</span>' : '') +
            '<span class="badge badge-danger">حضور: ' + J.toFa(r.st.attendanceRate) + '٪</span>' +
          '</div></div>';
      });
      html += '</div>';
    }
    return html;
  }

  let pendingRestoreText = '';

  // تاریخ میلادی ISO → تاریخ شمسی خوانا (برای «آخرین پشتیبان» و «نسخهٔ خودکار»)
  function ymdToJalaliHuman(ymd) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(ymd || ''));
    if (!m) return '';
    try {
      const j = global.Jalali.gregorianToJalali(Number(m[1]), Number(m[2]), Number(m[3]));
      return global.Jalali.formatJalaliHuman(global.Jalali.formatJalaliStr(j.jy, j.jm, j.jd), false);
    } catch (e) { return ''; }
  }

  // ---------- ابزار ۹: تنظیمات، پالت رنگ، قفل امنیتی و پشتیبان‌گیری ----------
  function renderSettingsTool() {
    const db = global.Store.getDb();
    const s = db.settings;
    const curPal = s.themePalette || 'teal';
    const hasPin = !!(s.pinCode && s.pinCode.length === 4);

    const palettes = [
      { id: 'teal',     name: 'فیروزه‌ای فرهنگیان', hex: '#0B6E75' },
      { id: 'emerald',  name: 'زمردی کلاسیک',       hex: '#059669' },
      { id: 'sapphire', name: 'یاقوت کبود',         hex: '#2563EB' },
      { id: 'amber',    name: 'کهربایی گرم',        hex: '#D97706' }
    ];
    let palHtml = '';
    palettes.forEach(function (p) {
      palHtml += '<button type="button" class="palette-chip ' + (curPal === p.id ? 'active' : '') + '" onclick="App.setPalette(\'' + p.id + '\')">' +
        '<span class="palette-dot" style="background:' + p.hex + ';"></span>' +
        '<span>' + p.name + '</span>' +
      '</button>';
    });

    return '<div class="card">' +
      '<h3 class="card-title mb-2">🎨 ظاهر، پالت رنگ و حالت شب</h3>' +
      '<div class="palette-grid mb-2">' + palHtml + '</div>' +
      '<div class="flex-between" style="border-top:1px solid var(--border);padding-top:10px;margin-top:8px;">' +
        '<div><b>🌙 حالت شب (تم تیره استاندارد)</b><div class="text-muted text-sm">کنتراست بهینه در محیط‌های کم‌نور</div></div>' +
        '<button type="button" class="btn btn-sm btn-outline" onclick="App.toggleDarkMode()">' + (s.darkMode ? '☀️ تغییر به روشن' : '🌙 تغییر به تاریک') + '</button>' +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h3 class="card-title mb-2">🔐 قفل امنیتی ۴ رقمی دفتر معلم</h3>' +
      '<p class="text-muted text-sm" style="margin-top:0;">در صورت فعال‌سازی، هنگام باز شدن برنامه رمز ۴ رقمی درخواست می‌شود. این قفل برای ورود معمولی است و داده‌ها یا فایل پشتیبان را رمزگذاری نمی‌کند.</p>' +
      '<div class="flex-between" style="flex-wrap:wrap;gap:8px;">' +
        '<span class="badge ' + (hasPin ? 'badge-success' : 'badge-muted') + '">' + (hasPin ? '🔒 قفل فعال است' : '🔓 بدون قفل ورود') + '</span>' +
        '<div class="flex-wrap">' +
          (hasPin ? '<button type="button" class="btn btn-sm btn-outline" onclick="App.lockNow()">🔒 قفل فوری</button>' : '') +
          '<button type="button" class="btn btn-sm btn-soft" onclick="ToolModules.openPinSetupModal()">' + (hasPin ? 'تغییر رمز ۴ رقمی' : '+ تعیین رمز ۴ رقمی') + '</button>' +
          (hasPin ? '<button type="button" class="btn btn-sm btn-danger" onclick="ToolModules.disablePinLock()">حذف قفل</button>' : '') +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h3 class="card-title mb-2">👤 مشخصات دبیر / آموزگار و آموزشگاه (درج در کارنامه)</h3>' +
      '<form onsubmit="ToolModules.saveSettingsForm(event)">' +
        '<div class="form-group"><label class="form-label">نام دبیر / آموزگار</label>' +
          '<input id="f_set_tname" class="form-control" placeholder="مثلاً: استاد محمدی" value="' + esc(s.teacherName || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">نام مدرسه یا آموزشگاه</label>' +
          '<input id="f_set_sname" class="form-control" placeholder="مثلاً: دبیرستان البرز" value="' + esc(s.schoolName || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">سال تحصیلی</label>' +
          '<input id="f_set_year" class="form-control" value="' + esc(s.academicYear || '۱۴۰۵-۱۴۰۶') + '"></div>' +
        '<button type="submit" class="btn btn-primary btn-block">ذخیره مشخصات ✓</button>' +
      '</form>' +
    '</div>' +

    '<div class="card">' +
      '<h3 class="card-title mb-2">💾 پشتیبان‌گیری و انتقال اطلاعات (۱۰۰٪ آفلاین)</h3>' +
      '<p class="text-muted text-sm" style="margin-top:0;">فایل پشتیبان بگیرید و روی گوشی جدید بازیابی کنید. پشتیبان شامل نام، شمارهٔ اولیا، نمره‌ها و عکس‌هاست؛ با گزینهٔ «قفل با رمز» به‌صورت AES-256 رمزگذاری می‌شود و بدون رمز شما باز نمی‌شود.</p>' +
      '<div class="flex-wrap" style="gap:8px;">' +
        '<button class="btn btn-primary" style="flex:1;" onclick="ToolModules.exportBackupFlow()">📥 ذخیره فایل پشتیبان</button>' +
        '<button class="btn btn-soft" style="flex:1;" onclick="ToolModules.triggerRestoreBackup()">📤 بازیابی از فایل</button>' +
      '</div>' +
      '<div class="text-muted text-sm mt-2">' + (function () {
        const last = s.lastBackupAt ? ymdToJalaliHuman(new Date(s.lastBackupAt).toISOString().slice(0, 10)) : '';
        const auto = global.Store.getAutoBackupInfo();
        let line = s.lastBackupAt ? ('آخرین پشتیبان دستی: <b>' + esc(last) + '</b>') : 'هنوز پشتیبان دستی نگرفته‌اید.';
        if (auto) line += ' • نسخهٔ خودکار: <b>' + esc(ymdToJalaliHuman(auto.day)) + '</b>' + (auto.photosOmitted ? ' (بدون عکس)' : '');
        return line;
      })() + '</div>' +
      '<div class="flex-between" style="border-top:1px solid var(--border);padding-top:10px;margin-top:10px;gap:8px;flex-wrap:wrap;">' +
        '<div><b>🔒 قفل فایل پشتیبان با رمز</b>' +
          '<div class="text-muted text-sm">' + (global.Store.getBackupMode() === 'encrypted'
            ? 'روشن است: فایل با رمز شما رمزگذاری می‌شود (AES-256-GCM) و بدون رمز باز نمی‌شود.'
            : 'خاموش است: فایل به‌صورت متن ساده ذخیره می‌شود؛ هر کسی آن را بخواند نام و شمارهٔ اولیا را می‌بیند.') +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-sm ' + (global.Store.getBackupMode() === 'encrypted' ? 'btn-soft' : 'btn-outline') + '" onclick="ToolModules.toggleBackupMode()">' +
          (global.Store.getBackupMode() === 'encrypted' ? 'خاموش کن' : 'روشن کن') +
        '</button>' +
      '</div>' +
      '<input id="hidden_backup_file" type="file" accept=".json,application/json,.dsy" style="display:none;" onchange="ToolModules.onWebBackupFileChosen(event)">' +
      ((function () {
        const auto = global.Store.getAutoBackupInfo();
        if (!auto) return '';
        return '<div class="flex-between" style="border-top:1px solid var(--border);padding-top:10px;margin-top:10px;gap:8px;flex-wrap:wrap;">' +
          '<div><b>♻️ نسخهٔ خودکار روزانه</b>' +
            '<div class="text-muted text-sm">' + esc(ymdToJalaliHuman(auto.day)) +
            ' • ' + esc(global.Jalali.toFa(auto.classes)) + ' کلاس، ' + esc(global.Jalali.toFa(auto.students)) + ' دانش‌آموز' +
            (auto.photosOmitted ? ' • بدون عکس (کمبود فضا)' : '') + '</div>' +
          '</div>' +
          '<button type="button" class="btn btn-sm btn-outline" onclick="ToolModules.restoreAutoBackupFlow()">بازیابی این نسخه</button>' +
        '</div>';
      })()) +
      '<div class="flex-between" style="border-top:1px solid var(--border);padding-top:10px;margin-top:10px;gap:8px;flex-wrap:wrap;">' +
        '<div><b>🖼️ عکس دانش‌آموزان در فایل پشتیبان</b>' +
          '<div class="text-muted text-sm">' + (s.backupIncludePhotos === false
            ? 'خاموش است: پشتیبان سبک‌تر است ولی عکس‌ها منتقل نمی‌شوند.'
            : 'روشن است: عکس‌ها همراه پشتیبان منتقل می‌شوند (حجم بیشتر).') +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-sm ' + (s.backupIncludePhotos === false ? 'btn-outline' : 'btn-soft') + '" onclick="ToolModules.toggleBackupPhotos()">' +
          (s.backupIncludePhotos === false ? 'روشن کن' : 'خاموش کن') +
        '</button>' +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h3 class="card-title mb-2">🧪 مدیریت داده‌ها</h3>' +
      '<div class="flex-wrap" style="gap:8px;">' +
        '<button class="btn btn-outline btn-sm" onclick="CoreModules.loadDemoNow()">بارگذاری داده‌های نمونه (عددی + توصیفی)</button>' +
        '<button class="btn btn-danger btn-sm" onclick="ToolModules.confirmWipeAll()">حذف کامل تمام اطلاعات</button>' +
      '</div>' +
      '<div class="text-muted text-sm mt-3">درس‌یار نسخه ۲.۴.۰ • ۱۰۰٪ آفلاین و بدون تبلیغات</div>' +
    '</div>';
  }

  function openPinSetupModal() {
    const html = '<form onsubmit="ToolModules.savePinSetup(event)">' +
      '<div class="form-group"><label class="form-label">رمز ۴ رقمی جدید را وارد کنید:</label>' +
        '<input id="f_new_pin" type="tel" inputmode="numeric" maxlength="4" dir="ltr" style="text-align:center;font-size:22px;font-weight:900;letter-spacing:8px;" class="form-control" required placeholder="••••"></div>' +
      '<button type="submit" class="btn btn-primary btn-block">فعال‌سازی قفل ۴ رقمی ✓</button>' +
    '</form>';
    global.App.openModal('تنظیم قفل امنیتی برنامه', html);
  }

  function savePinSetup(ev) {
    ev.preventDefault();
    const raw = global.Jalali.toEn((document.getElementById('f_new_pin').value || '').trim());
    if (!/^\d{4}$/.test(raw)) {
      global.App.toast('لطفاً دقیقاً ۴ رقم عددی وارد کنید!');
      return;
    }
    global.Store.getDb().settings.pinCode = raw;
    global.Store.save();
    if (global.App.markPinUnlocked) global.App.markPinUnlocked();
    global.App.closeModal();
    global.App.render();
    global.App.toast('قفل امنیتی ۴ رقمی فعال شد 🔒');
  }

  function disablePinLock() {
    global.Store.getDb().settings.pinCode = '';
    global.Store.save();
    if (global.App.markPinUnlocked) global.App.markPinUnlocked();
    global.App.render();
    global.App.toast('قفل امنیتی غیرفعال شد 🔓');
  }

  // ---------- ابزار ۱۰: شناسنامه علمی و ارتباط با سازنده ----------
  function renderAboutTool() {
    const cfuSvg = global.AppIcons ? global.AppIcons.farhangianLogo(68) : '';
    return '' +
      '<div class="academic-cert-card">' +
        '<div class="cfu-emblem-box">' + cfuSvg + '</div>' +
        '<h2 style="margin:4px 0 2px 0;font-size:21px;font-weight:900;color:var(--primary-dark);">درس‌یار (نسخه ۲.۴.۰)</h2>' +
        '<div style="font-size:13.5px;font-weight:800;color:var(--text);">دانشگاه فرهنگیان • پردیس شهید بهشتی مشهد</div>' +
        '<div class="text-muted text-sm" style="margin-top:2px;">سامانه آفلاین مدیریت کلاس، ارزشیابی عددی/توصیفی و جعبه ابزار معلم</div>' +
        '<div class="text-muted text-sm" style="margin-top:6px;">درس: کاربرد رسانه و فناوری اطلاعات در آموزش زبان انگلیسی</div>' +

        '<div class="roles-grid">' +
          '<div class="role-tile">' +
            '<div class="role-lbl">استاد راهنما و ناظر علمی:</div>' +
            '<div class="role-val">دکتر احمدرضا اقتصادی رودی</div>' +
            '<div class="role-desc">عضو هیئت علمی دانشگاه فرهنگیان</div>' +
          '</div>' +
          '<div class="role-tile">' +
            '<div class="role-lbl">طراح و برنامه‌نویس:</div>' +
            '<div class="role-val">علیرضا تقی‌زاده</div>' +
            '<div class="role-desc">دانشجوی دانشگاه فرهنگیان شهید بهشتی مشهد</div>' +
          '</div>' +
        '</div>' +

        '<div style="text-align:right;background:var(--surface-2);border:1px solid var(--border);border-radius:14px;padding:12px;font-size:12.5px;line-height:1.75;">' +
          '<div><b>امکانات کلیدی نسخه ۲.۴.۰:</b> <b>پشتیبان رمزدار AES-256 + یادآور و نسخهٔ خودکار روزانه</b>، <b>عکس دانش‌آموز با گالری دستگاه (در فهرست، پرونده، حضور و غیاب، کارنامه، رتبه‌بندی و کارت شهریه) + گزینهٔ پشتیبان بدون عکس برای فایل سبک‌تر</b>، پشتیبانی هم‌زمان از ارزشیابی عددی (۰ تا ۲۰) و کیفی-توصیفی ۴ سطحی ابتدایی، <b>نظام امتیاز و القاب افتخاری با ثبت سریع و گروهی، سکوی رتبه‌بندی و گزارش امتیاز برای اولیا</b>، گردونه شانس گرافیکی، تخته سفید هوشمند سرِ کلاس، حضوروغیاب شمسی، چیدمان صندلی، قفل ورود و خروجی CSV و چاپ/PDF با سرویس دستگاه.</div>' +
        '</div>' +
      '</div>' +

      '<div class="card">' +
        '<h3 class="card-title mb-2">ارتباط با سازنده</h3>' +
        '<p>پذیرای انتقادات و پیشنهادات شما هستیم.</p>' +
        '<div class="list-row" style="background:var(--surface-2);">' +
          '<div><span class="text-muted text-sm">شناسه ارتباطی</span><div dir="ltr" style="font-weight:900;font-size:18px;text-align:right;">@TeachSpot</div></div>' +
          '<button type="button" class="btn btn-sm btn-outline" onclick="Store.copyText(\'@TeachSpot\')">📋 کپی شناسه</button>' +
        '</div>' +
        '<p class="text-muted text-sm">شناسه را کپی کنید و در پیام‌رسان خود پیام بفرستید.</p>' +
      '</div>' +
      '<div class="card">' +
        '<h3 class="card-title mb-2">نوشتن پیشنهاد</h3>' +
        '<textarea id="f_dev_feedback" rows="3" class="form-control" placeholder="دیدگاه یا پیشنهاد خود را بنویسید..."></textarea>' +
        '<button type="button" class="btn btn-outline mt-3" onclick="ToolModules.shareFeedbackMsg()">📤 اشتراک متن در پیام‌رسان‌ها</button>' +
      '</div>' +

      '<div class="card" style="text-align:center;">' +
        '<div style="font-weight:900;font-size:13px;">نگارش رسمی: نسخه 2.4.0 • پاییز ۱۴۰۵ • ۱۰۰٪ آفلاین و بدون تبلیغات</div>' +
      '</div>';
  }

  function shareFeedbackMsg() {
    const el = document.getElementById('f_dev_feedback');
    const txt = el && el.value.trim() ? el.value.trim() : 'سلام آقای تقی‌زاده، درباره اپلیکیشن درس‌یار پیشنهادی داشتم:';
    global.Store.shareText('بازخورد برنامه درس‌یار', txt);
  }

  function saveSettingsForm(ev) {
    ev.preventDefault();
    const s = global.Store.getDb().settings;
    s.teacherName = document.getElementById('f_set_tname').value.trim();
    s.schoolName = document.getElementById('f_set_sname').value.trim();
    s.academicYear = document.getElementById('f_set_year').value.trim() || '۱۴۰۵-۱۴۰۶';
    global.Store.save();
    global.App.render();
    global.App.toast('تنظیمات ذخیره شد ✓');
  }

  function toggleBackupMode() {
    const next = global.Store.getBackupMode() === 'encrypted' ? 'plain' : 'encrypted';
    global.Store.setBackupMode(next);
    global.App.render();
    global.App.toast(next === 'encrypted' ? 'پشتیبان بعدی با رمز قفل می‌شود 🔒' : 'پشتیبان بعدی بدون رمز ساخته می‌شود');
  }

  function exportBackupFlow() {
    if (global.Store.getBackupMode() !== 'encrypted') { global.Store.exportBackupJson(null); return; }
    if (!global.Store.cryptoAvailable()) {
      global.App.confirmDialog('این دستگاه رمزگذاری مرورگر را پشتیبانی نمی‌کند. پشتیبان بدون رمز گرفته شود؟', function () {
        global.Store.exportBackupJson(null);
      });
      return;
    }
    const html = '<form onsubmit="ToolModules.submitExportPassword(event)">' +
      '<p class="text-muted text-sm" style="margin-top:0;">یک رمز (حداقل ۴ نویسه) برای قفل فایل پشتیبان انتخاب کنید. اگر این رمز را فراموش کنید، فایل قابل بازیابی نیست.</p>' +
      '<div class="form-group"><label class="form-label">رمز فایل پشتیبان</label>' +
        '<input id="f_bk_pwd" type="password" class="form-control" dir="ltr" required minlength="4" autocomplete="new-password"></div>' +
      '<div class="form-group"><label class="form-label">تکرار رمز</label>' +
        '<input id="f_bk_pwd2" type="password" class="form-control" dir="ltr" required minlength="4" autocomplete="new-password"></div>' +
      '<button type="submit" class="btn btn-primary btn-block">🔒 ساخت فایل پشتیبان رمزدار</button>' +
    '</form>';
    global.App.openModal('قفل فایل پشتیبان با رمز', html);
  }

  function submitExportPassword(ev) {
    ev.preventDefault();
    const p1 = document.getElementById('f_bk_pwd').value;
    const p2 = document.getElementById('f_bk_pwd2').value;
    if (p1 !== p2) { global.App.toast('دو رمز یکسان نیستند'); return; }
    if (p1.length < 4) { global.App.toast('رمز حداقل ۴ نویسه باشد'); return; }
    global.App.closeModal();
    Promise.resolve(global.Store.exportBackupJson(p1)).then(function (res) {
      if (res && res.ok) {
        global.App.toast('فایل پشتیبان رمزدار ساخته شد 🔒');
        global.App.render();
      } else if (res && res.reason === 'no-crypto') {
        global.App.toast('رمزگذاری در این دستگاه ممکن نیست');
      } else {
        global.App.toast('ساخت پشتیبان ناموفق بود');
      }
    }).catch(function () { global.App.toast('ساخت پشتیبان ناموفق بود'); });
  }

  function askRestorePassword(text) {
    const html = '<form onsubmit="ToolModules.submitRestorePassword(event)">' +
      '<p class="text-muted text-sm" style="margin-top:0;">این فایل پشتیبان رمزدار است. رمزی که هنگام ساخت فایل گذاشته‌اید را وارد کنید.</p>' +
      '<div class="form-group"><label class="form-label">رمز فایل پشتیبان</label>' +
        '<input id="f_bk_restore_pwd" type="password" class="form-control" dir="ltr" required autocomplete="current-password"></div>' +
      '<button type="submit" class="btn btn-primary btn-block">🔓 باز کردن و بازیابی</button>' +
    '</form>';
    pendingRestoreText = text;
    global.App.openModal('بازیابی پشتیبان رمزدار', html);
  }

  function submitRestorePassword(ev) {
    ev.preventDefault();
    const pwd = document.getElementById('f_bk_restore_pwd').value;
    const text = pendingRestoreText;
    global.App.closeModal();
    if (!text) return;
    global.App.confirmDialog('بازیابی پشتیبان، همه اطلاعات فعلی را با اطلاعات فایل جایگزین می‌کند. ادامه می‌دهید؟', function () {
      Promise.resolve(global.Store.importBackupText(text, pwd)).then(function (res) {
        pendingRestoreText = '';
        if (res && res.ok) return; // پیام موفقیت در همان تابع بازیابی داده می‌شود
        global.App.toast(res && res.reason === 'bad-password' ? 'رمز درست نیست یا فایل آسیب دیده است' : 'بازیابی ناموفق بود');
      });
    });
  }

  function restoreAutoBackupFlow() {
    const auto = global.Store.getAutoBackupInfo();
    if (!auto) { global.App.toast('نسخهٔ خودکاری وجود ندارد'); return; }
    global.App.confirmDialog('اطلاعات فعلی با نسخهٔ خودکار روز ' + ymdToJalaliHuman(auto.day) + ' جایگزین می‌شود. ادامه می‌دهید؟', function () {
      const ok = global.Store.restoreAutoBackup();
      global.App.toast(ok ? 'نسخهٔ خودکار بازیابی شد ✓' : 'بازیابی نسخهٔ خودکار ناموفق بود');
    });
  }

  function dismissBackupReminder() {
    global.Store.dismissBackupReminder();
    global.App.render();
  }

  function toggleBackupPhotos() {
    const next = global.Store.getDb().settings.backupIncludePhotos === false;
    global.Store.setBackupIncludePhotos(next);
    global.App.render();
    global.App.toast(next ? 'عکس‌ها در پشتیبان گنجانده می‌شوند ✓' : 'پشتیبان بعدی بدون عکس ساخته می‌شود ✓');
  }

  function triggerRestoreBackup() {
    global.App.confirmDialog('بازیابی پشتیبان، همه اطلاعات فعلی را با اطلاعات فایل جایگزین می‌کند. پیش از ادامه از اطلاعات فعلی نسخه پشتیبان بگیرید. ادامه می‌دهید؟', function () {
      if (global.Store.hasNativeBridge() && typeof global.AndroidBridge.importBackupJson === 'function') {
        global.AndroidBridge.importBackupJson();
        return;
      }
      const inp = document.getElementById('hidden_backup_file');
      if (inp) { inp.value = ''; inp.click(); }
    });
  }

  function onWebBackupFileChosen(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = String(e.target.result || '');
      if (global.Store.isEncryptedBackup(text)) askRestorePassword(text);
      else global.Store.importBackupFromString(text);
    };
    reader.readAsText(file, 'utf-8');
  }

  function confirmWipeAll() {
    global.App.confirmDialog('هشدار: تمام کلاس‌ها، دانش‌آموزان، نمرات و سوابق پاک خواهند شد. ادامه می‌دهید؟', function () {
      global.Store.clearAllData();
      global.App.render();
      global.App.toast('تمام اطلاعات پاک شد');
    });
  }

  global.ToolModules = {
    renderPlan: renderPlan,
    setPlanTab: function (t) { tState.planTab = t; global.App.render(); },
    openTimetableModal: openTimetableModal,
    saveTimetableForm: saveTimetableForm,
    deleteTimetable: deleteTimetable,
    openHomeworkModal: openHomeworkModal,
    saveHomeworkForm: saveHomeworkForm,
    openHwCheckModal: openHwCheckModal,
    setHwStatus: setHwStatus,
    deleteHomework: deleteHomework,
    openLessonModal: openLessonModal,
    saveLessonForm: saveLessonForm,
    deleteLesson: deleteLesson,
    stepCalMonth: function (d) {
      ensureCalInit();
      let m = tState.calMonth + d;
      if (m < 1) { m = 12; tState.calYear--; }
      if (m > 12) { m = 1; tState.calYear++; }
      tState.calMonth = m;
      global.App.render();
    },
    selectCalDay: function (dStr) { tState.calSelectedDate = dStr; global.App.render(); },
    openEventModal: openEventModal,
    saveEventForm: saveEventForm,
    deleteEvent: deleteEvent,
    renderToolsHub: renderToolsHub,
    renderPickerTool: renderPickerTool,
    spinPicker: spinPicker,
    togglePickerOpt: function (which, val) {
      if (which === 'norepeat') tState.pickerNoRepeat = val;
      else tState.pickerOnlyPresent = val;
      tState.pickerPool = [];
      global.App.render();
    },
    resetPickerPool: function () { tState.pickerPool = []; tState.pickerCurrentId = ''; global.App.render(); global.App.toast('دور جدید قرعه‌کشی آماده شد'); },
    renderGroupsTool: renderGroupsTool,
    setGroupOpt: function (k, v) {
      if (k === 'mode') tState.groupMode = v;
      if (k === 'val') tState.groupVal = v;
      if (k === 'balanced') tState.groupBalanced = v;
      global.App.render();
    },
    generateGroups: generateGroups,
    shareGroups: shareGroups,
    renderSeatingTool: renderSeatingTool,
    tapSeat: tapSeat,
    assignSeat: assignSeat,
    resizeSeating: function (r, c) {
      const cls = global.Store.getActiveClass();
      if (!cls) return;
      const cfg = global.Store.getDb().seating[cls.id];
      if (r) cfg.rows = parseInt(r, 10);
      if (c) cfg.cols = parseInt(c, 10);
      global.Store.save();
      global.App.render();
    },
    autoSeatRandom: autoSeatRandom,
    clearSeats: function () {
      const cls = global.Store.getActiveClass();
      if (!cls) return;
      global.App.confirmDialog('چیدمان فعلی صندلی‌های این کلاس پاک شود؟', function () {
        global.Store.getDb().seating[cls.id].seats = {};
        global.Store.save();
        global.App.render();
      });
    },
    printSeating: printSeating,
    renderTimerTool: renderTimerTool,
    setTimerMode: function (m) { tState.timerMode = m; global.App.render(); },
    toggleTimerRun: function () {
      syncTimerClocks();
      if (tState.timerMode === 'countdown') {
        if (tState.timerRunning) {
          tState.timerRunning = false;
        } else {
          if (tState.timerRemSec <= 0) tState.timerRemSec = tState.timerTotalSec;
          tState.timerDeadlineMs = Date.now() + tState.timerRemSec * 1000;
          tState.timerRunning = true;
        }
      } else if (tState.swRunning) {
        tState.swRunning = false;
      } else {
        tState.swBaseSec = tState.swElapsedSec;
        tState.swStartMs = Date.now();
        tState.swRunning = true;
      }
      ensureTimerLoop();
      global.App.render();
    },
    resetTimer: function () {
      if (tState.timerMode === 'countdown') {
        tState.timerRunning = false;
        tState.timerRemSec = tState.timerTotalSec;
      } else {
        tState.swRunning = false;
        tState.swElapsedSec = 0;
        tState.swLaps = [];
      }
      ensureTimerLoop();
      global.App.render();
    },
    recordLap: function () {
      syncTimerClocks();
      const mm = Math.floor(tState.swElapsedSec / 60);
      const ss = tState.swElapsedSec % 60;
      const str = global.Jalali.toFa((mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss));
      tState.swLaps.push(str);
      global.Store.vibrate(20);
      global.App.render();
    },
    setPresetMin: function (m) {
      tState.timerRunning = false;
      tState.timerTotalSec = m * 60;
      tState.timerRemSec = m * 60;
      ensureTimerLoop();
      global.App.render();
    },
    applyCustomTimerMin: function () {
      const inp = document.getElementById('f_custom_timer_min');
      const m = inp ? Math.round(global.Jalali.parseNum(inp.value, 0)) : 0;
      if (m < 1 || m > 300) {
        global.App.toast('عددی بین ۱ تا ۳۰۰ دقیقه وارد کنید');
        return;
      }
      tState.timerRunning = false;
      tState.timerTotalSec = m * 60;
      tState.timerRemSec = m * 60;
      ensureTimerLoop();
      global.App.render();
      global.App.toast('تایمر روی ' + global.Jalali.toFa(m) + ' دقیقه تنظیم شد ✓');
    },
    resetClassState: function () {
      tState.pickerPool = [];
      tState.pickerCurrentId = '';
      tState.generatedGroups = [];
      tState.selectedSeatKey = '';
      tState.msgStudentId = '';
      if (global.LiveClassroom && global.LiveClassroom.resetWheelClass) {
        global.LiveClassroom.resetWheelClass();
      }
    },
    renderPointsTool: renderPointsTool,
    quickAddPoint: quickAddPoint,
    openBatchPointsModal: openBatchPointsModal,
    batchStep: batchStep,
    batchAll: batchAll,
    batchResetInModal: batchResetInModal,
    batchSetLabel: batchSetLabel,
    saveBatchPoints: saveBatchPoints,
    openPointsReportModal: openPointsReportModal,
    copyPointsReport: copyPointsReport,
    sharePointsReport: sharePointsReport,
    savePointsReportFile: savePointsReportFile,
    openStudentPointsMessage: openStudentPointsMessage,
    copyStudentPointsMessage: copyStudentPointsMessage,
    shareStudentPointsMessage: shareStudentPointsMessage,
    smsStudentPointsMessage: smsStudentPointsMessage,
    openPointTitlesModal: openPointTitlesModal,
    confirmResetPoints: confirmResetPoints,
    renderBehaviorTool: renderBehaviorTool,
    openBehaviorModal: openBehaviorModal,
    saveBehaviorForm: saveBehaviorForm,
    deleteBehavior: deleteBehavior,
    renderFeesAndSessionsTool: renderFeesAndSessionsTool,
    setTutorTab: function (t) { tState.tutorTab = t; global.App.render(); },
    toggleDebtors: function (v) { tState.feeOnlyDebtors = v; global.App.render(); },
    openFeeModal: openFeeModal,
    saveFeeForm: saveFeeForm,
    settleFee: settleFee,
    shareFeeReceipt: shareFeeReceipt,
    deleteFee: deleteFee,
    exportFeesCsv: exportFeesCsv,
    openSessionModal: openSessionModal,
    saveSessionForm: saveSessionForm,
    deleteSession: deleteSession,
    renderMessagesTool: renderMessagesTool,
    changeMsgStudent: function (sid) { tState.msgStudentId = sid; rebuildMsgTemplate(); global.App.render(); },
    changeMsgTpl: function (k) { tState.msgTemplateKey = k; rebuildMsgTemplate(); global.App.render(); },
    editMsgBody: function (v) { tState.msgText = v; },
    sendCurrentSms: function () {
      const stu = global.Store.getStudentById(tState.msgStudentId);
      global.Store.sendSms(stu ? stu.parentPhone : '', tState.msgText);
    },
    shareCurrentMsg: function () {
      global.Store.shareText('پیام به ولی دانش‌آموز', tState.msgText);
    },
    renderChartsTool: renderChartsTool,
    renderSettingsTool: renderSettingsTool,
    openPinSetupModal: openPinSetupModal,
    savePinSetup: savePinSetup,
    disablePinLock: disablePinLock,
    renderAboutTool: renderAboutTool,
    shareFeedbackMsg: shareFeedbackMsg,
    saveSettingsForm: saveSettingsForm,
    triggerRestoreBackup: triggerRestoreBackup,
    toggleBackupPhotos: toggleBackupPhotos,
    toggleBackupMode: toggleBackupMode,
    exportBackupFlow: exportBackupFlow,
    submitExportPassword: submitExportPassword,
    askRestorePassword: askRestorePassword,
    submitRestorePassword: submitRestorePassword,
    restoreAutoBackupFlow: restoreAutoBackupFlow,
    dismissBackupReminder: dismissBackupReminder,
    onWebBackupFileChosen: onWebBackupFileChosen,
    confirmWipeAll: confirmWipeAll
  };
})(typeof window !== 'undefined' ? window : globalThis);
