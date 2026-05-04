
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { ComponentVariant } from '../../types';
import { MOCK_HERO, MOCK_TESTIMONIALS, MOCK_FAQS, MOCK_CORPORATE_CARD } from '../../utils/mockData';

export const ContentManager: React.FC = () => {
  const [section, setSection] = useState<'hero' | 'testimonials' | 'faqs' | 'corporate'>('hero');
  const [data, setData] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>(MOCK_HERO);
  const [testimonials, setTestimonials] = useState<any[]>(MOCK_TESTIMONIALS);
  const [faqs, setFaqs] = useState<any[]>(MOCK_FAQS);
  const [corporateCard, setCorporateCard] = useState<any>(MOCK_CORPORATE_CARD);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState<any>({});
  
  // File states
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [carFile, setCarFile] = useState<File | null>(null);
  const [corporateFile, setCorporateFile] = useState<File | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    if (section === 'hero') {
      setData(heroSlides);
    } else if (section === 'testimonials') {
      setData(testimonials);
    } else if (section === 'faqs') {
      setData(faqs);
    } else {
      setData([corporateCard]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [section, heroSlides, testimonials, faqs, corporateCard]);

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({});
    setHeroFile(null);
    setAvatarFile(null);
    setCarFile(null);
    setCorporateFile(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this item?')) return;
    if (section === 'hero') {
      setHeroSlides(prev => prev.filter(s => s.id !== id));
    } else if (section === 'testimonials') {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } else if (section === 'faqs') {
      setFaqs(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id || 'corporate');
    setFormData(item);
    setIsFormOpen(true);
    setHeroFile(null);
    setAvatarFile(null);
    setCarFile(null);
    setCorporateFile(null);
  };

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUploading(false);
    return URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (section === 'hero' && !editingId && !heroFile && !formData.imageUrl) {
      alert("Please upload a slide image to continue.");
      return;
    }

    setLoading(true);
    let payload = { ...formData };

    if (section === 'hero') {
      if (heroFile) {
        payload.imageUrl = await uploadFile(heroFile);
      }
      payload.ctaPrimaryText = payload.ctaPrimaryText || 'View Inventory';
      payload.ctaSecondaryText = payload.ctaSecondaryText || 'Contact Us';
      if (!editingId) {
        payload.id = Math.random().toString(36).substr(2, 9);
        payload.displayOrder = heroSlides.length + 1;
        payload.createdAt = new Date().toISOString();
        setHeroSlides(prev => [...prev, payload]);
      } else {
        setHeroSlides(prev => prev.map(s => s.id === editingId ? payload : s));
      }
    } else if (section === 'testimonials') {
      if (avatarFile) {
        payload.avatarUrl = await uploadFile(avatarFile);
      }
      if (carFile) {
        payload.carPurchasedImageUrl = await uploadFile(carFile);
      }
      payload.rating = Number(payload.rating) || 5;
      payload.clientType = payload.clientType || 'Individual';
      
      if (!editingId) {
        payload.id = Math.random().toString(36).substr(2, 9);
        payload.createdAt = new Date().toISOString();
        setTestimonials(prev => [...prev, payload]);
      } else {
        setTestimonials(prev => prev.map(t => t.id === editingId ? payload : t));
      }
    } else if (section === 'faqs') {
      if (!editingId) {
        payload.id = Math.random().toString(36).substr(2, 9);
        setFaqs(prev => [...prev, payload]);
      } else {
        setFaqs(prev => prev.map(f => f.id === editingId ? payload : f));
      }
    } else if (section === 'corporate') {
      if (corporateFile) {
        payload.imageUrl = await uploadFile(corporateFile);
      }
      setCorporateCard(payload);
    }

    resetForm();
    setLoading(false);
  };

  const inputClass = "w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white";
  const labelClass = "block text-xs text-slate-400 uppercase tracking-widest mb-2";

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0 overflow-x-auto pb-2">
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10 whitespace-nowrap">
          <button 
            onClick={() => { setSection('hero'); resetForm(); }}
            className={`px-4 py-2 rounded-md text-xs md:text-sm transition-all ${section === 'hero' ? 'bg-white text-black shadow' : 'text-slate-400'}`}
          >
            Hero Slides
          </button>
          <button 
            onClick={() => { setSection('testimonials'); resetForm(); }}
            className={`px-4 py-2 rounded-md text-xs md:text-sm transition-all ${section === 'testimonials' ? 'bg-white text-black shadow' : 'text-slate-400'}`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => { setSection('faqs'); resetForm(); }}
            className={`px-4 py-2 rounded-md text-xs md:text-sm transition-all ${section === 'faqs' ? 'bg-white text-black shadow' : 'text-slate-400'}`}
          >
            FAQs
          </button>
          <button 
            onClick={() => { setSection('corporate'); resetForm(); }}
            className={`px-4 py-2 rounded-md text-xs md:text-sm transition-all ${section === 'corporate' ? 'bg-white text-black shadow' : 'text-slate-400'}`}
          >
            Corporate Card
          </button>
        </div>
        {!isFormOpen && section !== 'corporate' && (
          <Button variant={ComponentVariant.PRIMARY} className="!py-2 !px-4 !text-xs md:!text-sm ml-4" onClick={() => setIsFormOpen(true)}>
            Create New {section === 'hero' ? 'Slide' : section === 'testimonials' ? 'Testimonial' : 'FAQ'}
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="flex-1 overflow-auto min-h-0">
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-serif text-white">
                 {editingId ? 'Edit' : 'Add New'} {
                   section === 'hero' ? 'Hero Slide' : 
                   section === 'testimonials' ? 'Testimonial' : 
                   section === 'faqs' ? 'FAQ' : 'Corporate Card'
                 }
               </h3>
               <button onClick={resetForm} className="text-slate-400 hover:text-white">Cancel</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {section === 'hero' && (
                <>
                  <div>
                    <label className={labelClass}>Title</label>
                    <input required type="text" className={inputClass} placeholder="e.g. The New GLE 350" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Subtitle</label>
                    <textarea required className={inputClass} rows={2} placeholder="Description text..." value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className={labelClass}>Slide Image {(!editingId && !formData.imageUrl) && <span className="text-white">*</span>}</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-slate-200"
                      onChange={(e) => e.target.files && setHeroFile(e.target.files[0])}
                    />
                    {(heroFile || formData.imageUrl) && (
                      <div className="mt-2 h-24 w-full bg-black/40 rounded overflow-hidden relative">
                         <img src={heroFile ? URL.createObjectURL(heroFile) : formData.imageUrl} className="h-full w-full object-contain" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Primary Button Text</label>
                      <input type="text" className={inputClass} placeholder="View Inventory" value={formData.ctaPrimaryText || ''} onChange={e => setFormData({...formData, ctaPrimaryText: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary Button Text</label>
                      <input type="text" className={inputClass} placeholder="Contact Us" value={formData.ctaSecondaryText || ''} onChange={e => setFormData({...formData, ctaSecondaryText: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              {section === 'testimonials' && (
                 <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Client Name</label>
                      <input required type="text" className={inputClass} placeholder="e.g. John Doe" value={formData.clientName || ''} onChange={e => setFormData({...formData, clientName: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClass}>Client Type</label>
                      <select className={inputClass} value={formData.clientType || 'Individual'} onChange={e => setFormData({...formData, clientType: e.target.value})}>
                         <option value="Individual">Individual</option>
                         <option value="Corporate">Corporate</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Role / Title</label>
                    <input type="text" className={inputClass} placeholder="e.g. CEO of TechCorp" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Testimonial Content</label>
                    <textarea required className={inputClass} rows={3} placeholder="Quote..." value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <label className={labelClass}>Client Avatar</label>
                        <input 
                           type="file" accept="image/*"
                           className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-white file:text-black"
                           onChange={(e) => e.target.files && setAvatarFile(e.target.files[0])}
                        />
                         {(avatarFile || formData.avatarUrl) && (
                           <div className="mt-2 h-16 w-16 rounded-full overflow-hidden bg-black/40">
                              <img src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatarUrl} className="h-full w-full object-cover" />
                           </div>
                        )}
                     </div>
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <label className={labelClass}>Purchased Car Img</label>
                        <input 
                           type="file" accept="image/*"
                           className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-white file:text-black"
                           onChange={(e) => e.target.files && setCarFile(e.target.files[0])}
                        />
                         {(carFile || formData.carPurchasedImageUrl) && (
                           <div className="mt-2 h-16 w-full rounded overflow-hidden bg-black/40">
                              <img src={carFile ? URL.createObjectURL(carFile) : formData.carPurchasedImageUrl} className="h-full w-full object-cover" />
                           </div>
                        )}
                     </div>
                  </div>

                  <div>
                    <label className={labelClass}>Rating (1-5)</label>
                    <input type="number" min="1" max="5" className={inputClass} value={formData.rating || 5} onChange={e => setFormData({...formData, rating: e.target.value})} />
                  </div>
                </>
              )}

              {section === 'faqs' && (
                <>
                  <div>
                    <label className={labelClass}>Question</label>
                    <input required type="text" className={inputClass} placeholder="e.g. How do I pre-order?" value={formData.question || ''} onChange={e => setFormData({...formData, question: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Answer</label>
                    <textarea required className={inputClass} rows={4} placeholder="Detailed answer..." value={formData.answer || ''} onChange={e => setFormData({...formData, answer: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} value={formData.category || 'General'} onChange={e => setFormData({...formData, category: e.target.value})}>
                       <option value="General">General</option>
                       <option value="Finance">Finance</option>
                       <option value="Location">Location</option>
                       <option value="Fleet">Fleet</option>
                    </select>
                  </div>
                </>
              )}

              {section === 'corporate' && (
                <>
                  <div>
                    <label className={labelClass}>Card Title</label>
                    <input required type="text" className={inputClass} value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Card Subtitle</label>
                    <input required type="text" className={inputClass} value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea required className={inputClass} rows={4} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <label className={labelClass}>Background Image</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-slate-200"
                      onChange={(e) => e.target.files && setCorporateFile(e.target.files[0])}
                    />
                    {(corporateFile || formData.imageUrl) && (
                      <div className="mt-2 h-32 w-full bg-black/40 rounded overflow-hidden relative">
                         <img src={corporateFile ? URL.createObjectURL(corporateFile) : formData.imageUrl} className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                </>
              )}

              <Button type="submit" disabled={loading || uploading} variant={ComponentVariant.PRIMARY} className="w-full justify-center">
                {loading || uploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Create')}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto min-h-0">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => fetchData()} className="underline hover:text-white">Retry</button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
            {loading ? (
              <div className="col-span-3 text-center text-slate-500 py-12">Loading content...</div>
            ) : data.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <p className="text-slate-500 mb-4">No items found.</p>
              </div>
            ) : (
              data.map((item: any) => (
                <div key={item.id || 'corporate'} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-white/50 transition-colors flex flex-col h-full">
                  {section === 'hero' && (
                    <>
                      <div className="h-40 bg-black/40 relative shrink-0">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-white font-bold mb-1 truncate">{item.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1">{item.subtitle}</p>
                        <div className="flex justify-end gap-2 pt-2 border-t border-white/5 shrink-0">
                           <button onClick={() => handleEdit(item)} className="text-xs text-slate-300 hover:text-white px-3 py-1 bg-white/5 rounded transition-colors hover:bg-white/10">Edit</button>
                           <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 bg-white/5 rounded transition-colors hover:bg-red-500/20">Delete</button>
                        </div>
                      </div>
                    </>
                  )}
                  {section === 'testimonials' && (
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                           {item.avatarUrl ? <img src={item.avatarUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-slate-700"></div>}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">{item.clientName}</h4>
                          <p className="text-slate-500 text-xs">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mb-4 flex-1 italic">"{item.content}"</p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-4 shrink-0">
                         <span className="text-white text-xs font-bold">{item.rating} Stars</span>
                         <div className="flex gap-2">
                            <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/5">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10">Delete</button>
                         </div>
                      </div>
                    </div>
                  )}
                  {section === 'faqs' && (
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-white px-2 py-0.5 bg-white/10 rounded">{item.category}</span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-2">{item.question}</h4>
                      <p className="text-slate-400 text-xs mb-4 flex-1 line-clamp-3">{item.answer}</p>
                      <div className="flex justify-end gap-2 pt-4 border-t border-white/5 shrink-0">
                        <button onClick={() => handleEdit(item)} className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/5">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-500/10">Delete</button>
                      </div>
                    </div>
                  )}
                  {section === 'corporate' && (
                    <div className="p-6 flex flex-col h-full">
                      <div className="h-32 bg-black/40 relative mb-4 rounded-lg overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60" />
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2">{item.subtitle}</p>
                      <p className="text-slate-400 text-xs mb-4 flex-1 line-clamp-3">{item.description}</p>
                      <div className="flex justify-end pt-4 border-t border-white/5 shrink-0">
                        <button onClick={() => handleEdit(item)} className="text-white bg-white/10 hover:bg-white/20 text-xs px-4 py-2 rounded transition-colors">Edit Card Content</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
