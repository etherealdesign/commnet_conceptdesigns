/* ══════════════════════════════════════════════════════════
   TELEIOSTEC — VERSION 02
   Vanilla JS · modular, lightweight, no dependencies
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── 1 · Header scroll state ─────────────────────────── */
  (function header() {
    var hd = $('#hd');
    if (!hd) return;
    var on = false;
    function tick() {
      var should = window.scrollY > 40;
      if (should !== on) { on = should; hd.classList.toggle('is-stuck', on); }
    }
    tick();
    window.addEventListener('scroll', tick, { passive: true });
  })();

  /* ── 2 · Fullscreen menu ─────────────────────────────── */
  (function menu() {
    var btn = $('#burger'), panel = $('#menu');
    if (!btn || !panel) return;

    function set(open) {
      document.body.classList.toggle('is-menu', open);
      document.body.classList.toggle('is-locked', open);
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () {
      set(!panel.classList.contains('is-open'));
    });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) set(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820 && panel.classList.contains('is-open')) set(false);
    });
  })();

  /* ── 3 · Reveal on scroll ────────────────────────────── */
  (function reveals() {
    var items = $$('[data-reveal], [data-img-reveal]');
    if (!items.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ── 4 · Hero line-in ────────────────────────────────── */
  (function heroIn() {
    var hero = $('.hero');
    if (!hero) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('is-in'); });
    });
  })();

  /* ── 5 · Video autoplay when in view (battery-kind) ──── */
  (function videos() {
    var wraps = $$('[data-vid]');
    if (!wraps.length) return;

    function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

    if (!('IntersectionObserver' in window)) {
      wraps.forEach(function (w) { var v = $('[data-video]', w); if (v) play(v); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = $('[data-video]', en.target);
        if (!v) return;
        if (en.isIntersecting) play(v);
        else if (!v.paused) v.pause();
      });
    }, { threshold: 0.2 });
    wraps.forEach(function (w) { io.observe(w); });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) $$('[data-video]').forEach(function (v) { if (!v.paused) v.pause(); });
    });
  })();

  /* ── 6 · Parallax (rAF, transform only) ──────────────── */
  (function parallax() {
    if (reduce) return;
    var els = $$('[data-parallax]');
    if (!els.length) return;
    var ticking = false;

    function frame() {
      ticking = false;
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var host = el.closest('.plate__frame, .hero') || el.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var amt = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;   // -1 … 1
        el.style.transform = 'translate3d(0,' + (progress * amt * 100).toFixed(2) + 'px,0)';
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  })();

  /* ── 7 · Services — cursor-following image preview ───── */
  (function serviceCursor() {
    if (!fine || reduce) return;
    var wrap = $('#svcCursor'), img = $('#svcCursorImg'), rows = $$('[data-row]');
    if (!wrap || !img || !rows.length) return;

    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, active = false;

    function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      wrap.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      raf = active ? requestAnimationFrame(loop) : null;
    }
    function start() { if (!raf) { active = true; raf = requestAnimationFrame(loop); } }
    function stop() { active = false; }

    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var src = row.getAttribute('data-img');
        if (src && img.getAttribute('src') !== src) img.setAttribute('src', src);
        wrap.classList.add('is-on');
        start();
      });
      row.addEventListener('mouseleave', function () {
        wrap.classList.remove('is-on');
        setTimeout(stop, 600);
      });
      row.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    });
  })();

  /* ── 8 · Projects — circular cursor indicator ────────── */
  (function projectCursor() {
    if (!fine || reduce) return;
    var projects = $$('[data-proj]');
    if (!projects.length) return;

    var dot = document.createElement('div');
    dot.className = 'pj-cursor';
    dot.textContent = 'View';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, active = false;
    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      dot.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)' +
                            (dot.classList.contains('is-on') ? ' scale(1)' : ' scale(.6)');
      raf = active ? requestAnimationFrame(loop) : null;
    }
    projects.forEach(function (p) {
      p.addEventListener('mouseenter', function () {
        dot.classList.add('is-on');
        if (!raf) { active = true; raf = requestAnimationFrame(loop); }
      });
      p.addEventListener('mouseleave', function () {
        dot.classList.remove('is-on');
        setTimeout(function () { active = false; }, 600);
      });
      p.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    });
  })();

  /* ── 9 · Process — horizontal drag + wheel (desktop) ─── */
  (function processTrack() {
    var track = $('#procTrack');
    if (!track) return;

    var down = false, startX = 0, startL = 0, moved = false;

    function isHorizontal() { return window.innerWidth > 820; }

    track.addEventListener('pointerdown', function (e) {
      if (!isHorizontal()) return;
      down = true; moved = false;
      startX = e.clientX; startL = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function (e) {
      if (!down) return;
      var d = e.clientX - startX;
      if (Math.abs(d) > 4) moved = true;
      track.scrollLeft = startL - d;
    });
    ['pointerup', 'pointercancel'].forEach(function (t) {
      track.addEventListener(t, function () { down = false; });
    });
    track.addEventListener('click', function (e) { if (moved) e.preventDefault(); }, true);

    // trackpad vertical → horizontal, only while the track can still move
    track.addEventListener('wheel', function (e) {
      if (!isHorizontal()) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = track.scrollWidth - track.clientWidth;
      var next = track.scrollLeft + e.deltaY;
      if (next > 0 && next < max) { track.scrollLeft = next; e.preventDefault(); }
    }, { passive: false });
  })();

  /* ── 10 · Smooth anchor scroll with header offset ────── */
  (function anchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 8;
        window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
        if (history.replaceState) history.replaceState(null, '', id);
      });
    });
  })();


  /* ── 11 · Years of practice, derived ──────────────────
     data-founded in the studio note is the only place the founding year
     is written. Both the "Est." line and the years figure are rendered
     from it, so the two cannot contradict each other and the figure does
     not go stale each January. The static 14 in the markup is the
     no-JavaScript fallback. */
  (function years() {
    var src = $('[data-founded]');
    var since = src ? parseInt(src.getAttribute('data-founded'), 10) : 0;
    if (!since) return;
    src.textContent = 'Est. ' + since;
    var yrs = new Date().getFullYear() - since;
    if (yrs < 1) return;
    $$('[data-years-since-founded]').forEach(function (el) {
      // replace only the leading number, leaving any styled suffix alone
      if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.nodeValue = String(yrs);
      else el.insertBefore(document.createTextNode(String(yrs)), el.firstChild);
    });
  })();


})();
