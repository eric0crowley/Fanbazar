/* FarhangGram — safety net (U4) and technical report (U2). ES5 and inline styles on purpose: it must keep working when
   the stylesheet or app.js failed to load (an old WebView, a broken file). Loaded in <head> right after theme_boot.js.
   · the last 20 unexpected errors stay on THIS phone only (localStorage «fg_err_log»); nothing is sent anywhere
   · start-up failure (init threw, or app.js never started) → a calm full-screen card «بازگشت به خانه» + «📋 کپی گزارش فنی»
   · a later error → one quiet notice per session with «بازگشت به خانه»; the app keeps working
   · SafetyNet.reportLines() → the plain-text technical report shown in «من» (U2)
   The app calls SafetyNet.started() before init, SafetyNet.booted() after it and SafetyNet.bootFail(e) when it throws. */
(function () {
  'use strict';
  var APP = 'FarhangGram', KEY = 'fg_err_log', MAX = 20, SUPPORT = '@TeachSpot';
  var S = { started: false, booted: false, card: false, notice: false, info: null, est: null };

  function now() { return new Date().getTime(); }
  function clip(s, n) { s = String(s == null ? '' : s).replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function read() {
    try { var l = JSON.parse(localStorage.getItem(KEY) || '[]'); return Object.prototype.toString.call(l) === '[object Array]' ? l : []; }
    catch (e) { return []; }
  }
  function write(l) { try { localStorage.setItem(KEY, JSON.stringify(l.slice(-MAX))); } catch (e) {} }
  function describe(err) {
    if (err == null) return 'unknown error';
    if (typeof err !== 'object') return String(err);
    return err.message ? ((err.name && err.name !== 'Error') ? err.name + ': ' : '') + err.message : String(err);
  }
  function stackSrc(stack) { var m = /([\w.\-]+\.js):(\d+)/.exec(String(stack || '')); return m ? m[1] + ':' + m[2] : ''; }
  function log(msg, src) {
    msg = clip(msg, 240); src = clip(src, 60);
    if (!msg || /ResizeObserver loop/i.test(msg)) return false;          // a harmless browser message, not an app error
    var l = read(), last = l[l.length - 1];
    if (last && last.m === msg && last.s === src) { last.n = (last.n || 1) + 1; last.t = now(); }
    else l.push({ t: now(), m: msg, s: src });
    write(l);
    return true;
  }
  window.addEventListener('error', function (ev) {
    if (!ev || (ev.target && ev.target !== window && ev.target.nodeType === 1)) return;   // a missing image is not a crash
    var msg = ev.error ? describe(ev.error) : ev.message;
    var src = ev.filename ? String(ev.filename).split('/').pop() + (ev.lineno ? ':' + ev.lineno : '') : stackSrc(ev.error && ev.error.stack);
    if (log(msg || 'error', src) && S.booted) notice();
  });
  window.addEventListener('unhandledrejection', function (ev) {
    var r = ev ? ev.reason : null;
    if (log('Promise: ' + describe(r), stackSrc(r && r.stack)) && S.booted) notice();
  });

  /* ---------- colours: the card must look like the app in day and night, without the app's stylesheet ---------- */
  function isDark() {
    try {   // the page's own background decides (a dark palette picked by hand on a light phone included)
      var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(getComputedStyle(document.body || document.documentElement).backgroundColor);
      if (m && (m[4] === undefined || +m[4] > 0.5)) return (0.299 * m[1] + 0.587 * m[2] + 0.114 * m[3]) < 128;
    } catch (e) {}
    var a = document.documentElement.getAttribute('data-scheme');
    if (a) return a === 'dark';
    var b = window.AndroidBridge;
    try { if (b && typeof b.isSystemDark === 'function') return !!b.isSystemDark(); } catch (e) {}
    try { return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); } catch (e) { return false; }
  }
  function pal() {
    return isDark()
      ? { bg: '#0B1512', card: '#13221D', ink: '#E8F1ED', ink2: '#C2D2CB', ink3: '#A9BBB3', line: '#6A877D', btn: '#34D399', btnInk: '#052E21' }
      : { bg: '#F1F6F3', card: '#FFFFFF', ink: '#10231C', ink2: '#33473F', ink3: '#4E6058', line: '#6F8A80', btn: '#0B7A5A', btnInk: '#FFFFFF' };
  }
  var FONT = "font-family:Vazirmatn,Tahoma,'Noto Sans Arabic',sans-serif;";
  function el(tag, css, text) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (text != null) e.textContent = text; return e; }
  function whenBody(fn) { if (document.body) fn(); else document.addEventListener('DOMContentLoaded', fn); }
  function goHome() { location.reload(); }

  /* bridge first (the phone's clipboard); a browser's async clipboard is AWAITED — the label never says «کپی شد» for a
     copy that did not happen (G11, turn 5) — then execCommand('copy'). */
  function copy(text, btn, doneLabel) {
    var b = window.AndroidBridge;
    function show(ok) {
      if (!btn) return;
      var keep = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', keep);
      btn.textContent = ok ? (doneLabel || 'کپی شد ✓') : 'کپی نشد؛ دوباره امتحان کن';
      setTimeout(function () { btn.textContent = keep; }, 2400);
    }
    function legacy() {
      try {
        var ta = el('textarea', 'position:fixed;top:0;left:0;opacity:0;'); ta.value = text; document.body.appendChild(ta);
        ta.select(); var r = document.execCommand('copy'); document.body.removeChild(ta); return !!r;
      } catch (e) { return false; }
    }
    try { if (b && typeof b.copyText === 'function') { b.copyText(text); show(true); return true; } } catch (e) {}
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { show(true); }, function () { show(legacy()); });
        return true;
      }
    } catch (e) {}
    var ok = legacy(); show(ok); return ok;
  }

  /* ---------- the start-up card ---------- */
  function showCard(reason) {
    if (S.card) return;
    S.card = true;
    whenBody(function () {
      var c = pal();
      var wrap = el('div', 'position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;background:' + c.bg + ';' + FONT);
      wrap.id = 'safety-card'; wrap.setAttribute('dir', 'rtl'); wrap.setAttribute('role', 'alertdialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-labelledby', 'safety-card-title');
      wrap.setAttribute('tabindex', '-1'); wrap.style.outline = 'none';
      var card = el('div', 'width:100%;max-width:360px;box-sizing:border-box;background:' + c.card + ';color:' + c.ink + ';border-radius:20px;padding:24px 20px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.14);');
      card.appendChild(el('div', 'font-size:40px;line-height:1;margin-bottom:12px;', '🌿'));
      var t = el('div', 'font-size:18px;font-weight:800;line-height:1.6;margin-bottom:8px;', 'یک لحظه؛ از نو شروع کنیم');
      t.id = 'safety-card-title'; card.appendChild(t);
      card.appendChild(el('div', 'font-size:14px;line-height:1.9;color:' + c.ink2 + ';margin-bottom:18px;',
        'برنامه این بار درست باز نشد. برای تلاش دوباره، «بازگشت به خانه» را بزن.'));
      var home = el('button', 'display:block;width:100%;min-height:48px;margin:0 0 10px;border:0;border-radius:14px;background:' + c.btn + ';color:' + c.btnInk + ';font-size:15px;font-weight:800;cursor:pointer;' + FONT, 'بازگشت به خانه');
      home.id = 'safety-home'; home.setAttribute('type', 'button'); home.onclick = goHome; card.appendChild(home);
      var cp = el('button', 'display:block;width:100%;min-height:48px;margin:0;border:1.5px solid ' + c.line + ';border-radius:14px;background:transparent;color:' + c.ink + ';font-size:14px;font-weight:700;cursor:pointer;' + FONT, '📋 کپی گزارش فنی');
      cp.id = 'safety-copy'; cp.setAttribute('type', 'button'); cp.onclick = function () { copy(reportLines().join('\n'), cp); }; card.appendChild(cp);
      var foot = el('div', 'font-size:12.5px;line-height:1.8;color:' + c.ink3 + ';margin-top:12px;', 'اگر باز هم دیدی، گزارش را برای سازنده بفرست: ');
      var contact = el('button', 'unicode-bidi:isolate;direction:ltr;display:inline-block;border:0;background:transparent;color:inherit;text-decoration:underline;font:inherit;cursor:pointer;padding:4px;min-height:44px;', SUPPORT);
      contact.id = 'safety-support'; contact.setAttribute('type', 'button'); contact.setAttribute('aria-label', 'گفت‌وگو در تلگرام با @TeachSpot');
      contact.onclick = function () {
        var b = window.AndroidBridge || window.NativeBridge;
        try {
          if (b && typeof b.openTelegramSupport === 'function') { b.openTelegramSupport(); return; }
          if (typeof window.open === 'function') window.open('https://t.me/TeachSpot', '_blank', 'noopener,noreferrer');
        } catch (e) {}
      };
      foot.appendChild(contact);
      card.appendChild(foot);
      wrap.appendChild(card);
      document.body.appendChild(wrap);
      try { wrap.focus(); } catch (e) {}   // a screen reader reads the card; no focus ring drawn on the button
    });
  }

  /* ---------- a later error: one quiet notice per session; the app keeps working ---------- */
  function notice() {
    if (S.notice || S.card) return;
    S.notice = true;
    whenBody(function () {
      var c = pal();
      var n = el('div', 'position:fixed;left:12px;right:12px;bottom:92px;z-index:2147482000;display:flex;align-items:center;box-sizing:border-box;padding:8px 10px 8px 6px;border:1px solid ' + c.line + ';border-radius:14px;background:' + c.card + ';color:' + c.ink + ';box-shadow:0 6px 20px rgba(0,0,0,.16);font-size:13px;' + FONT);
      n.id = 'safety-notice'; n.setAttribute('dir', 'rtl'); n.setAttribute('role', 'status');
      n.appendChild(el('span', 'flex:1 1 auto;line-height:1.7;', 'یک مشکل کوچک پیش آمد و ثبت شد.'));
      var h = el('button', 'flex:0 0 auto;min-height:48px;margin-right:8px;padding:0 12px;border:0;border-radius:10px;background:' + c.btn + ';color:' + c.btnInk + ';font-size:13px;font-weight:800;cursor:pointer;' + FONT, 'بازگشت به خانه');
      h.setAttribute('type', 'button'); h.onclick = goHome; n.appendChild(h);
      var x = el('button', 'flex:0 0 auto;min-width:48px;min-height:48px;margin-right:2px;border:0;background:transparent;color:' + c.ink2 + ';font-size:20px;line-height:1;cursor:pointer;', '×');
      x.setAttribute('type', 'button'); x.setAttribute('aria-label', 'بستن');
      x.onclick = function () { if (n.parentNode) n.parentNode.removeChild(n); }; n.appendChild(x);
      document.body.appendChild(n);
      setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 10000);
    });
  }

  /* ---------- the technical report (U2) ---------- */
  function refreshEstimate(cb) {
    try {
      if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(function (e) { S.est = e; if (cb) cb(); }, function () { if (cb) cb(); });
        return;
      }
    } catch (e) {}
    if (cb) cb();
  }
  // sizes stay one left-to-right run inside the Persian line (LRI … PDI), also in the copied text
  function size(x) {
    var v = x < 1048576 ? Math.round(x / 1024) + ' KB' : (x < 1073741824 ? (Math.round(x / 104857.6) / 10) + ' MB' : (Math.round(x / 107374182.4) / 10) + ' GB');
    return '\u2066' + v + '\u2069';
  }
  function when(t) {
    try { return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(t)); }
    catch (e) { return new Date(t).toISOString().slice(0, 16).replace('T', ' '); }
  }
  function reportLines() {
    var ua = navigator.userAgent || '', b = window.AndroidBridge, ver = '';
    try { if (b && typeof b.getAppVersion === 'function') ver = String(b.getAppVersion() || ''); } catch (e) {}
    var extra = [];
    try { if (S.info) extra = S.info() || []; } catch (e) { extra = ['(اطلاعات برنامه خوانده نشد: ' + clip(describe(e), 80) + ')']; }
    if (!ver && extra.version) ver = extra.version;
    var lines = ['گزارش فنی ' + APP + ' ' + (ver || '؟') + ' — ' + when(now())];
    lines.push('Android ' + ((ua.match(/Android ([\d.]+)/) || [])[1] || '؟') + ' · WebView ' + ((ua.match(/Chrome\/([\d.]+)/) || [])[1] || '؟'));
    var sc = window.screen || {};
    lines.push('صفحه ' + (sc.width || '؟') + '×' + (sc.height || '؟') + ' · پنجره ' + window.innerWidth + '×' + window.innerHeight + ' · تراکم ' + (Math.round((window.devicePixelRatio || 1) * 100) / 100));
    for (var i = 0; i < extra.length; i++) lines.push(String(extra[i]));
    var chars = 0, keys = 0;
    try { for (var k = 0; k < localStorage.length; k++) { var key = localStorage.key(k); keys++; chars += key.length + (localStorage.getItem(key) || '').length; } } catch (e) {}
    var data = 'داده: ' + size(chars * 2) + ' در حافظهٔ برنامه (' + keys + ' کلید)';
    if (S.est && S.est.usage != null) data += '؛ فضای اشغال‌شده ' + size(S.est.usage) + (S.est.quota ? ' از ' + size(S.est.quota) : '');
    lines.push(data);
    var errs = read();
    lines.push('خطاهای ثبت‌شده: ' + (errs.length ? errs.length + ' (حداکثر ۲۰ مورد آخر)' : 'هیچ'));
    for (var j = errs.length - 1; j >= 0; j--) {
      var r = errs[j];
      lines.push('• ' + when(r.t) + ' — ' + r.m + (r.s ? ' (' + r.s + ')' : '') + (r.n > 1 ? ' ×' + r.n : ''));
    }
    return lines;
  }

  window.SafetyNet = {
    started: function () { S.started = true; },
    booted: function () { S.booted = true; },
    bootFail: function (err) { log('start-up: ' + describe(err), stackSrc(err && err.stack)); showCard('init'); },
    log: function (msg, src) { return log(msg, src); },
    list: read,
    clear: function () { write([]); },
    setInfo: function (fn) { S.info = fn; },
    reportLines: reportLines,
    refresh: refreshEstimate,
    copy: copy
  };

  /* app.js never started (a syntax error an old WebView cannot parse, a missing file) → the card instead of a white page.
     The app's own DOMContentLoaded handler runs right after this one, so 1.5 s is only slack, not a race. */
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () { if (!S.started) { log('start-up: the app did not start', ''); showCard('watchdog'); } }, 1500);
  });
  refreshEstimate();
})();
