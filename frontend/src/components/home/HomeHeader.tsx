import { LogOut } from "lucide-react";

export default function HomeHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-red-500/20 bg-[#0b0f19]/88 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-8">
      <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">Verification workspace</p><h1 className="mt-1 text-lg font-bold text-white">Document integrity console</h1></div>
      <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-red-300 lg:hidden"><LogOut className="h-4 w-4" aria-hidden="true" /> Logout</button>
    </header>
  );
}
