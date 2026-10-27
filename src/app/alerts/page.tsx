'use client';

import { useState, useEffect } from 'react';
import { AlertLog } from '@/lib/types';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<AlertLog[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const baseTime = Date.now();
    setAlerts([
      { message: 'SpO2 below threshold (Node 1)', severity: 'critical', timestamp: baseTime - 120000 },
      { message: 'Temperature elevated (Node 2)', severity: 'warning', timestamp: baseTime - 300000 },
      { message: 'Gas concentration high (Node 3)', severity: 'critical', timestamp: baseTime - 600000 },
      { message: 'Node 3 reconnected', severity: 'info', timestamp: baseTime - 900000 },
      { message: 'Heart rate anomaly detected (Node 1)', severity: 'warning', timestamp: baseTime - 1200000 },
    ]);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;
  const infoCount = alerts.filter(a => a.severity === 'info').length;

  const handleDismiss = (index: number) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  const severityColors = {
    critical: { bg: 'bg-red-950/30', border: 'border-red-800', text: 'text-red-200', badge: 'bg-red-900/30 text-red-400 border border-red-800' },
    warning: { bg: 'bg-amber-950/30', border: 'border-amber-800', text: 'text-amber-200', badge: 'bg-amber-900/30 text-amber-400 border border-amber-800' },
    info: { bg: 'bg-cyan-950/30', border: 'border-cyan-800', text: 'text-cyan-200', badge: 'bg-cyan-900/30 text-cyan-400 border border-cyan-800' },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Cảnh báo & Thông báo</h1>
          <p className="text-slate-400">Cảnh báo hệ thống và vi phạm ngưỡng cảm biến</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">Live updates</span>
          <span className="text-sm text-slate-500">{currentTime}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-red-800/50 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Critical</p>
          <p className="text-3xl font-bold text-red-400">{criticalCount}</p>
        </div>
        <div className="bg-slate-900 border border-amber-800/50 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Warnings</p>
          <p className="text-3xl font-bold text-amber-400">{warningCount}</p>
        </div>
        <div className="bg-slate-900 border border-cyan-800/50 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Info</p>
          <p className="text-3xl font-bold text-cyan-400">{infoCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Alerts</p>
          <p className="text-3xl font-bold text-white">{alerts.length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'critical', 'warning', 'info'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/50'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Alert History</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {filteredAlerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No {filter === 'all' ? '' : filter} alerts
            </div>
          ) : (
            filteredAlerts.map((alert, index) => {
              const colors = severityColors[alert.severity];
              return (
                <div key={index} className={`p-4 ${colors.bg} ${colors.border} ${colors.text} hover:bg-slate-800/50 transition-colors`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <span className={`w-2 h-2 rounded-full mt-1.5 ${alert.severity === 'critical' ? 'bg-red-400 animate-pulse' : alert.severity === 'warning' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-xs opacity-70">{isMounted ? new Date(alert.timestamp).toLocaleString('vi-VN', { hour12: false }) : '--:--:--'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleDismiss(index)}
                        className="text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;