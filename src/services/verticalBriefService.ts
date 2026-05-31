import { analyze } from "../analyze.js";
import { sampleProofFactory } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleProofFactory, { now: "2026-05-31T23:58:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageProofStrength: report.averageProofStrength,
    averageRoiConfidence: report.averageRoiConfidence,
    averageReuseReadiness: report.averageReuseReadiness,
    boardReadyThemes: report.boardReadyThemes,
    missingEvidenceItems: report.missingEvidenceItems,
    opportunityValueUsd: report.opportunityValueUsd,
    highFindings,
    recommendation:
      "Lead with AI governance, platform margin, and identity proof; keep revenue and FinTech in the next line; tighten biotech and nonprofit packaging; leave robotics as supporting evidence only."
  };
}

export function proofLane() {
  return sampleProofFactory.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    proofClaim: item.proofClaim,
    customerOutcome: item.customerOutcome,
    priorityBand: item.priorityBand,
    proofStrengthScore: item.proofStrengthScore,
    evidenceSummary: item.evidenceSummary,
    nextMove: item.nextMove
  }));
}

export function evidenceTable() {
  return sampleProofFactory.map((item) => ({
    theme: item.theme,
    evidenceState: item.evidenceState,
    roiConfidenceScore: item.roiConfidenceScore,
    reuseReadinessScore: item.reuseReadinessScore,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function roiClaims() {
  return sampleProofFactory.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    customerOutcome: item.customerOutcome,
    roiConfidenceScore: item.roiConfidenceScore
  }));
}

export function boardSnippets() {
  return sampleProofFactory.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    boardSnippet: item.boardSnippet,
    reuseReadinessScore: item.reuseReadinessScore,
    proofStrengthScore: item.proofStrengthScore
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic proof data only - no live customer records, revenue screenshots, or private investor decks are included.",
    "Proof strength, ROI confidence, and reuse readiness are modeled from the sample review set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package customer proof and board-ready snippets as an executive-intelligence product.",
    "Company tags and related surfaces are synthetic decision aids rather than audited references.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    proofLane: proofLane(),
    evidenceTable: evidenceTable(),
    roiClaims: roiClaims(),
    boardSnippets: boardSnippets(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleProofFactory
  };
}
