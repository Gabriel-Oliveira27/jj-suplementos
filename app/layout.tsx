import type { Metadata, Viewport } from "next";
import { Anton, Barlow, Barlow_Condensed, Permanent_Marker } from "next/font/google";
import { Movimento } from "@/components/anim/Movimento";
import "./globals.css";

// Anton: títulos de pôster esportivo. Barlow Condensed: rótulos e botões.
// Barlow: texto corrido. Permanent Marker: anotações "escritas à mão" pelo time.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  // Defina NEXT_PUBLIC_SITE_URL com o domínio final para as prévias de link (WhatsApp, Instagram) saírem certas.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3010"),
  title: "JJ Suplementos | Catálogo de suplementos em Iguatu - CE",
  description:
    "Loja referência em suplementação em Iguatu - CE. Proteínas, creatina, pré-treino, termogênicos, vitaminas e roupas de treino. Peça pelo WhatsApp.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${barlow.variable} ${barlowCondensed.variable} ${marker.variable} h-full antialiased`}
    >
      <body className="granulado min-h-full flex flex-col font-sans">
        <Movimento>{children}</Movimento>
      </body>
    </html>
  );
}
