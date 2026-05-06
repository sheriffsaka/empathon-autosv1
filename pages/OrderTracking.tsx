
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Package, Truck, CheckCircle, Ship, MapPin } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setOrderData({
        id: orderId,
        status: 'In Transit',
        status_code: 3,
        updated_at: new Date().toLocaleDateString(),
        vehicle: '2024 Mercedes-Benz G63 AMG',
        location: 'Lagos Port - Terminal B'
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 bg-black flex flex-col items-center"
    >
      <div className="max-w-2xl w-full px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 italic">Where is your car?</h1>
        <p className="text-white/50 mb-12">Enter your Order ID or Email to get real-time status updates our sourcing and delivery progress.</p>
        
        <form onSubmit={handleSearch} className="relative mb-24 group">
          <input 
            type="text" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID / Email Address" 
            className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-full text-white text-xl md:text-2xl font-medium focus:outline-none focus:border-white focus:bg-white/10 transition-all placeholder:text-white/20"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-full hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </form>

        <AnimatePresence>
          {orderData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-950 border border-white/10 rounded-[3rem] p-10 text-left"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Active Order</div>
                  <h3 className="text-xl md:text-2xl font-bold">{orderData.vehicle}</h3>
                </div>
                <div className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-tighter">
                  {orderData.status}
                </div>
              </div>

              <div className="space-y-12 relative">
                {/* Vertical line connector */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-white/10" />

                <StatusStep icon={<Search />} label="Order Received" active={orderData.status_code >= 1} date="Jan 12" />
                <StatusStep icon={<Loader2 />} label="Sourcing in Progress" active={orderData.status_code >= 2} date="Jan 16" />
                <StatusStep icon={<Ship />} label="In Transit" active={orderData.status_code >= 3} activeNow date="Jan 24" />
                <StatusStep icon={<Package />} label="Ready for Delivery" active={orderData.status_code >= 4} date="--" />
              </div>

              <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-white/40" />
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/30">Last Updated</div>
                    <div className="text-sm font-medium">{orderData.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-white/30">Expected ETA</div>
                  <div className="text-sm font-medium">Feb 02, 2024</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const StatusStep = ({ icon, label, active, activeNow, date }: any) => (
  <div className="flex items-center gap-8 relative z-10">
    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-1000 ${
      active 
        ? 'bg-white border-white text-black' 
        : 'bg-black border-white/10 text-white/20'
    } ${activeNow ? 'ring-4 ring-white/20 scale-125' : ''}`}>
      {React.cloneElement(icon, { size: 14 })}
    </div>
    <div className="flex-1">
      <div className={`text-lg font-bold transition-colors ${active ? 'text-white' : 'text-white/20'}`}>{label}</div>
    </div>
    <div className={`text-sm font-mono transition-colors ${active ? 'text-white/40' : 'text-white/10'}`}>{date}</div>
  </div>
);
