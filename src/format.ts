import type { ProofReport } from "./types.js";

export function formatSummary(report: ProofReport) {
  return [
    `Generated: ${report.generatedAt}`,
    `Themes: ${report.items}`,
    `Average proof strength: ${report.averageProofStrength}`,
    `Average ROI confidence: ${report.averageRoiConfidence}`,
    `Average reuse readiness: ${report.averageReuseReadiness}`,
    `Board-ready themes: ${report.boardReadyThemes}`,
    `Missing evidence: ${report.missingEvidenceItems}`,
    `Opportunity value: $${report.opportunityValueUsd.toLocaleString()}`,
    `Findings: ${report.findingsList.length}`,
    `OK: ${report.ok ? "yes" : "no"}`
  ].join("\n");
}

export function formatJson(report: ProofReport) {
  return JSON.stringify(report, null, 2);
}
