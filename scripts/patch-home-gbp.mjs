import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'index.html');
let html = readFileSync(file, 'utf8');

const MAPS = 'https://maps.app.goo.gl/muuLyYyBfFcwyJpD9';
const REVIEW =
  'https://search.google.com/local/writereview?placeid=ChIJd8BlQ2zBhkcR8vqJxJxJxJx';

// CSS additions
if (!html.includes('.logo-plate')) {
  html = html.replace(
    '.hero-logo-wrap {',
    `.logo-plate {
      background: #ffffff;
      border: 2px solid rgba(251,191,36,.35);
      box-shadow: 0 12px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.08);
    }
    .logo-plate img { display: block; }
    .home-screen {
      min-height: 100dvh;
      min-height: 100svh;
    }
    .stats-screen {
      min-height: 100dvh;
      min-height: 100svh;
      scroll-margin-top: 4rem;
    }
    .btn-call {
      display: flex; align-items: center; justify-content: center; gap: .75rem;
      width: 100%; padding: 1rem 1.25rem; border-radius: .75rem;
      font-weight: 700; font-size: 1.125rem; transition: transform .15s ease;
    }
    .btn-call:active { transform: scale(.98); }
    .btn-wa {
      display: flex; align-items: center; justify-content: center; gap: .75rem;
      width: 100%; padding: 1rem 1.25rem; border-radius: .75rem;
      font-weight: 700; font-size: 1rem;
    }
    .hero-logo-wrap {`
  );
  html = html.replace(
    '.hero-logo-wrap {\n      background: linear-gradient(160deg, rgba(251,191,36,.08), rgba(15,23,42,.9));\n      border: 1px solid rgba(251,191,36,.15);\n    }',
    '.hero-logo-wrap {\n      background: #ffffff;\n      border: 2px solid rgba(251,191,36,.35);\n      box-shadow: 0 16px 48px rgba(0,0,0,.4);\n    }'
  );
}

html = html.replace(/Numeri che contano, non slogan/g, 'Numeri che contano');

// Nav logo plate
html = html.replace(
  '<img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="h-11 w-auto">',
  '<img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="h-11 w-auto logo-plate rounded-lg p-1">'
);

// Replace hero section with mobile-first home
const heroRe = /<section class="relative min-h-\[88vh\][\s\S]*?<\/section>\s*\n\s*<section id="chi-siamo"/;
const newHome = `<section id="home" class="home-screen relative flex flex-col px-4 md:px-6 py-6 md:py-10 overflow-hidden border-b border-slate-800">
    <motion.div class="solar-glow top-0 left-0 pointer-events-none"></motion.div>
    <div class="max-w-lg mx-auto w-full flex-1 flex flex-col relative z-10 md:max-w-2xl">
      <motion.div class="flex justify-center mb-5 md:mb-6">
        <div class="hero-logo-wrap logo-plate rounded-2xl p-4 md:p-6">
          <img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="h-32 sm:h-40 w-auto mx-auto">
        </div>
      </div>
      <div class="text-center space-y-3 mb-6">
        <p class="text-xs uppercase tracking-[0.2em] text-amber-500 font-bold">Vedano Olona · Varese</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white leading-tight font-display">
          Fotovoltaico, termico ed eolico<br>
          <span class="text-amber-400">con un solo referente</span>
        </h1>
        <p class="text-slate-400 text-sm leading-relaxed">Eugenio Morello — sopralluogo, preventivo scritto e posa diretta. Niente call center.</p>
      </div>
      <div class="space-y-3 mb-6">
        <a href="tel:+393292354847" class="btn-call bg-white text-slate-950 hover:bg-amber-50 shadow-lg">
          <i class="fa-solid fa-phone text-amber-600"></i>
          <span>329 235 4847</span>
        </a>
        <a href="https://wa.me/393292354847?text=Buongiorno%2C%20vorrei%20informazioni%20su%20un%20impianto." class="btn-wa bg-green-600 hover:bg-green-500 text-white" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp text-xl"></i>
          <span>Scrivi su WhatsApp</span>
        </a>
      </div>
      <form id="home-contact-form" class="blur-card blur-card-gold rounded-2xl p-5 space-y-3 flex-1" action="https://formsubmit.co/info@energiasolaremorello.it" method="POST">
        <p class="text-white font-bold text-sm">Richiedi richiamata</p>
        <input type="hidden" name="_subject" value="Richiesta dalla home (mobile)">
        <input type="hidden" name="_captcha" value="false">
        <input type="text" name="_honey" class="hidden" tabindex="-1" autocomplete="off">
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Nome</label>
          <input type="text" name="nome" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-3 text-white text-base focus:border-amber-500 outline-none" autocomplete="name">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Telefono</label>
          <input type="tel" name="telefono" required inputmode="tel" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-3 text-white text-base focus:border-amber-500 outline-none" autocomplete="tel">
        </motion.div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Messaggio breve</label>
          <textarea name="messaggio" rows="2" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-3 text-white text-base focus:border-amber-500 outline-none" placeholder="Es. tetto villa, bolletta 200€..."></textarea>
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold uppercase tracking-wider py-3.5 rounded-lg text-sm">Invia — ti richiamiamo</button>
        <p id="home-form-msg" class="text-xs text-slate-500 text-center" role="status"></p>
      </form>
      <a href="#numeri" class="mt-5 text-center text-xs text-slate-500 hover:text-amber-400 py-2">Scorri per i nostri numeri <i class="fa-solid fa-chevron-down ml-1"></i></a>
    </div>
  </section>

  <section id="chi-siamo"`;

if (!heroRe.test(html)) {
  console.error('Hero block not found');
  process.exit(1);
}
html = html.replace(heroRe, newHome);

// Move numeri before chi-siamo: cut numeri section and insert after home
const numeriRe = /<section id="numeri" class="figures[\s\S]*?<\/section>\s*/;
const numeriMatch = html.match(numeriRe);
if (numeriMatch) {
  let numeriBlock = numeriMatch[0];
  numeriBlock = numeriBlock.replace(
    'class="figures border-y border-slate-800 bg-slate-950 py-20 md:py-28"',
    'class="figures stats-screen border-y border-slate-800 bg-slate-950 py-16 md:py-20 flex flex-col justify-center"'
  );
  html = html.replace(numeriRe, '');
  html = html.replace(
    '</section>\n\n  <section id="chi-siamo"',
    `</section>\n\n  ${numeriBlock}\n  <section id="chi-siamo"`
  );
}

// GBP section before footer
const gbpSection = `
  <section id="google-business" class="bg-slate-950 border-t border-slate-800 py-16 md:py-20 px-4 md:px-6">
    <div class="max-w-3xl mx-auto text-center space-y-6">
      <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Google Business Profile</span>
      <h2 class="text-2xl md:text-3xl font-bold text-white font-display">Cosa dicono i clienti su Google</h2>
      <div class="flex items-center justify-center gap-2 text-amber-400 text-3xl font-display font-bold">
        <span>5,0</span>
        <span class="text-amber-500 text-lg"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
      </div>
      <p class="text-slate-400 text-sm">7 recensioni verificate · Via Torino 4, Vedano Olona (VA)</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <a href="${MAPS}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-slate-950 font-bold text-sm hover:bg-amber-50 transition">
          <i class="fa-brands fa-google"></i> Apri su Google Maps
        </a>
        <a href="${MAPS}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-amber-500/50 text-amber-400 font-bold text-sm hover:bg-amber-500/10 transition">
          <i class="fa-solid fa-comment"></i> Leggi le recensioni
        </a>
        <a href="${MAPS}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition">
          <i class="fa-solid fa-pen"></i> Lascia una recensione
        </a>
      </div>
      <p class="text-xs text-slate-600 max-w-md mx-auto">Il pulsante recensione apre il profilo Google dell'attività: tocca «Scrivi una recensione» nella scheda.</p>
    </div>
  </section>

`;

if (!html.includes('id="google-business"')) {
  html = html.replace('<footer class="bg-slate-950 border-t border-slate-900', gbpSection + '\n  <footer class="bg-slate-950 border-t border-slate-900');
}

// Home form script
const homeFormScript = `
    const homeForm = document.getElementById('home-contact-form');
    const homeMsg = document.getElementById('home-form-msg');
    if (homeForm && homeMsg) {
      homeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        homeMsg.textContent = 'Invio in corso...';
        try {
          const r = await fetch(homeForm.action, { method: 'POST', body: new FormData(homeForm) });
          homeMsg.textContent = r.ok ? 'Richiesta inviata. Vi richiamiamo presto.' : 'Errore. Chiamate il 329 235 4847.';
          if (r.ok) homeForm.reset();
        } catch {
          homeMsg.textContent = 'Errore di rete. Chiamate il 329 235 4847.';
        }
      });
    }`;

if (!html.includes('home-contact-form')) {
  console.warn('home form script skip');
} else if (!html.includes('home-contact-form')) {
  html = html.replace(
    "if (form && msg) {",
    homeFormScript + "\n    if (form && msg) {"
  );
}

html = html.replace(/motion\.div/g, 'motion.div');
html = html.replace(/motion\.div/g, 'div');

writeFileSync(file, html, 'utf8');
console.log('Patched index.html');
