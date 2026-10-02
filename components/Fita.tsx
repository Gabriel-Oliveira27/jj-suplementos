type Props = {
  itens: string[];
  cor: "amarelo" | "preto";
  reverso?: boolean;
  className?: string;
};

// Fita corrida preta/amarela, como a lona da tenda da JJ nos eventos.
export function Fita({ itens, cor, reverso, className = "" }: Props) {
  const estilo =
    cor === "amarelo"
      ? "bg-amarelo text-preto border-preto"
      : "bg-preto text-amarelo border-amarelo/60";
  // Conteúdo duplicado: a animação anda 50% e recomeça sem emenda.
  const sequencia = [...itens, ...itens, ...itens, ...itens];

  return (
    <div className={`overflow-hidden border-y-2 ${estilo} ${className}`} aria-hidden>
      <div className={`flex w-max ${reverso ? "animate-correr-reverso" : "animate-correr"}`}>
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0 items-center">
            {sequencia.map((item, i) => (
              <li
                key={`${copia}-${i}`}
                className="flex items-center gap-6 px-6 py-3 font-display text-xl tracking-wide whitespace-nowrap uppercase sm:text-2xl"
              >
                {item}
                <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0" fill="currentColor">
                  <path d="M12 0 15 9 24 12 15 15 12 24 9 15 0 12 9 9z" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
