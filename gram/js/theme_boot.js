/* FarhangGram v2.17.0 — first paint in the right colours.
   Runs in <head>, before the 700 KB curriculum and the app scripts: the last theme the learner
   used (saved by FGApp.applyTheme) is put on <html> at once, and for «هماهنگ با گوشی» the phone
   itself is asked whether it is in night mode (a WebView's prefers-color-scheme follows the app
   theme, not the phone). A brand-new install starts in «هماهنگ با گوشی». */
(function () {
  'use strict';
  try {
    var html = document.documentElement;
    var hint = null;
    try { hint = localStorage.getItem('fg_theme_hint'); } catch (e) {}
    if (!hint) {
      var fresh = true;
      try { fresh = !localStorage.getItem('farhanggram_state_v10'); } catch (e) {}
      hint = fresh ? 'auto' : 'fresh_mint';
    }
    if (!/^[a-z_]+$/.test(hint)) hint = 'fresh_mint';
    html.setAttribute('data-theme', hint);
    if (hint === 'auto') {
      var dark = false;
      var b = window.AndroidBridge;
      if (b && typeof b.isSystemDark === 'function') dark = !!b.isSystemDark();
      else if (window.matchMedia) dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-scheme', dark ? 'dark' : 'light');
    }
  } catch (e) {}
})();
/* v2.17 (F14): flex `gap` probe */
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
