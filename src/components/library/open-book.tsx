import type { ReactNode } from "react";
import quill from "@/assets/peacock-quill.png";

/**
 * The signature open antique book: two parchment pages, a central fold,
 * ornamental corners and the peacock-feather quill resting across the fold.
 */
export function OpenBook({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="animate-scene-in relative mx-auto w-full max-w-5xl">
      <div className="open-book gold-frame relative grid grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2">
        {/* Left page */}
        <div className="book-page parchment relative px-6 py-8 sm:px-10 sm:py-10 md:pr-16">
          <CornerOrnament className="left-2 top-2" />
          <CornerOrnament className="bottom-2 left-2 -rotate-90" />
          {left}
        </div>

        {/* Central fold */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 hidden w-10 -translate-x-1/2 md:block"
          data-book-fold="vertical"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 md:hidden"
          data-book-fold="horizontal"
        />

        {/* Peacock quill resting across the fold */}
        <img
          src={quill}
          alt=""
          aria-hidden
          className="book-quill animate-quill-drop pointer-events-none absolute left-1/2 top-24 z-10 hidden w-20 md:block"
        />

        {/* Right page */}
        <div className="book-page parchment relative px-6 py-8 sm:px-10 sm:py-10 md:pl-16">
          <CornerOrnament className="right-2 top-2 rotate-90" />
          <CornerOrnament className="bottom-2 right-2 rotate-180" />
          {right}
        </div>
      </div>
    </div>
  );
}

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 40"
      className={`pointer-events-none absolute h-8 w-8 text-bronze/60 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M2 38 V12 Q2 2 12 2 H38" />
      <path d="M8 38 V16 Q8 8 16 8 H38" opacity="0.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
