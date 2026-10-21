/* Global adfærd: menu og søgepanel. Siden virker uden JS. */

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

/* Dropdown med underkategorier i menuen */
const underPunkter = Array.from(document.querySelectorAll<HTMLElement>(".har-under"));
const lukUnder = (undtagen?: HTMLElement) => {
  for (const li of underPunkter) {
    if (li === undtagen) continue;
    li.setAttribute("data-aaben", "false");
    li.querySelector(".under-knap")?.setAttribute("aria-expanded", "false");
  }
};
for (const li of underPunkter) {
  const knap = $<HTMLButtonElement>(".under-knap", li);
  knap?.addEventListener("click", () => {
    const aaben = li.getAttribute("data-aaben") === "true";
    lukUnder(li);
    li.setAttribute("data-aaben", String(!aaben));
    knap.setAttribute("aria-expanded", String(!aaben));
    if (aaben) li.setAttribute("data-lukket", "");
  });
  /* data-lukket holder menuen lukket efter Escape/klik, selv om fokus eller musen stadig er der. */
  li.addEventListener("focusout", (e) => {
    if (!li.contains(e.relatedTarget as Node | null)) li.removeAttribute("data-lukket");
  });
  li.addEventListener("mouseleave", () => li.removeAttribute("data-lukket"));
}
if (underPunkter.length) {
  document.addEventListener("click", (e) => {
    if (!(e.target as Element).closest(".har-under")) lukUnder();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const aaben = underPunkter.find((li) => li.getAttribute("data-aaben") === "true" || li.contains(document.activeElement));
    if (!aaben) return;
    lukUnder();
    aaben.setAttribute("data-lukket", "");
    $<HTMLButtonElement>(".under-knap", aaben)?.focus();
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

