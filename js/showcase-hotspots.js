(() => {
  const projects = [...document.querySelectorAll('.hotspot-project')].map(figure => ({
    figure, stage: figure.querySelector('.hotspot-stage'), image: figure.querySelector('img'),
    layer: figure.querySelector('.hotspot-layer'), button: figure.querySelector('.hotspot-button'),
    card: figure.querySelector('.hotspot-card'), close: figure.querySelector('.hotspot-close')
  }));
  if (!projects.length) return;
  const hint = document.querySelector('.showcase-hint');
  let active = null;
  let queued = false;
  const close = (restoreFocus = false) => {
    if (!active) return;
    const previous = active; active = null;
    previous.card.hidden = true;
    previous.button.setAttribute('aria-expanded', 'false');
    previous.figure.classList.remove('is-inline');
    if (restoreFocus) previous.button.focus({ preventScroll: true });
  };
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const placeCard = project => {
    project.figure.classList.remove('is-inline');
    if (innerWidth <= 700) return;
    const stage = project.stage.getBoundingClientRect();
    const figure = project.figure.getBoundingClientRect();
    const card = project.card.getBoundingClientRect();
    project.card.style.top = `${stage.top - figure.top + stage.height - card.height - 12}px`;
    const placed = project.card.getBoundingClientRect();
    const button = project.button.getBoundingClientRect();
    // Use an inline card whenever the visible photo cannot fit it safely.
    if (placed.top < stage.top + 8 || overlaps(placed, button)) project.figure.classList.add('is-inline');
  };
  const measure = () => {
    queued = false;
    projects.forEach(project => {
      const { image, stage, layer, button } = project;
      if (project.figure.hidden || !image.complete || !image.naturalWidth) { layer.hidden = true; return; }
      const box = stage.getBoundingClientRect();
      const imageWidth = image.clientWidth, imageHeight = image.clientHeight;
      const position = getComputedStyle(image).objectPosition.split(' ').map(parseFloat);
      const fit = getComputedStyle(image).objectFit === 'contain' ? Math.min : Math.max;
      const scale = fit(imageWidth / image.naturalWidth, imageHeight / image.naturalHeight);
      const sourceX = Number(stage.dataset.sourceX) / Number(stage.dataset.sourceWidth) * image.naturalWidth;
      const sourceY = Number(stage.dataset.sourceY) / Number(stage.dataset.sourceHeight) * image.naturalHeight;
      const x = image.offsetLeft + sourceX * scale + (imageWidth - image.naturalWidth * scale) * position[0] / 100;
      const y = image.offsetTop + sourceY * scale + (imageHeight - image.naturalHeight * scale) * position[1] / 100;
      // The coordinates are original-image pixels, mapped through object-fit
      // and object-position. The entire point layer shares the image transform.
      button.style.left = `${x}px`; button.style.top = `${y}px`;
      button.hidden = x < 22 || x > box.width - 22 || y < 22 || y > box.height - 22;
      layer.hidden = button.hidden;
      if (button.hidden && active === project) close();
    });
    hint.hidden = projects.every(project => project.figure.hidden || project.button.hidden);
    if (active) placeCard(active);
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(measure); } };
  projects.forEach(project => {
    project.button.addEventListener('click', () => {
      if (active === project) { close(); return; }
      close(); active = project;
      project.button.setAttribute('aria-expanded', 'true'); project.card.hidden = false;
      placeCard(project);
    });
    project.close.addEventListener('click', () => close(true));
    project.image.addEventListener('load', schedule);
  });
  document.addEventListener('click', event => {
    if (active && !active.card.contains(event.target) && !active.button.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active) { event.preventDefault(); close(true); }
  });
  document.addEventListener('showcasechange', () => { close(); schedule(); });
  addEventListener('resize', schedule);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    projects.forEach(project => observer.observe(project.stage));
  }
  document.fonts.ready.then(schedule); schedule();
})();
