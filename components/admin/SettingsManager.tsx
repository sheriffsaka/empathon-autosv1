
import React, { useState } from 'react';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';
import { MOCK_SITE_SETTINGS, MOCK_BRANDS } from '../../utils/mockData';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState(MOCK_SITE_SETTINGS);
  const [brands, setBrands] = useState(MOCK_BRANDS);
  const [newBrand, setNewBrand] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleAddBrand = () => {
    if (newBrand.trim()) {
      setBrands([...brands, newBrand.trim()]);
      setNewBrand('');
    }
  };

  const handleRemoveBrand = (brand: string) => {
    setBrands(brands.filter(b => b !== brand));
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* General Settings */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-serif text-white mb-6">General Settings</h3>
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div>
            <label className={labelClass}>Gallery Address (Lagos, Nigeria)</label>
            <textarea 
              className={inputClass} 
              rows={3} 
              value={settings.galleryAddress} 
              onChange={e => setSettings({...settings, galleryAddress: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Contact Email</label>
              <input 
                type="email" 
                className={inputClass} 
                value={settings.galleryEmail} 
                onChange={e => setSettings({...settings, galleryEmail: e.target.value})} 
              />
            </div>
            <div>
              <label className={labelClass}>Contact Phone</label>
              <input 
                type="text" 
                className={inputClass} 
                value={settings.galleryPhone} 
                onChange={e => setSettings({...settings, galleryPhone: e.target.value})} 
              />
            </div>
          </div>
          <div className="pt-4 border-t border-white/5">
            <h4 className="text-sm font-bold text-white mb-4">Brochure Download</h4>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Brochure Title</label>
                <input 
                  type="text" 
                  className={inputClass} 
                  value={settings.brochureTitle} 
                  onChange={e => setSettings({...settings, brochureTitle: e.target.value})} 
                />
              </div>
              <div>
                <label className={labelClass}>Brochure URL / File Link</label>
                <input 
                  type="text" 
                  className={inputClass} 
                  value={settings.brochureUrl} 
                  onChange={e => setSettings({...settings, brochureUrl: e.target.value})} 
                />
              </div>
            </div>
          </div>
          <Button type="submit" variant={ComponentVariant.PRIMARY} className="w-full justify-center" disabled={loading}>
            {loading ? 'Saving...' : 'Save Site Settings'}
          </Button>
        </form>
      </div>

      {/* Brand Management */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-serif text-white mb-6">Manage Brands Dropdown</h3>
        <div className="space-y-6">
          <div className="flex gap-2">
            <input 
              type="text" 
              className={inputClass} 
              placeholder="Add new brand..." 
              value={newBrand} 
              onChange={e => setNewBrand(e.target.value)} 
            />
            <Button variant={ComponentVariant.PRIMARY} onClick={handleAddBrand} className="!py-2 !px-4">
              Add
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl group hover:border-white/30 transition-colors">
                <span className="text-white text-sm">{brand}</span>
                <button 
                  onClick={() => handleRemoveBrand(brand)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-slate-500 italic">
            Note: These brands will appear in the reservation and inquiry forms across the site.
          </p>
        </div>
      </div>
    </div>
  );
};
