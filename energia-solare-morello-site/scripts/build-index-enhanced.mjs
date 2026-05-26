import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Energia Solare di Morello Eugenio | Ingegneria Energetica Varese</title>
  <meta name="description" content="Impianti fotovoltaici, solari termici ed eolici a Vedano Olona e provincia di Varese. Progettazione e installazione diretta.">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="icon" href="assets/img/logo.svg" type="image/svg+xml">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;700&display=swap');
    :root {
      --font-sans: 'Plus Jakarta Sans', sans-serif;
      --font-display: 'Space Grotesk', sans-serif;
      --gold: #fbbf24;
    }
    body { font-family: var(--font-sans); background: #070b14; color: #f8fafc; }
    h1, h2, h3, .font-display { font-family: var(--font-display); }
    .lux-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(251,191,36,.45), transparent);
    }
    .solar-glow {
      position: absolute; width: 520px; height: 520px;
      background: radial-gradient(circle, rgba(234, 179, 8, 0.09) 0%, transparent 68%);
      z-index: 0; pointer-events: none;
    }
    .blur-card {
      background: linear-gradient(145deg, rgba(17,24,39,.85), rgba(11,17,32,.75));
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,.06);
      box-shadow: 0 24px 48px rgba(0,0,0,.35);
    }
    .blur-card-gold {
      border-color: rgba(251,191,36,.18);
      box-shadow: 0 0 0 1px rgba(251,191,36,.06), 0 28px 56px rgba(0,0,0,.4);
    }
    .stat-mega {
      position: relative;
      padding: 2.5rem 1rem 2rem;
      border-radius: 1rem;
      background: linear-gradient(180deg, rgba(251,191,36,.06) 0%, transparent 100%);
      border: 1px solid rgba(251,191,36,.12);
    }
    .stat-mega::before {
      content: '';
      position: absolute; inset: -1px; border-radius: inherit;
      background: linear-gradient(135deg, rgba(251,191,36,.2), transparent 50%);
      opacity: .35; pointer-events: none;
    }
    .figures.is-live [data-stat-row] { animation: fadeUp .55s ease forwards; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: none; }
    }
    [data-stat-row] { opacity: 0; }
    .figures.is-live [data-stat-row] { opacity: 1; }
    [data-stat-row].is-done { box-shadow: 0 0 0 1px rgba(251,191,36,.15); }
    .calc-range { accent-color: #f59e0b; }
    .hero-logo-wrap {
      background: linear-gradient(160deg, rgba(251,191,36,.08), rgba(15,23,42,.9));
      border: 1px solid rgba(251,191,36,.15);
    }
  </style>
</head>
<body class="selection:bg-yellow-500 selection:text-slate-900 overflow-x-hidden">

  <motion.div class="bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-medium text-xs tracking-widest uppercase py-2.5 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-1">
    <div><i class="fa-solid fa-certificate mr-1.5"></i> Impianti certificati DM 37/08 &middot; Provincia di Varese</div>
    <div>Consulenza diretta: <a href="tel:+393292354847" class="font-bold hover:underline">329 235 4847</a></motion.div>
  </motion.div>

  <nav class="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-6 py-3">
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-4">
      <a href="index.html" class="flex items-center gap-3 shrink-0">
        <img src="assets/img/logo.svg" alt="Energia Solare di Morello Eugenio" class="h-11 w-auto">
      </a>
      <div class="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
        <a href="#chi-siamo" class="hover:text-amber-400 transition">Chi siamo</a>
        <a href="#numeri" class="hover:text-amber-400 transition">Numeri</a>
        <a href="#risparmio" class="hover:text-amber-400 transition">Risparmio</a>
        <a href="#ingegneria" class="hover:text-amber-400 transition">Sistemi</a>
        <a href="#portfolio-reale" class="text-amber-400 font-bold"><i class="fa-solid fa-images mr-1"></i> Cantieri</a>
        <a href="progetti.html" class="hover:text-amber-400 transition">Progetti</a>
      </motion.div>
      <div class="flex items-center gap-2">
        <a href="tel:+393292354847" class="hidden sm:inline-flex bg-white hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition items-center gap-2">
          <i class="fa-solid fa-phone"></i> Chiama
        </a>
        <button id="menu-btn" type="button" class="lg:hidden text-white p-2 border border-slate-700 rounded" aria-label="Menu">
          <i class="fa-solid fa-bars text-lg"></i>
        </button>
      </motion.div>
    </motion.div>
    <div id="mobile-nav" class="hidden lg:hidden mt-3 pb-2 border-t border-slate-800 pt-3 flex flex-col gap-2 text-sm text-slate-300">
      <a href="#chi-siamo" class="py-2">Chi siamo</a>
      <a href="#numeri" class="py-2">Numeri</a>
      <a href="#risparmio" class="py-2 text-amber-400">Calcola risparmio</a>
      <a href="#portfolio-reale" class="py-2">Cantieri</a>
      <a href="progetti.html" class="py-2">Progetti</a>
      <a href="#contatti" class="py-2">Contatti</a>
      <a href="tel:+393292354847" class="py-2 font-bold text-white">329 235 4847</a>
    </motion.div>
  </nav>

  <section class="relative min-h-[88vh] flex items-center px-4 md:px-6 py-16 md:py-24 overflow-hidden border-b border-slate-800">
    <div class="solar-glow top-0 left-0"></motion.div>
    <motion.div class="solar-glow bottom-0 right-0"></motion.div>
    <div class="max-w-7xl mx-auto w-full relative z-10">
      <div class="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10 md:gap-14">
        <div class="md:flex-1 space-y-6 md:space-y-8 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 border border-slate-700/80 rounded-full text-xs text-slate-400 uppercase tracking-widest">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Vedano Olona &middot; Varese e provincia
          </motion.div>
          <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]">
            Non vendiamo pannelli.<br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">Progettiamo indipendenza.</span>
          </h1>
          <p class="text-slate-400 text-base md:text-lg leading-relaxed">
            Da oltre vent'anni installiamo fotovoltaico, solare termico ed eolico con un solo referente: <strong class="text-slate-200">Eugenio Morello</strong>. Niente call center, niente subappalti anonimi. Sopralluogo, dimensionamento, posa e collaudo — tutto in casa.
          </p>
          <p class="text-slate-500 text-sm md:text-base leading-relaxed border-l-2 border-amber-500/40 pl-4">
            Ogni impianto nasce da consumi reali, ombre sul tetto e obiettivi di risparmio. Il preventivo è scritto, comprensibile, senza sorprese in cantiere.
          </p>
          <div class="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
            <a href="#risparmio" class="text-center bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm uppercase tracking-wider px-7 py-4 rounded shadow-lg shadow-amber-500/20 transition">
              Calcola quanto risparmi
            </a>
            <a href="#portfolio-reale" class="text-center border border-slate-600 hover:border-amber-500/50 text-white font-bold text-sm uppercase tracking-wider px-7 py-4 rounded transition">
              Cantieri reali
            </a>
          </motion.div>
        </motion.div>
        <div class="flex justify-end md:justify-center shrink-0">
          <div class="hero-logo-wrap rounded-2xl p-6 md:p-10">
            <img src="assets/img/logo.svg" alt="Logo Energia Solare Morello" class="h-28 sm:h-36 md:h-44 w-auto drop-shadow-2xl">
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>

  <section id="chi-siamo" class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
    <motion.div class="lux-line mb-16 max-w-3xl mx-auto"></motion.div>
    <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div class="lg:col-span-5 space-y-5">
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Chi siamo</span>
        <h2 class="text-2xl md:text-4xl font-bold text-white leading-tight">Artigiani dell'energia, non rivenditori.</h2>
        <p class="text-slate-400 text-sm md:text-base leading-relaxed">
          Energia Solare di Morello Eugenio è un'impresa locale con sede in Via Torino 4 a Vedano Olona. Lavoriamo principalmente in provincia di Varese, Como e Milano nord, su ville, condomini e capannoni.
        </p>
      </motion.div>
      <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4 md:gap-5">
        <div class="blur-card blur-card-gold rounded-xl p-6 space-y-3">
          <i class="fa-solid fa-ruler-combined text-amber-400 text-xl"></i>
          <h3 class="font-bold text-white">Metodo in 4 passi</h3>
          <ol class="text-slate-400 text-sm space-y-2 list-decimal list-inside">
            <li>Sopralluogo e bollette</li>
            <li>Progetto e preventivo scritto</li>
            <li>Posa con squadra interna</li>
            <li>Collaudo e assistenza</li>
          </ol>
        </motion.div>
        <div class="blur-card rounded-xl p-6 space-y-3">
          <i class="fa-solid fa-shield-halved text-amber-400 text-xl"></i>
          <h3 class="font-bold text-white">Garanzie chiare</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Componenti con garanzia di fabbrica, impianto a norma CEI, pratiche GSE e connessione gestite da noi.</p>
        </motion.div>
        <div class="blur-card rounded-xl p-6 space-y-3 sm:col-span-2">
          <i class="fa-solid fa-users text-amber-400 text-xl"></i>
          <h3 class="font-bold text-white">Perché i clienti ci richiamano</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Perché risponde sempre la stessa persona che ha visto il vostro tetto. Per ampliamenti, manutenzione o secondo impianto non ripartite da zero con un call center.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>

  <section id="numeri" class="figures border-y border-slate-800 bg-slate-950 py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="text-center mb-12 md:mb-16">
        <span class="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">Track record</span>
        <h2 class="mt-4 text-2xl md:text-3xl font-display font-bold text-white">Numeri che contano, non slogan</h2>
      </motion.div>
      <div class="stat-mega max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <p class="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-none">
          <span class="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 figures__count" data-count="3170000" data-prefix="+" data-format="it" data-ms="4200" data-mega="true">0</span>
          <span class="text-amber-500/80 text-2xl md:text-4xl font-normal"> kWh</span>
        </p>
        <p class="text-slate-400 mt-4 text-sm md:text-base max-w-lg mx-auto">di energia pulita prodotta cumulativamente dai nostri impianti fotovoltaici, termici ed eolici</p>
      </motion.div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <div data-stat-row class="blur-card blur-card-gold rounded-xl p-6 md:p-7 text-center">
          <p class="text-3xl md:text-5xl font-display font-bold text-white"><span class="figures__count" data-count="100" data-prefix="+" data-ms="2600">0</span></p>
          <p class="text-slate-400 text-xs mt-3 uppercase tracking-widest">impianti realizzati</p>
        </motion.div>
        <div data-stat-row class="blur-card blur-card-gold rounded-xl p-6 md:p-7 text-center">
          <p class="text-3xl md:text-5xl font-display font-bold text-white"><span class="figures__count" data-count="5" data-decimals="1" data-ms="2400">0,0</span></p>
          <p class="text-slate-400 text-xs mt-3 uppercase tracking-widest">Google &middot; 7 recensioni</p>
        </motion.div>
        <div data-stat-row class="blur-card blur-card-gold rounded-xl p-6 md:p-7 text-center">
          <p class="text-3xl md:text-5xl font-display font-bold text-white"><span class="figures__count" data-count="100" data-prefix="+" data-ms="2600">0</span></p>
          <p class="text-slate-400 text-xs mt-3 uppercase tracking-widest">clienti fedeli</p>
        </motion.div>
        <div data-stat-row class="blur-card blur-card-gold rounded-xl p-6 md:p-7 text-center">
          <p class="text-3xl md:text-5xl font-display font-bold text-white"><span class="figures__count" data-count="3" data-ms="2200">0</span></p>
          <p class="text-slate-400 text-xs mt-3 uppercase tracking-widest">FV &middot; termico &middot; eolico</p>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>

  <section id="risparmio" class="relative py-20 md:py-28 border-t border-slate-800 overflow-hidden">
    <div class="solar-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></motion.div>
    <div class="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <motion.div class="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-4">
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Simulatore</span>
        <h2 class="text-2xl md:text-4xl font-bold text-white font-display">Quanto puoi risparmiare in bolletta?</h2>
        <p class="text-slate-400 text-sm md:text-base">Inserisci i tuoi dati per una <strong class="text-slate-300">stima indicativa</strong>. Per un calcolo preciso serve il sopralluogo con bollette e foto del tetto.</p>
      </motion.div>
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <form id="savings-form" class="blur-card blur-card-gold rounded-2xl p-6 md:p-10 space-y-6">
          <div>
            <label for="calc-bill" class="block text-xs uppercase tracking-wider text-slate-500 mb-2">Bolletta mensile (€)</label>
            <input type="number" id="calc-bill" min="0" step="10" value="180" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-lg focus:border-amber-500 outline-none">
          </motion.div>
          <motion.div>
            <label for="calc-kwh" class="block text-xs uppercase tracking-wider text-slate-500 mb-2">Consumo mensile (kWh) <span class="text-slate-600 normal-case">— opzionale</span></label>
            <input type="number" id="calc-kwh" min="0" step="50" placeholder="Calcolato dalla bolletta" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 outline-none">
          </motion.div>
          <motion.div>
            <label for="calc-cover" class="flex justify-between text-xs uppercase tracking-wider text-slate-500 mb-2">
              <span>Copertura stimata del fabbisogno</span>
              <span id="calc-cover-val" class="text-amber-400 font-bold">70%</span>
            </label>
            <input type="range" id="calc-cover" min="30" max="95" value="70" class="w-full calc-range">
          </motion.div>
          <p class="text-xs text-slate-500 leading-relaxed">Ipotesi: prezzo energia ~0,32 €/kWh, autoconsumo ~78%. I valori reali dipendono da orientamento, ombre e abitudini di consumo.</p>
          <a href="#contatti" class="inline-flex items-center gap-2 text-amber-400 text-sm font-bold hover:underline">Richiedi preventivo personalizzato <i class="fa-solid fa-arrow-right"></i></a>
        </form>
        <div class="space-y-4 md:space-y-5">
          <div class="blur-card rounded-2xl p-6 md:p-8 border border-amber-500/20">
            <p class="text-xs uppercase tracking-widest text-slate-500 mb-2">Risparmio annuo stimato</p>
            <p id="calc-out-year" class="text-4xl md:text-5xl font-display font-bold text-amber-400">€ 0</p>
          </motion.div>
          <div class="blur-card rounded-2xl p-6 md:p-8">
            <p class="text-xs uppercase tracking-widest text-slate-500 mb-2">Risparmio in 25 anni</p>
            <p id="calc-out-25" class="text-3xl md:text-4xl font-display font-bold text-white">€ 0</p>
          </motion.div>
          <div class="grid grid-cols-2 gap-4">
            <div class="blur-card rounded-xl p-5">
              <p class="text-xs text-slate-500 uppercase mb-1">Energia autoconsumata</p>
              <p id="calc-out-kwh" class="text-xl font-bold text-white">0 kWh</p>
            </motion.div>
            <div class="blur-card rounded-xl p-5">
              <p class="text-xs text-slate-500 uppercase mb-1">CO₂ evitata / anno</p>
              <p id="calc-out-co2" class="text-xl font-bold text-white">0 kg</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>

  <section id="ingegneria" class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
    <div class="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
      <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">I nostri sistemi</span>
      <h2 class="text-2xl md:text-5xl font-bold text-white">Tre tecnologie. Un obiettivo: meno bolletta, più controllo.</h2>
      <p class="text-slate-400 text-sm md:text-base">Combiniamo le soluzioni solo quando ha senso tecnicamente ed economicamente per il vostro edificio.</p>
    </motion.div>
    <div class="grid md:grid-cols-3 gap-6 md:gap-8">
      <article id="fotovoltaico" class="blur-card rounded-2xl p-8 space-y-5 hover:border-amber-500/30 transition border border-transparent">
        <motion.div class="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl"><i class="fa-solid fa-solar-panel"></i></motion.div>
        <h3 class="text-xl md:text-2xl font-bold text-white">Fotovoltaico</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Moduli su coppo, lamiera o copertura piana. Inverter dimensionato, quadro a norma, pratiche di connessione e collaudo con il distributore.</p>
      </article>
      <article id="eolico" class="blur-card rounded-2xl p-8 space-y-5 hover:border-amber-500/30 transition border border-transparent">
        <div class="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl"><i class="fa-solid fa-wind"></i></motion.div>
        <h3 class="text-xl md:text-2xl font-bold text-white">Eolico</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Minieolico dove vento e distanze lo consentono. Verifica sul posto e integrazione con fotovoltaico se serve massimizzare la produzione.</p>
      </article>
      <article id="termico" class="blur-card rounded-2xl p-8 space-y-5 hover:border-amber-500/30 transition border border-transparent">
        <div class="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl"><i class="fa-solid fa-temperature-arrow-up"></i></motion.div>
        <h3 class="text-xl md:text-2xl font-bold text-white">Solare termico</h3>
        <p class="text-slate-400 text-sm leading-relaxed">Acqua calda sanitaria e supporto al riscaldamento. Collegamento a caldaia o pompa di calore esistenti, con collettori piani o sottovuoto.</p>
      </article>
    </motion.div>
  </section>

  <section id="portfolio-reale" class="bg-slate-950 py-20 md:py-28 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="mb-12 md:mb-16 space-y-4">
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500"><i class="fa-solid fa-camera mr-1"></i> Cantieri reali</span>
        <h2 class="text-2xl md:text-5xl font-bold text-white font-display">Foto dai nostri tetti</h2>
        <p class="text-slate-400 max-w-2xl text-sm md:text-base">Nessun rendering stock: solo impianti posati da Morello Eugenio. Ogni foto corrisponde a un cliente referenziabile in zona Varese.</p>
        <a href="progetti.html" class="inline-flex text-amber-400 text-sm font-bold hover:underline">Galleria completa <i class="fa-solid fa-arrow-right ml-1"></i></a>
      </motion.div>
      <div class="space-y-16 md:space-y-28">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div class="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img src="assets/img/hero.jpg" alt="Villa con fotovoltaico" class="w-full h-72 md:h-[420px] object-cover" loading="lazy">
          </motion.div>
          <div class="lg:col-span-6 space-y-4">
            <p class="text-xs font-mono text-amber-500 uppercase tracking-wider">Vedano Olona</p>
            <h3 class="text-2xl md:text-3xl font-bold text-white">Fotovoltaico su tetto in coppo</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">Impianto residenziale con moduli integrati sulle falde. Analisi ombre e stato tegole prima del preventivo definitivo.</p>
            <a href="progetti/villa-comignolo.html" class="text-amber-400 text-sm font-bold hover:underline">Scheda progetto</a>
          </motion.div>
        </motion.div>
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div class="lg:col-span-6 lg:order-2 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img src="assets/img/pensilina-industriale.jpg" alt="Pensilina fotovoltaica" class="w-full h-72 md:h-[420px] object-cover" loading="lazy">
          </motion.div>
          <div class="lg:col-span-6 lg:order-1 space-y-4">
            <p class="text-xs font-mono text-amber-500 uppercase tracking-wider">Commerciale</p>
            <h3 class="text-2xl md:text-3xl font-bold text-white">Pensilina fotovoltaica</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">Copertura per automezzi con produzione elettrica. Struttura e cablaggio dimensionati per uso intensivo.</p>
            <a href="progetti/pensilina-industriale.html" class="text-amber-400 text-sm font-bold hover:underline">Scheda progetto</a>
          </motion.div>
        </motion.div>
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div class="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img src="assets/img/copertura-piana-misto.jpg" alt="FV e solare termico" class="w-full h-72 md:h-[420px] object-cover" loading="lazy">
          </motion.div>
          <motion.div class="lg:col-span-6 space-y-4">
            <p class="text-xs font-mono text-amber-500 uppercase tracking-wider">FV + termico</p>
            <h3 class="text-2xl md:text-3xl font-bold text-white">Copertura piana mista</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">Fotovoltaico e solare termico sullo stesso capannone. Un solo referente per entrambe le tecnologie e la manutenzione.</p>
            <a href="progetti/copertura-piana.html" class="text-amber-400 text-sm font-bold hover:underline">Scheda progetto</a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  </section>

  <section id="contatti" class="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 border-t border-slate-800">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
      <div class="space-y-5">
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Contatti</span>
        <h2 class="text-2xl md:text-4xl font-bold text-white font-display">Richiedi un sopralluogo gratuito</h2>
        <p class="text-slate-400 text-sm md:text-base leading-relaxed">In provincia di Varese l'uscita per il sopralluogo non ha costi. Portate le ultime bollette e, se possibile, foto del tetto.</p>
        <ul class="space-y-4 text-sm text-slate-300 pt-2">
          <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-amber-500 w-5"></i> <a href="tel:+393292354847" class="text-lg font-bold hover:text-amber-400">329 235 4847</a></li>
          <li class="flex items-center gap-3"><i class="fa-brands fa-whatsapp text-amber-500 w-5"></i> <a href="https://wa.me/393292354847" class="hover:text-amber-400" target="_blank" rel="noopener">WhatsApp diretto con Eugenio</a></li>
          <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot text-amber-500 w-5 mt-1"></i> Via Torino 4, 21040 Vedano Olona (VA)</li>
        </ul>
      </motion.div>
      <form id="contact-form" class="blur-card blur-card-gold rounded-2xl p-6 md:p-10 space-y-4" action="https://formsubmit.co/info@energiasolaremorello.it" method="POST">
        <input type="hidden" name="_subject" value="Richiesta dal sito web">
        <input type="hidden" name="_captcha" value="false">
        <input type="text" name="_honey" class="hidden" tabindex="-1" autocomplete="off">
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Nome</label>
          <input type="text" name="nome" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-amber-500 outline-none">
        </motion.div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Telefono</label>
          <input type="tel" name="telefono" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-amber-500 outline-none">
        </motion.div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-slate-500 mb-1">Messaggio</label>
          <textarea name="messaggio" rows="4" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-amber-500 outline-none" placeholder="Indirizzo, tipo di tetto, bolletta media..."></textarea>
        </motion.div>
        <button type="submit" class="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider py-4 rounded-lg transition">Invia richiesta</button>
        <p id="form-msg" class="text-sm text-slate-500" role="status"></p>
      </form>
    </motion.div>
  </section>

  <footer class="bg-slate-950 border-t border-slate-900 py-14 md:py-16 px-4 md:px-6 text-sm text-slate-500">
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
      <div class="space-y-3">
        <img src="assets/img/logo.svg" alt="" class="h-14 w-auto">
        <p class="text-xs leading-relaxed max-w-xs text-slate-400">Energia Solare di Morello Eugenio. Installazione diretta a Vedano Olona e provincia di Varese.</p>
      </motion.div>
      <div class="space-y-3">
        <p class="text-white font-bold font-display uppercase tracking-wider text-sm">Contatti</p>
        <ul class="space-y-2 text-xs text-slate-400">
          <li><i class="fa-solid fa-phone text-amber-500 mr-2"></i> 329 235 4847</li>
          <li><i class="fa-solid fa-location-dot text-amber-500 mr-2"></i> Via Torino 4, Vedano Olona (VA)</li>
        </ul>
      </motion.div>
      <div class="space-y-3 text-xs">
        <p class="text-white font-bold font-display uppercase tracking-wider text-sm">Normative</p>
        <p class="text-slate-500">Impianti secondo CEI 0-21 e normativa di connessione. Abilitazione DM 37/08.</p>
      </motion.div>
    </motion.div>
    <p class="max-w-7xl mx-auto border-t border-slate-900 mt-10 pt-6 text-center text-xs text-slate-600">&copy; 2026 Energia Solare di Morello Eugenio &middot; P.IVA 1470745430</p>
  </footer>

  <a href="https://wa.me/393292354847" class="fixed bottom-5 right-5 z-40 bg-green-600 hover:bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl" target="_blank" rel="noopener" aria-label="WhatsApp">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <script src="assets/js/stats.js"></script>
  <script src="assets/js/savings-calc.js"></script>
  <script src="assets/js/site.js"></script>
  <script>
    const form = document.getElementById('contact-form');
    const msg = document.getElementById('form-msg');
    if (form && msg) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.textContent = 'Invio in corso...';
        try {
          const r = await fetch(form.action, { method: 'POST', body: new FormData(form) });
          msg.textContent = r.ok ? 'Messaggio inviato. Vi richiameremo presto.' : 'Errore invio. Chiamate al 329 235 4847.';
          if (r.ok) form.reset();
        } catch {
          msg.textContent = 'Errore di rete. Chiamate al 329 235 4847.';
        }
      });
    }
  </script>
</body>
</html>`;

const fixed = html.replace(/motion\.div/g, 'div');
writeFileSync(join(root, 'index.html'), fixed, 'utf8');
console.log('Wrote index.html', fixed.length, 'chars');
