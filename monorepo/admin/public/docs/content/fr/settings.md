# Parametres

La page Parametres fournit des options de configuration systeme pour la plateforme Petfolioo. Les parametres sont organises en trois onglets : General, Notifications et Securite. Les modifications effectuees ici affectent le comportement du portail d'administration et de l'application mobile.

![Settings](/docs/screenshots/settings.png)

---

## Vue d'ensemble

Seuls les administrateurs avec le role super_admin ou admin (avec acces a la page Parametres) peuvent consulter et modifier les parametres. Toutes les modifications necessitent un enregistrement explicite et prennent effet immediatement apres la sauvegarde.

---

## Acceder aux parametres

1. Cliquez sur **Parametres** dans le menu de navigation laterale.
2. La page Parametres se charge avec trois onglets en haut.
3. L'onglet **General** est selectionne par defaut.

---

## Onglet General

L'onglet General contient les options de configuration principales de l'application qui definissent comment la plateforme se presente et fonctionne.

### Champs

| Champ | Description | Valeur par defaut |
|-------|-------------|-------------------|
| **Nom de l'application** | Le nom d'affichage de l'application montre dans les notifications et emails | Petfolioo |
| **Email de support** | L'adresse email de contact affichee aux utilisateurs pour les demandes de support | -- |
| **Langue par defaut** | La langue par defaut pour les nouveaux utilisateurs et les communications systeme | Anglais |
| **Mode maintenance** | Bascule pour activer ou desactiver le mode maintenance | Desactive |

### Configuration des parametres generaux

#### Nom de l'application

1. Localisez le champ **Nom de l'application**.
2. Effacez la valeur existante et tapez le nom d'application souhaite.
3. Ce nom apparait dans les notifications push, les en-tetes d'emails et la section "A propos" de l'application mobile.

#### Email de support

1. Localisez le champ **Email de support**.
2. Saisissez l'adresse email ou les utilisateurs doivent adresser leurs demandes de support.
3. Cet email est affiche sur l'ecran d'aide/contact de l'application mobile.

> **Conseil :** Utilisez un email d'equipe partage (ex. : support@petfolioo.com) plutot qu'une adresse personnelle pour que plusieurs membres de l'equipe puissent repondre.

#### Langue par defaut

1. Cliquez sur le menu deroulant **Langue par defaut**.
2. Selectionnez la langue qui sera utilisee par defaut pour :
   - La creation de nouveaux comptes utilisateurs
   - Les notifications generees par le systeme
   - Les modeles d'emails
3. Les utilisateurs peuvent remplacer ce parametre dans les parametres individuels de l'application mobile.

#### Mode maintenance

Le mode maintenance est une fonctionnalite critique qui signale aux utilisateurs que la plateforme est temporairement indisponible.

1. Localisez la bascule **Mode maintenance**.
2. Cliquez sur la bascule pour activer le mode maintenance.
3. Un dialogue d'avertissement apparait confirmant l'action.

**Lorsque le mode maintenance est active :**

| Effet | Description |
|-------|-------------|
| Avertissement portail admin | Une banniere proeminente apparait en haut du portail d'administration indiquant que le mode maintenance est actif |
| Impact application mobile | L'application mobile affiche un ecran de maintenance aux utilisateurs, empechant l'utilisation normale |
| Comportement API | Les points d'acces API retournent des reponses de statut maintenance |
| Acces administrateur | Les administrateurs peuvent toujours acceder au portail d'administration normalement |

4. Pour desactiver le mode maintenance, cliquez a nouveau sur la bascule.
5. Confirmez l'action dans le dialogue.
6. La plateforme revient a un fonctionnement normal immediatement.

> **Avertissement :** L'activation du mode maintenance affecte immediatement tous les utilisateurs de l'application mobile. Ne l'activez que pendant les fenetres de maintenance planifiees et communiquez le calendrier a l'avance via notification push.

---

## Onglet Notifications

L'onglet Notifications controle les comportements de notifications automatiques -- les alertes generees par le systeme envoyees aux utilisateurs en fonction des donnees de leurs animaux.

### Champs

| Champ | Description | Type | Valeur par defaut |
|-------|-------------|------|-------------------|
| **Rappels de vaccination** | Envoyer des rappels automatiques quand la vaccination d'un animal approche de sa date d'echeance | Bascule | Active |
| **Alertes de gestation** | Envoyer des alertes pour les dates jalons de gestation et l'accouchement prevu | Bascule | Active |
| **Mises a jour de reproduction** | Envoyer des mises a jour sur les evenements de calendrier de reproduction et les confirmations | Bascule | Active |
| **Jours de rappel avant echeance** | Nombre de jours avant une date d'echeance pour envoyer la notification de rappel | Champ numerique | 7 |

### Configuration des parametres de notifications

#### Rappels de vaccination

1. Localisez la bascule **Rappels de vaccination**.
2. Lorsque **active** (par defaut) :
   - Les utilisateurs recoivent des notifications push avant les dates d'echeance de vaccination de leur animal.
   - La notification est envoyee selon le parametre "Jours de rappel avant echeance".
   - Exemple : Si defini a 7 jours, les utilisateurs recoivent un rappel une semaine avant l'echeance de vaccination.
3. Lorsque **desactive** :
   - Aucun rappel de vaccination automatique n'est envoye.
   - Les utilisateurs doivent verifier manuellement le calendrier de vaccination de leur animal.

#### Alertes de gestation

1. Localisez la bascule **Alertes de gestation**.
2. Lorsque **active** (par defaut) :
   - Les utilisateurs suivant une gestation recoivent des notifications de jalons.
   - Les alertes incluent les rappels de date d'accouchement prevue et les transitions d'etapes.
   - Les eleveurs recoivent des notifications de suivi professionnel supplementaires.
3. Lorsque **desactive** :
   - Aucune alerte liee a la gestation n'est envoyee automatiquement.

#### Mises a jour de reproduction

1. Localisez la bascule **Mises a jour de reproduction**.
2. Lorsque **active** (par defaut) :
   - Les utilisateurs recoivent des notifications sur les evenements de reproduction programmes.
   - Des notifications de confirmation sont envoyees lorsque des enregistrements de reproduction sont consignes.
   - Les eleveurs recoivent des suggestions de correspondance et des rappels de calendrier.
3. Lorsque **desactive** :
   - Aucune notification automatique liee a la reproduction n'est envoyee.

#### Jours de rappel avant echeance

1. Localisez le champ numerique **Jours de rappel avant echeance**.
2. Saisissez le nombre de jours avant une date d'echeance ou les rappels doivent etre envoyes.
3. Cette valeur s'applique a tous les rappels bases sur des dates (vaccinations, rendez-vous).
4. Plage valide : 1 a 30 jours.

> **Conseil :** Une valeur de 7 jours convient bien a la plupart des utilisateurs. Pour les eleveurs gerant plusieurs animaux, envisagez de definir 14 jours pour donner plus de temps de preparation.

### Tableau d'interaction des notifications

| Parametre | Affecte | Impact utilisateur |
|-----------|---------|-------------------|
| Rappels vaccination ACTIF + 7 jours | Utilisateurs avec des animaux ayant des vaccinations prochaines | "La vaccination antirabique de Rex arrive dans 7 jours" |
| Alertes gestation ACTIF | Utilisateurs avec des enregistrements de gestation actifs | "La gestation de Luna est entree dans la semaine 6" |
| Mises a jour reproduction ACTIF | Utilisateurs avec des reproductions programmees | "Rendez-vous de reproduction avec Max confirme pour vendredi" |
| Toutes les bascules DESACTIVEES | Tous les utilisateurs | Aucune notification automatique ; uniquement les notifications manuelles de l'administrateur |

---

## Onglet Securite

L'onglet Securite contient les parametres qui controlent la limitation de debit API, les durees de vie des jetons d'authentification et les restrictions de telechargement de fichiers.

### Champs

| Champ | Description | Type | Valeur par defaut |
|-------|-------------|------|-------------------|
| **Limite de debit par minute** | Nombre maximum de requetes API autorisees par utilisateur par minute | Nombre | 60 |
| **Expiration du jeton d'acces (heures)** | Duree de validite d'un jeton d'acces | Nombre | 24 |
| **Expiration du jeton de rafraichissement (jours)** | Duree de validite d'un jeton de rafraichissement | Nombre | 30 |
| **Taille max photo (Mo)** | Taille maximale autorisee pour les photos d'animaux | Nombre | 5 |
| **Taille max avatar (Mo)** | Taille maximale autorisee pour les avatars utilisateurs | Nombre | 2 |
| **Types de fichiers autorises** | Liste separee par des virgules des types MIME acceptes pour les telechargements | Texte | image/jpeg,image/png,image/webp |

### Configuration des parametres de securite

#### Limite de debit par minute

1. Localisez le champ **Limite de debit par minute**.
2. Saisissez le nombre maximum de requetes API qu'un seul utilisateur peut effectuer par minute.
3. Les requetes depassant cette limite recoivent une reponse 429 (Too Many Requests).
4. Plage recommandee : 30-120 selon les schemas d'utilisation prevus.

> **Important :** Definir cette valeur trop basse peut faire dysfonctionner l'application mobile pour les utilisateurs actifs. La definir trop haute peut laisser le systeme vulnerable aux abus. La valeur par defaut de 60 convient a la plupart des deploiements.

#### Expiration du jeton d'acces (heures)

1. Localisez le champ **Expiration du jeton d'acces**.
2. Saisissez le nombre d'heures pendant lesquelles un jeton d'acces reste valide apres son emission.
3. Lorsqu'un jeton expire, l'application utilise le jeton de rafraichissement pour en obtenir un nouveau.
4. Des valeurs plus courtes sont plus securisees ; des valeurs plus longues reduisent la friction de connexion.

| Valeur | Securite | Experience utilisateur |
|--------|----------|----------------------|
| 1 heure | Elevee | Re-authentification frequente |
| 24 heures | Moyenne | Bon equilibre (recommande) |
| 72 heures | Moindre | Interruption minimale |

#### Expiration du jeton de rafraichissement (jours)

1. Localisez le champ **Expiration du jeton de rafraichissement**.
2. Saisissez le nombre de jours pendant lesquels un jeton de rafraichissement reste valide.
3. Lorsque le jeton de rafraichissement expire, l'utilisateur doit se reconnecter avec ses identifiants.
4. Plage recommandee : 7-90 jours.

> **Conseil :** Pour une application grand public comme Petfolioo, 30 jours est un bon equilibre. Les utilisateurs qui ouvrent l'application au moins une fois par mois n'auront jamais besoin de se reconnecter. Pour des deploiements a securite renforcee, envisagez 7 jours.

#### Taille max photo (Mo)

1. Localisez le champ **Taille max photo**.
2. Saisissez la taille maximale de fichier en megaoctets pour les telechargements de photos d'animaux.
3. Les photos depassant cette taille sont rejetees avec un message d'erreur.
4. Tenez compte des couts de stockage et des temps de telechargement pour les utilisateurs avec des connexions lentes.

| Valeur | Adapte pour |
|--------|-------------|
| 2 Mo | Stockage reduit, telechargements rapides, qualite inferieure |
| 5 Mo | Equilibre (recommande) |
| 10 Mo | Photos haute qualite, plus d'utilisation de stockage |

#### Taille max avatar (Mo)

1. Localisez le champ **Taille max avatar**.
2. Saisissez la taille maximale de fichier en megaoctets pour les telechargements d'avatar de profil utilisateur.
3. Les avatars sont generalement plus petits que les photos d'animaux puisqu'ils sont affiches en resolution reduite.
4. Recommande : 1-3 Mo.

#### Types de fichiers autorises

1. Localisez le champ **Types de fichiers autorises**.
2. Saisissez une liste separee par des virgules des types MIME que le systeme accepte pour les telechargements.
3. Chaque type MIME doit etre au format `type/sous-type`.
4. N'ajoutez pas d'espaces entre les entrees a moins que vous ne souhaitiez intentionnellement les inclure dans la chaine de type MIME.

**Types MIME courants pour les telechargements d'images :**

| Type MIME | Format | Notes |
|-----------|--------|-------|
| `image/jpeg` | JPEG | Format photo le plus courant, bonne compression |
| `image/png` | PNG | Sans perte, supporte la transparence |
| `image/webp` | WebP | Format moderne, excellente compression |
| `image/heic` | HEIC | Format d'Apple, utilise par les appareils photo iPhone |
| `image/gif` | GIF | Images animees, tailles de fichier plus importantes |

**Exemples de configurations :**

```
Standard :    image/jpeg,image/png,image/webp
Etendue :     image/jpeg,image/png,image/webp,image/heic,image/gif
Minimale :    image/jpeg,image/png
```

> **Avertissement :** Ajouter des types MIME non supportes peut permettre des telechargements que le systeme ne peut pas traiter. N'ajoutez que les types que votre pipeline de traitement d'images supporte.

---

## Enregistrer les parametres

Toutes les modifications de parametres necessitent une action de sauvegarde explicite.

### Etapes pour enregistrer

1. Effectuez les modifications souhaitees sur n'importe lequel des trois onglets.
2. Cliquez sur le bouton **Enregistrer les parametres** en bas de la page.
3. Un indicateur de chargement apparait pendant l'application des modifications.
4. Une notification de succes confirme que les parametres ont ete enregistres.
5. Les modifications prennent effet immediatement sur toute la plateforme.

### Notes importantes sur la sauvegarde

- Les modifications ne sont **pas** enregistrees automatiquement. Si vous naviguez ailleurs sans sauvegarder, les modifications sont perdues.
- Vous pouvez modifier les parametres sur plusieurs onglets avant de sauvegarder -- toutes les modifications sont enregistrees ensemble.
- Si une erreur de validation survient, le champ specifique est mis en surbrillance avec un message d'erreur.
- Seuls les champs qui ont change sont envoyes au serveur (mise a jour partielle optimiste).

> **Conseil :** Apres avoir enregistre des modifications liees a la securite (limites de debit, expiration des jetons), surveillez le systeme pendant une courte periode pour vous assurer qu'aucun comportement inattendu ne se produit.

---

## Audit des modifications de parametres

Toutes les modifications de parametres sont enregistrees pour la securite et la responsabilite :

| Information enregistree | Description |
|------------------------|-------------|
| Nom de l'administrateur | Qui a effectue la modification |
| Horodatage | Quand la modification a ete effectuee |
| Champ modifie | Quel parametre a ete modifie |
| Valeur precedente | La valeur avant la modification |
| Nouvelle valeur | La valeur apres la modification |

---

## Resolution de problemes

| Probleme | Solution |
|----------|----------|
| Impossible d'acceder a la page Parametres | Verifiez que votre role est super_admin ou admin avec permission d'acces aux Parametres. |
| Bouton Enregistrer desactive | Aucune modification n'a ete effectuee. Modifiez au moins un champ pour activer la sauvegarde. |
| Erreur de validation a la sauvegarde | Verifiez le champ mis en surbrillance pour le message d'erreur specifique et corrigez la valeur. |
| Le mode maintenance n'affecte pas l'application | Accordez 1-2 minutes pour que la modification se propage a toutes les instances de l'application mobile. |
| Limite de debit trop restrictive | Augmentez la valeur et enregistrez. Les utilisateurs affectes seront debloques dans la minute. |
| Erreurs de telechargement de fichier apres modification de type | Assurez-vous que les types MIME sont correctement formates sans virgules ou espaces en fin de chaine. |

---

## Pages associees

- [Administrateurs](./admin-users.md) -- Gerer qui peut acceder et modifier les parametres
- [Notifications](./notifications.md) -- Envoyer des notifications manuelles aux utilisateurs
- [Analyses](./analytics.md) -- Surveiller la sante et l'utilisation de la plateforme
