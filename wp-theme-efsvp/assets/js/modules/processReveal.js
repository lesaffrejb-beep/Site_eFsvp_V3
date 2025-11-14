/**
 * Process Reveal Animation
 * Animations on-scroll pour les étapes du process avec IntersectionObserver
 */

export class ProcessReveal {
  constructor() {
    this.steps = document.querySelectorAll('.process__step');
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.steps.length) return;

    this.init();
  }

  init() {
    // Si l'utilisateur préfère réduire les animations, ne pas animer
    if (this.prefersReducedMotion) {
      this.steps.forEach((step) => {
        step.style.opacity = '1';
        step.style.transform = 'none';
      });
      return;
    }

    // Appliquer les styles initiaux
    this.steps.forEach((step, index) => {
      step.style.opacity = '0';
      step.style.transform = 'translateY(32px)';
      step.style.transition =
        'opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)';
      step.style.transitionDelay = `${index * 120}ms`;
    });

    // Créer l'observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Optionnel: arrêter d'observer après l'animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.2, // Déclencher quand 20% de l'élément est visible
        rootMargin: '0px 0px -50px 0px', // Déclencher un peu avant
      }
    );

    // Observer chaque étape
    this.steps.forEach((step) => {
      observer.observe(step);
    });
  }
}
