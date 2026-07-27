# Verification des eleveurs

Le module Verification des eleveurs permet aux administrateurs d'examiner, approuver, rejeter et revoquer les demandes de verification d'eleveur. Les eleveurs verifies recoivent un badge de confiance visible par les acheteurs, signalant que leur elevage repond aux normes de la plateforme.

![Verification](/docs/screenshots/verification.png)

---

## Tableau des demandes de verification

La vue principale affiche toutes les soumissions de verification dans un tableau triable et consultable.

| Colonne | Description |
|---------|-------------|
| Nom de l'eleveur | Nom complet de l'eleveur qui a soumis la demande |
| Elevage | Nom de l'elevage enregistre associe a l'eleveur |
| Soumission n° | Numero de soumission auto-incremente (les resoumissions obtiennent un nouveau numero) |
| Nombre de documents | Nombre de documents telecharges joints a la soumission |
| Statut | Badge de statut de verification actuel |
| Expiration | Date d'expiration de la verification (affichee uniquement pour les soumissions approuvees) |

### Filtrage du tableau

1. Utilisez le menu deroulant **Statut** pour filtrer par : En attente, Approuve, Rejete, Revoque ou Expire.
2. Utilisez le champ **Recherche** pour trouver un eleveur par nom ou elevage.
3. Cliquez sur n'importe quel en-tete de colonne pour trier en ordre croissant ou decroissant.

> **Conseil :** La vue par defaut affiche d'abord les soumissions En attente afin que vous puissiez prioriser les nouvelles demandes.

---

## Flux de travail des statuts

Les demandes de verification suivent un cycle de vie defini :

```
En attente --> Approuve --> Expire (automatique, apres la date d'expiration)
   |              |
   |              +--> Revoque (action manuelle de l'admin)
   |
   +--> Rejete (l'eleveur peut resoumettre)
```

### Definitions des statuts

| Statut | Couleur du badge | Signification |
|--------|------------------|---------------|
| En attente | Orange | En attente d'examen par l'administrateur |
| Approuve | Vert | L'eleveur est verifie et le badge est actif |
| Rejete | Rouge | La soumission ne repond pas aux exigences |
| Revoque | Rouge fonce | L'administrateur a manuellement retire le statut verifie |
| Expire | Gris | La periode de verification est terminee ; l'eleveur doit resoumettre |

### Transitions

- **En attente** peut passer a **Approuve** ou **Rejete**.
- **Approuve** peut passer a **Revoque** (manuel) ou **Expire** (automatique).
- **Rejete** et **Expire** permettent a l'eleveur de creer une nouvelle soumission (nouvelle entree En attente).
- **Revoque** est un etat terminal pour cette soumission.

---

## Examiner une soumission

Pour examiner une demande de verification d'eleveur :

1. Localisez la soumission dans le tableau des demandes de verification.
2. Cliquez sur la ligne ou sur le bouton d'action **Examiner** sur le cote droit.
3. La **Modale de detail de la soumission** s'ouvre avec deux onglets :
   - **Soumission actuelle** -- Affiche les documents actifs et les details de l'eleveur.
   - **Historique des soumissions** -- Affiche toutes les soumissions precedentes de cet eleveur.

### Onglet Soumission actuelle

Cet onglet affiche :

- Informations du profil de l'eleveur (nom, email, telephone, numero d'enregistrement de l'elevage)
- Documents telecharges dans une disposition en grille
- Date et heure de soumission
- Notes eventuelles que l'eleveur a incluses avec la soumission

### Onglet Historique des soumissions

Cet onglet affiche une liste chronologique de toutes les soumissions du meme eleveur, incluant :

- Numero de soumission
- Date de soumission
- Statut final
- Nom de l'examinateur
- Motif de rejet (si applicable)

> **Conseil :** Utilisez l'onglet Historique des soumissions pour verifier si un eleveur a traite les motifs de rejet precedents avant d'approuver une resoumission.

---

## Apercu des documents

Chaque document telecharge apparait sous forme de miniature dans la grille de documents.

1. Cliquez sur n'importe quelle miniature de document pour ouvrir un apercu en taille reelle.
2. Utilisez les controles de zoom pour inspecter les details du document.
3. Naviguez entre les documents en utilisant les fleches gauche/droite dans la superposition d'apercu.
4. Appuyez sur **Echap** ou cliquez sur le bouton de fermeture pour revenir a la modale de detail.

Les formats de documents pris en charge incluent :

- Images JPEG et PNG
- Documents PDF (rendus sous forme d'images de page)

> **Conseil :** Recherchez la clarte, l'authenticite et la completude lors de l'examen des documents telecharges. Les documents flous ou partiels doivent etre rejetes avec des instructions claires pour la resoumission.

---

## Approuver une soumission

Pour approuver une demande de verification d'eleveur :

1. Ouvrez la modale de detail de la soumission en cliquant sur la ligne dans le tableau.
2. Examinez attentivement tous les documents telecharges.
3. Cliquez sur le bouton **Approuver** en bas de la modale.
4. Dans le dialogue de confirmation :
   - Definissez la **Date d'expiration** pour la verification. La valeur par defaut est 1 an a compter d'aujourd'hui.
   - Ajustez optionnellement la date si une periode plus courte ou plus longue est appropriee.
5. Cliquez sur **Confirmer l'approbation**.

### Ce qui se passe apres l'approbation

- Le profil de l'eleveur recoit le badge verifie immediatement.
- L'eleveur est notifie par email et notification dans l'application.
- Le statut de la soumission passe a **Approuve** dans le tableau.
- La date d'expiration apparait dans la colonne Expiration.
- Lorsque la date d'expiration est atteinte, le statut passe automatiquement a **Expire**.

> **Conseil :** Pour les nouveaux eleveurs avec une documentation limitee, envisagez de definir une expiration plus courte (6 mois) pour declencher une re-verification plus precoce.

---

## Rejeter une soumission

Pour rejeter une demande de verification d'eleveur :

1. Ouvrez la modale de detail de la soumission.
2. Examinez les documents et identifiez le(s) probleme(s).
3. Cliquez sur le bouton **Rejeter** en bas de la modale.
4. Dans le dialogue de rejet :
   - Saisissez un **Motif de rejet** dans la zone de texte. Ce champ est obligatoire.
   - Soyez specifique sur ce qui manque ou est inadequat.
5. Cliquez sur **Confirmer le rejet**.

### Ce qui se passe apres le rejet

- Le statut de la soumission passe a **Rejete**.
- Le motif de rejet est visible par l'eleveur dans son tableau de bord.
- L'eleveur recoit une notification expliquant le rejet.
- L'eleveur peut creer une nouvelle soumission pour corriger les problemes.

### Rediger de bons motifs de rejet

| A faire | A ne pas faire |
|---------|----------------|
| "Le document d'enregistrement de l'elevage est expire (2019). Veuillez telecharger un enregistrement a jour." | "Documents pas assez bons." |
| "La photo de l'installation est trop floue pour verifier les conditions. Veuillez resoumettre avec des images plus claires." | "Mauvaises photos." |
| "Dossiers de vaccination manquants pour les animaux reproducteurs." | "Incomplet." |

> **Conseil :** Des motifs de rejet clairs reduisent les allers-retours et aident les eleveurs a soumettre des candidatures completes lors de leur prochaine tentative.

---

## Revocation de la verification

La revocation retire immediatement le statut verifie d'un eleveur. Utilisez-la pour les violations de politique ou la documentation frauduleuse decouverte apres l'approbation.

1. Naviguez vers le tableau des demandes de verification.
2. Filtrez par **Statut : Approuve** pour trouver les verifications actives.
3. Cliquez sur la ligne pour ouvrir le detail de la soumission.
4. Cliquez sur le bouton **Revoquer** (apparait uniquement pour les soumissions Approuvees).
5. Dans le dialogue de revocation :
   - Saisissez le **Motif de revocation**. Ce champ est obligatoire.
   - Confirmez que vous comprenez que l'action est immediate.
6. Cliquez sur **Confirmer la revocation**.

### Ce qui se passe apres la revocation

- Le badge verifie est retire du profil de l'eleveur immediatement.
- L'eleveur est notifie par email avec le motif de revocation.
- Toutes les annonces actives de l'eleveur affichent un indicateur d'avertissement.
- Le statut de la soumission passe a **Revoque** (etat terminal).
- L'eleveur ne peut pas resoumettre sur la meme soumission ; il doit recommencer de zero.

> **Conseil :** La revocation est une action serieuse. Documentez le motif de maniere approfondie en cas de litiges. Envisagez de contacter l'eleveur avant de revoquer si le probleme est mineur.

---

## Vue chronologique

La Vue chronologique fournit un historique visuel du parcours de verification d'un eleveur.

1. Ouvrez n'importe quelle modale de detail de soumission.
2. Passez a l'onglet **Historique des soumissions**.
3. La chronologie affiche les evenements dans l'ordre chronologique :
   - Soumission creee
   - Documents telecharges
   - Examen par l'administrateur commence
   - Statut modifie (avec le nom de l'examinateur)
   - Avertissements d'expiration envoyes
   - Resoumissions liees

### Lecture de la chronologie

Chaque entree de la chronologie affiche :

- **Date et heure** de l'evenement
- **Type d'evenement** icone (document, changement de statut, notification)
- **Acteur** (nom de l'eleveur ou nom de l'administrateur)
- **Details** (texte du motif, noms des documents, date d'expiration definie)

### Cas d'utilisation de la chronologie

- **Resolution de litiges :** Voir l'historique complet quand un eleveur conteste un rejet.
- **Piste d'audit :** Suivre quel administrateur a examine et approuve/rejete chaque soumission.
- **Detection de schemas :** Identifier les eleveurs qui soumettent de maniere repetee une documentation inadequate.

> **Conseil :** La chronologie est en lecture seule. Toutes les actions (approuver, rejeter, revoquer) doivent etre effectuees depuis l'onglet Soumission actuelle.

---

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| Entree | Ouvrir la soumission selectionnee |
| Echap | Fermer la modale |
| Tab | Basculer entre les onglets de la modale |
| Touches flechees | Naviguer entre les documents dans l'apercu |

---

## Questions frequentes

**Q : Puis-je approuver une soumission sous conditions ?**
R : Non. Les approbations sont inconditionnelles. Si les documents sont partiellement acceptables, rejetez avec des instructions specifiques sur ce qu'il faut corriger, puis approuvez la resoumission.

**Q : Que se passe-t-il pour les annonces d'un eleveur quand sa verification expire ?**
R : Les annonces restent actives mais le badge verifie est retire. L'eleveur est notifie 30 jours avant l'expiration pour encourager la resoumission.

**Q : Un eleveur revoque peut-il refaire une demande ?**
R : Oui, mais il doit creer une soumission entierement nouvelle. La soumission revoquee precedente reste dans l'historique a des fins d'audit.

**Q : Qui peut effectuer les actions de verification ?**
R : Seuls les administrateurs ayant le role de Gestionnaire de verification peuvent approuver, rejeter ou revoquer des soumissions.
