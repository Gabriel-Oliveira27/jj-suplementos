"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ImagemProduto } from "./ImagemProduto";
import { IconeFechar, IconeLixeira, IconeMais, IconeMenos, IconeSacola, IconeWhatsApp } from "./icones";
import {
  alterarQuantidade,
  fecharPedido,
  limparPedido,
  removerDoPedido,
  usePedido,
  usePedidoAberto,
  type ItemPedido,
} from "@/lib/pedido";
import { linkWhatsApp, loja } from "@/lib/loja";
import { nomeCompleto, produtos, type Produto } from "@/lib/produtos";

const porId = new Map(produtos.map((p) => [p.id, p]));

function linhaDoItem(item: ItemPedido, produto: Produto) {
  const variante = item.variante ? ` (${produto.variantes?.rotulo ?? "Opção"}: ${item.variante})` : "";
  return `• ${item.quantidade}x ${nomeCompleto(produto)}${variante}`;
}

export function PedidoDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const aberto = usePedidoAberto();
  const itens = usePedido();
  const [consultor, setConsultor] = useState(loja.consultores[0]);
  const [nomeCliente, setNomeCliente] = useState("");

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  const linhas = itens.flatMap((item) => {
    const produto = porId.get(item.id);
    return produto ? [{ item, produto }] : [];
  });
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);

  const mensagem = [
    `Olá, ${consultor.nome}! Vim pelo catálogo do site da ${loja.nome} e quero fazer um pedido:`,
    "",
    ...linhas.map(({ item, produto }) => linhaDoItem(item, produto)),
    "",
    "Pode me passar valores e disponibilidade?",
    nomeCliente.trim() ? `Meu nome: ${nomeCliente.trim()}` : "",
  ]
    .join("\n")
    .trim();

  return (
    <dialog
      ref={ref}
      onClose={fecharPedido}
      onClick={(e) => e.target === e.currentTarget && fecharPedido()}
      aria-labelledby="titulo-pedido"
      className="gaveta fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-md border-0 border-l-4 border-amarelo bg-carvao p-0 text-osso backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-linha px-5 py-4">
          <h2 id="titulo-pedido" className="flex items-center gap-3 font-display text-3xl uppercase">
            <IconeSacola width={26} height={26} className="text-amarelo" /> Meu pedido
            {totalItens > 0 && <span className="font-cond text-lg text-cinza">({totalItens})</span>}
          </h2>
          <button
            type="button"
            onClick={fecharPedido}
            className="p-2 text-cinza transition-transform hover:rotate-90 hover:text-amarelo"
            aria-label="Fechar"
          >
            <IconeFechar width={26} height={26} />
          </button>
        </header>

        {linhas.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <IconeSacola width={56} height={56} className="text-amarelo/70" />
            <p className="font-display text-3xl uppercase">Sacola vazia</p>
            <p className="-rotate-2 font-marker text-lg text-amarelo">bora escolher?</p>
            <p className="text-sm text-cinza">
              Adiciona o que te interessa e manda tudo de uma vez pro consultor no WhatsApp.
            </p>
            <button
              type="button"
              onClick={fecharPedido}
              className="chanfro mt-3 bg-amarelo px-6 py-3 font-cond font-bold tracking-wider text-preto uppercase [--corte:10px] hover:bg-osso"
            >
              Ver o arsenal
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-x-hidden overflow-y-auto px-5">
              <AnimatePresence initial={false}>
                {linhas.map(({ item, produto }) => (
                  <motion.li
                    key={`${item.id}-${item.variante ?? ""}`}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
                    className="flex gap-4 border-b border-linha py-4"
                  >
                    <ImagemProduto
                      produto={produto}
                      indice={Math.max(0, produto.variantes?.opcoes.indexOf(item.variante ?? "") ?? 0)}
                      sizes="72px"
                      eager
                      compacto
                      className="aspect-[4/5] w-18 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="font-cond text-xs font-bold tracking-[0.18em] text-amarelo uppercase">
                        {produto.marca}
                      </p>
                      <p className="font-display text-xl leading-tight uppercase">{produto.nome}</p>
                      <p className="font-cond text-sm tracking-wide text-cinza uppercase">
                        {[produto.tamanho, item.variante].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border-2 border-linha">
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(item.id, item.variante, -1)}
                            className="p-1.5 text-cinza hover:text-amarelo"
                            aria-label={`Diminuir quantidade de ${produto.nome}`}
                          >
                            <IconeMenos width={14} height={14} />
                          </button>
                          <span className="w-7 text-center font-display text-lg tabular-nums">{item.quantidade}</span>
                          <button
                            type="button"
                            onClick={() => alterarQuantidade(item.id, item.variante, 1)}
                            className="p-1.5 text-cinza hover:text-amarelo"
                            aria-label={`Aumentar quantidade de ${produto.nome}`}
                          >
                            <IconeMais width={14} height={14} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removerDoPedido(item.id, item.variante)}
                          className="p-1.5 text-cinza hover:text-red-400"
                          aria-label={`Remover ${produto.nome}`}
                        >
                          <IconeLixeira width={18} height={18} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <footer className="flex flex-col gap-4 border-t border-linha bg-preto/70 px-5 py-5">
              <fieldset>
                <legend className="mb-2 font-cond text-sm font-bold tracking-[0.2em] text-cinza uppercase">
                  Mandar para
                </legend>
                <div className="flex flex-wrap gap-2">
                  {loja.consultores.map((c) => (
                    <button
                      key={c.nome}
                      type="button"
                      onClick={() => setConsultor(c)}
                      aria-pressed={consultor.nome === c.nome}
                      className={`border-2 px-4 py-1.5 font-cond text-base font-semibold tracking-wide uppercase transition-colors ${
                        consultor.nome === c.nome
                          ? "border-amarelo bg-amarelo text-preto"
                          : "border-linha hover:border-amarelo"
                      }`}
                    >
                      {c.nome}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="flex flex-col gap-1.5 font-cond text-sm font-bold tracking-[0.2em] text-cinza uppercase">
                Seu nome <span className="sr-only">(opcional)</span>
                <input
                  type="text"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="Opcional"
                  autoComplete="given-name"
                  className="border-b-2 border-linha bg-transparent py-2 font-sans text-base font-normal tracking-normal text-osso normal-case placeholder:text-cinza/60 focus:border-amarelo focus:outline-none"
                />
              </label>
              <a
                href={linkWhatsApp(consultor.whatsapp, mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="chanfro inline-flex items-center justify-center gap-2 bg-whatsapp px-5 py-4 font-cond text-lg font-bold tracking-wider text-preto uppercase transition [--corte:12px] hover:brightness-110"
              >
                <IconeWhatsApp /> Enviar pelo WhatsApp
              </a>
              <p className="text-center text-xs text-cinza">
                {loja.entrega} · o consultor confirma valores e disponibilidade.
              </p>
              <button
                type="button"
                onClick={limparPedido}
                className="text-xs text-cinza underline-offset-4 hover:text-osso hover:underline"
              >
                Limpar lista
              </button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
