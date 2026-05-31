import express from "express";
import {
  renderBoardSnippets,
  renderDocs,
  renderEvidenceTable,
  renderOverview,
  renderProofLane,
  renderRoiClaims,
  renderSample,
  renderVerification
} from "./services/render.js";
import {
  boardSnippets,
  evidenceTable,
  payload,
  proofLane,
  riskMap,
  roiClaims,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/proof-lane", (_req, res) => res.type("html").send(renderProofLane()));
  app.get("/evidence-table", (_req, res) => res.type("html").send(renderEvidenceTable()));
  app.get("/roi-claims", (_req, res) => res.type("html").send(renderRoiClaims()));
  app.get("/board-snippets", (_req, res) => res.type("html").send(renderBoardSnippets()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/proof-lane", (_req, res) => res.json(proofLane()));
  app.get("/api/evidence-table", (_req, res) => res.json(evidenceTable()));
  app.get("/api/roi-claims", (_req, res) => res.json(roiClaims()));
  app.get("/api/board-snippets", (_req, res) => res.json(boardSnippets()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`proof-factory listening on http://127.0.0.1:${port}`);
  });
}
