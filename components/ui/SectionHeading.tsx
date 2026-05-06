
import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  label, 
  title, 
  description, 
  align = 'left' 
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 block mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
        {title}
      </h2>
      {description && (
        <p className={`text-zinc-500 text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};
