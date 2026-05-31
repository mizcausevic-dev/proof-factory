# Architecture

Proof Factory is a static-friendly TypeScript executive-proof layer for the Kinetic Gain executive-intelligence estate.

- `src/data/sampleVerticalBrief.ts` holds the modeled proof clusters.
- `src/analyze.ts` scores proof strength, ROI confidence, reuse readiness, and proof debt.
- `src/services/verticalBriefService.ts` exposes the proof-lane, evidence-table, roi-claims, and board-snippets packets used by both the app and prerender step.
- `src/services/render.ts` renders the executive HTML surfaces and the sample JSON output.
- `scripts/prerender.ts` emits the static site, API payloads, `robots.txt`, and `sitemap.xml` for GitHub Pages.
