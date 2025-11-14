# Webflow Kit - MANIFEST

**Date de génération :** 2025-11-05 13:23:12 UTC
**Version :** 1.0.0
**Branche :** claude/webflow-kit-final-migration-011CUpoz1GT6x3qXGknE4ELQ

---

## Fichiers inclus dans webflow-kit.zip

### Design Tokens
| Fichier | Taille | SHA256 |
|---------|--------|--------|
| `design-tokens.json` | 6.3K | `683729...08b6` |

### Contenus JSON
| Fichier | Taille | SHA256 |
|---------|--------|--------|
| `content/home.json` | 17K | `e28efc...f3ea` |
| `content/faq.json` | 2.6K | `ca6e22...8fbb` |
| `content/stats.json` | 1.6K | `1d51e3...ca01` |

### Collections CMS (CSV)
| Fichier | Taille | SHA256 |
|---------|--------|--------|
| `cms-import/projects.csv` | 1.9K | `f9d41e...08cf` |
| `cms-import/faq.csv` | 2.0K | `2cb3c9...dd18` |

### Assets
| Fichier | Taille | SHA256 |
|---------|--------|--------|
| `assets-map.json` | 1.8K | `146af2...cbc34` |
| `assets/README.md` | 6.7K | - |

### Documentation technique
| Fichier | Taille | Description |
|---------|--------|-------------|
| `webflow-styles.md` | 11K | Guide des styles et classes Webflow |
| `webflow-build-checklist.md` | 14K | Checklist complète de build |
| `dns-webflow.md` | 5.5K | Configuration DNS et domaines |
| `README_DE_MIGRATION.md` | 12K | Guide principal de migration |
| `page-experience.md` | 8.6K | Spécifications page /experience |
| `check-qa.md` | 8.8K | Checklist QA et tests |
| `custom-code-snippets.md` | 13K | Snippets de code custom |
| `symbols-wireframe.md` | 6.7K | Wireframes des symbols |
| `migration-checklist-quick.md` | 3.5K | Checklist express 20 étapes |

---

## Intégrité des données

### Vérifications effectuées
- ✅ Encodage UTF-8 sur tous les fichiers
- ✅ Ponctuation française (guillemets « », espaces insécables)
- ✅ Format CSV valide (délimiteurs, guillemets, retours ligne)
- ✅ JSON valide et bien formaté
- ✅ Cohérence des tokens (pas de doublons contradictoires)

### Colonnes CSV normalisées

**projects.csv :**
```
title,client,year,summary,tag,category,clientFilter,typeFilter,gradient,image1,image2,image3
```

**faq.csv :**
```
id,question,answer,order
```

---

## TODO / Points de vigilance

### Images placeholders
Les fichiers suivants dans `projects.csv` sont des placeholders :
- `[placeholder-hymne-1.webp]`
- `[placeholder-sival-1.webp]`
- `[placeholder-lacour-1.webp]`
- `[placeholder-cocagne-1.webp]`
- `[placeholder-etat-nature-1.webp]` / `-2.webp` / `-3.webp`
- `[placeholder-clisson-1.webp]`

**Action requise :** Remplacer par vraies images ou utiliser gradients CSS (voir `assets/README.md` Option A).

### Vidéos hero
Fichiers à créer/optimiser :
- `/media/efsvp-hero.mp4` (cible < 5MB)
- `/media/efsvp-hero.webm` (cible < 3MB)

Voir `assets/README.md` section "Optimisation Vidéo".

---

## Comment utiliser ce kit

1. **Extraire le zip** dans un dossier de travail
2. **Lire `README_DE_MIGRATION.md`** pour le workflow complet
3. **Suivre `migration-checklist-quick.md`** pour l'exécution (20 étapes, ~7h)
4. **Utiliser `check-qa.md`** avant publication

---

## Support

**Repo GitHub :** https://github.com/lesaffrejb-beep/Site_eFsvp
**Branche :** `claude/webflow-kit-final-migration-011CUpoz1GT6x3qXGknE4ELQ`

Pour toute question ou bug, ouvrir une issue sur GitHub.

---

**Signature :** Claude Code v1.0 - Migration Webflow Kit
