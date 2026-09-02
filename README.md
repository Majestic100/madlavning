# Merve — madblog

Statisk madblog bygget med [Astro](https://astro.build): opskrifter på bagværk, kager,
desserter, snacks og pizza plus bagetips-guides. Udgives automatisk via GitHub Pages.

**Designet efter `madsite-spec.md`-principperne:** hurtig, ren opskriftsside uden
reklamestøj, alt indhold gratis, personligt brand synligt på hver side, og fuld Recipe/BreadcrumbList/FAQ JSON-LD til Google.

## Kom i gang lokalt

```bash
npm install
npm run dev        # udviklingsserver på http://localhost:4321
npm test           # unit-tests af mængde- og tidsformatering
npm run build      # produktion → dist/
```

## Sådan udgiver du (én gang)

1. Merge denne branch til `main`.
2. Gå til **Settings → Pages** i GitHub-repoet og sæt **Source** til **GitHub Actions**.
3. Hvert push til `main` bygger og udgiver nu automatisk.

Siden lander på `https://<brugernavn>.github.io/madlavning/`.

### Eget domæne (merveholck.dk)

1. Opret filen `public/CNAME` med én linje: `www.merveholck.dk`
2. Sæt en CNAME-record hos domæneudbyderen: `www` → `<brugernavn>.github.io`
3. Under **Settings → Pages** skrives domænet i **Custom domain** (og slå *Enforce HTTPS* til).

Workflowet opdager selv CNAME-filen og bygger med de rigtige URL'er.

## Sådan tilføjer du en opskrift

Opret en fil i `src/content/opskrifter/`, fx `citronmaane.md`. Filnavnet bliver URL'en
(`/opskrifter/citronmaane/`). Brug kun `a-z`, tal og bindestreger (æ→ae, ø→oe, å→aa).

Læg et **foto** i `src/assets/opskrifter/` med samme navn (`citronmaane.jpg`) —
4:3-format og mindst 1600 px bredt. Findes der ikke et foto, kan `npm run billeder`
generere et midlertidigt pladsholderbillede.

Skabelon (alle felter valideres ved build — mangler noget, fejler buildet med en forklaring):

```yaml
---
title: "Citronmåne med marcipan"
metaDescription: "Beskrivelse til Google, 50-155 tegn."
excerpt: "1-2 sætninger til opskriftskort og deling."
publishedAt: 2026-09-01
image:
  src: ../../assets/opskrifter/citronmaane.jpg
  alt: "Beskriv billedet til skærmlæsere og Google"
video: null            # evt. YouTube-ID (de 11 tegn efter watch?v=)
instagram: null        # evt. link til Instagram-opslag med fremgangsmåden
prepTime: 30           # minutter, aktivt arbejde
cookTime: 35           # minutter i ovn/på blus
waitTime: 0            # hæve-/hvile-/køletid i minutter
servings: 12
servingsUnit: "stykker"
difficulty: nem        # nem | mellem | avanceret
category: kager        # bagvaerk | desserter | kager | snacks | pizza
diet: []               # vegetarisk | vegansk | glutenfri
keywords: [citronmåne, marcipan]
storage: "Holder 3 dage i lufttæt dåse."
freezable: true
seasonal: false        # true = vises i "Sæsonens opskrifter" på forsiden
ingredients:
  - group: "Dej"       # group kan være null, hvis der kun er én gruppe
    items:
      - { amount: 200, unit: "g", name: "smør", note: "blødt" }
      - { amount: 2, unit: "stk", name: "æg" }
      - { amount: null, unit: null, name: "flagesalt" }   # "efter smag"
instructions:
  - group: null
    steps:
      - text: "Første trin …"
      - text: "Andet trin …"
tips:
  - "Det bedste råd til opskriften."
related: [gulerodskage]   # filnavne på beslægtede opskrifter (uden .md)
---

Din personlige intro i markdown — hvorfor betyder retten noget for dig?
```

**Vigtigt om mængder:** `amount` skal være et tal (brug `0.5`, ikke "½") og `unit` en af:
`g, kg, dl, ml, l, tsk, spsk, stk, fed, knivspids, bundt, dåse, kvist`.
Det er dét, der får portionsberegneren til at virke.

Bagetips-artikler fungerer på samme måde i `src/content/bagetips/` (enklere felter — se
de eksisterende filer).

## Instagram-sektionen på forsiden

Sektionen viser 4 kuraterede opslag som kort, der linker til Instagram. Der er ingen
live-integration med vilje: Metas embeds sporer besøgende (og ville kræve cookie-banner)
og gør siden langsommere. Nyt opslag på siden:

1. Gem opslagets billede i `src/assets/instagram/` (kvadratisk, min. 640 px)
2. Tilføj en blok øverst i listen i `src/data/instagram.ts` med billede, alt-tekst,
   link til opslaget og en kort tekst
3. Push til `main`, så er siden opdateret

## Ting, der venter på dig (TODO)

- **Sociale profiler:** Indsæt de rigtige Instagram/YouTube-links i `src/data/forfattere.ts`.
- **Portræt:** Erstat `src/assets/img/merve-portraet.jpg` med et rigtigt foto (kvadratisk,
  min. 1200 px) — det bruges i heroen, bylines og forfatterboksen.
- **Fotos:** Erstat pladsholderbillederne i `src/assets/opskrifter/` med rigtige fotos
  (samme filnavne, 4:3, min. 1600 px brede).
- **Kontakt-e-mail:** Indsæt på `src/pages/kontakt.astro`, når den er klar.
- **Instagram-opslag:** Skift pladsholderne i `src/data/instagram.ts` ud med rigtige
  opslag (billede + link), se afsnittet ovenfor.

## Kvalitetskrav (håndhæves af CI)

Hver pull request kører tests + Lighthouse og fejler under:
Performance 90 · Accessibility 95 · SEO 100. Målt ved denne version: 99 / 100 / 100 / 100.

## Struktur

```
src/
├── content/opskrifter/   ← opskrifterne (én .md-fil pr. opskrift)
├── content/bagetips/     ← guides/artikler
├── assets/opskrifter/    ← opskriftsfotos (matcher filnavne)
├── data/                 ← sitetekster, forfattere, kategoritekster/FAQ
├── components/           ← byggeklodser (kort, header, footer …)
├── components/sider/     ← opskriftsside- og kategoriside-templates
├── pages/                ← ruter (forside, søgning, RSS, sitemap …)
├── scripts/              ← klient-JS (skalering, filtre, søgning, cooking mode)
└── lib/                  ← delt logik (mængder, tid, JSON-LD) + tests i tests/
```
