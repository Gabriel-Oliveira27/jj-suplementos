import type { CSSProperties } from "react";
import Image from "next/image";
import { Anotacao } from "./anim/Anotacao";
import { Revelar } from "./anim/Revelar";
import { TituloAnimado } from "./anim/TituloAnimado";
import { Fita } from "./Fita";
import {
  IconeEntrega,
  IconeFacebook,
  IconeInstagram,
  IconeLocal,
  IconeSeta,
  IconeWhatsApp,
} from "./icones";
import { consultorPrincipal, formatarTelefone, linkWhatsApp, loja } from "@/lib/loja";
import { produtos } from "@/lib/produtos";

const saudacao = "Olá! Gostaria de saber mais sobre os suplementos";

const marcas = Array.from(
  new Set(produtos.map((p) => p.marca).filter((m): m is string => !!m && m !== "Diversas marcas" && m !== loja.nome)),
);

// Duas fitas cruzadas logo abaixo do hero, nas cores da tenda.
export function Fitas() {
  return (
    <div className="relative h-36 overflow-hidden sm:h-40" aria-hidden>
      <Fita
        cor="preto"
        itens={marcas}
        reverso
        className="absolute top-1/2 -left-[5%] w-[110%] -translate-y-1/2 rotate-[2.5deg]"
      />
      <Fita
        cor="amarelo"
        itens={["Qual é o seu objetivo?", "Chama no direct", loja.entrega, "Loja referência em suplementação"]}
        className="absolute top-1/2 -left-[5%] w-[110%] -translate-y-1/2 -rotate-[2.5deg] shadow-[0_10px_30px_rgba(0,0,0,.6)]"
      />
    </div>
  );
}

export function ComoFunciona() {
  const passos = [
    { titulo: "Escolhe aqui", texto: "Monta a lista com sabor e quantidade direto no catálogo." },
    { titulo: "Chama no zap", texto: "A lista chega pronta pro consultor, que confirma valor e estoque." },
    { titulo: "Recebe em casa", texto: `${loja.entrega}. Ou passa na loja e leva na hora.` },
  ];

  return (
    <section className="relative mt-28 bg-amarelo text-preto lg:mt-36">
      <div aria-hidden className="h-4 [background-image:repeating-linear-gradient(-45deg,var(--color-preto)_0_14px,transparent_14px_28px)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_2fr] lg:py-24">
        <div className="relative">
          <TituloAnimado className="text-[clamp(3rem,7vw,5.5rem)]" linhas={["Como", "funciona"]} />
          <Anotacao
            texto="sem cadastro, sem enrolação"
            seta="nenhuma"
            cor="text-preto"
            className="mt-4 text-xl"
          />
        </div>
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6">
          {passos.map((p, i) => (
            <li key={p.titulo}>
              <Revelar atraso={i * 0.12}>
                <span className="block font-display text-8xl leading-none texto-contorno [-webkit-text-stroke-width:2px]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-3xl uppercase">{p.titulo}</h3>
                <p className="mt-2 font-medium text-preto/75">{p.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
      <div aria-hidden className="h-4 [background-image:repeating-linear-gradient(-45deg,var(--color-preto)_0_14px,transparent_14px_28px)]" />
    </section>
  );
}

export function Time() {
  return (
    <section id="consultores" className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <Revelar rotacao={-3} className="relative mx-auto w-full max-w-md">
          <div className="relative bg-osso p-3 pb-14 shadow-[0_30px_60px_rgba(0,0,0,.6)]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/comunidade/equipe-evento.jpg"
                alt="Três integrantes do time da JJ Suplementos com a camiseta da loja em frente à tenda preta e amarela"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="absolute right-0 bottom-3 left-0 text-center font-marker text-2xl text-preto">o time JJ 💪</p>
          </div>
          <span aria-hidden className="absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 rotate-2 bg-amarelo/80" />
        </Revelar>

        <div>
          <TituloAnimado
            className="text-[clamp(2.8rem,6.5vw,5.2rem)]"
            linhas={["Fala com", { texto: "quem entende", className: "text-amarelo" }]}
          />
          <p className="mt-5 max-w-lg text-lg text-osso/75">
            Diz o teu objetivo e o teu orçamento que a gente monta a suplementação certa. Atendimento no Direct e no
            WhatsApp.
          </p>
          <ul className="mt-10 border-t border-linha">
            {loja.consultores.map((c, i) => (
              <li key={c.nome}>
                <Revelar atraso={i * 0.1} y={20}>
                  <a
                    href={linkWhatsApp(c.whatsapp, `Olá, ${c.nome}! Gostaria de saber mais sobre os suplementos`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-5 overflow-hidden border-b border-linha py-5"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 bg-amarelo transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-y-100"
                    />
                    <span className="relative pl-1 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none uppercase transition-colors group-hover:pl-4 group-hover:text-preto">
                      {c.nome}
                    </span>
                    <span className="relative ml-auto text-right font-cond text-base tracking-wide text-cinza transition-colors group-hover:text-preto">
                      {formatarTelefone(c.whatsapp)}
                      {c.instagram && <span className="block text-sm">@{c.instagram}</span>}
                    </span>
                    <span className="relative mr-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-preto transition-transform duration-500 group-hover:mr-4 group-hover:rotate-[360deg]">
                      <IconeWhatsApp width={22} height={22} />
                    </span>
                  </a>
                </Revelar>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Eventos() {
  const fotos = [
    {
      src: "/comunidade/corrida-educacao-fisica.jpg",
      alt: "Cartaz da 1ª Run da Educação Física em 12 de maio, no Colégio Polos, com degustação da JJ Suplementos",
      legenda: "1ª run da Ed. Física",
      rotacao: -5,
      deslocamento: "lg:mt-10",
    },
    {
      src: "/comunidade/degustacao.jpg",
      alt: "Pessoas experimentando suplementos na mesa de degustação da JJ Suplementos",
      legenda: "provou, aprovou!",
      rotacao: 3,
      deslocamento: "",
    },
    {
      src: "/comunidade/treinao-sao-pedro.jpg",
      alt: "Cartaz do 1º Treinão comemorativo de 10 anos da Paróquia São Pedro Apóstolo com degustação da JJ Suplementos",
      legenda: "treinão São Pedro",
      rotacao: -2,
      deslocamento: "lg:mt-20",
    },
  ];

  return (
    <section id="eventos" className="relative mt-28 overflow-hidden lg:mt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TituloAnimado
            className="text-[clamp(2.8rem,7vw,5.6rem)]"
            linhas={["Onde tem treino,", { texto: "tem JJ", className: "text-amarelo" }]}
          />
          <p className="max-w-sm text-osso/75">
            Corrida, treinão e evento de Educação Física em Iguatu: a gente leva a tenda, o time e a degustação pra
            você provar antes de comprar.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-10 px-6 sm:grid-cols-3 sm:gap-6 sm:px-0 lg:gap-12">
          {fotos.map((f, i) => (
            <li key={f.legenda} className={f.deslocamento}>
              <Revelar rotacao={f.rotacao} atraso={i * 0.12} y={80}>
                <figure className="group relative bg-osso p-2.5 pb-12 shadow-[0_25px_50px_rgba(0,0,0,.55)] transition-transform duration-500 hover:z-10 hover:scale-105 hover:-rotate-[var(--r)]" style={{ "--r": `${f.rotacao}deg` } as CSSProperties}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 30vw, 85vw" className="object-cover" />
                  </div>
                  <figcaption className="absolute right-0 bottom-3 left-0 text-center font-marker text-xl text-preto">
                    {f.legenda}
                  </figcaption>
                  <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-amarelo/75" />
                </figure>
              </Revelar>
            </li>
          ))}
        </ul>

        <a
          href={loja.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-14 inline-flex items-center gap-3 font-cond text-lg font-semibold tracking-wider text-amarelo uppercase"
        >
          <IconeInstagram /> Agenda dos próximos eventos no @{loja.instagram.usuario}
          <IconeSeta width={18} height={18} className="transition-transform group-hover:translate-x-1.5" />
        </a>
      </div>
    </section>
  );
}

export function ChamaNoZap() {
  return (
    <section id="loja" className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:pt-36">
      <a
        href={linkWhatsApp(consultorPrincipal.whatsapp, saudacao)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block"
        aria-label="Chama no zap: falar com a JJ Suplementos no WhatsApp"
      >
        <Revelar>
          <span className="relative block font-display text-[clamp(4.2rem,15.5vw,14rem)] leading-[0.85] uppercase">
            <span className="block text-amarelo texto-contorno [-webkit-text-stroke-width:2px]">Chama</span>
            <span className="block text-amarelo texto-contorno [-webkit-text-stroke-width:2px]">no zap</span>
            {/* preenchimento que sobe no hover */}
            <span
              aria-hidden
              className="absolute inset-0 text-amarelo transition-[clip-path] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
            >
              <span className="block">Chama</span>
              <span className="block">no zap</span>
            </span>
          </span>
        </Revelar>
        <span className="absolute top-1/2 right-0 hidden size-28 -translate-y-1/2 items-center justify-center rounded-full bg-whatsapp text-preto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 md:flex lg:size-36">
          <IconeWhatsApp width={56} height={56} />
        </span>
      </a>

      <div className="mt-14 grid gap-8 border-t border-linha pt-10 md:grid-cols-3">
        <Revelar y={20}>
          <p className="flex items-center gap-2 font-cond text-sm font-bold tracking-[0.2em] text-amarelo uppercase">
            <IconeLocal width={16} height={16} /> A loja
          </p>
          <p className="mt-3 text-lg">{loja.endereco}</p>
          <a
            href={loja.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex items-center gap-1.5 font-cond font-semibold tracking-wider text-osso uppercase underline decoration-amarelo decoration-2 underline-offset-4"
          >
            Como chegar <IconeSeta width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Revelar>
        <Revelar y={20} atraso={0.1}>
          <p className="flex items-center gap-2 font-cond text-sm font-bold tracking-[0.2em] text-amarelo uppercase">
            <IconeEntrega width={16} height={16} /> Entrega
          </p>
          <p className="mt-3 text-lg">{loja.entrega}.</p>
          <p className="text-osso/60">Pede pelo zap e recebe em casa.</p>
        </Revelar>
        <Revelar y={20} atraso={0.2}>
          <p className="flex items-center gap-2 font-cond text-sm font-bold tracking-[0.2em] text-amarelo uppercase">
            <IconeInstagram width={16} height={16} /> Segue a gente
          </p>
          <div className="mt-3 flex flex-col items-start gap-2 text-lg">
            <a href={loja.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amarelo">
              <IconeInstagram width={18} height={18} /> @{loja.instagram.usuario}
            </a>
            <a href={loja.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amarelo">
              <IconeFacebook width={18} height={18} /> /JJsuplementosoficial
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-linha bg-carvao">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 pt-8 pb-4 text-xs text-cinza sm:px-6 md:flex-row md:justify-between md:pr-28">
        <p>
          © {ano} {loja.nome} · {loja.slogan} · {loja.cidade}
        </p>
        <p>Suplementos não substituem uma alimentação equilibrada. Procure orientação de um nutricionista.</p>
      </div>
      <p
        aria-hidden
        className="-mb-[2.8vw] text-center font-display text-[15vw] leading-none whitespace-nowrap text-amarelo uppercase select-none"
      >
        JJ Suplementos
      </p>
    </footer>
  );
}

export function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(consultorPrincipal.whatsapp, saudacao)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar a JJ Suplementos no WhatsApp"
      className="fixed right-4 bottom-4 z-30 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden className="absolute inset-0 animate-pulso rounded-full bg-whatsapp" />
      <IconeWhatsApp width={30} height={30} className="relative" />
    </a>
  );
}
