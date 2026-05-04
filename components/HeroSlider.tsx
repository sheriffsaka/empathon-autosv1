
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { MOCK_HERO } from '../utils/mockData';
import { Button } from './Button';
import { ComponentVariant, HeroSlide } from '../types';

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Safely determine which slides to render to prevent "0" counts
  const displaySlides = slides.length > 0 ? slides : MOCK_HERO.map(m => ({
    id: Number(m.id),
    title: m.title,
    subtitle: m.subtitle,
    image: m.imageUrl,
    ctaPrimary: m.ctaPrimaryText,
    ctaSecondary: m.ctaSecondaryText
  }));

  useEffect(() => {
    const fetchSlides = async () => {
      // In mock mode, we just use the mock data
      const mappedSlides: HeroSlide[] = MOCK_HERO.map((item: any) => ({
        id: Number(item.id),
        title: item.title,
        subtitle: item.subtitle,
        image: item.imageUrl,
        ctaPrimary: item.ctaPrimaryText || 'Learn More',
        ctaSecondary: item.ctaSecondaryText || 'Contact Us'
      }));
      setSlides(mappedSlides);
      setIsLoading(false);
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-advance
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  if (isLoading) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  const activeSlide = displaySlides[currentIndex] || displaySlides[0];
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Layer */}
      {displaySlides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920';
          }}
        />
      ))}

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Content Container - Added z-10 to ensure it sits above backgrounds */}
      <div className="relative z-10 h-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className={`max-w-3xl transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-white"></span>
            <span className="text-white font-bold tracking-[0.3em] uppercase text-xs drop-shadow-md">
              {formatNumber(currentIndex + 1)} / {formatNumber(displaySlides.length)}
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg">
            {activeSlide.title}
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-slate-300 font-light mb-10 max-w-xl leading-relaxed drop-shadow-md">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant={ComponentVariant.PRIMARY} onClick={() => document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' })}>
              {activeSlide.ctaPrimary}
            </Button>
            <Button variant={ComponentVariant.GLASS} onClick={() => document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' })}>
              {activeSlide.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 flex gap-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-20">
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / displaySlides.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};
