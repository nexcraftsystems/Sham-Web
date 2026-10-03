import React, { useEffect, useState } from 'react';
import { X, Send, Check, ArrowUpRight, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

interface TelegramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelegramModal({ isOpen, onClose }: TelegramModalProps) {
  const { language } = useLanguage();
  const t = translations[language].telegramModal;

  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[92vh] flex flex-col bg-[#080808] text-slate-200 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden border border-amber-500/30">
        {/* Header */}
        <div className="shrink-0 px-5 sm:px-6 py-4 sm:py-5 border-b border-white/8 flex justify-between items-center bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syncopate text-xs sm:text-sm md:text-base font-bold text-white tracking-tight">
                {t.title}
              </h3>
              <p className="text-[10px] text-amber-400 font-mono">{t.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content with scrollable area */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Card 1: Official Channel */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/8 hover:border-amber-500/30 transition-colors flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                {t.officialChannel}
              </span>
              <div className="text-sm sm:text-base font-mono font-bold text-white">
                {t.channelHandle}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-light">
                {t.channelDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-950/80 hover:bg-amber-900 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase font-semibold transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)]"
              >
                <span>{t.openChannel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(t.channelHandle, 'channel')}
                className="px-3 py-2 rounded-lg border border-white/15 hover:border-amber-500/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied === 'channel' ? t.copied : t.copy}
              </button>
            </div>
          </div>

          {/* Card 2: Admin Claim Support */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/8 hover:border-amber-500/30 transition-colors flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                {t.adminSupport}
              </span>
              <div className="text-sm sm:text-base font-mono font-bold text-white">
                {t.adminHandle}
              </div>
              <p className="text-xs text-slate-400 mt-1 font-light">
                {t.adminDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-black text-xs font-mono uppercase font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)]"
              >
                <span>{t.messageAdmin}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(t.adminHandle, 'admin')}
                className="px-3 py-2 rounded-lg border border-white/15 hover:border-amber-500/40 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copied === 'admin' ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/40 border-t border-white/8 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>{t.responseTime}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-400 font-bold hover:underline cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
