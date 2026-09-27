# Orientações para agentes

## Contexto

- Ler [README.md](README.md) para estrutura, cálculos, fluxos e pendências.
- Projeto estático em HTML, CSS e JavaScript, com Bootstrap; entrada pública sem autenticação.
- Preservar o idioma português na interface e na documentação.

## Skills e escopo

- Antes de cada etapa, conferir as skills em `C:\Users\Guilherme\.agents\skills` e ler o `SKILL.md` pertinente.
- Informar qual skill será aplicada e por quê; não escolher apenas pela semelhança do nome.
- O usuário autorizou desenvolvimento e validação do design acordado em `DESIGN.md`.
- Analytics e publicação são etapas finais; não reativar a configuração antiga.

## Gerenciador de pacotes

- Usar npm com `package-lock.json`: `npm ci`. Node.js 22+.
- `npm run format` padroniza os arquivos; `npm run format:check` verifica a formatação.
- `npm run build` gera `dist/` pela lista de arquivos permitidos. Consultar `DEPLOY.md`.

## Comandos por arquivo

- Fórmulas e validações: `node --test tests/calculations.test.cjs` (Node 18+).
- Interface: `node tests/browser.cjs`, com Playwright disponível, Edge instalado e servidor local na porta 8765; detalhes no README.
- Diferenciar inspeção estática de comportamento efetivamente testado.

## Convenções e cuidados

- Preservar a estrutura existente, salvo mudança de arquitetura solicitada.
- Manter IDs do HTML e referências JavaScript consistentes.
- Conferir a ordem de carregamento e as funções globais compartilhadas antes de alterar scripts.
- Páginas antigas de autenticação redirecionam para o início; scripts legados não são carregados.
- Não tratar o resultado diário como lucro completo: ele desconta apenas combustível e despesas informadas.
- Não criar contas, enviar e-mails de recuperação ou alterar serviços externos como parte de uma leitura ou documentação.
- Não adicionar credenciais administrativas aos arquivos públicos.
- Atualizar o README quando comportamento, dependências ou procedimentos mudarem.

## Atribuição de commits

- Quando houver commit com contribuição de IA, incluir `Co-Authored-By` com a identidade real disponível do agente.
- Não inventar nome de modelo ou endereço de atribuição.
