'use client';

import { useState, useEffect } from 'react';
import { generateMockData } from '@/lib/mockData';
import { NodeData } from '@/lib/types';

const Node3Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>(generateMockData());
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(generateMockData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const node = nodes[2]; // Node 3: Gas monitoring

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Node 3 — Chất lượng không khí</h1>
          <p className="text-slate-400">Gas concentration monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800">Hoạt động</span>
          <span className="text-sm text-slate-500">Dữ liệu chất lượng không khí</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid max-w-4xl grid-cols-1 gap-6">
        {/* Gas PPM Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-950/50">
          <h2 className="text-xl font-bold text-amber-400 mb-6">Air Quality (Gas PPM)</h2>
          
          <div className="flex items-center justify-between">
            <span className="text-5xl font-extrabold text-white">{node.data.gas_ppm!} ppm</span>
            <span className={`text-sm font-medium ${node.data.gas_ppm! > 1000 ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.gas_ppm! > 1000 ? 'High' : 'Normal'}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-400 mb-2">Normal Range: 0–1000 ppm</p>
            <p className="text-slate-400">Your reading: {node.data.gas_ppm!} ppm</p>
            <p className={`font-medium ${node.data.gas_ppm! > 1000 ? 'text-red-400' : 'text-emerald-400'}`}>
              {node.data.gas_ppm! > 1000 ? 'Hazardous' : 'Safe'}
            </p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="mt-8 bg-slate-900 border border-amber-900/50 rounded-xl p-6 shadow-lg shadow-slate-950/50">
        <h3 className="text-lg font-bold text-amber-400 mb-4">Air Quality Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-amber-800 bg-amber-950/30 text-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Gas concentration exceeds safe limit (Node 3)</span>
            <span className="text-xs ml-3 opacity-70">1 min ago</span>
            <button className="text-xs px-2 py-1 rounded bg-slate-950 border border-slate-700 hover:border-slate-600 transition-colors">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Node3Page;
