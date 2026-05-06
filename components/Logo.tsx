
import React from 'react';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  imgClassName = "h-12 md:h-16", 
  textClassName = "" 
}) => {
  return (
    <div className={`flex items-center cursor-pointer group ${className}`}>
      <img 
        src="https://res.cloudinary.com/di7okmjsx/image/upload/v1777990862/empathanlogonew_heqr8g.png" 
        alt="Empathon-Autos Logo" 
        className={`w-auto object-contain brightness-100 group-hover:brightness-90 transition-all duration-300 ${imgClassName}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
