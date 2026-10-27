'use client';

import { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [dataInterval, setDataInterval] = useState('5s');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-slate-400">Cấu hình Dashboard và Gateway</p>
        </div>
        <span className="text-sm text-slate-500">{currentTime}</span>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* System Preferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-white mb-4">System Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Enable Notifications</h3>
                <p className="text-sm text-slate-400">Receive real-time alert notifications</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${notifications ? 'bg-cyan-400' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-200 shadow-md ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="font-medium text-white mb-2">Theme Mode</h3>
              <div className="flex gap-2">
                {['dark', 'system', 'light'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      theme === t ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800' : 'bg-slate-950 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-white mb-4">Data Collection</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Data Update Interval</h3>
                <p className="text-sm text-slate-400">How often sensor data refreshes</p>
              </div>
              <select
                value={dataInterval}
                onChange={(e) => setDataInterval(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <option value="1s">Every 1 second</option>
                <option value="5s">Every 5 seconds</option>
                <option value="30s">Every 30 seconds</option>
                <option value="1m">Every minute</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-white mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Dashboard Version</p>
              <p className="text-white font-mono">v1.0.0</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Build Date</p>
              <p className="text-white font-mono">2026-01-15</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Framework</p>
              <p className="text-white font-mono">Next.js 16.4.3</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Theme Engine</p>
              <p className="text-white font-mono">Tailwind CSS v4</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors">
            Reset to Default
          </button>
          <button onClick={() => alert('Settings saved successfully!')} className="px-6 py-3 bg-cyan-900/30 border border-cyan-800 rounded-xl text-cyan-400 hover:bg-cyan-900/50 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;