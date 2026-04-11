import { Phone, Mail, MapPin, MessageCircle, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Help() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactInfo = {
    phone: "610-695-0711",
    email: "info@spacarwash.com",
    address: "734 Lancaster Ave, Berwyn, PA 19312",
  };

  const handleCopy = async (text: string, label: string) => {
    // Use fallback method directly to avoid clipboard API permissions issues
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      textArea.remove();
      
      if (successful) {
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(null), 2000);
      }
    } catch (err) {
      // Silently fail - copy functionality not critical
      console.log("Copy not available in this environment");
    }
  };

  const openChat = () => {
    // Crisp chat integration - will open chat window
    if (window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
    }
  };

  return (
    <section id="help" className="py-20 bg-gradient-to-b from-slate-900 to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We're Here to Help
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Get in touch with us anytime. We offer multiple ways to reach our team and answer your questions.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 24/7 Live Chat */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-slate-800/40 border-2 border-blue-500/30 p-8 hover:border-blue-400/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-4 flex-shrink-0">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">24/7 Live Chat</h3>
                <p className="text-blue-200 mb-4">
                  Get instant answers to your questions anytime, day or night. Our chat support is always available to help you.
                </p>
                <Button
                  onClick={openChat}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Phone */}
          <Card className="bg-gradient-to-br from-red-900/40 to-slate-800/40 border-2 border-red-500/30 p-8 hover:border-red-400/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-full p-4 flex-shrink-0">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-blue-200 mb-4">
                  Speak directly with our team during business hours for immediate assistance.
                </p>
                <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3 mb-3 border border-red-500/20">
                  <span className="text-white font-bold text-lg flex-1">{contactInfo.phone}</span>
                  <button
                    onClick={() => handleCopy(contactInfo.phone, "phone")}
                    className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded"
                    title="Copy phone number"
                  >
                    {copiedItem === "phone" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => window.open(`tel:${contactInfo.phone}`)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Email */}
          <Card className="bg-gradient-to-br from-yellow-900/40 to-slate-800/40 border-2 border-yellow-500/30 p-8 hover:border-yellow-400/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full p-4 flex-shrink-0">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                <p className="text-blue-200 mb-4">
                  Send us a detailed message and we'll respond within 24 hours.
                </p>
                <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3 mb-3 border border-yellow-500/20">
                  <span className="text-white font-bold text-lg flex-1 break-all">{contactInfo.email}</span>
                  <button
                    onClick={() => handleCopy(contactInfo.email, "email")}
                    className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded"
                    title="Copy email address"
                  >
                    {copiedItem === "email" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => window.open(`mailto:${contactInfo.email}`)}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </Card>

          {/* Address / Visit Us */}
          <Card className="bg-gradient-to-br from-green-900/40 to-slate-800/40 border-2 border-green-500/30 p-8 hover:border-green-400/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-full p-4 flex-shrink-0">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Visit Us</h3>
                <p className="text-blue-200 mb-4">
                  Stop by our location to speak with our team in person.
                </p>
                <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-3 mb-3 border border-green-500/20">
                  <span className="text-white font-bold text-lg flex-1">{contactInfo.address}</span>
                  <button
                    onClick={() => handleCopy(contactInfo.address, "address")}
                    className="text-blue-300 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded"
                    title="Copy address"
                  >
                    {copiedItem === "address" ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`, "_blank")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Help Section */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 border-2 border-blue-500/20 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Quick Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-2">Service Pricing</h4>
              <p className="text-blue-200 mb-3">View our wash packages and detailing services</p>
              <Button
                onClick={() => {
                  const element = document.getElementById("packages");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-500/20"
              >
                View Services
              </Button>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-2">Book Appointment</h4>
              <p className="text-blue-200 mb-3">Schedule your detailing service online</p>
              <Button
                onClick={() => {
                  const element = document.getElementById("detailing");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-500/20"
              >
                Book Now
              </Button>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold text-white mb-2">Membership Info</h4>
              <p className="text-blue-200 mb-3">Learn about our prepaid wash cards</p>
              <Button
                onClick={() => {
                  const element = document.getElementById("membership");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-500/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Card>

        {/* Business Hours Note */}
        <div className="mt-8 text-center">
          <p className="text-blue-300">
            <strong>Note:</strong> While our 24/7 chat is always available, phone support is available during business hours.
            Check the top of our homepage for current open/closed status.
          </p>
        </div>
      </div>
    </section>
  );
}