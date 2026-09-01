/**
 * JSON-LD-buildere (spec §7). Bygges som objekter og serialiseres ét sted,
 * så markup'en aldrig kan blive halvt udfyldt.
 */
import { getImage } from "astro:assets";
import { isoVarighed, totalTid } from "./tid.mjs";
import type { Forfatter } from "../data/forfattere";

type Crumb = { navn: string; url: string | null };

export function breadcrumbJsonLd(stier: Crumb[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: stier.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.navn,
      ...(s.url ? { item: new URL(s.url, siteUrl).href } : {}),
    })),
  };
}

export function faqJsonLd(faq: { spoergsmaal: string; svar: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.spoergsmaal,
      acceptedAnswer: { "@type": "Answer", text: f.svar },
    })),
  };
}

export function personJsonLd(f: Forfatter, siteUrl: string, portraetUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.navn,
    description: f.bio,
    url: siteUrl,
    image: new URL(portraetUrl, siteUrl).href,
    sameAs: f.sameAs,
    knowsAbout: ["Bagning", "Kager", "Desserter", "Pizza", "Madlavning"],
  };
}

interface RecipeJsonLdInput {
  data: any; // CollectionEntry<"opskrifter">["data"]
  url: string;
  siteUrl: string;
  forfatter: Forfatter;
  kategoriNavn: string;
}

/**
 * Fuldt Recipe-schema med billeder i 1:1, 4:3 og 16:9 (spec §7).
 * Ingen aggregateRating i v1 — falsk markup uden persisterede stemmer straffes.
 */
export async function recipeJsonLd({ data, url, siteUrl, forfatter, kategoriNavn }: RecipeJsonLdInput) {
  const crops = await Promise.all(
    [
      { width: 1200, height: 1200 }, // 1:1
      { width: 1200, height: 900 },  // 4:3
      { width: 1200, height: 675 },  // 16:9
    ].map((d) => getImage({ src: data.image.src, ...d, fit: "cover", format: "jpg" })),
  );

  const ingredienser = data.ingredients.flatMap((g: any) =>
    g.items.map((i: any) =>
      [i.amount, i.unit, i.name, i.note ? `(${i.note})` : null].filter(Boolean).join(" "),
    ),
  );

  const trin = data.instructions.flatMap((g: any) => g.steps.map((s: any) => s.text));

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: data.title,
    description: data.metaDescription,
    url: new URL(url, siteUrl).href,
    image: crops.map((c) => new URL(c.src, siteUrl).href),
    author: {
      "@type": "Person",
      name: forfatter.navn,
      url: new URL("/om/", siteUrl).href,
      sameAs: forfatter.sameAs,
    },
    datePublished: data.publishedAt.toISOString().slice(0, 10),
    ...(data.updatedAt ? { dateModified: data.updatedAt.toISOString().slice(0, 10) } : {}),
    inLanguage: "da-DK",
    prepTime: isoVarighed(data.prepTime + data.waitTime),
    cookTime: isoVarighed(data.cookTime),
    totalTime: isoVarighed(totalTid(data)),
    recipeYield: `${data.servings} ${data.servingsUnit}`,
    recipeCategory: kategoriNavn,
    recipeCuisine: data.cuisine,
    keywords: data.keywords.join(", "),
    recipeIngredient: ingredienser,
    recipeInstructions: data.instructions.flatMap((g: any, gi: number) =>
      g.steps.map((s: any, si: number) => ({
        "@type": "HowToStep",
        position: data.instructions.slice(0, gi).reduce((n: number, gg: any) => n + gg.steps.length, 0) + si + 1,
        text: s.text,
      })),
    ),
    ...(data.video
      ? {
          video: {
            "@type": "VideoObject",
            name: `${data.title} — se fremgangsmåden`,
            description: data.excerpt,
            embedUrl: `https://www.youtube-nocookie.com/embed/${data.video}`,
            contentUrl: `https://www.youtube.com/watch?v=${data.video}`,
            thumbnailUrl: `https://i.ytimg.com/vi/${data.video}/hqdefault.jpg`,
            uploadDate: data.publishedAt.toISOString().slice(0, 10),
          },
        }
      : {}),
  };
}
