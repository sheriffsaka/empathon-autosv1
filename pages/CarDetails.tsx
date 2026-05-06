import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Gauge, Zap, Fuel, Calendar, ShieldCheck, ArrowRight, Share2, Printer } from 'lucide-react';
import { MOCK_CARS } from './../constants';
import { Car } from './../types';
import { Button } from '../components/Button';
import { Badge } from '../components/ui/Badge';

export const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const foundCar = MOCK_CARS.find(c => c.id === id);
    if (foundCar) {
      setCar(foundCar);
    }
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Vehicle Not Found</h2>
          <Button onClick={() => navigate('/showroom')}>Back to Showroom</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-24 pb-32"
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        {/* Breadcrumbs / Back */}
        <Link to="/showroom" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase tracking-[0.3em] mb-12 group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Image Gallery (Simplified for now) */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div className="rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 aspect-[4/3] relative group">
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-8 left-8 flex gap-3">
                <Badge variant="glass">{car.status}</Badge>
                {car.sector && <Badge variant="solid" className="bg-empathon-rust text-black">{car.sector}</Badge>}
              </div>
              <div className="absolute bottom-8 right-8 flex gap-3">
                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Share2 size={16} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                  <Printer size={16} />
                </button>
              </div>
            </div>
            {/* Thumbnails (Mock) */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden cursor-pointer hover:border-white/20 transition-all opacity-50 hover:opacity-100">
                   <img src={car.image} className="w-full h-full object-cover filter grayscale" alt="thumbnail" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-12"
          >
            <div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">
                Reference ID: EP-{car.id.toUpperCase()}
              </span>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 italic leading-[0.9]">
                {car.brand} <br />
                <span className="not-italic text-white/30">{car.model}</span>
              </h1>
              <div className="flex items-end gap-6 pt-4">
                <span className="text-5xl font-mono tracking-tighter text-white">
                  ₦{(car.price / 1000000).toLocaleString()}M
                </span>
                <span className="text-zinc-500 text-sm mb-2 uppercase tracking-widest font-bold">Price incl. Clearing</span>
              </div>
            </div>

            {/* Technical grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-white/5">
              <SpecItem icon={<Calendar size={20} />} label="Model Year" value={car.year.toString()} />
              <SpecItem icon={<Gauge size={20} />} label="Mileage" value={`${car.mileage.toLocaleString()} KM`} />
              <SpecItem icon={<Zap size={20} />} label="Transmission" value={car.transmission} />
              <SpecItem icon={<Fuel size={20} />} label="Fuel System" value={car.fuelType} />
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Acquisition Protocol</h3>
              <div className="space-y-4">
                <ProtocolFeature title="Global Logistics" desc="Secured transit from origin node (Lagos, London, or Dubai) with full tracking." />
                <ProtocolFeature title="Audited History" desc="Verified maintenance logs and 150-point physical inspection report included." />
                <ProtocolFeature title="Clearance Included" desc="All customs duties, port charges, and registration fees handled by Empathon." />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-8">
              <Button className="flex-1 !py-6 !text-xs !tracking-[0.4em] uppercase font-bold">
                Initiate Acquisition <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="glass" className="flex-1 !py-6 !text-xs !tracking-[0.4em] uppercase font-bold border border-white/10">
                Request Full Report
              </Button>
            </div>

          </motion.div>
        </div>

        {/* Similar items could go here... */}
      </div>
    </motion.div>
  );
};

const SpecItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="space-y-2">
    <div className="text-zinc-600 mb-2">{icon}</div>
    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</div>
    <div className="text-base font-medium">{value}</div>
  </div>
);

const ProtocolFeature = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-6 items-start group">
    <div className="w-1 h-1 rounded-full bg-zinc-800 mt-2.5 transition-all group-hover:scale-[2.5] group-hover:bg-empathon-rust" />
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-zinc-500 text-sm">{desc}</p>
    </div>
  </div>
);
