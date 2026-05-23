import { MapPin, Navigation, AlertCircle } from 'lucide-react';
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

  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
        {!mapError && (
          <iframe
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spa Car Wash & Detailing Center Location"
            onLoad={() => setMapLoaded(true)}
            onError={() => setMapError(true)}
          />
        )}
        {(!mapLoaded || mapError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/90 text-center px-4">
            <AlertCircle className="w-8 h-8 text-yellow-300" />
            <p className="text-blue-100 text-sm">
              {mapError ? 'Map preview is unavailable right now. Use the directions button below to open Google Maps.' : 'Loading map...'}
            </p>
          </div>
        )}
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
