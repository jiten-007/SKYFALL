'use client';

import React, { useState } from 'react';
import { X, Star, Clock, ShieldAlert, MapPin, Sparkles, Film, ChevronRight } from 'lucide-react';
import { Movie, CinemaTheater, MovieShow } from '@/types';
import { playSound } from '@/lib/sound';

export const MovieDetailModal = ({
  movie,
  onClose,
  onSelectShow
}: {
  movie: Movie | null;
  onClose: () => void;
  onSelectShow: (movie: Movie, theater: CinemaTheater, show: MovieShow, dateStr: string) => void;
}) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  if (!movie) return null;

  // Generate next 4 dates
  const dates = [
    { label: 'Today', sub: '13 Nov' },
    { label: 'Tomorrow', sub: '14 Nov' },
    { label: 'Fri', sub: '15 Nov' },
    { label: 'Sat', sub: '16 Nov' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full sm:max-w-3xl bg-[#10141E] border border-white/[0.1] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with close button */}
        <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden shrink-0 bg-slate-900">
          <img
            src={movie.banner || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141E] via-[#10141E]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase tracking-wider">
                  {movie.certificate}
                </span>
                <span className="text-[10px] text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                  {movie.formats.join(' • ')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{movie.title}</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {movie.genre.join(', ')} • {movie.duration} • {movie.languages.join(', ')}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="font-bold text-sm">{movie.rating}</span>
              <span className="text-xs text-slate-400">({movie.votes})</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-5 flex-1">
          {/* Date Selector Carousel */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Date
            </h4>
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
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
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
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

          {/* Theaters & Showtimes */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Theaters & Showtimes</span>
              <span className="text-[11px] text-rose-400 font-normal">Skyfall Fast-Pass Available</span>
            </h4>

            <div className="space-y-3">
              {movie.theaters.map((th) => (
                <div
                  key={th.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-rose-500 uppercase tracking-wider">
                          {th.chain}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">{th.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {th.locality} • {th.distance}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      {th.cancellationAvailable && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Free Cancellation
                        </span>
                      )}
                      {th.foodBeverageAvailable && (
                        <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          F&B Available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Showtimes Pills */}
                  <div className="flex flex-wrap gap-2.5 mt-3 pt-3 border-t border-white/[0.05]">
                    {th.shows.map((show) => (
                      <button
                        key={show.id}
                        onClick={() => {
                          playSound('select');
                          onSelectShow(movie, th, show, dates[selectedDateIndex].label);
                        }}
                        className="group flex flex-col items-center px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/[0.08] hover:border-rose-500/50 transition-all text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">
                            {show.time}
                          </span>
                          <span className="text-[9px] font-bold px-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                            {show.format}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                          <span className="text-slate-400">₹{show.priceStart}</span>
                          {show.status === 'almost-full' ? (
                            <span className="text-amber-400 font-semibold">• Filling Fast</span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">• Available</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synopsis & Cast */}
          <div className="pt-2 border-t border-white/[0.06] space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">About the Movie</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{movie.synopsis}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cast & Crew</h4>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                {movie.cast.map((actor) => (
                  <div key={actor.name} className="flex flex-col items-center text-center shrink-0 w-16">
                    <img
                      src={actor.avatar}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-[11px] font-semibold text-slate-200 mt-1 truncate w-full">
                      {actor.name}
                    </span>
                    <span className="text-[9px] text-slate-400 truncate w-full">{actor.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
