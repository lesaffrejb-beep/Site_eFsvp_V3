# Webflow Styles Guide — EfSVP

Guide complet des styles à créer dans Webflow pour recréer fidèlement l'identité visuelle actuelle.

---

## 📐 Principes de Design

### Règles d'or

1. **Cohérence des rayons** : Pas de mélange angles droits / arrondis. Toujours utiliser des rayons arrondis (8px, 12px, 20px).
2. **Pas de dégradés hors palette** : Uniquement les couleurs de la palette parchemin/encre/terre cuite.
3. **Contrastes AA minimum** : Toujours vérifier les contrastes texte/fond (4.5:1 pour texte normal, 3:1 pour large).
4. **Rythme vertical cohérent** : Espacements multiples de 4px (8, 12, 16, 24, 32, 48, 64).
5. **Sobriété premium** : Éviter les animations tape-à-l'œil. Transitions douces et subtiles.

---

## 🎨 Palette de Couleurs (Swatches Webflow)

Créer ces couleurs en tant que **Swatches** dans Webflow :

### Couleurs Principales

| Nom              | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `Primary`        | `#b95a40` | CTA, accents, liens            |
| `Primary Hover`  | `#d16d52` | État hover des CTA             |
| `Primary Active` | `#a04a32` | État actif des CTA             |
| `Secondary`      | `#8a8a68` | Accent naturel secondaire      |
| `Accent Camel`   | `#c39d6b` | Badges, détails chaleureux     |
| `Accent Beige`   | `#e6d9c3` | Fond secondaire doux           |
| `Accent Gold`    | `#f3b47a` | Détails premium                |

### Couleurs de Texte

| Nom              | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `Ink`            | `#1d2c3b` | Texte principal                |
| `Charcoal`       | `#2d3748` | Titres secondaires             |
| `Text Secondary` | `#4a5568` | Texte secondaire               |
| `Text Tertiary`  | `#6b7280` | Texte tertiaire, muted         |
| `Muted`          | `#9ca3af` | Texte désactivé                |
| `Text Inverse`   | `#fefefe` | Texte sur fond sombre          |

### Couleurs de Fond

| Nom                | Hex       | Usage                          |
|--------------------|-----------|--------------------------------|
| `Parchment`        | `#fbf8f3` | Fond principal du site         |
| `Sand`             | `#faf6f0` | Surfaces, cards                |
| `Sand Deep`        | `#f0e9dc` | Surfaces dimmed                |
| `Surface Elevated` | `#ffffff` | Cards surélevées               |
| `BG Dark`          | `#0f141a` | Fond sombre (header, footer)   |
| `BG Dark 2`        | `#141e26` | Gradient fond sombre           |
| `Hero Dark`        | `#0f1926` | Fond hero sombre               |

### Couleurs de Bordure

| Nom              | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `Border`         | `#ddd5c8` | Bordures subtiles              |
| `Border Strong`  | `#c5b9a8` | Bordures marquées              |
| `Ring`           | `#e8c4b4` | Focus rings                    |

---

## 🔤 Typographie Globale

### Polices (Google Fonts)

Ajouter ces 3 polices dans Webflow (Project Settings > Fonts) :

1. **Playfair Display** : `400, 500, 600, 700, 800, 900`
2. **Inter** : `400, 500, 600, 700, 800`
3. **Cormorant** : `italic 600`

### Styles de Texte Globaux

Créer ces styles dans **Typography** :

#### Body (All Paragraphs)
- Font : `Inter`
- Size : `17px` (desktop), `16px` (mobile)
- Line Height : `1.7`
- Color : `Ink`
- Letter Spacing : `0`

#### H1 (All H1 Headings)
- Font : `Playfair Display`
- Weight : `700`
- Size : `60px` (desktop), `40px` (tablet), `32px` (mobile)
- Line Height : `1.1`
- Letter Spacing : `-0.02em`
- Color : `Ink`

#### H2 (All H2 Headings)
- Font : `Playfair Display`
- Weight : `700`
- Size : `48px` (desktop), `36px` (tablet), `28px` (mobile)
- Line Height : `1.3`
- Letter Spacing : `-0.02em`
- Color : `Ink`

#### H3 (All H3 Headings)
- Font : `Playfair Display`
- Weight : `600`
- Size : `32px` (desktop), `28px` (tablet), `24px` (mobile)
- Line Height : `1.3`
- Letter Spacing : `-0.02em`
- Color : `Ink`

#### H4 (All H4 Headings)
- Font : `Playfair Display`
- Weight : `600`
- Size : `24px` (desktop), `22px` (tablet), `20px` (mobile)
- Line Height : `1.5`
- Letter Spacing : `-0.01em`
- Color : `Ink`

#### Link (All Links)
- Color : `Ink`
- Hover Color : `Primary`
- Transition : `color 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- Text Decoration : `none`

---

## 📦 Classes Utilitaires à Créer

### Layout & Container

#### `.container`
- Max Width : `1280px`
- Padding Left/Right : `24px` (desktop), `16px` (mobile)
- Margin : `0 auto`
- Width : `100%`

#### `.section`
- Padding Top/Bottom : `96px` (desktop), `64px` (tablet), `48px` (mobile)
- Background : `transparent`

#### `.section--dark`
- Background : `BG Dark`
- Color : `Text Inverse`

#### `.section--surface`
- Background : `Sand`

### Grid System

#### `.grid-12`
- Display : `Grid`
- Grid Columns : `repeat(12, 1fr)`
- Gap : `24px` (desktop), `16px` (mobile)

#### `.grid-2`
- Display : `Grid`
- Grid Columns : `repeat(2, 1fr)` (desktop), `1fr` (mobile)
- Gap : `24px`

#### `.grid-3`
- Display : `Grid`
- Grid Columns : `repeat(3, 1fr)` (desktop), `repeat(2, 1fr)` (tablet), `1fr` (mobile)
- Gap : `24px`

### Stack (Vertical Spacing)

#### `.stack-8`
- Display : `Flex`
- Flex Direction : `Column`
- Gap : `8px`

#### `.stack-12`
- Display : `Flex`
- Flex Direction : `Column`
- Gap : `12px`

#### `.stack-16`
- Display : `Flex`
- Flex Direction : `Column`
- Gap : `16px`

#### `.stack-24`
- Display : `Flex`
- Flex Direction : `Column`
- Gap : `24px`

#### `.stack-32`
- Display : `Flex`
- Flex Direction : `Column`
- Gap : `32px`

### Buttons

#### `.btn`
- Display : `Inline Flex`
- Align Items : `Center`
- Gap : `8px`
- Padding : `16px 32px`
- Border Radius : `12px`
- Font Family : `Inter`
- Font Weight : `600`
- Font Size : `16px`
- Line Height : `1.5`
- Transition : `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- Cursor : `Pointer`
- Border : `none`

#### `.btn--primary`
- Background : `Primary`
- Color : `white`
- Box Shadow : `0 4px 8px rgba(0, 0, 0, 0.08)`
- **Hover** :
  - Background : `Primary Hover`
  - Box Shadow : `0 8px 16px rgba(0, 0, 0, 0.12)`
  - Transform : `translateY(-2px)`

#### `.btn--primary-small`
- Padding : `12px 24px`
- Font Size : `15px`

#### `.btn--secondary`
- Background : `transparent`
- Color : `Ink`
- Border : `2px solid Border Strong`
- **Hover** :
  - Background : `Sand`
  - Border Color : `Primary`

#### `.btn--hero`
- Padding : `20px 40px`
- Font Size : `18px`
- Box Shadow : `0 24px 48px rgba(0, 0, 0, 0.4)`

### Cards

#### `.card`
- Background : `Surface Elevated`
- Border : `1px solid Border`
- Border Radius : `20px`
- Padding : `32px`
- Box Shadow : `0 2px 4px rgba(0, 0, 0, 0.06)`
- Transition : `all 0.25s cubic-bezier(0.4, 0, 0.2, 1)`
- **Hover** :
  - Box Shadow : `0 12px 24px rgba(0, 0, 0, 0.12)`
  - Transform : `translateY(-4px)`

#### `.card--flat`
- Box Shadow : `none`
- Border : `1px solid Border`

#### `.card--dark`
- Background : `BG Dark 2`
- Color : `Text Inverse`
- Border : `1px solid rgba(255, 255, 255, 0.1)`
- Box Shadow : `0 16px 40px rgba(0, 0, 0, 0.25)`

### Badges & Chips

#### `.badge`
- Display : `Inline Block`
- Padding : `6px 12px`
- Border Radius : `8px`
- Font Size : `14px`
- Font Weight : `600`
- Line Height : `1.2`

#### `.badge--primary`
- Background : `Primary`
- Color : `white`

#### `.badge--camel`
- Background : `Accent Camel`
- Color : `white`

#### `.badge--outline`
- Background : `transparent`
- Border : `1.5px solid Border Strong`
- Color : `Text Secondary`

#### `.chip`
- Display : `Inline Flex`
- Align Items : `Center`
- Padding : `8px 16px`
- Border Radius : `full (9999px)`
- Background : `Sand Deep`
- Color : `Ink`
- Font Size : `14px`
- Font Weight : `500`
- Transition : `all 0.2s ease`
- **Hover** :
  - Background : `Primary`
  - Color : `white`

### Text Utilities

#### `.text-muted`
- Color : `Text Secondary`

#### `.text-tertiary`
- Color : `Text Tertiary`

#### `.text-inverse`
- Color : `Text Inverse`

#### `.text-center`
- Text Align : `Center`

#### `.text-lg`
- Font Size : `20px` (desktop), `18px` (mobile)

#### `.text-xl`
- Font Size : `24px` (desktop), `20px` (mobile)

#### `.text-2xl`
- Font Size : `32px` (desktop), `24px` (mobile)

#### `.serif`
- Font Family : `Playfair Display`

#### `.italic-accent`
- Font Family : `Cormorant`
- Font Style : `italic`
- Font Weight : `600`

### Spacing Utilities

#### `.mt-0` → `.mt-32`
Margin Top : `0`, `4px`, `8px`, `12px`, `16px`, `24px`, `32px`

#### `.mb-0` → `.mb-32`
Margin Bottom : (idem)

#### `.pt-0` → `.pt-32`
Padding Top : (idem)

#### `.pb-0` → `.pb-32`
Padding Bottom : (idem)

### Radius Utilities

#### `.rounded-sm`
- Border Radius : `8px`

#### `.rounded-md`
- Border Radius : `12px`

#### `.rounded-lg`
- Border Radius : `20px`

#### `.rounded-xl`
- Border Radius : `24px`

#### `.rounded-full`
- Border Radius : `9999px`

### Shadow Utilities

#### `.shadow-sm`
- Box Shadow : `0 2px 4px rgba(0, 0, 0, 0.06)`

#### `.shadow-md`
- Box Shadow : `0 8px 16px rgba(0, 0, 0, 0.1)`

#### `.shadow-lg`
- Box Shadow : `0 12px 24px rgba(0, 0, 0, 0.12)`

#### `.shadow-lift`
- Box Shadow : `0 16px 32px rgba(0, 0, 0, 0.12)`

### Focus States (Accessibility)

Ajouter à tous les éléments interactifs (liens, boutons, inputs) :

- **Focus State** :
  - Outline : `3px solid Ring (#e8c4b4)`
  - Outline Offset : `3px`
  - Border Radius : `8px`

---

## 🎭 Interactions Webflow

### Hover States (Cards & Buttons)

**Déclencheur** : Hover
**Animation** :
- Transform : `translateY(-4px)`
- Box Shadow : Augmenter l'intensité
- Duration : `0.25s`
- Easing : `ease-out`

### Scroll Reveals (Sections)

**Déclencheur** : Scroll into view
**Animation** :
- Opacity : `0` → `1`
- Transform Y : `30px` → `0`
- Duration : `0.6s`
- Easing : `ease-out`
- Offset : `10%` (trigger)

### CTA Glow Effect

**Déclencheur** : Hover
**Animation** :
- Box Shadow : Ajouter un glow `0 0 24px rgba(185, 90, 64, 0.3)`
- Duration : `0.3s`

---

## ♿ Accessibilité

### Checklist

- ✅ Contrastes AA minimum (4.5:1 pour texte)
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Tab order logique dans la navigation
- ✅ Alt text sur toutes les images
- ✅ Labels sur tous les champs de formulaire
- ✅ Attributs ARIA sur les composants complexes

### Focus Ring Standard

- Outline : `3px solid #e8c4b4`
- Outline Offset : `3px`
- Border Radius : `8px`

---

## 📱 Responsive Breakpoints

Utiliser les breakpoints Webflow standard :

- **Desktop** : 992px et plus
- **Tablet** : 768px - 991px
- **Mobile Landscape** : 479px - 767px
- **Mobile Portrait** : < 479px

### Ajustements Responsive Clés

1. **Container padding** : `24px` (desktop) → `16px` (mobile)
2. **Section padding** : `96px` (desktop) → `64px` (tablet) → `48px` (mobile)
3. **Grid columns** : `3` (desktop) → `2` (tablet) → `1` (mobile)
4. **Font sizes** : Utiliser les échelles définies dans H1-H4
5. **Stack gap** : Réduire de 25% sur mobile

---

## 🎨 Texture & Grain

Pour ajouter la texture grain subtile (comme sur le site actuel), utiliser un **Custom Code** dans le Body :

```css
body {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}
```

---

## ✨ Finitions Premium

### Micro-interactions

- **Buttons** : Légère translation Y au hover (-2px)
- **Cards** : Translation + shadow au hover
- **Links** : Changement de couleur doux (0.25s)
- **Form inputs** : Border color change au focus

### Transitions Standard

- Duration : `0.25s`
- Easing : `cubic-bezier(0.4, 0, 0.2, 1)` (ease-smooth)
- Propriétés : `all` ou spécifiques (`color`, `transform`, `box-shadow`)

---

**Fin du guide Webflow Styles** 🎨
# Webflow Styles Guide - EfSVP
*Basé sur le chunk #1 (lignes 0-1000) de index.html*

## 1. Styles Globaux

### Typographie
```
Font Primary (Headings): Playfair Display
  - Weights: 400, 500, 600, 700, 800, 900

Font Secondary (Body): Inter
  - Weights: 400, 500, 600, 700, 800

Font Accent: Cormorant
  - Weight: 600 Italic
```

### Couleurs de Base
```
Primary: #b8441e
Secondary: #e8924f
Accent Gold: #d4af37
Dark Brown: #7d2e2e
Dark Grey: #2d2d2d
Cream: #f5e6d3
White: #ffffff
```

### Gradients (Custom CSS)
```css
.gradient-primary {
  background: linear-gradient(135deg, #b8441e 0%, #e8924f 100%);
}

.gradient-gold {
  background: linear-gradient(135deg, #e8924f 0%, #d4af37 100%);
}

.gradient-dark {
  background: linear-gradient(135deg, #2d2d2d 0%, #7d2e2e 100%);
}

.gradient-dark-red {
  background: linear-gradient(135deg, #7d2e2e 0%, #b8441e 100%);
}

.gradient-cream {
  background: linear-gradient(135deg, #f5e6d3 0%, #d4af37 100%);
}
```

## 2. Layout Utilities

### Container
```
.container
  - Max-width: TODO (à déterminer dans CSS)
  - Padding gauche/droite: TODO
  - Centré (margin: auto)
```

### Section
```
.section
  - Padding vertical: TODO (à déterminer dans CSS)
```

### Section Header
```
.section__header
  - Text-align: center
  - Margin-bottom: TODO

.section__title
  - Font: Playfair Display
  - Size: TODO (probablement 2.5-3rem)
  - Weight: 700

.section__subtitle
  - Font: Inter
  - Size: TODO
  - Color: text-secondary
```

## 3. Navigation

### Nav Component
```
.nav
  - Position: sticky/fixed
  - Background: TODO (transparent ou blanc)
  - Z-index: élevé

.nav__container
  - Display: flex
  - Justify: space-between
  - Align: center

.nav__logo
  - Font: Playfair Display
  - Weight: 700

.nav__list
  - Display: flex
  - Gap: TODO

.nav__link
  - Font: Inter
  - Hover: TODO

.nav__cta
  - Class: btn btn--primary-small

.nav__toggle (Mobile)
  - Hamburger menu
  - 3 spans pour lignes
```

## 4. Buttons

### Base Button
```
.btn
  - Display: inline-flex
  - Align-items: center
  - Gap: TODO (pour icône)
  - Padding: TODO
  - Border-radius: TODO
  - Font: Inter
  - Transition: TODO

.btn__icon
  - SVG icon
  - Width/Height: 24px
```

### Variants
```
.btn--primary
  - Background: Primary gradient
  - Color: white

.btn--primary-small
  - Taille réduite pour nav

.btn--hero
  - Taille extra pour hero CTA

.btn--secondary
  - Background: transparent ou surface
  - Border: TODO
  - Color: primary
```

### States
```
[data-glow]
  - Effet de glow au hover (TODO: détails)
```

## 5. Hero Section

### Hero
```
.hero
  - Position: relative
  - Height: 100vh ou TODO
  - Display: flex
  - Align: center
  - Justify: center

.hero__video-container
  - Position: absolute
  - Inset: 0
  - Overflow: hidden

.hero__video-placeholder
  - Fallback background

.hero__overlay
  - Position: absolute
  - Inset: 0
  - Background: rgba overlay pour lisibilité

.hero__content
  - Position: relative
  - Z-index: 1
  - Text-align: center
  - Color: white

.hero__title
  - Font: Playfair Display
  - Size: TODO (grand, responsive)
  - Weight: 700
  - Line-height: TODO

.hero__title-line
  - Display: block

.hero__title-line--primary
  - Style spécial ligne 1

.hero__title-line--secondary
  - Style spécial ligne 2

.hero__subtitle
  - Font: Inter
  - Max-width: TODO (pour lisibilité)
  - Margin: auto

.hero__cta-group
  - Margin-top: TODO

.hero__trust-metrics
  - Display: flex
  - Gap: TODO
  - Justify: center

.hero__metric
  - Text-align: center
  - strong: Font-size grand
  - span: Font-size petit, opacité réduite

.hero__scroll
  - Position: absolute
  - Bottom: TODO
  - Animation: bounce/chevron
```

## 6. Audio Section (Bento Grid)

### Bento Grid
```
.bento-grid
  - Display: grid
  - Grid-template-columns: TODO (responsive)
  - Gap: TODO

.bento-item
  - Background: surface
  - Border-radius: TODO
  - Padding: TODO

.bento-item--large
  - Grid-column: span 2 ou TODO

.bento-item--medium
  - Taille standard

.bento-item--card
  - Variant pour info cards
```

### Audio Player
```
.audio-player
  - Composant complexe

.audio-player--featured
  - Version grande avec artwork

.audio-player--standard
  - Version compacte

.audio-player--list
  - Version mini liste

.audio-player__artwork
  - Width/Height: TODO
  - Border-radius: TODO

.audio-player__artwork-placeholder
  - Background: gradient

.audio-player__info
  - Padding: TODO

.audio-player__badge
  - Font-size: small
  - Padding: TODO
  - Background: TODO
  - Border-radius: TODO

.audio-player__title
  - Font: Playfair Display

.audio-player__client
  - Font: Inter
  - Color: text-secondary

.audio-player__controls
  - Display: flex
  - Align: center
  - Gap: TODO

.audio-player__play
  - Button circulaire
  - Background: primary
  - SVG icons (play/pause toggle)

.audio-player__waveform
  - Canvas ou div pour waveform
  - Flex-grow: 1

.audio-player__time
  - Display: flex
  - Gap: TODO
  - Font-size: small
```

### Info Card
```
.info-card
  - Text-align: center
  - Padding: TODO

.info-card__number
  - Font: Playfair Display
  - Size: très grand (3-4rem)
  - Weight: bold

.info-card__title
  - Text-transform: lowercase

.info-card__text
  - Font-size: small

.info-card--accent
  - Background ou border accent
```

### Quote Card
```
.quote-card
  - Padding: TODO

.quote-card__icon
  - SVG quote marks
  - Size: TODO
  - Opacity: TODO

.quote-card__text
  - Font: Cormorant italic ou Inter
  - Font-size: TODO

.quote-card__author
  - Font-style: normal
  - Font-size: small
  - Color: text-secondary
```

## 7. Case Cards (Flagship Cases)

### Case Card
```
.case-card
  - Display: flex ou grid
  - Background: surface
  - Border-radius: TODO
  - Overflow: hidden

.case-card--featured
  - Variante mise en avant

.case-card__visual
  - Position: relative
  - Height: TODO ou aspect-ratio

.case-card__gradient
  - Position: absolute
  - Inset: 0
  - Background: gradient (inline style)

.case-card__badge
  - Position: absolute
  - Top/Left: TODO
  - Background: white/surface
  - Padding: TODO
  - Border-radius: TODO

.case-card__tag-featured
  - Badge spécial "Création phare"

.case-card__content
  - Padding: TODO

.case-card__title
  - Font: Playfair Display
  - Weight: 600

.case-card__client
  - Font: Inter
  - Color: text-secondary

.case-card__story
  - Margin-top: TODO

.case-card__step
  - Margin-bottom: TODO

.case-card__step-title
  - Font-weight: 600
  - Emoji prefix

.case-card__metric
  - Font-weight: 700
  - Color: accent

.case-card__audio-btn
  - Display: flex
  - Align: center
  - Gap: TODO
  - Padding: TODO
  - Background: transparent
  - Border: TODO
  - Hover: TODO
```

## 8. Service Cards

### Service Card
```
.service-card
  - Background: surface
  - Border: TODO
  - Border-radius: TODO
  - Padding: TODO
  - Text-align: center

.service-card--featured
  - Border: accent ou special
  - Background: subtle gradient

.service-card__icon
  - Width/Height: TODO (48px-64px)
  - Margin-bottom: TODO
  - SVG stroke

.service-card__badge
  - Font-size: small
  - Color: accent
  - Font-weight: 600

.service-card__badge--featured
  - Variant pour featured

.service-card__featured-badge
  - Position: absolute top ou label spécial

.service-card__title
  - Font: Playfair Display

.service-card__features
  - List-style: none
  - Padding: 0
  - li: marge entre items

.service-card__cta
  - Button link
  - Display: inline-flex
  - Align: center
  - Gap: TODO
```

## 9. Portfolio Section

### Portfolio
```
.portfolio__stats
  - Display: flex
  - Align: center
  - Justify: center
  - Gap: TODO

.portfolio__stat
  - Font: Playfair Display
  - Size: grand
  - Weight: bold
  - [data-counter]: animation de compteur

.portfolio__separator
  - Margin: 0 1rem
```

### Filters
```
.filters
  - Display: flex
  - Flex-wrap: wrap
  - Gap: TODO
  - Justify: center

.filters__group
  - Display: flex
  - Gap: TODO

.filter
  - Padding: TODO
  - Border: TODO
  - Border-radius: TODO (pill shape)
  - Background: transparent
  - Transition: TODO

.filter.is-active
  - Background: primary
  - Color: white

.filter:hover
  - Border-color: primary ou transform
```

### Portfolio Grid
```
.portfolio__grid
  - Display: grid
  - Grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  - Gap: TODO
```

### Portfolio Card
```
.portfolio-card
  - Position: relative
  - Background: surface
  - Border-radius: TODO
  - Overflow: hidden
  - [data-category]: pour filtrage JS
  - [data-client]: pour filtrage JS
  - [data-type]: pour filtrage JS

.portfolio-card__visual
  - Position: relative
  - Height: TODO ou aspect-ratio (16:9 ?)

.portfolio-card__overlay
  - Position: absolute
  - Inset: 0
  - Background: gradient overlay

.portfolio-card__color
  - Position: absolute
  - Inset: 0
  - Background: gradient (inline style)

.portfolio-card__content
  - Padding: TODO

.portfolio-card__tag
  - Display: inline-block
  - Font-size: small
  - Padding: TODO
  - Background: TODO
  - Border-radius: TODO

.portfolio-card__title
  - Font: Playfair Display
  - Weight: 600

.portfolio-card__client
  - Font-weight: 600

.portfolio-card__year
  - Color: text-secondary

.portfolio-card__description
  - Font-size: small
  - Line-height: TODO
```

## 10. Utility Classes

### Animations/Interactions
```
[data-scroll]
  - Élément avec scroll animation (Intersection Observer)

[data-lift]
  - Hover lift effect (transform: translateY)

[data-glow]
  - Hover glow effect

[data-reveal="scale"]
  - Scale reveal animation

[data-counter]
  - Compteur animé

[data-scroll-to]
  - Scroll smooth vers section
```

### Accessibility
```
.skip-link
  - Position: absolute
  - Top: -100%
  - Focus: top: 0 (visible)

.sr-only
  - Screen reader only
  - Position: absolute
  - Width: 1px
  - Height: 1px
  - Clip: rect(0,0,0,0)
```

### Grid System
```
TODO (à compléter chunk #2)
- Chercher grid-12 ou grid system
```

### Spacing
```
TODO (à compléter chunk #2)
- stack-16, stack-24, etc.
- gap utilities
```

## 11. Composants Manquants (TODO Chunk #2)

- Process section
- FAQ section
- Contact form
- Footer
- Testimonials (si autre que quote card)
- Stats section dédiée
- Team section (si présente)
- Modal/Lightbox (si présent)

## Notes d'Implémentation Webflow

1. **Collections Recommandées** :
   - Projects (portfolio items)
   - Audio Tracks
   - Case Studies
   - Services
   - FAQ items

2. **Custom Code Nécessaire** :
   - Audio player (WaveSurfer.js ou similaire)
   - Filtres portfolio avec animation
   - Scroll animations (Intersection Observer)
   - Compteurs animés
   - Video background avec fallback

3. **Interactions Webflow** :
   - Nav sticky avec background change
   - Hover states (lift, glow)
   - Mobile menu toggle
   - Filter active state

4. **Responsive Breakpoints** :
   - Desktop: 1440px+
   - Tablet: 768px-1439px
   - Mobile: <768px
   - (À confirmer dans le CSS)

---

*Document généré à partir du chunk #1. Nécessite complétion avec chunks suivants pour les sections manquantes et détails CSS précis.*
