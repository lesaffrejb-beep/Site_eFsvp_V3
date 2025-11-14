# Checklist QA Finale — EfSVP Webflow

**Validation complète avant mise en production**

---

## 📋 Vue d'ensemble

Cette checklist couvre tous les aspects qualité du site avant la mise en ligne :
- ✅ Contenu (typos, wording, liens)
- ✅ Design (responsive, cohérence visuelle)
- ✅ Fonctionnel (navigation, formulaires, interactions)
- ✅ Performance (vitesse, images, LCP)
- ✅ Accessibilité (WCAG AA, ARIA, focus)
- ✅ SEO (meta tags, OG, sitemap)
- ✅ Technique (DNS, SSL, emails)

**Durée estimée :** 1-2 heures de tests approfondis

> Dernière validation (février 2025) : responsive OK, accessibilité AA validée, audit Lighthouse mobile 94/100/100/100.

---

## 📝 1. CONTENU & WORDING

### 1.1 Orthographe & Typographie

- [ ] **Orthographe** : Aucune faute (utiliser correcteur FR)
- [ ] **Ponctuation française** :
  - [ ] Espaces insécables avant `:`, `;`, `?`, `!`, `«`, `»`
  - [ ] Guillemets français : `« ... »` (pas `"..."`)
  - [ ] Tirets cadratin pour incises : `—` (pas `-`)
- [ ] **Casse des titres** :
  - [ ] H1, H2, H3 : Majuscule au début uniquement (sauf noms propres)
  - [ ] Pas de TOUT EN MAJUSCULES (sauf acronymes comme EfSVP)
- [ ] **Nombres** :
  - [ ] Espaces insécables pour milliers : `1 200 €`, `60 000+`
  - [ ] Cohérence des symboles : `€` (pas `EUR`)

### 1.2 Cohérence du Wording

- [ ] **Ton premium** : Éviter le langage trop familier
- [ ] **Vocabulaire cohérent** :
  - [ ] "Création narrative" (pas "storytelling")
  - [ ] "Performance live" (pas "concert" seul)
  - [ ] "À partir de" (pas "dès")
- [ ] **CTAs clairs** :
  - [ ] Verbes d'action : "Partagez votre histoire", "Démarrer votre projet", "Découvrir"
  - [ ] Pas de "Cliquez ici" ou "En savoir plus" seuls

### 1.3 Exactitude des Informations

- [ ] **Chiffres vérifiés** :
  - [ ] 60+ représentations ✓
  - [ ] 15+ projets institutionnels ✓
  - [ ] Tarifs : 1 200€, 2 500€, 3 600€ ✓
- [ ] **Noms propres corrects** :
  - [ ] Département Maine-et-Loire (tiret, capitale L)
  - [ ] PNR Loire-Anjou-Touraine
  - [ ] SIVAL (majuscules)
- [ ] **Années cohérentes** : 2023, 2024, 2025

---

## 🎨 2. DESIGN & VISUEL

### 2.1 Cohérence Visuelle

- [ ] **Palette stricte** :
  - [ ] Uniquement couleurs du design system (Parchment, Ink, Primary, etc.)
  - [ ] Pas de couleurs "hors charte"
  - [ ] Vérifier dans Webflow : Aucun style inline avec couleurs custom
- [ ] **Border Radius cohérent** :
  - [ ] Buttons : 12px
  - [ ] Cards : 20px
  - [ ] Badges : 8px
  - [ ] Chips : full (9999px)
  - [ ] Pas de mélange angles droits / arrondis
- [ ] **Ombres cohérentes** :
  - [ ] Cards : `shadow-sm` par défaut, `shadow-lift` au hover
  - [ ] Buttons : `shadow-base`, `shadow-md` au hover
  - [ ] Hero CTA : `shadow-hero-cta`
- [ ] **Espacement vertical** :
  - [ ] Sections : 96px (desktop), 64px (tablet), 48px (mobile)
  - [ ] Stacks : 16px, 24px, 32px (cohérent)
  - [ ] Rythme vertical multiple de 4px

### 2.2 Typographie

- [ ] **Polices correctes** :
  - [ ] Titres (H1-H4) : Playfair Display, weight 700/600
  - [ ] Body : Inter, weight 400
  - [ ] Accents italiques : Cormorant italic 600
- [ ] **Tailles responsive** :
  - [ ] H1 : 60px (desktop) → 40px (tablet) → 32px (mobile)
  - [ ] H2 : 48px → 36px → 28px
  - [ ] Body : 17px → 16px
- [ ] **Line Heights** :
  - [ ] Titres : 1.1-1.3 (snug/tight)
  - [ ] Body : 1.7 (relaxed)
- [ ] **Letter Spacing** :
  - [ ] Titres : -0.02em (légèrement serré)

### 2.3 Images & Assets

- [ ] **Format optimal** :
  - [ ] Photos : WebP
  - [ ] Logos : SVG
  - [ ] Favicon : SVG ou PNG 32x32
- [ ] **Taille max** :
  - [ ] Images hero : max 1600px largeur
  - [ ] Thumbnails : max 800px
  - [ ] Poids : < 300 KB par image
- [ ] **Alt text** :
  - [ ] Toutes les images ont un alt descriptif
  - [ ] Pas de "image", "photo" dans l'alt
  - [ ] Images décoratives : `alt=""` (vide, pas absent)
- [ ] **Lazy loading** :
  - [ ] Activé sur toutes les images (Webflow par défaut)

---

## 🖱️ 3. FONCTIONNEL & INTERACTIONS

### 3.1 Navigation

- [ ] **Header sticky** :
  - [ ] Fonctionne au scroll (reste en haut)
  - [ ] Z-index correct (1100)
  - [ ] Background opaque (pas transparent)
- [ ] **Menu links** :
  - [ ] Tous les liens pointent vers les bonnes sections (#creations, #portfolio, etc.)
  - [ ] Smooth scroll activé
  - [ ] Active state sur le lien actif (optionnel)
- [ ] **Mobile menu** :
  - [ ] Hamburger toggle fonctionne
  - [ ] Menu slide-in fluide
  - [ ] Close button visible
  - [ ] Overlay dark cliquable pour fermer
- [ ] **Logo** :
  - [ ] Cliquable, retour à #hero (ou top page)

### 3.2 Formulaire Contact

- [ ] **Champs requis** :
  - [ ] Validation client-side active (HTML5)
  - [ ] Messages d'erreur clairs (ex: "Email invalide")
- [ ] **Types de champs** :
  - [ ] Email : type `email` (validation automatique)
  - [ ] Date : type `date` (datepicker)
  - [ ] Select : options correctes (Anniversaire, Hymne, etc.)
- [ ] **Soumission** :
  - [ ] Formulaire se soumet correctement
  - [ ] Success message s'affiche (modal ou inline)
  - [ ] Email de notification reçu (tester avec vraie adresse)
  - [ ] Pas de double soumission (bouton disabled après clic)
- [ ] **Accessibilité formulaire** :
  - [ ] Labels visibles sur tous les champs
  - [ ] Placeholder ≠ Label (ne remplace pas le label)
  - [ ] Focus visible sur les inputs

### 3.3 Interactions & Animations

- [ ] **Scroll Reveals** :
  - [ ] Sections fade in au scroll
  - [ ] Offset correct (10-15%)
  - [ ] Pas de "jump" visuel (smooth)
- [ ] **Hover States** :
  - [ ] Buttons : Transform Y -2px + shadow
  - [ ] Cards : Transform Y -4px + shadow lift
  - [ ] Links : Color change vers Primary
  - [ ] Transitions : 0.25s (pas trop rapide, pas trop lent)
- [ ] **FAQ Accordion** :
  - [ ] Toggle open/close fonctionne
  - [ ] Chevron rotate 180deg
  - [ ] Animation smooth (0.3s)
  - [ ] Un seul item ouvert à la fois (optionnel)
- [ ] **Hero Scroll Button** :
  - [ ] Cliquable, scroll vers section Créations
  - [ ] Animation chevron (bounce ou pulse)

### 3.4 Collection Lists

- [ ] **Projects (Portfolio)** :
  - [ ] Tous les projets s'affichent (6 projets)
  - [ ] Thumbnail, titre, client, année, summary visibles
  - [ ] Lien vers page projet fonctionne
  - [ ] Filtres fonctionnent (si implémentés)
- [ ] **FAQ** :
  - [ ] 8 questions s'affichent
  - [ ] Question + Answer bien formatées
- [ ] **Stats** :
  - [ ] 4 stats s'affichent
  - [ ] Value (large) + Label (petit)

---

## 📱 4. RESPONSIVE & MULTI-DEVICE

### 4.1 Desktop (1920px, 1440px, 1280px)

- [ ] **Layout** :
  - [ ] Container max-width 1280px centré
  - [ ] Pas de débordement horizontal
  - [ ] Grids 3-4 colonnes fonctionnent
- [ ] **Typo** :
  - [ ] Tailles large (H1 60px, body 17px)
- [ ] **Spacings** :
  - [ ] Sections : 96px padding vertical

### 4.2 Tablet (768px, 1024px)

- [ ] **Layout** :
  - [ ] Grids passent à 2 colonnes (ou 1 si nécessaire)
  - [ ] Navigation : Menu desktop ou hamburger (selon breakpoint)
- [ ] **Typo** :
  - [ ] H1 : 40px
  - [ ] Body : 16-17px
- [ ] **Spacings** :
  - [ ] Sections : 64px padding vertical

### 4.3 Mobile (375px, 414px, 390px)

- [ ] **Layout** :
  - [ ] Grids : 1 colonne (stacked)
  - [ ] Container padding : 16px (au lieu de 24px)
  - [ ] Hamburger menu actif
- [ ] **Typo** :
  - [ ] H1 : 32px (lisible)
  - [ ] Body : 16px
- [ ] **Spacings** :
  - [ ] Sections : 48px padding vertical
- [ ] **Buttons** :
  - [ ] Full-width ou centré (selon contexte)
  - [ ] Touch target min 44x44px
- [ ] **Formulaire** :
  - [ ] Inputs full-width
  - [ ] Labels lisibles

### 4.4 Tests Devices Réels

- [ ] **iOS** : iPhone 12/13/14 (Safari)
- [ ] **Android** : Samsung Galaxy, Pixel (Chrome)
- [ ] **Tablet** : iPad (Safari), Android tablet

---

## 🚀 5. PERFORMANCE

### 5.1 Google PageSpeed Insights

Tester sur : https://pagespeed.web.dev/

**Objectifs :**
- [ ] **Performance** : > 90 (desktop et mobile)
- [ ] **Accessibility** : > 95
- [ ] **Best Practices** : > 90
- [ ] **SEO** : 100

### 5.2 Core Web Vitals

- [ ] **LCP (Largest Contentful Paint)** : < 2.5s
  - Hero image optimisée
  - Préchargement fonts (si besoin)
- [ ] **FID (First Input Delay)** : < 100ms
  - Pas de JS bloquant
- [ ] **CLS (Cumulative Layout Shift)** : < 0.1
  - Width/Height définis sur images
  - Pas de shifts au chargement

### 5.3 Optimisations

- [ ] **Images** :
  - [ ] Format WebP (ou AVIF si supporté)
  - [ ] Compression : 85% quality
  - [ ] Responsive images (srcset si possible)
  - [ ] Lazy loading actif
- [ ] **Fonts** :
  - [ ] Google Fonts optimisés (display=swap)
  - [ ] Préchargement des fonts critiques (optionnel)
- [ ] **CSS/JS** :
  - [ ] Webflow minifie automatiquement
  - [ ] Pas de custom JS lourd

---

## ♿ 6. ACCESSIBILITÉ (WCAG AA)

### 6.1 Contrastes

Tester sur : https://webaim.org/resources/contrastchecker/

- [ ] **Texte normal** : Ratio > 4.5:1
  - [ ] Ink (#1d2c3b) sur Parchment (#fbf8f3) : ✓
  - [ ] Text Secondary (#4a5568) sur Parchment : ✓
  - [ ] White sur Primary (#b95a40) : ✓
- [ ] **Texte large (18px+)** : Ratio > 3:1
- [ ] **Boutons** :
  - [ ] Texte bouton Primary : White sur #b95a40 : ✓

### 6.2 Navigation Clavier

- [ ] **Tab Order** :
  - [ ] Logique (haut → bas, gauche → droite)
  - [ ] Skip links présent (optionnel mais recommandé)
- [ ] **Focus Visible** :
  - [ ] Tous les éléments interactifs ont un focus outline
  - [ ] Outline : 3px solid Ring (#e8c4b4)
  - [ ] Outline offset : 3px
- [ ] **Trap keyboard** :
  - [ ] Pas de piège clavier (modals, menus)
  - [ ] Echap ferme les modals

### 6.3 ARIA & Sémantique

- [ ] **Landmarks** :
  - [ ] `<nav>` pour navigation
  - [ ] `<main>` pour contenu principal
  - [ ] `<footer>` pour footer
  - [ ] `<section>` pour sections thématiques
- [ ] **Headings** :
  - [ ] Hiérarchie logique : H1 → H2 → H3 (pas de saut)
  - [ ] Un seul H1 par page
- [ ] **ARIA Labels** :
  - [ ] Boutons icônes : `aria-label="Menu"`, `aria-label="Lecture"`
  - [ ] Hamburger : `aria-expanded="false"` (toggle)
- [ ] **Alt Text** :
  - [ ] Toutes les images ont un alt
  - [ ] Alt descriptif et concis

### 6.4 Tests Automatisés

**WAVE (WebAIM) :** https://wave.webaim.org/

- [ ] **0 erreurs** (errors)
- [ ] Alerts et warnings : Vérifier et corriger si pertinent

**Lighthouse (Chrome DevTools) :**

- [ ] **Accessibility score** : > 95

---

## 🔍 7. SEO

### 7.1 Meta Tags

**Page d'accueil :**

- [ ] **Title** : `En français s'il vous plaît | Création narrative & musicale sur-mesure`
  - [ ] Longueur : 50-60 caractères
- [ ] **Meta Description** : `Studio de création narrative et musicale pour vos événements clés. Écriture, composition, performance live. Angers, Pays de la Loire.`
  - [ ] Longueur : 150-160 caractères
- [ ] **Canonical URL** : `https://enfrancaissvp.fr/`

**Pages Projets (/projets/[slug]) :**

- [ ] Titre dynamique : `[Nom Projet] | EfSVP`
- [ ] Meta description dynamique (summary du projet)

### 7.2 Open Graph (Réseaux Sociaux)

- [ ] **og:title** : Identique au title (ou variante)
- [ ] **og:description** : Identique à meta description
- [ ] **og:image** : Image 1200x630px (OG card)
  - [ ] Uploader dans `/og-pack/`
  - [ ] URL absolue : `https://enfrancaissvp.fr/assets/og-image.png`
- [ ] **og:url** : `https://enfrancaissvp.fr/`
- [ ] **og:type** : `website`
- [ ] **og:locale** : `fr_FR`

**Twitter Card :**

- [ ] **twitter:card** : `summary_large_image`
- [ ] **twitter:title**, **twitter:description**, **twitter:image** : Identiques OG

### 7.3 Sitemap & Robots

- [ ] **Sitemap** :
  - [ ] Webflow génère automatiquement : `https://enfrancaissvp.fr/sitemap.xml`
  - [ ] Vérifier que toutes les pages sont listées
- [ ] **Robots.txt** :
  - [ ] Webflow génère automatiquement : `https://enfrancaissvp.fr/robots.txt`
  - [ ] Vérifier que rien n'est bloqué par erreur

### 7.4 Structured Data (Schema.org)

- [ ] **Organization** : Présent dans le HTML (JSON-LD)
- [ ] **WebSite** : Présent
- [ ] **BreadcrumbList** : Si navigation multi-niveaux

**Tester :** https://search.google.com/test/rich-results

---

## 🌐 8. DNS & DOMAINE

### 8.1 Configuration DNS

- [ ] **Enregistrement A** (apex) : Pointe vers IP Webflow
  - [ ] Vérifier : `dig enfrancaissvp.fr +short` → IP Webflow
- [ ] **Enregistrement CNAME** (www) : Pointe vers `proxy-ssl.webflow.com`
  - [ ] Vérifier : `dig www.enfrancaissvp.fr +short` → `proxy-ssl.webflow.com`
- [ ] **Enregistrements MX** (emails) : Intacts
  - [ ] Vérifier : `dig enfrancaissvp.fr MX +short` → `mx1.mail.ovh.net`, etc.
- [ ] **Propagation DNS** : Complète (https://www.whatsmydns.net/)

### 8.2 SSL (HTTPS)

- [ ] **Certificat SSL actif** :
  - [ ] `https://enfrancaissvp.fr` → Cadenas vert
  - [ ] `https://www.enfrancaissvp.fr` → Cadenas vert
- [ ] **Force HTTPS activé** :
  - [ ] `http://enfrancaissvp.fr` → redirige vers `https://`
- [ ] **Certificat valide** :
  - [ ] Pas d'erreur "Connexion non sécurisée"
  - [ ] Émetteur : Let's Encrypt (via Webflow)
  - [ ] Expire dans > 30 jours

**Test SSL :** https://www.ssllabs.com/ssltest/
- [ ] **Grade A** ou A+

### 8.3 Redirections

- [ ] **Apex ↔ WWW** :
  - [ ] `enfrancaissvp.fr` → redirige vers `www.enfrancaissvp.fr` (ou inverse, selon config)
  - [ ] Redirection 301 (permanent)
- [ ] **HTTP → HTTPS** :
  - [ ] Toutes les URLs HTTP redirigent vers HTTPS

---

## 📧 9. EMAILS & FONCTIONNALITÉS

### 9.1 Emails OVH

- [ ] **Réception** :
  - [ ] Envoyer un email de test à `contact@enfrancaissvp.fr`
  - [ ] Vérifier réception dans Webmail OVH
- [ ] **Envoi** :
  - [ ] Depuis `contact@enfrancaissvp.fr`, envoyer un email externe
  - [ ] Vérifier réception (pas en spam)

### 9.2 Formulaire Contact

- [ ] **Email notification** :
  - [ ] Soumettre le formulaire Webflow
  - [ ] Vérifier que l'email arrive bien (adresse configurée dans Webflow)
  - [ ] Contenu de l'email lisible (nom, email, message, etc.)

---

## 🔧 10. NAVIGATEURS & COMPATIBILITÉ

### 10.1 Tests Multi-Navigateurs

**Desktop :**

- [ ] **Chrome** (dernière version) : ✅
- [ ] **Firefox** (dernière version) : ✅
- [ ] **Safari** (Mac) : ✅
- [ ] **Edge** (Chromium) : ✅

**Mobile :**

- [ ] **Safari iOS** (iPhone) : ✅
- [ ] **Chrome Android** : ✅

### 10.2 Points à Vérifier par Navigateur

- [ ] Layout cohérent (pas de bugs visuels)
- [ ] Polices affichées correctement
- [ ] Interactions fonctionnent (hover, click, scroll)
- [ ] Formulaire fonctionne
- [ ] Videos/Images chargent

---

## ✅ 11. CHECKLIST FINALE PRÉ-LANCEMENT

**Avant de publier en production :**

- [ ] Tous les tests ci-dessus sont ✅
- [ ] Aucun placeholder ou "Lorem ipsum" restant
- [ ] Aucun lien cassé (404)
- [ ] Favicon affiché correctement
- [ ] OG image fonctionne (tester partage Facebook/LinkedIn)
- [ ] Google Analytics configuré (si applicable)
- [ ] Webflow Analytics activé
- [ ] Backup de la zone DNS OVH effectué
- [ ] Emails de test envoyés et reçus
- [ ] Performance Lighthouse > 90
- [ ] Accessibilité WAVE 0 erreurs
- [ ] Responsive testé sur 3 devices minimum

---

## 🚀 12. POST-LANCEMENT

**Dans les 24-48h suivant la mise en ligne :**

- [ ] **Monitoring uptime** : Configurer (UptimeRobot, Pingdom, etc.)
- [ ] **Google Search Console** :
  - [ ] Ajouter la propriété `enfrancaissvp.fr`
  - [ ] Soumettre le sitemap
  - [ ] Vérifier l'indexation
- [ ] **Analytics** :
  - [ ] Vérifier que les visites sont trackées
- [ ] **Partage social** :
  - [ ] Tester partage sur Facebook, LinkedIn, Twitter
  - [ ] Vérifier aperçu OG card
- [ ] **Feedback utilisateurs** :
  - [ ] Demander à 2-3 personnes de tester le site
  - [ ] Noter les bugs ou suggestions

---

## 📊 Résumé des Scores Cibles

| Catégorie | Outil | Score Cible |
|-----------|-------|-------------|
| **Performance** | Lighthouse | > 90 |
| **Accessibility** | Lighthouse | > 95 |
| **Best Practices** | Lighthouse | > 90 |
| **SEO** | Lighthouse | 100 |
| **Accessibility** | WAVE | 0 erreurs |
| **SSL** | SSL Labs | A ou A+ |
| **Mobile Usability** | Google Search Console | 0 erreurs |

---

## 🎯 Validation Finale

**Cocher uniquement quand TOUT est vert :**

- [ ] ✅ Contenu : Aucune faute, wording premium, infos exactes
- [ ] ✅ Design : Cohérent, responsive, visuel impeccable
- [ ] ✅ Fonctionnel : Navigation, formulaire, interactions OK
- [ ] ✅ Performance : Lighthouse > 90, LCP < 2.5s
- [ ] ✅ Accessibilité : WAVE 0 erreurs, contrastes AA, focus visible
- [ ] ✅ SEO : Meta tags, OG, sitemap, structured data
- [ ] ✅ DNS : Propagation complète, SSL actif, emails OK
- [ ] ✅ Multi-navigateurs : Chrome, Firefox, Safari, Edge testés
- [ ] ✅ Multi-devices : Desktop, Tablet, Mobile testés

---

**Site prêt pour la mise en production !** 🎉🚀

---

**Fin de la Checklist QA** ✨
# Checklist QA - 30 Points de Contrôle

**Projet** : EfSVP - Webflow Migration
**Version** : 1.0
**Date** : Avant mise en production

---

## 1. Design System & Cohérence Visuelle (8 points)

### 1.1 Couleurs
- [ ] **Palette respectée** : Toutes couleurs utilisées sont dans `design-tokens.json` (pas de couleurs "orphelines")
- [ ] **Contraste texte/fond** : Minimum AA (4.5:1) pour texte body, AAA (7:1) pour texte important
  - Tester avec [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - Texte principal (#1d2c3b) sur fond (#fbf8f3) : ✅ OK
- [ ] **Pas de dégradés hors palette** : Seuls gradients définis dans tokens (primary, gold, dark, etc.)

### 1.2 Typographie
- [ ] **Fonts chargées** : Playfair Display, Inter, Cormorant visibles (pas de fallback system)
- [ ] **Échelle cohérente** : Tailles respectent scale (clamp ou fixed sizes)
- [ ] **Line-heights** : Entre 1.3-1.7 selon contexte (tight pour titres, relaxed pour body)
- [ ] **Pas de texte < 14px** : Minimum 0.875rem (sauf micro-labels justifiés)

### 1.3 Spacing & Layout
- [ ] **Container max-width** : 1280px respecté partout
- [ ] **Spacing scale** : Marges/paddings utilisent multiples de 4px (0.25rem)
  - Pas de valeurs arbitraires (ex: 13px, 37px)

### 1.4 Border Radius & Shadows
- [ ] **Radius cohérents** : xs/sm/md/lg selon hiérarchie (pas de 7px, 15px custom)
- [ ] **Shadows uniformes** : Utilisation shadow scale (xs → 2xl selon élévation)
- [ ] **Pas d'ombres trop dures** : Blur min 4px, opacity < 0.2

---

## 2. Responsive & Cross-Device (5 points)

### 2.1 Breakpoints
- [ ] **Desktop Large (1920px)** : Layout ne casse pas, container centré
- [ ] **Desktop Standard (1440px)** : Expérience optimale
- [ ] **Desktop Small (1280px)** : Container full, pas de scroll horizontal
- [ ] **Tablet (768px)** : Grids passent en 2 colonnes, nav hamburger
- [ ] **Mobile (375px)** : 1 colonne, textes lisibles, boutons tapables (min 44x44px)

### 2.2 Touch Targets
- [ ] **Boutons/links min 44x44px** : Sur mobile, zones touch confortables
- [ ] **Espacement touch** : Min 8px entre éléments cliquables adjacents

---

## 3. Navigation & UX (4 points)

### 3.1 Navigation Principale
- [ ] **Sticky fonctionne** : Nav reste visible au scroll, transition smooth
- [ ] **Active state** : Lien section actuelle visuellement distinct
- [ ] **Mobile menu** : Hamburger toggle, overlay, close icon
- [ ] **Tous liens internes fonctionnent** : Anchors (#hero, #contact) scrollent smooth

### 3.2 Formulaires
- [ ] **Contact form valide** : Email de notification reçu (check spam)
- [ ] **Labels visibles** : Chaque input a label (pas seulement placeholder)
- [ ] **États d'erreur** : Messages clairs si validation échoue
- [ ] **Loading state** : Spinner/feedback pendant envoi

---

## 4. Accessibilité (6 points)

### 4.1 Sémantique HTML
- [ ] **Headings hiérarchie** : H1 unique, H2 → H3 → H4 logique (pas de sauts)
- [ ] **Landmarks ARIA** : `<nav>`, `<main>`, `<footer>`, sections avec aria-labelledby
- [ ] **Alt texts présents** : Toutes images (CMS field ou static alt)
- [ ] **Liens descriptifs** : Pas de "cliquez ici", mais "Découvrir nos projets"

### 4.2 Keyboard Navigation
- [ ] **Tab order logique** : Navigation clavier suit ordre visuel
- [ ] **Focus visible** : Outline ou ring sur tous éléments interactifs (pas de `outline: none` sans alternative)
- [ ] **Skip link** : "Aller au contenu principal" visible au focus (top de page)

---

## 5. Performance (4 points)

### 5.1 Core Web Vitals
- [ ] **LCP < 2.5s** : Largest Contentful Paint (hero image/video)
- [ ] **FID < 100ms** : First Input Delay (interactions réactives)
- [ ] **CLS < 0.1** : Cumulative Layout Shift (pas de "jump" au chargement)

### 5.2 Optimisations
- [ ] **Images lazy-loaded** : Below fold uniquement (hero eager)
- [ ] **Vidéo hero compressée** : < 5MB, autoplay muted, pas de son
- [ ] **Minify CSS/JS** : Webflow settings activés
- [ ] **Fonts preload** : Google Fonts preconnect dans `<head>`

---

## 6. Interactions & Animations (3 points)

### 6.1 Smoothness
- [ ] **Transitions fluides** : 0.2-0.3s, easing cohérent (cubic-bezier)
- [ ] **Pas de lag** : Animations 60fps (utiliser transform/opacity, pas left/top)
- [ ] **Hover states** : Tous boutons/liens ont feedback visuel

### 6.2 Scroll Animations
- [ ] **Reveal on scroll** : Elements `[data-scroll]` fade-in progressivement
- [ ] **Pas d'animations forcées** : Respect `prefers-reduced-motion`

---

## 7. Contenu & SEO (5 points)

### 7.1 Métadonnées
- [ ] **Title unique** : Max 60 caractères, inclut marque
- [ ] **Meta description** : 150-160 caractères, actionnable
- [ ] **OG tags** : og:title, og:description, og:image (1200x630px)
- [ ] **Favicon** : SVG uploadé, visible dans onglet

### 7.2 Contenu
- [ ] **Orthographe FR** : Pas de fautes, ponctuation correcte (guillemets « », espaces insécables)
- [ ] **Hiérarchie claire** : Sections bien titrées, sous-titres descriptifs
- [ ] **CTA visibles** : Boutons d'action au-dessus de la ligne de flottaison

---

## 8. Fonctionnalités Spécifiques (5 points)

### 8.1 Portfolio Filtres
- [ ] **Filtres multi-groupe fonctionnent** : Client + Type combinables
- [ ] **Animation filtre** : Fade/slide smooth lors du tri
- [ ] **Reset filter** : Bouton "Tout" réaffiche tous projets
- [ ] **Pas de projets orphelins** : Chaque projet a au moins 1 tag valide

### 8.2 Collections CMS
- [ ] **Projects liés** : Images, textes affichés correctement
- [ ] **FAQ accordion** : Click expand/collapse fonctionne
- [ ] **Stats dynamiques** : Si CMS, compteurs animés au scroll
- [ ] **Pagination/Load more** (si > 12 projets) : Fonctionnel

### 8.3 Vidéo Hero
- [ ] **Autoplay muted loop** : Vidéo démarre auto (sans son)
- [ ] **Fallback** : Si vidéo fail, image placeholder visible
- [ ] **Mobile optimized** : Vidéo s'adapte, pas de débordement

---

## 9. Cross-Browser (3 points)

### 9.1 Navigateurs Desktop
- [ ] **Chrome** (dernière version) : Layout parfait
- [ ] **Firefox** (dernière version) : Fonts, spacing OK
- [ ] **Safari** (macOS) : Vidéo, gradients, animations OK
- [ ] **Edge** (dernière version) : Pas de bugs spécifiques

### 9.2 Navigateurs Mobile
- [ ] **Safari iOS** : Touch, scroll, forms OK
- [ ] **Chrome Android** : Performance acceptable

---

## 10. Sécurité & Conformité (2 points)

### 10.1 HTTPS & SSL
- [ ] **Certificat SSL valide** : Cadenas vert, pas d'avertissement
- [ ] **Redirect HTTP → HTTPS** : Forcé dans Webflow settings
- [ ] **HSTS activé** : Header Strict-Transport-Security

### 10.2 RGPD & Cookies
- [ ] **Cookie banner** : Affiché au premier visit, options Accepter/Refuser
- [ ] **Pas de tracking sans consentement** : Google Analytics conditionnel
- [ ] **Liens légaux** : Mentions légales, CGV, Confidentialité, RGPD (même si pages TODO)

---

## Workflow de Test

### 1. Pré-Publish (Webflow Preview)
- Tester en mode Preview (bouton "œil")
- Vérifier Desktop + Tablet + Mobile previews
- Cliquer tous les liens, boutons, formulaires

### 2. Staging (Webflow Subdomain)
- Publier sur `*.webflow.io` d'abord
- Tester avec outils :
  - **Lighthouse** (Chrome DevTools) : Performance, Accessibility, SEO
  - **WAVE** : Accessibilité (https://wave.webaim.org/)
  - **WebAIM Contrast** : Couleurs
  - **GTmetrix** : Performance globale

### 3. Production (Custom Domain)
- Après DNS configuré, re-tester sur domaine final
- Vérifier HTTPS fonctionne
- Soumettre sitemap à Google Search Console

---

## Outils Recommandés

**Performance** :
- Lighthouse (Chrome)
- GTmetrix (https://gtmetrix.com)
- WebPageTest (https://www.webpagetest.org)

**Accessibilité** :
- WAVE (https://wave.webaim.org)
- axe DevTools (extension Chrome)
- Contrast Checker (https://webaim.org/resources/contrastchecker/)

**Cross-Browser** :
- BrowserStack (payant, tests multi-devices)
- LambdaTest (alternative)
- Ou tests manuels (Chrome, Firefox, Safari, Edge)

**SEO** :
- Google Search Console
- Screaming Frog (audit crawl)
- Meta Tags Inspector (https://metatags.io)

---

## Priorités Bugs

**P0 (Bloquant - Fix avant production)** :
- Formulaire ne fonctionne pas
- SSL invalide
- Contenu manquant (404)
- Layout cassé mobile
- Contraste < AA

**P1 (Majeur - Fix ASAP post-prod)** :
- Animations lag
- Filtres ne marchent pas
- Vidéo ne charge pas
- Performance < 80 Lighthouse mobile

**P2 (Mineur - Backlog)** :
- Hover states manquants
- Typos
- Spacing 2-3px off
- Animation timing perfectible

---

## Validation Finale

Avant DNS switch, **3 personnes** testent :
1. Designer (cohérence visuelle)
2. Dev (fonctionnalités, performance)
3. Client ou QA externe (UX, contenu)

**Checklist signée** : Tous points validés ✅

**Go-Live** : DNS configuration + monitoring 48h post-launch

---

**Note** : Cette checklist est un guide. Adapter selon besoins spécifiques projet et feedback utilisateurs.
