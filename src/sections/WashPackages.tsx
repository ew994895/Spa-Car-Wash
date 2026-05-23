import { Check, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const packages = [
  {
    id: 1,
    name: "Basic Full Service",
    number: "#1",
    price: "$27.99",
    color: "from-blue-600 to-blue-700",
    borderColor: "border-blue-500/30",
    features: [
      "Interior Vacuum",
      "Softcloth Wash",
      "Wheel Blast",
      "Spot Free Rinse",
      "Interior Window Clean",
      "Hand Towel Dry",
    ],
    isPremium: false,
    description: "Quick tunnel wash with a light interior spruce-up—perfect for weekly upkeep.",
  },
  {
    id: 2,
    name: "RITZ Cleanse",
    number: "#2",
    price: "$33.99",
    color: "from-emerald-600 to-emerald-700",
    borderColor: "border-emerald-500/30",
    features: [
      "Interior vacuum & dash wipe down",
      "Soft-cloth wash + wheel blast",
      "Spot-free rinse & hand dry",
      "Interior glass cleaned",
      "Undercarriage flush",
      "Tire shine & exterior dressing",
    ],
    description: "Adds undercarriage protection and a glossy tire finish to our full-service wash.",
    isPremium: false,
  },
  {
    id: 3,
    name: "Real Works",
    number: "#3",
    price: "$36.99",
    color: "from-orange-600 to-orange-700",
    borderColor: "border-orange-500/30",
    features: [
      "Interior vacuum + quick detail",
      "Soft-cloth wash with double soap pass",
      "Wheel blast + tire dressing",
      "Spot-free rinse & hand towel dry",
      "Interior glass cleaned",
      "Undercarriage wash & rust inhibitor",
      "Triple-foam polish & sealer",
    ],
    description: "Our tunnel's complete package with triple foam polish for added gloss and protection.",
    isPremium: false,
  },
  {
    id: 4,
    name: "Signature Elite",
    number: "#4",
    price: "$55.99",
    color: "from-red-600 to-red-700",
    borderColor: "border-red-500/30",
    badge: "Most Popular",
    features: [
      "Interior vacuum including cargo area",
      "Soft-cloth wash + wheel blast",
      "Spot-free rinse, hand towel & air dry",
      "Interior glass crystal clear",
      "Undercarriage wash & tire dressing",
      "Triple foam polish & Lustre Shield",
      "Dashboard/console wiped and dressed",
      "Compressed air blowout for vents",
      "Extra vacuum passes + mat cleaning",
      "Wheel faces hand detailed",
    ],
    description: "Adds interior wipe-down, Rain-X style sealant, and intensive vacuuming—our staff favorite for daily drivers.",
    isPremium: false,
  },
  {
    id: 5,
    name: "Elite Platinum",
    number: "#5",
    price: "$89.99",
    color: "from-slate-700 via-slate-600 to-slate-700",
    borderColor: "border-yellow-500/50",
    badge: "Ultimate Package",
    features: [
      "Interior vacuum + mat shampoo on request",
      "Soft-cloth wash with lubrication & foam",
      "Hand towel dry with microfiber microfibers",
      "Undercarriage wash & rust inhibitor",
      "Wheel faces & barrels hand detailed",
      "Triple foam polish + Lustre Shield",
      "Dashboard/console dressed & conditioned",
      "Compressed air blowout for seams",
      "Tire dressing + exterior plastic revive",
      "Express hand wax for added protection",
    ],
    description: "Our concierge wash—includes a hand-applied express wax and extra interior attention for showroom-ready results.",
    isPremium: true,
  },
];

export function WashPackages() {
  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Wash Packages
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Choose the perfect level of care for your vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden border-2 ${pkg.borderColor} ${
                pkg.isPremium
                  ? "bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-black/90 shadow-2xl shadow-yellow-500/20 ring-4 ring-yellow-500/30 transform hover:scale-105"
                  : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:shadow-xl"
              } transition-all duration-300`}
            >
              {pkg.badge && (
                <div className={`absolute top-0 right-0 ${
                  pkg.isPremium 
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600" 
                    : "bg-gradient-to-r from-red-600 to-red-700"
                } text-white px-4 py-1 text-sm font-bold rounded-bl-lg shadow-lg`}>
                  {pkg.isPremium && <Crown className="w-4 h-4 inline mr-1" />}
                  {pkg.badge}
                </div>
              )}

              <div className={`p-6 ${pkg.isPremium ? "pt-8" : ""}`}>
                <div className={`inline-block bg-gradient-to-r ${pkg.color} text-white px-4 py-1 rounded-full text-sm font-bold mb-4`}>
                  {pkg.number}
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${
                  pkg.isPremium ? "text-yellow-300" : "text-white"
                }`}>
                  {pkg.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`text-5xl font-bold ${
                    pkg.isPremium ? "text-yellow-400" : "text-white"
                  }`}>
                    {pkg.price}
                  </span>
                  {pkg.isPremium && (
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  )}
                </div>

                {pkg.description && (
                  <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                    {pkg.description}
                  </p>
                )}

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-blue-100">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        pkg.isPremium ? "text-yellow-400" : "text-green-400"
                      }`} />
                      <span className={pkg.isPremium ? "font-medium" : ""}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.isPremium
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold shadow-xl shadow-yellow-500/30"
                      : `bg-gradient-to-r ${pkg.color} hover:opacity-90`
                  } text-white`}
                >
                  {pkg.isPremium ? "Reserve Elite Treatment" : "Plan This Wash"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-300 mb-4">
            Not sure which package is right for you? Our team is here to help!
          </p>
          <Button
            variant="outline"
            className="border-2 border-blue-400 text-blue-100 hover:bg-blue-500/20"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
