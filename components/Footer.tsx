
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
             <div className="mb-8">
               <Logo imgClassName="h-12 md:h-20" />
             </div>
            
            <p className="text-zinc-500 font-light max-w-sm text-lg leading-relaxed">
              Nigeria's premier automobile brokerage. Redefining how individuals, corporations, and dealers source quality mobility.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Solutions</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link to="/showroom" className="hover:text-white transition-colors">Individual Showroom</Link></li>
              <li><Link to="/corporate" className="hover:text-white transition-colors">Fleet Solutions</Link></li>
              <li><Link to="/dealers" className="hover:text-white transition-colors">Dealer Inventory</Link></li>
              <li><Link to="/tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Navigation</h4>
             <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/showroom" className="hover:text-white transition-colors">Browse Stock</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><Link to="/admin" className="text-zinc-300 hover:text-white transition-colors font-medium">Internal Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600">© 2024 Empathon-Autos. Luxury Sourcing Reinvented.</p>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
