# Migration Webflow - Checklist Express (20 étapes)

Checklist ultra-condensée pour refaire la migration du site vers Webflow en un minimum de temps.

---

## Préparation (4 étapes)

- [ ] **1. Créer un nouveau projet Webflow** (Plan Site ou CMS)
- [ ] **2. Installer les assets** : uploader logos, images, fonts depuis `/webflow-kit/assets-map.csv`
- [ ] **3. Configurer les Design Tokens** : copier les variables CSS de `/webflow-kit/design-tokens.json` dans Site Settings > Custom Code
- [ ] **4. Créer la structure de pages** : Homepage, About, Portfolio, Contact, 404

---

## Design System (3 étapes)

- [ ] **5. Créer les classes de base** : typographie (h1-h6, body, small), boutons (primary, secondary), containers
- [ ] **6. Configurer les couleurs** : palette primaire, secondaire, neutrals dans les classes
- [ ] **7. Définir le spacing system** : marges et paddings standards (0.5rem, 1rem, 2rem, 4rem)

---

## Symbols & Composants (3 étapes)

- [ ] **8. Créer le Symbol Navbar** : logo + menu desktop + hamburger mobile (voir `symbols-wireframe.md`)
- [ ] **9. Créer le Symbol Footer** : colonnes info, liens, social, copyright
- [ ] **10. Créer les Symbols réutilisables** : CTA Section, Project Card, FAQ Item

---

## Collections CMS (3 étapes)

- [ ] **11. Créer la Collection "Projects"** : Name, Slug, Thumbnail, Description, Category, Technologies
- [ ] **12. Importer les données CMS** : utiliser les CSV de `/webflow-kit/cms-collections/` (Projects, Blog si applicable)
- [ ] **13. Créer le Template Project** : design de la page individuelle projet + liaison CMS

---

## Contenu & Pages (3 étapes)

- [ ] **14. Builder Homepage** : Hero, About preview, Projects grid (lié CMS), CTA, Footer
- [ ] **15. Builder page Portfolio** : Collection List des Projects avec filtres par catégorie
- [ ] **16. Builder pages About + Contact** : sections texte, formulaire contact (Webflow Form)

---

## Fonctionnalités & Code Custom (2 étapes)

- [ ] **17. Ajouter les snippets JS** : copier email/téléphone, tracking CTA (voir `custom-code-snippets.md`)
- [ ] **18. Configurer les Interactions Webflow** : hover cards, scroll animations, FAQ toggle

---

## SEO & Meta Tags (2 étapes)

- [ ] **19. Configurer les meta tags** : Title, Description, OG tags sur chaque page (voir `custom-code-snippets.md`)
- [ ] **20. Publier & Tester** : publier sur domaine custom, tester responsive, performance (Lighthouse), formulaires

---

## Ressources Rapides

| Fichier | Utilité |
|---------|---------|
| `/webflow-kit/design-tokens.json` | Variables CSS (couleurs, fonts, spacing) |
| `/webflow-kit/assets-map.csv` | Liste des assets à uploader |
| `/webflow-kit/cms-collections/*.csv` | Données à importer dans CMS |
| `/deliverables/symbols-wireframe.md` | Structure des Symbols |
| `/deliverables/custom-code-snippets.md` | Code JS et meta tags |
| `/deliverables/migration-guide.md` | Guide détaillé (si besoin de plus d'infos) |

---

## Temps estimé

- **Préparation :** 30 min
- **Design System :** 1h
- **Symbols :** 1h30
- **CMS :** 1h
- **Contenu :** 2h
- **Code & SEO :** 1h
- **Total :** ~7h pour un site portfolio complet

---

## Commandes Webflow utiles

- **Dupliquer élément :** `Cmd/Ctrl + D`
- **Créer Symbol depuis sélection :** Clic droit > Create Symbol
- **Ouvrir Interactions panel :** Clic sur éclair (⚡) dans la barre de droite
- **Publier :** `Cmd/Ctrl + Shift + P`

---

**Version :** 1.0 (Express)
**Basé sur :** Webflow Kit Migration complet
**Dernière MAJ :** 2025-01-05
