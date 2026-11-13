'use client';

import React, { useState } from 'react';
import { useDistrict } from '@/context/DistrictContext';
import { Header } from '@/components/common/Header';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import { BottomNav } from '@/components/common/BottomNav';
import { CityModal } from '@/components/common/CityModal';
import { SearchModal } from '@/components/common/SearchModal';
import { HeroBanner } from '@/components/common/HeroBanner';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieDetailModal } from '@/components/movies/MovieDetailModal';
import { SeatMatrixModal } from '@/components/movies/SeatMatrixModal';
import { FnBModal } from '@/components/movies/FnBModal';
import { EventCard } from '@/components/events/EventCard';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import { DiningCard } from '@/components/dining/DiningCard';
import { DiningDetailModal } from '@/components/dining/DiningDetailModal';
import { TableBookingModal } from '@/components/dining/TableBookingModal';
import { DistrictPayCalculator } from '@/components/dining/DistrictPayCalculator';
import { PlayCard } from '@/components/play/PlayCard';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { WalletView } from '@/components/wallet/WalletView';
import { GateScannerModal } from '@/components/scanner/GateScannerModal';
import { MOCK_MOVIES, MOCK_EVENTS, MOCK_RESTAURANTS, MOCK_PLAY_ACTIVITIES } from '@/data/mockData';
import { Movie, CinemaTheater, MovieShow, Seat, FnBItem, EventItem, RestaurantItem, PlayActivity, Booking } from '@/types';
import { Film, Ticket, Utensils, Gamepad2, Sparkles, ChevronRight, MapPin } from 'lucide-react';
import { playSound } from '@/lib/sound';

export default function DistrictHomePage() {
  const { activeTab, setActiveTab, activeView, setActiveView, selectedCity } = useDistrict();

  // Modals state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [seatMatrixData, setSeatMatrixData] = useState<{
    movie: Movie;
    theater: CinemaTheater;
    show: MovieShow;
    dateStr: string;
  } | null>(null);

  const [fnbData, setFnbData] = useState<{
    movieTitle: string;
    seatCount: number;
    selectedSeats: Seat[];
    totalSeatAmount: number;
    movie: Movie;
    theater: CinemaTheater;
    show: MovieShow;
    dateStr: string;
  } | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantItem | null>(null);
  const [tableBookingRestaurant, setTableBookingRestaurant] = useState<RestaurantItem | null>(null);
  const [districtPayRestaurant, setDistrictPayRestaurant] = useState<RestaurantItem | null>(null);

  // Universal Checkout State
  const [checkoutDetails, setCheckoutDetails] = useState<{
    type: 'movie' | 'event' | 'dining' | 'play';
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
  } | null>(null);

  // Step 1: User selects movie showtime -> opens SeatMatrixModal
  const handleSelectShowtime = (movie: Movie, theater: CinemaTheater, show: MovieShow, dateStr: string) => {
    setSelectedMovie(null);
    setSeatMatrixData({ movie, theater, show, dateStr });
  };

  // Step 2: User picks seats -> opens FnBModal
  const handleProceedToFnB = (selectedSeats: Seat[], totalSeatAmount: number) => {
    if (!seatMatrixData) return;
    setFnbData({
      movieTitle: seatMatrixData.movie.title,
      seatCount: selectedSeats.length,
      selectedSeats,
      totalSeatAmount,
      movie: seatMatrixData.movie,
      theater: seatMatrixData.theater,
      show: seatMatrixData.show,
      dateStr: seatMatrixData.dateStr
    });
    setSeatMatrixData(null);
  };

  // Step 3: User skips or adds FnB -> opens CheckoutModal
  const handleProceedToMovieCheckout = (
    items: { item: FnBItem; quantity: number }[],
    totalFnbAmount: number
  ) => {
    if (!fnbData) return;
    setCheckoutDetails({
      type: 'movie',
      title: fnbData.movie.title,
      venue: fnbData.theater.name,
      locality: `${fnbData.theater.locality}, ${selectedCity.name}`,
      dateTime: `${fnbData.dateStr}, ${fnbData.show.time} (${fnbData.show.format})`,
      posterOrImage: fnbData.movie.poster,
      seats: fnbData.selectedSeats.map((s) => s.id),
      guestCount: fnbData.selectedSeats.length,
      tierName: `${fnbData.show.format} Screen`,
      baseAmount: fnbData.totalSeatAmount,
      fnbItems: items.map((x) => ({ name: x.item.name, quantity: x.quantity, price: x.item.price })),
      fnbTotal: totalFnbAmount
    });
    setFnbData(null);
  };

  // Handle Event Checkout
  const handleProceedToEventCheckout = (
    event: EventItem,
    tier: EventItem['tiers'][0],
    quantity: number,
    totalAmount: number
  ) => {
    setSelectedEvent(null);
    setCheckoutDetails({
      type: 'event',
      title: event.title,
      venue: event.venue,
      locality: `${event.locality}, ${selectedCity.name}`,
      dateTime: `${event.date} • ${event.time}`,
      posterOrImage: event.image,
      guestCount: quantity,
      tierName: tier.name,
      baseAmount: totalAmount
    });
  };

  // Handle Play Activity Checkout
  const handleProceedToPlayCheckout = (activity: PlayActivity) => {
    setCheckoutDetails({
      type: 'play',
      title: activity.title,
      venue: activity.locality,
      locality: `${activity.locality}, ${selectedCity.name}`,
      dateTime: 'Today • Flexible timing',
      posterOrImage: activity.image,
      guestCount: 1,
      tierName: `${activity.category} Pass (${activity.duration})`,
      baseAmount: activity.pricePerPerson
    });
  };

  // When checkout finishes successfully
  const handleBookingSuccess = (_newBooking: Booking) => {
    setCheckoutDetails(null);
    setTableBookingRestaurant(null);
    setDistrictPayRestaurant(null);
    setActiveView('wallet');
  };

  return (
    <div className="min-h-screen bg-[#090C12] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Categories Tabs Bar */}
      {activeView === 'explore' && <CategoryTabs />}

      {/* Main Content View */}
      <main className="flex-1 pb-20">
        {activeView === 'wallet' ? (
          <WalletView />
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-5 space-y-8">
            {/* Hero Spotlight Carousel */}
            {activeTab === 'all' && (
              <HeroBanner
                onSelectMovie={(id) => {
                  const m = MOCK_MOVIES.find((x) => x.id === id);
                  if (m) setSelectedMovie(m);
                }}
                onSelectEvent={(id) => {
                  const e = MOCK_EVENTS.find((x) => x.id === id);
                  if (e) setSelectedEvent(e);
                }}
                onSelectRestaurant={(id) => {
                  const r = MOCK_RESTAURANTS.find((x) => x.id === id);
                  if (r) setSelectedRestaurant(r);
                }}
              />
            )}

            {/* Quick Filter Pill Shortcuts */}
            {activeTab === 'all' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  onClick={() => setActiveTab('movies')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-white/[0.02] to-transparent border border-rose-500/20 hover:border-rose-500/40 cursor-pointer group transition-all"
                >
                  <Film className="w-5 h-5 text-rose-500 mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Cinema & IMAX</h4>
                  <p className="text-[10px] text-slate-400">Book best seats</p>
                </div>

                <div
                  onClick={() => setActiveTab('events')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-violet-950/40 via-white/[0.02] to-transparent border border-violet-500/20 hover:border-violet-500/40 cursor-pointer group transition-all"
                >
                  <Ticket className="w-5 h-5 text-violet-400 mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Live Concerts</h4>
                  <p className="text-[10px] text-slate-400">Coldplay, Diljit, Sunburn</p>
                </div>

                <div
                  onClick={() => setActiveTab('dining')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-white/[0.02] to-transparent border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer group transition-all"
                >
                  <Utensils className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Skyfall Pay Dining</h4>
                  <p className="text-[10px] text-slate-400">Flat 20-25% Off Bills</p>
                </div>

                <div
                  onClick={() => setActiveTab('play')}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-white/[0.02] to-transparent border border-amber-500/20 hover:border-amber-500/40 cursor-pointer group transition-all"
                >
                  <Gamepad2 className="w-5 h-5 text-amber-400 mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Play & Arcades</h4>
                  <p className="text-[10px] text-slate-400">Bowling & Go-Karting</p>
                </div>
              </div>
            )}

            {/* Movies Section */}
            {(activeTab === 'all' || activeTab === 'movies') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <Film className="w-5 h-5 text-rose-500" />
                      Now Showing in Cinemas
                    </h3>
                    <p className="text-xs text-slate-400">
                      Explore IMAX 3D, 4DX, and Dolby Atmos screenings in {selectedCity.name}
                    </p>
                  </div>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('movies')}
                      className="text-xs font-bold text-rose-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                    >
                      <span>See all</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
                  {MOCK_MOVIES.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onBook={(m) => setSelectedMovie(m)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Live Events Section */}
            {(activeTab === 'all' || activeTab === 'events') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-violet-400" />
                      Live Events & Mega Concerts
                    </h3>
                    <p className="text-xs text-slate-400">
                      Top tours, comedy specials, and festival passes
                    </p>
                  </div>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('events')}
                      className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                      <span>See all</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {MOCK_EVENTS.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={(e) => setSelectedEvent(e)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Dining Out Section */}
            {(activeTab === 'all' || activeTab === 'dining') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-emerald-400" />
                      Dining Out & Skyfall Pay
                    </h3>
                    <p className="text-xs text-slate-400">
                      Reserve tables for free & pay bills directly via Skyfall for instant savings
                    </p>
                  </div>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => setActiveTab('dining')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>See all</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {MOCK_RESTAURANTS.map((rest) => (
                    <DiningCard
                      key={rest.id}
                      restaurant={rest}
                      onSelect={(r) => setSelectedRestaurant(r)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Play & Activities Section */}
            {(activeTab === 'all' || activeTab === 'play') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-amber-400" />
                      Play & Gaming Arcades
                    </h3>
                    <p className="text-xs text-slate-400">
                      Bowling alleys, go-karting tracks, and escape room challenges
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {MOCK_PLAY_ACTIVITIES.map((act) => (
                    <PlayCard
                      key={act.id}
                      activity={act}
                      onBook={(a) => handleProceedToPlayCheckout(a)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Global Modals */}
      <CityModal />

      <SearchModal
        onSelectMovie={(id) => {
          const m = MOCK_MOVIES.find((x) => x.id === id);
          if (m) setSelectedMovie(m);
        }}
        onSelectEvent={(id) => {
          const e = MOCK_EVENTS.find((x) => x.id === id);
          if (e) setSelectedEvent(e);
        }}
        onSelectRestaurant={(id) => {
          const r = MOCK_RESTAURANTS.find((x) => x.id === id);
          if (r) setSelectedRestaurant(r);
        }}
      />

      <GateScannerModal />

      {/* Movie Details Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onSelectShow={handleSelectShowtime}
      />

      {/* Seat Matrix Modal */}
      {seatMatrixData && (
        <SeatMatrixModal
          movie={seatMatrixData.movie}
          theater={seatMatrixData.theater}
          show={seatMatrixData.show}
          dateStr={seatMatrixData.dateStr}
          onClose={() => setSeatMatrixData(null)}
          onProceedToFnB={handleProceedToFnB}
        />
      )}

      {/* F&B Snacks Modal */}
      {fnbData && (
        <FnBModal
          movieTitle={fnbData.movieTitle}
          seatCount={fnbData.seatCount}
          onClose={() => setFnbData(null)}
          onProceedToCheckout={handleProceedToMovieCheckout}
        />
      )}

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onProceedToCheckout={handleProceedToEventCheckout}
      />

      {/* Dining Details Modal */}
      <DiningDetailModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onOpenTableBooking={(r) => {
          setSelectedRestaurant(null);
          setTableBookingRestaurant(r);
        }}
        onOpenDistrictPay={(r) => {
          setSelectedRestaurant(null);
          setDistrictPayRestaurant(r);
        }}
      />

      {/* Table Booking Modal */}
      <TableBookingModal
        restaurant={tableBookingRestaurant}
        onClose={() => setTableBookingRestaurant(null)}
        onSuccess={handleBookingSuccess}
      />

      {/* District Pay Calculator */}
      <DistrictPayCalculator
        restaurant={districtPayRestaurant}
        onClose={() => setDistrictPayRestaurant(null)}
        onSuccess={handleBookingSuccess}
      />

      {/* Universal Checkout Modal */}
      <CheckoutModal
        details={checkoutDetails}
        onClose={() => setCheckoutDetails(null)}
        onSuccess={handleBookingSuccess}
      />

      {/* Sticky Bottom Dock */}
      <BottomNav />
    </div>
  );
}
