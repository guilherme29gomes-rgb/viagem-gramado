// Dados da viagem. Edite à vontade: o app lê tudo daqui.
// "foto" é o termo de busca usado para carregar fotos do Wikimedia Commons.
// "mapa" é o termo de busca do Google Maps.

const VIAGEM = {
  titulo: "Gramado 2026",
  inicio: "2026-11-07T08:05:00-03:00",
  hotel: "Wish Serrano Resort & Convention, Gramado",
};

const LOCAIS = {
  poa: { tipo: "aviao", nome: "Aeroporto Salgado Filho", foto: "Aeroporto Internacional Salgado Filho", mapa: "Aeroporto Internacional Salgado Filho Porto Alegre", emoji: "✈️" },
  estrada: { tipo: "carro", nome: "Estrada BR-116 / RS-115", foto: "RS-115 Gramado", mapa: "RS-115 Gramado", emoji: "🚗" },
  wish: { tipo: "hotel", nome: "Wish Serrano", foto: "Wish Serrano Gramado", mapa: "Wish Serrano Resort Gramado", emoji: "🏨" },
  centro: { tipo: "pin", nome: "Centro de Gramado", foto: "Avenida Borges de Medeiros Gramado", mapa: "Centro Gramado RS", emoji: "🏘️" },
  parada: { tipo: "estrela", nome: "Parada de Natal – Natal Luz", foto: "Natal Luz Gramado", mapa: "Avenida Borges de Medeiros Gramado", emoji: "🎄" },
  etnias: { tipo: "presente", nome: "Praça das Etnias – Vila de Natal", foto: "Praça das Etnias Gramado", mapa: "Praça das Etnias Gramado", emoji: "🎅" },
  ruacoberta: { tipo: "estrela", nome: "Rua Coberta", foto: "Rua Coberta Gramado", mapa: "Rua Coberta Gramado", emoji: "🎭" },
  galeto: { tipo: "garfo", nome: "Galeto Itália", foto: null, mapa: "Galeto Itália Gramado", emoji: "🍗" },
  bondinhos: { tipo: "bondinho", nome: "Parque Bondinhos Aéreos – Cascata do Caracol", foto: "Cascata do Caracol", mapa: "Parque Bondinhos Aéreos Canela", emoji: "🚡" },
  skyglass: { tipo: "montanha", nome: "Skyglass Canela", foto: "Skyglass Canela", mapa: "Skyglass Canela", emoji: "🪟" },
  garfo: { tipo: "garfo", nome: "Garfo e Bombacha", foto: null, mapa: "Garfo e Bombacha Canela", emoji: "🥩" },
  lagonegro: { tipo: "lago", nome: "Lago Negro", foto: "Lago Negro Gramado", mapa: "Lago Negro Gramado", emoji: "🦢" },
  prawer: { tipo: "presente", nome: "Fábrica de Chocolate Prawer", foto: "Prawer chocolate Gramado", mapa: "Chocolate Prawer Av. das Hortênsias 4100 Gramado", emoji: "🍫" },
  fornos: { tipo: "cafe", nome: "Fornos de Gramado", foto: null, mapa: "Fornos de Gramado Borges de Medeiros", emoji: "🥖" },
  palacio: { tipo: "estrela", nome: "Palácio dos Festivais", foto: "Palácio dos Festivais Gramado", mapa: "Palácio dos Festivais Gramado", emoji: "✨" },
  acquamotion: { tipo: "onda", nome: "Acquamotion", foto: "Acquamotion Gramado", mapa: "Acquamotion Gramado", emoji: "♨️" },
  hector: { tipo: "garfo", nome: "Hector Pizzaria", foto: null, mapa: "Hector Pizzaria Borges de Medeiros 1791 Gramado", emoji: "🍕" },
  minimundo: { tipo: "castelo", nome: "Mini Mundo", foto: "Minimundo Gramado", mapa: "Mini Mundo Gramado", emoji: "🏰" },
  aldeia: { tipo: "arvore", nome: "Aldeia do Papai Noel", foto: "Aldeia do Papai Noel Gramado", mapa: "Aldeia do Papai Noel Gramado", emoji: "🎁" },
  belavista: { tipo: "cafe", nome: "Café Colonial Bela Vista", foto: null, mapa: "Café Colonial Bela Vista Gramado", emoji: "☕" },
};

const ROTEIRO = [
  {
    data: "2026-11-07", titulo: "Sábado 07/11", subtitulo: "Chegada e Parada de Natal", capa: "parada",
    itens: [
      { hora: "08h05", texto: "Decolagem", local: "poa" },
      { hora: "09h45", texto: "Pouso em Porto Alegre", local: "poa" },
      { hora: "09h45–11h00", texto: "Desembarque, bagagem e deslocamento até a locadora. Monte a cadeirinha ali mesmo, com calma, antes de pegar a estrada" },
      { hora: "11h00", texto: "Retirada do carro" },
      { hora: "11h00–12h40", texto: "Estrada até Gramado, cerca de 130 km pela BR-116 e RS-115", local: "estrada" },
      { hora: "12h40", texto: "Chegada ao Wish Serrano. O check-in padrão é às 15h: se o quarto não estiver pronto, deixe as malas na recepção e sigam para o almoço. Confirme também a diária do estacionamento, que é cobrada à parte", local: "wish" },
      { hora: "13h00", texto: "Almoço leve no centro, a pé", local: "centro" },
      { hora: "15h00", texto: "Parada de Natal na Av. Borges de Medeiros. Gratuita, sextas, sábados e domingos", local: "parada" },
      { hora: "16h30", texto: "Vila de Natal na Praça das Etnias e Casa do Papai Noel, aberta das 9h às 21h", local: "etnias" },
      { hora: "17h00", texto: "Apresentação no Palco Rua Coberta", local: "ruacoberta" },
      { hora: "19h00", texto: "Jantar no Galeto Itália", local: "galeto" },
    ],
  },
  {
    data: "2026-11-08", titulo: "Domingo 08/11", subtitulo: "Canela", capa: "bondinhos",
    itens: [
      { hora: "08h15", texto: "Saída do hotel de carro, cerca de 30 min" },
      { hora: "09h00", texto: "Parque Bondinhos, na abertura. Vista da Cascata do Caracol sem escada, cabine fechada e cabe o carrinho", local: "bondinhos" },
      { hora: "11h00", texto: "Skyglass Canela, 10 min dali. Leve o canguru: a passarela de vidro é no colo", local: "skyglass" },
      { hora: "12h45", texto: "Almoço no Garfo e Bombacha, churrasco com show folclórico, na mesma estrada", local: "garfo" },
      { hora: "15h00", texto: "Volta ao hotel. Tarde e noite de descanso", local: "wish" },
    ],
  },
  {
    data: "2026-11-09", titulo: "Segunda 09/11", subtitulo: "Dia leve", capa: "lagonegro",
    itens: [
      { hora: "09h30", texto: "Lago Negro com pedalinho de cisne. Entrada gratuita, 6 min do hotel", local: "lagonegro" },
      { hora: "11h00", texto: "Fábrica Prawer, Av. das Hortênsias 4100. Tour guiado de 30 min com degustação, só de segunda a sexta", local: "prawer" },
      { hora: "12h00", texto: "Fornos de Gramado, na Borges de Medeiros. Cucas e pães, fecha às 18h, só dinheiro", local: "fornos" },
      { hora: "13h00", texto: "Almoço e soneca no hotel", local: "wish" },
      { hora: "17h00", texto: "Centro a pé: Rua Coberta e Vila de Natal", local: "ruacoberta" },
      { hora: "19h00", texto: "Jantar leve" },
      { hora: "20h00", texto: "Opcional: show de acendimento das luzes em frente ao Palácio dos Festivais, gratuito e diário", local: "palacio" },
    ],
  },
  {
    data: "2026-11-10", titulo: "Terça 10/11", subtitulo: "Acquamotion", capa: "acquamotion",
    itens: [
      { hora: "10h00", texto: "Acquamotion na abertura, 15 min do hotel. Águas termais a cerca de 36°C e área exclusiva de 1 a 5 anos. Ele entra de graça, só com documento", local: "acquamotion" },
      { hora: "12h30", texto: "Almoço dentro do parque", local: "acquamotion" },
      { hora: "15h30", texto: "Saída e descanso", local: "wish" },
      { hora: "18h00", texto: "Hector Pizzaria, Borges de Medeiros 1791. Abre 18h, cheguem na abertura e reserve mesa pelo site. Sentem perto da saída: os mágicos circulam pelas mesas", local: "hector" },
    ],
  },
  {
    data: "2026-11-11", titulo: "Quarta 11/11", subtitulo: "Último dia", capa: "minimundo",
    itens: [
      { hora: "09h00", texto: "Mini Mundo, na abertura, 5 min do hotel", local: "minimundo" },
      { hora: "11h30", texto: "Almoço leve" },
      { hora: "12h30", texto: "Soneca", local: "wish" },
      { hora: "14h00", texto: "Aldeia do Papai Noel, Borges de Medeiros 2300, fecha às 18h", local: "aldeia" },
      { hora: "17h00", texto: "Café Colonial Bela Vista. Substitui o jantar. Reserve e pague online", local: "belavista" },
      { hora: "19h30", texto: "Volta ao hotel e malas prontas", local: "wish" },
    ],
  },
  {
    data: "2026-11-12", titulo: "Quinta 12/11", subtitulo: "Retorno", capa: "poa",
    itens: [
      { hora: "07h30", texto: "Café da manhã no hotel", local: "wish" },
      { hora: "09h30", texto: "Check-out e saída de Gramado", local: "estrada" },
      { hora: "11h40", texto: "Chegada a Porto Alegre, com folga" },
      { hora: "12h00", texto: "Devolução do carro" },
      { hora: "12h30", texto: "Check-in no aeroporto", local: "poa" },
      { hora: "14h00", texto: "Decolagem", local: "poa" },
    ],
  },
];

// Pendências: marque no app conforme for resolvendo (fica salvo no celular).
const PENDENCIAS = [
  { grupo: "Antes de viajar", itens: [
    { id: "voo-checkin", texto: "Fazer check-in online do voo de ida (abre ~48h antes)" },
    { id: "locadora", texto: "Confirmar reserva do carro, horário de retirada (11h) e devolução (12h do dia 12)" },
    { id: "cadeirinha", texto: "Decidir: levar a própria cadeirinha ou alugar na locadora" },
    { id: "doc-crianca", texto: "Separar documento da criança (RG ou certidão) — exigido no voo e no Acquamotion" },
    { id: "cnh", texto: "CNH válida e cartão de crédito no nome do motorista (caução da locadora)" },
    { id: "dinheiro", texto: "Sacar dinheiro em espécie (Fornos de Gramado só aceita dinheiro)" },
    { id: "natal-luz", texto: "Conferir no site do Natal Luz a programação de 2026 (datas da Parada e shows)" },
    { id: "clima", texto: "Ver previsão do tempo: novembro na serra varia de ~10°C a 25°C, com chuva" },
  ]},
  { grupo: "Hotel — Wish Serrano", itens: [
    { id: "early-checkin", texto: "Pedir early check-in para 12h40 do sábado" },
    { id: "estacionamento", texto: "Confirmar valor da diária do estacionamento (cobrada à parte)" },
    { id: "berco", texto: "Solicitar berço no quarto" },
    { id: "cafe-hotel", texto: "Confirmar se o café da manhã está incluso e horário (dia 12 às 7h30)" },
  ]},
  { grupo: "Reservas de restaurante", itens: [
    { id: "res-galeto", texto: "Reservar Galeto Itália — sábado 07/11, 19h" },
    { id: "res-garfo", texto: "Reservar Garfo e Bombacha — domingo 08/11, 12h45" },
    { id: "res-hector", texto: "Reservar mesa no Hector Pizzaria pelo site — terça 10/11, 18h" },
    { id: "res-belavista", texto: "Reservar e pagar Café Colonial Bela Vista online — quarta 11/11, 17h" },
  ]},
  { grupo: "Volta", itens: [
    { id: "voo-volta", texto: "Fazer check-in online do voo de volta" },
    { id: "tanque", texto: "Abastecer o carro antes de devolver (conferir política da locadora)" },
    { id: "malas", texto: "Malas prontas na noite de quarta" },
  ]},
];

// Ingressos que dá para comprar antecipado.
// Preços mudam: confira sempre no site oficial antes de comprar.
const INGRESSOS = [
  { id: "ing-bondinhos", local: "bondinhos", dia: "Dom 08/11 · 9h", status: "Comprar", dica: "Compre online para o horário de abertura. Confira a regra de gratuidade por idade.", busca: "Parque Bondinhos Aéreos Canela ingresso site oficial" },
  { id: "ing-skyglass", local: "skyglass", dia: "Dom 08/11 · 11h", status: "Comprar", dica: "Há combos com outras atrações de Canela — compare com o ingresso avulso.", busca: "Skyglass Canela ingresso site oficial" },
  { id: "ing-prawer", local: "prawer", dia: "Seg 09/11 · 11h", status: "Agendar", dica: "Tour só de segunda a sexta. Verifique se é preciso agendar horário.", busca: "Prawer chocolates tour fábrica Gramado agendamento" },
  { id: "ing-acquamotion", local: "acquamotion", dia: "Ter 10/11 · 10h", status: "Comprar", dica: "Online costuma sair mais barato que na bilheteria. Criança pequena entra grátis com documento.", busca: "Acquamotion Gramado ingresso site oficial" },
  { id: "ing-minimundo", local: "minimundo", dia: "Qua 11/11 · 9h", status: "Comprar", dica: "Compra antecipada evita fila na abertura.", busca: "Mini Mundo Gramado ingresso site oficial" },
  { id: "ing-aldeia", local: "aldeia", dia: "Qua 11/11 · 14h", status: "Comprar", dica: "Fecha às 18h. Veja se há gratuidade para crianças pequenas.", busca: "Aldeia do Papai Noel Gramado ingresso site oficial" },
  { id: "ing-belavista", local: "belavista", dia: "Qua 11/11 · 17h", status: "Reservar e pagar", dica: "Pagamento online antecipado.", busca: "Café Colonial Bela Vista Gramado reserva" },
  { id: "ing-natalluz", local: "parada", dia: "Opcional", status: "Shows pagos", dica: "Além da Parada gratuita, o Natal Luz tem espetáculos pagos (ex.: Grande Desfile, shows no Lago Joaquina Rita Bier). Ingressos esgotam cedo.", busca: "Natal Luz Gramado 2026 ingressos espetáculos" },
];

// Lugares fora do roteiro que dá para encaixar.
const EXTRAS = [
  { id: "x-snowland", tipo: "neve", nome: "Snowland", foto: "Snowland Gramado", mapa: "Snowland Gramado", emoji: "⛄", cidade: "Gramado", kids: true, dica: "Parque de neve indoor. Tem área infantil com neve para os pequenos. Encaixa bem num fim de tarde." },
  { id: "x-ruatorta", tipo: "flor", nome: "Rua Torta", foto: "Rua Torta Gramado", mapa: "Rua Torta Gramado", emoji: "🌸", cidade: "Gramado", kids: true, dica: "Rua cheia de flores e curvas, foto rápida e grátis. Fica pertinho do centro." },
  { id: "x-joaquina", tipo: "lago", nome: "Lago Joaquina Rita Bier", foto: "Lago Joaquina Rita Bier", mapa: "Lago Joaquina Rita Bier Gramado", emoji: "🌊", cidade: "Gramado", kids: true, dica: "Palco do espetáculo aquático do Natal Luz. Passeio grátis de dia." },
  { id: "x-matriz", tipo: "igreja", nome: "Igreja Matriz São Pedro", foto: "Igreja Matriz São Pedro Gramado", mapa: "Igreja Matriz São Pedro Gramado", emoji: "⛪", cidade: "Gramado", kids: true, dica: "Em frente à Praça Major Nicoletti, no centro — dá para ver no passeio a pé." },
  { id: "x-catedral", tipo: "igreja", nome: "Catedral de Pedra", foto: "Catedral de Pedra Canela", mapa: "Catedral de Pedra Canela", emoji: "⛪", cidade: "Canela", kids: true, dica: "Cartão-postal de Canela. Encaixa no domingo, na volta do Garfo e Bombacha." },
  { id: "x-terramagica", tipo: "castelo", nome: "Terra Mágica Florybal", foto: "Terra Mágica Florybal", mapa: "Parque Terra Mágica Florybal Canela", emoji: "🧚", cidade: "Canela", kids: true, dica: "Parque temático com bichos, duendes e dinossauros, ótimo para crianças pequenas." },
  { id: "x-mundovapor", tipo: "trem", nome: "Mundo a Vapor", foto: "Mundo a Vapor Canela", mapa: "Mundo a Vapor Canela", emoji: "🚂", cidade: "Canela", kids: true, dica: "Miniaturas de máquinas a vapor e a famosa cena do trem que atravessa a parede." },
  { id: "x-alpen", tipo: "montanha", nome: "Alpen Park", foto: "Alpen Park Canela", mapa: "Alpen Park Canela", emoji: "🎢", cidade: "Canela", kids: false, dica: "Montanha-russa alpina e atrações radicais. Algumas têm restrição de altura/idade." },
  { id: "x-gramadozoo", tipo: "arvore", nome: "GramadoZoo", foto: "Gramado Zoo", mapa: "GramadoZoo Gramado", emoji: "🦉", cidade: "Gramado", kids: true, dica: "Zoológico com fauna da região, caminhada leve. Bom para uma manhã." },
  { id: "x-dreamland", tipo: "museu", nome: "Dreamland – Museu de Cera", foto: "Museu de Cera Dreamland Gramado", mapa: "Dreamland Museu de Cera Gramado", emoji: "🗽", cidade: "Gramado", kids: true, dica: "Atração coberta — boa opção para dia de chuva. Tem combos com outros museus do grupo." },
  { id: "x-supercarros", tipo: "carro", nome: "Super Carros / Hollywood Dream Cars", foto: "Hollywood Dream Cars Gramado", mapa: "Hollywood Dream Cars Gramado", emoji: "🚘", cidade: "Gramado", kids: true, dica: "Carros de filme e clássicos. Coberto, rápido de visitar." },
  { id: "x-lavanda", tipo: "flor", nome: "Le Jardin Parque de Lavanda", foto: "Le Jardin Parque de Lavanda Gramado", mapa: "Le Jardin Parque de Lavanda Gramado", emoji: "💜", cidade: "Gramado", kids: true, dica: "Campos de lavanda e café. Lindo para fotos, caminho tranquilo." },
  { id: "x-olivas", tipo: "arvore", nome: "Olivas de Gramado", foto: "Olivas de Gramado", mapa: "Olivas de Gramado", emoji: "🫒", cidade: "Gramado", kids: true, dica: "Olival com vista para o vale, piquenique e pôr do sol." },
  { id: "x-quilombo", tipo: "montanha", nome: "Vale do Quilombo", foto: "Vale do Quilombo Gramado", mapa: "Vale do Quilombo Gramado", emoji: "🏞️", cidade: "Gramado", kids: false, dica: "Estrada de terra com mirantes e cascatas. Melhor com tempo seco." },
  { id: "x-caracol", tipo: "lago", nome: "Parque do Caracol (mirante)", foto: "Parque Estadual do Caracol", mapa: "Parque Estadual do Caracol Canela", emoji: "💧", cidade: "Canela", kids: true, dica: "Mirante da cascata ao lado dos Bondinhos. Os 927 degraus não são para quem está com bebê, mas o mirante é acessível." },
  { id: "x-ferradura", tipo: "montanha", nome: "Parque da Ferradura", foto: "Parque da Ferradura Canela", mapa: "Parque da Ferradura Canela", emoji: "🧲", cidade: "Canela", kids: false, dica: "Mirantes do cânion em forma de ferradura. Trilhas leves, mas de terra." },
  { id: "x-castelinho", tipo: "hotel", nome: "Castelinho Caracol", foto: "Castelinho Caracol Canela", mapa: "Castelinho Caracol Canela", emoji: "🏡", cidade: "Canela", kids: true, dica: "Casarão histórico de madeira com apfelstrudel. Fica no caminho da Cascata." },
  { id: "x-florybal", tipo: "presente", nome: "Castelo / Reino do Chocolate", foto: "Florybal Gramado", mapa: "Reino do Chocolate Florybal Gramado", emoji: "🍬", cidade: "Gramado", kids: true, dica: "Chocolate com cenário de conto de fadas — as crianças adoram." },
];

const APPS = [
  { nome: "TheFork", cat: "Restaurantes", emoji: "🍴", desc: "Reserva de mesa com descontos de até 50% em restaurantes participantes, além de pontos.", link: "https://www.thefork.com.br" },
  { nome: "Méliuz", cat: "Cashback", emoji: "💰", desc: "Cashback em hotéis, passagens, Booking, iFood, Uber e lojas. Ative antes de comprar.", link: "https://www.meliuz.com.br" },
  { nome: "Civitatis", cat: "Passeios", emoji: "🎟️", desc: "Ingressos e passeios em Gramado e Canela, às vezes em combos mais baratos.", link: "https://www.civitatis.com/br/gramado/" },
  { nome: "GetYourGuide", cat: "Passeios", emoji: "🗺️", desc: "Passeios e ingressos com cancelamento grátis em muitas opções.", link: "https://www.getyourguide.com.br" },
  { nome: "Tripadvisor", cat: "Avaliações", emoji: "🦉", desc: "Avaliações e ofertas de passeios; bom para comparar preços.", link: "https://www.tripadvisor.com.br" },
  { nome: "Sympla", cat: "Eventos", emoji: "🎫", desc: "Muitos shows e eventos da serra vendem ingresso por aqui.", link: "https://www.sympla.com.br" },
  { nome: "iFood", cat: "Delivery", emoji: "🛵", desc: "Cupons de primeira compra e promoções — útil nas noites de descanso no hotel.", link: "https://www.ifood.com.br" },
  { nome: "Livelo / Esfera", cat: "Pontos", emoji: "⭐", desc: "Troque ou acumule pontos do cartão em ingressos, hotéis e locação de carro.", link: "https://www.livelo.com.br" },
  { nome: "Waze / Google Maps", cat: "Trânsito", emoji: "🧭", desc: "Evita congestionamento na Borges de Medeiros e na RS-115 em dia de Parada.", link: "https://www.waze.com" },
  { nome: "Natal Luz (site oficial)", cat: "Eventos", emoji: "🎄", desc: "Programação oficial, horários da Parada e venda dos espetáculos pagos.", link: "https://www.natalluzdegramado.com.br" },
];

const DICAS_DESCONTO = [
  "Compre os ingressos online: na maioria dos parques sai mais barato que na bilheteria.",
  "Pergunte por combos (ex.: atrações do mesmo grupo em Gramado/Canela) antes de comprar avulso.",
  "Ative o cashback (Méliuz, banco ou cartão) antes de pagar hotel, carro e ingressos.",
  "Confira a idade de gratuidade de cada parque — crianças pequenas costumam não pagar.",
  "Na recepção do hotel às vezes há cupons e parcerias com atrações locais.",
];

// Sugestão de mala para 6 dias (07 a 12/11). Novembro na serra: ~10°C à noite,
// até 25°C de dia, e chuva frequente. Quantidades são por bebê / por adulto.
const MALA = [
  { id: "bebes", nome: "Bebês", grupos: [
    { titulo: "Roupas (por bebê)", itens: [
      "8 a 10 bodies (metade manga longa)",
      "6 calças ou mijões",
      "3 casaquinhos ou moletons",
      "1 macacão ou jaqueta quente para a noite",
      "3 pijamas quentes",
      "8 pares de meia + 1 meia antiderrapante",
      "Gorro, luvinha e manta",
      "Sapatinho ou tênis confortável",
      "Capa de chuva ou jaqueta impermeável",
    ]},
    { titulo: "Higiene e troca", itens: [
      "Fraldas para 2 a 3 dias (compre o resto em Gramado)",
      "Lenços umedecidos",
      "Pomada para assaduras",
      "Trocador portátil",
      "Saquinhos para fralda suja",
      "Sabonete, shampoo e escova infantis",
      "Toalha com capuz",
    ]},
    { titulo: "Alimentação", itens: [
      "Mamadeiras e escova de limpeza",
      "Leite ou fórmula (quantidade para a viagem toda)",
      "Garrafa térmica para água quente",
      "Babadores, colher e copo de transição",
      "Potinhos e lanches (frutinhas, biscoito)",
    ]},
    { titulo: "Passeio", itens: [
      "Carrinho + capa de chuva do carrinho",
      "Canguru (Skyglass é no colo)",
      "Cadeirinha do carro (se não alugar na locadora)",
      "Mochila de passeio",
      "Chupeta e prendedor",
      "Brinquedos pequenos e livrinho",
    ]},
    { titulo: "Acquamotion", itens: [
      "3 fraldas de piscina",
      "Roupa de banho com proteção UV",
      "Boia ou colete adequado à idade",
      "Roupão ou toalha extra e chinelo",
      "Documento do bebê (entrada gratuita)",
    ]},
    { titulo: "Saúde e sono", itens: [
      "Carteira de vacinação e documento",
      "Termômetro",
      "Remédios indicados pelo pediatra (febre, dor, cólica)",
      "Soro fisiológico e aspirador nasal",
      "Protetor solar e repelente infantis",
      "Naninha / objeto de apego",
      "Saco de dormir ou cobertor do bebê",
      "Babá eletrônica",
    ]},
  ]},
  { id: "pais", nome: "Pais", grupos: [
    { titulo: "Documentos e dinheiro", itens: [
      "RG ou CNH dos dois",
      "CNH do motorista + cartão de crédito para a caução do carro",
      "Cartões e dinheiro em espécie (Fornos de Gramado)",
      "Carteirinha do plano de saúde",
      "Reservas e ingressos salvos no celular",
    ]},
    { titulo: "Roupas (por adulto)", itens: [
      "1 casaco quente para a noite",
      "1 corta-vento ou capa de chuva",
      "2 a 3 calças",
      "5 a 6 camisetas",
      "2 blusas ou moletons",
      "Cachecol e gorro",
      "Tênis confortável + 1 calçado extra (se molhar)",
      "Pijama",
      "Roupa de banho e chinelo (Acquamotion)",
      "Roupa um pouco mais arrumada para os jantares",
    ]},
    { titulo: "Higiene e saúde", itens: [
      "Nécessaire completa",
      "Remédios de uso pessoal",
      "Analgésico e remédio para enjoo",
      "Protetor solar e protetor labial",
      "Hidratante (o frio resseca)",
    ]},
    { titulo: "Eletrônicos e carro", itens: [
      "Carregadores e cabos",
      "Power bank",
      "Cabo para o carro (CarPlay / Android Auto)",
      "Suporte de celular para o carro",
      "Fone de ouvido",
    ]},
  ]},
  { id: "mao", nome: "De mão", grupos: [
    { titulo: "Para o voo e a estrada", itens: [
      "Documentos de todos",
      "1 troca de roupa por bebê",
      "1 camiseta extra para cada adulto",
      "Fraldas e lenços para 6 horas",
      "Mamadeira, leite e lanches",
      "Remédios do bebê",
      "Casaco leve para cada um (chegada em Porto Alegre)",
      "Chupeta e brinquedo para a decolagem e o pouso",
      "Água e lanche para a estrada (1h40)",
      "Saquinho de lixo e lenço de papel",
    ]},
  ]},
];
