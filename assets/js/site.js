---
---
/* =========================================================================
   Lucas Benjamin, site behaviour
   1. EEG montage backdrops (seamless horizontal drift)
   2. "Baby" easter egg: the montage goes 10x noisier on hover
   3. Mobile navigation
   4. Scroll reveals + header state
   5. Publication filters (topic x population)
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- EEG -- */

  var NS = 'http://www.w3.org/2000/svg';
  var NOISE_BOOST = 10;          // easter-egg multiplier on the stochastic terms

  var PRESETS = {
    band: {
      spacing: 30,
      width: 1.0,
      amp: [4, 5],
      drift: 115,
      palette: ['#2f6b9e', '#b4573f', '#2f7d6c', '#b5842f', '#6f4a83', '#4d7c4c', '#93384f']
    },
    paper: {
      spacing: 38,
      width: 0.85,
      amp: [3.5, 4],
      drift: 200,
      palette: ['#3a6ea5', '#c0654c', '#3d8b7a', '#c8943a', '#7d5491', '#5b8c5a', '#a04060']
    }
  };

  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /* One channel: band-limited oscillations + smoothed drift + jitter + spikes.
     `noise` scales every stochastic term. The tail is cross-faded back into the
     head so the trace tiles seamlessly when translated by exactly one width. */
  function channel(w, step, cfg, noise) {
    var amp = cfg.amp[0] + Math.random() * cfg.amp[1];
    var f1 = 0.004 + Math.random() * 0.006;
    var f2 = 0.02 + Math.random() * 0.03;
    var f3 = 0.06 + Math.random() * 0.08;
    var p1 = Math.random() * Math.PI * 2;
    var p2 = Math.random() * Math.PI * 2;
    var p3 = Math.random() * Math.PI * 2;

    var n = Math.ceil(w / step);
    var vals = new Float32Array(n);
    var smooth = 0;

    for (var i = 0; i < n; i++) {
      var x = i * step;
      var wave = amp * (
        Math.sin(x * f1 + p1) * 0.7 +
        Math.sin(x * f2 + p2) * 0.4 +
        Math.sin(x * f3 + p3) * 0.25
      );
      smooth = smooth * 0.72 + gauss() * 1.1 * noise;
      var spike = Math.random() < 0.0018 * Math.min(noise, 4)
        ? (Math.random() < 0.5 ? -1 : 1) * (9 + Math.random() * 15) * noise
        : 0;
      vals[i] = wave + smooth + gauss() * 1.5 * noise + spike;
    }

    // Cross-fade the last 12% into the first 12% so vals[n] === vals[0].
    var blend = Math.max(8, Math.floor(n * 0.12));
    for (var k = 0; k < blend; k++) {
      var t = k / blend;
      var j = n - blend + k;
      vals[j] = vals[j] * (1 - t) + vals[k] * t;
    }
    return vals;
  }

  /* Turn one channel's samples into a path string spanning two tiles. */
  function pathData(vals, y0, n, step) {
    var d = new Array(n * 2 + 1);
    for (var i = 0; i <= n * 2; i++) {
      d[i] = (i === 0 ? 'M' : 'L') + (i * step) + ' ' + (y0 + vals[i % n]).toFixed(1);
    }
    return d.join(' ');
  }

  var eegHosts = [];

  /* Build the montage once. Both noise levels share the SAME <path> elements:
     switching to the agitated state only rewrites their `d` attribute. Keeping
     a single set of paths avoids compositing two full-size montages at once,
     which is what used to leave parts of the hero unpainted. */
  function drawEeg(host) {
    var cfg = PRESETS[host.getAttribute('data-eeg-variant')] || PRESETS.paper;
    var svg = host.querySelector('.eeg__svg');
    var group = host.querySelector('.eeg__drift');
    if (!svg || !group) return;

    var wasAgitated = host._eeg ? host._eeg.agitated : false;

    var w = Math.max(320, host.clientWidth || window.innerWidth);
    var h = Math.max(200, host.clientHeight || window.innerHeight);
    var step = 2;
    var rows = Math.ceil(h / cfg.spacing) + 1;
    var top = (h - (rows - 1) * cfg.spacing) / 2;
    var n = Math.ceil(w / step);

    svg.setAttribute('viewBox', '0 0 ' + (w * 2) + ' ' + h);
    while (group.firstChild) group.removeChild(group.firstChild);

    var calm = new Array(rows);
    for (var r = 0; r < rows; r++) {
      var y0 = top + r * cfg.spacing;
      calm[r] = pathData(channel(w, step, cfg, 1), y0, n, step);

      var path = document.createElementNS(NS, 'path');
      path.setAttribute('d', calm[r]);
      path.setAttribute('stroke', cfg.palette[r % cfg.palette.length]);
      path.setAttribute('stroke-width', String(cfg.width));
      path.setAttribute('fill', 'none');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      group.appendChild(path);
    }

    host._eeg = {
      cfg: cfg, w: w, h: h, step: step, rows: rows, top: top, n: n,
      calm: calm, loud: null, agitated: wasAgitated
    };

    // The <svg> is 200% wide and holds two identical tiles, so translating it
    // by -50% of its own width advances exactly one tile: a seamless loop.
    if (!reduceMotion) {
      svg.style.animation = 'eeg-drift ' + cfg.drift + 's linear infinite';
    }

    if (wasAgitated) { buildLoud(host); applyLevel(host, true); }
  }

  /* The ten-times-noisier variant of the same channels, same geometry. */
  function buildLoud(host) {
    var m = host._eeg;
    if (!m || m.loud) return;
    var loud = new Array(m.rows);
    for (var r = 0; r < m.rows; r++) {
      loud[r] = pathData(
        channel(m.w, m.step, m.cfg, NOISE_BOOST),
        m.top + r * m.cfg.spacing, m.n, m.step
      );
    }
    m.loud = loud;
  }

  function applyLevel(host, on) {
    var m = host._eeg;
    if (!m) return;
    var src = on ? m.loud : m.calm;
    if (!src) return;
    var paths = host.querySelectorAll('.eeg__drift path');
    for (var i = 0; i < paths.length && i < src.length; i++) {
      paths[i].setAttribute('d', src[i]);
    }
  }

  function initEeg() {
    eegHosts = Array.prototype.slice.call(document.querySelectorAll('[data-eeg]'));
    eegHosts.forEach(drawEeg);

    // Watch the hosts themselves: the hero's height tracks its content and its
    // vh-based padding, which a window `resize` listener on width alone missed.
    var timer;
    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(function () { eegHosts.forEach(drawEeg); }, 220);
    }

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        var stale = entries.some(function (e) {
          var m = e.target._eeg;
          if (!m) return true;
          return Math.abs(e.target.clientWidth - m.w) > 24 ||
                 Math.abs(e.target.clientHeight - m.h) > 24;
        });
        if (stale) schedule();
      });
      eegHosts.forEach(function (host) { ro.observe(host); });
    } else {
      var lastW = window.innerWidth;
      window.addEventListener('resize', function () {
        if (Math.abs(window.innerWidth - lastW) < 40) return;
        lastW = window.innerWidth;
        schedule();
      });
    }
  }

  /* ----------------------------------------------------------- easter egg -- */

  /* Hovering "baby", "newborn", "infant" or "neonate" anywhere on the page
     makes the background montage ten times noisier. */
  var BABY_SRC = '\\b(bab(?:y|ies)|newborns?|infants?|neonates?)\\b';
  var BABY = new RegExp(BABY_SRC, 'i');
  var BABY_G = new RegExp(BABY_SRC, 'gi');
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, SVG: 1, CODE: 1 };

  function markBabyWords(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentNode;
        if (!parent || SKIP[parent.nodeName]) return NodeFilter.FILTER_REJECT;
        if (parent.classList && parent.classList.contains('eeg-trigger')) return NodeFilter.FILTER_REJECT;
        // Prose only: filter chips and population tags would otherwise set the
        // egg off every time the mouse crosses the publication list.
        if (parent.closest && parent.closest('.eeg, .chip, .pub-topic, .filter-bar__label')) {
          return NodeFilter.FILTER_REJECT;
        }
        return BABY.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    var targets = [], node;
    while ((node = walker.nextNode())) targets.push(node);

    targets.forEach(function (text) {
      var frag = document.createDocumentFragment();
      var last = 0, m;
      BABY_G.lastIndex = 0;
      while ((m = BABY_G.exec(text.nodeValue))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.nodeValue.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = 'eeg-trigger';
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < text.nodeValue.length) frag.appendChild(document.createTextNode(text.nodeValue.slice(last)));
      text.parentNode.replaceChild(frag, text);
    });

    return targets.length;
  }

  function setAgitated(on) {
    eegHosts.forEach(function (host) {
      var m = host._eeg;
      if (!m) return;
      m.agitated = !!on;
      if (on) buildLoud(host);
      applyLevel(host, on);
      host.classList.toggle('is-agitated', !!on);
    });
  }

  /* Build the noisy variant ahead of time so the first hover costs nothing. */
  function warmAgitated() { eegHosts.forEach(buildLoud); }

  function initEasterEgg() {
    // An abrupt full-background change is exactly what reduced-motion asks to avoid.
    if (reduceMotion) return;
    if (!markBabyWords(document.body)) return;

    if (window.requestIdleCallback) {
      requestIdleCallback(warmAgitated, { timeout: 3000 });
    } else {
      setTimeout(warmAgitated, 1200);
    }

    var live = 0;
    document.addEventListener('mouseover', function (e) {
      if (!e.target.classList || !e.target.classList.contains('eeg-trigger')) return;
      live++;
      setAgitated(true);
    });
    document.addEventListener('mouseout', function (e) {
      if (!e.target.classList || !e.target.classList.contains('eeg-trigger')) return;
      live = Math.max(0, live - 1);
      if (!live) setAgitated(false);
    });
  }

  /* ----------------------------------------------------------------- nav -- */

  function initNav() {
    var btn = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!btn || !nav) return;

    function close() {
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      document.body.classList.toggle('nav-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ------------------------------------------------- header + reveals -- */

  function initScroll() {
    var header = document.getElementById('site-header');

    function onScroll() {
      if (header) header.classList.toggle('is-stuck', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------ filters -- */

  /* Two independent facets (topic, population) combined with AND. */
  function initFilters() {
    var bars = document.querySelectorAll('[data-filter-group]');
    if (!bars.length) return;

    var items = document.querySelectorAll('[data-topics]');
    var empty = document.querySelector('[data-filter-empty]');
    var active = {};

    Array.prototype.forEach.call(bars, function (bar) {
      active[bar.getAttribute('data-filter-group')] = 'all';
      bar.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-filter]');
        if (!btn) return;
        var group = bar.getAttribute('data-filter-group');
        active[group] = btn.getAttribute('data-filter');
        Array.prototype.forEach.call(bar.querySelectorAll('[data-filter]'), function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        apply();
      });
    });

    function matches(item, group, key) {
      if (key === 'all') return true;
      var attr = item.getAttribute('data-' + group) || '';
      return (' ' + attr + ' ').indexOf(' ' + key + ' ') > -1;
    }

    function apply() {
      var shown = 0;
      Array.prototype.forEach.call(items, function (item) {
        var ok = Object.keys(active).every(function (g) { return matches(item, g, active[g]); });
        item.hidden = !ok;
        if (ok) shown++;
      });

      // A year rule only makes sense while that year still has visible entries.
      Array.prototype.forEach.call(document.querySelectorAll('[data-year-group]'), function (grp) {
        grp.hidden = !grp.querySelector('[data-topics]:not([hidden])');
      });

      if (empty) empty.hidden = shown > 0;
    }
  }

  /* ------------------------------------------------------------------- */

  function start() {
    initEeg();
    initEasterEgg();
    initNav();
    initScroll();
    initFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
