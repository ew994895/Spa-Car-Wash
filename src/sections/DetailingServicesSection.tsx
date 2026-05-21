import { Sparkles, Star, Car, Droplet, Shield, Plus, Check, Package } from "lucide-react";
import { useState } from "react";
import { navigateTo } from "@/app/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WaitTimeDisplay } from "@/features/wait-times/WaitTimeDisplay";

const detailingPackages = [
  {
    id: "handwash",
    name: "Hand Wash",
    price: "$60–$80",
    priceNote: "Sedans $60 | SUVs $80",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80",
    description: "Experience the ultimate attention to detail with our premium Hand Wash service. Every step is performed by hand in our detail bay - never through the tunnel. Your vehicle receives the personal touch it deserves with meticulous care from start to finish.",
    features: [
      "✨ Soft cloth hand wash (no tunnel)",
      "💨 Compressed air for door hinges & tight spaces",
      "🧽 Interior vacuum & complete wipe down",
      "🪟 Interior window cleaning",
      "🛞 Wheel blast & tire shine",
      "💧 Undercarriage wash",
      "🤲 Hand towel dry (no air dryers)",
    ],
    isPremium: true,
    isFeatured: true,
    note: "Appointments recommended on weekends. Call 610-695-0711 for live availability—our team will confirm wait times before you arrive.",
  },
  {
    id: "exterior",
    name: "Exterior Detail",
    price: "$200–$260",
    priceNote: "Sedans $200-$220 | SUVs & Trucks $240-$260",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-23.jpg",
    description: "Focuses on the outside finish of your automobile and is designed to clean and protect painted surfaces from harsh environmental conditions.",
    features: [
      "Hand wash & clay bar treatment",
      "Paint correction & buffing",
      "Premium wax or sealant",
      "Wheel & tire detailing",
      "Chrome & trim restoration",
    ],
    isPremium: true,
    note: "Appointment only. We'll confirm timing and finish expectations when you submit a request.",
  },
  {
    id: "interior",
    name: "Interior Detail",
    price: "$220–$280",
    priceNote: "Sedans $220-$224 | SUVs & Trucks $260-$280",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-18.jpg",
    description: "Designed to clean and freshen up the interior of your automobile.",
    features: [
      "Deep vacuum & steam cleaning",
      "Leather conditioning",
      "Dashboard & console detail",
      "Window & mirror cleaning",
      "Air freshening treatment",
    ],
    isPremium: true,
    note: "Appointment only. Let us know about spills or odors so we can allocate extra time if needed.",
  },
  {
    id: "mini",
    name: "Mini Detail",
    price: "$160–$200",
    priceNote: "Sedans $160 | SUVs & Trucks $200",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-17.jpg",
    description: "Designed as a seasonal freshen up between more intensive details. Also oriented towards later model cars (3 years old or newer) whose exterior and interior has been maintained regularly through our tunnel.",
    features: [
      "Express interior cleaning",
      "Quick exterior polish",
      "Tire shine & wheel clean",
      "Interior vacuum",
      "Window cleaning",
    ],
    isPremium: true,
    note: "Often available while you wait (2–4 hours). Call ahead so we can stage a bay for you.",
  },
  {
    id: "signature",
    name: "Signature Complete",
    price: "$320–$380",
    priceNote: "Sedans $320-$340 | SUVs & Trucks $360-$380",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-08.jpg",
    description: "Spa's most popular detailing service designed around the needs of our frequent customers who seek to maintain the condition of their late model automobile.",
    features: [
      "Complete interior & exterior detail",
      "Premium cleaning products",
      "Thorough vacuum & wipe down",
      "Paint protection",
      "Professional results",
    ],
    isPremium: true,
    isMostPopular: true,
    note: "All-day appointment with pickup/drop-off reminders provided once scheduled.",
  },
  {
    id: "rejuvenate",
    name: "Rejuvenate Detail",
    price: "$360–$420",
    priceNote: "Sedans $360-$380 | SUVs & Trucks $400-$420",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-25.jpg",
    description: "A service offered to discriminating owners of high end automobiles who are seeking to revive the cosmetic feel & finish of their vehicle.",
    features: [
      "Premium restoration service",
      "High-end vehicle specialist",
      "Cosmetic rejuvenation",
      "Paint & interior revival",
      "Luxury treatment",
    ],
    isPremium: true,
    note: "All-day appointment focused on high-end finishes. We'll discuss paint condition in advance.",
  },
  {
    id: "cleanse",
    name: "Cleanse Detail",
    price: "$475–$550",
    priceNote: "Sedans $475-$500 | SUVs & Trucks $525-$550",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-20.jpg",
    description: "Designed for those owners seeking a thorough, deep cleaning of their automobile focusing primarily on the interior finishes and passenger environment.",
    features: [
      "Deep interior restoration",
      "Passenger environment focus",
      "Thorough cleaning service",
      "Premium interior products",
      "Comprehensive detail",
    ],
    isPremium: true,
    note: "All-day appointment with pickup and delivery included. Pricing finalized after a quick walk-through.",
  },
  {
    id: "ultimate",
    name: "Ultimate Detail",
    price: "$750–$875",
    priceNote: "Sedans $750-$800 | SUVs & Trucks $825-$875",
    image: "https://spacarwash.com/wp-content/uploads/2024/10/spa-gallery-19.jpg",
    description: "Spa's Ultimate Detail Package is our ultra-premium two-day makeover service that transforms your vehicle inside and out, regardless of its own condition.",
    features: [
      "Two-day premium service",
      "Complete transformation",
      "Interior & exterior perfection",
      "Any condition accepted",
      "Ultimate results guaranteed",
    ],
    isPremium: false,
    isUltimate: true,
    highlight: "ULTIMATE PACKAGE",
    note: "Two-day appointment with concierge pickup/drop-off. We'll build a custom timeline after inspecting the vehicle.",
  },
];

const additionalServices = [
  {
    id: "road-paint",
    name: "Road Paint Removal",
    price: "Starting at $125 per side",
    icon: "🎨",
    description: "Professional removal of road paint and marking overspray",
  },
  {
    id: "headlight",
    name: "Headlight Restoration",
    price: "$69 For Both",
    icon: "💡",
    description: "Restore clarity and brightness to cloudy headlights",
  },
  {
    id: "hand-wax",
    name: "Hand Wax",
    price: "Sedan $100 | SUV $120",
    icon: "✨",
    description: "Premium hand-applied wax for deep shine and protection",
  },
  {
    id: "water-damage",
    name: "Water Damage/Drying",
    price: "Quoted",
    icon: "💧",
    description: "Water extraction and drying for flood or leak damage",
  },
  {
    id: "leather-treatment",
    name: "Leather Treatment",
    price: "$45",
    icon: "🛋️",
    description: "Conditioning and protection for leather surfaces",
  },
  {
    id: "engine-detail",
    name: "Engine Detail",
    price: "$59",
    icon: "⚙️",
    description: "Thorough cleaning and dressing of engine bay",
  },
  {
    id: "clay-wax",
    name: "Clay & Wax",
    price: "Sedan $110 | SUV $130",
    icon: "🧽",
    description: "Clay bar treatment followed by premium wax",
  },
  {
    id: "ozone",
    name: "Ozone Treatment",
    price: "$15/Hr.",
    icon: "🌬️",
    description: "Eliminate odors and bacteria with ozone treatment",
  },
  {
    id: "wet-sanding",
    name: "Wet Sanding",
    price: "Quoted",
    icon: "🔨",
    description: "Paint correction for severe imperfections",
  },
  {
    id: "seat-shampoo",
    name: "Seat Shampoo",
    price: "$30/seat",
    icon: "🪑",
    description: "Deep cleaning and stain removal for individual seats",
  },
  {
    id: "tree-sap",
    name: "Tree Sap Removal",
    price: "Quoted",
    icon: "🌲",
    description: "Safe removal of tree sap and sticky residue",
  },
  {
    id: "bumper-pops",
    name: "Bumper Pops",
    price: "$30-$75",
    icon: "🔧",
    description: "Repair and reattachment of bumper clips and fasteners",
  },
  {
    id: "window-tint",
    name: "Window Tinting",
    price: "Quoted",
    icon: "🪟",
    description: "Professional window tinting installation",
  },
  {
    id: "sand-removal",
    name: "Sand Removal",
    price: "$25 & Up",
    icon: "🏖️",
    description: "Thorough removal of sand from interior",
  },
  {
    id: "pet-hair",
    name: "Pet Hair Removal",
    price: "Quoted",
    icon: "🐕",
    description: "Complete removal of pet hair from all surfaces",
  },
];

export function DetailingServicesSection() {
  const [activeTab, setActiveTab] = useState<'packages' | 'additional'>('packages');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handlePackageClick = (service: typeof detailingPackages[0]) => {
    if (service.isUltimate) {
      navigateTo("/ultimate-detailing");
    } else if (service.isPremium) {
      navigateTo(`/premium-detailing?package=${service.id}`);
    }
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <section id="detailing" className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 uppercase tracking-wider text-sm font-medium">
              Premium Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Detailing Services
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Expert care that goes beyond a regular wash - by appointment only
          </p>
        </div>

        {/* Wait Time Display */}
        <div className="mb-12">
          <WaitTimeDisplay />
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-800/50 border-2 border-blue-500/30 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'packages'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-5 h-5 inline mr-2" />
              Detail Packages
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'additional'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Additional Services
            </button>
          </div>
        </div>

        {/* Detail Packages Tab */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {detailingPackages.map((service, index) => (
              <Card
                key={index}
                className={`overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 ${
                  service.isFeatured
                    ? "border-green-500/50 ring-4 ring-green-500/30 shadow-2xl shadow-green-500/20"
                    : service.isMostPopular
                    ? "border-blue-500/50 ring-4 ring-blue-500/30 shadow-2xl shadow-blue-500/20"
                    : service.highlight 
                    ? "border-yellow-500/50 ring-4 ring-yellow-500/30 shadow-2xl shadow-yellow-500/20" 
                    : "border-yellow-500/30"
                } hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 group`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  <div className={`absolute top-4 right-4 bg-gradient-to-r ${
                    service.isFeatured
                      ? "from-green-500 to-green-600"
                      : service.isMostPopular
                      ? "from-blue-500 to-blue-600"
                      : "from-yellow-500 to-yellow-600"
                  } text-black px-4 py-2 rounded-full font-bold shadow-lg text-sm`}>
                    <Star className="w-4 h-4 inline mr-1" />
                    {service.isFeatured ? "FEATURED" : service.isMostPopular ? "MOST POPULAR" : service.highlight || "Premium"}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-yellow-400">{service.price}</div>
                    <div className="text-sm text-blue-300">{service.priceNote}</div>
                  </div>

                  <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-100 text-sm">
                        <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {service.note && (
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 mb-4">
                      <p className="text-blue-200 text-xs leading-relaxed">{service.note}</p>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold shadow-lg"
                    onClick={() => handlePackageClick(service)}
                  >
                    View Package Details
                  </Button>
               </div>
             </Card>
           ))}
          </div>
        )}

        {/* Additional Services Tab */}
        {activeTab === 'additional' && (
          <>
            {selectedServices.length > 0 && (
              <div className="mb-8 bg-gradient-to-r from-green-900/40 to-blue-900/40 border-2 border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Check className="w-6 h-6 text-green-400" />
                  Selected Services ({selectedServices.length})
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedServices.map(serviceId => {
                    const service = additionalServices.find(s => s.id === serviceId);
                    return service ? (
                      <span key={serviceId} className="bg-green-500/20 border border-green-500/30 text-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {service.icon} {service.name} - {service.price}
                        <button onClick={() => toggleService(serviceId)} className="hover:text-red-400">✕</button>
                      </span>
                    ) : null;
                  })}
                </div>
                <p className="text-blue-200 text-sm mb-3">
                  Ready to book these services? Call us at <a href="tel:610-695-0711" className="text-green-400 font-bold hover:underline">610-695-0711</a> or book an appointment to add these to your detail package.
                </p>
                <Button
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold"
                  onClick={() => navigateTo("/premium-detailing")}
                >
                  Book Detail Appointment
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {additionalServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <Card
                    key={service.id}
                    className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 ${
                      isSelected 
                        ? 'border-green-500/50 ring-2 ring-green-500/30' 
                        : 'border-slate-600/30 hover:border-blue-500/50'
                    } transition-all duration-300 cursor-pointer`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{service.icon}</div>
                        <button
                          className={`p-2 rounded-full transition-all ${
                            isSelected 
                              ? 'bg-green-500 text-white' 
                              : 'bg-slate-700 text-slate-400 hover:bg-blue-500 hover:text-white'
                          }`}
                        >
                          {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </button>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                      <div className="text-2xl font-bold text-yellow-400 mb-3">{service.price}</div>
                      <p className="text-blue-200 text-sm">{service.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Info Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Expert Technicians</h4>
              <p className="text-blue-200">Trained professionals with years of experience</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-4">
                <Droplet className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Premium Products</h4>
              <p className="text-blue-200">Only the highest quality detailing products</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Satisfaction Guaranteed</h4>
              <p className="text-blue-200">We stand behind our work 100%</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-blue-200 mb-4 text-lg">
              Most detailing packages are priced based on vehicle size and condition
            </p>
            <Button
              variant="outline"
              className="border-2 border-blue-400 text-blue-100 hover:bg-blue-500/20"
              onClick={() => window.open('tel:610-695-0711')}
            >
              Call for Custom Quote: 610-695-0711
            </Button>
          </div>
        </div>

        {/* Prepaid Card Discount Callout */}
        <div className="mt-12 bg-gradient-to-r from-red-900/40 to-blue-900/40 border-2 border-yellow-500/40 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Save Even More with Prepaid Wash Cards!
          </h3>
          <p className="text-blue-200 mb-4">
            Prepaid card holders get special pricing on all detailing services
          </p>
          <Button
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
            onClick={() => {
              const element = document.getElementById("membership");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn About Prepaid Cards
          </Button>
        </div>
      </div>
    </section>
  );
}
