import React from 'react';
import { ArrowUpRight, Send, ShieldCheck, Sparkles, Trophy, Award, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

import prizeCash from '../assets/images/prize_cash_indonesia_clean_1790848397390.jpg';
import prizeIpad from '../assets/images/prize_ipad11_clean_1790848412060.jpg';
import prizeIphone from '../assets/images/prize_iphone17_clean_1790848425779.jpg';
import prizeMacbookCash from '../assets/images/prize_macbook_cash_clean_1790848440355.jpg';
import prizeMacbookBigCash from '../assets/images/prize_macbook_big_cash_1790849343404.jpg';

interface OrbSectionProps {
  onOpenTelegram?: () => void;
}

export function OrbSection({ onOpenTelegram }: OrbSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].lotTargets;

  const prizeTiers = [
    {
      lot: '100 LOT',
      title: language === 'id' ? 'Cash 2.2 Juta Rupiah' : 'Cash 2.2 Million IDR',
      subtitle: language === 'id' ? 'Transfer Tunai Langsung ke Rekening' : 'Direct Cash Transfer to Bank',
      badge: 'Starter Milestone',
      image: prizeCash,
      glowColor: 'from-amber-500/20 via-transparent to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
      tag: '100% Guaranteed Payout',
    },
    {
      lot: '200 LOT',
      title: 'Apple iPad 11',
      subtitle: language === 'id' ? 'Tablet Next-Gen untuk Analisa & Trading' : 'Next-Gen Tablet for Trading On-The-Go',
      badge: 'Trader Tech',
      image: prizeIpad,
      glowColor: 'from-slate-300/20 via-transparent to-transparent',
      borderColor: 'border-slate-300/30 hover:border-slate-200',
      badgeColor: 'bg-slate-900/80 border-slate-400/40 text-slate-200',
      tag: 'Official Apple Device',
    },
    {
      lot: '350 LOT',
      title: 'Apple iPhone 17',
      subtitle: language === 'id' ? 'Smartphone Flagship Titanium Terbaru' : 'Latest Titanium Flagship Smartphone',
      badge: 'Flagship Device',
      image: prizeIphone,
      glowColor: 'from-amber-400/20 via-slate-300/10 to-transparent',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
      tag: 'Brand New Sealed in Box',
    },
    {
      lot: '500 LOT',
      title: language === 'id' ? 'MacBook Neo + Cash 3.5 Juta' : 'MacBook Neo + Cash 3.5M IDR',
      subtitle: language === 'id' ? 'Laptop Performa Tinggi + Bonus Tunai' : 'High Performance Laptop + Cash Bonus',
      badge: 'Pro Tier Package',
      image: prizeMacbookCash,
      glowColor: 'from-slate-200/20 via-amber-400/15 to-transparent',
      borderColor: 'border-slate-300/40 hover:border-slate-100',
      badgeColor: 'bg-slate-900/90 border-slate-300/50 text-slate-100',
      tag: 'MacBook + Cash Combo',
    },
    {
      lot: '1,000 LOT',
      title: language === 'id' ? 'MacBook Neo + Cash 17 Juta' : 'MacBook Neo + Cash 17M IDR',
      subtitle: language === 'id' ? 'Hadiah Utama: Laptop Pro + Tunai 17 Juta Rupiah' : 'Grand Prize: Pro Laptop + 17M IDR Cash',
      badge: '⭐ GRAND CHAMPION PRIZE',
      image: prizeMacbookBigCash,
      glowColor: 'from-amber-500/35 via-yellow-400/20 to-transparent',
      borderColor: 'border-amber-500/60 hover:border-yellow-400 shadow-[0_0_35px_rgba(245,158,11,0.3)]',
      badgeColor: 'bg-amber-950/90 border-amber-400/70 text-amber-300 font-bold',
      tag: 'Ultimate Trader Milestone',
    },
  ];

  return (
    <section
      id="rewards"
      className="relative w-full py-16 md:py-24 px-5 md:px-8 max-w-7xl mx-auto z-10 border-b border-white/8 select-none"
    >
      {/* Section Header with "02 // REWARDS" */}
      <div className="reveal-division flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>02 // REWARDS</span>
          </div>
          <h2 className="font-syncopate text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
            {t.heading}
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-light leading-relaxed">
            {language === 'id'
              ? 'Seluruh hadiah 100% full original & bergaransi resmi. Kumpulkan lot Anda dan klaim langsung ke admin Telegram tanpa undian.'
              : 'All rewards are 100% genuine and guaranteed. Accumulate your closed lots and claim directly with admin on Telegram with zero draws.'}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            TRADE & CLAIM X SELF REBATE 10USD
          </span>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-950/70 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.contactAdminClaim}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* MODERN LUXURY PRIZE GRID LAYOUT WITH FULL VIBRANT COLOR PICTURES */}
      <div className="space-y-8">
        {/* Row 1: The Three Starter & Flagship Tiers (100 Lot, 200 Lot, 350 Lot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {prizeTiers.slice(0, 3).map((tier, idx) => (
            <div
              key={idx}
              className={`reveal-division group relative rounded-2xl glass-panel ${tier.borderColor} transition-all duration-500 overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] flex flex-col justify-between`}
            >
              {/* Radial ambient glow behind card */}
              <div className={`absolute -top-24 -left-24 w-60 h-60 bg-gradient-to-br ${tier.glowColor} blur-3xl pointer-events-none`} />

              {/* Full Vibrant Color Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={tier.image}
                  alt={tier.title}
                  className="w-full h-full object-cover object-center saturate-125 contrast-105 brightness-105 group-hover:scale-108 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Soft Bottom Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Lot Target Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs font-mono uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    {tier.lot}
                  </span>
                </div>

                {/* Milestone Rank Badge */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className={`px-2.5 py-0.5 rounded-full ${tier.badgeColor} backdrop-blur-md text-[10px] font-mono border uppercase tracking-wider`}>
                    {tier.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span>{tier.tag}</span>
                    </span>
                    <span className="text-slate-500">Tier #{idx + 1}</span>
                  </div>

                  <h3 className="font-syncopate text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {tier.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {tier.subtitle}
                  </p>
                </div>

                {/* Single Necessary Button: Direct to Telegram */}
                <div className="pt-3 border-t border-white/8">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:brightness-110 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.45)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>
                      {language === 'id' ? `KLAIM ${tier.lot} SEKARANG` : `CLAIM ${tier.lot} NOW`}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80 text-black" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: The Two Grand Prizes (500 Lot & 1,000 Lot Grand Champion) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {prizeTiers.slice(3, 5).map((tier, idx) => (
            <div
              key={idx + 3}
              className={`reveal-division group relative rounded-2xl glass-panel ${tier.borderColor} transition-all duration-500 overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.8)] hover:shadow-[0_0_45px_rgba(245,158,11,0.3)] flex flex-col sm:flex-row`}
            >
              {/* Radial ambient glow behind card */}
              <div className={`absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br ${tier.glowColor} blur-3xl pointer-events-none`} />

              {/* Full Vibrant Color Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-square sm:w-1/2 overflow-hidden bg-black/60 shrink-0">
                <img
                  src={tier.image}
                  alt={tier.title}
                  className="w-full h-full object-cover object-center saturate-130 contrast-105 brightness-105 group-hover:scale-108 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#030303] via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Lot Target Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs font-mono uppercase tracking-wider font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    {tier.lot}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full ${tier.badgeColor} backdrop-blur-md text-[10px] font-mono border uppercase tracking-wider`}>
                      {tier.badge}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>{tier.tag}</span>
                    </span>
                  </div>

                  <h3 className="font-syncopate text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {tier.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {tier.subtitle}
                  </p>
                </div>

                {/* Single Necessary Button: Direct to Telegram */}
                <div className="pt-4 border-t border-white/8">
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-black text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-black" />
                    <span>
                      {language === 'id' ? `KLAIM ${tier.lot} SEKARANG` : `CLAIM ${tier.lot} NOW`}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black opacity-80" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
