'use client';

import React from 'react';
import { Star, MapPin, Tag } from 'lucide-react';
import { RestaurantItem } from '@/types';
import { playSound } from '@/lib/sound';

export const DiningCard = ({
  restaurant,
  onSelect
}: {
  restaurant: RestaurantItem;
  onSelect: (restaurant: RestaurantItem) => void;
}) => {
  return (
    <div
      onClick={() => {
        playSound('click');
        onSelect(restaurant);
      }}
      className="group relative bg-[#121824] border border-white/[0.08] hover:border-emerald-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col"
    >
      {/* Image with discount badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

        {/* District Pay Discount Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
          <Tag className="w-3 h-3" />
          <span>{restaurant.discountPercentage}% OFF</span>
        </div>

        {/* Rating Pill */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
          <Star className="w-3 h-3 text-emerald-400 fill-current" />
          <span>{restaurant.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({restaurant.reviewsCount})</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {restaurant.name}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
            {restaurant.cuisines.join(' • ')}
          </p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span className="truncate">{restaurant.locality}</span>
          </p>
        </div>

        {/* Cost & Action */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            ₹{restaurant.costForTwo.toLocaleString('en-IN')} for two
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onSelect(restaurant);
            }}
            className="px-3.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-semibold transition-all group-hover:bg-emerald-500 group-hover:text-white"
          >
            Explore & Book
          </button>
        </div>
      </div>
    </div>
  );
};
