'use client';

import React from 'react';
import { QrCode, Calendar, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { Booking } from '@/types';
import { playSound } from '@/lib/sound';

export const TicketPassCard = ({
  booking,
  onSelect
}: {
  booking: Booking;
  onSelect: (booking: Booking) => void;
}) => {
  return (
    <div
      onClick={() => {
        playSound('click');
        onSelect(booking);
      }}
      className="relative bg-[#131926] border border-white/[0.08] hover:border-rose-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 group"
    >
      {/* Top Section */}
      <div className="p-4 flex gap-3.5 items-start">
        <img
          src={booking.posterOrImage}
          alt={booking.title}
          className="w-16 h-20 object-cover rounded-xl shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 uppercase tracking-wider">
              {booking.type}
            </span>

            {/* Status indicator */}
            {booking.status === 'CONFIRMED' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Pass
              </span>
            )}
            {booking.status === 'CHECKED_IN' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                Checked In
              </span>
            )}
            {booking.status === 'CANCELLED' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-rose-400" />
                Cancelled
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-white mt-1 group-hover:text-rose-400 transition-colors truncate">
            {booking.title}
          </h3>

          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 truncate">
            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
            <span>{booking.venue}</span>
          </p>

          <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-rose-400 shrink-0" />
            <span>{booking.dateTime}</span>
          </p>
        </div>
      </div>

      {/* Ticket Perforation Holes */}
      <div className="relative flex items-center justify-between px-2">
        <div className="w-5 h-5 rounded-full bg-[#090C12] -ml-5 border-r border-white/[0.08]" />
        <div className="flex-1 border-b border-dashed border-white/20 mx-2" />
        <div className="w-5 h-5 rounded-full bg-[#090C12] -mr-5 border-l border-white/[0.08]" />
      </div>

      {/* Bottom Section */}
      <div className="p-3.5 bg-white/[0.015] flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">
            Booking ID
          </span>
          <span className="font-mono font-bold text-slate-200">{booking.bookingCode}</span>
        </div>

        {booking.seats && (
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">
              Seats
            </span>
            <span className="font-bold text-rose-400">{booking.seats.join(', ')}</span>
          </div>
        )}

        {booking.guestCount && !booking.seats && (
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-wider">
              Guests
            </span>
            <span className="font-bold text-violet-400">{booking.guestCount} Passes</span>
          </div>
        )}

        <div className="p-2 rounded-lg bg-white/[0.05] group-hover:bg-rose-500/20 text-slate-300 group-hover:text-rose-400 transition-colors">
          <QrCode className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
