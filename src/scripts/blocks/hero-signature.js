// src/scripts/blocks/hero-signature.js
import { gsap } from 'gsap';

/**
 * Anime la baseline du hero après l'animation SVG du titre
 * - Le titre est animé en CSS pur (stroke-dashoffset)
 * - La baseline apparait en fade-in après l'animation du titre
 * - Respecte prefers-reduced-motion
 */
export function initHeroSignature() {
  const baseline = document.querySelector('[data-hero-baseline]');

  if (!baseline) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Pas d'animation : baseline directement visible
    baseline.style.opacity = '1';
    baseline.style.transform = 'none';
    return;
  }

  // État initial pour l'animation
  gsap.set(baseline, {
    opacity: 0,
    y: 8,
  });

  // Baseline qui fade-in après l'animation SVG (3s stroke + 0.6s fill = 3.6s total)
  gsap.to(baseline, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    delay: 3.3, // Apparait juste avant la fin du fill
  });
}
