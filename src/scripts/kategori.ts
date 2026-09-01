/* Klientside-filtre på kategorisider (spec §4): aktiv tid + diæt. Ingen server-roundtrip. */

const net = document.querySelector<HTMLElement>("[data-kort-net]");
const filtre = document.querySelector<HTMLElement>("[data-filtre]");
const tomBesked = document.querySelector<HTMLElement>("[data-filter-tom]");

if (net && filtre) {
  const kort = Array.from(net.querySelectorAll<HTMLElement>(".kort"));
  const valgt = { tid: new Set<string>(), diaet: new Set<string>() };

  const opdater = () => {
    let synlige = 0;
    for (const k of kort) {
      const tidOk = valgt.tid.size === 0 || valgt.tid.has(k.dataset.tid ?? "");
      const diaeter = (k.dataset.diaet ?? "").split(" ").filter(Boolean);
      const diaetOk = valgt.diaet.size === 0 || [...valgt.diaet].every((d) => diaeter.includes(d));
      const vis = tidOk && diaetOk;
      k.hidden = !vis;
      if (vis) synlige++;
    }
    if (tomBesked) tomBesked.hidden = synlige > 0;
  };

  filtre.querySelectorAll<HTMLButtonElement>(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const gruppe = chip.dataset.filterTid != null ? "tid" : "diaet";
      const vaerdi = chip.dataset.filterTid ?? chip.dataset.filterDiaet!;
      const saet = valgt[gruppe];
      if (saet.has(vaerdi)) saet.delete(vaerdi);
      else saet.add(vaerdi);
      chip.setAttribute("aria-pressed", String(saet.has(vaerdi)));
      opdater();
    });
  });
}

/* Forvalgt filter via ?tid=15-30 (tidsindgangene på forsiden) */
const oensketTid = new URLSearchParams(location.search).get("tid");
if (oensketTid && filtre) {
  filtre.querySelector<HTMLButtonElement>(`[data-filter-tid="${CSS.escape(oensketTid)}"]`)?.click();
}
