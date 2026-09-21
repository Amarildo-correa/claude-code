import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
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

// Push ao abrir um título, back ao sair dele; troca entre abas não desliza.
function transitionKindFor(current: Route, next: Route): TransitionKind {
  if (current.screen !== "detalhe" && next.screen === "detalhe") return "detail-forward";
  if (current.screen === "detalhe" && next.screen !== "detalhe") return "detail-back";
  return "tab";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => routeForPath(window.location.pathname));
  // Espelha `route` de forma síncrona (sem esperar o efeito de commit do
  // React) para que a transição saiba qual era a tela anterior mesmo quando
  // duas navegações acontecem em sequência rápida.
  const routeRef = useRef(route);
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

  // Aplica `next` com a transição de tela correta e mantém routeRef em dia,
  // de forma síncrona — usado tanto por navegações programáticas quanto
  // pela sincronização com a URL do navegador abaixo.
  const applyRoute = (next: Route) => {
    const current = routeRef.current;
    if (routesEqual(current, next)) return;
    routeRef.current = next;
    navigateWithTransition(transitionKindFor(current, next), () => setRoute(next));
  };

  // Sincroniza o estado do app com a URL real do navegador: cliques em
  // voltar/avançar, e, quando a Navigation API existe, também qualquer
  // navegação interceptável (inclusive a disparada por navigateTo abaixo).
  useEffect(() => {
    const syncFromLocation = () => {
      hasInAppHistory.current = true;
      applyRoute(routeForPath(window.location.pathname));
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
        // A Navigation API dispara "navigate" para esta chamada também; o
        // listener acima intercepta e chama applyRoute (com a transição).
        if (!replace) hasInAppHistory.current = true;
        nav.navigate(url, { history: replace ? "replace" : "push" });
        return;
      }

      if (replace) {
        window.history.replaceState(null, "", url);
      } else {
        window.history.pushState(null, "", url);
        hasInAppHistory.current = true;
      }
      applyRoute(next);
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
