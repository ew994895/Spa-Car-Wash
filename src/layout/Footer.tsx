import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const logo = "https://spacarwash.com/wp-content/uploads/2024/10/logo.png";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="Spa Car Wash & Detailing Center" className="h-20 w-auto mb-4" />
            <p className="text-blue-200 mb-4">
              Premium car care services in the Philadelphia area since 1985.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-500 p-2 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-400 p-2 rounded-full transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Wash Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("detailing")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Detailing Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("membership")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Membership
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("help")}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  Help
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-blue-200">
              <li>Express Wash</li>
              <li>Full Service Wash</li>
              <li>Elite Packages</li>
              <li>Interior Detailing</li>
              <li>Exterior Detailing</li>
              <li>Ceramic Coating</li>
              <li>Membership Plans</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-blue-200">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  734 Lancaster Ave<br />
                  Berwyn, PA 19312
                </span>
              </li>
              <li>
                <a
                  href="tel:610-695-0711"
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  610-695-0711
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@spacarwash.com"
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  info@spacarwash.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Staff Admin Tools - Info Section */}
        <div className="border-t border-blue-500/20 pt-8 mb-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-yellow-500/30 rounded-lg p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-yellow-400 font-bold text-lg mb-2">Staff Admin Portal</h4>
                <p className="text-blue-200 text-sm">
                  Authorized employees can update business status, promotions, and wait times from the secure admin route.
                </p>
                <p className="text-blue-300/70 text-xs mt-2">
                  Need access? Contact management for the current passcode.
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                window.location.href = `${import.meta.env.BASE_URL}#/admin`;
              }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500"
            >
              Go to Admin Portal
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-300 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Spa Car Wash & Detailing Center. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
