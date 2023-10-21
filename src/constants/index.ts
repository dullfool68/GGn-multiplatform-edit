// SELECTORS
export const CURRENT_LINKED_GROUP_SELECTOR = "#curlinkedgroup";
export const LINKED_GROUP_SELECTOR = "#grouplinks a #linkedgroup";
export const WEBLINKS_SELECTOR = "#weblinksdiv a";
export const TAGS_SELECTOR = "#tagslist li > a:first-child";
export const DELETE_TAGS_SELECTOR = "a[href*=delete_tag]";
export const COLLAGE_SELECTOR = "#collages a"; // Category = Theme, Best Of, Arranger
export const SERIES_SELECTOR = ".series_title a"; // Category = Series
export const GROUP_INFO = "#sidebar_group_info a"; // Category = Developer, Publisher, Designer, Composer, Engine, Feature, Franchise, Author
export const PACK_INFO = ".box.box_pack a"; // Category = Pack
export const COLLECTIONS_SELECTORS = [
  COLLAGE_SELECTOR,
  SERIES_SELECTOR,
  GROUP_INFO,
  PACK_INFO,
];

// LINKED GROUPS
export const PC_LINKED_GROUPS_TITLES: string[] = ["Windows", "Mac", "Linux"];

export const EXCLUDED_LINKED_GROUPS: string[] = [
  "Applications",
  "E-Books",
  "OST",
];

// COLLECTIONS

/** A list of collection ids you don't want to be copied to any linked group */
export const EXCLUDED_COLLECTION_IDS: string[] = [];

/** A list of collection ids you don't want to be copied to any PC linked group (see PC_LINKED_GROUPS_TITLES) */
export const EXCLUDED_PC_COLLECTION_IDS: string[] = [];

/** A list of collection ids you don't want to be copied to any console linked group */
export const EXCLUDED_CONSOLE_COLLECTION_IDS: string[] = [
  "551", // Native Controller Support
];

// WEBLINKS
export const EXCLUDED_WEBLINKS: string[] = ["Amazon", "GameFAQs"];

// MAPPING
/**
 * A map which pairs the ids of weblink input fields with the field name we get from the API
 */
export const WEBLINKS_LABEL_URI_MAPPING = {
  gameswebsiteuri: "GamesWebsite",
  wikipediauri: "Wikipedia",
  giantbomburi: "Giantbomb",
  vndburi: "VGMdb",
  howlongtobeaturi: "HowLongToBeat",
  amazonuri: "Amazon",
  gamefaqsuri: "GameFAQs",
  mobygamesuri: "MobyGames",
  itunesuri: "iTunes",
  googleplayuri: "GooglePlay",
  steamuri: "Steam",
  goguri: "GOG",
  humbleuri: "HumbleBundle",
  itchuri: "Itch",
  pcwikiuri: "PCGamingWiki",
  epicgamesuri: "EpicGames",
  psnuri: "PSN",
  nintendouri: "Nintendo",
  nexusmodsuri: "NexusMods",
};

// REGEXES
export const TEXT_INSIDE_PARANTHESIS_REGEX = /\(([^)]+)\)/;
