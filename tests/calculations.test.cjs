const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseNumber, calculate } = require('../js/calculations.js');
const base = {
  mode: 'shift',
  revenue: 200,
  distance: 120,
  consumption: 12,
  fuelPrice: 6,
  expenses: [25],
  duration: 480,
};

test('turno: combustível, saldo e indicadores sem arredondamento intermediário', () => {
  const result = calculate(base);
  assert.equal(result.liters, 10);
  assert.equal(result.fuelCost, 60);
  assert.equal(result.balance, 115);
  assert.equal(result.perKm, 200 / 120);
  assert.equal(result.perHour, 14.375);
});
test('corrida: inclui despesas e duração em minutos', () => {
  const result = calculate({
    ...base,
    mode: 'ride',
    revenue: 30,
    distance: 20,
    consumption: 10,
    expenses: [3, 2],
    duration: 45,
  });
  assert.equal(result.balance, 13);
  assert.equal(result.perKm, 0.65);
  assert.equal(result.perHour, 13 / 0.75);
});
test('viagem: soma combustível, pedágio e estacionamento', () => {
  assert.equal(calculate({ ...base, mode: 'trip', expenses: [10, 15] }).totalCost, 85);
});
test('saldo negativo é preservado', () => {
  assert.equal(calculate({ ...base, revenue: 0 }).balance, -85);
});
test('distância zero permitida apenas no turno, sem indicador por km', () => {
  const result = calculate({ ...base, distance: 0, duration: 0 });
  assert.equal(result.fuelCost, 0);
  assert.equal(result.perKm, null);
  assert.equal(result.perHour, null);
  for (const mode of ['ride', 'trip'])
    assert.throws(() => calculate({ ...base, mode, distance: 0 }));
});
test('rejeita consumo zero, negativos, infinito, NaN e overflow', () => {
  for (const consumption of [0, -1, NaN, Infinity, Number.MIN_VALUE])
    assert.throws(() => calculate({ ...base, consumption }));
  assert.throws(() => calculate({ ...base, expenses: [-1] }));
  assert.throws(() => calculate({ ...base, mode: 'unknown' }));
});
test('aceita vírgula, ponto, zero e espaços externos', () => {
  assert.equal(parseNumber(' 6,50 '), 6.5);
  assert.equal(parseNumber('6.50'), 6.5);
  assert.equal(parseNumber('0'), 0);
  assert.equal(parseNumber('', { optional: true }), 0);
});
test('rejeita campos vazios obrigatórios e formatos ambíguos ou parciais', () => {
  for (const value of [
    '',
    'abc',
    '-2',
    '1e3',
    '1.200,00',
    '1,200.00',
    '12abc',
    'Infinity',
    '1 2',
    '2,',
  ])
    assert.throws(() => parseNumber(value));
  assert.throws(() => parseNumber('0', { positive: true }));
});
test('horas e minutos devem ser inteiros; minutos limitados a 59', () => {
  assert.equal(parseNumber('59', { integer: true, max: 59 }), 59);
  assert.throws(() => parseNumber('60', { integer: true, max: 59 }));
  assert.throws(() => parseNumber('1,5', { integer: true }));
});
