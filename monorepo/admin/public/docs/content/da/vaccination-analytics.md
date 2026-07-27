# Vaccinationsanalyser

Modulet Vaccinationsanalyser giver administratorer indsigt i vaccinationstendenser på tværs af platformen. Brug dette dashboard til at forstå, hvilke vacciner der oftest administreres, identificere regionale mønstre og spore den samlede vaccinationsdækning.

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

## Dashboardoversigt

Vaccinationsanalysesiden er organiseret i følgende sektioner:

1. **Opsummeringsstatistik** -- Nøglemålinger øverst på siden
2. **Top 20 vaccine-rangliste** -- Rangordnet liste over mest anvendte vacciner
3. **Podievisualisering** -- Fremhævning af de 3 mest populære vacciner
4. **Nedbrydning pr. vaccine** -- Artsfordeling for hver vaccine
5. **Topplaceringer** -- Geografisk fordeling pr. vaccine

---

## Opsummeringsstatistik

Øverst på analysesiden viser tre statistikkort aggregerede målinger:

| Statistikkort | Beskrivelse | Ikon |
|---------------|-------------|------|
| Vaccinationer i alt | Samlet antal vaccinationsregistreringer på tværs af alle kæledyr | Sprøjte |
| Unikke vacciner | Antal forskellige vaccinetyper administreret | Kolbe |
| Vaccinerede kæledyr | Antal unikke kæledyr med mindst én vaccination | Pote |

### Aflæsning af statistikken

- **Vaccinationer i alt** tæller individuelle vaccinationshændelser (ét kæledyr, der modtager én vaccine = 1 tælling).
- **Unikke vacciner** viser variation af vacciner i systemet (f.eks. Rabies, DHPP, FVRCP tæller hver som 1).
- **Vaccinerede kæledyr** er deduplikeret -- et kæledyr med 5 vaccinationer tæller stadig som 1 kæledyr.

> **Tip:** Sammenlign Vaccinationer i alt med Vaccinerede kæledyr for at forstå det gennemsnitlige antal vaccinationer pr. kæledyr på platformen.

---

## Filtre

Filterbjælken gælder for alle sektioner af analysesiden samtidigt.

### Tidsperiodefilter

Vælg et tidsinterval for dataene:

| Mulighed | Beskrivelse |
|----------|-------------|
| Sidste 7 dage | Foregående uge |
| Sidste 30 dage | Foregående måned |
| Sidste 90 dage | Foregående kvartal |
| Sidste 12 måneder | Foregående år |
| Al tid | Ingen tidsbegrænsning |
| Brugerdefineret interval | Datovælger til start- og slutdato |

### Artsfilter

Filtrer vaccinationsdata efter kæledyrsart:

- Alle arter (standard)
- Hund
- Kat
- Fugl
- Kanin
- Andet

### Landefilter

Vælg et eller flere lande for kun at se vaccinationsdata fra de regioner.

### Byfilter

Indsnævr yderligere ved at vælge specifikke byer inden for det valgte land.

> **Tip:** Kombinér filtre for at besvare specifikke spørgsmål. F.eks.: "Hvad er de mest populære vacciner for hunde i Storbritannien inden for de seneste 12 måneder?"

### Anvendelse af filtre

1. Angiv dine ønskede filterværdier via rullemenuer.
2. Klik på **Anvend filtre**, eller filtrene anvendes automatisk ved ændring.
3. Alle dashboardsektioner opdateres for at afspejle de filtrerede data.
4. Aktive filtre vises som tags under filterbjælken.
5. Klik på **X** på et filtertag for at fjerne det, eller klik på **Ryd alle** for at nulstille.

---

## Top 20 vaccine-rangliste

Ranglisten viser de 20 mest hyppigt administrerede vacciner baseret på det aktuelle filtervalg.

### Tabelkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| Rang | Position fra 1 til 20 |
| Vaccinenavn | Navn på vaccinen |
| Antal | Antal gange administreret |
| Procentdel | Andel af samlede vaccinationer |
| Tendens | Sparkline, der viser brugstrend over den valgte periode |

### Aflæsning af ranglisten

1. Vacciner er sorteret efter antal i faldende rækkefølge.
2. **Procentdel**-kolonnen viser, hvilken del af alle vaccinationer denne vaccine repræsenterer.
3. **Tendens**-sparkline giver et hurtigt visuelt overblik over, om brugen er stigende, stabil eller faldende.
4. Hold musen over sparkline for at se datapunktværdier.

### Interaktion med ranglisten

- Klik på en vaccinerække for at scrolle ned til dens detaljerede nedbrydningssektion.
- Brug kolonneoverskrifterne til at omsortere (selvom standardrangordningen er mest nyttig).
- Tabellen er pagineret, hvis filtre producerer mere end 20 resultater i sjældne konfigurationer.

> **Tip:** En vaccine med stigende tendens kan indikere et regionalt udbrudssvar eller en ny anbefaling fra dyrlægeforeninger.

---

## Podievisualisering

Podiet fremhæver de 3 mest populære vacciner i et visuelt præmieformat.

### Layout

```
        [1.]
   [2.]     [3.]
```

- **1. plads (center, højest):** Guldfarvet kort med den mest administrerede vaccine.
- **2. plads (venstre):** Sølvfarvet kort med den næstmest administrerede vaccine.
- **3. plads (højre):** Bronzefarvet kort med den tredjemest administrerede vaccine.

### Kortindhold

Hvert podiekort viser:

- Rangmedaljeikon (guld, sølv, bronze)
- Vaccinenavn
- Samlet antal administrationer
- Procentdel af alle vaccinationer
- Primær art (mest almindelige art, der modtager denne vaccine)

### Aflæsning af podiet

Podiet giver et overblik over platformens vaccinationsmønstre. Typiske resultater inkluderer:

- **Hunde:** Rabies, DHPP (Distemper/Parvo), Bordetella dominerer ofte.
- **Katte:** FVRCP, Rabies, FeLV er typiske topvacciner.
- **Blandede platforme:** Rabies leder ofte på tværs af alle arter.

> **Tip:** Hvis podiet viser uventede resultater efter anvendelse af filtre, tjek om tidsperioden eller placeringsfiltret producerer en lille stikprøvestørrelse, der kan forvrænge rangeringer.

---

## Artsnedbrydning pr. vaccine

Under ranglisten har hver vaccine i top 20 en udvidbar sektion, der viser artsfordeling.

### Visning af nedbrydningen

1. Klik på udvidelsespilen ved siden af en vaccine i ranglisten.
2. Et horisontalt stablet søjlediagram vises med artsfordeling.
3. Hvert segment er farvekoderet efter art:
   - Hunde: Blå
   - Katte: Orange
   - Fugle: Grøn
   - Kaniner: Lilla
   - Andet: Grå

### Nedbrydningstabel

Ved siden af søjlediagrammet viser en lille tabel:

| Art | Antal | Procentdel |
|-----|-------|------------|
| Hund | 1.234 | 62% |
| Kat | 456 | 23% |
| Fugl | 200 | 10% |
| Kanin | 80 | 4% |
| Andet | 20 | 1% |

### Anvendelsestilfælde

- Identificer vacciner, der er artsspecifikke vs. tværartslige.
- Opdag usædvanlige mønstre (f.eks. en hundespecifik vaccine, der optræder i katteregistreringer, kan indikere dataindtastningsfejl).
- Forstå din platforms artssammensætning gennem vaccinationsdata.

> **Tip:** Artsspecifikke vacciner, der optræder under den forkerte art, indikerer ofte datakvalitetsproblemer, der bør undersøges.

---

## Topplaceringer pr. vaccine

Hver vaccine viser også en geografisk nedbrydning af, hvor den oftest administreres.

### Visning af placeringsdata

1. Klik på udvidelsespilen ved siden af en vaccine i ranglisten.
2. Skift til fanen **Placeringer** inden for den udvidede sektion.
3. En rangordnet liste over de 10 bedste placeringer vises.

### Placeringstabel

| Rang | Land | By | Antal | Procentdel |
|------|------|-----|-------|------------|
| 1 | Tyskland | Berlin | 543 | 18% |
| 2 | Storbritannien | London | 421 | 14% |
| 3 | Frankrig | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Kortvisning

Hvis tilgængeligt, viser et mini-heatmap koncentrationen af vaccinationer geografisk:

- Mørkere regioner indikerer højere vaccinationsantal.
- Hold musen over en region for at se det præcise antal.
- Klik på en region for at anvende det som et placeringsfilter.

### Anvendelsestilfælde

- Identificer regionale vaccinationspræferencer eller krav.
- Opdag klynger, der kan svare til lokale dyrlægeanbefalinger.
- Planlæg regionale outreach- eller partnerskabskampagner.

> **Tip:** Nogle vacciner er lovpligtige i bestemte lande (f.eks. rabies i Tyskland). Høje koncentrationer i visse regioner er forventelige for obligatoriske vacciner.

---

## Eksportering af data

For at eksportere vaccinationsanalysedata:

1. Klik på knappen **Eksporter** i øvre højre hjørne af siden.
2. Vælg eksportformat:
   - **CSV** -- Rå data til regnearkanalyse
   - **PDF** -- Formateret rapport med diagrammer
3. Eksporten respekterer alle aktuelt aktive filtre.
4. Filen downloades til din browsers standard downloadplacering.

### Eksportindhold

CSV-eksporten inkluderer:

- Vaccinenavn
- Samlet antal
- Artsnedbrydningstal
- Toplande og -byer
- Tendensdatapunkter
- Anvendte filterparametre

> **Tip:** Brug CSV-eksporter til at oprette brugerdefinerede visualiseringer i værktøjer som Excel eller Google Sheets, eller til at dele data med veterinære rådgivningspartnere.

---

## Dashboard-opdatering

Analysedata beregnes ud fra vaccinationsregistreringer og caches for ydeevne.

- Data opdateres automatisk hver 24. time.
- Det seneste opdateringstidsstempel vises i bunden af siden.
- Klik på **Opdater**-ikonet ved siden af tidsstemplet for at udløse en manuel opdatering.
- Manuel opdatering kan tage 10-30 sekunder afhængigt af datamængden.

> **Tip:** Hvis du bemærker uoverensstemmelser mellem analysedashboardet og individuelle kæledyrsregistreringer, prøv en manuel opdatering. Nyligt tilføjede vaccinationer vises muligvis ikke før næste cache-opdatering.

---

## Ofte stillede spørgsmål

**Sp: Hvorfor matcher totalen i ranglisten ikke opsummeringsstatistikkens total?**
Sv: Ranglisten viser de 20 mest populære vacciner. Hvis der er mere end 20 unikke vacciner, er de resterende ikke opført, men tæller stadig med i totalen.

**Sp: Kan jeg se data for en specifik opdrætter eller ejer?**
Sv: Nej. Analysesiden viser aggregeret platformdata. Individuelle vaccinationsregistreringer er tilgængelige på hvert kæledyrs profil.

**Sp: Hvorfor viser nogle vacciner nul tendensdata?**
Sv: Nye vacciner, der kun er registreret én gang, har muligvis ikke nok datapunkter til at generere en meningsfuld tendenslinje.

**Sp: Hvor langt tilbage går historiske data?**
Sv: "Al tid"-filtret inkluderer alle vaccinationsregistreringer siden platformens lancering. Der er ingen dataretentionsgrænse for analyser.

**Sp: Kan jeg sammenligne to tidsperioder?**
Sv: Ikke direkte i dashboardet. Eksporter data for to forskellige tidsperioder og sammenlign dem i et regneark.
