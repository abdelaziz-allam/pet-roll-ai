# Fokmarktplaats

De module Fokmarktplaats biedt beheerders overzicht over het matchmakingsysteem voor het fokken van huisdieren op het platform. Monitor matchverzoeken, volg succesvolle koppelingen en bekijk prestatierankings van fokkers.

![Mating Management](/docs/screenshots/mating.png)

---

## Navigatietabbladen

De pagina Fokmarktplaats is georganiseerd in twee hoofdtabbladen:

| Tabblad | Beschrijving |
|---------|-------------|
| Matches & Verzoeken | Bekijk en beheer alle fokmatches en openstaande verzoeken |
| Fokkersrankings | Ranglijsten met de best presterende fokkers |

Schakel tussen tabbladen door op de tabbladkop bovenaan de pagina te klikken.

---

## Tabblad Matches & Verzoeken

Dit tabblad toont alle fokmatches als visuele kaarten, wat een intuïtief overzicht biedt van de fokactiviteit op het platform.

### Matchkaarten

Elke match wordt weergegeven als een kaart met twee huisdieren verbonden door een visuele hartconnector.

#### Kaartindeling

```
+------------------------------------------+
|  [Huisdier A Foto]  <3  [Huisdier B Foto]|
|  Huisdier A Naam     Huisdier B Naam     |
|  Ras                 Ras                  |
|  Eigenaar            Eigenaar             |
|                                           |
|  Status: [Badge]     Geplaatst: [Datum]   |
|  Soort: [Tag]        Locatie: [Stad]      |
+------------------------------------------+
```

#### Kaartinformatie

| Element | Beschrijving |
|---------|-------------|
| Huisdierfoto's | Profielfoto's van beide huisdieren in de match |
| Hartconnector | Visuele link tussen de twee huisdieren (geanimeerd voor actieve matches) |
| Huisdiernamen | Namen van beide huisdieren |
| Rassen | Rasinformatie voor elk huisdier |
| Eigenaren | Eigenaarsnamen (klikbaar om profielen te bekijken) |
| Statusbadge | Huidige matchstatus |
| Plaatsingsdatum | Wanneer het matchverzoek is aangemaakt |
| Soorttag | Soort van de huisdieren |
| Locatie | Stad/land van de vermelding |

### Matchstatussen

| Status | Badgekleur | Beschrijving |
|--------|------------|-------------|
| In afwachting | Oranje | Matchverzoek verzonden, wacht op antwoord |
| Geaccepteerd | Groen | Beide partijen zijn akkoord gegaan met de match |
| Afgewezen | Rood | Een partij heeft de match afgewezen |
| Voltooid | Blauw | Dekking bevestigd als voltooid |
| Geannuleerd | Grijs | Match is geannuleerd door een van beide partijen |
| Verlopen | Lichtgrijs | Verzoek verlopen zonder reactie |

---

## Filters

De filterbalk stelt u in staat de weergegeven matches te verfijnen.

### Statusfilter

Selecteer een of meer statussen om weer te geven:

1. Klik op de **Status**-dropdown.
2. Vink de statussen aan die u wilt zien.
3. Het kaartraster wordt onmiddellijk bijgewerkt.

### Soortfilter

Filter matches op huisdiersoort:

- Alle soorten (standaard)
- Hond
- Kat
- Vogel
- Konijn
- Overig

### Landfilter

Selecteer een of meer landen om te filteren op matchlocatie.

### Stadfilter

Verfijn verder door specifieke steden te selecteren.

> **Tip:** Gebruik Status: Geaccepteerd + uw land om succesvolle matches in uw regio te zien die mogelijk de actie "Trouwkaart versturen" nodig hebben.

---

## Detailpaneel

Klik op een matchkaart om het detailpaneel aan de rechterkant van het scherm te openen.

### Sectie huisdierfoto's

Bovenaan het paneel worden grotere versies van beide huisdierfoto's naast elkaar weergegeven met de hartconnector ertussen.

- Klik op een foto om deze op volledig formaat te bekijken.
- Veeg door extra foto's als het huisdier een galerij heeft.

### Vermeldingsinformatie

| Veld | Beschrijving |
|------|-------------|
| Vermeldings-ID | Unieke identificatie voor de matchvermelding |
| Aangemaakt door | Welke huisdiereigenaar de vermelding heeft geïnitieerd |
| Aanmaakdatum | Datum waarop de vermelding voor het eerst is gepubliceerd |
| Matchdatum | Datum waarop de match is voorgesteld |
| Antwoorddatum | Datum waarop de match is geaccepteerd/afgewezen (indien van toepassing) |
| Soort | Soort van beide huisdieren |
| Rassen | Gedetailleerde rasinformatie |
| Locatie | Volledige locatiedetails |
| Notities | Eventuele notities van de vermeldingseigenaar |

### Matchtijdlijn

Het paneel bevat een chronologische tijdlijn van gebeurtenissen:

1. **Vermelding aangemaakt** -- Eigenaar heeft de fokvermelding van hun huisdier gepubliceerd
2. **Match voorgesteld** -- Het matchalgoritme of handmatig verzoek heeft de match geïnitieerd
3. **Match bekeken** -- De andere partij heeft het matchvoorstel bekeken
4. **Antwoord gegeven** -- Acceptatie/afwijzing met tijdstempel
5. **Voltooiing vastgelegd** -- Als dekking is bevestigd als voltooid
6. **Trouwkaart verstuurd** -- Als de beheerder een felicitatiemelding heeft verstuurd

Elke tijdlijngebeurtenis toont:

- Datum en tijd
- Actor (systeem, eigenaar A, eigenaar B of beheerder)
- Gebeurtenisbeschrijving
- Aanvullende notities (indien aanwezig)

> **Tip:** De tijdlijn helpt u de volledige context van een match te begrijpen bij het onderzoeken van geschillen of problemen die door gebruikers zijn gemeld.

---

## Trouwkaart versturen

De actie "Trouwkaart versturen" stelt beheerders in staat een felicitatiemelding te sturen naar beide huisdiereigenaren wanneer een match is geaccepteerd of voltooid.

### Een trouwkaart versturen

1. Open het detailpaneel voor een **Geaccepteerde** of **Voltooide** match.
2. Klik op de knop **Trouwkaart versturen** onderaan het paneel.
3. In het dialoogvenster:
   - Bekijk het meldingsbericht (automatisch gegenereerd met beide huisdiernamen).
   - Voeg optioneel een aangepast felicitatiebericht toe.
   - Controleer de ontvangers (beide huisdiereigenaren).
4. Klik op **Versturen**.

### Wat de trouwkaart bevat

- Felicitatiekop met beide huisdiernamen
- Huisdierfoto's gerangschikt met decoratieve elementen
- Matchdatum en locatie
- Aangepast bericht van de beheerder (indien opgegeven)
- Link naar de matchdetailpagina

### Wanneer te versturen

- Nadat een match is geaccepteerd en beide partijen bevestigen dat ze doorgaan.
- Nadat een match als voltooid is gemarkeerd.
- Slechts eenmaal per match (de knop is uitgeschakeld na versturen).

> **Tip:** Trouwkaarten zijn een tool voor communitybetrokkenheid. Ze versturen voor geaccepteerde matches stimuleert platformparticipatie en creëert een positieve ervaring voor fokkers.

---

## Tabblad Fokkersrankings

Het tabblad Fokkersrankings toont de meest actieve en succesvolle fokkers op het platform.

### Algehele top 10 podium

Bovenaan het tabblad Rankings benadrukt een podiumvisualisatie de top 10 fokkers over alle soorten.

#### Podiumindeling

```
              [1e]
        [2e]       [3e]
   [4e]  [5e]  [6e]  [7e]
      [8e]   [9e]   [10e]
```

Elke podiumpositie toont:

- Fokkersnaam
- Kennelnaam
- Profielfoto
- Totaal aantal matches
- Succespercentage

#### Podiumscoring

Fokkers worden gerangschikt op een samengestelde score gebaseerd op:

| Factor | Gewicht | Beschrijving |
|--------|---------|-------------|
| Totaal matches | 30% | Aantal geïnitieerde of ontvangen matches |
| Succespercentage | 40% | Percentage matches dat Geaccepteerd/Voltooid heeft bereikt |
| Actieve vermeldingen | 15% | Aantal momenteel actieve fokvermeldingen |
| Reactietijd | 15% | Gemiddelde tijd om op matchvoorstellen te reageren |

### Top 10 per soort raster

Onder het algehele podium toont een raster de top 10 fokkers voor elke soort apart.

#### Rasterindeling

Elke soort heeft een eigen kaart:

```
+-------------------+  +-------------------+  +-------------------+
|  Honden Top 10    |  |  Katten Top 10    |  |  Vogels Top 10    |
| 1. Fokkersnaam    |  | 1. Fokkersnaam    |  | 1. Fokkersnaam    |
| 2. Fokkersnaam    |  | 2. Fokkersnaam    |  | 2. Fokkersnaam    |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Elke vermelding in het soortraster toont:

- Rangnummer
- Fokkersnaam
- Kennelnaam
- Aantal matches voor die soort
- Succespercentage voor die soort

> **Tip:** Rankings per soort helpen bij het identificeren van gespecialiseerde fokkers die uitstekende kandidaten kunnen zijn voor platformpartnerschappen of uitgelichte vermeldingen.

---

## Sorteerbare rankingstabel

Onder de visuele rankings biedt een volledige gegevenstabel gedetailleerde fokkersstatistieken.

### Tabelkolommen

| Kolom | Sorteerbaar | Beschrijving |
|-------|:-----------:|-------------|
| Rang | Ja | Huidige positie op basis van standaardscoring |
| Fokkersnaam | Ja | Volledige naam van de fokker |
| Kennel | Ja | Kennelnaam |
| Matches | Ja | Totaal aantal matches (geïnitieerd + ontvangen) |
| Vermeldingen | Ja | Aantal aangemaakte fokvermeldingen |
| Succespercentage | Ja | Percentage matches dat de status Geaccepteerd/Voltooid bereikte |
| Weergaven | Ja | Totaal weergaven op hun fokvermeldingen |
| Soort | Nee | Primaire soort die zij fokken |
| Locatie | Nee | Land en stad |

### De tabel sorteren

1. Klik op een sorteerbare kolomkop om oplopend te sorteren.
2. Klik opnieuw om aflopend te sorteren.
3. Een derde klik verwijdert de sortering op die kolom.
4. U kunt op meerdere kolommen sorteren (houd Shift ingedrukt en klik).

### Tabelinteracties

- Klik op een fokkersrij om hun volledige profiel en matchgeschiedenis te bekijken.
- Gebruik de zoekbalk boven de tabel om een specifieke fokker te vinden.
- Exporteer de tabelgegevens met de knop **CSV exporteren**.

> **Tip:** Sorteer op Succespercentage aflopend om fokkers te identificeren die consequent succesvolle matches produceren. Deze fokkers kunnen baat hebben bij premiumfuncties of versnelde verificatie.

---

## Matchmetrics begrijpen

### Berekening succespercentage

```
Succespercentage = (Geaccepteerde + Voltooide matches) / Totaal matches x 100
```

- Alleen matches waarbij de fokker de vermeldingseigenaar was tellen mee voor hun succespercentage.
- Afgewezen en verlopen matches verlagen het succespercentage.
- Geannuleerde matches worden uitgesloten van de berekening.

### Weergavenmetric

Het aantal weergaven vertegenwoordigt:

- Totaal unieke weergaven op alle actieve fokvermeldingen van een fokker.
- Telt niet de eigen weergaven van de fokker.
- Reset per vermelding (niet cumulatief over verwijderde vermeldingen).

### Activiteitsscore

De algehele ranking houdt rekening met recentheid:

- Matches van de afgelopen 90 dagen worden 2x gewogen.
- Matches van 90-180 dagen worden 1x gewogen.
- Matches ouder dan 180 dagen worden 0,5x gewogen.

> **Tip:** Een fokker met veel weergaven maar een laag succespercentage heeft mogelijk aantrekkelijke vermeldingen maar is te selectief of reageert te langzaam. Overweeg contact op te nemen om hun ervaring te begrijpen.

---

## Veelgestelde vragen

**V: Kan ik handmatig een match maken tussen twee huisdieren?**
A: Nee. Matches worden aangemaakt door huisdiereigenaren via de app. Beheerders kunnen alleen bestaande matches monitoren en acties ondernemen.

**V: Wat gebeurt er met matchgegevens wanneer een huisdier wordt verwijderd?**
A: Het matchrecord wordt bewaard voor historische doeleinden maar gemarkeerd met een "Huisdier verwijderd" indicator. De match kan niet verder worden voortgezet.

**V: Kan ik een fokker uit de rankings verwijderen?**
A: Rankings worden automatisch berekend. Om een fokker te verwijderen, moet hun account worden geschorst of hun verificatie worden ingetrokken, waardoor zij worden uitgesloten van rankings.

**V: Hoe vaak worden rankings bijgewerkt?**
A: Rankings worden elke 24 uur herberekend. Het tijdstempel van de laatste update wordt bovenaan het tabblad Rankings getoond.

**V: Kan ik een trouwkaart versturen voor een afgewezen match?**
A: Nee. De knop Trouwkaart versturen is alleen beschikbaar voor matches met de status Geaccepteerd of Voltooid.

**V: Wat als beide huisdieren in een match van dezelfde eigenaar zijn?**
A: Het systeem voorkomt matches van dezelfde eigenaar. Als u er een ziet, duidt dit op een gegevensintegriteitsprobleem dat moet worden gemeld aan het ontwikkelteam.
