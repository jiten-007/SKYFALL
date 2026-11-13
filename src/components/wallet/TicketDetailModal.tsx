'use client';

import React from 'react';
import { X, Calendar, MapPin, Share2, Navigation, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Booking } from '@/types';
import { DynamicQRCode } from './DynamicQRCode';
import { useDistrict } from '@/context/DistrictContext';
import { playSound } from '@/lib/sound';

export const TicketDetailModal = ({
  booking,
  onClose
}: {
  booking: Booking | null;
  onClose: () => void;
}) => {
  const { cancelBooking } = useDistrict();

  if (!booking) return null;

  const handleShare = () => {
    playSound('pop');
    if (navigator.share) {
      navigator.share({
        title: booking.title,
        text: `Here is my SKYFALL Pass for ${booking.title} at ${booking.venue}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`SKYFALL Pass: ${booking.title} (${booking.bookingCode})`);
      alert('Pass code copied to clipboard!');
    }
  };

  const handleDirections = () => {
    playSound('click');
    const query = encodeURIComponent(`${booking.venue}, ${booking.locality}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this booking? Refund will be credited within 24 hours.')) {
      cancelBooking(booking.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-[#111622] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#141B2A]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              SKYFALL Digital Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Ticket Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Status Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Status</span>
              <span
                className={`text-xs font-black uppercase tracking-wider flex items-center gap-1 ${
                  booking.status === 'CONFIRMED'
                    ? 'text-emerald-400'
                    : booking.status === 'CHECKED_IN'
                    ? 'text-cyan-400'
                    : 'text-rose-400'
                }`}
              >
                {booking.status === 'CONFIRMED' && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                {booking.status}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Booking Code</span>
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                {booking.bookingCode}
              </span>
            </div>
          </div>

          {/* Dynamic QR Pass */}
          <div className="py-2">
            <DynamicQRCode payload={booking.qrPayload} status={booking.status} />
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Scan this QR code at the turnstile or box office for entry
            </p>
          </div>

          {/* Event / Movie Info */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-3">
            <div>
              <h3 className="font-bold text-base text-white">{booking.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{booking.venue}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.05] text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Date & Time</span>
                <span className="text-slate-200 font-medium">{booking.dateTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Seats / Guests</span>
                <span className="text-rose-400 font-bold">
                  {booking.seats ? booking.seats.join(', ') : `${booking.guestCount} Guests`}
                </span>
              </div>
            </div>

            {booking.fnbSummary && booking.fnbSummary.length > 0 && (
              <div className="pt-2 border-t border-white/[0.05]">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Pre-ordered Snacks</span>
                <div className="flex flex-wrap gap-1.5">
                  {booking.fnbSummary.map((fnb) => (
                    <span
                      key={fnb.name}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {fnb.quantity}x {fnb.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDirections}
              className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4 text-rose-500" />
              <span>Get Directions</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4 text-violet-400" />
              <span>Share Pass</span>
            </button>
          </div>

          {/* Cancel button if active */}
          {booking.status === 'CONFIRMED' && (
            <button
              onClick={handleCancel}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-rose-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Cancel this booking</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
