"use client";

import { useEffect, useRef, useState } from "react";
import { ImagemProduto } from "./ImagemProduto";
import { IconeCheck, IconeMais } from "./icones";
import { adicionarAoPedido } from "@/lib/pedido";
import { categorias, type Produto } from "@/lib/produtos";
import { formatarPreco } from "@/lib/formatar";
import { voarParaPedido } from "@/lib/voar";

type Props = {
  produto: Produto;
  numero: number;
  aoVerDetalhes: (produto: Produto) => void;
  eager?: boolean;
};

export function ProdutoCard({ produto, numero, aoVerDetalhes, eager }: Props) {
  const [adicionado, setAdicionado] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const categoria = categorias.find((c) => c.id === produto.categoria)?.nome;

  useEffect(() => {
    if (!adicionado) return;
    const t = setTimeout(() => setAdicionado(false), 1600);
    return () => clearTimeout(t);
  }, [adicionado]);

  function adicionar() {
    // Produto com sabor/cor precisa da escolha: abre os detalhes.
    if (produto.variantes && produto.variantes.opcoes.length > 1) {
      aoVerDetalhes(produto);
      return;
    }
    adicionarAoPedido(produto.id, produto.variantes?.opcoes[0]);
    if (botao.current) voarParaPedido(botao.current, produto.imagens[0]);
    setAdicionado(true);
  }

  return (
    // Borda de 1px feita com duas camadas chanfradas (clip-path corta a borda comum).
    <article className="group chanfro h-full bg-linha p-px transition-colors duration-300 [--corte:22px] hover:bg-amarelo">
      <div className="chanfro flex h-full flex-col bg-carvao [--corte:21.6px]">
        <button
          type="button"
          onClick={() => aoVerDetalhes(produto)}
          className="relative block overflow-hidden text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amarelo"
          aria-label={`Ver detalhes de ${produto.nome}`}
        >
          <ImagemProduto
            produto={produto}
            sizes="(min-width: 1280px) 290px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
            eager={eager}
            className="aspect-[4/5] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
          />
          {/* reflexo que atravessa a foto no hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[450%]"
          />
          <span className="absolute top-0 left-0 bg-preto/85 px-2.5 py-1 font-cond text-xs font-bold tracking-widest text-amarelo">
            Nº {String(numero).padStart(2, "0")}
          </span>
          {produto.selo && (
            <span className="absolute top-3 right-2 rotate-3 bg-amarelo px-2 py-0.5 font-cond text-[11px] font-bold tracking-wider text-preto uppercase shadow-[2px_2px_0_#0a0a0a] transition-transform duration-300 group-hover:rotate-0">
              {produto.selo}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col gap-1.5 px-3 pt-3 pb-4 sm:px-4">
          <p className="font-cond text-xs font-semibold tracking-[0.18em] text-amarelo uppercase">
            {produto.marca ?? categoria}
          </p>
          <h3 className="font-display text-xl leading-[0.95] uppercase sm:text-2xl">
            <button type="button" onClick={() => aoVerDetalhes(produto)} className="text-left transition-colors hover:text-amarelo">
              {produto.nome}
            </button>
          </h3>
          {produto.tamanho && <p className="font-cond text-sm tracking-wide text-cinza uppercase">{produto.tamanho}</p>}
          <p className="mt-1 line-clamp-2 hidden text-sm text-osso/65 sm:block">{produto.resumo}</p>
          <p className="mt-auto pt-3 font-cond text-sm tracking-wide uppercase">
            {produto.preco ? (
              <span className="font-display text-2xl text-osso">{formatarPreco(produto.preco)}</span>
            ) : (
              <span className="text-cinza">Valor sob consulta</span>
            )}
          </p>
        </div>

        <button
          ref={botao}
          type="button"
          onClick={adicionar}
          className={`group/add relative flex items-center justify-center gap-2 overflow-hidden py-3.5 font-cond text-base font-bold tracking-wider uppercase transition-colors ${
            adicionado ? "bg-whatsapp text-preto" : "bg-grafite text-osso hover:text-preto"
          }`}
        >
          {!adicionado && (
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-amarelo transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] group-hover/add:scale-x-100"
            />
          )}
          <span className="relative flex items-center gap-2">
            {adicionado ? (
              <>
                <IconeCheck width={18} height={18} /> Na sacola
              </>
            ) : (
              <>
                <IconeMais width={18} height={18} />
                <span>
                  Adicionar<span className="hidden sm:inline"> ao pedido</span>
                </span>
              </>
            )}
          </span>
        </button>
      </div>
    </article>
  );
}
