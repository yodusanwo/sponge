"use client";

import { useCallback, useEffect, useState } from "react";

import type { ClientReview } from "@/lib/site-data";

const AUTO_MS = 5000;

type Props = {
  reviews: ClientReview[];
};

export function ClientResultsCarousel({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = reviews.length;
  const safeLen = len > 0 ? len : 1;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % safeLen) + safeLen) % safeLen);
    },
    [safeLen],
  );

  useEffect(() => {
    if (len < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [len, paused]);

  if (len === 0) return null;

  return (
    <div
      className="client-results-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="client-results-carousel__viewport">
        <ul
          aria-live="polite"
          className="client-results-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((r, i) => (
            <li className="client-results-carousel__slide" key={r.id}>
              <article
                aria-hidden={i !== index}
                className="client-results-card"
                id={`client-review-panel-${r.id}`}
              >
                <blockquote className="client-results-card__quote">
                  <p>&ldquo;{r.quote}&rdquo;</p>
                </blockquote>
                <footer className="client-results-card__meta">
                  <cite className="client-results-card__author">{r.author}</cite>
                  {r.subtitle ? <p className="client-results-card__subtitle">{r.subtitle}</p> : null}
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {len > 1 ? (
        <div className="client-results-carousel__dots" aria-label="Review slides">
          {reviews.map((r, i) => (
            <button
              aria-current={i === index ? "true" : undefined}
              aria-label={`Show review ${i + 1} of ${len}`}
              className={
                i === index
                  ? "client-results-carousel__dot client-results-carousel__dot--active"
                  : "client-results-carousel__dot"
              }
              key={r.id}
              type="button"
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
