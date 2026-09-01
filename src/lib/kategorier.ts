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
  { slug: "bagvaerk",  navn: "Bagværk",  kortNavn: "Bagværk",  tagline: "Brød, boller og alt med gær" },
  { slug: "desserter", navn: "Desserter", kortNavn: "Desserter", tagline: "Det søde punktum på måltidet" },
  { slug: "kager",     navn: "Kager",     kortNavn: "Kager",     tagline: "Fra hverdagskage til fødselsdag" },
  { slug: "snacks",    navn: "Snacks",    kortNavn: "Snacks",    tagline: "Små sager til hyggen" },
  { slug: "pizza",     navn: "Pizza",     kortNavn: "Pizza",     tagline: "Dej, der fortjener tålmodighed" },
  { slug: "bagetips",  navn: "Bagetips",  kortNavn: "Bagetips",  tagline: "Teknik og tommelfingerregler", erArtikler: true },
];

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
