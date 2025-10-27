import { useMemo, useState } from "react";
import { Copy, Eye, EyeOff, Trash2, Search, ExternalLink } from "lucide-react";

export default function Vault({ items, onDelete }) {
  const [reveal, setReveal] = useState({});
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.site.toLowerCase().includes(q) ||
        i.username.toLowerCase().includes(q) ||
        (i.url || "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-white">Your vault</h2>
        <div className="relative w-full sm:w-80">
          <Search size={16} className="pointer-events-none absolute left-2 top-2.5 text-zinc-500" />
          <input
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-8 pr-3 py-2 text-sm text-white outline-none focus:border-zinc-700"
            placeholder="Search by site, username, or URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-md border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-400">
          No entries yet. Add your first login above.
        </div>
      ) : (
        <ul className="divide-y divide-zinc-800">
          {filtered.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">{item.site}</p>
                  {item.url && (
                    <a
                      href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline"
                    >
                      Visit <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <p className="truncate text-xs text-zinc-400">{item.username}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1">
                  <input
                    readOnly
                    className="w-40 bg-transparent text-sm text-zinc-200 outline-none"
                    value={reveal[item.id] ? item.password : "•".repeat(Math.min(12, item.password.length))}
                  />
                  <button
                    onClick={() => setReveal((r) => ({ ...r, [item.id]: !r[item.id] }))}
                    className="rounded p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    title={reveal[item.id] ? "Hide" : "Reveal"}
                  >
                    {reveal[item.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => copy(item.password)}
                    className="rounded p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    title="Copy password"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-red-400 hover:bg-zinc-900"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
