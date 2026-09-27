# Design da primeira versão

## Objetivo e público

Ferramenta pública e gratuita para motoristas, entregadores e pessoas que desejam estimar o custo de uma viagem. O projeto também servirá como portfólio, com foco em clareza, acessibilidade, organização do código e cálculos verificáveis.

Este documento registra o brainstorming com o responsável pelo projeto. O usuário autorizou a implementação e validação. Consulte o README para o estado atual e os testes disponíveis.

## Escopo acordado

- Menu inicial com três calculadoras: dia ou turno, corrida ou entrega e viagem pessoal.
- Distâncias informadas manualmente, sem mapas ou serviços de rotas.
- Custos básicos: combustível e despesas explicitamente informadas.
- Sem cadastro, histórico ou veículos salvos na primeira versão.
- Interface utilitária e discreta, com azul como destaque e foco nos números.
- Temas claro e escuro, com opção de acompanhar a preferência do sistema.
- Estatísticas de acesso e utilização; nova conta do Google Analytics a configurar na etapa final.

## Formulários e resultados

### Meu dia ou turno

- Campos essenciais: faturamento, quilômetros totais, consumo em km/L e preço do combustível por litro.
- Campos opcionais: alimentação, pedágios, estacionamento e horas trabalhadas.
- Resultado principal: saldo após os custos informados.
- Detalhamento: litros consumidos, combustível, despesas, faturamento por quilômetro e saldo por hora quando houver duração válida.

### Uma corrida ou entrega

- Campos essenciais: valor oferecido, distância total prevista, consumo em km/L e preço do combustível por litro.
- Campos opcionais: despesas extras e tempo previsto.
- Orientação: incluir na distância o deslocamento até a coleta ou passageiro e demais trechos considerados pelo usuário.
- Resultado principal: saldo estimado após os custos informados.
- Detalhamento: combustível, despesas, saldo por quilômetro e saldo por hora quando houver duração válida.
- A ferramenta apresenta os valores sem afirmar que uma corrida vale a pena.

### Uma viagem

- Campos essenciais: distância total, consumo em km/L e preço do combustível por litro.
- Campos opcionais: pedágios e estacionamento.
- Orientação: incluir a volta na distância caso se deseje calcular ida e volta.
- Resultado principal: custo estimado total.
- Detalhamento: litros consumidos, combustível e despesas adicionais.

## Interação

- Pergunta inicial: “O que você quer calcular?”.
- Cada escolha abre seu formulário específico.
- Campos essenciais primeiro; “Adicionar despesas” revela despesas opcionais.
- Tempo trabalhado ou previsto é opcional e independente das despesas.
- Resultados aparecem na própria página, com a conta explicada.
- Saldo negativo tem indicação textual, sem depender exclusivamente da cor.
- Não chamar o saldo de lucro líquido: manutenção, pneus, depreciação e outros custos não estão incluídos.

## Aparência e temas

- Estilo discreto, poucos elementos decorativos, hierarquia clara e destaque azul.
- Oferecer as opções “Sistema”, “Claro” e “Escuro”.
- Controle atualizado a pedido do usuário: botão flutuante com ícones de monitor, sol e lua, alternando os modos a cada clique. Cabeçalho permanece visível ao rolar. No celular, o botão ocupa o canto superior direito para não cobrir os formulários; em telas maiores fica no canto inferior direito.
- Padrão proposto: “Sistema”, acompanhando a preferência do dispositivo, inclusive quando mudar durante o uso.
- Escolher “Claro” ou “Escuro” substitui a preferência do sistema até o usuário voltar a “Sistema”.
- Detalhe proposto: lembrar apenas a preferência de tema neste navegador. Isso não cria cadastro nem histórico de cálculos.
- Caso o armazenamento local não esteja disponível, o seletor deve continuar funcionando na sessão.
- Ambos os temas devem ter contraste legível, foco visível e estados de erro distinguíveis.

## Regras e validação

- Litros = distância ÷ consumo em km/L.
- Combustível = litros × preço por litro.
- Despesas = soma das despesas informadas.
- Saldo = faturamento ou valor oferecido − combustível − despesas.
- Custo da viagem = combustível + despesas.
- Indicadores por quilômetro usam a distância total informada.
- Indicadores por hora usam a duração válida convertida para horas.
- Aceitar vírgula ou ponto como separador decimal e validar o valor completo.
- Rejeitar entradas inválidas, negativas ou não finitas.
- Consumo deve ser maior que zero; impedir divisões por zero em qualquer indicador.
- Despesas opcionais vazias contam como zero.
- Valores monetários são apresentados em reais com duas casas decimais; evitar arredondamento intermediário desnecessário.
- Política exata para distância zero e formato de entrada da duração devem ser especificados antes de implementar os respectivos campos.

## Base técnica

- Manter HTML, CSS, JavaScript e Bootstrap.
- Separar funções de cálculo, leitura e validação das entradas, apresentação dos resultados e preferência de tema.
- Reutilizar as fórmulas comuns nas três calculadoras.
- Retirar os fluxos de autenticação e anúncios da versão pública planejada.
- Consolidar dependências e eventos existentes ao implementar, considerando as pendências do README.
- Nenhuma migração de framework é necessária para o escopo aprovado.

## Privacidade e métricas

- Processar os valores dos formulários no navegador, sem persistência ou envio desses valores para um servidor.
- Configurar uma nova conta do Google Analytics somente na etapa final, antes da divulgação.
- Medir acessos, páginas, categoria de dispositivo, origem dos acessos, seleção de calculadora e conclusão de cálculos.
- Eventos de utilização não devem conter faturamento, despesas, distâncias ou outros valores dos formulários.
- A configuração antiga de Analytics não deve ser considerada validada ou reutilizada automaticamente.
- Definir aviso de privacidade e tratamento de consentimento conforme a configuração escolhida e os requisitos aplicáveis, antes de ativar a coleta.
- Falhas no Analytics não podem impedir cálculos.

## Premissas operacionais

- Priorizar celulares, mantendo uso em computadores.
- Cálculos imediatos no navegador e estrutura leve, sem serviços pagos obrigatórios.
- Hospedagem e capacidade de tráfego a verificar antes de publicar; não há promessa de volume ou disponibilidade contratual.
- Manutenção simples, com documentação e funções reutilizáveis.
- Disponibilidade offline não faz parte do escopo aprovado; dependências externas precisam ser consideradas na publicação.

## Validação prevista

- Verificar as fórmulas com valores conhecidos para as três calculadoras.
- Cobrir saldo negativo, consumo zero, entradas inválidas, separadores decimais e despesas opcionais vazias.
- Conferir indicadores de tempo e distância sem divisões inválidas.
- Verificar preenchimento, mensagens, cálculo e limpeza em celular e computador.
- Conferir teclado, rótulos, foco e legibilidade dos resultados em ambos os temas.
- Verificar seleção explícita de tema, preferência do sistema e comportamento sem armazenamento disponível.
- Na etapa final, conferir os eventos do Analytics e a ausência de valores dos formulários nos eventos enviados.
- Nenhuma dessas validações foi executada durante o brainstorming.

## Registro de decisões

| Decisão                                       | Alternativas consideradas                            | Motivo                                                               |
| --------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| Público geral da categoria e viagens pessoais | Focar apenas em entregadores ou passageiros          | Atender diferentes usos com cálculos básicos compartilhados.         |
| Sem cadastro nem histórico                    | Conta obrigatória ou opcional                        | Reduzir barreiras e só investir nessas funções se houver demanda.    |
| Distância manual                              | Origem/destino com mapas ou ambas                    | Evitar dependência de custos de integração.                          |
| Turno e corrida/entrega                       | Escolher apenas um dos dois                          | Atender análise do trabalho e estimativas antes de uma atividade.    |
| Custos básicos informados                     | Manutenção e depreciação opcionais ou detalhadas     | Manter o preenchimento simples.                                      |
| Menu com três calculadoras                    | Formulário único dinâmico ou assistente por etapas   | Mostrar somente os campos necessários à finalidade escolhida.        |
| Manter a base técnica                         | Migrar de tecnologia                                 | O escopo pode ser entregue com a estrutura existente.                |
| Analytics na etapa final                      | Retirar todas as métricas                            | O responsável deseja acompanhar acessos e utilização.                |
| Visual utilitário com claro/escuro/sistema    | Visual temático ou preservar toda a identidade atual | Priorizar números e respeitar a preferência de aparência do usuário. |

## Limites e próximos passos

- Fora do escopo: contas, histórico, veículos salvos, mapas, anúncios, depreciação automática e avaliação categórica de rentabilidade.
- Confirmado: tema Sistema como padrão e preferência lembrada no navegador; tempo em horas e minutos inteiros.
- Confirmado: distância zero aceita apenas no turno, sem indicadores por quilômetro.
- Confirmado: limpar apaga campos e resultados, preservando a preferência de aparência.
- Sequência de desenvolvimento: funções e validações; menu e formulários; temas e acessibilidade; testes; métricas e publicação.
- Analytics e hospedagem permanecem pendentes da etapa final.
