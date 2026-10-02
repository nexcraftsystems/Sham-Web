import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Download,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  UserCheck,
  Database,
  KeyRound,
  Check,
  Copy,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEVELOPER_ADMIN_EMAIL, ClientRegistration } from '../firebase';
import { fetchAllClients, subscribeToClients } from '../services/database';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboardModal({ isOpen, onClose }: AdminDashboardModalProps) {
  const { currentUser, isAdmin, signInWithGoogle, loginWithEmail, logout } = useAuth();

  const [adminEmail, setAdminEmail] = useState(DEVELOPER_ADMIN_EMAIL);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [clients, setClients] = useState<ClientRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brokerFilter, setBrokerFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Subscribe to live client registrations when modal is open and user is admin
  useEffect(() => {
    if (!isOpen || !isAdmin) return;

    setIsRefreshing(true);
    const unsubscribe = subscribeToClients((data) => {
      setClients(data);
      setIsRefreshing(false);
    });

    return () => unsubscribe();
  }, [isOpen, isAdmin]);

  if (!isOpen) return null;

  const handleGoogleAdminLogin = async () => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const user = await signInWithGoogle();
      if (user.email?.toLowerCase() !== DEVELOPER_ADMIN_EMAIL.toLowerCase()) {
        setAuthError(`Access Denied: Logged in as ${user.email}. Only developer account (${DEVELOPER_ADMIN_EMAIL}) has admin privileges.`);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Failed to authenticate with Google.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail.trim().toLowerCase() !== DEVELOPER_ADMIN_EMAIL.toLowerCase()) {
      setAuthError(`Only ${DEVELOPER_ADMIN_EMAIL} is authorized to access developer dashboard.`);
      return;
    }
    if (!adminPassword) {
      setAuthError('Please enter admin password.');
      return;
    }

    try {
      setAuthLoading(true);
      setAuthError(null);
      await loginWithEmail(adminEmail, adminPassword);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid admin credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchAllClients();
      setClients(data);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExportCSV = () => {
    if (!clients.length) return;

    const headers = ['No', 'Date Registered', 'Name', 'Email', 'Telegram', 'Broker', 'Account ID', 'Target Lots', 'Auth Provider'];
    const rows = filteredClients.map((c, i) => [
      i + 1,
      `"${c.registeredAt || ''}"`,
      `"${c.name || ''}"`,
      `"${c.email || ''}"`,
      `"${c.telegramUser || ''}"`,
      `"${c.broker || ''}"`,
      `"${c.accountId || ''}"`,
      `"${c.targetLots || ''}"`,
      `"${c.authProvider || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `registered_clients_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.accountId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.telegramUser || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.broker || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBroker = brokerFilter === 'All' || c.broker === brokerFilter;

    return matchesSearch && matchesBroker;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#070707] text-slate-200 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden border border-cyan-500/40">
        
        {/* Modal Top Header */}
        <div className="shrink-0 px-5 sm:px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400">
                  DEVELOPER DATABASE
                </span>
                {isAdmin && (
                  <span className="text-[9px] font-mono uppercase bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Authorized Root
                  </span>
                )}
              </div>
              <h3 className="font-syncopate text-sm sm:text-base font-bold text-white tracking-tight">
                Tabulated Client Dashboard
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={logout}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-red-500/40 transition-colors cursor-pointer"
                title="Sign out of developer admin"
              >
                <LogOut className="w-3 h-3 text-red-400" />
                <span>Logout</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        {!isAdmin ? (
          /* AUTHENTICATION GATE SCREEN: Only nexcraftsystems@gmail.com can enter */
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                RESTRICTED DEVELOPER PORTAL
              </span>
              <h4 className="font-syncopate text-xl font-bold text-white">
                Admin Authentication
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-2 leading-relaxed">
                This dashboard contains confidential registered client records and is strictly restricted to developer account:
                <br />
                <span className="text-cyan-300 font-bold underline decoration-cyan-500/40">{DEVELOPER_ADMIN_EMAIL}</span>
              </p>
            </div>

            {authError && (
              <div className="w-full p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 font-mono flex items-center gap-2 text-left">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Quick Google Sign In */}
            <div className="w-full space-y-3">
              <button
                type="button"
                onClick={handleGoogleAdminLogin}
                disabled={authLoading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-102 cursor-pointer disabled:opacity-50"
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
                <span>Sign in with Google ({DEVELOPER_ADMIN_EMAIL})</span>
              </button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-[1px] bg-white/10" />
                <span className="text-[10px] font-mono text-slate-500 uppercase">Or Admin Password</span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleEmailAdminLogin} className="space-y-3 w-full text-left">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                    Developer Email
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{authLoading ? 'Verifying...' : 'Authenticate Admin'}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* TABULATED DASHBOARD VIEW */
          <div className="flex flex-col flex-1 overflow-hidden p-5 sm:p-6 space-y-4">
            {/* Top Toolbar: Search, Filter, Export, Refresh */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search client, email, account ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Broker Filter */}
                <select
                  value={brokerFilter}
                  onChange={(e) => setBrokerFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Brokers</option>
                  <option value="Exness">Exness</option>
                  <option value="XM Global">XM Global</option>
                  <option value="IC Markets">IC Markets</option>
                  <option value="Pepperstone">Pepperstone</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Action Buttons: Refresh + Export CSV */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Refresh Data from Firebase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={!filteredClients.length}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5 text-black" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-black/50 border border-white/8 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">Total Registered Clients:</span>
                <span className="text-white font-bold">{clients.length}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Filtered:</span>
                <span className="text-cyan-400 font-bold">{filteredClients.length}</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Connected to <span className="text-slate-300 font-mono">tradebase-fd29d</span> Firestore
              </div>
            </div>

            {/* Tabulated Table Container */}
            <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-black/40 min-h-[300px]">
              {filteredClients.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Database className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-mono text-slate-400">
                    {clients.length === 0 ? 'No registered clients yet in Firebase.' : 'No clients match your search filter.'}
                  </p>
                  <p className="text-xs font-mono text-slate-600">
                    When clients register before contacting Telegram, their records appear here instantly.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-xs font-mono border-collapse min-w-[750px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/80 text-[11px] uppercase tracking-wider text-slate-400 sticky top-0 z-10 backdrop-blur-md">
                      <th className="py-3 px-3.5 w-12 text-center">#</th>
                      <th className="py-3 px-3.5">Date Registered</th>
                      <th className="py-3 px-3.5">Client Name</th>
                      <th className="py-3 px-3.5">Email</th>
                      <th className="py-3 px-3.5">Telegram Handle</th>
                      <th className="py-3 px-3.5">Broker Platform</th>
                      <th className="py-3 px-3.5">Account ID</th>
                      <th className="py-3 px-3.5">Target</th>
                      <th className="py-3 px-3.5 text-center">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredClients.map((client, idx) => (
                      <tr
                        key={client.id || `${client.accountId}-${idx}`}
                        className="hover:bg-cyan-950/20 transition-colors group"
                      >
                        {/* No */}
                        <td className="py-3 px-3.5 text-center text-slate-500">
                          {idx + 1}
                        </td>

                        {/* Date Registered */}
                        <td className="py-3 px-3.5 text-slate-300 whitespace-nowrap">
                          {client.registeredAt || 'Just now'}
                        </td>

                        {/* Name */}
                        <td className="py-3 px-3.5 text-white font-semibold whitespace-nowrap">
                          {client.name || 'Anonymous Trader'}
                        </td>

                        {/* Email */}
                        <td className="py-3 px-3.5 text-slate-300 whitespace-nowrap">
                          {client.email}
                        </td>

                        {/* Telegram */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          {client.telegramUser ? (
                            <a
                              href={`https://t.me/${client.telegramUser.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1"
                            >
                              <span>{client.telegramUser.startsWith('@') ? client.telegramUser : `@${client.telegramUser}`}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>

                        {/* Broker */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-black/80 border border-white/10 text-slate-200">
                            {client.broker}
                          </span>
                        </td>

                        {/* Account ID */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                              {client.accountId}
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(client.accountId, `acc-${idx}`)}
                              className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
                              title="Copy Account ID"
                            >
                              {copiedId === `acc-${idx}` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Target */}
                        <td className="py-3 px-3.5 text-slate-400 whitespace-nowrap">
                          {client.targetLots || '500 Lots'}
                        </td>

                        {/* Provider */}
                        <td className="py-3 px-3.5 text-center whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              client.authProvider === 'google.com'
                                ? 'bg-blue-950/70 border border-blue-500/30 text-blue-300'
                                : 'bg-purple-950/70 border border-purple-500/30 text-purple-300'
                            }`}
                          >
                            {client.authProvider === 'google.com' ? 'Google' : 'Email/Pass'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Bottom Status Note */}
            <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/10">
              <span>Firebase Database: `clients` collection</span>
              <span>Developer Admin Access Only · {DEVELOPER_ADMIN_EMAIL}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
