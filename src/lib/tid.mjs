/**
 * Tidsformatering. Tid gemmes ALTID i minutter (spec §2) og formateres ét sted —
 * Gourministeriets "1 time time 30 minutter minutter" er præcis den fejl,
 * denne fil (og dens tests) findes for at undgå.
 */

/** @param {number} minutter @returns {string} fx "50 min", "1 time", "1 time 30 min", "12 timer" */
export function formatMinutter(minutter) {
  if (!Number.isFinite(minutter) || minutter <= 0) return "0 min";
  const timer = Math.floor(minutter / 60);
  const rest = minutter % 60;
  if (timer === 0) return `${rest} min`;
  const timeDel = timer === 1 ? "1 time" : `${timer} timer`;
  return rest === 0 ? timeDel : `${timeDel} ${rest} min`;
}

/** ISO 8601-varighed til JSON-LD: 90 → "PT1H30M" (spec §7). */
export function isoVarighed(minutter) {
  if (!Number.isFinite(minutter) || minutter <= 0) return "PT0M";
  const timer = Math.floor(minutter / 60);
  const rest = minutter % 60;
  return `PT${timer > 0 ? `${timer}H` : ""}${rest > 0 ? `${rest}M` : ""}` || "PT0M";
}

/** Samlet tid udregnes — den gemmes aldrig manuelt (spec §2). */
export function totalTid({ prepTime = 0, cookTime = 0, waitTime = 0 }) {
  return prepTime + cookTime + waitTime;
}

/** Aktiv tid = tiden du reelt står i køkkenet (hævetid tæller ikke). */
export function aktivTid({ prepTime = 0, cookTime = 0 }) {
  return prepTime + cookTime;
}

export const TIDS_INTERVALLER = [
  { id: "0-15", label: "Under 15 min", min: 0, max: 15 },
  { id: "15-30", label: "15–30 min", min: 15, max: 30 },
  { id: "30-45", label: "30–45 min", min: 30, max: 45 },
  { id: "45-60", label: "45–60 min", min: 45, max: 60 },
  { id: "60+", label: "Over 1 time", min: 60, max: Infinity },
];

/** Hvilket interval falder en aktiv tid i? (Stinna-navigationen, spec §1) */
export function tidsInterval(aktivMinutter) {
  const fundet = TIDS_INTERVALLER.find((i) => aktivMinutter > i.min - 1 && aktivMinutter <= i.max);
  return fundet ?? /** @type {(typeof TIDS_INTERVALLER)[number]} */ (TIDS_INTERVALLER[TIDS_INTERVALLER.length - 1]);
}
