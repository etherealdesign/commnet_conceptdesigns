/* ============================================================
   COMMNET — motion + interaction system
   GSAP + ScrollTrigger + Lenis
   ============================================================ */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'power3.out';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ---------------------------------------------------------
     CONTENT — single source of truth
     --------------------------------------------------------- */
  const SOLUTIONS = [
    { t: 'Infrastructure Systems', img: 'infrastructure-fiber.jpg', d: 'Structured cabling, fibre backbones and ELV systems engineered as the physical foundation of the enterprise.', tags: ['FIBER', 'ELV', 'CABLING', 'NETWORK', 'DATA'], alt: 'Fibre optic cabling inside a data facility' },
    { t: 'Cyber Security', img: 'security-operations.jpg', d: 'Defence architecture, monitoring and response designed around how the organization actually operates.', tags: ['SOC', 'MONITORING', 'RESPONSE', 'GOVERNANCE'], alt: 'Analysts working in a security operations centre' },
    { t: 'Enterprise Systems', img: 'enterprise-systems.jpg', d: 'Compute, storage and data-centre environments built to scale with the business, not against it.', tags: ['DATA CENTRE', 'COMPUTE', 'STORAGE', 'CLOUD'], alt: 'Engineer working inside a data centre' },
    { t: 'Professional IT Services', img: 'professional-it.jpg', d: 'Consulting, deployment and managed support delivered by experienced engineering teams.', tags: ['CONSULTING', 'DEPLOYMENT', 'MANAGED', 'SUPPORT'], alt: 'Engineering team in a data centre' },
    { t: 'Security Systems', img: 'security-systems.jpg', d: 'Access control, surveillance and physical security integrated with the digital estate.', tags: ['ACCESS', 'CCTV', 'INTRUSION', 'INTEGRATION'], alt: 'Secure entrance to an enterprise facility' },
    { t: 'Power Solutions', img: 'power-infrastructure.jpg', d: 'Resilient power distribution, protection and continuity for critical facilities.', tags: ['UPS', 'DISTRIBUTION', 'CONTINUITY', 'PROTECTION'], alt: 'Engineer inspecting electrical distribution equipment' },
    { t: 'IoT', img: 'iot-smart-building.jpg', d: 'Connected sensing and building intelligence that turns physical space into usable data.', tags: ['SENSORS', 'SMART BUILDING', 'TELEMETRY', 'CONTROL'], alt: 'People moving through a smart building' },
    { t: 'AV Solutions', img: 'av-command-center.jpg', d: 'Command centres, auditoria and collaboration environments engineered for clarity.', tags: ['COMMAND', 'CONFERENCING', 'DISPLAY', 'ACOUSTICS'], alt: 'Engineers working in a command centre' },
    { t: 'Website Development', img: 'executive-glass.jpg', d: 'Corporate digital presence designed and built with the same rigour as the infrastructure beneath it.', tags: ['DESIGN', 'BUILD', 'CMS', 'PERFORMANCE'], alt: 'Executive standing near a glass wall' },
    { t: 'Software Development', img: 'professional-it.jpg', d: 'Custom applications and integrations that connect systems which were never meant to talk.', tags: ['APPLICATIONS', 'INTEGRATION', 'APIS', 'AUTOMATION'], alt: 'Engineering environment' },
    { t: 'Information Security', img: 'security-operations.jpg', d: 'Policy, assurance and controls that keep enterprise information defensible over time.', tags: ['POLICY', 'ASSURANCE', 'CONTROLS', 'AUDIT'], alt: 'Enterprise security environment' }
  ];

  const INDUSTRIES = [
    { t: 'Banking & Financial', img: 'executive-glass.jpg', d: 'Secure, resilient and audited environments for institutions where availability and integrity are non-negotiable.', m: 'RESILIENCE · COMPLIANCE · CONTINUITY' },
    { t: 'Energy & Utilities', img: 'energy-utilities.jpg', d: 'Infrastructure and control environments engineered for distributed, mission-critical operations.', m: 'OT/IT · MONITORING · POWER' },
    { t: 'Public Sector', img: 'av-command-center.jpg', d: 'Large-scale connected systems for civic and government programmes across the region.', m: 'SCALE · GOVERNANCE · INTEGRATION' },
    { t: 'Retail & eCommerce', img: 'iot-smart-building.jpg', d: 'Connected store, network and commerce infrastructure built for peak-load reality.', m: 'NETWORK · IOT · UPTIME' },
    { t: 'Technology Providers', img: 'enterprise-systems.jpg', d: 'Data-centre, deployment and delivery capability for technology companies scaling into new markets.', m: 'DATA CENTRE · DEPLOYMENT · SUPPORT' },
    { t: 'Private Workstations', img: 'professional-it.jpg', d: 'High-specification workplace technology environments for demanding professional teams.', m: 'WORKPLACE · AV · SECURITY' }
  ];

  const LOCATIONS = [
    { n: 'Dubai', r: 'Global Head Office', x: 185.8, y: 145, dx: 11, dy: -9, note: 'The global head office and centre of delivery for the Middle East region.', c: '25.20°N  55.27°E' },
    { n: 'Mumbai', r: 'Regional Office', x: 377.0, y: 196.6, dx: -11, dy: -8, anchor: 'end', note: 'Commercial and delivery presence in West India.', c: '19.08°N  72.88°E' },
    { n: 'Bangalore', r: 'Regional Office', x: 428.1, y: 248.3, dx: -11, dy: -8, anchor: 'end', note: 'Technology and software capability centre.', c: '12.97°N  77.59°E' },
    { n: 'Coimbatore', r: 'Regional Office', x: 421.3, y: 264.7, dx: -11, dy: 16, anchor: 'end', note: 'Engineering and support operations in South India.', c: '11.02°N  76.96°E' },
    { n: 'Chennai', r: 'Regional Office', x: 457.2, y: 247.4, dx: 11, dy: 4, note: 'Engineering and delivery operations in South India.', c: '13.08°N  80.27°E' },
    { n: 'Singapore', r: 'Regional Office', x: 712.2, y: 346.6, dx: 11, dy: 4, note: 'Delivery presence for South East Asia.', c: '1.35°N  103.82°E' }
  ];

  const QUOTES = [
    {
      q: 'Commnet approached our environment as one connected system rather than a set of separate projects. That changed the outcome entirely.',
      n: 'Client Reference', r: 'Head of Technology', c: 'Enterprise Client',
      img: 'infrastructure-fiber.jpg', ctx: 'Enterprise data-centre programme'
    },
    {
      q: 'The team delivered across infrastructure, security and support with a level of consistency that is rare at this scale.',
      n: 'Client Reference', r: 'Operations Director', c: 'Regional Organization',
      img: 'security-systems.jpg', ctx: 'Secured facility and managed support'
    },
    {
      q: 'Twenty-five years of experience shows in the detail — the planning, the execution and the handover were all precise.',
      n: 'Client Reference', r: 'Programme Manager', c: 'Public Programme',
      img: 'iot-smart-building.jpg', ctx: 'Multi-site smart building programme'
    }
  ];
  /* Replace the above with the supplied verbatim Commnet testimonials and real attributions. */

  const LOGOS = ['HUAWEI', 'CISCO', 'HPE', 'DELL TECHNOLOGIES', 'SCHNEIDER ELECTRIC', 'FORTINET', 'MICROSOFT', 'COMMSCOPE'];
  /* Placeholder wordmarks — swap for supplied monochrome SVG logo assets. */

  /* ---------------------------------------------------------
     SMOOTH SCROLL — Lenis synchronised to ScrollTrigger
     --------------------------------------------------------- */
  let lenis = null;
  if (!REDUCED && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.2 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  /* ---------------------------------------------------------
     TEXT SPLITTING — line-wrapped reveal (no dependency)
     --------------------------------------------------------- */
  function splitLines(el) {
    if (el.dataset.split === 'done') return $$('.word', el);
    const tmp = document.createElement('div');
    const chunks = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = '';
    chunks.forEach((chunk) => {
      tmp.innerHTML = chunk.trim();
      const line = document.createElement('span');
      line.className = 'split-line';
      tmp.textContent.split(/\s+/).filter(Boolean).forEach((w, i) => {
        if (i) line.appendChild(document.createTextNode(' '));
        const word = document.createElement('span');
        word.className = 'word';
        word.textContent = w;
        line.appendChild(word);
      });
      el.appendChild(line);
    });
    el.dataset.split = 'done';
    return $$('.word', el);
  }

  /* Line-masked, word-staggered reveal. */
  function revealSplit(el) {
    const words = splitLines(el);
    gsap.set(words, { yPercent: 116, opacity: 0 });
    gsap.to(words, {
      yPercent: 0, opacity: 1, duration: 1.15, ease: 'expo.out', stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 84%' }
    });
  }

  /* Wipe + settle: the frame opens while the photograph relaxes out of an
     over-scale. Both land together so the image never appears to "pop". */
  function revealImage(fig) {
    const img = fig.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 88%' } });
    tl.fromTo(fig,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'expo.out' }, 0);
    if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0);
    return tl;
  }

  /* Scroll-linked drift for figures in the vertical flow. */
  function parallaxImage(fig) {
    const img = fig.querySelector('img');
    if (!img) return;
    gsap.fromTo(img, { yPercent: -5 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     BUILD — solutions slides
     --------------------------------------------------------- */
  const track = $('#track');
  SOLUTIONS.forEach((s, i) => {
    const n = String(i + 1).padStart(2, '0');
    const el = document.createElement('article');
    el.className = 'slide';
    el.innerHTML =
      '<div class="slide__inner">' +
        '<div class="slide__text">' +
          '<p class="slide__no"><b>' + n + '</b> / 11</p>' +
          '<h3 class="slide__title">' + s.t + '</h3>' +
          '<p class="slide__desc">' + s.d + '</p>' +
          '<ul class="slide__tags">' + s.tags.map((t) => '<li>' + t + '</li>').join('') + '</ul>' +
        '</div>' +
        '<figure class="slide__fig fx fx--quiet" data-view>' +
          '<img src="Assets/' + s.img + '" alt="' + s.alt + '" loading="lazy" decoding="async" />' +
          '<span class="fx__stamp">' + n + '</span>' +
        '</figure>' +
      '</div>';
    track.appendChild(el);
  });

  /* ---------------------------------------------------------
     BUILD — industries
     --------------------------------------------------------- */
  const indNav = $('#indNav');
  INDUSTRIES.forEach((it, i) => {
    const li = document.createElement('li');
    li.className = i === 0 ? 'is-active' : '';
    li.innerHTML = '<button type="button" role="tab" aria-selected="' + (i === 0) + '"><i>' +
      String(i + 1).padStart(2, '0') + '</i>' + it.t + '</button>';
    li.querySelector('button').addEventListener('click', () => setIndustry(i));
    li.querySelector('button').addEventListener('mouseenter', () => setIndustry(i));
    indNav.appendChild(li);
  });

  const indImg = $('#indImg'), indTitle = $('#indTitle'), indDesc = $('#indDesc'), indMeta = $('#indMeta');
  const indNextName = $('#indNextName');
  $('#indNext').addEventListener('click', () => setIndustry((indActive + 1) % INDUSTRIES.length));
  let indActive = -1;
  function setIndustry(i) {
    if (i === indActive) return;
    indActive = i;
    const it = INDUSTRIES[i];
    indNextName.textContent = INDUSTRIES[(i + 1) % INDUSTRIES.length].t;
    $$('#indNav li').forEach((li, k) => {
      li.classList.toggle('is-active', k === i);
      li.querySelector('button').setAttribute('aria-selected', String(k === i));
    });
    const tl = gsap.timeline();
    tl.to([indTitle, indDesc, indMeta], { opacity: 0, y: -8, duration: 0.28, ease: 'power2.in' }, 0)
      .to(indImg, { opacity: 0, scale: 1.03, duration: 0.32, ease: 'power2.in' }, 0)
      .add(() => {
        indImg.src = 'Assets/' + it.img;
        indImg.alt = it.t;
        indTitle.textContent = it.t;
        indDesc.textContent = it.d;
        indMeta.textContent = it.m;
      })
      .to(indImg, { opacity: 1, scale: 1, duration: 0.75, ease: EASE })
      .to([indTitle, indDesc, indMeta], { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.05 }, '<0.05');
  }
  setIndustry(0);

  /* ---------------------------------------------------------
     BUILD — global map
     --------------------------------------------------------- */
  const pins = $('#pins'), locNav = $('#locNav');
  const NS = 'http://www.w3.org/2000/svg';
  LOCATIONS.forEach((l, i) => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'pin__g' + (i === 0 ? ' is-active' : ''));
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', l.n + ', ' + l.r);
    g.innerHTML =
      '<circle class="pin__halo" cx="' + l.x + '" cy="' + l.y + '" r="12"></circle>' +
      '<circle class="pin__dot" cx="' + l.x + '" cy="' + l.y + '" r="' + (i === 0 ? 4.5 : 3) + '"></circle>' +
      '<text x="' + (l.x + l.dx) + '" y="' + (l.y + l.dy) + '"' + (l.anchor ? ' text-anchor="end"' : '') + '>' + l.n.toUpperCase() + '</text>';
    g.addEventListener('mouseenter', () => setLocation(i));
    g.addEventListener('click', () => setLocation(i));
    g.addEventListener('focus', () => setLocation(i));
    pins.appendChild(g);

    const li = document.createElement('li');
    li.className = i === 0 ? 'is-active' : '';
    li.innerHTML = '<button type="button">' + l.n + '</button>';
    li.querySelector('button').addEventListener('click', () => setLocation(i));
    locNav.appendChild(li);
  });

  const locRole = $('#locRole'), locName = $('#locName'), locNote = $('#locNote'), locCoord = $('#locCoord');
  let locActive = -1;
  function setLocation(i) {
    if (i === locActive) return;
    locActive = i;
    const l = LOCATIONS[i];
    $$('#pins .pin__g').forEach((g, k) => g.classList.toggle('is-active', k === i));
    $$('#locNav li').forEach((li, k) => li.classList.toggle('is-active', k === i));
    gsap.fromTo([locRole, locName, locNote, locCoord],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.05, overwrite: true });
    locRole.textContent = l.r;
    locName.textContent = l.n;
    locNote.textContent = l.note;
    locCoord.textContent = l.c;
  }
  setLocation(0);

  /* ---------------------------------------------------------
     BUILD — logos + testimonials
     --------------------------------------------------------- */
  const mq = $('#mq');
  const logoSet = LOGOS.concat(LOGOS);
  logoSet.forEach((l) => { const s = document.createElement('span'); s.textContent = l; mq.appendChild(s); });


  /* ---------------------------------------------------------
     HERO — master entrance timeline
     --------------------------------------------------------- */
  /* hero headline: mask per line, animate per word */
  const heroWords = $$('.hero__title .line > span').flatMap((span) => {
    const words = span.textContent.trim().split(/\s+/);
    span.innerHTML = words.map((w) => '<span class="word">' + w + '</span>').join(' ');
    return $$('.word', span);
  });
  const heroImg = $('.hero__img');

  if (REDUCED) {
    gsap.set('[data-fade], [data-reveal]', { opacity: 1 });
  } else {
    gsap.set(heroWords, { yPercent: 118 });
    gsap.set('.nav__inner', { opacity: 0, y: -12 });
    gsap.set(heroImg, { scale: 1.12 });

    const intro = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });
    intro
      .to('.nav__inner', { opacity: 1, y: 0, duration: 1 }, 0)
      .to(heroImg, { scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .to('.hero .eyebrow', { opacity: 1, y: 0, duration: 0.9 }, 0.35)
      .to(heroWords, { yPercent: 0, duration: 1.35, stagger: 0.1, ease: 'expo.out' }, 0.4)
      .fromTo('.hero__sub', { y: 22 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
      .set('.hero__actions', { opacity: 1 }, 1.0)
      .fromTo('.hero__actions .btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, 1.0)
      .to('.hero__meta', { opacity: 1, duration: 1 }, 1.15);

    /* hero parallax */
    gsap.to(heroImg, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero__content, .hero__meta', {
      y: -40, opacity: 0.15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: true }
    });
  }

  /* ---------------------------------------------------------
     GENERIC REVEALS
     --------------------------------------------------------- */
  if (!REDUCED) {
    $$('[data-split]').forEach(revealSplit);

    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 26, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: EASE, stagger: 0.08, overwrite: true })
    });

    /* number counter for 25+ */
    const num = $('[data-split-chars]');
    if (num) {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 25, duration: 1.6, ease: 'power3.out',
        scrollTrigger: { trigger: num, start: 'top 80%' },
        onUpdate: () => { num.textContent = Math.round(obj.v) + '+'; }
      });
    }

    /* image reveals — every figure wipes open and settles out of over-scale */
    $$('.story figure, .ind__figure, .slide__fig').forEach(revealImage);

    /* vertical-flow figures also drift on scroll (horizontal-track figures
       get their own containerAnimation parallax in the matchMedia block) */
    $$('.story figure, .ind__figure').forEach(parallaxImage);

    /* CTA slow parallax */
    gsap.to('.cta__media img', {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    /* map arc drawing */
    gsap.to('.map__arcs path', {
      strokeDashoffset: 0, duration: 1.6, ease: 'power2.out', stagger: 0.12,
      scrollTrigger: { trigger: '.map', start: 'top 78%' }
    });

    /* logo marquee */
    const half = mq.scrollWidth / 2;
    gsap.to(mq, { x: -half, duration: 38, ease: 'none', repeat: -1 });

    /* footer landscape band — slow parallax on the closing frame */
    const fHero = $('.footer__hero img');
    if (fHero) {
      gsap.fromTo(fHero, { yPercent: -5 }, {
        yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: '.footer__hero', start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.fromTo(fHero, { scale: 1.14 }, {
        scale: 1, duration: 1.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer__hero', start: 'top 92%' }
      });
    }

    /* footer wordmark drift */
    gsap.fromTo('.footer__mark', { x: 60 }, {
      x: -60, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
    });
  } else {
    gsap.set('.map__arcs path', { strokeDashoffset: 0 });
  }

  /* ---------------------------------------------------------
     SOLUTIONS — pinned horizontal track (desktop / tablet)
     --------------------------------------------------------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
    const pin = $('#pin');
    const bar = $('#pBar');
    const from = $('#pFrom');
    const slides = $$('.slide');
    const distance = () => track.scrollWidth - window.innerWidth + 40;

    const st = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: () => '+=' + distance(),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
          const idx = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)));
          from.textContent = String(idx + 1).padStart(2, '0');
        }
      }
    });

    /* per-slide image parallax within the horizontal track */
    slides.forEach((s) => {
      gsap.fromTo(s.querySelector('img'), { yPercent: -4 }, {
        yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: s, containerAnimation: st, start: 'left right', end: 'right left', scrub: true }
      });
      gsap.fromTo(s.querySelector('.slide__text'), { opacity: 0.25, y: 24 }, {
        opacity: 1, y: 0, ease: 'power2.out',
        scrollTrigger: { trigger: s, containerAnimation: st, start: 'left 85%', end: 'left 45%', scrub: true }
      });
    });

    return () => st.kill();
  });

  /* ---------------------------------------------------------
     NAVIGATION — state change + mobile menu
     --------------------------------------------------------- */
  const nav = $('#nav');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => nav.classList.toggle('is-stuck', self.scroll() > 80)
  });

  const burger = $('#burger'), menu = $('#menu');
  let menuOpen = false;
  const menuTl = gsap.timeline({ paused: true })
    .set(menu, { pointerEvents: 'auto' })
    .to(menu, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.out' })
    .fromTo('.menu__list a span', { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, 0.15)
    .fromTo('.menu__foot', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.4);

  function toggleMenu(force) {
    menuOpen = typeof force === 'boolean' ? force : !menuOpen;
    burger.setAttribute('aria-expanded', String(menuOpen));
    menu.setAttribute('aria-hidden', String(!menuOpen));
    nav.classList.toggle('is-open', menuOpen);
    menu.classList.toggle('is-open', menuOpen);
    if (menuOpen) { menuTl.play(); if (lenis) lenis.stop(); }
    else { menuTl.reverse(); if (lenis) lenis.start(); }
  }
  burger.addEventListener('click', () => toggleMenu());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });

  /* anchor scrolling */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (menuOpen) toggleMenu(false);
      setTimeout(() => scrollTo(target), menuOpen ? 400 : 0);
    });
  });

  /* ---------------------------------------------------------
     TESTIMONIALS — image-led editorial slider

     One state (`qi`) drives the photograph, the quote, the
     attribution and the tab timer. A single <img> is swapped
     behind a curtain wipe, so the frame is never left empty.
     --------------------------------------------------------- */
  (function quotes() {
    const DURATION = 7;
    const section = $('#quotes');
    const grid = $('.quotes__grid');
    const img = $('#qImg'), curtain = $('#qCurtain');
    const ctx = $('#qCtx'), text = $('#qText'), name = $('#qName'), role = $('#qRole');
    const counter = $('#qCur'), tabsEl = $('#qTabs');
    let qi = -1, timer = null, paused = false;

    /* decode ahead of time so the swap never shows an unpainted frame */
    QUOTES.forEach((q) => { const p = new Image(); p.src = 'Assets/' + q.img; });

    QUOTES.forEach((q, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<button type="button" role="tab" aria-label="Testimonial ' + (i + 1) + '">' +
        '<span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="bar"><i></i></span></button>';
      li.querySelector('button').addEventListener('click', () => { go(i); restart(); });
      tabsEl.appendChild(li);
    });
    const bars = $$('#qTabs .bar i');

    function setCopy(q) {
      text.innerHTML = '&ldquo;' + q.q + '&rdquo;';
      name.textContent = q.n;
      role.textContent = q.r + ' · ' + q.c;
      ctx.textContent = q.ctx;
      delete text.dataset.split;
    }

    function go(i, dir) {
      i = (i + QUOTES.length) % QUOTES.length;
      if (i === qi) return;
      const first = qi === -1;
      const d = dir || (first ? 1 : (i > qi ? 1 : -1));
      qi = i;
      const q = QUOTES[i];

      counter.textContent = String(i + 1).padStart(2, '0');
      $$('#qTabs li').forEach((li, k) => li.classList.toggle('is-active', k === i));
      $$('#qTabs button').forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
      gsap.set(bars, { scaleX: 0 });

      if (first || REDUCED) {
        img.src = 'Assets/' + q.img;
        img.alt = q.ctx;
        setCopy(q);
        gsap.set([text, name, role, ctx], { opacity: 1, y: 0 });
        if (!REDUCED) {
          const words = splitLines(text);
          gsap.fromTo(words, { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.95, ease: 'expo.out', stagger: 0.022,
              scrollTrigger: { trigger: section, start: 'top 78%' } });
        }
        return;
      }

      /* photograph: curtain closes over the old frame, swaps, opens on the new */
      gsap.timeline()
        .set(curtain, { transformOrigin: d > 0 ? 'bottom' : 'top' })
        .to(curtain, { scaleY: 1, duration: 0.42, ease: 'power3.in' })
        .add(() => {
          img.src = 'Assets/' + q.img;
          img.alt = q.ctx;
          gsap.set(curtain, { transformOrigin: d > 0 ? 'top' : 'bottom' });
        })
        .to(curtain, { scaleY: 0, duration: 0.85, ease: 'expo.out' })
        .fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.4, ease: 'expo.out' }, '<');

      /* copy */
      gsap.timeline()
        .to([text, name, role], { opacity: 0, y: -10 * d, duration: 0.3, ease: 'power2.in' }, 0)
        .add(() => {
          setCopy(q);
          gsap.set(text, { opacity: 1, y: 0 });
          const words = splitLines(text);
          gsap.fromTo(words, { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.95, ease: 'expo.out', stagger: 0.022 });
        })
        .fromTo([name, role], { opacity: 0, y: 12 * d },
          { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.05 }, '<0.12');
    }

    /* autoplay — the active tab's bar IS the timer */
    function tick() {
      if (REDUCED) return;
      stop();
      timer = gsap.fromTo(bars[qi], { scaleX: 0 }, {
        scaleX: 1, duration: DURATION, ease: 'none',
        onComplete: () => { if (!paused) { go(qi + 1, 1); tick(); } }
      });
    }
    function stop() { if (timer) timer.kill(); }
    function restart() { stop(); tick(); }

    $('#qNext').addEventListener('click', () => { go(qi + 1, 1); restart(); });
    $('#qPrev').addEventListener('click', () => { go(qi - 1, -1); restart(); });

    /* pause while the reader is actually reading */
    ['mouseenter', 'focusin'].forEach((e) => section.addEventListener(e, () => { paused = true; if (timer) timer.pause(); }));
    ['mouseleave', 'focusout'].forEach((e) => section.addEventListener(e, () => { paused = false; if (timer) timer.resume(); }));

    /* horizontal drag / swipe across the spread */
    let downX = null;
    grid.addEventListener('pointerdown', (e) => { downX = e.clientX; });
    grid.addEventListener('pointerup', (e) => {
      if (downX === null) return;
      const dx = e.clientX - downX;
      downX = null;
      if (Math.abs(dx) < 60) return;
      go(qi + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      restart();
    });

    go(0, 1);
    ScrollTrigger.create({
      trigger: section, start: 'top 70%', end: 'bottom 20%',
      onEnter: tick, onEnterBack: tick, onLeave: stop, onLeaveBack: stop
    });
  })();

  /* ---------------------------------------------------------
     FORM
     --------------------------------------------------------- */
  (function form() {
    const f = $('#form'), msg = $('#formMsg');
    $$('.field input', f).forEach((i) => {
      i.addEventListener('focus', () => i.closest('.field').classList.add('is-focus'));
      i.addEventListener('blur', () => i.closest('.field').classList.remove('is-focus'));
    });
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      $$('input[required]', f).forEach((i) => {
        const bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        i.closest('.field').classList.toggle('is-error', bad);
        if (bad) ok = false;
      });
      msg.textContent = ok
        ? 'Thank you — your enquiry has been recorded. Connect this form to the Commnet endpoint to deliver it.'
        : 'Please complete the required fields.';
      msg.style.color = ok ? 'var(--accent)' : '#B42318';
    });
  })();

  /* ---------------------------------------------------------
     CURSOR + MAGNETIC BUTTONS (desktop, fine pointer only)
     --------------------------------------------------------- */
  if (!REDUCED && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cur = $('.cursor');
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    window.addEventListener('mousemove', (e) => {
      gsap.to(cur, { opacity: 1, duration: 0.3, overwrite: 'auto' });
      xTo(e.clientX - 6); yTo(e.clientY - 6);
    });
    $$('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', () => gsap.to(cur, { scale: 2.2, duration: 0.4, ease: EASE }));
      el.addEventListener('mouseleave', () => gsap.to(cur, { scale: 1, duration: 0.4, ease: EASE }));
    });
    $$('[data-view], .story figure').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cur.classList.add('is-view');
        gsap.to(cur, { scale: 4.4, duration: 0.5, ease: EASE });
      });
      el.addEventListener('mouseleave', () => {
        cur.classList.remove('is-view');
        gsap.to(cur, { scale: 1, duration: 0.5, ease: EASE });
      });
    });

    $$('.magnetic').forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.18);
        my((e.clientY - r.top - r.height / 2) * 0.28);
      });
      el.addEventListener('mouseleave', () => { mx(0); my(0); });
    });
  }

  /* ---------------------------------------------------------
     FOOTER — live head-office clock, year, back to top
     --------------------------------------------------------- */
  (function footer() {
    const clock = $('#dxbTime');
    if (clock) {
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false
      });
      const paint = () => { clock.textContent = fmt.format(new Date()); };
      paint();
      setInterval(paint, 20000);
    }

    const yr = $('#yr');
    if (yr) yr.textContent = String(new Date().getFullYear());

    const top = $('#toTop');
    if (top) top.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ---------------------------------------------------------
     REFRESH after images settle
     --------------------------------------------------------- */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
