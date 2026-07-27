# Prise en main : Super Admin

Bienvenue sur le portail d'administration Petfolioo. En tant que Super Admin, vous disposez d'un acces illimite a chaque page, action et option de configuration de la plateforme. Ce guide couvre votre premier jour, vos flux de travail quotidiens et vos responsabilites.

---

## Pages disponibles

| Page | Actions disponibles |
|------|-------------------|
| Tableau de bord | View KPI et analyses de la plateforme |
| Utilisateurs de l'app | View, Create, Edit, Ban, Delete, Export |
| Animaux | View, Edit, Delete |
| Categories d'animaux | View, Create, Edit, Delete |
| Verification | View, Approve, Reject |
| Reproduction | View, Edit, Delete, Moderate |
| Certificats de sante | View, Approve, Reject |
| Analyses vaccinales | View, Export |
| Retours utilisateurs | View, Respond, Delete |
| Blog | View, Create, Edit, Delete |
| Notifications | View, Send, Delete |
| Analyses | View, Export |
| Utilisateurs admin | View, Create, Edit, Delete, Manage Permissions |
| Parametres | View, Edit |

Vous avez acces a tout. Aucune page n'est masquee dans votre barre laterale.

---

## Premieres etapes apres la connexion initiale

1. **Verifiez votre profil** - Cliquez sur votre avatar en haut a droite et confirmez que les details de votre compte sont corrects.
2. **Configurez les parametres de la plateforme** - Accedez aux Parametres et passez en revue la configuration globale (branding, feature flags, valeurs par defaut des notifications).
3. **Creez des comptes administrateurs supplementaires** - Rendez-vous dans Utilisateurs admin et creez des comptes pour les membres de votre equipe avec les roles appropries.
4. **Initialisez les categories d'animaux** - Visitez Categories d'animaux et assurez-vous que la taxonomie des especes et races est configuree pour votre region.
5. **Consultez le Tableau de bord** - Familiarisez-vous avec les indicateurs KPI pour savoir a quoi ressemble la situation normale.

---

## Liste de controle quotidienne

- [ ] Verifier le Tableau de bord pour la sante de la plateforme et les anomalies
- [ ] Passer en revue les verifications en attente dans la file de Verification
- [ ] Parcourir les Retours utilisateurs pour les plaintes urgentes ou les signalements de bugs
- [ ] Verifier la liste des Utilisateurs admin pour les demandes d'acces ou les comptes suspects
- [ ] Consulter les Analyses pour les tendances de croissance et d'engagement
- [ ] Surveiller les annonces de Reproduction pour les signalements de moderation
- [ ] Verifier les notifications envoyees par les autres administrateurs
- [ ] Auditer periodiquement les Parametres pour detecter les modifications inattendues

---

## Responsabilites cles

### Configuration du systeme
Vous etes le seul role pouvant acceder a la page Parametres. Cela inclut le branding de la plateforme, les bascules de fonctionnalites, les cles API et les modeles de notifications. Passez-les en revue chaque trimestre ou lors du lancement de nouvelles fonctionnalites.

### Gestion des utilisateurs
Vous seul pouvez creer, modifier et supprimer des comptes administrateurs. Lors de l'integration de nouveaux membres, attribuez le role minimum necessaire (preferez Moderator ou Viewer sauf si un acces Admin est reellement justifie).

### Surveillance de la securite
- Limitez le nombre de comptes Super Admin a 2-3 maximum.
- Passez en revue l'activite des utilisateurs admin chaque trimestre et suspendez les comptes inutilises.
- Vous etes le seul role pouvant supprimer des utilisateurs de l'app et exporter les donnees utilisateur ; traitez personnellement les demandes RGPD et de donnees.

### Point d'escalade
Les autres roles feront remonter vers vous les actions en dehors de leurs permissions : suppression d'utilisateurs, export de donnees, modification des parametres ou gestion des comptes admin.

---

## Conseils pour deleguer le travail

| Tache | Deleguer a |
|------|-------------|
| Revues de verification quotidiennes | Admin ou Moderator |
| Moderation de la reproduction | Admin ou Moderator |
| Corrections de donnees animaux | Admin ou Moderator |
| Envoi de notifications plateforme | Admin |
| Suivi et rapports d'analyses | Admin ou Viewer |
| Bannissement d'utilisateurs problematiques | Admin ou Moderator |
| Gestion du contenu du blog | Admin |

Reservez votre temps aux taches que vous seul pouvez effectuer : modifications des parametres, gestion des utilisateurs admin, exports de donnees et audits de securite. Plus vous deleguez le travail operationnel, plus vous disposez de capacite pour la supervision strategique.

---

## Obtenir de l'aide

En tant que role disposant du plus haut niveau de privileges, votre canal de support est la documentation technique de la plateforme et l'equipe de developpement. Pour les questions operationnelles, consultez les autres pages de ce manuel utilisateur.

---

*Suivant : [Roles et permissions](./roles-permissions.md) - Detail complet de ce que chaque role peut faire.*
