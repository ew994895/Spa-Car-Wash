import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home";
import { PremiumDetailing } from "@/pages/PremiumDetailing";
import { UltimateDetailing } from "@/pages/UltimateDetailing";
import { Admin } from "@/pages/Admin";

export const router = createBrowserRouter(
  [
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
    {
      path: "/admin",
      Component: Admin,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
