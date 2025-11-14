# Guide DNS — Pointer enfrancaissvp.fr vers Webflow

**Configuration complète pour migrer le domaine OVH vers Webflow SANS toucher aux emails**

---

## 📋 Vue d'ensemble

Ce guide détaille les étapes précises pour :
- ✅ Pointer **enfrancaissvp.fr** et **www.enfrancaissvp.fr** vers Webflow
- ✅ Conserver les emails OVH fonctionnels (enregistrements MX intacts)
- ✅ Activer le SSL automatique (HTTPS)
- ✅ Éviter toute interruption de service

**Durée estimée :** 15-30 minutes de configuration + 2-48h de propagation DNS

---

## ⚠️ IMPORTANT : Sauvegarder la Zone DNS Actuelle

**Avant toute modification**, sauvegardez la zone DNS actuelle :

### Étape 0 : Backup DNS

1. Se connecter à **OVH Manager** : https://www.ovh.com/manager/
2. Aller dans **Domaines** > `enfrancaissvp.fr`
3. Cliquer sur l'onglet **Zone DNS**
4. Faire une **capture d'écran** de tous les enregistrements actuels
5. Ou noter les enregistrements importants :
   - Enregistrements `MX` (emails)
   - Enregistrements `TXT` (SPF, DKIM, etc.)
   - Enregistrements `CNAME` ou `A` personnalisés

**⚠️ Ne supprimez JAMAIS les enregistrements MX si vous voulez conserver les emails OVH.**

---

## 🌐 PHASE 1 : Configurer le Domaine dans Webflow

### 1.1 Ajouter le Domaine Custom

1. Ouvrir le projet Webflow **"En français s'il vous plaît"**
2. Aller dans **Project Settings** (icône engrenage, coin haut-gauche)
3. Cliquer sur **Hosting** (menu gauche)
4. Cliquer sur **Add Custom Domain**

### 1.2 Entrer les Domaines

**Domaine Principal :**
```
enfrancaissvp.fr
```

**Domaine WWW :**
```
www.enfrancaissvp.fr
```

**Configuration recommandée :**
- ✅ Cocher **"Set as Default Domain"** sur `www.enfrancaissvp.fr` (ou `enfrancaissvp.fr` selon préférence)
- ✅ Activer **"Redirect to Default Domain"** (redirige automatiquement apex ↔ www)

### 1.3 Noter les Enregistrements DNS Webflow

Après avoir ajouté le domaine, Webflow affiche les enregistrements DNS à configurer :

**Pour le domaine APEX (enfrancaissvp.fr) :**
```
Type: A
Nom: @ (ou vide)
Valeur: 75.2.70.75
```

**Pour le domaine WWW (www.enfrancaissvp.fr) :**
```
Type: CNAME
Nom: www
Valeur: proxy-ssl.webflow.com
```

**Note :** Les valeurs IP peuvent varier. **Utilisez toujours les valeurs fournies par Webflow dans votre interface.**

---

## 🔧 PHASE 2 : Configurer la Zone DNS sur OVH

### 2.1 Accéder à la Zone DNS

1. Se connecter à **OVH Manager** : https://www.ovh.com/manager/
2. Aller dans **Domaines** > `enfrancaissvp.fr`
3. Cliquer sur l'onglet **Zone DNS**

### 2.2 Modifier l'Enregistrement A (Apex)

**Objectif :** Pointer le domaine racine (`enfrancaissvp.fr`) vers Webflow.

**Étapes :**

1. Chercher l'enregistrement `A` existant pour `@` ou `` (vide)
2. **Option 1 : Modifier l'enregistrement existant**
   - Cliquer sur l'icône **"..."** ou **"Modifier"** à côté de l'enregistrement `A`
   - Changer la **Cible** : `75.2.70.75` (ou l'IP fournie par Webflow)
   - TTL : `3600` (1 heure) ou laisser par défaut
   - Cliquer **Valider**

3. **Option 2 : Supprimer et recréer** (si modification bloquée)
   - Supprimer l'ancien enregistrement `A` pour `@`
   - Cliquer sur **Ajouter une entrée** > **A**
   - Sous-domaine : laisser vide (ou mettre `@`)
   - Cible : `75.2.70.75`
   - TTL : `3600`
   - Cliquer **Valider**

### 2.3 Ajouter/Modifier l'Enregistrement CNAME (WWW)

**Objectif :** Pointer `www.enfrancaissvp.fr` vers Webflow.

**Étapes :**

1. Chercher l'enregistrement `CNAME` existant pour `www`
2. **Si existe :**
   - Modifier la **Cible** : `proxy-ssl.webflow.com`
   - TTL : `3600`
   - Valider

3. **Si n'existe pas :**
   - Cliquer sur **Ajouter une entrée** > **CNAME**
   - Sous-domaine : `www`
   - Cible : `proxy-ssl.webflow.com` (avec le point final optionnel)
   - TTL : `3600`
   - Valider

### 2.4 Vérifier les Enregistrements MX (EMAILS)

**⚠️ CRUCIAL : NE PAS TOUCHER AUX ENREGISTREMENTS MX**

Les enregistrements `MX` (Mail eXchange) gèrent la réception des emails. Si vous utilisez les emails OVH (`contact@enfrancaissvp.fr`), **ne supprimez JAMAIS ces enregistrements**.

**Vérification :**

1. Dans la Zone DNS, chercher les enregistrements de type `MX`
2. Ils ressemblent généralement à :
   ```
   Type: MX
   Nom: @ (ou vide)
   Cible: mx1.mail.ovh.net (ou similaire)
   Priorité: 1
   ```
   ```
   Type: MX
   Nom: @ (ou vide)
   Cible: mx2.mail.ovh.net
   Priorité: 5
   ```

3. **Ne rien modifier.** Si vous les voyez, c'est bon. Ils resteront intacts.

### 2.5 Enregistrements SPF et DKIM (Optionnels mais recommandés)

Si vous avez des enregistrements `TXT` pour **SPF** (anti-spam) ou **DKIM** (authentification email), **ne pas les supprimer non plus**.

**Exemple SPF :**
```
Type: TXT
Nom: @ (ou vide)
Valeur: v=spf1 include:mx.ovh.com ~all
```

**Si absents :** Pas de problème pour le moment, mais recommandé de les configurer pour éviter que vos emails soient marqués comme spam.

---

## ⏱️ PHASE 3 : Propagation DNS & Vérification

### 3.1 Appliquer les Modifications DNS

1. **OVH Manager** > Zone DNS > Cliquer sur **"Appliquer la configuration"** (si bouton présent)
2. Ou attendre que OVH applique automatiquement (généralement immédiat)

### 3.2 Temps de Propagation

**Propagation DNS :** 2 à 48 heures (en moyenne 2-6h)

**Pourquoi ça prend du temps ?**
- Les serveurs DNS du monde entier doivent mettre à jour leur cache
- Le TTL (Time To Live) définit la durée de cache (3600s = 1h)

### 3.3 Vérifier la Propagation DNS

**Outil en ligne :** https://www.whatsmydns.net/

1. Entrer `enfrancaissvp.fr`
2. Sélectionner **Type : A**
3. Cliquer **Search**
4. Vérifier que plusieurs serveurs DNS affichent l'IP Webflow (`75.2.70.75`)

**Répéter pour `www.enfrancaissvp.fr` :**
1. Entrer `www.enfrancaissvp.fr`
2. Sélectionner **Type : CNAME**
3. Vérifier que la cible est `proxy-ssl.webflow.com`

**Statut :**
- ✅ Vert (plusieurs serveurs) : Propagation en cours ou terminée
- ❌ Rouge ou IP différente : Attendre encore

### 3.4 Test Local (Terminal/Cmd)

**Mac / Linux :**
```bash
dig enfrancaissvp.fr +short
# Doit afficher : 75.2.70.75

dig www.enfrancaissvp.fr +short
# Doit afficher : proxy-ssl.webflow.com.
```

**Windows (PowerShell) :**
```powershell
nslookup enfrancaissvp.fr
# Doit afficher l'IP Webflow

nslookup www.enfrancaissvp.fr
# Doit afficher proxy-ssl.webflow.com
```

---

## 🔒 PHASE 4 : Activer le SSL (HTTPS)

### 4.1 SSL Automatique Webflow

**Bonne nouvelle :** Webflow active automatiquement le SSL (HTTPS) via **Let's Encrypt** une fois que la propagation DNS est complète.

**Délai SSL :**
- Généralement activé **automatiquement dans les 24h** après la propagation DNS
- Vérifier dans **Webflow** > **Project Settings** > **Hosting** > **SSL**

**Statut SSL :**
- ⏳ **"SSL Provisioning"** : En cours (attendre)
- ✅ **"SSL Active"** : Certificat installé, HTTPS fonctionne

### 4.2 Forcer HTTPS (Redirection automatique)

Une fois le SSL actif :

1. **Webflow** > **Project Settings** > **Hosting**
2. Activer **"Force HTTPS"** (redirige automatiquement HTTP → HTTPS)
3. Publier le site (**Publish**)

### 4.3 Vérifier HTTPS

1. Ouvrir `https://enfrancaissvp.fr` dans le navigateur
2. Vérifier le **cadenas vert** (ou icône de sécurité selon navigateur)
3. Cliquer sur le cadenas → **"Certificat valide"**

**Répéter pour :**
- `https://www.enfrancaissvp.fr`
- `http://enfrancaissvp.fr` (doit rediriger vers HTTPS)

---

## 📧 PHASE 5 : Vérifier les Emails (Important)

### 5.1 Tester la Réception d'Emails

**Après propagation DNS :**

1. Envoyer un email de test à `contact@enfrancaissvp.fr` (ou votre adresse OVH)
2. Vérifier la réception dans **Webmail OVH** : https://www.ovh.com/fr/mail/
3. Ou dans votre client email (Outlook, Thunderbird, etc.)

**✅ Si les emails fonctionnent :** Parfait, les enregistrements MX sont intacts.
**❌ Si les emails ne fonctionnent pas :** Vérifier les enregistrements MX dans la zone DNS OVH.

### 5.2 Tester l'Envoi d'Emails

1. Depuis `contact@enfrancaissvp.fr`, envoyer un email de test vers votre email personnel
2. Vérifier que l'email arrive bien (et n'est pas en spam)

**Si emails en spam :**
- Configurer **SPF** et **DKIM** (voir Phase 6 - Optionnel)

---

## 🛠️ PHASE 6 : Configuration Avancée (Optionnel)

### 6.1 Configurer SPF (Anti-Spam)

**SPF (Sender Policy Framework)** permet de déclarer quels serveurs sont autorisés à envoyer des emails pour votre domaine.

**Enregistrement SPF pour OVH :**

1. **OVH Manager** > Zone DNS > **Ajouter une entrée** > **TXT**
2. Sous-domaine : laisser vide (ou `@`)
3. Valeur :
   ```
   v=spf1 include:mx.ovh.com ~all
   ```
4. TTL : `3600`
5. Valider

**Note :** Si un enregistrement SPF existe déjà, ne pas créer de doublon. Modifier l'existant.

### 6.2 Configurer DKIM (Authentification Email)

**DKIM (DomainKeys Identified Mail)** ajoute une signature cryptographique aux emails pour prouver qu'ils proviennent bien de votre domaine.

**Activer DKIM sur OVH :**

1. **OVH Manager** > **Emails** > `enfrancaissvp.fr`
2. Onglet **DKIM** (si disponible sur votre offre)
3. Cliquer **Activer DKIM**
4. OVH génère une clé et ajoute automatiquement l'enregistrement TXT dans la zone DNS

**Vérification :**
- Envoyer un email de test
- Vérifier les en-têtes (headers) de l'email reçu
- Chercher `DKIM-Signature:` → doit être présent et valide

### 6.3 Sous-Domaines Additionnels (Si Besoin)

Si vous voulez ajouter des sous-domaines (ex: `blog.enfrancaissvp.fr`), procédure similaire :

1. **Webflow** > **Hosting** > **Add Custom Domain** > `blog.enfrancaissvp.fr`
2. Noter l'enregistrement CNAME fourni
3. **OVH** > Zone DNS > **Ajouter CNAME** :
   - Sous-domaine : `blog`
   - Cible : `proxy-ssl.webflow.com`
4. Attendre propagation
5. SSL activé automatiquement par Webflow

---

## 🚨 Troubleshooting : Problèmes Courants

### Problème 1 : Le Site n'Affiche Pas (404 ou Erreur Webflow)

**Causes possibles :**
- DNS pas encore propagé
- Enregistrements DNS mal configurés
- Domaine pas publié dans Webflow

**Solutions :**
1. Vérifier la propagation DNS (whatsmydns.net)
2. Vérifier que les enregistrements A et CNAME sont corrects
3. **Webflow** > **Publish** (re-publier le site)
4. Attendre 24-48h si DNS récent

### Problème 2 : SSL Non Actif (Pas de HTTPS)

**Causes possibles :**
- DNS pas encore propagé (Webflow attend la propagation avant de provisionner SSL)
- Conflit d'enregistrements DNS

**Solutions :**
1. Attendre 24-48h après propagation DNS complète
2. **Webflow** > **Hosting** > **SSL** > Vérifier le statut
3. Si bloqué : Supprimer et re-ajouter le domaine dans Webflow
4. Contacter le support Webflow si problème persiste

### Problème 3 : Emails Ne Fonctionnent Plus

**Causes possibles :**
- Enregistrements MX supprimés ou modifiés par erreur

**Solutions :**
1. **OVH Manager** > Zone DNS > Vérifier les enregistrements MX
2. Si absents, les recréer :
   ```
   Type: MX
   Nom: @ (ou vide)
   Cible: mx1.mail.ovh.net
   Priorité: 1
   ```
   ```
   Type: MX
   Nom: @ (ou vide)
   Cible: mx2.mail.ovh.net
   Priorité: 5
   ```
3. Attendre propagation (2-6h)
4. Tester la réception d'emails

### Problème 4 : Redirection Apex ↔ WWW Ne Fonctionne Pas

**Solutions :**
1. **Webflow** > **Hosting** > Vérifier **"Redirect to Default Domain"** activé
2. Vérifier que **les deux domaines** (apex et www) sont ajoutés dans Webflow
3. Re-publier le site

---

## 📝 Checklist Finale DNS

Avant de considérer la migration DNS complète :

- [ ] Enregistrement `A` pour `@` pointe vers IP Webflow
- [ ] Enregistrement `CNAME` pour `www` pointe vers `proxy-ssl.webflow.com`
- [ ] Enregistrements `MX` (emails) sont **intacts et fonctionnels**
- [ ] DNS propagé (vérifier avec whatsmydns.net)
- [ ] `https://enfrancaissvp.fr` affiche le site Webflow
- [ ] `https://www.enfrancaissvp.fr` affiche le site Webflow
- [ ] Redirection HTTP → HTTPS fonctionne
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Emails OVH fonctionnent (test envoi/réception)
- [ ] SPF et DKIM configurés (recommandé)

---

## 🎯 Résultat Final

Une fois cette procédure terminée :

✅ **enfrancaissvp.fr** et **www.enfrancaissvp.fr** pointent vers Webflow
✅ HTTPS actif et sécurisé (SSL Let's Encrypt)
✅ Emails OVH fonctionnels (MX intacts)
✅ Aucune interruption de service email
✅ Migration DNS propre et professionnelle

**Prêt pour la mise en production !** 🚀

---

## 📞 Support

**En cas de problème :**

- **Webflow Support :** https://university.webflow.com/ ou chat support
- **OVH Support :** https://www.ovh.com/fr/support/
- **Vérification DNS :** https://www.whatsmydns.net/
- **Test SSL :** https://www.ssllabs.com/ssltest/

---

**Fin du Guide DNS Webflow** ✨
# Configuration DNS : OVH → Webflow (MX préservés)

## Objectif

Pointer le domaine OVH vers Webflow SANS toucher aux enregistrements MX (conservation emails OVH).

## Prérequis

- Accès admin panel OVH
- Site Webflow publié (plan Site CMS)
- Domaine custom activé dans Webflow

## Étape 1 : Récupérer les DNS Webflow

1. Dans Webflow : **Project Settings > Hosting > Custom Domain**
2. Cliquer "Add Custom Domain"
3. Entrer votre domaine (ex: `efsvp.fr`)
4. Webflow affiche les enregistrements DNS requis :

**Pour domaine apex (`efsvp.fr`)** :
```
Type: A
Name: @
Value: 75.2.70.75
```

**Pour www (`www.efsvp.fr`)** :
```
Type: CNAME
Name: www
Value: proxy-ssl.webflow.com
```

## Étape 2 : Configuration OVH

### 2.1 Accéder à la Zone DNS

1. Se connecter à [OVH Manager](https://www.ovh.com/manager/)
2. Aller dans **Web Cloud > Noms de domaine**
3. Sélectionner votre domaine
4. Onglet **Zone DNS**

### 2.2 Vérifier les MX existants

**AVANT toute modification** :

1. Noter tous les enregistrements MX actuels
2. Exemple :
```
Type: MX
Name: (vide ou @)
Priority: 1
Value: mx1.mail.ovh.net
TTL: 3600
```

**⚠️ NE PAS TOUCHER AUX MX !**

### 2.3 Modifier l'enregistrement A

1. Chercher l'enregistrement `A` existant pour `@` (ou nom vide)
2. Cliquer **Modifier**
3. Changer la valeur vers : `75.2.70.75`
4. TTL : laisser par défaut (3600s ou 1h)
5. Sauvegarder

**Si pas d'enregistrement A** :
1. Cliquer **Ajouter une entrée**
2. Type : **A**
3. Sous-domaine : laisser vide (ou mettre `@`)
4. Cible : `75.2.70.75`
5. Valider

### 2.4 Configurer CNAME pour www

1. Chercher enregistrement `CNAME` pour `www`
2. Si existe : **Modifier**, sinon **Ajouter**
3. Type : **CNAME**
4. Sous-domaine : `www`
5. Cible : `proxy-ssl.webflow.com`
6. TTL : 3600
7. Valider

### 2.5 Supprimer conflits éventuels

**Vérifier** :
- Pas d'autre enregistrement `A` sur `www` (conflit avec CNAME)
- Pas d'enregistrement `AAAA` (IPv6) sur `@` pointant ailleurs

Si présents : **Supprimer** ou **Désactiver**

## Étape 3 : Validation Webflow

1. Retour dans Webflow : **Project Settings > Hosting**
2. Webflow vérifie automatiquement les DNS (peut prendre 5-10 min)
3. Status passe de "Pending" à "Connected"
4. SSL s'active automatiquement (Let's Encrypt)

**Délai propagation DNS** : 30 min à 48h (généralement < 2h)

## Étape 4 : Configuration SSL

1. Dans Webflow, section **SSL Certificate**
2. Activer **Auto-generate SSL certificate**
3. Webflow génère certificat Let's Encrypt gratuit
4. Certificat auto-renouvelé tous les 90 jours

**Forcer HTTPS** :
- Activer **Redirect HTTP to HTTPS** dans Webflow
- Activer **Enable HSTS** (recommandé)

## Vérification Post-Migration

### Test DNS (Terminal)

```bash
# Vérifier A record
dig efsvp.fr A +short
# Doit retourner : 75.2.70.75

# Vérifier CNAME www
dig www.efsvp.fr CNAME +short
# Doit retourner : proxy-ssl.webflow.com

# Vérifier MX (emails)
dig efsvp.fr MX +short
# Doit retourner : 1 mx1.mail.ovh.net (ou vos MX OVH)
```

### Test Email

Envoyer un email test vers `contact@efsvp.fr` (ou votre email OVH)
→ Doit fonctionner normalement (MX intacts)

### Test Site

- Visiter `https://efsvp.fr` → doit charger site Webflow
- Visiter `https://www.efsvp.fr` → doit charger site Webflow
- Visiter `http://efsvp.fr` → doit rediriger vers HTTPS

## Résolution Problèmes

### "DNS not pointing correctly"

**Causes** :
- Propagation DNS en cours (attendre 2h)
- TTL cache (vider cache DNS local)
- Mauvaise valeur IP ou CNAME

**Solutions** :
```bash
# Vider cache DNS (macOS)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
```

### "SSL Certificate Error"

**Causes** :
- DNS pas encore propagé
- HTTPS forcé trop tôt

**Solutions** :
- Attendre propagation DNS complète
- Désactiver temporairement "Redirect HTTP to HTTPS"
- Re-générer certificat dans Webflow

### Emails ne fonctionnent plus

**Cause** :
- Enregistrements MX supprimés par erreur

**Solution** :
1. Retour OVH Zone DNS
2. Ajouter MX :
```
Type: MX
Priority: 1
Target: mx1.mail.ovh.net

Type: MX
Priority: 5
Target: mx2.mail.ovh.net

Type: MX
Priority: 100
Target: mx3.mail.ovh.net
```

(Vérifier valeurs exactes dans doc OVH)

## Configuration Apex vs WWW

**Option A** : Forcer WWW (recommandé SEO)
- Webflow Settings > SEO > **301 Redirect apex to www**
- `efsvp.fr` → redirige vers `www.efsvp.fr`

**Option B** : Forcer Apex
- Webflow Settings > SEO > **301 Redirect www to apex**
- `www.efsvp.fr` → redirige vers `efsvp.fr`

**Conseil** : Choisir UNE version canonique et s'y tenir.

## Rollback (Retour OVH)

Si problème :

1. OVH Zone DNS
2. Modifier enregistrement `A` :
   - Remettre ancienne IP OVH (noter avant migration!)
3. Supprimer ou modifier `CNAME www`
4. Sauvegarder
5. Attendre propagation (2h)

**Backup préventif** :
Faire screenshot de toute la Zone DNS AVANT migration !

## Checklist Finale

- [ ] Enregistrement A pointant vers 75.2.70.75
- [ ] CNAME www pointant vers proxy-ssl.webflow.com
- [ ] MX records OVH intacts et fonctionnels
- [ ] Site accessible en HTTPS (apex + www)
- [ ] Redirection HTTP → HTTPS active
- [ ] SSL valide (cadenas vert navigateur)
- [ ] Emails fonctionnent (test envoi/réception)
- [ ] Propagation DNS confirmée (dig/nslookup)

---

**Support** :
- Webflow University : https://university.webflow.com/lesson/custom-domains
- OVH Docs : https://docs.ovh.com/fr/domains/

**Délai total migration** : 2-4 heures (propagation DNS comprise)
