import { Award, Heart, Leaf, Users } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted Since 1985
            </h2>
            <p className="text-xl text-blue-200 mb-6">
              For over 35 years, Spa Car Wash & Detailing Center has been providing 
              the Philadelphia area with exceptional car care services. We combine 
              modern technology with old-fashioned customer service to deliver 
              results that exceed expectations.
            </p>
            <p className="text-lg text-blue-200 mb-8">
              Our state-of-the-art facility in Berwyn, PA serves customers from 
              across the Main Line and beyond. Whether you need a quick wash or 
              comprehensive detailing, our experienced team treats every vehicle 
              with the care it deserves.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/20 rounded-lg p-6">
                <Award className="w-10 h-10 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">35+</div>
                <div className="text-blue-200">Years in Business</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/20 rounded-lg p-6">
                <Users className="w-10 h-10 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/40 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Customer First Approach
                  </h3>
                  <p className="text-blue-200">
                    Your satisfaction is our priority. We go above and beyond to 
                    ensure every customer leaves with a smile and a spotless vehicle.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/40 to-slate-900/40 border-l-4 border-green-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Eco-Friendly Technology
                  </h3>
                  <p className="text-blue-200 mb-3">
                    We're committed to protecting the environment while delivering 
                    exceptional results.
                  </p>
                  <div className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">Spa Car Wash</span>
                      <span className="text-green-400 font-bold">25-35 gallons</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">Industry Average</span>
                      <span className="text-red-400 font-bold">40-60 gallons</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <p className="text-green-300 text-sm mt-3 font-medium">
                    We use up to 40% less water per wash while maintaining superior cleaning quality
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900/40 to-slate-900/40 border-l-4 border-red-500 p-6 rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 rounded-full p-3 flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Premium Quality Service
                  </h3>
                  <p className="text-blue-200">
                    From our advanced tunnel wash system to our expert detailing 
                    team, we use only the best equipment and products to care for 
                    your vehicle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
