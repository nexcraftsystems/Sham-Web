import React, { useEffect, useState } from 'react';
import { CloseIcon, ArrowUpRight } from './Icons';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReel?: () => void;
  onOpenContact?: () => void;
  onSelectProject?: (slug: 'rivian' | 'oura' | 'moxion') => void;
}

export function Menu({
  isOpen,
  onClose,
  onOpenReel,
  onOpenContact,
  onSelectProject,
}: MenuProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Work', href: '#portfolio' },
    { label: 'About', href: '#intro' },
    { label: 'Services & Models', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div
      id="fullscreen-menu"
      className={`fixed inset-0 z-50 bg-[#0e0e0e] text-white grain-overlay overflow-hidden flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isOpen ? 'translate-y-0 menu-open' : '-translate-y-full menu-closed'
      }`}
      style={{
        transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      aria-hidden={!isOpen}
    >
      {/* Top Bar inside Menu */}
      <div className="relative z-10 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center border-b border-white/10">
        <span className="text-sm md:text-base font-normal tracking-tight text-white/80">
          The Venture Agency.
        </span>
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 text-sm md:text-base font-normal tracking-tight text-white/90 hover:text-white cursor-pointer focus:outline-none"
          aria-label="Close Navigation Menu"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">Close</span>
          <CloseIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Main Navigation links */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Navigation Links */}
          <nav className="lg:col-span-7 flex flex-col space-y-3 md:space-y-4">
            {navLinks.map((link, idx) => (
              <div key={link.label} className="overflow-hidden">
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === 'Contact' && onOpenContact) {
                      e.preventDefault();
                      onClose();
                      onOpenContact();
                    } else {
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="group flex items-baseline gap-4 text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight hover:italic transition-all duration-300"
                >
                  <span className="text-xs md:text-sm font-mono text-white/40 tracking-widest">
                    0{idx + 1}
                  </span>
                  <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-2">
                    {link.label}
                  </span>
                </a>
              </div>
            ))}
          </nav>

          {/* Right Preview / Work Quick Access */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-center space-y-6 pl-8 border-l border-white/10">
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Featured Ventures</div>
            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProject?.('rivian');
                }}
                className="group flex items-center justify-between text-left p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-lg font-medium text-white group-hover:underline">RIVIAN</div>
                  <div className="text-xs text-white/60">Electric Adventure Mobility</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProject?.('oura');
                }}
                className="group flex items-center justify-between text-left p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-lg font-medium text-white group-hover:underline">ŌURA</div>
                  <div className="text-xs text-white/60">Next-Gen Health Technology</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProject?.('moxion');
                }}
                className="group flex items-center justify-between text-left p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-lg font-medium text-white group-hover:underline">MOXION</div>
                  <div className="text-xs text-white/60">Clean Mobile Energy Systems</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </button>
            </div>

            {onOpenReel && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenReel();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Watch Agency Showreel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer inside Menu */}
      <div className="relative z-10 w-full px-6 py-6 md:px-12 md:py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs md:text-sm text-white/60">
        <div className="flex items-center gap-6">
          <span>Paris & San Diego</span>
          <span className="hidden sm:inline">·</span>
          <a
            href="mailto:hi@rejouice.com"
            className="hover:text-white transition-colors underline underline-offset-4"
          >
            hi@rejouice.com
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X (Twitter)
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
