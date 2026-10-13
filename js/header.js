(() => {
  const header = document.querySelector('.site-header');
  const toggle = header.querySelector('.menu-toggle');

  function setOpen(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Sluiten' : 'Menu';
  }

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 701px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
})();
