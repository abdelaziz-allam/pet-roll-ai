# Certifications sanitaires

Le module Certifications sanitaires permet aux administrateurs de gerer et verifier les certificats de sante des animaux soumis par les veterinaires ou les proprietaires d'animaux. Cela garantit que les animaux inscrits sur la plateforme disposent d'une documentation sanitaire valide et a jour.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tableau des certifications

La vue principale affiche toutes les soumissions de certification sanitaire dans un tableau de donnees.

| Colonne | Description |
|---------|-------------|
| Nom de l'animal | Nom de l'animal auquel la certification appartient |
| Info veterinaire | Nom du veterinaire et clinique |
| Localisation | Pays et ville ou la certification a ete emise |
| Date du certificat | Date d'emission de la certification par le veterinaire |
| Documents | Nombre de documents de certification joints |
| Statut | Badge de statut actuel de la certification |

### Actions du tableau

- Cliquez sur n'importe quelle ligne pour ouvrir le **Panneau de details** sur le cote droit.
- Utilisez les boutons d'action dans la derniere colonne pour approuver/rejeter rapidement.
- Triez par n'importe quelle colonne en cliquant sur l'en-tete de colonne.

---

## Filtres

La barre de filtres au-dessus du tableau fournit quatre options de filtrage :

### Filtre de statut

Filtrez les certifications par leur statut actuel :

| Statut | Couleur du badge | Description |
|--------|------------------|-------------|
| En attente | Orange | En attente d'examen par l'administrateur |
| Approuve | Vert | Certification verifiee et active |
| Rejete | Rouge | La certification n'a pas passe l'examen |
| Revoque | Rouge fonce | Certification precedemment approuvee invalidee |
| Expire | Gris | La periode de validite de la certification est terminee |

### Filtre d'espece

Filtrez par espece d'animal :

- Chien
- Chat
- Oiseau
- Lapin
- Autre

### Filtre de pays

Selectionnez un ou plusieurs pays pour filtrer par le lieu d'emission de la certification.

### Filtre de ville

Affinez davantage en selectionnant des villes specifiques au sein du pays choisi.

> **Conseil :** Les filtres sont combinables. Par exemple, filtrez par Statut : En attente + Espece : Chien + Pays : Allemagne pour voir toutes les certifications de chiens en attente en provenance d'Allemagne.

---

## Panneau de details

Cliquer sur une ligne de certification ouvre un panneau de details sur le cote droit de l'ecran. Le panneau contient des informations completes organisees en sections.

### Banniere de statut

En haut du panneau, une banniere coloree affiche :

- Le statut actuel avec icone de badge
- La date du dernier changement de statut
- Le nom de l'administrateur qui a dernierment traite la certification (si applicable)
- Le motif de rejet ou de revocation (si applicable, affiche dans une alerte d'avertissement)

### Section Informations de l'animal

| Champ | Description |
|-------|-------------|
| Nom de l'animal | Nom enregistre de l'animal |
| Espece | Espece de l'animal |
| Race | Race de l'animal |
| Date de naissance | Date de naissance de l'animal |
| ID puce | Identifiant unique de la puce electronique (si disponible) |
| Proprietaire | Nom du proprietaire de l'animal avec lien vers son profil |

### Section Details veterinaires

| Champ | Description |
|-------|-------------|
| Nom du veterinaire | Nom complet du veterinaire emetteur |
| Nom de la clinique | Nom de la clinique veterinaire |
| Adresse de la clinique | Adresse complete de la clinique |
| Numero de licence | Numero de licence professionnelle du veterinaire |
| Telephone | Numero de telephone de contact de la clinique |
| Email | Email de contact de la clinique (si fourni) |

> **Conseil :** Verifiez le numero de licence aupres de la base de donnees de licences veterinaires de votre pays lors de l'examen de certifications provenant de cliniques inconnues.

### Barre de progression de validite

Sous les details veterinaires, une barre de progression visualise la periode de validite de la certification :

1. La barre s'etend de la **Date du certificat** (debut) a la **Date d'expiration** (fin).
2. La date actuelle est indiquee par un marqueur sur la barre.
3. Code couleur :
   - **Vert :** Plus de 30 jours restants
   - **Jaune :** 30 jours ou moins restants
   - **Rouge :** Expire
4. Le pourcentage de validite consomme est affiche en texte.

### Grille de documents

La section documents affiche les fichiers de certification telecharges dans une disposition en grille.

1. Chaque document apparait sous forme de carte miniature avec le nom du fichier en dessous.
2. Cliquez sur n'importe quelle miniature pour ouvrir la **superposition d'apercu d'image**.
3. Dans la superposition d'apercu :
   - Utilisez les controles de zoom avant/arriere pour inspecter les details.
   - Naviguez entre les documents avec les fleches gauche/droite.
   - Telechargez le fichier original en utilisant le bouton de telechargement.
   - Appuyez sur **Echap** pour fermer l'apercu.
4. Formats pris en charge : JPEG, PNG, PDF.

> **Conseil :** Recherchez les tampons veterinaires officiels, les signatures et les numeros de licence sur les documents de certification. Les documents generiques ou modeles sans ces elements doivent etre signales pour rejet.

---

## Approuver une certification

Pour approuver une certification sanitaire :

1. Ouvrez le panneau de details de la certification en cliquant sur la ligne.
2. Verifiez les details veterinaires pour leur completude et plausibilite.
3. Inspectez tous les documents telecharges dans la grille de documents.
4. Cliquez sur le bouton **Approuver** en bas du panneau.
5. Dans le dialogue de confirmation :
   - Consultez le resume de ce que vous approuvez.
   - La date d'expiration est calculee automatiquement selon le type de certification.
   - Cliquez sur **Confirmer**.

### Checklist d'approbation

Avant d'approuver, verifiez :

- [ ] Le nom et le numero de licence du veterinaire sont presents
- [ ] Les details de la clinique sont complets et verifiables
- [ ] Les documents sont lisibles et contiennent des tampons/signatures officiels
- [ ] La date de certification est recente (dans les 12 derniers mois)
- [ ] Les informations de l'animal sur le document correspondent a l'enregistrement de la plateforme
- [ ] Aucun signe de falsification ou de contrefacon du document

### Ce qui se passe apres l'approbation

- Le statut de la certification passe a **Approuve**.
- Une periode de validite est definie selon le type de certification.
- Le profil de l'animal affiche un badge de certification sanitaire.
- Le proprietaire recoit une notification confirmant l'approbation.
- La barre de progression de validite devient active dans le panneau de details.

---

## Rejeter une certification

Pour rejeter une certification sanitaire :

1. Ouvrez le panneau de details de la certification.
2. Identifiez le(s) probleme(s) avec la soumission.
3. Cliquez sur le bouton **Rejeter** en bas du panneau.
4. Dans le dialogue de rejet :
   - Saisissez un **Motif de rejet** dans la zone de texte. Ce champ est obligatoire.
   - Soyez specifique sur ce qui doit etre corrige.
5. Cliquez sur **Confirmer le rejet**.

### Motifs de rejet courants

| Motif | Exemple de message |
|-------|-------------------|
| Documents illisibles | "Le document telecharge est trop flou pour etre lu. Veuillez telecharger un scan ou une photo plus claire." |
| Details veterinaires manquants | "Le certificat n'inclut pas le numero de licence du veterinaire. Veuillez resoumettre avec les identifiants veterinaires complets." |
| Certification expiree | "Cette certification a ete emise il y a plus de 12 mois. Veuillez obtenir et telecharger un certificat a jour." |
| Informations animales non concordantes | "Le nom de l'animal sur le certificat ne correspond pas au nom enregistre. Veuillez verifier et resoumettre." |
| Documents incomplets | "Seule la page 1 sur 3 a ete telechargee. Veuillez telecharger toutes les pages de la certification." |

### Ce qui se passe apres le rejet

- Le statut de la certification passe a **Rejete**.
- Le motif de rejet est affiche au proprietaire de l'animal.
- Le proprietaire recoit une notification avec le motif.
- Le proprietaire peut soumettre une nouvelle certification pour remplacer celle rejetee.

> **Conseil :** Fournissez toujours un retour actionnable. Dites au proprietaire exactement ce qu'il doit corriger pour qu'il puisse resoudre le probleme en une seule resoumission.

---

## Revoquer une certification

La revocation est utilisee lorsqu'une certification precedemment approuvee s'avere invalide, frauduleuse ou n'est plus applicable.

1. Naviguez vers la certification (filtrez par Statut : Approuve si necessaire).
2. Ouvrez le panneau de details.
3. Cliquez sur le bouton **Revoquer** (visible uniquement pour les certifications Approuvees).
4. Dans le dialogue de revocation :
   - Saisissez le **Motif de revocation**. Ce champ est obligatoire.
   - Reconnaissez que cette action est immediate et ne peut pas etre annulee.
5. Cliquez sur **Confirmer la revocation**.

### Quand revoquer

- Documentation frauduleuse decouverte apres l'approbation
- Licence veterinaire trouvee invalide ou revoquee
- Le proprietaire de l'animal signale que la certification a ete soumise par erreur
- L'autorite reglementaire signale la certification

### Ce qui se passe apres la revocation

- Le badge de certification sanitaire est immediatement retire du profil de l'animal.
- Le statut de la certification passe a **Revoque**.
- Le motif de revocation est stocke et visible dans le panneau de details.
- Le proprietaire est notifie par email et notification dans l'application.
- Le proprietaire doit soumettre une nouvelle certification s'il souhaite restaurer le badge.

> **Conseil :** La revocation est une action serieuse qui affecte les signaux de confiance de l'animal sur la plateforme. Assurez-vous d'avoir des preuves suffisantes avant de proceder.

---

## Comprendre la validite et l'expiration

Les certifications sanitaires ont une periode de validite definie qui determine combien de temps la certification reste active apres l'approbation.

### Comment fonctionne la validite

1. Lorsqu'une certification est approuvee, le systeme calcule une date d'expiration.
2. La periode de validite depend du type de certification :
   - Certificat de sante general : 12 mois
   - Certificat de vaccination : Varie selon le calendrier vaccinal
   - Certificat d'aptitude a la reproduction : 6 mois
3. La **Barre de progression de validite** dans le panneau de details montre visuellement le temps restant.

### Notifications d'expiration

Le systeme envoie des notifications automatiques a l'approche de l'expiration :

| Jours avant expiration | Notification |
|------------------------|--------------|
| 30 jours | Premier rappel au proprietaire pour renouveler |
| 14 jours | Second rappel avec urgence |
| 7 jours | Avertissement final |
| 0 jour | Notification de certification expiree |

### Apres l'expiration

- Le statut de la certification passe automatiquement a **Expire**.
- Le badge de sante est retire du profil de l'animal.
- La certification expiree reste dans l'historique pour reference.
- Le proprietaire peut soumettre une nouvelle certification a tout moment.

> **Conseil :** Surveillez le tableau des certifications filtre par "Approuve" et trie par date d'expiration pour identifier proactivement les certifications approchant de l'expiration dans votre region.

---

## Actions en masse

Pour un traitement efficace de plusieurs certifications :

1. Utilisez les cases a cocher sur le cote gauche du tableau pour selectionner plusieurs lignes.
2. La barre d'actions en masse apparait en haut du tableau.
3. Actions en masse disponibles :
   - **Tout approuver** -- Approuve toutes les certifications en attente selectionnees avec l'expiration par defaut.
   - **Exporter** -- Telecharge les certifications selectionnees sous forme de rapport CSV.

> **Conseil :** L'approbation en masse ne doit etre utilisee que lorsque vous avez individuellement verifie les documents de chaque certification selectionnee. N'approuvez jamais en masse sans examiner les documents.

---

## Questions frequentes

**Q : Puis-je modifier la date d'expiration d'une certification approuvee ?**
R : Non. Pour changer l'expiration, vous devez revoquer la certification actuelle et demander au proprietaire de resoumettre.

**Q : Que faire si un document de certification est dans une langue que je ne lis pas ?**
R : Escaladez a un administrateur qui lit cette langue, ou demandez au proprietaire de fournir une traduction certifiee.

**Q : Un animal peut-il avoir plusieurs certifications actives ?**
R : Oui. Un animal peut avoir a la fois un certificat de sante general et des certificats de vaccination specifiques actifs simultanement.

**Q : Qui recoit les notifications de rejet/revocation ?**
R : Le proprietaire enregistre de l'animal recoit toutes les notifications par email et messagerie dans l'application.
