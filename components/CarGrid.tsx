import React, { useState, useMemo } from 'react';
import { CarCard } from './CarCard';
import { FilterBar } from './FilterBar';
import { BuyerType, Car } from '../types';
import { MOCK_CARS } from '../constants';

export const CarGrid: React.FC = () => {
  const [buyerType, setBuyerType] = useState<BuyerType>('Corporate');
  const [showPreOrder, setShowPreOrder] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000000); // Default 100M
  const [cars] = useState<Car[]>(MOCK_CARS);
  const [isLoading] = useState(false);
  const [useMockData] = useState(true);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // 1. Filter by Buyer Type
      const matchesBuyerType = car.buyerType.includes(buyerType);
      
      // 2. Filter by Pre-Order Checkbox (Specific Override)
      const matchesPreOrderCheckbox = showPreOrder ? car.status === 'Pre-Order' : true;

      // 3. Filter by Brand
      const matchesBrand = selectedBrand ? car.brand === selectedBrand : true;

      // 4. Filter by Status Dropdown
      const matchesStatus = selectedStatus ? car.status === selectedStatus : true;

      // 5. Filter by Price
      const matchesPrice = car.price <= maxPrice;

      return matchesBuyerType && matchesPreOrderCheckbox && matchesBrand && matchesStatus && matchesPrice;
    });
  }, [buyerType, showPreOrder, selectedBrand, selectedStatus, maxPrice, cars]);

  const clearFilters = () => {
    setShowPreOrder(false);
    setBuyerType('Corporate');
    setSelectedBrand('');
    setSelectedStatus('');
    setMaxPrice(100000000);
  };

  return (
    <section className="relative z-20 pb-24" id="showroom">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-12 pt-24">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Current Inventory</h2>
        <p className="text-slate-400 max-w-2xl font-light text-lg">
          Explore our curated selection of vehicles available for immediate acquisition or future allocation.
        </p>
        {useMockData && (
          <div className="mt-4 p-3 bg-empathon-rust/10 border border-empathon-rust/30 rounded-lg inline-block">
             <p className="text-empathon-rust text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-empathon-rust animate-pulse"></span>
                Demo Mode: Displaying Sample Inventory
             </p>
          </div>
        )}
      </div>

      <FilterBar 
        buyerType={buyerType} 
        setBuyerType={setBuyerType}
        showPreOrder={showPreOrder}
        setShowPreOrder={setShowPreOrder}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 h-[400px] rounded-2xl border border-white/10"></div>
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-slate-400 text-lg">No vehicles found matching your criteria.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-empathon-rust hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};