/** Alle interne links går gennem denne, så BASE_PATH (GitHub Pages projekt-side) altid respekteres. */
export function sti(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const opskriftSti = (id: string) => sti(`/opskrifter/${id}/`);
export const kategoriSti = (slug: string) =>
  slug === "bagetips" ? sti("/bagetips/") : sti(`/opskrifter/${slug}/`);
export const bagetipSti = (id: string) => sti(`/bagetips/${id}/`);
