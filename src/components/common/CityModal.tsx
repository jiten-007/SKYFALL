'use client';

import React from 'react';
import { X, Check, MapPin } from 'lucide-react';
import { CITIES } from '@/data/mockData';
import { useDistrict } from '@/context/DistrictContext';
import { CityId } from '@/types';

export const CityModal = () => {
  const { isCityModalOpen, setIsCityModalOpen, selectedCity, setSelectedCityId } = useDistrict();

  if (!isCityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-lg bg-[#121824] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              Select Your City
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Discover cinema showtimes, events & dining in your region
            </p>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {CITIES.map((city) => {
            const isSelected = selectedCity.id === city.id;

            return (
              <div
                key={city.id}
                onClick={() => {
                  setSelectedCityId(city.id as CityId);
                  setIsCityModalOpen(false);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500/50 shadow-md shadow-rose-500/10'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{city.name}</span>
                    {city.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {city.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{city.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {city.popularLocalities.slice(0, 3).map((loc) => (
                      <span
                        key={loc}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.04]"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
