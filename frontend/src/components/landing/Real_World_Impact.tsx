import { Activity, CheckCircle2, ScanFace, ShieldCheck } from "lucide-react";

const telemetry = [
  { label: "Embedding extraction", value: "Vector: 128-Dimensional FaceNet Hash" },
  { label: "Credential correlation", value: "Passport Chip / High-Res Scan vs. Live Cam" },
  { label: "Anti-spoofing metric", value: "Liveness Confidence: 99.8%" },
  { label: "Biometric distance", value: "Cosine Similarity: 0.94 / 1.00" },
];

export default function Real_World_Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-[#050b0b] px-5 py-24 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.07) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-red-400">
            <span className="h-px w-8 bg-red-500" />
            Real-world impact
          </p>
          <h2 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl">
            Real-time biometric triangulation at sub-second latency.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
            Eliminate identity swaps and imposter fraud at checkpoints. Kavach-AI extracts facial features from identity documents and cross-checks them against live subjects before an officer finishes handling the credential.
          </p>

          <div className="mt-10 space-y-6">
            <article className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300">
                <ScanFace className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-white">128-D vector embeddings</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">FaceNet maps facial landmarks across lighting, aging, and angle variations for a stable comparison.</p>
              </div>
            </article>
            <article className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-white">Anti-spoofing detection</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">Presentation attacks, printed masks, digital screens, and rendered deepfakes are flagged before access is granted.</p>
              </div>
            </article>
            <article className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-300">
                <Activity className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-white">Operational throughput</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">Move physical inspection from 3–5 minutes to under 2 seconds, keeping officers focused on anomalous flags.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-5">
          <div className="rounded-xl border border-white/10 bg-black/35 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.14em]">
              <div>
                <p className="text-slate-500">System identifier</p>
                <p className="mt-1 text-sm font-bold tracking-wider text-white">MODULE: FACENET_BIOMETRICS_V2</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-2 text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                <span>Live checkpoint feed • Desk 04</span>
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-xl border border-red-500/35 bg-slate-950 shadow-[0_0_36px_rgba(220,38,38,0.18)]">
              <img src="/face_scan.gif" alt="Animated document integrity scan visualization" className="block aspect-[1.15] w-full object-cover opacity-90" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="pointer-events-none absolute inset-4 rounded-lg border border-red-400/50" />
              <div className="pointer-events-none absolute left-4 top-4 rounded border border-red-400/50 bg-black/75 px-2 py-1 font-mono text-[10px] text-red-300">DOCUMENT_SCAN // ACTIVE</div>
              
              <div className="pointer-events-none absolute bottom-[15%] left-1/2 w-[78%] -translate-x-1/2 rounded border border-red-400/60 bg-[#030712]/95 px-3 py-2 text-center font-mono text-[10px] font-bold tracking-[0.12em] text-red-200 shadow-[0_0_18px_rgba(220,38,38,0.3)] backdrop-blur-sm">DOCUMENT INTEGRITY ANALYSIS // ACTIVE</div>

              <div className="pointer-events-none absolute bottom-4 right-4 rounded border border-emerald-400/40 bg-black/75 px-2 py-1 font-mono text-[10px] text-emerald-300">DOCUMENT TARGET LOCKED</div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {telemetry.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">Identity verified • Access granted</p>
                  <p className="mt-1 font-mono text-[10px] text-emerald-200/70">Latency: 1.18s • Batch queue: 0 pending</p>
                </div>
              </div>
              <p className="font-mono text-[10px] text-emerald-200/60">SHA-256: 4f9b...a12c</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
