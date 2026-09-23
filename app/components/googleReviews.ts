/**
 * Google-vélemények a Pohánka és Társa KFT nyilvános Google Cégprofiljáról, SZÓ SZERINT
 * (kimásolva 2026-09-23; Péter jóváhagyta a weboldalra emelést, Telegram 4311).
 * A helyesírást nem javítjuk. A Hóbor-vélemény két elírása a forrásban már javítva áll,
 * a tartalom változatlan. Pohánka József véleménye szándékosan NINCS itt (családi név).
 * Ez az egyetlen hely, ahol a szövegek élnek; a komponens csak megjeleníti őket.
 */
export type GoogleReview = {
  name: string;
  role?: string;
  url?: string;
  urlLabel?: string;
  featured?: boolean;
  paragraphs: string[];
};

/** A profil összesített értékelése a kimásoláskor: 5,0 átlag, 10 vélemény. */
export const GOOGLE_RATING = { average: 5, count: 10 } as const;

export const googleReviews: GoogleReview[] = [
  {
    "name": "Hetényi Renáta",
    "role": "kozmetika, Zalaegerszeg",
    "url": "https://hetenyirenata.com/",
    "urlLabel": "hetenyirenata.com",
    "featured": true,
    "paragraphs": [
      "Csak ajánlani tudom! 😊 Már az első egyeztetéstől kezdve nagyon segítőkész, türelmes és profi volt. Pontosan megértette, mit szeretnék, és egy gyönyörű, modern, átlátható weboldalt készített, ami teljes mértékben tükrözi a vállalkozásomat.",
      "Külön öröm számomra, hogy minden olyan funkciót sikerült megvalósítani, amit elképzeltem. Az online időpontfoglalás tökéletesen működik, az online ajándékutalvány-vásárlási lehetőség pedig szerintem óriási plusz, rengeteg vendégem használja és imádja.",
      "A weboldal nemcsak szép lett, hanem gyors, könnyen kezelhető és minden eszközön remekül működik. A közös munka során végig éreztem, hogy számára is fontos a végeredmény, mindig gyorsan reagált, jó ötletei voltak, és minden kérésemet megoldotta.",
      "Nagyon elégedett vagyok a végeredménnyel, és ha újra weboldalt kellene készíttetnem, gondolkodás nélkül őt választanám. Szívből ajánlom mindenkinek, aki igényes, profi és megbízható webfejlesztőt keres!"
    ]
  },
  {
    "name": "Alapítvány PontMás",
    "paragraphs": [
      "Profi szolgáltatást kaptam, eddig amit felhoztam neki, hogy milyen problémák nehezítik a mindennapi életünket, arra mind tudott megoldást. Az ügymeneteink jócskán rövidültek, sokkal több időnk van kreatívkodni, a rutinfeladatokat elvégzi helyettünk Pohánka és Társa. Csodás és magát eladó weboldalakat alkotnak. Ajánlom szeretettel!"
    ]
  },
  {
    "name": "Hóbor Krisztián",
    "role": "ügyvezető, Wood Business Hungary",
    "paragraphs": [
      "Egy minden tekintetben profi és korrekt hozzáállású céget ismertem meg a Pohánka és Társa KFT.-ben, akikkel mindenképpen hosszútávú együttműködésben gondolkozom és jó szívvel tudom őket ajánlani bárkinek!"
    ]
  },
  {
    "name": "Krisztian Kovacs",
    "paragraphs": [
      "Nagyon innovatív cég. Óriási megtakarítást és hatékonyságnövekedést köszönhetek nekik!"
    ]
  },
  {
    "name": "Krisztián Kovács",
    "paragraphs": [
      "Első osztályú kiszolgálás és maximális odafigyelés!!"
    ]
  }
];
