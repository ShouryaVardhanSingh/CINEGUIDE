// TEMPORARY FRONTEND DATA — replace with backend queries (see src/lib/review-service.ts).
export type CategoryId = "movies" | "series" | "anime" | "manga" | "comics" | "novels";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  searchNoun: string;
  momentLabel: string;
  momentPlaceholder: string;
  spines: string[]; // oklch colours for book spines on the shelf
}

export interface Title {
  id: string;
  category: CategoryId;
  name: string;
  year: number;
  creator: string;
  cover?: string;
}

export interface Review {
  id: string;
  titleId: string;
  reviewer: string;
  rating: number;
  liked: string;
  disliked: string;
  moment: string;
}

export const CATEGORIES: Category[] = [
  { id: "movies", name: "Movies", blurb: "Films from across the world", searchNoun: "movies", momentLabel: "Your Iconic Scene", momentPlaceholder: "Describe the scene that stayed with you...", spines: ["oklch(0.4 0.12 25)", "oklch(0.3 0.05 45)", "oklch(0.55 0.1 70)", "oklch(0.35 0.08 30)"] },
  { id: "series", name: "Series", blurb: "TV shows and web series", searchNoun: "television series", momentLabel: "Your Iconic Episode", momentPlaceholder: "Describe the episode or moment that stayed with you...", spines: ["oklch(0.38 0.07 160)", "oklch(0.5 0.09 75)", "oklch(0.32 0.05 50)", "oklch(0.45 0.08 140)"] },
  { id: "anime", name: "Anime", blurb: "Anime films and series", searchNoun: "anime", momentLabel: "Your Iconic Scene", momentPlaceholder: "Describe the moment that stayed with you...", spines: ["oklch(0.55 0.15 30)", "oklch(0.7 0.12 85)", "oklch(0.45 0.1 15)", "oklch(0.6 0.1 60)"] },
  { id: "manga", name: "Manga", blurb: "Manga and illustrated stories", searchNoun: "manga", momentLabel: "Your Iconic Panel or Chapter", momentPlaceholder: "Describe the panel or chapter that stayed with you...", spines: ["oklch(0.92 0.02 85)", "oklch(0.25 0.02 45)", "oklch(0.5 0.15 25)", "oklch(0.8 0.04 80)"] },
  { id: "comics", name: "Comics", blurb: "Comics and graphic novels", searchNoun: "comics", momentLabel: "Your Iconic Panel", momentPlaceholder: "Describe the panel or issue that stayed with you...", spines: ["oklch(0.5 0.17 28)", "oklch(0.78 0.14 88)", "oklch(0.4 0.08 50)", "oklch(0.6 0.13 45)"] },
  { id: "novels", name: "Novels", blurb: "Fiction and literary works", searchNoun: "novels", momentLabel: "Your Iconic Passage", momentPlaceholder: "Describe the passage or moment that stayed with you...", spines: ["oklch(0.35 0.08 145)", "oklch(0.4 0.1 25)", "oklch(0.5 0.08 70)", "oklch(0.28 0.04 50)"] },
];

const t = (category: CategoryId, name: string, year: number, creator: string): Title => ({
  id: `${category}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
  category, name, year, creator,
});

export const TITLES: Title[] = [
  t("movies", "Interstellar", 2014, "Christopher Nolan"),
  t("movies", "Spirited Away", 2001, "Hayao Miyazaki"),
  t("movies", "The Godfather", 1972, "Francis Ford Coppola"),
  t("movies", "Parasite", 2019, "Bong Joon-ho"),
  t("movies", "Inception", 2010, "Christopher Nolan"),
  t("movies", "The Dark Knight", 2008, "Christopher Nolan"),
  t("series", "Breaking Bad", 2008, "Vince Gilligan"),
  t("series", "Friends", 1994, "Kauffman & Crane"),
  t("series", "Game of Thrones", 2011, "Benioff & Weiss"),
  t("series", "Stranger Things", 2016, "The Duffer Brothers"),
  t("series", "The Office", 2005, "Greg Daniels"),
  t("anime", "Demon Slayer", 2019, "Ufotable"),
  t("anime", "Your Name", 2016, "Makoto Shinkai"),
  t("anime", "Attack on Titan", 2013, "Wit Studio / MAPPA"),
  t("anime", "Fullmetal Alchemist: Brotherhood", 2009, "Bones"),
  t("anime", "Death Note", 2006, "Madhouse"),
  t("manga", "One Piece", 1997, "Eiichiro Oda"),
  t("manga", "Berserk", 1989, "Kentaro Miura"),
  t("manga", "Vagabond", 1998, "Takehiko Inoue"),
  t("manga", "Death Note", 2003, "Ohba & Obata"),
  t("manga", "Chainsaw Man", 2018, "Tatsuki Fujimoto"),
  t("comics", "Watchmen", 1986, "Alan Moore"),
  t("comics", "Marvel: Civil War", 2006, "Mark Millar"),
  t("comics", "The Sandman", 1989, "Neil Gaiman"),
  t("comics", "Batman: Year One", 1987, "Frank Miller"),
  t("comics", "Saga", 2012, "Brian K. Vaughan"),
  t("novels", "Harry Potter and the Philosopher's Stone", 1997, "J.K. Rowling"),
  t("novels", "Pride and Prejudice", 1813, "Jane Austen"),
  t("novels", "The Hobbit", 1937, "J.R.R. Tolkien"),
  t("novels", "1984", 1949, "George Orwell"),
  t("novels", "The Name of the Wind", 2007, "Patrick Rothfuss"),
];

export const POPULAR: Record<CategoryId, string[]> = {
  movies: ["Interstellar", "Spirited Away", "Parasite", "Inception"],
  series: ["Breaking Bad", "Friends", "Stranger Things", "The Office"],
  anime: ["Demon Slayer", "Your Name", "Death Note", "Attack on Titan"],
  manga: ["One Piece", "Berserk", "Chainsaw Man", "Vagabond"],
  comics: ["Watchmen", "Marvel: Civil War", "The Sandman", "Saga"],
  novels: ["Harry Potter and the Philosopher's Stone", "The Hobbit", "1984", "Pride and Prejudice"],
};

const NAMES = ["Elowen Ashby", "quillkeeper", "Arjun Mehra", "moonlit_reader", "Sora Tanaka", "Thea Lindqvist"];

export function seedReviews(title: Title): Review[] {
  const seed = [...title.id].reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 2 + (seed % 2);
  return Array.from({ length: count }, (_, i) => ({
    id: `${title.id}-r${i}`,
    titleId: title.id,
    reviewer: NAMES[(seed + i * 2) % NAMES.length]!,
    rating: 3 + ((seed + i) % 3),
    liked: [
      `${title.name} has a way of pulling you in and refusing to let go. The craft behind it is evident in every frame and page.`,
      `The atmosphere and the characters felt lived-in. ${title.creator} clearly poured their soul into it.`,
      `It rewards patience — the slow build pays off in a finale that I still think about.`,
    ][(seed + i) % 3]!,
    disliked: [
      "Some stretches in the middle dragged a little longer than they needed to.",
      "A couple of side characters deserved more room to breathe.",
      "The ending felt slightly rushed compared to the careful build-up.",
    ][(seed + i * 3) % 3]!,
    moment: [
      "The quiet moment before everything changes — no words, just a look. Chills.",
      "That reveal near the end recontextualised everything I had seen before it.",
      "A small, gentle scene of kindness that hit harder than any battle.",
    ][(seed + i * 5) % 3]!,
  }));
}
