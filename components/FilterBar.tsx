import React from 'react';
import { BuyerType } from '../types';
import { MOCK_BRANDS, MOCK_SECTORS } from '../utils/mockData';

interface FilterBarProps {
  buyerType: BuyerType;
  setBuyerType: (type: BuyerType) => void;
  showPreOrder: boolean;
  setShowPreOrder: (show: boolean) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  hideBuyerToggle?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  buyerType, 
  setBuyerType,
  showPreOrder,
  setShowPreOrder,
  selectedBrand,
  setSelectedBrand,
  selectedSector,
  setSelectedSector,
  selectedStatus,
  setSelectedStatus,
  maxPrice,
  setMaxPrice,
  hideBuyerToggle = false
}) => {
  return (
    <div className="sticky top-[80px] z-30 mb-12">
      <div className="bg-black/80 backdrop-blur-xl border-y border-white/5 py-4 px-6 shadow-xl">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Left: Buyer Type Toggle */}
          {!hideBuyerToggle && (
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] hidden xl:block">Market Segment:</span>
              <div className="bg-white/5 p-1 rounded-full border border-white/10 flex relative overflow-hidden">
                <button 
                  onClick={() => setBuyerType('Individual')}
                  className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    buyerType === 'Individual' ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Individual
                </button>
                <button 
                  onClick={() => setBuyerType('Corporate')}
                  className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    buyerType === 'Corporate' ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Corporate
                </button>
                <button 
                  onClick={() => setBuyerType('Dealer')}
                  className={`relative z-10 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    buyerType === 'Dealer' ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Dealers
                </button>
                
                {/* Sliding Background */}
                <div 
                  className="absolute top-1 bottom-1 w-[calc(33.33%-2px)] bg-white rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ 
                    transform: `translateX(${buyerType === 'Individual' ? '0%' : buyerType === 'Corporate' ? '100%' : '200%'})` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Center: Filters */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
            {/* Brand Dropdown */}
            <div className="relative group">
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 pr-12 rounded-full focus:outline-none focus:border-white transition-colors cursor-pointer min-w-[180px]"
              >
                <option value="" className="bg-zinc-900">All Brands</option>
                {MOCK_BRANDS.map(brand => (
                  <option key={brand} value={brand} className="bg-zinc-900">{brand}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Sector Dropdown (Visible only for Corporate) */}
            {buyerType === 'Corporate' && (
              <div className="relative group">
                <select 
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 pr-12 rounded-full focus:outline-none focus:border-white transition-colors cursor-pointer min-w-[180px]"
                >
                  <option value="" className="bg-zinc-900">All Sectors</option>
                  {MOCK_SECTORS.map(sector => (
                    <option key={sector} value={sector} className="bg-zinc-900">{sector}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            )}

            {/* Availability Dropdown */}
            <div className="relative group">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 pr-12 rounded-full focus:outline-none focus:border-white transition-colors cursor-pointer min-w-[180px]"
              >
                <option value="" className="bg-zinc-900">Any Availability</option>
                <option value="Available" className="bg-zinc-900">Available Now</option>
                <option value="Reserved" className="bg-zinc-900">Reserved</option>
                <option value="Pre-Order" className="bg-zinc-900">Pre-Order Only</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

             {/* Price Slider */}
             <div className="flex items-center gap-4 px-6 border-l border-white/10">
                <span className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">Budget</span>
                <div className="flex flex-col gap-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000000" 
                    step="5000000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-32 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                  />
                  <span className="text-[10px] text-white/40 font-mono tracking-tighter">
                    Max: ₦{(maxPrice / 1000000).toFixed(0)}M
                  </span>
                </div>
             </div>
          </div>

          {/* Right: Pre-Order Checkbox */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                showPreOrder ? 'bg-white border-white scale-110' : 'border-white/10 bg-transparent group-hover:border-white/30'
              }`}>
                {showPreOrder && <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={showPreOrder}
                onChange={(e) => setShowPreOrder(e.target.checked)}
              />
              <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${showPreOrder ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                Pre-Order Priority
              </span>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};
