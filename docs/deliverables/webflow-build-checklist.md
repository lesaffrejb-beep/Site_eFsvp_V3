# Webflow Build Checklist — EfSVP
**Plan de reconstruction étape par étape dans Webflow**

---

## 📋 Vue d'ensemble

Ce document détaille l'ordre exact des opérations pour reconstruire le site EfSVP dans Webflow, de A à Z, sans rien oublier.

**Durée estimée :** 8-12 heures de travail concentré
**Prérequis :** Compte Webflow (plan CMS minimum), accès au domaine enfrancaissvp.fr sur OVH

---

## 🎨 PHASE 1 : Configuration Projet & Design System (2h)

### 1.1 Créer le Projet Webflow

- [ ] Créer nouveau projet : **"En français s'il vous plaît"**
- [ ] Plan : **CMS Plan** (minimum pour Collections)
- [ ] Template de départ : **Blank Site**

### 1.2 Paramètres Projet

- [ ] **Project Settings** > **General** :
  - Nom du site : `En français s'il vous plaît`
  - Timezone : `Europe/Paris`

- [ ] **Project Settings** > **SEO** :
  - Site Title : `En français s'il vous plaît | Création narrative & musicale sur-mesure`
  - Meta Description : `Studio de création narrative et musicale pour vos événements clés. Écriture, composition, performance live. Angers, Pays de la Loire.`

- [ ] **Project Settings** > **Fonts** :
  - Ajouter **Playfair Display** : weights `400, 500, 600, 700, 800, 900`
  - Ajouter **Inter** : weights `400, 500, 600, 700, 800`
  - Ajouter **Cormorant** : `italic 600`

### 1.3 Créer la Palette de Couleurs (Swatches)

Ouvrir **Style Manager** > **Swatches**, créer ces couleurs :

**Principales :**
- [ ] `Primary` : `#b95a40`
- [ ] `Primary Hover` : `#d16d52`
- [ ] `Primary Active` : `#a04a32`
- [ ] `Secondary` : `#8a8a68`
- [ ] `Accent Camel` : `#c39d6b`
- [ ] `Accent Beige` : `#e6d9c3`
- [ ] `Accent Gold` : `#f3b47a`

**Texte :**
- [ ] `Ink` : `#1d2c3b`
- [ ] `Charcoal` : `#2d3748`
- [ ] `Text Secondary` : `#4a5568`
- [ ] `Text Tertiary` : `#6b7280`
- [ ] `Muted` : `#9ca3af`
- [ ] `Text Inverse` : `#fefefe`

**Fonds :**
- [ ] `Parchment` : `#fbf8f3`
- [ ] `Sand` : `#faf6f0`
- [ ] `Sand Deep` : `#f0e9dc`
- [ ] `Surface Elevated` : `#ffffff`
- [ ] `BG Dark` : `#0f141a`
- [ ] `BG Dark 2` : `#141e26`

**Bordures :**
- [ ] `Border` : `#ddd5c8`
- [ ] `Border Strong` : `#c5b9a8`
- [ ] `Ring` : `#e8c4b4`

### 1.4 Configurer les Styles Globaux

**Body (All Paragraphs) :**
- [ ] Font : `Inter`
- [ ] Size : `17px` (Desktop), `16px` (Mobile)
- [ ] Line Height : `1.7`
- [ ] Color : `Ink`
- [ ] Background : `Parchment`

**H1 (All H1 Headings) :**
- [ ] Font : `Playfair Display`
- [ ] Weight : `700`
- [ ] Size : `60px` (Desktop), `40px` (Tablet), `32px` (Mobile)
- [ ] Line Height : `1.1`
- [ ] Letter Spacing : `-0.02em`
- [ ] Color : `Ink`

**H2, H3, H4 :**
- [ ] Configurer selon `webflow-styles.md` (voir doc)

**All Links :**
- [ ] Color : `Ink`
- [ ] Hover Color : `Primary`
- [ ] Transition : `color 0.25s ease`
- [ ] Text Decoration : `none`

### 1.5 Créer les Classes Utilitaires

Créer ces classes selon `webflow-styles.md` :

**Layout :**
- [ ] `.container` : max-width 1280px, padding 24px, margin auto
- [ ] `.section` : padding vertical 96px (responsive)
- [ ] `.section--dark` : background BG Dark
- [ ] `.section--surface` : background Sand

**Grids :**
- [ ] `.grid-12` : grid 12 colonnes
- [ ] `.grid-2`, `.grid-3` : grids responsives

**Stacks :**
- [ ] `.stack-8`, `.stack-12`, `.stack-16`, `.stack-24`, `.stack-32`

**Boutons :**
- [ ] `.btn` : base button
- [ ] `.btn--primary` : CTA principal (avec hover states)
- [ ] `.btn--primary-small` : version compacte
- [ ] `.btn--secondary` : bouton secondaire
- [ ] `.btn--hero` : CTA hero large

**Cards :**
- [ ] `.card` : card de base avec hover lift
- [ ] `.card--flat` : sans shadow
- [ ] `.card--dark` : pour fonds sombres

**Badges & Chips :**
- [ ] `.badge`, `.badge--primary`, `.badge--camel`, `.badge--outline`
- [ ] `.chip` : pill badges avec hover

**Text Utilities :**
- [ ] `.text-muted`, `.text-tertiary`, `.text-inverse`, `.text-center`
- [ ] `.text-lg`, `.text-xl`, `.text-2xl`
- [ ] `.serif`, `.italic-accent`

**Spacing & Radius :**
- [ ] `.mt-0` → `.mt-32`, `.mb-0` → `.mb-32`
- [ ] `.rounded-sm`, `.rounded-md`, `.rounded-lg`, `.rounded-xl`, `.rounded-full`

**Shadows :**
- [ ] `.shadow-sm`, `.shadow-md`, `.shadow-lg`, `.shadow-lift`

### 1.6 Ajouter la Texture Grain (Custom Code)

- [ ] **Project Settings** > **Custom Code** > **Head Code** :

```html
<style>
body {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}
</style>
```

---

## 🗂️ PHASE 2 : Créer les Collections CMS (1h)

### 2.1 Collection "Projects"

- [ ] **CMS** > **New Collection** : `Projects`
- [ ] Ajouter les champs :
  - `Name` (Text, auto) : **Title**
  - `Slug` (Text, auto)
  - `Client` (Plain Text)
  - `Year` (Number)
  - `Badge` (Plain Text) — ex: "Hymne officiel"
  - `Summary` (Rich Text)
  - `Tags` (Plain Text) — séparés par virgules
  - `Featured` (Switch) — pour marquer projets phares
  - `Images` (Multi-Image) — galerie photos projet
  - `Thumbnail` (Image) — image miniature

- [ ] **Collection Settings** :
  - Collection Template Page : Activer
  - Collection URL : `/projets/[slug]`

### 2.2 Collection "FAQ"

- [ ] **CMS** > **New Collection** : `FAQ`
- [ ] Ajouter les champs :
  - `Name` (Text, auto) : **Question**
  - `Answer` (Rich Text)
  - `Order` (Number) — pour trier manuellement

- [ ] **Collection Settings** :
  - Collection Template Page : Désactiver (pas besoin de pages individuelles)

### 2.3 Collection "Stats"

- [ ] **CMS** > **New Collection** : `Stats`
- [ ] Ajouter les champs :
  - `Name` (Text, auto) : **Label**
  - `Value` (Plain Text) — ex: "60+"
  - `Order` (Number)

- [ ] **Collection Settings** :
  - Collection Template Page : Désactiver

---

## 📥 PHASE 3 : Importer les Données CMS (30min)

### 3.1 Importer les Projets

- [ ] **Projects Collection** > **Import**
- [ ] Uploader `/deliverables/cms-import/projects.csv`
- [ ] Mapper les colonnes CSV aux champs Webflow
- [ ] Valider l'import (6 projets)

### 3.2 Importer la FAQ

- [ ] **FAQ Collection** > **Import**
- [ ] Uploader `/deliverables/cms-import/faq.csv`
- [ ] Mapper les colonnes
- [ ] Valider l'import (8 questions)

### 3.3 Importer les Stats

- [ ] **Stats Collection** > **Import**
- [ ] Uploader `/deliverables/cms-import/stats.csv`
- [ ] Mapper les colonnes
- [ ] Valider l'import (4 stats)

---

## 🖼️ PHASE 4 : Uploader & Lier les Assets (1h)

### 4.1 Uploader les Logos & Favicons

- [ ] **Assets Manager** > Upload :
  - `/deliverables/assets/efsvp-logo.svg`
  - `/deliverables/assets/favicon.svg`

- [ ] **Project Settings** > **SEO** > **Favicon** :
  - Uploader `favicon.svg` ou générer favicon 32x32 PNG

### 4.2 Uploader les Images de Projets

**Note :** Actuellement, pas d'images disponibles. Quand elles seront prêtes :

- [ ] Uploader toutes les images dans **Assets Manager**
- [ ] Respecter le naming selon `/deliverables/assets-map.json`
- [ ] Format : **WebP**, max **1600px** largeur, qualité **85%**

### 4.3 Lier les Images aux Projets CMS

Pour chaque projet dans la Collection Projects :

- [ ] Éditer le projet
- [ ] Ajouter l'image `Thumbnail`
- [ ] Ajouter les images dans `Images` (Multi-Image)
- [ ] Publier

---

## 🏗️ PHASE 5 : Construire les Sections de la Page d'Accueil (4-5h)

### 5.1 Navigation (Header)

- [ ] Créer un **Navbar** en sticky (position fixed top)
- [ ] Ajouter logo `EfSVP` à gauche
- [ ] Menu central :
  - Créations
  - Portfolio
  - Process
  - FAQ
- [ ] CTA à droite : `.btn.btn--primary-small` "Démarrer votre projet"
- [ ] Hamburger menu pour mobile
- [ ] Background : `BG Dark`, color : `Text Inverse`
- [ ] Height : `76px`
- [ ] Z-index : `1100`

### 5.2 Section Hero

**Structure :**
- [ ] Section full-height (100vh)
- [ ] Background : Video ou image placeholder
- [ ] Overlay sombre (gradient)
- [ ] Contenu centré verticalement

**Contenu :**
- [ ] H1 : 2 lignes (voir `copy-deck.md`)
- [ ] Paragraph subtitle
- [ ] CTA `.btn.btn--primary.btn--hero`
- [ ] 3 métriques (stats cards) en grille
- [ ] Bouton scroll-down (chevron animé) en bas

**Copier les textes depuis :** `/deliverables/content/copy-deck.md` > Hero

### 5.3 Section Audio / Créations

- [ ] Container + Section padding
- [ ] Header : H2 + Subtitle
- [ ] Bento Grid (CSS Grid, colonnes asymétriques)
- [ ] Cards pour :
  - Audio player 1 (large featured)
  - Info card "3 formats"
  - Audio player 2
  - Quote card
  - Audio player 3
  - Stats card "60+ représentations"
- [ ] CTA en bas : "Découvrir tous nos projets"

**Note Audio :** Pour l'instant, laisser des placeholders. Audio sera intégré plus tard.

### 5.4 Section Flagship Cases (3 Créations)

- [ ] Container + Section
- [ ] Header : H2 + Subtitle
- [ ] 3 Cards en grille (desktop : 3 colonnes, mobile : 1)
- [ ] Chaque card contient :
  - Badge
  - Titre projet
  - Client · Année
  - 3 blocs : Problème (🎯), Approche (⚙️), Effet (✨)
  - Bouton audio placeholder
- [ ] Marquer le 3e (État de nature) comme **Featured** (style différent)
- [ ] CTA final : "Voir tous les projets"

**Textes :** Copier depuis `/deliverables/content/copy-deck.md` > Trois Créations

### 5.5 Section Services (4 Formules)

- [ ] Container + Section
- [ ] Header : H2 + Subtitle
- [ ] 4 Cards en grille (2x2 desktop, 1 mobile)
- [ ] Chaque card :
  - Badge prix (top)
  - Titre formule
  - 3 features (liste à puces)
  - CTA "Découvrir"
- [ ] Marquer "Performance Live" comme **Featured**

**Textes :** `/deliverables/content/copy-deck.md` > Quatre Formules

### 5.6 Section Portfolio (Collection List)

- [ ] Container + Section (background `Sand`)
- [ ] Header : H2 + Stats "60+ représentations · 15+ institutions"
- [ ] **Filtres** (optionnels, via interactions) :
  - Client : Tout, Institutions, Entreprises, Spectacles
  - Type : Tous, Hymnes, Spectacles, Immersifs
- [ ] **Collection List** (Projects) :
  - Grid 3 colonnes
  - Afficher : Thumbnail, Badge, Titre, Client, Année, Summary
  - Lien vers page projet
  - Hover effect : lift card
- [ ] Limit : 6 projets (ou tous)

### 5.7 Section Process (4 Étapes)

- [ ] Container + Section
- [ ] Header : H2 + Subtitle
- [ ] 4 blocs numérotés (01, 02, 03, 04) en grille verticale ou timeline
- [ ] Chaque bloc :
  - Numéro large
  - Titre étape
  - Durée
  - Description
  - 3 détails (liste)
  - Badge optionnel (étape 03 et 04)
- [ ] CTA final : "Démarrer votre projet"

**Textes :** `/deliverables/content/copy-deck.md` > Process

### 5.8 Section Témoignages

- [ ] Section dark (`.section--dark`, background `BG Dark`)
- [ ] Header : H2 white
- [ ] 3 Testimonial cards en grille
- [ ] Chaque card :
  - 5 étoiles
  - Quote (large, italique)
  - Auteur + Rôle + Organisation
  - Contexte projet
- [ ] Style premium : cards dark avec shadow

**Textes :** `/deliverables/content/copy-deck.md` > Témoignages

### 5.9 Section Stats (La preuve par les chiffres)

- [ ] Container + Section
- [ ] Header : H2
- [ ] **Collection List** (Stats) :
  - Grid 4 colonnes (desktop), 2 (mobile)
  - Afficher : Value (large number), Label
  - Style : minimal, centré

### 5.10 Section FAQ (Collection List)

- [ ] Container + Section (background `Sand`)
- [ ] Header : H2
- [ ] **Collection List** (FAQ) :
  - Accordion style (ou simple list)
  - Chaque item : Question (bold) + Answer (collapsible)
  - Webflow Interactions : Toggle accordion au clic
- [ ] Afficher les 8 questions

### 5.11 Section Contact

- [ ] Container + Section
- [ ] Header : H1 "La vôtre commence maintenant" + Subtitle
- [ ] Citation inspirante
- [ ] **Formulaire Webflow** :
  - Champs : Nom, Email, Organisation, Type projet (select), Date, Budget (range), Message
  - Checkbox consentement
  - Submit button : "Partagez votre histoire"
  - Success message custom
  - Email notification : configurer dans Form Settings
- [ ] Bloc alternatif : Email direct + Location

**Textes :** `/deliverables/content/copy-deck.md` > Contact

### 5.12 Footer

- [ ] Section dark (background `BG Dark`)
- [ ] 4 colonnes (responsive) :
  - **Colonne 1** : Logo + Tagline + Baseline
  - **Colonne 2** : Navigation links
  - **Colonne 3** : Mentions légales
  - **Colonne 4** : Newsletter (email input + CTA)
- [ ] Bottom bar : Copyright + "Made with ♥ in Angers" + Back to top

**Textes :** `/deliverables/content/copy-deck.md` > Footer

---

## ⚡ PHASE 6 : Interactions Webflow (1-2h)

### 6.1 Scroll Reveals

- [ ] Créer interaction **"Fade In Up on Scroll"** :
  - Déclencheur : Scroll into view (offset 10%)
  - Initial state : Opacity 0, Transform Y +30px
  - Animation : Opacity 1, Transform Y 0
  - Duration : 0.6s, Easing : ease-out
- [ ] Appliquer aux sections : Headers, Cards, Blocks

### 6.2 Hover States (Cards & Buttons)

- [ ] Buttons (`.btn--primary`) :
  - Hover : Transform Y -2px, Shadow augmentée
  - Duration : 0.25s
- [ ] Cards (`.card`) :
  - Hover : Transform Y -4px, Shadow lift
  - Duration : 0.25s

### 6.3 FAQ Accordion

- [ ] Créer interaction **"Toggle FAQ"** :
  - Click : Toggle height de la réponse
  - Rotate icône chevron (180deg)
  - Duration : 0.3s, Easing : ease

### 6.4 Mobile Menu

- [ ] Hamburger toggle :
  - Click : Open/Close nav menu
  - Animation : Slide in from right
  - Background overlay dark

### 6.5 Hero Scroll Button

- [ ] Click sur chevron :
  - Smooth scroll vers section Créations
  - Duration : 0.8s

---

## 🎨 PHASE 7 : Page /experience (En Construction) (30min)

### 7.1 Créer la Page

- [ ] **Pages** > **New Page** : `/experience`
- [ ] SEO Title : `Expérience — En français s'il vous plaît`

### 7.2 Contenu

- [ ] Section Hero dark full-height
- [ ] Background : `BG Dark` ou image sombre
- [ ] Contenu centré :
  - H1 : "Expérience en construction"
  - Paragraph : "Cette section sera bientôt disponible. Revenez nous voir !"
  - CTA : "Retour à l'accueil" (lien vers `/`)
- [ ] Style : Minimal, élégant, sobre

### 7.3 Navigation

- [ ] Ajouter lien "Expérience" dans le menu (optionnel)
- [ ] Ou laisser la page accessible uniquement par URL directe

---

## ♿ PHASE 8 : Accessibilité & Performance (1h)

### 8.1 Accessibilité

- [ ] **Alt text** sur toutes les images
- [ ] **Labels** sur tous les champs de formulaire
- [ ] **Focus visible** : Vérifier les outlines (ring `#e8c4b4`)
- [ ] **Tab order** : Tester la navigation au clavier
- [ ] **ARIA labels** : Ajouter sur boutons icônes (hamburger, play, etc.)
- [ ] **Contrastes** : Vérifier AA (4.5:1 pour texte)
  - Outil : WebAIM Contrast Checker

### 8.2 Performance

- [ ] **Images** :
  - Format WebP
  - Lazy loading : activer (Webflow par défaut)
  - Taille max : 1600px
  - Compression : 85% quality
- [ ] **Fonts** :
  - Précharger Playfair Display & Inter (via Custom Code si besoin)
- [ ] **LCP** (Largest Contentful Paint) :
  - Objectif : < 2.5s
  - Hero image optimisée
- [ ] **CLS** (Cumulative Layout Shift) :
  - Définir width/height sur images
  - Éviter les shifts au chargement

### 8.3 SEO

- [ ] **Meta descriptions** sur toutes les pages
- [ ] **Open Graph tags** :
  - og:title, og:description, og:image
  - Ajouter dans **Page Settings** > **Open Graph**
- [ ] **Favicon** : Vérifier l'affichage
- [ ] **Sitemap** : Webflow génère automatiquement
- [ ] **Robots.txt** : Vérifier (Webflow par défaut OK)

---

## 🌐 PHASE 9 : Connecter le Domaine (voir dns-webflow.md)

**⚠️ Important :** Suivre le guide `/deliverables/dns-webflow.md` pour pointer le domaine **enfrancaissvp.fr** vers Webflow.

### Checklist Rapide :

- [ ] **Webflow** > **Project Settings** > **Hosting** > **Add Custom Domain**
- [ ] Entrer `enfrancaissvp.fr` et `www.enfrancaissvp.fr`
- [ ] Noter les enregistrements DNS Webflow
- [ ] **OVH** > **DNS Zone** :
  - [ ] Ajouter `A` record pour apex (`@`) → IP Webflow
  - [ ] Ajouter `CNAME` pour `www` → `proxy-ssl.webflow.com`
  - [ ] **NE PAS TOUCHER** aux enregistrements `MX` (emails)
- [ ] Attendre propagation DNS (2-48h)
- [ ] Activer SSL dans Webflow (automatique après propagation)
- [ ] Tester : `https://enfrancaissvp.fr` et `https://www.enfrancaissvp.fr`

---

## ✅ PHASE 10 : Tests & QA Finale (1h)

### 10.1 Tests Fonctionnels

- [ ] **Navigation** : Tous les liens fonctionnent
- [ ] **Formulaire Contact** : Tester soumission + réception email
- [ ] **Collection Lists** : Projets, FAQ, Stats s'affichent correctement
- [ ] **Filtres Portfolio** : Si implémentés, tester
- [ ] **Mobile Menu** : Open/Close fonctionne
- [ ] **Scroll Reveals** : Animations fluides

### 10.2 Tests Responsive

- [ ] **Desktop** (1920px, 1440px, 1280px)
- [ ] **Tablet** (768px, 1024px)
- [ ] **Mobile** (375px, 414px, 390px)
- [ ] Vérifier : Grids, Stacks, Font sizes, Spacings

### 10.3 Tests Navigateurs

# Webflow Build Checklist - EfSVP
*Document brouillon basé sur le chunk #1 (lignes 0-1000)*

## Phase 1 : Configuration Projet

### 1.1 Création du Projet
- [ ] Créer nouveau projet Webflow "En français s'il vous plaît"
- [ ] Configurer le plan (CMS nécessaire pour Collections)
- [ ] Configurer le domaine personnalisé

### 1.2 Styles Globaux
- [ ] **Typographie**
  - [ ] Ajouter Google Font : Playfair Display (400, 500, 600, 700, 800, 900)
  - [ ] Ajouter Google Font : Inter (400, 500, 600, 700, 800)
  - [ ] Ajouter Google Font : Cormorant (600 italic)
  - [ ] Définir Body font : Inter
  - [ ] Définir Heading font : Playfair Display

- [ ] **Couleurs Projet**
  - [ ] Primary : #b8441e
  - [ ] Secondary : #e8924f
  - [ ] Accent : #d4af37
  - [ ] Dark Brown : #7d2e2e
  - [ ] Dark Grey : #2d2d2d
  - [ ] Cream : #f5e6d3
  - [ ] TODO : Définir Background, Surface, Text colors (chunk #2)

- [ ] **Custom CSS (Embed)**
  - [ ] Ajouter gradients (voir webflow-styles.md section Gradients)
  - [ ] Ajouter animations keyframes si nécessaire
  - [ ] Ajouter utility classes pour [data-scroll], [data-lift], etc.

### 1.3 Assets
- [ ] Uploader favicon.svg
- [ ] Uploader vidéo hero : efsvp-hero.mp4
- [ ] Uploader vidéo hero : efsvp-hero.webm
- [ ] TODO : Autres assets (chunk #2)

---

## Phase 2 : Collections CMS

### 2.1 Collection "Projects" (Portfolio)
**Champs requis** :
- [ ] Name (Text) - Titre du projet
- [ ] Slug (Text) - Auto-généré
- [ ] Tag (Text) - Ex: "Hymne officiel", "Récit narratif"
- [ ] Client (Text) - Ex: "Département Maine-et-Loire"
- [ ] Year (Text) - Ex: "2024"
- [ ] Description (Rich Text) - Description courte
- [ ] Category (Option) - Values: institutions, entreprises, spectacles
- [ ] Client Filter (Option) - Values: institution, entreprise, spectacle
- [ ] Type Filter (Option) - Values: brand, mediation, immersive
- [ ] Visual Gradient (Text) - CSS gradient code
- [ ] Featured (Switch) - Bool

**Données à importer (CSV)** :
```csv
Name,Tag,Client,Year,Description,Category,Client Filter,Type Filter,Visual Gradient
"La force de la douceur","Hymne officiel","Département Maine-et-Loire","2024","Hymne officiel célébrant l'identité et les valeurs du département. Performance inaugurale devant 500 invités.","institutions","institution","brand","linear-gradient(135deg, #b8441e 0%, #e8924f 100%)"
"Série promotionnelle agricole","Récit narratif","Destination Angers / SIVAL","2025","Récits musicaux pour valoriser l'innovation agricole lors du plus grand salon européen.","entreprises","institution","brand","linear-gradient(135deg, #e8924f 0%, #d4af37 100%)"
"25 ans & passation","Anniversaire","Atelier Lacour","2024","Métaphore de la forêt pour célébrer un quart de siècle et préparer la transmission.","entreprises","entreprise","brand","linear-gradient(135deg, #2d2d2d 0%, #7d2e2e 100%)"
"Histoires de résilience","Portraits","Réseau Cocagne","2024","Collectage et mise en musique de parcours de réinsertion pour un réseau national.","institutions","institution","mediation","linear-gradient(135deg, #f5e6d3 0%, #d4af37 100%)"
```

### 2.2 Collection "Audio Tracks"
**Champs requis** :
- [ ] Name (Text) - Titre du track
- [ ] Client (Text) - Client
- [ ] Year (Text) - Année
- [ ] Badge (Text) - Ex: "Hymne officiel"
- [ ] Duration (Text) - Ex: "3:45"
- [ ] Audio File (File) - Fichier audio
- [ ] Featured (Switch) - Bool
- [ ] Sample ID (Text) - ID pour JS (ex: "sample-1")

### 2.3 Collection "Case Studies" (Flagship Cases)
**Champs requis** :
- [ ] Name (Text) - Titre du case
- [ ] Client (Text) - Client
- [ ] Year (Text) - Année
- [ ] Badge (Text) - Type de projet
- [ ] Category (Option) - institutions, entreprises, spectacles
- [ ] Problem (Rich Text) - Section Problème
- [ ] Approach (Rich Text) - Section Approche
- [ ] Effect (Rich Text) - Section Effet
- [ ] Visual Gradient (Text) - CSS gradient
- [ ] Featured (Switch) - Bool
- [ ] Featured Label (Text) - Ex: "Création phare"

**Données à importer (CSV)** :
```csv
Name,Client,Year,Badge,Category,Problem,Approach,Effect,Visual Gradient,Featured
"SIVAL — L'innovation agricole racontée","Destination Angers","2025","Série narrative","institutions","Comment valoriser l'innovation agricole au-delà des chiffres et communiqués, lors du plus grand salon européen du secteur ?","Série de récits musicaux courts (3-5 min) mettant en lumière des histoires humaines d'innovateurs. Collectage sur site, composition sur mesure, diffusion lors des conférences.","8 récits diffusés auprès de 2 000+ visiteurs. Reprise média (France Bleu, Ouest-France). NPS client : 9.2/10.","linear-gradient(135deg, #e8924f 0%, #d4af37 100%)",false
```

### 2.4 Collection "Services"
**Champs requis** :
- [ ] Name (Text) - Titre du service
- [ ] Price (Text) - Ex: "À partir de 1 200€"
- [ ] Feature 1 (Text)
- [ ] Feature 2 (Text)
- [ ] Feature 3 (Text)
- [ ] Icon SVG (Code) - Code SVG de l'icône
- [ ] Featured (Switch) - Bool
- [ ] Featured Label (Text) - Ex: "Notre signature"
- [ ] Order (Number) - Pour tri

### 2.5 Collection "FAQ"
- [ ] Question (Text)
- [ ] Answer (Rich Text)
- [ ] Category (Option) - Si nécessaire
- [ ] Order (Number)
- [ ] TODO : Remplir après lecture chunk #2

### 2.6 Collection "Stats"
- [ ] Label (Text) - Ex: "Représentations"
- [ ] Value (Text) - Ex: "60+"
- [ ] Context (Text) - Ex: "depuis 2022"
- [ ] Order (Number)

---

## Phase 3 : Structure des Pages

### 3.1 Page Home (/)

#### Section : Navigation
- [ ] Créer Symbol "Navigation"
- [ ] Logo text "EfSVP" avec lien #hero
- [ ] Menu avec 4 liens : Créations, Portfolio, Process, FAQ
- [ ] CTA button "Démarrer votre projet" → #contact
- [ ] Mobile toggle (hamburger)
- [ ] TODO : Sticky behavior avec Interaction

#### Section : Hero
- [ ] Container full-width, full-height
- [ ] Background video (MP4 + WebM sources)
- [ ] Overlay gradient pour lisibilité
- [ ] Titre 2 lignes :
  - "Vous avez déjà écrit l'histoire."
  - "Nous la mettons en scène avec mesure."
- [ ] Sous-titre descriptif
- [ ] CTA principal "Partagez votre histoire"
- [ ] 3 métriques de confiance (60+, 15+, 1200€)
- [ ] Bouton scroll chevron (lien vers #creations)

#### Section : Audio Bento Grid (#creations)
- [ ] Section header : titre + sous-titre
- [ ] Grid container (CSS Grid ou Flex)
- [ ] 3 Audio players (liés à Collection Audio Tracks)
  - [ ] 1 Featured (large)
  - [ ] 2 Standard/Compact
- [ ] 2 Info cards (3 formats, 60+ représentations)
- [ ] 1 Quote card avec citation
- [ ] CTA "Découvrir tous nos projets"
- [ ] TODO : Intégrer WaveSurfer.js ou audio player custom

#### Section : Flagship Cases (#cases)
- [ ] Section header
- [ ] Grid 3 colonnes (ou 1 col mobile)
- [ ] Collection List : Case Studies (limit: 3)
- [ ] Card template :
  - Visual avec gradient (inline style binding)
  - Badge
  - Titre + client + année
  - 3 steps : Problème, Approche, Effet
  - Audio button (scroll to #creations)
- [ ] CTA "Voir tous les projets"

#### Section : Services (#services)
- [ ] Section header
- [ ] Grid 4 colonnes (2 col tablet, 1 col mobile)
- [ ] Collection List : Services
- [ ] Card template :
  - Icon SVG
  - Badge prix
  - Titre
  - Liste features (3 items)
  - CTA "Découvrir"
  - Featured variant style

#### Section : Portfolio (#portfolio)
- [ ] Section header avec stats animées
- [ ] Filters :
  - Groupe CLIENT (Tout, Institutions, Entreprises, Spectacles)
  - Groupe TYPE (Tous, Hymnes & marque, Spectacles, Formats immersifs)
  - TODO : Logique JS pour filtrage multi-groupe
- [ ] Grid portfolio (masonry ou grid)
- [ ] Collection List : Projects
- [ ] Card template :
  - Visual avec gradient
  - Overlay
  - Tag
  - Titre + client + année
  - Description
  - Data attributes pour filtres

#### Section : Process
- [ ] TODO (chunk #2)

#### Section : FAQ
- [ ] TODO (chunk #2)

#### Section : Contact
- [ ] TODO (chunk #2)

#### Section : Footer
- [ ] TODO (chunk #2)

### 3.2 Page Expérience (/experience)
**EN CONSTRUCTION**

- [ ] Créer page /experience
- [ ] Hero sombre simple
  - [ ] Titre : "Expérience" ou "En construction"
  - [ ] Texte : "Cette section est en cours de préparation."
  - [ ] CTA : "Retour à l'accueil" → /
- [ ] Utiliser gradient dark ou darkRed
- [ ] Style minimaliste, cohérent avec le design system

---

## Phase 4 : Interactions Webflow

### 4.1 Navigation
- [ ] Scroll trigger : sticky nav avec background change
- [ ] Mobile menu : toggle open/close avec animation
- [ ] Active link state selon section visible

### 4.2 Hero
- [ ] Scroll button animation (bounce chevron)
- [ ] Trust metrics : reveal avec scale ou fade-up

### 4.3 Scroll Animations
- [ ] Elements [data-scroll] : fade-up ou fade-in on scroll
- [ ] Elements [data-reveal="scale"] : scale animation
- [ ] Stagger animations pour grids

### 4.4 Hover States
- [ ] Cards [data-lift] : translateY(-8px) au hover
- [ ] Buttons : scale ou glow effect
- [ ] Filters : border-color change, background fill

### 4.5 Portfolio Filters
- [ ] Click filter : toggle active class
- [ ] Filter projects selon data-client et data-type
- [ ] Animation fade ou slide pour showing/hiding
- [ ] TODO : Custom JS si filtrage complexe (multi-groupe)

### 4.6 Audio Players
- [ ] Play/Pause toggle
- [ ] Waveform progress (WaveSurfer.js)
- [ ] Time update
- [ ] TODO : Intégration avec Collection

### 4.7 Stats Counters
- [ ] Elements [data-counter] : animated count-up
- [ ] Trigger on scroll into view

---

## Phase 5 : Custom Code

### 5.1 Head Code (Avant </head>)
```html
<!-- Preload fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "En français s'il vous plaît",
  ...
}
</script>
```

### 5.2 Body Code (Avant </body>)
```html
<!-- WaveSurfer.js pour audio players -->
<script src="https://unpkg.com/wavesurfer.js"></script>

<!-- Custom JS -->
<script>
  // Portfolio filters
  // Audio players
  // Scroll animations
  // Stats counters
</script>
```

### 5.3 Custom CSS (Embed)
```css
/* Gradients */
.gradient-primary { ... }

/* Animations */
@keyframes fadeInUp { ... }

/* Utilities */
[data-lift]:hover { transform: translateY(-8px); }

/* Accessibility */
.skip-link { ... }
.sr-only { ... }
```

---

## Phase 6 : SEO & Performance

### 6.1 SEO
- [ ] Page title : "En français s'il vous plaît | Création narrative & musicale sur-mesure"
- [ ] Meta description (voir content/home.json)
- [ ] Meta keywords
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URL
- [ ] Alt text pour toutes les images
- [ ] Aria-labels pour boutons/liens

### 6.2 Performance
- [ ] Compresser vidéo hero (< 5MB idéalement)
- [ ] Lazy load pour vidéo et images below fold
- [ ] Minify CSS/JS custom
- [ ] Utiliser WebP pour images (si présentes)
- [ ] Tester Core Web Vitals
- [ ] TODO : Preloader (voir HTML lignes 273-279)

### 6.3 Accessibility
- [ ] Skip link "Aller au contenu principal"
- [ ] Aria labels sur navigation
- [ ] Focus states visibles
- [ ] Contraste couleurs suffisant (WCAG AA)
- [ ] Keyboard navigation
- [ ] Screen reader friendly

---

## Phase 7 : Testing

### 7.1 Responsive
- [ ] Desktop (1920px, 1440px, 1280px)
- [ ] Tablet (768px, 1024px)
- [ ] Mobile (375px, 414px)
- [ ] Orientation portrait/landscape

### 7.2 Navigateurs
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 10.4 Tests Performance

- [ ] **Google PageSpeed Insights** : Score > 90
- [ ] **Lighthouse** (Chrome DevTools) :
  - Performance : > 90
  - Accessibility : > 95
  - Best Practices : > 90
  - SEO : 100

### 10.5 Tests Accessibilité

- [ ] **WAVE** (WebAIM) : 0 erreurs
- [ ] **Keyboard Navigation** : Tab order logique
- [ ] **Screen Reader** : Tester avec NVDA ou VoiceOver

### 10.6 QA Checklist Détaillée

Voir `/deliverables/check-qa.md` pour la checklist complète.

---

## 🚀 PHASE 11 : Mise en Ligne

### 11.1 Publish

- [ ] **Webflow Designer** > **Publish** (coin haut-droit)
- [ ] Vérifier le site sur `https://enfrancaissvp.fr`

### 11.2 Post-Launch

- [ ] Tester tous les liens en production
- [ ] Vérifier formulaire contact (envoyer un test)
- [ ] Vérifier Google Analytics (si configuré)
- [ ] Tester le site sur mobile (devices réels)
- [ ] Partager sur réseaux sociaux pour tester OG tags

### 11.3 Monitoring

- [ ] **Webflow Analytics** : Activer
- [ ] **Google Search Console** : Soumettre sitemap
- [ ] **Uptime Monitoring** : Configurer (ex: UptimeRobot)

---

## 📝 Notes & Conseils

### Ordre de Travail Optimal

1. **Design System d'abord** : Ne pas commencer les sections avant d'avoir tous les styles prêts.
2. **Collections ensuite** : Créer et peupler le CMS avant de poser les Collection Lists.
3. **Sections par ordre logique** : Top → Bottom (Nav → Hero → ... → Footer).
4. **Interactions à la fin** : Une fois la structure posée, ajouter les interactions.

### Astuces Webflow

- **Symbols** : Créer des Symbols pour Nav et Footer (réutilisables).
- **Classes réutilisables** : Toujours nommer proprement (BEM ou utilitaires).
- **Breakpoints** : Tester chaque section sur tous les breakpoints avant de passer à la suivante.
- **Versionning** : Webflow sauvegarde automatiquement, mais noter les étapes importantes.

### Pièges à Éviter

- ❌ **Styles inline** : Toujours créer des classes, jamais de styles directs.
- ❌ **Trop de nesting** : Limiter la profondeur des divs (max 4-5 niveaux).
- ❌ **Images non optimisées** : Toujours compresser avant upload.
- ❌ **Collections mal structurées** : Vérifier les champs avant d'importer les CSV.

---

## 🎯 Résultat Attendu

À la fin de ce checklist, vous aurez :

✅ Un site Webflow pixel-perfect par rapport au design actuel
✅ Un CMS fonctionnel (Projets, FAQ, Stats)
✅ Des interactions fluides et professionnelles
✅ Un site accessible (AA) et performant (> 90 Lighthouse)
✅ Un domaine connecté (`enfrancaissvp.fr`)
✅ Une page `/experience` en construction

**Prêt à migrer sans refaire deux fois !** 🚀

---

**Fin de la Checklist Webflow Build** ✨
### 7.3 Fonctionnalités
- [ ] Navigation sticky
- [ ] Mobile menu toggle
- [ ] Audio players play/pause
- [ ] Portfolio filters (tous les groupes)
- [ ] Scroll animations
- [ ] Hover states
- [ ] Forms (TODO chunk #2)
- [ ] Links (internal anchors + external)

### 7.4 Performance
- [ ] Lighthouse score (> 90 Desktop, > 80 Mobile)
- [ ] Temps de chargement (< 3s)
- [ ] LCP, FID, CLS (Core Web Vitals)

---

## Phase 8 : Déploiement

- [ ] Vérifier toutes les collections sont remplies
- [ ] Vérifier tous les liens fonctionnent
- [ ] Configurer domaine custom
- [ ] Configurer SSL
- [ ] Publier le site
- [ ] Soumettre sitemap à Google Search Console
- [ ] Configurer analytics (si souhaité)

---

## TODO - Compléments Chunk #2

Les sections suivantes nécessitent la lecture du chunk #2 pour être complétées :

- [ ] Section Process complète
- [ ] Section FAQ complète (questions/réponses)
- [ ] Section Contact (formulaire, infos)
- [ ] Footer (liens, social, légal)
- [ ] Tokens CSS manquants (spacing, shadows, border-radius)
- [ ] Autres pages éventuelles
- [ ] Images additionnelles
- [ ] Contenus textes manquants

---

## Notes d'Implémentation

### Priorités
1. **Phase 1-2** : Configuration + Collections (fondation)
2. **Phase 3** : Build sections visibles dans chunk #1
3. **Phase 4-5** : Interactions + Custom code
4. **Phase 6-8** : Optimisation + Testing + Deploy

### Difficultés Anticipées
- **Audio player custom** : WaveSurfer.js nécessite JS custom, pas natif Webflow
- **Filtres portfolio multi-groupe** : Logic complexe, possiblement Finsweet ou JS custom
- **Video background** : Optimiser taille fichier, fallback image
- **Gradients dynamiques** : Utiliser inline styles ou custom CSS classes

### Outils Recommandés
- **Finsweet Attributes** : Pour filtrage CMS avancé
- **GSAP ou Anime.js** : Pour animations complexes (alternative interactions Webflow)
- **WaveSurfer.js** : Audio waveform
- **Lottie** : Animations vector (si nécessaire)

---

*Checklist brouillon basée sur chunk #1. Sera complétée avec chunk #2 pour sections manquantes.*
