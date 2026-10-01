import React, { useEffect } from 'react';
import { CloseIcon, ArrowUpRight } from './Icons';

interface CaseStudyModalProps {
  projectSlug: 'rivian' | 'oura' | 'moxion' | null;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export function CaseStudyModal({ projectSlug, onClose, onOpenInquiry }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (projectSlug) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectSlug, onClose]);

  if (!projectSlug) return null;

  const data = {
    rivian: {
      name: 'RIVIAN',
      tagline: 'Electric Adventure Mobility & Commercial Flagship',
      year: '2022 — 2024',
      sector: 'Electric Vehicles / Mobility',
      heroImage: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
      overview:
        'Rivian partnered with Rejouice to conceptualize and craft a transcendent digital brand language that conveys raw rugged capability alongside state-of-the-art software elegance. We created bespoke interactive 3D configurators, high-converting digital showrooms, and an enduring design system.',
      metrics: [
        { label: 'GLOBAL REACH', value: '18M+ Visitors' },
        { label: 'CONVERSION', value: '+42% Inbound Leads' },
        { label: 'AWARDS', value: 'Awwwards SOTD' },
      ],
      deliverables: [
        'Brand Architecture',
        'Interactive 3D Configurator',
        'Next-Gen Web Architecture',
        'Motion & Spatial Design',
        'Design System Documentation',
      ],
    },
    oura: {
      name: 'ŌURA',
      tagline: 'Next-Generation Health Technology & Flagship Launch',
      year: '2023 — 2025',
      sector: 'Consumer Health Hardware',
      heroImage: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
      overview:
        'Translating biometric signals into poetic, human emotional clarity. For the launch of the new Ōura generation, Rejouice reimagined the flagship digital narrative, introducing intuitive micro-interactions and tactile hardware typography across all consumer touchpoints.',
      metrics: [
        { label: 'LAUNCH SCALE', value: '1.2M Units Pre-ordered' },
        { label: 'ENGAGEMENT', value: '4.8x Time on Page' },
        { label: 'RECOGNITION', value: 'FWA of the Day' },
      ],
      deliverables: [
        'Hardware Launch Experience',
        'Micro-Sensory WebGL Visuals',
        'Consumer Onboarding Journey',
        'Global eCommerce Flagship',
        'Product Design Language',
      ],
    },
    moxion: {
      name: 'MOXION',
      tagline: 'Clean Mobile Energy Systems & Fleet Telemetry',
      year: '2023 — 2026',
      sector: 'Clean Energy & Industrial Tech',
      heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
      overview:
        'Moxion is disrupting diesel generators with emission-free mobile battery power. Rejouice designed the complete brand narrative, industrial telemetry interface, and enterprise portal that allows construction, film production, and utility giants to monitor zero-emission fleet deployments.',
      metrics: [
        { label: 'SERIES B EXPANSION', value: '$100M+ Raised' },
        { label: 'DEPLOYMENTS', value: '500+ Active Fleet Units' },
        { label: 'EMISSIONS CUT', value: '12k Tons CO₂ Avoided' },
      ],
      deliverables: [
        'Industrial Brand Strategy',
        'Fleet Telemetry Web Application',
        'Investor & Customer Portal',
        'Field Testing Documentation',
        '3D Hardware Render Pipeline',
      ],
    },
  }[projectSlug];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full h-full md:h-[92vh] max-w-6xl bg-[#faf8f5] text-[#111] md:rounded-2xl shadow-2xl overflow-y-auto no-scrollbar flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#faf8f5]/95 backdrop-blur-md px-6 py-5 md:px-10 border-b border-black/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-black/50">
              Venture Case Study
            </span>
            <span className="text-black/30">/</span>
            <span className="text-xs font-mono text-black font-semibold">{data.name}</span>
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
        <div className="p-6 md:p-12 space-y-12">
          {/* Title Area */}
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#111] mb-4">
              {data.name}
            </h2>
            <p className="text-xl sm:text-2xl text-black/70 font-light max-w-3xl">
              {data.tagline}
            </p>
          </div>

          {/* Hero Image Showcase */}
          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black shadow-md">
            <img
              src={data.heroImage}
              alt={data.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Overview & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-4">
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
                Narrative & Execution
              </h3>
              <p className="text-base sm:text-lg text-black/80 font-light leading-relaxed">
                {data.overview}
              </p>
            </div>

            <div className="md:col-span-5 space-y-6 md:border-l md:border-black/10 md:pl-8">
              <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
                Scope & Deliverables
              </h3>
              <ul className="space-y-2">
                {data.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-black/80 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantified Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/10">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white border border-black/5 shadow-sm">
                <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 mb-1">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-normal tracking-tight text-[#111]">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-black/10 gap-4">
            <div className="text-xs text-black/50 font-mono">
              Timeline: {data.year} · Sector: {data.sector}
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInquiry?.();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition-colors cursor-pointer"
            >
              <span>Build A Similar Venture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
