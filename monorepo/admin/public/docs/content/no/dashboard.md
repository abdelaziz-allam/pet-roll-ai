# Dashboard

Dashboardet er den forste skjermen du ser etter innlogging i Petfolioo-administrasjonsportalen. Det gir en sanntidsoversikt over plattformens helse gjennom nokkeltall (KPI-er), interaktive diagrammer og feeder med nylig aktivitet. Bruk dashboardet til a overvake veksttrender, identifisere omrader som trenger oppmerksomhet, og spore plattformengasjement pa et overblikk.

![Dashboard](/docs/screenshots/dashboard.png)

---

## KPI-kort

Overst pa dashboardet viser fire sammendragskort plattformens viktigste beregninger. Hvert kort viser den gjeldende totalen og en prosentvis endringsindikator sammenlignet med forrige periode.

### Kortdefinisjoner

| Kort | Beregning | Beskrivelse |
|------|-----------|-------------|
| Totalt antall brukere | Antall registrerte app-brukere | Alle brukere som har opprettet en konto pa plattformen |
| Totalt antall dyr | Antall registrerte dyr | Alle dyr lagt til i registeret uavhengig av status |
| Ventende verifiseringer | Elementer som venter pa gjennomgang | Verifiseringsforesporsler som enna ikke er godkjent eller avvist |
| Aktive oppforinger | Oppforinger som for oyeblikket er synlige | Dyr merket som tilgjengelige for avl eller adopsjon |

### Vekstprosent

Hvert KPI-kort inkluderer en vekstindikator:

- En **gronn pil opp** med en prosentandel indikerer vekst sammenlignet med forrige periode.
- En **rod pil ned** med en prosentandel indikerer nedgang sammenlignet med forrige periode.
- Sammenligningsperioden samsvarer med det valgte tidsintervallet (se Tidsintervallvelger nedenfor).

> **Tips:** Hold musepekeren over et KPI-kort for a se de eksakte tallene for gjeldende og forrige periode i et verktoyhinttips.

### Lese kortene

1. Det **store tallet** er den gjeldende totale tellingen.
2. **Prosentmerket** under viser endring fra periode til periode.
3. **Etiketten** oppe identifiserer hvilken beregning som vises.
4. Klikk pa et hvilket som helst kort for a navigere direkte til den tilsvarende modulen (f.eks. a klikke pa "Totalt antall brukere" apner brukerlisten).

---

## Tidsintervallvelger

Tidsintervallvelgeren styrer datavinduet for alle dashboardanalyser og KPI-sammenligninger.

### Tilgjengelige intervaller

| Alternativ | Periode | Sammenligning mot |
|------------|---------|-------------------|
| 7d | Siste 7 dager | Forrige 7 dager |
| 30d | Siste 30 dager | Forrige 30 dager |
| 90d | Siste 90 dager | Forrige 90 dager |
| All tid | Siden plattformlanseringen | Ingen sammenligning (vekstprosent skjules) |

### Slik endrer du tidsintervallet

1. Finn **tidsintervallvelgeren** oppe til hoyre pa dashboardet, over KPI-kortene.
2. Klikk pa en av periodeknappene: **7d**, **30d**, **90d** eller **All tid**.
3. Hele dashboardet oppdateres for a gjenspeile den valgte perioden.
4. KPI-vekstprosentene beregnes pa nytt basert pa det nye sammenligningsvinduet.

> **Merk:** Alternativet "All tid" skjuler vekstprosenter siden det ikke finnes noen tidligere periode a sammenligne med.

---

## Dyreanalyseseksjon

Under KPI-kortene presenterer dyreanalyseseksjonen visuelle nedbrytninger av dyreregisterdata. Tre diagramtyper gir forskjellige perspektiver pa dyrepopulasjonen.

### Artsfordeling (sektordiagram)

Sektordiagrammet viser den proporsjonale fordelingen av dyr etter art.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Donut-/sektordiagram |
| Datakilde | Alle registrerte dyr gruppert etter art |
| Segmenter | Ett segment per art (f.eks. Hund, Katt, Fugl, Kanin, Reptil) |
| Etiketter | Artsnavn og antall vises ved musepeker |
| Forklaring | Fargekodet forklaring under eller ved siden av diagrammet |

**Interaksjon med sektordiagrammet:**

1. Hold musepekeren over et segment for a se det eksakte antallet og prosenten for den arten.
2. Klikk pa et segment for a filtrere andre dashboarddiagrammer til kun den arten.
3. Forklaringselementene er klikkbare - klikk pa et artsnavn for a veksle synligheten i diagrammet.

### Kjonnsfordeling (stolpediagram)

Det vertikale stolpediagrammet viser fordelingen av dyr etter kjonn.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Vertikalt stolpediagram |
| X-akse | Kjonnskategorier (Hann, Hunn, Ukjent) |
| Y-akse | Antall dyr |
| Stolper | En stolpe per kjonn, fargekodet |
| Etiketter | Antall vist over hver stolpe |

**Lese kjonnsdiagrammet:**

1. Hver stolpe representerer en kjonnskategori.
2. Hoeyden pa stolpen tilsvarer det totale antallet dyr av det kjonnet.
3. Det eksakte antallet vises som en etikett over hver stolpe.
4. Hold musepekeren over for ytterligere detaljer inkludert prosentandel av totalen.

### Landsfordeling (horisontalt stolpediagram)

Det horisontale stolpediagrammet rangerer land etter antall registrerte dyr.

| Element | Beskrivelse |
|---------|-------------|
| Diagramtype | Horisontalt stolpediagram |
| Y-akse | Landsnavn (sortert etter antall, synkende) |
| X-akse | Antall dyr |
| Stolper | En horisontal stolpe per land |
| Visning | Topp 10 land vises som standard |

**Lese landsdiagrammet:**

1. Land er sortert fra flest dyr (oppe) til farrest (nede).
2. Som standard vises kun de 10 landene med flest dyr.
3. Hold musepekeren over en stolpe for a se det eksakte antallet og prosentandelen av totalen.
4. Stolpelengden er proporsjonal med antallet i forhold til andre land.

---

## Geo- og artsfiltre

Over analysediagrammene lar filterkontroller deg begrense dataene som vises.

### Tilgjengelige filtre

| Filter | Type | Alternativer |
|--------|------|--------------|
| Art | Rullegardinmeny | Alle arter tilgjengelig pa plattformen (f.eks. Hund, Katt, Fugl osv.) |
| Land | Rullegardinmeny | Alle land med registrerte dyr |

### Bruke filtre

1. Klikk pa **Art**-rullegardinmenyen for a velge en spesifikk dyreart.
2. Klikk pa **Land**-rullegardinmenyen for a velge et spesifikt land.
3. Diagrammer og tabeller nedenfor oppdateres umiddelbart for a gjenspeile filteret.
4. Filtre kan kombineres - velg bade en art og et land for a begrense resultatene ytterligere.
5. For a tilbakestille, velg "Alle" fra hver rullegardinmeny eller klikk pa **Tilbakestill filtre**-knappen.

> **Tips:** Bruk artsfilteret pa sektordiagramvisningen for a bore ned i rasefordelinger innenfor en enkelt art.

### Filteroppforsel

| Scenario | Effekt |
|----------|--------|
| Ingen filtre valgt | Alle data vises globalt |
| Kun art valgt | Diagrammer viser data for den arten pa tvers av alle land |
| Kun land valgt | Diagrammer viser data for alle arter i det landet |
| Begge valgt | Diagrammer viser data for den valgte arten i det valgte landet |

---

## Tabell over nylige brukerregistreringer

Under analysediagrammene viser en tabell de nyligste brukerregistreringene pa plattformen.

### Tabellkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| Avatar | Miniatyrbilde av brukerens profilbilde |
| Navn | Brukerens visningsnavn |
| E-post | Brukerens registrerte e-postadresse |
| Registreringsdato | Dato og klokkeslett da kontoen ble opprettet |
| Status | Kontostatus (Aktiv, Ventende, Utestengt) |
| Dyr | Antall dyr registrert av denne brukeren |

### Tabellfunksjoner

1. **Sortering** - Klikk pa en kolonneoverskrift for a sortere etter den kolonnen. Klikk igjen for a reversere sorteringsrekkfolgen.
2. **Paginering** - Tabellen viser 10 oppforinger per side som standard. Bruk pagineringskontrollene nederst for a navigere.
3. **Hurtighandlinger** - Hold musepekeren over en rad for a avslore en "Vis"-knapp som apner brukerdetaljpanelet.

### Forsta statusindikatorer

| Status | Merkefarfe | Betydning |
|--------|------------|-----------|
| Aktiv | Gronn | Kontoen er i god stand og fullt funksjonell |
| Ventende | Oransje | Konto opprettet, men e-post er enna ikke verifisert |
| Utestengt | Rod | Kontoen er suspendert av en administrator |

> **Merk:** Tabellen over nylige registreringer viser alltid de nyeste brukerne forst, uavhengig av tidsintervallvelgerens innstilling. Den viser registreringer fra de siste 30 dagene.

---

## Beste praksis for dashboardet

### Daglig overvakingssjekkliste

1. Sjekk KPI-kortet for **Ventende verifiseringer** - et hoyt tall kan indikere et etterslep.
2. Gjennomga **vekstprosentene** pa alle fire kortene for uventede fall.
3. Skann tabellen **Nylige brukerregistreringer** for mistenkelige kontoer.
4. Legg merke til eventuelle betydelige endringer i **Landsfordelings**-diagrammet.

### Tolke trender

| Trend | Mulig betydning | Anbefalt handling |
|-------|-----------------|-------------------|
| Plutselig okning i registreringer | Suksess med markedsforingskampanje eller bot-aktivitet | Sjekk nylige brukere for mistenkelige monstre |
| Nedgang i aktive oppforinger | Sesongendring eller regelverksproblem | Gjennomga nylige utestengelseshandlinger og utlopte oppforinger |
| Hoyt antall ventende verifiseringer | Underbemanning i moderering | Tildel flere moderatorer |
| Endring i artsbalanse | Regional trend eller feilkonfigurering av kategori | Gjennomga kategoriinnstillinger |

---

## Dashboard-ytelse

Dashboardet laster data asynkront. Hver seksjon lastes uavhengig:

1. **KPI-kort** lastes forst (raskeste sporring).
2. **Diagrammer** lastes deretter med en kort lastespinner.
3. **Tabellen over nylige registreringer** lastes sist.

Hvis en seksjon viser en lastefeil:

1. Sjekk internettforbindelsen din.
2. Prov a oppdatere siden.
3. Hvis feilen vedvarer, kan backend-tjenesten oppleve problemer.

> **Tips:** Dashboardet oppdateres automatisk hvert 5. minutt. Du kan manuelt oppdatere ved a klikke pa oppdateringsikonet i topplinjen eller trykke `F5`.

---

*Forrige: [Kom i gang](./getting-started.md) | Neste: [Dyreregister](./pets.md)*
