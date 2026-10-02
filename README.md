# JJ Suplementos — Catálogo

Catálogo de produtos da **JJ Suplementos** (Iguatu - CE), feito com Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4.

O cliente navega pelos produtos, filtra por objetivo/categoria, monta uma lista ("Meu pedido") e envia tudo pronto para um consultor no WhatsApp — o mesmo fluxo de venda que a loja já usa ("chama no Direct ou via WhatsApp").

## Rodando

```bash
npm install
npm run dev -- -p 3010
```

Abra http://localhost:3010.

## Identidade visual

- **Cores:** preto + amarelo da tenda dos eventos (faixas, botões) e dourado do espartano.
- **Tipografia:** Anton (títulos de pôster), Barlow Condensed (rótulos), Barlow (texto) e Permanent Marker (anotações "à mão" do time).
- **Formas:** cantos chanfrados (`chanfro` em `app/globals.css`), listras preto/amarelo, granulado de impressão e polaroids com fita.
- **Animações** (biblioteca [Motion](https://motion.dev)): títulos revelados por máscara, parallax do espartano, selo girando, faixas correndo, lista de objetivos com preenchimento, grade do catálogo que se reorganiza ao filtrar, produto "voando" até a sacola. Quem ativa "reduzir movimento" no sistema recebe a versão sem deslocamento.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Produtos (nome, marca, descrição, fotos, sabores/cores, preço opcional) | `lib/produtos.ts` |
| Endereço, consultores, WhatsApp, redes sociais | `lib/loja.ts` |
| Cores da marca (preto + dourado do espartano) | `app/globals.css` (`@theme`) |
| Fotos dos produtos | `public/produtos/` |
| Logo e artes | `public/marca/`, `app/icon.png` |

- **Preço:** a loja não divulga preços publicamente, então os cards mostram "Consulte o valor". Preencha `preco` em um produto para exibir o valor.
- **Sem foto:** produtos com `imagens: []` usam a arte padrão com o espartano.

## De onde veio o conteúdo

Levantado das páginas públicas da loja (outubro de 2026):

- Instagram [@jjsuplementosoficialiguatu](https://www.instagram.com/jjsuplementosoficialiguatu/) — bio, posts de produtos e camisetas.
- Facebook [JJsuplementosoficial](https://www.facebook.com/JJsuplementosoficial) — logo, fotos e legendas dos produtos.
- Linktree [linktr.ee/Jorbson](https://linktr.ee/Jorbson) — consultores (Jorbson, Jonathan, Hiago), WhatsApp e endereço.

Antes de publicar, confirme com a loja:

- **Endereço:** o Linktree aponta Rua Rosemira Guedes dos Santos, 82 (Cajueiro); o Facebook mostra Rua Francisco Holanda Montenegro, 290; o Bing mostra Rua Alto da Gangorra, 331. O site usa o do Linktree.
- **Whey Protein, Pré-treino e Meias de treino** entraram como itens "consulte marcas/modelos" (aparecem nos destaques e eventos, mas sem foto de produto específico).
- Autorização para uso das fotos e da marca.
