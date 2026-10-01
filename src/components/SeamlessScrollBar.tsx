import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export function SeamlessScrollBar() {
  const { language } = useLanguage();
  const t = translations[language].scrollRail;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState('top');
  const railRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'top', label: t.top },
    { id: 'intro', label: t.overview },
    { id: 'lot-targets', label: t.promo01 },
    { id: 'how-to-claim', label: t.claim },
    { id: 'free-indicator', label: t.indicator },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Determine active section id
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToRatio = (ratio: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * totalHeight,
      behavior: 'smooth',
    });
  };

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.min(Math.max(clickY / rect.height, 0), 1);
    scrollToRatio(ratio);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!railRef.current) return;
      const rect = railRef.current.getBoundingClientRect();
      const moveY = moveEvent.clientY - rect.top;
      const ratio = Math.min(Math.max(moveY / rect.height, 0), 1);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: ratio * totalHeight,
        behavior: 'auto',
      });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const percent = Math.round(scrollProgress * 100);
  const currentSection = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <aside
      aria-label="Page navigation scroll rail"
      className="fixed right-2 md:right-3.5 top-0 bottom-0 z-50 flex items-center justify-center pointer-events-none select-none"
    >
      {/* Interactive Rail Container */}
      <div
        ref={railRef}
        onClick={handleRailClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto relative h-[50vh] min-h-[300px] w-6 flex items-center justify-center cursor-pointer group"
      >
        {/* Hairline Rail Track */}
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isHovered || isDragging
              ? 'w-1 bg-black/15 shadow-sm'
              : 'w-[2px] bg-black/8'
          }`}
        />

        {/* Section Target Tick Dots along the rail */}
        <div className="absolute inset-y-0 flex flex-col justify-between py-1 pointer-events-none">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                activeId === sec.id
                  ? 'bg-black scale-150'
                  : 'bg-black/20 group-hover:bg-black/40'
              }`}
            />
          ))}
        </div>

        {/* Sliding Thumb Indicator */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            top: `${scrollProgress * 100}%`,
            transform: 'translateY(-50%)',
          }}
          className={`absolute right-1/2 translate-x-1/2 transition-transform duration-100 ease-out flex items-center justify-center ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Thumb Pill */}
          <div
            className={`rounded-full transition-all duration-200 ${
              isHovered || isDragging
                ? 'w-2 h-7 bg-black shadow-md scale-110'
                : 'w-1.5 h-5 bg-black/70 hover:bg-black'
            }`}
          />

          {/* Floating Info Tag revealing current section and % */}
          <div
            className={`absolute right-5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/90 text-white backdrop-blur-md text-[10px] font-mono whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none ${
              isHovered || isDragging
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-2'
            }`}
          >
            <span className="font-semibold">{currentSection.label}</span>
            <span className="text-white/40">·</span>
            <span className="text-emerald-400 font-bold">{percent}%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
