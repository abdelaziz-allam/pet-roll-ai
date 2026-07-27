# Categories d'animaux

Le module Categories d'animaux permet aux administrateurs de definir et gerer le systeme de classification utilise pour organiser les animaux sur la plateforme Petfolioo. Les categories representent les especes ou types d'animaux et sont utilisees dans toute l'application pour le filtrage, la recherche et l'organisation. Chaque categorie comprend un nom, un libelle, une icone emoji, une description et un statut actif.

![Pet Categories](/docs/screenshots/categories.png)

---

## Liste des categories

La page des categories affiche toutes les categories d'animaux definies dans un format de tableau avec des controles de gestion.

### Colonnes du tableau

| Colonne | Description | Triable |
|---------|-------------|:-------:|
| Slug du nom | Identifiant lisible par la machine (ex. : `dog`, `cat`, `bird`) | Oui |
| Libelle | Nom d'affichage lisible par l'humain (ex. : "Chien", "Chat", "Oiseau") | Oui |
| Icone emoji | Icone visuelle representant la categorie | Non |
| Description | Breve description de ce que cette categorie inclut | Non |
| Actif | Interrupteur a bascule indiquant si la categorie est active | Oui |
| Actions | Boutons Modifier et Supprimer | Non |

### Indicateurs de statut

| Etat actif | Affichage | Signification |
|------------|-----------|---------------|
| Actif | Bascule verte (position activee) | La categorie est disponible pour l'enregistrement d'animaux et visible dans les filtres |
| Inactif | Bascule grise (position desactivee) | La categorie est masquee aux utilisateurs mais les animaux existants conservent leur categorie |

### Fonctionnalites du tableau

1. **Triez** en cliquant sur les en-tetes de colonnes Slug du nom, Libelle ou Actif.
2. **Basculez rapidement** en cliquant sur l'interrupteur Actif directement dans la ligne du tableau.
3. **Actions en ligne** via les boutons Modifier (icone crayon) et Supprimer (icone poubelle) dans chaque ligne.
4. **Pagination** en bas pour parcourir lorsque de nombreuses categories existent.

> **Conseil :** Les categories inactives sont affichees avec un style de ligne legerement estompe pour les distinguer visuellement des categories actives.

---

## Creer une categorie

De nouvelles categories peuvent etre creees pour prendre en charge des especes ou types d'animaux supplementaires sur la plateforme.

### Etapes pour creer une categorie

1. Cliquez sur le bouton **Ajouter une categorie** dans le coin superieur droit de la page Categories.
2. Un formulaire de creation apparait (sous forme de modale ou de formulaire en ligne).
3. Remplissez les champs obligatoires :

| Champ | Obligatoire | Description | Exemple |
|-------|:----------:|-------------|---------|
| Slug du nom | Oui | Identifiant lisible par la machine | `golden_fish` |
| Libelle | Oui | Nom d'affichage montre aux utilisateurs | "Poisson rouge" |
| Icone emoji | Oui | Icone visuelle pour la categorie | "fish" |
| Description | Non | Breve explication de la categorie | "Poissons d'eau douce et d'eau salee" |
| Actif | Non | S'il faut activer immediatement (actif par defaut) | Active |

4. Selectionnez une icone emoji depuis le **Selecteur d'emoji** (voir ci-dessous).
5. Verifiez vos entrees.
6. Cliquez sur **Creer la categorie** pour enregistrer.
7. La nouvelle categorie apparait dans le tableau de la liste.

### Convention du slug du nom

Le slug du nom doit suivre ces regles :

| Regle | Description | Exemple |
|-------|-------------|---------|
| Minuscules uniquement | Aucun caractere majuscule autorise | `dog` et non `Dog` |
| Underscores pour les espaces | Utilisez des underscores pour separer les mots | `guinea_pig` et non `guinea pig` |
| Alphanumerique + underscore | Uniquement des lettres, chiffres et underscores | `cat_1` est valide, `cat-1` ne l'est pas |
| Unique | Ne doit pas dupliquer un slug de categorie existant | Le systeme rejettera les doublons |
| Pas d'underscores au debut/fin | Ne peut pas commencer ou finir par un underscore | `_dog_` est invalide |
| Maximum 50 caracteres | Gardez les slugs concis | Identifiants courts et descriptifs |

> **Important :** Le slug du nom ne peut pas etre modifie apres la creation. Il est utilise comme identifiant permanent dans la base de donnees et l'API. Choisissez soigneusement.

### Selecteur d'emoji

Le selecteur d'emoji fournit plus de 100 icones d'animaux et de nature pour l'identification des categories.

| Fonctionnalite | Description |
|----------------|-------------|
| Recherche | Tapez pour filtrer les emojis disponibles par mot-cle |
| Categories | Emojis organises par groupe (Animaux, Nature, Objets) |
| Apercu | L'emoji selectionne affiche en grand apercu avant confirmation |
| Recents | Les emojis precedemment utilises affiches en haut pour un acces rapide |

**Utilisation du selecteur d'emoji :**

1. Cliquez sur le **champ d'icone emoji** pour ouvrir le selecteur.
2. Parcourez les categories ou tapez un mot-cle dans la recherche (ex. : "chien", "poisson", "oiseau").
3. Cliquez sur l'emoji desire pour le selectionner.
4. L'emoji selectionne apparait dans le champ du formulaire en apercu.
5. Pour changer votre selection, cliquez a nouveau sur le champ pour rouvrir le selecteur.

Categories d'emoji disponibles :

| Groupe | Exemples d'emojis |
|--------|-------------------|
| Animaux domestiques | Chien, Chat, Hamster, Lapin, Souris |
| Animaux de ferme | Cheval, Vache, Cochon, Mouton, Chevre, Poule |
| Oiseaux | Perroquet, Aigle, Hibou, Canard, Flamant, Paon |
| Reptiles | Lezard, Serpent, Tortue, Crocodile, Dinosaure |
| Aquatiques | Poisson, Poisson tropical, Baleine, Dauphin, Pieuvre, Requin |
| Insectes | Papillon, Abeille, Scarabee, Fourmi, Grillon |
| Vie sauvage | Lion, Tigre, Ours, Singe, Elephant, Girafe |
| Patte/Generique | Empreintes de patte, Os, Coeur, Etoile |

---

## Modifier les categories

Les categories existantes peuvent etre modifiees pour mettre a jour leur libelle, icone, description ou statut actif.

### Etapes pour modifier une categorie

1. Localisez la categorie que vous souhaitez modifier dans le tableau.
2. Cliquez sur le bouton **Modifier** (icone crayon) dans la colonne Actions de la ligne.
3. Un formulaire de modification apparait pre-rempli avec les valeurs actuelles.
4. Modifiez l'un des champs editables :

| Champ | Modifiable | Notes |
|-------|:----------:|-------|
| Slug du nom | Non | Ne peut pas etre change apres la creation |
| Libelle | Oui | Mettre a jour le nom d'affichage |
| Icone emoji | Oui | Selectionner un nouvel emoji depuis le selecteur |
| Description | Oui | Mettre a jour ou ajouter une description |
| Actif | Oui | Basculer le statut actif/inactif |

5. Effectuez vos modifications.
6. Cliquez sur **Enregistrer les modifications** pour appliquer.
7. Une notification de succes confirme la mise a jour.
8. Le tableau reflete immediatement les modifications.

### Considerations de modification

| Consideration | Detail |
|---------------|--------|
| Changements de libelle | Immediatement refletes dans toute l'application pour tous les utilisateurs |
| Changements d'emoji | Mis a jour dans tous les emplacements de l'interface ou la categorie apparait |
| Changements de description | Visibles dans les ecrans de selection de categorie au sein de l'application |
| Animaux existants | Les animaux deja assignes a cette categorie ne sont pas affectes par les modifications |

> **Remarque :** Changer le libelle d'une categorie ne change pas son slug. Le slug reste l'identifiant permanent. Les utilisateurs et animaux referencent les categories par slug en interne.

---

## Activer et desactiver les categories

Les categories peuvent etre basculees entre les etats actif et inactif sans suppression.

### Activer une categorie

1. Trouvez la categorie inactive dans la liste (affichee avec une bascule grise).
2. Cliquez sur l'**interrupteur a bascule** dans la colonne Actif pour le mettre en position activee.
3. Alternativement, cliquez sur Modifier et basculez le champ Actif dans le formulaire de modification.
4. Confirmez l'action si demande.
5. La categorie devient disponible pour l'enregistrement d'animaux immediatement.

### Desactiver une categorie

1. Trouvez la categorie active dans la liste (affichee avec une bascule verte).
2. Cliquez sur l'**interrupteur a bascule** pour le mettre en position desactivee.
3. Un dialogue de confirmation apparait expliquant l'impact.
4. Cliquez sur **Confirmer la desactivation**.
5. La categorie est masquee des nouveaux enregistrements d'animaux.

### Impact de la desactivation

| Zone d'impact | Effet |
|---------------|-------|
| Nouveaux enregistrements | La categorie n'apparait plus dans les menus deroulants de selection d'espece |
| Animaux existants | Les animaux deja assignes a cette categorie conservent leur assignation |
| Filtres | La categorie n'apparait plus dans les menus deroulants de filtres pour les utilisateurs publics |
| Portail admin | La categorie reste visible dans l'admin avec un style inactif |
| Reponses API | La categorie est exclue des listes de categories actives |
| Reactivation | Peut etre reactivee a tout moment, restaurant la pleine fonctionnalite |

> **Conseil :** La desactivation est preferee a la suppression lorsque vous souhaitez temporairement masquer une categorie ou lorsque des animaux existants l'utilisent encore. Elle preserve l'integrite des donnees tout en limitant les nouveaux usages.

---

## Bouton Valeurs par defaut

La fonctionnalite Valeurs par defaut remplit le tableau des categories avec un ensemble predefini de categories d'animaux courantes. C'est utile pour la configuration initiale de la plateforme ou pour restaurer les categories standard.

### Utilisation des Valeurs par defaut

1. Cliquez sur le bouton **Valeurs par defaut** situe au-dessus ou en dessous du tableau des categories.
2. Une modale de confirmation apparait listant les categories qui seront creees.
3. Examinez la liste des categories par defaut.
4. Cliquez sur **Confirmer** pour proceder.
5. Les categories par defaut sont creees et apparaissent dans la liste.

### Ensemble de categories par defaut

Les valeurs par defaut creent les categories standard suivantes (si elles n'existent pas deja) :

| Slug du nom | Libelle | Emoji | Description |
|-------------|---------|:-----:|-------------|
| `dog` | Chien | Tete de chien | Chiens domestiques de toutes races |
| `cat` | Chat | Tete de chat | Chats domestiques de toutes races |
| `bird` | Oiseau | Oiseau | Oiseaux de compagnie incluant perroquets, canaris et pinsons |
| `rabbit` | Lapin | Tete de lapin | Lapins domestiques |
| `hamster` | Hamster | Tete de hamster | Hamsters, gerbilles et petits rongeurs similaires |
| `fish` | Poisson | Poisson | Poissons d'aquarium d'eau douce et d'eau salee |
| `turtle` | Tortue | Tortue | Tortues terrestres et aquatiques |
| `snake` | Serpent | Serpent | Serpents de compagnie non venimeux |
| `lizard` | Lezard | Lezard | Geckos, iguanes et autres lezards de compagnie |
| `horse` | Cheval | Tete de cheval | Chevaux et poneys |
| `guinea_pig` | Cochon d'Inde | Cochon d'Inde | Cochons d'Inde et cobayes |
| `ferret` | Furet | Furet | Furets domestiques |

### Comportement des valeurs par defaut

| Scenario | Comportement |
|----------|-------------|
| Tableau vide | Toutes les valeurs par defaut creees |
| Certaines valeurs par defaut existent | Seules les valeurs par defaut manquantes sont creees (pas de doublons) |
| Toutes les valeurs par defaut existent | Aucune modification, message de confirmation affiche |
| Des categories personnalisees existent | Les categories personnalisees ne sont pas affectees |

> **Remarque :** Le bouton Valeurs par defaut ne supprime ni ne modifie les categories existantes. Il n'ajoute que les entrees par defaut manquantes. Vos categories personnalisees sont en securite.

---

## Supprimer une categorie

Les categories peuvent etre definitivement supprimees lorsqu'elles ne sont plus necessaires. Cette action necessite une consideration attentive en raison de son impact sur les donnees existantes.

### Etapes pour supprimer une categorie

1. Localisez la categorie dans le tableau.
2. Cliquez sur le bouton **Supprimer** (icone poubelle) dans la colonne Actions de la ligne.
3. Une modale d'avertissement apparait avec :
   - Le nom de la categorie et le nombre actuel d'animaux utilisant cette categorie
   - Un avertissement sur l'impact sur les animaux existants
   - Un champ de confirmation textuel (tapez le slug de la categorie pour confirmer)
4. Lisez l'avertissement attentivement.
5. Tapez le **slug du nom** de la categorie dans le champ de confirmation.
6. Cliquez sur **Supprimer la categorie** pour la retirer definitivement.

### Impact de la suppression

| Zone d'impact | Effet |
|---------------|-------|
| Enregistrement de categorie | Definitivement supprime de la base de donnees |
| Animaux existants | Les animaux precedemment dans cette categorie deviennent **non categorises** |
| Profils d'animaux | Le champ espece affiche "Non categorise" ou vide |
| Filtres | La categorie est retiree de tous les menus deroulants de filtres |
| Analyses | Les donnees historiques peuvent afficher "Categorie inconnue" pour les anciens enregistrements |
| Reversibilite | Ne peut pas etre annule (doit etre recree manuellement si necessaire) |

### Les animaux deviennent non categorises

Lorsqu'une categorie est supprimee :

1. Tous les animaux assignes a cette categorie perdent leur assignation de categorie.
2. Ces animaux apparaissent avec un libelle "Non categorise" dans le Registre des animaux.
3. Les proprietaires d'animaux ne sont **pas** automatiquement notifies.
4. Les administrateurs peuvent reassigner les animaux non categorises a une autre categorie via la modification en masse.
5. Le nombre d'animaux de la categorie supprimee est affiche dans la modale de confirmation de suppression.

> **Important :** Supprimer une categorie avec des animaux actifs assignes laissera ces animaux non categorises. Envisagez de desactiver la categorie a la place, ou de reassigner les animaux avant la suppression.

### Restrictions de suppression

| Restriction | Description |
|-------------|-------------|
| Categories par defaut | Les categories par defaut initialisees peuvent etre supprimees (elles peuvent etre re-initialisees) |
| Animaux actifs | Les categories avec des animaux peuvent etre supprimees (les animaux deviennent non categorises) |
| Confirmation requise | Le slug doit etre tape pour confirmer la suppression |
| Exigence de role | Seuls les roles `super_admin` et `admin` peuvent supprimer des categories |

---

## Bonnes pratiques

### Directives de gestion des categories

1. **Utilisez des libelles clairs et simples** - Les libelles de categories doivent etre immediatement comprehensibles par tous les utilisateurs quelle que soit leur maitrise de la langue.
2. **Choisissez des emojis representatifs** - Selectionnez des emojis qui representent clairement le type d'animal pour faciliter la reconnaissance visuelle rapide.
3. **Redigez des descriptions utiles** - Les descriptions aident les utilisateurs a choisir la bonne categorie lors de l'enregistrement de leur animal.
4. **Desactivez avant de supprimer** - Si vous n'etes pas sur qu'une categorie est necessaire, desactivez-la d'abord. Ne supprimez que lorsque vous etes certain.
5. **Gardez les slugs descriptifs** - Puisque les slugs ne peuvent pas etre modifies, choisissez-les soigneusement lors de la creation.
6. **Surveillez les animaux non categorises** - Verifiez regulierement les animaux sans categorie et assignez-les de maniere appropriee.

### Exemples de nommage de categories

| Bon | Mauvais | Pourquoi |
|-----|---------|----------|
| `guinea_pig` | `gp` | Descriptif et lisible |
| `tropical_fish` | `tropicalFish` | Suit la convention avec underscore |
| `parrot` | `Parrot_1` | Minuscules, pas de chiffres necessaires |
| `persian_cat` | `cat_breed_persian` | Concis, niveau race quand necessaire |

---

## Questions frequentes

**Q : Puis-je fusionner deux categories ?**
R : Il n'y a pas de fonction de fusion integree. Pour consolider des categories, reassignez les animaux d'une categorie a une autre, puis supprimez la categorie vide.

**Q : Que se passe-t-il pour les filtres quand je desactive une categorie ?**
R : La categorie est retiree des menus deroulants de filtres cote utilisateur mais reste accessible dans les filtres du portail d'administration a des fins de gestion.

**Q : Puis-je reordonner les categories ?**
R : Les categories sont affichees par ordre alphabetique de libelle dans les interfaces cote utilisateur. Le tableau d'administration peut etre trie par n'importe quel en-tete de colonne.

**Q : Y a-t-il une limite au nombre de categories que je peux creer ?**
R : Il n'y a pas de limite technique stricte, mais pour la convivialite, gardez le nombre total gerable (moins de 30 est recommande) pour que les utilisateurs puissent facilement trouver la bonne categorie.

---

*Precedent : [Utilisateurs de l'application](./users.md)*
