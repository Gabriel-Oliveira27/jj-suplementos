import { Cabecalho } from "@/components/Cabecalho";
import { Catalogo } from "@/components/Catalogo";
import { Hero } from "@/components/Hero";
import { PedidoDrawer } from "@/components/PedidoDrawer";
import { ChamaNoZap, ComoFunciona, Eventos, Fitas, Rodape, Time, WhatsAppFlutuante } from "@/components/Secoes";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <main className="flex-1">
        <Hero />
        <Fitas />
        <Catalogo />
        <ComoFunciona />
        <Time />
        <Eventos />
        <ChamaNoZap />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <PedidoDrawer />
    </>
  );
}
