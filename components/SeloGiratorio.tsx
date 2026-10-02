type Props = {
  texto: string;
  className?: string;
};

// Selo redondo com texto girando — carimbo da loja.
export function SeloGiratorio({ texto, className = "" }: Props) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-girar">
        <defs>
          <path id="circulo-selo" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="99" className="fill-amarelo" />
        <text className="fill-preto font-cond text-[19px] font-bold tracking-[0.18em] uppercase">
          <textPath href="#circulo-selo">{texto}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[2.6em] leading-none text-preto">
        JJ
      </span>
    </div>
  );
}
