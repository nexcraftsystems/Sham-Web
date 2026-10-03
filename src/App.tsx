import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { HowToClaim } from './components/HowToClaim';
import { OrbSection } from './components/OrbSection';
import { FreeIndicatorSection } from './components/FreeIndicatorSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SeamlessScrollBar } from './components/SeamlessScrollBar';
import { LanguageProvider } from './context/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { openTelegramDirect } from './constants/telegram';

export default function App() {
  useScrollReveal();
  const [cursorText] = useState<string | null>(null);

  // Directly opens Telegram chat without delay or intermediate forms
  const handleDirectTelegram = () => {
    openTelegramDirect();
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#030303] text-slate-300 font-['Inter'] antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
        {/* Custom Trailing Glowing Cyan Cursor */}
        <CustomCursor cursorText={cursorText} />

        {/* Seamless Floating Right-Side Scroll Rail */}
        <SeamlessScrollBar />

        {/* Fixed Layer 0: Void Radial Glow, Matrix Boxes & Animated Stars Field */}
        <div className="fixed inset-0 bg-void opacity-70 pointer-events-none z-0" />
        <div className="fixed inset-0 matrix-boxes-layer opacity-80 pointer-events-none z-0" />
        <div className="fixed inset-0 stars-layer opacity-20 pointer-events-none z-0" />

        {/* Fixed Layer 40: CRT Scanlines Overlay (pointer-events-none) */}
        <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-45" />

        {/* Fixed Layer 50: Top Sticky Navigation */}
        <Navigation
          onOpenTelegram={handleDirectTelegram}
        />

        {/* Relative Content: Sections (z-10) */}
        <main className="relative z-10">
          {/* SECTION 1 - HERO: Full-width layout, TRADE & CLAIM X SELF REBATE 10USD, Full Prize Showcase, Direct Telegram CTAs */}
          <Hero
            onOpenTelegram={handleDirectTelegram}
          />

          {/* SECTION 2 - TECH MARQUEE: 28s Infinite Cyber Loop */}
          <TechMarquee />

          {/* SECTION 3 - PROCESS (01 // PROCESS): 3-Column Grid of 3D Tilt Cards with Direct Telegram Link */}
          <HowToClaim
            onOpenTelegram={handleDirectTelegram}
          />

          {/* SECTION 4 - REWARDS (02 // REWARDS): Modern Luxury Grid with Full Color Prize Pictures & Direct Telegram Link */}
          <OrbSection
            onOpenTelegram={handleDirectTelegram}
          />

          {/* SECTION 5 - VIP INDICATOR (03 // VIP INDICATOR): 10K USD Indicator in TradingView with Direct Telegram Link */}
          <FreeIndicatorSection
            onOpenTelegram={handleDirectTelegram}
          />
        </main>

        {/* Footer Section with TRADE & CLAIM X SELF REBATE 10USD Wordmark + Direct Telegram Link */}
        <Footer
          onOpenTelegram={handleDirectTelegram}
        />
      </div>
    </LanguageProvider>
  );
}
