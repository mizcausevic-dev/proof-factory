$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Proof Factory", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Proof snapshot for the next investor and board memo" -Subtitle "One executive surface for ROI claims, evidence gaps, board snippets, and reusable proof packaging." -Bullets @(
  "The overview keeps proof strength, ROI confidence, reuse readiness, missing evidence, and opportunity value in one executive view.",
  "Leadership can see which proof clusters are safe to reuse now and which still need tighter packaging.",
  "This layer sits after the scorecards, briefs, boardroom rehearsal, and narrative-framing work."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Proof lane keeps the claim, buyer, and evidence connected" -Subtitle "Every theme retains buyer, proof claim, customer outcome, priority band, evidence summary, and the next move." -Bullets @(
  "The lane makes it obvious which proof clusters are ready for board reuse and which still need evidence work.",
  "Customer outcomes stay attached to the actual proof instead of drifting into generic story language.",
  "Leadership can tighten the packet before claims get reused publicly."
) -OutputPath (Join-Path $screenshots "02-proof-lane-proof.png")

New-ProofImage -Title "Evidence table ties freshness and reuse back to real surfaces" -Subtitle "Evidence state, ROI confidence, reuse readiness, company tags, and related surfaces stay visible in one executive table." -Bullets @(
  "This view keeps IBM, Azure, CyberArk, FinTech, biotech, nonprofit, and robotics traces tied to actual live surfaces.",
  "ROI confidence and reuse readiness stay visible before any theme gets promoted into board or investor language.",
  "Leadership can see where the proof packet is already strong and where it is still exposed."
) -OutputPath (Join-Path $screenshots "03-evidence-table-proof.png")

New-ProofImage -Title "Board snippets stay tied to actual proof" -Subtitle "Reusable investor and board language remains grounded in the underlying evidence cluster." -Bullets @(
  "The board-ready copy stays attached to the specific proof cluster instead of floating free as abstract messaging.",
  "Snippet drift remains visible before the text gets reused in decks or investor updates.",
  "This creates a repeatable executive cadence for board briefs, diligence packets, and customer-proof refreshes."
) -OutputPath (Join-Path $screenshots "04-board-snippets-proof.png")
