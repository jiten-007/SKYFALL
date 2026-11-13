'use client';

import React, { useState } from 'react';
import { X, Tag, ShieldCheck, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { RestaurantItem, Booking } from '@/types';
import { useDistrict } from '@/context/DistrictContext';
import { playSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export const DistrictPayCalculator = ({
  restaurant,
  onClose,
  onSuccess
}: {
  restaurant: RestaurantItem | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}) => {
  const { addBooking, selectedCity } = useDistrict();
  const [billAmount, setBillAmount] = useState<number>(2400);
  const [appliedBankCard, setAppliedBankCard] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!restaurant) return null;

  const partnerDiscount = Math.min(
    restaurant.maxDiscount || 500,
    Math.round(billAmount * (restaurant.discountPercentage / 100))
  );

  const bankCardDiscount = appliedBankCard && billAmount >= 1500 ? 150 : 0;
  const totalSavings = partnerDiscount + bankCardDiscount;
  const netPayable = Math.max(0, billAmount - totalSavings);

  const handlePay = () => {
    setIsProcessing(true);
    playSound('select');

    setTimeout(() => {
      const code = 'DST-PAY' + Math.floor(10000 + Math.random() * 90000);
      const newBooking: Booking = {
        id: 'dst-' + Date.now(),
        bookingCode: code,
        type: 'dining',
        title: `Bill Paid @ ${restaurant.name}`,
        venue: restaurant.name,
        locality: restaurant.locality + ', ' + selectedCity.name,
        dateTime: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        city: selectedCity.name,
        qrPayload: `VALID_PAYMENT_${code}_BILL_${billAmount}_PAID_${netPayable}`,
        guestCount: 2,
        tierName: `Skyfall Pay: Saved ₹${totalSavings}`,
        totalAmount: netPayable,
        discountAmount: totalSavings,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        posterOrImage: restaurant.image
      };

      addBooking(newBooking);
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onSuccess(newBooking);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-[#111622] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#141B2A]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black uppercase tracking-wider bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              skyfall pay
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Live Discount
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          <div>
            <h4 className="text-xs text-slate-400">Paying at</h4>
            <h3 className="text-base font-bold text-white">{restaurant.name}</h3>
            <p className="text-xs text-slate-400">{restaurant.locality}</p>
          </div>

          {/* Enter Bill Amount */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
              Enter Bill Amount
            </span>
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-slate-400">₹</span>
              <input
                type="number"
                value={billAmount || ''}
                onChange={(e) => setBillAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-40 text-3xl font-black text-white bg-transparent text-center focus:outline-none"
              />
            </div>

            {/* Quick buttons */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {[1500, 2500, 4000, 6000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setBillAmount(amt);
                    playSound('click');
                  }}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                    billAmount === amt
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Savings Breakdown */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-500/10 via-white/[0.02] to-amber-500/10 border border-rose-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Original Bill</span>
              <span className="text-white font-medium">₹{billAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                District Partner Offer ({restaurant.discountPercentage}%)
              </span>
              <span>-₹{partnerDiscount.toLocaleString('en-IN')}</span>
            </div>

            {/* Bank Card Toggle */}
            <div
              onClick={() => {
                setAppliedBankCard(!appliedBankCard);
                playSound('click');
              }}
              className="flex items-center justify-between text-xs cursor-pointer pt-1 border-t border-white/[0.05]"
            >
              <div className="flex items-center gap-1.5 text-slate-300">
                <input
                  type="checkbox"
                  checked={appliedBankCard}
                  onChange={() => {}}
                  className="rounded accent-rose-500 cursor-pointer"
                />
                <span>HDFC / ICICI Bank Card (Extra ₹150 off)</span>
              </div>
              <span className="text-emerald-400 font-medium">
                {appliedBankCard ? '-₹150' : '₹0'}
              </span>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">You Pay</span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Total Saved: ₹{totalSavings}
                </span>
              </div>
              <span className="text-lg font-black text-rose-400">
                ₹{netPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A]">
          <button
            onClick={handlePay}
            disabled={isProcessing || billAmount <= 0}
            className="w-full py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-rose-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="animate-pulse">Authorizing Skyfall Pay...</span>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹{netPayable.toLocaleString('en-IN')} via Skyfall Pay</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
