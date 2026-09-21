import { useApp, type Tab } from "../context/AppContext";
import { HomeIcon, ListIcon, SearchIcon, UserIcon } from "./icons";

const items: { tab: Tab; label: string; Icon: typeof HomeIcon }[] = [
  { tab: "inicio", label: "Início", Icon: HomeIcon },
  { tab: "buscar", label: "Buscar", Icon: SearchIcon },
  { tab: "lista", label: "Minha lista", Icon: ListIcon },
  { tab: "perfil", label: "Perfil", Icon: UserIcon },
];

export function BottomNav() {
  const { route, goTab } = useApp();
  const active = route.screen === "tab" ? route.tab : null;

  return (
    <nav className="flex h-[64px] shrink-0 items-center justify-around border-t border-linha bg-breu/95 backdrop-blur">
      {items.map(({ tab, label, Icon }) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => goTab(tab)}
            className="flex flex-col items-center gap-1 px-2 py-1"
            aria-current={isActive ? "page" : undefined}
          >
            <Icon width={20} height={20} className={isActive ? "text-ambar" : "text-areia"} />
            <span className={`text-[10px] ${isActive ? "font-semibold text-marfim" : "text-areia"}`}>{label}</span>
            <span className={`h-[3px] w-[3px] rounded-full ${isActive ? "bg-ambar" : "bg-transparent"}`} />
          </button>
        );
      })}
    </nav>
  );
}
