import { useEffect, useState } from "react";
import { Plus, Copy } from "lucide-react";
import PasswordGenerator from "./PasswordGenerator";

export default function AddEntry({ onAdd }) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    // prefill URL domain into site name for convenience
    try {
      if (url) {
        const u = new URL(url.startsWith("http") ? url : `https://${url}`);
        if (!site) setSite(u.hostname.replace("www.", ""));
      }
    } catch {}
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!site || !username || !password) return;
    onAdd({ site, username, password, url });
    setSite("");
    setUsername("");
    setPassword("");
    setUrl("");
  };

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
      <h2 className="mb-3 text-sm font-semibold text-white">Add to vault</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-400">Site name</label>
          <input
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-700"
            placeholder="e.g. Netflix"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-400">URL</label>
          <input
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-700"
            placeholder="https://netflix.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-400">Username / Email</label>
          <input
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-700"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs text-zinc-400">Password</label>
          <div className="flex items-center gap-2">
            <input
              className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-700"
              placeholder="Generate or paste"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={async () => {
                if (!password) return;
                try {
                  await navigator.clipboard.writeText(password);
                } catch {}
              }}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white hover:bg-zinc-900"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <PasswordGenerator onUse={(p) => setPassword(p)} />
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            <Plus size={16} /> Add to vault
          </button>
        </div>
      </form>
    </section>
  );
}
