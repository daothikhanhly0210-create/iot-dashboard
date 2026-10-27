'use client';

import { useState } from 'react';

const menuItems = [
  { id: 'Tổng quan', icon: 'home' },
  { id: 'Node 1 — Sức khỏe', icon: 'heart' },
  { id: 'Node 2 — Môi trường', icon: 'thermometer' },
  { id: 'Node 3 — Chất lượng không khí', icon: 'gas' },
  { id: 'Gateway & Thiết bị', icon: 'router' },
  { id: 'Cảnh báo', icon: 'alert' },
  { id: 'Lịch sử', icon: 'clock' },
  { id: 'Cài đặt', icon: 'gear' },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('Tổng quan');

  return (
    <nav className="w-64 bg-slate-900 text-slate-200 p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shadow-inner shadow-cyan-900/20">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-100 leading-none">IoT Monitor</h1>
          <span className="text-[11px] text-slate-500 font-medium tracking-wide">DASHBOARD V1.0</span>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              activeItem === item.id
                ? 'bg-blue-600 border-l-4 border-cyan-400 text-white shadow-lg shadow-blue-900/40'
                : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <span className={`w-5 h-5 ${activeItem === item.id ? 'text-cyan-200' : 'text-slate-400'}`}>
              {item.icon === 'home' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
              {item.icon === 'heart' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
              {item.icon === 'thermometer' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7l2 2m0 0 2 2m-2-2l-2-2m-2 2l-2 2m2-2l2 2m0 0l-2-2" /></svg>}
              {item.icon === 'gas' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13c0 5.59-3.59 10-8 10s-8-4.41-8-10 3.59-10 8-10 8 4.41 8 10zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              {item.icon === 'router' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
              {item.icon === 'alert' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
              {item.icon === 'clock' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M15.364 19.64l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              {item.icon === 'gear' && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.995.609 2.296.07 2.573-1.066z" /></svg>}
            </span>
            <span className={activeItem === item.id ? 'font-semibold' : 'font-medium'}>{item.id}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;