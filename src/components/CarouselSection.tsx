import React, { useRef, useState, MouseEvent } from 'react';
import { ArrowUpRight } from './Icons';
import { RevealText } from './RevealText';

interface CarouselSectionProps {
  onHoverCarousel?: (label: string | null) => void;
  onOpenInquiry?: () => void;
}

export function CarouselSection({ onHoverCarousel, onOpenInquiry }: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slides = [
    {
      title: 'Moxion Mobile Energy',
      category: 'Prototype & Field Testing',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
    },
    {
      title: 'Editorial & Brand Narrative',
      category: 'Portraiture & Direction',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Multidisciplinary Studio',
      category: 'Paris & San Diego Collective',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Rivian Commercial Showroom',
      category: 'Automotive Experience',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
    },
    {
      title: 'Ōura Ring Launch',
      category: 'Industrial Design Flagship',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    },
  ];

  // Mouse drag functionality for desktop
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    onHoverCarousel?.(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -420 : 420;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="w-full bg-[#faf8f5] py-20 md:py-32">
      {/* Top Header & Intro text */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3">
            Contact & Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#111]">
            <RevealText text="Let's build the next icon together." />
          </h2>
        </div>

        {/* Carousel Drag Help & Arrows */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollByAmount('left')}
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount('right')}
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            →
          </button>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-medium tracking-wide hover:bg-black/80 transition-colors cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container: uses .no-scrollbar but allows standard overflow-x */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHoverCarousel?.('DRAG')}
        className="no-scrollbar flex overflow-x-auto overflow-y-hidden gap-6 px-6 md:px-12 cursor-grab active:cursor-grabbing select-none py-4"
        style={{ scrollSnapType: isDragging ? 'none' : 'x mandatory' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[78vw] sm:w-[50vw] md:w-[38vw] lg:w-[30vw] max-w-[500px] group"
            style={{ scrollSnapAlign: 'start' }}
          >
            {/* Aspect-[4/3] Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Slide Metadata */}
            <div className="mt-3 flex justify-between items-baseline text-xs text-black/70">
              <span className="font-medium text-black group-hover:underline">{slide.title}</span>
              <span className="font-mono text-black/40">{slide.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
