# Analyses

De pagina Analyses biedt visuele inzichten in platformgebruik, gebruikersgroei, huisdierdemografie en gezondheidsactiviteit. Gebruik deze grafieken om trends te begrijpen, betrokkenheid te meten en datagedreven beslissingen te nemen over het Petfolioo-platform.

![Analytics](/docs/screenshots/analytics.png)

---

## Overzicht

Het Analysedashboard presenteert vier primaire visualisaties samen met een tijdsbereikkiezer die het gegevensvenster voor alle grafieken bepaalt. Elke grafiek wordt dynamisch bijgewerkt wanneer u het geselecteerde tijdsbereik wijzigt.

---

## Analyses openen

1. Klik op **Analyses** in het zijbalknavigatiemenu.
2. Het dashboard laadt met alle grafieken weergegeven op een enkele scrollbare pagina.
3. Het standaard tijdsbereik is **30 dagen**.

---

## Tijdsbereikkiezer

Bovenaan de Analysepagina stelt een tijdsbereikkiezer u in staat de periode van weergegeven gegevens te beheren voor alle grafieken.

### Beschikbare bereiken

| Optie | Periode | Beste voor |
|-------|---------|-----------|
| **7d** | Laatste 7 dagen | Monitoring van recente activiteit en kortetermijntrends |
| **30d** | Laatste 30 dagen | Maandelijkse rapportage en algemene trendanalyse (standaard) |
| **90d** | Laatste 90 dagen | Kwartaalbeoordelingen en middellange-termijn patroonidentificatie |
| **1 jaar** | Laatste 365 dagen | Jaarlijkse beoordelingen, seizoenspatronen en langetermijngroei |

### Het tijdsbereik wijzigen

1. Zoek de tijdsbereikkiezer bovenaan de pagina.
2. Klik op een van de bereikknoppen: **7d**, **30d**, **90d** of **1 jaar**.
3. De geselecteerde knop wordt gemarkeerd om het actieve bereik aan te geven.
4. Alle grafieken op de pagina worden vernieuwd om gegevens voor de gekozen periode weer te geven.
5. Grafiekassen en labels worden automatisch aangepast aan het nieuwe tijdsvenster.

> **Tip:** Begin met 30d voor een algemeen overzicht, vernauw dan naar 7d om recente anomalieën te onderzoeken of breid uit naar 1 jaar voor bestuursniveau-rapportage.

---

## Gebruikersgroei-grafiek

### Grafiektype

Lijngrafiek die gebruikersregistratietrends over tijd weergeeft.

### Wat het toont

De Gebruikersgroei-grafiek visualiseert het aantal nieuwe gebruikersregistraties uitgezet over de geselecteerde tijdsperiode. Elk gegevenspunt vertegenwoordigt het cumulatieve of dagelijkse aantal nieuwe gebruikers.

### De grafiek lezen

| Element | Beschrijving |
|---------|-------------|
| **X-as** | Tijd (datums of weken afhankelijk van het geselecteerde bereik) |
| **Y-as** | Aantal nieuwe gebruikersregistraties |
| **Lijn** | Een doorlopende lijn die gegevenspunten verbindt en het groeitraject toont |
| **Gegevenspunten** | Aanwijsbare markers op de lijn die exacte waarden tonen |
| **Tooltip** | Verschijnt bij hover met de datum en het exacte registratieaantal |

### De gegevens interpreteren

1. **Opwaartse trend** -- Consistente groei in gebruikersacquisitie. Het platform trekt gestaag nieuwe gebruikers aan.
2. **Vlakke lijn** -- Gebruikersacquisitie is gestabiliseerd. Overweeg marketinginspanningen of functielanceringen om groei te heractiveren.
3. **Pieken** -- Plotselinge stijgingen kunnen correleren met marketingcampagnes, persaandacht of app store-vermeldingen.
4. **Dalen** -- Afnames in dagelijkse registraties kunnen seizoenspatronen of technische problemen aangeven.

### Tijdsbereikgedrag

| Bereik | X-as granulariteit | Opmerkingen |
|--------|-------------------|------------|
| 7d | Dagelijks | Elke dag individueel getoond |
| 30d | Dagelijks | Elke dag getoond, goed voor het identificeren van weekpatronen |
| 90d | Wekelijks | Gegevens geaggregeerd per week voor leesbaarheid |
| 1 jaar | Maandelijks | Gegevens geaggregeerd per maand om jaarlijks traject te tonen |

> **Tip:** Vergelijk de 7d-weergave met de 30d-weergave. Als de trend van de afgelopen 7 dagen boven het 30-daags gemiddelde ligt, versnelt de groei.

---

## Soortverdeling-grafiek

### Grafiektype

Taartgrafiek (of donutgrafiek) die de verhouding van huisdieren per soort toont.

### Wat het toont

De Soortverdeling-grafiek splitst alle geregistreerde huisdieren uit per soortcategorie en toont de relatieve verhouding van elk.

### De grafiek lezen

| Element | Beschrijving |
|---------|-------------|
| **Segmenten** | Elk segment vertegenwoordigt een soort (bijv. Hond, Kat, Vogel, Konijn) |
| **Kleuren** | Elke soort krijgt een aparte kleur voor identificatie |
| **Labels** | Soortnaam en percentage getoond op of bij elk segment |
| **Legenda** | Een legenda koppelt kleuren aan soortnamen |
| **Tooltip** | Beweeg over een segment om het exacte aantal en percentage te zien |

### De gegevens interpreteren

1. **Dominante soort** -- Het grootste segment geeft het primaire huisdiertype van uw gebruikersbasis aan. Gebruik dit om functies te prioriteren.
2. **Kleine segmenten** -- Soorten met zeer kleine percentages kunnen kansen voor groei aangeven in ondervertegenwoordigde segmenten.
3. **Balans** -- Een redelijk gelijke verdeling suggereert brede aantrekkingskracht over huisdiereigenaartypen.

### Toepassingen

- **Functieprioritering** -- Als 70% van de huisdieren honden zijn, prioriteer dan hondspecifieke functies.
- **Inhoudsplanning** -- Maak educatieve inhoud proportioneel aan de soortverdeling.
- **Marketingtargeting** -- Begrijp welke doelgroepsegmenten het grootst zijn voor advertentiecampagnes.
- **Meldingtargeting** -- De doelgroepsegmenten in Meldingen (Hondeneigenaren, Katteneigenaren) correleren direct met deze grafiek.

> **Tip:** Als u merkt dat een soort sneller groeit dan andere (vergelijk 30d vs 1 jaar), overweeg dan te investeren in soortspecifieke functies om op de trend in te spelen.

---

## Populaire rassen-grafiek

### Grafiektype

Horizontale staafgrafiek die de meest populaire rassen rangschikt.

### Wat het toont

De grafiek Populaire rassen toont de toprassen geregistreerd op het platform, gerangschikt op aantal. Staven strekken zich horizontaal uit, waardoor het eenvoudig is om populariteit tussen rassen te vergelijken.

### De grafiek lezen

| Element | Beschrijving |
|---------|-------------|
| **Y-as** | Rasnamen, geordend van meest populair (boven) tot minst populair (onder) |
| **X-as** | Aantal geregistreerde huisdieren van dat ras |
| **Staven** | Horizontale staven waarvan de lengte het aantal huisdieren vertegenwoordigt |
| **Labels** | Aantalwaarde weergegeven aan het einde van elke staaf |
| **Tooltip** | Beweeg voor exact aantal en percentage van totaal |

### De gegevens interpreteren

1. **Toprassen** -- De langste staven vertegenwoordigen de meest voorkomende rassen op het platform. Deze gebruikers zijn uw kerndoelgroep.
2. **Lange staart** -- Veel rassen met kleine aantallen duiden op diverse gebruikersinteresses.
3. **Rasconcentratie** -- Als enkele rassen domineren (bijv. top 3 is verantwoordelijk voor 50%+), heeft uw platform een geconcentreerde gebruikersbasis.

### Typische inzichten

| Patroon | Inzicht | Actie |
|---------|---------|-------|
| Golden Retriever domineert | Grote familie-hondendoelgroep | Prioriteer functies voor middelgrote/grote hondenrassen |
| Perzische Kat in top 5 | Sterk katteneigenaar-segment | Investeer in katspecifieke gezondheidsstracking |
| Exotische rassen verschijnen | Nichefokkers sluiten aan | Overweeg fokkerspecifieke premiumfuncties |
| Gelijke verdeling | Diverse gebruikersbasis | Bouw algemene functies in plaats van rasspecifieke |

### Grafieklimieten

- De grafiek toont standaard de **top 10-15 rassen**.
- Resterende rassen worden indien van toepassing gegroepeerd onder "Overig".
- Het aantal zichtbare rassen kan variëren per tijdsbereik.

> **Tip:** Kruis populaire rassen met gezondheidsactiviteitsgegevens. Als een populair ras lage gezondheidsrecordactiviteit heeft, hebben die gebruikers mogelijk betrokkenheidsprikkels nodig.

---

## Gezondheidsactiviteit-grafiek

### Grafiektype

Gegroepeerde staafgrafiek die gezondheidsgerelateerde activiteiten per type toont.

### Wat het toont

De grafiek Gezondheidsactiviteit toont het volume van gezondheidsgerelateerde acties op het platform, gegroepeerd per activiteitstype. Dit helpt u te begrijpen hoe actief gebruikers gezondheidsfuncties gebruiken.

### De grafiek lezen

| Element | Beschrijving |
|---------|-------------|
| **X-as** | Tijdsperioden (dagen, weken of maanden afhankelijk van bereik) |
| **Y-as** | Aantal gezondheidsactiviteiten |
| **Staafgroepen** | Meerdere staven per tijdsperiode, een voor elk activiteitstype |
| **Kleuren** | Elk activiteitstype heeft een aparte kleur |
| **Legenda** | Koppelt kleuren aan activiteitstypen (Vaccinaties, Controles, Medicatie, enz.) |
| **Tooltip** | Beweeg voor exact aantal per activiteitstype per periode |

### Activiteitstypen

| Activiteit | Beschrijving | Kleur (typisch) |
|------------|-------------|-----------------|
| **Vaccinaties** | Vaccinatierecords aangemaakt of bijgewerkt | Blauw |
| **Gezondheidsgegevens** | Algemene gezondheidsrecords gelogd | Groen |
| **Gewichtstracking** | Gewichtsmetingen vastgelegd | Oranje |
| **Medicatie** | Medicatievermeldingen toegevoegd | Paars |

### De gegevens interpreteren

1. **Hoge vaccinatiestaven** -- Gebruikers volgen actief vaccinaties. Het herinneringssysteem stimuleert waarschijnlijk betrokkenheid.
2. **Lage gezondheidsrecordstaven** -- Gebruikers zijn mogelijk niet op de hoogte van de gezondheidsrecordsfunctie. Overweeg in-app prompts.
3. **Seizoenspatronen** -- Sommige gezondheidsactiviteiten pieken seizoensgebonden (bijv. vlooienbehandelingen in het voorjaar).
4. **Groeiende staven over tijd** -- Adoptie van gezondheidsfuncties neemt toe, wat goede gebruikersbetrokkenheid aangeeft.
5. **Dalende staven** -- Gebruikers verliezen mogelijk interesse of ondervinden wrijving bij het loggen van gezondheidsgegevens.

### Activiteitstypen vergelijken

Het gegroepeerde formaat laat u visueel vergelijken:

- Welke gezondheidsfuncties het meest worden gebruikt vs. onderbenut.
- Of een activiteitstype groeit terwijl andere afnemen.
- Hoe verschillende tijdsbereiken verschillende patronen onthullen.

> **Tip:** Als vaccinatieactiviteit hoog is maar andere gezondheidstracking laag, overweeg dan cross-feature prompts toe te voegen: "U heeft een vaccinatie gelogd -- wilt u ook het gewicht van Rex vastleggen?"

---

## Dashboard-indeling

De vier grafieken zijn op de Analysepagina gerangschikt in een rasterindeling:

```
+---------------------------+---------------------------+
|                           |                           |
|    Gebruikersgroei        |    Soortverdeling         |
|    (Lijngrafiek)          |    (Taartgrafiek)         |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Populaire rassen       |    Gezondheidsactiviteit  |
|    (Horizontale staaf)    |    (Gegroepeerde staaf)   |
|                           |                           |
+---------------------------+---------------------------+
```

Elke grafiek neemt een kaart in met:
- Een titelkop
- De grafiekvisualisatie
- Interactieve tooltips bij hover
- Responsieve afmetingen die zich aanpassen aan de schermbreedte

---

## Interactie met grafieken

### Hover-tooltips

1. Beweeg uw cursor over een gegevenspunt, staaf of grafieksegment.
2. Er verschijnt een tooltip met:
   - De exacte waarde
   - Het label (datum, rasnaam, soort, enz.)
   - Percentage waar van toepassing

### Responsief gedrag

1. Op grotere schermen worden grafieken in een 2x2 raster weergegeven.
2. Op kleinere schermen worden grafieken verticaal gestapeld voor leesbaarheid.
3. Grafiekelementen worden proportioneel geschaald.

### Gegevensvernieuwing

1. Analysegegevens worden vernieuwd wanneer de pagina laadt.
2. Het wijzigen van het tijdsbereik start een nieuwe gegevensophaling.
3. Er is geen auto-vernieuwing -- herlaad de pagina handmatig voor de nieuwste gegevens.

---

## Veelvoorkomende analyseworkflows

### Maandelijkse rapportage

1. Selecteer het bereik **30d**.
2. Noteer de Gebruikersgroei-trend (stijgend, vlak of dalend).
3. Controleer Soortverdeling op verschuivingen.
4. Bekijk Populaire rassen op opkomende trends.
5. Onderzoek Gezondheidsactiviteit op betrokkenheidsniveaus.
6. Maak screenshots of exporteer gegevens voor rapporten.

### Een daling onderzoeken

1. Begin met **30d** om te identificeren wanneer de daling optrad.
2. Schakel naar **7d** om de meest recente periode in detail te onderzoeken.
3. Controleer of de daling correleert met:
   - Een systeemprobleem (controleer Instellingen > Onderhoudsmodus-geschiedenis)
   - Een verstuurde melding (controleer Meldingsgeschiedenis)
   - Een seizoenspatroon (vergelijk met 1 jaar-weergave)

### Kwartaalbeoordeling

1. Selecteer het bereik **90d**.
2. Vergelijk het groeitraject met vorige kwartalen.
3. Identificeer welke gezondheidsactiviteiten het meest groeiden.
4. Let op nieuwe rassen die verschijnen in de Populaire rassen-grafiek.
5. Gebruik Soortverdeling om marketingstrategieafstemming te valideren.

### Jaarlijkse planning

1. Selecteer het bereik **1 jaar**.
2. Identificeer seizoenspatronen in Gebruikersgroei (bijv. feestdagenpieken).
3. Volg jaar-over-jaar raspopulariteitswijzigingen.
4. Meet adoptie van gezondheidsfuncties over het hele jaar.
5. Gebruik inzichten voor de productroadmap.

---

## Gegevensversheid begrijpen

| Aspect | Detail |
|--------|--------|
| Gegevensbron | Platformdatabase (geaggregeerd) |
| Updatefrequentie | Realtime bij paginalading |
| Historische nauwkeurigheid | Compleet terug tot platformlancering |
| Tijdzone | Servertijd (UTC) |
| Ontbrekende gegevens | Hiaten getoond als nulwaarden, niet geïnterpoleerd |

---

## Probleemoplossing

| Probleem | Oplossing |
|----------|----------|
| Grafieken laden niet | Controleer uw netwerkverbinding. Vernieuw de pagina. |
| Gegevens lijken verouderd | Analyses laden bij paginabezoek. Navigeer weg en keer terug, of vernieuw. |
| Nulwaarden voor alle metrics | Verifieer dat het geselecteerde tijdsbereik gegevens bevat. Probeer uit te breiden naar 1 jaar. |
| Grafiektooltips verschijnen niet | Probeer een andere browser. Zorg ervoor dat JavaScript is ingeschakeld. |
| Tijdsbereik verandert niet | Klik direct op de bereikknop. Als onresponsief, vernieuw de pagina. |
| Kan Analyses niet openen | Verifieer dat uw rol en rechten Analyses-paginatoegang bevatten. |

---

## Gerelateerde pagina's

- [Instellingen](./settings.md) -- Configureer platforminstellingen die gebruikersgedrag beïnvloeden
- [Meldingen](./notifications.md) -- Stuur meldingen die betrokkenheidsmetrics kunnen beïnvloeden
- [Feedback](./feedback.md) -- Correleer gebruikersfeedback met analysetrends
- [Beheerders](./admin-users.md) -- Verleen analysetoegang aan teamleden
