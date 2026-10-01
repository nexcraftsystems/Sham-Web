/**
 * Rejouice Word-by-Word Text Reveal Animation Engine
 *
 * Requirements:
 * - Intersection Observer splits strings in `.reveal-text` into words
 * - Wraps them in `.word-wrapper` with `-0.2em` margin-bottom offset
 * - Creates `.word-inner` with `&nbsp;` and `0.03s` transition delay stagger
 * - Animates `.word-inner` from translateY(110%) to 0
 */

export function setupRevealObserver() {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll<HTMLElement>('.reveal-text');

  elements.forEach((element) => {
    if (element.getAttribute('data-split') === 'true') return;
    if (element.querySelector('.word-wrapper')) return;

    const originalText = element.textContent?.trim() || '';
    if (!originalText) return;

    // Split words by whitespace
    const words = originalText.split(/\s+/);
    element.innerHTML = '';
    element.setAttribute('data-split', 'true');

    const fragment = document.createDocumentFragment();

    words.forEach((word, index) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper';
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.marginBottom = '-0.2em';
      wrapper.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.style.transition = 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
      inner.style.transitionDelay = `${(index * 0.03).toFixed(2)}s`;
      inner.style.willChange = 'transform';
      // Append non-breaking space inside the word-inner to handle line-height and spacing
      inner.innerHTML = `${word}&nbsp;`;

      wrapper.appendChild(inner);
      fragment.appendChild(wrapper);
    });

    element.appendChild(fragment);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const inners = entry.target.querySelectorAll<HTMLElement>('.word-inner');
          inners.forEach((inner) => {
            inner.style.transform = 'translateY(0%)';
            inner.classList.add('is-revealed');
          });
          entry.target.classList.add('is-revealed');
          entry.target.setAttribute('data-revealed', 'true');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));

  return () => {
    elements.forEach((el) => observer.unobserve(el));
    observer.disconnect();
  };
}
