import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { GlassCard } from './GlassCard';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const isPreOrder = car.status === 'Pre-Order';
  const [imgSrc, setImgSrc] = useState(car.image);

  return (
    <div className="group relative bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black">
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute top-6 left-6 z-20 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border ${
          isPreOrder ? 'bg-black text-white border-white' : 'bg-white text-black border-white'
        }`}>
          {car.status}
        </div>
        
        <img 
          src={imgSrc} 
          alt={`${car.brand} ${car.model}`}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1553440637-d22ed8a02575?auto=format&fit=crop&q=80&w=800')}
          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">{car.brand}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-zinc-300 transition-colors">
              {car.model}
            </h3>
          </div>
          <div className="text-right">
             <span className="text-[10px] uppercase text-zinc-600 tracking-widest block mb-1">Price</span>
             <span className="text-xl font-bold text-white">₦{car.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-6 py-6 border-y border-white/5 mb-8">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-600 tracking-widest block">Mileage</span>
            <span className="text-xs text-white font-medium">{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="w-[1px] h-8 bg-white/5" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-600 tracking-widest block">Type</span>
            <span className="text-xs text-white font-medium">{car.transmission}</span>
          </div>
          <div className="w-[1px] h-8 bg-white/5" />
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-zinc-600 tracking-widest block">Condition</span>
            <span className="text-xs text-white font-medium">Certified</span>
          </div>
        </div>

        <Link to={`/showroom/${car.id}`} className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
          View Details
        </Link>
      </div>
    </div>
  );
};
