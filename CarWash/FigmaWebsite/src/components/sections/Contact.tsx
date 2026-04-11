import { MapPin, Phone, Clock, Mail, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocationMap } from "./LocationMap";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visit Us Today
          </h2>
          <p className="text-xl text-blue-200">
            Conveniently located in Berwyn, PA - Serving the Main Line area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-blue-200 mb-3">
                    734 Lancaster Ave<br />
                    Berwyn, PA 19312
                  </p>
                  <Button
                    variant="outline"
                    className="border-blue-400 text-blue-100 hover:bg-blue-500/20"
                    onClick={() => window.open('https://maps.google.com/?q=734+Lancaster+Ave+Berwyn+PA+19312', '_blank')}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <a 
                    href="tel:610-695-0711" 
                    className="text-2xl font-bold text-blue-300 hover:text-white transition-colors"
                  >
                    610-695-0711
                  </a>
                  <p className="text-blue-200 mt-2">
                    Call us for questions or appointments
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-600 rounded-full p-3 flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">Hours of Operation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-blue-100">
                      <span>Monday - Saturday</span>
                      <span className="font-semibold text-white">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between text-blue-100">
                      <span>Sunday</span>
                      <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a 
                    href="mailto:info@spacarwash.com" 
                    className="text-lg text-blue-300 hover:text-white transition-colors"
                  >
                    info@spacarwash.com
                  </a>
                  <p className="text-blue-200 mt-2">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Map */}
          <div className="h-full min-h-[500px]">
            <LocationMap />
          </div>
        </div>

        {/* Service Area */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-2 border-blue-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Serving the Greater Philadelphia Area
          </h3>
          <p className="text-blue-200 text-lg mb-4">
            We proudly serve customers within 30-45 minutes of our Berwyn location, including:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Wayne', 'Devon', 'Paoli', 'Malvern', 'Villanova', 'Bryn Mawr', 'Radnor', 'King of Prussia', 'Conshohocken', 'West Chester'].map((city) => (
              <span
                key={city}
                className="bg-slate-800/50 border border-blue-500/30 text-blue-100 px-4 py-2 rounded-full text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}