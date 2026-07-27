# Registre des animaux

Le Registre des animaux est le module central pour consulter et gerer tous les animaux enregistres sur la plateforme Petfolioo. Depuis ce module, les administrateurs peuvent parcourir le catalogue complet des animaux, consulter les profils detailles, examiner les statuts de certification sanitaire et prendre des mesures de moderation telles que bannir les animaux qui enfreignent les politiques de la plateforme.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tableau de la liste des animaux

Le tableau de la liste des animaux affiche tous les animaux enregistres dans un format pagine, triable et filtrable.

### Colonnes du tableau

| Colonne | Description | Triable |
|---------|-------------|:-------:|
| Nom | Le nom enregistre de l'animal | Oui |
| Espece | Categorie d'espece (ex. : Chien, Chat, Oiseau) | Oui |
| Race | Race specifique au sein de l'espece | Oui |
| Statut | Statut actuel (Actif, Banni, En attente) | Oui |
| Genre | Male, Femelle ou Inconnu | Oui |
| Localisation | Pays et ville de l'adresse enregistree de l'animal | Oui |

### Indicateurs de statut

| Statut | Couleur du badge | Signification |
|--------|------------------|---------------|
| Actif | Vert | Le profil de l'animal est en ligne et visible par les autres utilisateurs |
| Banni | Rouge | Le profil de l'animal a ete masque en raison d'une violation de politique |
| En attente | Orange | Le profil de l'animal est en attente d'examen ou de verification du proprietaire |

### Interactions avec le tableau

1. **Cliquez sur un en-tete de colonne** pour trier le tableau selon cette colonne. Une fleche indique la direction du tri.
2. **Cliquez sur une ligne** pour ouvrir le panneau de details de l'animal sur le cote droit de l'ecran.
3. Les **controles de pagination** en bas permettent de naviguer entre les pages et de changer la taille de page (10, 20, 50 entrees par page).

> **Conseil :** Maintenez `Shift` et cliquez sur un second en-tete de colonne pour appliquer un tri secondaire.

---

## Filtres

La barre de filtres au-dessus du tableau de la liste des animaux offre plusieurs moyens de restreindre les resultats affiches.

### Filtres disponibles

| Filtre | Type | Description |
|--------|------|-------------|
| Espece | Selection deroulante | Filtrer par espece (Chien, Chat, Oiseau, Lapin, Reptile, etc.) |
| Statut | Selection deroulante | Filtrer par statut (Actif, Banni, En attente) |
| Genre | Selection deroulante | Filtrer par genre (Male, Femelle, Inconnu) |
| Pays | Selection deroulante | Filtrer par pays d'enregistrement de l'animal |
| Ville | Selection deroulante | Filtrer par ville (les options se mettent a jour selon la selection du pays) |
| Recherche | Champ texte | Recherche libre sur le nom, la race et le numero de puce |

### Application des filtres

1. Localisez la **barre de filtres** au-dessus du tableau.
2. Cliquez sur n'importe quel **filtre deroulant** pour voir les options disponibles.
3. Selectionnez une ou plusieurs valeurs dans les menus deroulants.
4. Tapez dans le champ **Recherche** pour effectuer une recherche en texte libre.
5. Les resultats se mettent a jour automatiquement au fur et a mesure que les filtres sont appliques.
6. Les filtres actifs sont affiches sous forme d'etiquettes sous la barre de filtres.
7. Cliquez sur le **X** d'une etiquette de filtre pour la supprimer.
8. Cliquez sur **Tout effacer** pour reinitialiser tous les filtres d'un coup.

### Combinaisons de filtres

Les filtres sont combines avec une logique ET. Par exemple :

| Filtres selectionnes | Resultat |
|---------------------|----------|
| Espece : Chien | Tous les chiens quel que soit le statut, le genre ou la localisation |
| Espece : Chien + Genre : Femelle | Toutes les chiennes |
| Espece : Chien + Pays : EAU + Statut : Actif | Tous les chiens actifs situes aux EAU |
| Recherche : "Rex" | Tous les animaux dont le nom, la race ou la puce contient "Rex" |

> **Remarque :** Le menu deroulant des villes depend de la selection du pays. Selectionnez d'abord un pays pour voir les villes disponibles.

---

## Panneau de details de l'animal

Cliquer sur n'importe quelle ligne d'animal ouvre un panneau de details qui glisse depuis le cote droit de l'ecran. Ce panneau contient le profil complet de l'animal organise en sections.

### Grille de photos

En haut du panneau de details, une grille de photos affiche les images telechargees de l'animal.

| Element | Description |
|---------|-------------|
| Photo principale | Affichee en plus grand, marquee d'une icone etoile |
| Photos supplementaires | Affichees dans une disposition en grille (jusqu'a 6 miniatures) |
| Action au clic | Cliquer sur une photo l'ouvre en visionneuse plein ecran |
| Aucune photo | Une silhouette de remplacement est affichee |

### Section Informations de l'animal

Sous les photos, les details principaux de l'animal sont affiches dans une disposition structuree.

| Champ | Description | Exemple |
|-------|-------------|---------|
| Nom | Nom enregistre de l'animal | "Bella" |
| Espece | Categorie d'espece | "Chien" |
| Race | Race specifique | "Golden Retriever" |
| Couleur | Couleur du pelage/corps | "Dore" |
| Poids | Poids avec unite | "28,5 kg" |
| Date de naissance | Anniversaire de l'animal | "2021-03-15" |
| Age | Calcule a partir de la date de naissance | "2 ans, 4 mois" |
| Genre | Male ou Femelle | "Femelle" |
| Numero de puce | Identifiant unique de la puce si implantee | "900118000123456" |
| Castre/Sterilise | Statut de castration ou sterilisation | "Oui" / "Non" / "Inconnu" |
| Date d'enregistrement | Date d'ajout de l'animal sur la plateforme | "2023-07-20" |

### Statut de certification sanitaire

La section certification sanitaire indique si l'animal dispose d'une documentation sanitaire valide enregistree.

| Element | Description |
|---------|-------------|
| Badge de certification | Coche verte (valide), Avertissement jaune (expiration prochaine), X rouge (expire/manquant) |
| Type de certificat | Nom du certificat de sante |
| Date d'emission | Date d'emission du certificat |
| Date d'expiration | Date d'expiration du certificat |
| Barre de progression de validite | Indicateur visuel de la periode de validite restante |

**Lecture de la barre de progression de validite :**

1. Une **barre verte complete** indique que le certificat a ete recemment emis et conserve la majeure partie de sa validite.
2. Une **barre jaune partielle** (moins de 30% restant) indique que le certificat approche de son expiration.
3. Une **barre rouge vide** indique que le certificat a expire.
4. Le pourcentage restant est affiche en texte a cote de la barre.

> **Conseil :** Les certificats expirant dans les 30 jours sont automatiquement signales dans le module Verifications en attente pour que le proprietaire de l'animal soit notifie.

### Informations du proprietaire

La section proprietaire affiche les details du proprietaire enregistre de l'animal.

| Champ | Description |
|-------|-------------|
| Nom du proprietaire | Nom d'affichage du proprietaire de l'animal |
| Email | Adresse email du proprietaire |
| Telephone | Numero de telephone si fourni |
| Eleveur verifie | Si le proprietaire detient le statut d'eleveur verifie |
| Total animaux | Nombre d'animaux enregistres par ce proprietaire |
| Membre depuis | Date d'inscription du proprietaire |

Cliquer sur le nom du proprietaire redirige vers son profil complet dans le module Utilisateurs.

### Section Localisation

La section localisation indique ou l'animal est enregistre.

| Champ | Description |
|-------|-------------|
| Pays | Nom du pays avec icone de drapeau |
| Ville | Nom de la ville |
| Adresse | Adresse postale si fournie (peut etre partiellement masquee pour la confidentialite) |

---

## Action Bannir/Debannir un animal

Les administrateurs et moderateurs peuvent bannir un animal dont le profil viole les politiques de la plateforme. Le bannissement masque l'animal de la vue publique et notifie le proprietaire.

### Bannir un animal

1. Ouvrez le panneau de details de l'animal en cliquant sur sa ligne dans le tableau.
2. Faites defiler jusqu'en bas du panneau ou localisez la section **Actions**.
3. Cliquez sur le bouton **Bannir l'animal** (affiche en rouge).
4. Une modale de confirmation apparait.
5. Dans le champ texte **Motif**, saisissez une explication claire de la raison du bannissement.
6. Selectionnez une **categorie de violation** dans le menu deroulant (ex. : Annonce frauduleuse, Contenu inapproprie, Profil en double, Violation de politique).
7. Cliquez sur **Confirmer le bannissement**.
8. Le statut de l'animal passe a "Banni" et le proprietaire recoit une notification avec le motif fourni.

### Exigences du motif de bannissement

| Exigence | Description |
|----------|-------------|
| Longueur minimale | Au moins 20 caracteres |
| Langage | Doit etre professionnel et clair |
| Specificite | Doit faire reference a la violation specifique |
| Visibilite | Le motif est affiche directement au proprietaire de l'animal |

> **Important :** Le motif de bannissement que vous fournissez sera affiche au proprietaire de l'animal dans sa notification d'application et par email. Assurez-vous qu'il est professionnel, specifique et ne contient pas de jargon interne.

### Debannir un animal

1. Utilisez le filtre **Statut** pour selectionner "Banni" et trouver les animaux bannis.
2. Cliquez sur la ligne de l'animal banni pour ouvrir le panneau de details.
3. Localisez le bouton **Debannir l'animal** (affiche en vert) dans la section Actions.
4. Une modale de confirmation apparait affichant le motif de bannissement original et la date.
5. Ajoutez optionnellement une note expliquant pourquoi le bannissement est leve.
6. Cliquez sur **Confirmer le debannissement**.
7. Le statut de l'animal revient a "Actif" et le proprietaire est notifie.

### Historique de bannissement

Le panneau de details de chaque animal inclut une section **Historique de bannissement** si l'animal a deja ete banni :

| Colonne | Description |
|---------|-------------|
| Date | Date d'application du bannissement |
| Administrateur | Quel administrateur a effectue l'action |
| Motif | Le motif de bannissement fourni |
| Duree | Combien de temps le bannissement a dure |
| Resolution | Comment il a ete resolu (debanni, appel, etc.) |

---

## Operations en masse

Pour les taches de moderation a grande echelle, le tableau de la liste des animaux prend en charge la selection multiple.

### Utilisation de la selection multiple

1. Cochez la **case a cocher** sur le cote gauche de chaque ligne que vous souhaitez selectionner.
2. Ou cliquez sur la **case a cocher de l'en-tete** pour selectionner toutes les lignes visibles sur la page actuelle.
3. Une **barre d'actions en masse** apparait en haut du tableau affichant le nombre d'elements selectionnes.
4. Les actions en masse disponibles incluent :
   - **Exporter** - Telecharger les animaux selectionnes sous forme de fichier CSV
   - **Changer le statut** - Appliquer un changement de statut a tous les animaux selectionnes

> **Remarque :** Le bannissement en masse n'est pas disponible via cette interface. Les bannissements doivent etre appliques individuellement pour garantir que chacun inclut un motif specifique.

---

## Exportation des donnees des animaux

Pour exporter les donnees du registre des animaux :

1. Appliquez les filtres souhaites pour restreindre le jeu de donnees.
2. Cliquez sur le bouton **Exporter** dans le coin superieur droit du tableau.
3. Selectionnez le format d'exportation (CSV ou Excel).
4. Choisissez d'exporter les **resultats filtres** ou **tous les enregistrements**.
5. Le fichier se telecharge dans l'emplacement de telechargement par defaut de votre navigateur.

### Champs exportes

| Champ | Inclus |
|-------|:------:|
| Nom de l'animal | Oui |
| Espece | Oui |
| Race | Oui |
| Genre | Oui |
| Statut | Oui |
| Pays | Oui |
| Ville | Oui |
| Email du proprietaire | Oui |
| Date d'enregistrement | Oui |
| Numero de puce | Oui |
| Statut certification sanitaire | Oui |

> **Remarque :** Les photos et les dossiers de sante detailles ne sont pas inclus dans les exportations. Seules les donnees de synthese sont exportees.

---

*Precedent : [Tableau de bord](./dashboard.md) | Suivant : [Utilisateurs de l'application](./users.md)*
