/**
 * ============================================
 * HERO INK - Signature manuscrite animée
 * ============================================
 *
 * DERNIÈRE REFACTORISATION (Nov 2025) :
 * - Signature SVG calligraphique élégante avec courbes de Bézier fluides
 * - Stroke-width affiné (3.2px) pour un rendu premium et raffiné
 * - Animation goutte avec squash & stretch organique
 * - Interaction encre améliorée (détection X/Y, variation dynamique de scale)
 * - Timings optimisés pour un rendu poétique et non-gadget
 * - Responsive intelligent : animations 30% plus rapides sur mobile
 * - Accessibilité complète : prefers-reduced-motion respecté
 *
 * SÉQUENCE D'ANIMATION :
 *
 * Desktop (durée totale ~4s) :
 * 1. Signature s'écrit via stroke-dasharray (2.2s, power1.inOut)
 * 2. Goutte d'encre apparaît avec stretch vertical (0.4s)
 * 3. Goutte tombe avec étirement accentué (0.3s)
 * 4. Impact subtil avec squash (0.08s)
 * 5. Rigole se remplit horizontalement (0.7s, scaleX: 0 → 0.8)
 * 6. Baseline fade-in + slide-up (0.6s)
 * 7. CTAs apparaissent avec stagger élégant (0.5s + 0.15s stagger)
 * 8. Scroll indicator fade-in (0.45s)
 *
 * Mobile (durée totale ~2.8s) :
 * - Toutes les durées × 0.7 (speedMultiplier)
 * - Signature : ~1.5s
 * - Animation totale accélérée de 30%
 *
 * INTERACTION "ENCRE VIVANTE" (desktop uniquement) :
 * - Détection position X/Y du curseur sur la rigole
 * - Gradient radial qui suit le curseur
 * - Variation dynamique de scaleY basée sur la distance du centre
 * - Clamping intelligent (5-95%) pour effet fluide
 * - Désactivée sur mobile/tactile et si prefers-reduced-motion
 *
 * PROGRESSIVE ENHANCEMENT :
 * - Fonctionne sans JS (fallback <noscript> avec texte statique)
 * - Interaction désactivée si pointer: coarse (tactile)
 * - Animation désactivée si prefers-reduced-motion: reduce
 */

import { gsap } from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const POINTER_FINE_QUERY = '(pointer: fine)';

class HeroInk {
  constructor(root) {
    this.root = root;
    this.signaturePath = root.querySelector('[data-hero-signature-path]');
    this.inkChannel = root.querySelector('.hero__ink-channel');
    this.inkFill = root.querySelector('[data-hero-ink-fill]');
    this.inkDrop = root.querySelector('[data-hero-ink-drop]');
    this.baseline = root.querySelector('[data-hero-baseline]');
    this.ctaButtons = root.querySelectorAll('.hero__cta-button');
    this.scrollIndicator = root.querySelector('[data-hero-scroll]');

    this.prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    this.pointerFine = window.matchMedia(POINTER_FINE_QUERY);

    this.timeline = null;
    this.inkInteractionEnabled = false;

    this.updateInkInteraction = this.updateInkInteraction.bind(this);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this);
    this.handlePointerEnter = this.handlePointerEnter.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    this.setupMediaListeners();
    this.setupScrollIndicator();

    if (this.prefersReducedMotion.matches) {
      this.applyReducedMotionState();
    } else {
      this.setupAnimation();
    }

    this.updateInkInteraction();
  }

  setupMediaListeners() {
    if (typeof this.prefersReducedMotion.addEventListener === 'function') {
      this.prefersReducedMotion.addEventListener('change', this.handlePreferenceChange);
    } else if (typeof this.prefersReducedMotion.addListener === 'function') {
      this.prefersReducedMotion.addListener(this.handlePreferenceChange);
    }

    if (this.pointerFine) {
      if (typeof this.pointerFine.addEventListener === 'function') {
        this.pointerFine.addEventListener('change', this.updateInkInteraction);
      } else if (typeof this.pointerFine.addListener === 'function') {
        this.pointerFine.addListener(this.updateInkInteraction);
      }
    }

    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  handlePreferenceChange(event) {
    if (event.matches) {
      this.applyReducedMotionState();
    } else {
      this.setupAnimation();
    }

    this.updateInkInteraction();
  }

  applyReducedMotionState() {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }

    if (this.signaturePath) {
      const length = this.signaturePath.getTotalLength();
      this.signaturePath.style.strokeDasharray = `${length}`;
      this.signaturePath.style.strokeDashoffset = '0';
    }

    if (this.inkFill) {
      gsap.set(this.inkFill, {
        scaleX: 0.8,
        transformOrigin: 'left center',
      });
    }

    if (this.inkDrop) {
      gsap.set(this.inkDrop, { autoAlpha: 0, yPercent: 120 });
    }

    if (this.baseline) {
      gsap.set(this.baseline, { autoAlpha: 1, y: 0 });
    }

    if (this.ctaButtons.length) {
      gsap.set(this.ctaButtons, { autoAlpha: 1, y: 0 });
    }

    if (this.scrollIndicator) {
      gsap.set(this.scrollIndicator, { autoAlpha: 1, y: 0 });
    }

    this.teardownInkInteraction();
  }

  setupAnimation() {
    if (!this.signaturePath) return;

    if (this.timeline) {
      this.timeline.kill();
    }

    this.teardownInkInteraction();

    const length = this.signaturePath.getTotalLength();

    gsap.set(this.signaturePath, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    if (this.inkFill) {
      gsap.set(this.inkFill, {
        scaleX: 0,
        transformOrigin: 'left center',
      });
    }

    if (this.inkDrop) {
      gsap.set(this.inkDrop, {
        autoAlpha: 0,
        yPercent: -140,
      });
    }

    if (this.baseline) {
      gsap.set(this.baseline, { autoAlpha: 0, y: 12 });
    }

    if (this.ctaButtons.length) {
      gsap.set(this.ctaButtons, { autoAlpha: 0, y: 16 });
    }

    if (this.scrollIndicator) {
      gsap.set(this.scrollIndicator, { autoAlpha: 0, y: 12 });
    }

    // Adaptation des durées selon la taille d'écran
    const isMobile = window.innerWidth < 768;
    const speedMultiplier = isMobile ? 0.7 : 1;

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // 1. Signature s'écrit (2.2s desktop, ~1.5s mobile)
    timeline.to(this.signaturePath, {
      strokeDashoffset: 0,
      duration: 2.2 * speedMultiplier,
      ease: 'power1.inOut',
    });

    // 2. Goutte d'encre apparaît et tombe avec squash & stretch
    if (this.inkDrop) {
      // Apparition + étirement vertical (stretch)
      timeline.to(
        this.inkDrop,
        {
          autoAlpha: 1,
          yPercent: 15,
          scaleY: 1.15,
          scaleX: 0.92,
          duration: 0.4 * speedMultiplier,
          ease: 'power2.in',
        },
        '-=0.25'
      );

      // Chute rapide avec étirement accentué
      timeline.to(
        this.inkDrop,
        {
          yPercent: 120,
          scaleY: 1.3,
          scaleX: 0.85,
          duration: 0.3 * speedMultiplier,
          ease: 'power2.in',
        },
        '>-0.05'
      );

      // Impact subtil (squash) - très rapide
      timeline.to(
        this.inkDrop,
        {
          scaleY: 0.7,
          scaleX: 1.2,
          duration: 0.08,
          ease: 'power1.out',
        },
        '-=0.05'
      );
    }

    // 3. Rigole se remplit (effet fluide organique)
    if (this.inkFill) {
      timeline.to(
        this.inkFill,
        {
          scaleX: 0.8,
          duration: 0.7 * speedMultiplier,
          ease: 'power2.out',
        },
        this.inkDrop ? '-=0.15' : '-=0.25'
      );
    }

    // 4. Goutte disparaît
    if (this.inkDrop) {
      timeline.to(
        this.inkDrop,
        {
          autoAlpha: 0,
          duration: 0.25 * speedMultiplier,
          ease: 'power1.out',
        },
        '-=0.15'
      );
    }

    // 5. Baseline apparaît (plus doux)
    if (this.baseline) {
      timeline.to(
        this.baseline,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6 * speedMultiplier,
          ease: 'power2.out',
        },
        '-=0.1'
      );
    }

    // 6. CTAs apparaissent avec stagger élégant
    if (this.ctaButtons.length) {
      timeline.to(
        this.ctaButtons,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5 * speedMultiplier,
          stagger: 0.15 * speedMultiplier,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    // 7. Scroll indicator (dernier élément)
    if (this.scrollIndicator) {
      timeline.to(
        this.scrollIndicator,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45 * speedMultiplier,
          ease: 'power2.out',
        },
        '-=0.25'
      );
    }

    timeline.call(() => {
      this.updateInkInteraction();
    });

    this.timeline = timeline;
  }

  start() {
    if (this.prefersReducedMotion.matches) {
      return;
    }

    if (!this.timeline) {
      this.setupAnimation();
    }
  }

  setupScrollIndicator() {
    if (!this.scrollIndicator) return;

    this.scrollIndicator.addEventListener('click', (event) => {
      event.preventDefault();
      const targetSelector = this.scrollIndicator.dataset.scrollTarget;
      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      if (window.lenis) {
        window.lenis.scrollTo(target, { offset: -80, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  shouldEnableInkInteraction() {
    if (!this.inkFill || !this.inkChannel) return false;
    if (this.prefersReducedMotion?.matches) return false;
    if (window.innerWidth < 1024) return false;
    if (this.pointerFine && !this.pointerFine.matches) return false;
    return true;
  }

  updateInkInteraction() {
    if (this.shouldEnableInkInteraction()) {
      this.setupInkInteraction();
    } else {
      this.teardownInkInteraction();
    }
  }

  setupInkInteraction() {
    if (this.inkInteractionEnabled || !this.inkChannel) return;

    this.inkChannel.addEventListener('pointerenter', this.handlePointerEnter);
    this.inkChannel.addEventListener('pointermove', this.handlePointerMove);
    this.inkChannel.addEventListener('pointerleave', this.handlePointerLeave);
    this.inkInteractionEnabled = true;
  }

  teardownInkInteraction() {
    if (!this.inkInteractionEnabled || !this.inkChannel) return;

    this.inkChannel.removeEventListener('pointerenter', this.handlePointerEnter);
    this.inkChannel.removeEventListener('pointermove', this.handlePointerMove);
    this.inkChannel.removeEventListener('pointerleave', this.handlePointerLeave);
    this.inkInteractionEnabled = false;

    if (this.inkFill) {
      gsap.to(this.inkFill, {
        duration: 0.6,
        ease: 'power2.out',
        '--ink-ripple-x': '50%',
        '--ink-ripple-y': '50%',
        scaleY: 1,
      });
    }
  }

  handlePointerEnter(event) {
    this.handlePointerMove(event);
  }

  handlePointerMove(event) {
    if (!this.inkInteractionEnabled || !this.inkChannel || !this.inkFill) return;

    const rect = this.inkChannel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Clamping avec une zone de tolérance pour un effet plus fluide
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(25, Math.min(75, y));

    // Animation plus organique avec variation de scaleY basée sur la position
    const scaleYVariation = 1.03 + (Math.abs(50 - clampedX) / 500);

    gsap.to(this.inkFill, {
      duration: 0.6,
      ease: 'power2.out',
      '--ink-ripple-x': `${clampedX}%`,
      '--ink-ripple-y': `${clampedY}%`,
      scaleY: scaleYVariation,
    });
  }

  handlePointerLeave() {
    if (!this.inkFill) return;

    gsap.to(this.inkFill, {
      duration: 0.6,
      ease: 'power2.out',
      '--ink-ripple-x': '50%',
      '--ink-ripple-y': '50%',
      scaleY: 1,
    });
  }

  handleResize() {
    this.updateInkInteraction();
  }
}

export function initHeroInkBlock(context = {}) {
  const { modules = {} } = context;
  const heroElement = document.querySelector('[data-block="hero-ink"]');

  if (!heroElement) {
    return { ...context, modules };
  }

  if (!modules.heroInk) {
    modules.heroInk = new HeroInk(heroElement);
  }

  return { ...context, modules };
}

export default initHeroInkBlock;
