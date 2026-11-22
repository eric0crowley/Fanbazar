/* ==========================================================================
   FarhangGram v2.17.0 — Sound & Haptics Engine
   All sounds are synthesised with WebAudio (no audio files → tiny APK).
   The context is created on the first user gesture so the first click is
   already warm (< 50 ms latency).
   v2.14: the sounds were too quiet and thin for a phone speaker (a tap peaked at ~4 % of full
   scale, the «correct» chime at ~10 %). Each note now has a bright overtone, the levels are
   higher and a compressor keeps the peaks clean; a volume slider sits in the settings.
   ========================================================================== */
(function () {
  'use strict';

  var ctx = null;
  var master = null;
  var volume = 0.8;
  var enabled = true;
  var hapticEnabled = true;
  var active = 0;
  var MAX_VOICES = 8;
  var voices = [];          // live voices → a new «event» sound can hush the previous one
  var bridge = null;
  var lastSoundAt = 0;
  var globalFeedbackOn = false;

  function getBridge() {
    if (!bridge) bridge = window.AndroidBridge || window.NativeBridge || null;
    return bridge;
  }

  function ensureCtx() {
    if (!enabled) return null;
    try {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = volume;
        /* louder without clipping on a small speaker */
        if (typeof ctx.createDynamicsCompressor === 'function') {
          var comp = ctx.createDynamicsCompressor();
          try {
            comp.threshold.value = -16; comp.knee.value = 10; comp.ratio.value = 4;
            comp.attack.value = 0.003; comp.release.value = 0.12;
          } catch (e) {}
          master.connect(comp);
          comp.connect(ctx.destination);
        } else {
          master.connect(ctx.destination);
        }
      }
      if (ctx.state === 'suspended' && ctx.resume) {
        try { ctx.resume(); } catch (e) {}
      }
      return ctx;
    } catch (e) {
      ctx = null;
      return null;
    }
  }

  function tone(opts) {
    var c = ensureCtx();
    if (!c || active >= MAX_VOICES) return;
    var t0 = c.currentTime + (opts.delay || 0);
    var dur = opts.dur || 0.08;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t0 + dur);
    var peak = (opts.gain == null ? 0.25 : opts.gain);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + Math.min(opts.attack || 0.008, dur * 0.4));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    /* a quiet octave overtone: phone speakers barely move below ~400 Hz, the overtone carries the note */
    var osc2 = null;
    if (opts.bright !== 0) {
      osc2 = c.createOscillator();
      var g2 = c.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(opts.freq * 2, t0);
      if (opts.to) osc2.frequency.exponentialRampToValueAtTime(opts.to * 2, t0 + dur);
      g2.gain.value = opts.bright == null ? 0.35 : opts.bright;
      osc2.connect(g2);
      g2.connect(g);
    }
    g.connect(master);
    active++;
    var v = { g: g, osc: osc, osc2: osc2 };
    voices.push(v);
    osc.onended = function () {
      active--;
      var i = voices.indexOf(v); if (i >= 0) voices.splice(i, 1);
      try { osc.disconnect(); g.disconnect(); if (osc2) osc2.disconnect(); } catch (e) {}
    };
    try {
      osc.start(t0); osc.stop(t0 + dur + 0.02);
      if (osc2) { osc2.start(t0); osc2.stop(t0 + dur + 0.02); }
    } catch (e) {}
  }

  /** one event = one sound: a new chime softly cuts whatever is still ringing */
  function hush() {
    if (!ctx) return;
    var now = ctx.currentTime;
    voices.slice().forEach(function (v) {
      try {
        v.g.gain.cancelScheduledValues(now);
        v.g.gain.setTargetAtTime(0.0001, now, 0.015);
        v.osc.stop(now + 0.06); if (v.osc2) v.osc2.stop(now + 0.06);
      } catch (e) {}
    });
  }

  function noise(dur, gain, delay) {
    var c = ensureCtx();
    if (!c || active >= MAX_VOICES) return;
    var t0 = c.currentTime + (delay || 0);
    var len = Math.max(1, Math.floor(c.sampleRate * dur));
    var buffer = c.createBuffer(1, len, c.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
    }
    var src = c.createBufferSource();
    src.buffer = buffer;
    var filt = c.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 2200;
    filt.Q.value = 0.9;
    var g = c.createGain();
    g.gain.value = gain == null ? 0.12 : gain;
    src.connect(filt); filt.connect(g); g.connect(master);
    active++;
    src.onended = function () { active--; try { src.disconnect(); } catch (e) {} };
    try { src.start(t0); } catch (e) {}
  }

  /* ---------------- the sound library ---------------- */
  var LIB = {
    click: function () { tone({ freq: 880, to: 740, dur: 0.045, type: 'triangle', gain: 0.22 }); },
    tap: function () { tone({ freq: 700, to: 590, dur: 0.05, type: 'triangle', gain: 0.22 }); },
    tick: function () { tone({ freq: 1180, dur: 0.03, type: 'sine', gain: 0.14, bright: 0 }); },
    select: function () { tone({ freq: 560, to: 820, dur: 0.08, type: 'triangle', gain: 0.26 }); },
    correct: function () {               // a bright rising major triad (C6 E6 G6) — short and happy
      tone({ freq: 1046.5, dur: 0.10, type: 'triangle', gain: 0.30 });
      tone({ freq: 1318.5, dur: 0.11, type: 'triangle', gain: 0.30, delay: 0.07 });
      tone({ freq: 1568.0, dur: 0.22, type: 'triangle', gain: 0.34, delay: 0.14 });
    },
    wrong: function () {
      // soft, friendly descending pair — never a harsh buzzer (sine + a little overtone, slow attack)
      tone({ freq: 523.25, dur: 0.13, type: 'sine', gain: 0.30, attack: 0.02, bright: 0.25 });
      tone({ freq: 392.0, dur: 0.18, type: 'sine', gain: 0.28, attack: 0.02, bright: 0.25, delay: 0.11 });
    },
    combo: function () {
      tone({ freq: 783.99, dur: 0.06, type: 'triangle', gain: 0.24 });
      tone({ freq: 987.77, dur: 0.06, type: 'triangle', gain: 0.24, delay: 0.055 });
      tone({ freq: 1174.66, dur: 0.07, type: 'triangle', gain: 0.24, delay: 0.11 });
      tone({ freq: 1567.98, dur: 0.18, type: 'triangle', gain: 0.28, delay: 0.165 });
    },
    fanfare: function () {
      var notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach(function (f, i) {
        tone({ freq: f, dur: 0.16, type: 'triangle', gain: 0.30, delay: i * 0.11 });
      });
      tone({ freq: 1318.5, dur: 0.36, type: 'triangle', gain: 0.26, delay: 0.46 });
    },
    pop: function () { tone({ freq: 360, to: 980, dur: 0.12, type: 'sine', gain: 0.28 }); },
    swipe: function () { noise(0.05, 0.08); },
    levelup: function () {
      var notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach(function (f, i) {
        tone({ freq: f, dur: 0.2, type: 'triangle', gain: 0.30, delay: i * 0.12 });
      });
    }
  };
  /* the «event» sounds that answer an action: each one hushes the previous sound first */
  var EVENT_SOUNDS = { correct: 1, wrong: 1, combo: 1, fanfare: 1, levelup: 1, pop: 1 };

  /* ---------------- haptics ---------------- */
  var PATTERNS = {
    tap: [10],
    select: [10],
    correct: [18],
    wrong: [26, 40, 26],
    combo: [28],
    star: [18, 30, 18, 30, 40],
    levelup: [30, 40, 30, 40, 60]
  };

  function haptic(name) {
    if (!hapticEnabled) return;
    var pattern = PATTERNS[name];
    if (!pattern) pattern = [10];
    var b = getBridge();
    if (!b || typeof b.vibrate !== 'function') return;
    var delay = 0;
    pattern.forEach(function (ms) {
      setTimeout(function () {
        try { b.vibrate(ms); } catch (e) {}
      }, delay);
      delay += ms + 16;
    });
  }

  function play(name) {
    if (!enabled) return;
    var fn = LIB[name];
    if (fn) {
      if (EVENT_SOUNDS[name]) hush();
      try { fn(); } catch (e) {}
    }
    lastSoundAt = Date.now();
    haptic(name);
  }

  /* ------------------------------------------------------------------
     Global touch feedback.
     Every button in the app must make a sound, even when its own
     handler forgets to ask for one. A single delegated listener on
     `document` (bubble phase → runs AFTER the element's own handler)
     plays a soft 'tap' only when the handler did not already play a
     semantic sound (correct / wrong / fanfare …).
     Opt out per element with `data-nosound="1"`.
     ------------------------------------------------------------------ */
  var SOUND_OWNERS = 'button, [role="switch"], [role="button"], [role="tab"], a[href], label[for]';

  function onGlobalClick(ev) {
    if (!enabled) return;
    var el = ev.target;
    if (!el || !el.closest) return;
    var node = el.closest(SOUND_OWNERS);
    if (!node) return;
    if (node.disabled) return;
    if (node.getAttribute && node.getAttribute('data-nosound') === '1') return;
    // a semantic sound was already played by the handler → don't stack a tap on top
    if (Date.now() - lastSoundAt < 260) return;
    play('tap');
  }

  function attachGlobalFeedback() {
    if (globalFeedbackOn) return;
    if (!document || !document.addEventListener) return;
    globalFeedbackOn = true;
    document.addEventListener('click', onGlobalClick, false);
  }

  /* unlock the audio context on the very first touch of the app */
  function unlock() {
    ensureCtx();
    if (ctx && ctx.state === 'suspended' && ctx.resume) {
      try { ctx.resume(); } catch (e) {}
    }
  }

  function setEnabled(v) {
    enabled = !!v;
    if (enabled) unlock();
  }
  function setHaptics(v) { hapticEnabled = !!v; }
  function setVolume(v) {
    volume = Math.max(0, Math.min(1, Number(v) || 0));
    if (master) master.gain.value = volume;
  }

  /* v2.12.0 (Phase 6 device check): the facts a tester needs about THIS phone's audio path */
  function getAudioInfo() {
    var c = ensureCtx();
    if (!c) return null;
    return {
      sampleRate: c.sampleRate || 0,
      baseLatencyMs: typeof c.baseLatency === 'number' ? Math.round(c.baseLatency * 1000) : null,
      outputLatencyMs: typeof c.outputLatency === 'number' && c.outputLatency > 0 ? Math.round(c.outputLatency * 1000) : null,
      state: c.state || '',
      volume: volume
    };
  }

  window.FGSound = {
    play: play,
    getAudioInfo: getAudioInfo,
    unlock: unlock,
    setEnabled: setEnabled,
    setHaptics: setHaptics,
    setVolume: setVolume,
    attachGlobalFeedback: attachGlobalFeedback,
    isEnabled: function () { return enabled; },
    isHapticsEnabled: function () { return hapticEnabled; },
    getVolume: function () { return volume; },
    lib: LIB
  };

  /* warm the context on the first interaction of the whole app */
  var warmed = false;
  function firstGesture() {
    if (warmed) return;
    warmed = true;
    unlock();
    document.removeEventListener('pointerdown', firstGesture, true);
    document.removeEventListener('touchstart', firstGesture, true);
  }
  if (document && document.addEventListener) {
    document.addEventListener('pointerdown', firstGesture, true);
    document.addEventListener('touchstart', firstGesture, true);
  }
})();
