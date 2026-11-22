// FarhangLex Creative Vocabulary Games Engine (v3.3.0)
// 4 Research-Backed Interactive Modes:
// 1. pic4     — 4-Picture Visual Match (Drops / Duolingo Dual-Coding)
// 2. match    — Speed Pair-Matching Board (Quizlet Match / Duolingo Tap-Pairs)
// 3. scramble — Touch Letter-Tile Word Builder (Memrise / WordUp Orthographic Recall)
// 4. blitz    — 30-Second True/False Arcade Blitz (Fluency & Automaticity)
(function (window) {
  'use strict';

  const CREATIVE_MODES = ['pic4', 'match', 'scramble', 'blitz', 'order'];

  let activeMode = '';
  let gameTimer = null;

  // --- Mode 1: pic4 state ---
  let picRounds = [];
  let picIdx = 0;
  let picScore = 0;
  let picCombo = 0;
  let picAnswered = false;

  // --- Mode 2: match state ---
  let matchWaves = [];
  let matchWaveIdx = 0;
  let matchLeft = [];
  let matchRight = [];
  let selLeftId = null;
  let selRightId = null;
  let matchedIds = {};
  let matchErrors = 0;
  let matchCombo = 0;
  let matchStartMs = 0;
  let matchElapsedTenths = 0;
  let matchBusy = false;

  // --- Mode 3: scramble state ---
  let scrRounds = [];
  let scrIdx = 0;
  let scrScore = 0;
  let scrSlots = []; // { ch, fixed, tileIdx }
  let scrTiles = []; // { ch, used }
  let scrAnswered = false;
  let scrHintUsed = false;

  // --- Mode 5 (4.1.0 Phase C): sentence-order state ---
  let ordRounds = [];
  let ordIdx = 0;
  let ordScore = 0;
  let ordTokens = []; // correct token sequence of the current book sentence
  let ordTiles = [];  // { text, used }
  let ordPlaced = []; // tile indices in placed order
  let ordAnswered = false;

  // --- Mode 4: blitz state ---
  let blitzStarted = false;
  let blitzFinished = false;
  let blitzRemTenths = 300; // 30.0s
  let blitzScore = 0;
  let blitzCorrect = 0;
  let blitzTotal = 0;
  let blitzCombo = 0;
  let blitzCurrent = null; // { item, shownMeaning, isTrue }
  let blitzLocked = false;

  function B() {
    return window.FarhangLexBridge;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function stopTimers() {
    if (gameTimer) {
      clearInterval(gameTimer);
      gameTimer = null;
    }
  }

  function isCreativeMode(mode) {
    return CREATIVE_MODES.indexOf(mode) !== -1;
  }

  function stageEl() {
    return document.getElementById('quiz-creative-stage');
  }

  // v3.11 (F17): after every render, bring the board (or «next») on screen on small phones — see app.js revealQuizPrimary
  function reveal() {
    if (B().revealArea) B().revealArea();
  }

  function startMode(mode, autoSpeakFirst) {
    stopTimers();
    activeMode = mode;
    const st = stageEl();
    if (!st) return;

    const vocab = B().getFilteredQuizVocab();
    const allVocab = B().getAllGradeVocab();

    if (!vocab || vocab.length < 2 || allVocab.length < 4) {
      st.innerHTML = '<div class="quiz-card-surface" style="text-align:center;padding:24px 12px;">' +
        '<p style="font-size:13px;color:var(--text-muted);">تعداد واژگان این درس برای اجرای بازی کافی نیست؛ لطفاً «همهٔ درس‌ها» را انتخاب کنید.</p>' +
      '</div>';
      return;
    }

    if (mode === 'pic4') initPic4(vocab, allVocab, autoSpeakFirst);
    else if (mode === 'match') initMatch(vocab, allVocab);
    else if (mode === 'scramble') initScramble(vocab, autoSpeakFirst);
    else if (mode === 'blitz') initBlitz();
    else if (mode === 'order') initOrder(vocab);
  }

  // =========================================================================
  // 1. بازی تصویرخوان (۴ تصویر و ۱ واژه — Drops / Duolingo Visual Pick)
  // =========================================================================
  function initPic4(vocab, allVocab, autoSpeakFirst) {
    // v3.8.0: only answer-safe pictures (real illustration, no fallback initials, no word written in the drawing)
    const safe = B().isPicSafe || function () { return true; };
    let targets = vocab.filter(safe);
    if (targets.length < 2) targets = allVocab.filter(safe);
    const picks = shuffle(targets).slice(0, Math.min(6, targets.length));
    picRounds = picks.map(function (target) {
      let distractors;
      if (B().getVisualDistractors) {
        distractors = B().getVisualDistractors(target, 3);
      } else {
        const pool = allVocab.filter(function (v) {
          return safe(v) && v.id !== target.id && v.word.toLowerCase() !== target.word.toLowerCase() && v.meaning !== target.meaning;
        });
        distractors = shuffle(pool).slice(0, 3);
      }
      const options = shuffle([target].concat(distractors));
      return {
        target: target,
        options: options,
        correctIdx: options.findIndex(function (o) { return o.id === target.id; })
      };
    });
    picIdx = 0;
    picScore = 0;
    picCombo = 0;
    picAnswered = false;
    renderPic4(autoSpeakFirst);
  }

  function renderPic4(shouldSpeak) {
    const st = stageEl();
    if (!st) return;
    if (picIdx >= picRounds.length) {
      const pct = Math.round((picScore / picRounds.length) * 100);
      st.innerHTML = renderTrophyCard(
        '🖼️ کارنامهٔ بازی تصویرخوان',
        'تطبیق مستقیم واژه و تصویر: <strong>' + B().toFa(picScore) + '</strong> از <strong>' + B().toFa(picRounds.length) + '</strong> (' + B().toFa(pct) + '٪)',
        'pic4',
        picScore,
        picRounds.length
      );
      return;
    }

    const r = picRounds[picIdx];
    const t = r.target;
    picAnswered = false;

    let cardsHtml = '';
    r.options.forEach(function (opt, idx) {
      const src = B().getImgSrc(opt);
      const fb = B().getFallbackImg(opt).replace(/'/g, '%27');
      cardsHtml += '<button type="button" class="pic4-card" id="pic4-opt-' + idx + '" onclick="CreativeGames.pickPic4(' + idx + ')">' +
        '<img src="' + src + '" alt="گزینهٔ تصویری" class="pic4-img" onerror="this.onerror=null;this.src=\'' + fb + '\'">' +
        '<span class="pic4-caption" id="pic4-cap-' + idx + '">تصویر ' + B().toFa(idx + 1) + '</span>' +
      '</button>';
    });

    const blBadge = B().getBookLessonBadge ? B().getBookLessonBadge(t) : ('درس ' + B().toFa(t.lesson));
    st.innerHTML = '' +
      '<div class="game-top-meta">' +
        '<span>مرحله ' + B().toFa(picIdx + 1) + ' از ' + B().toFa(picRounds.length) + '</span>' +
        (picCombo >= 2 ? '<span class="combo-pill">🔥 کمبو ×' + B().toFa(picCombo) + '</span>' : '<span class="chip-page">' + B().esc(blBadge) + '</span>') +
      '</div>' +
      '<div class="quiz-card-surface">' +
        '<div style="text-align:center;margin-bottom:10px;">' +
          (picCombo >= 2 ? '<div style="margin-bottom:6px;"><span class="chip-page">' + B().esc(blBadge) + '</span></div>' : '') +
          '<div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">کدام تصویر مفهوم این واژه را نشان می‌دهد؟</div>' +
          '<div class="term-title-row" dir="ltr" style="justify-content:center;">' +
            '<span class="term-title" style="font-size:24px;margin:0;">' + B().esc(t.word) + '</span>' +
            '<button type="button" class="inline-word-speaker" onclick="CreativeGames.speakPicTarget()" title="تلفظ واژه" aria-label="تلفظ واژه">' + speakerSvg() + '</button>' +
          '</div>' +
          '<div class="term-phonetic" dir="ltr" style="margin-bottom:4px;">' + B().esc(B().getPhonetic(t)) + '</div>' +
        '</div>' +
        '<div class="pic4-grid">' + cardsHtml + '</div>' +
        '<div class="quiz-feedback-box" id="pic4-fb"></div>' +
        '<button type="button" class="quiz-next-action" id="pic4-next-btn" onclick="CreativeGames.nextPic4()">مرحلهٔ بعدی ⬅️</button>' +
      '</div>';

    reveal();
    if (shouldSpeak && B().isQuizTabActive()) {
      setTimeout(function () { B().speakWord(t, false); }, 140);
    }
  }

  function speakPicTarget() {
    const r = picRounds[picIdx];
    if (r && r.target) B().speakWord(r.target, false);
  }

  function pickPic4(idx) {
    if (picAnswered) return;
    picAnswered = true;
    const r = picRounds[picIdx];
    const t = r.target;
    const isOk = idx === r.correctIdx;

    r.options.forEach(function (opt, i) {
      const btn = document.getElementById('pic4-opt-' + i);
      const cap = document.getElementById('pic4-cap-' + i);
      if (cap) cap.textContent = opt.word + ' (' + opt.meaning + ')';
      if (!btn) return;
      btn.disabled = true; // F44: choices cannot be selected again after feedback.
      if (i === r.correctIdx) btn.classList.add('correct');
      else if (i === idx && !isOk) btn.classList.add('wrong');
      else btn.style.opacity = '0.58';
    });

    if (isOk) {
      picScore++;
      picCombo++;
      B().recordAnswer(t.id, true, 2, picCombo);
    } else {
      picCombo = 0;
      B().recordAnswer(t.id, false, 0, 0);
    }

    const fb = document.getElementById('pic4-fb');
    if (fb) {
      fb.className = 'quiz-feedback-box show ' + (isOk ? 'pass' : 'fail');
      fb.innerHTML = isOk
        ? '<strong>✅ عالی! تصویر درست را شناختید (+۲ 💎)</strong><br>معنی: <strong>' + B().esc(t.meaning) + '</strong><br><span dir="ltr" style="display:inline-block;margin-top:2px;">' + B().esc(t.example) + '</span>'
        : '<strong>❌ تصویر درست مربوط به «' + B().esc(t.word) + '» (' + B().esc(t.meaning) + ') مشخص شد.</strong><br><small>واژه برای مرور به جعبهٔ ۱ لایتنر منتقل شد.</small>';
    }

    const nb = document.getElementById('pic4-next-btn');
    if (nb) {
      nb.textContent = (picIdx === picRounds.length - 1) ? 'مشاهدهٔ کارنامهٔ نهایی 📊' : 'مرحلهٔ بعدی ⬅️';
      nb.classList.add('show');
    }
    reveal();
  }

  function nextPic4() {
    picIdx++;
    renderPic4(true);
  }

  // =========================================================================
  // 2. بازی جفت‌سازی سرعتی (Quizlet Match / Duolingo Tap-Pairs)
  // =========================================================================
  function initMatch(vocab, allVocab) {
    let pool = shuffle(vocab);
    if (pool.length < 4) {
      const extra = shuffle(allVocab.filter(function (v) {
        return !pool.some(function (p) { return p.id === v.id; });
      }));
      pool = pool.concat(extra);
    }
    const totalPick = pool.length >= 8 ? 8 : 4;
    const chosen = pool.slice(0, totalPick);
    matchWaves = [];
    for (let i = 0; i < chosen.length; i += 4) {
      const chunk = chosen.slice(i, i + 4);
      if (chunk.length >= 2) matchWaves.push(chunk);
    }
    matchWaveIdx = 0;
    matchErrors = 0;
    matchCombo = 0;
    matchElapsedTenths = 0;
    matchStartMs = Date.now();
    setupMatchWave();
    startMatchClock();
  }

  function setupMatchWave() {
    const wave = matchWaves[matchWaveIdx] || [];
    matchLeft = shuffle(wave.slice());
    matchRight = shuffle(wave.slice());
    selLeftId = null;
    selRightId = null;
    matchedIds = {};
    matchBusy = false;
    renderMatchBoard();
  }

  function startMatchClock() {
    stopTimers();
    matchStartMs = Date.now() - matchElapsedTenths * 100;
    gameTimer = setInterval(function () {
      if (!B().isQuizTabActive()) return;
      matchElapsedTenths = Math.floor((Date.now() - matchStartMs) / 100);
      const clk = document.getElementById('match-clock-val');
      if (clk) clk.textContent = formatTenths(matchElapsedTenths);
    }, 100);
  }

  function formatTenths(t) {
    const sec = (t / 10).toFixed(1);
    return B().toFa(sec) + ' ثانیه';
  }

  function renderMatchBoard() {
    const st = stageEl();
    if (!st) return;

    if (matchWaveIdx >= matchWaves.length) {
      stopTimers();
      const totalPairs = matchWaves.reduce(function (acc, w) { return acc + w.length; }, 0);
      const secNum = +(matchElapsedTenths / 10).toFixed(1);
      const bestKey = 'farhanglex_match_best_' + B().getGradeId();
      const prevBest = parseFloat(localStorage.getItem(bestKey) || '0');
      let isNewRecord = false;
      if (!prevBest || secNum < prevBest) {
        try { localStorage.setItem(bestKey, String(secNum)); } catch (e) {}
        isNewRecord = true;
      }
      const bestStr = B().toFa((isNewRecord ? secNum : prevBest).toFixed(1)) + ' ثانیه';
      st.innerHTML = renderTrophyCard(
        '🧩 تختهٔ جفت‌سازی کامل شد!',
        'زمان شما: <strong>' + B().toFa(secNum.toFixed(1)) + ' ثانیه</strong> • خطاها: <strong>' + B().toFa(matchErrors) + '</strong><br>' +
        '🏆 بهترین رکورد این پایه: <strong>' + bestStr + '</strong>' + (isNewRecord ? ' <span class="combo-pill">رکورد جدید! 🎉</span>' : ''),
        'match',
        totalPairs,
        totalPairs + matchErrors
      );
      return;
    }

    let leftCol = '';
    matchLeft.forEach(function (v) {
      const done = !!matchedIds[v.id];
      const active = selLeftId === v.id;
      const safeId = v.id.replace(/'/g, "\\'");
      leftCol += '<button type="button" dir="ltr" class="match-tile match-en ' + (done ? 'matched' : '') + (active ? ' selected' : '') + '" id="ml-' + v.id + '" onclick="CreativeGames.tapMatchLeft(\'' + safeId + '\')" ' + (done ? 'disabled' : '') + '>' +
        '<span class="match-en-word">' + B().esc(v.word) + '</span>' +
        '<span class="match-en-ipa" dir="ltr">' + B().esc(B().getPhonetic(v)) + '</span>' +
      '</button>';
    });

    let rightCol = '';
    matchRight.forEach(function (v) {
      const done = !!matchedIds[v.id];
      const active = selRightId === v.id;
      const safeId = v.id.replace(/'/g, "\\'");
      const src = B().getImgSrc(v);
      const fb = B().getFallbackImg(v).replace(/'/g, '%27');
      rightCol += '<button type="button" class="match-tile match-fa ' + (done ? 'matched' : '') + (active ? ' selected' : '') + '" id="mr-' + v.id + '" onclick="CreativeGames.tapMatchRight(\'' + safeId + '\')" ' + (done ? 'disabled' : '') + '>' +
        '<img src="' + src + '" alt="" class="match-mini-img" onerror="this.onerror=null;this.src=\'' + fb + '\'">' +
        '<span class="match-fa-text">' + B().esc(v.meaning) + '</span>' +
      '</button>';
    });

    st.innerHTML = '' +
      '<div class="game-top-meta">' +
        '<span>بخش ' + B().toFa(matchWaveIdx + 1) + ' از ' + B().toFa(matchWaves.length) + '</span>' +
        '<span id="match-clock-val" style="font-weight:900;color:var(--emerald-dark);">⏱️ ' + formatTenths(matchElapsedTenths) + '</span>' +
        (matchCombo >= 2 ? '<span class="combo-pill">🔥 ×' + B().toFa(matchCombo) + '</span>' : '<span>خطا: ' + B().toFa(matchErrors) + '</span>') +
      '</div>' +
      '<div class="quiz-card-surface" style="padding:14px 12px;">' +
        '<div style="font-size:12px;color:var(--text-muted);text-align:center;margin-bottom:10px;">واژهٔ انگلیسی را با تصویر و معنی فارسی آن جفت کنید:</div>' +
        '<div class="match-board-grid">' +
          '<div class="match-col">' + leftCol + '</div>' +
          '<div class="match-col">' + rightCol + '</div>' +
        '</div>' +
      '</div>';
    reveal();
  }

  function tapMatchLeft(id) {
    if (matchBusy || matchedIds[id]) return;
    selLeftId = (selLeftId === id) ? null : id;
    const item = matchLeft.find(function (x) { return x.id === id; });
    if (item && selLeftId) B().speakWord(item, false);
    if (selLeftId && selRightId) evaluateMatchPair();
    else renderMatchBoard();
  }

  function tapMatchRight(id) {
    if (matchBusy || matchedIds[id]) return;
    selRightId = (selRightId === id) ? null : id;
    if (selLeftId && selRightId) evaluateMatchPair();
    else renderMatchBoard();
  }

  function evaluateMatchPair() {
    const lId = selLeftId;
    const rId = selRightId;
    if (lId === rId) {
      matchedIds[lId] = true;
      selLeftId = null;
      selRightId = null;
      matchCombo++;
      B().recordAnswer(lId, true, 1, matchCombo);
      const wave = matchWaves[matchWaveIdx] || [];
      if (Object.keys(matchedIds).length >= wave.length) {
        matchBusy = true;
        renderMatchBoard();
        setTimeout(function () {
          matchWaveIdx++;
          setupMatchWave();
        }, 360);
      } else {
        renderMatchBoard();
      }
    } else {
      matchBusy = true;
      matchErrors++;
      matchCombo = 0;
      B().recordAnswer(lId, false, 0);
      renderMatchBoard();
      const lEl = document.getElementById('ml-' + lId);
      const rEl = document.getElementById('mr-' + rId);
      if (lEl) lEl.classList.add('mismatch');
      if (rEl) rEl.classList.add('mismatch');
      setTimeout(function () {
        selLeftId = null;
        selRightId = null;
        matchBusy = false;
        renderMatchBoard();
      }, 460);
    }
  }

  // =========================================================================
  // 3. بازی حروف‌چین (Memrise / WordUp Touch Letter Tiles)
  // =========================================================================
  function initScramble(vocab, autoSpeakFirst) {
    scrRounds = shuffle(vocab).slice(0, Math.min(6, vocab.length));
    scrIdx = 0;
    scrScore = 0;
    setupScrambleWord(autoSpeakFirst);
  }

  function setupScrambleWord(shouldSpeak) {
    if (scrIdx >= scrRounds.length) {
      renderScramble(null, true);
      return;
    }
    const target = scrRounds[scrIdx];
    const clean = target.word.trim();
    scrSlots = [];
    const letters = [];
    for (let i = 0; i < clean.length; i++) {
      const ch = clean.charAt(i);
      if (/[a-zA-Z]/.test(ch)) {
        scrSlots.push({ expected: ch.toLowerCase(), ch: '', fixed: false, tileIdx: -1 });
        letters.push(ch.toLowerCase());
      } else {
        scrSlots.push({ expected: ch, ch: ch, fixed: true, tileIdx: -1 });
      }
    }
    let shuffled = shuffle(letters);
    if (shuffled.length > 1 && shuffled.join('') === letters.join('')) {
      shuffled = shuffled.slice(1).concat(shuffled[0]);
    }
    scrTiles = shuffled.map(function (c) { return { ch: c, used: false }; });
    scrAnswered = false;
    scrHintUsed = false;
    renderScramble(null, true);
    if (shouldSpeak && B().isQuizTabActive()) {
      setTimeout(function () { B().speakWord(target, false); }, 150);
    }
  }

  // Moving to a new word or the trophy must reveal its clue again, even after the
  // previous feedback scrolled down. Ordinary letter edits keep the user's position.
  function alignScrambleStart(st) {
    const sc = document.querySelector('main.native-content-body');
    const anchor = st.querySelector('.scr-clue-row') || st.querySelector('.quiz-card-surface');
    if (!sc || !anchor) return;
    const delta = anchor.getBoundingClientRect().top - (sc.getBoundingClientRect().top + 8);
    if (delta < 0) sc.scrollTop += Math.floor(delta);
  }

  function renderScramble(focusSlot, resetSlotScroll) {
    const st = stageEl();
    if (!st) return;
    // This board is redrawn after every letter. Keep the student's horizontal position.
    const oldStrip = st.querySelector('.scr-slots-wrap');
    const oldScrollLeft = oldStrip && !resetSlotScroll ? oldStrip.scrollLeft : 0;

    if (scrIdx >= scrRounds.length) {
      const pct = Math.round((scrScore / scrRounds.length) * 100);
      st.innerHTML = renderTrophyCard(
        '🔤 کارنامهٔ بازی حروف‌چین',
        'املای صحیح ساخته‌شده: <strong>' + B().toFa(scrScore) + '</strong> از <strong>' + B().toFa(scrRounds.length) + '</strong> (' + B().toFa(pct) + '٪)',
        'scramble',
        scrScore,
        scrRounds.length
      );
      if (resetSlotScroll) alignScrambleStart(st);
      reveal();
      return;
    }

    const t = scrRounds[scrIdx];
    const src = B().getImgSrc(t);
    const fb = B().getFallbackImg(t).replace(/'/g, '%27');

    let slotsHtml = '';
    scrSlots.forEach(function (sl, i) {
      if (sl.fixed) {
        slotsHtml += '<span class="scr-sep">' + (sl.ch === ' ' ? '&nbsp;&nbsp;' : B().esc(sl.ch)) + '</span>';
      } else {
        const cls = sl.ch ? 'filled' : '';
        slotsHtml += '<button type="button" class="scr-slot ' + cls + '" data-scr-slot="' + i + '" onclick="CreativeGames.removeScrambleSlot(' + i + ')" ' + (scrAnswered || !sl.ch ? 'disabled' : '') + '>' +
          B().esc(sl.ch) +
        '</button>';
      }
    });

    let bankHtml = '';
    scrTiles.forEach(function (tl, i) {
      bankHtml += '<button type="button" class="scr-tile ' + (tl.used ? 'used' : '') + '" onclick="CreativeGames.tapScrambleTile(' + i + ')" ' + (tl.used || scrAnswered ? 'disabled' : '') + '>' +
        B().esc(tl.ch) +
      '</button>';
    });

    const scrBadge = B().getBookLessonBadge ? B().getBookLessonBadge(t) : ('درس ' + B().toFa(t.lesson));
    st.innerHTML = '' +
      '<div class="game-top-meta">' +
        '<span>واژه ' + B().toFa(scrIdx + 1) + ' از ' + B().toFa(scrRounds.length) + '</span>' +
        '<span class="chip-page">' + B().esc(scrBadge) + '</span>' +
      '</div>' +
      '<div class="quiz-card-surface scr-game-card' + (scrSlots.length > 5 ? ' scr-compact' : '') + (scrSlots.length > 9 ? ' scr-long' : '') + '">' +
        '<div class="scr-clue-row" style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:10px;">' +
          '<img src="' + src + '" alt="" class="card-illustration-img" style="width:88px;height:88px;flex-shrink:0;" onerror="this.onerror=null;this.src=\'' + fb + '\'">' +
          '<div class="scr-clue-copy" style="text-align:right;">' +
            '<div class="scr-clue-label" style="font-size:12px;color:var(--text-muted);">معنی فارسی واژه:</div>' +
            '<div class="scr-clue-meaning" style="font-size:18px;font-weight:900;color:var(--emerald-dark);margin:2px 0 6px 0;">' + B().esc(t.meaning) + '</div>' +
            (scrSlots.length > 5 ? '' : '<button type="button" class="sentence-audio-action" onclick="CreativeGames.speakScrambleTarget()">🔊 پخش تلفظ واژه</button>') +
          '</div>' +
          (scrSlots.length > 5 ? '<button type="button" class="sentence-audio-action scr-clue-audio" aria-label="پخش تلفظ واژه" title="پخش تلفظ واژه" onclick="CreativeGames.speakScrambleTarget()">🔊</button>' : '') +
        '</div>' +

        (scrSlots.length > 9 ? '<div class="scr-scroll-note">برای ویرایش خانه‌ها، ردیف را بکشید ↔</div>' : '') +
        '<div class="scr-slots-wrap" dir="ltr">' + slotsHtml + '</div>' +
        '<div class="scr-bank-wrap" dir="ltr">' + bankHtml + '</div>' +

        (!scrAnswered ? '<div class="scr-actions">' +
          '<button type="button" class="setting-chip" onclick="CreativeGames.backspaceScramble()">⌫ حذف حرف آخر</button>' +
          '<button type="button" class="setting-chip" onclick="CreativeGames.hintScramble()">💡 راهنما (حرف بعدی)</button>' +
        '</div>' : '') +

        '<div class="quiz-feedback-box" id="scr-fb"></div>' +
        '<button type="button" class="quiz-next-action" id="scr-next-btn" onclick="CreativeGames.nextScramble()">واژهٔ بعدی ⬅️</button>' +
      '</div>';
    const strip = st.querySelector('.scr-slots-wrap');
    if (strip && scrSlots.length > 9) {
      strip.scrollLeft = oldScrollLeft;
      // The newest filled/edited slot stays visible without forcing vertical scrolling.
      if (typeof focusSlot === 'number') {
        const focus = strip.querySelector('[data-scr-slot="' + focusSlot + '"]');
        if (focus) {
          const box = strip.getBoundingClientRect(), r = focus.getBoundingClientRect();
          if (r.right > box.right - 4) strip.scrollLeft += r.right - box.right + 4;
          else if (r.left < box.left + 4) strip.scrollLeft -= box.left + 4 - r.left;
        }
      }
    }
    if (resetSlotScroll) alignScrambleStart(st);
    reveal();
  }

  function speakScrambleTarget() {
    const t = scrRounds[scrIdx];
    if (t) B().speakWord(t, false);
  }

  function tapScrambleTile(tileIdx) {
    if (scrAnswered) return;
    const tl = scrTiles[tileIdx];
    if (!tl || tl.used) return;
    const emptyIdx = scrSlots.findIndex(function (s) { return !s.fixed && !s.ch; });
    if (emptyIdx < 0) return;
    const emptySlot = scrSlots[emptyIdx];
    tl.used = true;
    emptySlot.ch = tl.ch;
    emptySlot.tileIdx = tileIdx;

    const allFilled = scrSlots.every(function (s) { return s.fixed || !!s.ch; });
    renderScramble(emptyIdx);
    if (allFilled) evaluateScramble();
  }

  function removeScrambleSlot(slotIdx) {
    if (scrAnswered) return;
    const sl = scrSlots[slotIdx];
    if (!sl || sl.fixed || !sl.ch) return;
    if (sl.tileIdx >= 0 && scrTiles[sl.tileIdx]) {
      scrTiles[sl.tileIdx].used = false;
    }
    sl.ch = '';
    sl.tileIdx = -1;
    renderScramble(slotIdx);
  }

  function backspaceScramble() {
    if (scrAnswered) return;
    for (let i = scrSlots.length - 1; i >= 0; i--) {
      if (!scrSlots[i].fixed && scrSlots[i].ch) {
        removeScrambleSlot(i);
        return;
      }
    }
  }

  function hintScramble() {
    if (scrAnswered) return;
    const nextEmptyIdx = scrSlots.findIndex(function (s) { return !s.fixed && !s.ch; });
    if (nextEmptyIdx === -1) return;
    const wanted = scrSlots[nextEmptyIdx].expected;
    const tileIdx = scrTiles.findIndex(function (tl) { return !tl.used && tl.ch === wanted; });
    if (tileIdx !== -1) {
      scrHintUsed = true;
      tapScrambleTile(tileIdx);
    }
  }

  function evaluateScramble() {
    scrAnswered = true;
    const t = scrRounds[scrIdx];
    const built = scrSlots.map(function (s) { return s.ch; }).join('').toLowerCase();
    const expected = t.word.trim().toLowerCase();
    const isOk = built === expected;

    if (isOk) {
      scrScore++;
      B().recordAnswer(t.id, true, scrHintUsed ? 1 : 3, scrScore, true);
      setTimeout(function () { B().speakWord(t, false); }, 180);
    } else {
      B().recordAnswer(t.id, false, 0, 0, true);
    }

    const fb = document.getElementById('scr-fb');
    if (fb) {
      fb.className = 'quiz-feedback-box show ' + (isOk ? 'pass' : 'fail');
      fb.innerHTML = isOk
        ? '<strong>✅ آفرین! املای واژه کاملاً درست است (+' + B().toFa(scrHintUsed ? 1 : 3) + ' 💎)</strong><br><strong dir="ltr">' + B().esc(t.word) + '</strong> <span class="ipa-text" dir="ltr">' + B().esc(B().getPhonetic(t)) + '</span><br><span dir="ltr">' + B().esc(t.example) + '</span>'
        : '<strong>❌ املای درست: «<span dir="ltr">' + B().esc(t.word) + '</span>»</strong> <span class="ipa-text" dir="ltr">' + B().esc(B().getPhonetic(t)) + '</span><br><span dir="ltr">' + B().esc(t.example) + '</span>';
    }
    const nb = document.getElementById('scr-next-btn');
    if (nb) {
      nb.textContent = (scrIdx === scrRounds.length - 1) ? 'مشاهدهٔ کارنامهٔ نهایی 📊' : 'واژهٔ بعدی ⬅️';
      nb.classList.add('show');
    }
    reveal();
  }

  function nextScramble() {
    scrIdx++;
    setupScrambleWord(true);
  }

  // =========================================================================
  // 4. چالش سرعتی ۳۰ ثانیه‌ای (Drops True / False Blitz)
  // =========================================================================
  function initBlitz() {
    stopTimers();
    blitzStarted = false;
    blitzFinished = false;
    blitzRemTenths = 300;
    blitzScore = 0;
    blitzCorrect = 0;
    blitzTotal = 0;
    blitzCombo = 0;
    blitzCurrent = null;
    blitzLocked = false;
    renderBlitz();
  }

  function launchBlitzRun() {
    blitzStarted = true;
    blitzFinished = false;
    blitzRemTenths = 300;
    blitzScore = 0;
    blitzCorrect = 0;
    blitzTotal = 0;
    blitzCombo = 0;
    pickNextBlitzCard();
    renderBlitz();

    stopTimers();
    gameTimer = setInterval(function () {
      if (!B().isQuizTabActive()) return;
      blitzRemTenths--;
      const bar = document.getElementById('blitz-bar-fill');
      const secEl = document.getElementById('blitz-sec-lbl');
      if (bar) bar.style.width = Math.max(0, (blitzRemTenths / 300) * 100) + '%';
      if (secEl) secEl.textContent = '⏱️ ' + B().toFa(Math.ceil(blitzRemTenths / 10)) + ' ثانیه';
      if (blitzRemTenths <= 0) {
        stopTimers();
        blitzFinished = true;
        renderBlitz();
      }
    }, 100);
  }

  function pickNextBlitzCard() {
    const vocab = B().getFilteredQuizVocab();
    const allVocab = B().getAllGradeVocab();
    const item = vocab[Math.floor(Math.random() * vocab.length)];
    const isTrue = Math.random() < 0.52;
    let shownMeaning = item.meaning;
    if (!isTrue) {
      const psych = B().getDistractors ? B().getDistractors(item, 1) : [];
      if (psych && psych.length > 0 && psych[0].meaning) {
        shownMeaning = psych[0].meaning;
      } else {
        const others = allVocab.filter(function (v) { return v.id !== item.id && v.meaning !== item.meaning; });
        const wrong = others[Math.floor(Math.random() * others.length)] || item;
        shownMeaning = wrong.meaning;
      }
    }
    blitzCurrent = { item: item, shownMeaning: shownMeaning, isTrue: (shownMeaning === item.meaning) };
    blitzLocked = false;
  }

  function answerBlitz(userSaysTrue) {
    if (!blitzStarted || blitzFinished || blitzLocked || !blitzCurrent) return;
    blitzLocked = true;
    blitzTotal++;
    const isOk = (!!userSaysTrue === blitzCurrent.isTrue);
    const cardEl = document.getElementById('blitz-live-card');

    if (isOk) {
      blitzCorrect++;
      blitzCombo++;
      const mult = blitzCombo >= 4 ? 2 : 1;
      blitzScore += 10 * mult;
      B().recordAnswer(blitzCurrent.item.id, true, (blitzCorrect % 3 === 0) ? 1 : 0, blitzCombo);
      if (cardEl) cardEl.classList.add('flash-pass');
    } else {
      blitzCombo = 0;
      B().recordAnswer(blitzCurrent.item.id, false, 0, 0);
      if (cardEl) cardEl.classList.add('flash-fail');
    }

    setTimeout(function () {
      if (blitzFinished) return;
      pickNextBlitzCard();
      renderBlitz();
    }, 200);
  }

  function renderBlitz() {
    const st = stageEl();
    if (!st) return;

    const bestKey = 'farhanglex_blitz_best_' + B().getGradeId();
    const prevBest = parseInt(localStorage.getItem(bestKey) || '0', 10);

    if (!blitzStarted) {
      st.innerHTML = '<div class="quiz-card-surface" style="text-align:center;padding:24px 16px;">' +
        '<div style="font-size:44px;margin-bottom:6px;">⚡</div>' +
        '<h3 style="font-size:17px;font-weight:900;color:var(--emerald-dark);margin-bottom:6px;">ماراتن سرعتی ۳۰ ثانیه‌ای</h3>' +
        '<p style="font-size:12.5px;color:var(--text-muted);line-height:1.7;margin-bottom:14px;">در ۳۰ ثانیه مشخص کنید آیا معنی فارسی نمایش‌داده‌شده با واژه و تصویر مطابقت دارد یا خیر! با ۳ پاسخ متوالی، ضریب امتیاز ۲ برابر می‌شود.</p>' +
        (prevBest > 0 ? '<div style="margin-bottom:14px;font-size:12.5px;font-weight:800;color:var(--emerald-dark);">🏆 بالاترین رکورد شما در این پایه: ' + B().toFa(prevBest) + ' امتیاز</div>' : '') +
        '<button type="button" class="hero-cta-btn" style="margin:0 auto;" onclick="CreativeGames.launchBlitzRun()">🚀 شروع شمارش معکوس ۳۰ ثانیه</button>' +
      '</div>';
      reveal();
      return;
    }

    if (blitzFinished) {
      let isNew = false;
      if (blitzScore > prevBest) {
        try { localStorage.setItem(bestKey, String(blitzScore)); } catch (e) {}
        isNew = true;
      }
      const acc = blitzTotal > 0 ? Math.round((blitzCorrect / blitzTotal) * 100) : 0;
      st.innerHTML = renderTrophyCard(
        '⚡ پایان ماراتن ۳۰ ثانیه‌ای!',
        'امتیاز نهایی: <strong>' + B().toFa(blitzScore) + '</strong>' + (isNew ? ' <span class="combo-pill">رکورد جدید! 🎉</span>' : '') + '<br>' +
        'پاسخ‌های درست: <strong>' + B().toFa(blitzCorrect) + '</strong> از <strong>' + B().toFa(blitzTotal) + '</strong> (' + B().toFa(acc) + '٪)',
        'blitz',
        blitzCorrect,
        blitzTotal
      );
      return;
    }

    const c = blitzCurrent;
    const t = c.item;
    const src = B().getImgSrc(t);
    const fb = B().getFallbackImg(t).replace(/'/g, '%27');
    const pct = Math.max(0, (blitzRemTenths / 300) * 100);

    st.innerHTML = '' +
      '<div class="game-top-meta">' +
        '<span id="blitz-sec-lbl" style="font-weight:900;color:var(--danger);">⏱️ ' + B().toFa(Math.ceil(blitzRemTenths / 10)) + ' ثانیه</span>' +
        '<span>امتیاز: <strong>' + B().toFa(blitzScore) + '</strong></span>' +
        (blitzCombo >= 3 ? '<span class="combo-pill">🔥 ضریب ۲×</span>' : '<span>کمبو: ' + B().toFa(blitzCombo) + '</span>') +
      '</div>' +
      '<div class="blitz-timer-track"><div id="blitz-bar-fill" class="blitz-timer-fill" style="width:' + pct + '%;"></div></div>' +
      '<div class="quiz-card-surface blitz-card" id="blitz-live-card" style="text-align:center;padding:18px 14px;">' +
        '<div style="margin-bottom:6px;"><span class="chip-page">' + B().esc(B().getBookLessonBadge ? B().getBookLessonBadge(t) : ('درس ' + B().toFa(t.lesson))) + '</span></div>' +
        '<img src="' + src + '" alt="" class="card-illustration-img" style="width:94px;height:94px;margin:0 auto 8px;" onerror="this.onerror=null;this.src=\'' + fb + '\'">' +
        '<div class="term-title" dir="ltr" style="font-size:24px;margin-bottom:2px;">' + B().esc(t.word) + '</div>' +
        '<div class="term-phonetic" dir="ltr" style="margin-bottom:10px;">' + B().esc(B().getPhonetic(t)) + '</div>' +
        '<div class="blitz-proposed-box">' +
          '<span style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:2px;">آیا معنی این واژه برابر است با:</span>' +
          '<strong style="font-size:18px;color:var(--text-main);">«' + B().esc(c.shownMeaning) + '»؟</strong>' +
        '</div>' +
        '<div class="blitz-btn-row">' +
          '<button type="button" class="blitz-btn blitz-yes" onclick="CreativeGames.answerBlitz(true)">✅ درست</button>' +
          '<button type="button" class="blitz-btn blitz-no" onclick="CreativeGames.answerBlitz(false)">❌ نادرست</button>' +
        '</div>' +
      '</div>';
    reveal();
  }

  function renderTrophyCard(title, detailsHtml, mode, correctCount, totalAttempts) {
    if (B().onGameFinish) B().onGameFinish(correctCount, totalAttempts);
    setTimeout(reveal, 0);   // the caller sets innerHTML right after this returns
    return '<div class="quiz-card-surface" style="text-align:center;padding:24px 14px;">' +
      '<div style="font-size:46px;margin-bottom:8px;">🏆</div>' +
      '<h3 style="font-size:17px;font-weight:900;margin-bottom:6px;color:var(--emerald);">' + title + '</h3>' +
      '<p style="font-size:13px;color:var(--text-muted);line-height:1.8;margin-bottom:16px;">' + detailsHtml + '</p>' +
      '<button type="button" class="hero-cta-btn" style="margin:0 auto;" onclick="CreativeGames.restartCurrent()">🔄 بازی مجدد با واژگان تازه</button>' +
    '</div>';
  }

  function speakerSvg() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
  }

  function refreshActivePhonetics() {
    if (!activeMode || !B().isQuizTabActive()) return;
    if (activeMode === 'pic4' && !picAnswered) renderPic4(false);
    else if (activeMode === 'match') renderMatchBoard();
    else if (activeMode === 'blitz' && blitzStarted && !blitzFinished) renderBlitz();
  }


  // =========================================================================
  // 5. مرتب‌سازی جمله (4.1.0 Phase C — guided production from book sentences only)
  // Sentences come exclusively from the audited `example` field; a card is eligible
  // only when its cloze word appears as a whole word (same rule as the data gate),
  // so every round has exactly one correct token sequence.
  // =========================================================================
  function ordEscRe(x) { return String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function ordEligible(v) {
    const ex = String(v.example || '').trim();
    const cz = String(v.clozeWord || '');
    if (!ex || !cz) return false;
    if (!new RegExp('(^|[^A-Za-z])' + ordEscRe(cz) + '([^A-Za-z]|$)', 'i').test(ex)) return false;
    const n = ex.split(/\s+/).length;
    return n >= 5 && n <= 11;
  }
  function initOrder(vocab) {
    const eligible = (vocab || []).filter(ordEligible);
    const st = stageEl();
    if (eligible.length < 3) {
      if (st) st.innerHTML = '<div class="quiz-card-surface" style="text-align:center;padding:24px 12px;"><p style="font-size:13px;color:var(--text-muted);">برای این درس جملهٔ مناسبِ مرتب‌سازی کافی نیست؛ «همهٔ درس‌ها» را انتخاب کنید.</p></div>';
      return;
    }
    ordRounds = shuffle(eligible).slice(0, Math.min(6, eligible.length));
    ordIdx = 0;
    ordScore = 0;
    setupOrder();
  }
  function setupOrder() {
    const t = ordRounds[ordIdx];
    ordTokens = String(t.example).trim().split(/\s+/);
    let idx = ordTokens.map(function (_, i) { return i; });
    let shuffled = shuffle(idx);
    if (shuffled.join(',') === idx.join(',')) shuffled = shuffled.slice(1).concat(shuffled[0]);
    ordTiles = shuffled.map(function (ti) { return { text: ordTokens[ti], used: false }; });
    ordPlaced = [];
    ordAnswered = false;
    renderOrder();
  }
  function renderOrder() {
    const st = stageEl();
    if (!st) return;
    if (ordIdx >= ordRounds.length) {
      const pct = Math.round((ordScore / ordRounds.length) * 100);
      st.innerHTML = renderTrophyCard(
        '🧱 کارنامهٔ بازی مرتب‌سازی جمله',
        'جمله‌های درست ساخته‌شده: <strong>' + B().toFa(ordScore) + '</strong> از <strong>' + B().toFa(ordRounds.length) + '</strong> (' + B().toFa(pct) + '٪)',
        'order',
        ordScore,
        ordRounds.length
      );
      reveal();
      return;
    }
    const t = ordRounds[ordIdx];
    const badge = B().getBookLessonBadge ? B().getBookLessonBadge(t) : ('درس ' + B().toFa(t.lesson));
    let placedHtml = '';
    ordPlaced.forEach(function (ti, pos) {
      placedHtml += '<button type="button" class="scr-slot filled" onclick="CreativeGames.removeOrderAt(' + pos + ')" ' + (ordAnswered ? 'disabled' : '') + '>' + B().esc(ordTiles[ti].text) + '</button>';
    });
    if (!ordPlaced.length) placedHtml = '<span style="font-size:12px;color:var(--text-muted);">واژه‌ها را به ترتیب درست بچین…</span>';
    let bankHtml = '';
    ordTiles.forEach(function (tl, i) {
      bankHtml += '<button type="button" class="scr-tile ' + (tl.used ? 'used' : '') + '" onclick="CreativeGames.tapOrderTile(' + i + ')" ' + (tl.used || ordAnswered ? 'disabled' : '') + '>' + B().esc(tl.text) + '</button>';
    });
    st.innerHTML = '' +
      '<div class="game-top-meta">' +
        '<span>جمله ' + B().toFa(ordIdx + 1) + ' از ' + B().toFa(ordRounds.length) + '</span>' +
        '<span class="chip-page">' + B().esc(badge) + '</span>' +
      '</div>' +
      '<div class="quiz-card-surface scr-game-card">' +
        '<div style="text-align:right;margin-bottom:8px;">' +
          '<div style="font-size:12px;color:var(--text-muted);">جملهٔ کتاب را با واژهٔ <strong dir="ltr">' + B().esc(t.word) + '</strong> (' + B().esc(t.meaning) + ') بساز:</div>' +
        '</div>' +
        '<div class="scr-slots-wrap" dir="ltr" style="flex-wrap:wrap;">' + placedHtml + '</div>' +
        '<div class="scr-bank-wrap" dir="ltr" style="flex-wrap:wrap;">' + bankHtml + '</div>' +
        (!ordAnswered ? '<div class="scr-actions">' +
          '<button type="button" class="setting-chip" onclick="CreativeGames.backspaceOrder()">⌫ حذف واژهٔ آخر</button>' +
          '<button type="button" class="setting-chip" onclick="CreativeGames.checkOrder()">✔ بررسی جمله</button>' +
        '</div>' : '') +
        '<div class="quiz-feedback-box" id="ord-fb"></div>' +
        '<button type="button" class="quiz-next-action" id="ord-next-btn" onclick="CreativeGames.nextOrder()">جملهٔ بعدی ⬅️</button>' +
      '</div>';
    reveal();
  }
  function tapOrderTile(i) {
    if (ordAnswered || !ordTiles[i] || ordTiles[i].used) return;
    ordTiles[i].used = true;
    ordPlaced.push(i);
    renderOrder();
  }
  function removeOrderAt(pos) {
    if (ordAnswered) return;
    const removed = ordPlaced.splice(pos);
    removed.forEach(function (ti) { ordTiles[ti].used = false; });
    renderOrder();
  }
  function backspaceOrder() {
    if (ordAnswered || !ordPlaced.length) return;
    ordTiles[ordPlaced.pop()].used = false;
    renderOrder();
  }
  function checkOrder() {
    if (ordAnswered) return;
    if (ordPlaced.length < ordTokens.length) {
      const fb0 = document.getElementById('ord-fb');
      if (fb0) { fb0.className = 'quiz-feedback-box show fail'; fb0.innerHTML = 'اول همهٔ واژه‌ها را بچین، بعد بررسی کن.'; }
      return;
    }
    ordAnswered = true;
    const built = ordPlaced.map(function (ti) { return ordTiles[ti].text; });
    const ok = built.join(' ') === ordTokens.join(' ');
    if (ok) ordScore++;
    renderOrder();
    const t = ordRounds[ordIdx];
    const fb = document.getElementById('ord-fb');
    if (fb) {
      fb.className = 'quiz-feedback-box show ' + (ok ? 'pass' : 'fail');
      fb.innerHTML =
        '<strong>' + (ok ? '✅ آفرین! جمله دقیقاً درست ساخته شد.' : '❌ جملهٔ درست کتاب این است:') + '</strong><br>' +
        '<span dir="ltr">' + B().esc(t.example) + '</span><br>' +
        '<span style="font-size:12px;">«<bdi dir="ltr">' + B().esc(t.word) + '</bdi>» یعنی: ' + B().esc(t.meaning) + '</span>' +
        '<div style="margin-top:8px;font-size:12px;text-align:right;">' +
          '<div style="font-weight:800;margin-bottom:4px;">خودارزیابی (رتبریک):</div>' +
          '<label style="display:block;"><input type="checkbox"> معنای جمله را کامل فهمیدم</label>' +
          '<label style="display:block;"><input type="checkbox"> جای فاعل و فعل را درست گذاشتم</label>' +
          '<label style="display:block;"><input type="checkbox"> املا و نقطه‌گذاریِ واژه‌ها را چک کردم</label>' +
        '</div>';
    }
    const nb = document.getElementById('ord-next-btn');
    if (nb) nb.classList.add('show');
    reveal();
  }
  function nextOrder() {
    if (!ordAnswered && ordIdx < ordRounds.length) return;
    ordIdx++;
    if (ordIdx < ordRounds.length) setupOrder();
    else renderOrder();
  }

  window.CreativeGames = {
    isCreativeMode: isCreativeMode,
    startMode: startMode,
    stopTimers: stopTimers,
    refreshActivePhonetics: refreshActivePhonetics,
    restartCurrent: function () { if (activeMode) startMode(activeMode, true); },
    // pic4
    speakPicTarget: speakPicTarget,
    pickPic4: pickPic4,
    nextPic4: nextPic4,
    // match
    tapMatchLeft: tapMatchLeft,
    tapMatchRight: tapMatchRight,
    // scramble
    speakScrambleTarget: speakScrambleTarget,
    tapScrambleTile: tapScrambleTile,
    removeScrambleSlot: removeScrambleSlot,
    backspaceScramble: backspaceScramble,
    hintScramble: hintScramble,
    nextScramble: nextScramble,
    // blitz
    launchBlitzRun: launchBlitzRun,
    answerBlitz: answerBlitz,
    // order (4.1.0 Phase C)
    tapOrderTile: tapOrderTile,
    removeOrderAt: removeOrderAt,
    backspaceOrder: backspaceOrder,
    checkOrder: checkOrder,
    nextOrder: nextOrder
  };
})(typeof window !== 'undefined' ? window : globalThis);
