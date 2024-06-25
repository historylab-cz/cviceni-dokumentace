/**
 *
 */
interface Cviceni {
  /** Metadata ke cvičení */
  cviceni: CviceniMetadata;
  /** Obsah cvičení tedy jednotlivé slajdy */
  slajd: CviceniSlajd[];
}

interface CviceniMetadata {
  /** Existují dva typy verzí. Jejich kombinace zajišťuje unikátnost. */
  version: {
    /** Sémantická verze aplikace. Generovaná automaticky pomocí `npm release`. Je verzí aplikace jako takové. Tzn. všechny cvičení sdílí tuto hodnotu. */
    global: string;
    /** Inkrementalní verze obsahu (revize). Nezávisí na verzi aplikace. Jakákoliv úprava obsahu by se měla projevit na navýšení verze. Každé cvičení si udržuje tuto verzi samostatně. */
    content: number;
  };
  /** Využívá se k automatizovanému deploymentu, na jaký server cvičení deployovat */
  katalog: Katalog[];
  /** Definice jazyka, ve kterém je cvičení připraveno zapsaná ve formátu ISO 639-1 */
  language: Language;
  /** Název cvičení. Nemusí být unikátní. */
  nazev: string;
  /** Slug se může lišit od `nazev`, ale očekává se, že je to jen automaticky generovaný slugified verze názvu. Musí být unikátní.
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
    /** Zobrazuje se ve cvičení */
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
  /** Unikatni identifikator cvičení. */
  id: number;
  color: CviceniColor;
  mobileData: MobileData;
}

/** Každé cvičení spadá do některých předefinovaných didaktických kategorií z jedneé tzv. velké čtyřky. Nyní importované z velké tabulky. */
interface KlicovaSlovaMetadata {
  rvp: string[];
  koncept: string[];
  b4: string[];
  historylab: string[];
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
interface CviceniColor {
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

interface CviceniSlajd {
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
  videoStamps?: VideoStamps;
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
  Komiks = "komiks",
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

enum Layout {
  Horizontal = "horizontalni",
  Vertical = "vertikalni",
  Gallery = "galerie",
  BigGallery = "velka-galerie",
}

enum Color {
  Red = "color-red",
  Orange = "color-orange",
  Green = "color-green",
}

// ========================= MODULY =========================

// ---------------- Podpurne typy ----------------

/**
 * Obrázek umístění ve složce img/{slug-cviceni}/{nazev-souboru-vcetne-pripony}
 * @example "to-byla-slava/pic-00-1280w.jpg"
 */
type ObrazekSoubor = string;

// ---------------- ImitaceMapy ----------------

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
  nazev: string;
}

// ---------------- KlicovaSlova ----------------

/** Modul klíčová slova
 *
 * @example k-cemu-slouzil-stredoveky-hrad, zaverecne-cviceni-dejiny-na-mape, komu-psal-fucik
 *
 */
interface KlicovaSlova {
  /** Rozšíření o doplňkovou galerii */
  galerie?: Galerie[];
  /** Nastavení, jestli má být galerie velká ("velka-galerie"), či malá (nedefinováno) */
  layout?: Layout.BigGallery;
  /** Rozšíření o novou tabulku,
   *
   * @example Cvičení `komu-psal-fucik`
   */
  novaTabulka?: NovaTabulka;
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
   * @example Cvičení `poselstvi-pravekeho-hrobu`
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
   * `id` jiného modulu Klíčových slov
   *
   * @example 'klicova-slova-1'
   *
   */
  from: string[];
}

// ---------------- Média ----------------

/** Modul média
 *
 * Zobrazení obrázků, audio přehrávek a videí
 *
 * @example Cvičení `co-chtel-zmenit-knize-bretislav`, `co-se-stalo-v-zime-1970`
 *
 */
interface Media {
  galerie?: Galerie[];
  nastaveni: {
    /** Nastavení rozložení médií:
     *
     * @para 'vertikalni' nebo  'galerie' nebo 'velka-galerie' - položky jsou seřazeny vertikálně
     * @example Cvičení `co-se-stalo-v-zime-1970`
     * @para 'horizontalni' - položky jsou seřazeny horizontálně
     * @example Cvičení `co-chtel-zmenit-knize-bretislav`
     */
    layout: Layout;
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
   * @default ""
   * @param 'jendoduchy' - jednoduchý přehrávač, bez doprovodných prvků
   * @example Cvičení `to-byla-slava`
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
   * Odkaz na html soubor, ve kterém je text uložený. Umístění ve složce `text/{slug-cviceni-doplneny-automaticky}/{nazev-souboru-BEZ-pripony}`
   * @example "text-00"
   * @example Cvičení `jak-obhajit-pisen`
   */
  prepis?: boolean;
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
   * Relativni cesta k obrázku pro uvodi plakát u videa.
   */
  poster?: ObrazekSoubor;
  /**
   * Titulky k videu.
   */
  titulky?: VideoTitulky;
  /**  Label pro video  */
  label?: string;
  /** Název videa */
  nazev?: string;
  /** Popisek k videu */
  popisek?: string;
}
/** Titulky k videu */
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

// ---------------- Nova Tabulka (Velmi složité na zkontrolování) ----------------
/** Tabulka, nejdříve se definují řádky a poté sloupce.
 *
 * @example Cvičení `husitstvi-a-historici`
 */
interface NovaTabulka {
  /** Rozšíření o doplňkovou galerii */
  galerie?: Galerie[];
  /**
   * Pokud nezadáno, jedná se o malou galerii.
   */
  layout?: Layout.BigGallery;
  /** Rozšíření o modul přetahování */
  pretahovani?: Pretahovani;
  /** Seznam tabulek */
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
  /** Definice, odkud se mají získat data. Jedná se o `id` jednotlivých modulů.
   *
   * @example Cvičení `husitstvi-a-historici`
   */
  dataFrom?: string[];
}

// TODO: fakt je to mega složitý, zabralo by to hodně času to popsat do podrobnosti, potřeba reinženýring
interface TabulkaRadek {
  /** Unikátní identifikátor napříč tabulkou
   * @example Cvičení `k-cemu-jsou-nam-vyroci`
   * @example 'obrazek'
   */
  id: string;
  /** Název řádku */
  name?: string;
  /** Typ řádku. TODO: */
  type:
    | {
        /** Typ řádku */
        name: "drop" | "dup-text" | "select";
        /** Typ obsahu */
        type: "obrazek" | "tag" | "text";
        /** Zobrazit data z textoveho editoru referenci na jeho `id`
         * @example `textovy-editor-2`
         * @example Cvičení `k-cemu-jsou-nam-vyroci`
         */
        textId: string;
        /** Cislo jako string
         * @example "1"
         * @example Cvičení `jak-zobrazovali-svet`
         */
        number?: string;
      }
    | "";
  /** Hodnoty pro řádek (ještě  nikde nepoužito) */
  values?: (string | number)[];
  "bg-color"?: string;
}

// TODO: fakt je to mega složitý, zabralo by to hodně času to popsat do podrobnosti, potřeba reinženýring
interface TabulkaSloupec {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'uryvky'
   */
  id: string;
  /** Název sloupce */
  name?: string;
  /** Typ sloupce
   * @example Cvičení `proc-resit-zidovskou-otazku`
   */
  type?: {
    /** Typ sloupce */
    name: "drop" | "dup-text" | "select" | "";
    /** Typ obsahu */
    type?: "obrazek" | "tag" | "text";
    /** Pro data z přetahování */
    tagName?: string;
    /** Kolik možností se dá přetáhnbout do tohoto sloupce */
    number?: number;
    /** Položky pro typ `select`
     * @example Cvičení `k-cemu-vyzyvaly-dva-tisice-slov-a-charta-77`
     */
    options?: string[];
    attributes?: Record<string, string>; // V kodu je, ale nikde jsem nenasel pouziti
    /** Pro data z textového editoru
     * @example Cvičení `jak-informovali-o-havarii`
     */
    textId?: string;
  };
  values?: (string | number)[];
}

// ----------------  Video Stamps ----------------

/**
 * Modul pro přidávání razítek do videa.
 *
 * @example Cvičení `o-cem-se-hadaji-v-rodine`
 */
interface VideoStamps {
  video: VideoStampsData;
  nastaveni: VideoStampsNastaveni;
}

/** Hlavním prvkem je typ [[Video]], který je rozšířen o `id` a jednolitvá razítka */
interface VideoStampsData extends Video {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'videostamp-1'
   */
  id: string;
  /** Seznam razítek */
  stamps: Stamp[];
}

/** Nastavení layoutu videa */
interface VideoStampsNastaveni {
  layout: Layout;
}

interface Stamp {
  /** Unikátní číslo napříč video stamp
   *
   * @example 1
   */
  id: number;
  /** Emoji razítko
   *
   * @example 😠
   */
  emoji: string;
  /** Legenda pro emoji */
  popisek?: string;
}

// ----------------  Popisky ----------------
/** Jednoduchý modil pro zobrazení textových popisků. Řadí se horizontálně. Používané zejména v pod [[Prameny]] */
type Popisky = string[];

// ----------------  Prameny ----------------
/** Jednoduchý modul pro zobrazení obrázků. Řadí se horizontálně. */
type Prameny = ObrazekSoubor[];

// ----------------  Razeni ----------------
interface Razeni {
  /** Unikátní číslo napříč video stamp
   *
   * @example 'razeni-1'
   */
  id: string;
  /**
   * Layout řazení, horizontální nebo vertikální.
   */
  typ: Layout.Horizontal;
  /** Definuje zpětnou vazbu pro řazení zobrazovanou dynamicky na základě akcí uživatele */
  zpetnaVazba?: RazeniZpetnaVazba[];
  /** Seznam položek pro řazení */
  objekty: RazeniPolozka[];
}

// TODO: generalizovat
interface RazeniZpetnaVazba {
  /**
   * Určuje kolik pohybů je potřeba, aby se řazení seřadilo správně
   * @param 0 - vše je správně
   * @param 1 - jedna položka je na špatném místě
   * @param 2 - 2 a více položek je na špatném místě
   */
  podminka: 0 | 1 | 2;
  /** Text tlačítka u zpětné vazby
   * @example "Jednu fotografii bychom uspořádali odlišně."
   */
  text: string;
  /** Barva tlačítka zpětné vazby */
  barva: Color;
}

type RazeniPolozka =
  | RazeniPolozkaText
  | RazeniPolozkaAudio
  | RazeniPolozkaVideo
  | RazeniPolozkaUzivatelskyText
  | RazeniPolozkaSVG
  | RazeniPolozkaObrazek;

interface RazeniPolozkaBase {
  /** Unikátní číslo napříč řazením
   *
   * @example 'razeni-svg-1'
   */
  id?: string;
  medium;
  /** pozice, na které je tato položka správně (od 1 - N)
   * @example '1'
   */
  spravnaOdpoved?: string;
  /** Popisek položky */
  popisek?: string;
  objekt;
}

interface RazeniPolozkaText extends RazeniPolozkaBase {
  medium: "text";
  /** Text pro řazení
   * @example 'král'
   */
  objekt: string;
}

interface RazeniPolozkaAudio extends RazeniPolozkaBase {
  medium: "audio";
  objekt: Audio;
}
interface RazeniPolozkaVideo extends RazeniPolozkaBase {
  medium: "video";
  objekt: Video;
}
interface RazeniPolozkaSVG extends RazeniPolozkaBase {
  medium: "svg";
  objekt: SvgObjekt;
}
interface RazeniPolozkaObrazek extends RazeniPolozkaBase {
  medium: "obrazek";
  objekt: ObrazekSoubor;
}

// ---------------- SVG ----------------

interface Svg {
  /**
  Seznam obrázků. Určuje počet SVG editorů.
  */
  soubory: SvgObjekt[];
  /** Svg podpurný modul s přetahováním položek do obrázku. */
  pretahovani?: Pretahovani;
  /** Galerie s SVG */
  galerie?: Galerie;
  /** Nastavení SVG. */
  nastaveni?: SvgNastaveni;
}

interface SvgNastaveni {
  /**
   * Pokud je specifikovaná galerie nebo je příznak 'vertikalni' je nastaven layout modulu na vertikální.
   * Pokud  je příznak 'horizontalni', 'galerie', 'velka-galerie' je nastaven layout modulu na horizontalni.
   * @example 'vertikalni' - jak-probihala-stredoveka-invaze
   * @example 'horizontalni', 'galerie', 'velka-galerie' - mel-si-kleknout
   */
  layout?: string;
  /**
   * Podpůrný modul, zatím použitý v jednom cvičení a pro řazení.
   *
   * @example Cvičení `promeny-mesta-zlina`
   */
  poradi?: SvgPoradi;
}
interface SvgPoradi {
  /**
   * Možnost seřadit svg položky obrázeně
   * @example true - obráceně
   */
  obracene?: boolean;
  /**
   * Duplikovat pořadí z řazení.
   * @example true - duplikovat
   */
  duplikovat?: boolean;
}

interface SvgObjekt {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'svg-1'
   */
  id: string;
  soubor: ObrazekSoubor;
  /** Jaké funkce má SVG modul mít zapnuté
   * Prázdné pole pro žádnou funkci (viz. cvičení `proc-se-rozpadlo-ceskoslovensko`)
   */
  funkce?: Funkce[];
  /** Seznam barev, které jsou nabídnuty z nabídky
   * @example 'blue', 'red'
   */
  barvy?: string[];
  /** Duplikovat data z předchozího SVG. Seznam `id` SVG, ze kterých chceme data získat.
   * @example 'svg-1', 'svg-2'
   * Příkald: Cvičení `co-chteli-cerni-panteri`
   */
  duplikovat?: string[];
  /** Indikace pokud se na SVG dá přetáhnout položka z [[Pretahovani]]
   * @param true - ano dá,
   * @param false - ne nedá
   */
  drop?: boolean;
  /** Popisek pro SVG
   */
  popisek?: string; //ANO
  /** Pokud je v seznamu funkcí položka 'komiks', zde jsou data pro tuto funkci. Předdefiované bubliny s textem. */
  komiks?: SvgKomiks[];
}

type SvgKomiks = SvgKomiksText | SvgKomiksZnacka;

interface SvgKomiksText {
  /** Pro textový komiks je nutno zadat 'text', funguje stejně jako u SVG funkcí */
  kategorie: "text";
  /**  Text, který se zobrazí jak label, tak placeholder pro textové pole.
   * Pokud není zadán label a placeholder se určí že subkategorie
   * Zatím nikde není použitý
   */
  placeholder?: string;
  /** Použití, pokud placeholder chybí, jinak funkce je stejná. Funguje pro překlad
   * @param 'promluva' - Promluva...
   * @param 'myslenka' - Myšlenka...
   * @param 'vypravec' - Vypravěč...
   */
  subkategorie: "promluva" | "myslenka" | "vypravec"; //only if placeholder is selected
  /** Určuje tvar textové bubliny. Resp. určuje roh, kde má být šipka.
   * @example ['left', 'top'] nebo ['right', 'bottom']
   * Příklad: Cvičení `proc-byli-vysidleni`
   */
  subjekt: ["left" | "right", "top" | "bottom"];
  /** Pozice levého horního rohu textového pole v svg. X,Y souřadnice
   * @example 140, 360
   * Příklad: Cvičení `proc-byli-vysidleni`
   */
  pozice: [number, number];
  /** Label pro textové pole, pokud chybí nahradí se placeholder nebo subkategorie */
  label?: string;
}

interface SvgKomiksZnacka {
  /** Pro komiks jako značka je nutno zadat 'znacka', funguje stejně jako u SVG funkcí */
  kategorie: "znacka";

  /** Pozice levého horního rohu značky v svg. X,Y souřadnice.
   * @example 140, 360
   * Příklad: proc-byli-vysidleni
   */
  pozice: [number, number];
  /** Barva značky
   * @example 'blue'
   */
  barva: string; // only for znacka
}

/** Modul přetahování, fungující pro modul SVG a NovaTabulka */
interface Pretahovani {
  /**
   * Nikde nepoužito. Nejspíše kopie předchozího modulu.
   */
  dataFrom: string[];
  /**
   * Určení, jestli nabídky z položky zešednou, když jsou jednou přetaženy do svg.
   * Pokud 'true' - Políčka nikdy nezešednou.
   * @default true
   */
  wasDropped: boolean;
  /**
   * Skupina položek pro přetahování do svg nebo tabulky.
   */
  items: PretahovaniObjekt[];
  /** Název pro skupinu přetahování. */
  name: string;
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'pretahovani-1'
   */
  id: string;
  /** Ke kontrole jaké objekty mohou přijít na vstupu.
   * @example Cvičení `proc-resit-zidovskou-otazku`
   */
  tagName: string;
}
interface PretahovaniObjekt {
  objekt:
    | PretahovaniTag
    | Otazka
    | ObrazekSoubor
    | SvgObjekt
    | Audio
    | Video
    | PretahovaniText;
  /** Typ média. Odopovídá následně objektu.*/
  medium?:
    | "tag"
    | "uzivatelsky text"
    | "obrazek"
    | "svg"
    | "audio"
    | "video"
    | "text";
  /** Popisek pro přetahování */
  popisek: string;
}

/**
 * Tag ve formátu textu;
 * @example 'lékařské' - jak-se-promenila-obec-marianska
 */
type PretahovaniTag = string;
/** Text jako uživatelské pole */
type PretahovaniText = string;

// ----------------  TestKviz ----------------

interface TestKviz {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'test-kviz-1'
   */
  id: string;
  galerie?: Galerie;
  nastaveni?: TestKvizNastaveni;
  /** Optional array of feedback objects
   * @example Cvičení `proc-je-velka-britanie-zemi-caje`
   */
  zpetnaVazba?: TestKvizZpetnaVazba[];
  zadani: KvizOtazka[];
}
/** Nastavení layoutu pro TestKviz */
interface TestKvizNastaveni {
  layout?: Layout.BigGallery;
}

// TODO: generalizovat
interface TestKvizZpetnaVazba {
  /**
   * Určuje kolik je správných odpovědí.
   * @example 0 - žádná odpověď není správná
   * @param 1,2 - jedna nebo dvě odpovědi jsou správné
   * @param 8 - 8 odpovědí je správných
   */
  podminka: number[];
  /** Text tlačítka u zpětné vazby
   * @example "Jednu fotografii bychom uspořádali odlišně."
   */
  text: string;
  /** Brava tlačítka zpětné vazby */
  barva: Color;
}

interface KvizOtazka {
  /** Textová otázka.
   * @example 'Ženy se neúčastnily hostiny – byly společensky méně významné než muži.'
   * @example: Cvičení `jak-zobrazili-sumerskou-spolecnost`
   */
  otazka: string;
  /** Výčet odpovědí pro otázku. */
  odpovedi: KvizOdpoved[];
  /** Pořadí na jakém je správná odpověď.
   * @example 1 - soprávná odpověd je na první zadefinovaná odpověď.
   */
  spravnaOdpoved: number;
}

interface KvizOdpoved {
  /** Text odpovědi. */
  text: string;
  /** Je tato odpověď předvybrána? */
  selected?: boolean;
}

// ----------------  TextovyEditor ----------------

interface TextovyEditor {
  galerie?: Galerie;
  nastaveni?: TextovyEditorNastaveni;
  /** Seznam textů. Kždý text je samostatný editor. */
  texty: TextovyEditorText[];
}
/** Nastavení layoutu pro TextovyEditor */
interface TextovyEditorNastaveni {
  layout?: Layout.BigGallery;
}

interface TextovyEditorText {
  /** Unikátní identifikátor napříč cvičením
   *
   * @example 'textovy-editor-1'
   * @example 1 - prefix je doplněn automaticky
   */
  id: string | number;
  /** Odkaz na html soubor, ve kterém je text uložený. Umístění ve složce `text/{slug-cviceni-doplneny-automaticky}/{nazev-souboru-BEZ-pripony}`
   * @example "text-00"
   */
  text: string;
  /** Definice funkce, kterou editor má plnit.
   * @param cteni - pouhé čtení, nic se nedá editovat
   * @param predznaceny - v editoru jsou předznačené části, které se dají označovat
   * @param zvyraznovani - editor umožňuje označit nějakou pasáž textu, zde se přidává kontext menu
   */
  funkce: "cteni" | "predznaceny" | "zvyraznovani";
  /** TODO: Asi k ničemu?  */
  nazev?: string;
  /** Pouze pro funkci `zvyraznovani`. Položky v menu při označení pasáže. */
  menu?: MenuPolozka[];
  /** Pouze pro funkci `predznaceny`. */
  predznaceni?: TextovyEditorTextPredznaceni[];
}

/** Pouze pro funkci zvyraznovani. Položky v menu při označení pasáže. */
interface MenuPolozka {
  /** Barva položky. */
  color: "red" | "blue" | "orange" | "gray" | "yellow" | "green" | "black";
  /** Unikátní identifikátor napříč textovým editorem.  */
  commandName: string;
  /** Název položky */
  title: string;
}

/** Pouze pro funkci predznaceny */
interface TextovyEditorTextPredznaceni {
  /** Výraz v textu, který má být předznačen. */
  vyraz: string;
  /** Další data asociovaná s daným předznačeným textem. K dispozici pro jiné nástroje (eg. nová tabulka)
   * @example: Cvičení `k-cemu-vyzyvaly-dva-tisice-slov-a-charta-77`
   */
  data?: any;
}

// ----------------  UzivatelskyText ----------------

interface UzivatelskyText {
  galerie?: Galerie;
  /** Submodul nová tabulka. Do submodulu se pouze bere vlastnost 'tabulky' */
  novaTabulka?: NovaTabulka;
  layout?: Layout;
  /** Seznam otázek. */
  otazky: Otazka[];
}

interface Otazka {
  /** Unikátní identifikátor napříč cvičením.
   * @example 'otazka-1'
   */
  id: string;
  /** Zadání otázky.
   * Pokud je textové zadání typu string, dosadí se pouze text.
   * Příklad: proc-byli-uneseni
   * Pokud je textové zadání typu ZadaniZVyberu je jako zadání vybráno jako výsledek výběru z předchozího definovaného modulu Výběr.
   * Příklad: co-se-dozvime-z-propagandistickych-plakatu
   */
  zadani?: ZadaniZVyberu | string;
  /** Instrukce uvnitř textového pole
   * @example  "Myslím si, že…"
   */
  instrukce?: string;
  /** Minimální délka. (počet znaků)
   * @default 2
   */
  minDelka?: number;
  /** Maximální délka. (počet znaků)
   * @default 1000
   */
  maxDelka?: number;
  /** Výška textového pole, jinak řečeno počet řádků.
   * @default 7
   */
  vyska?: number;
  /** Duplikace odpovědi z předchozí otázky. Výčet id otázek.
   * @example "otazka-2"
   */
  duplikovat?: string[];
  /** Textový řetězec, který je předvyplněný v textovém poli. */
  hodnota?: string;
}

/** Získání odpovědi z modulu výběru.
 * Příklad: co-se-dozvime-z-propagandistickych-plakatu
 */
interface ZadaniZVyberu {
  /** `id` modulu výberu, že kterého se má vzít odpověď.
   * @example "vyber-1"
   */
  from: string;
  /** Text, který se má zobrazit, pokud si uživatel ještě nevybral v modulu výběru.
   * @example "Zadání se zobrazí až po výběru položky na předchozím slajdu."
   */
  placeholder: string;
}

// ----------------  Vyber ----------------

interface Vyber {
  /** Unikátní identifikátor napříč cvičením.
   * @example 'vyber-1'
   */
  id: string;
  nastaveni: VyberNastaveni;
  galerie?: Galerie;
  zpetnaVazba?: VyberZpetnaVazba[];
  objekty: VyberObjekt[];
}
interface VyberNastaveni {
  /** Layout výběru.
   * @default 'horizontalni'
   */
  layout?: Layout.Horizontal;
  /** Určuje jestli se dá vybrat více jak jedna odpověď.
   * @example true - více odpovědí
   */
  viceOdpovedi?: boolean;
  /** Pouze pokud je `víceOdpovedi` nastaveno na `true.
   * @example true - všechny položky jsou defaultně vybrány (uživatel odebírá vybrání)
   */
  vybrano?: boolean;
  /** Určuje, jeslti se má zobrazit tlačítko se zpětnou vazbou, či ne.
   * @example true - tlačítko se zpětnou vazbou se nezobrazí.
   */
  disableFeedback?: boolean;
}

// TODO: generalizovat
interface VyberZpetnaVazba {
  /** Brava tlačítka zpětné vazby */
  barva: string;
  /** Text tlačítka u zpětné vazby
   * @example "Vybrali jsme jinou položku."
   */
  text: string;
  /** Určuje kolik odpovědí je správně označeno vybráno / nevybráno. Pro viceOdpovedi = false je potřeba brát v potaz, nevybrané položky.
   * @example 0 - všechny položky mají chybné vybrání (ty co nemají být vybráné, vybrané jsou a naopak)
   * @example 5 - 5 položek je správně vybraných (nevybraných). (ty co nemají být vybráné, josu nevybrané, ty co vybrané jsou jsou správně vybrané, celkový počet je 5)
   */
  podminka: number[];
}

type VyberObjekt =
  | VyberText
  | VyberUzivatelskyText
  | VyberAudio
  | VyberVideo
  | VyberImage;

interface VyberObjektBase {
  /** Typ média */
  medium;
  /** Data pro médium */
  objekt;
  /** Definuje, pokud má být tato položka vybraná, či ne.
   * @example true - ano má být vybrána.
   */
  spravnaOdpoved?: boolean;
  /** Data pro modul uzivatelskyText. Zobrazuje zadaní pro otázku.
   * otazky => zadani.from
   * @example co-se-dozvime-z-propagandistickych-plakatu
   */
  data?: string;
}

interface VyberText extends VyberObjektBase {
  medium: "text";
  objekt: string;
}
interface VyberUzivatelskyText extends VyberObjektBase {
  medium: "uzivatelsky text";
  objekt: Otazka[];
}

interface VyberAudio extends VyberObjektBase {
  medium: "audio";
  objekt: Audio;
}

interface VyberVideo extends VyberObjektBase {
  medium: "video";
  objekt: Video;
}

interface VyberImage extends VyberObjektBase {
  medium: "image";
  objekt: ObrazekSoubor;
}

// ----------------  Galerie ----------------

type Galerie = GalerieObjekt[];

/**Typ, který reprezentuje jakoukoliv položku v galerii */
type GalerieObjekt =
  | GalerieSvg
  | GalerieText
  | GalerieVyber
  | GalerieMultimedialni;

interface GalerieSvg {
  typ: "svg";
  objekt: SvgObjekt;
  /** Popisek pro položku. Nachází se uvnitř položky */
  popisek?: string;
}

/** Uzivatelsky Text nebo text */
interface GalerieText {
  typ: "text";
  /** Text, který se zobrazí v poli, pokud uživatel nic nevyplní v předchozích uživatelských textech, že kterých se berou data. Pokud není definovaný 'duplikovat' zobrazí se pouze text zde napsaný
   */
  objekt: string;
  /** Seznam `id`, že kterých chceme duplikovat uživatelský text. Funguje pouze pro typ 'text'
   * Příklad: co-se-stalo-v-zime-1970 */
  duplikovat?: string[];
  /** Popisek pro položku. Nachází se uvnitř položky */
  popisek?: string;
}

interface GalerieVyber {
  typ: "vyber";
  /** `id` modulu výběru, že kterého chceme dostat vybranou polžku. Funguje pouze pro typ 'vyber'
   * @example Cvičení `co-se-dozvime-z-propagandistickych-plakatu`
   */
  vyberId: string;
  /** Popisek pro položku. Nachází se uvnitř položky */
  popisek?: string;
}

type GalerieMultimedialni = ImageGallery | VideoGallery | AudioGallery;

interface VideoGallery extends Video {
  popisek?: string;
}

interface AudioGallery extends Audio {
  popisek?: string;
}

interface ImageGallery {
  soubor: ObrazekSoubor;
  /** Zobrazení jiného obrázku, pokud se obrázek zvětší na celou obrazovku. */
  zvetseny?: ObrazekSoubor;
  popisek?: string;
}
