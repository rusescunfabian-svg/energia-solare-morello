(() => {
  const section = document.querySelector('.home-stats');
  if (!section) return;

  const counters = [...section.querySelectorAll('[data-count]')];
  if (!counters.length) return;

  const DURATION = 2600;
  const STAGGER = 140;
  let played = false;
  let introDone = false;

  const resetEl = (el) => {
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = decimals ? `0,${'0'.repeat(decimals)}` : '0';
    const item = el.closest('.stat-item');
    item?.classList.remove('is-counting', 'is-done');
  };

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count, 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const item = el.closest('.stat-item');
    const start = performance.now();
    let lastInt = -1;

    item?.classList.add('is-counting');

    const frame = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - t) ** 4;
      const val = target * eased;

      if (decimals) {
        el.textContent = val.toFixed(decimals).replace('.', ',');
      } else {
        const shown = Math.round(val);
        if (shown !== lastInt) {
          lastInt = shown;
          el.classList.remove('is-tick');
          void el.offsetWidth;
          el.classList.add('is-tick');
        }
        el.textContent = String(shown);
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = decimals
          ? target.toFixed(decimals).replace('.', ',')
          : String(Math.round(target));
        if (suffix) el.textContent += suffix;
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

    const visible =
      section.getBoundingClientRect().top < window.innerHeight * 0.88 &&
      section.getBoundingClientRect().bottom > 40;

    if (visible) {
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(section);
  };

  const onIntroDone = () => {
    introDone = true;
    setTimeout(watchInView, 250);
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
