import React, { useState } from 'react';
import { ArrowUpRight, Send, UserPlus, CheckCircle2, ChevronDown } from 'lucide-react';
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
  onOpenRegister?: () => void;
}

export function OrbSection({ onOpenTelegram, onOpenRegister }: OrbSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].lotTargets;

  const handleTelegramClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  // Track expanded state for mobile screens
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const prizeImages = [
    prizeCash,
    prizeIpad,
    prizeIphone,
    prizeMacbookCash,
    prizeMacbookBigCash,
  ];

  return (
    <section
      id="rewards"
      className="relative w-full py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto z-10 border-b border-white/8 select-none"
    >
      {/* Section Header with "02 // REWARDS" */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.tag}</span>
          </div>
          <h2 className="font-syncopate text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
            {t.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light mt-3 max-w-2xl leading-relaxed">
            {t.subheading}
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
            02 // REWARDS
          </span>
          <button
            type="button"
            onClick={handleTelegramClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.contactAdminClaim}</span>
          </button>
        </div>
      </div>

      {/* Masonry CSS Columns Container from Template (columns-1 md:columns-2 lg:columns-3 space-y-8) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {t.tiers.map((tier, idx) => {
          const isExpanded = !!expandedCards[idx];

          return (
            <div
              key={idx}
              className="reveal-division break-inside-avoid group relative rounded-2xl glass-panel border border-white/8 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] mb-8"
            >
              {/* Prize Image Container with Grayscale-to-Color & scale-105 Effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60">
                <img
                  src={prizeImages[idx]}
                  alt={tier.title}
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-black/40 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-xs font-mono uppercase tracking-wider font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    {tier.lot}
                  </span>
                </div>

                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-slate-300 border border-white/15 text-[10px] font-mono">
                    {tier.badge}
                  </span>
                </div>

                {/* Floating Arrow Icon from template */}
                <div className="absolute bottom-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/80 uppercase">
                  <span>{t.milestonePrefix}{idx + 1}</span>
                  <span>·</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {t.activeReward}
                  </span>
                </div>

                <h3 className="font-syncopate text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {tier.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {tier.desc}
                </p>

                {/* Mobile Expand / Collapse Button (Phone Preview Quirk) */}
                <div className="lg:hidden pt-2 border-t border-white/8">
                  <button
                    type="button"
                    onClick={() => toggleCard(idx)}
                    className="w-full py-2.5 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/20 text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{isExpanded ? t.hideDetails : t.viewDetails}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-cyan-300' : 'rotate-0 text-cyan-400/60'
                      }`}
                    />
                  </button>
                </div>

                {/* Collapsible Details: Visible when expanded on mobile, always visible on desktop */}
                <div
                  className={`${
                    isExpanded ? 'block animate-in fade-in duration-300' : 'hidden'
                  } lg:block space-y-4 pt-3 border-t border-white/8`}
                >
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                      <span className="text-slate-400 block mb-0.5">{t.lotTargetLabel}</span>
                      <span className="text-white font-bold">{tier.lot}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                      <span className="text-slate-400 block mb-0.5">{t.rewardTypeLabel}</span>
                      <span className="text-white font-bold truncate block">{tier.type}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTelegramClick}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-400 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.claimPrizeBtn(tier.lot)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenRegister}
                      className="py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono uppercase transition-colors cursor-pointer"
                      title={t.registerBtn}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
