import React, { useEffect, useRef, useState } from 'react';
import { CornerRightDown, ArrowUpRight } from './Icons';

interface ServicesProps {
  onOpenInquiry?: () => void;
}

export function Services({ onOpenInquiry }: ServicesProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgeVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="w-full bg-[#faf8f5] text-[#111] py-24 md:py-32 px-6 md:px-12 border-b border-black/10">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header with Black rounded pill Badge "Models" that scales in from 0 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-black/10">
          <div className="flex items-center gap-4">
            <div
              ref={badgeRef}
              className={`inline-flex items-center px-4 py-1.5 rounded-full bg-black text-white text-xs font-medium tracking-wide transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                badgeVisible ? 'scale-100' : 'scale-0'
              }`}
            >
              Models
            </div>
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
              Engagement Architecture
            </span>
          </div>

          {/* Interactive Link with Hover Border-Bottom Color Transition */}
          <a
            href="#contact"
            onClick={(e) => {
              if (onOpenInquiry) {
                e.preventDefault();
                onOpenInquiry();
              }
            }}
            className="group link-hover-border inline-flex items-center gap-2 text-base md:text-xl font-medium tracking-tight text-[#111] pb-1 cursor-pointer transition-colors"
          >
            <span>Explore our services & engagement models</span>
            <CornerRightDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* The Two Engagement Models Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pt-16">
          {/* Model 01 */}
          <div
            onClick={() => setSelectedModel(selectedModel === 1 ? null : 1)}
            className="group relative p-8 md:p-12 rounded-2xl bg-white/60 hover:bg-white border border-black/10 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between pb-8 border-b border-black/5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50">
                01. Strategy & Creative Sprint
              </span>
              <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-[#111] mb-4">
                Full-Service Venture Agency
              </h3>
              <p className="text-base md:text-lg text-black/70 leading-relaxed mb-8 font-light">
                Comprehensive creative, brand identity, 3D motion, and high-performance WebGL digital flagships. Designed for established companies and funded startups seeking category leadership.
              </p>

              <div className="space-y-3 pt-4 border-t border-black/5 text-sm text-black/80 font-mono">
                <div className="flex justify-between py-1">
                  <span className="text-black/50">TIMELINE</span>
                  <span>8 to 14 Weeks</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black/50">CORE DELIVERABLES</span>
                  <span>Brand Architecture · Digital Experience · 3D</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black/50">CADENCE</span>
                  <span>Dedicated Senior Sprint Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Model 02 */}
          <div
            onClick={() => setSelectedModel(selectedModel === 2 ? null : 2)}
            className="group relative p-8 md:p-12 rounded-2xl bg-white/60 hover:bg-white border border-black/10 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between pb-8 border-b border-black/5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50">
                02. Venture Partner Co-Op
              </span>
              <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-[#111] mb-4">
                Shared Upside & Equity Alignment
              </h3>
              <p className="text-base md:text-lg text-black/70 leading-relaxed mb-8 font-light">
                We invest deep creative sweat equity alongside founding teams. Operating as embedded design and engineering partners with direct skin in the game. Exactly one brand selected per quarter.
              </p>

              <div className="space-y-3 pt-4 border-t border-black/5 text-sm text-black/80 font-mono">
                <div className="flex justify-between py-1">
                  <span className="text-black/50">AVAILABILITY</span>
                  <span className="text-amber-800 font-medium">1 Seat Per Quarter</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black/50">ENGAGEMENT</span>
                  <span>Equity + Embedded Fractional Execs</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black/50">COLLABORATION</span>
                  <span>Direct Founder-to-Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
