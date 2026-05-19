(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = section.querySelectorAll('[data-count]');
  if (!counters.length) return;

  let played = false;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count, 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const val = target * eased;
      el.textContent = decimals
        ? val.toFixed(decimals).replace('.', ',')
        : String(Math.round(val));
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent += suffix;
    };
    requestAnimationFrame(tick);
  };

  const play = () => {
    if (played) return;
    played = true;
    section.classList.add('is-animated');
    counters.forEach((el, i) => {
      setTimeout(() => animate(el), i * 120);
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(section);
  } else {
    play();
  }
})();
