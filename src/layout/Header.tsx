import { useState, useEffect } from "react";
import { Phone, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromotionDisplay } from "@/features/promotions/PromotionDisplay";
import { WaitTimeBadge } from "@/features/wait-times/WaitTimeBadge";
import { getBusinessStatus, getNextOpeningMessage, type BusinessStatus } from "@/features/status/StatusAdmin";

const logo = "https://spacarwash.com/wp-content/uploads/2024/10/logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>(getBusinessStatus());

  // Load status on mount and listen for updates from the admin portal
  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
    
    // Listen for status updates from other components
    const handleStorageChange = () => {
      setBusinessStatus(getBusinessStatus());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener('statusUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('statusUpdated', handleStorageChange);
    };
  }, []);

  const nextOpeningMsg = getNextOpeningMessage(businessStatus);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/90 backdrop-blur-md border-b border-blue-500/20">
        {/* Top Bar - Contact Info & Status */}
        <div className="bg-gradient-to-r from-blue-900/40 to-red-900/40 border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-sm">
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Business Status Badge */}
                <div
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50"
                  title="Staff: update status inside the admin portal"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      businessStatus.isOpen ? "bg-green-500" : "bg-red-500"
                    } animate-pulse`}
                  ></div>
                  <span
                    className={`font-bold text-xs sm:text-sm ${
                      businessStatus.isOpen ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {businessStatus.isOpen ? "OPEN" : "CLOSED"}
                  </span>
                  {!businessStatus.isOpen && businessStatus.reason && (
                    <span className="hidden sm:inline text-yellow-300 text-xs">
                      - {businessStatus.reason}
                    </span>
                  )}
                </div>

                <a 
                  href="tel:610-695-0711" 
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">610-695-0711</span>
                </a>
                <a 
                  href="https://maps.google.com/?q=734+Lancaster+Ave+Berwyn+PA+19312" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>734 Lancaster Ave, Berwyn, PA 19312</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                {/* Header Promotion Display (Inline compact version) */}
                <div className="hidden lg:block">
                  <PromotionDisplay placement="header" />
                </div>
                <Button 
                  onClick={() => scrollToSection("membership")}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/20 text-xs sm:text-sm px-3 sm:px-4"
                >
                  Join Membership
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Spa Car Wash & Detailing Center" className="h-16 sm:h-20 w-auto" />
              {/* Wait Time Badge next to logo */}
              <div className="hidden md:block">
                <WaitTimeBadge />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Wash Packages
              </button>
              <button
                onClick={() => scrollToSection("detailing")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Detailing Services
              </button>
              <button
                onClick={() => scrollToSection("membership")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Membership
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-blue-100 hover:text-white transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                Wash Packages
              </button>
              <button
                onClick={() => scrollToSection("detailing")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                Detailing Services
              </button>
              <button
                onClick={() => scrollToSection("membership")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                Membership
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-blue-100 hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Next Opening Time Banner (shown when closed) */}
      {!businessStatus.isOpen && nextOpeningMsg && (
        <div className="fixed top-[132px] left-0 right-0 z-40 bg-gradient-to-r from-yellow-900/90 to-orange-900/90 backdrop-blur-sm border-b border-yellow-600/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2 text-center">
              <span className="text-yellow-200 text-sm font-medium">
                {nextOpeningMsg}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
