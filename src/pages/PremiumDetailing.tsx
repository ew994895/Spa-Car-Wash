import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookingForm } from "@/features/booking/BookingForm";

const premiumPackages = [
  {
    id: "exterior",
    name: "Exterior Detail Package",
    price: "$200–$260",
    priceBreakdown: "Sedans $200-$220 | SUVs & Trucks $240-$260",
    serviceTime: "All Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-23.jpg",
    description: "Focuses on the exterior finish, including wheels and wheel wells, and protects painted surfaces from environmental damage. Appointment only.",
    detailedIncludes: [
      "Complete hand wash with premium soap",
      "Clay bar treatment to remove bonded contaminants",
      "Paint inspection and correction",
      "Multi-stage buffing and polishing",
      "Premium carnauba wax or synthetic sealant application",
      "Wheel and tire deep cleaning",
      "Wheel wells thoroughly cleaned",
      "Chrome and trim restoration and polishing",
      "Tire dressing application",
      "Exterior glass cleaning and treatment",
      "Door jambs cleaned and dressed",
      "Gas cap area detailed",
      "Final inspection and touch-ups",
    ],
    benefits: [
      "Protection from UV rays, acid rain, and environmental damage",
      "Enhanced paint depth and shine",
      "Improved resale value",
      "Long-lasting protection (3-6 months depending on conditions)",
      "Professional showroom finish",
    ],
  },
  {
    id: "interior",
    name: "Interior Detail Package",
    price: "$220–$280",
    priceBreakdown: "Sedans $220-$224 | SUVs & Trucks $260-$280",
    serviceTime: "All Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-18.jpg",
    description: "Cleans and freshens the entire interior. Appointment only. Unusual spills, odors, or conditions may require additional time and cost.",
    detailedIncludes: [
      "Complete vacuum of all surfaces including seats, carpets, floor mats",
      "Steam cleaning of cloth seats and carpets",
      "Leather seat cleaning and conditioning",
      "Dashboard, console, and door panel detailed cleaning",
      "Center console deep cleaning including cup holders",
      "All interior plastics cleaned and dressed",
      "Interior windows and mirrors streak-free cleaning",
      "Door jambs and sills cleaned",
      "Air vents thoroughly cleaned",
      "Headliner spot cleaning",
      "Trunk/cargo area vacuumed and cleaned",
      "Floor mat deep cleaning or shampooing",
      "Air freshening treatment",
      "Final inspection",
    ],
    benefits: [
      "Healthier cabin environment",
      "Removal of allergens and bacteria",
      "Fresh, clean scent",
      "Protection for leather and vinyl surfaces",
      "Improved driver and passenger comfort",
    ],
  },
  {
    id: "mini",
    name: "Mini Detail Package",
    price: "$160–$200",
    priceBreakdown: "Sedans $160 | SUVs & Trucks $200",
    serviceTime: "2-4 Hour Service (Often While-U-Wait)",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-17.jpg",
    description: "Seasonal freshen-up between major details. Best for later-model vehicles (3 years old or newer) that are regularly maintained through our tunnel. Can often be done on an as-you-wait basis.",
    detailedIncludes: [
      "Express hand wash",
      "Quick clay bar treatment on problem areas",
      "Single-stage polish application",
      "Express wax for protection",
      "Interior vacuum (all surfaces)",
      "Dashboard and console quick detail",
      "Interior windows cleaned",
      "Tire shine application",
      "Wheel cleaning",
      "Exterior glass cleaning",
      "Door jambs wiped down",
      "Air freshener application",
    ],
    benefits: [
      "Quick turnaround time",
      "Maintain your vehicle between full details",
      "Cost-effective maintenance solution",
      "Often available while you wait",
      "Perfect for newer vehicles",
    ],
  },
  {
    id: "signature",
    name: "Signature Complete Detail Package",
    price: "$320–$380",
    priceBreakdown: "Sedans $320-$340 | SUVs & Trucks $360-$380",
    serviceTime: "All Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-08.jpg",
    description: "Spa's most popular detailing service designed around the needs of our frequent customers who seek to maintain the condition of their late model automobile.",
    detailedIncludes: [
      "Complete exterior detail (all exterior services)",
      "Complete interior detail (all interior services)",
      "Hand wash with premium products",
      "Clay bar treatment",
      "Paint correction and polishing",
      "Premium wax application",
      "Full interior vacuum and steam cleaning",
      "Leather conditioning treatment",
      "Dashboard and console deep detail",
      "All windows cleaned inside and out",
      "Wheel and tire detailing",
      "Chrome restoration",
      "Door jambs and gas cap area",
      "Air freshening treatment",
      "Final quality inspection",
    ],
    benefits: [
      "Complete transformation inside and out",
      "Best value for full-service detailing",
      "Most popular package among our customers",
      "Comprehensive protection and cleaning",
      "Professional results guaranteed",
    ],
  },
  {
    id: "rejuvenate",
    name: "Rejuvenate Detail Package",
    price: "$360–$420",
    priceBreakdown: "Sedans $360-$380 | SUVs & Trucks $400-$420",
    serviceTime: "All Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-25.jpg",
    description: "Designed for high-end automobiles to revive and enhance the cosmetic feel and finish of the vehicle.",
    detailedIncludes: [
      "All Signature Complete services included",
      "Enhanced multi-stage paint correction",
      "Premium compound and polish application",
      "High-end carnauba wax or ceramic coating prep",
      "Leather deep conditioning and protection",
      "Premium interior protectant application",
      "Engine bay cosmetic detailing (if applicable)",
      "Headlight restoration (if needed)",
      "Advanced stain removal treatment",
      "Pet hair removal (if needed)",
      "Odor elimination treatment",
      "All trim pieces detailed separately",
      "Convertible top cleaning (if applicable)",
      "Extended quality control inspection",
    ],
    benefits: [
      "Designed specifically for luxury and high-end vehicles",
      "Restores vehicle's cosmetic appeal",
      "Enhanced protection for premium finishes",
      "Attention to detail for discerning owners",
      "Revives and maintains vehicle value",
    ],
  },
  {
    id: "cleanse",
    name: "Cleanse Detail Package",
    price: "$475–$550",
    priceBreakdown: "Sedans $475-$500 | SUVs & Trucks $525-$550",
    serviceTime: "All Day Service",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-20.jpg",
    description: "Deep cleaning focused primarily on the interior finishes and passenger environment. This exclusive service will restore the pleasure of your automobile's interior environment. Includes pickup and delivery.",
    detailedIncludes: [
      "Complete deep interior restoration",
      "Hot water extraction of all carpets and cloth seats",
      "Premium leather cleaning and multi-stage conditioning",
      "Dashboard, console, and all plastics deep cleaned",
      "Steam cleaning of all hard surfaces",
      "Door panels completely detailed",
      "Headliner deep cleaning",
      "All crevices and vents thoroughly cleaned",
      "Trunk/cargo area complete detailing",
      "Floor mats deep cleaned or replaced (if needed)",
      "Pet hair complete removal",
      "Odor elimination with ozone treatment",
      "Bacteria and allergen removal",
      "UV protectant on all surfaces",
      "Pickup and delivery service included",
      "Exterior hand wash and quick detail",
      "Extended quality inspection",
    ],
    benefits: [
      "Focus on interior passenger environment",
      "Deep cleaning for heavily used vehicles",
      "Removal of embedded dirt and stains",
      "Ideal for families with children or pets",
      "Convenience of pickup and delivery",
      "Healthier cabin environment",
    ],
  },
];

export function PremiumDetailing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package") || "exterior";
  
  const selectedPackage = premiumPackages.find(pkg => pkg.id === packageId) || premiumPackages[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 border-b-2 border-blue-500/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-blue-400 text-blue-100 hover:bg-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Package Selector */}
      <section className="py-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Select a Premium Package</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {premiumPackages.map((pkg) => (
              <Button
                key={pkg.id}
                onClick={() => navigate(`/premium-detailing?package=${pkg.id}`)}
                className={pkg.id === packageId 
                  ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold"
                  : "bg-slate-700 text-blue-100 hover:bg-slate-600"
                }
              >
                {pkg.name.replace(" Package", "")}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Package Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 uppercase tracking-wider text-sm font-medium">
              Premium Service
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {selectedPackage.name}
          </h1>
          <p className="text-3xl font-bold text-yellow-400 mb-2">
            {selectedPackage.price}
          </p>
          <p className="text-blue-200 mb-4">{selectedPackage.priceBreakdown}</p>
          <p className="text-blue-300 text-lg">{selectedPackage.serviceTime}</p>
        </div>

        {/* Package Image */}
        <div className="mb-12">
          <Card className="overflow-hidden border-2 border-yellow-500/30">
            <img
              src={selectedPackage.image}
              alt={selectedPackage.name}
              className="w-full h-96 object-cover"
            />
          </Card>
        </div>

        {/* Description */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            {selectedPackage.description}
          </p>
        </Card>

        {/* What's Included */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPackage.detailedIncludes.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Benefits */}
        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border-2 border-yellow-500/30 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Key Benefits</h2>
          <div className="space-y-3">
            {selectedPackage.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-blue-100 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Booking Form */}
        <div id="booking">
          <BookingForm 
            serviceName={selectedPackage.name}
            servicePrice={selectedPackage.price}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-900/30 to-blue-900/30 border-2 border-yellow-500/40 p-8 inline-block">
            <h3 className="text-xl font-bold text-white mb-2">
              Prepaid Card Holders Save More!
            </h3>
            <p className="text-blue-200 mb-4">
              Members get special pricing on all detailing services
            </p>
            <Button
              onClick={() => navigate("/", { state: { scrollTo: "membership" } })}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
            >
              Learn About Membership
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
