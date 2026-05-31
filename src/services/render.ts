import { toExport } from "../analyze.js";
import { sampleProofFactory } from "../data/sampleVerticalBrief.js";
import {
  boardSnippets,
  evidenceTable,
  payload,
  proofLane,
  riskMap,
  roiClaims,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Proof Factory";
const domain = "https://proof.kineticgain.com";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(title: string, active: string, body: string, description: string) {
  const routes = [
    ["/", "Overview"],
    ["/proof-lane", "Proof lane"],
    ["/evidence-table", "Evidence table"],
    ["/roi-claims", "ROI claims"],
    ["/board-snippets", "Board snippets"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ];

  const nav = routes
    .map(([href, label]) => {
      const current = href === active ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${productTitle} · ${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${productTitle} · ${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta name="twitter:card" content="summary_large_image" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #071019;
        --panel: #101a2b;
        --panel-alt: #0d1624;
        --ink: #ecf2ff;
        --muted: #9fb1c9;
        --accent: #45f2b4;
        --line: rgba(114, 142, 188, 0.24);
        --chip: rgba(73, 242, 180, 0.12);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(85, 92, 224, 0.18), transparent 36%),
          linear-gradient(180deg, #071019, #081221 55%, #0b1830);
        color: var(--ink);
      }
      a { color: #8fd0ff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px 56px; }
      .hero, .section, .table-wrap {
        background: rgba(16, 26, 43, 0.94);
        border: 1px solid var(--line);
        border-radius: 28px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }
      .hero { padding: 28px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(69, 242, 180, 0.3);
        background: rgba(69, 242, 180, 0.08);
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font: 600 12px/1.2 "Consolas", monospace;
      }
      h1, h2, h3 {
        margin: 18px 0 10px;
        font-family: Georgia, serif;
        line-height: 1.05;
      }
      h1 { font-size: clamp(40px, 7vw, 72px); max-width: 11ch; }
      h2 { font-size: clamp(28px, 4vw, 42px); }
      .lede, .section p, td, th, li, .metric-copy {
        color: var(--muted);
        line-height: 1.6;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: center;
        margin-bottom: 18px;
      }
      .product {
        font: 700 24px/1.2 "Segoe UI", system-ui, sans-serif;
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      nav a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
      }
      nav a[aria-current="page"] {
        border-color: rgba(69, 242, 180, 0.4);
        background: var(--chip);
        color: var(--ink);
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-top: 22px;
      }
      .metric {
        padding: 18px;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--line);
        border-radius: 22px;
      }
      .metric-label {
        color: var(--muted);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .metric-value {
        display: block;
        margin-top: 10px;
        font: 700 34px/1 Georgia, serif;
      }
      .section, .table-wrap { margin-top: 28px; padding: 24px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-top: 18px;
      }
      .card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: var(--panel-alt);
      }
      .pill {
        display: inline-flex;
        align-items: center;
        padding: 7px 11px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
        font: 600 12px/1.1 "Consolas", monospace;
      }
      .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .table-wrap table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      th, td {
        text-align: left;
        vertical-align: top;
        padding: 14px 12px;
        border-top: 1px solid var(--line);
      }
      th {
        color: var(--ink);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      footer {
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }
      .footer-links { display: flex; flex-wrap: wrap; gap: 16px; }
      code {
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
      }
      @media (max-width: 720px) {
        .topbar { flex-direction: column; align-items: flex-start; }
        .wrap { padding: 18px 14px 28px; }
        .hero, .section, .table-wrap { padding: 18px; border-radius: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="topbar">
          <div class="product">${productTitle}</div>
          <nav>${nav}</nav>
        </div>
        <span class="eyebrow">Executive intelligence · proof reuse</span>
        ${body}
        <footer>
          <div>Investor-grade proof packaging for board memos, diligence packets, and ROI-backed customer evidence.</div>
          <div class="footer-links">
            <a href="https://github.com/mizcausevic-dev/">GitHub</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </footer>
      </section>
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const executiveSummary = summary();
  const lane = proofLane();
  const risks = riskMap().slice(0, 4);
  const cards = lane
    .slice(0, 6)
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.priorityBand)}</span>
        <h3>${escapeHtml(item.theme)}</h3>
        <p>${escapeHtml(item.proofClaim)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.executiveBuyer)}</span>
          <span class="pill">Proof ${item.proofStrengthScore}</span>
        </div>
      </article>`
    )
    .join("");
  const riskRows = risks
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.theme)}</td>
        <td>${escapeHtml(item.code)}</td>
        <td>${escapeHtml(item.severity)}</td>
        <td>${escapeHtml(item.message)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Overview",
    "/",
    `
      <h1>Package the customer proof before the board asks for it.</h1>
      <p class="lede">Proof Factory turns scattered wins, ROI claims, and customer evidence into one reusable executive surface for investor packets, board updates, and category-defensible narrative.</p>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Themes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Evidence clusters in the current modeled proof set.</div></div>
        <div class="metric"><span class="metric-label">Average proof</span><span class="metric-value">${executiveSummary.averageProofStrength}</span><div class="metric-copy">How strong the underlying proof reads today.</div></div>
        <div class="metric"><span class="metric-label">ROI confidence</span><span class="metric-value">${executiveSummary.averageRoiConfidence}</span><div class="metric-copy">How investable the claims sound to a skeptical buyer.</div></div>
        <div class="metric"><span class="metric-label">Reuse readiness</span><span class="metric-value">${executiveSummary.averageReuseReadiness}</span><div class="metric-copy">How safely the proof can move into repeated board and investor use.</div></div>
        <div class="metric"><span class="metric-label">Board-ready</span><span class="metric-value">${executiveSummary.boardReadyThemes}</span><div class="metric-copy">Themes already safe to lift into executive materials.</div></div>
        <div class="metric"><span class="metric-label">Opportunity value</span><span class="metric-value">${formatMoney(executiveSummary.opportunityValueUsd)}</span><div class="metric-copy">Modeled upside from tightening evidence and claim packaging.</div></div>
      </div>
      <section class="section">
        <h2>Proof lane</h2>
        <p>Each theme keeps the claim, buyer, evidence summary, next move, and proof strength in one place so leadership can decide what belongs in the next memo.</p>
        <div class="grid">${cards}</div>
      </section>
      <section class="table-wrap">
        <h2>Risk map</h2>
        <p>The risk map keeps missing evidence, weak ROI, and snippet drift visible before they leak into investor-facing narrative.</p>
        <table>
          <thead>
            <tr><th>Theme</th><th>Code</th><th>Severity</th><th>Message</th></tr>
          </thead>
          <tbody>${riskRows}</tbody>
        </table>
      </section>
    `,
    "Investor-grade customer proof surface for ROI claims, evidence tables, board snippets, and reusable market-facing credibility."
  );
}

export function renderProofLane() {
  const rows = proofLane()
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.priorityBand)}</span>
        <h3>${escapeHtml(item.theme)}</h3>
        <p><strong>Claim:</strong> ${escapeHtml(item.proofClaim)}</p>
        <p><strong>Outcome:</strong> ${escapeHtml(item.customerOutcome)}</p>
        <p><strong>Evidence:</strong> ${escapeHtml(item.evidenceSummary)}</p>
        <p><strong>Next move:</strong> ${escapeHtml(item.nextMove)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.executiveBuyer)}</span>
          <span class="pill">Proof ${item.proofStrengthScore}</span>
        </div>
      </article>`
    )
    .join("");

  return shell(
    "Proof lane",
    "/proof-lane",
    `
      <h1>Keep every proof cluster executive-readable.</h1>
      <p class="lede">The proof lane shows which themes are ready for board slides now, which need tighter evidence, and which should stay out of the lead story until the packet catches up.</p>
      <section class="section">
        <h2>Theme coverage</h2>
        <div class="grid">${rows}</div>
      </section>
    `,
    "Proof lane for executive buyers, customer claims, evidence summaries, and next-step packaging."
  );
}

export function renderEvidenceTable() {
  const rows = evidenceTable()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.theme)}</td>
        <td>${escapeHtml(item.evidenceState)}</td>
        <td>${item.roiConfidenceScore}</td>
        <td>${item.reuseReadinessScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
        <td>${escapeHtml(item.relatedSurfaces.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Evidence table",
    "/evidence-table",
    `
      <h1>Track which proof can survive reuse.</h1>
      <p class="lede">The evidence table keeps freshness, ROI confidence, reuse readiness, and related surfaces together so operators can fix proof debt before the next board packet or diligence request.</p>
      <section class="table-wrap">
        <h2>Evidence inventory</h2>
        <table>
          <thead>
            <tr><th>Theme</th><th>State</th><th>ROI</th><th>Reuse</th><th>Company tags</th><th>Related surfaces</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Evidence table for customer proof freshness, ROI confidence, reuse readiness, and related live surfaces."
  );
}

export function renderRoiClaims() {
  const cards = roiClaims()
    .map(
      (item) => `<article class="card">
        <h3>${escapeHtml(item.theme)}</h3>
        <p><strong>Buyer:</strong> ${escapeHtml(item.executiveBuyer)}</p>
        <p><strong>Outcome:</strong> ${escapeHtml(item.customerOutcome)}</p>
        <div class="pills">
          <span class="pill">ROI confidence ${item.roiConfidenceScore}</span>
        </div>
      </article>`
    )
    .join("");

  return shell(
    "ROI claims",
    "/roi-claims",
    `
      <h1>Pressure-test which value claims sound investable.</h1>
      <p class="lede">This view keeps customer outcome framing tied to buyer context, helping leadership separate compelling proof from hand-wavy storylines.</p>
      <section class="section">
        <h2>Claim inventory</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "ROI claim inventory for executive buyers, customer outcomes, and investable proof language."
  );
}

export function renderBoardSnippets() {
  const cards = boardSnippets()
    .map(
      (item) => `<article class="card">
        <h3>${escapeHtml(item.theme)}</h3>
        <p>${escapeHtml(item.boardSnippet)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.executiveBuyer)}</span>
          <span class="pill">Reuse ${item.reuseReadinessScore}</span>
          <span class="pill">Proof ${item.proofStrengthScore}</span>
        </div>
      </article>`
    )
    .join("");

  return shell(
    "Board snippets",
    "/board-snippets",
    `
      <h1>Keep the board memo tied to real proof.</h1>
      <p class="lede">Board snippets stay attached to the proof cluster they came from, so the executive story remains consistent when reused across investor updates, diligence calls, and internal strategy reviews.</p>
      <section class="section">
        <h2>Reusable snippets</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "Reusable board snippets anchored to proof strength, reuse readiness, and executive buyer context."
  );
}

export function renderVerification() {
  const items = verification()
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return shell(
    "Verification",
    "/verification",
    `
      <h1>Verification posture stays explicit.</h1>
      <p class="lede">The proof surface is synthetic, read-only, and reproducible from the included sample export. This page makes those guardrails easy to audit before the repo is shown externally.</p>
      <section class="section">
        <h2>Verification notes</h2>
        <ul>${items}</ul>
      </section>
    `,
    "Verification notes for the synthetic proof surface, sample export, and read-only executive packaging workflow."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `
      <h1>Proof Factory docs</h1>
      <p class="lede">This repo packages customer proof into a reusable executive asset: score, evidence table, ROI claim set, board snippets, and risk map.</p>
      <section class="section">
        <h2>Core routes</h2>
        <ul>
          <li><code>/proof-lane</code> keeps claim, buyer, evidence, and next move visible.</li>
          <li><code>/evidence-table</code> tracks freshness, reuse readiness, and related surfaces.</li>
          <li><code>/roi-claims</code> pressure-tests the value story.</li>
          <li><code>/board-snippets</code> keeps reusable board language tied to the actual proof.</li>
          <li><code>/verification</code> makes the synthetic/read-only posture explicit.</li>
        </ul>
      </section>
    `,
    "Product documentation for Proof Factory and its executive evidence, ROI, and board-snippet routes."
  );
}

export function renderSample() {
  return JSON.stringify(toExport(sampleProofFactory, payload().generatedAt), null, 2);
}
