(() => {
  const root = document.querySelector('.figures');
  if (!root) return;

  const els = [...root.querySelectorAll('.figures__count[data-count]')];
  if (!els.length) return;

  let started = false;
  let ready = false;

  const formatIT = (n, decimals = 0) => {
    const raw = decimals ? n.toFixed(decimals) : String(Math.round(n));
    const [a, b] = raw.split('.');
    const grouped = a.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return b ? `${grouped},${b}` : grouped;
  };

  const paint = (el, value) => {
    const d = parseInt(el.dataset.decimals || '0', 10);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const body =
      el.dataset.format === 'it'
        ? formatIT(value, d)
        : d
          ? value.toFixed(d).replace('.', ',')
          : String(Math.round(value));
    el.textContent = pre + body + suf;
  };

  const animate = (el) => {
    const target = parseFloat(el.dataset.count, 10);
    const ms = parseInt(el.dataset.ms || '2400', 10);
    const row = el.closest('.figures__row');
    row?.classList.add('is-active');

    const t0 = performance.now();

    const step = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      const eased = 1 - (1 - p) ** 3;
      paint(el, target * eased);
      if (p < 1) requestAnimationFrame(step);
      else paint(el, target);
    };

    requestAnimationFrame(step);
  };

  const run = () => {
    if (started || !ready) return;
    started = true;
    root.classList.add('is-live');

    const mega = els.find((el) => el.closest('.figures__hero'));
    const rest = els.filter((el) => el !== mega);

    if (mega) {
      paint(mega, 0);
      animate(mega);
    }

    rest.forEach((el, i) => {
      paint(el, 0);
      setTimeout(() => animate(el), 400 + i * 180);
    });
  };

  const observe = () => {
    if (started) return;

    const go = () => {
      ready = true;
      setTimeout(run, 120);
    };

    const splash = document.getElementById('intro-splash');
    const afterIntro = () => {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              go();
              io.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        io.observe(root);
      } else {
        go();
      }
    };

    if (!splash || splash.classList.contains('is-done')) {
      ready = true;
      afterIntro();
    } else {
      document.addEventListener(
        'intro-done',
        () => {
          ready = true;
          afterIntro();
        },
        { once: true }
      );
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();
