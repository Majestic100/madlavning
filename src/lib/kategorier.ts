/** Kategorierne fra briefet — Bagetips er artikler og har sin egen collection. */
export interface Kategori {
  slug: string;
  navn: string;
  kortNavn: string;
  /** Bruges i menu/kort. De lange SEO-tekster ligger i src/data/kategoritekster.ts */
  tagline: string;
  erArtikler?: boolean;
}

export const KATEGORIER: Kategori[] = [
  { slug: "bagvaerk",  navn: "Bagværk",  kortNavn: "Bagværk",  tagline: "Brød, boller og alt med dej" },
  { slug: "desserter", navn: "Desserter", kortNavn: "Desserter", tagline: "Søde sager til enhver tid på dagen" },
  { slug: "kager",     navn: "Kager",     kortNavn: "Kager",     tagline: "Fra hverdagskage til fødselsdag" },
  { slug: "snacks",    navn: "Snacks",    kortNavn: "Snacks",    tagline: "Små sager til hyggen" },
  { slug: "pizza",     navn: "Pizza",     kortNavn: "Pizza",     tagline: "Dej, der fortjener tålmodighed" },
  { slug: "bagetips",  navn: "Bagetips",  kortNavn: "Bagetips",  tagline: "Teknik og tommelfingerregler", erArtikler: true },
];

/** Underkategorier vises i dropdown-menuen og har egne sider, fx /opskrifter/bagvaerk/surdej/.
 *  En opskrift vælger sin underkategori med `subcategory:` i frontmatter (valgfrit). */
export interface Underkategori {
  slug: string;
  kategori: string;
  navn: string;
  beskrivelse: string;
}

export const UNDERKATEGORIER: Underkategori[] = [
  { kategori: "bagvaerk",  slug: "brioche",  navn: "Brioche",  beskrivelse: "Bløde briocheboller med fyld, fra vaniljecreme og jordbær til cheesecake med bær." },
  { kategori: "bagvaerk",  slug: "gaerdej",  navn: "Gærdej",   beskrivelse: "Boller, snurrer, hveder og pølsehorn med gær." },
  { kategori: "bagvaerk",  slug: "surdej",   navn: "Surdej",   beskrivelse: "Surdejsbrød med lang hævning, fra ristet sesam til mørk chokolade." },
  { kategori: "desserter", slug: "pandekager", navn: "Pandekager", beskrivelse: "Pandekager til morgenmad og dessert, fra de klassiske til kakao, banan og citron med birkes." },
  { kategori: "desserter", slug: "frugtdesserter", navn: "Frugtdesserter", beskrivelse: "Desserter med frugt og bær, fra gammeldags æblekage til sommerdessert med ananas." },
  { kategori: "desserter", slug: "tiramisu", navn: "Tiramisu", beskrivelse: "Klassisk tiramisu og en frisk udgave med hindbær." },
  { kategori: "kager",     slug: "cookies",  navn: "Cookies",  beskrivelse: "Cookies, småkager og cookie cups." },
  { kategori: "kager",     slug: "brownies-og-kagekugler", navn: "Brownies og kagekugler", beskrivelse: "Brownie, browniekugler og romkugler." },
];

export const underkategorierAf = (kategori: string): Underkategori[] =>
  UNDERKATEGORIER.filter((u) => u.kategori === kategori);

export const underkategoriAf = (kategori: string, slug: string | null | undefined): Underkategori | null =>
  (slug && UNDERKATEGORIER.find((u) => u.kategori === kategori && u.slug === slug)) || null;

export const kategoriAfSlug = (slug: string): Kategori => {
  const k = KATEGORIER.find((k) => k.slug === slug);
  if (!k) throw new Error(`Ukendt kategori: ${slug}`);
  return k;
};

/** Naboer til "se også"-links på kategorisider (spec §4 pkt. 7). */
export const naboKategorier = (slug: string): Kategori[] => {
  const i = KATEGORIER.findIndex((k) => k.slug === slug);
  return [KATEGORIER[(i + 1) % KATEGORIER.length], KATEGORIER[(i + 2) % KATEGORIER.length]];
};

export const DIAET_LABELS: Record<string, string> = {
  vegetarisk: "Vegetarisk",
  vegansk: "Vegansk",
  glutenfri: "Glutenfri",
};
