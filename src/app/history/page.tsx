'use client';

import { useState, useEffect } from 'react';

const HistoryPage = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('24h');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const mockHistoryData = {
    '1h': [
      { time: '14:00', node: 'Node 1', metric: 'SpO2', value: 98, unit: '%' },
      { time: '14:05', node: 'Node 1', metric: 'Heart Rate', value: 72, unit: 'bpm' },
      { time: '14:10', node: 'Node 2', metric: 'Temperature', value: 36.8, unit: '°C' },
      { time: '14:15', node: 'Node 2', metric: 'Humidity', value: 52, unit: '%' },
      { time: '14:20', node: 'Node 3', metric: 'Gas PPM', value: 450, unit: 'ppm' },
      { time: '14:25', node: 'Node 1', metric: 'SpO2', value: 97, unit: '%' },
      { time: '14:30', node: 'Node 1', metric: 'Heart Rate', value: 68, unit: 'bpm' },
    ],
    '6h': [
      { time: '08:00', node: 'Node 1', metric: 'SpO2', value: 96, unit: '%' },
      { time: '09:30', node: 'Node 2', metric: 'Temperature', value: 37.2, unit: '°C' },
      { time: '10:00', node: 'Node 3', metric: 'Gas PPM', value: 320, unit: 'ppm' },
      { time: '11:00', node: 'Node 1', metric: 'Heart Rate', value: 85, unit: 'bpm' },
      { time: '12:00', node: 'Node 2', metric: 'Humidity', value: 45, unit: '%' },
      { time: '13:00', node: 'Node 3', metric: 'Gas PPM', value: 890, unit: 'ppm' },
    ],
    '24h': [
      { time: 'Yesterday 15:00', node: 'Node 1', metric: 'SpO2', value: 95, unit: '%' },
      { time: 'Yesterday 18:00', node: 'Node 2', metric: 'Temperature', value: 38.1, unit: '°C' },
      { time: 'Yesterday 20:00', node: 'Node 3', metric: 'Gas PPM', value: 1200, unit: 'ppm' },
      { time: 'Today 06:00', node: 'Node 1', metric: 'Heart Rate', value: 58, unit: 'bpm' },
      { time: 'Today 09:00', node: 'Node 2', metric: 'Presence', value: 1, unit: '' },
      { time: 'Today 12:00', node: 'Node 3', metric: 'Gas PPM', value: 380, unit: 'ppm' },
    ],
    '7d': [
      { time: 'Mon 10:00', node: 'Node 1', metric: 'SpO2', value: 97, unit: '%' },
      { time: 'Tue 14:00', node: 'Node 2', metric: 'Temperature', value: 36.5, unit: '°C' },
      { time: 'Wed 09:00', node: 'Node 3', metric: 'Gas PPM', value: 250, unit: 'ppm' },
      { time: 'Thu 16:00', node: 'Node 1', metric: 'Heart Rate', value: 75, unit: 'bpm' },
      { time: 'Fri 11:00', node: 'Node 2', metric: 'Humidity', value: 55, unit: '%' },
      { time: 'Sat 08:00', node: 'Node 3', metric: 'Gas PPM', value: 1100, unit: 'ppm' },
      { time: 'Sun 12:00', node: 'Node 1', metric: 'SpO2', value: 96, unit: '%' },
    ],
  };

  const data = mockHistoryData[timeRange];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Lịch sử & Phân tích</h1>
          <p className="text-slate-400">Dữ liệu lịch sử và xu hướng cảm biến</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">Data updated: {currentTime}</span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 mb-6">
        {(['1h', '6h', '24h', '7d'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === range
                ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">SpO2 & Heart Rate Trend (Node 1)</h3>
          <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Chart placeholder — Recharts integration pending</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Temperature & Humidity Trend (Node 2)</h3>
          <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Chart placeholder — Recharts integration pending</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Gas Concentration Trend (Node 3)</h3>
          <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Chart placeholder — Recharts integration pending</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Presence Detection Log (Node 2)</h3>
          <div className="h-64 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Chart placeholder — Recharts integration pending</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Historical Data Points</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Node</th>
                <th className="p-4 font-medium">Metric</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-slate-300 font-mono">{item.time}</td>
                  <td className="p-4 text-white">{item.node}</td>
                  <td className="p-4 text-slate-300">{item.metric}</td>
                  <td className="p-4 font-mono text-white">{item.value}{item.unit}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (item.metric === 'SpO2' && item.value < 90) ||
                      (item.metric === 'Heart Rate' && (item.value > 105 || item.value < 60)) ||
                      (item.metric === 'Temperature' && item.value > 38.5) ||
                      (item.metric === 'Gas PPM' && item.value > 1000)
                        ? 'bg-red-900/30 text-red-400 border border-red-800'
                        : 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'
                    }`}>
                      {(item.metric === 'SpO2' && item.value < 90) ||
                      (item.metric === 'Heart Rate' && (item.value > 105 || item.value < 60)) ||
                      (item.metric === 'Temperature' && item.value > 38.5) ||
                      (item.metric === 'Gas PPM' && item.value > 1000)
                        ? 'Alert'
                        : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors">
          Export CSV
        </button>
        <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors">
          Export JSON
        </button>
        <button className="px-4 py-2 bg-cyan-900/30 border border-cyan-800 rounded-lg text-cyan-400 hover:bg-cyan-900/50 transition-colors">
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;