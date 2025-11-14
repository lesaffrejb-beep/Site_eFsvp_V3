# README — Kit de Migration Webflow EfSVP

**Ce que je fais dans Webflow, dans l'ordre**

---

## 🎯 Objectif

Migrer **enfrancaissvp.fr** vers Webflow de manière propre, rapide, et sans refaire deux fois.

Ce dossier `/deliverables` contient TOUT ce dont tu as besoin :
- Design system (tokens + styles)
- Contenu structuré (JSON + CSV)
- Assets optimisés
- Guides complets (build + DNS + QA)

**Durée estimée totale :** 12-16 heures (setup + construction + tests)

---

## 📦 Contenu du Kit

```
deliverables/
├── design-tokens.json           # Palette, typo, espacements, ombres (source de vérité)
├── webflow-styles.md            # Classes utilitaires à créer dans Webflow
├── webflow-build-checklist.md  # Checklist détaillée étape par étape
├── dns-webflow.md               # Guide DNS OVH → Webflow (sans casser les emails)
├── check-qa.md                  # Checklist QA finale (typos, responsive, perf)
├── assets-map.json              # Mapping des assets (images à uploader)
├── content/
│   ├── home.json                # Tous les textes de la home
│   ├── projects.json            # Projets (portfolio)
│   ├── faq.json                 # Questions/Réponses
│   ├── stats.json               # Chiffres clés
│   └── copy-deck.md             # Textes propres pour copier-coller rapide
├── cms-import/
│   ├── projects.csv             # Import CSV Webflow (Collection Projects)
│   ├── faq.csv                  # Import CSV Webflow (Collection FAQ)
│   └── stats.csv                # Import CSV Webflow (Collection Stats)
├── assets/
│   ├── efsvp-logo.svg           # Logo principal
│   └── favicon.svg              # Favicon
└── og-pack/
    └── (à venir)                # Visuels OpenGraph 1200x630, webmanifest
```

---

## 🚀 Procédure de Migration (1 Page)

### ÉTAPE 1 : Créer le Projet Webflow (30min)

1. **Créer un nouveau projet Webflow**
   - Nom : `En français s'il vous plaît`
   - Plan : **CMS Plan** (minimum)
   - Template : **Blank Site**

2. **Ajouter les Google Fonts**
   - Project Settings > Fonts
   - Ajouter : **Playfair Display** (400, 500, 600, 700, 800, 900)
   - Ajouter : **Inter** (400, 500, 600, 700, 800)
   - Ajouter : **Cormorant** (italic 600)

3. **Créer la palette de couleurs (Swatches)**
   - Ouvrir `design-tokens.json`
   - Créer **tous les swatches** dans Webflow (Primary, Ink, Parchment, etc.)
   - 📖 Liste complète dans `webflow-styles.md` > Palette

4. **Configurer les styles globaux (Body, H1-H4, Links)**
   - Style Manager > Typography
   - Body : Inter, 17px, color Ink, background Parchment
   - H1 : Playfair Display, 60px (responsive), weight 700
   - H2, H3, H4 : Selon `webflow-styles.md`
   - Links : color Ink, hover Primary

5. **Créer les classes utilitaires**
   - `.container`, `.section`, `.btn`, `.card`, `.badge`, `.chip`, `.stack-16`, etc.
   - 📖 Liste complète dans `webflow-styles.md` > Classes Utilitaires
   - **Important :** Créer toutes les classes AVANT de commencer les sections

6. **Ajouter la texture grain (Custom Code)**
   - Project Settings > Custom Code > Head Code
   - Copier le code SVG grain depuis `webflow-styles.md` > Texture

---

### ÉTAPE 2 : Créer les Collections CMS (30min)

**Collection 1 : Projects**
- CMS > New Collection : `Projects`
- Champs :
  - Title (Text)
  - Slug (auto)
  - Client (Plain Text)
  - Year (Number)
  - Badge (Plain Text)
  - Summary (Rich Text)
  - Tags (Plain Text)
  - Featured (Switch)
  - Thumbnail (Image)
  - Images (Multi-Image)
- Collection Template Page : **Activer** (URL : `/projets/[slug]`)

**Collection 2 : FAQ**
- CMS > New Collection : `FAQ`
- Champs :
  - Question (Text)
  - Answer (Rich Text)
  - Order (Number)
- Collection Template Page : **Désactiver**

**Collection 3 : Stats**
- CMS > New Collection : `Stats`
- Champs :
  - Label (Text)
  - Value (Plain Text)
  - Order (Number)
- Collection Template Page : **Désactiver**

---

### ÉTAPE 3 : Importer les Données (15min)

1. **Importer Projects**
   - Collection Projects > Import
   - Uploader `/deliverables/cms-import/projects.csv`
   - Mapper les colonnes
   - Valider (6 projets importés)

2. **Importer FAQ**
   - Collection FAQ > Import
   - Uploader `/deliverables/cms-import/faq.csv`
   - Valider (8 questions importées)

3. **Importer Stats**
   - Collection Stats > Import
   - Uploader `/deliverables/cms-import/stats.csv`
   - Valider (4 stats importées)

---

### ÉTAPE 4 : Uploader les Assets (15min)

1. **Logos & Favicon**
   - Assets Manager > Upload : `efsvp-logo.svg`, `favicon.svg`
   - Project Settings > SEO > Favicon : Définir `favicon.svg`

2. **Images de projets** (si disponibles)
   - Uploader toutes les images WebP (max 1600px, qualité 85%)
   - Naming : kebab-case (ex: `etat-de-nature-hero.webp`)
   - 📖 Mapping dans `assets-map.json`

3. **Lier les images aux projets CMS**
   - Éditer chaque projet dans la Collection
   - Ajouter Thumbnail et Images
   - Publier

---

### ÉTAPE 5 : Construire les Sections (4-5h)

**Ordre de construction (Top → Bottom) :**

1. **Navigation (Navbar)**
   - Sticky header, logo EfSVP, menu, CTA
   - Background BG Dark, height 76px
   - 📖 Textes : `copy-deck.md` > Nav

2. **Hero**
   - Full-height, vidéo background (ou placeholder)
   - Titre 2 lignes, subtitle, CTA hero, 3 métriques
   - 📖 Textes : `copy-deck.md` > Hero

3. **Section Audio (Bento Grid)**
   - H2, subtitle, bento grid asymétrique
   - Audio players (placeholders), info card, quote, stats
   - 📖 Textes : `copy-deck.md` > Section Audio

4. **Flagship Cases (3 Créations)**
   - H2, 3 cards (Problème/Approche/Effet)
   - Featured : "État de nature"
   - 📖 Textes : `copy-deck.md` > Trois Créations

5. **Services (4 Formules)**
   - H2, 4 cards en grille
   - Featured : "Performance Live"
   - 📖 Textes : `copy-deck.md` > Quatre Formules

6. **Portfolio (Collection List)**
   - H2, filtres (optionnels)
   - Collection List : Projects, grid 3 colonnes
   - 📖 Config : `webflow-build-checklist.md` > Section Portfolio

7. **Process (4 Étapes)**
   - H2, 4 blocs numérotés (01-04)
   - 📖 Textes : `copy-deck.md` > Process

8. **Témoignages**
   - Section dark, 3 testimonial cards
   - 📖 Textes : `copy-deck.md` > Témoignages

9. **Stats (Collection List)**
   - H2, Collection List : Stats, grid 4 colonnes
   - 📖 Config : `webflow-build-checklist.md`

10. **FAQ (Collection List)**
    - H2, Collection List : FAQ, accordion style
    - 📖 Config : `webflow-build-checklist.md`

11. **Contact (Formulaire)**
    - H2, citation, formulaire Webflow
    - Champs : Nom, Email, Organisation, Type projet, Date, Budget, Message
    - 📖 Textes : `copy-deck.md` > Contact

12. **Footer**
    - Section dark, 4 colonnes (brand, nav, legal, newsletter)
    - 📖 Textes : `copy-deck.md` > Footer

**📖 Détails complets dans `webflow-build-checklist.md` > Phase 5**

---

### ÉTAPE 6 : Ajouter les Interactions (1h)

1. **Scroll Reveals**
   - Fade In Up on Scroll (sections, cards)
   - Offset 10%, duration 0.6s

2. **Hover States**
   - Buttons : Transform Y -2px, shadow lift
   - Cards : Transform Y -4px, shadow lift

3. **FAQ Accordion**
   - Toggle height + rotate chevron

4. **Mobile Menu**
   - Hamburger toggle, slide-in

**📖 Guide complet dans `webflow-build-checklist.md` > Phase 6**

---

### ÉTAPE 7 : Créer la Page /experience (30min)

1. **Pages > New Page** : `/experience`
2. **Contenu :**
   - Hero dark full-height
   - H1 : "Expérience en construction"
   - P : "Cette section sera bientôt disponible. Revenez nous voir !"
   - CTA : "Retour à l'accueil"
3. **Publier**

---

### ÉTAPE 8 : Accessibilité & Performance (1h)

**Accessibilité :**
- [ ] Alt text sur toutes les images
- [ ] Labels sur tous les champs formulaire
- [ ] Focus visible (outline ring `#e8c4b4`)
- [ ] Tab order logique
- [ ] Contrastes AA (4.5:1 minimum)

**Performance :**
- [ ] Images WebP, lazy loading
- [ ] Fonts préchargées (si besoin)
- [ ] LCP < 2.5s (hero optimisé)
- [ ] Lighthouse > 90

**📖 Checklist complète dans `check-qa.md`**

---

### ÉTAPE 9 : Connecter le Domaine (30min + propagation)

1. **Webflow > Project Settings > Hosting > Add Custom Domain**
   - Ajouter : `enfrancaissvp.fr` et `www.enfrancaissvp.fr`
   - Noter les enregistrements DNS (A et CNAME)

2. **OVH Manager > Zone DNS**
   - Modifier enregistrement `A` (@) → IP Webflow
   - Modifier/Ajouter `CNAME` (www) → `proxy-ssl.webflow.com`
   - **NE PAS TOUCHER aux MX** (emails)

3. **Attendre propagation** (2-48h)
   - Vérifier : https://www.whatsmydns.net/

4. **SSL automatique** (Webflow)
   - Activer "Force HTTPS"

**📖 Guide détaillé complet dans `dns-webflow.md`**

---

### ÉTAPE 10 : Tests & QA (1h)

- [ ] Navigation : tous les liens fonctionnent
- [ ] Formulaire : test soumission + email
- [ ] Collection Lists : Projets, FAQ, Stats s'affichent
- [ ] Responsive : Desktop, Tablet, Mobile
- [ ] Navigateurs : Chrome, Firefox, Safari, Edge
- [ ] Performance : Lighthouse > 90
- [ ] Accessibilité : WAVE 0 erreurs

**📖 Checklist complète dans `check-qa.md`**

---

### ÉTAPE 11 : Mise en Ligne 🚀

1. **Webflow > Publish** (bouton coin haut-droit)
2. Tester `https://enfrancaissvp.fr`
3. Vérifier tout en production
4. Célébrer 🎉

---

## 📖 Documentation de Référence

| Fichier | Usage |
|---------|-------|
| `design-tokens.json` | Source de vérité : palette, typo, espacements |
| `webflow-styles.md` | Toutes les classes à créer + règles de design |
| `webflow-build-checklist.md` | Checklist détaillée étape par étape (10h de travail) |
| `dns-webflow.md` | Guide DNS complet (OVH → Webflow, sans casser emails) |
| `copy-deck.md` | Tous les textes propres pour copier-coller |
| `home.json` | Structure complète du contenu (référence) |
| `projects.json`, `faq.json`, `stats.json` | Données CMS (référence) |
| `projects.csv`, `faq.csv`, `stats.csv` | Fichiers d'import direct Webflow |
| `check-qa.md` | Checklist QA finale (typos, responsive, perf, a11y) |
| `assets-map.json` | Mapping des images (pour lier après upload) |

---

## 🎨 Principes de Design (Rappel)

1. **Cohérence des rayons** : Toujours arrondis (8px, 12px, 20px). Jamais de mélange angles/arrondis.
2. **Palette stricte** : Parchemin/Encre/Terre cuite. Pas de dégradés hors palette.
3. **Contrastes AA** : Minimum 4.5:1 pour texte.
4. **Rythme vertical** : Espacements multiples de 4px (8, 12, 16, 24, 32, 48, 64).
5. **Sobriété premium** : Transitions douces, pas d'animations tape-à-l'œil.

---

## ⚠️ Pièges à Éviter

- ❌ **Ne pas créer de styles inline** : Toujours créer des classes
- ❌ **Ne pas oublier les MX** : Les emails OVH doivent rester fonctionnels
- ❌ **Ne pas uploader des images non optimisées** : WebP, max 1600px, 85% quality
- ❌ **Ne pas sauter la phase Design System** : Créer toutes les classes AVANT les sections
- ❌ **Ne pas publier sans tester** : Responsive, formulaire, liens, performance

---

## 🎯 Résultat Attendu

À la fin de cette procédure :

✅ Site Webflow pixel-perfect par rapport au design actuel
✅ CMS fonctionnel (Projets, FAQ, Stats)
✅ Interactions fluides et professionnelles
✅ Accessible (AA) et performant (Lighthouse > 90)
✅ Domaine connecté (`enfrancaissvp.fr`)
✅ Emails OVH fonctionnels
✅ Page `/experience` en construction
✅ SSL actif (HTTPS)

**Prêt à migrer sans refaire deux fois !** 🚀

---

## 📞 Besoin d'Aide ?

**Documentation Webflow :**
- https://university.webflow.com/
- https://webflow.com/made-in-webflow (inspiration)

**Support :**
- Webflow Support : Chat in-app ou https://support.webflow.com/
- OVH Support : https://www.ovh.com/fr/support/

**Outils de Test :**
- DNS Propagation : https://www.whatsmydns.net/
- SSL Test : https://www.ssllabs.com/ssltest/
- PageSpeed : https://pagespeed.web.dev/
- WAVE (A11y) : https://wave.webaim.org/

---

**Fin du README de Migration** ✨

**Bonne migration !** 💪
# Migration Webflow - Guide Principal
*"Ce que je fais dans Webflow, dans l'ordre"*

**Projet** : En français s'il vous plaît (EfSVP)
**Plan Webflow** : Site CMS
**Temps estimé** : 8-12 heures (hors contenus photo/audio)
**Difficulté** : Intermédiaire

---

## Vue d'ensemble

Ce guide vous accompagne pas à pas pour reconstruire le site EfSVP dans Webflow, du projet vide jusqu'à la mise en ligne avec DNS configuré.

**Livrables disponibles** :
- `/deliverables/design-tokens.json` → Palette & système
- `/deliverables/content/` → Tous les textes
- `/deliverables/cms-import/` → CSV prêts à importer
- `/deliverables/webflow-styles.md` → Guide complet des classes
- `/deliverables/webflow-build-checklist.md` → Checklist détaillée
- `/deliverables/dns-webflow.md` → Configuration domaine

---

## Phase 1 : Création Projet (15 min)

### 1.1 Nouveau Projet

1. Dashboard Webflow → **New Project**
2. Nom : `EfSVP - En français s'il vous plaît`
3. Plan : **Site CMS** (requis pour Collections)

### 1.2 Settings Généraux

**Site Settings > General** :
- Site Name : `En français s'il vous plaît`
- Time Zone : `Europe/Paris`
- Language : `French (fr)`

**Site Settings > SEO** :
- Title : `En français s'il vous plaît | Création narrative & musicale sur-mesure`
- Description : `Studio de création narrative et musicale pour vos événements clés. Écriture, composition, performance live. Angers, Pays de la Loire.`

**Site Settings > Favicon** :
- Uploader `/favicon.svg`

---

## Phase 2 : Design System (30-45 min)

### 2.1 Typographie

**Site Settings > Fonts** :

Ajouter Google Fonts :
1. **Playfair Display** : weights 400, 500, 600, 700, 800, 900
2. **Inter** : weights 400, 500, 600, 700, 800
3. **Cormorant** : weight 600 italic

**Body (All Pages)** :
- Font : Inter
- Size : 17px (équivalent clamp base)
- Line height : 1.5

**All Headings** :
- Font : Playfair Display

### 2.2 Couleurs Projet

**Site Settings > Design > Color Swatches** :

Créer swatches :
- `Primary` : #b95a40
- `Bg` : #fbf8f3
- `Text` : #1d2c3b
- `Text Secondary` : #4a5568
- `Surface` : #faf6f0
- `Accent Camel` : #c39d6b
- `Border` : #ddd5c8

### 2.3 Custom CSS (Design Tokens)

**Site Settings > Custom Code > Head Code** :

```html
<style>
:root {
  /* Copier TOUT le contenu de src/styles/design-tokens.css ici */
  /* Ou au minimum les variables essentielles : */
  --primary: #b95a40;
  --bg: #fbf8f3;
  --text: #1d2c3b;
  --container-max: 1280px;
  --space-4: 1rem;
  --space-8: 2rem;
  --radius-md: 12px;
  --shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  /* etc. */
}

/* Classes gradient */
.gradient-primary {
  background: linear-gradient(135deg, #b8441e 0%, #e8924f 100%);
}
.gradient-gold {
  background: linear-gradient(135deg, #e8924f 0%, #d4af37 100%);
}
.gradient-dark {
  background: linear-gradient(135deg, #2d2d2d 0%, #7d2e2e 100%);
}
</style>
```

---

## Phase 3 : Collections CMS (45-60 min)

### 3.1 Collection "Projects"

**CMS > New Collection** :
- Nom : `Projects`
- Slug : `projects`

**Champs** :
1. `Name` (Text, required) - Déjà créé
2. `Client` (Plain Text)
3. `Year` (Plain Text)
4. `Summary` (Rich Text)
5. `Tag` (Plain Text) - Ex: "Hymne officiel"
6. `Category` (Option) - Values: institutions, entreprises, spectacles
7. `Client Filter` (Option) - Values: institution, entreprise, spectacle
8. `Type Filter` (Option) - Values: brand, mediation, immersive
9. `Gradient` (Plain Text) - Pour CSS inline
10. `Image 1` (Image)
11. `Image 2` (Image, optional)
12. `Image 3` (Image, optional)

**Import CSV** :
- Cliquer **Import** (icône flèche)
- Uploader `/cms-import/projects.csv`
- Mapper colonnes
- Vérifier 6 projets importés

### 3.2 Collection "FAQ"

**CMS > New Collection** :
- Nom : `FAQ`
- Slug : `faq`

**Champs** :
1. `Name` (Text, required) - Sera la question
2. `Question` (Plain Text)
3. `Answer` (Rich Text)
4. `Order` (Number)

**Import CSV** :
- Uploader `/cms-import/faq.csv`
- Vérifier 8 questions importées

### 3.3 Collection "Stats" (Optionnel)

Si vous voulez CMS pour les stats :

**Champs** :
1. `Name` (Text) - Label
2. `Value` (Plain Text)
3. `Order` (Number)

Sinon : hard-coder les 4 stats directement dans la page.

---

## Phase 4 : Construction Page Home (3-5h)

**Créer nouvelle page** : `Home` (déjà existe par défaut)

### 4.1 Navigation (30 min)

**Structure** :
- Nav (sticky, bg white on scroll)
  - Container
    - Logo (lien #hero, text "EfSVP")
    - Menu (ul > 4 li)
    - CTA button

**Classes principales** (voir `webflow-styles.md`) :
- `.nav` : position fixed, z-index 1100
- `.nav__container` : max-width 1280px, flex space-between
- `.nav__logo` : Playfair Display, bold
- `.nav__link` : Inter, hover underline
- `.btn.btn--primary-small` : CTA

**Interactions** :
- Sticky : trigger scroll, change bg opacity
- Mobile : toggle menu (display none → flex)

### 4.2 Hero Section (45 min)

**Contenu** (voir `/content/home.json` > hero) :
- Vidéo background (MP4 + WebM)
- Overlay gradient
- Titre 2 lignes
- Sous-titre
- CTA button
- 3 métriques

**Structure** :
```
Section.hero
  Div.hero__video-container
    Video (sources MP4 + WebM, autoplay muted loop)
    Div.hero__overlay
  Div.hero__content
    H1.hero__title
      Span ligne 1
      Span ligne 2
    P.hero__subtitle
    Link.btn.btn--primary (vers #contact)
    Div.hero__trust-metrics (3 divs)
  Button.hero__scroll (chevron SVG, lien #creations)
```

**Styling** :
- Hero : height 100vh, position relative
- Content : position absolute, z-index 1, centered
- Video : object-fit cover, full width/height

### 4.3 Sections Créations, Cases, Services (voir checklist)

**Pour chaque section** :
1. Créer structure HTML (div.section > div.container)
2. Ajouter header (h2 + subtitle)
3. Ajouter grille de cartes
4. Styler selon `webflow-styles.md`

**Astuce** : Utiliser Symbols pour cards réutilisables.

### 4.4 Portfolio avec Filtres (1h)

**Structure** :
```
Section#portfolio
  Container
    Header
    Div.filters (2 groupes de boutons)
    Div.portfolio__grid
      Collection List (Projects)
        Collection Item (portfolio-card)
```

**Filtres dynamiques** :
- Option A : Finsweet CMS Filter (addon gratuit)
- Option B : Custom JS (voir `webflow-build-checklist.md`)

**Liaison CMS** :
- Image : lier au champ `Image 1`
- Title : lier au champ `Name`
- Client : lier au champ `Client`
- Description : lier au champ `Summary`
- Data attributes : `data-client="{Client Filter}"`, `data-type="{Type Filter}"`

### 4.5 Process, Testimonials, FAQ, Contact

**Process** : 4 divs, contenu statique (voir `/content/home.json`)

**Testimonials** : Swiper carousel (Custom Code) ou Webflow Slider

**FAQ** : Collection List FAQ, accordion avec interactions Webflow

**Contact** : Form Webflow natif, styling custom

---

## Phase 5 : Interactions & Animations (1-2h)

**Interactions à créer** :

1. **Nav Sticky** :
   - Trigger : Scroll (>100px)
   - Action : Change bg opacity, reduce padding

2. **Scroll Reveal** :
   - Elements `[data-scroll]`
   - Trigger : Scroll into view
   - Animation : Fade + translateY

3. **Hover Lift** :
   - Cards `[data-lift]`
   - Trigger : Hover
   - Animation : translateY(-8px) + shadow

4. **FAQ Accordion** :
   - Trigger : Click question
   - Action : Toggle answer height, rotate icon

5. **Mobile Menu** :
   - Trigger : Click hamburger
   - Action : Slide menu, fade overlay

**Durées** : 0.25s cubic-bezier(0.22, 0.9, 0.24, 1)

---

## Phase 6 : Assets Upload (30 min)

**Assets Manager** :

1. Créer dossier `/videos`
2. Uploader `efsvp-hero.mp4` et `.webm`
3. Lier vidéos dans Hero section

**Images portfolio** (optionnel) :
- Si Option B (vraies images) : uploader dans `/images/portfolio`
- Lier dans Collection Items

**Optimisation** :
- Vidéos < 5MB
- Images WebP, < 500KB
- Lazy loading activé (images below fold)

---

## Phase 7 : SEO & Performance (45 min)

### 7.1 Pages Settings

**Home page** :
- Title : (déjà fait en Phase 1)
- Description : (déjà fait)
- OG Image : uploader image 1200x630px (ou utiliser favicon)

### 7.2 Alt Texts

Vérifier toutes les images ont alt :
- Images CMS : utiliser champ dynamique `{Name}`
- Images statiques : alt descriptif

### 7.3 Performance

**Settings > Performance** :
- Minify HTML, CSS, JS : ✅
- Responsive images : ✅
- Lazy loading : ✅

**Check Lighthouse** (après publish) :
- Target : > 90 Desktop, > 80 Mobile
- LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Phase 8 : Page /experience (15 min)

**Nouvelle page** : `/experience`

**Structure simple** :
```
Section.hero-dark
  Container
    H1 "En construction"
    P "Bientôt : espace d'écoute interactive"
    Link.btn "Retour à l'accueil" (vers /)
```

**Styling** :
- Background : gradient dark (#0f141a → #141e26)
- Text : white
- Centered, min-height 80vh

**Note** : Pas d'audio player à ce stade (futur).

---

## Phase 9 : QA & Tests (1h)

**Checklist** (voir `/check-qa.md` pour détails) :

- [ ] Responsive (Desktop 1920, 1440, 1280 / Tablet 768 / Mobile 375)
- [ ] Nav sticky fonctionne
- [ ] Tous liens internes (anchors) fonctionnent
- [ ] Formulaire contact envoie emails
- [ ] Filtres portfolio fonctionnent (tous groupes)
- [ ] Interactions smooth (pas de lag)
- [ ] Hover states visibles
- [ ] Focus states accessibles (tab navigation)
- [ ] Alt texts présents
- [ ] Contraste couleurs AA (4.5:1 min)
- [ ] Vidéo hero se charge (fallback si erreur)

**Navigateurs** :
- Chrome, Firefox, Safari, Edge (dernières versions)

---

## Phase 10 : Publication & DNS (1-2h)

### 10.1 Publish Webflow

1. **Publish** (bouton top-right)
2. Choisir plan Hosting (CMS Site)
3. Site publié sur `*.webflow.io`

### 10.2 Custom Domain

1. **Project Settings > Hosting**
2. **Add Custom Domain** : `efsvp.fr`
3. Noter DNS records Webflow fournit

### 10.3 Configuration DNS OVH

**Suivre** : `/dns-webflow.md`

**Résumé** :
- A record `@` → `75.2.70.75`
- CNAME `www` → `proxy-ssl.webflow.com`
- MX records : **ne pas toucher** (emails OVH)

**Propagation** : 30 min - 2h

### 10.4 SSL

Webflow génère certificat Let's Encrypt auto.

**Activer** :
- Redirect HTTP → HTTPS : ✅
- HSTS : ✅

---

## Post-Migration

### Monitoring

**Outils** :
- Google Search Console : soumettre sitemap
- Google Analytics : ajouter tracking (Settings > Integrations)
- Webflow Analytics : inclus dans plan

**Sitemap** : Auto-généré par Webflow (`/sitemap.xml`)

### Maintenance

**Mensuel** :
- Vérifier certificat SSL (auto-renew)
- Backup export code (Designer > Export)
- Vérifier formulaires fonctionnent

**Contenu** :
- Ajouter nouveaux projets via CMS
- Mettre à jour FAQ si besoin

---

## Troubleshooting Courant

**Vidéo hero ne charge pas** :
- Vérifier formats MP4 + WebM uploadés
- Vérifier autoplay muted loop

**Filtres portfolio ne marchent pas** :
- Vérifier data attributes correctement liés
- Vérifier JS custom code (si pas Finsweet)

**Formulaire ne reçoit pas emails** :
- Vérifier email notif dans Form Settings
- Vérifier spam folder

**Site lent** :
- Compresser vidéos/images
- Vérifier lazy loading actif
- Check Webflow Performance tab

---

## Ressources

**Docs** :
- Webflow University : https://university.webflow.com
- Webflow Community : https://forum.webflow.com
- Design Tokens : `/deliverables/design-tokens.json`
- Styles Guide : `/deliverables/webflow-styles.md`

**Support** :
- Webflow Support : support@webflow.com
- OVH Support : https://help.ovhcloud.com

---

## Timeline Recap

| Phase | Temps | Cumul |
|-------|-------|-------|
| 1. Projet & Settings | 15 min | 15 min |
| 2. Design System | 45 min | 1h |
| 3. Collections CMS | 60 min | 2h |
| 4. Page Home | 5h | 7h |
| 5. Interactions | 2h | 9h |
| 6. Assets | 30 min | 9h30 |
| 7. SEO/Perf | 45 min | 10h15 |
| 8. Page /experience | 15 min | 10h30 |
| 9. QA | 1h | 11h30 |
| 10. DNS & Publish | 2h | 13h30 |

**Total** : ~12-14h (hors création contenus photo/audio)

---

**Bon courage ! 🚀**

Pour questions : référez-vous aux docs détaillées dans `/deliverables/`.
