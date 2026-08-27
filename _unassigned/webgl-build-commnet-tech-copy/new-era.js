/* ============================================================
   COMMNET — NEW ERA

   The page is not a stack of sections. It is one environment
   with ten stations laid out in depth, and one camera that
   travels a spline through them. Scroll position IS the
   camera's position on that spline.

   One renderer. One scene. One camera. Nothing is created or
   destroyed between stations — the world simply arrives.

   All business content is the existing Commnet content.
   ============================================================ */
(function () {
  'use strict';

  var T = window.THREE;
  gsap.registerPlugin(ScrollTrigger);

  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var SMALL = matchMedia('(max-width:900px)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var smooth = function (e0, e1, x) { var t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------------------------------------------------------
     CONTENT — the existing Commnet site, unchanged
     --------------------------------------------------------- */
  /* Content below is Commnet Technology Services (Chennai), taken from the
     twelve service lines, five disciplines and six industries the company
     publishes. The visual keys — f, v, ac, a2, img — are unchanged, so every
     scene renders exactly as before. */

  var SOLUTIONS = [
    { t: 'MANAGED SECURITY<br>& SERVICES', f: 'shell', v: 'shield', ac: '#FF6B5E', a2: '#FF9F43',
      g: ['MONITORING', 'RESPONSE', 'MANAGED'],
      d: 'Security monitored and operated as a service, not handed over as a box and left to the client.' },
    { t: 'SYSTEM<br>INTEGRATION', f: 'lattice', v: 'orbit', ac: '#3155FF', a2: '#22D3C5',
      g: ['INTEGRATION', 'RETAIL', 'MANUFACTURING'],
      d: 'Making systems that were never designed to talk to each other work as one estate.' },
    { t: 'DATA CENTRE<br>INFRASTRUCTURE', f: 'tower', v: 'strata', ac: '#2563EB', a2: '#7C3AED',
      g: ['RACKS', 'CONTAINMENT', 'COOLING'],
      d: 'Data centre builds and refurbishments — racks, containment, power and cooling as one design.' },
    { t: 'SYSTEMS &<br>NETWORKING', f: 'lattice', v: 'blocks', ac: '#22D3C5', a2: '#3155FF',
      g: ['SWITCHING', 'ROUTING', 'WIRELESS'],
      d: 'Switching, routing and wireless engineered for the traffic the business actually carries.' },
    { t: 'HELP DESK &<br>CALL CENTRE', f: 'signal', v: 'net', ac: '#A3E635', a2: '#22D3C5',
      g: ['24-7', 'SUPPORT', 'ESCALATION'],
      d: 'Support that answers around the clock, with escalation into the same team that built the system.' },
    { t: 'DATA STORAGE<br>& SECURITY', f: 'shell', v: 'shield', ac: '#FF9F43', a2: '#FF6B5E',
      g: ['STORAGE', 'BACKUP', 'RECOVERY'],
      d: 'Storage, backup and recovery designed for how long the business can actually be down.' },
    { t: 'SOFTWARE<br>SOLUTIONS', f: 'signal', v: 'net', ac: '#3155FF', a2: '#7C3AED',
      g: ['APPLICATIONS', 'APIS', 'AUTOMATION'],
      d: 'Applications and integrations written against the infrastructure they have to run on.' },
    { t: 'SITE &<br>POWER', f: 'tower', v: 'stream', ac: '#A3E635', a2: '#22D3C5',
      g: ['UPS', 'DISTRIBUTION', 'CONTINUITY'],
      d: 'Site preparation, distribution and continuity — the layer everything else assumes is there.' },
    { t: 'CLOUD &<br>HOSTING', f: 'lattice', v: 'orbit', ac: '#7C3AED', a2: '#3155FF',
      g: ['CLOUD', 'HOSTING', 'MIGRATION'],
      d: 'Hosting and migration decided on cost and control, not on which platform is fashionable.' },
    { t: 'LOW VOLTAGE<br>& AUDIO-VISUAL', f: 'signal', v: 'stream', ac: '#7C3AED', a2: '#FF6B5E',
      g: ['ELV', 'CONFERENCING', 'SIGNAGE'],
      d: 'ELV, conferencing and signage — command rooms and meeting rooms that work first time.' },
    { t: 'MAINTENANCE &<br>OPERATIONS', f: 'shell', v: 'shield', ac: '#FF6B5E', a2: '#7C3AED',
      g: ['SLA', 'OUTSOURCING', 'UPKEEP'],
      d: 'Ongoing upkeep and outsourced operations for estates that cannot be left to drift.' },
    { t: 'POWER<br>GENERATORS', f: 'tower', v: 'blocks', ac: '#22D3C5', a2: '#A3E635',
      g: ['GENERATORS', 'STANDBY', 'FUEL'],
      d: 'Standby generation sized, installed and tested against the load it will really carry.' }
  ];

  var INDUSTRIES = [
    { t: 'GOVERNMENT &<br>SMART CITY', img: 'av-command-center.jpg', d: 'Surveillance, traffic and command centres at city scale.', m: 'SCALE / GOVERNANCE / INTEGRATION' },
    { t: 'RETAIL', img: 'iot-smart-building.jpg', d: 'POS, integration and store-estate networking across dispersed sites.', m: 'NETWORK / POS / UPTIME' },
    { t: 'MANUFACTURING', img: 'enterprise-systems.jpg', d: 'Plant power, continuity and connected operations on the factory floor.', m: 'OT-IT / POWER / CONTINUITY' },
    { t: 'HEALTHCARE', img: 'professional-it.jpg', d: 'Records, storage security and always-on support where downtime is clinical risk.', m: 'RECORDS / SECURITY / 24-7' },
    { t: 'TRANSPORT &<br>MOBILITY', img: 'security-operations.jpg', d: 'ITMS, ATMS, ANPR and red-light enforcement across road networks.', m: 'ITMS / ANPR / ENFORCEMENT' },
    { t: 'ENERGY &<br>UTILITIES', img: 'energy-utilities.jpg', d: 'Smart metering, generation and site resilience for distributed assets.', m: 'METERING / GENERATION / RESILIENCE' }
  ];

  /* One country, one office. The scene reads these as points on the globe, so
     the list is the real footprint rather than a padded one. */
  var OFFICES = [
    { n: 'CHENNAI', r: 'HEAD OFFICE', lat: 13.08, lon: 80.27, hq: 1 }
  ];

  /* Placeholder, as in every other Commnet build: anonymised references
     standing in for the real quotes. No client was invented. Replace with the
     supplied verbatim testimonials and real attributions before launch. */
  var QUOTES = [
    { q: 'Commnet took on the parts of our estate nobody else wanted to own, and then kept owning them.', a: 'CLIENT REFERENCE / HEAD OF IT / MANUFACTURING', img: 'infrastructure-fiber.jpg' },
    { q: 'One team designed it, built it and still answers the phone about it. That is the whole value.', a: 'CLIENT REFERENCE / OPERATIONS DIRECTOR / RETAIL GROUP', img: 'security-systems.jpg' },
    { q: 'Ten years in, the things they installed first are the things we have never had to think about.', a: 'CLIENT REFERENCE / FACILITIES LEAD / HEALTHCARE', img: 'iot-smart-building.jpg' }
  ];

  var INSIGHTS = [
    { t: 'TWELVE SERVICE LINES,<br>FIVE DISCIPLINES', d: 'ONE ACCOUNTABLE TEAM', img: 'enterprise-systems.jpg' },
    { t: 'SMART CITY, ITMS<br>AND VIDEO ANALYTICS', d: 'INTELLIGENT TECHNOLOGY', img: 'security-operations.jpg' }
  ];

  var YEAR_STATES = ['YEARS', '10 YEARS', '10+ YEARS, 24-7 SUPPORT'];

  /* ---------------------------------------------------------
     COLOUR GRADE
     One grade per station: key light, rim light, atmosphere.
     The interface stays monochrome — all colour lives in the
     world and in the light it throws onto the frame.
     --------------------------------------------------------- */
  var GRADE = [
    { key: 0x2ED8F0, rim: 0xFF7A2F, fog: 0x05080C, fov: 30, c1: '#22D3EE', c2: '#F97316', i: 0.62 },
    { key: 0x8B6CF7, rim: 0x35D0C4, fog: 0x07060C, fov: 38, c1: '#8B5CF6', c2: '#2DD4BF', i: 0.5 },
    { key: 0xFFB067, rim: 0x3FA9F5, fog: 0x0B0703, fov: 26, c1: '#FB923C', c2: '#38BDF8', i: 0.58 },
    { key: 0x3B82F6, rim: 0xE8EDF5, fog: 0x04060D, fov: 42, c1: '#3B82F6', c2: '#A78BFA', i: 0.46 },
    { key: 0x2DD4BF, rim: 0xFF8A4C, fog: 0x03090A, fov: 34, c1: '#2DD4BF', c2: '#FB923C', i: 0.5 },
    { key: 0x22D3EE, rim: 0x9B7CFF, fog: 0x03070C, fov: 30, c1: '#22D3EE', c2: '#818CF8', i: 0.6 },
    { key: 0xE0489A, rim: 0x2FC7E8, fog: 0x0A040A, fov: 40, c1: '#EC4899', c2: '#22D3EE', i: 0.44 },
    { key: 0xFFC178, rim: 0x4A8CF0, fog: 0x0A0705, fov: 36, c1: '#FBBF24', c2: '#3B82F6', i: 0.42 },
    { key: 0x9B7CFF, rim: 0xFF6B6B, fog: 0x07050C, fov: 28, c1: '#A78BFA', c2: '#F87171', i: 0.66 },
    { key: 0x4C8DF6, rim: 0x2DD4BF, fog: 0x04060B, fov: 44, c1: '#60A5FA', c2: '#2DD4BF', i: 0.4 }
  ];

  /* ---------------------------------------------------------
     SCROLL
     --------------------------------------------------------- */
  var lenis = null;
  if (!REDUCED && window.Lenis) {
    /* a single wheel gesture should cover roughly one station, not three */
    lenis = new Lenis({ duration: 1.15, smoothWheel: true,
      wheelMultiplier: 0.8, touchMultiplier: 1.2 });
    lenis.on('scroll', function () { ScrollTrigger.update(); armSnap(); });
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  var NS = 10;                 /* stations */
  var progress = 0;            /* 0..1 along the whole journey */
  function readScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
  }
  /* ---------------------------------------------------------
     STATION SNAP
     Each station is a resting place. A fast flick would otherwise
     leave the camera parked between two scenes with both half
     faded — once the scroll settles we ease to the nearest one.
     --------------------------------------------------------- */
  var snapTimer = null, snapping = false;
  function armSnap() {
    if (snapping || REDUCED) return;
    clearTimeout(snapTimer);
    snapTimer = setTimeout(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      var pos = (window.scrollY / max) * (NS - 1);
      var target = clamp(Math.round(pos), 0, NS - 1);
      var drift = Math.abs(pos - target);
      if (drift < 0.015) return;
      var y = (target / (NS - 1)) * max;
      snapping = true;
      if (lenis) lenis.scrollTo(y, { duration: 0.55 + drift * 0.7,
        onComplete: function () { snapping = false; } });
      else { window.scrollTo({ top: y, behavior: 'smooth' }); snapping = false; }
      setTimeout(function () { snapping = false; }, 1400);
    }, 170);
  }

  function goStation(i) {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = (i / (NS - 1)) * max;
    snapping = true;
    if (lenis) lenis.scrollTo(y, { duration: 1.6, onComplete: function () { snapping = false; } });
    else window.scrollTo({ top: y, behavior: 'smooth' });
    setTimeout(function () { snapping = false; }, 2200);
  }

  /* =========================================================
     THE ENVIRONMENT
     ========================================================= */
  /* per-station aim bias — negative x puts the object right of frame */
  var LOOKX = [0, 5, 0, -13, 0, -17, 0, 9, -13, 4];
  var LOOKY = [0, -3, 0, 2, -2, 3, 0, -3, 2, 0];
  var GAP = 150;
  var stationZ = function (i) { return -i * GAP; };

  var renderer, scene, camera, world, envMap;
  var keyLight, rimLight, fillLight;
  var frontRenderer, frontScene, fKey, fRim;
  var pathCurve, lookCurve;
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  var loader = T ? new T.TextureLoader() : null;

  function buildEnvironment() {
    var canvas = $('#stage');
    renderer = new T.WebGLRenderer({ canvas: canvas, antialias: !SMALL, alpha: false,
      powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, SMALL ? 1.5 : 1.85));
    renderer.setClearColor(0x030303, 1);
    if (T.SRGBColorSpace) renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    scene = new T.Scene();
    scene.fog = new T.FogExp2(0x030303, 0.0086);

    camera = new T.PerspectiveCamera(38, 1, 0.5, 1900);

    /* environment map: three soft panels in a dark room.
       No external HDR, no examples/ dependency. */
    var envScene = new T.Scene();
    envScene.background = new T.Color(0x040405);
    /* a coloured studio: cool key wall, warm bounce, violet ceiling.
       Everything metal in the scene reflects this. */
    [[0x9fd8ee, 2.1, -8, 5, -6, 18, 16],
     [0xff9a55, 1.2, 10, 1, -5, 14, 12],
     [0x8f7dff, 0.8, 0, 9, 4, 22, 10],
     [0xffffff, 0.5, 0, -9, 6, 22, 8]].forEach(function (p) {
      var m = new T.Mesh(new T.PlaneGeometry(p[5], p[6]), new T.MeshBasicMaterial({ color: p[0] }));
      m.material.color.multiplyScalar(p[1]);
      m.position.set(p[2], p[3], p[4]);
      m.lookAt(0, 0, 0);
      envScene.add(m);
    });
    var pmrem = new T.PMREMGenerator(renderer);
    envMap = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    pmrem.dispose();

    /* lighting: one key, one rim, a breath of ambient */
    keyLight = new T.DirectionalLight(0x2ED8F0, 3.1); keyLight.position.set(-16, 20, 12); scene.add(keyLight);
    rimLight = new T.DirectionalLight(0xFF7A2F, 2.2); rimLight.position.set(18, -7, -16); scene.add(rimLight);
    fillLight = new T.PointLight(0x8B6CF7, 220, 260); fillLight.position.set(6, -10, 20); scene.add(fillLight);
    scene.add(new T.AmbientLight(0x1a2230, 0.4));

    world = new T.Group();
    scene.add(world);

    /* the camera's route: a spline threaded through the stations,
       drifting laterally so travel reads as travel */
    /* Four control points per station describe one continuous move:
       approach wide → swing around the object → pass through it →
       fall away behind it. The look-curve holds the object in frame
       while the position curve orbits, so the camera behaves like a
       camera rather than a slider. */
    /* Each station gets a stand-off distance matched to how large its
       object actually is — the ring, the network and the CTA core need
       room, the flat panels do not. */
    var STANDOFF = [1, 1, 1.5, 1.15, 1, 4.0, 1.1, 1, 1.7, 1];
    var pts = [], look = [];
    for (var i = 0; i < NS; i++) {
      var z = stationZ(i), c = z - 26, D = STANDOFF[i];
      var side = i % 2 ? 1 : -1;
      var r = (30 + (i % 3) * 7) * D;
      pts.push(new T.Vector3(side * r * 0.7, (8 + Math.sin(i) * 5) * D, z + 46 * D));
      pts.push(new T.Vector3(side * r, (-4 + Math.cos(i * 1.4) * 6) * D, z + 14 * D));
      pts.push(new T.Vector3(side * 5 * D, (2 + Math.sin(i * 2.1) * 3) * D, z - 14 * D));
      pts.push(new T.Vector3(-side * r * 0.55, (-7 + Math.cos(i) * 4) * D, z - 44 * D));
      look.push(new T.Vector3(0, 0, c + 6));
      look.push(new T.Vector3(0, 0, c));
      look.push(new T.Vector3(0, 0, c - 10));
      look.push(new T.Vector3(-side * 6, 0, c - 46));
    }
    pathCurve = new T.CatmullRomCurve3(pts, false, 'catmullrom', 0.4);
    lookCurve = new T.CatmullRomCurve3(look, false, 'catmullrom', 0.4);

    /* ---- foreground pass ----
       A second, deliberately tiny scene: a handful of structural
       members that live closer to the camera than the type layer.
       Same camera, transparent canvas, drawn above the words. */
    frontRenderer = new T.WebGLRenderer({ canvas: $('#stageFront'), antialias: !SMALL, alpha: true });
    frontRenderer.setPixelRatio(Math.min(devicePixelRatio, SMALL ? 1.5 : 1.85));
    frontRenderer.setClearAlpha(0);
    if (T.SRGBColorSpace) frontRenderer.outputColorSpace = T.SRGBColorSpace;
    frontRenderer.toneMapping = T.ACESFilmicToneMapping;

    frontScene = new T.Scene();
    frontScene.environment = envMap;
    frontScene.fog = new T.FogExp2(0x030303, 0.0086);
    fKey = new T.DirectionalLight(0x2ED8F0, 3.4); fKey.position.set(-16, 20, 12); frontScene.add(fKey);
    fRim = new T.DirectionalLight(0xFF7A2F, 2.6); fRim.position.set(18, -7, -16); frontScene.add(fRim);
    frontScene.add(new T.AmbientLight(0x1a2230, 0.5));

    /* One member per station, not a thicket. It has to read as a
       structural element passing the camera, never as scratches. */
    var fmat = metal(0x4a525e, 0.16, 1.0);
    for (var fi = 0; fi < NS; fi += 2) {
      var bar = new T.Mesh(new T.BoxGeometry(150, 0.9, 2.2), fmat);
      /* held to the middle band: it may cross the headline,
         never the corners where the micro type lives */
      bar.position.set(Math.sin(fi * 2.1) * 12,
                       -1 + Math.cos(fi * 1.4) * 4,
                       stationZ(fi) + 2);
      bar.rotation.z = Math.sin(fi * 0.9) * 0.13;
      bar.rotation.y = Math.cos(fi * 0.7) * 0.24;
      frontScene.add(bar);
    }

    /* the one emissive member — it crosses the wordmark */
    var thread = new T.Mesh(new T.BoxGeometry(300, 0.3, 0.3),
      new T.MeshBasicMaterial({ color: 0xf04a50, transparent: true }));
    thread.position.set(0, 0, stationZ(0) + 5);
    frontScene.add(thread);
    hero.thread = thread;

    resize();
    addEventListener('resize', resize);
    if (FINE) addEventListener('mousemove', function (e) {
      pointer.tx = (e.clientX / innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });
  }

  function resize() {
    var w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    if (frontRenderer) frontRenderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 52 : 38;
    camera.updateProjectionMatrix();
  }

  /* machined metal: a clearcoat over the base gives the lacquered
     edge you get on milled aluminium and black chrome */
  function metal(col, rough, metalness) {
    return new T.MeshPhysicalMaterial({
      color: col,
      roughness: rough === undefined ? 0.32 : rough,
      metalness: metalness === undefined ? 0.96 : metalness,
      clearcoat: 0.55, clearcoatRoughness: 0.22,
      envMapIntensity: 1.7
    });
  }
  /* frosted structural glass. Iridescence carries colour across the
     surface as the camera moves — cheaper than transmission and it
     reads as coated optical glass rather than plastic. */
  function glass(col, op) {
    return new T.MeshPhysicalMaterial({
      color: col, roughness: 0.06, metalness: 0.08, transparent: true,
      opacity: op, envMapIntensity: 3.0, depthWrite: false,
      iridescence: 1, iridescenceIOR: 1.6, iridescenceThicknessRange: [140, 520]
    });
  }
  /* additive quad standing in for bloom — the UMD three build has no
     EffectComposer, so light is drawn rather than post-processed */
  function bloomQuad(size, color, opacity) {
    var c = document.createElement('canvas');
    c.width = c.height = 128;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,.32)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    var tex = new T.CanvasTexture(c);
    var m = new T.Mesh(new T.PlaneGeometry(size, size), new T.MeshBasicMaterial({
      map: tex, color: color, transparent: true, opacity: opacity,
      blending: T.AdditiveBlending, depthWrite: false, depthTest: false
    }));
    return m;
  }
  function hairline(op, col) {
    return new T.LineBasicMaterial({ color: col || 0x8FD4E8, transparent: true, opacity: op });
  }

  /* =========================================================
     00 — ARRIVAL. An enormous engineered assembly; the camera
     sits inside its envelope so only a fragment is in frame.
     ========================================================= */
  var hero = {};
  function buildHero() {
    var g = new T.Group();
    g.position.z = stationZ(0) - 26;

    var RINGS = SMALL ? 5 : 8, PER = SMALL ? 26 : 42;
    var mesh = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), metal(0x14161a, 0.3, 0.98), RINGS * PER);
    var d = new T.Object3D(), k = 0;
    for (var r = 0; r < RINGS; r++) {
      var rad = 16 + r * 7.5, tilt = r * 0.14;
      for (var i = 0; i < PER; i++) {
        var a = (i / PER) * Math.PI * 2 + r * 0.22;
        d.position.set(Math.cos(a) * rad, Math.sin(a) * rad * 0.72, Math.sin(a * 2 + r) * 5 - r * 6);
        d.rotation.set(tilt, a, a * 0.5);
        d.scale.set(0.8 + (i % 3) * 0.5, 0.55, 3 + (i % 5) * 2.6);
        d.updateMatrix();
        mesh.setMatrixAt(k++, d.matrix);
      }
    }
    g.add(mesh);

    var sparMat = metal(0x1b1e23, 0.22, 1.0);
    for (var s = 0; s < 7; s++) {
      var spar = new T.Mesh(new T.BoxGeometry(150, 0.7, 1.6), sparMat);
      spar.position.set(0, -14 + s * 5.4, -6 - s * 3.4);
      spar.rotation.z = (s - 3) * 0.045;
      g.add(spar);
    }

    var bladeMat = glass(0x8fa8c8, 0.13);
    for (var b = 0; b < 5; b++) {
      var blade = new T.Mesh(new T.PlaneGeometry(70, 26), bladeMat);
      blade.position.set(Math.sin(b * 1.7) * 16, Math.cos(b * 1.2) * 11, -18 - b * 9);
      blade.rotation.set(0.1 * b, 0.32 * b, 0.06 * b);
      g.add(blade);
    }

    /* internal illumination: cyan running lines and one warm core */
    var glowMat = function (c) { return new T.MeshBasicMaterial({ color: c, transparent: true }); };
    var fil = new T.Mesh(new T.BoxGeometry(120, 0.14, 0.14), glowMat(0x3EE8FF));
    fil.position.set(0, 6.5, -3);
    g.add(fil);
    for (var e = 0; e < 4; e++) {
      var edge = new T.Mesh(new T.BoxGeometry(0.1, 0.1, 46), glowMat(e % 2 ? 0xFF8A3D : 0x3EE8FF));
      edge.position.set(Math.cos(e * 1.9) * 21, Math.sin(e * 1.9) * 15, -14 - e * 5);
      edge.material.opacity = 0.75;
      g.add(edge);
      var bq = bloomQuad(26, e % 2 ? 0xFF8A3D : 0x3EE8FF, 0.32);
      bq.position.copy(edge.position);
      g.add(bq);
      hero.blooms = hero.blooms || [];
      hero.blooms.push(bq);
    }
    var core = bloomQuad(90, 0x2ED8F0, 0.22);
    core.position.set(0, 4, -34);
    g.add(core);
    hero.core = core;

    hero.g = g; hero.fil = fil;
    world.add(g);
  }

  /* =========================================================
     01 — POSITION. Layered slabs the camera passes between.
     ========================================================= */
  var slabs = [];
  function buildSlabs() {
    var g = new T.Group();
    g.position.z = stationZ(1) - 20;
    var mat = metal(0x101317, 0.34, 0.95);
    for (var i = 0; i < 9; i++) {
      var m = new T.Mesh(new T.BoxGeometry(120, 0.5, 34), mat);
      m.position.set((i % 2 ? 1 : -1) * (6 + i * 2.4), -18 + i * 4.6, -i * 9);
      m.rotation.z = (i - 4) * 0.02;
      m.rotation.y = (i - 4) * 0.03;
      g.add(m); slabs.push(m);
    }
    world.add(g); slabs.g = g;
  }

  /* =========================================================
     02 — DURATION. An architectural ring flown through.
     ========================================================= */
  var monolith = {};
  function buildMonolith() {
    var g = new T.Group();
    g.position.z = stationZ(2) - 24;
    var torus = new T.Mesh(new T.TorusGeometry(30, 3.6, 12, 96), metal(0x15181d, 0.26, 1.0));
    g.add(torus);
    var inner = new T.Mesh(new T.TorusGeometry(22, 0.5, 8, 96), metal(0x2a2f36, 0.5, 0.9));
    inner.rotation.x = 0.4; g.add(inner);

    var fins = new T.InstancedMesh(new T.BoxGeometry(1.1, 9, 2.4), metal(0x1c2026, 0.3, 1.0), 48);
    var d = new T.Object3D();
    for (var i = 0; i < 48; i++) {
      var a = (i / 48) * Math.PI * 2;
      d.position.set(Math.cos(a) * 30, Math.sin(a) * 30, 0);
      d.rotation.set(0, 0, a);
      d.updateMatrix(); fins.setMatrixAt(i, d.matrix);
    }
    g.add(fins);
    monolith.g = g; monolith.torus = torus; monolith.inner = inner;
    world.add(g);
  }

  /* =========================================================
     03 — SOLUTIONS. One persistent system that re-forms.
     ========================================================= */
  var sys = { n: SMALL ? 420 : 900 };
  function formation(kind, n) {
    var out = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var x, y, z, t = i / n;
      if (kind === 'lattice') {
        var gx = i % 30, gy = Math.floor(i / 30) % 30, gz = Math.floor(i / 900);
        x = (gx - 14.5) * 2.6; y = (gy - 14.5) * 2.0; z = -gz * 16 - t * 26;
      } else if (kind === 'shell') {
        var ph = Math.acos(1 - 2 * t), th = Math.PI * (1 + Math.sqrt(5)) * i, rr = 26 + (i % 3) * 1.6;
        x = Math.cos(th) * Math.sin(ph) * rr;
        y = Math.sin(th) * Math.sin(ph) * rr;
        z = Math.cos(ph) * rr;
      } else if (kind === 'tower') {
        var lev = Math.floor(t * 26), per = n / 26, j = i % per;
        var a2 = (j / per) * Math.PI * 2, rad = 17 - lev * 0.32;
        x = Math.cos(a2) * rad; y = lev * 2.6 - 34; z = Math.sin(a2) * rad;
      } else {
        var lane = i % 9;
        x = (lane - 4) * 7.2 + Math.sin(t * 40 + lane) * 2.2;
        y = Math.cos(t * 26 + lane * 1.3) * 12;
        z = -t * 150 + 40;
      }
      out[i * 3] = x; out[i * 3 + 1] = y; out[i * 3 + 2] = z;
    }
    return out;
  }
  function buildSystem() {
    var n = sys.n;
    sys.cur = formation('lattice', n).slice(0);
    sys.tgt = formation('lattice', n);
    var mesh = new T.InstancedMesh(new T.BoxGeometry(0.9, 0.9, 0.9), metal(0x232830, 0.22, 1.0), n);
    mesh.frustumCulled = false;
    var g = new T.Group();
    g.position.z = stationZ(3) - 30;
    g.add(mesh);
    world.add(g);
    sys.mesh = mesh; sys.g = g;
  }

  /* =========================================================
     04 — INDUSTRIES. The Slipstream card stream is a DOM system
     driven by IndustrySlipstream, initialised below. The Three.js
     world at this station is kept intentionally empty — the card
     system is the visual centrepiece.
     ========================================================= */
  function buildIndustries() {
    /* The IndustrySlipstream controller is built after the deck
       block — it is initialised at the same time as the deck. */
  }
  function loadPanel() {} /* stub — superseded by generative system */

  /* =========================================================
     05 — GLOBAL NETWORK. An abstract spherical lattice.
     ========================================================= */
  var net = { marks: [], arcs: [] };
  function buildNetwork() {
    var g = new T.Group();
    g.position.z = stationZ(5) - 26;
    var R = 24;

    var n = SMALL ? 900 : 2200;
    var pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var t = i / n, ph = Math.acos(1 - 2 * t), th = Math.PI * (1 + Math.sqrt(5)) * i;
      pos[i * 3] = Math.cos(th) * Math.sin(ph) * R;
      pos[i * 3 + 1] = Math.cos(ph) * R;
      pos[i * 3 + 2] = Math.sin(th) * Math.sin(ph) * R;
    }
    var pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(pos, 3));
    g.add(new T.Points(pg, new T.PointsMaterial({
      color: 0x9FE4F5, size: 0.2, transparent: true, opacity: 0.75, depthWrite: false })));

    for (var m = 0; m < 12; m++) {
      var pts = [];
      for (var s = 0; s <= 48; s++) {
        var a = (s / 48) * Math.PI - Math.PI / 2, b = (m / 12) * Math.PI * 2;
        pts.push(new T.Vector3(Math.cos(a) * Math.cos(b) * R, Math.sin(a) * R, Math.cos(a) * Math.sin(b) * R));
      }
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), hairline(0.2)));
    }

    /* atmosphere: a soft body of light behind the sphere so it reads
       as a planet-scale object rather than a wire diagram */
    var atm = bloomQuad(112, 0x2FBFE0, 0.2);
    atm.position.set(0, 0, -6);
    g.add(atm);
    net.atm = atm;

    net.toVec = function (lat, lon, r) {
      var ph = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
      return new T.Vector3(-(r * Math.sin(ph) * Math.cos(th)), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th));
    };

    OFFICES.forEach(function (o) {
      var p = net.toVec(o.lat, o.lon, R * 1.01);
      var dot = new T.Mesh(new T.SphereGeometry(0.26, 14, 14),
        new T.MeshBasicMaterial({ color: o.hq ? 0xFF8A3D : 0x3EE8FF }));
      dot.position.copy(p);
      var bq = bloomQuad(5.5, o.hq ? 0xFF8A3D : 0x3EE8FF, 0.5);
      bq.position.copy(p);
      g.add(dot); g.add(bq);
      net.marks.push({ dot: dot, bloom: bq, on: 0 });
    });

    for (var i2 = 1; i2 < OFFICES.length; i2++) {
      var a2 = net.toVec(OFFICES[0].lat, OFFICES[0].lon, R);
      var b2 = net.toVec(OFFICES[i2].lat, OFFICES[i2].lon, R);
      var mid = a2.clone().add(b2).multiplyScalar(0.5).normalize()
        .multiplyScalar(R + a2.distanceTo(b2) * 0.45);
      var pts2 = new T.QuadraticBezierCurve3(a2, mid, b2).getPoints(64);
      g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts2), hairline(0.34)));
      var pulse = new T.Line(new T.BufferGeometry().setFromPoints([pts2[0], pts2[1]]),
        new T.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
      g.add(pulse);
      net.arcs.push({ pts: pts2, line: pulse, t: Math.random(), idx: i2 });
    }
    net.g = g;
    world.add(g);
  }

  /* =========================================================
     06–09 — testimony, insights, invitation, contact
     ========================================================= */
  var quotePanel, insPanels = [], ctaObj = {}, ctcLines;

  function buildQuote() {
    var g = new T.Group();
    g.position.z = stationZ(6) - 30;
    quotePanel = new T.Mesh(new T.PlaneGeometry(150, 84),
      new T.MeshBasicMaterial({ color: 0x0a0b0d, transparent: true, opacity: 0 }));
    quotePanel.position.set(0, 0, -14);
    g.add(quotePanel);
    world.add(g);
  }

  function buildInsights() {
    var g = new T.Group();
    g.position.z = stationZ(7) - 24;
    INSIGHTS.forEach(function (it, i) {
      var m = new T.Mesh(new T.PlaneGeometry(104, 62),
        new T.MeshBasicMaterial({ color: 0x0a0b0d, transparent: true, opacity: 0 }));
      m.position.set(i ? -18 : 18, i ? -6 : 6, -i * 8);
      m.rotation.y = i ? 0.2 : -0.2;
      g.add(m); insPanels.push(m);
    });
    world.add(g); insPanels.g = g;
  }

  function buildCta() {
    var g = new T.Group();
    g.position.z = stationZ(8) - 28;
    var core = new T.Mesh(new T.IcosahedronGeometry(17, 1), metal(0x0d1016, 0.2, 1.0));
    var cage = new T.Mesh(new T.IcosahedronGeometry(25, 1),
      new T.MeshBasicMaterial({ color: 0xA78BFA, wireframe: true, transparent: true, opacity: 0.2 }));
    var halo = bloomQuad(120, 0xA78BFA, 0.3);
    halo.position.set(0, 0, -12);
    g.add(core); g.add(cage); g.add(halo);
    ctaObj.halo = halo;
    ctaObj.g = g; ctaObj.core = core; ctaObj.cage = cage;
    world.add(g);
  }

  function buildContact() {
    var g = new T.Group();
    g.position.z = stationZ(9) - 30;
    var pts = [];
    for (var i = 0; i < 26; i++) {
      var y = -30 + i * 2.4;
      pts.push(new T.Vector3(-90, y, -i * 2), new T.Vector3(90, y, -i * 2));
    }
    g.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(pts), hairline(0.1)));
    ctcLines = g;
    world.add(g);
  }

  /* =========================================================
     DOM SCENE LAYERS
     ========================================================= */
  var scenes = [];
  function prepScenes() {
    $$('.sc').forEach(function (el, i) {
      scenes.push({ el: el, i: i, shown: false });
    });
  }

  function driveScenes(p) {
    var pos = p * (NS - 1);
    for (var i = 0; i < scenes.length; i++) {
      var s = scenes[i];
      var d = pos - i;
      var ad = Math.abs(d);
      /* A long crisp plateau (72% of each station's travel at full
         opacity) and a short, steep crossfade — so two scenes are
         never both legible at once, and neither is ever a smear. */
      var a = 1 - smooth(0.36, 0.54, ad);
      var on = a > 0.004;
      if (on !== s.shown) {
        s.el.classList.toggle('on', on);
        s.shown = on;
      }
      if (!on) { s.el.style.opacity = 0; continue; }
      s.el.style.opacity = a;
      var z = -d * 300, yy = d * -42;
      /* blur only once the copy is genuinely leaving */
      var bl = clamp((ad - 0.36) * 14, 0, 3.4);
      s.el.style.transform = 'translate3d(0,' + yy.toFixed(1) + 'px,' + z.toFixed(0) + 'px)';
      s.el.style.filter = bl > 0.12 ? 'blur(' + bl.toFixed(2) + 'px)' : '';
    }
    var idx = clamp(Math.round(pos), 0, NS - 1);
    var hs = $('#hudScene');
    if (hs && hs.textContent !== pad(idx + 1)) hs.textContent = pad(idx + 1);
  }

  /* =========================================================
     PER-STATION STATE
     ========================================================= */
  var solIdx = -1, indIdx = -1, netIdx = -1, insIdx = -1, qIdx = -1, yrIdx = -1;
  var netTarget = { x: 0, y: 0 };

  function swapLines(host, html) {
    var build = function () {
      host.innerHTML = html.split(/<br\s*\/?>/i).map(function (l) {
        return '<span class="ty__l"><span>' + l + '</span></span>';
      }).join('');
      return $$('.ty__l > span', host);
    };
    if (REDUCED) { build(); return; }
    var old = $$('.ty__l > span', host);
    gsap.killTweensOf(old);
    gsap.to(old, { yPercent: -112, duration: 0.42, ease: 'power3.in', stagger: 0.04,
      onComplete: function () {
        var fresh = build();
        gsap.fromTo(fresh, { yPercent: 114 },
          { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07 });
      } });
  }

  function setSolution(i) {
    if (i === solIdx) return;
    solIdx = i;
    var s = SOLUTIONS[i];
    sys.tgt = formation(s.f, sys.n);
    $('#solN').textContent = pad(i + 1);
    $('#solD').textContent = s.d;
    swapLines($('#solT'), s.t);
    if (deck.cards.length) paintDeck();
  }

  function setIndustry(i) {
    if (i === indIdx) return;
    indIdx = i;
    var it = INDUSTRIES[i];
    /* animated number transition */
    var nb = $('#indN');
    if (nb) {
      if (!REDUCED) {
        gsap.killTweensOf(nb);
        gsap.fromTo(nb, { opacity: 0, y: -7 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', overwrite: true,
          onStart: function () { nb.textContent = pad(i + 1); } });
      } else { nb.textContent = pad(i + 1); }
    }
    /* description + metadata — restrained opacity slide */
    var dd = $('#indD'), dm = $('#indM');
    if (dd) {
      if (!REDUCED) gsap.fromTo(dd, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', overwrite: true,
        onStart: function () { dd.textContent = it.d; } });
      else dd.textContent = it.d;
    }
    if (dm) {
      if (!REDUCED) gsap.fromTo(dm, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.06, overwrite: true,
        onStart: function () { dm.textContent = it.m; } });
      else dm.textContent = it.m;
    }
    swapLines($('#indT'), it.t);
    /* notify the slipstream controller so the active card highlights */
    if (typeof ind !== 'undefined' && ind.setActive) ind.setActive(i);
  }


  function setOffice(i) {
    if (i === netIdx) return;
    netIdx = i;
    var o = OFFICES[i];
    var p = net.toVec(o.lat, o.lon, 1);
    netTarget.y = Math.atan2(-p.x, p.z);
    netTarget.x = Math.atan2(p.y, Math.hypot(p.x, p.z)) * 0.8;
    $$('#glbNav li').forEach(function (li, k) { li.classList.toggle('on', k === i); });
    $('#glbR').textContent = o.r;
    $('#glbC').textContent = o.n;
    $('#glbX').textContent = o.lat.toFixed(2) + '°N  ' + o.lon.toFixed(2) + '°E';
    if (!REDUCED) gsap.fromTo([$('#glbR'), $('#glbC'), $('#glbX')], { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.05, overwrite: true });
  }

  function setQuote(i) {
    i = (i + QUOTES.length) % QUOTES.length;
    if (i === qIdx) return;
    qIdx = i;
    var q = QUOTES[i];
    if (quotePanel) loadPanel(quotePanel, q.img, 0x3a3d42);
    $('#qN').textContent = pad(i + 1);
    $('#qA').textContent = q.a;
    swapLines($('#qT'), '“' + q.q + '”');
  }

  function setInsight(i) {
    if (i === insIdx) return;
    insIdx = i;
    var it = INSIGHTS[i];
    loadPanel(insPanels[i], it.img);
    $('#insD').textContent = it.d;
    swapLines($('#insT'), it.t);
  }

  function setYear(i) {
    if (i === yrIdx) return;
    yrIdx = i;
    var el = $('#yrCap');
    if (REDUCED) { el.textContent = YEAR_STATES[i]; return; }
    gsap.timeline()
      .to(el, { opacity: 0, y: -8, duration: 0.22, ease: 'power2.in' })
      .add(function () { el.textContent = YEAR_STATES[i]; })
      .fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }

  /* =========================================================
     THE LOOP
     ========================================================= */
  var tPrev = 0, camPos, camLook, dummy;
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - tPrev) / 1000) || 0.016;
    tPrev = now;
    var s = 1 - Math.exp(-dt * 3.4);
    var tt = now * 0.001;

    readScroll();
    var p = progress, pos = p * (NS - 1);

    /* camera travels the spline */
    pointer.x = lerp(pointer.x, pointer.tx, s);
    pointer.y = lerp(pointer.y, pointer.ty, s);
    /* Map station index straight onto curve parameter. getPointAt()
       is arc-length based, so uneven stand-off distances would slide
       the camera out of sync with the copy — getPoint() with an
       explicit index keeps station N framed on scene N. */
    var ct = clamp((4 * pos + 1.5) / (4 * NS - 1), 0, 1);
    pathCurve.getPoint(ct, camPos);
    /* The camera flies the spline, but it always keeps the current
       subject framed — a spline for the aim as well let the object
       drift out of shot on the wider stand-offs. */
    var s0 = clamp(Math.floor(pos), 0, NS - 1);
    var s1 = clamp(s0 + 1, 0, NS - 1);
    var sf = smooth(0, 1, pos - s0);
    /* aim bias pushes each object off-centre, away from the side the
       copy occupies, so every frame is a composition rather than a
       centred product shot */
    camLook.set(lerp(LOOKX[s0], LOOKX[s1], sf), lerp(LOOKY[s0], LOOKY[s1], sf),
      lerp(stationZ(s0) - 26, stationZ(s1) - 26, sf));
    camera.position.set(
      camPos.x + pointer.x * 4.6 + Math.sin(tt * 0.21) * 1.5,
      camPos.y - pointer.y * 3.0 + Math.cos(tt * 0.17) * 1.1,
      camPos.z + Math.sin(tt * 0.13) * 2.2
    );
    camera.lookAt(camLook.x + pointer.x * 1.6, camLook.y - pointer.y * 1.0, camLook.z);
    camera.rotation.z = pointer.x * 0.012 + Math.sin(tt * 0.09) * 0.006;

    /* focal length, light colour and atmosphere all move with the camera */
    applyGrade(pos, s, tt);

    if (hero.g) {
      if (hero.core) { hero.core.quaternion.copy(camera.quaternion); }
      if (hero.blooms) hero.blooms.forEach(function (b) { b.quaternion.copy(camera.quaternion); });
      hero.g.rotation.z += dt * 0.028;
      hero.g.rotation.x = Math.sin(tt * 0.11) * 0.06;
      hero.fil.material.opacity = 0.55 + Math.sin(tt * 1.6) * 0.35;
    }

    if (slabs.g) {
      slabs.g.rotation.y = Math.sin(tt * 0.09) * 0.14;
      for (var i = 0; i < slabs.length; i++) {
        slabs[i].position.x += (Math.sin(tt * 0.2 + i) * 3 - slabs[i].position.x) * dt * 0.6;
      }
    }

    if (monolith.g) {
      monolith.torus.rotation.z += dt * 0.06;
      monolith.inner.rotation.z -= dt * 0.13;
      monolith.g.rotation.y = Math.sin(tt * 0.08) * 0.2;
      setYear(clamp(Math.floor(clamp(pos - 1.5, 0, 0.999) * 3), 0, 2));
    }

    if (sys.mesh) {
      var near = Math.abs(pos - 3) < 1.4;
      if (near || Math.abs(pos - 3) < 2.2) {
        var ease = dt * (near ? 2.4 : 0.9), k = sys.mesh.count;
        for (var q = 0; q < k; q++) {
          var o = q * 3;
          sys.cur[o] += (sys.tgt[o] - sys.cur[o]) * ease;
          sys.cur[o + 1] += (sys.tgt[o + 1] - sys.cur[o + 1]) * ease;
          sys.cur[o + 2] += (sys.tgt[o + 2] - sys.cur[o + 2]) * ease;
          dummy.position.set(sys.cur[o], sys.cur[o + 1], sys.cur[o + 2]);
          dummy.rotation.set(tt * 0.1 + q, tt * 0.07 + q * 0.3, 0);
          dummy.updateMatrix();
          sys.mesh.setMatrixAt(q, dummy.matrix);
        }
        sys.mesh.instanceMatrix.needsUpdate = true;
      }
      sys.g.rotation.y = Math.sin(tt * 0.06) * 0.12;
    }

    /* IndustrySlipstream — driven by its own controller */
    if (typeof ind !== 'undefined' && ind.update) ind.update(dt, tt, pos);


    if (net.g) {
      if (net.atm) net.atm.quaternion.copy(camera.quaternion);
      net.g.rotation.y += (netTarget.y - net.g.rotation.y) * s * 0.6 + dt * 0.02;
      net.g.rotation.x += (netTarget.x - net.g.rotation.x) * s * 0.6;
      net.marks.forEach(function (m, k3) {
        m.on += ((k3 === netIdx ? 1 : 0) - m.on) * dt * 3;
        m.dot.scale.setScalar(1 + m.on * 2.2);
        m.bloom.scale.setScalar(1 + m.on * 2.6);
        m.bloom.material.opacity = 0.28 + m.on * 0.5;
        m.bloom.quaternion.copy(camera.quaternion);
      });
      net.arcs.forEach(function (a) {
        a.t += dt * 0.17; if (a.t > 1.3) a.t = 0;
        var h = clamp(a.t, 0, 1);
        var i0 = Math.max(0, Math.floor((h - 0.09) * 64));
        var i1 = Math.min(63, Math.floor(h * 64));
        a.line.geometry.setFromPoints([a.pts[i0], a.pts[i1]]);
        a.line.material.opacity = Math.sin(h * Math.PI) * (a.idx === netIdx ? 1 : 0.5);
        a.line.material.color.set(a.idx === netIdx ? 0xf04a50 : 0xffffff);
      });
    }

    if (quotePanel) {
      var want6 = Math.abs(pos - 6) < 1.1 ? 0.55 : 0;
      quotePanel.material.opacity += (want6 - quotePanel.material.opacity) * dt * 2.4;
      quotePanel.position.x = Math.sin(tt * 0.07) * 6;
      quotePanel.position.y = Math.cos(tt * 0.05) * 3;
    }

    if (insPanels.g) {
      if (Math.abs(pos - 7) < 1.4) setInsight(clamp((pos - 6.5) / 1.0, 0, 0.9999) < 0.5 ? 0 : 1);
      insPanels.forEach(function (m, k4) {
        m.material.opacity += ((k4 === insIdx ? 0.9 : 0) - m.material.opacity) * dt * 3;
        m.position.y += ((k4 ? -6 : 6) + Math.sin(tt * 0.12 + k4) * 3 - m.position.y) * dt * 1.2;
      });
    }

    if (ctaObj.g) {
      ctaObj.core.rotation.y += dt * 0.05;
      ctaObj.core.rotation.x += dt * 0.02;
      ctaObj.cage.rotation.y -= dt * 0.09;
      var e8 = 1 - clamp(Math.abs(pos - 8), 0, 1);
      ctaObj.core.scale.setScalar(0.55 + e8 * 0.55);
      ctaObj.cage.material.opacity = 0.05 + e8 * 0.2;
      ctaObj.halo.quaternion.copy(camera.quaternion);
      ctaObj.halo.material.opacity = 0.1 + e8 * 0.34;
    }

    if (ctcLines) ctcLines.rotation.x = Math.sin(tt * 0.05) * 0.06;

    updateDeck(dt, tt, pos);

    /* the technical grid surfaces only between stations */
    var frac = Math.abs((pos % 1) - 0.5) * 2;
    $('#grid').style.opacity = (0.9 - frac * 0.9).toFixed(3);

    if (hero.thread) hero.thread.material.opacity = 0.5 + Math.sin(tt * 1.6) * 0.35;

    driveScenes(p);
    renderer.render(scene, camera);
    frontRenderer.render(frontScene, camera);
  }

  /* =========================================================
     GRADE — focal length, light colour, atmosphere, spill
     ========================================================= */
  var cA = null, cB = null, glowEl = null, baseFov = 38;
  function applyGrade(pos, s, tt) {
    if (!cA) { cA = new T.Color(); cB = new T.Color(); glowEl = $('#glow'); }
    var i0 = clamp(Math.floor(pos), 0, NS - 1);
    var i1 = clamp(i0 + 1, 0, NS - 1);
    var f = clamp(pos - i0, 0, 1);
    var a = GRADE[i0], b = GRADE[i1];

    /* focal length — wide when travelling, long when arriving */
    var wantFov = lerp(a.fov, b.fov, f) * (innerWidth / innerHeight < 1 ? 1.4 : 1);
    baseFov += (wantFov - baseFov) * s * 0.5;
    if (Math.abs(camera.fov - baseFov) > 0.01) {
      camera.fov = baseFov;
      camera.updateProjectionMatrix();
    }

    cA.setHex(a.key).lerp(cB.setHex(b.key), f);
    keyLight.color.copy(cA);
    keyLight.intensity = 2.6 + Math.sin(tt * 0.4) * 0.25;
    cA.setHex(a.rim).lerp(cB.setHex(b.rim), f);
    rimLight.color.copy(cA);
    cA.setHex(a.c1).lerp(cB.setHex(b.c1), f);
    fillLight.color.copy(cA);

    /* lights answer the pointer, so reflections move when you do */
    keyLight.position.set(-16 + pointer.x * 9, 20 - pointer.y * 8, camera.position.z - 4);
    rimLight.position.set(18 + pointer.x * 7, -7 - pointer.y * 5, camera.position.z - 34);
    fillLight.position.set(pointer.x * 14, -pointer.y * 10, camera.position.z - 18);

    cA.setHex(a.fog).lerp(cB.setHex(b.fog), f);
    scene.fog.color.copy(cA);
    renderer.setClearColor(cA, 1);
    if (frontScene) {
      frontScene.fog.color.copy(cA);
      fKey.color.copy(keyLight.color);
      fRim.color.copy(rimLight.color);
      fKey.position.copy(keyLight.position);
      fRim.position.copy(rimLight.position);
    }

    /* the same light spilling onto the frame */
    var st = glowEl.style;
    st.setProperty('--c1', f < 0.5 ? a.c1 : b.c1);
    st.setProperty('--c2', f < 0.5 ? a.c2 : b.c2);
    st.setProperty('--i', (lerp(a.i, b.i, f) * (0.72 + Math.sin(tt * 0.23) * 0.12)).toFixed(3));
    st.setProperty('--x1', (26 + pointer.x * 14 + Math.sin(tt * 0.19) * 6).toFixed(1) + '%');
    st.setProperty('--y1', (34 + pointer.y * 10 + Math.cos(tt * 0.15) * 5).toFixed(1) + '%');
    st.setProperty('--x2', (74 + pointer.x * 10).toFixed(1) + '%');
    st.setProperty('--y2', (68 + pointer.y * 8).toFixed(1) + '%');
  }

  /* =========================================================
     INTERFACE
     ========================================================= */
  /* =========================================================
     THE DECK

     A spatial deck of eleven cards. Every card carries its own
     generative composition drawn on a 2D canvas — no photography,
     no icons. One continuous `cur` value drives every transform,
     so dragging, arrows, keyboard and scroll all feed the same
     number and the motion is never stepped.
     ========================================================= */

  /* ---------------------------------------------------------
     GENERATIVE SYSTEMS
     Six compositions, each a small autonomous system. Signature:
       make(ctx, w, h, accent) -> draw(t, act, px, py)
       act  0..1  how alive the composition is (1 = active card)
       px/py -1..1 pointer, for perspective and attraction
     --------------------------------------------------------- */
  var VIZ = {};

  function hexRGB(h) {
    h = h.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  var INK = [247, 247, 243];

  /* Shared ground for every card: a graded colour field with two
     drifting light sources and a faint measuring grid. This is where
     the colour lives — the geometry drawn on top stays disciplined. */
  function field(x, w, h, c1, c2, t, act, px, py) {
    x.clearRect(0, 0, w, h);

    var base = x.createLinearGradient(0, 0, w * 0.4, h);
    base.addColorStop(0, 'rgba(20,23,30,1)');
    base.addColorStop(1, 'rgba(8,9,12,1)');
    x.fillStyle = base;
    x.fillRect(0, 0, w, h);

    var k = 0.35 + act * 0.65;
    var b1x = w * (0.28 + Math.sin(t * 0.22) * 0.12) + px * 22;
    var b1y = h * (0.26 + Math.cos(t * 0.18) * 0.09) + py * 16;
    var g1 = x.createRadialGradient(b1x, b1y, 0, b1x, b1y, w * 0.92);
    g1.addColorStop(0, rgba(c1, 0.42 * k));
    g1.addColorStop(0.42, rgba(c1, 0.12 * k));
    g1.addColorStop(1, rgba(c1, 0));
    x.fillStyle = g1; x.fillRect(0, 0, w, h);

    var b2x = w * (0.76 + Math.cos(t * 0.16) * 0.14) - px * 18;
    var b2y = h * (0.52 + Math.sin(t * 0.21) * 0.1) - py * 12;
    var g2 = x.createRadialGradient(b2x, b2y, 0, b2x, b2y, w * 0.78);
    g2.addColorStop(0, rgba(c2, 0.34 * k));
    g2.addColorStop(0.5, rgba(c2, 0.08 * k));
    g2.addColorStop(1, rgba(c2, 0));
    x.fillStyle = g2; x.fillRect(0, 0, w, h);

    /* measuring grid — the engineering under the colour */
    x.strokeStyle = rgba(INK, 0.05);
    x.lineWidth = 1;
    var step = w / 7;
    for (var i = 1; i < 7; i++) {
      x.beginPath(); x.moveTo(i * step, 0); x.lineTo(i * step, h); x.stroke();
    }
    for (var j = 1; j < 9; j++) {
      var yy = (h / 9) * j;
      x.beginPath(); x.moveTo(0, yy); x.lineTo(w, yy); x.stroke();
    }
  }

  /* orbit — bodies on inclined rings, lit from two sides */
  VIZ.orbit = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var bodies = [];
    for (var i = 0; i < 3; i++) bodies.push({ r: 0.2 + i * 0.13, s: 0.5 + i * 0.35, tilt: 0.3 + i * 0.22, sz: 9 - i * 2 });
    var dust = [];
    for (var d = 0; d < 54; d++) dust.push({ a: Math.random() * 6.283, r: 0.1 + Math.random() * 0.46, v: 0.1 + Math.random() * 0.3 });
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var cx = w * 0.5, cy = h * 0.36, R = Math.min(w, h);
      var tiltX = 0.34 + py * 0.16;

      bodies.forEach(function (b, i) {
        x.beginPath();
        for (var k = 0; k <= 72; k++) {
          var a = (k / 72) * 6.283 + px * 0.3;
          var rx = Math.cos(a) * R * b.r, ry = Math.sin(a) * R * b.r * tiltX * (b.tilt + 0.4);
          k ? x.lineTo(cx + rx, cy + ry) : x.moveTo(cx + rx, cy + ry);
        }
        x.strokeStyle = i === 1 ? rgba(c2, 0.5 + act * 0.35) : rgba(INK, 0.16 + act * 0.12);
        x.lineWidth = i === 1 ? 1.4 : 1;
        x.stroke();

        var ang = t * b.s * (0.25 + act * 0.55) + i * 2.1 + px * 0.4;
        var bx = cx + Math.cos(ang) * R * b.r;
        var by = cy + Math.sin(ang) * R * b.r * tiltX * (b.tilt + 0.4);
        var col = i === 2 ? c2 : c1;
        var g = x.createRadialGradient(bx - b.sz * 0.35, by - b.sz * 0.45, 0, bx, by, b.sz * 3);
        g.addColorStop(0, rgba(INK, 0.85));
        g.addColorStop(0.28, rgba(col, 0.7 + act * 0.3));
        g.addColorStop(1, rgba(col, 0));
        x.fillStyle = g;
        x.beginPath(); x.arc(bx, by, b.sz * 3, 0, 6.283); x.fill();
      });

      dust.forEach(function (p) {
        var a = p.a + t * p.v * (0.2 + act * 0.5);
        var rr = R * p.r;
        var dx = cx + Math.cos(a) * rr + px * 14 * p.r;
        var dy = cy + Math.sin(a) * rr * tiltX + py * 10 * p.r;
        x.fillStyle = rgba(INK, 0.22 + act * 0.3);
        x.fillRect(dx, dy, 1.4, 1.4);
      });
    };
  };

  /* blocks — an isometric structure that assembles and lets go */
  VIZ.blocks = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var cols = 3, rows = 7, parts = [];
    for (var cx0 = 0; cx0 < cols; cx0++) {
      for (var cz = 0; cz < cols; cz++) {
        var stack = 2 + Math.floor(Math.random() * rows);
        for (var s = 0; s < stack; s++) {
          parts.push({ c: cx0, z: cz, s: s, o: Math.random() * 6.283, d: Math.random() });
        }
      }
    }
    /* far blocks first so the near ones overlap correctly */
    parts.sort(function (a, b) { return (a.z + a.c) - (b.z + b.c) || a.s - b.s; });
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var uw = Math.min(w, h) * 0.135, uh = uw * 0.56, lift = uw * 0.5;
      var ox = w * 0.5 + px * 8, oy = h * 0.46 + py * 6;

      parts.forEach(function (p) {
        var settle = 0.5 + 0.5 * Math.sin(t * 0.32 + p.o);
        var float = (1 - act) * 8 + settle * (3 + p.d * 9) * (0.3 + act * 0.7);
        /* isometric projection */
        var bx = ox + (p.c - p.z) * uw;
        var by = oy + (p.c + p.z) * uh * 0.5 - p.s * lift - float - rows * lift * 0.3;
        var top = p.s / rows;

        /* top face carries the light */
        x.beginPath();
        x.moveTo(bx, by);
        x.lineTo(bx + uw, by + uh * 0.5);
        x.lineTo(bx, by + uh);
        x.lineTo(bx - uw, by + uh * 0.5);
        x.closePath();
        x.fillStyle = rgba(INK, 0.1 + top * 0.14 + act * 0.1);
        x.fill();
        x.strokeStyle = rgba(c2, 0.3 + act * 0.4 * settle);
        x.lineWidth = 1;
        x.stroke();

        /* two side faces, one in shadow */
        x.beginPath();
        x.moveTo(bx - uw, by + uh * 0.5);
        x.lineTo(bx, by + uh);
        x.lineTo(bx, by + uh + lift);
        x.lineTo(bx - uw, by + uh * 0.5 + lift);
        x.closePath();
        x.fillStyle = rgba(c1, 0.18 + act * 0.22);
        x.fill();

        x.beginPath();
        x.moveTo(bx + uw, by + uh * 0.5);
        x.lineTo(bx, by + uh);
        x.lineTo(bx, by + uh + lift);
        x.lineTo(bx + uw, by + uh * 0.5 + lift);
        x.closePath();
        x.fillStyle = 'rgba(6,7,10,.5)';
        x.fill();
      });
    };
  };

  /* net — nodes that keep talking and reorganise near the pointer */
  VIZ.net = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var n = 16, pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({ bx: 0.12 + Math.random() * 0.76, by: 0.08 + Math.random() * 0.5,
        o: Math.random() * 6.283, s: 0.25 + Math.random() * 0.5, x: 0, y: 0, hub: i % 5 === 0 });
    }
    var links = [];
    for (var a = 0; a < n; a++) for (var b = a + 1; b < n; b++) links.push([a, b]);
    var pulses = [{ l: 0, t: 0 }, { l: 5, t: 0.4 }, { l: 11, t: 0.75 }, { l: 17, t: 0.2 }];
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var mx = w * (0.5 + px * 0.32), my = h * (0.32 + py * 0.24);
      pts.forEach(function (p) {
        p.x = p.bx * w + Math.sin(t * p.s + p.o) * 9;
        p.y = p.by * h + Math.cos(t * p.s * 0.8 + p.o) * 9;
        var dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy) || 1;
        var pull = Math.max(0, 1 - d / (w * 0.7)) * 18 * act;
        p.x += (dx / d) * pull; p.y += (dy / d) * pull;
      });
      var live = [];
      links.forEach(function (l, i) {
        var A = pts[l[0]], B = pts[l[1]];
        var d = Math.hypot(A.x - B.x, A.y - B.y);
        if (d > w * 0.44) return;
        live.push(i);
        var f = 1 - d / (w * 0.44);
        x.strokeStyle = rgba(c2, (0.1 + f * 0.34) * (0.5 + act * 0.5));
        x.lineWidth = 1;
        x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(B.x, B.y); x.stroke();
      });
      pulses.forEach(function (p) {
        p.t += 0.006 + act * 0.012;
        if (p.t > 1) { p.t = 0; p.l = live.length ? live[(Math.random() * live.length) | 0] : 0; }
        var l = links[p.l]; if (!l) return;
        var A = pts[l[0]], B = pts[l[1]];
        var hx = A.x + (B.x - A.x) * p.t, hy = A.y + (B.y - A.y) * p.t;
        var al = Math.sin(p.t * Math.PI);
        var g = x.createRadialGradient(hx, hy, 0, hx, hy, 9);
        g.addColorStop(0, rgba(INK, 0.95 * al));
        g.addColorStop(0.4, rgba(c1, 0.7 * al));
        g.addColorStop(1, rgba(c1, 0));
        x.fillStyle = g;
        x.beginPath(); x.arc(hx, hy, 9, 0, 6.283); x.fill();
      });
      pts.forEach(function (p) {
        if (p.hub) {
          var g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, 13);
          g.addColorStop(0, rgba(c1, 0.6 + act * 0.35));
          g.addColorStop(1, rgba(c1, 0));
          x.fillStyle = g;
          x.beginPath(); x.arc(p.x, p.y, 13, 0, 6.283); x.fill();
        }
        x.fillStyle = rgba(INK, 0.55 + act * 0.4);
        x.beginPath(); x.arc(p.x, p.y, p.hub ? 2.8 : 1.7, 0, 6.283); x.fill();
      });
    };
  };

  /* shield — concentric geometry holding a perimeter */
  VIZ.shield = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var rings = [
      { r: 0.15, s: 8, v: 0.20 }, { r: 0.25, s: 6, v: -0.14 },
      { r: 0.35, s: 12, v: 0.09 }, { r: 0.45, s: 4, v: -0.06 }
    ];
    var fieldPts = [];
    for (var i = 0; i < 46; i++) fieldPts.push({ a: Math.random() * 6.283, r: 0.5 + Math.random() * 0.24, s: 0.05 + Math.random() * 0.14 });
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var cx = w * 0.5 + px * 10, cy = h * 0.36 + py * 8, R = Math.min(w, h);

      var core = x.createRadialGradient(cx, cy, 0, cx, cy, R * 0.3);
      core.addColorStop(0, rgba(c1, 0.7 + act * 0.3));
      core.addColorStop(0.3, rgba(c1, 0.22));
      core.addColorStop(1, rgba(c1, 0));
      x.fillStyle = core;
      x.beginPath(); x.arc(cx, cy, R * 0.3, 0, 6.283); x.fill();

      rings.forEach(function (g, i) {
        var rot = t * g.v * (0.3 + act * 0.7);
        x.beginPath();
        for (var k = 0; k <= g.s; k++) {
          var a = (k / g.s) * 6.283 + rot;
          var rr = R * g.r * (1 + Math.sin(t * 0.6 + i) * 0.014);
          k ? x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr)
            : x.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        }
        x.closePath();
        x.strokeStyle = i % 2 ? rgba(c2, 0.55 + act * 0.4) : rgba(INK, 0.24 + act * 0.16);
        x.lineWidth = i === 1 ? 1.6 : 1;
        x.stroke();
      });

      fieldPts.forEach(function (p) {
        var a = p.a + t * p.s * (0.3 + act * 0.6);
        var rr = R * p.r;
        x.fillStyle = rgba(INK, 0.22 + act * 0.26);
        x.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 1.5, 1.5);
      });
    };
  };

  /* stream — modules carried along parallel channels */
  VIZ.stream = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var lanes = 6, mods = [];
    for (var i = 0; i < 30; i++) {
      mods.push({ l: i % lanes, p: Math.random(), s: 0.04 + Math.random() * 0.08, sz: 5 + Math.random() * 10 });
    }
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var top = h * 0.14, gap = h * 0.072;
      for (var l = 0; l < lanes; l++) {
        var y = top + l * gap + py * 5;
        x.strokeStyle = rgba(INK, 0.1);
        x.beginPath(); x.moveTo(w * 0.05, y); x.lineTo(w * 0.95, y); x.stroke();
      }
      mods.forEach(function (m) {
        m.p += m.s * (0.004 + act * 0.011);
        if (m.p > 1.12) m.p = -0.12;
        var y = top + m.l * gap + py * 5;
        var mx = w * 0.05 + m.p * w * 0.9 + px * 6;
        var col = m.l % 3 === 0 ? c1 : (m.l % 3 === 1 ? c2 : null);
        if (col) {
          var g = x.createLinearGradient(mx, 0, mx + m.sz, 0);
          g.addColorStop(0, rgba(col, 0.18 + act * 0.2));
          g.addColorStop(1, rgba(col, 0.75 + act * 0.25));
          x.fillStyle = g;
        } else {
          x.fillStyle = rgba(INK, 0.26 + act * 0.2);
        }
        x.fillRect(mx, y - 3, m.sz, 6);
        x.strokeStyle = rgba(INK, 0.3 + act * 0.18);
        x.strokeRect(mx + 0.5, y - 2.5, m.sz - 1, 5);
      });
    };
  };

  /* strata — layered plates, the slowest system of the set */
  VIZ.strata = function (x, w, h, ac, a2) {
    var c1 = hexRGB(ac), c2 = hexRGB(a2);
    var n = 9, plates = [];
    for (var i = 0; i < n; i++) plates.push({ i: i, o: i * 0.42, wobble: 0.6 + Math.random() * 0.5 });
    return function (t, act, px, py) {
      field(x, w, h, c1, c2, t, act, px, py);
      var cx = w * 0.5, cy = h * 0.36, pw = w * 0.56, ph = h * 0.026;
      plates.forEach(function (p) {
        var k = p.i / (n - 1);
        var drift = Math.sin(t * 0.24 * p.wobble + p.o) * (8 + k * 16) * (0.4 + act * 0.6);
        var y = cy + (k - 0.5) * h * 0.42 + py * (k - 0.5) * 12;
        var wid = pw * (0.55 + Math.abs(0.5 - k) * 0.5);
        var xx = cx - wid * 0.5 + drift + px * (k - 0.5) * 18;
        var col = k < 0.5 ? c1 : c2;

        var g = x.createLinearGradient(xx, y, xx + wid, y);
        g.addColorStop(0, rgba(col, 0.1 + act * 0.14));
        g.addColorStop(0.5, rgba(INK, 0.14 + act * 0.1));
        g.addColorStop(1, rgba(col, 0.28 + act * 0.3));
        x.fillStyle = g;
        x.fillRect(xx, y, wid, ph);
        x.strokeStyle = rgba(INK, 0.28 + act * 0.16);
        x.lineWidth = 1;
        x.strokeRect(xx + 0.5, y + 0.5, wid - 1, ph - 1);

        if (p.i < n - 1) {
          x.strokeStyle = rgba(col, 0.22);
          x.beginPath();
          x.moveTo(xx + wid * 0.5, y + ph);
          x.lineTo(cx + Math.sin(t * 0.24 * p.wobble + p.o + 0.42) * 8, y + h * 0.42 / (n - 1));
          x.stroke();
        }
      });
    };
  };

  /* ---------------------------------------------------------
     DECK

     A single state machine drives the deck. Every card position
     is recomputed from the active index each frame — nothing is
     ever accumulated, so the arrangement cannot drift.

       AUTO ─▶ HOVER ─▶ AUTO
         │
         ├─▶ DRAG ─▶ SETTLE ─▶ PAUSED ─▶ AUTO
         │
         └─▶ OFF   (section out of view)
     --------------------------------------------------------- */
  var ST = { AUTO: 'AUTO', HOVER: 'HOVER', DRAG: 'DRAG', SETTLE: 'SETTLE', PAUSED: 'PAUSED', OFF: 'OFF' };

  var deck = {
    cur: 0, target: 0, rate: 8,
    cards: [], viz: [], seeds: [],
    state: ST.OFF, live: false,
    px: 0, py: 0, tx: 0, ty: 0,
    lean: 0, leanT: 0, dragPx: 0, sway: 0,
    intro: 0, introRun: false,
    autoT: 0, pauseT: 0, wallLast: 0
  };

  var HOLD = 4.2;        /* seconds a card holds before the deck moves on */
  var RESUME = 3.0;      /* quiet time after the user lets go */
  var DPR = Math.min(devicePixelRatio || 1, SMALL ? 1.5 : 2);

  /* shortest signed distance on a ring — this is what makes the
     loop seamless: card 11 is one step from card 01, not ten */
  function ringOffset(i, from) {
    var n = SOLUTIONS.length;
    var o = i - from;
    o = ((o % n) + n) % n;
    if (o > n / 2) o -= n;
    return o;
  }
  function wrapIndex(i) {
    var n = SOLUTIONS.length;
    return ((Math.round(i) % n) + n) % n;
  }

  function buildDeck() {
    var track = $('#deckTrack');
    if (!track) return;

    SOLUTIONS.forEach(function (s, i) {
      var el = document.createElement('article');
      el.className = 'card';
      el.style.setProperty('--ac', s.ac);
      el.style.setProperty('--a2', s.a2);
      el.innerHTML =
        '<span class="card__v"><canvas></canvas></span>' +
        '<p class="card__k"><b>' + pad(i + 1) + '</b> / ' + pad(SOLUTIONS.length) + '</p>' +
        '<div class="card__c">' +
          '<h3 class="card__t">' + s.t.replace(/<br>/g, ' ') + '</h3>' +
          '<p class="card__d">' + s.d + '</p>' +
        '</div>' +
        '<span class="card__r"></span>';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', s.t.replace(/<br>/g, ' '));
      el.dataset.cur = 'drag';
      el.addEventListener('click', function () { if (Math.abs(deck.dragPx) < 5) goCard(i); });
      el.addEventListener('focus', function () { goCard(i); });
      el.addEventListener('mouseenter', function () { if (deck.state === ST.AUTO) setState(ST.HOVER); });
      el.addEventListener('mouseleave', function () { if (deck.state === ST.HOVER) setState(ST.AUTO); });
      track.appendChild(el);
      deck.cards.push(el);
      /* fixed scatter seed per card, so the entrance is choreographed
         rather than random on every replay */
      deck.seeds.push({
        x: Math.sin(i * 12.9898) * 120,
        y: Math.cos(i * 78.233) * 60,
        r: Math.sin(i * 4.1) * 26
      });

      var cv = el.querySelector('canvas');
      deck.viz.push({ cv: cv, ctx: cv.getContext('2d'), kind: s.v, ac: s.ac, a2: s.a2,
        draw: null, w: 0, h: 0 });
    });

    sizeDeck();
    addEventListener('resize', sizeDeck);
    bindDrag(track);

    $('#deckX').addEventListener('click', function () { goCard(deck.target + 1); });
    $('#deckP').addEventListener('click', function () { goCard(deck.target - 1); });
    $('#deck').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goCard(deck.target + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goCard(deck.target - 1); }
    });
    magnetise($('#deckX'));
    magnetise($('#deckP'));

    deck.cur = deck.target = 0;
    applySolution(0, true);
    layoutDeck(0);
  }

  /* ---------------------------------------------------------
     DRAG — one pointer path for mouse and touch, with the
     gesture classified before it can steal the page scroll
     --------------------------------------------------------- */
  function bindDrag(track) {
    var wrap = $('#deck');
    var down = false, axis = null, sx = 0, sy = 0, sCur = 0;
    var lastX = 0, lastT = 0, vel = 0, id = null;
    var step = function () { return deck.cards[0] ? deck.cards[0].offsetWidth * 0.82 : 320; };

    track.addEventListener('pointerdown', function (e) {
      if (deck.state === ST.OFF) return;
      down = true; axis = null; id = e.pointerId;
      sx = e.clientX; sy = e.clientY; sCur = deck.cur;
      lastX = e.clientX; lastT = performance.now(); vel = 0;
      deck.dragPx = 0;
    });

    track.addEventListener('pointermove', function (e) {
      if (!down || e.pointerId !== id) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;

      /* decide once whether this is a deck gesture or a page scroll */
      if (axis === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (axis === 'x') {
          setState(ST.DRAG);
          wrap.classList.add('drag');
          document.body.classList.add('grabbing');
          try { track.setPointerCapture(id); } catch (err) {}
        } else {
          down = false;                     /* let Lenis have it */
          return;
        }
      }

      deck.dragPx = dx;
      deck.cur = sCur - dx / step();

      var now = performance.now(), gap = Math.max(1, now - lastT);
      vel = -(e.clientX - lastX) / step() / (gap / 1000);
      deck.leanT = clamp(-(e.clientX - lastX) * 0.55, -6, 6);
      lastX = e.clientX; lastT = now;
    });

    var release = function (e) {
      if (!down || (e && e.pointerId !== id)) return;
      down = false;
      wrap.classList.remove('drag');
      document.body.classList.remove('grabbing');
      deck.leanT = 0;
      if (axis !== 'x') { axis = null; return; }
      axis = null;

      /* distance and velocity both count: a short flick advances,
         a long slow pull advances, a nudge falls back */
      var moved = -deck.dragPx / step();
      var throwK = clamp(vel * 0.18, -2, 2);
      var raw = sCur + moved + throwK;
      var landed = Math.round(raw);
      /* never let one gesture skip more of the deck than you can follow */
      landed = clamp(landed, sCur - 3, sCur + 3);
      deck.dragPx = 0;
      goCard(landed, false, true);
    };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);

    if (FINE) {
      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        deck.tx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
        deck.ty = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      });
      wrap.addEventListener('mouseleave', function () { deck.tx = 0; deck.ty = 0; });
    }
  }

  function magnetise(el) {
    if (!el || !FINE || REDUCED) return;
    var mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    var my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.4);
      my((e.clientY - r.top - r.height / 2) * 0.5);
    });
    el.addEventListener('mouseleave', function () { mx(0); my(0); });
  }

  /* ---------------------------------------------------------
     STATE
     --------------------------------------------------------- */
  function setState(s) {
    if (deck.state === s) return;
    deck.state = s;
    deck.autoT = 0;
    if (s === ST.PAUSED) deck.pauseT = RESUME;
    var hint = $('#deckHint');
    if (!hint) return;
    var label = s === ST.AUTO ? 'AUTO' : (s === ST.DRAG ? 'DRAG' : 'PAUSED');
    if (hint.dataset.l !== label) { hint.dataset.l = label; hint.textContent = label; }
    hint.classList.toggle('run', s === ST.AUTO);
  }

  var titleCall = null;
  function applySolution(i, instant) {
    i = wrapIndex(i);
    /* the copy follows the movement — it must never lead it */
    if (titleCall) titleCall.kill();
    if (instant || REDUCED) setSolution(i);
    else titleCall = gsap.delayedCall(0.18, function () { setSolution(i); });
    deck.cards.forEach(function (c, k) { c.classList.toggle('on', k === i); });
  }

  function goCard(i, instant, fromDrag) {
    var landed = wrapIndex(i);
    /* keep `target` on the same turn of the ring as `cur` so the
       glide always takes the short way round */
    deck.target = deck.cur + ringOffset(landed, deck.cur);
    deck.rate = fromDrag ? 7 : 9;
    applySolution(landed, instant);
    if (instant) { deck.cur = deck.target; layoutDeck(0); }
    if (deck.state !== ST.OFF) setState(ST.SETTLE);
  }

  function autoAdvance() {
    var next = wrapIndex(deck.target + 1);
    deck.target = deck.cur + ringOffset(next, deck.cur);
    deck.rate = 4.4;                       /* the automatic glide is slower */
    applySolution(next);
  }

  /* ---------------------------------------------------------
     LAYOUT — absolute, derived, never accumulated
     --------------------------------------------------------- */
  function sizeDeck() {
    deck.viz.forEach(function (v, i) {
      var el = deck.cards[i];
      var w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      v.w = w; v.h = h;
      v.cv.width = Math.round(w * DPR);
      v.cv.height = Math.round(h * DPR);
      v.ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      v.draw = (VIZ[v.kind] || VIZ.orbit)(v.ctx, w, h, v.ac, v.a2);
    });
    layoutDeck(0);
  }

  function layoutDeck(tt) {
    var n = SOLUTIONS.length;
    tt = tt || 0;
    var depth = SMALL ? 0.55 : 1;

    for (var i = 0; i < n; i++) {
      var el = deck.cards[i];
      var o = ringOffset(i, deck.cur);
      var ao = Math.abs(o);
      if (ao > 3.3) { if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden'; continue; }
      if (el.style.visibility === 'hidden') el.style.visibility = '';

      /* resting arrangement */
      var xPct = o * (SMALL ? 28 : 27);
      var yPct = ao * 1.9 * depth;
      var z = -Math.pow(ao, 1.1) * 175 * depth;
      var ry = -o * (SMALL ? 5 : 10) * depth;
      var sc = 1 - Math.min(ao, 3) * 0.082;
      var op = 1 - smooth(0.85, 3.3, ao) * 0.82;
      var blur = clamp((ao - 0.95) * 1.35, 0, 3.4);

      var near = Math.max(0, 1 - ao);
      /* pointer tilt, kept deliberately small */
      var rx = -deck.py * 3 * near * depth;
      ry += deck.px * 5 * near * depth;
      /* the drag lean, strongest at the front — this is the parallax */
      var layer = ao < 0.5 ? 1 : (ao < 1.5 ? 0.65 : 0.35);
      var rz = deck.lean * layer * 0.6;
      xPct += (deck.dragPx * 0.06 * (layer - 0.35)) / (el.offsetWidth || 300) * 100;
      /* idle float */
      var bob = Math.sin(tt * 0.5 + i * 0.9) * 1.1;
      rz += Math.sin(tt * 0.33 + i * 1.4) * 0.5;

      /* entrance: blend the scattered state into the resting one */
      var k = 1;
      if (deck.intro < 1) {
        k = clamp(deck.intro * 1.75 - Math.min(ao, 3) * 0.14, 0, 1);
        k = k * k * (3 - 2 * k);
        var sd = deck.seeds[i];
        xPct += sd.x * (1 - k);
        yPct += sd.y * (1 - k) * 0.35;
        rz += sd.r * (1 - k);
        sc *= 0.72 + 0.28 * k;
        op *= k;
        z -= 260 * (1 - k);
      }

      el.style.transform =
        'translate(-50%,-50%) ' +
        'translate3d(' + xPct.toFixed(2) + '%,' + (yPct + bob).toFixed(2) + '%,' + z.toFixed(1) + 'px)' +
        ' rotateY(' + ry.toFixed(2) + 'deg) rotateX(' + rx.toFixed(2) + 'deg)' +
        ' rotateZ(' + rz.toFixed(2) + 'deg)' +
        ' scale(' + sc.toFixed(3) + ')';
      el.style.opacity = op.toFixed(3);
      el.style.filter = blur > 0.1 ? 'blur(' + blur.toFixed(2) + 'px)' : '';
      el.style.zIndex = String(100 - Math.round(ao * 10));
      el.setAttribute('aria-hidden', ao > 0.5 ? 'true' : 'false');
    }
  }

  /* ---------------------------------------------------------
     FRAME — called from the one render loop
     --------------------------------------------------------- */
  function updateDeck(dt, tt, pos) {
    if (!deck.cards.length) return;

    var visible = Math.abs(pos - 3) < 1.3;
    if (visible !== deck.live) {
      deck.live = visible;
      if (visible) {
        if (!deck.introRun) {
          deck.introRun = true;
          if (REDUCED) { deck.intro = 1; setState(ST.PAUSED); }
          else {
            deck.intro = 0;
            gsap.to(deck, { intro: 1, duration: 1.9, ease: 'power3.out',
              onComplete: function () { setState(ST.AUTO); } });
          }
        } else if (deck.state === ST.OFF) {
          setState(REDUCED ? ST.PAUSED : ST.AUTO);
        }
      } else {
        setState(ST.OFF);          /* nothing runs off screen */
      }
    }
    if (!visible) return;

    var s = 1 - Math.exp(-dt * 7);
    deck.px += (deck.tx - deck.px) * s;
    deck.py += (deck.ty - deck.py) * s;
    deck.lean += (deck.leanT - deck.lean) * s * 0.8;

    /* glide toward the resting index */
    if (deck.state !== ST.DRAG) {
      var d = deck.target - deck.cur;
      deck.cur += d * (1 - Math.exp(-dt * deck.rate));
      if (Math.abs(d) < 0.0006) {
        deck.cur = deck.target;
        if (deck.state === ST.SETTLE) setState(ST.PAUSED);
      }
    } else if (wrapIndex(deck.cur) !== wrapIndex(deck.target)) {
      /* the copy tracks whatever is centre stage while you drag */
      var c = wrapIndex(deck.cur);
      deck.target = deck.cur;
      applySolution(c);
    }

    /* ---- timers, against the wall clock ----
       The frame delta is clamped for stability, so on a slow device
       it runs behind real time; a cadence must not inherit that. */
    var wall = clamp(tt - (deck.wallLast || tt), 0, 0.5);
    deck.wallLast = tt;

    if (deck.state === ST.PAUSED) {
      deck.pauseT -= wall;
      if (deck.pauseT <= 0 && !REDUCED) setState(ST.AUTO);
    } else if (deck.state === ST.AUTO) {
      deck.autoT += wall;
      if (deck.autoT >= HOLD) { deck.autoT = 0; autoAdvance(); }
    }

    /* progress: the countdown while it runs itself, position while
       you are driving */
    var bar = $('#deckBar');
    if (bar) {
      var p = deck.state === ST.AUTO ? deck.autoT / HOLD
        : (wrapIndex(deck.cur) / (SOLUTIONS.length - 1));
      bar.style.transform = 'scaleX(' + clamp(p, 0, 1).toFixed(4) + ')';
    }
    var hint = $('#deckHint');
    if (hint) hint.style.setProperty('--auto',
      deck.state === ST.AUTO ? (deck.autoT / HOLD).toFixed(3) : '0');

    /* the deck keeps a camera of its own */
    deck.sway += ((Math.sin(tt * 0.13) * 2.2 + deck.px * 2.4) - deck.sway) * s * 0.5;
    var track = $('#deckTrack');
    if (track) track.style.transform = 'rotateY(' + deck.sway.toFixed(2) + 'deg)';

    layoutDeck(tt);

    /* only the cards you can read keep drawing */
    for (var i = 0; i < deck.viz.length; i++) {
      var v = deck.viz[i];
      if (!v.draw) continue;
      var ao = Math.abs(ringOffset(i, deck.cur));
      if (ao > 2.2) continue;
      if (REDUCED && v.done) continue;
      var act = clamp(1 - ao * 0.55, 0.12, 1);
      v.draw(tt, act, deck.px * (1 - ao * 0.3), deck.py * (1 - ao * 0.3));
      v.done = true;
    }
  }

  function paintDeck() {
    if (!deck.cards.length) return;
    deck.cards.forEach(function (c, i) { c.classList.toggle('on', i === solIdx); });
  }

  /* =========================================================
     INDUSTRY SLIPSTREAM
     A continuous perspective card stream. Six industry cards
     travel through a virtual Z-axis. One continuous `progress`
     value drives all transforms — drag, autoplay and snap all
     feed the same number, so motion is never stepped.

     STATE MACHINE:
       OFF → AUTO → HOVER → AUTO
                  → DRAG → SETTLE → PAUSED → AUTO
     ========================================================= */
  var ind = (function () {

    /* -------------------------------------------------------
       GENERATIVE VISUAL SYSTEMS
       Six autonomous canvas compositions. Each maps to an
       industry and draws with CSS-only geometry — no images.
       Signature: makeXxx(ctx, w, h) → draw(t, act, px, py)
       act 0..1: how active the card is (1 = focal plane)
       px/py -1..1: pointer for parallax
       ------------------------------------------------------- */
    var IINK = [240, 240, 236];

    function irgba(c, a) {
      return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')';
    }
    function ihexRGB(h) {
      h = h.replace('#', '');
      return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    }

    /* Shared field: dark gradient ground + two light sources + faint grid */
    function ifield(x, w, h, c1, c2, t, act, px, py) {
      x.clearRect(0, 0, w, h);
      var base = x.createLinearGradient(0, 0, w * 0.5, h);
      base.addColorStop(0, 'rgba(18,22,29,1)');
      base.addColorStop(1, 'rgba(6,8,11,1)');
      x.fillStyle = base; x.fillRect(0, 0, w, h);

      var k = 0.3 + act * 0.7;
      var b1x = w * (0.3 + Math.sin(t * 0.19) * 0.11) + px * 20;
      var b1y = h * (0.28 + Math.cos(t * 0.15) * 0.08) + py * 14;
      var g1 = x.createRadialGradient(b1x, b1y, 0, b1x, b1y, w * 0.9);
      g1.addColorStop(0, irgba(c1, 0.44 * k));
      g1.addColorStop(0.45, irgba(c1, 0.10 * k));
      g1.addColorStop(1, irgba(c1, 0));
      x.fillStyle = g1; x.fillRect(0, 0, w, h);

      var b2x = w * (0.74 + Math.cos(t * 0.13) * 0.12) - px * 16;
      var b2y = h * (0.55 + Math.sin(t * 0.18) * 0.09) - py * 10;
      var g2 = x.createRadialGradient(b2x, b2y, 0, b2x, b2y, w * 0.75);
      g2.addColorStop(0, irgba(c2, 0.36 * k));
      g2.addColorStop(0.5, irgba(c2, 0.07 * k));
      g2.addColorStop(1, irgba(c2, 0));
      x.fillStyle = g2; x.fillRect(0, 0, w, h);

      /* engineering grid */
      x.strokeStyle = irgba(IINK, 0.048); x.lineWidth = 1;
      var step = w / 6;
      for (var gi = 1; gi < 6; gi++) {
        x.beginPath(); x.moveTo(gi * step, 0); x.lineTo(gi * step, h); x.stroke();
      }
      for (var gj = 1; gj < 8; gj++) {
        var yy = (h / 8) * gj;
        x.beginPath(); x.moveTo(0, yy); x.lineTo(w, yy); x.stroke();
      }
    }

    /* --- BANKING: Layered geometric architecture --- */
    function makeArch(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        var cx = w * 0.5 + px * 8, cy = h * 0.38 + py * 6;
        var n = 7;
        for (var i = 0; i < n; i++) {
          var k = i / (n - 1);
          var ww = w * (0.18 + k * 0.56);
          var hh = h * (0.06 + k * 0.11);
          var yOff = -(n / 2 - i) * h * 0.072 + Math.sin(t * 0.22 + i * 0.4) * (2 + act * 3);
          var xOff = (i % 2 ? 1 : -1) * Math.sin(t * 0.15 + i) * (1.5 + act * 3) + px * (k * 14);
          var xx = cx - ww * 0.5 + xOff, yy = cy - hh * 0.5 + yOff;
          var g = x.createLinearGradient(xx, yy, xx + ww, yy);
          g.addColorStop(0, irgba(i % 2 ? c2 : c1, 0.18 + act * 0.22));
          g.addColorStop(0.5, irgba(IINK, 0.1 + act * 0.08));
          g.addColorStop(1, irgba(i % 2 ? c1 : c2, 0.22 + act * 0.24));
          x.fillStyle = g; x.fillRect(xx, yy, ww, hh);
          x.strokeStyle = irgba(i === 3 ? c1 : IINK, 0.22 + act * 0.18); x.lineWidth = 1;
          x.strokeRect(xx + 0.5, yy + 0.5, ww - 1, hh - 1);
          if (i === 3) {
            x.strokeStyle = irgba(c1, 0.55 + act * 0.35); x.lineWidth = 1.5;
            x.strokeRect(xx + 0.5, yy + 0.5, ww - 1, hh - 1);
          }
        }
        /* vertical connectors */
        x.strokeStyle = irgba(c1, 0.18 + act * 0.2); x.lineWidth = 1;
        for (var j = 0; j < 5; j++) {
          var jx = cx - w * 0.24 + j * w * 0.12;
          x.beginPath(); x.moveTo(jx, cy - h * 0.32); x.lineTo(jx, cy + h * 0.32); x.stroke();
        }
      };
    }

    /* --- ENERGY: Power distribution sine waves --- */
    function makeEnergy(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      var lanes = 5;
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        var pts = [];
        var steps = 80;
        for (var l = 0; l < lanes; l++) {
          var ky = h * (0.15 + l * 0.15) + py * (l - 2) * 5;
          var amp = h * (0.03 + l * 0.012) * (0.5 + act * 0.5);
          var freq = 1.2 + l * 0.3;
          var phase = t * (0.4 + l * 0.15) + px * 0.6;
          var col = l % 2 === 0 ? c1 : c2;
          var alpha = 0.2 + act * 0.45 - l * 0.03;
          x.beginPath();
          for (var s = 0; s <= steps; s++) {
            var sx = (s / steps) * w;
            var sy = ky + Math.sin(s / steps * Math.PI * 2 * freq + phase) * amp;
            s === 0 ? x.moveTo(sx, sy) : x.lineTo(sx, sy);
          }
          x.strokeStyle = irgba(col, Math.max(0.08, alpha)); x.lineWidth = l === 2 ? 1.8 : 1;
          x.stroke();
          /* pulse dots on the active wave */
          if (l === 2) {
            var pt = ((t * 0.5) % 1);
            var px2 = pt * w;
            var py2 = ky + Math.sin(pt * Math.PI * 2 * freq + phase) * amp;
            var pg = x.createRadialGradient(px2, py2, 0, px2, py2, 10);
            pg.addColorStop(0, irgba(IINK, 0.9 * act));
            pg.addColorStop(0.4, irgba(c1, 0.7 * act));
            pg.addColorStop(1, irgba(c1, 0));
            x.fillStyle = pg; x.beginPath(); x.arc(px2, py2, 10, 0, 6.283); x.fill();
          }
        }
        /* vertical power poles */
        x.strokeStyle = irgba(IINK, 0.1 + act * 0.1); x.lineWidth = 1;
        for (var pi = 0; pi < 6; pi++) {
          var px3 = (pi + 0.5) / 6 * w;
          x.beginPath(); x.moveTo(px3, h * 0.1); x.lineTo(px3, h * 0.78); x.stroke();
          x.beginPath(); x.moveTo(px3 - 8, h * 0.12); x.lineTo(px3 + 8, h * 0.12); x.stroke();
        }
      };
    }

    /* --- PUBLIC SECTOR: Hexagonal civic grid --- */
    function makeGrid(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      var hexR = Math.min(w, h) * 0.1;
      var nodes = [];
      var cols = 5, rows = 4;
      for (var hr = 0; hr < rows; hr++) {
        for (var hc = 0; hc < cols; hc++) {
          var hx = (hc / (cols - 1)) * w * 0.8 + w * 0.1;
          var hy = (hr / (rows - 1)) * h * 0.62 + h * 0.1;
          if (hr % 2 === 1) hx += w * 0.08;
          nodes.push({ x: hx, y: hy, ph: Math.random() * 6.283, hub: hr === 1 && hc === 2 });
        }
      }
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        /* connections first */
        for (var ni = 0; ni < nodes.length; ni++) {
          for (var nj = ni + 1; nj < nodes.length; nj++) {
            var dx = nodes[ni].x - nodes[nj].x + px * 6;
            var dy = nodes[ni].y - nodes[nj].y + py * 4;
            var d = Math.hypot(dx, dy);
            if (d > w * 0.38) continue;
            var f = 1 - d / (w * 0.38);
            x.strokeStyle = irgba(c2, (0.1 + f * 0.28) * (0.4 + act * 0.6));
            x.lineWidth = 1;
            x.beginPath(); x.moveTo(nodes[ni].x + px * 4, nodes[ni].y + py * 3);
            x.lineTo(nodes[nj].x + px * 4, nodes[nj].y + py * 3); x.stroke();
          }
        }
        /* hexagon nodes */
        nodes.forEach(function(n) {
          var nx = n.x + px * 4, ny = n.y + py * 3;
          var r = hexR * (n.hub ? 1.35 : 0.7);
          var pulse = 0.7 + 0.3 * Math.sin(t * 1.1 + n.ph);
          x.beginPath();
          for (var k = 0; k < 6; k++) {
            var a = k / 6 * Math.PI * 2 - Math.PI / 6;
            var rx = nx + Math.cos(a) * r * pulse, ry = ny + Math.sin(a) * r * pulse;
            k === 0 ? x.moveTo(rx, ry) : x.lineTo(rx, ry);
          }
          x.closePath();
          x.strokeStyle = irgba(n.hub ? c1 : IINK, n.hub ? (0.7 + act * 0.3) : (0.22 + act * 0.16));
          x.lineWidth = n.hub ? 1.6 : 1; x.stroke();
          if (n.hub) {
            var cg = x.createRadialGradient(nx, ny, 0, nx, ny, r * 1.8);
            cg.addColorStop(0, irgba(c1, 0.45 * act)); cg.addColorStop(1, irgba(c1, 0));
            x.fillStyle = cg; x.beginPath(); x.arc(nx, ny, r * 1.8, 0, 6.283); x.fill();
          }
        });
      };
    }

    /* --- RETAIL: Orbital commerce rings --- */
    function makeOrbit(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      var rings = [
        { r: 0.18, tilt: 0.28, spd: 0.18 },
        { r: 0.28, tilt: 0.42, spd: -0.12 },
        { r: 0.38, tilt: 0.2, spd: 0.09 }
      ];
      var dots = [];
      for (var di = 0; di < 8; di++) dots.push({ r: 0.12 + di * 0.036, a: di * 0.785, spd: 0.15 + di * 0.04 });
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        var cx = w * 0.5 + px * 8, cy = h * 0.36 + py * 6;
        var R = Math.min(w, h) * 0.48;
        /* central core glow */
        var cg = x.createRadialGradient(cx, cy, 0, cx, cy, R * 0.22);
        cg.addColorStop(0, irgba(c1, 0.6 + act * 0.35));
        cg.addColorStop(0.4, irgba(c1, 0.2 * act));
        cg.addColorStop(1, irgba(c1, 0));
        x.fillStyle = cg; x.beginPath(); x.arc(cx, cy, R * 0.22, 0, 6.283); x.fill();

        rings.forEach(function(rg, ri) {
          var rot = t * rg.spd + px * 0.25;
          x.beginPath();
          for (var k = 0; k <= 72; k++) {
            var a = (k / 72) * Math.PI * 2 + rot;
            var rx = cx + Math.cos(a) * R * rg.r;
            var ry = cy + Math.sin(a) * R * rg.r * rg.tilt;
            k === 0 ? x.moveTo(rx, ry) : x.lineTo(rx, ry);
          }
          x.strokeStyle = irgba(ri === 1 ? c2 : IINK, (ri === 1 ? 0.55 : 0.2) + act * 0.25);
          x.lineWidth = ri === 1 ? 1.5 : 1; x.stroke();

          /* body on ring */
          var ba = t * rg.spd * 2.5 + ri * 2.1;
          var bx = cx + Math.cos(ba) * R * rg.r;
          var by = cy + Math.sin(ba) * R * rg.r * rg.tilt;
          var bg = x.createRadialGradient(bx - 3, by - 4, 0, bx, by, 9);
          bg.addColorStop(0, irgba(IINK, 0.9));
          bg.addColorStop(0.3, irgba(ri % 2 ? c2 : c1, 0.8 + act * 0.2));
          bg.addColorStop(1, irgba(ri % 2 ? c2 : c1, 0));
          x.fillStyle = bg; x.beginPath(); x.arc(bx, by, 9, 0, 6.283); x.fill();
        });
        /* dust */
        dots.forEach(function(d) {
          var a = d.a + t * d.spd;
          var dx = cx + Math.cos(a) * R * d.r + px * 10 * d.r;
          var dy = cy + Math.sin(a) * R * d.r * 0.5 + py * 8 * d.r;
          x.fillStyle = irgba(IINK, 0.18 + act * 0.28);
          x.fillRect(dx, dy, 1.6, 1.6);
        });
      };
    }

    /* --- TECHNOLOGY: Neural mesh network --- */
    function makeMesh(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      var n = 18, pts = [];
      for (var ni = 0; ni < n; ni++) {
        pts.push({
          bx: 0.08 + Math.sin(ni * 3.14159) * 0.42 + 0.42,
          by: 0.06 + Math.cos(ni * 2.39) * 0.38 + 0.38,
          o: Math.random() * 6.283, s: 0.2 + Math.random() * 0.4,
          x: 0, y: 0, hub: ni % 4 === 0
        });
      }
      var links = [];
      for (var li = 0; li < n; li++) for (var lj = li + 1; lj < n; lj++) links.push([li, lj]);
      var pulses = [{ l: 0, t: 0 }, { l: 4, t: 0.33 }, { l: 9, t: 0.66 }];
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        var mx = w * (0.5 + px * 0.28), my = h * (0.32 + py * 0.2);
        pts.forEach(function(p) {
          p.x = p.bx * w + Math.sin(t * p.s + p.o) * 8 + px * 12 * p.bx;
          p.y = p.by * h + Math.cos(t * p.s * 0.8 + p.o) * 8 + py * 9 * p.by;
          var dpx = mx - p.x, dpy = my - p.y;
          var pd = Math.hypot(dpx, dpy) || 1;
          var pull = Math.max(0, 1 - pd / (w * 0.65)) * 16 * act;
          p.x += (dpx / pd) * pull; p.y += (dpy / pd) * pull;
        });
        var live = [];
        links.forEach(function(l, idx) {
          var A = pts[l[0]], B = pts[l[1]];
          var d = Math.hypot(A.x - B.x, A.y - B.y);
          if (d > w * 0.4) return;
          live.push(idx);
          var f = 1 - d / (w * 0.4);
          x.strokeStyle = irgba(c2, (0.08 + f * 0.3) * (0.5 + act * 0.5));
          x.lineWidth = 1;
          x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(B.x, B.y); x.stroke();
        });
        pulses.forEach(function(p) {
          p.t += 0.005 + act * 0.01;
          if (p.t > 1) { p.t = 0; p.l = live.length ? live[(Math.random() * live.length)|0] : 0; }
          var l = links[p.l]; if (!l) return;
          var A = pts[l[0]], B = pts[l[1]];
          var hx = A.x + (B.x - A.x) * p.t, hy = A.y + (B.y - A.y) * p.t;
          var al = Math.sin(p.t * Math.PI);
          var pg = x.createRadialGradient(hx, hy, 0, hx, hy, 8);
          pg.addColorStop(0, irgba(IINK, 0.95 * al));
          pg.addColorStop(0.4, irgba(c1, 0.7 * al));
          pg.addColorStop(1, irgba(c1, 0));
          x.fillStyle = pg; x.beginPath(); x.arc(hx, hy, 8, 0, 6.283); x.fill();
        });
        pts.forEach(function(p) {
          if (p.hub) {
            var pg = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
            pg.addColorStop(0, irgba(c1, 0.6 + act * 0.35)); pg.addColorStop(1, irgba(c1, 0));
            x.fillStyle = pg; x.beginPath(); x.arc(p.x, p.y, 12, 0, 6.283); x.fill();
          }
          x.fillStyle = irgba(IINK, 0.5 + act * 0.45);
          x.beginPath(); x.arc(p.x, p.y, p.hub ? 2.8 : 1.6, 0, 6.283); x.fill();
        });
      };
    }

    /* --- PRIVATE WORKSTATIONS: Blueprint structural form --- */
    function makeBlueprint(x, w, h, ac, a2) {
      var c1 = ihexRGB(ac), c2 = ihexRGB(a2);
      var n = 8, plates = [];
      for (var i = 0; i < n; i++) plates.push({ i: i, o: i * 0.52, wobble: 0.5 + (i % 3) * 0.4 });
      return function(t, act, px, py) {
        ifield(x, w, h, c1, c2, t, act, px, py);
        var bw = w * 0.7, bh = h * 0.55;
        var bx = w * 0.5 - bw * 0.5 + px * 6;
        var by = h * 0.18 + py * 4;
        /* blueprint outer frame */
        x.strokeStyle = irgba(c1, 0.28 + act * 0.22); x.lineWidth = 1;
        x.strokeRect(bx, by, bw, bh);
        /* corner marks */
        var cm = 12;
        [[bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh]].forEach(function(c) {
          x.strokeStyle = irgba(c2, 0.6 + act * 0.35); x.lineWidth = 1.5;
          x.beginPath(); x.moveTo(c[0] - cm, c[1]); x.lineTo(c[0] + cm, c[1]);
          x.moveTo(c[0], c[1] - cm); x.lineTo(c[0], c[1] + cm); x.stroke();
        });
        /* interior structural plates */
        plates.forEach(function(p) {
          var k = p.i / (n - 1);
          var drift = Math.sin(t * 0.2 * p.wobble + p.o) * (4 + k * 10) * (0.3 + act * 0.7);
          var yy = by + k * bh + py * (k - 0.5) * 8;
          var pw = bw * (0.42 + Math.abs(0.5 - k) * 0.4);
          var xx = bx + (bw - pw) * 0.5 + drift + px * (k - 0.5) * 14;
          var col = k < 0.5 ? c1 : c2;
          var g = x.createLinearGradient(xx, yy, xx + pw, yy);
          g.addColorStop(0, irgba(col, 0.08 + act * 0.12));
          g.addColorStop(0.5, irgba(IINK, 0.12 + act * 0.08));
          g.addColorStop(1, irgba(col, 0.2 + act * 0.24));
          x.fillStyle = g; x.fillRect(xx, yy, pw, h * 0.018);
          x.strokeStyle = irgba(IINK, 0.2 + act * 0.14); x.lineWidth = 1;
          x.strokeRect(xx + 0.5, yy + 0.5, pw - 1, h * 0.018 - 1);
        });
        /* dimension lines */
        x.strokeStyle = irgba(c2, 0.2 + act * 0.18); x.lineWidth = 1;
        x.setLineDash([4, 6]);
        x.beginPath(); x.moveTo(bx + bw + 16, by); x.lineTo(bx + bw + 16, by + bh); x.stroke();
        x.beginPath(); x.moveTo(bx, by - 14); x.lineTo(bx + bw, by - 14); x.stroke();
        x.setLineDash([]);
      };
    }

    /* Visual factory — maps industry index to generator */
    var IND_VIZ = [makeArch, makeEnergy, makeGrid, makeOrbit, makeMesh, makeBlueprint];
    var IND_COLORS = [
      { ac: '#3B82F6', a2: '#2DD4BF' }, /* Banking */
      { ac: '#F59E0B', a2: '#FB923C' }, /* Energy */
      { ac: '#8B5CF6', a2: '#22D3EE' }, /* Public */
      { ac: '#EC4899', a2: '#FB7185' }, /* Retail */
      { ac: '#22D3EE', a2: '#818CF8' }, /* Technology */
      { ac: '#2DD4BF', a2: '#A3E635' }  /* Workstations */
    ];

    /* -------------------------------------------------------
       STATE MACHINE
       ------------------------------------------------------- */
    var IST = { AUTO:'AUTO', HOVER:'HOVER', DRAG:'DRAG', SETTLE:'SETTLE', PAUSED:'PAUSED', OFF:'OFF' };

    var N = INDUSTRIES.length; /* 6 */
    var IND_HOLD   = 3.8;     /* seconds a card holds at focal plane */
    var IND_RESUME = 2.8;     /* quiet seconds after user release */
    var IDPR = Math.min(devicePixelRatio || 1, SMALL ? 1.5 : 2);

    var state = {
      progress: 0,          /* continuous, fractional card index */
      target: 0,            /* snapped integer target */
      rate: 6,              /* glide rate */
      status: IST.OFF,
      live: false,
      firstEntry: true,
      introProgress: 0,
      autoT: 0,
      pauseT: 0,
      wallLast: 0,
      /* pointer */
      px: 0, py: 0, tx: 0, ty: 0,
      sway: 0,
      /* drag */
      dragSx: 0, dragSy: 0, dragSCur: 0,
      dragPx: 0, dragVel: 0,
      dragLast: 0, dragLastT: 0,
      lean: 0, leanT: 0,
      /* DOM refs */
      cards: [], vizData: [], stream: null, stage: null, hint: null
    };

    /* -------------------------------------------------------
       MATH — modular ring arithmetic
       ------------------------------------------------------- */
    function ringWrap(i) {
      return ((Math.round(i) % N) + N) % N;
    }
    function ringDist(to, from) {
      var o = to - from;
      o = ((o % N) + N) % N;
      if (o > N / 2) o -= N;
      return o;
    }
    function ringFrac(progress) {
      return ((progress % N) + N) % N;
    }

    /* -------------------------------------------------------
       SLIPSTREAM POSITIONING
       Maps a card's relative offset from the focal plane to
       its full spatial state. All values are derived — nothing
       is accumulated.
       ------------------------------------------------------- */
    function getSlipstreamState(relOff) {
      var ao = Math.abs(relOff);

      /* Z — cards arrive from deep distance, linger at focal plane, depart fast.
         Non-linear: slow approach, sharp exit. This matches how perspective
         foreshortening actually works — objects grow fastest when close. */
      var zSign = relOff >= 0 ? 1 : -1;
      var zMag  = ao < 1
        ? ao * 280                          /* near zone: moderate push */
        : 280 + (ao - 1) * 380;             /* far zone: much deeper */
      var z = -zSign * zMag;

      /* Scale — driven by virtual focal length (perspective: 1400px).
         At z=0 the card is 1× (focal plane). Each 280px of depth roughly
         halves the apparent size at this perspective value. */
      var scale = 1400 / (1400 + Math.abs(z) * 0.48);
      /* Boost the active card slightly above the mathematical value */
      if (ao < 0.5) scale = lerp(scale, scale * 1.06, 1 - ao * 2);

      /* Opacity — plateau around focal plane, hard fade at edges */
      var op = Math.max(0, 1 - smooth(0.65, 3.0, ao));
      /* Active card is always full opacity */
      if (ao < 0.3) op = lerp(op, 1, 1 - ao / 0.3);

      /* Blur — sharp at focal, gentle haze builds with distance.
         Applied only past 0.6 offset to keep adjacent cards crisp. */
      var blur = clamp((ao - 0.6) * 1.4, 0, 3.6);

      /* ---- Organic spatial path ----
         Cards don't travel in a straight line — they thread through
         space in a shallow sinusoidal arc, like film through a gate.
         This is what produces the slipstream impression: each card
         has a slightly different lateral and vertical position. */

      /* X: primary lateral spread + subtle curved approach path */
      var xBase = relOff * (SMALL ? 22 : 17);
      var xCurve = Math.sin(relOff * 0.9) * (SMALL ? 5 : 9);
      var xPct = xBase + xCurve;

      /* Y: cards rise slightly as they recede (forced perspective cue) */
      var yPct = ao * 2.4 * (SMALL ? 0.55 : 1) + Math.sin(ao * 0.7) * 1.8;

      /* Rotation — cards splay and yaw with distance */
      var ry = -relOff * (SMALL ? 6 : 11);          /* yaw */
      var rx = ao * (SMALL ? 1.5 : 2.2);             /* pitch: tilt back */
      var rz = Math.sin(relOff * 0.85) * 1.2;        /* roll: cinematic arc */

      return { xPct:xPct, yPct:yPct, z:z, scale:scale, op:op, blur:blur, ry:ry, rx:rx, rz:rz };
    }


    /* -------------------------------------------------------
       BUILD — create card DOM elements
       ------------------------------------------------------- */
    function build() {
      var stream = $('#indStream');
      var stage  = $('#indStage');
      if (!stream || !stage) return;
      state.stream = stream;
      state.stage  = stage;

      /* drag hint */
      var hint = document.createElement('div');
      hint.className = 'ind__hint run';
      hint.textContent = 'AUTO';
      hint.style.setProperty('--ind-auto', '0');
      stage.appendChild(hint);
      state.hint = hint;

      INDUSTRIES.forEach(function(it, i) {
        var col = IND_COLORS[i] || { ac: '#2DD4BF', a2: '#FB923C' };

        var el = document.createElement('article');
        el.className = 'ind__card';
        el.style.setProperty('--ind-ac', col.ac);
        el.style.setProperty('--ind-a2', col.a2);

        var visEl = document.createElement('div');
        visEl.className = 'ind__card__vis';
        var cv = document.createElement('canvas');
        visEl.appendChild(cv);

        var bodyEl = document.createElement('div');
        bodyEl.className = 'ind__card__body';

        var numEl = document.createElement('p');
        numEl.className = 'ind__card__num';
        numEl.textContent = pad(i + 1) + ' / ' + pad(N);

        var nameEl = document.createElement('h3');
        nameEl.className = 'ind__card__name';
        nameEl.innerHTML = it.t.replace(/<br>/gi, ' ');

        var descEl = document.createElement('p');
        descEl.className = 'ind__card__desc';
        descEl.textContent = it.d;

        var barEl = document.createElement('span');
        barEl.className = 'ind__card__bar';

        bodyEl.appendChild(numEl);
        bodyEl.appendChild(nameEl);
        bodyEl.appendChild(descEl);
        el.appendChild(visEl);
        el.appendChild(bodyEl);
        el.appendChild(barEl);
        stream.appendChild(el);

        state.cards.push(el);
        state.vizData.push({
          cv: cv, ctx: cv.getContext('2d'),
          makeFn: IND_VIZ[i % IND_VIZ.length],
          ac: col.ac, a2: col.a2,
          draw: null, w: 0, h: 0
        });
      });

      sizeCards();
      addEventListener('resize', sizeCards);
      bindIndDrag();

      /* hover */
      stage.addEventListener('mouseenter', function() {
        if (state.status === IST.AUTO) setStatus(IST.HOVER);
      });
      stage.addEventListener('mouseleave', function() {
        if (state.status === IST.HOVER) setStatus(IST.AUTO);
        state.tx = 0; state.ty = 0;
      });
      if (FINE) {
        stage.addEventListener('mousemove', function(e) {
          var r = stage.getBoundingClientRect();
          state.tx = clamp(((e.clientX - r.left) / r.width)  * 2 - 1, -1, 1);
          state.ty = clamp(((e.clientY - r.top)  / r.height) * 2 - 1, -1, 1);
        });
      }
    }

    /* -------------------------------------------------------
       CANVAS SIZE
       ------------------------------------------------------- */
    function sizeCards() {
      state.vizData.forEach(function(v, i) {
        var el = state.cards[i];
        var visEl = el.querySelector('.ind__card__vis');
        if (!visEl) return;
        var w = visEl.clientWidth, h = visEl.clientHeight;
        if (!w || !h) return;
        v.w = w; v.h = h;
        v.cv.width  = Math.round(w * IDPR);
        v.cv.height = Math.round(h * IDPR);
        v.ctx.setTransform(IDPR, 0, 0, IDPR, 0, 0);
        v.draw = (v.makeFn || IND_VIZ[0])(v.ctx, w, h, v.ac, v.a2);
      });
      layoutCards(0);
    }

    /* -------------------------------------------------------
       DRAG BINDING — Pointer Events only
       ------------------------------------------------------- */
    function bindIndDrag() {
      var stream = state.stream;
      if (!stream) return;
      var down = false, axis = null, id = null;
      var step = function() {
        var el = state.cards[0];
        return el ? el.offsetWidth * 0.85 : 300;
      };

      stream.addEventListener('pointerdown', function(e) {
        if (state.status === IST.OFF) return;
        down = true; axis = null; id = e.pointerId;
        state.dragSx = e.clientX;
        state.dragSy = e.clientY;   /* store start Y for axis classification */
        state.dragSCur = state.progress;
        state.dragLast = e.clientX; state.dragLastT = performance.now();
        state.dragVel = 0; state.dragPx = 0;
      });


      stream.addEventListener('pointermove', function(e) {
        if (!down || e.pointerId !== id) return;
        var dx = e.clientX - state.dragSx;
        var dy = e.clientY - state.dragSy;
        if (axis === null) {
          if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
          axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
          if (axis === 'x') {
            setStatus(IST.DRAG);
            stream.classList.add('dragging');
            document.body.classList.add('grabbing');
            try { stream.setPointerCapture(id); } catch(err) {}
          } else { down = false; return; }
        }
        if (axis !== 'x') return;
        state.dragPx = dx;
        state.progress = state.dragSCur - dx / step();
        var now = performance.now();
        var gap = Math.max(1, now - state.dragLastT);
        state.dragVel = -(e.clientX - state.dragLast) / step() / (gap / 1000);
        state.leanT = clamp(-(e.clientX - state.dragLast) * 0.5, -6, 6);
        state.dragLast = e.clientX; state.dragLastT = now;
      });

      function release(e) {
        if (!down || (e && e.pointerId !== id)) return;
        down = false;
        stream.classList.remove('dragging');
        document.body.classList.remove('grabbing');
        state.leanT = 0;
        if (axis !== 'x') { axis = null; return; }
        axis = null;

        var moved = -state.dragPx / step();
        var throwK = clamp(state.dragVel * 0.16, -2.5, 2.5);
        var raw = state.dragSCur + moved + throwK;
        var landed = Math.round(raw);
        landed = clamp(landed, state.dragSCur - 3, state.dragSCur + 3);
        state.dragPx = 0;
        snap(landed, true);
      }
      stream.addEventListener('pointerup', release);
      stream.addEventListener('pointercancel', release);
    }

    /* -------------------------------------------------------
       STATUS
       ------------------------------------------------------- */
    function setStatus(s) {
      if (state.status === s) return;
      state.status = s;
      state.autoT = 0;
      if (s === IST.PAUSED) state.pauseT = IND_RESUME;
      var h = state.hint;
      if (!h) return;
      var label = s === IST.AUTO ? 'AUTO' : (s === IST.DRAG ? 'DRAG' : 'PAUSED');
      h.textContent = label;
      h.classList.toggle('run', s === IST.AUTO);
    }

    /* -------------------------------------------------------
       SNAP — settle to a deterministic card position
       ------------------------------------------------------- */
    function snap(targetIdx, fromDrag) {
      /* keep target on the same turn of the ring as progress */
      var wrapped = ringWrap(targetIdx);
      state.target = state.progress + ringDist(wrapped, state.progress);
      state.rate = fromDrag ? 7 : 9;
      /* notify content system */
      var realIdx = ringWrap(state.target);
      setIndustry(realIdx);
      if (state.status !== IST.OFF) setStatus(IST.SETTLE);
    }

    function autoAdvance() {
      var next = ringWrap(Math.round(state.progress) + 1);
      state.target = state.progress + ringDist(next, state.progress);
      state.rate = 3.8;
      setIndustry(ringWrap(state.target));
    }

    /* -------------------------------------------------------
       LAYOUT — derived from progress, never accumulated
       ------------------------------------------------------- */
    function layoutCards(tt) {
      var n = N;
      tt = tt || 0;

      for (var i = 0; i < n; i++) {
        var el = state.cards[i];
        if (!el) continue;

        /* Shortest-path relative offset on the ring */
        var rawOff = i - ringFrac(state.progress);
        /* Wrap to [-N/2, N/2] */
        rawOff = ((rawOff % N) + N) % N;
        if (rawOff > N / 2) rawOff -= N;

        var ao = Math.abs(rawOff);

        /* Cards beyond 3 positions invisible */
        if (ao > 3.1) {
          if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden';
          continue;
        }
        if (el.style.visibility === 'hidden') el.style.visibility = '';

        var sp = getSlipstreamState(rawOff);

        /* pointer parallax — far cards move less */
        var depth = Math.max(0, 1 - ao * 0.3);
        sp.xPct += state.px * (SMALL ? 4 : 7) * depth;
        sp.yPct += state.py * (SMALL ? 2 : 3.5) * depth;
        sp.ry   += state.px * 3 * depth;
        sp.rx   -= state.py * 3 * depth;

        /* drag lean */
        var layer = ao < 0.5 ? 1 : (ao < 1.5 ? 0.65 : 0.35);
        sp.rz += state.lean * layer * 0.55;
        sp.xPct += (state.dragPx * 0.055 * (layer - 0.3)) /
                   ((el.offsetWidth || 300)) * 100;

        /* idle float */
        var bob = Math.sin(tt * 0.48 + i * 0.95) * 1.2;
        sp.rz += Math.sin(tt * 0.3 + i * 1.3) * 0.45;

        /* entrance blend */
        var k = 1;
        if (state.introProgress < 1) {
          k = clamp(state.introProgress * 1.8 - Math.min(ao, 3) * 0.12, 0, 1);
          k = k * k * (3 - 2 * k);
          sp.xPct += Math.sin(i * 2.3) * 80 * (1 - k);
          sp.yPct += Math.cos(i * 1.7) * 40 * (1 - k) * 0.4;
          sp.rz   += Math.sin(i * 4.1) * 22 * (1 - k);
          sp.scale *= 0.7 + 0.3 * k;
          sp.op   *= k;
          sp.z    -= 280 * (1 - k);
        }

        el.style.transform =
          'translate(-50%,-50%) ' +
          'translate3d(' + sp.xPct.toFixed(2) + '%,' + (sp.yPct + bob).toFixed(2) + '%,' + sp.z.toFixed(1) + 'px)' +
          ' rotateY(' + sp.ry.toFixed(2) + 'deg)' +
          ' rotateX(' + sp.rx.toFixed(2) + 'deg)' +
          ' rotateZ(' + sp.rz.toFixed(2) + 'deg)' +
          ' scale(' + sp.scale.toFixed(4) + ')';
        el.style.opacity = sp.op.toFixed(4);
        el.style.filter  = sp.blur > 0.12 ? 'blur(' + sp.blur.toFixed(2) + 'px)' : '';
        el.style.zIndex  = String(200 - Math.round(ao * 20));

        var isActive = ao < 0.5;
        el.classList.toggle('ind--active', isActive);
        el.setAttribute('aria-hidden', ao > 0.5 ? 'true' : 'false');
      }
    }

    /* -------------------------------------------------------
       SET ACTIVE — called by setIndustry to highlight card
       ------------------------------------------------------- */
    function setActive(i) {
      state.cards.forEach(function(c, k) {
        c.classList.toggle('ind--active', k === i);
      });
    }

    /* -------------------------------------------------------
       UPDATE — called from the main render loop every frame
       ------------------------------------------------------- */
    function update(dt, tt, pos) {
      if (!state.cards.length) return;

      /* Activate/deactivate when section is in view */
      var visible = Math.abs(pos - 4) < 1.3;
      if (visible !== state.live) {
        state.live = visible;
        if (visible) {
          if (state.firstEntry) {
            state.firstEntry = false;
            if (REDUCED) {
              state.introProgress = 1;
              setStatus(IST.AUTO);
              setIndustry(0);
            } else {
              state.introProgress = 0;
              gsap.to(state, {
                introProgress: 1, duration: 2.0, ease: 'power3.out',
                onComplete: function() {
                  setStatus(IST.AUTO);
                  setIndustry(0);
                }
              });
            }
          } else if (state.status === IST.OFF) {
            setStatus(REDUCED ? IST.PAUSED : IST.AUTO);
          }
        } else {
          setStatus(IST.OFF);
        }
      }
      if (!visible) return;

      /* Smooth pointer */
      var sp = 1 - Math.exp(-dt * 7);
      state.px += (state.tx - state.px) * sp;
      state.py += (state.ty - state.py) * sp;
      state.lean += (state.leanT - state.lean) * sp * 0.75;

      /* Glide toward target */
      if (state.status !== IST.DRAG) {
        var d = state.target - state.progress;
        state.progress += d * (1 - Math.exp(-dt * state.rate));
        if (Math.abs(d) < 0.0007) {
          state.progress = state.target;
          if (state.status === IST.SETTLE) setStatus(IST.PAUSED);
        }
      } else {
        /* While dragging: update content to whichever card is centre-stage */
        var cur = ringWrap(Math.round(state.progress));
        if (cur !== indIdx) setIndustry(cur);
      }

      /* Wall-clock timers */
      var wall = clamp(tt - (state.wallLast || tt), 0, 0.5);
      state.wallLast = tt;

      if (state.status === IST.PAUSED) {
        state.pauseT -= wall;
        if (state.pauseT <= 0 && !REDUCED) setStatus(IST.AUTO);
      } else if (state.status === IST.AUTO || state.status === IST.HOVER) {
        if (state.status === IST.AUTO) {
          state.autoT += wall;
          if (state.autoT >= IND_HOLD) { state.autoT = 0; autoAdvance(); }
        }
      }

      /* Hint bar progress */
      var h = state.hint;
      if (h) {
        var barP = state.status === IST.AUTO ? state.autoT / IND_HOLD : 0;
        h.style.setProperty('--ind-auto', clamp(barP, 0, 1).toFixed(4));
      }

      /* Sway for parallax */
      state.sway += ((Math.sin(tt * 0.12) * 2.0 + state.px * 2.2) - state.sway) * sp * 0.45;
      if (state.stream) {
        state.stream.style.transform = 'rotateY(' + state.sway.toFixed(2) + 'deg)';
      }

      layoutCards(tt);

      /* Draw only visible cards' canvases */
      for (var i = 0; i < state.vizData.length; i++) {
        var v = state.vizData[i];
        if (!v.draw) continue;
        var rawOff = i - ringFrac(state.progress);
        rawOff = ((rawOff % N) + N) % N;
        if (rawOff > N / 2) rawOff -= N;
        var ao = Math.abs(rawOff);
        if (ao > 2.2) continue;
        if (REDUCED && v.done) continue;
        var act = clamp(1 - ao * 0.5, 0.1, 1);
        v.draw(tt, act, state.px * (1 - ao * 0.28), state.py * (1 - ao * 0.28));
        v.done = true;
      }
    }

    /* Public API */
    return { build: build, update: update, setActive: setActive };
  }()); /* end IndustrySlipstream IIFE */

  function buildIndexes() {

    var nav = $('#glbNav');
    OFFICES.forEach(function (o, i) {
      var li = document.createElement('li');
      li.innerHTML = '<button type="button"><em></em>' + o.n + '</button>';
      var b = li.querySelector('button');
      b.addEventListener('click', function () { setOffice(i); });
      b.addEventListener('mouseenter', function () { setOffice(i); });
      nav.appendChild(li);
    });

    $('#endNodes').innerHTML = OFFICES.map(function (o) {
      return o.hq ? '<b>' + o.n + '</b>' : o.n;
    }).join(' &nbsp;/&nbsp; ');
  }

  function menu() {
    var btn = $('#menuBtn'), m = $('#menu'), open = false;
    var tl = gsap.timeline({ paused: true })
      .to(m, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
      .fromTo('.menu__l a', { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.95, stagger: 0.055, ease: 'expo.out' }, 0.18)
      .fromTo('.menu__f span', { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }, 0.5);

    function toggle(f) {
      open = typeof f === 'boolean' ? f : !open;
      btn.setAttribute('aria-expanded', String(open));
      m.setAttribute('aria-hidden', String(!open));
      m.classList.toggle('on', open);
      document.body.classList.toggle('mo', open);
      if (open) { tl.play(); if (lenis) lenis.stop(); }
      else { tl.reverse(); if (lenis) lenis.start(); }
    }
    btn.addEventListener('click', function () { toggle(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) toggle(false); });

    $$('[data-go]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var was = open;
        if (open) toggle(false);
        setTimeout(function () { goStation(+a.dataset.go); }, was ? 620 : 0);
      });
    });
  }

  function cursor() {
    if (!FINE || REDUCED) return;
    var c = $('.cur'), l = $('.cur__l');
    var xTo = gsap.quickTo(c, 'x', { duration: 0.55, ease: 'power3' });
    var yTo = gsap.quickTo(c, 'y', { duration: 0.55, ease: 'power3' });
    addEventListener('mousemove', function (e) {
      gsap.to(c, { opacity: 1, duration: 0.3, overwrite: 'auto' });
      xTo(e.clientX); yTo(e.clientY);
    }, { passive: true });
    $$('a,button,.card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { c.classList.add('wide'); });
      el.addEventListener('mouseleave', function () { c.classList.remove('wide'); });
    });
    $$('[data-cur]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { l.textContent = el.dataset.cur; c.classList.add('lab'); });
      el.addEventListener('mouseleave', function () { c.classList.remove('lab'); });
    });
  }

  function formAndClock() {
    var f = $('#form'), msg = $('#formMsg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('input[required]', f).forEach(function (i) {
        var bad = !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        i.closest('.fm__r').classList.toggle('bad', bad);
        if (bad) ok = false;
      });
      msg.textContent = ok
        ? 'RECEIVED — CONNECT THIS FORM TO THE COMMNET ENDPOINT TO DELIVER IT'
        : 'COMPLETE THE REQUIRED FIELDS';
      msg.style.color = ok ? 'var(--w2)' : 'var(--sigt)';
    });

    var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false });
    var paint = function () { $('#hudTime').textContent = fmt.format(new Date()); };
    paint(); setInterval(paint, 20000);
    $('#yr').textContent = String(new Date().getFullYear());

    $('#qX').addEventListener('click', function () { setQuote(qIdx + 1); });
    $('#qP').addEventListener('click', function () { setQuote(qIdx - 1); });
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function boot(after) {
    var el = $('#boot');
    if (REDUCED) {
      document.body.classList.remove('booting');
      if (el) el.remove();
      gsap.set('.hud', { opacity: 1 });
      after();
      return;
    }
    var n = { v: 0 };
    gsap.timeline({ onComplete: function () {
        document.body.classList.remove('booting');
        el.remove();
        after();
      } })
      .to('.boot__pt', { scale: 1, duration: 0.5, ease: 'expo.out' })
      .to('.boot__hud', { opacity: 1, duration: 0.4 }, 0.1)
      .to(n, { v: 100, duration: 0.85, ease: 'power2.inOut',
        onUpdate: function () { $('#bootN').textContent = String(Math.round(n.v)).padStart(3, '0'); } }, 0.15)
      .to('#bootB', { scaleX: 1, duration: 0.85, ease: 'power2.inOut' }, 0.15)
      .to('.boot__pt', { scale: 70, opacity: 0, duration: 0.6, ease: 'expo.in' }, 0.95)
      .to(el, { opacity: 0, duration: 0.4 }, 1.1);
  }

  function arrival() {
    gsap.to('.hud', { opacity: 1, duration: 1, ease: 'power3.out' });
    if (REDUCED) return;
    var lines = $$('.sc--01 .ty__l > span');
    gsap.set(lines, { yPercent: 120 });
    gsap.to(lines, { yPercent: 0, duration: 1.5, ease: 'expo.out', stagger: 0.12, delay: 0.1 });
    gsap.fromTo('.sc--01 .mi', { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.5 });
  }

  /* =========================================================
     GO
     ========================================================= */
  prepScenes();
  buildDeck();
  ind.build();        /* boot the IndustrySlipstream */
  buildIndexes();
  menu();
  cursor();
  formAndClock();

  if (!T) {
    document.body.classList.remove('booting');
    if ($('#boot')) $('#boot').remove();
    gsap.set('.hud', { opacity: 1 });
    return;
  }

  camPos = new T.Vector3();
  camLook = new T.Vector3();
  dummy = new T.Object3D();

  buildEnvironment();
  buildHero();
  buildSlabs();
  buildMonolith();
  buildSystem();
  buildIndustries();
  buildNetwork();
  buildQuote();
  buildInsights();
  buildCta();
  buildContact();

  setSolution(0);
  /* setIndustry is called by the slipstream on first entry — skip bare call */
  setOffice(0);
  setInsight(0);
  setQuote(0);

  readScroll();
  driveScenes(progress);

  if (REDUCED) {
    renderer.render(scene, camera);
    document.body.classList.remove('booting');
    if ($('#boot')) $('#boot').remove();
    gsap.set('.hud', { opacity: 1 });
  } else {
    requestAnimationFrame(frame);
    boot(arrival);
  }
})();
