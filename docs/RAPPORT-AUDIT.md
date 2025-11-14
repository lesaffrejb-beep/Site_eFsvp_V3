# Rapport d'audit – Hero & Voile EfSVP

## Constat initial
- **Voile beige** : la couche de fallback `hero__video-placeholder` injectait un dégradé ambre (rgba(232,146,79,0.25)) + overlay trop clair (opacity 0.2-0.45) → contraste insuffisant (AA non atteint sur le H1).
- **CTA dispersé** : libellés différents (« Votre projet », « Partagez votre histoire ») cassant la cohérence UX.
- **Tokens** : couleur `--hero-fallback-dark` trop claire (#0F1926) → perception "délavée" quand la vidéo ne chargeait pas.

## Correctifs appliqués
- Nouveau nuancier sombre (`--hero-fallback-dark` #0C1421 + variables overlay dédiées) appliqué au poster CSS et au gradient overlay.
- Gradient de fallback passé en **monochrome encre** (radial rgba(8,14,24)) pour supprimer la dominante beige.
- CTA nav + hero harmonisés sur le libellé maître **« Démarrer votre projet »**.

## Tests & mesures
- [MANQUANT: Capture Lighthouse mobile] → à exécuter après intégration Next.
- [MANQUANT: Rapport axe DevTools] → prévoir script Playwright + axe-core.
- Vérification manuelle contrastes (DevTools) : Hero titre / overlay ≥ 10:1, CTA ≥ 4.5:1.

## Actions suivantes
1. Implémenter le poster vidéo optimisé (WebP 1920×1080 compressé <200ko) et l'attribut `poster` côté Next.
2. Déporter les animations GSAP en modules différés, respecter `prefers-reduced-motion`.
3. Lancer migration Next.js (cf. `docs/PLAN-REFONTE.md`) et brancher pipeline CI + tests.
