# Architecture Overview
The application decouples overview tracking from user actions and report generation into three distinct architectural surfaces:

Surface 1: Clean Dashboard (/dashboard) — High-level telemetry, quota widgets, and an audit table of previous scans.

Surface 2: New Scan Modal / Dedicated Flow (/dashboard/scan) — A focused dual-input stage for document ingestion and live biometric capture.

Surface 3: Forensic Report View (/dashboard/report/:id) — A dedicated verification report for deep inspection and PDF export.

Surface 1: Clean Dashboard (/dashboard)
Telemetry Strip (Top)

Layout: 3-column grid (grid grid-cols-1 md:grid-cols-3 gap-6 mb-8).

Card 1 (Scan Quota): bg-slate-900/50 border border-slate-800 rounded-xl p-5. Shows remaining scans with a cyan progress indicator bar.

Card 2 (Integrity Flags): Count of flagged anomalies (e.g., 14 Flagged / 98.6% Accuracy) in crimson text.

Card 3 (Edge Engine Latency): Sub-second response time telemetry (e.g., 1.18s Avg Latency) in emerald text.

# Primary Control Bar

Layout: Flex container (flex items-center justify-between mb-6).

Left Title: Scan Activity & Records (text-xl font-bold text-white font-mono).

Right Trigger CTA: + Initiate Verification button (bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]).

Previous Scans Audit Table

Table Wrapper: bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md.

Headers: font-mono text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60 px-6 py-4 border-b border-slate-800.

Columns:

Scan ID: Monospaced cryptographic short-hash (e.g., KAV-84920).

Document Type: Badge indicating Passport (blue pill) or Aadhaar (purple pill).

Timestamp: Formatted local time and relative indicator (e.g., 12 Mins Ago).

Biometric Cosine: Similarity score (e.g., 0.94 Match).

Authenticity Verdict:

Passed: bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-mono.

Flagged: bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full text-xs font-mono.

Action: Link button labeled View Forensic Report routing to /dashboard/report/:id.

Empty State View: When no scans exist, display an empty folder outline, subtext stating "No active inspection sessions on this edge terminal," and a centered trigger button.

# Surface 2: The New Scan Modal (/dashboard/scan or Full-Screen Overlay)
Header & Dismiss Bar

Top Bar: Displays SESSION: LOCAL_INFERENCE_PIPELINE on the left and a close/exit button (text-slate-400 hover:text-white) on the right to return cleanly to /dashboard.

Module 1: Target Document Selector

Layout: 4-column grid (grid grid-cols-1 md:grid-cols-4 gap-4 mb-6).

Active Option A (Passport):

border-2 border-cyan-500 bg-slate-800/90 text-white rounded-xl p-4 cursor-pointer relative shadow-[0_0_12px_rgba(6,182,212,0.2)].

Icon: Globe / Passport vector.

Badge: Small emerald pill labeled READY.

Active Option B (Aadhaar):

border border-slate-700 hover:border-cyan-500/70 bg-slate-900/60 text-slate-200 rounded-xl p-4 cursor-pointer relative transition-colors.

Icon: Identity card vector.

Badge: Small emerald pill labeled READY.

Inactive Options (Visa, Driving License):

border border-slate-800 bg-slate-950/40 text-slate-500 rounded-xl p-4 opacity-50 cursor-not-allowed relative.

Badge: text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded absolute top-2 right-2 reading COMING SOON.

# Module 2: Dual-Input Staging Area

Container: 2-column grid (grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 mb-6).

Left Column (Document Ingestion):

Idle State: Dashed perimeter (border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-xl flex flex-col items-center justify-center h-72 bg-slate-950/50 transition-colors cursor-pointer).

Dropzone Text: "Drop [Selected Type] Image" (Subtext: "PNG or JPG • Edge MIME verified").

Staged State: Full-bleed preview of the selected image with a top-right Remove icon button (bg-red-500/20 text-red-400 border border-red-500/30 p-1.5 rounded-lg hover:bg-red-500/30).

Right Column (Live Biometric Capture):

Viewport: Video frame container (bg-black rounded-xl h-72 border border-slate-700 relative overflow-hidden flex items-center justify-center).

Targeting HUD: Absolute-positioned corner reticles (border-cyan-500) overlaid on the center feed.

Capture Button: Centered floating action button (bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full absolute bottom-4 shadow-lg).

Staged State: Frozen frame displaying a green check badge labeled LIVENESS CAPTURED, alongside a Retake Photo ghost button.

Module 3: Unified Action Bar

Execution Button: Full-width action button (w-full py-4 rounded-xl font-bold font-mono text-sm tracking-wide transition-all).

State 1 (Inputs Missing): bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50. Label: Awaiting Document & Biometric Inputs (0/2 Ready).

State 2 (Ready to Fire): bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer. Label: Execute Unified Forensic Pipeline.

State 3 (Transmitting Payloads): bg-slate-800 text-cyan-400 cursor-wait flex items-center justify-center gap-3 border border-cyan-500/50. Shows a spinning indicator and text: Streaming Payloads to Local Backend Engine....

# Surface 3: The Dedicated Forensic Report (/dashboard/report/:id)
Verdict Header

Layout: Full-width container (border rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4).

Condition Passed: bg-emerald-950/20 border-emerald-500/40 text-emerald-400. Headline: INTEGRITY VERIFIED: NO DIGITAL MANIPULATION DETECTED.

Condition Flagged: bg-red-950/20 border-red-500/40 text-red-400. Headline: ANOMALY DETECTED: HIGH PROBABILITY OF TAMPERING.

Metadata Badges: Displays Scan Ref, Pipeline Duration: 1.24s, and Cryptographic Seal: SHA-256 Validated.

Forensic Data Split

Layout: 2-column balance (grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8).

Left Panel (Document Forensics & OCR Extraction):

bg-slate-900/50 border border-slate-800 rounded-2xl p-6.

Document viewer showing the submitted file with bounding overlays on text and stamps.

Key-value extraction table: Full Name, Date of Birth, Identifier (with proper redaction for privacy), and Machine Readable Zone (MRZ) checksum.

Error Level Analysis (ELA) variance score and font consistency metric.

* Right Panel (FaceNet Biometric Verification):
bg-slate-900/50 border border-slate-800 rounded-2xl p-6.Side-by-side display of the cropped credential portrait and the live webcam capture.Telemetry indicators:FaceNet Cosine Distance: 0.94 (Target threshold $\ge 0.75$).Liveness Probability: 99.4% (Presentation attack defense).Feature Extraction: 128-D Vector Verified.\

# Report Navigation & Export Bar

Action Row: Flex container (flex items-center justify-end gap-4).

Secondary Action: Return to Dashboard button (bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-semibold).

Primary Export: Download Verifiable PDF Report button (bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2).