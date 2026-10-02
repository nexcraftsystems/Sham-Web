import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { HowToClaim } from './components/HowToClaim';
import { OrbSection } from './components/OrbSection';
import { FreeIndicatorSection } from './components/FreeIndicatorSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';
import { TelegramModal } from './components/TelegramModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { CustomCursor } from './components/CustomCursor';
import { SeamlessScrollBar } from './components/SeamlessScrollBar';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useScrollReveal } from './hooks/useScrollReveal';

function MainApp() {
  useScrollReveal();
  const { isRegistered } = useAuth();

  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerReason, setRegisterReason] = useState<string | undefined>(undefined);
  const [telegramOpen, setTelegramOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [cursorText] = useState<string | null>(null);

  // Shortcut listeners: URL hash (#admin or ?admin=true) and Keyboard (Ctrl+Shift+A or Alt+A)
  React.useEffect(() => {
    const checkAdminIntent = () => {
      if (
        window.location.hash.toLowerCase() === '#admin' ||
        window.location.search.toLowerCase().includes('admin=true')
      ) {
        setAdminOpen(true);
      }
    };

    checkAdminIntent();
    window.addEventListener('hashchange', checkAdminIntent);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') ||
        (e.altKey && e.key.toLowerCase() === 'a')
      ) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminIntent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Require client registration before accessing Telegram channels / support
  const handleTelegramAccess = () => {
    if (!isRegistered) {
      setRegisterReason('Before contacting the Telegram link, client needs to register properly by filling your trading account information.');
      setRegisterOpen(true);
    } else {
      setTelegramOpen(true);
    }
  };

  const handleOpenRegisterDirect = () => {
    setRegisterReason(undefined);
    setRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-slate-300 font-['Inter'] antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Custom Trailing Glowing Cyan Cursor */}
      <CustomCursor cursorText={cursorText} />

      {/* Seamless Floating Right-Side Scroll Rail */}
      <SeamlessScrollBar />

      {/* Fixed Layer 0: Void Radial Glow & Animated Stars Field */}
      <div className="fixed inset-0 bg-void opacity-70 pointer-events-none z-0" />
      <div className="fixed inset-0 stars-layer opacity-20 pointer-events-none z-0" />

      {/* Fixed Layer 40: CRT Scanlines Overlay (pointer-events-none) */}
      <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-45" />

      {/* Fixed Layer 50: Top Sticky Navigation */}
      <Navigation
        onOpenRegister={handleOpenRegisterDirect}
        onOpenTelegram={handleTelegramAccess}
      />

      {/* Special Offer Alert Banner: 10 Lot Self Rebate USD 14/LOT + 10k Indicator Free Trial + Claim 14USD Free */}
      <SpecialOfferBanner
        onOpenTelegram={handleTelegramAccess}
      />

      {/* Relative Content: Sections (z-10) */}
      <main className="relative z-10">
        {/* SECTION 1 - HERO: 12-col grid, Syncopate "TRADE & CLAIM", Radar HUD & Full Mobile Prize Showcase */}
        <Hero
          onOpenRegister={handleOpenRegisterDirect}
          onOpenTelegram={handleTelegramAccess}
        />

        {/* SECTION 2 - TECH MARQUEE: 28s Infinite Cyber Loop */}
        <TechMarquee />

        {/* SECTION 3 - PROCESS (01 // PROCESS): 3-Column Grid of 3D Tilt Cards with Cyan Glow */}
        <HowToClaim
          onOpenTelegram={handleTelegramAccess}
          onOpenRegister={handleOpenRegisterDirect}
        />

        {/* SECTION 4 - REWARDS (02 // REWARDS): CSS Columns Masonry Gallery with Phone Preview Accordion */}
        <OrbSection
          onOpenTelegram={handleTelegramAccess}
          onOpenRegister={handleOpenRegisterDirect}
        />

        {/* SECTION 5 - VIP INDICATOR (03 // VIP INDICATOR): Cyan Cyber Highlight Banner */}
        <FreeIndicatorSection
          onOpenRegister={handleOpenRegisterDirect}
          onOpenTelegram={handleTelegramAccess}
        />

        {/* SECTION 6 - CONTACT / REGISTRATION (04 // REGISTRATION): 3D Form pre-rotated rotate-y-[-5deg] */}
        <ContactSection
          onOpenTelegram={handleTelegramAccess}
        />
      </main>

      {/* Footer Section with "TRADE & CLAIM" strictly unchanged + Discreet Developer Admin Icon */}
      <Footer
        onOpenTelegram={handleTelegramAccess}
        onOpenRegister={handleOpenRegisterDirect}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Client Registration Modal (Includes Google Account Linking, Password & Account Info) */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenTelegram={() => setTelegramOpen(true)}
        reason={registerReason}
      />

      {/* Telegram Channel & Admin Contact Modal */}
      <TelegramModal
        isOpen={telegramOpen}
        onClose={() => setTelegramOpen(false)}
      />

      {/* Developer Admin Dashboard Modal (Strictly Restricted to nexcraftsystems@gmail.com) */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
