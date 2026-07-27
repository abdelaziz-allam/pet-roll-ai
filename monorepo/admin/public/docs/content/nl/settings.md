# Instellingen

De pagina Instellingen biedt systeembrede configuratieopties voor het Petfolioo-platform. Instellingen zijn georganiseerd in drie tabbladen: Algemeen, Meldingen en Beveiliging. Wijzigingen die hier worden gemaakt beïnvloeden het gedrag van zowel het admin portaal als de mobiele applicatie.

![Settings](/docs/screenshots/settings.png)

---

## Overzicht

Alleen beheerders met de rol super_admin of admin (met toegang tot de Instellingenpagina) kunnen instellingen bekijken en wijzigen. Alle wijzigingen vereisen expliciet opslaan en worden onmiddellijk van kracht na het opslaan.

---

## Instellingen openen

1. Klik op **Instellingen** in het zijbalknavigatiemenu.
2. De Instellingenpagina laadt met drie tabbladen bovenaan.
3. Het tabblad **Algemeen** is standaard geselecteerd.

---

## Tabblad Algemeen

Het tabblad Algemeen bevat kernconfiguratievopties voor de applicatie die bepalen hoe het platform zich presenteert en functioneert.

### Velden

| Veld | Beschrijving | Standaard |
|------|-------------|---------|
| **App-naam** | De weergavenaam van de applicatie getoond in meldingen en e-mails | Petfolioo |
| **Support-e-mail** | Het contact-e-mailadres dat aan gebruikers wordt getoond voor supportvragen | -- |
| **Standaardtaal** | De standaardtaal voor nieuwe gebruikers en systeemcommunicatie | Engels |
| **Onderhoudsmodus** | Schakelaar om de onderhoudsmodus in of uit te schakelen | Uit |

### Algemene instellingen configureren

#### App-naam

1. Zoek het veld **App-naam**.
2. Wis de bestaande waarde en typ de gewenste applicatienaam.
3. Deze naam verschijnt in pushmeldingen, e-mailkoppen en de over-sectie van de mobiele app.

#### Support-e-mail

1. Zoek het veld **Support-e-mail**.
2. Voer het e-mailadres in waar gebruikers supportvragen naartoe moeten sturen.
3. Dit e-mailadres wordt weergegeven op het help-/contactscherm van de mobiele app.

> **Tip:** Gebruik een gedeeld team-e-mailadres (bijv. support@petfolioo.com) in plaats van een persoonlijk adres, zodat meerdere teamleden kunnen reageren.

#### Standaardtaal

1. Klik op de **Standaardtaal**-dropdown.
2. Selecteer de taal die wordt gebruikt als standaard voor:
   - Aanmaak van nieuwe gebruikersaccounts
   - Systeemgegenereerde meldingen
   - E-mailsjablonen
3. Gebruikers kunnen dit overschrijven in hun individuele mobiele app-instellingen.

#### Onderhoudsmodus

De onderhoudsmodus is een kritieke functie die aan gebruikers signaleert dat het platform tijdelijk niet beschikbaar is.

1. Zoek de schakelaar **Onderhoudsmodus**.
2. Klik op de schakelaar om de onderhoudsmodus in te schakelen.
3. Er verschijnt een waarschuwingsvenster dat de actie bevestigt.

**Wanneer de onderhoudsmodus is ingeschakeld:**

| Effect | Beschrijving |
|--------|-------------|
| Admin portaal-waarschuwing | Er verschijnt een prominente banner bovenaan het admin portaal die aangeeft dat de onderhoudsmodus actief is |
| Impact mobiele app | De mobiele applicatie toont een onderhoudsscherm aan gebruikers, waardoor normaal gebruik wordt voorkomen |
| API-gedrag | API-eindpunten retourneren onderhoudsstatusreacties |
| Beheerderstoegang | Beheerders kunnen het admin portaal nog steeds normaal gebruiken |

4. Om de onderhoudsmodus uit te schakelen, klik opnieuw op de schakelaar.
5. Bevestig de actie in het dialoogvenster.
6. Het platform keert onmiddellijk terug naar normaal bedrijf.

> **Waarschuwing:** Het inschakelen van de onderhoudsmodus heeft onmiddellijk effect op alle mobiele app-gebruikers. Schakel het alleen in tijdens geplande onderhoudsvensters en communiceer het schema vooraf via een pushmelding.

---

## Tabblad Meldingen

Het tabblad Meldingen regelt geautomatiseerd meldingsgedrag -- de systeemgegenereerde waarschuwingen die naar gebruikers worden gestuurd op basis van hun huisdiergegevens.

### Velden

| Veld | Beschrijving | Type | Standaard |
|------|-------------|------|---------|
| **Vaccinatieherinneringen** | Stuur automatische herinneringen wanneer de vaccinatie van een huisdier bijna vervalt | Schakelaar | Aan |
| **Drachtwaarschuwingen** | Stuur waarschuwingen voor drachtmijlpaaldatums en verwachte bevalling | Schakelaar | Aan |
| **Fokupdates** | Stuur updates over fokschema-evenementen en bevestigingen | Schakelaar | Aan |
| **Herinneringsdagen voor vervaldatum** | Aantal dagen voor een vervaldatum om de herinneringsmelding te sturen | Getalinvoer | 7 |

### Meldinginstellingen configureren

#### Vaccinatieherinneringen

1. Zoek de schakelaar **Vaccinatieherinneringen**.
2. Wanneer **ingeschakeld** (standaard):
   - Gebruikers ontvangen pushmeldingen voor de vaccinatie-vervaldatums van hun huisdier.
   - De melding wordt verstuurd op basis van de instelling "Herinneringsdagen voor vervaldatum".
   - Voorbeeld: Bij 7 dagen krijgen gebruikers een herinnering een week voor de vaccinatie vervalt.
3. Wanneer **uitgeschakeld**:
   - Er worden geen automatische vaccinatieherinneringen verstuurd.
   - Gebruikers moeten het vaccinatieschema van hun huisdier handmatig controleren.

#### Drachtwaarschuwingen

1. Zoek de schakelaar **Drachtwaarschuwingen**.
2. Wanneer **ingeschakeld** (standaard):
   - Gebruikers die een dracht volgen ontvangen mijlpaalmeldingen.
   - Waarschuwingen omvatten herinneringen voor de verwachte bevallingsdatum en fase-overgangen.
   - Fokkers ontvangen aanvullende professionele trackingmeldingen.
3. Wanneer **uitgeschakeld**:
   - Er worden geen automatische drachtgerelateerde waarschuwingen verstuurd.

#### Fokupdates

1. Zoek de schakelaar **Fokupdates**.
2. Wanneer **ingeschakeld** (standaard):
   - Gebruikers ontvangen meldingen over geplande fokgebeurtenissen.
   - Bevestigingsmeldingen worden verstuurd wanneer fokrecords worden geregistreerd.
   - Fokkers ontvangen matchsuggesties en schemaherinneringen.
3. Wanneer **uitgeschakeld**:
   - Er worden geen automatische fokgerelateerde meldingen verstuurd.

#### Herinneringsdagen voor vervaldatum

1. Zoek de getalinvoer **Herinneringsdagen voor vervaldatum**.
2. Voer het aantal dagen voor een vervaldatum in waarop herinneringen moeten worden verstuurd.
3. Deze waarde is van toepassing op alle datumgebaseerde herinneringen (vaccinaties, afspraken).
4. Geldig bereik: 1 tot 30 dagen.

> **Tip:** Een waarde van 7 dagen werkt goed voor de meeste gebruikers. Voor fokkers die meerdere huisdieren beheren, overweeg 14 dagen in te stellen voor meer voorbereidingstijd.

### Melding-interactietabel

| Instelling | Beïnvloedt | Gebruikersimpact |
|------------|-----------|-----------------|
| Vaccinatieherinneringen AAN + 7 dagen | Gebruikers met huisdieren met aankomende vaccinaties | "De rabiësvaccinatie van Rex is over 7 dagen" |
| Drachtwaarschuwingen AAN | Gebruikers met actieve drachtrecords | "De dracht van Luna is in week 6" |
| Fokupdates AAN | Gebruikers met geplande dekkingen | "Fokafspraak met Max bevestigd voor vrijdag" |
| Alle schakelaars UIT | Alle gebruikers | Geen geautomatiseerde meldingen; alleen handmatige beheerdersmeldingen |

---

## Tabblad Beveiliging

Het tabblad Beveiliging bevat instellingen die API-snelheidsbeperking, authenticatietokenlevensduur en bestandsuploadbeperkingen regelen.

### Velden

| Veld | Beschrijving | Type | Standaard |
|------|-------------|------|---------|
| **Snelheidslimiet per minuut** | Maximum API-verzoeken toegestaan per gebruiker per minuut | Getal | 60 |
| **Toegangstoken-verloop (uren)** | Hoe lang een toegangstoken geldig blijft | Getal | 24 |
| **Vernieuwingstoken-verloop (dagen)** | Hoe lang een vernieuwingstoken geldig blijft | Getal | 30 |
| **Max fotogrootte (MB)** | Maximaal toegestane bestandsgrootte voor huisdierfoto's | Getal | 5 |
| **Max avatargrootte (MB)** | Maximaal toegestane bestandsgrootte voor gebruikersavatars | Getal | 2 |
| **Toegestane bestandstypen** | Door komma's gescheiden lijst van MIME-typen geaccepteerd voor uploads | Tekst | image/jpeg,image/png,image/webp |

### Beveiligingsinstellingen configureren

#### Snelheidslimiet per minuut

1. Zoek het veld **Snelheidslimiet per minuut**.
2. Voer het maximale aantal API-verzoeken in dat een enkele gebruiker per minuut kan doen.
3. Verzoeken die deze limiet overschrijden ontvangen een 429 (Too Many Requests) respons.
4. Aanbevolen bereik: 30-120 afhankelijk van verwachte gebruikspatronen.

> **Belangrijk:** Dit te laag instellen kan ervoor zorgen dat de mobiele app niet goed werkt voor actieve gebruikers. Te hoog instellen kan het systeem kwetsbaar maken voor misbruik. De standaard van 60 is geschikt voor de meeste implementaties.

#### Toegangstoken-verloop (uren)

1. Zoek het veld **Toegangstoken-verloop**.
2. Voer het aantal uren in dat een toegangstoken geldig blijft na uitgifte.
3. Wanneer een token verloopt, gebruikt de app het vernieuwingstoken om een nieuw te verkrijgen.
4. Kortere waarden zijn veiliger; langere waarden verminderen loginwrijving.

| Waarde | Beveiliging | Gebruikerservaring |
|--------|-------------|-------------------|
| 1 uur | Hoog | Frequente herauthenticatie |
| 24 uur | Gemiddeld | Goede balans (aanbevolen) |
| 72 uur | Lager | Minimale onderbreking |

#### Vernieuwingstoken-verloop (dagen)

1. Zoek het veld **Vernieuwingstoken-verloop**.
2. Voer het aantal dagen in dat een vernieuwingstoken geldig blijft.
3. Wanneer het vernieuwingstoken verloopt, moet de gebruiker opnieuw inloggen met hun inloggegevens.
4. Aanbevolen bereik: 7-90 dagen.

> **Tip:** Voor een consumenten-app zoals Petfolioo is 30 dagen een goede balans. Gebruikers die de app ten minste maandelijks openen hoeven nooit opnieuw in te loggen. Voor implementaties met hogere beveiliging, overweeg 7 dagen.

#### Max fotogrootte (MB)

1. Zoek het veld **Max fotogrootte**.
2. Voer de maximale bestandsgrootte in megabytes in voor huisdierfoto-uploads.
3. Foto's die deze grootte overschrijden worden geweigerd met een foutmelding.
4. Houd rekening met opslagkosten en uploadtijden voor gebruikers met trage verbindingen.

| Waarde | Geschikt voor |
|--------|--------------|
| 2 MB | Lage opslag, snelle uploads, lagere kwaliteit |
| 5 MB | Gebalanceerd (aanbevolen) |
| 10 MB | Foto's van hoge kwaliteit, meer opslaggebruik |

#### Max avatargrootte (MB)

1. Zoek het veld **Max avatargrootte**.
2. Voer de maximale bestandsgrootte in megabytes in voor gebruikersprofielavatar-uploads.
3. Avatars zijn doorgaans kleiner dan huisdierfoto's omdat ze op verkleinde resolutie worden weergegeven.
4. Aanbevolen: 1-3 MB.

#### Toegestane bestandstypen

1. Zoek het veld **Toegestane bestandstypen**.
2. Voer een door komma's gescheiden lijst van MIME-typen in die het systeem accepteert voor uploads.
3. Elk MIME-type moet in het formaat `type/subtype` zijn.
4. Voeg geen spaties toe tussen vermeldingen tenzij u ze opzettelijk in de MIME-typestring wilt.

**Veelvoorkomende MIME-typen voor afbeeldingsuploads:**

| MIME-type | Formaat | Opmerkingen |
|-----------|---------|------------|
| `image/jpeg` | JPEG | Meest voorkomend fotoformaat, goede compressie |
| `image/png` | PNG | Lossless, ondersteunt transparantie |
| `image/webp` | WebP | Modern formaat, uitstekende compressie |
| `image/heic` | HEIC | Apple-formaat, gebruikt door iPhone-camera's |
| `image/gif` | GIF | Geanimeerde afbeeldingen, grotere bestandsgrootten |

**Voorbeeldconfiguraties:**

```
Standaard:    image/jpeg,image/png,image/webp
Uitgebreid:   image/jpeg,image/png,image/webp,image/heic,image/gif
Minimaal:     image/jpeg,image/png
```

> **Waarschuwing:** Het toevoegen van niet-ondersteunde MIME-typen kan uploads toestaan die het systeem niet kan verwerken. Voeg alleen typen toe die uw beeldverwerkingspipeline ondersteunt.

---

## Instellingen opslaan

Alle instellingenwijzigingen vereisen een expliciete opslagactie.

### Stappen om op te slaan

1. Breng uw gewenste wijzigingen aan op een van de drie tabbladen.
2. Klik op de knop **Instellingen opslaan** onderaan de pagina.
3. Er verschijnt een laadindicator terwijl wijzigingen worden toegepast.
4. Een succesmelding bevestigt dat de instellingen zijn opgeslagen.
5. Wijzigingen worden onmiddellijk van kracht op het hele platform.

### Belangrijke opmerkingen over opslaan

- Wijzigingen worden **niet** automatisch opgeslagen. Als u wegnavigeert zonder op te slaan, gaan wijzigingen verloren.
- U kunt instellingen op meerdere tabbladen wijzigen voor het opslaan -- alle wijzigingen worden samen opgeslagen.
- Als er een validatiefout optreedt, wordt het specifieke veld gemarkeerd met een foutmelding.
- Alleen velden die zijn gewijzigd worden naar de server gestuurd (optimistische gedeeltelijke update).

> **Tip:** Monitor het systeem kort na het opslaan van beveiligingsgerelateerde wijzigingen (snelheidslimieten, tokenverloop) om te verzekeren dat er geen onverwacht gedrag optreedt.

---

## Instellingenwijziging-audit

Alle instellingenwijzigingen worden gelogd voor beveiliging en verantwoording:

| Gelogde informatie | Beschrijving |
|--------------------|-------------|
| Beheerdersnaam | Wie de wijziging heeft gemaakt |
| Tijdstempel | Wanneer de wijziging is gemaakt |
| Gewijzigd veld | Welke instelling is gewijzigd |
| Vorige waarde | De waarde voor de wijziging |
| Nieuwe waarde | De waarde na de wijziging |

---

## Probleemoplossing

| Probleem | Oplossing |
|----------|----------|
| Kan de Instellingenpagina niet openen | Verifieer dat uw rol super_admin of admin is met Instellingen-toestemming verleend. |
| Opslaan-knop uitgeschakeld | Er zijn geen wijzigingen gemaakt. Wijzig ten minste een veld om opslaan in te schakelen. |
| Validatiefout bij opslaan | Controleer het gemarkeerde veld voor het specifieke foutbericht en corrigeer de waarde. |
| Onderhoudsmodus heeft geen effect op app | Sta 1-2 minuten toe voor de wijziging om te propageren naar alle mobiele app-instanties. |
| Snelheidslimiet te restrictief | Verhoog de waarde en sla op. Getroffen gebruikers worden binnen een minuut gedeblokkeerd. |
| Bestandsuploadfouten na typewijziging | Zorg ervoor dat de MIME-typen correct zijn opgemaakt zonder komma's of spaties aan het einde. |

---

## Gerelateerde pagina's

- [Beheerders](./admin-users.md) -- Beheer wie toegang heeft tot instellingen en deze kan wijzigen
- [Meldingen](./notifications.md) -- Stuur handmatige meldingen naar gebruikers
- [Analyses](./analytics.md) -- Monitor platformgezondheid en -gebruik
