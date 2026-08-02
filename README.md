# Lagomium — site + editor

## How the two files relate

`admin.html` is the source of truth. `index.html` is **generated output**.

```
open admin.html → edit → "Download index.html" → replace → git push
```

Do not hand-edit `index.html`. Your next export from the editor will overwrite it.

## Deploy (Cloudflare Pages)

1. Push `index.html`, `robots.txt`, `sitemap.xml`, `_headers` to a repo.
2. Cloudflare Pages → Create project → connect the repo.
3. Build command: *none*. Output directory: `/`.
4. Add `lagomium.com` as a custom domain.

**Keep `admin.html` out of the deploy** — add it to `.gitignore` and run it locally by
double-clicking the file. It holds no secrets, but there's no reason to publish your
own editing tool. If you do want it online, put it behind Cloudflare Access.

## Before you go live

| | What | Where |
|---|---|---|
| 1 | **Form endpoint.** Right now the form falls back to `mailto:`, which is unreliable. Create a free Formspree form and paste the URL. | Editor → Brand & SEO |
| 2 | **Prices.** The numbers are placeholders. Set them against what you want to earn per hour. | Editor → Pricing |
| 3 | **Proof line.** One real client is named. Update it as you win more. | Editor → Proof strip |
| 4 | **`og.png`.** Create a 1200×630 share image and drop it in the site root. | repo root |
| 5 | **Email.** `hello@lagomium.com` is in the copy. Set it up — you sell professional email, so a Gmail address here undercuts the pitch. | your DNS |

## Editor features

- Every string on the page is editable, with character counters on the SEO fields
- 4 palettes + full custom colours, 4 typeface pairings, corner-radius slider
- Add / delete / reorder services, pricing tiers, FAQ entries, industries, nav links
- Live preview, desktop and mobile
- Autosaves a draft to your browser; `content.json` export/import for real backups

## What's built in

Semantic HTML, no framework, no build step, zero images (all SVG), so it should score
near 100 on PageSpeed. `ProfessionalService` and `FAQPage` JSON-LD, Open Graph and
Twitter cards, canonical URL, sitemap. Skip link, visible focus rings, 44px minimum
touch targets, `prefers-reduced-motion` respected, keyboard-navigable audit tabs, and
4.5:1 text contrast across all four palettes.

## Rebuilding from source

`template.js` + `admin.src.html` → `node build.js` → `index.html` + `admin.html`.
Only needed if you want to change the layout itself rather than the content.
