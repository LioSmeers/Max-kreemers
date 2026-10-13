(() => {
  const slider = document.querySelector('.showcase-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.spotlight-slide')];
  const thumbnails = [...slider.querySelectorAll('.spotlight-thumbnails button')];
  const status = slider.querySelector('.spotlight-status');
  let index = 0;
  const placeNavigation = () => {
    const stage = slides[index].querySelector('.spotlight-stage');
    slider.style.setProperty('--photo-midpoint', `${stage.offsetTop + stage.offsetHeight / 2 - 22}px`);
  };
  const show = next => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    status.textContent = `${index + 1} van ${slides.length}: ${slides[index].dataset.projectTitle}`;
    placeNavigation();
    document.dispatchEvent(new Event('showcasechange'));
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
})();
