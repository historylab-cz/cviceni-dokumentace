/**
 *
 */
interface Cviceni {
  /** Metadata ke cvičení */
  cviceni: CviceniMetadata;
  /** Obsah cvičení tedy jednotlivé slajdy */
  slajd: Slajd[];
}

interface CviceniMetadata {
  /** Existují dva typy verzí. */
  version: {
    /** Sémantická verze aplikace. Generovaná automaticky pomocí `npm release`. Je verzí aplikace jako takové. Tzn. všechny cvičení sdílí tuto hodnotu. */
    global: string;
    /** Inkrementalní verze obsahu (revize). Nezávisí na verzi aplikace. Jakákoliv úprava obsahu by se měla projevit na navýšení verze. Každé cvičení si udržuje tuto verzi samostatně. */
    content: number;
  };
  /** Vyuziva se k automatizovanemu deploymentu, na jaky server cviceni deployovat */
  katalog: Katalog[];
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
  klicovaSlova: KlicovaSlovaMetadata;
  casovaOsa: CasovaOsa;
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
  obtiznost: Obtiznost;
  /** Manuálně definované (zatím). Slouží zejména k načtení knihoven potřebných pro dané funkce. */
  funkce: Funkce[];
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
  color: Color;
  mobileData: MobileData;
}

/** Každé cvičení spadá do některých předefinovaných didaktických kategorií. Nyní importované z velké tabulky. */
interface KlicovaSlovaMetadata {
  rvp: RVP[];
  koncept: Koncept[];
  b4: B4[];
  historylab: Historylab[];
}

type RVP =
  | "české země ve třech stoletích"
  | "české země ve 20. století"
  | "Československo 2. pol. 20. století"
  | "první světová válka"
  | "důsledky první světové války"
  | "vznik ČSR"
  | "politický vývoj ČSR"
  | "hospodářský vývoj ČSR"
  | "sociální problémy ČSR"
  | "národnostní problémy ČSR"
  | "hospodářská krize"
  | "druhá světová válka"
  | "důsledky druhé světové války"
  | "antisemitismus"
  | "rasismus"
  | "totalitní režimy"
  | "Československo 50. léta"
  | "Československo 60. léta"
  | "Československo 70. léta"
  | "Československo 80. léta"
  | "vznik České republiky"
  | "příčiny studené války"
  | "střetávání západního a východního bloku"
  | "důsledky studené války"
  | "kolonialismus"
  | "dekolonizace"
  | "problémy současného světa"
  | "euroatlantická spolupráce"
  | "technika"
  | "vzdělání"
  | "sport"
  | "zábava";

type Koncept =
  | "člověk a životní prostředí"
  | "dějiny ve veřejném prostoru"
  | "gender"
  | "každodennost"
  | "migrace"
  | "občanská společnost"
  | "propaganda"
  | "symboly"
  | "umění"
  | "vzpomínková kultura";

type B4 =
  | "dobové perspektivy"
  | "příčiny a důsledky"
  | "trvání a změna"
  | "vztah k minulosti";

type Historylab =
  | "tvoříme"
  | "diskutujeme"
  | "sestavujeme podloženou odpověď"
  | "porovnáváme prameny"
  | "hledáme klíčové detaily"
  | "formulujeme a ověřujeme hypotézu"
  | "odhalujeme skrytý záměr pramene"
  | "domýšlíme významy";

/** Časové údaje cvičení. Slouží zejména k umístění na časové ose. Nyní importované z velké tabulky. */
interface CasovaOsa {
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
interface Color {
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

interface Slajd {
  zadani: {
    hlavni: string;
    rozsirujici?: string;
  };
  napoveda: {
    aktivity: Funkce[];
    text: string;
  };
  class: string | string[];

  imitaceMapy?: ImitaceMapy;
  klicovaSlova?: KlicovaSlova;
  media?: Media;
  // TODO: nastroje
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
interface MobileData {
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

enum Katalog {
  Test = "test",
  Public = "public",
}

enum Obtiznost {
  Low = "nízká",
  Medium = "střední",
  High = "vysoká",
}

enum MobileFriendly {
  NotFriendly = 0,
  WithLimitations = 1,
  Friendly = 2,
}

enum Funkce {
  Audio = "audio",
  Cteni = "cteni",
  Kresleni = "kresleni",
  Lupa = "lupa",
  Pretahovani = "pretahovani",
  Razeni = "razeni",
  Svg = "svg",
  Text = "text",
  TextEditor = "text-editor",
  Video = "video",
  Znacky = "znacky",
}

// ========================= MODULY =========================

// ----------------  Galerie ----------------

// ----------------  ImitaceMapy ----------------

/** Modul Imitace mapy, přepínání vrstev, kdy každá vrsta je obrázek
 *
 * @example co-si-pamatuje-stahlavsky-les, co-rikaji-mapy-o-sovetskem-svazu, mnichov-1938-jaka-uzemi-byla-odtrzena
 *
 */
interface ImitaceMapy {
  /** Jednotlivé vrstvy pro imitaci mapy */
  vrstvy: ImitaceMapyVrstva[];
  /** Popisky, které jsou mezi vrstvami a ovládacími prvky (tlačítka pro přepínání) */
  popisky?: string[];
}

/** Jedna konkrétní mapa */
interface ImitaceMapyVrstva {
  /** Relativni cesta k obrazku  */
  mapa: string;
  /** Label tlačítka, které přepne danou vrstvu */
  nazev: string; // name of the map to the button
}

// ----------------  KlicovaSlova ----------------

/** Modul klíčová slova
 *
 * @example k-cemu-slouzil-stredoveky-hrad, zaverecne-cviceni-dejiny-na-mape, komu-psal-fucik
 *
 */
interface KlicovaSlova {
  /** Rozšíření o doplňkovou galerii */
  galerie?: Galerie[]; //TODO: Dodělat galerii
  /** Nastavení, jestli má být galerie velká ("velka-galerie"), či malá (nedefinováno) */
  layout?: "velka-galerie";
  /** Rozšíření o novou tabulku,
   *
   * @example komu-psal-fucik
   */
  novaTabulka?: NovaTabulka; // TODO: Dodělat novou tabulku
  /** Jedno nebo více položek klíčových slov, zarovnané vodorovně */
  klicovaSlova: KlicovaSlovaSkupina[];
}
interface KlicovaSlovaSkupina {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'klicova-slova-1'
   */
  id: string;
  /**  Nadpis pro skupinu klíčových slov */
  nadpis?: string;
  /**  Jednotlivé funkce pro manipulaci s klíčovými slovy
   *
   * @param 'selekce-' - všechna slova jsou vybrána, uživatel odebírá
   * @param 'selekce+' - slova nejsou vybrána, uživatel vybírá
   * @param 'wordcloud' - +/- zvětšování, zmenšovaní slova
   *
   */
  funkce: "selekce-" | "selekce+" | "wordcloud";
  /** Jednotlivá klíčová slova */
  tagy: KlicovaSlovaTagy[];
  /**
   * Duplikuj (získej) klíčová slova včetně jejich interakce z předchozích klíčových slov.
   *
   * @example poselstvi-pravekeho-hrobu
   */
  inherit?: KlicovaSlovaInherit;
}
/** Jednotlivá klíčová slova */
interface KlicovaSlovaTagy {
  text: string;
}
/** Duplikuj (získej) klíčová slova včetně jejich interakce z předchozích klíčových slov.
 */
interface KlicovaSlovaInherit {
  /**
   * Zapnutí / vypnutí funkce pro kopírování
   *
   * @example 'true' - zapnuto, 'false' - vypnuto
   *
   */
  onInit: boolean;
  /**
   * ID klíčových slov
   *
   * @example 'klicova-slova-1'
   *
   */
  from: string[];
}
interface Galerie {
  TODO: any;
}
interface NovaTabulka {
  TODO: any;
}

// ----------------  Média ----------------

/** Modul média
 *
 * Zobrazení obrázků, audio přehrávek a videí
 *
 * @example co-chtel-zmenit-knize-bretislav, co-se-stalo-v-zime-1970
 *
 */
interface Media {
  galerie?: Galerie[];
  nastaveni: {
    /** Nastavení rozložení médií:
     *
     * @para 'vertikalni' nebo  'galerie' nebo 'velka-galerie' - položky jsou seřazeny vertikálně @example co-se-stalo-v-zime-1970
     * @para 'horizontalni' - položky jsou seřazeny horizontálně, @example co-chtel-zmenit-knize-bretislav
     */
    layout:
      | "vertikalni"
      | "galerie"
      | "velka-galerie"
      | "horizontalni"
      | string;
  };
  /** Jednotlivé položky galerie */
  soubory: MediaPolozka[];
}

/** Výčet typů médií */
type MediaPolozka = MediaObrazek | Video | Audio;

/** Obrázkové médium pro modul média */
interface MediaObrazek {
  /** Popisek obrázku (uvnitř obrázku) */
  popisek?: string;
  /** Relativni cesta k obrazku  */
  soubor: string;
}

/** Audio médium pro modul média */
interface Audio {
  /** Typ audio přehrávače.
   *
   * Nedefinovaný = normální přehrávač
   *
   * @param 'jendoduchý' - jednoduchý přehrávač, bez doprovodných prvků @example to-byla-slava
   *
   */
  vzhled?: "jednoduchy";
  /** Relativni cesta k audiu  */
  soubor: string;
  /** Alternativita k vlastnosti soubor  */
  objekt?: string;
  /**  Label pro aduio přehrávač  */
  label?: string;
  /** Název audio přehrávač  */
  nazev?: string;
  /** Popisek k audio přehrávači */
  popisek?: string;
  /**
   * Označuje, zda je k dispozici přepis
   * @example jak-obhajit-pisen
   */
  prepis?: boolean;
  /**
   * Obsah přepisu. Relativní cesta k souboru s textem (ve složce text)
   * @example "text-00"
   * @example jak-obhajit-pisen
   */
  content?: string;
}

/** Video médium pro modul média */
interface Video {
  /** Relativni cesta k videu  */
  soubor: string;
  /**
   * Označuje, zda je video ztlumeno.
   * @default false
   */
  muted?: boolean;
  /**
   * Relativni cesta k obrázku plakátu u videa.
   */
  poster?: string;
  /**
   * Titulky k videu.
   */
  titulky?: VideoTitulky;
  /**  Label pro video přehrávač  */
  label?: string;
  /** Název video přehrávače */
  nazev?: string;
  /** Popisek k audio přehrávači */
  popisek?: string;
}
/** Titulky k video přehrávači */
interface VideoTitulky {
  /** Typ titulků. */
  typ?: string;
  /** Jazyk titulků.
   * @example 'en', 'fr'
   */
  jazyk?: string;
  /** Relativní cesta k souboru s titulky '/assets/video/' */
  soubor: string;
}
