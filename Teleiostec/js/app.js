/* ══════════════════════════════════════════════════════════════
   TELEIOSTEC — interaction layer
   Native scroll, no libraries. Motion only refines a layout that
   is already complete when static. Everything respects
   prefers-reduced-motion.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── text animation: split headings into words ──────────────
     Each word is wrapped so it can rise on reveal. <em>/<br> are
     preserved. Skipped under reduced motion. */
  function splitWords(root) {
    if (root.dataset.split) return;
    root.dataset.split = '1';
    (function rec(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          if (!n.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (p) {
            if (p === '') return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); }
            else { var s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.appendChild(s); }
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') { rec(n); }
      });
    })(root);
    $$('.w', root).forEach(function (w, i) { w.style.transitionDelay = Math.min(i * 0.04, 0.5) + 's'; });
  }
  $$('.hero__title, .statement, .sec-title, .contact__title').forEach(function (el) {
    el.removeAttribute('data-reveal');
    el.classList.add('is-split');
    if (!reduced) splitWords(el);
  });

  /* ── scroll reveals + image wipes ───────────────────────────
     One observer drives the block reveals, the split headings and
     the image clip-wipes. Fires once; off under reduced motion. */
  var reveals = $$('[data-reveal], .is-split, [data-img-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = parseFloat(e.target.getAttribute('data-delay') || 0);
        if (d) e.target.style.transitionDelay = (d * 0.09) + 's';
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── years of practice, derived ─────────────────────────────
     data-founded in the hero is the only place the founding year is
     written. Both the "Est." line and the years figure are rendered from
     it, so the two cannot contradict each other and the figure cannot go
     stale in January. Runs before the counter, which animates to it. */
  (function () {
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

  /* ── animated stat counters ─────────────────────────────────
     The facts figures count up to their value the first time the
     block enters view. */
  var facts = $('.facts');
  if (facts && !reduced && 'IntersectionObserver' in window) {
    var counted = false;
    new IntersectionObserver(function (ents, ob) {
      ents.forEach(function (en) {
        if (!en.isIntersecting || counted) return;
        counted = true; ob.disconnect();
        $$('dt', facts).forEach(function (dt) {
          var m = dt.textContent.match(/^(\d+)/);
          if (!m) return;
          var target = +m[1];
          // Only the number animates. The suffix keeps its own element, so
          // the styled superscript survives the count.
          var num = document.createTextNode('0');
          var tail = dt.querySelector('span');
          dt.textContent = '';
          dt.appendChild(num);
          if (tail) { tail.style.visibility = 'hidden'; dt.appendChild(tail); }
          var t0 = null, dur = 1400;
          var step = function (ts) {
            if (t0 === null) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            num.nodeValue = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
            else if (tail) tail.style.visibility = '';
          };
          requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.4 }).observe(facts);
  }

  /* ── magnetic buttons — lean toward the cursor ──────────────*/
  if (finePointer && !reduced) {
    $$('.feature__btn, .cta, .link-arrow--lg, .hero__act .link-arrow').forEach(function (el) {
      el.classList.add('magnetic');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = (e.clientX - r.left) / r.width - 0.5;
        var my = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'translate(' + (mx * 12).toFixed(1) + 'px,' + (my * 10).toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ── header: quiet until needed ─────────────────────────────
     Gains a hairline + soft backdrop once past the top, hides on
     scroll-down and returns on scroll-up. */
  var head = $('#head');
  var lastY = window.pageYOffset, ticking = false;
  function onScroll() {
    var y = window.pageYOffset;
    head.classList.toggle('is-scrolled', y > 8);
    if (!document.body.classList.contains('menu-open')) {
      if (y > 160 && y > lastY + 6) head.classList.add('is-hidden');
      else if (y < lastY - 6) head.classList.remove('is-hidden');
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ── mobile menu ────────────────────────────────────────────*/
  var burger = $('#burger'), drawer = $('#drawer');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (drawer) {
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      // keep the closed drawer out of the tab order as well as out of sight
      if ('inert' in HTMLElement.prototype) drawer.inert = !open;
      else $$('a', drawer).forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    }
  }
  setMenu(false);
  if (burger) burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  if (drawer) $$('a', drawer).forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ── services: interactive card deck ────────────────────────
     A physical stack of discipline cards. Tap / drag-swipe the front
     card, use the arrows, or click a dot to cycle. Each card is
     positioned from its --pos (0 = front); reordering the `order`
     array and re-rendering lets CSS animate the shuffle itself. */
  var deckStage = $('#deckStage');
  if (deckStage) {
    var dcardsE = $$('.deck__card', deckStage);
    var dN = dcardsE.length;
    var order = dcardsE.map(function (_, i) { return i; });   // front first
    var dots = $$('#deckDots .deck__dot');

    function deckRender() {
      order.forEach(function (cardIdx, pos) {
        var c = dcardsE[cardIdx];
        c.style.setProperty('--pos', pos);
        c.style.zIndex = String(dN - pos);
        c.classList.toggle('is-front', pos === 0);
        c.setAttribute('tabindex', pos === 0 ? '0' : '-1');
        c.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-on', i === order[0]);
        d.setAttribute('aria-pressed', i === order[0] ? 'true' : 'false');
      });
    }
    function deckNext() { order.push(order.shift()); deckRender(); }
    function deckPrev() { order.unshift(order.pop()); deckRender(); }
    function deckTo(cardIdx) {           // bring a specific card to front
      while (order[0] !== cardIdx) order.push(order.shift());
      deckRender();
    }

    var dn = $('.deck__btn[data-dnext]'), dp = $('.deck__btn[data-dprev]');
    if (dn) dn.addEventListener('click', deckNext);
    if (dp) dp.addEventListener('click', deckPrev);
    dots.forEach(function (d) { d.addEventListener('click', function () { deckTo(+d.dataset.dot); }); });

    // keyboard on the front card
    deckStage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); deckNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); deckPrev(); }
    });

    // tap + drag-swipe on the front card
    var dragging = false, moved = false, sx = 0, sy = 0, frontEl = null;
    deckStage.addEventListener('pointerdown', function (e) {
      var f = dcardsE[order[0]];
      if (!f.contains(e.target)) return;
      dragging = true; moved = false; sx = e.clientX; sy = e.clientY; frontEl = f;
      f.classList.add('is-drag');
      if (deckStage.setPointerCapture) { try { deckStage.setPointerCapture(e.pointerId); } catch (x) {} }
    });
    deckStage.addEventListener('pointermove', function (e) {
      if (!dragging || !frontEl) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
      frontEl.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) rotate(' + (dx * 0.04) + 'deg)';
    });
    function endDrag(e) {
      if (!dragging || !frontEl) return;
      dragging = false;
      var dx = (typeof e.clientX === 'number' ? e.clientX : sx) - sx,
          dy = (typeof e.clientY === 'number' ? e.clientY : sy) - sy;
      var dist = Math.hypot(dx, dy);
      frontEl.classList.remove('is-drag');   // re-enable transition
      frontEl.style.transform = '';          // clear inline → CSS --pos takes over (animates)
      if (dist < 6) deckNext();               // a tap
      else if (dist > 96) deckNext();         // a decisive swipe
      // else: released short — snaps back via the cleared transform
      frontEl = null;
    }
    deckStage.addEventListener('pointerup', endDrag);
    deckStage.addEventListener('pointercancel', endDrag);

    deckRender();
  }

  /* ── selected work: split feature ───────────────────────────
     Left is a dark image hero for the active project; right is a
     light panel with the project cards. Tabs filter the cards, card
     clicks / left arrows change the active project (crossfading the
     hero), and the small right arrows scroll the card strip. */
  var dcards = $$('.dcard');
  if (dcards.length) {
    var pdata = dcards.map(function (c) {
      return { el: c, cat: c.dataset.cat, title: c.dataset.title, meta: c.dataset.meta,
               desc: c.dataset.desc, img: c.dataset.img, srcset: c.dataset.srcset };
    });
    var pn = pdata.length;
    var strip = $('#dcards');
    var titleEl = $('#featTitle'), metaEl = $('#featMeta'), descEl = $('#featDesc'),
        fIdx = $('#featIdx'), fTotal = $('#featTotal'),
        bgA = $('#featBgA'), bgB = $('#featBgB');
    var fbehavior = reduced ? 'auto' : 'smooth';
    var fActive = -1, bgFlip = true, stripMoved = false, dnavRO = null;
    var visible = pdata.map(function (_, k) { return k; });

    // Warm the hero crossfades, but not while the page is still fetching what
    // is actually on screen — four full-size photographs at load time starve
    // the first paint. Wait for idle (or a beat) and only then prefetch.
    var warm = function () {
      pdata.forEach(function (d) {
        var im = new Image();
        if (d.srcset) { im.sizes = bgA ? bgA.sizes : '100vw'; im.srcset = d.srcset; }
        im.src = d.img;
      });
    };
    if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 3000 });
    else setTimeout(warm, 1600);

    /* srcset has to be set with src, or the candidate list still describes
       the previous project and the browser resolves the wrong file. */
    function paint(el, d) {
      if (d.srcset) el.setAttribute('srcset', d.srcset); else el.removeAttribute('srcset');
      el.src = d.img;
    }
    function crossfade(d) {
      if (!bgA || !bgB) return;
      if (reduced) { paint(bgA, d); bgA.classList.add('is-on'); bgB.classList.remove('is-on'); return; }
      var show = bgFlip ? bgB : bgA, hide = bgFlip ? bgA : bgB;
      var reveal = function () { show.classList.add('is-on'); hide.classList.remove('is-on'); };
      if (show.getAttribute('src') === d.img) reveal();
      else { show.onload = reveal; paint(show, d); }
      bgFlip = !bgFlip;
    }
    function pad(i) { return ('0' + (i + 1)).slice(-2); }
    function scrollToCard(i) {
      if (!strip) return;
      var c = pdata[i].el;
      var padL = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      strip.scrollTo({ left: Math.max(0, c.offsetLeft - strip.offsetLeft - padL), behavior: fbehavior });
    }
    function setActive(i, doScroll) {
      i = (i % pn + pn) % pn;
      fActive = i;
      var d = pdata[i];
      pdata.forEach(function (x, k) { x.el.classList.toggle('is-active', k === i); });
      if (titleEl) titleEl.textContent = d.title;
      if (metaEl) metaEl.textContent = d.meta;
      if (descEl) descEl.textContent = d.desc;
      // the counter reads against the filtered set, not the full four
      var seat = visible.indexOf(i);
      if (fIdx) fIdx.textContent = pad(seat === -1 ? i : seat);
      if (fTotal) fTotal.textContent = pad(visible.length - 1);
      crossfade(d);
      if (doScroll) scrollToCard(i);
    }

    // tabs — filter the card strip
    function setCat(cat, btn) {
      $$('.disc__tab').forEach(function (t) {
        t.classList.toggle('is-on', t === btn);
        t.setAttribute('aria-pressed', t === btn ? 'true' : 'false');
      });
      visible = [];
      pdata.forEach(function (x, k) {
        var show = (cat === 'all' || x.cat === cat);
        x.el.style.display = show ? '' : 'none';
        if (show) visible.push(k);
      });
      if (strip) strip.scrollTo({ left: 0, behavior: 'auto' });
      if (visible.length) setActive(visible[0], false);
      updateDnav();
    }
    $$('.disc__tab').forEach(function (t) {
      t.addEventListener('click', function () { setCat(t.dataset.cat, t); });
    });

    // card select
    $$('[data-sel]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (!stripMoved) setActive(+btn.dataset.sel, true); });
    });

    // left arrows — cycle the active project within the visible set
    function moveActive(dir) {
      var pos = visible.indexOf(fActive);
      if (pos === -1) { if (visible.length) setActive(visible[0], true); return; }
      var np = (pos + dir + visible.length) % visible.length;
      setActive(visible[np], true);
    }
    var fprev = $('[data-fprev]'), fnext = $('[data-fnext]');
    if (fnext) fnext.addEventListener('click', function () { moveActive(1); });
    if (fprev) fprev.addEventListener('click', function () { moveActive(-1); });

    // right small arrows — scroll the strip
    function stripStep() {
      var vis = pdata.filter(function (x) { return x.el.style.display !== 'none'; });
      if (vis.length < 2) return vis.length ? vis[0].el.offsetWidth : 220;
      return vis[1].el.offsetLeft - vis[0].el.offsetLeft;
    }
    var dprev = $('.dbtn[data-dprev]'), dnext = $('.dbtn[data-dnext]');
    /* The end-state is shown with aria-disabled, never the `disabled`
       property: the strip's scrollable extent is not final until the cards
       have laid out, and a real `disabled` set from that early, transient
       measurement cannot be clicked — so it could never heal itself. Left
       operable, a stale state costs at most one no-op scroll. */
    function setEnd(btn, atEnd) {
      if (!btn) return;
      btn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
      btn.classList.toggle('is-end', atEnd);
    }
    function updateDnav() {
      if (!strip) return;
      var maxL = strip.scrollWidth - strip.clientWidth;
      var padL = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
      setEnd(dprev, strip.scrollLeft <= padL + 2);
      setEnd(dnext, strip.scrollLeft >= maxL - 2 || maxL <= padL + 2);
    }
    if (dnext) dnext.addEventListener('click', function () { strip.scrollBy({ left: stripStep(), behavior: fbehavior }); });
    if (dprev) dprev.addEventListener('click', function () { strip.scrollBy({ left: -stripStep(), behavior: fbehavior }); });
    if (strip) {
      var dt = false;
      strip.addEventListener('scroll', function () {
        if (dt) return; dt = true; requestAnimationFrame(function () { dt = false; updateDnav(); });
      }, { passive: true });
    }
    window.addEventListener('resize', updateDnav);
    // The strip has no scrollable extent until its cards have laid out, and
    // neither scroll nor resize fires afterwards — so re-check as the strip
    // and its cards settle, or the arrows keep a stale end-state from load.
    window.addEventListener('load', updateDnav);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateDnav);
    if ('ResizeObserver' in window) {
      dnavRO = new ResizeObserver(updateDnav);
      dnavRO.observe(strip);
      pdata.forEach(function (x) { dnavRO.observe(x.el); });
    }
    $$('img', strip).forEach(function (im) {
      if (!im.complete) im.addEventListener('load', updateDnav, { once: true });
    });

    // drag-to-scroll the strip (mouse)
    if (strip && finePointer) {
      var d0 = false, dsx = 0, dsl = 0;
      strip.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        d0 = true; stripMoved = false; dsx = e.clientX; dsl = strip.scrollLeft;
        strip.classList.add('is-drag');
        if (strip.setPointerCapture) { try { strip.setPointerCapture(e.pointerId); } catch (x) {} }
      });
      strip.addEventListener('pointermove', function (e) {
        if (!d0) return;
        var dx = e.clientX - dsx;
        if (Math.abs(dx) > 4) stripMoved = true;
        strip.scrollLeft = dsl - dx;
      });
      var sUp = function () {
        if (!d0) return; d0 = false; strip.classList.remove('is-drag');
        setTimeout(function () { stripMoved = false; }, 40);
      };
      strip.addEventListener('pointerup', sUp);
      strip.addEventListener('pointercancel', sUp);
    }

    setActive(0, false);
    updateDnav();
  }

  /* ── process: 3D auto gallery (turntable) ───────────────────
     Cards fan out in perspective; the front one faces the viewer.
     The active index auto-advances one card at a time and bounces
     back at the ends (so it never jumps across the whole fan).
     Click a card, the arrows, the dots or the keyboard to steer;
     hovering or leaving the viewport pauses the auto-run. */
  var galStage = $('#galStage');
  if (galStage) {
    var gcards = $$('.gcard', galStage);
    var gdots  = $('#galDots');
    var n = gcards.length;
    var gActive = 0, dir = 1, timer = null, hovering = false, onScreen = false, galRO = null;
    var STEP = 2600;                 // ms between auto-advances
    var ANGLE = 20, MAXROT = 40;     // deg per step, clamp — gentle uniform tilt
    var DEPTH = 62;                  // px each step recedes — shallow, cards stay even

    function layout() {
      var cw = gcards[0].offsetWidth || 300;
      var gap = cw * 1.12;           // > card width → clear gap between cards

      /* The fan only ever grows to the right of the active card, so at
         phase 01 the left half of a wide stage sits empty. Slide the whole
         fan back toward the middle — as far as the stage has room for,
         which on a phone is barely at all, so the front card stays put
         there. The drift left-to-right then reads as progress through the
         four phases. */
      var stageW = galStage.offsetWidth || cw;
      var maxShift = Math.max(0, (stageW - cw) / 2 - 8);
      var fanOffset = ((n - 1) / 2 - gActive) * gap;
      var shift = Math.max(-maxShift, Math.min(maxShift, -fanOffset));

      gcards.forEach(function (c, i) {
        var o = i - gActive, ao = Math.abs(o);
        var rot = Math.max(-MAXROT, Math.min(MAXROT, -o * ANGLE));
        var x = o * gap + shift;
        var z = -ao * DEPTH;
        var s = o === 0 ? 1 : Math.max(0.9, 1 - ao * 0.03);
        c.style.transform = 'translate(-50%,-50%) translateX(' + x.toFixed(1) + 'px) translateZ(' +
          z.toFixed(1) + 'px) rotateY(' + rot.toFixed(1) + 'deg) scale(' + s.toFixed(3) + ')';
        c.style.zIndex = String(100 - ao);
        c.classList.toggle('is-front', o === 0);
      });
      if (gdots) $$('button', gdots).forEach(function (d, i) { d.classList.toggle('is-on', i === gActive); });
    }
    function go(k) { gActive = (k % n + n) % n; layout(); }

    // dots
    if (gdots) {
      gcards.forEach(function (c, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button'; b.setAttribute('aria-label', 'Go to phase ' + (i + 1));
        b.addEventListener('click', function () { go(i); restart(); });
        li.appendChild(b); gdots.appendChild(li);
      });
    }
    // click a card to bring it forward
    gcards.forEach(function (c, i) {
      c.addEventListener('click', function () { if (i !== gActive) { go(i); } restart(); });
    });
    // arrows
    var prev = $('[data-gprev]'), next = $('[data-gnext]');
    if (prev) prev.addEventListener('click', function () { go(gActive - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(gActive + 1); restart(); });
    // keyboard
    galStage.setAttribute('tabindex', '0');
    galStage.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(gActive + 1); restart(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(gActive - 1); restart(); }
    });

    // auto-advance (ping-pong), paused on hover / off-screen / reduced motion
    function tick() {
      if (gActive + dir > n - 1) dir = -1;
      else if (gActive + dir < 0) dir = 1;
      go(gActive + dir);
    }
    function running() { return !reduced && !hovering && onScreen; }
    function start() { if (timer || !running()) return; timer = setInterval(function () { if (running()) tick(); }, STEP); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var gal = $('#gal');
    (gal || galStage).addEventListener('mouseenter', function () { hovering = true; stop(); });
    (gal || galStage).addEventListener('mouseleave', function () { hovering = false; start(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { onScreen = en.isIntersecting; onScreen ? start() : stop(); });
      }, { threshold: 0.25 }).observe(galStage);
    } else { onScreen = true; start(); }

    layout();
    window.addEventListener('resize', layout);
    if ('ResizeObserver' in window) { galRO = new ResizeObserver(layout); galRO.observe(galStage); }
  }

  /* ── ambient video ────────────────────────────────────────────
     Each clip is muted, looping and inline, with no on-screen
     controls. It plays only while on screen (paused off-screen to
     spare battery) and never autoplays under reduced motion — the
     poster frame simply holds still instead. */
  $$('[data-vid]').forEach(function (wrap) {
    var v = $('video', wrap);
    if (!v) return;

    var inView = false;
    function wantPlay() { return inView && !reduced; }
    function tryPlay() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          inView = en.isIntersecting;
          if (inView) { if (wantPlay()) tryPlay(); } else { v.pause(); }
        });
      }, { threshold: 0.25 }).observe(v);
    } else { inView = true; if (wantPlay()) tryPlay(); }
  });

  /* ── interlude bands — gentle scroll drift ──────────────────
     The band image / video eases within its frame as it passes, so
     the interludes breathe. Subtle (±20px), rAF-throttled, off for
     reduced motion. The frames already hide the overscan (scale). */
  var driftEls = $$('.band__fig .media');
  if (driftEls.length && !reduced) {
    var dTick = false;
    function driftPaint() {
      dTick = false;
      var vh = window.innerHeight || 1;
      driftEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var prog = (r.top + r.height / 2 - vh / 2) / vh;   // -~ .. +~
        var y = Math.max(-20, Math.min(20, -prog * 22));
        // shift the crop window, not the element — no upscale, no softening
        el.style.objectPosition = '50% calc(50% + ' + y.toFixed(1) + 'px)';
      });
    }
    var driftReq = function () { if (!dTick) { dTick = true; requestAnimationFrame(driftPaint); } };
    window.addEventListener('scroll', driftReq, { passive: true });
    window.addEventListener('resize', driftReq, { passive: true });
    driftPaint();
  }

  /* ── nav scrollspy — subtle current-section marker ──────────*/
  var spyLinks = $$('.nav a');
  var map = {};
  spyLinks.forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#') { var sec = $(id); if (sec) map[id] = a; }
  });
  if (Object.keys(map).length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var link = map['#' + e.target.id];
        if (!link) return;
        spyLinks.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { spy.observe($(id)); });
  }
})();
