'use client';

import React from 'react';
import { MapPin, Search, QrCode, Sparkles, ChevronDown } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';
import { playSound } from '@/lib/sound';

export const Header = () => {
  const {
    selectedCity,
    setIsCityModalOpen,
    setIsSearchOpen,
    setIsScannerOpen,
    bookings
  } = useDistrict();

  return (
    <header className="sticky top-0 z-40 bg-[#090C12]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand & City */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 bg-clip-text text-transparent">
                skyfall
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/[0.08] text-rose-400 border border-rose-500/20">
                Live
              </span>
            </div>

            {/* City Selector Pill */}
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="flex items-center gap-1 text-left mt-0.5 text-xs text-slate-300 hover:text-white transition-colors group"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-slate-200">{selectedCity.name}</span>
              <span className="text-slate-500 hidden sm:inline">• {selectedCity.popularLocalities[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Center: Search pill (Desktop / Tablet) */}
        <button
          onClick={() => {
            playSound('click');
            setIsSearchOpen(true);
          }}
          className="hidden md:flex items-center gap-2.5 flex-1 max-w-md px-3.5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 text-xs transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="truncate">Search movies, concerts, dining, standup...</span>
          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400 border border-white/10">
            ⌘K
          </span>
        </button>

        {/* Right Actions: Search Icon (mobile), Scanner, Profile */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              playSound('click');
              setIsSearchOpen(true);
            }}
            className="md:hidden p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Gatekeeper Scanner Modal Trigger */}
          <button
            onClick={() => {
              playSound('click');
              setIsScannerOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-rose-500/20 hover:border-rose-500/40 border border-white/[0.1] text-xs font-medium text-slate-200 transition-all group"
            title="Gatekeeper Pass Scanner"
          >
            <QrCode className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Gate Scanner</span>
          </button>

          {/* User Profile Avatar with VIP ring */}
          <div className="relative cursor-pointer group" onClick={() => playSound('pop')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 p-[1.5px] shadow-sm">
              <div className="w-full h-full rounded-full bg-[#121620] flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                PG
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090C12] rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
