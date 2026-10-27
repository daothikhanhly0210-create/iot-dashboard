'use client';

import { useState, useEffect } from 'react';
import { generateMockData } from '@/lib/mockData';
import { NodeData } from '@/lib/types';

const Node2Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [nodes, setNodes] = useState<NodeData[]>(generateMockData());
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(generateMockData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const node = nodes[1]; // Node 2: Temperature, Humidity, Presence

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Node 2 — Môi trường</h1>
          <p className="text-slate-400">Nhiệt độ, Độ ẩm và Phát hiện người</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">Hoạt động</span>
          <span className="text-sm text-slate-500">Dữ liệu môi trường</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid max-w-4xl grid-cols-1 gap-6">
        {/* Temperature Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-cyan-400 mb-6">Temperature</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.temperature!}°C</span>
            <span className={`text-sm font-medium ${node.data.temperature! > 38.5 ? 'text-red-400' : 'text-cyan-400'}`}>
              {node.data.temperature! > 38.5 ? 'High' : 'Normal'}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Normal Range: 36–37.5°C</p>
            <p className="text-slate-400">Your reading: {node.data.temperature!}°C</p>
            <p className={`font-medium ${node.data.temperature! > 38.5 ? 'text-red-400 uppercase' : 'text-cyan-400'}`}>
              {node.data.temperature! > 38.5 ? 'Monitor closely' : 'Stable temperature'}
            </p>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Humidity</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.humidity!}%</span>
            <span className={`text-sm font-medium ${node.data.humidity! < 30 || node.data.humidity! > 70 ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.humidity! < 30 ? 'Dry' : node.data.humidity! > 70 ? 'High' : 'Normal'}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Normal Range: 40–60%</p>
            <p className="text-slate-400">Your reading: {node.data.humidity!}%</p>
            <p className={`font-medium ${node.data.humidity! < 30 || node.data.humidity! > 70 ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.humidity! < 30 ? 'Check ventilation' : node.data.humidity! > 70 ? 'Adjust humidity' : 'Ideal conditions'}
            </p>
          </div>
        </div>

        {/* Presence Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-amber-400 mb-6">Presence Detection</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.presence ? 'Detected' : 'Not detected'}</span>
            <span className={`text-sm font-medium ${node.data.presence ? 'text-emerald-400' : 'text-red-400'}`}>
              {node.data.presence ? 'Occupied' : 'Unoccupied'}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Status: {node.data.presence ? 'Active' : 'Inactive'}</p>
            <p className="text-slate-400">Last detected: {isMounted ? new Date(node.timestamp).toLocaleTimeString('vi-VN', { hour12: false }) : '--:--:--'}</p>
            <p className={`font-medium ${node.data.presence ? 'text-emerald-400' : 'text-red-400'}`}>
              {node.data.presence ? 'Person detected' : 'No presence detected'}
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="mt-8 bg-slate-900 border border-amber-900/50 rounded-xl p-6 shadow-lg shadow-slate-950/50">
        <h3 className="text-lg font-bold text-amber-400 mb-4">Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-amber-800 bg-amber-950/30 text-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Temperature elevated (Node 2)</span>
            <span className="text-xs ml-3 opacity-70">3 min ago</span>
            <button className="text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700 hover:border-slate-600 transition-colors">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Node2Page;
