import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { catalog, type Title } from "../data/catalog";

export type Tab = "inicio" | "buscar" | "lista" | "perfil";
export type Route = { screen: "tab"; tab: Tab } | { screen: "detalhe"; id: string };

interface AppContextValue {
  catalog: Title[];
  route: Route;
  goTab: (tab: Tab) => void;
  openTitle: (id: string) => void;
  goBack: () => void;
  myList: string[];
  toggleMyList: (id: string) => void;
  isInMyList: (id: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "nova.myList";

type TransitionKind = "tab" | "detail-forward" | "detail-back";

/**
 * Runs `update` inside a View Transition (with a graceful fallback for
 * browsers that don't support it yet) and stamps the navigation kind on
 * <html> so index.css can pick a matching ::view-transition-* animation.
 */
function navigateWithTransition(kind: TransitionKind, update: () => void) {
  const root = document.documentElement;

  if (typeof document.startViewTransition !== "function") {
    update();
    return;
  }

  root.dataset.transition = kind;
  const transition = document.startViewTransition(() => flushSync(update));
  transition.finished.finally(() => {
    delete root.dataset.transition;
  });
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ screen: "tab", tab: "inicio" });
  const history = useRef<Route[]>([]);
  const [myList, setMyList] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
    } catch {
      // armazenamento indisponível — segue só em memória
    }
  }, [myList]);

  const value = useMemo<AppContextValue>(
    () => ({
      catalog,
      route,
      goTab: (tab) => {
        navigateWithTransition("tab", () => {
          history.current = [];
          setRoute({ screen: "tab", tab });
        });
      },
      openTitle: (id) => {
        navigateWithTransition("detail-forward", () => {
          history.current = [...history.current, route];
          setRoute({ screen: "detalhe", id });
        });
      },
      goBack: () => {
        navigateWithTransition("detail-back", () => {
          const prev = history.current.pop() ?? { screen: "tab", tab: "inicio" };
          setRoute(prev);
        });
      },
      myList,
      toggleMyList: (id) =>
        setMyList((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
      isInMyList: (id) => myList.includes(id),
    }),
    [route, myList],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}
