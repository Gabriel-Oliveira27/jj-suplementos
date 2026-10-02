// Dados públicos da loja, reunidos do Instagram (@jjsuplementosoficialiguatu),
// da página no Facebook e do Linktree (linktr.ee/Jorbson). Ajuste aqui quando algo mudar.

export type Consultor = {
  nome: string;
  whatsapp: string; // só dígitos, com DDI e DDD
  instagram?: string;
};

export const loja = {
  nome: "JJ Suplementos",
  slogan: "Loja referência em suplementação",
  chamada: "Qual é o seu objetivo? Fala aqui",
  cidade: "Iguatu - CE",
  endereco: "Rua Rosemira Guedes dos Santos, 82 - Cajueiro, Iguatu - CE, 63508-470",
  mapa: "https://www.google.com/maps/dir//Rua+Rosemira+Guedes+dos+santos,+Numero+82+-+Cajueiro,+Iguatu+-+CE,+63508-470",
  entrega: "Entregas grátis em Iguatu",
  instagram: {
    usuario: "jjsuplementosoficialiguatu",
    url: "https://www.instagram.com/jjsuplementosoficialiguatu/",
  },
  facebook: "https://www.facebook.com/JJsuplementosoficial",
  consultores: [
    { nome: "Jorbson", whatsapp: "5588981500393", instagram: "jorbsonaraujo" },
    { nome: "Jonathan", whatsapp: "5588981584138", instagram: "jonathan.jair" },
    { nome: "Hiago", whatsapp: "5588998040269" },
  ] satisfies Consultor[],
};

export const consultorPrincipal = loja.consultores[0];

export function linkWhatsApp(numero: string, mensagem: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function formatarTelefone(numero: string) {
  const local = numero.replace(/^55/, "");
  return `(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
}
