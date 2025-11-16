import { gsap } from 'gsap';

console.log('📦 [HERO] Fichier hero-signature.js chargé');

/**
 * Animation du hero avec signature manuscrite
 * Timeline : signature → goutte → rigole → baseline
 */
export function initHeroSignature() {
  console.log('🎬 [HERO] Fonction initHeroSignature() appelée');

  // Attendre que le DOM soit chargé
  if (document.readyState === 'loading') {
    console.log('⏳ [HERO] DOM en chargement, attente...');
    document.addEventListener('DOMContentLoaded', initHeroSignature);
    return;
  }

  console.log('✅ [HERO] DOM prêt, recherche des éléments...');

  // Sélection avec logs
  const signaturePath = document.getElementById('signature-path');
  const inkDrop = document.getElementById('ink-drop');
  const inkFill = document.getElementById('ink-fill');
  const baseline = document.getElementById('baseline');
  const signatureSvg = document.getElementById('signature-svg');

  console.log('🔍 [HERO] Éléments trouvés :', {
    signaturePath: !!signaturePath,
    inkDrop: !!inkDrop,
    inkFill: !!inkFill,
    baseline: !!baseline,
    signatureSvg: !!signatureSvg
  });

  // Guard clause avec logs détaillés
  if (!signaturePath) {
    console.error('❌ [HERO] signature-path non trouvé');
    return;
  }
  if (!inkDrop) {
    console.error('❌ [HERO] ink-drop non trouvé');
    return;
  }
  if (!inkFill) {
    console.error('❌ [HERO] ink-fill non trouvé');
    return;
  }
  if (!baseline) {
    console.error('❌ [HERO] baseline non trouvé');
    return;
  }
  if (!signatureSvg) {
    console.error('❌ [HERO] signature-svg non trouvé');
    return;
  }

  // Check GSAP
  if (typeof gsap === 'undefined') {
    console.error('❌ [HERO] GSAP non disponible');
    return;
  }
  console.log('✅ [HERO] GSAP disponible');

  // Timeline avec log
  console.log('🎨 [HERO] Création de la timeline...');
  const masterTimeline = gsap.timeline({
    defaults: { ease: 'none' },
    onStart: () => console.log('▶️ [HERO] Animation démarrée'),
    onComplete: () => console.log('✅ [HERO] Animation terminée')
  });

  // Animation signature
  console.log('✍️ [HERO] Animation signature...');
  masterTimeline.to(signaturePath, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power1.inOut',
    onUpdate: function() {
      if (this.progress() === 0.5) {
        console.log('⏱️ [HERO] Signature à 50%');
      }
    }
  });

  // Calcul position goutte
  try {
    const pathLength = signaturePath.getTotalLength();
    const endPoint = signaturePath.getPointAtLength(pathLength);
    const svgRect = signatureSvg.getBoundingClientRect();
    const svgViewBox = signatureSvg.viewBox.baseVal;
    const scaleX = svgRect.width / svgViewBox.width;
    const scaleY = svgRect.height / svgViewBox.height;
    const dropX = endPoint.x * scaleX;
    const dropY = endPoint.y * scaleY + svgRect.top - signatureSvg.parentElement.getBoundingClientRect().top;

    console.log('💧 [HERO] Position goutte calculée :', { dropX, dropY });

    gsap.set(inkDrop, {
      left: `${dropX}px`,
      top: `${dropY}px`,
      xPercent: -50,
      yPercent: -50
    });
  } catch (err) {
    console.error('❌ [HERO] Erreur calcul position goutte :', err);
  }

  // Goutte
  masterTimeline
    .to(inkDrop, {
      opacity: 1,
      duration: 0.08,
      onComplete: () => console.log('💧 [HERO] Goutte apparue')
    }, '>')
    .to(inkDrop, {
      y: '+=35px',
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => console.log('💧 [HERO] Goutte tombée')
    }, '>');

  // Rigole
  masterTimeline.to(inkFill, {
    width: '100%',
    duration: 0.65,
    ease: 'power2.out',
    onComplete: () => console.log('🌊 [HERO] Rigole remplie')
  }, '>');

  // Baseline
  masterTimeline.to(baseline, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => console.log('📝 [HERO] Baseline affichée')
  }, '>');

  // Goutte disparaît
  masterTimeline.to(inkDrop, {
    opacity: 0,
    duration: 0.25
  }, '-=0.4');

  console.log('🎯 [HERO] Timeline configurée, lancement imminent');
}
