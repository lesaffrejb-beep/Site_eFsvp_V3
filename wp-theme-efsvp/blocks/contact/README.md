# Bloc Contact avec Formulaire

Bloc WordPress Gutenberg complet pour la section Contact du thème EFSVP, reproduisant exactement la maquette HTML.

## Fichiers

- **block.json** (54 lignes) - Configuration du bloc avec tous les attributs
- **render.php** (245 lignes) - Template PHP générant le HTML complet du formulaire
- **style.css** (528 lignes) - Tous les styles CSS de la maquette
- **view.js** (564 lignes) - JavaScript pour validation, AJAX, slider et copie d'email
- **editor.css** - Styles pour l'éditeur Gutenberg

## Fonctionnalités

### Formulaire Complet

Le formulaire inclut tous les champs de la maquette :

1. **Prénom Nom** (texte, requis)
2. **Email professionnel** (email, requis avec validation)
3. **Organisation** (texte, requis)
4. **Type de projet** (select, requis)
   - Anniversaire
   - Inauguration
   - Spectacle
   - Hymne / Identité
   - Autre
5. **Date envisagée** (date, optionnel)
6. **Budget estimé** (range slider 3000€ - 30000€)
7. **Parlez-nous de votre projet** (textarea, requis, 500 caractères max)
8. **Checkbox de consentement** (requis)

### Validation en Temps Réel

- Validation à la perte de focus (blur)
- Validation à la saisie pour l'email
- Messages d'erreur personnalisés
- États visuels (error/success) sur les champs
- Scroll automatique vers le premier champ en erreur

### Fonctionnalités Avancées

#### Budget Slider
- Range slider de 3000€ à 30000€ par paliers de 1000€
- Affichage en temps réel de la valeur sélectionnée
- Barre de progression visuelle

#### Compteur de Caractères
- Compteur dynamique pour le textarea (0/500)
- Auto-grow du textarea selon le contenu
- Couleur d'alerte à 90% de la limite

#### Copie d'Email
- Bouton pour copier l'email au clic
- Animation de confirmation "✓ Copié !"
- Fallback pour navigateurs anciens

#### Modal de Succès
- Modal animée après envoi réussi
- Personnalisation avec le prénom de l'utilisateur
- Fermeture automatique après 5 secondes
- Fermeture manuelle (bouton + overlay)

### Envoi AJAX

- Soumission asynchrone sans rechargement de page
- États du bouton : loading, success, error
- Nonce WordPress pour la sécurité
- Gestion d'erreur avec toast notification

## Backend WordPress

### Handler AJAX (inc/ajax-handlers.php)

Le fichier `ajax-handlers.php` gère :

1. **Validation côté serveur**
   - Vérification du nonce WordPress
   - Sanitization de tous les champs
   - Validation des champs requis

2. **Envoi d'email à l'admin**
   - Email formaté avec toutes les informations
   - Header Reply-To pour répondre directement

3. **Sauvegarde en base de données**
   - Création d'un custom post type `efsvp_contact`
   - Stockage de toutes les métadonnées

4. **Email automatique au client**
   - Confirmation de réception
   - Message personnalisé avec le prénom

## Attributs Gutenberg

Le bloc expose ces attributs configurables dans l'éditeur :

```json
{
  "sectionTitle": "La vôtre commence maintenant",
  "sectionSubtitle": "Réponse sous 48h · Premier échange offert",
  "quote": "Toutes les bonnes histoires méritent d'être racontées.",
  "backgroundColor": "#f8f9fa",
  "contactEmail": "contact@efsvp.fr",
  "altContactTitle": "Ou contactez-nous directement",
  "altContactLocation": "Basé à Angers · Partout en Francophonie"
}
```

## Styles CSS

Les styles incluent :

- Layout en grid responsive (2fr 3fr → 1fr en mobile)
- Visual gauche avec gradient et pattern SVG
- Formulaire complet avec tous les états
- Range slider avec thumb personnalisé
- Modal avec overlay et animations
- Loader animé pour le bouton submit
- Media queries pour tablette (968px) et mobile (475px)

## Responsive Design

- **Desktop** : Layout 2 colonnes (visual + form)
- **Tablette (< 968px)** : Layout 1 colonne
- **Mobile (< 475px)** : Optimisations d'espacement

## Installation

1. Le bloc est automatiquement enregistré via `functions.php`
2. Le handler AJAX est chargé via `inc/ajax-handlers.php`
3. Les scripts sont enqueue via le système WordPress

## Utilisation

1. Dans l'éditeur Gutenberg, ajouter le bloc "Contact avec Formulaire"
2. Configurer les attributs dans la sidebar
3. Le formulaire est immédiatement fonctionnel
4. Les soumissions sont envoyées par email et sauvegardées en base

## Custom Post Type

Les soumissions créent des posts de type `efsvp_contact` avec :

- **Titre** : Nom - Organisation
- **Contenu** : Message
- **Métadonnées** :
  - contact_nom
  - contact_email
  - contact_organisation
  - contact_type_projet
  - contact_date
  - contact_budget

## Sécurité

- Nonce WordPress pour AJAX
- Sanitization de tous les inputs
- Validation côté client ET serveur
- Protection CSRF native WordPress

## Accessibilité

- Labels avec for/id
- aria-required sur champs requis
- aria-invalid sur erreurs
- aria-labelledby pour la section
- role="dialog" pour la modal
- Focus management
