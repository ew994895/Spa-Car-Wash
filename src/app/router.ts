import { useEffect, useState } from "react";

export type AppRoute =
  | { page: "home"; section?: string }
  | { page: "premium"; packageId?: string }
  | { page: "ultimate" }
  | { page: "admin" };

function parseHash(hash: string) {
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  const [pathname = "/", query = ""] = (normalized || "/").split("?");
  return {
    pathname,
    params: new URLSearchParams(query),
  };
}

export function parseRoute(hash: string): AppRoute {
  const { pathname, params } = parseHash(hash);

  switch (pathname) {
    case "/premium-detailing":
      return { page: "premium", packageId: params.get("package") || undefined };
    case "/ultimate-detailing":
      return { page: "ultimate" };
    case "/admin":
      return { page: "admin" };
    case "/":
    default:
      return { page: "home", section: params.get("section") || undefined };
  }
}

export function navigate(path: string) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}

export function useRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
