// @ts-check
import { defineConfig, fontProviders } from "astro/config";
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
  // Gotham ligger lokalt (src/assets/fonts) som woff2, beskåret til latinske tegn.
  // Medium dækker 500–650 og Bold 651–900, så de eksisterende vægte i CSS rammer rigtigt.
  // Astro laver selv en metrik-tilpasset reservefont, så teksten ikke hopper, når Gotham loader.
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Gotham",
      cssVariable: "--font-gotham",
      fallbacks: ["Helvetica Neue", "Arial", "sans-serif"],
      display: "swap",
      options: {
        variants: [
          { src: ["./src/assets/fonts/gotham-book.woff2"], weight: "400", style: "normal" },
          { src: ["./src/assets/fonts/gotham-medium.woff2"], weight: "500 650", style: "normal" },
          { src: ["./src/assets/fonts/gotham-bold.woff2"], weight: "651 900", style: "normal" },
          { src: ["./src/assets/fonts/gotham-bold-italic.woff2"], weight: "651 900", style: "italic" },
        ],
      },
    },
  ],
  image: {
    // Placeholder-billederne er genereret lokalt; rigtige fotos behandles på samme måde.
    responsiveStyles: true,
    // Instagram-billeder fra Behold hentes ved build og lægges på siden selv.
    remotePatterns: [
      { protocol: "https", hostname: "behold.pictures" },
      { protocol: "https", hostname: "**.behold.pictures" },
    ],
  },
  build: {
    inlineStylesheets: "auto",
  },
  markdown: {
    rehypePlugins: [rehypeBasePrefix],
  },
});
