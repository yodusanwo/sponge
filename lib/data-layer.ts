/**
 * Pushes events to `window.dataLayer` for Google Tag Manager / GA4.
 * In GTM: create a Custom Event trigger for event name `amazon_outbound_click`
 * (or use the Data Layer variable names below in a GA4 Event tag).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export type AmazonOutboundPayload = {
  link_url: string;
  /** Where on the page the CTA lives (e.g. hero, nav_desktop). */
  cta_location: string;
  /** Button or link label when available. */
  link_text?: string;
};

/** Fires when a user clicks through to Amazon — primary conversion signal. */
export function trackAmazonOutboundClick(payload: AmazonOutboundPayload) {
  pushToDataLayer({
    event: "amazon_outbound_click",
    outbound_vendor: "amazon",
    ...payload,
  });
}
