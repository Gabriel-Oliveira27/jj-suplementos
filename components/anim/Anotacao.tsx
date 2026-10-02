"use client";

import { motion } from "motion/react";

type Props = {
  texto: string;
  seta?: "baixo" | "esquerda" | "direita" | "nenhuma";
  cor?: string;
  className?: string;
  atraso?: number;
};

const setas = {
  baixo: "M10 4 C 30 20, 34 40, 22 62 M10 52 L22 64 L34 52",
  esquerda: "M64 10 C 44 4, 20 14, 8 34 M6 20 L7 35 L22 34",
  direita: "M6 10 C 26 4, 50 14, 62 34 M64 20 L63 35 L48 34",
};

// Bilhete "escrito à mão" com seta desenhada — o toque humano do time da loja.
export function Anotacao({ texto, seta = "baixo", cor = "text-amarelo", className = "", atraso = 0.4 }: Props) {
  return (
    <motion.span
      className={`pointer-events-none inline-flex items-start gap-1 font-marker ${cor} ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay: atraso }}
    >
      <span className="leading-tight">{texto}</span>
      {seta !== "nenhuma" && (
        <svg width="56" height="56" viewBox="0 0 70 70" fill="none" aria-hidden className="shrink-0">
          <motion.path
            d={setas[seta]}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: atraso + 0.2, ease: "easeOut" }}
          />
        </svg>
      )}
    </motion.span>
  );
}
