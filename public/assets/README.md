# 📁 Assets Structure - EfSVP Portfolio

Organisation des assets (images, vidéos, audio, logos) avec une convention centrée sur le **slug** des projets.

## 📂 Structure générale

```
/public/assets/
├── images/projects/<slug>/            # Cover + galerie (.gitkeep présent)
├── videos/projects/<slug>/            # Teaser vidéo (optionnel, .gitkeep présent)
├── audio/projects/<slug>/             # Extraits audio (optionnel, ignorés par Git)
├── clients/                           # Logos éventuels
│   ├── logos/
│   │   └── .gitkeep
│   └── clients.json
└── projects/                          # Réservé aux overrides avancés (dev uniquement)
    ├── _metadata-template.json
    └── .gitkeep
```

- `<slug>` = valeur du champ `slug` (et `id`) dans `content/projects.json`.
- Les fichiers audio lourds restent exclus du dépôt (`public/assets/audio/*` est ignoré par Git).
- Les non-dev n'ont jamais besoin d'ouvrir `public/assets/projects/` : ce dossier ne sert qu'aux overrides spécifiques (metadata.json).

## 🏷️ Slugs normalisés (référence rapide)

```
a2mo
agglo-bus
atelier-lacour
capeb
la-force-de-la-douceur
dis-moi-des-mots-d-amour
doue-en-anjou
doue-en-sports
jardin-de-cocagne
forges-tout-feu-tout-flamme
seigneurs-de-clisson
moulin-de-brissac
don-quijote-de-la-francia
anjour-et-nuit
etat-de-nature
sival
souffler-sur-les-braises
```

## 🎨 Médias projet (images / vidéos / audio)

### Nommage recommandé
- **Cover obligatoire** : `/assets/images/projects/<slug>/cover.webp`
- **Galerie (optionnel)** : `/assets/images/projects/<slug>/gallery-01.webp`, `gallery-02.webp`, ...
- **Vidéo (optionnel)** : `/assets/videos/projects/<slug>/teaser.mp4`
- **Audio (optionnel)** : `/assets/audio/projects/<slug>/extrait-01.mp3`

Ajoute uniquement les fichiers disponibles : si tu n'as qu'une image, ne fournis que `cover.webp`. Si tu as une vidéo ou un audio, nomme-les respectivement `teaser.mp4` et `extrait-01.mp3` dans le dossier du projet.

### Lien avec les données
Chaque entrée de `content/projects.json` est identifiée par un `slug`. Le loader construit automatiquement les chemins suivants :

```json
"media": {
  "coverImage": "/assets/images/projects/<slug>/cover.webp",
  "gallery": ["/assets/images/projects/<slug>/gallery-01.webp"],
  "video": "/assets/videos/projects/<slug>/teaser.mp4",
  "audio": "/assets/audio/projects/<slug>/extrait-01.mp3"
}
```

Les champs `video` et `audio` sont optionnels : laisse-les vides si le fichier n'existe pas. Les fichiers audio/vidéo volumineux restent hors Git (à héberger en prod si besoin).

## 🚀 Workflow d'ajout rapide
1. Créer le dossier du slug (ex : `public/assets/images/projects/la-force-de-la-douceur/`).
2. Déposer `cover.webp` (puis `gallery-01.webp`, `gallery-02.webp` si dispo).
3. Si vidéo : `public/assets/videos/projects/<slug>/teaser.mp4`.
4. Si audio : `public/assets/audio/projects/<slug>/extrait-01.mp3`.
5. Vérifier/mettre à jour `content/projects.json` si un override manuel est nécessaire (le loader suit ces conventions par défaut).

## 🔧 Overrides avancés (réservé aux devs)

- Si un projet a besoin d'un `metadata.json` spécifique, place-le dans `public/assets/projects/<slug>/metadata.json` en te basant sur `_metadata-template.json`.
- Ne pas déposer d'images/vidéos ici : les médias restent dans `images/projects/<slug>/` et `videos/projects/<slug>/` pour les non-dev.
