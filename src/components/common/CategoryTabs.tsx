'use client';

import React from 'react';
import { Sparkles, Film, Ticket, Utensils, Gamepad2 } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';
import { CategoryTab } from '@/types';

interface TabItem {
  id: CategoryTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const TABS: TabItem[] = [
  { id: 'all', label: 'For You', icon: Sparkles },
  { id: 'movies', label: 'Movies', icon: Film, badge: 'IMAX' },
  { id: 'events', label: 'Events', icon: Ticket, badge: 'Hot' },
  { id: 'dining', label: 'Dining Out', icon: Utensils, badge: '25% Off' },
  { id: 'play', label: 'Play', icon: Gamepad2 }
];

export const CategoryTabs = () => {
  const { activeTab, setActiveTab } = useDistrict();

  return (
    <div className="w-full border-b border-white/[0.06] bg-[#090C12]/95 backdrop-blur-md sticky top-[57px] z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md shadow-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06] bg-white/[0.03] border border-white/[0.05]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tight ${
                      isActive
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
