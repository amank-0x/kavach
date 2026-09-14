import { Cpu, FileCheck2, History, Layers, LogOut, Settings, ShieldAlert } from "lucide-react";
import type { User } from "../../api/auth.api";
import { Link, useLocation } from "react-router-dom";

export default function HomeSidebar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (targetPath: string) => {
    if (targetPath === "/dashboard") {
      return path === "/dashboard" || path === "/home";
    }
    return path.startsWith(targetPath);
  };

  const linkClass = (targetPath: string) =>
    `flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm transition-all duration-200 ${
      isActive(targetPath)
        ? "border-red-500 bg-red-500/[0.12] font-semibold text-red-200 shadow-[0_4px_20px_rgba(220,38,38,0.15)]"
        : "border-transparent text-slate-400 hover:border-red-500/40 hover:bg-white/[0.04] hover:text-slate-200"
    }`;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-slate-800/80 bg-[#0d121f]/95 p-5 shadow-[12px_0_48px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:flex">
      <div>
        <Link to="/home" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-slate-100">
          <img src="/logo.png" alt="Kavach-AI logo" className="h-9 w-9 brightness-0 invert" />
          Kavach<span className="text-red-500">-AI</span>
        </Link>

        <nav className="mt-8 space-y-6" aria-label="Workspace navigation">
          {/* Group 1: Core Workspace */}
          <div>
            <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Core Workspace</p>
            <div className="mt-2 space-y-1">
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                <FileCheck2 className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>Verification Hub</span>
              </Link>
              <Link to="/dashboard/history" className={linkClass("/dashboard/history")}>
                <History className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>Session History</span>
              </Link>
              <Link to="/dashboard/batch" className={linkClass("/dashboard/batch")}>
                <Layers className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>Batch Screening</span>
              </Link>
            </div>
          </div>

          {/* Group 2: Forensics & Intelligence */}
          <div>
            <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Forensics & Audit</p>
            <div className="mt-2 space-y-1">
              <Link to="/dashboard/forensics" className={linkClass("/dashboard/forensics")}>
                <Cpu className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>Model Forensics</span>
              </Link>
              <Link to="/dashboard/compliance" className={linkClass("/dashboard/compliance")}>
                <ShieldAlert className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>Compliance & Audit</span>
              </Link>
            </div>
          </div>

          {/* Group 3: System Settings */}
          <div>
            <p className="px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Configuration</p>
            <div className="mt-2 space-y-1">
              <Link to="/dashboard/settings" className={linkClass("/dashboard/settings")}>
                <Settings className="h-4 w-4 text-red-400" aria-hidden="true" />
                <span>System Settings</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-800/80 pt-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-500/15 text-sm font-bold text-red-300">
            {user?.name?.charAt(0).toUpperCase() || "K"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-200">{user?.name || "Active session"}</p>
            <p className="truncate text-xs text-slate-500">{user?.email || "Checking session..."}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2.5 text-left text-xs font-semibold text-slate-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
}
