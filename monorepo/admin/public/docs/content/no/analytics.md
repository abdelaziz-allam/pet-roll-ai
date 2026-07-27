# Analyser

Analyser-siden gir visuell innsikt i plattformbruk, brukervekst, kjaeledyrdemografi og helseaktivitet. Bruk disse diagrammene til a forsta trender, male engasjement og ta datadrevne beslutninger om Petfolioo-plattformen.

![Analytics](/docs/screenshots/analytics.png)

---

## Oversikt

Analyse-dashbordet presenterer fire hovedvisualiseringer sammen med en tidsperiodevelger som styrer datavinduet for alle diagrammer. Hvert diagram oppdateres dynamisk nar du endrer den valgte tidsperioden.

---

## Tilgang til analyser

1. Klikk **Analyser** i sidenavigasjonsmenyen.
2. Dashbordet lastes med alle diagrammer vist pa en enkelt rullbar side.
3. Standard tidsperiode er **30 dager**.

---

## Tidsperiodevelger

Overst pa Analyser-siden lar en tidsperiodevelger deg kontrollere perioden for data som vises pa tvers av alle diagrammer.

### Tilgjengelige perioder

| Alternativ | Periode | Best for |
|------------|---------|----------|
| **7d** | Siste 7 dager | Overvakning av nylig aktivitet og kortsiktige trender |
| **30d** | Siste 30 dager | Manedlig rapportering og generell trendanalyse (standard) |
| **90d** | Siste 90 dager | Kvartalsgjennomganger og mellomlang monsteridentifikasjon |
| **1 ar** | Siste 365 dager | Arsgjennomganger, sesongmonstre og langsiktig vekst |

### Endre tidsperioden

1. Finn tidsperiodevelgeren overst pa siden.
2. Klikk pa en av periodeknappene: **7d**, **30d**, **90d** eller **1 ar**.
3. Den valgte knappen markeres for a indikere aktiv periode.
4. Alle diagrammer pa siden oppdateres for a vise data for den valgte perioden.
5. Diagramakser og etiketter justeres automatisk til det nye tidsvinduet.

> **Tips:** Start med 30d for en generell oversikt, deretter innsnever til 7d for a undersoke nylige avvik, eller utvid til 1 ar for rapportering pa styreniva.

---

## Brukervekstdiagram

### Diagramtype

Linjediagram som viser brukerveksttrender over tid.

### Hva det viser

Brukervekstdiagrammet visualiserer antall nye brukerregistreringer plottet over den valgte tidsperioden. Hvert datapunkt representerer det kumulative eller daglige antallet nye brukere.

### Lese diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **X-akse** | Tid (datoer eller uker avhengig av valgt periode) |
| **Y-akse** | Antall nye brukerregistreringer |
| **Linje** | En kontinuerlig linje som forbinder datapunkter og viser veksttrajektorie |
| **Datapunkter** | Markorer pa linjen som viser eksakte verdier ved hovring |
| **Verktoyinfo** | Vises ved hovring og viser dato og eksakt registreringstall |

### Tolke dataene

1. **Oppadgaende trend** -- Konsistent vekst i brukeranskaffelse. Plattformen tiltrekker nye brukere jevnt.
2. **Flat linje** -- Brukeranskaffelsen har stabilisert seg. Vurder markedsforingstiltak eller funksjonslanseringer for a gjenoppta vekst.
3. **Topper** -- Plutselige okninger kan samsvare med markedsforingskampanjer, pressedekning eller app store-fremhevinger.
4. **Fall** -- Nedgang i daglige registreringer kan indikere sesongmonstre eller tekniske problemer.

### Tidsperiodeatferd

| Periode | X-akse-granularitet | Merknader |
|---------|---------------------|-----------|
| 7d | Daglig | Hver dag vises individuelt |
| 30d | Daglig | Hver dag vises, bra for a identifisere ukentlige monstre |
| 90d | Ukentlig | Data aggregert per uke for lesbarhet |
| 1 ar | Manedlig | Data aggregert per maned for a vise arlig trajektorie |

> **Tips:** Sammenlign 7d-visningen med 30d-visningen. Hvis de siste 7 dagene trender over 30-dagers gjennomsnittet, akselererer veksten.

---

## Artsfordelingsdiagram

### Diagramtype

Sektordiagram (eller smultringdiagram) som viser andelen kjaeledyr etter art.

### Hva det viser

Artsfordelingsdiagrammet deler alle registrerte kjaeledyr etter artskategori, og viser den relative andelen av hver.

### Lese diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **Sektorer** | Hver sektor representerer en art (f.eks. Hund, Katt, Fugl, Kanin) |
| **Farger** | Hver art er tildelt en distinkt farge for identifikasjon |
| **Etiketter** | Artsnavn og prosentandel vist pa eller naer hver sektor |
| **Tegnforklaring** | En tegnforklaring kobler farger til artsnavn |
| **Verktoyinfo** | Hold over en sektor for a se eksakt antall og prosentandel |

### Tolke dataene

1. **Dominerende art** -- Den storste sektoren indikerer den primaere brukerbasens kjaeledyrtype. Bruk dette til a prioritere funksjoner.
2. **Sma sektorer** -- Arter med svart lav prosentandel kan indikere mulighet for vekst i underserviserte segmenter.
3. **Balanse** -- En noenlunde jevn fordeling antyder bred appell pa tvers av kjaeledyreiertyper.

### Bruksomrader

- **Funksjonsprioritering** -- Hvis 70% av kjaeledyrene er hunder, prioriter hundespesifikke funksjoner.
- **Innholdsplanlegging** -- Lag pedagogisk innhold proporsjonalt med artsfordelingen.
- **Markedsforingsmalretting** -- Forsta hvilke malgruppeesegmenter som er storst for annonsekampanjer.
- **Varselmalretting** -- Malgruppesegmentene i Varsler (Hundeeiere, Katteeiere) korrelerer direkte med dette diagrammet.

> **Tips:** Hvis du merker at en art vokser raskere enn andre over tid (sammenlign 30d med 1 ar), vurder a investere i artsspesifikke funksjoner for a utnytte trenden.

---

## Populaere raser-diagram

### Diagramtype

Horisontalt stolpediagram som rangerer de mest populaere rasene.

### Hva det viser

Populaere raser-diagrammet viser de mest registrerte rasene pa plattformen, rangert etter antall. Stolper strekker seg horisontalt, noe som gjor det enkelt a sammenligne popularitet pa tvers av raser.

### Lese diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **Y-akse** | Rasenavn, ordnet fra mest populaer (overst) til minst populaer (nederst) |
| **X-akse** | Antall registrerte kjaeledyr av den rasen |
| **Stolper** | Horisontale stolper hvis lengde representerer antall kjaeledyr |
| **Etiketter** | Antallverdi vist pa enden av hver stolpe |
| **Verktoyinfo** | Hold over for eksakt antall og prosentandel av total |

### Tolke dataene

1. **Topp-raser** -- De lengste stolpene representerer de vanligste rasene pa plattformen. Disse brukerne er kjernepublikumet ditt.
2. **Lang hale** -- Mange raser med lavt antall indikerer mangfoldige brukerinteresser.
3. **Rasekonsentrasjon** -- Hvis fa raser dominerer (f.eks. topp 3 star for 50%+), har plattformen en konsentrert brukerbase.

### Typisk innsikt

| Monster | Innsikt | Handling |
|---------|---------|----------|
| Golden Retriever dominerer | Stor familiehund-malgruppe | Prioriter funksjoner for mellomstore/store hunderaser |
| Perserkatt i topp 5 | Sterkt katteeier-segment | Invester i kattespesifikk helsesporing |
| Eksotiske raser dukker opp | Nisje-oppdrettere slutter seg til | Vurder oppdretterspesifikke premiumfunksjoner |
| Jevn fordeling | Mangfoldig brukerbase | Bygg generelle funksjoner fremfor rasespesifikke |

### Diagramgrenser

- Diagrammet viser de **topp 10-15 rasene** som standard.
- Gjenvaerende raser grupperes under "Annet" hvis aktuelt.
- Antall synlige raser kan variere etter tidsperiode.

> **Tips:** Kryss-referer populaere raser med helseaktivitetsdata. Hvis en populaer rase har lav helsejournal-aktivitet, kan disse brukerne trenge engasjementsdupp.

---

## Helseaktivitetsdiagram

### Diagramtype

Gruppert stolpediagram som viser helserelaterte aktiviteter kategorisert etter type.

### Hva det viser

Helseaktivitetsdiagrammet viser volumet av helserelaterte handlinger utfort pa plattformen, gruppert etter aktivitetstype. Dette hjelper deg a forsta hvor aktivt brukere engasjerer seg med helsefunksjoner.

### Lese diagrammet

| Element | Beskrivelse |
|---------|-------------|
| **X-akse** | Tidsperioder (dager, uker eller maneder avhengig av periode) |
| **Y-akse** | Antall helseaktiviteter |
| **Stolpegrupper** | Flere stolper per tidsperiode, en for hver aktivitetstype |
| **Farger** | Hver aktivitetstype har en distinkt farge |
| **Tegnforklaring** | Kobler farger til aktivitetstyper (Vaksinasjoner, Kontroller, Medisiner, osv.) |
| **Verktoyinfo** | Hold over for eksakt antall per aktivitetstype per periode |

### Aktivitetstyper

| Aktivitet | Beskrivelse | Farge (typisk) |
|-----------|-------------|----------------|
| **Vaksinasjoner** | Vaksinasjonsposter opprettet eller oppdatert | Bla |
| **Helsejournaler** | Generelle helseposter logget | Gronn |
| **Vektsporing** | Vektmalinger registrert | Oransje |
| **Medisiner** | Medisinoppforinger lagt til | Lilla |

### Tolke dataene

1. **Hoye vaksinasjonsstolper** -- Brukere sporer aktivt vaksinasjoner. Paminnelsessystemet driver sannsynligvis engasjement.
2. **Lave helsejournalstolper** -- Brukere er kanskje ikke klar over helsejournaler-funksjonen. Vurder meldinger i appen.
3. **Sesongmonstre** -- Noen helseaktiviteter topper sesongmessig (f.eks. loppebehandlinger om varen).
4. **Voksende stolper over tid** -- Helsefunksjon-adopsjon oker, noe som indikerer godt brukerengasjement.
5. **Synkende stolper** -- Brukere kan miste interessen eller oppleve friksjon ved logging av helsedata.

### Sammenligne aktivitetstyper

Det grupperte formatet lar deg visuelt sammenligne:

- Hvilke helsefunksjoner som er mest brukt vs. underutnyttet.
- Om en aktivitetstype vokser mens andre synker.
- Hvordan forskjellige tidsperioder avslorer forskjellige monstre.

> **Tips:** Hvis vaksinasjonsaktiviteten er hoy men annen helsesporing er lav, vurder a legge til kryssfunksjon-meldinger: "Du logget en vaksinasjon -- vil du ogsa registrere Rex' vekt?"

---

## Dashboard-oppsett

De fire diagrammene er ordnet pa Analyser-siden i et rutenettoppsett:

```
+---------------------------+---------------------------+
|                           |                           |
|    Brukervekst            |    Artsfordeling          |
|    (Linjediagram)         |    (Sektordiagram)        |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Populaere raser        |    Helseaktivitet         |
|    (Horisontalt stolpe)   |    (Gruppert stolpe)      |
|                           |                           |
+---------------------------+---------------------------+
```

Hvert diagram opptar et kort med:
- En titteloverskrift
- Diagramvisualiseringen
- Interaktiv verktoyinfo ved hovring
- Responsiv storrelse som tilpasser seg skjermbredde

---

## Samhandle med diagrammer

### Verktoyinfo ved hovring

1. Flytt markoren over ethvert datapunkt, stolpe eller diagramsektor.
2. En verktoyinfo vises som viser:
   - Den eksakte verdien
   - Etiketten (dato, rasenavn, art, osv.)
   - Prosentandel der det er aktuelt

### Responsiv atferd

1. Pa storre skjermer vises diagrammer i et 2x2-rutenett.
2. Pa mindre skjermer stables diagrammer vertikalt for lesbarhet.
3. Diagramelementer endrer storrelse proporsjonalt.

### Dataoppdatering

1. Analysedata oppdateres nar siden lastes.
2. Endring av tidsperiode utloser en ny datahenting.
3. Det er ingen automatisk oppdatering -- last siden pa nytt manuelt for de nyeste dataene.

---

## Vanlige analyse-arbeidsflyter

### Manedlig rapportering

1. Velg tidsperioden **30d**.
2. Legg merke til brukerveksttrendet (opp, flatt eller ned).
3. Sjekk artsfordelingen for eventuelle endringer.
4. Gjennomga populaere raser for fremvoksende trender.
5. Undersok helseaktivitet for engasjementniva.
6. Ta skjermbilde eller eksporter data for rapporter.

### Undersoke et fall

1. Start med **30d** for a identifisere nar fallet inntraff.
2. Bytt til **7d** for a undersoke den nyeste perioden i detalj.
3. Sjekk om fallet samsvarer med:
   - Et systemproblem (sjekk Innstillinger > Vedlikeholdsmodus-historikk)
   - Et sendt varsel (sjekk Varselhistorikk)
   - Et sesongmonster (sammenlign med 1 ar-visningen)

### Kvartalsgjennomgang

1. Velg tidsperioden **90d**.
2. Sammenlign veksttrajektorien mot tidligere kvartaler.
3. Identifiser hvilke helseaktiviteter som vokste mest.
4. Legg merke til eventuelle nye raser som dukker opp i Populaere raser-diagrammet.
5. Bruk artsfordelingen for a validere at markedsforingsstrategien er pa linje.

### Arsplanlegging

1. Velg tidsperioden **1 ar**.
2. Identifiser sesongmonstre i brukervekst (f.eks. ferietopper).
3. Spor ar-over-ar endringer i rasepopularitet.
4. Mal helsefunksjon-adopsjon over hele aret.
5. Bruk innsiktene til a informere produktveikartet.

---

## Forsta dataferskhet

| Aspekt | Detalj |
|--------|--------|
| Datakilde | Plattformdatabase (aggregert) |
| Oppdateringsfrekvens | Sanntid ved sidelasting |
| Historisk noaktighet | Komplett tilbake til plattformlansering |
| Tidssone | Servertid (UTC) |
| Manglende data | Hull vises som nullverdier, ikke interpolert |

---

## Feilsoking

| Problem | Losning |
|---------|---------|
| Diagrammer lastes ikke | Sjekk nettverkstilkoblingen din. Oppdater siden. |
| Data virker utdatert | Analyser lastes ved sidebesok. Naviger bort og tilbake, eller oppdater. |
| Nullverdier for alle metrikker | Verifiser at den valgte tidsperioden har data. Prov a utvide til 1 ar. |
| Verktoyinfo for diagrammer vises ikke | Prov en annen nettleser. Sorg for at JavaScript er aktivert. |
| Tidsperioden endres ikke | Klikk direkte pa periodeknappen. Hvis den ikke reagerer, oppdater siden. |
| Kan ikke fa tilgang til Analyser | Verifiser at rollen og tillatelsene dine inkluderer tilgang til Analyser-siden. |

---

## Relaterte sider

- [Innstillinger](./settings.md) -- Konfigurer plattforminnstillinger som pavirker brukeratferd
- [Varsler](./notifications.md) -- Send varsler som kan pavirke engasjementsmetrikker
- [Tilbakemeldinger](./feedback.md) -- Korreler brukertilbakemeldinger med analysetrender
- [Administratorer](./admin-users.md) -- Gi analysetilgang til teammedlemmer
