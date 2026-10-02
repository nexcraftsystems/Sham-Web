import React, { useState } from 'react';
import { Send, UserPlus, Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

interface NavigationProps {
  onOpenRegister?: () => void;
  onOpenTelegram?: () => void;
}

export function Navigation({ onOpenRegister, onOpenTelegram }: NavigationProps) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTelegramClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#030303]/85 backdrop-blur-md border-b border-white/8 text-white">
      <div className="max-w-7xl mx-auto px-5 py-4 md:px-8 flex justify-between items-center">
        {/* Brand Zone with NY/TC superscript quirk from template */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-baseline gap-1.5 group select-none cursor-pointer"
          >
            <span className="font-syncopate text-sm sm:text-base md:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              TRADE & CLAIM
            </span>
            <sup className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              PROMO 01
            </sup>
          </a>
        </div>

        {/* Center Quick Jump Links for Desktop */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
          <a href="#process" className="hover:text-cyan-400 transition-colors">
            01 // Process
          </a>
          <a href="#rewards" className="hover:text-cyan-400 transition-colors">
            02 // Rewards
          </a>
          <a href="#indicator" className="hover:text-cyan-400 transition-colors">
            03 // Indicator
          </a>
          <a href="#registration" className="hover:text-cyan-400 transition-colors">
            04 // Register
          </a>
        </nav>

        {/* Right Actions: Language Switcher, Telegram & Register */}
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

          {/* Telegram Join Button */}
          <button
            type="button"
            onClick={handleTelegramClick}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            title={t.joinTelegram}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.joinTelegram}</span>
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t.register}</span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 font-mono text-sm uppercase text-slate-300">
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 flex items-center justify-between py-1"
            >
              <span>01 // Process</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#rewards"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 flex items-center justify-between py-1"
            >
              <span>02 // Rewards</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#indicator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 flex items-center justify-between py-1"
            >
              <span>03 // Indicator</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
            <a
              href="#registration"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-cyan-400 flex items-center justify-between py-1"
            >
              <span>04 // Register</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
            </a>
          </nav>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleTelegramClick();
              }}
              className="w-full py-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.joinTelegram}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
