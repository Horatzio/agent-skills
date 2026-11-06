(function () {
  'use strict';
  /*
    Star Net background — v5 behaviour, adapted as the animated background of the skills load page (docs/load.html).
    From the ThreeJS skillbook: threejs-particle-canvas Cosmic preset +
    fundamentals / shaders / postprocessing. Cosmic phases:
    Nebula → Collapse → Ignition → Orbit → Expansion → Entropy, 180s cycle.
    Dodecahedron animation runs 3× faster than v4: lattice tumbles 72° about
    a vertex axis at each phase change in 1.25s, its own shrink/expand eases
    over 2s, and its spin runs at t×0.15. Other phase values ease over 6s,
    particles at 0.5× real speed, wobble coefficient 0.02, 2,200 twinkling
    stars, 1,100 orbiting particles, FogExp2 0.006 base, Midnight Galaxy
    palette, pointer parallax. Centred inside the lattice is a white
    low-poly brain — dots joined by lines, sampled from a real brain
    model (see brain-data.js), radius ≈2.25 — turning slowly
    on its own axis at 0.1 rad/s.
  */

  if (typeof THREE === 'undefined') {
    return; /* no Three.js: the page's CSS starfield stays as the background */
  }

  var COOL = new THREE.Color(0xb388ff);
  var WARM = new THREE.Color(0xffd54f);
  var BG = new THREE.Color(0x2b1e3e);

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('star-net'), antialias: true, alpha: true });
  } catch (e) {
    return; /* no WebGL: the page's CSS starfield stays as the background */
  }
  var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(DPR);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.006);
  var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);

  function spriteTexture() {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d');
    var grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }
  var sprite = spriteTexture();

  /* ---- background star field: 2200 stars, slow twinkle ---- */
  var STAR_COUNT = 2200;
  var starGeo = new THREE.BufferGeometry();
  (function () {
    var pos = new Float32Array(STAR_COUNT * 3);
    var phase = new Float32Array(STAR_COUNT);
    var size = new Float32Array(STAR_COUNT);
    for (var i = 0; i < STAR_COUNT; i++) {
      var r = 30 + Math.random() * 60;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) * 0.7;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      phase[i] = Math.random() * Math.PI * 2;
      size[i] = 0.6 + Math.random() * 1.6;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  })();
  var starMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uMap: { value: sprite }, uColor: { value: new THREE.Color(0xe6e6fa) } },
    vertexShader: [
      'attribute float aPhase; attribute float aSize;',
      'uniform float uTime; varying float vTw;',
      'void main() {',
      '  vTw = 0.55 + 0.45 * sin(uTime * 0.6 + aPhase);',
      '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
      '  gl_PointSize = aSize * (140.0 / -mv.z);',
      '  gl_Position = projectionMatrix * mv;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform sampler2D uMap; uniform vec3 uColor; varying float vTw;',
      'void main() {',
      '  vec4 tex = texture2D(uMap, gl_PointCoord);',
      '  gl_FragColor = vec4(uColor, tex.a * vTw * 0.85);',
      '}'
    ].join('\n'),
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  var stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* ---- free particles: 1100, slow orbits around the lattice ---- */
  var P_COUNT = 1100;
  var pBase = [];
  var pGeo = new THREE.BufferGeometry();
  (function () {
    var pos = new Float32Array(P_COUNT * 3);
    for (var i = 0; i < P_COUNT; i++) {
      pBase.push({
        r: 4 + Math.random() * 11,
        th: Math.random() * Math.PI * 2,
        ph: Math.acos(2 * Math.random() - 1),
        speed: (0.01 + Math.random() * 0.03) * (Math.random() < 0.5 ? 1 : -1) * 0.5,
        wob: 0.3 + Math.random() * 0.9
      });
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  })();
  var pMat = new THREE.PointsMaterial({
    size: 0.22, map: sprite, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, color: 0xb388ff, opacity: 0.75, sizeAttenuation: true
  });
  var particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  /* ---- dodecahedron lattice: nodes + threads ---- */
  var lattice = new THREE.Group();
  var LATTICE_R = 5.5;
  var dodeca = new THREE.DodecahedronGeometry(LATTICE_R, 1);
  var nodeGeo = new THREE.BufferGeometry();
  (function () {
    var v = dodeca.attributes.position;
    var seen = {}; var pts = [];
    for (var i = 0; i < v.count; i++) {
      var key = [v.getX(i), v.getY(i), v.getZ(i)].map(function (n) { return n.toFixed(2); }).join(',');
      if (!seen[key]) { seen[key] = 1; pts.push(v.getX(i), v.getY(i), v.getZ(i)); }
    }
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  })();
  var nodeMat = new THREE.PointsMaterial({
    size: 0.5, map: sprite, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, color: 0xffd54f, opacity: 0.95, sizeAttenuation: true
  });
  lattice.add(new THREE.Points(nodeGeo, nodeMat));
  var edgeGeo = new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(LATTICE_R, 0));
  var threadMat = new THREE.LineBasicMaterial({ color: 0xa490c2, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
  lattice.add(new THREE.LineSegments(edgeGeo, threadMat));
  /* Drawn last (see brain.renderOrder below) so the dodecahedron sits
     visually on top of the brain inside it. */
  lattice.renderOrder = 2;
  scene.add(lattice);

  /* ---- poly brain: white dots + connected lines, centred in the lattice ----
     Shape sampled from a REAL brain model, not a procedural stand-in: the
     NIH 3D Print Exchange brain mesh 3DPX-003765 (MRI-based, by Nevit
     Dilmen, via Wikimedia Commons; 82,438 tris) was cropped below the
     brainstem and vertex-cluster decimated at build time into 100
     points + 293 edges (reduced from the original 1,250-point sampling
     via farthest-point sampling), normalised to a 4.5-unit max extent (bounding
     radius 2.25 ≈ the lattice at Ignition start, scale 0.4 × radius
     5.5 ≈ 2.2) and centred on the origin, frontal pole toward +Z. The
     data ships in brain-data.js as BRAIN_POINTS / BRAIN_EDGES.
     Pure white, far brighter than the gold/lavender lattice, and NOT a
     child of the lattice: it turns slowly on its own axis in renderAt(). */
  var brain = new THREE.Group();
  (function buildBrain() {
    if (typeof BRAIN_POINTS === 'undefined' || typeof BRAIN_EDGES === 'undefined') return;
    var dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BRAIN_POINTS), 3));
    var dotMat = new THREE.PointsMaterial({
      size: 0.17, map: sprite, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xffffff, opacity: 1, sizeAttenuation: true
    });
    brain.add(new THREE.Points(dotGeo, dotMat));

    var linePos = new Float32Array(BRAIN_EDGES.length * 3);
    for (var i = 0; i < BRAIN_EDGES.length; i++) {
      var p = BRAIN_EDGES[i] * 3;
      linePos[i * 3] = BRAIN_POINTS[p];
      linePos[i * 3 + 1] = BRAIN_POINTS[p + 1];
      linePos[i * 3 + 2] = BRAIN_POINTS[p + 2];
    }
    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    var lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    brain.add(new THREE.LineSegments(lineGeo, lineMat));
  })();
  /* Rendered before the lattice (renderOrder 2) so the dodecahedron
     displays on top of the brain. */
  brain.renderOrder = 1;
  scene.add(brain);

  /* ---- Cosmic phases (180s cycle, v4 durations) ---- */
  var PHASES = [
    { name: 'Nebula',    dur: 30, scale: 1.35, spread: 1.5, warm: 0.05, threads: 0.15, camR: 34, fog: 0.008 },
    { name: 'Collapse',  dur: 20, scale: 0.4,  spread: 0.55, warm: 0.25, threads: 0.45, camR: 26, fog: 0.006 },
    { name: 'Ignition',  dur: 16, scale: 1.7,  spread: 1.1, warm: 1.0,  threads: 0.8,  camR: 24, fog: 0.004 },
    { name: 'Orbit',     dur: 50, scale: 1.0,  spread: 1.0, warm: 0.35, threads: 0.55, camR: 30, fog: 0.006 },
    { name: 'Expansion', dur: 40, scale: 2.1,  spread: 1.9, warm: 0.2,  threads: 0.25, camR: 38, fog: 0.008 },
    { name: 'Entropy',   dur: 24, scale: 1.5,  spread: 2.4, warm: 0.0,  threads: 0.08, camR: 36, fog: 0.010 }
  ];
  var CYCLE = 0, PHASE_STARTS = [];
  PHASES.forEach(function (p) { PHASE_STARTS.push(CYCLE); CYCLE += p.dur; });

  function phaseAt(t) {
    var cycle = Math.floor(t / CYCLE);
    var tt = t - cycle * CYCLE;
    var start = cycle * CYCLE;
    for (var i = 0; i < PHASES.length; i++) {
      var p = PHASES[i];
      if (tt < p.dur) return { p: p, idx: i, prog: tt / p.dur, index: cycle * PHASES.length + i, start: start };
      tt -= p.dur; start += p.dur;
    }
    return { p: PHASES[0], idx: 0, prog: 0, index: cycle * PHASES.length, start: cycle * CYCLE };
  }

  /* Side transitions: tumble 72° about a vertex (5-fold) axis per phase change */
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  var tumbleRand = mulberry32(20261105);
  var vertexAxes = (function () {
    var g = new THREE.DodecahedronGeometry(1, 0);
    var v = g.attributes.position; var seen = {}; var axes = [];
    for (var i = 0; i < v.count; i++) {
      var key = [v.getX(i), v.getY(i), v.getZ(i)].map(function (n) { return n.toFixed(2); }).join(',');
      if (!seen[key]) { seen[key] = 1; axes.push(new THREE.Vector3(v.getX(i), v.getY(i), v.getZ(i)).normalize()); }
    }
    return axes;
  })();
  var tumbles = [];
  function getTumble(i) {
    while (tumbles.length <= i) {
      var axis = vertexAxes[Math.floor(tumbleRand() * vertexAxes.length)];
      tumbles.push(new THREE.Quaternion().setFromAxisAngle(axis, 2 * Math.PI / 5));
    }
    return tumbles[i];
  }
  var TUMBLE_SECS = 1.25; /* 3× faster than v4's 3.75s */
  function smoothstep(x) { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); }
  function tumbleQuaternionAt(t) {
    var info = phaseAt(t);
    var base = new THREE.Quaternion();
    for (var i = 0; i < info.index; i++) base.premultiply(getTumble(i));
    var target = base.clone().premultiply(getTumble(info.index));
    return base.slerp(target, smoothstep((t - info.start) / TUMBLE_SECS));
  }

  /* Phase values ease over the first 6s of each phase — no instant size
     jumps. The dodecahedron's own scale eases over 2s instead (3× faster
     than v4), matching the v5 speedup; the scene values keep the 6s ease. */
  var EASE_SECS = 6;
  var SCALE_EASE_SECS = 2;
  function phaseValuesAt(t) {
    var info = phaseAt(t);
    var prev = PHASES[((info.index - 1) % PHASES.length + PHASES.length) % PHASES.length];
    var e = smoothstep((t - info.start) / EASE_SECS);
    var eScale = smoothstep((t - info.start) / SCALE_EASE_SECS);
    var vals = {};
    ['spread', 'warm', 'threads', 'camR', 'fog'].forEach(function (k) {
      vals[k] = prev[k] + (info.p[k] - prev[k]) * e;
    });
    vals.scale = prev.scale + (info.p.scale - prev.scale) * eScale;
    return { p: info.p, idx: info.idx, prog: info.prog, vals: vals };
  }

  /* ---- camera: slow orbit + pointer parallax (4s cooldown) ---- */
  var theta = 0.6, phi = 1.12;
  var px = 0, py = 0, lastPointer = -10;
  var simTime = 0;
  window.addEventListener('pointermove', function (e) {
    px = (e.clientX / window.innerWidth - 0.5) * 2;
    py = (e.clientY / window.innerHeight - 0.5) * 2;
    lastPointer = simTime;
  });
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  var tmpColor = new THREE.Color();
  var spinEuler = new THREE.Euler();
  var spinQ = new THREE.Quaternion();

  function renderAt(t, dt) {
    var info = phaseValuesAt(t);
    var cur = info.vals;

    stars.rotation.y += 0.004 * dt;
    theta += 0.02 * dt;

    spinEuler.set(Math.sin(t * 0.15) * 0.15, t * 0.15, 0); /* spin 3× faster than v4 */
    spinQ.setFromEuler(spinEuler);
    lattice.quaternion.copy(tumbleQuaternionAt(t)).multiply(spinQ);
    lattice.scale.setScalar(cur.scale);
    threadMat.opacity = cur.threads;

    /* brain: slow turn on its own axis, independent of the lattice */
    brain.rotation.y = t * 0.1;

    var pos = pGeo.attributes.position.array;
    for (var i = 0; i < P_COUNT; i++) {
      var b = pBase[i];
      var th = b.th + t * b.speed;
      var r = b.r * cur.spread;
      var wob = Math.sin(t * 0.02 * b.wob + b.th) * 0.4; /* wobble coefficient 0.02 */
      pos[i * 3] = r * Math.sin(b.ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(b.ph) * 0.7 + wob;
      pos[i * 3 + 2] = r * Math.sin(b.ph) * Math.sin(th);
    }
    pGeo.attributes.position.needsUpdate = true;
    tmpColor.copy(COOL).lerp(WARM, cur.warm);
    pMat.color.copy(tmpColor);
    nodeMat.color.copy(tmpColor);

    starMat.uniforms.uTime.value = t;
    scene.fog.density = cur.fog;

    var idle = t - lastPointer > 4;
    var targetTheta = theta + (idle ? 0 : px * 0.12);
    var targetPhi = phi + (idle ? 0 : py * 0.06);
    camera.position.set(
      cur.camR * Math.sin(targetPhi) * Math.sin(targetTheta),
      cur.camR * Math.cos(targetPhi),
      cur.camR * Math.sin(targetPhi) * Math.cos(targetTheta)
    );
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    return info;
  }

  /* Reduced motion: render one static frame instead of animating. */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var playing = !reduceMotion;

  var last = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (playing) simTime += dt;
    renderAt(simTime, playing ? dt : 0);
  }
  requestAnimationFrame(frame);
})();
