import { useHashRoute } from "./navigation";
import { Home } from "@/pages/Home";
import { PremiumDetailing } from "@/pages/PremiumDetailing";
import { UltimateDetailing } from "@/pages/UltimateDetailing";
import { Admin } from "@/pages/Admin";

export default function App() {
  const route = useHashRoute();

  switch (route.page) {
    case "premium":
      return <PremiumDetailing packageId={route.packageId} />;
    case "ultimate":
      return <UltimateDetailing />;
    case "admin":
      return <Admin />;
    case "home":
    default:
      return <Home initialSection={route.section} />;
  }
}
