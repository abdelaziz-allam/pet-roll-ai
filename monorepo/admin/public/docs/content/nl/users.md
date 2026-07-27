# App-gebruikers

De module App-gebruikers biedt volledig beheer van alle gebruikersaccounts op het Petfolioo-platform. Beheerders kunnen gebruikersprofielen bekijken, nieuwe accounts aanmaken, details bewerken, rollen toewijzen en moderatieacties ondernemen. Deze module is toegankelijk voor gebruikers met de rol `super_admin` of `admin`.

![App Users](/docs/screenshots/users.png)

---

## Gebruikerslijsttabel

De gebruikerslijsttabel toont alle geregistreerde platformgebruikers met belangrijke informatie in een oogopslag zichtbaar.

### Tabelkolommen

| Kolom | Beschrijving | Sorteerbaar |
|-------|-------------|:----------:|
| Avatar | Profielfoto van de gebruiker (cirkelvormige miniatuur) | Nee |
| Naam | Weergavenaam | Ja |
| E-mail | Geregistreerd e-mailadres | Ja |
| Rol | Toegewezen platformrol (gebruiker, moderator, admin) | Ja |
| Status | Accountstatus (Actief, In afwachting, Geblokkeerd) | Ja |
| Geverifieerde fokker | Badge die geverifieerde fokkerstatus aangeeft | Ja |
| Aantal huisdieren | Aantal huisdieren geregistreerd door deze gebruiker | Ja |
| Aanmelddatum | Datum van accountaanmaak | Ja |

### Statusindicatoren

| Status | Badgekleur | Betekenis |
|--------|------------|---------|
| Actief | Groen | Account is volledig functioneel |
| In afwachting | Oranje | E-mailverificatie niet voltooid |
| Geblokkeerd | Rood | Account geschorst door een beheerder |

### Badge geverifieerde fokker

| Indicator | Betekenis |
|-----------|---------|
| Blauw vinkje-badge | Gebruiker heeft fokkerverificatie voltooid en is bevestigd |
| Geen badge | Gebruiker heeft niet aangevraagd of ontvangen voor fokkerverificatie |
| Klokpictogram | Fokkerverificatieaanvraag is in behandeling |

### Tabelnavigatie

1. **Sorteer** door op een sorteerbare kolomkop te klikken. Klik opnieuw om de volgorde om te keren.
2. **Zoek** met behulp van de zoekbalk boven de tabel om gebruikers te vinden op naam of e-mail.
3. **Filter** met behulp van de status- en rol-dropdowns om resultaten te verfijnen.
4. **Pagineer** met besturingen onderaan (10, 20, 50 vermeldingen per pagina).

> **Tip:** Combineer de zoekbalk met statusfilters om snel specifieke gebruikers te vinden. Zoek bijvoorbeeld "jan" met status "Geblokkeerd" om geblokkeerde gebruikers met de naam Jan te vinden.

---

## Gebruikersdetails bekijken

Het gebruikersdetailpaneel biedt een uitgebreid overzicht van het profiel en de activiteit van een gebruiker.

### Het detailpaneel openen

1. Klik op een rij in de gebruikerslijsttabel.
2. Het detailpaneel schuift aan de rechterkant van het scherm naar binnen.
3. Het paneel bevat meerdere secties verticaal georganiseerd.

### Secties van het detailpaneel

| Sectie | Inhoud |
|--------|--------|
| Profielkop | Grote avatar, weergavenaam, e-mail, rolbadge, statusbadge |
| Accountinformatie | Aanmelddatum, laatste login, e-mailverificatiestatus, authenticatieprovider |
| Persoonlijke gegevens | Telefoonnummer, tijdzone, land, stad |
| Fokkerstatus | Verificatiestatus, aanvraagdatum, ingediende documenten |
| Huisdiersamenvatting | Aantal geregistreerde huisdieren met snelle links naar elk |
| Activiteitenlogboek | Recente acties van deze gebruiker op het platform |

### Profielkop

De bovenkant van het paneel toont:

- **Avatar** op volledig formaat (of standaard silhouet als er geen is geüpload)
- **Weergavenaam** in grote tekst
- **E-mail** onder de naam
- **Rolbadge** kleurgecodeerd per toestemmingsniveau
- **Statusbadge** die de huidige accountstatus toont

### Accountinformatievelden

| Veld | Beschrijving | Voorbeeld |
|------|-------------|---------|
| Gebruikers-ID | Uniek systeemidentificatienummer | "usr_a1b2c3d4" |
| Aanmelddatum | Wanneer het account is aangemaakt | "2023-01-15 09:30 UTC" |
| Laatste login | Meest recente login-tijdstempel | "2024-07-20 14:22 UTC" |
| E-mail geverifieerd | Of het e-mailadres is bevestigd | "Ja" / "Nee" |
| Authenticatieprovider | Gebruikte authenticatiemethode | "E-mail/Wachtwoord" of "Google" |
| Firebase UID | Firebase Authentication gebruikers-ID | "Abc123Def456" |

---

## Een nieuwe gebruiker aanmaken

Beheerders kunnen gebruikersaccounts rechtstreeks vanuit het admin portaal aanmaken. Omdat het platform Firebase Authentication gebruikt, wordt er geen wachtwoord ingesteld bij aanmaak - gebruikers ontvangen een e-mail om hun eigen wachtwoord in te stellen.

### Stappen om een gebruiker aan te maken

1. Klik op de knop **Gebruiker aanmaken** rechtsboven op de Gebruikerspagina.
2. Er verschijnt een aanmaakmodal of -formulier.
3. Vul de verplichte velden in:

| Veld | Verplicht | Beschrijving |
|------|:---------:|-------------|
| Weergavenaam | Ja | De volledige naam of gekozen weergavenaam van de gebruiker |
| E-mail | Ja | Een geldig e-mailadres (moet uniek zijn op het platform) |

4. Klik op **Aanmaken** om het formulier te verzenden.
5. Het systeem zal:
   - Een Firebase Authentication-record aanmaken
   - Een welkomst-e-mail naar de gebruiker sturen met een link om hun wachtwoord in te stellen
   - Het gebruikersprofiel in de platformdatabase aanmaken
   - De standaard "gebruiker"-rol toewijzen
6. De nieuwe gebruiker verschijnt in de lijsttabel met de status "In afwachting" totdat zij hun e-mail verifiëren.

### Validatieregels

| Veld | Regel |
|------|-------|
| Weergavenaam | 2-100 tekens, mag niet leeg zijn |
| E-mail | Moet een geldig e-mailformaat zijn, mag niet al bestaan in het systeem |

> **Opmerking:** Er is geen wachtwoordveld nodig. Firebase Authentication regelt het instellen van het wachtwoord via de welkomst-e-mail die naar de gebruiker wordt gestuurd. Dit zorgt ervoor dat de gebruiker zelf een veilig wachtwoord kiest.

> **Tip:** Als u een gebruiker moet aanmaken die verhoogde rechten moet hebben, maak deze dan eerst aan met standaardinstellingen en wijzig vervolgens hun rol apart (zie Rol wijzigen hieronder).

---

## Een gebruiker bewerken

Beheerders kunnen gebruikersprofielgegevens wijzigen wanneer nodig. Dit wordt vaak gebruikt voor het corrigeren van informatie of het bijwerken van gegevens namens een gebruiker.

### Stappen om een gebruiker te bewerken

1. Open het detailpaneel van de gebruiker door op hun rij in de lijsttabel te klikken.
2. Klik op de knop **Bewerken** (potloodpictogram) in de kop van het paneel.
3. Het paneel schakelt over naar bewerkingsmodus met bewerkbare formuliervelden.
4. Wijzig een van de beschikbare velden:

| Veld | Bewerkbaar | Opmerkingen |
|------|:----------:|------------|
| Weergavenaam | Ja | De openbare naam van de gebruiker |
| Telefoon | Ja | Internationaal formaat aanbevolen (bijv. +31612345678) |
| Tijdzone | Ja | Dropdown van IANA-tijdzones (bijv. Europe/Amsterdam) |
| Land | Ja | Dropdown van alle landen |
| Stad | Ja | Tekstveld, suggesties worden bijgewerkt op basis van land |
| E-mail | Nee | Kan niet worden gewijzigd (gebruikt als inlogidentificatie) |
| Gebruikers-ID | Nee | Systeemgegenereerd, onveranderlijk |

5. Klik op **Wijzigingen opslaan** om uw bewerkingen toe te passen.
6. Een succesmelding bevestigt de update.
7. Het paneel keert terug naar weergavemodus met de bijgewerkte informatie.

### Bewerkingsgeschiedenis

Alle bewerkingen die via het admin portaal worden gemaakt, worden gelogd:

| Logveld | Beschrijving |
|---------|-------------|
| Tijdstempel | Wanneer de wijziging is gemaakt |
| Beheerder | Welke beheerder de wijziging heeft gemaakt |
| Gewijzigd veld | Welk veld is gewijzigd |
| Oude waarde | De vorige waarde |
| Nieuwe waarde | De bijgewerkte waarde |

> **Belangrijk:** Bewerkingen van gebruikersprofielen zijn zichtbaar voor de gebruiker. Zij zien de bijgewerkte informatie in hun app. Overweeg de gebruiker te informeren als u wijzigingen namens hen aanbrengt.

---

## Rol wijzigen

Rolwijzigingen bepalen welk toegangsniveau een gebruiker heeft binnen het platform en de apps.

### Beschikbare rollen

| Rol | Beschrijving | Mogelijkheden |
|-----|-------------|--------------|
| user | Standaard platformgebruiker | Kan eigen huisdieren beheren, deelnemen aan fokprogramma's, vermeldingen bekijken |
| moderator | Communitymoderator | Alle gebruikersmogelijkheden plus mogelijkheid om inhoud te beoordelen en te markeren |
| admin | Platformbeheerder | Alle moderatormogelijkheden plus toegang tot het admin portaal |

### Stappen om de rol van een gebruiker te wijzigen

1. Open het detailpaneel van de gebruiker door op hun rij te klikken.
2. Zoek de sectie **Rol** in het paneel.
3. Klik op de knop **Rol wijzigen** (of de huidige rolbadge).
4. Er verschijnt een rolselectiemodal met:
   - Radioknoppen voor elke beschikbare rol
   - Beschrijvende tekst die de rechten van elke rol uitlegt
   - Een bevestigingsselectievakje dat de wijziging erkent
5. Selecteer de nieuwe rol.
6. Lees de rolbeschrijving om te bevestigen dat deze geschikt is.
7. Vink het **bevestigingsselectievakje** aan ("Ik begrijp dat dit het toegangsniveau van de gebruiker zal wijzigen").
8. Klik op **Rolwijziging bevestigen**.
9. De rol van de gebruiker wordt onmiddellijk bijgewerkt.

### Beperkingen bij rolwijzigingen

| Uw rol | Kan toewijzen |
|--------|--------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Kan geen rollen wijzigen |
| viewer | Kan geen rollen wijzigen |

> **Belangrijk:** Het promoveren van een gebruiker naar "admin" geeft hen toegang tot het admin portaal. Doe dit alleen voor vertrouwde teamleden die beheerderstoegang nodig hebben.

> **Opmerking:** Het wijzigen van een gebruiker van "admin" naar "user" trekt onmiddellijk hun toegang tot het admin portaal in. Als zij momenteel zijn ingelogd op het portaal, wordt hun sessie beëindigd bij de volgende paginanavigatie.

---

## Gebruiker blokkeren/deblokkeren

Het blokkeren van een gebruiker schorst hun account, waardoor zij niet meer kunnen inloggen op de app of toegang hebben tot platformfuncties.

### Een gebruiker blokkeren

1. Open het detailpaneel van de gebruiker.
2. Scroll naar de sectie **Acties** onderaan het paneel.
3. Klik op de knop **Gebruiker blokkeren** (weergegeven in rood).
4. Er verschijnt een bevestigingsmodal met:
   - De naam en het e-mailadres van de gebruiker ter bevestiging
   - Een tekstveld **Reden** (verplicht)
   - Een **Duur**-selector (permanent, 7 dagen, 30 dagen, 90 dagen)
5. Voer een duidelijke, professionele reden in voor de blokkering.
6. Selecteer de blokkeringsduur.
7. Klik op **Blokkering bevestigen**.

### Effecten van blokkering

| Effect | Beschrijving |
|--------|-------------|
| Login geblokkeerd | Gebruiker kan niet inloggen op de mobiele app |
| Profiel verborgen | Profiel van de gebruiker is niet zichtbaar voor andere gebruikers |
| Huisdieren verwijderd uit lijsten | Alle huisdieren van deze gebruiker zijn verborgen uit vermeldingen |
| Meldingen | Gebruiker ontvangt een e-mail met uitleg over de blokkering en de opgegeven reden |
| Actieve sessies | Alle huidige sessies worden onmiddellijk beëindigd |

### Richtlijnen voor blokkeringsreden

| Richtlijn | Voorbeeld |
|-----------|---------|
| Wees specifiek | "Meerdere frauduleuze fokvermeldingen gemeld en bevestigd" |
| Verwijs naar beleid | "Schending van Gebruiksvoorwaarden sectie 4.2 betreffende authentieke vermeldingen" |
| Vermijd vage taal | Schrijf NIET "slecht gedrag" - wees specifiek over wat er is gebeurd |
| Houd het professioneel | De reden wordt direct naar de gebruiker gestuurd |

> **Belangrijk:** De blokkeringsreden wordt aan de gebruiker gecommuniceerd via e-mail en in-app melding. Het moet feitelijk, specifiek en professioneel zijn.

### Een gebruiker deblokkeren

1. Gebruik het **Status**-filter om "Geblokkeerd" te selecteren om geblokkeerde gebruikers te vinden.
2. Klik op de rij van de geblokkeerde gebruiker om hun detailpaneel te openen.
3. Het paneel toont een kaart **Blokkeringsinformatie** met:
   - Blokkeringsdatum
   - Blokkerende beheerder
   - Blokkeringsreden
   - Blokkeringsduur / vervaldatum
4. Klik op de knop **Gebruiker deblokkeren** (weergegeven in groen).
5. Er verschijnt een bevestigingsmodal.
6. Voer optioneel een notitie in die uitlegt waarom de blokkering wordt opgeheven.
7. Klik op **Deblokkering bevestigen**.
8. De status van de gebruiker keert terug naar "Actief" en zij krijgen weer volledige platformtoegang.
9. De gebruiker ontvangt een melding dat hun account is hersteld.

### Blokkeringsgeschiedenis

Elke blokkerings- en deblokkeringsactie wordt vastgelegd in de gebruikersgeschiedenis:

| Veld | Beschrijving |
|------|-------------|
| Blokkeringsdatum | Wanneer de blokkering is toegepast |
| Deblokkeringsdatum | Wanneer de blokkering is opgeheven (indien van toepassing) |
| Beheerder | Welke beheerder de actie heeft ondernomen |
| Reden | De opgegeven reden voor de blokkering |
| Duur | Hoe lang de blokkering was ingesteld |
| Oplossing | Hoe het is beëindigd (handmatige deblokkering, vervallen, in beroep) |

---

## Gebruikers zoeken en filteren

### Zoekbalk

De zoekbalk bovenaan de Gebruikerspagina ondersteunt:

| Zoektype | Voorbeeld | Overeenkomsten |
|----------|---------|---------------|
| Zoeken op naam | "Sarah" | Alle gebruikers met "Sarah" in hun weergavenaam |
| Zoeken op e-mail | "gmail.com" | Alle gebruikers met Gmail-adressen |
| Gedeeltelijke overeenkomst | "pet" | Gebruikers met namen als "Peter", "Petrov", enz. |

### Filterdropdowns

| Filter | Opties |
|--------|--------|
| Rol | Alle, Gebruiker, Moderator, Admin |
| Status | Alle, Actief, In afwachting, Geblokkeerd |
| Geverifieerde fokker | Alle, Geverifieerd, Niet geverifieerd, In behandeling |

### Zoeken en filters combineren

1. Voer tekst in de zoekbalk in EN selecteer tegelijkertijd filterwaarden.
2. Resultaten moeten aan ALLE criteria voldoen (EN-logica).
3. Wis individuele filters door op hun X-knop te klikken, of wis alles met de knop **Resetten**.

---

## Gebruikersgegevens exporteren

Om gebruikersgegevens te exporteren voor rapportage of analyse:

1. Pas eventuele gewenste filters toe.
2. Klik op de knop **Exporteren** rechtsboven.
3. Selecteer het formaat: **CSV** of **Excel**.
4. Kies het bereik: **Huidige gefilterde weergave** of **Alle gebruikers**.
5. De download start automatisch.

### Geëxporteerde velden

| Veld | Opgenomen | Opmerkingen |
|------|:---------:|------------|
| Weergavenaam | Ja | |
| E-mail | Ja | |
| Rol | Ja | |
| Status | Ja | |
| Land | Ja | |
| Stad | Ja | |
| Aantal huisdieren | Ja | |
| Aanmelddatum | Ja | |
| Laatste login | Ja | |
| Telefoon | Nee | Uitgesloten vanwege privacy |

> **Opmerking:** Telefoonnummers en gedetailleerde persoonlijke informatie worden standaard uitgesloten van exports om te voldoen aan gegevensbeschermingsvereisten.

---

*Vorige: [Huisdierenregister](./pets.md) | Volgende: [Huisdiercategorieën](./categories.md)*
