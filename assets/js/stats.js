(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = [...section.querySelectorAll('[data-count]')];
  if (!counters.length) return;

  const DEFAULT_DURATION = 2800;
  const STAGGER = 120;
  let played = false;
  let introDone = false;

  const formatIT = (value, decimals = 0) => {
    const n = decimals ? value.toFixed(decimals) : String(Math.round(value));
    const [intPart, decPart] = n.split('.');
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decPart ? `${grouped},${decPart}` : grouped;
  };

  const displayValue = (el, value) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const useIT = el.dataset.format === 'it';
    const body = useIT ? formatIT(value, decimals) : decimals ? value.toFixed(decimals).replace('.', ',') : String(Math.round(value));
    el.textContent = `${prefix}${body}${suffix}`;
  };

  const resetEl = (el) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    if (el.dataset.format === 'it') {
      el.textContent = `${prefix}${decimals ? '0,' + '0'.repeat(decimals) : '0'}`;
    } else {
      el.textContent = prefix + (decimals ? `0,${'0'.repeat(decimals)}` : '0');
    }
    el.closest('.stat-item')?.classList.remove('is-counting', 'is-done');
  };

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count, 10);
    const duration = parseInt(el.dataset.duration || String(DEFAULT_DURATION), 10);
    const item = el.closest('.stat-item');
    const start = performance.now();
    let lastShown = '';

    item?.classList.add('is-counting');

    const frame = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 4;
      const val = target * eased;
      const next = el.dataset.format === 'it'
        ? formatIT(val, parseInt(el.dataset.decimals || '0', 10))
        : String(Math.round(val));

      if (next !== lastShown) {
        lastShown = next;
        el.classList.remove('is-tick');
        void el.offsetWidth;
        el.classList.add('is-tick');
      }

      displayValue(el, val);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        displayValue(el, target);
        el.classList.remove('is-tick');
        item?.classList.remove('is-counting');
        item?.classList.add('is-done');
      }
    };

    requestAnimationFrame(frame);
  };

  const play = () => {
    if (played || !introDone) return;
    played = true;

    counters.forEach(resetEl);
    section.classList.remove('is-animated');

    requestAnimationFrame(() => {
      section.classList.add('is-animated');
      counters.forEach((el, i) => {
        setTimeout(() => runCounter(el), i * STAGGER);
      });
    });
  };

  const watchInView = () => {
    if (played) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 30) {
      play();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(section);
  };

  const onIntroDone = () => {
    introDone = true;
    setTimeout(watchInView, 200);
  };

  const boot = () => {
    const splash = document.getElementById('intro-splash');
    if (!splash || splash.classList.contains('is-done')) {
      introDone = true;
      watchInView();
    } else {
      document.addEventListener('intro-done', onIntroDone, { once: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
