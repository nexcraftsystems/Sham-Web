import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

interface NavigationProps {
  onOpenTelegram?: () => void;
}

export function Navigation({ onOpenTelegram }: NavigationProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <header className="sticky top-0 w-full z-50 bg-[#030303]/90 backdrop-blur-md border-b border-white/8 text-white">
      <div className="max-w-7xl mx-auto px-5 py-3.5 md:px-8 flex justify-between items-center">
        {/* Brand Zone - ONLY trade & claim self rebate */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-baseline gap-2 group select-none cursor-pointer"
          >
            <span className="font-syncopate text-xs sm:text-sm md:text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors uppercase">
              trade & claim self rebate
            </span>
          </a>
        </div>

        {/* Right Actions: Language Switcher & Single Direct Telegram CTA (Menubar is hidden) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dual Language Switcher: EN / ID */}
          <div
            className="flex items-center rounded-full bg-black/60 p-0.5 border border-white/10 text-xs font-mono select-none"
            title="Switch Language / Ganti Bahasa"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ID
            </button>
          </div>

          {/* Necessary Button Only: Direct Link to Telegram */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-black" />
            <span>{t.joinTelegram}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
