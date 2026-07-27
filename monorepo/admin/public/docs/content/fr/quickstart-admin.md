# Prise en main : Admin

Bienvenue sur le portail d'administration Petfolioo. En tant qu'Admin, vous disposez d'un large acces operationnel pour gerer les utilisateurs, les animaux, le contenu et les activites quotidiennes de la plateforme. Ce guide couvre ce que vous pouvez faire, votre flux de travail quotidien et quand escalader vers un Super Admin.

---

## Pages disponibles

| Page | Actions disponibles |
|------|-------------------|
| Tableau de bord | View KPI et analyses de la plateforme |
| Utilisateurs de l'app | View, Create, Edit, Ban |
| Animaux | View, Edit, Delete |
| Categories d'animaux | View, Create, Edit, Delete |
| Verification | View, Approve, Reject |
| Reproduction | View, Edit, Delete, Moderate |
| Certificats de sante | View, Approve, Reject |
| Analyses vaccinales | View, Export |
| Retours utilisateurs | View, Respond |
| Blog | View, Create, Edit, Delete |
| Notifications | View, Send |
| Analyses | View, Export |

Pages **absentes** de votre barre laterale : Utilisateurs admin, Parametres.

---

## Premieres etapes apres l'obtention de l'acces

1. **Connectez-vous et verifiez votre profil** - Cliquez sur votre avatar en haut a droite pour confirmer que votre nom et votre email sont corrects.
2. **Explorez le Tableau de bord** - Comprenez l'etat actuel de la plateforme : utilisateurs actifs, verifications en attente, activite recente.
3. **Consultez la file de Verification** - Voyez s'il y a des verifications d'eleveurs ou d'animaux en attente de traitement.
4. **Parcourez les Utilisateurs de l'app** - Triez par date d'inscription recente pour voir les nouvelles inscriptions et vous familiariser avec la base d'utilisateurs.
5. **Consultez les Retours utilisateurs** - Verifiez s'il y a des plaintes ouvertes necessitant une reponse.

---

## Liste de controle quotidienne

- [ ] Ouvrir le Tableau de bord et verifier les indicateurs KPI pour detecter toute anomalie
- [ ] Traiter les elements en attente dans la file de Verification (approuver ou rejeter avec motif)
- [ ] Verifier les annonces de Reproduction pour les nouvelles entrees ou celles signalees necessitant une moderation
- [ ] Passer en revue les Retours utilisateurs et repondre aux problemes urgents
- [ ] Surveiller les Utilisateurs de l'app pour les comptes necessitant un bannissement ou une investigation
- [ ] Verifier les Certificats de sante pour les revues de certification en attente
- [ ] Envoyer des notifications plateforme en cas d'annonces ou de fenetres de maintenance
- [ ] Consulter les Analyses pour les tendances d'engagement et exporter les rapports si necessaire

---

## Responsabilites cles

### Operations
Vous etes l'operateur principal de la plateforme. Les revues de verification, la moderation de la reproduction et la gestion des utilisateurs sont vos taches quotidiennes essentielles. Maintenez la file de verification a moins de 24 heures d'anciennete autant que possible.

### Gestion du contenu
Vous gerez le Blog, les Categories d'animaux et les donnees animaux. Assurez-vous que les articles de blog sont exacts, que les categories refletent les especes prises en charge et que les profils d'animaux contiennent des informations correctes.

### Support utilisateur
Lorsque les utilisateurs de l'app signalent des problemes via les Retours utilisateurs, vous etes responsable de la reponse. Vous pouvez modifier les comptes utilisateurs, bannir les utilisateurs abusifs et corriger les donnees animaux en leur nom.

### Gestion des notifications
Vous pouvez envoyer des notifications a l'ensemble de la plateforme ou ciblees. Utilisez cela pour les fenetres de maintenance, les annonces de fonctionnalites ou les changements de politique importants.

---

## Ce que vous ne pouvez pas faire

| Action | Qui peut |
|--------|---------|
| Delete des utilisateurs de l'app | Super Admin uniquement |
| Export des donnees utilisateur | Super Admin uniquement |
| Delete des notifications | Super Admin uniquement |
| Acceder ou modifier les Parametres | Super Admin uniquement |
| Create/Edit/Delete des comptes admin | Super Admin uniquement |
| Manage Permissions des roles | Super Admin uniquement |

---

## Quand escalader

Contactez votre Super Admin lorsque vous devez :

- Supprimer definitivement un compte utilisateur (vous pouvez bannir, mais pas supprimer)
- Exporter des donnees utilisateur pour des demandes de conformite ou juridiques
- Modifier les parametres de la plateforme ou les feature flags
- Accorder un acces administrateur a un nouveau membre de l'equipe
- Supprimer une notification envoyee par erreur
- Gerer un incident de securite necessitant des modifications au niveau du systeme

---

## Obtenir de l'aide

Pour des conseils specifiques a un module, consultez les autres pages de ce manuel utilisateur. Pour les problemes d'acces ou de permissions, contactez le Super Admin de votre organisation.

---

*Suivant : [Roles et permissions](./roles-permissions.md) - Detail complet de ce que chaque role peut faire.*
