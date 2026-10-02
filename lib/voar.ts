// Animação de "produto voando até a sacola" ao adicionar ao pedido. Só visual: usa a Web Animations API.

export const ID_BOTAO_PEDIDO = "botao-pedido";

export function voarParaPedido(origem: HTMLElement, imagem?: string) {
  const alvo = document.getElementById(ID_BOTAO_PEDIDO);
  if (!alvo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sacudir(alvo);
    return;
  }

  const de = origem.getBoundingClientRect();
  const para = alvo.getBoundingClientRect();
  const tamanho = 64;

  const bolinha = document.createElement("div");
  Object.assign(bolinha.style, {
    position: "fixed",
    left: `${de.left + de.width / 2 - tamanho / 2}px`,
    top: `${de.top + de.height / 2 - tamanho / 2}px`,
    width: `${tamanho}px`,
    height: `${tamanho}px`,
    borderRadius: "9999px",
    border: "3px solid #f4b81c",
    background: imagem ? `#1a1a1a url("${imagem}") center/cover` : "#f4b81c",
    zIndex: "70",
    pointerEvents: "none",
    boxShadow: "0 10px 30px rgba(0,0,0,.5)",
  });
  document.body.appendChild(bolinha);

  const dx = para.left + para.width / 2 - (de.left + de.width / 2);
  const dy = para.top + para.height / 2 - (de.top + de.height / 2);

  const voo = bolinha.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy - 120}px) scale(0.8) rotate(-20deg)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2) rotate(-40deg)`, opacity: 0.4 },
    ],
    { duration: 750, easing: "cubic-bezier(.5,0,.6,1)" },
  );
  voo.onfinish = () => {
    bolinha.remove();
    sacudir(alvo);
  };
}

function sacudir(el: HTMLElement | null) {
  el?.animate(
    [
      { transform: "scale(1) rotate(0)" },
      { transform: "scale(1.18) rotate(-8deg)" },
      { transform: "scale(1.1) rotate(6deg)" },
      { transform: "scale(1) rotate(0)" },
    ],
    { duration: 450, easing: "ease-out" },
  );
}
