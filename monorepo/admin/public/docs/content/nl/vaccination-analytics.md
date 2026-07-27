# Vaccinatieanalyses

De module Vaccinatieanalyses biedt beheerders inzichten in vaccinatietrends op het platform. Gebruik dit dashboard om te begrijpen welke vaccins het meest worden toegediend, regionale patronen te identificeren en de algehele vaccinatiedekking te volgen.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | View |
> | Viewer | View only |

---

## Dashboardoverzicht

De pagina Vaccinatieanalyses is georganiseerd in de volgende secties:

1. **Samenvattingsstatistieken** -- Belangrijke metrics bovenaan de pagina
2. **Top 20 vaccins ranglijst** -- Gerangschikte lijst van meestgebruikte vaccins
3. **Podiumvisualisatie** -- Uitlichting van de top 3 vaccins
4. **Uitsplitsing per vaccin** -- Soortverdeling voor elk vaccin
5. **Toplocaties** -- Geografische verdeling per vaccin

---

## Samenvattingsstatistieken

Bovenaan de analysepagina tonen drie statistiekkaarten geaggregeerde metrics:

| Statistiekkaart | Beschrijving | Pictogram |
|-----------------|-------------|-----------|
| Totaal vaccinaties | Totaal aantal vaccinatierecords voor alle huisdieren | Spuit |
| Unieke vaccins | Aantal verschillende vaccintypen die zijn toegediend | Fles |
| Gevaccineerde huisdieren | Aantal unieke huisdieren met ten minste een vaccinatie | Poot |

### De statistieken lezen

- **Totaal vaccinaties** telt individuele vaccinatiegebeurtenissen (een huisdier dat een vaccin ontvangt = 1 telling).
- **Unieke vaccins** toont de variëteit aan vaccins in het systeem (bijv. Rabiës, DHPP, FVRCP tellen elk als 1).
- **Gevaccineerde huisdieren** is ontdubbeld -- een huisdier met 5 vaccinaties telt nog steeds als 1 huisdier.

> **Tip:** Vergelijk Totaal vaccinaties met Gevaccineerde huisdieren om het gemiddeld aantal vaccinaties per huisdier op het platform te begrijpen.

---

## Filters

De filterbalk is van toepassing op alle secties van de analysepagina tegelijkertijd.

### Tijdsperiodefilter

Selecteer een tijdsbereik voor de gegevens:

| Optie | Beschrijving |
|-------|-------------|
| Laatste 7 dagen | Afgelopen week |
| Laatste 30 dagen | Afgelopen maand |
| Laatste 90 dagen | Afgelopen kwartaal |
| Laatste 12 maanden | Afgelopen jaar |
| Alle tijd | Geen tijdsbeperking |
| Aangepast bereik | Datumkiezer voor begin- en einddatum |

### Soortfilter

Filter vaccinatiegegevens op huisdiersoort:

- Alle soorten (standaard)
- Hond
- Kat
- Vogel
- Konijn
- Overig

### Landfilter

Selecteer een of meer landen om alleen vaccinatiegegevens uit die regio's te zien.

### Stadfilter

Verfijn resultaten verder door specifieke steden binnen het gekozen land te selecteren.

> **Tip:** Combineer filters om specifieke vragen te beantwoorden. Bijvoorbeeld: "Wat zijn de topvaccins voor honden in het Verenigd Koninkrijk in de afgelopen 12 maanden?"

### Filters toepassen

1. Stel uw gewenste filterwaarden in met de dropdowns.
2. Klik op **Filters toepassen** of de filters worden automatisch toegepast bij wijziging.
3. Alle dashboardsecties worden bijgewerkt om de gefilterde gegevens weer te geven.
4. Actieve filters worden als tags onder de filterbalk weergegeven.
5. Klik op de **X** op een filtertag om deze te verwijderen, of klik op **Alles wissen** om te resetten.

---

## Top 20 vaccins ranglijst

De ranglijst toont de 20 meest toegediende vaccins op basis van de huidige filterselectie.

### Tabelkolommen

| Kolom | Beschrijving |
|-------|-------------|
| Rang | Positie van 1 tot 20 |
| Vaccinnaam | Naam van het vaccin |
| Aantal | Aantal keer toegediend |
| Percentage | Aandeel van het totaal aantal vaccinaties |
| Trend | Sparkline die de gebruikstrend over de geselecteerde periode toont |

### De ranglijst lezen

1. Vaccins zijn gesorteerd op aantal in aflopende volgorde.
2. De kolom **Percentage** toont welk deel van alle vaccinaties dit vaccin vertegenwoordigt.
3. De **Trend**-sparkline geeft een snel visueel beeld of het gebruik stijgt, stabiel is of daalt.
4. Beweeg over de sparkline om gegevenspuntwaarden te zien.

### Interactie met de ranglijst

- Klik op een vaccinrij om naar de gedetailleerde uitsplitsingssectie te scrollen.
- Gebruik de kolomkoppen om opnieuw te sorteren (hoewel de standaard rangvolgorde het nuttigst is).
- De tabel is gepagineerd als filters in zeldzame configuraties meer dan 20 resultaten opleveren.

> **Tip:** Een vaccin met een stijgende trend kan wijzen op een regionale uitbraakrespons of een nieuwe aanbeveling van veterinaire verenigingen.

---

## Podiumvisualisatie

Het podium benadrukt de top 3 vaccins in een visuele prijsstijlweergave.

### Indeling

```
        [1e]
   [2e]     [3e]
```

- **1e plaats (midden, hoogst):** Goudkleurige kaart met het meest toegediende vaccin.
- **2e plaats (links):** Zilverkleurige kaart met het op een na meest toegediende vaccin.
- **3e plaats (rechts):** Bronskleurige kaart met het op twee na meest toegediende vaccin.

### Kaartinhoud

Elke podiumkaart toont:

- Rangmedaillepictogram (goud, zilver, brons)
- Vaccinnaam
- Totaal aantal toedieningen
- Percentage van alle vaccinaties
- Primaire soort (meest voorkomende soort die dit vaccin ontvangt)

### Het podium lezen

Het podium biedt een overzicht in een oogopslag van vaccinatiepatronen op het platform. Veelvoorkomende resultaten zijn:

- **Honden:** Rabiës, DHPP (Distemper/Parvo), Bordetella domineren vaak.
- **Katten:** FVRCP, Rabiës, FeLV zijn typische topvaccins.
- **Gemengde platforms:** Rabiës staat vaak vooraan over alle soorten.

> **Tip:** Als het podium onverwachte resultaten toont na het toepassen van filters, controleer dan of het tijdsperiode- of locatiefilter een kleine steekproefomvang produceert die de rankings kan vertekenen.

---

## Uitsplitsing per vaccin op soort

Onder de ranglijst heeft elk vaccin in de top 20 een uitklapbare sectie die de soortverdeling toont.

### De uitsplitsing bekijken

1. Klik op de uitklappijl naast een vaccin in de ranglijst.
2. Er verschijnt een horizontale gestapelde staafgrafiek die de soortverdeling toont.
3. Elk segment is kleurgecodeerd per soort:
   - Honden: Blauw
   - Katten: Oranje
   - Vogels: Groen
   - Konijnen: Paars
   - Overig: Grijs

### Uitsplitsingstabel

Naast de staafgrafiek toont een kleine tabel:

| Soort | Aantal | Percentage |
|-------|--------|------------|
| Hond | 1.234 | 62% |
| Kat | 456 | 23% |
| Vogel | 200 | 10% |
| Konijn | 80 | 4% |
| Overig | 20 | 1% |

### Toepassingen

- Identificeer vaccins die soortspecifiek zijn versus soortoverschrijdend.
- Detecteer ongebruikelijke patronen (bijv. een hondspecifiek vaccin dat verschijnt in kattenrecords kan wijzen op gegevensinvoerfouten).
- Begrijp de soortsamenstelling van uw platform via vaccinatiegegevens.

> **Tip:** Soortspecifieke vaccins die onder de verkeerde soort verschijnen duiden vaak op gegevenskwaliteitsproblemen die onderzocht moeten worden.

---

## Toplocaties per vaccin

Elk vaccin toont ook een geografische uitsplitsing van waar het het vaakst wordt toegediend.

### Locatiegegevens bekijken

1. Klik op de uitklappijl naast een vaccin in de ranglijst.
2. Schakel naar het tabblad **Locaties** binnen de uitgevouwen sectie.
3. Er verschijnt een gerangschikte lijst van de top 10 locaties.

### Locatietabel

| Rang | Land | Stad | Aantal | Percentage |
|------|------|------|--------|------------|
| 1 | Duitsland | Berlijn | 543 | 18% |
| 2 | Verenigd Koninkrijk | Londen | 421 | 14% |
| 3 | Frankrijk | Parijs | 389 | 13% |
| ... | ... | ... | ... | ... |

### Kaartweergave

Indien beschikbaar toont een mini-heatmap de concentratie van vaccinaties geografisch:

- Donkerdere regio's geven hogere vaccinatieaantallen aan.
- Beweeg over een regio om het exacte aantal te zien.
- Klik op een regio om het als locatiefilter toe te passen.

### Toepassingen

- Identificeer regionale vaccinatievoorkeuren of -vereisten.
- Detecteer clusters die kunnen overeenkomen met lokale veterinaire aanbevelingen.
- Plan regionale outreach- of partnerschapscampagnes.

> **Tip:** Sommige vaccins zijn wettelijk verplicht in specifieke landen (bijv. rabiës in Duitsland). Hoge concentraties in bepaalde regio's zijn te verwachten voor verplichte vaccins.

---

## Gegevens exporteren

Om vaccinatieanalysegegevens te exporteren:

1. Klik op de knop **Exporteren** rechtsboven op de pagina.
2. Kies het exportformaat:
   - **CSV** -- Ruwe gegevens voor spreadsheetanalyse
   - **PDF** -- Opgemaakt rapport met grafieken
3. De export respecteert alle momenteel actieve filters.
4. Het bestand wordt gedownload naar de standaard downloadlocatie van uw browser.

### Exportinhoud

De CSV-export bevat:

- Vaccinnaam
- Totaal aantal
- Uitsplitsingsaantallen per soort
- Toplanden en -steden
- Trendgegevenspunten
- Gebruikte filterparameters

> **Tip:** Gebruik CSV-exports om aangepaste visualisaties te maken in tools zoals Excel of Google Sheets, of om gegevens te delen met veterinaire adviespartners.

---

## Dashboard vernieuwen

Analysegegevens worden berekend uit vaccinatierecords en gecachet voor prestaties.

- Gegevens worden elke 24 uur automatisch vernieuwd.
- Het tijdstempel van de laatste vernieuwing wordt onderaan de pagina getoond.
- Klik op het **Vernieuwen**-pictogram naast het tijdstempel om een handmatige vernieuwing te starten.
- Handmatig vernieuwen kan 10-30 seconden duren afhankelijk van het gegevensvolume.

> **Tip:** Als u discrepanties opmerkt tussen het analysedashboard en individuele huisdierrecords, probeer dan een handmatige vernieuwing. Recent toegevoegde vaccinaties verschijnen mogelijk pas bij de volgende cachevernieuwing.

---

## Veelgestelde vragen

**V: Waarom komt het totaal in de ranglijst niet overeen met het totaal in de Samenvattingsstatistieken?**
A: De ranglijst toont de top 20 vaccins. Als er meer dan 20 unieke vaccins zijn, worden de overige niet vermeld maar tellen zij wel mee voor het totaal.

**V: Kan ik gegevens voor een specifieke fokker of eigenaar zien?**
A: Nee. De analysepagina toont geaggregeerde platformgegevens. Individuele vaccinatierecords zijn beschikbaar op het profiel van elk huisdier.

**V: Waarom tonen sommige vaccins nul trendgegevens?**
A: Nieuwe vaccins die slechts eenmaal zijn geregistreerd hebben mogelijk niet genoeg gegevenspunten om een zinvolle trendlijn te genereren.

**V: Hoe ver gaan historische gegevens terug?**
A: Het filter "Alle tijd" bevat elk vaccinatierecord sinds de platformlancering. Er is geen gegevensretentielimiet voor analyses.

**V: Kan ik twee tijdsperioden vergelijken?**
A: Niet direct in het dashboard. Exporteer gegevens voor twee verschillende tijdsperioden en vergelijk ze in een spreadsheet.
