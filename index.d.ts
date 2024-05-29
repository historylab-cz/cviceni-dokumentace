/**
 *
 */
interface IActivity {
  /** Metadata ke cvičení */
  cviceni: IActivityMetadata;
  /** Obsah cvičení tedy jednotlivé slajdy */
  slajd: ISLide[];
}

interface IActivityMetadata {
  /** Existují dva typy verzí. */
  version: {
    /** Sémantická verze aplikace. Generovaná automaticky pomocí `npm release`. Je verzí aplikace jako takové. Tzn. všechny cvičení sdílí tuto hodnotu. */
    global: string;
    /** Inkrementalní verze obsahu (revize). Nezávisí na verzi aplikace. Jakákoliv úprava obsahu by se měla projevit na navýšení verze. Každé cvičení si udržuje tuto verzi samostatně. */
    content: number;
  };
  /** Vyuziva se k automatizovanemu deploymentu, na jaky server cviceni deployovat */
  katalog: Server[];
  /** Definice jazyka, ve kterém je cvičení připraveno zapsaná ve formátu ISO 639-1 */
  language: Language;
  /** Nazev cviceni. Nemusí být unikátní. */
  nazev: string;
  /** Slug se muze lisit od `nazev`, ale ocekava se, ze je to jen automaticky generovany slugified verze nazvu. Musí být unikátní.
   * @example "co-se-lidem-v-praveku-delo-se-zuby"
   */
  slug: string;
  /** Jména autorů cvičení */
  autor: string[];
  klicovaSlova: IKeywords;
  casovaOsa: ITimeData;
  /** Popis cvičení. Nyní importované z velké tabulky. */
  anotace: {
    /** Zobrazuje se v katalogu */
    ucitel: string;
    /** Zobrazuje se ve cviceni */
    verejna: string;
  };
  /** Předpokládaná doba práce v minutách. */
  trvani: number;
  /** Obtížnost cvičení. Nyní importované z velké tabulky. */
  obtiznost: Difficulty;
  funkce: Feature[];
  pdf: {
    /** PDF doporučeného postupu určeného jako podpůrný materiál pro učitele.
     * @example "co-se-lidem-v-praveku-delo-se-zuby.pdf"
     */
    doporucenyPostup: string;
  };
  /** Relativni cesta k obrazku pouzivaneho napr. v katalogu. Cesta je relativní vůči `/assets/img/`
   * @example "co-se-lidem-v-praveku-delo-se-zuby/pic-02-1280w.jpg"
   */
  uvodniObrazek: string;
  /** Unikatni identifikator cviceni. */
  id: number;
  color: IColor;
  mobileData: IResponsivity;
}

/** Každé cvičení spadá do některých předefinovaných didaktických kategorií. Nyní importované z velké tabulky. */
interface IKeywords {
  rvp: string[];
  koncept: string[];
  b4: string[];
  historylab: string[];
}

/** Časové údaje cvičení. Slouží zejména k umístění na časové ose. Nyní importované z velké tabulky. */
interface ITimeData {
  roky: number[];
  epochy: [
    {
      refId: string;
      obdobi: string[];
    }
  ];
  show: boolean;
}

/** Barevná informace o cvičení. Automaticky generované z `uvodniObrazek`. Nyní slouží k určení pozice karty cvičení v katalogu na stránce "Galerie". */
interface IColor {
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
  };
}

interface ISlide {
  zadani: {
    hlavni: string;
    rozsirujici?: string;
  };
  napoveda: {
    aktivity: Feature[];
    text: string;
  };
  class: string | string[];
  // TODO: nastroje
  imitaceMapy?: any;
  klicovaSlova?: any;
  media?: any;
  novaTabulka?: any;
  popisky?: any;
  prameny?: any;
  razeni?: any;
  svg?: any;
  testKviz?: any;
  textovyEditor?: any;
  uzivatelskyText?: any;
  vyber?: any;
}

/** Informace o použitelnosti cvičení na malých a dotykových zařízeních. Automaticky generované skriptem na základě dostupných informací o cvičení. */
interface IResponsivity {
  /** Celkové skóre */
  mobileFriendly: MobileFriendly;
  /** Je použitelné na dotykových zařízeních? */
  touch: MobileFriendly;
  /** Je použitelné na malých obrazovkách? */
  smallScreen: MobileFriendly;
  /** Je použitelné na středních obrazovkách? */
  tabletScreen: MobileFriendly;
}

enum Language {
  Czech = "cs",
  English = "en",
  Slovak = "sk",
  Polish = "pl",
}

enum Server {
  Test = "test",
  Public = "public",
}

enum Difficulty {
  Low = "nízká",
  Medium = "střední",
  High = "vysoká",
}

enum MobileFriendly {
  NotFriendly = 0,
  WithLimitations = 1,
  Friendly = 2,
}

enum Feature {
  Lupa = "lupa",
  Cteni = "cteni",
  Text = "text",
  Svg = "svg",
}
