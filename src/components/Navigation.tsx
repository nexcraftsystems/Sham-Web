import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { LiquidityXLogo } from './LiquidityXLogo';

interface NavigationProps {
  onOpenTelegram?: () => void;
}

export function Navigation({ onOpenTelegram }: NavigationProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  return (
    <header className="sticky top-0 w-full z-50 bg-[#030303]/90 backdrop-blur-md border-b border-white/8 text-white">
      <div className="max-w-7xl mx-auto px-5 py-3 md:px-8 flex justify-between items-center">
        {/* Brand Zone - LiquidityX Logo & Slogan */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2 group select-none cursor-pointer"
          >
            <LiquidityXLogo size="md" showText={true} showSlogan={true} />
          </a>
        </div>

        {/* Right Actions: Language Switcher & Single Direct Telegram CTA */}
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
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)]'
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
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.5)]'
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
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-black" />
            <span>{t.joinTelegram}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
