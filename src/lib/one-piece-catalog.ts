import type { MediaType } from "./one-piece";

export const GENRES = ["action", "thriller", "comedy", "romance", "horror", "psychological", "historical"] as const;
export type Genre = (typeof GENRES)[number];
export const PATHS = ["fantasy", "superhero", "scifi", "real"] as const;
export type Path = (typeof PATHS)[number];
export const EXPERIENCES = ["rush", "feel", "think", "surprise"] as const;
export type Experience = (typeof EXPERIENCES)[number];

export type Title = {
  title: string;
  media: MediaType;
  path: Path;
  genres: Genre[];
  exp: Experience[];
  year: number;
  blurb: string;
};

type Row = [string, MediaType, Path, Genre[], Experience[], number, string];

const ROWS: Row[] = [
  // Movies
  ["The Lord of the Rings: The Fellowship of the Ring", "movies", "fantasy", ["action", "historical"], ["rush", "feel"], 2001, "A small hobbit carries a world-ending ring across Middle-earth."],
  ["Pan's Labyrinth", "movies", "fantasy", ["horror", "psychological", "historical"], ["feel", "surprise"], 2006, "A girl escapes post-war Spain into a dark, dangerous fairy tale."],
  ["The Dark Knight", "movies", "superhero", ["action", "thriller", "psychological"], ["rush", "think"], 2008, "Batman faces a criminal who wants to watch Gotham burn."],
  ["Spider-Man: Into the Spider-Verse", "movies", "superhero", ["action", "comedy"], ["rush", "surprise", "feel"], 2018, "Miles Morales learns anyone can wear the mask."],
  ["Interstellar", "movies", "scifi", ["psychological"], ["think", "feel"], 2014, "Explorers cross a wormhole to save humanity, at the cost of time itself."],
  ["Mad Max: Fury Road", "movies", "scifi", ["action", "thriller"], ["rush"], 2015, "A relentless desert chase through a scorched future."],
  ["Everything Everywhere All at Once", "movies", "scifi", ["action", "comedy", "psychological"], ["surprise", "feel"], 2022, "A laundromat owner fights across the multiverse to save her family."],
  ["Parasite", "movies", "real", ["thriller", "comedy", "psychological"], ["think", "surprise"], 2019, "A poor family infiltrates a wealthy household, with shocking consequences."],
  ["Before Sunrise", "movies", "real", ["romance"], ["feel"], 1995, "Two strangers spend one night walking and talking through Vienna."],
  ["Gladiator", "movies", "real", ["action", "historical"], ["rush", "feel"], 2000, "A betrayed Roman general seeks vengeance in the arena."],
  // Anime
  ["Spirited Away", "anime", "fantasy", ["psychological"], ["feel", "surprise"], 2001, "A girl must work in a spirit bathhouse to free her parents."],
  ["Attack on Titan", "anime", "fantasy", ["action", "horror", "psychological"], ["rush", "think"], 2013, "Humanity's last walled city fights giant man-eating Titans."],
  ["My Hero Academia", "anime", "superhero", ["action", "comedy"], ["rush", "feel"], 2016, "A powerless boy inherits the strength of the world's greatest hero."],
  ["One Punch Man", "anime", "superhero", ["action", "comedy"], ["surprise", "rush"], 2015, "A hero so strong that every fight ends in one punch, and boredom."],
  ["Steins;Gate", "anime", "scifi", ["thriller", "psychological", "romance"], ["think", "feel"], 2011, "A self-proclaimed mad scientist discovers texts that can change the past."],
  ["Cowboy Bebop", "anime", "scifi", ["action", "comedy"], ["rush", "feel"], 1998, "Bounty hunters drift through a jazz-soaked solar system."],
  ["Your Name", "anime", "real", ["romance"], ["feel", "surprise"], 2016, "Two strangers mysteriously swap bodies across Japan."],
  ["Monster", "anime", "real", ["thriller", "psychological"], ["think"], 2004, "A surgeon hunts the killer whose life he once saved."],
  ["Vinland Saga", "anime", "real", ["action", "historical"], ["rush", "think"], 2019, "A young Viking seeks revenge, and later something far greater."],
  // Shows
  ["Game of Thrones", "shows", "fantasy", ["action", "thriller", "historical"], ["rush", "think"], 2011, "Noble houses fight for the Iron Throne as winter approaches."],
  ["Arcane", "shows", "fantasy", ["action", "psychological"], ["feel", "rush"], 2021, "Two sisters are torn apart by a city at war with itself."],
  ["The Boys", "shows", "superhero", ["action", "comedy", "thriller"], ["rush", "surprise"], 2019, "Vigilantes take on corrupt, celebrity superheroes."],
  ["Severance", "shows", "scifi", ["thriller", "psychological"], ["think", "surprise"], 2022, "Office workers have their work memories surgically split from their lives."],
  ["Black Mirror", "shows", "scifi", ["thriller", "horror", "psychological"], ["think", "surprise"], 2011, "Standalone stories about technology's darkest edges."],
  ["Breaking Bad", "shows", "real", ["thriller", "psychological"], ["rush", "think"], 2008, "A chemistry teacher turns drug kingpin."],
  ["Fleabag", "shows", "real", ["comedy", "romance"], ["feel", "surprise"], 2016, "A sharp, grieving woman navigates life in London."],
  ["Chernobyl", "shows", "real", ["thriller", "historical"], ["think", "feel"], 2019, "The true story of the 1986 nuclear disaster and its cover-up."],
  // Manga
  ["Berserk", "manga", "fantasy", ["action", "horror", "psychological"], ["rush", "think"], 1989, "A lone mercenary battles demons and fate in a brutal medieval world."],
  ["Frieren: Beyond Journey's End", "manga", "fantasy", ["psychological"], ["feel"], 2020, "An elf mage reflects on time and friendship after the hero's journey ends."],
  ["One-Punch Man", "manga", "superhero", ["action", "comedy"], ["rush", "surprise"], 2012, "The overpowered hero who just wants a real fight."],
  ["Akira", "manga", "scifi", ["action", "thriller"], ["rush", "think"], 1982, "Biker gangs and psychic power tear apart Neo-Tokyo."],
  ["20th Century Boys", "manga", "scifi", ["thriller", "psychological"], ["think", "surprise"], 1999, "Childhood friends confront a cult leader who copied their games."],
  ["Vagabond", "manga", "real", ["action", "historical"], ["rush", "feel"], 1998, "The legendary swordsman Musashi's path to enlightenment."],
  ["Uzumaki", "manga", "real", ["horror", "psychological"], ["surprise", "think"], 1998, "A small town becomes cursed by spirals."],
  ["Nana", "manga", "real", ["romance", "comedy"], ["feel"], 2000, "Two young women named Nana share a Tokyo apartment and their dreams."],
  // Comics
  ["The Sandman", "comics", "fantasy", ["horror", "psychological"], ["think", "surprise"], 1989, "Dream of the Endless rebuilds his kingdom and confronts his own nature."],
  ["Saga", "comics", "fantasy", ["action", "romance", "comedy"], ["feel", "surprise"], 2012, "Lovers from warring races raise their child on the run across the galaxy."],
  ["Watchmen", "comics", "superhero", ["thriller", "psychological"], ["think"], 1986, "Retired heroes investigate a murder that unravels the world order."],
  ["Batman: Year One", "comics", "superhero", ["action", "thriller"], ["rush"], 1987, "Bruce Wayne's first year fighting crime in a corrupt Gotham."],
  ["Kingdom Come", "comics", "superhero", ["action", "historical"], ["feel", "think"], 1996, "Aging heroes return to stop a reckless new generation."],
  ["Paper Girls", "comics", "scifi", ["action", "comedy"], ["surprise", "rush"], 2015, "Four newspaper girls get swept into a time war in 1988."],
  ["Maus", "comics", "real", ["historical", "psychological"], ["feel", "think"], 1986, "A son records his father's survival of the Holocaust."],
  ["Persepolis", "comics", "real", ["historical", "comedy"], ["feel"], 2000, "A girl comes of age during the Iranian Revolution."],
  // Novels
  ["The Name of the Wind", "novels", "fantasy", ["action", "romance"], ["feel", "rush"], 2007, "A legendary wizard tells the true story of his life."],
  ["Piranesi", "novels", "fantasy", ["psychological"], ["surprise", "think"], 2020, "A man lives alone in an endless house of statues and tides."],
  ["Worm", "novels", "superhero", ["action", "psychological"], ["rush", "think"], 2011, "A bullied teen with bug-control powers tries to be a hero."],
  ["Dune", "novels", "scifi", ["action", "thriller"], ["think", "rush"], 1965, "A noble heir fights for a desert planet and its precious spice."],
  ["Project Hail Mary", "novels", "scifi", ["comedy"], ["feel", "rush", "surprise"], 2021, "A lone astronaut wakes up with no memory and a mission to save Earth."],
  ["The Three-Body Problem", "novels", "scifi", ["thriller", "historical"], ["think"], 2008, "Humanity's first contact with aliens begins during China's Cultural Revolution."],
  ["Gone Girl", "novels", "real", ["thriller", "psychological"], ["think", "surprise"], 2012, "A wife vanishes, and her husband becomes the prime suspect."],
  ["Pride and Prejudice", "novels", "real", ["romance", "comedy", "historical"], ["feel"], 1813, "Elizabeth Bennet and Mr. Darcy misjudge each other."],
  ["The Count of Monte Cristo", "novels", "real", ["action", "thriller", "historical"], ["rush", "feel"], 1844, "A wrongly imprisoned man plots an elaborate revenge."],
  ["The Shining", "novels", "real", ["horror", "psychological"], ["rush", "think"], 1977, "A family wintering at a remote hotel faces its malevolent force."],
];

export const CATALOG: Title[] = ROWS.map(([title, media, path, genres, exp, year, blurb]) => ({ title, media, path, genres, exp, year, blurb }));

export function scoreTitle(t: Title, path: Path, crew: Genre[], exp: Experience): number {
  let s = 0;
  if (t.path === path) s += 3;
  s += 2 * t.genres.filter((g) => crew.includes(g)).length;
  if (t.exp.includes(exp)) s += 3;
  return s;
}

/** All titles of the chosen media, best match first. Never empty for a valid media type. */
export function rankTreasures(media: MediaType, path: Path, crew: Genre[], exp: Experience): Title[] {
  return CATALOG.filter((t) => t.media === media)
    .map((t) => ({ t, s: scoreTitle(t, path, crew, exp) }))
    .sort((a, b) => b.s - a.s || a.t.title.localeCompare(b.t.title))
    .map((x) => x.t);
}

export function whyThis(t: Title, path: Path, crew: Genre[], exp: Experience): string {
  const parts: string[] = [];
  const g = t.genres.filter((x) => crew.includes(x));
  if (g.length) parts.push(`it sails with your ${g.join(" & ")} crew`);
  if (t.path === path) parts.push(`it belongs to the ${PATH_LABEL[path]} seas you chose`);
  if (t.exp.includes(exp)) parts.push(`it delivers the "${EXP_LABEL[exp]}" experience`);
  return parts.length ? `Chosen because ${parts.join(", and ")}.` : "A wildcard from the deep — outside your usual waters.";
}

export const PATH_LABEL: Record<Path, string> = { fantasy: "Fantasy", superhero: "Superhero", scifi: "Sci-Fi", real: "Real World" };
export const EXP_LABEL: Record<Experience, string> = { rush: "Adrenaline Rush", feel: "Feel Something Deeply", think: "Make Me Think", surprise: "Surprise Me" };
