import React, { useState, useMemo } from 'react';
import { CarCard } from './CarCard';
import { FilterBar } from './FilterBar';
import { BuyerType, Car } from '../types';
import { MOCK_CARS } from '../constants';

interface CarGridProps {
  limit?: number;
  showFilters?: boolean;
  forcedBuyerType?: BuyerType;
  title?: string;
  description?: string;
}

export const CarGrid: React.FC<CarGridProps> = ({ 
  limit, 
  showFilters = true, 
  forcedBuyerType,
  title = "Current Inventory",
  description = "Explore our curated selection of vehicles available for immediate acquisition or future allocation."
}) => {
  const [buyerType, setBuyerType] = useState<BuyerType>(forcedBuyerType || 'Individual'); 
  const [showPreOrder, setShowPreOrder] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [maxPrice, setMaxPrice] = useState(100000000); 
  const [cars] = useState<Car[]>(MOCK_CARS);
  const [isLoading] = useState(false);
  const [useMockData] = useState(true);

  // Filter Logic
  const filteredCars = useMemo(() => {
    let result = cars.filter(car => {
      // 1. Filter by Buyer Type
      const currentBuyerType = forcedBuyerType || buyerType;
      const matchesBuyerType = car.buyerType.includes(currentBuyerType);
      
      // 2. Filter by Pre-Order Checkbox
      const matchesPreOrderCheckbox = showPreOrder ? car.status === 'Pre-Order' : true;

      // 3. Filter by Brand
      const matchesBrand = selectedBrand ? car.brand === selectedBrand : true;

      // 4. Filter by Sector
      const matchesSector = selectedSector ? car.sector === selectedSector : true;

      // 5. Filter by Status Dropdown
      const matchesStatus = selectedStatus ? car.status === selectedStatus : true;

      // 6. Filter by Price
      const matchesPrice = car.price <= maxPrice;

      return matchesBuyerType && matchesPreOrderCheckbox && matchesBrand && matchesSector && matchesStatus && matchesPrice;
    });

    // Sort by Brand alphabetically
    result.sort((a, b) => a.brand.localeCompare(b.brand));

    if (limit) {
      return result.slice(0, limit);
    }
    return result;
  }, [buyerType, forcedBuyerType, showPreOrder, selectedBrand, selectedStatus, maxPrice, cars, limit]);

  const clearFilters = () => {
    setShowPreOrder(false);
    if (!forcedBuyerType) setBuyerType('Individual');
    setSelectedBrand('');
    setSelectedSector('');
    setSelectedStatus('');
    setMaxPrice(100000000);
  };

  return (
    <section className="relative z-20 pb-24" id="showroom">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h2>
        <p className="text-zinc-500 max-w-2xl text-lg">
          {description}
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

      {showFilters && (
        <FilterBar 
          buyerType={buyerType} 
          setBuyerType={setBuyerType}
          showPreOrder={showPreOrder}
          setShowPreOrder={setShowPreOrder}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          hideBuyerToggle={!!forcedBuyerType}
        />
      )}

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