'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, ShieldCheck, Tag, CreditCard, Smartphone, Building, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { Booking, BookingType } from '@/types';
import { useDistrict } from '@/context/DistrictContext';
import { playSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface CheckoutItemDetails {
  type: BookingType;
  title: string;
  venue: string;
  locality: string;
  dateTime: string;
  posterOrImage: string;
  seats?: string[];
  guestCount?: number;
  tierName?: string;
  baseAmount: number;
  fnbItems?: { name: string; quantity: number; price: number }[];
  fnbTotal?: number;
}

export const CheckoutModal = ({
  details,
  onClose,
  onSuccess
}: {
  details: CheckoutItemDetails | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}) => {
  const { addBooking, clearSeatLock, seatLock, selectedCity } = useDistrict();
  const [promoCode, setPromoCode] = useState('DISTRICTNEW');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>({
    code: 'DISTRICTNEW',
    discount: 100
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(480); // 8 minutes in seconds

  useEffect(() => {
    if (!seatLock) return;
    const updateCountdown = () => {
      const remainingMs = Math.max(0, seatLock.expiresAt - Date.now());
      const remainingSec = Math.floor(remainingMs / 1000);
      setTimeLeft(remainingSec);
      if (remainingSec <= 0) {
        playSound('lock');
        alert('Seat lock expired! Please select your seats again.');
        clearSeatLock();
        onClose();
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [seatLock, clearSeatLock, onClose]);

  if (!details) return null;

  const fnbTotal = details.fnbTotal || 0;
  const convenienceFee = details.type === 'dining' ? 0 : 42;
  const gstOnFee = Math.round(convenienceFee * 0.18);
  const subtotal = details.baseAmount + fnbTotal + convenienceFee + gstOnFee;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalPayable = Math.max(0, subtotal - discountAmount);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'DISTRICTNEW') {
      setAppliedPromo({ code: 'DISTRICTNEW', discount: 100 });
      playSound('success');
    } else if (promoCode.trim().toUpperCase() === 'ZOMATOPAY') {
      setAppliedPromo({ code: 'ZOMATOPAY', discount: 150 });
      playSound('success');
    } else {
      playSound('lock');
      alert('Invalid promo code. Try "DISTRICTNEW" or "ZOMATOPAY"');
    }
  };

  const handlePay = () => {
    setIsProcessing(true);
    playSound('select');

    setTimeout(() => {
      const randomCode = 'DST-' + Math.floor(100000 + Math.random() * 900000);
      const newBooking: Booking = {
        id: 'dst-' + Date.now(),
        bookingCode: randomCode,
        type: details.type,
        title: details.title,
        venue: details.venue,
        locality: details.locality,
        dateTime: details.dateTime,
        city: selectedCity.name,
        qrPayload: `VALID_${randomCode}_${details.type.toUpperCase()}_TOTAL_${finalPayable}`,
        seats: details.seats,
        guestCount: details.guestCount || (details.seats ? details.seats.length : 1),
        tierName: details.tierName,
        totalAmount: finalPayable,
        discountAmount,
        fnbSummary: details.fnbItems?.map((x) => ({ name: x.name, quantity: x.quantity })),
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        posterOrImage: details.posterOrImage
      };

      addBooking(newBooking);
      clearSeatLock();
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-xl bg-[#111622] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Seat-Lock Bar */}
        <div className="p-4 border-b border-white/[0.08] bg-[#141B2A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Review & Checkout</h3>
          </div>
          <button
            onClick={() => {
              clearSeatLock();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Seat Hold Timer Banner */}
        {details.seats && details.seats.length > 0 && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Seats locked for you</span>
            </span>
            <span className="font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
              {formatTimer(timeLeft)}
            </span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 flex-1">
          {/* Item Summary Card */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] flex gap-3.5">
            <img
              src={details.posterOrImage}
              alt={details.title}
              className="w-16 h-20 object-cover rounded-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 uppercase tracking-wider">
                {details.type}
              </span>
              <h4 className="text-sm font-bold text-white mt-1 truncate">{details.title}</h4>
              <p className="text-xs text-slate-400 truncate">{details.venue}</p>
              <p className="text-xs text-slate-300 font-medium mt-1">{details.dateTime}</p>

              {/* Seats or Tier info */}
              {details.seats && (
                <p className="text-xs text-rose-400 font-bold mt-1">
                  Seats: {details.seats.join(', ')} ({details.seats.length} Tickets)
                </p>
              )}
              {details.tierName && !details.seats && (
                <p className="text-xs text-violet-400 font-bold mt-1">
                  Tier: {details.tierName} ({details.guestCount} Passes)
                </p>
              )}
            </div>
          </div>

          {/* F&B Breakdown if selected */}
          {details.fnbItems && details.fnbItems.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Snacks & Beverages</h5>
              {details.fnbItems.map((fnb) => (
                <div key={fnb.name} className="flex items-center justify-between text-xs text-slate-400">
                  <span>{fnb.quantity}x {fnb.name}</span>
                  <span className="text-slate-200">₹{fnb.price * fnb.quantity}</span>
                </div>
              ))}
            </div>
          )}

          {/* Promo Code Input */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-rose-500 shrink-0" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter Promo Code"
                className="w-full bg-transparent text-xs text-white uppercase placeholder-slate-500 focus:outline-none font-mono"
              />
              <button
                onClick={handleApplyPromo}
                className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/40 text-xs font-bold transition-all shrink-0"
              >
                APPLY
              </button>
            </div>
            {appliedPromo && (
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                &apos;{appliedPromo.code}&apos; applied! You saved ₹{appliedPromo.discount}
              </p>
            )}
          </div>

          {/* Payment Method Selector */}
          <div>
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Payment Method
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedPaymentMethod('upi');
                  playSound('click');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedPaymentMethod === 'upi'
                    ? 'bg-rose-500/10 border-rose-500 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <Smartphone className="w-5 h-5 text-rose-400" />
                <span className="text-[11px] font-bold">UPI / GPay</span>
              </button>

              <button
                onClick={() => {
                  setSelectedPaymentMethod('card');
                  playSound('click');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedPaymentMethod === 'card'
                    ? 'bg-rose-500/10 border-rose-500 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <CreditCard className="w-5 h-5 text-violet-400" />
                <span className="text-[11px] font-bold">Card</span>
              </button>

              <button
                onClick={() => {
                  setSelectedPaymentMethod('netbanking');
                  playSound('click');
                }}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  selectedPaymentMethod === 'netbanking'
                    ? 'bg-rose-500/10 border-rose-500 text-white'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.04]'
                }`}
              >
                <Building className="w-5 h-5 text-emerald-400" />
                <span className="text-[11px] font-bold">Net Banking</span>
              </button>
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Ticket Base Fare</span>
              <span className="text-white">₹{details.baseAmount}</span>
            </div>

            {fnbTotal > 0 && (
              <div className="flex items-center justify-between text-slate-400">
                <span>Food & Beverages</span>
                <span className="text-white">₹{fnbTotal}</span>
              </div>
            )}

            {convenienceFee > 0 && (
              <div className="flex items-center justify-between text-slate-400">
                <span>Convenience Fee</span>
                <span className="text-white">₹{convenienceFee}</span>
              </div>
            )}

            {gstOnFee > 0 && (
              <div className="flex items-center justify-between text-slate-400">
                <span>Integrated GST (18%)</span>
                <span className="text-white">₹{gstOnFee}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                <span>District Promo Discount</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-base font-black text-rose-500">
                ₹{finalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block">Total Payable</span>
            <span className="text-base font-black text-white">
              ₹{finalPayable.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="animate-pulse">Authorizing Payment...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Pay ₹{finalPayable.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
