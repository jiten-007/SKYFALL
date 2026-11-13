'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CityId, CategoryTab, Booking, City } from '@/types';
import { CITIES } from '@/data/mockData';
import { playSound } from '@/lib/sound';

interface DistrictContextType {
  selectedCity: City;
  setSelectedCityId: (id: CityId) => void;
  activeTab: CategoryTab;
  setActiveTab: (tab: CategoryTab) => void;
  activeView: 'explore' | 'wallet';
  setActiveView: (view: 'explore' | 'wallet') => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  checkInBooking: (bookingCodeOrId: string) => { success: boolean; message: string; booking?: Booking };
  cancelBooking: (bookingId: string) => void;
  // Seat Locking state for concurrency
  seatLock: {
    showId: string;
    seats: string[];
    expiresAt: number;
  } | null;
  startSeatLock: (showId: string, seats: string[]) => void;
  clearSeatLock: () => void;
  isSeatLockedByOther: (showId: string, seatId: string) => boolean;
}

const DistrictContext = createContext<DistrictContextType | undefined>(undefined);

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'dst-demo-1',
    bookingCode: 'DST-89214',
    type: 'movie',
    title: 'Dune: Part Two (IMAX Re-Release)',
    venue: 'PVR INOX Superplex: Forum Mall',
    locality: 'Koramangala, Bengaluru',
    dateTime: 'Today, 06:30 PM',
    city: 'Bengaluru',
    qrPayload: 'VALID_DST_89214_DUNE2_PVR_SEATS_H12_H13',
    seats: ['H12', 'H13'],
    guestCount: 2,
    tierName: 'Prime (Atmos)',
    totalAmount: 890,
    discountAmount: 120,
    fnbSummary: [{ name: 'Blockbuster Duo Combo', quantity: 1 }],
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    posterOrImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
  }
];

export const DistrictProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCityId, setSelectedCityIdState] = useState<CityId>('bengaluru');
  const [activeTab, setActiveTabState] = useState<CategoryTab>('all');
  const [activeView, setActiveViewState] = useState<'explore' | 'wallet'>('explore');
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [seatLock, setSeatLock] = useState<{
    showId: string;
    seats: string[];
    expiresAt: number;
  } | null>(null);

  // Initialize bookings from localStorage on client load
  useEffect(() => {
    try {
      const stored = localStorage.getItem('district_bookings_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
        }
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  // Save bookings to localStorage
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem('district_bookings_v1', JSON.stringify(newBookings));
    } catch {
      // ignore
    }
  };

  const selectedCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  const setSelectedCityId = (id: CityId) => {
    setSelectedCityIdState(id);
    playSound('click');
  };

  const setActiveTab = (tab: CategoryTab) => {
    setActiveTabState(tab);
    setActiveViewState('explore');
    playSound('click');
  };

  const setActiveView = (view: 'explore' | 'wallet') => {
    setActiveViewState(view);
    playSound('click');
  };

  const addBooking = (booking: Booking) => {
    const updated = [booking, ...bookings];
    saveBookings(updated);
    playSound('success');
  };

  const checkInBooking = (codeOrId: string) => {
    const cleanCode = codeOrId.trim().toUpperCase();
    const index = bookings.findIndex(
      (b) =>
        b.id.toUpperCase() === cleanCode ||
        b.bookingCode.toUpperCase() === cleanCode ||
        b.qrPayload.toUpperCase() === cleanCode
    );

    if (index === -1) {
      playSound('lock');
      return { success: false, message: 'Invalid Pass: No matching booking found in District Network.' };
    }

    const booking = bookings[index];

    if (booking.status === 'CHECKED_IN') {
      playSound('lock');
      return {
        success: false,
        message: `Pass Already Used! Checked in previously at ${booking.checkedInAt || 'Gate 2'}.`,
        booking
      };
    }

    if (booking.status === 'CANCELLED') {
      playSound('lock');
      return { success: false, message: 'Ticket Cancelled / Refunded: Entry Denied.', booking };
    }

    // Mark as checked in
    const updatedBooking: Booking = {
      ...booking,
      status: 'CHECKED_IN',
      checkedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedList = [...bookings];
    updatedList[index] = updatedBooking;
    saveBookings(updatedList);
    playSound('success');

    return {
      success: true,
      message: `Verified: Access Granted for ${booking.guestCount || (booking.seats ? booking.seats.length : 1)} Guest(s)`,
      booking: updatedBooking
    };
  };

  const cancelBooking = (id: string) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' as const } : b));
    saveBookings(updated);
    playSound('pop');
  };

  // Seat locking timer (8 minutes)
  const startSeatLock = (showId: string, seats: string[]) => {
    const expiresAt = Date.now() + 8 * 60 * 1000;
    setSeatLock({ showId, seats, expiresAt });
  };

  const clearSeatLock = () => {
    setSeatLock(null);
  };

  // Check seat lock expiry
  useEffect(() => {
    if (!seatLock) return;
    const interval = setInterval(() => {
      if (Date.now() >= seatLock.expiresAt) {
        clearSeatLock();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seatLock]);

  const isSeatLockedByOther = (_showId: string, _seatId: string) => {
    // Simulated distributed lock check
    return false;
  };

  return (
    <DistrictContext.Provider
      value={{
        selectedCity,
        setSelectedCityId,
        activeTab,
        setActiveTab,
        activeView,
        setActiveView,
        isCityModalOpen,
        setIsCityModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        isScannerOpen,
        setIsScannerOpen,
        bookings,
        addBooking,
        checkInBooking,
        cancelBooking,
        seatLock,
        startSeatLock,
        clearSeatLock,
        isSeatLockedByOther
      }}
    >
      {children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => {
  const context = useContext(DistrictContext);
  if (!context) {
    throw new Error('useDistrict must be used within a DistrictProvider');
  }
  return context;
};
