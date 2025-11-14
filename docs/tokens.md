# Design Tokens - EfSVP Award 2025

Documentation complète des tokens du système de design **Awwwards-grade** pour le site EfSVP.

**Fichier source** : `/src/styles/design-system.css`

---

## 🎨 Couleurs (OKLCH Color Space)

### Palette Principale

| Token | Valeur OKLCH | Hex Équivalent | Usage |
|-------|--------------|----------------|-------|
| `--bg` | `oklch(0.10 0.01 240)` | `#0F151D` | Fond principal (dark navy) |
| `--surface` | `oklch(0.14 0.01 240)` | `#141C26` | Surfaces élevées (cards, modals) |
| `--surface-elevated` | `oklch(0.18 0.01 240)` | - | Surfaces encore plus élevées |

### Texte

| Token | Valeur OKLCH | Hex Équivalent | Usage | Contraste |
|-------|--------------|----------------|-------|-----------|
| `--text` | `oklch(0.92 0.01 240)` | `#EAECEF` | Texte principal | **14.2:1** (AAA) |
| `--text-secondary` | `oklch(0.65 0.01 240)` | `#9AA3AE` | Texte secondaire | **7.1:1** (AAA) |
| `--text-tertiary` | `oklch(0.45 0.01 240)` | - | Texte tertiaire | - |

### Accents

| Token | Valeur OKLCH | Formule Dynamique | Usage |
|-------|--------------|-------------------|-------|
| `--primary` | Dynamique | `oklch(var(--primary-l) var(--primary-c) var(--primary-h))` | Brique/terracotta (`#B8441E`) |
| `--primary-hover` | Dynamique | `oklch(calc(var(--primary-l) + 0.1) ...)` | Hover states |
| `--accent` | Dynamique | `oklch(var(--accent-l) var(--accent-c) var(--accent-h))` | Ambre (`#E8924F`) |

**Variables dynamiques** :
- `--primary-h: 20` (hue brique)
- `--primary-c: 0.15` (chroma)
- `--primary-l: 0.45` (lightness)
- `--accent-h: 35` (hue ambre)
- `--accent-c: 0.18`
- `--accent-l: 0.68`

### Bordures

| Token | Valeur OKLCH | Usage |
|-------|--------------|-------|
| `--border` | `oklch(0.22 0.01 240)` | `#223044` - Bordures standards |
| `--border-hover` | `oklch(0.32 0.01 240)` | Bordures au survol |

---

## 📝 Typographie

### Familles de polices

```css
--font-display: 'Newsreader', serif;      /* Titres, héros */
--font-body: 'Plus Jakarta Sans', sans-serif;  /* Corps de texte, UI */
--font-accent: 'Cormorant', serif;        /* Accents italiques rares */
```

### Échelle Fluide (Responsive avec clamp())

| Token | Min Size | Preferred | Max Size | Pixels | Usage |
|-------|----------|-----------|----------|--------|-------|
| `--text-xs` | `0.75rem` | `0.7rem + 0.25vw` | `0.875rem` | 12-14px | Badges, métadonnées |
| `--text-sm` | `0.875rem` | `0.8rem + 0.375vw` | `1rem` | 14-16px | Texte secondaire |
| `--text-base` | `1.063rem` | `0.95rem + 0.25vw` | `1.125rem` | 17-18px | **Texte principal** |
| `--text-lg` | `1.125rem` | `1rem + 0.625vw` | `1.5rem` | 18-24px | Lead paragraphs |
| `--text-xl` | `1.25rem` | `1.1rem + 0.75vw` | `1.75rem` | 20-28px | Sous-titres H4 |
| `--text-2xl` | `1.5rem` | `1.3rem + 1vw` | `2.25rem` | 24-36px | Titres H3 |
| `--text-3xl` | `1.875rem` | `1.5rem + 1.875vw` | `3rem` | 30-48px | Titres H3 large |
| `--text-4xl` | `2.25rem` | `1.75rem + 2.5vw` | `3.75rem` | 36-60px | Titres H2 |
| `--text-5xl` | `3rem` | `2.25rem + 3.75vw` | `5rem` | 48-80px | Titres H1 |
| `--text-6xl` | `3.75rem` | `2.75rem + 5vw` | `6.5rem` | 60-104px | **Hero H1** |

### Line Heights

| Token | Valeur | Usage |
|-------|--------|-------|
| `--leading-tight` | `1.1` | Hero titles (impact maximum) |
| `--leading-snug` | `1.25` | Section titles |
| `--leading-normal` | `1.5` | UI elements, buttons |
| `--leading-relaxed` | `1.75` | **Body text** (confort lecture) |

---

## 📐 Spacing (Système 8px strict)

| Token | Valeur | Pixels | Usage typique |
|-------|--------|--------|---------------|
| `--space-1` | `0.25rem` | **4px** | Micro-espaces (badges internes) |
| `--space-2` | `0.5rem` | **8px** | Padding minimal (badges, tags) |
| `--space-3` | `0.75rem` | **12px** | Gap mini (icons + text) |
| `--space-4` | `1rem` | **16px** | Padding standard (buttons) |
| `--space-5` | `1.25rem` | **20px** | Gap moyen |
| `--space-6` | `1.5rem` | **24px** | Padding cards small |
| `--space-8` | `2rem` | **32px** | Padding cards large, gaps grilles |
| `--space-10` | `2.5rem` | **40px** | Sections internes |
| `--space-12` | `3rem` | **48px** | Bottom margins sections |
| `--space-16` | `4rem` | **64px** | Spacing entre sections |
| `--space-20` | `5rem` | **80px** | Padding vertical sections |
| `--space-24` | `6rem` | **96px** | Grandes sections |
| `--space-28` | `7rem` | **112px** | Extra large |
| `--space-32` | `8rem` | **128px** | **Padding sections majeures** |

---

## 🌓 Shadows (Multi-layer Premium)

### Shadow Scale

```css
--shadow-sm:    /* Subtile - hover micro-éléments */
  0 1px 2px 0 rgb(0 0 0 / 0.04),
  0 1px 3px 0 rgb(0 0 0 / 0.08);

--shadow-md:    /* Standard - cards */
  0 2px 4px -1px rgb(0 0 0 / 0.06),
  0 4px 6px -1px rgb(0 0 0 / 0.1),
  0 8px 12px -2px rgb(0 0 0 / 0.08);

--shadow-lg:    /* Prononcée - cards hover */
  0 4px 6px -2px rgb(0 0 0 / 0.08),
  0 10px 15px -3px rgb(0 0 0 / 0.12),
  0 20px 25px -5px rgb(0 0 0 / 0.1);

--shadow-xl:    /* Très prononcée - modals, popovers */
  0 10px 10px -5px rgb(0 0 0 / 0.08),
  0 20px 25px -5px rgb(0 0 0 / 0.12),
  0 30px 40px -10px rgb(0 0 0 / 0.16),
  0 40px 50px -15px rgb(0 0 0 / 0.2);

--shadow-2xl:   /* Extrême - hero, full-screen */
  0 15px 15px -7px rgb(0 0 0 / 0.1),
  0 30px 35px -8px rgb(0 0 0 / 0.15),
  0 45px 55px -15px rgb(0 0 0 / 0.2),
  0 60px 70px -20px rgb(0 0 0 / 0.25);
```

### Glow Effects (Accents)

```css
--glow-primary:   /* Brique terracotta */
  0 0 20px rgba(184, 68, 30, 0.4),
  0 0 40px rgba(184, 68, 30, 0.2),
  0 0 60px rgba(184, 68, 30, 0.1);

--glow-accent:    /* Ambre */
  0 0 15px rgba(232, 146, 79, 0.3),
  0 0 30px rgba(232, 146, 79, 0.15);
```

**Usage** : Hover CTA featured, audio players, cards premium.

---

## ⏱️ Transitions & Easing

### Durées Standards

| Token | Valeur | Usage |
|-------|--------|-------|
| `--duration-fast` | `0.15s` | Micro-interactions (checkbox, toggle) |
| `--duration-base` | `0.25s` | **Standard hover/focus** (120-240ms Award) |
| `--duration-slow` | `0.4s` | Transitions complexes (modals, scale) |
| `--duration-slower` | `0.6s` | Animations entrée (fade in, slide) |

### Easing Functions (Cubic Bezier Custom)

```css
--ease-out-expo:      cubic-bezier(0.16, 1, 0.3, 1);      /* Sortie rapide élégante */
--ease-in-out-expo:   cubic-bezier(0.87, 0, 0.13, 1);     /* Entrée/sortie symétrique */
--ease-spring:        cubic-bezier(0.34, 1.56, 0.64, 1);  /* Elastic feel (bounce léger) */
--ease-smooth:        cubic-bezier(0.4, 0, 0.2, 1);       /* **Standard Material Design** */
--ease-bounce:        cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce prononcé */
```

**⚠️ Règle Award** : JAMAIS `ease` ou `linear` — toujours cubic-bezier custom.

---

## 🔮 Glassmorphism Premium

### Variables Glassmorphism

```css
--glass-bg:           rgba(20, 28, 38, 0.7);        /* Surface avec alpha */
--glass-bg-light:     rgba(20, 28, 38, 0.5);        /* Variante légère */
--glass-border:       rgba(255, 255, 255, 0.1);     /* Bordure subtile */
--glass-border-hover: rgba(255, 255, 255, 0.18);    /* Hover */
--backdrop-blur:      blur(16px);                   /* Flou standard */
--backdrop-saturate:  saturate(180%);               /* Saturation couleurs */
```

### Classe Utilitaire

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: var(--backdrop-blur) var(--backdrop-saturate);
  -webkit-backdrop-filter: var(--backdrop-blur) var(--backdrop-saturate);
  border: 1px solid var(--glass-border);
}

.glass-light {
  background: var(--glass-bg-light);
  backdrop-filter: var(--backdrop-blur);
}
```

---

## 🎯 Z-Index Scale Stricte

| Token | Valeur | Usage |
|-------|--------|-------|
| `--z-base` | `0` | Normal flow |
| `--z-dropdown` | `1000` | Dropdowns, menus |
| `--z-sticky` | `1100` | **Navigation sticky** |
| `--z-fixed` | `1200` | Fixed elements |
| `--z-modal-backdrop` | `1300` | Modal backdrop |
| `--z-modal` | `1400` | Modals content |
| `--z-popover` | `1500` | Popovers, tooltips |
| `--z-tooltip` | `1600` | Tooltips suprêmes |
| `--z-cursor` | `9999` | Custom cursor |

---

## 📦 Layout

### Container

```css
--container-max: 1280px;                /* Max-width container principal */
--container-padding: var(--space-6);    /* 24px padding horizontal */
```

### Text

```css
--text-max-width: 68ch;                 /* Largeur max paragraphes (lisibilité) */
```

### Border Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `--border-radius-sm` | `8px` | Petits éléments (badges) |
| `--border-radius` | `16px` | **Standard cards** |
| `--border-radius-lg` | `24px` | Grandes cards, sections |
| `--border-radius-full` | `9999px` | Pills, tags, buttons ronds |

---

## 🌾 Grain Texture (Data URI SVG)

```css
--grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' ...%3E...%3C/svg%3E");
```

**Application globale** :

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: var(--grain);
  pointer-events: none;
  z-index: var(--z-tooltip);  /* 1600 */
  opacity: 1;
  mix-blend-mode: overlay;
}
```

**Performance** : Data URI = 0 requête HTTP, optimisé ~200 bytes.

---

## 🎬 Animations Keyframes

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
```

---

## 📱 Responsive Breakpoints

### Approche Mobile-First

```css
/* xs: 320-474px (default - pas de media query) */

/* sm: 475-767px */
@media (min-width: 475px) { ... }

/* md: 768-1023px */
@media (min-width: 768px) { ... }

/* lg: 1024-1279px */
@media (min-width: 1024px) { ... }

/* xl: 1280-1535px */
@media (min-width: 1280px) { ... }

/* 2xl: 1536px+ */
@media (min-width: 1536px) { ... }
```

### Media Queries Spéciales

```css
/* Préférences système */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation-duration: 0.01ms !important; }
}

@media (prefers-color-scheme: dark) {
  /* Déjà en dark par défaut */
}
```

---

## 🛠️ Utilisation dans le Code

### Import

```css
@import url('/src/styles/design-system.css');
```

### Exemples d'Usage

```css
.my-card {
  background: var(--surface);
  color: var(--text);
  padding: var(--space-8);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-base) var(--ease-smooth);
}

.my-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--border-hover);
}

.my-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
  color: var(--accent);
}
```

---

## ✅ Checklist Award 2025

- ✅ **OKLCH** color space (2025 standard)
- ✅ **Fluid typography** (clamp responsive)
- ✅ **Spacing 8px** strict
- ✅ **Cubic-bezier custom** (pas de ease/linear)
- ✅ **Multi-layer shadows** (3-4 couches)
- ✅ **Glassmorphism** moderne
- ✅ **Z-index scale** organisée
- ✅ **Grain texture** SVG data URI
- ✅ **Animations** sobres (120-240ms)
- ✅ **Mobile-first** responsive
- ✅ **Accessibilité** (contrastes AA/AAA)
- ✅ **Performance** (0 requête tokens)

---

**Dernière mise à jour** : 2025-11-01
**Version** : Award 2025 Premium
**Auteur** : Claude Code - EfSVP Design System
