import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Check, Clock, Sparkles, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookingForm } from "@/features/booking/BookingForm";

export function UltimateDetailing() {
  const navigate = useNavigate();

  const ultimatePackage = {
    name: "Ultimate Detail Package",
    price: "$750–$875",
    priceBreakdown: "Sedans $750-$800 | SUVs & Trucks $825-$875",
    serviceTime: "2 Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-19.jpg",
    description: "Spa's Ultimate Detail Package is our ultra-premium two-day makeover service that transforms your vehicle inside and out, regardless of its condition. This is the pinnacle of automotive detailing - a complete restoration that brings your vehicle to near showroom condition.",
  };

  const dayOneServices = [
    "Complete exterior assessment and documentation",
    "Pre-wash and decontamination",
    "Hand wash with premium pH-balanced soap",
    "Complete clay bar treatment (entire vehicle)",
    "Paint depth measurement and inspection",
    "Multi-stage paint correction (removes swirls, scratches, oxidation)",
    "Machine polishing with premium compounds",
    "Paint surface preparation",
    "Wheel removal for deep barrel cleaning (if safe)",
    "Wheel faces polished and sealed",
    "Tire sidewalls deep cleaned and dressed",
    "Wheel wells thoroughly cleaned and dressed",
    "Chrome and metal polishing",
    "Trim restoration and protection",
    "Headlight restoration and sealing",
    "Exterior glass polishing and treatment",
  ];

  const dayTwoServices = [
    "Premium carnauba wax or ceramic coating application",
    "Complete interior extraction and deep cleaning",
    "Seats: Hot water extraction and shampooing (cloth) or conditioning (leather)",
    "Carpets: Hot water extraction with pre-treatment",
    "Floor mats: Deep cleaned or replaced if needed",
    "Dashboard and console: Multi-stage cleaning and protection",
    "Door panels: Complete detail including pockets and armrests",
    "Center console: Every crevice cleaned",
    "Headliner: Complete cleaning",
    "All plastics, vinyl: Cleaned and UV protected",
    "Air vents: Thoroughly cleaned with specialized tools",
    "Interior glass: Streak-free cleaning inside",
    "Trunk/cargo area: Complete detail",
    "Engine bay: Detailed cleaning (non-electric vehicles)",
    "Ozone treatment for odor elimination",
    "Final inspection and touch-ups",
  ];

  const additionalFeatures = [
    "Pickup and delivery service included",
    "Photo documentation: Before and after pictures",
    "Complimentary wash card (5 basic washes)",
    "90-day protection guarantee on exterior finish",
    "Stain removal on interior surfaces",
    "Pet hair complete removal",
    "Odor elimination treatment",
    "Minor scratch buffing",
    "Water spot removal",
    "Tar and sap removal",
    "Convertible top cleaning and protection (if applicable)",
    "Engine compartment detailing (gas vehicles)",
    "Undercarriage cleaning and inspection",
    "Final quality control inspection by senior detailer",
  ];

  const perfectFor = [
    "Vehicles that haven't been detailed in over a year",
    "Pre-sale preparation to maximize resale value",
    "Restoring a vehicle after purchase",
    "Annual deep clean and protection",
    "Show car preparation",
    "Luxury and exotic vehicles",
    "Classic and vintage automobiles",
    "Vehicles with heavy wear or neglect",
    "Special occasions (weddings, events)",
    "Gift for a car enthusiast",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 border-b-2 border-yellow-500/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-yellow-400 text-yellow-100 hover:bg-yellow-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Package Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 uppercase tracking-wider text-lg font-bold">
              Ultimate Package
            </span>
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {ultimatePackage.name}
          </h1>
          <p className="text-4xl font-bold text-yellow-400 mb-2">
            {ultimatePackage.price}
          </p>
          <p className="text-blue-200 text-xl mb-4">{ultimatePackage.priceBreakdown}</p>
          <div className="flex items-center justify-center gap-2 text-yellow-300 text-lg">
            <Clock className="w-5 h-5" />
            <span>{ultimatePackage.serviceTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <Card className="overflow-hidden border-4 border-yellow-500/50 ring-4 ring-yellow-500/20 shadow-2xl shadow-yellow-500/30">
            <img
              src={ultimatePackage.image}
              alt={ultimatePackage.name}
              className="w-full h-[500px] object-cover"
            />
          </Card>
        </div>

        {/* Description */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-slate-900/50 border-2 border-yellow-500/40 p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-400" />
            The Ultimate Transformation
          </h2>
          <p className="text-blue-100 text-xl leading-relaxed">
            {ultimatePackage.description}
          </p>
        </Card>

        {/* Two-Day Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Day One */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                1
              </div>
              <h2 className="text-2xl font-bold text-white">Day One: Exterior Perfection</h2>
            </div>
            <p className="text-blue-200 mb-6">
              Focus on exterior restoration, paint correction, and protection
            </p>
            <div className="space-y-3">
              {dayOneServices.map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">{service}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Day Two */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-yellow-500/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-black text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                2
              </div>
              <h2 className="text-2xl font-bold text-white">Day Two: Interior Excellence</h2>
            </div>
            <p className="text-blue-200 mb-6">
              Complete interior restoration and final exterior finishing
            </p>
            <div className="space-y-3">
              {dayTwoServices.map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">{service}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Features */}
        <Card className="bg-gradient-to-br from-green-900/20 to-slate-900/50 border-2 border-green-500/30 p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-green-400" />
            Additional Features & Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Perfect For */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900/50 border-2 border-purple-500/30 p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perfectFor.map((use, index) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">{use}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Guarantee Section */}
        <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 p-8 mb-12">
          <div className="text-center">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Ultimate Guarantee
            </h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              We stand behind our Ultimate Detail Package with a 90-day protection guarantee on the exterior finish. 
              If you're not completely satisfied with the results, we'll make it right. This is our commitment to 
              excellence and your complete satisfaction.
            </p>
          </div>
        </Card>

        {/* Booking Form */}
        <div id="booking">
          <BookingForm 
            serviceName={ultimatePackage.name}
            servicePrice={ultimatePackage.price}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-red-900/30 to-blue-900/30 border-2 border-yellow-500/40 p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Prepaid Card Holders Save More!
            </h3>
            <p className="text-blue-200 mb-4">
              Members get special pricing on the Ultimate Detail
            </p>
            <Button
              onClick={() => navigate("/", { state: { scrollTo: "membership" } })}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white w-full"
            >
              Learn About Membership
            </Button>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border-2 border-blue-500/40 p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Have Questions?
            </h3>
            <p className="text-blue-200 mb-4">
              Call us to discuss your vehicle's specific needs
            </p>
            <Button
              variant="outline"
              onClick={() => window.open('tel:610-695-0711')}
              className="border-2 border-blue-400 text-blue-100 hover:bg-blue-500/20 w-full"
            >
              Call 610-695-0711
            </Button>
          </Card>
        </div>

        {/* Pickup & Delivery Notice */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6 inline-block">
            <p className="text-blue-200 text-lg">
              <Clock className="w-5 h-5 inline mr-2 text-yellow-400" />
              <strong className="text-white">Pickup and delivery service included</strong> - We'll come to you!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
