const DEFAULT_OFFSET = 16;

/**
 * Smoothly scrolls a section into view while accounting for the fixed navbar.
 * @param {string|HTMLElement} target - id string or element to scroll to.
 * @param {{ offset?: number, behavior?: ScrollBehavior }} options
 */
export function scrollSectionIntoView(target, { offset = DEFAULT_OFFSET, behavior = "smooth" } = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const element = typeof target === "string" ? document.getElementById(target) : target;
  if (!element) return;

  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

  const rect = element.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const finalTop = Math.max(absoluteTop - navbarHeight - offset, 0);

  window.scrollTo({
    top: finalTop,
    behavior,
  });
}

export default scrollSectionIntoView;
