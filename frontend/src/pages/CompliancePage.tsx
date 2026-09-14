import { CheckCircle2, Download, FileText, LoaderCircle, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, type User } from "../api/auth.api";
import HomeHeader from "../components/home/HomeHeader";
import HomeSidebar from "../components/home/HomeSidebar";

export default function CompliancePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300">
        <LoaderCircle className="h-6 w-6 animate-spin" aria-label="Loading compliance report" />
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
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">Legal & Regulatory Standards</p>
              <h1 className="mt-2 text-3xl font-black text-white">ICAO 9303 & Compliance Audit</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Official verification standards for international travel document authenticity and zero-cloud biometric privacy.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all hover:bg-red-500"
            >
              <Download className="h-4 w-4" /> Download Compliance Certificate
            </button>
          </div>

          {/* Compliance Status Cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
                <h2 className="font-bold text-white">ICAO Doc 9303</h2>
              </div>
              <p className="mt-3 text-2xl font-black text-emerald-300">100% Compliant</p>
              <p className="mt-2 text-xs text-emerald-200/70">MRZ Part 3, 4 & 9 Checksum Verification Algorithms.</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-emerald-400">
                <Lock className="h-6 w-6" />
                <h2 className="font-bold text-white">AES-256 Encryption</h2>
              </div>
              <p className="mt-3 text-2xl font-black text-emerald-300">In-Memory Only</p>
              <p className="mt-2 text-xs text-emerald-200/70">Zero persistent biometric storage on disk or cloud servers.</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
                <h2 className="font-bold text-white">GDPR & DPDP Act</h2>
              </div>
              <p className="mt-3 text-2xl font-black text-emerald-300">Privacy Shielded</p>
              <p className="mt-2 text-xs text-emerald-200/70">Automated cryptographic erasure post-analysis.</p>
            </div>
          </div>

          {/* Standards Verification Matrix */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-bold text-white">International Standard Audit Matrix</h2>
              <p className="text-xs text-slate-500">Official technical specifications satisfied by Kavach-AI pipeline.</p>
            </div>
            <div className="divide-y divide-slate-800/80">
              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-red-400" />
                  <div>
                    <h3 className="font-bold text-white">ICAO Doc 9303 Part 3: TD3 Machine Readable Passport</h3>
                    <p className="text-xs text-slate-400">Validates 44-character 2-line MRZ checksum digits, expiry, and nationality codes.</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full">VERIFIED</span>
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-red-400" />
                  <div>
                    <h3 className="font-bold text-white">ISO/IEC 19794-5 Biometric Face Format</h3>
                    <p className="text-xs text-slate-400">FaceNet 512-d embedding alignment with ISO portrait quality requirements.</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full">VERIFIED</span>
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-red-400" />
                  <div>
                    <h3 className="font-bold text-white">Digital Data Protection (DPDP 2023) Compliance</h3>
                    <p className="text-xs text-slate-400">Strict local execution preventing unauthorized cross-border biometric data transfers.</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full">VERIFIED</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
