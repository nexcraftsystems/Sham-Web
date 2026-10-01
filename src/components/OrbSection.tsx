import React, { useState } from 'react';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { RevealText } from './RevealText';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

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

  // Track expanded state of cards on mobile screens
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
    <section id="lot-targets" className="relative w-full bg-[#faf8f5] py-20 md:py-32 px-6 md:px-12 border-b border-black/10 select-none">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-black/50 mb-3">
              {t.tag}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#111]">
              <RevealText key={`orb-hd-${language}`} text={t.heading} />
            </h2>
            <p className="text-base sm:text-lg text-black/70 font-light mt-3 max-w-2xl leading-relaxed">
              {t.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTelegram}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer hover:scale-102"
            >
              <TelegramIcon className="w-3.5 h-3.5" />
              <span>{t.contactAdminClaim}</span>
            </button>
          </div>
        </div>

        {/* Dedicated Stacked Reward Cards */}
        <div className="space-y-6 md:space-y-10">
          {t.tiers.map((tier, idx) => {
            const isExpanded = !!expandedCards[idx];

            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white border border-black/10 hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden p-5 sm:p-7 md:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-start lg:items-center">
                  {/* Prize Picture & Mobile Summary Header */}
                  <div className="lg:col-span-5 relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-md">
                    <img
                      src={prizeImages[idx]}
                      alt={tier.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                      <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider font-semibold">
                        {tier.lot}
                      </span>
                    </div>
                    <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-md text-black text-[10px] sm:text-[11px] font-mono">
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  {/* Prize Details & Actions */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4 lg:space-y-6">
                    {/* Header Zone: Always visible on both mobile and desktop */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
                          {t.milestonePrefix}{idx + 1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-mono text-emerald-700 font-medium">
                          {t.activeReward}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#111] mb-2">
                        {tier.title}
                      </h3>

                      {/* Mobile Expand / Collapse Toggle Bar (Visible ONLY on mobile screens < lg) */}
                      <div className="lg:hidden pt-2">
                        <button
                          type="button"
                          onClick={() => toggleCard(idx)}
                          className="w-full py-2.5 px-4 rounded-xl bg-black/5 active:bg-black/10 hover:bg-black/8 text-xs font-semibold font-mono tracking-wider uppercase text-black flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-black' : 'bg-emerald-500 animate-pulse'}`} />
                            <span>{isExpanded ? t.hideDetails : t.viewDetails}</span>
                          </span>
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-black' : 'rotate-0 text-black/60'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Details Body:
                        Hidden on mobile when collapsed; Always visible on desktop (lg:block) */}
                    <div
                      className={`${
                        isExpanded ? 'block animate-in fade-in duration-300' : 'hidden'
                      } lg:block space-y-6 pt-2 lg:pt-0`}
                    >
                      <p className="text-base sm:text-lg text-black/70 font-light leading-relaxed">
                        {tier.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                            {t.lotTargetLabel}
                          </span>
                          <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                            {tier.lot}
                          </span>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                            {t.rewardTypeLabel}
                          </span>
                          <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                            {tier.type}
                          </span>
                        </div>
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                            {t.claimSupportLabel}
                          </span>
                          <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                            {t.directAdmin}
                          </span>
                        </div>
                      </div>

                      {/* Card Bottom: Admin Claim CTA */}
                      <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-black/60">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{t.autoTracking}</span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={onOpenTelegram}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:scale-105 cursor-pointer"
                          >
                            <TelegramIcon className="w-4 h-4" />
                            <span>{t.claimPrizeBtn(tier.lot)}</span>
                          </button>
                          <button
                            type="button"
                            onClick={onOpenRegister}
                            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-all hover:scale-105 cursor-pointer"
                          >
                            <span>{t.registerBtn}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
