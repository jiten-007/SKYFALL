'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck } from 'lucide-react';

export const DynamicQRCode = ({
  payload,
  status
}: {
  payload: string;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'CANCELLED';
}) => {
  const [pulse, setPulse] = useState(0);

  // Animated security tick to prevent static screenshot counterfeiting
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* QR Container with animated security glow */}
      <div className="relative p-3.5 bg-white rounded-2xl shadow-xl flex items-center justify-center">
        {status === 'CONFIRMED' && (
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 opacity-30 blur-sm animate-pulse -z-10" />
        )}

        <QRCodeSVG
          value={payload}
          size={160}
          level="H"
          includeMargin={false}
          className={status === 'CANCELLED' ? 'opacity-30 grayscale' : ''}
        />

        {/* Center overlay badge */}
        <div className="absolute w-7 h-7 rounded-full bg-[#111622] border-2 border-white flex items-center justify-center shadow-md">
          <span className="text-[10px] font-black text-rose-500">S</span>
        </div>
      </div>

      {/* Dynamic Watermark Security Line */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
        <ShieldCheck className={`w-3.5 h-3.5 ${status === 'CHECKED_IN' ? 'text-emerald-400' : 'text-rose-400'}`} />
        <span>
          {status === 'CHECKED_IN'
            ? 'VERIFIED & CHECKED IN'
            : status === 'CANCELLED'
            ? 'PASS CANCELLED'
            : `LIVE SECURE PASS • ${pulse}s`}
        </span>
      </div>
    </div>
  );
};
