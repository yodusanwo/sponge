"use client";

import { useCallback, useEffect, useId, useState } from "react";

const STORAGE_KEY = "choreclaridy-cookie-consent";

function persistChoice(value: "accepted" | "declined") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return;
    setVisible(true);
  }, []);

  const accept = useCallback(() => {
    persistChoice("accepted");
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    persistChoice("declined");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-labelledby={titleId}
      className="cookie-banner"
      role="region"
    >
      <h2 className="cookie-banner__title" id={titleId}>
        This website uses cookies.
      </h2>
      <p className="cookie-banner__text">
        We use cookies to analyze website traffic and optimize your website
        experience. By accepting our use of cookies, your data will be
        aggregated with all other user data.
      </p>
      <div className="cookie-banner__actions">
        <button
          className="cookie-banner__decline"
          onClick={decline}
          type="button"
        >
          Decline
        </button>
        <button className="cookie-banner__accept" onClick={accept} type="button">
          Accept
        </button>
      </div>
    </div>
  );
}
