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
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar count={stats.count} />

      {/* App Shell */}
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-4 lg:pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          {/* Sidebar: focused on doing, not marketing */}
          <aside className="space-y-6 lg:sticky lg:top-16 lg:self-start">
            <AddEntry onAdd={addItem} />
            <PasswordGenerator />
          </aside>

          {/* Main content */}
          <section className="min-h-[60vh]">
            <Vault items={items} onDelete={deleteItem} />
          </section>
        </div>
      </div>
    </div>
  );
}
