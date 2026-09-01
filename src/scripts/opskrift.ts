/* Opskriftssidens adfærd: portionsskalering, afkrydsning, cooking mode, del, video. */
import { skalerOgFormater } from "../lib/maengder.mjs";

const kort = document.querySelector<HTMLElement>(".o-kort");

/* ---------- Portionsskalering (spec §3 pkt. 9) ---------- */
const vaelger = document.querySelector<HTMLElement>("[data-portionsvaelger]");
if (vaelger && kort) {
  const basis = Number(kort.dataset.portioner) || 0;
  const visning = vaelger.querySelector("[data-antal]")!;
  const linjer = Array.from(kort.querySelectorAll<HTMLElement>("[data-amount]"));
  let aktuel = basis;

  const tegn = () => {
    const faktor = aktuel / basis;
    for (const el of linjer) {
      el.textContent = skalerOgFormater(Number(el.dataset.amount), el.dataset.unit || null, faktor);
    }
    visning.textContent = String(aktuel);
    vaelger.querySelectorAll<HTMLButtonElement>("button").forEach((b) => {
      b.disabled = Number(b.dataset.trin) < 0 && aktuel <= 1;
    });
  };

  if (basis > 0) {
    vaelger.querySelectorAll<HTMLButtonElement>("button").forEach((b) =>
      b.addEventListener("click", () => {
        aktuel = Math.max(1, aktuel + Number(b.dataset.trin));
        tegn();
      }),
    );
  }
}

/* ---------- Ingrediens-afkrydsning, husket i sessionStorage (spec §3) ---------- */
const boksNoegle = `merve-ingredienser:${location.pathname}`;
const bokse = Array.from(document.querySelectorAll<HTMLInputElement>(".i-liste input[type=checkbox]"));
if (bokse.length) {
  try {
    const gemt: number[] = JSON.parse(sessionStorage.getItem(boksNoegle) ?? "[]");
    gemt.forEach((i) => { if (bokse[i]) bokse[i].checked = true; });
  } catch { /* sessionStorage kan være blokeret — checkbokse virker stadig */ }
  bokse.forEach((boks) =>
    boks.addEventListener("change", () => {
      try {
        sessionStorage.setItem(boksNoegle, JSON.stringify(bokse.flatMap((b, i) => (b.checked ? [i] : []))));
      } catch { /* ignorér */ }
    }),
  );
}

/* ---------- Trin markeres som gjort ved klik ---------- */
document.querySelectorAll<HTMLElement>(".trin-liste li").forEach((li) => {
  li.addEventListener("click", () => {
    li.dataset.gjort = li.dataset.gjort === "true" ? "false" : "true";
  });
});

/* ---------- Cooking mode: skærmen forbliver tændt (Wake Lock API) ---------- */
const cookingKnap = document.querySelector<HTMLButtonElement>("[data-cooking-knap]");
if (cookingKnap) {
  let laas: WakeLockSentinel | null = null;

  const tag = async () => {
    try { laas = await navigator.wakeLock.request("screen"); } catch { /* lavt batteri e.l. */ }
  };
  const slip = async () => { await laas?.release().catch(() => {}); laas = null; };

  if (!("wakeLock" in navigator)) {
    cookingKnap.hidden = true; // ingen støtte (ældre browsere) — knappen forvirrer kun
  } else {
    cookingKnap.addEventListener("click", async () => {
      const aktiv = document.body.dataset.cooking === "true";
      document.body.dataset.cooking = String(!aktiv);
      cookingKnap.setAttribute("aria-pressed", String(!aktiv));
      if (aktiv) await slip(); else await tag();
    });
    // Wake lock ryger, når fanen forlades — tag den igen, når man kommer tilbage.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && document.body.dataset.cooking === "true") tag();
    });
  }
}

/* ---------- Del ---------- */
const delKnap = document.querySelector<HTMLButtonElement>("[data-del-knap]");
if (delKnap) {
  delKnap.addEventListener("click", async () => {
    const data = { title: document.title, url: location.href };
    if (navigator.share) {
      await navigator.share(data).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(data.url);
      const foer = delKnap.innerHTML;
      delKnap.textContent = "Link kopieret ✓";
      setTimeout(() => { delKnap.innerHTML = foer; }, 1800);
    } catch {
      prompt("Kopiér linket:", data.url);
    }
  });
}

/* ---------- YouTube: indlæses først ved klik (ingen tredjepartsscripts før da) ---------- */
document.querySelectorAll<HTMLButtonElement>("[data-youtube]").forEach((plakat) => {
  plakat.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${plakat.dataset.youtube}?autoplay=1&rel=0`;
    iframe.title = "Video med fremgangsmåden";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    plakat.replaceWith(iframe);
  });
});
