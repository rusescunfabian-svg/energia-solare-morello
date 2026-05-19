(() => {
  /** Data fine promozione — cambia questa riga per aggiornare l'offerta */
  const PROMO_END = new Date('2026-08-31T23:59:59+02:00');
  const PROMO_DISMISS_KEY = 'morello_promo_dismissed';

  const pad = (n) => String(n).padStart(2, '0');

  const getRemaining = () => {
    const diff = PROMO_END.getTime() - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const buildUnits = (root) => {
    if (!root) return;
    const units = [
      ['days', 'Giorni'],
      ['hours', 'Ore'],
      ['minutes', 'Min'],
      ['seconds', 'Sec'],
    ];
    root.replaceChildren();
    units.forEach(([key, label]) => {
      const box = document.createElement('div');
      box.className = 'promo-countdown__unit';
      const val = document.createElement('span');
      val.className = 'promo-countdown__value';
      val.dataset.unit = key;
      val.textContent = '00';
      const lab = document.createElement('small');
      lab.className = 'promo-countdown__label';
      lab.textContent = label;
      box.append(val, lab);
      root.append(box);
    });
  };

  const updateValues = (root, t) => {
    if (!root || !t) return;
    root.querySelectorAll('[data-unit]').forEach((el) => {
      el.textContent = pad(t[el.dataset.unit]);
    });
  };

  const contactHref = () => {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/progetti/')) return '../index.html#contatti';
    return 'index.html#contatti';
  };

  const createPromoBar = () => {
    if (sessionStorage.getItem(PROMO_DISMISS_KEY) === '1') return null;
    if (getRemaining() === null) return null;

    const bar = document.createElement('aside');
    bar.id = 'promo-bar';
    bar.className = 'promo-bar';
    bar.setAttribute('aria-label', 'Promozione in corso');

    const inner = document.createElement('div');
    inner.className = 'promo-bar__inner wrap';

    const copy = document.createElement('div');
    copy.className = 'promo-bar__copy';
    const title = document.createElement('strong');
    title.className = 'promo-bar__title';
    title.textContent = 'Promozione estate 2026';
    const desc = document.createElement('span');
    desc.className = 'promo-bar__desc';
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    desc.textContent = isMobile
      ? 'Sopralluogo gratuito in provincia di Varese'
      : 'Sopralluogo gratuito in provincia di Varese — scade tra:';
    copy.append(title, desc);

    const countdown = document.createElement('div');
    countdown.className = 'promo-countdown';
    countdown.id = 'promo-countdown-site';
    countdown.setAttribute('aria-live', 'polite');

    const cta = document.createElement('a');
    cta.className = 'promo-bar__cta';
    cta.href = contactHref();
    cta.textContent = 'Prenota ora';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'promo-bar__close';
    close.setAttribute('aria-label', 'Chiudi promozione');
    close.textContent = '\u00D7';

    inner.append(copy, countdown, cta, close);
    bar.append(inner);
    document.body.prepend(bar);
    document.body.classList.add('has-promo-bar');

    buildUnits(countdown);

    close.addEventListener('click', () => {
      bar.remove();
      document.body.classList.remove('has-promo-bar');
      sessionStorage.setItem(PROMO_DISMISS_KEY, '1');
    });

    return countdown;
  };

  const tick = (roots) => {
    const t = getRemaining();
    if (!t) {
      document.getElementById('promo-bar')?.remove();
      document.body.classList.remove('has-promo-bar');
      return;
    }
    roots.forEach((r) => updateValues(r, t));
  };

  const siteRoot = createPromoBar();
  const introRoot = document.getElementById('promo-countdown-intro');
  if (introRoot) buildUnits(introRoot);

  const roots = [siteRoot, introRoot].filter(Boolean);
  if (!roots.length) return;

  tick(roots);
  setInterval(() => tick(roots), 1000);
})();
