// src/scripts/blocks/hero-signature.js
import { gsap } from 'gsap';

/**
 * =========================================================================
 * Hero Signature Animation - AWWWARDS 2025 GRADE 🏆
 * =========================================================================
 *
 * OBJECTIF : Animation narrative premium qui raconte une histoire
 * Signature manuscrite → Goutte d'encre → Remplissage liquide du CTA
 *
 * CARACTÉRISTIQUES PREMIUM :
 * - Squash & stretch physique naturel sur la goutte
 * - Effet gooey/liquide prononcé
 * - Vague liquide organique pendant le remplissage du CTA
 * - Timings et easings perfectionnés
 * - Cohérence physique (gravité, inertie, viscosité)
 * - Accessibilité stricte (prefers-reduced-motion)
 *
 * INSPIRATION : Apple.com, Awwwards SOTD, Studio premium européen
 */

// Mode debug : mettre à true pour logger les étapes
const DEBUG = false;

/**
 * Initialise l'animation complète du hero
 */
export function initHeroSignature() {
  // ===================================
  // ÉTAPE 1 : RÉCUPÉRATION DES ÉLÉMENTS
  // ===================================
  const svg = document.querySelector('[data-hero-signature]');
  if (!svg) {
    if (DEBUG) console.warn('Hero signature SVG not found');
    return;
  }

  const paths = svg.querySelectorAll('.hero-signature-path');
  if (!paths.length) {
    if (DEBUG) console.warn('Hero signature paths not found');
    return;
  }

  const inkDrop = document.querySelector('[data-hero-ink-drop]');
  const cta = document.querySelector('[data-hero-cta]');
  const ctaInk = cta ? cta.querySelector('.hero-cta__ink-fill') : null;
  const ctaLabel = cta ? cta.querySelector('.hero-cta__label') : null;
  const subtitle = document.querySelector('[data-hero-baseline]');

  // ===================================
  // ÉTAPE 2 : CLASSE D'INITIALISATION
  // ===================================
  // Masquer immédiatement pendant le setup pour éviter le flash
  svg.classList.add('is-initializing');

  // ===================================
  // ÉTAPE 3 : VÉRIFIER PREFERS-REDUCED-MOTION
  // ===================================
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Mode sans animation : état final immédiat
  if (prefersReducedMotion) {
    applyFinalState({ paths, subtitle, inkDrop, cta, ctaInk, svg });
    return;
  }

  // ===================================
  // ÉTAPE 4 : INITIALISATION DES ÉTATS
  // ===================================
  // Sous-titre visible dès le départ (pas d'animation)
  if (subtitle) {
    gsap.set(subtitle, { opacity: 1 });
  }

  // Masquer le CTA au départ
  if (cta) {
    gsap.set(cta, { opacity: 0, y: 20 });
  }

  // Masquer la goutte au départ
  if (inkDrop) {
    gsap.set(inkDrop, {
      opacity: 0,
      scale: 0,
      y: 0
    });
  }

  // Masquer le remplissage d'encre du CTA
  if (ctaInk) {
    gsap.set(ctaInk, { scaleY: 0 });
  }

  // Initialiser tous les paths avec strokeDasharray
  const pathMeta = [];
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.fill = 'none';
    pathMeta.push({ path, length });
  });

  if (DEBUG) {
    console.log('✅ Hero signature initialized', {
      pathCount: pathMeta.length,
      hasInkDrop: !!inkDrop,
      hasCTA: !!cta
    });
  }

  // ===================================
  // ÉTAPE 5 : CRÉER LA TIMELINE PREMIUM
  // ===================================
  requestAnimationFrame(() => {
    svg.classList.remove('is-initializing');
    createPremiumTimeline({
      pathMeta,
      inkDrop,
      cta,
      ctaInk,
      ctaLabel,
      subtitle
    });
  });
}

/**
 * Crée la timeline GSAP premium avec animations narratives
 */
function createPremiumTimeline({ pathMeta, inkDrop, cta, ctaInk, ctaLabel, subtitle }) {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    delay: 0.4 // Petit délai élégant au chargement
  });

  // ===================================
  // SÉQUENCE 1 : SIGNATURE S'ÉCRIT
  // ===================================
  // Animation handwriting progressive avec chevauchement naturel
  pathMeta.forEach(({ path, length }, index) => {
    // Durée adaptée à la longueur du trait (entre 0.5s et 2.2s)
    const duration = gsap.utils.clamp(0.5, 2.2, length / 230);

    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: duration,
        ease: 'power1.inOut' // Easing naturel pour l'écriture
      },
      index === 0 ? 0 : '>-0.15' // Chevauchement pour fluidité
    );
  });

  // Label pour marquer la fin de l'écriture
  tl.addLabel('signatureComplete');

  // ===================================
  // SÉQUENCE 2 : GOUTTE D'ENCRE APPARAÎT
  // ===================================
  if (inkDrop && cta && ctaInk) {
    // Apparition de la goutte avec effet "pop" élastique
    tl.fromTo(
      inkDrop,
      {
        opacity: 0,
        scale: 0,
        y: 0
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'back.out(2.5)', // Elastic pop
      },
      'signatureComplete+=0.25'
    );

    tl.addLabel('dropReady');

    // ===================================
    // SÉQUENCE 3 : GOUTTE TOMBE (SQUASH & STRETCH)
    // ===================================
    // Phase 1 : Étirement pendant la chute (gravity)
    tl.to(
      inkDrop,
      {
        y: '120%',
        scaleY: 1.6, // Étirement vertical
        scaleX: 0.75, // Compression horizontale
        duration: 0.75,
        ease: 'power2.in', // Accélération naturelle (gravité)
        // Rotation subtile pour effet naturel
        rotation: 3
      },
      'dropReady+=0.15'
    );

    tl.addLabel('dropFalling', '>-0.4');

    // Le CTA apparaît pendant que la goutte tombe
    tl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      },
      'dropFalling'
    );

    // ===================================
    // SÉQUENCE 4 : IMPACT + REMPLISSAGE LIQUIDE
    // ===================================
    tl.addLabel('impact');

    // Phase 2 : Squash à l'impact (physique)
    tl.to(
      inkDrop,
      {
        scaleY: 0.6, // Écrasement vertical
        scaleX: 1.4, // Expansion horizontale
        rotation: 0,
        duration: 0.12,
        ease: 'power3.out'
      },
      'impact'
    );

    // Activer la classe pour l'effet de vague liquide
    tl.call(() => {
      cta.classList.add('is-filling');
    }, null, 'impact');

    // Fade out de la goutte (elle "fusionne" avec le CTA)
    tl.to(
      inkDrop,
      {
        opacity: 0,
        scale: 1.8,
        duration: 0.25,
        ease: 'power2.out'
      },
      'impact+=0.08'
    );

    // Remplissage liquide du CTA de bas en haut
    tl.to(
      ctaInk,
      {
        scaleY: 1,
        duration: 1.1,
        ease: 'power3.out', // Easing organique
      },
      'impact+=0.1'
    );

    tl.addLabel('fillComplete', '>-0.3');

    // ===================================
    // SÉQUENCE 5 : FINALISATION PREMIUM
    // ===================================
    // Retirer la classe is-filling et ajouter is-filled
    tl.call(() => {
      cta.classList.remove('is-filling');
      cta.classList.add('is-filled');
    }, null, 'fillComplete');

    // Micro-animation du label CTA (pop subtil)
    if (ctaLabel) {
      tl.fromTo(
        ctaLabel,
        {
          scale: 0.98,
          opacity: 0.8
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.5)'
        },
        'fillComplete-=0.2'
      );
    }

    // ===================================
    // SÉQUENCE 6 : CLEANUP PERFORMANCE
    // ===================================
    // Retirer will-change pour optimiser les performances
    tl.call(() => {
      pathMeta.forEach(({ path }) => {
        path.style.willChange = 'auto';
      });

      if (inkDrop) inkDrop.style.willChange = 'auto';
      if (ctaInk) ctaInk.style.willChange = 'auto';

      if (DEBUG) {
        console.log('✅ Hero animation complete - Performance cleanup done');
      }
    });
  }

  return tl;
}

/**
 * Applique l'état final sans animation (prefers-reduced-motion)
 */
function applyFinalState({ paths, subtitle, inkDrop, cta, ctaInk, svg }) {
  // Signature visible immédiatement
  paths.forEach((path) => {
    path.style.strokeDasharray = 'none';
    path.style.strokeDashoffset = '0';
    path.style.fill = 'none';
  });

  // Sous-titre visible
  if (subtitle) {
    gsap.set(subtitle, { opacity: 1 });
  }

  // Goutte cachée (pas d'animation)
  if (inkDrop) {
    gsap.set(inkDrop, { opacity: 0 });
  }

  // CTA rempli immédiatement
  if (cta && ctaInk) {
    gsap.set(ctaInk, { scaleY: 1 });
    cta.classList.add('is-filled');
    gsap.set(cta, { opacity: 1, y: 0 });
  }

  // Retirer la classe d'initialisation
  svg.classList.remove('is-initializing');

  if (DEBUG) {
    console.log('✅ Hero signature - Final state applied (reduced motion)');
  }
}
