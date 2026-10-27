'use client';

import { useState, useEffect } from 'react';
import { generateMockData } from '@/lib/mockData';
import { NodeData } from '@/lib/types';

const Node1Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>(generateMockData());
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(generateMockData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const node = nodes[0]; // Node 1: SpO2 & Heart Rate

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Node 1 — Sức khỏe</h1>
          <p className="text-slate-400">Giám sát SpO2 và Nhịp tim</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">Hoạt động</span>
          <span className="text-sm text-slate-500">Dữ liệu trực tiếp</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid max-w-4xl grid-cols-1 gap-6">
        {/* SpO2 Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Blood Oxygen Saturation (SpO₂)</h2>
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.spo2 ?? '--'}%</span>
            <span className={`text-sm font-medium ${node.data.spo2 && node.data.spo2 < 90 ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.spo2 && node.data.spo2 < 90 ? 'Critical' : 'Normal'}
            </span>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Normal Range: 95–100%</p>
            <p className="text-slate-400">Your reading: {node.data.spo2 ?? '--'}%</p>
            <p className={`font-medium ${node.data.spo2 && node.data.spo2 < 90 ? 'text-red-400 uppercase' : 'text-emerald-400'}`}>
              {node.data.spo2 && node.data.spo2 < 90 ? 'Seek medical attention' : 'Continue monitoring'}
            </p>
          </div>
        </div>

        {/* Heart Rate Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Heart Rate (HR)</h2>
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.heart_rate ?? '--'} bpm</span>
            <span className={`text-sm font-medium ${node.data.heart_rate && (node.data.heart_rate > 105 || node.data.heart_rate < 60) ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.heart_rate && (node.data.heart_rate > 105 || node.data.heart_rate < 60) ? 'Abnormal' : 'Normal'}
            </span>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Normal Range: 60–105 bpm</p>
            <p className="text-slate-400">Your reading: {node.data.heart_rate ?? '--'} bpm</p>
            <p className={`font-medium ${node.data.heart_rate && (node.data.heart_rate > 105 || node.data.heart_rate < 60) ? 'text-red-400 uppercase' : 'text-emerald-400'}`}>
              {node.data.heart_rate && (node.data.heart_rate > 105 || node.data.heart_rate < 60) ? 'Consult healthcare provider' : 'Maintain healthy habits'}
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-950/50">
        <h3 className="text-xl font-bold text-emerald-400 mb-4">Health Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-red-950/30 border border-red-800 text-red-200 text-sm">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span>SpO2 reading below normal range</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-amber-950/30 border border-amber-800 text-amber-200 text-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Heart rate slightly elevated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Node1Page;
