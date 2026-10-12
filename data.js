// Dados da viagem. Edite à vontade: o app lê tudo daqui.
// "foto" é o termo de busca usado para carregar fotos do Wikimedia Commons.
// "mapa" é o termo de busca do Google Maps.

const VIAGEM = {
  titulo: "Gramado 2026",
  inicio: "2026-11-07T08:05:00-03:00",
  hotel: "Wish Serrano Resort & Convention, Gramado",
};

const LOCAIS = {
  poa: { nome: "Aeroporto Salgado Filho", foto: "Aeroporto Internacional Salgado Filho", mapa: "Aeroporto Internacional Salgado Filho Porto Alegre", emoji: "✈️" },
  estrada: { nome: "Estrada BR-116 / RS-115", foto: "RS-115 Gramado", mapa: "RS-115 Gramado", emoji: "🚗" },
  wish: { nome: "Wish Serrano", foto: "Wish Serrano Gramado", mapa: "Wish Serrano Resort Gramado", emoji: "🏨" },
  centro: { nome: "Centro de Gramado", foto: "Avenida Borges de Medeiros Gramado", mapa: "Centro Gramado RS", emoji: "🏘️" },
  parada: { nome: "Parada de Natal – Natal Luz", foto: "Natal Luz Gramado", mapa: "Avenida Borges de Medeiros Gramado", emoji: "🎄" },
  etnias: { nome: "Praça das Etnias – Vila de Natal", foto: "Praça das Etnias Gramado", mapa: "Praça das Etnias Gramado", emoji: "🎅" },
  ruacoberta: { nome: "Rua Coberta", foto: "Rua Coberta Gramado", mapa: "Rua Coberta Gramado", emoji: "🎭" },
  galeto: { nome: "Galeto Itália", foto: null, mapa: "Galeto Itália Gramado", emoji: "🍗" },
  bondinhos: { nome: "Parque Bondinhos Aéreos – Cascata do Caracol", foto: "Cascata do Caracol", mapa: "Parque Bondinhos Aéreos Canela", emoji: "🚡" },
  skyglass: { nome: "Skyglass Canela", foto: "Skyglass Canela", mapa: "Skyglass Canela", emoji: "🪟" },
  garfo: { nome: "Garfo e Bombacha", foto: null, mapa: "Garfo e Bombacha Canela", emoji: "🥩" },
  lagonegro: { nome: "Lago Negro", foto: "Lago Negro Gramado", mapa: "Lago Negro Gramado", emoji: "🦢" },
  prawer: { nome: "Fábrica de Chocolate Prawer", foto: "Prawer chocolate Gramado", mapa: "Chocolate Prawer Av. das Hortênsias 4100 Gramado", emoji: "🍫" },
  fornos: { nome: "Fornos de Gramado", foto: null, mapa: "Fornos de Gramado Borges de Medeiros", emoji: "🥖" },
  palacio: { nome: "Palácio dos Festivais", foto: "Palácio dos Festivais Gramado", mapa: "Palácio dos Festivais Gramado", emoji: "✨" },
  acquamotion: { nome: "Acquamotion", foto: "Acquamotion Gramado", mapa: "Acquamotion Gramado", emoji: "♨️" },
  hector: { nome: "Hector Pizzaria", foto: null, mapa: "Hector Pizzaria Borges de Medeiros 1791 Gramado", emoji: "🍕" },
  minimundo: { nome: "Mini Mundo", foto: "Minimundo Gramado", mapa: "Mini Mundo Gramado", emoji: "🏰" },
  aldeia: { nome: "Aldeia do Papai Noel", foto: "Aldeia do Papai Noel Gramado", mapa: "Aldeia do Papai Noel Gramado", emoji: "🎁" },
  belavista: { nome: "Café Colonial Bela Vista", foto: null, mapa: "Café Colonial Bela Vista Gramado", emoji: "☕" },
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
  { grupo: "Mala do bebê / dia a dia", itens: [
    { id: "canguru", texto: "Canguru (Skyglass é no colo)" },
    { id: "carrinho", texto: "Carrinho (Bondinhos aceita carrinho)" },
    { id: "banho", texto: "Roupa de banho, fralda de piscina, toalha e chinelo para o Acquamotion" },
    { id: "frio", texto: "Casaco, gorro e capa de chuva para as noites" },
    { id: "lanches", texto: "Lanches e água para a estrada (1h40 até Gramado)" },
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
  { id: "x-snowland", nome: "Snowland", foto: "Snowland Gramado", mapa: "Snowland Gramado", emoji: "⛄", cidade: "Gramado", kids: true, dica: "Parque de neve indoor. Tem área infantil com neve para os pequenos. Encaixa bem num fim de tarde." },
  { id: "x-ruatorta", nome: "Rua Torta", foto: "Rua Torta Gramado", mapa: "Rua Torta Gramado", emoji: "🌸", cidade: "Gramado", kids: true, dica: "Rua cheia de flores e curvas, foto rápida e grátis. Fica pertinho do centro." },
  { id: "x-joaquina", nome: "Lago Joaquina Rita Bier", foto: "Lago Joaquina Rita Bier", mapa: "Lago Joaquina Rita Bier Gramado", emoji: "🌊", cidade: "Gramado", kids: true, dica: "Palco do espetáculo aquático do Natal Luz. Passeio grátis de dia." },
  { id: "x-matriz", nome: "Igreja Matriz São Pedro", foto: "Igreja Matriz São Pedro Gramado", mapa: "Igreja Matriz São Pedro Gramado", emoji: "⛪", cidade: "Gramado", kids: true, dica: "Em frente à Praça Major Nicoletti, no centro — dá para ver no passeio a pé." },
  { id: "x-catedral", nome: "Catedral de Pedra", foto: "Catedral de Pedra Canela", mapa: "Catedral de Pedra Canela", emoji: "⛪", cidade: "Canela", kids: true, dica: "Cartão-postal de Canela. Encaixa no domingo, na volta do Garfo e Bombacha." },
  { id: "x-terramagica", nome: "Terra Mágica Florybal", foto: "Terra Mágica Florybal", mapa: "Parque Terra Mágica Florybal Canela", emoji: "🧚", cidade: "Canela", kids: true, dica: "Parque temático com bichos, duendes e dinossauros, ótimo para crianças pequenas." },
  { id: "x-mundovapor", nome: "Mundo a Vapor", foto: "Mundo a Vapor Canela", mapa: "Mundo a Vapor Canela", emoji: "🚂", cidade: "Canela", kids: true, dica: "Miniaturas de máquinas a vapor e a famosa cena do trem que atravessa a parede." },
  { id: "x-alpen", nome: "Alpen Park", foto: "Alpen Park Canela", mapa: "Alpen Park Canela", emoji: "🎢", cidade: "Canela", kids: false, dica: "Montanha-russa alpina e atrações radicais. Algumas têm restrição de altura/idade." },
  { id: "x-gramadozoo", nome: "GramadoZoo", foto: "Gramado Zoo", mapa: "GramadoZoo Gramado", emoji: "🦉", cidade: "Gramado", kids: true, dica: "Zoológico com fauna da região, caminhada leve. Bom para uma manhã." },
  { id: "x-dreamland", nome: "Dreamland – Museu de Cera", foto: "Museu de Cera Dreamland Gramado", mapa: "Dreamland Museu de Cera Gramado", emoji: "🗽", cidade: "Gramado", kids: true, dica: "Atração coberta — boa opção para dia de chuva. Tem combos com outros museus do grupo." },
  { id: "x-supercarros", nome: "Super Carros / Hollywood Dream Cars", foto: "Hollywood Dream Cars Gramado", mapa: "Hollywood Dream Cars Gramado", emoji: "🚘", cidade: "Gramado", kids: true, dica: "Carros de filme e clássicos. Coberto, rápido de visitar." },
  { id: "x-lavanda", nome: "Le Jardin Parque de Lavanda", foto: "Le Jardin Parque de Lavanda Gramado", mapa: "Le Jardin Parque de Lavanda Gramado", emoji: "💜", cidade: "Gramado", kids: true, dica: "Campos de lavanda e café. Lindo para fotos, caminho tranquilo." },
  { id: "x-olivas", nome: "Olivas de Gramado", foto: "Olivas de Gramado", mapa: "Olivas de Gramado", emoji: "🫒", cidade: "Gramado", kids: true, dica: "Olival com vista para o vale, piquenique e pôr do sol." },
  { id: "x-quilombo", nome: "Vale do Quilombo", foto: "Vale do Quilombo Gramado", mapa: "Vale do Quilombo Gramado", emoji: "🏞️", cidade: "Gramado", kids: false, dica: "Estrada de terra com mirantes e cascatas. Melhor com tempo seco." },
  { id: "x-caracol", nome: "Parque do Caracol (mirante)", foto: "Parque Estadual do Caracol", mapa: "Parque Estadual do Caracol Canela", emoji: "💧", cidade: "Canela", kids: true, dica: "Mirante da cascata ao lado dos Bondinhos. Os 927 degraus não são para quem está com bebê, mas o mirante é acessível." },
  { id: "x-ferradura", nome: "Parque da Ferradura", foto: "Parque da Ferradura Canela", mapa: "Parque da Ferradura Canela", emoji: "🧲", cidade: "Canela", kids: false, dica: "Mirantes do cânion em forma de ferradura. Trilhas leves, mas de terra." },
  { id: "x-castelinho", nome: "Castelinho Caracol", foto: "Castelinho Caracol Canela", mapa: "Castelinho Caracol Canela", emoji: "🏡", cidade: "Canela", kids: true, dica: "Casarão histórico de madeira com apfelstrudel. Fica no caminho da Cascata." },
  { id: "x-florybal", nome: "Castelo / Reino do Chocolate", foto: "Florybal Gramado", mapa: "Reino do Chocolate Florybal Gramado", emoji: "🍬", cidade: "Gramado", kids: true, dica: "Chocolate com cenário de conto de fadas — as crianças adoram." },
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
