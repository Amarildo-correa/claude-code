export interface Episode {
  number: number;
  title: string;
  duration: string;
  synopsis: string;
}

export interface Title {
  id: string;
  name: string;
  tagline: string;
  synopsis: string;
  year: number;
  rating: string; // classificação indicativa
  kind: "filme" | "série";
  length: string; // "1h 48min" ou "2 temporadas"
  genres: string[];
  cast: string[];
  swatch: string; // cor de placeholder para a arte do pôster/backdrop
  swatchTo: string; // segunda cor, usada no gradiente do backdrop
  original?: boolean;
  new?: boolean;
  episodes?: Episode[];
}

export const catalog: Title[] = [
  {
    id: "zona-norte",
    name: "Zona Norte",
    tagline: "Um detetive é forçado a investigar o bairro onde cresceu.",
    synopsis:
      "Um detetive é forçado a voltar ao bairro onde cresceu para investigar uma série de desaparecimentos ligados ao seu próprio passado.",
    year: 2024,
    rating: "16",
    kind: "série",
    length: "1 temporada",
    genres: ["Drama", "Suspense"],
    cast: ["Helena Braga", "Rui Andrade", "Sofia Prado"],
    swatch: "#2f4858",
    swatchTo: "#1b242c",
    original: true,
    episodes: [
      { number: 1, title: "A Volta", duration: "42min", synopsis: "Marcelo volta à Zona Norte depois de doze anos e encontra o bairro irreconhecível." },
      { number: 2, title: "Vizinhos Antigos", duration: "39min", synopsis: "Um encontro com um conhecido de infância reabre uma ferida que Marcelo tentava esquecer." },
      { number: 3, title: "O Endereço", duration: "45min", synopsis: "As pistas levam Marcelo até a casa onde tudo começou." },
    ],
  },
  {
    id: "terra-firme",
    name: "Terra Firme",
    tagline: "Depois de perder as terras da família, Helena reconstrói uma fazenda esquecida.",
    synopsis:
      "Depois de perder as terras da família, Helena volta ao interior para reconstruir uma fazenda esquecida e enfrentar vizinhos que não a querem por perto. Uma história sobre raízes, orgulho e recomeço.",
    year: 2023,
    rating: "12",
    kind: "série",
    length: "2 temporadas",
    genres: ["Drama", "Família"],
    cast: ["Marina Costa", "Davi Nunes", "Inês Cardoso"],
    swatch: "#3b5c4e",
    swatchTo: "#1b2a22",
    original: true,
    episodes: [
      { number: 1, title: "A Volta", duration: "42min", synopsis: "Helena chega à antiga fazenda da família e descobre o tamanho do estrago deixado pelos anos de abandono." },
      { number: 2, title: "Vizinhos", duration: "39min", synopsis: "Um conflito antigo por causa de um riacho volta à tona quando Helena tenta reformar a cerca divisória." },
      { number: 3, title: "Colheita", duration: "45min", synopsis: "A primeira colheita se aproxima e Helena precisa decidir em quem confiar para salvar a plantação." },
      { number: 4, title: "Tempestade", duration: "41min", synopsis: "Uma chuva fora de época ameaça destruir meses de trabalho na véspera da colheita." },
    ],
  },
  {
    id: "rota-42",
    name: "Rota 42",
    tagline: "Dois irmãos cruzam o país transportando uma carga que não deveriam ter aceitado.",
    synopsis:
      "Dois irmãos caminhoneiros cruzam o país transportando uma carga que não deveriam ter aceitado, driblando a polícia rodoviária e um passado que não os deixa em paz.",
    year: 2022,
    rating: "14",
    kind: "filme",
    length: "1h 52min",
    genres: ["Ação", "Drama"],
    cast: ["Caio Ferreira", "Bruno Salles"],
    swatch: "#3b4252",
    swatchTo: "#1d222c",
  },
  {
    id: "ilha-sombria",
    name: "Ilha Sombria",
    tagline: "Uma bióloga marinha descobre algo que a estação de pesquisa esconde há décadas.",
    synopsis:
      "Isolada em uma estação de pesquisa numa ilha remota, uma bióloga marinha descobre que os dados que ela deveria coletar escondem um segredo guardado há décadas.",
    year: 2024,
    rating: "16",
    kind: "série",
    length: "1 temporada",
    genres: ["Suspense", "Mistério"],
    cast: ["Ana Beatriz", "Tomás Rangel"],
    swatch: "#5c4742",
    swatchTo: "#2a201c",
    new: true,
    episodes: [
      { number: 1, title: "Estação 12", duration: "48min", synopsis: "Clara chega à ilha e estranha o silêncio da equipe que deveria recebê-la." },
      { number: 2, title: "Amostras", duration: "44min", synopsis: "Um lote de amostras corrompidas revela que os dados da estação vêm sendo manipulados." },
    ],
  },
  {
    id: "ano-zero",
    name: "Ano Zero",
    tagline: "Um ano depois do apagão, uma pequena cidade tenta reconstruir sua própria economia.",
    synopsis:
      "Um ano depois de um apagão nacional, os moradores de uma pequena cidade do interior precisam reconstruir do zero uma economia própria — e decidir quem manda agora.",
    year: 2021,
    rating: "14",
    kind: "filme",
    length: "2h 05min",
    genres: ["Drama", "Ficção"],
    cast: ["Otávio Reis", "Lívia Nascimento"],
    swatch: "#4a3b5c",
    swatchTo: "#241c2c",
  },
  {
    id: "vento-sul",
    name: "Vento Sul",
    tagline: "Uma velejadora solitária enfrenta o próprio limite numa travessia não planejada.",
    synopsis:
      "Depois de perder o parceiro de regata dias antes da largada, uma velejadora decide encarar sozinha uma travessia que ninguém achava que ela devesse fazer.",
    year: 2023,
    rating: "10",
    kind: "filme",
    length: "1h 38min",
    genres: ["Aventura", "Drama"],
    cast: ["Renata Vidal"],
    swatch: "#2f4858",
    swatchTo: "#16232b",
  },
  {
    id: "cidade-cinza",
    name: "Cidade Cinza",
    tagline: "Uma repórter investiga a construtora por trás dos prédios que desabam na periferia.",
    synopsis:
      "Depois que um prédio recém-entregue desaba na periferia, uma repórter local investiga a construtora que domina a cidade havia trinta anos — e descobre que a lista de responsáveis é maior do que imaginava.",
    year: 2024,
    rating: "16",
    kind: "série",
    length: "1 temporada",
    genres: ["Suspense", "Drama"],
    cast: ["Juliana Matos", "Eduardo Klein"],
    swatch: "#5c4a3b",
    swatchTo: "#2c2115",
    new: true,
    episodes: [
      { number: 1, title: "Desabamento", duration: "46min", synopsis: "Paula chega ao local horas depois do desabamento e nota que os laudos oficiais não batem." },
      { number: 2, title: "A Lista", duration: "43min", synopsis: "Um ex-engenheiro da construtora entrega a Paula uma lista de obras nunca vistoriadas." },
    ],
  },
  {
    id: "sala-7",
    name: "Sala 7",
    tagline: "Seis estranhos presos numa sala de escape percebem que o jogo é real.",
    synopsis:
      "Seis estranhos se inscrevem num jogo de escape sofisticado — e percebem tarde demais que as regras e os riscos são bem mais reais do que o anunciado.",
    year: 2022,
    rating: "16",
    kind: "filme",
    length: "1h 41min",
    genres: ["Suspense", "Terror"],
    cast: ["Igor Prado", "Camila Duarte"],
    swatch: "#3b5c4e",
    swatchTo: "#182620",
  },
  {
    id: "mare-alta",
    name: "Maré Alta",
    tagline: "Três gerações de uma família de pescadores dividem a mesma casa na beira-mar.",
    synopsis:
      "Três gerações de uma família de pescadores dividem a mesma casa apertada na beira-mar, entre dívidas, silêncios antigos e a certeza de que o mar está mudando.",
    year: 2024,
    rating: "livre",
    kind: "série",
    length: "1 temporada",
    genres: ["Drama", "Família"],
    cast: ["Zé Bezerra", "Alma Ferreira", "Noa Farias"],
    swatch: "#2f4858",
    swatchTo: "#182329",
    new: true,
    episodes: [
      { number: 1, title: "Baixa-mar", duration: "40min", synopsis: "Seu Zé decide, contra a vontade da família, sair para pescar durante um alerta de ressaca." },
      { number: 2, title: "A Rede Nova", duration: "37min", synopsis: "Noa convence o avô a experimentar um novo trecho de pesca, com resultados inesperados." },
    ],
  },
  {
    id: "sangue-frio",
    name: "Sangue Frio",
    tagline: "Um perito criminal reabre, sozinho, um caso que a própria polícia arquivou.",
    synopsis:
      "Prestes a se aposentar, um perito criminal reabre por conta própria um caso arquivado quinze anos atrás — o único que ele nunca conseguiu esquecer.",
    year: 2021,
    rating: "16",
    kind: "filme",
    length: "1h 56min",
    genres: ["Suspense", "Crime"],
    cast: ["Fábio Cerqueira"],
    swatch: "#5c3b45",
    swatchTo: "#2b1c20",
  },
];

export function getTitle(id: string): Title | undefined {
  return catalog.find((t) => t.id === id);
}

// Imagens de placeholder de serviços públicos (Picsum/Pravatar), já que os
// títulos são fictícios e não há arte de pôster real para usar.
export function posterUrl(id: string, variant: "poster" | "backdrop" = "poster"): string {
  const size = variant === "poster" ? "600/900" : "1600/900";
  return `https://picsum.photos/seed/nova-${id}-${variant}/${size}`;
}

export function avatarUrl(name: string): string {
  return `https://i.pravatar.cc/128?u=${encodeURIComponent(name)}`;
}
