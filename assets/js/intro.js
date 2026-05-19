(() => {
  const splash = document.getElementById('intro-splash');
  if (!splash) return;

  const skipBtn = splash.querySelector('.intro-splash__skip');
  const canvas = splash.querySelector('.intro-canvas');
  const raysWrap = splash.querySelector('.intro-splash__rays');
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    splash.classList.add('is-fading');
    setTimeout(() => {
      splash.classList.add('is-done');
      document.body.classList.remove('is-intro-locked');
      document.dispatchEvent(new CustomEvent('intro-done'));
    }, 550);
  };

  document.body.classList.add('is-intro-locked');
  skipBtn?.addEventListener('click', finish);

  if (raysWrap && !raysWrap.children.length) {
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement('span');
      ray.style.setProperty('--ray-i', String(i));
      raysWrap.appendChild(ray);
    }
  }

  const sunRays = splash.querySelector('.intro-splash__sun-rays');
  if (sunRays && !sunRays.children.length) {
    for (let i = 0; i < 24; i++) {
      const s = document.createElement('span');
      s.style.transform = `rotate(${i * 15}deg)`;
      sunRays.appendChild(s);
    }
  }

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;
    let running = true;
    const cx = () => w * 0.5;
    const cy = () => h * 0.42;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const spawn = (n) => {
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 120;
        particles.push({
          x: cx() + Math.cos(angle) * dist,
          y: cy() + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.8,
          life: 0.4 + Math.random() * 0.6,
          size: 0.5 + Math.random() * 2,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.004;
        if (p.life <= 0) return;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        g.addColorStop(0, `rgba(255, 228, 160, ${p.life})`);
        g.addColorStop(1, 'rgba(255, 228, 160, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);
      if (particles.length < 80) spawn(6);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    spawn(100);
    draw();

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    splash.addEventListener('transitionend', stop, { once: true });
    setTimeout(stop, 10000);
  }

  requestAnimationFrame(() => splash.classList.add('is-active'));

  setTimeout(() => {
    if (!finished) finish();
  }, 3500);

})();
