export type Lang = "sq" | "sr";

export const languages: Record<Lang, string> = {
  sq: "Shqip",
  sr: "Srpski"
};

export const routes = [
  { href: "/", key: "home" },
  { href: "/sherbimet", key: "services" },
  { href: "/punimet", key: "gallery" },
  { href: "/oferta", key: "quote" },
  { href: "/rreth-nesh", key: "about" },
  { href: "/kontakt", key: "contact" }
] as const;

export const whatsapp = {
  display: "+381 62 1179556",
  number: "381621179556",
  facebook: "https://www.facebook.com/share/1ArFJktr9p/?mibextid=wwXIfr",
  location: "Raincë / Lugina e Preshevës"
};

export const categoryKeys = [
  "ALL",
  "BATHROOM",
  "TILED_SINK",
  "KITCHEN",
  "FLOOR",
  "TERRACE",
  "YARD",
  "STAIRS",
  "TECHNICAL",
  "POOL",
  "OTHER"
] as const;

export type CategoryKey = (typeof categoryKeys)[number];
export const editableCategoryKeys = categoryKeys.filter((key) => key !== "ALL") as Exclude<CategoryKey, "ALL">[];

export const copy = {
  sq: {
    nav: {
      home: "Ballina",
      services: "Shërbimet",
      gallery: "Punimet tona",
      quote: "Kërko ofertë",
      about: "Rreth nesh",
      contact: "Kontakt"
    },
    hero: {
      title: "Niki Keramik - Pllaka, banjo dhe ujësjellës në Luginë të Preshevës",
      subtitle:
        "Punë profesionale për banjo, kuzhina, dysheme, terasa, oborre dhe instalime sanitare në Luginë të Preshevës, Bujanoc dhe rrethinë.",
      quote: "Kërko ofertë",
      whatsapp: "WhatsApp",
      gallery: "Shiko punimet",
      badge: "Punime premium me pllaka, gurë dhe instalime"
    },
    trust: ["20+ vite përvojë", "Punë të pastra", "Oferta sipas matjes", "Lugina e Preshevës & Bujanoc"],
    homeIntro: {
      eyebrow: "Pllaka, sanitari dhe punime teknike",
      title: "Punime të sakta, pamje moderne dhe përfundim që zgjat.",
      body:
        "Nga banjot moderne deri te oborret, terasat dhe instalimet teknike, Niki Keramik kujdeset për detajin që shihet dhe punën që mban."
    },
    pages: {
      servicesTitle: "Shërbimet",
      servicesLead:
        "Shërbime për pllaka, banjo, kuzhina, ujësjellës, oborre dhe instalime teknike në Luginë të Preshevës dhe Bujanoc.",
      galleryTitle: "Punimet tona",
      galleryLead: "Shikoni projektet e zgjedhura dhe filtroni sipas llojit të punës.",
      quoteTitle: "Kërko ofertë",
      quoteLead: "Dërgo të dhënat kryesore të punës dhe Niki Keramik do t'ju kontaktojë për konfirmim.",
      aboutTitle: "Rreth nesh",
      aboutLead:
        "Niki Keramik është biznes për pllaka, renovim banjoje, ujësjellës, instalime sanitare dhe punime të jashtme në Raincë, Luginë të Preshevës.",
      contactTitle: "Kontakt",
      contactLead: "Për ofertë, matje ose këshillim rreth punës, kontaktoni direkt në telefon ose WhatsApp."
    },
    serviceArea: "Lugina e Preshevës, Bujanoc dhe rrethina",
    services: [
      "Vendosje pllakash",
      "Renovim banjoje",
      "Instalime ujësjellësi",
      "Riparime sanitare",
      "Pllaka dyshemeje",
      "Pllaka muri",
      "Terasa",
      "Kuzhina",
      "Dush modern / walk-in",
      "Hidroizolim banjoje",
      "Pllaka të mëdha",
      "Prerje 45°",
      "Fugë epokside",
      "Lavaman me pllaka sipas masës",
      "Punime të jashtme dhe oborre",
      "Shtruarje pllakash të jashtme",
      "Shkallë dhe hyrje shtëpie",
      "Shtigje rreth shtëpisë",
      "Gurë dekorativë",
      "Instalime teknike",
      "Linja për ajër të kompresuar"
    ],
    highlights: {
      customSinkTitle: "Lavamanë me pllaka sipas masës",
      customSink:
        "Punojmë lavamanë modernë me pllaka, sipas masës dhe stilit të banjos. Mund të përdoren edhe pllakat që teprojnë, që banjoja të duket më unike, moderne dhe elegante.",
      exteriorTitle: "Oborre, terasa, shkallë dhe hyrje",
      exterior:
        "Niki Keramik realizon edhe punime të jashtme rreth shtëpisë, si shtruarje pllakash në hyrje, shkallë, terasa, shtigje dhe kombinime me gurë dekorativë.",
      industrialTitle: "Instalime teknike",
      industrial:
        "Përveç punimeve me pllaka dhe sanitari, realizojmë edhe instalime teknike për objekte private dhe industriale, duke përfshirë linja uji dhe sisteme të ajrit të kompresuar."
    },
    prices: {
      title: "Çmime orientuese",
      preview: "Çmime orientuese pasqyruese. Oferta finale bëhet pas matjes dhe shikimit të punës.",
      items: [
        "Vendosje pllakash: nga 12 €/m²",
        "Veshje shkallësh: nga 15 €/m²",
        "Prerje 45° dhe punime speciale: sipas marrëveshjes",
        "Lavaman me pllaka sipas masës: sipas modelit",
        "Renovim banjoje: pas matjes dhe shikimit të punës",
        "Punime të jashtme / oborre: pas shikimit të vendit"
      ],
      note:
        "Çmimet janë orientuese. Çmimi final varet nga gjendja e vendit, lloji i pllakave, metrazhi dhe detajet e punës."
    },
    gallery: {
      featuredTitle: "Projekte të zgjedhura",
      note: "Fotot reale mund të shtohen dhe organizohen nga admin dashboard.",
      details: "Shiko detajet",
      close: "Mbyll",
      empty: "Ende nuk ka foto reale për këtë kategori.",
      categories: {
        ALL: "Të gjitha",
        BATHROOM: "Banjo",
        TILED_SINK: "Lavamanë me pllaka",
        KITCHEN: "Kuzhina",
        FLOOR: "Dysheme",
        TERRACE: "Terasa",
        YARD: "Oborre",
        STAIRS: "Shkallë",
        TECHNICAL: "Instalime teknike",
        POOL: "Pishina Niki",
        OTHER: "Të tjera"
      }
    },
    form: {
      steps: ["Kontakt", "Lloji i punës", "Detajet", "Dërgo kërkesën"],
      fields: {
        name: "Emri",
        phone: "Telefoni",
        whatsapp: "WhatsApp",
        location: "Fshati / qyteti",
        workType: "Lloji i punës",
        squareMeters: "Metra katrorë afërsisht",
        desiredDate: "Data e dëshiruar",
        materialStatus: "A e ka klienti materialin?",
        description: "Përshkrimi i punës",
        photos: "Ngarko foto"
      },
      submit: "Dërgo kërkesën",
      success: "Faleminderit. Kërkesa juaj u dërgua me sukses. Niki Keramik do t'ju kontaktojë për konfirmim.",
      error: "Kërkesa nuk u dërgua. Ju lutemi provoni përsëri ose shkruani në WhatsApp.",
      yes: "Po",
      no: "Jo",
      partial: "Pjesërisht / ende jo"
    },
    admin: {
      title: "Kërkesat për oferta",
      galleryTitle: "Menaxhimi i galerive",
      loginTitle: "Hyrje për admin",
      password: "Fjalëkalimi",
      login: "Hyr",
      logout: "Dil",
      notes: "Shënime",
      save: "Ruaj",
      empty: "Nuk ka kërkesa ende.",
      whatsapp: "WhatsApp",
      received: "Pranuar",
      quotes: "Kërkesat",
      gallery: "Galeria",
      addPhoto: "Shto foto të re",
      edit: "Ndrysho",
      delete: "Fshij",
      replacePhoto: "Zëvendëso foto",
      showHome: "Shfaq në ballinë",
      mainProject: "Vendos si projekt kryesor",
      featured: "Projekt i zgjedhur",
      hero: "Shfaq në hero slider",
      heroOrder: "Renditja në hero",
      priority: "Prioriteti",
      titleSq: "Titulli shqip",
      titleSr: "Titulli serbisht",
      descriptionSq: "Përshkrimi shqip",
      descriptionSr: "Përshkrimi serbisht",
      location: "Lokacioni",
      date: "Data",
      category: "Kategoria",
      tags: "Etiketa",
      image: "Foto kryesore",
      beforeImage: "Foto para",
      afterImage: "Foto pas",
      create: "Publiko foton",
      update: "Ruaj ndryshimet"
    },
    statuses: {
      NEW: "e re",
      CONTACTED: "kontaktuar",
      VISITED: "vizituar",
      OFFER_SENT: "oferta dërguar",
      ACCEPTED: "pranuar",
      REJECTED: "refuzuar"
    },
    whatsappMessage: "Përshëndetje Niki Keramik, dua të kërkoj një ofertë për punime."
  },
  sr: {
    nav: {
      home: "Početna",
      services: "Usluge",
      gallery: "Naši radovi",
      quote: "Zatraži ponudu",
      about: "O nama",
      contact: "Kontakt"
    },
    hero: {
      title: "Niki Keramik - pločice, kupatila i vodoinstalacije",
      subtitle:
        "Profesionalni radovi za kupatila, kuhinje, podove, terase, dvorišta i sanitarne instalacije u Preševskoj dolini, Bujanovcu i okolini.",
      quote: "Zatraži ponudu",
      whatsapp: "WhatsApp",
      gallery: "Pogledajte radove",
      badge: "Premium radovi sa pločicama, kamenom i instalacijama"
    },
    trust: ["20+ godina iskustva", "Čisti radovi", "Ponude nakon merenja", "Preševska dolina & Bujanovac"],
    homeIntro: {
      eyebrow: "Pločice, sanitarije i tehničke instalacije",
      title: "Precizni radovi, moderan izgled i završna obrada koja traje.",
      body:
        "Od modernih kupatila do dvorišta, terasa i tehničkih instalacija, Niki Keramik vodi računa o detalju koji se vidi i poslu koji traje."
    },
    pages: {
      servicesTitle: "Usluge",
      servicesLead:
        "Usluge za pločice, kupatila, kuhinje, vodoinstalacije, dvorišta i tehničke instalacije u Preševskoj dolini i Bujanovcu.",
      galleryTitle: "Naši radovi",
      galleryLead: "Pogledajte odabrane projekte i filtrirajte ih po tipu radova.",
      quoteTitle: "Zatraži ponudu",
      quoteLead: "Pošaljite osnovne podatke o radovima i Niki Keramik će vas kontaktirati radi potvrde.",
      aboutTitle: "O nama",
      aboutLead:
        "Niki Keramik je firma za pločice, renoviranje kupatila, vodoinstalacije, sanitarne instalacije i spoljašnje radove u Raincë, Preševska dolina.",
      contactTitle: "Kontakt",
      contactLead: "Za ponudu, merenje ili savet oko radova, kontaktirajte direktno telefonom ili preko WhatsApp-a."
    },
    serviceArea: "Preševska dolina, Bujanovac i okolina",
    services: [
      "Postavljanje pločica",
      "Renoviranje kupatila",
      "Vodoinstalaterski radovi",
      "Sanitarne popravke",
      "Podne pločice",
      "Zidne pločice",
      "Terase",
      "Kuhinje",
      "Walk-in tuš kabine",
      "Hidroizolacija kupatila",
      "Veliki formati pločica",
      "Sečenje pod 45°",
      "Epoksidna fuga",
      "Lavabo od pločica po meri",
      "Spoljašnji radovi i dvorišta",
      "Postavljanje spoljašnjih ploča",
      "Stepenice i ulazi",
      "Staze oko kuće",
      "Dekorativni kamen",
      "Tehničke instalacije",
      "Linije za komprimovani vazduh"
    ],
    highlights: {
      customSinkTitle: "Lavaboi od pločica po meri",
      customSink:
        "Izrađujemo moderne lavaboe od pločica po meri, u skladu sa stilom kupatila. Mogu se iskoristiti i preostale pločice, kako bi kupatilo izgledalo unikatno, moderno i elegantno.",
      exteriorTitle: "Dvorišta, terase, stepenice i ulazi",
      exterior:
        "Niki Keramik izvodi i spoljašnje radove oko kuće, kao što su postavljanje ploča na ulazu, stepenice, terase, staze i kombinacije sa dekorativnim kamenom.",
      industrialTitle: "Tehničke instalacije",
      industrial:
        "Pored radova sa pločicama i sanitarijama, izvodimo i tehničke instalacije za privatne i industrijske objekte, uključujući vodovodne linije i sisteme komprimovanog vazduha."
    },
    prices: {
      title: "Orijentacione cene",
      preview: "Orijentacione cene za planiranje. Konačna ponuda se pravi nakon merenja i pregleda.",
      items: [
        "Postavljanje pločica: od 12 €/m²",
        "Oblaganje stepenica: od 15 €/m²",
        "Sečenje pod 45° i specijalni radovi: po dogovoru",
        "Lavabo od pločica po meri: zavisi od modela",
        "Renoviranje kupatila: nakon merenja i pregleda radova",
        "Spoljašnji radovi / dvorišta: nakon pregleda terena"
      ],
      note:
        "Cene su orijentacione. Konačna cena zavisi od stanja terena, vrste pločica, kvadrature i detalja radova."
    },
    gallery: {
      featuredTitle: "Odabrani projekti",
      note: "Prave fotografije mogu da se dodaju i organizuju iz admin dashboard-a.",
      details: "Pogledaj detalje",
      close: "Zatvori",
      empty: "Još nema fotografija za ovu kategoriju.",
      categories: {
        ALL: "Sve",
        BATHROOM: "Kupatilo",
        TILED_SINK: "Lavaboi od pločica",
        KITCHEN: "Kuhinje",
        FLOOR: "Podovi",
        TERRACE: "Terase",
        YARD: "Dvorišta",
        STAIRS: "Stepenice",
        TECHNICAL: "Tehničke instalacije",
        POOL: "Pishina Niki",
        OTHER: "Ostalo"
      }
    },
    form: {
      steps: ["Kontakt", "Vrsta posla", "Detalji", "Pošalji zahtev"],
      fields: {
        name: "Ime",
        phone: "Telefon",
        whatsapp: "WhatsApp",
        location: "Selo / grad",
        workType: "Vrsta posla",
        squareMeters: "Približna kvadratura",
        desiredDate: "Željeni datum",
        materialStatus: "Da li klijent ima materijal?",
        description: "Opis radova",
        photos: "Dodaj fotografije"
      },
      submit: "Pošalji zahtev",
      success: "Hvala. Vaš zahtev je uspešno poslat. Niki Keramik će vas kontaktirati radi potvrde.",
      error: "Zahtev nije poslat. Molimo pokušajte ponovo ili pišite na WhatsApp.",
      yes: "Da",
      no: "Ne",
      partial: "Delimično / još ne"
    },
    admin: {
      title: "Zahtevi za ponudu",
      galleryTitle: "Upravljanje galerijom",
      loginTitle: "Admin prijava",
      password: "Lozinka",
      login: "Prijava",
      logout: "Odjava",
      notes: "Beleške",
      save: "Sačuvaj",
      empty: "Još nema zahteva.",
      whatsapp: "WhatsApp",
      received: "Primljeno",
      quotes: "Zahtevi",
      gallery: "Galerija",
      addPhoto: "Dodaj novu fotografiju",
      edit: "Izmeni",
      delete: "Obriši",
      replacePhoto: "Zameni fotografiju",
      showHome: "Prikaži na početnoj",
      mainProject: "Postavi kao glavni projekat",
      featured: "Odabrani projekat",
      hero: "Prikaži u hero slideru",
      heroOrder: "Redosled u hero",
      priority: "Prioritet",
      titleSq: "Naslov albanski",
      titleSr: "Naslov srpski",
      descriptionSq: "Opis albanski",
      descriptionSr: "Opis srpski",
      location: "Lokacija",
      date: "Datum",
      category: "Kategorija",
      tags: "Tagovi",
      image: "Glavna fotografija",
      beforeImage: "Fotografija pre",
      afterImage: "Fotografija posle",
      create: "Objavi fotografiju",
      update: "Sačuvaj izmene"
    },
    statuses: {
      NEW: "novo",
      CONTACTED: "kontaktirano",
      VISITED: "pregledano",
      OFFER_SENT: "ponuda poslata",
      ACCEPTED: "prihvaćeno",
      REJECTED: "odbijeno"
    },
    whatsappMessage: "Poštovanje Niki Keramik, želim da zatražim ponudu za radove."
  }
} as const;

export type Copy = (typeof copy)[Lang];

export const allStatuses = ["NEW", "CONTACTED", "VISITED", "OFFER_SENT", "ACCEPTED", "REJECTED"] as const;
