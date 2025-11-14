# Page /experience - Spécification

## Statut Actuel

**EN CONSTRUCTION**

Cette page n'est pas encore développée dans le site actuel. Elle sera créée ultérieurement pour héberger un player audio interactif.

---

## Version Initiale (MVP - À implémenter dans Webflow)

### Objectif

Créer une page placeholder simple et élégante indiquant que la fonctionnalité est en préparation, tout en restant cohérente avec le design system du site.

### Structure HTML

```html
<section class="experience-hero">
  <div class="container">
    <div class="experience-hero__content">
      <h1 class="experience-hero__title">Expérience</h1>
      <p class="experience-hero__subtitle">En construction</p>
      <p class="experience-hero__description">
        Bientôt : un espace d'écoute interactive pour découvrir nos créations.
      </p>
      <a href="/" class="btn btn--primary">
        <span>Retour à l'accueil</span>
        <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
    </div>
  </div>
</section>
```

### Styling

**Section** :
- Background : `linear-gradient(135deg, #0f141a 0%, #141e26 100%)` (gradient dark)
- Min-height : `80vh`
- Display : flex, align center, justify center
- Padding : `var(--space-20)` top/bottom

**Content** :
- Text-align : center
- Max-width : 600px
- Margin : auto
- Color : white (`var(--text-on-dark)` = #f7f5f2)

**Title** :
- Font : Playfair Display
- Size : `clamp(2.5rem, 3vw, 4rem)`
- Weight : 700
- Color : white
- Margin-bottom : `var(--space-4)`

**Subtitle** :
- Font : Inter
- Size : `var(--text-lg)` (1.125-1.375rem)
- Color : `rgba(255, 255, 255, 0.7)`
- Text-transform : uppercase
- Letter-spacing : 0.1em
- Margin-bottom : `var(--space-8)`

**Description** :
- Font : Inter
- Size : `var(--text-base)` (1.063-1.188rem)
- Color : `rgba(255, 255, 255, 0.85)`
- Line-height : 1.7
- Margin-bottom : `var(--space-12)`

**Button** :
- Class : `.btn.btn--primary`
- Icône : flèche gauche (retour)
- Hover : lift effect

---

## Version Future (V2 - Player Audio Interactif)

### Concept

Page dédiée pour écouter les créations du studio avec une expérience immersive et interactive.

### Fonctionnalités Prévues

**1. Player Audio Central** :
- Playlist des projets (liée à Collection Projects)
- Waveform visuelle (WaveSurfer.js ou similaire)
- Contrôles : Play/Pause, Previous/Next, Volume, Timeline
- Affichage artwork, titre, client, année

**2. Filtres Interactifs** :
- Par type (Hymne, Spectacle, Récit)
- Par client (Institution, Entreprise)
- Par année

**3. Visualisation** :
- Waveform dynamique
- Animations sync avec audio
- Mode plein écran optionnel

**4. Métadonnées Projet** :
- Description expandable
- Crédits (compositeurs, performers)
- Lien vers case study si disponible

**5. Partage Social** :
- Boutons share (Twitter, LinkedIn, Email)
- Copy link to timestamp

### Contraintes Techniques

#### Autoplay Mobile

**Problème** : Les navigateurs mobiles bloquent autoplay pour économiser data et batterie.

**Solution** :
- Toujours exiger interaction utilisateur (bouton Play)
- Afficher message "Appuyez pour écouter" sur mobile
- Détecter user agent :
```js
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
if (isMobile) {
  // Désactiver autoplay, afficher bouton explicite
}
```

#### Volumétrie Audio

**Fichiers audio** :
- Format : MP3 (compatibilité) + OGG/WebM (qualité)
- Bitrate : 192 kbps (bon compromis qualité/poids)
- Durée moyenne : 3-5 min par track
- Poids moyen : ~7-10 MB par fichier

**Calcul bande passante** :
- 10 tracks × 8 MB = 80 MB total
- CDN Webflow : inclus dans plan Site CMS
- Lazy load : charger audio uniquement au clic Play

**Optimisation** :
- Streaming chunks (ne pas charger fichier entier)
- Cache navigateur (HTTP headers)
- Préload metadata seulement, pas tout le fichier

#### Hébergement Audio

**Option A** : Webflow Asset Manager
- Limite : 4 GB storage (plan CMS)
- Avantages : CDN gratuit, HTTPS auto
- Inconvénient : upload manuel, pas de streaming optimisé

**Option B** : Service Externe (recommandé pour scaling)
- SoundCloud API (free tier : 180 min upload)
- Cloudinary (audio support + transcoding)
- AWS S3 + CloudFront (contrôle total, coût faible)

**Recommandation** : Commencer Webflow, migrer vers S3 si > 10 tracks.

### Structure HTML Cible (V2)

```html
<section class="experience">
  <div class="container">
    <!-- Header -->
    <header class="experience__header">
      <h1>Expérience</h1>
      <p>Découvrez nos créations</p>
    </header>

    <!-- Filtres -->
    <div class="experience__filters">
      <!-- Buttons filtres -->
    </div>

    <!-- Player Principal -->
    <div class="experience__player">
      <div class="player__artwork">
        <!-- Image projet actuel -->
      </div>
      <div class="player__info">
        <h2 class="player__title">{Titre}</h2>
        <p class="player__meta">{Client} · {Année}</p>
      </div>
      <div class="player__waveform" id="waveform"></div>
      <div class="player__controls">
        <!-- Play, Prev, Next, Volume -->
      </div>
      <div class="player__timeline">
        <span class="player__current">0:00</span>
        <span class="player__duration">3:45</span>
      </div>
    </div>

    <!-- Playlist -->
    <div class="experience__playlist">
      <!-- Collection List : Projects avec audio -->
      <!-- Chaque item cliquable pour charger dans player -->
    </div>
  </div>
</section>
```

### Interactions V2

**Webflow Interactions** :
- Hover playlist item : lift + highlight
- Click item : load audio, update player UI
- Play button : rotate icon, pulse animation

**Custom JS** :
```js
// WaveSurfer.js init
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#8a8a68',
  progressColor: '#b95a40',
  cursorColor: '#d16d52',
  barWidth: 2,
  barRadius: 3,
  responsive: true,
  height: 100
});

// Load audio
wavesurfer.load('/path/to/audio.mp3');

// Play/Pause
document.querySelector('.player__play').addEventListener('click', () => {
  wavesurfer.playPause();
});
```

### Accessibilité

**ARIA** :
- `role="region"` sur player
- `aria-label="Audio player"` sur contrôles
- `aria-live="polite"` pour annonces (track change)
- Keyboard navigation :
  - Space : Play/Pause
  - Arrow Left/Right : Seek -5s/+5s
  - Arrow Up/Down : Volume +/-

**Captions** :
- Pas de captions audio (musique)
- Mais descriptions textuelles pour contexte

---

## Roadmap

### Phase 1 : Page Placeholder (Immédiat)
- ✅ Hero sombre
- ✅ Texte "En construction"
- ✅ CTA retour accueil
- Temps : 15 min

### Phase 2 : Player Simple (Q2 2025)
- Player HTML5 basique
- Playlist 3-5 tracks
- Pas de waveform (juste progress bar)
- Temps : 1-2 jours

### Phase 3 : Player Avancé (Q3 2025)
- WaveSurfer.js intégration
- Filtres dynamiques
- Visualisations
- Partage social
- Temps : 1 semaine

### Phase 4 : Optimisations (Q4 2025)
- Migration S3/CloudFront
- Analytics écoute (Mixpanel/Amplitude)
- Playlists personnalisées
- Mode offline (PWA)

---

## Notes Implémentation Webflow

**Page Creation** :
1. Pages > **Add Page**
2. Name : `experience`
3. Slug : `/experience`
4. SEO Title : `Expérience | EfSVP`
5. Description : `Découvrez nos créations narratives et musicales`

**Custom Code (Head)** :
```html
<!-- WaveSurfer.js (V2 seulement) -->
<script src="https://unpkg.com/wavesurfer.js@7"></script>
```

**Custom Code (Before </body>)** :
```html
<script>
// Init player (V2)
// Voir code ci-dessus
</script>
```

**Collection Binding** :
- Ajouter champ `Audio File` dans Collection Projects
- Type : File Upload
- Uploader MP3 pour chaque projet
- Lier dans player via `{Audio File URL}`

---

## Budget Estimation (V2)

**Design** : 2-3 jours (UI/UX player)
**Dev Frontend** : 3-5 jours (Webflow + custom JS)
**Intégration Audio** : 1-2 jours (upload, test, optimization)
**QA** : 1 jour (cross-browser, mobile, perf)

**Total** : 7-11 jours (1.5-2 semaines)

---

## Checklist Go-Live (V2)

- [ ] Tous audios uploadés (MP3 optimisés)
- [ ] Player fonctionne Desktop/Tablet/Mobile
- [ ] Autoplay désactivé mobile (user action requis)
- [ ] Waveform responsive
- [ ] Filtres fonctionnent
- [ ] Keyboard navigation opérationnelle
- [ ] ARIA labels présents
- [ ] Loading states gracieux (spinner)
- [ ] Error handling (audio fail to load)
- [ ] Analytics tracking (play, pause, complete)
- [ ] Performance : LCP < 2.5s, TTI < 3.5s
- [ ] Bande passante : monitor CDN usage

---

**Status** : Page placeholder MVP prête à implémenter. V2 player en attente cahier des charges détaillé.
