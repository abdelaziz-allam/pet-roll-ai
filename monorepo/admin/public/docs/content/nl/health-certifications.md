# Gezondheidscertificaten

De module Gezondheidscertificaten stelt beheerders in staat om gezondheidscertificaten van huisdieren te beheren en verifiëren die zijn ingediend door dierenartsen of huisdiereigenaren. Dit zorgt ervoor dat huisdieren die op het platform worden vermeld geldige, actuele gezondheidsdocumentatie hebben.

![Health Records](/docs/screenshots/health-certifications.png)

---

## Certificatentabel

De hoofdweergave toont alle gezondheidscertificaat-inzendingen in een gegevenstabel.

| Kolom | Beschrijving |
|-------|-------------|
| Huisdiernaam | Naam van het huisdier waartoe het certificaat behoort |
| Dierenarts-info | Naam en kliniek van de dierenarts |
| Locatie | Land en stad waar het certificaat is uitgegeven |
| Certificaatdatum | Datum waarop het certificaat is uitgegeven door de dierenarts |
| Documenten | Aantal bijgevoegde certificaatdocumenten |
| Status | Huidige certificaatstatusbadge |

### Tabelacties

- Klik op een rij om het **Detailpaneel** aan de rechterkant te openen.
- Gebruik de actieknoppen in de laatste kolom voor snel goedkeuren/afwijzen.
- Sorteer op elke kolom door op de kolomkop te klikken.

---

## Filters

De filterbalk boven de tabel biedt vier filteropties:

### Statusfilter

Filter certificaten op hun huidige status:

| Status | Badgekleur | Beschrijving |
|--------|------------|-------------|
| In afwachting | Oranje | Wacht op beoordeling door beheerder |
| Goedgekeurd | Groen | Certificaat geverifieerd en actief |
| Afgewezen | Rood | Certificaat is niet door beoordeling gekomen |
| Ingetrokken | Donkerrood | Eerder goedgekeurd certificaat ongeldig verklaard |
| Verlopen | Grijs | Geldigheidsperiode van het certificaat is beëindigd |

### Soortfilter

Filter op huisdiersoort:

- Hond
- Kat
- Vogel
- Konijn
- Overig

### Landfilter

Selecteer een of meer landen om te filteren op de locatie waar het certificaat is uitgegeven.

### Stadfilter

Verfijn verder door specifieke steden binnen het gekozen land te selecteren.

> **Tip:** Filters zijn combineerbaar. Filter bijvoorbeeld op Status: In afwachting + Soort: Hond + Land: Duitsland om alle openstaande hondencertificaten uit Duitsland te zien.

---

## Detailpaneel

Door op een certificaatrij te klikken wordt een detailpaneel aan de rechterkant van het scherm geopend. Het paneel bevat uitgebreide informatie georganiseerd in secties.

### Statusbanner

Bovenaan het paneel toont een gekleurde banner:

- Huidige status met badgepictogram
- Datum van laatste statuswijziging
- Naam van de beheerder die het certificaat als laatste heeft beoordeeld (indien van toepassing)
- Afwijzings- of intrekkingsreden (indien van toepassing, weergegeven in een waarschuwingsmelding)

### Sectie huisdierinformatie

| Veld | Beschrijving |
|------|-------------|
| Huisdiernaam | Geregistreerde naam van het huisdier |
| Soort | Soort van het huisdier |
| Ras | Ras van het huisdier |
| Geboortedatum | Geboortedatum van het huisdier |
| Microchip-ID | Uniek microchipidentificatienummer (indien beschikbaar) |
| Eigenaar | Naam van de eigenaar van het huisdier met link naar hun profiel |

### Sectie veterinaire gegevens

| Veld | Beschrijving |
|------|-------------|
| Naam dierenarts | Volledige naam van de uitgevende dierenarts |
| Kliniknaam | Naam van de dierenartskliniek |
| Kliniekadres | Volledig adres van de kliniek |
| Licentienummer | Professioneel licentienummer van de dierenarts |
| Telefoon | Contacttelefoonnummer van de kliniek |
| E-mail | Contact-e-mailadres van de kliniek (indien opgegeven) |

> **Tip:** Verifieer het licentienummer tegen de veterinaire licentiedatabase van uw land bij het beoordelen van certificaten van onbekende klinieken.

### Geldigheidsvoortgangsbalk

Onder de veterinaire gegevens visualiseert een voortgangsbalk de geldigheidsperiode van het certificaat:

1. De balk loopt van de **Certificaatdatum** (begin) tot de **Vervaldatum** (einde).
2. De huidige datum wordt aangegeven door een markering op de balk.
3. Kleurcodering:
   - **Groen:** Meer dan 30 dagen resterend
   - **Geel:** 30 dagen of minder resterend
   - **Rood:** Verlopen
4. Het percentage verbruikte geldigheid wordt als tekst weergegeven.

### Documentenraster

De documentensectie toont geüploade certificaatbestanden in een rasterindeling.

1. Elk document wordt weergegeven als een miniatuurkaart met de bestandsnaam eronder.
2. Klik op een miniatuur om de **Afbeeldingsvoorbeeld**-overlay te openen.
3. In de voorbeeldoverlay:
   - Gebruik in-/uitzoombesturingen om details te inspecteren.
   - Navigeer tussen documenten met links/rechts-pijlen.
   - Download het originele bestand met de downloadknop.
   - Druk op **Escape** om het voorbeeld te sluiten.
4. Ondersteunde formaten: JPEG, PNG, PDF.

> **Tip:** Let op officiële veterinaire stempels, handtekeningen en licentienummers op certificaatdocumenten. Generieke of sjabloondocumenten zonder deze elementen moeten worden gemarkeerd voor afwijzing.

---

## Een certificaat goedkeuren

Om een gezondheidscertificaat goed te keuren:

1. Open het certificaatdetailpaneel door op de rij te klikken.
2. Controleer de veterinaire gegevens op volledigheid en plausibiliteit.
3. Inspecteer alle geüploade documenten in het documentenraster.
4. Klik op de knop **Goedkeuren** onderaan het paneel.
5. In het bevestigingsvenster:
   - Bekijk de samenvatting van wat u goedkeurt.
   - De vervaldatum wordt automatisch berekend op basis van het certificaattype.
   - Klik op **Bevestigen**.

### Goedkeuringschecklist

Controleer voor goedkeuring:

- [ ] Naam en licentienummer van dierenarts zijn aanwezig
- [ ] Kliniekgegevens zijn compleet en verifieerbaar
- [ ] Documenten zijn leesbaar en bevatten officiële stempels/handtekeningen
- [ ] Certificaatdatum is recent (binnen de afgelopen 12 maanden)
- [ ] Huisdierinformatie op het document komt overeen met het platformrecord
- [ ] Geen tekenen van documentmanipulatie of vervalsing

### Wat er gebeurt na goedkeuring

- De certificaatstatus verandert naar **Goedgekeurd**.
- Een geldigheidsperiode wordt ingesteld op basis van het certificaattype.
- Het profiel van het huisdier toont een gezondheidscertificaatbadge.
- De eigenaar ontvangt een melding ter bevestiging van de goedkeuring.
- De geldigheidsvoortgangsbalk wordt actief in het detailpaneel.

---

## Een certificaat afwijzen

Om een gezondheidscertificaat af te wijzen:

1. Open het certificaatdetailpaneel.
2. Identificeer het/de probleem(en) met de inzending.
3. Klik op de knop **Afwijzen** onderaan het paneel.
4. In het afwijzingsvenster:
   - Voer een **Afwijzingsreden** in het tekstveld in. Dit veld is verplicht.
   - Wees specifiek over wat moet worden gecorrigeerd.
5. Klik op **Afwijzing bevestigen**.

### Veelvoorkomende afwijzingsredenen

| Reden | Voorbeeldbericht |
|-------|-----------------|
| Onleesbare documenten | "Het geüploade document is te wazig om te lezen. Upload alstublieft een duidelijkere scan of foto." |
| Ontbrekende dierenarts-gegevens | "Het certificaat bevat niet het licentienummer van de dierenarts. Dien opnieuw in met volledige veterinaire referenties." |
| Verlopen certificaat | "Dit certificaat is meer dan 12 maanden geleden uitgegeven. Verkrijg en upload alstublieft een actueel certificaat." |
| Niet-overeenkomende huisdierinfo | "De huisdiernaam op het certificaat komt niet overeen met de geregistreerde huisdiernaam. Controleer en dien opnieuw in." |
| Onvolledige documenten | "Alleen pagina 1 van 3 is geüpload. Upload alstublieft alle pagina's van het certificaat." |

### Wat er gebeurt na afwijzing

- De certificaatstatus verandert naar **Afgewezen**.
- De afwijzingsreden wordt weergegeven aan de huisdiereigenaar.
- De eigenaar ontvangt een melding met de reden.
- De eigenaar kan een nieuw certificaat indienen ter vervanging van het afgewezene.

> **Tip:** Geef altijd bruikbare feedback. Vertel de eigenaar precies wat moet worden verbeterd zodat zij het probleem in een herinzending kunnen oplossen.

---

## Een certificaat intrekken

Intrekking wordt gebruikt wanneer een eerder goedgekeurd certificaat ongeldig, frauduleus of niet meer van toepassing blijkt te zijn.

1. Navigeer naar het certificaat (filter eventueel op Status: Goedgekeurd).
2. Open het detailpaneel.
3. Klik op de knop **Intrekken** (alleen zichtbaar voor Goedgekeurde certificaten).
4. In het intrekkingsvenster:
   - Voer de **Reden voor intrekking** in. Dit veld is verplicht.
   - Erken dat deze actie onmiddellijk is en niet ongedaan kan worden gemaakt.
5. Klik op **Intrekking bevestigen**.

### Wanneer intrekken

- Frauduleuze documentatie ontdekt na goedkeuring
- Veterinaire licentie blijkt ongeldig of ingetrokken
- Huisdiereigenaar meldt dat het certificaat per ongeluk is ingediend
- Regelgevende autoriteit markeert het certificaat

### Wat er gebeurt na intrekking

- De gezondheidscertificaatbadge wordt onmiddellijk verwijderd van het huisdierprofiel.
- De certificaatstatus verandert naar **Ingetrokken**.
- De intrekkingsreden wordt opgeslagen en is zichtbaar in het detailpaneel.
- De eigenaar wordt genotificeerd via e-mail en in-app melding.
- De eigenaar moet een nieuw certificaat indienen als zij de badge willen herstellen.

> **Tip:** Intrekking is een serieuze actie die de vertrouwenssignalen van het huisdier op het platform beïnvloedt. Zorg ervoor dat u voldoende bewijs heeft voordat u doorgaat.

---

## Geldigheid en vervaldatum begrijpen

Gezondheidscertificaten hebben een gedefinieerde geldigheidsperiode die bepaalt hoe lang het certificaat actief blijft na goedkeuring.

### Hoe geldigheid werkt

1. Wanneer een certificaat wordt goedgekeurd, berekent het systeem een vervaldatum.
2. De geldigheidsperiode hangt af van het certificaattype:
   - Algemeen gezondheidscertificaat: 12 maanden
   - Vaccinatiecertificaat: Varieert per vaccinatieschema
   - Fokgeschiktheidscertificaat: 6 maanden
3. De **Geldigheidsvoortgangsbalk** in het detailpaneel toont de resterende tijd visueel.

### Vervalmeldingen

Het systeem stuurt automatische meldingen naarmate het verlopen nadert:

| Dagen voor vervaldatum | Melding |
|------------------------|---------|
| 30 dagen | Eerste herinnering aan eigenaar om te vernieuwen |
| 14 dagen | Tweede herinnering met urgentie |
| 7 dagen | Laatste waarschuwing |
| 0 dagen | Certificaat verlopen melding |

### Na het verlopen

- De certificaatstatus verandert automatisch naar **Verlopen**.
- De gezondheidsbadge wordt verwijderd van het huisdierprofiel.
- Het verlopen certificaat blijft in de geschiedenis ter referentie.
- De eigenaar kan op elk moment een nieuw certificaat indienen.

> **Tip:** Monitor de certificatentabel gefilterd op "Goedgekeurd" en gesorteerd op vervaldatum om proactief certificaten te identificeren die bijna verlopen in uw regio.

---

## Bulkacties

Voor efficiënte verwerking van meerdere certificaten:

1. Gebruik de selectievakjes aan de linkerkant van de tabel om meerdere rijen te selecteren.
2. De bulkactiebalk verschijnt bovenaan de tabel.
3. Beschikbare bulkacties:
   - **Alles goedkeuren** -- Keurt alle geselecteerde certificaten met status In afwachting goed met standaard vervaldatum.
   - **Exporteren** -- Downloadt geselecteerde certificaten als een CSV-rapport.

> **Tip:** Bulkgoedkeuring mag alleen worden gebruikt wanneer u elk geselecteerd certificaat individueel heeft geverifieerd. Keur nooit bulksgewijs goed zonder documenten te beoordelen.

---

## Veelgestelde vragen

**V: Kan ik de vervaldatum van een goedgekeurd certificaat bewerken?**
A: Nee. Om de vervaldatum te wijzigen, moet u het huidige certificaat intrekken en de eigenaar vragen opnieuw in te dienen.

**V: Wat als een certificaatdocument in een taal is die ik niet kan lezen?**
A: Escaleer naar een beheerder die die taal leest, of vraag de eigenaar een gecertificeerde vertaling te verstrekken.

**V: Kan een huisdier meerdere actieve certificaten hebben?**
A: Ja. Een huisdier kan tegelijkertijd zowel een algemeen gezondheidscertificaat als specifieke vaccinatiecertificaten actief hebben.

**V: Wie ontvangt de afwijzings-/intrekkingsmeldingen?**
A: De geregistreerde eigenaar van het huisdier ontvangt alle meldingen via e-mail en in-app berichten.
