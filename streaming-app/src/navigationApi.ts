// Tipos mínimos para a Navigation API — ainda não faz parte do lib.dom.d.ts
// padrão do TypeScript em todas as versões, então declaramos só o que usamos.
// Suportada no Chrome/Edge; navegadores sem suporte caem no fallback via
// History API (pushState/replaceState + popstate) em AppContext.tsx.

export interface NavigateEvent extends Event {
  readonly canIntercept: boolean;
  readonly hashChange: boolean;
  readonly downloadRequest: string | null;
  readonly destination: { url: string };
  intercept(options?: { handler?: () => Promise<void> | void }): void;
}

export interface NavigationApi extends EventTarget {
  readonly canGoBack: boolean;
  navigate(url: string, options?: { history?: "push" | "replace"; state?: unknown }): unknown;
  back(): unknown;
}

export function getNavigationApi(): NavigationApi | undefined {
  return (window as unknown as { navigation?: NavigationApi }).navigation;
}
