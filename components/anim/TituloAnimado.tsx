"use client";

import { motion } from "motion/react";

type Linha = string | { texto: string; className?: string };

type Props = {
  linhas: Linha[];
  como?: "h1" | "h2";
  className?: string;
  atraso?: number;
  // true: anima ao carregar (hero). false: anima quando rolar até ele.
  aoCarregar?: boolean;
};

// Cada linha sobe por trás de uma "máscara", como letreiro sendo revelado.
export function TituloAnimado({ linhas, como = "h2", className = "", atraso = 0, aoCarregar = false }: Props) {
  const Tag = como === "h1" ? motion.h1 : motion.h2;
  const disparo = aoCarregar
    ? { initial: "oculto", animate: "visivel" }
    : { initial: "oculto", whileInView: "visivel", viewport: { once: true, amount: 0.6 } };

  return (
    <Tag
      {...disparo}
      transition={{ staggerChildren: 0.09, delayChildren: atraso }}
      className={`font-display leading-[0.9] uppercase ${className}`}
      aria-label={linhas.map((l) => (typeof l === "string" ? l : l.texto)).join(" ")}
    >
      {linhas.map((linha, i) => {
        const { texto, className: classeLinha = "" } = typeof linha === "string" ? { texto: linha } : linha;
        return (
          // Folga em cima para acentos (Ê, Ã) não vazarem da máscara antes da animação.
          <span key={i} className="-mt-[0.16em] block overflow-hidden pt-[0.16em] pb-[0.06em]" aria-hidden>
            <motion.span
              className={`block ${classeLinha}`}
              variants={{
                oculto: { y: "135%" },
                visivel: { y: "0%", transition: { duration: 0.8, ease: [0.2, 0.9, 0.1, 1] } },
              }}
            >
              {texto}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
