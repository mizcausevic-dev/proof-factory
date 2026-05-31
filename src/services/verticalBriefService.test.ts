import { describe, expect, it } from "vitest";
import {
  boardSnippets,
  evidenceTable,
  payload,
  riskMap,
  roiClaims,
  proofLane,
  summary,
  verification
} from "./verticalBriefService.js";

describe("proof factory service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the proof lane", () => {
    expect(proofLane()[0]?.theme).toBeTruthy();
  });

  it("returns the evidence table", () => {
    expect(evidenceTable()[0]?.roiConfidenceScore).toBeGreaterThan(0);
  });

  it("returns roi claims", () => {
    expect(roiClaims()[0]?.customerOutcome).toBeTruthy();
  });

  it("returns board snippets", () => {
    expect(boardSnippets()[0]?.boardSnippet).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
