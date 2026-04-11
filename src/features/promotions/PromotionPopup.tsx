import { useEffect, useState } from "react";
import { X, Sparkles, Gift, Tag, Calendar, ArrowRight, Phone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Promotion } from "./PromotionAdmin";

export function PromotionPopup() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [popupPromo, setPopupPromo] = useState<Promotion | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    loadPromotions();
    
    const handleUpdate = () => {
      loadPromotions();
    };
    
    window.addEventListener('promotionsUpdated', handleUpdate);
    return () => window.removeEventListener('promotionsUpdated', handleUpdate);
  }, []);

  useEffect(() => {
    checkForPopup();
  }, [promotions]);

  const loadPromotions = () => {
    const stored = localStorage.getItem('spa_promotions');
    if (stored) {
      setPromotions(JSON.parse(stored));
    }
  };

  const checkForPopup = () => {
    // Check if already shown this session
    const sessionShown = sessionStorage.getItem('spa_popup_shown');
    if (sessionShown) return;

    const now = new Date();
    const eligiblePromos = promotions.filter(promo => {
      if (!promo.active) return false;
      if (promo.startDate && new Date(promo.startDate) > now) return false;
      if (promo.expirationDate && new Date(promo.expirationDate) < now) return false;
      if (!promo.showPopup && promo.displayMode !== 'popup' && promo.displayMode !== 'all') return false;
      return true;
    });

    if (eligiblePromos.length > 0) {
      // Show first eligible promo
      setPopupPromo(eligiblePromos[0]);
      setShowPopup(true);
      sessionStorage.setItem('spa_popup_shown', 'true');
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handlePromoClick = (promo: Promotion) => {
    // Track click
    const updated = promotions.map(p => 
      p.id === promo.id ? { ...p, clickCount: p.clickCount + 1 } : p
    );
    localStorage.setItem('spa_promotions', JSON.stringify(updated));
    setPromotions(updated);
    
    // Close popup
    setShowPopup(false);
    
    // Execute action
    switch (promo.ctaAction) {
      case 'call':
        window.open('tel:610-695-0711');
        break;
      case 'scroll':
        if (promo.ctaLink) {
          setTimeout(() => {
            const element = document.querySelector(promo.ctaLink);
            element?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
        break;
      case 'book':
        setTimeout(() => {
          const bookingElement = document.querySelector('#detailing-services');
          bookingElement?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
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

  const handleViewDetails = (promo: Promotion) => {
    setShowPopup(false);
    
    // Scroll to section based on placement
    const targetSection = getTargetSection(promo.placement);
    setTimeout(() => {
      const element = document.querySelector(targetSection);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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

  if (!showPopup || !popupPromo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      style={{ 
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <Card 
        className="bg-gradient-to-br from-yellow-900/95 via-red-900/95 to-yellow-900/95 border-4 border-yellow-500/70 max-w-2xl w-full overflow-hidden relative shadow-2xl shadow-yellow-500/30 animate-scaleIn"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10 hover:scale-110"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Promotional Badge */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 text-center font-bold text-lg flex items-center justify-center gap-2 animate-pulse">
          <Sparkles className="w-5 h-5" />
          LIMITED TIME OFFER
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="p-8 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <Gift className="w-10 h-10 text-yellow-400" />
              {popupPromo.title}
            </h2>
            <p className="text-3xl font-bold text-yellow-300 flex items-center justify-center gap-2">
              <Tag className="w-8 h-8" />
              {popupPromo.discount}
            </p>
          </div>

          {/* Description */}
          <div className="bg-slate-900/50 rounded-lg p-6 border-2 border-yellow-500/30">
            <p className="text-blue-100 text-lg leading-relaxed text-center">
              {popupPromo.description}
            </p>
          </div>

          {/* Promo Code */}
          {popupPromo.promoCode && (
            <div className="bg-black/50 border-2 border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-3">
                <Code className="w-6 h-6 text-yellow-400" />
                <div className="text-center">
                  <p className="text-blue-300 text-sm">Use Promo Code:</p>
                  <p className="text-white font-bold text-2xl tracking-wider">{popupPromo.promoCode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Expiration */}
          {popupPromo.expirationDate && (
            <div className="flex items-center justify-center gap-2 text-yellow-200">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">
                Expires: {new Date(popupPromo.expirationDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          )}

          {/* Image */}
          {popupPromo.imageUrl && (
            <div className="rounded-lg overflow-hidden border-2 border-yellow-500/30">
              <img 
                src={popupPromo.imageUrl} 
                alt={popupPromo.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handlePromoClick(popupPromo)}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold text-xl py-6 shadow-xl hover:scale-105 transition-transform"
            >
              {popupPromo.ctaAction === 'call' && <Phone className="w-5 h-5 mr-2" />}
              {popupPromo.ctaAction === 'code' && <Code className="w-5 h-5 mr-2" />}
              {popupPromo.ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button
              onClick={() => handleViewDetails(popupPromo)}
              variant="outline"
              className="w-full border-2 border-yellow-400 text-yellow-100 hover:bg-yellow-500/20 py-4"
            >
              View Full Details
            </Button>

            {popupPromo.ctaAction !== 'call' && (
              <Button
                variant="outline"
                onClick={() => {
                  window.open('tel:610-695-0711');
                  setShowPopup(false);
                }}
                className="w-full border-2 border-blue-400 text-blue-100 hover:bg-blue-500/20 py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Or Call: 610-695-0711
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
