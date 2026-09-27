(() => {
  'use strict';
  const modes = {
    shift: {
      title: 'Meu dia ou turno',
      help: 'Informe a distância total do trabalho, incluindo os trechos sem passageiros ou entregas.',
      revenue: 'Faturamento do período',
      result: 'Saldo após os custos informados',
      expenses: ['food', 'tolls', 'parking'],
    },
    ride: {
      title: 'Uma corrida ou entrega',
      help: 'Inclua na distância o deslocamento até o passageiro ou a coleta e os demais trechos previstos.',
      revenue: 'Valor oferecido',
      result: 'Saldo estimado',
      expenses: ['food', 'tolls', 'parking', 'other'],
    },
    trip: {
      title: 'Uma viagem',
      help: 'Informe a distância total. Para ida e volta, some os dois trajetos.',
      result: 'Custo estimado da viagem',
      expenses: ['tolls', 'parking'],
    },
  };
  const expenseNames = {
    food: 'Alimentação',
    tolls: 'Pedágios',
    parking: 'Estacionamento',
    other: 'Outras despesas',
  };

  window.GanhosConfig = { modes, expenseNames };
})();
