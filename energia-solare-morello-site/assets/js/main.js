(() => {
  const PHONE = '+393292354847';
  const PHONE_DISPLAY = '329 235 4847';
  const WA_TEXT = encodeURIComponent(
    'Buongiorno, vorrei informazioni su un impianto (fotovoltaico / termico / eolico).'
  );
  const MAPS_URL = 'https://maps.app.goo.gl/muuLyYyBfFcwyJpD9';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  if (!document.querySelector('.float-actions')) {
    const base = document.body.dataset.base || '';
    const bar = document.createElement('div');
    bar.className = 'float-actions';
    bar.setAttribute('aria-label', 'Contatti rapidi');
    bar.innerHTML = `
      <a href="https://wa.me/393292354847?text=${WA_TEXT}" class="float-btn float-btn--wa" target="_blank" rel="noopener" title="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span class="float-btn__label">WhatsApp</span>
      </a>
      <a href="tel:${PHONE}" class="float-btn float-btn--call" title="Chiama">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
        <span class="float-btn__label">${PHONE_DISPLAY}</span>
      </a>
    `;
    document.body.appendChild(bar);
  }

  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  if (form && formMsg) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formMsg.textContent = 'Invio in corso...';
      formMsg.className = 'form-msg';

      const data = new FormData(form);
      const nome = data.get('nome') || '';
      const tel = data.get('telefono') || '';
      const servizio = data.get('servizio') || '';
      const messaggio = data.get('messaggio') || '';

      const mailBody = [
        `Nome: ${nome}`,
        `Telefono: ${tel}`,
        `Servizio: ${servizio}`,
        '',
        messaggio,
      ].join('\n');

      const mailto = `mailto:info@energiasolaremorello.it?subject=${encodeURIComponent('Richiesta dal sito - ' + servizio)}&body=${encodeURIComponent(mailBody)}`;

      try {
        const endpoint = form.getAttribute('action');
        if (endpoint && endpoint.includes('formsubmit')) {
          const res = await fetch(endpoint, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          if (res.ok) {
            formMsg.textContent = 'Messaggio inviato. Vi richiameremo al più presto.';
            formMsg.className = 'form-msg is-ok';
            form.reset();
            return;
          }
        }
      } catch (_) {}

      window.location.href = mailto;
      formMsg.textContent = 'Se non si apre il client email, chiamateci al ' + PHONE_DISPLAY;
      formMsg.className = 'form-msg is-ok';
    });
  }
})();
