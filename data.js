// Dados da viagem. Edite à vontade: o app lê tudo daqui.
// "foto" é o termo de busca usado para carregar fotos do Wikimedia Commons.
// "mapa" é o termo de busca do Google Maps.

const VIAGEM = {
  titulo: "Gramado 2026",
  inicio: "2026-11-07T08:05:00-03:00",
  hotel: "Wish Serrano Resort & Convention, Gramado",
};

const LOCAIS = {
  vcp: { tipo: "aviao", nome: "Aeroporto de Viracopos (Campinas)", foto: "Aeroporto Internacional de Viracopos", mapa: "Aeroporto Internacional de Viracopos Campinas", emoji: "✈️" },
  carrinho: { tipo: "presente", nome: "Casa do Viajante (aluguel de carrinho de bebê)", foto: null, mapa: "Casa do Viajante Av. Borges de Medeiros 2300 Gramado", emoji: "👶" },
  poa: { tipo: "aviao", nome: "Aeroporto Salgado Filho (Porto Alegre)", foto: "Aeroporto Internacional Salgado Filho", mapa: "Aeroporto Internacional Salgado Filho Porto Alegre", emoji: "✈️" },
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
  criamigos: { tipo: "castelo", nome: "Mundo Criamigos", foto: null, mapa: "Mundo Criamigos Gramado", emoji: "🧸" },
  fornos: { tipo: "cafe", nome: "Fornos de Gramado", foto: null, mapa: "Fornos de Gramado Borges de Medeiros", emoji: "🥖" },
  palacio: { tipo: "estrela", nome: "Palácio dos Festivais", foto: "Palácio dos Festivais Gramado", mapa: "Palácio dos Festivais Gramado", emoji: "✨" },
  hector: { tipo: "garfo", nome: "Hector Pizzaria", foto: null, mapa: "Hector Pizzaria Borges de Medeiros 1791 Gramado", emoji: "🍕" },
  snowland: { tipo: "neve", nome: "Snowland", foto: "Snowland Gramado", mapa: "Snowland Gramado", emoji: "⛄" },
  aldeia: { tipo: "arvore", nome: "Aldeia do Papai Noel", foto: "Aldeia do Papai Noel Gramado", mapa: "Aldeia do Papai Noel Gramado", emoji: "🎁" },
  belavista: { tipo: "cafe", nome: "Café Colonial Bela Vista", foto: null, mapa: "Café Colonial Bela Vista Gramado", emoji: "☕" },
};

const ROTEIRO = [
  {
    data: "2026-11-07", titulo: "Sábado 07/11", subtitulo: "Chegada e Parada de Natal", capa: "parada",
    itens: [
      { hora: "06h05", texto: "Chegada a Viracopos, 2h antes do voo. Despachar malas e cadeirinha (se levar a sua)", local: "vcp" },
      { hora: "08h05", texto: "Decolagem de Viracopos (Campinas) para Porto Alegre", local: "vcp" },
      { hora: "09h45", texto: "Pouso no Salgado Filho, em Porto Alegre", local: "poa" },
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
      { hora: "09h00", texto: "Lago Negro com pedalinho de cisne. Entrada gratuita, 6 min do hotel", local: "lagonegro" },
      { hora: "10h00–15h00", texto: "Mundo Criamigos, no centro: 50 atrações em seis salas temáticas e oficina para montar o próprio bichinho de pelúcia. Almoço por lá ou no centro", local: "criamigos" },
      { hora: "15h30", texto: "Fornos de Gramado, na Borges de Medeiros. Cucas e pães, fecha às 18h, só dinheiro", local: "fornos" },
      { hora: "16h15", texto: "Volta ao hotel para descanso e soneca", local: "wish" },
      { hora: "18h00", texto: "Centro a pé: Rua Coberta e Vila de Natal", local: "ruacoberta" },
      { hora: "19h00", texto: "Jantar leve" },
      { hora: "20h00", texto: "Opcional: show de acendimento das luzes em frente ao Palácio dos Festivais, gratuito e diário", local: "palacio" },
    ],
  },
  {
    data: "2026-11-10", titulo: "Terça 10/11", subtitulo: "Aldeia do Papai Noel", capa: "aldeia",
    itens: [
      { hora: "10h00", texto: "Aldeia do Papai Noel, Borges de Medeiros 2300: Casa do Papai Noel, fábrica de brinquedos e área com neve artificial. Fecha às 18h", local: "aldeia" },
      { hora: "12h30", texto: "Almoço no centro" },
      { hora: "13h30", texto: "Volta ao hotel e descanso", local: "wish" },
      { hora: "18h00", texto: "Hector Pizzaria, Borges de Medeiros 1791. Abre 18h, cheguem na abertura e reserve mesa pelo site. Sentem perto da saída: os mágicos circulam pelas mesas", local: "hector" },
    ],
  },
  {
    data: "2026-11-11", titulo: "Quarta 11/11", subtitulo: "Último dia", capa: "snowland",
    itens: [
      { hora: "10h00", texto: "Snowland na abertura: parque de neve coberto com área infantil. Confirme se abre na quarta (alguns sites dizem que fecha às quartas na baixa temporada)", local: "snowland" },
      { hora: "12h30", texto: "Almoço leve" },
      { hora: "13h30", texto: "Soneca", local: "wish" },
      { hora: "16h00", texto: "Café Colonial Bela Vista. Substitui o jantar. Reserve e pague online", local: "belavista" },
      { hora: "18h30", texto: "Volta ao hotel e malas prontas", local: "wish" },
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
      { hora: "14h00", texto: "Decolagem do Salgado Filho para Viracopos", local: "poa" },
      { hora: "~15h45", texto: "Pouso em Viracopos, Campinas. Confira o horário exato no bilhete", local: "vcp" },
    ],
  },
];

// Pendências: marque no app conforme for resolvendo (fica salvo no celular).
const PENDENCIAS = [
  { grupo: "Antes de viajar", itens: [
    { id: "voo-checkin", texto: "Fazer check-in online do voo de ida Viracopos → Porto Alegre (abre ~48h antes)" },
    { id: "vcp-transporte", texto: "Combinar ida e volta de Viracopos: estacionamento no aeroporto, aplicativo ou carona (chegar às 6h05 do dia 07)" },
    { id: "locadora", texto: "Confirmar reserva do carro, horário de retirada (11h) e devolução (12h do dia 12)" },
    { id: "cadeirinha", texto: "Decidir: levar a própria cadeirinha ou alugar na locadora" },
    { id: "doc-crianca", texto: "Separar documento da criança (RG ou certidão) — exigido no voo e para gratuidade nos parques" },
    { id: "cnh", texto: "CNH válida e cartão de crédito no nome do motorista (caução da locadora)" },
    { id: "carrinho-aluguel", local: "carrinho", texto: "Reservar carrinho de bebê alugado com entrega no Wish Serrano (se não levar o seu). Em alta temporada esgota" },
    { id: "dinheiro", texto: "Sacar dinheiro em espécie (Fornos de Gramado só aceita dinheiro)" },
    { id: "snowland-quarta", local: "snowland", texto: "Confirmar se o Snowland abre na quarta 11/11 e o que está incluso (roupa de neve, armário). Se fechar, troque com a Aldeia de terça" },
    { id: "natal-luz", texto: "Conferir no site do Natal Luz a programação de 2026 (datas da Parada e shows)" },
    { id: "clima", texto: "Ver previsão do tempo: novembro na serra varia de ~10°C a 25°C, com chuva" },
  ]},
  { grupo: "Hotel — Wish Serrano", itens: [
    { id: "early-checkin", local: "wish", texto: "Pedir early check-in para 12h40 do sábado" },
    { id: "estacionamento", texto: "Confirmar valor da diária do estacionamento (cobrada à parte)" },
    { id: "berco", texto: "Solicitar berço no quarto" },
    { id: "cafe-hotel", texto: "Confirmar se o café da manhã está incluso e horário (dia 12 às 7h30)" },
  ]},
  { grupo: "Reservas de restaurante", itens: [
    { id: "res-galeto", local: "galeto", texto: "Reservar Galeto Itália — sábado 07/11, 19h" },
    { id: "res-garfo", local: "garfo", texto: "Reservar Garfo e Bombacha — domingo 08/11, 12h45" },
    { id: "res-hector", local: "hector", texto: "Reservar mesa no Hector Pizzaria — terça 10/11, 18h" },
    { id: "res-belavista", local: "belavista", texto: "Reservar e pagar Café Colonial Bela Vista online — quarta 11/11, 16h" },
  ]},
  { grupo: "Volta", itens: [
    { id: "voo-volta", texto: "Fazer check-in online do voo de volta Porto Alegre → Viracopos" },
    { id: "tanque", texto: "Abastecer o carro antes de devolver (conferir política da locadora)" },
    { id: "malas", texto: "Malas prontas na noite de quarta" },
  ]},
];

// Ingressos que dá para comprar antecipado.
// Preços mudam: confira sempre no site oficial antes de comprar.
const INGRESSOS = [
  { id: "ing-bondinhos", local: "bondinhos", dia: "Dom 08/11 · 9h", status: "Comprar", dica: "Compre online para o horário de abertura. Confira a regra de gratuidade por idade.", busca: "Parque Bondinhos Aéreos Canela ingresso site oficial" },
  { id: "ing-skyglass", local: "skyglass", dia: "Dom 08/11 · 11h", status: "Comprar", dica: "Há combos com outras atrações de Canela — compare com o ingresso avulso.", busca: "Skyglass Canela ingresso site oficial" },
  { id: "ing-criamigos", local: "criamigos", dia: "Seg 09/11 · 10h às 15h", status: "Comprar", dica: "Ingresso no site oficial ou na Civitatis; compare os preços. A oficina de pelúcia costuma ser paga à parte.", busca: "Mundo Criamigos Gramado ingresso" },
  { id: "ing-snowland", local: "snowland", dia: "Qua 11/11 · 10h", status: "Comprar", dica: "Compare o site oficial com o Laçador de Ofertas (em 2025: R$ 259 x R$ 199). Montanha de Neve a partir de 1 ano; patinação só a partir de 1,15 m.", busca: "Snowland Gramado ingresso" },
  { id: "ing-aldeia", local: "aldeia", dia: "Ter 10/11 · 10h", status: "Comprar", dica: "Fecha às 18h. Veja se há gratuidade para crianças pequenas.", busca: "Aldeia do Papai Noel Gramado ingresso site oficial" },
  { id: "ing-belavista", local: "belavista", dia: "Qua 11/11 · 16h", status: "Reservar e pagar", dica: "Pagamento online antecipado.", busca: "Café Colonial Bela Vista Gramado reserva" },
  { id: "ing-natalluz", local: "parada", dia: "Opcional", status: "Shows pagos", dica: "Além da Parada gratuita, o Natal Luz tem espetáculos pagos (ex.: Grande Desfile, shows no Lago Joaquina Rita Bier). Ingressos esgotam cedo.", busca: "Natal Luz Gramado 2026 ingressos espetáculos" },
];

// Lugares fora do roteiro que dá para encaixar.
const EXTRAS = [
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
  { nome: "Laçador de Ofertas", cat: "Cupons", desc: "O principal site de cupons de Gramado: atrações, restaurantes e até carrinho de bebê, muitas vezes mais barato que no site oficial. Some o cupom MELHORESDESTINOS (+5%, confira se ainda vale).", link: "https://www.lacadordeofertas.com.br/" },
  { nome: "Melhores Destinos", cat: "Promoções", desc: "Publica os cupons do momento para Gramado (Laçador, parques, Natal Luz). Busque \"Gramado\" no site antes de comprar.", link: "https://www.melhoresdestinos.com.br/" },
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

// Onde dá para usar os pontos que vocês têm (pesquisa de outubro de 2026).
const PONTOS = [
  { nome: "Azul Fidelidade", status: "Passeios: sim", ok: true,
    desc: "No Azul Viagens dá para pagar passeios e ingressos com pontos (procure Gramado e Canela). O Shopping Azul também troca pontos por ingressos de shows e eventos. Compare o valor: em passeios a conversão costuma ser menos vantajosa que em passagens. Restaurantes: não.",
    link: "https://www.azulviagens.com.br/" },
  { nome: "Smiles", status: "Passeios: sim", ok: true,
    desc: "A área de Atrações da Smiles (parceria Trade Tours) vende ingressos de parques, city tours e experiências gastronômicas com milhas, dinheiro ou os dois. O Shopping Smiles (Easy Live) tem ingressos de eventos. Veja se há atrações de Gramado e Canela. Restaurante comum: não.",
    link: "https://www.smiles.com.br/parceiros/atracoes/trade-tours" },
  { nome: "Pontos Decolar", status: "Passeios: não confirmado", ok: false,
    desc: "O Passaporte Decolar dá desconto em hotel, voo, carro e pacote. Não achamos uso atual em passeios, e as promoções de atividades com pontos acabaram em setembro de 2026. Vale para a próxima reserva de hotel ou carro. Restaurantes: não.",
    link: "https://www.decolar.com/" },
];
const DICA_PONTOS = "Para refeições, nenhum dos três paga a conta do restaurante. O que dá para fazer: usar os pontos nos passeios e ingressos e guardar o dinheiro para comer, ou trocar pontos por crédito de restaurante/delivery quando o programa oferecer (confira a área de parceiros de cada um).";

// Grupos para receber promoções e tirar dúvidas.
const GRUPOS = [
  { nome: "Grupo de WhatsApp Gramado e Canela", cat: "Falando de Viagem", desc: "Grupo de viajantes que trocam dicas, fotos e promoções da Serra Gaúcha. As regras e o link de entrada ficam no fórum.", link: "https://www.falandodeviagem.com.br/viewtopic.php?p=451910" },
  { nome: "Alertas do Melhores Destinos", cat: "WhatsApp / app", desc: "Canal e app com alertas de promoções. Ative os avisos de Gramado para pegar cupons relâmpago do Laçador.", link: "https://www.melhoresdestinos.com.br/" },
  { nome: "Natal Luz no WhatsApp", cat: "Ingressos", desc: "Desde 2025 o Natal Luz também vende ingressos pelo WhatsApp oficial (o número fica no site).", link: "https://www.natalluzdegramado.com.br/" },
];

// Dicas para pagar menos. Valores citados são de 2025 e servem de referência.
const DICAS_DESCONTO = [
  { titulo: "Compare sempre com o Laçador de Ofertas", texto: "Antes de comprar no site oficial, procure a atração no Laçador. Exemplo de 2025: Snowland a R$ 259 no site oficial e R$ 199 no Laçador." },
  { titulo: "Some cupons", texto: "O cupom MELHORESDESTINOS dava +5% em cima das promoções do Laçador e podia ser somado a outros cupons. Teste no carrinho antes de pagar." },
  { titulo: "Passaporte em vez de ingresso avulso", texto: "O Passaporte Dreamland junta 8 atrações (Museu de Cera, Super Carros, Hollywood Dream Cars...). Em 2025 custava R$ 199 contra R$ 839 comprando separado." },
  { titulo: "Natal Luz: quanto antes, mais barato", texto: "Os espetáculos pagos têm desconto maior para quem compra cedo (em 2024 ia de 20% em julho a 5% em outubro). Compre já os que quiser." },
  { titulo: "Combos de parques", texto: "O Snowland costuma ter combo com outras atrações do mesmo grupo. Bondinhos e Skyglass também aparecem juntos em pacotes de Canela." },
  { titulo: "Crianças pequenas não pagam", texto: "A maioria dos parques libera bebês e crianças pequenas. Leve sempre o documento delas para provar a idade." },
  { titulo: "Cashback e pontos", texto: "Ative Méliuz ou o cashback do banco antes de pagar hotel, carro e ingressos. Pontos Livelo e Esfera também viram ingressos e diárias." },
  { titulo: "Carro parado no hotel", texto: "No centro de Gramado o estacionamento na rua é pago e disputado. Deixe o carro no Wish Serrano e vá a pé à Rua Coberta, Vila de Natal e Borges de Medeiros." },
  { titulo: "Coma bem gastando menos", texto: "O café colonial substitui o jantar (já está no roteiro). Galeterias como o Galeto Itália são rodízio com preço fixo. Fornos de Gramado vende cuca e pão barato, só no dinheiro." },
  { titulo: "Lanches do mercado", texto: "Compre água, frutas e lanches das crianças em supermercado: dentro dos parques tudo custa bem mais." },
  { titulo: "Pergunte no hotel", texto: "A recepção às vezes tem cupons e parcerias com atrações locais, além de indicar o carrinho de bebê alugado." },
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
      "Carrinho + capa de chuva do carrinho (ou alugue em Gramado: veja em Pendências)",
      "Canguru (Skyglass é no colo)",
      "Cadeirinha do carro (se não alugar na locadora)",
      "Mochila de passeio",
      "Chupeta e prendedor",
      "Brinquedos pequenos e livrinho",
    ]},
    { titulo: "Snowland (neve)", itens: [
      "Luvas impermeáveis e gorro",
      "Meia grossa extra e troca de roupa seca",
      "Macacão ou casaco quente (confirme se o parque empresta roupa de neve)",
    ]},
    { titulo: "Piscina do hotel", itens: [
      "Fraldas de piscina e roupa de banho com proteção UV",
      "Toalha ou roupão",
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
      "Roupa de banho e chinelo (piscina do hotel) e luvas para o Snowland",
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

// Contatos para reservas e ingressos. Instagram e WhatsApp tirados dos sites
// oficiais (outubro de 2026), exceto onde há "obs".
const CONTATOS = {
  wish: { site: "https://grupowish.com/", instagram: "wishresorts", obs: "O WhatsApp de reservas aparece no site do Grupo Wish" },
  galeto: { site: "https://www.galetoitalia.com.br/", instagram: "galetoitaliagramado", whatsapp: "5432863375", telefone: "(54) 3286-3375" },
  garfo: { site: "https://www.garfoebombacha.com.br/", instagram: "garfoebombacha" },
  hector: { instagram: "hectordragao", obs: "Instagram citado em blog de viagem; sem site oficial encontrado" },
  belavista: { site: "https://www.belavista.tur.br/", whatsapp: "5432861608", telefone: "(54) 3286-2097" },
  bondinhos: { site: "https://www.bondinhoscanela.com.br/", instagram: "bondinhoscanela", whatsapp: "54992061225" },
  skyglass: { site: "https://www.skyglasscanela.com.br/", instagram: "skyglasscanela", whatsapp: "5436999200" },
  criamigos: { site: "https://mundocriamigos.com.br/", instagram: "mundocriamigosgramado", whatsapp: "54997017005" },
  aldeia: { site: "https://www.aldeiadopapainoel.com.br/", whatsapp: "54991293431" },
  parada: { site: "https://www.natalluzdegramado.com.br/", instagram: "natalluzoficial", whatsapp: "5436989575" },
  fornos: { obs: "Sem site nem Instagram: só dinheiro, pague no balcão" },
  "x-supercarros": { site: "https://www.supercarros.com.br/", instagram: "supercarros", whatsapp: "54981400063" },
  "x-olivas": { site: "https://www.olivasdegramado.com.br/", instagram: "olivasdegramado", whatsapp: "54996107626" },
  snowland: { site: "https://www.snowland.com.br/", instagram: "snowlandgramado", whatsapp: "5430501720" },
  carrinho: { site: "https://casadoviajante.com.br/", instagram: "casadoviajanteoficial", whatsapp: "54991119260",
    obs: "Entrega e retira no hotel. Diária a partir de ~R$ 50 (preço de 2025). Também aluga berço portátil e bebê conforto. Outras opções no Instagram: @babygramadoalugueis e @aluga_tur." },
};
