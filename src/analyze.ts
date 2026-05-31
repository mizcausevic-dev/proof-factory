import type { ProofExport, ProofItem, ProofReport, Finding } from "./types.js";

function finding(
  item: ProofItem,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    sector: item.sector,
    theme: item.theme
  };
}

function evaluate(item: ProofItem): Finding[] {
  const findings: Finding[] = [];

  if (item.evidenceState !== "CURRENT") {
    findings.push(
      finding(
        item,
        "missing-evidence",
        item.evidenceState === "MISSING" ? "high" : "medium",
        "The proof packet still relies on stale or missing evidence, so it is not safe to reuse in investor or board-facing materials yet."
      )
    );
  }

  if (item.roiConfidenceScore < 68) {
    findings.push(
      finding(
        item,
        "weak-roi",
        "medium",
        "The ROI story is still too soft, so the proof risks sounding interesting without sounding investable."
      )
    );
  }

  if (item.proofStrengthScore < 66 || item.reuseReadinessScore < 66) {
    findings.push(
      finding(
        item,
        "proof-fragmentation",
        "low",
        "The proof exists in fragments, but it still needs cleaner packaging before it becomes a repeatable executive asset."
      )
    );
  }

  if (item.reuseReadinessScore < 64) {
    findings.push(
      finding(
        item,
        "snippet-drift",
        "medium",
        "Board and investor snippets are likely to drift away from the underlying evidence unless this proof pack is tightened."
      )
    );
  }

  if (
    item.proofStrengthScore >= 80 &&
    item.roiConfidenceScore >= 76 &&
    item.reuseReadinessScore >= 78 &&
    item.evidenceState === "CURRENT"
  ) {
    findings.push(
      finding(
        item,
        "board-ready-proof",
        "high",
        "This proof cluster is strong enough to reuse in investor updates, board materials, and executive one-pagers now."
      )
    );
  }

  return findings;
}

export function analyze(items: ProofItem[], options: { now?: string } = {}): ProofReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap(evaluate);
  const count = items.length;
  const averageProofStrength = Math.round(items.reduce((sum, item) => sum + item.proofStrengthScore, 0) / count);
  const averageRoiConfidence = Math.round(items.reduce((sum, item) => sum + item.roiConfidenceScore, 0) / count);
  const averageReuseReadiness = Math.round(items.reduce((sum, item) => sum + item.reuseReadinessScore, 0) / count);
  const boardReadyThemes = items.filter(
    (item) =>
      item.proofStrengthScore >= 80 &&
      item.roiConfidenceScore >= 76 &&
      item.reuseReadinessScore >= 78 &&
      item.evidenceState === "CURRENT"
  ).length;
  const missingEvidenceItems = items.filter((item) => item.evidenceState !== "CURRENT").length;
  const opportunityValueUsd = items.reduce(
    (sum, item) => sum + Math.round(item.proofStrengthScore * 1800 + item.roiConfidenceScore * 1400 + item.reuseReadinessScore * 1600),
    0
  );

  return {
    generatedAt,
    items: count,
    averageProofStrength,
    averageRoiConfidence,
    averageReuseReadiness,
    boardReadyThemes,
    missingEvidenceItems,
    opportunityValueUsd,
    findingsList,
    ok: averageProofStrength >= 70 && averageReuseReadiness >= 68 && missingEvidenceItems < 4
  };
}

export function toExport(items: ProofItem[], now?: string): ProofExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
