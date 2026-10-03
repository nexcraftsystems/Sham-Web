import React, { useRef } from 'react';
import { Send, ArrowUpRight, TrendingUp, Target, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL, openTelegramDirect } from '../constants/telegram';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';

interface HowToClaimProps {
  onOpenTelegram?: () => void;
  onOpenRegister?: () => void;
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card transition-transform duration-200 ease-out preserve-3d cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export function HowToClaim({ onOpenTelegram, onOpenRegister }: HowToClaimProps) {
  const { language } = useLanguage();
  const t = translations[language].howToClaim;

  const handleTelegramClick = () => {
    openTelegramDirect();
  };

  const stepIcons = [TrendingUp, Target, MessageSquare];

  return (
    <section
      id="process"
      className="relative w-full bg-black/40 py-14 md:py-20 border-b border-white/8 select-none overflow-hidden z-10"
    >
      {/* Moving Candlestick Live Background in How to Claim Rewards Section */}
      <XauusdCandlestickBackground opacity="opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Top Header with right-aligned "01 // PROCESS" */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t.tag}</span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              {t.heading}
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
              01 // PROCESS
            </span>
            <div className="flex items-center gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.contactAdmin}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Grid of 3D Tilt Cards with cyan glow in top-right corner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.steps.map((step, idx) => {
            const Icon = stepIcons[idx];

            return (
              <TiltCard key={idx} className="reveal-division">
                <div className="relative h-full p-8 rounded-2xl glass-panel border border-white/8 hover:border-cyan-500/40 transition-colors flex flex-col justify-between overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {/* Top-Right Cyan Glow (blur-2xl from template) */}
                  <div className="w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl absolute -top-10 -right-10 pointer-events-none" />

                  <div>
                    {/* Step Index & Icon */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/8 mb-6">
                      <span className="font-syncopate text-2xl md:text-3xl font-bold text-cyan-400 tracking-wider">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 inline-block mb-3">
                      {step.iconText}
                    </span>

                    {/* Step Title & Content */}
                    <h3 className="font-syncopate text-lg sm:text-xl font-bold tracking-tight text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Footer Highlight */}
                  <div className="pt-6 mt-6 border-t border-white/8 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-slate-300">{step.highlight}</span>
                    {idx === 2 ? (
                      <button
                        type="button"
                        onClick={handleTelegramClick}
                        className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                      >
                        <span>{language === 'id' ? 'Klaim di Telegram' : 'Claim on Telegram'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-emerald-400 font-semibold">{t.automatic}</span>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
