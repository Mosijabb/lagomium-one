# Lead capture -> Google Sheets + email notification (Apps Script)

This is the client-installable production *starting point*, not an already authorized connection. Requires the customer's own Google account, a Google Sheet, deployment settings and a secure calling backend. Do not use for sensitive/regulated data without further controls.

## Setup
1. Open a client-owned Google Sheet -> Extensions -> Apps Script.
2. Paste Code.gs and save. Open Project Settings -> Script Properties. Set:
   - SHEET_ID = spreadsheet ID from the Sheet URL
   - ALERT_EMAIL = verified owner address
   - WEBHOOK_SECRET = random secret generated server-side (20+ chars)
   - SHEET_NAME = Leads (optional)
3. Deploy -> New deployment -> Web app -> Execute as the sheet owner. Only if necessary, permit anonymous invocations while treating the endpoint and secret as sensitive. Do not embed secret in browser JavaScript or public HTML. Prefer a secure relay with abuse protection and rate limits.
4. Run a sample webhook from a trusted backend: POST JSON:
   {"secret":"<secret>","name":"Example Person","email":"example@example.com","message":"Sample quote request","source":"website"}
5. Validate a real unique lead creates one Sheet row and one email alert. Repeat same email; ensure duplicate returns without a new row. Try invalid email, missing name and malformed body. Check failure logs.
6. Configure customer privacy notice, data retention, recipient permissions, quota/limits and support rules.

**Caveat:** This code has not been deployed to a customer's account and is not verified against a live Google Sheet or Gmail. Google Apps Script Web Apps may return redirect responses; configure calling clients to follow redirects. ContentService responses do not provide custom HTTP error status codes; inspect the JSON ok/status fields. Concurrent webhook handling is serialized via LockService. Mail failures are logged; without a retry queue, notifications can be missed even if leads are stored. Add alert retry/failure monitoring before high-volume production.

## Scope and pricing
Suggested first offer: €119 for one compatible form, one Sheet, one owner notification, validation, dedup, five acceptance tests and handover. One revision. Scope verified before payment.

## Security
Use a server-side proxy or trusted automation platform to submit the shared secret. Rate-limit calls at the proxy; rotate a leaked secret. Follow applicable GDPR and local electronic marketing rules, no storing PII in public demo.