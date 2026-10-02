const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(valor: number) {
  return moeda.format(valor);
}

// Para busca sem acento e sem diferenciar maiúsculas: "proteina" encontra "Proteína".
export function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
