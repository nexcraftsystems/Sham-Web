import React from 'react';
import { TelegramIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface NavigationProps {
  onOpenRegister?: () => void;
  onOpenTelegram?: () => void;
}

export function Navigation({ onOpenRegister, onOpenTelegram }: NavigationProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  const handleTelegramClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open('https://t.me/', '_blank');
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-black border-b border-white/10 text-white">
      <div className="max-w-[1800px] mx-auto px-5 py-4 md:px-12 flex justify-between items-center bg-black">
        {/* Brand Zone - TRADE & CLAIM strictly unchanged */}
        <div className="flex items-center">
          <a
            href="#top"
            className="text-base md:text-lg font-semibold tracking-tight uppercase text-white hover:opacity-85 transition-opacity"
          >
            TRADE & CLAIM
          </a>
        </div>

        {/* Right Action: Language Switcher, Telegram Join & Register */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dual Language Switcher: EN / ID */}
          <div
            className="flex items-center rounded-full bg-white/10 p-0.5 border border-white/20 text-xs font-mono select-none"
            title="Switch Language / Ganti Bahasa"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ID
            </button>
          </div>

          {/* Telegram Join Button */}
          <button
            type="button"
            onClick={handleTelegramClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#229ED9] hover:bg-[#1e8ec4] text-white text-xs font-medium tracking-wide transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            title={t.joinTelegram}
          >
            <TelegramIcon className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">{t.joinTelegram}</span>
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>{t.register}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
