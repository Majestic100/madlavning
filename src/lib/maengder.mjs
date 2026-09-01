/**
 * Mængdeformatering og skalering (spec §2):
 * "Skalering runder pænt: 1,5 stk løg vises som '1½ stk', ikke '1.5'."
 */

/** Brøker vi gengiver som tegn. Rækkefølgen er ligegyldig — vi vælger nærmeste. */
const BROEKER = [
  [0.25, "¼"],
  [1 / 3, "⅓"],
  [0.5, "½"],
  [2 / 3, "⅔"],
  [0.75, "¾"],
];

/** Enheder hvor kvarte/halve giver mening i et køkken (1½ spsk, 2¼ dl …). */
const BROEK_ENHEDER = new Set(["stk", "spsk", "tsk", "dl", "fed", "bundt", "dåse", "kvist", null]);

/** Enheder der altid vises som hele tal (ingen ½ g på en husholdningsvægt). */
const HELTALS_ENHEDER = new Set(["g", "ml"]);

const DA = (n, dec) =>
  n.toLocaleString("da-DK", { minimumFractionDigits: 0, maximumFractionDigits: dec });

/**
 * Formatér en (evt. skaleret) mængde pænt til visning.
 * @param {number|null} amount
 * @param {string|null} unit
 * @returns {string} fx "1½", "250", "0,8" — uden enhed
 */
export function formatAmount(amount, unit = null) {
  if (amount == null || !Number.isFinite(amount)) return "";

  if (HELTALS_ENHEDER.has(unit)) {
    return DA(Math.max(1, Math.round(amount)), 0);
  }

  if (unit === "kg" || unit === "l") {
    return DA(Math.round(amount * 100) / 100, 2);
  }

  if (BROEK_ENHEDER.has(unit)) {
    const hele = Math.floor(amount);
    const rest = amount - hele;

    // Find nærmeste "pæne" rest: 0, en brøk, eller 1.
    let bedste = { afvigelse: Math.min(rest, 1 - rest), tekst: rest < 0.5 ? "" : "+1" };
    for (const [vaerdi, tegn] of BROEKER) {
      const afvigelse = Math.abs(rest - vaerdi);
      if (afvigelse < bedste.afvigelse) bedste = { afvigelse, tekst: tegn };
    }

    // Stykvise ting (æg, fed hvidløg) rundes gavmildt — ingen laver 2,9 æg.
    // Skemål er præcise: ligger vi for langt fra en pæn brøk, viser vi decimalen ærligt.
    const tolerance = unit === "stk" || unit === "fed" ? 0.13 : 0.05;
    if (bedste.afvigelse > tolerance) return DA(Math.round(amount * 10) / 10, 1);

    if (bedste.tekst === "+1") return DA(hele + 1, 0);
    if (bedste.tekst === "") return hele === 0 ? DA(amount, 1) : DA(hele, 0);
    return hele === 0 ? bedste.tekst : `${DA(hele, 0)}${bedste.tekst}`;
  }

  return DA(Math.round(amount * 10) / 10, 1);
}

/**
 * Skalér en mængde med en faktor og formatér resultatet.
 * @param {number|null} amount @param {string|null} unit @param {number} faktor
 */
export function skalerOgFormater(amount, unit, faktor) {
  if (amount == null) return "";
  return formatAmount(amount * faktor, unit);
}
