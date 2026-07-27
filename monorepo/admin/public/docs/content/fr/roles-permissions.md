# Roles & Permissions

Le portail d'administration Petfolioo utilise un systeme de controle d'acces base sur les roles (RBAC) pour gerer ce que chaque administrateur peut voir et faire. Chaque utilisateur admin se voit attribuer un role, et chaque role definit un ensemble d'acces au niveau des pages et de permissions au niveau des actions.

---

## Vue d'ensemble des roles

La plateforme prend en charge quatre roles d'administration, chacun avec un ensemble de capacites progressivement elargi :

| Role | Description | Cas d'utilisation typique |
|------|-------------|-----------------|
| **Super Admin** | Acces complet et illimite a toutes les pages et actions | Proprietaire de la plateforme, CTO, administrateur principal |
| **Admin** | Large acces aux pages operationnelles ; pas d'acces aux parametres systeme ni a la gestion des utilisateurs admin | Gestionnaire de plateforme, responsable des operations |
| **Moderator** | Acces cible sur les taches de moderation de contenu (verification, accouplement, animaux) | Gestionnaire de communaute, reviseur de contenu |
| **Viewer** | Acces en lecture seule a la plupart des pages ; ne peut rien creer, modifier ou supprimer | Agent de support, partie prenante, auditeur |

---

## Structure des permissions

Les permissions sont definies a deux niveaux :

### 1. Acces aux pages

Chaque role se voit accorder ou refuser l'acces a des pages specifiques. Si un role n'a pas acces a une page, celle-ci n'apparait pas dans la navigation de la barre laterale et l'acces direct par URL est bloque.

### 2. Permissions d'action

Au sein d'une page a laquelle un role peut acceder, des actions specifiques peuvent etre activees ou desactivees. Par exemple, un Moderator peut **consulter** les animaux mais pas les **supprimer**.

---

## Matrice des permissions

La matrice suivante montre exactement ce que chaque role peut faire sur chaque page.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Visibilite des pages par role

Ce tableau resume les pages qui apparaissent dans la navigation de la barre laterale pour chaque role :

| Page | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Comment les permissions affectent l'UI

Lorsqu'un utilisateur n'a pas la permission pour une action specifique, le portail d'administration adapte l'interface en consequence :

| Scenario | Comportement de l'UI |
|----------|-------------|
| Pas d'acces a la page | Page supprimee de la barre laterale ; l'URL renvoie 403 |
| Consultation uniquement (pas de Edit/Delete) | Boutons d'action masques ; lignes du tableau non cliquables pour l'edition |
| Pas de permission Create | Bouton "Create" / "Add" masque |
| Pas de permission Delete | Option Delete supprimee des menus d'action |
| Pas de permission Export | Bouton Export masque |
| Pas de Approve/Reject | Boutons d'action de verification masques ; statut affiche en lecture seule |

> **Remarque :** L'UI masque les actions non disponibles plutot que d'afficher des boutons desactives. Cela garde l'interface propre et evite toute confusion sur ce qui est permis ou non.

---

## Gestion des permissions

Seuls les utilisateurs **Super Admin** peuvent creer, modifier ou supprimer des comptes administrateurs et modifier leurs permissions.

### Attribuer un role

1. Naviguez vers **Admin Users** dans la barre laterale.
2. Cliquez sur **Create Admin User** ou modifiez un utilisateur existant.
3. Selectionnez le role souhaite dans le menu deroulant des roles.
4. Si vous selectionnez **Super Admin**, toutes les permissions sont automatiquement accordees et ne peuvent pas etre personnalisees.
5. Pour les autres roles, personnalisez l'acces aux pages et les actions a l'aide de l'editeur de permissions.

### Permissions personnalisees

Bien que chaque role ait des permissions typiques, le systeme prend en charge la personnalisation par utilisateur :

- Un **Admin** peut se voir accorder l'acces a Settings si necessaire.
- Un **Moderator** peut recevoir l'acces en consultation a Analytics.
- Un **Viewer** peut etre restreint a moins de pages que la configuration par defaut.

Les permissions personnalisees remplacent les valeurs par defaut du role. L'etiquette du role reste la meme, mais c'est l'acces reel qui compte.

### Editeur de permissions

L'editeur de permissions affiche une interface sous forme de liste de controle :

1. Chaque page apparait comme une section avec un interrupteur pour l'acces a la page.
2. Lorsque l'acces a la page est active, les actions disponibles pour cette page apparaissent sous forme de cases a cocher.
3. Cochez ou decochez des actions individuelles pour affiner les capacites de l'utilisateur.
4. Cliquez sur **Save** pour appliquer les modifications immediatement.

> **Important :** Les modifications de permissions prennent effet au prochain chargement de page de l'utilisateur. Si l'utilisateur est actuellement connecte, il verra les permissions mises a jour apres avoir actualise son navigateur.

---

## Reference rapide de comparaison des roles

### Super Admin
- Peut tout faire
- Seul role pouvant gerer les utilisateurs admin et les parametres systeme
- Seul role pouvant supprimer des utilisateurs de l'application et des notifications
- Seul role pouvant exporter les donnees utilisateur
- Ne peut pas etre supprime s'il s'agit du dernier compte Super Admin

### Admin
- Acces operationnel complet a la gestion du contenu et des utilisateurs
- Peut approuver/rejeter les verifications
- Peut gerer le Mating Marketplace
- Peut envoyer des notifications
- Ne peut pas acceder aux pages Settings ou Admin Users
- Ne peut pas supprimer les utilisateurs de l'application (seulement les bannir)

### Moderator
- Concentre sur la qualite du contenu et la securite de la communaute
- Peut approuver/rejeter les verifications d'eleveurs
- Peut moderer les annonces d'accouplement
- Peut modifier les animaux (corriger les informations incorrectes)
- Peut bannir les utilisateurs problematiques
- Ne peut pas acceder a Analytics, Settings ou Admin Users
- Ne peut pas creer ou supprimer du contenu

### Viewer
- Acces en lecture seule a des fins de supervision
- Peut consulter les tableaux de bord, utilisateurs, animaux, analytics
- Ne peut modifier aucune donnee
- Ne peut pas envoyer de notifications ni approuver de verifications
- Utile pour les parties prenantes ayant besoin de visibilite sans risque

---

## Considerations de securite

| Pratique | Description |
|----------|-------------|
| Moindre privilege | Attribuez le role minimum necessaire aux responsabilites de l'utilisateur |
| Audit regulier | Examinez la liste des utilisateurs admin trimestriellement ; desactivez les comptes inutilises |
| Comptes separes | Chaque administrateur doit avoir son propre compte (pas de connexions partagees) |
| Limite de Super Admin | Maintenez le nombre de Super Admins a 2-3 maximum |
| Suspendre plutot que supprimer | Lorsqu'un admin quitte l'organisation, suspendez son compte plutot que de le supprimer (preserve la piste d'audit) |

---

## Questions frequemment posees

**Q : Puis-je creer un role personnalise ?**
R : Le systeme dispose de quatre roles fixes (Super Admin, Admin, Moderator, Viewer). Cependant, vous pouvez personnaliser les permissions de tout utilisateur individuel independamment de l'etiquette de son role.

**Q : Que se passe-t-il si je supprime l'acces a une page pour un utilisateur qui consulte actuellement cette page ?**
R : L'utilisateur verra une erreur 403 lors de sa prochaine navigation ou actualisation de page. Sa session n'est pas interrompue.

**Q : Un Super Admin peut-il se retrograder lui-meme ?**
R : Un Super Admin peut changer son propre role, mais le systeme empeche la suppression complete du dernier compte Super Admin.

**Q : Les permissions affectent-elles le manuel utilisateur ?**
R : Non. Tous les utilisateurs admin peuvent acceder au manuel utilisateur independamment de leur role ou de leurs permissions. La documentation est toujours disponible.

**Q : Puis-je voir un journal d'audit des modifications de permissions ?**
R : Les modifications de permissions sont enregistrees avec un horodatage et l'identifiant de l'administrateur qui a effectue le changement. Ceux-ci sont stockes dans les champs `updatedBy` et `updatedAt` de chaque enregistrement d'utilisateur admin.
