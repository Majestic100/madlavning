/**
 * Genererer brandede pladsholderbilleder (1600×1200, 4:3) for alt indhold,
 * der endnu ikke har et rigtigt foto. Læg et rigtigt foto med samme filnavn
 * i src/assets/opskrifter/ (eller .../bagetips/), så vinder det — scriptet
 * overskriver aldrig eksisterende filer.
 *
 *   npm run billeder
 */
import { readdir, writeFile, access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const NUANCER = [
  ["#C9B5A5", "#AB978E"],
  ["#B99C82", "#9F7354"],
  ["#D8C6B4", "#B49C87"],
  ["#C2A98F", "#8F6B51"],
  ["#CBB39B", "#A48468"],
  ["#BFA58F", "#96755B"],
];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const pisker = (farve, opacity) => `
  <g stroke="${farve}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
    <path d="M 860 340 C 800 480, 740 620, 670 750"/>
    <path d="M 950 370 C 920 510, 870 650, 800 780"/>
    <path d="M 1030 420 C 1020 550, 980 680, 910 800"/>
    <path d="M 840 320 C 980 280, 1080 360, 1100 490"/>
    <path d="M 700 780 L 620 920" stroke-width="52"/>
  </g>
  <path d="M 840 340 C 760 300, 740 200, 820 160 C 880 130, 960 160, 960 230 C 1020 210, 1080 250, 1060 320 C 1040 390, 940 410, 870 370 Z"
        fill="#FFFDF8" fill-opacity="${opacity + 0.12}" stroke="${farve}" stroke-opacity="${opacity}" stroke-width="10"/>`;

function pladsholderSvg(slug, bredde = 1600, hoejde = 1200) {
  const [lys, moerk] = NUANCER[hash(slug) % NUANCER.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${bredde}" height="${hoejde}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${lys}"/>
      <stop offset="1" stop-color="${moerk}"/>
    </linearGradient>
    <radialGradient id="lys" cx="0.25" cy="0.12" r="0.9">
      <stop offset="0" stop-color="#FFF6EC" stop-opacity="0.55"/>
      <stop offset="0.6" stop-color="#FFF6EC" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${bredde}" height="${hoejde}" fill="url(#g)"/>
  <rect width="${bredde}" height="${hoejde}" fill="url(#lys)"/>
  <g transform="translate(${bredde / 2 - 860}, ${hoejde / 2 - 540}) scale(1.05)">
    ${pisker("#FFFFFF", 0.28)}
  </g>
  <text x="${bredde / 2}" y="${hoejde - 90}" text-anchor="middle"
        font-family="Georgia, serif" font-size="44" letter-spacing="14"
        fill="#FFFFFF" fill-opacity="0.55">MERVE</text>
</svg>`;
}

async function findes(fil) {
  try { await access(fil); return true; } catch { return false; }
}

async function lavTil(indholdsDir, billedDir) {
  await mkdir(billedDir, { recursive: true });
  let filer = [];
  try { filer = await readdir(indholdsDir); } catch { return; }
  for (const fil of filer.filter((f) => f.endsWith(".md"))) {
    const slug = fil.replace(/\.md$/, "");
    const maal = path.join(billedDir, `${slug}.jpg`);
    if (await findes(maal)) continue;
    await sharp(Buffer.from(pladsholderSvg(slug))).jpeg({ quality: 80, mozjpeg: true }).toFile(maal);
    console.log("lavet:", maal);
  }
}

await lavTil("src/content/opskrifter", "src/assets/opskrifter");
await lavTil("src/content/bagetips", "src/assets/bagetips");

// Portræt af Merve (kvadratisk) + standard delebillede
const portraet = "src/assets/img/merve-portraet.jpg";
if (!(await findes(portraet))) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#C9B5A5"/><stop offset="1" stop-color="#9F7354"/>
  </linearGradient></defs>
  <rect width="1200" height="1200" fill="url(#g)"/>
  <circle cx="600" cy="470" r="210" fill="#FFF6EC" fill-opacity="0.85"/>
  <path d="M 260 1200 C 300 850, 480 740, 600 740 C 720 740, 900 850, 940 1200 Z" fill="#FFF6EC" fill-opacity="0.85"/>
  <text x="600" y="1130" text-anchor="middle" font-family="Georgia, serif" font-size="40" letter-spacing="12" fill="#4F2D24" fill-opacity="0.6">MERVE HOLCK</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(portraet);
  console.log("lavet:", portraet);
}

const og = "src/assets/img/og-standard.jpg";
if (!(await findes(og))) {
  await sharp(Buffer.from(pladsholderSvg("merve-og", 1600, 838))).jpeg({ quality: 80 }).toFile(og);
  console.log("lavet:", og);
}
console.log("Færdig.");
