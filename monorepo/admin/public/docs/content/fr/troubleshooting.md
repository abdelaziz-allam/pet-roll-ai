# Depannage

Solutions aux problemes courants que vous pouvez rencontrer lors de l'utilisation du portail d'administration Petfolioo.

---

## Problemes de connexion

### Je ne peux pas me connecter

**Probleme :** Vous entrez vos identifiants mais la connexion echoue ou un message d'erreur s'affiche.

**Causes possibles :**
- Adresse email ou mot de passe incorrect
- Votre compte a ete desactive par un Super Admin
- Le service d'authentification est temporairement indisponible
- Votre compte n'a pas encore ete cree dans le portail d'administration

**Solution :**
1. Verifiez que vous utilisez l'adresse email associee a votre compte admin (pas votre email personnel ou d'utilisateur de l'app).
2. Assurez-vous que le verrouillage des majuscules est desactive et qu'il n'y a pas d'espaces en fin de mot de passe.
3. Essayez de reinitialiser votre mot de passe en utilisant le lien "Mot de passe oublie".
4. Si le probleme persiste, contactez un Super Admin pour confirmer que votre compte existe et est actif.
5. Si le service semble etre indisponible, attendez quelques minutes et reessayez.

---

### J'ai oublie mon mot de passe

**Probleme :** Vous ne vous souvenez plus de votre mot de passe du portail d'administration.

**Causes possibles :**
- Le mot de passe a ete modifie et non sauvegarde
- Utilisation d'identifiants d'un autre systeme

**Solution :**
1. Sur la page de connexion, cliquez sur "Mot de passe oublie".
2. Entrez l'adresse email associee a votre compte admin.
3. Verifiez votre boite de reception (et le dossier spam) pour l'email de reinitialisation.
4. Cliquez sur le lien de reinitialisation et creez un nouveau mot de passe.
5. Si vous ne recevez pas l'email dans les 5 minutes, contactez un Super Admin pour reinitialiser manuellement votre compte.

---

### Ma session a expire

**Probleme :** Vous etiez connecte mais avez ete soudainement redirige vers la page de connexion.

**Causes possibles :**
- Votre session a depasse le delai d'expiration automatique (generalement 30 minutes d'inactivite)
- Un Super Admin a modifie les parametres de votre compte ou votre role
- Le serveur a ete redemarre lors d'un deploiement

**Solution :**
1. Reconnectez-vous avec vos identifiants. Votre travail non sauvegarde peut etre perdu.
2. Si les sessions expirent tres frequemment, assurez-vous que votre navigateur ne bloque pas les cookies pour le domaine du portail d'administration.
3. Sauvegardez regulierement votre travail pour eviter la perte de donnees due aux expirations de session.

---

## Problemes de permissions

### Je ne vois pas une page a laquelle je devrais avoir acces

**Probleme :** Un lien de navigation ou une page que vous vous attendez a pouvoir consulter n'est pas visible ou affiche un ecran vide.

**Causes possibles :**
- Votre role n'inclut pas la permission de consulter cette page
- Votre role a ete recemment modifie et le changement n'a pas encore pris effet
- Un probleme de cache du navigateur affiche une version obsolete de la navigation

**Solution :**
1. Verifiez votre role actuel en consultant votre profil ou en demandant a un Super Admin. Consultez le guide Roles et permissions pour voir quelles pages votre role peut acceder.
2. Si votre role a ete recemment modifie, deconnectez-vous et reconnectez-vous pour actualiser vos permissions.
3. Videz le cache de votre navigateur ou essayez d'ouvrir le portail dans une fenetre privee/navigation privee.
4. Si vous pensez que votre role devrait accorder l'acces a cette page, contactez un Super Admin pour revoir vos permissions.

---

### Des boutons sont absents d'une page

**Probleme :** Vous pouvez voir une page mais certains boutons d'action (Edit, Delete, Approve, etc.) ne sont pas affiches.

**Causes possibles :**
- Votre role a un acces en lecture seule a cette page (ex. : role Viewer)
- L'element est dans un etat ou ces actions ne sont pas disponibles (ex. : deja approuve)
- Un probleme de rendu UI

**Solution :**
1. Consultez la documentation Roles et permissions pour confirmer si votre role dispose d'un acces en ecriture a cette fonctionnalite.
2. Verifiez que le statut actuel de l'element permet l'action attendue (ex. : vous ne pouvez pas approuver une verification deja approuvee).
3. Actualisez la page. Si les boutons n'apparaissent toujours pas, essayez un autre navigateur.
4. Si votre role devrait avoir ces boutons, contactez un Super Admin.

---

### J'obtiens une erreur 403

**Probleme :** Le portail affiche une erreur "403 Forbidden" lorsque vous essayez d'acceder a une page ou d'effectuer une action.

**Causes possibles :**
- Vous tentez une action que votre role ne permet explicitement pas
- Votre jeton de session est devenu invalide
- Votre role a ete retrograde alors que vous etiez connecte

**Solution :**
1. Notez quelle page ou action a declenche l'erreur.
2. Deconnectez-vous et reconnectez-vous pour actualiser votre session et vos permissions.
3. Si l'erreur persiste, votre role n'a pas acces a cette ressource. Contactez un Super Admin si vous avez besoin de permissions elevees.

---

## Problemes de donnees

### Mes modifications ne s'affichent pas

**Probleme :** Vous avez modifie un enregistrement (animal, utilisateur, article de blog, etc.) mais les modifications ne sont pas refletees dans le portail.

**Causes possibles :**
- L'operation de sauvegarde a echoue silencieusement en raison d'un probleme reseau
- Votre navigateur affiche une version en cache de la page
- Un autre administrateur a ecrase vos modifications simultanement

**Solution :**
1. Actualisez la page en utilisant Ctrl+Shift+R (ou Cmd+Shift+R sur Mac) pour contourner le cache.
2. Verifiez si l'enregistrement affiche vos modifications. Sinon, reappliquez la modification et surveillez les messages d'erreur lors de la sauvegarde.
3. Assurez-vous d'avoir une connexion Internet stable.
4. Si vous travaillez sur des enregistrements partages, coordonnez-vous avec les autres administrateurs pour eviter les modifications conflictuelles.

---

### L'export ne fonctionne pas

**Probleme :** Cliquer sur le bouton Export ne fait rien, ou le fichier telecharge est vide ou corrompu.

**Causes possibles :**
- Votre navigateur bloque le telechargement (bloqueur de pop-up ou restrictions de telechargement)
- Le jeu de donnees est trop volumineux et l'export a expire
- Votre role ne dispose pas des permissions d'export

**Solution :**
1. Verifiez si votre navigateur a bloque un telechargement ou un pop-up. Cherchez une notification dans la barre d'adresse.
2. Desactivez tout bloqueur de pop-up pour le domaine du portail d'administration.
3. Si le jeu de donnees est tres volumineux, essayez d'appliquer des filtres pour reduire le nombre d'enregistrements avant d'exporter.
4. Essayez un format d'export different (ex. : CSV au lieu de PDF) car il peut etre traite plus rapidement.
5. Si le probleme persiste, contactez un Super Admin pour verifier que votre role inclut les permissions d'export.

---

### La recherche ne retourne aucun resultat

**Probleme :** Vous recherchez un enregistrement dont vous savez qu'il existe mais obtenez un ensemble de resultats vide.

**Causes possibles :**
- Une faute de frappe ou un espace supplementaire dans la requete de recherche
- Le champ de recherche filtre sur une colonne specifique (ex. : recherche par nom alors que vous avez entre un identifiant)
- L'enregistrement a ete supprime ou est dans un statut different de celui attendu

**Solution :**
1. Supprimez les espaces supplementaires de votre requete de recherche.
2. Essayez de rechercher avec moins de caracteres ou une correspondance partielle.
3. Verifiez sur quel champ la recherche filtre et assurez-vous que votre requete correspond a ce type de champ.
4. Supprimez les filtres actifs qui pourraient exclure l'enregistrement.
5. Si vous recherchez un animal par identifiant de micropuce, assurez-vous d'entrer l'identifiant numerique complet sans tirets.

---

## Problemes de notifications

### La notification push n'a pas ete delivree

**Probleme :** Vous avez envoye une notification push mais les utilisateurs cibles signalent ne pas l'avoir recue.

**Causes possibles :**
- L'utilisateur a desactive les notifications push sur son appareil
- Le jeton d'appareil de l'utilisateur a expire (l'app a ete desinstallee puis reinstallee)
- La notification a ete envoyee au mauvais segment d'utilisateurs
- Il y a un delai dans le service de livraison des notifications push

**Solution :**
1. Verifiez le journal de livraison des notifications dans la page Notifications pour voir le statut d'envoi.
2. Verifiez que vous avez selectionne la bonne audience cible (utilisateur specifique, segment ou tous les utilisateurs).
3. Notez que les notifications push peuvent prendre quelques minutes pour etre delivrees selon l'appareil et les conditions reseau.
4. Si un utilisateur specifique ne recoit systematiquement pas les notifications, son jeton d'appareil peut etre invalide. Il devrait ouvrir l'app et reactiver les notifications dans les parametres de son appareil.
5. Pour les notifications diffusees, prevoyez jusqu'a 15 minutes pour que la livraison soit complete aupres de tous les utilisateurs.

---

### Je ne peux pas envoyer de notifications

**Probleme :** Le bouton "Send Notification" est desactive ou vous recevez une erreur lors de la tentative d'envoi.

**Causes possibles :**
- Votre role ne dispose pas des permissions d'envoi de notifications (Viewer et certains Moderator)
- Les champs obligatoires (titre, corps, audience cible) ne sont pas remplis
- Le service de notification est temporairement indisponible

**Solution :**
1. Assurez-vous que tous les champs obligatoires sont remplis : titre, corps du message et au moins une selection d'audience cible.
2. Verifiez que votre role a la permission d'envoyer des notifications (role Admin ou Super Admin requis).
3. Si tous les champs sont remplis et que vous avez le role correct, essayez d'actualiser la page et de reessayer.
4. Si l'erreur mentionne un probleme de service, attendez quelques minutes et reessayez. Si le probleme persiste pendant plus de 30 minutes, signalez-le a l'equipe technique.

---

## Problemes de navigateur

### La page ne se charge pas

**Probleme :** Le portail d'administration affiche une page blanche, un indicateur de chargement qui ne se termine jamais ou une erreur de connexion.

**Causes possibles :**
- Probleme de connectivite Internet
- Le service du portail d'administration est en panne ou en cours de redemarrage
- Des extensions de navigateur interferent avec le chargement de la page
- Un DNS ou pare-feu bloque le domaine du portail

**Solution :**
1. Verifiez votre connexion Internet en visitant un autre site web.
2. Essayez d'actualiser la page avec Ctrl+Shift+R (ou Cmd+Shift+R sur Mac).
3. Essayez d'ouvrir le portail dans une fenetre privee/navigation privee pour eliminer les conflits d'extensions.
4. Videz le cache et les cookies de votre navigateur pour le domaine du portail.
5. Si vous utilisez un reseau d'entreprise, verifiez si un pare-feu ou un proxy bloque l'acces.
6. Si le portail est indisponible pour tout le monde, un deploiement peut etre en cours. Attendez 5 a 10 minutes et reessayez.

---

### Les images/captures d'ecran sont cassees

**Probleme :** Les images du portail (photos d'animaux, images de blog, captures d'ecran dans la documentation) apparaissent sous forme d'icones cassees ou ne se chargent pas.

**Causes possibles :**
- Le service de stockage d'images est temporairement indisponible
- L'image a ete supprimee du stockage mais la reference subsiste
- Une politique de securite du contenu bloque le chargement des images
- Une connexion reseau lente provoque des delais d'expiration du chargement des images

**Solution :**
1. Actualisez la page pour retenter le chargement des images.
2. Verifiez si le probleme affecte toutes les images ou seulement certaines. Si seules des images specifiques sont cassees, elles ont peut-etre ete supprimees du stockage.
3. Faites un clic droit sur une image cassee et selectionnez "Ouvrir l'image dans un nouvel onglet". Si elle se charge separement, une extension de navigateur peut bloquer les images en ligne.
4. Desactivez temporairement les bloqueurs de publicites ou les extensions de securite pour tester.
5. Si le probleme affecte toutes les images du portail, signalez-le a l'equipe technique car le service de stockage peut necessiter une intervention.

---

### Le portail est lent

**Probleme :** Les pages mettent longtemps a se charger, les actions semblent lentes ou le portail ne repond plus.

**Causes possibles :**
- Connexion Internet lente
- Le navigateur a trop d'onglets ouverts consommant de la memoire
- De grands jeux de donnees sont charges sans pagination
- Le serveur est sous forte charge

**Solution :**
1. Testez votre vitesse Internet pour eliminer un probleme de connectivite.
2. Fermez les onglets de navigateur inutiles pour liberer de la memoire.
3. Si une page specifique est lente (ex. : Registre des animaux avec des milliers d'enregistrements), appliquez des filtres pour reduire la taille du jeu de donnees.
4. Videz le cache de votre navigateur, qui peut avoir grossi avec le temps.
5. Essayez un autre navigateur pour voir si le probleme est specifique au navigateur.
6. Si la lenteur est constante chez plusieurs administrateurs, il peut s'agir d'un probleme cote serveur. Signalez-le a l'equipe technique en precisant les pages concernees et les temps de reponse approximatifs.
