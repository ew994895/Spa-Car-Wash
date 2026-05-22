import { useMemo, useState } from "react";
import { business } from "@/app/site-data";
import {
  ADMIN_SESSION_KEY,
  BusinessStatus,
  PlacementKey,
  Promotion,
  WaitTimesState,
  defaultStatus,
  readPromotions,
  readStatus,
  readWaitTimes,
  writePromotions,
  writeStatus,
  writeWaitTimes,
} from "@/app/state";
import { navigate } from "@/app/router";

const passcode = import.meta.env.VITE_ADMIN_PASSCODE?.trim();

interface AdminPageProps {
  status: BusinessStatus;
  waitTimes: WaitTimesState;
  promotions: Promotion[];
  onRefresh: () => void;
}

const placementOptions: PlacementKey[] = [
  "header",
  "hero-top",
  "above-wash",
  "above-membership",
  "above-detailing",
  "floating-bottom",
];

function createPromotion(): Promotion {
  return {
    id: `promo-${Date.now()}`,
    active: false,
    title: "",
    description: "",
    discount: "",
    promoCode: "",
    ctaText: "View offer",
    ctaLink: "/premium-detailing",
    placement: "hero-top",
    displayMode: "card",
  };
}

export function AdminPage({ status, waitTimes, promotions, onRefresh }: AdminPageProps) {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
  const [loginValue, setLoginValue] = useState("");
  const [loginError, setLoginError] = useState("");
  const [draftStatus, setDraftStatus] = useState(status);
  const [draftWaitTimes, setDraftWaitTimes] = useState(waitTimes);
  const [draftPromotions, setDraftPromotions] = useState(promotions);
  const [editingPromotionId, setEditingPromotionId] = useState<string | null>(promotions[0]?.id ?? null);

  const editingPromotion = useMemo(
    () => draftPromotions.find((item) => item.id === editingPromotionId) || null,
    [draftPromotions, editingPromotionId]
  );

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    if (!passcode) {
      setLoginError("Set VITE_ADMIN_PASSCODE before using the admin route.");
      return;
    }

    if (loginValue.trim() !== passcode) {
      setLoginError("Incorrect passcode.");
      return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    setLoginError("");
    setLoginValue("");
    setIsAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthed(false);
  }

  function saveStatusPanel() {
    const nextValue = { ...draftStatus, updatedAt: new Date().toISOString() };
    writeStatus(nextValue);
    setDraftStatus(nextValue);
    onRefresh();
  }

  function saveWaitTimesPanel() {
    const nextValue = { ...draftWaitTimes, lastUpdated: new Date().toISOString() };
    writeWaitTimes(nextValue);
    setDraftWaitTimes(nextValue);
    onRefresh();
  }

  function savePromotionsPanel() {
    writePromotions(draftPromotions);
    onRefresh();
  }

  function resetAll() {
    window.localStorage.removeItem("spaCarWashStatus");
    window.localStorage.removeItem("spa-wait-time-data");
    window.localStorage.removeItem("spa_promotions");
    setDraftStatus(readStatus());
    setDraftWaitTimes(readWaitTimes());
    setDraftPromotions(readPromotions());
    onRefresh();
  }

  if (!isAuthed) {
    return (
      <div className="admin-shell">
        <form className="admin-login" onSubmit={handleLogin}>
          <p className="eyebrow">Staff access</p>
          <h1>Admin portal</h1>
          <p>Use the management passcode to update status, wait times, and promotions.</p>
          <label>
            Passcode
            <input
              type="password"
              value={loginValue}
              onChange={(event) => setLoginValue(event.target.value)}
            />
          </label>
          {loginError ? <div className="form-message error">{loginError}</div> : null}
          <button className="button button-primary" type="submit">
            Unlock admin
          </button>
          <button className="button button-ghost" onClick={() => navigate("/")} type="button">
            Back to home
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="container admin-grid">
        <header className="admin-header">
          <div>
            <p className="eyebrow">{business.name}</p>
            <h1>Admin control room</h1>
          </div>
          <div className="action-stack horizontal">
            <button className="button button-secondary" onClick={() => navigate("/")}>
              View site
            </button>
            <button className="button button-ghost" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </header>

        <section className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Business status</p>
            <h2>Open / closed messaging</h2>
          </div>
          <div className="toggle-row">
            <button
              className={`pill ${draftStatus.isOpen ? "active" : ""}`}
              onClick={() => setDraftStatus({ ...draftStatus, isOpen: true, reason: "", reopenAt: undefined })}
            >
              Open
            </button>
            <button
              className={`pill ${!draftStatus.isOpen ? "active" : ""}`}
              onClick={() => setDraftStatus({ ...draftStatus, isOpen: false })}
            >
              Closed
            </button>
          </div>
          <label>
            Reason
            <input
              value={draftStatus.reason}
              onChange={(event) => setDraftStatus({ ...draftStatus, reason: event.target.value })}
              placeholder="Weather delay, maintenance, or temporary closure note"
            />
          </label>
          <label>
            Reopen time
            <input
              type="datetime-local"
              value={draftStatus.reopenAt ? draftStatus.reopenAt.slice(0, 16) : ""}
              onChange={(event) =>
                setDraftStatus({
                  ...draftStatus,
                  reopenAt: event.target.value ? new Date(event.target.value).toISOString() : undefined,
                })
              }
            />
          </label>
          <button className="button button-primary" onClick={saveStatusPanel}>
            Save status
          </button>
        </section>

        <section className="admin-card">
          <div className="section-heading">
            <p className="eyebrow">Wait times</p>
            <h2>Service estimates</h2>
          </div>
          {(["handWash", "eliteWash", "detailServices"] as const).map((key) => (
            <div className="wait-editor" key={key}>
              <div className="wait-editor-header">
                <strong>{key === "handWash" ? "Hand Wash" : key === "eliteWash" ? "Elite Wash" : "Detail Services"}</strong>
                <label className="inline-toggle">
                  <input
                    checked={draftWaitTimes[key].enabled}
                    onChange={(event) =>
                      setDraftWaitTimes({
                        ...draftWaitTimes,
                        [key]: { ...draftWaitTimes[key], enabled: event.target.checked },
                      })
                    }
                    type="checkbox"
                  />
                  Enabled
                </label>
              </div>
              <div className="wait-editor-grid">
                <label>
                  Minutes
                  <input
                    type="number"
                    min={0}
                    value={draftWaitTimes[key].waitTime}
                    onChange={(event) =>
                      setDraftWaitTimes({
                        ...draftWaitTimes,
                        [key]: { ...draftWaitTimes[key], waitTime: Number(event.target.value) || 0 },
                      })
                    }
                  />
                </label>
                <label>
                  Traffic
                  <select
                    value={draftWaitTimes[key].traffic}
                    onChange={(event) =>
                      setDraftWaitTimes({
                        ...draftWaitTimes,
                        [key]: {
                          ...draftWaitTimes[key],
                          traffic: event.target.value as WaitTimesState[typeof key]["traffic"],
                        },
                      })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="very-high">Very high</option>
                  </select>
                </label>
              </div>
            </div>
          ))}
          <button className="button button-primary" onClick={saveWaitTimesPanel}>
            Save wait times
          </button>
        </section>

        <section className="admin-card admin-card-wide">
          <div className="section-heading">
            <p className="eyebrow">Promotions</p>
            <h2>Live offers and floating callouts</h2>
          </div>
          <div className="promo-admin">
            <aside className="promo-list">
              <button
                className="button button-secondary"
                onClick={() => {
                  const item = createPromotion();
                  setDraftPromotions([item, ...draftPromotions]);
                  setEditingPromotionId(item.id);
                }}
              >
                New promotion
              </button>
              {draftPromotions.map((item) => (
                <button
                  className={`promo-list-item ${item.id === editingPromotionId ? "active" : ""}`}
                  key={item.id}
                  onClick={() => setEditingPromotionId(item.id)}
                >
                  <strong>{item.title || "Untitled promotion"}</strong>
                  <span>{item.placement}</span>
                </button>
              ))}
            </aside>

            {editingPromotion ? (
              <div className="promo-editor">
                <label>
                  Title
                  <input
                    value={editingPromotion.title}
                    onChange={(event) =>
                      setDraftPromotions(
                        draftPromotions.map((item) =>
                          item.id === editingPromotion.id ? { ...item, title: event.target.value } : item
                        )
                      )
                    }
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows={4}
                    value={editingPromotion.description}
                    onChange={(event) =>
                      setDraftPromotions(
                        draftPromotions.map((item) =>
                          item.id === editingPromotion.id ? { ...item, description: event.target.value } : item
                        )
                      )
                    }
                  />
                </label>
                <div className="wait-editor-grid">
                  <label>
                    Discount label
                    <input
                      value={editingPromotion.discount}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id ? { ...item, discount: event.target.value } : item
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    Promo code
                    <input
                      value={editingPromotion.promoCode}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id ? { ...item, promoCode: event.target.value } : item
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <div className="wait-editor-grid">
                  <label>
                    CTA text
                    <input
                      value={editingPromotion.ctaText}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id ? { ...item, ctaText: event.target.value } : item
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    CTA route
                    <input
                      value={editingPromotion.ctaLink}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id ? { ...item, ctaLink: event.target.value } : item
                          )
                        )
                      }
                    />
                  </label>
                </div>
                <div className="wait-editor-grid">
                  <label>
                    Placement
                    <select
                      value={editingPromotion.placement}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id
                              ? { ...item, placement: event.target.value as PlacementKey }
                              : item
                          )
                        )
                      }
                    >
                      {placementOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Display mode
                    <select
                      value={editingPromotion.displayMode}
                      onChange={(event) =>
                        setDraftPromotions(
                          draftPromotions.map((item) =>
                            item.id === editingPromotion.id
                              ? { ...item, displayMode: event.target.value as Promotion["displayMode"] }
                              : item
                          )
                        )
                      }
                    >
                      <option value="card">Card</option>
                      <option value="banner">Banner</option>
                      <option value="popup">Popup</option>
                    </select>
                  </label>
                </div>
                <div className="toggle-row">
                  <button
                    className={`pill ${editingPromotion.active ? "active" : ""}`}
                    onClick={() =>
                      setDraftPromotions(
                        draftPromotions.map((item) =>
                          item.id === editingPromotion.id ? { ...item, active: !item.active } : item
                        )
                      )
                    }
                  >
                    {editingPromotion.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    className="button button-ghost"
                    onClick={() => {
                      const remaining = draftPromotions.filter((item) => item.id !== editingPromotion.id);
                      setDraftPromotions(remaining);
                      setEditingPromotionId(remaining[0]?.id ?? null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="info-card">
                <h3>No promotion selected</h3>
                <p>Create a new promotion or select an existing one to edit it.</p>
              </div>
            )}
          </div>
          <div className="action-stack horizontal">
            <button className="button button-primary" onClick={savePromotionsPanel}>
              Save promotions
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                setDraftStatus(defaultStatus);
                setDraftWaitTimes(readWaitTimes());
                setDraftPromotions(readPromotions());
              }}
            >
              Reload saved
            </button>
            <button className="button button-ghost" onClick={resetAll}>
              Reset local data
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
