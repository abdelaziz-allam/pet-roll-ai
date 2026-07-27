# Avlsmarked

Modulen Avlsmarked gir administratorer oversikt over plattformens parringssystem for kjæledyr. Overvåk parringsforespørsler, følg vellykkede par, og se rangeringer av oppdrettere.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Navigasjonsfaner

Avlsmarked-siden er organisert i to hovedfaner:

| Fane | Beskrivelse |
|------|-------------|
| Treff og forespørsler | Vis og administrer alle parringsmatcher og ventende forespørsler |
| Oppdretter-rangeringer | Topplister som viser de best presterende oppdretterne |

Bytt mellom faner ved å klikke på faneoverskriften øverst på siden.

---

## Fanen Treff og forespørsler

Denne fanen viser alle parringsmatcher som visuelle kort, og gir en intuitiv oversikt over avlsaktiviteten på plattformen.

### Match-kort

Hvert treff vises som et kort som viser to kjæledyr forbundet med en visuell hjerte-kobling.

#### Kortoppsett

```
+------------------------------------------+
|  [Dyr A Bilde]  <3  [Dyr B Bilde]       |
|  Dyr A Navn          Dyr B Navn         |
|  Rase                Rase               |
|  Eier                Eier               |
|                                          |
|  Status: [Badge]     Opprettet: [Dato]  |
|  Art: [Tag]          Sted: [By]         |
+------------------------------------------+
```

#### Kortinformasjon

| Element | Beskrivelse |
|---------|-------------|
| Dyrebilder | Profilbilder av begge dyrene i treffet |
| Hjerte-kobling | Visuell lenke mellom de to dyrene (animert for aktive treff) |
| Dyrenavn | Navnene til begge dyrene |
| Raser | Raseinformasjon for hvert dyr |
| Eiere | Eiernavn (klikkbare for å se profiler) |
| Statusbadge | Gjeldende treffstatus |
| Opprettelsesdato | Når parringsforespørselen ble opprettet |
| Art-tag | Dyrearten |
| Sted | By/land for oppføringen |

### Treffstatuser

| Status | Badge-farge | Beskrivelse |
|--------|-------------|-------------|
| Ventende | Oransje | Parringsforespørsel sendt, avventer svar |
| Akseptert | Grønn | Begge parter godtok treffet |
| Avslått | Rød | En part avslo treffet |
| Fullført | Blå | Parring bekreftet som gjennomført |
| Kansellert | Grå | Treffet ble kansellert av en av partene |
| Utløpt | Lysegrå | Forespørselen utløp uten svar |

---

## Filtre

Filterlinjen lar deg begrense de viste treffene.

### Statusfilter

Velg en eller flere statuser å vise:

1. Klikk på **Status**-nedtrekksmenyen.
2. Huk av statusene du vil se.
3. Kortrutenettet oppdateres umiddelbart.

### Artsfilter

Filtrer treff etter dyreart:

- Alle arter (standard)
- Hund
- Katt
- Fugl
- Kanin
- Annet

### Landsfilter

Velg ett eller flere land å filtrere etter treffplassering.

### Byfilter

Begrens ytterligere ved å velge spesifikke byer.

> **Tips:** Bruk Status: Akseptert + ditt land for å se vellykkede treff i din region som kanskje trenger handlingen "Send bryllupskort".

---

## Detaljpanel

Klikk på et match-kort for å åpne detaljpanelet på høyre side av skjermen.

### Bildeseksjon

Øverst i panelet vises større versjoner av begge dyrebildene side om side med hjerte-koblingen mellom dem.

- Klikk på et bilde for å se det i full størrelse.
- Bla gjennom flere bilder hvis dyret har et galleri.

### Oppføringsinformasjon

| Felt | Beskrivelse |
|------|-------------|
| Oppførings-ID | Unik identifikator for parringsoppføringen |
| Opprettet av | Hvilken dyreeier som initierte oppføringen |
| Opprettelsesdato | Dato da oppføringen ble publisert |
| Treff-dato | Dato da treffet ble foreslått |
| Svardato | Dato da treffet ble akseptert/avslått (hvis aktuelt) |
| Art | Art for begge dyrene |
| Raser | Detaljert raseinformasjon |
| Sted | Fullstendige stedsdetaljer |
| Notater | Eventuelle notater fra oppføringseieren |

### Treff-tidslinje

Panelet inkluderer en kronologisk tidslinje over hendelser:

1. **Oppføring opprettet** -- Eier publiserte sitt dyrs parringsoppføring
2. **Treff foreslått** -- Matchingsalgoritmen eller manuell forespørsel initierte treffet
3. **Treff sett** -- Den andre parten så treffforslaget
4. **Svar gitt** -- Akseptert/avslått med tidsstempel
5. **Fullføring registrert** -- Hvis parring ble bekreftet gjennomført
6. **Bryllupskort sendt** -- Hvis admin sendte et gratulasjonsvarsel

Hver tidslinjehendelse viser:

- Dato og tidspunkt
- Aktør (system, eier A, eier B eller admin)
- Hendelsesbeskrivelse
- Tilleggsnotater (hvis noen)

> **Tips:** Tidslinjen hjelper deg å forstå den fulle konteksten til et treff når du undersøker tvister eller problemer rapportert av brukere.

---

## Send bryllupskort

Handlingen "Send bryllupskort" lar administratorer sende et gratulasjonsvarsel til begge dyreeierne når et treff er akseptert eller fullført.

### Slik sender du et bryllupskort

1. Åpne detaljpanelet for et **Akseptert** eller **Fullført** treff.
2. Klikk på **Send bryllupskort**-knappen nederst i panelet.
3. I dialogen:
   - Forhåndsvis varselsmeldingen (automatisk generert med begge dyrenavnene).
   - Legg eventuelt til en egendefinert gratulasjonsmelding.
   - Se over mottakerne (begge dyreeierne).
4. Klikk **Send**.

### Hva bryllupskortet inneholder

- Gratulasjonsoverskrift med begge dyrenavnene
- Dyrebilder arrangert med dekorative elementer
- Treff-dato og sted
- Egendefinert admin-melding (hvis oppgitt)
- Lenke til treffdetaljsiden

### Når du bør sende

- Etter at et treff er akseptert og begge parter bekrefter at de fortsetter.
- Etter at et treff er markert som fullført.
- Kun en gang per treff (knappen deaktiveres etter sending).

> **Tips:** Bryllupskort er et verktøy for samfunnsengasjement. Å sende dem for aksepterte treff oppmuntrer til plattformdeltakelse og skaper en positiv opplevelse for oppdrettere.

---

## Fanen Oppdretter-rangeringer

Fanen Oppdretter-rangeringer viser de mest aktive og vellykkede oppdretterne på plattformen.

### Samlet topp 10-podium

Øverst i Rangeringer-fanen fremhever en podiumvisualisering de 10 beste oppdretterne på tvers av alle arter.

#### Podiumoppsett

```
              [1.]
        [2.]       [3.]
   [4.]  [5.]  [6.]  [7.]
      [8.]   [9.]   [10.]
```

Hver podiumposisjon viser:

- Oppdretter-navn
- Kennelnavn
- Profilbilde
- Totalt antall treff
- Suksessrate i prosent

#### Podiumpoengberegning

Oppdrettere rangeres etter en sammensatt poengsum basert på:

| Faktor | Vekting | Beskrivelse |
|--------|---------|-------------|
| Totalt antall treff | 30% | Antall treff initiert eller mottatt |
| Suksessrate | 40% | Prosentandel av treff som nådde Akseptert/Fullført |
| Aktive oppføringer | 15% | Antall aktive parringsoppføringer for øyeblikket |
| Responstid | 15% | Gjennomsnittlig tid for å svare på treffforslag |

### Topp 10 per art-rutenett

Under det samlede podiumet viser et rutenett de 10 beste oppdretterne for hver art separat.

#### Rutenettoppsett

Hver art har sitt eget kort:

```
+-------------------+  +-------------------+  +-------------------+
|  Hunder Topp 10   |  |  Katter Topp 10   |  |  Fugler Topp 10  |
| 1. Oppdretter     |  | 1. Oppdretter     |  | 1. Oppdretter     |
| 2. Oppdretter     |  | 2. Oppdretter     |  | 2. Oppdretter     |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Hver oppføring i artsrutenettet viser:

- Rangeringsnummer
- Oppdretter-navn
- Kennelnavn
- Antall treff for den arten
- Suksessrate for den arten

> **Tips:** Rangeringer per art hjelper med å identifisere spesialistoppdrettere som kan være utmerkede kandidater for plattformpartnerskap eller fremhevede oppføringer.

---

## Sorterbar rangeringstabell

Under de visuelle rangeringene gir en fullstendig datatabell detaljert statistikk over oppdrettere.

### Tabellkolonner

| Kolonne | Sorterbar | Beskrivelse |
|---------|-----------|-------------|
| Rangering | Ja | Gjeldende posisjon basert på standardpoengberegning |
| Oppdretter-navn | Ja | Fullt navn på oppdretteren |
| Kennel | Ja | Kennelnavn |
| Treff | Ja | Totalt antall treff (initiert + mottatt) |
| Oppføringer | Ja | Antall parringsoppføringer opprettet |
| Suksessrate | Ja | Prosentandel av treff som når Akseptert/Fullført-status |
| Visninger | Ja | Totalt antall visninger på deres parringsoppføringer |
| Art | Nei | Hovedart de avler |
| Sted | Nei | Land og by |

### Sortering av tabellen

1. Klikk på en sorterbar kolonneoverskrift for å sortere stigende.
2. Klikk igjen for å sortere synkende.
3. Et tredje klikk fjerner sorteringen på den kolonnen.
4. Du kan sortere etter flere kolonner (hold Shift og klikk).

### Tabellinteraksjoner

- Klikk på en oppdretter-rad for å se deres fullstendige profil og treffhistorikk.
- Bruk søkefeltet over tabellen for å finne en spesifikk oppdretter.
- Eksporter tabelldataene med **Eksporter CSV**-knappen.

> **Tips:** Sorter etter Suksessrate synkende for å identifisere oppdrettere som konsekvent produserer vellykkede treff. Disse oppdretterne kan dra nytte av premiumfunksjoner eller hurtigbehandling av verifisering.

---

## Forstå treff-metrikker

### Beregning av suksessrate

```
Suksessrate = (Aksepterte + Fullførte treff) / Totalt antall treff x 100
```

- Bare treff der oppdretteren var oppføringseieren teller mot deres suksessrate.
- Avslåtte og utløpte treff reduserer suksessraten.
- Kansellerte treff er ekskludert fra beregningen.

### Visningstall

Visningstallet representerer:

- Totalt antall unike visninger på alle oppdretter ens aktive parringsoppføringer.
- Teller ikke oppdretter ens egne visninger.
- Nullstilles per oppføring (ikke kumulativt på tvers av slettede oppføringer).

### Aktivitetspoeng

Den samlede rangeringen tar hensyn til aktualitet:

- Treff fra de siste 90 dagene vektes 2x.
- Treff fra 90-180 dager vektes 1x.
- Treff eldre enn 180 dager vektes 0,5x.

> **Tips:** En oppdretter med høye visningstall men lav suksessrate kan ha attraktive oppføringer, men være for selektiv eller treg til å svare. Vurder å ta kontakt for å forstå deres opplevelse.

---

## Ofte stilte spørsmål

**Sp: Kan jeg manuelt opprette et treff mellom to dyr?**
Sv: Nei. Treff opprettes av dyreeiere gjennom appen. Administratorer kan kun overvåke og utføre handlinger på eksisterende treff.

**Sp: Hva skjer med treffdata når et dyr slettes?**
Sv: Treffoppføringen beholdes for historiske formål, men merkes med en "Dyr fjernet"-indikator. Treffet kan ikke gå videre.

**Sp: Kan jeg fjerne en oppdretter fra rangeringene?**
Sv: Rangeringer beregnes automatisk. For å fjerne en oppdretter må kontoen deres suspenderes eller verifiseringen tilbakekalles, noe som ekskluderer dem fra rangeringene.

**Sp: Hvor ofte oppdateres rangeringene?**
Sv: Rangeringer beregnes på nytt hver 24. time. Tidsstempelet for siste oppdatering vises øverst i Rangeringer-fanen.

**Sp: Kan jeg sende et bryllupskort for et avslått treff?**
Sv: Nei. Knappen Send bryllupskort er kun tilgjengelig for treff med status Akseptert eller Fullført.

**Sp: Hva om begge dyrene i et treff tilhører samme eier?**
Sv: Systemet forhindrer treff med samme eier. Hvis du ser et slikt tilfelle, indikerer det et dataintegritetsproblem som bør rapporteres til utviklingsteamet.
