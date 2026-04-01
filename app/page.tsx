import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import {
  amazonUrl,
  comparisonRows,
  figmaImages,
  featureHighlights,
  heroBullets,
  spongeCards,
  wholesaleBullets,
} from "@/lib/site-data";

export default function Home() {
  return (
    <main id="top">
      <Navbar />

      <section className="hero section">
        <div className="hero-grid">
          <div className="hero-copy hero-copy--overlay">
            <h1>
              Stop wondering where
              <br />
              that sponge has been
            </h1>
            <p className="lead">
              Four clearly labeled sponges — one for dishes, kitchen counters,
              <br />
              bathroom counters, and the toilet. No mix-ups. No second-guessing.
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

          <div
            className="hero-photo"
            aria-hidden="true"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42)), url(${figmaImages.hero})` }}
          />
        </div>
      </section>

      <section className="section section--soft" id="how-it-works">
        <div className="shell split-section">
          <div className="split-copy">
            <div className="section-heading section-heading--left section-heading--wide">
              <h2>When every sponge looks the same, mix-ups happen</h2>
              <p>
                In most homes, every sponge looks identical, so they end up
                everywhere. One minute it&apos;s on the dishes, the next it&apos;s wiping
                down the bathroom.
              </p>
            </div>

            <div className="story-bullets story-bullets--left">
              {heroBullets.map((item) => (
                <article className="bullet-card bullet-card--wide" key={item.title}>
                  <span
                    aria-hidden="true"
                    className={`bullet-icon bullet-icon--${item.tone ?? "positive"}`}
                  >
                    {item.tone === "negative" ? "×" : "✓"}
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
            className="split-image"
            aria-hidden="true"
            style={{ backgroundImage: `url(${figmaImages.confusion})` }}
          />
        </div>
      </section>

      <section className="section" id="the-sponges">
        <div className="shell">
          <div className="section-heading">
            <h2>Four areas. Four clearly labeled sponges</h2>
            <p>
              No explaining. No remembering. Just grab the right one and get it
              done.
            </p>
          </div>

          <div className="sponge-grid">
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
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="why-better">
        <div className="shell">
          <div className="section-heading">
            <h2>Not all sponges are the same</h2>
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

      <section className="section section--compact" id="who-its-for">
        <div className="shell">
          <div className="section-heading">
            <h2>{wholesaleBullets[1]?.title}</h2>
            <p>
              {wholesaleBullets[1]?.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell feature-layout">
          <div
            className="feature-layout__visual"
            aria-hidden="true"
            style={{ backgroundImage: `url(${figmaImages.audience})` }}
          />

          <div className="feature-grid">
            {featureHighlights.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="shell cta-card">
          <div className="cta-card__copy">
            <h2>Give every sponge a job</h2>
            <p>
              Fast Amazon checkout. Quick delivery. Clean with confidence.
            </p>
            <Button href={amazonUrl}>Order Chore ClarIDy on Amazon</Button>
          </div>
          <div
            className="cta-card__visual"
            aria-hidden="true"
            style={{ backgroundImage: `url(${figmaImages.cta})` }}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
