import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import {
  amazonUrl,
  comparisonRows,
  featureHighlights,
  heroBullets,
  spongeCards,
  wholesaleBullets,
} from "@/lib/site-data";

/** Line break after “touches” only when `.sponge-desc-br--ipad-only` is shown (tablet / iPad widths). */
function SpongeCardDescription({ description, title }: { description: string; title: string }) {
  if (title !== "Toilet") return <>{description}</>;
  const breakAt = description.indexOf(" anything else.");
  if (breakAt === -1) return <>{description}</>;
  return (
    <>
      {description.slice(0, breakAt)}
      <br aria-hidden="true" className="sponge-desc-br--ipad-only" />
      {description.slice(breakAt).trimStart()}
    </>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Navbar />

      <section className="hero section">
        <div className="hero-grid">
          <div className="hero-copy hero-copy--overlay">
            <h1>Stop wondering where that sponge has been</h1>
            <p className="lead">
              4 clearly labeled sponges — one for dishes, kitchen counters, bathroom
              counters, and the toilet. No mix-ups. No second-guessing. Just clean.
            </p>

            <div className="hero-actions">
              <Button href={amazonUrl}>
                Get Chore ClarIDy on Amazon
              </Button>
              <Button href="#how-it-works" variant="secondary">
                See how it works
              </Button>
            </div>
          </div>

          <div className="hero-photo" aria-hidden="true" />
        </div>
      </section>

      <section className="section section--soft" id="how-it-works">
        <div className="shell split-section">
          <div className="split-copy">
            <div className="section-heading section-heading--left section-heading--wide">
              <h2>
                <span className="heading-line">When every sponge</span>
                <br />
                <span className="heading-line">looks the same —</span>
                <br />
                <span className="heading-line">mix-ups happen</span>
              </h2>
              <p>
                In most homes, every sponge looks identical — so they end up
                everywhere. One minute it&apos;s used in the bathroom, the next
                it&apos;s back in your kitchen. Nobody wants that moment of
                realization.
              </p>
            </div>

            <div className="story-bullets story-bullets--left">
              {heroBullets.map((item) => (
                <article className="bullet-card bullet-card--wide" key={item.title}>
                  <span
                    aria-hidden="true"
                    className={`bullet-icon bullet-icon--${item.tone ?? "positive"}`}
                  >
                    {item.tone === "negative" ? (
                      <Image alt="" height={30} src="/close.svg" width={30} />
                    ) : (
                      <Image alt="" height={30} src="/check.svg" width={30} />
                    )}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>

            <div className="hero-actions">
              <Button href={amazonUrl}>Get Chore ClarIDy on Amazon</Button>
            </div>
          </div>

          <div
            className="split-image split-image--sink"
            aria-hidden="true"
            style={{ backgroundImage: "url('/Spongebysink.jpg')" }}
          />
        </div>
      </section>

      <section className="section section--brand-panel">
        <div className="shell brand-panel-shell">
          <div className="brand-panel-card">
            <video
              autoPlay
              className="brand-panel-video"
              controls
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/download.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="section" id="the-sponges">
        <div className="shell">
          <div className="section-heading">
            <h2>4 areas &amp; 4 clearly labeled sponges</h2>
            <p>
              No explaining. No remembering. Just grab the right one and get it
              done.
            </p>
          </div>

          <div className="sponge-grid sponge-grid--four-areas">
            {spongeCards.map((card) => (
              <article className="sponge-card" key={card.title}>
                <div
                  className="sponge-card__art"
                  style={{
                    backgroundImage: `url(${card.imageUrl})`,
                    transform: `rotate(${card.rotation ?? "0deg"})`,
                  }}
                />
                <div className="sponge-card__copy">
                  <h3>{card.title}</h3>
                  <p>
                    <SpongeCardDescription description={card.description} title={card.title} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft section--comparison" id="why-better">
        <div className="shell comparison-shell">
          <div className="section-heading section-heading--comparison">
            <h2 className="heading-single-line-desktop">Not all sponges are the same</h2>
            <p>
              Here&apos;s what makes Chore ClarIDy a smarter clean.
            </p>
          </div>

          <div
            className="comparison-table comparison-table--desktop"
            role="table"
            aria-label="Comparison table"
          >
            <div className="comparison-row comparison-row--head" role="row">
              <div role="columnheader">Feature</div>
              <div role="columnheader">Regular sponges</div>
              <div role="columnheader">Chore ClarIDy</div>
            </div>

            {comparisonRows.map((row) => (
              <div className="comparison-row" key={row.feature} role="row">
                <div role="cell">{row.feature}</div>
                <div role="cell">{row.regularSponges}</div>
                <div role="cell">{row.choreClaridy}</div>
              </div>
            ))}
          </div>

          <div className="comparison-cards comparison-cards--mobile">
            {comparisonRows.map((row) => (
              <article className="comparison-card" key={row.feature}>
                <h3>{row.feature}</h3>
                <div className="comparison-card__section">
                  <p className="comparison-card__label">Regular sponges</p>
                  <p>{row.regularSponges}</p>
                </div>
                <div className="comparison-card__section comparison-card__section--highlight">
                  <p className="comparison-card__label">Chore ClarIDy</p>
                  <p>{row.choreClaridy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--compact section--routine-summary" id="who-its-for">
        <div className="shell">
          <div className="section-heading">
            <h2>{wholesaleBullets[1]?.title}</h2>
            <p>
              {wholesaleBullets[1]?.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--feature-audience">
        <div className="shell feature-layout">
          <div
            className="feature-layout__visual feature-layout__visual--audience"
            aria-hidden="true"
            style={{ backgroundImage: "url('/SpongeaboveToilet.png')" }}
          />

          <div className="feature-grid">
            {featureHighlights.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3
                  className={
                    feature.title.includes("\n")
                      ? "feature-card__title--stack-tablet"
                      : undefined
                  }
                >
                  {feature.title.split("\n").map((line, index) => (
                    <span className="feature-card__title-line" key={`${feature.title}-${index}`}>
                      {line}
                    </span>
                  ))}
                </h3>
                <p>
                  {feature.description.split("\n").map((line, index) => (
                    <span className="feature-card__body-line" key={`${feature.title}-body-${index}`}>
                      {line}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="shell cta-card">
          <div className="cta-card__copy">
            <h2>Give every sponge a{"\u00A0"}job</h2>
            <p>
              Fast Amazon checkout. Quick delivery.
              <br />
              Clean with confidence.
            </p>
            <Button href={amazonUrl}>Order Chore ClarIDy on Amazon</Button>
          </div>
          <div
            className="cta-card__visual cta-card__visual--spongenbox"
            aria-hidden="true"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
