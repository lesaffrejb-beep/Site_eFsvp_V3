# Custom Code Snippets - Webflow

Collection de snippets JavaScript et HTML prêts à l'emploi pour améliorer l'expérience utilisateur et le tracking.

---

## 1. Copier au clic (Email & Téléphone)

### Snippet : Copier Email

**Usage :** Permet de copier l'adresse email au clic sur un bouton ou lien.

**HTML à ajouter dans Webflow :**
```html
<div class="copy-email-wrapper">
  <span class="email-display">contact@example.com</span>
  <button class="copy-btn" data-copy-target="contact@example.com" aria-label="Copier l'email">
    <span class="copy-icon">📋</span>
    <span class="copy-text">Copier</span>
  </button>
  <span class="copy-feedback">Copié !</span>
</div>
```

**JavaScript (à placer dans Page Settings > Custom Code > Before `</body>` tag) :**
```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Copier Email
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy-target');
      const feedbackEl = this.parentElement.querySelector('.copy-feedback');

      // Utiliser l'API Clipboard moderne
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showCopyFeedback(feedbackEl, button);
          })
          .catch(err => {
            console.error('Erreur lors de la copie:', err);
            fallbackCopy(textToCopy, feedbackEl, button);
          });
      } else {
        // Fallback pour anciens navigateurs
        fallbackCopy(textToCopy, feedbackEl, button);
      }
    });
  });

  function showCopyFeedback(feedbackEl, button) {
    if (feedbackEl) {
      feedbackEl.style.display = 'inline-block';
      feedbackEl.style.opacity = '1';

      setTimeout(() => {
        feedbackEl.style.opacity = '0';
        setTimeout(() => {
          feedbackEl.style.display = 'none';
        }, 300);
      }, 2000);
    }

    // Changer le texte du bouton temporairement
    const copyText = button.querySelector('.copy-text');
    if (copyText) {
      const originalText = copyText.textContent;
      copyText.textContent = 'Copié !';
      setTimeout(() => {
        copyText.textContent = originalText;
      }, 2000);
    }
  }

  function fallbackCopy(text, feedbackEl, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      showCopyFeedback(feedbackEl, button);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
  }
});
</script>
```

**CSS (à ajouter dans Designer ou Embed) :**
```css
<style>
.copy-email-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.email-display {
  font-weight: 500;
  color: var(--neutral-900);
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: var(--primary-500);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: var(--primary-600);
}

.copy-feedback {
  display: none;
  opacity: 0;
  color: var(--success-600);
  font-size: 0.875rem;
  font-weight: 600;
  transition: opacity 0.3s;
  margin-left: 0.5rem;
}
</style>
```

---

### Variante : Copier Téléphone

**HTML :**
```html
<div class="copy-phone-wrapper">
  <a href="tel:+33612345678" class="phone-display">+33 6 12 34 56 78</a>
  <button class="copy-btn" data-copy-target="+33612345678" aria-label="Copier le numéro">
    <span class="copy-icon">📱</span>
    <span class="copy-text">Copier</span>
  </button>
  <span class="copy-feedback">Copié !</span>
</div>
```

**JavaScript :** Utiliser le même script que pour l'email (sélecteur `[data-copy-target]` commun).

**Notes :**
- Le `href="tel:..."` permet d'appeler directement sur mobile
- Le `data-copy-target` contient le numéro sans espaces pour faciliter la copie
- Le display peut être formaté visuellement (avec espaces) pour la lisibilité

---

## 2. Micro-tracking : Suivi des clics CTA

### Objectif
Tracker les interactions utilisateurs sur les CTA principaux via `data-attributes` et logs console (en attendant l'intégration Google Analytics ou autre).

### HTML : Ajouter des data-attributes aux CTA

**Exemple pour un bouton CTA :**
```html
<a href="/contact" class="button primary-btn"
   data-track="cta-click"
   data-cta-name="contact-hero"
   data-cta-location="homepage-hero">
  Contactez-moi
</a>
```

**Autres exemples :**
```html
<!-- CTA dans section Portfolio -->
<a href="/portfolio" class="button"
   data-track="cta-click"
   data-cta-name="voir-portfolio"
   data-cta-location="homepage-about">
  Voir mes projets
</a>

<!-- CTA télécharger CV -->
<a href="/assets/cv.pdf" class="button secondary-btn"
   data-track="download"
   data-cta-name="download-cv"
   data-cta-location="about-page">
  Télécharger mon CV
</a>

<!-- CTA social (LinkedIn) -->
<a href="https://linkedin.com/in/..." target="_blank"
   data-track="external-link"
   data-cta-name="linkedin"
   data-cta-location="footer">
  <img src="linkedin-icon.svg" alt="LinkedIn">
</a>
```

### JavaScript : Logger les clics

**Script à placer dans Site Settings > Custom Code > Before `</body>` tag :**
```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Tracking des clics CTA
  const trackableElements = document.querySelectorAll('[data-track]');

  trackableElements.forEach(element => {
    element.addEventListener('click', function(e) {
      const trackType = this.getAttribute('data-track');
      const ctaName = this.getAttribute('data-cta-name');
      const ctaLocation = this.getAttribute('data-cta-location');
      const targetUrl = this.getAttribute('href') || this.getAttribute('data-url');

      // Log détaillé dans la console
      console.log('🎯 CTA Tracking:', {
        type: trackType,
        name: ctaName,
        location: ctaLocation,
        url: targetUrl,
        timestamp: new Date().toISOString()
      });

      // Optionnel : envoyer à Google Analytics (décommenter si GA est configuré)
      /*
      if (typeof gtag !== 'undefined') {
        gtag('event', trackType, {
          'event_category': 'CTA',
          'event_label': ctaName,
          'event_location': ctaLocation,
          'value': 1
        });
      }
      */

      // Optionnel : envoyer à un endpoint custom
      /*
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: trackType,
          name: ctaName,
          location: ctaLocation,
          url: targetUrl,
          timestamp: Date.now()
        })
      });
      */
    });
  });

  console.log(`✅ Tracking initialisé pour ${trackableElements.length} éléments`);
});
</script>
```

### Comment tester
1. Ouvrir la console du navigateur (F12 > Console)
2. Cliquer sur les CTA du site
3. Vérifier les logs `🎯 CTA Tracking` avec les détails

### Évolution possible
- Remplacer `console.log` par des appels à Google Analytics, Plausible, ou Mixpanel
- Stocker les events dans localStorage pour analyse ultérieure
- Créer un dashboard admin pour visualiser les clics

---

## 3. Meta Tags & Open Graph (OG) pour CMS Templates

### Usage
À ajouter dans **Page Settings > SEO Settings** de chaque Template de Collection (ex: Project Template).

### Template : Page de projet (CMS)

**Dans Webflow Designer > Page Settings > SEO :**

#### Meta Description (dynamique)
```
Découvrez {project-name}, un projet {category}. {short-description}
```
*Lier avec CMS : Title Field = `Name`, Description = `Short Description`*

#### Custom Code (dans `<head>`) :

```html
<!-- Meta Tags de base -->
<meta name="description" content="Description du projet issue du CMS">
<meta name="keywords" content="web design, développement, portfolio">
<meta name="author" content="[Votre Nom]">

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:type" content="article">
<meta property="og:title" content="{Project Name} - Portfolio">
<meta property="og:description" content="{Short Description}">
<meta property="og:image" content="{Thumbnail Image URL}">
<meta property="og:url" content="https://votresite.com/projects/{slug}">
<meta property="og:site_name" content="[Votre Nom] - Portfolio">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@votre_handle">
<meta name="twitter:creator" content="@votre_handle">
<meta name="twitter:title" content="{Project Name}">
<meta name="twitter:description" content="{Short Description}">
<meta name="twitter:image" content="{Thumbnail Image URL}">

<!-- Données structurées JSON-LD (Schema.org) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "{Project Name}",
  "description": "{Short Description}",
  "image": "{Thumbnail Image URL}",
  "author": {
    "@type": "Person",
    "name": "[Votre Nom]"
  },
  "datePublished": "{Date de publication}",
  "keywords": "{Technologies séparées par virgules}"
}
</script>
```

### Liaison CMS dans Webflow

Dans le **Project Template Page Settings** :
1. **Title Tag :** Lier à `Name` (CMS field)
2. **Meta Description :** Lier à `Short Description`
3. **OG Image :** Lier à `Thumbnail Image`

Pour les autres champs dynamiques, utiliser un **Custom Code Embed** dans la page avec du JavaScript :

```javascript
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer les données CMS depuis la page
  const projectName = document.querySelector('[data-cms="name"]')?.textContent || '';
  const projectDesc = document.querySelector('[data-cms="description"]')?.textContent || '';
  const projectImage = document.querySelector('[data-cms="thumbnail"]')?.src || '';
  const projectSlug = window.location.pathname.split('/').pop();

  // Mettre à jour les meta tags OG dynamiquement
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', projectName);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', projectDesc);
  document.querySelector('meta[property="og:image"]')?.setAttribute('content', projectImage);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);
});
</script>
```

**Alternative (plus simple) :** Utiliser les **CMS Bind Fields** directement dans Page Settings si disponibles.

---

### Exemple complet : Meta Tags pour Homepage

```html
<head>
  <title>Jean Dupont - Développeur Web & Designer UX/UI</title>
  <meta name="description" content="Portfolio de Jean Dupont, développeur web freelance spécialisé en React et design UX/UI. Découvrez mes projets et contactez-moi.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Jean Dupont - Portfolio Développeur Web">
  <meta property="og:description" content="Développeur web freelance spécialisé en React et UX/UI Design.">
  <meta property="og:image" content="https://votresite.com/images/og-image-homepage.jpg">
  <meta property="og:url" content="https://votresite.com">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Jean Dupont - Portfolio">
  <meta name="twitter:description" content="Développeur web & Designer UX/UI">
  <meta name="twitter:image" content="https://votresite.com/images/twitter-card.jpg">
</head>
```

---

## Best Practices

### Performance
- Placer les scripts de tracking en **fin de body** (before `</body>`)
- Utiliser `DOMContentLoaded` pour éviter les erreurs
- Minimiser le code en production

### Accessibilité
- Toujours ajouter `aria-label` aux boutons sans texte visible
- Tester avec lecteurs d'écran

### SEO
- Vérifier les meta tags avec **Facebook Sharing Debugger** et **Twitter Card Validator**
- S'assurer que les images OG font au moins 1200x630px
- Tester avec Google Rich Results Test pour le JSON-LD

---

**Version :** 1.0
**Date :** 2025-01-05
**Auteur :** Webflow Kit Migration Team
