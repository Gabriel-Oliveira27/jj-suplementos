"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Anotacao } from "./anim/Anotacao";
import { TituloAnimado } from "./anim/TituloAnimado";
import { SeloGiratorio } from "./SeloGiratorio";
import { IconeSeta, IconeWhatsApp } from "./icones";
import { consultorPrincipal, linkWhatsApp } from "@/lib/loja";

const entrada = (atraso: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: atraso, ease: [0.2, 0.8, 0.2, 1] as const },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yEspartano = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yLetreiro = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rotSelo = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden">
      {/* "JJ" gigante vazado no fundo */}
      <motion.span
        aria-hidden
        style={{ y: yLetreiro }}
        className="pointer-events-none absolute -top-[6vw] -right-[4vw] font-display text-[46vw] leading-none text-amarelo/25 select-none texto-contorno lg:text-[34vw]"
      >
        JJ
      </motion.span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pt-10 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-4 lg:pt-16 lg:pb-28">
        <div className="relative z-10">
          <motion.p
            {...entrada(0)}
            className="flex items-center gap-3 font-cond text-sm font-semibold tracking-[0.3em] text-amarelo uppercase"
          >
            <span className="h-0.5 w-10 bg-amarelo" /> Iguatu · Ceará
          </motion.p>

          <TituloAnimado
            como="h1"
            aoCarregar
            atraso={0.1}
            className="mt-5 text-[clamp(3rem,7.4vw,6.6rem)] text-osso"
            linhas={["Loja", "referência em", { texto: "suplementação", className: "text-amarelo" }]}
          />

          <motion.p {...entrada(0.55)} className="mt-7 max-w-lg text-lg leading-relaxed text-osso/75">
            Whey, creatina, pré-treino, termogênico e roupa de treino — com atendimento de quem entende do
            assunto. Escolhe aqui, chama no zap e recebe em casa.
          </motion.p>

          <motion.div {...entrada(0.7)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#catalogo"
              className="group chanfro inline-flex items-center justify-center gap-3 bg-amarelo px-7 py-4 font-cond text-lg font-bold tracking-wider text-preto uppercase transition-colors [--corte:14px] hover:bg-osso"
            >
              Ver produtos
              <IconeSeta width={20} height={20} className="transition-transform group-hover:translate-x-1.5" />
            </a>
            <a
              href={linkWhatsApp(consultorPrincipal.whatsapp, "Olá! Gostaria de saber mais sobre os suplementos")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-4 font-cond text-lg font-semibold tracking-wider text-osso uppercase underline decoration-amarelo decoration-2 underline-offset-8 transition-colors hover:text-amarelo"
            >
              <IconeWhatsApp width={20} height={20} className="text-whatsapp" /> Chama no zap
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
          <motion.div
            style={{ y: yEspartano }}
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="relative animate-flutuar overflow-hidden [mask-image:radial-gradient(closest-side,#000_72%,transparent_100%)]">
              <Image
                src="/marca/jj-logo.jpg"
                alt="Espartano dourado de braços cruzados, símbolo da JJ Suplementos"
                width={512}
                height={512}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 520px, 90vw"
                className="aspect-square w-full object-cover"
              />
              {/* reflexo dourado passando pela arte */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1/3 animate-brilho bg-linear-to-r from-transparent via-ouro-claro/40 to-transparent mix-blend-overlay"
              />
            </div>
          </motion.div>

          <motion.div
            style={{ rotate: rotSelo }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.9 }}
            className="absolute bottom-2 left-0 w-28 text-[16px] sm:w-36 sm:text-[20px] lg:-left-6"
          >
            <SeloGiratorio texto="Loja referência • Iguatu • CE • " />
          </motion.div>

          <div className="absolute top-2 -left-2 hidden lg:block xl:-left-14">
            <Anotacao texto="o espartano de Iguatu" seta="baixo" atraso={1.2} className="text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
