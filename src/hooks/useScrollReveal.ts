import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal all immediately if IntersectionObserver is unsupported
      document.querySelectorAll('.reveal-division').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-division');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
