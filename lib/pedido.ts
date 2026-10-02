import { useSyncExternalStore } from "react";
import { produtos } from "./produtos";

// Lista de interesse do cliente ("Meu pedido"). Fica salva no navegador e vira uma
// mensagem de WhatsApp para o consultor — a loja fecha a venda pelo WhatsApp.

export type ItemPedido = {
  id: string;
  variante?: string;
  quantidade: number;
};

const CHAVE = "jj-suplementos:pedido";
const VAZIO: ItemPedido[] = [];
const idsValidos = new Set(produtos.map((p) => p.id));
const ouvintes = new Set<() => void>();

let itens: ItemPedido[] | null = null;
let gavetaAberta = false;

function avisar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

function aoMudarEmOutraAba(e: StorageEvent) {
  if (e.key === CHAVE) {
    itens = null;
    avisar();
  }
}

function assinar(ouvinte: () => void) {
  if (ouvintes.size === 0) window.addEventListener("storage", aoMudarEmOutraAba);
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) window.removeEventListener("storage", aoMudarEmOutraAba);
  };
}

function lerItens(): ItemPedido[] {
  if (itens) return itens;
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    itens = Array.isArray(salvo)
      ? salvo.filter(
          (i): i is ItemPedido =>
            idsValidos.has(i?.id) && Number.isInteger(i?.quantidade) && i.quantidade > 0,
        )
      : [];
  } catch {
    itens = [];
  }
  return itens;
}

function gravar(novos: ItemPedido[]) {
  itens = novos;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(novos));
  } catch {
    // Sem armazenamento (aba anônima, bloqueado): a lista continua valendo só nesta visita.
  }
  avisar();
}

const mesmoItem = (a: ItemPedido, id: string, variante?: string) =>
  a.id === id && (a.variante ?? "") === (variante ?? "");

export function adicionarAoPedido(id: string, variante?: string, quantidade = 1) {
  const atuais = lerItens();
  const existente = atuais.find((i) => mesmoItem(i, id, variante));
  gravar(
    existente
      ? atuais.map((i) => (i === existente ? { ...i, quantidade: i.quantidade + quantidade } : i))
      : [...atuais, { id, variante, quantidade }],
  );
}

export function alterarQuantidade(id: string, variante: string | undefined, delta: number) {
  gravar(
    lerItens()
      .map((i) => (mesmoItem(i, id, variante) ? { ...i, quantidade: i.quantidade + delta } : i))
      .filter((i) => i.quantidade > 0),
  );
}

export function removerDoPedido(id: string, variante?: string) {
  gravar(lerItens().filter((i) => !mesmoItem(i, id, variante)));
}

export function limparPedido() {
  gravar([]);
}

export function usePedido() {
  return useSyncExternalStore(assinar, lerItens, () => VAZIO);
}

export function abrirPedido() {
  gavetaAberta = true;
  avisar();
}

export function fecharPedido() {
  gavetaAberta = false;
  avisar();
}

export function usePedidoAberto() {
  return useSyncExternalStore(
    assinar,
    () => gavetaAberta,
    () => false,
  );
}
