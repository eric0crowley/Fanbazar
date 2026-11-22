/* ==========================================================================
   FarhangGram v2.18.0 — Main UI Controller
   چهار تب: مسیر · تمرین · جوایز · من
   یک صفحه = یک کار. یک دکمهٔ اصلی. بازخورد فوری. صدا و حرکت.
   ========================================================================== */

(function () {
  'use strict';

  var currentTab = 'path';
  var bankFilterOnlyStarred = false;
  var bankSearchQuery = '';
  var meSubTab = 'main';
  var leitnerState = null;
  var lessonFlow = null;

  var GRADE_ORDER = ['prospect_1', 'prospect_2', 'prospect_3', 'vision_1', 'vision_2', 'vision_3'];

  var GRADE_META = {
    prospect_1: { fa: 'پایهٔ هفتم', short: 'هفتم', tag: 'Prospect 1' },
    prospect_2: { fa: 'پایهٔ هشتم', short: 'هشتم', tag: 'Prospect 2' },
    prospect_3: { fa: 'پایهٔ نهم', short: 'نهم', tag: 'Prospect 3' },
    vision_1: { fa: 'پایهٔ دهم', short: 'دهم', tag: 'Vision 1' },
    vision_2: { fa: 'پایهٔ یازدهم', short: 'یازدهم', tag: 'Vision 2' },
    vision_3: { fa: 'پایهٔ دوازدهم', short: 'دوازدهم', tag: 'Vision 3' }
  };

  /* ------------------------------------------------------------- helpers */
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /** 100% English text (a sentence, an option) — one LTR isolate. */
  function en(str) {
    return window.FGText ? window.FGText.en(str) : '<bdi dir="ltr" class="en">' + esc(str) + '</bdi>';
  }
  /** Persian text that may contain English words — only the Latin runs are
      isolated; the Persian stays RTL (fixes the v2.6.1 word-order bug). */
  function mixed(str) {
    return window.FGText ? window.FGText.mixed(str) : esc(str);
  }
  function fa() { return window.FGStore.toFaDigits.apply(null, arguments); }
  function faNum(v) { return window.FGStore.toFaDigits(v); }
  function sh(name) { if (window.FGSound) window.FGSound.play(name); }
  function gradeMeta(gid) { return GRADE_META[gid] || { fa: gid, short: gid, tag: gid }; }
  function gradeTitleFa(gid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    return g ? (g.titleFa || g.name) : gid;
  }
  /** "درس ۱: معرفی خود و احوال‌پرسی (am / is / are)" → "معرفی خود و احوال‌پرسی" */
  function lessonShortTitle(ls) {
    var t = String(ls.titleFa || '');
    var cut = t.indexOf(':');
    if (cut > -1) t = t.slice(cut + 1);
    t = t.replace(/\([^)]*\)/g, '').trim();
    if (t.length > 42) t = t.slice(0, 42).trim() + '…';
    return t || ('درس ' + faNum(ls.id));
  }

  /** Splits "درس ۱: معرفی خود (am / is / are)" → {title, pattern} */
  function splitLessonTitle(full) {
    var t = String(full || '');
    var pattern = '';
    var m = t.match(/[（(]([^）)]*)[）)]/);
    if (m) { pattern = m[1].trim(); t = t.replace(m[0], '').replace(/\s+([،,.؛])/g, '$1').trim(); }
    var cut = t.indexOf(':');
    if (cut > -1) t = t.slice(cut + 1).trim();
    return { title: t, pattern: pattern };
  }

  /* --------------------------------------------------------------- toast
     v2.7.0 rules: one toast at a time (a short queue, no duplicates); it sits
     under the header so it never covers a main button (see .toast in CSS);
     every navigation clears it; right/wrong answers never use it — the
     feedback panel already says that. Toasts are for rare events only
     (reward, theme, backup, save). */
  var toastQueue = [];
  var toastTimer = null;
  var toastGapTimer = null;

  function showToast(msg, ms) {
    if (!msg) return;
    var el = document.getElementById('app-toast');
    if (!el) return;
    var showing = el.classList.contains('show');
    if ((showing && el.textContent === msg) || toastQueue.indexOf(msg) > -1) return;
    /* a warning answers the learner's own action → it never waits in line */
    var urgent = /^⚠️/.test(msg);
    if ((showing || toastGapTimer) && !urgent) {
      if (toastQueue.length < 3) toastQueue.push(msg);
      return;
    }
    clearTimeout(toastGapTimer); toastGapTimer = null;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastTimer = null;
      el.classList.remove('show');
      if (toastQueue.length) {
        toastGapTimer = setTimeout(function () {   // let the exit transition finish
          toastGapTimer = null;
          showToast(toastQueue.shift());
        }, 260);
      }
    }, ms || 2400);
  }

  /** Clears the visible toast and the queue (called on every navigation). */
  function hideToast() {
    toastQueue.length = 0;
    clearTimeout(toastTimer); toastTimer = null;
    clearTimeout(toastGapTimer); toastGapTimer = null;
    var el = document.getElementById('app-toast');
    if (el) el.classList.remove('show');
  }

  /* One source of truth for feedback copy: FGStore.PRAISE_PHRASES /
     COMFORT_PHRASES (linted by tests/test_copy.js). */
  function cheer() {
    return window.FGStore && window.FGStore.pickPraise ? window.FGStore.pickPraise() : 'آفرین! 🎉';
  }
  function encourage() {
    return window.FGStore && window.FGStore.pickComfort ? window.FGStore.pickComfort() : 'اشکالی ندارد؛ با هم درستش می‌کنیم 🙂';
  }

  /* --------------------------------------------------------------- icons */
  var ICON = {
    /* v2.14: the same coin as the header HUD, next to every price */
    coin: '<svg class="coin-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h5M9.5 14.5h5" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
    path: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>',
    puzzle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11h-4V7a2 2 0 0 0-4 0v4H7a2 2 0 0 0 0 4h4v4a2 2 0 0 0 4 0v-4h4a2 2 0 0 0 0-4z"/></svg>',
    hunt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-4.9-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 3.5C20 16.1 12 21 12 21z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>'
  };

  /* ================================================================ HUD */
  function refreshHeaderHud() {
    var st = window.FGStore.getState();
    var sEl = document.getElementById('hud-streak');
    var xEl = document.getElementById('hud-xp');
    var cEl = document.getElementById('hud-coins');
    if (sEl) sEl.textContent = faNum(st.streak || 0);
    if (xEl) xEl.textContent = faNum(st.xp || 0);
    if (cEl) cEl.textContent = faNum(st.coins || 0);
  }

  /* ============================================================ TABS */
  var TAB_ALIAS = {
    home: 'path', lessons: 'path', path: 'path',
    leitner: 'practice', games: 'practice', practice: 'practice',
    rewards: 'rewards',
    profile: 'me', me: 'me'
  };

  function switchTab(tab) {
    var target = TAB_ALIAS[tab] || 'path';
    hideToast();
    if (lessonFlow) {
      /* a lesson owns the screen — never re-render the path under it */
      if (target !== 'path') {
        closeLesson();
      } else {
        currentTab = 'path';
        showTabView('path');
        var cc = document.getElementById('app-content');
        if (cc) cc.scrollTop = 0;
        applyA11y();
        return;
      }
    }
    var leaving = currentTab;
    var content = document.getElementById('app-content');
    if (leaving === 'path' && target !== 'path' && content) pathScrollMemo = content.scrollTop;
    currentTab = target;
    showTabView(target);
    /* v2.17 (G8): instant — with the smooth behaviour the new tab slid up from the old tab's offset */
    if (content) { var sb0 = content.style.scrollBehavior; content.style.scrollBehavior = 'auto'; content.scrollTop = 0; content.style.scrollBehavior = sb0; }
    sh('tap');
    /* v2.13: the first visit shows the current lesson above the CTA.
       v2.17: coming BACK from another tab returns to the place on the map the learner left (it used to jump). */
    if (target === 'path') {
      var memo = pathScrollMemo; pathScrollMemo = null;
      pathScrollPending = memo === null;
      renderPath();
      if (memo !== null && content) { var sb = content.style.scrollBehavior; content.style.scrollBehavior = 'auto'; content.scrollTop = memo; content.style.scrollBehavior = sb; }
    }
    else if (target === 'practice') renderPractice();
    else if (target === 'rewards') renderRewards();
    else renderMe();
    applyA11y();
  }

  /** Activate a tab view without re-rendering its content. */
  function showTabView(target) {
    var ids = { path: 'view-path', practice: 'view-practice', rewards: 'view-rewards', me: 'view-me' };
    Object.keys(ids).forEach(function (k) {
      var el = document.getElementById(ids[k]);
      if (el) el.classList.toggle('active', k === target);
    });
    var btns = document.querySelectorAll('.bottom-nav button');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-tab') === target;
      btns[i].classList.toggle('active', on);
      if (on) btns[i].setAttribute('aria-current', 'page');
      else btns[i].removeAttribute('aria-current');
    }
  }

  /** Show the practice tab (used when a game arena opens). */
  function showPracticeTab() {
    showTabView('practice');
  }

  /* ================================================== PATH (مسیر) */
  /** v2.10.0 (Phase 4.1): the lesson «ادامه بده» opens = the active node of the journey map. */
  function currentLessonFor(gradeId) {
    var g = window.GRAMMAR_CURRICULUM[gradeId];
    if (!g) return null;
    var j = window.FGStore.getJourney(gradeId, g.lessons);
    for (var i = 0; i < j.length; i++) if (j[i].state === 'active') return g.lessons[i];
    return g.lessons[0];
  }
  function nextLessonOf(gid, lid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g) return null;
    for (var i = 0; i < g.lessons.length - 1; i++) if (g.lessons[i].id === lid) return g.lessons[i + 1];
    return null;
  }
  function journeyEntry(gid, lid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g) return null;
    var j = window.FGStore.getJourney(gid, g.lessons);
    for (var i = 0; i < j.length; i++) if (j[i].id === lid) return Object.assign({ index: i, all: j }, j[i]);
    return null;
  }

  /* ---------------- journey map (Phase 4.1): zigzag nodes on a trail ---------------- */
  var MAP_ROW = 136, MAP_X = [50, 74, 50, 26];
  function starRow(n) {
    var h = '';
    for (var i = 1; i <= 3; i++) h += '<i class="' + (i <= n ? 'on' : 'off') + '">' + ICON.star + '</i>';
    return '<span class="node-stars" aria-hidden="true">' + h + '</span>';
  }
  function journeyMapHtml(gid, g, journey) {
    var n = journey.length, H = n * MAP_ROW - 30;
    var pts = journey.map(function (j, i) { return { x: MAP_X[i % 4], y: i * MAP_ROW + 40 }; });
    var activeIdx = -1;
    journey.forEach(function (j, i) { if (j.state === 'active') activeIdx = i; });
    var seg = function (a, b) { return ' C ' + a.x + ' ' + (a.y + MAP_ROW / 2) + ', ' + b.x + ' ' + (b.y - MAP_ROW / 2) + ', ' + b.x + ' ' + b.y; };
    var dAll = 'M ' + pts[0].x + ' ' + pts[0].y, dDone = dAll;
    for (var i = 1; i < n; i++) {
      dAll += seg(pts[i - 1], pts[i]);
      if (i <= activeIdx) dDone += seg(pts[i - 1], pts[i]);
    }
    var svg = '<svg class="trail" viewBox="0 0 100 ' + H + '" preserveAspectRatio="none" aria-hidden="true" focusable="false">' +
      '<path class="trail-all" d="' + dAll + '"/>' + (activeIdx > 0 ? '<path class="trail-done" d="' + dDone + '"/>' : '') + '</svg>';
    var nodes = journey.map(function (j, i) {
      var ls = g.lessons[i];
      var title = lessonShortTitle(ls);
      var stateFa = j.state === 'locked' ? 'قفل' :
        j.state === 'active' ? (j.stars ? 'درس فعلی، ' + faNum(j.stars) + ' ستاره از ۳' : 'درس فعلی') :
        j.state === 'done' ? faNum(j.stars) + ' ستاره از ۳' : 'باز';
      var disc = j.state === 'locked' ? ICON.lock :
        (j.state === 'done' && j.passed ? ICON.check : '<b>' + faNum(i + 1) + '</b>');
      var fx = '';
      if (pathCelebrate && pathCelebrate.key === j.key) fx = ' just-done';
      else if (pathCelebrate && pathCelebrate.unlockedKey === j.key) fx = ' just-unlocked';
      var under = j.state === 'locked' ? '' :
        (j.state === 'active' && !j.stars ? '<span class="node-pill">شروع</span>' : starRow(j.stars));
      return '<button class="path-node ' + j.state + fx + '" style="--x:' + MAP_X[i % 4] + '%;top:' + (i * MAP_ROW) + 'px" ' +
        'data-key="' + j.key + '" onclick="FGApp.tapPathNode(\'' + gid + '\',' + j.id + ')" ' +
        'aria-label="' + esc('درس ' + faNum(i + 1) + ': ' + title + ' — ' + stateFa) + '">' +
          '<span class="node-disc">' + disc + '</span>' +
          '<span class="node-label"><span class="node-title">' + mixed(title) + '</span>' + under + '</span>' +
        '</button>';
    }).join('');
    return '<div class="path-map" style="height:' + H + 'px">' + svg + nodes + '</div>';
  }

  /** A tap on a map node: open it, or explain the lock and offer «رد کردن و ادامه». */
  function tapPathNode(gid, lid) {
    var e = journeyEntry(gid, lid);
    if (!e) return;
    if (e.state !== 'locked') { selectLesson(gid, lid); return; }
    var g = window.GRAMMAR_CURRICULUM[gid];
    var act = null;
    e.all.forEach(function (x, i) { if (x.state === 'active') act = { id: x.id, n: i + 1 }; });
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">این درس هنوز قفل است</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      '<div class="lock-sheet">' + (window.FGMascot ? window.FGMascot.svg('think', 60) : '') +
        '<div class="grow">' +
          '<p>هر درس را که با دست‌کم ' + faNum(window.FGStore.PASS_STARS) + ' ستاره تمام کنی، درس بعدی باز می‌شود.</p>' +
          '<p class="muted">برای امتحان عجله داری؟ می‌توانی رد کنی و همین درس را شروع کنی.</p>' +
        '</div>' +
      '</div>' +
      (act ? '<button class="btn btn-primary" onclick="FGApp.closeModal();FGApp.selectLesson(\'' + gid + '\',' + act.id + ')">برو به درس فعلی (درس ' + faNum(act.n) + ')</button>' : '') +
      '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FGApp.skipToLesson(\'' + gid + '\',' + lid + ')">رد کردن و ادامه</button>'
    );
  }
  /** «رد کردن و ادامه» from the lock sheet: open the lesson for good and start it. */
  function skipToLessonUi(gid, lid) {
    window.FGStore.skipToLesson(gid, lid);
    window.FGStore.saveState();
    closeModal();
    selectLesson(gid, lid);
  }
  /** «رد کردن و ادامه» on a done card with < 2 stars: unlock the next lesson and continue there. */
  function skipNextLesson() {
    var lf = lessonFlow;
    if (!lf) return;
    var nx = nextLessonOf(lf.gradeId, lf.lesson.id);
    if (!nx) { closeLesson(); return; }
    window.FGStore.skipToLesson(lf.gradeId, nx.id);
    window.FGStore.saveState();
    selectLesson(lf.gradeId, nx.id);
  }

  function renderPath() {
    var host = document.getElementById('path-container');
    if (!host) return;
    var st = window.FGStore.getState();
    var gid = st.selectedGrade;
    var g = window.GRAMMAR_CURRICULUM[gid];
    var meta = gradeMeta(gid);
    var lesson = currentLessonFor(gid);
    var todayKey = window.FGStore.formatJalaliToday();
    var dq = st.dailyQuests || { answered: 0, srsDone: 0, lessonsRead: 0 };
    var goal = st.dailyGoalMin || 5;
    /* v2.13: the ring follows the goal picked in the onboarding (it used to ignore it) and
       the line under the title names the NEXT concrete step instead of a bare «۴٪» */
    var qt = questTargets(goal);
    var questDone = dq.answered >= qt.answered && dq.srsDone >= qt.srsDone && dq.lessonsRead >= qt.lessonsRead;
    var pct = questDone ? 100 : Math.min(100, Math.round(
      (Math.min(dq.answered, qt.answered) / qt.answered + Math.min(dq.srsDone, qt.srsDone) / qt.srsDone +
       Math.min(dq.lessonsRead, qt.lessonsRead) / qt.lessonsRead) / 3 * 100));
    var nextStep = questDone ? (dq.chestClaimed ? 'هدف امروز کامل شد 🎉' : 'هدف امروز کامل شد 🎉 جایزه‌اش در «جوایز» است.') :
      dq.lessonsRead < qt.lessonsRead ? 'قدم بعد: یک درس کوتاه 📖' :
      dq.answered < qt.answered ? 'قدم بعد: ' + faNum(qt.answered - dq.answered) + ' سؤال دیگر ✍️' :
      'قدم بعد: ' + faNum(qt.srsDone - dq.srsDone) + ' کارت مرور 🔁';

    var circ = 2 * Math.PI * 38;
    var offset = Math.round(circ * (1 - pct / 100));

    var journey = window.FGStore.getJourney(gid, g.lessons);
    var starsTotal = 0;
    journey.forEach(function (j) { starsTotal += j.stars; });

    host.innerHTML = themeHintHtml(st) +
      '<div class="greet-row">' +
        '<span class="greet-mascot" aria-hidden="true">' + (window.FGMascot ? window.FGMascot.svg('normal', 64) : '') + '</span>' +
        '<div class="greet-bubble">' + esc(greetLine) + '</div>' +
      '</div>' +
      '<div class="greet-card">' +
        '<div class="grow">' +
          '<div class="greet-hi">هدف امروز: ' + faNum(goal) + ' دقیقه 🎯</div>' +
          '<div class="greet-sub">' + (firstRunHint
            ? '👇 دکمهٔ سبز پایین صفحه را بزن؛ ' + (lesson && lesson.id > 1 ? 'درس ' + faNum(lesson.id) : 'درس اول') + ' شروع می‌شود.'
            : esc(nextStep)) + '</div>' +
          '<button class="grade-switch" onclick="FGApp.openGradePickerModal()">' +
            ICON.book + '<span>' + esc(meta.fa) + '</span>' +
          '</button>' +
        '</div>' +
        '<button class="ring-wrap" onclick="FGApp.switchTab(\'rewards\')" aria-label="هدف امروز ' + faNum(pct) + ' درصد؛ دیدن مأموریت‌ها">' +
          '<svg viewBox="0 0 92 92"><circle class="ring-track" cx="46" cy="46" r="38"/>' +
          '<circle class="ring-fill" cx="46" cy="46" r="38" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '"/></svg>' +
          '<div class="ring-label">' + faNum(pct) + '٪</div>' +
        '</button>' +
      '</div>' +

      '<div class="section-head row-between"><span>مسیر یادگیری ' + esc(meta.fa) + '</span>' +
        '<span class="map-head-tools">' +
          '<button type="button" class="lesson-list-btn" onclick="FGApp.openLessonList()" aria-label="فهرست همهٔ درس‌ها">📚 همهٔ درس‌ها</button>' +
          '<span class="map-stars" aria-label="' + esc(faNum(starsTotal) + ' ستاره از ' + faNum(journey.length * 3)) + '">' + ICON.star + faNum(starsTotal) + '/' + faNum(journey.length * 3) + '</span>' +
        '</span></div>' +
      journeyMapHtml(gid, g, journey) +

      '<div class="cta-bar">' +
        '<button class="btn btn-primary' + (firstRunHint ? ' pulse' : '') + '" onclick="FGApp.selectLesson(\'' + gid + '\',' + (lesson ? lesson.id : 1) + ')">' +
          ICON.play + ' ادامه بده' +
        '</button>' +
      '</div>';
    applyA11y(host);
    afterPathRender(host);
  }

  /** One-shot effects after the map renders: celebration bounce + short sound, scroll to the active node. */
  function afterPathRender(host) {
    var cel = pathCelebrate;
    pathCelebrate = null;
    if (cel) setTimeout(function () { sh('pop'); }, 160);
    if (!pathScrollPending && !cel) return;
    pathScrollPending = false;
    /* v2.13: the NEW lesson wins over the finished one, and «visible» means above the sticky
       «ادامه بده» bar — at 360×640 the title of lesson 1 (and the unlocked lesson) hid under it */
    var target = (cel && (host.querySelector('.path-node.just-unlocked') || host.querySelector('.path-node.just-done'))) ||
      host.querySelector('.path-node.active');
    if (!target || !target.getBoundingClientRect) return;
    revealAboveCta(host, target);
  }
  /** Smallest scroll that puts `el` (disc + title + stars) between the header and the CTA bar. */
  function revealAboveCta(host, el) {
    var sc = document.getElementById('app-content');
    var cta = host.querySelector('.cta-bar');
    var r = el.getBoundingClientRect();
    var bottomLimit = (cta ? cta.getBoundingClientRect().top : window.innerHeight - 110) - 8;
    var topLimit = (sc ? sc.getBoundingClientRect().top : 64) + 8;
    if (r.bottom <= bottomLimit && r.top >= topLimit) return;
    var delta = r.bottom > bottomLimit ? r.bottom - bottomLimit : r.top - topLimit;
    /* v2.17 (G6) — start the map under the header; not during the first run (G10): the «👇 دکمهٔ سبز» hint stays */
    var head = (delta > 0 && !firstRunHint) ? host.querySelector('.section-head') : null;
    if (head) delta = Math.max(delta, Math.min(head.getBoundingClientRect().top - topLimit, r.top - topLimit));
    if (sc && sc.scrollHeight > sc.clientHeight) sc.scrollTop += delta;
    else { try { el.scrollIntoView({ block: 'center' }); } catch (e) {} }
  }
  /** Daily targets — «answer N questions» grows with the goal (5/10/15 min → 8/16/24). */
  function questTargets(goalMin) {
    var k = Math.max(1, Math.min(3, Math.round((goalMin || 5) / 5)));
    return { answered: 8 * k, srsDone: 3, lessonsRead: 1 };
  }

  /* ============================================== LESSON CARD FLOW
     v2.7.0 layout contract (tested at 360×640 by tests/fg_regression.js and
     tools/lesson_fit.js for EVERY card of EVERY lesson):
       .lesson-shell = bar + stage + cta, exactly one screen tall;
       the stage is the only thing that may scroll, the CTA never covers it;
       right/wrong feedback lives in the CTA zone (Duolingo pattern), not in a
       toast; after answering, the two irrelevant options step aside. */
  var FORMULAS_PER_CARD = 2;
  var TRAPS_PER_CARD = 1;
  var PRACTICE_PER_ROUND = 3;
  var STAR_MIN_CORRECT = 2;          // «۲ از ۳» = ستارهٔ درس
  var firstRunHint = false;
  /* Phase 4.2 — the owl greets the learner with one of three short lines, picked once per app start */
  var GREETINGS = [
    'سلام! امروز با هم یک قدم جلو می‌رویم.',
    'خوش آمدی! یک درس کوتاه، یک ستارهٔ تازه.',
    'آماده‌ای؟ پنج دقیقه کافی است تا یک قاعده را یاد بگیری.'
  ];
  var greetLine = GREETINGS[Math.min(GREETINGS.length - 1, Math.floor(Math.random() * GREETINGS.length))];
  /* Phase 4.1 — set when a lesson round improves the stars / unlocks the next lesson; the next
     renderPath() bounces that node, pops the unlocked one and plays one short sound (one-shot) */
  var pathCelebrate = null;
  var pathScrollPending = true;
  var pathScrollMemo = null;   // v2.17: where the map was when the learner went to another tab

  function lessonItems(gid, lessonId) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    return (g.items || []).filter(function (it) { return it.lesson === lessonId; });
  }

  /* v2.8: the three in-lesson questions are three DIFFERENT, tap-only types,
     easy → hard: a blank (cloze) → «کدام جمله درست است؟» → «شنیدن و انتخاب»
     (a second blank when there is no English voice). Each round takes three
     items the learner has not met in this lesson yet. */
  var LESSON_TYPES = { easy: ['cloze'], mid: ['pickright'], hard: ['listen', 'cloze'] };

  function composeLessonPractice(gid, lessonId, seen) {
    var all = lessonItems(gid, lessonId);
    var fresh = all.filter(function (it) { return !seen[it.id]; });
    if (fresh.length < PRACTICE_PER_ROUND) {
      Object.keys(seen).forEach(function (k) { delete seen[k]; });
      fresh = all.slice();
    }
    var tasks = (window.FG_Games && window.FG_Games.composeMix)
      ? window.FG_Games.composeMix(fresh, PRACTICE_PER_ROUND, { types: LESSON_TYPES })
      : fresh.slice(0, PRACTICE_PER_ROUND).map(function (it) { return { subMode: 'cloze', data: it }; });
    tasks.forEach(function (t) { seen[t.data.id] = 1; });
    return { items: tasks.map(function (t) { return t.data; }), kinds: tasks.map(function (t) { return t.subMode; }) };
  }

  function buildLessonCards(gid, lesson, seen) {
    var cards = [];
    cards.push({ type: 'intro', title: lesson.titleFa, sub: lesson.summaryFa, category: lesson.categoryFa, lessonNo: lesson.id, guide: lesson.learnerGuide });

    if (lesson.mainDiscovery) {   /* v2.15.0: the book's main grammar point gets its own discovery card first */
      cards.push({
        type: 'discovery', title: 'کشف سریع',
        question: lesson.mainDiscovery.questionFa,
        options: lesson.mainDiscovery.options,
        correctIdx: lesson.mainDiscovery.correctIdx,
        explain: lesson.mainDiscovery.insightFa
      });
    }
    if (lesson.contextDialogue) {
      cards.push({
        type: 'dialogue', title: 'گفت‌وگو',
        lineA: lesson.contextDialogue.lineA, faA: lesson.contextDialogue.faA,
        lineB: lesson.contextDialogue.lineB, faB: lesson.contextDialogue.faB
      });
    }
    if (lesson.guidedDiscovery) {
      cards.push({
        type: 'discovery', title: 'کشف سریع',
        question: lesson.guidedDiscovery.questionFa,
        options: lesson.guidedDiscovery.options,
        correctIdx: lesson.guidedDiscovery.correctIdx,
        explain: lesson.guidedDiscovery.insightFa || lesson.guidedDiscovery.explainFa
      });
    }
    if (lesson.formulas && lesson.formulas.length) {
      /* never more than two formulas on one card → every card fits 360×640 */
      var fs = lesson.formulas;
      var parts = Math.ceil(fs.length / FORMULAS_PER_CARD);
      for (var p = 0; p < parts; p++) {
        cards.push({
          type: 'formula',
          title: parts > 1 ? 'فرمول ' + faNum(p + 1) + ' از ' + faNum(parts) : 'فرمول',
          formulas: fs.slice(p * FORMULAS_PER_CARD, (p + 1) * FORMULAS_PER_CARD),
          signals: p === parts - 1 ? (lesson.signals || []) : []
        });
      }
    }
    if (lesson.traps && lesson.traps.length) {
      /* v2.15.0: at most two traps on one card (like the formulas) → every card fits 360×640 */
      var tp = Math.ceil(lesson.traps.length / TRAPS_PER_CARD);
      for (var q = 0; q < tp; q++) {
        cards.push({
          type: 'traps',
          title: tp > 1 ? 'دام‌های امتحانی ' + faNum(q + 1) + ' از ' + faNum(tp) : 'دام‌های امتحانی',
          traps: lesson.traps.slice(q * TRAPS_PER_CARD, (q + 1) * TRAPS_PER_CARD)
        });
      }
    }
    var px = composeLessonPractice(gid, lesson.id, seen || {});
    if (px.items.length) {
      cards.push({ type: 'practice', title: 'حالا تو امتحان کن', items: px.items, kinds: px.kinds });
    }
    cards.push({ type: 'done', title: 'آفرین! درس تمام شد', lesson: lesson });
    return cards;
  }

  function selectLesson(gid, lessonId) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g) return;
    var lesson = null;
    for (var i = 0; i < g.lessons.length; i++) {
      if (g.lessons[i].id === lessonId) lesson = g.lessons[i];
    }
    if (!lesson) return;
    var st = window.FGStore.getState();
    st.selectedGrade = gid;
    st.selectedLessonByGrade[gid] = lessonId;
    window.FGStore.saveState();
    sh('tap');
    openLessonFlow(gid, lesson);
  }

  function openLessonFlow(gid, lesson) {
    hideToast();
    firstRunHint = false;
    /* v2.13: a lesson left in the middle (✕ or the Android back gesture) continues on the same
       card when it is opened again in this session — it used to restart from card 1 */
    if (pausedFlow && pausedFlow.gradeId === gid && pausedFlow.lesson && pausedFlow.lesson.id === lesson.id) {
      lessonFlow = pausedFlow;
      pausedFlow = null;
      switchTab('path');
      document.body.classList.add('lesson-open');
      renderLessonCard();
      return;
    }
    pausedFlow = null;
    var seen = {};
    lessonFlow = {
      gradeId: gid,
      lesson: lesson,
      seen: seen,
      autoPlayed: false,
      cards: buildLessonCards(gid, lesson, seen),
      idx: 0,
      round: 0,
      practiceIdx: 0,
      practiceAnswered: false,
      practicePicked: null,
      practiceOrder: null,
      practiceCorrect: 0,
      discoveryDone: false,
      discoveryPicked: null,
      verdictHead: '',
      doneCounted: false,
      earned: false,
      newStar: false
    };
    switchTab('path');
    /* focus mode: the lesson owns the screen — no header, no tab bar */
    document.body.classList.add('lesson-open');
    renderLessonCard();
  }

  /** Split only at a complete sentence outside quotes/parentheses. Do not
      invent an ellipsis or discard words: the two pieces reconstruct the text. */
  function splitForMore(text, max) {
    var t = String(text || '').trim();
    if (t.length <= max) return { head: t, rest: '' };
    var depth = 0, quoted = 0, ends = [], i, ch, next, prev;
    for (i = 0; i < t.length; i++) {
      ch = t.charAt(i); next = t.charAt(i + 1); prev = t.charAt(i - 1);
      if (ch === '(' || ch === '[') { depth++; continue; }
      if (ch === ')' || ch === ']') { depth = Math.max(0, depth - 1); continue; }
      if (ch === '«' || ch === '“') { quoted++; continue; }
      if (ch === '»' || ch === '”') { quoted = Math.max(0, quoted - 1); continue; }
      if (depth || quoted || !/[.!?؟]/.test(ch) || (next && !/\s/.test(next))) continue;
      if (ch === '.' && (prev === '.' || next === '.')) continue;
      ends.push(i + 1);
    }
    var best = -1;
    for (i = 0; i < ends.length; i++) if (ends[i] <= max) best = ends[i];
    if (best < 0) best = ends.length ? ends[0] : t.length;
    return { head: t.slice(0, best).trim(), rest: t.slice(best).trim() };
  }

  function attrJson(v) { return JSON.stringify(v).replace(/"/g, '&quot;'); }

  function speakBubble(line, faTxt, me, label) {
    return '<div class="bubble' + (me ? ' me' : '') + '">' +
      '<button class="play" onclick="FGStore.speakEnglish(' + attrJson(line) + ')" aria-label="' + esc(label) + '">' +
        '<span class="play-dot" aria-hidden="true">' + ICON.sound + '</span></button>' +
      '<div class="bubble-text">' +
        '<div class="en" dir="ltr">' + esc(line) + '</div>' +
        '<div class="fa">' + mixed(faTxt) + '</div>' +
      '</div>' +
    '</div>';
  }

  /** Feedback zone that sits right above the CTA button. */
  function verdictHtml(ok, head, bodyHtml) {
    return '<div class="lesson-verdict ' + (ok ? 'ok' : 'no') + '" role="status" aria-live="polite">' +
      (window.FGMascot ? '<span class="lv-mascot" aria-hidden="true">' + window.FGMascot.svg(ok ? 'happy' : 'oops', 64) + '</span>' : '') +
      '<div class="lv-copy"><div class="lv-head"><span>' + esc(head) + '</span></div>' +
      (bodyHtml ? '<div class="lv-body">' + bodyHtml + '</div>' : '') + '</div>' +
    '</div>';
  }

  function learnerGuideHtml(guide) {
    if (!guide || !guide.explainFa || !Array.isArray(guide.examples)) return '';
    return '<details class="learner-guide"><summary>توضیح و مثال بیشتر</summary>' +
      '<div class="learner-guide-body"><p>' + mixed(guide.explainFa) + '</p>' +
      guide.examples.map(function (ex) {
        return '<div class="guide-example"><div class="guide-en" dir="ltr">' + esc(ex.en) + '</div>' +
          '<div class="guide-fa"><strong>ترجمه: </strong>' + mixed(ex.fa) + '</div></div>';
      }).join('') + '</div></details>';
  }

  function formulaCardHtml(card) {
    var fHtml = card.formulas.map(function (f) {
      var chips = f.chips.map(function (c, ci) {
        /* The source may itself contain operators or alternatives. The chips
           stay in source order; do not invent a plus between every two words. */
        return '<span class="fchip ' + esc(c.role || '') + '" style="animation-delay:' + (ci * 50) + 'ms">' + mixed(c.text) + '</span>';
      }).join('');
      return '<div class="formula-block">' +
        '<div class="formula-label">' + mixed(f.label) + '</div>' +
        '<div class="formula">' + chips + '</div>' +
        (f.learnerGlossFa ? '<div class="formula-meaning"><strong>معنی الگو: </strong>' + mixed(f.learnerGlossFa) + '</div>' : '') +
        '<div class="formula-ex"><div class="formula-caption">مثال جداگانه:</div>' +
          '<div class="ex-en" dir="ltr">' + esc(f.exampleEn) + '</div>' +
          '<div class="ex-fa"><strong>ترجمهٔ مثال: </strong>' + mixed(f.exampleFa) + '</div></div>' +
      '</div>';
    }).join('');
    var sig = card.signals && card.signals.length
      ? '<details class="more"><summary>نشانه‌ها (' + faNum(card.signals.length) + ')</summary>' +
          '<div class="sig-list">' + card.signals.map(function (s) { return '<span class="sig" dir="auto">' + mixed(s) + '</span>'; }).join('') + '</div>' +
        '</details>'
      : '';
    return '<div class="lesson-card formula-card"><h2>' + esc(card.title) + '</h2>' + fHtml + sig + '</div>';
  }

  /** Runs once per lesson, on the first card: a formula card that would not fit
      this screen above the CTA is split into one-formula cards, so the card
      count (۱/۸ …) is final from the start and nothing hides under the CTA. */
  function planFormulaCards() {
    var lf = lessonFlow;
    var stage = document.getElementById('lesson-stage');
    if (!lf || lf.planned || !stage || !stage.clientHeight) return;
    lf.planned = true;
    var cs = getComputedStyle(stage);
    var avail = stage.clientHeight - parseFloat(cs.paddingTop || 0) - parseFloat(cs.paddingBottom || 0) - 2;
    var probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:0;right:0;top:0;visibility:hidden;pointer-events:none;';
    stage.style.position = 'relative';
    var out = [];
    lf.cards.forEach(function (c) {
      if (c.type !== 'formula' || c.formulas.length < 2) { out.push(c); return; }
      probe.innerHTML = formulaCardHtml(c);
      stage.appendChild(probe);
      var h = probe.firstChild.getBoundingClientRect().height;
      stage.removeChild(probe);
      if (h <= avail) { out.push(c); return; }
      c.formulas.forEach(function (f, k) {
        out.push({ type: 'formula', title: c.title, formulas: [f], signals: k === c.formulas.length - 1 ? c.signals : [] });
      });
    });
    var fCards = out.filter(function (c) { return c.type === 'formula'; });
    fCards.forEach(function (c, k) {
      c.title = fCards.length > 1 ? 'فرمول ' + faNum(k + 1) + ' از ' + faNum(fCards.length) : 'فرمول';
    });
    lf.cards = out;
  }

  /** The flawed sentence with its wrong chunk struck through. */
  function flawedChunksHtml(it) {
    if (!it || !Array.isArray(it.chunks)) return esc(it ? it.flawedSentence : '');
    return it.chunks.map(function (c, i) {
      return i === it.wrongChunkIdx ? '<s class="err-chunk">' + esc(c) + '</s>' : esc(c);
    }).join(' ');
  }

  function currentPractice() {
    if (!lessonFlow) return null;
    var card = lessonFlow.cards[lessonFlow.idx];
    if (!card || card.type !== 'practice') return null;
    return { card: card, it: card.items[lessonFlow.practiceIdx], kind: (card.kinds || [])[lessonFlow.practiceIdx] || 'cloze' };
  }

  function lessonPlayListen(slow, auto) {
    var p = currentPractice();
    if (!p || p.kind !== 'listen') return;
    if (!auto) sh('tick');
    window.FGStore.speakEnglish(p.it.sentence, slow ? 0.62 : 0.9);
  }

  /** «الان نمی‌توانم گوش بدهم»: no listening for one hour; this question becomes a blank. */
  function lessonSkipListening() {
    var p = currentPractice();
    if (!p || p.kind !== 'listen' || lessonFlow.practiceAnswered) return;
    var st = window.FGStore.getState();
    st.listenPausedUntil = Date.now() + 60 * 60 * 1000;
    window.FGStore.saveState();
    p.card.kinds[lessonFlow.practiceIdx] = 'cloze';
    lessonFlow.practiceOrder = null;
    renderLessonCard();
    showToast('🔇 تا یک ساعت تمرین شنیداری نمی‌آید.');
  }

  /** «تمرین بیشتر»: 8 mixed questions from the lesson just finished (or the current one). */
  function practiceLessonMix() {
    var st = window.FGStore.getState();
    var gid = lessonFlow ? lessonFlow.gradeId : st.selectedGrade;
    var lid = lessonFlow ? lessonFlow.lesson.id : (st.selectedLessonByGrade[gid] || 1);
    if (lessonFlow) closeLesson();
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startLessonMix) window.FG_Games.startLessonMix(gid, lid);
  }

  function ctaButton(label, onclick) {
    return '<button class="btn btn-primary" onclick="' + onclick + '">' + esc(label) + ' ←</button>';
  }

  function renderLessonCard() {
    var host = document.getElementById('path-container');
    if (!host || !lessonFlow) return;
    hideToast();
    var lf = lessonFlow;
    var total = lf.cards.length;
    var idx = lf.idx;
    var card = lf.cards[idx];
    var pct = Math.round((idx + 1) / total * 100);
    var body = '';
    var verdict = '';
    var cta = '';

    if (card.type === 'intro') {
      var sp = splitLessonTitle(card.title);
      var sum = splitForMore(card.sub, 200);
      var leadHtml = '<p class="lesson-lead">' + mixed(sum.head) + '</p>';
      if ((leadHtml.match(/mx-formula|mx-list|mx-long/g) || []).length > 1) {
        leadHtml = '<details class="intro-patterns"><summary>خلاصهٔ درس و الگوها</summary>' + leadHtml + '</details>';
      }
      body = '<div class="lesson-card">' +
        '<h2>' + mixed(sp.title) + '</h2>' +
        '<div class="row chip-row">' +
          (sp.pattern ? '<span class="fchip pattern-chip">' + mixed(sp.pattern) + '</span>' : '') +
          (card.category ? '<span class="chip brand">' + mixed(card.category) + '</span>' : '') +
        '</div>' +
        leadHtml +
        (sum.rest
          ? '<details class="more"><summary>بیشتر بخوان</summary><p class="summary-rest">' + mixed(sum.rest) + '</p></details>'
          : '<div class="coach">' + (window.FGMascot ? window.FGMascot.svg('think', 56) : '') +
              '<div>با هم قدم‌به‌قدم جلو می‌رویم؛ هر قدم کمتر از یک دقیقه.</div></div>') +
        learnerGuideHtml(card.guide) +
      '</div>';
      cta = ctaButton('بعدی', 'FGApp.nextLessonCard()');
    } else if (card.type === 'dialogue') {
      body = '<div class="lesson-card">' +
        '<h2>' + esc(card.title) + '</h2>' +
        '<div class="dialogue">' +
          speakBubble(card.lineA, card.faA, false, 'شنیدن جملهٔ اول') +
          speakBubble(card.lineB, card.faB, true, 'شنیدن جملهٔ دوم') +
        '</div>' +
        '<div class="hint-line">👂 روی دکمهٔ بلندگو بزن تا جمله را بشنوی.</div>' +
      '</div>';
      cta = ctaButton('بعدی', 'FGApp.nextLessonCard()');
    } else if (card.type === 'discovery') {
      var dOk = lf.discoveryDone && lf.discoveryPicked === card.correctIdx;
      var opts = (card.options || []).map(function (o, oi) {
        var cls = 'option-btn fa-opt';
        if (lf.discoveryDone) {
          if (oi === card.correctIdx) cls += ' correct';
          else if (lf.discoveryPicked === oi) cls += ' wrong';
          else cls += ' dim collapsed';
        }
        return '<button class="' + cls + '" ' + (lf.discoveryDone ? 'disabled' : '') +
          ' onclick="FGApp.answerDiscovery(' + oi + ')"><span class="opt-key">' + faNum(oi + 1) + '</span>' +
          '<span class="grow">' + mixed(o) + '</span></button>';
      }).join('');
      body = '<div class="lesson-card">' +
        '<h2>' + esc(card.title) + '</h2>' +
        '<p>' + mixed(card.question) + '</p>' +
        '<div class="option-list">' + opts + '</div>' +
      '</div>';
      if (lf.discoveryDone) {
        var insight = String(card.explain || '');
        if (!dOk) insight = insight.replace(/^آفرین[!！]?\s*/, '');
        verdict = verdictHtml(dOk, lf.verdictHead, insight ? mixed(insight) : '');
        cta = ctaButton('بعدی', 'FGApp.nextLessonCard()');
      }
    } else if (card.type === 'formula') {
      body = formulaCardHtml(card);
      cta = ctaButton('بعدی', 'FGApp.nextLessonCard()');
    } else if (card.type === 'traps') {
      body = '<div class="lesson-card"><h2>' + esc(card.title) + '</h2>' +
        card.traps.map(function (t) {
          return '<div class="trap-card">' +
            '<div class="trap-line no"><span class="tl-ico" aria-hidden="true">✗</span><span class="sr-only" dir="rtl">غلط: </span>' +
              '<span class="tl-en" dir="ltr">' + esc(t.wrong) + '</span></div>' +
            '<div class="trap-line ok"><span class="tl-ico" aria-hidden="true">✓</span><span class="sr-only" dir="rtl">درست: </span>' +
              '<span class="tl-en" dir="ltr">' + esc(t.right) + '</span></div>' +
            '<div class="trap-note">' + mixed(t.noteFa) + '</div>' +
          '</div>';
        }).join('') + '</div>';
      cta = ctaButton('بعدی', 'FGApp.nextLessonCard()');
    } else if (card.type === 'practice') {
      var it = card.items[lf.practiceIdx];
      var kind = (card.kinds || [])[lf.practiceIdx] || 'cloze';
      var expected = kind === 'cloze' ? it.target : it.sentence;
      if (!lf.practiceOrder) {
        /* shuffled ONCE per question — v2.6.1 reshuffled on every render, so the
           options jumped under the finger right after answering */
        var base = kind === 'cloze' ? (it.options || [])
          : ((kind === 'pickright' ? window.FG_Games.pickrightSet(it) : window.FG_Games.listenSet(it)) || [it.sentence]);
        lf.practiceOrder = base.slice().sort(function () { return Math.random() - 0.5; });
      }
      var wasRight = lf.practiceAnswered && lf.practicePicked === expected;
      var qText = it.cloze || it.sentence;
      var prompt = '';
      if (kind === 'cloze') {
        prompt = '<div class="question-en ltr-block' + (qText.length > 58 ? ' long' : '') + '">' + esc(qText) + '</div>';
      } else if (kind === 'pickright') {
        prompt = '<div class="ex-title">✅ کدام جمله درست است؟</div><div class="ex-sub">💬 ' + mixed(it.fa) + '</div>';
      } else {
        prompt = '<div class="ex-title">🎧 گوش کن و همان جمله را انتخاب کن</div>' +
          '<div class="listen-row' + (lf.practiceAnswered ? ' compact' : '') + '">' +
            '<button class="listen-play" onclick="FGApp.lessonPlayListen(false)" aria-label="پخش جمله">' + ICON.play + '</button>' +
            '<button class="btn btn-secondary btn-sm" onclick="FGApp.lessonPlayListen(true)" aria-label="پخش آهسته">🐢 آهسته</button>' +
          '</div>';
      }
      body = '<div class="lesson-card practice-card" data-item="' + esc(it.id) + '" data-kind="' + esc(kind) + '">' +
        '<h2 class="q-count">سؤال ' + faNum(lf.practiceIdx + 1) + ' از ' + faNum(card.items.length) + '</h2>' +
        prompt +
        '<div class="option-list">' + lf.practiceOrder.map(function (o) {
          var cls = 'option-btn' + (kind === 'cloze' ? '' : ' sent-opt');
          var label = kind === 'cloze' ? en(o) : '<span class="sent-text" dir="ltr">' + esc(o) + '</span>';
          if (lf.practiceAnswered) {
            if (o === expected) cls += ' correct';
            else if (o === lf.practicePicked) cls += ' wrong';
            else cls += ' dim collapsed';
            if (kind === 'pickright' && o !== expected) label = '<span class="sent-text" dir="ltr">' + flawedChunksHtml(it) + '</span>';
          }
          return '<button class="' + cls + '" ' + (lf.practiceAnswered ? 'disabled' : '') +
            ' onclick="FGApp.answerLessonPractice(' + attrJson(o) + ')">' +
            '<span class="grow">' + label + '</span></button>';
        }).join('') + '</div>' +
        (kind === 'listen' && !lf.practiceAnswered
          ? '<button class="btn btn-ghost btn-sm no-audio" onclick="FGApp.lessonSkipListening()">🔇 الان نمی‌توانم گوش بدهم</button>'
          : '') +
      '</div>';
      if (lf.practiceAnswered) {
        verdict = verdictHtml(wasRight, lf.verdictHead, kind === 'cloze'
          ? 'درست: ' + en(it.target) + (it.explainFa ? ' — ' + mixed(it.explainFa) : '')
          : mixed(it.explainFa || ''));
        cta = ctaButton(lf.practiceIdx + 1 < card.items.length ? 'سؤال بعدی' : 'تمام', 'FGApp.nextLessonCard()');
      }
      /* unanswered: no button at all — the learner must answer first */
    } else if (card.type === 'done') {
      var ptotal = practiceTotal();
      var rs = lf.roundStars || 0;
      var best = window.FGStore.getLessonStars(lf.gradeId, lf.lesson.id);
      var nx = nextLessonOf(lf.gradeId, lf.lesson.id);
      var nxEntry = nx ? journeyEntry(lf.gradeId, nx.id) : null;
      var headFa = rs === 3 ? 'عالی! سه ستاره 🌟' : rs === 2 ? 'آفرین! دو ستاره ⭐' : rs === 1 ? 'یک ستاره گرفتی ⭐' : 'این بار بدون ستاره؛ اشکالی ندارد 🙂';
      var lineFa = lf.earned
        ? (lf.unlockedNext ? 'درس بعد باز شد 🔓' : (lf.newStar ? 'رکورد تازه در این درس!' : (best === 3 ? 'همهٔ ستاره‌های این درس مال توست ✓' : 'ستاره‌های این درس را داری ✓')))
        : (best >= window.FGStore.PASS_STARS
          ? 'ستاره‌های قبلی‌ات سر جای خود است ✓ (بهترین: ' + faNum(best) + ')'
          : 'برای باز شدن درس بعد ' + faNum(window.FGStore.PASS_STARS) + ' ستاره لازم است. با سؤال‌های تازه یک دور دیگر؟');
      var starsHtml = '';
      for (var si = 1; si <= 3; si++) starsHtml += '<i class="' + (si <= rs ? 'on' : 'off') + '" style="--i:' + si + '">' + ICON.star + '</i>';
      body = '<div class="lesson-card done-card' + (rs >= 2 ? ' celebrate' : '') + '">' +
        '<div class="done-mascot">' + (window.FGMascot ? window.FGMascot.svg(FGMascot.resultState(rs, 3), 112) : '') + '</div>' +
        '<h2>درس تمام شد' + (rs >= 2 ? ' 🎉' : '') + '</h2>' +
        '<div class="done-stars" role="img" aria-label="' + esc(faNum(rs) + ' ستاره از ۳') + '">' + starsHtml + '</div>' +
        '<p class="done-result"><strong>' + esc(headFa) + '</strong><br>' + faNum(lf.practiceCorrect) + ' از ' + faNum(ptotal) + ' سؤال درست بود.</p>' +
        '<div class="star-badge ' + (lf.earned ? 'on' : 'off') + '"><span>' + esc(lineFa) + '</span></div>' +
        (lf.earned
          ? '<button class="btn btn-secondary" onclick="FGApp.practiceLessonMix()">تمرین بیشتر (۸ سؤال)</button>'
          : (nx && nxEntry && nxEntry.state === 'locked'
            ? '<button class="btn btn-secondary" onclick="FGApp.skipNextLesson()">رد کردن و ادامه</button>'
            : '<button class="btn btn-secondary" onclick="FGApp.closeLesson()">بعداً</button>')) +
      '</div>';
      cta = lf.earned ? ctaButton('ادامه', 'FGApp.closeLesson()') : ctaButton('یک دور دیگر', 'FGApp.retryLessonPractice()');
    }

    host.innerHTML =
      '<div class="lesson-shell">' +
        '<div class="lesson-bar">' +
          '<button class="icon-btn" onclick="FGApp.pauseLesson()" aria-label="بستن درس">' + ICON.back + '</button>' +
          '<div class="progress" role="progressbar" aria-label="پیشرفت درس" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>' +
          '<span class="chip" style="flex-direction:row-reverse;gap:0"><span class="lesson-step-number">' + faNum(idx + 1) + '/' + faNum(total) + '</span> <span class="lesson-step-word" style="margin-left:4px;margin-right:0">گام</span></span>' +
        '</div>' +
        '<div class="lesson-stage" id="lesson-stage">' + body + '</div>' +
        '<div class="lesson-cta' + (verdict ? ' has-verdict' : '') + (cta ? '' : ' empty') + '">' + verdict + cta + '</div>' +
      '</div>';
    if (card.type === 'practice' && (card.kinds || [])[lf.practiceIdx] === 'listen' && !lf.practiceAnswered && !lf.autoPlayed) {
      lf.autoPlayed = true;
      setTimeout(function () { if (lessonFlow === lf && !lf.practiceAnswered) lessonPlayListen(false, true); }, 350);
    }
    if (!lf.planned) planFormulaCards();
    /* Planning can split formula cards after first render. Keep the visible
       counter, filled width and accessible value on that same final total. */
    var finalTotal = lf.cards.length;
    var finalPct = Math.round((idx + 1) / finalTotal * 100);
    var chipEl = host.querySelector('.lesson-bar .chip');
    var meterEl = host.querySelector('.lesson-bar .progress');
    if (chipEl) {
      var numberEl = chipEl.querySelector('.lesson-step-number');
      if (numberEl) numberEl.textContent = faNum(idx + 1) + '/' + faNum(finalTotal);
      chipEl.setAttribute('aria-label', 'گام ' + faNum(idx + 1) + ' از ' + faNum(finalTotal));
    }
    if (meterEl) {
      meterEl.setAttribute('aria-valuenow', String(finalPct));
      meterEl.setAttribute('aria-valuetext', 'گام ' + faNum(idx + 1) + ' از ' + faNum(finalTotal));
      var fillEl = meterEl.querySelector('i');
      if (fillEl) fillEl.style.width = finalPct + '%';
    }
    applyA11y(host);
  }

  function practiceTotal() {
    if (!lessonFlow) return 0;
    for (var i = 0; i < lessonFlow.cards.length; i++) {
      if (lessonFlow.cards[i].type === 'practice') return lessonFlow.cards[i].items.length;
    }
    return 0;
  }

  /** Reaching the «درس تمام شد» card: count the daily quest and award the star
      (≥ 2 of 3). The star is never taken away (v2.6.1 toggled it OFF on a replay). */
  function onLessonDone() {
    var lf = lessonFlow;
    if (!lf || lf.doneCounted) return;
    lf.doneCounted = true;
    var st = window.FGStore.getState();
    if (!lf.questCounted) {                       // the daily quest counts a lesson once per visit, not per round
      lf.questCounted = true;
      window.FGStore.syncDailyQuestsRollover();
      st.dailyQuests.lessonsRead = (st.dailyQuests.lessonsRead || 0) + 1;
    }
    var key = lf.gradeId + '_' + lf.lesson.id;
    var total = practiceTotal();
    /* v2.10.0 (Phase 4.1): stars = correct answers of the round's 3 questions (scaled if a lesson has
       fewer); ≥ 2 stars = passed (the same «2 of 3» rule as the old single star); the best is kept */
    var stars = total ? Math.round(3 * lf.practiceCorrect / total) : 3;
    var nx = nextLessonOf(lf.gradeId, lf.lesson.id);
    var nxBefore = nx ? journeyEntry(lf.gradeId, nx.id) : null;
    var r = window.FGStore.recordLessonStars(lf.gradeId, lf.lesson.id, stars);
    lf.roundStars = stars;
    lf.earned = stars >= window.FGStore.PASS_STARS;
    lf.newStar = r.improved;
    lf.unlockedNext = !!(nx && nxBefore && nxBefore.state === 'locked' && r.passed);
    if (r.newlyPassed) window.FGStore.addReward(15, 0);
    if (r.improved || lf.unlockedNext) pathCelebrate = { key: key, unlockedKey: lf.unlockedNext ? lf.gradeId + '_' + nx.id : '' };
    window.FGStore.saveState();
    refreshHeaderHud();
    if (r.improved && lf.earned) {
      sh(stars === 3 ? 'fanfare' : 'star');
      if (window.FGMascot) window.FGMascot.confetti(document.getElementById('confetti-layer'), stars === 3 ? 30 : 22);
    } else {
      sh(lf.earned ? 'star' : 'pop');
    }
  }

  var pausedFlow = null;
  /** ✕ / back inside a lesson: remember where the learner was, then leave. */
  function pauseLesson() {
    var lf = lessonFlow;
    var keep = lf && lf.idx > 0 && lf.cards[lf.idx] && lf.cards[lf.idx].type !== 'done' ? lf : null;
    closeLesson();
    pausedFlow = keep;
  }
  function closeLesson() {
    hideToast();
    lessonFlow = null;
    document.body.classList.remove('lesson-open');
    pathScrollPending = true;
    renderPath();
  }

  /** Leave the lesson and jump to another tab (used by the «برو تمرین» button). */
  function finishLessonGo(tab) {
    closeLesson();
    switchTab(tab);
  }

  /** «یک دور دیگر»: the next three items of the same lesson, fresh start. */
  function retryLessonPractice() {
    var lf = lessonFlow;
    if (!lf) return;
    var pIdx = -1;
    for (var i = 0; i < lf.cards.length; i++) if (lf.cards[i].type === 'practice') pIdx = i;
    if (pIdx < 0) { closeLesson(); return; }
    lf.round += 1;
    var px = composeLessonPractice(lf.gradeId, lf.lesson.id, lf.seen);
    lf.cards[pIdx].items = px.items;
    lf.cards[pIdx].kinds = px.kinds;
    lf.autoPlayed = false;
    lf.idx = pIdx;
    lf.practiceIdx = 0;
    lf.practiceAnswered = false;
    lf.practicePicked = null;
    lf.practiceOrder = null;
    lf.practiceCorrect = 0;
    lf.doneCounted = false;
    sh('tap');
    renderLessonCard();
  }

  function nextLessonCard() {
    if (!lessonFlow) return;
    hideToast();
    var lf = lessonFlow;
    var card = lf.cards[lf.idx];
    /* a question must be answered before the card can be left */
    if (card.type === 'practice' && !lf.practiceAnswered) return;
    if (card.type === 'discovery' && !lf.discoveryDone) return;
    if (card.type === 'practice' && lf.practiceIdx + 1 < card.items.length) {
      lf.practiceIdx += 1;
      lf.practiceAnswered = false;
      lf.practicePicked = null;
      lf.practiceOrder = null;
      lf.autoPlayed = false;
      sh('tap');
      renderLessonCard();
      return;
    }
    if (card.type === 'done' || lf.idx >= lf.cards.length - 1) {
      closeLesson();
      return;
    }
    lf.idx += 1;
    lf.practiceIdx = 0;
    lf.practiceAnswered = false;
    lf.practicePicked = null;
    lf.practiceOrder = null;
    lf.autoPlayed = false;
    if (lf.cards[lf.idx].type === 'discovery') { lf.discoveryDone = false; lf.discoveryPicked = null; }   /* v2.15.0: a lesson may have two discovery cards */
    if (lf.cards[lf.idx].type === 'done') onLessonDone();
    else sh('tap');
    renderLessonCard();
    var stage = document.getElementById('lesson-stage');
    if (stage) stage.scrollTop = 0;
  }

  /** Every answer counts for the daily quest «۸ سؤال جواب بده» and the stats. */
  function countAnswer(correct) {
    var st = window.FGStore.getState();
    st.stats.totalAnswered = (st.stats.totalAnswered || 0) + 1;
    if (correct) st.stats.totalCorrect = (st.stats.totalCorrect || 0) + 1;
    window.FGStore.syncDailyQuestsRollover();
    st.dailyQuests.answered = (st.dailyQuests.answered || 0) + 1;
  }

  function answerDiscovery(oi) {
    if (!lessonFlow) return;
    var card = lessonFlow.cards[lessonFlow.idx];
    if (card.type !== 'discovery' || lessonFlow.discoveryDone) return;
    lessonFlow.discoveryDone = true;
    lessonFlow.discoveryPicked = oi;
    var correct = oi === card.correctIdx;
    lessonFlow.verdictHead = correct ? cheer() : encourage();
    if (correct) {
      sh('correct');
      window.FGStore.addReward(5, 0);
    } else {
      sh('wrong');
    }
    var st = window.FGStore.getState();
    st.discoveredLessons[lessonFlow.gradeId + '_' + lessonFlow.lesson.id] = true;
    window.FGStore.saveState();
    refreshHeaderHud();
    renderLessonCard();
  }

  /* legacy alias: the old dashboard answered the discovery question here */
  function answerDiscoveryLegacy(oi) { answerDiscovery(oi); }

  function answerLessonPractice(opt) {
    if (!lessonFlow) return;
    var card = lessonFlow.cards[lessonFlow.idx];
    if (card.type !== 'practice' || lessonFlow.practiceAnswered) return;
    var it = card.items[lessonFlow.practiceIdx];
    var kind = (card.kinds || [])[lessonFlow.practiceIdx] || 'cloze';
    lessonFlow.practiceAnswered = true;
    lessonFlow.practicePicked = opt;
    var correct = opt === (kind === 'cloze' ? it.target : it.sentence);
    lessonFlow.verdictHead = correct ? cheer() : encourage();
    if (correct) {
      lessonFlow.practiceCorrect += 1;
      sh('correct');
      window.FGStore.addReward(10, 0);
      if (window.FGMascot) window.FGMascot.confetti(document.getElementById('confetti-layer'), 18);
      floatXp('+۱۰');
    } else {
      sh('wrong');
      window.FGStore.addItemToSrs(it.id, true);
    }
    countAnswer(correct);
    window.FGStore.recordRuleOutcome(it.ruleTag, correct);
    window.FGStore.saveState();
    refreshHeaderHud();
    renderLessonCard();
  }

  function floatXp(txt) {
    var layer = document.getElementById('confetti-layer');
    if (!layer) return;
    var d = document.createElement('div');
    d.className = 'xp-float';
    d.textContent = txt;
    d.style.top = '42%';
    d.style.right = '46%';
    layer.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 950);
  }

  /* ================================================ PRACTICE (تمرین) */
  function renderPractice() {
    var host = document.getElementById('practice-container');
    if (!host) return;
    var st = window.FGStore.getState();
    var dueIds = window.FGStore.getDueSrsIds(null);
    var mistakes = dueIds.filter(function (id) { return st.srs[id] && st.srs[id].isMistake; });
    var weak = window.FGStore.getWeakRules(3);
    var meta = gradeMeta(st.selectedGrade);

    var games = [
      { id: 'cloze', ico: ICON.target, t: 'جای خالی', s: 'گزینهٔ درست را پیدا کن' },
      { id: 'pickright', ico: ICON.check, t: 'کدام درست است؟', s: 'جملهٔ درست را پیدا کن' },
      { id: 'listen', ico: ICON.sound, t: 'شنیدن و انتخاب', s: 'گوش کن، همان را بزن' },
      { id: 'unscramble', ico: ICON.puzzle, t: 'جمله‌ساز', s: 'کلمه‌ها را به ترتیب بزن' },
      { id: 'typing', ico: ICON.pen, t: 'تایپ جای خالی', s: '۱ یا ۲ کلمه بنویس' },
      { id: 'error', ico: ICON.hunt, t: 'شکار خطا', s: 'تکهٔ خراب را پیدا کن' },
      { id: 'match', ico: ICON.link, t: 'جفت‌یابی', s: 'قاعده را وصل کن' },
      { id: 'transform', ico: ICON.rotate, t: 'تبدیل جمله', s: 'جمله را بازنویسی کن' },
      { id: 'traps', ico: ICON.hunt, t: 'دام‌های امتحانی', s: 'جملهٔ درست را از دام پیدا کن' },
      { id: 'blitz', ico: ICON.clock, t: '۳۰ ثانیه', s: 'سرعت گرامر' }
    ];
    var curLid = st.selectedLessonByGrade[st.selectedGrade] || 1;

    /* v2.13: the final exam is no longer the first (and darkest) thing a newcomer sees, and a
       learner who never took it reads an invitation instead of «بهترین شما: ۰» */
    var bestExam = st.stats.bestExamScore20 || 0;
    var examCard =
      '<button class="exam-card" onclick="FG_Games.startMode(\'exam_sim\')">' +
        '<span style="flex:1;">' +
          '<span class="e-t">آزمون نهایی</span>' +
          '<span class="e-s">' + (bestExam
            ? '۱۰ سؤال ترکیبی، بهترین نمره‌ات: ' + faNum(bestExam) + ' از ۲۰'
            : '۱۰ سؤال ترکیبی، نمره از ۲۰؛ هر وقت آماده بودی') + '</span>' +
        '</span>' +
        '<span style="width:34px;height:34px;border-radius:12px;background:rgba(255,255,255,.16);display:grid;place-items:center;">' + ICON.trophy + '</span>' +
      '</button>';

    host.innerHTML =
      // the one primary action of this screen — it ALWAYS opens a real question
      '<div class="card" style="display:flex;align-items:center;gap:12px;">' +
        '<div class="g-ico" style="width:44px;height:44px;border-radius:14px;background:var(--brand-50);display:grid;place-items:center;flex:0 0 44px;">' + ICON.bolt + '</div>' +
        '<div class="grow">' +
          '<div style="font-size:15px;font-weight:800;">شروع سریع</div>' +
          '<div style="font-size:12.5px;color:var(--ink-2);">' +
            '۵ سؤال کوتاه، زیر ۳ دقیقه' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" onclick="FG_Games.startMode(\'quick\')">' + ICON.play + ' شروع</button>' +
      '</div>' +

      '<button class="list-row" onclick="FGApp.startSmartReview()">' +
        '<span class="g-ico" style="width:36px;height:36px;border-radius:12px;background:var(--surface-3);display:grid;place-items:center;color:var(--ink-2);">' + ICON.rotate + '</span>' +
        '<span class="grow">' +
          '<span class="lr-title">مرور هوشمند</span>' +
          '<span class="lr-sub">' +
            reviewRowSub(dueIds.length, Object.keys(st.srs || {}).length, window.FGStore.countSrsDueTomorrow()) +
          '</span>' +
        '</span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span>' +
      '</button>' +

      '<button class="list-row" onclick="FGApp.practiceLessonMix()">' +
        '<span class="g-ico" style="width:36px;height:36px;border-radius:12px;background:var(--brand-50);display:grid;place-items:center;color:var(--brand-700);">' + ICON.puzzle + '</span>' +
        '<span class="grow">' +
          '<span class="lr-title">تمرین ترکیبی همین درس</span>' +
          '<span class="lr-sub">درس ' + faNum(curLid) + '، ۸ سؤال، چند نوع تمرین</span>' +
        '</span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span>' +
      '</button>' +

      (mistakes.length ?
        '<button class="list-row" onclick="FGApp.openMistakeClinic()">' +
          '<span class="g-ico" style="width:36px;height:36px;border-radius:12px;background:var(--danger-100);display:grid;place-items:center;color:var(--danger);">' + ICON.heart + '</span>' +
          '<span class="grow"><span class="lr-title">اشتباهاتم</span>' +
          '<span class="lr-sub">' + faNum(mistakes.length) + ' مورد برای مرور دوباره</span></span>' +
        '</button>' : '') +

      /* v2.11 (Phase 5.1): the rules the learner's OWN answers show as not settled yet.
         Kind title (no «weak»), growth bar = right answers among the last ones (brand color,
         never a red error rate), one secondary «تمرین همین قاعده» per rule. */
      (weak.length ?
        '<div class="card rules-card">' +
          '<div class="card-title" style="font-size:15px;">' + (weak.length > 1 ? faNum(weak.length) + ' قاعده که هنوز جا نیفتاده‌اند' : 'قاعده‌ای که هنوز جا نیفتاده') + '</div>' +
          '<div class="card-sub" style="font-size:12px;">از روی جواب‌های خودت؛ با چند سؤال کوتاه جا می‌افتند.</div>' +
          weak.map(function (r) {
            var pct = Math.round((r.recentCorrect / Math.max(1, r.recentN)) * 100);
            return '<div class="rule-row">' +
              '<div class="grow">' +
                '<div class="rule-name">' + mixed(r.labelFa || r.familyId) + '</div>' +
                '<div class="progress rule-meter" role="img" aria-label="' + faNum(r.recentCorrect) + ' از ' + faNum(r.recentN) + ' جواب آخر درست"><i style="width:' + pct + '%;"></i></div>' +
                '<div class="rule-meta">' + faNum(r.recentCorrect) + ' از ' + faNum(r.recentN) + ' جواب آخر درست</div>' +
              '</div>' +
              '<button class="btn btn-secondary btn-sm" onclick="FGApp.practiceWeakRule(' + JSON.stringify(r.familyId || r.ruleTag).replace(/"/g, '&quot;') + ')">تمرین همین قاعده</button>' +
            '</div>';
          }).join('') + '</div>' : '') +

      examCard +

      '<div class="section-head">بازی‌های کوتاه</div>' +
      '<div class="game-grid">' +
        games.map(function (g) {
          return '<button class="game-card" onclick="FG_Games.startMode(\'' + g.id + '\')">' +
            '<span class="g-ico">' + g.ico + '</span>' +
            '<span class="g-t">' + esc(g.t) + '</span>' +
            '<span class="g-s">' + esc(g.s) + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +

      '<div class="section-head">ابزارهای کمکی</div>' +
      '<div class="game-grid">' +
        '<button class="game-card" onclick="FGApp.openPlacementChooser()">' +
          '<span class="g-ico">' + ICON.flask + '</span><span class="g-t">تعیین سطح</span><span class="g-s">۱۰ سؤال کوتاه</span></button>' +
        '<button class="game-card" onclick="FGApp.launchQuickMode(\'exam_sim\')">' +
          '<span class="g-ico">' + ICON.trophy + '</span><span class="g-t">آزمون نهایی</span><span class="g-s">نمره از ۲۰</span></button>' +
        '<button class="game-card" onclick="FGApp.openClassMode()">' +
          '<span class="g-ico">' + ICON.users + '</span><span class="g-t">حالت کلاس</span><span class="g-s">کد یا فایل تکلیف معلم</span></button>' +
        '<button class="game-card" onclick="FGApp.openShareCard()">' +
          '<span class="g-ico">' + ICON.share + '</span><span class="g-t">کارت پیشرفت</span><span class="g-s">تصویر برای دوستانت</span></button>' +
      '</div>';
    applyA11y(host);
  }

  /* ---------------------------------------------------------------- search */
  var bankLimit = 8;

  function renderBankResults() {
    var host = document.getElementById('bank-results');
    if (!host) return;
    var st = window.FGStore.getState();
    var q = bankSearchQuery.trim().toLowerCase();
    // Idle: the list stays collapsed so the "من" tab stays short and calm.
    if (!q && !bankFilterOnlyStarred) {
      host.innerHTML = '<div class="read-more" style="margin-top:10px;text-align:center;font-size:12.5px;">' +
        'هر ۴۸۰ جملهٔ کتاب اینجا قابل جست‌وجو است. بنویس تا نتیجه بیاید.</div>';
      return;
    }
    var list = [];
    GRADE_ORDER.forEach(function (gid) {
      var gr = window.GRAMMAR_CURRICULUM[gid];
      if (!gr) return;
      gr.items.forEach(function (it) {
        if (bankFilterOnlyStarred && !st.bookmarks[it.id] && !(st.notes[it.id] || '').trim()) return;
        if (q) {
          var hay = (it.sentence + ' ' + it.ruleTag + ' ' + it.fa + ' ' + it.explainFa + ' ' + (st.notes[it.id] || '')).toLowerCase();
          if (hay.indexOf(q) === -1) return;
        }
        list.push({ it: it, gr: gr });
      });
    });
    if (!list.length) {
      host.innerHTML = '<div class="empty-state">' +
        (window.FGMascot ? window.FGMascot.svg('think', 76) : '') +
        '<div style="font-size:13px;">چیزی پیدا نشد. عبارت دیگری را امتحان کن.</div></div>';
      return;
    }
    var shown = list.slice(0, bankLimit);
    host.innerHTML = shown.map(function (row) {
      var it = row.it;
      var starred = !!st.bookmarks[it.id];
      var note = (st.notes[it.id] || '').trim();
      return '<div class="list-row" style="align-items:flex-start;">' +
        '<div class="grow">' +
          '<div class="ltr-block" style="font-size:13.5px;padding:8px 10px;">' + esc(it.sentence) + '</div>' +
          '<div class="lr-sub" style="margin-top:4px;">' + mixed(it.fa) + '</div>' +
          (note ? '<div class="chip warn" style="margin-top:6px;">📝 ' + esc(note) + '</div>' : '') +
          '<div class="row" style="gap:6px;margin-top:8px;">' +
            '<button class="btn btn-secondary btn-sm" onclick="FGStore.speakEnglish(' + JSON.stringify(it.sentence).replace(/"/g, '&quot;') + ')" aria-label="شنیدن جمله">🔊</button>' +
            '<button class="btn btn-secondary btn-sm" onclick="FGApp.toggleBookmark(\'' + it.id + '\')" aria-label="نشان کردن">' + (starred ? '⭐' : '☆') + '</button>' +
            '<button class="btn btn-secondary btn-sm" onclick="FGApp.openNoteModal(\'' + it.id + '\')" aria-label="یادداشت">📝</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('') +
    (list.length > shown.length
      ? '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FGApp.showMoreResults()">نمایش ' +
          faNum(Math.min(bankLimit + 8, list.length) - shown.length) + ' مورد دیگر</button>'
      : '');
  }

  /** Phase 4.3 — «چند کارت فردا؟» on the practice tab. */
  function reviewRowSub(due, all, tomorrow) {
    if (due) return faNum(due) + ' کارت آمادهٔ مرور، فردا ' + faNum(tomorrow);
    if (all) return 'امروز کارتی نمانده، فردا ' + faNum(tomorrow) + ' کارت';
    return 'هنوز کارت مرور نداری — با بازی‌ها ساخته می‌شود';
  }
  var reviewSessionDone = 0;

  /* ------------------------------------------------- smart review card */
  function startSmartReview() {
    var ids = window.FGStore.getDueSrsIds(null);
    if (!ids.length) {
      // no card due → never leave the student at a dead end.
      // fall back to a quick mixed session so a question opens anyway.
      sh('tap');
      if (window.FG_Games && window.FG_Games.startQuickSession) {
        window.FG_Games.startQuickSession(5);
        showToast('🌱 کارت مرور نداری؛ یک دور کوتاه برایت چیدیم.');
        return;
      }
      showToast('🌱 با یک بازی کوتاه تمرین کن!');
      return;
    }
    var id = ids[0];
    var entry = itemById(id);
    if (!entry) { if (window.FG_Games && window.FG_Games.startQuickSession) return window.FG_Games.startQuickSession(5); return; }
    reviewSessionDone = 0;
    leitnerState = {
      id: id, item: entry.item,
      opts: (entry.item.options || []).slice().sort(function () { return Math.random() - 0.5; }),
      revealed: false, picked: null
    };
    switchTab('practice');
    renderSmartReview();
  }

  function itemById(id) {
    var out = null;
    GRADE_ORDER.forEach(function (gid) {
      var g = window.GRAMMAR_CURRICULUM[gid];
      if (!g) return;
      (g.items || []).forEach(function (it) {
        if (it.id === id) out = { item: it, gradeId: gid };
      });
    });
    return out;
  }

  function renderSmartReview() {
    var host = document.getElementById('practice-container');
    if (!host || !leitnerState) return;
    var lr = leitnerState;
    var it = lr.item;
    var opts = lr.opts.map(function (o) {
      var cls = 'option-btn';
      if (lr.revealed) {
        if (o === it.target) cls += ' correct';
        else if (o === lr.picked) cls += ' wrong';
        else cls += ' dim collapsed';   /* v2.13: like the lessons — the right answer stays visible above the panel */
      }
      return '<button class="' + cls + '" ' + (lr.revealed ? 'disabled' : '') +
        ' onclick="FGApp.guessLeitnerOption(' + JSON.stringify(o).replace(/"/g, '&quot;') + ')">' +
        '<span class="grow">' + en(o) + '</span></button>';
    }).join('');

    var left = window.FGStore.getDueSrsIds(null).length;
    var pctR = Math.max(6, Math.round(100 * reviewSessionDone / Math.max(1, reviewSessionDone + left)));
    var tom = window.FGStore.countSrsDueTomorrow();
    var srsCard = (window.FGStore.getState().srs || {})[lr.id];
    var isNewCard = !srsCard || srsCard.stage === 'new';
    /* v2.13: the four self-ratings explain themselves — when the card comes back — and the
       sensible one is the screen's single primary («خوب» after a right answer, «دوباره» after a slip) */
    var gaps = lr.revealed && window.FGStore.previewSrsIntervals ? window.FGStore.previewSrsIntervals(lr.id) : null;
    var suggest = lr.picked === it.target ? 3 : 1;
    host.innerHTML =
      '<div class="arena">' +
        '<div class="arena-top">' +
          '<button class="icon-btn" onclick="FGApp.closeSmartReview()" aria-label="بستن مرور">' + ICON.back + '</button>' +
          '<div class="progress" role="progressbar" aria-label="پیشرفت مرور امروز" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pctR + '"><i style="width:' + pctR + '%"></i></div>' +
          '<span class="chip">فردا: ' + faNum(tom) + ' کارت</span>' +
        '</div>' +
        '<div class="arena-body">' +
          (lr.revealed ? '' : '<div class="srs-why">' + (isNewCard
            ? '🌱 کارت تازه از درس‌ها؛ یک مرور کوتاه کمک می‌کند در یادت بماند.'
            : '🧠 این کارت‌ها دارند از یادت می‌روند؛ حالا مرورشان می‌کنی تا بمانند.') + '</div>') +
          '<div class="question-en ltr-block">' + esc(it.cloze || it.sentence) + '</div>' +
          '<div class="option-list">' + opts + '</div>' +
          (lr.revealed ? '<div class="fb-spacer" aria-hidden="true"></div>' : '') +
        '</div>' +
        (lr.revealed ?
          '<div class="feedback-panel ' + (lr.picked === it.target ? 'ok' : 'no') + '">' +
            '<div class="feedback-head">' +
              (window.FGMascot ? window.FGMascot.svg(lr.picked === it.target ? 'happy' : 'oops', 64) : '') +
              '<span>' + esc(lr.head || (lr.picked === it.target ? cheer() : encourage())) + '</span>' +
            '</div>' +
            '<div class="feedback-body">' + mixed(it.explainFa) + '</div>' +
            '<div class="srs-ask">چقدر راحت یادت بود؟</div>' +
            '<div class="row srs-rates" style="gap:8px;">' +
              [1, 2, 3, 4].map(function (q) {
                var labels = { 1: 'دوباره', 2: 'سخت', 3: 'خوب', 4: 'آسان' };
                var gap = gaps ? humanGap(gaps[q - 1]) : '';
                return '<button class="btn ' + (q === suggest ? 'btn-primary' : 'btn-secondary') + ' btn-sm srs-rate" style="flex:1;" onclick="FGApp.rateLeitner(' + q + ')"' +
                  ' aria-label="' + labels[q] + (gap ? '؛ دوباره می‌بینی: ' + gap + ' دیگر' : '') + '">' +
                  '<span class="sr-l">' + labels[q] + '</span>' + (gap ? '<span class="sr-i">' + gap + '</span>' : '') + '</button>';
              }).join('') +
            '</div>' +
          '</div>' : '') +
      '</div>';
    applyA11y(host);
    if (window.FG_Games && window.FG_Games.fitFeedback) window.FG_Games.fitFeedback(host);
    /* v2.13: a long sentence + the taller rating panel could hide the RIGHT option under the
       sticky panel (360×640) — scroll just enough to show it, after the panel has slid up */
    if (lr.revealed) setTimeout(function () { revealAboveFeedback(host); }, 320);
  }
  function revealAboveFeedback(host) {
    /* one shared helper (games.js): spacer + scroll so the right option sits above the panel */
    if (window.FG_Games && window.FG_Games.revealAbovePanel) window.FG_Games.revealAbovePanel(host, host.querySelector('.feedback-panel'));
  }

  /** ms → «۱۰ دقیقه» / «۳ ساعت» / «۴ روز» / «۲ ماه» */
  function humanGap(ms) {
    var min = Math.max(1, Math.round((ms || 0) / 60000));
    if (min < 60) return faNum(min) + ' دقیقه';
    var h = Math.round(min / 60);
    if (h < 24) return faNum(h) + ' ساعت';
    var d = Math.round(h / 24);
    if (d < 45) return faNum(d) + ' روز';
    return faNum(Math.round(d / 30)) + ' ماه';
  }

  function guessLeitnerOption(opt) {
    if (!leitnerState || leitnerState.revealed) return;
    leitnerState.picked = opt;
    leitnerState.revealed = true;
    var ok = opt === leitnerState.item.target;
    leitnerState.head = ok ? cheer() : encourage();
    countAnswer(ok);
    if (ok) { sh('correct'); window.FGStore.addReward(10, 0); }
    else { sh('wrong'); window.FGStore.addItemToSrs(leitnerState.id, true); }
    window.FGStore.recordRuleOutcome(leitnerState.item.ruleTag, ok);
    renderSmartReview();
  }

  function revealLeitnerCard() {
    if (!leitnerState) return;
    leitnerState.revealed = true;
    renderSmartReview();
  }

  function rateLeitner(quality) {
    if (!leitnerState) return;
    window.FGStore.rateSrsCard(leitnerState.id, quality);
    reviewSessionDone += 1;
    sh(quality >= 3 ? 'correct' : 'tap');
    var next = window.FGStore.getDueSrsIds(null);
    if (next.length) {
      var entry = itemById(next[0]);
      if (entry) {
        leitnerState = {
          id: next[0], item: entry.item,
          opts: (entry.item.options || []).slice().sort(function () { return Math.random() - 0.5; }),
          revealed: false, picked: null
        };
        renderSmartReview();
        return;
      }
    }
    closeSmartReview();
    var tomEnd = window.FGStore.countSrsDueTomorrow();
    showToast('🌱 مرور امروز تمام شد. آفرین!' + (tomEnd ? ' فردا ' + faNum(tomEnd) + ' کارت منتظر توست.' : ''));
  }

  function closeSmartReview() {
    leitnerState = null;
    renderPractice();
  }

  function openMistakeClinic() {
    var ids = window.FGStore.getDueSrsIds('mistake');
    if (!ids.length) {
      showToast('🎉 اشتباهی ثبت نشده!');
      return;
    }
    startSmartReview();
  }

  /* ================================================== REWARDS (جوایز) */
  function renderRewards() {
    var host = document.getElementById('rewards-container');
    if (!host) return;
    var st = window.FGStore.getState();
    var rank = window.FGStore.getAcademicRank(st.xp);
    var days7 = window.FGStore.getLast7DaysMeta();
    var dq = st.dailyQuests || { answered: 0, srsDone: 0, lessonsRead: 0, chestClaimed: false };
    var qt = questTargets(st.dailyGoalMin);
    var quests = [
      { t: faNum(qt.answered) + ' سؤال جواب بده', c: Math.min(qt.answered, dq.answered), m: qt.answered },
      { t: '۳ کارت مرور کن', c: Math.min(qt.srsDone, dq.srsDone), m: qt.srsDone },
      { t: 'یک درس را ببین', c: Math.min(qt.lessonsRead, dq.lessonsRead), m: qt.lessonsRead }
    ];
    var allDone = quests.every(function (q) { return q.c >= q.m; });

    host.innerHTML =
      '<div class="card" style="text-align:center;">' +
        '<div style="display:grid;place-items:center;margin-bottom:6px;">' + (window.FGMascot ? window.FGMascot.svg(allDone ? 'cheer' : 'normal', 104) : '') + '</div>' +
        '<div style="font-size:17px;font-weight:800;">' + esc(rank.titleFa) + '</div>' +
        '<div style="font-size:12.5px;color:var(--ink-2);margin-bottom:10px;">' + mixed('تا رتبهٔ بعدی ' + faNum(Math.max(0, rank.nextXp - (st.xp || 0))) + ' XP') + '</div>' +
        '<div class="progress accent"><i style="width:' + Math.min(100, Math.round((st.xp || 0) / rank.nextXp * 100)) + '%"></i></div>' +
        '<div class="stat-row" style="margin-top:12px;">' +
          '<div class="stat-box"><div class="stat-num">' + faNum(st.streak || 0) + '</div><div class="stat-lbl">روز پیاپی</div></div>' +
          '<div class="stat-box"><div class="stat-num">' + faNum(st.bestStreak || 0) + '</div><div class="stat-lbl">بهترین رکورد</div></div>' +
          '<div class="stat-box"><div class="stat-num">' + faNum(st.coins || 0) + '</div><div class="stat-lbl">سکه</div></div>' +
        '</div>' +
        '<button class="btn btn-secondary btn-sm share-progress-btn" onclick="FGApp.openShareCard()">' + ICON.share + ' اشتراک‌گذاری پیشرفت</button>' +
      '</div>' +

      '<div class="card">' +
        '<div class="row-between" style="margin-bottom:8px;">' +
          '<div class="card-title" style="font-size:16px;">مأموریت امروز</div>' +
          (dq.chestClaimed ? '<span class="chip brand">جوایز گرفته شد ✓</span>'
            : (allDone ? '<button class="btn btn-primary btn-sm" onclick="FGApp.claimDailyChest()">باز کن (+۲۰ سکه)</button>' : '<span class="chip">در حال انجام</span>')) +
        '</div>' +
        '<div class="card-sub" style="font-size:12px;margin:-4px 0 10px;">حلقهٔ «هدف امروز» در صفحهٔ مسیر با همین سه کار پر می‌شود.</div>' +
        quests.map(function (q) {
          var pct = Math.round(q.c / q.m * 100);
          return '<div style="margin-bottom:8px;">' +
            '<div class="row-between" style="font-size:13px;font-weight:700;"><span>' + (q.c >= q.m ? '✅ ' : '⬜ ') + esc(q.t) + '</span><span>' + faNum(q.c) + '/' + faNum(q.m) + '</span></div>' +
            '<div class="progress"><i style="width:' + pct + '%;"></i></div>' +
          '</div>';
        }).join('') +
      '</div>' +

      '<div class="card">' +
        '<div class="card-title" style="font-size:16px;margin-bottom:8px;">این هفته</div>' +
        '<div class="week-strip">' + days7.map(function (d) {
          var mark = st.activeDays[d.key];
          return '<div class="day-cell' + (mark ? ' done' : '') + (d.isToday ? ' today' : '') + '">' +
            '<div>' + d.wday + '</div><div>' + d.jday + '</div><div>' + (mark === 'frozen' ? '❄️' : (mark ? '✓' : '<span class="day-none" aria-label="بدون تمرین"></span>')) + '</div></div>';   /* v2.13: «•» under a date read as «۰» */
        }).join('') + '</div>' +
      '</div>' +

      '<div class="section-head">نشان‌ها</div>' +
      '<div class="card">' +
        window.FGStore.ACHIEVEMENTS.map(function (ac) {
          var val = window.FGStore.getComputedAchievementValue(ac.field);
          var tier = 0;
          for (var i = 0; i < ac.tiers.length; i++) if (val >= ac.tiers[i]) tier = i + 1;
          var nextGoal = ac.tiers[Math.min(3, tier)];
          var pct = Math.min(100, Math.round(val / nextGoal * 100));
          var tierNames = ['—', '🥉 برنز', '🥈 نقره', '🥇 طلا', '💎 الماس'];
          return '<div class="ach-card">' +
            '<div class="ach-icon">' + ICON.star + '</div>' +
            '<div class="grow">' +
              '<div class="row-between" style="font-size:13.5px;font-weight:800;"><span>' + esc(ac.titleFa) + '</span><span style="color:var(--brand-primary);">' + tierNames[tier] + '</span></div>' +
              '<div style="font-size:12px;color:var(--ink-2);">' + mixed(ac.descFa + ' (' + faNum(val) + '/' + faNum(nextGoal) + ')') + '</div>' +
              '<div class="progress" style="height:6px;margin-top:5px;"><i style="width:' + pct + '%;"></i></div>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +

      '<div class="section-head">تم‌ها</div>' +
      '<div class="theme-grid">' +
        '<button class="theme-card' + (st.theme === 'auto' ? ' active' : '') + '" onclick="FGApp.selectOrBuyTheme(\'auto\')" style="cursor:pointer;text-align:start;">' +
          /* fixed swatches on purpose: they preview «light + dark», whatever theme is active */
          '<div class="swatches"><span class="swatch-dot" style="background:#F3F8F6;"></span><span class="swatch-dot" style="background:#0B1120;"></span></div>' +
          '<div style="font-size:13px;font-weight:800;">🌗 هماهنگ با گوشی</div>' +
          '<div class="th-state">' + (st.theme === 'auto' ? '✓ فعال' : 'روشن یا تاریک، مثل گوشی') + '</div>' +
        '</button>' +
        window.FGStore.THEMES.map(function (th) {
          var unlocked = st.unlockedThemes.indexOf(th.id) !== -1 || th.cost === 0 && !th.prestigeLessons;
          var isAct = st.theme === th.id;
          /* v2.14: states read at a glance; a price always shows the coin (like the header) */
          var label;
          if (isAct) label = '<span class="th-on">✓ فعال</span>';
          else if (unlocked) label = esc(th.rarityFa) + '، انتخاب کن';
          else if (th.prestigeLessons) label = '🏅 با ' + faNum(th.prestigeLessons) + ' درس کامل';
          else label = esc(th.rarityFa) + '، <span class="th-price' + ((st.coins || 0) < th.cost ? ' short' : '') + '">' + faNum(th.cost) + ICON.coin + '</span>' +
            ((st.coins || 0) < th.cost ? ' <span class="th-short">سکه کم است</span>' : '');
          return '<button class="theme-card' + (isAct ? ' active' : '') + '" onclick="FGApp.selectOrBuyTheme(\'' + th.id + '\')" style="cursor:pointer;text-align:start;"' +
              ' aria-label="' + esc(th.nameFa) + (isAct ? '، فعال' : (unlocked ? '' : (th.prestigeLessons ? '' : '، ' + faNum(th.cost) + ' سکه'))) + '">' +
            '<div class="swatches">' + th.colors.map(function (c) { return '<span class="swatch-dot" style="background:' + c + ';"></span>'; }).join('') + '</div>' +
            '<div style="font-size:13px;font-weight:800;">' + esc(th.nameFa) + '</div>' +
            '<div class="th-state">' + label + '</div>' +
          '</button>';
        }).join('') +
      '</div>' +

      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-sub" style="font-size:12.5px;margin-bottom:10px;">اگر یک روز نتوانستی تمرین کنی، سپر یخی نمی‌گذارد «روز پیاپی»‌ات صفر شود.' +
          ((st.streakFreezes || 0) ? ' الان ' + faNum(st.streakFreezes) + ' سپر داری.' : '') + '</div>' +
        '<button class="btn btn-secondary" onclick="FGApp.buyStreakFreeze()" aria-label="خرید سپر یخی، ۲۵ سکه">❄️ سپر یخی <span class="th-price">۲۵' + ICON.coin + '</span></button>' +
      '</div>';
    applyA11y(host);
  }

  /* ======================================================= ME (من) */
  function renderMe() {
    var host = document.getElementById('me-container');
    if (!host) return;
    var st = window.FGStore.getState();
    var fa2 = faNum;

    host.innerHTML =
      '<div class="card">' +
        '<div class="row-between" style="margin-bottom:10px;">' +
          '<div class="card-title" style="font-size:16px;">آمار من</div>' +
          '<span class="chip brand">' + esc(gradeMeta(st.selectedGrade).fa) + '</span>' +
        '</div>' +
        '<div class="stat-row">' +
          '<div class="stat-box"><div class="stat-num">' + fa2(st.stats.totalAnswered || 0) + '</div><div class="stat-lbl">جواب داده‌ام</div></div>' +
          '<div class="stat-box"><div class="stat-num">' + fa2(st.stats.totalCorrect || 0) + '</div><div class="stat-lbl">جواب درست</div></div>' +
          '<div class="stat-box"><div class="stat-num">' + fa2((st.stats.totalAnswered ? Math.round(st.stats.totalCorrect / st.stats.totalAnswered * 100) : 0)) + '٪</div><div class="stat-lbl">دقت</div></div>' +
        '</div>' +
      '</div>' +

      '<div class="section-head">یادداشت و جست‌وجو</div>' +
      '<div class="card">' +
        '<input type="search" class="search-input" placeholder="جست‌وجو در جمله‌ها و ترجمه‌ها…" value="' + esc(bankSearchQuery) + '" oninput="FGApp.onBankSearch(this.value)" />' +
        '<button class="btn btn-secondary btn-sm" style="margin-top:8px;" onclick="FGApp.toggleBankStarFilter()">' +
          (bankFilterOnlyStarred ? 'نمایش همه' : 'فقط نشان‌شده‌ها') +
        '</button>' +
        '<div id="bank-results"></div>' +
      '</div>' +

      '<div class="section-head">تنظیمات</div>' +
      '<div class="card">' +
        appearanceRowHtml(st) +
        '<div class="switch-row"><div><div style="font-weight:700;">صدا</div><div style="font-size:12px;color:var(--ink-2);">دکمه‌ها، جواب درست و غلط</div></div>' +
          '<button class="switch' + (st.soundOn ? ' on' : '') + '" role="switch" aria-checked="' + (st.soundOn ? 'true' : 'false') + '" aria-label="صدا" onclick="FGApp.toggleSound()"></button></div>' +
        volumeRowHtml(st) +
        '<div class="switch-row"><div><div style="font-weight:700;">لرزش</div><div style="font-size:12px;color:var(--ink-2);">بازخورد لمسی</div></div>' +
          '<button class="switch' + (st.vibrateOn ? ' on' : '') + '" role="switch" aria-checked="' + (st.vibrateOn ? 'true' : 'false') + '" aria-label="لرزش" onclick="FGApp.toggleVibration()"></button></div>' +
        '<div class="switch-row"><div><div style="font-weight:700;">لهجه</div><div style="font-size:12px;color:var(--ink-2);">' + en(st.accent) + '</div></div>' +
          '<button class="btn btn-secondary btn-sm" onclick="FGApp.toggleAccent()">تغییر</button></div>' +
        (ttsReadyNow() ? '' : '<button class="btn btn-ghost btn-sm tts-warn" onclick="FGApp.openTtsGuide()">🔈 صدای انگلیسی گوشی آماده نیست؛ راهنما ←</button>') +
        '<div class="switch-row"><div><div style="font-weight:700;">هدف روزانه</div><div style="font-size:12px;color:var(--ink-2);">' + fa2(st.dailyGoalMin || 5) + ' دقیقه</div></div>' +
          '<button class="btn btn-secondary btn-sm" onclick="FGApp.cycleDailyGoal()">تغییر</button></div>' +
      '</div>' +

      /* v2.13: the review-load numbers are a power-user tool — folded, not a dashboard */
      '<div class="card"><details class="more srs-adv"><summary>⚙️ تنظیمات پیشرفتهٔ مرور</summary>' + renderSrsSettings(fa2) + '</details></div>' +

      '<div class="section-head">پشتیبان</div>' +
      '<div class="card">' +
        '<button class="btn btn-secondary" onclick="FGApp.openBackupModal()">💾 پشتیبان‌گیری و بازیابی</button>' +
      '</div>' +

      '<div class="section-head" id="me-about">دربارهٔ برنامه</div>' +
      '<div class="card">' +
        '<div class="credits-card">' +
          '<div class="c-role">استاد راهنما و ناظر علمی</div>' +
          '<div class="c-name">دکتر احمدرضا اقتصادی رودی</div>' +
          '<div class="c-desc">عضو هیئت علمی دانشگاه فرهنگیان</div>' +
        '</div>' +
        '<div class="credits-card">' +
          '<div class="c-role">طراح و برنامه‌نویس</div>' +
          '<div class="c-name">علیرضا تقی‌زاده</div>' +
          '<div class="c-desc">دانشجوی دانشگاه فرهنگیان شهید بهشتی مشهد</div>' +
        '</div>' +
        '<div style="font-size:13px;font-weight:800;margin:12px 0 4px;">عنوان درس</div>' +
        '<div style="font-size:13px;color:var(--ink-2);">کاربرد رسانه و فناوری اطلاعات در آموزش زبان انگلیسی</div>' +
        '<div style="font-size:13px;font-weight:800;margin:14px 0 6px;">💬 پذیرای انتقادات و پیشنهادات شما هستیم</div>' +
        '<div class="row" style="gap:8px;">' +
          '<button type="button" class="btn btn-accent btn-sm" id="creator-telegram" onclick="FGApp.openTelegramSupport()" aria-label="گفت‌وگو در تلگرام با @TeachSpot">💬 تلگرام <bdi dir="ltr">@TeachSpot</bdi></button>' +
          '<button type="button" class="btn btn-secondary btn-sm" id="copy-creator-telegram" onclick="FGApp.copyTelegramSupport()">📋 کپی شناسه</button>' +
        '</div>' +
        '<button class="btn btn-ghost btn-sm" style="margin-top:10px;width:100%;" onclick="FGApp.openDeviceCheck()">📋 گزارش فنی و سنجش دستگاه</button>' +
        '<div style="font-size:12px;color:var(--ink-3);margin-top:8px;">' + mixed('FarhangGram v' + (window.FGStore.getAppVersion ? window.FGStore.getAppVersion() : '2.14.0')) + ' — کاملاً آفلاین</div>' +
      '</div>';
    renderBankResults();
    applyA11y(host);
  }

  function renderBankList() {
    renderBankResults();
    return '';
  }

  function renderSrsSettings(fa2) {
    var lim = window.FGStore.getSrsLimits();
    var c = window.FGStore.getSrsDailyCounters();
    var forecast = window.FGStore.getReviewForecast(7);
    var maxCount = 1;
    forecast.forEach(function (f) { if (f.count > maxCount) maxCount = f.count; });
    return '<div class="row" style="gap:8px;align-items:flex-end;">' +
        '<label style="flex:1;font-size:12px;font-weight:700;">کارت جدید در روز' +
          '<input type="number" inputmode="numeric" dir="ltr" min="0" max="100" id="srs-new-limit" class="search-input" style="margin-top:4px;" value="' + String(lim.newPerDay) + '" /></label>' +
        '<label style="flex:1;font-size:12px;font-weight:700;">مرور در روز' +
          '<input type="number" inputmode="numeric" dir="ltr" min="0" max="300" id="srs-reviews-limit" class="search-input" style="margin-top:4px;" value="' + String(lim.reviewsPerDay) + '" /></label>' +
      '</div>' +
      '<button class="btn btn-secondary btn-sm" style="margin-top:10px;" onclick="FGApp.saveSrsLimits()">ذخیره</button>' +
      '<div style="font-size:12px;color:var(--ink-2);margin:10px 0 6px;">امروز: ' + fa2(c.newDone) + ' جدید، ' + fa2(c.reviewsDone) + ' مرور</div>' +
      forecast.map(function (f) {
        var pct = Math.round((f.count / maxCount) * 100);
        return '<div style="margin-bottom:6px;">' +
          '<div class="row-between" style="font-size:12px;font-weight:700;"><span>' + (f.isToday ? 'امروز، ' : '') + esc(f.dayLabelFa) + '</span><span>' + fa2(f.count) + ' کارت</span></div>' +
          '<div class="progress" style="height:6px;"><i style="width:' + pct + '%;"></i></div>' +
        '</div>';
      }).join('');
  }

  /* ==================================================== ONBOARDING */
  var obStep = 0;
  var obData = { grade: 'prospect_1', goal: 5, mini: null, msg: '', order: null };

  /** v2.7.0: a dedicated question per grade that is NOT in the practice bank,
      so lesson 1 never repeats it (falls back to the first bank item). */
  function onboardingQuestion(gid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g) return null;
    return g.onboarding || (g.items || [])[0] || null;
  }

  function showOnboarding() {
    hideToast();
    obStep = 0;
    var ob = document.getElementById('onboarding');
    if (ob) ob.hidden = false;
    renderOnboarding();
  }

  function renderOnboarding() {
    var host = document.getElementById('ob-inner');
    if (!host) return;
    var inner = '';
    if (obStep === 0) {
      inner = '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg('normal', 112) : '') + '</div>' +
        '<div class="ob-title">سلام! گرامر انگلیسی را با هم یاد&nbsp;می‌گیریم&nbsp;🙂</div>' +
        '<div class="ob-sub">اول بگو کدام پایه‌ای؟ بعد از آن فقط ۲ قدم کوتاه.</div>' +
        '<div class="ob-grid">' +
          GRADE_ORDER.map(function (gid) {
            var meta = gradeMeta(gid);
            return '<button class="ob-opt' + (obData.grade === gid ? ' sel' : '') + '" onclick="FGApp.pickOnboardGrade(\'' + gid + '\')">' +
              '<div class="ob-t">' + esc(meta.fa) + '</div><div class="ob-s">' + en(meta.tag) + '</div></button>';
          }).join('') +
        '</div>' +
        '<button class="btn btn-primary" style="margin-top:16px;" onclick="FGApp.nextOnboard()">بعدی ←</button>';
    } else if (obStep === 1) {
      inner = '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg('think', 104) : '') + '</div>' +
        '<div class="ob-title">هدف روزانه‌ات چقدر باشد؟</div>' +
        '<div class="ob-sub">هر روز همین‌قدر. کم و منظم بهتر از زیاد و رهاشده.</div>' +
        /* v2.13: three goals in ONE row (the 2-column grid left «۱۵ دقیقه» alone) and a word that means something */
        '<div class="ob-grid ob-grid-3">' +
          [5, 10, 15].map(function (m) {
            return '<button class="ob-opt' + (obData.goal === m ? ' sel' : '') + '" onclick="FGApp.pickOnboardGoal(' + m + ')">' +
              '<div class="ob-t">' + faNum(m) + ' دقیقه</div><div class="ob-s">' + ({ 5: 'سبک', 10: 'معمولی', 15: 'جدی' })[m] + '</div></button>';
          }).join('') +
        '</div>' +
        '<button class="btn btn-primary" style="margin-top:16px;" onclick="FGApp.nextOnboard()">بعدی ←</button>';
    } else {
      var it = onboardingQuestion(obData.grade);
      if (!obData.order) {
        obData.order = (it ? it.options.slice(0, 4) : []);
        for (var k = obData.order.length - 1; k > 0; k--) {
          var j = Math.floor(Math.random() * (k + 1));
          var tmp = obData.order[k]; obData.order[k] = obData.order[j]; obData.order[j] = tmp;
        }
      }
      var answered = !!obData.mini;
      var right = answered && it && obData.mini === it.target;
      inner = (answered ? '' : '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg('think', 104) : '') + '</div>') +
        '<div class="ob-title">یک سؤال کوتاه، همین الان!</div>' +
        '<div class="ob-sub">' + mixed(it ? it.fa : '') + '</div>' +
        '<div class="question-en ltr-block" style="margin-bottom:12px;">' + esc(it ? (it.cloze || it.sentence) : '') + '</div>' +
        '<div class="option-list" id="ob-options">' +
          obData.order.map(function (o) {
            var cls = 'option-btn';
            if (answered) {
              if (o === it.target) cls += ' correct';
              else if (o === obData.mini) cls += ' wrong';
              else cls += ' dim';
            }
            return '<button class="' + cls + '" ' + (answered ? 'disabled' : '') +
              ' onclick="FGApp.pickOnboardMini(' + JSON.stringify(o).replace(/"/g, '&quot;') + ')">' +
              '<span class="grow">' + en(o) + '</span></button>';
          }).join('') +
        '</div>' +
        (answered
          /* the feedback is its own line; the button label never changes */
          ? '<div class="ob-feedback ' + (right ? 'ok' : 'no') + '" role="status" aria-live="polite">' +
              (window.FGMascot ? '<span class="ob-mascot">' + window.FGMascot.svg(right ? 'happy' : 'oops', 64) + '</span>' : '') +
              '<div class="obf-head">' + esc(obData.msg) + '</div>' +
              (right ? '' : '<div class="obf-body">درست: ' + en(it.target) + (it.explainFa ? ' — ' + mixed(it.explainFa) : '') + '</div>') +
            '</div>' +
            '<button class="btn btn-primary" style="margin-top:12px;" onclick="FGApp.finishOnboard()">شروع کنیم ←</button>' +
            /* v2.11 (Phase 5.2): optional, skippable placement — a secondary choice under the one primary */
            '<button class="btn btn-ghost btn-sm ob-place" onclick="FGApp.startOnboardPlacement()">' + ICON.flask + ' درس‌های اول را بلدی؟ تعیین سطح (۱۰ سؤال)</button>'
          : '<div style="font-size:12px;color:var(--ink-3);text-align:center;margin-top:14px;">یک گزینه را انتخاب کن</div>');
    }
    host.innerHTML = inner +
      '<div class="ob-dots">' +
        [0, 1, 2].map(function (i) { return '<i class="' + (i === obStep ? 'on' : '') + '"></i>'; }).join('') +
      '</div>';
    applyA11y(host);
  }

  function pickOnboardGrade(gid) {
    if (obData.grade !== gid) { obData.mini = null; obData.order = null; }
    obData.grade = gid;
    sh('tap');
    renderOnboarding();
  }
  function pickOnboardGoal(m) {
    obData.goal = m;
    sh('tap');
    renderOnboarding();
  }
  function pickOnboardMini(opt) {
    var it = onboardingQuestion(obData.grade);
    if (!it || obData.mini) return;
    obData.mini = opt;
    obData.msg = opt === it.target ? '🎉 ' + cheer() : '💡 ' + encourage();
    countAnswer(opt === it.target);
    if (opt === it.target) {
      sh('correct');
      window.FGStore.addReward(10, 0);
      window.FGMascot.confetti(document.getElementById('confetti-layer'), 20);
      floatXp('+۱۰');
    } else {
      sh('wrong');
    }
    renderOnboarding();
    setTimeout(function () {
      var tail = document.querySelector('#ob-inner .ob-place') || document.querySelector('#ob-inner .btn-primary');
      if (tail && tail.scrollIntoView) { try { tail.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { tail.scrollIntoView(false); } }
    }, 60);
  }
  function nextOnboard() {
    obStep = Math.min(2, obStep + 1);
    sh('tap');
    renderOnboarding();
  }
  function finishOnboard() {
    var st = window.FGStore.getState();
    st.selectedGrade = obData.grade;
    st.selectedLessonByGrade[obData.grade] = 1;
    st.dailyGoalMin = obData.goal;
    st.onboarded = true;
    /* v2.13: the first launch seeded the review deck from the DEFAULT grade (7th) before the
       learner picked one — a 10th grader met «Hello, my name ___ Amir» in «مرور هوشمند» */
    if (window.FGStore.reseedStarterDeck) window.FGStore.reseedStarterDeck(obData.grade);
    window.FGStore.saveState();
    var ob = document.getElementById('onboarding');
    if (ob) ob.hidden = true;
    sh('fanfare');
    /* v2.7.0: no toast over the «ادامه بده» button — the hint is written in
       the greeting card and the button pulses gently until the first lesson. */
    firstRunHint = true;
    switchTab('path');
    refreshHeaderHud();
  }

  /* v2.11.0 (Phase 5.2): the optional placement offered after the mini question. The onboarding
     choices are saved FIRST, so leaving the test at any moment is safe (✕ → the path, lesson 1). */
  function startOnboardPlacement() {
    var st = window.FGStore.getState();
    st.selectedGrade = obData.grade;
    st.selectedLessonByGrade[obData.grade] = 1;
    st.dailyGoalMin = obData.goal;
    st.onboarded = true;
    if (window.FGStore.reseedStarterDeck) window.FGStore.reseedStarterDeck(obData.grade);
    window.FGStore.saveState();
    var ob = document.getElementById('onboarding');
    if (ob) ob.hidden = true;
    firstRunHint = true;
    switchTab('practice');
    refreshHeaderHud();
    if (window.FG_Games && window.FG_Games.startGradePlacement) window.FG_Games.startGradePlacement(obData.grade, { fromOnboarding: true });
  }

  /* ==================================================== MODALS / SHEETS */
  function openSheet(html) {
    var bd = document.getElementById('app-sheet-backdrop');
    var shEl = document.getElementById('app-sheet');
    if (!bd || !shEl) return;
    shEl.innerHTML = html;
    bd.classList.add('open');
    bd.removeAttribute('aria-hidden');
    sh('tap');
    applyA11y(shEl);
  }
  function closeModal() {
    /* G27: a closed sheet must never leave a confirmable restore behind (✕, Back, «انصراف» all land here) */
    pendingRestore = null;
    var bd = document.getElementById('app-sheet-backdrop');
    if (!bd) return;
    bd.classList.remove('open');
    bd.setAttribute('aria-hidden', 'true');
    /* after the slide-out, a closed sheet keeps no stale buttons in the DOM */
    clearTimeout(closeModal._t);
    closeModal._t = setTimeout(function () {
      var shEl = document.getElementById('app-sheet');
      if (shEl && !bd.classList.contains('open')) shEl.innerHTML = '';
    }, 320);
  }
  function openSettings() {
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">تنظیمات و دربارهٔ برنامه</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      appearanceRowHtml(window.FGStore.getState()) +
      '<div class="switch-row"><div style="font-weight:700;">صدا</div>' +
        '<button class="switch' + (window.FGStore.getState().soundOn ? ' on' : '') + '" role="switch" aria-label="صدا" onclick="FGApp.toggleSound()"></button></div>' +
      volumeRowHtml(window.FGStore.getState()) +
      '<div class="switch-row"><div style="font-weight:700;">لرزش</div>' +
        '<button class="switch' + (window.FGStore.getState().vibrateOn ? ' on' : '') + '" role="switch" aria-label="لرزش" onclick="FGApp.toggleVibration()"></button></div>' +
      '<div class="switch-row"><div style="font-weight:700;">پشتیبان‌گیری</div>' +
        '<button class="btn btn-secondary btn-sm" onclick="FGApp.openBackupModal()">باز کردن</button></div>' +
      /* v2.13: the credits («شناسنامهٔ علمی») live ONLY in the «من» tab — this sheet links there */
      '<button class="btn btn-secondary" style="margin-top:14px;" onclick="FGApp.openAboutInMe()">دربارهٔ برنامه، سازندگان و تماس ←</button>'
    );
  }
  function openAboutInMe() {
    closeModal();
    switchTab('me');
    setTimeout(function () {
      var a = document.getElementById('me-about');
      if (a && a.scrollIntoView) { try { a.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) { a.scrollIntoView(); } }
    }, 120);
  }

  function openGradePickerModal() {
    var st = window.FGStore.getState();
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">کدام پایه؟</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      '<div class="ob-grid">' +
        GRADE_ORDER.map(function (gid) {
          var meta = gradeMeta(gid);
          var g = window.GRAMMAR_CURRICULUM[gid];
          var done = 0;
          (g.lessons || []).forEach(function (ls) { if (st.masteredLessons[gid + '_' + ls.id]) done++; });
          return '<button class="ob-opt' + (st.selectedGrade === gid ? ' sel' : '') + '" onclick="FGApp.pickGradeFromModal(\'' + gid + '\')">' +
            '<div class="ob-t">' + esc(meta.fa) + '</div>' +
            '<div class="ob-s">' + en(meta.tag) + '، ' + faNum(done) + '/' + faNum((g.lessons || []).length) + ' درس</div></button>';
        }).join('') +
      '</div>'
    );
  }
  /* v2.17 — «📚 همهٔ درس‌ها»: every lesson of the grade in one short list (stars / lock), one tap opens it;
     a locked lesson shows the usual explanation with «رد کردن و ادامه». Replaces long scrolling on small phones. */
  function openLessonList() {
    var st = window.FGStore.getState();
    var gid = st.selectedGrade;
    var g = window.GRAMMAR_CURRICULUM[gid];
    var journey = window.FGStore.getJourney(gid, g.lessons);
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">📚 همهٔ درس‌های ' + esc(gradeMeta(gid).fa) + '</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      '<div class="lesson-list">' +
        journey.map(function (j, i) {
          var ls = g.lessons[i];
          var state = j.state === 'locked' ? 'قفل' : (j.state === 'active' ? 'درس فعلی' : (j.state === 'done' ? faNum(j.stars) + ' ستاره از ۳' : 'باز'));
          return '<button type="button" class="lesson-row ' + j.state + '" data-lid="' + j.id + '" onclick="FGApp.pickLessonFromList(\'' + gid + '\',' + j.id + ')" ' +
            'aria-label="' + esc('درس ' + faNum(i + 1) + ': ' + lessonShortTitle(ls) + ' — ' + state) + '">' +
            '<span class="lr-num">' + (j.state === 'locked' ? ICON.lock : faNum(i + 1)) + '</span>' +
            '<span class="lr-title">' + mixed(lessonShortTitle(ls)) + '</span>' +
            '<span class="lr-side">' + (j.state === 'locked' ? '' : starRow(j.stars)) + '</span>' +
          '</button>';
        }).join('') +
      '</div>');
  }
  function pickLessonFromList(gid, lid) {
    closeModal();
    setTimeout(function () { tapPathNode(gid, lid); }, 260);
  }

  function pickGradeFromModal(gid) {
    var st = window.FGStore.getState();
    st.selectedGrade = gid;
    window.FGStore.saveState();
    closeModal();
    sh('pop');
    switchTab('path');
  }

  function openNoteModal(itemId) {
    var entry = itemById(itemId);
    if (!entry) return;
    var st = window.FGStore.getState();
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">یادداشت من</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      '<div class="ltr-block" style="margin-bottom:10px;">' + esc(entry.item.sentence) + '</div>' +
      '<textarea id="note-ta" class="search-input" rows="4" placeholder="مثلاً: این قاعده را با مثال امتحانی حفظ کردم">' + esc(st.notes[itemId] || '') + '</textarea>' +
      '<button class="btn btn-primary" style="margin-top:10px;" onclick="FGApp.savePersonalNote(\'' + itemId + '\')">ذخیره</button>'
    );
  }
  function savePersonalNote(itemId) {
    var ta = document.getElementById('note-ta');
    if (!ta) return;
    var st = window.FGStore.getState();
    st.notes[itemId] = ta.value.trim();
    window.FGStore.saveState();
    closeModal();
    showToast('✅ یادداشت ذخیره شد');
    renderMe();
  }

  /* ======================================================================
     Native bridge callbacks (v2.11.0). MainActivity has always called these
     — but no JS handler existed, so the native confirmations («فایل ذخیره شد»,
     «کپی شد») were silently dropped and a picked backup file went nowhere.
     ====================================================================== */
  function nativeBridge() { return window.AndroidBridge || window.NativeBridge || null; }
  function b64ToUtf8(b64) {
    try {
      var bin = atob(String(b64 || '').replace(/\s+/g, ''));
      if (window.TextDecoder) {
        var bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new TextDecoder('utf-8').decode(bytes);
      }
      return decodeURIComponent(escape(bin));
    } catch (e) { return null; }
  }
  window.__onNativeToastB64 = function (b64) { var t = b64ToUtf8(b64); if (t) showToast(t); };
  window.__onNativeBackupImported = function (b64) { handleImportedText(b64ToUtf8(b64), 'backup'); };
  window.__onNativePackImported = function (b64Name, b64Content) { handleImportedText(b64ToUtf8(b64Content), 'pack'); };
  window.__onNativeFileSaved = function (b64Name) {
    var n = b64ToUtf8(b64Name) || '';
    if (/Backup/i.test(n)) window.FGStore.markBackupDone();
  };

  /** Any file the learner opened (backup picker or class-file picker) is routed by its kind. */
  function handleImportedText(text, via) {
    if (text == null) { showToast('⚠️ این فایل خوانا نیست.'); return; }
    var r = window.FGStore.parseClassFile(text);
    if (r.ok && r.kind === 'assignment') { openAssignmentPreview(r.data); return; }
    if (r.ok && r.kind === 'result') { openResultViewer(r.data, r.verified); return; }
    if (r.kind === 'backup') {
      if (r.ok) { openRestoreConfirm(r.data); return; }
      if (r.error === 'newer') { showToast(backupErrorText('newer')); return; }
    }
    if (r.error === 'code') { showToast('⚠️ کد این فایل تکلیف درست نیست.'); return; }
    showToast(via === 'backup' ? backupErrorText('invalid') : '⚠️ این فایل مربوط به فرهنگ‌گرام نیست.');
  }

  function sheetHead(title) {
    return '<div class="sheet-head"><div class="sheet-title">' + esc(title) + '</div>' +
      '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>';
  }
  function relativeDayFa(ts) {
    if (!ts) return '';
    var a = new Date(ts); a.setHours(0, 0, 0, 0);
    var b = new Date(); b.setHours(0, 0, 0, 0);
    var d = Math.round((b - a) / 86400000);
    return d <= 0 ? 'امروز' : (d === 1 ? 'دیروز' : faNum(d) + ' روز پیش');
  }
  function jalaliOfIso(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    return window.FGStore.formatJalaliToday(d);
  }
  function stampForFile() {
    var d = new Date();
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + '_' + p2(d.getHours()) + p2(d.getMinutes());
  }

  /* ------------------------------------------------------- backup sheet
     v2.11.0 (Phase 5.5): a REAL file. «ذخیره در گوشی» = Storage Access Framework
     (the learner picks the folder), «فرستادن فایل» = Android Share Sheet with the
     .json as an attachment (Telegram «Saved messages», Eitaa, Drive …), «بازیابی از
     فایل» = File Picker → a summary + confirmation before anything is replaced.
     The copy/paste text box survives as an «advanced» fold (and for old tools). */
  function backupFileName() {
    var d = new Date();
    function p2(n) { return (n < 10 ? '0' : '') + n; }
    return 'FarhangGram_Backup_' + d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + '.json';
  }
  function openBackupModal() {
    var st = window.FGStore.getState();
    var raw = window.FGStore.buildBackup();
    var pre = window.FGStore.getPreRestoreInfo();
    openSheet(
      sheetHead('پشتیبان‌گیری و بازیابی') +
      '<div class="sheet-intro">همهٔ پیشرفت، ستاره‌ها، یادداشت‌ها و کارت‌های مرور در یک فایل کوچک؛ با آن در گوشی تازه هم ادامه می‌دهی.</div>' +
      '<div class="backup-last">' + (st.lastBackupAt ? '🗓️ آخرین پشتیبان: ' + relativeDayFa(st.lastBackupAt) : '🗓️ هنوز فایل پشتیبان نگرفته‌ای.') + '</div>' +
      '<button class="btn btn-primary" onclick="FGApp.exportBackupFile()">💾 ذخیرهٔ فایل پشتیبان در گوشی</button>' +
      '<div class="row" style="gap:8px;margin-top:8px;">' +
        '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.shareBackupFile()">📤 فرستادن فایل</button>' +
        '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.importBackupFile()">📂 بازیابی از فایل</button>' +
      '</div>' +
      (pre ? '<button class="btn btn-ghost" style="margin-top:6px;" onclick="FGApp.undoLastRestore()">↩️ برگرداندن به قبل از آخرین بازیابی</button>' : '') +
      '<details class="backup-adv"><summary>روش متنی (کپی و چسباندن)</summary>' +
        '<textarea id="backup-json-ta" rows="4" wrap="off" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="none" class="search-input en-ltr" style="font-size:12px;" aria-label="متن پشتیبان">' + esc(raw) + '</textarea>' +
        '<div class="row" style="gap:8px;margin-top:8px;">' +
          '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.copyBackupJson()">📋 کپی</button>' +
          '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.restoreBackupJson()">📥 بازیابی از متن</button>' +
        '</div>' +
      '</details>'
    );
  }
  function copyBackupJson() {
    var ta = document.getElementById('backup-json-ta');
    if (!ta) return;
    copyTextSafe(ta.value, '📋 کپی شد', function () { try { ta.focus(); ta.select(); } catch (e) {} });
  }
  /** G11 (v2.17.0): every copy goes through the native bridge (the phone's clipboard; Java shows «در حافظه کپی شد ✓»).
      Without a bridge (browser) the async clipboard is AWAITED — «کپی شد» only on success — then execCommand('copy');
      otherwise the text is selected with a hint. Never a success toast for a copy that did not happen. */
  function copyTextSafe(txt, okMsg, onFail) {
    var b = nativeBridge();
    if (b && typeof b.copyText === 'function') { try { b.copyText(String(txt)); return; } catch (e) {} }
    var legacy = function () {
      try {
        var t = document.createElement('textarea'); t.value = String(txt); t.setAttribute('readonly', '');
        t.style.cssText = 'position:fixed;top:-200px;left:0;opacity:0;';
        document.body.appendChild(t); t.select();
        var done = document.execCommand('copy'); document.body.removeChild(t);
        return !!done;
      } catch (e) { return false; }
    };
    var fail = function () { if (onFail) onFail(); showToast('متن را انتخاب و کپی کن.'); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(String(txt)).then(function () { showToast(okMsg); }, function () { if (legacy()) showToast(okMsg); else fail(); });
        return;
      }
    } catch (e) {}
    if (legacy()) showToast(okMsg); else fail();
  }
  /** kept for older callers; the real check lives in FGStore.parseBackup (db.js) */
  function isValidBackup(obj) {
    try { return window.FGStore.parseBackup(JSON.stringify(obj)).ok; } catch (e) { return false; }
  }
  function backupErrorText(err) {
    if (err === 'unreadable') return '⚠️ این فایل پشتیبان خوانا نیست.';
    if (err === 'newer') return '⚠️ این پشتیبان را نسخهٔ تازه‌ترِ فرهنگ‌گرام ساخته؛ اول برنامه را به‌روز کن.';
    if (err === 'wrong-kind') return '⚠️ این فایل تکلیف یا نتیجهٔ کلاس است، نه پشتیبان.';
    return '⚠️ این فایل پشتیبان معتبر نیست؛ چیزی تغییر نکرد.';
  }
  function restoreBackupJson() {
    var ta = document.getElementById('backup-json-ta');
    if (!ta) return;
    var text = String(ta.value || '');
    if (!text.trim()) { showToast('⚠️ کادر متن خالی است؛ اول متن پشتیبان را بچسبان.'); return; }
    /* G27 (v2.17.0): a pasted backup is a full replacement — it is validated here and, like the file path, only
       applied after the learner sees the comparison and taps «بازیابی کن» */
    var parsed = window.FGStore.parseBackup(text);
    if (!parsed.ok) { showToast(backupErrorText(parsed.error)); return; }
    openRestoreConfirm(parsed, 'text');
  }

  /**
   * Restores a backup from a JSON string (the new file format or a bare v2.6–v2.10 state).
   * Validates and migrates before touching storage; on any failure the current data
   * is left exactly as it was. The state before the restore is kept for «برگرداندن».
   * Returns true on success, false otherwise.
   */
  function applyBackup(jsonText) {
    var parsed = window.FGStore.parseBackup(jsonText);
    if (!parsed.ok) { showToast(backupErrorText(parsed.error)); return false; }
    try { return afterRestore(window.FGStore.restoreParsedBackup(parsed)); }
    catch (e) { showToast('⚠️ بازیابی انجام نشد؛ داده‌های فعلی محفوظ است.'); return false; }
  }
  function afterRestore(ok) {
    if (!ok) {
      var why = window.FGStore.getLastRestoreError ? window.FGStore.getLastRestoreError() : '';
      if (why === 'no-undo') showToast('⚠️ نسخهٔ برگشت ذخیره نشد؛ برای اینکه بتوانی برگردی، بازیابی انجام نشد.');
      else if (why === 'write') showToast('⚠️ حافظهٔ دستگاه اجازهٔ ذخیره نداد؛ چیزی تغییر نکرد.');
      else showToast('⚠️ ذخیره ممکن نشد؛ داده‌های فعلی محفوظ است.');
      closeModal();
      return false;
    }
    applyTheme(window.FGStore.getState().theme);
    closeModal();
    refreshHeaderHud();
    switchTab('path');
    showToast('✅ بازیابی شد!');
    return true;
  }
  var pendingRestore = null;   // { parsed, source:'text'|'file', at } — cleared by closeModal
  function openRestoreConfirm(parsed, source) {
    if (!parsed || !parsed.ok) return;
    var fromText = source === 'text';
    pendingRestore = { parsed: parsed, source: fromText ? 'text' : 'file', at: Date.now() };
    var cur = window.FGStore.summarizeState();
    var inc = window.FGStore.summarizeState(parsed.state);
    var when = parsed.exportedAt ? jalaliOfIso(parsed.exportedAt) : '';
    function col(title, s) {
      return '<div class="rc-col"><div class="rc-h">' + esc(title) + '</div>' +
        '<div>' + mixed(faNum(s.xp) + ' XP') + '</div>' +
        '<div>' + faNum(s.stars) + ' ستاره</div>' +
        '<div>' + faNum(s.cards) + ' کارت مرور</div>' +
        '<div>' + esc(gradeMeta(s.grade).fa) + '</div></div>';
    }
    openSheet(
      sheetHead(fromText ? 'بازیابی از متن' : 'بازیابی از فایل') +
      '<div class="sheet-intro">' + (fromText
        ? 'این متن یک پشتیبان معتبر است' + (when ? ' و ' + when + ' ساخته شده' : '') + '.'
        : (when ? 'این پشتیبان ' + when + ' ساخته شده است.' : 'یک فایل پشتیبان پیدا شد.')) + '</div>' +
      '<div class="restore-compare">' + col('الان در گوشی', cur) + col(fromText ? 'در متن' : 'در فایل', inc) + '</div>' +
      '<div class="restore-note">پیشرفت فعلی با فایل جایگزین می‌شود. یک نسخه از وضعیت فعلی نگه داشته می‌شود تا اگر خواستی برگردی.</div>' +
      '<button class="btn btn-primary" onclick="FGApp.confirmRestore()">بازیابی کن</button>' +
      '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FGApp.closeModal()">انصراف</button>'
    );
  }
  function confirmRestore() {
    if (!pendingRestore) { showToast('⚠️ درخواست بازیابی منقضی شده؛ دوباره تلاش کن.'); return; }
    var p = pendingRestore.parsed, at = pendingRestore.at;
    pendingRestore = null;
    if (!at || (Date.now() - at) > 10 * 60 * 1000) {          /* G27: an old question can never fire later */
      closeModal();
      showToast('⚠️ این درخواست بازیابی قدیمی شده بود؛ چیزی تغییر نکرد.');
      return;
    }
    afterRestore(window.FGStore.restoreParsedBackup(p));
  }
  function undoLastRestore() {
    if (window.FGStore.undoRestore()) {
      applyTheme(window.FGStore.getState().theme);
      closeModal();
      refreshHeaderHud();
      switchTab('path');
      showToast('↩️ به وضعیت قبل از بازیابی برگشتی.');
    } else {
      var whyU = window.FGStore.getLastRestoreError ? window.FGStore.getLastRestoreError() : '';
      showToast(whyU === 'write' ? '⚠️ حافظهٔ دستگاه اجازهٔ ذخیره نداد؛ هنوز به وضعیت قبل برنگشتی.'
        : '⚠️ نسخهٔ قبلی پیدا نشد.');
    }
  }
  function exportBackupFile() {
    var raw = window.FGStore.buildBackup();
    var bridge = nativeBridge();
    if (bridge && typeof bridge.exportFile === 'function') {
      bridge.exportFile(backupFileName(), 'application/json', raw);
      showToast('💾 مسیر ذخیرهٔ فایل باز می‌شود…');
    } else showToast('⚠️ ذخیرهٔ فایل در این محیط پشتیبانی نمی‌شود.');
  }
  function shareBackupFile() {
    var raw = window.FGStore.buildBackup();
    var bridge = nativeBridge();
    if (bridge && typeof bridge.shareJsonFile === 'function') {
      bridge.shareJsonFile(backupFileName(), raw);
      window.FGStore.markBackupDone();
      showToast('📤 اشتراک‌گذاری…');
    } else showToast('⚠️ اشتراک‌گذاری در این محیط پشتیبانی نمی‌شود.');
  }
  function importBackupFile() {
    var bridge = nativeBridge();
    if (bridge && typeof bridge.importBackupJson === 'function') bridge.importBackupJson();
    else showToast('⚠️ باز کردن فایل در این محیط پشتیبانی نمی‌شود؛ از «روش متنی» استفاده کن.');
  }

  /* ======================================================================
     Share cards (v2.11.0, Phase 5.3 / 5.4) — a 1080×1350 picture drawn on a
     canvas with the app font and the owl, exported as PNG. Android: a real image
     file through the app's own read-only ContentProvider (Share Sheet) or the
     Storage Access Framework (save). Icons are drawn as shapes (no emoji font
     needed). The progress card carries no name; the class result carries the
     name the student typed for the teacher.
     ====================================================================== */
  var CARD_W = 1080, CARD_H = 1350;
  var CC = { bg1: '#053B2E', bg2: '#0D6E52', gold: '#F59E0B', mint: '#A7F3D0', ink: '#0F1A16', ink2: '#47635A', green: '#10B981', red: '#E0524F', soft: '#ECFDF5' };
  var shareImage = null;   // { url, b64, name, caption }
  function cardFont(w, px) { return w + ' ' + px + 'px Vazirmatn, Tahoma, sans-serif'; }
  function fitFont(ctx, text, maxW, w, px, minPx) {
    var size = px;
    ctx.font = cardFont(w, size);
    while (size > (minPx || 18) && ctx.measureText(text).width > maxW) { size -= 2; ctx.font = cardFont(w, size); }
    return size;
  }
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawIcon(ctx, kind, cx, cy, s, color) {
    ctx.save();
    ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = s * 0.16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    if (kind === 'star') {
      for (var i = 0; i < 10; i++) {
        var r = i % 2 ? s * 0.42 : s, a = -Math.PI / 2 + i * Math.PI / 5;
        if (i) ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a)); else ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath(); ctx.fill();
    } else if (kind === 'flame') {
      ctx.moveTo(cx, cy - s);
      ctx.bezierCurveTo(cx + s * 0.9, cy - s * 0.2, cx + s * 0.8, cy + s * 0.9, cx, cy + s);
      ctx.bezierCurveTo(cx - s * 0.8, cy + s * 0.9, cx - s * 0.9, cy + s * 0.1, cx - s * 0.25, cy - s * 0.35);
      ctx.bezierCurveTo(cx - s * 0.2, cy + s * 0.1, cx + s * 0.05, cy + s * 0.2, cx, cy - s);
      ctx.closePath(); ctx.fill();
    } else if (kind === 'check') {
      ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.strokeStyle = '#fff';
      ctx.moveTo(cx - s * 0.45, cy + s * 0.02); ctx.lineTo(cx - s * 0.1, cy + s * 0.38); ctx.lineTo(cx + s * 0.5, cy - s * 0.36); ctx.stroke();
    } else if (kind === 'cross') {
      ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.strokeStyle = '#fff';
      ctx.moveTo(cx - s * 0.36, cy - s * 0.36); ctx.lineTo(cx + s * 0.36, cy + s * 0.36);
      ctx.moveTo(cx + s * 0.36, cy - s * 0.36); ctx.lineTo(cx - s * 0.36, cy + s * 0.36); ctx.stroke();
    } else {           /* target */
      ctx.lineWidth = s * 0.2;
      ctx.arc(cx, cy, s * 0.92, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.5, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.14, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
  function cardAssets(mood) {
    var fontP = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load(cardFont(800, 60)), document.fonts.load(cardFont(500, 30))]).catch(function () {})
      : Promise.resolve();
    var imgP = new Promise(function (resolve) {
      var svg = window.FGMascot && window.FGMascot.svgStandalone ? window.FGMascot.svgStandalone(mood, 220) : '';
      if (!svg) { resolve(null); return; }
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { resolve(null); };
      img.src = window.FGMascot && window.FGMascot.imageData
        ? window.FGMascot.imageData(mood)
        : 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
    return Promise.all([fontP, imgP]).then(function (r) { return r[1]; });
  }
  function cardBase(ctx, owl, title, sub) {
    var g = ctx.createLinearGradient(0, 0, 0, CARD_H);
    g.addColorStop(0, CC.bg1); g.addColorStop(1, CC.bg2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, CARD_W, CARD_H);
    ctx.save(); ctx.globalAlpha = 0.07; ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(960, 120, 260, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(90, 1240, 230, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.direction = 'rtl'; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = CC.mint; ctx.font = cardFont(800, 42); ctx.fillText('فرهنگ‌گرام', 1000, 112);
    ctx.fillStyle = 'rgba(255,255,255,.78)'; ctx.font = cardFont(500, 28); ctx.fillText('گرامر انگلیسی کتاب درسی', 1000, 158);
    if (owl) ctx.drawImage(owl, 60, 40, 220, 220);
    ctx.fillStyle = '#fff'; fitFont(ctx, title, 920, 800, 78, 40); ctx.fillText(title, 1000, 318);
    if (sub) { ctx.fillStyle = 'rgba(255,255,255,.82)'; fitFont(ctx, sub, 920, 500, 34, 22); ctx.fillText(sub, 1000, 376); }
  }
  function cardFooter(ctx, text) {
    ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,.72)';
    fitFont(ctx, text, 940, 500, 27, 18);
    ctx.fillText(text, CARD_W / 2, CARD_H - 48);
  }
  function buildProgressCanvas() {
    var st = window.FGStore.getState();
    var rank = window.FGStore.getAcademicRank(st.xp);
    var sum = window.FGStore.summarizeState();
    var acc = st.stats.totalAnswered ? Math.round(st.stats.totalCorrect / st.stats.totalAnswered * 100) : 0;
    var passed = Object.keys(st.masteredLessons || {}).filter(function (k) { return st.masteredLessons[k]; }).length;
    return cardAssets(passed > 0 || sum.stars > 0 ? 'cheer' : 'normal').then(function (owl) {
      var c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
      var ctx = c.getContext('2d');
      cardBase(ctx, owl, 'پیشرفت من', window.FGStore.formatJalaliToday() + '، ' + gradeMeta(st.selectedGrade).fa);
      var tiles = [
        { n: faNum(st.streak || 0), l: 'روز پیاپی تمرین', icon: 'flame', col: '#F97316' },
        { n: faNum(sum.stars), l: 'ستاره در درس‌ها', icon: 'star', col: CC.gold },
        { n: faNum(passed), l: 'درس قبول‌شده', icon: 'check', col: CC.green },
        { n: faNum(acc) + '٪', l: 'دقت جواب‌ها', icon: 'target', col: '#3B82F6' }
      ];
      var w = 440, h = 300, gap = 40, x0 = 80, y0 = 430;
      tiles.forEach(function (t, i) {
        var x = (i % 2 === 0) ? x0 + w + gap : x0, y = y0 + Math.floor(i / 2) * (h + gap);
        rrect(ctx, x, y, w, h, 36); ctx.fillStyle = '#fff'; ctx.fill();
        drawIcon(ctx, t.icon, x + w - 64, y + 64, 30, t.col);
        ctx.textAlign = 'center'; ctx.fillStyle = CC.ink; fitFont(ctx, t.n, w - 60, 800, 112, 48); ctx.fillText(t.n, x + w / 2, y + 196);
        ctx.fillStyle = CC.ink2; fitFont(ctx, t.l, w - 40, 700, 34, 20); ctx.fillText(t.l, x + w / 2, y + 256);
      });
      var py = y0 + 2 * (h + gap) + 6;
      rrect(ctx, 80, py, 920, 112, 56); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fill();
      var rk = 'رتبه: ' + rank.titleFa + '، ' + faNum(st.xp || 0) + ' امتیاز';
      ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; fitFont(ctx, rk, 860, 700, 42, 24); ctx.fillText(rk, CARD_W / 2, py + 72);
      cardFooter(ctx, 'فرهنگ‌گرام، کاملاً آفلاین و بدون تبلیغ');
      return c;
    });
  }
  /* draws «label  code» centred on one line: the label right-to-left, the code as its own
     LEFT-TO-RIGHT run. In one mixed string the digit groups of «315-915-615» come out reversed
     («615-915-315»): after Persian letters the digits become Arabic numbers (bidi rule W2) and
     a hyphen does not join Arabic numbers, so each group is placed right-to-left. */
  function drawLabelAndCode(ctx, label, code, cy, px, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = cardFont(600, px);
    ctx.direction = 'rtl';
    var lw = ctx.measureText(label).width;
    ctx.direction = 'ltr';
    var cw = ctx.measureText(code).width;
    var gap = px * 0.5, x0 = CARD_W / 2 - (lw + gap + cw) / 2;
    ctx.textAlign = 'left';
    ctx.fillText(code, x0, cy);
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    ctx.fillText(label, x0 + cw + gap + lw, cy);
    ctx.restore();
  }
  function buildClassResultCanvas(r, check) {
    return cardAssets(FGMascot.resultState(r.score, r.total)).then(function (owl) {
      var c = document.createElement('canvas'); c.width = CARD_W; c.height = CARD_H;
      var ctx = c.getContext('2d');
      cardBase(ctx, owl, 'نتیجهٔ تکلیف', r.title || gradeMeta(r.grade).fa);
      // the student
      rrect(ctx, 80, 412, 920, 150, 36); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.textAlign = 'right'; ctx.fillStyle = CC.ink;
      var nm = r.name || 'بدون نام';
      fitFont(ctx, nm, 840, 800, 56, 28); ctx.fillText(nm, 950, 482);
      var ls = r.lessons.map(faNum);
      var line = gradeMeta(r.grade).fa + '؛ ' + (ls.length === 1 ? 'درس ' + ls[0] : 'درس‌های ' + ls.join('، '));
      ctx.fillStyle = CC.ink2; fitFont(ctx, line, 840, 600, 32, 20); ctx.fillText(line, 950, 534);
      // the score
      var cx = CARD_W / 2, cy = 728, R = 128, frac = r.total ? r.score / r.total : 0;
      ctx.lineWidth = 32; ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      if (frac > 0) { ctx.strokeStyle = CC.gold; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac); ctx.stroke(); }
      ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
      var sc = faNum(r.score) + ' از ' + faNum(r.total);
      fitFont(ctx, sc, 210, 800, 76, 36); ctx.fillText(sc, cx, cy + 12);
      ctx.font = cardFont(600, 28); ctx.fillStyle = 'rgba(255,255,255,.85)';
      ctx.fillText('نمره از ۲۰: ' + faNum(Math.round(frac * 40) / 2), cx, cy + 56);
      // one dot per question, right to left, with its number under it (the teacher can say «سؤال ۳»)
      var n = r.answers.length, perRow = n > 10 ? 8 : Math.max(1, n), dot = 62, dg = 22, rowH = 108;
      var rows = Math.ceil(n / perRow);
      for (var i = 0; i < n; i++) {
        var row = Math.floor(i / perRow), inRow = Math.min(perRow, n - row * perRow);
        var rowW = inRow * dot + (inRow - 1) * dg, k = i - row * perRow;
        var x = CARD_W / 2 + rowW / 2 - dot / 2 - k * (dot + dg), y = 940 + row * rowH;
        drawIcon(ctx, r.answers[i].ok ? 'check' : 'cross', x, y, dot / 2, r.answers[i].ok ? CC.green : CC.red);
        ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = cardFont(700, 24);
        ctx.fillText(faNum(r.answers[i].n || (i + 1)), x, y + dot / 2 + 30);
      }
      var yInfo = 940 + (rows - 1) * rowH + 112;
      var when = jalaliOfIso(r.finishedAt) + (r.attempt > 1 ? '، دفعهٔ ' + faNum(r.attempt) : '');
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,.85)'; fitFont(ctx, when, 920, 600, 30, 18);
      ctx.fillText(when, CARD_W / 2, yInfo);
      drawLabelAndCode(ctx, 'کد تکلیف', window.FGStore.classCode.format(r.code), yInfo + 52, 30, 'rgba(255,255,255,.85)');
      cardFooter(ctx, 'فرهنگ‌گرام، کد بررسی ' + (check || ''));
      return c;
    });
  }
  function canvasToShare(canvas, name, caption) {
    var url = canvas.toDataURL('image/png');
    shareImage = { url: url, b64: url.slice(url.indexOf(',') + 1), name: name, caption: caption || '' };
    return shareImage;
  }
  function downloadDataUrl(url, name) {
    try {
      var a = document.createElement('a');
      a.href = url; a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.parentNode.removeChild(a);
      return true;
    } catch (e) { return false; }
  }
  function sharePng(img) {
    if (!img) return;
    var bridge = nativeBridge();
    if (bridge && typeof bridge.sharePngBase64 === 'function') {
      bridge.sharePngBase64(img.name, img.b64, img.caption);
      showToast('📤 اشتراک‌گذاری…');
    } else if (!downloadDataUrl(img.url, img.name)) showToast('⚠️ اشتراک‌گذاری در این محیط پشتیبانی نمی‌شود.');
  }
  function savePng(img) {
    if (!img) return;
    var bridge = nativeBridge();
    if (bridge && typeof bridge.exportBase64File === 'function') {
      bridge.exportBase64File(img.name, 'image/png', img.b64);
      showToast('💾 مسیر ذخیرهٔ تصویر باز می‌شود…');
    } else if (!downloadDataUrl(img.url, img.name)) showToast('⚠️ ذخیرهٔ فایل در این محیط پشتیبانی نمی‌شود.');
  }
  function openShareCard() {
    shareImage = null;
    openSheet(
      sheetHead('کارت پیشرفت من') +
      '<div class="share-preview" id="share-preview"><div class="share-wait">در حال ساختن تصویر…</div></div>' +
      '<div class="share-note">فقط عددهای پیشرفت روی تصویر است؛ بدون نام، بدون اینترنت.</div>' +
      '<button class="btn btn-primary" id="share-img-btn" disabled onclick="FGApp.shareProgressImage()">📤 اشتراک‌گذاری تصویر</button>' +
      '<button class="btn btn-secondary" id="save-img-btn" style="margin-top:8px;" disabled onclick="FGApp.saveProgressImage()">💾 ذخیره در گوشی</button>'
    );
    return buildProgressCanvas().then(function (canvas) {
      var img = canvasToShare(canvas, 'FarhangGram_Progress_' + stampForFile() + '.png', 'پیشرفت من در فرهنگ‌گرام 🌱');
      var box = document.getElementById('share-preview');
      if (!box) return img;
      var st = window.FGStore.getState();
      box.innerHTML = '<img src="' + img.url + '" alt="' + esc('کارت پیشرفت: ' + faNum(st.streak || 0) + ' روز پیاپی، رتبه ' + window.FGStore.getAcademicRank(st.xp).titleFa) + '" />';
      ['share-img-btn', 'save-img-btn'].forEach(function (id) { var b = document.getElementById(id); if (b) b.disabled = false; });
      return img;
    }).catch(function () {
      var box = document.getElementById('share-preview');
      if (box) box.innerHTML = '<div class="share-wait">ساختن تصویر ممکن نشد.</div>';
      return null;
    });
  }
  function shareProgressImage() { sharePng(shareImage); }
  function saveProgressImage() { savePng(shareImage); }

  /* ======================================================================
     Class mode (v2.11.0, Phase 5.4) — optional, simple, no server.
     Teacher: grade + lessons + number of questions → a 9-digit code (write it on
     the board / send it) or a small assignment file. Student: types the code (or
     opens the file) → the same questions as the whole class → sends the result to
     the teacher as a picture or as a file the teacher's app can open and check.
     ====================================================================== */
  var classDraft = { grade: '', lessons: [], count: 8, title: '', code: '' };
  var pendingAssignment = null;
  function describeSpec(spec) {
    var ls = (spec.lessons || []).map(faNum);
    return gradeMeta(spec.grade).fa + '؛ ' + (ls.length === 1 ? 'درس ' + ls[0] : 'درس‌های ' + ls.join('، ')) + '؛ ' + faNum(spec.count) + ' سؤال';
  }
  function codeHtml(code) { return '<bdi dir="ltr" class="en code-digits">' + esc(window.FGStore.classCode.format(code)) + '</bdi>'; }
  function openClassMode() {
    var st = window.FGStore.getState();
    var hist = ((st.classMode && st.classMode.history) || []).slice(-3).reverse();
    openSheet(
      sheetHead('حالت کلاس') +
      '<div class="sheet-intro">معلم یک کد یا فایل تکلیف می‌دهد؛ تو حل می‌کنی و نتیجه را به‌صورت تصویر یا فایل برایش می‌فرستی. بدون اینترنت و بدون سرور.</div>' +
      '<button class="list-row" onclick="FGApp.openClassStudent()">' +
        '<span class="g-ico lr-ico">' + ICON.pen + '</span>' +
        '<span class="grow"><span class="lr-title">من دانش‌آموزم</span><span class="lr-sub">کد یا فایل تکلیف را وارد کن</span></span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span></button>' +
      '<button class="list-row" onclick="FGApp.openClassTeacher()">' +
        '<span class="g-ico lr-ico">' + ICON.users + '</span>' +
        '<span class="grow"><span class="lr-title">من معلمم</span><span class="lr-sub">کد تکلیف بساز، نتیجهٔ دانش‌آموز را ببین</span></span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span></button>' +
      (hist.length
        ? '<div class="section-head" style="margin-top:12px;">تکلیف‌های اخیر من</div>' +
          hist.map(function (h) {
            return '<div class="hist-row"><span>' + codeHtml(h.code) + (h.title ? ' ' + mixed(h.title) : '') + '</span>' +
              '<span class="chip brand">' + faNum(h.score) + ' از ' + faNum(h.total) + '</span></div>';
          }).join('')
        : '')
    );
  }
  function openClassStudent() {
    var st = window.FGStore.getState();
    pendingAssignment = null;
    openSheet(
      sheetHead('وارد کردن تکلیف') +
      '<label class="field-label">کد تکلیف (۹ رقم)' +
        '<input id="class-code-input" class="search-input code-input" dir="ltr" inputmode="numeric" autocomplete="off" maxlength="15" placeholder="۴۸۲-۱۰۵-۷۳۹" oninput="FGApp.onClassCodeInput(this.value)" /></label>' +
      '<div id="class-code-info" class="code-info" role="status" aria-live="polite">کد را از روی تخته یا پیام معلم بنویس.</div>' +
      '<label class="field-label">نام تو (برای معلم)' +
        '<input id="class-name-field" class="search-input" maxlength="60" placeholder="نام و نام خانوادگی" value="' + esc((st.classMode && st.classMode.name) || '') + '" /></label>' +
      '<button class="btn btn-primary" id="class-start-btn" disabled onclick="FGApp.startClassFromSheet()">شروع تکلیف</button>' +
      '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FGApp.importClassFile()">📂 باز کردن فایل تکلیف</button>'
    );
  }
  function onClassCodeInput(v) {
    var info = document.getElementById('class-code-info');
    var btn = document.getElementById('class-start-btn');
    var digits = window.FGStore.classCode.normalizeDigits(v).replace(/[^0-9]/g, '');
    var d = window.FGStore.classCode.decode(v);
    pendingAssignment = d.ok ? d : null;
    if (btn) btn.disabled = !d.ok;
    if (!info) return;
    info.className = 'code-info' + (d.ok ? ' ok' : (digits.length >= 9 ? ' warn' : ''));
    if (d.ok) info.textContent = '✓ ' + describeSpec(d);
    else if (digits.length < 9) info.textContent = digits.length ? faNum(9 - digits.length) + ' رقم دیگر' : 'کد را از روی تخته یا پیام معلم بنویس.';
    else if (digits.length > 9) info.textContent = 'کد ۹ رقم است؛ یک رقم اضافه است.';
    else info.textContent = 'یکی از رقم‌ها درست نیست؛ دوباره از روی کد نگاه کن.';
  }
  function openAssignmentPreview(spec) {
    var st = window.FGStore.getState();
    pendingAssignment = spec;
    openSheet(
      sheetHead('تکلیف تازه') +
      '<div class="assign-card">' +
        '<div class="assign-title">' + mixed(spec.title || 'تکلیف کلاس') + '</div>' +
        (spec.teacher ? '<div class="assign-sub">معلم: ' + mixed(spec.teacher) + '</div>' : '') +
        '<div class="assign-sub">' + esc(describeSpec(spec)) + '</div>' +
        '<div class="assign-sub">کد: ' + codeHtml(spec.code) + '</div>' +
      '</div>' +
      '<label class="field-label">نام تو (برای معلم)' +
        '<input id="class-name-field" class="search-input" maxlength="60" placeholder="نام و نام خانوادگی" value="' + esc((st.classMode && st.classMode.name) || '') + '" /></label>' +
      '<button class="btn btn-primary" onclick="FGApp.startClassFromSheet()">شروع تکلیف</button>'
    );
  }
  function startClassFromSheet() {
    if (!pendingAssignment) return;
    var nm = document.getElementById('class-name-field');
    if (nm) window.FGStore.setClassName(nm.value);
    var spec = pendingAssignment;
    pendingAssignment = null;
    closeModal();
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startClassAssignment) window.FG_Games.startClassAssignment(spec);
  }
  function importClassFile() {
    var bridge = nativeBridge();
    if (bridge && typeof bridge.importCustomPack === 'function') bridge.importCustomPack();
    else showToast('⚠️ باز کردن فایل در این محیط پشتیبانی نمی‌شود.');
  }
  function openClassTeacher() {
    var st = window.FGStore.getState();
    if (!classDraft.grade) {
      classDraft.grade = st.selectedGrade;
      classDraft.lessons = [st.selectedLessonByGrade[st.selectedGrade] || 1];
    }
    renderTeacherSheet(true);
  }
  function renderTeacherSheet(fresh) {
    var g = window.GRAMMAR_CURRICULUM[classDraft.grade] || { lessons: [] };
    var chip = function (on, label, js) {
      return '<button class="chip' + (on ? ' brand on' : '') + '" aria-pressed="' + (on ? 'true' : 'false') + '" onclick="' + js + '">' + label + '</button>';
    };
    var html =
      sheetHead('ساختن تکلیف') +
      '<div class="field-label">پایه</div><div class="chip-row">' +
        GRADE_ORDER.map(function (gid) { return chip(gid === classDraft.grade, esc(gradeMeta(gid).short), "FGApp.classPickGrade('" + gid + "')"); }).join('') + '</div>' +
      '<div class="field-label">درس‌ها</div><div class="chip-row">' +
        g.lessons.map(function (l) { return chip(classDraft.lessons.indexOf(l.id) !== -1, 'درس ' + faNum(l.id), 'FGApp.classToggleLesson(' + l.id + ')'); }).join('') + '</div>' +
      '<div class="field-label">تعداد سؤال</div><div class="chip-row">' +
        window.FGStore.classCode.COUNTS.map(function (n) { return chip(n === classDraft.count, faNum(n), 'FGApp.classPickCount(' + n + ')'); }).join('') + '</div>' +
      '<label class="field-label">عنوان (اختیاری)' +
        '<input id="class-title-input" class="search-input" maxlength="80" placeholder="مثلاً تکلیف هفتهٔ سوم" value="' + esc(classDraft.title) + '" oninput="FGApp.classSetTitle(this.value)" /></label>' +
      (classDraft.code
        ? '<div class="code-box" role="status">' +
            '<div class="code-label">کد تکلیف؛ روی تخته بنویس یا بفرست</div>' +
            '<div class="code-big">' + codeHtml(classDraft.code) + '</div>' +
            '<div class="code-desc">' + esc(describeSpec(classDraft)) + '</div>' +
            '<div class="row" style="gap:8px;margin-top:10px;">' +
              '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.copyClassCode()">📋 کپی</button>' +
              '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.shareClassCode()">📤 فرستادن</button>' +
              '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.shareAssignmentFile()">📄 فایل</button>' +
            '</div>' +
          '</div>'
        : '<button class="btn btn-primary" ' + (classDraft.lessons.length ? '' : 'disabled ') + 'onclick="FGApp.createClassCode()">ساختن کد تکلیف</button>') +
      '<button class="btn btn-ghost" style="margin-top:8px;" onclick="FGApp.importClassFile()">📂 دیدن فایل نتیجهٔ یک دانش‌آموز</button>';
    var shEl = document.getElementById('app-sheet');
    var bd = document.getElementById('app-sheet-backdrop');
    if (!fresh && shEl && bd && bd.classList.contains('open')) {
      var top = shEl.scrollTop;
      shEl.innerHTML = html;
      shEl.scrollTop = top;
      applyA11y(shEl);
    } else openSheet(html);
  }
  function classPickGrade(gid) {
    if (classDraft.grade !== gid) { classDraft.grade = gid; classDraft.lessons = [1]; classDraft.code = ''; }
    sh('tap'); renderTeacherSheet();
  }
  function classToggleLesson(id) {
    var i = classDraft.lessons.indexOf(id);
    if (i === -1) classDraft.lessons.push(id); else classDraft.lessons.splice(i, 1);
    classDraft.lessons.sort(function (a, b) { return a - b; });
    classDraft.code = '';
    sh('tap'); renderTeacherSheet();
  }
  function classPickCount(n) { classDraft.count = n; classDraft.code = ''; sh('tap'); renderTeacherSheet(); }
  function classSetTitle(v) { classDraft.title = String(v || '').slice(0, 80); }
  function createClassCode() {
    if (!classDraft.lessons.length) return;
    var code = window.FGStore.classCode.encode({ grade: classDraft.grade, lessons: classDraft.lessons, count: classDraft.count, seed: Math.floor(Math.random() * 1024) });
    if (!code) { showToast('⚠️ ساختن کد ممکن نشد.'); return; }
    classDraft.code = code;
    sh('star');
    renderTeacherSheet();
  }
  function classCodeMessage() {
    return 'کد تکلیف فرهنگ‌گرام: ' + window.FGStore.classCode.format(classDraft.code) + '\n' + describeSpec(classDraft) +
      (classDraft.title ? '\n' + classDraft.title : '') + '\nدر برنامه: تمرین ← حالت کلاس ← من دانش‌آموزم';
  }
  function copyClassCode() {
    if (!classDraft.code) return;
    var txt = window.FGStore.classCode.format(classDraft.code);
    copyTextSafe(txt, '📋 کد کپی شد');
  }
  function shareClassCode() {
    if (!classDraft.code) return;
    var bridge = nativeBridge();
    if (bridge && typeof bridge.shareText === 'function') bridge.shareText('کد تکلیف فرهنگ‌گرام', classCodeMessage());   /* Java: shareText(title, body) — two arguments */
    else copyClassCode();
  }
  function shareAssignmentFile() {
    if (!classDraft.code) return;
    var json = window.FGStore.buildAssignmentFile({ grade: classDraft.grade, lessons: classDraft.lessons, count: classDraft.count,
      seed: window.FGStore.classCode.decode(classDraft.code).seed }, { title: classDraft.title });
    var bridge = nativeBridge();
    if (json && bridge && typeof bridge.shareJsonFile === 'function') {
      bridge.shareJsonFile('FarhangGram_Assignment_' + classDraft.code + '.json', json);
      showToast('📤 اشتراک‌گذاری فایل تکلیف…');
    } else showToast('⚠️ اشتراک‌گذاری در این محیط پشتیبانی نمی‌شود.');
  }
  function openResultViewer(obj, verified) {
    var total = obj.total || 0, score = obj.score || 0;
    var s20 = total ? Math.round(score / total * 40) / 2 : 0;
    var dots = (obj.answers || []).map(function (a) {
      return '<span class="cr-dot ' + (a.ok ? 'ok' : 'no') + '" aria-label="سؤال ' + faNum(a.n) + (a.ok ? ' درست' : ' نادرست') + '">' + faNum(a.n) + '</span>';
    }).join('');
    openSheet(
      sheetHead('نتیجهٔ دانش‌آموز') +
      '<div class="assign-card">' +
        '<div class="assign-title">' + mixed(obj.name || 'بدون نام') + '</div>' +
        (obj.title ? '<div class="assign-sub">' + mixed(obj.title) + '</div>' : '') +
        '<div class="assign-sub">' + esc(describeSpec({ grade: obj.grade, lessons: obj.lessons || [], count: total })) + '</div>' +
        '<div class="assign-sub">کد: ' + codeHtml(obj.code) + (obj.attempt > 1 ? '؛ دفعهٔ ' + faNum(obj.attempt) : '') + '</div>' +
        '<div class="cr-score"><b>' + faNum(score) + ' از ' + faNum(total) + '</b><span>نمره از ۲۰: ' + faNum(s20) + '</span></div>' +
        '<div class="cr-dots">' + dots + '</div>' +
        '<div class="assign-sub">' + esc(jalaliOfIso(obj.finishedAt)) + '</div>' +
        '<div class="verify ' + (verified ? 'ok' : 'warn') + '">' +
          (verified ? '✓ فایل همان است که برنامهٔ دانش‌آموز ساخته.' : '⚠️ این فایل با نسخه‌ای که برنامه ساخته یکی نیست؛ شاید دستی تغییر کرده.') + '</div>' +
      '</div>' +
      '<button class="btn btn-secondary" onclick="FGApp.importClassFile()">📂 فایل نتیجهٔ بعدی</button>'
    );
  }
  function shareClassResultImage() {
    var r = window.FG_Games && window.FG_Games.getClassResult ? window.FG_Games.getClassResult() : null;
    if (!r) return null;
    var check = JSON.parse(window.FGStore.buildResultFile(r)).check;
    return buildClassResultCanvas(r, check).then(function (canvas) {
      var img = canvasToShare(canvas, 'FarhangGram_Result_' + r.code + '_' + stampForFile() + '.png', 'نتیجهٔ تکلیف' + (r.name ? '؛ ' + r.name : ''));
      sharePng(img);
      return img;
    }).catch(function () { showToast('⚠️ ساختن تصویر ممکن نشد.'); return null; });
  }
  function shareClassResultFile() {
    var r = window.FG_Games && window.FG_Games.getClassResult ? window.FG_Games.getClassResult() : null;
    if (!r) return;
    var bridge = nativeBridge();
    if (bridge && typeof bridge.shareJsonFile === 'function') {
      bridge.shareJsonFile('FarhangGram_Result_' + r.code + '_' + stampForFile() + '.json', window.FGStore.buildResultFile(r));
      showToast('📤 اشتراک‌گذاری فایل نتیجه…');
    } else showToast('⚠️ اشتراک‌گذاری در این محیط پشتیبانی نمی‌شود.');
  }

  /* ======================================================================
     Device check (v2.12.0, reviewer v3 §6 «تست روی دستگاه واقعی»)
     A measurement kit for the real-device protocol (reports/v2120/phase6_report.md):
     the tester opens it once per phone, runs the 3-second check, listens / feels the
     samples, and copies the numbers into the report. Offline, no permission, nothing
     stored or sent.
     ====================================================================== */
  var deviceCheck = null;
  function diagChip(label, js) {
    return '<button class="chip" onclick="' + js + '">' + mixed(label) + '</button>';   /* «تلفظ US»: the Latin part gets its own isolate */
  }
  function deviceCheckLines() {
    var d = deviceCheck;
    if (!d) return ['هنوز سنجشی اجرا نشده است.'];
    var a = d.audio || {}, t = d.tts || {}, f = faNum;
    var voice = function (v) { return v >= 1 ? 'دارد' : (v === 0 ? 'فقط انگلیسی عمومی' : (v === -1 ? 'دادهٔ صدا نصب نیست' : 'ندارد')); };
    return [
      'FarhangGram ' + d.app + '، WebView ' + d.webview + '، Android ' + d.android,
      'حافظه: ' + (d.memory ? f(d.memory) + ' گیگابایت' : '؟') + '؛ هسته‌ها: ' + (d.cores ? f(d.cores) : '؟') + '؛ صفحه: ' + f(d.screenW) + '×' + f(d.screenH) + '، تراکم ' + f(d.dpr),
      'روانی: ' + f(d.fps) + ' فریم در ثانیه؛ فریم کند (بیش از ۳۳ ms): ' + f(d.slowPct) + '٪؛ p95: ' + f(d.p95) + ' ms؛ کندترین: ' + f(d.worst) + ' ms',
      'صدا: ' + (a.sampleRate ? f(a.sampleRate) + ' Hz؛ تأخیر پایه ' + (a.baseLatencyMs == null ? '؟' : f(a.baseLatencyMs) + ' ms') + '؛ تأخیر خروجی ' + (a.outputLatencyMs == null ? '؟' : f(a.outputLatencyMs) + ' ms') + '؛ بلندی برنامه ' + f(Math.round((a.volume || 0) * 100)) + '٪' : 'گزارش نشد'),
      'صدای انگلیسی: ' + (t.ready ? 'آماده' : 'آماده نیست') + (t.us != null ? '؛ US: ' + voice(t.us) + '؛ UK: ' + voice(t.uk) : '') + (t.engine ? '؛ موتور ' + t.engine : ''),
      'کاهش حرکت: ' + (d.reducedMotion ? 'روشن' : 'خاموش') + '؛ صدا: ' + (d.soundOn ? 'روشن' : 'خاموش') + '؛ لرزش: ' + (d.vibrateOn ? 'روشن' : 'خاموش')
    ];
  }
  function deviceCheckHtml() {
    return deviceCheckLines().map(function (l) { return '<div>' + mixed(l) + '</div>'; }).join('');
  }
  /* v2.17 (U2): the technical report — version, Android, WebView, screen, theme, data size and the last 20 errors,
     built on the phone by js/safety_net.js; nothing is sent anywhere, the learner copies it for the developer */
  if (window.SafetyNet) {
    window.SafetyNet.setInfo(function () {
      var st = window.FGStore.getState(), html = document.documentElement;
      var lines = [
        'ظاهر: ' + (st.theme === 'auto' ? 'هماهنگ با گوشی' : st.theme) + ' · گوشی در حالت ' + (systemDark() ? 'شب' : 'روز') + ' · نمایش: ' + (html.getAttribute('data-scheme') || (themeIsDark(st.theme) ? 'dark' : 'light')),
        'پایه: ' + st.selectedGrade + ' · صدا: ' + (st.soundOn !== false ? 'روشن' : 'خاموش') + ' · لرزش: ' + (st.vibrateOn !== false ? 'روشن' : 'خاموش')
      ];
      lines.version = window.FGStore.getAppVersion();
      return lines;
    });
  }
  function techReportLines() {
    return window.SafetyNet ? window.SafetyNet.reportLines() : ['FarhangGram ' + window.FGStore.getAppVersion()];
  }
  function techReportHtml() {
    return techReportLines().map(function (l) { return '<div dir="auto">' + mixed(l) + '</div>'; }).join('');
  }
  function openDeviceCheck() {
    openSheet(
      sheetHead('گزارش فنی و سنجش دستگاه') +
      '<div class="sheet-intro">اگر روی گوشی مشکلی دیدی، «📋 کپی گزارش» را بزن و متن را برای سازنده بفرست. این گزارش فقط روی همین گوشی ساخته می‌شود و جایی فرستاده نمی‌شود.</div>' +
      '<div id="techreport-out" class="diag-out">' + techReportHtml() + '</div>' +
      '<div class="field-label">سنجش روانی و صدا (برای آزمونگر یا معلم)</div>' +
      '<button class="btn btn-primary" id="diag-run" onclick="FGApp.runDeviceCheck()">اجرای سنجش خودکار (۳ ثانیه)</button>' +
      '<div class="diag-track" aria-hidden="true"><i id="diag-dot"></i></div>' +
      '<div id="diag-out" class="diag-out" role="status" aria-live="polite">' + deviceCheckHtml() + '</div>' +
      '<div class="field-label">گوش کن و لمس کن (نظرت را در برگهٔ گزارش بنویس)</div>' +
      '<div class="chip-row">' +
        diagChip('صدای درست', "FGApp.deviceCheckSample('correct')") +
        diagChip('صدای نادرست', "FGApp.deviceCheckSample('wrong')") +
        diagChip('صدای جشن', "FGApp.deviceCheckSample('fanfare')") +
        diagChip('لرزش', 'FGApp.deviceCheckVibrate()') +
        diagChip('تلفظ US', "FGApp.deviceCheckSpeak('US')") +
        diagChip('تلفظ UK', "FGApp.deviceCheckSpeak('UK')") +
      '</div>' +
      '<button class="btn btn-secondary" style="margin-top:12px;" onclick="FGApp.copyDeviceCheck()">📋 کپی گزارش</button>'
    );
    if (window.SafetyNet) window.SafetyNet.refresh(function () {   // the storage estimate arrives a moment later
      var o = document.getElementById('techreport-out'); if (o) o.innerHTML = techReportHtml();
    });
  }
  /** rAF frame timing while the app's own heaviest effects run (confetti + a moving owl dot) */
  function measureFrames(ms) {
    return new Promise(function (resolve) {
      var times = [], last = 0, start = 0;
      var dot = document.getElementById('diag-dot');
      if (window.FGMascot) window.FGMascot.confetti(document.getElementById('confetti-layer'), 30);
      function step(t) {
        if (!start) start = t;
        if (last) times.push(t - last);
        last = t;
        if (dot) dot.style.transform = 'translateX(' + (-Math.abs(Math.sin((t - start) / 400)) * 220) + 'px)';
        if (t - start < ms) requestAnimationFrame(step);
        else {
          var n = times.length || 1, sum = 0, slow = 0;
          times.forEach(function (x) { sum += x; if (x > 33.4) slow++; });
          var sorted = times.slice().sort(function (a, b) { return a - b; });
          resolve({
            frames: times.length,
            fps: Math.round(1000 / (sum / n)),
            slowPct: Math.round(slow / n * 1000) / 10,
            p95: Math.round(sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] || 0),
            worst: Math.round(sorted[sorted.length - 1] || 0)
          });
        }
      }
      requestAnimationFrame(step);
    });
  }
  function runDeviceCheck(ms) {
    var btn = document.getElementById('diag-run');
    if (btn) btn.disabled = true;
    var st = window.FGStore.getState();
    var ua = navigator.userAgent || '';
    var tts = { ready: !!(window.FGStore.isTtsReady && window.FGStore.isTtsReady()) };
    var b = nativeBridge();
    if (b && typeof b.getTtsInfo === 'function') { try { tts = JSON.parse(b.getTtsInfo()) || tts; } catch (e) {} }
    var info = {
      app: window.FGStore.getAppVersion(),
      webview: (ua.match(/Chrome\/([\d.]+)/) || [, '؟'])[1],
      android: (ua.match(/Android ([\d.]+)/) || [, '؟'])[1],
      memory: navigator.deviceMemory || 0,
      cores: navigator.hardwareConcurrency || 0,
      screenW: window.screen ? window.screen.width : 0, screenH: window.screen ? window.screen.height : 0,
      dpr: Math.round((window.devicePixelRatio || 1) * 100) / 100,
      reducedMotion: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
      soundOn: st.soundOn !== false, vibrateOn: st.vibrateOn !== false,
      audio: window.FGSound && window.FGSound.getAudioInfo ? window.FGSound.getAudioInfo() : null,
      tts: tts
    };
    return measureFrames(ms || 3000).then(function (fr) {
      deviceCheck = Object.assign(info, fr);
      var out = document.getElementById('diag-out');
      if (out) out.innerHTML = deviceCheckHtml();
      if (btn) btn.disabled = false;
      sh('pop');
      return deviceCheck;
    });
  }
  function deviceCheckSample(name) { if (window.FGSound) window.FGSound.play(name); }
  function deviceCheckVibrate() {
    var b = nativeBridge();
    if (b && typeof b.vibrate === 'function') { b.vibrate(18); setTimeout(function () { b.vibrate(26); }, 260); }
    else if (navigator.vibrate) navigator.vibrate([18, 60, 26]);
    else showToast('این محیط لرزش ندارد.');
  }
  function deviceCheckSpeak(accent) {
    var st = window.FGStore.getState(), keep = st.accent;
    st.accent = accent;                       // only for this sample; not saved
    window.FGStore.speakEnglish('My sister is a teacher, and she has lived in London for three years.');
    st.accent = keep;
  }
  function copyDeviceCheck() {
    var txt = techReportLines().concat(deviceCheck ? ['— سنجش دستگاه —'].concat(deviceCheckLines()) : []).join('\n');
    copyTextSafe(txt, '📋 گزارش کپی شد');
  }

  /* placement chooser (practice tab tool): one grade («از کدام درس؟») or all grades («کدام پایه؟») */
  function openPlacementChooser() {
    var st = window.FGStore.getState();
    openSheet(
      sheetHead('تعیین سطح') +
      '<button class="list-row" onclick="FGApp.launchGradePlacement()">' +
        '<span class="g-ico lr-ico">' + ICON.flask + '</span>' +
        '<span class="grow"><span class="lr-title">از کدام درسِ ' + esc(gradeMeta(st.selectedGrade).short) + ' شروع کنم؟</span>' +
        '<span class="lr-sub">۱۰ سؤال از درس‌های همین پایه</span></span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span></button>' +
      '<button class="list-row" onclick="FGApp.launchPlacementTest()">' +
        '<span class="g-ico lr-ico">' + ICON.target + '</span>' +
        '<span class="grow"><span class="lr-title">کدام پایه برای من مناسب است؟</span>' +
        '<span class="lr-sub">۱۰ سؤال از همهٔ پایه‌ها</span></span>' +
        '<span class="lr-go" aria-hidden="true">' + ICON.back + '</span></button>'
    );
  }
  function launchGradePlacement() {
    closeModal();
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startGradePlacement) window.FG_Games.startGradePlacement(window.FGStore.getState().selectedGrade);
  }

  /* ------------------------------------------------------- misc actions */
  /* ------------------------------------------------------------ v2.14 theme engine
     «هماهنگ با گوشی» used to read prefers-color-scheme. Inside an Android WebView that query
     follows the APP theme (Theme.Material.Light → always «light»), so a phone in night mode
     still got a white app. Now Android itself is asked (AndroidBridge.isSystemDark) and tells
     the page when the phone switches (FGApp.onSystemNightChanged); the media query is only the
     fallback in a plain browser. The palette is chosen with data-scheme on <html>. */
  var sysDarkOverride = null;          // last value pushed by Android (onSystemNightChanged)
  function systemDark() {
    if (sysDarkOverride !== null) return sysDarkOverride;
    try {
      var b = window.AndroidBridge;
      if (b && typeof b.isSystemDark === 'function') return !!b.isSystemDark();
      return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) { return false; }
  }
  function themeIsDark(id) {
    if (id === 'auto') return systemDark();
    var th = window.FGStore.THEMES.filter(function (t) { return t.id === id; })[0];
    return !!(th && th.dark);
  }
  /** the status / navigation bars take the header + tab-bar colour of the active theme */
  function syncSystemBars(t) {
    try {
      var bridge = window.AndroidBridge || window.NativeBridge;
      if (!bridge) return;
      var dark = themeIsDark(t);
      if (typeof bridge.setSystemBars === 'function') {
        var c = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
        if (!/^#[0-9a-f]{6}$/i.test(c)) c = dark ? '#121B2E' : '#FFFFFF';
        bridge.setSystemBars(c.toUpperCase(), c.toUpperCase(), !dark);
      } else if (typeof bridge.setThemeBars === 'function') {
        bridge.setThemeBars(dark ? 'dark' : 'default');
      }
    } catch (e) {}
  }
  function applyTheme(themeId) {
    var t = themeId || 'fresh_mint';
    var html = document.documentElement;
    html.setAttribute('data-theme', t);
    if (t === 'auto') html.setAttribute('data-scheme', systemDark() ? 'dark' : 'light');
    else html.removeAttribute('data-scheme');
    try { localStorage.setItem('fg_theme_hint', t); } catch (e) {}   // js/theme_boot.js paints it before anything else
    syncSystemBars(t);
  }
  /** Android → the phone switched day / night (also sent on every resume) */
  function onSystemNightChanged(dark) {
    var was = sysDarkOverride;
    sysDarkOverride = !!dark;
    var st = window.FGStore.getState();
    if (st.theme === 'auto') applyTheme('auto');
    /* v2.17 (R3): never draw the map over an open lesson (closeLesson draws it anyway) */
    if (was !== sysDarkOverride && currentTab === 'path' && st.onboarded && !lessonFlow) renderPath();
  }
  /** «ظاهر برنامه»: auto / light / dark (the rewards gallery still picks a colour palette) */
  function setAppearance(mode) {
    var st = window.FGStore.getState();
    var id = mode === 'auto' ? 'auto' : (mode === 'dark' ? 'midnight_sapphire' : (st.lastLightTheme || 'fresh_mint'));
    if (mode === 'dark' && themeIsDark(st.theme) && st.theme !== 'auto') id = st.theme;   // keep a dark palette they chose
    if (st.unlockedThemes.indexOf(id) === -1 && id !== 'auto') st.unlockedThemes.push(id);
    st.theme = id;
    st.themeHintDone = true;
    applyTheme(id);
    window.FGStore.saveState();
    sh('pop');
    showToast(mode === 'auto' ? '🌗 ظاهر برنامه مثل گوشی شد' : (mode === 'dark' ? '🌙 ظاهر تاریک' : '☀️ ظاهر روشن'));
    rerenderSettingsViews();
  }
  function appearanceMode(st) {
    if (st.theme === 'auto') return 'auto';
    return themeIsDark(st.theme) ? 'dark' : 'light';
  }
  function appearanceRowHtml(st) {
    var m = appearanceMode(st);
    var b = function (mode, label) {
      return '<button class="seg-btn' + (m === mode ? ' on' : '') + '" role="radio" aria-checked="' + (m === mode ? 'true' : 'false') + '"' +
        ' onclick="FGApp.setAppearance(\'' + mode + '\')">' + label + '</button>';
    };
    return '<div class="appearance-row"><div style="font-weight:700;margin-bottom:6px;">ظاهر برنامه</div>' +
      '<div class="seg" role="radiogroup" aria-label="ظاهر برنامه">' + b('auto', '🌗 مثل گوشی') + b('light', '☀️ روشن') + b('dark', '🌙 تاریک') + '</div></div>';
  }
  function rerenderSettingsViews() {
    if (currentTab === 'me') renderMe();
    if (currentTab === 'rewards') renderRewards();
    var shEl = document.getElementById('app-sheet');
    var bd = document.getElementById('app-sheet-backdrop');
    if (shEl && bd && bd.classList.contains('open') && shEl.querySelector('.appearance-row')) {
      var m = appearanceMode(window.FGStore.getState());
      shEl.querySelectorAll('.seg-btn').forEach(function (x, i) {
        var on = ['auto', 'light', 'dark'][i] === m;
        x.classList.toggle('on', on); x.setAttribute('aria-checked', on ? 'true' : 'false');
      });
    }
  }
  /* an install from before v2.14 keeps its light theme; if the phone is dark, ask ONCE */
  function themeHintHtml(st) {
    if (!st.onboarded || st.themeHintDone || st.theme !== 'fresh_mint' || !systemDark()) return '';
    return '<div class="card theme-hint" role="note">' +
      '<div style="font-weight:800;margin-bottom:4px;">🌙 گوشی‌ات در حالت تاریک است</div>' +
      '<div style="font-size:13px;color:var(--ink-2);margin-bottom:10px;">برنامه هم با گوشی هماهنگ شود؟ (بعداً هم در «من» عوض می‌شود.)</div>' +
      '<div class="row" style="gap:8px;">' +
        '<button class="btn btn-secondary btn-sm" onclick="FGApp.acceptThemeHint()">هماهنگ کن</button>' +
        '<button class="btn btn-ghost btn-sm" onclick="FGApp.dismissThemeHint()">نه، روشن بماند</button>' +
      '</div></div>';
  }
  function acceptThemeHint() { setAppearance('auto'); renderPath(); }
  function dismissThemeHint() {
    var st = window.FGStore.getState();
    st.themeHintDone = true;
    window.FGStore.saveState();
    renderPath();
  }

  /* ------------------------------------------------------------ v2.14 sound volume */
  function volumeRowHtml(st) {
    var v = typeof st.soundVolume === 'number' ? st.soundVolume : 80;
    return '<div class="vol-row">' +
        '<span style="font-weight:700;">بلندی صدا</span>' +
        '<input type="range" class="vol-range" min="0" max="100" step="10" value="' + v + '" aria-label="بلندی صدا"' +
          ' oninput="FGApp.setSoundVolume(this.value)" onchange="FGApp.setSoundVolume(this.value, true)" />' +
        '<button class="btn btn-secondary btn-sm" onclick="FGApp.testSound()">🔊 امتحان</button>' +
      '</div>' +
      '<div class="vol-hint">صدا از «صدای رسانه» در گوشی پخش می‌شود؛ اگر صدایی نمی‌شنوی، دکمهٔ بلندی صدای گوشی را بزن.</div>';
  }
  function setSoundVolume(v, commit) {
    var st = window.FGStore.getState();
    var n = Math.max(0, Math.min(100, Math.round(Number(v) || 0)));
    st.soundVolume = n;
    if (window.FGSound) window.FGSound.setVolume(n / 100);
    document.querySelectorAll('.vol-range').forEach(function (r) { if (String(r.value) !== String(n)) r.value = n; });
    if (commit) {
      window.FGStore.saveState();
      if (window.FGSound && st.soundOn !== false) window.FGSound.play('select');
    }
  }
  function testSound() {
    var st = window.FGStore.getState();
    if (st.soundOn === false) { showToast('🔇 اول «صدا» را روشن کن'); return; }
    if (window.FGSound) { window.FGSound.unlock(); window.FGSound.play('correct'); }
  }

  /* ------------------------------------------------------------ v2.14 English voice (TTS) help */
  function ttsReadyNow() {
    try { return !!(window.FGStore.isTtsReady && window.FGStore.isTtsReady()); } catch (e) { return true; }
  }
  function openTtsGuide() {
    openSheet(
      '<div class="sheet-head"><div class="sheet-title">🔈 صدای انگلیسی گوشی</div>' +
        '<button class="sheet-close" onclick="FGApp.closeModal()" aria-label="بستن">✕</button></div>' +
      '<div class="sheet-intro">برای شنیدن تلفظ، گوشی باید یک «موتور تبدیل متن به گفتار» با زبان انگلیسی داشته باشد. این کار فقط یک بار لازم است:</div>' +
      '<ol class="tts-steps">' +
        '<li>دکمهٔ پایین را بزن تا تنظیمات صدای گوشی باز شود.</li>' +
        '<li>' + mixed('یک موتور انتخاب کن (مثلاً Speech Services by Google یا موتور خود گوشی).') + '</li>' +
        '<li>' + mixed('در تنظیمات همان موتور، زبان English را نصب یا انتخاب کن.') + '</li>' +
        '<li>به فرهنگ‌گرام برگرد؛ دکمه‌های 🔊 کار می‌کنند.</li>' +
      '</ol>' +
      '<button class="btn btn-primary" onclick="FGApp.openTtsSettings()">باز کردن تنظیمات صدای گوشی</button>' +
      '<button class="btn btn-ghost" style="margin-top:8px;" onclick="FGApp.closeModal()">بعداً</button>'
    );
  }
  function openTtsSettings() {
    var ok = false;
    try { var b = window.AndroidBridge; if (b && typeof b.openTtsSettings === 'function') ok = !!b.openTtsSettings(); } catch (e) {}
    closeModal();
    if (!ok) showToast('تنظیمات گوشی ← زبان و ورودی ← خروجی متن به گفتار', 4200);
  }
  var ttsHelpShown = false;
  /** a 🔊 that cannot speak: the guide once per session, then a short reminder */
  function onTtsUnavailable() {
    if (!ttsHelpShown) { ttsHelpShown = true; openTtsGuide(); return; }
    showToast('🔈 صدای انگلیسی گوشی آماده نیست — راهنما در «من»');
  }

  function selectOrBuyTheme(themeId) {
    var st = window.FGStore.getState();
    if (themeId === 'auto') {
      st.theme = 'auto';
      applyTheme('auto');
      window.FGStore.saveState();
      sh('pop');
      renderRewards();
      showToast('🌗 ظاهر برنامه مثل گوشی شد');
      return;
    }
    var th = window.FGStore.THEMES.filter(function (t) { return t.id === themeId; })[0];
    if (!th) return;
    if (!th.dark) st.lastLightTheme = themeId;            // «☀️ روشن» in «من» comes back to it
    st.themeHintDone = true;
    /* v2.14: a free theme (the dark one included) is simply chosen — no purchase, no coins */
    if (th.cost === 0 && !th.prestigeLessons && st.unlockedThemes.indexOf(themeId) === -1) st.unlockedThemes.push(themeId);
    if (st.unlockedThemes.indexOf(themeId) !== -1) {
      st.theme = themeId;
      applyTheme(themeId);
      window.FGStore.saveState();
      sh('pop');
      renderRewards();
      if (th.dark) showToast('🌙 ظاهر تاریک فعال شد');
      return;
    }
    if (th.prestigeLessons) {
      showToast('🏅 برای این تم باید ۵ درس را کامل کنی.');
      sh('wrong');
      return;
    }
    if (st.coins < th.cost) {
      showToast('🪙 سکه کافی نیست. هدف روزانه را کامل کن تا سکه بگیری.');
      sh('wrong');
      return;
    }
    st.coins -= th.cost;
    st.unlockedThemes.push(themeId);
    st.theme = themeId;
    applyTheme(themeId);
    window.FGStore.saveState();
    sh('fanfare');
    refreshHeaderHud();
    renderRewards();
    showToast('🎨 تم جدید باز شد!');
  }

  function toggleAccent() {
    var st = window.FGStore.getState();
    st.accent = st.accent === 'US' ? 'UK' : 'US';
    window.FGStore.saveState();
    showToast('لهجه: ' + st.accent);
    renderMe();
  }
  function toggleSound() {
    var st = window.FGStore.getState();
    st.soundOn = !st.soundOn;
    window.FGStore.saveState();
    if (window.FGSound) window.FGSound.setEnabled(st.soundOn);
    showToast(st.soundOn ? '🔊 صدا روشن شد' : '🔇 صدا خاموش شد');
    renderMe();
  }
  function toggleVibration() {
    var st = window.FGStore.getState();
    st.vibrateOn = !st.vibrateOn;
    window.FGStore.saveState();
    if (window.FGSound) window.FGSound.setHaptics(st.vibrateOn);
    showToast(st.vibrateOn ? '📳 لرزش روشن شد' : '📴 لرزش خاموش شد');
    renderMe();
  }
  function cycleDailyGoal() {
    var st = window.FGStore.getState();
    var opts = [5, 10, 15];
    var i = opts.indexOf(st.dailyGoalMin || 5);
    st.dailyGoalMin = opts[(i + 1) % opts.length];
    window.FGStore.saveState();
    showToast('🎯 هدف روزانه: ' + faNum(st.dailyGoalMin) + ' دقیقه');
    renderMe();
    renderPath();
  }
  function buyStreakFreeze() {
    var st = window.FGStore.getState();
    if (st.coins < 25) { showToast('🪙 برای سپر یخی ۲۵ سکه لازم است.'); sh('wrong'); return; }
    st.coins -= 25;
    st.streakFreezes = (st.streakFreezes || 0) + 1;
    window.FGStore.saveState();
    sh('pop');
    refreshHeaderHud();
    renderRewards();
    showToast('❄️ سپر یخی اضافه شد!');
  }
  function claimDailyChest() {
    var st = window.FGStore.getState();
    if (st.dailyQuests.chestClaimed) return;
    st.dailyQuests.chestClaimed = true;
    window.FGStore.addReward(30, 20);
    sh('fanfare');
    window.FGMascot.confetti(document.getElementById('confetti-layer'), 26);
    showToast('🎁 هدف روزانه کامل شد: +۳۰ امتیاز و +۲۰ سکه!');
    refreshHeaderHud();
    renderRewards();
  }
  function toggleBookmark(itemId) {
    var st = window.FGStore.getState();
    if (st.bookmarks[itemId]) delete st.bookmarks[itemId];
    else st.bookmarks[itemId] = true;
    window.FGStore.saveState();
    sh('tap');
    renderBankResults();
    applyA11y(document.getElementById('bank-results'));
  }

  function toggleBookmarkInList(itemId) { toggleBookmark(itemId); }
  function bookmarkOrSrsToast(itemId) {
    var added = window.FGStore.addItemToSrs(itemId, false);
    refreshHeaderHud();
    showToast(added ? '✅ به مرور هوشمند اضافه شد' : 'این الگو از قبل در مرور است.');
  }
  function onBankSearch(v) {
    bankSearchQuery = v;
    bankLimit = 8;
    renderBankResults();
    applyA11y(document.getElementById('bank-results'));
  }
  function showMoreResults() {
    bankLimit += 8;
    renderBankResults();
    applyA11y(document.getElementById('bank-results'));
  }
  function toggleBankStarFilter() {
    bankFilterOnlyStarred = !bankFilterOnlyStarred;
    bankLimit = 8;
    renderMe();
  }
  function practiceWeakRule(familyId) {
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startWeakPractice) window.FG_Games.startWeakPractice(familyId);
  }
  function launchPlacementTest() {
    closeModal();
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startPlacementTest) window.FG_Games.startPlacementTest();
  }
  function launchQuickMode(mode) {
    switchTab('practice');
    if (window.FG_Games && window.FG_Games.startMode) window.FG_Games.startMode(mode);
  }
  function buildExamPlan() {
    var inp = document.getElementById('exam-date-input');
    if (!inp || !inp.value) { showToast('⚠️ اول تاریخ امتحان را انتخاب کن.'); return; }
    var plan = window.FGStore.setExamPlan(inp.value, 7);
    window.FGStore.saveState();
    showToast(plan && plan.days && plan.days.length ? '🗓️ برنامهٔ مرور ساخته شد.' : '⚠️ تاریخ معتبر نیست.');
    renderPath();
  }
  /** «۱۲» / «١٢» / «12» → 12; anything else → fallback */
  function parseCount(v, fallback) {
    var t = String(v == null ? '' : v).trim()
      .replace(/[۰-۹]/g, function (d) { return String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)); })
      .replace(/[٠-٩]/g, function (d) { return String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)); });
    return /^\d{1,4}$/.test(t) ? parseInt(t, 10) : fallback;
  }
  function saveSrsLimits() {
    var nEl = document.getElementById('srs-new-limit');
    var rEl = document.getElementById('srs-reviews-limit');
    if (!nEl || !rEl) return;
    /* an empty / unreadable field keeps the current value — it never silently becomes 0 */
    var cur = window.FGStore.getSrsLimits();
    var lim = window.FGStore.setSrsLimits(parseCount(nEl.value, cur.newPerDay), parseCount(rEl.value, cur.reviewsPerDay));
    showToast('✅ ذخیره شد: ' + faNum(lim.newPerDay) + ' جدید و ' + faNum(lim.reviewsPerDay) + ' مرور در روز');
    renderMe();
  }
  function openTelegramSupport() {
    var b = window.AndroidBridge || window.NativeBridge;
    try {
      if (b && typeof b.openTelegramSupport === 'function') { b.openTelegramSupport(); return; }
      if (typeof window.open === 'function') { window.open('https://t.me/TeachSpot', '_blank', 'noopener,noreferrer'); return; }
    } catch (e) {}
    showToast('تلگرام: @TeachSpot');
  }
  function copyTelegramSupport() {
    var contact = '@TeachSpot', b = window.AndroidBridge || window.NativeBridge;
    try {
      if (b && typeof b.copyText === 'function') { b.copyText(contact); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contact).then(function () { showToast('شناسه کپی شد ✓'); }, function () { showToast('شناسه: ' + contact); });
        return;
      }
    } catch (e) {}
    showToast('شناسه: ' + contact);
  }
  /** Legacy API (v2.6 done card). v2.7.0: it only ever AWARDS the star — the old
      version took the star away on a replay — and it leaves focus mode through
      closeLesson(), so the header and the tab bar always come back. */
  function toggleLessonMastery(gid, lessonId) {
    var st = window.FGStore.getState();
    var key = gid + '_' + lessonId;
    var fresh = !st.masteredLessons[key];
    if (fresh) {
      st.masteredLessons[key] = true;
      window.FGStore.addReward(15, 0);
      sh('star');
      if (window.FGMascot) window.FGMascot.confetti(document.getElementById('confetti-layer'), 24);
    }
    window.FGStore.saveState();
    closeLesson();
    refreshHeaderHud();
    if (fresh) showToast('🏅 آفرین! درس کامل شد');
  }
  function answerDiscoveryLegacyAlias(oi) { answerDiscoveryLegacy(oi); }

  /* ------------------------------------------------------------- a11y */
  function applyA11y(root) {
    var scope = root || document;
    var btns = scope.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      if (!b.getAttribute('type')) b.setAttribute('type', 'button');
      if (!b.getAttribute('aria-label')) {
        var t = (b.textContent || '').replace(/\s+/g, ' ').trim();
        if (t) b.setAttribute('aria-label', t);
      }
    }
    var inputs = scope.querySelectorAll('input, select, textarea');
    for (var j = 0; j < inputs.length; j++) {
      var el = inputs[j];
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
        var ph = el.getAttribute('placeholder') || el.getAttribute('name') || '';
        if (ph) el.setAttribute('aria-label', ph);
      }
    }
    var toast = document.getElementById('app-toast');
    if (toast && !toast.getAttribute('aria-live')) {
      toast.setAttribute('aria-live', 'polite');
      toast.setAttribute('role', 'status');
    }
  }
  function initA11y() {
    applyA11y();
    if (typeof MutationObserver === 'undefined') return;
    var ids = ['path-container', 'practice-container', 'rewards-container', 'me-container'];
    var observer = new MutationObserver(function () { applyA11y(); });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el, { childList: true, subtree: true });
    });
  }

  /* ------------------------------------------------- android back button */
  /**
   * Called by MainActivity.onBackPressed(). Returns 'HANDLED' when the app
   * consumed the back press (lesson closed / sheet closed / back to path),
   * otherwise 'EXIT' lets Android show the "press again to exit" toast.
   */
  function handleAndroidBack() {
    try {
      var ob = document.getElementById('onboarding');
      if (ob && !ob.hidden) {
        if (obStep > 0) { obStep -= 1; renderOnboarding(); return 'HANDLED'; }
        return 'EXIT';
      }
      var bd = document.getElementById('app-sheet-backdrop');
      if (bd && bd.classList.contains('open')) {
        closeModal();
        return 'HANDLED';
      }
      if (lessonFlow) {
        pauseLesson();
        return 'HANDLED';
      }
      /* G25 (v2.17.0): a grammar game lives in the practice tab; Back used to switch the tab underneath while the game
         stayed on screen (the tab bar said «مسیر» and the learner still saw the question). Back now leaves the game
         exactly like its own ✕ does, then the next Back goes home. */
      var gc = document.getElementById('games-container');
      if (gc && !gc.hidden && window.FG_Games && typeof window.FG_Games.exitArena === 'function') {
        window.FG_Games.exitArena();
        return 'HANDLED';
      }
      if (currentTab !== 'path') {
        switchTab('path');
        return 'HANDLED';
      }
    } catch (e) {}
    return 'EXIT';
  }
  window.handleAndroidBack = handleAndroidBack;

  /* ------------------------------------------------------------- init */
  /* v2.13: with the soft keyboard open (adjustResize ≈ 300px left on a small phone) the tab bar
     hid the field being typed in — the bar steps aside and the field is scrolled into view */
  function watchSoftKeyboard() {
    var vpMax = window.innerHeight, vpW = window.innerWidth;
    function typingEl() {
      var a = document.activeElement;
      return a && (a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && !/^(button|checkbox|radio|range|submit)$/i.test(a.type || ''))) ? a : null;
    }
    window.addEventListener('resize', function () {
      if (window.innerWidth !== vpW) { vpW = window.innerWidth; vpMax = window.innerHeight; }
      if (window.innerHeight > vpMax) vpMax = window.innerHeight;
      var a = typingEl();
      var kb = !!a && window.innerHeight < vpMax * 0.75;
      document.body.classList.toggle('kb-open', kb);
      if (kb) setTimeout(function () { try { a.scrollIntoView({ block: 'center' }); } catch (e) {} }, 80);
    });
    document.addEventListener('focusout', function () {
      setTimeout(function () { if (!typingEl()) document.body.classList.remove('kb-open'); }, 60);
    });
  }

  /* v2.17 (R11): a quick double tap on an «advance» control (a lesson «بعدی»/«سؤال بعدی», an answer option, the
     onboarding buttons, an arena option/«بعدی») sent its 2nd tap to what the 1st had just rendered under the finger: a
     teaching card or the feedback was skipped unseen. A FINGER tap that lands elsewhere within 0.4 s of such a tap is
     ignored. Only finger taps (a touchend just before the click) are filtered — FGApp.nextLessonCard(), el.click() and
     the keyboard are never touched; fast taps on word tokens (not «advance» controls) stay fast. */
  function installDoubleTapShield() {
    var ADVANCE = '#path-container .btn-primary, #path-container .option-btn, #path-container .fa-opt, #ob-inner .btn-primary, ' +
      '#ob-inner .option-btn, #games-container .option-btn, #games-container .btn-primary';
    var lastTouchEnd = 0, lastAt = 0, lastEl = null;
    document.addEventListener('touchend', function () { lastTouchEnd = Date.now(); }, true);
    document.addEventListener('click', function (e) {
      var now = Date.now(), t = e.target;
      if (now - lastTouchEnd > 700 || !t || !t.closest) return;
      if (lastEl && now - lastAt < 400 && !lastEl.contains(t)) { e.stopPropagation(); e.preventDefault(); return; }
      var adv = t.closest(ADVANCE);
      lastEl = adv; lastAt = adv ? now : 0;
    }, true);
  }

  /* v2.17 (R7/R8): the storage reports of db.js reach the learner — each distinct message once per run, calmly — and the
     technical report. (Nothing listened before: a full storage or an unreadable saved state was silent.) */
  function listenStorageIssues() {
    var shown = {};
    if (!window.FGStore || typeof window.FGStore.onStorageIssue !== 'function') return;
    window.FGStore.onStorageIssue(function (issue) {
      if (!issue || !issue.message) return;
      try { if (window.SafetyNet) window.SafetyNet.log('storage: ' + issue.message + (issue.error ? ' (' + issue.error + ')' : ''), 'db.js'); } catch (e) {}
      if (shown[issue.message]) return;
      shown[issue.message] = true;
      setTimeout(function () { showToast('⚠️ ' + issue.message, 5200); }, 300);
    });
  }

  function init() {
    listenStorageIssues();
    watchSoftKeyboard();
    installDoubleTapShield();
    var st = window.FGStore.loadState();
    applyTheme(st.theme);
    if (window.FGSound) {
      window.FGSound.setEnabled(st.soundOn !== false);
      window.FGSound.setVolume((typeof st.soundVolume === 'number' ? st.soundVolume : 80) / 100);
      window.FGSound.setHaptics(st.vibrateOn !== false);
      // guarantees a click sound on EVERY button, even if its own
      // handler forgets to ask for one
      window.FGSound.attachGlobalFeedback();
    }
    refreshHeaderHud();
    switchTab('path');
    initA11y();
    if (!st.onboarded) showOnboarding();
    /* v2.17 (R14): back to the front after a day or more → today's quests and the streak are settled, the header follows */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden || !window.FGStore || typeof window.FGStore.refreshDay !== 'function') return;
      try { window.FGStore.refreshDay(); refreshHeaderHud(); } catch (e) {}
    });
    if (st.darkRefundPending) {
      st.darkRefundPending = false;
      window.FGStore.saveState();
      setTimeout(function () { showToast('🌙 ظاهر تاریک حالا رایگان است؛ ۲۰ سکه‌ات برگشت.', 4200); }, 900);
    }
    try {
      if (window.matchMedia) {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        var onScheme = function () {
          /* only a plain browser relies on this; inside the app Android pushes onSystemNightChanged */
          if (window.FGStore.getState().theme === 'auto' && sysDarkOverride === null) applyTheme('auto');
        };
        if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onScheme);
        else if (typeof mq.addListener === 'function') mq.addListener(onScheme);
      }
    } catch (e) {}
  }

  /* ----------------------------------------------------------- exports */
  window.FGApp = {
    init: init,
    switchTab: switchTab,
    selectGrade: pickGradeFromModal,
    openMistakeClinic: openMistakeClinic,
    launchQuickMode: launchQuickMode,
    claimDailyChest: claimDailyChest,
    answerDiscovery: answerDiscovery,
    selectLesson: selectLesson,
    tapPathNode: tapPathNode,
    skipToLesson: skipToLessonUi,
    skipNextLesson: skipNextLesson,
    practiceCurrentLesson: function () {
      var st = window.FGStore.getState();
      selectLesson(st.selectedGrade, st.selectedLessonByGrade[st.selectedGrade] || 1);
    },
    addLessonToLeitner: function () { showToast('برای مرور، از «مرور هوشمند» استفاده کن.'); },
    toggleLessonMastery: toggleLessonMastery,
    setLeitnerFilter: function () {},
    guessLeitnerOption: guessLeitnerOption,
    revealLeitnerCard: revealLeitnerCard,
    rateLeitner: rateLeitner,
    seedMoreLeitnerCards: function () { showToast('کارت‌های بیشتری برای مرور داری 🌱'); },
    startSmartReview: startSmartReview,
    closeSmartReview: closeSmartReview,
    setProfileSubTab: function () {},
    onBankSearch: onBankSearch,
    showMoreResults: showMoreResults,
    toggleBankStarFilter: toggleBankStarFilter,
    toggleBookmark: toggleBookmark,
    bookmarkOrSrsToast: bookmarkOrSrsToast,
    selectOrBuyTheme: selectOrBuyTheme,
    toggleAccent: toggleAccent,
    toggleSound: toggleSound,
    toggleVibration: toggleVibration,
    cycleDailyGoal: cycleDailyGoal,
    buyStreakFreeze: buyStreakFreeze,
    openGradePickerModal: openGradePickerModal,
    pickGradeFromModal: pickGradeFromModal,
    openLessonList: openLessonList,
    pickLessonFromList: pickLessonFromList,
    openNoteModal: openNoteModal,
    savePersonalNote: savePersonalNote,
    openBackupModal: openBackupModal,
    copyBackupJson: copyBackupJson,
    restoreBackupJson: restoreBackupJson,
    applyBackup: applyBackup,
    isValidBackup: isValidBackup,
    exportBackupFile: exportBackupFile,
    shareBackupFile: shareBackupFile,
    importBackupFile: importBackupFile,
    confirmRestore: confirmRestore,
    undoLastRestore: undoLastRestore,
    handleImportedText: handleImportedText,
    openShareCard: openShareCard,
    shareProgressImage: shareProgressImage,
    saveProgressImage: saveProgressImage,
    buildProgressCanvas: buildProgressCanvas,
    openClassMode: openClassMode,
    openClassStudent: openClassStudent,
    openClassTeacher: openClassTeacher,
    onClassCodeInput: onClassCodeInput,
    startClassFromSheet: startClassFromSheet,
    importClassFile: importClassFile,
    classPickGrade: classPickGrade,
    classToggleLesson: classToggleLesson,
    classPickCount: classPickCount,
    classSetTitle: classSetTitle,
    createClassCode: createClassCode,
    copyClassCode: copyClassCode,
    shareClassCode: shareClassCode,
    shareAssignmentFile: shareAssignmentFile,
    shareClassResultImage: shareClassResultImage,
    shareClassResultFile: shareClassResultFile,
    openPlacementChooser: openPlacementChooser,
    openDeviceCheck: openDeviceCheck,
    runDeviceCheck: runDeviceCheck,
    deviceCheckSample: deviceCheckSample,
    deviceCheckVibrate: deviceCheckVibrate,
    deviceCheckSpeak: deviceCheckSpeak,
    copyDeviceCheck: copyDeviceCheck,
    launchGradePlacement: launchGradePlacement,
    startOnboardPlacement: startOnboardPlacement,
    openSettings: openSettings,
    openAboutInMe: openAboutInMe,
    closeModal: closeModal,
    refreshHeaderHud: refreshHeaderHud,
    practiceWeakRule: practiceWeakRule,
    launchPlacementTest: launchPlacementTest,
    buildExamPlan: buildExamPlan,
    saveSrsLimits: saveSrsLimits,
    applyA11y: applyA11y,
    showToast: showToast,
    hideToast: hideToast,
    onSystemNightChanged: onSystemNightChanged,
    setAppearance: setAppearance,
    acceptThemeHint: acceptThemeHint,
    dismissThemeHint: dismissThemeHint,
    setSoundVolume: setSoundVolume,
    testSound: testSound,
    openTtsGuide: openTtsGuide,
    openTtsSettings: openTtsSettings,
    onTtsUnavailable: onTtsUnavailable,
    retryLessonPractice: retryLessonPractice,
    practiceLessonMix: practiceLessonMix,
    lessonPlayListen: lessonPlayListen,
    lessonSkipListening: lessonSkipListening,
    finishLessonGo: finishLessonGo,
    showPracticeTab: showPracticeTab,
    nextLessonCard: nextLessonCard,
    closeLesson: closeLesson,
    pauseLesson: pauseLesson,
    answerLessonPractice: answerLessonPractice,
    pickOnboardGrade: pickOnboardGrade,
    pickOnboardGoal: pickOnboardGoal,
    pickOnboardMini: pickOnboardMini,
    nextOnboard: nextOnboard,
    finishOnboard: finishOnboard,
    openTelegramSupport: openTelegramSupport,
    copyTelegramSupport: copyTelegramSupport,
    renderPath: renderPath,
    renderPractice: renderPractice,
    renderRewards: renderRewards,
    renderMe: renderMe,
    cheer: cheer,
    encourage: encourage
  };

  // v2.17 (U4): a failed start shows the calm «بازگشت به خانه» card of js/safety_net.js instead of a white page
  function boot() {
    if (window.SafetyNet) window.SafetyNet.started();
    try { init(); } catch (e) {
      if (window.console && console.error) console.error('[FarhangGram] init failed', e);
      if (window.SafetyNet) window.SafetyNet.bootFail(e);
      return;
    }
    if (window.SafetyNet) window.SafetyNet.booted();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
