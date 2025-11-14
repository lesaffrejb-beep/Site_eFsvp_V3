# RAPPORT DE COMPARAISON - MAQUETTE HTML vs THÈME WORDPRESS

## RÉSUMÉ EXÉCUTIF
- **Total lignes CSS maquette HTML**: 5558 lignes
- **Total lignes CSS thème WordPress**: 1518 lignes
- **Réduction CSS**: 72.7% (Beaucoup de styles manquants)
- **Sections dans la maquette**: hero, creations (audio), services, portfolio, process, faq, contact
- **Sections WordPress**: hero, services, portfolio, testimonials, cta (5 au lieu de 7)

---

## 1. DIFFÉRENCES MAJEURES - SECTIONS MANQUANTES

### Sections présentes dans HTML mais absentes dans WordPress:

| Section | Fichier HTML | Type | Status WordPress |
|---------|--------------|------|-----------------|
| **Creations** | `id="creations"` (l.424) | Audio/Galerie vidéo | ❌ MANQUANTE |
| **Process** | `id="process"` (l.1051) | Timeline/Étapes | ❌ MANQUANTE |
| **FAQ** | `id="faq"` (l.1383) | Accordéon | ❌ MANQUANTE |
| **Contact** | `id="contact"` (l.1622) | Formulaire de contact | ❌ MANQUANTE |
| **Testimonials** | Pas de section spécifique | Témoignages | ✅ Créé mais style différent |

### Fichiers CSS manquants (2140 lignes):
- **premium-unified.css** (530 lignes) - Jamais chargé
- **premium-enhancements.css** (686 lignes) - Jamais chargé  
- **cookie-banner.css** (140 lignes) - Jamais chargé
- Styles de sections: creations, process, faq, contact, form (784 lignes)

---

## 2. DIFFÉRENCES DE STYLES CSS

### A. Variables CSS & Design Tokens
**Fichier maquette**: `/home/user/eFsvp_maquette/src/styles/design-tokens.css` (164 lignes)
**Fichier WordPress**: `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/design-system.css` (339 lignes)

**Problème**: Le fichier design-system.css du WordPress a les tokens mais certains éléments diffèrent:
- Les alias CSS court (--r-xs, --r-sm, --r-md, --r-lg) présents dans le design-tokens original
- Les variables de texture SVG (--grain) présentes dans le design-tokens

### B. Styles de Boutons (MANQUANTS)
**Fichier HTML**: `.btn` styles (lignes 233-373) ✅ 140 lignes
**Fichier WordPress**: Aucun fichier CSS spécifique pour les boutons ❌

Classes manquantes:
```css
.btn { } /* Base button styling */
.btn--primary { }
.btn--secondary { }
.btn--small, .btn--primary-small { }
.btn--large { }
.btn--hero { } /* Hero-specific styling */
.btn--full { }
.btn__icon { }
.btn__loader { }
.btn.loading { } /* Loading state animations */
```

**Impact**: Les boutons dans WordPress n'auront pas le même design/animations que la maquette.

### C. Styles de Formulaires (MANQUANTS)
**Fichier HTML**: `.form__` et `.contact` (400+ lignes)
**Fichier WordPress**: Aucun fichier CSS spécifique ❌

Classes manquantes:
```css
.form__group { }
.form__input { }
.form__label { }
.form__range { }
.form__checkmark { }
.form__group--error { }
.form__group--success { }
.contact { }
.contact__layout { }
.contact__form { }
.contact__visual { }
```

### D. Styles de la Section "Creations" (COMPLÈTEMENT MANQUANT)
**Fichier HTML**: `.audio-section` (300+ lignes)
**Fichier WordPress**: ❌ Aucun bloc "creations"

Classes manquantes:
```css
.audio-section { }
.creations-grid { }
.audio-card { }
.audio-card__image { }
.audio-card__play { }
.audio-card__title { }
.audio-modal { }
.audio-video-container { }
.swiper { } /* Carousel library */
```

### E. Styles de la Section "Process" (COMPLÈTEMENT MANQUANT)
**Fichier HTML**: `.process` (300+ lignes)
**Fichier WordPress**: ❌ Aucun bloc "process"

Classes manquantes:
```css
.process { }
.process__grid { }
.process__step { }
.process__step-number { }
.process__step-content { }
.process__step-title { }
.process__connector { }
```

### F. Styles de la Section "FAQ" (COMPLÈTEMENT MANQUANT)
**Fichier HTML**: `.faq` (350+ lignes)
**Fichier WordPress**: ❌ Aucun bloc "faq"

Classes manquantes:
```css
.faq { }
.faq__grid { }
.faq__item { }
.faq__question { }
.faq__answer { }
.faq__search-input { }
.faq__item.is-active { }
```

### G. Styles Cookie Banner (MANQUANT)
**Fichier HTML**: `/home/user/eFsvp_maquette/src/styles/cookie-banner.css` (140 lignes)
**Fichier WordPress**: Aucun fichier CSS ❌

---

## 3. DIFFÉRENCES DE STRUCTURE HTML vs PHP

### A. Section Hero

**HTML** (`/home/user/eFsvp_maquette/index.html` lignes 325-424):
```html
<section class="hero" id="hero">
  <div class="hero__video-container">
    <div class="hero__video-placeholder"></div>
  </div>
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">
      <span class="hero__title-line hero__title-line--primary">...</span>
      <span class="hero__title-line hero__title-line--secondary">...</span>
    </h1>
    <p class="hero__subtitle">...</p>
    <div class="hero__cta-group">
      <a class="btn btn--primary btn--hero">...</a>
      <button class="hero__sound-toggle">...</button>
    </div>
    <div class="hero__trust-metrics">...</div>
  </div>
</section>
```

**WordPress** (`/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php`):
```php
<section class="efsvp-hero">
  <div class="efsvp-hero__background">
    <img />
    <div class="efsvp-hero__overlay"></div>
  </div>
  <div class="efsvp-hero__content">
    <h1 class="efsvp-hero__title">...</h1>
    <p class="efsvp-hero__subtitle">...</p>
    <p class="efsvp-hero__description">...</p>
    <div class="efsvp-hero__actions">
      <a class="efsvp-hero__cta">...</a>
    </div>
    <div class="efsvp-hero__metrics">...</div>
  </div>
</section>
```

**Différences identifiées**:
1. ✅ Structure similaire mais nommage des classes différent (`hero` → `efsvp-hero`)
2. ❌ Pas d'élément `hero__sound-toggle` dans WordPress
3. ❌ Pas de structure `hero__video-container` - remplacée par `background` + `img`
4. ❌ Pas de "hero__title-line" - lignes de titre séparées
5. ✅ Métrique affichées de manière similaire
6. ⚠️ Classe bouton différente: `btn btn--primary btn--hero` → `efsvp-hero__cta`

### B. Section Services

**HTML** (lignes 772-884):
- Classes: `.services`, `.services__grid`, `.service-card`, `.service-card__icon`, etc.
- Style: Grille de services en cartes

**WordPress** (`blocks/services/render.php`):
- Classes: `.efsvp-services`, `.efsvp-services__grid`, `.efsvp-service-card`
- ✅ Structure équivalente
- ✅ Classes similaires

**Différences**: Mineure - principalement un renommage de préfixe (`service` → `efsvp-service`)

### C. Section Portfolio

**HTML** (lignes 885-1050):
- Classes: `.portfolio`, `.portfolio-grid`, `.portfolio-card`
- Inclut des images et des overlays

**WordPress** (`blocks/portfolio/render.php`):
- Classes: `.efsvp-portfolio`, `.efsvp-portfolio__grid`, `.efsvp-portfolio-card`
- ✅ Structure équivalente
- ✅ Les images et overlays sont présents

**Différences**: Mineure - renommage de préfixe

### D. Section Contact (COMPLÈTEMENT MANQUANTE)

**HTML** (lignes 1622-1933):
```html
<section class="contact" id="contact">
  <div class="contact__layout">
    <div class="contact__visual">...</div>
    <form class="contact-form">
      <div class="form__group">
        <input type="text" class="form__input" />
        <label class="form__label">...</label>
      </div>
      ...
    </form>
  </div>
</section>
```

**WordPress**: ❌ Aucun équivalent

**CSS manquant**: 311 lignes de styles pour `.contact`, `.form__*`, `.form__group*`, etc.

---

## 4. FICHIERS CSS NON CHARGÉS/MANQUANTS

### Fichiers CSS présents dans HTML mais pas dans WordPress:

| Fichier | Lignes | Contenu | Chemin |
|---------|--------|---------|---------|
| **premium-enhancements.css** | 686 | Animations, effets avancés | `/home/user/eFsvp_maquette/src/styles/premium-enhancements.css` |
| **premium-unified.css** | 530 | Unification des styles premium | `/home/user/eFsvp_maquette/src/styles/premium-unified.css` |
| **cookie-banner.css** | 140 | Styles de la banneau de cookies | `/home/user/eFsvp_maquette/src/styles/cookie-banner.css` |

**Reference dans HTML** (lignes 196-209):
```html
<link rel="stylesheet" href="/src/styles/design-tokens.css" />
<link rel="stylesheet" href="/src/styles/design-system.css" />
<link rel="stylesheet" href="/src/styles/styles.css" />
<link rel="stylesheet" href="/src/styles/premium-enhancements.css" />
<link rel="stylesheet" href="/src/styles/premium-unified.css" />
<link rel="stylesheet" href="/src/styles/cookie-banner.css" />
```

**Référence dans WordPress** (`inc/enqueue-scripts.php`):
```php
wp_enqueue_style('efsvp-design-system', '/assets/css/design-system.css');
wp_enqueue_style('efsvp-main', get_stylesheet_uri()); // style.css (23 lignes)
wp_enqueue_style('efsvp-components', '/assets/css/components/header.css');
```

**Problème**: Les fichiers CSS supplémentaires ne sont pas inclus dans l'enqueue WordPress.

---

## 5. DIFFÉRENCES DE DESIGN SYSTEM

### Variables CSS manquantes ou différentes:

**Alias short radius dans HTML** (`design-tokens.css` l.122-127):
```css
--r-xs: 0.4rem;
--r-sm: 0.6rem;
--r-md: 0.9rem;
--r-lg: 1.2rem;
```
❌ Non présent dans design-system.css WordPress

**Variables de typographie complémentaires**:
- `--fs-xxl`, `--fs-xl`, `--fs-lg`, `--fs-md`, `--fs-sm`, `--fs-xs` (HTML) ❌ Manquantes dans WordPress

---

## 6. DIFFÉRENCES DE TECHNOLOGIE & DÉPENDANCES

### HTML original:
```html
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
```
- Utilise **Swiper** pour les carousels (ligne 193)
- ❌ Non intégré dans WordPress

### WordPress:
- Utilise uniquement les blocs Gutenberg natifs
- Pas de dépendances JavaScript externes (sauf Google Fonts)

---

## 7. SECTIONS ET FONCTIONNALITÉS MANQUANTES

| Feature | HTML | WordPress | Status |
|---------|------|-----------|--------|
| Hero avec vidéo/image | ✅ | ✅ | Implémenté |
| Section Services | ✅ | ✅ | Implémenté |
| Section Portfolio | ✅ | ✅ | Implémenté |
| Section Testimonials | ✅ | ✅ | Créé comme "testimonials" (pas "creations") |
| Section CTA | ✅ | ✅ | Implémenté |
| **Section Creations (Audio)** | ✅ | ❌ | MANQUANT |
| **Section Process** | ✅ | ❌ | MANQUANT |
| **Section FAQ** | ✅ | ❌ | MANQUANT |
| **Section Contact/Form** | ✅ | ❌ | MANQUANT |
| Bouton avec animations | ✅ | ❌ | Styles manquants |
| Formulaire de contact | ✅ | ❌ | MANQUANT |
| Cookie banner | ✅ | ❌ | MANQUANT |
| Navigation sticky | ✅ | ✅ | Présent dans header.php |

---

## 8. PROBLÈMES D'ENQUEUE CSS

### WordPress (`inc/enqueue-scripts.php` l.28-49):

**CSS chargés**:
1. ✅ Google Fonts (correct)
2. ✅ Design System (`design-system.css`)
3. ✅ Main stylesheet (`style.css` - 23 lignes vides)
4. ✅ Components/Header (`components/header.css`)

**CSS manquants**:
1. ❌ `premium-enhancements.css` - Jamais enqueued
2. ❌ `premium-unified.css` - Jamais enqueued
3. ❌ `components/footer.css` - Enqueued mais peut être amélioré
4. ❌ Styles spécifiques aux blocs: `blocks/*/style.css` (dépend de Gutenberg)

---

## 9. CHEMIN DES FICHIERS CRITIQUES

### Fichiers CSS à analyser/corriger:

```
/home/user/eFsvp_maquette/src/styles/
├── design-tokens.css (164 lignes) - ✅ Adapté en WordPress
├── design-system.css (285 lignes) - ✅ Adapté en WordPress (339 lignes)
├── styles.css (3753 lignes) - ⚠️ Partiellement adapté
├── premium-enhancements.css (686 lignes) - ❌ MANQUANT
├── premium-unified.css (530 lignes) - ❌ MANQUANT
└── cookie-banner.css (140 lignes) - ❌ MANQUANT

/home/user/eFsvp_maquette/wp-theme-efsvp/
├── style.css (23 lignes - VIDE)
├── assets/css/
│   ├── design-system.css (339 lignes) - ✅ Présent
│   ├── gutenberg.css (117 lignes)
│   └── components/
│       ├── header.css (202 lignes) - ✅ Présent
│       └── footer.css (84 lignes) - ✅ Présent
└── blocks/
    ├── hero/
    │   ├── style.css (161 lignes) - Styles spécifiques au bloc
    │   └── render.php
    ├── services/
    │   ├── style.css (92 lignes)
    │   └── render.php
    ├── portfolio/
    │   ├── style.css (140 lignes)
    │   └── render.php
    ├── testimonials/
    │   ├── style.css (179 lignes)
    │   └── render.php
    └── cta/
        ├── style.css (132 lignes)
        └── render.php
```

---

## 10. RECOMMANDATIONS DE CORRECTION

### HAUTE PRIORITÉ:
1. **Créer blocs manquants**: Creations (audio), Process, FAQ, Contact
2. **Ajouter styles manquants**: Boutons, formulaires, cookie banner
3. **Enqueue les fichiers CSS**: premium-enhancements.css, premium-unified.css
4. **Ajouter variables CSS manquantes**: Alias short radius, alias typographie

### MOYEN PRIORITÉ:
5. Adapter les structures HTML/PHP pour la maquette (bouton sound toggle, etc.)
6. Intégrer Swiper pour les carousels de creations
7. Implémenter les animations du footer

### BASSE PRIORITÉ:
8. Optimiser les breakpoints responsifs
9. Tester les performances
10. Valider l'accessibilité WCAG

---

## RÉSUMÉ DES DIFFÉRENCES QUANTITATIVES

| Métrique | HTML Maquette | WordPress | Écart |
|----------|---------------|-----------|-------|
| Lignes CSS totales | 5558 | 1518 | -72.7% |
| Sections principales | 7 | 5 | -2 sections |
| Fichiers CSS | 6 | 4 | -2 fichiers |
| Classes CSS uniques | ~250 | ~80 | -68% |
| Blocs Gutenberg | 0 | 5 | +5 blocs |
| Formulaires | Oui | Non | Non implémenté |

