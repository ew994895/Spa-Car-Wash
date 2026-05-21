import { useEffect } from "react";
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

interface HomeProps {
  initialSection?: string;
}

export function Home({ initialSection }: HomeProps) {

  useEffect(() => {
    const targetId = initialSection;
    if (!targetId) {
      return;
    }

    requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [initialSection]);
  
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
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
