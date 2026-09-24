# SEO e indexação da Blue Moby

Endereço oficial configurado no projeto: **https://bluemoby.com.br/**, conforme `CNAME`.

## O que o código entrega

- Título com o nome da marca e descrição do conteúdo.
- Endereço canônico absoluto para consolidar a página inicial.
- `robots.txt` permitindo rastreamento e indicando o sitemap.
- `sitemap.xml` com a URL principal e as imagens dos ambientes e produtos.
- Dados estruturados `Organization`, `WebSite` e `WebPage`: marca, logo, CNPJ, cidade, atendimento e lojas oficiais.
- Metadados Open Graph e Twitter Card para prévias de compartilhamento.
- Coleção disponível no HTML inicial, antes de executar JavaScript. Os filtros e pop-ups continuam sendo controlados por `scripts/app.js`.

O site tem uma única página. Seções como `#sobre` não são páginas independentes e não entram como URLs separadas no sitemap. As traduções atuais são feitas no navegador, na mesma URL; não há URLs de idiomas para declarar em `hreflang`.

## Depois de publicar

1. Publique os arquivos atualizados na hospedagem que atende `bluemoby.com.br`. Alterar os arquivos locais não altera automaticamente o site público.
2. Confira se a página inicial, `/robots.txt`, `/sitemap.xml` e as imagens abrem publicamente por HTTPS, sem exigir login e sem retornar erros. Confirme também que a hospedagem não adiciona um cabeçalho `X-Robots-Tag: noindex`.
3. No [Google Search Console](https://search.google.com/search-console), adicione uma propriedade de domínio para `bluemoby.com.br` e verifique-a com o registro DNS TXT fornecido pelo Google. O valor é específico da sua conta; não existe um código genérico que possa ser inserido antecipadamente.
4. Na área **Sitemaps**, envie `https://bluemoby.com.br/sitemap.xml`.
5. Em **Inspeção de URL**, inspecione `https://bluemoby.com.br/`, execute o teste da URL publicada e solicite indexação.
6. Valide os dados estruturados no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results) e acompanhe os relatórios de indexação e desempenho no Search Console.

Se as variantes HTTP, `www` ou o endereço `github.io` responderem com conteúdo duplicado, configure na hospedagem redirecionamentos permanentes para o domínio oficial. O código canônico indica a preferência, mas não substitui um redirecionamento HTTP.

O sitemap facilita a descoberta; não garante indexação nem primeiras posições. Para fortalecer a associação entre a marca e o domínio, use o nome **Blue Moby** de forma consistente nos canais oficiais e inclua o link do site nos perfis que permitem esse campo. Acompanhe impressões e cliques para a consulta “blue moby” no Search Console.

## Manutenção

- Ao mudar produtos em `scripts/app.js`, execute `node tools/update-catalog.cjs` e inclua o `index.html` atualizado no mesmo commit. A publicação não exige Node nem instalação de dependências.
- Ao adicionar páginas reais, inclua suas URLs canônicas no sitemap. Atualize também as imagens quando a coleção mudar.
- Ao mudar domínio, contato ou lojas, atualize `CNAME`, canonical, metadados sociais, JSON-LD, `robots.txt` e sitemap, conforme aplicável.
- O sitemap não usa uma data `lastmod` automática: datas imprecisas não ajudam o buscador. Se esse campo for adicionado, use a data real de uma alteração relevante.
- Não invente preços, avaliações, endereço completo ou políticas de entrega nos dados estruturados. Os dados devem corresponder ao conteúdo público da empresa.

## Referências

- [Sitemaps: criação e envio](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Dados estruturados de organizações](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [SEO para JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [URLs canônicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
