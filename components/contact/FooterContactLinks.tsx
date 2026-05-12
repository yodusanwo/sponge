"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";

type FooterLink = { label: string; href: string };

type Props = {
  links: FooterLink[];
};

type SubmitState = "idle" | "sending" | "sent" | "error";

/** Footer labels that open the shared contact modal instead of navigating. */
const CONTACT_MODAL_LABELS = new Set(["Contact", "Wholesale"]);

export function FooterContactLinks({ links }: Props) {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const titleId = useId();
  const statusId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSubmitState("idle");
    setStatusMessage("");
    formRef.current?.reset();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setSubmitState("error");
      setStatusMessage("Please fill out every field.");
      return;
    }

    setSubmitState("sending");
    setStatusMessage("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Email could not be sent.");
      }

      form.reset();
      setSubmitState("sent");
      setStatusMessage("Thanks! Your message has been sent.");
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Email could not be sent. Please try again.",
      );
    }
  };

  return (
    <>
      {links.map((link) =>
        CONTACT_MODAL_LABELS.has(link.label) ? (
          <button
            key={link.label}
            className="footer-contact-trigger"
            type="button"
            onClick={() => setOpen(true)}
          >
            {link.label}
          </button>
        ) : (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ),
      )}

      {open ? (
        <div
          className="contact-modal-backdrop"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <div
            aria-labelledby={titleId}
            aria-modal="true"
            className="contact-modal"
            role="dialog"
          >
            <button
              aria-label="Close contact dialog"
              className="contact-modal__close"
              type="button"
              onClick={close}
            >
              ×
            </button>
            <h2 className="contact-modal__title" id={titleId}>
              Contact
            </h2>
            <p className="contact-modal__text">
              Questions about Chore ClarIDy? Send us a message and we&apos;ll get back to you.
            </p>
            <form
              ref={formRef}
              aria-describedby={statusMessage ? statusId : undefined}
              className="contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor={nameId}>
                  Name
                </label>
                <input
                  autoComplete="name"
                  className="contact-form__input"
                  id={nameId}
                  name="name"
                  required
                  type="text"
                />
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor={emailId}>
                  Email
                </label>
                <input
                  autoComplete="email"
                  className="contact-form__input"
                  id={emailId}
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor={messageId}>
                  Message
                </label>
                <textarea
                  className="contact-form__textarea"
                  id={messageId}
                  name="message"
                  required
                  rows={4}
                />
              </div>
              <div className="contact-form__actions">
                <button
                  className="button button--primary button--full"
                  disabled={submitState === "sending"}
                  type="submit"
                >
                  {submitState === "sending" ? "Sending..." : "Send"}
                </button>
              </div>
              {statusMessage ? (
                <p
                  className={`contact-form__status contact-form__status--${submitState}`}
                  id={statusId}
                  role="status"
                >
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
