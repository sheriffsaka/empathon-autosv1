
import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/40 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="mb-6">
               <Logo />
             </div>
            
            <p className="text-slate-400 font-light max-w-md">
              Redefining the acquisition of luxury mobility. Corporate fleets and private collections managed with unparalleled precision.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#corporate" className="hover:text-empathon-rust transition-colors">Corporate Fleet</a></li>
              <li><a href="#private" className="hover:text-empathon-rust transition-colors">Private Brokerage</a></li>
              <li><a href="#corporate" className="hover:text-empathon-rust transition-colors">Import/Export</a></li>
              <li><a href="#concierge" className="hover:text-empathon-rust transition-colors">Maintenance Concierge</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
             <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#contact" className="hover:text-empathon-rust transition-colors">Contact Support</a></li>
              <li><a href="#contact" className="hover:text-empathon-rust transition-colors">Showroom Locations</a></li>
              <li><a href="#concierge" className="hover:text-empathon-rust transition-colors">Client Portal</a></li>
              <li><a href="#admin" className="text-empathon-rust hover:text-white transition-colors font-medium">Admin Portal</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-xs text-slate-600">© 2024 Empathon-Autos. All rights reserved.</p>
            <a 
              href="https://cloudcraves.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-slate-600 hover:text-empathon-rust transition-colors"
            >
              Site By: CloudCraves
            </a>
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
