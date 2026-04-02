"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { contactEmail } from "@/lib/site-data";

type FooterLink = { label: string; href: string };

type Props = {
  links: FooterLink[];
};

export function FooterContactLinks({ links }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const close = useCallback(() => {
    setOpen(false);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Chore ClarIDy contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    close();
  };

  return (
    <>
      {links.map((link) =>
        link.label === "Contact" ? (
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
        <div className="contact-modal-backdrop" onClick={close} role="presentation">
          <div
            aria-labelledby={titleId}
            aria-modal="true"
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
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
                <button className="button button--primary button--full" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
