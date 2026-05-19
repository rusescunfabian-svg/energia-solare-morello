(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = [...section.querySelectorAll('[data-count]')];
  if (!counters.length) return;

  const DURATION = 1100;
  let played = false;

  const animateAll = () => {
    const start = performance.now();

    counters.forEach((el) => {
      const card = el.closest('.stat-pill, .stat-card');
      const target = parseFloat(el.dataset.count, 10);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';

      card?.classList.add('is-counting');

      const tick = (now) => {
        const t = Math.min((now - start) / DURATION, 1);
        const eased = 1 - (1 - t) ** 3;
        const val = target * eased;

        el.textContent = decimals
          ? val.toFixed(decimals).replace('.', ',')
          : String(Math.round(val));

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = decimals
            ? target.toFixed(decimals).replace('.', ',')
            : String(Math.round(target));
          el.textContent += suffix;
          card?.classList.remove('is-counting');
          card?.classList.add('is-done');
        }
      };

      requestAnimationFrame(tick);
    });
  };

  const play = () => {
    if (played) return;
    played = true;
    section.classList.add('is-animated');
    animateAll();
  };

  document.addEventListener('intro-done', play, { once: true });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(section);
  } else {
    play();
  }

  window.addEventListener('load', () => {
    const splash = document.getElementById('intro-splash');
    if (!splash || splash.classList.contains('is-done')) play();
  });
})();
