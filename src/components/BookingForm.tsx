import { FormEvent, useEffect, useRef, useState } from "react";
import { business } from "@/app/site-data";

interface BookingFormProps {
  serviceName: string;
  servicePrice: string;
}

const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT?.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  vehicleType: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
};

export function BookingForm({ serviceName, servicePrice }: BookingFormProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (trap.trim()) {
      setStatus("success");
      setMessage("Request captured. We will follow up shortly.");
      setForm(initialForm);
      return;
    }

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus("error");
      setMessage("Enter a valid phone number so the team can confirm the appointment.");
      return;
    }

    if (!emailPattern.test(form.email.trim())) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      setMessage(`Online booking is unavailable. Call ${business.phone} instead.`);
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          serviceName,
          servicePrice,
          submittedAt: new Date().toISOString(),
          source: "spa-car-wash-website",
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setStatus("success");
      setMessage("Request sent. The team will confirm by phone or email.");
      setForm(initialForm);
    } catch (error) {
      const isAbort = error instanceof Error && error.name === "AbortError";
      setStatus("error");
      setMessage(
        isAbort
          ? `The request timed out. Call ${business.phone} if you need immediate scheduling.`
          : `The request could not be sent. Call ${business.phone} to book directly.`
      );
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
    }
  }

  return (
    <section className="booking-card">
      <div className="section-heading">
        <p className="eyebrow">Appointment Request</p>
        <h2>Book {serviceName}</h2>
        <p>{servicePrice}</p>
      </div>

      <form className="booking-form" onSubmit={onSubmit}>
        <input
          aria-hidden="true"
          className="sr-only"
          tabIndex={-1}
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
        />
        <label>
          Full name
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          Phone
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </label>
        <label>
          Vehicle type
          <select
            required
            value={form.vehicleType}
            onChange={(event) => setForm({ ...form, vehicleType: event.target.value })}
          >
            <option value="">Select one</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="minivan">Minivan</option>
            <option value="coupe">Coupe</option>
            <option value="luxury">Luxury vehicle</option>
          </select>
        </label>
        <label>
          Preferred date
          <input
            required
            type="date"
            value={form.preferredDate}
            onChange={(event) => setForm({ ...form, preferredDate: event.target.value })}
          />
        </label>
        <label>
          Preferred time
          <input
            required
            type="time"
            value={form.preferredTime}
            onChange={(event) => setForm({ ...form, preferredTime: event.target.value })}
          />
        </label>
        <label className="full-span">
          Notes
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Condition notes, stains, odors, pickup requests, or anything the team should know."
          />
        </label>
        {message ? (
          <div className={`form-message ${status}`}>{message}</div>
        ) : null}
        <button className="button button-primary full-span" disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Sending request..." : "Request appointment"}
        </button>
      </form>
    </section>
  );
}
