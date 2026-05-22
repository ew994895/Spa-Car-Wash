import { ultimatePackage } from "@/app/site-data";
import { navigate } from "@/app/router";
import { BookingForm } from "@/components/BookingForm";

export function UltimatePage() {
  return (
    <div className="page-shell">
      <header className="detail-header">
        <div className="container detail-header-inner">
          <button className="button button-ghost" onClick={() => navigate("/")}>
            Back to home
          </button>
          <button className="button button-secondary" onClick={() => navigate("/premium-detailing")}>
            Premium packages
          </button>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Ultimate Detail</p>
            <h1>{ultimatePackage.name}</h1>
            <p>
              {ultimatePackage.price} · {ultimatePackage.serviceTime}
            </p>
          </div>

          <article className="hero-panel">
            <p>{ultimatePackage.description}</p>
          </article>

          <div className="detail-layout">
            <article className="info-card">
              <h2>Day one</h2>
              <ul className="check-list">
                {ultimatePackage.dayOne.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="info-card">
              <h2>Day two</h2>
              <ul className="check-list">
                {ultimatePackage.dayTwo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="info-card">
              <h2>Additional value</h2>
              <ul className="check-list">
                {ultimatePackage.extras.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <BookingForm serviceName={ultimatePackage.name} servicePrice={ultimatePackage.price} />
        </div>
      </main>
    </div>
  );
}
