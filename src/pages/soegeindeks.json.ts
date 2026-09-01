/** Søgeindeks bygget ved build-tid (spec §5) — ingen søgeserver. */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getImage } from "astro:assets";
import { kategoriAfSlug } from "../lib/kategorier";
import { formatMinutter, totalTid } from "../lib/tid.mjs";

export const GET: APIRoute = async () => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const opskrifter = (await getCollection("opskrifter")).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
  const bagetips = await getCollection("bagetips");

  const poster = await Promise.all([
    ...opskrifter.map(async (o) => {
      const d = o.data;
      const billede = await getImage({ src: d.image.src, width: 640, height: 480, fit: "cover" });
      return {
        titel: d.title,
        url: `${base}/opskrifter/${o.id}/`,
        kategori: kategoriAfSlug(d.category).navn,
        resume: d.excerpt,
        billede: billede.src,
        alt: d.image.alt,
        tid: formatMinutter(totalTid(d)),
        ingredienser: d.ingredients.flatMap((g) => g.items.map((i) => i.name)).join(" "),
        noegleord: [...d.keywords, ...d.diet, ...d.occasion].join(" "),
      };
    }),
    ...bagetips.map(async (t) => {
      const d = t.data;
      const billede = await getImage({ src: d.image.src, width: 640, height: 480, fit: "cover" });
      return {
        titel: d.title,
        url: `${base}/bagetips/${t.id}/`,
        kategori: "Bagetips",
        resume: d.excerpt,
        billede: billede.src,
        alt: d.image.alt,
        tid: `${d.readingTime} min læsning`,
        ingredienser: "",
        noegleord: d.keywords.join(" "),
      };
    }),
  ]);

  return new Response(JSON.stringify(poster), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
