# Huisdiercategorieën

De module Huisdiercategorieën stelt beheerders in staat het classificatiesysteem te definiëren en beheren dat wordt gebruikt voor het organiseren van huisdieren op het Petfolioo-platform. Categorieën vertegenwoordigen huisdiersoorten of -typen en worden in de hele applicatie gebruikt voor filtering, zoeken en organisatie. Elke categorie bevat een naam, label, emoji-pictogram, beschrijving en actieve status.

![Pet Categories](/docs/screenshots/categories.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Categorieënlijst

De categorieënpagina toont alle gedefinieerde huisdiercategorieën in een tabelformaat met beheerbesturingen.

### Tabelkolommen

| Kolom | Beschrijving | Sorteerbaar |
|-------|-------------|:----------:|
| Naam-slug | Machinelaasbare identificatie (bijv. `dog`, `cat`, `bird`) | Ja |
| Label | Mensleesbare weergavenaam (bijv. "Hond", "Kat", "Vogel") | Ja |
| Emoji-pictogram | Visueel pictogram dat de categorie vertegenwoordigt | Nee |
| Beschrijving | Korte beschrijving van wat deze categorie omvat | Nee |
| Actief | Schakelaar die toont of de categorie actief is | Ja |
| Acties | Bewerken- en Verwijderen-knoppen | Nee |

### Statusindicatoren

| Actieve staat | Weergave | Betekenis |
|---------------|---------|---------|
| Actief | Groene schakelaar (aan-positie) | Categorie is beschikbaar voor huisdierregistratie en zichtbaar in filters |
| Inactief | Grijze schakelaar (uit-positie) | Categorie is verborgen voor gebruikers maar bestaande huisdieren behouden hun categorie |

### Tabelfuncties

1. **Sorteer** door op de kolommen Naam-slug, Label of Actief te klikken.
2. **Snel schakelen** door direct op de Actief-schakelaar in de tabelrij te klikken.
3. **Inline acties** via Bewerken (potloodpictogram) en Verwijderen (prullenbakpictogram) knoppen in elke rij.
4. **Paginering** onderaan voor het bladeren wanneer er veel categorieën bestaan.

> **Tip:** Inactieve categorieën worden weergegeven met een licht vervaagde rijstijl om ze visueel te onderscheiden van actieve categorieën.

---

## Een categorie aanmaken

Nieuwe categorieën kunnen worden aangemaakt om aanvullende huisdiersoorten of -typen op het platform te ondersteunen.

### Stappen om een categorie aan te maken

1. Klik op de knop **Categorie toevoegen** rechtsboven op de Categorieënpagina.
2. Er verschijnt een aanmaakformulier (als modal of inline formulier).
3. Vul de verplichte velden in:

| Veld | Verplicht | Beschrijving | Voorbeeld |
|------|:---------:|-------------|---------|
| Naam-slug | Ja | Machineleesbare identificatie | `goudvis` |
| Label | Ja | Weergavenaam getoond aan gebruikers | "Goudvis" |
| Emoji-pictogram | Ja | Visueel pictogram voor de categorie | "vis" |
| Beschrijving | Nee | Korte uitleg van de categorie | "Zoetwatervissoorten en zoutwatervissoorten" |
| Actief | Nee | Of direct te activeren (standaard actief) | Aan |

4. Selecteer een emoji-pictogram uit de **Emojikiezer** (zie hieronder).
5. Controleer uw invoer.
6. Klik op **Categorie aanmaken** om op te slaan.
7. De nieuwe categorie verschijnt in de lijsttabel.

### Naamslug-conventie

De naam-slug moet aan deze regels voldoen:

| Regel | Beschrijving | Voorbeeld |
|-------|-------------|---------|
| Alleen kleine letters | Geen hoofdletters toegestaan | `dog` niet `Dog` |
| Onderstrepingstekens voor spaties | Gebruik onderstrepingstekens om woorden te scheiden | `cavia` niet `cavia dier` |
| Alfanumeriek + onderstrepingsteken | Alleen letters, cijfers en onderstrepingstekens | `cat_1` is geldig, `cat-1` is niet |
| Uniek | Mag geen bestaande categorie-slug dupliceren | Systeem weigert duplicaten |
| Geen begin/eind-onderstrepingstekens | Kan niet beginnen of eindigen met onderstrepingsteken | `_dog_` is ongeldig |
| Maximaal 50 tekens | Houd slugs beknopt | Korte, beschrijvende identificaties |

> **Belangrijk:** De naam-slug kan na aanmaak niet worden gewijzigd. Het wordt gebruikt als de permanente identificatie in de database en API. Kies zorgvuldig.

### Emojikiezer

De emojikiezer biedt meer dan 100 dier- en natuurpictogrammen voor categorie-identificatie.

| Functie | Beschrijving |
|---------|-------------|
| Zoeken | Typ om beschikbare emoji's te filteren op trefwoord |
| Categorieën | Emoji's georganiseerd per groep (Dieren, Natuur, Objecten) |
| Voorbeeld | Geselecteerde emoji groot weergegeven voor bevestiging |
| Recent | Eerder gebruikte emoji's bovenaan getoond voor snelle toegang |

**De emojikiezer gebruiken:**

1. Klik op het **emoji-pictogramveld** om de kiezer te openen.
2. Blader door categorieën of typ een trefwoord in de zoekopdracht (bijv. "hond", "vis", "vogel").
3. Klik op de gewenste emoji om deze te selecteren.
4. De geselecteerde emoji verschijnt in het formulierveld als voorbeeld.
5. Om uw selectie te wijzigen, klik opnieuw op het veld om de kiezer te heropenen.

Beschikbare emojicategorieën zijn:

| Groep | Voorbeeld emoji's |
|-------|------------------|
| Huisdieren | Hond, Kat, Hamster, Konijn, Muis |
| Boerderijdieren | Paard, Koe, Varken, Schaap, Geit, Kip |
| Vogels | Papegaai, Adelaar, Uil, Eend, Flamingo, Pauw |
| Reptielen | Hagedis, Slang, Schildpad, Krokodil, Dinosaurus |
| Waterdieren | Vis, Tropische vis, Walvis, Dolfijn, Octopus, Haai |
| Insecten | Vlinder, Bij, Kever, Mier, Krekel |
| Wilde dieren | Leeuw, Tijger, Beer, Aap, Olifant, Giraf |
| Poot/Generiek | Pootafdrukken, Bot, Hart, Ster |

---

## Categorieën bewerken

Bestaande categorieën kunnen worden gewijzigd om hun label, pictogram, beschrijving of actieve status bij te werken.

### Stappen om een categorie te bewerken

1. Zoek de categorie die u wilt bewerken in de lijsttabel.
2. Klik op de knop **Bewerken** (potloodpictogram) in de kolom Acties van de rij.
3. Er verschijnt een bewerkingsformulier met de huidige waarden ingevuld.
4. Wijzig een van de bewerkbare velden:

| Veld | Bewerkbaar | Opmerkingen |
|------|:----------:|------------|
| Naam-slug | Nee | Kan niet worden gewijzigd na aanmaak |
| Label | Ja | Werk de weergavenaam bij |
| Emoji-pictogram | Ja | Selecteer een nieuwe emoji uit de kiezer |
| Beschrijving | Ja | Werk de beschrijving bij of voeg toe |
| Actief | Ja | Schakel actieve/inactieve status |

5. Breng uw wijzigingen aan.
6. Klik op **Wijzigingen opslaan** om toe te passen.
7. Een succesmelding bevestigt de update.
8. De lijsttabel weerspiegelt de wijzigingen onmiddellijk.

### Overwegingen bij bewerken

| Overweging | Detail |
|------------|--------|
| Labelwijzigingen | Worden onmiddellijk weerspiegeld in de app voor alle gebruikers |
| Emoji-wijzigingen | Bijgewerkt op alle UI-locaties waar de categorie verschijnt |
| Beschrijvingswijzigingen | Zichtbaar in categorieselectieschermen binnen de app |
| Bestaande huisdieren | Huisdieren die al aan deze categorie zijn toegewezen worden niet beïnvloed door bewerkingen |

> **Opmerking:** Het wijzigen van het label van een categorie wijzigt niet de slug. De slug blijft de permanente identificatie. Gebruikers en huisdieren verwijzen intern naar categorieën via de slug.

---

## Categorieën activeren en deactiveren

Categorieën kunnen worden geschakeld tussen actieve en inactieve staten zonder verwijdering.

### Een categorie activeren

1. Zoek de inactieve categorie in de lijst (getoond met grijze schakelaar).
2. Klik op de **schakelaar** in de kolom Actief om deze naar de aan-positie te zetten.
3. Of klik op Bewerken en schakel het veld Actief in het bewerkingsformulier.
4. Bevestig de actie indien gevraagd.
5. De categorie wordt onmiddellijk beschikbaar voor huisdierregistratie.

### Een categorie deactiveren

1. Zoek de actieve categorie in de lijst (getoond met groene schakelaar).
2. Klik op de **schakelaar** om deze naar de uit-positie te zetten.
3. Er verschijnt een bevestigingsvenster dat de impact uitlegt.
4. Klik op **Deactivering bevestigen**.
5. De categorie wordt verborgen voor nieuwe huisdierregistraties.

### Impact van deactivering

| Impactgebied | Effect |
|--------------|--------|
| Nieuwe registraties | Categorie verschijnt niet meer in soort-selectiedropdowns |
| Bestaande huisdieren | Huisdieren die al aan deze categorie zijn toegewezen behouden hun toewijzing |
| Filters | Categorie verschijnt niet meer in filterdropdowns voor openbare gebruikers |
| Admin portaal | Categorie nog steeds zichtbaar in admin met inactieve styling |
| API-respons | Categorie uitgesloten van actieve categorielijsten |
| Heractivering | Kan op elk moment opnieuw worden ingeschakeld, waarbij volledige functionaliteit wordt hersteld |

> **Tip:** Deactivering geniet de voorkeur boven verwijdering wanneer u een categorie tijdelijk wilt verbergen of wanneer bestaande huisdieren deze nog gebruiken. Het behoudt gegevensintegriteit terwijl nieuw gebruik wordt beperkt.

---

## Knop standaardwaarden laden

De functie Standaardwaarden laden vult de categorieëntabel met een voorgedefinieerde set veelvoorkomende huisdiercategorieën. Dit is nuttig voor initiële platformconfiguratie of het herstellen van standaardcategorieën.

### Standaardwaarden laden gebruiken

1. Klik op de knop **Standaardwaarden laden** boven of onder de categorieëntabel.
2. Er verschijnt een bevestigingsmodal met de categorieën die worden aangemaakt.
3. Bekijk de lijst met standaardcategorieën.
4. Klik op **Laden bevestigen** om door te gaan.
5. Standaardcategorieën worden aangemaakt en verschijnen in de lijst.

### Standaard categorieënset

Het laden creëert de volgende standaardcategorieën (als ze nog niet bestaan):

| Naam-slug | Label | Emoji | Beschrijving |
|-----------|-------|:-----:|-------------|
| `dog` | Hond | Hondengezicht | Huishonden van alle rassen |
| `cat` | Kat | Kattengezicht | Huiskatten van alle rassen |
| `bird` | Vogel | Vogel | Huisvogels inclusief papegaaien, kanaries en vinken |
| `rabbit` | Konijn | Konijnengezicht | Huiskonijnen |
| `hamster` | Hamster | Hamstergezicht | Hamsters, gerbils en vergelijkbare kleine knaagdieren |
| `fish` | Vis | Vis | Zoetwater- en zoutwateraquariumvissen |
| `turtle` | Schildpad | Schildpad | Schildpadden en landschildpadden |
| `snake` | Slang | Slang | Niet-giftige huisslangen |
| `lizard` | Hagedis | Hagedis | Gekko's, leguanen en andere huishagedissen |
| `horse` | Paard | Paardengezicht | Paarden en pony's |
| `guinea_pig` | Cavia | Cavia | Cavia's |
| `ferret` | Fret | Fret | Huisfretten |

### Laadgedrag

| Scenario | Gedrag |
|----------|--------|
| Lege tabel | Alle standaarden worden aangemaakt |
| Sommige standaarden bestaan | Alleen ontbrekende standaarden worden aangemaakt (geen duplicaten) |
| Alle standaarden bestaan | Geen wijzigingen gemaakt, bevestigingsbericht weergegeven |
| Aangepaste categorieën bestaan | Aangepaste categorieën worden niet beïnvloed |

> **Opmerking:** De knop Standaardwaarden laden verwijdert of wijzigt geen bestaande categorieën. Het voegt alleen ontbrekende standaardvermeldingen toe. Uw aangepaste categorieën zijn veilig.

---

## Een categorie verwijderen

Categorieën kunnen permanent worden verwijderd wanneer ze niet meer nodig zijn. Deze actie vereist zorgvuldige overweging vanwege de impact op bestaande gegevens.

### Stappen om een categorie te verwijderen

1. Zoek de categorie in de lijsttabel.
2. Klik op de knop **Verwijderen** (prullenbakpictogram) in de kolom Acties van de rij.
3. Er verschijnt een waarschuwingsmodal met:
   - De categorienaam en het huidige aantal huisdieren dat deze categorie gebruikt
   - Een waarschuwing over de impact op bestaande huisdieren
   - Een tekstbevestigingsveld (typ de categorie-slug om te bevestigen)
4. Lees de waarschuwing zorgvuldig.
5. Typ de **naam-slug** van de categorie in het bevestigingsveld.
6. Klik op **Categorie verwijderen** om deze permanent te verwijderen.

### Impact van verwijdering

| Impactgebied | Effect |
|--------------|--------|
| Categorierecord | Permanent verwijderd uit de database |
| Bestaande huisdieren | Huisdieren die eerder in deze categorie zaten worden **ongecategoriseerd** |
| Huisdierprofielen | Soortveld toont "Ongecategoriseerd" of leeg |
| Filters | Categorie wordt verwijderd uit alle filterdropdowns |
| Analyses | Historische gegevens kunnen "Onbekende categorie" tonen voor eerdere records |
| Omkeerbaarheid | Kan niet ongedaan worden gemaakt (moet handmatig opnieuw worden aangemaakt indien nodig) |

### Huisdieren worden ongecategoriseerd

Wanneer een categorie wordt verwijderd:

1. Alle huisdieren toegewezen aan die categorie verliezen hun categorietoewijzing.
2. Deze huisdieren verschijnen met een "Ongecategoriseerd" label in het Huisdierenregister.
3. Huisdiereigenaren worden **niet** automatisch genotificeerd.
4. Beheerders kunnen ongecategoriseerde huisdieren opnieuw toewijzen aan een andere categorie via bulkbewerking.
5. Het huisdieraantal voor de verwijderde categorie wordt getoond in het verwijderingsbevestigingsmodal.

> **Belangrijk:** Het verwijderen van een categorie met actieve huisdieren eraan toegewezen laat die huisdieren ongecategoriseerd. Overweeg de categorie te deactiveren in plaats daarvan, of wijs huisdieren opnieuw toe voor verwijdering.

### Verwijderingsbeperkingen

| Beperking | Beschrijving |
|-----------|-------------|
| Standaardcategorieën | Geladen standaardcategorieën kunnen worden verwijderd (ze kunnen opnieuw worden geladen) |
| Actieve huisdieren | Categorieën met huisdieren kunnen worden verwijderd (huisdieren worden ongecategoriseerd) |
| Bevestiging vereist | Slug moet worden getypt om verwijdering te bevestigen |
| Rolvereiste | Alleen rollen `super_admin` en `admin` kunnen categorieën verwijderen |

---

## Best practices

### Richtlijnen voor categoriebeheer

1. **Gebruik duidelijke, eenvoudige labels** - Categorielabels moeten onmiddellijk begrijpelijk zijn voor alle gebruikers ongeacht taalvaardigheid.
2. **Kies representatieve emoji's** - Selecteer emoji's die het diertype duidelijk vertegenwoordigen voor snelle visuele herkenning.
3. **Schrijf nuttige beschrijvingen** - Beschrijvingen helpen gebruikers de juiste categorie te kiezen bij het registreren van hun huisdier.
4. **Deactiveer voor u verwijdert** - Als u niet zeker weet of een categorie nodig is, deactiveer deze eerst. Verwijder alleen wanneer u zeker bent.
5. **Houd slugs beschrijvend** - Omdat slugs niet kunnen worden gewijzigd, kies ze zorgvuldig bij aanmaak.
6. **Monitor ongecategoriseerde huisdieren** - Controleer regelmatig op huisdieren zonder categorieën en wijs ze passend toe.

### Voorbeelden van categorienamen

| Goed | Slecht | Waarom |
|------|--------|--------|
| `cavia` | `cv` | Beschrijvend en leesbaar |
| `tropische_vis` | `tropischeVis` | Volgt onderstrepingsteken-conventie |
| `papegaai` | `Papegaai_1` | Kleine letters, geen cijfers nodig |
| `perzische_kat` | `kat_ras_perzisch` | Beknopt, rasniveau wanneer nodig |

---

## Veelgestelde vragen

**V: Kan ik twee categorieën samenvoegen?**
A: Er is geen ingebouwde samenvoegfunctie. Om categorieën te consolideren, wijs huisdieren opnieuw toe van de ene categorie naar de andere en verwijder dan de lege categorie.

**V: Wat gebeurt er met filters wanneer ik een categorie deactiveer?**
A: De categorie wordt verwijderd uit gebruikersgerichte filterdropdowns maar blijft toegankelijk in de admin portaal-filters voor beheersdoeleinden.

**V: Kan ik categorieën herordenen?**
A: Categorieën worden alfabetisch op label weergegeven in gebruikersgerichte interfaces. De admin-tabel kan op elke kolomkop worden gesorteerd.

**V: Is er een limiet op hoeveel categorieën ik kan aanmaken?**
A: Er is geen harde technische limiet, maar voor bruikbaarheid wordt het totale aantal beheersbaar gehouden (onder 30 is aanbevolen) zodat gebruikers gemakkelijk de juiste categorie kunnen vinden.

---

*Vorige: [App-gebruikers](./users.md)*
