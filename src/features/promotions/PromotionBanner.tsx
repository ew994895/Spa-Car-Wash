import { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Promotion, PROMO_STORAGE_KEY } from "./PromotionAdmin";
import { readJson, writeJson } from "@/lib/storage";

export function PromotionBanner() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [bannerPromos, setBannerPromos] = useState<Promotion[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPromotions();
    loadDismissed();
    
    const handleUpdate = () => {
      loadPromotions();
    };
    
    window.addEventListener('promotionsUpdated', handleUpdate);
    return () => window.removeEventListener('promotionsUpdated', handleUpdate);
  }, []);

  useEffect(() => {
    filterBannerPromotions();
  }, [promotions, dismissed]);

  const loadPromotions = () => {
    setPromotions(readJson<Promotion[]>(PROMO_STORAGE_KEY, []));
  };

  const loadDismissed = () => {
    const stored = readJson<string[]>('spa_dismissed_banners', []);
    setDismissed(new Set(stored));
  };

  const filterBannerPromotions = () => {
    const now = new Date();
    const filtered = promotions.filter(promo => {
      if (!promo.active) return false;
      if (dismissed.has(promo.id)) return false;
      if (promo.startDate && new Date(promo.startDate) > now) return false;
      if (promo.expirationDate && new Date(promo.expirationDate) < now) return false;
      if (!promo.showBanner && promo.displayMode !== 'banner' && promo.displayMode !== 'all') return false;
      return true;
    });
    
    setBannerPromos(filtered);
  };

  const handleDismiss = (promoId: string) => {
    const updated = new Set(dismissed);
    updated.add(promoId);
    setDismissed(updated);
    writeJson('spa_dismissed_banners', [...updated]);
  };

  const handleBannerClick = (promo: Promotion) => {
    // Track click
    const updated = promotions.map(p => 
      p.id === promo.id ? { ...p, clickCount: (p.clickCount ?? 0) + 1 } : p
    );
    writeJson(PROMO_STORAGE_KEY, updated);
    
    // Scroll to promotion section
    const targetSection = getTargetSection(promo.placement);
    if (targetSection) {
      const element = document.querySelector(targetSection);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTargetSection = (placement: string): string => {
    const map: Record<string, string> = {
      'above-wash': '#wash-packages',
      'above-detailing': '#detailing-services',
      'above-membership': '#membership',
      'hero-top': '#hero',
      'header': '#hero',
    };
    return map[placement] || '#hero';
  };

  if (bannerPromos.length === 0) return null;

  return (
    <>
      {bannerPromos.map((promo) => (
        <div
          key={promo.id}
          className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-b-4 border-yellow-700 shadow-lg sticky top-0 z-40 animate-slideDown"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Sparkles className="w-6 h-6 text-black flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <p className="text-black font-bold text-lg md:text-xl">
                    {promo.title} - {promo.discount}
                  </p>
                  <p className="text-black/80 text-sm hidden md:block">
                    {promo.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleBannerClick(promo)}
                  className="bg-black hover:bg-black/80 text-yellow-400 font-bold px-6 py-2 shadow-lg"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <button
                  onClick={() => handleDismiss(promo.id)}
                  className="text-black hover:bg-black/10 rounded-full p-2 transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
