import React from 'react';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface FooterProps {
  onOpenTelegram: () => void;
  onOpenRegister: () => void;
}

export function Footer({ onOpenTelegram, onOpenRegister }: FooterProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#faf8f5] text-[#111] pt-16 md:pt-24 overflow-hidden border-t border-black/10 select-none">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Navigation & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          {/* Column 1: Telegram Community & Quick Join */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3">
                {t.officialCommunity}
              </div>
              <div className="text-xl sm:text-2xl font-normal tracking-tight text-[#111]">
                {t.joinTraders}
              </div>
              <p className="text-sm text-black/60 mt-1 max-w-sm">
                {t.communityDesc}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenTelegram}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer hover:scale-102"
              >
                <TelegramIcon className="w-4 h-4" />
                <span>{t.joinChannel}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-2">
              {t.navigation}
            </div>
            <a href="#top" onClick={scrollToTop} className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t.backToTop}
            </a>
            <a href="#how-to-claim" className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t.howToClaim}
            </a>
            <a href="#lot-targets" className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t.lotTargets}
            </a>
            <a href="#free-indicator" className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {translations[language].freeIndicator.heading}
            </a>
            <button
              type="button"
              onClick={onOpenRegister}
              className="text-left text-base text-black/80 hover:text-black transition-colors w-fit cursor-pointer"
            >
              {t.registerToTrade}
            </button>
          </div>

          {/* Column 3: Admin Support, Language Switcher & Copyright */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3">
                {t.prizeSupport}
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={onOpenTelegram}
                  className="group inline-flex items-center justify-between text-base text-black/80 hover:text-black transition-colors text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
                    <span>{t.telegramAdmin}</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Language Selector in Footer */}
              <div className="mt-6 pt-4 border-t border-black/10">
                <span className="text-xs font-mono uppercase tracking-wider text-black/40 block mb-2">
                  {t.language}
                </span>
                <div className="inline-flex rounded-full bg-black/5 p-0.5 border border-black/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-black text-white font-semibold shadow-sm'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('id')}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      language === 'id'
                        ? 'bg-black text-white font-semibold shadow-sm'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    Bahasa Indonesia (ID)
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-black/40">
              {t.rights}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wordmark: "TRADE & CLAIM" Capitalized and strictly unchanged in both languages */}
      <div className="w-full overflow-hidden flex flex-col items-center justify-end pt-8 px-4 md:px-8">
        <h2 className="text-[13.6vw] sm:text-[14vw] md:text-[14.3vw] lg:text-[14.6vw] leading-[0.7] tracking-[-0.035em] font-normal uppercase text-[#111] select-none whitespace-nowrap -mb-2 md:-mb-6">
          TRADE & CLAIM
        </h2>
      </div>
    </footer>
  );
}
