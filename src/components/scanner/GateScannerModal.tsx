'use client';

import React, { useState } from 'react';
import { X, QrCode, ShieldCheck, AlertCircle, CheckCircle2, Scan, RefreshCw } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';
import { Booking } from '@/types';
import { playSound } from '@/lib/sound';

export const GateScannerModal = () => {
  const { isScannerOpen, setIsScannerOpen, checkInBooking, bookings } = useDistrict();
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    booking?: Booking;
  } | null>(null);

  if (!isScannerOpen) return null;

  const handleScanInput = (code: string) => {
    if (!code.trim()) return;
    const res = checkInBooking(code.trim());
    setScanResult(res);
  };

  const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-lg bg-[#0F1420] border border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#131A29]">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-rose-500 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white">SKYFALL Turnstile Gate Scanner</h3>
              <p className="text-[10px] text-slate-400">Box Office & Turnstile Entry Validator</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsScannerOpen(false);
              setScanResult(null);
            }}
            className="p-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Body */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Animated Scanner Viewport */}
          <div className="relative aspect-square max-w-[260px] mx-auto rounded-2xl bg-black border-2 border-white/20 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Corner guide brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-rose-500 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-rose-500 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-rose-500 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-rose-500 rounded-br-lg" />

            {/* Laser scanning beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-lg shadow-rose-500/80 animate-bounce" />

            <QrCode className="w-24 h-24 text-white/20" />
            <p className="text-[10px] text-slate-400 font-mono mt-3 uppercase tracking-widest text-center">
              Position SKYFALL QR in frame
            </p>
          </div>

          {/* Validation Result Box */}
          {scanResult && (
            <div
              className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
                scanResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {scanResult.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-bold">
                    {scanResult.success ? 'ENTRY GRANTED' : 'ACCESS DENIED'}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">{scanResult.message}</p>

                  {scanResult.booking && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/10 text-xs space-y-1">
                      <p className="font-bold text-white">{scanResult.booking.title}</p>
                      <p className="text-slate-300">
                        {scanResult.booking.seats
                          ? `Seats: ${scanResult.booking.seats.join(', ')}`
                          : `Passes: ${scanResult.booking.guestCount || 1}`}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Code: {scanResult.booking.bookingCode} • {scanResult.booking.venue}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Test Simulator - Click any active booking to test scanner */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Quick Test Scanner Simulator</span>
              <span className="text-[10px] text-rose-400 font-normal">Click to simulate scan</span>
            </h4>

            {activeBookings.length === 0 ? (
              <p className="text-xs text-slate-500 py-1">
                No active confirmed tickets available. Book a ticket first to test check-in!
              </p>
            ) : (
              <div className="space-y-1.5">
                {activeBookings.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleScanInput(b.qrPayload)}
                    className="w-full p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="truncate pr-2">
                      <span className="text-xs font-bold text-white group-hover:text-rose-400 block truncate">
                        {b.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {b.bookingCode} • {b.seats ? b.seats.join(', ') : `${b.guestCount} Guests`}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                      Scan Pass
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Manual Code Entry */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 block">Manual Code / Barcode Override</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. DST-89214"
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
              />
              <button
                onClick={() => handleScanInput(manualCode)}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
