'use client';

import React, { useState } from 'react';
import { X, Plus, Minus, Popcorn, ArrowRight } from 'lucide-react';
import { MOCK_FNB_ITEMS } from '@/data/mockData';
import { FnBItem } from '@/types';
import { playSound } from '@/lib/sound';

export const FnBModal = ({
  movieTitle,
  seatCount,
  onClose,
  onProceedToCheckout
}: {
  movieTitle: string;
  seatCount: number;
  onClose: () => void;
  onProceedToCheckout: (items: { item: FnBItem; quantity: number }[], totalFnbAmount: number) => void;
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleUpdateQty = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (delta > 0) playSound('select');
      else playSound('pop');
      return { ...prev, [itemId]: next };
    });
  };

  const selectedItems = MOCK_FNB_ITEMS.map((item) => ({
    item,
    quantity: quantities[item.id] || 0
  })).filter((x) => x.quantity > 0);

  const totalFnbAmount = selectedItems.reduce((sum, x) => sum + x.item.price * x.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-2xl bg-[#111622] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141B2A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Popcorn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Grab a Bite</h3>
              <p className="text-xs text-slate-400">
                Pre-order snacks & drinks for <span className="text-slate-200">{movieTitle}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-3.5 flex-1">
          {MOCK_FNB_ITEMS.map((fnb) => {
            const qty = quantities[fnb.id] || 0;

            return (
              <div
                key={fnb.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.12] flex items-center gap-3.5"
              >
                <img
                  src={fnb.image}
                  alt={fnb.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {/* Veg Indicator */}
                    <span className="w-3.5 h-3.5 rounded border border-emerald-500 flex items-center justify-center p-0.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{fnb.name}</h4>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {fnb.description}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs font-black text-white">₹{fnb.price}</span>
                    {fnb.tag && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {fnb.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Counter */}
                <div className="shrink-0">
                  {qty === 0 ? (
                    <button
                      onClick={() => handleUpdateQty(fnb.id, 1)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-bold transition-all"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 rounded-lg p-1 text-white">
                      <button
                        onClick={() => handleUpdateQty(fnb.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-rose-500/30"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold min-w-[14px] text-center">{qty}</span>
                      <button
                        onClick={() => handleUpdateQty(fnb.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-rose-500/30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playSound('click');
              onProceedToCheckout([], 0);
            }}
            className="text-xs font-bold text-slate-400 hover:text-white py-2 px-3 transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={() => {
              playSound('click');
              onProceedToCheckout(selectedItems, totalFnbAmount);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all"
          >
            <span>Proceed to Checkout</span>
            {totalFnbAmount > 0 && (
              <span className="text-rose-200 text-xs">• ₹{totalFnbAmount}</span>
            )}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
