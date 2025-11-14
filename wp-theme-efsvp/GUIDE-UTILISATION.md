# 📖 Guide d'utilisation - Thème EfSVP WordPress

## 🎯 Structure du thème

Le thème WordPress EfSVP est conçu pour reproduire fidèlement la maquette HTML avec des **blocs Gutenberg personnalisés**.

---

## 🚀 Configuration initiale

### 1. Activer le thème
1. Connectez-vous à votre administration WordPress
2. Allez dans **Apparence → Thèmes**
3. Activez le thème **EfSVP**

### 2. Configurer la page d'accueil
1. Créez une nouvelle page : **Pages → Ajouter**
2. Nommez-la "Accueil"
3. **Ne remplissez rien encore** - gardez-la vide
4. Publiez la page
5. Allez dans **Réglages → Lecture**
6. Sélectionnez "Une page statique"
7. Choisissez "Accueil" comme page d'accueil

---

## 🧩 Blocs disponibles (dans l'ordre de la maquette)

Tous les blocs sont disponibles dans l'éditeur Gutenberg sous la catégorie **"EfSVP"**.

### 1. **Hero** 🎬
Section d'accueil avec vidéo de fond et métriques
- **Contenu** : Titre, sous-titre, description, CTA
- **Média** : Vidéo ou image de fond
- **Métriques** : 3 statistiques affichées en bas

### 2. **Audio Bento** 🎵
Grille Bento avec lecteurs audio
- **Playlists** : Liste de créations audio
- **Layouts** : Featured, Standard, List

### 3. **Créations** 🎨
Section pour présenter vos créations

### 4. **Flagship Cases** ⭐
Cas clients phares avec visuels

### 5. **Services** 💼
Liste de vos services offerts

### 6. **Portfolio** 🖼️
Galerie de projets réalisés
- Variante : **Portfolio Grid** pour une mise en page en grille

### 7. **Process** 🔄
Votre méthodologie de travail
- Variante : **Process Steps** pour des étapes numérotées

### 8. **Testimonials** 💬
Témoignages clients avec carrousel

### 9. **Stats** 📊
Section statistiques avec chiffres clés animés
- **Nombre de stats** : 4 par défaut
- **Animation** : Compteur animé au scroll

### 10. **FAQ** ❓
Questions fréquentes en accordéon

### 11. **Contact** 📧
Section contact avec formulaire
- **Citation** : Citation inspirante à gauche
- **Formulaire** : Peut utiliser un plugin (Contact Form 7, WPForms, etc.)
- **Shortcode** : Si vous avez un plugin de formulaire, collez le shortcode

### 12. **CTA** 🎯
Call-to-action pour inciter à l'action

---

## 📝 Comment créer votre page d'accueil

### Étape 1 : Ouvrir l'éditeur
1. Allez dans **Pages**
2. Cliquez sur "Accueil" (la page que vous avez créée)
3. Vous êtes maintenant dans l'éditeur Gutenberg

### Étape 2 : Ajouter les blocs dans l'ordre
Cliquez sur le **+** pour ajouter un bloc, puis cherchez "EfSVP".

**Ordre recommandé (comme la maquette) :**

```
1. Hero
2. Audio Bento
3. Flagship Cases
4. Services
5. Portfolio
6. Process
7. Testimonials
8. Stats
9. FAQ
10. Contact
```

### Étape 3 : Configurer chaque bloc
Chaque bloc a des paramètres dans la **barre latérale droite** :
- Textes (titres, descriptions)
- Images/vidéos
- Couleurs
- Options de mise en page

### Étape 4 : Publier
Une fois tous les blocs ajoutés et configurés, cliquez sur **Publier**.

---

## 🎨 Personnalisation

### Changer les couleurs
Les couleurs sont définies dans `/assets/css/design-tokens.css` :
- `--primary` : Couleur principale (#b8441e)
- `--secondary` : Couleur secondaire (#e8924f)
- `--text-primary` : Texte principal
- `--text-secondary` : Texte secondaire

### Ajouter des polices
Les polices sont chargées dans `header.php` (Google Fonts) :
- **Playfair Display** : Titres
- **Inter** : Textes
- **Cormorant** : Citations

---

## 📧 Configuration du formulaire de contact

### Option 1 : Utiliser un plugin (recommandé)
1. Installez **Contact Form 7** ou **WPForms**
2. Créez un formulaire
3. Copiez le shortcode (ex: `[contact-form-7 id="123"]`)
4. Dans le bloc Contact, collez le shortcode dans le champ "Form Shortcode"

### Option 2 : Formulaire intégré
Si vous ne renseignez pas de shortcode, un formulaire basique s'affichera automatiquement.

---

## 🔧 Résolution de problèmes

### Les blocs n'apparaissent pas dans l'éditeur
1. Vérifiez que le thème est bien activé
2. Videz le cache WordPress (si vous utilisez un plugin de cache)
3. Rechargez la page de l'éditeur (Ctrl+F5)

### Les styles ne s'appliquent pas
1. Allez dans **Apparence → Personnaliser**
2. Cliquez sur "Publier" même sans changer quoi que ce soit
3. Videz le cache de votre navigateur

### Les vidéos ne se chargent pas dans le Hero
1. Vérifiez que le fichier vidéo est au format MP4 ou WebM
2. Uploadez la vidéo dans la **Bibliothèque de médias**
3. Assurez-vous que le fichier ne dépasse pas la limite d'upload de votre serveur

---

## 📚 Ressources

- **Documentation WordPress** : https://wordpress.org/documentation/
- **Guide Gutenberg** : https://wordpress.org/gutenberg/
- **Support Contact Form 7** : https://contactform7.com/docs/

---

## ✅ Checklist finale

Avant de mettre en ligne :

- [ ] Tous les blocs sont ajoutés dans le bon ordre
- [ ] Tous les textes sont remplis (pas de Lorem Ipsum)
- [ ] Toutes les images/vidéos sont uploadées
- [ ] Le formulaire de contact fonctionne (testez l'envoi)
- [ ] La navigation est configurée (Menu → Créer un menu)
- [ ] Les métriques Hero affichent les bons chiffres
- [ ] Les statistiques sont à jour
- [ ] Testé sur mobile (mode responsive)
- [ ] Cache vidé
- [ ] SEO vérifié (Yoast SEO ou Rank Math recommandé)

---

**Besoin d'aide ?** Contactez votre développeur ou consultez la documentation WordPress.
