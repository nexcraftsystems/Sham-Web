import React, { useState, useEffect } from 'react';
import { CloseIcon, ArrowUpRight } from './Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    model: 'sprint',
    budget: '$50k - $100k',
    details: '',
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      setError('Please complete all required fields (Name, Email, Project Details).');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid business email address.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      model: 'sprint',
      budget: '$50k - $100k',
      details: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#faf8f5] text-[#111] rounded-2xl shadow-2xl overflow-hidden border border-black/10">
        {/* Modal Header */}
        <div className="px-6 py-5 md:px-8 border-b border-black/10 flex justify-between items-center bg-[#faf8f5]">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
              Agency Inquiry
            </span>
            <h3 className="text-lg md:text-xl font-normal tracking-tight text-[#111]">
              Initiate Collaboration
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 text-xs font-medium hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <span>Close</span>
            <CloseIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto no-scrollbar">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-semibold">
                ✓
              </div>
              <h4 className="text-2xl font-normal tracking-tight text-[#111]">
                Inquiry Received
              </h4>
              <p className="text-sm md:text-base text-black/70 max-w-md font-light leading-relaxed">
                Thank you, {formData.name}. Our partners in Paris and San Diego review inquiries daily. We will respond to <span className="font-mono text-black font-normal">{formData.email}</span> within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 rounded-full bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Vance"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@company.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Technologies"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1.5">
                    Desired Engagement Model
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="sprint">01. Creative Sprint / Retainer (8-14 weeks)</option>
                    <option value="partner">02. Venture Partner (Quarterly Seat / Equity)</option>
                    <option value="flagship">03. Digital Flagship & 3D Experience</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-mono text-black/60 mb-1.5">
                  Project Vision & Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell us about what you're building, upcoming milestones, and target launch timeframe..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-black/15 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/10">
                <span className="text-xs text-black/50 font-mono">
                  Direct founder access · Paris & San Diego
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
