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

  // The path never leaves the empty left gutter. Geometry is measured only
  // when page dimensions change, rather than on every scroll event.
  const measure = () => {
    const mainBox = main.getBoundingClientRect();
    const heroBox = hero.getBoundingClientRect();
    const serviceBox = services.getBoundingClientRect();
    const showcaseBox = showcase.getBoundingClientRect();
    const footerBox = footer.getBoundingClientRect();
    const left = Math.min(serviceBox.left, showcaseBox.left, footer.firstElementChild.getBoundingClientRect().left);
    const mobile = mainBox.width <= 700;
    if (mainBox.width < 360 || left < 22) { svg.setAttribute('hidden', ''); return; }
    start = heroBox.bottom + scrollY - 16;
    height = footerBox.top + scrollY + 16 - start;
    firstScroll = start - innerHeight * .7;
    lastScroll = Math.max(firstScroll + 1, footerBox.bottom + scrollY - innerHeight);
    const serviceY = serviceBox.top + scrollY + serviceBox.height / 2 - start;
    const showcaseY = showcaseBox.top + scrollY + showcaseBox.height / 2 - start;
    const a = mobile ? 10 : Math.max(6, left - 32);
    const b = mobile ? a : Math.max(a + 12, left - 16);
    const bend = y => `L ${a} ${y - 28} Q ${a} ${y - 20} ${a + 6} ${y - 20} L ${b - 6} ${y - 20} Q ${b} ${y - 20} ${b} ${y - 14} L ${b} ${y + 14} Q ${b} ${y + 20} ${b - 6} ${y + 20} L ${a + 6} ${y + 20} Q ${a} ${y + 20} ${a} ${y + 28}`;
    const path = mobile ? `M ${a} 0 L ${a} ${height}` : `M ${a} 0 ${bend(serviceY)} ${bend(showcaseY)} L ${a} ${height}`;
    svg.removeAttribute('hidden');
    svg.setAttribute('viewBox', `0 0 ${mainBox.width} ${height}`);
    svg.setAttribute('width', mainBox.width);
    svg.setAttribute('height', height);
    svg.style.top = `${start - (mainBox.top + scrollY)}px`;
    track.setAttribute('d', path);
    fill.setAttribute('d', path);
    length = fill.getTotalLength();
    fill.style.strokeDasharray = `${length} ${length}`;
    // Cache the vertical progress of this monotonic path. Scroll rendering
    // interpolates cached points and does not query layout or SVG geometry.
    samples = Array.from({ length: 257 }, (_, i) => {
      const distance = length * i / 256;
      return { y: fill.getPointAtLength(distance).y, distance };
    });
    thresholds = [serviceY, showcaseY];
    points.forEach((point, i) => {
      point.setAttribute('cx', b);
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
  const render = now => {
    queued = false;
    if (needsMeasure) { needsMeasure = false; measure(); }
    if (svg.hasAttribute('hidden') || !samples.length) return;
    const progress = lastScroll - scrollY <= 1 ? 1 : Math.max(0, Math.min(1, (scrollY - firstScroll) / (lastScroll - firstScroll)));
    const y = reducedMotion.matches ? height : progress * height;
    const distance = y <= 0 ? 0 : y >= height ? length : distanceAtY(y);
    if (reducedMotion.matches) displayedDistance = distance;
    else {
      const elapsed = lastFrame ? Math.min(now - lastFrame, 64) : 16;
      displayedDistance += (distance - displayedDistance) * (1 - Math.exp(-elapsed / 150));
      if (Math.abs(distance - displayedDistance) < .25) displayedDistance = distance;
    }
    displayedDistance = Math.max(0, Math.min(length, displayedDistance));
    lastFrame = now;
    fill.style.strokeDashoffset = String(length - displayedDistance);
    points.forEach((point, i) => point.classList.toggle('is-connected', displayedDistance >= distanceAtY(thresholds[i])));
    // Follow scroll with a short easing lag; stop requesting frames once settled.
    if (displayedDistance !== distance) schedule();
    else lastFrame = 0;
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };
  const resize = () => { needsMeasure = true; schedule(); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', resize);
  reducedMotion.addEventListener('change', schedule);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(resize);
    observer.observe(main);
    observer.observe(footer);
  }
  document.fonts.ready.then(resize);
  addEventListener('load', resize, { once: true });
  resize();
})();
