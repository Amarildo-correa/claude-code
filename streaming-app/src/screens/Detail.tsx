import { useState } from "react";
import { useApp } from "../context/AppContext";
import { getTitle } from "../data/catalog";
import { PosterCard } from "../components/PosterCard";
import { Rail } from "../components/Rail";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  DownloadIcon,
  HeartIcon,
  PlayIcon,
  ShareIcon,
} from "../components/icons";

export function Detail({ id }: { id: string }) {
  const { catalog, goBack, toggleMyList, isInMyList } = useApp();
  const title = getTitle(id);
  const [episodesOpen, setEpisodesOpen] = useState(true);

  if (!title) {
    return (
      <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
        <p className="text-[14px] text-areia">Este título não está mais disponível.</p>
        <button onClick={goBack} className="text-[14px] font-medium text-ambar">
          Voltar
        </button>
      </div>
    );
  }

  const saved = isInMyList(title.id);
  const similares = catalog.filter((t) => t.id !== title.id && t.genres.some((g) => title.genres.includes(g))).slice(0, 6);

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="relative h-[240px] shrink-0">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `linear-gradient(150deg, ${title.swatch}, ${title.swatchTo})` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(to top, #100d0a 0%, rgba(16,13,10,0.15) 55%, rgba(16,13,10,0.05) 100%)" }}
        />
        <button
          onClick={goBack}
          aria-label="Voltar"
          className="absolute left-4 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-breu/50 text-marfim backdrop-blur-sm"
        >
          <ChevronLeftIcon width={18} height={18} />
        </button>
      </div>

      <div className="-mt-[108px] flex gap-4 px-5">
        <div
          className="h-[168px] w-[112px] shrink-0 rounded-xl shadow-[0_14px_28px_rgba(0,0,0,0.45)]"
          style={{ backgroundImage: `linear-gradient(155deg, ${title.swatch}, ${title.swatchTo})` }}
        />
        <div className="flex flex-col justify-end gap-1.5 pb-1">
          {title.original && <span className="text-[12px] font-medium text-ambar">Original Nova</span>}
          <h1 className="font-display text-[22px] font-semibold leading-tight text-marfim">{title.name}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center gap-2 text-[13px] text-areia">
          <span className="rounded border border-linha px-1.5 py-0.5 text-[11px] font-medium text-marfim">
            {title.rating}
          </span>
          <span>{title.year}</span>
          <span className="h-3 w-px bg-linha" />
          <span>{title.length}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {title.genres.map((g) => (
            <span key={g} className="rounded-full border border-linha px-3 py-1 text-[12px] text-areia">
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ambar py-3 text-[14px] font-semibold text-breu active:bg-ambar-forte">
            <PlayIcon width={14} height={14} />
            Assistir
          </button>
          <button
            onClick={() => toggleMyList(title.id)}
            aria-label={saved ? "Remover da minha lista" : "Adicionar à minha lista"}
            aria-pressed={saved}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-linha"
          >
            <HeartIcon filled={saved} width={17} height={17} className={saved ? "text-ambar" : "text-marfim"} />
          </button>
          <button
            aria-label="Compartilhar"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-linha"
          >
            <ShareIcon width={17} height={17} className="text-marfim" />
          </button>
        </div>

        <p className="text-[14px] leading-relaxed text-areia">{title.synopsis}</p>
      </div>

      <section className="flex flex-col gap-3 px-5">
        <h2 className="font-display text-[17px] font-semibold text-marfim">Elenco</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {title.cast.map((name) => (
            <div key={name} className="flex flex-col items-center gap-1.5 w-16">
              <div
                className="h-12 w-12 rounded-full"
                style={{ backgroundImage: `linear-gradient(155deg, ${title.swatch}, ${title.swatchTo})` }}
              />
              <span className="text-center text-[11px] leading-tight text-areia">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {title.episodes && title.episodes.length > 0 && (
        <section className="flex flex-col gap-3 px-5">
          <button
            onClick={() => setEpisodesOpen((v) => !v)}
            className="flex items-center justify-between"
          >
            <h2 className="font-display text-[17px] font-semibold text-marfim">Temporada 1</h2>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-areia transition-transform ${episodesOpen ? "" : "-rotate-90"}`}
            />
          </button>

          {episodesOpen && (
            <div className="flex flex-col">
              {title.episodes.map((ep) => (
                <div key={ep.number} className="flex items-center gap-3 border-b border-linha py-3.5 last:border-none">
                  <span className="w-5 font-display text-[16px] font-semibold text-areia-dim">{ep.number}</span>
                  <div
                    className="h-[54px] w-[96px] shrink-0 rounded-lg"
                    style={{ backgroundImage: `linear-gradient(155deg, ${title.swatch}, ${title.swatchTo})` }}
                  />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13.5px] font-medium text-marfim">{ep.title}</span>
                      <span className="text-[11px] text-areia-dim">{ep.duration}</span>
                    </div>
                    <p className="line-clamp-2 text-[12px] leading-snug text-areia">{ep.synopsis}</p>
                  </div>
                  <button aria-label="Baixar episódio" className="text-marfim">
                    <DownloadIcon width={16} height={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {similares.length > 0 && (
        <Rail heading="Títulos semelhantes">
          {similares.map((t) => (
            <PosterCard key={t.id} title={t} />
          ))}
        </Rail>
      )}
    </div>
  );
}
