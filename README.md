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
