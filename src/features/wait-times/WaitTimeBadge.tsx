import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WaitTimeData {
  handWash: {
    enabled: boolean;
    waitTime: number;
    traffic: 'low' | 'medium' | 'high' | 'very-high';
  };
  eliteWash: {
    enabled: boolean;
    waitTime: number;
    traffic: 'low' | 'medium' | 'high' | 'very-high';
  };
  detailServices: {
    enabled: boolean;
    waitTime: number;
    traffic: 'low' | 'medium' | 'high' | 'very-high';
  };
  showInHeader: boolean;
  showInDetailSection: boolean;
  lastUpdated: string;
}

export function WaitTimeBadge() {
  const [waitTimeData, setWaitTimeData] = useState<WaitTimeData | null>(null);

  const loadWaitTimeData = () => {
    const saved = localStorage.getItem('spa-wait-time-data');
    if (saved) {
      try {
        setWaitTimeData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wait time data');
      }
    }
  };

  useEffect(() => {
    loadWaitTimeData();

    const handleUpdate = () => {
      loadWaitTimeData();
    };

    window.addEventListener('waitTimeUpdated', handleUpdate);
    return () => window.removeEventListener('waitTimeUpdated', handleUpdate);
  }, []);

  if (!waitTimeData || !waitTimeData.showInHeader) {
    return null;
  }

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'very-high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  };

  // Show Hand Wash as primary if enabled
  if (waitTimeData.handWash.enabled) {
    return (
      <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 shadow-lg">
        <div className={`w-2 h-2 rounded-full ${getTrafficColor(waitTimeData.handWash.traffic)} animate-pulse`}></div>
        <Clock className="w-4 h-4 text-blue-300" />
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">Hand Wash:</span>
          <span className="text-blue-300 text-sm font-bold">{formatWaitTime(waitTimeData.handWash.waitTime)}</span>
        </div>
      </div>
    );
  }

  // Fallback to Elite Wash if enabled
  if (waitTimeData.eliteWash.enabled) {
    return (
      <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 shadow-lg">
        <div className={`w-2 h-2 rounded-full ${getTrafficColor(waitTimeData.eliteWash.traffic)} animate-pulse`}></div>
        <Clock className="w-4 h-4 text-blue-300" />
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">Elite Wash:</span>
          <span className="text-blue-300 text-sm font-bold">{formatWaitTime(waitTimeData.eliteWash.waitTime)}</span>
        </div>
      </div>
    );
  }

  // Fallback to Detail Services if enabled
  if (waitTimeData.detailServices.enabled) {
    return (
      <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 shadow-lg">
        <div className={`w-2 h-2 rounded-full ${getTrafficColor(waitTimeData.detailServices.traffic)} animate-pulse`}></div>
        <Clock className="w-4 h-4 text-blue-300" />
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">Details:</span>
          <span className="text-blue-300 text-sm font-bold">{formatWaitTime(waitTimeData.detailServices.waitTime)}</span>
        </div>
      </div>
    );
  }

  return null;
}
