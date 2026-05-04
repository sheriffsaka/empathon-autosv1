
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { MOCK_TESTIMONIALS } from '../utils/mockData';

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  type: 'Corporate' | 'Individual';
  content: string;
  rating: number;
  image: string;
  carImage: string;
}

export const Testimonials: React.FC = () => {
  const [testimonials] = useState<Testimonial[]>(MOCK_TESTIMONIALS.map(m => ({
    id: m.id,
    name: m.clientName,
    role: m.role,
    type: m.clientType as any,
    content: m.content,
    rating: m.rating,
    image: m.avatarUrl,
    carImage: m.carPurchasedImageUrl
  })));

  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
          <span className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
            Trusted by Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <GlassCard key={item.id} className="flex flex-col h-full relative group" hoverEffect={true}>
              
              {/* Header: User Info & Badge */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.name}</h4>
                    <p className="text-slate-500 text-xs">{item.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  item.type === 'Corporate' 
                    ? 'border-white/30 text-white bg-white/5' 
                    : 'border-slate-400/30 text-slate-400 bg-slate-400/5'
                }`}>
                  {item.type}
                </span>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
                "{item.content}"
              </p>

              {/* Footer: Product Link & Verification */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white/5 overflow-hidden">
                    <img 
                      src={item.carImage} 
                      alt="Purchased Vehicle" 
                      className="w-full h-full object-cover opacity-70" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1553440637-d22ed8a02575?auto=format&fit=crop&q=80&w=100';
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">Purchased</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                </div>
              </div>

            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
