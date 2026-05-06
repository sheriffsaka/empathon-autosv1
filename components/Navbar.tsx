
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { ComponentVariant } from '../types';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glass background intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black/95 backdrop-blur-xl py-3 shadow-lg shadow-black/20' 
            : 'bg-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
            <Logo imgClassName="h-10 md:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label}
                to={item.href}
                className={`relative group text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === item.href ? 'text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-white transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/tracking">
              <Button variant={ComponentVariant.GLASS} className="!py-2 !px-6 !text-[10px] !tracking-[0.2em] border-white/20 hover:border-white">
                TRACK ORDER
              </Button>
            </Link>
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
            <Link 
              key={item.label}
              to={item.href}
              className={`text-4xl font-bold uppercase tracking-tighter transition-colors ${
                location.pathname === item.href ? 'text-white' : 'text-zinc-700'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8">
            <Link to="/tracking">
              <Button variant={ComponentVariant.PRIMARY} className="px-12 py-4">
                TRACK ORDER
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
