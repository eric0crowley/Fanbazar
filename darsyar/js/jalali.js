// موتور دقیق تقویم هجری شمسی (جلالی) + ابزارهای اعداد فارسی - ۱۰۰٪ آفلاین
(function (global) {
  'use strict';

  const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  const JALALI_MONTHS = [
    'فروردین', 'اردیبهشت', 'خرداد',
    'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر',
    'دی', 'بهمن', 'اسفند'
  ];

  // در تقویم ایرانی هفته از شنبه (index 0) تا جمعه (index 6) است
  const JALALI_WEEKDAYS = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];
  const JALALI_WEEKDAYS_SHORT = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const BREAKS = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
    1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
  ];

  function div(a, b) {
    return ~~(a / b);
  }

  function mod(a, b) {
    return a - ~~(a / b) * b;
  }

  function jalCal(jy) {
    const bl = BREAKS.length;
    const gy = jy + 621;
    let leapJ = -14;
    let jp = BREAKS[0];
    let jm, jump, leap, leapG, march, n, i;

    if (jy < jp || jy >= BREAKS[bl - 1]) {
      throw new Error('سال شمسی خارج از محدوده مجاز: ' + jy);
    }

    for (i = 1; i < bl; i += 1) {
      jm = BREAKS[i];
      jump = jm - jp;
      if (jy < jm) break;
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
      leapJ += 1;
    }
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
    march = 20 + leapJ - leapG;

    if (jump - n < 6) {
      n = n - jump + div(jump + 4, 33) * 33;
    }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;

    return { leap: leap, gy: gy, march: march };
  }

  function g2d(gy, gm, gd) {
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
      + div(153 * mod(gm + 9, 12) + 2, 5)
      + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }

  function d2g(jdn) {
    let j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gd = div(mod(i, 153), 5) + 1;
    const gm = mod(div(i, 153), 12) + 1;
    const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy, gm: gm, gd: gd };
  }

  function j2d(jy, jm, jd) {
    const r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
  }

  function d2j(jdn) {
    const gy = d2g(jdn).gy;
    let jy = gy - 621;
    const r = jalCal(jy);
    const jdn1f = g2d(gy, 3, r.march);
    let jd, jm, k;

    k = jdn - jdn1f;
    if (k >= 0) {
      if (k <= 185) {
        jm = 1 + div(k, 31);
        jd = mod(k, 31) + 1;
        return { jy: jy, jm: jm, jd: jd };
      } else {
        k -= 186;
      }
    } else {
      jy -= 1;
      k += 179;
      if (r.leap === 1) k += 1;
    }
    jm = 7 + div(k, 30);
    jd = mod(k, 30) + 1;
    return { jy: jy, jm: jm, jd: jd };
  }

  function gregorianToJalali(gy, gm, gd) {
    return d2j(g2d(gy, gm, gd));
  }

  function jalaliToGregorian(jy, jm, jd) {
    return d2g(j2d(jy, jm, jd));
  }

  function isLeapJalaliYear(jy) {
    return jalCal(jy).leap === 0;
  }

  function jalaliMonthLength(jy, jm) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    return isLeapJalaliYear(jy) ? 30 : 29;
  }

  function pad2(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function formatJalaliStr(jy, jm, jd) {
    return jy + '/' + pad2(jm) + '/' + pad2(jd);
  }

  function parseJalaliStr(str) {
    if (!str || typeof str !== 'string') return getTodayObj();
    const clean = toEnDigits(str).trim().replace(/-/g, '/');
    const parts = clean.split('/').map(function (part) { return part.trim(); });
    if (parts.length !== 3) return getTodayObj();
    const jy = parseInt(parts[0], 10);
    const jm = parseInt(parts[1], 10);
    const jd = parseInt(parts[2], 10);
    if (!parts.every(function (part) { return /^\d+$/.test(part); }) ||
        !jy || !jm || !jd || jy < BREAKS[0] || jy >= BREAKS[BREAKS.length - 1] ||
        jm < 1 || jm > 12 || jd < 1 || jd > jalaliMonthLength(jy, jm)) return getTodayObj();
    return { jy: jy, jm: jm, jd: jd };
  }

  function getTodayObj() {
    const now = new Date();
    return gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  function getTodayStr() {
    const t = getTodayObj();
    return formatJalaliStr(t.jy, t.jm, t.jd);
  }

  // index 0 = شنبه ... 6 = جمعه
  function getJalaliWeekdayIndex(jy, jm, jd) {
    const g = jalaliToGregorian(jy, jm, jd);
    const jsDay = new Date(g.gy, g.gm - 1, g.gd).getDay(); // 0=Sun..6=Sat
    return (jsDay + 1) % 7;
  }

  function getWeekdayFromStr(jStr) {
    const p = parseJalaliStr(jStr);
    const idx = getJalaliWeekdayIndex(p.jy, p.jm, p.jd);
    return { index: idx, name: JALALI_WEEKDAYS[idx] };
  }

  function formatJalaliHuman(jStr, includeWeekday) {
    if (!jStr) return '';
    const p = parseJalaliStr(jStr);
    const monthName = JALALI_MONTHS[p.jm - 1] || '';
    const base = toFaDigits(p.jd) + ' ' + monthName + ' ' + toFaDigits(p.jy);
    if (includeWeekday) {
      const idx = getJalaliWeekdayIndex(p.jy, p.jm, p.jd);
      return JALALI_WEEKDAYS[idx] + '، ' + base;
    }
    return base;
  }

  function addJalaliDays(jStr, deltaDays) {
    const p = parseJalaliStr(jStr);
    const jdn = j2d(p.jy, p.jm, p.jd) + deltaDays;
    const res = d2j(jdn);
    return formatJalaliStr(res.jy, res.jm, res.jd);
  }

  // رقم فارسی + ممیز فارسی (٫) برای نمایش اعداد اعشاری
  function faNum(val) {
    const s = toFaDigits(val);
    return String(s).replace(/\./g, '٫');
  }

  function toFaDigits(val) {
    if (val === null || val === undefined) return '';
    return String(val).replace(/\d/g, function (d) {
      return FA_DIGITS[parseInt(d, 10)];
    });
  }

  function toEnDigits(val) {
    if (val === null || val === undefined) return '';
    let s = String(val);
    for (let i = 0; i < 10; i++) {
      s = s.replace(new RegExp(FA_DIGITS[i], 'g'), String(i))
           .replace(new RegExp(AR_DIGITS[i], 'g'), String(i));
    }
    return s;
  }

  function parseNum(val, fallback) {
    if (fallback === undefined) fallback = 0;
    let clean = toEnDigits(val).trim();
    // پشتیبانی از ممیز فارسی (۱۹٫۵ یا ۱۹/۵) و حذف جداکننده هزارگان (۱٬۵۰۰٬۰۰۰)
    clean = clean.replace(/٬/g, '');
    if (/^[+-]?\d+[\/٫]\d+$/.test(clean)) {
      clean = clean.replace(/[\/٫]/, '.');
    } else {
      clean = clean.replace(/٫/g, '.').replace(/,/g, '');
    }
    // parseFloat silently accepted e.g. 19abc as 19 and Infinity as a grade.
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(clean)) return fallback;
    const n = Number(clean);
    return Number.isFinite(n) ? n : fallback;
  }

  function formatMoney(amount) {
    const n = Math.round(Number(amount) || 0);
    const formatted = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
    return (n < 0 ? '-' : '') + toFaDigits(formatted);
  }

  // پنجره انتخابگر تاریخ شمسی سفارشی
  let pickerState = { jy: 1405, jm: 1, selectedStr: '', onSelect: null };

  function openDatePicker(initialStr, onSelectCallback) {
    const init = parseJalaliStr(initialStr || getTodayStr());
    pickerState = {
      jy: init.jy,
      jm: init.jm,
      selectedStr: formatJalaliStr(init.jy, init.jm, init.jd),
      onSelect: onSelectCallback
    };
    renderDatePickerSheet();
  }

  function renderDatePickerSheet() {
    const todayStr = getTodayStr();
    const daysCount = jalaliMonthLength(pickerState.jy, pickerState.jm);
    const firstWeekday = getJalaliWeekdayIndex(pickerState.jy, pickerState.jm, 1);

    let cells = '';
    for (let e = 0; e < firstWeekday; e++) {
      cells += '<div></div>';
    }
    for (let d = 1; d <= daysCount; d++) {
      const dStr = formatJalaliStr(pickerState.jy, pickerState.jm, d);
      const wIdx = (firstWeekday + d - 1) % 7;
      const cls = [
        'cal-day',
        dStr === todayStr ? 'today' : '',
        dStr === pickerState.selectedStr ? 'selected' : '',
        wIdx === 6 ? 'friday' : ''
      ].filter(Boolean).join(' ');
      cells += '<button type="button" class="' + cls + '" onclick="Jalali.__pickDay(\'' + dStr + '\')">' + toFaDigits(d) + '</button>';
    }

    const html = '' +
      '<div class="flex-between mb-2">' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="Jalali.__stepMonth(-1)">◀ ماه قبل</button>' +
        '<div style="text-align:center;">' +
          '<div style="font-weight:900;font-size:15px;">' + JALALI_MONTHS[pickerState.jm - 1] + ' ' + toFaDigits(pickerState.jy) + '</div>' +
          '<div class="flex-wrap" style="justify-content:center;margin-top:4px;">' +
            '<button type="button" class="badge badge-muted" onclick="Jalali.__stepYear(-1)">سال قبل</button>' +
            '<button type="button" class="badge badge-primary" onclick="Jalali.__goToday()">امروز</button>' +
            '<button type="button" class="badge badge-muted" onclick="Jalali.__stepYear(1)">سال بعد</button>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn btn-outline btn-sm" onclick="Jalali.__stepMonth(1)">ماه بعد ▶</button>' +
      '</div>' +
      '<div class="cal-weekdays">' +
        JALALI_WEEKDAYS_SHORT.map(function (w) { return '<div>' + w + '</div>'; }).join('') +
      '</div>' +
      '<div class="cal-days">' + cells + '</div>';

    if (global.App && global.App.openModal) {
      global.App.openModal('انتخاب تاریخ شمسی', html);
    }
  }

  function stepMonth(delta) {
    let m = pickerState.jm + delta;
    let y = pickerState.jy;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    pickerState.jm = m;
    pickerState.jy = y;
    renderDatePickerSheet();
  }

  function stepYear(delta) {
    pickerState.jy += delta;
    renderDatePickerSheet();
  }

  function goToday() {
    const t = getTodayObj();
    const s = formatJalaliStr(t.jy, t.jm, t.jd);
    pickDay(s);
  }

  function pickDay(dStr) {
    pickerState.selectedStr = dStr;
    if (global.App && global.App.closeModal) {
      global.App.closeModal();
    }
    if (typeof pickerState.onSelect === 'function') {
      pickerState.onSelect(dStr);
    }
  }

  global.Jalali = {
    MONTHS: JALALI_MONTHS,
    WEEKDAYS: JALALI_WEEKDAYS,
    WEEKDAYS_SHORT: JALALI_WEEKDAYS_SHORT,
    gregorianToJalali: gregorianToJalali,
    jalaliToGregorian: jalaliToGregorian,
    isLeapJalaliYear: isLeapJalaliYear,
    jalaliMonthLength: jalaliMonthLength,
    formatJalaliStr: formatJalaliStr,
    parseJalaliStr: parseJalaliStr,
    getTodayObj: getTodayObj,
    getTodayStr: getTodayStr,
    getJalaliWeekdayIndex: getJalaliWeekdayIndex,
    getWeekdayFromStr: getWeekdayFromStr,
    formatJalaliHuman: formatJalaliHuman,
    addJalaliDays: addJalaliDays,
    toFa: toFaDigits,
    faNum: faNum,
    toEn: toEnDigits,
    parseNum: parseNum,
    formatMoney: formatMoney,
    openDatePicker: openDatePicker,
    __stepMonth: stepMonth,
    __stepYear: stepYear,
    __goToday: goToday,
    __pickDay: pickDay
  };
})(typeof window !== 'undefined' ? window : globalThis);
