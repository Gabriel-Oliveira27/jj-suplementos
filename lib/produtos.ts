// Catálogo montado a partir dos produtos que a JJ Suplementos divulgou no Instagram e no Facebook.
// A loja não publica preços (o atendimento é pelo WhatsApp/Direct), por isso `preco` é opcional:
// preencha quando quiser exibir o valor no card.

export type Categoria =
  | "proteinas"
  | "creatina"
  | "energia"
  | "termogenicos"
  | "saude"
  | "snacks"
  | "vestuario";

export type Objetivo = "massa" | "forca" | "energia" | "definicao" | "saude";

export type Produto = {
  id: string;
  nome: string;
  marca?: string;
  tamanho?: string;
  categoria: Categoria;
  objetivos: Objetivo[];
  resumo: string;
  descricao: string;
  destaques?: string[];
  variantes?: { rotulo: string; opcoes: string[] };
  imagens: string[]; // vazio = arte padrão da marca
  preco?: number;
  selo?: string;
};

// "Creatina Monohidratada – 300 g – Oficialnutri", sem repetir a marca quando ela já está no nome.
export function nomeCompleto(produto: Produto) {
  const marca = produto.marca && !produto.nome.includes(produto.marca) ? produto.marca : undefined;
  return [produto.nome, produto.tamanho, marca].filter(Boolean).join(" – ");
}

export const categorias: { id: Categoria; nome: string }[] = [
  { id: "proteinas", nome: "Proteínas" },
  { id: "creatina", nome: "Creatina" },
  { id: "energia", nome: "Energia & Pré-treino" },
  { id: "termogenicos", nome: "Termogênicos" },
  { id: "saude", nome: "Vitaminas & Saúde" },
  { id: "snacks", nome: "Snacks proteicos" },
  { id: "vestuario", nome: "Roupas de treino" },
];

export const objetivos: { id: Objetivo; nome: string; descricao: string }[] = [
  { id: "massa", nome: "Ganho de massa", descricao: "Proteína de qualidade para construir e recuperar músculo." },
  { id: "forca", nome: "Força e performance", descricao: "Mais carga, mais repetições, treino que rende." },
  { id: "energia", nome: "Energia e resistência", descricao: "Disposição do aquecimento até a última série." },
  { id: "definicao", nome: "Definição", descricao: "Apoio ao metabolismo para secar sem perder massa magra." },
  { id: "saude", nome: "Saúde e bem-estar", descricao: "Vitaminas, colágeno e adaptógenos para o dia a dia." },
];

export const produtos: Produto[] = [
  {
    id: "creatina-oficialnutri-300g",
    nome: "Creatina Monohidratada",
    marca: "Oficialnutri",
    tamanho: "300 g",
    categoria: "creatina",
    objetivos: ["forca", "massa"],
    resumo: "O básico que funciona: mais força e explosão em cada série.",
    descricao:
      "Creatina monohidratada da Oficialnutri em pote de 300 g. Ajuda a aumentar a força e o desempenho em exercícios de alta intensidade e é uma das bases de qualquer suplementação para treino.",
    destaques: ["Monohidratada", "Pote de 300 g"],
    imagens: ["/produtos/creatina-oficialnutri-300g.jpg"],
    selo: "Disponível",
  },
  {
    id: "uevo-proteina",
    nome: "Uêvo – A evolução da proteína",
    marca: "Uêvo",
    categoria: "proteinas",
    objetivos: ["massa", "saude"],
    resumo: "Proteína do dia a dia, com sabor que surpreende.",
    descricao:
      "Fonte de proteína de alto valor biológico, ideal para crescimento e recuperação muscular. Mais energia e nutrição para a sua rotina: antes, durante ou depois do treino.",
    destaques: ["Alto valor biológico", "Para qualquer hora do dia"],
    variantes: { rotulo: "Sabor", opcoes: ["Explosão de chocolate", "Baunilha"] },
    imagens: ["/produtos/uevo-proteina.jpg"],
  },
  {
    id: "body-protein-equaliv",
    nome: "Body Protein",
    marca: "Equaliv",
    tamanho: "450 g",
    categoria: "proteinas",
    objetivos: ["massa", "saude"],
    resumo: "100% proteína isolada de peptídeos de colágeno.",
    descricao:
      "Proteína isolada com peptídeos de colágeno BODYBALANCE®, que contribuem para a manutenção da massa muscular. Contém BCAA naturalmente e dissolve fácil.",
    destaques: ["Zero açúcar e carboidrato", "Zero glúten e lactose", "Sem aditivos artificiais"],
    variantes: { rotulo: "Sabor", opcoes: ["Neutro"] },
    imagens: ["/produtos/body-protein-equaliv.jpg"],
  },
  {
    id: "collagen-essential-protein",
    nome: "Collagen Essential Protein",
    marca: "Essential Nutrition",
    categoria: "proteinas",
    objetivos: ["saude", "massa"],
    resumo: "Uma nova forma de suplementar proteína, com colágeno e vitamina C.",
    descricao:
      "Fórmula com os benefícios do BODYBALANCE® (peptídeos de colágeno hidrolisado obtidos por hidrólise enzimática patenteada) em sinergia com a vitamina C. Para quem busca resultados reais associados a um estilo de vida mais ativo.",
    destaques: ["Sem outras fontes proteicas", "Sem glúten e sem lactose", "Com vitamina C"],
    variantes: { rotulo: "Sabor", opcoes: ["Neutro"] },
    imagens: ["/produtos/collagen-essential-protein.jpg"],
  },
  {
    id: "energy-kick-dux",
    nome: "Energy Kick",
    marca: "Dux Nutrition",
    tamanho: "1 kg",
    categoria: "energia",
    objetivos: ["energia"],
    resumo: "Energia contínua e reposição de minerais durante o treino.",
    descricao:
      "Essencial para atletas que querem manter o alto desempenho durante toda a atividade. Repõe de forma contínua a energia e os minerais perdidos no suor, evitando fadiga precoce, câimbras e quedas bruscas de rendimento.",
    destaques: ["Repõe energia e eletrólitos", "Ideal para treinos longos e corrida"],
    imagens: ["/produtos/energy-kick-dux.jpg"],
  },
  {
    id: "pre-treino",
    nome: "Pré-treino",
    marca: "Diversas marcas",
    categoria: "energia",
    objetivos: ["energia", "forca"],
    resumo: "Foco, disposição e pump para treinar no limite.",
    descricao:
      "Temos opções de pré-treino de várias marcas e sabores. Fale com um consultor para encontrar o que combina com o seu treino e a sua tolerância à cafeína. Também fazemos degustação nos eventos!",
    imagens: [],
    selo: "Consulte marcas",
  },
  {
    id: "whey-protein",
    nome: "Whey Protein",
    marca: "Diversas marcas",
    categoria: "proteinas",
    objetivos: ["massa"],
    resumo: "Concentrado, isolado ou hidrolisado: a gente te ajuda a escolher.",
    descricao:
      "Trabalhamos com whey de várias marcas e sabores. Diga o seu objetivo e o seu orçamento que o consultor indica a melhor opção para você.",
    imagens: [],
    selo: "Consulte marcas",
  },
  {
    id: "long-jack-thermo",
    nome: "Long Jack Thermo",
    tamanho: "450 ml",
    categoria: "termogenicos",
    objetivos: ["definicao", "energia"],
    resumo: "Termogênico líquido para acelerar o metabolismo com mais foco.",
    descricao:
      "Suplemento com ingredientes selecionados que atua no metabolismo, favorecendo a termogênese e dando mais disposição ao longo do dia. Auxilia na definição muscular e na redução do percentual de gordura sem comprometer a massa magra, além de melhorar foco e resistência nos treinos.",
    destaques: ["Efeito termogênico", "Mais foco e resistência"],
    imagens: ["/produtos/long-jack-thermo.jpg"],
  },
  {
    id: "growth-multi",
    nome: "Multi – Multivitamínico",
    marca: "Growth Supplements",
    tamanho: "120 cápsulas",
    categoria: "saude",
    objetivos: ["saude"],
    resumo: "Vitaminas e minerais para fechar as lacunas da alimentação.",
    descricao:
      "Suplemento alimentar em cápsulas com vitaminas e minerais para apoiar a saúde e o desempenho de quem treina.",
    destaques: ["120 cápsulas"],
    imagens: ["/produtos/growth-multi.jpg"],
  },
  {
    id: "ashwagandha-overall",
    nome: "Ashwagandha 900 mg",
    marca: "Overall",
    tamanho: "60 cápsulas",
    categoria: "saude",
    objetivos: ["saude", "forca"],
    resumo: "Extrato seco de ginseng indiano para performance e saúde mental.",
    descricao:
      "Ashwagandha (ginseng indiano) em cápsulas de 900 mg, com matéria-prima importada. Um adaptógeno usado para apoiar a alta performance e a saúde mental.",
    destaques: ["900 mg por dose", "Matéria-prima importada"],
    imagens: ["/produtos/ashwagandha-overall.jpg"],
  },
  {
    id: "hey-mu-creme-proteico",
    nome: "Brigadeiro de colher",
    marca: "Hey!Mu",
    tamanho: "250 g",
    categoria: "snacks",
    objetivos: ["massa"],
    resumo: "Doce de colher com proteína para matar a vontade sem sair da dieta.",
    descricao:
      "O brigadeiro de colher da Hey!Mu leva proteína na receita e é perfeito para comer puro, rechear panqueca ou cobrir aquele brownie fit. Pote de 250 g.",
    imagens: ["/produtos/hey-mu-creme-proteico.jpg"],
    selo: "Novidade",
  },
  {
    id: "camiseta-manga-longa-jj",
    nome: "Camiseta Manga Longa JJ Suplementos",
    marca: "JJ Suplementos",
    categoria: "vestuario",
    objetivos: [],
    resumo: "Tecido leve, caimento atlético e o espartano dourado no peito.",
    descricao:
      "Camiseta oficial da JJ Suplementos, com manga longa e estampa dourada do espartano. Ideal para treinar, correr ou usar no dia a dia.",
    variantes: { rotulo: "Cor", opcoes: ["Preta", "Azul-marinho", "Verde militar"] },
    imagens: [
      "/produtos/camiseta-jj-preta.jpg",
      "/produtos/camiseta-jj-azul.jpg",
      "/produtos/camiseta-jj-verde.jpg",
    ],
    selo: "Marca própria",
  },
  {
    id: "meias-de-treino",
    nome: "Meias de treino",
    categoria: "vestuario",
    objetivos: [],
    resumo: "Conforto e firmeza para o pé no treino e na corrida.",
    descricao:
      "Meias próprias para treino, em vários modelos e cores. Consulte os modelos disponíveis na loja.",
    imagens: [],
  },
];
