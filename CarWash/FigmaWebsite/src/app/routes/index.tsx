import { createBrowserRouter } from "react-router";
import { Home } from "@/pages/Home";
import { PremiumDetailing } from "@/pages/PremiumDetailing";
import { UltimateDetailing } from "@/pages/UltimateDetailing";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/premium-detailing",
    Component: PremiumDetailing,
  },
  {
    path: "/ultimate-detailing",
    Component: UltimateDetailing,
  },
]);
