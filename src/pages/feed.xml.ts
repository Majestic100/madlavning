import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../data/site";

export const GET: APIRoute = async (context) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const opskrifter = await getCollection("opskrifter");
  const bagetips = await getCollection("bagetips");

  const poster = [
    ...opskrifter.map((o) => ({ ...o, url: `${base}/opskrifter/${o.id}/` })),
    ...bagetips.map((t) => ({ ...t, url: `${base}/bagetips/${t.id}/` })),
  ].sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: SITE.titel,
    description: SITE.beskrivelse,
    site: context.site!,
    items: poster.map((p) => ({
      title: p.data.title,
      description: p.data.excerpt,
      pubDate: p.data.publishedAt,
      link: p.url,
    })),
    customData: "<language>da-dk</language>",
  });
};
