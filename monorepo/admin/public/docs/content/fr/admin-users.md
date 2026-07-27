# Administrateurs

La page Administrateurs vous permet de gerer les comptes administrateur qui ont acces au portail d'administration Petfolioo. Ici vous pouvez creer de nouveaux administrateurs, attribuer des roles, configurer des permissions granulaires et controler le statut des comptes.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Vue d'ensemble

Le controle d'acces est essentiel pour maintenir la securite et l'integrite operationnelle. Le systeme Administrateurs supporte le controle d'acces base sur les roles avec une granularite de permissions supplementaire par page, garantissant que chaque membre de l'equipe dispose exactement de l'acces dont il a besoin.

---

## Tableau des administrateurs

La vue principale affiche un tableau de tous les comptes administrateur dans le systeme.

### Colonnes du tableau

| Colonne | Description |
|---------|-------------|
| **Nom** | Le nom d'affichage de l'administrateur montre dans tout le portail |
| **Email** | L'adresse email de connexion du compte administrateur |
| **Role** | Le role attribue determinant le niveau de permission de base |
| **Statut** | Statut actuel du compte : Actif ou Suspendu |
| **Actions** | Boutons d'action Modifier et Supprimer |

### Fonctionnalites du tableau

1. Le tableau est triable en cliquant sur les en-tetes de colonnes.
2. Un champ de recherche au-dessus du tableau permet de filtrer par nom ou email.
3. Les controles de pagination apparaissent en bas pour les equipes d'administrateurs importantes.
4. Les comptes actifs affichent un badge de statut vert ; les comptes suspendus affichent un badge rouge.

---

## Roles

Chaque compte administrateur se voit attribuer l'un des quatre roles. Les roles definissent le niveau de base d'acces avant que les surcharges de permissions granulaires soient appliquees.

### Definitions des roles

| Role | Niveau d'acces | Description |
|------|----------------|-------------|
| **super_admin** | Acces complet sans restriction | Acces total a toutes les pages, fonctionnalites et parametres systeme. Ne peut pas etre supprime ni avoir ses permissions restreintes. |
| **admin** | Tout le contenu et utilisateurs | Acces complet a la gestion de contenu, gestion des utilisateurs, retours, notifications et analyses. Ne peut pas acceder aux parametres systeme. |
| **moderator** | Examiner et moderer | Peut examiner et moderer le contenu tel que les retours, les profils signales et les entrees marquees. Ne peut pas creer ou supprimer de ressources. |
| **viewer** | Lecture seule | Peut consulter toutes les pages auxquelles il a acces mais ne peut pas creer, modifier ou supprimer d'enregistrements. Ideal pour les parties prenantes ayant besoin de visibilite. |

### Hierarchie des roles

La hierarchie des roles determine quels roles peuvent gerer les autres roles :

1. **super_admin** peut gerer tous les autres roles (admin, moderator, viewer).
2. **admin** peut gerer les comptes moderator et viewer.
3. **moderator** ne peut gerer aucun compte administrateur.
4. **viewer** ne peut gerer aucun compte administrateur.

> **Important :** Vous ne pouvez pas attribuer un role superieur au votre. Seul un super_admin peut creer un autre super_admin.

---

## Creer un administrateur

Pour ajouter un nouveau compte administrateur au portail :

### Etapes

1. Cliquez sur le bouton **Ajouter un administrateur** dans le coin superieur droit de la page Administrateurs.
2. Un formulaire de creation apparait avec les champs suivants :

| Champ | Description | Exigences |
|-------|-------------|-----------|
| **Email** | L'email de connexion du nouvel administrateur | Obligatoire. Doit etre une adresse email valide et unique. |
| **Nom d'affichage** | Le nom affiche dans l'interface du portail | Obligatoire. 2-50 caracteres. |
| **Mot de passe** | Le mot de passe de connexion initial | Obligatoire. Minimum 8 caracteres, doit inclure majuscule, minuscule et un chiffre. |
| **Role** | Le role d'acces pour cet administrateur | Obligatoire. Selectionnez dans le menu deroulant. |

3. Remplissez le champ **Email** avec l'adresse email du nouvel administrateur.
4. Saisissez un **Nom d'affichage** qui identifiera cet administrateur dans le portail.
5. Definissez un **Mot de passe** initial repondant aux exigences de complexite.
6. Selectionnez le **Role** approprie dans le menu deroulant.
7. Cliquez sur **Creer** pour ajouter le compte administrateur.
8. Un message de succes confirme que le compte a ete cree.
9. Le nouvel administrateur apparait dans le tableau et peut maintenant se connecter.

> **Conseil :** Apres la creation d'un compte, informez le nouvel administrateur de ses identifiants par un canal securise. Recommandez-lui de changer son mot de passe lors de sa premiere connexion.

---

## Modifier un administrateur

Vous pouvez modifier le nom d'affichage, le role et le statut d'un administrateur existant.

### Etapes

1. Localisez l'administrateur dans le tableau des Administrateurs.
2. Cliquez sur le bouton **Modifier** (icone crayon) dans la colonne Actions.
3. Un formulaire de modification apparait avec les valeurs actuelles pre-remplies.

### Champs modifiables

| Champ | Description | Notes |
|-------|-------------|-------|
| **Nom d'affichage** | Mettre a jour le nom visible de l'administrateur | 2-50 caracteres |
| **Role** | Changer le niveau d'acces de l'administrateur | Ne peut pas attribuer un role superieur au votre |
| **Statut** | Definir sur Actif ou Suspendu | Les administrateurs suspendus ne peuvent pas se connecter |

4. Modifiez les champs selon les besoins.
5. Cliquez sur **Enregistrer les modifications** pour appliquer les mises a jour.
6. Un message de succes confirme que les modifications ont ete enregistrees.

### Changer le statut

- **Actif** -- L'administrateur peut se connecter et utiliser le portail normalement.
- **Suspendu** -- L'administrateur ne peut pas se connecter. Les sessions existantes sont terminees immediatement.

> **Remarque :** Suspendre un administrateur est reversible. Utilisez-le lorsque vous devez revoquer temporairement l'acces sans supprimer le compte.

### Restrictions

- Vous ne pouvez pas modifier votre propre role (pour eviter une auto-retrogradation accidentelle).
- Vous ne pouvez pas changer le role d'un super_admin a moins d'etre egalement un super_admin.
- L'email ne peut pas etre modifie apres la creation du compte.

---

## Configuration des permissions granulaires par page

Au-dela des roles, le portail d'administration prend en charge un controle de permission fin par page. Cela vous permet de personnaliser exactement quelles pages et actions chaque administrateur peut acceder.

### Acceder a la configuration des permissions

1. Cliquez sur le bouton **Modifier** de l'administrateur que vous souhaitez configurer.
2. Dans le dialogue de modification, naviguez vers la section **Permissions** (ou onglet).
3. Une matrice de permissions s'affiche montrant toutes les pages du portail.

### Structure de la matrice de permissions

La matrice de permissions affiche chaque page du portail comme une ligne avec les controles suivants :

| Controle | Description |
|----------|-------------|
| **Bascule d'acces** | Un interrupteur qui active ou desactive l'acces a la page entiere |
| **Multi-selection d'actions** | Un menu deroulant permettant de selectionner quelles actions specifiques sont autorisees sur cette page |

### Pages disponibles dans la matrice

| Page | Actions possibles |
|------|-------------------|
| Tableau de bord | Voir |
| Utilisateurs | Voir, Creer, Modifier, Supprimer, Suspendre |
| Animaux | Voir, Creer, Modifier, Supprimer |
| Dossiers de sante | Voir, Creer, Modifier, Supprimer |
| Vaccinations | Voir, Creer, Modifier, Supprimer |
| Elevage | Voir, Creer, Modifier, Supprimer |
| Retours | Voir, Repondre, Cloturer, Epingler |
| Notifications | Voir, Envoyer |
| Analyses | Voir, Exporter |
| Parametres | Voir, Modifier |
| Administrateurs | Voir, Creer, Modifier, Supprimer |

### Configuration des permissions

1. Pour chaque ligne de page, basculez l'interrupteur **Acces** :
   - **ACTIVE** -- L'administrateur peut acceder a cette page (actions specifiques controlees ci-dessous).
   - **DESACTIVE** -- L'administrateur ne peut pas voir ni naviguer vers cette page du tout.
2. Pour les pages avec l'acces active, cliquez sur le menu deroulant multi-selection **Actions**.
3. Selectionnez les actions specifiques que cet administrateur est autorise a effectuer :
   - Cochez chaque action que vous souhaitez accorder.
   - Decochez les actions que vous souhaitez restreindre.
4. Repetez pour chaque page selon les besoins.
5. Cliquez sur **Enregistrer les modifications** pour appliquer la configuration des permissions.

### Comment les permissions interagissent avec les roles

- Les permissions de role servent de **base de reference**.
- Les permissions par page peuvent **restreindre** l'acces en dessous de la base de reference du role.
- Les permissions par page **ne peuvent pas accorder** d'acces au-dela de ce que le role autorise.
- Par exemple : Un utilisateur avec le role admin a acces a toutes les pages de contenu par defaut. Vous pouvez restreindre son acces a la page Elevage en la desactivant, mais vous ne pouvez pas lui accorder l'acces aux Parametres (reserve aux super_admin).

> **Conseil :** Utilisez les permissions granulaires lorsque vous avez des membres d'equipe qui ont besoin d'un sous-ensemble specifique de capacites d'administration. Par exemple, un agent de support client pourrait etre un role "admin" mais restreint uniquement aux pages Retours et Utilisateurs.

---

## Supprimer un administrateur

La suppression d'un compte administrateur le retire definitivement du systeme.

### Etapes

1. Localisez l'administrateur dans le tableau des Administrateurs.
2. Cliquez sur le bouton **Supprimer** (icone poubelle) dans la colonne Actions.
3. Un dialogue de confirmation apparait avec le nom et l'email de l'administrateur.
4. Tapez l'adresse email de l'administrateur pour confirmer la suppression (mesure de securite).
5. Cliquez sur **Confirmer la suppression** pour supprimer definitivement le compte.
6. Un message de succes confirme la suppression.
7. L'administrateur est retire du tableau et ne peut plus se connecter.

### Restrictions de suppression

| Restriction | Raison |
|-------------|--------|
| Impossible de supprimer un super_admin | Empeche le verrouillage accidentel du systeme |
| Impossible de supprimer votre propre compte | Empeche l'auto-suppression |
| Impossible de supprimer si vous n'avez pas le role suffisant | Les regles de hierarchie des roles s'appliquent |

> **Avertissement :** La suppression est permanente et ne peut pas etre annulee. Si vous devez retirer temporairement l'acces, utilisez le statut Suspendu a la place.

---

## Explication de la matrice de permissions

Le systeme de permissions dans Petfolioo utilise une approche en couches :

### Couche 1 : Controle d'acces base sur les roles (RBAC)

Chaque role a un ensemble predefini de permissions qui servent de point de depart :

```
super_admin  -->  Toutes les pages, toutes les actions, aucune restriction
admin        -->  Toutes les pages contenu/utilisateurs, toutes les actions (sauf Parametres)
moderator    -->  Pages de revue de contenu, actions limitees (voir, repondre, cloturer)
viewer       -->  Toutes les pages accessibles, lecture seule
```

### Couche 2 : Surcharges par page

Les permissions granulaires ajoutent une seconde couche au-dessus du RBAC :

```
Permissions de role  (base de reference)
    |
    v
Bascules par page  (peut restreindre, ne peut pas etendre au-dela du role)
    |
    v
Permissions effectives finales  (ce que l'administrateur voit reellement)
```

### Exemples de scenarios

**Scenario 1 : Agent de support client**
- Role : admin
- Surcharge : Desactiver l'acces a Animaux, Dossiers de sante, Elevage, Analyses, Administrateurs
- Resultat : Ne peut acceder qu'au Tableau de bord, Utilisateurs, Retours et Notifications

**Scenario 2 : Examinateur de contenu**
- Role : moderator
- Surcharge : Activer Retours (Voir, Repondre, Cloturer), Utilisateurs (Voir uniquement)
- Resultat : Peut examiner les retours et consulter les profils utilisateurs mais ne peut pas modifier les utilisateurs

**Scenario 3 : Observateur analytique**
- Role : viewer
- Surcharge : Activer uniquement Tableau de bord et Analyses
- Resultat : Peut voir les graphiques et metriques mais rien d'autre

### Voir les permissions effectives

1. Ouvrez le dialogue de modification pour n'importe quel administrateur.
2. La section Permissions montre l'etat effectif actuel.
3. Les bascules et selections d'actions refletent ce qui est actuellement accorde.
4. Les actions desactivees (grisees) indiquent celles au-dela de l'autorisation du role.

---

## Bonnes pratiques de securite

1. **Principe du moindre privilege** -- Attribuez le role et les permissions minimaux necessaires pour la fonction de chaque administrateur.
2. **Audits reguliers** -- Examinez les comptes administrateur chaque trimestre. Supprimez les comptes qui ne sont plus necessaires.
3. **Suspendre avant supprimer** -- Lors du depart d'un membre, suspendez d'abord pour eviter toute perturbation, puis supprimez apres un delai de grace.
4. **Limiter les super_admins** -- Gardez le nombre de comptes super_admin au minimum (idealement 1-2).
5. **Mots de passe forts** -- Imposez des mots de passe complexes et recommandez les gestionnaires de mots de passe.
6. **Surveiller l'activite** -- Verifiez qui se connecte et quand via les journaux systeme.

---

## Resolution de problemes

| Probleme | Solution |
|----------|----------|
| Impossible de creer un administrateur | Verifiez que vous avez des privileges de role suffisants. Verifiez que l'email n'est pas deja utilise. |
| Boutons Modifier/Supprimer non visibles | Votre role n'a pas la permission de gerer les administrateurs au niveau ou au-dessus du role de la cible. |
| L'administrateur ne peut pas se connecter apres creation | Verifiez que le statut du compte est Actif. Confirmez que le mot de passe a ete saisi correctement. |
| Les changements de permissions ne prennent pas effet | L'administrateur peut avoir besoin de se deconnecter et se reconnecter pour que les changements de permissions s'appliquent. |
| Impossible de supprimer un super_admin | C'est prevu par conception. Les comptes super_admin ne peuvent pas etre supprimes via l'interface. |

---

## Pages associees

- [Parametres](./settings.md) -- Configurer les parametres de securite systeme
- [Retours](./feedback.md) -- Gerer les retours utilisateurs (necessite l'acces a la page Retours)
- [Analyses](./analytics.md) -- Voir les metriques de la plateforme (necessite l'acces a la page Analyses)
