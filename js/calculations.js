/* Shared with Node's built-in test runner; no browser or storage dependencies. */
((root) => {
  'use strict';
  /** Parse a complete decimal input. Thousands separators and exponents are not accepted. */
  function parseNumber(
    raw,
    { optional = false, positive = false, integer = false, max = 1e9 } = {},
  ) {
    const value = String(raw ?? '').trim();
    if (!value) {
      if (optional) return 0;
      throw new Error('Preencha este campo.');
    }
    if (!/^\d+(?:[.,]\d+)?$/.test(value))
      throw new Error('Use um número positivo, com vírgula ou ponto e sem separador de milhar.');
    const number = Number(value.replace(',', '.'));
    if (!Number.isFinite(number) || number > max)
      throw new Error(`Informe um valor de até ${max.toLocaleString('pt-BR')}.`);
    if (positive && number === 0) throw new Error('Informe um valor maior que zero.');
    if (integer && !Number.isInteger(number)) throw new Error('Informe um número inteiro.');
    return number;
  }
  /** Return finite estimates without intermediate rounding. Duration is measured in minutes. */
  function calculate({
    mode,
    revenue = 0,
    distance,
    consumption,
    fuelPrice,
    expenses = [],
    duration = 0,
  }) {
    if (!['shift', 'ride', 'trip'].includes(mode)) throw new Error('Escolha uma calculadora.');
    const values = [revenue, distance, consumption, fuelPrice, duration, ...expenses];
    if (
      values.some((value) => !Number.isFinite(value) || value < 0) ||
      consumption === 0 ||
      (mode !== 'shift' && distance === 0)
    )
      throw new Error('Confira os valores informados.');
    const liters = distance / consumption;
    const fuelCost = liters * fuelPrice;
    const extraCost = expenses.reduce((sum, value) => sum + value, 0);
    const totalCost = fuelCost + extraCost;
    const balance = revenue - totalCost;
    const perKm = distance > 0 ? (mode === 'shift' ? revenue : balance) / distance : null;
    const perHour = duration > 0 ? balance / (duration / 60) : null;
    const result = { liters, fuelCost, extraCost, totalCost, balance, perKm, perHour };
    if (Object.values(result).some((value) => value !== null && !Number.isFinite(value)))
      throw new Error('Valores muito grandes ou consumo muito pequeno. Confira os campos.');
    return result;
  }
  const api = { parseNumber, calculate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Ganhos = api;
})(globalThis);
