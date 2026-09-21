import { useApp } from "../context/AppContext";
import { PosterCard } from "../components/PosterCard";
import { Rail } from "../components/Rail";
import { PlayIcon, BellIcon } from "../components/icons";

export function Home() {
  const { catalog, openTitle } = useApp();
  const hero = catalog[0];
  const continuando = [
    { title: catalog[1], progress: 62 },
    { title: catalog[3], progress: 30 },
    { title: catalog[7], progress: 81 },
  ];
  const emAlta = catalog.slice(2, 8);
  const novidades = catalog.filter((t) => t.new);

  return (
    <div className="flex flex-col gap-8 pb-8">
      <header className="flex items-center justify-between px-5 pt-5">
        <span className="font-display text-[22px] font-semibold tracking-tight text-marfim">
          Nova
        </span>
        <button aria-label="Notificações" className="text-areia">
          <BellIcon width={20} height={20} />
        </button>
      </header>

      <button
        onClick={() => openTitle(hero.id)}
        className="nova-hero-enter relative mx-5 flex h-[280px] flex-col justify-end overflow-hidden rounded-3xl p-5 text-left"
        style={{ backgroundImage: `linear-gradient(160deg, ${hero.swatch}, ${hero.swatchTo})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-breu via-breu/25 to-transparent" />
        <div className="relative flex flex-col gap-2">
          {hero.original && (
            <span className="text-[12px] font-medium text-ambar">Original Nova</span>
          )}
          <h1 className="font-display text-[32px] font-semibold italic leading-[1.05] text-marfim">
            {hero.name}
          </h1>
          <p className="max-w-[240px] text-[13px] leading-snug text-areia">{hero.tagline}</p>
          <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-ambar px-4 py-2 text-[13px] font-semibold text-breu">
            <PlayIcon width={13} height={13} />
            Assistir
          </span>
        </div>
      </button>

      <Rail heading="Continue assistindo">
        {continuando.map(({ title, progress }) => (
          <PosterCard key={title.id} title={title} progress={progress} />
        ))}
      </Rail>

      <Rail heading="Em alta esta semana">
        {emAlta.map((t) => (
          <PosterCard key={t.id} title={t} />
        ))}
      </Rail>

      {novidades.length > 0 && (
        <Rail heading="Novidades">
          {novidades.map((t) => (
            <PosterCard key={t.id} title={t} />
          ))}
        </Rail>
      )}
    </div>
  );
}
