import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AddEntry from "./components/AddEntry";
import Vault from "./components/Vault";
import PasswordGenerator from "./components/PasswordGenerator";

const STORAGE_KEY = "vaultEntries.v1";

export default function App() {
  const [items, setItems] = useState([]);

  // Load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (data) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    const createdAt = new Date().toISOString();
    setItems((prev) => [{ id, createdAt, ...data }, ...prev]);
  };

  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const stats = useMemo(() => ({ count: items.length }), [items]);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Your secure vault</h1>
              <p className="text-sm text-zinc-400">Generate strong passwords and keep them saved locally in your browser.</p>
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
              {stats.count} saved {stats.count === 1 ? "item" : "items"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <AddEntry onAdd={addItem} />
            <PasswordGenerator />
          </div>
          <div className="lg:col-span-2">
            <Vault items={items} onDelete={deleteItem} />
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6 text-center text-xs text-zinc-500">
        This is a local-only demo. For a full Bitwarden-like experience with encryption and sync, backend will be added on request.
      </footer>
    </div>
  );
}
