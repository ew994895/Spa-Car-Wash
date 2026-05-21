import { useEffect, useState } from "react";

export type AppRoute =
  | { page: "home"; section?: string }
  | { page: "premium"; packageId?: string }
  | { page: "ultimate" }
  | { page: "admin" };

function getPathAndQuery(hash: string) {
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  const value = normalized || "/";
  const [path, query = ""] = value.split("?");
  return {
    path: path || "/",
    params: new URLSearchParams(query),
  };
}

export function parseHashRoute(hash: string): AppRoute {
  const { path, params } = getPathAndQuery(hash);

  switch (path) {
    case "/premium-detailing":
      return {
        page: "premium",
        packageId: params.get("package") || undefined,
      };
    case "/ultimate-detailing":
      return { page: "ultimate" };
    case "/admin":
      return { page: "admin" };
    case "/":
    default:
      return {
        page: "home",
        section: params.get("section") || undefined,
      };
  }
}

export function navigateTo(path: string) {
  const nextHash = path.startsWith("/") ? path : `/${path}`;
  window.location.hash = nextHash;
}

export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseHashRoute(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHashRoute(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route;
}
