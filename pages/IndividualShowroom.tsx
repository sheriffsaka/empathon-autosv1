
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CarGrid } from '../components/CarGrid';

export const IndividualShowroom: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 bg-black"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Precision Inventory</h1>
          <p className="text-white/50 max-w-2xl text-lg">Curated for discernment. Explore our collection of premium, luxury, and exotic vehicles available for immediate acquisition.</p>
        </header>

        {/* Filters Placeholder */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search brand, model, or year..." 
                className="w-full bg-black/40 border border-white/10 py-3 pl-12 pr-6 rounded-xl text-white focus:outline-none focus:border-white/50 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 bg-black/40 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-all font-medium">
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm font-medium">Sort by:</span>
            <select className="bg-black/40 border border-white/10 px-6 py-3 rounded-xl text-white focus:outline-none focus:border-white/50 appearance-none min-w-[160px] cursor-pointer">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Power: Max First</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <CarGrid 
          forcedBuyerType="Individual" 
          showFilters={true}
          title="Personal Inventory"
          description="A selection of premium vehicles curated for private owners. Direct acquisition, full verification."
        />
      </div>
    </motion.div>
  );
};
