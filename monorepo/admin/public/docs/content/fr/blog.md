# Blog CMS

Le module Blog CMS permet aux administrateurs de creer, modifier, publier et gerer les articles de blog affiches sur le site web public Petfolioo. Utilisez cet outil pour partager des conseils de soins pour animaux, des actualites de la plateforme, des portraits d'eleveurs et du contenu educatif avec votre communaute.

![Blog CMS](/docs/screenshots/blog.png)

---

## Tableau des articles de blog

La vue principale affiche tous les articles de blog dans un tableau triable et consultable.

| Colonne | Description |
|---------|-------------|
| Titre | Titre de l'article avec lien cliquable pour editer |
| Statut | Badge de statut de publication |
| Auteur | Nom de l'administrateur qui a cree l'article |
| Vues | Total des pages vues depuis la publication |
| Date | Date de creation (ou date de publication si publie) |

### Badges de statut

| Statut | Couleur du badge | Description |
|--------|------------------|-------------|
| Brouillon | Gris | L'article est enregistre mais non visible par le public |
| Publie | Vert | L'article est en ligne et visible sur le site web |
| Mis en avant | Or | L'article est publie et epingle en haut |

### Actions du tableau

- Cliquez sur un titre d'article pour l'ouvrir en edition.
- Utilisez le menu d'action (trois points) sur chaque ligne pour les actions rapides : Publier, Depublier, Epingler, Desepingler, Supprimer.
- Triez par n'importe quelle colonne en cliquant sur l'en-tete de colonne.
- Utilisez la barre de recherche pour filtrer les articles par titre ou mots-cles du contenu.

> **Conseil :** Triez par Vues decroissantes pour identifier votre contenu le plus populaire. Utilisez ces informations pour planifier de futurs articles sur des sujets similaires.

---

## Creer un article

Pour creer un nouvel article de blog :

1. Cliquez sur le bouton **Creer un article** dans le coin superieur droit du tableau des articles.
2. L'editeur d'article s'ouvre avec les champs suivants.

### Titre

- Saisissez le titre de l'article dans le champ titre en haut.
- Maximum 200 caracteres.
- Le titre apparait comme titre principal sur la page publiee.
- Choisissez des titres descriptifs et engageants qui incluent des mots-cles pertinents.

### Slug

- Le slug URL est genere automatiquement a partir du titre.
- Format : minuscules, les espaces sont remplaces par des tirets, les caracteres speciaux sont supprimes.
- Exemple : "10 Conseils pour les nouveaux proprietaires de chiots" devient `10-conseils-pour-les-nouveaux-proprietaires-de-chiots`.
- Vous pouvez modifier manuellement le slug si la version generee automatiquement est trop longue ou peu claire.
- Le slug doit etre unique parmi tous les articles.

> **Conseil :** Gardez les slugs courts et riches en mots-cles pour un meilleur SEO. Raccourcissez manuellement les slugs generes automatiquement qui depassent 5-6 mots.

### Contenu HTML

- La zone de contenu principal accepte le HTML pour un formatage enrichi.
- Utilisez la barre d'outils de l'editeur de texte riche pour le formatage courant :
  - Gras, italique, souligne
  - Titres (H2, H3, H4)
  - Listes ordonnees et non ordonnees
  - Liens
  - Images (en ligne)
  - Citations
  - Blocs de code
- Passez en **Mode source** pour editer le HTML brut directement.
- Le contenu prend en charge toutes les balises HTML standard.

#### Bonnes pratiques de contenu

| A faire | A ne pas faire |
|---------|----------------|
| Utiliser H2 pour les sections principales, H3 pour les sous-sections | Utiliser H1 (reserve pour le titre) |
| Inclure des images pour aererer les longs textes | Publier des murs de texte non formate |
| Garder les paragraphes courts (3-4 phrases) | Ecrire des paragraphes de plus de 5 phrases |
| Utiliser des listes pour les elements connexes multiples | Integrer des scripts externes ou des iframes |
| Ajouter du texte alternatif a toutes les images | Utiliser des styles en ligne pour les couleurs |

### Extrait

- Redigez un court resume de l'article (maximum 500 caracteres).
- L'extrait apparait dans les pages de liste du blog, les resultats de recherche et les apercu sur les reseaux sociaux.
- Si laisse vide, les 500 premiers caracteres du contenu sont utilises automatiquement.
- Un compteur de caracteres affiche les caracteres restants pendant la saisie.

> **Conseil :** Redigez l'extrait comme une accroche convaincante qui donne envie aux lecteurs de cliquer. Il doit fonctionner comme une pensee complete et ne pas se terminer en milieu de phrase.

### Image de couverture

1. Cliquez sur la zone **Telecharger l'image de couverture** ou glissez-deposez un fichier image.
2. Formats pris en charge : JPEG, PNG, WebP.
3. Dimensions recommandees : 1200 x 630 pixels (optimise pour le partage sur les reseaux sociaux).
4. Taille maximale du fichier : 5 Mo.
5. Apres le telechargement, un apercu de l'image apparait.
6. Cliquez sur **Supprimer** pour effacer l'image de couverture actuelle et en telecharger une differente.

#### Directives pour l'image de couverture

- Utilisez des images de haute qualite et pertinentes qui representent le contenu de l'article.
- Evitez les superpositions de texte sur les images de couverture (elles peuvent etre recadrees sur differents appareils).
- Assurez-vous d'avoir les droits d'utilisation de l'image (photos originales ou banque d'images correctement licenciee).
- Les images sont automatiquement optimisees pour la diffusion web apres le telechargement.

### Tags

- Saisissez les tags sous forme de valeurs separees par des virgules dans le champ tags.
- Exemple : `soins chiot, dressage, nutrition, nouveaux proprietaires`
- Les tags aident a categoriser les articles et ameliorent la decouverte.
- Les tags existants sont suggeres automatiquement pendant la saisie.
- Il n'y a pas de limite au nombre de tags, mais 3-7 tags par article est recommande.

> **Conseil :** Utilisez une nomenclature coherente pour les tags dans tous les articles. Verifiez les tags existants avant d'en creer de nouvelles variations (par exemple, utilisez "soins chiot" de maniere coherente plutot que d'alterner avec "soins-chiot" ou "Soins Chiot").

### Parametres SEO

La section SEO vous permet d'optimiser la facon dont l'article apparait dans les moteurs de recherche.

#### Meta titre

- Maximum 60 caracteres.
- Apparait comme titre cliquable dans les resultats de recherche.
- Si laisse vide, le titre de l'article est utilise.
- Le compteur de caracteres devient rouge lorsqu'il approche ou depasse 60 caracteres.
- Bonne pratique : Incluez le mot-cle principal pres du debut.

#### Meta description

- Maximum 160 caracteres.
- Apparait comme extrait de description sous le titre dans les resultats de recherche.
- Si laisse vide, l'extrait est utilise.
- Le compteur de caracteres devient rouge lorsqu'il approche ou depasse 160 caracteres.
- Bonne pratique : Incluez un appel a l'action et le mot-cle principal.

#### Apercu SEO

Sous les champs meta, un apercu montre comment l'article apparaitra dans les resultats de recherche Google :

```
+--------------------------------------------------+
| Meta titre (ou Titre de l'article si vide)       |
| https://petfolioo.com/blog/votre-slug-ici        |
| La Meta description (ou l'Extrait si vide)       |
| apparait ici comme dans les resultats...         |
+--------------------------------------------------+
```

> **Conseil :** Remplissez toujours le meta titre et la meta description manuellement. Les valeurs generees automatiquement a partir du titre et de l'extrait peuvent ne pas etre optimisees pour l'intention de recherche.

### Enregistrer un brouillon

1. Apres avoir rempli les champs souhaites, cliquez sur **Enregistrer le brouillon**.
2. L'article est enregistre avec le statut Brouillon.
3. Vous pouvez revenir le modifier a tout moment depuis le tableau des articles.
4. Les brouillons ne sont pas visibles par le public.

---

## Publier un article

Pour publier un article brouillon et le rendre visible sur le site web :

1. Ouvrez l'article depuis le tableau des articles.
2. Verifiez tout le contenu, les images et les parametres SEO.
3. Cliquez sur le bouton **Publier** dans le coin superieur droit.
4. Dans le dialogue de confirmation :
   - Verifiez le titre et le slug de l'article.
   - Confirmez la publication.
5. Cliquez sur **Confirmer la publication**.

### Ce qui se passe apres la publication

- Le statut de l'article passe a **Publie**.
- L'article devient immediatement visible sur la page blog publique.
- La date de publication est enregistree (utilisee pour le tri sur le blog).
- L'URL de l'article devient active : `https://petfolioo.com/blog/[slug]`.
- Les moteurs de recherche peuvent maintenant indexer l'article.

### Checklist de publication

Avant de publier, verifiez :

- [ ] Le titre est clair, engageant et sans fautes
- [ ] Le contenu est complet et correctement formate
- [ ] Toutes les images se chargent correctement
- [ ] Les liens fonctionnent et s'ouvrent dans les onglets appropries
- [ ] L'image de couverture est telechargee et a bonne apparence
- [ ] L'extrait est redige et fait moins de 500 caracteres
- [ ] Les tags sont ajoutes et correctement formates
- [ ] Le meta titre fait moins de 60 caracteres
- [ ] La meta description fait moins de 160 caracteres
- [ ] Le slug est propre et riche en mots-cles

---

## Depublier un article

Pour retirer un article publie du site web public :

1. Trouvez l'article dans le tableau des articles.
2. Cliquez sur le menu d'action (trois points) sur la ligne.
3. Selectionnez **Depublier**.
4. Confirmez l'action dans le dialogue.

### Ce qui se passe apres la depublication

- Le statut de l'article repasse a **Brouillon**.
- L'article est immediatement retire de la page blog publique.
- L'URL renvoie une page 404.
- Le compteur de vues est conserve.
- Vous pouvez republier l'article a tout moment.

> **Conseil :** Depubliez plutot que supprimer si vous souhaitez retirer temporairement du contenu. Les articles depublies conservent toutes leurs donnees et peuvent etre restaures instantanement.

---

## Epingler/Desepingler comme mis en avant

Les articles mis en avant apparaissent en evidence en haut de la page blog, au-dessus des listes chronologiques.

### Epingler un article

1. Trouvez un article publie dans le tableau des articles.
2. Cliquez sur le menu d'action (trois points).
3. Selectionnez **Epingler comme mis en avant**.
4. Le badge de statut passe a **Mis en avant** (or).

### Desepingler un article

1. Trouvez l'article mis en avant dans le tableau.
2. Cliquez sur le menu d'action (trois points).
3. Selectionnez **Desepingler**.
4. Le statut revient a **Publie** (vert).

### Regles des articles mis en avant

- Seuls les articles publies peuvent etre epingles.
- Plusieurs articles peuvent etre mis en avant simultanement.
- Les articles mis en avant s'affichent dans l'ordre ou ils ont ete epingles (le plus recent en premier).
- Desepingler un article ne le depublie pas ; il reste publie.

> **Conseil :** Limitez les articles mis en avant a 2-3 a la fois. Trop d'articles mis en avant diluent l'emphase et poussent le contenu regulier sous la ligne de flottaison.

---

## Voir sur le site

Pour previsualiser l'apparence d'un article publie sur le site web public :

1. Ouvrez l'article depuis le tableau des articles.
2. Cliquez sur le lien **Voir sur le site** dans la zone superieure droite (a cote du bouton Publier).
3. Un nouvel onglet du navigateur s'ouvre montrant l'article sur le site web en direct.

### Notes

- Le lien Voir sur le site n'est disponible que pour les articles Publies et Mis en avant.
- Les articles brouillons ne peuvent pas etre previsualises sur le site en direct.
- Le lien ouvre la version en direct actuelle ; les modifications non enregistrees dans l'editeur ne sont pas refletees.

> **Conseil :** Consultez toujours le site apres la publication pour verifier que le formatage, les images et la mise en page apparaissent correctement dans le theme public.

---

## Supprimer un article

Pour supprimer definitivement un article de blog :

1. Trouvez l'article dans le tableau des articles.
2. Cliquez sur le menu d'action (trois points).
3. Selectionnez **Supprimer**.
4. Un dialogue de confirmation apparait :
   - Affiche le titre de l'article.
   - Avertit que la suppression est permanente.
   - Demande de taper le titre de l'article pour confirmer (pour les articles publies).
5. Cliquez sur **Confirmer la suppression**.

### Ce qui se passe apres la suppression

- L'article est definitivement supprime du systeme.
- L'URL renvoie une page 404.
- L'article ne peut pas etre recupere apres la suppression.
- Les statistiques de vues sont perdues.
- Le slug devient disponible pour reutilisation.

### Quand supprimer vs depublier

| Scenario | Action |
|----------|--------|
| Retrait temporaire de contenu | Depublier |
| Contenu obsolete qui pourrait etre mis a jour plus tard | Depublier |
| Articles de test ou doublons accidentels | Supprimer |
| Contenu qui n'aurait jamais du etre cree | Supprimer |
| Contenu juridiquement problematique | Supprimer |

> **Conseil :** La suppression est irreversible. En cas de doute, depubliez plutot. Vous pouvez toujours supprimer un article depublie plus tard, mais vous ne pouvez pas recuperer un article supprime.

---

## Telechargement d'images de couverture

Le composant de telechargement d'image de couverture prend en charge le flux de travail suivant :

### Methodes de telechargement

1. **Cliquer pour telecharger :** Cliquez sur la zone de telechargement pour ouvrir votre explorateur de fichiers.
2. **Glisser-deposer :** Glissez un fichier image depuis votre bureau directement sur la zone de telechargement.

### Processus de telechargement

1. Selectionnez ou deposez votre fichier image.
2. La barre de progression du telechargement apparait.
3. Une fois termine, l'apercu de l'image s'affiche dans la zone de telechargement.
4. L'URL de l'image est automatiquement enregistree avec l'article.

### Exigences d'image

| Exigence | Valeur |
|----------|--------|
| Formats | JPEG, PNG, WebP |
| Dimensions minimales | 600 x 315 pixels |
| Dimensions recommandees | 1200 x 630 pixels |
| Taille maximale du fichier | 5 Mo |
| Ratio d'aspect | 1.91:1 recommande (optimise reseaux sociaux) |

### Gestion des images telechargees

- **Remplacer :** Cliquez sur le bouton **Supprimer** sous l'apercu, puis telechargez une nouvelle image.
- **Previsualiser :** Cliquez sur l'apercu de l'image pour la voir en taille reelle.
- **Texte alternatif :** Saisissez un texte alternatif descriptif dans le champ sous l'image (important pour l'accessibilite et le SEO).

### Optimisation des images

Les images telechargees sont automatiquement :

- Compressees pour la diffusion web (en preservant la qualite).
- Servies via CDN pour un chargement rapide.
- Converties au format WebP pour les navigateurs qui le supportent.
- Redimensionnees en plusieurs dimensions pour un affichage responsive.

> **Conseil :** Preparez vos images de couverture a 1200 x 630 pixels avant de les telecharger. C'est la taille optimale pour l'affichage du blog et le partage sur les reseaux sociaux (Open Graph).

---

## Questions frequentes

**Q : Plusieurs administrateurs peuvent-ils modifier le meme article ?**
R : Oui, mais il n'y a pas de collaboration en temps reel. La derniere personne a enregistrer ecrase les modifications precedentes. Coordonnez-vous avec votre equipe pour eviter les conflits.

**Q : Y a-t-il un historique des revisions ?**
R : Non. Chaque enregistrement ecrase la version precedente. Copiez le contenu important ailleurs avant d'apporter des modifications majeures.

**Q : Puis-je programmer la publication d'un article a une date future ?**
R : Pas actuellement. Les articles sont soit des brouillons, soit immediatement publies. Enregistrez en brouillon et publiez manuellement au moment souhaite.

**Q : Que se passe-t-il pour le SEO si je change le slug d'un article publie ?**
R : L'ancienne URL renverra une 404. Les moteurs de recherche finiront par desindexer l'ancienne URL et indexer la nouvelle. Evitez de changer les slugs sur les articles etablis.

**Q : Puis-je integrer des videos dans les articles de blog ?**
R : Oui, utilisez le mode source HTML pour integrer des iframes video depuis YouTube ou Vimeo dans la zone de contenu.

**Q : Y a-t-il une limite de mots ou de caracteres pour le contenu d'un article ?**
R : Il n'y a pas de limite stricte sur la longueur du contenu. Cependant, les articles entre 800 et 2000 mots tendent a etre les plus performants pour le SEO et l'engagement des lecteurs.
