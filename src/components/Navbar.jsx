import { Shield, Lock, HardDrive } from "lucide-react";

export default function Navbar({ count = 0 }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* App identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <Shield size={18} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">VaultForge</p>
            <p className="text-[11px] text-zinc-400">Personal password vault</p>
          </div>
        </div>

        {/* App status */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300 sm:flex">
            <HardDrive size={12} className="text-zinc-400" />
            <span>{count} {count === 1 ? "item" : "items"}</span>
          </div>
          <div className="inline-flex items-center gap-1 rounded-md border border-emerald-700/30 bg-emerald-600/10 px-2 py-1 text-[11px] text-emerald-300">
            <Lock size={12} />
            <span>Local-only</span>
          </div>
        </div>
      </div>
    </header>
  );
}
