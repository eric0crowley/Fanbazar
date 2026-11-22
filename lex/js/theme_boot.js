/* FarhangLex v3.11 — first paint in the right colours.
   Runs in <head>, before the stylesheet and the 1 MB curriculum: the palette the learner used last (saved by
   applyTheme as flx_theme_hint) is put on <html> at once; for «هماهنگ با گوشی» the phone itself is asked whether it is
   in night mode (a WebView's prefers-color-scheme follows the APP theme, not the phone). ES5 on purpose. */
(function () {
  'use strict';
  try {
    var hint = null;
    try { hint = JSON.parse(localStorage.getItem('flx_theme_hint') || 'null'); } catch (e) {}
    var mode = (hint && hint.a) || 'auto';
    var dark = false;
    if (mode === 'dark') dark = true;
    else if (mode === 'auto') {
      var b = window.AndroidBridge;
      if (b && typeof b.isSystemDark === 'function') { try { dark = !!b.isSystemDark(); } catch (e) {} }
      else if (window.matchMedia) dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    var t = dark ? ((hint && hint.d) || 'dark') : ((hint && hint.l) || 'default');
    if (!/^[a-z_]+$/.test(t)) t = dark ? 'dark' : 'default';
    var html = document.documentElement;
    if (t !== 'default' && t !== 'light') html.setAttribute('data-theme', t);
    html.setAttribute('data-scheme', dark ? 'dark' : 'light');
  } catch (e) {}
})();
/* v3.11 (F14): flex `gap` probe */
(function () {
  try {
    var html = document.documentElement, d = document.createElement('div');
    d.style.cssText = 'display:flex;flex-direction:column;row-gap:1px;position:absolute;visibility:hidden;pointer-events:none';
    d.appendChild(document.createElement('div')); d.appendChild(document.createElement('div'));
    html.appendChild(d);
    var ok = d.scrollHeight === 1;
    html.removeChild(d);
    if (!ok) html.className += (html.className ? ' ' : '') + 'no-flexgap';
  } catch (e) {}
})();
