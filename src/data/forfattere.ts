import portraet from "../assets/img/merve-portraet.jpg";

export interface Forfatter {
  id: string;
  navn: string;
  rolle: string;
  bio: string;
  portraet: ImageMetadata;
  instagram: string;
  youtube: string;
  sameAs: string[];
}

export const FORFATTERE: Record<string, Forfatter> = {
  merve: {
    id: "merve",
    navn: "Merve Holck",
    rolle: "Bager og skriver alt her på siden",
    bio: "Jeg bager, fejler, retter til og skriver det ned, så du ikke behøver begå de samme fejl. Alle opskrifter er testet i mit eget køkken og skrevet i gram.",
    portraet,
    instagram: "https://www.instagram.com/merveholck/",
    // Tom streng = intet YouTube-ikon på siden. Indsæt kanalens URL, når den findes.
    youtube: "",
    get sameAs() {
      return [this.instagram, this.youtube].filter(Boolean);
    },
  },
};

export const forfatter = (id: string): Forfatter => FORFATTERE[id] ?? FORFATTERE.merve;
