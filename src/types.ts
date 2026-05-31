export type ProofSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "NONPROFIT_FOUNDATION"
  | "PROPTECH"
  | "ROBOTICS"
  | "EXECUTIVE_INTELLIGENCE";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type PriorityBand = "MUST_FIX" | "SHORE_UP" | "DEFEND";

export interface ProofItem {
  id: string;
  theme: string;
  sector: ProofSector;
  executiveBuyer: string;
  proofClaim: string;
  customerOutcome: string;
  priorityBand: PriorityBand;
  proofStrengthScore: number;
  roiConfidenceScore: number;
  reuseReadinessScore: number;
  evidenceState: EvidenceState;
  evidenceSummary: string;
  boardSnippet: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface ProofExport {
  generatedAt: string;
  items: ProofItem[];
}

export type FindingCode =
  | "missing-evidence"
  | "weak-roi"
  | "board-ready-proof"
  | "proof-fragmentation"
  | "snippet-drift";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  sector: ProofSector;
  theme: string;
  message: string;
}

export interface ProofReport {
  generatedAt: string;
  items: number;
  averageProofStrength: number;
  averageRoiConfidence: number;
  averageReuseReadiness: number;
  boardReadyThemes: number;
  missingEvidenceItems: number;
  opportunityValueUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
