# Energia Solare di Morello Eugenio — Sito web

Sito istituzionale statico per il cliente **Energia Solare di Morello Eugenio** (Vedano Olona, VA).

## Avvio locale

Apri `index.html` nel browser, oppure:

```powershell
cd C:\Users\utente\Desktop\energia-solare-morello-site
python -m http.server 8080
```

Poi visita http://localhost:8080

## Struttura

- `index.html` — Homepage (servizi, metodo, contatti)
- `progetti.html` — Galleria portfolio (10 progetti)
- `progetti/*.html` — Schede dettaglio per ogni cantiere
- `assets/img/` — 10 foto selezionate dal portfolio Google
- `assets/css/style.css` — Stile custom
- `assets/js/main.js` — Navigazione e animazioni

## Rigenerare le pagine progetto

```powershell
powershell -ExecutionPolicy Bypass -File build-progetti.ps1
```
