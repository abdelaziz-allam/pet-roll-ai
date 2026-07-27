# Analyses

La page Analyses fournit des informations visuelles sur l'utilisation de la plateforme, la croissance des utilisateurs, les donnees demographiques des animaux et l'activite de sante. Utilisez ces graphiques pour comprendre les tendances, mesurer l'engagement et prendre des decisions basees sur les donnees concernant la plateforme Petfolioo.

![Analytics](/docs/screenshots/analytics.png)

---

## Vue d'ensemble

Le tableau de bord Analyses presente quatre visualisations principales ainsi qu'un selecteur de plage temporelle qui controle la fenetre de donnees pour tous les graphiques. Chaque graphique se met a jour dynamiquement lorsque vous changez la plage temporelle selectionnee.

---

## Acceder aux analyses

1. Cliquez sur **Analyses** dans le menu de navigation laterale.
2. Le tableau de bord se charge avec tous les graphiques affiches sur une seule page defilable.
3. La plage temporelle par defaut est de **30 jours**.

---

## Selecteur de plage temporelle

En haut de la page Analyses, un selecteur de plage temporelle vous permet de controler la periode de donnees affichee sur tous les graphiques.

### Plages disponibles

| Option | Periode | Ideal pour |
|--------|---------|------------|
| **7j** | 7 derniers jours | Surveiller l'activite recente et les tendances a court terme |
| **30j** | 30 derniers jours | Rapports mensuels et analyse generale des tendances (par defaut) |
| **90j** | 90 derniers jours | Revues trimestrielles et identification de schemas a moyen terme |
| **1 An** | 365 derniers jours | Revues annuelles, schemas saisonniers et croissance a long terme |

### Changer la plage temporelle

1. Localisez le selecteur de plage temporelle en haut de la page.
2. Cliquez sur l'un des boutons de plage : **7j**, **30j**, **90j** ou **1 An**.
3. Le bouton selectionne devient mis en surbrillance pour indiquer la plage active.
4. Tous les graphiques de la page se rafraichissent pour afficher les donnees de la periode choisie.
5. Les axes et libelles des graphiques s'ajustent automatiquement a la nouvelle fenetre temporelle.

> **Conseil :** Commencez avec 30j pour une vue d'ensemble generale, puis restreignez a 7j pour investiguer les anomalies recentes ou elargissez a 1 An pour les rapports de direction.

---

## Graphique de croissance des utilisateurs

### Type de graphique

Graphique en ligne affichant les tendances d'inscription des utilisateurs dans le temps.

### Ce qu'il montre

Le graphique de croissance des utilisateurs visualise le nombre de nouvelles inscriptions d'utilisateurs tracees sur la periode selectionnee. Chaque point de donnees represente le nombre cumulatif ou quotidien de nouveaux utilisateurs.

### Lecture du graphique

| Element | Description |
|---------|-------------|
| **Axe X** | Temps (dates ou semaines selon la plage selectionnee) |
| **Axe Y** | Nombre de nouvelles inscriptions d'utilisateurs |
| **Ligne** | Une ligne continue reliant les points de donnees montrant la trajectoire de croissance |
| **Points de donnees** | Marqueurs survolables sur la ligne montrant les valeurs exactes |
| **Infobulle** | Apparait au survol montrant la date et le nombre exact d'inscriptions |

### Interpretation des donnees

1. **Tendance haussiere** -- Croissance constante de l'acquisition d'utilisateurs. La plateforme attire de nouveaux utilisateurs regulierement.
2. **Ligne plate** -- L'acquisition d'utilisateurs a atteint un plateau. Envisagez des efforts marketing ou des lancements de fonctionnalites pour relancer la croissance.
3. **Pics** -- Les augmentations soudaines peuvent correspondre a des campagnes marketing, une couverture presse ou une mise en avant sur les app stores.
4. **Baisses** -- Les diminutions d'inscriptions quotidiennes peuvent indiquer des schemas saisonniers ou des problemes techniques.

### Comportement selon la plage temporelle

| Plage | Granularite axe X | Notes |
|-------|-------------------|-------|
| 7j | Quotidienne | Chaque jour montre individuellement |
| 30j | Quotidienne | Chaque jour montre, bon pour identifier les schemas hebdomadaires |
| 90j | Hebdomadaire | Donnees agregees par semaine pour la lisibilite |
| 1 An | Mensuelle | Donnees agregees par mois pour montrer la trajectoire annuelle |

> **Conseil :** Comparez la vue 7j avec la vue 30j. Si la tendance des 7 derniers jours est au-dessus de la moyenne sur 30 jours, la croissance s'accelere.

---

## Graphique de distribution par espece

### Type de graphique

Graphique circulaire (ou en anneau) montrant la proportion d'animaux par espece.

### Ce qu'il montre

Le graphique de distribution par espece decompose tous les animaux enregistres par leur categorie d'espece, montrant la proportion relative de chacune.

### Lecture du graphique

| Element | Description |
|---------|-------------|
| **Tranches** | Chaque tranche represente une espece (ex. : Chien, Chat, Oiseau, Lapin) |
| **Couleurs** | Chaque espece est associee a une couleur distincte pour l'identification |
| **Etiquettes** | Nom de l'espece et pourcentage affiches sur ou pres de chaque tranche |
| **Legende** | Une legende associe les couleurs aux noms d'especes |
| **Infobulle** | Survolez une tranche pour voir le nombre exact et le pourcentage |

### Interpretation des donnees

1. **Espece dominante** -- La plus grande tranche indique le type d'animal principal de votre base d'utilisateurs. Utilisez cela pour prioriser les fonctionnalites.
2. **Petites tranches** -- Les especes avec de tres petits pourcentages peuvent indiquer des opportunites de croissance dans des segments sous-representes.
3. **Equilibre** -- Une distribution a peu pres egale suggere un attrait large parmi les types de proprietaires d'animaux.

### Cas d'utilisation

- **Priorisation des fonctionnalites** -- Si 70% des animaux sont des chiens, priorisez les fonctionnalites specifiques aux chiens.
- **Planification de contenu** -- Creez du contenu educatif proportionnel a la distribution par espece.
- **Ciblage marketing** -- Comprenez quels segments d'audience sont les plus importants pour les campagnes publicitaires.
- **Ciblage des notifications** -- Les segments d'audience dans les Notifications (Proprietaires de chiens, Proprietaires de chats) correspondent directement a ce graphique.

> **Conseil :** Si vous remarquez qu'une espece croit plus vite que les autres dans le temps (comparez 30j vs 1 An), envisagez d'investir dans des fonctionnalites specifiques a cette espece pour capitaliser sur la tendance.

---

## Graphique des races populaires

### Type de graphique

Graphique a barres horizontales classant les races les plus populaires.

### Ce qu'il montre

Le graphique des races populaires affiche les principales races enregistrees sur la plateforme, classees par nombre. Les barres s'etendent horizontalement, facilitant la comparaison de popularite entre les races.

### Lecture du graphique

| Element | Description |
|---------|-------------|
| **Axe Y** | Noms des races, ordonnees de la plus populaire (haut) a la moins populaire (bas) |
| **Axe X** | Nombre d'animaux enregistres de cette race |
| **Barres** | Barres horizontales dont la longueur represente le nombre d'animaux |
| **Etiquettes** | Valeur du nombre affichee a la fin de chaque barre |
| **Infobulle** | Survolez pour le nombre exact et le pourcentage du total |

### Interpretation des donnees

1. **Races en tete** -- Les barres les plus longues representent les races les plus courantes sur la plateforme. Ces utilisateurs sont votre audience principale.
2. **Longue traine** -- De nombreuses races avec de petits nombres indiquent des interets utilisateurs diversifies.
3. **Concentration par race** -- Si quelques races dominent (ex. : les 3 premieres representent plus de 50%), votre plateforme a une base d'utilisateurs concentree.

### Observations typiques

| Schema | Observation | Action |
|--------|------------|--------|
| Golden Retriever domine | Large audience de chiens familiaux | Prioriser les fonctionnalites pour les races moyennes/grandes |
| Chat Persan dans le top 5 | Segment fort de proprietaires de chats | Investir dans le suivi de sante specifique aux chats |
| Races exotiques apparaissant | Eleveurs de niche rejoignant la plateforme | Envisager des fonctionnalites premium specifiques aux eleveurs |
| Distribution egale | Base d'utilisateurs diversifiee | Construire des fonctionnalites generales plutot que specifiques aux races |

### Limites du graphique

- Le graphique affiche les **10-15 principales races** par defaut.
- Les races restantes sont groupees sous "Autre" si applicable.
- Le nombre de races visibles peut varier selon la plage temporelle.

> **Conseil :** Recoupez les races populaires avec les donnees d'activite de sante. Si une race populaire a une faible activite de dossiers de sante, ces utilisateurs pourraient avoir besoin d'encouragements d'engagement.

---

## Graphique d'activite de sante

### Type de graphique

Graphique a barres groupees montrant les activites liees a la sante categorisees par type.

### Ce qu'il montre

Le graphique d'activite de sante affiche le volume d'actions liees a la sante effectuees sur la plateforme, groupees par type d'activite. Cela vous aide a comprendre comment les utilisateurs s'engagent activement avec les fonctionnalites de sante.

### Lecture du graphique

| Element | Description |
|---------|-------------|
| **Axe X** | Periodes (jours, semaines ou mois selon la plage) |
| **Axe Y** | Nombre d'activites de sante |
| **Groupes de barres** | Plusieurs barres par periode, une pour chaque type d'activite |
| **Couleurs** | Chaque type d'activite a une couleur distincte |
| **Legende** | Associe les couleurs aux types d'activites (Vaccinations, Bilans, Medicaments, etc.) |
| **Infobulle** | Survolez pour le nombre exact par type d'activite par periode |

### Types d'activites

| Activite | Description | Couleur (typique) |
|----------|-------------|-------------------|
| **Vaccinations** | Dossiers de vaccination crees ou mis a jour | Bleu |
| **Dossiers de sante** | Dossiers de sante generaux enregistres | Vert |
| **Suivi du poids** | Mesures de poids enregistrees | Orange |
| **Medicaments** | Entrees de medicaments ajoutees | Violet |

### Interpretation des donnees

1. **Barres de vaccination elevees** -- Les utilisateurs suivent activement les vaccinations. Le systeme de rappels stimule probablement l'engagement.
2. **Barres de dossiers de sante basses** -- Les utilisateurs ne connaissent peut-etre pas la fonctionnalite de dossiers de sante. Envisagez des invites dans l'application.
3. **Schemas saisonniers** -- Certaines activites de sante culminent de maniere saisonniere (ex. : traitements anti-puces au printemps).
4. **Barres croissantes dans le temps** -- L'adoption des fonctionnalites de sante augmente, indiquant un bon engagement utilisateur.
5. **Barres decroissantes** -- Les utilisateurs perdent peut-etre de l'interet ou rencontrent des frictions dans l'enregistrement des donnees de sante.

### Comparaison des types d'activites

Le format groupe vous permet de comparer visuellement :

- Quelles fonctionnalites de sante sont les plus utilisees vs sous-utilisees.
- Si un type d'activite croit tandis que d'autres declinent.
- Comment differentes plages temporelles revelent differents schemas.

> **Conseil :** Si l'activite de vaccination est elevee mais les autres suivis de sante sont bas, envisagez d'ajouter des invites inter-fonctionnalites : "Vous avez enregistre une vaccination -- souhaitez-vous aussi enregistrer le poids de Rex ?"

---

## Disposition du tableau de bord

Les quatre graphiques sont disposes sur la page Analyses dans une grille :

```
+---------------------------+---------------------------+
|                           |                           |
|    Croissance utilisateurs|    Distribution especes   |
|    (Graphique en ligne)   |    (Graphique circulaire) |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Races populaires       |    Activite de sante      |
|    (Barres horizontales)  |    (Barres groupees)      |
|                           |                           |
+---------------------------+---------------------------+
```

Chaque graphique occupe une carte avec :
- Un en-tete de titre
- La visualisation du graphique
- Des infobulles interactives au survol
- Un dimensionnement responsive qui s'adapte a la largeur de l'ecran

---

## Interagir avec les graphiques

### Infobulles au survol

1. Deplacez votre curseur sur n'importe quel point de donnees, barre ou tranche de graphique.
2. Une infobulle apparait montrant :
   - La valeur exacte
   - Le libelle (date, nom de race, espece, etc.)
   - Le pourcentage le cas echeant

### Comportement responsive

1. Sur les ecrans plus larges, les graphiques s'affichent dans une grille 2x2.
2. Sur les ecrans plus petits, les graphiques s'empilent verticalement pour la lisibilite.
3. Les elements du graphique se redimensionnent proportionnellement.

### Rafraichissement des donnees

1. Les donnees d'analyses sont rafraichies au chargement de la page.
2. Changer la plage temporelle declenche une nouvelle recuperation de donnees.
3. Il n'y a pas de rafraichissement automatique -- rechargez la page manuellement pour les dernieres donnees.

---

## Flux de travail d'analyse courants

### Rapport mensuel

1. Selectionnez la plage temporelle **30j**.
2. Notez la tendance de Croissance des utilisateurs (hausse, stable ou baisse).
3. Verifiez la Distribution par espece pour tout changement.
4. Examinez les Races populaires pour les tendances emergentes.
5. Examinez l'Activite de sante pour les niveaux d'engagement.
6. Capturez l'ecran ou exportez les donnees pour les rapports.

### Investigation d'une baisse

1. Commencez avec **30j** pour identifier quand la baisse s'est produite.
2. Passez a **7j** pour examiner la periode la plus recente en detail.
3. Verifiez si la baisse correspond a :
   - Un probleme systeme (verifiez l'historique du Mode maintenance dans Parametres)
   - Une notification envoyee (verifiez l'historique des Notifications)
   - Un schema saisonnier (comparez avec la vue 1 An)

### Revue trimestrielle

1. Selectionnez la plage temporelle **90j**.
2. Comparez la trajectoire de croissance avec les trimestres precedents.
3. Identifiez quelles activites de sante ont le plus augmente.
4. Notez les nouvelles races apparaissant dans le graphique des Races populaires.
5. Utilisez la Distribution par espece pour valider l'alignement de la strategie marketing.

### Planification annuelle

1. Selectionnez la plage temporelle **1 An**.
2. Identifiez les schemas saisonniers dans la Croissance des utilisateurs (ex. : pics pendant les vacances).
3. Suivez les changements de popularite des races d'une annee a l'autre.
4. Mesurez l'adoption des fonctionnalites de sante sur l'annee complete.
5. Utilisez les informations pour eclairer la feuille de route produit.

---

## Comprendre la fraicheur des donnees

| Aspect | Detail |
|--------|--------|
| Source des donnees | Base de donnees de la plateforme (agregee) |
| Frequence de mise a jour | Temps reel au chargement de la page |
| Precision historique | Complete depuis le lancement de la plateforme |
| Fuseau horaire | Heure du serveur (UTC) |
| Donnees manquantes | Les lacunes sont montrees comme valeurs zero, pas interpolees |

---

## Resolution de problemes

| Probleme | Solution |
|----------|----------|
| Les graphiques ne se chargent pas | Verifiez votre connexion reseau. Rafraichissez la page. |
| Les donnees semblent obsoletes | Les analyses se chargent a chaque visite de page. Naviguez ailleurs et revenez, ou rafraichissez. |
| Valeurs zero pour toutes les metriques | Verifiez que la plage temporelle selectionnee contient des donnees. Essayez d'elargir a 1 An. |
| Les infobulles des graphiques n'apparaissent pas | Essayez un autre navigateur. Assurez-vous que JavaScript est active. |
| La plage temporelle ne change pas | Cliquez directement sur le bouton de plage. Si non reactif, rafraichissez la page. |
| Impossible d'acceder aux Analyses | Verifiez que votre role et vos permissions incluent l'acces a la page Analyses. |

---

## Pages associees

- [Parametres](./settings.md) -- Configurer les parametres de la plateforme qui affectent le comportement des utilisateurs
- [Notifications](./notifications.md) -- Envoyer des notifications pouvant impacter les metriques d'engagement
- [Retours](./feedback.md) -- Correler les retours utilisateurs avec les tendances d'analyse
- [Administrateurs](./admin-users.md) -- Accorder l'acces aux analyses aux membres de l'equipe
