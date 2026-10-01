import React, { useEffect, useState } from 'react';
import { CloseIcon, TelegramIcon, ArrowUpRight } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#faf8f5] text-[#111] rounded-2xl shadow-2xl overflow-hidden border border-black/10">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 flex justify-between items-center bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#229ED9] text-white flex items-center justify-center">
              <TelegramIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[#111]">
                {t.title}
              </h3>
              <p className="text-xs text-black/50 font-mono">{t.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Card 1: Official Channel */}
          <div className="p-4 rounded-xl bg-white border border-black/10 flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#229ED9] font-semibold">
                  {t.officialChannel}
                </span>
                <div className="text-base font-semibold text-[#111]">
                  {t.channelHandle}
                </div>
                <p className="text-xs text-black/60 mt-0.5">
                  {t.channelDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#229ED9] hover:bg-[#1a8dc2] text-white text-xs font-semibold transition-colors"
              >
                <span>{t.openChannel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(t.channelHandle, 'channel')}
                className="px-3 py-2 rounded-lg border border-black/15 hover:bg-black hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                {copied === 'channel' ? t.copied : t.copy}
              </button>
            </div>
          </div>

          {/* Card 2: Admin Claim Support */}
          <div className="p-4 rounded-xl bg-white border border-black/10 flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">
                  {t.adminSupport}
                </span>
                <div className="text-base font-semibold text-[#111]">
                  {t.adminHandle}
                </div>
                <p className="text-xs text-black/60 mt-0.5">
                  {t.adminDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
              >
                <span>{t.messageAdmin}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(t.adminHandle, 'admin')}
                className="px-3 py-2 rounded-lg border border-black/15 hover:bg-black hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                {copied === 'admin' ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/5 border-t border-black/10 flex items-center justify-between text-xs text-black/60 font-mono">
          <span>{t.responseTime}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-black font-semibold hover:underline cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
