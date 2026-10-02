"use client";

import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Anotacao } from "./anim/Anotacao";
import { TituloAnimado } from "./anim/TituloAnimado";
import { ProdutoCard } from "./ProdutoCard";
import { ProdutoModal } from "./ProdutoModal";
import { IconeBusca, IconeFechar, IconeSeta } from "./icones";
import { categorias, objetivos, produtos, type Categoria, type Objetivo, type Produto } from "@/lib/produtos";
import { normalizar } from "@/lib/formatar";

const numeroDe = new Map(produtos.map((p, i) => [p.id, i + 1]));

export function Catalogo() {
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null);
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState<Produto | null>(null);
  // A grade lembra que já apareceu na tela. Assim, os cards que voltam depois de um filtro
  // herdam o estado "visivel" (com whileInView eles ficavam presos invisíveis).
  const grade = useRef<HTMLDivElement>(null);
  const gradeVista = useInView(grade, { once: true, amount: 0.05 });

  const filtrados = useMemo(() => {
    const termo = normalizar(busca.trim());
    return produtos.filter(
      (p) =>
        (!objetivo || p.objetivos.includes(objetivo)) &&
        (!categoria || p.categoria === categoria) &&
        (!termo || normalizar(`${p.nome} ${p.marca ?? ""} ${p.resumo}`).includes(termo)),
    );
  }, [objetivo, categoria, busca]);

  const temFiltro = objetivo || categoria || busca;

  function limparFiltros() {
    setObjetivo(null);
    setCategoria(null);
    setBusca("");
  }

  function escolherObjetivo(id: Objetivo) {
    setObjetivo(objetivo === id ? null : id);
    setCategoria(null);
    document.getElementById("catalogo")?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <section id="objetivos" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <TituloAnimado
            className="text-[clamp(2.8rem,7vw,5.6rem)]"
            linhas={["Qual é o seu", { texto: "objetivo?", className: "text-amarelo" }]}
          />
          <Anotacao texto="fala aqui!" seta="baixo" className="mb-2 text-2xl sm:text-3xl" />
        </div>

        <ul className="mt-10 border-t border-linha">
          {objetivos.map((o, i) => {
            const ativo = objetivo === o.id;
            const total = produtos.filter((p) => p.objetivos.includes(o.id)).length;
            return (
              <motion.li
                key={o.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <button
                  type="button"
                  aria-pressed={ativo}
                  onClick={() => escolherObjetivo(o.id)}
                  className="group relative flex w-full items-center gap-4 overflow-hidden border-b border-linha py-5 text-left sm:gap-8 sm:py-6"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 origin-left bg-amarelo transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      ativo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  <span
                    className={`relative w-8 pl-2 font-cond text-sm font-bold transition-colors sm:w-12 sm:pl-4 ${
                      ativo ? "text-preto" : "text-cinza group-hover:text-preto"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`relative font-display text-[clamp(1.7rem,4.4vw,3.4rem)] leading-none uppercase transition-[color,transform] duration-500 group-hover:translate-x-2 ${
                      ativo ? "text-preto" : "text-osso group-hover:text-preto"
                    }`}
                  >
                    {o.nome}
                  </span>
                  <span
                    className={`relative ml-auto hidden max-w-xs text-sm transition-colors md:block ${
                      ativo ? "text-preto/75" : "text-cinza group-hover:text-preto/75"
                    }`}
                  >
                    {o.descricao}
                  </span>
                  <span
                    className={`relative mr-2 flex shrink-0 items-center gap-3 font-cond text-sm font-semibold uppercase transition-colors sm:mr-4 max-md:ml-auto ${
                      ativo ? "text-preto" : "text-cinza group-hover:text-preto"
                    }`}
                  >
                    <span className="hidden sm:inline">{total} itens</span>
                    <span
                      className={`flex size-10 items-center justify-center rounded-full border transition-transform duration-500 group-hover:-rotate-45 ${
                        ativo ? "-rotate-45 border-preto" : "border-current"
                      }`}
                    >
                      {ativo ? <IconeFechar width={18} height={18} className="rotate-45" /> : <IconeSeta width={18} height={18} />}
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </section>

      <section id="catalogo" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:pt-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <TituloAnimado
              className="text-[clamp(3.2rem,9vw,7.5rem)]"
              linhas={[{ texto: "O arsenal", className: "text-osso" }]}
            />
            <p className="mt-3 max-w-md text-osso/70">
              O que tem na prateleira da JJ. Não achou? A loja tem mais coisa do que o site — chama no zap.
            </p>
          </div>
          <label className="group relative block w-full lg:max-w-sm">
            <span className="sr-only">Buscar produto</span>
            <IconeBusca className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-cinza transition-colors group-focus-within:text-amarelo" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto ou marca"
              className="w-full border-b-2 border-linha bg-transparent py-3 pr-2 pl-9 font-cond text-xl tracking-wide placeholder:text-cinza/60 focus:border-amarelo focus:outline-none"
            />
          </label>
        </div>

        <LayoutGroup id="categorias">
          <div
            className="sem-scrollbar -mx-4 mt-8 flex gap-1 overflow-x-auto border-b border-linha px-4 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Filtrar por categoria"
          >
            <Aba ativo={!categoria} onClick={() => setCategoria(null)}>
              Tudo
            </Aba>
            {categorias.map((c) => (
              <Aba key={c.id} ativo={categoria === c.id} onClick={() => setCategoria(categoria === c.id ? null : c.id)}>
                {c.nome}
              </Aba>
            ))}
          </div>
        </LayoutGroup>

        <div className="mt-5 flex min-h-9 flex-wrap items-center gap-3 font-cond text-base tracking-wide text-cinza uppercase" aria-live="polite">
          <span>
            {String(filtrados.length).padStart(2, "0")} {filtrados.length === 1 ? "produto" : "produtos"}
          </span>
          <AnimatePresence>
            {objetivo && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 bg-amarelo py-1 pr-1.5 pl-3 font-semibold text-preto"
              >
                {objetivos.find((o) => o.id === objetivo)?.nome}
                <button
                  type="button"
                  onClick={() => setObjetivo(null)}
                  className="p-0.5 hover:bg-preto/15"
                  aria-label="Remover filtro de objetivo"
                >
                  <IconeFechar width={14} height={14} />
                </button>
              </motion.span>
            )}
          </AnimatePresence>
          {temFiltro && (
            <button type="button" onClick={limparFiltros} className="underline underline-offset-4 hover:text-osso">
              Limpar filtros
            </button>
          )}
        </div>

        {/* A grade fica sempre montada (mesmo vazia) para o useInView não perder o elemento observado. */}
        <motion.div
          ref={grade}
          className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
          initial="oculto"
          animate={gradeVista ? "visivel" : "oculto"}
          transition={{ staggerChildren: 0.06 }}
        >
          <AnimatePresence mode="popLayout">
            {filtrados.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                variants={{
                  oculto: { opacity: 0, y: 50 },
                  visivel: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
                }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                transition={{ layout: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] } }}
              >
                <ProdutoCard
                  produto={p}
                  numero={numeroDe.get(p.id) ?? i + 1}
                  aoVerDetalhes={setAberto}
                  eager={i < 2}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtrados.length === 0 && (
          <div className="mt-4 border-2 border-dashed border-linha p-10 text-center">
            <p className="font-display text-4xl uppercase">Nada por aqui</p>
            <p className="mt-2 text-cinza">A loja tem mais produtos do que o site — chama no WhatsApp que a gente acha.</p>
            <button
              type="button"
              onClick={limparFiltros}
              className="chanfro mt-6 bg-amarelo px-6 py-3 font-cond font-bold tracking-wider text-preto uppercase [--corte:10px] hover:bg-osso"
            >
              Ver tudo
            </button>
          </div>
        )}
      </section>

      <ProdutoModal produto={aberto} aoFechar={() => setAberto(null)} />
    </>
  );
}

function Aba({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`relative shrink-0 px-4 pt-2 pb-3 font-cond text-base font-semibold tracking-wider whitespace-nowrap uppercase transition-colors ${
        ativo ? "text-amarelo" : "text-cinza hover:text-osso"
      }`}
    >
      {children}
      {ativo && (
        <motion.span
          layoutId="aba-ativa"
          className="absolute inset-x-0 -bottom-px h-1 bg-amarelo"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
    </button>
  );
}
