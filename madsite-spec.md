# Madsite MVP: spec til Claude Code

Analyse af stinna.dk, gourministeriet.dk, mummum.dk og valdemarsro.dk, destilleret til en byggeklar spec.

**Rammer for denne spec:** MVP hvor opskriftssiden er gjort ordentligt. Personligt brand som vinkel. Repo på GitHub. Framework er ikke låst, så alt herunder er skrevet stack-agnostisk med Astro eller Next.js App Router som anbefalet default. Er stacken en anden, oversætter du strukturen, ikke ambitionsniveauet.

---

## 0. Den kritiske forudsætning, læs den før alt andet

De fire sites vinder ikke på features. De vinder på volumen og alder. Valdemarsro har 15 år og tusindvis af opskrifter. Gourministeriet skriver 2.100+ opskrifter på forsiden og har 349.000 følgere på Instagram. Mummum har 2.500+. Det er en trafikmur du ikke koder dig igennem.

Konsekvensen for MVP'en:

1. Byg ikke en kopi af Valdemarsro med 20 opskrifter. Det er en tom butik.
2. Vind på det de er dårlige til: hastighed, ren opskriftsside uden reklamestøj, og alt indhold gratis. Gourministeriet har lagt næringsindhold og favoritter bag betalingsmur. Det er en åbning.
3. Byg nyhedsbrev fra dag ét. Stinna.dk har ingen synlig tilmelding på forsiden. Det er den dyreste fejl af de fire.
4. Personligt brand betyder at ansigtet skal være synligt på hver opskriftsside, ikke kun i en about-boks i bunden.

Alt herunder er prioriteret efter det.

---

## 1. Hvad der er værd at kopiere, og hvad der ikke er

### Kopiér (høj værdi, lav kompleksitet)

| Element | Hvor det virker | Hvorfor |
|---|---|---|
| Ingredienser med afkrydsningsfelter | Gourministeriet, Stinna | Folk laver mad med telefonen i hånden. Gratis UX-gevinst. |
| Portionsskalering ("Ændre antal") | Gourministeriet | Fjerner hovedregning. Valdemarsro mangler det og taber på det. |
| Cooking mode / skærmen forbliver tændt | Gourministeriet, Stinna | Wake Lock API, 20 linjers kode, mærkbar effekt. |
| Stjernebedømmelse med antal stemmer | Alle fire | "4,77 fra 34 bedømmelser" er både social proof og rich snippet i Google. |
| Kommentarfelt med svar fra forfatteren | Valdemarsro (272 kommentarer), Stinna (43) | Den stærkeste tillidssignal på hele siden. Gratis unikt indhold til Google. |
| Navigation på tid, ikke kun kategori | Stinna ("0-15 min", "15-30 min" med antal) | Matcher hvordan folk faktisk vælger mad på en tirsdag. |
| Råvare-indeks | Valdemarsro | Løser "hvad gør jeg med den squash". Stærk intern linkstruktur. |
| SEO-tekstblokke plus FAQ nederst på kategorisider | Mummum | Kategorisider rammer de brede søgeord. Uden tekst rangerer de ikke. |
| Filtre på kategorisider (diæt, sæson, tid) | Mummum | Kan bygges klientside i MVP. |
| Print-knap med printvenligt layout | Alle fire | Billigt, og målgruppen bruger det. |
| Fast nyhedsbrev med kadence | Valdemarsro ("hver lørdag") | Konkret løfte konverterer bedre end "tilmeld nyhedsbrev". |

### Drop i v1 (høj kompleksitet, lav værdi før du har trafik)

- **Premium-medlemskab og betaling.** Valdemarsro og Gourministeriet kan det fordi de har målgruppen først. Du har ikke noget at sælge adgang til endnu.
- **Native app.** Nej.
- **Madplan og indkøbsliste.** Kræver brugerkonti og en database. Vent til nyhedsbrevet har abonnenter der beder om det.
- **Kogebogssalg.** Senere.
- **Instagram-embed på opskriftssider.** Gourministeriet gør det, og det koster layout shift og tredjepartsscripts. Link i stedet.
- **Reklamer.** Ikke før 20.000 sessioner om måneden. Før det ødelægger de oplevelsen for ingen indtjening.

### Direkte fejl hos de fire, som du ikke skal arve

- Gourministeriet viser "1 time time 30 minutter minutter" på opskriftssiden. Sjusk i template-variabler. Test dine tidsformateringer.
- Gourministeriet paywaller næringsindhold. Det læses som nærigt, ikke premium.
- Valdemarsros forside har 14 indholdssektioner i træk. Ingen ved hvad de skal klikke på. Hold din forside på maks 5.
- Stinna har ingen nyhedsbrevstilmelding på forsiden.
- Ingen af dem har trinvise billeder i instruktionerne. Der er en reel åbning for et bedre produkt, men det koster fotoarbejde per opskrift, så gør det kun på dine 10 vigtigste opskrifter.

---

## 2. Datamodel for en opskrift

Én kilde til sandhed. Markdown/MDX med frontmatter, eller JSON, alt efter stack. Feltnavnene herunder skal mappe 1:1 til JSON-LD Recipe schema, ellers ender du med dobbelt vedligeholdelse.

```yaml
slug: vegetarisk-paprikagryde
title: "Vegetarisk paprikagryde"
seoTitle: "Vegetarisk paprikagryde, nem gryderet på 50 minutter"
metaDescription: "..."          # maks 155 tegn
excerpt: "..."                  # 1-2 sætninger, bruges på kort og i OG
publishedAt: 2026-09-01
updatedAt: 2026-09-01
author: sinan                   # peger på authors.json
image:
  src: ./paprikagryde.jpg       # 4:3 originalfil, min 1600px bred
  alt: "..."
  credit: null
video: null                     # valgfrit, YouTube-ID

# Tid i minutter, aldrig som fritekst
prepTime: 20
cookTime: 30
totalTime: 50                   # udregnes, gemmes ikke manuelt

servings: 4
servingsUnit: "personer"
scalable: true

difficulty: nem                 # nem | mellem | avanceret
cuisine: "Dansk"
courseType: aftensmad           # morgenmad | frokost | aftensmad | tilbehoer | dessert | bagvaerk | snack | drikke
categories: [gryderetter, vegetarisk]
diet: [vegetarisk, glutenfri]   # kontrolleret liste
season: [efteraar, vinter]
occasion: [hverdag]
keywords: [gryderet, paprika, vegetar]

storage: "Holder 2 dage på køl"
freezable: true

# Ingredienser i grupper. Mængde ALTID som tal, så skalering virker.
ingredients:
  - group: "Gryderet"
    items:
      - { amount: 2, unit: "spsk", name: "olivenolie", note: null }
      - { amount: 1, unit: "stk", name: "løg", note: "hakket" }
      - { amount: 400, unit: "g", name: "hakkede tomater", note: null }
  - group: "Kartoffelmos"
    items:
      - { amount: 800, unit: "g", name: "kartofler", note: "skrællede" }

instructions:
  - group: "Gryderet"
    steps:
      - text: "Varm olien i en gryde ved middel varme."
        image: null
      - text: "Tilsæt løg og steg 5 minutter."
        image: null

tips:
  - "Byt paprika ud med squash om sommeren."

nutrition:                      # per portion, valgfrit men vis det gratis
  calories: 420
  protein: 14
  carbohydrates: 52
  fat: 16
  fiber: 9

rating:
  average: 4.77
  count: 34

related: [vegetarisk-vintergryde, cremet-tomatsuppe]
```

**Krav til implementeringen:**

- Valider frontmatter ved build. En opskrift uden `alt`-tekst, `totalTime` eller `image` skal fejle buildet, ikke publiceres tom.
- `unit` skal komme fra en kontrolleret liste (`g`, `kg`, `dl`, `ml`, `l`, `tsk`, `spsk`, `stk`, `fed`, `knivspids`, `bundt`, `dåse`). Fritekst-enheder ødelægger skalering og indkøbsliste senere.
- Skalering runder pænt: 1,5 stk løg vises som "1½ stk", ikke "1.5". Skriv en `formatAmount()` hjælpefunktion og unit-test den.

---

## 3. Opskriftssiden, øverst til nederst

Dette er sidens vigtigste template. Ingen anden side betyder noget i sammenligning.

1. **Brødkrumme.** Forside > Aftensmad > Gryderetter. Med BreadcrumbList JSON-LD.
2. **H1 med opskriftsnavn.**
3. **Forfatterbyline med foto.** Navn, dato, opdateret-dato. Dette er personlig-brand-krogen og den skal være over folden.
4. **Stjernevurdering med antal stemmer**, klikbar til bedømmelsessektionen.
5. **Hero-billede**, 4:3, `fetchpriority="high"`, ingen lazy loading. Dette er LCP-elementet.
6. **Handlingsrække:** Gem (localStorage i v1, ingen login), Print, Del, Cooking mode.
7. **"Gå til opskrift"-knap.** Skal springe til `#opskrift`. Ikke til diskussion. Folk kommer fra Google og vil ikke læse din intro.
8. **Intro, 2 til 4 afsnit.** Personlig, ikke SEO-fyld. Her adskiller du dig fra generiske sites. Skriv hvorfor retten betyder noget for dig.
9. **Opskriftskort** (`id="opskrift"`, visuelt afgrænset med ramme eller baggrundsfarve):
   - Metadata-linje: forberedelsestid, tilberedningstid, samlet tid, portioner, sværhedsgrad
   - Portionsskalering: minus/plus eller inputfelt, opdaterer alle mængder øjeblikkeligt uden reload
   - Ingredienser i grupper, hver med checkbox, gennemstreget ved klik, tilstand gemt i sessionStorage
   - Fremgangsmåde som nummererede trin i grupper, hvert trin klikbart til at markere som færdigt
   - Tips-boks
   - Næringsindhold per portion, synligt og gratis
   - Opbevaring og fryseegnethed
10. **Bedømmelsesmodul.** Stjerner plus valgfri kommentar. Persistér i en simpel backend (Supabase, D1, eller en Netlify/Vercel-funktion mod KV). Uden persistens er stjernerne pynt og Google straffer falsk markup.
11. **Kommentarfelt.** Med svar fra dig. Brug en letvægtsløsning (Giscus, Supabase-tabel, eller Cusdis). Undgå Disqus, det er tungt og reklamefyldt.
12. **Nyhedsbrevsblok** med konkret løfte: "Nye opskrifter hver [ugedag]. Ingen spam."
13. **Relaterede opskrifter**, 4 til 8 kort, fra `related` med automatisk fallback på delte kategorier.
14. **Forfatterboks** i bunden, kort bio plus link til Instagram.

**Layout:** Én kolonne, maks 720px læsebredde. Ingen sidebar. Ingen sticky-elementer der spiser skærmplads på mobil ud over eventuel bundnavigation.

---

## 4. Kategori- og listesider

Mummum gør dette bedst af de fire, og det er derfor de rangerer på brede søgeord.

Struktur:

1. H1 plus 1 til 2 afsnit intro (150 til 250 ord, unikt per kategori)
2. Filterrække: tid, diæt, sæson. Klientside i v1, ingen server-roundtrip
3. Opskriftskort i grid
4. Paginering, ikke uendelig scroll (uendelig scroll dræber crawlbarhed)
5. 2 til 3 SEO-tekstblokke under griddet med H2'er der rammer relaterede søgeord
6. FAQ-sektion med FAQPage JSON-LD
7. Links til nabo-kategorier

**Opskriftskort skal indeholde:** billede (4:3, lazy loaded, eksplicit width/height), titel, samlet tid, stjernevurdering. Ikke mere. Kort med brødtekst tvinger færre kort over folden.

**Taksonomi (hold den stram, fire akser):**

- Måltid: morgenmad, frokost, aftensmad, tilbehør, dessert, bagværk, snacks, drikke
- Tid: 0-15, 15-30, 30-45, 45-60, 60+ minutter (vis antal per bracket, som Stinna)
- Råvare: råvare-indeks, én side per hovedingrediens
- Anledning og diæt: hverdag, gæster, jul, påske, vegetarisk, glutenfri, budget

Byg ikke fem parallelle tagsystemer. Det bliver til tusindvis af tynde sider og gør dig sværere at crawle.

---

## 5. Søgning

Gourministeriets ⌘K-palette er den bedste søgeoplevelse af de fire, og den er billig at bygge.

- Klientside-index med Pagefind (Astro) eller Fuse.js/FlexSearch, bygget ved build-tid
- Søger i titel, ingredienser og kategorier. Mummum søger i råvareindhold, og det er rigtigt, folk søger "hvad kan jeg lave med kikærter"
- Tastaturgenvej ⌘K / Ctrl+K plus synligt søgefelt i headeren
- Foruddefinerede populære søgninger som klikbare chips i tomt-tilstand
- Ingen søgeserver i MVP

---

## 6. Forside

Maks 5 sektioner. Valdemarsros 14 er en advarsel, ikke et forbillede.

1. Kort hero med dig, dit foto og én sætning om hvad siden er
2. Sæsonens opskrifter (skift manuelt 4 gange om året, ikke automatisk)
3. Nyeste opskrifter, 6 til 8 kort
4. Tidsbaserede indgange med antal ("Under 30 minutter, 47 opskrifter")
5. Nyhedsbrevsblok

Ikke over folden: kogebøger, samarbejder, Instagram-feed.

---

## 7. Teknisk SEO, ikke til forhandling

Dette er hvor du reelt kan slå etablerede sites, fordi de fleste danske madblogs er tunge WordPress-installationer.

- **Recipe JSON-LD på hver opskriftsside.** Fuld udfyldning: `name`, `image` (mindst 3 størrelsesforhold: 1:1, 4:3, 16:9), `author`, `datePublished`, `description`, `prepTime`/`cookTime`/`totalTime` i ISO 8601 (`PT20M`), `recipeYield`, `recipeCategory`, `recipeCuisine`, `keywords`, `recipeIngredient` som flad strengliste, `recipeInstructions` som `HowToStep`-array, `nutrition`, `aggregateRating`, `video` hvis relevant. Valider i Googles Rich Results Test som et build-step.
- **BreadcrumbList JSON-LD** på alle undersider.
- **FAQPage JSON-LD** på kategorisider med FAQ.
- **Person/Organization JSON-LD** på about-siden, med `sameAs` til dine sociale profiler. Vigtigt for personligt brand og E-E-A-T.
- **Billeder:** AVIF og WebP med JPEG-fallback, responsive `srcset`, eksplicit width/height på alt. Hero uden lazy loading, resten med.
- **Core Web Vitals-mål:** LCP under 2,0 s på 4G-mobil, CLS under 0,05, INP under 200 ms. Sæt en Lighthouse CI-gate i GitHub Actions så pull requests fejler under 90 i Performance.
- **Ingen tredjepartsscripts i v1** ud over analytics. Brug Plausible eller Umami, ikke GA4 plus GTM plus et cookiebanner.
- **sitemap.xml** genereret ved build, **robots.txt**, kanoniske URL'er, RSS-feed.
- **URL-struktur:** `/opskrifter/[slug]/` for opskrifter, `/opskrifter/[kategori]/` for kategorier. Flad og forudsigelig. Stinnas `.html`-endelser er en arv, ikke et forbillede.
- **404-side** med søgefelt og links til populære kategorier.

---

## 8. Personligt brand, konkret

Vinklen er valgt, så den skal implementeres og ikke bare nævnes.

- Forfatterfoto i bylinen på hver eneste opskrift, ikke kun i bunden
- Intro skrevet i første person med en reel grund til at retten er med
- About-side som en rigtig side med billeder og historie, ikke et afsnit
- Du svarer på kommentarer og det er synligt (Valdemarsro gør dette og det er en stor del af hendes styrke)
- Nyhedsbrev afsendt i dit navn med en fast ugedag
- Instagram-link i header og footer, men ingen embed

---

## 9. Prioriteret byggerækkefølge

**Fase 1, uden dette findes siden ikke:**

1. Content-model plus build-tids-validering
2. Opskriftsside-template med skalering, checkboxes, cooking mode, print
3. Recipe og BreadcrumbList JSON-LD
4. Kategorisider med filtre
5. Forside
6. Nyhedsbrevstilmelding, tilsluttet en rigtig ESP fra dag ét
7. sitemap, robots, RSS, 404, Lighthouse CI-gate

**Fase 2, når fase 1 kører og der er mindst 30 opskrifter:**

8. Søgning med ⌘K
9. Bedømmelser med persistens
10. Kommentarer
11. Råvare-indeks
12. Favoritter i localStorage

**Fase 3, kun når trafikken retfærdiggør det:**

13. Brugerkonti, indkøbsliste, madplan
14. Indtjening

---

## 10. Definition of done for MVP

- [ ] Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Googles Rich Results Test godkender Recipe-markup uden advarsler
- [ ] Portionsskalering giver korrekte og pænt formaterede brøker på alle opskrifter
- [ ] Alle billeder har alt-tekst, buildet fejler hvis ikke
- [ ] Printudskrift indeholder ingredienser og fremgangsmåde, intet andet
- [ ] Cooking mode holder skærmen tændt på iOS Safari og Android Chrome
- [ ] Nyhedsbrevsformular sender reelt til ESP og har dobbelt opt-in
- [ ] Siden er testet på en rigtig telefon i et køkken, med fedtede fingre. Det er ikke en joke, det er den faktiske brugssituation.

---

## Prompt til Claude Code

> Læs `madsite-spec.md` i roden af repoet. Byg fase 1 som beskrevet i afsnit 9.
>
> Start med at foreslå en konkret filstruktur og bekræft framework-valg med mig, før du skriver kode. Byg derefter i denne rækkefølge: content-model og validering, opskriftsside-template, JSON-LD, kategorisider, forside, nyhedsbrev, teknisk SEO.
>
> Efter hver færdig del: kør Lighthouse mod en lokal build og vis mig resultatet. Byg ikke noget fra fase 2 eller 3.
>
> Lav to eksempel-opskrifter med realistisk dansk indhold, så jeg kan se templaten virke i praksis.
