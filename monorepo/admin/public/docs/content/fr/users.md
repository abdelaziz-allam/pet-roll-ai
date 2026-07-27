# Utilisateurs de l'application

Le module Utilisateurs de l'application fournit une gestion complete de tous les comptes utilisateurs sur la plateforme Petfolioo. Les administrateurs peuvent consulter les profils utilisateurs, creer de nouveaux comptes, modifier les details, attribuer des roles et prendre des mesures de moderation. Ce module est accessible aux utilisateurs ayant les roles `super_admin` ou `admin`.

![App Users](/docs/screenshots/users.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Ban, Delete, Export |
> | Admin | View, Create, Edit, Ban |
> | Moderator | View, Ban |
> | Viewer | View only |

---

## Tableau de la liste des utilisateurs

Le tableau de la liste des utilisateurs affiche tous les utilisateurs enregistres de la plateforme avec les informations cles visibles en un coup d'oeil.

### Colonnes du tableau

| Colonne | Description | Triable |
|---------|-------------|:-------:|
| Avatar | Photo de profil de l'utilisateur (miniature circulaire) | Non |
| Nom | Nom d'affichage | Oui |
| Email | Adresse email enregistree | Oui |
| Role | Role attribue sur la plateforme (utilisateur, moderateur, admin) | Oui |
| Statut | Statut du compte (Actif, En attente, Banni) | Oui |
| Eleveur verifie | Badge indiquant le statut d'eleveur verifie | Oui |
| Nombre d'animaux | Nombre d'animaux enregistres par cet utilisateur | Oui |
| Date d'inscription | Date de creation du compte | Oui |

### Indicateurs de statut

| Statut | Couleur du badge | Signification |
|--------|------------------|---------------|
| Actif | Vert | Le compte est entierement fonctionnel |
| En attente | Orange | Verification de l'email non completee |
| Banni | Rouge | Compte suspendu par un administrateur |

### Badge Eleveur verifie

| Indicateur | Signification |
|-----------|---------------|
| Badge coche bleue | L'utilisateur a complete la verification d'eleveur et est confirme |
| Pas de badge | L'utilisateur n'a pas demande ou recu la verification d'eleveur |
| Icone horloge | La demande de verification d'eleveur est en attente d'examen |

### Navigation dans le tableau

1. **Triez** en cliquant sur n'importe quel en-tete de colonne triable. Cliquez a nouveau pour inverser l'ordre.
2. **Recherchez** en utilisant la barre de recherche au-dessus du tableau pour trouver des utilisateurs par nom ou email.
3. **Filtrez** en utilisant les menus deroulants de statut et de role pour affiner les resultats.
4. **Paginez** en utilisant les controles en bas (10, 20, 50 entrees par page).

> **Conseil :** Combinez la barre de recherche avec les filtres de statut pour trouver rapidement des utilisateurs specifiques. Par exemple, recherchez "jean" avec le statut "Banni" pour trouver les utilisateurs bannis nommes Jean.

---

## Consulter les details d'un utilisateur

Le panneau de details utilisateur offre une vue complete du profil et de l'activite d'un utilisateur.

### Ouverture du panneau de details

1. Cliquez sur n'importe quelle ligne du tableau de la liste des utilisateurs.
2. Le panneau de details glisse depuis le cote droit de l'ecran.
3. Le panneau contient plusieurs sections organisees verticalement.

### Sections du panneau de details

| Section | Contenu |
|---------|---------|
| En-tete du profil | Grand avatar, nom d'affichage, email, badge de role, badge de statut |
| Informations du compte | Date d'inscription, derniere connexion, statut de verification email, fournisseur d'authentification |
| Details personnels | Numero de telephone, fuseau horaire, pays, ville |
| Statut d'eleveur | Statut de verification, date de candidature, documents soumis |
| Resume des animaux | Nombre d'animaux enregistres avec liens rapides vers chacun |
| Journal d'activite | Actions recentes effectuees par cet utilisateur sur la plateforme |

### En-tete du profil

Le haut du panneau affiche :

- **Avatar** en taille reelle (ou silhouette par defaut si aucun n'est telecharge)
- **Nom d'affichage** en texte large
- **Email** sous le nom
- **Badge de role** code par couleur selon le niveau de permission
- **Badge de statut** montrant le statut actuel du compte

### Champs d'information du compte

| Champ | Description | Exemple |
|-------|-------------|---------|
| ID Utilisateur | Identifiant systeme unique | "usr_a1b2c3d4" |
| Date d'inscription | Date de creation du compte | "2023-01-15 09:30 UTC" |
| Derniere connexion | Horodatage de la connexion la plus recente | "2024-07-20 14:22 UTC" |
| Email verifie | Si l'email a ete confirme | "Oui" / "Non" |
| Fournisseur d'authentification | Methode d'authentification utilisee | "Email/Mot de passe" ou "Google" |
| UID Firebase | Identifiant utilisateur Firebase Authentication | "Abc123Def456" |

---

## Creer un nouvel utilisateur

Les administrateurs peuvent creer des comptes utilisateurs directement depuis le portail d'administration. Comme la plateforme utilise Firebase Authentication, aucun mot de passe n'est defini lors de la creation - les utilisateurs recevront un email pour definir leur propre mot de passe.

### Etapes pour creer un utilisateur

1. Cliquez sur le bouton **Creer un utilisateur** dans le coin superieur droit de la page Utilisateurs.
2. Une modale ou un formulaire de creation apparait.
3. Remplissez les champs obligatoires :

| Champ | Obligatoire | Description |
|-------|:----------:|-------------|
| Nom d'affichage | Oui | Le nom complet ou le pseudonyme choisi par l'utilisateur |
| Email | Oui | Une adresse email valide (doit etre unique sur la plateforme) |

4. Cliquez sur **Creer** pour soumettre le formulaire.
5. Le systeme va :
   - Creer un enregistrement Firebase Authentication
   - Envoyer un email de bienvenue a l'utilisateur avec un lien pour definir son mot de passe
   - Creer le profil utilisateur dans la base de donnees de la plateforme
   - Attribuer le role par defaut "utilisateur"
6. Le nouvel utilisateur apparait dans le tableau avec le statut "En attente" jusqu'a ce qu'il verifie son email.

### Regles de validation

| Champ | Regle |
|-------|-------|
| Nom d'affichage | 2-100 caracteres, ne peut pas etre vide |
| Email | Doit etre un format d'email valide, ne doit pas deja exister dans le systeme |

> **Remarque :** Aucun champ de mot de passe n'est necessaire. Firebase Authentication gere la definition du mot de passe via l'email de bienvenue envoye a l'utilisateur. Cela garantit que l'utilisateur choisit son propre mot de passe securise.

> **Conseil :** Si vous devez creer un utilisateur qui doit avoir des permissions elevees, creez-le d'abord avec les parametres par defaut, puis changez son role separement (voir Changement de role ci-dessous).

---

## Modifier un utilisateur

Les administrateurs peuvent modifier les details du profil utilisateur si necessaire. Cela est couramment utilise pour corriger des informations ou mettre a jour des details pour le compte d'un utilisateur.

### Etapes pour modifier un utilisateur

1. Ouvrez le panneau de details de l'utilisateur en cliquant sur sa ligne dans le tableau.
2. Cliquez sur le bouton **Modifier** (icone crayon) dans l'en-tete du panneau.
3. Le panneau passe en mode edition avec des champs de formulaire modifiables.
4. Modifiez l'un des champs disponibles :

| Champ | Modifiable | Notes |
|-------|:----------:|-------|
| Nom d'affichage | Oui | Le nom public de l'utilisateur |
| Telephone | Oui | Format international recommande (ex. : +971501234567) |
| Fuseau horaire | Oui | Menu deroulant des fuseaux horaires IANA (ex. : Asia/Dubai) |
| Pays | Oui | Menu deroulant de tous les pays |
| Ville | Oui | Champ texte, met a jour les suggestions selon le pays |
| Email | Non | Ne peut pas etre modifie (utilise comme identifiant de connexion) |
| ID Utilisateur | Non | Genere par le systeme, immuable |

5. Cliquez sur **Enregistrer les modifications** pour appliquer vos modifications.
6. Une notification de succes confirme la mise a jour.
7. Le panneau revient en mode affichage avec les informations mises a jour.

### Historique des modifications

Toutes les modifications effectuees via le portail d'administration sont enregistrees :

| Champ du journal | Description |
|------------------|-------------|
| Horodatage | Quand la modification a ete effectuee |
| Administrateur | Quel administrateur a effectue la modification |
| Champ modifie | Quel champ a ete modifie |
| Ancienne valeur | La valeur precedente |
| Nouvelle valeur | La valeur mise a jour |

> **Important :** Les modifications apportees aux profils utilisateurs sont visibles par l'utilisateur. Il verra les informations mises a jour dans son application. Envisagez de notifier l'utilisateur si vous effectuez des modifications en son nom.

---

## Changement de role

Les changements de role determinent le niveau d'acces d'un utilisateur au sein de la plateforme et de ses applications.

### Roles disponibles

| Role | Description | Capacites |
|------|-------------|-----------|
| user | Utilisateur standard de la plateforme | Peut gerer ses propres animaux, participer aux programmes d'elevage, consulter les annonces |
| moderator | Moderateur de la communaute | Toutes les capacites utilisateur plus la possibilite d'examiner et signaler du contenu |
| admin | Administrateur de la plateforme | Toutes les capacites de moderateur plus l'acces au portail d'administration |

### Etapes pour changer le role d'un utilisateur

1. Ouvrez le panneau de details de l'utilisateur en cliquant sur sa ligne.
2. Localisez la section **Role** dans le panneau.
3. Cliquez sur le bouton **Changer le role** (ou le badge de role actuel).
4. Une modale de selection de role apparait avec :
   - Des boutons radio pour chaque role disponible
   - Un texte descriptif expliquant les permissions de chaque role
   - Une case a cocher de confirmation reconnaissant le changement
5. Selectionnez le nouveau role.
6. Lisez la description du role pour confirmer qu'il est approprie.
7. Cochez la **case de confirmation** ("Je comprends que cela changera le niveau d'acces de l'utilisateur").
8. Cliquez sur **Confirmer le changement de role**.
9. Le role de l'utilisateur est mis a jour immediatement.

### Restrictions de changement de role

| Votre role | Peut attribuer |
|------------|---------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Ne peut pas changer les roles |
| viewer | Ne peut pas changer les roles |

> **Important :** Promouvoir un utilisateur au role "admin" lui donne acces au portail d'administration. Ne faites cela que pour les membres de l'equipe de confiance qui ont besoin d'un acces administratif.

> **Remarque :** Changer un utilisateur de "admin" a "user" revoque immediatement son acces au portail d'administration. S'il est actuellement connecte au portail, sa session se terminera lors de la prochaine navigation de page.

---

## Bannir/Debannir un utilisateur

Bannir un utilisateur suspend son compte, l'empechant de se connecter a l'application ou d'acceder a toute fonctionnalite de la plateforme.

### Bannir un utilisateur

1. Ouvrez le panneau de details de l'utilisateur.
2. Faites defiler jusqu'a la section **Actions** en bas du panneau.
3. Cliquez sur le bouton **Bannir l'utilisateur** (affiche en rouge).
4. Une modale de confirmation apparait avec :
   - Le nom et l'email de l'utilisateur pour confirmation
   - Un champ texte **Motif** (obligatoire)
   - Un selecteur de **Duree** (permanent, 7 jours, 30 jours, 90 jours)
5. Saisissez un motif clair et professionnel pour le bannissement.
6. Selectionnez la duree du bannissement.
7. Cliquez sur **Confirmer le bannissement**.

### Effets du bannissement

| Effet | Description |
|-------|-------------|
| Connexion bloquee | L'utilisateur ne peut pas se connecter a l'application mobile |
| Profil masque | Le profil de l'utilisateur n'est pas visible par les autres utilisateurs |
| Animaux retires | Tous les animaux de cet utilisateur sont masques des annonces |
| Notifications | L'utilisateur recoit un email expliquant le bannissement avec le motif fourni |
| Sessions actives | Toutes les sessions en cours sont terminees immediatement |

### Directives pour le motif de bannissement

| Directive | Exemple |
|-----------|---------|
| Etre specifique | "Plusieurs annonces d'elevage frauduleuses signalees et confirmees" |
| Faire reference a la politique | "Violation des Conditions d'utilisation section 4.2 concernant les annonces authentiques" |
| Eviter le langage vague | NE PAS ecrire "mauvais comportement" - etre specifique sur ce qui s'est passe |
| Rester professionnel | Le motif est envoye directement a l'utilisateur |

> **Important :** Le motif de bannissement est communique a l'utilisateur par email et notification dans l'application. Il doit etre factuel, specifique et professionnel.

### Debannir un utilisateur

1. Utilisez le filtre **Statut** pour selectionner "Banni" et trouver les utilisateurs bannis.
2. Cliquez sur la ligne de l'utilisateur banni pour ouvrir son panneau de details.
3. Le panneau affiche une carte **Informations de bannissement** avec :
   - Date de bannissement
   - Administrateur ayant banni
   - Motif du bannissement
   - Duree / expiration du bannissement
4. Cliquez sur le bouton **Debannir l'utilisateur** (affiche en vert).
5. Une modale de confirmation apparait.
6. Saisissez optionnellement une note expliquant pourquoi le bannissement est leve.
7. Cliquez sur **Confirmer le debannissement**.
8. Le statut de l'utilisateur revient a "Actif" et il retrouve un acces complet a la plateforme.
9. L'utilisateur recoit une notification indiquant que son compte a ete restaure.

### Historique de bannissement

Chaque action de bannissement et de debannissement est enregistree dans l'historique de l'utilisateur :

| Champ | Description |
|-------|-------------|
| Date de bannissement | Quand le bannissement a ete applique |
| Date de debannissement | Quand le bannissement a ete leve (si applicable) |
| Administrateur | Quel administrateur a pris l'action |
| Motif | Le motif declare pour le bannissement |
| Duree | Combien de temps le bannissement devait durer |
| Resolution | Comment il s'est termine (debannissement manuel, expiration, appel) |

---

## Recherche et filtrage des utilisateurs

### Barre de recherche

La barre de recherche en haut de la page Utilisateurs prend en charge :

| Type de recherche | Exemple | Correspondances |
|-------------------|---------|-----------------|
| Recherche par nom | "Sarah" | Tous les utilisateurs avec "Sarah" dans leur nom d'affichage |
| Recherche par email | "gmail.com" | Tous les utilisateurs avec des adresses Gmail |
| Correspondance partielle | "pet" | Utilisateurs nommes "Peter", "Petrov", etc. |

### Filtres deroulants

| Filtre | Options |
|--------|---------|
| Role | Tous, Utilisateur, Moderateur, Admin |
| Statut | Tous, Actif, En attente, Banni |
| Eleveur verifie | Tous, Verifie, Non verifie, En attente |

### Combinaison recherche et filtres

1. Saisissez du texte dans la barre de recherche ET selectionnez des valeurs de filtre simultanement.
2. Les resultats doivent correspondre a TOUS les criteres (logique ET).
3. Effacez les filtres individuels en cliquant sur leur bouton X, ou effacez tout avec le bouton **Reinitialiser**.

---

## Exportation des donnees utilisateurs

Pour exporter les donnees utilisateurs pour le reporting ou l'analyse :

1. Appliquez les filtres souhaites.
2. Cliquez sur le bouton **Exporter** dans la zone superieure droite.
3. Selectionnez le format : **CSV** ou **Excel**.
4. Choisissez la portee : **Vue filtree actuelle** ou **Tous les utilisateurs**.
5. Le telechargement demarre automatiquement.

### Champs exportes

| Champ | Inclus | Notes |
|-------|:------:|-------|
| Nom d'affichage | Oui | |
| Email | Oui | |
| Role | Oui | |
| Statut | Oui | |
| Pays | Oui | |
| Ville | Oui | |
| Nombre d'animaux | Oui | |
| Date d'inscription | Oui | |
| Derniere connexion | Oui | |
| Telephone | Non | Exclu pour la confidentialite |

> **Remarque :** Les numeros de telephone et les informations personnelles detaillees sont exclus des exportations par defaut pour se conformer aux exigences de protection des donnees.

---

*Precedent : [Registre des animaux](./pets.md) | Suivant : [Categories d'animaux](./categories.md)*
