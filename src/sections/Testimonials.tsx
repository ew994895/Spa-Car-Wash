import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Wayne, PA",
    rating: 5,
    text: "I've been a member for 2 years and it's the best decision I've made! My car always looks brand new, and the staff is incredibly friendly. The Elite membership pays for itself after just 3 washes.",
    service: "Elite Unlimited Member",
  },
  {
    name: "Michael Chen",
    location: "Berwyn, PA",
    rating: 5,
    text: "The attention to detail is outstanding. I brought my BMW in for a full detailing and it came out looking better than the day I bought it. Highly recommend the ceramic coating!",
    service: "Complete Detail Package",
  },
  {
    name: "Jennifer Rodriguez",
    location: "Devon, PA",
    rating: 5,
    text: "As a busy mom, the unlimited membership is a lifesaver. I can swing by whenever the kids make a mess (which is often!) and the car is spotless in minutes. The staff always goes above and beyond.",
    service: "Basic Unlimited Member",
  },
  {
    name: "David Thompson",
    location: "Paoli, PA",
    rating: 5,
    text: "I've tried other car washes in the area, but Spa Car Wash is in a league of their own. The Elite Platinum package is worth every penny - my car has never looked this good!",
    service: "Elite Platinum Wash",
  },
  {
    name: "Lisa Patterson",
    location: "Malvern, PA",
    rating: 5,
    text: "Love that they're eco-friendly without sacrificing quality. My car comes out sparkling clean every time, and I feel good knowing they're using less water than traditional car washes.",
    service: "Signature Elite Member",
  },
  {
    name: "Robert Kim",
    location: "Villanova, PA",
    rating: 5,
    text: "The membership discounts on detailing are incredible! I saved over $100 on my last interior detail. The team is professional, fast, and the results are always perfect.",
    service: "Platinum Unlimited Member",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-200">
            Join thousands of satisfied customers in the Philadelphia area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-blue-500/30 mb-3" />

              <p className="text-blue-100 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-blue-500/20 pt-4">
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-blue-300 text-sm">{testimonial.location}</div>
                <div className="text-yellow-400 text-sm mt-1">{testimonial.service}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-blue-500/30 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold">4.9/5 Average Rating</span>
            <span className="text-blue-300">• 2,500+ Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
