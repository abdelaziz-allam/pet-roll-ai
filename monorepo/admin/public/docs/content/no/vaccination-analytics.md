# Vaksinasjonsanalyse

Modulen Vaksinasjonsanalyse gir administratorer innsikt i vaksinasjonstrender på tvers av plattformen. Bruk dette dashboardet for å forstå hvilke vaksiner som oftest administreres, identifisere regionale mønstre og følge den samlede vaksinasjonsdekningen.

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

## Dashboard-oversikt

Vaksinasjonsanalyse-siden er organisert i følgende seksjoner:

1. **Sammendragsstatistikk** -- Nøkkelmetrikker øverst på siden
2. **Topp 20 vaksiner-toppliste** -- Rangert liste over mest brukte vaksiner
3. **Podiumvisualisering** -- Fremheving av de 3 beste vaksinene
4. **Nedbrytning per vaksine** -- Artsfordeling for hver vaksine
5. **Toppsteder** -- Geografisk fordeling per vaksine

---

## Sammendragsstatistikk

Øverst på analysesiden viser tre statistikkort aggregerte metrikker:

| Statistikkort | Beskrivelse | Ikon |
|---------------|-------------|------|
| Totale vaksinasjoner | Totalt antall vaksinasjonsoppføringer på tvers av alle dyr | Sprøyte |
| Unike vaksiner | Antall forskjellige vaksinetyper administrert | Kolbe |
| Vaksinerte dyr | Antall unike dyr med minst en vaksinasjon | Pote |

### Tolkning av statistikken

- **Totale vaksinasjoner** teller individuelle vaksinasjonshendelser (ett dyr som mottar en vaksine = 1 telling).
- **Unike vaksiner** viser variasjon av vaksiner i systemet (f.eks. Rabies, DHPP, FVRCP teller hver som 1).
- **Vaksinerte dyr** er deduplisert -- et dyr med 5 vaksinasjoner teller fortsatt som 1 dyr.

> **Tips:** Sammenlign Totale vaksinasjoner med Vaksinerte dyr for å forstå gjennomsnittlig antall vaksinasjoner per dyr på plattformen.

---

## Filtre

Filterlinjen gjelder for alle seksjoner på analysesiden samtidig.

### Tidsperiodefilter

Velg et tidsintervall for dataene:

| Alternativ | Beskrivelse |
|------------|-------------|
| Siste 7 dager | Siste uke |
| Siste 30 dager | Siste måned |
| Siste 90 dager | Siste kvartal |
| Siste 12 måneder | Siste år |
| All tid | Ingen tidsbegrensning |
| Egendefinert periode | Datovelger for start- og sluttdato |

### Artsfilter

Filtrer vaksinasjonsdata etter dyreart:

- Alle arter (standard)
- Hund
- Katt
- Fugl
- Kanin
- Annet

### Landsfilter

Velg ett eller flere land for å se vaksinasjonsdata kun fra disse regionene.

### Byfilter

Begrens resultatene ytterligere ved å velge spesifikke byer innenfor det valgte landet.

> **Tips:** Kombiner filtre for å svare på spesifikke spørsmål. For eksempel: "Hva er toppvaksinene for hunder i Storbritannia de siste 12 månedene?"

### Bruk av filtre

1. Sett ønskede filterverdier med nedtrekksmenyene.
2. Klikk **Bruk filtre** eller filtrene brukes automatisk ved endring.
3. Alle dashboard-seksjoner oppdateres for å gjenspeile de filtrerte dataene.
4. Aktive filtre vises som etiketter under filterlinjen.
5. Klikk **X** på en filtre tikett for å fjerne den, eller klikk **Fjern alle** for å tilbakestille.

---

## Topp 20 vaksiner-toppliste

Topplisten viser de 20 mest administrerte vaksinene basert på gjeldende filtervalg.

### Tabellkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| Rangering | Posisjon fra 1 til 20 |
| Vaksinenavn | Navn på vaksinen |
| Antall | Antall ganger administrert |
| Prosentandel | Andel av totale vaksinasjoner |
| Trend | Sparkline som viser brukstrend over valgt periode |

### Tolkning av topplisten

1. Vaksiner er sortert etter antall i synkende rekkefølge.
2. **Prosentandel**-kolonnen viser hvilken del av alle vaksinasjoner denne vaksinen utgjør.
3. **Trend**-sparkline gir et raskt visuelt inntrykk av om bruken øker, er stabil eller synkende.
4. Hold musepekeren over sparkline for å se datapunktverdier.

### Interaksjon med topplisten

- Klikk på en vaksine-rad for å bla ned til den detaljerte nedbrytningsseksjonen.
- Bruk kolonneoverskriftene for å sortere på nytt (selv om standard rangeringsrekkefølge er mest nyttig).
- Tabellen pagineres hvis filtre produserer mer enn 20 resultater i sjeldne konfigurasjoner.

> **Tips:** En vaksine med oppadgående trend kan indikere respons på et regionalt utbrudd eller en ny anbefaling fra veterinærforeninger.

---

## Podiumvisualisering

Podiumet fremhever de 3 beste vaksinene i en visuell premiestil-visning.

### Oppsett

```
        [1.]
   [2.]     [3.]
```

- **1. plass (sentrum, høyest):** Gullfarget kort med den mest administrerte vaksinen.
- **2. plass (venstre):** Sølvfarget kort med den nest mest administrerte vaksinen.
- **3. plass (høyre):** Bronsefarget kort med den tredje mest administrerte vaksinen.

### Kortinnhold

Hvert podiumkort viser:

- Rangeringsmedaljeikon (gull, sølv, bronse)
- Vaksinenavn
- Totalt antall administreringer
- Prosentandel av alle vaksinasjoner
- Hovedart (den vanligste arten som mottar denne vaksinen)

### Tolkning av podiumet

Podiumet gir et overblikk over plattformens vaksinasjonsmønstre. Vanlige resultater inkluderer:

- **Hunder:** Rabies, DHPP (Valpesjuke/Parvo), Bordetella dominerer ofte.
- **Katter:** FVRCP, Rabies, FeLV er typiske toppvaksiner.
- **Blandede plattformer:** Rabies leder ofte på tvers av alle arter.

> **Tips:** Hvis podiumet viser uventede resultater etter at filtre er brukt, sjekk om tidsperioden eller stedsfilter produserer et lite utvalg som kan skjevfordele rangeringene.

---

## Nedbrytning per vaksine etter art

Under topplisten har hver vaksine i topp 20 en utvidbar seksjon som viser artsfordeling.

### Visning av nedbrytningen

1. Klikk på utvid-pilen ved siden av en vaksine i topplisten.
2. Et horisontalt stablet stolpediagram vises som viser artsfordelingen.
3. Hvert segment er fargekodet etter art:
   - Hunder: Blå
   - Katter: Oransje
   - Fugler: Grønn
   - Kaniner: Lilla
   - Annet: Grå

### Nedbrytningstabell

Ved siden av stolpediagrammet viser en liten tabell:

| Art | Antall | Prosentandel |
|-----|--------|--------------|
| Hund | 1 234 | 62% |
| Katt | 456 | 23% |
| Fugl | 200 | 10% |
| Kanin | 80 | 4% |
| Annet | 20 | 1% |

### Bruksområder

- Identifiser vaksiner som er artsspesifikke vs. på tvers av arter.
- Oppdag uvanlige mønstre (f.eks. en hundespesifikk vaksine som dukker opp i katteposter kan indikere dataregistreringsfeil).
- Forstå plattformens artssammensetning gjennom vaksinasjonsdata.

> **Tips:** Artsspesifikke vaksiner som dukker opp under feil art indikerer ofte datakvalitetsproblemer som bør undersøkes.

---

## Toppsteder per vaksine

Hver vaksine viser også en geografisk nedbrytning av hvor den oftest administreres.

### Visning av stedsdata

1. Klikk på utvid-pilen ved siden av en vaksine i topplisten.
2. Bytt til **Steder**-fanen i den utvidede seksjonen.
3. En rangert liste over topp 10 steder vises.

### Stedstabell

| Rangering | Land | By | Antall | Prosentandel |
|-----------|------|----|--------|--------------|
| 1 | Tyskland | Berlin | 543 | 18% |
| 2 | Storbritannia | London | 421 | 14% |
| 3 | Frankrike | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Kartvisning

Hvis tilgjengelig, viser et mini-varmekart konsentrasjonen av vaksinasjoner geografisk:

- Mørkere regioner indikerer høyere vaksinasjonstall.
- Hold musepekeren over en region for å se nøyaktig antall.
- Klikk på en region for å bruke den som stedsfilter.

### Bruksområder

- Identifiser regionale vaksinasjonspreferanser eller krav.
- Oppdag klynger som kan tilsvare lokale veterinæranbefalinger.
- Planlegg regionale kampanjer eller partnerskap.

> **Tips:** Noen vaksiner er lovpålagt i bestemte land (f.eks. rabies i Tyskland). Høye konsentrasjoner i visse regioner er forventet for obligatoriske vaksiner.

---

## Eksport av data

For å eksportere vaksinasjonsanalysedata:

1. Klikk **Eksporter**-knappen øverst til høyre på siden.
2. Velg eksportformat:
   - **CSV** -- Rådata for regnearkanalyse
   - **PDF** -- Formatert rapport med diagrammer
3. Eksporten respekterer alle gjeldende aktive filtre.
4. Filen lastes ned til nettleserens standard nedlastingsplassering.

### Eksportinnhold

CSV-eksporten inkluderer:

- Vaksinenavn
- Totalt antall
- Artsnedbrytning med antall
- Toppland og -byer
- Trenddatapunkter
- Filterparametere som ble brukt

> **Tips:** Bruk CSV-eksporter for å lage egendefinerte visualiseringer i verktøy som Excel eller Google Sheets, eller for å dele data med veterinære rådgivningspartnere.

---

## Dashboard-oppdatering

Analysedata beregnes fra vaksinasjonsoppføringer og mellomlagres for ytelse.

- Data oppdateres automatisk hver 24. time.
- Tidsstempelet for siste oppdatering vises nederst på siden.
- Klikk **Oppdater**-ikonet ved siden av tidsstempelet for å utløse en manuell oppdatering.
- Manuell oppdatering kan ta 10-30 sekunder avhengig av datamengde.

> **Tips:** Hvis du oppdager avvik mellom analysedashboardet og individuelle dyreoppføringer, prøv en manuell oppdatering. Nylig lagt til vaksinasjoner vises kanskje ikke før neste mellomlagringsoppdatering.

---

## Ofte stilte spørsmål

**Sp: Hvorfor stemmer ikke totalen i topplisten med totalen i sammendragsstatistikken?**
Sv: Topplisten viser de 20 beste vaksinene. Hvis det finnes mer enn 20 unike vaksiner, er de resterende ikke oppført, men teller fortsatt mot totalen.

**Sp: Kan jeg se data for en spesifikk oppdretter eller eier?**
Sv: Nei. Analysesiden viser aggregerte plattformdata. Individuelle vaksinasjonsoppføringer er tilgjengelige på hvert dyrs profil.

**Sp: Hvorfor viser noen vaksiner null trenddata?**
Sv: Nye vaksiner som bare er registrert en gang har kanskje ikke nok datapunkter til å generere en meningsfull trendlinje.

**Sp: Hvor langt tilbake går historiske data?**
Sv: Filteret "All tid" inkluderer hver vaksinasjonsoppføring siden plattformen ble lansert. Det er ingen grense for datalagring for analyser.

**Sp: Kan jeg sammenligne to tidsperioder?**
Sv: Ikke direkte i dashboardet. Eksporter data for to forskjellige tidsperioder og sammenlign dem i et regneark.
