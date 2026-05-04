
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-4 cursor-pointer group ${className}`}>
      <img 
        src="https://res.cloudinary.com/di7okmjsx/image/upload/v1777915476/Logo_Ash_tbwruk.png" 
        alt="Empathon-Autos Logo" 
        className="w-auto h-12 md:h-16 object-contain brightness-100 group-hover:brightness-90 transition-all duration-300"
        referrerPolicy="no-referrer"
      />
      <span className="font-sans text-3xl md:text-4xl font-light tracking-tight text-white">
        Empathon-Autos
      </span>
    </div>
  );
};
