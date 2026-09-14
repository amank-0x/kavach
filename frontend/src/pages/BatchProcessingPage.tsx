import { AlertTriangle, CheckCircle2, Layers, LoaderCircle, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, type User } from "../api/auth.api";
import HomeHeader from "../components/home/HomeHeader";
import HomeSidebar from "../components/home/HomeSidebar";

interface BatchItem {
  id: string;
  filename: string;
  status: "queued" | "processing" | "completed";
  verdict: "authentic" | "flagged";
  score: string;
}

export default function BatchProcessingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    { id: "BATCH-01", filename: "passport_scan_01.png", status: "completed", verdict: "authentic", score: "98.4%" },
    { id: "BATCH-02", filename: "passport_scan_02.jpg", status: "completed", verdict: "flagged", score: "42.1%" },
    { id: "BATCH-03", filename: "passport_scan_03.png", status: "completed", verdict: "authentic", score: "96.8%" },
    { id: "BATCH-04", filename: "passport_scan_04.jpg", status: "completed", verdict: "authentic", score: "99.1%" },
  ]);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => navigate("/auth"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/auth");
    }
  };

  const handleStartBatch = () => {
    setIsProcessing(true);
    setProgress(0);
    const newItems: BatchItem[] = [
      { id: "BATCH-05", filename: "bulk_passport_alpha.png", status: "processing", verdict: "authentic", score: "Processing..." },
      { id: "BATCH-06", filename: "bulk_passport_beta.jpg", status: "queued", verdict: "authentic", score: "Queued" },
      { id: "BATCH-07", filename: "bulk_passport_gamma.png", status: "queued", verdict: "flagged", score: "Queued" },
    ];
    setBatchItems((prev) => [...newItems, ...prev]);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsProcessing(false);
          setBatchItems((current) =>
            current.map((item) =>
              item.status !== "completed"
                ? { ...item, status: "completed", score: item.id === "BATCH-07" ? "54.2%" : "97.5%" }
                : item
            )
          );
          return 100;
        }
        return prev + 25;
      });
    }, 600);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300">
        <LoaderCircle className="h-6 w-6 animate-spin" aria-label="Loading batch workspace" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f19] text-slate-200">
      <div className="pointer-events-none absolute -left-48 top-24 h-[560px] w-[560px] rounded-full bg-red-600/[0.07] blur-[150px]" aria-hidden="true" />
      <HomeSidebar user={user} onLogout={handleLogout} />
      <main className="min-h-screen lg:pl-64">
        <HomeHeader onLogout={handleLogout} />
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10">
          
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">Bulk Verification</p>
              <h1 className="mt-2 text-3xl font-black text-white">Batch Processing Console</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Upload zip archives or multiple passport files for automated sequential forensic screening.</p>
            </div>
            <button
              type="button"
              onClick={handleStartBatch}
              disabled={isProcessing}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all hover:bg-red-500 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Processing Batch...
                </>
              ) : (
                <>
                  <Layers className="h-4 w-4" /> Simulate Batch Upload
                </>
              )}
            </button>
          </div>

          {/* Batch Dropzone */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-white">Drag & Drop Batch Archive or Multiple Passports</h2>
            <p className="mt-2 text-xs text-slate-400">Supports .ZIP archive containing up to 100 PNG/JPG document files.</p>

            {isProcessing && (
              <div className="mx-auto mt-6 max-w-md space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Batch Screening Progress</span>
                  <span className="text-red-400 font-bold">{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </section>

          {/* Batch Queue Table */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl">
            <div className="border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-white">Batch Execution Queue</h2>
                <p className="text-xs text-slate-500">Live multi-document analysis records.</p>
              </div>
              <span className="font-mono text-xs text-slate-400">{batchItems.length} Total Items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-950/60 font-mono text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Batch ID</th>
                    <th className="px-6 py-4">File Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {batchItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">{item.id}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-200">{item.filename}</td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {item.status === "completed" ? (
                          <span className="text-emerald-400">COMPLETED</span>
                        ) : item.status === "processing" ? (
                          <span className="text-amber-400 animate-pulse">PROCESSING</span>
                        ) : (
                          <span className="text-slate-500">QUEUED</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">{item.score}</td>
                      <td className="px-6 py-4">
                        {item.verdict === "authentic" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" /> AUTHENTIC
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/50 px-2.5 py-0.5 font-mono text-xs text-red-300">
                            <AlertTriangle className="h-3 w-3" /> FLAGGED
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
