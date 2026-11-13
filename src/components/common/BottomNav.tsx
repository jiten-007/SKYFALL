'use client';

import React from 'react';
import { Compass, Film, Ticket, Utensils, QrCode } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, activeView, setActiveView, bookings } = useDistrict();

  const activePassesCount = bookings.filter((b) => b.status === 'CONFIRMED').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090C12]/92 backdrop-blur-2xl border-t border-white/[0.08] px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Explore */}
        <button
          onClick={() => {
            setActiveTab('all');
            setActiveView('explore');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === 'explore' && activeTab === 'all'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Explore</span>
        </button>

        {/* Movies */}
        <button
          onClick={() => {
            setActiveTab('movies');
            setActiveView('explore');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === 'explore' && activeTab === 'movies'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Film className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Movies</span>
        </button>

        {/* Events */}
        <button
          onClick={() => {
            setActiveTab('events');
            setActiveView('explore');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === 'explore' && activeTab === 'events'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ticket className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Events</span>
        </button>

        {/* Dining */}
        <button
          onClick={() => {
            setActiveTab('dining');
            setActiveView('explore');
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeView === 'explore' && activeTab === 'dining'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight">Dining</span>
        </button>

        {/* My Passes */}
        <button
          onClick={() => setActiveView('wallet')}
          className={`relative flex flex-col items-center gap-1 transition-all ${
            activeView === 'wallet'
              ? 'text-rose-500 scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <QrCode className="w-5 h-5" />
            {activePassesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-rose-500 text-[9px] font-black text-white flex items-center justify-center shadow-sm shadow-rose-500/50">
                {activePassesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">My Passes</span>
        </button>
      </div>
    </nav>
  );
};
