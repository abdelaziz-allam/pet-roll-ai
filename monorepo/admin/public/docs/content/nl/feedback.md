# Feedbackbeheer

De pagina Feedbackbeheer stelt beheerders in staat om gebruikersfeedback te bekijken, te beantwoorden en te organiseren die is ingediend via de Petfolioo mobiele applicatie. Dit is uw centrale punt voor het begrijpen van gebruikersbehoeften, het volgen van bugs en het beheren van functiesuggesties.

![Feedback](/docs/screenshots/feedback.png)

---

## Overzicht

Wanneer u naar de Feedbackpagina navigeert, ziet u bovenaan een statistiekenrij die de huidige staat van alle feedback samenvat, gevolgd door tabbladinhoud en filterbesturingen.

---

## Statistiekenrij

Bovenaan de pagina tonen vier metrickaarten realtime aantallen:

| Metric | Beschrijving |
|--------|-------------|
| **Totaal** | Het totaal aantal ontvangen feedbackvermeldingen over alle statussen |
| **Open** | Feedbackvermeldingen die nog niet zijn beantwoord of gesloten |
| **Beantwoord** | Feedbackvermeldingen waar een beheerder ten minste een reactie heeft geplaatst |
| **TODO** | Feedbackvermeldingen die door een beheerder zijn vastgepind voor follow-up |

> **Tip:** Gebruik het TODO-aantal als snelle indicator van openstaande items die aandacht nodig hebben. Als dit getal groeit, overweeg dan om met uw team te triageren.

---

## Tabbladen

De Feedbackpagina is georganiseerd in twee tabbladen:

### Alle feedback

1. Klik op het tabblad **Alle feedback** (standaard geselecteerd).
2. Deze weergave toont elke feedbackvermelding in het systeem ongeacht status.
3. Vermeldingen worden gesorteerd op datum, met de meest recente bovenaan.
4. Gebruik de filters (hieronder beschreven) om resultaten te verfijnen.

### TODO-lijst

1. Klik op het tabblad **TODO-lijst**.
2. Deze weergave toont alleen feedbackvermeldingen die door een beheerder als TODO zijn vastgepind.
3. Gebruik dit tabblad tijdens teamtriagevergaderingen of dagelijkse beoordelingen.
4. Items blijven hier totdat ze worden losgemaakt.

---

## Filters

Onder de tabbladen biedt een filterbalk meerdere besturingen om de weergegeven feedbackvermeldingen te verfijnen.

### Statusfilter

1. Zoek de **Status**-dropdown in de filterbalk.
2. Klik om uit te vouwen en selecteer een van de volgende opties:
   - **Alle** -- Toont feedback in elke status
   - **Open** -- Toont alleen onopgeloste feedback
   - **Beantwoord** -- Toont feedback met ten minste een beheerdersreactie
   - **Gesloten** -- Toont feedback gemarkeerd als opgelost
3. De lijst wordt onmiddellijk bijgewerkt bij selectie.

### Typefilter

1. Zoek de **Type**-dropdown in de filterbalk.
2. Selecteer de categorie feedback die u wilt bekijken:
   - **Alle typen** -- Geen typefilter toegepast
   - **Bug** -- Problemen of defecten gemeld door gebruikers
   - **Suggestie** -- Functieverzoeken en verbeteringsideeën
   - **Algemeen** -- Algemene opmerkingen of vragen
3. Elke feedbackvermelding is voorzien van een typebadge voor snelle visuele identificatie.

### Datumbereikfilter

1. Klik op de **Datumbereik**-kiezer in de filterbalk.
2. Selecteer een begindatum en einddatum uit de kalenderwidget.
3. Alleen feedback ingediend binnen het geselecteerde bereik wordt weergegeven.
4. Om het datumfilter te wissen, klik op het wispictogram op de datumkiezer.

### Alleen-TODO's schakelaar

1. Zoek de schakelaar **Alleen TODO's** in de filterbalk.
2. Schakel in om alleen feedbackvermeldingen te tonen die als TODO zijn vastgepind.
3. Dit biedt een snel alternatief voor het overschakelen naar het tabblad TODO-lijst terwijl u in de weergave Alle feedback blijft met andere filters toegepast.

> **Tip:** Combineer filters voor krachtige zoekopdrachten. Stel bijvoorbeeld Type in op "Bug" en Status op "Open" om alle onopgeloste bugrapporten te zien.

---

## Feedbackvermeldingen

Elke feedbackvermelding in de lijst toont de volgende informatie:

| Veld | Beschrijving |
|------|-------------|
| **Gebruikersinfo** | Weergavenaam, e-mail en avatar van de indiener |
| **Bericht** | De volledige tekst van de feedback ingediend door de gebruiker |
| **Typebadge** | Een gekleurde badge die Bug (rood), Suggestie (blauw) of Algemeen (grijs) aangeeft |
| **Datum** | De datum en tijd waarop de feedback is ingediend |
| **Status** | Huidige statusindicator (Open, Beantwoord of Gesloten) |
| **TODO-pin** | Een pinpictogram dat aangeeft of deze vermelding is gemarkeerd voor follow-up |

### Een feedbackvermelding bekijken

1. Zoek de feedbackvermelding in de lijst.
2. Klik op de vermeldingsrij of het uitvouwpictogram om de detailweergave te openen.
3. De detailweergave toont het volledige bericht, gebruikersinformatie en eventuele eerdere beheerdersreacties.

---

## Reageren op feedback

Beheerders kunnen reageren op gebruikersfeedback. Reacties zijn zichtbaar voor de gebruiker binnen de mobiele applicatie.

### Stappen om te reageren

1. Open de feedbackvermelding waarop u wilt reageren.
2. Zoek het **Reactie**-tekstveld onderaan de detailweergave.
3. Typ uw reactiebericht in het tekstveld.
4. Controleer uw bericht op duidelijkheid en professionaliteit.
5. Klik op de knop **Reactie versturen**.
6. Er verschijnt een bevestigingsbericht dat de reactie succesvol is verstuurd.
7. De feedbackstatus verandert automatisch naar **Beantwoord**.

> **Belangrijk:** Uw reactie is zichtbaar voor de gebruiker in de Petfolioo mobiele app. Zorg ervoor dat uw reactie behulpzaam, professioneel is en direct ingaat op de zorg van de gebruiker.

### Best practices voor reacties

- Erken de feedback van de gebruiker voordat u een oplossing biedt.
- Als het probleem een bekende bug is, laat de gebruiker weten dat eraan wordt gewerkt.
- Bedank de gebruiker voor suggesties en leg uit of de functie wordt overwogen.
- Vermijd technisch jargon dat eindgebruikers mogelijk niet begrijpen.
- Houd reacties beknopt maar grondig.

---

## Eerdere beheerdersreacties

Bij het bekijken van een feedbackvermelding die reacties heeft ontvangen, worden alle eerdere beheerdersreacties inline in chronologische volgorde weergegeven.

1. Open de detailweergave van de feedbackvermelding.
2. Scroll naar beneden om de gespreksthread te zien.
3. Elke reactie toont:
   - De naam van de beheerder die de reactie heeft geplaatst
   - De datum en tijd van de reactie
   - De volledige reactietekst
4. Nieuwe reacties verschijnen onderaan de thread.

> **Tip:** Bekijk eerdere reacties voordat u een nieuwe plaatst om dubbele of tegenstrijdige antwoorden te voorkomen.

---

## Feedback sluiten

Wanneer een feedbackitem volledig is behandeld, kunt u het sluiten om aan te geven dat er geen verdere actie nodig is.

### Stappen om te sluiten

1. Open de feedbackvermelding die u wilt sluiten.
2. Klik op de knop **Sluiten** (of selecteer "Sluiten" uit het actiemenu).
3. Er verschijnt een bevestigingsvenster dat u vraagt te bevestigen.
4. Klik op **Bevestigen** om de feedback te sluiten.
5. De status van de vermelding verandert naar **Gesloten**.
6. Gesloten vermeldingen blijven in het systeem en kunnen worden bekeken door het statusfilter in te stellen op "Gesloten".

> **Opmerking:** Feedback sluiten verwijdert het niet. U kunt gesloten vermeldingen nog steeds bekijken en heropenen indien nodig.

---

## Vastpinnen / lospinnen als TODO

De TODO-pinfunctie stelt beheerders in staat specifieke feedbackvermeldingen te markeren voor follow-up. Vastgepinde items verschijnen in het tabblad TODO-lijst en dragen bij aan het TODO-aantal in de statistiekenrij.

### Feedback vastpinnen als TODO

1. Zoek de feedbackvermelding die u wilt markeren voor follow-up.
2. Klik op het **Pin**-pictogram (punaise) op de vermeldingsrij, of open de detailweergave en klik op **Vastpinnen als TODO**.
3. De vermelding wordt onmiddellijk toegevoegd aan de TODO-lijst.
4. De TODO-teller in de statistiekenrij wordt met een verhoogd.
5. Er verschijnt een pinpictogram op de vermelding dat de TODO-status aangeeft.

### Feedback lospinnen

1. Zoek de vastgepinde feedbackvermelding (gebruik het tabblad TODO-lijst of het filter Alleen TODO's).
2. Klik op het **Lospin**-pictogram op de vermeldingsrij, of open de detailweergave en klik op **Verwijderen van TODO**.
3. De vermelding wordt verwijderd van de TODO-lijst.
4. De TODO-teller in de statistiekenrij wordt met een verlaagd.

### Wanneer TODO-pins gebruiken

- Een feedbackitem vereist onderzoek voordat u antwoordt.
- U heeft input nodig van een ander teamlid voordat u reageert.
- Het probleem is gerelateerd aan een aankomende release en moet worden gevolgd.
- Een suggestie moet worden besproken in de volgende planningsvergadering.

---

## Workflowsamenvatting

De aanbevolen workflow voor het afhandelen van feedback is:

1. **Beoordelen** -- Controleer de statistiekenrij dagelijks op nieuwe open feedback.
2. **Triageren** -- Gebruik filters om bugs te prioriteren boven suggesties.
3. **Vastpinnen** -- Markeer complexe items als TODO voor latere follow-up.
4. **Reageren** -- Beantwoord eenvoudige items direct.
5. **Samenwerken** -- Gebruik het tabblad TODO-lijst bij teambeoordelingen.
6. **Sluiten** -- Markeer opgeloste items als gesloten nadat is bevestigd dat het probleem van de gebruiker is behandeld.

---

## Sneltoetsen

| Sneltoets | Actie |
|-----------|-------|
| `Enter` | Geselecteerde feedbackvermelding openen |
| `R` | Focus op het reactietekstveld (wanneer vermelding is geopend) |
| `T` | TODO-pin schakelen op geselecteerde vermelding |
| `Esc` | Detailweergave sluiten |

---

## Probleemoplossing

| Probleem | Oplossing |
|----------|----------|
| Reactie wordt niet verstuurd | Controleer uw netwerkverbinding en probeer opnieuw. Zorg ervoor dat het bericht niet leeg is. |
| Filters worden niet bijgewerkt | Vernieuw de pagina. Als het probleem aanhoudt, wis de browsercache. |
| TODO-telling onjuist | De telling wordt vernieuwd bij het laden van de pagina. Navigeer weg en keer terug om bij te werken. |
| Kan gesloten feedback niet zien | Stel het Statusfilter in op "Gesloten" of "Alle" om gesloten vermeldingen te bekijken. |

---

## Gerelateerde pagina's

- [Meldingen](./notifications.md) -- Stuur aankondigingen naar gebruikers
- [Beheerders](./admin-users.md) -- Beheer wie kan reageren op feedback
- [Instellingen](./settings.md) -- Configureer systeembrede voorkeuren
