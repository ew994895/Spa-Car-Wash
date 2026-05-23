import { X, Clock, Save, Trash2, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { readJson, writeJson } from '@/lib/storage';

interface WaitTimeData {
  handWash: {
    enabled: boolean;
    waitTime: number; // in minutes
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

const DEFAULT_WAIT_TIME: WaitTimeData = {
  handWash: {
    enabled: true, // Start with Hand Wash enabled
    waitTime: 20, // Default to 20 minutes
    traffic: 'low',
  },
  eliteWash: {
    enabled: false, // Disabled by default
    waitTime: 15,
    traffic: 'low',
  },
  detailServices: {
    enabled: false, // Disabled by default
    waitTime: 480, // 8 hours (all day)
    traffic: 'low',
  },
  showInHeader: true,
  showInDetailSection: true,
  lastUpdated: new Date().toISOString(),
};

interface WaitTimeAdminProps {
  onClose: () => void;
}

export function WaitTimeAdmin({ onClose }: WaitTimeAdminProps) {
  const [waitTimeData, setWaitTimeData] = useState<WaitTimeData>(DEFAULT_WAIT_TIME);

  useEffect(() => {
    // Load saved data from localStorage
    setWaitTimeData(readJson<WaitTimeData>('spa-wait-time-data', DEFAULT_WAIT_TIME));
  }, []);

  const handleSave = () => {
    const dataToSave = {
      ...waitTimeData,
      lastUpdated: new Date().toISOString(),
    };
    writeJson('spa-wait-time-data', dataToSave);
    
    // Dispatch custom event to notify displays to update
    window.dispatchEvent(new CustomEvent('waitTimeUpdated'));
    
    alert('Wait time settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Reset all wait time settings to defaults?')) {
      setWaitTimeData(DEFAULT_WAIT_TIME);
      localStorage.removeItem('spa-wait-time-data');
      window.dispatchEvent(new CustomEvent('waitTimeUpdated'));
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'very-high': return 'bg-red-500';
      default: return 'bg-gray-500';
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-blue-500 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b-2 border-blue-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">Wait Time Manager</h2>
                <p className="text-blue-100 text-sm">Control customer wait time displays</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              <p className="font-semibold mb-1">Wait Time Display System</p>
              <p>Enable services to show wait times to customers. Start with Hand Wash, then enable Elite Wash and Detail Services when ready.</p>
            </div>
          </div>

          {/* Hand Wash Wait Time */}
          <div className="bg-slate-800/50 border-2 border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  🚿 Hand Wash Wait Time
                  <span className="text-xs font-normal text-green-400 bg-green-500/20 px-2 py-1 rounded">PRIMARY</span>
                </h3>
                <p className="text-slate-400 text-sm">Show customers current Hand Wash wait times</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitTimeData.handWash.enabled}
                  onChange={(e) => setWaitTimeData({
                    ...waitTimeData,
                    handWash: { ...waitTimeData.handWash, enabled: e.target.checked }
                  })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-white font-medium">Enabled</span>
              </label>
            </div>

            {waitTimeData.handWash.enabled && (
              <>
                <div className="mb-4">
                  <label className="block text-white font-medium mb-2">Wait Time (minutes)</label>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={waitTimeData.handWash.waitTime}
                    onChange={(e) => setWaitTimeData({
                      ...waitTimeData,
                      handWash: { ...waitTimeData.handWash, waitTime: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full bg-slate-900 border border-slate-600 text-white px-4 py-2 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-white font-medium mb-2">Traffic Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['low', 'medium', 'high', 'very-high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setWaitTimeData({
                          ...waitTimeData,
                          handWash: { ...waitTimeData.handWash, traffic: level }
                        })}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          waitTimeData.handWash.traffic === level
                            ? `${getTrafficColor(level)} text-white`
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {level === 'very-high' ? 'Very High' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-2">Preview:</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white font-medium">Hand Wash</span>
                      <span className="text-blue-300">{waitTimeData.handWash.waitTime} min</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getTrafficColor(waitTimeData.handWash.traffic)}`}
                        style={{ width: `${getTrafficPercentage(waitTimeData.handWash.traffic)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Elite Wash Wait Time */}
          <div className="bg-slate-800/50 border-2 border-slate-600/30 rounded-xl p-6 opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  ⚡ Elite Wash Wait Time
                  <span className="text-xs font-normal text-slate-400 bg-slate-700 px-2 py-1 rounded">OPTIONAL</span>
                </h3>
                <p className="text-slate-400 text-sm">Typical wait: 10-20 minutes when not busy</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitTimeData.eliteWash.enabled}
                  onChange={(e) => setWaitTimeData({
                    ...waitTimeData,
                    eliteWash: { ...waitTimeData.eliteWash, enabled: e.target.checked }
                  })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-white font-medium">Enabled</span>
              </label>
            </div>
            <p className="text-slate-500 text-sm italic">Enable this when ready to show Elite Wash wait times</p>
          </div>

          {/* Detail Services Wait Time */}
          <div className="bg-slate-800/50 border-2 border-slate-600/30 rounded-xl p-6 opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  ✨ Detail Services Wait Time
                  <span className="text-xs font-normal text-slate-400 bg-slate-700 px-2 py-1 rounded">OPTIONAL</span>
                </h3>
                <p className="text-slate-400 text-sm">Usually all day - customers notified when complete</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitTimeData.detailServices.enabled}
                  onChange={(e) => setWaitTimeData({
                    ...waitTimeData,
                    detailServices: { ...waitTimeData.detailServices, enabled: e.target.checked }
                  })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-white font-medium">Enabled</span>
              </label>
            </div>
            <p className="text-slate-500 text-sm italic">Enable this when ready to show Detail Services wait times</p>
          </div>

          {/* Display Settings */}
          <div className="bg-slate-800/50 border-2 border-blue-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Display Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitTimeData.showInHeader}
                  onChange={(e) => setWaitTimeData({
                    ...waitTimeData,
                    showInHeader: e.target.checked
                  })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <span className="text-white font-medium block">Show in Header</span>
                  <span className="text-slate-400 text-sm">Display wait time badge near logo at top of page</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitTimeData.showInDetailSection}
                  onChange={(e) => setWaitTimeData({
                    ...waitTimeData,
                    showInDetailSection: e.target.checked
                  })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <span className="text-white font-medium block">Show in Detail Section</span>
                  <span className="text-slate-400 text-sm">Display wait time widget in Detailing Services section</span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all border border-red-500/30"
            >
              <Trash2 className="w-5 h-5" />
              Reset to Defaults
            </button>
          </div>

          {/* Last Updated */}
          {waitTimeData.lastUpdated && (
            <p className="text-slate-500 text-xs text-center">
              Last updated: {new Date(waitTimeData.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
