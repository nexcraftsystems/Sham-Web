import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  cursorText: string | null;
}

export function CustomCursor({ cursorText }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const isVisible = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia?.('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current && cursorRef.current) {
        isVisible.current = true;
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const loop = () => {
      const ease = 0.2;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current && isVisible.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isExpanded = !!cursorText;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] transition-[width,height,background-color] duration-300 ease-out flex items-center justify-center rounded-full opacity-0"
      style={{
        width: isExpanded ? '72px' : '10px',
        height: isExpanded ? '72px' : '10px',
        backgroundColor: isExpanded ? '#000000' : '#111111',
        boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
        willChange: 'transform',
      }}
    >
      {isExpanded && (
        <span className="text-[11px] font-mono tracking-widest uppercase text-white font-medium select-none">
          {cursorText}
        </span>
      )}
    </div>
  );
}
