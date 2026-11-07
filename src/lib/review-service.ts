// Data access boundary. Today it uses temporary frontend data;
// swap these implementations for backend calls later without touching the UI.
import { TITLES, seedReviews, type CategoryId, type Review, type Title } from "@/data/mock-library";

const submitted: Review[] = [];

export async function searchTitles(category: CategoryId, query: string): Promise<Title[]> {
  const q = query.trim().toLowerCase();
  return TITLES.filter((t) => t.category === category && (!q || t.name.toLowerCase().includes(q)));
}

export async function getReviews(title: Title): Promise<Review[]> {
  return [...submitted.filter((r) => r.titleId === title.id), ...seedReviews(title)];
}

export interface ReviewDraft {
  rating: number;
  liked: string;
  disliked: string;
  moment: string;
}

export function validateReview(d: ReviewDraft): Partial<Record<keyof ReviewDraft, string>> {
  const e: Partial<Record<keyof ReviewDraft, string>> = {};
  if (!Number.isInteger(d.rating) || d.rating < 1 || d.rating > 5) e.rating = "Choose a rating from 1 to 5 stars.";
  if (d.liked.trim().length < 3) e.liked = "Tell us what you liked.";
  if (d.disliked.trim().length < 3) e.disliked = "Share what could have been better.";
  if (d.moment.trim().length < 3) e.moment = "Describe the moment that stayed with you.";
  return e;
}

export async function submitReview(title: Title, d: ReviewDraft): Promise<Review> {
  const r: Review = { id: crypto.randomUUID(), titleId: title.id, reviewer: "You", ...d };
  submitted.unshift(r);
  return r;
}
