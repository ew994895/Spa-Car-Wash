import { useState } from "react";
import { Calendar, User, Mail, Phone, Car, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BookingFormProps {
  serviceName: string;
  servicePrice: string;
}

export function BookingForm({ serviceName, servicePrice }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicleDetails: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to a backend
    console.log("Booking submitted:", { ...formData, service: serviceName });
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicleType: "",
        vehicleDetails: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-2 border-green-500/40 p-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Booking Request Received!</h3>
          <p className="text-green-100 mb-4">
            Thank you for your interest in our {serviceName}. We'll contact you shortly to confirm your appointment.
          </p>
          <p className="text-green-200 text-sm">
            You can also call us directly at <a href="tel:610-695-0711" className="font-bold text-white hover:text-green-300">610-695-0711</a>
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-blue-500/20 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Book Your Appointment</h3>
        <p className="text-blue-200">
          {serviceName} - {servicePrice}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <User className="w-4 h-4 text-blue-400" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="John Smith"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <Phone className="w-4 h-4 text-blue-400" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-colors"
              placeholder="(610) 555-1234"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <Car className="w-4 h-4 text-blue-400" />
              Vehicle Type *
            </label>
            <select
              name="vehicleType"
              required
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
            >
              <option value="">Select vehicle type</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
              <option value="minivan">Minivan</option>
              <option value="coupe">Coupe</option>
              <option value="luxury">Luxury Vehicle</option>
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Preferred Date *
            </label>
            <input
              type="date"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label className="flex items-center gap-2 text-white mb-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Preferred Time
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
            >
              <option value="">Select a time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
            </select>
          </div>
        </div>

        {/* Vehicle Details */}
        <div>
          <label className="flex items-center gap-2 text-white mb-2">
            <Car className="w-4 h-4 text-blue-400" />
            Vehicle Details (Make, Model, Year, Color)
          </label>
          <input
            type="text"
            name="vehicleDetails"
            value={formData.vehicleDetails}
            onChange={handleChange}
            className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-colors"
            placeholder="e.g., 2020 BMW 3 Series, Black"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="flex items-center gap-2 text-white mb-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-800/50 border-2 border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-blue-300/50 focus:border-blue-400 focus:outline-none transition-colors resize-none"
            placeholder="Any special requests or concerns about your vehicle?"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 text-lg shadow-lg"
          >
            Submit Booking Request
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-2 border-blue-400 text-blue-100 hover:bg-blue-500/20 py-4"
            onClick={() => window.open('tel:610-695-0711')}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Instead
          </Button>
        </div>

        <p className="text-blue-300 text-sm text-center">
          * We'll contact you to confirm availability and finalize your appointment details.
        </p>
      </form>
    </Card>
  );
}
