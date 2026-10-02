import React, { useState, useEffect } from 'react';
import { X, Send, Check, Zap, ArrowUpRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { useAuth } from '../context/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTelegram?: () => void;
  reason?: string;
}

export function RegisterModal({
  isOpen,
  onClose,
  onOpenTelegram,
  reason,
}: RegisterModalProps) {
  const { language } = useLanguage();
  const t = translations[language].registerModal;
  const { currentUser, clientProfile, signInWithGoogle, registerWithEmail, saveProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: clientProfile?.name || currentUser?.displayName || '',
    email: clientProfile?.email || currentUser?.email || '',
    password: '',
    accountId: clientProfile?.accountId || '',
    broker: clientProfile?.broker || 'Exness',
    telegramUser: clientProfile?.telegramUser || '',
    targetLots: clientProfile?.targetLots || '500 Lots',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'google' | 'password'>('google');

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

  // Handle Google Sign-in and Account Linking
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await signInWithGoogle();
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || prev.name || user.email?.split('@')[0] || '',
        email: user.email || prev.email,
      }));
      setAuthMode('google');
    } catch (err: any) {
      setError(err.message || 'Google account linking failed. You can register with email and password below.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.accountId.trim() || !formData.telegramUser.trim()) {
      setError(t.fillRequired || 'Please fill all required fields.');
      return;
    }

    if (!currentUser && authMode === 'password') {
      if (!formData.password || formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);

      if (!currentUser && authMode === 'password') {
        await registerWithEmail(formData.email.trim(), formData.password, {
          name: formData.name.trim(),
          telegramUser: formData.telegramUser.trim(),
          broker: formData.broker,
          accountId: formData.accountId.trim(),
          targetLots: formData.targetLots,
        });
      } else {
        await saveProfile({
          name: formData.name.trim(),
          telegramUser: formData.telegramUser.trim(),
          broker: formData.broker,
          accountId: formData.accountId.trim(),
          targetLots: formData.targetLots,
        });
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to save registration to database.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToTelegram = () => {
    setIsSubmitted(false);
    onClose();
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#080808] text-slate-200 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden border border-cyan-500/30">
        
        {/* Modal Header */}
        <div className="shrink-0 px-5 sm:px-6 py-4 sm:py-5 border-b border-white/8 flex justify-between items-center bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 block">
                CLIENT VERIFICATION & REGISTRATION
              </span>
              <h3 className="font-syncopate text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
                {t.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <span>{t.close}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body with vertical scroll */}
        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* SUCCESS STATE */
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-syncopate text-xl font-bold text-white uppercase">
                {t.successTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
                Your trading account (<span className="text-cyan-400 font-mono font-bold">{formData.accountId}</span>) has been safely registered in the Firebase database. You can now contact Telegram admin anytime!
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  type="button"
                  onClick={handleProceedToTelegram}
                  className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Official Telegram Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <div className="space-y-5">
              {/* Notice Banner */}
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>
                  {reason || 'Before contacting the Telegram link, please complete your trading account registration. Your record will be stored in our database.'}
                </span>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-300 font-mono">
                  {error}
                </div>
              )}

              {/* 1. Google Account Link / Sign-in */}
              <div className="space-y-2">
                <span className="block text-[10px] uppercase tracking-widest font-mono text-slate-400">
                  Step 1: Link Account
                </span>
                
                {currentUser ? (
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Linked with: <strong>{currentUser.email}</strong></span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      Verified
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-101 cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Link with Google Account</span>
                  </button>
                )}
              </div>

              {/* Step 2: Information form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <span className="block text-[10px] uppercase tracking-widest font-mono text-slate-400">
                  Step 2: Trading Account & Password
                </span>

                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="trader@example.com"
                    disabled={!!currentUser}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono disabled:opacity-70"
                  />
                </div>

                {/* Password (if not logged in with Google) */}
                {!currentUser && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                      Create Password (Min 6 chars) *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setAuthMode('password');
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                )}

                {/* Broker & Account Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                      {t.brokerPlatform} *
                    </label>
                    <select
                      value={formData.broker}
                      onChange={(e) => setFormData({ ...formData, broker: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    >
                      <option value="Exness">Exness</option>
                      <option value="XM Global">XM Global</option>
                      <option value="IC Markets">IC Markets</option>
                      <option value="Pepperstone">Pepperstone</option>
                      <option value="Other">Other MT4/MT5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                      {t.accountNumber} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.accountId}
                      onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                      placeholder={t.accountPlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                {/* Telegram Username */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                    {t.telegramUsername} *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-slate-500 text-sm font-mono">@</span>
                    <input
                      type="text"
                      required
                      value={formData.telegramUser}
                      onChange={(e) => setFormData({ ...formData, telegramUser: e.target.value })}
                      placeholder="your_telegram_id"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                {/* Target Lots */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest font-mono text-slate-400 mb-1">
                    Target Milestone *
                  </label>
                  <select
                    value={formData.targetLots}
                    onChange={(e) => setFormData({ ...formData, targetLots: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="10 Lot Self Rebate">10 Lot Self Rebate (USD 14/LOT)</option>
                    <option value="100 Lots (Cash 2.2Jt)">100 Lots (Cash 2.2 Juta)</option>
                    <option value="200 Lots (iPad 11)">200 Lots (iPad 11)</option>
                    <option value="350 Lots (iPhone 17)">350 Lots (iPhone 17)</option>
                    <option value="500 Lots (MacBook + 3.5Jt)">500 Lots (MacBook Neo + 3.5 Juta)</option>
                    <option value="1000 Lots (MacBook + 17Jt)">1,000 Lots (MacBook Neo + 17 Juta)</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs sm:text-sm font-mono uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer disabled:opacity-50"
                  >
                    <span>{loading ? 'Saving to Database...' : 'Register & Unlock Telegram Access'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
