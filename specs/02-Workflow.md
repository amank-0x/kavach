An alternating central-spine timeline—often called a "circuit tree" or "rooted pipeline"—is one of the most effective ways to showcase an engineering workflow. It visually guides the visitor down your system architecture while reinforcing your technical depth.

Layout Architecture: The Circuit Tree

Central Spine: A vertical line running down the exact center on desktop (hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-emerald-500/20).

The Hub Nodes: Centered circles placed along the spine for each step (w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 font-mono text-xs z-10 shadow-[0_0_12px_rgba(6,182,212,0.4)]).

Horizontal Branch Connectors: A thin line shooting out from the center dot toward the card (w-12 h-[2px] bg-cyan-500/40).

Alternating Grid Pattern: Use a multi-row grid where odd items anchor to the left and even items anchor to the right on desktop, collapsing to a single-side left track on mobile (grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24).

Step-by-Step Node Breakdown

Step 01 | Left Column: Document Capture & Ingestion

Sub-badge: Client Layer • Format Validation

Details: Handles raw image/PDF uploads up to 25MB, runs client-side MIME checks, and transmits payloads securely over encrypted multipart streams.

Step 02 | Right Column: OpenCV Pre-Processing

Sub-badge: Computer Vision • Normalization

Details: Automatically deskews tilted images, isolates document borders via contour detection, and adjusts contrast/adaptive thresholding to eliminate shadows and glare.

Step 03 | Left Column: OCR Extraction (PaddleOCR)

Sub-badge: Text & Layout Recognition

Details: Extracts multilingual text, aligns key-value pairs (names, dates, serial numbers), and compares extracted patterns against expected document templates.

Step 04 | Right Column: Tamper Detection (ELA & CNNs)

Sub-badge: Forensic Analysis

Details: Performs Error Level Analysis (ELA) to expose compression disparities from Photoshop edits, while a convolutional neural network flags cloned pixel patches and altered fonts.

Step 05 | Left Column: Face Verification (FaceNet)

Sub-badge: Biometric Matching

Details: Crops ID portrait photos, calculates 128-dimensional facial feature embeddings, and verifies similarity against live webcam captures or reference databases.

Step 06 | Right Column: Risk Aggregation Engine

Sub-badge: Heuristic & Scoring Verdict

Details: Compiles metadata inconsistencies, tamper heatmaps, and biometric confidence into a single weighted score (0–100%) with an itemized risk log.

Card Component Specs

Container: bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300

Header Row: Flex container placing the Step Number (text-xs font-mono text-cyan-400 tracking-wider uppercase) alongside an execution latency pill (e.g., ~45ms in text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded).

Title: text-lg font-bold text-white mt-2

Body Copy: text-slate-400 text-sm leading-relaxed mt-2

Tech Tags (Bottom of card): Inline flex pills (bg-slate-800/60 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700/50 font-mono) highlighting specific tools like OpenCV, PaddleOCR, or PyTorch.

Tech Stack Integration Bar (Section Footer)

Anchor the bottom of this pipeline with a developer-oriented integration block to demonstrate how the entire ecosystem connects:

Structure: A horizontal card (bg-slate-950 border border-slate-800 rounded-2xl p-6 mt-16 max-w-4xl mx-auto).

Headline: "Full-Stack System Architecture" (text-sm font-mono text-slate-400 uppercase tracking-widest text-center mb-6).

Three-Tier Architecture Flow:

Frontend Client: React & Tailwind CSS dashboard managing state, live WebSocket progress feeds, and canvas bounding-box overlays.

Backend Orchestrator: FastAPI / Node.js microservices distributing image arrays and handling parallel model inference queues.

Data & Persistence: PostgreSQL with Prisma ORM storing structured JSON verification logs, cryptographic scan hashes, and audit histories.