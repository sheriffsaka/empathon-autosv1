import React, { useState } from 'react';
import { Button } from './Button';
import { ComponentVariant, BuyerType } from '../types';

export const ReservationForm: React.FC = () => {
  const [buyerType, setBuyerType] = useState<BuyerType>('Individual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    color: '',
    date: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      brand: '',
      model: '',
      color: '',
      date: '',
      notes: ''
    });
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const inputClasses = "w-full bg-white/5 border border-white/5 rounded-xl px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300";
  const labelClasses = "block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-3";

  return (
    <section className="py-24 relative bg-black/50" id="reservation">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase block mb-6">
            Elite Access
          </span>
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tighter italic">
            Secure Your Priority Allocation
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Whether for your personal collection, corporate fleet, or dealer inventory—our global concierge secures the world's most sought-after vehicles.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-zinc-950 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          
          {submitStatus === 'success' && (
             <div className="absolute inset-0 z-20 bg-black flex items-center justify-center flex-col animate-in fade-in duration-500">
                <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center mb-10 shadow-2xl shadow-white/10">
                   <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Request Registered</h3>
                <p className="text-zinc-500 text-lg">Our boutique procurement team will contact you within 4 hours.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-12 text-[10px] font-bold text-white uppercase tracking-[0.4em] border-b border-white/20 hover:border-white transition-all pb-1">Submit New Brief</button>
             </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Buyer Type Toggle */}
            <div className="flex flex-col items-center justify-center mb-12">
              <label className={labelClasses}>Select Profile</label>
              <div className="bg-white/5 p-1 rounded-full border border-white/10 flex relative overflow-hidden">
                {(['Individual', 'Corporate', 'Dealer'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBuyerType(type)}
                    className={`relative z-10 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                      buyerType === type ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
                {/* Active Pill Background */}
                <div 
                  className="absolute top-1 bottom-1 w-[calc(33.33%-2px)] bg-white rounded-full shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ 
                    transform: `translateX(${buyerType === 'Individual' ? '0%' : buyerType === 'Corporate' ? '100%' : '200%'})` 
                  }}
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label htmlFor="fullName" className={labelClasses}>Full Identity</label>
                <input 
                  required
                  type="text" 
                  name="fullName" 
                  id="fullName"
                  className={inputClasses}
                  placeholder="e.g. Aliko Dangote"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Direct Communication (Email)</label>
                <input 
                  required
                  type="email" 
                  name="email" 
                  id="email"
                  className={inputClasses}
                  placeholder="secure@business.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone / WhatsApp</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone"
                  className={inputClasses}
                  placeholder="+234 000 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                 <label htmlFor="date" className={labelClasses}>Desired Arrival Window</label>
                 <input 
                  type="date" 
                  name="date" 
                  id="date"
                  className={`${inputClasses} [color-scheme:dark] cursor-pointer`} 
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Car Details Divider */}
            <div className="pt-12 border-t border-white/5 mt-12">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white mb-10">Vehicle Specification Brief</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div>
                    <label htmlFor="brand" className={labelClasses}>Manufacturer</label>
                    <select 
                      name="brand" 
                      id="brand" 
                      className={inputClasses}
                      value={formData.brand}
                      onChange={handleChange}
                    >
                      <option value="" className="bg-zinc-900 text-zinc-600">Select Brand</option>
                      <option value="Mercedes-Benz" className="bg-zinc-900 text-white">Mercedes-Benz</option>
                      <option value="Land Rover" className="bg-zinc-900 text-white">Land Rover</option>
                      <option value="Porsche" className="bg-zinc-900 text-white">Porsche</option>
                      <option value="Lexus" className="bg-zinc-900 text-white">Lexus</option>
                      <option value="Toyota" className="bg-zinc-900 text-white">Toyota</option>
                      <option value="Other" className="bg-zinc-900 text-white">Custom Request</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="model" className={labelClasses}>Model Range</label>
                    <input 
                      type="text" 
                      name="model" 
                      id="model"
                      className={inputClasses}
                      placeholder="e.g. G63 AMG"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="color" className={labelClasses}>Aesthetic / Build Spec</label>
                    <input 
                      type="text" 
                      name="color" 
                      id="color"
                      className={inputClasses}
                      placeholder="e.g. Obsidian Black / Night Pkg"
                      value={formData.color}
                      onChange={handleChange}
                    />
                  </div>
               </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className={labelClasses}>Detailed Requirements / Bulk Notes</label>
              <textarea 
                name="notes" 
                id="notes"
                rows={4}
                className={inputClasses}
                placeholder="Include bulk quantity, shipping destination, or bespoke tuning requirements..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            {/* Submit Action */}
            <div className="pt-8">
              <Button 
                type="submit"
                disabled={isSubmitting}
                variant={ComponentVariant.PRIMARY} 
                className="w-full !py-6 !px-12 text-sm !tracking-[0.4em] font-bold uppercase shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? 'TRANSMITTING BRIEF...' : 'INITIATE PROCUREMENT REQUEST'}
              </Button>
              {submitStatus === 'error' && <p className="text-red-400 text-xs mt-4 text-center">Protocol failure. Please re-attempt submission.</p>}
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};
