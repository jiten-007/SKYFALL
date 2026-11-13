'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Film, Ticket, Utensils, Gamepad2, Star, ChevronRight } from 'lucide-react';
import { useDistrict } from '@/context/DistrictContext';
import { MOCK_MOVIES, MOCK_EVENTS, MOCK_RESTAURANTS, MOCK_PLAY_ACTIVITIES } from '@/data/mockData';
import { playSound } from '@/lib/sound';

export const SearchModal = ({
  onSelectMovie,
  onSelectEvent,
  onSelectRestaurant
}: {
  onSelectMovie: (id: string) => void;
  onSelectEvent: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
}) => {
  const { isSearchOpen, setIsSearchOpen } = useDistrict();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'movies' | 'events' | 'dining' | 'play'>('all');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { movies: [], events: [], restaurants: [], play: [] };
    const q = query.toLowerCase();

    const movies = MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q)) ||
        m.cast.some((c) => c.name.toLowerCase().includes(q))
    );

    const events = MOCK_EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.artists.some((a) => a.name.toLowerCase().includes(q))
    );

    const restaurants = MOCK_RESTAURANTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q) ||
        r.cuisines.some((c) => c.toLowerCase().includes(q))
    );

    const play = MOCK_PLAY_ACTIVITIES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q)
    );

    return { movies, events, restaurants, play };
  }, [query]);

  if (!isSearchOpen) return null;

  const totalResults =
    filteredResults.movies.length +
    filteredResults.events.length +
    filteredResults.restaurants.length +
    filteredResults.play.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 p-4 bg-black/80 backdrop-blur-md">
      <div
        className="w-full max-w-2xl bg-[#121824] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-rose-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, Coldplay, Toit brewpub, comedy..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-slate-300"
          >
            ESC
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-4 py-2 border-b border-white/[0.05] bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['all', 'movies', 'events', 'dining', 'play'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilterType(type);
                playSound('click');
              }}
              className={`text-xs px-3 py-1 rounded-full capitalize transition-all ${
                filterType === type
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-xs text-slate-400">
                Trending in your city: <span className="text-rose-400">Coldplay Mumbai</span>,{' '}
                <span className="text-rose-400">Dune 2 IMAX</span>, <span className="text-rose-400">Toit Brewpub</span>
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-semibold text-slate-300">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for IMAX, concerts, or beer cafes</p>
            </div>
          ) : (
            <>
              {/* Movies results */}
              {(filterType === 'all' || filterType === 'movies') && filteredResults.movies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-rose-500" />
                    Movies ({filteredResults.movies.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.movies.map((mov) => (
                      <div
                        key={mov.id}
                        onClick={() => {
                          onSelectMovie(mov.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={mov.poster}
                          alt={mov.title}
                          className="w-11 h-14 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate group-hover:text-rose-400 transition-colors">
                            {mov.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              {mov.rating}
                            </span>
                            <span className="text-[10px] text-slate-400">{mov.genre.join(', ')}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events results */}
              {(filterType === 'all' || filterType === 'events') && filteredResults.events.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-violet-400" />
                    Live Events ({filteredResults.events.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.events.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => {
                          onSelectEvent(evt.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-11 h-14 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate group-hover:text-violet-400 transition-colors">
                            {evt.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {evt.venue} • {evt.date}
                          </p>
                          <span className="text-[10px] font-semibold text-emerald-400">
                            Starts ₹{evt.minPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dining results */}
              {(filterType === 'all' || filterType === 'dining') && filteredResults.restaurants.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                    Dining Out ({filteredResults.restaurants.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.restaurants.map((rest) => (
                      <div
                        key={rest.id}
                        onClick={() => {
                          onSelectRestaurant(rest.id);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={rest.image}
                          alt={rest.name}
                          className="w-11 h-11 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                            {rest.name}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {rest.locality} • {rest.cuisines.slice(0, 2).join(', ')}
                          </p>
                          <span className="text-[10px] font-semibold text-rose-400">
                            {rest.discountText}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
