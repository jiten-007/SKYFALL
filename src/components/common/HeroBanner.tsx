'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Flame, Film, Ticket, Utensils } from 'lucide-react';
import { playSound } from '@/lib/sound';

interface BannerSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  image: string;
  category: 'movie' | 'event' | 'dining';
  targetId: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'b-1',
    badge: 'MEGA TOUR',
    badgeColor: 'bg-violet-600',
    title: 'Coldplay: Music of the Spheres',
    subtitle: 'Limited Phase 2 passes now open for Mumbai & Ahmedabad',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1600&q=80',
    category: 'event',
    targetId: 'evt-1'
  },
  {
    id: 'b-2',
    badge: 'IMAX 3D EXCLUSIVE',
    badgeColor: 'bg-cyan-600',
    title: 'Dune: Part Two in IMAX',
    subtitle: 'Experience Denis Villeneuve’s magnum opus on India’s largest screens',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    category: 'movie',
    targetId: 'mov-1'
  },
  {
    id: 'b-3',
    badge: 'SKYFALL PAY SPECIAL',
    badgeColor: 'bg-rose-600',
    title: 'Up to 25% Off at Top Breweries',
    subtitle: 'Reserve tables & pay your bill with Skyfall Pay for instant discounts',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',
    category: 'dining',
    targetId: 'rest-1'
  }
];

export const HeroBanner = ({
  onSelectMovie,
  onSelectEvent,
  onSelectRestaurant
}: {
  onSelectMovie: (id: string) => void;
  onSelectEvent: (id: string) => void;
  onSelectRestaurant: (id: string) => void;
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto rotate every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIdx];

  const handleClick = () => {
    playSound('click');
    if (slide.category === 'movie') onSelectMovie(slide.targetId);
    else if (slide.category === 'event') onSelectEvent(slide.targetId);
    else if (slide.category === 'dining') onSelectRestaurant(slide.targetId);
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-white/[0.08]" onClick={handleClick}>
      <div className="relative aspect-[16/7] sm:aspect-[21/7] w-full overflow-hidden bg-slate-900">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#090C12]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/90 via-transparent to-transparent hidden sm:block" />

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 max-w-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${slide.badgeColor}`}
            >
              {slide.badge}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight">
            {slide.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1 sm:line-clamp-2">
            {slide.subtitle}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 transition-all">
            <span>Explore Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-10">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
                playSound('click');
              }}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
