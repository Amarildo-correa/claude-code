import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { catalog, type Title } from "../data/catalog";
import { getNavigationApi, type NavigateEvent } from "../navigationApi";
import { pathForRoute, routeForPath, routesEqual, titleForRoute, type Route, type Tab } from "../router";

export type { Route, Tab };

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

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => routeForPath(window.location.pathname));
  // Só true depois que o app fez pelo menos uma navegação própria (push ou
  // volta/avanço do navegador): evita que "Voltar" saia do site inteiro
  // quando a página foi aberta direto num link profundo, sem histórico.
  const hasInAppHistory = useRef(false);
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

  useEffect(() => {
    document.title = titleForRoute(route);
  }, [route]);

  // Sincroniza o estado do app com a URL real do navegador: cliques em
  // voltar/avançar, e, quando a Navigation API existe, também qualquer
  // navegação interceptável (inclusive a disparada por navigateTo abaixo).
  useEffect(() => {
    const syncFromLocation = () => {
      hasInAppHistory.current = true;
      setRoute((current) => {
        const next = routeForPath(window.location.pathname);
        return routesEqual(current, next) ? current : next;
      });
    };

    const nav = getNavigationApi();
    if (nav) {
      const onNavigate = (event: NavigateEvent) => {
        if (!event.canIntercept || event.hashChange || event.downloadRequest !== null) return;
        let url: URL;
        try {
          url = new URL(event.destination.url);
        } catch {
          return;
        }
        if (url.origin !== window.location.origin) return;
        event.intercept({ handler: () => syncFromLocation() });
      };
      nav.addEventListener("navigate", onNavigate as EventListener);
      return () => nav.removeEventListener("navigate", onNavigate as EventListener);
    }

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const value = useMemo<AppContextValue>(() => {
    const navigateTo = (next: Route, { replace = false }: { replace?: boolean } = {}) => {
      const url = pathForRoute(next);
      const nav = getNavigationApi();
      if (nav) {
        nav.navigate(url, { history: replace ? "replace" : "push" });
      } else if (replace) {
        window.history.replaceState(null, "", url);
      } else {
        window.history.pushState(null, "", url);
      }
      if (!replace) hasInAppHistory.current = true;
      setRoute(next);
    };

    return {
      catalog,
      route,
      goTab: (tab) => navigateTo({ screen: "tab", tab }),
      openTitle: (id) => navigateTo({ screen: "detalhe", id }),
      goBack: () => {
        const nav = getNavigationApi();
        if (hasInAppHistory.current) {
          if (nav?.canGoBack) nav.back();
          else window.history.back();
        } else {
          navigateTo({ screen: "tab", tab: "inicio" }, { replace: true });
        }
      },
      myList,
      toggleMyList: (id) =>
        setMyList((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
      isInMyList: (id) => myList.includes(id),
    };
  }, [route, myList]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}
