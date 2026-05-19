(() => {
  const splash = document.getElementById('intro-splash');
  if (!splash) return;

  const skipBtn = splash.querySelector('.intro-splash__skip');
  const canvas = splash.querySelector('.intro-canvas');
  const slides = [...splash.querySelectorAll('.intro-stat-slide')];

  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    splash.classList.add('is-fading');
    setTimeout(() => {
      splash.classList.add('is-done');
      document.body.classList.remove('is-intro-locked');
    }, 750);
  };

  document.body.classList.add('is-intro-locked');
  skipBtn?.addEventListener('click', finish);

  /* Canvas particles */
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w;
    let h;
    let particles = [];
    let raf;
    let running = true;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const spawn = (n) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          x: w / 2 + (Math.random() - 0.5) * 80,
          y: h / 2 + (Math.random() - 0.5) * 80,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1,
          size: 1 + Math.random() * 2.5,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012;
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.life <= 0) return;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, `rgba(255, 220, 140, ${p.life * 0.9})`);
        g.addColorStop(1, 'rgba(255, 220, 140, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);
      if (particles.length < 40) spawn(8);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    spawn(120);
    draw();

    const stopCanvas = () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    splash.addEventListener('transitionend', stopCanvas, { once: true });
    setTimeout(stopCanvas, 12000);
  }

  const rays = splash.querySelector('.intro-splash__sun-rays');
  if (rays && !rays.children.length) {
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('span');
      s.style.transform = `rotate(${i * 22.5}deg)`;
      rays.appendChild(s);
    }
  }

  splash.classList.add('is-phase-logo');

  const animateValue = (el, target, duration, decimals = 0) => {
    return new Promise((resolve) => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) ** 3;
        const val = target * eased;
        el.textContent = decimals
          ? val.toFixed(decimals).replace('.', ',')
          : String(Math.round(val));
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
  };

  const runSlide = async (slide) => {
    slides.forEach((s) => {
      s.classList.remove('is-active');
      s.querySelector('.intro-stat-num--text')?.classList.remove('is-visible');
    });
    slide.classList.add('is-active');

    const counter = slide.querySelector('.intro-counter[data-target]');
    const textVal = slide.querySelector('.intro-stat-num--text');

    if (counter) {
      const target = parseFloat(counter.dataset.target, 10);
      const decimals = parseInt(counter.dataset.decimals || '0', 10);
      const suffix = counter.dataset.suffix || '';
      counter.textContent = decimals ? '0,0' : '0';
      await animateValue(counter, target, 1100, decimals);
      if (suffix) counter.textContent += suffix;
    } else if (textVal) {
      requestAnimationFrame(() => textVal.classList.add('is-visible'));
      await new Promise((r) => setTimeout(r, 900));
    } else {
      await new Promise((r) => setTimeout(r, 700));
    }
    await new Promise((r) => setTimeout(r, 450));
  };

  const runStats = async () => {
    splash.classList.add('is-phase-stats');
    for (const slide of slides) {
      if (finished) return;
      await runSlide(slide);
    }
    if (!finished) finish();
  };

  setTimeout(() => {
    if (!finished) runStats();
  }, 1100);
})();
