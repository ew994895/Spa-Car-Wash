import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
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

export function WaitTimeDisplay() {
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

    // Listen for updates from admin panel
    const handleUpdate = () => {
      loadWaitTimeData();
    };

    window.addEventListener('waitTimeUpdated', handleUpdate);
    return () => window.removeEventListener('waitTimeUpdated', handleUpdate);
  }, []);

  if (!waitTimeData || !waitTimeData.showInDetailSection) {
    return null;
  }

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'from-green-500 to-green-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'very-high': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getGradualColor = (waitTime: number) => {
    // Gradual color from green (15 min) to red (60 min)
    // 15-25: Green
    // 30-35: Yellow-Green
    // 40-45: Yellow-Orange
    // 50-55: Orange-Red
    // 60: Red
    if (waitTime <= 25) {
      return 'from-green-500 to-green-600';
    } else if (waitTime <= 35) {
      return 'from-yellow-400 to-yellow-500';
    } else if (waitTime <= 45) {
      return 'from-yellow-500 to-orange-500';
    } else if (waitTime <= 55) {
      return 'from-orange-500 to-red-500';
    } else {
      return 'from-red-500 to-red-600';
    }
  };

  const getProgressPercentage = (waitTime: number) => {
    // Map 15-60 minutes to 0-100% progress
    const min = 15;
    const max = 60;
    const percentage = ((waitTime - min) / (max - min)) * 100;
    return Math.min(100, Math.max(0, percentage));
  };

  const getTrafficBgColor = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'bg-green-500/10 border-green-500/30';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'bg-orange-500/10 border-orange-500/30';
      case 'very-high': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  const getTrafficPercentage = (traffic: string) => {
    switch (traffic) {
      case 'low': return 25;
      case 'medium': return 50;
      case 'high': return 75;
      case 'very-high': return 100;
      default: return 0;
    }
  };

  const getTrafficIcon = (traffic: string) => {
    switch (traffic) {
      case 'low': return <TrendingDown className="w-4 h-4" />;
      case 'medium': return <Minus className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'very-high': return <TrendingUp className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrafficLabel = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'Low Traffic';
      case 'medium': return 'Moderate Traffic';
      case 'high': return 'High Traffic';
      case 'very-high': return 'Very High Traffic';
      default: return 'Unknown';
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

  const hasAnyEnabled = waitTimeData.handWash.enabled || waitTimeData.eliteWash.enabled || waitTimeData.detailServices.enabled;

  if (!hasAnyEnabled) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-full p-3">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Current Wait Times</h3>
          <p className="text-blue-200 text-sm">Live updates for our services</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hand Wash */}
        {waitTimeData.handWash.enabled && (
          <div className={`rounded-xl p-5 border-2 ${getTrafficBgColor(waitTimeData.handWash.traffic)} transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">🚿 Hand Wash</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  waitTimeData.handWash.traffic === 'low' ? 'bg-green-500/20 text-green-300' :
                  waitTimeData.handWash.traffic === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  waitTimeData.handWash.traffic === 'high' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {getTrafficIcon(waitTimeData.handWash.traffic)}
                  <span className="ml-1">{getTrafficLabel(waitTimeData.handWash.traffic)}</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatWaitTime(waitTimeData.handWash.waitTime)}</div>
                <div className="text-xs text-slate-400">Est. wait</div>
              </div>
            </div>
            
            {/* Modern Progress Bar - Gradual Color Change */}
            <div className="relative w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getGradualColor(waitTimeData.handWash.waitTime)} transition-all duration-700 ease-out rounded-full`}
                style={{ width: `${getProgressPercentage(waitTimeData.handWash.waitTime)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              
              {/* Progress markers for 5-minute increments */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="w-px h-2 bg-slate-600"></div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
              <span>15 min</span>
              <span>30 min</span>
              <span>45 min</span>
              <span>60 min</span>
            </div>
          </div>
        )}

        {/* Elite Wash */}
        {waitTimeData.eliteWash.enabled && (
          <div className={`rounded-xl p-5 border-2 ${getTrafficBgColor(waitTimeData.eliteWash.traffic)} transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">⚡ Elite Wash</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                  waitTimeData.eliteWash.traffic === 'low' ? 'bg-green-500/20 text-green-300' :
                  waitTimeData.eliteWash.traffic === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  waitTimeData.eliteWash.traffic === 'high' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {getTrafficIcon(waitTimeData.eliteWash.traffic)}
                  <span className="ml-1">{getTrafficLabel(waitTimeData.eliteWash.traffic)}</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatWaitTime(waitTimeData.eliteWash.waitTime)}</div>
                <div className="text-xs text-slate-400">Est. wait</div>
              </div>
            </div>
            
            <div className="relative w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getTrafficColor(waitTimeData.eliteWash.traffic)} transition-all duration-700 ease-out rounded-full`}
                style={{ width: `${getTrafficPercentage(waitTimeData.eliteWash.traffic)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-between px-1">
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
              <span>0 min</span>
              <span>10 min</span>
              <span>15 min</span>
              <span>20+ min</span>
            </div>
          </div>
        )}

        {/* Detail Services */}
        {waitTimeData.detailServices.enabled && (
          <div className={`rounded-xl p-5 border-2 ${getTrafficBgColor(waitTimeData.detailServices.traffic)} transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">✨ Detail Services</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${
                  waitTimeData.detailServices.traffic === 'low' ? 'bg-green-500/20 text-green-300' :
                  waitTimeData.detailServices.traffic === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  waitTimeData.detailServices.traffic === 'high' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {getTrafficIcon(waitTimeData.detailServices.traffic)}
                  <span className="ml-1">{getTrafficLabel(waitTimeData.detailServices.traffic)}</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{formatWaitTime(waitTimeData.detailServices.waitTime)}</div>
                <div className="text-xs text-slate-400">Usually all day</div>
              </div>
            </div>
            
            <div className="relative w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getTrafficColor(waitTimeData.detailServices.traffic)} transition-all duration-700 ease-out rounded-full`}
                style={{ width: `${getTrafficPercentage(waitTimeData.detailServices.traffic)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-between px-1">
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
                <div className="w-px h-2 bg-slate-600"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
              <span>Today</span>
              <span>Same day</span>
              <span>Next day</span>
              <span>2+ days</span>
            </div>
            
            <p className="text-xs text-slate-400 mt-2 italic">
              * You'll be notified when your detail is complete
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          Updated in real-time • Last refresh: {waitTimeData.lastUpdated ? new Date(waitTimeData.lastUpdated).toLocaleTimeString() : 'Just now'}
        </p>
      </div>
    </div>
  );
}