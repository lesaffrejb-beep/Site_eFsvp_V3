# Symbols Webflow - Wireframes & Structure

Guide de création des Symbols Webflow réutilisables pour le site.

---

## 1. Navbar Symbol

**Nom du Symbol :** `Navbar`

### Structure minimale

```
Navbar (Section)
├── Container (div.container)
    ├── Logo Link (Link Block)
    │   └── Logo Image (img)
    ├── Nav Menu (Nav)
    │   ├── Nav Link 1 (Link) - "Accueil"
    │   ├── Nav Link 2 (Link) - "Portfolio"
    │   ├── Nav Link 3 (Link) - "À propos"
    │   └── Nav Link 4 (Link) - "Contact"
    └── Menu Button (div.menu-btn) - pour mobile
        └── Icon (div.icon)
```

### Propriétés clés
- Position: Fixed (top: 0)
- Z-index: 1000
- Background: var(--primary-500) ou transparent
- Padding: 1rem 0

### Classes utiles
- `.navbar` (section)
- `.navbar-container` (container)
- `.nav-menu` (navigation)
- `.nav-link` (liens)
- `.menu-button` (hamburger mobile)

---

## 2. Footer Symbol

**Nom du Symbol :** `Footer`

### Structure minimale

```
Footer (Section)
├── Container (div.container)
    ├── Footer Top (div)
    │   ├── Footer Brand (div)
    │   │   ├── Logo (img)
    │   │   └── Tagline (p)
    │   ├── Footer Links Col 1 (div)
    │   │   ├── Heading (h4) - "Navigation"
    │   │   └── Link List (div)
    │   │       ├── Link 1
    │   │       ├── Link 2
    │   │       └── Link 3
    │   ├── Footer Links Col 2 (div)
    │   │   ├── Heading (h4) - "Contact"
    │   │   └── Contact Info (div)
    │   │       ├── Email (p + icon)
    │   │       └── Phone (p + icon)
    │   └── Footer Social (div)
    │       ├── Heading (h4) - "Suivez-moi"
    │       └── Social Icons (div)
    │           ├── LinkedIn Link + Icon
    │           ├── GitHub Link + Icon
    │           └── Twitter Link + Icon
    └── Footer Bottom (div)
        ├── Copyright (p) - "© 2025 [Nom]. Tous droits réservés."
        └── Legal Links (div)
            ├── Mentions légales
            └── Politique de confidentialité
```

### Propriétés clés
- Background: var(--neutral-900)
- Color: var(--neutral-100)
- Padding: 4rem 0 2rem

### Classes utiles
- `.footer` (section)
- `.footer-top` (grid 4 colonnes)
- `.footer-bottom` (flex space-between)
- `.social-icon` (liens sociaux)

---

## 3. CTA Section Symbol

**Nom du Symbol :** `CTA Section`

### Structure minimale

```
CTA Section (Section)
└── Container (div.container)
    └── CTA Card (div.cta-card)
        ├── Content (div)
        │   ├── Heading (h2) - "Prêt à discuter de votre projet ?"
        │   └── Description (p) - Texte accrocheur
        └── CTA Actions (div)
            ├── Primary Button - "Contactez-moi"
            └── Secondary Button - "Voir le portfolio"
```

### Propriétés clés
- Background: Gradient ou var(--primary-500)
- Padding: 4rem 2rem
- Border-radius: 1rem
- Text-align: center

### Variantes possibles (via Symbol Settings)
- Style variant: `primary` | `secondary` | `gradient`
- Size: `default` | `compact`

### Classes utiles
- `.cta-section`
- `.cta-card` (carte avec background)
- `.cta-actions` (flex gap pour les boutons)

---

## 4. FAQ Item Symbol

**Nom du Symbol :** `FAQ Item`

### Structure minimale

```
FAQ Item (div.faq-item)
├── Question Wrapper (div.faq-question) - clickable
│   ├── Question Text (h3)
│   └── Toggle Icon (div.icon) - chevron
└── Answer Wrapper (div.faq-answer) - hidden by default
    └── Answer Text (p)
```

### Propriétés clés
- Border-bottom: 1px solid var(--neutral-200)
- Padding: 1.5rem 0

### Interactions
- Click on `.faq-question` → toggle class `.open` on `.faq-item`
- `.faq-answer` : max-height: 0 → max-height: 500px (avec transition)
- `.icon` : rotate(0deg) → rotate(180deg)

### Classes utiles
- `.faq-item` (container)
- `.faq-item.open` (état ouvert)
- `.faq-question` (clickable header)
- `.faq-answer` (contenu réponse)
- `.toggle-icon` (chevron animé)

### Code interaction Webflow
```javascript
// À ajouter dans Webflow Interactions ou Custom Code
$('.faq-question').click(function() {
  $(this).parent('.faq-item').toggleClass('open');
});
```

---

## 5. Project Card Symbol

**Nom du Symbol :** `Project Card`

### Structure minimale

```
Project Card (Link Block ou div)
├── Thumbnail (div.project-thumbnail)
│   ├── Image (img) - CMS bound ou placeholder
│   └── Overlay (div.overlay) - apparaît au hover
│       └── View Button (div) - "Voir le projet"
├── Card Content (div.card-content)
│   ├── Category Tag (span.tag) - ex: "Web Design"
│   ├── Title (h3) - CMS bound
│   └── Description (p) - CMS bound (excerpt)
└── Card Footer (div.card-footer)
    ├── Tech Stack (div.tech-badges)
    │   ├── Badge 1 (span.badge)
    │   ├── Badge 2 (span.badge)
    │   └── Badge 3 (span.badge)
    └── Arrow Icon (div.arrow) - indication lien
```

### Propriétés clés
- Border-radius: 0.5rem
- Box-shadow: subtle
- Transition: transform 0.3s, box-shadow 0.3s
- Hover: transform: translateY(-4px), box-shadow: enhanced

### Liaison CMS (si Collection Item)
- Image : bind to `Thumbnail Image`
- Title : bind to `Name`
- Description : bind to `Short Description`
- Category : bind to `Category` (reference field)
- Tech Stack : bind to `Technologies` (multi-reference)

### Classes utiles
- `.project-card` (container)
- `.project-thumbnail` (image wrapper)
- `.overlay` (hover overlay)
- `.card-content` (texte principal)
- `.tech-badges` (liste badges techno)
- `.badge` (badge individuel)

---

## Notes d'implémentation

### Ordre de création recommandé
1. **Navbar** et **Footer** en premier (présents sur toutes les pages)
2. **CTA Section** (réutilisable sur plusieurs pages clés)
3. **Project Card** (si section portfolio)
4. **FAQ Item** (si page FAQ/À propos)

### Bonnes pratiques
- Utiliser des **classes combo** plutôt que des styles inline
- Créer des **Symbol Settings** pour les variantes (couleur, taille)
- Tester la **responsivité** sur mobile/tablet avant de finaliser
- Lier aux **tokens CSS** (variables) pour cohérence

### CMS Binding
Pour **Project Card**, créer une Collection "Projects" avec les champs :
- Name (text)
- Slug (slug, auto-generate from Name)
- Thumbnail Image (image)
- Short Description (plain text, 160 char)
- Category (reference to Categories collection)
- Technologies (multi-reference to Technologies collection)
- Featured (toggle)

---

**Version :** 1.0
**Date :** 2025-01-05
**Auteur :** Webflow Kit Migration Team
