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
  uvodniObrazek: ObrazekSoubor;
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

enum RVP {
  ČeskéZeměVeTřechStoletích = "české země ve třech stoletích",
  ČeskéZeměVe20Století = "české země ve 20. století",
  Československo2Pol20Století = "Československo 2. pol. 20. století",
  PrvníSvětováVálka = "první světová válka",
  DůsledkyPrvníSvětovéVálky = "důsledky první světové války",
  VznikČSR = "vznik ČSR",
  PolitickýVývojČSR = "politický vývoj ČSR",
  HospodářskýVývojČSR = "hospodářský vývoj ČSR",
  SociálníProblémyČSR = "sociální problémy ČSR",
  NárodnostníProblémyČSR = "národnostní problémy ČSR",
  HospodářskáKrize = "hospodářská krize",
  DruháSvětováVálka = "druhá světová válka",
  DůsledkyDruhéSvětovéVálky = "důsledky druhé světové války",
  Antisemitismus = "antisemitismus",
  Rasismus = "rasismus",
  TotalitníRežimy = "totalitní režimy",
  Československo50Léta = "Československo 50. léta",
  Československo60Léta = "Československo 60. léta",
  Československo70Léta = "Československo 70. léta",
  Československo80Léta = "Československo 80. léta",
  VznikČeskéRepubliky = "vznik České republiky",
  PříčinyStudenéVálky = "příčiny studené války",
  StřetáváníZápadníhoAVýchodníhoBloku = "střetávání západního a východního bloku",
  DůsledkyStudenéVálky = "důsledky studené války",
  Kolonialismus = "kolonialismus",
  Dekolonizace = "dekolonizace",
  ProblémySoučasnéhoSvěta = "problémy současného světa",
  EuroatlantickáSpolupráce = "euroatlantická spolupráce",
  Technika = "technika",
  Vzdělání = "vzdělání",
  Sport = "sport",
  Zábava = "zábava",
}

enum Koncept {
  ČlověkAŽivotníProstředí = "člověk a životní prostředí",
  DějinyVeVeřejnémProstoru = "dějiny ve veřejném prostoru",
  Gender = "gender",
  Každodennost = "každodennost",
  Migrace = "migrace",
  ObčanskáSpolečnost = "občanská společnost",
  Propaganda = "propaganda",
  Symboly = "symboly",
  Umění = "umění",
  VzpomínkováKultura = "vzpomínková kultura",
}

enum B4 {
  DobovéPerspektivy = "dobové perspektivy",
  PříčinyADůsledky = "příčiny a důsledky",
  TrváníAZměna = "trvání a změna",
  VztahKMinulosti = "vztah k minulosti",
}

enum Historylab {
  Tvoříme = "tvoříme",
  Diskutujeme = "diskutujeme",
  SestavujemePodloženouOdpověď = "sestavujeme podloženou odpověď",
  PorovnávámePrameny = "porovnáváme prameny",
  HledámeKlíčovéDetaily = "hledáme klíčové detaily",
  FormulujemeAOvěřujemeHypotézu = "formulujeme a ověřujeme hypotézu",
  OdhalujemeSkrytýZáměrPramene = "odhalujeme skrytý záměr pramene",
  DomýšlímeVýznamy = "domýšlíme významy",
}

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
  novaTabulka?: NovaTabulka;
  popisky?: Popisky;
  prameny?: Prameny;
  razeni?: Razeni;
  svg?: Svg;
  testKviz?: TestKviz;
  textovyEditor?: TextovyEditor;
  uzivatelskyText?: UzivatelskyText;
  videoStamps: VideoStamps;
  vyber?: Vyber;
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

// ---------------- Podpurne typy ----------------

/**
 * @example "to-byla-slava/pic-00-1280w.jpg"
 */
type ObrazekSoubor = string;

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
  mapa: ObrazekSoubor;
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
  novaTabulka?: NovaTabulka; // TODO: Zkontrolovat novou tabulku
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
  soubor: ObrazekSoubor;
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
  poster?: ObrazekSoubor;
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

// ----------------  Nova Tabulka (plne nezkontrolovano) ----------------
/** Tabulka
 *
 * @example husitstvi-a-historici
 */
interface NovaTabulka {
  galerie?: Galerie[];
  layout?: string;
  pretahovani?: NovaTabulkaPretahovani;
  tabulky: Tabulka[];
}
interface Tabulka {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'nova-tabulka-1'
   */
  id: string;
  /** Sloupce tabulky */
  columns?: TabulkaSloupec[];
  /** Řádky tabulky */
  rows?: TabulkaRadek[];
  /** Definice, odkud se mají získat data. Jedná se o ID jednotlivých modulů.
   *
   * @example husitstvi-a-historici
   */
  dataFrom?: string[];
}

interface TabulkaSloupec {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'uryvky'
   */
  id: string;
  /** Název sloupce */
  name?: string;
  /** Typ sloupce
   *
   * @example // TODO:  "tag"
   * @example proc-resit-zidovskou-otazku
   */
  type?: {
    name: string; //"drop" "select" "dup-text"
    type: string; //"tag"
    tagName?: string;
    number?: number;
    options?: string[];
    attributes?: Record<string, string>; // V kodu je, ale nikde jsem nenasel pouziti
    /**
     * @example jak-informovali-o-havarii
     */
    textId: string; //"textovy-editor-2" ASI
  };
  values?: (string | number)[];
}
interface TabulkaRadek {
  id: string;
  name?: string;
  type: {
    name: string; //"drop"
    type: string;
    textId: string; //"textovy-editor-2"
  };
  values?: (string | number)[];
}

interface NovaTabulkaPretahovani {
  dataFrom?: string[];
  wasDropped?: boolean;
  name?: string;
  id: string;
  tagName: string;
  items?: PretahovaniData[];
}

interface PretahovaniData {
  objekt: string;
  medium:
    | "tag"
    | "uzivatelsky text"
    | "obrazek"
    | "svg"
    | "audio"
    | "video"
    | "text"
    | string;
  popisek?: string;
}

// ----------------  Video Stamps (plne nezkontrolovano) ----------------

interface VideoStamps {
  video: VideoStampData;
  nastaveni: NastaveniVideoStamp;
}

interface VideoStampData extends Video {
  id: string;
  stamps: Stamp[];
}

// TODO: sjednotit nastaveni
interface NastaveniVideoStamp {
  layout: "vertikalni" | "galerie" | "velka-galerie" | "horizontalni";
}
interface Stamp {
  id: string;
  emoji: string; // Emoji 😠
  popisek?: string;
}

// ----------------  Popisky (plne nezkontrolovano) ----------------

type Popisky = string[];

// ----------------  Prameny (plne nezkontrolovano) ----------------

type Prameny = ObrazekSoubor[];

// ----------------  Razeni (plne nezkontrolovano) ----------------

interface Razeni {
  id: string;
  typ: "horizontalni" | "vertikalni"; // layout of razeni
  zpetnaVazba?: RazeniZpetnaVazba[]; // Define a more specific type if the structure is known
  objekty: RazeniPolozka[];
}
// TODO: generalizovat
interface RazeniZpetnaVazba {
  /**
   * how many wrong position is set (0 - all correct, 1 - one wrong, 2 - two or more wrong)
   */
  podminka: 0 | 1 | 2;
  text: string; // text of the button for zpertnaVazba
  barva: "color-red" | "color-orange" | "color-green"; // color of the button for zpertnaVazba
}
// TODO: generalizovat, polozka je bud obrazek, audio, text nebo video a rozsiri se o id, spravnaOdpoved atd. ASI
interface RazeniPolozka {
  id: string;
  medium: "audio" | "video" | "uzivatelsky text" | "obrazek" | "svg" | "text";
  spravnaOdpoved?: number; // position where this item is correct. ()
  popisek?: string;
  nazev?: string; // For AUDIO only, name of the audio procByliUneseni
  objekt: RazeniText | Audio | RazeniSVG | ObrazekSoubor | Video;
}
//If medium is text:
type RazeniText = string; //"král"

// TODO: zkontrolovat generalizovat
interface RazeniSVG {
  soubor: string; // url to pic
  duplikovat: string[]; // id of previous SVG, eg. "svg-1"
}

// TODO: SVG NOT COMPLETED YET
// ----------------  SVG (plne nezkontrolovano) ----------------

interface Svg {
  /**
  The list of SVG files.
  */
  soubory: SvgPolozka[];
  /**
  Settings Terela to dragging SVG elements.
  Example: true
  */
  pretahovani?: SvgPretahovani;
  /**
  Settings related to the gallery of SVG elements.
  */
  galerie?: Galerie;
  /**
  Additional settings for the SVG gallery.
  */
  nastaveni?: SvgNastaveni;
}

interface SvgNastaveni {
  /**
  The layout setting for the SVG gallery.
  Possible values: "vertikalni", "horizontalni", "galerie", "velka-galerie"
  */
  layout?: string; //horizontalni || galerie || velka-galerie
  /**
  Settings related to the order of SVG elements.
  */
  poradi?: ISvgPoradi;
}
interface ISvgPoradi {
  /**
  Indicates if the order is reversed.
  */
  obracene?: boolean;
  /**
  Indicates if the order is duplicated.
  */
  duplikovat?: boolean;
}
interface SvgPolozka {
  soubor: ObrazekSoubor;
  /**
  The list of functions applied to the SVG.
  Example: ["znacky", "kresleni"]
  */
  funkce?: string[]; //TODO
  /**
  The list of colors used in the SVG.
  Example: ["blue", "red"]
  */
  barvy?: string[];
  /**
  Indicates if the SVG file is duplicated.
  Example: ["id1", "id2"]
  */
  duplikovat?: string[];
  /**
  Indicates if the SVG file can be dropped.
  Example: true
  */
  drop?: boolean;
  /**
  The ID of the SVG element.
  Example: "svg1"
  */
  id: string;
  /**
  A description or caption for the SVG.
  Example: "This is an SVG image."
  */
  popisek?: string; //ANO
  /**
  The comics data associated with the SVG.
  */
  komiks?: SvgKomiks;
  /**
   * Pouze prohlizeni? 
   * Pokud false: ano, pouze prohlizeni
   * @default true
   */
  interactive?: boolean;
}
interface SvgKomiks {
  kategorie: "znacka" | "text"; // text
  placeholder: string;
  subkategorie: "promluva" | "myslenka" | "vypravec"; //only if placeholder is selected
  subjekt: any; //TODO
  pozice: number[];
  label: string;
  barva: string; // only for znacka
}

interface SvgPretahovani {
  dataFrom: string[]; // TODO
  wasDropped: boolean; // default value of wasDroped is true
  items: SvgPretahovaniPolozka[]; //TODO
  name: string;
  id: string;
  tagName: string;
}
interface SvgPretahovaniPolozka {
  objekt: string | SvgFile; // TODO pro audio, video
  medium?:
    | "tag"
    | "uzivatelsky text"
    | "obrazek"
    | "svg"
    | "audio"
    | "video"
    | "text";
  popisek: string;
}

// ----------------  TestKviz (plne nezkontrolovano) ----------------

interface TestKviz {
  id?: string; // Optional ID for the test quiz
  galerie?: Galerie; // Optional gallery object
  nastaveni?: TestKvizNastaveni;
  zadani: Otazka[]; // Array of questions
  zpetnaVazba?: TestKvizZpetnaVazba[]; // Optional array of feedback objects - procjeVelkaBritaniezemicaje
}
interface TestKvizNastaveni {
  layout?: "horizontal"; // Optional layout setting
}
interface Otazka {
  otazka: string; // The question text
  odpovedi: Odpoved[]; // Array of answer options
  spravnaOdpoved: number; // Index of the correct answer (1-based)
}
interface Odpoved {
  text: string; // The text of the answer option
  selected?: boolean; // Optional boolean indicating if this option is selected
}
// TODO: generalizovat
interface TestKvizZpetnaVazba {
  barva: string; // The color of the feedback
  text: string; // The feedback text
  podminka: number[]; // Array of conditions (number of correct answers)
}

// ----------------  TextovyEditor (plne nezkontrolovano) ----------------

interface TextovyEditor {
  galerie?: Galerie; // optional gallery object
  nastaveni?: TextovyEditorNastaveni;
  texty: Text[]; // array of text editor objects
}
interface TextovyEditorNastaveni {
    vzhled: "normalni"; // JakInformovaliOHavarii, TODO
    layout?: string; // optional layout setting for gallery "velka-galerie"
  };
interface Text {
  id: string | number; // unique identifier for the text editor
  content: string; // content of the editor
  funkce: 'cteni' | 'predznaceny' | 'zvyraznovani' | 'psani'; // editor function type
  nazev?: string; // optional name of the editor
  menu?: MenuPolozka[]; // menu items for zvyraznovani
  predznaceni?: PredznaceniText[]; // for predznaceny
}
interface MenuPolozka {
  color: string; // color of the marker
  commandName: string; // command name for the marker id of the marker
  title: string; // title of the marker
}
interface PredznaceniText {
  vyraz: string; // expression to be premarked
}

// ----------------  UzivatelskyText (plne nezkontrolovano) ----------------

interface UzivatelskyText {
  galerie?: Galerie;  // Define this more specifically if you know the structure
  novaTabulka?: NovaTabulka; // TODO: zkontrolovat jestli sedi
  layout?: "horizontalni" | "velka-galerie"; // Velka galerie if gallery, horizintalni for otazky
  otazky: Otazka[];
}

interface Otazka {
  id: string;
  zadani?: Zadani | string; // CoSeDozvimeZPropagistickychLetaku
  instrukce?: string; //"Myslím si, že…"
  minDelka?: number;
  maxDelka?: number;
  vyska?: number;
  duplikovat?: string[]; // id of duplicated uzivatelskyText, eg. ["otazka-2"]
  hodnota?: string;
}

interface Zadani {
  from: string; // zadani from other modul, eg. "vyber-1"
  placeholder: string; // "Zadání se zobrazí až po výběru položky na předchozím slajdu."
}

// ----------------  Vyber (plne nezkontrolovano) ----------------

interface Vyber {
  id: string; // unique identifier for the selectable component
  nastaveni: VyberNastaveni;
  galerie?: Galerie; // gallery object if exists
  zpetnaVazba?: VyberZpetnaVazba[]; // feedback settings
  objekty: VyberPolozka[]; // list of selectable items
}
interface VyberNastaveni {
 layout: 'horizontalni' | undefined; // layout type (horizontal or vertical)
    viceOdpovedi?: boolean; // allows multiple answers if true viceOdpovedi ? "checkbox" : "radio"
    vybrano: boolean; // initial selection state
    disableFeedback: boolean; // feedback disabling state
}

interface VyberPolozka {
  medium: 'text' | 'uzivatelsky text' | 'audio' | 'video' | 'image'; // media type
  objekt: string | ObrazekSoubor | Audio | Video; // object file path or content
  spravnaOdpoved: boolean; // indicates if this is the correct answer
  /** Data pro modul uzivatelskyText.
   * otazky => zadani.from
   * 
   * @example co-se-dozvime-z-propagandistickych-plakatu
   */
  data?: string; // optional data attribute for the item
}
// TODO: generalizovat
interface VyberZpetnaVazba {
  barva: string; // feedback color
  text: string; // feedback text
  podminka: number[]; // condition to display this feedback based on the number of correct answers
}


// TODO: Galerie NOT COMPLETED YET
// ----------------  Galerie (plne nezkontrolovano) ----------------

type Galerie = GaleriePolozka[];

interface GaleriePolozka {
  /**
  The type of the gallery item.
  Example: "svg", "text", "vyber"
  */
  typ?: string;
  /**
  The content or object associated with the gallery item.
  For "svg", this might be the SVG content.
  For "text", this might be the text content.
  */
  objekt?: any; // ISVGObject, string (Text string)
  /**
  The caption or description of the gallery item.
  Example: "This is an SVG image." only if type §SVG§ and §text§ or no type
  */
  popisek?: string;
  /**
  The list of IDs for duplicated text sources.
  Applicable when typ is "text".
  */
  duplikovat?: string[];
  /**
  The selected ID for items of type "vyber".
  Applicable when typ is "vyber".
  */
  vyberId?: string;
  /**
  The filename of the media file (image, audio, or video).
  Example: "example.jpg" //IF no type, it is an file
  if audio and if "velka-galerie": classic audio-player else audioPlayerSimple
  if image
  */
  soubor?: string;
  /**
  The enlarged version of the image file.
  Applicable when the gallery item is an image.
  Example: "example_large.jpg"
  */
  zvetseny?: string;
  }