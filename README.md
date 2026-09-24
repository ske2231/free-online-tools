# FreeTools — Static Tools Website

A fast, 100% client-side tools site based on Wifi Moolah Idea #67 ("Build a Tools Website Using No-Code and Monetize With AdSense"). No backend, no API keys, no build step — pure HTML/CSS/JS.

## What's included

- `index.html` — homepage: hero, 10 tool cards, how-it-works, FAQ, SEO meta
- `tools/*.html` — 10 tool pages, each with SEO content, working UI, related-tools links
- `assets/style.css` — shared responsive stylesheet
- `assets/tools.js` — shared helpers (download, clipboard copy, file reading, flash messages)
- `sitemap.xml`, `robots.txt` — SEO basics (replace `example.com` with your real domain)

## The 10 tools

1. **Image Converter** — JPG/PNG/WebP via canvas, white background fill for JPG, downloads result
2. **Image Compressor** — quality slider (10–100%), shows original vs compressed size + % saved
3. **QR Code Generator** — text/URL, Wi-Fi credentials, vCard; PNG download (CDN: cdnjs qrcodejs 1.0.0)
4. **Password Generator** — crypto-secure RNG, 8–64 chars, symbol/ambiguous-char options, entropy estimate
5. **UUID Generator** — `crypto.randomUUID`, bulk 1–10,000, uppercase/hyphenless options, .txt download
6. **Hash Generator** — SHA-256 + SHA-512 via Web Crypto (`crypto.subtle.digest`)
7. **JSON Formatter** — format/minify/validate with error position hints
8. **Text Tools** — 6 case styles, live word/char/line/sentence counts, whitespace cleanup
9. **Unit Converter** — length/weight/temperature, live results, swap button
10. **Text to Speech** — SpeechSynthesis API, voice picker, rate/pitch sliders

## AdSense setup

Search every HTML file for `<!-- AdSense: paste code here ... -->`. There are placeholders in:
- header (all pages), below-hero (homepage), mid-page (homepage), above/below each tool, and footer (all pages).

Replace each comment with your AdSense snippet, e.g.:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"
     crossorigin="anonymous"></script>
```

## Deployment (any static host)

- **Vercel:** `vercel --prod` from this folder (or drag-drop the folder at vercel.com)
- **Netlify:** drag-drop the folder at app.netlify.com/drop
- **GitHub Pages:** push to a repo, enable Pages on the branch
- **Cloudflare Pages:** connect repo or `npx wrangler pages deploy .`

Then replace `example.com` in `sitemap.xml` and `robots.txt` (and the canonical link in `index.html`) with your real domain.

## Notes

- QR generator is the only page with an external dependency (cdnjs qrcodejs). If the CDN is blocked, the page shows a friendly error.
- Hash generator needs HTTPS or localhost (Web Crypto `crypto.subtle` requirement).
