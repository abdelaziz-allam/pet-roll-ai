# Dashboard

Het Dashboard is het eerste scherm dat u ziet na het inloggen op het Petfolioo Admin Portaal. Het biedt een realtime overzicht van de platformgezondheid via key performance indicators (KPI's), interactieve grafieken en recente activiteitsfeeds. Gebruik het dashboard om groeitrends te monitoren, aandachtspunten te identificeren en platformbetrokkenheid in een oogopslag te volgen.

![Dashboard](/docs/screenshots/dashboard.png)

---

## KPI-kaarten

Bovenaan het dashboard geven vier samenvattingskaarten de belangrijkste metrics van het platform weer. Elke kaart toont het huidige totaal en een procentuele veranderingsindicator vergeleken met de vorige periode.

### Kaartdefinities

| Kaart | Metric | Beschrijving |
|-------|--------|-------------|
| Totaal gebruikers | Aantal geregistreerde app-gebruikers | Alle gebruikers die een account op het platform hebben aangemaakt |
| Totaal huisdieren | Aantal geregistreerde huisdieren | Alle huisdieren die aan het register zijn toegevoegd, ongeacht status |
| Openstaande verificaties | Items die wachten op beoordeling | Verificatieverzoeken die nog niet zijn goedgekeurd of afgewezen |
| Actieve vermeldingen | Momenteel zichtbare vermeldingen | Huisdieren gemarkeerd als beschikbaar voor fokken of adoptie |

### Groeipercentage

Elke KPI-kaart bevat een groei-indicator:

- Een **groene pijl omhoog** met een percentage geeft groei aan ten opzichte van de vorige periode.
- Een **rode pijl omlaag** met een percentage geeft een daling aan ten opzichte van de vorige periode.
- De vergelijkingsperiode komt overeen met het geselecteerde tijdsbereik (zie Tijdsbereikkiezer hieronder).

> **Tip:** Beweeg over een KPI-kaart om de exacte aantallen voor de huidige en vorige perioden in een tooltip te zien.

### De kaarten lezen

1. Het **grote getal** is het huidige totale aantal.
2. Het **percentagebadge** eronder toont de periode-over-periodewijziging.
3. Het **label** bovenaan identificeert welke metric wordt weergegeven.
4. Klik op een kaart om direct naar de bijbehorende module te navigeren (bijv. klikken op "Totaal gebruikers" opent de Gebruikerslijst).

---

## Tijdsbereikkiezer

De tijdsbereikkiezer bepaalt het gegevensvenster voor alle dashboardanalyses en KPI-vergelijkingen.

### Beschikbare bereiken

| Optie | Periode | Vergelijking met |
|-------|---------|-----------------|
| 7d | Laatste 7 dagen | Vorige 7 dagen |
| 30d | Laatste 30 dagen | Vorige 30 dagen |
| 90d | Laatste 90 dagen | Vorige 90 dagen |
| Alle tijd | Sinds platformlancering | Geen vergelijking (groeipercentage verborgen) |

### Het tijdsbereik wijzigen

1. Zoek de **tijdsbereikkiezer** rechtsboven op het dashboard, boven de KPI-kaarten.
2. Klik op een van de periodeknoppen: **7d**, **30d**, **90d** of **Alle tijd**.
3. Het volledige dashboard wordt vernieuwd om de geselecteerde periode weer te geven.
4. KPI-groeipercentages worden herberekend op basis van het nieuwe vergelijkingsvenster.

> **Opmerking:** De optie "Alle tijd" verbergt groeipercentages omdat er geen vorige periode is om mee te vergelijken.

---

## Huisdieranalyse-sectie

Onder de KPI-kaarten presenteert de sectie Huisdieranalyse visuele uitsplitsingen van de huisdierregistergegevens. Drie grafiektypen bieden verschillende perspectieven op de huisdierpopulatie.

### Soortverdeling (Taartgrafiek)

De taartgrafiek toont de proportionele verdeling van huisdieren per soort.

| Element | Beschrijving |
|---------|-------------|
| Grafiektype | Donut-/taartgrafiek |
| Gegevensbron | Alle geregistreerde huisdieren gegroepeerd per soort |
| Segmenten | Een segment per soort (bijv. Hond, Kat, Vogel, Konijn, Reptiel) |
| Labels | Soortnaam en aantal weergegeven bij hover |
| Legenda | Kleurgecodeerde legenda onder of naast de grafiek |

**Interactie met de taartgrafiek:**

1. Beweeg over een segment om het exacte aantal en percentage voor die soort te zien.
2. Klik op een segment om andere dashboardgrafieken te filteren op alleen die soort.
3. De legenda-items zijn klikbaar - klik op een soortnaam om de zichtbaarheid in de grafiek te schakelen.

### Geslachtsverdeling (Staafgrafiek)

De verticale staafgrafiek toont de verdeling van huisdieren per geslacht.

| Element | Beschrijving |
|---------|-------------|
| Grafiektype | Verticale staafgrafiek |
| X-as | Geslachtscategorieën (Mannelijk, Vrouwelijk, Onbekend) |
| Y-as | Aantal huisdieren |
| Staven | Een staaf per geslacht, kleurgecodeerd |
| Labels | Aantal weergegeven boven elke staaf |

**De geslachtsgrafiek lezen:**

1. Elke staaf vertegenwoordigt een geslachtscategorie.
2. De hoogte van de staaf komt overeen met het totale aantal huisdieren van dat geslacht.
3. Het exacte aantal wordt als label boven elke staaf weergegeven.
4. Beweeg voor aanvullende details inclusief percentage van het totaal.

### Landenverdeling (Horizontale staafgrafiek)

De horizontale staafgrafiek rangschikt landen op basis van het aantal geregistreerde huisdieren.

| Element | Beschrijving |
|---------|-------------|
| Grafiektype | Horizontale staafgrafiek |
| Y-as | Landnamen (gesorteerd op aantal, aflopend) |
| X-as | Aantal huisdieren |
| Staven | Een horizontale staaf per land |
| Weergave | Standaard worden de top 10 landen getoond |

**De landengrafiek lezen:**

1. Landen zijn gesorteerd van meeste huisdieren (boven) naar minste (onder).
2. Standaard worden alleen de top 10 landen weergegeven.
3. Beweeg over een staaf om het exacte aantal en percentage van het totaal te zien.
4. De staaflengte is proportioneel aan het aantal ten opzichte van andere landen.

---

## Geo- en soortfilters

Boven de analysegrafieken kunt u met filterbesturingen de weergegeven gegevens verfijnen.

### Beschikbare filters

| Filter | Type | Opties |
|--------|------|--------|
| Soort | Dropdown selectie | Alle soorten beschikbaar op het platform (bijv. Hond, Kat, Vogel, enz.) |
| Land | Dropdown selectie | Alle landen met geregistreerde huisdieren |

### Filters toepassen

1. Klik op de **Soort**-dropdown om een specifieke huisdiersoort te selecteren.
2. Klik op de **Land**-dropdown om een specifiek land te selecteren.
3. Grafieken en tabellen hieronder worden onmiddellijk bijgewerkt om het filter weer te geven.
4. Filters kunnen worden gecombineerd - selecteer zowel een soort als een land om resultaten verder te verfijnen.
5. Om te resetten, selecteer "Alle" uit elke dropdown of klik op de knop **Filters resetten**.

> **Tip:** Gebruik het soortfilter in de taartgrafiekweergave om in te zoomen op rasverdelingen binnen een enkele soort.

### Filtergedrag

| Scenario | Effect |
|----------|--------|
| Geen filters geselecteerd | Alle gegevens worden globaal weergegeven |
| Alleen soort geselecteerd | Grafieken tonen gegevens voor die soort in alle landen |
| Alleen land geselecteerd | Grafieken tonen gegevens voor alle soorten in dat land |
| Beide geselecteerd | Grafieken tonen gegevens voor de geselecteerde soort in het geselecteerde land |

---

## Tabel met recente gebruikersregistraties

Onder de analysegrafieken toont een tabel de meest recente gebruikersregistraties op het platform.

### Tabelkolommen

| Kolom | Beschrijving |
|-------|-------------|
| Avatar | Miniatuur van profielfoto van de gebruiker |
| Naam | Weergavenaam van de gebruiker |
| E-mail | Geregistreerd e-mailadres van de gebruiker |
| Aanmelddatum | Datum en tijd waarop het account is aangemaakt |
| Status | Accountstatus (Actief, In afwachting, Geblokkeerd) |
| Huisdieren | Aantal huisdieren geregistreerd door deze gebruiker |

### Tabelfuncties

1. **Sorteren** - Klik op een kolomkop om op die kolom te sorteren. Klik opnieuw om de sorteervolgorde om te keren.
2. **Paginering** - De tabel toont standaard 10 vermeldingen per pagina. Gebruik de pagineringsbesturingen onderaan om te navigeren.
3. **Snelle acties** - Beweeg over een rij om een "Bekijk"-knop te tonen die het gebruikersdetailpaneel opent.

### Statusindicatoren begrijpen

| Status | Badgekleur | Betekenis |
|--------|------------|---------|
| Actief | Groen | Account is in goede staat en volledig functioneel |
| In afwachting | Oranje | Account aangemaakt maar e-mail nog niet geverifieerd |
| Geblokkeerd | Rood | Account is geschorst door een beheerder |

> **Opmerking:** De tabel met recente registraties toont altijd de nieuwste gebruikers eerst, ongeacht de instelling van de tijdsbereikkiezer. Het toont registraties van de afgelopen 30 dagen.

---

## Dashboard best practices

### Dagelijkse monitoringchecklist

1. Controleer de KPI-kaart **Openstaande verificaties** - een hoog aantal kan wijzen op een achterstand.
2. Bekijk de **groeipercentages** op alle vier de kaarten voor onverwachte dalingen.
3. Scan de tabel **Recente gebruikersregistraties** op verdachte accounts.
4. Let op significante verschuivingen in de grafiek **Landenverdeling**.

### Trends interpreteren

| Trend | Mogelijke betekenis | Aanbevolen actie |
|-------|--------------------|--------------------|
| Plotselinge piek in registraties | Succes van marketingcampagne of botactiviteit | Controleer recente gebruikers op verdachte patronen |
| Daling in actieve vermeldingen | Seizoensverandering of beleidsprobleem | Bekijk recente blokkeringsacties en verlopen vermeldingen |
| Veel openstaande verificaties | Onderbezetting moderatie | Wijs extra moderatoren aan |
| Verschuiving in soortenbalans | Regionale trend of categorieconfiguratiefout | Controleer categorie-instellingen |

---

## Dashboard-prestaties

Het dashboard laadt gegevens asynchroon. Elke sectie laadt onafhankelijk:

1. **KPI-kaarten** laden eerst (snelste query).
2. **Grafieken** laden daarna met een korte laadspinner.
3. **Tabel met recente registraties** laadt als laatste.

Als een sectie een laadfout toont:

1. Controleer uw internetverbinding.
2. Probeer de pagina te vernieuwen.
3. Als de fout aanhoudt, kan de backend-service problemen ondervinden.

> **Tip:** Het dashboard wordt elke 5 minuten automatisch vernieuwd. U kunt handmatig vernieuwen door op het vernieuwingspictogram in de kopbalk te klikken of op `F5` te drukken.

---

*Vorige: [Aan de slag](./getting-started.md) | Volgende: [Huisdierenregister](./pets.md)*
