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

/* ---------- Flydende "Til opskriften" på mobil ---------- */
const flyd = document.querySelector<HTMLAnchorElement>("[data-flyd]");
if (flyd && kort && matchMedia("(max-width: 760px)").matches) {
  const opdater = () => {
    const r = kort.getBoundingClientRect();
    flyd.hidden = !(window.scrollY > 240 && r.top > window.innerHeight);
  };
  window.addEventListener("scroll", opdater, { passive: true });
  opdater();
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

/* ---------- Billedgalleri øverst (kun opskrifter med flere billeder) ---------- */
const galleri = document.querySelector<HTMLElement>("[data-galleri]");
if (galleri) {
  const spor = galleri.querySelector<HTMLElement>(".galleri-spor")!;
  const forrige = galleri.querySelector<HTMLButtonElement>("[data-galleri-forrige]")!;
  const naeste = galleri.querySelector<HTMLButtonElement>("[data-galleri-naeste]")!;
  const prikkerBoks = galleri.querySelector<HTMLElement>("[data-galleri-prikker]")!;
  const prikker = Array.from(prikkerBoks.querySelectorAll<HTMLButtonElement>("button"));
  const glat = window.matchMedia("(prefers-reduced-motion: no-preference)").matches ? "smooth" : "auto";

  const aktivt = () => Math.round(spor.scrollLeft / Math.max(spor.clientWidth, 1));
  const gaaTil = (i: number) => spor.scrollTo({ left: i * spor.clientWidth, behavior: glat });
  const opdater = () => {
    const i = aktivt();
    prikker.forEach((p, n) => (n === i ? p.setAttribute("aria-current", "true") : p.removeAttribute("aria-current")));
    forrige.disabled = i <= 0;
    naeste.disabled = i >= prikker.length - 1;
  };

  forrige.addEventListener("click", () => gaaTil(aktivt() - 1));
  naeste.addEventListener("click", () => gaaTil(aktivt() + 1));
  prikker.forEach((p, n) => p.addEventListener("click", () => gaaTil(n)));
  spor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); gaaTil(aktivt() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); gaaTil(aktivt() - 1); }
  });
  spor.addEventListener("scroll", opdater, { passive: true });
  window.addEventListener("resize", opdater);

  forrige.hidden = naeste.hidden = prikkerBoks.hidden = false;
  opdater();
}
