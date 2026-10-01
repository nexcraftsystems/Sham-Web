import React, { useEffect, useState } from 'react';
import { CloseIcon } from './Icons';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReelModal({ isOpen, onClose }: ReelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(24);

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

  // Subtle progress ticker
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl flex flex-col justify-between">
        {/* Reel Top Bar */}
        <div className="relative z-10 p-6 flex justify-between items-center text-white/90 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase">
              Rejouice Venture Reel 2026
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
          >
            <span>Close</span>
            <CloseIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cinematic Backdrop Video/Motion Simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg"
            alt="Agency Reel Frame"
            className="w-full h-full object-cover object-center filter brightness-75 scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
        </div>

        {/* Center Play/Pause Trigger */}
        <div className="relative z-10 self-center my-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all cursor-pointer shadow-xl"
            aria-label={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
          >
            {isPlaying ? (
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-6 bg-white rounded-sm" />
                <span className="w-1.5 h-6 bg-white rounded-sm" />
              </div>
            ) : (
              <svg className="w-8 h-8 fill-white translate-x-0.5" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>

        {/* Reel Bottom Controls & Scrubber */}
        <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-3 text-white">
          <div className="flex justify-between items-center text-xs font-mono text-white/70">
            <span>Rivian · Ōura · Moxion · Future Ventures</span>
            <span>{Math.floor((progress / 100) * 128)}s / 128s</span>
          </div>

          {/* Scrubber Bar */}
          <div
            className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
          >
            <div
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
