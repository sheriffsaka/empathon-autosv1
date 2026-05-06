
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Search, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { CarGrid } from '../components/CarGrid';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { ReservationForm } from '../components/ReservationForm';
import { ContactForm, AppointmentBlock } from '../components/ContactSection';

import { SectionHeading } from '../components/ui/SectionHeading';

export const Home: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-0"
    >
      {/* 1. Hero Section (Customized) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-8xl font-bold text-white mb-8 tracking-tighter drop-shadow-2xl italic"
          >
            PRECISION <br className="hidden md:block" />
            <span className="text-white/40 not-italic">MOBORAGE</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl uppercase tracking-[0.3em] font-medium"
          >
            Sourcing Excellence. Delivering Dreams.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-6 justify-center pointer-events-auto"
          >
            <Link to="/showroom" className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all flex items-center gap-2">
              Explore Portfolio <ArrowRight size={14} />
            </Link>
            <Link to="/corporate" className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              Fleet Procurement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Section */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <TrustItem icon={<ShieldCheck size={40} />} title="Global Verification" desc="Every unit undergoes rigorous physical inspection by our agents in Europe, USA, and Asia." />
            <TrustItem icon={<Search size={40} />} title="Market Transparency" desc="Full access to auction sheets, maintenance logs, and ownership history before you commit." />
            <TrustItem icon={<Zap size={40} />} title="Agile Logistics" desc="Dedicated shipping lanes and custom clearance protocols for rapid, safe delivery." />
          </div>
        </div>
      </section>

      {/* 3. Featured Vehicles */}
      <section className="py-32 bg-black">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <SectionHeading 
              label="Selected Objects" 
              title="Curated Acquisition" 
              description="A glimpse into the calibre of vehicles we secure for our discerning clients."
            />
            <Link to="/showroom" className="text-white hover:underline flex items-center gap-2 mb-12 font-bold uppercase tracking-widest text-[10px]">
              View Full Gallery <ArrowRight size={14} />
            </Link>
          </div>
          <CarGrid limit={3} showFilters={false} />
        </div>
      </section>

      {/* 4. How It Works - Modular Section */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading 
            align="center"
            label="Protocol"
            title="The Sourcing Lifecycle"
            description="Our systematic approach ensures every acquisition meets the Empathon standard."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-20 relative">
            <Step number="01" title="Briefing" desc="Defining parameters of make, year, and specification." />
            <Step number="02" title="Scanning" desc="Live monitoring of global inventories and auctions." />
            <Step number="03" title="Audit" desc="Physical inspection and historical data validation." />
            <Step number="04" title="Transit" desc="Secure roro or containerized delivery via Lagos." />
            <div className="hidden md:absolute md:block top-10 left-[15%] right-[15%] h-[1px] bg-white/5 z-0"></div>
          </div>
        </div>
      </section>

      {/* 5. Social Proof & Footer Sections */}
      <Testimonials />
      <FAQ />
      <ReservationForm />
      
      <section id="contact" className="py-24 max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
           <AppointmentBlock />
           <ContactForm />
        </div>
      </section>
    </motion.div>
  );
};

const TrustItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="space-y-6 group">
    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-2xl">
      {icon}
    </div>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="relative z-10 text-center space-y-4">
    <div className="w-20 h-20 bg-black border border-white/20 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-xl shadow-white/5">
      {number}
    </div>
    <h4 className="text-xl font-bold">{title}</h4>
    <p className="text-white/40 text-sm px-4">{desc}</p>
  </div>
);
