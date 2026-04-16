type JsonLdProps = {
  data: object;
};

/** Emits Schema.org JSON-LD. Escapes `<` in serialized JSON for safe embedding in HTML. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
