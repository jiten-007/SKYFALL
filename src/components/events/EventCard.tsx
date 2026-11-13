'use client';

import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { EventItem } from '@/types';
import { playSound } from '@/lib/sound';

export const EventCard = ({
  event,
  onSelect
}: {
  event: EventItem;
  onSelect: (event: EventItem) => void;
}) => {
  return (
    <div
      onClick={() => {
        playSound('click');
        onSelect(event);
      }}
      className="group relative bg-[#121824] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col"
    >
      {/* Event Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

        {/* Category Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-bold text-violet-400">
          {event.category}
        </div>

        {/* Filling fast indicator */}
        {event.fillingFast && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-rose-500/90 text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
            Filling Fast
          </div>
        )}

        {/* Date badge on bottom-left */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
          <Calendar className="w-3.5 h-3.5 text-violet-400" />
          <span>{event.date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white group-hover:text-violet-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{event.venue}, {event.locality}</span>
          </p>
        </div>

        {/* Bottom Price & Action */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Starts from</span>
            <span className="text-xs font-bold text-white">₹{event.minPrice.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onSelect(event);
            }}
            className="px-3.5 py-1 rounded-full bg-violet-600/10 hover:bg-violet-600 text-violet-400 hover:text-white border border-violet-500/30 text-xs font-semibold transition-all group-hover:bg-violet-600 group-hover:text-white"
          >
            Get Passes
          </button>
        </div>
      </div>
    </div>
  );
};
