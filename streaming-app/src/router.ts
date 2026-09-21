import { getTitle } from "./data/catalog";

export type Tab = "inicio" | "buscar" | "lista" | "perfil";
export type Route = { screen: "tab"; tab: Tab } | { screen: "detalhe"; id: string };

// import.meta.env.BASE_URL vem do "base" do Vite (ex.: "/claude-code/"); em dev é "/".
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function pathForRoute(route: Route): string {
  if (route.screen === "detalhe") return `${BASE}/titulo/${route.id}`;
  switch (route.tab) {
    case "buscar":
      return `${BASE}/buscar`;
    case "lista":
      return `${BASE}/lista`;
    case "perfil":
      return `${BASE}/perfil`;
    case "inicio":
    default:
      return `${BASE}/`;
  }
}

export function routeForPath(pathname: string): Route {
  let path = pathname;
  if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length);
  if (!path.startsWith("/")) path = `/${path}`;
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "titulo" && segments[1]) {
    return { screen: "detalhe", id: decodeURIComponent(segments[1]) };
  }
  if (segments[0] === "buscar" || segments[0] === "lista" || segments[0] === "perfil") {
    return { screen: "tab", tab: segments[0] };
  }
  return { screen: "tab", tab: "inicio" };
}

export function titleForRoute(route: Route): string {
  const marca = "Nova";
  if (route.screen === "detalhe") {
    const title = getTitle(route.id);
    return title ? `${title.name} — ${marca}` : marca;
  }
  switch (route.tab) {
    case "buscar":
      return `Buscar — ${marca}`;
    case "lista":
      return `Minha lista — ${marca}`;
    case "perfil":
      return `Perfil — ${marca}`;
    case "inicio":
    default:
      return marca;
  }
}

export function routesEqual(a: Route, b: Route): boolean {
  if (a.screen !== b.screen) return false;
  if (a.screen === "detalhe" && b.screen === "detalhe") return a.id === b.id;
  if (a.screen === "tab" && b.screen === "tab") return a.tab === b.tab;
  return false;
}
