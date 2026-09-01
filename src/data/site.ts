export const SITE = {
  navn: "Merve",
  titel: "Merve: opskrifter på bagværk, kager og pizza der virker",
  beskrivelse:
    "Gennemtestede opskrifter på bagværk, kager, desserter, snacks og pizza. Alt er skrevet i gram og uden reklamestøj, og bagetips forklarer teknikken bag.",
  slogan: "Opskrifter der virker. Også første gang.",
  /** Nyhedsbrevets konkrete løfte (spec §3 pkt. 12 + §1). Fast ugedag. */
  nyhedsbrevLoefte: "En ny opskrift hver lørdag morgen. Ingen spam, afmeld med ét klik.",
  /**
   * TODO (ESP): Indsæt formular-URL fra jeres nyhedsbrevssystem her, fx MailerLite
   * eller Mailchimp ("form action URL"). Tom streng = formularen viser en
   * forklarende besked i stedet for at sende ingenting.
   */
  nyhedsbrevAction: "",
} as const;
