# EfSVP Premium WordPress Theme

Thème WordPress premium pour **En français s'il vous plaît** (EfSVP) - Studio de création narrative et musicale.

## 🎨 À propos

Ce thème a été créé pour offrir une expérience éditoriale premium avec Gutenberg, un design system cohérent basé sur la palette Automne Doux/Printemps Chaud, et une performance optimale.

### Caractéristiques principales

- ✅ **5 blocs Gutenberg personnalisés** (Hero, Services, Portfolio, Testimonials, CTA)
- ✅ **Design system complet** avec variables CSS
- ✅ **Responsive** (mobile, tablet, desktop)
- ✅ **Performance optimisée** (lazy loading, defer scripts, optimisations)
- ✅ **Accessible** (WCAG AA, navigation clavier, ARIA labels)
- ✅ **Traductions** prêt pour i18n
- ✅ **SEO-friendly**

## 🚀 Installation

### Méthode 1: Upload ZIP

1. Télécharge le dossier `wp-theme-efsvp`
2. Zippe-le en fichier `.zip`
3. Dans WordPress, va dans `Apparence > Thèmes > Ajouter`
4. Clique sur `Téléverser un thème`
5. Sélectionne le fichier ZIP
6. Clique sur `Installer maintenant`
7. Active le thème

### Méthode 2: FTP/SFTP

1. Upload le dossier `wp-theme-efsvp` dans `/wp-content/themes/`
2. Dans WordPress, va dans `Apparence > Thèmes`
3. Active le thème **EfSVP Premium**

## ⚙️ Configuration Initiale

### 1. Logo

1. Va dans `Apparence > Personnaliser`
2. Clique sur `Identité du site`
3. Upload ton logo (recommandé: SVG ou PNG avec fond transparent)
4. Dimensions recommandées: 400x100px

### 2. Menus

1. Va dans `Apparence > Menus`
2. Crée un menu "**Principal**"
   - Ajoute les pages: Créations, Portfolio, Process, FAQ, Contact
   - Assigne-le à l'emplacement "**Menu Principal**"
3. Crée un menu "**Footer**"
   - Ajoute les liens footer souhaités
   - Assigne-le à l'emplacement "**Menu Footer**"

### 3. Page d'accueil

1. Va dans `Réglages > Lecture`
2. Choisis "Une page statique"
3. Sélectionne ta page d'accueil (avec les blocs Hero, Services, etc.)

## 🧩 Blocs Gutenberg Disponibles

Le thème inclut 5 blocs personnalisés dans la catégorie **EfSVP Premium**:

### 1. Hero Section

Section d'en-tête premium avec:
- Titre et sous-titre
- Description
- Image/vidéo de fond avec overlay
- Bouton CTA
- Métriques de confiance (optionnel)

**Utilisation**: Idéal pour la page d'accueil en haut de page.

### 2. Services Grid

Grille de services/prestations avec:
- Titre de section
- Icônes personnalisables
- Titre et description par service
- Colonnes configurables (1-4)

**Utilisation**: Pour présenter vos offres et services.

### 3. Portfolio Grid

Galerie de projets avec:
- Images de projets
- Catégories
- Titres et descriptions
- Effet hover élégant

**Utilisation**: Pour mettre en avant vos réalisations.

### 4. Testimonials

Section témoignages avec:
- Citations
- Photos des auteurs
- Noms, rôles, entreprises
- Fond sombre optionnel

**Utilisation**: Pour afficher la preuve sociale et les avis clients.

### 5. Call-to-Action (CTA)

Section d'appel à l'action avec:
- Titre accrocheur
- Description
- Bouton principal
- Bouton secondaire (optionnel)
- Fond coloré ou image

**Utilisation**: Pour inciter à l'action (contact, inscription, etc.).

## 🎨 Design System

### Palette de couleurs

Le thème utilise une palette **Automne Doux / Printemps Chaud**:

- **Terracotta** (#b95a40) - Couleur signature
- **Kaki Doux** (#8a8a68) - Accent naturel
- **Camel** (#c39d6b) - Secondaire chaleureux
- **Beige** (#e6d9c3) - Secondaire doux
- **Encre** (#1d2c3b) - Texte principal
- **Parchemin** (#fbf8f3) - Fond principal

### Typographie

- **Titres**: Playfair Display (serif élégant)
- **Corps**: Inter (sans-serif moderne)
- **Accent**: Cormorant (serif italique)

Toutes les tailles sont fluides et responsive avec `clamp()`.

### Espacements

Système basé sur 8px (0.5rem) pour une cohérence parfaite:
- `--space-2` à `--space-32` (8px à 128px)

### Synchronisation Gutenberg / Design Tokens

- `theme.json` expose la palette EfSVP via `settings.color.palette` afin que l'éditeur Gutenberg retrouve exactement les couleurs `--primary`, `--secondary`, `--accent-*` définies dans `assets/css/design-tokens.css`.
- Les familles de caractères Playfair Display, Inter et Cormorant sont déclarées dans `theme.json` (`settings.typography.fontFamilies`) et chargées côté front & éditeur via `inc/enqueue-scripts.php` et `inc/theme-setup.php`. Elles correspondent aux variables `--font-display`, `--font-body` et `--font-accent` des tokens CSS.
- L'échelle d'espacements Gutenberg (`settings.spacing.spacingSizes`) reflète la grille `--space-*` incluse dans `assets/css/design-tokens.css`, garantissant des valeurs identiques entre l'éditeur et le front.

> ℹ️ Le fichier `assets/css/design-tokens.css` est généré depuis la maquette (`src/styles/design-tokens.css`) et chargé globalement avant `design-system.css`. Toute mise à jour des tokens doit être répercutée dans ces deux emplacements pour conserver la parité éditeur/front.

## 📱 Responsive

Le thème est **mobile-first** avec breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Tous les blocs s'adaptent automatiquement.

## ⚡ Performance

### Optimisations incluses

- ✅ CSS chargé de manière modulaire
- ✅ JavaScript différé (`defer`)
- ✅ Images lazy-loaded
- ✅ Fonts preconnect
- ✅ Code minifié en production
- ✅ Variables CSS pour éviter le recalcul

### Recommandations

1. Utilise des images optimisées (WebP si possible)
2. Active la mise en cache WordPress
3. Utilise un CDN pour les assets statiques
4. Active la compression Gzip/Brotli

## 🔒 Sécurité

Le thème respecte les standards WordPress:

- Échappement de toutes les sorties (`esc_html`, `esc_url`, `wp_kses_post`)
- Vérification ABSPATH dans tous les fichiers
- Nonces pour AJAX
- Pas d'eval() ou de code dangereux

## 🌍 Traductions

Le thème est prêt pour la traduction:

- Text domain: `efsvp`
- Fichier POT inclus dans `/languages/`
- Toutes les chaînes sont traduisibles

Pour ajouter une traduction:

1. Utilise Poedit ou Loco Translate
2. Charge le fichier `languages/efsvp.pot`
3. Traduis les chaînes
4. Sauvegarde en `.po` et `.mo`

## 🛠 Customisation

### Via le Customizer WordPress

1. Va dans `Apparence > Personnaliser`
2. Section **Options EfSVP**:
   - Texte footer personnalisé
   - (autres options à venir)

### Via CSS personnalisé

Ajoute du CSS personnalisé dans:
- `Apparence > Personnaliser > CSS additionnel`

Ou crée un thème enfant pour des modifications plus importantes.

### Variables CSS

Toutes les variables sont dans `assets/css/design-system.css`.
Tu peux les override dans ton CSS personnalisé:

```css
:root {
  --primary: #ta-couleur;
  --space-8: 2.5rem;
}
```

## 📁 Structure des fichiers

```
wp-theme-efsvp/
├── style.css                 # Theme header
├── functions.php             # Core functions
├── header.php                # Header template
├── footer.php                # Footer template
├── index.php                 # Main template
├── page.php                  # Page template
├── single.php                # Single post template
├── 404.php                   # 404 template
├── screenshot.png            # Theme screenshot
├── assets/
│   ├── css/                  # Stylesheets
│   ├── js/                   # Scripts
│   ├── images/               # Images & logos
│   └── fonts/                # Custom fonts (si nécessaire)
├── blocks/                   # Gutenberg blocks
│   ├── hero/
│   ├── services/
│   ├── portfolio/
│   ├── testimonials/
│   └── cta/
├── inc/                      # PHP includes
├── template-parts/           # Template partials
├── page-templates/           # Custom page templates
└── languages/                # Translation files
```

## 🐛 Dépannage

### Le thème ne s'active pas

- Vérif que PHP >= 8.0
- Vérif que WordPress >= 6.0
- Check les logs d'erreur PHP

### Les blocs ne s'affichent pas

1. Va dans l'éditeur Gutenberg
2. Clique sur le "+" pour ajouter un bloc
3. Cherche "EfSVP Premium" dans les catégories
4. Si absent, vide le cache WordPress

### Les styles ne se chargent pas

1. Vide le cache du navigateur
2. Vide le cache WordPress
3. Vérif les permissions des fichiers CSS

### Le menu mobile ne fonctionne pas

1. Vérif que JavaScript est activé
2. Vérif qu'il n'y a pas de conflits JS (console du navigateur)
3. Désactive temporairement les autres plugins

## 📞 Support

Pour toute question ou problème:

- **Email**: contact@enfrancoissilvousplait.com
- **Website**: https://enfrancoissilvousplait.com

## 📝 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

## 📄 Licence

GNU General Public License v2 or later.
Voir [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html)

## 🙏 Crédits

- **Design & Development**: EfSVP Team
- **Fonts**: Google Fonts (Playfair Display, Inter, Cormorant)
- **Icons**: Custom SVG

---

**Made with ❤️ for storytelling and music creation**
