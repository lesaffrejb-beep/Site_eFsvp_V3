// src/scripts/blocks/hero-signature.js
import { gsap } from 'gsap';

/**
 * Animation de la signature manuscrite du hero - Version 3.0 (Audit complet)
 *
 * OBJECTIF :
 * - La signature doit être 100% INVISIBLE au chargement (aucun trait, aucun fragment)
 * - Animation progressive "handwriting" du stroke de gauche à droite
 * - Une seule couche de trait nette (pas de superposition/ghost)
 * - Goutte d'encre qui tombe de la signature vers le sous-titre
 * - Révélation du sous-titre synchronisée avec la goutte
 * - Respect de prefers-reduced-motion
 *
 * AUDIT SVG (2025-11-17) :
 * - Nombre de paths : 23 paths avec classe .hero-signature-path
 * - Tous les paths ont fill="none" dans le markup HTML (✓)
 * - Pas de paths dupliqués détectés (✓)
 * - Pas de paths décoratifs (ombres/outlines) séparés (✓)
 * - SVG inline dans index.html avec data-hero-signature
 *
 * PROBLÈMES CORRIGÉS :
 * - Suppression du drop-shadow CSS qui créait l'effet de double trait
 * - Classe d'init renommée de "initializing" à "is-initializing" pour cohérence
 * - Init synchrone stricte avec requestAnimationFrame pour éviter tout flash
 * - Suppression des valeurs !important dans le CSS
 * - Vérification d'absence d'animations concurrentes (✓ aucune autre animation active)
 *
 * STRUCTURE :
 * - Tous les paths de la signature sont initialement invisibles (strokeDashoffset = length)
 * - Pas de fill, uniquement stroke animé
 * - La goutte apparaît à la fin de l'écriture et tombe vers le sous-titre
 * - Le sous-titre se révèle quand la goutte "touche" la ligne
 */

// Mode debug : mettre à true pour logger l'état des paths
const DEBUG = false;

export function initHeroSignature() {
  // ===================================
  // ÉTAPE 1 : RÉCUPÉRATION DES ÉLÉMENTS
  // ===================================
  const svg = document.querySelector('[data-hero-signature]');
  if (!svg) return;

  const paths = svg.querySelectorAll('.hero-signature-path');
  if (!paths.length) return;

  const inkDrop = document.querySelector('.hero-ink-drop');
  const subtitle = document.querySelector('[data-hero-baseline]');
  const ctaButtons = document.querySelectorAll('.hero-cta > *');

  // ===================================
  // FILET DE SÉCURITÉ : SUPPRESSION DE TOOLTIPS RÉSIDUELS
  // ===================================
  // Supprime tout attribut title qui afficherait un tooltip natif
  const tooltipTexts = [
    'En français s'il vous plaît',
    "En français s'il vous plaît"
  ];

  tooltipTexts.forEach((needle) => {
    document.querySelectorAll('[title]').forEach((el) => {
      const t = el.getAttribute('title') || '';
      if (t.includes(needle)) {
        el.removeAttribute('title');
      }
    });
  });

  // ===================================
  // ÉTAPE 2 : CLASSE D'INITIALISATION
  // ===================================
  // Ajouter immédiatement la classe pour masquer les paths pendant le setup
  svg.classList.add('is-initializing');

  // ===================================
  // ÉTAPE 3 : VÉRIFIER PREFERS-REDUCED-MOTION
  // ===================================
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Mode sans animation : tout visible immédiatement
  if (prefersReducedMotion) {
    paths.forEach((path) => {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      path.style.fill = 'none';
    });

    if (subtitle) {
      gsap.set(subtitle, { opacity: 1, clipPath: 'inset(0 0 0% 0)' });
    }

    if (ctaButtons.length) {
      gsap.set(ctaButtons, { opacity: 1, y: 0 });
    }

    if (inkDrop) {
      gsap.set(inkDrop, { opacity: 0 });
    }

    svg.classList.remove('is-initializing');
    return;
  }

  // ===================================
  // ÉTAPE 4 : INIT STRICTE DES PATHS
  // ===================================
  // Masquer le sous-titre et les CTA au départ
  if (subtitle) {
    gsap.set(subtitle, {
      opacity: 0,
      clipPath: 'inset(0 0 100% 0)' // Masqué du bas
    });
  }

  if (ctaButtons.length) {
    gsap.set(ctaButtons, { opacity: 0, y: 20 });
  }

  // Masquer la goutte au départ
  if (inkDrop) {
    gsap.set(inkDrop, {
      opacity: 0,
      scale: 0.4,
      y: 0
    });
  }

  // Initialiser TOUS les paths de manière SYNCHRONE avec leur longueur réelle
  const pathMeta = [];

  paths.forEach((path) => {
    const length = path.getTotalLength();

    // État initial : complètement masqué
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.fill = 'none';

    pathMeta.push({ path, length });
  });

  // Debug : logger l'état initial
  if (DEBUG) {
    console.group('Hero signature debug - État initial');
    pathMeta.forEach(({ path, length }, i) => {
      const computed = getComputedStyle(path);
      console.log(`Path #${i}`, {
        length,
        dasharray: computed.strokeDasharray,
        dashoffset: computed.strokeDashoffset,
        fill: computed.fill
      });
    });
    console.groupEnd();
  }

  // ===================================
  // ÉTAPE 5 : RETIRER LA CLASSE ET LANCER L'ANIMATION
  // ===================================
  // Utiliser requestAnimationFrame pour garantir que le navigateur a appliqué les styles
  requestAnimationFrame(() => {
    svg.classList.remove('is-initializing');

    // ===================================
    // ÉTAPE 6 : CRÉER LA TIMELINE GSAP
    // ===================================
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      delay: 0.3 // Petit délai au chargement
    });

    // Animer chaque path de la signature
    pathMeta.forEach(({ path, length }, index) => {
      // Durée adaptée à la longueur du trait (entre 0.4s et 2s)
      const duration = gsap.utils.clamp(0.4, 2, length / 250);

      // Animer le tracé avec un chevauchement pour fluidité
      tl.to(
        path,
        {
          strokeDashoffset: 0, // Devient visible progressivement
          duration: duration,
          ease: 'power1.inOut'
        },
        index === 0 ? 0 : '>-0.12' // Premier path commence à 0, autres se chevauchent légèrement
      );
    });

    // Label pour marquer la fin de l'écriture de la signature
    tl.addLabel('signatureComplete');

    // ===================================
    // ÉTAPE 7 : ANIMATION DE LA GOUTTE
    // ===================================
    if (inkDrop && subtitle) {
      // Apparition de la goutte à la fin de l'écriture
      tl.to(
        inkDrop,
        {
          opacity: 1,
          y: 10,
          duration: 0.25,
          ease: 'power2.out'
        },
        'signatureComplete-=0.1'
      );

      // Chute de la goutte avec déformation
      tl.to(
        inkDrop,
        {
          y: 22,
          scaleY: 0.8,
          scaleX: 1.05,
          duration: 0.18,
          ease: 'power1.in'
        },
        '>-0.05'
      );

      // Dissolution de la goutte
      tl.to(
        inkDrop,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.out'
        },
        '-=0.05'
      );
    }

    // ===================================
    // ÉTAPE 8 : RÉVÉLATION DU SOUS-TITRE
    // ===================================
    if (subtitle) {
      // Le sous-titre se révèle quand la goutte "touche" la ligne
      tl.to(
        subtitle,
        {
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)', // Révélation de haut en bas
          duration: 0.8,
          ease: 'power2.out'
        },
        inkDrop ? '>-0.6' : 'signatureComplete+=0.2' // Synchronisé avec l'impact de la goutte
      );
    }

    // ===================================
    // ÉTAPE 9 : APPARITION DES CTA
    // ===================================
    if (ctaButtons.length) {
      tl.to(
        ctaButtons,
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out'
        },
        '>-0.3' // Légèrement avant la fin de la révélation du sous-titre
      );
    }

    // ===================================
    // ÉTAPE 10 : CALLBACK FINAL
    // ===================================
    // Figer l'état final pour garantir qu'il n'y a pas de dérive
    tl.call(() => {
      pathMeta.forEach(({ path }) => {
        path.style.strokeDashoffset = '0';
      });

      // Debug : logger l'état final
      if (DEBUG) {
        console.group('Hero signature debug - État final');
        pathMeta.forEach(({ path, length }, i) => {
          const computed = getComputedStyle(path);
          console.log(`Path #${i}`, {
            length,
            dasharray: computed.strokeDasharray,
            dashoffset: computed.strokeDashoffset,
            fill: computed.fill
          });
        });
        console.groupEnd();
      }
    });
  });
}
