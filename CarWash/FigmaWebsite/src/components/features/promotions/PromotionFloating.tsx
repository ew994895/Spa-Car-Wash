import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Promotion } from "./PromotionAdmin";

export function PromotionFloating() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [floatingPromo, setFloatingPromo] = useState<Promotion | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    loadPromotions();
    
    const handleUpdate = () => {
      loadPromotions();
      setDismissed(false);
    };
    
    window.addEventListener('promotionsUpdated', handleUpdate);
    return () => window.removeEventListener('promotionsUpdated', handleUpdate);
  }, []);

  useEffect(() => {
    filterFloatingPromotion();
  }, [promotions]);

  const loadPromotions = () => {
    const stored = localStorage.getItem('spa_promotions');
    if (stored) {
      setPromotions(JSON.parse(stored));
    }
  };

  const filterFloatingPromotion = () => {
    const now = new Date();
    const eligible = promotions.find(promo => {
      if (!promo.active) return false;
      if (promo.startDate && new Date(promo.startDate) > now) return false;
      if (promo.expirationDate && new Date(promo.expirationDate) < now) return false;
      if (promo.placement !== 'floating-bottom') return false;
      return true;
    });
    
    setFloatingPromo(eligible || null);
  };

  const handleClick = () => {
    if (!floatingPromo) return;

    // Track click
    const updated = promotions.map(p => 
      p.id === floatingPromo.id ? { ...p, clickCount: p.clickCount + 1 } : p
    );
    localStorage.setItem('spa_promotions', JSON.stringify(updated));
    
    // Scroll to section
    const targetSection = getTargetSection(floatingPromo.placement);
    const element = document.querySelector(targetSection);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTargetSection = (placement: string): string => {
    const map: Record<string, string> = {
      'above-wash': '#wash-packages',
      'above-detailing': '#detailing-services',
      'above-membership': '#membership',
    };
    return map[placement] || '#hero';
  };

  if (!floatingPromo || dismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-slideUp">
      <div 
        className="bg-gradient-to-br from-yellow-600 via-yellow-500 to-red-600 rounded-2xl shadow-2xl border-4 border-yellow-400/50 overflow-hidden cursor-pointer group hover:scale-105 transition-transform max-w-sm"
        onClick={handleClick}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-all z-10"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2 flex-shrink-0 animate-pulse">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <p className="text-black font-bold text-sm uppercase tracking-wide mb-1">
                Special Offer
              </p>
              <p className="text-black font-bold text-lg mb-1">
                {floatingPromo.discount}
              </p>
              <p className="text-black/80 text-sm">
                {floatingPromo.title}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-black font-bold text-sm group-hover:underline">
              Click to Learn More →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
