// FarhangLex (فرهنگ‌لکس) - Academic English Vocabulary Learning Engine
// Version 4.2.1 | Farhangian University • Shahid Beheshti Campus Mashhad
// Supervisor: Dr. Ahmadreza Eghtesadi Roudi | Creator & Developer: Alireza Taghizadeh
(function () {
  'use strict';

  const APP_VERSION = '4.2.1';

  const MS_DAY = 24 * 60 * 60 * 1000;
  const BOX_INTERVALS = {
    1: 1 * MS_DAY,
    2: 2 * MS_DAY,
    3: 4 * MS_DAY,
    4: 8 * MS_DAY,
    5: 16 * MS_DAY
  };

  const GRADE_LIST = [
    { id: 'prospect_1', titleFa: 'پایهٔ هفتم', fullTitle: 'Prospect 1 • هفتم', series: 'Prospect' },
    { id: 'prospect_2', titleFa: 'پایهٔ هشتم', fullTitle: 'Prospect 2 • هشتم', series: 'Prospect' },
    { id: 'prospect_3', titleFa: 'پایهٔ نهم', fullTitle: 'Prospect 3 • نهم', series: 'Prospect' },
    { id: 'vision_1', titleFa: 'پایهٔ دهم', fullTitle: 'Vision 1 • دهم', series: 'Vision' },
    { id: 'vision_2', titleFa: 'پایهٔ یازدهم', fullTitle: 'Vision 2 • یازدهم', series: 'Vision' },
    { id: 'vision_3', titleFa: 'پایهٔ دوازدهم', fullTitle: 'Vision 3 • دوازدهم', series: 'Vision' }
  ];

  // v3.11 (V3 review): these pictures necessarily show the same thing (an open dictionary; turbines and panels) — never
  // offered side by side in «تصویرخوان» (the match game shows the meaning under each picture, so it is not affected)
  const VISUAL_CONFUSABLE = {
    'dictionary': ['definition', 'entry'], 'definition': ['dictionary', 'entry'], 'entry': ['dictionary', 'definition'],
    'renewable energy': ['wind turbine', 'solar energy'], 'wind turbine': ['renewable energy'], 'solar energy': ['renewable energy']
  };

  const NEAR_SYNONYMS = {
    'protect': ['defend', 'guard', 'save', 'sustain'],
    'defend': ['protect', 'guard', 'shield'],
    'hurt': ['injure', 'harm', 'damage', 'destroy'],
    'injure': ['hurt', 'harm', 'bleed'],
    'destroy': ['ruin', 'damage', 'hurt'],
    'endangered': ['threatened', 'dying out'],
    'appreciate': ['respect', 'grateful'],
    'dictionary': ['booklet', 'entry']
  };

  const THEMES_CATALOG = [
    { id: 'default', name: 'زمردی فرهنگیان', desc: 'تم رسمی سبز و کرم کاغذی', cost: 0, rarity: 'base', rarityLabel: 'پایه', icon: '🌿', scheme: 'light', bgPreview: '#f5f4ef', swatches: ['#146B54', '#208b6e', '#AD7A2C'] },
    { id: 'dark', name: 'شب زغالی (Dark)', desc: 'آرامش چشم در مطالعهٔ شبانه', cost: 0, rarity: 'base', rarityLabel: 'پایه', icon: '🌙', scheme: 'dark', bgPreview: '#0f172a', swatches: ['#10b981', '#34d399', '#334155'] },
    { id: 'turquoise', name: 'فیروزه‌ای اصفهان', desc: 'الهام از کاشی‌کاری اصیل ایرانی', cost: 35, rarity: 'rare', rarityLabel: 'ویژه', icon: '🏛️', scheme: 'light', bgPreview: '#e0f7fa', swatches: ['#0891b2', '#06b6d4', '#0e7490'] },
    { id: 'rose', name: 'شکوفهٔ شیراز', desc: 'لطیف، شاداب و پرانرژی', cost: 45, rarity: 'rare', rarityLabel: 'ویژه', icon: '🌸', scheme: 'light', bgPreview: '#ffe4e8', swatches: ['#e11d48', '#f43f5e', '#fb7185'] },
    { id: 'sapphire', name: 'اقیانوس اطلسی', desc: 'آبی لاجوردی عمیق و متمرکز', cost: 65, rarity: 'epic', rarityLabel: 'حماسی', icon: '🌊', scheme: 'dark', bgPreview: '#07192e', swatches: ['#0ea5e9', '#38bdf8', '#1e4976'] },
    { id: 'amber', name: 'کهربایی خورشیدی', desc: 'طلایی گرم با حس پاییزی', cost: 80, rarity: 'epic', rarityLabel: 'حماسی', icon: '☀️', scheme: 'light', bgPreview: '#fef3c7', swatches: ['#d97706', '#f59e0b', '#b45309'] },
    { id: 'amethyst', name: 'کهکشان بنفش', desc: 'تم نئونی مدرن به سبک اپ‌های برتر', cost: 110, rarity: 'epic', rarityLabel: 'حماسی', icon: '💜', scheme: 'dark', bgPreview: '#130f26', swatches: ['#9333ea', '#c084fc', '#5b469e'] },
    { id: 'oled', name: 'مشکی سلطنتی طلایی', desc: 'مشکی خالص AMOLED با درخشش طلا', cost: 140, rarity: 'epic', rarityLabel: 'حماسی', icon: '👑', scheme: 'dark', bgPreview: '#050505', swatches: ['#eab308', '#fbbf24', '#27272a'] },
    { id: 'aurora', name: 'شفق قطبی (Aurora)', desc: 'پاداش انحصاری ۷ روز زنجیرهٔ پیوسته', cost: 0, rarity: 'prestige', rarityLabel: 'افسانه‌ای • افتخاری', prestigeMetric: 'bestStreak', prestigeTarget: 7, prestigeReq: 'حفظ زنجیرهٔ ۷ روز مطالعهٔ پیوسته', icon: '🌌', scheme: 'dark', bgPreview: '#041e24', swatches: ['#14b8a6', '#2dd4bf', '#0d9488'] },
    { id: 'grandmaster', name: 'یاقوت استاد بزرگ', desc: 'پاداش انحصاری ۲۵ واژه در جعبهٔ ۵', cost: 0, rarity: 'prestige', rarityLabel: 'افسانه‌ای • افتخاری', prestigeMetric: 'masteredCount', prestigeTarget: 25, prestigeReq: 'تثبیت ۲۵ واژه در جعبهٔ ۵ لایتنر', icon: '💎', scheme: 'dark', bgPreview: '#1c0810', swatches: ['#f59e0b', '#be123c', '#fbbf24'] }
  ];

  const TIER_NAMES_FA = ['قفل', 'برنزی ★', 'نقره‌ای ★★', 'طلایی ★★★', 'الماسی ★★★★'];

  const BADGES_CATALOG = [
    { id: 'b_flame', name: 'شعلهٔ پیوستگی', desc: 'حفظ زنجیرهٔ روزهای متوالی تکمیل هدف مطالعهٔ روزانه', icon: '🔥', metric: 'bestStreak', tiers: [3, 7, 14, 30], rewards: [15, 25, 45, 80] },
    { id: 'b_memory', name: 'معمار حافظهٔ بلندمدت', desc: 'تثبیت کامل واژگان در جعبهٔ ۵ لایتنر در مجموع پایه‌ها', icon: '🏛️', metric: 'masteredCount', tiers: [5, 25, 75, 150], rewards: [15, 30, 50, 90] },
    { id: 'b_sniper', name: 'تک‌تیرانداز دقت', desc: 'تکمیل جلسهٔ مرور، آزمون یا بازی با دقت حداقل ۸۰٪', icon: '🎯', metric: 'highAccuracySessions', tiers: [1, 5, 15, 30], rewards: [12, 22, 40, 65] },
    { id: 'b_daily_hero', name: 'قهرمان برنامهٔ روزانه', desc: 'تکمیل هر ۳ مأموریت استاندارد روزانه و باز کردن صندوقچه', icon: '🎁', metric: 'questChestsOpened', tiers: [1, 5, 15, 30], rewards: [15, 25, 45, 75] },
    { id: 'b_speller', name: 'استاد املا و دیکته', desc: 'ثبت املای صحیح واژگان در آزمون تایپی، دیکته و حروف‌چین', icon: '✍️', metric: 'spellingCorrectTotal', tiers: [5, 25, 80, 200], rewards: [12, 22, 40, 70] },
    { id: 'b_scholar', name: 'درس‌پژوه کتب وزارتی', desc: 'تسلط کامل بر دروس کتاب (رساندن تمام واژگان درس به جعبهٔ ۳+)', icon: '📚', metric: 'lessonsMastered', tiers: [1, 4, 10, 20], rewards: [15, 30, 50, 85] },
    { id: 'b_focus', name: 'تمرکز آهنین', desc: 'ثبت زنجیرهٔ پاسخ درست متوالی بدون خطا (کمبو)', icon: '⚡', metric: 'bestCombo', tiers: [5, 10, 18, 30], rewards: [10, 20, 35, 60] },
    { id: 'b_reviewer', name: 'پشتکار علمی', desc: 'مجموع مرورهای هدفمند ثبت‌شده در لایتنر و آزمون‌ها', icon: '🧠', metric: 'totalReviews', tiers: [20, 100, 300, 700], rewards: [10, 20, 35, 65] },
    { id: 'b_champion', name: 'قهرمان میدان تمرین', desc: 'به پایان رساندن کامل دورهای آزمون و بازی‌های خلاقانه', icon: '🎮', metric: 'gamesCompleted', tiers: [3, 12, 30, 60], rewards: [10, 20, 35, 60] },
    { id: 'b_curator', name: 'کلکسیونر تم‌ها', desc: 'بازگشایی تم‌های اختصاصی و افتخاری در گالری', icon: '🎨', metric: 'paidThemesCount', tiers: [1, 3, 5, 8], rewards: [12, 22, 35, 60] }
  ];

  const RANKS_LADDER = [
    { minStars: 0, title: 'نوآموز واژگان', icon: '🌱' },
    { minStars: 4, title: 'کاوشگر منظم', icon: '🧭' },
    { minStars: 10, title: 'پژوهشگر برتر', icon: '🎓' },
    { minStars: 18, title: 'استاد لایتنر', icon: '🏅' },
    { minStars: 28, title: 'نخبهٔ دوفرهنگی', icon: '🌟' },
    { minStars: 36, title: 'اسطورهٔ فرهنگ‌لکس', icon: '👑' }
  ];

  const FREEZE_SHIELD_COST = 50;
  const FREEZE_SHIELD_MAX = 2;

  let appSettings = {
    accent: 'en-US',
    autoPlay: false,
    sfxEnabled: true,
    speechRate: 0.86,
    theme: 'default',
    dailyNewCards: 20,
    dailyReviewTarget: 15,
    paceConfiguredV35: false,
    activeRecall: null,
    englishOnly: false,
    appearance: 'auto'      // v3.11: 'auto' (follows the phone) | 'light' | 'dark'
  };

  let currentTabName = 'home';
  let activeHubTab = 'badges';
  let currentGradeId = localStorage.getItem('active_grade_id') || 'vision_1';
  let gradeData = null;
  let userProgress = {};
  let userGamification = {
    streak: 0,
    bestStreak: 0,
    lastStreakCreditedDate: '',
    streakFreezes: 1,
    frozenDates: [],
    xp: 0,
    gems: 25,
    peakGems: 25,
    lastActiveDate: '',
    unlockedThemes: ['default', 'dark'],
    unlockedBadges: [],
    badgeTiers: {},
    gamesCompleted: 0,
    bestCombo: 0,
    highAccuracySessions: 0,
    questChestsOpened: 0,
    spellingCorrectTotal: 0,
    dailyQuests: {
      date: '',
      leitnerCount: 0,
      highAccCount: 0,
      spellingCount: 0,
      c1: false,
      c2: false,
      c3: false,
      chest: false
    }
  };
  let weeklyHistory = {};
  let lastActionTimestamp = 0;

  let activeCards = [];
  let sessionQueue = [];
  let isSessionMode = false;
  let sessionStats = {
    totalCards: 0,
    reviewsDone: 0,
    firstPassCorrect: 0,
    lapses: 0,
    gemsEarned: 0,
    evaluatedFirstPass: {}
  };

  let currentCardIndex = 0;
  let isCardFlipped = false;
  let lastRecallResult = null;
  let leitnerLessonFilter = 'all';

  let quizMode = 'mc'; // 'mc' | 'type' | 'dictation'
  let quizLessonFilter = 'all';
  let currentQuizIndex = 0;
  let quizAnswered = false;
  let quizScore = 0;
  let quizWrong = []; // 4.1.0 Phase B: session weak items for the report card (local only, never transmitted)
  let activeQuizQuestions = [];

  let glossaryStarOnly = false;
  let activeModalWordId = null;
  let pendingConfirmCallback = null;
  let currentPlayingAudio = null;
  let audioUnlocked = false;
  let mirrorSaveTimer = null;
  let restoreInProgress = false;

  // ==========================================================
  // UTILITIES: UTF-8 BASE64, HAPTICS, ESCAPING, DATES
  // ==========================================================
  function decodeBase64Utf8(str) {
    if (!str || typeof str !== 'string') return '';
    const trimmed = str.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) return trimmed;
    try {
      const binary = atob(trimmed);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder('utf-8').decode(bytes);
      }
      return decodeURIComponent(escape(binary));
    } catch (e) {
      return str;
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function toPersianDigits(num) {
    return String(num).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  }

  function triggerHaptic(pattern) {
    try {
      const ms = Array.isArray(pattern) ? (pattern[0] || 25) : (pattern || 20);
      if (window.AndroidBridge && typeof window.AndroidBridge.vibrate === 'function') {
        window.AndroidBridge.vibrate(ms);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern || 20);
      }
    } catch (e) {}
  }

  window.showToast = function (msg) {
    const toast = document.getElementById('sys-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  };

  window.__onNativeToastB64 = function (b64) {
    const msg = decodeBase64Utf8(b64);
    if (msg) showToast(msg);
  };

  // Custom Native-Styled Confirm Modal (Replaces broken WebView window.confirm)
  function openConfirmModal(title, message, onConfirm) {
    const overlay = document.getElementById('confirm-modal-overlay');
    const titleEl = document.getElementById('confirm-modal-title');
    const msgEl = document.getElementById('confirm-modal-msg');
    const okBtn = document.getElementById('confirm-modal-ok-btn');
    if (!overlay || !okBtn) {
      if (typeof onConfirm === 'function') onConfirm();
      return;
    }
    if (titleEl) titleEl.textContent = title || 'تأیید عملیات';
    if (msgEl) msgEl.textContent = message || '';
    pendingConfirmCallback = onConfirm;
    okBtn.onclick = function () {
      const cb = pendingConfirmCallback;
      closeConfirmModal();
      if (typeof cb === 'function') cb();
    };
    overlay.classList.add('show');
  }

  window.closeConfirmModal = function () {
    pendingConfirmCallback = null;
    const overlay = document.getElementById('confirm-modal-overlay');
    if (overlay) overlay.classList.remove('show');
  };

  // ==========================================================
  // JALALI CALENDAR & STREAK ENGINE
  // ==========================================================
  function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 0) days = (days - 1) % 365;
    let jm, jd;
    if (days < 186) {
      jm = 1 + Math.floor(days / 31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days - 186) / 30);
      jd = 1 + ((days - 186) % 30);
    }
    return { jy, jm, jd };
  }

  function getJalaliDateString(d = new Date()) {
    const { jy, jm, jd } = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const weekDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return `${weekDays[d.getDay()]}، ${toPersianDigits(jd)} ${months[jm - 1]} ${toPersianDigits(jy)}`;
  }

  function getLocalDateString(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getDaysDifference(dateStr1, dateStr2) {
    const [y1, m1, d1] = dateStr1.split('-').map(Number);
    const [y2, m2, d2] = dateStr2.split('-').map(Number);
    return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / MS_DAY);
  }

  // ==========================================================
  // NATIVE ANDROID STORAGE MIRROR (RESILIENCE AGAINST CACHE CLEAR)
  // ==========================================================
  function writeNativeMirror() {
    if (!window.AndroidBridge || typeof window.AndroidBridge.saveDatabase !== 'function') return null;
    try {
      const snapshot = {
        version: APP_VERSION,
        activeGradeId: currentGradeId,
        settings: appSettings,
        gamification: userGamification,
        weeklyHistory: weeklyHistory,
        allGradesProgress: getAllGradesProgress()
      };
      return window.AndroidBridge.saveDatabase(JSON.stringify(snapshot)) !== false;
    } catch (e) { return false; }
  }

  function scheduleNativeMirrorSave() {
    if (restoreInProgress || !window.AndroidBridge || typeof window.AndroidBridge.saveDatabase !== 'function') return;
    clearTimeout(mirrorSaveTimer);
    mirrorSaveTimer = setTimeout(writeNativeMirror, 350);
  }

  function restoreFromNativeMirrorIfNeeded() {
    if (!window.AndroidBridge || typeof window.AndroidBridge.loadDatabase !== 'function') return;
    try {
      const hasLocal = localStorage.getItem('farhanglex_settings_v21') || localStorage.getItem('farhanglex_gamification_v30');
      if (hasLocal) return;
      const raw = window.AndroidBridge.loadDatabase();
      if (!raw) return;
      const snap = JSON.parse(raw);
      if (!snap || typeof snap !== 'object') return;
      if (snap.activeGradeId) {
        currentGradeId = snap.activeGradeId;
        localStorage.setItem('active_grade_id', currentGradeId);
      }
      if (snap.settings) localStorage.setItem('farhanglex_settings_v21', JSON.stringify(snap.settings));
      if (snap.gamification) localStorage.setItem('farhanglex_gamification_v30', JSON.stringify(snap.gamification));
      if (snap.weeklyHistory) localStorage.setItem('farhanglex_weekly_history', JSON.stringify(snap.weeklyHistory));
      if (snap.allGradesProgress) {
        Object.entries(snap.allGradesProgress).forEach(([k, val]) => {
          // custom_* teacher vocabulary is dropped (removed entirely in 4.2.1).
          if (!k.startsWith('custom_')) {
            localStorage.setItem(`farhanglex_progress_${k}`, JSON.stringify(val));
          }
        });
      }
    } catch (e) {}
  }

  // ==========================================================
  // SCIENTIFIC SM-2 SRS INTERVALS
  // ==========================================================
  function mapIntervalToBox(iv) {
    if (iv >= 16) return 5;
    if (iv >= 8) return 4;
    if (iv >= 4) return 3;
    if (iv >= 2) return 2;
    return 1;
  }

  function calculateSM2Intervals(st) {
    const ef = st.easeFactor || 2.5;
    const reps = st.repetitions || 0;
    const iv = st.interval || 1;

    const hardDays = (reps === 0) ? 1 : Math.max(1, Math.round(iv * 1.2));
    let goodDays;
    if (reps === 0) goodDays = 1;
    else if (reps === 1) goodDays = 3;
    else goodDays = Math.max(1, Math.round(iv * ef));

    let easyDays;
    if (reps === 0) easyDays = 3;
    else if (reps === 1) easyDays = 6;
    else easyDays = Math.max(1, Math.round(iv * ef * 1.3));

    return {
      again: { text: '۱۰ دقیقه', days: 0 },
      hard: { text: `${toPersianDigits(hardDays)} روز`, days: hardDays },
      good: { text: `${toPersianDigits(goodDays)} روز`, days: goodDays },
      easy: { text: `${toPersianDigits(easyDays)} روز`, days: easyDays }
    };
  }

  // ==========================================================
  // INITIALIZATION & HARDWARE HANDLERS
  // ==========================================================
  async function init() {
    // Resolve any interrupted cross-storage restore BEFORE reading settings, grade data or the native mirror.
    // If the required IDB is unavailable, keep the journal and stop rather than guess which version won.
    const hasRestoreJournal = localStorage.getItem('farhanglex_restore_journal_v1') !== null;
    let dbReady = false;
    if (window.FarhangLexDB) {
      try { await window.FarhangLexDB.init(); dbReady = true; }
      catch (e) { if (hasRestoreJournal) throw e; }
    }
    if (hasRestoreJournal) {
      if (!dbReady || typeof window.FarhangLexDB.recoverBackupJournal !== 'function') throw new Error('بازیابی ناتمام به پایگاه اصلی نیاز دارد');
      await window.FarhangLexDB.recoverBackupJournal();
    }
    restoreFromNativeMirrorIfNeeded();
    if (dbReady && typeof window.FarhangLexDB.isUsingFallback === 'function' && window.FarhangLexDB.isUsingFallback()) window.FarhangLexDB._loadFallbackFromLocalStorage();
    loadSettings();
    applyTheme();
    if (appSettings.appearanceNoticePending) {
      appSettings.appearanceNoticePending = false;
      setTimeout(() => { showToast('🌗 ظاهر برنامه از این پس مثل روز و شبِ گوشی است؛ در تنظیمات قابل تغییر است'); saveSettings(); }, 1600);
    }
    setupGamification();
    renderGradeChips();
    setupHardwareHandlers();
    updateSettingsUI();

    const verEl = document.getElementById('app-about-version');
    if (verEl) verEl.textContent = 'نسخهٔ ' + APP_VERSION;

    if (dbReady && window.MASTER_CURRICULUM) {
      try { await window.FarhangLexDB.migrateFromLocalStorage(window.MASTER_CURRICULUM); } catch (e) {}
    }

    await loadGrade(currentGradeId);
  }

  function setupHardwareHandlers() {
    function unlock() {
      if (audioUnlocked) return;
      audioUnlocked = true;
      try {
        const silent = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
        silent.play().catch(() => {});
      } catch (e) {}
    }
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click', unlock, { once: true, passive: true });

    // Fixed in v3.1.0: Returns exact 'HANDLED' / 'EXIT' contract expected by MainActivity.java!
    window.handleAndroidBack = function () {
      if (restoreInProgress) return 'HANDLED';
      const modals = [
        'confirm-modal-overlay',
        'settings-modal-overlay',
        'shop-modal-overlay',
        'stats-modal-overlay',
        'streak-modal-overlay',
        'grade-modal-overlay',
        'word-modal-overlay',
        'img-lightbox-overlay',
        'further-reader-overlay'
      ];
      for (const mId of modals) {
        const m = document.getElementById(mId);
        if (m && m.classList.contains('show')) {
          if (mId === 'further-reader-overlay' && typeof window.closeFurtherText === 'function') window.closeFurtherText();
          else m.classList.remove('show');
          return 'HANDLED';
        }
      }
      // v3.11 — any other open sheet (a future one included) also closes with Back instead of leaving the tab below
      const openSheets = document.querySelectorAll('.modal-overlay.show');
      if (openSheets.length) { openSheets[openSheets.length - 1].classList.remove('show'); return 'HANDLED'; }

      if (currentTabName === 'leitner' && isCardFlipped) {
        window.flipCard();
        return 'HANDLED';
      }

      if (currentTabName === 'leitner' && isSessionMode) {
        exitSessionMode();
        showToast('از جلسهٔ مرور خارج شدید؛ پیشرفت ذخیره شد ✓');
        return 'HANDLED';
      }

      if (currentTabName !== 'home') {
        window.switchTab('home');
        return 'HANDLED';
      }

      return 'EXIT';
    };

    // Fixed in v3.1.0: Decodes UTF-8 Base64 sent from MainActivity.onActivityResult!
    window.__onNativeBackupImported = async function (b64OrJson) {
      try {
        const decoded = decodeBase64Utf8(b64OrJson);
        const data = JSON.parse(decoded);
        await applyImportedBackup(data);
      } catch (e) {
        showToast('⚠️ خطا در ساختار فایل پشتیبان دریافتی');
      }
    };

    // Expose helpers for testing
    window.calculateSM2Intervals = calculateSM2Intervals;
    window.mapIntervalToBox = mapIntervalToBox;
    window.getJalaliDateString = getJalaliDateString;
    window.getDaysDifference = getDaysDifference;
    window.createInflectionRegex = createInflectionRegex;
    window.renderTokenizedSentence = renderTokenizedSentence;
    window.applyQuizLeitnerImpact = applyQuizLeitnerImpact;
  }

  // ==========================================================
  // SETTINGS, THEME & GAMIFICATION
  // ==========================================================
  function loadSettings() {
    try {
      const s = localStorage.getItem('farhanglex_settings_v21');
      const stored = s ? JSON.parse(s) : null;
      if (stored) appSettings = Object.assign(appSettings, stored);
      // v3.11 migration: settings saved before «هماهنگ با گوشی» existed. A chosen dark palette stays dark; everyone
      // else follows the phone (by day they keep their own light palette). Told once with a short message.
      if (stored && !stored.appearance) {
        appSettings.appearance = isDarkSchemeTheme(appSettings.theme || 'default') ? 'dark' : 'auto';
        appSettings.appearanceNoticePending = appSettings.appearance === 'auto';
      }
      if (!appSettings.paceConfiguredV35) {
        if (!appSettings.dailyReviewTarget || appSettings.dailyReviewTarget === 30) {
          appSettings.dailyReviewTarget = 15;
        }
        appSettings.paceConfiguredV35 = true;
      }
    } catch (e) {}
  }

  // v3.11 (R7): a full phone storage made every save fail silently. The IndexedDB copy is still written; the learner is
  // told once (per run) to free some space. Other errors stay silent as before.
  // The warning comes 1.2 s after the save so the answer's own toast does not hide it at once; at most 3 times per run,
  // 30 s apart (a warning shown once under a quick next toast could be missed).
  let storageFullShown = 0, storageFullAt = 0;
  function noteStorageFull(e) {
    const quota = e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22 || e.code === 1014 || /quota/i.test(String(e.message || '')));
    if (!quota || storageFullShown >= 3 || Date.now() - storageFullAt < 30000) return;
    storageFullShown++; storageFullAt = Date.now();
    try { if (window.SafetyNet) window.SafetyNet.log('storage full: ' + (e.message || e.name), 'app.js'); } catch (x) {}
    setTimeout(() => showToast('⚠️ حافظهٔ گوشی پر است و ممکن است پیشرفت ذخیره نشود؛ لطفاً کمی فضا آزاد کنید.'), 1200);
  }

  function saveSettings() {
    if (restoreInProgress) return;
    try {
      localStorage.setItem('farhanglex_settings_v21', JSON.stringify(appSettings));
    } catch (e) { noteStorageFull(e); }
    try { if (window.FarhangLexDB) window.FarhangLexDB.saveSettings(appSettings).catch(() => {}); } catch (e) {}
    updateSettingsUI();
    scheduleNativeMirrorSave();
  }

  // ==========================================================
  // SUBTLE CHEERFUL WEB AUDIO SYNTHESIZER (ZERO-FILE, 0ms LAG)
  // ==========================================================
  let sfxCtx = null;
  function getSfxContext() {
    if (appSettings.sfxEnabled === false) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!sfxCtx) sfxCtx = new AC();
      if (sfxCtx.state === 'suspended') sfxCtx.resume().catch(() => {});
      return sfxCtx;
    } catch (e) {
      return null;
    }
  }

  function scheduleTone(ctx, freq, startOffset, duration, peakGain, waveType) {
    try {
      const now = ctx.currentTime + startOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType || 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.014);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.015);
    } catch (e) {}
  }

  function playSfx(kind, comboVal) {
    if (appSettings.sfxEnabled === false) return;
    const ctx = getSfxContext();
    if (!ctx) return;

    if (kind === 'correct') {
      // Crisp, warm 2-note Duolingo-inspired bell chime (E5 -> B5)
      scheduleTone(ctx, 659.25, 0.0, 0.11, 0.11, 'sine');
      scheduleTone(ctx, 987.77, 0.065, 0.16, 0.12, 'triangle');
    } else if (kind === 'combo') {
      // Sparkling ascending 3-note arpeggio (scales slightly with combo!)
      const step = Math.min(4, Math.max(0, (comboVal || 3) - 3));
      const mult = Math.pow(1.059463, step);
      scheduleTone(ctx, 698.46 * mult, 0.0, 0.09, 0.11, 'triangle');
      scheduleTone(ctx, 880.00 * mult, 0.055, 0.11, 0.12, 'triangle');
      scheduleTone(ctx, 1174.66 * mult, 0.11, 0.18, 0.13, 'sine');
    } else if (kind === 'victory') {
      // Joyful 4-note major fanfare for Achievements, Theme Unlock & Trophy Screen
      scheduleTone(ctx, 523.25, 0.0, 0.11, 0.11, 'triangle');
      scheduleTone(ctx, 659.25, 0.08, 0.11, 0.12, 'triangle');
      scheduleTone(ctx, 783.99, 0.16, 0.12, 0.12, 'triangle');
      scheduleTone(ctx, 1046.50, 0.25, 0.28, 0.14, 'sine');
    } else if (kind === 'wrong') {
      // Very gentle, non-stressful soft low wooden tap
      scheduleTone(ctx, 210, 0.0, 0.07, 0.065, 'sine');
      scheduleTone(ctx, 165, 0.05, 0.10, 0.06, 'sine');
    }
  }

  function isDarkSchemeTheme(t) {
    return t === 'dark' || t === 'slate' || t === 'sapphire' || t === 'amethyst' || t === 'oled' || t === 'aurora' || t === 'grandmaster';
  }

  // v3.11 — is the PHONE in night mode? A WebView reports prefers-color-scheme from the app theme, not from the
  // phone, so the native side is asked first (AndroidBridge.isSystemDark); a browser falls back to the media query.
  function systemIsDark() {
    const b = window.AndroidBridge;
    if (b && typeof b.isSystemDark === 'function') { try { return !!b.isSystemDark(); } catch (e) {} }
    try { return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); } catch (e) { return false; }
  }
  function paletteFor(dark) {
    const t = appSettings.theme || 'default';
    if (dark) return appSettings.darkPalette || (isDarkSchemeTheme(t) ? t : 'dark');
    return appSettings.lightPalette || (isDarkSchemeTheme(t) ? 'default' : t);
  }
  function effectiveTheme() {
    const mode = appSettings.appearance || 'auto';
    return paletteFor(mode === 'dark' || (mode === 'auto' && systemIsDark()));
  }
  function rememberPalettePick(themeId) {
    const dark = isDarkSchemeTheme(themeId);
    if (dark) appSettings.darkPalette = themeId; else appSettings.lightPalette = themeId;
    const mode = appSettings.appearance || 'auto';
    if (mode !== 'auto' || systemIsDark() !== dark) appSettings.appearance = dark ? 'dark' : 'light';
  }
  window.setAppearance = function (mode) {
    if (!/^(auto|light|dark)$/.test(mode)) return;
    appSettings.appearance = mode;
    applyTheme();
    saveSettings();
    showToast(mode === 'auto' ? '🌗 ظاهر برنامه مثل گوشی شد' : (mode === 'dark' ? '🌙 ظاهر تیره' : '☀️ ظاهر روشن'));
  };
  // called by MainActivity when the phone switches day/night while the app is open or comes back from background
  window.flxOnSystemNightChanged = function () { if ((appSettings.appearance || 'auto') === 'auto') applyTheme(); };
  try {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq) { const f = () => window.flxOnSystemNightChanged(); if (mq.addEventListener) mq.addEventListener('change', f); else if (mq.addListener) mq.addListener(f); }
  } catch (e) {}

  function applyTheme() {
    const t = effectiveTheme();
    try { localStorage.setItem('flx_theme_hint', JSON.stringify({ a: appSettings.appearance || 'auto', l: paletteFor(false), d: paletteFor(true) })); } catch (e) {}
    if (t === 'default' || t === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
    document.documentElement.setAttribute('data-scheme', isDarkSchemeTheme(t) ? 'dark' : 'light');

    if (window.AndroidBridge && typeof window.AndroidBridge.setThemeBars === 'function') {
      try { window.AndroidBridge.setThemeBars(t); } catch (e) {}
    } else if (window.AndroidBridge && typeof window.AndroidBridge.setDarkMode === 'function') {
      try { window.AndroidBridge.setDarkMode(isDarkSchemeTheme(t)); } catch (e) {}
    }
  }

  window.openSettingsModal = function () {
    const modal = document.getElementById('settings-modal-overlay');
    if (!modal) return;
    updateSettingsUI();
    modal.classList.add('show');
  };

  window.closeSettingsModal = function () {
    const modal = document.getElementById('settings-modal-overlay');
    if (modal) modal.classList.remove('show');
  };

  function updateActiveRecallUI() {
    const btn = document.getElementById('chip-active-recall-btn');
    if (btn) {
      if (appSettings.activeRecall) {
        btn.classList.add('active');
        btn.textContent = '🧠 ۴گزینه‌ای';
      } else {
        btn.classList.remove('active');
        btn.textContent = '🧠 ساده';
      }
    }
  }

  function updateSettingsUI() {
    const themeBtn = document.getElementById('settings-theme-btn');
    const themeStatus = document.getElementById('settings-theme-status');
    const sfxBtn = document.getElementById('settings-sfx-btn');
    const autoBtn = document.getElementById('settings-autoplay-btn');
    const recallBtn = document.getElementById('settings-recall-btn');
    const accentBtn = document.getElementById('settings-accent-btn');

    const eff = effectiveTheme();
    const curThemeObj = THEMES_CATALOG.find(x => x.id === eff) || THEMES_CATALOG[0];
    const isDark = isDarkSchemeTheme(eff);
    if (themeBtn) themeBtn.innerHTML = isDark ? '☀️ روشن' : '🌙 تیره';
    const mode = appSettings.appearance || 'auto';
    document.querySelectorAll('[data-appearance]').forEach(b => {
      const on = b.getAttribute('data-appearance') === mode;
      b.classList.toggle('active', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    if (themeStatus) {
      const modeFa = mode === 'auto' ? 'هماهنگ با گوشی' : (mode === 'dark' ? 'تیره' : 'روشن');
      themeStatus.textContent = `${curThemeObj.icon} ${curThemeObj.name} • ${modeFa}`;
    }
    if (sfxBtn) {
      const sfxOn = appSettings.sfxEnabled !== false;
      sfxBtn.innerHTML = sfxOn ? '🎵 روشن' : '🔇 خاموش';
      sfxBtn.classList.toggle('active', sfxOn);
    }
    if (accentBtn) {
      accentBtn.innerHTML = appSettings.accent === 'en-GB' ? '🇬🇧 بریتانیایی (UK)' : '🇺🇸 آمریکایی (US)';
    }
    if (autoBtn) {
      autoBtn.innerHTML = appSettings.autoPlay ? '🔊 روشن' : '🔈 خاموش';
      autoBtn.classList.toggle('active', !!appSettings.autoPlay);
    }
    if (recallBtn) {
      recallBtn.innerHTML = appSettings.activeRecall ? '🧠 روشن' : '🧠 خاموش';
      recallBtn.classList.toggle('active', !!appSettings.activeRecall);
    }
    updateActiveRecallUI();
  }

  window.toggleTheme = function () {
    // kept for old callers: flips between an explicit light and an explicit dark look
    if (isDarkSchemeTheme(effectiveTheme())) { appSettings.appearance = 'light'; } else { appSettings.appearance = 'dark'; }
    const isDark = appSettings.appearance === 'light';
    appSettings.theme = isDark ? paletteFor(false) : paletteFor(true);
    applyTheme();
    saveSettings();
    showToast(appSettings.theme === 'dark' ? '🌙 ظاهر تیره فعال شد' : '☀️ ظاهر روشن فعال شد');
  };

  window.toggleSfx = function () {
    appSettings.sfxEnabled = (appSettings.sfxEnabled === false);
    saveSettings();
    if (appSettings.sfxEnabled) playSfx('correct');
    showToast(appSettings.sfxEnabled ? 'افکت‌های صوتی تشویقی فعال شد 🎵' : 'افکت‌های صوتی تشویقی خاموش شد 🔇');
  };

  const GRADE_SHORT_FA = {
    prospect_1: { book: 'Prospect 1', gradeFa: 'هفتم' },
    prospect_2: { book: 'Prospect 2', gradeFa: 'هشتم' },
    prospect_3: { book: 'Prospect 3', gradeFa: 'نهم' },
    vision_1: { book: 'Vision 1', gradeFa: 'دهم' },
    vision_2: { book: 'Vision 2', gradeFa: 'یازدهم' },
    vision_3: { book: 'Vision 3', gradeFa: 'دوازدهم' }
  };

  function getWordGradeAndLessonMeta(item) {
    const rawId = (item && item.id) ? String(item.id) : '';
    const prefix = rawId.includes(':') ? rawId.split(':')[0] : '';
    const gId = (GRADE_SHORT_FA[prefix] ? prefix : currentGradeId) || 'vision_1';
    const meta = GRADE_SHORT_FA[gId] || { book: (gradeData && gradeData.name) || 'Vision 1', gradeFa: '' };
    const mcGrades = (window.MASTER_CURRICULUM && window.MASTER_CURRICULUM.grades) || {};
    const gObj = mcGrades[gId] || gradeData || {};
    const lNum = item && item.lesson ? item.lesson : 1;
    const lObj = (gObj.lessons || []).find(l => Number(l.id) === Number(lNum));
    return {
      gradeId: gId,
      book: meta.book,
      gradeFa: meta.gradeFa,
      bookWithGrade: meta.gradeFa ? `${meta.book} (${meta.gradeFa})` : meta.book,
      lessonNum: lNum,
      lessonTitleFa: lObj && lObj.titleFa ? lObj.titleFa : '',
      lessonTitleEn: lObj && lObj.title ? lObj.title : '',
      page: item && item.page ? item.page : null,
      source: getWordSource(item)
    };
  }

  // v3.6.0: where a word comes from, checked against the textbooks (Student Book / Workbook / supplementary)
  function getWordSource(item) {
    if (!item) return 'book';
    if (item.source === 'workbook' || item.source === 'extra') return item.source;
    return (item.source === 'book' || item.isOfficial) ? 'book' : (item.source || 'sample');
  }

  function formatBookExampleHtml(item) {
    if (!item) return '';
    const src = getWordSource(item);
    if (src === 'extra') {
      return item.extraNote ? `<div class="book-ex book-ex-extra">✨ ${escapeHtml(item.extraNote)}</div>` : '';
    }
    const be = item.bookExample;
    if (!be || !be.text) return '';
    const where = be.part === 'WB' ? '📒 جملهٔ کتاب کار' : '📖 جملهٔ کتاب درسی';
    const label = `${where} • ص ${toPersianDigits(be.page)}`;
    if (item.exampleSource === 'book' && be.text === item.example) {
      return `<div class="book-ex"><span class="book-ex-label">${label} (همان جملهٔ بالا)</span></div>`;
    }
    const rx = createInflectionRegex(item.word);
    const hl = escapeHtml(be.text).replace(rx, '<span class="highlighted-term">$&</span>');
    return `<div class="book-ex"><span class="book-ex-label">${label}</span><bdi class="book-ex-text" dir="ltr">${hl}</bdi></div>`;
  }

  // The main example is labelled as a textbook sentence only when it really is one (exampleSource === 'book').
  function exampleLabelText(item) {
    if (item && item.exampleSource === 'book') {
      return (item.bookExample && item.bookExample.part === 'WB') ? 'جمله در بافت کتاب کار:' : 'جمله در بافت کتاب درسی:';
    }
    return 'جملهٔ نمونه:';
  }

  function setBookExample(anchorEl, item) {
    if (!anchorEl || !anchorEl.parentNode) return;
    let box = anchorEl.nextElementSibling;
    if (!box || !box.classList || !box.classList.contains('book-ex-wrap')) {
      box = document.createElement('div');
      box.className = 'book-ex-wrap';
      anchorEl.parentNode.insertBefore(box, anchorEl.nextSibling);
    }
    box.innerHTML = formatBookExampleHtml(item);
    box.style.display = box.innerHTML ? '' : 'none';
  }

  function formatLessonPageChip(item) {
    const m = getWordGradeAndLessonMeta(item);
    const titlePart = m.lessonTitleFa ? `: ${m.lessonTitleFa}` : '';
    const pagePart = m.source === 'extra' ? ' • تکمیلی'
      : (m.page ? ` • ${m.source === 'workbook' ? 'کتاب کار ' : ''}ص ${toPersianDigits(m.page)}` : '');
    return `درس ${toPersianDigits(m.lessonNum)}${titlePart}${pagePart}`;
  }

  function formatBookLessonBadge(item) {
    const m = getWordGradeAndLessonMeta(item);
    const titlePart = m.lessonTitleFa ? ` (${m.lessonTitleFa})` : '';
    const pagePart = m.page ? ` • ص ${toPersianDigits(m.page)}` : '';
    if (m.source === 'extra') {
      return `✨ واژهٔ تکمیلی • ${m.bookWithGrade} • درس ${toPersianDigits(m.lessonNum)}${titlePart}`;
    }
    if (m.source === 'workbook') {
      return `📒 کتاب کار ${m.bookWithGrade} • درس ${toPersianDigits(m.lessonNum)}${titlePart}${pagePart}`;
    }
    return `📖 ${m.bookWithGrade} • درس ${toPersianDigits(m.lessonNum)}${titlePart}${pagePart}`;
  }

  // v3.11 (F17): short book reference for the quiz/game cards: «📖 درس ۲ • ص ۵۱» (the grade is in the header; the long
  // badge wrapped to two lines on phones). A «book» claim always keeps its page.
  function formatQuizRefShort(item) {
    const m = getWordGradeAndLessonMeta(item);
    const lesson = `درس ${toPersianDigits(m.lessonNum)}`;
    const page = m.page ? ` • ص ${toPersianDigits(m.page)}` : '';
    if (m.source === 'extra') return `✨ تکمیلی • ${lesson}`;
    if (m.source === 'workbook') return `📒 کتاب کار • ${lesson}${page}`;
    return `📖 ${lesson}${page}`;
  }

  function formatBookLessonFull(item) {
    const m = getWordGradeAndLessonMeta(item);
    const titlePart = m.lessonTitleFa
      ? `: ${m.lessonTitleFa}` + (m.lessonTitleEn ? ` \u2066(${m.lessonTitleEn})\u2069` : '') // LRI…PDI keeps the brackets right when the line wraps
      : '';
    const pagePart = m.page ? ` • صفحهٔ ${toPersianDigits(m.page)}` : '';
    if (m.source === 'extra') {
      return `✨ واژهٔ تکمیلی (خارج از کتاب‌های ${m.book}) • درس ${toPersianDigits(m.lessonNum)}${titlePart}`;
    }
    if (m.source === 'workbook') {
      return `📒 کتاب کار ${m.book} (پایهٔ ${m.gradeFa || ''}) • درس ${toPersianDigits(m.lessonNum)}${titlePart}${pagePart}`;
    }
    return `📖 کتاب درسی ${m.book} (پایهٔ ${m.gradeFa || ''}) • درس ${toPersianDigits(m.lessonNum)}${titlePart}${pagePart}`;
  }

  function normalizePosGroup(pos, id) {
    if (id === 'vision_1:orbit') return 'noun';
    const p = String(pos || '').toLowerCase();
    if (p.includes('phrasal') || id === 'vision_3:look_up') return 'verb_phrasal';
    if (p.startsWith('verb')) return 'verb';
    if (p.startsWith('adj')) return 'adjective';
    if (p.startsWith('adv')) return 'adverb';
    if (p.startsWith('phrase')) return 'phrase';
    return 'noun';
  }

  function getAllGlobalVocabulary() {
    const out = [];
    const mcGrades = (window.MASTER_CURRICULUM && window.MASTER_CURRICULUM.grades) || {};
    Object.keys(mcGrades).forEach(gid => {
      (mcGrades[gid].vocabulary || []).forEach(v => {
        out.push(Object.assign({ _gradeId: gid }, v));
      });
    });
    if (gradeData && gradeData._combinedVocab) {
      gradeData._combinedVocab.forEach(v => {
        if (!out.some(x => x.id === v.id)) {
          out.push(Object.assign({ _gradeId: currentGradeId }, v));
        }
      });
    }
    return out;
  }

  // TEFL Psychometric Distractor Selector (100% Same-POS & Semantically Plausible)
  function getPsychometricDistractors(target, count) {
    const needed = count || 3;
    if (!target) return [];

    // Layer 1: Validated psychometric distractors curated per curriculum item
    if (Array.isArray(target.distractors) && target.distractors.length >= needed) {
      const copy = [...target.distractors];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
      }
      return copy.slice(0, needed).map(d => ({
        word: d.word,
        cloze: d.cloze || d.word,
        meaning: d.meaning
      }));
    }

    // Layer 2: Dynamic POS + Semantic Matcher
    const tPos = target.posGroup || normalizePosGroup(target.pos, target.id);
    const tSem = target.semanticGroup || '';
    const tWord = (target.word || '').trim().toLowerCase();
    const tSyns = (NEAR_SYNONYMS[tWord] || []).concat(relWords(target, 'synonyms').map(w => w.toLowerCase()));
    const pool = getAllGlobalVocabulary().filter(v => {
      if (v.id === target.id) return false;
      const w = (v.word || '').trim().toLowerCase();
      if (!w || w === tWord || v.meaning === target.meaning) return false;
      if (!isPictureQuizSafe(v)) return false;
      if (tSyns.includes(w)) return false;
      if (NEAR_SYNONYMS[w] && NEAR_SYNONYMS[w].includes(tWord)) return false;
      return true;
    });

    const scored = pool.map(v => {
      const vPos = v.posGroup || normalizePosGroup(v.pos, v.id);
      let score = Math.random() * 4;
      if (vPos === tPos) score += 100;
      else if ((tPos === 'verb' && vPos === 'verb_phrasal') || (tPos === 'verb_phrasal' && vPos === 'verb')) score += 60;
      else if ((tPos === 'adverb' && vPos === 'phrase') || (tPos === 'phrase' && vPos === 'adverb')) score += 50;
      if (tSem && v.semanticGroup === tSem) score += 50;
      if (v._gradeId === currentGradeId) score += 10;
      return { item: v, score };
    }).sort((a, b) => b.score - a.score);

    const seenMeanings = new Set([target.meaning]);
    const picked = [];
    for (let i = 0; i < scored.length && picked.length < needed; i++) {
      const cand = scored[i].item;
      if (seenMeanings.has(cand.meaning)) continue;
      seenMeanings.add(cand.meaning);
      picked.push({
        word: cand.word,
        cloze: cand.word,
        meaning: cand.meaning
      });
    }
    return picked;
  }

  // ── v3.10 · English synonyms / antonyms (Vision 1–3) and near-miss options (grades 11–12) ──
  // Data rules (familiar from an earlier lesson, not harder, same sense) are enforced by
  // tools/syn_tools/*_build.py and tests/test_v3100.js — the app only displays what passed.
  function relWords(v, kind) {
    return (v && Array.isArray(v[kind])) ? v[kind].map(x => x && x.word).filter(Boolean) : [];
  }
  function isUpperGrade(gid) { return gid === 'vision_2' || gid === 'vision_3'; }
  function shuffleCopy(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }
  function buildRelationsHtml(v) {
    const syn = relWords(v, 'synonyms');
    const ant = relWords(v, 'antonyms');
    if (!syn.length && !ant.length) return '';
    let html = '';
    if (syn.length) {
      html += `<div class="rel-row rel-syn"><span class="rel-lbl">≈ هم‌معنی</span><bdi class="rel-words" dir="ltr">${syn.map(escapeHtml).join(' · ')}</bdi></div>`;
    }
    if (ant.length) {
      html += `<div class="rel-row rel-ant"><span class="rel-lbl">↔ متضاد</span><bdi class="rel-words" dir="ltr">${ant.map(escapeHtml).join(' · ')}</bdi></div>`;
    }
    return html;
  }
  function fillRelationsBox(el, v) {
    if (!el) return false;
    const html = buildRelationsHtml(v);
    el.innerHTML = html;
    el.style.display = html ? 'block' : 'none';
    return !!html;
  }
  // English-only Leitner (grades 11–12, optional): only for cards that HAVE a valid synonym.
  // v3.11 (option A): EVERY grade 11–12 card has an English definition (defEn, ≤ 12 familiar words), so «فقط EN»
  // works on every card — not only on the 34 that have a synonym (the first card of every lesson had none).
  function isEnglishOnlyCard(card) {
    return !!(appSettings.englishOnly && isUpperGrade(card && (card._gradeId || currentGradeId)) && (card.defEn || relWords(card, 'synonyms').length));
  }
  // four English definitions for the front of the card (4-option recall in «فقط EN»): same lesson + part of speech first
  function getDefinitionChoices(card) {
    if (!card || !card.defEn) return null;
    const used = new Set([card.defEn]);
    const pick = [];
    const gid = card._gradeId || currentGradeId;
    const grade = (window.MASTER_CURRICULUM && window.MASTER_CURRICULUM.grades && window.MASTER_CURRICULUM.grades[gid]) || {};
    const pool = (grade.vocabulary || activeCards || []).filter(c => c && c.defEn && c.id !== card.id);
    const samePos = pool.filter(c => c.lesson === card.lesson && c.pos === card.pos);
    const sameLesson = pool.filter(c => c.lesson === card.lesson && c.pos !== card.pos);
    const others = pool.filter(c => c.lesson !== card.lesson && c.pos === card.pos);
    for (const c of [...shuffleCopy(samePos), ...shuffleCopy(sameLesson), ...shuffleCopy(others)]) {
      if (pick.length >= 3) break;
      if (used.has(c.defEn)) continue;
      used.add(c.defEn); pick.push(c.defEn);
    }
    return pick.length === 3 ? pick : null;
  }
  // Options for a «same meaning» question: distractors ∪ antonyms ∪ near-miss − synonyms − synExclude.
  function getSynonymQuizPool(v) {
    const syn = new Set(relWords(v, 'synonyms').map(w => w.toLowerCase()));
    const excl = new Set(((v.relQuiz && v.relQuiz.synExclude) || []).map(w => w.toLowerCase()));
    const out = [];
    const seen = new Set([String(v.word || '').toLowerCase()]);
    const push = w => {
      const k = String(w || '').toLowerCase();
      if (!k || seen.has(k) || syn.has(k) || excl.has(k)) return;
      seen.add(k); out.push(w);
    };
    (v.distractors || []).forEach(d => push(d.word));
    relWords(v, 'antonyms').forEach(push);
    (v.nearMiss || []).forEach(d => push(d.word));
    return out;
  }
  // Cloze test distractors: grades 11–12 items with near-miss options get up to two of them
  // (moderate difficulty) + regular distractors; never a synonym, never a duplicate.
  function getQuizDistractors(target, count) {
    const needed = count || 3;
    const gid = target && (target._gradeId || currentGradeId);
    const nm = (target && Array.isArray(target.nearMiss)) ? target.nearMiss : [];
    if (!target || !isUpperGrade(gid) || !nm.length) return getPsychometricDistractors(target, needed);
    const syn = new Set(relWords(target, 'synonyms').map(w => w.toLowerCase()));
    const picked = shuffleCopy(nm).slice(0, Math.min(2, needed)).map(d => ({ word: d.word, cloze: d.cloze || d.word, meaning: d.meaning, nearMiss: true }));
    const used = new Set([String(target.word).toLowerCase(), ...picked.map(d => d.word.toLowerCase())]);
    const regular = getPsychometricDistractors(target, needed).filter(d => {
      const k = String(d.word || '').toLowerCase();
      return k && !used.has(k) && !syn.has(k);
    });
    return shuffleCopy([...picked, ...regular.slice(0, needed - picked.length)]);
  }

  // Illustrated Visual Distractors for 4-Picture Game (POS + Semantic + Illustrated)
  function getIllustratedVisualDistractors(target, count) {
    const needed = count || 3;
    if (!target) return [];
    const tPos = target.posGroup || normalizePosGroup(target.pos, target.id);
    const tSem = target.semanticGroup || '';
    const tWord = (target.word || '').trim().toLowerCase();
    const tSyns = (NEAR_SYNONYMS[tWord] || []).concat(relWords(target, 'synonyms').map(w => w.toLowerCase()));

    const pool = getAllGlobalVocabulary().filter(v => {
      if (v.id === target.id) return false;
      // v3.8.7: distractors must be answer-safe too (no initials badge, no user word, no word written in the drawing) —
      // before, only the target was filtered and ~1 option per round could show a fallback badge or a flagged picture
      if (!isPictureQuizSafe(v)) return false;
      const w = (v.word || '').trim().toLowerCase();
      if (!w || w === tWord || v.meaning === target.meaning) return false;
      if (tSyns.includes(w)) return false;
      if (NEAR_SYNONYMS[w] && NEAR_SYNONYMS[w].includes(tWord)) return false;
      if ((VISUAL_CONFUSABLE[tWord] || []).includes(w) || (VISUAL_CONFUSABLE[w] || []).includes(tWord)) return false;
      return true;
    });

    const scored = pool.map(v => {
      const vPos = v.posGroup || normalizePosGroup(v.pos, v.id);
      let score = Math.random() * 6;
      if (vPos === tPos) score += 100;
      else if ((tPos === 'verb' && vPos === 'verb_phrasal') || (tPos === 'verb_phrasal' && vPos === 'verb')) score += 70;
      else if ((tPos === 'adverb' && vPos === 'phrase') || (tPos === 'phrase' && vPos === 'adverb')) score += 60;
      if (tSem && v.semanticGroup === tSem) score += 45;
      if (v._gradeId === currentGradeId) score += 8;
      return { item: v, score };
    }).sort((a, b) => b.score - a.score);

    const seenWords = new Set([tWord]);
    const picked = [];
    for (let i = 0; i < scored.length && picked.length < needed; i++) {
      const cand = scored[i].item;
      const cw = cand.word.toLowerCase();
      if (seenWords.has(cw)) continue;
      seenWords.add(cw);
      picked.push(cand);
    }
    return picked;
  }

  function getWordPhonetic(item) {
    if (!item) return '';
    if (appSettings && appSettings.accent === 'en-GB') {
      return item.phoneticUk || item.phonetic || '';
    }
    return item.phoneticUs || item.phonetic || '';
  }

  window.toggleAccent = function () {
    appSettings.accent = (appSettings.accent === 'en-GB') ? 'en-US' : 'en-GB';
    saveSettings();
    stopAllAudio();
    refreshModalSurfaceButton();
    if (furtherCurrent) {
      setupFurtherAudio(furtherCurrent); refreshFurtherAudioDisclosure(furtherCurrent);
      const sel = flxFurtherGlossSelection;
      if (sel && sel.textId === furtherCurrent.id) showFurtherGloss(sel.wordId ? furtherVocabById(sel.wordId) : null, sel.text);
    }
    // Live-update displayed Oxford IPA across Leitner card, Word modal, and active Games!
    const list = isSessionMode ? sessionQueue : activeCards;
    if (list && list[currentCardIndex]) {
      const phEl = document.getElementById('card-front-phonetic');
      if (phEl) phEl.textContent = getWordPhonetic(list[currentCardIndex]);
    }
    if (activeModalWordId && gradeData && gradeData._combinedVocab) {
      const mv = gradeData._combinedVocab.find(x => x.id === activeModalWordId);
      const mph = document.getElementById('modal-word-phonetic');
      if (mv && mph) mph.textContent = getWordPhonetic(mv);
    }
    if (window.CreativeGames && typeof window.CreativeGames.refreshActivePhonetics === 'function') {
      window.CreativeGames.refreshActivePhonetics();
    }
    renderGlossary();
    showToast(appSettings.accent === 'en-GB'
      ? 'لهجه و آوانگاری بریتانیایی آکسفورد (UK) فعال شد 🇬🇧'
      : 'لهجه و آوانگاری آمریکایی آکسفورد (US) فعال شد 🇺🇸');
  };

  window.toggleAutoPlay = function () {
    appSettings.autoPlay = !appSettings.autoPlay;
    saveSettings();
    showToast(`پخش خودکار ${appSettings.autoPlay ? 'فعال' : 'غیرفعال'} شد`);
  };

  // v3.10 — «فقط EN» for grades 11–12: Persian stays one tap away; cards without a valid synonym keep Persian.
  function updateEnglishOnlyUI() {
    const btn = document.getElementById('chip-en-only-btn');
    if (!btn) return;
    btn.style.display = isUpperGrade(currentGradeId) ? '' : 'none';
    btn.classList.toggle('active', !!appSettings.englishOnly);
    btn.setAttribute('aria-pressed', appSettings.englishOnly ? 'true' : 'false');
  }

  function applyCardRelations(card) {
    updateEnglishOnlyUI();
    const relBox = document.getElementById('card-back-rel');
    fillRelationsBox(relBox, card);
    const enOnly = isEnglishOnlyCard(card);
    const faEl = document.getElementById('card-back-meaning');
    const faReveal = document.getElementById('card-back-fa-reveal');
    const faLbl = document.getElementById('card-back-meaning-lbl');
    const defEl = document.getElementById('card-back-def');
    if (defEl) { defEl.textContent = (enOnly && card && card.defEn) ? card.defEn : ''; defEl.style.display = (enOnly && card && card.defEn) ? 'block' : 'none'; }
    if (faEl) faEl.style.display = enOnly ? 'none' : '';
    if (faReveal) faReveal.style.display = enOnly ? 'inline-flex' : 'none';
    if (faLbl) faLbl.textContent = enOnly ? 'معنی به انگلیسی:' : 'معنی رسمی فارسی:';
    if (relBox) relBox.classList.toggle('rel-strong', enOnly);
  }

  window.revealCardPersian = function () {
    const faEl = document.getElementById('card-back-meaning');
    const faReveal = document.getElementById('card-back-fa-reveal');
    const faLbl = document.getElementById('card-back-meaning-lbl');
    if (faEl) faEl.style.display = '';
    if (faReveal) faReveal.style.display = 'none';
    const defEl = document.getElementById('card-back-def');
    const both = defEl && defEl.style.display !== 'none' && defEl.textContent.trim();
    if (faLbl) faLbl.textContent = both ? 'معنی به انگلیسی و فارسی:' : 'معنی رسمی فارسی:';
    if (isCardFlipped) revealRatingButtons();   // the Persian line made the card taller
  };

  // v3.11 — a chip above the card changes the card IN PLACE: the open side stays open (it used to flip back).
  function rerenderKeepingSide() {
    const wasFlipped = isCardFlipped;
    renderCurrentCard();
    if (wasFlipped) {
      const flipper = document.getElementById('card-flipper-element');
      isCardFlipped = true;
      if (flipper) flipper.classList.add('flipped');
      syncCardFlipDrawerState();
    }
  }

  window.toggleEnglishOnly = function () {
    appSettings.englishOnly = !appSettings.englishOnly;
    saveSettings();
    rerenderKeepingSide();
    showToast(appSettings.englishOnly
      ? '🔤 فقط انگلیسی روشن شد؛ معنی فارسی با یک لمس'
      : 'معنی فارسی دوباره کنار هم‌معنی‌ها نمایش داده می‌شود');
  };

  window.toggleActiveRecall = function () {
    appSettings.activeRecall = !appSettings.activeRecall;
    saveSettings();
    rerenderKeepingSide();
    showToast(`یادآوری فعال ${appSettings.activeRecall ? 'روشن' : 'خاموش'} شد`);
  };

  let achBannerTimer = null;
  let achBannerQueue = [];

  function offsetDateString(dateStr, deltaDays) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + deltaDays));
    return dt.toISOString().slice(0, 10);
  }

  function getLevelProgressInfo(xpVal) {
    const xp = Math.max(0, Math.floor(xpVal || 0));
    let level = 1;
    let rem = xp;
    let needed = 120;
    while (rem >= needed && level < 50) {
      rem -= needed;
      level++;
      needed = 120 + (level - 1) * 40;
    }
    const pct = Math.min(100, Math.round((rem / needed) * 100));
    return { level, xp, rem, needed, pct };
  }

  function awardXP(amount) {
    if (!amount || amount <= 0) return;
    const beforeLvl = getLevelProgressInfo(userGamification.xp || 0).level;
    userGamification.xp = (userGamification.xp || 0) + amount;
    const afterLvl = getLevelProgressInfo(userGamification.xp).level;
    if (afterLvl > beforeLvl) {
      const bonusGems = 15;
      userGamification.gems = (userGamification.gems || 0) + bonusGems;
      userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems);
      achBannerQueue.push({
        icon: '⭐',
        name: `ارتقا به سطح علمی ${toPersianDigits(afterLvl)}!`,
        reward: bonusGems
      });
      showNextAchBanner();
    }
  }

  function computeGlobalAchievementMetrics() {
    const allGradeIds = ['prospect_1', 'prospect_2', 'prospect_3', 'vision_1', 'vision_2', 'vision_3'];
    const rawCurriculum = window.MASTER_CURRICULUM || {};
    let totalReviews = 0;
    let totalSuccess = 0;
    let starredCount = 0;
    let box3PlusCount = 0;
    let masteredCount = 0;
    let lessonsMastered = 0;

    allGradeIds.forEach(gid => {
      let progMap = null;
      if (gid === currentGradeId && userProgress) {
        progMap = userProgress;
      } else {
        try {
          const raw = localStorage.getItem(`farhanglex_progress_${gid}`);
          if (raw) progMap = JSON.parse(raw);
        } catch (e) {}
      }

      if (progMap) {
        Object.values(progMap).forEach(st => {
          if (!st) return;
          const s = st.success || 0;
          const f = st.fail || 0;
          totalReviews += s + f;
          totalSuccess += s;
          if (st.starred) starredCount++;
          if ((st.box || 1) >= 3) box3PlusCount++;
          if ((st.box || 1) === 5) masteredCount++;
        });
      }

      const gObj = rawCurriculum[gid] || (rawCurriculum.grades && rawCurriculum.grades[gid]);
      if (gObj && Array.isArray(gObj.lessons) && Array.isArray(gObj.vocabulary) && progMap) {
        gObj.lessons.forEach(ls => {
          const words = gObj.vocabulary.filter(w => w.lesson === ls.id);
          if (words.length > 0 && words.every(w => progMap[w.id] && (progMap[w.id].box || 1) >= 3)) {
            lessonsMastered++;
          }
        });
      }
    });

    const unlockedThemes = userGamification.unlockedThemes || ['default', 'dark'];
    const paidThemesCount = unlockedThemes.filter(t => t !== 'default' && t !== 'dark' && t !== 'light' && t !== 'slate').length;
    const peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems || 0);
    const bestStreak = Math.max(userGamification.bestStreak || 0, userGamification.streak || 0);

    return {
      totalReviews,
      totalSuccess,
      starredCount,
      box3PlusCount,
      masteredCount,
      lessonsMastered,
      gamesCompleted: userGamification.gamesCompleted || 0,
      bestCombo: userGamification.bestCombo || 0,
      streak: userGamification.streak || 0,
      bestStreak,
      highAccuracySessions: userGamification.highAccuracySessions || 0,
      questChestsOpened: userGamification.questChestsOpened || 0,
      spellingCorrectTotal: userGamification.spellingCorrectTotal || 0,
      peakGems,
      paidThemesCount
    };
  }

  function getTotalAchievementStars() {
    const bt = userGamification.badgeTiers || {};
    return BADGES_CATALOG.reduce((sum, bg) => sum + Math.min(4, Math.max(0, bt[bg.id] || 0)), 0);
  }

  function getUserRankInfo(starCount) {
    let cur = RANKS_LADDER[0];
    for (let i = 0; i < RANKS_LADDER.length; i++) {
      if (starCount >= RANKS_LADDER[i].minStars) cur = RANKS_LADDER[i];
    }
    return cur;
  }

  function showNextAchBanner() {
    if (achBannerTimer || achBannerQueue.length === 0) return;
    const bg = achBannerQueue.shift();
    const banner = document.getElementById('achievement-unlock-banner');
    if (!banner) return;
    const ico = document.getElementById('ach-banner-icon');
    const ttl = document.getElementById('ach-banner-title');
    const rew = document.getElementById('ach-banner-reward');
    if (ico) ico.textContent = bg.icon;
    if (ttl) ttl.textContent = bg.name;
    if (rew) rew.textContent = bg.rewardText || `+${toPersianDigits(bg.reward || 0)} 💎`;

    banner.classList.add('show');
    playSfx('victory');
    triggerHaptic([40, 50, 70]);

    achBannerTimer = setTimeout(() => {
      banner.classList.remove('show');
      achBannerTimer = null;
      if (achBannerQueue.length > 0) {
        setTimeout(showNextAchBanner, 320);
      }
    }, 3400);
  }

  function checkAndUnlockAchievements(silentInit) {
    if (!userGamification.badgeTiers || typeof userGamification.badgeTiers !== 'object') {
      userGamification.badgeTiers = {};
    }
    if (!Array.isArray(userGamification.unlockedThemes)) {
      userGamification.unlockedThemes = ['default', 'dark'];
    }
    let metrics = computeGlobalAchievementMetrics();
    let changed = false;

    // 1. Check Prestige Mastery Themes first (unlocked solely by mastery/streak, never Gems)
    THEMES_CATALOG.forEach(th => {
      if (th.rarity !== 'prestige') return;
      if (userGamification.unlockedThemes.includes(th.id)) return;
      if ((metrics[th.prestigeMetric] || 0) >= th.prestigeTarget) {
        userGamification.unlockedThemes.push(th.id);
        changed = true;
        if (!silentInit) {
          achBannerQueue.push({
            icon: th.icon,
            name: `تم افتخاری باز شد: ${th.name}`,
            rewardText: '🏆 افتخاری'
          });
        }
      }
    });

    if (changed) metrics = computeGlobalAchievementMetrics();

    // 2. Check 4-Tier Progressive Achievements (Bronze ★ -> Silver ★★ -> Gold ★★★ -> Diamond ★★★★)
    BADGES_CATALOG.forEach(bg => {
      const curTier = userGamification.badgeTiers[bg.id] || 0;
      if (curTier >= 4) return;
      const val = metrics[bg.metric] || 0;
      let newTier = curTier;
      let gemsWon = 0;

      for (let t = curTier; t < 4; t++) {
        if (val >= bg.tiers[t]) {
          newTier = t + 1;
          gemsWon += bg.rewards[t];
        } else {
          break;
        }
      }

      if (newTier > curTier) {
        userGamification.badgeTiers[bg.id] = newTier;
        if (!Array.isArray(userGamification.unlockedBadges)) userGamification.unlockedBadges = [];
        if (!userGamification.unlockedBadges.includes(bg.id)) userGamification.unlockedBadges.push(bg.id);

        if (!silentInit) {
          userGamification.gems = (userGamification.gems || 0) + gemsWon;
          userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems);
          awardXP(newTier * 20);
          achBannerQueue.push({
            icon: bg.icon,
            name: `${bg.name} • ${TIER_NAMES_FA[newTier]}`,
            reward: gemsWon
          });
        }
        changed = true;
      }
    });

    if (changed) {
      saveGamification();
      if (!silentInit) showNextAchBanner();
    } else {
      updateHomeRewardsBanner();
    }
  }

  function ensureTodayQuests() {
    const todayStr = getLocalDateString();
    if (!userGamification.dailyQuests || userGamification.dailyQuests.date !== todayStr) {
      userGamification.dailyQuests = {
        date: todayStr,
        leitnerCount: 0,
        highAccCount: 0,
        spellingCount: 0,
        c1: false,
        c2: false,
        c3: false,
        chest: false
      };
    }
    return userGamification.dailyQuests;
  }

  function evaluateDailyQuestRewards() {
    const dq = ensureTodayQuests();
    let changed = false;

    if (!dq.c1 && dq.leitnerCount >= 10) {
      dq.c1 = true;
      userGamification.gems = (userGamification.gems || 0) + 8;
      awardXP(25);
      showToast('🎯 مأموریت ۱ تکمیل شد: ۱۰ مرور لایتنر (+۸ 💎)');
      changed = true;
    }
    if (!dq.c2 && dq.highAccCount >= 1) {
      dq.c2 = true;
      userGamification.gems = (userGamification.gems || 0) + 10;
      awardXP(30);
      showToast('🎯 مأموریت ۲ تکمیل شد: جلسه با دقت بالای ۸۰٪ (+۱۰ 💎)');
      changed = true;
    }
    if (!dq.c3 && dq.spellingCount >= 4) {
      dq.c3 = true;
      userGamification.gems = (userGamification.gems || 0) + 12;
      awardXP(30);
      showToast('🎯 مأموریت ۳ تکمیل شد: ۴ املای صحیح فعال (+۱۲ 💎)');
      changed = true;
    }
    if (dq.c1 && dq.c2 && dq.c3 && !dq.chest) {
      dq.chest = true;
      userGamification.questChestsOpened = (userGamification.questChestsOpened || 0) + 1;
      userGamification.gems = (userGamification.gems || 0) + 25;
      userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems);
      awardXP(80);
      achBannerQueue.push({
        icon: '🎁',
        name: 'صندوقچهٔ طلایی مأموریت‌های امروز باز شد!',
        reward: 25
      });
      changed = true;
    }

    if (changed) {
      saveGamification();
      checkAndUnlockAchievements(false);
      showNextAchBanner();
    } else {
      renderDailyQuestsCard();
    }
  }

  function recordSessionAccuracy(correctCount, totalCount) {
    if (!totalCount || totalCount < 4) return;
    const acc = correctCount / totalCount;
    if (acc >= 0.8) {
      userGamification.highAccuracySessions = (userGamification.highAccuracySessions || 0) + 1;
      const dq = ensureTodayQuests();
      dq.highAccCount = (dq.highAccCount || 0) + 1;
      awardXP(18);
      saveGamification();
      evaluateDailyQuestRewards();
      checkAndUnlockAchievements(false);
    }
  }

  function recordSpellingMastery() {
    userGamification.spellingCorrectTotal = (userGamification.spellingCorrectTotal || 0) + 1;
    const dq = ensureTodayQuests();
    dq.spellingCount = (dq.spellingCount || 0) + 1;
    awardXP(10);
    saveGamification();
    evaluateDailyQuestRewards();
    checkAndUnlockAchievements(false);
  }

  function renderDailyQuestsCard() {
    const wrap = document.getElementById('home-daily-quests-list');
    const chestPill = document.getElementById('home-dq-chest-pill');
    if (!wrap) return;
    const dq = ensureTodayQuests();

    if (chestPill) {
      chestPill.classList.toggle('done', !!dq.chest);
      chestPill.textContent = dq.chest ? '✅ صندوقچه دریافت شد' : '🎁 صندوقچه: +۲۵ 💎';
    }

    const items = [
      { ico: '🗂️', title: 'مرور ۱۰ کارت در جعبهٔ لایتنر', cur: Math.min(10, dq.leitnerCount || 0), max: 10, rew: '+۸ 💎', done: dq.c1 },
      { ico: '🎯', title: 'تکمیل ۱ جلسه یا بازی با دقت بالای ۸۰٪', cur: Math.min(1, dq.highAccCount || 0), max: 1, rew: '+۱۰ 💎', done: dq.c2 },
      { ico: '✍️', title: 'ثبت ۴ املای صحیح (تایپی، دیکته یا حروف‌چین)', cur: Math.min(4, dq.spellingCount || 0), max: 4, rew: '+۱۲ 💎', done: dq.c3 }
    ];

    wrap.innerHTML = items.map(q => {
      const pct = Math.min(100, Math.round((q.cur / q.max) * 100));
      return `
        <div class="dq-row ${q.done ? 'done' : ''}">
          <span class="dq-ico">${q.done ? '✅' : q.ico}</span>
          <div class="dq-main">
            <div class="dq-lbl-line">
              <span>${q.title}</span>
              <span style="color:var(--emerald-dark); font-size:12px;">${q.done ? 'تکمیل' : `${toPersianDigits(q.cur)}/${toPersianDigits(q.max)} (${q.rew})`}</span>
            </div>
            <div class="dq-track"><div class="dq-fill" style="width:${pct}%;"></div></div>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateHomeRewardsBanner() {
    const stars = getTotalAchievementStars();
    const maxStars = BADGES_CATALOG.length * 4;
    const rank = getUserRankInfo(stars);
    const lvlInfo = getLevelProgressInfo(userGamification.xp || 0);
    const icoEl = document.getElementById('home-rank-icon');
    const ttlEl = document.getElementById('home-rank-title');
    const subEl = document.getElementById('home-rewards-sub');
    if (icoEl) icoEl.textContent = rank.icon;
    if (ttlEl) ttlEl.textContent = `سطح ${toPersianDigits(lvlInfo.level)} • ${rank.title}`;
    if (subEl) {
      const curTheme = THEMES_CATALOG.find(x => x.id === (appSettings.theme || 'default')) || THEMES_CATALOG[0];
      subEl.textContent = `★ ${toPersianDigits(stars)}/${toPersianDigits(maxStars)} ستاره • ${toPersianDigits(userGamification.xp || 0)} XP • تم ${curTheme.name}`;
    }
    renderDailyQuestsCard();
  }

  // Reconcile missed days between lastStreakCreditedDate and today using Streak Freezes (🧊).
  // v3.11 (R14): not only at start-up — Android keeps the app in memory for days, so this also runs right before today
  // is credited and whenever the app comes back to the front. Returns true when something changed.
  function reconcileStreakGap() {
    const todayStr = getLocalDateString();
    const yesterdayStr = offsetDateString(todayStr, -1);
    if (!(userGamification.streak > 0 && userGamification.lastStreakCreditedDate && userGamification.lastStreakCreditedDate !== todayStr)) return false;
    const diff = getDaysDifference(userGamification.lastStreakCreditedDate, todayStr);
    const missedDays = diff - 1;
    if (!(missedDays > 0)) return false;
    if (missedDays <= (userGamification.streakFreezes || 0)) {
      for (let i = 1; i <= missedDays; i++) {
        const mDate = offsetDateString(userGamification.lastStreakCreditedDate, i);
        if (!userGamification.frozenDates.includes(mDate)) {
          userGamification.frozenDates.push(mDate);
        }
      }
      userGamification.streakFreezes -= missedDays;
      userGamification.lastStreakCreditedDate = yesterdayStr;
      setTimeout(() => {
        showToast(`🧊 سپر یخی فعال شد و زنجیرهٔ ${toPersianDigits(userGamification.streak)} روزهٔ شما نجات یافت!`);
      }, 600);
    } else {
      userGamification.streak = 0;
      userGamification.lastStreakCreditedDate = '';
    }
    return true;
  }
  document.addEventListener('visibilitychange', () => {
    if (restoreInProgress || document.hidden || !userGamification) return;
    try { if (reconcileStreakGap()) saveGamification(); else updateGamificationUI(); } catch (e) {}
  });

  function checkDailyStreakIgnition(silentInit) {
    reconcileStreakGap();                      // v3.11 (R14): the app may have stayed open across missed days
    const todayStr = getLocalDateString();
    const todayCount = weeklyHistory[todayStr] || 0;
    const target = appSettings.dailyReviewTarget || 15;
    if (todayCount >= target && userGamification.lastStreakCreditedDate !== todayStr) {
      userGamification.streak = (userGamification.streak || 0) + 1;
      userGamification.bestStreak = Math.max(userGamification.bestStreak || 0, userGamification.streak);
      userGamification.lastStreakCreditedDate = todayStr;
      if (!silentInit) {
        userGamification.gems = (userGamification.gems || 0) + 10;
        userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems);
        awardXP(40);
        achBannerQueue.push({
          icon: '🔥',
          name: `هدف امروز کامل شد! زنجیرهٔ ${toPersianDigits(userGamification.streak)} روزه روشن شد`,
          reward: 10
        });
      }
      saveGamification();
      checkAndUnlockAchievements(silentInit);
      if (!silentInit) showNextAchBanner();
      return true;
    }
    return false;
  }

  function setupGamification() {
    try {
      const saved = localStorage.getItem('farhanglex_gamification_v30') || localStorage.getItem('farhanglex_gamification_v21');
      if (saved) userGamification = Object.assign(userGamification, JSON.parse(saved));
      if (!Array.isArray(userGamification.unlockedThemes)) userGamification.unlockedThemes = ['default', 'dark'];
      if (!userGamification.unlockedThemes.includes('default')) userGamification.unlockedThemes.push('default');
      if (!userGamification.unlockedThemes.includes('dark')) userGamification.unlockedThemes.push('dark');
      if (!Array.isArray(userGamification.unlockedBadges)) userGamification.unlockedBadges = [];
      if (!Array.isArray(userGamification.frozenDates)) userGamification.frozenDates = [];
      if (typeof userGamification.streakFreezes !== 'number') userGamification.streakFreezes = 1;
      if (!userGamification.badgeTiers || typeof userGamification.badgeTiers !== 'object') userGamification.badgeTiers = {};
      userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems || 25);
      const wh = localStorage.getItem('farhanglex_weekly_history');
      if (wh) weeklyHistory = JSON.parse(wh);
    } catch (e) {}

    const todayStr = getLocalDateString();
    const yesterdayStr = offsetDateString(todayStr, -1);

    // Seamless migration from v3.4.0 if lastStreakCreditedDate wasn't tracked yet
    if (!userGamification.lastStreakCreditedDate) {
      const anyReviewsEver = Object.values(weeklyHistory).reduce((a, b) => a + (b || 0), 0);
      if ((weeklyHistory[todayStr] || 0) >= (appSettings.dailyReviewTarget || 15)) {
        userGamification.streak = Math.max(1, userGamification.streak || 1);
        userGamification.lastStreakCreditedDate = todayStr;
      } else if ((userGamification.streak || 0) > 1 && anyReviewsEver > 0) {
        userGamification.lastStreakCreditedDate = yesterdayStr;
      } else {
        userGamification.streak = 0;
      }
      userGamification.bestStreak = Math.max(userGamification.bestStreak || 0, userGamification.streak || 0);
    }

    // Reconcile missed days between lastStreakCreditedDate and today using Streak Freezes (🧊)
    reconcileStreakGap();

    userGamification.lastActiveDate = todayStr;
    ensureTodayQuests();
    checkDailyStreakIgnition(true);
    saveGamification();
    checkAndUnlockAchievements(true);
    updateGamificationUI();
  }

  function saveGamification() {
    if (restoreInProgress) return;
    userGamification.peakGems = Math.max(userGamification.peakGems || 0, userGamification.gems || 0);
    userGamification.bestStreak = Math.max(userGamification.bestStreak || 0, userGamification.streak || 0);
    try {
      localStorage.setItem('farhanglex_gamification_v30', JSON.stringify(userGamification));
      localStorage.setItem('farhanglex_weekly_history', JSON.stringify(weeklyHistory));
    } catch (e) { noteStorageFull(e); }
    try { if (window.FarhangLexDB) window.FarhangLexDB.saveGamification(userGamification).catch(() => {}); } catch (e) {}
    updateGamificationUI();
    scheduleNativeMirrorSave();
  }

  function updateGamificationUI() {
    const todayStr = getLocalDateString();
    const isLitToday = userGamification.lastStreakCreditedDate === todayStr;
    const sPill = document.getElementById('stat-streak-pill');
    const sEl = document.getElementById('stat-streak-val');
    const gEl = document.getElementById('stat-gems-val');
    const dEl = document.getElementById('dash-jalali-date');
    if (sPill) {
      sPill.classList.toggle('lit', isLitToday);
      sPill.classList.toggle('pending', !isLitToday);
    }
    if (sEl) sEl.textContent = toPersianDigits(userGamification.streak || 0);
    if (gEl) gEl.textContent = toPersianDigits(userGamification.gems || 0);
    if (dEl) dEl.textContent = getJalaliDateString();
    updateHomeRewardsBanner();
  }

  // ==========================================================
  // STREAK HABIT CALENDAR & ICE SHIELD MODAL
  // ==========================================================
  window.openStreakModal = function () {
    const modal = document.getElementById('streak-modal-overlay');
    if (!modal) return;
    renderStreakModal();
    modal.classList.add('show');
  };

  window.closeStreakModal = function () {
    const modal = document.getElementById('streak-modal-overlay');
    if (modal) modal.classList.remove('show');
  };

  window.setDailyStudyPace = function (newTarget) {
    appSettings.dailyReviewTarget = newTarget;
    appSettings.paceConfiguredV35 = true;
    saveSettings();
    checkDailyStreakIgnition(false);
    renderDashboard();                         // v3.11 (F41): was updateDashboard(), which never existed → ReferenceError
    renderStreakModal();
    playSfx('correct');
    showToast(`🎯 هدف مطالعهٔ روزانه روی ${toPersianDigits(newTarget)} مرور تنظیم شد`);
  };

  window.buyStreakFreeze = function () {
    const curFreezes = userGamification.streakFreezes || 0;
    if (curFreezes >= FREEZE_SHIELD_MAX) {
      showToast('🧊 ظرفیت سپر یخی شما تکمیل است (حداکثر ۲ عدد)');
      return;
    }
    if ((userGamification.gems || 0) < FREEZE_SHIELD_COST) {
      playSfx('wrong');
      showToast(`💎 برای خرید سپر یخی به ${toPersianDigits(FREEZE_SHIELD_COST)} الماس نیاز دارید`);
      return;
    }
    userGamification.gems -= FREEZE_SHIELD_COST;
    userGamification.streakFreezes = curFreezes + 1;
    saveGamification();
    playSfx('victory');
    renderStreakModal();
    showToast('🧊 سپر یخی محافظ زنجیره خریداری و تجهیز شد!');
    triggerHaptic([30, 40, 30]);
  };

  function renderStreakModal() {
    const body = document.getElementById('streak-modal-body');
    if (!body) return;

    const todayStr = getLocalDateString();
    const isLit = userGamification.lastStreakCreditedDate === todayStr;
    const todayDone = weeklyHistory[todayStr] || 0;
    const target = appSettings.dailyReviewTarget || 15;
    const rem = Math.max(0, target - todayDone);
    const freezes = userGamification.streakFreezes || 0;
    const best = Math.max(userGamification.bestStreak || 0, userGamification.streak || 0);
    const shortWeekNames = ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'];

    let daysHtml = '';
    for (let offset = -6; offset <= 0; offset++) {
      const dStr = offsetDateString(todayStr, offset);
      const [yy, mm, dd] = dStr.split('-').map(Number);
      const jsDay = new Date(yy, mm - 1, dd).getDay();
      const dayCount = weeklyHistory[dStr] || 0;
      const wasFrozen = (userGamification.frozenDates || []).includes(dStr);
      const dayLit = (dStr === todayStr) ? isLit : (dayCount >= target || (dStr === userGamification.lastStreakCreditedDate));

      let cls = 'week-day-dot';
      let sym = '•';
      if (dayLit) {
        cls += ' lit';
        sym = '🔥';
      } else if (wasFrozen) {
        cls += ' frozen';
        sym = '🧊';
      }
      if (offset === 0) cls += ' today-ring';

      daysHtml += `
        <div class="week-day-col">
          <span class="week-day-lbl">${offset === 0 ? 'امروز' : shortWeekNames[jsDay]}</span>
          <div class="${cls}">${sym}</div>
        </div>
      `;
    }

    const paces = [
      { val: 10, lbl: '۱۰ مرور • سبک' },
      { val: 15, lbl: '۱۵ مرور • استاندارد' },
      { val: 25, lbl: '۲۵ مرور • جدی' }
    ];

    body.innerHTML = `
      <div class="streak-hero-box ${isLit ? '' : 'unlit'}">
        <div style="font-size:36px; line-height:1;">${isLit ? '🔥' : '🕯️'}</div>
        <div style="font-size:24px; font-weight:900; margin-top:4px;">${toPersianDigits(userGamification.streak || 0)} روز پیوسته</div>
        <div style="font-size:12px; opacity:0.94; margin-top:4px;">
          ${isLit
            ? '✅ شعله امروز شما روشن است! فردا برای ادامه زنجیره بازگردید.'
            : `⏳ ${toPersianDigits(rem)} مرور دیگر تا روشن شدن شعله امروز (${toPersianDigits(todayDone)} از ${toPersianDigits(target)})`}
        </div>
        <div style="margin-top:8px; font-size:12px; opacity:0.88;">🏆 رکورد بلندترین زنجیرهٔ شما: <strong>${toPersianDigits(best)} روز</strong></div>
      </div>

      <div style="font-size:12px; font-weight:900; color:var(--text-main); margin-bottom:6px;">📅 تقویم ۷ روز اخیر عادت مطالعه</div>
      <div class="week-habit-grid">${daysHtml}</div>

      <div class="freeze-shield-box">
        <div style="min-width:0;">
          <div style="font-size:13px; font-weight:900; color:var(--text-main);">🧊 سپر یخی محافظ زنجیره (${toPersianDigits(freezes)} از ${toPersianDigits(FREEZE_SHIELD_MAX)})</div>
          <div style="font-size:12px; color:var(--text-muted); line-height:1.45; margin-top:2px;">اگر یک روز نرسیدید مطالعه کنید، سپر یخی به‌طور خودکار زنجیرهٔ شما را از صفر شدن نجات می‌دهد.</div>
        </div>
        <button type="button" class="setting-chip" style="flex-shrink:0; font-weight:900;" onclick="buyStreakFreeze()">
          ${freezes >= FREEZE_SHIELD_MAX ? '✅ تکمیل' : `خرید (${toPersianDigits(FREEZE_SHIELD_COST)} 💎)`}
        </button>
      </div>

      <div>
        <div style="font-size:12px; font-weight:900; color:var(--text-main);">⚙️ تنظیم آهنگ هدف روزانه (شرط روشن شدن شعله)</div>
        <div class="pace-chip-row">
          ${paces.map(p => `<button type="button" class="pace-chip-btn ${target === p.val ? 'active' : ''}" onclick="setDailyStudyPace(${p.val})">${p.lbl}</button>`).join('')}
        </div>
      </div>
    `;
  }

  window.switchHubTab = function (tab) {
    activeHubTab = (tab === 'themes') ? 'themes' : 'badges';
    const bBtn = document.getElementById('hub-tab-btn-badges');
    const tBtn = document.getElementById('hub-tab-btn-themes');
    const bPanel = document.getElementById('hub-panel-badges');
    const tPanel = document.getElementById('hub-panel-themes');
    if (bBtn) bBtn.classList.toggle('active', activeHubTab === 'badges');
    if (tBtn) tBtn.classList.toggle('active', activeHubTab === 'themes');
    if (bPanel) bPanel.style.display = activeHubTab === 'badges' ? 'block' : 'none';
    if (tPanel) tPanel.style.display = activeHubTab === 'themes' ? 'block' : 'none';
  };

  window.openShopModal = function (initialTab) {
    const modal = document.getElementById('shop-modal-overlay');
    if (!modal) return;
    checkAndUnlockAchievements(false);
    if (initialTab === 'themes' || initialTab === 'badges') {
      window.switchHubTab(initialTab);
    } else {
      window.switchHubTab(activeHubTab || 'badges');
    }
    renderShopContent();
    modal.classList.add('show');
  };

  window.closeShopModal = function () {
    const modal = document.getElementById('shop-modal-overlay');
    if (modal) modal.classList.remove('show');
  };

  function renderShopContent() {
    const summaryBox = document.getElementById('hub-summary-box');
    const themesWrap = document.getElementById('shop-themes-list');
    const badgesWrap = document.getElementById('shop-badges-list');
    if (!Array.isArray(userGamification.unlockedThemes)) userGamification.unlockedThemes = ['default', 'dark'];
    if (!userGamification.badgeTiers) userGamification.badgeTiers = {};

    const metrics = computeGlobalAchievementMetrics();
    const earnedStars = getTotalAchievementStars();
    const maxStars = BADGES_CATALOG.length * 4;
    const rank = getUserRankInfo(earnedStars);
    const lvlInfo = getLevelProgressInfo(userGamification.xp || 0);

    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="hub-rank-row">
          <div class="hub-rank-badge">
            <span style="font-size:22px;">${rank.icon}</span>
            <span>سطح ${toPersianDigits(lvlInfo.level)} • ${escapeHtml(rank.title)}</span>
          </div>
          <span class="hub-gems-pill">💎 ${toPersianDigits(userGamification.gems || 0)} الماس</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12px; opacity:0.94; margin-bottom:5px;">
          <span>ستاره‌های تالار: ★ ${toPersianDigits(earnedStars)} از ${toPersianDigits(maxStars)}</span>
          <strong>XP سطح بعدی: ${toPersianDigits(lvlInfo.rem)} / ${toPersianDigits(lvlInfo.needed)}</strong>
        </div>
        <div class="hub-rank-bar-track">
          <div class="hub-rank-bar-fill" style="width:${lvlInfo.pct}%;"></div>
        </div>
      `;
    }

    if (themesWrap) {
      themesWrap.innerHTML = '';
      THEMES_CATALOG.forEach(th => {
        const isUnlocked = userGamification.unlockedThemes.includes(th.id) || (th.cost === 0 && th.rarity !== 'prestige');
        const isActive = (appSettings.theme || 'default') === th.id || (th.id === 'default' && appSettings.theme === 'light');
        const card = document.createElement('div');
        card.className = `theme-card-item ${isActive ? 'active-theme' : ''}`;
        const dotsHtml = (th.swatches || []).map(c => `<span class="swatch-dot" style="background:${c};"></span>`).join('');
        const modeTag = th.scheme === 'dark' ? 'تیره' : 'روشن';
        const txtCol = th.scheme === 'dark' ? '#f8fafc' : '#1e293b';

        let ctaLabel = 'اعمال تم';
        if (isActive) {
          ctaLabel = '✅ تم فعال';
        } else if (!isUnlocked) {
          if (th.rarity === 'prestige') {
            const pCur = Math.min(th.prestigeTarget, metrics[th.prestigeMetric] || 0);
            ctaLabel = `🔒 افتخاری (${toPersianDigits(pCur)}/${toPersianDigits(th.prestigeTarget)})`;
          } else {
            ctaLabel = `قفل‌گشایی (${toPersianDigits(th.cost)} 💎)`;
          }
        }

        card.innerHTML = `
          <div>
            <div class="theme-preview-strip" style="background:${th.bgPreview}; color:${txtCol};">
              <span style="font-size:12px; font-weight:800;">${th.icon} ${modeTag}</span>
              <span class="swatch-dots">${dotsHtml}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:4px; margin-top:7px;">
              <span style="font-weight:900; font-size:12px; color:var(--text-main);">${escapeHtml(th.name)}</span>
              <span class="rarity-pill rarity-${th.rarity}">${escapeHtml(th.rarityLabel)}</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); line-height:1.35; margin-top:3px;">${escapeHtml(th.desc)}</div>
          </div>
          <button type="button" class="theme-action-btn">${ctaLabel}</button>
        `;
        card.onclick = () => selectOrBuyTheme(th);
        themesWrap.appendChild(card);
      });
    }

    if (badgesWrap) {
      badgesWrap.innerHTML = '';
      BADGES_CATALOG.forEach(bg => {
        const curTier = Math.min(4, Math.max(0, userGamification.badgeTiers[bg.id] || 0));
        const isMaxed = curTier >= 4;
        const nextTarget = isMaxed ? bg.tiers[3] : bg.tiers[curTier];
        const nextReward = isMaxed ? 0 : bg.rewards[curTier];
        const rawVal = metrics[bg.metric] || 0;
        const clampedVal = Math.min(nextTarget, rawVal);
        const pct = Math.min(100, Math.round((clampedVal / nextTarget) * 100));
        const starsStr = '★'.repeat(curTier) + '☆'.repeat(4 - curTier);

        const row = document.createElement('div');
        row.className = `ach-card-row ${curTier > 0 ? 'earned' : ''} ${isMaxed ? 'maxed' : ''}`;
        row.innerHTML = `
          <div class="ach-icon-medal">${bg.icon}</div>
          <div class="ach-body">
            <div class="ach-head-line">
              <span class="ach-title">${escapeHtml(bg.name)}</span>
              <span class="tier-badge-lbl t${curTier}">${TIER_NAMES_FA[curTier]}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
              <span class="tier-stars" dir="ltr">${starsStr}</span>
              <span class="ach-reward-pill">${isMaxed ? '💎 الماسی کامل' : `پله بعد: +${toPersianDigits(nextReward)} 💎`}</span>
            </div>
            <div class="ach-desc">${escapeHtml(bg.desc)}</div>
            <div class="ach-prog-row">
              <div class="ach-prog-track">
                <div class="ach-prog-fill" style="width:${pct}%;"></div>
              </div>
              <span class="ach-prog-num">${toPersianDigits(rawVal)} / ${toPersianDigits(nextTarget)}</span>
            </div>
          </div>
        `;
        badgesWrap.appendChild(row);
      });
    }
  }

  function selectOrBuyTheme(th) {
    if (!th) return;
    const themeId = th.id;
    const cost = th.cost || 0;
    if (!Array.isArray(userGamification.unlockedThemes)) userGamification.unlockedThemes = ['default', 'dark'];
    const isUnlocked = userGamification.unlockedThemes.includes(themeId) || (cost === 0 && th.rarity !== 'prestige');

    if (isUnlocked) {
      appSettings.theme = themeId;
      rememberPalettePick(themeId);
      applyTheme();
      saveSettings();
      playSfx('correct');
      renderShopContent();
      showToast(`تم «${th.name}» فعال شد 🎨`);
      return;
    }

    if (th.rarity === 'prestige') {
      playSfx('wrong');
      showToast(`🔒 تم افتخاری: فقط با «${th.prestigeReq}» به‌طور رایگان باز می‌شود!`);
      return;
    }

    if ((userGamification.gems || 0) < cost) {
      playSfx('wrong');
      showToast(`💎 الماس کافی نیست! (${toPersianDigits(cost)} الماس نیاز دارید)`);
      return;
    }
    userGamification.gems -= cost;
    userGamification.unlockedThemes.push(themeId);
    appSettings.theme = themeId;
    rememberPalettePick(themeId);
    saveGamification();
    applyTheme();
    saveSettings();
    playSfx('victory');
    checkAndUnlockAchievements(false);
    renderShopContent();
    showToast(`🎉 تم تازه باز و فعال شد (-${toPersianDigits(cost)} 💎)`);
    triggerHaptic([30, 40, 30]);
  }

  function recordReviewActivity() {
    if (restoreInProgress) return false;
    const now = Date.now();
    // Anti-spam guard: ignore rapid button mashing (<380ms) from inflating daily streak/XP
    const isRapidSpam = (now - lastActionTimestamp) < 380;
    lastActionTimestamp = now;
    if (isRapidSpam) return false;

    const todayStr = getLocalDateString();
    weeklyHistory[todayStr] = (weeklyHistory[todayStr] || 0) + 1;
    if (window.FarhangLexDB) {
      window.FarhangLexDB.recordReviewActivity(todayStr, 1).catch(() => {});
    }
    checkDailyStreakIgnition(false);
    saveGamification();
    return true;
  }

  // ==========================================================
  // GRADE & PROGRESS LOADING
  // ==========================================================
  function renderGradeChips() {
    const track = document.getElementById('grade-chips-track');
    if (!track) return;
    track.innerHTML = '';
    GRADE_LIST.forEach(g => {
      const btn = document.createElement('button');
      btn.className = `grade-chip ${g.id === currentGradeId ? 'active' : ''}`;
      btn.textContent = g.fullTitle;
      btn.onclick = () => selectGrade(g.id);
      track.appendChild(btn);
    });
    centerActiveGradeChip();
  }

  // v3.11 — the selected grade chip is always on screen (the row scrolls sideways; RTL and old WebViews alike)
  window.openGradeModal = function () {
    const host = document.getElementById('grade-modal-list');
    if (host) {
      host.innerHTML = '';
      GRADE_LIST.forEach(g => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'grade-modal-item' + (g.id === currentGradeId ? ' active' : '');
        b.textContent = g.fullTitle;
        b.onclick = () => { closeGradeModal(); selectGrade(g.id); };
        host.appendChild(b);
      });
    }
    const m = document.getElementById('grade-modal-overlay');
    if (m) m.classList.add('show');
  };
  window.closeGradeModal = function (e) {
    if (e && e.target && e.currentTarget && e.target !== e.currentTarget) return;
    const m = document.getElementById('grade-modal-overlay');
    if (m) m.classList.remove('show');
  };

  function centerActiveGradeChip() {
    const run = () => {
      const chip = document.querySelector('#grade-chips-track .grade-chip.active');
      const sc = chip && chip.closest('.grade-chips-scroller');
      if (!chip || !sc) return;
      const cr = chip.getBoundingClientRect(), sr = sc.getBoundingClientRect();
      if (!sr.width) return;
      sc.scrollLeft += (cr.left + cr.width / 2) - (sr.left + sr.width / 2);
    };
    run(); setTimeout(run, 60);
  }

  // A compact picker may change the grade while the chip row is hidden. Re-center when a
  // multi-window resize reveals the row; coalesce resize bursts without changing the grade.
  let gradeCenterResizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(gradeCenterResizeTimer);
    gradeCenterResizeTimer = setTimeout(centerActiveGradeChip, 60);
  });

  function persistWordProgress(st) {
    if (restoreInProgress || !st || !st.wordId) return;
    st.updatedAt = Date.now();
    if (window.FarhangLexDB && typeof window.FarhangLexDB.saveWordProgress === 'function') {
      window.FarhangLexDB.saveWordProgress(st).catch(() => {});
    }
    saveGradeProgress();
  }

  function saveGradeProgress() {
    if (restoreInProgress) return;
    try {
      localStorage.setItem(`farhanglex_progress_${currentGradeId}`, JSON.stringify(userProgress));
    } catch (e) { noteStorageFull(e); }
    scheduleNativeMirrorSave();
  }

  window.selectGrade = async function (gradeId) {
    currentGradeId = gradeId;
    quizLessonFilter = 'all';
    leitnerLessonFilter = 'all';
    localStorage.setItem('active_grade_id', gradeId);
    renderGradeChips();
    await loadGrade(gradeId);
    showToast(`${gradeData.titleFa} بارگذاری شد 📚`);
  };

  async function loadGrade(gradeId) {
    const rawCurriculum = window.MASTER_CURRICULUM;
    if (!rawCurriculum) throw new Error('curriculum data missing (data/master_curriculum.js)');   // v3.11 U4 → safety card
    gradeData = rawCurriculum[gradeId] || (rawCurriculum.grades && rawCurriculum.grades[gradeId]);
    if (!gradeData) {
      if (gradeId !== 'vision_1') {          // an unknown stored grade id: open the default grade instead of an empty app
        currentGradeId = 'vision_1';
        try { localStorage.setItem('active_grade_id', 'vision_1'); } catch (e) {}
        return loadGrade('vision_1');
      }
      throw new Error('grade missing in the curriculum: ' + gradeId);
    }

    // Owner decision (4.2.1): teacher-added vocabulary is removed entirely,
    // including legacy loading — old custom_vocabulary keys are purged, never merged.
    try { localStorage.removeItem(`custom_vocabulary_${gradeId}`); } catch (e) {}

    const baseVocab = gradeData.vocabulary || [];
    gradeData._combinedVocab = [...baseVocab];

    if (appSettings.activeRecall === undefined || appSettings.activeRecall === null) {
      appSettings.activeRecall = gradeId.startsWith('vision');
    }
    updateActiveRecallUI();

    let dbProgress = {};
    if (window.FarhangLexDB) {
      try {
        dbProgress = await window.FarhangLexDB.getAllProgressForGrade(gradeId) || {};
      } catch (e) {}
    }

    let localProgress = {};
    try {
      const saved = localStorage.getItem(`farhanglex_progress_${gradeId}`);
      if (saved) localProgress = JSON.parse(saved);
    } catch (e) {}

    // Merge preferring whichever record has a newer updatedAt / lastReview
    const merged = Object.assign({}, localProgress);
    Object.entries(dbProgress).forEach(([k, rec]) => {
      const loc = merged[k];
      if (!loc || (rec.updatedAt || rec.lastReview || 0) >= (loc.updatedAt || loc.lastReview || 0)) {
        merged[k] = rec;
      }
    });
    userProgress = merged;

    const now = Date.now();
    gradeData._combinedVocab.forEach(v => {
      const existing = userProgress[v.id] || (v.legacyId && userProgress[v.legacyId]);
      userProgress[v.id] = Object.assign({
        wordId: v.id,
        gradeId: gradeId,
        box: 1,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        lapses: 0,
        success: 0,
        fail: 0,
        starred: false,
        lastReview: 0,
        nextReview: now,
        masteryAwarded: false
      }, existing || {}, { wordId: v.id, gradeId: gradeId });
    });

    saveGradeProgress();

    const titleEl = document.getElementById('header-grade-title');
    const subEl = document.getElementById('header-grade-sub');
    if (titleEl) titleEl.textContent = `${gradeData.name} (${gradeData.titleFa})`;
    if (subEl) subEl.textContent = `سری ${gradeData.series} • کد مصوب: ${gradeData.code || 'وزارتی'}`;
    const compactEl = document.getElementById('hdr-grade-compact-label');
    if (compactEl) compactEl.textContent = `${gradeData.name} • ${gradeData.titleFa}`;
    centerActiveGradeChip();

    renderDashboard();
    initLeitner();
    initContextReader();
    initQuiz(true);
    renderGlossary();
  }

  window.switchTab = function (tabName) {
    stopAllAudio();
    if (tabName !== 'quiz' && window.CreativeGames && typeof window.CreativeGames.stopTimers === 'function') {
      window.CreativeGames.stopTimers();
    }
    currentTabName = tabName;
    document.body.setAttribute('data-tab', tabName);   // v3.11: the full grade bar shows on Home only
    document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.bottom-tab-item').forEach(b => b.classList.remove('active'));

    const v = document.getElementById(`view-${tabName}`);
    if (v) v.classList.add('active');
    // v3.11 (F19): all tabs share one scroller; without this the new tab opened at the previous tab's scroll offset
    // (glossary search box off-screen, Leitner toolbar under the header). Android bottom navigation opens at the top.
    const scroller = document.querySelector('main.native-content-body');
    if (scroller) scroller.scrollTop = 0;

    const tabIdxMap = { 'home': 0, 'leitner': 1, 'context': 2, 'quiz': 3, 'glossary': 4 };
    const navBtns = document.querySelectorAll('.android-bottom-bar .bottom-tab-item');
    if (tabIdxMap[tabName] !== undefined && navBtns[tabIdxMap[tabName]]) {
      navBtns[tabIdxMap[tabName]].classList.add('active');
    }

    if (tabName === 'about') fillAboutCoverage();
    const hdrAboutBtn = document.getElementById('hdr-about-btn');
    if (hdrAboutBtn) {
      hdrAboutBtn.style.borderColor = (tabName === 'about') ? 'var(--emerald)' : '';
      hdrAboutBtn.style.color = (tabName === 'about') ? 'var(--emerald)' : '';
    }

    if (tabName === 'home') { renderDashboard(); centerActiveGradeChip(); }
    else if (tabName === 'leitner') renderCurrentCard();
    else if (tabName === 'glossary') renderGlossary();
    else if (tabName === 'quiz') revealQuizPrimary();

    triggerHaptic(18);
  };

  // v3.11 (F23): «من» states the real coverage — counted from the data, so a new word or text can never make it stale
  function fillAboutCoverage() {
    try {
      const grades = (window.MASTER_CURRICULUM && window.MASTER_CURRICULUM.grades) || {};
      const n = { words: 0, book: 0, workbook: 0, extra: 0 };
      Object.keys(grades).forEach(g => (grades[g].vocabulary || []).forEach(v => {
        n.words++;
        const src = v.source === 'workbook' ? 'workbook' : v.source === 'extra' ? 'extra' : 'book';
        n[src]++;
      }));
      const F = window.FURTHER_TEXTS;
      n.further = (F && Array.isArray(F.items)) ? F.items.length : 0;
      n.badges = BADGES_CATALOG.length;
      n.themes = THEMES_CATALOG.length;
      n.modes = document.querySelectorAll('#quiz-mode-grid .qm-tile').length;
      document.querySelectorAll('#about-coverage [data-cov]').forEach(el => {
        const k = el.getAttribute('data-cov');
        if (typeof n[k] === 'number' && n[k] > 0) el.textContent = toPersianDigits(n[k]);
      });
    } catch (e) {}
  }

  function getPosInfo(pos) {
    const p = (pos || '').toLowerCase().trim();
    if (p.startsWith('n')) return { label: 'اسم (Noun)', cls: 'pos-noun' };
    if (p.startsWith('v')) return { label: 'فعل (Verb)', cls: 'pos-verb' };
    if (p.startsWith('adj')) return { label: 'صفت (Adjective)', cls: 'pos-adj' };
    if (p.startsWith('adv')) return { label: 'قید (Adverb)', cls: 'pos-adv' };
    return { label: pos || 'واژه', cls: 'pos-def' };
  }

  // Dynamic vector illustration fallback for entries without a packaged illustration
  function buildFallbackWordSvg(wordObj) {
    const w = String((wordObj && wordObj.word) || 'Word').trim();
    const p = String((wordObj && wordObj.pos) || '').toLowerCase();
    let c1 = '#ecfdf5', c2 = '#059669', badge = '#10b981';
    if (p.startsWith('v')) { c1 = '#fff1f2'; c2 = '#e11d48'; badge = '#f43f5e'; }
    else if (p.startsWith('adj')) { c1 = '#fffbeb'; c2 = '#d97706'; badge = '#f59e0b'; }
    else if (p.startsWith('adv')) { c1 = '#eef2ff'; c2 = '#4f46e5'; badge = '#6366f1'; }
    const initials = w.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'LEX';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
      `<rect width="100" height="100" rx="20" fill="${c1}" stroke="${c2}" stroke-width="2"/>` +
      `<path d="M24 30h24a6 6 0 0 1 6 6v38a6 6 0 0 0-6-6H24z" fill="#ffffff" stroke="${c2}" stroke-width="2"/>` +
      `<path d="M76 30H52a6 6 0 0 0-6 6v38a6 6 0 0 1 6-6h24z" fill="#ffffff" stroke="${c2}" stroke-width="2"/>` +
      `<rect x="28" y="42" width="44" height="22" rx="8" fill="${badge}"/>` +
      `<text x="50" y="57" font-family="sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">${initials}</text>` +
      `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // v3.7.0 — tap-to-enlarge: only real illustrations (not the generated fallback badge); the tap must not flip the card
  function openImageLightbox(src, word) {
    const ov = document.getElementById('img-lightbox-overlay');
    if (!ov || !src) return;
    if (!ov.dataset.bound) {
      ov.addEventListener('click', function () { ov.classList.remove('show'); });
      ov.dataset.bound = '1';
    }
    const im = document.getElementById('img-lightbox-img');
    im.src = src; im.alt = word || '';
    document.getElementById('img-lightbox-cap').textContent = word || '';
    ov.classList.add('show');
    triggerHaptic(12);
  }
  function bindZoomableIllustration(imgEl, card) {
    if (!imgEl) return;
    const zoomable = !!(card && card.hasIllustration !== false);
    imgEl.classList.toggle('zoomable', zoomable);
    if (card) imgEl.setAttribute('aria-label', zoomable ? `${card.word} — برای بزرگ‌نمایی لمس کنید` : card.word);
    imgEl.onclick = zoomable ? function (e) {
      if (String(this.src).indexOf('data:') === 0) return;   // fallback badge after a load error → normal card tap
      e.stopPropagation(); e.preventDefault();
      openImageLightbox(this.src, card.word);
    } : null;
  }

  // v3.8.0 — picture games use only real, answer-safe illustrations: no fallback badge (it shows the word's first
  // letters) and no image whose drawing contains the word itself (imageHasText, see reports/v3.7.0/image_audit.json)
  function isPictureQuizSafe(v) {
    return !!v && v.hasIllustration !== false && !v.imageHasText;
  }

  function getWordIllustrationSrc(wordObj) {
    if (!wordObj || !wordObj.word) return buildFallbackWordSvg({ word: 'LEX' });
    // v3.8.8: an entry may carry its own picture — homographs share one spelling but not one meaning
    // («patient»: grade 8 noun بیمار, grade 9 adjective صبور → illustrationSlug 'patient_adj')
    const own = wordObj.illustrationSlug;
    const slug = (typeof own === 'string' && /^[a-z0-9_]+$/.test(own)) ? own : wordObj.word.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (wordObj.hasIllustration !== false) {
      return `img/vocab/${slug}.webp`;
    }
    return buildFallbackWordSvg(wordObj);
  }

  // ==========================================================
  // LEMMATIZATION & INFLECTION REGEX ENGINE
  // ==========================================================
  function createInflectionRegex(term) {
    const clean = (term || '').trim();
    if (!clean) return /$^/;
    const words = clean.split(/\s+/);
    const patternWords = words.map(w => {
      const base = w.toLowerCase().replace(/[^a-z]/g, '');
      if (!base) return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (base === 'die') return '(?:die[ds]?|dying)';
      if (base === 'weave') return '(?:weave[s]?|wove|woven|weaving)';
      if (base === 'bleed') return '(?:bleed(?:s|ing)?|bled)';
      if (base === 'forgive') return '(?:forgive[sn]?|forgave|forgiving)';
      if (base.endsWith('e')) {
        const stem = base.slice(0, -1);
        return `(?:${base}d?|${base}s|${stem}ing)`;
      }
      if (base.endsWith('y') && base.length > 2) {
        const stem = base.slice(0, -1);
        return `(?:${base}s?|${stem}ies|${stem}ied|${base}ing)`;
      }
      return `(?:${base}(?:s|es|ed|ing|d|er|est)?)`;
    });
    if (words.length === 2 && /^(up|out|off|in|on|down|away|back|over)$/i.test(words[1])) {
      return new RegExp(`\\b${patternWords[0]}(?:\\s+(?:it|them|him|her|this|that))?\\s+${patternWords[1]}\\b`, 'gi');
    }
    return new RegExp(`\\b${patternWords.join('\\s+')}\\b`, 'gi');
  }

  // ==========================================================
  // OFFLINE AUDIO ENGINE (BUNDLED MP3)
  // ==========================================================
  // Local recordings; technical checks do not establish human pronunciation review.
  let flxRecordedPlayer = null, flxRecordedFacade = null, flxModalSurface = null;
  function ensureRecordedAudio() {
    if (!flxRecordedPlayer) {
      flxRecordedPlayer = window.FlxRecordedAudioPlayer.createPlayer({
        // Recorded clips are served from the same site root: sentences/, tokens/, further/.
        // (Site root is one level up from the lex/ app, so resolve against ../.)
        audioFactory: src => new Audio(/^audio\/(sentences|tokens|further)\//.test(src) ? new URL('../' + src.slice('audio/'.length), location.href).href : src),
        stopOthers: () => { if (furtherAudio) { furtherPlayGeneration++; furtherAudio.pause(); } },
        notify: text => showToast(text), haptic: () => triggerHaptic(15)
      });
      flxRecordedFacade = window.FlxRecordedAudioFacade.create({
        catalogue: window.FLX_RECORDING_CANDIDATES, tokenPlan: window.FLX_RECORDING_PLAN,
        router: window.FlxRecordedAudioRouter, player: flxRecordedPlayer,
        getAccent: () => appSettings.accent, getRate: () => appSettings.speechRate || 0.86
      });
    }
    return flxRecordedFacade;
  }
  function stopAllAudio(keepTrack) {
    if (!keepTrack && furtherAudio) { furtherPlayGeneration++; try { furtherAudio.pause(); } catch (e) {} }
    if (flxRecordedPlayer) flxRecordedPlayer.stop();
  }
  function findRecordedRuntimeWord(id) {
    const words = getAllGlobalVocabulary();
    const exact = words.find(v => v && v.id === id);
    if (exact) return exact;
    // Backward compatibility: resolve only a unique packaged legacy ID; never guess.
    const old = words.filter(v => v && v.legacyId && v.legacyId === id);
    return old.length === 1 ? old[0] : null;
  }
  function refreshModalSurfaceButton() {
    const b = document.getElementById('modal-surface-audio-btn');
    if (!b) return;
    const s = flxModalSurface, v = s && findRecordedRuntimeWord(s.wordId);
    const info = s && s.wordId === activeModalWordId && ensureRecordedAudio().describeTargetSurface(v, s.index, s.text);
    if (!info) { b.style.display = 'none'; b.disabled = true; b.textContent = ''; return; }
    b.style.display = 'inline-flex'; b.disabled = !info.available;
    const surface = document.createElement('bdi'); surface.dir = 'ltr'; surface.textContent = info.text;
    b.replaceChildren(document.createTextNode('🔊 تلفظ صورت جمله: '), surface);
    b.title = info.available ? 'شنیدن صورت واژه در جمله' : 'این صوت در دسترس نیست';
  }
  window.speakModalSurface = function () {
    const s = flxModalSurface, v = s && findRecordedRuntimeWord(s.wordId);
    return !!(s && s.wordId === activeModalWordId && ensureRecordedAudio().playTargetSurface(v, s.index, s.text));
  };
  window.speakSentenceAudio = function (sentenceText, targetWord, wordId) {
    const facade = ensureRecordedAudio(), record = findRecordedRuntimeWord(wordId);
    return facade.playSentence(record && sentenceText === record.example ? record : null);
  };
  window.speak = function(text, isWordOnly = true, wordId = null, customRate = null) {
    const facade = ensureRecordedAudio(), record = isWordOnly ? findRecordedRuntimeWord(wordId) : null;
    return facade.playWord(record && String(text || '').trim().toLowerCase() === String(record.word || '').trim().toLowerCase() ? record : null,
      customRate === null ? undefined : customRate);
  };
  window.speakFixedSentenceToken = function(wordId, index, text) {
    const facade = ensureRecordedAudio(), record = findRecordedRuntimeWord(wordId);
    const result = facade.tapSentenceToken(record, index, text);
    if (result.action === 'OPEN_MODAL') { window.openWordModal(result.wordId, index, text); return false; }
    return result.action === 'PLAY_QUEUED';
  };

  window.speakCurrentCardWord = function () {
    const list = isSessionMode ? sessionQueue : activeCards;
    if (!list || list.length === 0) return;
    const card = list[currentCardIndex];
    if (card) speak(card.word, true, card.id);
  };

  window.speakCurrentCardSentence = function () {
    const list = isSessionMode ? sessionQueue : activeCards;
    if (!list || list.length === 0) return;
    const card = list[currentCardIndex];
    if (card) speakSentenceAudio(card.example, card.word, card.id);
  };

  // Fixed in v3.1.0: Uses AndroidBridge.exportFile(filename, mimeType, content) natively!
  window.downloadAudioManifest = function () {
    const rawCurriculum = window.MASTER_CURRICULUM || {};
    const grades = rawCurriculum.grades || {};
    const headers = [
      'id', 'grade_id', 'grade_title', 'lesson', 'page', 'word', 'phonetic', 'pos',
      'meaning_persian', 'example_sentence', 'mp3_file', 'audio_mode', 'mp3_file_uk'
    ];
    const escapeCsv = (val) => `"${String(val == null ? '' : val).replace(/"/g, '""')}"`;
    const rows = [headers.join(',')];

    Object.entries(grades).forEach(([gradeId, grade]) => {
      (grade.vocabulary || []).forEach(v => {
        const mp3File = v.audioFile || '';
        const mode = v.audioFile ? 'BUNDLED_MP3' : 'NO_RECORDED_AUDIO';
        rows.push([
          escapeCsv(v.id),
          escapeCsv(gradeId),
          escapeCsv(grade.name),
          escapeCsv(v.lesson),
          escapeCsv(v.page || ''),
          escapeCsv(v.word),
          escapeCsv(v.phonetic || ''),
          escapeCsv(v.pos),
          escapeCsv(v.meaning),
          escapeCsv(v.example),
          escapeCsv(mp3File),
          escapeCsv(mode),
          escapeCsv(v.audioFileUk || '')
        ].join(','));
      });
    });

    const csvContent = '\uFEFF' + rows.join('\r\n');
    const filename = `FarhangLex_Audio_Manifest_${getLocalDateString()}.csv`;

    if (window.AndroidBridge && typeof window.AndroidBridge.exportFile === 'function') {
      window.AndroidBridge.exportFile(filename, 'text/csv', csvContent);
      showToast('پنجرهٔ ذخیرهٔ فایل CSV باز شد 💾');
      return;
    }

    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('📥 فایل فهرست ضبط صدا ذخیره شد');
    } catch (e) {
      showToast('⚠️ خطا در ذخیرهٔ فایل CSV');
    }
  };

  // ==========================================================
  // TAB 1: DASHBOARD
  // ==========================================================
  function renderDashboard() {
    if (!gradeData) return;
    const vocab = gradeData._combinedVocab || [];
    const boxCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let dueCount = 0;
    const now = Date.now();

    vocab.forEach(v => {
      const st = userProgress[v.id] || { box: 1, lastReview: 0, nextReview: now };
      boxCounts[st.box] = (boxCounts[st.box] || 0) + 1;
      if (!st.lastReview || st.lastReview === 0 || st.nextReview <= now) {
        dueCount++;
      }
    });

    const todayStr = getLocalDateString();
    const todayReviews = weeklyHistory[todayStr] || 0;
    const target = appSettings.dailyReviewTarget || 15;
    const goalPct = Math.min(100, Math.round((todayReviews / target) * 100));

    const gText = document.getElementById('dash-goal-text');
    const gPct = document.getElementById('dash-goal-pct');
    const gFill = document.getElementById('dash-goal-fill');
    if (gText) gText.textContent = `${toPersianDigits(todayReviews)} از ${toPersianDigits(target)} مرور`;
    if (gPct) gPct.textContent = `${toPersianDigits(goalPct)}٪`;
    if (gFill) gFill.style.width = `${goalPct}%`;
    renderDailyQuestsCard();

    for (let b = 1; b <= 5; b++) {
      const el = document.getElementById(`count-box-${b}`);
      if (el) el.textContent = toPersianDigits(boxCounts[b] || 0);
    }

    const bannerSub = document.getElementById('dash-banner-sub');
    if (bannerSub) {
      bannerSub.textContent = `${gradeData.name} (${gradeData.titleFa}) • شامل ${toPersianDigits(gradeData.lessonsCount)} درس و ${toPersianDigits(vocab.length)} واژهٔ کلیدی در بافتار متن.`;
    }

    const dueBtn = document.getElementById('dash-due-btn');
    if (dueBtn) {
      dueBtn.innerHTML = `<span>⚡</span> شروع مرور هوشمند امروز (${toPersianDigits(dueCount)} کارت)`;
    }

    const listWrap = document.getElementById('dash-lessons-list');
    if (listWrap) {
      listWrap.innerHTML = '';
      (gradeData.lessons || []).forEach(l => {
        const lVocab = vocab.filter(v => v.lesson === l.id);
        const row = document.createElement('div');
        row.className = 'lesson-card-item';
        row.onclick = () => selectLessonForLeitner(l.id);
        row.innerHTML = `
          <div class="lesson-title-area">
            <h4>درس ${toPersianDigits(l.id)}: ${escapeHtml(l.titleFa)}</h4>
            <p>${escapeHtml(l.title)} • ص ${escapeHtml(l.pages)} (${toPersianDigits(lVocab.length)} واژه)</p>
          </div>
          <div class="lesson-badge">مرور درس ⬅️</div>
        `;
        listWrap.appendChild(row);
      });
    }
  }

  window.selectLessonForLeitner = function (lessonId) {
    isSessionMode = false;
    leitnerLessonFilter = String(lessonId);
    populateLeitnerLessonSelect();
    const sel = document.getElementById('leitner-lesson-select');
    if (sel) sel.value = String(lessonId);
    onFilterChange();
    switchTab('leitner');
    showToast(`کارت‌های درس ${toPersianDigits(lessonId)} آمادهٔ مرور شدند 📚`);
  };

  // ==========================================================
  // TAB 2: LEITNER FLASHCARDS, BOOKMARKS & SM-2 SESSION
  // ==========================================================
  function populateLeitnerLessonSelect() {
    const sel = document.getElementById('leitner-lesson-select');
    if (!sel || !gradeData) return;
    const vocab = gradeData._combinedVocab || [];
    let html = `<option value="all">همهٔ درس‌ها (${toPersianDigits(vocab.length)} واژه)</option>`;
    (gradeData.lessons || []).forEach(l => {
      const cnt = vocab.filter(v => v.lesson === l.id).length;
      html += `<option value="${l.id}">درس ${toPersianDigits(l.id)}: ${escapeHtml(l.titleFa)} (${toPersianDigits(cnt)})</option>`;
    });

    const starCount = vocab.filter(v => userProgress[v.id] && userProgress[v.id].starred).length;
    html += `<option value="starred">⭐ واژگان نشان‌شده (${toPersianDigits(starCount)})</option>`;

    const weakCount = vocab.filter(v => {
      const st = userProgress[v.id];
      return st && ((st.lapses >= 1) || (st.fail >= 1));
    }).length;
    html += `<option value="leeches">⚠️ واژگان پرخطا (${toPersianDigits(weakCount)})</option>`;

    sel.innerHTML = html;
    if ([...sel.options].some(o => o.value === String(leitnerLessonFilter))) {
      sel.value = String(leitnerLessonFilter);
    } else {
      leitnerLessonFilter = 'all';
      sel.value = 'all';
    }
  }

  function initLeitner() {
    isSessionMode = false;
    populateLeitnerLessonSelect();
    onFilterChange();
  }

  window.resetLeitnerFilterToAll = function () {
    leitnerLessonFilter = 'all';
    populateLeitnerLessonSelect();
    onFilterChange();
  };

  window.onFilterChange = function () {
    const sel = document.getElementById('leitner-lesson-select');
    if (sel && sel.value) leitnerLessonFilter = sel.value;

    const vocab = (gradeData && gradeData._combinedVocab) ? gradeData._combinedVocab : [];
    if (leitnerLessonFilter === 'all') {
      activeCards = vocab;
    } else if (leitnerLessonFilter === 'starred') {
      activeCards = vocab.filter(v => userProgress[v.id] && userProgress[v.id].starred);
    } else if (leitnerLessonFilter === 'leeches') {
      activeCards = vocab.filter(v => {
        const st = userProgress[v.id];
        return st && ((st.lapses >= 1) || (st.fail >= 1));
      });
    } else {
      const lId = parseInt(leitnerLessonFilter, 10);
      activeCards = Number.isNaN(lId) ? vocab : vocab.filter(v => v.lesson === lId);
    }

    isSessionMode = false;
    currentCardIndex = 0;
    isCardFlipped = false;
    const completeCard = document.getElementById('card-session-complete');
    if (completeCard) completeCard.style.display = 'none';
    renderCurrentCard();
  };

  window.stepCard = function (delta) {
    const cardList = isSessionMode ? sessionQueue : activeCards;
    if (!cardList || cardList.length === 0) return;
    currentCardIndex = (currentCardIndex + delta + cardList.length) % cardList.length;
    isCardFlipped = false;
    renderCurrentCard();
    triggerHaptic(15);
  };

  window.toggleCurrentCardStar = function () {
    const cardList = isSessionMode ? sessionQueue : activeCards;
    if (!cardList || cardList.length === 0) return;
    const card = cardList[currentCardIndex];
    if (!card) return;
    toggleWordStar(card.id);
    renderCurrentCard();
  };

  window.toggleWordStar = function (wordId, ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    if (!userProgress[wordId]) {
      userProgress[wordId] = { wordId: wordId, gradeId: currentGradeId, box: 1, starred: false };
    }
    const st = userProgress[wordId];
    st.starred = !st.starred;
    persistWordProgress(st);
    populateLeitnerLessonSelect();
    checkAndUnlockAchievements(false);
    triggerHaptic(20);
    showToast(st.starred ? '⭐ به واژگان نشان‌شده اضافه شد' : 'از نشان‌شده‌ها برداشته شد');
  };

  window.startDueReviewSession = function () {
    const vocab = gradeData._combinedVocab || [];
    const now = Date.now();

    const dueReviews = vocab.filter(v => {
      const st = userProgress[v.id];
      return st && st.lastReview > 0 && st.nextReview <= now;
    });

    const dailyQuota = appSettings.dailyNewCards || 20;
    const newCards = vocab.filter(v => {
      const st = userProgress[v.id];
      return !st || !st.lastReview || st.lastReview === 0;
    }).slice(0, dailyQuota);

    const combined = [...dueReviews, ...newCards];
    if (combined.length === 0) {
      showToast('🎉 تمامی کارت‌های این پایه به‌روز هستند!');
      return;
    }

    sessionQueue = combined;
    isSessionMode = true;
    currentCardIndex = 0;
    isCardFlipped = false;

    sessionStats = {
      totalCards: sessionQueue.length,
      reviewsDone: 0,
      firstPassCorrect: 0,
      lapses: 0,
      gemsEarned: 0,
      evaluatedFirstPass: {}
    };

    const completeCard = document.getElementById('card-session-complete');
    if (completeCard) completeCard.style.display = 'none';

    switchTab('leitner');
    renderCurrentCard();
    showToast(`جلسهٔ مرور آغاز شد (${toPersianDigits(sessionQueue.length)} کارت در صف) ⚡`);
  };

  function exitSessionMode() {
    isSessionMode = false;
    sessionQueue = [];
    currentCardIndex = 0;
    const completeCard = document.getElementById('card-session-complete');
    if (completeCard) completeCard.style.display = 'none';
    renderCurrentCard();
  }

  function finishReviewSession() {
    isSessionMode = false;
    const content = document.getElementById('card-active-content');
    const completeCard = document.getElementById('card-session-complete');
    if (content) content.style.display = 'none';
    if (completeCard) {
      completeCard.style.display = 'block';
      const acc = sessionStats.totalCards > 0
        ? Math.round((sessionStats.firstPassCorrect / sessionStats.totalCards) * 100)
        : 100;
      document.getElementById('session-stat-cards').textContent = toPersianDigits(sessionStats.totalCards);
      document.getElementById('session-stat-accuracy').textContent = `${toPersianDigits(acc)}٪`;
      document.getElementById('session-stat-retries').textContent = toPersianDigits(sessionStats.lapses);
      document.getElementById('session-stat-gems').textContent = `+${toPersianDigits(sessionStats.gemsEarned)} 💎`;
    }
    playSfx('victory');
    recordSessionAccuracy(sessionStats.firstPassCorrect, sessionStats.totalCards);
    checkAndUnlockAchievements(false);
    triggerHaptic([40, 50, 40]);
  }

  function renderCurrentCard() {
    const flipper = document.getElementById('card-flipper-element');
    const counter = document.getElementById('card-index-display');
    const empty = document.getElementById('card-empty-msg');
    const content = document.getElementById('card-active-content');
    const freeNav = document.getElementById('card-free-nav-row');

    const cardList = isSessionMode ? sessionQueue : activeCards;
    if (!cardList || cardList.length === 0) {
      if (content) content.style.display = 'none';
      if (empty) empty.style.display = 'block';
      if (counter) counter.textContent = '۰ از ۰';
      return;
    }

    if (content) content.style.display = 'block';
    if (empty) empty.style.display = 'none';
    if (freeNav) freeNav.style.display = isSessionMode ? 'none' : 'flex';

    if (currentCardIndex >= cardList.length) currentCardIndex = 0;

    const card = cardList[currentCardIndex];
    isCardFlipped = false;
    if (flipper) {
      // A different card starts face-up, rather than rotating the old back into it.
      // Measuring choices halfway through the 3-D flip exaggerates their bounds and
      // can scroll the lesson picker underneath the header. Keep regular flip and
      // same-card setting animations unchanged.
      if (card.id !== frontShownId && flipper.classList.contains('flipped')) {
        const savedTransition = flipper.style.transition;
        flipper.style.transition = 'none';
        flipper.classList.remove('flipped');
        void flipper.offsetWidth; // commit the face-up state before restoring transitions
        flipper.style.transition = savedTransition;
      } else {
        flipper.classList.remove('flipped');
      }
    }
    const st = userProgress[card.id] || { box: 1, starred: false };
    const pos = getPosInfo(card.pos);

    const starBtn = document.getElementById('card-star-btn');
    if (starBtn) {
      starBtn.textContent = st.starred ? '⭐' : '☆';
      starBtn.classList.toggle('starred', !!st.starred);
    }

    document.getElementById('card-front-tag').textContent = formatLessonPageChip(card);
    const posEl = document.getElementById('card-front-pos');
    posEl.textContent = pos.label;
    posEl.className = `pos-tag ${pos.cls}`;

    document.getElementById('card-front-word').textContent = card.word;
    document.getElementById('card-front-phonetic').textContent = getWordPhonetic(card);

    // 100% Universal Dual-Coding Illustration (all 238 official SVGs + custom pack fallback!)
    const vocabImg = getWordIllustrationSrc(card);
    const fallbackImg = buildFallbackWordSvg(card);
    const frontWrap = document.getElementById('card-front-img-wrap');
    const imgFront = document.getElementById('card-front-img');
    const imgBack = document.getElementById('card-back-img');
    if (frontWrap) frontWrap.style.display = 'flex';
    if (imgFront) {
      imgFront.onerror = function () { this.onerror = null; this.src = fallbackImg; };
      imgFront.src = vocabImg;
      imgFront.alt = card.word;
    }
    if (imgBack) {
      imgBack.style.display = 'block';
      imgBack.onerror = function () { this.onerror = null; this.src = fallbackImg; };
      imgBack.src = vocabImg;
      imgBack.alt = card.word;
    }
    bindZoomableIllustration(imgFront, card);
    bindZoomableIllustration(imgBack, card);

    const safeEx = escapeHtml(card.example || '');
    const rx = createInflectionRegex(card.word);
    const highlightedSentence = safeEx.replace(rx, '<span class="highlighted-term">$&</span>');

    document.getElementById('card-front-sentence-preview').innerHTML = highlightedSentence;
    document.getElementById('card-back-tag').textContent =
      `جعبهٔ ${toPersianDigits(st.box)} لایتنر` + (isSessionMode ? ' (در صف مرور)' : '');
    document.getElementById('card-back-meaning').textContent = card.meaning;
    applyCardRelations(card);
    document.getElementById('card-back-sentence').innerHTML = highlightedSentence;
    setBookExample(document.getElementById('card-back-sentence'), card);
    const cardExLabel = document.getElementById('card-back-ex-label');
    if (cardExLabel) cardExLabel.textContent = '📌 ' + exampleLabelText(card);

    const sm2 = calculateSM2Intervals(st);
    document.getElementById('srs-time-again').textContent = sm2.again.text;
    document.getElementById('srs-time-hard').textContent = sm2.hard.text;
    document.getElementById('srs-time-good').textContent = sm2.good.text;
    document.getElementById('srs-time-easy').textContent = sm2.easy.text;

    const leechBadge = document.getElementById('card-front-leech-badge');
    if (leechBadge) {
      leechBadge.style.display = (st.lapses >= 3 || st.fail >= 3) ? 'inline-flex' : 'none';
    }

    // Active Recall Choices (Psychometric Same-POS & Semantically Plausible!)
    lastRecallResult = null;
    const recallWrap = document.getElementById('card-front-recall-wrap');
    const recallChoices = document.getElementById('card-front-recall-choices');
    if (recallWrap && recallChoices) {
      if (appSettings.activeRecall && !isCardFlipped) {
        recallWrap.style.display = 'block';
        recallChoices.innerHTML = '';
        const defChoices = isEnglishOnlyCard(card) ? getDefinitionChoices(card) : null;
        const synPool = (isEnglishOnlyCard(card) && !defChoices) ? getSynonymQuizPool(card) : [];
        const enRecall = !!defChoices || synPool.length >= 3;
        let choices;
        if (defChoices) {
          choices = shuffleCopy([
            { text: card.defEn, isCorrect: true, en: true },
            ...defChoices.map(t => ({ text: t, isCorrect: false, en: true }))
          ]);
        } else if (enRecall) {
          const syns = relWords(card, 'synonyms');
          const right = syns[Math.floor(Math.random() * syns.length)];
          choices = shuffleCopy([
            { text: right, isCorrect: true, en: true },
            ...shuffleCopy(synPool).slice(0, 3).map(w => ({ text: w, isCorrect: false, en: true }))
          ]);
        } else {
          const wrong = getPsychometricDistractors(card, 3);
          choices = [
            { text: card.meaning, isCorrect: true },
            ...wrong.map(w => ({ text: w.meaning, isCorrect: false }))
          ].sort(() => 0.5 - Math.random());
        }
        const recallLbl = recallWrap.querySelector('.recall-prompt-lbl');
        if (recallLbl) {
          recallLbl.textContent = defChoices
            ? '🧠 تعریف انگلیسی واژه را انتخاب کنید:'
            : enRecall
            ? '🧠 هم‌معنی انگلیسی واژه را انتخاب کنید:'
            : '🧠 معنی واژه را قبل از چرخش کارت انتخاب کنید:';
        }

        let recallLocked = false;
        choices.forEach(ch => {
          const btn = document.createElement('button');
          btn.className = 'recall-choice-btn' + (ch.en ? ' en' : '');
          btn.textContent = ch.text;
          if (ch.en) btn.dir = 'ltr';
          if (ch.isCorrect) btn.dataset.correct = '1';
          btn.onclick = (e) => {
            e.stopPropagation();
            if (recallLocked) return;
            recallLocked = true;
            if (ch.isCorrect) {
              lastRecallResult = 'correct';
              btn.classList.add('correct');
              playSfx('correct');
              triggerHaptic(20);
              setTimeout(() => { if (!isCardFlipped) flipCard(); }, 360);
            } else {
              lastRecallResult = 'wrong';
              btn.classList.add('wrong');
              playSfx('wrong');
              triggerHaptic([60, 40, 60]);
              recallChoices.querySelectorAll('.recall-choice-btn').forEach(b => {
                if (b.dataset.correct === '1') b.classList.add('correct');
              });
              setTimeout(() => { if (!isCardFlipped) flipCard(); }, 560);
            }
          };
          recallChoices.appendChild(btn);
        });
      } else {
        recallWrap.style.display = 'none';
      }
    }

    syncCardFlipDrawerState();

    const frontSourceTag = document.getElementById('card-front-source-tag');
    const frontReviewBadge = document.getElementById('card-front-review-badge');
    const backReviewBadge = document.getElementById('card-back-review-badge');
    const refEl = document.getElementById('card-back-ref-text');

    const src = card.source || (card.isOfficial ? 'book' : 'sample');
    const cardMeta = getWordGradeAndLessonMeta(card);
    if (frontSourceTag) {
      if (src === 'book') {
        frontSourceTag.className = 'source-tag source-book';
        frontSourceTag.textContent = `📖 ${cardMeta.bookWithGrade}`;
      } else if (src === 'workbook') {
        frontSourceTag.className = 'source-tag source-workbook';
        frontSourceTag.textContent = `📒 کتاب کار • ${cardMeta.bookWithGrade}`;
      } else if (src === 'extra') {
        frontSourceTag.className = 'source-tag source-extra';
        frontSourceTag.textContent = `✨ تکمیلی • ${cardMeta.bookWithGrade}`;
      } else {
        frontSourceTag.className = 'source-tag source-sample';
        frontSourceTag.textContent = `📖 ${cardMeta.bookWithGrade}`;
      }
    }

    const needsReview = !!card.needsTeacherReview;
    if (frontReviewBadge) frontReviewBadge.style.display = needsReview ? 'inline-flex' : 'none';
    if (backReviewBadge) backReviewBadge.style.display = needsReview ? 'inline-flex' : 'none';

    if (refEl) {
      // v3.11 — English runs (book name, lesson title) are isolated so a line never breaks them inside the RTL text
      refEl.innerHTML = isolateLatinRuns(formatBookLessonFull(card));
    }

    if (counter) {
      counter.textContent = isSessionMode
        ? `صف: ${toPersianDigits(currentCardIndex + 1)} از ${toPersianDigits(cardList.length)}`
        : `${toPersianDigits(currentCardIndex + 1)} از ${toPersianDigits(cardList.length)}`;
    }

    if (appSettings.autoPlay && currentTabName === 'leitner') {
      speak(card.word, true, card.id);
    }
    revealCardFront(card.id);
  }

  // v3.11 (F21): a new card starts at its top; its answer area (4 choices, or the flip button in «ساده») must be on
  // screen without scrolling — on small phones scroll just enough, never past the word.
  let frontShownId = null;
  function revealCardFront(cardId) {
    const isNew = cardId !== frontShownId;
    frontShownId = cardId;
    const run = first => {
      if (currentTabName !== 'leitner' || isCardFlipped) return;
      const sc = document.querySelector('main.native-content-body');
      if (!sc) return;
      if (first && isNew) sc.scrollTop = 0;
      const choices = document.getElementById('card-front-recall-choices');
      const cta = document.getElementById('card-flip-cta-btn');
      const target = (choices && choices.offsetParent && choices.children.length) ? choices : (cta && cta.offsetParent ? cta : null);
      const word = document.getElementById('card-front-word');
      if (!target) return;
      const bar = document.querySelector('.android-bottom-bar');
      const limit = (bar ? bar.getBoundingClientRect().top : window.innerHeight) - 8;
      let dy = Math.ceil(target.getBoundingClientRect().bottom - limit);
      if (dy <= 0) return;
      if (word) dy = Math.min(dy, Math.floor(word.getBoundingClientRect().top - (sc.getBoundingClientRect().top + 8)));
      if (dy > 0) sc.scrollTop += dy;
    };
    requestAnimationFrame(() => { run(true); setTimeout(() => run(false), 160); });
  }

  function syncCardFlipDrawerState() {
    const drawer = document.getElementById('srs-reveal-drawer');
    const ctaWrap = document.getElementById('card-flip-cta-wrap');
    const caption = document.getElementById('srs-drawer-caption');
    const btnAgain = document.getElementById('srs-btn-again');
    const btnGood = document.getElementById('srs-btn-good');

    if (btnAgain) btnAgain.classList.remove('suggested');
    if (btnGood) btnGood.classList.remove('suggested');

    if (isCardFlipped) {
      if (ctaWrap) ctaWrap.style.display = 'none';
      if (drawer) drawer.classList.add('open');
      if (caption) {
        if (lastRecallResult === 'correct') {
          caption.textContent = '✅ انتخاب صحیح بود! اکنون درجهٔ تسلط واژه را ثبت کنید:';
          if (btnGood) btnGood.classList.add('suggested');
        } else if (lastRecallResult === 'wrong') {
          caption.textContent = '💡 معنی صحیح را مرور کنید؛ برای تکرار، «دوباره» را بزنید:';
          if (btnAgain) btnAgain.classList.add('suggested');
        } else {
          caption.textContent = '📊 میزان تسلط خود را ثبت کنید:';
        }
      }
    } else {
      if (drawer) drawer.classList.remove('open');
      if (ctaWrap) {
        // When Active Recall 4-choices are shown, user picks a choice (or taps card); when off, show prominent flip button
        ctaWrap.style.display = appSettings.activeRecall ? 'none' : 'flex';
      }
    }
  }

  window.flipCard = function () {
    const flipper = document.getElementById('card-flipper-element');
    if (!flipper) return;
    isCardFlipped = !isCardFlipped;
    flipper.classList.toggle('flipped', isCardFlipped);
    syncCardFlipDrawerState();
    triggerHaptic(20);
    if (isCardFlipped) revealRatingButtons();
    else revealCardFront(frontShownId);
  };

  // v3.11 — on a short screen the four rating buttons must not hide under the tab bar: after the flip the
  // page scrolls just enough to show them (the card never overlaps them; it only moves up).
  function revealRatingButtons() {
    setTimeout(() => {
      const row = document.querySelector('#srs-reveal-drawer .srs-4button-row');
      const sc = document.querySelector('main.native-content-body');
      const bar = document.querySelector('.android-bottom-bar');
      if (!row || !sc || !isCardFlipped) return;
      const limit = (bar ? bar.getBoundingClientRect().top : window.innerHeight) - 8;
      const r = row.getBoundingClientRect();
      if (r.bottom > limit) sc.scrollTop += Math.ceil(r.bottom - limit);
    }, 380);
  }

  // English runs inside Persian text → <bdi dir="ltr"> (text is escaped first)
  function isolateLatinRuns(text) {
    return escapeHtml(String(text || '')).replace(/[A-Za-z][A-Za-z0-9'’.,:&\- ]*[A-Za-z0-9.)]?/g, m => {
      const t = m.replace(/\s+$/, '');
      const tail = m.slice(t.length);
      return `<bdi dir="ltr">${t}</bdi>${tail}`;
    });
  }

  window.answerSRS = function (rating) {
    const cardList = isSessionMode ? sessionQueue : activeCards;
    if (!cardList || cardList.length === 0) return;

    const card = cardList[currentCardIndex];
    if (!userProgress[card.id]) {
      userProgress[card.id] = {
        wordId: card.id,
        gradeId: currentGradeId,
        box: 1,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        lapses: 0,
        success: 0,
        fail: 0,
        starred: false,
        lastReview: 0,
        nextReview: 0,
        masteryAwarded: false
      };
    }
    const st = userProgress[card.id];
    const now = Date.now();
    const wasDueOnSchedule = (st.lastReview || 0) > 0 && now >= (st.nextReview || 0);
    const countedAsValidActivity = recordReviewActivity();
    sessionStats.reviewsDone++;

    if (countedAsValidActivity) {
      const dq = ensureTodayQuests();
      dq.leitnerCount = (dq.leitnerCount || 0) + 1;
      if (rating !== 'again') {
        awardXP(wasDueOnSchedule ? 12 : 6);
      } else {
        awardXP(2);
      }
      evaluateDailyQuestRewards();
    }

    const sm2 = calculateSM2Intervals(st);

    if (rating === 'again') {
      st.repetitions = 0;
      st.interval = 0;
      st.easeFactor = Math.max(1.3, (st.easeFactor || 2.5) - 0.2);
      st.lapses = (st.lapses || 0) + 1;
      st.fail = (st.fail || 0) + 1;
      st.box = 1;
      st.lastReview = now;
      st.nextReview = now + 10 * 60 * 1000;

      if (isSessionMode) {
        if (!sessionStats.evaluatedFirstPass[card.id]) {
          sessionStats.evaluatedFirstPass[card.id] = 'failed';
          sessionStats.lapses++;
        }
        sessionQueue.push(card);
        showToast(`«${card.word}» برای تثبیت به انتهای صف مرور افزوده شد 🔄`);
      } else {
        showToast(`«${card.word}» به جعبهٔ ۱ بازگشت 🔄`);
      }
    } else if (rating === 'hard') {
      st.interval = sm2.hard.days;
      st.easeFactor = Math.max(1.3, (st.easeFactor || 2.5) - 0.15);
      st.success = (st.success || 0) + 1;
      st.box = mapIntervalToBox(st.interval);
      st.lastReview = now;
      st.nextReview = now + st.interval * MS_DAY;
      if (isSessionMode && !sessionStats.evaluatedFirstPass[card.id]) {
        sessionStats.evaluatedFirstPass[card.id] = 'passed';
        sessionStats.firstPassCorrect++;
      }
      showToast(`ثبت شد: مرور بعدی ${toPersianDigits(st.interval)} روز دیگر`);
    } else if (rating === 'good') {
      st.interval = sm2.good.days;
      st.repetitions = (st.repetitions || 0) + 1;
      st.success = (st.success || 0) + 1;
      st.box = mapIntervalToBox(st.interval);
      st.lastReview = now;
      st.nextReview = now + st.interval * MS_DAY;
      if (isSessionMode && !sessionStats.evaluatedFirstPass[card.id]) {
        sessionStats.evaluatedFirstPass[card.id] = 'passed';
        sessionStats.firstPassCorrect++;
      }
      if (st.box === 5 && !st.masteryAwarded) {
        st.masteryAwarded = true;
        userGamification.gems += 5;
        sessionStats.gemsEarned += 5;
        saveGamification();
        showToast(`🎉 تسلط کامل بر «${card.word}» (+۵ 💎)`);
      } else {
        showToast(`آفرین! مرور بعدی ${toPersianDigits(st.interval)} روز دیگر 🚀`);
      }
    } else if (rating === 'easy') {
      st.interval = sm2.easy.days;
      st.repetitions = (st.repetitions || 0) + 1;
      st.easeFactor = (st.easeFactor || 2.5) + 0.15;
      st.success = (st.success || 0) + 1;
      st.box = mapIntervalToBox(st.interval);
      st.lastReview = now;
      st.nextReview = now + st.interval * MS_DAY;
      if (isSessionMode && !sessionStats.evaluatedFirstPass[card.id]) {
        sessionStats.evaluatedFirstPass[card.id] = 'passed';
        sessionStats.firstPassCorrect++;
      }
      if (st.box === 5 && !st.masteryAwarded) {
        st.masteryAwarded = true;
        userGamification.gems += 7;
        sessionStats.gemsEarned += 7;
        saveGamification();
        showToast(`⚡ تسلط جهشی بر «${card.word}» (+۷ 💎)`);
      } else {
        showToast(`عالی! مرور بعدی ${toPersianDigits(st.interval)} روز دیگر 🌟`);
      }
    }

    if (rating === 'again') {
      playSfx('wrong');
    } else if (lastRecallResult !== 'correct') {
      playSfx('correct');
    }

    persistWordProgress(st);
    populateLeitnerLessonSelect();
    checkAndUnlockAchievements(false);

    if (isSessionMode) {
      sessionQueue.splice(currentCardIndex, 1);
      if (sessionQueue.length === 0) {
        finishReviewSession();
        return;
      }
      if (currentCardIndex >= sessionQueue.length) currentCardIndex = 0;
    } else {
      currentCardIndex = (currentCardIndex + 1) % activeCards.length;
    }

    renderCurrentCard();
  };

  // ==========================================================
  // TAB 3: CONTEXTUAL SENTENCES & WORD MODAL
  // ==========================================================
  function renderTokenizedSentence(sentence, targetWord, targetWordId) {
    if (!sentence) return '';
    const rx = createInflectionRegex(targetWord);
    const parts = sentence.split(/([a-zA-Z]+(?:['’][a-zA-Z]+)?)/g);
    let html = '';
    let tokenIndex = 0;
    parts.forEach(part => {
      if (/^[a-zA-Z]+(?:['’][a-zA-Z]+)?$/.test(part)) {
        const index = tokenIndex++;
        rx.lastIndex = 0;
        if (rx.test(part)) {
          const safeId = String(targetWordId).replace(/'/g, "\\'");
          const safeSurface = part.replace(/'/g, "\\'");
          html += `<span class="interactive-term target-word" onclick="event.stopPropagation(); openWordModal('${safeId}', ${index}, '${safeSurface}');">${escapeHtml(part)}</span>`;
        } else {
          const safeWord = part.replace(/'/g, "\\'");
          const safeId = String(targetWordId || '').replace(/'/g, "\\'");
          html += `<span class="sentence-token" onclick="event.stopPropagation(); if (speakFixedSentenceToken('${safeId}', ${index}, '${safeWord}')) showQuickWordToast('${safeWord}');">${escapeHtml(part)}</span>`;
        }
      } else {
        // v3.11 (F43): «cheetah .» — punctuation right after a word sits in .tok-punct, pulled over the word's padding
        const m = /^[.,!?;:\u2019\u201D)\]]+/.exec(part);
        if (m && html.endsWith('</span>')) html += `<span class="tok-punct">${escapeHtml(m[0])}</span>` + escapeHtml(part.slice(m[0].length));
        else html += escapeHtml(part);
      }
    });
    return html;
  }

  window.showQuickWordToast = function (word) {
    showToast(`🔊 ${word}`);
  };

  function initContextReader() {
    const container = document.getElementById('context-reader-list');
    if (!container || !gradeData) return;
    container.innerHTML = '';

    const vocab = gradeData._combinedVocab || [];
    (gradeData.lessons || []).forEach(l => {
      const lVocab = vocab.filter(v => v.lesson === l.id);
      const card = document.createElement('div');
      card.className = 'reader-section-card';

      let sentencesHtml = '';
      lVocab.forEach(v => {
        const tokenized = renderTokenizedSentence(v.example || '', v.word, v.id);
        const pos = getPosInfo(v.pos);
        const safeId = String(v.id).replace(/'/g, "\\'");
        sentencesHtml += `<p style="margin-bottom: 10px; line-height: 1.85;">
          • ${tokenized}
          <span class="pos-tag ${pos.cls}" style="font-size: 12px; padding: 1px 5px; margin-right: 4px;">${pos.label}</span>
          <button class="passage-audio-btn" onclick="event.stopPropagation(); speakSentenceByWordId('${safeId}');" title="شنیدن جملهٔ کامل">🔊</button>
        </p>`;
      });

      card.innerHTML = `
        <div class="reader-head">
          <h3>درس ${toPersianDigits(l.id)}: ${escapeHtml(l.titleFa)}</h3>
          <span>صفحات ${escapeHtml(l.pages)}</span>
        </div>
        <div class="reader-passage-body">
          ${sentencesHtml || '<p>برای این درس جملهٔ درسی ثبت نشده است.</p>'}
        </div>
      `;
      card.insertAdjacentHTML('beforeend', buildFurtherBlock(l.id));
      container.appendChild(card);
    });
  }

  // ==========================================================
  // v3.8.0 — FURTHER READING / LISTENING TEXTS (Vision 1–3)
  // Teacher transcription (M. A. Bazel) declared a trusted source by the app's author (2026-10-28): source badge,
  // logged corrections and a 12px credit line. Text only (no audio). Pre / while / post reading, tap-to-gloss, A−/A+.
  // ==========================================================
  const FURTHER_FONT_KEY = 'flx_further_font';
  const FURTHER_PROG_KEY = 'flx_further_progress';
  let furtherCurrent = null;
  let furtherTapped = [];
  let furtherGlossIndex = null;
  let furtherRating = 0;

  function furtherItems(gradeId, lessonId) {
    const F = window.FURTHER_TEXTS;
    if (!F || !Array.isArray(F.items)) return [];
    return F.items.filter(x => x.grade === gradeId && (lessonId == null || x.lesson === lessonId));
  }
  // The 2026-11-02 display order changed; stored keys retain the v3.11.4 TEXT identity.
  // Swap only at the read/write boundary: old on-device progress and backups need no rewrite.
  function remapFurtherProgress(p) {
    if (!p || typeof p !== 'object' || Array.isArray(p)) return p;
    const a = 'vision_3_l3_listening1', b = 'vision_3_l3_listening2';
    const q = Object.assign(Object.create(null), p);
    if (Object.prototype.hasOwnProperty.call(p, b)) q[a] = p[b]; else delete q[a];
    if (Object.prototype.hasOwnProperty.call(p, a)) q[b] = p[a]; else delete q[b];
    return q;
  }
  function furtherProgress() {
    try { return remapFurtherProgress(JSON.parse(localStorage.getItem(FURTHER_PROG_KEY) || '{}') || {}); } catch (e) { return {}; }
  }
  function saveFurtherProgress(p) {
    try { localStorage.setItem(FURTHER_PROG_KEY, JSON.stringify(remapFurtherProgress(p))); } catch (e) {}
  }
  function getFurtherFont() {
    const v = parseInt(localStorage.getItem(FURTHER_FONT_KEY) || '18', 10);
    return Math.min(24, Math.max(16, isNaN(v) ? 18 : v));
  }

  function buildFurtherBlock(lessonId) {
    const items = furtherItems(currentGradeId, lessonId);
    if (!items.length) return '';
    const prog = furtherProgress();
    const rows = items.map(it => {
      const hasA = !!furtherAudioInfo(it.id);
      const kind = it.part === 'reading' ? `📖 Further Reading${hasA ? ' • 🔊 با صوت' : ''}` : `🎧 Further Listening ${toPersianDigits(it.n)} • ${hasA ? 'صوت + متن' : 'فقط متن'}`;
      const done = !!(prog[it.id] && prog[it.id].done);
      return `<button type="button" class="further-item-btn${done ? ' is-done' : ''}" data-fid="${it.id}" onclick="openFurtherText('${it.id}')">` +
        `<span class="further-item-main"><bdi dir="ltr" class="further-item-title">${escapeHtml(it.title)}</bdi>` +
        `<span class="further-item-kind">${kind} • ${toPersianDigits(it.words)} واژه</span></span>` +
        `<span class="further-item-state" aria-hidden="true">${done ? '✓' : '‹'}</span></button>`;
    }).join('');
    return `<div class="further-block"><div class="further-block-head"><span>📚 متن‌های بیشتر این درس</span></div>${rows}</div>`;
  }

  function furtherLemmas(tok) {
    const t = String(tok).toLowerCase().replace(/'s$/, '');
    const out = [t];
    if (t.length > 4 && t.endsWith('ies')) out.push(t.slice(0, -3) + 'y');
    if (t.length > 3 && t.endsWith('es')) out.push(t.slice(0, -2));
    if (t.length > 3 && t.endsWith('s') && !t.endsWith('ss')) out.push(t.slice(0, -1));
    if (t.length > 4 && t.endsWith('ied')) out.push(t.slice(0, -3) + 'y');
    if (t.length > 3 && t.endsWith('ed')) { out.push(t.slice(0, -2)); out.push(t.slice(0, -1)); if (/(.)\1ed$/.test(t)) out.push(t.slice(0, -3)); }
    if (t.length > 4 && t.endsWith('ing')) { out.push(t.slice(0, -3)); out.push(t.slice(0, -3) + 'e'); if (/(.)\1ing$/.test(t)) out.push(t.slice(0, -4)); }
    return out;
  }
  function buildFurtherGlossIndex() {
    const single = new Map(), multi = [];
    getAllGlobalVocabulary().forEach(v => {
      const w = String(v.word || '').trim().toLowerCase();
      if (!w || !v.meaning) return;
      if (/\s/.test(w)) {
        const parts = w.split(/\s+/);
        if (parts.every(p => /^[a-z']+$/.test(p))) multi.push({ parts, v });
      } else if (!single.has(w) || v._gradeId === currentGradeId) {
        single.set(w, v);
      }
    });
    multi.sort((a, b) => b.parts.length - a.parts.length);
    return { single, multi };
  }
  function lookupFurtherWord(tok) {
    for (const c of furtherLemmas(tok)) {
      const v = furtherGlossIndex.single.get(c);
      if (v) return v;
    }
    return null;
  }
  function tokenizeFurther(text, lessonIds) {
    const toks = String(text).match(/[A-Za-z]+(?:'[A-Za-z]+)?|[^A-Za-z]+/g) || [];
    let html = '';
    const span = (v, s) => v
      ? `<span class="fr-w is-known${lessonIds.has(v.id) ? ' is-lesson' : ''}" data-id="${escapeHtml(v.id)}">${escapeHtml(s)}</span>`
      : `<span class="fr-w">${escapeHtml(s)}</span>`;
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (!/^[A-Za-z]/.test(t)) { html += escapeHtml(t); continue; }
      let hit = null, len = 0;
      for (const m of furtherGlossIndex.multi) {        // multi-word entries first («mother tongue», «look up»)
        let j = i, k = 0, ok = true;
        while (k < m.parts.length) {
          if (j >= toks.length) { ok = false; break; }
          const w = toks[j];
          if (!/^[A-Za-z]/.test(w)) {
            if (k > 0 && /^[\s-]+$/.test(w)) { j++; continue; }
            ok = false; break;
          }
          const last = k === m.parts.length - 1;
          if (!(last ? furtherLemmas(w).includes(m.parts[k]) : w.toLowerCase() === m.parts[k])) { ok = false; break; }
          j++; k++;
        }
        if (ok) { hit = m.v; len = j - i; break; }
      }
      if (hit) { html += span(hit, toks.slice(i, i + len).join('')); i += len - 1; continue; }
      html += span(lookupFurtherWord(t), t);
    }
    return html;
  }

  function applyFurtherFont() {
    const fs = getFurtherFont();
    const tx = document.getElementById('fr-text');
    if (tx) tx.style.fontSize = fs + 'px';
    const lab = document.getElementById('fr-font-val');
    if (lab) lab.textContent = toPersianDigits(fs);
    const dec = document.getElementById('fr-font-dec'), inc = document.getElementById('fr-font-inc');
    if (dec) dec.disabled = fs <= 16;
    if (inc) inc.disabled = fs >= 24;
  }
  window.stepFurtherFont = function (d) {
    const fs = Math.min(24, Math.max(16, getFurtherFont() + d));
    try { localStorage.setItem(FURTHER_FONT_KEY, String(fs)); } catch (e) {}
    applyFurtherFont();
    triggerHaptic(10);
  };
  window.toggleFurtherProv = function () {
    const d = document.getElementById('fr-prov-detail'), b = document.getElementById('fr-prov');
    if (!d) return;
    d.hidden = !d.hidden;
    if (b) b.setAttribute('aria-expanded', d.hidden ? 'false' : 'true');
  };

  // ── v3.8.2: audio of the Further texts — our own TTS (voice-00, the same voice as the word audio) ──
  // One <audio> element; paused on close, on Android back, on any other sound (stopAllAudio) and when the app goes to background.
  const FURTHER_RATE_KEY = 'flx_further_rate';
  const FURTHER_RATES = [1, 0.85, 0.7];
  var furtherAudio = null;
  var furtherPlayGeneration = 0, furtherNotifiedGeneration = -1;
  let furtherSeeking = false;
  function reportFurtherAudioError(generation) {
    if (generation !== furtherPlayGeneration || furtherNotifiedGeneration === generation) return;
    furtherNotifiedGeneration = generation;
    showToast('🔇 صوت این متن پخش نشد');
  }
  function furtherAudioInfo(id) {
    const clip = ensureRecordedAudio().resolveFurther(id);
    return clip ? { id, file: clip.src.slice('audio/'.length), dur: clip.duration, turns: clip.turns } : null;
  }
  function refreshFurtherAudioDisclosure(it) {
    if (!it) return;
    const info = furtherAudioInfo(it.id), voice = appSettings.accent === 'en-GB' ? 'بریتانیایی' : 'آمریکایی';
    const p = document.getElementById('fr-audio-provenance');
    if (p) p.textContent = info
      ? 'صوت: خوانش برنامه با لهجهٔ ' + voice + (info.turns ? ' و دو گوینده' : '') + '؛ صوت رسمی کتاب نیست.'
      : 'صوت متن با لهجهٔ انتخابی در این نمونه موجود نیست.';
    const gradeLabel = { vision_1: 'Vision 1', vision_2: 'Vision 2', vision_3: 'Vision 3' }[it.grade] || it.grade;
    const kind = it.part === 'reading' ? 'Further Reading' : `Further Listening ${it.n}${info ? '' : ' (فقط متن)'}`;
    const label = document.getElementById('fr-kind');
    if (label) label.innerHTML = `<bdi dir="ltr">${kind}</bdi> • <bdi dir="ltr">${gradeLabel}</bdi> • درس ${toPersianDigits(it.lesson)}`;
    const hint = document.getElementById('fr-hint2'), isListening = it.part !== 'reading';
    if (hint) hint.textContent = !info ? 'روی هر واژه بزنید تا معنی‌اش نمایش داده شود. واژه‌های درس پررنگ‌اند.'
      : isListening ? 'اول یک بار فقط گوش بدهید، بعد همراه صوت بخوانید. روی هر واژه بزنید تا معنی‌اش بیاید؛ واژه‌های درس پررنگ‌اند.'
      : 'روی هر واژه بزنید تا معنی‌اش نمایش داده شود. واژه‌های درس پررنگ‌اند. با ▶ متن را بشنوید.';
  }
  function fmtFurtherTime(t) {
    const s = Math.max(0, Math.floor(t || 0));
    return toPersianDigits(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
  }
  function getFurtherRate() {
    let r = 1;
    try { r = parseFloat(localStorage.getItem(FURTHER_RATE_KEY)); } catch (e) {}
    return FURTHER_RATES.includes(r) ? r : 1;
  }
  function furtherRateLabel(r) {
    return (r === 1 ? '۱' : toPersianDigits(String(r)).replace('.', '٫')) + '×';
  }
  function furtherDur() {
    const info = furtherCurrent && furtherAudioInfo(furtherCurrent.id);
    const a = furtherAudio;
    return (a && isFinite(a.duration) && a.duration > 0) ? a.duration : (info ? info.dur : 0);
  }
  function furtherTotalLabel() {        // total from the data file (ffprobe) → stable label, no 52↔53 flip while loading
    const info = furtherCurrent && furtherAudioInfo(furtherCurrent.id);
    return fmtFurtherTime(info ? info.dur : furtherDur());
  }
  function updateFurtherPlayer() {
    const a = furtherAudio;
    if (!a || !furtherCurrent || !furtherAudioInfo(furtherCurrent.id)) return;
    const dur = furtherDur();
    const playing = !a.paused && !a.ended;
    const btn = document.getElementById('fr-play');
    if (btn) {
      btn.textContent = playing ? '❚❚' : '▶';
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-label', playing ? 'مکث' : 'پخش صوت متن');
    }
    const seek = document.getElementById('fr-seek');
    if (seek && !furtherSeeking && dur > 0) seek.value = String(Math.round(1000 * Math.min(1, (a.currentTime || 0) / dur)));
    const tm = document.getElementById('fr-time');
    if (tm && !furtherSeeking) tm.textContent = `${fmtFurtherTime(a.currentTime)} / ${furtherTotalLabel()}`;
    markFurtherTurn(a);
  }
  // v3.8.4: two-voice dialogue — the line being spoken is highlighted (start times of the turns come from the data file)
  let furtherTurnIdx = -1;
  function markFurtherTurn(a) {
    const info = furtherCurrent && furtherAudioInfo(furtherCurrent.id);
    const turns = info && info.turns;
    let k = -1;
    if (turns && a && !a.ended && (a.currentTime || 0) > 0) {
      for (let i = 0; i < turns.length; i++) if (a.currentTime + 0.05 >= turns[i]) k = i;
    }
    if (k === furtherTurnIdx) return;
    furtherTurnIdx = k;
    const els = document.querySelectorAll('#further-reader-overlay .fr-turn');
    els.forEach((el, i) => el.classList.toggle('is-speaking', i === k));
    // keep the spoken line on screen (only moves when it is outside the view; scroll-margin keeps it below the sticky player)
    if (k >= 0 && els[k] && els[k].scrollIntoView) els[k].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function ensureFurtherAudio() {
    if (furtherAudio) return furtherAudio;
    const a = new Audio();
    a.preload = 'metadata';
    ['play', 'pause', 'timeupdate', 'loadedmetadata', 'seeked', 'ratechange'].forEach(ev => a.addEventListener(ev, updateFurtherPlayer));
    a.addEventListener('ended', () => {
      updateFurtherPlayer();
      const info = furtherCurrent && furtherAudioInfo(furtherCurrent.id);
      const duration = Number.isFinite(a.duration) && a.duration > 0 ? a.duration : (info && info.dur);
      if (furtherCurrent && info && a.ended && Number.isFinite(duration) && a.currentTime >= duration - 0.15) {
        const p = furtherProgress();
        p[furtherCurrent.id] = Object.assign({}, p[furtherCurrent.id], { listened: true });
        saveFurtherProgress(p);
      }
      triggerHaptic(12);
    });
    a.addEventListener('error', () => {
      const ov = document.getElementById('further-reader-overlay');
      if (ov && ov.classList.contains('show') && a.getAttribute('src')) reportFurtherAudioError(furtherPlayGeneration);
    });
    furtherAudio = a;
    return a;
  }
  function stopFurtherAudio() {
    furtherPlayGeneration++;
    if (!furtherAudio) return;
    try { furtherAudio.pause(); furtherAudio.currentTime = 0; } catch (e) {}
    markFurtherTurn(furtherAudio);
  }
  function setFurtherVeil(on) {
    const tx = document.getElementById('fr-text'), b = document.getElementById('fr-hide'), h = document.getElementById('fr-veil-hint');
    if (tx) tx.classList.toggle('is-veiled', !!on);
    if (b) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.textContent = on ? '👀 نمایش متن' : '🙈 اول فقط گوش بدهید'; }
    if (h) h.hidden = !on;
  }
  window.toggleFurtherVeil = function () {
    const tx = document.getElementById('fr-text');
    setFurtherVeil(!(tx && tx.classList.contains('is-veiled')));
    triggerHaptic(8);
  };
  function setupFurtherAudio(it) {
    const info = furtherAudioInfo(it.id);
    stopFurtherAudio();
    furtherSeeking = false;
    const box = document.getElementById('fr-audio'), hide = document.getElementById('fr-hide');
    if (box) box.hidden = !info;
    if (hide) hide.hidden = !info;
    setFurtherVeil(false);
    if (!info) { if (furtherAudio) { furtherAudio.removeAttribute('src'); try { furtherAudio.load(); } catch (e) {} } return; }
    const a = ensureFurtherAudio();
    a.src = new URL('../' + info.file, location.href).href;   // local further/ folder at site root
    try { a.load(); } catch (e) {}
    a.playbackRate = getFurtherRate();
    document.getElementById('fr-rate').textContent = furtherRateLabel(getFurtherRate());
    document.getElementById('fr-seek').value = '0';
    document.getElementById('fr-time').textContent = `${fmtFurtherTime(0)} / ${fmtFurtherTime(info.dur)}`;
    const btn = document.getElementById('fr-play');
    btn.textContent = '▶'; btn.classList.remove('is-playing'); btn.setAttribute('aria-label', 'پخش صوت متن');
  }
  window.toggleFurtherAudio = function () {
    if (!furtherCurrent || !furtherAudioInfo(furtherCurrent.id)) return;
    const a = ensureFurtherAudio();
    if (a.paused || a.ended) {
      stopAllAudio(true);              // silence a word clip / native TTS, keep this track
      a.playbackRate = getFurtherRate();
      const generation = ++furtherPlayGeneration;
      try {
        const pr = a.play();
        if (pr && pr.catch) pr.catch(() => reportFurtherAudioError(generation));
      } catch (e) { reportFurtherAudioError(generation); return; }
      triggerHaptic(10);
    } else {
      furtherPlayGeneration++;
      a.pause();
      triggerHaptic(8);
    }
  };
  window.seekFurtherAudio = function (d) {
    if (!furtherAudio || !furtherCurrent || !furtherAudioInfo(furtherCurrent.id)) return;
    try { furtherAudio.currentTime = Math.max(0, Math.min(furtherDur(), (furtherAudio.currentTime || 0) + d)); } catch (e) {}
    updateFurtherPlayer();
    triggerHaptic(8);
  };
  window.cycleFurtherRate = function () {
    const r = FURTHER_RATES[(FURTHER_RATES.indexOf(getFurtherRate()) + 1) % FURTHER_RATES.length];
    try { localStorage.setItem(FURTHER_RATE_KEY, String(r)); } catch (e) {}
    if (furtherAudio) furtherAudio.playbackRate = r;
    const b = document.getElementById('fr-rate');
    if (b) b.textContent = furtherRateLabel(r);
    triggerHaptic(8);
  };
  function bindFurtherSeek() {
    const sk = document.getElementById('fr-seek');
    if (!sk || sk.dataset.bound) return;
    sk.addEventListener('input', () => {
      furtherSeeking = true;
      const tm = document.getElementById('fr-time'), dur = furtherDur();
      if (tm) tm.textContent = `${fmtFurtherTime(dur * Number(sk.value) / 1000)} / ${furtherTotalLabel()}`;
    });
    sk.addEventListener('change', () => {
      const dur = furtherDur();
      if (furtherAudio && dur > 0) { try { furtherAudio.currentTime = dur * Number(sk.value) / 1000; } catch (e) {} }
      furtherSeeking = false;
      updateFurtherPlayer();
    });
    sk.dataset.bound = '1';
  }
  window.onAppPause = function () { stopAllAudio(); };
  window.__flxFurtherAudio = () => furtherAudio;   // read-only hook for the Playwright gate (tests/test_v382.js)
  document.addEventListener('visibilitychange', () => { if (document.hidden) window.onAppPause(); });

  function furtherVocabById(id) {
    return getAllGlobalVocabulary().find(v => v.id === id) || null;
  }
  function renderFurtherChips(elId, list, lessonIds, emptyMsg) {
    const el = document.getElementById(elId);
    if (!el) return;
    if (!list.length) { el.innerHTML = `<span class="fr-chip-empty">${emptyMsg}</span>`; return; }
    el.innerHTML = list.map(v => {
      const st = userProgress[v.id];
      const star = elId === 'fr-post-words' ? (st && st.starred ? ' ⭐' : '') : '';
      return `<button type="button" class="fr-chip${lessonIds.has(v.id) ? ' is-lesson' : ''}" data-id="${escapeHtml(v.id)}">${escapeHtml(v.word)}${star}</button>`;
    }).join('');
  }
  // Candidate-only: unknown Further words and inflected surfaces may have
  // an exact recording; headword and surface pronunciation never substitute.
  var flxFurtherGlossSelection = null;
  function showFurtherGloss(v, raw) {
    const g = document.getElementById('fr-gloss');
    if (!g) return;
    const text = typeof raw === 'string' && raw.trim() ? raw.trim() : (v ? String(v.word) : '');
    flxFurtherGlossSelection = { text, wordId: v ? v.id : null, textId: furtherCurrent && furtherCurrent.id };
    const info = window.FlxRecordedFurtherSurfaceRouter.describe(
      window.FLX_FURTHER_SURFACES, window.FLX_RECORDING_CANDIDATES, furtherCurrent, appSettings.accent, text);
    const form = info ? `<button id="fr-surface-audio" type="button" aria-label="شنیدن تلفظ صورت متن" title="تلفظ صورت دقیق متن" onclick="speakFurtherSurface()" ${info.available ? '' : 'disabled'}>🔊 متن</button>` : '';
    if (!v) {
      g.innerHTML = `<div class="fr-gloss-txt"><bdi dir="ltr" class="fr-gloss-en">${escapeHtml(text)}</bdi>` +
        `<span class="fr-gloss-miss">این واژه در واژه‌نامهٔ فرهنگ‌لکس نیست.</span></div>` + form +
        `<button type="button" aria-label="بستن" onclick="hideFurtherGloss()">✕</button>`;
    } else {
      const st = userProgress[v.id];
      g.innerHTML = `<div class="fr-gloss-txt"><bdi dir="ltr" class="fr-gloss-en">${escapeHtml(v.word)}</bdi>` +
        `<span class="fr-gloss-fa">${escapeHtml(v.meaning)}</span>` +
        (info ? `<span class="fr-gloss-surface">صورت متن: <bdi dir="ltr">${escapeHtml(text)}</bdi></span>` : '') + `</div>` +
        `<button type="button" aria-label="شنیدن تلفظ مدخل" onclick="speakFurtherWord('${escapeHtml(v.id)}')">🔊</button>` + form +
        `<button type="button" aria-label="نشان کردن برای مرور" onclick="starFurtherWord('${escapeHtml(v.id)}')">${st && st.starred ? '⭐' : '☆'}</button>` +
        `<button type="button" aria-label="بستن" onclick="hideFurtherGloss()">✕</button>`;
    }
    g.classList.add('show');
  }
  window.speakFurtherSurface = function () {
    const s = flxFurtherGlossSelection;
    if (!s || !furtherCurrent || s.textId !== furtherCurrent.id) return false;
    const clip = window.FlxRecordedFurtherSurfaceRouter.resolve(
      window.FLX_FURTHER_SURFACES, window.FLX_RECORDING_CANDIDATES, furtherCurrent, appSettings.accent, s.text);
    ensureRecordedAudio();
    return flxRecordedPlayer.play(clip, { rate: appSettings.speechRate || 0.86 });
  };
  window.hideFurtherGloss = function () {
    flxFurtherGlossSelection = null;
    const g = document.getElementById('fr-gloss');
    if (g) g.classList.remove('show');
    document.querySelectorAll('#fr-text .fr-w.is-active').forEach(x => x.classList.remove('is-active'));
  };
  window.speakFurtherWord = function (id) {
    const v = furtherVocabById(id);
    if (v) speak(v.word, true, v.id);
  };
  window.starFurtherWord = function (id) {
    window.toggleWordStar(id);
    const v = furtherVocabById(id);
    if (v) showFurtherGloss(v, flxFurtherGlossSelection && flxFurtherGlossSelection.text);
    refreshFurtherPost();
  };
  function furtherLessonIds() {
    if (!furtherCurrent) return new Set();
    return new Set(getAllGlobalVocabulary().filter(v => v._gradeId === furtherCurrent.grade && v.lesson === furtherCurrent.lesson).map(v => v.id));
  }
  function refreshFurtherPost() {
    const ids = furtherLessonIds();
    renderFurtherChips('fr-post-words', furtherTapped.map(furtherVocabById).filter(Boolean), ids, 'هنوز واژه‌ای لمس نکرده‌اید.');
  }
  function onFurtherTap(ev) {
    if (ev.target.closest('#fr-text.is-veiled')) { setFurtherVeil(false); triggerHaptic(8); return; }
    const chip = ev.target.closest('.fr-chip');
    const w = ev.target.closest('.fr-w');
    if (!chip && !w) return;
    document.querySelectorAll('#fr-text .fr-w.is-active').forEach(x => x.classList.remove('is-active'));
    const id = (chip || w).getAttribute('data-id');
    const v = id ? furtherVocabById(id) : null;
    if (w) w.classList.add('is-active');
    showFurtherGloss(v, (w || chip).textContent.replace(' ⭐', ''));
    if (v && !furtherTapped.includes(v.id)) { furtherTapped.push(v.id); refreshFurtherPost(); }
    triggerHaptic(8);
  }

  window.openFurtherText = function (id) {
    const F = window.FURTHER_TEXTS;
    const it = (F && F.items || []).find(x => x.id === id);
    const ov = document.getElementById('further-reader-overlay');
    if (!it || !ov) return;
    furtherCurrent = it; furtherTapped = []; furtherGlossIndex = buildFurtherGlossIndex(); frQuiz = null; const fqz = document.getElementById('fr-quiz'); if (fqz) fqz.innerHTML = '';
    const lessonIds = furtherLessonIds();
    const lessonVocab = getAllGlobalVocabulary().filter(v => lessonIds.has(v.id));
    const gradeLabel = { vision_1: 'Vision 1', vision_2: 'Vision 2', vision_3: 'Vision 3' }[it.grade] || it.grade;
    const hasAudio = !!furtherAudioInfo(it.id);
    const kind = it.part === 'reading' ? 'Further Reading' : `Further Listening ${it.n}${hasAudio ? '' : ' (فقط متن)'}`;
    document.getElementById('fr-kind').innerHTML = `<bdi dir="ltr">${kind}</bdi> • <bdi dir="ltr">${gradeLabel}</bdi> • درس ${toPersianDigits(it.lesson)}`;
    document.getElementById('fr-title').textContent = it.title;
    // Keep the complete provenance in the project data, but do not show the named source.
    // Some historical edit-log entries contain the removed name; exclude those from this UI too.
    const edits = (it.edits || []).filter(e => !/باذل|bazel/i.test(JSON.stringify(e)));
    const det = document.getElementById('fr-prov-detail');
    det.innerHTML = `<p>فایل: <bdi dir="ltr">${escapeHtml(it.source || '')}</bdi> • ${toPersianDigits(edits.length)} اصلاح نگارشی و دستوری</p>` +
      '<p>این متن برای تمرین بیشتر در کنار کتاب زبان انگلیسی چاپ ۱۴۰۵ تهیه شده و رونویسی آن غیررسمی است. تلاش کرده‌ایم متن تا حد امکان دقیق باشد؛ با این حال، مطابقت کامل آن با نسخهٔ رسمی هنوز تأیید نشده است. اگر تفاوت یا خطایی مشاهده کردید، خوشحال می‌شویم اطلاع دهید تا بررسی و اصلاح شود.</p>' +
      (it.officialUrl ? `<p dir="ltr" class="fr-official"><a href="${escapeHtml(it.officialUrl)}" target="_blank" rel="noopener">🔗 ${escapeHtml(it.officialUrl)}</a></p>` : '') +
      '<p id="fr-audio-provenance"></p>' +
      (it.speakerNote ? '<p>برچسب گوینده‌ها (A و B) را برنامه افزوده است.</p>' : '') +
      (it.titleEdit ? `<p>عنوان اصلاح شد: <bdi dir="ltr">${escapeHtml(it.titleEdit.from)}</bdi></p>` : '') +
      (it.orderNote ? '<p>ترتیب متن‌های این درس هنوز با نسخهٔ رسمی بررسی نشده است.</p>' : '') +
      (edits.length ? `<details><summary>فهرست اصلاح‌ها</summary><ul dir="ltr">${edits.map(e => `<li><s>${escapeHtml(e.from)}</s> → ${escapeHtml(e.to)}</li>`).join('')}</ul></details>` : '');
    det.hidden = true;
    document.getElementById('fr-prov').setAttribute('aria-expanded', 'false');
    document.getElementById('fr-prov').textContent = 'دربارهٔ متن ⓘ';
    const plain = it.paragraphs.map(p => p.text).join(' ');
    renderFurtherChips('fr-pre-words', lessonVocab.filter(v => createInflectionRegex(v.word).test(plain)), lessonIds, 'واژهٔ این درس در متن نیامده است.');
    document.getElementById('fr-text').innerHTML = it.paragraphs.map(p => {
      const body = tokenizeFurther(p.text, lessonIds);
      if (p.type === 'li') return `<p class="fr-li">${/^\d+\./.test(p.text) ? '' : '• '}${body}</p>`;
      if (p.type === 'turn') return `<p class="fr-turn"><span class="fr-spk">${p.speaker}</span><span>${body}</span></p>`;
      return `<p>${body}</p>`;
    }).join('');
    const isL = it.part !== 'reading';
    document.getElementById('fr-h1').textContent = isL ? '۱. پیش از شنیدن' : '۱. پیش از خواندن';
    document.getElementById('fr-h2').textContent = isL ? '۲. هنگام شنیدن' : '۲. هنگام خواندن';
    document.getElementById('fr-h3').textContent = isL ? '۳. پس از شنیدن' : '۳. پس از خواندن';
    document.getElementById('fr-hint2').textContent = !hasAudio ? 'روی هر واژه بزنید تا معنی‌اش نمایش داده شود. واژه‌های درس پررنگ‌اند.'
      : isL ? 'اول یک بار فقط گوش بدهید، بعد همراه صوت بخوانید. روی هر واژه بزنید تا معنی‌اش بیاید؛ واژه‌های درس پررنگ‌اند.'
        : 'روی هر واژه بزنید تا معنی‌اش نمایش داده شود. واژه‌های درس پررنگ‌اند. با ▶ متن را بشنوید.';
    setupFurtherAudio(it);
    refreshFurtherAudioDisclosure(it);
    bindFurtherSeek();
    const prog = furtherProgress()[it.id] || {};
    furtherRating = prog.rating || 0;
    document.querySelectorAll('#fr-self button').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.v) === furtherRating)));
    refreshFurtherPost();
    applyFurtherFont();
    window.hideFurtherGloss();
    if (!ov.dataset.bound) {
      ov.addEventListener('click', onFurtherTap);
      document.getElementById('fr-self').addEventListener('click', e => {
        const b = e.target.closest('button[data-v]');
        if (!b) return;
        furtherRating = Number(b.dataset.v);
        document.querySelectorAll('#fr-self button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        triggerHaptic(10);
      });
      ov.dataset.bound = '1';
    }
    ov.classList.add('show');
    const sc = document.getElementById('fr-scroll');
    if (sc) sc.scrollTop = 0;
  };

  /* 4.1.0 Phase D — comprehension activities generated from the Further text itself.
     Every answer is verifiable from the text or from audited card data:
     cloze + word-meaning use the card's own distractors; the title question uses
     other texts' titles; true/false quotes sentences verbatim (own text = true,
     another text of the same level = false). Nothing is invented. */
  let frQuiz = null;
  function frzEsc(x) { return String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function frzShuffle(a) { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const tmp = x[i]; x[i] = x[j]; x[j] = tmp; } return x; }
  function frzSentences(it) {
    return (it.paragraphs || []).filter(function (pp) { return !pp.type || pp.type === 'p'; })
      .flatMap(function (pp) { return (String(pp.text).match(/[^.!?]+[.!?]+/g) || []).map(function (x) { return x.trim(); }); })
      .filter(function (x) { const n = x.split(/\s+/).length; return n >= 6 && n <= 24; });
  }
  function buildFurtherQuiz(it) {
    const F = window.FURTHER_TEXTS || { items: [] };
    const qs = [];
    const vocab = getAllGlobalVocabulary().filter(function (v) { return String(v.id).indexOf(it.grade + ':') === 0; });
    const sents = frzSentences(it);
    const plain = (it.paragraphs || []).map(function (pp) { return pp.text; }).join(' ');
    // 1-2) cloze from the text's own sentences (whole-word rule, like the data gate)
    const clozeCands = [];
    vocab.forEach(function (v) {
      const cz = String(v.clozeWord || '');
      if (!cz || !Array.isArray(v.distractors) || v.distractors.length < 3) return;
      const rx = new RegExp('(^|[^A-Za-z])' + frzEsc(cz) + '([^A-Za-z]|$)', 'i');
      const sent = sents.find(function (x) { return rx.test(x); });
      if (sent) clozeCands.push({ v: v, sent: sent, rx: rx, cz: cz });
    });
    frzShuffle(clozeCands).slice(0, 2).forEach(function (c) {
      const opts = frzShuffle([c.cz].concat(c.v.distractors.slice(0, 3).map(function (d) { return d.word; })));
      qs.push({ kind: 'cloze', prompt: c.sent.replace(c.rx, function (m, a, b) { return a + '______' + b; }),
        qlabel: 'جای خالی را با واژهٔ درستِ متن کامل کنید:', options: opts, answer: opts.indexOf(c.cz), en: true });
    });
    // 3) word meaning in context (a different card than the cloze ones)
    const usedIds = {};
    qs.forEach(function (q) {});
    const meanCands = vocab.filter(function (v) {
      return Array.isArray(v.distractors) && v.distractors.length >= 3 && createInflectionRegex(v.word).test(plain);
    });
    if (meanCands.length) {
      const v = frzShuffle(meanCands)[0];
      const opts = frzShuffle([v.meaning].concat(v.distractors.slice(0, 3).map(function (d) { return d.meaning; })));
      qs.push({ kind: 'meaning', prompt: v.word, qlabel: 'این واژه در متن چه معنایی دارد؟', options: opts, answer: opts.indexOf(v.meaning), en: false });
    }
    // 4) best title
    const otherTitles = frzShuffle(Array.from(new Set((F.items || []).filter(function (x) { return x.id !== it.id && x.grade === it.grade && x.title !== it.title; }).map(function (x) { return x.title; }))));
    if (otherTitles.length >= 3) {
      const opts = frzShuffle([it.title].concat(otherTitles.slice(0, 3)));
      qs.push({ kind: 'title', prompt: '', qlabel: 'بهترین عنوان برای این متن کدام است؟', options: opts, answer: opts.indexOf(it.title), en: true });
    }
    // 5) true/false: verbatim sentence from this text (true) or another text (false)
    const wantTrue = Math.random() < 0.5;
    let stmt = null;
    let stmtFromThis = false;
    if (wantTrue && sents.length) { stmt = frzShuffle(sents)[0]; stmtFromThis = !!stmt; }
    if (!stmt) {
      const others = (F.items || []).filter(function (x) { return x.id !== it.id && x.grade === it.grade; });
      for (let i = 0; i < others.length && !stmt; i++) { const os = frzSentences(others[i]); if (os.length) stmt = frzShuffle(os)[0]; }
    }
    if (stmt) {
      qs.push({ kind: 'tf', prompt: stmt, qlabel: 'این جمله عیناً در همین متن آمده است؟', options: ['درست ✓', 'نادرست ✗'], answer: stmtFromThis ? 0 : 1, en: true });
    }
    return frzShuffle(qs);
  }
  function renderFurtherQuiz() {
    const box = document.getElementById('fr-quiz');
    if (!box || !frQuiz) return;
    if (frQuiz.idx >= frQuiz.qs.length) {
      box.innerHTML = '<div class="quiz-feedback-box show ' + (frQuiz.score >= Math.ceil(frQuiz.qs.length / 2) ? 'pass' : 'fail') + '">' +
        '<strong>🏁 تمرین تمام شد!</strong><br>پاسخ درست: <strong>' + toPersianDigits(frQuiz.score) + '</strong> از <strong>' + toPersianDigits(frQuiz.qs.length) + '</strong>' +
        '<br><button type="button" class="fr-mini" style="margin-top:8px;" onclick="startFurtherQuiz()">🔄 تمرین تازه با سؤال‌های دیگر</button></div>';
      return;
    }
    const q = frQuiz.qs[frQuiz.idx];
    let html = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;">سؤال ' + toPersianDigits(frQuiz.idx + 1) + ' از ' + toPersianDigits(frQuiz.qs.length) + ' · امتیاز: ' + toPersianDigits(frQuiz.score) + '</div>' +
      '<div style="font-weight:800;font-size:13px;margin-bottom:6px;">' + escapeHtml(q.qlabel) + '</div>';
    if (q.prompt) html += '<p ' + (q.en ? 'dir="ltr" style="text-align:left;"' : '') + ' style="font-size:14px;line-height:1.9;">' + (q.en ? escapeHtml(q.prompt) : '<strong dir="ltr">' + escapeHtml(q.prompt) + '</strong>') + '</p>';
    q.options.forEach(function (op, i) {
      let cls = 'fr-mini';
      let dis = '';
      if (frQuiz.answered) {
        dis = 'disabled';
        if (i === q.answer) cls += '';
      }
      html += '<button type="button" class="' + cls + '" style="display:block;width:100%;margin:5px 0;text-align:' + (q.en || q.kind === 'title' ? 'left' : 'right') + ';" dir="' + (q.en || q.kind === 'title' ? 'ltr' : 'rtl') + '" ' + dis + ' onclick="answerFurtherQuiz(' + i + ')">' + escapeHtml(op) + '</button>';
    });
    if (frQuiz.answered) {
      const ok = frQuiz.picked === q.answer;
      html += '<div class="quiz-feedback-box show ' + (ok ? 'pass' : 'fail') + '" style="margin-top:8px;">' +
        (ok ? '✅ درست است!' : '❌ پاسخ درست: <strong>' + escapeHtml(q.options[q.answer]) + '</strong>') +
        '<br><button type="button" class="fr-mini" style="margin-top:6px;" onclick="nextFurtherQuiz()">' + (frQuiz.idx + 1 < frQuiz.qs.length ? 'سؤال بعدی ⬅️' : 'دیدن نتیجه') + '</button></div>';
    }
    box.innerHTML = html;
  }
  window.startFurtherQuiz = function () {
    if (!furtherCurrent) return;
    const qs = buildFurtherQuiz(furtherCurrent);
    const box = document.getElementById('fr-quiz');
    if (!box) return;
    if (qs.length < 3) { box.innerHTML = '<p style="font-size:12.5px;color:var(--text-muted);">برای این متن هنوز فعالیت کافی ساخته نمی‌شود.</p>'; return; }
    frQuiz = { qs: qs, idx: 0, score: 0, answered: false, picked: -1 };
    renderFurtherQuiz();
  };
  window.answerFurtherQuiz = function (i) {
    if (!frQuiz || frQuiz.answered) return;
    frQuiz.answered = true;
    frQuiz.picked = i;
    if (i === frQuiz.qs[frQuiz.idx].answer) frQuiz.score++;
    renderFurtherQuiz();
  };
  window.nextFurtherQuiz = function () {
    if (!frQuiz) return;
    frQuiz.idx++;
    frQuiz.answered = false;
    frQuiz.picked = -1;
    renderFurtherQuiz();
  };

  window.closeFurtherText = function () {
    const ov = document.getElementById('further-reader-overlay');
    if (ov) ov.classList.remove('show');
    stopFurtherAudio();
    window.hideFurtherGloss();
  };
  window.finishFurtherText = function () {
    if (!furtherCurrent) return;
    const p = furtherProgress();
    const first = !(p[furtherCurrent.id] && p[furtherCurrent.id].done);
    p[furtherCurrent.id] = Object.assign({}, p[furtherCurrent.id], { done: true, rating: furtherRating || null, tapped: furtherTapped.length, at: new Date().toISOString().slice(0, 10) });
    saveFurtherProgress(p);
    if (first) { try { awardXP(8); } catch (e) {} }
    showToast(first ? '✓ متن خوانده شد • ۸ امتیاز' : '✓ ثبت شد');
    window.closeFurtherText();
    initContextReader();
  };

  window.speakSentenceByWordId = function (wordId) {
    const v = (gradeData && gradeData._combinedVocab || []).find(x => x.id === wordId);
    if (v) speakSentenceAudio(v.example, v.word, v.id);
  };

  window.openWordModal = function (wordId, surfaceIndex, surfaceText) {
    const v = (gradeData._combinedVocab || []).find(x => x.id === wordId);
    if (!v) return;
    activeModalWordId = v.id;
    const info = ensureRecordedAudio().describeTargetSurface(v, surfaceIndex, surfaceText);
    flxModalSurface = info ? { wordId: v.id, index: surfaceIndex, text: surfaceText } : null;
    refreshModalSurfaceButton();

    document.getElementById('modal-word-en').textContent = v.word;
    document.getElementById('modal-word-phonetic').textContent = getWordPhonetic(v);
    document.getElementById('modal-word-fa').textContent = v.meaning;
    fillRelationsBox(document.getElementById('modal-word-rel'), v);
    document.getElementById('modal-word-ex').textContent = v.example || '';
    setBookExample(document.getElementById('modal-word-ex'), v);
    const modalExLabel = document.getElementById('modal-word-ex-label');
    if (modalExLabel) modalExLabel.textContent = exampleLabelText(v);

    const st = userProgress[v.id] || { starred: false };
    const starBtn = document.getElementById('modal-word-star-btn');
    if (starBtn) {
      starBtn.textContent = st.starred ? '⭐' : '☆';
      starBtn.classList.toggle('starred', !!st.starred);
    }

    const modalSourceTag = document.getElementById('modal-word-source-tag');
    const modalReviewBadge = document.getElementById('modal-word-review-badge');
    const refTextEl = document.getElementById('modal-word-ref');

    const src = v.source || (v.isOfficial ? 'book' : 'sample');
    const vMeta = getWordGradeAndLessonMeta(v);
    if (modalSourceTag) {
      const cls = { workbook: 'source-workbook', extra: 'source-extra' }[src] || 'source-book';
      const label = { workbook: `📒 کتاب کار • ${vMeta.bookWithGrade}`,
        extra: `✨ تکمیلی • ${vMeta.bookWithGrade}` }[src] || `📖 ${vMeta.bookWithGrade}`;
      modalSourceTag.className = 'source-tag ' + cls;
      modalSourceTag.textContent = label;
    }
    if (modalReviewBadge) {
      modalReviewBadge.style.display = v.needsTeacherReview ? 'inline-flex' : 'none';
    }
    if (refTextEl) {
      refTextEl.textContent = formatBookLessonFull(v);
    }

    const imgWrap = document.getElementById('modal-word-img-wrap');
    const modalImg = document.getElementById('modal-word-img');
    if (modalImg && imgWrap) {
      const fb = buildFallbackWordSvg(v);
      imgWrap.style.display = 'flex';
      modalImg.onerror = function () { this.onerror = null; this.src = fb; };
      modalImg.src = getWordIllustrationSrc(v);
      modalImg.alt = v.word;
    }

    const modal = document.getElementById('word-modal-overlay');
    if (modal) modal.classList.add('show');
  };

  window.speakModalWord = function () {
    const v = (gradeData && gradeData._combinedVocab || []).find(x => x.id === activeModalWordId);
    if (v) speak(v.word, true, v.id);
  };

  window.speakModalSentence = function () {
    const v = (gradeData && gradeData._combinedVocab || []).find(x => x.id === activeModalWordId);
    if (v) speakSentenceAudio(v.example, v.word, v.id);
  };

  window.toggleModalWordStar = function () {
    if (!activeModalWordId) return;
    toggleWordStar(activeModalWordId);
    const st = userProgress[activeModalWordId] || {};
    const starBtn = document.getElementById('modal-word-star-btn');
    if (starBtn) {
      starBtn.textContent = st.starred ? '⭐' : '☆';
      starBtn.classList.toggle('starred', !!st.starred);
    }
    renderGlossary();
  };

  window.closeWordModal = function () {
    flxModalSurface = null; refreshModalSurfaceButton();
    const modal = document.getElementById('word-modal-overlay');
    if (modal) modal.classList.remove('show');
  };

  // ==========================================================
  // TAB 4: 7-MODE FORMATIVE QUIZ & CREATIVE GAMES ENGINE
  // ==========================================================
  window.setQuizMode = function (mode) {
    quizMode = mode;
    const btn = document.getElementById(`quiz-mode-${mode}`);
    document.querySelectorAll('.mode-tab-btn, .creative-tab-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    initQuiz(false);
  };

  // v3.11 (F17): the answer area of the open quiz/game (options, typing box, game board) — or, once answered, its
  // «next» button — must be on screen without the student scrolling. If a small phone still lacks room, scroll the
  // content just enough, but never past the anchor (the question itself stays visible).
  function revealQuizArea(target, anchor) {
    if (currentTabName !== 'quiz' || !target || !target.offsetParent) return;
    const sc = document.querySelector('main.native-content-body');
    if (!sc) return;
    const bar = document.querySelector('.android-bottom-bar');
    const limit = (bar ? bar.getBoundingClientRect().top : window.innerHeight) - 8;
    const topEdge = sc.getBoundingClientRect().top + 8;
    let dy = Math.ceil(target.getBoundingClientRect().bottom - limit);
    if (dy <= 0) return;
    if (anchor && anchor.offsetParent) dy = Math.min(dy, Math.floor(anchor.getBoundingClientRect().top - topEdge));
    if (dy > 0) sc.scrollTop += dy;
  }
  function quizPrimaryTarget() {
    const q = s => { const e = document.querySelector(s); return (e && e.offsetParent) ? e : null; };
    const stage = q('#quiz-creative-stage');
    if (stage) {
      const card = stage.querySelector('.quiz-card-surface');
      const next = q('#quiz-creative-stage .quiz-next-action.show');
      if (next) return [next, null];
      const run = q('#quiz-creative-stage .blitz-btn-row');
      if (run) return [run, stage];
      // Keep the compact clue as anchor while revealing the actions and full letter bank.
      if (q('#quiz-creative-stage .scr-long'))
        return [q('#quiz-creative-stage .scr-actions'), q('#quiz-creative-stage .scr-clue-row')];
      return [q('#quiz-creative-stage .pic4-grid') || q('#quiz-creative-stage .match-board-grid') ||
        q('#quiz-creative-stage .scr-actions') || q('#quiz-creative-stage .scr-bank-wrap') ||
        q('#quiz-creative-stage .hero-cta-btn'), card];
    }
    if (q('#quiz-result-area')) return [q('#quiz-result-area .hero-cta-btn'), q('#quiz-result-area')];
    if (!q('#quiz-play-area')) return [null, null];
    const next = q('#quiz-next-action-btn.show');
    if (next) return [next, null];
    const media = q('#quiz-box-card .quiz-media-row');
    if (q('#quiz-mc-wrap')) return [q('#quiz-options-wrap'), media];
    return [q('#quiz-type-wrap .hint-bar'), media];
  }
  function revealQuizPrimary() {
    const go = () => { const [t, a] = quizPrimaryTarget(); revealQuizArea(t, a); };
    requestAnimationFrame(() => { go(); setTimeout(go, 140); });   // after layout; again after late image/font sizes
  }

  window.onQuizLessonFilterChange = function () {
    const sel = document.getElementById('quiz-lesson-select');
    if (sel) quizLessonFilter = sel.value;
    initQuiz(false);
  };

  function getFilteredQuizVocabList() {
    let vocab = (gradeData && gradeData._combinedVocab) ? gradeData._combinedVocab : [];
    if (quizLessonFilter !== 'all') {
      const lId = parseInt(quizLessonFilter, 10);
      vocab = vocab.filter(v => v.lesson === lId);
    }
    return vocab;
  }

  function populateQuizLessonSelect() {
    const sel = document.getElementById('quiz-lesson-select');
    if (!sel || !gradeData) return;
    let html = `<option value="all">همهٔ درس‌های ${escapeHtml(gradeData.name)}</option>`;
    (gradeData.lessons || []).forEach(l => {
      html += `<option value="${l.id}">درس ${toPersianDigits(l.id)}: ${escapeHtml(l.titleFa)}</option>`;
    });
    sel.innerHTML = html;
    if ([...sel.options].some(o => o.value === String(quizLessonFilter))) {
      sel.value = String(quizLessonFilter);
    } else {
      quizLessonFilter = 'all';
      sel.value = 'all';
    }
  }

  function syncRelQuizButton() {
    const relOk = String(currentGradeId || '').startsWith('vision');
    const relBtn = document.getElementById('quiz-mode-rel');
    if (relBtn) relBtn.style.display = relOk ? '' : 'none';
    const selWrap = document.getElementById('quiz-text-mode-selector');
    if (selWrap) selWrap.classList.toggle('has-rel', relOk);
    if (!relOk && quizMode === 'rel') {
      quizMode = 'mc';
      document.querySelectorAll('.mode-tab-btn, .creative-tab-btn').forEach(b => b.classList.remove('active'));
      const mcBtn = document.getElementById('quiz-mode-mc');
      if (mcBtn) mcBtn.classList.add('active');
    }
  }

  window.initQuiz = function (rebuildSelect = true) {
    syncRelQuizButton();
    currentQuizIndex = 0;
    quizScore = 0;
    quizWrong = [];
    quizAnswered = false;
    if (rebuildSelect) populateQuizLessonSelect();

    const creativeStage = document.getElementById('quiz-creative-stage');
    const emptyArea = document.getElementById('quiz-empty-area');
    const resultArea = document.getElementById('quiz-result-area');
    const playArea = document.getElementById('quiz-play-area');

    if (window.CreativeGames && window.CreativeGames.isCreativeMode(quizMode)) {
      if (emptyArea) emptyArea.style.display = 'none';
      if (resultArea) resultArea.style.display = 'none';
      if (playArea) playArea.style.display = 'none';
      if (creativeStage) creativeStage.style.display = 'block';
      window.CreativeGames.startMode(quizMode, currentTabName === 'quiz');
      return;
    }

    if (window.CreativeGames) window.CreativeGames.stopTimers();
    if (creativeStage) creativeStage.style.display = 'none';

    generateQuizQuestions();
    renderQuiz();
  };

  // v3.10 — «مترادف و متضاد»: only reviewed data; «opposite» only where a safe option pool exists.
  function relQuestionTypes(v) {
    const types = [];
    if (relWords(v, 'synonyms').length && getSynonymQuizPool(v).length >= 3) types.push('syn');
    const ants = relWords(v, 'antonyms');
    const antPool = (v.relQuiz && Array.isArray(v.relQuiz.antPool)) ? v.relQuiz.antPool.filter(w => !ants.includes(w)) : [];
    if (ants.length && antPool.length >= 3) types.push('ant');
    return types;
  }

  function buildRelQuestion(v, type) {
    const ants = relWords(v, 'antonyms');
    const right = shuffleCopy(type === 'syn' ? relWords(v, 'synonyms') : ants)[0];
    const pool = type === 'syn' ? getSynonymQuizPool(v) : v.relQuiz.antPool.filter(w => !ants.includes(w));
    const options = shuffleCopy([
      { word: right, displayWord: right, isCorrect: true },
      ...shuffleCopy(pool).slice(0, 3).map(w => ({ word: w, displayWord: w, isCorrect: false }))
    ]);
    return {
      id: v.id, word: v.word, pos: v.pos, hasIllustration: v.hasIllustration, source: v.source,
      meaning: v.meaning, phonetic: v.phonetic, phoneticUs: v.phoneticUs, phoneticUk: v.phoneticUk,
      example: v.example, lesson: v.lesson, page: v.page, _gradeId: v._gradeId,
      synonyms: v.synonyms, antonyms: v.antonyms,
      bookLessonBadge: formatBookLessonBadge(v),
      relType: type, relAnswer: right, blankSentence: '',
      options: options, correctIdx: options.findIndex(o => o.isCorrect), hint: ''
    };
  }

  /* 4.1.0 Phase E: in «mixed» mode each question's format follows the word's Leitner box —
     boxes 1-2 recognition (multiple choice), box 3 typed recall, boxes 4-5 listening
     dictation (typed fallback when no packaged recording exists). */
  function quizEffMode() {
    if (quizMode !== 'mixed') return quizMode;
    const q = activeQuizQuestions[currentQuizIndex];
    return (q && q._eff) || 'mc';
  }

  function generateQuizQuestions() {
    let vocab = (gradeData && gradeData._combinedVocab) ? gradeData._combinedVocab : [];
    if (quizLessonFilter !== 'all') {
      const lId = parseInt(quizLessonFilter, 10);
      vocab = vocab.filter(v => v.lesson === lId);
    }
    // A listening-dictation question must have a bundled word recording.
    if (quizMode === 'dictation') {
      vocab = vocab.filter(v => {
        if (!v) return false;
        const key = String(v.word || '').trim().toLowerCase().replace(/’/g, "'");
        const bank = window.FLX_RECORDING_CANDIDATES && window.FLX_RECORDING_CANDIDATES.globalWords;
        const same = bank && bank[key];
        return Array.isArray(same) && same.some(x => x && x.id === v.id && x.source === 'packaged');
      });
    }

    if (quizMode === 'rel') {
      const items = vocab.map(v => ({ v, types: relQuestionTypes(v) })).filter(x => x.types.length);
      activeQuizQuestions = shuffleCopy(items).slice(0, 6).map(({ v, types }) =>
        buildRelQuestion(v, types[Math.floor(Math.random() * types.length)]));
      return;
    }

    if (vocab.length < 1) {
      activeQuizQuestions = [];
      return;
    }

    const shuffled = [...vocab].sort(() => 0.5 - Math.random());
    const count = Math.min(6, shuffled.length);
    activeQuizQuestions = [];
    const allGradeVocab = gradeData._combinedVocab || [];

    for (let i = 0; i < count; i++) {
      const target = shuffled[i];
      const rx = createInflectionRegex(target.word);
      const exStr = target.example || '';
      const surfMatch = exStr.match(rx);
      const matchedSurface = (surfMatch && surfMatch[0]) ? surfMatch[0] : (target.clozeWord || target.word);
      const blankSentence = exStr.replace(rx, '[\u00a0__________\u00a0]');   // v3.11: no-break spaces — the blank never splits across lines

      const wrong = getQuizDistractors(target, 3);
      const rawOptions = [
        {
          word: target.word,
          displayWord: target.clozeWord || matchedSurface || target.word,
          meaning: target.meaning,
          isCorrect: true
        },
        ...wrong.map(w => ({
          word: w.word,
          displayWord: w.cloze || w.word,
          meaning: w.meaning,
          isCorrect: false
        }))
      ].sort(() => 0.5 - Math.random());

      activeQuizQuestions.push({
        id: target.id,
        word: target.word,
        pos: target.pos,
        hasIllustration: target.hasIllustration,
        source: target.source,
        meaning: target.meaning,
        phonetic: target.phonetic,
        phoneticUs: target.phoneticUs,
        phoneticUk: target.phoneticUk,
        example: target.example,
        blankSentence: blankSentence,
        lesson: target.lesson,
        page: target.page,
        bookLessonBadge: formatBookLessonBadge(target),
        synonyms: target.synonyms, antonyms: target.antonyms,
        options: rawOptions,
        correctIdx: rawOptions.findIndex(o => o.isCorrect),
        hint: `حرف اول: «${target.word.charAt(0).toLowerCase()}» • طول واژه: ${toPersianDigits(target.word.length)} حرف`
      });
      if (quizMode === 'mixed') {
        const st = userProgress[target.id] || { box: 1 };
        const key = String(target.word || '').trim().toLowerCase().replace(/’/g, "'");
        const bank = window.FLX_RECORDING_CANDIDATES && window.FLX_RECORDING_CANDIDATES.globalWords;
        const same = bank && bank[key];
        const hasRec = Array.isArray(same) && same.some(x => x && x.id === target.id && x.source === 'packaged');
        const last = activeQuizQuestions[activeQuizQuestions.length - 1];
        last._eff = st.box <= 2 ? 'mc' : (st.box === 3 ? 'type' : (hasRec ? 'dictation' : 'type'));
      }
    }
  }

  function renderQuiz() {
    const emptyArea = document.getElementById('quiz-empty-area');
    const resultArea = document.getElementById('quiz-result-area');
    const playArea = document.getElementById('quiz-play-area');
    if (!playArea) return;

    if (resultArea) resultArea.style.display = 'none';

    if (activeQuizQuestions.length === 0) {
      const emptyText = document.getElementById('quiz-empty-text');
      if (emptyText) {
        emptyText.textContent = quizMode === 'rel'
          ? 'برای این درس هنوز هم‌معنی یا متضادی که «آشنا و آسان‌تر» باشد ثبت نشده است. «همهٔ درس‌ها» را امتحان کنید.'
          : 'تعداد واژگان این فیلتر برای آزمون کافی نیست. لطفاً درس دیگری را انتخاب کنید.';
      }
      if (emptyArea) emptyArea.style.display = 'block';
      playArea.style.display = 'none';
      return;
    }

    if (emptyArea) emptyArea.style.display = 'none';
    playArea.style.display = 'block';

    const q = activeQuizQuestions[currentQuizIndex];
    quizAnswered = false;

    const quizImgWrap = document.getElementById('quiz-word-img-wrap');
    const quizImg = document.getElementById('quiz-word-img');
    if (quizImgWrap && quizImg) {
      const qFb = buildFallbackWordSvg(q);
      quizImgWrap.style.display = 'flex';
      quizImg.onerror = function () { this.onerror = null; this.src = qFb; };
      quizImg.src = getWordIllustrationSrc(q);
      quizImg.alt = q.word;
    }

    document.getElementById('quiz-step-text').textContent =
      `سؤال ${toPersianDigits(currentQuizIndex + 1)} از ${toPersianDigits(activeQuizQuestions.length)}`;
    document.getElementById('quiz-tag-badge').textContent = formatQuizRefShort(q);

    const mcContainer = document.getElementById('quiz-mc-wrap');
    const typeContainer = document.getElementById('quiz-type-wrap');
    const dictAudioWrap = document.getElementById('quiz-dictation-audio-wrap');

    const qEff = quizEffMode();
    if (qEff === 'mc' || qEff === 'rel') {
      mcContainer.style.display = 'block';
      typeContainer.style.display = 'none';
      if (dictAudioWrap) dictAudioWrap.style.display = 'none';

      if (qEff === 'rel') {
        document.getElementById('quiz-prompt-en').textContent = q.word;
        document.getElementById('quiz-prompt-fa').textContent = q.relType === 'ant'
          ? '↔ کدام گزینه «متضاد» این واژه است؟'
          : '≈ کدام گزینه «هم‌معنی» این واژه است؟';
      } else {
        document.getElementById('quiz-prompt-en').textContent = q.blankSentence;
        document.getElementById('quiz-prompt-fa').textContent = q.meaning
          ? `معنی واژهٔ جای خالی: «${q.meaning}»`
          : 'کدام واژه جای خالی را کامل می‌کند؟';
      }

      const optsWrap = document.getElementById('quiz-options-wrap');
      optsWrap.innerHTML = '';
      const letters = ['الف', 'ب', 'ج', 'د'];
      q.options.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'mc-opt-btn';
        b.innerHTML = `
          <span class="mc-opt-letter">${letters[idx]})</span>
          <span class="mc-opt-en" dir="ltr">${escapeHtml(opt.displayWord || opt.word)}</span>
          ${opt.meaning ? `<span class="mc-opt-fa" style="display:none;">(${escapeHtml(opt.meaning)})</span>` : ''}
        `;
        b.onclick = () => answerMcQuiz(idx);
        optsWrap.appendChild(b);
      });
    } else if (qEff === 'type') {
      mcContainer.style.display = 'none';
      typeContainer.style.display = 'block';
      if (dictAudioWrap) dictAudioWrap.style.display = 'none';

      document.getElementById('quiz-prompt-en').textContent = q.blankSentence;
      document.getElementById('quiz-prompt-fa').textContent = `واژهٔ مناسب را با توجه به معنی «${q.meaning}» تایپ کنید:`;
      resetQuizTextInput(q);
    } else {
      // Mode 3: Listening Dictation
      mcContainer.style.display = 'none';
      typeContainer.style.display = 'block';
      if (dictAudioWrap) dictAudioWrap.style.display = 'flex';

      document.getElementById('quiz-prompt-en').textContent = q.blankSentence;
      document.getElementById('quiz-prompt-fa').textContent = `🎧 به تلفظ گوش دهید و املای واژه به معنی «${q.meaning}» را بنویسید:`;
      resetQuizTextInput(q);
      if (currentTabName === 'quiz') {
        setTimeout(() => playDictationWord(false), 180);
      }
    }

    const fb = document.getElementById('quiz-feedback-box');
    fb.className = 'quiz-feedback-box';
    fb.innerHTML = '';
    document.getElementById('quiz-next-action-btn').classList.remove('show');
    revealQuizPrimary();
  }

  function resetQuizTextInput(q) {
    const input = document.getElementById('type-word-input');
    if (input) {
      input.value = '';
      input.disabled = false;
    }
    const hintPill = document.getElementById('hint-bubble-display');
    if (hintPill) {
      hintPill.className = 'hint-bubble';
      hintPill.textContent = q.hint;
    }
  }

  window.playDictationWord = function (slow) {
    const q = activeQuizQuestions[currentQuizIndex];
    if (!q) return;
    speak(q.word, true, q.id, slow ? 0.62 : null);
  };

  function answerMcQuiz(chosenIdx) {
    if (quizAnswered) return;
    quizAnswered = true;

    const q = activeQuizQuestions[currentQuizIndex];
    const isCorrect = chosenIdx === q.correctIdx;
    document.querySelectorAll('.mc-opt-btn').forEach((b, idx) => {
      b.disabled = true; // F44: the answer is final; tell touch and accessibility APIs too.
      if (idx === q.correctIdx) b.classList.add('correct');
      else if (idx === chosenIdx && !isCorrect) b.classList.add('wrong');
      const faEl = b.querySelector('.mc-opt-fa');
      if (faEl) faEl.style.display = 'inline';
    });

    applyQuizLeitnerImpact(q.id, isCorrect);
    displayQuizFeedback(isCorrect, q);
  }

  window.toggleTypeHint = function () {
    const hintPill = document.getElementById('hint-bubble-display');
    if (hintPill) hintPill.classList.toggle('show');
  };

  window.submitTypeQuiz = function () {
    if (quizAnswered) return;
    const input = document.getElementById('type-word-input');
    const entered = (input.value || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const q = activeQuizQuestions[currentQuizIndex];
    const expected = q.word.trim().toLowerCase();

    if (!entered) {
      showToast('لطفاً ابتدا املای واژه را وارد کنید');
      return;
    }
    // v3.11 (R12): Persian letters = the keyboard is still on Persian, not a wrong spelling → not graded, say how to fix it
    if (/[\u0600-\u06FF]/.test(entered)) {
      showToast('⌨️ صفحه‌کلید روی فارسی است؛ آن را انگلیسی کنید و دوباره بنویسید.');
      try { input.focus(); } catch (e) {}
      return;
    }

    quizAnswered = true;
    input.disabled = true;

    const rx = createInflectionRegex(expected);
    const isCorrect = (entered === expected) || (quizEffMode() === 'type' && rx.test(entered));

    applyQuizLeitnerImpact(q.id, isCorrect);
    if (isCorrect) recordSpellingMastery();
    displayQuizFeedback(isCorrect, q);
  };

  function applyQuizLeitnerImpact(wordId, isCorrect) {
    if (!userProgress[wordId]) {
      userProgress[wordId] = { wordId: wordId, gradeId: currentGradeId, box: 1, success: 0, fail: 0, lapses: 0 };
    }
    const st = userProgress[wordId];
    const now = Date.now();
    recordReviewActivity();

    if (isCorrect) {
      st.success = (st.success || 0) + 1;
      st.lastReview = now;
      if (st.box < 5) st.box += 1;
      st.nextReview = now + BOX_INTERVALS[st.box];
    } else {
      st.box = 1;
      st.fail = (st.fail || 0) + 1;
      st.lapses = (st.lapses || 0) + 1;
      st.lastReview = now;
      st.nextReview = now + 10 * 60 * 1000;
    }
    persistWordProgress(st);
  }

  function displayQuizFeedback(isCorrect, q) {
    const fb = document.getElementById('quiz-feedback-box');
    fb.classList.add('show');

    if (isCorrect) {
      quizScore++;
      userGamification.gems += 2;
      saveGamification();
      playSfx('correct');
      checkAndUnlockAchievements(false);
      fb.className = 'quiz-feedback-box show pass';
      if (q.relType) {
        fb.innerHTML = `<strong>✅ آفرین، کاملاً صحیح! (+۲ 💎)</strong><br>«<bdi dir="ltr">${escapeHtml(q.relAnswer)}</bdi>» ${q.relType === 'ant' ? 'متضاد' : 'هم‌معنی'} «<bdi dir="ltr">${escapeHtml(q.word)}</bdi>» است — ${escapeHtml(q.meaning)}`;
      } else
      fb.innerHTML = `<strong>✅ آفرین، کاملاً صحیح! (+۲ 💎)</strong><br>واژه: <strong dir="ltr">${escapeHtml(q.word)}</strong> <span class="ipa-text" dir="ltr">${escapeHtml(getWordPhonetic(q))}</span> — ${escapeHtml(q.meaning)}<br>بافتار: <span dir="ltr">${escapeHtml(q.example)}</span>`;
      triggerHaptic([30, 40, 30]);
    } else {
      if (!quizWrong.some(function (w) { return w.id === q.id; })) quizWrong.push(q);
      playSfx('wrong');
      checkAndUnlockAchievements(false);
      fb.className = 'quiz-feedback-box show fail';
      if (q.relType) {
        fb.innerHTML = `<strong>پاسخ درست: «<bdi dir="ltr">${escapeHtml(q.relAnswer)}</bdi>»</strong> — ${q.relType === 'ant' ? 'متضاد' : 'هم‌معنی'} «<bdi dir="ltr">${escapeHtml(q.word)}</bdi>» (${escapeHtml(q.meaning)})<br><small>واژه برای تثبیت به جعبهٔ ۱ لایتنر منتقل شد.</small>`;
      } else
      fb.innerHTML = `<strong>❌ ${(typeof quizEffMode === 'function' ? quizEffMode() : quizMode) === 'mc' ? 'پاسخ درست' : 'املای درست'}: «<span dir="ltr">${escapeHtml(q.word)}</span>»</strong> <span class="ipa-text" dir="ltr">${escapeHtml(getWordPhonetic(q))}</span> (${escapeHtml(q.meaning)})<br>بافتار: <span dir="ltr">${escapeHtml(q.example)}</span><br><small>واژه برای تثبیت به جعبهٔ ۱ لایتنر منتقل شد.</small>`;
      triggerHaptic([90, 50, 90]);
    }
    const relHtml = buildRelationsHtml(q);
    if (relHtml) fb.innerHTML += `<div class="rel-box rel-in-feedback">${relHtml}</div>`;

    const nextBtn = document.getElementById('quiz-next-action-btn');
    nextBtn.classList.add('show');
    nextBtn.textContent = (currentQuizIndex === activeQuizQuestions.length - 1)
      ? 'مشاهدهٔ کارنامهٔ نهایی 📊'
      : 'سؤال بعدی ⬅️';
    revealQuizPrimary();
  }

  // v3.11 (R11): a quick double tap on an «advance» control (a rating, «نمایش معنی», a meaning choice, a quiz option,
  // «سؤال بعدی») sent its 2nd tap to what the 1st one had just put under the finger: the next card turned over or its
  // meaning picked, a question skipped or answered. A FINGER tap that lands elsewhere within 0.4 s of such a tap is
  // ignored. Only finger taps (a touchend just before the click) are filtered — keyboard, el.click() and programmatic
  // calls are never touched, and fast taps on letter tiles (not «advance» controls) stay fast.
  (function doubleTapShield() {
    const ADVANCE = '.srs-btn, #card-flip-cta-btn, .recall-choice-btn, .mc-opt-btn, #quiz-next-action-btn, .type-submit-btn';
    let lastTouchEnd = 0, lastAt = 0, lastEl = null;
    document.addEventListener('touchend', () => { lastTouchEnd = Date.now(); }, true);
    document.addEventListener('click', e => {
      const now = Date.now();
      const t = e.target;
      if (now - lastTouchEnd > 700 || !t || !t.closest) return;
      if (lastEl && now - lastAt < 400 && !lastEl.contains(t)) { e.stopPropagation(); e.preventDefault(); return; }
      const adv = t.closest(ADVANCE);
      lastEl = adv; lastAt = adv ? now : 0;
    }, true);
  })();

  window.nextQuiz = function () {
    if (!quizAnswered) return;                 // v3.11 (R11): only after an answer (a 2nd call would skip a question)
    if (currentQuizIndex < activeQuizQuestions.length - 1) {
      currentQuizIndex++;
      renderQuiz();
    } else {
      const playArea = document.getElementById('quiz-play-area');
      const resultArea = document.getElementById('quiz-result-area');
      if (playArea) playArea.style.display = 'none';
      if (resultArea) {
        resultArea.style.display = 'block';
        const pct = Math.round((quizScore / activeQuizQuestions.length) * 100);
        document.getElementById('quiz-result-title').textContent = `کارنامهٔ آزمون ${gradeData.name}`;
        document.getElementById('quiz-result-score').innerHTML =
          `امتیاز کسب‌شده: <strong>${toPersianDigits(quizScore)}</strong> از <strong>${toPersianDigits(activeQuizQuestions.length)}</strong> (${toPersianDigits(pct)}٪)`;
        const weakArea = document.getElementById('quiz-weak-area');
        if (weakArea) {
          if (!quizWrong.length) {
            weakArea.innerHTML = '<p style="font-size:13px;color:var(--emerald);margin:10px 0;">🎉 این آزمون واژهٔ خطاداری نداشت — آفرین!</p>';
          } else {
            const rows = quizWrong.map(function (w) {
              return `<div style="display:flex;justify-content:space-between;gap:8px;padding:7px 10px;border:1px solid var(--border,#ddd);border-radius:10px;margin:6px 0;text-align:right;">
                <span><strong dir="ltr">${escapeHtml(w.word)}</strong> <span style="color:var(--text-muted)">${escapeHtml(w.meaning)}</span></span>
                <span style="white-space:nowrap;color:var(--text-muted);font-size:12px;">درس ${toPersianDigits(w.lesson)}</span></div>`;
            }).join('');
            weakArea.innerHTML = `<h4 style="font-size:14px;margin:14px 0 6px;">📌 واژه‌های نیازمند مرورِ این آزمون (${toPersianDigits(quizWrong.length)})</h4>
              <p style="font-size:12px;color:var(--text-muted);margin:0 0 6px;">این واژه‌ها به جعبهٔ ۱ لایتنر برگشته‌اند و در مرور امروز دوباره می‌آیند. این فهرست فقط روی گوشی شما می‌ماند.</p>${rows}`;
          }
        }
        userGamification.gamesCompleted = (userGamification.gamesCompleted || 0) + 1;
        awardXP(20);
        recordSessionAccuracy(quizScore, activeQuizQuestions.length);
        saveGamification();
        playSfx('victory');
        checkAndUnlockAchievements(false);
        revealQuizPrimary();
      }
    }
  };

  // ==========================================================
  // TAB 5: GLOSSARY SEARCH & BOOKMARKS
  // ==========================================================
  window.onSearchGlossary = function () {
    renderGlossary();
  };

  window.toggleGlossaryStarFilter = function () {
    glossaryStarOnly = !glossaryStarOnly;
    const btn = document.getElementById('glossary-star-filter-btn');
    if (btn) btn.classList.toggle('active', glossaryStarOnly);
    renderGlossary();
  };

  function renderGlossary() {
    const list = document.getElementById('glossary-list');
    const input = document.getElementById('glossary-input');
    const countEl = document.getElementById('glossary-count');
    if (!list || !gradeData) return;

    const q = (input ? input.value : '').trim().toLowerCase();
    const vocab = gradeData._combinedVocab || [];

    const filtered = vocab.filter(v => {
      if (glossaryStarOnly && !(userProgress[v.id] && userProgress[v.id].starred)) return false;
      if (!q) return true;
      return v.word.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q);
    });

    if (countEl) countEl.textContent = `${toPersianDigits(filtered.length)} واژه`;
    list.innerHTML = '';

    const boxColors = { 1: '#b91c1c', 2: '#c2410c', 3: '#a16207', 4: '#1d4ed8', 5: '#047857' };   // v3.11: white text ≥ 4.9:1

    filtered.forEach(v => {
      const st = userProgress[v.id] || { box: 1, starred: false };
      const pos = getPosInfo(v.pos);
      const srcBadge = v.source === 'workbook'
          ? '<span class="source-tag source-workbook" style="font-size: 12px; padding: 1px 5px; margin-right: 4px;">کتاب کار</span>'
          : v.source === 'extra'
            ? '<span class="source-tag source-extra" style="font-size: 12px; padding: 1px 5px; margin-right: 4px;">تکمیلی</span>'
            : '';

      const row = document.createElement('div');
      row.className = 'glossary-item-row';
      row.onclick = () => openWordModal(v.id);

      const safeWord = v.word.replace(/'/g, "\\'");
      const safeId = String(v.id).replace(/'/g, "\\'");
      const thumbSrc = getWordIllustrationSrc(v);
      const fbSrc = buildFallbackWordSvg(v).replace(/'/g, '%27');
      const thumbHtml = `<img src="${thumbSrc}" class="glossary-item-thumb" alt="${escapeHtml(v.word)}" onerror="this.onerror=null;this.src='${fbSrc}'">`;

      row.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; min-width:0;">
          ${thumbHtml}
          <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
            <div class="item-en-term item-en-row">
              <span dir="ltr" style="display:inline-flex; align-items:center; gap:5px;">
                <span>${escapeHtml(v.word)}</span>
                <button type="button" class="inline-word-speaker mini" onclick="event.stopPropagation(); speak('${safeWord}', true, '${safeId}');" title="تلفظ واژه" aria-label="تلفظ واژه">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </button>
              </span>
              <span class="ipa-text" style="font-size:12px; font-weight:400; color:var(--text-muted);" dir="ltr">${escapeHtml(getWordPhonetic(v))}</span>
              <span class="pos-tag ${pos.cls}" style="font-size: 12px; padding: 1px 5px;">${pos.label}</span>
              ${srcBadge}
            </div>
            <div class="item-fa-term">${escapeHtml(v.meaning)} <span style="font-size:12px; color:var(--text-faint);">(${escapeHtml(formatBookLessonBadge(v))})</span></div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:5px; flex-shrink:0;">
          <span class="box-mini-tag" style="background: ${boxColors[st.box] || '#ef4444'};">جعبهٔ ${toPersianDigits(st.box)}</span>
          <button class="star-bookmark-btn ${st.starred ? 'starred' : ''}" onclick="toggleWordStar('${safeId}', event); onSearchGlossary();">${st.starred ? '⭐' : '☆'}</button>
        </div>
      `;
      list.appendChild(row);
    });
  }

  // ==========================================================
  // ANALYTICS MODAL & WEAK WORDS PRACTICE
  // ==========================================================
  window.openStatsModal = function () {
    if (!gradeData) return;
    const vocab = gradeData._combinedVocab || [];
    let masteredCount = 0;
    let totalSuccess = 0;
    let totalFail = 0;
    const weakCandidates = [];

    vocab.forEach(v => {
      const st = userProgress[v.id] || { box: 1, success: 0, fail: 0, lapses: 0 };
      if (st.box === 5) masteredCount++;
      totalSuccess += (st.success || 0);
      totalFail += (st.fail || 0);
      if ((st.lapses || 0) > 0 || (st.fail || 0) > 0) {
        weakCandidates.push({
          id: v.id,
          word: v.word,
          meaning: v.meaning,
          lesson: v.lesson,
          lapses: st.lapses || 0,
          fail: st.fail || 0
        });
      }
    });

    const totalReviewsAllTime = Object.values(weeklyHistory).reduce((a, b) => a + (Number(b) || 0), 0);
    const masteryPct = vocab.length > 0 ? Math.round((masteredCount / vocab.length) * 100) : 0;
    const totalAttempts = totalSuccess + totalFail;
    const accuracyPct = totalAttempts > 0 ? Math.round((totalSuccess / totalAttempts) * 100) : 100;

    document.getElementById('stat-mastered-count').textContent =
      `${toPersianDigits(masteredCount)} از ${toPersianDigits(vocab.length)} (${toPersianDigits(masteryPct)}٪)`;
    document.getElementById('stat-accuracy-pct').textContent = `${toPersianDigits(accuracyPct)}٪`;
    document.getElementById('stat-streak-display').textContent = `${toPersianDigits(userGamification.streak)} روز`;
    document.getElementById('stat-reviews-total').textContent = toPersianDigits(totalReviewsAllTime);

    const barsWrap = document.getElementById('stat-weekly-bars');
    if (barsWrap) {
      barsWrap.innerHTML = '';
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = getLocalDateString(d);
        const dayName = ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'][d.getDay()];
        const count = weeklyHistory[ds] || 0;
        const height = Math.min(100, count * 5);

        const col = document.createElement('div');
        col.style.cssText = 'flex:1; display:flex; flex-direction:column; align-items:center; gap:3px;';
        col.innerHTML = `
          <div style="font-size: 12px; color:var(--text-muted);">${toPersianDigits(count)}</div>
          <div style="width:14px; height:60px; background:var(--bg-card); border-radius:4px; display:flex; align-items:flex-end; overflow:hidden;">
            <div style="width:100%; height:${height}%; background:var(--emerald);"></div>
          </div>
          <div style="font-size: 12px; font-weight:700;">${dayName}</div>
        `;
        barsWrap.appendChild(col);
      }
    }

    const top10Weak = weakCandidates.sort((a, b) => (b.lapses + b.fail) - (a.lapses + a.fail)).slice(0, 10);
    const weakList = document.getElementById('stat-weak-list');
    if (weakList) {
      weakList.innerHTML = '';
      if (top10Weak.length === 0) {
        weakList.innerHTML = '<p style="text-align:center; padding:10px; font-size:12px; color:var(--text-muted);">🎉 واژهٔ پرخطایی ثبت نشده است!</p>';
      } else {
        top10Weak.forEach(w => {
          const safeWord = w.word.replace(/'/g, "\\'");
          const safeId = String(w.id).replace(/'/g, "\\'");
          const item = document.createElement('div');
          item.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid var(--border-subtle); font-size:12px;';
          item.innerHTML = `
            <div>
              <strong>${escapeHtml(w.word)}</strong> <small style="color:var(--text-muted);">(${escapeHtml(w.meaning)})</small>
              ${w.lapses >= 3 ? '<span class="leech-badge" style="margin-right:4px;">پرخطا</span>' : ''}
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <span style="color:var(--danger); font-weight:800; font-size: 12px;">${toPersianDigits(w.fail)} خطا</span>
              <button class="play-audio-btn" style="width:26px; height:26px; font-size: 12px;" onclick="speak('${safeWord}', true, '${safeId}')">🔊</button>
            </div>
          `;
          weakList.appendChild(item);
        });
      }
    }

    /* 4.1.0 Phase B: per-lesson weak summary from the same long-term local stats */
    const lessonWrap = document.getElementById('stat-lesson-weak');
    if (lessonWrap) {
      const byLesson = {};
      weakCandidates.forEach(function (w) {
        const L = w.lesson || 0;
        if (!byLesson[L]) byLesson[L] = { count: 0, fails: 0 };
        byLesson[L].count++; byLesson[L].fails += (w.fail || 0) + (w.lapses || 0);
      });
      const lessons = Object.keys(byLesson).sort(function (a, b) { return byLesson[b].fails - byLesson[a].fails; });
      lessonWrap.innerHTML = lessons.length === 0
        ? '<p style="text-align:center; padding:8px; font-size:12px; color:var(--text-muted);">🎉 در هیچ درسی واژهٔ پرخطا ثبت نشده است!</p>'
        : lessons.map(function (L) {
            return `<div style="display:flex; justify-content:space-between; padding:7px 10px; border:1px solid var(--border-subtle); border-radius:10px; margin:5px 0; font-size:12px;">
              <span>📖 درس ${toPersianDigits(L)}</span>
              <span style="color:var(--danger); font-weight:700;">${toPersianDigits(byLesson[L].count)} واژهٔ نیازمند مرور · ${toPersianDigits(byLesson[L].fails)} خطا</span></div>`;
          }).join('');
    }

    const modal = document.getElementById('stats-modal-overlay');
    if (modal) modal.classList.add('show');
  };

  window.practiceWeakWords = function () {
    closeStatsModal();
    leitnerLessonFilter = 'leeches';
    populateLeitnerLessonSelect();
    onFilterChange();
    switchTab('leitner');
    if (activeCards.length === 0) {
      showToast('🎉 هنوز هیچ واژهٔ پرخطایی در این پایه ثبت نشده است!');
    } else {
      showToast(`⚡ ${toPersianDigits(activeCards.length)} واژهٔ نیازمند تمرین آمادهٔ مرور شدند`);
    }
  };

  window.closeStatsModal = function () {
    const modal = document.getElementById('stats-modal-overlay');
    if (modal) modal.classList.remove('show');
  };

  // ==========================================================
  // BACKUP EXPORT, BACKUP IMPORT & CLEAN GRADE RESET
  // ==========================================================
  function getAllGradesProgress() {
    const all = {};
    GRADE_LIST.forEach(g => {
      try {
        const saved = localStorage.getItem(`farhanglex_progress_${g.id}`);
        if (saved) all[g.id] = JSON.parse(saved);
      } catch (e) {}
    });
    return all;
  }

  window.exportProgress = async function () {
    let backupData;
    if (window.FarhangLexDB && typeof window.FarhangLexDB.exportComprehensiveBackup === 'function') {
      backupData = await window.FarhangLexDB.exportComprehensiveBackup();
      backupData.allGradesProgress = getAllGradesProgress();
      // In-memory/local values are the active UI state; asynchronous secondary IDB writes may lag them.
      backupData.settings = Object.assign({}, appSettings);
      backupData.gamification = Object.assign({}, userGamification);
      backupData.weeklyHistory = Object.assign({}, weeklyHistory);
      backupData.history = Object.assign({}, weeklyHistory);
    } else {
      backupData = {
        app: 'FarhangLex',
        version: APP_VERSION,
        contentVersion: '3.1.0',
        exportDate: new Date().toISOString(),
        gamification: userGamification,
        weeklyHistory: weeklyHistory,
        settings: appSettings,
        allGradesProgress: getAllGradesProgress()
      };
    }

    const jsonStr = JSON.stringify(backupData, null, 2);
    const filename = `FarhangLex_Backup_${getLocalDateString()}.json`;

    // Fixed in v3.1.0: Exact (filename, mimeType, content) parameter order!
    if (window.AndroidBridge && typeof window.AndroidBridge.exportFile === 'function') {
      window.AndroidBridge.exportFile(filename, 'application/json', jsonStr);
      showToast('پنجرهٔ ذخیرهٔ فایل پشتیبان باز شد 💾');
      return jsonStr;
    }

    try {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('فایل پشتیبان کامل دریافت شد 💾');
      return jsonStr;
    } catch (e) {
      showToast('⚠️ خطا در دریافت فایل پشتیبان');
      return jsonStr;
    }
  };

  window.triggerImportBackup = function () {
    if (window.AndroidBridge && typeof window.AndroidBridge.importBackupJson === 'function') {
      window.AndroidBridge.importBackupJson();
      return;
    }
    const input = document.getElementById('backup-file-input');
    if (input) input.click();
  };

  window.handleBackupFileSelected = function (event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        await applyImportedBackup(parsed);
      } catch (err) {
        showToast('⚠️ فرمت فایل پشتیبان نامعتبر است');
      }
    };
    reader.readAsText(file);
  };

  function backupObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value) &&
      !Object.keys(value).some(k => k === '__proto__' || k === 'constructor' || k === 'prototype');
  }

  // Reject a malformed/mismatched file before asking for confirmation or clearing anything. Legacy
  // records without a grade are accepted only when the grade can be determined from this file/curriculum.
  function normalizeImportedBackup(data) {
    if (!backupObject(data) || (data.app && String(data.app).toLowerCase() !== 'farhanglex')) return null;
    const grades = GRADE_LIST.map(g => g.id);
    if (!Array.isArray(data.progressRecords) && !backupObject(data.allGradesProgress)) return null;
    if ('progressRecords' in data && !Array.isArray(data.progressRecords)) return null;
    if ('allGradesProgress' in data && !backupObject(data.allGradesProgress)) return null;
    for (const key of ['settings', 'gamification', 'weeklyHistory', 'history']) {
      if (data[key] != null && !backupObject(data[key])) return null;
    }
    const game = data.gamification || {};
    for (const key of ['gems', 'streak', 'bestStreak', 'xp', 'peakGems', 'streakFreezes', 'gamesCompleted', 'bestCombo', 'highAccuracySessions', 'questChestsOpened', 'spellingCorrectTotal']) {
      if (game[key] != null && (typeof game[key] !== 'number' || !Number.isFinite(game[key]) || game[key] < 0)) return null;
    }
    for (const key of ['unlockedThemes', 'unlockedBadges', 'frozenDates']) if (game[key] != null && !Array.isArray(game[key])) return null;
    for (const key of ['badgeTiers', 'dailyQuests']) if (game[key] != null && !backupObject(game[key])) return null;
    const byWord = Object.create(null);
    const rememberGrade = (id, grade) => {
      if (!id) return;
      if (!Object.prototype.hasOwnProperty.call(byWord, id)) byWord[id] = grade;
      else if (byWord[id] !== grade) byWord[id] = null; // ambiguous legacy id: do not guess
    };
    if (data.allGradesProgress) {
      for (const [key, val] of Object.entries(data.allGradesProgress)) {
        if (key.startsWith('custom_')) {
          if (!grades.includes(key.slice(7)) || !Array.isArray(val) || val.some(v => !backupObject(v) || typeof v.id !== 'string' || typeof v.word !== 'string' || typeof v.meaning !== 'string')) return null;
        } else {
          if (!grades.includes(key) || !backupObject(val)) return null;
          for (const [id, rec] of Object.entries(val)) {
            if (!backupObject(rec) || !id || ('wordId' in rec && (typeof rec.wordId !== 'string' || !rec.wordId)) || ('gradeId' in rec && rec.gradeId !== key)) return null;
            rememberGrade(id, key);
            if (rec.wordId) rememberGrade(rec.wordId, key);
          }
        }
      }
    }
    const curr = window.MASTER_CURRICULUM && (window.MASTER_CURRICULUM.grades || window.MASTER_CURRICULUM);
    if (curr) grades.forEach(g => {
      const grade = curr[g];
      if (grade && Array.isArray(grade.vocabulary)) grade.vocabulary.forEach(w => {
        if (w.id) rememberGrade(w.id, g);
        if (w.legacyId) rememberGrade(w.legacyId, g);
      });
    });
    let records;
    if (data.progressRecords) {
      records = [];
      for (const rec of data.progressRecords) {
        if (!backupObject(rec) || typeof rec.wordId !== 'string' || !rec.wordId || ['__proto__', 'constructor', 'prototype'].includes(rec.wordId)) return null;
        const gradeId = rec.gradeId || byWord[rec.wordId];
        if (!grades.includes(gradeId)) return null;
        records.push(Object.assign({}, rec, { gradeId }));
      }
    }
    const hist = data.weeklyHistory || data.history;
    if (hist && Object.values(hist).some(v => typeof v !== 'number' || !Number.isFinite(v) || v < 0)) return null;
    const normalized = Object.assign({}, data);
    if (records) normalized.progressRecords = records;
    return normalized;
  }

  function createRestoreLock() {
    const overlay = document.createElement('div');
    overlay.id = 'restore-progress-lock';
    overlay.setAttribute('dir', 'rtl');
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.tabIndex = -1;
    overlay.style.cssText = 'position:fixed;top:0;bottom:0;left:0;right:0;z-index:2147482500;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.72);color:#10231c;font-family:Vazirmatn,Tahoma,sans-serif;text-align:center;';
    const card = document.createElement('div');
    card.style.cssText = 'box-sizing:border-box;width:100%;max-width:360px;border-radius:16px;padding:24px;background:#fff;line-height:1.9;font-size:15px;font-weight:700;';
    card.textContent = 'در حال بازیابی پشتیبان؛ لطفاً صبر کنید…';
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    const blockKeys = e => { if (!overlay.contains(e.target) || !overlay.querySelector('button')) { e.preventDefault(); e.stopImmediatePropagation(); } };
    document.addEventListener('keydown', blockKeys, true);
    overlay._restoreBlockKeys = blockKeys;
    try { overlay.focus(); } catch (e) {}
    return overlay;
  }

  function finishRestoreLock(overlay) {
    if (!overlay) return;
    document.removeEventListener('keydown', overlay._restoreBlockKeys, true);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  function showRestoreRecoveryLock(overlay, message) {
    const card = overlay.firstChild;
    card.textContent = message || 'بازیابی ناتمام است. لطفاً کمی از فضای گوشی را آزاد کنید و سپس برنامه را دوباره باز کنید.';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.textContent = 'باز کردن دوبارهٔ برنامه';
    btn.style.cssText = 'display:block;width:100%;min-height:48px;margin-top:18px;border:0;border-radius:12px;background:#0b7a5a;color:#fff;font:inherit;cursor:pointer;';
    btn.onclick = () => location.reload();
    card.appendChild(btn);
    try { btn.focus(); } catch (e) {}
  }

  async function applyImportedBackup(input, opts) {
    const data = normalizeImportedBackup(input);
    if (!data) {
      showToast('⚠️ فایل انتخابی یک پشتیبان معتبر FarhangLex نیست');
      return;
    }
    if (!opts || !opts.confirmed) {
      const reviewed = all => { let n = 0; Object.entries(all || {}).forEach(([k, v]) => { if (!k.startsWith('custom_') && v && typeof v === 'object') n += Object.values(v).filter(r => r && r.lastReview > 0).length; }); return n; };
      const fileWords = data.allGradesProgress ? reviewed(data.allGradesProgress)
        : data.progressRecords.filter(r => r && r.lastReview > 0).length;
      const g = data.gamification || {};
      let when = '';
      try { const d = new Date(data.exportDate || data.exportedAt || data.date || ''); if (!isNaN(d.getTime())) when = getJalaliDateString(d); } catch (e) {}
      openConfirmModal('بازیابی از فایل پشتیبان',
        (when ? `این پشتیبان ${when} ساخته شده است. ` : '') +
        `در فایل: ${toPersianDigits(fileWords)} واژهٔ مرورشده، ${toPersianDigits(g.gems || 0)} الماس و زنجیرهٔ ${toPersianDigits(g.streak || 0)} روزه. ` +
        `الان در گوشی: ${toPersianDigits(reviewed(getAllGradesProgress()))} واژهٔ مرورشده و ${toPersianDigits(userGamification.gems || 0)} الماس. ` +
        'پیشرفت فعلی با فایل جایگزین می‌شود.',
        () => { applyImportedBackup(data, { confirmed: true }).catch(() => showToast('⚠️ بازیابی انجام نشد؛ دوباره امتحان کنید.')); });
      return;
    }
    if (restoreInProgress) return;
    const db = window.FarhangLexDB;
    if (!db || typeof db.commitBackupSafely !== 'function') {
      showToast('⚠️ بازیابی انجام نشد؛ پایگاه داده در دسترس نیست.');
      return;
    }
    // Prepare every value before writing. Both representations of progress are combined so the
    // native safety mirror also contains records that arrived only in progressRecords.
    const changes = {}, gradeProgress = {};
    GRADE_LIST.forEach(g => { gradeProgress[g.id] = Object.create(null); });
    (data.progressRecords || []).forEach(rec => { gradeProgress[rec.gradeId][rec.wordId] = rec; });
    Object.entries(data.allGradesProgress || {}).forEach(([key, val]) => {
      // custom_* teacher vocabulary is dropped on restore (removed entirely in 4.2.1).
      if (!key.startsWith('custom_')) Object.assign(gradeProgress[key], val);
    });
    GRADE_LIST.forEach(g => { const d = gradeProgress[g.id]; changes['farhanglex_progress_' + g.id] = Object.keys(d).length ? JSON.stringify(d) : null; });
    const nextSettings = data.settings ? Object.assign({}, appSettings, data.settings) : appSettings;
    const nextGame = data.gamification ? Object.assign({}, userGamification, data.gamification) : userGamification;
    const nextHistory = (data.weeklyHistory || data.history) ? Object.assign({}, data.weeklyHistory || data.history) : weeklyHistory;
    if (data.settings) changes.farhanglex_settings_v21 = JSON.stringify(nextSettings);
    if (data.gamification) {
      nextGame.peakGems = Math.max(nextGame.peakGems || 0, nextGame.gems || 0);
      nextGame.bestStreak = Math.max(nextGame.bestStreak || 0, nextGame.streak || 0);
      changes.farhanglex_gamification_v30 = JSON.stringify(nextGame);
    }
    if (data.weeklyHistory || data.history) changes.farhanglex_weekly_history = JSON.stringify(nextHistory);
    const dbBackup = Object.assign({}, data);
    if (data.settings) dbBackup.settings = nextSettings;
    if (data.gamification) dbBackup.gamification = nextGame;
    if (data.weeklyHistory || data.history) { dbBackup.weeklyHistory = nextHistory; dbBackup.history = nextHistory; }

    restoreInProgress = true;
    if (window.CreativeGames && typeof window.CreativeGames.stopTimers === 'function') window.CreativeGames.stopTimers();
    clearTimeout(mirrorSaveTimer);
    const overlay = createRestoreLock();
    let committed = false, uiComplete = false, lockedForRecovery = false;
    try {
      await db.commitBackupSafely(dbBackup, changes);
      committed = true;
      if (data.settings) { appSettings = nextSettings; updateSettingsUI(); applyTheme(); }
      if (data.gamification) userGamification = nextGame;
      if (data.weeklyHistory || data.history) weeklyHistory = nextHistory;
      updateGamificationUI();
      await loadGrade(currentGradeId);
      uiComplete = true;
    } catch (e) {
      if (e && e.recoveryNeeded) {
        lockedForRecovery = true;
        showRestoreRecoveryLock(overlay);
      } else if (committed) {
        lockedForRecovery = true;
        showRestoreRecoveryLock(overlay, 'پشتیبان ذخیره شد، اما صفحه کامل نشد. لطفاً برنامه را دوباره باز کنید.');
      } else {
        showToast('⚠️ بازیابی انجام نشد؛ فضای گوشی را بررسی کنید و دوباره امتحان کنید.');
      }
    } finally {
      if (!lockedForRecovery) {
        finishRestoreLock(overlay);
        restoreInProgress = false;
      }
    }
    if (committed && !lockedForRecovery) {
      if (uiComplete) saveGradeProgress();
      clearTimeout(mirrorSaveTimer);
      const mirrored = writeNativeMirror();
      if (!uiComplete) showToast('⚠️ پشتیبان ذخیره شد، اما نمایش کامل نشد؛ برنامه را دوباره باز کنید.');
      else if (mirrored === false) showToast('⚠️ بازیابی شد، اما نسخهٔ ایمنی گوشی ذخیره نشد؛ فضای گوشی را بررسی کنید.');
      else showToast('✅ تمامی داده‌ها و پیشرفت مطالعه با موفقیت بازیابی شد!');
    }
  }

  // Fixed in v3.1.0: Uses custom modal AND clears both IndexedDB & localStorage!
  window.resetProgress = function () {
    if (!gradeData) return;
    closeSettingsModal();
    openConfirmModal(
      `بازنشانی ${gradeData.titleFa}`,
      `آیا از بازنشانی جعبه‌های لایتنر و پیشرفت مطالعه در «${gradeData.titleFa}» اطمینان دارید؟`,
      async function () {
        userProgress = {};
        localStorage.removeItem(`farhanglex_progress_${currentGradeId}`);
        if (window.FarhangLexDB && typeof window.FarhangLexDB.clearGradeProgress === 'function') {
          await window.FarhangLexDB.clearGradeProgress(currentGradeId);
        }
        await loadGrade(currentGradeId);
        scheduleNativeMirrorSave();
        showToast(`جعبه‌های لایتنر ${gradeData.titleFa} بازنشانی شد 🔄`);
      }
    );
  };

  // ==========================================================
  // CREATOR CONTACT HELPERS
  // ==========================================================
  window.openCreatorTelegram = function () {
    var bridge = window.AndroidBridge || window.NativeBridge;
    try {
      if (bridge && typeof bridge.openTelegramSupport === 'function') { bridge.openTelegramSupport(); return; }
      if (typeof window.open === 'function') { window.open('https://t.me/TeachSpot', '_blank', 'noopener,noreferrer'); return; }
    } catch (e) {}
    showToast('تلگرام: @TeachSpot');
  };

  window.copyCreatorTelegram = function () {
    var contact = '@TeachSpot', bridge = window.AndroidBridge || window.NativeBridge;
    try {
      if (bridge && typeof bridge.copyText === 'function') { bridge.copyText(contact); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contact).then(() => showToast('شناسه کپی شد ✓'), () => showToast('شناسه: ' + contact));
        return;
      }
    } catch (e) {}
    showToast('شناسه: ' + contact);
  };

  // v3.11 (U2): «📋 گزارش فنی» in «من» — what the developer needs to know about a phone he cannot see. Built on the
  // phone only (js/safety_net.js), copied with the existing copyText bridge; nothing is sent anywhere.
  if (window.SafetyNet) {
    window.SafetyNet.setInfo(function () {
      const mode = appSettings.appearance || 'auto';
      const lines = [
        'ظاهر: ' + (mode === 'auto' ? 'هماهنگ با گوشی' : (mode === 'dark' ? 'تیره' : 'روشن')) + ' · گوشی در حالت ' + (systemIsDark() ? 'شب' : 'روز') + ' · تم: ' + effectiveTheme(),
        'پایه: ' + currentGradeId + ' · «فقط EN»: ' + (appSettings.englishOnly ? 'روشن' : 'خاموش') + ' · یادآوری فعال: ' + (appSettings.activeRecall ? 'روشن' : 'خاموش') + ' · نسخهٔ وب: ' + APP_VERSION
      ];
      lines.version = APP_VERSION;
      return lines;
    });
  }
  function fillTechReport() {
    const box = document.getElementById('techreport-text');
    if (!box) return;
    const lines = window.SafetyNet ? window.SafetyNet.reportLines() : ['FarhangLex ' + APP_VERSION];
    lines.push('پخش: صوت‌های ازپیش‌ضبط‌شدهٔ محلی، بدون نیاز به اینترنت');
    box.innerHTML = '';
    lines.forEach(l => { const d = document.createElement('div'); d.setAttribute('dir', 'auto'); d.textContent = l; box.appendChild(d); });
    box.setAttribute('data-text', lines.join('\n'));
  }
  window.openTechReport = function () {
    const m = document.getElementById('techreport-modal-overlay');
    if (!m) return;
    fillTechReport();
    if (window.SafetyNet) window.SafetyNet.refresh(fillTechReport);   // the storage estimate arrives a moment later
    m.classList.add('show');
  };
  window.closeTechReport = function () {
    const m = document.getElementById('techreport-modal-overlay');
    if (m) m.classList.remove('show');
  };
  window.copyTechReport = function () {
    const box = document.getElementById('techreport-text');
    const text = (box && box.getAttribute('data-text')) || '';
    if (window.SafetyNet) window.SafetyNet.copy(text, document.getElementById('techreport-copy-btn'));
    else window.copyCreatorPhone(text);
  };

  window.FarhangLexBridge = {
    getFilteredQuizVocab: getFilteredQuizVocabList,
    getAllGradeVocab: function () { return (gradeData && gradeData._combinedVocab) ? gradeData._combinedVocab : []; },
    getGradeId: function () { return currentGradeId || 'vision_1'; },
    getGradeName: function () { return (gradeData && gradeData.name) || 'Vision 1'; },
    isQuizTabActive: function () { return currentTabName === 'quiz'; },
    getPhonetic: getWordPhonetic,
    getDistractors: getPsychometricDistractors,
    getQuizDistractors: getQuizDistractors,        // v3.10 cloze options (near-miss layer) — read by tests/test_v3100.js
    getVisualDistractors: getIllustratedVisualDistractors,
    isPicSafe: isPictureQuizSafe,
    getBookLessonBadge: formatQuizRefShort,           // v3.11: short «📖 درس ۲ • ص ۵۱» on game cards
    revealArea: function () { revealQuizPrimary(); }, // v3.11 (F17): games call this after every render
    getImgSrc: getWordIllustrationSrc,
    getFallbackImg: buildFallbackWordSvg,
    speakWord: function (v, slow) {
      if (v) speak(v.word, true, v.id, slow ? 0.64 : null);
    },
    recordAnswer: function (wordId, isCorrect, gemsToAward, comboNow, isSpelling) {
      applyQuizLeitnerImpact(wordId, isCorrect);
      if (isCorrect) {
        if (gemsToAward > 0) {
          userGamification.gems = (userGamification.gems || 0) + gemsToAward;
        }
        if (comboNow && comboNow > (userGamification.bestCombo || 0)) {
          userGamification.bestCombo = comboNow;
        }
        if (isSpelling) {
          recordSpellingMastery();
        } else {
          awardXP(6);
        }
        saveGamification();
        playSfx((comboNow && comboNow >= 3) ? 'combo' : 'correct', comboNow);
      } else {
        playSfx('wrong');
      }
      checkAndUnlockAchievements(false);
      triggerHaptic(isCorrect ? [25, 35, 25] : [80, 45, 80]);
    },
    onGameFinish: function (correctCount, totalAttempts) {
      userGamification.gamesCompleted = (userGamification.gamesCompleted || 0) + 1;
      awardXP(20);
      if (typeof correctCount === 'number' && typeof totalAttempts === 'number') {
        recordSessionAccuracy(correctCount, totalAttempts);
      }
      saveGamification();
      playSfx('victory');
      checkAndUnlockAchievements(false);
    },
    toFa: toPersianDigits,
    esc: escapeHtml,
    toast: showToast
  };

  // v3.11 (U4): init is watched — when it fails the learner sees the calm «بازگشت به خانه» card of js/safety_net.js
  // (with «📋 کپی گزارش فنی») instead of a half-empty page; the error is kept for «📋 گزارش فنی».
  document.addEventListener('DOMContentLoaded', function () {
    if (window.SafetyNet) window.SafetyNet.started();
    Promise.resolve().then(init).then(function () {
      if (window.SafetyNet) window.SafetyNet.booted();
    }, function (e) {
      if (window.SafetyNet) window.SafetyNet.bootFail(e); else throw e;
    });
  });
})();
