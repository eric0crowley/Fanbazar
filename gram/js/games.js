/* ==========================================================================
   FarhangGram v2.17.0 — Interactive Grammar Games
   7 modes + final-exam simulator + placement tests (all grades / one grade) + rule drill
   + mistake review + class assignments (v2.11, Phase 5)
   Question screen: ✕ + animated progress · big sentence · big options
   instant colour + sound + vibration · bottom feedback panel (≤2 lines)
   ========================================================================== */

(function () {
  'use strict';

  var activeTimer = null;
  var session = null;
  var transformWriteMode = false;

  /* ------------------------------------------------------------- helpers */
  function stopActiveTimer() {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Persian text that may contain English words (see FGText in db.js). */
  function mixed(str) {
    return window.FGText ? window.FGText.mixed(str) : esc(str);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /** Friendly Persian label for a rule tag — never show a raw English id. */
  function friendlyTag(tag) {
    var t = String(tag || '').trim();
    if (!t) return '';
    // rule tags in the curriculum are already Persian; keep them as-is
    if (/[\u0600-\u06FF]/.test(t)) return t;
    if (window.FGStore && window.FGStore.mapRuleTagToFamily && window.FGStore.ruleFamilyLabelFa) {
      try { return window.FGStore.ruleFamilyLabelFa(window.FGStore.mapRuleTagToFamily(t)); } catch (e) {}
    }
    return t;
  }

  function sfx(name) {
    if (window.FGSound && typeof window.FGSound.play === 'function') window.FGSound.play(name);
    else if (window.FGStore && window.FGStore.playSfx) window.FGStore.playSfx(name === 'fanfare' ? 'win' : name);
  }

  function praise() { return window.FGStore.pickPraise ? window.FGStore.pickPraise() : 'آفرین! 🎉'; }
  function comfort() { return window.FGStore.pickComfort ? window.FGStore.pickComfort() : 'اشکالی ندارد؛ با هم درستش می‌کنیم 🙂'; }

  function floatXp(txt) {
    var layer = document.getElementById('confetti-layer');
    if (!layer) return;
    var d = document.createElement('div');
    d.className = 'xp-float';
    d.textContent = txt;
    d.style.top = '38%';
    d.style.right = '44%';
    layer.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 950);
  }

  function celebrate(count) {
    if (window.FGMascot && window.FGMascot.confetti) {
      window.FGMascot.confetti(document.getElementById('confetti-layer'), count || 18);
    }
  }

  /* --------------------------------------------------------- containers */
  function arenaHost() {
    var menu = document.getElementById('practice-container');
    var host = document.getElementById('games-container');
    if (menu) menu.hidden = true;
    if (host) { host.hidden = false; return host; }
    return null;
  }

  function closeArena() {
    var menu = document.getElementById('practice-container');
    var host = document.getElementById('games-container');
    if (host) { host.hidden = true; host.innerHTML = ''; }
    if (menu) menu.hidden = false;
  }

  /** The arena lives inside the practice tab — make sure that tab is visible. */
  function ensurePracticeTab() {
    var view = document.getElementById('view-practice');
    if (view && !view.classList.contains('active')) {
      if (window.FGApp && typeof window.FGApp.showPracticeTab === 'function') window.FGApp.showPracticeTab();
      else if (window.FGApp && typeof window.FGApp.switchTab === 'function') window.FGApp.switchTab('practice');
    }
  }

  function isActive() {
    return !!(session && (
      session.view === 'arena' || session.view === 'match' || session.view === 'blitz'
    ));
  }

  /* --------------------------------------------------------------- pools */
  /** v2.13: the lessons the learner has already reached (done, active, or opened by a placement).
      null = nothing known yet → the whole grade. */
  function reachedLessons(gid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g || !window.FGStore.getJourney) return null;
    var set = {}, any = false;
    window.FGStore.getJourney(gid, g.lessons || []).forEach(function (e) {
      if (e.state !== 'locked') { set[e.id] = true; any = true; }
    });
    return any ? set : null;
  }

  /* v2.13 (stranger test): «همه» used to mean the WHOLE grade — after lesson 1 a 10th grader got
     reflexive pronouns and modals in «شروع سریع». Now it means the lessons reached so far; if
     they are too few, the NEXT lessons fill up (in order), never a random far lesson.
     opts.wholeGrade keeps the old behaviour (the final exam covers the whole book). */
  function getPool(minNeeded, opts) {
    var st = window.FGStore.getState();
    var g = window.GRAMMAR_CURRICULUM[st.selectedGrade];
    if (!g) return [];
    var allItems = g.items || [];
    var selLesson = st.selectedLessonByGrade[st.selectedGrade] || 1;
    var reached = (st.gameScope !== 'lesson' && !(opts && opts.wholeGrade)) ? reachedLessons(st.selectedGrade) : null;
    var pool = st.gameScope === 'lesson'
      ? allItems.filter(function (it) { return it.lesson === selLesson; })
      : (reached ? allItems.filter(function (it) { return reached[it.lesson]; }) : allItems.slice());

    pool = shuffle(pool);
    if (minNeeded && pool.length < minNeeded) {
      var rest = shuffle(allItems.filter(function (it) { return pool.indexOf(it) === -1; }));
      if (reached) rest.sort(function (a, b) { return (a.lesson || 0) - (b.lesson || 0); });
      pool = pool.concat(rest.slice(0, minNeeded - pool.length));
    }
    return pool;
  }

  function getTransformPool(minNeeded, opts) {
    var st = window.FGStore.getState();
    var allTf = window.GRAMMAR_TRANSFORMATIONS || [];
    var selLesson = st.selectedLessonByGrade[st.selectedGrade] || 1;
    var gradeTf = allTf.filter(function (t) { return t.grade === st.selectedGrade; });
    var reached = (st.gameScope !== 'lesson' && !(opts && opts.wholeGrade)) ? reachedLessons(st.selectedGrade) : null;
    var pool = st.gameScope === 'lesson'
      ? gradeTf.filter(function (t) { return t.lesson === selLesson; })
      : (reached ? gradeTf.filter(function (t) { return reached[t.lesson]; }) : gradeTf.slice());

    pool = shuffle(pool);
    if (pool.length < (minNeeded || 4)) {
      var extraGrade = shuffle(gradeTf.filter(function (t) { return pool.indexOf(t) === -1; }));
      if (reached) extraGrade.sort(function (a, b) { return (a.lesson || 0) - (b.lesson || 0); });
      pool = pool.concat(extraGrade);
    }
    if (pool.length < (minNeeded || 4)) {
      var extraAll = shuffle(allTf.filter(function (t) { return pool.indexOf(t) === -1; }));
      pool = pool.concat(extraAll.slice(0, (minNeeded || 4) - pool.length));
    }
    return pool;
  }

  function normalizeGrammarAnswer(s, strictCase) {
    var out = String(s || '').trim().replace(/\s+/g, ' ');
    out = out.replace(/[\u2018\u2019`]/g, "'");
    if (!strictCase) out = out.toLowerCase();
    return out;
  }

  function expandContractions(s) {
    return s
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/\bshan't\b/g, 'shall not')
      .replace(/\bdon't\b/g, 'do not')
      .replace(/\bdoesn't\b/g, 'does not')
      .replace(/\bdidn't\b/g, 'did not')
      .replace(/\bisn't\b/g, 'is not')
      .replace(/\baren't\b/g, 'are not')
      .replace(/\bwasn't\b/g, 'was not')
      .replace(/\bweren't\b/g, 'were not')
      .replace(/\bhaven't\b/g, 'have not')
      .replace(/\bhasn't\b/g, 'has not')
      .replace(/\bhadn't\b/g, 'had not')
      .replace(/\bshouldn't\b/g, 'should not')
      .replace(/\bmustn't\b/g, 'must not')
      .replace(/\bwouldn't\b/g, 'would not')
      .replace(/\bcouldn't\b/g, 'could not')
      .replace(/\bwhat's\b/g, 'what is')
      .replace(/\bwe're\b/g, 'we are')
      .replace(/\bali's watching\b/g, 'ali is watching')
      .replace(/[.,?!]+$/g, '')
      .trim();
  }

  function isAnswerEquivalent(userInput, target, itemId, altList) {
    var strictCase = itemId === 'v1_l1_8';
    var u = normalizeGrammarAnswer(userInput, strictCase);
    if (!u) return false;
    var candidates = [target].concat(altList || []);
    for (var i = 0; i < candidates.length; i++) {
      var t = normalizeGrammarAnswer(candidates[i], strictCase);
      if (u === t) return true;
      if (!strictCase && expandContractions(u) === expandContractions(t)) return true;
      if (!strictCase && expandContractions(u).replace('can not', 'cannot') === expandContractions(t)) return true;
    }
    return false;
  }

  function tokenizeSentenceForUnscramble(sentence) {
    var s = String(sentence || '').trim();
    var words = s.split(/\s+/);
    if (words.length <= 10) return words;
    var grouped = [];
    for (var i = 0; i < words.length; i++) {
      if (grouped.length < 9 || i === words.length - 1) {
        grouped.push(words[i]);
      } else {
        grouped[grouped.length - 1] += ' ' + words[i];
      }
    }
    return grouped;
  }

  /* ----------------------------------------------------------- outcomes */
  function recordQuestionOutcome(isCorrect, statKey, itemObj) {
    var st = window.FGStore.getState();
    st.stats.totalAnswered = (st.stats.totalAnswered || 0) + 1;
    window.FGStore.syncDailyQuestsRollover();
    st.dailyQuests.answered += 1;

    /* v2.11 (Phase 5): a placement test is a DIAGNOSIS of lessons not studied yet — its answers
       neither fill the rule dashboard nor create «mistake» review cards */
    var diagnostic = !!(session && (session.mode === 'placement' || session.mode === 'placement_grade'));
    if (!diagnostic && itemObj && itemObj.ruleTag && typeof window.FGStore.recordRuleOutcome === 'function') {
      window.FGStore.recordRuleOutcome(itemObj.ruleTag, isCorrect);
    }

    if (session && session.tasks && session.idx < session.tasks.length) {
      var step = session.tasks[session.idx];
      if (diagnostic) {
        session.placementResults.push({
          grade: step.grade || '',
          correct: !!isCorrect,
          lesson: (itemObj && itemObj.lesson) || 0
        });
      } else if (session.mode === 'class') {
        session.answers.push({ n: session.idx + 1, type: step.subMode, id: (itemObj && itemObj.id) || '', ok: !!isCorrect });
      } else if (session.trackMistakes && !isCorrect) {
        session.mistakes.push({
          subMode: step.subMode,
          data: itemObj,
          grade: step.grade || '',
          picked: describePicked(step, itemObj),
          correct: correctAnswerOf(step, itemObj)
        });
      }
    }

    if (isCorrect) {
      st.stats.totalCorrect = (st.stats.totalCorrect || 0) + 1;
      if (statKey) st.stats[statKey] = (st.stats[statKey] || 0) + 1;
      sfx('correct');
      window.FGStore.addReward(10, 0);
      floatXp('+۱۰ XP');
      celebrate(16);
    } else {
      sfx('wrong');
      if (!diagnostic && itemObj && itemObj.id && !String(itemObj.id).startsWith('tf_')) {
        window.FGStore.addItemToSrs(itemObj.id, true);
      }
      window.FGStore.addReward(2, 0);
    }
    if (window.FGApp && typeof window.FGApp.refreshHeaderHud === 'function') {
      window.FGApp.refreshHeaderHud();
    }
  }

  function bumpCombo(ok) {
    if (!session) return;
    if (ok) {
      session.combo = (session.combo || 0) + 1;
      if (session.combo >= 3) {
        sfx('combo');
        window.FGStore.addReward(10, 0);
        floatXp('کمبو ×' + window.FGStore.toFaDigits(session.combo) + '  +۲۰ XP');
      }
    } else {
      session.combo = 0;
    }
  }

  /* ======================================================================
     PHASE 2 (v2.8.0) — EXERCISE VARIETY
     Six exercise types, all built from the EXISTING item fields only:
       cloze      four-option blank                  (cloze, options)
       pickright  «کدام جمله درست است؟»               (sentence vs flawedSentence)
       listen     hear one sentence, pick it of three (sentence, flawed, 3rd option) — needs TTS
       unscramble tap the words in order + ONE extra  (sentence + the common-error word)
       typing     type 1–2 words, flexible matching   (target, contractions, any case)
       pairs      four rule pairs, once per session   (matchLeft / matchRight)
     composeMix(): ≥ 4 types per session (n ≥ 5), never the same type twice in
     a row, items ordered easy → hard (two easy first, two hard last).
     Every type goes through recordQuestionOutcome() + feedbackHtml(), so the
     feedback, sound and vibration are identical for all of them.
     ====================================================================== */
  function lc(s) { return String(s == null ? '' : s).toLowerCase(); }
  function wordsOf(s) { return String(s == null ? '' : s).trim().split(/\s+/).filter(Boolean); }

  /** Relative difficulty of an item (only the ORDER inside one pool matters). */
  function itemDifficulty(it) {
    var w = wordsOf(it.sentence).length;
    var tw = wordsOf(it.target).length;
    return w + 2.5 * (tw - 1) + (/[—;]/.test(it.sentence) ? 2 : 0) + (String(it.target || '').length > 8 ? 1 : 0);
  }

  /* sentences that differ only in case, apostrophes or homophones SOUND the same */
  var HOMOPHONE = {
    their: 'there', theyre: 'there', youre: 'your', whos: 'whose', too: 'to', two: 'to',
    hear: 'here', know: 'no', buy: 'by', bye: 'by', four: 'for', won: 'one', whether: 'weather'
  };
  function soundKey(s) {
    return wordsOf(lc(s).replace(/[’']/g, '').replace(/[^a-z0-9\s]/g, ' '))
      .map(function (w) { return HOMOPHONE[w] || w; }).join(' ');
  }

  /** [correct, two audibly different sentences] or null. */
  function listenSet(it) {
    if (!it || !it.sentence || !it.cloze) return null;
    /* v2.9.0: three spoken options must fit a 360×640 screen without scrolling (cf. unscramble's 3–12 words) */
    if (String(it.sentence).length > 100) return null;
    var out = [it.sentence], seen = {};
    seen[soundKey(it.sentence)] = 1;
    var cands = [it.flawedSentence].concat((it.options || []).filter(function (o) { return o !== it.target; })
      .map(function (o) { return it.cloze.replace('_____', o); }));
    for (var i = 0; i < cands.length && out.length < 3; i++) {
      var k = soundKey(cands[i]);
      if (!k || seen[k]) continue;
      seen[k] = 1;
      out.push(cands[i]);
    }
    return out.length === 3 ? out : null;
  }

  /** [right sentence, the same sentence with the common student error]. */
  function pickrightSet(it) {
    if (!it) return null;
    var a = String(it.sentence || '').replace(/\s+/g, ' ').trim();
    var b = String(it.flawedSentence || '').replace(/\s+/g, ' ').trim();
    return a && b && a !== b ? [a, b] : null;
  }

  /** The flawed sentence with its wrong chunk struck through (shown after answering). */
  function flawedHtml(it) {
    if (!it || !Array.isArray(it.chunks)) return esc(it ? it.flawedSentence : '');
    return it.chunks.map(function (c, i) {
      return i === it.wrongChunkIdx ? '<s class="err-chunk">' + esc(c) + '</s>' : esc(c);
    }).join(' ');
  }

  /** The common-error word that becomes the ONE extra tile of the word bank. */
  function extraWord(it, tokens) {
    var err = (it.chunks || [])[it.wrongChunkIdx];
    if (!err) return null;
    var fixed = wordsOf(it.fixedChunk).map(lc);
    var cand = wordsOf(err).filter(function (w) { return fixed.indexOf(lc(w)) === -1; });
    var d = (cand[0] || '').replace(/[.,!?;:]+$/, '');
    if (!d) return null;
    var clash = (tokens || []).some(function (t) {
      return wordsOf(t).some(function (w) { return lc(w).replace(/[.,!?;:]+$/, '') === lc(d); });
    });
    return clash ? null : d;
  }

  function typingEligible(it) {
    /* v2.9.0: typing needs a visible hint that pins the word; open slots (e.g. «His ___ is a teacher» →
       sister, mother…) are marked noTyping at build time by tools/error_taxonomy.js typingPlan() */
    if (it.noTyping) return false;
    var t = String(it.target || '').trim();
    if (!t || wordsOf(t).length > 2 || t.length > 16 || !/^[A-Za-z'’ \-]+$/.test(t)) return false;
    /* capitalization items (e.g. «Persian Gulf» vs «persian gulf») need the exact case */
    return !(it.options || []).some(function (o) { return o !== t && lc(o) === lc(t); });
  }

  function exerciseEligible(type, it) {
    if (!it || !it.sentence) return false;
    if (type === 'cloze') return !!(it.cloze && it.options && it.options.length);
    if (type === 'pickright') return !!pickrightSet(it);
    if (type === 'listen') return !!listenSet(it);
    if (type === 'unscramble') { var n = wordsOf(it.sentence).length; return n >= 3 && n <= 12; }
    if (type === 'typing') return typingEligible(it);
    if (type === 'error') return Array.isArray(it.chunks) && it.wrongChunkIdx >= 0;
    return false;
  }

  /** Four items whose rule pairs are all different (for one «pairs» step). */
  function pairSet(items, used) {
    var out = [], L = {}, R = {};
    for (var i = 0; i < items.length && out.length < 4; i++) {
      var it = items[i];
      if (!it || (used && used[it.id]) || !it.matchLeft || !it.matchRight) continue;
      var l = lc(it.matchLeft).trim(), r = lc(it.matchRight).trim();
      if (!l || !r || L[l] || R[r] || L[r] || R[l] || l === r) continue;
      L[l] = 1; R[r] = 1;
      out.push(it);
    }
    return out.length === 4 ? out : null;
  }

  /** Listening exercises only with a working English TTS and not paused by the learner. */
  function canListen() {
    var st = window.FGStore.getState();
    if ((st.listenPausedUntil || 0) > Date.now()) return false;
    return !!(window.FGStore.isTtsReady && window.FGStore.isTtsReady());
  }

  var BAND_TYPES = {
    easy: ['pickright', 'cloze'],
    mid: ['listen', 'pairs', 'cloze', 'pickright'],
    hard: ['unscramble', 'typing']
  };

  function bandsFor(n) {
    if (n <= 1) return ['easy'];
    if (n === 2) return ['easy', 'hard'];
    if (n === 3) return ['easy', 'mid', 'hard'];
    var b = [];
    for (var i = 0; i < n; i++) b.push(i < 2 ? 'easy' : (i >= n - 2 ? 'hard' : 'mid'));
    return b;
  }

  /**
   * A mixed session of n steps from `items`.
   * opts.listen — override TTS detection; opts.types — band → allowed types.
   */
  /* the two first questions must not be harder than the two last ones */
  function curveOk(tasks) {
    if (tasks.length < 4) return true;
    var d = tasks.map(function (t) { return itemDifficulty(t.data); });
    return d[0] + d[1] <= d[d.length - 2] + d[d.length - 1];
  }

  function composeMix(items, n, opts) {
    var first = null;
    for (var attempt = 0; attempt < 8; attempt++) {
      var tasks = composeOnce(items, n, opts);
      if (curveOk(tasks)) return tasks;
      first = first || tasks;
    }
    return first;
  }

  function composeOnce(items, n, opts) {
    opts = opts || {};
    var listenOk = opts.listen !== undefined ? !!opts.listen : canListen();
    var types = opts.types || BAND_TYPES;
    var pool = (items || []).filter(function (it) { return it && it.sentence; });
    var ranked = pool.slice().sort(function (a, b) { return itemDifficulty(a) - itemDifficulty(b); });
    var k = Math.max(1, Math.round(ranked.length / 3));
    var pools = {
      easy: shuffle(ranked.slice(0, k)),
      mid: shuffle(ranked.slice(k, Math.max(k, ranked.length - k))),
      hard: shuffle(ranked.slice(Math.max(k, ranked.length - k)))
    };
    var reach = { easy: ['easy', 'mid', 'hard'], mid: ['mid', 'easy', 'hard'], hard: ['hard', 'mid', 'easy'] };
    var LEVEL = { easy: 0, mid: 1, hard: 2 };
    var used = {}, count = {}, tasks = [], prev = null, pairsDone = false;

    function takeItem(type, band) {
      var seq = reach[band];
      for (var s = 0; s < seq.length; s++) {
        var p = pools[seq[s]];
        if (s > 0) {
          /* outside its own band: take the item CLOSEST to the band's level
             (the hardest of an easier pool, the easiest of a harder one) */
          p = p.slice().sort(function (a, b) { return itemDifficulty(a) - itemDifficulty(b); });
          if (LEVEL[seq[s]] < LEVEL[band]) p.reverse();
        }
        /* v2.9.0: typing-eligible items are scarce (only items whose hint pins the word), so other
           types take the remaining items first and the closing typing slot still finds one */
        for (var pass = 0; pass < 2; pass++) {
          for (var i = 0; i < p.length; i++) {
            if (used[p[i].id] || !exerciseEligible(type, p[i])) continue;
            if (pass === 0 && type !== 'typing' && typingEligible(p[i])) continue;
            used[p[i].id] = 1; return p[i];
          }
        }
      }
      return null;
    }

    var bands = bandsFor(n);
    for (var i = 0; i < bands.length; i++) {
      var cand = (types[bands[i]] || []).filter(function (t) {
        return t !== prev && (t !== 'listen' || listenOk) && (t !== 'pairs' || !pairsDone);
      });
      cand = shuffle(cand).sort(function (a, b) { return (count[a] || 0) - (count[b] || 0); });
      var step = null;
      for (var c = 0; c < cand.length && !step; c++) {
        var t = cand[c];
        if (t === 'pairs') {
          /* pairs use the middle/easy items so the hard ones stay for the end */
          var ps = pairSet(shuffle(pools.mid).concat(shuffle(pools.easy)), used) || pairSet(shuffle(pool), used);
          if (ps) {
            ps.forEach(function (x) { used[x.id] = 1; });
            step = { subMode: 'pairs', data: ps[0], pairs: ps };
            pairsDone = true;
          }
        } else {
          var it = takeItem(t, bands[i]);
          if (it) step = { subMode: t, data: it };
        }
      }
      if (!step) {   /* last resort: any type that differs from the previous one */
        var any = ['cloze', 'pickright', 'unscramble', 'typing'].filter(function (t) { return t !== prev; });
        for (var a = 0; a < any.length && !step; a++) {
          var it2 = takeItem(any[a], bands[i]);
          if (it2) step = { subMode: any[a], data: it2 };
        }
      }
      if (!step) break;
      step.band = bands[i];
      tasks.push(step);
      prev = step.subMode;
      count[prev] = (count[prev] || 0) + 1;
    }
    return tasks;
  }

  /** Does the rule line under a question contain an English word that decides the answer?
      cloze / typing: a word of the target · pickright / listen: a word that is not in every
      option (the words the learner has to tell apart) — or a word of the target. */
  function latinWords(s) { return wordsOf(lc(s).replace(/[’]/g, "'").replace(/[^a-z'\s]/g, ' ')); }
  function tagGivesAway(sub, it, tag, options) {
    if (!tag || !it) return false;
    if (sub !== 'cloze' && sub !== 'typing' && sub !== 'pickright' && sub !== 'listen' && sub !== 'error' && sub !== 'unscramble') return false;
    /* sentence building: every word is on screen anyway — only the extra (distractor) word can be given away */
    if (sub === 'unscramble' && !(options && options.length)) return false;
    var tw = latinWords(tag);
    if (!tw.length) return false;
    var key = {};
    latinWords(it.target).forEach(function (w) { key[w] = 1; });
    if (sub === 'error') {          /* error hunt: naming the fixed or the wrong word points at the chunk */
      latinWords(it.fixedChunk).forEach(function (w) { key[w] = 1; });
      if (Array.isArray(it.chunks)) latinWords(it.chunks[it.wrongChunkIdx]).forEach(function (w) { key[w] = 1; });
    }
    if (sub === 'unscramble') options.forEach(function (x) { latinWords(x).forEach(function (w) { key[w] = 1; }); });
    if (sub === 'pickright' || sub === 'listen') {
      var opts = (options || []).map(latinWords);
      var count = {};
      opts.forEach(function (ws) {
        var once = {};
        ws.forEach(function (w) { if (!once[w]) { once[w] = 1; count[w] = (count[w] || 0) + 1; } });
      });
      Object.keys(count).forEach(function (w) { if (count[w] < opts.length) key[w] = 1; });
    }
    return tw.some(function (w) { return key[w]; });
  }

  /** Single-type games keep the same curve: two easiest first, two hardest last. */
  function curveOrder(items) {
    var r = items.slice().sort(function (a, b) { return itemDifficulty(a) - itemDifficulty(b); });
    if (r.length <= 4) return r;
    return r.slice(0, 2).concat(shuffle(r.slice(2, r.length - 2)), r.slice(r.length - 2));
  }

  /* ======================================================================
     PHASE 6 — weakness drill, placement test, final-exam timer & review
     ====================================================================== */
  var GRADES = ['prospect_1', 'prospect_2', 'prospect_3', 'vision_1', 'vision_2', 'vision_3'];

  function gradeTitle(gid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    /* v2.17 (C12): the data says «پایه هفتم»; every screen writes «پایهٔ هفتم» */
    return g ? String(g.titleFa || g.name).replace(/^پایه (?=\S)/, 'پایهٔ ') : gid;
  }

  function collectItemsByRule(ruleTag) {
    var out = [];
    GRADES.forEach(function (gid) {
      var g = window.GRAMMAR_CURRICULUM[gid];
      if (!g) return;
      (g.items || []).forEach(function (it) {
        if (it.ruleTag === ruleTag) out.push({ grade: gid, item: it });
      });
    });
    return out;
  }

  /* v2.11.0 (Phase 5.1) «تمرین همین قاعده»: the drill starts with the learner's OWN mistakes in this
     rule, then items of their grade, then the grades below it (never a harder grade while easier
     items are left) — in the mixed exercise types of Phase 2 (no pairs: one answer = this rule).
     «یک دور دیگر» restarts THIS rule (it used to fall through to startMode('weak') = empty). */
  var DRILL_TYPES = { easy: ['pickright', 'cloze'], mid: ['cloze', 'pickright', 'listen'], hard: ['unscramble', 'typing'] };
  function startWeakPractice(familyId) {
    stopActiveTimer();
    sfx('tap');
    var fam = String(familyId || '').replace(/[^A-Za-z0-9_]/g, '');
    var st = window.FGStore.getState();
    var hits = [];
    if (window.FGStore.getFamilyItems) {
      hits = window.FGStore.getFamilyItems(fam);
    } else {
      hits = collectItemsByRule(fam).map(function (h) {
        return { id: h.item.id, item: h.item, grade: h.grade };
      });
    }
    var gi = GRADES.indexOf(st.selectedGrade);
    var groups = [[], [], [], []];
    hits.forEach(function (h) {
      var c = st.srs && st.srs[h.id];
      var hg = GRADES.indexOf(h.grade);
      var p = (c && (c.isMistake || c.lapses > 0)) ? 0 : (h.grade === st.selectedGrade ? 1 : ((hg >= 0 && hg < gi) ? 2 : 3));
      groups[p].push(h);
    });
    var ordered = [].concat(shuffle(groups[0]), shuffle(groups[1]), shuffle(groups[2]), shuffle(groups[3])).slice(0, 10);
    var gradeOf = {};
    var items = ordered.map(function (h) { gradeOf[h.item.id] = h.grade; return h.item; });
    if (items.length < 6 && items.length) {
      /* a small rule: top up with other questions of the same lesson (as before) */
      var first = ordered[0];
      var g = window.GRAMMAR_CURRICULUM[first.grade];
      (g.items || []).forEach(function (it) {
        if (items.length >= 8) return;
        if (it.lesson === first.item.lesson && items.indexOf(it) === -1) { items.push(it); gradeOf[it.id] = first.grade; }
      });
    }
    var tasks = items.length ? composeMix(items, Math.min(8, items.length), { types: DRILL_TYPES }) : [];
    if (!tasks.length) {
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('برای این قاعده سؤالی پیدا نشد.');
      return renderLobby();
    }
    tasks.forEach(function (t) { t.grade = gradeOf[t.data.id] || ''; t.lesson = t.data.lesson; });
    /* 2.18.0 Phase F: open the weak-rule drill with a memorable counter-example —
       a trap card from the same lesson as the first drill item (wrong vs right +
       the Persian note). It is a worked example, not scored into the rule. */
    try {
      if (tasks.length) {
        var g0 = window.GRAMMAR_CURRICULUM[tasks[0].grade];
        var lesson0 = g0 && (g0.lessons || []).filter(function (L) { return L.id === tasks[0].lesson; })[0];
        if (lesson0 && (lesson0.traps || []).length) {
          var tr = lesson0.traps[0];
          tasks.unshift({ subMode: 'trap', data: { wrong: tr.wrong, right: tr.right, noteFa: tr.noteFa, lesson: lesson0.id }, grade: tasks[0].grade, lesson: lesson0.id });
        }
      }
    } catch (e) {}
    session = {
      mode: 'weak',
      view: 'arena',
      isExamSim: false,
      weakRule: fam,
      weakLabel: window.FGStore.ruleFamilyLabelFa ? window.FGStore.ruleFamilyLabelFa(fam) : '',
      again: "FG_Games.startWeakPractice('" + fam + "')",
      tasks: tasks,
      idx: 0,
      correctCount: 0,
      answered: false,
      combo: 0,
      mistakes: []
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  /* ======================================================================
     v2.11.0 (Phase 5.2) — «از کدام درس شروع کنم؟» (placement inside ONE grade)
     10 questions, lessons in book order (an easy → hard ladder), ≥ 1 question per lesson;
     the extra questions go to the FIRST lessons, so nothing basic is skipped on one lucky tap.
     Offered (optional, skippable) right after the onboarding question, and in «تمرین».
     ====================================================================== */
  function gradePlacementTasks(gid) {
    var g = window.GRAMMAR_CURRICULUM[gid];
    if (!g) return [];
    var lessons = (g.lessons || []).map(function (l) { return l.id; });
    var L = lessons.length, N = 10;
    if (!L) return [];
    var base = Math.floor(N / L), extra = N % L, tasks = [];
    lessons.forEach(function (lid, i) {
      var want = base + (i < extra ? 1 : 0);
      if (!want) return;
      var ranked = (g.items || []).filter(function (it) { return it.lesson === lid && exerciseEligible('cloze', it); })
        .sort(function (a, b) { return itemDifficulty(a) - itemDifficulty(b); });
      /* a TYPICAL question of the lesson: the middle half of its difficulty range */
      var lo = Math.floor(ranked.length / 4), hi = Math.max(lo + want, Math.ceil(ranked.length * 3 / 4));
      shuffle(ranked.slice(lo, hi)).slice(0, want).forEach(function (it) {
        tasks.push({ subMode: 'cloze', data: it, grade: gid, lesson: lid });
      });
    });
    return tasks;
  }

  function startGradePlacement(gid, opts) {
    stopActiveTimer();
    sfx('tap');
    var grade = gid || window.FGStore.getState().selectedGrade;
    var tasks = gradePlacementTasks(grade);
    if (!tasks.length) return renderLobby();
    session = {
      mode: 'placement_grade',
      view: 'arena',
      isExamSim: false,
      grade: grade,
      fromOnboarding: !!(opts && opts.fromOnboarding),
      tasks: tasks,
      idx: 0,
      correctCount: 0,
      answered: false,
      combo: 0,
      mistakes: [],
      placementResults: []
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  function gradePlacementResultHtml(fa) {
    var g = window.GRAMMAR_CURRICULUM[session.grade] || {};
    var ids = (g.lessons || []).map(function (l) { return l.id; });
    var res = window.FGStore.computeGradePlacement(session.placementResults, ids);
    session.gradeResult = res;
    var tiles = ids.map(function (lid) {
      var p = res.perLesson[lid] || { c: 0, t: 0 };
      var known = res.known.indexOf(lid) !== -1;
      var start = lid === res.lesson && !res.allKnown;
      var cls = start ? ' start' : (known ? ' ok' : '');
      var tag = start ? 'از اینجا' : (known ? 'بلدی ✓' : 'بعداً');
      return '<div class="pl-tile' + cls + '"><b>درس ' + fa(lid) + '</b><span>' + fa(p.c) + ' از ' + fa(p.t) + '</span><i>' + tag + '</i></div>';
    }).join('');
    var head = res.allKnown
      ? 'همهٔ درس‌های این پایه را بلدی! از درس آخر ادامه بده یا آزمون نهایی را امتحان کن.'
      : (res.lesson === ids[0]
        ? 'پیشنهاد: از درس ۱ شروع کن؛ قدم‌به‌قدم با هم جلو می‌رویم.'
        : 'درس‌های قبل از درس ' + fa(res.lesson) + ' را بلدی؛ از همین‌جا شروع کن. درس‌های قبلی هم باز می‌مانند.');
    return '<div class="card pl-result" style="text-align:center;">' +
      '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(FGMascot.resultState(res.score, res.total), 104) : '') + '</div>' +
      '<h3 style="margin:6px 0 2px;font-size:18px;font-weight:800;">نتیجهٔ تعیین سطح</h3>' +
      '<p style="font-size:13px;color:var(--ink-2);margin:0 0 10px;">' + esc(gradeTitle(session.grade)) + '؛ درست: <strong>' + fa(res.score) + '</strong> از <strong>' + fa(res.total) + '</strong></p>' +
      '<div class="read-more" style="text-align:start;margin-bottom:10px;">' + esc(head) + '</div>' +
      '<div class="pl-tiles">' + tiles + '</div>' +
      '<button class="btn btn-primary" onclick="FG_Games.acceptGradePlacement()">شروع از درس ' + fa(res.lesson) + ' ←</button>' +
      (res.lesson !== ids[0]
        ? '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.declineGradePlacement()">نه، از درس ۱ شروع می‌کنم</button>'
        : '') +
    '</div>';
  }

  function leaveToPath(msg) {
    stopActiveTimer();
    session = null;
    closeArena();
    if (window.FGApp && typeof window.FGApp.switchTab === 'function') window.FGApp.switchTab('path');
    if (msg && window.FGApp && window.FGApp.showToast) window.FGApp.showToast(msg);
  }

  function acceptGradePlacement() {
    if (!session || !session.gradeResult) return renderLobby();
    var res = window.FGStore.applyGradePlacement(session.grade, session.gradeResult);
    sfx('tap');
    leaveToPath('از درس ' + window.FGStore.toFaDigits(res.lesson) + ' شروع می‌کنی؛ درس‌های قبلی هم بازند.');
  }

  function declineGradePlacement() {
    var gid = session && session.grade;
    if (gid) {
      var st = window.FGStore.getState();
      st.selectedLessonByGrade[gid] = 1;
      window.FGStore.saveState();
    }
    sfx('tap');
    leaveToPath('');
  }

  /* ======================================================================
     v2.11.0 (Phase 5.4) — class assignment
     The code / file fixes grade, lessons, count and a seed; the questions are drawn with a
     SEEDED random generator, so every student of the class gets the same questions in the
     same order (only the option order is shuffled). No listening step (it depends on the
     phone's English voice) and no pairs step (one answer = one question on the result sheet).
     ====================================================================== */
  var CLASS_TYPES = { easy: ['pickright', 'cloze'], mid: ['cloze', 'pickright'], hard: ['unscramble', 'typing'] };
  function seededRandom(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function withSeed(seed, fn) {
    var orig = Math.random;
    Math.random = seededRandom(seed);
    try { return fn(); } finally { Math.random = orig; }
  }
  function classTasks(spec) {
    var g = spec && window.GRAMMAR_CURRICULUM[spec.grade];
    if (!g) return [];
    var items = (g.items || []).filter(function (it) { return spec.lessons.indexOf(it.lesson) !== -1; });
    var n = Math.min(spec.count || 8, items.length);
    if (!n) return [];
    var seed = ((parseInt(spec.code, 10) || 0) ^ 0x5F3759DF) >>> 0;
    var tasks = withSeed(seed, function () { return composeMix(items, n, { listen: false, types: CLASS_TYPES }); });
    tasks.forEach(function (t) { t.grade = spec.grade; t.lesson = t.data.lesson; });
    return tasks;
  }

  function startClassAssignment(spec) {
    stopActiveTimer();
    sfx('tap');
    var tasks = classTasks(spec);
    if (!tasks.length) {
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('برای این تکلیف سؤالی پیدا نشد.');
      return renderLobby();
    }
    session = {
      mode: 'class',
      view: 'arena',
      isExamSim: false,
      classSpec: spec,
      tasks: tasks,
      idx: 0,
      correctCount: 0,
      answered: false,
      combo: 0,
      mistakes: [],
      answers: [],
      startedAt: new Date().toISOString()
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  function classResultHtml(fa, total) {
    var spec = session.classSpec;
    var st = window.FGStore.getState();
    if (!session.classResult) {
      var attempt = window.FGStore.recordClassResult({ code: spec.code, title: spec.title, score: session.correctCount, total: total });
      session.classResult = {
        code: spec.code, title: spec.title || '', teacher: spec.teacher || '',
        name: (st.classMode && st.classMode.name) || '', grade: spec.grade, lessons: spec.lessons.slice(),
        score: session.correctCount, total: total, attempt: attempt,
        startedAt: session.startedAt, finishedAt: new Date().toISOString(), answers: session.answers.slice()
      };
    }
    var r = session.classResult;
    var score20 = Math.round((r.score / Math.max(1, r.total)) * 20 * 2) / 2;
    var dots = r.answers.map(function (a) {
      return '<span class="cr-dot ' + (a.ok ? 'ok' : 'no') + '" aria-label="سؤال ' + fa(a.n) + (a.ok ? ' درست' : ' نادرست') + '">' + fa(a.n) + '</span>';
    }).join('');
    return '<div class="card class-result" style="text-align:center;">' +
      '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(FGMascot.resultState(r.score, r.total), 104) : '') + '</div>' +
      '<h3 style="margin:6px 0 2px;font-size:18px;font-weight:800;">تکلیف تمام شد!</h3>' +
      '<p style="font-size:12.5px;color:var(--ink-2);margin:0 0 8px;">' + esc(r.title || gradeTitle(r.grade)) +
        '؛ کد <bdi dir="ltr" class="en">' + esc(window.FGStore.classCode.format(r.code)) + '</bdi>' +
        (r.attempt > 1 ? '؛ دفعهٔ ' + fa(r.attempt) : '') + '</p>' +
      '<div class="cr-score"><b>' + fa(r.score) + ' از ' + fa(r.total) + '</b><span>نمره از ۲۰: ' + fa(score20) + '</span></div>' +
      '<div class="cr-dots">' + dots + '</div>' +
      '<label class="cr-name">نام تو (روی نتیجه برای معلم)' +
        '<input id="class-name-input" class="search-input" maxlength="60" placeholder="نام و نام خانوادگی" value="' + esc(r.name) + '" />' +
      '</label>' +
      '<button class="btn btn-primary" onclick="FGApp.shareClassResultImage()">فرستادن تصویر نتیجه برای معلم</button>' +
      '<div class="row" style="gap:8px;margin-top:8px;">' +
        '<button class="btn btn-secondary btn-sm grow" onclick="FGApp.shareClassResultFile()">فرستادن فایل نتیجه</button>' +
        '<button class="btn btn-secondary btn-sm grow" onclick="FG_Games.renderLobby()">بازگشت</button>' +
      '</div>' +
    '</div>';
  }

  function getClassResult() {
    if (!session || !session.classResult) return null;
    var inp = document.getElementById('class-name-input');
    if (inp) {
      var nm = window.FGStore.setClassName(inp.value);
      session.classResult.name = nm;
    }
    return session.classResult;
  }

  /* «یک دور دیگر» after a mistake review repeats the same questions */
  var lastRun = null;
  function repeatLast() {
    if (!lastRun || !lastRun.tasks.length) return renderLobby();
    stopActiveTimer();
    sfx('tap');
    session = {
      mode: lastRun.mode, view: 'arena', isExamSim: false, tasks: lastRun.tasks.slice(),
      again: 'FG_Games.repeatLast()', idx: 0, correctCount: 0, answered: false, combo: 0, mistakes: []
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  function startPlacementTest() {
    stopActiveTimer();
    sfx('tap');
    var dist = [2, 2, 2, 2, 1, 1];
    var tasks = [];
    dist.forEach(function (n, gi) {
      var gid = GRADES[gi];
      var g = window.GRAMMAR_CURRICULUM[gid];
      if (!g) return;
      var pool = shuffle((g.items || []).slice());
      var chosen = [];
      var usedLesson = {};
      pool.forEach(function (it) {
        if (chosen.length < n && !usedLesson[it.lesson]) {
          usedLesson[it.lesson] = true;
          chosen.push(it);
        }
      });
      pool.forEach(function (it) {
        if (chosen.length < n) chosen.push(it);
      });
      chosen.forEach(function (it) {
        tasks.push({ subMode: 'cloze', data: it, grade: gid, lesson: it.lesson });
      });
    });
    session = {
      mode: 'placement',
      view: 'arena',
      isExamSim: false,
      tasks: shuffle(tasks),
      idx: 0,
      correctCount: 0,
      answered: false,
      combo: 0,
      mistakes: [],
      placementResults: []
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  function computePlacementResult() {
    var perGrade = {};
    (session.placementResults || []).forEach(function (r) {
      if (!perGrade[r.grade]) perGrade[r.grade] = { correct: 0, total: 0, wrongLessons: [] };
      var p = perGrade[r.grade];
      p.total += 1;
      if (r.correct) p.correct += 1;
      else p.wrongLessons.push(r.lesson);
    });
    // Adaptive placement, fixed:
    //   · the learner must master each level in order,
    //   · the recommended grade is the highest one they passed (≥ 50 %),
    //   · but never higher than the first grade they failed — and when a
    //     later level was passed, it is capped to the highest level they
    //     actually passed *below* that failure.
    // (The old loop could recommend the final-exam level to a learner
    //  who scored 0 on every lower level.)
    var passed = [];
    var failedIdx = -1;
    for (var i = 0; i < GRADES.length; i++) {
      var p = perGrade[GRADES[i]];
      if (!p || !p.total) continue;
      var rate = p.correct / p.total;
      if (rate >= 0.5) passed.push(i);
      else if (failedIdx === -1) failedIdx = i;
    }
    var suggestedIdx = 0;
    if (failedIdx === -1) {
      suggestedIdx = passed.length ? passed[passed.length - 1] : 0;
    } else {
      var below = passed.filter(function (pi) { return pi < failedIdx; });
      suggestedIdx = below.length ? below[below.length - 1] : 0;
    }
    var suggestedGrade = GRADES[suggestedIdx];
    var g = window.GRAMMAR_CURRICULUM[suggestedGrade];
    var suggestedLesson = 1;
    var gp = perGrade[suggestedGrade];
    if (gp && gp.wrongLessons.length) {
      gp.wrongLessons.sort(function (a, b) { return a - b; });
      suggestedLesson = gp.wrongLessons[0];
    }
    if (g && g.lessons && g.lessons.length) {
      var maxLesson = g.lessons[g.lessons.length - 1].id;
      if (suggestedLesson > maxLesson) suggestedLesson = maxLesson;
      if (suggestedLesson < 1) suggestedLesson = 1;
    }
    var st = window.FGStore.getState();
    var byGrade = (st.placement && st.placement.byGrade) || {};   /* v2.11: per-grade memory (Phase 5.2) */
    byGrade[suggestedGrade] = suggestedLesson;
    st.placement = {
      done: true, grade: suggestedGrade, lesson: suggestedLesson,
      score: session.correctCount, total: session.tasks.length, at: Date.now(), perGrade: perGrade, byGrade: byGrade
    };
    st.selectedGrade = suggestedGrade;
    st.selectedLessonByGrade[suggestedGrade] = suggestedLesson;
    window.FGStore.saveState();
    return st.placement;
  }

  function startExamTimer() {
    stopActiveTimer();
    if (!session || !session.deadline) return;
    activeTimer = setInterval(function () {
      var left = session.deadline - Date.now();
      var el = document.getElementById('exam-timer');
      if (left <= 0) {
        if (el) el.textContent = '⏱️ زمان تمام شد';
        stopActiveTimer();
        finishExamByTime();
        return;
      }
      if (!el) return;
      var m = Math.floor(left / 60000);
      var s = Math.floor((left % 60000) / 1000);
      el.textContent = '⏱️ ' + window.FGStore.toFaDigits(m) + ':' +
        window.FGStore.toFaDigits(s < 10 ? '0' + s : String(s));
    }, 1000);
  }

  function finishExamByTime() {
    if (!session) return;
    session.timeUp = true;
    session.idx = session.tasks.length;
    renderQuestionArena();
  }

  function describePicked(step, itemObj) {
    if (!step) return '';
    var sub = step.subMode;
    if (sub === 'error') {
      if (session.pickedChunk == null) return '';
      return 'انتخاب تو: «' + String(itemObj.chunks[session.pickedChunk] || '') + '»';
    }
    if (sub === 'unscramble') {
      return 'پاسخ تو: «' + String(session.builtSentence || session.typedVal || '') + '»';
    }
    if (sub === 'typing' || sub === 'transform') {
      return 'پاسخ تو: «' + String(session.typedVal || '') + '»';
    }
    if (session.pickedOpt) return 'پاسخ تو: «' + String(session.pickedOpt) + '»';
    return '';
  }

  function correctAnswerOf(step, itemObj) {
    if (!step) return '';
    var sub = step.subMode;
    if (sub === 'error') return String(itemObj.fixedChunk || '');
    if (sub === 'unscramble' || sub === 'pickright' || sub === 'listen') return String(itemObj.sentence || '');
    if (sub === 'typing') return String(itemObj.target || '');
    if (sub === 'transform') return String(itemObj.answerEn || '');
    if (sub === 'trap') return String(itemObj.right || '');
    return String(itemObj.target || '');
  }

  function mistakeRow(m) {
    var it = m.data || {};
    var title = friendlyTag(it.ruleTag) || (it.typeFa || 'سؤال');
    return '<div class="mistake-row">' +
      '<div style="font-size:12.5px;font-weight:800;">' + mixed(title) + '</div>' +
      (it.cloze ? '<div class="en-inline" style="font-size:12.5px;">' + esc(it.cloze) + '</div>' : '') +
      (m.picked ? '<div style="font-size:11.8px;color:var(--danger);">❌ ' + esc(m.picked) + '</div>' : '') +
      '<div style="font-size:11.8px;color:var(--success);">✅ ' + esc(m.correct || '') + '</div>' +
      (it.explainFa ? '<div style="font-size:12px;color:var(--ink-2);margin-top:3px;">' + mixed(it.explainFa) + '</div>' : '') +
    '</div>';
  }

  function startMistakeReview() {
    stopActiveTimer();
    var mistakes = (session && session.mistakes) ? session.mistakes.slice() : [];
    if (!mistakes.length) {
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('خطایی برای مرور وجود ندارد.');
      return renderLobby();
    }
    session = {
      mode: 'mistake_review',
      view: 'arena',
      isExamSim: false,
      again: 'FG_Games.repeatLast()',
      tasks: mistakes.map(function (m) {
        return { subMode: m.subMode, data: m.data, grade: m.grade, lesson: m.data ? m.data.lesson : 0 };
      }),
      idx: 0,
      correctCount: 0,
      answered: false,
      combo: 0,
      mistakes: []
    };
    lastRun = { mode: 'mistake_review', tasks: session.tasks.slice() };
    prepareCurrentStep();
    renderQuestionArena();
  }

  /* -------------------------------------------------------------- lobby */
  function renderLobby() {
    stopActiveTimer();
    session = null;
    closeArena();
    if (window.FGApp && typeof window.FGApp.renderPractice === 'function') window.FGApp.renderPractice();
  }

  function setScope(sc) {
    var st = window.FGStore.getState();
    st.gameScope = sc;
    window.FGStore.saveState();
    sfx('tap');
    if (window.FGApp && typeof window.FGApp.renderPractice === 'function') window.FGApp.renderPractice();
  }

  /* ------------------------------------------------------- mode dispatch */
  /**
   * "شروع سریع" — the guaranteed path to a question.
   * A mixed 5-question session built from the learner's current grade
   * (or the whole book if the grade pool is empty). It ALWAYS produces
   * questions, so the primary button on the practice tab can never be
   * a dead end. Used as the fallback for smart review too.
   */
  function startQuickSession(count) {
    stopActiveTimer();
    sfx('tap');
    var n = count || 5;
    /* v2.8: a MIXED session — ≥ 4 exercise types, never the same type twice in
       a row, two easy questions first and two harder ones last */
    var tasks = composeMix(getPool(Math.max(12, n * 3)), n);
    if (!tasks.length) {
      // absolute last resort — a transform from anywhere in the book
      var anyTf = shuffle(window.GRAMMAR_TRANSFORMATIONS || []).slice(0, n);
      tasks = anyTf.map(function (t) { return { subMode: 'transform', data: t }; });
    }
    /* 2.18.0 Phase E: mastery-aware rotation — when the learner's own answers show a
       rule that has not settled yet, swap the middle question of the quick session
       for one from that weakest family. Counts and curve stay untouched. */
    try {
      var weakRules = (window.FGStore.getWeakRules && window.FGStore.getWeakRules(1)) || [];
      if (weakRules.length && tasks.length >= 3 && window.FGStore.getFamilyItems) {
        var fam = String(weakRules[0].familyId || weakRules[0].ruleTag || '').replace(/[^A-Za-z0-9_]/g, '');
        var famItems = window.FGStore.getFamilyItems(fam).map(function (h) { return h.item; })
          .filter(function (it) { return it && it.sentence && !tasks.some(function (t) { return t.data === it; }); });
        if (famItems.length) {
          var weakTask = composeMix(famItems, 1);
          if (weakTask.length) tasks.splice(2, 1, weakTask[0]);
        }
      }
    } catch (e) {}
    if (!tasks.length) {
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('بازی آماده نیست؛ یک درس را شروع کن.');
      return renderLobby();
    }
    session = {
      mode: 'quick', view: 'arena', isExamSim: false,
      tasks: tasks, again: "FG_Games.startMode('quick')",
      idx: 0, correctCount: 0, answered: false, combo: 0
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  /** «تمرین بیشتر»: 8 mixed questions from ONE lesson (≥ 4 exercise types). */
  function startLessonMix(gid, lessonId) {
    stopActiveTimer();
    sfx('tap');
    var g = window.GRAMMAR_CURRICULUM[gid];
    var items = g ? (g.items || []).filter(function (it) { return it.lesson === lessonId; }) : [];
    var tasks = composeMix(items, 8);
    if (!tasks.length) return startQuickSession(5);
    session = {
      mode: 'lesson_mix', view: 'arena', isExamSim: false,
      tasks: tasks, again: "FG_Games.startLessonMix('" + gid + "'," + Number(lessonId) + ")",
      idx: 0, correctCount: 0, answered: false, combo: 0
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  /* 2.18.0 Phase D — trainable exam traps. Lesson trap cards {wrong, right, noteFa}
     existed as passive reading; here they become a two-choice discrimination game
     for the learner's current grade (fallback: the whole book). Fully local. */
  function startTrapsMode() {
    var st = window.FGStore.getState();
    var gid = st.selectedGrade;
    function collect(gid2) {
      var g = window.GRAMMAR_CURRICULUM[gid2];
      var out = [];
      if (!g) return out;
      (g.lessons || []).forEach(function (L) {
        (L.traps || []).forEach(function (t) { out.push({ wrong: t.wrong, right: t.right, noteFa: t.noteFa, lesson: L.id }); });
      });
      return out;
    }
    var pool = collect(gid);
    if (pool.length < 3) {
      pool = [];
      Object.keys(window.GRAMMAR_CURRICULUM).forEach(function (k) { pool = pool.concat(collect(k)); });
    }
    if (!pool.length) {
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('برای این پایه دام امتحانی ثبت نشده است.');
      return renderLobby();
    }
    session = {
      mode: 'traps', view: 'arena', isExamSim: false,
      tasks: shuffle(pool).slice(0, Math.min(8, pool.length)).map(function (t) { return { subMode: 'trap', data: t, grade: gid }; }),
      again: "FG_Games.startMode('traps')",
      idx: 0, correctCount: 0, answered: false, combo: 0,
      trackMistakes: true, mistakes: []
    };
    prepareCurrentStep();
    renderQuestionArena();
  }

  function startMode(mode) {
    stopActiveTimer();
    sfx('tap');
    if (mode === 'quick') { startQuickSession(); return; }
    if (mode === 'match') { startMatchMode(); return; }
    if (mode === 'traps') { startTrapsMode(); return; }
    if (mode === 'blitz') { startBlitzMode(); return; }
    if (mode === 'transform') {
      var tfPool = getTransformPool(6);
      session = {
        mode: 'transform', view: 'arena', isExamSim: false,
        tasks: tfPool.slice(0, Math.min(6, tfPool.length)).map(function (t) {
          return { subMode: 'transform', data: t };
        }),
        idx: 0, correctCount: 0, answered: false, combo: 0
      };
      prepareCurrentStep();
      renderQuestionArena();
      return;
    }
    if (mode === 'exam_sim') {
      var p = getPool(8, { wholeGrade: true });
      var tfp = getTransformPool(2, { wholeGrade: true });
      var tasks = [];
      if (p[0]) tasks.push({ subMode: 'cloze', data: p[0] });
      if (p[1]) tasks.push({ subMode: 'error', data: p[1] });
      if (tfp[0]) tasks.push({ subMode: 'transform', data: tfp[0] });
      if (p[2]) tasks.push({ subMode: 'unscramble', data: p[2] });
      if (p[3]) tasks.push({ subMode: 'cloze', data: p[3] });
      if (p[4]) tasks.push({ subMode: 'typing', data: p[4] });
      if (tfp[1]) tasks.push({ subMode: 'transform', data: tfp[1] });
      if (p[5]) tasks.push({ subMode: 'error', data: p[5] });
      if (p[6]) tasks.push({ subMode: 'unscramble', data: p[6] });
      if (p[7]) tasks.push({ subMode: 'cloze', data: p[7] });

      session = {
        mode: 'exam_sim', view: 'arena', isExamSim: true,
        tasks: tasks, idx: 0, correctCount: 0, answered: false,
        trackMistakes: true, mistakes: [], combo: 0,
        timeLimitSec: 30 * 60, deadline: Date.now() + 30 * 60 * 1000
      };
      prepareCurrentStep();
      renderQuestionArena();
      startExamTimer();
      return;
    }
    if (mode === 'listen' && !canListen()) {
      if (window.FGApp && window.FGApp.showToast) {
        if ((window.FGStore.getState().listenPausedUntil || 0) > Date.now()) window.FGApp.showToast('🔇 تمرین شنیداری تا یک ساعت خاموش است.');
        else if (window.FGApp.openTtsGuide) window.FGApp.openTtsGuide();     // v2.14: say HOW to get an English voice
        else window.FGApp.showToast('🔈 صدای انگلیسی گوشی (Text-to-Speech) آماده نیست.');
      }
      return renderLobby();
    }
    var pool = getPool(24).filter(function (it) { return exerciseEligible(mode, it); });
    var picked = curveOrder(pool.slice(0, 8));
    session = {
      mode: mode, view: 'arena', isExamSim: false,
      tasks: picked.map(function (it) { return { subMode: mode, data: it }; }),
      again: "FG_Games.startMode('" + mode + "')",
      idx: 0, correctCount: 0, answered: false, combo: 0
    };
    if (!session.tasks.length) {
      session = null;
      if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('برای این بازی سؤالی پیدا نشد؛ یک درس دیگر را امتحان کن.');
      return renderLobby();
    }
    prepareCurrentStep();
    renderQuestionArena();
  }

  function prepareCurrentStep() {
    if (!session || session.idx >= session.tasks.length) return;
    var step = session.tasks[session.idx];
    var sub = step.subMode;
    var d = step.data;
    session.answered = false;
    session.fbHead = null;
    session.typedVal = '';
    session.pickedOpt = null;
    session.pickedChunk = null;

    if (sub === 'cloze' || sub === 'transform') {
      session.shuffledOpts = shuffle(d.options);
    } else if (sub === 'trap') {
      session.shuffledOpts = shuffle([d.right, d.wrong]);
    } else if (sub === 'pickright') {
      session.shuffledOpts = shuffle(pickrightSet(d) || [d.sentence]);
    } else if (sub === 'listen') {
      session.shuffledOpts = shuffle(listenSet(d) || [d.sentence]);
      session.autoPlayed = false;
    } else if (sub === 'pairs') {
      var cards = [];
      (step.pairs || []).forEach(function (pit, pi) {
        cards.push({ uid: pi, side: 'L', text: pit.matchLeft }, { uid: pi, side: 'R', text: pit.matchRight });
      });
      session.pairCards = shuffle(cards);
      session.pairSel = null;
      session.pairMatched = {};
      session.pairMistakes = 0;
    } else if (sub === 'unscramble') {
      var origTokens = tokenizeSentenceForUnscramble(d.sentence);
      session.origTokens = origTokens;
      var indexed = origTokens.map(function (t, i) { return { idx: i, text: t }; });
      /* v2.8: ONE extra tile — the common student error — except in the exam
         simulator (the real final exam has no extra words) */
      session.extraWord = session.isExamSim ? null : extraWord(d, origTokens);
      if (session.extraWord) indexed.push({ idx: -1, text: session.extraWord, extra: true });
      session.tokens = shuffle(indexed);
      if (session.tokens.length > 1 && session.tokens.every(function (x, k) { return x.idx === k; })) {
        var tmp = session.tokens[0];
        session.tokens[0] = session.tokens[1];
        session.tokens[1] = tmp;
      }
      session.placedIndices = [];
    }
  }

  function getFixedErrorSentence(d) {
    if (!d || !Array.isArray(d.chunks)) return d ? d.sentence : '';
    var arr = d.chunks.slice();
    if (d.wrongChunkIdx >= 0 && d.wrongChunkIdx < arr.length) arr[d.wrongChunkIdx] = d.fixedChunk;
    return arr.join(' ');
  }

  /* ------------------------------------------------------ feedback panel */
  function feedbackHtml(ok, extraLine) {
    /* picked once per answer, so a re-render never changes the message */
    if (!session.fbHead) session.fbHead = ok ? praise() : comfort();
    var head = session.fbHead;
    var line = extraLine || '';
    var nextLabel = (session.idx + 1 < session.tasks.length) ? 'سؤال بعدی' : 'دیدن نتیجه';
    return '<div class="feedback-panel ' + (ok ? 'ok' : 'no') + '" role="status" aria-live="polite">' +
      '<div class="feedback-head">' +
        (window.FGMascot ? window.FGMascot.svg(ok ? 'happy' : 'oops', 64) : '') +
        '<span>' + esc(head) + '</span>' +
      '</div>' +
      '<div class="feedback-body">' + (line ? line : (ok ? 'همین بود! آفرین.' : 'اشکالی ندارد؛ همین یکی را مرور می‌کنیم.')) + '</div>' +
      '<button class="btn btn-primary" onclick="FG_Games.nextQuestion()">' + esc(nextLabel) + ' ←</button>' +
    '</div>';
  }

  function attachFeedback(ok, line) {
    var host = document.getElementById('games-container');
    if (!host) return;
    var panel = document.createElement('div');
    panel.innerHTML = feedbackHtml(ok, line);
    var node = panel.firstChild;
    if (node && host.appendChild) host.appendChild(node);
    fitFeedback(node);
    setTimeout(function () { revealAbovePanel(host, node); }, 320);   // after the panel has slid up
  }

  /* v2.13 (stranger test): with a long sentence on 360×640 the sticky feedback panel hid the RIGHT
     option after a wrong answer (7 of 12 probes in grade 12). The arena is exactly one screen tall,
     so a spacer makes room and the options slide up under the pinned panel. Used by the smart review too. */
  function revealAbovePanel(host, panel) {
    var sc = document.getElementById('app-content');
    if (!host || !panel || !sc || panel.isConnected === false) return;
    var right = host.querySelector('.option-btn.correct');
    if (!right) return;
    var over = right.getBoundingClientRect().bottom + 8 - panel.getBoundingClientRect().top;
    if (over <= 0) return;
    var body = host.querySelector('.arena-body') || host;
    var sp = body.querySelector('.fb-spacer');
    if (!sp) {
      sp = document.createElement('div');
      sp.className = 'fb-spacer';
      sp.setAttribute('aria-hidden', 'true');
      body.appendChild(sp);
    }
    var h = Math.ceil(over + 104);                      // + the panel's −96px bottom margin
    sp.style.height = h + 'px';
    var room = sc.scrollHeight - sc.clientHeight - sc.scrollTop;
    if (room < over) sp.style.height = (h + Math.ceil(over - room) + 8) + 'px';
    sc.scrollTop += over;
  }

  /* v2.9.0: the explanation is clamped to 2 lines; when it is longer the text itself becomes the toggle
     (role=button, Enter/Space, «ادامه ▾» badge on its last line) — no extra height, and the full text
     scrolls inside the sheet so the primary button never leaves the screen */
  function fitFeedback(root) {
    if (!root || !root.querySelectorAll) return;
    var bodies = root.classList && root.classList.contains('feedback-body') ? [root] : root.querySelectorAll('.feedback-body');
    for (var i = 0; i < bodies.length; i++) {
      var b = bodies[i];
      if (b.getAttribute('data-fit') === '1') continue;
      b.setAttribute('data-fit', '1');
      if (!(b.scrollHeight - b.clientHeight > 3)) continue;
      b.classList.add('clampable');
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', toggleFeedback);
      b.addEventListener('keydown', toggleFeedback);
    }
  }
  function toggleFeedback(e) {
    if (e.type === 'keydown') { if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault(); }
    var b = e.currentTarget, open = !b.classList.contains('expanded');
    b.classList.toggle('expanded', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    sfx('tap');
  }

  /* ------------------------------------------------------ question arena */
  function arenaTopHtml(total, current) {
    var fa = window.FGStore.toFaDigits;
    var pct = Math.round((current / total) * 100);
    var combo = '';
    if (session.combo >= 2) {
      combo = '<span class="combo-badge">🔥 ×' + fa(session.combo) + '</span>';
    }
    var timer = session.deadline
      ? '<span class="chip" id="exam-timer" role="timer" aria-live="off">⏱️ ۳۰:۰۰</span>'
      : '';
    return '<div class="arena-top">' +
      '<button class="icon-btn" onclick="FG_Games.exitArena()" aria-label="بستن و بازگشت">✕</button>' +
      '<div class="progress"><i style="width:' + pct + '%"></i></div>' +
      '<span class="chip">' + fa(current + 1) + '/' + fa(total) + '</span>' +
      combo + timer +
    '</div>';
  }

  function renderQuestionArena() {
    var host = arenaHost();
    if (!host || !session) return;
    var fa = window.FGStore.toFaDigits;
    session.view = 'arena';
    ensurePracticeTab();

    if (session.idx >= session.tasks.length) {
      renderResult(host, fa);
      return;
    }

    var step = session.tasks[session.idx];
    var sub = step.subMode;
    var it = step.data;
    var tagTitle = sub === 'transform' ? it.typeFa : (sub === 'pairs' ? 'جفت‌کردن قاعده‌ها' : friendlyTag(it.ruleTag));
    var speakTarget = '';
    if (sub === 'transform') speakTarget = session.answered ? it.answerEn : it.promptEn;
    else if (sub === 'error') speakTarget = session.answered ? getFixedErrorSentence(it) : it.chunks.join(' ');
    else if (sub === 'unscramble') speakTarget = it.sentence;
    /* «کدام درست است؟» / «شنیدن»: reading a sentence aloud before answering would give it away */
    else if (sub === 'pickright' || sub === 'listen' || sub === 'pairs') speakTarget = session.answered && sub !== 'pairs' ? it.sentence : '';
    else speakTarget = session.answered ? it.sentence : String(it.cloze || '').replace('_____', ' ... ');

    /* the rule line can name the answer itself («پرسش رنگ با is») → then it waits until after the answer */
    var showTag = session.answered || !tagGivesAway(sub, it, tagTitle,
      sub === 'unscramble' ? (session.extraWord ? [session.extraWord] : []) : session.shuffledOpts);
    var topBar = arenaTopHtml(session.tasks.length, session.idx);
    var body = '';

    if (sub === 'transform') {
      body =
        '<div class="read-more" style="margin-bottom:12px;">🔄 ' + mixed(it.instructionFa) + '</div>' +
        '<div class="question-en ltr-block">' + esc(it.promptEn) + '</div>' +
        (transformWriteMode
          ? '<input type="text" id="tf-type-input" class="search-input en-ltr" autocomplete="off" spellcheck="false" ' +
              'placeholder="Write the sentence..." value="' + esc(session.typedVal || '') + '" ' +
              (session.answered ? 'disabled' : '') +
              ' onkeydown="if(event.key===\'Enter\'){FG_Games.submitTransformTyped();}" />' +
            (!session.answered ? '<button class="btn btn-primary" style="margin-top:10px;" onclick="FG_Games.submitTransformTyped()">ثبت بازنویسی</button>' : '')
          : '<div class="option-list">' + session.shuffledOpts.map(function (opt, oi) {
              var cls = 'option-btn';
              if (session.answered) {
                if (opt === it.answerEn) cls += ' correct';
                else if (opt === session.pickedOpt) cls += ' wrong';
                else cls += ' dim collapsed';   /* v2.13: like the lessons — only the picked and the right one stay */
              }
              return '<button class="' + cls + '" ' + (session.answered ? 'disabled' : '') +
                ' onclick="FG_Games.pickTransformOption(' + oi + ')">' +
                '<span class="opt-key">' + fa(oi + 1) + '</span>' +
                '<span class="grow en-inline">' + esc(opt) + '</span></button>';
            }).join('') + '</div>');
    }

    else if (sub === 'cloze') {
      body =
        '<div class="question-en ltr-block">' + esc(it.cloze) + '</div>' +
        '<div style="font-size:13px;color:var(--ink-2);margin:-4px 0 12px;">💬 ' + mixed(it.fa) + '</div>' +
        '<div class="option-list">' + session.shuffledOpts.map(function (opt, oi) {
          var cls = 'option-btn';
          if (session.answered) {
            if (opt === it.target) cls += ' correct';
            else if (opt === session.pickedOpt) cls += ' wrong';
            else cls += ' dim collapsed';
          }
          return '<button class="' + cls + '" ' + (session.answered ? 'disabled' : '') +
            ' onclick="FG_Games.pickClozeOption(' + oi + ')">' +
            '<span class="opt-key">' + fa(oi + 1) + '</span>' +
            '<span class="grow en-inline">' + esc(opt) + '</span></button>';
        }).join('') + '</div>';
    }

    else if (sub === 'trap') {
      body =
        '<div class="ex-title">🪤 دام امتحانی — کدام جمله درست است؟</div>' +
        '<div style="font-size:13px;color:var(--ink-2);margin:-4px 0 12px;">یکی از این دو جمله دام است؛ جملهٔ درست را پیدا کن.</div>' +
        '<div class="option-list">' + session.shuffledOpts.map(function (opt, oi) {
          var cls = 'option-btn';
          if (session.answered) {
            if (opt === it.right) cls += ' correct';
            else if (opt === session.pickedOpt) cls += ' wrong';
            else cls += ' dim collapsed';
          }
          return '<button class="' + cls + '" ' + (session.answered ? 'disabled' : '') +
            ' onclick="FG_Games.pickTrapOption(' + oi + ')">' +
            '<span class="opt-key">' + fa(oi + 1) + '</span>' +
            '<span class="grow en-inline">' + esc(opt) + '</span></button>';
        }).join('') + '</div>';
    }

    else if (sub === 'pickright' || sub === 'listen') {
      var isListen = sub === 'listen';
      body =
        '<div class="ex-title">' + (isListen ? '🎧 گوش کن و همان جمله را انتخاب کن' : '✅ کدام جمله درست است؟') + '</div>' +
        (isListen
          ? '<div class="listen-row' + (session.answered ? ' compact' : '') + '">' +
              '<button class="listen-play" onclick="FG_Games.playListen(false)" aria-label="پخش جمله">' +
                '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>' +
              '<button class="btn btn-secondary btn-sm" onclick="FG_Games.playListen(true)" aria-label="پخش آهسته">🐢 آهسته</button>' +
            '</div>'
          : '<div class="ex-sub">💬 ' + mixed(it.fa) + '</div>') +
        '<div class="option-list">' + session.shuffledOpts.map(function (sent, oi) {
          var cls = 'option-btn sent-opt';
          var label = esc(sent);
          if (session.answered) {
            if (sent === it.sentence) cls += ' correct';
            else {
              cls += sent === session.pickedOpt ? ' wrong' : ' dim collapsed';
              if (!isListen) label = flawedHtml(it);
            }
          }
          return '<button class="' + cls + '" ' + (session.answered ? 'disabled' : '') +
            ' onclick="FG_Games.pickSentence(' + oi + ')">' +
            '<span class="opt-key">' + fa(oi + 1) + '</span>' +
            '<span class="grow sent-text" dir="ltr">' + label + '</span></button>';
        }).join('') + '</div>' +
        (isListen && !session.answered
          ? '<button class="btn btn-ghost btn-sm no-audio" onclick="FG_Games.skipListening()">🔇 الان نمی‌توانم گوش بدهم</button>'
          : '');
    }

    else if (sub === 'pairs') {
      body =
        '<div class="ex-title">🔗 هر الگو را به جفتش وصل کن</div>' +
        '<div class="ex-sub">اول یکی را بزن، بعد جفتش را.</div>' +
        '<div class="match-board">' + session.pairCards.map(function (c, ci) {
          var cls = 'match-tile';
          var done = !!session.pairMatched[c.uid];
          if (done) cls += ' matched';
          else if (session.pairSel === ci) cls += ' selected';
          return '<button class="' + cls + '" dir="auto" data-side="' + c.side + '" ' + (done || session.answered ? 'disabled' : '') +
            ' onclick="FG_Games.tapPair(' + ci + ')">' + mixed(c.text) + '</button>';
        }).join('') + '</div>';
    }

    else if (sub === 'unscramble') {
      var placedHtml = session.placedIndices.length === 0
        ? '<span dir="rtl" style="color:var(--ink-3);font-size:13px;direction:rtl;unicode-bidi:isolate;">روی کلمه‌ها بزن تا جمله ساخته شود…</span>'
        : session.placedIndices.map(function (bankIdx, pos) {
            var tok = session.tokens[bankIdx];
            return '<button class="word-token-btn placed en-inline" ' + (session.answered ? 'disabled' : '') +
              ' onclick="FG_Games.unplaceToken(' + pos + ')">' + esc(tok.text) + '</button>';
          }).join('');
      var bankHtml = session.tokens.map(function (tok, bi) {
        var isUsed = session.placedIndices.indexOf(bi) !== -1;
        /* after checking, the extra tile shows itself */
        var extraCls = session.answered && tok.extra ? ' extra' : '';
        return '<button class="word-token-btn en-inline ' + (isUsed ? 'used' : '') + extraCls + '" ' +
          (session.answered || isUsed ? 'disabled' : '') +
          ' onclick="FG_Games.placeToken(' + bi + ')">' + esc(tok.text) + '</button>';
      }).join('');
      body =
        '<div class="read-more" style="margin-bottom:12px;">🧩 معنی جمله: <strong>' + mixed(it.fa) + '</strong>' +
          (session.extraWord ? '<div class="extra-hint">کلمه‌ها را به ترتیب بزن؛ <b>یک کلمه اضافه است</b>.</div>' : '') +
        '</div>' +
        '<div class="unscramble-rail en-ltr">' + placedHtml + '</div>' +
        '<div class="unscramble-bank en-ltr">' + bankHtml + '</div>' +
        (!session.answered
          ? '<div class="row btn-row" style="gap:8px;margin-top:12px;">' +
              '<button class="btn btn-primary" onclick="FG_Games.checkUnscramble()">بررسی جمله</button>' +
              '<button class="btn btn-secondary" onclick="FG_Games.clearUnscramble()">پاک کردن</button></div>'
          : '');
    }

    else if (sub === 'error') {
      body =
        '<div class="read-more" style="margin-bottom:12px;">🔍 کدام بخش غلط است؟' +
          (showTag ? ' <strong>' + mixed(friendlyTag(it.ruleTag)) + '</strong>' : '') + '</div>' +
        '<div class="question-en ltr-block">' + esc(it.chunks.join(' ')) + '</div>' +
        '<div class="option-list">' + it.chunks.map(function (ch, ci) {
          var cls = 'option-btn';
          var label = ch;
          if (session.answered) {
            if (ci === it.wrongChunkIdx) { cls += ' correct'; label = ch + ' → ' + it.fixedChunk; }
            else if (ci === session.pickedChunk) cls += ' wrong';
            else cls += ' dim collapsed';
          }
          return '<button class="' + cls + '" ' + (session.answered ? 'disabled' : '') +
            ' onclick="FG_Games.pickErrorChunk(' + ci + ')">' +
            '<span class="grow en-inline">' + esc(label) + '</span></button>';
        }).join('') + '</div>';
    }

    else if (sub === 'typing') {
      body =
        '<div class="read-more" style="margin-bottom:12px;">✍️ ' +
          /* a hint that equals the answer would give it away → then only the meaning helps */
          (it.promptHint && lc(it.promptHint).trim() !== lc(it.target).trim()
            ? 'کلمهٔ جاافتاده را بنویس. راهنما: <strong>' + mixed(it.promptHint) + '</strong>'
            : 'کلمهٔ جاافتاده را بنویس (۱ یا ۲ کلمه).') +
        '</div>' +
        '<div class="question-en ltr-block">' + esc(it.cloze) + '</div>' +
        '<div style="font-size:13px;color:var(--ink-2);margin:-4px 0 12px;">💬 ' + mixed(it.fa) + '</div>' +
        '<input type="text" id="form-type-input" class="search-input en-ltr" lang="en" dir="ltr" inputmode="text" enterkeyhint="done" ' +
          'autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="جواب را تایپ کن" ' +
          'placeholder="Type the missing word" value="' + esc(session.typedVal || '') + '" ' +
          (session.answered ? 'disabled' : '') +
          ' onkeydown="if(event.key===\'Enter\'){FG_Games.checkTypedForm();}" />' +
        (!session.answered
          ? '<div class="row btn-row" style="gap:8px;margin-top:10px;">' +
              '<button class="btn btn-primary" onclick="FG_Games.checkTypedForm()">ثبت پاسخ</button>' +
              '<button class="btn btn-secondary" onclick="FG_Games.giveTypeHint()">💡 راهنما</button></div>'
          : '');
    }

    var tail = '<div class="row-between" style="margin-top:12px;font-size:12px;color:var(--ink-3);">' +
      '<span class="rule-line">' + (showTag ? mixed(tagTitle || '') : '') + '</span>' +
      (speakTarget
        ? '<button class="chip" onclick="FGStore.speakEnglish(' + JSON.stringify(speakTarget).replace(/"/g, '&quot;') + ')">🔊 شنیدن</button>'
        : '') +
    '</div>';

    host.innerHTML = '<div class="arena" data-sub="' + esc(sub) + '" data-item="' + esc(it.id || '') + '">' + topBar + '<div class="arena-body">' + body + tail + '</div></div>';

    if (session.answered) {
      attachFeedback(session.wasCorrect, session.feedbackLine || '');
    }
    /* «شنیدن و انتخاب» plays the sentence once by itself */
    if (sub === 'listen' && !session.answered && !session.autoPlayed) {
      session.autoPlayed = true;
      setTimeout(function () { if (session && !session.answered) playListen(false, true); }, 350);
    }
  }

  /* ------------------------------------------------- v2.8 answer handlers */
  function pickSentence(oi) {
    if (!session || session.answered) return;
    var step = session.tasks[session.idx];
    var it = step.data;
    var picked = session.shuffledOpts[oi];
    session.answered = true;
    session.pickedOpt = picked;
    session.wasCorrect = picked === it.sentence;
    session.feedbackLine = mixed(it.explainFa || '');
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, step.subMode === 'listen' ? 'listenSolved' : 'pickRightSolved', it);
    renderQuestionArena();
  }

  function playListen(slow, auto) {
    if (!session) return;
    var step = session.tasks[session.idx];
    if (!step || step.subMode !== 'listen') return;
    if (!auto) sfx('tick');
    window.FGStore.speakEnglish(step.data.sentence, slow ? 0.62 : 0.9);
  }

  /** «الان نمی‌توانم گوش بدهم»: no listening for one hour; this step becomes «کدام درست است؟». */
  function skipListening() {
    if (!session || session.answered) return;
    var step = session.tasks[session.idx];
    var st = window.FGStore.getState();
    st.listenPausedUntil = Date.now() + 60 * 60 * 1000;
    window.FGStore.saveState();
    step.subMode = exerciseEligible('pickright', step.data) ? 'pickright' : 'cloze';
    prepareCurrentStep();
    renderQuestionArena();
    if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('🔇 تا یک ساعت تمرین شنیداری نمی‌آید.');
  }

  function tapPair(ci) {
    if (!session || session.answered) return;
    var c = session.pairCards[ci];
    if (!c || session.pairMatched[c.uid]) return;
    if (session.pairSel === null || session.pairSel === ci) {
      session.pairSel = session.pairSel === ci ? null : ci;
      sfx('tap');
      renderQuestionArena();
      return;
    }
    var first = session.pairCards[session.pairSel];
    if (first.side === c.side) {           // same column → just move the selection
      session.pairSel = ci;
      sfx('tap');
      renderQuestionArena();
      return;
    }
    if (first.uid === c.uid) {
      session.pairMatched[c.uid] = true;
      sfx('tick');
    } else {
      session.pairMistakes += 1;
      sfx('pop');
    }
    session.pairSel = null;
    var total = (session.tasks[session.idx].pairs || []).length;
    if (Object.keys(session.pairMatched).length >= total) {
      var fa = window.FGStore.toFaDigits;
      session.answered = true;
      session.wasCorrect = session.pairMistakes <= 1;
      session.feedbackLine = session.pairMistakes === 0
        ? 'هر ' + fa(total) + ' جفت را بی‌اشتباه پیدا کردی.'
        : 'هر ' + fa(total) + ' جفت پیدا شد، با ' + fa(session.pairMistakes) + ' اشتباه.';
      if (session.wasCorrect) session.correctCount += 1;
      bumpCombo(session.wasCorrect);
      recordQuestionOutcome(session.wasCorrect, 'pairsSolved', null);
    }
    renderQuestionArena();
  }

  /* ---------------------------------------------------------- the result */
  function renderResult(host, fa) {
    sfx('fanfare');
    stopActiveTimer();
    var total = session.tasks.length;
    var pct = Math.round((session.correctCount / total) * 100);
    var score20 = Math.round((session.correctCount / total) * 20 * 2) / 2;

    if (session.mode === 'placement_grade') {
      host.innerHTML = gradePlacementResultHtml(fa);
      if (session.correctCount / total >= 0.85) celebrate(24);
      return;
    }

    if (session.mode === 'class') {
      host.innerHTML = classResultHtml(fa, total);
      if (session.correctCount / total >= 0.85) celebrate(26);
      return;
    }

    if (session.mode === 'placement') {
      var pl = computePlacementResult();
      var rowsHtml = GRADES.map(function (gid) {
        var p = pl.perGrade[gid];
        var c = p ? p.correct : 0, t = p ? p.total : 0;
        var acc = t ? Math.round((c / t) * 100) : 0;
        return '<div class="row-between" style="font-size:12.5px;font-weight:700;margin-bottom:4px;">' +
            '<span>' + esc(gradeTitle(gid)) + '</span>' +
            '<span>' + fa(c) + ' / ' + fa(t) + ' (' + fa(acc) + '٪)</span>' +
          '</div>' +
          '<div class="progress" style="margin-bottom:10px;"><i style="width:' + acc + '%"></i></div>';
      }).join('');
      host.innerHTML = '<div class="card" style="text-align:center;">' +
        '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(FGMascot.resultState(pl.score, pl.total), 104) : '') + '</div>' +
        '<h3 style="margin:6px 0 2px;font-size:18px;font-weight:800;">نتیجهٔ آزمون تعیین سطح</h3>' +
        '<p style="font-size:13px;color:var(--ink-2);margin:0 0 12px;">درست: <strong>' + fa(pl.score) + '</strong> از <strong>' + fa(pl.total) + '</strong></p>' +
        '<div class="read-more" style="text-align:start;margin-bottom:12px;">' +
          '<b>پیشنهاد ما:</b> ' + esc(gradeTitle(pl.grade)) + ' • درس ' + fa(pl.lesson) + '</div>' +
        rowsHtml +
        '<button class="btn btn-primary" onclick="FGApp.switchTab(\'path\')">شروع مسیر یادگیری ←</button>' +
        '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.startPlacementTest()">تکرار آزمون</button>' +
      '</div>';
      return;
    }

    var mistakesHtml = '';
    if (session.mistakes && session.mistakes.length) {
      /* 2.18.0 Phase B: group this session's mistakes by rule so the report card
         reads per-topic, not as one flat list. Local only; nothing is transmitted. */
      var byRule = {};
      session.mistakes.forEach(function (m) {
        var it0 = m.data || {};
        var key = friendlyTag(it0.ruleTag) || (it0.typeFa || 'سؤال');
        byRule[key] = (byRule[key] || 0) + 1;
      });
      var ruleSummary = Object.keys(byRule).sort(function (a, b) { return byRule[b] - byRule[a]; }).map(function (k) {
        return '<span class="chip" style="margin:2px;">' + mixed(k) + ': ' + fa(byRule[k]) + ' خطا</span>';
      }).join('');
      mistakesHtml = '<div class="card" style="margin-top:12px;text-align:start;">' +
        '<h3 style="margin:0 0 8px;font-size:15px;font-weight:800;">🔁 مرور خطاهای این برگه (' + fa(session.mistakes.length) + ' خطا)</h3>' +
        '<div style="margin-bottom:8px;">' + ruleSummary + '</div>' +
        session.mistakes.map(mistakeRow).join('') +
        '<button class="btn btn-secondary" style="margin-top:10px;" onclick="FG_Games.startMistakeReview()">تمرین دوبارهٔ همین خطاها</button>' +
      '</div>';
    }

    if (session.mode === 'weak') {
      /* v2.11 (Phase 5.1): did the rule settle? (its last answers are now mostly right) */
      var prog = window.FGStore.getRuleProgress ? window.FGStore.getRuleProgress(session.weakRule) : { needsPractice: true, n: 0, correct: 0 };
      var settled = !prog.needsPractice;
      var againJs = (session.again || '').replace(/"/g, '&quot;');
      host.innerHTML = '<div class="card drill-result" style="text-align:center;">' +
        '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(settled ? 'cheer' : 'think', 104) : '') + '</div>' +
        '<h3 style="margin:6px 0 2px;font-size:18px;font-weight:800;">' + (settled ? 'این قاعده جا افتاد! 👏' : 'یک قدم نزدیک‌تر شدی 🌱') + '</h3>' +
        '<div class="drill-rule">' + mixed(session.weakLabel || '') + '</div>' +
        '<p style="font-size:13.5px;color:var(--ink-2);margin:4px 0 6px;">درست: <strong>' + fa(session.correctCount) + '</strong> از <strong>' + fa(total) + '</strong></p>' +
        '<p style="font-size:12.5px;color:var(--ink-2);margin:0 0 14px;">' +
          (settled
            ? 'از فهرست «هنوز جا نیفتاده» بیرون رفت. هر وقت خواستی دوباره تمرینش کن.'
            : 'از ' + fa(prog.n) + ' جواب آخرت در این قاعده، ' + fa(prog.correct) + ' تا درست بوده؛ یک دور دیگر جا می‌افتد.') +
        '</p>' +
        (settled
          ? '<button class="btn btn-primary" onclick="FG_Games.renderLobby()">بازگشت به تمرین</button>' +
            '<button class="btn btn-secondary" style="margin-top:8px;" onclick="' + againJs + '">یک دور دیگر</button>'
          : '<button class="btn btn-primary" onclick="' + againJs + '">یک دور دیگر</button>' +
            '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.renderLobby()">بازگشت</button>') +
      '</div>' + mistakesHtml;
      if (settled) celebrate(30);
      return;
    }

    if (session.isExamSim) {
      var st = window.FGStore.getState();
      if (score20 > (st.stats.bestExamScore20 || 0)) {
        st.stats.bestExamScore20 = score20;
        window.FGStore.saveState();
      }
    }

    host.innerHTML = '<div class="card" style="text-align:center;">' +
      '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(FGMascot.resultState(session.correctCount, total), 112) : '') + '</div>' +
      '<h3 style="margin:6px 0;font-size:18px;font-weight:800;">' +
        (session.isExamSim ? ('نمرهٔ آزمون: ' + fa(score20) + ' از ۲۰') : 'این دور تمام شد!') + '</h3>' +
      (session.timeUp ? '<div style="font-size:12.5px;color:var(--warn);font-weight:800;margin-bottom:6px;">⏱️ زمان تمام شد.</div>' : '') +
      '<p style="font-size:13.5px;color:var(--ink-2);margin:0 0 14px;">درست: <strong>' + fa(session.correctCount) + '</strong> از <strong>' + fa(total) + '</strong> (' + fa(pct) + '٪)</p>' +
      '<button class="btn btn-primary" onclick="' + (session.again || ('FG_Games.startMode(\'' + session.mode + '\')')).replace(/"/g, '&quot;') + '">یک دور دیگر</button>' +
      '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.renderLobby()">بازگشت</button>' +
    '</div>' + mistakesHtml;
    if (session.correctCount / total >= 0.85) celebrate(26);
  }

  /* ------------------------------------------------------------ answers */
  function toggleTransformInputMode() {
    transformWriteMode = !transformWriteMode;
    sfx('tap');
    renderQuestionArena();
  }

  function pickTransformOption(oi) {
    if (!session || session.answered) return;
    var step = session.tasks[session.idx];
    var it = step.data;
    var picked = session.shuffledOpts[oi];
    session.answered = true;
    session.pickedOpt = picked;
    session.wasCorrect = picked === it.answerEn;
    session.feedbackLine = '<span class="en-inline">' + esc(it.answerEn) + '</span>';
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'transformsSolved', it);
    renderQuestionArena();
  }

  /* v2.17 (R12): Persian letters in an English answer = the keyboard is still on Persian → not graded, say how to fix it */
  function persianKeyboardHint(inp) {
    sfx('tap');
    if (window.FGApp && window.FGApp.showToast) window.FGApp.showToast('⌨️ صفحه‌کلید روی فارسی است؛ آن را انگلیسی کن و دوباره بنویس.');
    if (inp) { try { inp.focus(); } catch (e) {} }
  }
  var PERSIAN_RX = /[\u0600-\u06FF]/;

  function submitTransformTyped() {
    if (!session || session.answered) return;
    var inp = document.getElementById('tf-type-input');
    var val = inp ? inp.value : '';
    if (!String(val).trim()) { if (inp) inp.focus(); sfx('tap'); return; }      /* v2.17 (R12): an empty «ثبت» is not an answer */
    if (PERSIAN_RX.test(val)) { persianKeyboardHint(inp); return; }
    var step = session.tasks[session.idx];
    var it = step.data;
    session.typedVal = val;
    session.answered = true;
    session.wasCorrect = isAnswerEquivalent(val, it.answerEn, it.id, it.altAnswers);
    /* 2.18.0 Phase C: model answer + Brown & Bailey-style self-assessment rubric.
       The rubric is non-scoring; the student compares their sentence with the model
       and ticks the checks honestly. Fully local. */
    session.feedbackLine = '<span class="en-inline">' + esc(it.answerEn) + '</span>' +
      (it.explainFa ? ' — ' + mixed(it.explainFa) : '') +
      '<div style="margin-top:8px;font-size:12px;text-align:start;">' +
        '<div style="font-weight:800;margin-bottom:4px;">خودارزیابی: جمله‌ات را با پاسخ نمونه مقایسه کن و تیک بزن:</div>' +
        '<label style="display:block;"><input type="checkbox"> ساختار (فاعل، فعل و زمان) را با نمونه مقایسه کردم</label>' +
        '<label style="display:block;"><input type="checkbox"> املا و نشانه‌گذاری را چک کردم</label>' +
        '<label style="display:block;"><input type="checkbox"> می‌توانم بگویم چرا این ساختار درست است</label>' +
      '</div>';
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'transformsSolved', it);
    renderQuestionArena();
  }


  function pickTrapOption(oi) {
    if (!session || session.answered) return;
    var it = session.tasks[session.idx].data;
    var picked = session.shuffledOpts[oi];
    session.answered = true;
    session.pickedOpt = picked;
    session.wasCorrect = picked === it.right;
    session.feedbackLine = 'درست: <span class="en-inline">' + esc(it.right) + '</span>' + (it.noteFa ? ' — ' + mixed(it.noteFa) : '');
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'trapsSolved', it);
    renderQuestionArena();
  }

  function pickClozeOption(oi) {
    if (!session || session.answered) return;
    var it = session.tasks[session.idx].data;
    var picked = session.shuffledOpts[oi];
    session.answered = true;
    session.pickedOpt = picked;
    session.wasCorrect = picked === it.target;
    session.feedbackLine = 'درست: <span class="en-inline">' + esc(it.target) + '</span> — ' + mixed(it.explainFa || '');
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, null, it);
    renderQuestionArena();
  }

  function placeToken(bankIdx) {
    if (!session || session.answered) return;
    if (session.placedIndices.indexOf(bankIdx) !== -1) return;
    sfx('tick');
    session.placedIndices.push(bankIdx);
    renderQuestionArena();
  }

  function unplaceToken(pos) {
    if (!session || session.answered) return;
    sfx('tap');
    session.placedIndices.splice(pos, 1);
    renderQuestionArena();
  }

  function clearUnscramble() {
    if (!session || session.answered) return;
    session.placedIndices = [];
    renderQuestionArena();
  }

  function checkUnscramble() {
    if (!session || session.answered) return;
    /* nothing placed yet → not an answer (same rule as the empty typed blank) */
    if (!session.placedIndices.length) { sfx('tap'); return; }
    var it = session.tasks[session.idx].data;
    var built = session.placedIndices.map(function (bi) { return session.tokens[bi].text; }).join(' ');
    session.builtSentence = built;
    session.answered = true;
    session.wasCorrect = built.replace(/\s+/g, ' ').trim() === it.sentence.replace(/\s+/g, ' ').trim();
    session.feedbackLine = '<span class="en-inline">' + esc(it.sentence) + '</span>';
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'unscrambleSolved', it);
    renderQuestionArena();
  }

  function pickErrorChunk(ci) {
    if (!session || session.answered) return;
    var it = session.tasks[session.idx].data;
    session.answered = true;
    session.pickedChunk = ci;
    session.wasCorrect = ci === it.wrongChunkIdx;
    session.feedbackLine = 'درست: <span class="en-inline">' + esc(it.fixedChunk) + '</span> — ' + mixed(it.explainFa || '');
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'errorsHunted', it);
    renderQuestionArena();
  }

  function giveTypeHint() {
    if (!session || session.answered) return;
    var it = session.tasks[session.idx].data;
    var inp = document.getElementById('form-type-input');
    if (inp) {
      inp.value = it.target.slice(0, Math.min(2, it.target.length));
      inp.focus();
    }
    sfx('tick');
  }

  function checkTypedForm() {
    if (!session || session.answered) return;
    var inp = document.getElementById('form-type-input');
    var val = inp ? inp.value : '';
    if (!String(val).trim()) { if (inp) inp.focus(); sfx('tap'); return; }
    if (PERSIAN_RX.test(val)) { persianKeyboardHint(inp); return; }
    var it = session.tasks[session.idx].data;
    session.typedVal = val;
    session.answered = true;
    /* flexible: case, spaces, curly apostrophes, contractions + the item's altAnswers (if any) */
    var exact = isAnswerEquivalent(val, it.target, it.id, []);
    session.wasCorrect = exact || isAnswerEquivalent(val, it.target, it.id, it.altAnswers || []);
    /* v2.10.0: a REGISTER variant (object «who», counterfactual «was», «a bit» …) is not accepted under the
       formal written norm — but it is not ungrammatical either, so the note says exactly that */
    var informal = null;
    if (!session.wasCorrect && it.informalAnswers) {
      for (var k = 0; k < it.informalAnswers.length; k++) {
        if (isAnswerEquivalent(val, it.informalAnswers[k].f, it.id, [])) { informal = it.informalAnswers[k]; break; }
      }
    }
    if (informal) session.fbHead = 'نزدیک بود! 🙂';
    /* v2.9.0: another correct answer (e.g. «was» where no time is given) is accepted with a gentle note */
    session.feedbackLine = informal
      ? mixed(informal.n) + ' شکلِ درست: <span class="en-inline">' + esc(it.target) + '</span>'
      : (!exact && session.wasCorrect)
      ? '<span class="en-inline">' + esc(String(val).trim()) + '</span> هم درست است. شکلِ این درس: <span class="en-inline">' + esc(it.target) + '</span> — ' + mixed(it.explainFa || '')
      : 'درست: <span class="en-inline">' + esc(it.target) + '</span> — ' + mixed(it.explainFa || '');
    if (session.wasCorrect) session.correctCount += 1;
    bumpCombo(session.wasCorrect);
    recordQuestionOutcome(session.wasCorrect, 'formsTyped', it);
    renderQuestionArena();
  }

  function nextQuestion() {
    if (!session) return;
    session.idx += 1;
    session.feedbackLine = '';
    prepareCurrentStep();
    renderQuestionArena();
  }

  function exitArena() {
    sfx('tap');
    /* the placement offered by the onboarding: ✕ = «رد شدن» → straight to the path, lesson 1 */
    if (session && session.mode === 'placement_grade' && session.fromOnboarding) { leaveToPath(''); return; }
    renderLobby();
  }

  /* ==================== PATTERN MATCH BOARD ==================== */
  function startMatchMode() {
    var pool = getPool(6);
    var chosen = [];
    var usedRight = {};
    for (var i = 0; i < pool.length && chosen.length < 6; i++) {
      var rKey = pool[i].matchRight;
      if (!usedRight[rKey]) {
        usedRight[rKey] = true;
        chosen.push(pool[i]);
      }
    }
    var cards = [];
    chosen.forEach(function (it, idx) {
      cards.push({ uid: 'L_' + idx, pairId: idx, side: 'L', text: it.matchLeft });
      cards.push({ uid: 'R_' + idx, pairId: idx, side: 'R', text: it.matchRight });
    });
    session = {
      mode: 'match', view: 'match', cards: shuffle(cards),
      selectedIdx: null, matchedPairs: 0, totalPairs: chosen.length, moves: 0, matchedMap: {}
    };
    renderMatchBoard();
  }

  function renderMatchBoard() {
    var host = arenaHost();
    if (!host || !session) return;
    var fa = window.FGStore.toFaDigits;
    ensurePracticeTab();

    if (session.matchedPairs >= session.totalPairs) {
      sfx('fanfare');
      window.FGStore.addReward(24, 0);
      var st = window.FGStore.getState();
      st.stats.matchesCleared = (st.stats.matchesCleared || 0) + 1;
      window.FGStore.saveState();
      if (window.FGApp) window.FGApp.refreshHeaderHud();
      host.innerHTML = '<div class="card" style="text-align:center;">' +
        '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg('cheer', 80) : '') + '</div>' +
        '<h3 style="margin:6px 0;font-size:18px;font-weight:800;">همهٔ جفت‌ها پیدا شد!</h3>' +
        '<p style="font-size:13px;color:var(--ink-2);">حرکت‌ها: <strong>' + fa(session.moves) + '</strong>، پاداش: <strong>+۲۴ XP</strong></p>' +
        '<button class="btn btn-primary" onclick="FG_Games.startMode(\'match\')">تختهٔ جدید</button>' +
        '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.renderLobby()">بازگشت</button>' +
      '</div>';
      celebrate(22);
      return;
    }

    host.innerHTML = '<div class="arena">' +
      '<div class="arena-top">' +
        '<button class="icon-btn" onclick="FG_Games.exitArena()" aria-label="بستن">✕</button>' +
        '<div class="progress"><i style="width:' + Math.round(session.matchedPairs / session.totalPairs * 100) + '%"></i></div>' +
        '<span class="chip">' + fa(session.matchedPairs) + '/' + fa(session.totalPairs) + '</span>' +
      '</div>' +
      '<div class="arena-body">' +
        '<div class="read-more" style="margin-bottom:12px;">هر نشانه را به ساختار درستش وصل کن.</div>' +
        '<div class="match-board">' +
          session.cards.map(function (c, ci) {
            /* tiles mix English patterns and Persian hints → each tile picks its
               own direction; English runs inside Persian are isolated */
            var cls = 'match-tile';
            if (session.matchedMap[c.uid]) cls += ' matched';
            else if (session.selectedIdx === ci) cls += ' selected';
            return '<button class="' + cls + '" dir="auto" onclick="FG_Games.tapMatchTile(' + ci + ')">' + mixed(c.text) + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function tapMatchTile(ci) {
    if (!session || session.mode !== 'match') return;
    var card = session.cards[ci];
    if (!card || session.matchedMap[card.uid]) return;
    if (session.selectedIdx === null) {
      sfx('tick');
      session.selectedIdx = ci;
      renderMatchBoard();
      return;
    }
    if (session.selectedIdx === ci) {
      session.selectedIdx = null;
      renderMatchBoard();
      return;
    }
    var prev = session.cards[session.selectedIdx];
    session.moves += 1;
    if (prev.pairId === card.pairId && prev.side !== card.side) {
      session.matchedMap[prev.uid] = true;
      session.matchedMap[card.uid] = true;
      session.matchedPairs += 1;
      session.selectedIdx = null;
      sfx('correct');
      recordQuestionOutcome(true, null, null);
      renderMatchBoard();
    } else {
      sfx('wrong');
      session.selectedIdx = null;
      renderMatchBoard();
    }
  }

  /* ==================== 30s GRAMMAR JUDGE BLITZ ==================== */
  function startBlitzMode() {
    var pool = getPool(25);
    var deck = pool.concat(shuffle(pool));
    session = {
      mode: 'blitz', view: 'blitz', deck: deck, idx: 0, score: 0, combo: 0,
      timeLeft: 30, currentIsValid: Math.random() < 0.5, mistakes: []
    };
    renderBlitzArena();
    activeTimer = setInterval(function () {
      if (!session || session.mode !== 'blitz') { stopActiveTimer(); return; }
      session.timeLeft -= 1;
      var tEl = document.getElementById('blitz-timer-val');
      if (tEl) tEl.textContent = window.FGStore.toFaDigits(session.timeLeft) + ' ثانیه';
      if (session.timeLeft <= 0) { stopActiveTimer(); finishBlitz(); }
    }, 1000);
  }

  function renderBlitzArena() {
    var host = arenaHost();
    if (!host || !session) return;
    var fa = window.FGStore.toFaDigits;
    ensurePracticeTab();
    var it = session.deck[session.idx % session.deck.length];
    var shownSentence = session.currentIsValid ? it.sentence : it.flawedSentence;

    host.innerHTML = '<div class="arena">' +
      '<div class="arena-top">' +
        '<button class="icon-btn" onclick="FG_Games.exitArena()" aria-label="بستن">✕</button>' +
        '<div class="progress"><i style="width:' + Math.max(0, Math.round(session.timeLeft / 30 * 100)) + '%"></i></div>' +
        '<span class="chip" id="blitz-timer-val">⏱️ ' + fa(session.timeLeft) + ' ثانیه</span>' +
        '<span class="chip">امتیاز ' + fa(session.score) + '</span>' +
      '</div>' +
      '<div class="arena-body">' +
        '<div class="read-more" style="margin-bottom:12px;">این جمله کاملاً درست است؟</div>' +
        '<div class="question-en ltr-block" style="text-align:center;">' + esc(shownSentence) + '</div>' +
        '<div style="font-size:13px;color:var(--ink-2);margin:-4px 0 12px;">💬 ' + mixed(it.fa) + '</div>' +
        '<div class="option-list">' +
          '<button class="option-btn fa-opt" style="border-color:var(--brand-500);" onclick="FG_Games.judgeBlitz(true)">' +
            '<span class="opt-key">✓</span><span class="grow">درست است</span></button>' +
          '<button class="option-btn fa-opt" style="border-color:var(--danger);" onclick="FG_Games.judgeBlitz(false)">' +
            '<span class="opt-key">✕</span><span class="grow">غلط است</span></button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function judgeBlitz(userSaysValid) {
    if (!session || session.mode !== 'blitz' || session.timeLeft <= 0) return;
    var it = session.deck[session.idx % session.deck.length];
    var ok = userSaysValid === session.currentIsValid;
    if (ok) {
      session.combo += 1;
      session.score += 1 + (session.combo >= 4 ? 1 : 0);
      sfx('correct');
      floatXp('+۱۰ XP');
      recordQuestionOutcome(true, null, it);
    } else {
      session.combo = 0;
      if (session.mistakes.length < 4) session.mistakes.push(it);
      sfx('wrong');
      recordQuestionOutcome(false, null, it);
    }
    session.idx += 1;
    session.currentIsValid = Math.random() < 0.5;
    renderBlitzArena();
  }

  function finishBlitz() {
    sfx('fanfare');
    var st = window.FGStore.getState();
    if (session.score > (st.stats.blitzBest || 0)) {
      st.stats.blitzBest = session.score;
      window.FGStore.saveState();
    }
    var host = document.getElementById('games-container');
    if (!host) return;
    var fa = window.FGStore.toFaDigits;

    var mistakesHtml = session.mistakes.length === 0 ? '' : (
      '<div style="margin-top:12px;text-align:start;">' +
        '<div style="font-size:12.5px;font-weight:800;margin-bottom:6px;">📌 دام‌هایی برای مرور دوباره:</div>' +
        session.mistakes.map(function (m) {
          return '<div class="trap-card">' +
            '<div class="wrong ltr-block" style="background:var(--danger-100);border-color:var(--danger);color:var(--danger);">' + esc(m.flawedSentence) + '</div>' +
            '<div class="right ltr-block" style="background:var(--brand-50);border-color:var(--brand-200);color:var(--success);margin-top:6px;">' + esc(m.sentence) + '</div>' +
            '<div style="font-size:12px;color:var(--ink-2);margin-top:6px;">' + mixed(m.explainFa) + '</div>' +
          '</div>';
        }).join('') +
      '</div>'
    );

    host.innerHTML = '<div class="card" style="text-align:center;">' +
      '<div style="display:grid;place-items:center;">' + (window.FGMascot ? window.FGMascot.svg(session.score > 0 ? 'happy' : 'think', 104) : '') + '</div>' +
      '<h3 style="margin:6px 0;font-size:18px;font-weight:800;">پایان ماراتن ۳۰ ثانیه!</h3>' +
      '<p style="font-size:13.5px;color:var(--ink-2);">امتیاز این دور: <strong>' + fa(session.score) + '</strong>، بهترین رکورد: <strong>' + fa(st.stats.blitzBest || 0) + '</strong></p>' +
      '<button class="btn btn-primary" onclick="FG_Games.startMode(\'blitz\')">یک دور دیگر</button>' +
      '<button class="btn btn-secondary" style="margin-top:8px;" onclick="FG_Games.renderLobby()">بازگشت</button>' +
      mistakesHtml +
    '</div>';
    if (session.mode !== 'blitz' || session.score > 0) celebrate(22);
  }

  window.FG_Games = {
    fitFeedback: fitFeedback,
    revealAbovePanel: revealAbovePanel,
    stopActiveTimer: stopActiveTimer,
    renderLobby: renderLobby,
    setScope: setScope,
    startMode: startMode,
    toggleTransformInputMode: toggleTransformInputMode,
    pickTransformOption: pickTransformOption,
    submitTransformTyped: submitTransformTyped,
    pickClozeOption: pickClozeOption,
    pickTrapOption: pickTrapOption,
    placeToken: placeToken,
    unplaceToken: unplaceToken,
    clearUnscramble: clearUnscramble,
    checkUnscramble: checkUnscramble,
    pickErrorChunk: pickErrorChunk,
    giveTypeHint: giveTypeHint,
    checkTypedForm: checkTypedForm,
    nextQuestion: nextQuestion,
    exitArena: exitArena,
    isActive: isActive,
    tapMatchTile: tapMatchTile,
    judgeBlitz: judgeBlitz,
    isAnswerEquivalent: isAnswerEquivalent,
    startWeakPractice: startWeakPractice,
    startGradePlacement: startGradePlacement,
    acceptGradePlacement: acceptGradePlacement,
    declineGradePlacement: declineGradePlacement,
    startClassAssignment: startClassAssignment,
    getClassResult: getClassResult,
    repeatLast: repeatLast,
    _classTasks: classTasks,
    _gradePlacementTasks: gradePlacementTasks,
    startQuickSession: startQuickSession,
    startLessonMix: startLessonMix,
    pickSentence: pickSentence,
    playListen: playListen,
    skipListening: skipListening,
    tapPair: tapPair,
    composeMix: composeMix,
    getPool: getPool,            // v2.13: exposed for tests/test_first_use.js
    exerciseEligible: exerciseEligible,
    listenSet: listenSet,
    pickrightSet: pickrightSet,
    extraWord: extraWord,
    itemDifficulty: itemDifficulty,
    tagGivesAway: tagGivesAway,
    canListen: canListen,
    startPlacementTest: startPlacementTest,
    startMistakeReview: startMistakeReview,
    startExamTimer: startExamTimer,
    computePlacementResult: computePlacementResult
  };
})();
