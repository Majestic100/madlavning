/**
 * Unikke tekster til kategorisiderne (spec §4): intro på 150-250 ord,
 * 2-3 SEO-blokke under griddet og FAQ med FAQPage-markup.
 */
export interface KategoriTekst {
  intro: string[];
  blokke: { overskrift: string; tekst: string }[];
  faq: { spoergsmaal: string; svar: string }[];
}

export const KATEGORITEKSTER: Record<string, KategoriTekst> = {
  bagvaerk: {
    intro: [
      "Bagværk er der, hvor det hele startede for mig, og der, hvor de fleste af mine opskrifter hører hjemme. Her finder du gærdeje i alle tempi: rundstykker, der passer sig selv i køleskabet natten over, kanelsnurrer til weekender med god tid, og fokaccia, der tilgiver dig næsten alt.",
      "Alle opskrifter er skrevet i gram, fordi en deciliter mel kan veje alt mellem 55 og 75 gram, og den forskel kan smages. Du får altid både tider og tegn: hvor længe dejen cirka skal hæve, og hvordan du kan se, at den er klar. Din ovn og min ovn er nemlig sjældent enige.",
    ],
    blokke: [
      {
        overskrift: "Koldhævning gør det tunge arbejde",
        tekst: "De fleste af mine gærdeje hæver på køl natten over. Det giver mere smag med mindre gær, og det flytter arbejdet hen, hvor det passer dig: ti minutter om aftenen i stedet for tre timers venten på en bagedag. Er koldhævning nyt for dig, så start med de koldhævede rundstykker. Det er den mest tilgivende dej, jeg kender.",
      },
      {
        overskrift: "Udstyret, du faktisk behøver",
        tekst: "En vægt, en dejskraber og en bageplade kommer du langt med. En røremaskine gør æltetunge deje som kanelsnurrer nemmere, men ingen af opskrifterne her kræver den. Hånden og lidt tålmodighed kan det samme. Et ovntermometer er til gengæld den bedste halvtredser, du kan bruge på dit bagværk.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg bruge tørgær i stedet for frisk gær?",
        svar: "Ja, i alle opskrifter. Brug cirka en tredjedel af mængden: 15 g frisk gær svarer til 5 g tørgær. Instant-tørgær blandes direkte i melet, almindelig tørgær vækkes først 10 minutter i lidt af den lunkne væske.",
      },
      {
        spoergsmaal: "Hvorfor hæver min dej ikke?",
        svar: "Oftest er der bare for koldt i rummet, og under 20 grader kan hævetiden sagtens fordobles. Stil skålen i ovnen med kun lampen tændt, og giv den mere tid. Hæver den stadig ingenting, kan gæren være for gammel.",
      },
      {
        spoergsmaal: "Kan jeg fryse hjemmebagt brød og boller?",
        svar: "Ja, og du bør. Frys samme dag som bagningen i en tæt pose, og lun ved 180 grader i 4-6 minutter direkte fra frost. Det giver et bedre resultat end tre dage i en brødkasse.",
      },
    ],
  },
  desserter: {
    intro: [
      "Desserter er den del af måltidet, folk husker, og heldigvis også den del, der bedst kan laves i forvejen. Herunder finder du mine gennemtestede favoritter: tiramisu som den laves i Italien, panna cotta med den helt rigtige blævre, og flere på vej.",
      "Jeg går efter desserter, der kan stå klar på køl, når gæsterne kommer, så du ikke står med et piskeris, mens alle andre hygger. Hver opskrift fortæller, hvor længe den skal sætte sig, hvor længe den holder, og hvor det typisk går galt.",
    ],
    blokke: [
      {
        overskrift: "Lav desserten dagen før",
        tekst: "Næsten alle desserter her vinder ved en nat på køl: tiramisuens lag smelter sammen, panna cottaen sætter sig, og du får en friere aften. Planlæg desserten først, når du inviterer gæster. Det er den ret, der bedst tåler at vente, og den, der er mest stressende at lave i sidste øjeblik.",
      },
      {
        overskrift: "Husblas, æg og de andre nervepirrende ingredienser",
        tekst: "De fleste dessertkatastrofer skyldes to ting: husblas, der har kogt, og kolde ingredienser, der møder varme for hurtigt. Begge dele er nemme at undgå, når man ved det, og derfor står den slags altid som sit eget trin i mine opskrifter i stedet for at gemme sig i en bisætning.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvor lang tid før må jeg lave desserten?",
        svar: "Tiramisu og panna cotta bliver faktisk bedre af at stå til dagen efter. Cremede desserter holder som regel 2-3 dage på køl, men vent med kakaodrys, sauce og pynt til lige før servering.",
      },
      {
        spoergsmaal: "Kan jeg lave desserterne uden husblas?",
        svar: "I panna cotta kan husblas erstattes af agar-agar (vegetabilsk), men doseringen er anderledes: cirka 1 tsk agar-pulver per 5 dl væske, og den skal koge med. Konsistensen bliver lidt fastere.",
      },
      {
        spoergsmaal: "Er rå æg i tiramisu sikre?",
        svar: "Brug pasteuriserede æg, så er der ingen risiko. De fås i alle supermarkeder og smager ens. Serverer du for gravide, små børn eller ældre, er det den rigtige løsning.",
      },
    ],
  },
  kager: {
    intro: [
      "Her samler jeg de kager, jeg selv vender tilbage til: brownien med den blanke, sprækkede top, gulerodskagen, jeg altid bliver bedt om at tage med, og de fødselsdagsklassikere, der kommer til efterhånden.",
      "Fælles for dem alle: de er skrevet i gram, de fortæller dig, hvordan du ser, at kagen er færdig, og de er testet mere end én gang i mit eget køkken. Kager er kemi mere end noget andet bagværk, så præcision betyder faktisk noget her. Til gengæld kræver ingen af dem mere end almindeligt køkkengrej og en almindelig eftermiddag.",
    ],
    blokke: [
      {
        overskrift: "Rør mindre, end du tror",
        tekst: "Ni ud af ti tørre, kompakte kager er rørt for meget. Når melet er kommet i, skal der vendes, og kun til dejen lige er samlet. Gluten er en gave i brød, men kagens fjende: Jo mere du rører, jo sejere bliver krummen.",
      },
      {
        overskrift: "Kagen er færdig, når kagen siger det",
        tekst: "Bagetider i opskrifter er startpunkter, ikke facit. Ovne lyver, forme leder varme forskelligt, og dej har forskellig temperatur. Stol på tegnene: en tandstik med fugtige krummer til brownies, en tør tandstik til gulerodskage, en kage der slipper formens kant. Uret siger bare, hvornår du skal begynde at kigge.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg halvere eller fordoble kageopskrifterne?",
        svar: "Ja. Brug portionsvælgeren på opskriften, så regner den mængderne om for dig. Husk, at bagetiden ikke skalerer med. En halveret brownie i en mindre form skal have næsten samme tid, bare med et tidligere første kig.",
      },
      {
        spoergsmaal: "Hvorfor falder min kage sammen i midten?",
        svar: "Oftest én af tre ting: ovnlågen blev åbnet for tidligt, kagen fik for lidt tid, eller der var for meget hævemiddel i. Vent med første kig til mindst tre fjerdedele af bagetiden er gået.",
      },
      {
        spoergsmaal: "Kan jeg bytte smør ud med olie?",
        svar: "Ikke en til en. Olie giver saftigere, tættere kager som gulerodskagen, mens smør giver smag og struktur. Følg det fedtstof, opskriften angiver, for det er valgt af en grund.",
      },
    ],
  },
  snacks: {
    intro: [
      "Snacks er det, jeg laver mest af uden at planlægge det: noget til fredagsfilmen, til madpakkerne eller til gæster, der kommer om en time. Herunder finder du både hurtige redninger som ostestænger af købebutterdej og faste følgesvende som dadelkugler, der holder ugen ud på køl.",
      "Kravene er de samme som til alt andet her på siden: få ingredienser, ærlige tider og opskrifter, der virker første gang. En snack må ikke være et projekt. Den skal lykkes, mens noget andet er i ovnen.",
    ],
    blokke: [
      {
        overskrift: "Snacks, der kan laves i forvejen",
        tekst: "Dadelkugler holder en uge på køl, ostestænger kan fryses ubagte og bages direkte fra frost. Lav en dobbelt portion, når du alligevel er i gang. Du vil takke dig selv den dag, der er gæster på vej og ingenting i huset.",
      },
      {
        overskrift: "Købebutterdej er ikke snyd",
        tekst: "God butterdej tager to dage at lave og tredive sekunder at købe. Jeg bruger den købte uden dårlig samvittighed og lægger i stedet arbejdet dér, hvor det kan smages, altså i fyldet, osten og krydringen.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvilke snacks egner sig til madpakken?",
        svar: "Dadelkugler er bygget til det. De tåler en formiddag i tasken og smager stadig godt. Ostestænger holder sig sprøde til dagen efter, hvis de opbevares i en dåse og ikke en pose.",
      },
      {
        spoergsmaal: "Hvad kan jeg servere for gæster med kort varsel?",
        svar: "Ostestængerne er klar på en halv time fra køleskab til fad. Har du en rulle butterdej og noget revet ost i huset, har du en snack.",
      },
      {
        spoergsmaal: "Er dadelkuglerne virkelig uden tilsat sukker?",
        svar: "Ja, sødmen kommer udelukkende fra dadlerne. De er stadig energitætte, og det er derfor, de mætter, men det er frugt, nødder og havregryn hele vejen igennem. De er både veganske og glutenfri.",
      },
    ],
  },
  pizza: {
    intro: [
      "Pizza herhjemme stod længe på valget mellem en dyr, kold leveret og en kedelig hurtigdej. Så begyndte jeg at behandle pizzadej som det, den er, nemlig et brød, der fortjener tid. Siden har vi stort set ikke bestilt.",
      "Kernen i det hele er den koldhævede dej: fire ingredienser og et døgn eller to i køleskabet. Ovenpå den finder du både klassikeren med tomat og dem, der overrasker, som pizza bianca med kartofler og rosmarin. Alt er skrevet til en almindelig husholdningsovn. Du behøver ikke en pizzaovn i haven, bare den varmeste indstilling din ovn har, og gerne et bagestål.",
    ],
    blokke: [
      {
        overskrift: "Varmen er halvdelen af pizzaen",
        tekst: "Et pizzeria bager ved 400-480 grader, og din ovn stopper ved 250-300. Du lukker hullet med masse: Et bagestål eller en bagesten, der er varmet op i mindst 45 minutter, afleverer et voldsomt varmeskud til bunden i samme sekund, dejen lander. Det er forskellen på en bleg bund og en, der er sprød og plettet som fra en rigtig ovn.",
      },
      {
        overskrift: "Mindre topping, bedre pizza",
        tekst: "Den hyppigste hjemmepizza-fejl er gavmildhed. Et tykt lag sauce og en håndfuld ost for meget gør bunden våd og kanten tung. Tænk i et tyndt, skrabet lag sauce, mindre ost end du har lyst til, og højst tre slags topping. Så kan dejen hæve, bunden riste og hver smag faktisk smages.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg bage pizzaen uden bagestål eller bagesten?",
        svar: "Ja. Vend en tyk bageplade på hovedet, og varm den grundigt op på ovnens øverste rille. Resultatet er ikke helt det samme, men det er tættere på, end du tror, og langt bedre end en kold plade.",
      },
      {
        spoergsmaal: "Hvor længe kan pizzadejen stå på køl?",
        svar: "24-72 timer. Efter et døgn er den god, efter to er den bedst, og på tredjedagen begynder den at blive slap og syrlig. Skal den vente længere, så frys kuglerne efter første døgn.",
      },
      {
        spoergsmaal: "Hvorfor trækker min dej sig sammen, når jeg strækker den?",
        svar: "Den er for kold. Tag dejkuglerne ud af køleskabet to timer før bagning. En stuetempereret dej slapper af og lader sig strække, mens en kold slår tilbage som en elastik.",
      },
    ],
  },
  bagetips: {
    intro: [
      "Bagetips er sidens værktøjskasse med korte forklaringer på, hvorfor dej opfører sig, som den gør, og hvad du gør, når den ikke gør det. Det er teknikken bag opskrifterne samlet ét sted, skrevet så du kan bruge det med melede fingre.",
      "Hver guide udspringer af en fejl, jeg selv har begået, fx brødet der ikke hævede, eller ovnen der viste sig at lyve med fyrre grader. Læs dem, når noget er gået galt, eller helst lidt før.",
    ],
    blokke: [
      {
        overskrift: "Forstå hvorfor, og opskrifterne bliver nemmere",
        tekst: "En opskrift fortæller dig, hvad du skal gøre. Ved du også hvorfor, kan du redde situationen, når virkeligheden afviger, fordi køkkenet er koldere, eller gæsterne kommer en time tidligere. Guiderne er korte med vilje, så du kan læse dem, mens dejen hviler.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvor skal jeg starte, hvis jeg er ny i bagning?",
        svar: "Læs guiden om gær, og bag så de koldhævede rundstykker. De kræver ingen æltning, næsten intet udstyr og tilgiver de fleste fejl. Undervejs lærer du de vaner, alt andet bagværk bygger på.",
      },
      {
        spoergsmaal: "Hvorfor er alle opskrifter i gram og ikke deciliter?",
        svar: "Fordi en deciliter mel kan veje alt fra 55 til 75 gram, alt efter hvor hårdt melet er pakket. Den forskel er nok til at ødelægge en kage. En køkkenvægt fjerner gætteriet, og du slipper for at vaske målebægre op.",
      },
      {
        spoergsmaal: "Kan jeg foreslå et emne til et bagetip?",
        svar: "Meget gerne. Skriv til mig via kontaktsiden eller Instagram. De bedste guider her er startet som spørgsmål fra læsere, hvis dej opførte sig mærkeligt.",
      },
    ],
  },
};
