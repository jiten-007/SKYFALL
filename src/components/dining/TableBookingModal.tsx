'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Check, Sparkles } from 'lucide-react';
import { RestaurantItem, Booking } from '@/types';
import { useDistrict } from '@/context/DistrictContext';
import { playSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export const TableBookingModal = ({
  restaurant,
  onClose,
  onSuccess
}: {
  restaurant: RestaurantItem | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}) => {
  const { addBooking, selectedCity } = useDistrict();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState('08:00 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!restaurant) return null;

  const dates = [
    { label: 'Today', sub: '13 Nov' },
    { label: 'Tomorrow', sub: '14 Nov' },
    { label: 'Fri', sub: '15 Nov' },
    { label: 'Sat', sub: '16 Nov' }
  ];

  const slots = [
    { time: '12:30 PM', meal: 'Lunch' },
    { time: '01:15 PM', meal: 'Lunch' },
    { time: '02:00 PM', meal: 'Lunch' },
    { time: '07:30 PM', meal: 'Dinner' },
    { time: '08:00 PM', meal: 'Dinner' },
    { time: '08:45 PM', meal: 'Dinner' },
    { time: '09:30 PM', meal: 'Dinner' }
  ];

  const handleConfirmReservation = () => {
    setIsSubmitting(true);
    playSound('select');

    setTimeout(() => {
      const code = 'DST-TB' + Math.floor(10000 + Math.random() * 90000);
      const newBooking: Booking = {
        id: 'dst-' + Date.now(),
        bookingCode: code,
        type: 'dining',
        title: restaurant.name,
        venue: restaurant.name,
        locality: restaurant.locality + ', ' + selectedCity.name,
        dateTime: `${dates[selectedDateIndex].label}, ${selectedSlot}`,
        city: selectedCity.name,
        qrPayload: `VALID_DINING_${code}_${restaurant.id}_GUESTS_${guestCount}`,
        guestCount,
        tierName: `Reserved Table for ${guestCount}`,
        totalAmount: 0, // Table reservations are free
        discountAmount: restaurant.discountPercentage,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        posterOrImage: restaurant.image
      };

      addBooking(newBooking);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onSuccess(newBooking);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-xl bg-[#111622] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#141B2A]">
          <div>
            <h3 className="text-base font-bold text-white">Reserve a Table</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {restaurant.name} • {restaurant.locality}
            </p>
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
          {/* Date Selector */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Date</h4>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {dates.map((d, idx) => {
                const isSelected = selectedDateIndex === idx;
                return (
                  <button
                    key={d.sub}
                    onClick={() => {
                      setSelectedDateIndex(idx);
                      playSound('click');
                    }}
                    className={`flex flex-col items-center min-w-[76px] py-2 px-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-xs font-semibold">{d.label}</span>
                    <span className="text-[10px] opacity-80">{d.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guest Count */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Number of Guests</h4>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => {
                const isSelected = guestCount === num;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      setGuestCount(num);
                      playSound('click');
                    }}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Available Slots</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s) => {
                const isSelected = selectedSlot === s.time;
                return (
                  <button
                    key={s.time}
                    onClick={() => {
                      setSelectedSlot(s.time);
                      playSound('click');
                    }}
                    className={`p-2 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.time}</span>
                    <span className="text-[10px] text-slate-400 opacity-80">{s.meal}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Special Requests (Optional)</h4>
            <input
              type="text"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="e.g. Quiet corner table, high chair, birthday celebration"
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Guaranteed Reservation Info */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300">
              Guaranteed Table Holding for 15 minutes past reservation time. Instant digital confirmation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#141B2A] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Table Reservation</span>
            <span className="text-xs font-bold text-emerald-400">FREE CONFIRMATION</span>
          </div>

          <button
            onClick={handleConfirmReservation}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 active:scale-95"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Confirming...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
