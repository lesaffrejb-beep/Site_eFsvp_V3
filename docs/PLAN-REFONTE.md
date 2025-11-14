# Plan de refonte EfSVP (Phase Mockup → Next.js)

## Stack actuelle
- **Build** : Vite + HTML statique, CSS maison, JS vanilla (modules GSAP/Lenis).
- **Limites** : pas de SSR/ISR, bundler sans routage natif, difficile d'ajouter formulaires sécurisés et SEO avancé (sitemap auto, OG dynamiques), dette CSS importante (fichier `styles.css` monolithique >2 800 lignes).

## Stratégie recommandée
1. **Migration Next.js 14 (App Router + TypeScript)**
   - Créer un squelette `app/` avec layout global, route `/(pages)` pour Home, Services, Études de cas, À propos, Contact.
   - Importer les sections existantes sous forme de composants Server/Client (`Hero.tsx`, `ServicesGrid.tsx`, etc.).
   - Remplacer les assets `<img>` par `next/image` (optimisation responsive, LCP prioritaire sur Hero).
   - Configurer `next/font` pour Newsreader / Plus Jakarta Sans / Cormorant (display=swap + fallback systeme).

2. **Design System token-driven**
   - Centraliser les tokens dans `src/styles/tokens.css` ou `tailwind.config.ts` si adoption Tailwind.
   - Exposer un thème clair + sombre via CSS variables (`:root`, `[data-theme="dark"]`).
   - Extraire chaque composant (CTA, cards, badges) dans un dossier `src/components/ui/` testé avec Storybook ou tests visuels Playwright component.

3. **Accessibilité & SEO**
   - Mettre en place `next-seo` + `metadata` App Router pour titres/descriptions dynamiques.
   - Ajouter skip-link, `aria-*`, focus visible, gestion `prefers-reduced-motion` côté JS (désactiver GSAP lourdes si reduce-motion).
   - Générer `sitemap.xml` via `next-sitemap`, `robots.txt`, JSON-LD par route.

4. **Back-end léger**
   - Route `POST /api/contact` avec validation Zod, rate limit (Upstash Ratelimit ou KV), transport Resend.
   - Honeypot + double opt-in newsletter (optionnel) ; logs sobres (`pino` + Vercel Log Drains).

5. **Qualité & CI**
   - Config ESLint (next/core-web-vitals, a11y, TS strict), Prettier, Husky + lint-staged.
   - Tests : Vitest + Testing Library pour composants, Playwright pour parcours critiques (Home load, Hero CTA, formulaire).
   - Workflow GitHub Actions : lint → type-check → test → build → deploy preview Vercel.

6. **Performance**
   - Découper les animations GSAP pour ne charger que sur sections nécessaires (dynamic import). Considérer Lenis (smooth scroll) uniquement desktop.
   - Préparer analytics `@vercel/analytics` + RUM Web Vitals.

## Découpage releases
- **Sprint 1** : migration scaffolding Next + design tokens modulaires.
- **Sprint 2** : portage Hero/Services/Case Studies + DS tokens, dark mode.
- **Sprint 3** : API contact, tests automatiques, SEO complet.
- **Sprint 4** : audits Lighthouse/axe + fine tuning animations/perf.

## Livrables immédiats (cette PR)
- Nettoyage du Hero (suppression voile, CTA unifié).
- Base documentaire (présent plan + rapport audit) pour lancer migration.
