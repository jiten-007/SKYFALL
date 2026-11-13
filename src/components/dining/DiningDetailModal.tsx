'use client';

import React from 'react';
import { X, Star, MapPin, Clock, Tag, Utensils, CalendarCheck, CreditCard, Sparkles } from 'lucide-react';
import { RestaurantItem } from '@/types';
import { playSound } from '@/lib/sound';

export const DiningDetailModal = ({
  restaurant,
  onClose,
  onOpenTableBooking,
  onOpenDistrictPay
}: {
  restaurant: RestaurantItem | null;
  onClose: () => void;
  onOpenTableBooking: (restaurant: RestaurantItem) => void;
  onOpenDistrictPay: (restaurant: RestaurantItem) => void;
}) => {
  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-3xl bg-[#10141E] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with close button */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden shrink-0 bg-slate-900">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141E] via-[#10141E]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
                  {restaurant.discountPercentage}% OFF VIA SKYFALL PAY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{restaurant.name}</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {restaurant.cuisines.join(' • ')} • ₹{restaurant.costForTwo} for two
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
              <Star className="w-4 h-4 text-emerald-400 fill-current" />
              <span className="font-bold text-sm">{restaurant.rating}</span>
              <span className="text-xs text-slate-400">({restaurant.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Skyfall Pay Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-500/20 via-rose-500/10 to-amber-500/20 border border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Tag className="w-5 h-5 text-rose-400" />
              <div>
                <h5 className="text-xs font-bold text-white">{restaurant.discountText}</h5>
                <p className="text-[11px] text-slate-300">
                  Pay through the Skyfall app at the restaurant to claim instant discount.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playSound('click');
                onOpenDistrictPay(restaurant);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md transition-all shrink-0 ml-2"
            >
              Pay Bill
            </button>
          </div>

          {/* Quick info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">{restaurant.address}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{restaurant.timing}</span>
            </div>
          </div>

          {/* Features Chips */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amenities & Vibe</h4>
            <div className="flex flex-wrap gap-2">
              {restaurant.features.map((feat) => (
                <span
                  key={feat}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Menu Highlights */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-emerald-400" />
              Popular Menu Highlights
            </h4>
            <div className="space-y-2">
              {restaurant.menuHighlights.map((dish) => (
                <div
                  key={dish.name}
                  className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded border flex items-center justify-center p-0.5 shrink-0 ${
                        dish.isVeg ? 'border-emerald-500' : 'border-rose-500'
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    </span>
                    <span className="text-xs font-medium text-white">{dish.name}</span>
                    {dish.isBestseller && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-300">₹{dish.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playSound('click');
              onOpenDistrictPay(restaurant);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-xs sm:text-sm font-bold transition-all"
          >
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span>Skyfall Pay</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenTableBooking(restaurant);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};
