(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = [...section.querySelectorAll('[data-count]')];
  if (!counters.length) return;

  const DURATION = 1400;
  let played = false;

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count, 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const item = el.closest('.stat-item');

    item?.classList.add('is-counting');

    const frame = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - t) ** 3;
      const val = target * eased;

      if (decimals) {
        el.textContent = val.toFixed(decimals).replace('.', ',');
      } else {
        el.textContent = String(Math.round(val));
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = decimals
          ? target.toFixed(decimals).replace('.', ',')
          : String(Math.round(target));
        el.textContent += suffix;
        item?.classList.remove('is-counting');
        item?.classList.add('is-done');
      }
    };

    requestAnimationFrame(frame);
  };

  const play = () => {
    if (played) return;
    played = true;
    section.classList.add('is-animated');
    counters.forEach((el, i) => {
      setTimeout(() => runCounter(el), i * 80);
    });
  };

  const boot = () => {
    const splash = document.getElementById('intro-splash');
    if (!splash || splash.classList.contains('is-done')) {
      setTimeout(play, 100);
    }
  };

  document.addEventListener('intro-done', () => setTimeout(play, 150), { once: true });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(section);
  } else {
    play();
  }

  window.addEventListener('load', boot);
  boot();
})();
