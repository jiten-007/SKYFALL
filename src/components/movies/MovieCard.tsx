'use client';

import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Movie } from '@/types';
import { playSound } from '@/lib/sound';

export const MovieCard = ({
  movie,
  onBook
}: {
  movie: Movie;
  onBook: (movie: Movie) => void;
}) => {
  return (
    <div
      onClick={() => {
        playSound('click');
        onBook(movie);
      }}
      className="group relative bg-[#121824] border border-white/[0.08] hover:border-rose-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 flex flex-col"
    >
      {/* Poster with overlays */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

        {/* Format Badge (e.g. IMAX 3D) */}
        {movie.formats.includes('IMAX 3D') && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-black text-cyan-400 tracking-wider">
            IMAX
          </div>
        )}

        {/* Rating Pill */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-white shadow-sm">
          <Star className="w-3 h-3 text-amber-400 fill-current" />
          <span>{movie.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({movie.votes})</span>
        </div>

        {/* Certificate */}
        <div className="absolute bottom-2.5 right-2.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/20">
          {movie.certificate}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white group-hover:text-rose-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
            {movie.genre.join(', ')}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {movie.duration}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('click');
              onBook(movie);
            }}
            className="px-3 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-semibold transition-all group-hover:bg-rose-500 group-hover:text-white"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
