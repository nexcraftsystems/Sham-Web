import React from 'react';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenTelegram: () => void;
  onOpenRegister: () => void;
}

export function Footer({ onOpenTelegram, onOpenRegister }: FooterProps) {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#faf8f5] text-[#111] pt-16 md:pt-24 overflow-hidden border-t border-black/10 select-none font-sans">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Navigation & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          {/* Column 1: Telegram Community & Quick Join */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3">
                {t('Official Telegram Community', 'Komunitas Resmi Telegram')}
              </div>
              <div className="text-xl sm:text-2xl font-normal tracking-tight text-[#111]">
                {t('Join Traders Worldwide', 'Bergabung Bersama Komunitas Trader')}
              </div>
              <p className="text-sm text-black/60 font-light mt-1 max-w-sm">
                {t(
                  'Get monthly lot rankings, real-time winner announcements, and direct admin support.',
                  'Dapatkan update ranking lot bulanan, pengumuman pemenang, dan layanan admin langsung.'
                )}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenTelegram}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#229ED9] hover:bg-[#1b8ec4] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
              >
                <TelegramIcon className="w-4 h-4" />
                <span>
                  {t('Join Official Telegram Channel', 'Gabung Channel Resmi Telegram')}
                </span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4 flex flex-col space-y-3 font-light">
            <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-2 font-normal">
              {t('Navigation', 'Navigasi')}
            </div>
            <a href="#top" onClick={scrollToTop} className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t('Back to Top', 'Kembali ke Atas')}
            </a>
            <a href="#how-to-claim" className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t('How to Claim Rewards', 'Cara Klaim Hadiah')}
            </a>
            <a href="#lot-targets" className="text-base text-black/80 hover:text-black transition-colors w-fit">
              {t('Promo 01 — Target Lots & Rewards', 'Promo 01 — Target Lot & Hadiah')}
            </a>
            <button
              type="button"
              onClick={onOpenRegister}
              className="text-left text-base text-black/80 hover:text-black transition-colors w-fit cursor-pointer"
            >
              {t('Register to Trade', 'Daftar Akun Trading')}
            </button>
          </div>

          {/* Column 3: Admin Support & Contact */}
          <div className="md:col-span-3 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3 font-normal">
                {t('Prize Support', 'Bantuan Hadiah')}
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={onOpenTelegram}
                  className="group inline-flex items-center justify-between text-base text-black/80 hover:text-black transition-colors text-left cursor-pointer font-light"
                >
                  <span className="flex items-center gap-2">
                    <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9]" />
                    <span>Telegram Admin</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-black/40">
              © Trade &amp; Claim. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wordmark: "TRADE & CLAIM" Capitalized, SVG-scaled so 'M' is NEVER cut off */}
      <div className="w-full flex flex-col items-center justify-end pt-8 px-2 sm:px-4 md:px-8 pb-2">
        <svg
          viewBox="0 0 1180 135"
          className="w-full h-auto max-w-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="108"
            textAnchor="middle"
            className="fill-[#111] font-normal uppercase"
            style={{
              fontSize: '116px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            TRADE &amp; CLAIM
          </text>
        </svg>
      </div>
    </footer>
  );
}
