import { Check, Crown, Sparkles, Zap, Gift, TrendingUp, CreditCard, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const savingsLevels = [
  {
    washes: 5,
    payFor: 4,
    discount: "20%",
    badge: "Good Value",
    color: "from-blue-600 to-blue-700",
    borderColor: "border-blue-500/30",
    savings: "Get 1 FREE wash",
    description: "Pay for 4 washes, get 5 on your card",
  },
  {
    washes: 10,
    payFor: 7.5,
    discount: "25%",
    badge: "Better Value",
    color: "from-green-600 to-green-700",
    borderColor: "border-green-500/30",
    savings: "Get 2.5 FREE washes",
    description: "Pay for 7.5 washes, get 10 on your card",
  },
  {
    washes: 18,
    payFor: 12,
    discount: "33%",
    badge: "BEST VALUE!",
    color: "from-yellow-600 to-yellow-700",
    borderColor: "border-yellow-500/50",
    savings: "Get 6 FREE washes",
    description: "Pay for 12 washes, get 18 on your card",
    isPremium: true,
    highlight: "2 FREE washes for every 4 you buy!",
  },
];

const cardTypes = [
  { name: "Exterior Card", features: ["Softcloth Wash", "Wheel Blast", "Spot Free Rinse", "Hand Towel Dry"] },
  { name: "Full Service Card", features: ["Interior Vacuum", "Softcloth Wash", "Wheel Blast", "Spot Free Rinse", "Interior Window Clean", "Hand Towel Dry"] },
  { name: "RITZ Cleanse Card", features: ["All Full Service Features", "Undercarriage Wash", "Polyglaze", "Tire Shine", "+ Optional Rain-X or Wheel Detail"] },
  { name: "Real Works Card", features: ["All RITZ Features", "Triple Foam Polish", "+ Optional Rain-X or Wheel Detail"] },
  { name: "Signature ELITE Card", features: ["All Real Works Features", "Rain-X", "Clean Dashboard", "Compressed Air Blow Out", "Clean Console", "Extra Vacuuming", "Interior Wipedown"] },
];

export function Membership() {
  return (
    <section id="membership" className="py-20 bg-gradient-to-br from-red-950 via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 uppercase tracking-widest text-sm font-bold">
              Smart Savings For Frequent Washers
            </span>
            <CreditCard className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Prepaid Wash Cards
          </h2>
          <p className="text-2xl text-blue-200 max-w-3xl mx-auto mb-4">
            Load washes onto a DRB prepaid card, share it with the household, and lock in up to <span className="text-yellow-400 font-bold">33% savings</span> every time you roll through the tunnel.
          </p>
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-lg font-bold">
            Weather-permitting • Usable on any wash the same day you buy
          </div>
        </div>

        {/* Savings Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {savingsLevels.map((level, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden border-2 ${level.borderColor} ${
                level.isPremium
                  ? "bg-gradient-to-br from-yellow-900/40 via-slate-900/90 to-yellow-950/40 shadow-2xl shadow-yellow-500/20 ring-4 ring-yellow-500/30 transform scale-105 hover:scale-110"
                  : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:shadow-xl hover:scale-105"
              } transition-all duration-300`}
            >
              <div className={`absolute top-0 right-0 bg-gradient-to-r ${level.color} text-white px-4 py-1 text-sm font-bold rounded-bl-lg shadow-lg`}>
                {level.isPremium && <Crown className="w-4 h-4 inline mr-1" />}
                {level.badge}
              </div>

              <div className="p-8 pt-12">
                <div className="text-center mb-6">
                  <div className={`inline-block text-7xl font-black ${level.isPremium ? "text-yellow-300" : "text-white"} mb-2`}>
                    {level.discount}
                  </div>
                  <div className={`text-xl ${level.isPremium ? "text-yellow-400" : "text-blue-300"} mb-4`}>
                    Discount
                  </div>

                  <div className={`text-4xl font-bold ${level.isPremium ? "text-white" : "text-white"} mb-2`}>
                    {level.washes} Washes
                  </div>
                  <div className="text-blue-200 text-lg mb-4">
                    Pay for only <span className="font-bold text-white">{level.payFor}</span> washes
                  </div>

                  <div className={`bg-gradient-to-r ${level.color} text-white px-4 py-3 rounded-lg font-bold text-lg mb-4`}>
                    {level.savings}
                  </div>

                  {level.highlight && (
                    <div className="bg-yellow-500/20 border-2 border-yellow-400/50 text-yellow-300 px-4 py-2 rounded-lg font-semibold text-sm mb-4 animate-pulse">
                      ⚡ {level.highlight}
                    </div>
                  )}
                </div>

                <p className="text-center text-blue-100 mb-6">
                  {level.description}
                </p>

                <Button
                  className={`w-full ${
                    level.isPremium
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold shadow-xl shadow-yellow-500/30 text-lg py-6"
                      : `bg-gradient-to-r ${level.color} hover:opacity-90 text-white py-6`
                  }`}
                  onClick={() => window.open('https://websiteconnect.drb.com/spacarwash/BUY-A-PREPAID', '_blank')}
                >
                  {level.isPremium ? "Activate Best Value Card" : "Purchase Pack"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Card Types */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Choose Your Prepaid Card Type
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardTypes.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-blue-500/20 rounded-lg p-6 hover:border-blue-400/40 transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-white mb-4">{card.name}</h4>
                <ul className="space-y-2">
                  {card.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-blue-100">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-200 mb-2">
              Apply your prepaid card savings to any wash package on the menu.
            </p>
            <p className="text-blue-300 text-sm">
              Questions? Call 610-695-0711 or stop by our cashier and we'll load the card for you.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Prepaid Cards?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Instant Savings</h4>
              <p className="text-blue-200">Save up to 33% on every wash</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No Expiration</h4>
              <p className="text-blue-200">Use your washes at your own pace</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Perfect Gifts</h4>
              <p className="text-blue-200">Great for friends and family</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Easy to Use</h4>
              <p className="text-blue-200">Simply present at checkout</p>
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-2 border-blue-500/30 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-white text-center mb-6">
            Convenient Delivery Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Mail Delivery</h4>
                <p className="text-blue-200">
                  Choose to have your prepaid card mailed directly to your home or business
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">In-Store Pickup</h4>
                <p className="text-blue-200">
                  Pick up your card on-site at our Berwyn location - ready when you are!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-2xl text-white mb-6">
            Start saving today with our <span className="text-yellow-400 font-bold">33% discount!</span>
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-500/30 text-xl px-12 py-8"
            onClick={() => window.open('https://websiteconnect.drb.com/spacarwash/BUY-A-PREPAID', '_blank')}
          >
            Buy Prepaid Card Now →
          </Button>
          <p className="text-blue-300 mt-4 text-sm">
            Valid for all wash packages • Perfect for gifts • No expiration date
          </p>
        </div>
      </div>
    </section>
  );
}
