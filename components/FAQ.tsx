
import React, { useState } from 'react';
import { MOCK_FAQS } from '../utils/mockData';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black/20" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 font-light">
            Common inquiries regarding acquisition, logistics, and ownership.
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((item, index) => (
            <div 
              key={item.id} 
              className={`border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'bg-white/5 border-white/30' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleIndex(index)}
              >
                <span className={`text-base md:text-lg font-medium transition-colors ${
                  activeIndex === index ? 'text-white' : 'text-slate-300'
                }`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  activeIndex === index 
                    ? 'border-white bg-white text-black rotate-180' 
                    : 'border-slate-600 text-slate-400'
                }`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-slate-400 text-sm md:text-base leading-relaxed font-light border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
