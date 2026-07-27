# Tableau de bord

Le tableau de bord est le premier ecran que vous voyez apres vous etre connecte au portail d'administration Petfolioo. Il fournit une vue d'ensemble en temps reel de la sante de la plateforme grace a des indicateurs cles de performance (KPI), des graphiques interactifs et des flux d'activite recente. Utilisez le tableau de bord pour surveiller les tendances de croissance, identifier les domaines necessitant une attention particuliere et suivre l'engagement de la plateforme en un coup d'oeil.

![Dashboard](/docs/screenshots/dashboard.png)

---

## Cartes KPI

En haut du tableau de bord, quatre cartes de synthese affichent les metriques les plus importantes de la plateforme. Chaque carte montre le total actuel et un indicateur de variation en pourcentage par rapport a la periode precedente.

### Definitions des cartes

| Carte | Metrique | Description |
|-------|----------|-------------|
| Total Utilisateurs | Nombre d'utilisateurs inscrits | Tous les utilisateurs ayant cree un compte sur la plateforme |
| Total Animaux | Nombre d'animaux enregistres | Tous les animaux ajoutes au registre quel que soit leur statut |
| Verifications en attente | Elements en attente d'examen | Demandes de verification non encore approuvees ou rejetees |
| Annonces actives | Annonces actuellement visibles | Animaux marques comme disponibles pour l'elevage ou l'adoption |

### Pourcentage de croissance

Chaque carte KPI inclut un indicateur de croissance :

- Une **fleche verte vers le haut** avec un pourcentage indique une croissance par rapport a la periode precedente.
- Une **fleche rouge vers le bas** avec un pourcentage indique un declin par rapport a la periode precedente.
- La periode de comparaison correspond a la plage temporelle selectionnee (voir Selecteur de plage temporelle ci-dessous).

> **Conseil :** Survolez une carte KPI pour voir les chiffres exacts des periodes actuelle et precedente dans une infobulle.

### Lecture des cartes

1. Le **grand nombre** est le total actuel.
2. Le **badge de pourcentage** en dessous montre la variation d'une periode a l'autre.
3. Le **libelle** en haut identifie la metrique affichee.
4. Cliquez sur n'importe quelle carte pour naviguer directement vers le module correspondant (par exemple, cliquer sur "Total Utilisateurs" ouvre la liste des Utilisateurs).

---

## Selecteur de plage temporelle

Le selecteur de plage temporelle controle la fenetre de donnees pour toutes les analyses du tableau de bord et les comparaisons KPI.

### Plages disponibles

| Option | Periode | Comparaison avec |
|--------|---------|------------------|
| 7j | 7 derniers jours | 7 jours precedents |
| 30j | 30 derniers jours | 30 jours precedents |
| 90j | 90 derniers jours | 90 jours precedents |
| Tout | Depuis le lancement de la plateforme | Aucune comparaison (pourcentage de croissance masque) |

### Comment changer la plage temporelle

1. Localisez le **selecteur de plage temporelle** dans la zone superieure droite du tableau de bord, au-dessus des cartes KPI.
2. Cliquez sur l'un des boutons de periode : **7j**, **30j**, **90j** ou **Tout**.
3. L'ensemble du tableau de bord se rafraichit pour refleter la periode selectionnee.
4. Les pourcentages de croissance des KPI se recalculent en fonction de la nouvelle fenetre de comparaison.

> **Remarque :** L'option "Tout" masque les pourcentages de croissance puisqu'il n'y a pas de periode anterieure pour comparer.

---

## Section Analyses des animaux

Sous les cartes KPI, la section Analyses des animaux presente des repartitions visuelles des donnees du registre animalier. Trois types de graphiques offrent differentes perspectives sur la population animale.

### Repartition par espece (Graphique circulaire)

Le graphique circulaire affiche la repartition proportionnelle des animaux par espece.

| Element | Description |
|---------|-------------|
| Type de graphique | Graphique en anneau/circulaire |
| Source des donnees | Tous les animaux enregistres groupes par espece |
| Segments | Un segment par espece (ex. : Chien, Chat, Oiseau, Lapin, Reptile) |
| Etiquettes | Nom de l'espece et nombre affiches au survol |
| Legende | Legende codee par couleur sous ou a cote du graphique |

**Interaction avec le graphique circulaire :**

1. Survolez un segment pour voir le nombre exact et le pourcentage de cette espece.
2. Cliquez sur un segment pour filtrer les autres graphiques du tableau de bord sur cette espece uniquement.
3. Les elements de la legende sont cliquables - cliquez sur un nom d'espece pour basculer sa visibilite dans le graphique.

### Repartition par genre (Graphique a barres)

Le graphique a barres verticales montre la repartition des animaux par genre.

| Element | Description |
|---------|-------------|
| Type de graphique | Graphique a barres verticales |
| Axe X | Categories de genre (Male, Femelle, Inconnu) |
| Axe Y | Nombre d'animaux |
| Barres | Une barre par genre, codee par couleur |
| Etiquettes | Nombre affiche au-dessus de chaque barre |

**Lecture du graphique de genre :**

1. Chaque barre represente une categorie de genre.
2. La hauteur de la barre correspond au nombre total d'animaux de ce genre.
3. Le nombre exact est affiche comme etiquette au-dessus de chaque barre.
4. Survolez pour plus de details incluant le pourcentage du total.

### Repartition par pays (Graphique a barres horizontales)

Le graphique a barres horizontales classe les pays par nombre d'animaux enregistres.

| Element | Description |
|---------|-------------|
| Type de graphique | Graphique a barres horizontales |
| Axe Y | Noms des pays (tries par nombre, decroissant) |
| Axe X | Nombre d'animaux |
| Barres | Une barre horizontale par pays |
| Affichage | Top 10 des pays affiche par defaut |

**Lecture du graphique par pays :**

1. Les pays sont tries du plus grand nombre d'animaux (haut) au plus petit (bas).
2. Par defaut, seuls les 10 premiers pays sont affiches.
3. Survolez une barre pour voir le nombre exact et le pourcentage du total.
4. La longueur de la barre est proportionnelle au nombre par rapport aux autres pays.

---

## Filtres geographiques et par espece

Au-dessus des graphiques d'analyse, des controles de filtre permettent de restreindre les donnees affichees.

### Filtres disponibles

| Filtre | Type | Options |
|--------|------|---------|
| Espece | Selection deroulante | Toutes les especes disponibles sur la plateforme (ex. : Chien, Chat, Oiseau, etc.) |
| Pays | Selection deroulante | Tous les pays avec des animaux enregistres |

### Application des filtres

1. Cliquez sur le menu deroulant **Espece** pour selectionner une espece specifique.
2. Cliquez sur le menu deroulant **Pays** pour selectionner un pays specifique.
3. Les graphiques et tableaux ci-dessous se mettent a jour immediatement pour refleter le filtre.
4. Les filtres peuvent etre combines - selectionnez a la fois une espece et un pays pour affiner davantage les resultats.
5. Pour reinitialiser, selectionnez "Tous" dans chaque menu deroulant ou cliquez sur le bouton **Reinitialiser les filtres**.

> **Conseil :** Utilisez le filtre par espece sur la vue du graphique circulaire pour explorer les repartitions par race au sein d'une seule espece.

### Comportement des filtres

| Scenario | Effet |
|----------|-------|
| Aucun filtre selectionne | Toutes les donnees affichees globalement |
| Espece selectionnee uniquement | Les graphiques montrent les donnees pour cette espece dans tous les pays |
| Pays selectionne uniquement | Les graphiques montrent les donnees pour toutes les especes dans ce pays |
| Les deux selectionnes | Les graphiques montrent les donnees pour l'espece selectionnee dans le pays selectionne |

---

## Tableau des inscriptions recentes

Sous les graphiques d'analyse, un tableau affiche les inscriptions d'utilisateurs les plus recentes sur la plateforme.

### Colonnes du tableau

| Colonne | Description |
|---------|-------------|
| Avatar | Miniature de la photo de profil de l'utilisateur |
| Nom | Nom d'affichage de l'utilisateur |
| Email | Adresse email enregistree de l'utilisateur |
| Date d'inscription | Date et heure de creation du compte |
| Statut | Statut du compte (Actif, En attente, Banni) |
| Animaux | Nombre d'animaux enregistres par cet utilisateur |

### Fonctionnalites du tableau

1. **Tri** - Cliquez sur n'importe quel en-tete de colonne pour trier selon cette colonne. Cliquez a nouveau pour inverser l'ordre de tri.
2. **Pagination** - Le tableau affiche 10 entrees par page par defaut. Utilisez les controles de pagination en bas pour naviguer.
3. **Actions rapides** - Survolez une ligne pour faire apparaitre un bouton "Voir" qui ouvre le panneau de details de l'utilisateur.

### Comprendre les indicateurs de statut

| Statut | Couleur du badge | Signification |
|--------|------------------|---------------|
| Actif | Vert | Le compte est en bonne condition et entierement fonctionnel |
| En attente | Orange | Compte cree mais email pas encore verifie |
| Banni | Rouge | Le compte a ete suspendu par un administrateur |

> **Remarque :** Le tableau des inscriptions recentes affiche toujours les utilisateurs les plus recents en premier, independamment du reglage du selecteur de plage temporelle. Il affiche les inscriptions des 30 derniers jours.

---

## Bonnes pratiques du tableau de bord

### Checklist de surveillance quotidienne

1. Verifiez la carte KPI **Verifications en attente** - un nombre eleve peut indiquer un retard de traitement.
2. Examinez les **pourcentages de croissance** sur les quatre cartes pour detecter des baisses inattendues.
3. Parcourez le tableau des **Inscriptions recentes** pour reperer les comptes suspects.
4. Notez tout changement significatif dans le graphique de **Repartition par pays**.

### Interpretation des tendances

| Tendance | Signification possible | Action recommandee |
|----------|------------------------|-------------------|
| Pic soudain d'inscriptions | Succes d'une campagne marketing ou activite de bots | Verifier les utilisateurs recents pour des schemas suspects |
| Baisse des annonces actives | Changement saisonnier ou probleme de politique | Examiner les actions de bannissement recentes et les expirations d'annonces |
| Verifications en attente elevees | Equipe de moderation insuffisante | Assigner des moderateurs supplementaires |
| Changement de l'equilibre des especes | Tendance regionale ou mauvaise configuration des categories | Examiner les parametres de categories |

---

## Performance du tableau de bord

Le tableau de bord charge les donnees de maniere asynchrone. Chaque section se charge independamment :

1. Les **cartes KPI** se chargent en premier (requete la plus rapide).
2. Les **graphiques** se chargent ensuite avec un bref indicateur de chargement.
3. Le **tableau des inscriptions recentes** se charge en dernier.

Si une section affiche une erreur de chargement :

1. Verifiez votre connexion internet.
2. Essayez de rafraichir la page.
3. Si l'erreur persiste, le service backend peut rencontrer des problemes.

> **Conseil :** Le tableau de bord se rafraichit automatiquement toutes les 5 minutes. Vous pouvez rafraichir manuellement en cliquant sur l'icone de rafraichissement dans l'en-tete ou en appuyant sur `F5`.

---

*Precedent : [Premiers pas](./getting-started.md) | Suivant : [Registre des animaux](./pets.md)*
