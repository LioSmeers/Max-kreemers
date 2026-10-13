/* Original implementation. Visual references and licence review: qa/hero-electric-cursor.md. */
(() => {
  const canvas = document.querySelector('.homepage-electric-cursor');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const concept = new URLSearchParams(location.search).get('cursor') === '2' ? 2 : 1;
  const MAX_POINTS = 40;
  const MAX_BRANCHES = 4;
  const MAX_LIFE = 440;
  let points = [], branches = [];
  let frame = 0, width = 0, height = 0;
  let enabled = false, intensity = 0;
  let lastBranch = 0, serial = 0;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const noise = n => Math.sin(n * 12.9898 + 78.233) * 43758.5453 % 1;
  const clear = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; points = []; branches = []; intensity = 0;
    ctx.clearRect(0, 0, width, height);
  };
  const measure = () => {
    clear();
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  };
  // Keep the light gentle over readable content, including the white header/footer.
  // Store this per sample rather than measuring every text element while scrolling.
  const strengthAt = target => target instanceof Element && target.closest('a, button, h1, h2, h3, h4, p, figcaption, label, summary') ? .45 : 1;
  const pathBetween = (a, b, now, seed, spread) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    const steps = concept === 2 ? clamp(Math.ceil(length / 6), 5, 14) : clamp(Math.ceil(length / 11), 2, 7);
    ctx.beginPath(); ctx.moveTo(a.x, a.y);
    for (let j = 1; j < steps; j++) {
      const part = j / steps;
      const envelope = Math.sin(part * Math.PI);
      const wobble = concept === 2
        ? (Math.sin(part * 11 + now / 105 + seed * .7) * .65 + Math.sin(part * 23 - now / 70 + seed) * .35) * spread * 2.1 * envelope
        : (Math.sin(now / 45 + seed * 2.3 + j * 4.1) * .5 + noise(seed + j) * .5) * spread;
      ctx.lineTo(a.x + dx * part - dy / length * wobble, a.y + dy * part + dx / length * wobble);
    }
    ctx.lineTo(b.x, b.y);
  };
  const stroke = (alpha, power, branch = false) => {
    // One geometry, three narrow strokes: blue contrast edge, soft halo, pale core.
    ctx.globalAlpha = alpha;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(0,107,175,.42)'; ctx.lineWidth = branch ? 1.8 : 2.7; ctx.stroke();
    ctx.shadowColor = '#65cfff'; ctx.shadowBlur = 7 + power * 2;
    ctx.strokeStyle = 'rgba(112,211,255,.35)'; ctx.lineWidth = branch ? 1 : 1.8; ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(235,250,255,.88)'; ctx.lineWidth = branch ? .55 : .85 + power * .25; ctx.stroke();
  };
  const render = now => {
    frame = 0;
    if (!enabled || document.hidden) { clear(); return; }
    ctx.clearRect(0, 0, width, height);
    points = points.filter(point => now - point.time < point.life);
    branches = branches.filter(branch => now - branch.time < branch.life);
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i];
      const fade = Math.pow(clamp(1 - (now - a.time) / a.life, 0, 1), 1.5);
      const power = b.power;
      const alpha = fade * (.55 + power * .3) * Math.min(a.strength, b.strength);
      pathBetween(a, b, now, b.seed, 2.5 + power * 3);
      stroke(alpha, power);
    }
    branches.forEach(branch => {
      const fade = Math.pow(1 - (now - branch.time) / branch.life, 2);
      pathBetween(branch.a, branch.b, now, branch.seed, 3);
      stroke(fade * .45 * branch.strength, branch.power, true);
    });
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    // No idle loop. The last pixel has disappeared by MAX_LIFE after movement.
    if (points.length > 1 || branches.length) frame = requestAnimationFrame(render);
    else { points = []; ctx.clearRect(0, 0, width, height); }
  };
  const move = event => {
    if (!enabled || document.hidden || event.pointerType === 'touch') return;
    const now = performance.now();
    const strength = strengthAt(event.target);
    const events = event.getCoalescedEvents?.() || [];
    const samples = events.length ? events.slice(-8) : [event];
    samples.forEach(sample => {
      const x = sample.clientX, y = sample.clientY;
      if (x < 0 || y < 0 || x > width || y > height) return;
      const time = now - clamp(event.timeStamp - sample.timeStamp, 0, 50);
      let previous = points.at(-1);
      if (previous && time - previous.time >= MAX_LIFE) { clear(); previous = null; }
      if (previous) {
        const distance = Math.hypot(x - previous.x, y - previous.y);
        if (distance < .8) return; // Do not keep a stationary trail alive.
        const speed = clamp(distance / Math.max(8, time - previous.time), 0, 2.5) / 2.5;
        intensity = intensity * .55 + speed * .45;
        if (now - lastBranch > 65 && branches.length < MAX_BRANCHES && distance > 5) {
          const sign = ++serial % 2 ? 1 : -1;
          const length = concept === 2 ? 16 + intensity * 25 : 9 + intensity * 17;
          branches.push({ a: { x: previous.x, y: previous.y }, b: { x: previous.x - (y - previous.y) / distance * length * sign + (x - previous.x) * .25, y: previous.y + (x - previous.x) / distance * length * sign + (y - previous.y) * .25 }, time: now, life: (concept === 2 ? 175 : 130) + intensity * 60, power: intensity, strength, seed: serial });
          lastBranch = now;
        }
      }
      points.push({ x, y, time, life: 310 + intensity * 130, power: intensity, strength, seed: ++serial });
      if (points.length > MAX_POINTS) points.splice(0, points.length - MAX_POINTS);
      // Limit physical length too, so fast pointer jumps cannot flood the viewport.
      let travelled = 0;
      for (let i = points.length - 1; i > 0; i--) {
        travelled += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
        if (travelled > 350 + intensity * 180) { points.splice(0, i); break; }
      }
    });
    if (!frame && points.length > 1) frame = requestAnimationFrame(render);
  };
  const preference = () => {
    enabled = fine.matches && !reduced.matches;
    canvas.hidden = !enabled;
    measure();
  };
  document.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerleave', clear);
  document.addEventListener('pointercancel', clear);
  // Viewport coordinates prevent jumps between sections. Clear stale points on scroll.
  addEventListener('scroll', clear, { passive: true });
  addEventListener('blur', clear);
  document.addEventListener('visibilitychange', clear);
  addEventListener('resize', measure);
  fine.addEventListener('change', preference);
  reduced.addEventListener('change', preference);
  let resolution;
  const watchResolution = () => {
    resolution?.removeEventListener('change', watchResolution);
    resolution = matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    resolution.addEventListener('change', watchResolution);
    measure();
  };
  document.fonts.ready.then(measure);
  preference();
  watchResolution();
})();
