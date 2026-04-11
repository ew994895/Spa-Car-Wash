import { MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';

export function LocationMap() {
  const [showDirections, setShowDirections] = useState(false);
  const businessAddress = "734 Lancaster Ave, Berwyn, PA 19312";
  const encodedAddress = encodeURIComponent(businessAddress);

  const handleGetDirections = () => {
    // Request user's location and open Google Maps with directions
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Open Google Maps with directions from user's location
          window.open(
            `https://www.google.com/maps/dir/${latitude},${longitude}/${encodedAddress}`,
            '_blank'
          );
        },
        () => {
          // If user denies location, just open directions to the business
          window.open(
            `https://www.google.com/maps/dir//${encodedAddress}`,
            '_blank'
          );
        }
      );
    } else {
      // Fallback if geolocation not supported
      window.open(
        `https://www.google.com/maps/dir//${encodedAddress}`,
        '_blank'
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Find Us</h3>
        </div>
        <button
          onClick={handleGetDirections}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Navigation className="w-4 h-4" />
          Get Directions & ETA
        </button>
      </div>

      {/* Embedded Google Map */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-slate-700">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.5!2d-75.4555!3d40.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDAyJzM5LjgiTiA3NcKwMjcnMTkuOCJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Spa Car Wash & Detailing Center Location"
        />
      </div>

      {/* Info Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-white font-medium">734 Lancaster Ave</p>
            <p className="text-slate-400 text-sm">Berwyn, PA 19312</p>
            <p className="text-slate-500 text-xs mt-2">
              Click "Get Directions & ETA" to see travel time from your location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}