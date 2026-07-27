# Analyser

Analysesiden giver visuel indsigt i platformbrug, brugervækst, kæledyrsdemografi og sundhedsaktivitet. Brug disse diagrammer til at forstå tendenser, måle engagement og træffe datadrevne beslutninger om Petfolioo-platformen.

![Analytics](/docs/screenshots/analytics.png)

---

## Oversigt

Analyse-dashboardet præsenterer fire primære visualiseringer sammen med en tidsintervalvælger, der styrer datavinduet for alle diagrammer. Hvert diagram opdateres dynamisk, når du ændrer det valgte tidsinterval.

---

## Adgang til analyser

1. Klik på **Analyser** i sidebjælkenavigationsmenuen.
2. Dashboardet indlæses med alle diagrammer vist på en enkelt scrollbar side.
3. Standard tidsintervallet er **30 dage**.

---

## Tidsintervalvælger

Øverst på Analysesiden giver en tidsintervalvælger dig mulighed for at styre perioden for data vist i alle diagrammer.

### Tilgængelige intervaller

| Mulighed | Periode | Bedst til |
|----------|---------|-----------|
| **7d** | Sidste 7 dage | Overvågning af seneste aktivitet og kortsigtede tendenser |
| **30d** | Sidste 30 dage | Månedlig rapportering og generel tendensanalyse (standard) |
| **90d** | Sidste 90 dage | Kvartalsgennemgange og mellemlangt mønsteridentifikation |
| **1 år** | Sidste 365 dage | Årlige gennemgange, sæsonmønstre og langsigtet vækst |

### Ændring af tidsinterval

1. Find tidsintervalvælgeren øverst på siden.
2. Klik på en af intervalknapperne: **7d**, **30d**, **90d** eller **1 år**.
3. Den valgte knap bliver fremhævet for at indikere det aktive interval.
4. Alle diagrammer på siden opdateres for at vise data for den valgte periode.
5. Diagramakser og etiketter justeres automatisk til det nye tidsvindue.

> **Tip:** Start med 30d for et generelt overblik, indsnævr derefter til 7d for at undersøge nylige anomalier, eller udvid til 1 år for rapportering på bestyrelsesniveau.

---

## Brugervækstdiagram

### Diagramtype

Linjediagram, der viser brugerregistreringstendenser over tid.

### Hvad det viser

Brugervækstdiagrammet visualiserer antallet af nye brugerregistreringer plottet over den valgte tidsperiode. Hvert datapunkt repræsenterer det kumulative eller daglige antal af nye brugere.

### Aflæsning af diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **X-akse** | Tid (datoer eller uger afhængigt af det valgte interval) |
| **Y-akse** | Antal nye brugerregistreringer |
| **Linje** | En kontinuerlig linje, der forbinder datapunkter og viser vækstbanen |
| **Datapunkter** | Markører på linjen, der kan hoveres for at se præcise værdier |
| **Tooltip** | Vises ved hover med dato og præcist registreringsantal |

### Fortolkning af data

1. **Opadgående tendens** -- Konsistent vækst i brugererhvervelse. Platformen tiltrækker nye brugere støt.
2. **Flad linje** -- Brugererhvervelse er stagneret. Overvej markedsføringsindsatser eller funktionslanceringer for at genantænde vækst.
3. **Spring** -- Pludselige stigninger kan korrelere med marketingkampagner, presseomtale eller app store-fremhævninger.
4. **Dyk** -- Fald i daglige registreringer kan indikere sæsonmønstre eller tekniske problemer.

### Tidsinterval-adfærd

| Interval | X-akse-granularitet | Noter |
|----------|---------------------|-------|
| 7d | Daglig | Hver dag vist individuelt |
| 30d | Daglig | Hver dag vist, godt til at identificere ugemønstre |
| 90d | Ugentlig | Data aggregeret pr. uge for læsbarhed |
| 1 år | Månedlig | Data aggregeret pr. måned for at vise årlig bane |

> **Tip:** Sammenlign 7d-visningen med 30d-visningen. Hvis de seneste 7 dages tendens ligger over 30-dages-gennemsnittet, accelererer væksten.

---

## Artsfordelingsdiagram

### Diagramtype

Cirkeldiagram (eller kransediagram), der viser andelen af kæledyr efter art.

### Hvad det viser

Artsfordelingsdiagrammet nedbryder alle registrerede kæledyr efter deres artskategori og viser den relative andel af hver.

### Aflæsning af diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **Segmenter** | Hvert segment repræsenterer en art (f.eks. Hund, Kat, Fugl, Kanin) |
| **Farver** | Hver art er tildelt en distinkt farve til identifikation |
| **Etiketter** | Artsnavn og procentdel vist på eller nær hvert segment |
| **Forklaring** | En forklaring, der mapper farver til artsnavne |
| **Tooltip** | Hold musen over et segment for at se præcist antal og procentdel |

### Fortolkning af data

1. **Dominerende art** -- Det største segment indikerer din primære brugerbase's kæledyrstype. Brug dette til at prioritere funktioner.
2. **Små segmenter** -- Arter med meget små procentdele kan indikere mulighed for vækst i underservicerede segmenter.
3. **Balance** -- En nogenlunde jævn fordeling tyder på bred appel på tværs af kæledyrejertyper.

### Anvendelsestilfælde

- **Funktionsprioritering** -- Hvis 70% af kæledyrene er hunde, prioriter hundespecifikke funktioner.
- **Indholdsplanlægning** -- Opret uddannelsesindhold proportionalt med artsfordelingen.
- **Markedsføringsmålretning** -- Forstå, hvilke målgruppesegmenter der er størst til annoncekampagner.
- **Notifikationsmålretning** -- Målgruppesegmenterne i Notifikationer (Hundeejere, Katteejere) korrelerer direkte med dette diagram.

> **Tip:** Hvis du bemærker en art, der vokser hurtigere end andre over tid (sammenlign 30d vs. 1 år), overvej at investere i artsspecifikke funktioner for at udnytte tendensen.

---

## Populære racer-diagram

### Diagramtype

Horisontalt søjlediagram, der rangerer de mest populære racer.

### Hvad det viser

Diagrammet Populære racer viser de mest registrerede racer på platformen, rangeret efter antal. Søjler strækker sig horisontalt, hvilket gør det nemt at sammenligne popularitet på tværs af racer.

### Aflæsning af diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **Y-akse** | Racenavne, ordnet fra mest populær (top) til mindst populær (bund) |
| **X-akse** | Antal registrerede kæledyr af den race |
| **Søjler** | Horisontale søjler, hvis længde repræsenterer antallet af kæledyr |
| **Etiketter** | Tælleværdi vist i enden af hver søjle |
| **Tooltip** | Hold musen over for præcist antal og procentdel af total |

### Fortolkning af data

1. **Topracer** -- De længste søjler repræsenterer de mest almindelige racer på platformen. Disse brugere er din kernemålgruppe.
2. **Lang hale** -- Mange racer med små tal indikerer diverse brugerinteresser.
3. **Racekoncentration** -- Hvis få racer dominerer (f.eks. top 3 udgør 50%+), har din platform en koncentreret brugerbase.

### Typiske indsigter

| Mønster | Indsigt | Handling |
|---------|---------|---------|
| Golden Retriever dominerer | Stor familie-hund-målgruppe | Prioriter funktioner til mellemstore/store hunderacer |
| Perserkat i top 5 | Stærkt katteejer-segment | Invester i kattespecifik sundhedssporing |
| Eksotiske racer dukker op | Nicheopdrættere tilslutter sig | Overvej opdrætterspecifikke premium-funktioner |
| Jævn fordeling | Divers brugerbase | Byg generelle funktioner frem for racespecifikke |

### Diagrambegrænsninger

- Diagrammet viser de **10-15 mest populære racer** som standard.
- Resterende racer grupperes under "Andet", hvis relevant.
- Antallet af synlige racer kan variere efter tidsinterval.

> **Tip:** Krydsreferer populære racer med sundhedsaktivitetsdata. Hvis en populær race har lav sundhedsregistreringsaktivitet, kan de brugere have brug for engagements-nudges.

---

## Sundhedsaktivitetsdiagram

### Diagramtype

Grupperet søjlediagram, der viser sundhedsrelaterede aktiviteter kategoriseret efter type.

### Hvad det viser

Sundhedsaktivitetsdiagrammet viser mængden af sundhedsrelaterede handlinger foretaget på platformen, grupperet efter aktivitetstype. Dette hjælper dig med at forstå, hvor aktivt brugere engagerer sig med sundhedsfunktioner.

### Aflæsning af diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **X-akse** | Tidsperioder (dage, uger eller måneder afhængigt af interval) |
| **Y-akse** | Antal sundhedsaktiviteter |
| **Søjlegrupper** | Flere søjler pr. tidsperiode, én for hver aktivitetstype |
| **Farver** | Hver aktivitetstype har en distinkt farve |
| **Forklaring** | Mapper farver til aktivitetstyper (Vaccinationer, Undersøgelser, Medicin osv.) |
| **Tooltip** | Hold musen over for præcist antal pr. aktivitetstype pr. periode |

### Aktivitetstyper

| Aktivitet | Beskrivelse | Farve (typisk) |
|-----------|-------------|-----------------|
| **Vaccinationer** | Vaccinationsregistreringer oprettet eller opdateret | Blå |
| **Sundhedsregistreringer** | Generelle sundhedsregistreringer logget | Grøn |
| **Vægtsporing** | Vægtmålinger registreret | Orange |
| **Medicin** | Medicinposter tilføjet | Lilla |

### Fortolkning af data

1. **Høje vaccinationssøjler** -- Brugere sporer aktivt vaccinationer. Påmindelsessystemet driver sandsynligvis engagement.
2. **Lave sundhedsregistreringssøjler** -- Brugere er muligvis ikke klar over sundhedsregistreringsfunktionen. Overvej in-app-prompts.
3. **Sæsonmønstre** -- Nogle sundhedsaktiviteter topper sæsonmæssigt (f.eks. loppebehandlinger om foråret).
4. **Voksende søjler over tid** -- Sundhedsfunktionsadoption er stigende, hvilket indikerer godt brugerengagement.
5. **Faldende søjler** -- Brugere mister muligvis interesse eller oplever friktion ved logning af sundhedsdata.

### Sammenligning af aktivitetstyper

Det grupperede format lader dig visuelt sammenligne:

- Hvilke sundhedsfunktioner der er mest brugt vs. underudnyttede.
- Om én aktivitetstype vokser, mens andre falder.
- Hvordan forskellige tidsintervaller afslører forskellige mønstre.

> **Tip:** Hvis vaccinationsaktivitet er høj, men anden sundhedssporing er lav, overvej at tilføje tværfunktionelle prompts: "Du loggede en vaccination -- vil du også registrere Rex' vægt?"

---

## Dashboard-layout

De fire diagrammer er arrangeret på Analysesiden i et gitterlayout:

```
+---------------------------+---------------------------+
|                           |                           |
|    Brugervækst            |    Artsfordeling          |
|    (Linjediagram)         |    (Cirkeldiagram)        |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Populære racer         |    Sundhedsaktivitet      |
|    (Horisontalt søjle)    |    (Grupperet søjle)      |
|                           |                           |
+---------------------------+---------------------------+
```

Hvert diagram optager et kort med:
- En titeloverskrift
- Diagramvisualiseringen
- Interaktive tooltips ved hover
- Responsiv størrelse, der tilpasser sig skærmbredden

---

## Interaktion med diagrammer

### Hover-tooltips

1. Flyt din markør over et datapunkt, en søjle eller et diagramsegment.
2. Et tooltip vises med:
   - Den præcise værdi
   - Etiketten (dato, racenavn, art osv.)
   - Procentdel, hvor relevant

### Responsiv adfærd

1. På større skærme vises diagrammer i et 2x2-gitter.
2. På mindre skærme stables diagrammer vertikalt for læsbarhed.
3. Diagramelementer skaleres proportionalt.

### Dataopdatering

1. Analysedata opdateres, når siden indlæses.
2. Ændring af tidsinterval udløser en ny datahentning.
3. Der er ingen automatisk opdatering -- genindlæs siden manuelt for de nyeste data.

---

## Almindelige analysearbejdsgange

### Månedlig rapportering

1. Vælg tidsintervallet **30d**.
2. Bemærk Brugervæksttendensen (op, flad eller ned).
3. Tjek Artsfordelingen for eventuelle skift.
4. Gennemgå Populære racer for nye tendenser.
5. Undersøg Sundhedsaktivitet for engagementsniveauer.
6. Tag skærmbillede eller eksporter data til rapporter.

### Undersøgelse af et fald

1. Start med **30d** for at identificere, hvornår faldet opstod.
2. Skift til **7d** for at undersøge den seneste periode i detaljer.
3. Tjek om faldet korrelerer med:
   - Et systemproblem (tjek Indstillinger > Vedligeholdelsestilstandshistorik)
   - En sendt notifikation (tjek Notifikationshistorik)
   - Et sæsonmønster (sammenlign med 1 år-visningen)

### Kvartalsgennemgang

1. Vælg tidsintervallet **90d**.
2. Sammenlign vækstbanen med tidligere kvartaler.
3. Identificer, hvilke sundhedsaktiviteter der voksede mest.
4. Bemærk eventuelle nye racer, der dukker op i Populære racer-diagrammet.
5. Brug Artsfordelingen til at validere tilpasning af markedsføringsstrategi.

### Årsplanlægning

1. Vælg tidsintervallet **1 år**.
2. Identificer sæsonmønstre i Brugervækst (f.eks. feriespring).
3. Spor ændringer i racepopularitet fra år til år.
4. Mål sundhedsfunktionsadoption over hele året.
5. Brug indsigter til at informere produktets roadmap.

---

## Forståelse af dataferskhed

| Aspekt | Detalje |
|--------|---------|
| Datakilde | Platformdatabase (aggregeret) |
| Opdateringsfrekvens | Realtid ved sideindlæsning |
| Historisk nøjagtighed | Komplet tilbage til platformens lancering |
| Tidszone | Servertid (UTC) |
| Manglende data | Huller vises som nulværdier, ikke interpoleret |

---

## Fejlfinding

| Problem | Løsning |
|---------|---------|
| Diagrammer indlæses ikke | Tjek din netværksforbindelse. Genindlæs siden. |
| Data virker forældet | Analyser indlæses ved sidebesøg. Naviger væk og vend tilbage, eller genindlæs. |
| Nulværdier for alle målinger | Verificer, at det valgte tidsinterval har data. Prøv at udvide til 1 år. |
| Diagram-tooltips vises ikke | Prøv en anden browser. Sørg for, at JavaScript er aktiveret. |
| Tidsinterval ændrer sig ikke | Klik direkte på intervalknappen. Hvis den ikke reagerer, genindlæs siden. |
| Kan ikke tilgå Analyser | Verificer, at din rolle og tilladelser inkluderer Analyse-sideadgang. |

---

## Relaterede sider

- [Indstillinger](./settings.md) -- Konfigurer platformindstillinger, der påvirker brugeradfærd
- [Notifikationer](./notifications.md) -- Send notifikationer, der kan påvirke engagementsmålinger
- [Feedback](./feedback.md) -- Korrelér brugerfeedback med analysetendenser
- [Administratorer](./admin-users.md) -- Giv analyseadgang til teammedlemmer
