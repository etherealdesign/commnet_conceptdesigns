/* =========================================================================
   COMMNET TECHNOLOGY SERVICES — motion & interaction
   Lenis (smooth scroll) + GSAP/ScrollTrigger (reveal, parallax) + explorer
   Everything degrades: no GSAP → the page is a static, readable document.
   ========================================================================= */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE    = window.matchMedia('(pointer: fine)').matches;
  var NARROW  = function () { return window.innerWidth <= 820; };
  var hasGSAP = typeof window.gsap !== 'undefined';
  var hasST   = hasGSAP && typeof window.ScrollTrigger !== 'undefined';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ───────────────────── smooth scroll ──────────────────── */
  var lenis = null;
  if (!REDUCED && typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 0.7,                                    /* was 1.05 — read as floaty/"automatic" */
      easing: function (t) { return 1 - Math.pow(1 - t, 3); }, /* easeOutCubic: settles fast, no long tail */
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1                                 /* was 1.6 — touch tracked the finger loosely */
    });
    if (hasGSAP) {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      if (hasST) lenis.on('scroll', ScrollTrigger.update);
    } else {
      var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ───────────────────── scroll progress rail ──────────────────── */
  (function () {
    var fill = $('#scrollbarFill');
    if (!fill || REDUCED) return;
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? clamp(window.scrollY / h, 0, 1) : 0;
      fill.style.width = (pct * 100) + '%';
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (lenis) lenis.on('scroll', onScroll);
    update();
  })();

  function scrollTo(target) {
    var el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
  }

  $$('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href');
    if (!id || id === '#' || !$(id)) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      closeDrawer();
      /* Capabilities and Industries are lenses of the explorer now, not their
         own sections — open the right lens before scrolling to it */
      var lens = window.LENS_FOR && window.LENS_FOR[id.slice(1)];
      if (lens != null && window.selectLens) window.selectLens(lens);
      scrollTo(id);
      history.replaceState(null, '', id);
    });
  });

  /* ───────────────────────── nav ────────────────────────── */
  var nav = $('#nav'), stuck = false;
  function onScrollNav() {
    var next = (window.scrollY || document.documentElement.scrollTop) > 40;
    if (next !== stuck) { stuck = next; nav.classList.toggle('is-stuck', stuck); }
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  var burger = $('#burger'), drawer = $('#drawer'), drawerOpen = false;
  function openDrawer() {
    drawerOpen = true;
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
  function closeDrawer() {
    if (!drawerOpen) return;
    drawerOpen = false;
    drawer.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    setTimeout(function () { if (!drawerOpen) drawer.hidden = true; }, 400);
  }
  if (burger) burger.addEventListener('click', function () { drawerOpen ? closeDrawer() : openDrawer(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });

  /* ───────────── reveal: rise + word masks ──────────────── */
  var SPLIT = '[data-split], .sh h2, .pos__stmt, .cta__h, .quo__q';

  function splitWords(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var walk = function (node) {
      var out = [];
      Array.prototype.forEach.call(node.childNodes, function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { out.push(document.createTextNode(p)); return; }
            var w = document.createElement('span');
            w.className = 'w';
            var i = document.createElement('i');
            i.textContent = p;
            w.appendChild(i);
            out.push(w);
          });
        } else if (n.nodeType === 1) {
          if (n.tagName === 'BR') { out.push(n.cloneNode()); return; }
          var clone = n.cloneNode(false);
          walk(n).forEach(function (c) { clone.appendChild(c); });
          out.push(clone);
        }
      });
      return out;
    };
    var frag = document.createDocumentFragment();
    walk(el).forEach(function (c) { frag.appendChild(c); });
    el.innerHTML = '';
    el.appendChild(frag);
    $$('.w > i', el).forEach(function (i, n) { i.style.transitionDelay = (n * 0.022) + 's'; });
  }

  if (!REDUCED && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    $$('[data-rise]').forEach(function (el) { io.observe(el); });
    $$(SPLIT).forEach(function (el) { splitWords(el); io.observe(el); });

    var h1 = $('.hero__h1');
    if (h1) {
      $$('.line > span', h1).forEach(function (s, i) { s.style.transitionDelay = (0.1 + i * 0.1) + 's'; });
      requestAnimationFrame(function () { setTimeout(function () { h1.classList.add('in'); }, 60); });
    }
    $$('.hero [data-rise]').forEach(function (el) { el.classList.add('in'); });
  } else {
    $$('[data-rise], ' + SPLIT + ', .hero__h1').forEach(function (el) { el.classList.add('in'); });
  }

  /* ═══════════════════ HERO FAN — the 3D piece ═══════════════════
     Five cards held in depth. The centre one is forward; the rest
     step back and turn away. Pointer tilts the whole assembly a
     couple of degrees — enough to notice on the second look.
  */
  (function fan() {
    var root = $('#fan'), inner = $('#fanIn');
    if (!root || !inner) return;

    var cards = $$('.fan__c', inner);
    var dots  = $('#fanDots');
    var prev  = $('#fanPrev'), next = $('#fanNext');
    var n = cards.length, centre = 2, auto = null;

    if (dots) {
      cards.forEach(function () { dots.appendChild(document.createElement('i')); });
    }
    var dotEls = dots ? $$('i', dots) : [];

    function place(i) {
      centre = ((i % n) + n) % n;
      cards.forEach(function (c, k) {
        /* signed distance from centre, wrapped into -2..2 */
        var d = ((k - centre + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
        c.setAttribute('data-d', String(d));
        c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      });
      dotEls.forEach(function (el, k) { el.classList.toggle('on', k === centre); });
    }
    place(2);

    function step(dir) { stopAuto(); place(centre + dir); }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });

    cards.forEach(function (c, k) {
      c.addEventListener('click', function () { stopAuto(); place(k); });
      if (FINE) c.addEventListener('pointerenter', function () { stopAuto(); place(k); });
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });

    /* a slow drift until the visitor takes over */
    function startAuto() {
      if (REDUCED || NARROW() || auto) return;
      auto = setInterval(function () { place(centre + 1); }, 4200);
    }
    function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        en[0].isIntersecting ? startAuto() : stopAuto();
      }, { threshold: 0.25 }).observe(root);
    } else startAuto();

    /* pointer tilt — restrained, and only where there is a real cursor */
    if (FINE && !REDUCED) {
      var tx = 0, ty = 0, cx = 0, cy = 0, tick = 0;
      window.addEventListener('pointermove', function (e) {
        if (NARROW()) return;
        var r = root.getBoundingClientRect();
        tx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2), -1, 1);
        ty = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2), -1, 1);
        if (!tick) tick = requestAnimationFrame(loop);
      }, { passive: true });

      function loop() {
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        inner.style.transform =
          'rotateY(' + (cx * 5).toFixed(2) + 'deg) rotateX(' + (-cy * 3.2).toFixed(2) + 'deg)';
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
          tick = requestAnimationFrame(loop);
        } else { tick = 0; }
      }
    }

    /* touch: the CSS turns the fan into a snap rail, nothing to do here */
  })();

  /* ══════════════ structural lattice — shared by hero + CTA ══════════════
     A canvas of nearest-neighbour nodes on a few depth planes, drifting
     gently and tilting toward a real cursor. No WebGL: three flat planes
     read as depth once they move at different rates, and it costs almost
     nothing. Every instance is gated to run only while its section is on
     screen, and skipped entirely under prefers-reduced-motion.
     opts:
       planes    — depth-plane definitions (z, cols, rows, jitter)
       rgb       — "r,g,b" string for lines/dots
       lineA/dotA— base alpha for links / nodes
       converge  — 0..1, pulls nodes toward centre as z increases
                   (a "focusing" field for the closing section, rather
                   than the hero's evenly scattered one)
       parallax  — how far the field shifts with the cursor
  */
  function initLattice(cv, opts) {
    if (!cv || REDUCED) return;
    opts = opts || {};
    var rgb      = opts.rgb || '28,34,42';
    var lineA     = opts.lineA != null ? opts.lineA : 0.16;
    var dotA      = opts.dotA != null ? opts.dotA : 0.08;
    var dotSpread = opts.dotA != null ? 0.16 : 0.16;
    var converge  = opts.converge || 0;
    var parX      = opts.parallax != null ? opts.parallax : 0.04;
    var parY      = parX * 0.8;
    var linkDist  = opts.linkDist || 0.3;
    var planes    = opts.planes || [
      { z: 0.34, cols: 7, rows: 4, jitter: 0.15 },
      { z: 0.66, cols: 5, rows: 3, jitter: 0.12 },
      { z: 1.00, cols: 4, rows: 2, jitter: 0.09 }
    ];

    var ctx = cv.getContext('2d');
    var W = 0, H = 0, DPR = 1;
    var nodes = [], links = [];
    var px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
    var running = false, raf = 0;

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      var r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      if (!W || !H) return;
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      planes.forEach(function (p, pi) {
        for (var c = 0; c < p.cols; c++) {
          for (var r2 = 0; r2 < p.rows; r2++) {
            var s1 = Math.sin((c + 1) * 12.9898 + (r2 + 1) * 78.233 + pi * 3.1) * 43758.5453;
            var s2 = Math.sin((c + 1) * 39.3468 + (r2 + 1) * 11.135 + pi * 7.7) * 24634.6345;
            var ux = (c + 0.5) / p.cols + (s1 - Math.floor(s1) - 0.5) * p.jitter;
            var uy = (r2 + 0.5) / p.rows + (s2 - Math.floor(s2) - 0.5) * p.jitter;
            if (converge) {
              var pull = converge * (0.25 + p.z * 0.5);
              ux += (0.5 - ux) * pull;
              uy += (0.5 - uy) * pull;
            }
            nodes.push({ ux: ux, uy: uy, z: p.z, plane: pi, ph: (s1 - Math.floor(s1)) * Math.PI * 2 });
          }
        }
      });

      links = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          if (nodes[i].plane !== nodes[j].plane) continue;
          var dx = nodes[i].ux - nodes[j].ux, dy = nodes[i].uy - nodes[j].uy;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) links.push([i, j, d]);
        }
      }
    }

    function draw(t) {
      raf = requestAnimationFrame(draw);
      if (!W || !H) return;
      px += (tx - px) * 0.05;
      py += (ty - py) * 0.05;
      ctx.clearRect(0, 0, W, H);

      var ox = px - 0.5, oy = py - 0.5;
      var pts = nodes.map(function (nd) {
        var par = 0.5 + nd.z * 0.85;
        var drift = Math.sin(t * 0.0002 + nd.ph) * 0.0035;
        return {
          x: (nd.ux + ox * parX * par + drift) * W,
          y: (nd.uy + oy * parY * par - drift) * H,
          z: nd.z
        };
      });

      for (var k = 0; k < links.length; k++) {
        var a = pts[links[k][0]], b = pts[links[k][1]], d = links[k][2];
        var alpha = (1 - d / linkDist) * lineA * (0.4 + a.z * 0.6);
        ctx.strokeStyle = 'rgba(' + rgb + ',' + alpha.toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (var m = 0; m < pts.length; m++) {
        var p = pts[m];
        ctx.fillStyle = 'rgba(' + rgb + ',' + (dotA + p.z * dotSpread).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1 + p.z * 1.2, 0, Math.PI * 2); ctx.fill();
      }
    }

    build();
    window.addEventListener('resize', build, { passive: true });

    if (FINE) {
      window.addEventListener('pointermove', function (e) {
        tx = clamp(e.clientX / window.innerWidth, 0, 1);
        ty = clamp(e.clientY / window.innerHeight, 0, 1);
      }, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) {
          if (!running) { running = true; raf = requestAnimationFrame(draw); }
        } else { running = false; cancelAnimationFrame(raf); }
      }, { threshold: 0 }).observe(cv);
    } else { running = true; raf = requestAnimationFrame(draw); }
  }

  /* hero: the full, evenly scattered field */
  initLattice($('#lattice'));

  /* CTA: sparser and quieter, and the planes pull gently toward centre —
     the network resolving to a point, closing the page's opening image */
  initLattice($('#ctaLattice'), {
    rgb: '10,77,115',
    lineA: 0.14,
    dotA: 0.10,
    converge: 0.22,
    parallax: 0.03,
    planes: [
      { z: 0.4,  cols: 6, rows: 3, jitter: 0.16 },
      { z: 0.75, cols: 4, rows: 2, jitter: 0.12 },
      { z: 1.0,  cols: 3, rows: 2, jitter: 0.08 }
    ]
  });

  /* ────────── the explorer: one index, three lenses, one stage ──────────
     Each row owns its detail node in the markup (so it is readable without JS
     and is the mobile layout). On desktop the details are moved once into the
     shared stage; on narrow screens they stay in the row they belong to. */
  (function explorer () {
    var sec = $('#ex') || $('.ex');
    if (!sec) return;

    var tabs  = $$('.ex__tab', sec);
    var ink   = $('.ex__ink', sec);
    var lists = $$('.ex__list', sec);
    var stage = $('#exStage');
    if (!tabs.length || !lists.length || !stage) return;

    var WIDE = window.matchMedia('(min-width: 1181px)');
    var lens = 0;

    /* per-lens: the rows, their detail nodes, and the active row */
    var groups = lists.map(function (list) {
      var rows = $$('li', list);
      return {
        list: list,
        rows: rows,
        details: rows.map(function (r) { return $('.ex__d', r); }),
        homes: rows.slice(),
        active: 0
      };
    });

    /* move every detail into the shared stage (wide) or back home (narrow) */
    function place () {
      var wide = WIDE.matches;
      groups.forEach(function (g) {
        g.details.forEach(function (d, i) {
          if (!d) return;
          var target = wide ? stage : g.homes[i];
          if (d.parentNode !== target) target.appendChild(d);
        });
      });
      paintDetails();
    }

    function paintDetails () {
      groups.forEach(function (g, gi) {
        g.details.forEach(function (d, i) {
          if (!d) return;
          d.classList.toggle('is-on', gi === lens && i === g.active);
        });
      });
    }

    function selectRow (gi, i) {
      var g = groups[gi];
      if (!g || i === g.active) return;
      g.active = i;
      g.rows.forEach(function (r, k) {
        var on = k === i;
        r.classList.toggle('is-on', on);
        var b = $('button', r);
        if (b) b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      paintDetails();
      if (hasST) ScrollTrigger.refresh();
    }

    function moveInk () {
      if (!ink) return;
      var t = tabs[lens];
      if (!t) return;
      ink.style.width = t.offsetWidth + 'px';
      ink.style.transform = 'translateX(' + (t.offsetLeft - 5) + 'px)';
    }

    function selectLens (n, focus) {
      if (n === lens) { moveInk(); return; }
      lens = n;
      tabs.forEach(function (t, k) {
        var on = k === n;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      lists.forEach(function (l, k) { l.classList.toggle('is-on', k === n); });
      moveInk();
      paintDetails();
      if (focus && tabs[n]) tabs[n].focus();
      if (hasST) ScrollTrigger.refresh();
    }

    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { selectLens(k); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        selectLens((k + d + tabs.length) % tabs.length, true);
      });
    });

    groups.forEach(function (g, gi) {
      g.rows.forEach(function (r, i) {
        var btn = $('button', r) || r;
        if (FINE) r.addEventListener('pointerenter', function () { selectRow(gi, i); });
        btn.addEventListener('click', function () { selectRow(gi, i); });
        btn.addEventListener('focus', function () { selectRow(gi, i); });
      });
    });

    /* the nav still points at #capabilities / #industries — land on that lens */
    window.LENS_FOR = { capabilities: 1, industries: 2 };
    window.selectLens = selectLens;

    place();
    moveInk();
    window.addEventListener('resize', function () { place(); moveInk(); }, { passive: true });
    window.addEventListener('load', moveInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
  })();

  /* ───────────── scroll: image parallax ───────── */
  if (hasST && !REDUCED) {
    gsap.registerPlugin(ScrollTrigger);

    $$('.co__fig img, .dep__item figure img').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -3 }, {
        yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });

    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  if (hasST) {
    $$('img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
    });
  }
})();
