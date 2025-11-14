# Assets Upload Guide - Webflow

## Vue d'ensemble

Le site EfSVP utilise **principalement des gradients CSS** pour les visuels (case cards, portfolio cards, audio players). Seuls quelques médias réels doivent être uploadés dans Webflow.

## Assets à Uploader

### 1. Favicon
- **Fichier** : `/favicon.svg`
- **Format** : SVG
- **Usage** : Favicon site + OG image fallback
- **Emplacement Webflow** : Site Settings > General > Favicon

### 2. Vidéos Hero
- **Fichiers** :
  - `/media/efsvp-hero.mp4` (format principal)
  - `/media/efsvp-hero.webm` (format alternatif)
- **Usage** : Hero section background (full bleed)
- **Emplacement Webflow** : Assets > Videos
- **Optimisation requise** :
  - Compression vidéo (target < 5MB)
  - Résolution max 1920x1080
  - Bitrate optimisé pour web (2-3 Mbps)
  - Durée : boucle 10-20s recommandée

### 3. Images Portfolio (Placeholders)

**Note importante** : Le HTML actuel utilise des **gradients CSS inline** plutôt que des images réelles. Vous avez 2 options :

#### Option A : Garder les Gradients (Recommandé pour MVP)
- Pas d'images à uploader
- Utiliser les gradients définis dans `design-tokens.json`
- Implémentation : divs avec background CSS

#### Option B : Remplacer par Vraies Images
Si vous souhaitez ajouter de vraies photos de projets, créez :

**Format requis** :
- Format : WebP
- Résolution : @2x (ex: 800x600 affiché à 400x300)
- Max width : 1600px
- Naming : kebab-case
- Qualité : 85%

**Images à créer** (voir `cms-import/projects.csv`) :
1. `hymne-maine-et-loire-1.webp` (ou garder gradient #b8441e → #e8924f)
2. `sival-agricole-1.webp` (ou garder gradient #e8924f → #d4af37)
3. `atelier-lacour-25ans-1.webp` (ou garder gradient #2d2d2d → #7d2e2e)
4. `reseau-cocagne-portraits-1.webp` (ou garder gradient #f5e6d3 → #d4af37)
5. `etat-nature-spectacle-1.webp`, `etat-nature-spectacle-2.webp`, `etat-nature-spectacle-3.webp` (ou garder gradient #7d2e2e → #b8441e)
6. `clisson-deambulation-1.webp` (ou garder gradient #1a2332 → #2d2d2d)

## Protocole d'Upload Webflow

### Ordre Recommandé

#### 1. Configuration Favicon (Étape 0)
1. Aller dans **Site Settings > General**
2. Section **Favicon**
3. Uploader `/favicon.svg`
4. Webflow générera automatiquement les différentes tailles

#### 2. Upload Vidéos Hero (Étape 1)
1. Aller dans **Assets Manager** (icône image dans la barre latérale)
2. Créer dossier `/videos`
3. Uploader les 2 fichiers vidéo :
   - `efsvp-hero.mp4`
   - `efsvp-hero.webm`
4. Noter les URLs générées par Webflow

#### 3. Upload Images Portfolio (Étape 2 - Optionnel)
**Seulement si Option B choisie**

1. Dans **Assets Manager**, créer dossier `/images/portfolio`
2. Uploader toutes les images WebP
3. Nommer les images de façon cohérente avec le CSV
4. Vérifier la compression (chaque image < 500KB idéalement)

#### 4. Liaison avec CMS (Étape 3)
1. Créer Collection **Projects** (voir `webflow-build-checklist.md`)
2. Ajouter champs :
   - `image1` (type Image)
   - `image2` (type Image)
   - `image3` (type Image)
3. Lors de l'import CSV ou édition manuelle :
   - **Option A** : Laisser images vides, utiliser div avec gradient CSS
   - **Option B** : Lier les images uploadées

## Structure Finale Asset Manager

```
Webflow Assets
├── favicon.svg
├── videos/
│   ├── efsvp-hero.mp4
│   └── efsvp-hero.webm
└── images/
    └── portfolio/
        ├── hymne-maine-et-loire-1.webp (optionnel)
        ├── sival-agricole-1.webp (optionnel)
        ├── atelier-lacour-25ans-1.webp (optionnel)
        ├── reseau-cocagne-portraits-1.webp (optionnel)
        ├── etat-nature-spectacle-1.webp (optionnel)
        ├── etat-nature-spectacle-2.webp (optionnel)
        ├── etat-nature-spectacle-3.webp (optionnel)
        └── clisson-deambulation-1.webp (optionnel)
```

## Optimisation Vidéo (Avant Upload)

Si les vidéos hero sont trop lourdes, utiliser FFmpeg :

```bash
# MP4 optimisé
ffmpeg -i efsvp-hero-original.mp4 \
  -vcodec libx264 -crf 28 \
  -preset medium \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  -movflags +faststart \
  -an \
  efsvp-hero.mp4

# WebM optimisé
ffmpeg -i efsvp-hero-original.mp4 \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease" \
  -an \
  efsvp-hero.webm
```

**Flags importants** :
- `-crf 28-35` : Qualité (plus bas = meilleure qualité mais plus lourd)
- `-movflags +faststart` : Permet lecture progressive (streaming)
- `-an` : Supprime audio (inutile pour background)
- `scale=1920:1080` : Limite résolution

## Optimisation Images (Avant Upload)

Si Option B choisie, utiliser :

**ImageMagick** :
```bash
convert original.jpg \
  -resize 1600x1600\> \
  -quality 85 \
  -strip \
  output.webp
```

**Squoosh CLI** :
```bash
squoosh-cli --webp '{"quality":85}' --resize '{"width":1600}' *.jpg
```

## Webflow Image Settings

Lors de l'utilisation d'images CMS dans Webflow :

1. **Responsive** :
   - Activer "Responsive image" dans settings
   - Webflow générera automatiquement sizes (srcset)

2. **Loading** :
   - Hero : `loading="eager"`
   - Portfolio below fold : `loading="lazy"`

3. **Alt Text** :
   - Utiliser champ CMS pour alt dynamique
   - Format : "{project-title} - {client}"

## Performance Checklist

Après upload, vérifier :

- [ ] Favicon SVG visible dans l'onglet navigateur
- [ ] Vidéo hero < 5MB et se charge en < 3s (3G)
- [ ] Vidéo hero en loop et autoplay (muted)
- [ ] Images portfolio < 500KB chacune (si Option B)
- [ ] Images lazy-loaded (sauf hero)
- [ ] Pas d'images non utilisées dans Asset Manager
- [ ] Total assets < 20MB pour bonne performance mobile

## Variantes Mobile (Optionnel)

Pour optimiser mobile, créer variantes :

**Vidéo hero mobile** :
- Résolution : 720p (1280x720)
- Taille cible : < 2MB
- Charger conditionnellement via media queries

**Images portfolio mobile** :
- Résolution : 800px width max
- Utiliser srcset Webflow automatique

## Notes Importantes

1. **Gradients vs Images** : Le design actuel privilégie gradients CSS (léger, rapide). Ajouter vraies images seulement si valeur ajoutée UX.

2. **CDN Webflow** : Tous les assets uploadés sont automatiquement servis via CDN global (pas de config requise).

3. **Versionning** : Webflow ne versione pas les assets. Garder backups locaux.

4. **Limits Plan** : Vérifier limites storage selon plan Webflow (CMS plan = 200GB bandwidth/mois).

5. **OG Images** : Pour social sharing, créer OG image dédiée (1200x630px) si budget le permet. Sinon, utiliser favicon.svg.

---

**Recommandation** : Commencer avec **Option A** (gradients CSS) pour MVP rapide, puis ajouter vraies photos progressivement selon budget photo/design.
