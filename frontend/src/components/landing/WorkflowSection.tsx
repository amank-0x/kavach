type WorkflowStep = {
  number: string;
  layer: string;
  title: string;
  latency: string;
  description: string;
  tags: string[];
};

const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    layer: "Client Layer • Format Validation",
    title: "Document Capture & Ingestion",
    latency: "~45ms",
    description: "Accepts raw image and PDF uploads up to 25MB, checks MIME types on the client, and transmits each payload through an encrypted multipart stream.",
    tags: ["React", "Multipart", "MIME check"],
  },
  {
    number: "02",
    layer: "Computer Vision • Normalization",
    title: "OpenCV Pre-Processing",
    latency: "~120ms",
    description: "Deskews tilted images, isolates document borders through contour detection, and adjusts contrast and adaptive thresholds to remove glare and shadows.",
    tags: ["OpenCV", "Contours", "Thresholding"],
  },
  {
    number: "03",
    layer: "FastAPI Service • Text & Layout Recognition",
    title: "OCR Extraction",
    latency: "~380ms",
    description: "A FastAPI OCR service extracts multilingual text, aligns names, dates, and serial numbers, then compares the detected patterns against expected document templates.",
    tags: ["FastAPI", "PaddleOCR", "Layout parsing"],
  },
  {
    number: "04",
    layer: "Forensic Analysis",
    title: "Tamper Detection",
    latency: "~640ms",
    description: "Uses Error Level Analysis to expose compression disparities while vision models flag cloned pixel patches, altered fonts, and suspicious edits.",
    tags: ["ELA", "CNN", "Heatmaps"],
  },
  {
    number: "05",
    layer: "Biometric Matching",
    title: "Face Verification",
    latency: "~210ms",
    description: "Crops portrait photos, calculates 128-dimensional facial embeddings, and compares the result with a live capture or trusted reference database.",
    tags: ["FaceNet", "Embeddings", "Match score"],
  },
  {
    number: "06",
    layer: "Heuristic & Scoring Verdict",
    title: "Risk Aggregation",
    latency: "~80ms",
    description: "Combines metadata inconsistencies, tamper heatmaps, and biometric confidence into one weighted score with an itemized risk log.",
    tags: ["Risk score", "Audit log", "JSON"],
  },
];

function ArchitectureTier({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_34px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-red-400">{label}</p>
      <h3 className="mt-2 text-sm font-bold text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-400">{description}</p>
    </div>
  );
}

export default function WorkflowSection() {
  return (
    <section id="technology" className="relative overflow-hidden bg-[#030712] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.08) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-red-400">Verification pipeline</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">From raw upload to a defensible verdict.</h2>
          <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">Every stage isolates a different signal, giving reviewers a transparent path from document capture to risk aggregation.</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-8 left-4 top-8 w-px bg-red-500/35 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
          <div className="space-y-8 md:space-y-12">
            {workflowSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={step.number} className="relative grid grid-cols-[32px_1fr] items-center gap-5 md:grid-cols-2 md:gap-24">
                  <div className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-red-500 bg-[#030712] font-mono text-xs font-bold text-red-300 shadow-[0_0_14px_rgba(239,68,68,0.45)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    {step.number}
                  </div>
                  <article className={`relative col-start-2 rounded-xl border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:border-red-500/60 hover:bg-white/[0.07] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_44px_rgba(220,38,38,0.14)] ${isLeft ? "md:col-start-1" : "md:col-start-2"}`}>
                    <div className={`hidden absolute top-1/2 h-px w-12 -translate-y-1/2 bg-red-500/45 md:block ${isLeft ? "-right-12" : "-left-12"}`} aria-hidden="true" />
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-red-400">Step {step.number}</p>
                      <span className="shrink-0 rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[11px] text-slate-400">{step.latency}</span>
                    </div>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{step.layer}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{step.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-xs text-slate-300">{tag}</span>
                      ))}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8">
          <h3 className="text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Full-stack system architecture</h3>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch">
            <ArchitectureTier label="01 / Frontend client" title="React + Tailwind CSS" description="Dashboard state, live progress feeds, and canvas bounding-box overlays." />
            <div className="hidden items-center text-red-500/70 md:flex" aria-hidden="true">→</div>
            <ArchitectureTier label="02 / Backend orchestrator" title="FastAPI services" description="OCR and inference endpoints distribute image arrays and manage parallel model queues." />
            <div className="hidden items-center text-red-500/70 md:flex" aria-hidden="true">→</div>
            <ArchitectureTier label="03 / Data & persistence" title="PostgreSQL + Prisma" description="Structured verification logs, scan hashes, and auditable histories." />
          </div>
        </div>
      </div>
    </section>
  );
}
