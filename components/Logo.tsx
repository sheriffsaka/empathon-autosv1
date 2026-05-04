
import React from 'react';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  imgClassName = "h-20 md:h-32", 
  textClassName = "text-xl md:text-2xl" 
}) => {
  return (
    <div className={`flex items-center gap-6 cursor-pointer group ${className}`}>
      <img 
        src="https://res.cloudinary.com/di7okmjsx/image/upload/v1777915476/Logo_Ash_tbwruk.png" 
        alt="Empathon-Autos Logo" 
        className={`w-auto object-contain brightness-100 group-hover:brightness-90 transition-all duration-300 ${imgClassName}`}
        referrerPolicy="no-referrer"
      />
      <span className={`font-sans font-light tracking-tight text-white ${textClassName}`}>
        Empathon-Autos
      </span>
    </div>
  );
};
