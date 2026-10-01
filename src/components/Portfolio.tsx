import React from 'react';

interface PortfolioProps {
  onSelectProject: (slug: 'rivian' | 'oura' | 'moxion') => void;
  onHoverCard?: (label: string | null) => void;
}

export function Portfolio({ onSelectProject, onHoverCard }: PortfolioProps) {
  const projects = [
    {
      slug: 'rivian' as const,
      label: 'RIVIAN',
      subtitle: 'Electric Adventure Mobility',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
      tag: '01 / AUTOMOTIVE',
    },
    {
      slug: 'oura' as const,
      label: 'ŌURA',
      subtitle: 'Next-Gen Health Technology',
      image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
      tag: '02 / CONSUMER HARDWARE',
    },
    {
      slug: 'moxion' as const,
      label: 'MOXION',
      subtitle: 'Clean Mobile Energy Systems',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
      tag: '03 / CLEAN ENERGY',
    },
  ];

  return (
    <section id="portfolio" className="w-full bg-[#faf8f5]">
      {/* Portfolio Grid Header */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-12 flex justify-between items-center border-b border-black/10">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-black/50">
          Selected Venture Portfolios
        </span>
        <span className="text-xs font-mono text-black/40">
          2021 — 2026
        </span>
      </div>

      {/* Grid: 3 columns (md), 1 column (mobile), 1px gap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
        {projects.map((project) => (
          <div
            key={project.slug}
            onClick={() => onSelectProject(project.slug)}
            onMouseEnter={() => onHoverCard?.('VIEW')}
            onMouseLeave={() => onHoverCard?.(null)}
            className="group relative h-[65vh] sm:h-[75vh] md:h-[82vh] overflow-hidden bg-black cursor-pointer select-none"
          >
            {/* Image with Scale-105 transition over 700ms on portfolio images */}
            <img
              src={project.image}
              alt={project.label}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

            {/* Top Category Tag */}
            <div className="absolute top-6 left-6 z-10">
              <span className="text-[11px] font-mono tracking-widest text-white/70 uppercase">
                {project.tag}
              </span>
            </div>

            {/* Centered at bottom-8 of each image: RIVIAN, ŌURA, MOXION */}
            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.05em] text-white drop-shadow-md group-hover:tracking-[0.1em] transition-all duration-500">
                {project.label}
              </h3>
              <p className="text-xs md:text-sm text-white/70 font-light mt-2 tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {project.subtitle} · View Case
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
