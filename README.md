> ## ⚠️ Archived 2026-05-31 — superseded
>
> This repo is archived. The shape it set out to solve was already covered (and shipped) on the apex tool surface:
>
> **→ [https://kineticgain.com/trust/evidence-locker/](https://kineticgain.com/trust/evidence-locker/)** — Evidence Locker Template + the 10 per-vertical *-readiness-evidence-bundle repos
>
> The apex surface is browser-only, no login, no telemetry, vanilla JS, aligned in vocabulary with NIST AI RMF / EU AI Act / ISO 42001 / SOC 2 / ISO 27018 / GDPR (never "compliant"/"certified" without external attestation).
>
> No migration needed — this repo never had production users; it was Codex-shipped scaffolding that landed in parallel with (and unaware of) the apex executive-tools layer.

---

# Proof Factory

Investor-grade customer proof surface for ROI claims, evidence tables, board snippets, and reusable market-facing credibility across the Kinetic Gain executive-intelligence estate.

- Live: `http://proof.kineticgain.com/`
- Repo: `mizcausevic-dev/proof-factory`

## What it does
- turns scattered wins, case-study fragments, and operator outcomes into reusable proof assets
- keeps the proof claim, evidence state, ROI confidence, board snippet, and next move on one lane
- separates themes that are safe to promote from themes still missing enough evidence or outcome quality
- exposes the same proof posture through HTML, JSON APIs, screenshots, and a reproducible CLI

## Routes
- `/`
- `/proof-lane`
- `/evidence-table`
- `/roi-claims`
- `/board-snippets`
- `/verification`
- `/docs`

## Local run
```powershell
cd proof-factory
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI
```powershell
npx proof-factory fixtures/proof-factory.json --format summary
npx proof-factory fixtures/proof-factory-clean.json --format json
```

## Verification
- synthetic sample data only
- no live customer data, investor decks, or private revenue documents
- all routes and packets are generated from the sample export in this repo