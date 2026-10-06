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
      "Bagværk er gærdej i alle afskygninger: bløde kanelsnurrer, chokoladeboller til eftermiddagskaffen, gulerodsboller til madpakken og pølsehorn til børnefødselsdagen. Her finder du også mine briocheboller med fyld, fra vaniljecreme og jordbær til cheesecake med hindbær eller blåbær, og et surdejsbrød med store stykker mørk chokolade.",
      "Opskrifterne er skrevet i gram, og trinene fortæller både, hvor længe dejen cirka skal hæve, og hvordan den skal se ud. Hævetiden afhænger nemlig af, hvor varmt der er i dit køkken, så brug tiderne som pejlemærker og dejen som facit.",
    ],
    blokke: [
      {
        overskrift: "Én dej, mange boller",
        tekst: "Briochedejen går igen i flere af opskrifterne: 550-575 g hvedemel, sødmælk, gær, æg og blødt smør, der æltes ind lidt ad gangen. Har du bagt den én gang, kan du skifte fyldet ud efter sæson og humør. Vej gerne hele dejen, så bollerne bliver lige store og bager lige længe.",
      },
      {
        overskrift: "Smørret skal ind til sidst",
        tekst: "I de fleste af dejene ælter du først mel, væske og gær sammen, og tilsætter smørret bagefter, lidt ad gangen. Så får glutenen lov at udvikle sig, før fedtstoffet kommer til, og dejen bliver smidig og blank i stedet for fedtet. Dejen må gerne være en anelse klistret.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg bruge tørgær i stedet for frisk gær?",
        svar: "Ja. Brug cirka en tredjedel af mængden: 25 g frisk gær svarer til omkring 8 g tørgær. Instant-tørgær blandes direkte i melet, almindelig tørgær vækkes først 10 minutter i lidt af den lune væske.",
      },
      {
        spoergsmaal: "Hvorfor hæver min dej ikke?",
        svar: "Oftest er der bare for koldt i rummet, og under 20 grader kan hævetiden sagtens fordobles. Stil skålen et lunt sted, og giv den mere tid. Hæver den stadig ingenting, kan gæren være for gammel, eller mælken have været for varm.",
      },
      {
        spoergsmaal: "Kan jeg fryse boller og snurrer?",
        svar: "Ja. Frys dem samme dag, som de er bagt, i en tæt pose, og lun dem let i ovnen efter optøning. Så smager de næsten som nybagte.",
      },
    ],
  },
  desserter: {
    intro: [
      "Desserterne her er dem, der bliver lavet igen og igen: gammeldags æblekage med hjemmelavet æblekagerasp og flødeskum, og klassiske pandekager, der både kan være weekendmorgenmad, børnefødselsdag og en nem dessert efter aftensmaden.",
      "Begge kan forberedes i god tid. Æblegrøden og raspen laves hver for sig og samles lige før servering, så raspen holder sig sprød. Pandekagerne kan bages i forvejen og lunes let i ovnen, når de skal spises.",
    ],
    blokke: [
      {
        overskrift: "Saml desserten i sidste øjeblik",
        tekst: "Lagdelte desserter som æblekage er bedst, når de sprøde elementer møder de bløde lige før servering. Lav æblegrød og rasp dagen før, og saml det hele i glas eller en stor skål, når gæsterne er kommet.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg fryse æblegrøden?",
        svar: "Ja, æblegrød fryser fint. Kog gerne en større portion, og frys den i passende mængder.",
      },
      {
        spoergsmaal: "Hvordan holder jeg pandekagerne lune?",
        svar: "Stak dem på en tallerken under et rent viskestykke, eller lun dem kort i ovnen ved lav varme lige før servering.",
      },
    ],
  },
  kager: {
    intro: [
      "Her finder du småkager og kager til både hverdag og fest: cookies med mørk chokolade, kanelsneglecookies med swirls af remonce, cookie cups med pistaciecreme, studenterbrød med karamel og romkugler med marcipan.",
      "Flere af dem er gode til at bruge kagerester, for både romkugler og studenterbrød bygger på en romkuglemasse, du smager til efter dine egne præferencer. Cookiesene er skrevet i gram og vejes af i kugler, så de bliver lige store og bager ens.",
    ],
    blokke: [
      {
        overskrift: "Cookies bager videre på pladen",
        tekst: "Tag cookies ud, når kanterne er let gyldne og midten stadig ser blød ud. De bager færdigt på bagepladen i de første minutter, og det er det, der giver den sprøde kant og den saftige midte.",
      },
      {
        overskrift: "Rør dejen så lidt som muligt",
        tekst: "Når melet er kommet i cookiedejen, skal den kun røres, til den lige er samlet. Rører du for længe, bliver småkagerne seje og kompakte i stedet for møre.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvordan opbevarer jeg cookies?",
        svar: "I en dåse, så holder de sig sprøde. Pak dem først ned, når de er helt kolde, ellers bliver de bløde.",
      },
      {
        spoergsmaal: "Hvilke kagerester kan jeg bruge til romkugler?",
        svar: "Næsten alle. Brownie, chokoladekage og sukkerbrød fungerer fint. Smag massen til med marmelade, kakao og romessens, for mængden afhænger af, hvor søde og saftige dine kagerester er.",
      },
    ],
  },
  snacks: {
    intro: [
      "Snacks er det lille ekstra mellem måltiderne: dadelkugler med kaffe og mørk chokolade, kernecookies sødet med moden banan og chunky granola med kanel, der både kan være morgenmad og eftermiddagssnack.",
      "Fælles for dem er, at de er nemme at lave, kræver få ingredienser og kan laves i en større portion, så der er noget at tage af resten af ugen.",
    ],
    blokke: [
      {
        overskrift: "Lav en portion til hele ugen",
        tekst: "Granola holder sig i en tætsluttende beholder, og kernecookies kan ligge i en kagedåse eller på frost. Lav en dobbelt portion, når du alligevel er i gang.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Kan jeg skifte nødder og kerner ud i granolaen?",
        svar: "Ja. Brug de nødder og kerner, du kan lide eller har i skabet, men hold dig til den samlede mængde i opskriften, så forholdet mellem det tørre og smør og honning passer.",
      },
      {
        spoergsmaal: "Hvordan opbevarer jeg kernecookies?",
        svar: "I en kagedåse eller i fryseren. De kan spises kort efter, de er taget ud af fryseren, men mister lidt af sprødheden.",
      },
    ],
  },
  pizza: {
    intro: [
      "Pizza begynder med dejen. Den 48-timers pizzadej er inspireret af napolitansk pizza: mel med høj W-værdi, vand, salt og kun 2 gram tørgær, og så to døgn i køleskabet. Resultatet er en luftig kant og en bund med balance mellem sprødhed og blødhed.",
      "Ovenpå dejen finder du blandt andet Big Mac pizza med oksekød, iceberg, rå løg og hjemmelavet dressing, en af vores helt store favoritter og altid et hit, når der er gæster.",
    ],
    blokke: [
      {
        overskrift: "Lidt gær og lang tid",
        tekst: "Med så lidt gær er det tiden, der gør arbejdet. Den lange, kolde hævning giver smag og en dej, der er nem at strække. Tag dejkuglerne ud af køleskabet 45-60 minutter før bagning, alt efter hvor varmt der er.",
      },
      {
        overskrift: "Mel med høj W-værdi",
        tekst: "W-værdien fortæller, hvor stærkt melet er, og hvor godt det tåler en lang hævning. Pizzamel med høj W-værdi kan holde til to døgn i køleskabet uden at blive slapt.",
      },
    ],
    faq: [
      {
        spoergsmaal: "Hvorfor skal pizzadejen bestå en glutentest?",
        svar: "Fordi en veludviklet gluten er det, der holder på luften. Kan du trække dejen langt ud som tyggegummi, er den klar. Ellers så giv den et par minutter mere på røremaskinen.",
      },
      {
        spoergsmaal: "Hvor mange pizzaer giver dejen?",
        svar: "Seks kugler af cirka 260 g, altså seks pizzaer.",
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
        svar: "Læs guiden om gær, og bag så gulerodsbollerne. Dejen er nem at arbejde med, og undervejs lærer du de vaner, alt andet bagværk bygger på.",
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
