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
  vrstvy: Layer[];
  /** Popisky, které jsou mezi vrstvami a ovládacími prvky (tlačítka pro přepínání) */
  popisky?: string[];
}

/** Jedna konkrétní mapa */
interface Layer {
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
  galerie?: IGalerieItem[]; //TODO: Dodělat galerii
  /** Nastavení, jestli má být galerie velká ("velka-galerie"), či malá (nedefinováno) */
  layout?: "velka-galerie";
  /** Rozšíření o novou tabulku,
   *
   * @example komu-psal-fucik
   */
  novaTabulka?: INovaTabulka; // TODO: Dodělat novou tabulku
  /** Jedno nebo více položek klíčových slov, zarovnané vodorovně */
  klicovaSlova: IKlicovaSlovaItem[];
}
interface IKlicovaSlovaItem {
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
   * @param 'selekce+' - slova nejsou vybrána, uživatel přidává
   * @param 'wordcloud' - +/- zvětšování, zmenšovaní slova
   *
   */
  funkce: "selekce-" | "selekce+" | "wordcloud";
  /** Jednotlivá klíčová slova */
  tagy: IKlicovaSLovaTagy[];
  /**
   * Duplikuj (získej) klíčová slova včetně jejich interakce z předchozích klíčových slov.
   *
   * @example poselstvi-pravekeho-hrobu
   */
  inherit?: IKSInherit;
}
/** Jednotlivá klíčová slova */
interface IKlicovaSLovaTagy {
  text: string;
}
/** Duplikuj (získej) klíčová slova včetně jejich interakce z předchozích klíčových slov.
 */
interface IKSInherit {
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
// interface IGalery {
//   TODO: any;
// }
// interface INovaTabulka {
//   TODO: any;
// }

// ----------------  Média ----------------

/** Modul média
 *
 * Zobrazení obrázků, audio přehrávek a videí
 *
 * @example co-chtel-zmenit-knize-bretislav, co-se-stalo-v-zime-1970
 *
 */
interface Media {
  galerie?: IGalerieItem[];
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
  soubory: MediaItem[];
}

/** Výčet typů médií */
type MediaItem = IMediaImage | IVideoItem | IAudioItem;

/** Obrázkové médium pro modul média */
interface IMediaImage {
  /** Popisek obrázku (uvnitř obrázku) */
  popisek?: string;
  /** Relativni cesta k obrazku  */
  soubor: string;
}

/** Audio médium pro modul média */
interface IAudioItem {
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
interface IVideoItem {
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
  titulky?: IVideoTitulky;
  /**  Label pro video přehrávač  */
  label?: string;
  /** Název video přehrávače */
  nazev?: string;
  /** Popisek k audio přehrávači */
  popisek?: string;
}
/** Titulky k video přehrávači */
interface IVideoTitulky {
  /** Typ titulků. */
  typ?: string;
  /** Jazyk titulků.
   * @example 'en', 'fr'
   */
  jazyk?: string;
  /** Relativní cesta k souboru s titulky '/assets/video/' */
  soubor: string;
}
