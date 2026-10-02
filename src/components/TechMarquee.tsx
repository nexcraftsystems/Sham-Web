import React from 'react';
import {
  Trophy,
  Zap,
  Gift,
  Bot,
  Flame,
  Coins,
  ShieldCheck,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function TechMarquee() {
  const { language } = useLanguage();

  const marqueeItems = [
    {
      icon: Bot,
      text:
        language === 'id'
          ? 'FREE TRIAL SEMINGGU INDICATOR BERNILAI 10K USD'
          : 'FREE 1-WEEK VIP INDICATOR TRIAL ($10,000 USD VALUE)',
    },
    { icon: Zap, text: '10 LOT SELF REBATE' },
    { icon: Coins, text: 'USD 14 / LOT' },
    {
      icon: Gift,
      text:
        language === 'id'
          ? 'CONTACT SUPPORT FOR CLAIM 14USD FREE NOW'
          : 'CONTACT SUPPORT FOR CLAIM 14USD FREE NOW',
    },
    {
      icon: Coins,
      text: language === 'id' ? '100 LOT · CASH 2.2 JUTA' : '100 LOT · CASH 2.2M IDR',
    },
    { icon: Smartphone, text: '200 LOT · IPAD 11' },
    { icon: Smartphone, text: '350 LOT · IPHONE 17' },
    {
      icon: Laptop,
      text:
        language === 'id'
          ? '500 LOT · MACBOOK NEO + 3.5 JUTA'
          : '500 LOT · MACBOOK NEO + 3.5M IDR',
    },
    {
      icon: Trophy,
      text:
        language === 'id'
          ? '1,000 LOT · MACBOOK NEO + 17 JUTA'
          : '1,000 LOT · MACBOOK NEO + 17M IDR',
    },
    {
      icon: ShieldCheck,
      text:
        language === 'id'
          ? 'PELACAKAN REBATE REAL-TIME OTOMATIS'
          : 'AUTOMATED REAL-TIME REBATE TRACKING',
    },
  ];

  return (
    <div className="w-full border-y border-white/8 bg-black/40 backdrop-blur-md py-3.5 overflow-hidden relative select-none">
      {/* Subtle Cyan Gradient Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track (28s duration from template) */}
      <div className="animate-marquee flex items-center gap-10">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-300 hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className={idx % 4 === 0 || idx % 4 === 2 ? 'text-cyan-300 font-bold' : ''}>
                {item.text}
              </span>
              <span className="text-white/20 ml-6">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
