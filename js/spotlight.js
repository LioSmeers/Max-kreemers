(() => {
  const slider = document.querySelector('.showcase-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.spotlight-slide')];
  const thumbnails = [...slider.querySelectorAll('.spotlight-thumbnails button')];
  const status = slider.querySelector('.spotlight-status');
  let index = 0;
  let transition;
  let renderVersion = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const placeNavigation = () => {
    const stage = slides[index].querySelector('.spotlight-stage');
    slider.style.setProperty('--photo-midpoint', `${stage.offsetTop + stage.offsetHeight / 2 - 22}px`);
  };
  const show = (next, direction = Math.sign(next - index)) => {
    const previous = index;
    const version = ++renderVersion;
    transition?.cancel();
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    status.textContent = `${index + 1} van ${slides.length}: ${slides[index].dataset.projectTitle}`;
    placeNavigation();
    document.dispatchEvent(new Event('showcasechange'));
    const stage = slides[index].querySelector('.spotlight-stage');
    if (index !== previous && !reducedMotion.matches && stage.animate) {
      const enter = () => {
        if (version !== renderVersion || reducedMotion.matches) return;
        transition = stage.animate([
          { opacity: .2, transform: `translateX(${direction * 22}px)` },
          { opacity: 1, transform: 'translateX(0)' }
        ], { duration: 300, easing: 'cubic-bezier(.2,.7,.3,1)' });
      };
      const image = stage.querySelector('img');
      if (image.complete && image.naturalWidth) enter();
      else image.addEventListener('load', enter, { once: true });
    }
  };
  slider.querySelector('.spotlight-prev').addEventListener('click', () => show(index - 1));
  slider.querySelector('.spotlight-next').addEventListener('click', () => show(index + 1));
  thumbnails.forEach((button, i) => button.addEventListener('click', () => show(i)));
  slider.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  slider.classList.add('is-ready');
  slider.querySelector('.spotlight-navigation').hidden = false;
  slider.querySelector('.spotlight-thumbnails').hidden = false;
  show(0);
  addEventListener('resize', placeNavigation);
  if ('ResizeObserver' in window) new ResizeObserver(placeNavigation).observe(slider);
  document.fonts.ready.then(placeNavigation);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) transition?.cancel(); });
})();
