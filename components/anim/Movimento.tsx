"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Quem pediu menos movimento no sistema operacional recebe as transições sem deslocamento.
export function Movimento({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
