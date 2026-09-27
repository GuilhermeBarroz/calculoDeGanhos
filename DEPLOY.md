# Publicação no Cloudflare Pages

Endereço definido: **https://calculadoradeganhos.conexo.app.br/**.
Os arquivos estão preparados; este procedimento ainda não publicou o site nem alterou DNS.

## Preparar os arquivos

Requer Node.js 22 ou superior. Na raiz do projeto:

```sh
npm ci
npm run format:check
npm test
npm run build
```

`dist/` contém somente os arquivos públicos. Não envie a raiz do repositório: ela inclui documentação, testes e scripts legados. O build usa uma lista explícita de arquivos permitidos e não exige instalação de dependências em produção.

## Opção A: envio manual

1. Crie um projeto **Pages** usando **Direct Upload** no painel Workers & Pages.
2. Envie a pasta `dist` ou o arquivo `calculadora-de-ganhos-pages.zip` preparado na raiz do projeto.
3. Confirme que `index.html` está na raiz do pacote, sem uma pasta `dist` envolvendo os arquivos.
4. Confira o endereço `pages.dev` gerado antes de configurar o domínio.

Para atualizar o ZIP após alterações, rode o build e, em PowerShell:

```powershell
Compress-Archive -Path dist/* -DestinationPath calculadora-de-ganhos-pages.zip -Force
```

Projetos criados com Direct Upload não podem ser convertidos em integração Git no mesmo projeto. Se desejar atualizações automáticas desde o início, use a opção B. [Documentação de Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Opção B: integração Git

Conecte o repositório ao projeto Pages e use:

| Configuração            | Valor                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Framework preset        | None                                                                                |
| Build command           | `npm run build`                                                                     |
| Build output directory  | `dist`                                                                              |
| Root directory          | Raiz do repositório; se este projeto estiver numa subpasta, selecione essa subpasta |
| Variável `NODE_VERSION` | `22`                                                                                |
| Production branch       | A branch que você escolher para publicação                                          |

Inclua as fontes, `package.json` e `package-lock.json` no repositório. Não é necessário versionar `dist/` nem o ZIP. [Configuração de build](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## Associar o domínio

1. No projeto Pages, abra **Custom domains → Set up a domain**.
2. Informe `calculadoradeganhos.conexo.app.br`.
3. Siga a configuração DNS exibida pelo painel. Se for necessário criar o registro manualmente, use um CNAME apontando esse subdomínio para o endereço real `<seu-projeto>.pages.dev`.
4. O nome relativo do registro depende da zona DNS: em `conexo.app.br`, normalmente será `calculadoradeganhos`. Confira a zona antes de salvar.
5. Aguarde o domínio ficar ativo e o certificado HTTPS ser emitido.

Associe o domínio no Pages antes de criar o CNAME. Não altere registros de outros serviços do domínio. [Domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Arquivos preparados

- `_headers`: cabeçalhos de resposta para os arquivos estáticos.
- `_redirects`: redirecionamentos permanentes das antigas páginas de autenticação para `/`.
- `404.html`: página para endereços inexistentes, sem fallback de aplicação SPA.
- `robots.txt` e `sitemap.xml`: endereço definitivo para indexação.
- `index.html`: endereço canônico e metadados de compartilhamento.
- `images/favicon.svg`: favicon novo.

O servidor Python local não interpreta `_headers` e `_redirects`; valide essas regras no Pages após publicar. [Cabeçalhos](https://developers.cloudflare.com/pages/configuration/headers/), [redirecionamentos](https://developers.cloudflare.com/pages/configuration/redirects/) e [páginas 404](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## Conferência após publicar

- Abrir o domínio com HTTPS e testar as três calculadoras em computador e celular.
- Verificar temas, rolagem ao formulário, despesas e mensagens de erro.
- Conferir favicon, `robots.txt`, `sitemap.xml` e a resposta 404 de uma URL inexistente.
- Conferir o redirecionamento de `/login`, `/cadastro` e `/recuperarSenha`.
- Confirmar que `/js/fireBaseConfig.js`, `/README.md` e `/tests/browser.cjs` retornam 404.
- Verificar os cabeçalhos na resposta do site, usando as ferramentas do navegador.

## Analytics

Identificador integrado: `G-RVTLBH84P5`. O script só carrega no domínio `calculadoradeganhos.conexo.app.br` após o visitante aceitar estatísticas no rodapé. localhost e pages.dev não coletam dados. Após publicar, aceite estatísticas, escolha uma calculadora e conclua um cálculo; confira no GA4 em Tempo real/DebugView com Tag Assistant. Desative a medição otimizada de interações de formulário no fluxo Web e registre `calculator_type` como dimensão personalizada de escopo de evento. Confirme que os eventos não incluem valores dos formulários. A configuração antiga permanece fora do pacote.

Referência: [Consent Mode do Google](https://developers.google.com/tag-platform/security/guides/consent).
