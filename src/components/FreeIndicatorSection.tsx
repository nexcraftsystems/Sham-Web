import React from 'react';
import { ArrowUpRight, Send, Sparkles, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';
import indicatorPreview from '../assets/images/indicator_vip_preview_1790851249023.jpg';

interface FreeIndicatorSectionProps {
  onOpenTelegram?: () => void;
}

export function FreeIndicatorSection({ onOpenTelegram }: FreeIndicatorSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].freeIndicator;

  return (
    <section
      id="indicator"
      className="relative w-full py-14 md:py-20 px-5 md:px-8 max-w-7xl mx-auto z-10 border-b border-white/8 select-none"
    >
      <div className="reveal-division rounded-3xl glass-panel p-6 sm:p-10 md:p-14 border border-amber-500/30 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)]">
        {/* Moving Candlestick Live Background in Free Indicator Section */}
        <XauusdCandlestickBackground opacity="opacity-35" />

        {/* Ambient Top-Right Glow */}
        <div className="w-96 h-96 bg-amber-500/15 rounded-full blur-3xl absolute -top-20 -right-20 pointer-events-none z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Typography, TradingView Badges, and Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 border-l-2 border-amber-500 pl-3 py-0.5">
                03 // VIP INDICATOR
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>WORTH $10,000 USD · AVAILABLE IN TRADINGVIEW</span>
              </span>
            </div>

            {/* Headline highlighting 10K USD and TradingView */}
            <h2 className="font-syncopate text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.08]">
              {language === 'id' ? (
                <>
                  FREE TRIAL SEMINGGU VIP INDIKATOR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    WORTH 10K USD — TRADINGVIEW
                  </span>
                </>
              ) : (
                <>
                  FREE 1-WEEK VIP INDICATOR TRIAL <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    WORTH 10K USD — TRADINGVIEW
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
              {language === 'id'
                ? 'Dapatkan akses eksklusif uji coba 7 hari indikator algoritma premium senilai $10.000 USD langsung di akun TradingView Anda. Zero repaint, sinyal buy/sell presisi tinggi dengan target profit otomatis.'
                : 'Get exclusive 7-day trial access to our institutional algorithmic indicator valued at $10,000 USD directly on your TradingView account. Zero repaint, high-precision buy/sell signals with automated take-profit targets.'}
            </p>

            {/* Feature Checklist */}
            <div className="space-y-3 font-mono text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">Tersedia di TradingView:</strong> Script invite langsung ke username TradingView Anda (Web, Desktop & Mobile).
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>
                  <strong className="text-white">Nilai 10K USD:</strong> Algoritma volume & tren institusional tanpa repaint untuk akurasi maksimal.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">Aktifkan Instan:</strong> Kirim username TradingView Anda ke admin Telegram untuk aktivasi langsung.
                </span>
              </div>
            </div>

            {/* Single Necessary Button: Direct to Telegram */}
            <div className="pt-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-black text-xs sm:text-sm font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 cursor-pointer"
              >
                <Send className="w-4 h-4 text-black shrink-0" />
                <span>Klaim Indikator 10K USD di TradingView</span>
                <ArrowUpRight className="w-4 h-4 text-black shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Colorful High-Res Indicator Chart Preview */}
          <div className="lg:col-span-5 reveal-division">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden glass-panel border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:border-amber-300 transition-all cursor-pointer"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-black/80">
                <img
                  src={indicatorPreview}
                  alt="VIP Indicator Worth 10K USD TradingView Chart"
                  className="w-full h-full object-cover object-center saturate-125 contrast-110 brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Soft gradient bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* TradingView Brand Badge overlay */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <Bot className="w-3.5 h-3.5 text-amber-400" />
                    <span>TRADINGVIEW CHART SUITE</span>
                  </span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Live 10K USD VIP Indicator</span>
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Aktivasi Sekarang</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
