'use client';

import React from 'react';
import { Star, Clock, MapPin, Gamepad2 } from 'lucide-react';
import { PlayActivity } from '@/types';
import { playSound } from '@/lib/sound';

export const PlayCard = ({
  activity,
  onBook
}: {
  activity: PlayActivity;
  onBook: (activity: PlayActivity) => void;
}) => {
  return (
    <div
      onClick={() => {
        playSound('click');
        onBook(activity);
      }}
      className="group relative bg-[#121824] border border-white/[0.08] hover:border-amber-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

        {activity.tag && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-black uppercase tracking-wider shadow-sm">
            {activity.tag}
          </div>
        )}

        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
          <Star className="w-3 h-3 text-amber-400 fill-current" />
          <span>{activity.rating}</span>
        </div>
      </div>

      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            {activity.category}
          </span>
          <h3 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1 mt-0.5">
            {activity.title}
          </h3>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{activity.locality}</span>
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">From</span>
            <span className="text-xs font-bold text-white">₹{activity.pricePerPerson} / person</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onBook(activity);
            }}
            className="px-3.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 text-xs font-semibold transition-all group-hover:bg-amber-500 group-hover:text-black font-bold"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};
