import React, { useState, useEffect } from 'react';
import { CloseIcon, TelegramIcon, CheckIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTelegram?: () => void;
}

export function RegisterModal({ isOpen, onClose, onOpenTelegram }: RegisterModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    accountId: '',
    broker: 'Exness',
    telegramUser: '',
    targetLots: '500 LOT',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.accountId.trim() || !formData.telegramUser.trim()) {
      setError(
        t(
          'Please fill in your Name, Trading Account Number, and Telegram Username.',
          'Harap isi Nama, Nomor Akun Trading, dan Username Telegram Anda.'
        )
      );
      return;
    }

    setError(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      accountId: '',
      broker: 'Exness',
      telegramUser: '',
      targetLots: '500 LOT',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-[#faf8f5] text-[#111] rounded-2xl shadow-2xl overflow-hidden border border-black/10">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-black/10 flex justify-between items-center bg-[#faf8f5]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
              {t('Registration', 'Pendaftaran')}
            </span>
            <h3 className="text-xl font-normal tracking-tight text-[#111]">
              {t('Register for Trade & Claim', 'Daftar untuk Trade & Claim')}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <span>{t('Close', 'Tutup')}</span>
            <CloseIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckIcon className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-normal tracking-tight text-[#111]">
                {t('Registration Successful!', 'Pendaftaran Berhasil!')}
              </h4>
              <p className="text-sm text-black/70 max-w-sm font-light leading-relaxed">
                {t(
                  `Welcome, ${formData.name}. Your MT4/MT5 account #${formData.accountId} (${formData.broker}) is now registered. Every lot will be automatically tracked for this month's reward pool.`,
                  `Selamat datang, ${formData.name}. Akun MT4/MT5 Anda #${formData.accountId} (${formData.broker}) telah berhasil didaftarkan. Setiap lot akan otomatis dihitung untuk reward bulan ini.`
                )}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onOpenTelegram?.();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#229ED9] text-white text-xs font-semibold tracking-wide hover:bg-[#1b8ec4] transition-colors cursor-pointer"
                >
                  <TelegramIcon className="w-4 h-4" />
                  <span>{t('Join Telegram Channel Now', 'Gabung Telegram Sekarang')}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors cursor-pointer"
                >
                  {t('Done', 'Selesai')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-light">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1">
                  {t('Full Name *', 'Nama Lengkap *')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('e.g. Budi Santoso', 'cth. Budi Santoso')}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1">
                    {t('MT4 / MT5 Account # *', 'Nomor Akun MT4 / MT5 *')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.accountId}
                    onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                    placeholder="e.g. 1048592"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1">
                    {t('Broker Platform', 'Pialang / Broker')}
                  </label>
                  <select
                    value={formData.broker}
                    onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors font-sans"
                  >
                    <option value="Exness">Exness</option>
                    <option value="XM Global">XM Global</option>
                    <option value="IC Markets">IC Markets</option>
                    <option value="Pepperstone">Pepperstone</option>
                    <option value="Other">Other MT4/MT5 Broker</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1">
                  {t('Telegram Username (to claim prizes) *', 'Username Telegram (untuk klaim hadiah) *')}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-black/40 text-sm">@</span>
                  <input
                    type="text"
                    required
                    value={formData.telegramUser}
                    onChange={(e) => setFormData({ ...formData, telegramUser: e.target.value })}
                    placeholder="yourtelegram"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1">
                  {t('Target Prize Goal', 'Target Hadiah Impian')}
                </label>
                <select
                  value={formData.targetLots}
                  onChange={(e) => setFormData({ ...formData, targetLots: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors font-sans"
                >
                  <option value="100 LOT">100 LOT · Cash 2.2 Juta Rupiah</option>
                  <option value="200 LOT">200 LOT · iPad 11</option>
                  <option value="350 LOT">350 LOT · iPhone 17</option>
                  <option value="500 LOT">500 LOT · MacBook Neo + 3.5 Juta Rupiah</option>
                  <option value="1000 LOT">1,000 LOT · MacBook Neo + 17 Juta Rupiah</option>
                </select>
              </div>

              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                <span className="text-[11px] text-black/50 font-mono">
                  {t('Real-time automated lot counter', 'Penghitung lot otomatis real-time')}
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <span>{t('Submit & Start', 'Kirim & Mulai')}</span>
                  <CheckIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
