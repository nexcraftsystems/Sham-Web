import React from 'react';
import logoImg from '../assets/images/liquidityx_logo_1791042338531.jpg';

interface LiquidityXLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSlogan?: boolean;
  className?: string;
}

export function LiquidityXLogo({
  size = 'md',
  showText = true,
  showSlogan = true,
  className = '',
}: LiquidityXLogoProps) {
  const sizeMap = {
    sm: {
      emblem: 'w-8 h-8',
      title: 'text-sm sm:text-base',
      slogan: 'text-[8px] sm:text-[9px]',
    },
    md: {
      emblem: 'w-10 h-10 sm:w-11 sm:h-11',
      title: 'text-base sm:text-lg',
      slogan: 'text-[9px] sm:text-[10px]',
    },
    lg: {
      emblem: 'w-14 h-14 sm:w-16 sm:h-16',
      title: 'text-xl sm:text-2xl',
      slogan: 'text-[10px] sm:text-xs',
    },
    xl: {
      emblem: 'w-20 h-20 sm:w-24 sm:h-24',
      title: 'text-2xl sm:text-3xl',
      slogan: 'text-xs sm:text-sm',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Polished Circular Emblem */}
      <div className={`relative ${currentSize.emblem} rounded-full p-[1.5px] bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_15px_rgba(245,158,11,0.35)] shrink-0 overflow-hidden group-hover:shadow-[0_0_22px_rgba(245,158,11,0.6)] transition-all duration-300`}>
        <img
          src={logoImg}
          alt="LiquidityX Emblem"
          className="w-full h-full object-cover rounded-full bg-black scale-105"
        />
        {/* Subtle gold specular shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-amber-300/10 to-transparent pointer-events-none" />
      </div>

      {/* Typography: LiquidityX + Slogan */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline leading-none">
            <span className={`font-syncopate font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 uppercase ${currentSize.title}`}>
              liquidity
            </span>
            <span className={`font-syncopate font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 uppercase ${currentSize.title} drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]`}>
              X
            </span>
          </div>

          {showSlogan && (
            <span className={`font-mono text-slate-400 tracking-[0.22em] lowercase mt-0.5 font-medium ${currentSize.slogan}`}>
              insight, analyze, grow
            </span>
          )}
        </div>
      )}
    </div>
  );
}
