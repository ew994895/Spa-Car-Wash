import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Kelly Harper",
    location: "Devon, PA",
    rating: 5,
    text: "I stop in every Friday after the school run and the team somehow gets juice boxes, dog hair, and road salt out in fifteen minutes. The Signature Elite wash keeps my SUV looking brand new.",
    service: "Signature Elite Wash",
  },
  {
    name: "Anand Patel",
    location: "Malvern, PA",
    rating: 5,
    text: "Booked the Cleanse Detail before listing my Audi. Spa picked up the car, kept me updated, and dropped it back off ready for photos. It sold the next day.",
    service: "Cleanse Detail",
  },
  {
    name: "Emily Warren",
    location: "Wayne, PA",
    rating: 5,
    text: "The prepaid cards are a no-brainer. I load an 18-wash card every spring and never have to fumble with payment or pricing—just hand the card to the cashier and relax.",
    service: "18-Wash Prepaid Card",
  },
  {
    name: "Marcus Reed",
    location: "Berwyn, PA",
    rating: 5,
    text: "Spa handled my ceramic-coated Porsche with care. They used manual wash mitts and two towel teams without me having to explain a thing. Trustworthy, knowledgeable staff.",
    service: "Hand Wash / Detailing Studio",
  },
  {
    name: "Hannah Lewis",
    location: "Villanova, PA",
    rating: 5,
    text: "After a long road trip I scheduled the Signature Complete detail. Seats, vents, wheels—everything looked and smelled new again. Worth the waitlist.",
    service: "Signature Complete Detail",
  },
  {
    name: "Brian Cooper",
    location: "Paoli, PA",
    rating: 5,
    text: "Rain or shine they keep me posted on weather delays via the status banner. Communication is great and the wash tunnel is spotless.",
    service: "RITZ Cleanse Wash",
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
