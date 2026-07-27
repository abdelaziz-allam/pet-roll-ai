# Dashboard

Dashboardet er den første skærm, du ser efter at have logget ind på Petfolioo Admin Portalen. Det giver en realtidsoversigt over platformens sundhed gennem nøgletal (KPI'er), interaktive diagrammer og seneste aktivitetsfeeds. Brug dashboardet til at overvåge væksttendenser, identificere områder, der kræver opmærksomhed, og spore platformens engagement med ét overblik.

![Dashboard](/docs/screenshots/dashboard.png)

---

## KPI-kort

Øverst på dashboardet viser fire oversigtskort platformens vigtigste målinger. Hvert kort viser den aktuelle total og en procentændring sammenlignet med den foregående periode.

### Kortdefinitioner

| Kort | Måling | Beskrivelse |
|------|--------|-------------|
| Brugere i alt | Antal registrerede app-brugere | Alle brugere, der har oprettet en konto på platformen |
| Kæledyr i alt | Antal registrerede kæledyr | Alle kæledyr tilføjet registret uanset status |
| Afventende verificeringer | Emner, der afventer gennemgang | Verificeringsanmodninger, der endnu ikke er godkendt eller afvist |
| Aktive opslag | Aktuelt synlige opslag | Kæledyr markeret som tilgængelige for avl eller adoption |

### Vækstprocent

Hvert KPI-kort inkluderer en vækstindikator:

- En **grøn pil op** med en procentdel angiver vækst sammenlignet med den foregående periode.
- En **rød pil ned** med en procentdel angiver et fald sammenlignet med den foregående periode.
- Sammenligningsperioden matcher det valgte tidsinterval (se Tidsintervalvælger nedenfor).

> **Tip:** Hold musen over et KPI-kort for at se de præcise tal for den aktuelle og foregående periode i et tooltip.

### Aflæsning af kortene

1. Det **store tal** er den aktuelle samlede tælling.
2. **Procentbadget** nedenunder viser ændring fra periode til periode.
3. **Etiketten** øverst identificerer, hvilken måling der vises.
4. Klik på et kort for at navigere direkte til det tilsvarende modul (f.eks. navigerer et klik på "Brugere i alt" til Brugerlisten).

---

## Tidsintervalvælger

Tidsintervalvælgeren styrer datavinduet for alle dashboard-analyser og KPI-sammenligninger.

### Tilgængelige intervaller

| Mulighed | Periode | Sammenligning med |
|----------|---------|-------------------|
| 7d | Sidste 7 dage | Foregående 7 dage |
| 30d | Sidste 30 dage | Foregående 30 dage |
| 90d | Sidste 90 dage | Foregående 90 dage |
| Al tid | Siden platformens lancering | Ingen sammenligning (vækstprocent skjult) |

### Sådan ændrer du tidsintervallet

1. Find **tidsintervalvælgeren** i det øverste højre område af dashboardet, over KPI-kortene.
2. Klik på en af periodeknapperne: **7d**, **30d**, **90d** eller **Al tid**.
3. Hele dashboardet opdateres for at afspejle den valgte periode.
4. KPI-vækstprocenter genberegnes baseret på det nye sammenligningsvindue.

> **Bemærk:** Muligheden "Al tid" skjuler vækstprocenter, da der ikke er nogen tidligere periode at sammenligne med.

---

## Kæledyrsanalysesektion

Under KPI-kortene præsenterer sektionen Kæledyrsanalyse visuelle nedbrydninger af kæledyrsregistrets data. Tre diagramtyper giver forskellige perspektiver på kæledyrspopulationen.

### Artsfordeling (cirkeldiagram)

Cirkeldiagrammet viser den proportionale fordeling af kæledyr efter art.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Kransediagram/Cirkeldiagram |
| Datakilde | Alle registrerede kæledyr grupperet efter art |
| Segmenter | Ét segment pr. art (f.eks. Hund, Kat, Fugl, Kanin, Krybdyr) |
| Etiketter | Artsnavn og antal vises ved hover |
| Forklaring | Farvekoderet forklaring under eller ved siden af diagrammet |

**Interaktion med cirkeldiagrammet:**

1. Hold musen over et segment for at se det præcise antal og procenten for den art.
2. Klik på et segment for at filtrere andre dashboard-diagrammer til kun den art.
3. Forklaringens elementer er klikbare - klik på et artsnavn for at skifte dets synlighed i diagrammet.

### Kønsfordeling (søjlediagram)

Det vertikale søjlediagram viser fordelingen af kæledyr efter køn.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Vertikalt søjlediagram |
| X-akse | Kønskategorier (Han, Hun, Ukendt) |
| Y-akse | Antal kæledyr |
| Søjler | Én søjle pr. køn, farvekoderet |
| Etiketter | Antal vist over hver søjle |

**Aflæsning af kønsdiagrammet:**

1. Hver søjle repræsenterer én kønskategori.
2. Højden af søjlen svarer til det samlede antal kæledyr af det køn.
3. Det præcise antal vises som en etiket over hver søjle.
4. Hold musen over for yderligere detaljer, herunder procent af totalen.

### Landefordeling (horisontalt søjlediagram)

Det horisontale søjlediagram rangerer lande efter antal registrerede kæledyr.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Horisontalt søjlediagram |
| Y-akse | Landenavne (sorteret efter antal, faldende) |
| X-akse | Antal kæledyr |
| Søjler | Én horisontal søjle pr. land |
| Visning | Top 10 lande vises som standard |

**Aflæsning af landediagrammet:**

1. Lande er sorteret fra flest kæledyr (top) til færrest (bund).
2. Som standard vises kun de 10 øverste lande.
3. Hold musen over en søjle for at se det præcise antal og procent af totalen.
4. Søjlelængden er proportional med antallet i forhold til andre lande.

---

## Geo- og artsfiltre

Over analysediagrammerne giver filterkontroller dig mulighed for at indsnævre de viste data.

### Tilgængelige filtre

| Filter | Type | Muligheder |
|--------|------|------------|
| Art | Rullemenu | Alle arter tilgængelige på platformen (f.eks. Hund, Kat, Fugl osv.) |
| Land | Rullemenu | Alle lande med registrerede kæledyr |

### Anvendelse af filtre

1. Klik på rullelisten **Art** for at vælge en specifik kæledyrsart.
2. Klik på rullelisten **Land** for at vælge et specifikt land.
3. Diagrammer og tabeller nedenfor opdateres øjeblikkeligt for at afspejle filtret.
4. Filtre kan kombineres - vælg både en art og et land for at indsnævre resultaterne yderligere.
5. For at nulstille, vælg "Alle" fra hver rulleliste, eller klik på knappen **Nulstil filtre**.

> **Tip:** Brug artsfiltret i cirkeldiagramvisningen for at dykke ned i racefordelinger inden for en enkelt art.

### Filteradfærd

| Scenarie | Effekt |
|----------|--------|
| Ingen filtre valgt | Alle data vises globalt |
| Kun art valgt | Diagrammer viser data for den art på tværs af alle lande |
| Kun land valgt | Diagrammer viser data for alle arter i det land |
| Begge valgt | Diagrammer viser data for den valgte art i det valgte land |

---

## Tabel over seneste brugerregistreringer

Under analysediagrammerne viser en tabel de seneste brugerregistreringer på platformen.

### Tabelkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| Avatar | Brugerprofilbillede som miniature |
| Navn | Brugerens visningsnavn |
| E-mail | Brugerens registrerede e-mailadresse |
| Tilmeldingsdato | Dato og tid for kontooprettelsen |
| Status | Kontostatus (Aktiv, Afventende, Udelukket) |
| Kæledyr | Antal kæledyr registreret af denne bruger |

### Tabelfunktioner

1. **Sortering** - Klik på en kolonneoverskrift for at sortere efter den kolonne. Klik igen for at vende sorteringsrækkefølgen.
2. **Sideinddeling** - Tabellen viser 10 poster pr. side som standard. Brug sideinddelingskontrollerne i bunden til at navigere.
3. **Hurtige handlinger** - Hold musen over en række for at afsløre en "Vis"-knap, der åbner brugerdetaljevisningen.

### Forstå statusindikatorer

| Status | Badge-farve | Betydning |
|--------|-------------|---------|
| Aktiv | Grøn | Kontoen er i god stand og fuldt funktionsdygtig |
| Afventende | Orange | Konto oprettet, men e-mail endnu ikke bekræftet |
| Udelukket | Rød | Kontoen er suspenderet af en administrator |

> **Bemærk:** Tabellen over seneste registreringer viser altid de nyeste brugere først, uanset indstillingen for tidsintervalvælgeren. Den viser registreringer fra de seneste 30 dage.

---

## Bedste praksis for dashboardet

### Daglig overvågningstjekliste

1. Tjek KPI-kortet **Afventende verificeringer** - et højt tal kan indikere en ophobning.
2. Gennemgå **vækstprocenterne** på alle fire kort for uventede fald.
3. Scan tabellen **Seneste brugerregistreringer** for mistænkelige konti.
4. Bemærk eventuelle betydelige skift i diagrammet **Landefordeling**.

### Fortolkning af tendenser

| Tendens | Mulig betydning | Anbefalet handling |
|---------|-----------------|-------------------|
| Pludseligt spring i registreringer | Succesfuld marketingkampagne eller bot-aktivitet | Tjek seneste brugere for mistænkelige mønstre |
| Fald i aktive opslag | Sæsonmæssig ændring eller politikproblem | Gennemgå seneste udelukkelseshandlinger og opslagsudløb |
| Højt antal afventende verificeringer | Underbemandet moderering | Tildel yderligere moderatorer |
| Artsbalanceforskydning | Regional tendens eller kategorifejlkonfiguration | Gennemgå kategoriindstillinger |

---

## Dashboard-ydeevne

Dashboardet indlæser data asynkront. Hver sektion indlæses uafhængigt:

1. **KPI-kort** indlæses først (hurtigste forespørgsel).
2. **Diagrammer** indlæses dernæst med en kort indlæsningsspinner.
3. **Tabel over seneste registreringer** indlæses sidst.

Hvis en sektion viser en indlæsningsfejl:

1. Tjek din internetforbindelse.
2. Prøv at genindlæse siden.
3. Hvis fejlen fortsætter, kan backend-tjenesten opleve problemer.

> **Tip:** Dashboardet opdaterer automatisk hvert 5. minut. Du kan manuelt opdatere ved at klikke på opdateringsikonen i topbjælken eller trykke på `F5`.

---

*Forrige: [Kom godt i gang](./getting-started.md) | Næste: [Kæledyrsregister](./pets.md)*
