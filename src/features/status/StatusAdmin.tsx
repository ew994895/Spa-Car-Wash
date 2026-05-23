import { useState, useEffect } from "react";
import { X, Cloud, CloudRain, CloudSnow, Wind, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { readJson, writeJson } from "@/lib/storage";

interface StatusAdminProps {
  onClose: () => void;
  onUpdate: () => void;
}

export interface BusinessStatus {
  isOpen: boolean;
  reason: string;
  updatedAt: string;
  nextOpenDate?: string; // ISO date string
  nextOpenTime?: string; // Time in HH:MM format
  useCustomTime: boolean; // Whether to use custom time or regular hours
}

export function StatusAdmin({ onClose, onUpdate }: StatusAdminProps) {
  const [status, setStatus] = useState<BusinessStatus>({
    isOpen: true,
    reason: "",
    updatedAt: new Date().toISOString(),
    useCustomTime: false,
  });

  // Helper to get next regular opening time
  const getNextRegularOpening = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    // Mon-Sat: 9AM-5PM (540-1020 minutes), Sun: 10AM-4PM (600-960 minutes)
    const isSunday = day === 0;
    const openTime = isSunday ? 600 : 540; // 10AM or 9AM
    const closeTime = isSunday ? 960 : 1020; // 4PM or 5PM

    let nextDate = new Date(now);
    let nextTime = "";

    // If currently during business hours today
    if (currentTime < openTime) {
      // Opens later today
      nextTime = isSunday ? "10:00" : "09:00";
    } else {
      // Opens next business day
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDay = nextDate.getDay();
      nextTime = nextDay === 0 ? "10:00" : "09:00";
    }

    return {
      date: nextDate.toISOString().split('T')[0],
      time: nextTime
    };
  };

  const setQuickOpenTime = (type: string) => {
    const now = new Date();
    let date = now.toISOString().split('T')[0];
    let time = "";

    switch (type) {
      case "next-regular":
        const regular = getNextRegularOpening();
        date = regular.date;
        time = regular.time;
        setStatus({ ...status, nextOpenDate: date, nextOpenTime: time, useCustomTime: false });
        break;
      case "today-2pm":
        time = "14:00";
        setStatus({ ...status, nextOpenDate: date, nextOpenTime: time, useCustomTime: true });
        break;
      case "today-4pm":
        time = "16:00";
        setStatus({ ...status, nextOpenDate: date, nextOpenTime: time, useCustomTime: true });
        break;
      case "tomorrow-9am":
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        date = tomorrow.toISOString().split('T')[0];
        time = tomorrow.getDay() === 0 ? "10:00" : "09:00";
        setStatus({ ...status, nextOpenDate: date, nextOpenTime: time, useCustomTime: true });
        break;
    }
  };

  useEffect(() => {
    // Load current status from localStorage
    setStatus(readJson<BusinessStatus>("spaCarWashStatus", {
      isOpen: true,
      reason: "",
      updatedAt: new Date().toISOString(),
      useCustomTime: false,
    }));
  }, []);

  const handleSave = () => {
    const updatedStatus = {
      ...status,
      updatedAt: new Date().toISOString(),
    };
    writeJson("spaCarWashStatus", updatedStatus);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('statusUpdated'));
    
    onUpdate();
    onClose();
  };

  const quickReasons = [
    { icon: CloudRain, text: "Heavy Rain", value: "Due to heavy rain" },
    { icon: CloudSnow, text: "Snow/Ice", value: "Due to snow and ice conditions" },
    { icon: Wind, text: "Severe Weather", value: "Due to severe weather conditions" },
    { icon: AlertTriangle, text: "Emergency Closure", value: "Temporarily closed" },
    { icon: Cloud, text: "Weather Advisory", value: "Due to weather advisory" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="bg-slate-900 border-2 border-blue-500 p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Update Business Status</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Status Toggle */}
        <div className="mb-6">
          <label className="block text-blue-200 mb-3 font-medium">Current Status</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStatus({ ...status, isOpen: true, reason: "" })}
              className={`p-4 rounded-lg border-2 transition-all ${
                status.isOpen
                  ? "bg-green-600 border-green-500 text-white"
                  : "bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-600"
              }`}
            >
              <div className="font-bold text-lg">OPEN</div>
              <div className="text-sm opacity-80">Normal Operations</div>
            </button>
            <button
              onClick={() => setStatus({ ...status, isOpen: false })}
              className={`p-4 rounded-lg border-2 transition-all ${
                !status.isOpen
                  ? "bg-red-600 border-red-500 text-white"
                  : "bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-600"
              }`}
            >
              <div className="font-bold text-lg">CLOSED</div>
              <div className="text-sm opacity-80">Due to Weather</div>
            </button>
          </div>
        </div>

        {/* Reason (only if closed) */}
        {!status.isOpen && (
          <>
            <div className="mb-6">
              <label className="block text-blue-200 mb-3 font-medium">Closure Reason</label>
              
              {/* Quick Reasons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickReasons.map((reason, index) => {
                  const Icon = reason.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setStatus({ ...status, reason: reason.value })}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        status.reason === reason.value
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "bg-slate-800 border-slate-700 text-gray-300 hover:border-slate-600"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <div className="text-xs">{reason.text}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Reason */}
              <input
                type="text"
                value={status.reason}
                onChange={(e) => setStatus({ ...status, reason: e.target.value })}
                placeholder="Or enter custom reason..."
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* When We'll Reopen */}
            <div className="mb-6">
              <label className="block text-blue-200 mb-3 font-medium">When We'll Reopen</label>
              
              {/* Quick Times */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => setQuickOpenTime("next-regular")}
                  className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:border-blue-500 text-left text-xs transition-all"
                >
                  Next Regular Hours
                </button>
                <button
                  onClick={() => setQuickOpenTime("today-2pm")}
                  className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:border-blue-500 text-left text-xs transition-all"
                >
                  Today at 2:00 PM
                </button>
                <button
                  onClick={() => setQuickOpenTime("today-4pm")}
                  className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:border-blue-500 text-left text-xs transition-all"
                >
                  Today at 4:00 PM
                </button>
                <button
                  onClick={() => setQuickOpenTime("tomorrow-9am")}
                  className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 hover:border-blue-500 text-left text-xs transition-all"
                >
                  Tomorrow Morning
                </button>
              </div>

              {/* Custom Date/Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={status.nextOpenDate || ""}
                    onChange={(e) => setStatus({ ...status, nextOpenDate: e.target.value, useCustomTime: true })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Time</label>
                  <input
                    type="time"
                    value={status.nextOpenTime || ""}
                    onChange={(e) => setStatus({ ...status, nextOpenTime: e.target.value, useCustomTime: true })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Preview */}
        <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="text-xs text-gray-400 mb-2">Preview:</div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? "bg-green-500" : "bg-red-500"
              } animate-pulse`}
            ></div>
            <span className={`font-bold ${status.isOpen ? "text-green-400" : "text-red-400"}`}>
              {status.isOpen ? "OPEN NOW" : "CLOSED"}
            </span>
            {!status.isOpen && status.reason && (
              <span className="text-yellow-300 text-sm">- {status.reason}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white"
          >
            Save & Update
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-xs text-blue-200">
            <strong>Tip:</strong> Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-yellow-400">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-yellow-400">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-yellow-400">S</kbd> anywhere on the site to access this panel quickly.
          </p>
        </div>
      </Card>
    </div>
  );
}

// Helper function to get current status
export function getBusinessStatus(): BusinessStatus {
  return readJson<BusinessStatus>("spaCarWashStatus", {
    isOpen: true,
    reason: "",
    updatedAt: new Date().toISOString(),
    useCustomTime: false,
  });
}

// Helper function to format next opening time
export function getNextOpeningMessage(status: BusinessStatus): string {
  if (status.isOpen) return "";
  
  // If no custom time set, calculate next regular opening
  if (!status.nextOpenDate || !status.nextOpenTime) {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    const isSunday = day === 0;
    const openTime = isSunday ? 600 : 540; // 10AM or 9AM
    
    if (currentTime < openTime) {
      // Opens later today
      return isSunday ? "Opens today at 10:00 AM" : "Opens today at 9:00 AM";
    } else {
      // Opens tomorrow
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextDay = tomorrow.getDay();
      const openTimeStr = nextDay === 0 ? "10:00 AM" : "9:00 AM";
      return `Opens tomorrow at ${openTimeStr}`;
    }
  }
  
  // Format custom date/time
  const openDate = new Date(status.nextOpenDate);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const openDay = new Date(openDate.getFullYear(), openDate.getMonth(), openDate.getDate());
  
  // Parse time (HH:MM format)
  const [hours, minutes] = status.nextOpenTime.split(':').map(Number);
  const isPM = hours >= 12;
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const timeStr = `${displayHours}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
  
  if (openDay.getTime() === today.getTime()) {
    return `Opens today at ${timeStr}`;
  } else if (openDay.getTime() === tomorrow.getTime()) {
    return `Opens tomorrow at ${timeStr}`;
  } else {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `Opens ${dayNames[openDate.getDay()]} at ${timeStr}`;
  }
}
