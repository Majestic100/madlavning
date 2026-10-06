/**
 * Henter Merves seneste Instagram-opslag fra Behold, når siden bygges.
 *
 * Billederne downloades og komprimeres af Astro under byggeriet, så de
 * besøgende aldrig henter noget fra Instagram eller Behold (ingen cookies,
 * ingen tredjepartsscripts). Siden bygges om hver nat (se deploy.yml), så
 * nye opslag dukker op af sig selv.
 *
 * Fejler hentningen, returneres en tom liste, og sektionen viser kun
 * "Følg med"-knappen. Et nedbrud hos Behold kan altså aldrig vælte buildet.
 */

/** Feed oprettet på behold.so. Skift URL'en her, hvis feedet laves om. */
export const BEHOLD_FEED_URL = "https://feeds.behold.so/3uKIdSDiOjriVfEaJDYe";

export type OpslagsType = "billede" | "video" | "karrusel";

export interface InstagramOpslag {
  id: string;
  link: string;
  billede: string;
  bredde: number;
  hoejde: number;
  /** Kort uddrag af teksten til hover-laget. */
  tekst: string;
  alt: string;
  type: OpslagsType;
  dato: Date;
}

export interface InstagramFeed {
  brugernavn: string;
  foelgere: number | null;
  opslag: InstagramOpslag[];
}

interface BeholdStoerrelse { width: number; height: number; mediaUrl: string }
interface BeholdOpslag {
  id: string;
  permalink: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  prunedCaption?: string;
  caption?: string;
  sizes?: Partial<Record<"small" | "medium" | "large" | "full", BeholdStoerrelse>>;
}
interface BeholdFeed { username?: string; followersCount?: number; posts?: BeholdOpslag[] }

const TYPER: Record<BeholdOpslag["mediaType"], OpslagsType> = {
  IMAGE: "billede",
  VIDEO: "video",
  CAROUSEL_ALBUM: "karrusel",
};

/** Første linje af teksten uden emojis i enderne, afkortet ved et ord. */
export function uddrag(tekst: string, maks = 90): string {
  const linje = (tekst.split(/\n/).find((l) => l.trim()) ?? "").trim();
  const ren = linje.replace(/^[\p{Extended_Pictographic}\s]+|[\p{Extended_Pictographic}\s]+$/gu, "").trim();
  if (ren.length <= maks) return ren;
  const kort = ren.slice(0, maks);
  return kort.slice(0, kort.lastIndexOf(" ") > 40 ? kort.lastIndexOf(" ") : maks).replace(/[,.;:!?-]+$/, "") + "…";
}

let cache: Promise<InstagramFeed> | undefined;

/** Henter feedet én gang pr. build, uanset hvor mange sider der bruger det. */
export function hentInstagram(antal = 6): Promise<InstagramFeed> {
  cache ??= hent();
  return cache.then((f) => ({ ...f, opslag: f.opslag.slice(0, antal) }));
}

async function hent(): Promise<InstagramFeed> {
  const tom: InstagramFeed = { brugernavn: "merveholck", foelgere: null, opslag: [] };
  try {
    const svar = await fetch(BEHOLD_FEED_URL, { signal: AbortSignal.timeout(15_000) });
    if (!svar.ok) throw new Error(`HTTP ${svar.status}`);
    const data = (await svar.json()) as BeholdFeed;

    const opslag = (data.posts ?? []).flatMap((p): InstagramOpslag[] => {
      const str = p.sizes?.medium ?? p.sizes?.large ?? p.sizes?.small;
      if (!str?.mediaUrl || !p.permalink) return [];
      const type = TYPER[p.mediaType] ?? "billede";
      const tekst = uddrag(p.prunedCaption ?? p.caption ?? "");
      const navn = type === "video" ? "Reel" : "Opslag";
      return [{
        id: p.id,
        link: p.permalink,
        billede: str.mediaUrl,
        bredde: str.width,
        hoejde: str.height,
        tekst,
        alt: tekst ? `${navn} fra Instagram: ${tekst}` : `${navn} fra Merves Instagram`,
        type,
        dato: new Date(p.timestamp),
      }];
    });

    return {
      brugernavn: data.username ?? tom.brugernavn,
      foelgere: typeof data.followersCount === "number" ? data.followersCount : null,
      opslag,
    };
  } catch (fejl) {
    console.warn(`[instagram] Kunne ikke hente feedet, sektionen vises uden opslag: ${(fejl as Error).message}`);
    return tom;
  }
}
