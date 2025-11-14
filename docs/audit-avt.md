# 🏆 Audit Award 2025 - État Initial

**Site**: https://site-e-fsvp.vercel.app
**Date**: 2025-11-01
**Objectif**: Évaluation selon grille Award 2025 (Awwwards/CSSDA)

---

## 📊 Score Global : **69/100**

Base solide, mais **~20 points manquants** pour le niveau award.

---

## 🎯 Évaluation Détaillée

### 1. Clarté de la Promesse & CTA : **9/10** ✅

**Forces** :
- ✅ Héro impeccable : tagline "Vous avez déjà écrit l'histoire. On ne fera que vous relire."
- ✅ Proposition claire : "Texte, musique, performance live — 15 à 45 min. Délai : 4 semaines." (`index.html:165`)
- ✅ CTA unique et orienté action : "Partagez votre histoire" (`index.html:167-172`)
- ✅ Test 5 secondes : PASSÉ

**À améliorer** :
- ⚠️ **Manque micro-ligne bénéfice** : Ajouter "Prestige · Émotion · Compréhension" sous la ligne 165
  - Impact : +0.5 point → **9.5/10**

**Localisation** : `/home/user/Site_eFsvp/index.html:145-183`

---

### 2. Storytelling & Preuves : **6/8** ⚠️

**Forces** :
- ✅ Cas clients présents (6 projets portfolio)
- ✅ Extraits audio référencés (WaveSurfer intégré)
- ✅ Diversité : institutions, entreprises, spectacles

**Faiblesses critiques** :
- ❌ **Structure Problème → Approche → Effet absente** dans les cas
- ❌ **Pas de métriques concrètes** (ex: "500 invités", "40 représentations")
- ❌ **Extraits audio longs** (3:45 affiché au lieu de 20-30s recommandés)
- ❌ **Cas non étendards** : description = 1 phrase générique

**Cas identifiés** (`index.html:448-547`) :
1. **Département Maine-et-Loire** - Hymne "La force de la douceur" (2024)
2. **SIVAL (Destination Angers)** - Série promotionnelle agricole (2025) ⭐
3. **Atelier Lacour** - 25 ans & passation (2024) ⭐
4. **Réseau Cocagne** - Histoires de résilience (2024)
5. **PNR Loire-Anjou-Touraine** - État de nature (2023) ⭐ 40+ représentations
6. **Ville de Clisson** - Déambulation historique XVe s. (2023)

**Action prioritaire** :
- 🔥 Créer 3 **CaseCard étendards** avec :
  - Structure : Problème (contexte) / Approche (notre solution) / Effet (impact mesurable)
  - Métrique visible : nombre spectateurs, NPS, reprises médias, etc.
  - Extrait audio 20-30s contextualisé
  - Visuels/gradients cohérents

**Impact potentiel** : +1.5 point → **7.5/8**

---

### 3. Architecture de l'Info & Parcours : **7/8** ✅

**Forces** :
- ✅ Navigation ≤7 items : Créations, Portfolio, Process, FAQ (4 items + CTA)
- ✅ Contact accessible en ≤2 clics : nav CTA + ancre "#contact"
- ✅ Chemin clair vers preuves (portfolio, audio)
- ✅ Skip-link présent : "Aller au contenu principal" (`index.html:141`)

**Points mineurs** :
- ⚠️ Ordre de tabulation à vérifier (tests clavier manuels requis)

**Localisation** : `/home/user/Site_eFsvp/index.html:106-138`

---

### 4. Identité Visuelle & Typo : **6/8** ⚠️

**Forces** :
- ✅ Système OKLCH moderne (2025 standard)
- ✅ Palette Brique & Encre cohérente (`design-system.css:6-33`)
- ✅ Typographie :
  - `Newsreader` (serif) — Titres
  - `Plus Jakarta Sans` (sans) — Corps
  - `Cormorant` (italic) — Accents rares ✅
- ✅ Fluid typography avec `clamp()` (`design-system.css:40-49`)
- ✅ Contrastes AA (texte `#EAECEF` sur fond `#0F151D`)

**À améliorer** :
- ⚠️ **Hiérarchie titres** : vérifier h1-h6 sémantique stricte
- ⚠️ **Usage italique** : limiter Cormorant aux citations/accents premium uniquement
- ⚠️ **Tokens design** : documenter tailles/espacements dans `/docs/tokens.md`

**Impact potentiel** : +1 point → **7/8**

---

### 5. Iconographie & Média : **4/6** ⚠️

**Forces** :
- ✅ Pas de stock photos génériques
- ✅ Gradients premium custom par projet
- ✅ Lecteur audio WaveSurfer intégré

**Faiblesses** :
- ❌ **Durée audio affichée** : 3:45 (trop long pour conversion) au lieu de 20-30s
- ❌ **Spot 30s manquant** en hero pour impact immédiat
- ❌ **Vignettes cas non standardisées** (ratios/grille)
- ❌ **Placeholders** :
  - `/public/assets/audio/` vide
  - `/public/assets/videos/` vide (hero vidéo = placeholder gradient)
  - `/public/assets/images/` vide

**Action prioritaire** :
- 🔥 Créer spot audio 30s "Histoires" pour home
- 🔥 Encoder 3 extraits 20-30s en MP3 optimisé (<500Ko)
- 🔥 Standardiser grille visuelles portfolio (ratio 16:9 ou 4:3 constant)

**Impact potentiel** : +1.5 point → **5.5/6**

---

### 6. Micro-Interactions & Motion : **4/6** ⚠️

**Forces** :
- ✅ GSAP + ScrollTrigger intégrés (`main.js:42-48`)
- ✅ Lenis smooth scroll (`smoothScroll.js`)
- ✅ Animations sobres (preloader, hero typewriter)
- ✅ Durées cohérentes (`design-system.css:118-121`) :
  - `--duration-fast: 0.15s`
  - `--duration-base: 0.25s` ✅ (120-240ms recommandé)
  - `--duration-slow: 0.4s`

**Faiblesses** :
- ❌ **États hover/focus peu "vivants"** : transitions génériques
- ❌ **Scroll reveals minimalistes** : peu de sections animées au scroll
- ❌ **Pas de micro-feedback** sur CTA/cards (scale, glow, translate)

**Actions** :
- 🎨 Ajouter :
  - Hover CTA : légère scale (1.02) + glow subtil
  - Focus visible : outline accent + shadow (`design-system.css:257-261` déjà OK)
  - Cards portfolio : hover lift (translateY -4px, shadow upgrade)
  - Scroll reveal sections clés : fadeInUp staggeré

**Impact potentiel** : +1.5 point → **5.5/6**

---

### 7. Accessibilité (WCAG 2.2 AA) : **7/10** ⚠️

**Forces** :
- ✅ **Skip-link** présent (`index.html:141`)
- ✅ **ARIA labels** sur nav, buttons (`index.html:106`, `215-220`)
- ✅ **Landmarks sémantiques** : `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ **Focus visible** CSS global (`design-system.css:257-261`)
- ✅ **Validation formulaire** avec messages erreur (`formValidator.js`)
- ✅ **Contrastes** :
  - Texte principal `#EAECEF` sur `#0F151D` = **14.2:1** (AAA ✅)
  - Accent `#E8924F` sur `#0F151D` = **5.8:1** (AA ✅)

**Faiblesses** :
- ⚠️ **Ordre de tabulation** : non testé manuellement
- ⚠️ **Alt textes** : absents sur images portfolio (gradients placeholders)
- ⚠️ **Labels formulaire** : vérifier associations explicites
- ⚠️ **Préférence mouvement** : `prefers-reduced-motion` présent mais à tester (`design-system.css:172-184`)
- ❌ **Audit axe-core** : non exécuté (outil chromedriver bloqué)

**Actions** :
- 🔥 Tester navigation clavier complète (Tab, Shift+Tab, Enter, Espace)
- 🔥 Ajouter `alt` éditoriaux sur toutes images (actuellement placeholders)
- 🔥 Vérifier `<label for="...">` explicites
- 🔥 Tester `prefers-reduced-motion` (désactiver animations GSAP)

**Impact potentiel** : +2 points → **9/10**

---

### 8. Performance & Core Web Vitals : **7/10** ⚠️

**État actuel** :
- ✅ **Vite 7** (build ultra-rapide, esbuild minification)
- ✅ **Lazy loading images** implémenté (`lazyLoad.js`)
- ✅ **Critical CSS inline** (preloader, `index.html:38-91`)
- ✅ **Font-display: swap** (`index.html:26`)
- ✅ **Grain texture** : SVG data URI optimisé (`design-system.css:152`)
- ✅ **Vercel hosting** (présomption CDN + edge)

**Faiblesses** :
- ❌ **Polices non preloaded** (Google Fonts CDN = 2 requêtes bloquantes)
- ❌ **Images format legacy** : pas de AVIF/WebP mentionné
- ❌ **Pas de poster vidéo/audio** (hero vidéo = placeholder)
- ❌ **Bundle size** : non mesuré (dépendances : GSAP, Lenis, WaveSurfer, Swiper, Splitting)
- ❌ **Lighthouse non exécutable** (environnement sans Chrome)

**Objectifs CWV** :
| Métrique | Cible Award | Actuel | Écart |
|----------|-------------|--------|-------|
| **LCP** | ≤1.8s | ??? | À mesurer sur Vercel |
| **INP** | ≤200ms | ??? | Présomption OK (Lenis RAF) |
| **CLS** | ≤0.05 | ??? | Risque si lazy images |
| **Poids page** | ≤1.0 Mo | ??? | GSAP+Lenis+Swiper ≈150Ko |

**Actions prioritaires** :
- 🔥 **Preload polices critiques** :
  ```html
  <link rel="preload" href="..." as="font" type="font/woff2" crossorigin>
  ```
- 🔥 **Images** : générer AVIF + WebP avec `<picture>`
- 🔥 **Code-split** : charger WaveSurfer/Swiper uniquement si section visible
- 🔥 **Budget perf** : ajouter `vite-plugin-bundle-analyzer`
- 🔥 **Mesurer sur prod** : PageSpeed Insights sur site-e-fsvp.vercel.app

**Impact potentiel** : +2 points → **9/10**

---

### 9. SEO & Données Structurées : **5/8** ⚠️

**Forces** :
- ✅ **Meta tags basiques** :
  - Title : "En français s'il vous plaît | Création narrative & musicale sur-mesure" (`index.html:7`)
  - Description : "Studio de création narrative..." (`index.html:8`)
  - Keywords (`index.html:9`)
- ✅ **Open Graph** (`index.html:12-15`)
- ✅ **Twitter Card** (`index.html:18`)
- ✅ **Langue** : `<html lang="fr">` (`index.html:1`)
- ✅ **Hiérarchie Hn** : présente (à vérifier stricte h1→h2→h3)

**Faiblesses critiques** :
- ❌ **JSON-LD absent** : pas de schema.org
- ❌ **Sitemap** : absent
- ❌ **Robots.txt** : absent
- ❌ **Canonical** : absent
- ❌ **Image OG** : URL non définie (`og:image` manquant)

**Actions prioritaires** :
- 🔥 **JSON-LD** :
  - `Organization` : nom, logo, adresse, contact
  - `Website` : url, searchAction
  - `BreadcrumbList` : nav structure
  - `Event` : performances (SIVAL, PNR, etc.)
  - `CreativeWork` : œuvres audio/spectacles
- 🔥 `sitemap.xml` généré (Vite plugin ou manuel)
- 🔥 `robots.txt` : autoriser crawl + sitemap
- 🔥 `<link rel="canonical">` sur toutes pages
- 🔥 OG Image : générer visuel 1200×630 (hero ou logo)

**Impact potentiel** : +2.5 points → **7.5/8**

---

### 10. Conversion & Preuve Sociale : **4/6** ⚠️

**Forces** :
- ✅ **CTA principal clair** : "Partagez votre histoire"
- ✅ **Formulaire présent** : validation temps réel (`formValidator.js`)
- ✅ **Témoignages** : 3 citations 5★ (`index.html:689-785`)

**Faiblesses critiques** :
- 🔥 **BUG MAJEUR - Compteurs "0"** (`index.html:801`) :
  ```html
  <div class="stat-card__number" data-count="60">0</div>
  ```
  - Affiche **"0"** au lieu de **"60"** → **contradiction avec "60+ représentations"** ligne 429
  - **Impact crédibilité : CRITIQUE**

- ⚠️ **Témoignages vagues** :
  - "Marie Dupont - Directrice Communication, **Institution culturelle**" (quelle institution ?)
  - "Pierre Martin - Directeur, **Entreprise familiale**" (quelle entreprise ?)
  - → Besoin noms réels ou contexte projet

- ⚠️ **Formulaire long** : 8 champs (suggérer mode compact : Nom, Email, Org, Message + toggle "Brief avancé")

**Actions P1 (URGENT)** :
- 🔥 **Corriger compteurs** :
  - Option A : Brancher sur data-count (script animation requis)
  - Option B : Masquer section tant que non dynamique
  - **Localisation** : `index.html:797-830`

- 🔥 **Préciser témoignages** :
  - Ajouter contexte projet : "Marie Dupont, Directrice Communication - Département M&L (Hymne 2024)"
  - Ou lien preuve (communiqué, article)

**Impact potentiel** : +1.5 point → **5.5/6**

---

### 11. Ton & Éditorial : **3/4** ✅

**Forces** :
- ✅ Pro, précis, chaleureux
- ✅ Pas de jargon corporatiste
- ✅ Tagline mémorable : "Vous avez déjà écrit l'histoire. On ne fera que vous relire."
- ✅ Micro-copy claire (CTA, sections)

**À maintenir** : Continuer à bannir tout verbiage marketing générique.

---

### 12. Qualité du Code & Dette : **7/10** ⚠️

**Forces** :
- ✅ **Architecture modulaire** : ES6 classes (`main.js`, `/src/scripts/modules/`)
- ✅ **Design system** : tokens CSS variables (`design-system.css`)
- ✅ **Error handler** global (`errorHandler.js`)
- ✅ **Vite 7** (build moderne)
- ✅ **HTML sémantique** : `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

**Faiblesses** :
- ❌ **ESLint/Prettier** : configurés mais **non exécutés** (à lancer)
- ❌ **Tests** : absents (e2e, accessibilité, unitaires)
- ❌ **Bundle analyzer** : absent (taille non mesurée)
- ❌ **Documentation tokens** : absent (`/docs/tokens.md` requis)
- ⚠️ **Dépendance dépréciée** : `@studio-freight/lenis` → migrer vers `lenis`

**Actions** :
- 🔥 Lancer `npm run lint:fix && npm run format`
- 🔥 Créer `/docs/tokens.md` (couleurs, typo, spacing)
- 🔥 Ajouter tests e2e Playwright/Cypress :
  - Nav → Portfolio → Contact
  - Navigation clavier
  - Soumission formulaire
- 🔥 Bundle analyzer : `vite-plugin-visualizer`
- 🔥 Migrer vers `lenis` (retirer `@studio-freight/lenis`)

**Impact potentiel** : +2 points → **9/10**

---

## 🔥 Plan d'Action Priorisé

### **P1 - Crédit & Confiance (URGENT)**

| Action | Impact | Difficulté | Fichier |
|--------|--------|-----------|---------|
| ✅ **Corriger compteurs "0"** | 🔥🔥🔥 Critique | Facile | `index.html:797-830` |
| ✅ **Refondre 3 cas étendards** | 🔥🔥🔥 Très fort | Moyen | Portfolio section |
| ✅ **Préciser témoignages** | 🔥🔥 Fort | Facile | `index.html:689-785` |
| ✅ **Ajouter micro-ligne bénéfice** | 🔥 Moyen | Facile | `index.html:165` |

### **P2 - Accessibilité & UX**

| Action | Impact | Difficulté |
|--------|--------|-----------|
| Tester navigation clavier | 🔥🔥 Fort | Facile |
| Alt éditoriaux images | 🔥🔥 Fort | Facile |
| Labels formulaire explicites | 🔥 Moyen | Facile |
| Mode formulaire compact | 🔥 Moyen | Moyen |

### **P3 - Performance**

| Action | Impact | Difficulté |
|--------|--------|-----------|
| Preload polices critiques | 🔥🔥 Fort | Facile |
| Images AVIF/WebP | 🔥🔥 Fort | Moyen |
| Code-split WaveSurfer/Swiper | 🔥 Moyen | Moyen |
| Mesurer Lighthouse prod | 🔥🔥 Fort | Facile |

### **P4 - SEO & Données Structurées**

| Action | Impact | Difficulté |
|--------|--------|-----------|
| JSON-LD (Org, Event, CreativeWork) | 🔥🔥🔥 Très fort | Moyen |
| Sitemap + Robots | 🔥🔥 Fort | Facile |
| OG Image | 🔥 Moyen | Moyen |
| Canonical | 🔥 Moyen | Facile |

### **P5 - DA, Motion & Substance**

| Action | Impact | Difficulté |
|--------|--------|-----------|
| Spot 30s home | 🔥🔥 Fort | Difficile |
| Standardiser vignettes | 🔥🔥 Fort | Moyen |
| Micro-interactions hover/focus | 🔥 Moyen | Moyen |
| Scroll reveals sections | 🔥 Moyen | Moyen |

---

## 📈 Score Potentiel Post-Amélioration

| Critère | Avant | Après | Gain |
|---------|-------|-------|------|
| Clarté & CTA | 9/10 | 9.5/10 | +0.5 |
| Storytelling | 6/8 | 7.5/8 | +1.5 |
| Architecture | 7/8 | 7.5/8 | +0.5 |
| Identité Visuelle | 6/8 | 7/8 | +1 |
| Icono & Média | 4/6 | 5.5/6 | +1.5 |
| Micro-interactions | 4/6 | 5.5/6 | +1.5 |
| Accessibilité | 7/10 | 9/10 | +2 |
| Performance | 7/10 | 9/10 | +2 |
| SEO & Schémas | 5/8 | 7.5/8 | +2.5 |
| Conversion | 4/6 | 5.5/6 | +1.5 |
| Ton & Éditorial | 3/4 | 3.5/4 | +0.5 |
| Qualité Code | 7/10 | 9/10 | +2 |
| **TOTAL** | **69/100** | **86/100** | **+17** 🚀 |

---

## 🎯 Objectif Final

**Score cible Award** : ≥**85/100**
**Gap actuel** : **16 points**
**Gain plan ci-dessus** : **+17 points**
**✅ OBJECTIF ATTEIGNABLE**

---

## 📝 Notes Techniques

### Fichiers Clés

```
/home/user/Site_eFsvp/
├── index.html                          # HTML monolithique (1200+ lignes)
├── src/
│   ├── styles/
│   │   ├── design-system.css          # Tokens (364 lignes)
│   │   └── styles.css                 # Components (~3000+ lignes)
│   └── scripts/
│       ├── main.js                    # Orchestrateur
│       └── modules/                   # 9 modules ES6
├── package.json                       # Scripts audit ajoutés
├── .eslintrc.cjs                      # Config ESLint ✅
├── .prettierrc                        # Config Prettier ✅
└── docs/
    └── audit-avt.md                   # Ce fichier
```

### Dépendances

**Production** :
- `@studio-freight/lenis@1.0.42` ⚠️ Déprécié → migrer vers `lenis`
- `gsap@3.13.0` ✅
- `lenis@1.3.13` ✅ (doublon à nettoyer)
- `splitting@1.1.0` ✅
- `swiper@12.0.3` ✅
- `wavesurfer.js@7.11.1` ✅

**Dev** :
- `vite@7.1.12` ✅
- `eslint@9.39.0` ✅ (configuré)
- `prettier@3.6.2` ✅ (configuré)
- `eslint-config-prettier@10.1.8` ✅

---

## ⚡ Prochaines Étapes Immédiates

1. ✅ **Exécuter linting** : `npm run lint:fix && npm run format`
2. 🔥 **Corriger compteurs** (P1 critique)
3. 🔥 **Créer 3 CaseCard étendards** (SIVAL, Atelier Lacour, PNR)
4. 🔥 **Ajouter micro-ligne bénéfice** hero
5. 🔥 **JSON-LD** (Organization, Event, CreativeWork)
6. 🔥 **Preload polices** + images next-gen

---

**Rapport généré le** : 2025-11-01
**Par** : Claude Code - Award 2025 Audit Agent
