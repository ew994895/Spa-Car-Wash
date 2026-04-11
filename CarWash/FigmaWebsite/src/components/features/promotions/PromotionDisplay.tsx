import { useEffect, useState } from "react";
import { Sparkles, Tag, Calendar, Gift, ArrowRight, Phone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Promotion } from "./PromotionAdmin";

interface PromotionDisplayProps {
  placement: string;
}

export function PromotionDisplay({ placement }: PromotionDisplayProps) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activePromos, setActivePromos] = useState<Promotion[]>([]);

  useEffect(() => {
    loadPromotions();
    
    const handleUpdate = () => {
      loadPromotions();
    };
    
    window.addEventListener('promotionsUpdated', handleUpdate);
    return () => window.removeEventListener('promotionsUpdated', handleUpdate);
  }, []);

  useEffect(() => {
    filterActivePromotions();
  }, [promotions, placement]);

  const loadPromotions = () => {
    const stored = localStorage.getItem('spa_promotions');
    if (stored) {
      setPromotions(JSON.parse(stored));
    }
  };

  const filterActivePromotions = () => {
    const now = new Date();
    const filtered = promotions.filter(promo => {
      // Must be active
      if (!promo.active) return false;
      
      // Check if started
      if (promo.startDate && new Date(promo.startDate) > now) return false;
      
      // Check if expired
      if (promo.expirationDate && new Date(promo.expirationDate) < now) return false;
      
      // Check placement match
      if (promo.placement !== placement) return false;
      
      // Check display mode
      if (promo.displayMode === 'banner' || promo.displayMode === 'popup') return false;
      
      return true;
    });
    
    setActivePromos(filtered);
  };

  const handlePromoClick = (promo: Promotion) => {
    // Track click
    const updated = promotions.map(p => 
      p.id === promo.id ? { ...p, clickCount: p.clickCount + 1 } : p
    );
    localStorage.setItem('spa_promotions', JSON.stringify(updated));
    setPromotions(updated);
    
    // Execute action
    switch (promo.ctaAction) {
      case 'call':
        window.open('tel:610-695-0711');
        break;
      case 'scroll':
        if (promo.ctaLink) {
          const element = document.querySelector(promo.ctaLink);
          element?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'book':
        const bookingElement = document.querySelector('#detailing-services');
        bookingElement?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'custom':
        if (promo.ctaLink) {
          window.open(promo.ctaLink, '_blank');
        }
        break;
      case 'code':
        alert(`Your promo code: ${promo.promoCode}\n\nMention this code when booking your appointment!`);
        break;
    }
  };

  if (activePromos.length === 0) return null;

  // Compact header version
  if (placement === 'header') {
    return (
      <div className="flex items-center gap-2">
        {activePromos.slice(0, 1).map((promo) => (
          <button
            key={promo.id}
            onClick={() => handlePromoClick(promo)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold px-4 py-1.5 rounded-full text-xs whitespace-nowrap shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-3 h-3 animate-pulse" />
            {promo.discount}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activePromos.map((promo) => (
        <Card 
          key={promo.id}
          className="bg-gradient-to-br from-yellow-900/40 via-red-900/40 to-yellow-900/40 border-2 border-yellow-500/50 overflow-hidden relative group hover:border-yellow-400/70 transition-all duration-300 shadow-lg shadow-yellow-500/20"
        >
          {/* Promotional Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4" />
            SPECIAL OFFER
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left: Main Content */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                    <Gift className="w-8 h-8 text-yellow-400" />
                    {promo.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                    <Tag className="w-6 h-6" />
                    {promo.discount}
                  </p>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                {/* Promo Code Display */}
                {promo.promoCode && (
                  <div className="bg-slate-900/50 border-2 border-yellow-500/30 rounded-lg p-4 inline-block">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-blue-300 text-sm">Promo Code:</p>
                        <p className="text-white font-bold text-xl tracking-wider">{promo.promoCode}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Expiration */}
                {promo.expirationDate && (
                  <div className="flex items-center gap-2 text-yellow-200">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">
                      Expires: {new Date(promo.expirationDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => handlePromoClick(promo)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-lg py-6 shadow-xl group-hover:scale-105 transition-transform"
                >
                  {promo.ctaAction === 'call' && <Phone className="w-5 h-5 mr-2" />}
                  {promo.ctaAction === 'code' && <Code className="w-5 h-5 mr-2" />}
                  {promo.ctaText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                {promo.ctaAction !== 'call' && (
                  <Button
                    variant="outline"
                    onClick={() => window.open('tel:610-695-0711')}
                    className="w-full border-2 border-yellow-400 text-yellow-100 hover:bg-yellow-500/20 py-4"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call to Book: 610-695-0711
                  </Button>
                )}
              </div>
            </div>

            {/* Image (if provided) */}
            {promo.imageUrl && (
              <div className="mt-6 rounded-lg overflow-hidden border-2 border-yellow-500/30">
                <img 
                  src={promo.imageUrl} 
                  alt={promo.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}