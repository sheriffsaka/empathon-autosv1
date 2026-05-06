
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'glass';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'solid', 
  className 
}) => {
  const variants = {
    solid: "bg-white text-black",
    outline: "border border-white/20 text-white",
    glass: "bg-white/10 backdrop-blur-md text-white border border-white/10"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
