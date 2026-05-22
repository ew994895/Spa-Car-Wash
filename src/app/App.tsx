import { useEffect, useState } from "react";
import { useRoute } from "@/app/router";
import { HomePage } from "@/pages/HomePage";
import { PremiumPage } from "@/pages/PremiumPage";
import { UltimatePage } from "@/pages/UltimatePage";
import { AdminPage } from "@/pages/AdminPage";
import { Promotion, readPromotions, readStatus, readWaitTimes } from "@/app/state";

export default function App() {
  const route = useRoute();
  const [status, setStatus] = useState(readStatus);
  const [waitTimes, setWaitTimes] = useState(readWaitTimes);
  const [promotions, setPromotions] = useState<Promotion[]>(readPromotions);

  function refresh() {
    setStatus(readStatus());
    setWaitTimes(readWaitTimes());
    setPromotions(readPromotions());
  }

  useEffect(() => {
    const handleRefresh = () => refresh();
    window.addEventListener("spa:status", handleRefresh);
    window.addEventListener("spa:wait-times", handleRefresh);
    window.addEventListener("spa:promotions", handleRefresh);
    return () => {
      window.removeEventListener("spa:status", handleRefresh);
      window.removeEventListener("spa:wait-times", handleRefresh);
      window.removeEventListener("spa:promotions", handleRefresh);
    };
  }, []);

  switch (route.page) {
    case "premium":
      return <PremiumPage packageId={route.packageId} />;
    case "ultimate":
      return <UltimatePage />;
    case "admin":
      return <AdminPage onRefresh={refresh} promotions={promotions} status={status} waitTimes={waitTimes} />;
    case "home":
    default:
      return <HomePage initialSection={route.section} promotions={promotions} status={status} waitTimes={waitTimes} />;
  }
}
