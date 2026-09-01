// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Deploy-mål styres af workflowet:
//  - Uden eget domæne (GitHub Pages projekt-side): SITE_URL=https://<bruger>.github.io  BASE_PATH=/madlavning
//  - Med eget domæne (public/CNAME):               SITE_URL=https://www.merveholck.dk   BASE_PATH=/
const SITE = process.env.SITE_URL || "http://localhost:4321";
const BASE = process.env.BASE_PATH || "/";

/** Interne links i markdown-indhold ("/opskrifter/…") skal respektere BASE_PATH. */
function rehypeBasePrefix() {
  const praefiks = BASE.replace(/\/$/, "");
  return (tree) => {
    if (!praefiks) return;
    const gaa = (node) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && href.startsWith("/") && !href.startsWith(praefiks + "/")) {
          node.properties.href = praefiks + href;
        }
      }
      node.children?.forEach(gaa);
    };
    gaa(tree);
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "ignore",
  integrations: [sitemap()],
  image: {
    // Placeholder-billederne er genereret lokalt; rigtige fotos behandles på samme måde.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
  markdown: {
    rehypePlugins: [rehypeBasePrefix],
  },
});
