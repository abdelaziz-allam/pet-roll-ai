# Marche de reproduction

Le module Marche de reproduction fournit aux administrateurs une supervision du systeme de mise en relation pour l'elevage de la plateforme. Surveillez les demandes de correspondance, suivez les appariements reussis et consultez les classements de performance des eleveurs.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Onglets de navigation

La page du Marche de reproduction est organisee en deux onglets principaux :

| Onglet | Description |
|--------|-------------|
| Correspondances et demandes | Voir et gerer toutes les correspondances et demandes en attente |
| Classement des eleveurs | Tableaux des eleveurs les plus performants |

Basculez entre les onglets en cliquant sur l'en-tete de l'onglet en haut de la page.

---

## Onglet Correspondances et demandes

Cet onglet affiche toutes les correspondances de reproduction sous forme de cartes visuelles, offrant un apercu intuitif de l'activite d'elevage sur la plateforme.

### Cartes de correspondance

Chaque correspondance est representee sous forme de carte montrant deux animaux connectes par un connecteur visuel en forme de coeur.

#### Disposition de la carte

```
+------------------------------------------+
|  [Photo Animal A]  <3  [Photo Animal B]  |
|  Nom Animal A          Nom Animal B      |
|  Race                  Race              |
|  Proprietaire          Proprietaire      |
|                                          |
|  Statut: [Badge]     Publie: [Date]     |
|  Espece: [Tag]       Lieu: [Ville]      |
+------------------------------------------+
```

#### Informations de la carte

| Element | Description |
|---------|-------------|
| Photos des animaux | Photos de profil des deux animaux dans la correspondance |
| Connecteur coeur | Lien visuel entre les deux animaux (anime pour les correspondances actives) |
| Noms des animaux | Noms des deux animaux |
| Races | Informations de race pour chaque animal |
| Proprietaires | Noms des proprietaires (cliquables pour voir les profils) |
| Badge de statut | Statut actuel de la correspondance |
| Date d'annonce | Date de creation de la demande de correspondance |
| Tag d'espece | Espece des animaux |
| Localisation | Ville/pays de l'annonce |

### Statuts de correspondance

| Statut | Couleur du badge | Description |
|--------|------------------|-------------|
| En attente | Orange | Demande de correspondance envoyee, en attente de reponse |
| Accepte | Vert | Les deux parties ont accepte la correspondance |
| Refuse | Rouge | Une partie a refuse la correspondance |
| Termine | Bleu | Accouplement confirme comme realise |
| Annule | Gris | Correspondance annulee par l'une des parties |
| Expire | Gris clair | Demande expiree sans reponse |

---

## Filtres

La barre de filtres vous permet de restreindre les correspondances affichees.

### Filtre de statut

Selectionnez un ou plusieurs statuts a afficher :

1. Cliquez sur le menu deroulant **Statut**.
2. Cochez les statuts que vous souhaitez voir.
3. La grille de cartes se met a jour immediatement.

### Filtre d'espece

Filtrez les correspondances par espece d'animal :

- Toutes les especes (par defaut)
- Chien
- Chat
- Oiseau
- Lapin
- Autre

### Filtre de pays

Selectionnez un ou plusieurs pays pour filtrer par localisation de la correspondance.

### Filtre de ville

Affinez davantage en selectionnant des villes specifiques.

> **Conseil :** Utilisez Statut : Accepte + votre pays pour voir les correspondances reussies dans votre region qui pourraient necessiter l'action "Envoyer une carte de felicitations".

---

## Panneau de details

Cliquez sur n'importe quelle carte de correspondance pour ouvrir le panneau de details sur le cote droit de l'ecran.

### Section Photos des animaux

En haut du panneau, des versions plus grandes des photos des deux animaux sont affichees cote a cote avec le connecteur coeur entre elles.

- Cliquez sur l'une des photos pour la voir en taille reelle.
- Faites defiler les photos supplementaires si l'animal dispose d'une galerie.

### Informations de l'annonce

| Champ | Description |
|-------|-------------|
| ID de l'annonce | Identifiant unique de l'annonce de correspondance |
| Cree par | Quel proprietaire a initie l'annonce |
| Date de creation | Date de premiere publication de l'annonce |
| Date de correspondance | Date a laquelle la correspondance a ete proposee |
| Date de reponse | Date a laquelle la correspondance a ete acceptee/refusee (si applicable) |
| Espece | Espece des deux animaux |
| Races | Informations detaillees sur les races |
| Localisation | Details complets de localisation |
| Notes | Notes eventuelles du proprietaire de l'annonce |

### Chronologie de la correspondance

Le panneau inclut une chronologie des evenements :

1. **Annonce creee** -- Le proprietaire a publie l'annonce de reproduction de son animal
2. **Correspondance proposee** -- L'algorithme de correspondance ou une demande manuelle a initie la correspondance
3. **Correspondance consultee** -- L'autre partie a consulte la proposition de correspondance
4. **Reponse donnee** -- Acceptation/refus avec horodatage
5. **Realisation enregistree** -- Si l'accouplement a ete confirme comme realise
6. **Carte de felicitations envoyee** -- Si l'administrateur a envoye une notification de felicitations

Chaque evenement de la chronologie affiche :

- Date et heure
- Acteur (systeme, proprietaire A, proprietaire B ou administrateur)
- Description de l'evenement
- Notes supplementaires (si existantes)

> **Conseil :** La chronologie vous aide a comprendre le contexte complet d'une correspondance lors de l'investigation de litiges ou de problemes signales par les utilisateurs.

---

## Envoyer une carte de felicitations

L'action "Envoyer une carte de felicitations" permet aux administrateurs d'envoyer une notification de celebration aux deux proprietaires d'animaux lorsqu'une correspondance est acceptee ou terminee.

### Comment envoyer une carte de felicitations

1. Ouvrez le panneau de details pour une correspondance **Acceptee** ou **Terminee**.
2. Cliquez sur le bouton **Envoyer une carte de felicitations** en bas du panneau.
3. Dans le dialogue :
   - Previsualisez le message de notification (genere automatiquement avec les noms des deux animaux).
   - Ajoutez optionnellement un message de felicitations personnalise.
   - Verifiez les destinataires (les deux proprietaires d'animaux).
4. Cliquez sur **Envoyer**.

### Contenu de la carte de felicitations

- En-tete de felicitations avec les noms des deux animaux
- Photos des animaux arrangees avec des elements decoratifs
- Date et localisation de la correspondance
- Message personnalise de l'administrateur (si fourni)
- Lien vers la page de details de la correspondance

### Quand envoyer

- Apres qu'une correspondance est acceptee et que les deux parties confirment qu'elles procedent.
- Apres qu'une correspondance est marquee comme terminee.
- Une seule fois par correspondance (le bouton est desactive apres l'envoi).

> **Conseil :** Les cartes de felicitations sont un outil d'engagement communautaire. Les envoyer pour les correspondances acceptees encourage la participation a la plateforme et cree une experience positive pour les eleveurs.

---

## Onglet Classement des eleveurs

L'onglet Classement des eleveurs met en valeur les eleveurs les plus actifs et les plus performants de la plateforme.

### Podium global Top 10

En haut de l'onglet Classement, une visualisation de podium met en evidence les 10 meilleurs eleveurs toutes especes confondues.

#### Disposition du podium

```
              [1er]
        [2e]        [3e]
   [4e]  [5e]  [6e]  [7e]
      [8e]   [9e]   [10e]
```

Chaque position du podium affiche :

- Nom de l'eleveur
- Nom de l'elevage
- Photo de profil
- Nombre total de correspondances
- Taux de reussite en pourcentage

#### Calcul du score du podium

Les eleveurs sont classes par un score composite base sur :

| Facteur | Poids | Description |
|---------|-------|-------------|
| Total correspondances | 30% | Nombre de correspondances initiees ou recues |
| Taux de reussite | 40% | Pourcentage de correspondances ayant atteint le statut Accepte/Termine |
| Annonces actives | 15% | Nombre d'annonces de reproduction actuellement actives |
| Temps de reponse | 15% | Temps moyen pour repondre aux propositions de correspondance |

### Grille Top 10 par espece

Sous le podium global, une grille affiche les 10 meilleurs eleveurs pour chaque espece separement.

#### Disposition de la grille

Chaque espece a sa propre carte :

```
+-------------------+  +-------------------+  +-------------------+
|  Chiens Top 10    |  |   Chats Top 10    |  |  Oiseaux Top 10   |
| 1. Nom eleveur    |  | 1. Nom eleveur    |  | 1. Nom eleveur    |
| 2. Nom eleveur    |  | 2. Nom eleveur    |  | 2. Nom eleveur    |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Chaque entree dans la grille par espece affiche :

- Numero de classement
- Nom de l'eleveur
- Nom de l'elevage
- Nombre de correspondances pour cette espece
- Taux de reussite pour cette espece

> **Conseil :** Les classements par espece aident a identifier les eleveurs specialises qui pourraient etre d'excellents candidats pour des partenariats de plateforme ou des annonces mises en avant.

---

## Tableau de classement triable

Sous les classements visuels, un tableau de donnees complet fournit des statistiques detaillees des eleveurs.

### Colonnes du tableau

| Colonne | Triable | Description |
|---------|---------|-------------|
| Rang | Oui | Position actuelle basee sur le scoring par defaut |
| Nom de l'eleveur | Oui | Nom complet de l'eleveur |
| Elevage | Oui | Nom de l'elevage |
| Correspondances | Oui | Nombre total de correspondances (initiees + recues) |
| Annonces | Oui | Nombre d'annonces de reproduction creees |
| Taux de reussite | Oui | Pourcentage de correspondances atteignant le statut Accepte/Termine |
| Vues | Oui | Total des vues sur leurs annonces de reproduction |
| Espece | Non | Espece principale qu'ils elevent |
| Localisation | Non | Pays et ville |

### Tri du tableau

1. Cliquez sur n'importe quel en-tete de colonne triable pour trier en ordre croissant.
2. Cliquez a nouveau pour trier en ordre decroissant.
3. Un troisieme clic supprime le tri sur cette colonne.
4. Vous pouvez trier par plusieurs colonnes (maintenez Shift et cliquez).

### Interactions avec le tableau

- Cliquez sur une ligne d'eleveur pour voir son profil complet et son historique de correspondances.
- Utilisez la barre de recherche au-dessus du tableau pour trouver un eleveur specifique.
- Exportez les donnees du tableau en utilisant le bouton **Exporter CSV**.

> **Conseil :** Triez par Taux de reussite decroissant pour identifier les eleveurs qui produisent regulierement des correspondances reussies. Ces eleveurs pourraient beneficier de fonctionnalites premium ou d'un traitement accelere de verification.

---

## Comprendre les metriques de correspondance

### Calcul du taux de reussite

```
Taux de reussite = (Correspondances acceptees + Terminee) / Total correspondances x 100
```

- Seules les correspondances ou l'eleveur etait le proprietaire de l'annonce comptent dans son taux de reussite.
- Les correspondances refusees et expirees reduisent le taux de reussite.
- Les correspondances annulees sont exclues du calcul.

### Metrique des vues

Le nombre de vues represente :

- Total des vues uniques sur toutes les annonces de reproduction actives d'un eleveur.
- Ne compte pas les propres vues de l'eleveur.
- Se reinitialise par annonce (pas cumulatif entre les annonces supprimees).

### Score d'activite

Le classement global tient compte de la recence :

- Les correspondances des 90 derniers jours sont ponderees 2x.
- Les correspondances de 90 a 180 jours sont ponderees 1x.
- Les correspondances de plus de 180 jours sont ponderees 0,5x.

> **Conseil :** Un eleveur avec beaucoup de vues mais un faible taux de reussite peut avoir des annonces attractives mais etre trop selectif ou lent a repondre. Envisagez de le contacter pour comprendre son experience.

---

## Questions frequentes

**Q : Puis-je creer manuellement une correspondance entre deux animaux ?**
R : Non. Les correspondances sont creees par les proprietaires d'animaux via l'application. Les administrateurs ne peuvent que surveiller et agir sur les correspondances existantes.

**Q : Que se passe-t-il pour les donnees de correspondance quand un animal est supprime ?**
R : L'enregistrement de la correspondance est conserve a des fins historiques mais marque avec un indicateur "Animal supprime". La correspondance ne peut plus progresser.

**Q : Puis-je retirer un eleveur du classement ?**
R : Les classements sont calcules automatiquement. Pour retirer un eleveur, son compte doit etre suspendu ou sa verification revoquee, ce qui l'exclut des classements.

**Q : A quelle frequence les classements sont-ils mis a jour ?**
R : Les classements se recalculent toutes les 24 heures. L'horodatage de la derniere mise a jour est affiche en haut de l'onglet Classement.

**Q : Puis-je envoyer une carte de felicitations pour une correspondance refusee ?**
R : Non. Le bouton Envoyer une carte de felicitations n'est disponible que pour les correspondances avec le statut Accepte ou Termine.

**Q : Que faire si les deux animaux d'une correspondance appartiennent au meme proprietaire ?**
R : Le systeme empeche les correspondances entre animaux du meme proprietaire. Si vous en voyez une, cela indique un probleme d'integrite des donnees qui doit etre signale a l'equipe de developpement.
