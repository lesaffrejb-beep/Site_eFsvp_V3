# PLAN D'ACTION - CORRECTION DES DIFFÉRENCES

## FICHIERS À MODIFIER/CRÉER

### 1. BLOCS MANQUANTS À CRÉER (4 blocs)

#### A. Bloc Creations (Audio/Gallery)
```
À créer dans: /home/user/eFsvp_maquette/wp-theme-efsvp/blocks/creations/
Files needed:
  ├── block.json
  ├── render.php
  ├── style.css
  ├── editor.css (optionnel)
  └── register dans functions.php
```

**CSS Source**: `/home/user/eFsvp_maquette/src/styles/styles.css` (l.1800-2100+)

**Classes à copier/adapter**:
```css
.audio-section
.creations-grid
.audio-card
.audio-card__image
.audio-card__play
.audio-modal
.swiper
```

#### B. Bloc Process (Timeline)
```
À créer dans: /home/user/eFsvp_maquette/wp-theme-efsvp/blocks/process/
Files needed:
  ├── block.json
  ├── render.php
  ├── style.css
  ├── editor.css (optionnel)
  └── register dans functions.php
```

**CSS Source**: `/home/user/eFsvp_maquette/src/styles/styles.css` (l.1051-1380+)

**Classes à copier/adapter**:
```css
.process
.process__grid
.process__step
.process__step-number
.process__step-content
.process__step-title
.process__connector
```

#### C. Bloc FAQ (Accordéon)
```
À créer dans: /home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/
Files needed:
  ├── block.json
  ├── render.php
  ├── style.css
  ├── editor.css (optionnel)
  └── register dans functions.php
```

**CSS Source**: `/home/user/eFsvp_maquette/src/styles/styles.css` (l.2600-2770+)

**Classes à copier/adapter**:
```css
.faq
.faq__grid
.faq__item
.faq__question
.faq__answer
.faq__search-input
.faq__item.is-active
```

#### D. Bloc Contact (Formulaire)
```
À créer dans: /home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/
Files needed:
  ├── block.json
  ├── render.php
  ├── style.css
  ├── editor.css (optionnel)
  └── register dans functions.php
```

**CSS Source**: `/home/user/eFsvp_maquette/src/styles/styles.css` (l.2773-2933)

**Classes à copier/adapter**:
```css
.contact
.contact__layout
.contact__visual
.contact__form
.form__group
.form__input
.form__label
.form__range
.form__checkmark
.form__group--error
.form__group--success
```

---

### 2. FICHIERS CSS À CRÉER/AJOUTER

#### A. Créer: buttons.css
```
Fichier: /home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/buttons.css
Source: /home/user/eFsvp_maquette/src/styles/styles.css (l.233-373)
Lignes: ~140
Classes:
  - .btn
  - .btn--primary
  - .btn--secondary
  - .btn--small / .btn--primary-small
  - .btn--large
  - .btn--hero
  - .btn--full
  - .btn__icon
  - .btn__loader
  - .btn.loading
```

#### B. Enqueue CSS manquants
**Fichier à modifier**: `/home/user/eFsvp_maquette/wp-theme-efsvp/inc/enqueue-scripts.php`

**À ajouter dans la fonction efsvp_enqueue_assets() (après l.49)**:
```php
// Button styles
wp_enqueue_style(
    'efsvp-buttons',
    EFSVP_THEME_URI . '/assets/css/components/buttons.css',
    ['efsvp-design-system'],
    EFSVP_VERSION
);

// Footer styles
wp_enqueue_style(
    'efsvp-footer',
    EFSVP_THEME_URI . '/assets/css/components/footer.css',
    ['efsvp-design-system'],
    EFSVP_VERSION
);

// Premium enhancements (si créé)
// wp_enqueue_style(
//     'efsvp-premium',
//     EFSVP_THEME_URI . '/assets/css/premium-enhancements.css',
//     [],
//     EFSVP_VERSION
// );
```

---

### 3. FICHIERS À ENQUEUER/INTÉGRER

#### A. Premium Enhancements CSS
**Source**: `/home/user/eFsvp_maquette/src/styles/premium-enhancements.css` (686 lignes)
**Action**: Soit copier dans `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/` et enqueuer, soit importer dans design-system.css

#### B. Premium Unified CSS
**Source**: `/home/user/eFsvp_maquette/src/styles/premium-unified.css` (530 lignes)
**Action**: Soit copier dans `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/` et enqueuer, soit importer dans design-system.css

#### C. Cookie Banner CSS
**Source**: `/home/user/eFsvp_maquette/src/styles/cookie-banner.css` (140 lignes)
**Action**: 
  - Copier dans `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/`
  - Enqueuer dans enqueue-scripts.php

---

### 4. FICHIERS À MODIFIER

#### A. Fonction d'enregistrement des blocs
**Fichier**: `/home/user/eFsvp_maquette/wp-theme-efsvp/functions.php` (l.29-38)

**Modification requise**: Ajouter les nouveaux blocs
```php
function efsvp_register_blocks() {
    $blocks = ['hero', 'services', 'portfolio', 'testimonials', 'cta', 
               'creations', 'process', 'faq', 'contact'];  // ← AJOUTER CES 4
    
    foreach ($blocks as $block) {
        $block_path = EFSVP_THEME_DIR . "/blocks/{$block}";
        if (file_exists("{$block_path}/block.json")) {
            register_block_type($block_path);
        }
    }
}
```

#### B. Fichier style.css du thème (vide actuellement)
**Fichier**: `/home/user/eFsvp_maquette/wp-theme-efsvp/style.css`

**Statut actuel**: Contient seulement 23 lignes (header du thème)

**Option 1**: Laisser vide (recommandé - styles via enqueue)
**Option 2**: Ajouter des styles globaux si nécessaire

#### C. Design Tokens - Ajouter variables manquantes
**Fichier**: `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/design-system.css`

**À ajouter** (après les variables de radius standard):
```css
/* Short aliases for radius */
--r-xs: 0.4rem;
--r-sm: 0.6rem;
--r-md: 0.9rem;
--r-lg: 1.2rem;

/* Short aliases for font sizes */
--fs-xxl: clamp(2.2rem, 2vw + 1.2rem, 3.4rem);
--fs-xl: clamp(1.6rem, 1.2vw + 1rem, 2.4rem);
--fs-lg: clamp(1.25rem, 0.6vw + 0.95rem, 1.5rem);
--fs-md: 1rem;
--fs-sm: 0.9375rem;
--fs-xs: 0.875rem;
```

#### D. Hero Block - Ajouter support sound toggle
**Fichier**: `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php`

**À ajouter** (après les métriques):
```php
<?php if ($show_sound_toggle): ?>
    <div class="efsvp-hero__sound-toggle">
        <button class="efsvp-hero__sound-toggle-btn" aria-pressed="false">
            <!-- SVG icône son -->
        </button>
    </div>
<?php endif; ?>
```

Et dans block.json:
```json
"showSoundToggle": {
    "type": "boolean",
    "default": false
}
```

---

## RÉCAPITULATIF DES FICHIERS À TRAITER

### CRÉER (12 fichiers):
1. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/creations/block.json`
2. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/creations/render.php`
3. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/creations/style.css`
4. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/process/block.json`
5. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/process/render.php`
6. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/process/style.css`
7. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/block.json`
8. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/render.php`
9. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/faq/style.css`
10. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/block.json`
11. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/render.php`
12. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/contact/style.css`

### CRÉER (3 fichiers CSS):
1. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/components/buttons.css`
2. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/premium-enhancements.css` (optionnel - copier source)
3. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/cookie-banner.css` (optionnel)

### MODIFIER (4 fichiers):
1. `/home/user/eFsvp_maquette/wp-theme-efsvp/functions.php` - Ajouter blocs manquants
2. `/home/user/eFsvp_maquette/wp-theme-efsvp/inc/enqueue-scripts.php` - Enqueue CSS manquants
3. `/home/user/eFsvp_maquette/wp-theme-efsvp/assets/css/design-system.css` - Ajouter variables
4. `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/render.php` - Support sound toggle

### ANALYSER (6 fichiers source):
1. `/home/user/eFsvp_maquette/src/styles/styles.css` (3753 lignes) - Extraire CSS pour nouveaux blocs
2. `/home/user/eFsvp_maquette/src/styles/premium-enhancements.css` (686 lignes) - Intégrer ou enqueuer
3. `/home/user/eFsvp_maquette/src/styles/premium-unified.css` (530 lignes) - Intégrer ou enqueuer
4. `/home/user/eFsvp_maquette/src/styles/cookie-banner.css` (140 lignes) - Intégrer ou enqueuer
5. `/home/user/eFsvp_maquette/src/styles/design-tokens.css` (164 lignes) - Variables manquantes
6. `/home/user/eFsvp_maquette/index.html` (1933 lignes) - Structure HTML de référence

---

## ORDRE DE PRIORITÉ

### Phase 1 - CRITIQUE (1-2 jours)
1. Créer bloc creations avec CSS
2. Créer bloc contact avec CSS et formulaire
3. Ajouter CSS des boutons
4. Enqueue CSS manquants
5. Ajouter variables CSS manquantes

### Phase 2 - MAJEURE (2-3 jours)
1. Créer bloc process avec CSS
2. Créer bloc faq avec CSS
3. Améliorer héro (sound toggle)
4. Intégrer premium CSS

### Phase 3 - POLISH (1-2 jours)
1. Cookie banner CSS
2. Tests responsifs
3. Validations accessibilité
4. Optimisations performance

---

## RESSOURCES

**Sources CSS à consulter**:
- `/home/user/eFsvp_maquette/src/styles/styles.css` - Main styles (3753 lignes)
- `/home/user/eFsvp_maquette/index.html` - HTML structure (1933 lignes)

**Blocs WordPress existants comme référence**:
- `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/hero/`
- `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/services/`
- `/home/user/eFsvp_maquette/wp-theme-efsvp/blocks/portfolio/`

