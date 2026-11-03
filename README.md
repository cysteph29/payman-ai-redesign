# Payman AI Redesign

A standalone static prototype for the Payman AI marketing-site redesign.

## Run locally

Serve the repository root with any static HTTP server. For example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`. The current case study is at
`http://localhost:8080/case-study-v3/` (use the left and right arrow keys).
Earlier versions are at `/case-study/` and `/case-study-v2/`.

## Deploy

The project is configured as a static site for Vercel. Import this repository
in Vercel and deploy with the default settings; no build command is required.

## Project structure

- `index.html` — page markup and content
- `css/payman.css` — responsive styling
- `js/payman.js` — interactions and animation
- `assets/images/paymanai/` — site imagery, logos, and product demo video
- `case-study/`, `case-study-v2/`, `case-study-v3/` — case study slides, one `<section class="slide">` each; V3 is the current deck
- `css/case-study.css`, `css/case-study-v2.css`, `css/case-study-v3.css` and the matching files in `js/` — deck styling and navigation
- `assets/images/case-study/` — screenshots used on the case study slides
