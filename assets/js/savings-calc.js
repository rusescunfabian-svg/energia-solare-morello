(() => {
  const form = document.getElementById('savings-form');
  if (!form) return;

  const billInput = document.getElementById('calc-bill');
  const kwhInput = document.getElementById('calc-kwh');
  const coverInput = document.getElementById('calc-cover');
  const coverVal = document.getElementById('calc-cover-val');
  const outYear = document.getElementById('calc-out-year');
  const out25 = document.getElementById('calc-out-25');
  const outKwh = document.getElementById('calc-out-kwh');
  const outCo2 = document.getElementById('calc-out-co2');

  const PRICE = 0.32;
  const AUTOUSE = 0.78;

  const fmtEur = (n) =>
    n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const fmtNum = (n) => Math.round(n).toLocaleString('it-IT');

  const calc = () => {
    const bill = Math.max(0, Number(billInput.value) || 0);
    let kwhMonth = Math.max(0, Number(kwhInput.value) || 0);

    if (!kwhMonth && bill > 0) {
      kwhMonth = bill / PRICE;
      kwhInput.placeholder = Math.round(kwhMonth).toString();
    }

    const cover = Math.min(100, Math.max(20, Number(coverInput.value) || 70)) / 100;
    if (coverVal) coverVal.textContent = `${Math.round(cover * 100)}%`;

    const kwhYear = kwhMonth * 12;
    const solarKwh = kwhYear * cover * AUTOUSE;
    const saveYear = solarKwh * PRICE;
    const save25 = saveYear * 25;
    const co2 = solarKwh * 0.32;

    if (outYear) outYear.textContent = fmtEur(saveYear);
    if (out25) out25.textContent = fmtEur(save25);
    if (outKwh) outKwh.textContent = `${fmtNum(solarKwh)} kWh`;
    if (outCo2) outCo2.textContent = `${fmtNum(co2)} kg`;
  };

  form.addEventListener('input', calc);
  form.addEventListener('change', calc);
  calc();
})();
