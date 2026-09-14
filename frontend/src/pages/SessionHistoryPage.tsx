import { ArrowUpRight, FileCheck2, Filter, LoaderCircle, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, type User } from "../api/auth.api";
import HomeHeader from "../components/home/HomeHeader";
import HomeSidebar from "../components/home/HomeSidebar";

const scans = [
  { id: "KAV-84920", type: "Passport", time: "12 mins ago", score: "0.94", verdict: "Passed", report: "KAV-84920" },
  { id: "KAV-84911", type: "Passport", time: "48 mins ago", score: "0.61", verdict: "Flagged", report: "KAV-84911" },
  { id: "KAV-84876", type: "Aadhaar", time: "Yesterday", score: "0.89", verdict: "Passed", report: "KAV-84876" },
  { id: "KAV-84842", type: "Passport", time: "Yesterday", score: "0.96", verdict: "Passed", report: "KAV-84842" },
  { id: "KAV-84798", type: "Passport", time: "2 days ago", score: "0.57", verdict: "Flagged", report: "KAV-84798" },
  { id: "KAV-84751", type: "Aadhaar", time: "3 days ago", score: "0.91", verdict: "Passed", report: "KAV-84751" },
];

export default function SessionHistoryPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => navigate("/auth")).finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => { try { await logout(); } finally { navigate("/auth"); } };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300"><LoaderCircle className="h-6 w-6 animate-spin" aria-label="Loading session history" /></div>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0f19] text-slate-200">
      <div className="pointer-events-none absolute -left-48 top-24 h-[560px] w-[560px] rounded-full bg-red-600/[0.07] blur-[150px]" aria-hidden="true" />
      <HomeSidebar user={user} onLogout={handleLogout} />
      <main className="min-h-screen lg:pl-64">
        <HomeHeader onLogout={handleLogout} />
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">Audit archive</p>
              <h1 className="mt-2 text-3xl font-black text-white">Session history</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">Review every document scan processed in this workspace.</p>
            </div>
            <Link to="/dashboard/scan" className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-colors hover:bg-red-500"><Plus className="h-4 w-4" aria-hidden="true" /> Initiate verification</Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-red-500/15 bg-white/[0.035] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_40px_rgba(90,12,28,0.18)] backdrop-blur-xl"><div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500"><FileCheck2 className="h-4 w-4 text-red-400" /> Current records</div><p className="mt-3 text-3xl font-black text-white">1,284</p></div>
            <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_40px_rgba(127,29,29,0.2)] backdrop-blur-xl"><p className="text-xs uppercase tracking-wider text-slate-500">Flagged sessions</p><p className="mt-3 text-3xl font-black text-red-300">14</p></div>
            <div className="rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_40px_rgba(91,33,182,0.14)] backdrop-blur-xl"><p className="text-xs uppercase tracking-wider text-slate-500">Supported document</p><p className="mt-3 text-3xl font-black text-violet-200">Passport</p></div>
          </div>

          <section className="overflow-hidden rounded-2xl border border-red-500/15 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(90,12,28,0.2)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5"><div><h2 className="font-bold text-white">All scanned documents</h2><p className="mt-1 text-xs text-slate-500">Immutable verification records from your local workspace</p></div><button type="button" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:border-red-500/40 hover:text-red-300"><Filter className="h-3.5 w-3.5" /> Filter</button></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="border-b border-slate-800 bg-slate-950/50 font-mono text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-4 font-medium">Scan ID</th><th className="px-6 py-4 font-medium">Document type</th><th className="px-6 py-4 font-medium">Timestamp</th><th className="px-6 py-4 font-medium">Integrity score</th><th className="px-6 py-4 font-medium">Verdict</th><th className="px-6 py-4 font-medium">Action</th></tr></thead><tbody className="divide-y divide-slate-800/70">{scans.map((scan) => <tr key={scan.id} className="transition-colors hover:bg-white/[0.025]"><td className="px-6 py-5 font-mono text-sm text-slate-300">{scan.id}</td><td className="px-6 py-5"><span className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-300">{scan.type}</span></td><td className="px-6 py-5 text-sm text-slate-500">{scan.time}</td><td className="px-6 py-5 font-mono text-sm text-slate-300">{scan.score} <span className="text-slate-600">match</span></td><td className="px-6 py-5"><span className={`rounded-full border px-2.5 py-1 font-mono text-xs ${scan.verdict === "Passed" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300" : "border-red-500/20 bg-red-500/10 text-red-300"}`}>{scan.verdict}</span></td><td className="px-6 py-5"><Link to={`/dashboard/report/${scan.report}`} className="inline-flex items-center gap-1 text-sm font-semibold text-red-300 hover:text-red-200">View report <ArrowUpRight className="h-3.5 w-3.5" /></Link></td></tr>)}</tbody></table></div>
          </section>
        </div>
      </main>
    </div>
  );
}
