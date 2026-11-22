/* ==========================================================================
   FarhangGram v2.17.0 — Offline Storage, Jalali Date, Procedural SM-2 SRS +
   Personal Mistake Clinic, Academic Ranks, SFX & Dual-Accent Offline TTS
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ bidi
     One rule for every screen (v2.7.0):
       FGText.en(str)    → text that is 100% English (a sentence, an option)
       FGText.mixed(str) → Persian text that may contain English words: each
                           Latin run gets its own <bdi dir="ltr">, the Persian
                           around it stays RTL. Persian is never put inside an
                           LTR isolate (that was the v2.6.1 word-order bug). */
  var LATIN_RUN = /([\-'’]?[A-Za-z](?:[A-Za-z0-9'’.,?!+\-\/…_ →]*[A-Za-z0-9'’.?!…_])?)/;
  function escHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function enHtml(str) {
    return '<bdi dir="ltr" class="en">' + escHtml(str) + '</bdi>';
  }
  /* v2.14: a short English run keeps its quote marks / bracket / comma on the same line
     (an opening «» left alone at the end of a line was what made «What is your name?» hard to read) */
  var MX_GLUE = /([«(“]?)(<bdi dir="ltr" class="en mx">([^<]{1,20})<\/bdi>)([»)”،؛:!؟.]*)/g;
  var MX_SHORT = 20;          // a short phrase («What is your name?») is one unbreakable unit; longer ones may wrap
  /* Protect the complete punctuation pair, not just short English words. A
     Latin-only parenthesis/quote is one LTR isolate; a genuinely mixed group
     keeps an RTL base and isolates its English runs inside. Long groups wrap. */
  var MX_GROUP = /(\([^()]*\)|«[^«»]*»|“[^“”]*”)/g;
  function mixedClass(part) {
    return (part.length > MX_SHORT ? " mx-long" : "") +
      (/[A-Za-z][A-Za-z0-9.\/ -]*\s*\+\s*[A-Za-z]/.test(part) ? " mx-formula" : "") +
      ((part.match(/,/g) || []).length >= 2 || (part.match(/\s\/\s/g) || []).length >= 2 ? " mx-list" : "");
  }
  function mixedRuns(text) {
    var html = text.split(LATIN_RUN).map(function (part, i) {
      if (!(i % 2)) return escHtml(part);
      return '<bdi dir="ltr" class="en mx' + mixedClass(part) + '">' + escHtml(part) + '</bdi>';
    }).join('');
    return html.replace(MX_GLUE, function (m, open, run, inner, close) {
      return (open || close) ? '<span class="mxq">' + open + run + close + '</span>' : m;
    });
  }
  function mixedHtml(str) {
    return String(str == null ? '' : str).split(MX_GROUP).map(function (part, i) {
      if (!(i % 2)) return mixedRuns(part);
      if (!/[A-Za-z]/.test(part)) return escHtml(part);
      if (/[\u0600-\u06ff]/.test(part)) return '<bdi dir="rtl" class="mx-mixed">' + mixedRuns(part) + '</bdi>';
      var isolated = '<bdi dir="ltr" class="en mx' + mixedClass(part) + '">' + escHtml(part) + '</bdi>';
      /* Preserve the established one-line short-quote contract. Long pairs
         remain wrappable and the complete pair still belongs to one isolate. */
      return part.length <= MX_SHORT ? '<span class="mxq">' + isolated + '</span>' : isolated;
    }).join('');
  }
  window.FGText = { esc: escHtml, en: enHtml, mixed: mixedHtml };

  var STORAGE_KEY = 'farhanggram_state_v10';

  /* The Android host registers the bridge as `AndroidBridge` and exposes
     loadDatabase()/saveDatabase(). Older builds used `NativeBridge.loadJson`.
     Both are supported so the web layer keeps working in every host. */
  function getBridge() {
    return window.AndroidBridge || window.NativeBridge || null;
  }
  function bridgeLoad() {
    var b = getBridge();
    if (!b) return null;
    try {
      if (typeof b.loadDatabase === 'function') return b.loadDatabase();
      if (typeof b.loadJson === 'function') return b.loadJson();
    } catch (e) {}
    return null;
  }
  function bridgeSave(raw) {
    var b = getBridge();
    if (!b) return false;
    try {
      if (typeof b.saveDatabase === 'function') return b.saveDatabase(raw);
      if (typeof b.saveJson === 'function') return b.saveJson(raw);
    } catch (e) {}
    return false;
  }

  function gregorianToJalali(gy, gm, gd) {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days - 1) / 365);
      days = (days - 1) % 365;
    }
    var jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
  }

  var JALALI_MONTHS = [
    '', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  var WEEKDAYS_SHORT = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];

  function toFaDigits(val) {
    return String(val).replace(/\d/g, function (d) {
      return '۰۱۲۳۴۵۶۷۸۹'[Number(d)];
    });
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }   // ES5-safe (no padStart)

  function isoDayKey(dateObj) {
    var d = dateObj || new Date();
    var y = d.getFullYear();
    var m = pad2(d.getMonth() + 1);
    var day = pad2(d.getDate());
    return y + '-' + m + '-' + day;
  }

  function formatJalaliToday(dateObj) {
    var d = dateObj || new Date();
    var j = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return toFaDigits(j[2]) + ' ' + JALALI_MONTHS[j[1]] + ' ' + toFaDigits(j[0]);
  }

  function getLast7DaysMeta() {
    var out = [];
    var now = new Date();
    for (var i = 6; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      var j = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
      out.push({
        key: isoDayKey(d),
        wday: WEEKDAYS_SHORT[d.getDay()],
        jday: toFaDigits(j[2]),
        isToday: i === 0
      });
    }
    return out;
  }

  /* Friendly, non-academic level names (no jargon, no scare words). */
  function getAcademicRank(xp) {
    var x = xp || 0;
    if (x >= 1800) return { icon: '👑', titleFa: 'استاد جمله', nextXp: 3000 };
    if (x >= 750)  return { icon: '⭐', titleFa: 'سازندهٔ جمله', nextXp: 1800 };
    if (x >= 250)  return { icon: '🌿', titleFa: 'یادگیرندهٔ گرام', nextXp: 750 };
    return { icon: '🌱', titleFa: 'تازه‌کارِ کنجکاو', nextXp: 250 };
  }

  /* Feedback copy (v2.7.0). Every line must be true after ONE answer in ANY
     screen (lesson, game, review): no "perfect score", no "try again" when the
     screen moves on, and never a word about fear, weakness or blame.
     tests/test_copy.js lints these lists on every build. */
  var PRAISE_PHRASES = [
    'آفرین! 🎉', 'عالی بود! ✨', 'همین است! 💪', 'چه خوب! 🌟', 'دقیقاً! 👏',
    'بسیار خوب! 🔥', 'حرفه‌ای بود! 🚀', 'درست جواب دادی! ✅', 'فوق‌العاده! 🌈',
    'ذهنت آماده است! 🧠', 'درست فهمیدی! 🎯', 'یک قدم جلوتر! ⬆️'
  ];

  var COMFORT_PHRASES = [
    'نزدیک بود! دفعهٔ بعد می‌رسی 💪', 'اشکالی ندارد؛ با هم درستش می‌کنیم 🙂',
    'تکرار مهم‌تر از اشتباه است 🌱', 'اشتباه یعنی داری یاد می‌گیری 🌱',
    'مهم این است که فهمیدی 🎯', 'هر بار بهتر از قبل ✨',
    'با هم قدم‌به‌قدم پیش می‌رویم 🤝', 'توضیحش را بخوان؛ بعدی مال توست 💡',
    'هر اشتباه یک قدم به جلوست 🚶', 'عیبی ندارد؛ مغزت دارد یاد می‌گیرد 🧠',
    'این قاعده را حالا بهتر می‌شناسی 🙂', 'بعدی را با هم حل می‌کنیم 🌤️'
  ];

  function pickPraise() {
    return PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
  }
  function pickComfort() {
    return COMFORT_PHRASES[Math.floor(Math.random() * COMFORT_PHRASES.length)];
  }

  var THEMES = [
    { id: 'fresh_mint', nameFa: 'نعنای تازه (پیش‌فرض)', rarityFa: 'رایگان', cost: 0, colors: ['#047857', '#10B981', '#F59E0B'] },
    { id: 'indigo_gold', nameFa: 'نیلی سلطنتی و طلایی', rarityFa: 'رایگان', cost: 0, colors: ['#1E3A8A', '#2563EB', '#D97706'] },
    { id: 'cfu_emerald', nameFa: 'زمرد فرهنگیان (همزاد فرهنگ‌لکس)', rarityFa: 'رایگان', cost: 0, colors: ['#053B2E', '#0D6E52', '#D97706'] },
    /* v2.14: the dark theme is a reading need, not a prize → free (buyers got their 20 coins back) */
    { id: 'midnight_sapphire', nameFa: 'شب یاقوت کبود (حالت تاریک)', rarityFa: 'رایگان', cost: 0, dark: true, colors: ['#090F1D', '#1E3A8A', '#F59E0B'] },
    { id: 'persian_turquoise', nameFa: 'فیروزه‌ای نیشابور', rarityFa: 'کمیاب', cost: 25, colors: ['#083344', '#0E7490', '#06B6D4'] },
    { id: 'warm_parchment', nameFa: 'کاغذ کاهی مطالعهٔ کلاسیک', rarityFa: 'کمیاب', cost: 30, colors: ['#F7F1E1', '#78350F', '#B45309'] },
    { id: 'forest_sage', nameFa: 'سبز زیتونی جنگلی', rarityFa: 'حماسی', cost: 35, colors: ['#14532D', '#15803D', '#CA8A04'] },
    { id: 'violet_scholar', nameFa: 'بنفش پژوهشی آکسفورد', rarityFa: 'حماسی', cost: 40, colors: ['#2E1065', '#6D28D9', '#8B5CF6'] },
    { id: 'shiraz_ruby', nameFa: 'یاقوت ارغوانی شیراز', rarityFa: 'حماسی', cost: 45, colors: ['#4C0519', '#9F1239', '#E11D48'] },
    { id: 'saffron_dawn', nameFa: 'طلوع زعفرانی خراسان', rarityFa: 'افسانه‌ای', cost: 50, colors: ['#7C2D12', '#C2410C', '#EA580C'] },
    { id: 'golden_grammarian', nameFa: 'طلای سیاه استاد گرامر (افتخاری)', rarityFa: 'پرستیژ (۵ درس مسلط)', cost: 0, prestigeLessons: 5, dark: true, colors: ['#0E1015', '#D97706', '#FBBF24'] }
  ];

  var ACHIEVEMENTS = [
    { id: 'xp_earned', icon: '⚡', titleFa: 'ستاره‌جمع‌کن', descFa: 'امتیاز تجربه (XP) می‌گیری', field: 'xp', tiers: [100, 400, 1200, 3000] },
    { id: 'correct_ans', icon: '🎯', titleFa: 'تیرانداز دقیق', descFa: 'پاسخ‌های درست در بازی‌ها', field: 'totalCorrect', tiers: [15, 60, 180, 400] },
    { id: 'transform_wins', icon: '🔄', titleFa: 'جادوگر جمله', descFa: 'جمله‌ها را بازنویسی می‌کنی', field: 'transformsSolved', tiers: [5, 15, 35, 75] },
    { id: 'unscramble_wins', icon: '🧩', titleFa: 'چیدمان‌بازیِ کلمات', descFa: 'جمله‌های درهم را مرتب می‌کنی', field: 'unscrambleSolved', tiers: [5, 20, 50, 100] },
    { id: 'errors_hunted', icon: '🔍', titleFa: 'شکارچی اشتباه', descFa: 'خطاهای گرامری را پیدا می‌کنی', field: 'errorsHunted', tiers: [5, 20, 50, 100] },
    { id: 'forms_typed', icon: '✍️', titleFa: 'نویسندهٔ دقیق', descFa: 'شکل درست فعل را می‌نویسی', field: 'formsTyped', tiers: [5, 20, 50, 100] },
    { id: 'srs_reviews', icon: '🧠', titleFa: 'حافظهٔ قوی', descFa: 'کارت‌های مرور هوشمند را مرور می‌کنی', field: 'srsReviews', tiers: [10, 40, 120, 300] },
    { id: 'lessons_mastered', icon: '📘', titleFa: 'درس‌خوانِ کامل', descFa: 'درس‌ها را یکی‌یکی تمام می‌کنی (۳۱ درس)', field: 'masteredLessonsCount', tiers: [3, 10, 20, 31] },
    { id: 'blitz_best', icon: '⏱️', titleFa: 'سرعتِ برق', descFa: 'بهترین رکورد ۳۰ ثانیه‌ای', field: 'blitzBest', tiers: [5, 10, 16, 22] },
    { id: 'streak_best', icon: '🔥', titleFa: 'زنجیرهٔ پیوسته', descFa: 'بیشترین روزهای تمرینِ پشت‌سرهم', field: 'bestStreak', tiers: [2, 5, 14, 30] }
  ];

  function createDefaultState() {
    var today = isoDayKey();
    return {
      version: 21,
      onboarded: false,
      dailyGoalMin: 5,
      selectedGrade: 'prospect_1',
      selectedLessonByGrade: {
        prospect_1: 1, prospect_2: 1, prospect_3: 1,
        vision_1: 1, vision_2: 1, vision_3: 1
      },
      gameScope: 'all',
      accent: 'US',
      soundOn: true,
      soundVolume: 80,          // v2.14: 0–100 (the sounds were too quiet on phone speakers)
      vibrateOn: true,
      theme: 'auto',            // v2.14: a new learner follows the phone (light / dark)
      lastLightTheme: 'fresh_mint',
      themeHintDone: false,     // v2.14: the one-time «گوشی‌ات تاریک است» suggestion for older installs
      darkThemeFree: true,
      darkRefundPending: false,
      unlockedThemes: ['fresh_mint', 'indigo_gold', 'cfu_emerald', 'midnight_sapphire'],
      xp: 0,
      coins: 60,
      streak: 0,
      bestStreak: 0,
      streakFreezes: 1,
      lastActiveDay: '',
      activeDays: {},
      stats: {
        totalCorrect: 0,
        totalAnswered: 0,
        transformsSolved: 0,
        unscrambleSolved: 0,
        errorsHunted: 0,
        formsTyped: 0,
        matchesCleared: 0,
        srsReviews: 0,
        blitzBest: 0,
        bestExamScore20: 0
      },
      discoveredLessons: {}, // e.g., {'vision_3_1': true}
      masteredLessons: {},   // passed = ≥ 2 of 3 in the lesson's practice (unchanged meaning)
      lessonStars: {},       // v2.10 (Phase 4): best stars 0–3 per lesson, never lowered
      skippedLessons: {},    // v2.10: lessons opened with «رد کردن و ادامه» (exam-focused learners)
      bookmarks: {},
      notes: {},
      srs: {}, // item.id -> { box, interval, ef, due, reps, lapses, isMistake, stage, step }
      srsLimits: { newPerDay: 10, reviewsPerDay: 80 },
      srsDaily: { day: today, newDone: 0, reviewsDone: 0 },
      ruleStats: {}, // familyId -> { attempts, wrong, tags }  (weakness dashboard)
      examPlan: { date: '', days: [] },
      placement: { done: false, grade: '', lesson: 1, score: 0, total: 0, at: 0, perGrade: {}, byGrade: {} },
      examResults: [],
      classMode: { name: '', history: [] },  // v2.11 (Phase 5.4): offline class assignments (name + finished codes)
      lastBackupAt: 0,                       // v2.11 (Phase 5.5): time of the last file backup (ms)
      dailyQuests: {
        day: today,
        answered: 0,
        srsDone: 0,
        lessonsRead: 0,
        chestClaimed: false
      }
    };
  }

  var state = createDefaultState();

  /* ======================================================================
     Schema version + explicit migration (Phase 4.4)
     The storage key stays `farhanggram_state_v10` so old data is preserved;
     only the inner payload is migrated forward.
     ====================================================================== */
  /* 12 = v2.10.0: lessonStars + skippedLessons (journey map)
     13 = v2.11.0: classMode, lastBackupAt, placement.byGrade, ruleStats[].recent / lastAt (Phase 5) */
  var SCHEMA_VERSION = 13;
  var RECENT_WINDOW = 8;     // v2.11: the rule dashboard looks at the last 8 answers of a rule

  /** Re-keys legacy per-item rule stats to grammar families. */
  function migrateRuleStats(stats) {
    if (!stats || typeof stats !== 'object') return {};
    var out = {};
    Object.keys(stats).forEach(function (key) {
      var r = stats[key];
      if (!r || typeof r !== 'object') return;
      var fam = RULE_FAMILY_LABELS[key] ? key : mapRuleTagToFamily(key);
      var target = out[fam] || { attempts: 0, wrong: 0, tags: {} };
      target.attempts += (r.attempts || 0);
      target.wrong += (r.wrong || 0);
      if (r.tags) {
        Object.keys(r.tags).forEach(function (t) {
          target.tags[t] = (target.tags[t] || 0) + r.tags[t];
        });
      }
      // v2.11: the recent-answer window ('1' right / '0' wrong, newest last) and the last answer time
      if (typeof r.recent === 'string' && /^[01]*$/.test(r.recent)) target.recent = ((target.recent || '') + r.recent).slice(-RECENT_WINDOW);
      if (typeof r.lastAt === 'number') target.lastAt = Math.max(target.lastAt || 0, r.lastAt);
      out[fam] = target;
    });
    return out;
  }

  function normalizeClassMode(cm) {
    var out = { name: '', history: [] };
    if (!cm || typeof cm !== 'object') return out;
    out.name = typeof cm.name === 'string' ? cm.name.replace(/\s+/g, ' ').trim().slice(0, 60) : '';
    if (Array.isArray(cm.history)) {
      out.history = cm.history.filter(function (h) { return h && typeof h === 'object' && typeof h.code === 'string'; }).slice(-50);
    }
    return out;
  }

  function migrateState(parsed) {
    var def = createDefaultState();
    if (!parsed || typeof parsed !== 'object') return def;

    var migrated = Object.assign(def, parsed);
    migrated.selectedLessonByGrade = Object.assign(def.selectedLessonByGrade, parsed.selectedLessonByGrade || {});
    migrated.stats = Object.assign(def.stats, parsed.stats || {});
    migrated.discoveredLessons = parsed.discoveredLessons || {};
    migrated.masteredLessons = parsed.masteredLessons || {};
    migrated.lessonStars = (parsed.lessonStars && typeof parsed.lessonStars === 'object') ? parsed.lessonStars : {};
    migrated.skippedLessons = (parsed.skippedLessons && typeof parsed.skippedLessons === 'object') ? parsed.skippedLessons : {};
    // schema 11 → 12: a lesson passed before stars existed had ≥ 2 of 3 → it starts with 2 stars (never fewer)
    Object.keys(migrated.masteredLessons).forEach(function (k) {
      if (migrated.masteredLessons[k] && !(migrated.lessonStars[k] >= 2)) migrated.lessonStars[k] = 2;
    });
    migrated.bookmarks = parsed.bookmarks || {};
    migrated.notes = parsed.notes || {};
    migrated.srs = parsed.srs || {};
    migrated.activeDays = parsed.activeDays || {};
    migrated.ruleStats = migrateRuleStats(parsed.ruleStats);
    migrated.srsLimits = Object.assign(def.srsLimits, parsed.srsLimits || {});
    migrated.srsDaily = parsed.srsDaily || def.srsDaily;
    migrated.examPlan = parsed.examPlan || def.examPlan;
    // schema 12 → 13: the placement remembers its start lesson per grade (byGrade), so a later
    // placement in another grade never re-locks this one
    migrated.placement = Object.assign(def.placement, (parsed.placement && typeof parsed.placement === 'object') ? parsed.placement : {});
    if (!migrated.placement.byGrade || typeof migrated.placement.byGrade !== 'object') migrated.placement.byGrade = {};
    if (migrated.placement.done && migrated.placement.grade && !migrated.placement.byGrade[migrated.placement.grade]) {
      migrated.placement.byGrade[migrated.placement.grade] = migrated.placement.lesson || 1;
    }
    migrated.examResults = parsed.examResults || [];
    migrated.classMode = normalizeClassMode(parsed.classMode);
    migrated.lastBackupAt = (typeof parsed.lastBackupAt === 'number' && parsed.lastBackupAt > 0) ? parsed.lastBackupAt : 0;

    if (!Array.isArray(migrated.unlockedThemes)) {
      migrated.unlockedThemes = ['fresh_mint', 'indigo_gold', 'cfu_emerald'];
    } else if (migrated.unlockedThemes.indexOf('fresh_mint') === -1) {
      migrated.unlockedThemes.unshift('fresh_mint');
    }
    /* v2.14 (no schema bump — additive fields only): the dark theme became free. Whoever had
       bought it (20 coins) gets the coins back exactly once; everyone owns it from now on. */
    if (parsed.darkThemeFree !== true) {
      if (Array.isArray(parsed.unlockedThemes) && parsed.unlockedThemes.indexOf('midnight_sapphire') !== -1) {
        migrated.coins = (migrated.coins || 0) + 20;
        migrated.darkRefundPending = true;
      }
      migrated.darkThemeFree = true;
    }
    if (migrated.unlockedThemes.indexOf('midnight_sapphire') === -1) migrated.unlockedThemes.push('midnight_sapphire');
    if (typeof migrated.soundVolume !== 'number' || isNaN(migrated.soundVolume)) migrated.soundVolume = 80;
    migrated.soundVolume = Math.max(0, Math.min(100, Math.round(migrated.soundVolume)));
    if (typeof parsed.themeHintDone !== 'boolean') migrated.themeHintDone = false;
    if (typeof migrated.lastLightTheme !== 'string' || !migrated.lastLightTheme) migrated.lastLightTheme = 'fresh_mint';
    if (!Array.isArray(migrated.examResults)) migrated.examResults = [];

    // --- v2.6 fields: onboarding flag, daily goal, sound/vibration prefs
    /* v2.11.0 fix: test the PARSED payload — the merged object always has the default
       `onboarded: false`, so before this fix a pre-v2.6 learner (or an old backup) with
       progress was sent through onboarding again, which also reset the lesson pointer to 1 */
    if (typeof parsed.onboarded !== 'boolean') {
      // Users who already had progress are not forced through onboarding again.
      var hadProgress = (migrated.xp || 0) > 0 ||
        Object.keys(migrated.srs || {}).length > 0 ||
        Object.keys(migrated.masteredLessons || {}).length > 0;
      migrated.onboarded = hadProgress;
    }
    if (!migrated.dailyGoalMin) migrated.dailyGoalMin = 5;
    if (typeof migrated.soundOn !== 'boolean') migrated.soundOn = true;
    if (typeof migrated.vibrateOn !== 'boolean') migrated.vibrateOn = true;
    migrated.version = 21;

    // --- SRS cards: preserve ef / interval / due exactly (never reset progress)
    Object.keys(migrated.srs).forEach(function (id) {
      var c = migrated.srs[id] || {};
      migrated.srs[id] = {
        box: typeof c.box === 'number' ? c.box : 1,
        interval: typeof c.interval === 'number' && c.interval >= 0 ? c.interval : 0,
        ef: typeof c.ef === 'number' ? clampEf(c.ef) : 2.5,
        due: typeof c.due === 'number' ? c.due : (Date.now() - 1000),
        reps: typeof c.reps === 'number' ? c.reps : 0,
        lapses: typeof c.lapses === 'number' ? c.lapses : 0,
        isMistake: !!c.isMistake,
        stage: c.stage || 'review',       // 'new' | 'learning' | 'relearn' | 'review'
        step: typeof c.step === 'number' ? c.step : 0,
        addedDay: c.addedDay || '',
        lastReviewed: typeof c.lastReviewed === 'number' ? c.lastReviewed : 0
      };
    });

    migrated.schemaVersion = SCHEMA_VERSION;
    return migrated;
  }

  function loadState() {
    /* v2.17 (R8): every copy is tried in order — the native file, then localStorage. A copy that cannot be parsed no longer
       throws the others away (a cut native file used to reset an intact localStorage progress); the next save heals it. */
    var loadError = null, sawData = false, used = -1;
    var sources = [function () { return bridgeLoad(); }, function () { return localStorage.getItem(STORAGE_KEY); }];
    state = null;
    for (var i = 0; i < sources.length && !state; i++) {
      var raw = null;
      try { raw = sources[i](); } catch (e) { raw = null; }
      if (!raw || raw === '{}' || String(raw).trim() === '') continue;
      sawData = true;
      try { state = migrateState(JSON.parse(raw)); used = i; } catch (e) { loadError = loadError || e; state = null; }
    }
    if (!state) {
      if (!sawData) readFromIndexedDB();      // async: an IndexedDB copy goes back to localStorage for the next start
      state = createDefaultState();
    }
    syncDailyQuestsRollover();
    syncSrsDailyRollover();
    normalizeStreakForToday();
    seedInitialLeitnerIfEmpty();
    if (loadError && used >= 0) {
      try { if (window.SafetyNet) window.SafetyNet.log('storage: one saved copy was unreadable; another copy was used (' + String(loadError.message || loadError) + ')', 'db.js'); } catch (e) {}
    } else if (loadError) {
      reportStorageIssue('خواندن وضعیت ذخیره‌شده با خطا مواجه شد؛ داده‌های جدید از نو ساخته شد.', loadError);
    }
    return state;
  }

  /* v2.17 (R14): days missed while the app was closed (or left in the background) → the header no longer shows the old
     streak until the next answer. One missed day with an ice shield left stays alive: recordActivityForStreak uses the
     shield at the next answer, exactly as before. */
  function normalizeStreakForToday() {
    if (!state || !state.streak || !state.lastActiveDay) return false;
    var now = new Date();
    var today = isoDayKey(now);
    var yest = isoDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    var twoAgo = isoDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2));
    var d = state.lastActiveDay;
    if (d === today || d === yest || (d === twoAgo && state.streakFreezes > 0)) return false;
    state.streak = 0;
    return true;
  }
  function refreshDay() {
    syncDailyQuestsRollover();
    return normalizeStreakForToday();
  }

  /* ======================================================================
     Storage safety (Phase 4.3): never fail silently.
     localStorage first, native bridge mirror, IndexedDB fallback.
     ====================================================================== */
  var storageIssueHandler = null;
  var lastStorageError = null;

  function reportStorageIssue(message, err) {
    lastStorageError = { message: message, error: err ? String(err.message || err) : '', at: Date.now() };
    if (typeof storageIssueHandler === 'function') {
      try { storageIssueHandler(lastStorageError); } catch (e) {}
    } else if (window.console && console.warn) {
      console.warn('[FarhangGram] ' + message, err || '');
    }
  }

  function writeToIndexedDB(raw) {
    try {
      if (!window.indexedDB) return false;
      var req = window.indexedDB.open('farhanggram_db', 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('state')) db.createObjectStore('state');
      };
      req.onsuccess = function () {
        var db = req.result;
        try {
          var tx = db.transaction('state', 'readwrite');
          tx.objectStore('state').put(raw, 'current');
        } catch (e) {}
      };
      return true;
    } catch (e) { return false; }
  }

  function readFromIndexedDB() {
    try {
      if (!window.indexedDB) return null;
      var req = window.indexedDB.open('farhanggram_db', 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('state')) db.createObjectStore('state');
      };
      req.onsuccess = function () {
        var db = req.result;
        try {
          var tx = db.transaction('state', 'readonly');
          var get = tx.objectStore('state').get('current');
          get.onsuccess = function () {
            if (get.result) {
              try { localStorage.setItem(STORAGE_KEY, get.result); } catch (e) {}
            }
          };
        } catch (e) {}
      };
      return null;
    } catch (e) { return null; }
  }

  function saveState() {
    var raw;
    try {
      raw = JSON.stringify(state);
    } catch (e) {
      reportStorageIssue('ذخیرهٔ پیشرفت ناموفق بود؛ داده‌ها تغییر نکردند.', e);
      return false;
    }
    var ok = true;
    try {
      localStorage.setItem(STORAGE_KEY, raw);
    } catch (e) {
      ok = false;
      if (!writeToIndexedDB(raw)) {
        reportStorageIssue('حافظهٔ دستگاه پر است؛ پیشرفت این جلسه ذخیره نشد. لطفاً از بخش پشتیبان‌گیری یک فایل پشتیبان بگیر.', e);
        return false;
      }
      reportStorageIssue('حافظهٔ برنامه پر شد؛ پیشرفت در حافظهٔ پشتیبان داخلی ذخیره شد.', e);
    }
    try {
      if (getBridge() && !bridgeSave(raw)) {     /* v2.17: a plain browser has no native copy to fail */
        reportStorageIssue('ذخیرهٔ نسخهٔ پشتیبان داخلی دستگاه انجام نشد؛ داده در حافظهٔ برنامه نگه داشته شد.', null);
      }
    } catch (e) {
      reportStorageIssue('ذخیرهٔ نسخهٔ پشتیبان داخلی با خطا مواجه شد.', e);
    }
    return ok;
  }

  function syncDailyQuestsRollover() {
    var today = isoDayKey();
    if (!state.dailyQuests || state.dailyQuests.day !== today) {
      state.dailyQuests = {
        day: today,
        answered: 0,
        srsDone: 0,
        lessonsRead: 0,
        chestClaimed: false
      };
    }
  }

  function seedInitialLeitnerIfEmpty() {
    if (Object.keys(state.srs).length > 0) return;
    if (!window.GRAMMAR_CURRICULUM) return;
    seedStarterDeck(state.selectedGrade || 'prospect_1');
  }

  /** v2.13: the first launch seeds BEFORE the onboarding asks for the grade, so the deck came
      from the default grade (7th) for everyone. Once the grade is chosen, a deck that is still
      nothing but untouched starter cards of another grade is swapped for the chosen grade's. */
  function reseedStarterDeck(gid) {
    var C = window.GRAMMAR_CURRICULUM;
    var ids = Object.keys(state.srs || {});
    if (!ids.length || !C || !C[gid] || !Array.isArray(C[gid].items)) return false;
    var untouched = ids.every(function (id) {
      var c = state.srs[id];
      return c && c.stage === 'new' && !c.reps && !c.lastReviewed && !c.isMistake && !c.lapses;
    });
    if (!untouched) return false;
    var own = {};
    C[gid].items.forEach(function (it) { own[it.id] = true; });
    if (ids.every(function (id) { return own[id]; })) return false;
    state.srs = {};
    seedStarterDeck(gid);
    saveState();
    return true;
  }

  function seedStarterDeck(gidIn) {
    // Starter deck must match the learner's own level.
    // (It used to seed from vision_3 — the final-exam level — which handed
    //  a 7th-grade student the hardest questions in the book.)
    var gid = gidIn || 'prospect_1';
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g || !Array.isArray(g.items)) {
      g = window.GRAMMAR_CURRICULUM.prospect_1;
      gid = 'prospect_1';
    }
    if (!g || !Array.isArray(g.items)) return;
    var now = Date.now();
    var perLesson = {};
    var picked = 0;
    g.items.forEach(function (it) {
      if (picked >= 6) return;
      perLesson[it.lesson] = perLesson[it.lesson] || 0;
      if (perLesson[it.lesson] < 2) {
        perLesson[it.lesson] += 1;
        picked++;
        state.srs[it.id] = {
          box: 1, interval: 0, ef: 2.5, due: now - 1000, reps: 0, lapses: 0,
          isMistake: false, stage: 'new', step: 0, addedDay: isoDayKey(), lastReviewed: 0
        };
      }
    });
    if (picked) saveState();
  }

  function recordActivityForStreak() {
    syncDailyQuestsRollover();
    var today = isoDayKey();
    if (state.lastActiveDay === today) {
      state.activeDays[today] = true;
      return;
    }
    var now = new Date();
    var yest = isoDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    var twoAgo = isoDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2));

    if (!state.lastActiveDay) {
      state.streak = 1;
    } else if (state.lastActiveDay === yest) {
      state.streak += 1;
    } else if (state.lastActiveDay === twoAgo && state.streakFreezes > 0) {
      state.streakFreezes -= 1;
      state.activeDays[yest] = 'frozen';
      state.streak += 1;
    } else {
      state.streak = 1;
    }
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.lastActiveDay = today;
    state.activeDays[today] = true;
  }

  function addReward(xpDelta, coinDelta) {
    state.xp += Math.max(0, xpDelta || 0);
    state.coins += Math.max(0, coinDelta || 0);
    recordActivityForStreak();
    checkPrestigeUnlocks();
    saveState();
  }

  function checkPrestigeUnlocks() {
    var masteredCount = Object.keys(state.masteredLessons).filter(function (k) {
      return !!state.masteredLessons[k];
    }).length;
    if (masteredCount >= 5 && state.unlockedThemes.indexOf('golden_grammarian') === -1) {
      state.unlockedThemes.push('golden_grammarian');
    }
  }

  /* ======================================================================
     Procedural SM-2 (Anki-style 4 buttons) + learning steps + daily caps
     + 7-day forecast.  Pure & testable: no direct DOM access.
     ====================================================================== */
  var DAY_MS = 86400000;
  var LEARNING_STEPS_MIN = 10;   // minutes
  var SRS_QUALITY = { AGAIN: 1, HARD: 2, GOOD: 3, EASY: 4 };

  function clampEf(v) {
    var n = typeof v === 'number' && isFinite(v) ? v : 2.5;
    return Math.max(1.3, Math.min(3.0, n));
  }

  function startOfDay(ts) {
    var d = new Date(ts == null ? Date.now() : ts);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function dayKeyOf(ts) {
    var d = new Date(ts == null ? Date.now() : ts);
    return isoDayKey(d);
  }

  function applyFuzz(interval, rnd) {
    // Anki-style ±5% jitter for intervals >= 7 days to avoid pile-ups.
    if (interval < 7) return interval;
    var r = (typeof rnd === 'function') ? rnd() : Math.random();
    var factor = 1 + (r * 0.10 - 0.05);
    return Math.max(1, Math.round(interval * factor));
  }

  /**
   * Core rating function — pure: returns the new card object.
   * quality: 1 = again, 2 = hard, 3 = good, 4 = easy
   */
  function computeNextCard(card, quality, now, rnd) {
    var ts = now == null ? Date.now() : now;
    var c = {
      box: card.box || 1,
      interval: typeof card.interval === 'number' ? card.interval : 0,
      ef: clampEf(card.ef),
      due: card.due || ts,
      reps: card.reps || 0,
      lapses: card.lapses || 0,
      isMistake: !!card.isMistake,
      stage: card.stage || 'review',
      step: card.step || 0,
      addedDay: card.addedDay || '',
      lastReviewed: card.lastReviewed || 0
    };
    var q = quality | 0;

    if (q === SRS_QUALITY.AGAIN) {
      c.lapses += 1;
      c.reps = 0;
      c.ef = Math.max(1.3, c.ef - 0.20);
      c.interval = 0;
      c.box = 1;
      c.stage = 'relearn';
      c.step = 0;
      c.isMistake = true;
      c.due = ts + LEARNING_STEPS_MIN * 60 * 1000;
    } else if (q === SRS_QUALITY.HARD) {
      c.reps += 1;
      c.ef = Math.max(1.3, c.ef - 0.15);
      c.interval = Math.max(1, Math.round((c.interval || 0) * 1.2));
      c.box = Math.max(1, Math.min(5, c.box));
      c.stage = 'review';
      c.step = 0;
    } else if (q === SRS_QUALITY.GOOD) {
      c.reps += 1;
      if (c.reps === 1) c.interval = 1;
      else if (c.reps === 2) c.interval = 3;
      else c.interval = Math.max(1, Math.round((c.interval || 1) * c.ef));
      c.box = Math.min(5, c.box + 1);
      c.stage = 'review';
      c.step = 0;
      if (c.reps >= 2) c.isMistake = false;   // healed in the mistake clinic
    } else { // EASY
      c.reps += 1;
      c.ef = Math.min(3.0, c.ef + 0.15);
      c.interval = c.reps === 1 ? 3 : Math.max(1, Math.round(Math.max(3, c.interval || 0) * c.ef * 1.3));
      c.box = Math.min(5, c.box + 1);
      c.stage = 'review';
      c.step = 0;
      c.isMistake = false;
    }

    // Fuzz is applied BEFORE the due date so that `interval` and `due`
    // always describe the same card state.
    if (q !== SRS_QUALITY.AGAIN) {
      c.interval = applyFuzz(c.interval, rnd);
      c.due = startOfDay(ts) + c.interval * DAY_MS;
    }
    c.lastReviewed = ts;
    if (!c.addedDay) c.addedDay = dayKeyOf(ts);
    return c;
  }

  /** v2.13: how long until a card comes back for each self-rating (1..4), in ms — shown under
      «دوباره / سخت / خوب / آسان» so the four buttons explain themselves. Pure. */
  function previewSrsIntervals(itemId, now) {
    var ts = now == null ? Date.now() : now;
    var card = (state.srs || {})[itemId] || {
      box: 1, interval: 0, ef: 2.5, due: ts - 1000, reps: 0, lapses: 0,
      isMistake: false, stage: 'new', step: 0, addedDay: '', lastReviewed: 0
    };
    return [1, 2, 3, 4].map(function (q) {
      var nx = computeNextCard(card, q, ts, function () { return 0.5; });
      return q === SRS_QUALITY.AGAIN ? Math.max(60000, nx.due - ts) : Math.max(1, nx.interval) * DAY_MS;
    });
  }

  function syncSrsDailyRollover() {
    var today = isoDayKey();
    if (!state.srsDaily || state.srsDaily.day !== today) {
      state.srsDaily = { day: today, newDone: 0, reviewsDone: 0 };
    }
  }

  function getSrsLimits() {
    var lim = state.srsLimits || {};
    return {
      newPerDay: Math.max(0, lim.newPerDay == null ? 10 : lim.newPerDay),
      reviewsPerDay: Math.max(0, lim.reviewsPerDay == null ? 80 : lim.reviewsPerDay)
    };
  }

  function setSrsLimits(newPerDay, reviewsPerDay) {
    state.srsLimits = {
      newPerDay: Math.max(0, Math.min(100, Number(newPerDay) || 0)),
      reviewsPerDay: Math.max(0, Math.min(300, Number(reviewsPerDay) || 0))
    };
    saveState();
    return state.srsLimits;
  }

  function getSrsDailyCounters() {
    syncSrsDailyRollover();
    var lim = getSrsLimits();
    return {
      newDone: state.srsDaily.newDone || 0,
      reviewsDone: state.srsDaily.reviewsDone || 0,
      newLimit: lim.newPerDay,
      reviewsLimit: lim.reviewsPerDay,
      newLeft: Math.max(0, lim.newPerDay - (state.srsDaily.newDone || 0)),
      reviewsLeft: Math.max(0, lim.reviewsPerDay - (state.srsDaily.reviewsDone || 0))
    };
  }

  /** 7-day review-load forecast (Persian labels, Jalali dates). */
  function getReviewForecast(days) {
    var n = days || 7;
    syncSrsDailyRollover();
    var buckets = {};
    var i;
    for (i = 0; i < n; i++) {
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + i);
      buckets[isoDayKey(d)] = 0;
    }
    Object.keys(state.srs).forEach(function (id) {
      var card = state.srs[id];
      if (!card || !card.due) return;
      var k = dayKeyOf(card.due);
      if (buckets.hasOwnProperty(k)) buckets[k] += 1;
    });
    var out = [];
    for (i = 0; i < n; i++) {
      var dd = new Date();
      dd.setHours(0, 0, 0, 0);
      dd.setDate(dd.getDate() + i);
      var j = gregorianToJalali(dd.getFullYear(), dd.getMonth() + 1, dd.getDate());
      var key = isoDayKey(dd);
      out.push({
        key: key,
        dayLabelFa: toFaDigits(j[2]) + ' ' + JALALI_MONTHS[j[1]],
        count: buckets[key] || 0,
        isToday: i === 0
      });
    }
    return out;
  }

  /* ======================================================================
     Journey map (v2.10.0, Phase 4.1) — pure logic, unit-tested in tests/test_journey.js
       done   : best stars ≥ 1          locked : not reachable yet
       active : the furthest point of progress (one per grade)
       open   : reachable, not started (placement / skipped-over / opened before)
     A lesson is reachable when it is the first one, the previous lesson has ≥ 2 stars
     (= passed), it was skipped to, it was opened before, placement put the learner
     there, or it lies before the furthest lesson reached (no lock behind the learner).
     «رد کردن و ادامه» (skip) is always allowed — the lock guides, it never traps.
     ====================================================================== */
  var PASS_STARS = 2;
  function lessonKey(gid, lid) { return gid + '_' + lid; }
  function getLessonStars(gid, lid) {
    var k = lessonKey(gid, lid), s = (state.lessonStars || {})[k] || 0;
    return state.masteredLessons[k] ? Math.max(s, PASS_STARS) : s;
  }
  /** Stores the best result of one round; returns { prev, best, improved, passed, newlyPassed }. */
  function recordLessonStars(gid, lid, stars) {
    var k = lessonKey(gid, lid);
    if (!state.lessonStars) state.lessonStars = {};
    var prev = getLessonStars(gid, lid);
    var s = Math.max(0, Math.min(3, Math.round(stars || 0)));
    var best = Math.max(prev, s);
    state.lessonStars[k] = best;
    var newlyPassed = best >= PASS_STARS && !state.masteredLessons[k];
    if (best >= PASS_STARS) state.masteredLessons[k] = true;
    return { prev: prev, best: best, improved: best > prev, passed: best >= PASS_STARS, newlyPassed: newlyPassed };
  }
  function skipToLesson(gid, lid) {
    if (!state.skippedLessons) state.skippedLessons = {};
    state.skippedLessons[lessonKey(gid, lid)] = true;
  }
  function getJourney(gid, lessons) {
    var list = lessons || [];
    var pl = state.placement || {};
    var plLesson = (pl.done && pl.grade === gid) ? (pl.lesson || 1) : ((pl.byGrade && pl.byGrade[gid]) || 0);
    var touched = -1, out = [], i;
    for (i = 0; i < list.length; i++) {
      var k = lessonKey(gid, list[i].id);
      if (getLessonStars(gid, list[i].id) > 0 || (state.skippedLessons || {})[k] || state.discoveredLessons[k] ||
          (plLesson && list[i].id === plLesson)) touched = i;
    }
    for (i = 0; i < list.length; i++) {
      var id = list[i].id, key = lessonKey(gid, id), stars = getLessonStars(gid, id);
      // never a lock BEHIND the learner: everything up to the furthest lesson reached stays open
      var reachable = i === 0 || i <= touched || getLessonStars(gid, list[i - 1].id) >= PASS_STARS || stars > 0 ||
        !!(state.skippedLessons || {})[key] || !!state.discoveredLessons[key] || (plLesson && id <= plLesson);
      out.push({ id: id, key: key, stars: stars, reachable: !!reachable, passed: stars >= PASS_STARS, state: '' });
    }
    // the active lesson = the furthest touched lesson if it is not passed yet, else the one after it
    var active = -1;
    if (touched < 0) active = list.length ? 0 : -1;
    else if (!out[touched].passed) active = touched;
    else if (touched + 1 < out.length) active = touched + 1;
    else { for (i = 0; i < out.length; i++) if (out[i].reachable && !out[i].passed) { active = i; break; } }
    for (i = 0; i < out.length; i++) {
      out[i].state = i === active ? 'active' : (out[i].stars > 0 ? 'done' : (out[i].reachable ? 'open' : 'locked'));
    }
    return out;
  }
  /** Cards scheduled for tomorrow (Phase 4.3 «چند کارت فردا؟»). */
  function countSrsDueTomorrow() {
    var f = getReviewForecast(2);
    return f[1] ? f[1].count : 0;
  }

  /** Personal Mistake Clinic: auto-capture of missed items into Box 1. */
  function addItemToSrs(itemId, markAsMistake) {
    if (!state.srs[itemId]) {
      state.srs[itemId] = {
        box: 1,
        interval: 0,
        ef: 2.5,
        due: Date.now() - 1000,
        reps: 0,
        lapses: markAsMistake ? 1 : 0,
        isMistake: !!markAsMistake,
        stage: 'new',
        step: 0,
        addedDay: isoDayKey(),
        lastReviewed: 0
      };
      saveState();
      return true;
    }
    if (markAsMistake) {
      var c = state.srs[itemId];
      c.box = 1;
      c.reps = 0;
      c.due = Date.now() - 1000;
      c.lapses = (c.lapses || 0) + 1;
      c.isMistake = true;
      c.stage = 'relearn';
      c.step = 0;
      c.lastReviewed = Date.now();
      saveState();
    }
    return false;
  }

  function rateSrsCard(itemId, quality, now) {
    var ts = now == null ? Date.now() : now;
    syncSrsDailyRollover();
    var card = state.srs[itemId] || {
      box: 1, interval: 0, ef: 2.5, due: ts - 1000, reps: 0, lapses: 0,
      isMistake: false, stage: 'new', step: 0, addedDay: dayKeyOf(ts), lastReviewed: 0
    };
    var wasNew = (card.stage === 'new' || !card.addedDay);
    var next = computeNextCard(card, quality, ts);
    state.srs[itemId] = next;

    if (wasNew) state.srsDaily.newDone = (state.srsDaily.newDone || 0) + 1;
    else state.srsDaily.reviewsDone = (state.srsDaily.reviewsDone || 0) + 1;

    state.stats.srsReviews = (state.stats.srsReviews || 0) + 1;
    syncDailyQuestsRollover();
    state.dailyQuests.srsDone += 1;
    addReward(quality === 1 ? 3 : 8, 0);
    return next;
  }

  /** Due cards, honouring the daily caps (10 new / 80 reviews). */
  function getDueSrsIds(filterMode, opts) {
    var options = opts || {};
    var lim = getSrsLimits();
    var counters = getSrsDailyCounters();
    var now = options.now == null ? Date.now() : options.now;
    var ids = [];
    var newIds = [];
    var reviewIds = [];
    Object.keys(state.srs).forEach(function (id) {
      var c = state.srs[id];
      if (!c) return;
      // a card is "new" only if it was never scheduled — a lapsed card
      // (stage 'relearn') HAS been seen, so it must count as a review
      var isNew = (c.stage === 'new') || (!c.addedDay);
      if (isNew) {
        if (newIds.length < lim.newPerDay) newIds.push(id);
      } else if (c.due <= now) {
        reviewIds.push(id);
      }
    });
    // mistake-clinic cards come first, then weakest-first (lowest ef / highest lapses)
    newIds.sort(function (a, b) { return (state.srs[b].lapses || 0) - (state.srs[a].lapses || 0); });
    reviewIds.sort(function (a, b) {
      var A = state.srs[a], B = state.srs[b];
      if (!!B.isMistake !== !!A.isMistake) return B.isMistake ? 1 : -1;
      if ((A.due || 0) !== (B.due || 0)) return (A.due || 0) - (B.due || 0);
      return (A.ef || 2.5) - (B.ef || 2.5);
    });
    var allowedReviews = Math.max(0, lim.reviewsPerDay - counters.reviewsDone);
    ids = newIds.slice(0, Math.max(0, lim.newPerDay - counters.newDone))
      .concat(reviewIds.slice(0, allowedReviews));
    if (filterMode === 'mistake') {
      ids = ids.filter(function (id) { return state.srs[id] && state.srs[id].isMistake; });
    }
    return ids;
  }

  function getComputedAchievementValue(field) {
    if (field === 'xp') return state.xp || 0;
    if (field === 'bestStreak') return state.bestStreak || 0;
    if (field === 'masteredLessonsCount') {
      return Object.keys(state.masteredLessons).filter(function (k) { return !!state.masteredLessons[k]; }).length;
    }
    return state.stats[field] || 0;
  }

  var audioCtx = null;
  function playSfx(type) {
    // v2.6: the WebAudio engine (js/sound.js) is the single source of truth.
    if (window.FGSound && typeof window.FGSound.play === 'function') {
      var map = { correct: 'correct', wrong: 'wrong', win: 'fanfare', tap: 'tap', tick: 'tick' };
      window.FGSound.play(map[type] || 'tap');
      return;
    }
    var bridge = getBridge();
    if (state.vibrateOn && bridge && typeof bridge.vibrate === 'function') {
      if (type === 'wrong') bridge.vibrate(55);
      else if (type === 'win') bridge.vibrate(35);
      else if (type === 'tap') bridge.vibrate(12);
    }
    if (!state.soundOn) return;
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var now = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.07);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (type === 'wrong') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(165, now + 0.09);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.13, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
        osc.start(now);
        osc.stop(now + 0.37);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch (e) {}
  }

  function speakEnglish(text, customRate) {
    if (!text) return;
    var clean = String(text).replace(/_____/g, 'blank').trim();
    var accent = state.accent || 'US';
    var rate = customRate || 0.92;
    try {
      // Native offline TTS on Android — matches FarhangLex bridge contract (AndroidBridge.speakTts)
      if (window.AndroidBridge && typeof window.AndroidBridge.speakTts === 'function') {
        var ok = window.AndroidBridge.speakTts(clean, accent, rate);
        if (ok === true) return;
        /* v2.14: a silent 🔊 explains itself (how to install an English voice) instead of doing nothing */
        if (!isTtsReady() && window.FGApp && typeof window.FGApp.onTtsUnavailable === 'function') {
          window.FGApp.onTtsUnavailable();
          return;
        }
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(clean);
        u.lang = accent === 'UK' ? 'en-GB' : 'en-US';
        u.rate = rate;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  }

  /** v2.8: is there an English voice right now? (Android bridge first, then Web Speech) */
  function isTtsReady() {
    try {
      var b = window.AndroidBridge;
      if (b && typeof b.isTtsReady === 'function') return !!b.isTtsReady();
      var ss = window.speechSynthesis;
      if (ss && typeof ss.getVoices === 'function') {
        var voices = ss.getVoices() || [];
        for (var i = 0; i < voices.length; i++) if (/^en/i.test(voices[i].lang || '')) return true;
      }
    } catch (e) {}
    return false;
  }

  /* ======================================================================
     Rule Family Taxonomy (Phase 6.1 — weakness dashboard)
     The curriculum's `ruleTag` is an item-level descriptor (479 distinct
     tags for 480 items), so it cannot aggregate errors. Every tag is mapped
     to one of 41 canonical grammar families; the dashboard and the
     "practice this rule" drill work on families, not on single items.
     ====================================================================== */
  var RULE_FAMILY_LABELS = {
    question: 'پرسش‌ها (WH و Yes/No)',
    be_verb: 'فعل to be (am/is/are/was/were)',
    past_simple: 'گذشتهٔ ساده',
    modal_verbs: 'افعال وجهی (can/may/must/should)',
    writing_grammar: 'نگارش: کاربرد قواعد در متن',
    preposition: 'حرف اضافه',
    gerund_infinitive: 'مصدر و ساختار ing/to',
    pronoun: 'ضمیر و اشاره',
    adjective: 'صفت',
    conditional: 'شرطی (نوع ۱ و ۲)',
    have_verb: 'فعل have/has (بیماری، مالکیت، سن)',
    countability: 'شمارش، کمیت و واحد شمارش',
    past_perfect: 'گذشتهٔ کامل',
    present_continuous: 'حال استمراری',
    agreement: 'تطابق فاعل و فعل',
    comparison: 'صفت تفضیلی و مقایسه',
    passive: 'مجهول',
    there_is: 'وجود و مکان با there is/are',
    future: 'آینده (will / going to)',
    spelling: 'املای فعل',
    weather: 'هوا و آب‌وهوا',
    present_simple: 'حال ساده و do/does',
    relative_clause: 'جملهٔ موصولی',
    writing_paragraph: 'نگارش: پاراگراف و جملهٔ موضوع',
    noun: 'اسم و شغل',
    tag_question: 'تگ‌کوئسچن',
    time_date: 'زمان، تاریخ و مکان',
    needs: 'نیاز و حالت روزانه',
    negative: 'جملهٔ منفی',
    imperative: 'جملهٔ امری',
    possessive: 'مالکیت و صفات ملکی',
    writing_structure: 'نگارش: ساختار جمله',
    present_perfect: 'حال کامل',
    like_verb: 'فعل like و علاقه‌مندی',
    writing_compound: 'نگارش: جملهٔ مرکب و پیوند',
    article: 'حرف تعریف (a/an/the)',
    politeness: 'تعارف و مجامله',
    adverb: 'قید',
    past_continuous: 'گذشتهٔ استمراری',
    writing_mechanics: 'نگارش: املا و نگارش‌کردن',
    conjunction: 'جملهٔ مرکب و حروف ربط',
    sentence_pattern: 'ساختار جمله (فاعل + فعل)',
    phrasal_verb: 'فعل‌های دوکلمه‌ای (Phrasal Verbs)'
  };

  var RULE_FAMILY_RULES = [
    { id: 'tag_question', kw: ['تگ‌کوئسچن'] },
    { id: 'passive', kw: ['مجهول'] },
    { id: 'phrasal_verb', kw: ['فعل دوکلمه‌ای', 'Phrasal Verb'] },
    { id: 'conditional', kw: ['شرطی'] },
    { id: 'relative_clause', kw: ['موصولی'] },
    { id: 'present_perfect', kw: ['حال کامل'] },
    { id: 'past_continuous', kw: ['گذشته استمراری', 'گذشتهٔ استمراری'] },
    { id: 'past_perfect', kw: ['گذشته کامل', 'گذشتهٔ کامل'] },
    { id: 'present_continuous', kw: ['حال استمراری', 'در حال انجام', 'در حال'] },
    { id: 'future', kw: ['آینده', 'will', 'going to', 'قول', 'وعده', 'پیش‌بینی'] },
    { id: 'modal_verbs', kw: ['must', 'may', 'might', 'can', 'could', 'should', 'have to', 'اجبار', 'احتمال', 'توصیه', 'توانایی', 'اجازه'] },
    { id: 'past_simple', kw: ['گذشته ساده', 'گذشتهٔ ساده', 'گذشتهٔ بی‌قاعده', 'بعد از Did', 'بعد از didn', 'گذشته', 'دیروز'] },
    { id: 'spelling', kw: ['املای', 'حذف e', 'حذف s', 'افزودن ing', 'تکرار حرف'] },
    { id: 'imperative', kw: ['امری'] },
    { id: 'question', kw: ['پرسش', 'سوال', 'سؤال', 'پرسیده', 'چه کسی', 'معترضه', 'احوال‌پرسی', 'Where', 'What', 'When', 'Why', 'How', 'Who', 'Which'] },
    { id: 'negative', kw: ['منفی', 'never', "n't", 'نمی'] },
    { id: 'gerund_infinitive', kw: ['مصدر', 'V-ing', 'با ing', 'باing', 'avoid', 'suggest', 'enjoy', 'hate', 'decide', 'plan', 'promised', 'look forward to', 'interested in'] },
    { id: 'have_verb', kw: ['با has', 'با have', 'have/has', 'with has', 'have a cold', 'has a cold'] },
    { id: 'weather', kw: ['هوا', 'باریدن', 'برفی', 'مطبوع'] },
    { id: 'politeness', kw: ['تعارف', 'مجامله', 'Would you like'] },
    { id: 'like_verb', kw: ['علاقه', 'با like', 'like +'] },
    { id: 'needs', kw: ['گرسنگی', 'تشنگی', 'خواب', 'بیدار'] },
    { id: 'preposition', kw: ['حرف اضافه', 'since و for', 'بعد از from', 'با from', 'با in', 'با on', 'با at', 'good at'] },
    { id: 'time_date', kw: ['ساعت', 'روز هفته', 'روزهای هفته', 'هفته', 'ماه', 'بخش روز', 'فصل', 'تعطیلی', 'روز تولد', 'زمان امتحان', 'مکان', 'آدرس', 'پلاک'] },
    { id: 'comparison', kw: ['تفضیلی', 'برابری', 'as ... as', 'مقایسه', 'عالی', '-est', 'more'] },
    { id: 'adjective', kw: ['صفت', 'ملیت'] },
    { id: 'adverb', kw: ['قید', 'جایگاه'] },
    { id: 'countability', kw: ['غیرقابل‌شمارش', 'قابل‌شمارش', 'a few', 'a little', 'some', 'any', 'much', 'many', 'luggage', 'information', 'news', 'advice', 'کمیت', 'واحد شمارش'] },
    { id: 'article', kw: ['حرف تعریف', 'a قبل', 'an قبل', 'the با'] },
    { id: 'possessive', kw: ['مالکیت', 'ملکی', 'apostrophe', 'آپاستروف', 'you و your', 'ترکیب her'] },
    { id: 'pronoun', kw: ['ضمیر', 'اشاره', 'this', 'that', 'these', 'those', 'مفعولی', 'themselves', 'جمله موضوع'] },
    { id: 'agreement', kw: ['تطابق', 'توافق', 'سوم‌شخص'] },
    { id: 'conjunction', kw: ['جملهٔ مرکب', 'جمله مرکب', 'با or', 'با but', 'با so', 'Although', 'با may', 'While'] },
    { id: 'there_is', kw: ['وجود'] },
    { id: 'present_simple', kw: ['فعل ساده با', 'فعل ساده بعد از Does', 'با do', 'سوم‌شخص مفرد', 'برنامه از پیش', 'با Does', 'بدون مخفف', 'فعل do'] },
    { id: 'sentence_pattern', kw: ['ساختار', 'S + V + O', 'جملهٔ ساده', 'جمله ساده'] },
    { id: 'be_verb', kw: ['to be', 'با is', 'با are', 'با am', 'با was', 'با were'] },
    { id: 'noun', kw: ['اسم', 'شغل', 'نام'] }
  ];

  var WRITING_SUB_RULES = [
    { id: 'writing_paragraph', kw: ['پاراگراف', 'Topic Sentence', 'Supporting', 'نتیجه‌گیری', 'جملهٔ موضوع', 'جملهٔ پشتیبان', 'ویژگی'] },
    { id: 'writing_compound', kw: ['جملهٔ مرکب', 'جمله مرکب', 'مرکب'] },
    { id: 'writing_mechanics', kw: ['املای', 'حروف بزرگ'] },
    { id: 'writing_structure', kw: ['ساختار جمله', 'S + V + O', 'مفعول + مصدر', 'اسم مصدر', 'ساختار'] },
    { id: 'writing_grammar', kw: [] }
  ];

  /** Maps an item's ruleTag to a canonical grammar family id. */
  function mapRuleTagToFamily(tag) {
    var t = String(tag == null ? '' : tag);
    if (t.indexOf('Writing:') === 0) {
      for (var w = 0; w < WRITING_SUB_RULES.length; w++) {
        var wk = WRITING_SUB_RULES[w].kw;
        for (var wi = 0; wi < wk.length; wi++) {
          if (t.indexOf(wk[wi]) !== -1) return WRITING_SUB_RULES[w].id;
        }
      }
      return 'writing_grammar';
    }
    for (var i = 0; i < RULE_FAMILY_RULES.length; i++) {
      var kws = RULE_FAMILY_RULES[i].kw;
      for (var j = 0; j < kws.length; j++) {
        if (t.indexOf(kws[j]) !== -1) return RULE_FAMILY_RULES[i].id;
      }
    }
    return 'misc';
  }

  function ruleFamilyLabelFa(familyId) {
    if (!familyId) return 'مباحث عمومی';
    // never leak a raw English id (e.g. "sentence_pattern") into the UI
    return RULE_FAMILY_LABELS[familyId] || 'مباحث عمومی';
  }

  /** All curriculum items that belong to a family (used by the drill). */
  function getFamilyItems(familyId) {
    var out = [];
    var G = window.GRAMMAR_CURRICULUM;
    if (!G) return out;
    Object.keys(G).forEach(function (gid) {
      var g = G[gid];
      (g.items || []).forEach(function (it) {
        if (mapRuleTagToFamily(it.ruleTag) === familyId) {
          out.push({ id: it.id, item: it, grade: gid });
        }
      });
    });
    return out;
  }

  /* ======================================================================
     Weakness dashboard (Phase 6.1) — error rate per grammar rule
     ====================================================================== */
  function recordRuleOutcome(ruleTag, isCorrect) {
    if (!ruleTag) return null;
    if (!state.ruleStats) state.ruleStats = {};
    // Errors are aggregated per GRAMMAR FAMILY (41 families), not per item —
    // `ruleTag` is unique per item and could never show a pattern.
    var key = mapRuleTagToFamily(ruleTag);
    var r = state.ruleStats[key] || { attempts: 0, wrong: 0, tags: {} };
    r.attempts += 1;
    if (!isCorrect) r.wrong += 1;
    if (!r.tags) r.tags = {};
    var rawTag = String(ruleTag).trim();
    r.tags[rawTag] = (r.tags[rawTag] || 0) + 1;
    r.recent = ((typeof r.recent === 'string' ? r.recent : '') + (isCorrect ? '1' : '0')).slice(-RECENT_WINDOW);
    r.lastAt = Date.now();
    state.ruleStats[key] = r;
    return r;
  }

  /* v2.11.0 (Phase 5.1): a rule «needs practice» when at least one of four of its LAST 8 answers
     was wrong (and it has ≥ 2 answers). Ranking: recent error rate → recent mistakes → newest.
     A good drill therefore takes the rule off the list by itself — the learner SEES it settle.
     Stats saved before v2.11 have no window yet: their totals stand in until new answers arrive.
     `attempts` / `wrong` / `rate` keep their old lifetime meaning (tests/test_rule_families.js). */
  var NEED_RATE = 0.25;
  function ruleWindow(r) {
    var rec = (typeof r.recent === 'string' && r.recent.length) ? r.recent : null;
    var n = rec ? rec.length : (r.attempts || 0);
    var wrong = rec ? rec.split('').filter(function (c) { return c === '0'; }).length : (r.wrong || 0);
    return { n: n, wrong: wrong, correct: n - wrong, rate: n ? wrong / n : 0, fromTotals: !rec };
  }
  function getRuleProgress(familyId) {
    var r = (state.ruleStats || {})[familyId];
    if (!r) return { n: 0, wrong: 0, correct: 0, rate: 0, fromTotals: false, attempts: 0, needsPractice: false };
    var w = ruleWindow(r);
    w.attempts = r.attempts || 0;
    w.needsPractice = w.attempts >= 2 && w.n >= 2 && w.wrong >= 1 && w.rate >= NEED_RATE;
    return w;
  }
  function getWeakRules(limit) {
    var stats = state.ruleStats || {};
    var out = [];
    Object.keys(stats).forEach(function (fam) {
      var r = stats[fam];
      if (!r || r.attempts < 2) return;
      var p = getRuleProgress(fam);
      if (!p.needsPractice) return;
      out.push({
        familyId: fam,
        ruleTag: fam,                       // kept for backward compatibility
        labelFa: ruleFamilyLabelFa(fam),
        attempts: r.attempts,
        wrong: r.wrong,
        rate: r.wrong / r.attempts,         // lifetime error rate (unchanged meaning)
        recentN: p.n,
        recentWrong: p.wrong,
        recentCorrect: p.correct,
        recentRate: p.rate,
        lastAt: r.lastAt || 0
      });
    });
    out.sort(function (a, b) {
      if (b.recentRate !== a.recentRate) return b.recentRate - a.recentRate;
      if (b.recentWrong !== a.recentWrong) return b.recentWrong - a.recentWrong;
      return (b.lastAt || 0) - (a.lastAt || 0);
    });
    return limit ? out.slice(0, limit) : out;
  }

  /* ======================================================================
     Grade placement (v2.11.0, Phase 5.2) — «از کدام درسِ همین پایه شروع کنم؟»
     10 questions from the chosen grade, lessons in book order. A lesson counts as known
     with ≥ 2 of 3 right (1/1, 2/2, 2/3, 3/4 …); the learner starts at the FIRST lesson that
     is not known yet. Nothing is locked: every earlier lesson stays open on the map.
     ====================================================================== */
  function computeGradePlacement(results, lessonIds) {
    var ids = (lessonIds || []).slice();
    var per = {}, i;
    ids.forEach(function (id) { per[id] = { c: 0, t: 0 }; });
    var score = 0, total = 0;
    (results || []).forEach(function (r) {
      if (!r) return;
      total += 1;
      if (r.correct) score += 1;
      if (!per[r.lesson]) return;
      per[r.lesson].t += 1;
      if (r.correct) per[r.lesson].c += 1;
    });
    var known = [], start = 0;
    for (i = 0; i < ids.length; i++) {
      var p = per[ids[i]];
      if (p.t > 0 && p.c * 3 >= p.t * 2) known.push(ids[i]);
      else if (!start) start = ids[i];
    }
    var allKnown = !start && ids.length > 0;
    if (!start) start = ids.length ? ids[ids.length - 1] : 1;
    return { lesson: start, perLesson: per, known: known, allKnown: allKnown, score: score, total: total };
  }
  function applyGradePlacement(gid, res) {
    if (!gid || !res) return null;
    var prev = state.placement || {};
    var byGrade = Object.assign({}, prev.byGrade || {});
    byGrade[gid] = res.lesson;
    state.placement = {
      done: true, grade: gid, lesson: res.lesson, score: res.score || 0, total: res.total || 0,
      at: Date.now(), perGrade: prev.perGrade || {}, perLesson: res.perLesson || {}, scope: 'grade', byGrade: byGrade
    };
    state.selectedGrade = gid;
    if (!state.selectedLessonByGrade) state.selectedLessonByGrade = {};
    state.selectedLessonByGrade[gid] = res.lesson;
    saveState();
    return state.placement;
  }

  /* ======================================================================
     Class mode (v2.11.0, Phase 5.4) — no server, no account, no internet.
     The teacher's app turns «grade + lessons + number of questions» into a 9-digit code
     (or a small .json assignment file); every student's app rebuilds the SAME questions.
     Code = 7-digit payload + 2 check digits (ISO 7064 mod 97-10, as in an IBAN): any single
     wrong digit and any swap of two neighbouring digits is caught.
        payload = ((grade × 256 + lessonMask) × 4 + countIndex) × 1024 + seed
     ====================================================================== */
  var CLASS_GRADES = ['prospect_1', 'prospect_2', 'prospect_3', 'vision_1', 'vision_2', 'vision_3'];
  var CLASS_COUNTS = [5, 8, 10, 15];
  function normalizeDigits(str) {
    return String(str == null ? '' : str)
      .replace(/[\u06F0-\u06F9]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); })
      .replace(/[\u0660-\u0669]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); });
  }
  function mod97(digits) {
    var r = 0;
    for (var i = 0; i < digits.length; i++) r = (r * 10 + (digits.charCodeAt(i) - 48)) % 97;
    return r;
  }
  function padNum(n, w) { var t = String(n); while (t.length < w) t = '0' + t; return t; }
  function gradeLessonCount(gid) {
    var G = window.GRAMMAR_CURRICULUM, g = G && G[gid];
    return g && g.lessons ? g.lessons.length : 0;
  }
  function encodeClassCode(spec) {
    var gi = CLASS_GRADES.indexOf(spec && spec.grade);
    var ci = CLASS_COUNTS.indexOf(spec && spec.count);
    if (gi < 0 || ci < 0) return null;
    var max = gradeLessonCount(spec.grade) || 8, mask = 0;
    (spec.lessons || []).forEach(function (l) { if (l >= 1 && l <= Math.min(8, max)) mask |= (1 << (l - 1)); });
    if (!mask) return null;
    var seed = Math.max(0, Math.min(1023, Math.floor(spec.seed || 0)));
    var p7 = padNum(((gi * 256 + mask) * 4 + ci) * 1024 + seed, 7);
    return p7 + padNum(98 - mod97(p7 + '00'), 2);
  }
  function formatClassCode(code) {
    var c = String(code == null ? '' : code);
    return c.length === 9 ? c.slice(0, 3) + '-' + c.slice(3, 6) + '-' + c.slice(6) : c;
  }
  function decodeClassCode(input) {
    var digits = normalizeDigits(input).replace(/[^0-9]/g, '');
    if (digits.length !== 9) return { ok: false, error: 'length', digits: digits.length };
    if (mod97(digits) !== 1) return { ok: false, error: 'check' };
    var payload = parseInt(digits.slice(0, 7), 10);
    var seed = payload % 1024; payload = Math.floor(payload / 1024);
    var ci = payload % 4; payload = Math.floor(payload / 4);
    var mask = payload % 256, gi = Math.floor(payload / 256);
    if (gi >= CLASS_GRADES.length || !mask) return { ok: false, error: 'range' };
    var gid = CLASS_GRADES[gi], lessons = [];
    for (var b = 0; b < 8; b++) if (mask & (1 << b)) lessons.push(b + 1);
    var n = gradeLessonCount(gid);
    if (n && lessons[lessons.length - 1] > n) return { ok: false, error: 'range' };
    return { ok: true, code: digits, grade: gid, lessons: lessons, count: CLASS_COUNTS[ci], seed: seed };
  }
  function cleanText(t, max) { return typeof t === 'string' ? t.replace(/[\u0000-\u001F<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max) : ''; }
  function buildAssignmentFile(spec, meta) {
    var code = encodeClassCode(spec);
    if (!code) return null;
    var d = decodeClassCode(code);
    return JSON.stringify({
      kind: 'farhanggram-assignment', v: 1, app: 'FarhangGram', appVersion: appVersionStr(),
      code: code, grade: d.grade, lessons: d.lessons, count: d.count,
      title: cleanText(meta && meta.title, 80), teacher: cleanText(meta && meta.teacher, 60),
      createdAt: new Date().toISOString()
    }, null, 1);
  }
  /* «a 6-digit check» on the result file: not encryption — it only shows the teacher that the
     score, the name and the answers were not edited by hand after the app wrote them */
  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  function resultDigest(r) {
    return fnv1a(['FG-class-v1', r.code, r.name, r.score, r.total, r.attempt, r.finishedAt,
      (r.answers || []).map(function (a) { return (a && a.id ? a.id : '') + ':' + (a && a.ok ? 1 : 0); }).join(',')].join('|'));
  }
  function buildResultFile(res) {
    var r = {
      kind: 'farhanggram-result', v: 1, app: 'FarhangGram', appVersion: appVersionStr(),
      code: String(res.code || ''), title: cleanText(res.title, 80), name: cleanText(res.name, 60),
      grade: res.grade || '', lessons: res.lessons || [], score: res.score || 0, total: res.total || 0,
      attempt: res.attempt || 1, startedAt: res.startedAt || '', finishedAt: res.finishedAt || new Date().toISOString(),
      answers: (res.answers || []).map(function (a) { return { n: a.n, type: a.type, id: a.id, ok: !!a.ok }; })
    };
    r.check = resultDigest(r);
    return JSON.stringify(r, null, 1);
  }
  function verifyResultFile(obj) {
    return !!(obj && obj.kind === 'farhanggram-result' && typeof obj.check === 'string' && obj.check === resultDigest(obj));
  }
  /** What kind of FarhangGram file is this? → { ok, kind: 'assignment'|'result'|'backup', data } */
  function parseClassFile(text) {
    var obj;
    try { obj = JSON.parse(String(text == null ? '' : text).replace(/^\uFEFF/, '').trim()); }
    catch (e) { return { ok: false, error: 'unreadable' }; }
    if (!obj || typeof obj !== 'object') return { ok: false, error: 'unknown' };
    if (obj.kind === 'farhanggram-assignment') {
      var d = decodeClassCode(obj.code);
      if (!d.ok) return { ok: false, error: 'code', kind: 'assignment' };
      d.title = cleanText(obj.title, 80); d.teacher = cleanText(obj.teacher, 60); d.source = 'file';
      return { ok: true, kind: 'assignment', data: d };
    }
    if (obj.kind === 'farhanggram-result') return { ok: true, kind: 'result', data: obj, verified: verifyResultFile(obj) };
    var b = parseBackup(text);
    if (b.ok || b.error === 'newer') return { ok: b.ok, kind: 'backup', data: b, error: b.error };
    return { ok: false, error: 'unknown' };
  }
  function recordClassResult(entry) {
    if (!state.classMode) state.classMode = { name: '', history: [] };
    var h = state.classMode.history;
    var attempt = 1;
    h.forEach(function (x) { if (x.code === entry.code) attempt = Math.max(attempt, (x.attempt || 1) + 1); });
    h.push({ code: entry.code, title: cleanText(entry.title, 80), at: Date.now(), score: entry.score, total: entry.total, attempt: attempt });
    if (h.length > 50) h.splice(0, h.length - 50);
    saveState();
    return attempt;
  }
  function nextClassAttempt(code) {
    var h = (state.classMode && state.classMode.history) || [], a = 1;
    h.forEach(function (x) { if (x.code === code) a = Math.max(a, (x.attempt || 1) + 1); });
    return a;
  }
  function setClassName(name) {
    if (!state.classMode) state.classMode = { name: '', history: [] };
    state.classMode.name = cleanText(name, 60);
    saveState();
    return state.classMode.name;
  }

  /* ======================================================================
     File backup (v2.11.0, Phase 5.5)
     A backup file = { kind, app, schemaVersion, appVersion, exportedAt, state }.
     Older backups (the bare state object, v2.6–v2.10) are still accepted. Every backup goes
     through migrateState(), so data from schema 10/11/12 arrives complete; a backup made by
     a NEWER app is refused (never half-loaded). Before a restore the current state is kept
     (localStorage) → «برگرداندن به قبل از بازیابی» undoes it.
     ====================================================================== */
  var BACKUP_KIND = 'farhanggram-backup';
  var PRE_RESTORE_KEY = 'farhanggram_state_before_restore';
  var BACKUP_KNOWN_KEYS = ['srs', 'stats', 'masteredLessons', 'bookmarks', 'notes', 'dailyQuests',
    'activeDays', 'theme', 'xp', 'coins', 'streak', 'ruleStats', 'srsLimits', 'examPlan',
    'placement', 'selectedGrade', 'unlockedThemes', 'lessonStars', 'skippedLessons', 'classMode', 'schemaVersion'];
  function buildBackup() {
    return JSON.stringify({
      kind: BACKUP_KIND, app: 'FarhangGram', schemaVersion: SCHEMA_VERSION,
      appVersion: appVersionStr(), exportedAt: new Date().toISOString(), state: state
    });
  }
  function parseBackup(text) {
    var raw = String(text == null ? '' : text).replace(/^\uFEFF/, '').trim();
    var obj;
    try { obj = JSON.parse(raw); } catch (e) { return { ok: false, error: 'unreadable' }; }
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { ok: false, error: 'invalid' };
    if (obj.kind === 'farhanggram-assignment' || obj.kind === 'farhanggram-result') return { ok: false, error: 'wrong-kind', kind: obj.kind };
    var payload = obj, envelope = false;
    if (obj.kind === BACKUP_KIND) {
      if (!obj.state || typeof obj.state !== 'object' || Array.isArray(obj.state)) return { ok: false, error: 'invalid' };
      payload = obj.state; envelope = true;
    }
    var hits = 0;
    BACKUP_KNOWN_KEYS.forEach(function (k) { if (Object.prototype.hasOwnProperty.call(payload, k)) hits++; });
    if (hits < 2) return { ok: false, error: 'invalid' };
    var schema = Number((envelope && obj.schemaVersion) || payload.schemaVersion || 0) || 0;
    if (schema > SCHEMA_VERSION) return { ok: false, error: 'newer', schemaVersion: schema };
    var migrated;
    try { migrated = migrateState(JSON.parse(JSON.stringify(payload))); } catch (e2) { return { ok: false, error: 'invalid' }; }
    return {
      ok: true, state: migrated, fromSchema: schema, envelope: envelope,
      exportedAt: envelope ? String(obj.exportedAt || '') : '', appVersion: envelope ? String(obj.appVersion || '') : ''
    };
  }
  function summarizeState(s) {
    var st = s || state, stars = 0, lessons = 0;
    Object.keys(st.lessonStars || {}).forEach(function (k) { var v = st.lessonStars[k] || 0; stars += v; if (v > 0) lessons++; });
    return {
      xp: st.xp || 0, streak: st.streak || 0, stars: stars, lessons: lessons,
      cards: Object.keys(st.srs || {}).length, notes: Object.keys(st.notes || {}).length, grade: st.selectedGrade || ''
    };
  }
  /* v2.17.0 / G26 — a restore is only believed when storage confirms it. */
  var lastRestoreError = '';
  function getLastRestoreError() { return lastRestoreError; }
  /** write + read back: true only when the value is really in localStorage afterwards */
  function writeVerified(key, raw) {
    try {
      localStorage.setItem(key, raw);
      return localStorage.getItem(key) === raw;
    } catch (e) {
      lastStorageError = { message: 'ذخیره در حافظهٔ دستگاه ممکن نشد.', error: String(e && (e.message || e)), at: Date.now() };
      return false;
    }
  }
  function readUndoCopy() {
    try {
      var raw = localStorage.getItem(PRE_RESTORE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.state || typeof o.state !== 'object') return null;
      return o;
    } catch (e) { return null; }
  }
  /**
   * Restores a parsed backup. Returns true ONLY when the new state is both in memory and verified in
   * storage; otherwise nothing changes and getLastRestoreError() says why
   * ('invalid' | 'serialize' | 'no-undo' | 'write'; 'mirror' means the phone's own copy failed after a
   * successful restore).
   */
  function restoreParsedBackup(parsed) {
    lastRestoreError = '';
    if (!parsed || !parsed.ok || !parsed.state) { lastRestoreError = 'invalid'; return false; }
    var prevState = state, prevRaw, undoRaw;
    try {
      prevRaw = JSON.stringify(state);
      undoRaw = JSON.stringify({ at: Date.now(), state: state });
    } catch (e) { lastRestoreError = 'serialize'; return false; }
    /* 1) the undo copy comes first: a restore that could not let the learner go back is refused, untouched */
    if (!writeVerified(PRE_RESTORE_KEY, undoRaw)) {
      lastRestoreError = 'no-undo';
      reportStorageIssue('نسخهٔ برگشت ذخیره نشد؛ برای اینکه بتوانی برگردی، بازیابی انجام نشد.', lastStorageError && lastStorageError.error);
      return false;
    }
    /* 2) the candidate is put in place only to be serialised (the daily rollovers run on it), then storage must confirm it */
    var nextRaw;
    try {
      state = parsed.state;
      syncDailyQuestsRollover();
      syncSrsDailyRollover();
      nextRaw = JSON.stringify(state);
    } catch (e) {
      state = prevState;
      try { localStorage.removeItem(PRE_RESTORE_KEY); } catch (e2) {}
      lastRestoreError = 'serialize';
      return false;
    }
    if (!writeVerified(STORAGE_KEY, nextRaw)) {
      state = prevState;
      try { if (localStorage.getItem(STORAGE_KEY) !== prevRaw) localStorage.setItem(STORAGE_KEY, prevRaw); } catch (e3) {}
      try { localStorage.removeItem(PRE_RESTORE_KEY); } catch (e4) {}
      lastRestoreError = 'write';
      reportStorageIssue('حافظهٔ دستگاه اجازهٔ ذخیره نداد؛ بازیابی انجام نشد و پیشرفت فعلی دست‌نخورده ماند.', lastStorageError && lastStorageError.error);
      return false;
    }
    /* 3) memory and storage agree; the phone's own copy is best effort and never claimed when it failed */
    try {
      if (getBridge() && !bridgeSave(nextRaw)) {
        lastRestoreError = 'mirror';
        reportStorageIssue('ذخیرهٔ نسخهٔ پشتیبان داخلی دستگاه انجام نشد؛ بازیابی در حافظهٔ اصلی برنامه انجام شد.', null);
      }
    } catch (e) { lastRestoreError = 'mirror'; }
    return true;
  }
  /** an undo is only offered when the stored copy can really be parsed */
  function getPreRestoreInfo() {
    var o = readUndoCopy();
    return o ? { at: o.at || 0 } : null;
  }
  function undoRestore() {
    lastRestoreError = '';
    var o = readUndoCopy();
    if (!o) { lastRestoreError = 'no-undo'; return false; }
    var prevState = state, restored, raw;
    try {
      restored = migrateState(JSON.parse(JSON.stringify(o.state)));
      state = restored;                       /* the candidate stays in place only until storage confirms it */
      syncDailyQuestsRollover();
      syncSrsDailyRollover();
      raw = JSON.stringify(state);
    } catch (e) { state = prevState; lastRestoreError = 'serialize'; return false; }
    if (!writeVerified(STORAGE_KEY, raw)) {
      state = prevState;
      lastRestoreError = 'write';
      reportStorageIssue('حافظهٔ دستگاه اجازهٔ ذخیره نداد؛ هنوز به وضعیت قبل برنگشتی.', lastStorageError && lastStorageError.error);
      return false;
    }
    try { if (getBridge()) bridgeSave(raw); } catch (e2) {}
    try { localStorage.removeItem(PRE_RESTORE_KEY); } catch (e3) {}
    return true;
  }
  function markBackupDone() {
    state.lastBackupAt = Date.now();
    saveState();
  }

  /* ======================================================================
     Exam-night review plan (Phase 6.4)
     ====================================================================== */
  function setExamPlan(dateStr, daysBefore) {
    var days = daysBefore || 7;
    var plan = [];
    var base = new Date(dateStr + 'T00:00:00');
    if (isNaN(base.getTime())) {
      state.examPlan = { date: '', days: [] };
      saveState();
      return state.examPlan;
    }
    for (var i = days - 1; i >= 0; i--) {
      var d = new Date(base.getTime());
      d.setDate(d.getDate() - i);
      var key = isoDayKey(d);
      var dueCount = 0;
      Object.keys(state.srs).forEach(function (id) {
        var c = state.srs[id];
        if (c && dayKeyOf(c.due) === key) dueCount++;
      });
      var j = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
      plan.push({
        key: key,
        jalaliFa: toFaDigits(j[2]) + ' ' + JALALI_MONTHS[j[1]],
        due: dueCount,
        focus: i === 0 ? 'مرور نهایی و آزمون جامع' : 'مرور فعال کارت‌های سررسیدشده'
      });
    }
    state.examPlan = { date: dateStr, days: plan };
    saveState();
    return state.examPlan;
  }

  function getExamPlan() {
    return state.examPlan || { date: '', days: [] };
  }

  function getRuleStats() {
    return state.ruleStats || {};
  }

  function appVersionStr() {
    try {
      if (window.AndroidBridge && typeof window.AndroidBridge.getAppVersion === 'function') {
        return String(window.AndroidBridge.getAppVersion());
      }
    } catch (e) {}
    return '2.18.0';
  }

  window.FGStore = {
    getState: function () { return state; },
    loadState: loadState,
    saveState: saveState,
    toFaDigits: toFaDigits,
    formatJalaliToday: formatJalaliToday,
    getLast7DaysMeta: getLast7DaysMeta,
    getAcademicRank: getAcademicRank,
    addReward: addReward,
    addItemToSrs: addItemToSrs,
    rateSrsCard: rateSrsCard,
    previewSrsIntervals: previewSrsIntervals,
    reseedStarterDeck: reseedStarterDeck,
    computeNextCard: computeNextCard,
    getDueSrsIds: getDueSrsIds,
    getSrsLimits: getSrsLimits,
    setSrsLimits: setSrsLimits,
    getSrsDailyCounters: getSrsDailyCounters,
    getReviewForecast: getReviewForecast,
    countSrsDueTomorrow: countSrsDueTomorrow,
    getLessonStars: getLessonStars,
    recordLessonStars: recordLessonStars,
    skipToLesson: skipToLesson,
    getJourney: getJourney,
    PASS_STARS: PASS_STARS,
    recordRuleOutcome: recordRuleOutcome,
    getWeakRules: getWeakRules,
    getRuleStats: getRuleStats,
    mapRuleTagToFamily: mapRuleTagToFamily,
    ruleFamilyLabelFa: ruleFamilyLabelFa,
    getFamilyItems: getFamilyItems,
    RULE_FAMILY_LABELS: RULE_FAMILY_LABELS,
    setExamPlan: setExamPlan,
    getExamPlan: getExamPlan,
    onStorageIssue: function (fn) { storageIssueHandler = fn; },
    refreshDay: refreshDay,
    getLastStorageError: function () { return lastStorageError; },
    SCHEMA_VERSION: SCHEMA_VERSION,
    getComputedAchievementValue: getComputedAchievementValue,
    syncDailyQuestsRollover: syncDailyQuestsRollover,
    playSfx: playSfx,
    speakEnglish: speakEnglish,
    isTtsReady: isTtsReady,
    pickPraise: pickPraise,
    pickComfort: pickComfort,
    PRAISE_PHRASES: PRAISE_PHRASES,
    COMFORT_PHRASES: COMFORT_PHRASES,
    getAppVersion: appVersionStr,
    // v2.11.0 — Phase 5 (smart learning & growth)
    getRuleProgress: getRuleProgress,
    NEED_RATE: NEED_RATE,
    RECENT_WINDOW: RECENT_WINDOW,
    computeGradePlacement: computeGradePlacement,
    applyGradePlacement: applyGradePlacement,
    classCode: {
      encode: encodeClassCode, decode: decodeClassCode, format: formatClassCode,
      normalizeDigits: normalizeDigits, GRADES: CLASS_GRADES, COUNTS: CLASS_COUNTS
    },
    buildAssignmentFile: buildAssignmentFile,
    buildResultFile: buildResultFile,
    verifyResultFile: verifyResultFile,
    parseClassFile: parseClassFile,
    recordClassResult: recordClassResult,
    nextClassAttempt: nextClassAttempt,
    setClassName: setClassName,
    buildBackup: buildBackup,
    parseBackup: parseBackup,
    summarizeState: summarizeState,
    restoreParsedBackup: restoreParsedBackup,
    getLastRestoreError: getLastRestoreError,
    getPreRestoreInfo: getPreRestoreInfo,
    undoRestore: undoRestore,
    markBackupDone: markBackupDone,
    migrateState: migrateState,
    THEMES: THEMES,
    ACHIEVEMENTS: ACHIEVEMENTS
  };
})();
