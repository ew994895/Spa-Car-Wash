import { premiumPackages } from "@/app/site-data";
import { navigate } from "@/app/router";
import { BookingForm } from "@/components/BookingForm";

interface PremiumPageProps {
  packageId?: string;
}

export function PremiumPage({ packageId }: PremiumPageProps) {
  const selected = premiumPackages.find((item) => item.id === packageId) || premiumPackages[0];

  return (
    <div className="page-shell">
      <header className="detail-header">
        <div className="container detail-header-inner">
          <button className="button button-ghost" onClick={() => navigate("/")}>
            Back to home
          </button>
          <button className="button button-secondary" onClick={() => navigate("/ultimate-detailing")}>
            Ultimate package
          </button>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Premium Detailing</p>
            <h1>{selected.name}</h1>
            <p>
              {selected.price} · {selected.serviceTime}
            </p>
          </div>

          <div className="package-picker">
            {premiumPackages.map((item) => (
              <button
                className={`pill ${item.id === selected.id ? "active" : ""}`}
                key={item.id}
                onClick={() => navigate(`/premium-detailing?package=${item.id}`)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="detail-layout">
            <article className="info-card">
              <h2>What it is</h2>
              <p>{selected.description}</p>
            </article>
            <article className="info-card">
              <h2>Included</h2>
              <ul className="check-list">
                {selected.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="info-card">
              <h2>Why choose it</h2>
              <ul className="check-list">
                {selected.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <BookingForm serviceName={selected.name} servicePrice={selected.price} />
        </div>
      </main>
    </div>
  );
}
