import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderBoardSnippets,
  renderDocs,
  renderEvidenceTable,
  renderOverview,
  renderProofLane,
  renderRoiClaims,
  renderSample,
  renderVerification
} from "../src/services/render.js";
import {
  boardSnippets,
  evidenceTable,
  payload,
  proofLane,
  roiClaims,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

await rm(outDir, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("proof-lane", "index.html")]: renderProofLane(),
  [path.join("evidence-table", "index.html")]: renderEvidenceTable(),
  [path.join("roi-claims", "index.html")]: renderRoiClaims(),
  [path.join("board-snippets", "index.html")]: renderBoardSnippets(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://proof.kineticgain.com/sitemap.xml\n",
  "sitemap.xml":
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://proof.kineticgain.com/</loc></url><url><loc>https://proof.kineticgain.com/proof-lane/</loc></url><url><loc>https://proof.kineticgain.com/evidence-table/</loc></url><url><loc>https://proof.kineticgain.com/roi-claims/</loc></url><url><loc>https://proof.kineticgain.com/board-snippets/</loc></url><url><loc>https://proof.kineticgain.com/verification/</loc></url><url><loc>https://proof.kineticgain.com/docs/</loc></url></urlset>',
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "proof-lane.json")]: JSON.stringify(proofLane(), null, 2),
  [path.join("api", "evidence-table.json")]: JSON.stringify(evidenceTable(), null, 2),
  [path.join("api", "roi-claims.json")]: JSON.stringify(roiClaims(), null, 2),
  [path.join("api", "board-snippets.json")]: JSON.stringify(boardSnippets(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
