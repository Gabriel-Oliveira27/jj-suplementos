"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ImagemProduto } from "./ImagemProduto";
import { IconeCheck, IconeFechar, IconeMais, IconeMenos, IconeWhatsApp } from "./icones";
import { abrirPedido, adicionarAoPedido } from "@/lib/pedido";
import { consultorPrincipal, linkWhatsApp } from "@/lib/loja";
import { categorias, nomeCompleto, type Produto } from "@/lib/produtos";
import { formatarPreco } from "@/lib/formatar";

type Props = {
  produto: Produto | null;
  aoFechar: () => void;
};

export function ProdutoModal({ produto, aoFechar }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (produto && !dialogo.open) dialogo.showModal();
    if (!produto && dialogo.open) dialogo.close();
  }, [produto]);

  return (
    <dialog
      ref={ref}
      onClose={aoFechar}
      onClick={(e) => e.target === e.currentTarget && aoFechar()}
      className="modal-produto chanfro m-auto w-[calc(100%-2rem)] max-w-4xl overflow-hidden border-0 bg-carvao p-0 text-osso shadow-2xl [--corte:28px] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {/* key: zera sabor, foto e quantidade ao trocar de produto */}
      {produto && <Conteudo key={produto.id} produto={produto} aoFechar={aoFechar} />}
    </dialog>
  );
}

function Conteudo({ produto, aoFechar }: { produto: Produto; aoFechar: () => void }) {
  const [foto, setFoto] = useState(0);
  const [variante, setVariante] = useState(produto.variantes?.opcoes[0]);
  const [quantidade, setQuantidade] = useState(1);
  const categoria = categorias.find((c) => c.id === produto.categoria)?.nome;

  const pergunta = linkWhatsApp(
    consultorPrincipal.whatsapp,
    `Olá! Vi no catálogo do site e quero saber valor e disponibilidade de: ${nomeCompleto(produto)}${
      variante ? ` (${produto.variantes?.rotulo}: ${variante})` : ""
    }.`,
  );

  function adicionar() {
    adicionarAoPedido(produto.id, variante, quantidade);
    aoFechar();
    abrirPedido();
  }

  function escolherFoto(i: number) {
    setFoto(i);
    if (produto.variantes?.opcoes[i]) setVariante(produto.variantes.opcoes[i]);
  }

  return (
    <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-2">
      <div className="relative overflow-hidden bg-preto">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={foto}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ImagemProduto
              produto={produto}
              indice={foto}
              sizes="(min-width: 768px) 448px, 100vw"
              eager
              className="aspect-[4/5] w-full"
            />
          </motion.div>
        </AnimatePresence>
        {produto.imagens.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-linear-to-t from-black/80 to-transparent p-4">
            {produto.imagens.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => escolherFoto(i)}
                aria-label={`Foto ${i + 1}`}
                aria-pressed={foto === i}
                className={`h-2 transition-all ${foto === i ? "w-10 bg-amarelo" : "w-4 bg-white/50 hover:bg-white"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-cond text-sm font-bold tracking-[0.2em] text-amarelo uppercase">
              {[produto.marca, categoria].filter(Boolean).join(" · ")}
            </p>
            <h2 className="mt-2 font-display text-4xl leading-[0.95] uppercase sm:text-5xl">{produto.nome}</h2>
            {produto.tamanho && (
              <p className="mt-2 font-cond text-lg tracking-wide text-cinza uppercase">{produto.tamanho}</p>
            )}
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="-mt-1 -mr-2 p-2 text-cinza transition-transform hover:rotate-90 hover:text-amarelo"
            aria-label="Fechar"
          >
            <IconeFechar width={26} height={26} />
          </button>
        </div>

        <p className="leading-relaxed text-osso/80">{produto.descricao}</p>

        {produto.destaques && (
          <ul className="grid gap-2">
            {produto.destaques.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex items-center gap-2 font-cond text-lg tracking-wide uppercase"
              >
                <IconeCheck width={18} height={18} className="shrink-0 text-amarelo" />
                {d}
              </motion.li>
            ))}
          </ul>
        )}

        {produto.variantes && (
          <fieldset>
            <legend className="mb-2 font-cond text-sm font-bold tracking-[0.2em] text-cinza uppercase">
              {produto.variantes.rotulo}
            </legend>
            <div className="flex flex-wrap gap-2">
              {produto.variantes.opcoes.map((opcao, i) => (
                <button
                  key={opcao}
                  type="button"
                  onClick={() => {
                    setVariante(opcao);
                    if (produto.imagens[i]) setFoto(i);
                  }}
                  aria-pressed={variante === opcao}
                  className={`border-2 px-4 py-2 font-cond text-base font-semibold tracking-wide uppercase transition-colors ${
                    variante === opcao
                      ? "border-amarelo bg-amarelo text-preto"
                      : "border-linha text-osso hover:border-amarelo"
                  }`}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-linha pt-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-cond text-lg tracking-wide uppercase">
              {produto.preco ? (
                <span className="font-display text-4xl">{formatarPreco(produto.preco)}</span>
              ) : (
                <span className="text-cinza">Valor sob consulta</span>
              )}
            </p>
            <div className="flex items-center border-2 border-linha">
              <button
                type="button"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                className="p-2.5 text-cinza hover:text-amarelo disabled:opacity-40"
                disabled={quantidade <= 1}
                aria-label="Diminuir quantidade"
              >
                <IconeMenos width={16} height={16} />
              </button>
              <span className="w-8 text-center font-display text-xl tabular-nums" aria-live="polite">
                {quantidade}
              </span>
              <button
                type="button"
                onClick={() => setQuantidade((q) => q + 1)}
                className="p-2.5 text-cinza hover:text-amarelo"
                aria-label="Aumentar quantidade"
              >
                <IconeMais width={16} height={16} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={adicionar}
            className="chanfro inline-flex items-center justify-center gap-2 bg-amarelo px-5 py-4 font-cond text-lg font-bold tracking-wider text-preto uppercase transition-colors [--corte:12px] hover:bg-osso"
          >
            <IconeMais width={20} height={20} /> Adicionar ao pedido
          </button>
          <a
            href={pergunta}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 font-cond text-base font-semibold tracking-wider text-whatsapp uppercase underline-offset-4 hover:underline"
          >
            <IconeWhatsApp width={18} height={18} /> Perguntar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
