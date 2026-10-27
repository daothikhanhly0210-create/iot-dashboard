'use client';

import { useState, useEffect } from 'react';

const GatewayPage = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [systemStatus, setSystemStatus] = useState('online');
  const [uptime, setUptime] = useState('2d 14h 32m');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      const statuses = ['online', 'offline', 'warning', 'critical'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSystemStatus(randomStatus);
    };
    const timer = setInterval(updateStatus, 15000);
    return () => clearInterval(timer);
  }, []);

  const connectedNodes = 3;
  const [dataRate, setDataRate] = useState(75);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Gateway & Thiết bị</h1>
          <p className="text-slate-400">Trạng thái Gateway và thiết bị kết nối</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`relative flex h-3 w-3 ${systemStatus === 'online' ? 'bg-emerald-400 animate-pulse' : systemStatus === 'warning' ? 'bg-amber-400' : 'bg-red-400'}`} />
            <span className={`text-sm font-medium ${systemStatus === 'online' ? 'text-emerald-400' : systemStatus === 'warning' ? 'text-amber-400' : 'text-red-400'}`}>
              {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Status</h3>
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${systemStatus === 'online' ? 'bg-emerald-400 animate-pulse' : systemStatus === 'warning' ? 'bg-amber-400' : 'bg-red-400'}`} />
            <span className="text-xl font-bold text-white capitalize">{systemStatus}</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Connected Nodes</h3>
          <span className="text-3xl font-bold text-cyan-400">{connectedNodes} / 3</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Data Rate</h3>
          <span className="text-3xl font-bold text-emerald-400">{dataRate} msg/min</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Uptime</h3>
          <span className="text-3xl font-bold text-white font-mono">{uptime}</span>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Connected Devices</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                <th className="p-4 font-medium">Device ID</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Seen</th>
                <th className="p-4 font-medium">Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'Node-001', type: 'Health (SpO₂/HR)', status: 'online', lastSeen: '2s ago', signal: -45 },
                { id: 'Node-002', type: 'Environment (Temp/Hum/Pres)', status: 'online', lastSeen: '5s ago', signal: -52 },
                { id: 'Node-003', type: 'Air Quality (Gas)', status: 'warning', lastSeen: '8s ago', signal: -68 },
              ].map((device) => (
                <tr key={device.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-mono text-white">{device.id}</td>
                  <td className="p-4 text-slate-300">{device.type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${device.status === 'online' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' : 'bg-amber-900/30 text-amber-400 border border-amber-800'}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{device.lastSeen}</td>
                  <td className="p-4">
                    <span className={`font-mono ${device.signal > -60 ? 'text-emerald-400' : device.signal > -70 ? 'text-amber-400' : 'text-red-400'}`}>
                      {device.signal} dBm
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway Configuration */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Gateway Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Gateway ID</label>
            <input type="text" value="GW-IoT-001" readOnly className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 font-mono" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Firmware Version</label>
            <input type="text" value="v2.1.4" readOnly className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 font-mono" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Network Mode</label>
            <input type="text" value="LoRaWAN / WiFi" readOnly className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 font-mono" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Last Sync</label>
            <input type="text" value={currentTime} readOnly className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 font-mono" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatewayPage;