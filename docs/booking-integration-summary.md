# Booking Integration Summary (April 2026)

## How Submission Works
- The detailing request form now POSTs to a configurable endpoint defined by `VITE_BOOKING_ENDPOINT`.
- Payload is sent as JSON and includes customer/contact info, vehicle details, desired date/time, notes, quoted service name/price, and a timestamp.
- The integration can point to Formspree, Zapier, Make, a custom API, or any HTTPS endpoint able to accept JSON.

## Fields Captured
| Field | Description |
|-------|-------------|
| `name` | Customer full name |
| `email` | Email address for confirmation |
| `phone` | Primary contact number (validated for at least 10 digits) |
| `vehicleType` | Dropdown selection (sedan, SUV, truck, etc.) |
| `vehicleDetails` | Free text make/model/year/color |
| `preferredDate` | Requested service date (ISO date) |
| `preferredTime` | Optional time slot |
| `notes` | Additional comments or concerns |
| `serviceName` / `servicePrice` | Populated based on the package page the user is on |
| `submittedAt` | ISO timestamp for auditing |
| `source` | Constant string (`spa-car-wash-website`) |

## Error Handling & UX
- Client-side validation ensures required fields are complete and phones contain at least 10 digits.
- Honeypot field (`website`) silently discards obvious bot submissions.
- While the request is sending, the button displays a loading spinner and is disabled.
- On success, the form resets and displays a confirmation card encouraging the customer to await a follow-up.
- Failures (network errors, 4xx/5xx responses, missing env var) show a red alert panel prompting the user to call 610-695-0711.

## Environment / Config
- Create `.env` (or `.env.local`) and define:
  ```env
  VITE_BOOKING_ENDPOINT=https://example.com/your-booking-webhook
  ```
- The endpoint must accept JSON POSTs and return a 2xx response on success.
- No other API keys are required for the front-end.

## Remaining To-Dos Before Production
- Confirm the POST endpoint stores or emails submissions reliably (e.g., wire to CRM, email inbox, Slack, etc.).
- Set up monitoring/alerts on the receiving service so failed submissions are surfaced.
- Optionally add server-side spam filtering or CAPTCHA if bot traffic increases.
- Document internal workflows so staff knows where booking emails/webhooks appear and who should respond.
