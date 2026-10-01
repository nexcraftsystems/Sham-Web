import React from 'react';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { RevealText } from './RevealText';

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
  const tiers = [
    {
      lot: '100 LOT',
      title: 'Cash 2.2 Juta Rupiah',
      desc: 'Straight cash to your account',
      badge: 'Starter Milestone',
      type: 'Direct Cash Transfer',
      image: prizeCash,
    },
    {
      lot: '200 LOT',
      title: 'iPad 11',
      desc: 'Next-gen tablet, trade on the go',
      badge: 'Trader Tech',
      type: 'Official Apple Device',
      image: prizeIpad,
    },
    {
      lot: '350 LOT',
      title: 'iPhone 17',
      desc: 'The ultimate flagship in your hands',
      badge: 'Flagship Reward',
      type: 'Flagship Smartphone',
      image: prizeIphone,
    },
    {
      lot: '500 LOT',
      title: 'MacBook Neo + 3.5 Juta Rupiah',
      desc: 'Powerhouse laptop plus cash',
      badge: 'Powerhouse Bundle',
      type: 'Laptop + Cash Bonus',
      image: prizeMacbookCash,
    },
    {
      lot: '1,000 LOT',
      title: 'MacBook Neo + 17 Juta Rupiah',
      desc: 'Flagship powerhouse laptop plus 17 Juta Rupiah cash',
      badge: 'Grand Champion Prize',
      type: 'MacBook Neo + Big Cash',
      image: prizeMacbookBigCash,
    },
  ];

  return (
    <section id="lot-targets" className="relative w-full bg-[#faf8f5] py-20 md:py-32 px-6 md:px-12 border-b border-black/10 select-none">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] font-mono text-black/50 mb-3">
              Promo 01 — Trade & Claim
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#111]">
              <RevealText text="Monthly Target Cycle" />
            </h2>
            <p className="text-base sm:text-lg text-black/70 font-light mt-3 max-w-2xl leading-relaxed">
              Rewards to claim based on total lot traded. Every closed lot counts automatically towards your milestone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTelegram}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <TelegramIcon className="w-3.5 h-3.5" />
              <span>Contact Admin to Claim</span>
            </button>
          </div>
        </div>

        {/* Dedicated Stacked Reward Cards */}
        <div className="space-y-8 md:space-y-12">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-white border border-black/10 hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden p-6 sm:p-8 md:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                {/* Prize Picture */}
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 shadow-md">
                  <img
                    src={tier.image}
                    alt={tier.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider font-semibold">
                      {tier.lot}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-black text-[11px] font-mono">
                      {tier.badge}
                    </span>
                  </div>
                </div>

                {/* Prize Details & Actions */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
                        Promo 01 · Milestone 0{idx + 1}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-emerald-700 font-medium">Active Reward</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#111] mb-2">
                      {tier.title}
                    </h3>

                    <p className="text-base sm:text-lg text-black/70 font-light leading-relaxed mb-6">
                      {tier.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                          Lot Target
                        </span>
                        <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                          {tier.lot}
                        </span>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                          Reward Type
                        </span>
                        <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                          {tier.type}
                        </span>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#faf8f5] border border-black/8 hover:border-black/20 transition-all">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-1">
                          Claim Support
                        </span>
                        <span className="text-sm sm:text-base font-semibold tracking-tight text-[#111] block">
                          Direct Admin
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Admin Claim CTA */}
                  <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-black/60">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Automatic tracking · Trade as usual</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={onOpenTelegram}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:scale-105 cursor-pointer"
                      >
                        <TelegramIcon className="w-4 h-4" />
                        <span>Claim {tier.lot} Prize</span>
                      </button>
                      <button
                        type="button"
                        onClick={onOpenRegister}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-all hover:scale-105 cursor-pointer"
                      >
                        <span>Register</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
