# Open Graph Pack — EfSVP

**Visuels pour réseaux sociaux et webmanifest**

---

## 📦 Contenu à Créer

### 1. Image Open Graph (1200x630px)

**Fichier :** `og-image-1200x630.png`

**Spécifications :**
- Taille : **1200 x 630 pixels** (format OG standard)
- Format : **PNG** ou **JPG**
- Poids : < 1 MB
- Résolution : 72 dpi minimum

**Contenu suggéré :**
- Background : Gradient doux Parchment → Sand ou image texturée
- Logo EfSVP centré (ou en haut)
- Tagline : "Vous avez déjà écrit l'histoire."
- Baseline : "Studio narratif & musical"
- Couleurs : Palette Parchemin/Encre/Terre cuite
- Style : Premium, sobre, élégant

**Usage :**
```html
<meta property="og:image" content="https://enfrancaissvp.fr/assets/og-image-1200x630.png" />
<meta name="twitter:image" content="https://enfrancaissvp.fr/assets/og-image-1200x630.png" />
```

---

### 2. Twitter Card (1200x630px)

**Fichier :** `twitter-card-1200x630.png`

**Spécifications :** Identiques à OG image

**Option :** Utiliser la même image que OG (1200x630), ou créer une variante spécifique Twitter.

---

### 3. Favicon Pack

**Fichiers à créer :**

- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `favicon-192x192.png` (192x192, pour Android)
- `favicon-512x512.png` (512x512, pour Android/iOS)
- `apple-touch-icon.png` (180x180, pour iOS)

**Contenu :**
- Initiale "E" sur fond Primary (#b95a40)
- Ou logo EfSVP simplifié

**Outil recommandé :** https://realfavicongenerator.net/

---

### 4. Webmanifest (PWA)

**Fichier :** `site.webmanifest`

```json
{
  "name": "En français s'il vous plaît",
  "short_name": "EfSVP",
  "description": "Studio de création narrative et musicale",
  "icons": [
    {
      "src": "/assets/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#fbf8f3",
  "background_color": "#fbf8f3",
  "display": "standalone",
  "start_url": "/"
}
```

**Lien dans `<head>` :**
```html
<link rel="manifest" href="/site.webmanifest">
```

---

## 🎨 Guide de Création (Open Graph Image)

### Outils Recommandés

**Design :**
- Figma (modèle OG 1200x630)
- Canva (templates OG ready)
- Photoshop

**Palette de Couleurs :**
- Background : `#fbf8f3` (Parchment)
- Texte principal : `#1d2c3b` (Ink)
- Accent : `#b95a40` (Primary)

### Template Figma (Suggestion)

**Layout :**

```
┌──────────────────────────────────────────┐
│                                          │
│          [Logo EfSVP centré]             │
│                                          │
│    "Vous avez déjà écrit l'histoire."    │
│                                          │
│      Studio narratif & musical           │
│                                          │
│          enfrancaissvp.fr                │
│                                          │
└──────────────────────────────────────────┘
```

**Typo :**
- Titre : Playfair Display Bold, 56px, Ink
- Baseline : Inter Medium, 28px, Text Secondary
- URL : Inter Regular, 20px, Muted

**Éléments visuels :**
- Texture grain subtile (comme sur le site)
- Optionnel : Motif géométrique doux en arrière-plan

---

## ✅ Checklist de Validation

Avant d'uploader les OG images :

- [ ] **Dimensions exactes** : 1200x630px (vérifier dans l'outil)
- [ ] **Poids < 1 MB** : Compresser si nécessaire (TinyPNG, Squoosh)
- [ ] **Texte lisible** : Tester l'affichage réduit (300x157px preview Facebook)
- [ ] **Safe zone** : Texte important dans les 1200x600 centraux (éviter les bords)
- [ ] **Couleurs cohérentes** : Respect de la palette EfSVP
- [ ] **Upload dans Webflow Assets** : Et lier dans Page Settings > Open Graph

---

## 🧪 Tester les OG Tags

**Outils de test :**

- **Facebook Debugger** : https://developers.facebook.com/tools/debug/
  - Entrer `https://enfrancaissvp.fr`
  - Vérifier l'aperçu de la card
  - Cliquer "Scrape Again" si l'image ne se met pas à jour

- **Twitter Card Validator** : https://cards-dev.twitter.com/validator
  - Entrer l'URL
  - Vérifier l'aperçu

- **LinkedIn Post Inspector** : https://www.linkedin.com/post-inspector/
  - Entrer l'URL
  - Vérifier l'aperçu

- **Open Graph Preview** : https://www.opengraph.xyz/
  - Preview multi-plateformes (Facebook, Twitter, LinkedIn, Slack)

---

## 📝 Notes

**Actuellement :**
- Les fichiers OG ne sont pas encore créés.
- Ce dossier contient uniquement ce README.

**Prochaines étapes :**
1. Designer l'OG image (1200x630) selon les specs ci-dessus
2. Générer le pack de favicons (16, 32, 192, 512, 180)
3. Créer le webmanifest
4. Uploader dans Webflow Assets
5. Configurer dans Page Settings > Open Graph
6. Tester avec les outils ci-dessus

---

**Fin du README OG Pack** ✨
