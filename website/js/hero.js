(() => {
  const hero = document.querySelector('.hero');
  const video = hero.querySelector('video');
  const source = video.querySelector('source');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
  let loaded = false;
  let inView = true;
  const play = () => {
    if (!loaded) { source.src = source.dataset.src; video.load(); loaded = true; }
    video.playbackRate = 0.65;
    video.play().catch(() => {});
  };
  const syncPlayback = () => {
    if (!inView || document.hidden || reducedMotion.matches || saveData) video.pause();
    else play();
  };
  const applyPreference = () => {
    hero.classList.toggle('entering', !reducedMotion.matches);
    syncPlayback();
  };
  reducedMotion.addEventListener('change', applyPreference);
  document.addEventListener('visibilitychange', syncPlayback);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting; syncPlayback();
  }).observe(hero);
  applyPreference();
})();
