export default function ProblemSolveSection() {
  const painPoints = [
    {
      title: "INVISIBLE ALTERATIONS",
      description:
        "Micro-edits, copy-move signature cloning, and pixel-level tampering pass conventional visual inspection completely undetected.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      title: "MANUAL REVIEW BOTTLENECK",
      description:
        "Visual cross-referencing and font checking create severe delays when hundreds of credential files require instant validation.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "REGULATORY & FRAUD EXPOSURE",
      description:
        "Approving a single forged identity document triggers catastrophic compliance penalties, financial fraud, and security vulnerabilities.",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="overview"
      className="relative w-full min-w-full bg-[#030712] text-white py-24 sm:py-32 lg:py-36 overflow-hidden"
      style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
    >
      <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" aria-hidden="true" />
      {/* ─── Ambient Red Glows (Naturally emerging from dark base) ─── */}
      <div
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 w-[950px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.16)_0%,transparent_70%)] blur-3xl opacity-75 z-0"
        aria-hidden="true"
      />

      {/* ─── Deep Ambient Red Glows across the Section Body ─── */}
      <div
        className="pointer-events-none absolute top-1/3 -right-20 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.18),transparent_70%)] blur-3xl opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-12 -left-20 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent_70%)] blur-3xl opacity-75"
        aria-hidden="true"
      />

      {/* ─── Bottom Atmospheric Shadow ─── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#030712] via-red-950/15 to-transparent"
        aria-hidden="true"
      />

      {/* ─── Tech Grid Overlay (Continuous with Hero) ─── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ─── Section Content ─── */}
      <div
        className="w-full min-w-full px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 relative z-10"
        style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center w-full min-w-full">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col w-full justify-center">
            {/* Overline */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-5 h-0.5 bg-red-500 inline-block" />
              <span className="text-red-400 font-mono uppercase tracking-widest text-xs font-semibold">
                SYSTEM ADVISORY &bull; PROBLEM STATEMENT
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight">
              The human eye is no match{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #fca5a5 0%, #ef4444 60%, #dc2626 100%)",
                }}
              >
                for modern forgery.
              </span>
            </h2>

            {/* Subtext Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
              A document can appear legitimate, consistent, and ready to approve
              while its critical dates, numbers, or face photos have already been
              manipulated. Manual screening inevitably misses high-risk forgeries.
            </p>

            {/* Pain Point Cards Container (Frosted Glass Styling) */}
            <div className="flex flex-col gap-4 mt-8 w-full max-w-2xl">
              {painPoints.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 sm:gap-5 backdrop-blur-xl bg-white/[0.04] border border-white/15 border-l-4 border-l-red-500 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-red-500/60 hover:bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_12px_36px_rgba(220,38,38,0.22),inset_0_1px_2px_rgba(255,255,255,0.2)] group cursor-default"
                >
                  {/* Glass Icon Wrapper */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-500/20 text-red-300 border border-red-500/40 backdrop-blur-md shadow-[0_0_14px_rgba(239,68,68,0.3),inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:scale-105 group-hover:bg-red-500/30 group-hover:border-red-400/80 transition-all duration-300">
                    {item.icon}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-white font-extrabold text-sm sm:text-base uppercase tracking-wider group-hover:text-red-300 transition-colors drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-slate-200 text-xs sm:text-sm mt-1.5 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (FORENSIC DISPLAY) ================= */}
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-xl bg-gray-900/80 border border-red-500/30 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] relative overflow-hidden">
              
              {/* Technical Header */}
              <div className="flex items-center justify-between border-b border-red-500/20 pb-3.5 mb-5 font-mono text-xs">
                <span className="text-slate-300 tracking-wider font-semibold uppercase flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-red-500 inline-block" />
                  Forensic Comparison Engine
                </span>
                <span className="text-[11px] text-red-400 font-medium tracking-wide bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                  DUAL-STREAM AUDIT
                </span>
              </div>

              {/* ─── Panel 1 (Human View) ─── */}
              <div className="bg-gray-950/90 rounded-xl border border-slate-800 p-3.5 sm:p-4 mb-4 shadow-sm">
                {/* Header row */}
                <div className="flex items-center justify-between mb-2.5 font-mono">
                  <span className="text-slate-400 text-xs tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-2 bg-slate-600 inline-block" />
                    Input Stream: Visual Review
                  </span>
                  <span className="bg-slate-900 border border-slate-700 text-slate-300 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-medium">
                    STATUS: PASS (UNFILTERED)
                  </span>
                </div>

                {/* Clean Document Container - Exact aspect ratio, 0 letterbox */}
                <div className="relative w-full aspect-[1.55] rounded-lg overflow-hidden border border-slate-800/90 bg-black">
                  <img
                    src="/original.png"
                    alt="Authentic reference document"
                    className="w-full h-full object-cover block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2.5 text-[10px] font-mono text-slate-400 bg-black/90 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                    Visual: No anomalous markers recognized by eye
                  </span>
                </div>
              </div>

              {/* ─── Panel 2 (Detection Reality) ─── */}
              <div className="bg-gray-950/95 rounded-xl border border-red-500/40 p-3.5 sm:p-4 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
                {/* Header row */}
                <div className="flex items-center justify-between mb-2.5 font-mono relative z-20">
                  <span className="text-red-400 text-xs tracking-wider uppercase font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-2 bg-red-500 inline-block" />
                    Kavach Deep Forensics Pipeline
                  </span>
                  <span className="bg-red-950/80 border border-red-500/70 text-red-300 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded font-bold">
                    FLAGGED: 2 ANOMALIES
                  </span>
                </div>

                {/* X-Ray / Technical Scan Document Container */}
                <div className="relative w-full aspect-[1.55] rounded-lg overflow-hidden border border-red-500/50 bg-black">
                  {/* Document under scan */}
                  <img
                    src="/fake.png"
                    alt="Document with AI forensic analysis"
                    className="w-full h-full object-cover block filter contrast-125"
                  />

                  {/* SVG Grid Overlay for Technical Scan Feel */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(239, 68, 68, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.4) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* ─── Target Bounding Box 1 (Photo / Face Area) ─── */}
                  <div className="absolute top-[8%] left-[6%] w-[28%] h-[54%] border-2 border-red-500 bg-red-500/20 shadow-[0_0_16px_rgba(239,68,68,0.7)] rounded z-20 pointer-events-none">
                    {/* Targeting Corner Brackets */}
                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-red-300" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-red-300" />
                    <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-red-300" />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-red-300" />
                  </div>

                  {/* HUD Tag 1 */}
                  <div className="absolute top-[8%] left-[36%] z-30 bg-black/95 border border-red-500 text-red-300 font-mono text-[10px] font-semibold rounded px-2 py-1 shadow-[0_0_14px_rgba(220,38,38,0.6)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-red-500 inline-block" />
                    <span>FACE-NET: MORPH DETECTED [98.4%]</span>
                  </div>

                  {/* ─── Target Bounding Box 2 (Signature / Field Area) ─── */}
                  <div className="absolute bottom-[10%] right-[6%] w-[48%] h-[26%] border-2 border-red-500 bg-red-500/20 shadow-[0_0_16px_rgba(239,68,68,0.7)] rounded z-20 pointer-events-none">
                    {/* Targeting Corner Brackets */}
                    <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-red-300" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-red-300" />
                    <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-red-300" />
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-red-300" />
                  </div>

                  {/* HUD Tag 2 */}
                  <div className="absolute bottom-[40%] right-[6%] z-30 bg-black/95 border border-red-500 text-red-300 font-mono text-[10px] font-semibold rounded px-2 py-1 shadow-[0_0_14px_rgba(220,38,38,0.6)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-red-500 inline-block" />
                    <span>ELA: COMPRESSION ARTIFACT [TAMPER]</span>
                  </div>
                </div>

                {/* ─── Professional Threat Assessment Strip (Replaces casual pill) ─── */}
                <div className="mt-3.5 px-3 py-2 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-red-400">
                    <span className="w-2 h-2 bg-red-500 inline-block" />
                    <span className="font-semibold tracking-wider text-[11px]">THREAT INTERCEPTED</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px]">
                    <span className="text-slate-400 font-medium">RISK: <strong className="text-red-400">94/100</strong></span>
                    <span className="text-slate-700">|</span>
                    <span className="text-red-300 bg-red-950/90 px-1.5 py-0.5 rounded border border-red-500/50 text-[10px] font-bold tracking-wider">
                      HIGH RISK
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
