(() => {
  const main = document.querySelector('#inhoud');
  const svg = main?.querySelector('.current-line');
  if (!svg) return;
  const hero = main.querySelector('.hero');
  const services = main.querySelector('.services-eyebrow');
  const showcase = main.querySelector('.showcase-eyebrow');
  const footer = document.querySelector('.site-footer');
  const track = svg.querySelector('.current-line-track');
  const fill = svg.querySelector('.current-line-fill');
  const halo = svg.querySelector('.current-line-halo');
  const bolt = svg.querySelector('.current-line-bolt');
  const tip = svg.querySelector('.current-line-tip');
  const points = [...svg.querySelectorAll('.current-line-point')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;
  let needsMeasure = true;
  let start = 0;
  let height = 0;
  let length = 0;
  let firstScroll = 0;
  let lastScroll = 0;
  let samples = [];
  let thresholds = [];
  let displayedDistance = 0;
  let lastFrame = 0;
  let lastActivity = 0;

  // The path joins the services circuit, then follows the empty right gutter.
  // Geometry is measured only
  // when page dimensions change, rather than on every scroll event.
  const measure = () => {
    const mainBox = main.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const serviceBox = services.getBoundingClientRect();
    const showcaseBox = showcase.getBoundingClientRect();
    const footerBox = footer.getBoundingClientRect();
    const left = Math.min(serviceBox.left, showcaseBox.left, footer.firstElementChild.getBoundingClientRect().left);
    const mobile = mainBox.width <= 700;
    if (mainBox.width < 360 || left < 22) {
      svg.setAttribute('hidden', '');
      main.classList.remove('current-line-ready');
      return;
    }
    start = heroBox.bottom + scrollY - 16;
    height = footerBox.top + scrollY + 16 - start;
    firstScroll = start - innerHeight * .7;
    lastScroll = Math.max(firstScroll + 1, footerBox.bottom + scrollY - innerHeight);
    const circuitBox = main.querySelector('.services-circuit').getBoundingClientRect();
    const sectionBox = main.querySelector('.services').getBoundingClientRect();
    const serviceY = circuitBox.top + scrollY + (mobile ? 8 : 4) - start;
    const showcaseY = showcaseBox.top + scrollY + showcaseBox.height / 2 - start;
    const a = mobile ? 10 : Math.max(6, left - 32);
    const right = mainBox.width - a;
    const x = n => circuitBox.left + circuitBox.width * n / 1184;
    let path;
    if (mobile) {
      const circuitX = circuitBox.left + .5;
      const exitY = sectionBox.bottom + scrollY - start - 28;
      path = `M ${a} 0 L ${a} ${serviceY - 16} Q ${a} ${serviceY} ${circuitX} ${serviceY} L ${circuitX} ${exitY - 16} Q ${circuitX} ${exitY} ${circuitX + 16} ${exitY} H ${right - 16} Q ${right} ${exitY} ${right} ${exitY + 16} L ${right} ${height}`;
    } else {
      path = `M ${a} 0 L ${a} ${serviceY - 16} Q ${a} ${serviceY} ${a + 16} ${serviceY} H ${x(385)} Q ${x(401)} ${serviceY} ${x(401)} ${serviceY + 16} V ${serviceY + 94} Q ${x(401)} ${serviceY + 110} ${x(417)} ${serviceY + 110} H ${x(794)} Q ${x(810)} ${serviceY + 110} ${x(810)} ${serviceY + 126} V ${serviceY + 224} Q ${x(810)} ${serviceY + 240} ${x(826)} ${serviceY + 240} H ${right - 16} Q ${right} ${serviceY + 240} ${right} ${serviceY + 256} L ${right} ${height}`;
    }
    svg.removeAttribute('hidden');
    svg.setAttribute('viewBox', `0 0 ${mainBox.width} ${height}`);
    svg.setAttribute('width', mainBox.width);
    svg.setAttribute('height', height);
    svg.style.top = `${start - (mainBox.top + scrollY)}px`;
    track.setAttribute('d', path);
    fill.setAttribute('d', path);
    halo.setAttribute('d', path);
    length = fill.getTotalLength();
    fill.style.strokeDasharray = `${length} ${length}`;
    halo.style.strokeDasharray = `${length} ${length}`;
    main.classList.add('current-line-ready');
    // Cache the vertical progress of this monotonic path. Scroll rendering
    // interpolates cached points and does not query layout or SVG geometry.
    samples = Array.from({ length: 257 }, (_, i) => {
      const distance = length * i / 256;
      const point = fill.getPointAtLength(distance);
      return { x: point.x, y: point.y, distance };
    });
    // Do not show the unfilled track through Diensten: the circuit should
    // become visible only as scroll progress reaches it.
    const entryDistance = distanceAtY(serviceY);
    const exitDistance = distanceAtY(sectionBox.bottom + scrollY - start);
    track.style.strokeDasharray = `${entryDistance} ${exitDistance - entryDistance} ${length - exitDistance} ${length}`;
    thresholds = [serviceY, showcaseY];
    points.forEach((point, i) => {
      point.setAttribute('cx', i === 0 ? (mobile ? circuitBox.left + .5 : x(4)) : right);
      point.setAttribute('cy', thresholds[i]);
    });
  };

  const distanceAtY = y => {
    let low = 0, high = samples.length - 1;
    while (high - low > 1) {
      const middle = (low + high) >> 1;
      if (samples[middle].y < y) low = middle;
      else high = middle;
    }
    const from = samples[low], to = samples[high];
    const fraction = to.y === from.y ? 1 : (y - from.y) / (to.y - from.y);
    return from.distance + Math.max(0, Math.min(1, fraction)) * (to.distance - from.distance);
  };
  const pointAtDistance = distance => {
    const index = Math.max(0, Math.min(256, distance / length * 256));
    const from = samples[Math.floor(index)], to = samples[Math.min(256, Math.floor(index) + 1)];
    const fraction = index % 1;
    return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
  };
  const drawElectricity = (now, energy) => {
    const active = !reducedMotion.matches && displayedDistance > 1;
    tip.style.opacity = active ? String(.45 + energy * .55) : '0';
    bolt.style.opacity = active ? String(energy) : '0';
    if (!active) return;
    const head = pointAtDistance(displayedDistance);
    tip.setAttribute('cx', head.x);
    tip.setAttribute('cy', head.y);
    if (!energy) return;
    const trailLength = Math.min(90, displayedDistance);
    const steps = Math.max(2, Math.ceil(trailLength / 6));
    const vertices = [];
    for (let i = 0; i <= steps; i++) {
      const fraction = i / steps;
      const distance = displayedDistance - trailLength * (1 - fraction);
      const point = pointAtDistance(distance);
      const before = pointAtDistance(Math.max(0, distance - 3));
      const after = pointAtDistance(Math.min(length, distance + 3));
      const dx = after.x - before.x, dy = after.y - before.y;
      const magnitude = Math.hypot(dx, dy) || 1;
      const jitter = Math.sin(i * 4.7 + now / 85) * 2.6 * Math.sin(fraction * Math.PI);
      vertices.push({ x: point.x - dy / magnitude * jitter, y: point.y + dx / magnitude * jitter, nx: -dy / magnitude, ny: dx / magnitude });
    }
    let path = vertices.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
    // Two short sparks stay close to the route and away from the service text.
    for (const [fraction, side] of [[.55, 1], [.8, -1]]) {
      const p = vertices[Math.floor(steps * fraction)];
      path += ` M ${p.x} ${p.y} l ${p.nx * 4 * side + p.ny * 2} ${p.ny * 4 * side - p.nx * 2} l ${p.nx * 4 * side - p.ny * 2} ${p.ny * 4 * side + p.nx * 2}`;
    }
    bolt.setAttribute('d', path);
  };
  const render = now => {
    queued = false;
    if (document.hidden) { bolt.style.opacity = '0'; tip.style.opacity = '0'; lastFrame = 0; return; }
    if (needsMeasure) { needsMeasure = false; measure(); }
    if (svg.hasAttribute('hidden') || !samples.length) return;
    const progress = lastScroll - scrollY <= 1 ? 1 : Math.max(0, Math.min(1, (scrollY - firstScroll) / (lastScroll - firstScroll)));
    const y = reducedMotion.matches ? height : progress * height;
    const distance = y <= 0 ? 0 : y >= height ? length : distanceAtY(y);
    if (!reducedMotion.matches && Math.abs(distance - displayedDistance) > .25) lastActivity = now;
    if (reducedMotion.matches) displayedDistance = distance;
    else {
      const elapsed = lastFrame ? Math.min(now - lastFrame, 64) : 16;
      displayedDistance += (distance - displayedDistance) * (1 - Math.exp(-elapsed / 150));
      if (Math.abs(distance - displayedDistance) < .25) displayedDistance = distance;
    }
    displayedDistance = Math.max(0, Math.min(length, displayedDistance));
    lastFrame = now;
    fill.style.strokeDashoffset = String(length - displayedDistance);
    halo.style.strokeDashoffset = String(length - displayedDistance);
    const energy = reducedMotion.matches || !lastActivity ? 0 : Math.max(0, 1 - (now - lastActivity) / 180);
    drawElectricity(now, energy);
    points.forEach((point, i) => point.classList.toggle('is-connected', displayedDistance >= distanceAtY(thresholds[i])));
    // Follow scroll with a short easing lag; stop requesting frames once settled.
    if (displayedDistance !== distance || energy > 0) schedule();
    else lastFrame = 0;
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };
  const resize = () => { needsMeasure = true; schedule(); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', resize);
  reducedMotion.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(resize);
    observer.observe(main);
    observer.observe(footer);
  }
  document.fonts.ready.then(resize);
  addEventListener('load', resize, { once: true });
  resize();
})();
