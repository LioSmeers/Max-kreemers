(() => {
  const hero = document.querySelector('.hero');
  const video = hero.querySelector('video');
  const source = video.querySelector('source');
  const control = hero.querySelector('.hero-light-control');
  const lightSwitch = control?.querySelector('.hero-light-switch');
  const label = control?.querySelector('.hero-switch-label');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData || matchMedia('(prefers-reduced-data: reduce)').matches;
  let loaded = false;
  let inView = true;
  let lightsOn = true;
  const play = () => {
    if (!loaded) { source.src = source.dataset.src; video.load(); loaded = true; }
    video.playbackRate = 0.65;
    video.play().catch(() => {});
  };
  const syncPlayback = () => {
    if (!lightsOn || !inView || document.hidden || reducedMotion.matches || saveData) video.pause();
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
  if (lightSwitch) {
    lightSwitch.addEventListener('click', () => {
      lightsOn = !lightsOn;
      hero.classList.toggle('is-light-off', !lightsOn);
      lightSwitch.setAttribute('aria-pressed', String(lightsOn));
      label.textContent = lightsOn ? 'Zet het licht eens uit.' : 'Zet het licht weer aan.';
      hero.classList.remove('light-restored');
      if (lightsOn && !reducedMotion.matches) hero.classList.add('light-restored');
      syncPlayback();
    });
    hero.addEventListener('animationend', event => {
      if (event.animationName === 'switch-light-pulse') hero.classList.remove('light-restored');
    });
    control.hidden = false;
  }
  applyPreference();
})();
