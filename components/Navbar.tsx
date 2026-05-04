
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { ComponentVariant } from '../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glass background intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black/80 backdrop-blur-xl py-3 shadow-lg shadow-black/20' 
            : 'bg-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative group text-sm font-medium tracking-widest uppercase text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant={ComponentVariant.GLASS} className="!py-2 !px-6 !text-xs !tracking-widest">
              Client Login
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-6'}`}></span>
             </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
          {NAV_ITEMS.map((item, idx) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl font-serif text-white hover:text-slate-300 transition-colors transform translate-y-0"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-8">
            <Button variant={ComponentVariant.PRIMARY} onClick={() => setIsMobileMenuOpen(false)}>
              Access Portal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
