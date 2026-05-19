$template = @'
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} | Energia Solare di Morello Eugenio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../assets/css/mobile.css">
</head>
<body>
  <header class="site-header is-scrolled">
    <div class="wrap site-header__inner">
      <a href="../index.html" class="logo"><span class="logo__name">Morello Eugenio</span><span class="logo__sub">Energia Solare</span></a>
      <nav class="nav">
        <a href="../index.html#chi-siamo">Chi siamo</a>
        <a href="../index.html#servizi">Servizi</a>
        <a href="../progetti.html" class="is-active">Progetti</a>
        <a href="../index.html#contatti" class="nav-cta">Contatti</a>
      </nav>
      <button class="menu-toggle" aria-label="Menu" type="button"><span></span><span></span><span></span></button>
    </div>
  </header>
  <main class="project-detail">
    <header class="page-hero page-hero--compact">
      <div class="wrap">
        <p class="breadcrumb"><a href="../index.html">Home</a> / <a href="../progetti.html">Progetti</a> / {{TITLE}}</p>
        <p class="eyebrow">{{CAT}}</p>
        <h1>{{TITLE}}</h1>
        <p class="lead" style="margin-top:0.75rem">{{LEAD}}</p>
      </div>
    </header>
    <img class="project-hero-img" src="../assets/img/{{IMG}}" alt="{{ALT}}">
    <div class="wrap project-layout">
      <article class="project-body reveal">
        {{BODY}}
      </article>
      <aside class="project-sidebar reveal">
        <p class="eyebrow">Scheda cantiere</p>
        <h3>Dati di sintesi</h3>
        <ul class="spec-list">{{SPECS}}</ul>
        <p style="margin-top:2rem;font-size:0.88rem;color:var(--ink-soft)">Volete un impianto simile? Passate in sede con bollette e misure del tetto: a Vedano Olona la prima valutazione &egrave; gratuita.</p>
        <a href="../index.html#contatti" class="btn" style="margin-top:1.25rem;width:100%;justify-content:center">Richiedi preventivo</a>
        <a href="https://wa.me/393292354847" class="btn btn--wa-inline" style="margin-top:0.75rem;width:100%;justify-content:center" target="_blank" rel="noopener">WhatsApp</a>
      </aside>
    </div>
    <div class="wrap project-nav">
      <a href="{{PREV_LINK}}" class="link-arrow">← {{PREV_TITLE}}</a>
      <a href="{{NEXT_LINK}}" class="link-arrow">{{NEXT_TITLE}} →</a>
    </div>
  </main>
  <footer class="site-footer"><div class="wrap footer-bottom" style="border:none"><span>© 2026 Energia Solare di Morello Eugenio</span><a href="tel:+393292354847" style="color:var(--gold-light)">329 235 4847</a></div></footer>
  <script src="../assets/js/promo-countdown.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
'@

$projects = @(
  @{
    slug='villa-comignolo'; title='Villa a falde multiple'; cat='Fotovoltaico residenziale'
    img='hero.jpg'; alt='Vista aerea impianto fotovoltaico su villa a falde'
    lead='Un tetto articolato in zona Vedano Olona: tre falde attive, moduli neri su coppo e produzione distribuita su pi&ugrave; stringhe.'
    body=@'
<p>Il committente aveva gi&agrave; ricevuto due preventivi con layout identici su una sola falda. Salendo sul tetto abbiamo visto subito spreco di superficie: la falda est e quella ovest prendevano sole fino al tardo pomeriggio, mentre il lato nord restava fuori gioco per ombreggiamento dal corpo di fabbrica.</p>
<p>Abbiamo progettato tre sottocampi da sei moduli ciascuno, con inverter ibrido e ottimizzatori dove il comignolo creava ombra parziale. Le staffe sono state fissate su tegole in coppo senza forare la guaina: metodo a gancio con profili in alluminio anodizzato.</p>
<p>La pratica comunale &egrave; passata al primo invio perch&eacute; la vista dalla strada resta bassa: i moduli seguono il piano del tetto senza rialzo a cassonetto. A regime, la famiglia copre consumi e ricarica del veicolo nelle ore di sole diretto.</p>
'@
    specs=@('Tipologia|Residenziale unifamiliare','Superficie moduli|~54 mq','Moduli|18 monocristallini','Zona|Vedano Olona (VA)','Servizio|Progetto + posa + collaudo')
    prev=@('grande-impianto','Copertura in lamiera'); next=@('tetto-coppi','Integrazione su coppo')
  },
  @{
    slug='tetto-coppi'; title='Integrazione su coppo'; cat='Fotovoltaico residenziale'
    img='fotovoltaico-tetto-complesso.jpg'; alt='Pannelli fotovoltaici su tetto in coppo'
    lead='Due file da sei moduli su abitazione bifamiliare: il criterio era discrezione visiva e passaggio cavi invisibile dal sottotetto.'
    body=@'
<p>In un contesto urbano stretto conta ogni centimetro. I vicini avevano gi&agrave; commentato impianti troppo alti sul colmo: abbiamo scelto struttura bassa e moduli neri da 400 Wp.</p>
<p>I cavi in corrente continua scendono in un canalino esistente fino al locale tecnico. Quadro in corrente alternata con differenziale dedicato e scaricatori dove previsto. Niente canaline a vista sul prospetto principale.</p>
<p>Dopo sei mesi la produzione &egrave; in linea con quanto stimato. Il committente ci ha chiesto di replicare la stessa soluzione sul garage l&apos;anno dopo.</p>
'@
    specs=@('Tipologia|Bifamiliare','Potenza|~5,8 kWp','Moduli|12','Inverter|Ibrido trifase','Copertura|Coppo marsigliese')
    prev=@('villa-comignolo','Villa a falde multiple'); next=@('cantiere-residenziale','Posa in quota')
  },
  @{
    slug='cantiere-residenziale'; title='Posa in quota'; cat='Cantiere residenziale'
    img='cantiere-tecnico.jpg'; alt='Tecnico durante posa moduli su tetto'
    lead='Foto di cantiere su villetta con giardino: ponteggio, DPI e sequenza di posa rispettata anche con maltempo instabile.'
    body=@'
<p>Questo scatto e stato fatto a meta lavorazione, quando le stringhe lato sud erano gia collegate e testate. Il tecnico stava verificando la coppia di serraggio sui terminali MC4 prima di chiudere la seconda falda.</p>
<p>Sul cantiere abbiamo tenuto area materiali separata dal passaggio pedonale della famiglia, che restava in casa. Le tegole rimosse sono state numerate e riposte a fine giornata per evitare infiltrazioni notturne.</p>
<p>La sicurezza non e un paragrafo nel preventivo: linea vita provvisoria, imbracatura e verbale condiviso con il committente prima di iniziare. Per noi e normale, non un optional.</p>
'@
    specs=@('Durata cantiere|4 giorni','Squadra|2 installatori + referente','Ponteggio|Fornito da ditta locale','Collaudo|Terra + isolamento','Consegna|Handover monitoraggio')
    prev=@('tetto-coppi','Integrazione su coppo'); next=@('villa-18-moduli','Villa con 18 moduli')
  },
  @{
    slug='villa-18-moduli'; title='Villa con 18 moduli'; cat='Fotovoltaico residenziale'
    img='villa-18-moduli.jpg'; alt='Impianto fotovoltaico 18 moduli vista drone'
    lead='Layout a tre file con lucernario centrale: massimizzare i kWp senza coprire le finestre del sottotetto abitabile.'
    body=@'
<p>Il lucernario serviva per l illuminazione naturale della mansarda: non poteva finire sotto i pannelli. Abbiamo lasciato il corridoio di ventilazione previsto dalla normativa e riempito solo le zone con irraggiamento costante.</p>
<p>Diciotto moduli da 410 Wp portano il picco a circa 7,4 kWp. Inverter singolo con MPPT doppio, uno per falda. La producibilita stimata copre il 78% del fabbisogno annuo della famiglia quattro persone.</p>
<p>Abbiamo consegnato anche un foglio di istruzioni su come leggere l app: non basta installare, bisogna capire quando conviene accendere gli elettrodomestici pesanti.</p>
'@
    specs=@('Potenza|7,4 kWp','Moduli|18','File|3 (6+3+6)','Vincolo|Lucernario attivo','Autoconsumo stimato|78%')
    prev=@('cantiere-residenziale','Posa in quota'); next=@('integrazione-comignolo','Taglio su comignolo')
  },
  @{
    slug='integrazione-comignolo'; title='Taglio su comignolo'; cat='Fotovoltaico · layout complesso'
    img='tetto-comignolo-20-moduli.jpg'; alt='Venti moduli disposti intorno a comignolo'
    lead='Venti moduli disposti a U attorno al comignolo in terracotta: esempio di come si recupera superficie che molti lasciano vuota.'
    body=@'
<p>Il comignolo centrale divideva il tetto in due zone. Invece di installare solo ai lati, abbiamo disegnato un percorso a U che avvolge l ostacolo mantenendo distanze da infiammabili rispettate.</p>
<p>Due ottimizzatori di potenza sulle file piu vicine al fumo caldo, per non penalizzare l intera stringa quando il camino e acceso in inverno. Il resto del campo e in topologia classica.</p>
<p>Il risultato estetico piace anche al committente, che temeva un effetto piastrelle a caso: le file seguono le linee di colmo e gronda.</p>
'@
    specs=@('Moduli|20','Layout|A U su comignolo','Ottimizzatori|2 stringhe','Potenza|~8,2 kWp','Materiale tetto|Coppo')
    prev=@('villa-18-moduli','Villa con 18 moduli'); next=@('pensilina-industriale','Pensilina logistica')
  },
  @{
    slug='pensilina-industriale'; title='Pensilina logistica'; cat='Fotovoltaico commerciale'
    img='pensilina-industriale.jpg'; alt='Pensilina fotovoltaica su area industriale'
    lead='Struttura a U su cortile aziendale: ombra per i mezzi, energia per il magazzino e carico strutturale verificato da calcolo.'
    body=@'
<p>L azienda voleva coprire il piazzale di carico e scarico senza costruire un capannone nuovo. La pensilina fotovoltaica e diventata tettoia e impianto insieme, con pilastri in acciaio zincato a caldo.</p>
<p>Il calcolo strutturale ha considerato neve zona II e vento da tavole locali. Cablaggi raccolti in canaline zincate, accessibili per manutenzione senza smontare i moduli.</p>
<p>La produzione va in autoconsumo con scambio sul posto; il picco diurno coincide con i turni mattutini del magazzino, quando compressori e carrelli elevatori assorbono di piu.</p>
'@
    specs=@('Tipologia|Pensilina commerciale','Forma|U su cortile','Uso|Ombra + FV','Verifiche|Struttura + elettrico','Settore|Logistica')
    prev=@('integrazione-comignolo','Taglio su comignolo'); next=@('copertura-piana','Capannone FV + termico')
  },
  @{
    slug='copertura-piana'; title='Capannone FV + termico'; cat='Fotovoltaico e solare termico'
    img='copertura-piana-misto.jpg'; alt='Copertura piana con pannelli FV e termici'
    lead='Sulla stessa falda convivono collettori termici e campo FV: progettazione dell ordine di posa per non ombreggiarsi a vicenda.'
    body=@'
<p>Il titolare aveva gia una caldaia a condensazione recente e voleva tagliare il gas senza buttare nulla. Abbiamo aggiunto solare termico per ACS e integrazione al riscaldamento, piu FV per la parte elettrica del processo.</p>
<p>I collettori sono stati messi sul lato nord-est per non gettare ombra sui moduli FV al mattino. Canaline coibentate e bollitore a doppio scambiatore.</p>
<p>Il quadro elettrico del capannone e stato ridisegnato: sezioni dedicate, etichettatura in italiano e schema aggiornato appeso dentro lo sportello.</p>
'@
    specs=@('FV|Campo su lamiera','Termico|Collettori piani','Uso|ACS + processo','Tetto|Piana industriale','Integrazione|Caldaia esistente')
    prev=@('pensilina-industriale','Pensilina logistica'); next=@('tetto-lucernari','Tetto con lucernari')
  },
  @{
    slug='tetto-lucernari'; title='Tetto con lucernari'; cat='Fotovoltaico residenziale'
    img='tetto-15-moduli.jpg'; alt='Quindici moduli su tetto con lucernari'
    lead='Quindici moduli disposti a L: risposta a un tetto con due lucernari e balcone che accorciava la falda utile.'
    body=@'
<p>La vista drone mostra come abbiamo segmentato il campo: niente pannelli sopra le finestre del sottotetto, ma file compatte dove il sole resta ore sufficienti.</p>
<p>Il committente lavora da casa: abbiamo dimensionato l accumulo da 5 kWh per spostare produzione pomeridiana su cena e lavatrice serale.</p>
<p>Prima del cantiere abbiamo fatto prova ombreggiamento con foto ogni ora in giornata di equinozio: metodo semplice, zero sorprese dopo la posa.</p>
'@
    specs=@('Moduli|15','Accumulo|5 kWh','Layout|A L','Lucernari|2 preservati','Profilo|Smart working')
    prev=@('copertura-piana','Capannone FV + termico'); next=@('posa-drone','Posa con ponteggio')
  },
  @{
    slug='posa-drone'; title='Posa con ponteggio'; cat='Documentazione cantiere'
    img='posa-drone.jpg'; alt='Vista aerea cantiere con ponteggio'
    lead='Documentazione aerea durante i lavori: utile per il committente e per aggiornare il fascicolo tecnico dell impianto.'
    body=@'
<p>Scatti come questo li facciamo spesso su richiesta dell assicurazione o del geometra che segue la ristrutturazione. Mostrano ponteggio, percorsi e area di stoccaggio moduli ancora imballati.</p>
<p>In questo caso l edificio era in ristrutturazione completa: abbiamo coordinato le date con l impresa edile per non accavallare gru e nostre linee vita.</p>
<p>La posa e durata due giorni di campo piu mezza giornata di collaudo. Il drone e solo documentazione, non un giocattolo: serve a dimostrare che il lavoro e stato fatto come in offerta.</p>
'@
    specs=@('Fase|In corso d opera','Ponteggio|Sì','Coordinamento|Impresa edile','Moduli|12 previsti','Doc.|Foto + schema')
    prev=@('tetto-lucernari','Tetto con lucernari'); next=@('grande-impianto','Copertura in lamiera')
  },
  @{
    slug='grande-impianto'; title='Copertura in lamiera'; cat='Fotovoltaico · alta potenza'
    img='grande-impianto.jpg'; alt='Ampio impianto su copertura in lamiera'
    lead='Campo esteso su lamiera grecata: tanti moduli, un referente unico e manutenzione programmata sulla falda.'
    body=@'
<p>Quando la superficie e ampia il rischio e l effetto campo sporco o divergenza elettrica tra stringhe. Abbiamo diviso in quattro sottocampi con combiner e protezioni per stringa.</p>
<p>La lamiera era del 2008: prima di perforare abbiamo verificato spessore e stato della guaina. Fissaggi a vite autofilettanti con guarnizione EPDM sostituita dove trovata indurita.</p>
<p>Il cliente industriale riceve report trimestrale di produzione e checklist visiva sui connettori. Per impianti grandi il follow-up conta quanto la posa.</p>
'@
    specs=@('Copertura|Lamiera grecata','Stringhe|4 sottocampi','Manutenzione|Trimestrale','Settore|Artigianale','Potenza|>15 kWp')
    prev=@('posa-drone','Posa con ponteggio'); next=@('villa-comignolo','Villa a falde multiple')
  }
)

$outDir = "C:\Users\utente\Desktop\energia-solare-morello-site\progetti"
foreach ($p in $projects) {
  $specHtml = ($p.specs | ForEach-Object { $parts = $_ -split '\|', 2; "<li><span>$($parts[0])</span><span>$($parts[1])</span></li>" }) -join "`n        "
  $html = $template
  $html = $html.Replace('{{TITLE}}', $p.title)
  $html = $html.Replace('{{CAT}}', $p.cat)
  $html = $html.Replace('{{LEAD}}', $p.lead)
  $html = $html.Replace('{{IMG}}', $p.img)
  $html = $html.Replace('{{ALT}}', $p.alt)
  $html = $html.Replace('{{BODY}}', $p.body)
  $html = $html.Replace('{{SPECS}}', $specHtml)
  $html = $html.Replace('{{PREV_LINK}}', "$($p.prev[0]).html")
  $html = $html.Replace('{{PREV_TITLE}}', $p.prev[1])
  $html = $html.Replace('{{NEXT_LINK}}', "$($p.next[0]).html")
  $html = $html.Replace('{{NEXT_TITLE}}', $p.next[1])
  $path = Join-Path $outDir "$($p.slug).html"
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($path, $html, $utf8)
}
Write-Output "Generated $($projects.Count) pages"
