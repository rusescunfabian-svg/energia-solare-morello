(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = section.querySelectorAll('[data-count]');
  if (!counters.length) return;

  let played = false;

  const animate = (el) => {
    const card = el.closest('.stat-card');
    const target = parseFloat(el.dataset.count, 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    card?.classList.add('is-counting');

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 4;
      const val = target * eased;
      el.textContent = decimals
        ? val.toFixed(decimals).replace('.', ',')
        : String(Math.round(val));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent += suffix;
        card?.classList.remove('is-counting');
        card?.classList.add('is-done');
      }
    };
    requestAnimationFrame(tick);
  };

  const play = () => {
    if (played) return;
    played = true;
    section.classList.add('is-animated');
    counters.forEach((el, i) => {
      setTimeout(() => animate(el), 180 + i * 200);
    });
  };

  const tryPlay = () => {
    if (played) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) play();
  };

  document.addEventListener('intro-done', () => {
    setTimeout(play, 400);
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(section);
  }

  window.addEventListener('load', () => {
    const splash = document.getElementById('intro-splash');
    if (!splash || splash.classList.contains('is-done')) tryPlay();
  });
})();
