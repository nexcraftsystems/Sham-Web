import React from 'react';
import { TelegramIcon } from './Icons';

interface NavigationProps {
  onOpenRegister?: () => void;
  onOpenTelegram?: () => void;
}

export function Navigation({ onOpenRegister, onOpenTelegram }: NavigationProps) {
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
        {/* Brand Zone */}
        <div className="flex items-center">
          <a
            href="#top"
            className="text-base md:text-lg font-semibold tracking-tight uppercase text-white hover:opacity-85 transition-opacity"
          >
            TRADE & CLAIM
          </a>
        </div>

        {/* Right Action: Telegram Join & Register */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Telegram Join Button */}
          <button
            type="button"
            onClick={handleTelegramClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#229ED9] hover:bg-[#1e8ec4] text-white text-xs font-medium tracking-wide transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
            title="Join Telegram Channel"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Join Telegram</span>
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Register</span>
          </button>
        </div>
      </div>
    </header>
  );
}
