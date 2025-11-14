# 🎨 EfSVP - Design System Extract

## Extraction depuis la maquette statique pour intégration WordPress

---

## 🎯 Palette de Couleurs

### Couleurs de marque (Automne Doux / Printemps Chaud)
```css
--primary: #b95a40;              /* Terracotta - Couleur signature */
--primary-hover: #d16d52;        /* Terracotta hover */
--primary-active: #a04a32;       /* Terracotta active */
--secondary: #8a8a68;            /* Kaki Doux - Accent naturel */
--accent-camel: #c39d6b;         /* Camel - Secondaire chaleureux */
--accent-beige: #e6d9c3;         /* Beige - Secondaire doux */
```

### Couleurs de texte
```css
--ink: #1d2c3b;                  /* Bleu Marine très sombre - Texte principal */
--charcoal: #2d3748;             /* Charbon */
--text: var(--ink);              /* Alias texte principal */
--text-secondary: #4a5568;       /* Texte secondaire */
--text-tertiary: #6b7280;        /* Texte tertiaire */
--muted: #9ca3af;                /* Texte atténué */
--text-inverse: #fefefe;         /* Texte inversé (sur fond sombre) */
--text-on-dark: #f7f5f2;         /* Texte sur fond sombre premium */
```

### Couleurs de fond
```css
--parchment: #fbf8f3;            /* Ivoire/Beige Sable principal */
--sand: #faf6f0;                 /* Variation plus claire */
--sand-deep: #f0e9dc;            /* Variation plus profonde */
--bg: var(--parchment);          /* Background principal */
--surface: var(--sand);          /* Surface */
--surface-elevated: #ffffff;     /* Blanc cassé pour élévation */
--surface-dimmed: var(--sand-deep); /* Surface atténuée */
--surface-contrast: #e8e0d5;     /* Contraste subtil */
```

### Couleurs spéciales sections
```css
--bg-dark: #0f141a;              /* Fond sombre principal */
--bg-dark-2: #141e26;            /* Gradient hero/sections */
--hero-fallback-dark: #0f1926;   /* Fallback hero dark */
--dark-section-bg: #0e151b;      /* Sections sombres (témoignages) */
--dark-section-bg-end: #141e26;  /* Gradient de fin */
```

### Bordures
```css
--border: #ddd5c8;               /* Bordure principale */
--border-strong: #c5b9a8;        /* Bordure forte */
```

### Accents supplémentaires
```css
--accent: var(--primary);        /* Accent principal */
--accent-hover: var(--primary-hover);
--accent-2: var(--secondary);    /* Accent secondaire */
--accent-gold: #f3b47a;          /* Accent doré */
--ring: #e8c4b4;                 /* Ring/Focus */
```

---

## 📝 Typographie

### Familles de polices
```css
--font-display: 'Playfair Display', serif;   /* Titres principaux */
--font-serif: 'Playfair Display', serif;     /* Serif */
--font-sans: 'Inter', sans-serif;            /* Sans-serif corps */
--font-body: 'Inter', sans-serif;            /* Body text */
--font-accent: 'Cormorant', serif;           /* Accent italique */
```

### Import Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Cormorant:ital,wght@1,600&display=swap" rel="stylesheet" />
```

### Échelle typographique (Fluide/Responsive)
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);      /* 12-14px */
--text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 0.938rem);    /* 14-15px */
--text-base: clamp(1.063rem, 0.95rem + 0.4vw, 1.188rem);  /* 17-19px */
--text-lg: clamp(1.125rem, 1rem + 0.45vw, 1.375rem);      /* 18-22px */
--text-xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem);       /* 20-28px */
--text-2xl: clamp(1.5rem, 1.3rem + 0.8vw, 2.25rem);       /* 24-36px */
--text-3xl: clamp(2.25rem, 1.85rem + 1.2vw, 3.5rem);      /* 36-56px */
--text-4xl: clamp(3rem, 2.4rem + 2vw, 4.5rem);            /* 48-72px */
--text-5xl: clamp(3.5rem, 2.75rem + 2.75vw, 5.5rem);      /* 56-88px */
--text-6xl: clamp(3.75rem, 2.8rem + 3.5vw, 7rem);         /* 60-112px */
--text-8xl: clamp(4.5rem, 3.5rem + 5vw, 8.5rem);          /* 72-136px */
```

### Line-heights
```css
--leading-tight: 1.1;       /* Titres serrés */
--leading-snug: 1.3;        /* Titres */
--leading-normal: 1.5;      /* Normal */
--leading-relaxed: 1.7;     /* Paragraphes */
```

### Font Weights (utilisés)
```
Playfair Display: 400, 500, 600, 700, 800, 900
Inter: 400, 500, 600, 700, 800
Cormorant: 600 italic
```

---

## 📐 Système d'espacement (base 8px)

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-28: 7rem;      /* 112px */
--space-32: 8rem;      /* 128px */
```

---

## 🎨 Border Radius

```css
--radius-none: 0;
--radius-xs: 4px;
--radius-sm: 8px;         /* Uniformisé */
--radius-md: 12px;        /* Rayon principal premium */
--radius-lg: 20px;        /* Cards principales */
--radius-xl: 24px;
--radius-2xl: 32px;
--radius-full: 9999px;    /* Complètement arrondi */
```

---

## 💫 Ombres (Shadows & Glows)

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.03);
--shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
--shadow-md: 0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 4px 6px 0 rgba(0, 0, 0, 0.05);
--shadow-lg: 0 12px 24px 0 rgba(0, 0, 0, 0.12), 0 8px 12px 0 rgba(0, 0, 0, 0.06);
--shadow-xl: 0 20px 40px 0 rgba(0, 0, 0, 0.14), 0 12px 20px 0 rgba(0, 0, 0, 0.08);
--shadow-2xl: 0 30px 60px 0 rgba(0, 0, 0, 0.16), 0 20px 30px 0 rgba(0, 0, 0, 0.1);
--shadow-lift: 0 16px 32px 0 rgba(0, 0, 0, 0.12), 0 8px 16px 0 rgba(0, 0, 0, 0.06);
--shadow-hero-cta: 0 24px 48px rgba(0, 0, 0, 0.4);        /* CTA Hero premium */
--shadow-dark-card: 0 16px 40px rgba(0, 0, 0, 0.25);      /* Cards sur fond sombre */
```

### Glows
```css
--glow-accent: 0 0 20px rgba(232, 146, 79, 0.3);
--glow-primary: 0 0 24px rgba(184, 68, 30, 0.25);
--scroll-cta-shadow: 0 6px 12px rgba(184, 68, 30, 0.35);
```

---

## ⚡ Motion & Transitions

### Easing Functions
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease: cubic-bezier(0.2, 0.8, 0.2, 1);
```

### Durées
```css
--duration-fast: 0.15s;
--duration-base: 0.25s;
--duration-slow: 0.4s;
--dur-1: 0.2s;
--dur-2: 0.35s;
```

### Transitions complètes
```css
--transition-fast: 0.18s cubic-bezier(0.22, 0.9, 0.24, 1);
--transition-base: 0.22s cubic-bezier(0.22, 0.9, 0.24, 1);
--transition-slow: 0.26s cubic-bezier(0.22, 0.9, 0.24, 1);
```

---

## 📏 Layout & Containers

```css
--container-max: 1280px;         /* Max width content */
--container-padding: var(--space-6);  /* 24px */
--text-max-width: 68ch;          /* Max width pour paragraphes */
--header-h: 76px;                /* Hauteur header sticky */
```

---

## 🎭 Z-index Scale

```css
--z-sticky: 1100;     /* Header sticky */
--z-tooltip: 1600;    /* Tooltips */
```

---

## 🖼️ Textures

### Grain subtil (SVG)
```css
--grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E");
```

---

## 📱 Breakpoints Responsive

La maquette utilise une approche **mobile-first**:

```
xs: 320-474px (default)
sm: 475-767px
md: 768-1023px
lg: 1024-1279px
xl: 1280-1535px
2xl: 1536px+
```

---

## 🎯 Sections identifiées dans la maquette

1. **Hero** (avec vidéo background)
2. **Audio/Créations** (Bento grid avec lecteurs audio)
3. **Flagship Cases** (Cas d'usages premium)
4. **Services** (Grille de services)
5. **Portfolio** (Galerie projets)
6. **Process** (Process de travail)
7. **Testimonials** (Témoignages)
8. **Stats** (Métriques de confiance)
9. **FAQ** (Questions fréquentes)
10. **Contact** (Formulaire de contact)

---

## 🔧 Composants UI identifiés

### Buttons
- **Primary**: Background terracotta, hover effect, glow
- **Secondary**: Outline style
- **Small**: Version compacte pour navigation
- **Hero CTA**: Version premium avec shadow et glow

### Cards
- **Glass**: Background surface-elevated, border subtile
- **Audio Player**: Featured (large) et Standard (compact)
- **Info Card**: Avec numéro, titre, texte et décoration
- **Portfolio Card**: Image, titre, catégorie, hover effect
- **Testimonial Card**: Photo, citation, nom, rôle

### Navigation
- **Sticky Header**: Background dark, height 76px
- **Mobile Menu**: Hamburger toggle
- **Nav Links**: Hover effet

---

## ✅ Notes d'implémentation WordPress

### Priorités pour le thème
1. Utiliser TOUTES les variables CSS custom properties
2. Maintenir la hiérarchie typographique fluide
3. Conserver les ombres et glows premium
4. Implémenter le responsive mobile-first
5. Garder les transitions smooth
6. Préserver les textures (grain)

### Blocs Gutenberg à créer
1. **Hero Block** - Avec support vidéo background, overlay, métriques
2. **Services Block** - Grille de services avec icônes
3. **Portfolio Block** - Galerie avec filtres catégories
4. **Testimonials Block** - Carousel ou grille témoignages
5. **CTA Block** - Call-to-action premium avec glow

### Assets à migrer
- Favicon SVG
- Logo EfSVP
- Images portfolio (si présentes)
- Fonts (déjà Google Fonts, juste configurer)

---

**Date d'extraction**: 2024-11-09
**Source**: Repository eFsvp_maquette
**Status**: ✅ Complet et prêt pour intégration WordPress
