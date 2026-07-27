# Analyses de vaccination

Le module Analyses de vaccination fournit aux administrateurs des informations sur les tendances vaccinales a travers la plateforme. Utilisez ce tableau de bord pour comprendre quels vaccins sont les plus couramment administres, identifier les schemas regionaux et suivre la couverture vaccinale globale.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

---

## Vue d'ensemble du tableau de bord

La page Analyses de vaccination est organisee en sections suivantes :

1. **Statistiques resumees** -- Metriques cles en haut de la page
2. **Classement Top 20 des vaccins** -- Liste classee des vaccins les plus utilises
3. **Visualisation du podium** -- Mise en valeur des 3 premiers vaccins
4. **Repartition par vaccin** -- Distribution par espece pour chaque vaccin
5. **Principales localisations** -- Distribution geographique par vaccin

---

## Statistiques resumees

En haut de la page d'analyses, trois cartes de statistiques affichent des metriques agregees :

| Carte de statistiques | Description | Icone |
|----------------------|-------------|-------|
| Total vaccinations | Nombre total de dossiers de vaccination pour tous les animaux | Seringue |
| Vaccins uniques | Nombre de types de vaccins distincts administres | Flacon |
| Animaux vaccines | Nombre d'animaux uniques avec au moins une vaccination | Patte |

### Lecture des statistiques

- **Total vaccinations** compte les evenements de vaccination individuels (un animal recevant un vaccin = 1 comptage).
- **Vaccins uniques** montre la variete des vaccins dans le systeme (ex. : Rage, DHPP, FVRCP comptent chacun comme 1).
- **Animaux vaccines** est deduplique -- un animal avec 5 vaccinations compte toujours comme 1 animal.

> **Conseil :** Comparez Total vaccinations et Animaux vaccines pour comprendre le nombre moyen de vaccinations par animal sur la plateforme.

---

## Filtres

La barre de filtres s'applique a toutes les sections de la page d'analyses simultanement.

### Filtre de periode

Selectionnez une plage temporelle pour les donnees :

| Option | Description |
|--------|-------------|
| 7 derniers jours | Semaine passee |
| 30 derniers jours | Mois passe |
| 90 derniers jours | Trimestre passe |
| 12 derniers mois | Annee passee |
| Tout | Aucune restriction temporelle |
| Plage personnalisee | Selecteur de dates pour les dates de debut et de fin |

### Filtre d'espece

Filtrez les donnees de vaccination par espece d'animal :

- Toutes les especes (par defaut)
- Chien
- Chat
- Oiseau
- Lapin
- Autre

### Filtre de pays

Selectionnez un ou plusieurs pays pour voir les donnees de vaccination uniquement de ces regions.

### Filtre de ville

Affinez davantage les resultats en selectionnant des villes specifiques au sein du pays choisi.

> **Conseil :** Combinez les filtres pour repondre a des questions specifiques. Par exemple : "Quels sont les principaux vaccins pour les chiens au Royaume-Uni au cours des 12 derniers mois ?"

### Application des filtres

1. Definissez les valeurs de filtre souhaitees en utilisant les menus deroulants.
2. Cliquez sur **Appliquer les filtres** ou les filtres s'appliquent automatiquement au changement.
3. Toutes les sections du tableau de bord se mettent a jour pour refleter les donnees filtrees.
4. Les filtres actifs sont affiches sous forme d'etiquettes sous la barre de filtres.
5. Cliquez sur le **X** d'une etiquette de filtre pour la supprimer, ou cliquez sur **Tout effacer** pour reinitialiser.

---

## Classement Top 20 des vaccins

Le classement affiche les 20 vaccins les plus frequemment administres selon la selection de filtres actuelle.

### Colonnes du tableau

| Colonne | Description |
|---------|-------------|
| Rang | Position de 1 a 20 |
| Nom du vaccin | Nom du vaccin |
| Nombre | Nombre de fois administre |
| Pourcentage | Part du total des vaccinations |
| Tendance | Graphique sparkline montrant la tendance d'utilisation sur la periode selectionnee |

### Lecture du classement

1. Les vaccins sont tries par nombre en ordre decroissant.
2. La colonne **Pourcentage** montre quelle portion de toutes les vaccinations ce vaccin represente.
3. Le **sparkline de Tendance** donne un apercu visuel rapide de si l'utilisation augmente, est stable ou diminue.
4. Survolez le sparkline pour voir les valeurs des points de donnees.

### Interaction avec le classement

- Cliquez sur n'importe quelle ligne de vaccin pour defiler vers sa section de repartition detaillee.
- Utilisez les en-tetes de colonnes pour re-trier (bien que l'ordre de rang par defaut soit le plus utile).
- Le tableau est pagine si les filtres produisent plus de 20 resultats dans de rares configurations.

> **Conseil :** Un vaccin en tendance haussiere pourrait indiquer une reponse a une epidemie regionale ou une nouvelle recommandation des associations veterinaires.

---

## Visualisation du podium

Le podium met en valeur les 3 premiers vaccins dans un affichage visuel style recompense.

### Disposition

```
        [1er]
   [2e]      [3e]
```

- **1ere place (centre, plus haute) :** Carte de couleur or avec le vaccin le plus administre.
- **2e place (gauche) :** Carte de couleur argent avec le deuxieme vaccin le plus administre.
- **3e place (droite) :** Carte de couleur bronze avec le troisieme vaccin le plus administre.

### Contenu des cartes

Chaque carte du podium affiche :

- Icone de medaille de rang (or, argent, bronze)
- Nom du vaccin
- Nombre total d'administrations
- Pourcentage de toutes les vaccinations
- Espece principale (espece la plus courante recevant ce vaccin)

### Lecture du podium

Le podium fournit un resume rapide des schemas de vaccination de la plateforme. Les resultats courants incluent :

- **Chiens :** Rage, DHPP (Maladie de Carre/Parvo), Bordetella dominent souvent.
- **Chats :** FVRCP, Rage, FeLV sont les vaccins typiques en tete.
- **Plateformes mixtes :** La Rage mene souvent toutes especes confondues.

> **Conseil :** Si le podium montre des resultats inattendus apres l'application de filtres, verifiez si le filtre de periode ou de localisation produit un echantillon trop petit qui pourrait fausser les classements.

---

## Repartition par espece pour chaque vaccin

Sous le classement, chaque vaccin du top 20 dispose d'une section extensible montrant la distribution par espece.

### Consulter la repartition

1. Cliquez sur la fleche d'expansion a cote de n'importe quel vaccin dans le classement.
2. Un graphique a barres empilees horizontales apparait montrant la distribution par espece.
3. Chaque segment est code par couleur selon l'espece :
   - Chiens : Bleu
   - Chats : Orange
   - Oiseaux : Vert
   - Lapins : Violet
   - Autre : Gris

### Tableau de repartition

A cote du graphique a barres, un petit tableau affiche :

| Espece | Nombre | Pourcentage |
|--------|--------|-------------|
| Chien | 1 234 | 62% |
| Chat | 456 | 23% |
| Oiseau | 200 | 10% |
| Lapin | 80 | 4% |
| Autre | 20 | 1% |

### Cas d'utilisation

- Identifier les vaccins specifiques a une espece vs inter-especes.
- Detecter des schemas inhabituels (ex. : un vaccin specifique aux chiens apparaissant dans les dossiers de chats peut indiquer des erreurs de saisie).
- Comprendre la composition par espece de votre plateforme a travers les donnees de vaccination.

> **Conseil :** Les vaccins specifiques a une espece apparaissant sous la mauvaise espece indiquent souvent des problemes de qualite des donnees qui doivent etre investigues.

---

## Principales localisations par vaccin

Chaque vaccin montre egalement une repartition geographique des lieux ou il est le plus frequemment administre.

### Consulter les donnees de localisation

1. Cliquez sur la fleche d'expansion a cote de n'importe quel vaccin dans le classement.
2. Passez a l'onglet **Localisations** dans la section etendue.
3. Une liste classee des 10 principales localisations apparait.

### Tableau de localisation

| Rang | Pays | Ville | Nombre | Pourcentage |
|------|------|-------|--------|-------------|
| 1 | Allemagne | Berlin | 543 | 18% |
| 2 | Royaume-Uni | Londres | 421 | 14% |
| 3 | France | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Vue carte

Si disponible, une mini carte thermique montre la concentration des vaccinations geographiquement :

- Les regions plus foncees indiquent des nombres de vaccination plus eleves.
- Survolez une region pour voir le nombre exact.
- Cliquez sur une region pour l'appliquer comme filtre de localisation.

### Cas d'utilisation

- Identifier les preferences ou exigences vaccinales regionales.
- Detecter des clusters pouvant correspondre a des recommandations veterinaires locales.
- Planifier des campagnes de sensibilisation ou de partenariat regional.

> **Conseil :** Certains vaccins sont legalement obligatoires dans des pays specifiques (ex. : la rage en Allemagne). Des concentrations elevees dans certaines regions sont attendues pour les vaccins obligatoires.

---

## Exportation des donnees

Pour exporter les donnees d'analyses de vaccination :

1. Cliquez sur le bouton **Exporter** dans le coin superieur droit de la page.
2. Choisissez le format d'exportation :
   - **CSV** -- Donnees brutes pour analyse tableur
   - **PDF** -- Rapport formate avec graphiques
3. L'exportation respecte tous les filtres actuellement actifs.
4. Le fichier se telecharge dans l'emplacement de telechargement par defaut de votre navigateur.

### Contenu de l'exportation

L'exportation CSV inclut :

- Nom du vaccin
- Nombre total
- Nombres de repartition par espece
- Principaux pays et villes
- Points de donnees de tendance
- Parametres de filtres utilises

> **Conseil :** Utilisez les exportations CSV pour creer des visualisations personnalisees dans des outils comme Excel ou Google Sheets, ou pour partager les donnees avec des partenaires de conseil veterinaire.

---

## Rafraichissement du tableau de bord

Les donnees d'analyses sont calculees a partir des dossiers de vaccination et mises en cache pour la performance.

- Les donnees se rafraichissent automatiquement toutes les 24 heures.
- L'horodatage du dernier rafraichissement est affiche en bas de la page.
- Cliquez sur l'icone **Rafraichir** a cote de l'horodatage pour declencher un rafraichissement manuel.
- Le rafraichissement manuel peut prendre 10-30 secondes selon le volume de donnees.

> **Conseil :** Si vous remarquez des ecarts entre le tableau de bord d'analyses et les dossiers individuels des animaux, essayez un rafraichissement manuel. Les vaccinations recemment ajoutees peuvent ne pas apparaitre avant le prochain rafraichissement du cache.

---

## Questions frequentes

**Q : Pourquoi le total du classement ne correspond-il pas au total des statistiques resumees ?**
R : Le classement montre les 20 premiers vaccins. S'il y a plus de 20 vaccins uniques, les restants ne sont pas listes mais comptent toujours dans le total.

**Q : Puis-je voir les donnees pour un eleveur ou proprietaire specifique ?**
R : Non. La page d'analyses montre les donnees agregees de la plateforme. Les dossiers de vaccination individuels sont disponibles sur le profil de chaque animal.

**Q : Pourquoi certains vaccins affichent-ils des donnees de tendance nulles ?**
R : Les nouveaux vaccins qui n'ont ete enregistres qu'une seule fois peuvent ne pas avoir suffisamment de points de donnees pour generer une ligne de tendance significative.

**Q : Jusqu'ou remontent les donnees historiques ?**
R : Le filtre "Tout" inclut chaque dossier de vaccination depuis le lancement de la plateforme. Il n'y a pas de limite de retention des donnees pour les analyses.

**Q : Puis-je comparer deux periodes ?**
R : Pas directement dans le tableau de bord. Exportez les donnees pour deux periodes differentes et comparez-les dans un tableur.
