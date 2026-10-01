import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { OrbSection } from './components/OrbSection';
import { HowToClaim } from './components/HowToClaim';
import { FreeIndicatorSection } from './components/FreeIndicatorSection';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';
import { TelegramModal } from './components/TelegramModal';
import { CustomCursor } from './components/CustomCursor';
import { SeamlessScrollBar } from './components/SeamlessScrollBar';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);
  const [cursorText] = useState<string | null>(null);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#faf8f5] text-[#111] antialiased overflow-x-hidden selection:bg-black selection:text-white">
        {/* Custom Trailing Magnetic Cursor */}
        <CustomCursor cursorText={cursorText} />

        {/* Seamless Floating Right-Side Scroll Bar */}
        <SeamlessScrollBar />

        {/* Simple Menu Bar at the very top */}
        <Navigation
          onOpenRegister={() => setRegisterOpen(true)}
          onOpenTelegram={() => setTelegramOpen(true)}
        />

        <main>
          {/* Hero Section: "TRADE & CLAIM" strictly unchanged */}
          <Hero
            onOpenRegister={() => setRegisterOpen(true)}
            onOpenTelegram={() => setTelegramOpen(true)}
          />

          {/* Intro Section: "More Lot, More Rewards, More Rebate!" */}
          <Intro
            onOpenTelegram={() => setTelegramOpen(true)}
            onOpenRegister={() => setRegisterOpen(true)}
          />

          {/* Lot Targets Section */}
          <OrbSection
            onOpenTelegram={() => setTelegramOpen(true)}
            onOpenRegister={() => setRegisterOpen(true)}
          />

          {/* How to Claim Rewards Section (Steps 01, 02, 03) */}
          <HowToClaim
            onOpenTelegram={() => setTelegramOpen(true)}
            onOpenRegister={() => setRegisterOpen(true)}
          />

          {/* Register Now & Claim Your Free Indicator Section */}
          <FreeIndicatorSection
            onOpenRegister={() => setRegisterOpen(true)}
            onOpenTelegram={() => setTelegramOpen(true)}
          />
        </main>

        {/* Footer Section with "TRADE & CLAIM" strictly unchanged */}
        <Footer
          onOpenTelegram={() => setTelegramOpen(true)}
          onOpenRegister={() => setRegisterOpen(true)}
        />

        {/* Easy Register & Telegram Modals */}
        <RegisterModal
          isOpen={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onOpenTelegram={() => setTelegramOpen(true)}
        />

        <TelegramModal
          isOpen={telegramOpen}
          onClose={() => setTelegramOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
