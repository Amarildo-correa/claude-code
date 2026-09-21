import { useApp } from "../context/AppContext";
import { PosterCard } from "../components/PosterCard";
import { HeartIcon } from "../components/icons";

export function MyList() {
  const { catalog, myList } = useApp();
  const titles = catalog.filter((t) => myList.includes(t.id));

  return (
    <div className="flex flex-col gap-6 px-5 pb-8 pt-5">
      <h1 className="font-display text-[24px] font-semibold text-marfim">Minha lista</h1>

      {titles.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-linha px-6 py-12 text-center">
          <HeartIcon width={28} height={28} className="text-areia-dim" />
          <p className="text-[14px] text-areia">
            Toque no coração de um título para guardá-lo aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {titles.map((t) => (
            <PosterCard key={t.id} title={t} className="w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
