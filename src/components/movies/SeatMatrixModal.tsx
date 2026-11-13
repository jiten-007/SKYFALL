'use client';

import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, Info, ChevronRight } from 'lucide-react';
import { Movie, CinemaTheater, MovieShow, Seat } from '@/types';
import { generateCinemaSeats } from '@/lib/seatGenerator';
import { playSound } from '@/lib/sound';
import { useDistrict } from '@/context/DistrictContext';

export const SeatMatrixModal = ({
  movie,
  theater,
  show,
  dateStr,
  onClose,
  onProceedToFnB
}: {
  movie: Movie;
  theater: CinemaTheater;
  show: MovieShow;
  dateStr: string;
  onClose: () => void;
  onProceedToFnB: (selectedSeats: Seat[], totalSeatAmount: number) => void;
}) => {
  const { startSeatLock } = useDistrict();
  const seatsData = useMemo(() => generateCinemaSeats(show.id), [show.id]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Toggle seat selection
  const handleToggleSeat = (seat: Seat) => {
    if (seat.status === 'booked' || seat.status === 'locked') {
      playSound('lock');
      return;
    }

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
      playSound('pop');
    } else {
      if (selectedSeatIds.length >= 8) {
        playSound('lock');
        alert('You can select a maximum of 8 seats per booking.');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
      playSound('select');
    }
  };

  const selectedSeats = useMemo(() => {
    return seatsData.filter((s) => selectedSeatIds.includes(s.id));
  }, [seatsData, selectedSeatIds]);

  const totalSeatAmount = useMemo(() => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }, [selectedSeats]);

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    playSound('click');
    startSeatLock(show.id, selectedSeatIds);
    onProceedToFnB(selectedSeats, totalSeatAmount);
  };

  // Group seats by tier and row
  const tiers = ['Recliner', 'Prime', 'Classic'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-4xl bg-[#0D111A] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between bg-[#111622]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{movie.title}</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {show.format}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {theater.name} • {dateStr}, {show.time} ({show.screenName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-5 py-2.5 bg-white/[0.015] border-b border-white/[0.05] flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded border border-white/30 bg-white/[0.06]" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-rose-500 shadow-sm shadow-rose-500/50" />
            <span className="text-white font-medium">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-slate-700/60" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded border border-amber-500/50 bg-amber-500/10" />
            <span>In Checkout</span>
          </div>
        </div>

        {/* Seat Matrix Canvas Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-2xl min-w-[360px] space-y-6">
            {tiers.map((tier) => {
              const tierSeats = seatsData.filter((s) => s.tier === tier);
              const tierRows = Array.from(new Set(tierSeats.map((s) => s.row)));
              const samplePrice = tierSeats[0]?.price || 0;

              return (
                <div key={tier} className="space-y-2">
                  {/* Tier Title & Price */}
                  <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-1">
                    <span className="font-bold text-slate-300 uppercase tracking-wider">
                      {tier}
                    </span>
                    <span className="font-semibold text-rose-400">₹{samplePrice}</span>
                  </div>

                  {/* Rows in this tier */}
                  <div className="space-y-2 pt-1">
                    {tierRows.map((rowName) => {
                      const rowSeats = tierSeats.filter((s) => s.row === rowName);

                      return (
                        <div key={rowName} className="flex items-center justify-center gap-1 sm:gap-2">
                          {/* Row letter */}
                          <span className="w-4 text-[11px] font-bold text-slate-500 text-center shrink-0">
                            {rowName}
                          </span>

                          {/* Seats */}
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            {rowSeats.map((seat, index) => {
                              const isSelected = selectedSeatIds.includes(seat.id);
                              const isBooked = seat.status === 'booked';
                              const isLocked = seat.status === 'locked';

                              // Insert aisle gap between column 4 and 5, and 10 and 11
                              const hasAisleGap = index === 3 || index === 9;

                              return (
                                <React.Fragment key={seat.id}>
                                  <button
                                    onClick={() => handleToggleSeat(seat)}
                                    disabled={isBooked || isLocked}
                                    title={`Seat ${seat.id} - ₹${seat.price}`}
                                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded text-[10px] font-semibold transition-all flex items-center justify-center ${
                                      isSelected
                                        ? 'bg-rose-500 text-white font-bold scale-105 shadow-md shadow-rose-500/40 ring-2 ring-white/50'
                                        : isBooked
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-transparent'
                                        : isLocked
                                        ? 'bg-amber-950/40 text-amber-500/60 border border-amber-500/30 cursor-not-allowed'
                                        : 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 border border-white/[0.15] hover:border-white/40'
                                    }`}
                                  >
                                    {seat.number}
                                  </button>
                                  {hasAisleGap && <div className="w-2 sm:w-4" />}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Cinema Screen Curve */}
            <div className="pt-8 pb-4 flex flex-col items-center">
              <div className="w-4/5 h-2.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-60 shadow-lg shadow-cyan-400/50" />
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                <span>All eyes this way</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 border-t border-white/[0.08] bg-[#101521] flex items-center justify-between gap-4">
          <div>
            {selectedSeats.length === 0 ? (
              <p className="text-xs text-slate-400">Select seats to proceed</p>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    ₹{totalSeatAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'})
                  </span>
                </div>
                <p className="text-[11px] text-rose-400 font-medium truncate max-w-xs sm:max-w-md">
                  {selectedSeats.map((s) => s.id).join(', ')}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleProceed}
            disabled={selectedSeats.length === 0}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              selectedSeats.length > 0
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/25 active:scale-95'
                : 'bg-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
