# Notifications

La page Notifications permet aux administrateurs de composer et d'envoyer des notifications push aux utilisateurs de l'application mobile Petfolioo. Vous pouvez cibler des segments d'audience specifiques, consulter l'historique des notifications et suivre les bonnes pratiques pour une communication efficace.

![Notifications](/docs/screenshots/notifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Send, Delete |
> | Admin | View, Send |
> | Moderator | View |
> | Viewer | View only |

---

## Vue d'ensemble

Les notifications push sont un canal direct vers vos utilisateurs. Utilisez-les pour annoncer de nouvelles fonctionnalites, partager des mises a jour importantes, envoyer des rappels ou engager des segments specifiques d'utilisateurs. Cette page fournit a la fois les outils de composition et un journal historique de toutes les notifications precedemment envoyees.

---

## Composer une notification

Le compositeur de notifications est l'outil principal pour creer et envoyer des notifications push aux utilisateurs de l'application.

### Acceder au compositeur

1. Naviguez vers la page **Notifications** depuis le menu de la barre laterale.
2. Le formulaire de composition est affiche en haut de la page.

### Champs du formulaire

| Champ | Description | Exigences |
|-------|-------------|-----------|
| **Titre** | Le titre de la notification affiche de maniere proeminente sur l'appareil de l'utilisateur | Obligatoire. Maximum 65 caracteres recommandes pour une visibilite complete. |
| **Corps du message** | Le contenu detaille de la notification | Obligatoire. Maximum 240 caracteres recommandes. |
| **Audience** | Le groupe cible d'utilisateurs qui recevra cette notification | Obligatoire. Selectionnez parmi les segments predefinis. |

---

## Composer une notification

Suivez ces etapes pour creer et envoyer une notification :

### Etape 1 : Saisir le titre

1. Cliquez sur le champ de saisie **Titre**.
2. Tapez un titre concis et accrocheur.
3. Gardez-le sous 65 caracteres pour eviter la troncature sur les appareils plus petits.

> **Conseil :** Utilisez un langage oriente vers l'action dans les titres. "Nouveau : Suivez les vaccinations de votre animal" est plus engageant que "Mise a jour fonctionnalite vaccination".

### Etape 2 : Rediger le corps du message

1. Cliquez sur la zone de texte **Corps du message**.
2. Redigez le message detaille que vous souhaitez que les utilisateurs voient.
3. Incluez les informations pertinentes telles que l'action que l'utilisateur doit effectuer.
4. Gardez le message sous 240 caracteres pour un affichage optimal.

### Etape 3 : Selectionner l'audience

1. Cliquez sur le selecteur deroulant **Audience**.
2. Choisissez l'un des segments d'audience suivants :

| Audience | Description |
|----------|-------------|
| **Tous les utilisateurs** | Envoie la notification a chaque utilisateur enregistre de l'application |
| **Proprietaires de chiens** | Cible les utilisateurs ayant au moins un chien enregistre dans leur profil |
| **Proprietaires de chats** | Cible les utilisateurs ayant au moins un chat enregistre dans leur profil |
| **Eleveurs verifies** | Cible les utilisateurs ayant ete verifies comme eleveurs professionnels |

3. L'audience selectionnee determine qui recevra la notification push.

> **Remarque :** Un utilisateur peut appartenir a plusieurs segments. Par exemple, un eleveur verifie qui possede des chiens recevra les notifications ciblees pour "Proprietaires de chiens", "Eleveurs verifies" et "Tous les utilisateurs".

### Etape 4 : Relire avant l'envoi

1. Verifiez le titre pour les fautes de frappe et la clarte.
2. Relisez le corps du message pour l'exactitude et le ton.
3. Confirmez que le segment d'audience est correct.
4. Verifiez que ce n'est pas un doublon d'une notification recemment envoyee.

---

## Confirmation d'envoi

Lorsque vous etes pret a envoyer la notification, une etape de confirmation garantit que vous n'envoyez pas accidentellement a la mauvaise audience.

### Processus d'envoi

1. Cliquez sur le bouton **Envoyer la notification**.
2. Un dialogue de confirmation apparait affichant :
   - Le titre de la notification
   - Le corps du message
   - Le segment d'audience selectionne
   - Le nombre estime de destinataires
3. Verifiez tous les details dans le dialogue de confirmation.
4. Cliquez sur **Confirmer l'envoi** pour envoyer la notification.
5. Alternativement, cliquez sur **Annuler** pour revenir au compositeur et effectuer des modifications.
6. Apres une livraison reussie, un message de succes apparait confirmant que la notification a ete mise en file d'attente.

> **Important :** Une fois confirmee, la notification ne peut pas etre rappelee. Verifiez toujours l'audience et le contenu avant de confirmer.

---

## Historique des notifications

Sous le formulaire de composition, la section Historique des notifications affiche une liste chronologique de toutes les notifications precedemment envoyees.

### Colonnes de la liste historique

| Colonne | Description |
|---------|-------------|
| **Tag de type** | Un tag colore indiquant le segment d'audience (ex. : "Tous les utilisateurs" en bleu, "Proprietaires de chiens" en orange) |
| **Titre** | Le titre de la notification tel qu'il a ete envoye |
| **Message** | Un apercu du corps du message (tronque si long) |
| **Date** | La date et l'heure d'envoi de la notification |
| **Nombre de destinataires** | Le nombre d'utilisateurs qui ont recu la notification |

### Consulter l'historique

1. Faites defiler sous le formulaire de composition pour voir la liste historique.
2. Les notifications sont listees en ordre chronologique inverse (les plus recentes d'abord).
3. Chaque ligne montre le tag de type, le titre, la date et le nombre de destinataires en un coup d'oeil.
4. Cliquez sur n'importe quelle ligne pour developper et voir le corps complet du message.

### Comprendre les tags de type

Les tags de type sont codes par couleur pour une identification rapide :

| Couleur du tag | Audience |
|----------------|----------|
| Bleu | Tous les utilisateurs |
| Orange | Proprietaires de chiens |
| Violet | Proprietaires de chats |
| Vert | Eleveurs verifies |

---

## Bonnes pratiques pour les notifications push

Des notifications push efficaces stimulent l'engagement sans ennuyer les utilisateurs. Suivez ces directives :

### Frequence

1. **Limitez la frequence** -- N'envoyez pas plus de 2-3 notifications par semaine sauf urgence.
2. **Regroupez les mises a jour connexes** -- Combinez plusieurs petites mises a jour en une seule notification.
3. **Respectez les fuseaux horaires** -- Envoyez les notifications a des heures raisonnables (9h - 20h heure locale).
4. **Evitez les week-ends** -- Sauf si la notification est urgente, privilegiez les jours de semaine.

### Qualite du contenu

1. **Soyez concis** -- Allez droit au but rapidement. Les utilisateurs decident en quelques secondes s'ils s'engagent.
2. **Soyez actionnable** -- Dites aux utilisateurs ce qu'ils peuvent faire : "Verifiez les prochaines vaccinations de votre animal."
3. **Soyez pertinent** -- Utilisez le ciblage d'audience pour garantir que le contenu correspond aux interets de l'utilisateur.
4. **Evitez l'appat a clic** -- Les notifications trompeuses erodent la confiance et augmentent les taux de desabonnement.
5. **Personnalisez si possible** -- Faites reference au segment d'audience : "Chers proprietaires de chiens" semble plus personnel.

### Timing et contexte

1. **Nouvelles fonctionnalites** -- Envoyez quand la fonctionnalite est en ligne et accessible.
2. **Rappels de sante** -- Envoyez quelques jours avant le rendez-vous ou la vaccination d'un animal.
3. **Contenu saisonnier** -- Alignez avec les saisons (ex. : rappels anti-puces/tiques au printemps).
4. **Mises a jour d'urgence** -- Pour les problemes urgents (maintenance, securite), envoyez immediatement quelle que soit la regle de timing.

### Rediger des titres efficaces

| Bon exemple | Pourquoi ca fonctionne |
|-------------|------------------------|
| "La vaccination de votre animal arrive bientot" | Pertinent, cree l'urgence, action claire |
| "Nouveau : Suivi de gestation pour les eleveurs" | Met en avant la nouvelle valeur, cible l'audience |
| "Maintenance ce soir a 22h" | Clair, specifique, urgent |

| Mauvais exemple | Pourquoi ca echoue |
|-----------------|-------------------|
| "Regardez ca !" | Vague, pas de proposition de valeur |
| "Mise a jour" | Trop generique, les utilisateurs ignoreront |
| "Important !!!" | Abuse de l'urgence, semble spam |

### Mesurer le succes

Apres l'envoi de notifications, surveillez :

- **Taux d'ouverture** -- Les utilisateurs s'engagent-ils avec vos notifications ?
- **Taux de desabonnement** -- Un pic indique une fatigue de notification.
- **Activite dans l'application** -- Une notification genere-t-elle le comportement attendu ?
- **Retours** -- Consultez la page Retours pour les reactions des utilisateurs.

---

## Details des segments d'audience

### Tous les utilisateurs

- Inclut chaque compte enregistre dans le systeme.
- Utilisez pour les annonces a l'echelle de la plateforme, les avis de maintenance ou les fonctionnalites universelles.
- Plus grande audience -- utilisez avec parcimonie pour eviter la fatigue de notification.

### Proprietaires de chiens

- Inclut les utilisateurs ayant au moins un chien dans leur profil d'animal.
- Utilisez pour les conseils de sante specifiques aux chiens, les evenements de race ou les mises a jour de fonctionnalites.
- Exemple : "Rappel : Prevention annuelle contre les vers du coeur pour les chiens."

### Proprietaires de chats

- Inclut les utilisateurs ayant au moins un chat dans leur profil d'animal.
- Utilisez pour le contenu specifique aux chats, les conseils de sante en interieur ou les fonctionnalites felines.
- Exemple : "Nouveau : Suivi d'activite en interieur pour les chats."

### Eleveurs verifies

- Inclut les utilisateurs ayant complete la verification d'eleveur.
- Utilisez pour les fonctionnalites specifiques a l'elevage, les mises a jour de conformite ou les outils professionnels.
- Exemple : "Ameliorations du suivi de gestation maintenant disponibles."

---

## Resolution de problemes

| Probleme | Solution |
|----------|----------|
| La notification ne s'envoie pas | Verifiez que tous les champs obligatoires sont remplis. Verifiez la connectivite reseau. |
| Le nombre de destinataires affiche 0 | Le segment d'audience selectionne peut etre vide. Verifiez que des utilisateurs existent dans ce segment. |
| Les utilisateurs rapportent ne pas recevoir | Les utilisateurs peuvent avoir desactive les notifications push sur leur appareil. Ceci est hors du controle de l'administrateur. |
| Notification en double envoyee | Consultez la liste historique avant d'envoyer. Il n'y a pas d'annulation une fois confirmee. |

---

## Pages associees

- [Retours](./feedback.md) -- Surveiller les reactions des utilisateurs aux notifications
- [Analyses](./analytics.md) -- Suivre les tendances d'engagement des utilisateurs
- [Parametres](./settings.md) -- Configurer les parametres systeme lies aux notifications
