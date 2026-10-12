/* Klientside-filtre på kategorisider (spec §4): aktiv tid + diæt. Ingen server-roundtrip.
 *
 * Side 1 indeholder hele kategorien; kort uden for siden har data-ekstra og er skjult.
 * Uden filter vises kun sidens egne kort og pagineringen. Med et filter vises alle
 * matchende kort fra hele kategorien, og pagineringen skjules.
 * På side 2+ sender et filtervalg brugeren til side 1 med filtret i adressen.
 * Filtret gemmes i adressen (?tid=15-30&diaet=vegetarisk), så det kan deles og overlever "tilbage". */

const net = document.querySelector<HTMLElement>("[data-kort-net]");
const filtre = document.querySelector<HTMLElement>("[data-filtre]");
const tomBesked = document.querySelector<HTMLElement>("[data-filter-tom]");
const paginering = document.querySelector<HTMLElement>("[data-paginering]");

type Gruppe = "tid" | "diaet";

if (net && filtre) {
  const kort = Array.from(net.querySelectorAll<HTMLElement>(".kort"));
  const chips = Array.from(filtre.querySelectorAll<HTMLButtonElement>(".filter-chip"));
  const side = Number(filtre.dataset.side ?? "1");
  const basis = filtre.dataset.basis ?? location.pathname;
  const valgt: Record<Gruppe, Set<string>> = { tid: new Set(), diaet: new Set() };

  const gruppeAf = (chip: HTMLButtonElement): Gruppe => (chip.dataset.filterTid != null ? "tid" : "diaet");
  const vaerdiAf = (chip: HTMLButtonElement) => chip.dataset.filterTid ?? chip.dataset.filterDiaet ?? "";

  const soegeParametre = () => {
    const p = new URLSearchParams();
    if (valgt.tid.size) p.set("tid", [...valgt.tid].join(","));
    if (valgt.diaet.size) p.set("diaet", [...valgt.diaet].join(","));
    return p.toString();
  };

  const opdater = () => {
    const aktivt = valgt.tid.size > 0 || valgt.diaet.size > 0;
    let synlige = 0;
    for (const k of kort) {
      const tidOk = valgt.tid.size === 0 || valgt.tid.has(k.dataset.tid ?? "");
      const diaeter = (k.dataset.diaet ?? "").split(" ").filter(Boolean);
      const diaetOk = valgt.diaet.size === 0 || [...valgt.diaet].every((d) => diaeter.includes(d));
      const vis = aktivt ? tidOk && diaetOk : !k.hasAttribute("data-ekstra");
      k.hidden = !vis;
      if (vis) synlige++;
    }
    for (const chip of chips) chip.setAttribute("aria-pressed", String(valgt[gruppeAf(chip)].has(vaerdiAf(chip))));
    if (tomBesked) tomBesked.hidden = synlige > 0;
    if (paginering) paginering.hidden = aktivt;
    const q = soegeParametre();
    history.replaceState(history.state, "", q ? `${location.pathname}?${q}` : location.pathname);
  };

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      const saet = valgt[gruppeAf(chip)];
      const vaerdi = vaerdiAf(chip);
      if (saet.has(vaerdi)) saet.delete(vaerdi);
      else saet.add(vaerdi);
      // Side 2+ indeholder kun sine egne kort, så filtrering foregår på side 1.
      if (side > 1) {
        const q = soegeParametre();
        location.href = q ? `${basis}?${q}` : basis;
        return;
      }
      opdater();
    });
  }

  /* Forvalgt filter via adressen, fx ?tid=15-30 fra tidsindgangene på forsiden. */
  const fraUrl = new URLSearchParams(location.search);
  const kendte = new Set(chips.map((c) => `${gruppeAf(c)}:${vaerdiAf(c)}`));
  for (const gruppe of ["tid", "diaet"] as const) {
    for (const v of (fraUrl.get(gruppe) ?? "").split(",").filter(Boolean)) {
      if (kendte.has(`${gruppe}:${v}`)) valgt[gruppe].add(v);
    }
  }
  if (valgt.tid.size || valgt.diaet.size) {
    if (side > 1) location.replace(`${basis}?${soegeParametre()}`);
    else opdater();
  }
}
