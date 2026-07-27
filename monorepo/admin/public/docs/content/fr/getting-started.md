# Premiers pas

Bienvenue sur le portail d'administration Petfolioo. Ce guide vous accompagne lors de votre premiere connexion, explique la disposition de l'interface et vous aide a comprendre comment les controles d'acces bases sur les roles determinent ce que vous pouvez voir et faire sur la plateforme.

Le portail d'administration est une console de gestion web pour la plateforme Petfolioo dediee a la sante et a l'elevage des animaux. Depuis cette interface, les administrateurs peuvent gerer les utilisateurs, les animaux, les categories, les dossiers de sante, les programmes d'elevage et les parametres de la plateforme.

![Login Page](/docs/screenshots/login.png)

---

## Connexion

Le portail d'administration utilise l'authentification par email et mot de passe. Seuls les comptes ayant un role d'administrateur attribue peuvent acceder au portail.

### Etapes de connexion

1. Ouvrez votre navigateur et accedez a l'URL du portail d'administration.
2. La page de **Connexion** s'affiche a la route `/login`.
3. Saisissez votre **Adresse email** dans le premier champ.
4. Saisissez votre **Mot de passe** dans le second champ.
5. Cliquez sur le bouton **Se connecter**.
6. Si vos identifiants sont valides et que votre compte dispose d'un acces administrateur, vous serez redirige vers le **Tableau de bord**.

> **Remarque :** Si vous voyez une erreur "Non autorise" apres avoir saisi des identifiants valides, votre compte n'a peut-etre pas de role administrateur attribue. Contactez un super administrateur pour mettre a jour votre role.

### Reinitialisation du mot de passe

Si vous avez oublie votre mot de passe :

1. Sur la page de connexion, cliquez sur le lien **Mot de passe oublie ?** sous le champ mot de passe.
2. Saisissez l'adresse email associee a votre compte administrateur.
3. Cliquez sur **Envoyer le lien de reinitialisation**.
4. Verifiez votre boite de reception pour un message de reinitialisation de mot de passe de Petfolioo.
5. Cliquez sur le lien dans l'email pour ouvrir le formulaire de reinitialisation.
6. Saisissez et confirmez votre nouveau mot de passe.
7. Retournez a la page de connexion et connectez-vous avec vos nouveaux identifiants.

> **Conseil :** Les liens de reinitialisation de mot de passe expirent apres 1 heure. Si votre lien a expire, demandez-en un nouveau depuis la page de connexion.

---

## Comprendre la disposition du tableau de bord

Une fois connecte, le portail d'administration presente une disposition coherente sur toutes les pages.

### Navigation laterale

La barre laterale gauche contient le menu de navigation principal. Elle inclut des liens vers tous les modules principaux :

| Element du menu | Description |
|-----------------|-------------|
| Tableau de bord | Vue d'ensemble de la plateforme avec KPI et analyses |
| Utilisateurs | Gerer les utilisateurs de l'application, roles et comptes |
| Animaux | Parcourir et gerer le registre des animaux |
| Categories | Definir et gerer les categories d'animaux |
| Dossiers de sante | Consulter les certifications sanitaires |
| Elevage | Gerer les programmes d'elevage et la lignee |
| Vaccinations | Suivre les dossiers de vaccination |
| Gestation | Surveiller les suivis de gestation |
| Verifications | Examiner les demandes de verification en attente |
| Parametres | Configuration de la plateforme |

La barre laterale peut etre reduite en cliquant sur l'icone de bascule en haut pour donner plus d'espace a l'ecran aux zones de contenu.

### Barre d'en-tete

La barre d'en-tete superieure contient :

| Element | Emplacement | Fonction |
|---------|-------------|----------|
| Recherche | Centre | Recherche globale parmi les utilisateurs, animaux et dossiers |
| Cloche de notifications | Droite | Alertes pour les actions en attente et evenements systeme |
| Avatar du profil | Extreme droite | Menu du compte avec parametres de profil et deconnexion |

### Zone de contenu

La zone de contenu principale occupe l'espace restant a droite de la barre laterale et sous l'en-tete. C'est ici que les tableaux, formulaires, panneaux de details et analyses sont affiches.

---

## Acces base sur les roles

Le portail d'administration applique un controle d'acces base sur les roles (RBAC). Chaque compte administrateur se voit attribuer l'un des roles suivants, qui determine les actions disponibles.

### Definitions des roles

| Role | Niveau d'acces | Description |
|------|----------------|-------------|
| `super_admin` | Complet | Acces total a tous les modules, parametres et gestion des utilisateurs. Peut attribuer et revoquer les roles d'administrateur. |
| `admin` | Eleve | Acces a tous les modules operationnels. Peut gerer les utilisateurs, animaux et dossiers. Ne peut pas modifier les parametres de la plateforme ni attribuer des roles super_admin. |
| `moderator` | Moyen | Peut examiner et moderer le contenu, approuver les verifications et gerer les fiches d'animaux. Ne peut pas creer ou supprimer des comptes administrateur. |
| `viewer` | Lecture seule | Peut consulter toutes les donnees de tous les modules mais ne peut pas creer, modifier ou supprimer de dossiers. Utile pour l'audit et le reporting. |

### Matrice des permissions

| Action | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Voir le tableau de bord | Oui | Oui | Oui | Oui |
| Gerer les utilisateurs | Oui | Oui | Non | Non |
| Creer des comptes admin | Oui | Non | Non | Non |
| Bannir/Debannir les utilisateurs | Oui | Oui | Oui | Non |
| Gerer les animaux | Oui | Oui | Oui | Non |
| Approuver les verifications | Oui | Oui | Oui | Non |
| Gerer les categories | Oui | Oui | Non | Non |
| Modifier les parametres | Oui | Non | Non | Non |
| Voir les rapports | Oui | Oui | Oui | Oui |

> **Remarque :** Si un element de navigation n'est pas visible dans votre barre laterale, votre role n'a pas acces a ce module.

---

## Vue d'ensemble de la navigation

Voici une liste complete des modules disponibles dans le portail d'administration, organises par domaine fonctionnel.

### Modules principaux

1. **Tableau de bord** - Vue d'ensemble de la sante de la plateforme, KPI et graphiques d'analyse.
2. **Utilisateurs** - Gestion des utilisateurs de l'application incluant les profils, roles et statuts de compte.
3. **Animaux** - Le registre des animaux avec vues detaillees et outils de moderation.
4. **Categories** - Systeme de categorisation des especes/types d'animaux.

### Sante et dossiers

5. **Dossiers de sante** - Documents de certification sanitaire et leur statut de verification.
6. **Vaccinations** - Calendriers de vaccination et dossiers de suivi.
7. **Gestation** - Suivi de gestation pour les animaux reproducteurs.

### Operations de la plateforme

8. **Verifications** - File d'attente des demandes de verification d'utilisateurs et d'animaux en attente.
9. **Elevage** - Gestion des programmes d'elevage et suivi de la lignee.
10. **Parametres** - Configuration globale de la plateforme et drapeaux de fonctionnalites.

---

## Conseils pour la premiere utilisation

Lorsque vous accedez au portail d'administration pour la premiere fois, suivez ces recommandations pour vous orienter.

### Premieres etapes recommandees

1. **Verifiez votre profil** - Cliquez sur votre avatar en haut a droite et selectionnez "Profil" pour verifier que les details de votre compte sont corrects.
2. **Explorez le tableau de bord** - Familiarisez-vous avec les cartes KPI et les analyses pour comprendre les metriques actuelles de la plateforme.
3. **Verifiez les verifications en attente** - Naviguez vers le module Verifications pour voir s'il y a des elements en attente d'examen.
4. **Parcourez les utilisateurs actifs** - Visitez le module Utilisateurs et triez par "Date d'inscription" decroissante pour voir les inscriptions les plus recentes.
5. **Examinez les categories** - Assurez-vous que les categories d'animaux sont correctement configurees pour votre region.

### Recommandations de navigateur

Le portail d'administration fonctionne de maniere optimale sur les navigateurs modernes :

| Navigateur | Version minimale |
|------------|-----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Conseil :** Activez les notifications du navigateur lorsque vous y etes invite pour recevoir des alertes en temps reel concernant les verifications en attente et les evenements systeme importants.

### Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `/` | Mettre le focus sur la barre de recherche globale |
| `Esc` | Fermer les panneaux et modales ouverts |

---

## Resolution des problemes de connexion

| Probleme | Solution |
|----------|----------|
| Erreur "Identifiants invalides" | Verifiez votre email et mot de passe. Utilisez la procedure de mot de passe oublie si necessaire. |
| Message "Compte desactive" | Votre compte a ete desactive. Contactez un super administrateur. |
| La page se charge mais le formulaire de connexion est vide | Videz le cache et les cookies de votre navigateur, puis rechargez. |
| Redirige vers la connexion apres s'etre connecte | Votre session a peut-etre expire. Essayez de vous reconnecter. Si le probleme persiste, verifiez que les cookies sont actives. |

---

## Obtenir de l'aide

Si vous rencontrez des problemes non couverts dans ce guide :

1. Consultez les autres sections de ce manuel utilisateur pour une aide specifique aux modules.
2. Contactez le super administrateur de votre organisation pour les questions de roles et d'acces.
3. Pour les problemes techniques, contactez l'equipe de support de la plateforme.

---

*Suivant : [Tableau de bord](./dashboard.md) - Decouvrez les analyses et la vue d'ensemble des KPI.*
