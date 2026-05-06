
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, Users, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { CarGrid } from '../components/CarGrid';

export const CorporatePage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen pt-32 pb-24 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24">
        <h1 className="text-4xl md:text-7xl font-bold mb-6">Corporate Fleet Solutions</h1>
        <p className="text-white/50 max-w-3xl mx-auto text-xl">Customized acquisition and management strategies for the most demanding corporate environments.</p>
        <div className="mt-12 flex justify-center gap-4">
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all">
            Request Fleet Consultation
          </button>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <SectorCard 
          icon={<Building2 className="text-black" />} 
          title="Banking & Finance" 
          desc="Executive mobility solutions and secure logistics for the financial sector."
          benefits={["Limo Service", "Bulletproof Options", "Leasing Packages"]}
        />
        <SectorCard 
          icon={<Briefcase className="text-black" />} 
          title="Professional SMEs" 
          desc="Efficient fleet management for growing organizations needing reliability."
          benefits={["Bulk Pricing", "Service Packages", "Priority Maintenance"]}
        />
        <SectorCard 
          icon={<LayoutGrid className="text-black" />} 
          title="Real Estate" 
          desc="Impressive presence and reliable transport for project management and site visits."
          benefits={["Rugged SUVs", "Project Branding", "Quick Replacement"]}
        />
        <SectorCard 
          icon={<Users className="text-black" />} 
          title="Government" 
          desc="Standardized fleet delivery and deployment for large-scale public institutions."
          benefits={["Full Sourcing", "Contract Management", "Logistics Support"]}
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-32">
        <CarGrid 
          forcedBuyerType="Corporate"
          showFilters={true}
          title="Fleet Showroom"
          description="Ready-to-deploy vehicles for corporate missions. Standardized units and executive transports."
        />
      </div>
    </motion.div>
  );
};

const SectorCard = ({ icon, title, desc, benefits }: any) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all group">
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-white/40 text-sm mb-8 leading-relaxed">{desc}</p>
    <ul className="space-y-3">
      {benefits.map((b: string) => (
        <li key={b} className="flex items-center gap-2 text-xs font-medium text-white/70">
          <CheckCircle2 size={14} className="text-white/40" /> {b}
        </li>
      ))}
    </ul>
  </div>
);
