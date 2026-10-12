(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
  const images = [...document.querySelectorAll('.showcase-photo img, .project-image img')];
  images.forEach(image => { image.classList.add('motion-image'); image.parentElement.classList.add('motion-frame'); });
  const portrait = document.querySelector('.portrait-stage');
  let scheduled = false;
  const render = () => {
    scheduled = false;
    if (preference.matches) return;
    const available = document.documentElement.scrollHeight - innerHeight;
    progress.style.setProperty('--scroll-progress', available > 0 ? scrollY / available : 0);
    images.forEach(image => {
      const box = image.parentElement.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) return;
      const travel = Math.max(-1, Math.min(1, (innerHeight / 2 - box.top - box.height / 2) / innerHeight));
      image.style.setProperty('--image-offset', `${travel * 22}px`);
    });
    if (portrait) {
      const box = portrait.getBoundingClientRect();
      portrait.style.setProperty('--portrait-offset', `${Math.max(-14, Math.min(14, (innerHeight / 2 - box.top) * .035))}px`);
    }
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(render); } };
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule);
  const entries = document.querySelectorAll('.service, .showcase-project, .contact-note, .project-start, .contact-faq, .approach-steps li, .recognition, .about-story');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(changes => changes.forEach(change => {
      if (change.isIntersecting) { change.target.classList.remove('motion-pending'); observer.unobserve(change.target); }
    }), { threshold: .08 });
    entries.forEach(entry => {
      entry.classList.add('motion-entry');
      if (!preference.matches && entry.getBoundingClientRect().top > innerHeight) { entry.classList.add('motion-pending'); observer.observe(entry); }
    });
  }
  preference.addEventListener('change', () => {
    if (preference.matches) document.querySelectorAll('.motion-pending').forEach(entry => entry.classList.remove('motion-pending'));
    schedule();
  });
  document.fonts.ready.then(schedule); schedule();
})();
