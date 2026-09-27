# Calculadora de Ganhos

Ferramenta gratuita para motoristas, entregadores e viagens pessoais. Sem cadastro ou histórico: os cálculos são feitos no navegador. As preferências de aparência e consentimento são armazenadas localmente.

## Funcionalidades

- **Meu dia ou turno:** faturamento, combustível, despesas, saldo, faturamento/km e saldo/hora opcional.
- **Uma corrida ou entrega:** valor oferecido, distância total, custos, saldo/km e saldo/hora opcional.
- **Uma viagem:** combustível, pedágios e estacionamento, com custo total estimado.
- Despesas opcionais, entrada com vírgula ou ponto decimal e tempo em horas e minutos.
- Temas Sistema (padrão), Claro e Escuro, com preferência persistida quando o navegador permitir.
- Botão flutuante de aparência: monitor, sol e lua alternam Sistema → Claro → Escuro. No celular fica no canto superior direito, junto ao cabeçalho fixado; no computador, no canto inferior direito.
- Formulários responsivos, erros junto aos campos, navegação por teclado e indicação textual de saldo negativo.
- Escolher uma calculadora rola até o formulário, abaixo do cabeçalho; a rolagem respeita a preferência por movimento reduzido.

O saldo desconta somente os custos informados. Não é lucro líquido: manutenção, depreciação e outros custos não estão incluídos. Distâncias são manuais, sem mapas.

## Tecnologias e estrutura

HTML, CSS, JavaScript e Bootstrap 5.3.3 via CDN. Não há backend nem dependências JavaScript de produção. Um script Node prepara `dist/` para publicação; Prettier é uma dependência apenas de desenvolvimento. A página principal não carrega jQuery, Firebase ou anúncios. Analytics é opcional, condicionado à permissão do visitante.

| Arquivo                                              | Responsabilidade                                              |
| ---------------------------------------------------- | ------------------------------------------------------------- |
| `index.html`                                         | Menu, estrutura dos formulários e resultados.                 |
| `css/style.css`                                      | Layout responsivo, cores, foco e temas.                       |
| `js/calculations.js`                                 | Conversão e validação numérica; funções puras de cálculo.     |
| `js/config.js`                                       | Textos e despesas disponíveis em cada calculadora.            |
| `js/script.js`                                       | Formulários, eventos, validação e apresentação.               |
| `scripts/build.cjs`                                  | Copia somente os arquivos públicos para `dist/`.              |
| `js/theme.js`                                        | Preferência de aparência e acompanhamento do sistema.         |
| `tests/calculations.test.cjs`                        | Testes unitários com o executor nativo do Node.               |
| `tests/browser.cjs`                                  | Verificação automatizada no navegador com Playwright e Edge.  |
| `login.html`, `cadastro.html`, `recuperarSenha.html` | Compatibilidade com URLs antigas: redirecionam para o início. |
| `images/`                                            | Imagens existentes e favicon.                                 |

Os demais scripts e estilos das telas antigas permanecem como arquivos legados, sem carregamento pela interface pública. `notas.txt` contém ideias anteriores, não o escopo vigente.

## Executar localmente

Abra `index.html` diretamente no navegador ou sirva a pasta por HTTP. Com Python disponível:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8765`. Bootstrap depende de acesso à CDN; o CSS local mantém a estrutura básica caso ela esteja indisponível. Não há garantia de funcionamento offline instalado.

## Testes

Use Node.js 22 ou superior. Instale as ferramentas de desenvolvimento com `npm ci`.

Comandos de manutenção:

```sh
npm run format
npm run format:check
npm test
npm run build
```

Os testes unitários também podem ser executados diretamente:

```sh
node --test tests/calculations.test.cjs
```

Para a interface, mantenha o servidor local na porta 8765, disponibilize Playwright no ambiente de teste e tenha Microsoft Edge instalado:

```sh
node tests/browser.cjs
```

Se Playwright estiver fora dos módulos locais, a variável `PLAYWRIGHT_MODULE` pode apontar para seu diretório absoluto. Em PowerShell:

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\caminho\node_modules\playwright'
node tests/browser.cjs
```

O teste não cria contas nem envia dados para Firebase. As capturas de tela são gravadas na pasta temporária do sistema. A verificação cobre os três fluxos, erros, limpeza, persistência e mudança automática de tema, armazenamento bloqueado, ausência de erros JavaScript e larguras de 320 e 360 pixels. Isso não substitui uma auditoria completa com tecnologias assistivas ou testes em todos os navegadores.

Validação realizada nesta implementação: 9 testes unitários aprovados, fluxos de navegador aprovados no Edge, navegação inicial por teclado verificada, capturas em claro/escuro revisadas e verificação de sintaxe dos scripts aprovada. Leitor de tela e navegadores móveis reais ainda não foram testados.

Preparação para publicação: formatação verificada com Prettier, build gerado e testes de interface aprovados usando os arquivos de `dist/`. Para repetir contra um servidor dessa pasta, defina `BASE_URL` antes de rodar `npm run test:browser`. Cabeçalhos, redirecionamentos e DNS precisam ser conferidos no Cloudflare após publicar.

## Regras de cálculo

- Litros = distância ÷ consumo em km/L.
- Combustível = litros × preço por litro.
- Custos totais = combustível + despesas adicionais.
- Saldo = faturamento ou valor oferecido − custos totais.
- Faturamento/km (turno) = faturamento ÷ distância.
- Saldo/km (corrida) = saldo ÷ distância.
- Saldo/hora = saldo ÷ duração em horas.

Exemplo: R$ 200 de faturamento, 120 km, 12 km/L, R$ 6/L e R$ 25 de alimentação produzem 10 litros, R$ 60 de combustível e R$ 115 de saldo.

Consumo deve ser maior que zero. Distância zero é aceita apenas no turno, sem indicador por km. Duração vazia ou zero omite o saldo/hora. Minutos vão de 0 a 59 e horas de 0 a 9999, ambos inteiros. Despesas vazias valem zero. Valores negativos, não finitos, notação exponencial e separadores de milhar são rejeitados. Os campos decimais têm limite de um bilhão; resultados não finitos também são rejeitados.

Arredondamento ocorre apenas na apresentação. Ao alterar uma entrada, o resultado anterior é ocultado até recalcular. Trocar de calculadora descarta os campos anteriores. Limpar preserva somente a aparência.

## Privacidade e próximas etapas

Nenhum cálculo é persistido ou enviado a um servidor. A chave local `ganhos-theme` guarda Sistema/Claro/Escuro; `ganhos-analytics-consent` guarda a escolha de estatísticas. O Bootstrap faz uma requisição à CDN, independente dos valores dos formulários.

GA4 `G-RVTLBH84P5` integrado em `js/analytics.js`, somente no domínio de produção e após aceitação. Eventos: `calculator_selected` e `calculation_completed`, contendo apenas `calculator_type`. A tag mede visitas e dados técnicos; nenhum valor dos formulários integra os eventos personalizados. A recusa impede novos eventos; a preferência pode ser revista no rodapé. O carregamento e a fila de eventos foram testados com rede simulada, sem enviar dados ao Google. A recepção no GA4 precisa ser confirmada após publicar. Consulte [DEPLOY.md](DEPLOY.md).

## Documentação e skills

- [DEPLOY.md](DEPLOY.md): publicação, domínio, pacote e verificações no Cloudflare Pages.
- [DESIGN.md](DESIGN.md): decisões de produto e escopo acordado.
- [AGENTS.md](AGENTS.md): orientações comuns para desenvolvimento.
- [CLAUDE.md](CLAUDE.md) e [ANTIGRAVITY.md](ANTIGRAVITY.md): pontos de entrada para agentes.

Antes de cada etapa, consultar a skill adequada em `C:\Users\Guilherme\.agents\skills`. Nesta implementação foram usadas orientações de JavaScript e frontend; a validação inclui práticas de acessibilidade e testes de interface. Playwright foi utilizado pela versão Node disponível no ambiente, pois o módulo Python não estava instalado.
