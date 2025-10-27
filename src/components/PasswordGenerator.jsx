import { useEffect, useMemo, useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

function generate(options) {
  const {
    length = 16,
    upper = true,
    lower = true,
    numbers = true,
    symbols = true,
  } = options;

  const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const L = "abcdefghijklmnopqrstuvwxyz";
  const N = "0123456789";
  const S = "!@#$%^&*()-_=+[]{};:,.?/";

  let alphabet = "";
  if (upper) alphabet += U;
  if (lower) alphabet += L;
  if (numbers) alphabet += N;
  if (symbols) alphabet += S;

  if (!alphabet) return "";

  // Ensure at least one from each selected set
  const required = [];
  if (upper) required.push(U[Math.floor(Math.random() * U.length)]);
  if (lower) required.push(L[Math.floor(Math.random() * L.length)]);
  if (numbers) required.push(N[Math.floor(Math.random() * N.length)]);
  if (symbols) required.push(S[Math.floor(Math.random() * S.length)]);

  const remaining = length - required.length;
  const chars = [...required];
  const randomValues = new Uint32Array(remaining);
  if (remaining > 0 && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomValues);
  }
  for (let i = 0; i < remaining; i++) {
    const idx = alphabet.charCodeAt(randomValues[i] % alphabet.length) % alphabet.length;
    chars.push(alphabet[idx] ?? alphabet[Math.floor(Math.random() * alphabet.length)]);
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export default function PasswordGenerator({ onUse }) {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (upper) score++;
    if (lower) score++;
    if (numbers) score++;
    if (symbols) score++;
    score += Math.floor(length / 6);
    return Math.min(score, 8);
  }, [upper, lower, numbers, symbols, length]);

  useEffect(() => {
    setValue(generate({ length, upper, lower, numbers, symbols }));
  }, [length, upper, lower, numbers, symbols]);

  const copy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Password generator</h2>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div
            className="h-2 w-24 overflow-hidden rounded-full bg-zinc-800"
            title={`Strength: ${strength}/8`}
          >
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500"
              style={{ width: `${(strength / 8) * 100}%` }}
            />
          </div>
          <span>{strength}/8</span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <input
          className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-0 focus:border-zinc-700"
          value={value}
          readOnly
          placeholder="Generated password"
        />
        <button
          onClick={() => setValue(generate({ length, upper, lower, numbers, symbols }))}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white hover:bg-zinc-900"
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-500"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
        </button>
        {onUse && (
          <button
            onClick={() => onUse(value)}
            className="inline-flex items-center gap-2 rounded-md border border-blue-600/30 bg-blue-600/10 px-3 py-2 text-xs font-medium text-blue-300 hover:bg-blue-600/20"
          >
            Use
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <label className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
          Length
          <input
            type="number"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="ml-2 w-16 rounded bg-zinc-900 px-2 py-1 text-right text-xs text-white outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />
          Uppercase
        </label>
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
          <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} />
          Lowercase
        </label>
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
          Numbers
        </label>
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300">
          <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
          Symbols
        </label>
      </div>
    </section>
  );
}
