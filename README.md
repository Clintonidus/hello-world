# Eaglez Fly Alone — Clothing Store Website

A premium single-page clothing store experience with:

- Branded hero/header using the Eaglez crest logo (`assets/efa-logo.svg`).
- Product catalog with quantity controls and live subtotal/discount/total.
- Shopper-friendly checkout panel with status messaging (no raw JSON shown by default).
- Optional developer payload preview inside a collapsible details panel.
- Smart checkout behavior:
  - Uses `POST /eaglez/checkout/session` when backend is available.
  - Automatically switches to **demo mode** when API is unavailable (like static `python3 -m http.server`) so checkout flow still works.

## Run locally

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Demo pages

- `/` — storefront
- `/success.html` — success page used by demo checkout mode

> For real Stripe checkout sessions, run your backend endpoint at `/eaglez/checkout/session`.
