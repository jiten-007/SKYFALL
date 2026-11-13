'use client';

import React, { useState } from 'react';
import { Ticket, Sparkles, Film, ArrowRight } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';
import { Booking } from '@/types';
import { TicketPassCard } from './TicketPassCard';
import { TicketDetailModal } from './TicketDetailModal';
import { playSound } from '@/lib/sound';

export const WalletView = () => {
  const { bookings, setActiveView, setActiveTab } = useDistrict();
  const [filter, setFilter] = useState<'active' | 'history'>('active');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const historyBookings = bookings.filter((b) => b.status !== 'CONFIRMED');

  const displayedList = filter === 'active' ? activeBookings : historyBookings;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Ticket className="w-6 h-6 text-rose-500" />
            My Passes & Wallet
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Access your movie tickets, concert passes, and dining vouchers
          </p>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <button
          onClick={() => {
            setFilter('active');
            playSound('click');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            filter === 'active'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Active Passes ({activeBookings.length})
        </button>

        <button
          onClick={() => {
            setFilter('history');
            playSound('click');
          }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            filter === 'history'
              ? 'bg-white/10 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Booking History ({historyBookings.length})
        </button>
      </div>

      {/* List */}
      {displayedList.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-[#111622] rounded-2xl border border-white/[0.06] p-6">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-white">
            {filter === 'active' ? 'No Active Passes Found' : 'No Past Bookings'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Ready to explore? Book tickets for the latest IMAX blockbusters or live concerts.
          </p>
          <button
            onClick={() => {
              setActiveView('explore');
              setActiveTab('movies');
              playSound('click');
            }}
            className="px-5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-500/20 inline-flex items-center gap-2 transition-all"
          >
            <Film className="w-4 h-4" />
            <span>Explore Movies</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {displayedList.map((booking) => (
            <TicketPassCard
              key={booking.id}
              booking={booking}
              onSelect={(b) => setSelectedBooking(b)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <TicketDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};
