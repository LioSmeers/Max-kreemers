(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-waiting');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.classList.add('reveal-waiting');
        observer.observe(element);
      }
    });
  }
  const filters = document.querySelectorAll('[data-filter]');
  const projects = [...document.querySelectorAll('[data-category]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    projects.forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
      project.classList.remove('reveal-waiting');
    });
    document.querySelector('.filter-status').textContent = `${projects.filter(project => !project.hidden).length} realisaties zichtbaar.`;
  }));
  const dialog = document.querySelector('.lightbox');
  if (!dialog) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('.lightbox-caption');
  const counter = dialog.querySelector('.lightbox-counter');
  let collection = [];
  let index = 0;
  let transition;
  let renderVersion = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const show = (direction = 0) => {
    const version = ++renderVersion;
    transition?.cancel();
    image.onload = () => {
      if (version !== renderVersion || !dialog.open || !direction || reducedMotion.matches || !image.animate) return;
      transition = image.animate([
        { opacity: .2, transform: `translateX(${direction * 22}px)` },
        { opacity: 1, transform: 'translateX(0)' }
      ], { duration: 300, easing: 'cubic-bezier(.2,.7,.3,1)' });
    };
    const link = collection[index];
    image.src = link.href;
    image.alt = link.dataset.caption;
    caption.textContent = link.dataset.caption;
    counter.textContent = `${index + 1} / ${collection.length}`;
  };
  const next = direction => { index = (index + direction + collection.length) % collection.length; show(direction); };
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    collection = [...document.querySelectorAll('[data-lightbox]')].filter(item => !item.closest('[hidden]') || item.closest('.spotlight-slide'));
    index = collection.indexOf(link);
    show();
    dialog.showModal();
    dialog.querySelector('.lightbox-close').focus();
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => next(-1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => next(1));
  dialog.addEventListener('close', () => { renderVersion++; image.onload = null; transition?.cancel(); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) transition?.cancel(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); next(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
})();
