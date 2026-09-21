import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { posterUrl } from "../data/catalog";
import { SearchIcon } from "../components/icons";

export function Search() {
  const { catalog, openTitle } = useApp();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return catalog.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.genres.some((g) => g.toLowerCase().includes(q)),
    );
  }, [catalog, query]);

  const sugestoes = ["Drama", "Suspense", "Família", "Ação", "Mistério"];

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-5">
      <h1 className="font-display text-[1.5rem] font-semibold text-marfim">Buscar</h1>

      <label className="flex items-center gap-3 rounded-xl border border-linha bg-carvao px-4 py-3">
        <SearchIcon width={18} height={18} className="text-areia" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Títulos, gêneros..."
          className="w-full bg-transparent text-[1rem] text-marfim placeholder:text-areia-dim focus:outline-none"
        />
      </label>

      {query.trim() === "" && (
        <div className="flex flex-col gap-3">
          <span className="text-[1rem] text-areia">Sugestões de gênero</span>
          <div className="flex flex-wrap gap-2">
            {sugestoes.map((g) => (
              <button
                key={g}
                onClick={() => setQuery(g)}
                className="rounded-full border border-linha px-3.5 py-1.5 text-[1rem] text-marfim"
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.trim() !== "" && results.length === 0 && (
        <p className="text-[1rem] text-areia">
          Nada encontrado para “{query}”. Tente o nome do título ou um gênero.
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {results.map((t) => (
            <button
              key={t.id}
              onClick={() => openTitle(t.id)}
              className="flex flex-col gap-2 text-left active:scale-[0.97] transition-transform"
            >
              <div
                className="h-[108px] w-full rounded-lg bg-carvao-2"
                style={{ backgroundImage: `url(${posterUrl(t.id)})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <span className="text-[1rem] font-medium leading-tight text-marfim">{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
