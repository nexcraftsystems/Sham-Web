import React from 'react';
import { Send, ArrowUpRight, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

interface FooterProps {
  onOpenTelegram: () => void;
  onOpenRegister: () => void;
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenTelegram, onOpenRegister, onOpenAdmin }: FooterProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTelegramClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <footer className="w-full bg-[#030303] text-slate-300 pt-20 md:pt-28 overflow-hidden border-t border-white/8 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Navigation & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/8">
          {/* Column 1: Telegram Community & Quick Join */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>{t.officialCommunity}</span>
              </div>
              <div className="font-syncopate text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                {t.joinTraders}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm font-light leading-relaxed">
                {t.communityDesc}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={handleTelegramClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-cyan-950/70 hover:bg-cyan-900/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.joinChannel}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col space-y-3 font-mono text-xs uppercase">
            <div className="tracking-[0.25em] text-cyan-400 mb-2">
              {t.navigation}
            </div>
            <a
              href="#top"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-cyan-400 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>{t.backToTop}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#process"
              className="text-slate-400 hover:text-cyan-400 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>01 // {t.howToClaim}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#rewards"
              className="text-slate-400 hover:text-cyan-400 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>02 // {t.lotTargets}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#indicator"
              className="text-slate-400 hover:text-cyan-400 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>03 // {translations[language].freeIndicator.heading}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#registration"
              className="text-slate-400 hover:text-cyan-400 transition-colors w-fit flex items-center gap-1.5"
            >
              <span>04 // {t.registerToTrade}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
          </div>

          {/* Column 3: Admin Support, Language Switcher & Copyright */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] font-mono text-cyan-400 mb-3">
                {t.prizeSupport}
              </div>
              <button
                type="button"
                onClick={handleTelegramClick}
                className="group inline-flex items-center justify-between text-xs font-mono uppercase text-slate-300 hover:text-cyan-400 transition-colors text-left cursor-pointer w-full py-2 border-b border-white/8"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.telegramAdmin}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
              </button>

              {/* Language Selector in Footer */}
              <div className="mt-6 pt-4 border-t border-white/8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2">
                  {t.language}
                </span>
                <div className="inline-flex rounded-full bg-black/60 p-0.5 border border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('id')}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      language === 'id'
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bahasa Indonesia (ID)
                  </button>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>{t.rights}</span>
              {/* Very small developer admin login icon */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="opacity-25 hover:opacity-100 hover:text-cyan-400 p-1 transition-all cursor-pointer"
                title="Developer Admin Portal (nexcraftsystems@gmail.com)"
                aria-label="Developer Admin"
              >
                <Lock className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wordmark: "TRADE & CLAIM" Capitalized and strictly unchanged */}
      <div className="w-full overflow-hidden flex flex-col items-center justify-end pt-10 px-4 md:px-8">
        <h2 className="font-syncopate text-[12.8vw] leading-[0.72] tracking-[-0.04em] font-bold uppercase text-white/90 select-none whitespace-nowrap -mb-2 md:-mb-6 mix-blend-screen drop-shadow-[0_0_30px_rgba(6,182,212,0.25)]">
          TRADE & CLAIM
        </h2>
      </div>

      {/* Bottom Sub-Bar with Dev Admin Button & Shortcuts */}
      <div className="w-full border-t border-white/8 py-3.5 px-5 sm:px-8 max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <span>{t.rights}</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="hidden sm:inline text-slate-600">Firebase Firestore Real-time</span>
        </div>

        {/* Small discreet Developer Admin Button */}
        <button
          type="button"
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/40 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer group shadow-sm"
          title="Developer Admin Portal (nexcraftsystems@gmail.com) — Shortcut: Ctrl+Shift+A"
        >
          <Lock className="w-2.5 h-2.5 text-cyan-400/80 group-hover:text-cyan-300" />
          <span>Dev Admin</span>
          <span className="hidden md:inline text-[9px] text-slate-600 group-hover:text-cyan-500/70 font-mono">[Ctrl+Shift+A]</span>
        </button>
      </div>
    </footer>
  );
}
