import { rm, writeFile } from "node:fs/promises";
import { sampleProofFactory } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = sampleProofFactory.map((item) => ({
    ...item,
    evidenceState: "CURRENT" as const,
    proofStrengthScore: Math.max(item.proofStrengthScore, 78),
    roiConfidenceScore: Math.max(item.roiConfidenceScore, 74),
    reuseReadinessScore: Math.max(item.reuseReadinessScore, 76),
    priorityBand: item.priorityBand === "MUST_FIX" ? ("SHORE_UP" as const) : item.priorityBand
  }));

  await writeFile("fixtures/proof-factory.json", JSON.stringify(sampleProofFactory, null, 2) + "\n");
  await writeFile("fixtures/proof-factory-clean.json", JSON.stringify(clean, null, 2) + "\n");

  for (const file of [
    "fixtures/boardroom-sparring-partner.json",
    "fixtures/boardroom-sparring-partner-clean.json",
    "fixtures/legacy-thesis-proof.json",
    "fixtures/legacy-thesis-proof-clean.json"
  ]) {
    try {
      await rm(file);
    } catch {
      // Ignore missing copied fixtures during scaffold cleanup.
    }
  }
}

await main();
