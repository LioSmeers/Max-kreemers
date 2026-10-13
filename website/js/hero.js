(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finish = () => hero.classList.remove('entering');

  // Keep text readable without JavaScript and when motion is disabled.
  // Wait for the final font width before sweeping across each title line.
  document.fonts.ready.then(() => {
    if (reducedMotion.matches || document.hidden) return;
    requestAnimationFrame(() => {
      if (!reducedMotion.matches && !document.hidden) hero.classList.add('entering');
    });
  });
  hero.addEventListener('animationend', event => {
    if (event.animationName === 'light-sweep-text' && event.target.closest('.title-line.accent')) finish();
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finish(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
})();
