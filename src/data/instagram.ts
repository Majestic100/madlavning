/**
 * Kurateret Instagram-sektion på forsiden.
 *
 * Sådan opdaterer du den, når der er et nyt opslag:
 *  1. Gem opslagets billede i src/assets/instagram/ (kvadratisk, min. 640 px)
 *  2. Tilføj en blok øverst i listen herunder med billede, alt-tekst,
 *     link til selve opslaget og en kort tekst
 *  3. De 4 øverste vises. Push til main, så er siden opdateret.
 *
 * TODO: Billederne herunder er pladsholdere, og linkene peger på profilen.
 * Skift dem ud med rigtige opslag (link: https://www.instagram.com/p/KODEN/).
 */
import kanelsnurrer from "../assets/opskrifter/kanelsnurrer.jpg";
import pizzadej from "../assets/opskrifter/pizzadej-koldhaevet.jpg";
import brownies from "../assets/opskrifter/chokoladebrownies.jpg";
import fokaccia from "../assets/opskrifter/fokaccia.jpg";
import { FORFATTERE } from "./forfattere";

export interface InstagramOpslag {
  billede: ImageMetadata;
  alt: string;
  link: string;
  tekst: string;
}

export const INSTAGRAM_OPSLAG: InstagramOpslag[] = [
  {
    billede: kanelsnurrer,
    alt: "Kanelsnurrer på vej i ovnen",
    link: FORFATTERE.merve.instagram,
    tekst: "Weekendens snurrer, lige før ovnen",
  },
  {
    billede: pizzadej,
    alt: "Pizzadej efter to døgns koldhævning",
    link: FORFATTERE.merve.instagram,
    tekst: "48 timers hævning. Det var ventetiden værd",
  },
  {
    billede: brownies,
    alt: "Brownie skåret i stykker",
    link: FORFATTERE.merve.instagram,
    tekst: "Den blanke top lykkedes endelig",
  },
  {
    billede: fokaccia,
    alt: "Fokaccia med rosmarin lige ud af ovnen",
    link: FORFATTERE.merve.instagram,
    tekst: "Fredag betyder fokaccia",
  },
];
