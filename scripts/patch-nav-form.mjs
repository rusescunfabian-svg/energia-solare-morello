import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let h = readFileSync(file, 'utf8');

if (!h.includes('homeForm')) {
  h = h.replace(
    'if (form && msg) {',
    `const homeForm = document.getElementById('home-contact-form');
    const homeMsg = document.getElementById('home-form-msg');
    if (homeForm && homeMsg) {
      homeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        homeMsg.textContent = 'Invio in corso...';
        try {
          const r = await fetch(homeForm.action, { method: 'POST', body: new FormData(homeForm) });
          homeMsg.textContent = r.ok ? 'Richiesta inviata. Vi richiameremo presto.' : 'Errore. Chiamate il 329 235 4847.';
          if (r.ok) homeForm.reset();
        } catch {
          homeMsg.textContent = 'Errore di rete. Chiamate il 329 235 4847.';
        }
      });
    }
    if (form && msg) {`
  );
}

h = h.replace(
  '<a href="#chi-siamo" class="hover:text-amber-400 transition">Chi siamo</a>\n        <a href="#numeri"',
  '<a href="#home" class="hover:text-amber-400 transition">Home</a>\n        <a href="#numeri" class="text-amber-400 font-bold"'
);

h = h.replace(
  '<a href="#chi-siamo" class="py-2">Chi siamo</a>\n      <a href="#numeri" class="py-2">Numeri</a>',
  '<a href="#home" class="py-2">Home</a>\n      <a href="#numeri" class="py-2 text-amber-400">Numeri</a>\n      <a href="#chi-siamo" class="py-2">Chi siamo</a>'
);

writeFileSync(file, h);
console.log('OK', h.includes('homeForm'), h.includes('id="home"'));
