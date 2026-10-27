'use client';

import { useState, useEffect } from 'react';
import { Wifi, Download, Plus, Monitor, Thermometer, Flame, Signal, BatteryMedium } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';

const dataHealth = [{ name: 'Sức khỏe', value: 92, fill: '#22d3ee' }];
const dataEnv = [{ name: 'Môi trường', value: 94, fill: '#34d399' }];
const dataAir = [{ name: 'Không khí', value: 88, fill: '#fbbf24' }];

export default function OverviewPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const kpis = [
    { title: 'Tổng số Node', value: '04', tag: 'Hoạt động: 3', color: '', icon: Wifi },
    { title: 'Online', value: '03', tag: 'Chiếm 75%', color: '', icon: Wifi },
    { title: 'Cảnh báo', value: '01', tag: 'Cảnh báo', color: '', icon: Monitor },
    { title: 'Ngoại tuyến', value: '01', tag: 'Mất kết nối', color: '', icon: Wifi },
  ];

  const devices = [
    { name: 'Node 1 — Health', type: 'Sinh hiệu', area: 'Phòng 1', status: 'Hoạt động', pin: '85%', updated: 'Vừa xong' },
    { name: 'Node 2 — Environment', type: 'Môi trường', area: 'Phòng 2', status: 'Hoạt động', pin: '92%', updated: '2 giây trước' },
    { name: 'Node 3 — Air Quality', type: 'Khí Gas', area: 'Hành lang', status: 'Cảnh báo', pin: '78%', updated: '5 giây trước' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Quản lý thiết bị</h1>
          <p className="text-slate-400 mt-1">Giám sát và quản lý tất cả các thiết bị IoT đã kết nối</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4 text-cyan-400" />
            Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 rounded-lg text-sm text-white font-medium hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/30">
            <Plus className="w-4 h-4" />
            Thêm thiết bị
          </button>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((k, i) => (
          <div key={i} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-950/40 overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-0.5">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-1 h-1 rounded-full bg-slate-600" />
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
                <k.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xs text-slate-400 font-medium">{k.title}</h3>
                <p className="text-3xl font-extrabold text-white leading-none">{k.value}</p>
              </div>
            </div>
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md border ${
              i === 2 ? 'bg-amber-950/30 text-amber-400 border-amber-800' :
              i === 3 ? 'bg-red-950/30 text-red-400 border-red-800' :
              'bg-emerald-950/30 text-emerald-400 border-emerald-800'
            }`}>{k.tag}</span>
          </div>
        ))}
      </div>

      {/* Row 2: System Performance */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Hiệu suất hệ thống</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'Node 1 — Sức khỏe', sensors: 'SpO₂ · Nhịp tim', health: 92, data: [{ name: 'Sức khỏe', value: 92, fill: '#22d3ee' }] },
            { name: 'Node 2 — Môi trường', sensors: 'Nhiệt độ · Độ ẩm · Có người', health: 94, data: [{ name: 'Sức khỏe', value: 94, fill: '#34d399' }] },
            { name: 'Node 3 — Chất lượng không khí', sensors: 'Khí Gas', health: 88, data: [{ name: 'Sức khỏe', value: 88, fill: '#fbbf24' }] },
          ].map((node, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-950/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{node.name}</h3>
                  <p className="text-xs text-slate-400">{node.sensors}</p>
                </div>
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, j) => (
                    <span key={j} className={`w-2 h-2 rounded-full ${j < 2 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between gap-6">
                <div className="flex-1">
                  <p className="text-5xl font-extrabold text-white tracking-tighter leading-none">{node.health}%</p>
                  <p className="text-xs text-slate-400 mt-2 font-medium">Sức khỏe</p>
                </div>
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="55%" outerRadius="95%" data={node.data} startAngle={180} endAngle={-180}>
                      <RadialBar background={{ fill: '#0f172a' }} dataKey="value" cornerRadius={12} barSize={18}>
                        <Cell fill={node.data[0].fill} />
                      </RadialBar>
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xl font-extrabold text-white drop-shadow-md">{node.health}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Device Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg shadow-slate-950/40 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Tất cả thiết bị</h2>
            <p className="text-xs text-slate-400 mt-0.5">Danh sách thiết bị đã kết nối và trạng thái</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Tìm..." className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
            <button className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm text-slate-300 hover:bg-slate-800 transition-colors">Xem tất cả</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3 font-medium">Thiết bị</th>
                <th className="px-6 py-3 font-medium">Loại</th>
                <th className="px-6 py-3 font-medium">Khu vực</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium">Pin</th>
                <th className="px-6 py-3 font-medium">Cập nhật cuối</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {devices.map((d, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{d.name}</td>
                  <td className="px-6 py-4 text-slate-300">{d.type}</td>
                  <td className="px-6 py-4 text-slate-300">{d.area}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${d.status === 'Hoạt động' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800' : 'bg-amber-950/30 text-amber-400 border-amber-800'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${d.status === 'Hoạt động' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono">{d.pin}</td>
                  <td className="px-6 py-4 text-slate-400">{d.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-6 text-xs text-slate-500">
        Cập nhật dữ liệu: {isMounted ? new Date().toLocaleTimeString('vi-VN', { hour12: false }) : '--:--:--'}
      </div>
    </div>
  );
}
