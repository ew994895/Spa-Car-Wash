import { useEffect } from "react";
import { business, faqs, membershipBenefits, testimonials, washPackages } from "@/app/site-data";
import { navigate } from "@/app/router";
import { BusinessStatus, PlacementKey, Promotion, WaitTimesState } from "@/app/state";

interface HomePageProps {
  initialSection?: string;
  promotions: Promotion[];
  status: BusinessStatus;
  waitTimes: WaitTimesState;
}

function formatTimestamp(value?: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function PromotionBlock({ promotions, placement }: { promotions: Promotion[]; placement: PlacementKey }) {
  const items = promotions.filter((item) => item.active && item.placement === placement && item.displayMode !== "popup");
  if (!items.length) {
    return null;
  }

  return (
    <div className="promotion-stack">
      {items.map((item) => (
        <article className="promo-card" key={item.id}>
          <div>
            <p className="eyebrow">{item.discount || "Current Offer"}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.promoCode ? <p className="promo-code">Code: {item.promoCode}</p> : null}
          </div>
          <button className="button button-secondary" onClick={() => navigate(item.ctaLink || "/premium-detailing")}>
            {item.ctaText || "Learn more"}
          </button>
        </article>
      ))}
    </div>
  );
}

function PopupPromotion({ promotions }: { promotions: Promotion[] }) {
  const item = promotions.find((entry) => entry.active && entry.displayMode === "popup");
  if (!item) {
    return null;
  }

  return (
    <aside className="floating-promo">
      <p className="eyebrow">{item.discount || "Offer"}</p>
      <strong>{item.title}</strong>
      <p>{item.description}</p>
      <button className="button button-primary" onClick={() => navigate(item.ctaLink || "/premium-detailing")}>
        {item.ctaText || "View offer"}
      </button>
    </aside>
  );
}

export function HomePage({ initialSection, promotions, status, waitTimes }: HomePageProps) {
  useEffect(() => {
    if (!initialSection) {
      return;
    }

    requestAnimationFrame(() => {
      const target = document.getElementById(initialSection);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [initialSection]);

  const waitTimeRows = [
    { label: "Hand Wash", value: waitTimes.handWash },
    { label: "Elite Wash", value: waitTimes.eliteWash },
    { label: "Detail Services", value: waitTimes.detailServices },
  ].filter((item) => item.value.enabled);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div>
            <a className="brand" href="#/">
              {business.name}
            </a>
            <p className="subtle">{business.address}</p>
          </div>
          <nav className="nav">
            <button onClick={() => navigate("/?section=services")}>Services</button>
            <button onClick={() => navigate("/?section=membership")}>Membership</button>
            <button onClick={() => navigate("/?section=contact")}>Contact</button>
            <a href={business.phoneHref}>{business.phone}</a>
          </nav>
        </div>
        <div className={`status-strip ${status.isOpen ? "open" : "closed"}`}>
          <div className="container status-strip-inner">
            <strong>{status.isOpen ? "Open today" : "Temporarily closed"}</strong>
            <span>
              {status.isOpen
                ? "Live updates from the shop floor."
                : `${status.reason || "Check back shortly."}${status.reopenAt ? ` Reopening ${formatTimestamp(status.reopenAt)}.` : ""}`}
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Main Line car wash and detailing</p>
              <h1>Clean rewrite, clearer service story, and live shop updates in one place.</h1>
              <p className="hero-text">
                Spa Car Wash now runs on a smaller, cleaner frontend: direct service paths, booking for detailing,
                and staff-controlled status, wait times, and promotions.
              </p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => navigate("/premium-detailing")}>
                  Explore premium detailing
                </button>
                <button className="button button-secondary" onClick={() => navigate("/ultimate-detailing")}>
                  View ultimate package
                </button>
              </div>
            </div>
            <div className="hero-panel">
              <p className="eyebrow">Current service board</p>
              <h2>Today at the wash</h2>
              <ul className="service-board">
                {waitTimeRows.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value.waitTime} min</strong>
                  </li>
                ))}
              </ul>
              <p className="subtle">Last updated {formatTimestamp(waitTimes.lastUpdated)}</p>
            </div>
          </div>
        </section>

        <div className="container">
          <PromotionBlock placement="hero-top" promotions={promotions} />
        </div>

        <section className="section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Wash Packages</p>
              <h2>Core services for routine upkeep</h2>
            </div>
            <PromotionBlock placement="above-wash" promotions={promotions} />
            <div className="card-grid">
              {washPackages.map((item) => (
                <article className="info-card" key={item.name}>
                  <p className="eyebrow">{item.price}</p>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="membership">
          <div className="container split">
            <div>
              <div className="section-heading">
                <p className="eyebrow">Membership</p>
                <h2>Better economics for repeat customers</h2>
              </div>
              <p>
                Membership works best when the vehicle is already being maintained regularly. It lowers the cost of
                staying clean and makes full detailing intervals easier to manage.
              </p>
            </div>
            <div className="info-card">
              <ul className="check-list">
                {membershipBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="container">
            <PromotionBlock placement="above-membership" promotions={promotions} />
          </div>
        </section>

        <section className="section" id="detailing">
          <div className="container split">
            <div className="section-heading">
              <p className="eyebrow">Detailing</p>
              <h2>Premium packages for maintenance through restoration</h2>
              <p>Choose a targeted interior or exterior service, a balanced full detail, or a full restoration package.</p>
            </div>
            <div className="action-stack">
              <button className="button button-primary" onClick={() => navigate("/premium-detailing")}>
                Compare premium packages
              </button>
              <button className="button button-secondary" onClick={() => navigate("/ultimate-detailing")}>
                See the two-day ultimate detail
              </button>
            </div>
          </div>
          <div className="container">
            <PromotionBlock placement="above-detailing" promotions={promotions} />
          </div>
        </section>

        <section className="section alt">
          <div className="container section-heading">
            <p className="eyebrow">Why Customers Come Back</p>
            <h2>Execution over noise</h2>
            <p>Fast wash throughput, clear package separation, and deeper detailing options when the vehicle actually needs restoration.</p>
          </div>
          <div className="container card-grid">
            {testimonials.map((item) => (
              <blockquote className="quote-card" key={item.name}>
                <p>"{item.quote}"</p>
                <footer>{item.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container split">
            <div>
              <div className="section-heading">
                <p className="eyebrow">Contact</p>
                <h2>Visit, call, or book a detail</h2>
              </div>
              <p>{business.address}</p>
              <p>
                <a href={business.phoneHref}>{business.phone}</a>
              </p>
              <ul className="plain-list">
                {business.hours.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <article className="info-card" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>{business.name}</strong>
            <p className="subtle">Lean frontend rebuild for service clarity and live local updates.</p>
          </div>
          <a href="#/admin" className="subtle">
            Admin
          </a>
        </div>
      </footer>

      <PopupPromotion promotions={promotions} />
    </div>
  );
}
