import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { CrispChat } from "@/layout/CrispChat";
import { BackToTop } from "@/layout/BackToTop";
import { Hero } from "@/sections/Hero";
import { WashPackages } from "@/sections/WashPackages";
import { Membership } from "@/sections/Membership";
import { DetailingServicesSection } from "@/sections/DetailingServicesSection";
import { About } from "@/sections/About";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Help } from "@/sections/Help";
import { PromotionBanner } from "@/features/promotions/PromotionBanner";
import { PromotionPopup } from "@/features/promotions/PromotionPopup";
import { PromotionFloating } from "@/features/promotions/PromotionFloating";
import { PromotionDisplay } from "@/features/promotions/PromotionDisplay";
import { PromotionAdmin } from "@/features/promotions/PromotionAdmin";
import { WaitTimeAdmin } from "@/features/wait-times/WaitTimeAdmin";
import { StatusAdmin, getBusinessStatus, type BusinessStatus } from "@/features/status/StatusAdmin";
import { useState, useEffect } from "react";

export function Home() {
  const [showPromotionAdmin, setShowPromotionAdmin] = useState(false);
  const [showWaitTimeAdmin, setShowWaitTimeAdmin] = useState(false);
  const [showStatusAdmin, setShowStatusAdmin] = useState(false);
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>(getBusinessStatus());

  // Set up keyboard shortcuts - ALL IN ONE PLACE
  useEffect(() => {
    console.log('✅ Admin keyboard shortcuts initialized:');
    console.log('   - Ctrl+Shift+S = Business Status');
    console.log('   - Ctrl+Shift+P = Promotions');
    console.log('   - Ctrl+Shift+X = Wait Times');
    
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+S for Business Status Admin
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        console.log('🔵 Ctrl+Shift+S pressed - Opening Status Admin');
        setShowStatusAdmin(true);
      }
      // Ctrl+Shift+P for Promotion Admin
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        console.log('🟣 Ctrl+Shift+P pressed - Opening Promotion Admin');
        setShowPromotionAdmin(true);
      }
      // Ctrl+Shift+X for Wait Time Admin
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        console.log('🟢 Ctrl+Shift+X pressed - Opening Wait Time Admin');
        setShowWaitTimeAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStatusUpdate = () => {
    setBusinessStatus(getBusinessStatus());
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Crisp Chat Widget */}
      <CrispChat />
      
      {/* Top Banner Promotions */}
      <PromotionBanner />
      
      <Header />
      <main>
        <Hero />
        
        {/* Hero Top Promotion Placement */}
        <div id="hero-promo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <PromotionDisplay placement="hero-top" />
        </div>
        
        {/* Wash Packages Section with Above Promotion */}
        <div id="packages">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PromotionDisplay placement="above-wash" />
          </div>
          <WashPackages />
        </div>
        
        {/* Membership Section with Above Promotion */}
        <div id="membership">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PromotionDisplay placement="above-membership" />
          </div>
          <Membership />
        </div>
        
        {/* Detailing Services Section with Above Promotion */}
        <div id="detailing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <PromotionDisplay placement="above-detailing" />
          </div>
          <DetailingServicesSection />
        </div>
        
        <About />
        <Testimonials />
        <Contact />
        <Help />
      </main>
      <Footer />
      
      {/* Floating Promotion Button (Bottom Right) */}
      <PromotionFloating />
      
      {/* Homepage Popup (appears once per session) */}
      <PromotionPopup />
      
      {/* Promotion Admin Panel */}
      {showPromotionAdmin && (
        <PromotionAdmin onClose={() => setShowPromotionAdmin(false)} />
      )}
      
      {/* Wait Time Admin Panel */}
      {showWaitTimeAdmin && (
        <WaitTimeAdmin onClose={() => setShowWaitTimeAdmin(false)} />
      )}
      
      {/* Status Admin Panel */}
      {showStatusAdmin && (
        <StatusAdmin onClose={() => setShowStatusAdmin(false)} onUpdate={handleStatusUpdate} />
      )}
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
