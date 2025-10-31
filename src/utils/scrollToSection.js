const DEFAULT_OFFSET = 16;

/**
 * AI Was used to help with the smooth scrolling function implemented in the navbar.
 * Smoothly scrolls a section into view while accounting for the fixed navbar.
 * @param {string|HTMLElement} target - id string or element to scroll to.
 * @param {{ offset?: number, behavior?: ScrollBehavior }} options
 */
export function scrollSectionIntoView(target, { offset = DEFAULT_OFFSET, behavior = "smooth" } = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // Resolve target element
  const element = typeof target === "string" ? document.getElementById(target) : target;
  if (!element) return;

  // Calculate scroll position accounting for navbar height
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

  // Calculate final scroll position
  const rect = element.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const finalTop = Math.max(absoluteTop - navbarHeight - offset, 0);

  // Perform smooth scroll
  window.scrollTo({
    top: finalTop,
    behavior,
  });
}

export default scrollSectionIntoView;
