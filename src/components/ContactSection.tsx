import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Send, CheckCircle2, ArrowUpRight, Zap, Check, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { useAuth } from '../context/AuthContext';
import { saveClientRegistration } from '../services/database';

interface ContactSectionProps {
  onOpenTelegram?: () => void;
}

export function ContactSection({ onOpenTelegram }: ContactSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].registerModal;
  const { currentUser, clientProfile, saveProfile } = useAuth();

  const handleSupportClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  const [formData, setFormData] = useState({
    name: clientProfile?.name || currentUser?.displayName || '',
    email: clientProfile?.email || currentUser?.email || '',
    accountId: clientProfile?.accountId || '',
    broker: clientProfile?.broker || 'Exness',
    telegramUser: clientProfile?.telegramUser || '',
    targetLots: clientProfile?.targetLots || '500 Lots',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientProfile) {
      setFormData((prev) => ({
        ...prev,
        name: clientProfile.name || prev.name,
        email: clientProfile.email || prev.email,
        accountId: clientProfile.accountId || prev.accountId,
        broker: clientProfile.broker || prev.broker,
        telegramUser: clientProfile.telegramUser || prev.telegramUser,
      }));
    } else if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.displayName || prev.name,
        email: currentUser.email || prev.email,
      }));
    }
  }, [clientProfile, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.accountId.trim() || !formData.telegramUser.trim()) {
      setError(t.fillRequired || 'Please fill all required fields.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      if (currentUser) {
        await saveProfile({
          name: formData.name.trim(),
          telegramUser: formData.telegramUser.trim(),
          broker: formData.broker,
          accountId: formData.accountId.trim(),
          targetLots: formData.targetLots,
        });
      } else {
        await saveClientRegistration({
          name: formData.name.trim(),
          email: formData.email.trim(),
          telegramUser: formData.telegramUser.trim(),
          broker: formData.broker,
          accountId: formData.accountId.trim(),
          targetLots: formData.targetLots,
          authProvider: 'form',
        });
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to save registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section
      id="registration"
      className="relative w-full py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto z-10 border-b border-white/8 select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column (lg:col-span-6): Trust Badges, Star Rating & Copy */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>04 // REGISTRATION</span>
          </div>

          {/* Header with animated pulse gradient from template */}
          <h2 className="font-syncopate text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]">
            LET'S BUILD <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-600 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              REWARDS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-lg">
            {language === 'id'
              ? 'Setiap closed lot yang Anda tradingkan bulan ini otomatis dihitung ke target Anda. Daftarkan akun trading Anda sekarang untuk mulai mengumpulkan reward.'
              : 'Every closed lot you trade this month is automatically accumulated into your tier balance. Register your trading account now to start accumulating rewards.'}
          </p>

          {/* Star Ratings & Badge from Template */}
          <div className="reveal-division p-5 rounded-2xl glass-panel border border-cyan-500/20 max-w-md space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              ))}
              <span className="text-xs font-mono text-white font-bold ml-2">5.0 / 5.0</span>
            </div>
            <div className="text-sm font-semibold text-white">
              {language === 'id' ? 'Dipercaya oleh 10,000+ Trader Aktif' : 'Trusted by 10,000+ Active Traders'}
            </div>
            <p className="text-xs text-slate-400 font-light">
              {language === 'id'
                ? 'Pencairan hadiah tunai & gadget langsung melalui admin Telegram tanpa potongan.'
                : 'Direct cash and luxury gadget payouts verified via Telegram admin with zero cuts.'}
            </p>
          </div>

          {/* Badges List */}
          <div className="space-y-3 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-white font-semibold">10 Lot Self Rebate — <span className="text-cyan-400">USD 14 / LOT</span></span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Free Trial Seminggu VIP Indicator Bernilai 10K USD</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Guaranteed Cash & Official Apple Device Payouts</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSupportClick}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Contact Support for Claim 14USD Free Now →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-6): 3D Form pre-rotated rotate-y-[-5deg] straightening on hover */}
        <div className="lg:col-span-6 perspective-1000 reveal-division">
          <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-500 ease-out transform lg:[transform:rotateY(-5deg)] lg:hover:[transform:rotateY(0deg)]">
            <div className="flex items-center justify-between pb-5 border-b border-white/8 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                  CLIENT REGISTRATION & DATABASE SYNC
                </span>
                <h3 className="font-syncopate text-lg sm:text-xl font-bold text-white tracking-tight">
                  {t.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-syncopate text-xl font-bold text-white uppercase">
                  {t.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
                  {t.successDesc(formData.name, formData.accountId, formData.broker)}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => {
                      handleReset();
                      handleSupportClick();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open Official Telegram Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    {t.done}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 font-mono">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="trader@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                      {t.accountNumber} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.accountId}
                      onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                      placeholder={t.accountPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                      {t.brokerPlatform} *
                    </label>
                    <select
                      value={formData.broker}
                      onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    >
                      <option value="Exness">Exness</option>
                      <option value="XM Global">XM Global</option>
                      <option value="IC Markets">IC Markets</option>
                      <option value="Pepperstone">Pepperstone</option>
                      <option value="Other">Other MT4/MT5</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                    {t.telegramUsername} *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500 text-sm font-mono">@</span>
                    <input
                      type="text"
                      required
                      value={formData.telegramUser}
                      onChange={(e) => setFormData({ ...formData, telegramUser: e.target.value })}
                      placeholder={t.telegramPlaceholder}
                      className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1.5">
                    {t.targetPrize} *
                  </label>
                  <select
                    value={formData.targetLots}
                    onChange={(e) => setFormData({ ...formData, targetLots: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-sm sm:text-base text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  >
                    {t.targetOptions.map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <span className="text-[10px] font-mono text-slate-400">
                    Saved directly to Firebase database
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono uppercase font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105 cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Saving...' : t.submit}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
