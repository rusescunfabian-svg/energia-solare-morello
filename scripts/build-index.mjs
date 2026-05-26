import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Energia Solare di Morello Eugenio | Ingegneria Energetica Varese</title>
  <meta name="description" content="Impianti fotovoltaici, solari termici ed eolici a Vedano Olona e provincia di Varese.">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="icon" href="assets/img/logo.svg" type="image/svg+xml">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;700&display=swap');
    :root { --font-sans: 'Plus Jakarta Sans', sans-serif; --font-display: 'Space Grotesk', sans-serif; }
    body { font-family: var(--font-sans); background-color: #0b111e; color: #f8fafc; }
    h1, h2, h3, .font-display { font-family: var(--font-display); }
    .solar-glow { position: absolute; width: 400px; height: 400px; background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%); z-index: 0; pointer-events: none; }
    .blur-card { background: rgba(17,24,39,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
    [data-stat-row] { opacity: 0; transform: translateY(8px); transition: opacity .5s ease, transform .5s ease; }
    .figures.is-live [data-stat-row] { opacity: 1; transform: none; }
  </style>
</head>
<body class="selection:bg-yellow-500 selection:text-slate-900 overflow-x-hidden">

  <div class="bg-amber-500 text-slate-950 font-medium text-xs tracking-widest uppercase py-2.5 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-1 border-b border-amber-600/20">
    <div><i class="fa-solid fa-gears mr-1.5"></i> Impianti certificati DM 37/08 · Provincia di Varese</div>
    <motion.div>Consulenza: <a href="tel:+393292354847" class="font-bold hover:underline">329 235 4847</a></div>
  </div>

  <nav class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 py-3">
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-4">
      <a href="index.html"><img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="h-11 w-auto"></a>
      <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#numeri" class="hover:text-amber-400">Numeri</a>
        <a href="#ingegneria" class="hover:text-amber-400">Sistemi</a>
        <a href="#fotovoltaico" class="hover:text-amber-400">Fotovoltaico</a>
        <a href="#eolico" class="hover:text-amber-400">Eolico</a>
        <a href="#termico" class="hover:text-amber-400">Termico</a>
        <a href="#portfolio-reale" class="text-amber-400 font-bold">Cantieri</a>
        <a href="progetti.html" class="hover:text-amber-400">Progetti</a>
      </div>
      <div class="flex items-center gap-2">
        <a href="tel:+393292354847" class="hidden sm:inline-flex bg-white hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 py-2.5 rounded items-center gap-2"><i class="fa-solid fa-phone"></i> Chiama</a>
        <button id="menu-btn" type="button" class="lg:hidden text-white p-2 border border-slate-700 rounded" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
    <div id="mobile-nav" class="hidden lg:hidden mt-3 pb-2 border-t border-slate-800 pt-3 flex flex-col gap-2 text-sm text-slate-300">
      <a href="#numeri" class="py-2">Numeri</a><a href="#ingegneria" class="py-2">Sistemi</a><a href="#portfolio-reale" class="py-2 text-amber-400">Cantieri</a>
      <a href="progetti.html" class="py-2">Progetti</a><a href="#contatti" class="py-2">Contatti</a>
      <a href="tel:+393292354847" class="py-2 font-bold text-white">329 235 4847</a>
    </div>
  </nav>

  <section class="relative min-h-[85vh] flex items-center px-4 md:px-6 py-16 md:py-20 overflow-hidden border-b border-slate-800">
    <div class="solar-glow top-10 left-10"></div>
    <div class="solar-glow bottom-10 right-10"></div>
    <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
      <div class="lg:col-span-7 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-400 uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-green-500"></span> Vedano Olona · Varese</div>
        <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">Non vendiamo pannelli.<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Progettiamo indipendenza.</span></h1>
        <p class="text-slate-400 text-base md:text-lg max-w-xl">Energia Solare di Morello Eugenio: sopralluogo sul tetto, preventivo scritto e posa diretta. Fotovoltaico, termico ed eolico.</p>
        <div class="flex flex-col sm:flex-row gap-3"><a href="#portfolio-reale" class="text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm uppercase px-6 py-3.5 rounded">Vedi cantieri</a><a href="#contatti" class="text-center border border-slate-700 text-white font-bold text-sm uppercase px-6 py-3.5 rounded">Sopralluogo</a></div>
      </div>
      <div class="lg:col-span-5 blur-card p-6 md:p-8 rounded-xl">
        <h3 class="text-xl font-bold text-white mb-5 font-display">Ingegneria energetica locale</h3>
        <div class="space-y-4 text-sm">
          <div class="flex gap-4 p-4 bg-slate-950/50 rounded border border-slate-800"><i class="fa-solid fa-location-dot text-amber-500 text-xl"></i><motion.div><h4 class="font-bold text-white text-xs uppercase mb-1">Sede</h4><p class="text-slate-400">Via Torino 4, 21040 Vedano Olona (VA)</p></div></div>
          <div class="flex gap-4 p-4 bg-slate-950/50 rounded border border-slate-800"><i class="fa-solid fa-headset text-amber-500 text-xl"></i><motion.div><h4 class="font-bold text-white text-xs uppercase mb-1">Telefono</h4><a href="tel:+393292354847" class="text-lg font-bold text-white">329 235 4847</a></div></div>
        </div>
        <p class="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500">P.IVA 1470745430 · Varese / Como / Milano nord</p>
      </div>
    </div>
  </section>

  <section id="numeri" class="figures border-y border-slate-800 bg-slate-950 py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-4 md:px-6 text-center mb-10">
      <span class="text-xs font-bold uppercase tracking-widest text-amber-500">I nostri numeri</span>
      <p class="mt-4 text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white"><span class="text-amber-400 figures__count" data-count="3170000" data-prefix="+" data-format="it" data-ms="3200" data-mega="true">0</span><span class="text-amber-500/90 text-2xl md:text-4xl"> kWh</span></p>
      <p class="text-slate-400 mt-2 text-sm">di energia pulita prodotta dai nostri impianti</p>
    </div>
    <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div data-stat-row class="blur-card rounded-lg p-5 text-center"><p class="text-3xl md:text-4xl font-display font-bold text-white"><span class="figures__count" data-count="100" data-prefix="+" data-ms="2200">0</span></p><p class="text-slate-400 text-xs mt-2 uppercase">impianti realizzati</p></div>
      <div data-stat-row class="blur-card rounded-lg p-5 text-center"><p class="text-3xl md:text-4xl font-display font-bold text-white"><span class="figures__count" data-count="5" data-decimals="1" data-ms="2000">0,0</span></p><p class="text-slate-400 text-xs mt-2 uppercase">Google · 7 recensioni</p></div>
      <div data-stat-row class="blur-card rounded-lg p-5 text-center"><p class="text-3xl md:text-4xl font-display font-bold text-white"><span class="figures__count" data-count="100" data-prefix="+" data-ms="2200">0</span></p><p class="text-slate-400 text-xs mt-2 uppercase">clienti fedeli</p></div>
      <div data-stat-row class="blur-card rounded-lg p-5 text-center"><p class="text-3xl md:text-4xl font-display font-bold text-white"><span class="figures__count" data-count="3" data-ms="1800">0</span></p><p class="text-slate-400 text-xs mt-2 uppercase">tecnologie</p></div>
    </div>
  </section>

  <section id="ingegneria" class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-24">
    <div class="text-center max-w-3xl mx-auto mb-14 space-y-4"><span class="text-xs font-bold uppercase tracking-widest text-amber-500">Sistemi</span><h2 class="text-2xl md:text-5xl font-bold text-white">Tre tecnologie. Un referente.</h2></div>
    <motion.div class="grid md:grid-cols-3 gap-6">
      <div id="fotovoltaico" class="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 space-y-4"><motion.div class="w-12 h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl"><i class="fa-solid fa-solar-panel"></i></div><h3 class="text-2xl font-bold text-white">Fotovoltaico</h3><p class="text-slate-400 text-sm">Moduli, inverter, quadro e connessione in rete con collaudo.</p></div>
      <div id="eolico" class="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 space-y-4"><motion.div class="w-12 h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl"><i class="fa-solid fa-wind"></i></div><h3 class="text-2xl font-bold text-white">Eolico</h3><p class="text-slate-400 text-sm">Minieolico dove vento e distanze reggono.</p></div>
      <div id="termico" class="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 space-y-4"><motion.div class="w-12 h-12 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl"><i class="fa-solid fa-temperature-arrow-up"></i></div><h3 class="text-2xl font-bold text-white">Solare termico</h3><p class="text-slate-400 text-sm">Acqua calda e integrazione con caldaia o pompa di calore.</p></motion.div>
    </div>
  </section>

  <section id="portfolio-reale" class="bg-slate-950 py-20 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 md:px-6 mb-12"><span class="text-xs font-bold uppercase text-amber-500">Cantieri reali</span><h2 class="text-3xl md:text-5xl font-bold text-white font-display mt-2">Report installazioni</h2><a href="progetti.html" class="text-amber-400 text-sm font-bold mt-2 inline-block">Tutti i progetti →</a></div>
    <div class="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
      <div class="grid lg:grid-cols-2 gap-10 items-center"><img src="assets/img/hero.jpg" alt="" class="rounded-xl border border-slate-800 w-full h-72 object-cover"><motion.div><p class="text-amber-500 text-xs uppercase font-mono mb-2">Vedano Olona</p><h3 class="text-2xl font-bold text-white mb-3">Tetto in coppo</h3><p class="text-slate-400 text-sm mb-3">Fotovoltaico residenziale con sopralluogo ombre e tegole.</p><a href="progetti/villa-comignolo.html" class="text-amber-400 text-sm font-bold">Dettagli</a></div></div>
      <div class="grid lg:grid-cols-2 gap-10 items-center"><img src="assets/img/pensilina-industriale.jpg" alt="" class="rounded-xl border border-slate-800 w-full h-72 object-cover lg:order-2"><motion.div class="lg:order-1"><p class="text-amber-500 text-xs uppercase font-mono mb-2">Commerciale</p><h3 class="text-2xl font-bold text-white mb-3">Pensilina FV</h3><p class="text-slate-400 text-sm mb-3">Copertura veicoli con produzione elettrica.</p><a href="progetti/pensilina-industriale.html" class="text-amber-400 text-sm font-bold">Dettagli</a></div></div>
      <div class="grid lg:grid-cols-2 gap-10 items-center"><img src="assets/img/copertura-piana-misto.jpg" alt="" class="rounded-xl border border-slate-800 w-full h-72 object-cover"><motion.div><p class="text-amber-500 text-xs uppercase font-mono mb-2">FV + termico</p><h3 class="text-2xl font-bold text-white mb-3">Copertura piana</h3><p class="text-slate-400 text-sm mb-3">Impianto misto su capannone.</p><a href="progetti/copertura-piana.html" class="text-amber-400 text-sm font-bold">Dettagli</a></div></div>
    </div>
  </section>

  <section id="contatti" class="max-w-7xl mx-auto px-4 md:px-6 py-20 border-t border-slate-800">
    <div class="grid lg:grid-cols-2 gap-12">
      <div><span class="text-xs font-bold uppercase text-amber-500">Contatti</span><h2 class="text-3xl font-bold text-white font-display mt-2 mb-4">Richiedi sopralluogo</h2><p class="text-slate-400 text-sm">Sopralluogo gratuito in provincia di Varese.</p></div>
      <form id="contact-form" class="blur-card rounded-xl p-6 space-y-4" action="https://formsubmit.co/info@energiasolaremorello.it" method="POST">
        <input type="hidden" name="_subject" value="Richiesta sito"><input type="hidden" name="_captcha" value="false">
        <div><label class="text-xs text-slate-500 uppercase">Nome</label><input name="nome" required class="w-full mt-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm"></div>
        <div><label class="text-xs text-slate-500 uppercase">Telefono</label><input name="telefono" required class="w-full mt-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm"></div>
        <div><label class="text-xs text-slate-500 uppercase">Messaggio</label><textarea name="messaggio" rows="3" class="w-full mt-1 bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white text-sm"></textarea></div>
        <button type="submit" class="w-full bg-amber-500 text-slate-950 font-bold uppercase text-sm py-3 rounded">Invia</button>
        <p id="form-msg" class="text-sm text-slate-500"></p>
      </form>
    </div>
  </section>

  <footer class="bg-slate-950 border-t border-slate-900 py-12 px-4 text-sm text-slate-500">
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <div><img src="assets/img/logo.svg" alt="" class="h-12 mb-3"><p class="text-xs">Energia Solare di Morello Eugenio · Vedano Olona</p></div>
      <div><p class="text-white font-bold text-sm mb-2">Contatti</p><p class="text-xs">329 235 4847<br>Via Torino 4, Vedano Olona</p></div>
      <div><p class="text-white font-bold text-sm mb-2">Normative</p><p class="text-xs">CEI 0-21 · DM 37/08</p></div>
    </div>
    <p class="max-w-7xl mx-auto text-center text-xs mt-8 pt-6 border-t border-slate-900">© 2026 Energia Solare di Morello Eugenio · P.IVA 1470745430</p>
  </footer>

  <a href="https://wa.me/393292354847" class="fixed bottom-5 right-5 z-40 bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>

  <script src="assets/js/stats.js"></script>
  <script src="assets/js/site.js"></script>
  <script>
    const form=document.getElementById('contact-form');const msg=document.getElementById('form-msg');
    if(form&&msg)form.addEventListener('submit',async e=>{e.preventDefault();msg.textContent='Invio...';try{const r=await fetch(form.action,{method:'POST',body:new FormData(form)});msg.textContent=r.ok?'Inviato. Vi richiamiamo.':'Errore. Chiamate 329 235 4847.';if(r.ok)form.reset();}catch{msg.textContent='Errore rete.';}});
  </script>
</body>
</html>`;

const fixed = html.replaceAll('<motion.div>', '<div>').replaceAll('</motion.div>', '</div>');
writeFileSync(join(root, 'index.html'), fixed, 'utf8');
console.log('written', fixed.length);
