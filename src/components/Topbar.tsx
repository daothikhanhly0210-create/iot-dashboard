'use client';

import { useState, useEffect } from 'react';
import { Bell, Cog, Wifi } from 'lucide-react';

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
  const [currentPage, setCurrentPage] = useState('Quản lý thiết bị');
  const [systemStatus, setSystemStatus] = useState('online');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateSystemStatus = () => {
    // Simulate system status change
    const statuses = ['online', 'offline', 'warning', 'critical'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setSystemStatus(randomStatus);
  };

  useEffect(() => {
    const timer = setInterval(updateSystemStatus, 10000); // Update status every 10 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-slate-200 px-6 py-3 flex justify-between items-center h-16">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-72 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-slate-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-xs text-slate-300 font-medium">Gateway: Hoạt động</span>
          <span className={`text-xs font-mono bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800 ${systemStatus === 'online' ? 'text-emerald-400' : 'text-red-400'}`}>
            {currentTime}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="p-2 text-slate-300 hover:text-cyan-400 transition-colors" aria-label="Thông báo">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-300 hover:text-cyan-400 transition-colors" aria-label="Cài đặt">
          <Cog className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-medium">Online</span>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;