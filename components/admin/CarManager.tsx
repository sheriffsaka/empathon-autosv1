
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';
import { MOCK_CARS } from '../../utils/mockData';

export const CarManager: React.FC = () => {
  const [cars, setCars] = useState<any[]>(MOCK_CARS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Create/Edit Mode State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    min_price: '',
    max_price: '',
    condition: '',
    preorder: false
  });

  // Form State
  const initialFormState = {
    brand: 'Mercedes-Benz',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    status: 'Available',
    condition: 'Used',
    buyerType: ['Individual'], 
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchCars = () => {
    setLoading(true);
    // Simulate filtering
    let filtered = [...MOCK_CARS];
    if (filters.brand) filtered = filtered.filter(c => c.brand === filters.brand);
    if (filters.status) filtered = filtered.filter(c => c.status === filters.status);
    if (filters.condition) filtered = filtered.filter(c => c.condition === filters.condition);
    if (filters.min_price) filtered = filtered.filter(c => c.price >= Number(filters.min_price));
    if (filters.max_price) filtered = filtered.filter(c => c.price <= Number(filters.max_price));
    if (filters.preorder) filtered = filtered.filter(c => c.status === 'Pre-Order');
    
    setCars(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, [filters, isFormOpen]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleEdit = (car: any) => {
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price.toString(),
      mileage: car.mileage.toString(),
      transmission: car.transmission,
      fuelType: car.fuelType,
      status: car.status,
      condition: car.condition || 'Used',
      buyerType: car.buyerType || [],
      image: car.image
    });
    setEditingId(car.id);
    setImageFile(null); // Reset file input
    setIsFormOpen(true);
  };

  const uploadImage = async (file: File): Promise<string> => {
    // Mock upload
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUploading(false);
    return URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Require image for new cars
    if (!editingId && !imageFile && !formData.image) {
      alert("Please upload a vehicle image.");
      return;
    }

    setLoading(true);

    let finalImageUrl = formData.image;

    // Handle Image Upload if file selected
    if (imageFile) {
      finalImageUrl = await uploadImage(imageFile);
    }

    const payload = {
      ...formData,
      id: editingId || Math.random().toString(36).substr(2, 9),
      image: finalImageUrl,
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      buyerType: formData.buyerType,
      created_at: new Date().toISOString()
    };

    if (editingId) {
      setCars(prev => prev.map(c => c.id === editingId ? payload : c));
    } else {
      setCars(prev => [payload, ...prev]);
    }

    setIsFormOpen(false);
    setFormData(initialFormState);
    setImageFile(null);
    setEditingId(null);
    setLoading(false);
  };

  const toggleBuyerType = (type: string) => {
    const currentTypes = formData.buyerType;
    if (currentTypes.includes(type)) {
      setFormData({ ...formData, buyerType: currentTypes.filter(t => t !== type) });
    } else {
      setFormData({ ...formData, buyerType: [...currentTypes, type] });
    }
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white transition-colors";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      
      {isFormOpen ? (
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
             <h2 className="text-2xl font-serif text-white">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
             <button 
               onClick={() => {
                 setIsFormOpen(false);
                 setEditingId(null);
                 setFormData(initialFormState);
                 setImageFile(null);
               }} 
               className="text-slate-400 hover:text-white transition-colors"
             >
               Cancel
             </button>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Brand</label>
                <select 
                  className={inputClass}
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                >
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Rolls-Royce">Rolls-Royce</option>
                  <option value="Bentley">Bentley</option>
                  <option value="Porsche">Porsche</option>
                  <option value="Aston Martin">Aston Martin</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Model</label>
                <input required type="text" className={inputClass} placeholder="e.g. GLE 350" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input required type="number" className={inputClass} value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} />
              </div>
              <div>
                <label className={labelClass}>Condition</label>
                 <select 
                  className={inputClass}
                  value={formData.condition}
                  onChange={e => setFormData({...formData, condition: e.target.value})}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                  <label className={labelClass}>Price (₦)</label>
                  <input required type="number" className={inputClass} placeholder="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
               </div>
               <div>
                  <label className={labelClass}>Mileage</label>
                  <input required type="number" className={inputClass} placeholder="0" value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} />
               </div>
               <div>
                  <label className={labelClass}>Status</label>
                  <select className={inputClass} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                     <option value="Available">Available</option>
                     <option value="Reserved">Reserved</option>
                     <option value="Pre-Order">Pre-Order</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Transmission</label>
                <select className={inputClass} value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})}>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="PDK">PDK</option>
                  <option value="E-Drive">E-Drive</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Fuel Type</label>
                <select className={inputClass} value={formData.fuelType} onChange={e => setFormData({...formData, fuelType: e.target.value})}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
               <label className={labelClass}>Vehicle Image</label>
               <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="block w-full text-sm text-slate-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-xs file:font-semibold
                        file:bg-white file:text-black
                        hover:file:bg-slate-200"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                    />
                    <p className="text-[10px] text-slate-500 mt-2">
                       {editingId ? "Upload to replace current image." : "Required."}
                    </p>
                  </div>
                  {(imageFile || formData.image) && (
                     <div className="w-24 h-24 rounded-lg bg-black/40 overflow-hidden border border-white/10">
                        <img 
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                     </div>
                  )}
               </div>
            </div>

            <div>
              <label className={labelClass}>Target Market</label>
              <div className="flex gap-4 mt-2">
                 <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-white/50 transition-colors">
                    <input type="checkbox" checked={formData.buyerType.includes('Individual')} onChange={() => toggleBuyerType('Individual')} className="accent-white" />
                    <span className="text-sm text-white">Individual</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:border-white/50 transition-colors">
                    <input type="checkbox" checked={formData.buyerType.includes('Corporate')} onChange={() => toggleBuyerType('Corporate')} className="accent-white" />
                    <span className="text-sm text-white">Corporate</span>
                 </label>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
               <button 
                 type="button" 
                 onClick={() => {
                   setIsFormOpen(false);
                   setEditingId(null);
                   setFormData(initialFormState);
                   setImageFile(null);
                 }} 
                 className="px-6 py-2 rounded-xl text-slate-400 hover:text-white transition-colors"
               >
                 Cancel
               </button>
               <Button type="submit" variant={ComponentVariant.PRIMARY} disabled={loading || uploading}>
                 {loading || uploading ? 'Processing...' : (editingId ? 'Update Vehicle' : 'Add Vehicle')}
               </Button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Filters Panel */}
          <div className="w-full lg:w-64 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit shrink-0">
            <h3 className="text-white font-serif text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Brand</label>
                <select 
                  value={filters.brand}
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white outline-none"
                >
                  <option value="">All Brands</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Rolls-Royce">Rolls-Royce</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Condition</label>
                <select 
                  value={filters.condition}
                  onChange={(e) => setFilters({...filters, condition: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white outline-none"
                >
                  <option value="">Any</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Certified Pre-Owned">CPO</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Pre-Order">Pre-Order</option>
                </select>
              </div>

              <Button 
                variant={ComponentVariant.SECONDARY}
                className="w-full !py-2 !text-xs mt-4"
                onClick={() => setFilters({brand: '', status: '', min_price: '', max_price: '', condition: '', preorder: false})}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-white">Vehicle Inventory</h2>
              <Button 
                variant={ComponentVariant.PRIMARY} 
                onClick={() => {
                  setFormData(initialFormState);
                  setEditingId(null);
                  setIsFormOpen(true);
                }} 
                className="!py-2 !px-4 !text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Vehicle
              </Button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
                <button onClick={() => fetchCars()} className="ml-auto underline hover:text-white">Retry</button>
              </div>
            )}

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-black z-10">
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Image</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price (₦)</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={5} className="py-8 text-center text-slate-500">Loading fleet data...</td></tr>
                  ) : cars.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <p className="text-slate-500 mb-4">No vehicles found in your inventory.</p>
                        <Button 
                          variant={ComponentVariant.PRIMARY} 
                          onClick={() => {
                            setFormData(initialFormState);
                            setEditingId(null);
                            setIsFormOpen(true);
                          }}
                          className="!py-2 !px-4 !text-xs"
                        >
                          Add Your First Vehicle
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    cars.map((car) => (
                      <tr key={car.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="w-16 h-10 rounded overflow-hidden bg-white/5 border border-white/10">
                             <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white font-medium">{car.brand} {car.model}</div>
                          <div className="text-xs text-slate-500">{car.year} • {car.condition} • {car.mileage?.toLocaleString() || '0'} mi</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-mono">
                          ₦{Number(car.price || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                            car.status === 'Available' ? 'bg-green-500/10 text-green-500' :
                            car.status === 'Reserved' ? 'bg-red-500/10 text-red-500' :
                            'bg-white/10 text-white'
                          }`}>
                            {car.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(car)}
                                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(car.id)}
                                className="text-xs text-red-400 hover:text-red-300 px-2 py-1 bg-white/5 hover:bg-red-500/20 rounded transition-colors"
                              >
                                Delete
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
