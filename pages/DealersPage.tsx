
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Ship, BadgeCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { CarGrid } from '../components/CarGrid';

export const DealersPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 bg-black"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Dealer Solutions</h1>
            <p className="text-white/50 text-lg">Scale your inventory with our global sourcing network. We handle the logistics, you handle the sales.</p>
          </div>
          <button className="bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-2 text-lg shadow-xl shadow-white/10">
            Request Bulk Pricing <Box size={24} />
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
          <Stat icon={<TrendingUp />} value="300+" label="Global Sources" />
          <Stat icon={<Box />} value="Bulk" label="Logistics Packages" />
          <Stat icon={<Ship />} value="Secure" label="Roro/Container" />
          <Stat icon={<BadgeCheck />} value="100%" label="Transparency" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">Why Source With Us?</h2>
              <p className="text-white/40 leading-relaxed max-w-xl">
                We remove the complexities of international car brokerage. Our team handles physical inspections in Europe, US, and Asia, ensuring you only import the best inventory for your showroom.
              </p>
              <div className="space-y-4">
                <ListItem title="Direct Auctions Access" />
                <ListItem title="Secure Escrow Payments" />
                <ListItem title="Custom Clearance Handling" />
                <ListItem title="Port Delivery Monitoring" />
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-4 aspect-video flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
              <p className="text-white/20 italic relative z-10">Global Inventory Feed coming soon...</p>
            </div>
        </section>
      </div>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-32">
        <CarGrid 
          forcedBuyerType="Dealer"
          showFilters={false}
          title="Consignor Inventory"
          description="Units cleared and ready for showroom floors. Wholesale pricing available for registered partners."
        />
      </div>
    </motion.div>
  );
};

const Stat = ({ icon, value, label }: any) => (
  <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center hover:bg-white/10 transition-colors">
    <div className="flex justify-center mb-4 text-white/50">{icon}</div>
    <div className="text-4xl font-bold mb-2">{value}</div>
    <div className="text-white/30 text-sm font-medium uppercase tracking-widest">{label}</div>
  </div>
);

const ListItem = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all">
      <ArrowRight size={12} className="text-white group-hover:text-black" />
    </div>
    <span className="text-lg font-medium text-white/70 group-hover:text-white transition-colors">{title}</span>
  </div>
);
