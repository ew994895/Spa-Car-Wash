import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://spacarwash.com/wp-content/uploads/2024/10/banner-02-1920x1080.jpg"
          alt="Spa Car Wash - Premium Car Detailing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-slate-900/85 to-red-950/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <span className="text-yellow-400 uppercase tracking-wider text-sm font-medium">
            Main Line's Original Full-Service Wash & Detail Studio
          </span>
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Berwyn's Trusted
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-red-400 bg-clip-text text-transparent">
            {" "}Car Wash & Detail Team
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
          Family-owned since 1985, Spa Car Wash pairs tunnel efficiency with white-glove detailing so Main Line vehicles leave spotless, protected, and ready for the road—no appointment needed for washes, detailing by reservation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection("packages")}
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-2xl shadow-red-500/30 text-lg px-8 py-6 group"
          >
            See Wash Menu
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => scrollToSection("membership")}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white shadow-2xl shadow-yellow-500/30 text-lg px-8 py-6 font-semibold"
          >
            Buy Prepaid Washes
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">1985</div>
            <div className="text-blue-200 text-sm">Year Spa Car Wash Opened</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-blue-200 text-sm">Vehicles Cared For Annually</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">7</div>
            <div className="text-blue-200 text-sm">Day-A-Week Service*</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">5★</div>
            <div className="text-blue-200 text-sm">Rated Across Main Line Reviews</div>
          </div>
        </div>
        <p className="text-xs text-blue-300 mt-4">*Weather permitting. Detailing by appointment.</p>
      </div>
    </section>
  );
}
