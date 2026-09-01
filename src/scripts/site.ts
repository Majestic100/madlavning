/* Global adfærd: menu, søgepanel, nyhedsbrev-fallback. Siden virker uden JS. */

const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);

/* Mobilmenu */
const menuKnap = $("#menu-knap");
const nav = $("#hoved-nav");
if (menuKnap && nav) {
  menuKnap.addEventListener("click", () => {
    const aaben = nav.getAttribute("data-aaben") === "true";
    nav.setAttribute("data-aaben", String(!aaben));
    menuKnap.setAttribute("aria-expanded", String(!aaben));
    menuKnap.setAttribute("aria-label", aaben ? "Åbn menu" : "Luk menu");
  });
}

/* Søgepanel i header */
const soegeKnap = $("#soege-knap");
const soegePanel = $("#soege-panel");
if (soegeKnap && soegePanel) {
  soegeKnap.addEventListener("click", () => {
    const aaben = soegePanel.getAttribute("data-aaben") === "true";
    soegePanel.setAttribute("data-aaben", String(!aaben));
    soegeKnap.setAttribute("aria-expanded", String(!aaben));
    if (!aaben) $<HTMLInputElement>("#header-soeg", soegePanel)?.focus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && soegePanel.getAttribute("data-aaben") === "true") {
      soegePanel.setAttribute("data-aaben", "false");
      soegeKnap.setAttribute("aria-expanded", "false");
      soegeKnap.focus();
    }
  });
}

/* Nyhedsbrev: uden konfigureret ESP forklarer formularen sig selv i stedet for at sende ingenting */
document.querySelectorAll<HTMLFormElement>("[data-nyhedsbrev]").forEach((form) => {
  if (form.dataset.klar === "ja") return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.innerHTML =
      '<p style="margin:0;color:#F6EFE9">Tilmeldingen er ikke koblet på et nyhedsbrevssystem endnu. ' +
      "Indsæt jeres formular-URL i <code>src/data/site.ts</code> (nyhedsbrevAction). Se README.</p>";
  });
});
