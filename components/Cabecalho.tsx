"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { IconeFechar, IconeMenu, IconeSacola } from "./icones";
import { abrirPedido, usePedido } from "@/lib/pedido";
import { loja } from "@/lib/loja";
import { ID_BOTAO_PEDIDO } from "@/lib/voar";

const links = [
  { href: "#objetivos", rotulo: "Objetivos" },
  { href: "#catalogo", rotulo: "Arsenal" },
  { href: "#consultores", rotulo: "Time" },
  { href: "#eventos", rotulo: "Eventos" },
  { href: "#loja", rotulo: "A loja" },
];

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const itens = usePedido();
  const total = itens.reduce((soma, i) => soma + i.quantidade, 0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setRolou(y > 40));

  return (
    <>
      <div className="bg-amarelo text-preto">
        <p className="mx-auto max-w-7xl px-4 py-1.5 text-center font-cond text-sm font-bold tracking-[0.18em] uppercase">
          {loja.entrega}
          <span className="hidden sm:inline"> · Chama no direct ou no zap</span>
        </p>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
          rolou || menuAberto ? "border-b border-linha bg-preto/90 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6">
          <a href="#inicio" className="group flex items-center gap-2.5 sm:gap-3" aria-label={`${loja.nome} – início`}>
            <Image
              src="/marca/jj-logo.jpg"
              alt=""
              width={48}
              height={48}
              loading="eager"
              className="size-9 rounded-full border-2 border-amarelo object-cover transition-transform duration-500 group-hover:rotate-[-12deg] sm:size-11"
            />
            <span className="font-display text-xl leading-none tracking-wide whitespace-nowrap uppercase sm:text-2xl">
              <span className="text-amarelo">JJ</span> Suplementos
            </span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 font-cond text-base font-semibold tracking-[0.14em] uppercase">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="relative py-1 text-osso/80 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-right after:scale-x-0 after:bg-amarelo after:transition-transform after:duration-300 hover:text-osso hover:after:origin-left hover:after:scale-x-100"
                  >
                    {l.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id={ID_BOTAO_PEDIDO}
              type="button"
              onClick={abrirPedido}
              className="chanfro relative inline-flex items-center gap-2 bg-amarelo px-3.5 py-2.5 font-cond text-base font-bold tracking-wider text-preto uppercase transition-colors [--corte:10px] hover:bg-osso sm:px-4"
            >
              <IconeSacola />
              <span className="hidden sm:inline">Meu pedido</span>
              <AnimatePresence mode="popLayout">
                {total > 0 && (
                  <motion.span
                    key={total}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="flex h-5 min-w-5 items-center justify-center bg-preto px-1 text-xs text-amarelo"
                  >
                    {total}
                    <span className="sr-only"> itens</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenuAberto((v) => !v)}
              className="p-2 text-osso hover:text-amarelo lg:hidden"
              aria-expanded={menuAberto}
              aria-controls="menu-movel"
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            >
              {menuAberto ? <IconeFechar width={26} height={26} /> : <IconeMenu width={26} height={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuAberto && (
            <motion.nav
              id="menu-movel"
              aria-label="Principal"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden border-t border-linha lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setMenuAberto(false)}
                      className="flex items-baseline gap-3 py-2 font-display text-4xl uppercase hover:text-amarelo"
                    >
                      <span className="font-cond text-sm text-cinza">0{i + 1}</span>
                      {l.rotulo}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
