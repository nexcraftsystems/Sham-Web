import React from 'react';
import { Send, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL, openTelegramDirect } from '../constants/telegram';
import { LiquidityXLogo } from './LiquidityXLogo';

interface FooterProps {
  onOpenTelegram?: () => void;
  onOpenRegister?: () => void;
}

export function Footer({ onOpenTelegram }: FooterProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTelegramClick = () => {
    openTelegramDirect();
  };

  return (
    <footer className="w-full bg-[#030303] text-slate-300 pt-12 md:pt-16 pb-0 overflow-hidden border-t border-white/8 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Navigation & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/8">
          {/* Column 1: Brand & Telegram Community */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <a href="#top" className="inline-block cursor-pointer">
                <LiquidityXLogo size="lg" showText={true} showSlogan={true} />
              </a>

              <div className="pt-2">
                <div className="text-xs uppercase tracking-[0.25em] font-mono text-amber-400 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{t.officialCommunity}</span>
                </div>
                <div className="font-syncopate text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  {t.joinTraders}
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm font-light leading-relaxed">
                  {t.communityDesc}
                </p>
              </div>
            </div>

            <div>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-amber-950/70 hover:bg-amber-900/70 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{t.joinChannel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col space-y-3 font-mono text-xs uppercase">
            <div className="tracking-[0.25em] text-amber-400 mb-2 font-semibold">
              {t.navigation}
            </div>
            <a
              href="#top"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-amber-300 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>{t.backToTop}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#process"
              className="text-slate-400 hover:text-amber-300 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>01 // {language === 'id' ? 'Proses Klaim' : 'Claim Process'}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#rewards"
              className="text-slate-400 hover:text-amber-300 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>02 // {language === 'id' ? 'Galeri Hadiah' : 'Rewards Gallery'}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#indicator"
              className="text-slate-400 hover:text-amber-300 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>03 // {language === 'id' ? 'VIP Indikator' : 'VIP Indicator'}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Column 3: Language & Copyright */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-slate-400 mb-2 font-semibold">
                Language / Bahasa
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-amber-950/70 border-amber-500/40 text-amber-300 font-bold'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                    language === 'id'
                      ? 'bg-amber-950/70 border-amber-500/40 text-amber-300 font-bold'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  Bahasa Indonesia (ID)
                </button>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500">
              © LiquidityX. Insight, analyze, grow. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wordmark: "LIQUIDITYX" with gold and silver specular drop-shadow */}
      <div className="w-full overflow-hidden flex flex-col items-center justify-end pt-8 pb-0">
        <h2 className="font-syncopate text-[9.6vw] sm:text-[9.9vw] md:text-[10.2vw] leading-[0.74] tracking-[-0.035em] font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-amber-300 to-yellow-500 select-none whitespace-nowrap -mb-2 md:-mb-5 mix-blend-screen drop-shadow-[0_0_35px_rgba(245,158,11,0.3)] text-center w-full">
          LIQUIDITYX
        </h2>
      </div>
    </footer>
  );
}
