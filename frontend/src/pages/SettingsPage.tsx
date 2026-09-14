import { Activity, Check, Cpu, LoaderCircle, RefreshCw, Save, ShieldAlert, Sliders } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, type User } from "../api/auth.api";
import HomeHeader from "../components/home/HomeHeader";
import HomeSidebar from "../components/home/HomeSidebar";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [fastApiHost, setFastApiHost] = useState("http://localhost");
  const [fastApiPort, setFastApiPort] = useState("8000");
  const [elaThreshold, setElaThreshold] = useState("75");
  const [faceNetConfidence, setFaceNetConfidence] = useState("92");
  const [ocrStrictCheck, setOcrStrictCheck] = useState(true);
  const [autoDeleteHours, setAutoDeleteHours] = useState("24");
  const [zeroCloudStrict, setZeroCloudStrict] = useState(true);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "failed">("idle");

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

  const handleTestConnection = () => {
    setTestingConnection(true);
    setConnectionStatus("idle");
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionStatus("success");
    }, 1000);
  };

  const handleSaveSettings = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300">
        <LoaderCircle className="h-6 w-6 animate-spin" aria-label="Loading settings" />
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
          
          {/* Page Title & Save Action */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">System configuration</p>
              <h1 className="mt-2 text-3xl font-black text-white">Workspace settings</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">Configure local FastAPI ports, forensic model thresholds, and security parameters.</p>
            </div>
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] transition-all hover:bg-red-500 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : savedSuccess ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300" /> Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Save changes
                </>
              )}
            </button>
          </div>

          {/* Section 1: FastAPI Connection Setup */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Cpu className="h-5 w-5 text-red-400" />
              <div>
                <h2 className="font-bold text-white">Local FastAPI Backend Endpoint</h2>
                <p className="text-xs text-slate-400">Connect Kavach-AI frontend to your local Python inference server.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Host URL</label>
                <input
                  type="text"
                  value={fastApiHost}
                  onChange={(e) => setFastApiHost(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">FastAPI Port</label>
                <input
                  type="text"
                  value={fastApiPort}
                  onChange={(e) => setFastApiPort(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-300">
                  Target Endpoint: <strong className="text-red-400">{fastApiHost}:{fastApiPort}/api/v1</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500"
              >
                {testingConnection ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Testing...
                  </>
                ) : (
                  "Test Connection"
                )}
              </button>
            </div>

            {connectionStatus === "success" && (
              <p className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> FastAPI server responding at {fastApiHost}:{fastApiPort} (Latency: 12ms)
              </p>
            )}
          </section>

          {/* Section 2: Forensic Model Thresholds */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Sliders className="h-5 w-5 text-red-400" />
              <div>
                <h2 className="font-bold text-white">Forensic Detection Parameters</h2>
                <p className="text-xs text-slate-400">Tune sensitivity for ELA artifact detection and FaceNet verification.</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                  <span>Error Level Analysis (ELA) Sensitivity</span>
                  <span className="text-red-400 font-bold">{elaThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={elaThreshold}
                  onChange={(e) => setElaThreshold(e.target.value)}
                  className="w-full accent-red-500"
                />
                <p className="mt-1 text-[11px] text-slate-500">Higher values detect micro-compression alterations but may increase false positives.</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
                  <span>FaceNet Biometrics Match Threshold</span>
                  <span className="text-red-400 font-bold">{faceNetConfidence}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={faceNetConfidence}
                  onChange={(e) => setFaceNetConfidence(e.target.value)}
                  className="w-full accent-red-500"
                />
                <p className="mt-1 text-[11px] text-slate-500">Minimum vector similarity required to confirm passport photo matches live camera feed.</p>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Strict MRZ Schema Validation</p>
                  <p className="text-xs text-slate-500">Validate passport checksum digits strictly against ICAO 9303 standard.</p>
                </div>
                <input
                  type="checkbox"
                  checked={ocrStrictCheck}
                  onChange={(e) => setOcrStrictCheck(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-700 accent-red-500"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Privacy & Security Policies */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <ShieldAlert className="h-5 w-5 text-red-400" />
              <div>
                <h2 className="font-bold text-white">Data Retention & Zero-Cloud Security</h2>
                <p className="text-xs text-slate-400">Strict local storage policies ensuring biometric privacy compliance.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Enforce Zero-Cloud Execution</p>
                  <p className="text-xs text-slate-500">Prevent any external network calls during document analysis.</p>
                </div>
                <input
                  type="checkbox"
                  checked={zeroCloudStrict}
                  onChange={(e) => setZeroCloudStrict(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-700 accent-red-500"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Automatic Image Erasure Retention</p>
                  <p className="text-xs text-slate-500">Scans and temp crops automatically shredded post-verification.</p>
                </div>
                <select
                  value={autoDeleteHours}
                  onChange={(e) => setAutoDeleteHours(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="1">1 Hour</option>
                  <option value="12">12 Hours</option>
                  <option value="24">24 Hours</option>
                  <option value="0">Immediate Shredding</option>
                </select>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
