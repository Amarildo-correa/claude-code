import { posterUrl, type Title } from "../data/catalog";
import { useApp } from "../context/AppContext";
import { HeartIcon } from "./icons";

export function PosterCard({
  title,
  progress,
  className = "w-[122px] shrink-0",
}: {
  title: Title;
  progress?: number;
  className?: string;
}) {
  const { openTitle, toggleMyList, isInMyList } = useApp();
  const saved = isInMyList(title.id);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-carvao-2"
        style={{ backgroundImage: `url(${posterUrl(title.id)})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <button
          onClick={() => openTitle(title.id)}
          className="absolute inset-0 block text-left active:scale-[0.97] transition-transform"
          aria-label={`Abrir ${title.name}`}
        >
          <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
          <span className="absolute inset-x-2.5 bottom-2.5 font-display text-[0.9375rem] font-semibold leading-tight text-marfim">
            {title.name}
          </span>
        </button>

        {title.new && (
          <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-ambar px-1.5 py-0.5 text-[0.625rem] font-semibold text-breu">
            Novo
          </span>
        )}

        <button
          onClick={() => toggleMyList(title.id)}
          aria-label={saved ? `Remover ${title.name} da minha lista` : `Adicionar ${title.name} à minha lista`}
          aria-pressed={saved}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-breu/60 text-marfim backdrop-blur-sm"
        >
          <HeartIcon filled={saved} width={12} height={12} className={saved ? "text-ambar" : "text-marfim"} />
        </button>
      </div>

      {typeof progress === "number" && (
        <div className="h-[3px] w-full rounded-full bg-marfim/15">
          <div className="h-full rounded-full bg-ambar" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
