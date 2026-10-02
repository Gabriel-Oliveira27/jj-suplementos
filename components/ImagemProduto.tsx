import Image from "next/image";
import type { Produto } from "@/lib/produtos";

type Props = {
  produto: Produto;
  indice?: number;
  sizes: string;
  eager?: boolean;
  compacto?: boolean;
  className?: string;
};

// Foto do produto ou, quando a loja ainda não tem foto publicada, a arte padrão com o espartano.
export function ImagemProduto({ produto, indice = 0, sizes, eager, compacto, className = "" }: Props) {
  const src = produto.imagens[indice] ?? produto.imagens[0];

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-grafite ${className}`}>
        <Image
          src={src}
          alt={`${produto.nome}${produto.marca ? ` – ${produto.marca}` : ""}`}
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-carvao text-center ${className}`}>
      <div aria-hidden className="listras absolute inset-x-0 top-0 h-3 opacity-80" />
      <div aria-hidden className="listras absolute inset-x-0 bottom-0 h-3 opacity-80" />
      <Image
        src="/marca/jj-logo.jpg"
        alt=""
        width={160}
        height={160}
        sizes="160px"
        className="aspect-square w-2/5 max-w-36 rounded-full border-2 border-amarelo object-cover"
      />
      {!compacto && (
        <>
          <p className="mt-4 px-4 font-display text-2xl leading-none uppercase sm:text-3xl">{produto.nome}</p>
          <p className="mt-2 -rotate-3 font-marker text-sm text-amarelo sm:text-base">consulte na loja!</p>
        </>
      )}
    </div>
  );
}
