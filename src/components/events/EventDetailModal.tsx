'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { EventItem } from '@/types';
import { playSound } from '@/lib/sound';

export const EventDetailModal = ({
  event,
  onClose,
  onProceedToCheckout
}: {
  event: EventItem | null;
  onClose: () => void;
  onProceedToCheckout: (
    event: EventItem,
    selectedTier: EventItem['tiers'][0],
    quantity: number,
    totalAmount: number
  ) => void;
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!event) return null;

  const currentTier = event.tiers.find((t) => t.id === selectedTierId) || event.tiers[0];
  const tierPrice = currentTier.price;
  const totalAmount = tierPrice * quantity;

  const handleUpdateQty = (delta: number) => {
    const next = Math.max(1, Math.min(6, quantity + delta));
    setQuantity(next);
    if (delta > 0) playSound('select');
    else playSound('pop');
  };

  const handleBook = () => {
    playSound('click');
    onProceedToCheckout(event, currentTier, quantity, totalAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-3xl bg-[#10141E] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with close button */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden shrink-0 bg-slate-900">
          <img
            src={event.banner || event.image}
            alt={event.title}
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
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-600 text-white uppercase tracking-wider">
              {event.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">{event.title}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-violet-400" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {event.venue}, {event.locality}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Ticket Tier Selector */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Select Ticket Tier
            </h4>
            <div className="space-y-2.5">
              {event.tiers.map((tier) => {
                const isSelected = (selectedTierId || event.tiers[0].id) === tier.id;

                return (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTierId(tier.id);
                      playSound('select');
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-violet-600/10 border-violet-500 shadow-md shadow-violet-500/10'
                        : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-white">{tier.name}</h5>
                          <span className="text-[10px] font-semibold text-emerald-400">
                            {tier.availableCount} passes left
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{tier.description}</p>
                      </div>
                      <span className="text-sm font-black text-white">
                        ₹{tier.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Tier Benefits */}
                    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/[0.05]">
                      {tier.benefits.map((b) => (
                        <span
                          key={b}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 flex items-center gap-1"
                        >
                          <CheckCircle className="w-2.5 h-2.5 text-violet-400" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Artist Lineup */}
          {event.artists.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Artist Lineup
              </h4>
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                {event.artists.map((artist) => (
                  <div key={artist.name} className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] p-2 rounded-xl pr-4">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-10 h-10 rounded-full object-cover border border-violet-500/30"
                    />
                    <div>
                      <h6 className="text-xs font-bold text-white">{artist.name}</h6>
                      <span className="text-[10px] text-violet-400">{artist.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Event */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About The Experience</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{event.about}</p>
          </div>

          {/* Venue Guidelines */}
          {event.guidelines && event.guidelines.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Venue Guidelines
              </h4>
              <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                {event.guidelines.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A] flex items-center justify-between gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">Passes:</span>
            <div className="flex items-center gap-2.5 bg-white/[0.05] border border-white/[0.1] rounded-lg p-1 text-white">
              <button
                onClick={() => handleUpdateQty(-1)}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-slate-300"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold min-w-[16px] text-center">{quantity}</span>
              <button
                onClick={() => handleUpdateQty(1)}
                className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 text-slate-300"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-black text-white block">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400">({currentTier.name})</span>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-violet-600/30 transition-all active:scale-95"
          >
            <span>Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
