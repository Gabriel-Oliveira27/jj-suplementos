"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  atraso?: number;
  y?: number;
  rotacao?: number;
  className?: string;
};

// Sobe e aparece quando entra na tela (uma vez só).
export function Revelar({ children, atraso = 0, y = 40, rotacao = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotate: rotacao ? rotacao * 2 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotacao }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
