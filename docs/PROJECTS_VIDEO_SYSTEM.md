# 🎬 SYSTÈME DE PROJETS AVEC SUPPORT VIDÉO

Documentation complète du système de projets dynamiques avec support audio ET vidéo.

> ⚠️ Document partiellement obsolète : se référer en priorité à `public/assets/README.md` pour l'arborescence (images/projects/<slug>/, videos/projects/<slug>/, audio/projects/<slug>/). Les exemples ci-dessous sont alignés sur cette structure.

**Date de mise à jour** : 2025-11-18

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Structure des fichiers](#structure-des-fichiers)
3. [Configuration des projets](#configuration-des-projets)
4. [Logique d'affichage](#logique-daffichage)
5. [Exemples pratiques](#exemples-pratiques)
6. [API & Modules](#api--modules)
7. [Styles & Design](#styles--design)
8. [Migration](#migration)

---

## 🎯 VUE D'ENSEMBLE

Le système de projets permet d'afficher dynamiquement des projets avec :
- **Une seule image principale** (simplification)
- **Support audio** OU **support vidéo** (pas les deux)
- **Détection automatique** du type de media à afficher
- **Players premium** avec contrôles personnalisés

### Principe clé

**Un projet peut avoir soit AUDIO, soit VIDÉO, mais PAS LES DEUX en même temps.**

Si les deux sont configurés, la **VIDÉO a la priorité**.

---

## 📁 STRUCTURE DES FICHIERS

### Structure recommandée d'un projet

```
/public/assets/
├── images/projects/mon-projet/   ← Image principale + galerie
├── audio/projects/mon-projet/    ← Audio éventuel (hors Git)
└── videos/projects/mon-projet/   ← Vidéo éventuelle
```

### Fichiers du système

```
src/
├── types/
│   └── project.ts                 ← Définitions TypeScript
├── schemas/
│   └── project.schema.ts          ← Validation Zod
├── components/projects/
│   └── ProjectModal.ts            ← Gestion de la modal
├── scripts/modules/
│   ├── projectAudioPlayer.js      ← Player audio
│   └── projectVideoPlayer.js      ← Player vidéo ✨ NOUVEAU
└── styles/
    ├── audio-player.css
    └── video-player.css           ← ✨ NOUVEAU

content/
└── projects.json                  ← Base de données projets

public/assets/projects/
└── _metadata-template.json        ← Template de configuration
```

---

## ⚙️ CONFIGURATION DES PROJETS

### Fichier `content/projects.json`

Chaque projet est un objet dans le tableau JSON centralisé.

### Exemple : Projet avec IMAGE SEULE

```json
{
  "id": "projet-image-seule",
  "title": "Mon Projet",
  "client": "Client X",
  "year": 2025,
  "location": "Paris",
  "status": "delivered",
  "cover": {
    "image": "/assets/images/projects/projet-image-seule/main.jpg",
    "initials": "MP",
    "gradient": {
      "from": "var(--color-primary-500)",
      "to": "var(--color-neutral-700)"
    }
  },
  "shortDescription": "Description courte...",
  "longDescription": ["Premier paragraphe.", "Deuxième paragraphe."],
  "category": "branding",
  "sector": "institutionnel",
  "themes": ["Design", "Identité visuelle"],
  "details": {
    "format": "Identité visuelle",
    "duration": "2 mois",
    "audience": "Grand public",
    "deliverables": ["Logo", "Charte graphique"]
  },
  "team": ["Designer 1", "Designer 2"]
}
```

### Exemple : Projet avec IMAGE + AUDIO

```json
{
  "id": "projet-audio",
  "title": "Concert Live",
  "client": "Client Y",
  "year": 2025,
  "location": "Angers",
  "status": "delivered",
  "cover": {
    "image": "/assets/images/projects/projet-audio/main.jpg",
    "initials": "CL"
  },
  "shortDescription": "Concert pour les 25 ans...",
  "longDescription": ["Description du concert..."],
  "category": "concert live",
  "sector": "artisanat",
  "themes": ["Musique sur mesure"],
  "details": {
    "format": "Concert live",
    "duration": "15 minutes",
    "audience": "Salariés",
    "deliverables": ["Concert", "Enregistrement"]
  },
  "team": ["Musicien 1", "Musicien 2"],

  "audio": {
    "enabled": true,
    "title": "Concert 25 ans - Enregistrement live",
    "artist": "EfSVP Studio",
    "duration": 420,
    "files": {
      "mp3": "/assets/audio/projects/projet-audio/concert.mp3"
    },
    "waveformColor": "var(--color-primary-500)",
    "description": "Enregistrement complet du concert"
  }
}
```

### Exemple : Projet avec IMAGE + VIDÉO

```json
{
  "id": "projet-video",
  "title": "Vidéo Promotionnelle",
  "client": "Client Z",
  "year": 2025,
  "location": "Paris",
  "status": "delivered",
  "cover": {
    "image": "/assets/images/projects/projet-video/main.jpg",
    "initials": "VP"
  },
  "shortDescription": "Vidéo de promotion du territoire...",
  "longDescription": ["Réalisation d'une vidéo..."],
  "category": "vidéo promotionnelle",
  "sector": "institutionnel",
  "themes": ["Vidéo", "Promotion"],
  "details": {
    "format": "Vidéo",
    "duration": "3 minutes",
    "audience": "Tous publics",
    "deliverables": ["Vidéo HD"]
  },
  "team": ["Réalisateur", "Monteur"],

  "video": {
    "enabled": true,
    "title": "Vidéo promotionnelle - Version longue",
    "duration": 180,
    "files": {
      "mp4": "/assets/videos/projects/projet-video/promo.mp4"
    },
    "poster": "/assets/images/projects/projet-video/main.jpg",
    "autoplay": false,
    "description": "Version longue de la vidéo promotionnelle"
  }
}
```

---

## 🎮 LOGIQUE D'AFFICHAGE

### Algorithme de détection (ProjectModal.ts)

```typescript
if (hasProjectVideo(project)) {
  // PRIORITÉ 1 : VIDÉO
  afficherVideoPlayer();
  masquerAudioPlayer();

} else if (hasProjectAudio(project)) {
  // PRIORITÉ 2 : AUDIO
  afficherAudioPlayer();
  masquerVideoPlayer();

} else {
  // AUCUN MEDIA
  masquerTout();
}
```

### Fonctions helper

- `hasProjectVideo(project)` : Vérifie si `video.enabled === true` ET `video.files.mp4` existe
- `hasProjectAudio(project)` : Vérifie si `audio.enabled === true` ET `audio.files.mp3` existe

---

## 💡 EXEMPLES PRATIQUES

### Cas 1 : Projet simple (image seule)

✅ **Fichiers nécessaires** :
- `/public/assets/images/projects/mon-projet/main.jpg`

✅ **Configuration** :
```json
{
  "id": "mon-projet",
  "cover": {
    "image": "/assets/images/projects/mon-projet/main.jpg",
    "initials": "MP"
  }
  // Pas de section "audio" ni "video"
}
```

### Cas 2 : Projet avec audio

✅ **Fichiers nécessaires** :
- `/public/assets/images/projects/mon-projet/main.jpg`
- `/public/assets/audio/projects/mon-projet/track.mp3`

✅ **Configuration** :
```json
{
  "id": "mon-projet",
  "cover": {
    "image": "/assets/images/projects/mon-projet/main.jpg"
  },
  "audio": {
    "enabled": true,
    "title": "Ma piste",
    "duration": 180,
    "files": {
      "mp3": "/assets/audio/projects/mon-projet/track.mp3"
    }
  }
}
```

### Cas 3 : Projet avec vidéo

✅ **Fichiers nécessaires** :
- `/public/assets/images/projects/mon-projet/main.jpg`
- `/public/assets/videos/projects/mon-projet/video.mp4`

✅ **Configuration** :
```json
{
  "id": "mon-projet",
  "cover": {
    "image": "/assets/images/projects/mon-projet/main.jpg"
  },
  "video": {
    "enabled": true,
    "title": "Ma vidéo",
    "duration": 120,
    "files": {
      "mp4": "/assets/videos/projects/mon-projet/video.mp4"
    },
    "poster": "/assets/images/projects/mon-projet/main.jpg"
  }
}
```

---

## 🔧 API & MODULES

### Module `projectVideoPlayer.js`

#### Fonctions exportées

```javascript
// Créer un player vidéo
createProjectVideoPlayer(container: HTMLElement, project: Project): PlayerInstance | null

// Vérifier si un projet a une vidéo
hasProjectVideo(project: Project): boolean

// Détruire un player
destroyProjectVideoPlayer(playerInstance: PlayerInstance): void
```

#### Structure du PlayerInstance

```javascript
{
  video: HTMLVideoElement,
  container: HTMLElement,
  isPlaying: boolean,
  isMuted: boolean,
  currentVolume: number
}
```

### Module `projectAudioPlayer.js`

#### Fonctions exportées

```javascript
// Créer un player audio
createProjectAudioPlayer(container: HTMLElement, project: Project): WaveSurfer | null

// Vérifier si un projet a de l'audio
hasProjectAudio(project: Project): boolean

// Détruire un player
destroyProjectAudioPlayer(wavesurfer: WaveSurfer): void
```

---

## 🎨 STYLES & DESIGN

### Variables CSS (video-player.css)

```css
--video-player-bg: var(--bg-elevated, #ffffff);
--video-player-radius: var(--radius-lg, 12px);
--video-player-shadow: var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.08));
--video-player-padding: var(--space-6, 1.5rem);
--video-controls-height: 60px;
```

### Classes principales

```html
<!-- Container principal -->
<div class="project-video">
  <div class="video-player">

    <!-- Container vidéo -->
    <div class="video-player__container">
      <video class="video-player__video"></video>
      <div class="video-player__overlay"></div>
      <div class="video-player__loading"></div>
    </div>

    <!-- Contrôles -->
    <div class="video-player__controls">
      <button class="video-player__play-btn"></button>
      <div class="video-player__timeline"></div>
      <div class="video-player__time"></div>
      <button class="video-player__volume-btn"></button>
      <button class="video-player__fullscreen-btn"></button>
    </div>

    <!-- Description (optionnel) -->
    <p class="video-player__description"></p>
  </div>
</div>
```

### Raccourcis clavier

- **Espace / K** : Play/Pause
- **F** : Fullscreen
- **M** : Mute/Unmute
- **Flèche gauche** : Reculer de 5s
- **Flèche droite** : Avancer de 5s

---

## 🔄 MIGRATION

### Depuis l'ancien système

Si vous aviez des projets avec `cover.jpg`, `thumbnail.jpg`, `hero.jpg` séparés :

1. **Renommez** une de ces images en `main.jpg`
2. **Supprimez** les autres (ou gardez-les en backup)
3. **Mettez à jour** le champ `cover.image` dans `projects.json`

#### Exemple de migration

**AVANT** :
```
/images/
  - cover.jpg
  - thumbnail.jpg
  - hero.jpg
```

**APRÈS** :
```
/images/
  - main.jpg  (← renommé depuis cover.jpg)
```

```json
{
  "cover": {
    "image": "/assets/images/projects/mon-projet/main.jpg"
  }
}
```

### Ajout d'une vidéo à un projet existant

1. Créez le dossier `/video/` dans le projet
2. Ajoutez votre fichier `video.mp4`
3. Ajoutez la section `video` dans `projects.json`
4. **Désactivez** l'audio si présent (`"enabled": false`)

---

## ✅ CHECKLIST DE CRÉATION D'UN PROJET

- [ ] Créer le dossier `/public/assets/projects/[id]/`
- [ ] Ajouter l'image principale `/images/main.jpg`
- [ ] Ajouter les assets media (audio OU vidéo)
- [ ] Configurer l'objet projet dans `/content/projects.json`
- [ ] Valider avec le schema TypeScript (build sans erreur)
- [ ] Tester l'affichage dans la modal
- [ ] Vérifier le responsive mobile
- [ ] Tester l'accessibilité (navigation clavier)

---

## 🐛 DEBUGGING

### La vidéo ne s'affiche pas

1. Vérifiez `video.enabled === true`
2. Vérifiez que le chemin du fichier MP4 est correct
3. Vérifiez la console pour les erreurs de chargement
4. Vérifiez que le format vidéo est supporté (H.264 pour MP4)

### L'audio s'affiche au lieu de la vidéo

→ La logique donne priorité à la vidéo. Vérifiez `hasProjectVideo()` retourne `true`.

### Erreur TypeScript au build

→ Vérifiez que tous les champs obligatoires sont présents dans le schema.

---

## 📚 RESSOURCES

- **Schema TypeScript** : `src/schemas/project.schema.ts`
- **Types** : `src/types/project.ts`
- **Template** : `public/assets/projects/_metadata-template.json`
- **Audio System Docs** : `docs/PROJECTS_AUDIO_SYSTEM.md`

---

**Dernière mise à jour** : 2025-11-18
**Version** : 2.0 - Support vidéo intégré
