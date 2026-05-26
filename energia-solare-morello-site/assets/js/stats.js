(() => {
  const root = document.querySelector('.figures');
  if (!root) return;

  const counters = [...root.querySelectorAll('.figures__count[data-count]')];
  if (!counters.length) return;

  let played = false;

  const formatIT = (n, decimals = 0) => {
    const raw = decimals ? n.toFixed(decimals) : String(Math.round(n));
    const [intPart, decPart] = raw.split('.');
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decPart ? `${grouped},${decPart}` : grouped;
  };

  const render = (el, value) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    let body;
    if (el.dataset.format === 'it') {
      body = formatIT(value, decimals);
    } else if (decimals) {
      body = value.toFixed(decimals).replace('.', ',');
    } else {
      body = String(Math.round(value));
    }
    el.textContent = prefix + body + suffix;
  };

  const animateOne = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    const duration = Number(el.dataset.ms) || (el.dataset.mega === 'true' ? 4500 : 2800);
    const wrap = el.closest('[data-stat-row]') || el.closest('.stat-mega');
    wrap?.classList.add('is-counting');

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      render(el, target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        render(el, target);
        wrap?.classList.remove('is-counting');
        wrap?.classList.add('is-done');
      }
    };

    render(el, 0);
    requestAnimationFrame(tick);
  };

  const play = () => {
    if (played) return;
    played = true;
    root.classList.add('is-live');

    const mega = counters.find((el) => el.dataset.mega === 'true');
    const others = counters.filter((el) => el !== mega);

    if (mega) animateOne(mega);
    others.forEach((el, i) => {
      setTimeout(() => animateOne(el), 450 + i * 250);
    });
  };

  const start = () => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      io.observe(root);
    } else {
      play();
    }

    setTimeout(() => {
      if (!played) play();
    }, 1200);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
