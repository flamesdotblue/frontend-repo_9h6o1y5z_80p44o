import { Shield, Lock } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-white">VaultForge</p>
            <p className="text-xs text-zinc-400">Private password vault</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Lock size={16} className="text-zinc-400" />
          <span className="text-xs text-zinc-400">Local-only demo</span>
        </div>
      </div>
    </header>
  );
}
