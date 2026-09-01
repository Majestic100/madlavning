/**
 * Unikke tekster til kategorisiderne (spec §4): intro på 150–250 ord,
 * 2–3 SEO-blokke under griddet og FAQ med FAQPage-markup.
 */
export interface KategoriTekst {
  intro: string[];
  blokke: { overskrift: string; tekst: string }[];
  faq: { spoergsmaal: string; svar: string }[];
}

export const KATEGORITEKSTER: Record<string, KategoriTekst> = {
  bagvaerk: {
    intro: [
      "Bagværk er der, hvor det hele startede for mig — og der, hvor de fleste af mine opskrifter hører hjemme. Her finder du gærdeje i alle tempi: rundstykker, der passer sig selv i køleskabet natten over, kanelsnurrer til weekender med god tid, og fokaccia, der tilgiver dig næsten alt.",
      "Alle opskrifter er skrevet i gram, fordi en deciliter mel kan veje alt mellem 55 og 75 gram — og den forskel kan smages. Du får altid både tider og tegn: hvor længe dejen cirka skal hæve, og hvordan du kan se, at den er klar. Din ovn og min ovn er nemlig sjældent enige.",
    ],
    blokke: [
      {
        overskrift: "Koldhævning gør det tunge arbejde",
        tekst: "De fleste af mine gærdeje hæver på køl natten over. Det giver mere smag med mindre gær, og det flytter arbejdet hen, hvor det passer dig: ti minutter om aftenen i stedet for tre timers venten på en bagedag. Er koldhævning nyt for dig, så start med de koldhævede rundstykker — det er den mest tilgivende dej, jeg kender.",
      },
      {
        overskrift: "Udstyret, du faktisk behøver",
        tekst: "En vægt, en dejskraber og en bageplade kommer du langt med. En røremaskine gør æltetunge deje som kanelsnurrer nemmere, men ingen af opskrifterne her kræver den — hånden og lidt tålmodighed kan det samme. Et ovntermometer er til gengæld den bedste halvtredser, du kan bruge på dit bagværk.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg bruge tørgær i stedet for frisk gær?",
        svar: "Ja, i alle opskrifter. Brug cirka en tredjedel af mængden: 15 g frisk gær svarer til 5 g tørgær. Instant-tørgær blandes direkte i melet, almindelig tørgær vækkes først 10 minutter i lidt af den lunkne væske.",
      },
      {
        spoergsmaal: "Hvorfor hæver min dej ikke?",
        svar: "Oftest er der bare for koldt i rummet — under 20 grader kan hævetiden sagtens fordobles. Stil skålen i ovnen med kun lampen tændt, og giv den mere tid. Hæver den stadig ingenting, kan gæren være for gammel.",
      },
      {
        spoergsmaal: "Kan jeg fryse hjemmebagt brød og boller?",
        svar: "Ja, og du bør. Frys samme dag som bagningen, i en tæt pose. Lun ved 180 grader i 4–6 minutter direkte fra frost — det giver et bedre resultat end tre dage i en brødkasse.",
      },
    ],
  },
  desserter: {
    intro: [
      "Desserter er den del af måltidet, hvor folk husker detaljerne — og heldigvis også den del, der bedst kan laves i forvejen. Herunder finder du mine gennemtestede favoritter: tiramisu som den laves i Italien, panna cotta med den helt rigtige blævre, og flere på vej.",
      "Jeg går efter desserter, der kan stå klar på køl, når gæsterne kommer, så du ikke står med et piskeris, mens alle andre hygger. Hver opskrift fortæller, hvor længe den skal sætte sig, hvor længe den holder — og hvor det typisk går galt, så du kan undgå det.",
    ],
    blokke: [
      {
        overskrift: "Lav desserten dagen før",
        tekst: "Næsten alle desserter her vinder ved en nat på køl: tiramisuens lag smelter sammen, panna cottaen sætter sig, og du får en friere aften. Planlæg desserten først, når du inviterer gæster — det er den ret, der bedst tåler at vente, og den, der er mest stressende at lave i sidste øjeblik.",
      },
      {
        overskrift: "Husblas, æg og de andre nervepirrende ingredienser",
        tekst: "De fleste dessertkatastrofer skyldes to ting: husblas, der har kogt, og kolde ingredienser, der møder varme for hurtigt. Begge dele er nemme at undgå, når man ved det — og derfor står den slags altid som sit eget trin i mine opskrifter i stedet for at gemme sig i en bisætning.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvor lang tid før må jeg lave desserten?",
        svar: "Tiramisu og panna cotta bliver faktisk bedre af at stå til dagen efter. Som tommelfingerregel holder cremede desserter på køl i 2–3 dage — men vent altid med kakaodrys, sauce og pynt til lige før servering.",
      },
      {
        spoergsmaal: "Kan jeg lave desserterne uden husblas?",
        svar: "I panna cotta kan husblas erstattes af agar-agar (vegetabilsk), men doseringen er anderledes — cirka 1 tsk agar-pulver per 5 dl væske, og den skal koge med. Konsistensen bliver lidt fastere.",
      },
      {
        spoergsmaal: "Er rå æg i tiramisu sikre?",
        svar: "Brug pasteuriserede æg, så er der ingen risiko — de fås i alle supermarkeder og smager ens. Serverer du for gravide, små børn eller ældre, er det den rigtige løsning.",
      },
    ],
  },
  kager: {
    intro: [
      "Kager er weekendens sprog. Her samler jeg dem, jeg selv vender tilbage til: brownien med den blanke, sprækkede top, gulerodskagen, jeg altid bliver bedt om at tage med, og de fødselsdagsklassikere, der kommer til efterhånden.",
      "Fælles for dem alle: de er skrevet i gram, de fortæller dig præcis, hvornår kagen er færdig — tandstik, krummer, tegn — og de er testet mere end én gang i mit eget køkken. Kager er kemi mere end noget andet bagværk, så her betyder præcision faktisk noget. Til gengæld lover jeg, at ingen af dem kræver mere end almindeligt køkkengrej og en almindelig eftermiddag.",
    ],
    blokke: [
      {
        overskrift: "Rør mindre, end du tror",
        tekst: "Ni ud af ti tørre, kompakte kager er rørt for meget. Når melet er kommet i, skal der vendes — kun til dejen lige er samlet, ikke et sekund mere. Glutenet, der er en gave i brød, er kagens fjende: jo mere du rører, jo sejere bliver krummen.",
      },
      {
        overskrift: "Kagen er færdig, når kagen siger det",
        tekst: "Bagetider i opskrifter er startpunkter, ikke facit. Ovne lyver, forme leder varme forskelligt, og dej har forskellig temperatur. Stol på tegnene: en tandstik med fugtige krummer til brownies, en tør tandstik til gulerodskage, en kage der slipper formens kant. Uret siger 'kig nu' — kagen siger 'tag mig ud'.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg halvere eller fordoble kageopskrifterne?",
        svar: "Ja — brug portionsvælgeren på opskriften, så regner den mængderne om for dig. Husk, at bagetiden ikke skalerer med: en halveret brownie i en mindre form skal have næsten samme tid, bare med tidligere første kig.",
      },
      {
        spoergsmaal: "Hvorfor falder min kage sammen i midten?",
        svar: "Oftest én af tre ting: ovnlågen blev åbnet for tidligt, kagen fik for lidt tid, eller der var for meget hævemiddel i. Vent med første kig til mindst tre fjerdedele af bagetiden er gået.",
      },
      {
        spoergsmaal: "Kan jeg bytte smør ud med olie?",
        svar: "Ikke en til en. Olie giver saftigere, tættere kager (som gulerodskagen), smør giver smag og struktur. Følg det fedtstof, opskriften angiver — det er valgt af en grund.",
      },
    ],
  },
  snacks: {
    intro: [
      "Snacks er det, jeg laver mest af uden at planlægge det: noget til fredagsfilmen, til madpakkerne, til gæster der kommer om en time. Herunder finder du både de hurtige redninger — ostestænger af købebutterdej — og de sunde faste følgesvende som dadelkugler, der holder ugen ud på køl.",
      "Kravene er de samme som til alt andet her på siden: få ingredienser, ærlige tider og opskrifter, der virker første gang. Snacks skal netop ikke være et projekt — de skal være det, der lykkes, mens noget andet er i ovnen.",
    ],
    blokke: [
      {
        overskrift: "Snacks, der kan laves i forvejen",
        tekst: "Dadelkugler holder en uge på køl, ostestænger kan fryses ubagte og bages direkte fra frost. Lav en dobbelt portion, når du alligevel er i gang — fremtidige dig, der har gæster på vej og ingenting i huset, vil takke dig.",
      },
      {
        overskrift: "Købebutterdej er ikke snyd",
        tekst: "God butterdej tager to dage at lave og tredive sekunder at købe. Jeg bruger den købte uden dårlig samvittighed og lægger arbejdet dér, hvor det kan smages: fyldet, osten, krydringen. Det er forskellen på at være snobbet og at være klog.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvilke snacks egner sig til madpakken?",
        svar: "Dadelkugler er bygget til det — de tåler en formiddag i tasken og smager stadig godt. Ostestænger holder sig sprøde til dagen efter, hvis de opbevares i en dåse, ikke en pose.",
      },
      {
        spoergsmaal: "Hvad kan jeg servere for gæster med kort varsel?",
        svar: "Ostestængerne er klar på en halv time fra køleskab til fad. Har du en rulle butterdej og noget revet ost i huset, har du en snack — resten er pynt.",
      },
      {
        spoergsmaal: "Er dadelkuglerne virkelig uden tilsat sukker?",
        svar: "Ja — sødmen kommer udelukkende fra dadlerne. De er stadig energitætte (det er derfor, de mætter), men det er frugt, nødder og havregryn hele vejen igennem, og de er både veganske og glutenfri.",
      },
    ],
  },
  pizza: {
    intro: [
      "Pizza herhjemme stod længe på valget mellem en dyr, kold leveret og en kedelig hurtigdej. Så begyndte jeg at behandle pizzadej som det, den er — et brød, der fortjener tid — og siden har vi stort set ikke bestilt.",
      "Kernen i det hele er den koldhævede dej: fire ingredienser og et døgn eller to i køleskabet. Ovenpå den finder du både klassikeren med tomat og de retninger, der overrasker — som pizza bianca med kartofler og rosmarin. Alt er skrevet til en almindelig husholdningsovn; du behøver ikke en pizzaovn i haven, bare den varmeste indstilling din ovn har, og gerne et bagestål.",
    ],
    blokke: [
      {
        overskrift: "Varmen er halvdelen af pizzaen",
        tekst: "Et pizzeria bager ved 400–480 grader, din ovn stopper ved 250–300. Du lukker hullet med masse: et bagestål eller en bagesten, varmet op i mindst 45 minutter, afleverer et voldsomt varmeskud til bunden i samme sekund, dejen lander. Det er forskellen på en bleg bund og en, der er sprød og plettet som fra en rigtig ovn.",
      },
      {
        overskrift: "Mindre topping, bedre pizza",
        tekst: "Den hyppigste hjemmepizza-fejl er gavmildhed. Et tykt lag sauce og en håndfuld ost for meget gør bunden våd og kanten tung. Tænk i et tyndt, skrabet lag sauce, mindre ost end du har lyst til, og maksimalt tre toppings — så kan dejen hæve, bunden riste og hver smag faktisk smages.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg bage pizzaen uden bagestål eller bagesten?",
        svar: "Ja — vend en tyk bageplade på hovedet, og varm den grundigt op på ovnens øverste rille. Resultatet er ikke helt det samme, men det er tættere på, end du tror, og langt bedre end en kold plade.",
      },
      {
        spoergsmaal: "Hvor længe kan pizzadejen stå på køl?",
        svar: "24–72 timer. Efter ét døgn er den god, efter to er den bedst, og på tredjedagen begynder den at blive slap og syrlig. Skal den vente længere, så frys kuglerne efter første døgn.",
      },
      {
        spoergsmaal: "Hvorfor trækker min dej sig sammen, når jeg strækker den?",
        svar: "Den er for kold. Tag dejkuglerne ud af køleskabet to timer før bagning — en stuetempereret dej slapper af og lader sig strække, en kold slår tilbage som en elastik.",
      },
    ],
  },
  bagetips: {
    intro: [
      "Bagetips er sidens værktøjskasse: de korte forklaringer på, hvorfor dej opfører sig, som den gør — og hvad du gør, når den ikke gør det. Det er teknikken bag alle opskrifterne samlet ét sted, skrevet så du kan bruge det med melede fingre.",
      "Hver guide udspringer af en fejl, jeg selv har begået: brødet der ikke hævede, kagen der faldt sammen, ovnen der viste sig at lyve med fyrre grader. Læs dem, når noget er gået galt — eller før, så det ikke gør.",
    ],
    blokke: [
      {
        overskrift: "Forstå hvorfor, og opskrifterne bliver nemmere",
        tekst: "En opskrift kan fortælle dig, hvad du skal gøre — men ved du hvorfor, kan du redde situationen, når virkeligheden afviger: køkkenet er koldere, melet et andet, gæsterne kommer en time tidligere. Det er dét, disse guider er til. De er korte med vilje; du skal kunne læse dem, mens dejen hviler.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvor skal jeg starte, hvis jeg er ny i bagning?",
        svar: "Læs guiden om gær, og bag så de koldhævede rundstykker. De kræver ingen æltning, næsten intet udstyr og tilgiver de fleste fejl — og undervejs lærer du de vaner, alt andet bagværk bygger på.",
      },
      {
        spoergsmaal: "Hvorfor er alle opskrifter i gram og ikke deciliter?",
        svar: "Fordi en deciliter mel kan veje alt fra 55 til 75 gram, alt efter hvor hårdt melet er pakket. Den forskel er nok til at ødelægge en kage. En køkkenvægt fjerner al gætteriet og opvasken fra målebægrene i samme hug.",
      },
      {
        spoergsmaal: "Kan jeg foreslå et emne til et bagetip?",
        svar: "Meget gerne — skriv til mig via kontaktsiden eller Instagram. De bedste guider her er startet som spørgsmål fra læsere, hvis dej opførte sig mærkeligt.",
      },
    ],
  },
};
