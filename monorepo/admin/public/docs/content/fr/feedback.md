# Gestion des retours

La page Gestion des retours permet aux administrateurs de consulter, repondre et organiser les retours utilisateurs soumis via l'application mobile Petfolioo. C'est votre hub central pour comprendre les besoins des utilisateurs, suivre les bugs et gerer les suggestions de fonctionnalites.

![Feedback](/docs/screenshots/feedback.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Respond |
> | Viewer | View only |

---

## Vue d'ensemble

Lorsque vous naviguez vers la page Retours, vous voyez une rangee de statistiques en haut resumant l'etat actuel de tous les retours, suivie de zones de contenu a onglets et de controles de filtrage.

---

## Rangee de statistiques

En haut de la page, quatre cartes de metriques affichent des comptages en temps reel :

| Metrique | Description |
|----------|-------------|
| **Total** | Le nombre total d'entrees de retours recues tous statuts confondus |
| **Ouverts** | Entrees de retours n'ayant pas encore recu de reponse ou n'etant pas cloturees |
| **Repondus** | Entrees de retours pour lesquelles un administrateur a poste au moins une reponse |
| **A FAIRE** | Entrees de retours epinglees par un administrateur pour suivi |

> **Conseil :** Utilisez le compteur A FAIRE comme indicateur rapide des elements en attente necessitant une attention. Si ce nombre augmente, envisagez un triage avec votre equipe.

---

## Onglets

La page Retours est organisee en deux onglets :

### Tous les retours

1. Cliquez sur l'onglet **Tous les retours** (selectionne par defaut).
2. Cette vue affiche chaque entree de retour dans le systeme quel que soit le statut.
3. Les entrees sont triees par date, les plus recentes apparaissant en premier.
4. Utilisez les filtres (decrits ci-dessous) pour affiner les resultats.

### Liste A FAIRE

1. Cliquez sur l'onglet **Liste A FAIRE**.
2. Cette vue montre uniquement les entrees de retours epinglees comme A FAIRE par un administrateur.
3. Utilisez cet onglet lors des reunions de triage d'equipe ou des revues quotidiennes.
4. Les elements restent ici jusqu'a ce qu'ils soient desepingles.

---

## Filtres

Sous les onglets, une barre de filtres fournit plusieurs controles pour restreindre les entrees de retours affichees.

### Filtre de statut

1. Localisez le menu deroulant **Statut** sur la barre de filtres.
2. Cliquez pour developper et selectionnez l'une des options suivantes :
   - **Tous** -- Affiche les retours dans n'importe quel statut
   - **Ouvert** -- Affiche uniquement les retours non resolus
   - **Repondu** -- Affiche les retours avec au moins une reponse administrateur
   - **Cloture** -- Affiche les retours marques comme resolus
3. La liste se met a jour immediatement lors de la selection.

### Filtre de type

1. Localisez le menu deroulant **Type** sur la barre de filtres.
2. Selectionnez la categorie de retour que vous souhaitez voir :
   - **Tous les types** -- Aucun filtre de type applique
   - **Bug** -- Problemes ou defauts signales par les utilisateurs
   - **Suggestion** -- Demandes de fonctionnalites et idees d'amelioration
   - **General** -- Commentaires ou questions generaux
3. Chaque entree de retour est etiquetee avec son badge de type pour une identification visuelle rapide.

### Filtre de plage de dates

1. Cliquez sur le selecteur de **Plage de dates** sur la barre de filtres.
2. Selectionnez une date de debut et une date de fin depuis le calendrier.
3. Seuls les retours soumis dans la plage selectionnee seront affiches.
4. Pour effacer le filtre de date, cliquez sur l'icone d'effacement du selecteur de dates.

### Bascule A FAIRE uniquement

1. Localisez l'interrupteur **A FAIRE uniquement** sur la barre de filtres.
2. Activez-le pour afficher uniquement les entrees de retours epinglees comme A FAIRE.
3. Cela fournit une alternative rapide au passage a l'onglet Liste A FAIRE tout en restant dans la vue Tous les retours avec d'autres filtres appliques.

> **Conseil :** Combinez les filtres pour des requetes puissantes. Par exemple, definissez Type sur "Bug" et Statut sur "Ouvert" pour voir tous les rapports de bugs non resolus.

---

## Entrees de retours

Chaque entree de retour dans la liste affiche les informations suivantes :

| Champ | Description |
|-------|-------------|
| **Info utilisateur** | Nom d'affichage, email et avatar de l'utilisateur soumetteur |
| **Message** | Le texte complet du retour soumis par l'utilisateur |
| **Badge de type** | Un badge colore indiquant Bug (rouge), Suggestion (bleu) ou General (gris) |
| **Date** | La date et l'heure de soumission du retour |
| **Statut** | Indicateur de statut actuel (Ouvert, Repondu ou Cloture) |
| **Epingle A FAIRE** | Une icone d'epingle indiquant si cette entree est marquee pour suivi |

### Consulter une entree de retour

1. Localisez l'entree de retour dans la liste.
2. Cliquez sur la ligne de l'entree ou l'icone d'expansion pour ouvrir la vue detaillee.
3. La vue detaillee montre le message complet, les informations utilisateur et les reponses administrateur precedentes.

---

## Repondre a un retour

Les administrateurs peuvent repondre aux retours utilisateurs. Les reponses sont visibles par l'utilisateur dans l'application mobile.

### Etapes pour repondre

1. Ouvrez l'entree de retour a laquelle vous souhaitez repondre.
2. Localisez la zone de texte **Repondre** en bas de la vue detaillee.
3. Tapez votre message de reponse dans la zone de texte.
4. Relisez votre message pour la clarte et le professionnalisme.
5. Cliquez sur le bouton **Envoyer la reponse**.
6. Un message de confirmation apparait indiquant que la reponse a ete envoyee avec succes.
7. Le statut du retour passe automatiquement a **Repondu**.

> **Important :** Votre reponse sera visible par l'utilisateur dans l'application mobile Petfolioo. Assurez-vous que votre reponse est utile, professionnelle et repond directement a la preoccupation de l'utilisateur.

### Bonnes pratiques pour les reponses

- Reconnaissez le retour de l'utilisateur avant de fournir une solution.
- Si le probleme est un bug connu, informez l'utilisateur qu'il est en cours de resolution.
- Pour les suggestions, remerciez l'utilisateur et expliquez si la fonctionnalite est a l'etude.
- Evitez le jargon technique que les utilisateurs finaux pourraient ne pas comprendre.
- Gardez les reponses concises mais completes.

---

## Reponses administrateur precedentes

Lorsque vous consultez une entree de retour qui a recu des reponses, toutes les reponses administrateur precedentes sont affichees en ligne par ordre chronologique.

1. Ouvrez la vue detaillee de l'entree de retour.
2. Faites defiler pour voir le fil de conversation.
3. Chaque reponse affiche :
   - Le nom de l'administrateur qui a poste la reponse
   - La date et l'heure de la reponse
   - Le texte complet de la reponse
4. Les nouvelles reponses apparaissent en bas du fil.

> **Conseil :** Consultez les reponses precedentes avant d'en poster une nouvelle pour eviter les reponses en double ou contradictoires.

---

## Cloturer un retour

Lorsqu'un element de retour a ete entierement traite, vous pouvez le cloturer pour indiquer qu'aucune action supplementaire n'est necessaire.

### Etapes pour cloturer

1. Ouvrez l'entree de retour que vous souhaitez cloturer.
2. Cliquez sur le bouton **Cloturer** (ou selectionnez "Cloturer" dans le menu d'actions).
3. Un dialogue de confirmation apparait vous demandant de confirmer.
4. Cliquez sur **Confirmer** pour cloturer le retour.
5. Le statut de l'entree passe a **Cloture**.
6. Les entrees cloturees restent dans le systeme et peuvent etre consultees en definissant le filtre de statut sur "Cloture".

> **Remarque :** Cloturer un retour ne le supprime pas. Vous pouvez toujours consulter les entrees cloturees et les rouvrir si necessaire.

---

## Epingler / Desepingler comme A FAIRE

La fonctionnalite d'epingle A FAIRE permet aux administrateurs de marquer des entrees de retours specifiques pour suivi. Les elements epingles apparaissent dans l'onglet Liste A FAIRE et contribuent au compteur A FAIRE dans la rangee de statistiques.

### Epingler un retour comme A FAIRE

1. Localisez l'entree de retour que vous souhaitez marquer pour suivi.
2. Cliquez sur l'icone **Epingler** (punaise) sur la ligne de l'entree, ou ouvrez la vue detaillee et cliquez sur **Epingler comme A FAIRE**.
3. L'entree est immediatement ajoutee a la Liste A FAIRE.
4. Le compteur A FAIRE dans la rangee de statistiques augmente de un.
5. Une icone d'epingle apparait sur l'entree indiquant son statut A FAIRE.

### Desepingler un retour

1. Localisez l'entree de retour epinglee (utilisez l'onglet Liste A FAIRE ou le filtre A FAIRE uniquement).
2. Cliquez sur l'icone **Desepingler** sur la ligne de l'entree, ou ouvrez la vue detaillee et cliquez sur **Retirer des A FAIRE**.
3. L'entree est retiree de la Liste A FAIRE.
4. Le compteur A FAIRE dans la rangee de statistiques diminue de un.

### Quand utiliser les epingles A FAIRE

- Un element de retour necessite une investigation avant de repondre.
- Vous avez besoin de l'avis d'un autre membre de l'equipe avant de repondre.
- Le probleme est lie a une prochaine mise a jour et doit etre suivi.
- Une suggestion doit etre discutee lors de la prochaine reunion de planification.

---

## Resume du flux de travail

Le flux de travail recommande pour traiter les retours est :

1. **Examiner** -- Verifiez la rangee de statistiques quotidiennement pour les nouveaux retours ouverts.
2. **Trier** -- Utilisez les filtres pour prioriser les bugs par rapport aux suggestions.
3. **Epingler** -- Marquez les elements complexes comme A FAIRE pour un suivi ulterieur.
4. **Repondre** -- Repondez immediatement aux elements simples.
5. **Collaborer** -- Utilisez l'onglet Liste A FAIRE lors des revues d'equipe.
6. **Cloturer** -- Marquez les elements resolus comme clotures apres avoir confirme que le probleme de l'utilisateur est traite.

---

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Entree` | Ouvrir l'entree de retour selectionnee |
| `R` | Mettre le focus sur la zone de texte de reponse (quand l'entree est ouverte) |
| `T` | Basculer l'epingle A FAIRE sur l'entree selectionnee |
| `Echap` | Fermer la vue detaillee |

---

## Resolution de problemes

| Probleme | Solution |
|----------|----------|
| La reponse ne s'envoie pas | Verifiez votre connexion reseau et reessayez. Assurez-vous que le message n'est pas vide. |
| Les filtres ne se mettent pas a jour | Rafraichissez la page. Si le probleme persiste, videz le cache du navigateur. |
| Le compteur A FAIRE est incorrect | Le compteur se rafraichit au chargement de la page. Naviguez ailleurs et revenez pour mettre a jour. |
| Impossible de voir les retours clotures | Definissez le filtre de Statut sur "Cloture" ou "Tous" pour voir les entrees cloturees. |

---

## Pages associees

- [Notifications](./notifications.md) -- Envoyer des annonces aux utilisateurs
- [Administrateurs](./admin-users.md) -- Gerer qui peut repondre aux retours
- [Parametres](./settings.md) -- Configurer les preferences systeme
