// ابزارهای تعاملی زنده درس‌یار ۲.۰: گردونه شانس گرافیکی (Canvas Wheel) و تخته سفید هوشمند سرِ کلاس (Smart Whiteboard)
(function (global) {
  'use strict';

  const WHEEL_PALETTE = [
    '#0B6E75', '#2563EB', '#7C3AED', '#DB2777',
    '#EA580C', '#059669', '#D97706', '#4F46E5'
  ];

  const wbState = {
    paper: 'plain',     // plain | lined | grid | chalk
    color: '#0F172A',
    width: 3.5,
    eraser: false,
    strokes: [],        // [{ color, width, eraser, pts: [{x, y}] }]
    drawing: false
  };

  const wheelState = {
    angleRad: 0,
    spinning: false,
    winnerId: '',
    noRepeat: true,
    onlyPresent: true,
    poolIds: [],
    poolInitialized: false,
    displayIds: [],
    spinGeneration: 0
  };

  function esc(str) {
    return global.CoreModules ? global.CoreModules.esc(str) : String(str || '');
  }

  function escJsAttr(str) { return global.CoreModules.escJsAttr(str); }

  // ==================== ۱. گردونه شانس گرافیکی (Spinning Wheel) ====================
  function getWheelCandidates(classId) {
    const all = global.Store.getStudentsByClass(classId);
    if (!wheelState.onlyPresent) return all;
    const today = global.Jalali.getTodayStr();
    const att = global.Store.getDb().attendance.find(function (a) { return a.classId === classId && a.date === today; });
    if (!att || !att.records) return all;
    return all.filter(function (s) { return att.records[s.id] !== 'absent'; });
  }

  function getActiveWheelSliceStudents(classId, startNewRound) {
    const eligible = getWheelCandidates(classId);
    if (!wheelState.noRepeat) return eligible;
    const validPool = wheelState.poolIds.filter(function (id) {
      return eligible.some(function (s) { return s.id === id; });
    });
    // An empty pool after the final spin means zero remaining until the next
    // spin, not an immediate reset merely because the page was re-rendered.
    if (!wheelState.poolInitialized || (startNewRound && !validPool.length)) {
      wheelState.poolIds = eligible.map(function (s) { return s.id; });
      wheelState.poolInitialized = true;
      return eligible;
    }
    wheelState.poolIds = validPool;
    return eligible.filter(function (s) { return validPool.indexOf(s.id) !== -1; });
  }

  function renderWheelPickerTool() {
    const cls = global.Store.getActiveClass();
    if (!cls) return '<div class="card empty-state">ابتدا یک کلاس ایجاد کنید.</div>';
    const J = global.Jalali;
    const eligible = getWheelCandidates(cls.id);
    if (!eligible.length) {
      return '<div class="card empty-state"><div class="empty-state-icon">🎡</div>' +
        '<div>دانش‌آموز حاضری برای چرخش گردونه یافت نشد.</div>' +
        (wheelState.onlyPresent ? '<button class="btn btn-soft btn-sm mt-3" onclick="LiveClassroom.toggleWheelOpt(\'present\', false)">شامل کردن همه شاگردان</button>' : '') +
      '</div>';
    }

    const sliceStudents = getActiveWheelSliceStudents(cls.id);
    const curStu = wheelState.winnerId ? global.Store.getStudentById(wheelState.winnerId) : null;

    let html = '<div class="picker-stage" style="padding:18px 14px;">' +
      '<div style="font-size:12px;opacity:0.9;font-weight:700;">🎡 گردونه شانس کلاس: ' + esc(cls.name) + '</div>' +
      '<div class="wheel-wrap">' +
        '<div class="wheel-pointer">🔻</div>' +
        '<canvas id="wheel_canvas" class="wheel-canvas" width="560" height="560" onclick="LiveClassroom.spinWheel()"></canvas>' +
      '</div>' +
      '<div class="picker-name" style="font-size:22px;margin:4px 0;">' +
        (curStu ? '🎉 ' + esc(curStu.name) : 'روی دکمه چرخش بزنید!') +
      '</div>' +
      '<div style="font-size:12px;opacity:0.88;">' +
        (wheelState.noRepeat
          ? 'باقی‌مانده در این دور: ' + J.toFa(sliceStudents.length) + ' از ' + J.toFa(eligible.length) + ' نفر'
          : 'حالت چرخش آزاد بین ' + J.toFa(eligible.length) + ' نفر') +
      '</div>' +
      '<div class="mt-3 flex-wrap" style="justify-content:center;gap:8px;">' +
        '<button type="button" class="btn btn-amber" style="font-size:15px;padding:11px 24px;" onclick="LiveClassroom.spinWheel()" ' + (wheelState.spinning ? 'disabled' : '') + '>' +
          (wheelState.spinning ? 'در حال چرخش...' : '🎡 بچرخان!') +
        '</button>' +
        (curStu ? '<button type="button" class="btn" style="background:rgba(255,255,255,0.2);color:#fff;" onclick="CoreModules.quickBehavior(\'' + escJsAttr(curStu.id) + '\', \'pos\', \'پاسخ عالی در گردونه پرسش کلاسی\', 1)">⭐ +۱ امتیاز مثبت</button>' : '') +
      '</div>' +
    '</div>';

    html += '<div class="card">' +
      '<label style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;">' +
        '<span style="font-weight:800;">حذف انتخاب‌شده تا پایان دور کلاس</span>' +
        '<input type="checkbox" ' + (wheelState.noRepeat ? 'checked' : '') + ' onchange="LiveClassroom.toggleWheelOpt(\'norepeat\', this.checked)">' +
      '</label>' +
      '<label style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-top:1px solid var(--border);">' +
        '<span style="font-weight:800;">حذف غایبین امروز از گردونه</span>' +
        '<input type="checkbox" ' + (wheelState.onlyPresent ? 'checked' : '') + ' onchange="LiveClassroom.toggleWheelOpt(\'present\', this.checked)">' +
      '</label>' +
      '<button type="button" class="btn btn-outline btn-sm btn-block mt-2" onclick="LiveClassroom.resetWheelPool()">🔄 بازنشانی دور جدید گردونه</button>' +
    '</div>';

    return html;
  }

  function mountWheelCanvas() {
    const canvas = document.getElementById('wheel_canvas');
    if (!canvas) return;
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    let items = getActiveWheelSliceStudents(cls.id, false);
    // Keep the exact wheel used in the last draw on screen: dropping the winner
    // before repainting would make the pointer indicate a different student.
    if (wheelState.winnerId && wheelState.displayIds.length) {
      const all = global.Store.getStudentsByClass(cls.id);
      items = wheelState.displayIds.map(function (id) {
        return all.find(function (student) { return student.id === id; });
      }).filter(Boolean);
    }
    drawWheelFrame(canvas, items, wheelState.angleRad);
  }

  function drawWheelFrame(canvas, items, rotRad) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = W / 2 - 10;
    ctx.clearRect(0, 0, W, H);

    if (!items.length) return;
    const N = items.length;
    const arc = (2 * Math.PI) / N;

    for (let i = 0; i < N; i++) {
      const a0 = rotRad + i * arc;
      const a1 = a0 + arc;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a0, a1);
      ctx.closePath();
      ctx.fillStyle = WHEEL_PALETTE[i % WHEEL_PALETTE.length];
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.85)';
      ctx.stroke();

      // نوشتن نام دانش‌آموز در قطاع
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a0 + arc / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      const fontSize = N > 22 ? 16 : (N > 14 ? 20 : 24);
      ctx.font = '800 ' + fontSize + 'px Vazirmatn, sans-serif';
      let label = items[i].name || '';
      if (label.length > 16) label = label.slice(0, 15) + '…';
      ctx.fillText(label, R - 22, 0);
      ctx.restore();
    }

    // قاب بیرونی طلایی و مرکز گردونه
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#FBBF24';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#F59E0B';
    ctx.stroke();

    ctx.fillStyle = '#073B54';
    ctx.font = '900 22px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', cx, cy + 1);
  }

  function spinWheel() {
    if (wheelState.spinning) return;
    const cls = global.Store.getActiveClass();
    if (!cls) return;
    const items = getActiveWheelSliceStudents(cls.id, true);
    if (!items.length) return;

    const canvas = document.getElementById('wheel_canvas');
    if (!canvas) return;

    wheelState.spinning = true;
    wheelState.displayIds = items.map(function (student) { return student.id; });
    const generation = ++wheelState.spinGeneration;
    const N = items.length;
    const arc = (2 * Math.PI) / N;
    const winIdx = Math.floor(Math.random() * N);
    const chosen = items[winIdx];

    // عقربه در بالا (زاویه -PI/2 معادل 3*PI/2) قرار دارد
    const pointerAngle = (3 * Math.PI) / 2;
    const sliceCenterTarget = pointerAngle - (winIdx + 0.5) * arc;
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
    const startAngle = wheelState.angleRad % (2 * Math.PI);
    let targetAngle = sliceCenterTarget + extraSpins;
    while (targetAngle <= startAngle + 4 * Math.PI) {
      targetAngle += 2 * Math.PI;
    }

    const durMs = 3100;
    const t0 = performance.now();
    let lastTickSlice = -1;

    function step(now) {
      if (generation !== wheelState.spinGeneration) return;
      const t = Math.min(1, (now - t0) / durMs);
      const ease = 1 - Math.pow(1 - t, 4); // Ease-out quartic
      const curAngle = startAngle + (targetAngle - startAngle) * ease;
      wheelState.angleRad = curAngle;

      const curCanvas = document.getElementById('wheel_canvas');
      if (curCanvas) {
        drawWheelFrame(curCanvas, items, curAngle);
      }

      const norm = ((pointerAngle - curAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const curSlice = Math.floor(norm / arc);
      if (curSlice !== lastTickSlice && t < 0.98) {
        lastTickSlice = curSlice;
        global.Store.playWheelTick();
      }

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        wheelState.spinning = false;
        wheelState.winnerId = chosen.id;
        if (wheelState.noRepeat) {
          wheelState.poolIds = wheelState.poolIds.filter(function (id) { return id !== chosen.id; });
        }
        global.Store.playWinFanfare();
        global.App.render();
      }
    }

    requestAnimationFrame(step);
  }

  function invalidateWheel() {
    wheelState.spinGeneration++;
    wheelState.spinning = false;
    wheelState.poolIds = [];
    wheelState.poolInitialized = false;
    wheelState.displayIds = [];
    wheelState.winnerId = '';
  }

  function toggleWheelOpt(which, val) {
    if (which === 'norepeat') wheelState.noRepeat = !!val;
    else wheelState.onlyPresent = !!val;
    invalidateWheel();
    global.App.render();
  }

  function resetWheelPool() {
    invalidateWheel();
    global.App.render();
    global.App.toast('دور جدید گردونه آماده شد ✓');
  }

  function resetWheelClass() {
    invalidateWheel();
  }

  // ==================== ۲. تخته سفید هوشمند سرِ کلاس (Smart Whiteboard) ====================
  function renderWhiteboardTool() {
    const isChalk = wbState.paper === 'chalk';
    const colors = isChalk
      ? ['#FFFFFF', '#FDE047', '#67E8F9', '#FCA5A5', '#86EFAC', '#FDBA74']
      : ['#0F172A', '#2563EB', '#DC2626', '#059669', '#D97706', '#7C3AED'];

    if (colors.indexOf(wbState.color) === -1) {
      wbState.color = colors[0];
    }

    let swatches = '';
    colors.forEach(function (c) {
      const active = !wbState.eraser && wbState.color === c;
      swatches += '<button type="button" class="wb-swatch ' + (active ? 'active' : '') + '" style="background:' + c + ';border-color:' + (c === '#FFFFFF' ? '#94A3B8' : 'transparent') + ';" onclick="LiveClassroom.setWbColor(\'' + c + '\')" aria-label="رنگ قلم"></button>';
    });

    return '' +
      '<div class="wb-toolbar">' +
        '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' + swatches +
          '<button type="button" class="btn btn-sm ' + (wbState.eraser ? 'btn-amber' : 'btn-outline') + '" onclick="LiveClassroom.toggleWbEraser()">🧽 پاک‌کن</button>' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:5px;">' +
          '<button type="button" class="btn btn-sm ' + (wbState.width === 2.2 ? 'btn-soft' : 'btn-outline') + '" onclick="LiveClassroom.setWbWidth(2.2)">نازک</button>' +
          '<button type="button" class="btn btn-sm ' + (wbState.width === 4 ? 'btn-soft' : 'btn-outline') + '" onclick="LiveClassroom.setWbWidth(4)">متوسط</button>' +
          '<button type="button" class="btn btn-sm ' + (wbState.width === 7.5 ? 'btn-soft' : 'btn-outline') + '" onclick="LiveClassroom.setWbWidth(7.5)">ماژیک</button>' +
        '</div>' +
      '</div>' +

      '<div class="wb-canvas-card ' + (isChalk ? 'chalk' : '') + '">' +
        '<canvas id="wb_canvas"></canvas>' +
      '</div>' +
      '<p class="text-muted text-sm">نوشته‌های تخته پس از بستن برنامه حفظ نمی‌شوند؛ برای نگهداری، تصویر را ذخیره کنید.</p>' +

      '<div class="card mt-2" style="padding:10px 12px;">' +
        '<div class="flex-between" style="flex-wrap:wrap;gap:8px;">' +
          '<div class="flex-wrap">' +
            '<button type="button" class="btn btn-sm ' + (wbState.paper === 'plain' ? 'btn-primary' : 'btn-outline') + '" onclick="LiveClassroom.setWbPaper(\'plain\')">سفید ساده</button>' +
            '<button type="button" class="btn btn-sm ' + (wbState.paper === 'lined' ? 'btn-primary' : 'btn-outline') + '" onclick="LiveClassroom.setWbPaper(\'lined\')">خط‌دار</button>' +
            '<button type="button" class="btn btn-sm ' + (wbState.paper === 'grid' ? 'btn-primary' : 'btn-outline') + '" onclick="LiveClassroom.setWbPaper(\'grid\')">شطرنجی ریاضی</button>' +
            '<button type="button" class="btn btn-sm ' + (wbState.paper === 'chalk' ? 'btn-primary' : 'btn-outline') + '" onclick="LiveClassroom.setWbPaper(\'chalk\')">تخته گچی</button>' +
          '</div>' +
          '<div class="flex-wrap">' +
            '<button type="button" class="btn btn-sm btn-outline" onclick="LiveClassroom.undoWb()">↩ واگرد</button>' +
            '<button type="button" class="btn btn-sm btn-danger" onclick="LiveClassroom.clearWb()">🗑️ پاک کردن</button>' +
            '<button type="button" class="btn btn-sm btn-soft" onclick="LiveClassroom.exportWbImage()">📥 ذخیره تصویر</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function drawWbBackground(ctx, cssW, cssH) {
    const isChalk = wbState.paper === 'chalk';
    ctx.fillStyle = isChalk ? '#133A2C' : '#FFFFFF';
    ctx.fillRect(0, 0, cssW, cssH);

    if (wbState.paper === 'lined') {
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      for (let y = 36; y < cssH; y += 34) {
        ctx.beginPath();
        ctx.moveTo(14, y);
        ctx.lineTo(cssW - 14, y);
        ctx.stroke();
      }
    } else if (wbState.paper === 'grid') {
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      for (let x = 0; x < cssW; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cssH);
        ctx.stroke();
      }
      for (let y = 0; y < cssH; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cssW, y);
        ctx.stroke();
      }
    }
  }

  function redrawWhiteboard(canvas) {
    if (!canvas) canvas = document.getElementById('wb_canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const cssW = Math.max(280, Math.round(rect.width));
    const cssH = Math.max(260, Math.round(rect.height));
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);
    drawWbBackground(ctx, cssW, cssH);

    const bgEraseColor = wbState.paper === 'chalk' ? '#133A2C' : '#FFFFFF';
    wbState.strokes.forEach(function (st) {
      if (!st.pts || !st.pts.length) return;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = st.eraser ? bgEraseColor : st.color;
      ctx.lineWidth = st.eraser ? 22 : st.width;
      if (st.pts.length === 1) {
        ctx.arc(st.pts[0].x, st.pts[0].y, (st.eraser ? 11 : st.width / 2), 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      } else {
        ctx.moveTo(st.pts[0].x, st.pts[0].y);
        for (let i = 1; i < st.pts.length - 1; i++) {
          const midX = (st.pts[i].x + st.pts[i + 1].x) / 2;
          const midY = (st.pts[i].y + st.pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(st.pts[i].x, st.pts[i].y, midX, midY);
        }
        const last = st.pts[st.pts.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  function mountWhiteboardCanvas() {
    const canvas = document.getElementById('wb_canvas');
    if (!canvas) return;
    redrawWhiteboard(canvas);

    function getPt(ev) {
      const r = canvas.getBoundingClientRect();
      const clientX = ev.touches && ev.touches.length ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches && ev.touches.length ? ev.touches[0].clientY : ev.clientY;
      return { x: clientX - r.left, y: clientY - r.top };
    }

    function onStart(ev) {
      ev.preventDefault();
      wbState.drawing = true;
      const pt = getPt(ev);
      wbState.strokes.push({
        color: wbState.color,
        width: wbState.width,
        eraser: wbState.eraser,
        pts: [pt]
      });
      redrawWhiteboard(canvas);
    }

    function onMove(ev) {
      if (!wbState.drawing) return;
      ev.preventDefault();
      const cur = wbState.strokes[wbState.strokes.length - 1];
      if (!cur) return;
      cur.pts.push(getPt(ev));
      redrawWhiteboard(canvas);
    }

    function onEnd() {
      wbState.drawing = false;
    }

    canvas.onpointerdown = onStart;
    canvas.onpointermove = onMove;
    canvas.onpointerup = onEnd;
    canvas.onpointercancel = onEnd;
  }

  function setWbColor(c) {
    wbState.color = c;
    wbState.eraser = false;
    global.App.render();
  }

  function setWbWidth(w) {
    wbState.width = w;
    wbState.eraser = false;
    global.App.render();
  }

  function toggleWbEraser() {
    wbState.eraser = !wbState.eraser;
    global.App.render();
  }

  function setWbPaper(p) {
    const prevChalk = wbState.paper === 'chalk';
    wbState.paper = p;
    if (!prevChalk && p === 'chalk' && wbState.color === '#0F172A') wbState.color = '#FFFFFF';
    if (prevChalk && p !== 'chalk' && wbState.color === '#FFFFFF') wbState.color = '#0F172A';
    global.App.render();
  }

  function undoWb() {
    if (wbState.strokes.length) {
      wbState.strokes.pop();
      redrawWhiteboard();
      global.Store.vibrate(18);
    }
  }

  function clearWb() {
    if (!wbState.strokes.length) return;
    global.App.confirmDialog('همه نوشته‌های تخته پاک شوند؟ برای نگهداری ابتدا تصویر را ذخیره کنید.', function () {
      wbState.strokes = [];
      redrawWhiteboard();
      global.Store.vibrate(25);
      global.App.toast('تخته پاک شد ✓');
    });
  }

  function exportWbImage() {
    const canvas = document.getElementById('wb_canvas');
    if (!canvas) return;
    redrawWhiteboard(canvas);
    const dataUrl = canvas.toDataURL('image/png');
    const dateTag = global.Jalali.toEn(global.Jalali.getTodayStr()).replace(/\//g, '-');
    global.Store.exportBase64Image('DarsYar-Whiteboard-' + dateTag + '.png', dataUrl);
  }

  global.LiveClassroom = {
    renderWheelPickerTool: renderWheelPickerTool,
    mountWheelCanvas: mountWheelCanvas,
    spinWheel: spinWheel,
    toggleWheelOpt: toggleWheelOpt,
    resetWheelPool: resetWheelPool,
    resetWheelClass: resetWheelClass,
    renderWhiteboardTool: renderWhiteboardTool,
    mountWhiteboardCanvas: mountWhiteboardCanvas,
    setWbColor: setWbColor,
    setWbWidth: setWbWidth,
    toggleWbEraser: toggleWbEraser,
    setWbPaper: setWbPaper,
    undoWb: undoWb,
    clearWb: clearWb,
    exportWbImage: exportWbImage
  };
})(typeof window !== 'undefined' ? window : globalThis);
