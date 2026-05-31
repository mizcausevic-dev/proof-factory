import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleProofFactory } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleProofFactory, { now: "2026-05-31T23:40:00Z" });
    expect(report.items).toBe(7);
  });

  it("computes positive proof and roi confidence", () => {
    const report = analyze(sampleProofFactory, { now: "2026-05-31T23:40:00Z" });
    expect(report.averageProofStrength).toBeGreaterThanOrEqual(60);
    expect(report.averageRoiConfidence).toBeGreaterThanOrEqual(60);
  });

  it("counts board-ready themes and missing evidence", () => {
    const report = analyze(sampleProofFactory, { now: "2026-05-31T23:40:00Z" });
    expect(report.boardReadyThemes).toBeGreaterThanOrEqual(1);
    expect(report.missingEvidenceItems).toBeGreaterThanOrEqual(1);
  });

  it("emits proof and roi findings", () => {
    const report = analyze(sampleProofFactory, { now: "2026-05-31T23:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "missing-evidence")).toBe(true);
    expect(report.findingsList.some((finding) => finding.code === "weak-roi" || finding.code === "proof-fragmentation")).toBe(true);
  });

  it("rolls up opportunity value", () => {
    const report = analyze(sampleProofFactory, { now: "2026-05-31T23:40:00Z" });
    expect(report.opportunityValueUsd).toBeGreaterThan(0);
  });
});
