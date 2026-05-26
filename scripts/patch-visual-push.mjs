import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let h = readFileSync(file, 'utf8');

// Logos more visible
h = h.replace(
  `.logo-plate {
      background: #fff;
      border: 2px solid rgba(245,158,11,.4);
      box-shadow: 0 12px 40px rgba(15,23,42,.12);
    }`,
  `.logo-plate {
      background: #ffffff;
      border: 3px solid #f59e0b;
      box-shadow: 0 8px 32px rgba(15,23,42,.18), 0 0 0 4px rgba(255,255,255,.95);
    }
    .logo-plate--nav {
      padding: 0.35rem 0.5rem;
      border-radius: 0.65rem;
    }
    .logo-plate--hero {
      padding: 1rem 1.25rem;
      border-radius: 1.25rem;
      box-shadow: 0 16px 48px rgba(15,23,42,.22), 0 0 0 6px rgba(255,255,255,.98);
    }
    .logo-plate--hero img {
      height: 9rem;
      width: auto;
      max-width: min(100%, 280px);
    }
    @media (min-width: 640px) {
      .logo-plate--hero img { height: 11rem; }
    }`
);

// Background photo more visible (less white overlay)
h = h.replace(
  `background-image: linear-gradient(180deg, rgba(255,255,255,.88) 0%, rgba(244,247,251,.94) 55%, rgba(244,247,251,.98) 100%),
        url('assets/img/hero.jpg');`,
  `background-image: linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(244,247,251,.78) 50%, rgba(244,247,251,.88) 100%),
        url('assets/img/hero.jpg');`
);

// Nav + home logo classes
h = h.replace(
  'class="h-11 w-auto logo-plate rounded-lg p-1"',
  'class="h-12 sm:h-14 w-auto logo-plate logo-plate--nav"'
);
h = h.replace(
  '<motion.div class="logo-plate rounded-2xl p-4 md:p-6">\n          <img src="assets/img/logo.svg" alt="Logo" class="h-28 sm:h-36 w-auto mx-auto">',
  '<div class="logo-plate logo-plate--hero">\n          <img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="w-auto mx-auto">'
);
h = h.replace(
  'class="logo-plate rounded-2xl p-4 md:p-6"',
  'class="logo-plate logo-plate--hero"'
);
h = h.replace(
  'alt="Logo" class="h-28 sm:h-36 w-auto mx-auto"',
  'alt="Energia Solare di Morello Eugenio" class="w-auto mx-auto"'
);
if (h.includes('motion.div')) {
  h = h.split('motion.div').join('div');
}

// Remove Track record
h = h.replace(
  `        <span class="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Track record</span>
        <h2 class="mt-3 text-2xl md:text-3xl font-display font-bold text-slate-900">Numeri che contano</h2>`,
  `        <h2 class="text-2xl md:text-3xl font-display font-bold text-slate-900">Numeri che contano</h2>`
);

// Faster kWh countdown
h = h.replace('data-ms="6200" data-mega="true"', 'data-ms="4500" data-mega="true"');
h = h.replace('data-ms="3400">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">impianti', 'data-ms="2800">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">impianti');
h = h.replace('data-ms="3200">0,0</span>', 'data-ms="2600">0,0</span>');
h = h.replace('data-ms="3400">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">clienti', 'data-ms="2800">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">clienti');
h = h.replace('data-ms="3000">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">tecnologie', 'data-ms="2400">0</span></p>\n          <p class="text-slate-500 text-xs mt-2 uppercase tracking-widest">tecnologie');

// Mobile-first text on home
h = h.replace(
  '<h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight font-display">',
  '<h1 class="text-[1.65rem] leading-snug sm:text-3xl font-bold text-slate-900 font-display px-1">'
);

writeFileSync(file, h, 'utf8');
console.log('Patched index.html');
