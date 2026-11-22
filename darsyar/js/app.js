// کنترلر اصلی درس‌یار ۲.۰، مسیریاب، مدیریت تم‌های چهارگانه، قفل امنیتی ۴ رقمی و دکمه بازگشت نیتیو اندروید
(function (global) {
  'use strict';

  const TOOL_TITLES = {
    picker: 'گردونه شانس دانش‌آموز',
    whiteboard: 'تخته سفید هوشمند کلاس',
    groups: 'گروه‌بندی هوشمند',
    seating: 'چیدمان صندلی کلاس',
    timer: 'تایمر و کرنومتر کلاس',
    points: 'امتیاز و افتخار کلاس',
    behavior: 'انضباط و امتیازات',
    fees: 'شهریه و جلسات خصوصی',
    messages: 'پیام‌ساز هوشمند اولیا',
    charts: 'آمار و نمودارها',
    settings: 'تنظیمات، تم و پشتیبان‌گیری',
    about: 'شناسنامه علمی و سازنده'
  };

  const PALETTE_STATUS_HEX = {
    teal: '#074C52',
    emerald: '#065F46',
    sapphire: '#1E40AF',
    amber: '#92400E'
  };

  let currentTab = 'home'; // home | roster | academic | plan | tools
  let currentTool = '';    // '' or key in TOOL_TITLES
  let toolOriginTab = 'tools';
  let pendingConfirmFn = null;
  let pinUnlocked = false;
  let pinBuffer = '';
  let pinError = false;

  function applyTheme() {
    const s = global.Store.getDb().settings;
    const isDark = !!(s.darkMode);
    const pal = s.themePalette || 'teal';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-palette', pal);

    if (global.Store.hasNativeBridge()) {
      const statusHex = isDark ? '#0B1120' : (PALETTE_STATUS_HEX[pal] || '#074C52');
      const navHex = isDark ? '#151E32' : '#FFFFFF';
      if (typeof global.AndroidBridge.setThemeBars === 'function') {
        try { global.AndroidBridge.setThemeBars(statusHex, navHex, isDark); } catch (e) {}
      } else if (typeof global.AndroidBridge.setDarkMode === 'function') {
        try { global.AndroidBridge.setDarkMode(isDark); } catch (e) {}
      }
    }
  }

  function toggleDarkMode() {
    const s = global.Store.getDb().settings;
    s.darkMode = !s.darkMode;
    global.Store.save();
    applyTheme();
    render();
  }

  function setPalette(pal) {
    const s = global.Store.getDb().settings;
    s.themePalette = pal;
    global.Store.save();
    applyTheme();
    render();
    toast('پالت رنگ برنامه تغییر کرد 🎨');
  }

  // ==================== قفل امنیتی ۴ رقمی هنگام ورود ====================
  function renderPinLockIfNeeded() {
    const root = document.getElementById('pin_lock_root');
    if (!root) return false;
    const savedPin = (global.Store.getDb().settings.pinCode || '').trim();
    if (!savedPin || savedPin.length !== 4 || pinUnlocked) {
      root.innerHTML = '';
      return false;
    }

    let dots = '';
    for (let i = 0; i < 4; i++) {
      const cls = pinError ? 'err' : (i < pinBuffer.length ? 'filled' : '');
      dots += '<div class="pin-dot ' + cls + '"></div>';
    }

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
    let pad = '';
    keys.forEach(function (k) {
      if (!k) {
        pad += '<div></div>';
      } else if (k === '⌫') {
        pad += '<button type="button" class="pin-key" onclick="App.pinPress(\'del\')">⌫</button>';
      } else {
        pad += '<button type="button" class="pin-key" onclick="App.pinPress(\'' + k + '\')">' + global.Jalali.toFa(k) + '</button>';
      }
    });

    root.innerHTML = '<div class="pin-lock-overlay">' +
      '<div class="pin-app-logo"><img src="img/app_icon_header.webp" alt="درس‌یار"></div>' +
      '<h2 style="margin:14px 0 4px 0;font-size:20px;font-weight:900;color:#FFFFFF;">ورود به درس‌یار</h2>' +
      '<div style="font-size:13px;opacity:0.88;">رمز ۴ رقمی دفتر معلم را وارد کنید</div>' +
      '<div class="pin-dots">' + dots + '</div>' +
      (pinError ? '<div style="color:#FCA5A5;font-size:12.5px;font-weight:800;margin:-8px 0 12px 0;">رمز واردشده نادرست است!</div>' : '') +
      '<div class="pin-keypad">' + pad + '</div>' +
    '</div>';
    return true;
  }

  function markPinUnlocked() {
    pinUnlocked = true;
    pinBuffer = '';
    pinError = false;
  }

  function lockNow() {
    const savedPin = (global.Store.getDb().settings.pinCode || '').trim();
    if (!savedPin || savedPin.length !== 4) return;
    pinUnlocked = false;
    pinBuffer = '';
    pinError = false;
    render();
  }

  function pinPress(key) {
    pinError = false;
    if (key === 'del') {
      pinBuffer = pinBuffer.slice(0, -1);
      renderPinLockIfNeeded();
      return;
    }
    if (pinBuffer.length >= 4) return;
    pinBuffer += key;
    global.Store.vibrate(15);
    renderPinLockIfNeeded();

    if (pinBuffer.length === 4) {
      const savedPin = (global.Store.getDb().settings.pinCode || '').trim();
      if (pinBuffer === savedPin) {
        pinUnlocked = true;
        pinBuffer = '';
        renderPinLockIfNeeded();
        render();
      } else {
        pinError = true;
        global.Store.vibrate(90);
        renderPinLockIfNeeded();
        setTimeout(function () {
          pinBuffer = '';
          pinError = false;
          renderPinLockIfNeeded();
        }, 550);
      }
    }
  }

  function renderHeader() {
    const db = global.Store.getDb();
    const activeCls = global.Store.getActiveClass();
    const esc = global.CoreModules.esc;
    const headerEl = document.getElementById('app_header');
    if (!headerEl) return;

    const showBack = !!currentTool;
    const title = currentTool ? (TOOL_TITLES[currentTool] || 'درس‌یار') : 'درس‌یار';
    const subtitle = currentTool
      ? (activeCls ? 'کلاس: ' + activeCls.name : 'جعبه ابزار معلم')
      : (db.settings.schoolName || 'نسخه ۲.۴.۰ • آفلاین و هوشمند');

    let clsSelect = '';
    if (db.classes.length > 0) {
      clsSelect = '<select class="class-pill-select" onchange="App.onHeaderClassChange(this.value)" aria-label="انتخاب کلاس فعال">';
      db.classes.forEach(function (c) {
        clsSelect += '<option value="' + esc(c.id) + '" ' + (activeCls && activeCls.id === c.id ? 'selected' : '') + '>' + esc(c.name) + '</option>';
      });
      clsSelect += '</select>';
    }

    headerEl.innerHTML = '' +
      '<div class="header-brand">' +
        (showBack
          ? '<button type="button" class="header-back-btn" onclick="App.backFromTool()" aria-label="بازگشت">➔</button>'
          : (global.AppIcons ? global.AppIcons.darsyarLogo() : '')) +
        '<div class="header-titles">' +
          '<h1 class="header-title">' + esc(title) + '</h1>' +
          '<p class="header-subtitle">' + esc(subtitle) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="header-actions">' +
        clsSelect +
        '<button type="button" class="icon-btn-header" onclick="App.toggleDarkMode()" title="تغییر حالت شب/روز">' +
          (db.settings.darkMode ? '☀️' : '🌙') +
        '</button>' +
      '</div>';
  }

  function renderBottomNav() {
    const items = document.querySelectorAll('.nav-item');
    items.forEach(function (btn) {
      const t = btn.getAttribute('data-tab');
      if (t === currentTab) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  function render() {
    if (renderPinLockIfNeeded()) return;

    const mainEl = document.getElementById('app_main');
    if (!mainEl) return;

    // حفظ فوکوس فیلد جستجو هنگام تایپ زنده
    const active = document.activeElement;
    let restorePlaceholder = null, restoreValue = null;
    let selStart = 0, selEnd = 0;
    if (active && active.tagName === 'INPUT' && mainEl.contains(active) && active.getAttribute('placeholder')) {
      restorePlaceholder = active.getAttribute('placeholder');
      restoreValue = active.value;
      try { selStart = active.selectionStart || 0; selEnd = active.selectionEnd || 0; } catch (e) {}
    }

    renderHeader();
    renderBottomNav();

    let content = '';
    if (currentTool) {
      switch (currentTool) {
        case 'picker':     content = global.ToolModules.renderPickerTool(); break;
        case 'whiteboard': content = global.LiveClassroom ? global.LiveClassroom.renderWhiteboardTool() : ''; break;
        case 'groups':     content = global.ToolModules.renderGroupsTool(); break;
        case 'seating':    content = global.ToolModules.renderSeatingTool(); break;
        case 'timer':      content = global.ToolModules.renderTimerTool(); break;
        case 'points':     content = global.ToolModules.renderPointsTool(); break;
        case 'behavior':   content = global.ToolModules.renderBehaviorTool(); break;
        case 'fees':       content = global.ToolModules.renderFeesAndSessionsTool(); break;
        case 'messages':   content = global.ToolModules.renderMessagesTool(); break;
        case 'charts':     content = global.ToolModules.renderChartsTool(); break;
        case 'settings':   content = global.ToolModules.renderSettingsTool(); break;
        case 'about':      content = global.ToolModules.renderAboutTool(); break;
        default:           content = global.ToolModules.renderToolsHub();
      }
    } else {
      switch (currentTab) {
        case 'home':     content = global.CoreModules.renderHome(); break;
        case 'roster':   content = global.CoreModules.renderRoster(); break;
        case 'academic': content = global.CoreModules.renderAcademic(); break;
        case 'plan':     content = global.ToolModules.renderPlan(); break;
        case 'tools':    content = global.ToolModules.renderToolsHub(); break;
        default:         content = global.CoreModules.renderHome();
      }
    }

    if (global.Store.isStorageProtected && global.Store.isStorageProtected()) {
      content = '<div class="card" role="alert" style="border:2px solid var(--danger);">' +
        '<b>⚠️ اطلاعات ذخیره‌شده خوانده نشد</b><p>برای جلوگیری از بازنویسی، ذخیره متوقف است. رونوشت خام را برای کمک فنی نگه دارید یا از تنظیمات پشتیبان معتبر بازیابی کنید. رونوشت خام رمزگذاری نشده و خصوصی است.</p>' +
        '<div class="flex-wrap"><button class="btn btn-outline" onclick="Store.exportRawRecovery()">ذخیره رونوشت خام</button>' +
        '<button class="btn btn-outline" onclick="App.goTool(\'settings\')">تنظیمات و بازیابی</button></div></div>' + content;
    }
    mainEl.innerHTML = content;

    // راه‌اندازی بوم‌های گرافیکی زنده (گردونه شانس و تخته سفید هوشمند)
    if (currentTool === 'picker' && global.LiveClassroom) {
      global.LiveClassroom.mountWheelCanvas();
    } else if (currentTool === 'whiteboard' && global.LiveClassroom) {
      global.LiveClassroom.mountWhiteboardCanvas();
    }

    if (restorePlaceholder) {
      const inputs = mainEl.querySelectorAll('input');
      inputs.forEach(function (inp) {
        if (inp.getAttribute('placeholder') === restorePlaceholder) {
          if (restoreValue !== null) inp.value = restoreValue;
          inp.focus();
          try { inp.setSelectionRange(selStart, selEnd); } catch (e) {}
        }
      });
    }
  }

  function goTab(tab, planSub) {
    currentTool = '';
    currentTab = tab;
    if (tab === 'plan' && planSub) {
      global.ToolModules.setPlanTab(planSub);
      return;
    }
    const mainEl = document.getElementById('app_main');
    if (mainEl) mainEl.scrollTop = 0;
    render();
  }

  function goTool(toolKey) {
    toolOriginTab = currentTab;
    currentTab = 'tools';
    currentTool = toolKey;
    const mainEl = document.getElementById('app_main');
    if (mainEl) mainEl.scrollTop = 0;
    render();
  }

  function backFromTool() {
    currentTool = '';
    currentTab = toolOriginTab || 'tools';
    render();
  }

  function switchClassAndGo(classId, tab) {
    global.Store.setActiveClass(classId);
    if (global.ToolModules && global.ToolModules.resetClassState) global.ToolModules.resetClassState();
    goTab(tab || 'academic');
  }

  function onHeaderClassChange(classId) {
    global.Store.setActiveClass(classId);
    if (global.ToolModules && global.ToolModules.resetClassState) global.ToolModules.resetClassState();
    render();
    toast('کلاس فعال تغییر کرد');
  }

  function openModal(title, bodyHtml) {
    const bd = document.getElementById('modal_backdrop');
    const tEl = document.getElementById('modal_title');
    const bEl = document.getElementById('modal_body');
    if (!bd || !tEl || !bEl) return;
    tEl.textContent = title || '';
    bEl.innerHTML = bodyHtml || '';
    bd.classList.add('open');
  }

  function closeModal() {
    const bd = document.getElementById('modal_backdrop');
    if (bd) bd.classList.remove('open');
    pendingConfirmFn = null;
  }

  function confirmDialog(message, onConfirm) {
    pendingConfirmFn = onConfirm;
    const html = '<p style="margin:0 0 16px 0;font-weight:700;line-height:1.7;">' + global.CoreModules.esc(message) + '</p>' +
      '<div class="flex-between" style="gap:10px;">' +
        '<button type="button" class="btn btn-outline" style="flex:1;" onclick="App.closeModal()">انصراف</button>' +
        '<button type="button" class="btn btn-danger" style="flex:1;" onclick="App.__runConfirm()">بله، انجام شود</button>' +
      '</div>';
    openModal('تأیید عملیات', html);
  }

  function runConfirm() {
    const fn = pendingConfirmFn;
    closeModal();
    if (typeof fn === 'function') fn();
  }

  function toast(msg) {
    const box = document.getElementById('toast_container');
    if (!box) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2400);
  }

  // مدیریت دکمه بازگشت فیزیکی/ژست اندروید
  global.handleAndroidBack = function () {
    const savedPin = (global.Store.getDb().settings.pinCode || '').trim();
    if (savedPin && savedPin.length === 4 && !pinUnlocked) {
      return 'EXIT';
    }
    const bd = document.getElementById('modal_backdrop');
    if (bd && bd.classList.contains('open')) {
      closeModal();
      return 'HANDLED';
    }
    if (currentTool) {
      backFromTool();
      return 'HANDLED';
    }
    if (currentTab !== 'home') {
      goTab('home');
      return 'HANDLED';
    }
    return 'EXIT';
  };

  function init() {
    global.Store.load();
    let firstRunDone = false;
    try { firstRunDone = localStorage.getItem('darsyar_initialized_once') === '1'; } catch (e) {}
    if (!firstRunDone && !global.Store.hadPersistedData() && global.Store.getDb().classes.length === 0) {
      global.Store.loadSampleData();
      try { localStorage.setItem('darsyar_initialized_once', '1'); } catch (e) {}
    }
    const savedPin = (global.Store.getDb().settings.pinCode || '').trim();
    pinUnlocked = !(savedPin && savedPin.length === 4);

    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', function (ev) {
        const curPin = (global.Store.getDb().settings.pinCode || '').trim();
        if (!curPin || curPin.length !== 4 || pinUnlocked) return;
        if (ev.key >= '0' && ev.key <= '9') {
          ev.preventDefault();
          pinPress(ev.key);
        } else if (ev.key === 'Backspace') {
          ev.preventDefault();
          pinPress('del');
        }
      });
    }

    applyTheme();
    render();
    if (global.Store.getStorageNotice()) toast(global.Store.getStorageNotice());
  }

  global.App = {
    init: init,
    render: render,
    applyTheme: applyTheme,
    toggleDarkMode: toggleDarkMode,
    setPalette: setPalette,
    pinPress: pinPress,
    markPinUnlocked: markPinUnlocked,
    lockNow: lockNow,
    goTab: goTab,
    goTool: goTool,
    backFromTool: backFromTool,
    getCurrentTool: function () { return currentTool; },
    switchClassAndGo: switchClassAndGo,
    onHeaderClassChange: onHeaderClassChange,
    openModal: openModal,
    closeModal: closeModal,
    confirmDialog: confirmDialog,
    __runConfirm: runConfirm,
    toast: toast
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
  }
})(typeof window !== 'undefined' ? window : globalThis);
