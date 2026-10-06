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

Sektionen viser Merves 6 seneste opslag og opdaterer sig selv. Den henter dem fra et gratis
feed hos [Behold](https://behold.so), når siden bygges (`src/lib/instagram.ts`).

- Billederne hentes og komprimeres under byggeriet og ligger på siden selv. Besøgende henter
  intet fra Instagram eller Behold, så der sættes ingen cookies, og siden forbliver hurtig.
- Reels og karruseller får et lille ikon i hjørnet. Alle opslag linker til Instagram.
- Siden bygges om hver nat (`schedule` i `.github/workflows/deploy.yml`), så nye opslag kommer
  med inden for et døgn. Vil du se et nyt opslag med det samme: Actions → "Byg og udgiv" →
  "Run workflow".
- Er Behold nede, bygges siden alligevel. Sektionen viser så kun "Følg med"-knappen.
- Feedet styres på behold.so. Laves det om, skal `BEHOLD_FEED_URL` i `src/lib/instagram.ts`
  opdateres.
- GitHub sætter natlige kørsler på pause, hvis der ikke har været aktivitet i repoet i 60 dage.
  Så kommer der en mail fra GitHub, og den kan slås til igen under Actions.

## Opskrifter fra den gamle merveholck.dk

De 21 opskrifter er hentet fra den gamle Webnode-side med tekst, ingredienser, trin og
originalbilleder. Merves egne tekster er bevaret ordret, og kun åbenlyse tastefejl er rettet.

- **Udledte felter:** Den gamle side havde ikke tider, portioner, sværhedsgrad, kategori eller
  nøgleord. De er udledt af opskrifternes egen tekst, fx "Lad den hæve i 1 time". Hvor teksten
  ikke siger det, er det et skøn. Det gælder portioner for kanelsneglecookies, æblekage,
  granola, studenterbrød og cookie cups, samt tiden for surdejsbrødet. Ret dem i
  frontmatter, hvis de ikke passer.
- **Intervaller:** "550-575 g hvedemel" skrives som `amount: 550, amountMax: 575`. Begge tal
  skaleres med portionsvælgeren.
- **Gamle adresser:** `/l/<slug>/`, `/blog-opskrifter/` og `/om-mig/` sender videre til de nye
  sider (`redirects` i `astro.config.mjs`). Det er vigtigt, når merveholck.dk flyttes hertil,
  så Google-placeringer og delte links bliver ved med at virke.
- **Mangler:** "Snurrer med smør" er ikke med, fordi trin 3 og 4 på den gamle side var
  Webnodes standardtekst. Dens gamle adresse sender videre til Bagværk, indtil den er skrevet
  færdig.

## Ting, der venter på dig (TODO)

- **Snurrer med smør:** Skriv trin 3 og 4 færdige, så kan opskriften komme med.
- **Udledte felter:** Tjek tider og portioner på de importerede opskrifter (se ovenfor).
- **Fotos til bagetips:** Billederne i `src/assets/bagetips/` er stadig pladsholdere.
- **Kontakt-e-mail:** Indsæt på `src/pages/kontakt.astro`, når den er klar.

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
