(() => {
  'use strict';
  const { parseNumber, calculate } = window.Ganhos;
  const { modes, expenseNames } = window.GanhosConfig;
  const form = document.getElementById('calculator-form');
  const summary = document.getElementById('form-error');
  const result = document.getElementById('result');
  const empty = document.getElementById('result-empty');
  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const decimal = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  let mode;

  function field(id, label, unit, placeholder, optional = false, integer = false) {
    return `
      <div class="field">
        <label for="${id}">${label}${optional ? '' : ' *'}</label>
        <div class="input-wrap">
          <input id="${id}" name="${id}" type="text" inputmode="${integer ? 'numeric' : 'decimal'}" placeholder="${placeholder}" maxlength="24" autocomplete="off" aria-describedby="${id}-error" ${optional ? '' : 'required'}><span aria-hidden="true">${unit}</span>
        </div>
        <p id="${id}-error" class="field-error" hidden></p>
      </div>
    `;
  }
  function hideResult() {
    result.hidden = true;
    empty.hidden = false;
  }
  function revealCalculator() {
    revealPanel(document.getElementById('calculator'), 'calculator-title');
  }

  function revealPanel(panel, headingId) {
    // Stop any previous animation before measuring a new destination.
    window.scrollTo({ top: window.scrollY, behavior: 'instant' });
    const headerHeight = document.querySelector('.site-header').getBoundingClientRect().height;
    document.getElementById(headingId).focus({ preventScroll: true });
    window.scrollTo({
      top: window.scrollY + panel.getBoundingClientRect().top - headerHeight - 16,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  function clearErrors() {
    summary.hidden = true;
    form
      .querySelectorAll('[aria-invalid]')
      .forEach((input) => input.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field-error').forEach((error) => {
      error.hidden = true;
      error.textContent = '';
    });
  }
  function selectCalculator(button) {
    if (mode === button.dataset.mode) {
      revealCalculator();
      return;
    }
    mode = button.dataset.mode;
    const config = modes[mode];
    window.GanhosAnalytics?.track('calculator_selected', mode);
    document
      .querySelectorAll('[data-mode]')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('calculator').hidden = false;
    document.getElementById('calculator-title').textContent = config.title;
    document.getElementById('calculator-help').textContent = config.help;
    document.getElementById('fields').innerHTML =
      (mode === 'trip' ? '' : field('revenue', config.revenue + ' (R$)', 'R$', '200,00')) +
      field('distance', 'Distância total (km)', 'km', '120') +
      field('consumption', 'Consumo do veículo (km/L)', 'km/L', '12') +
      field('fuelPrice', 'Preço do combustível (R$/L)', 'R$/L', '6,00');
    document.getElementById('duration').hidden = mode === 'trip';
    document.getElementById('time-fields').innerHTML =
      mode === 'trip'
        ? ''
        : field('hours', 'Horas', 'h', '0', true, true) +
          field('minutes', 'Minutos', 'min', '0', true, true);
    document.getElementById('expense-fields').innerHTML = config.expenses
      .map((id) => field(id, expenseNames[id] + ' (R$)', 'R$', '0,00', true))
      .join('');
    document.getElementById('expenses').open = false;
    hideResult();
    clearErrors();
    revealCalculator();
  }

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => selectCalculator(button));
  });

  form.addEventListener('input', (event) => {
    hideResult();
    if (event.target.matches('input')) {
      event.target.removeAttribute('aria-invalid');
      document.getElementById(`${event.target.id}-error`).hidden = true;
      summary.hidden = true;
    }
  });
  form.addEventListener('reset', () => {
    hideResult();
    clearErrors();
    document.getElementById('expenses').open = false;
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();
    hideResult();
    let firstError;
    function read(id, options) {
      const input = document.getElementById(id);
      try {
        return parseNumber(input.value, options);
      } catch (error) {
        input.setAttribute('aria-invalid', 'true');
        const message = document.getElementById(`${id}-error`);
        message.textContent = error.message;
        message.hidden = false;
        if (input.closest('details')) input.closest('details').open = true;
        firstError ??= input;
        return 0;
      }
    }
    const config = modes[mode];
    const revenue = mode === 'trip' ? 0 : read('revenue');
    const distance = read('distance', { positive: mode !== 'shift' });
    const consumption = read('consumption', { positive: true });
    const fuelPrice = read('fuelPrice');
    const expenses = config.expenses.map((id) => read(id, { optional: true }));
    const duration =
      mode === 'trip'
        ? 0
        : read('hours', { optional: true, integer: true, max: 9999 }) * 60 +
          read('minutes', { optional: true, integer: true, max: 59 });
    if (firstError) {
      summary.textContent = 'Confira os campos indicados antes de calcular.';
      summary.hidden = false;
      firstError.focus();
      return;
    }
    let values;
    try {
      values = calculate({ mode, revenue, distance, consumption, fuelPrice, expenses, duration });
    } catch (error) {
      summary.textContent = error.message;
      summary.hidden = false;
      return;
    }
    renderResult(values, { config, revenue, distance, consumption, fuelPrice, expenses });
    window.GanhosAnalytics?.track('calculation_completed', mode);
  });
  function renderResult(values, { config, revenue, distance, consumption, fuelPrice, expenses }) {
    document.getElementById('result-label').textContent = config.result;
    const mainValue = document.getElementById('result-value');
    mainValue.textContent = money.format(mode === 'trip' ? values.totalCost : values.balance);
    mainValue.classList.toggle('is-negative', mode !== 'trip' && values.balance < 0);
    document.getElementById('negative-note').hidden = mode === 'trip' || values.balance >= 0;
    const rows = [];
    if (mode !== 'trip') rows.push([config.revenue, money.format(revenue)]);
    rows.push(
      ['Combustível consumido', `${decimal.format(values.liters)} L`],
      ['Custo do combustível', money.format(values.fuelCost)],
    );
    config.expenses.forEach((id, index) => {
      if (expenses[index] > 0) rows.push([expenseNames[id], money.format(expenses[index])]);
    });
    rows.push(
      ['Despesas adicionais', money.format(values.extraCost)],
      ['Custos totais', money.format(values.totalCost)],
    );
    if (mode !== 'trip' && values.perKm !== null)
      rows.push([
        mode === 'shift' ? 'Faturamento por km' : 'Saldo por km',
        money.format(values.perKm),
      ]);
    if (mode !== 'trip' && values.perHour !== null)
      rows.push(['Saldo por hora', money.format(values.perHour)]);
    const list = document.getElementById('result-details');
    list.replaceChildren();
    rows.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'result-row';
      const term = document.createElement('dt');
      term.textContent = label;
      const description = document.createElement('dd');
      description.textContent = value;
      row.append(term, description);
      list.append(row);
    });
    document.getElementById('formula-text').textContent =
      `${decimal.format(distance)} km ÷ ${decimal.format(consumption)} km/L = ${decimal.format(values.liters)} L. Combustível: litros × ${money.format(fuelPrice)}/L. ${mode === 'trip' ? 'Custo total = combustível + despesas adicionais.' : 'Saldo = valor recebido − combustível − despesas adicionais.'} Os cálculos usam a precisão completa; os valores exibidos são arredondados.`;
    empty.hidden = true;
    result.hidden = false;
    revealPanel(document.querySelector('.result-panel'), 'result-heading');
  }
})();
