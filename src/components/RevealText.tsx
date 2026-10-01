import React, { useEffect, useRef, useState } from 'react';

interface RevealTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function RevealText({ text, className = '', delayOffset = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsRevealed(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
      );

      observer.observe(el);

      // Immediate check if element is already within viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setIsRevealed(true);
      }

      return () => observer.disconnect();
    } else {
      // Fallback
      setIsRevealed(true);
    }
  }, []);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span
      ref={containerRef}
      className={`reveal-text inline ${className} ${isRevealed ? 'is-revealed' : ''}`}
      data-revealed={isRevealed ? 'true' : 'false'}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="word-wrapper inline-block overflow-hidden"
          style={{
            marginBottom: '-0.2em',
            paddingBottom: '0.2em',
            verticalAlign: 'top',
          }}
        >
          <span
            className={`word-inner inline-block ${isRevealed ? 'is-revealed' : ''}`}
            style={{
              transform: isRevealed ? 'translateY(0%)' : 'translateY(110%)',
              transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${((idx + delayOffset) * 0.03).toFixed(2)}s`,
              willChange: 'transform',
            }}
            dangerouslySetInnerHTML={{ __html: `${word}&nbsp;` }}
          />
        </span>
      ))}
    </span>
  );
}
