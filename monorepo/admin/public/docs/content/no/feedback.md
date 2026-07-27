# Tilbakemeldingshåndtering

Siden for tilbakemeldingshåndtering lar administratorer se, svare på og organisere tilbakemeldinger fra brukere innsendt gjennom Petfolioo-mobilappen. Dette er ditt sentrale knutepunkt for å forstå brukerbehov, spore feil og håndtere funksjonsforslag.

![Feedback](/docs/screenshots/feedback.png)

---

## Oversikt

Når du navigerer til Tilbakemeldinger-siden, vil du se en statistikkrad øverst som oppsummerer gjeldende status for alle tilbakemeldinger, etterfulgt av fanebasert innhold og filterkontroller.

---

## Statistikkrad

Øverst på siden viser fire metrikkort sanntidstellinger:

| Metrikk | Beskrivelse |
|---------|-------------|
| **Totalt** | Totalt antall tilbakemeldinger mottatt på tvers av alle statuser |
| **Åpne** | Tilbakemeldinger som ennå ikke er besvart eller lukket |
| **Besvart** | Tilbakemeldinger der en admin har postet minst ett svar |
| **TODO** | Tilbakemeldinger festet av en admin for oppfølging |

> **Tips:** Bruk TODO-tallet som en rask indikator på utestående elementer som trenger oppmerksomhet. Hvis dette tallet vokser, vurder å triagere med teamet ditt.

---

## Faner

Tilbakemeldingssiden er organisert i to faner:

### Alle tilbakemeldinger

1. Klikk på fanen **Alle tilbakemeldinger** (valgt som standard).
2. Denne visningen viser hver tilbakemelding i systemet uavhengig av status.
3. Oppføringer er sortert etter dato, med de nyeste først.
4. Bruk filtrene (beskrevet nedenfor) for å begrense resultatene.

### TODO-liste

1. Klikk på fanen **TODO-liste**.
2. Denne visningen viser kun tilbakemeldinger som er festet som TODO av en admin.
3. Bruk denne fanen under team-triageringsmøter eller daglige gjennomganger.
4. Elementer forblir her til de fjernes fra listen.

---

## Filtre

Under fanene gir en filterlinje flere kontroller for å begrense de viste tilbakemeldingene.

### Statusfilter

1. Finn **Status**-nedtrekksmenyen på filterlinjen.
2. Klikk for å utvide og velg et av følgende:
   - **Alle** -- Viser tilbakemeldinger i enhver status
   - **Åpen** -- Viser kun uløste tilbakemeldinger
   - **Besvart** -- Viser tilbakemeldinger med minst ett admin-svar
   - **Lukket** -- Viser tilbakemeldinger markert som løst
3. Listen oppdateres umiddelbart ved valg.

### Typefilter

1. Finn **Type**-nedtrekksmenyen på filterlinjen.
2. Velg kategorien av tilbakemeldinger du vil se:
   - **Alle typer** -- Ingen typefilter brukt
   - **Feil** -- Problemer eller defekter rapportert av brukere
   - **Forslag** -- Funksjonsforespørsler og forbedringsideer
   - **Generelt** -- Generelle kommentarer eller spørsmål
3. Hver tilbakemelding er merket med sitt typebadge for rask visuell identifikasjon.

### Datointervallfilter

1. Klikk på **Datointervall**-velgeren på filterlinjen.
2. Velg en startdato og sluttdato fra kalenderwidgeten.
3. Kun tilbakemeldinger innsendt innenfor det valgte intervallet vises.
4. For å fjerne datofilteret, klikk på fjern-ikonet på datovelgeren.

### Kun TODO-bryter

1. Finn **Kun TODO**-bryteren på filterlinjen.
2. Aktiver den for å vise kun tilbakemeldinger festet som TODO.
3. Dette gir et raskt alternativ til å bytte til TODO-liste-fanen mens du forblir i Alle tilbakemeldinger-visningen med andre filtre brukt.

> **Tips:** Kombiner filtre for kraftige søk. For eksempel, sett Type til "Feil" og Status til "Åpen" for å se alle uløste feilrapporter.

---

## Tilbakemeldingsoppføringer

Hver tilbakemelding i listen viser følgende informasjon:

| Felt | Beskrivelse |
|------|-------------|
| **Brukerinfo** | Innsenderens visningsnavn, e-post og avatar |
| **Melding** | Full tekst av tilbakemeldingen innsendt av brukeren |
| **Typebadge** | Et farget merke som indikerer Feil (rød), Forslag (blå) eller Generelt (grå) |
| **Dato** | Dato og tidspunkt tilbakemeldingen ble innsendt |
| **Status** | Gjeldende statusindikator (Åpen, Besvart eller Lukket) |
| **TODO-feste** | Et fest-ikon som indikerer om denne oppføringen er markert for oppfølging |

### Visning av en tilbakemelding

1. Finn tilbakemeldingen i listen.
2. Klikk på oppføringsraden eller utvid-ikonet for å åpne detaljvisningen.
3. Detaljvisningen viser den fullstendige meldingen, brukerinformasjon og eventuelle tidligere admin-svar.

---

## Svare på tilbakemeldinger

Administratorer kan svare på brukertilbakemeldinger. Svar er synlige for brukeren i mobilappen.

### Steg for å svare

1. Åpne tilbakemeldingen du vil svare på.
2. Finn **Svar**-tekstfeltet nederst i detaljvisningen.
3. Skriv svarmeldingen din i tekstfeltet.
4. Gjennomgå meldingen for klarhet og profesjonalitet.
5. Klikk **Send svar**-knappen.
6. En bekreftelsesmelding vises som indikerer at svaret ble sendt.
7. Tilbakemeldingsstatusen endres automatisk til **Besvart**.

> **Viktig:** Svaret ditt vil være synlig for brukeren i Petfolioo-mobilappen. Sørg for at svaret er hjelpsomt, profesjonelt og adresserer brukerens henvendelse direkte.

### Beste praksis for svar

- Anerkjenn brukerens tilbakemelding før du gir en løsning.
- Hvis problemet er en kjent feil, la brukeren vite at det jobbes med det.
- For forslag, takk brukeren og forklar om funksjonen vurderes.
- Unngå teknisk sjargong som sluttbrukere kanskje ikke forstår.
- Hold svarene konsise men grundige.

---

## Tidligere admin-svar

Når du ser en tilbakemelding som har mottatt svar, vises alle tidligere admin-svar kronologisk i tråden.

1. Åpne detaljvisningen for tilbakemeldingen.
2. Bla ned for å se samtaletråden.
3. Hvert svar viser:
   - Navnet på adminen som postet svaret
   - Dato og tidspunkt for svaret
   - Den fullstendige svarteksten
4. Nye svar vises nederst i tråden.

> **Tips:** Se gjennom tidligere svar før du poster et nytt for å unngå dupliserte eller motstridende svar.

---

## Lukking av tilbakemeldinger

Når en tilbakemelding er fullstendig adressert, kan du lukke den for å indikere at ingen ytterligere handling er nødvendig.

### Steg for å lukke

1. Åpne tilbakemeldingen du vil lukke.
2. Klikk **Lukk**-knappen (eller velg "Lukk" fra handlingsmenyen).
3. En bekreftelsesdialog vises som ber deg bekrefte.
4. Klikk **Bekreft** for å lukke tilbakemeldingen.
5. Oppføringens status endres til **Lukket**.
6. Lukkede oppføringer forblir i systemet og kan vises ved å sette statusfilteret til "Lukket."

> **Merk:** Å lukke en tilbakemelding sletter den ikke. Du kan fortsatt se lukkede oppføringer og gjenåpne dem ved behov.

---

## Fest / Fjern som TODO

TODO-festefunksjonen lar adminer flagge spesifikke tilbakemeldinger for oppfølging. Festede elementer vises i TODO-liste-fanen og bidrar til TODO-tellingen i statistikkraden.

### Feste tilbakemelding som TODO

1. Finn tilbakemeldingen du vil flagge for oppfølging.
2. Klikk **Fest**-ikonet (knappenål) på oppføringsraden, eller åpne detaljvisningen og klikk **Fest som TODO**.
3. Oppføringen legges umiddelbart til TODO-listen.
4. TODO-telleren i statistikkraden øker med en.
5. Et fest-ikon vises på oppføringen som indikerer dens TODO-status.

### Fjerne tilbakemelding fra TODO

1. Finn den festede tilbakemeldingen (bruk TODO-liste-fanen eller Kun TODO-filteret).
2. Klikk **Fjern fest**-ikonet på oppføringsraden, eller åpne detaljvisningen og klikk **Fjern fra TODO**.
3. Oppføringen fjernes fra TODO-listen.
4. TODO-telleren i statistikkraden reduseres med en.

### Når du bør bruke TODO-festing

- En tilbakemelding krever undersøkelse før du svarer.
- Du trenger innspill fra et annet teammedlem før du svarer.
- Problemet er relatert til en kommende utgivelse og bør spores.
- Et forslag må diskuteres i neste planleggingsmøte.

---

## Arbeidsflyt-sammendrag

Den anbefalte arbeidsflyten for håndtering av tilbakemeldinger er:

1. **Gjennomgå** -- Sjekk statistikkraden daglig for nye åpne tilbakemeldinger.
2. **Triager** -- Bruk filtre for å prioritere feil over forslag.
3. **Fest** -- Merk komplekse elementer som TODO for senere oppfølging.
4. **Svar** -- Besvar enkle henvendelser umiddelbart.
5. **Samarbeid** -- Bruk TODO-liste-fanen i teamgjennomganger.
6. **Lukk** -- Merk løste elementer som lukket etter å ha bekreftet at brukerens problem er adressert.

---

## Tastatursnarveier

| Snarvei | Handling |
|---------|----------|
| `Enter` | Åpne valgt tilbakemelding |
| `R` | Fokuser svar-tekstfeltet (når oppføring er åpen) |
| `T` | Veksle TODO-festing på valgt oppføring |
| `Esc` | Lukk detaljvisningen |

---

## Feilsøking

| Problem | Løsning |
|---------|---------|
| Svar sendes ikke | Sjekk nettverkstilkoblingen og prøv igjen. Sørg for at meldingen ikke er tom. |
| Filtre oppdateres ikke | Oppdater siden. Hvis problemet vedvarer, tøm nettleserbufferen. |
| TODO-telling er feil | Tellingen oppdateres ved sideinnlasting. Naviger bort og tilbake for å oppdatere. |
| Kan ikke se lukkede tilbakemeldinger | Sett statusfilteret til "Lukket" eller "Alle" for å vise lukkede oppføringer. |

---

## Relaterte sider

- [Varsler](./notifications.md) -- Send kunngjøringer til brukere
- [Admin-brukere](./admin-users.md) -- Administrer hvem som kan svare på tilbakemeldinger
- [Innstillinger](./settings.md) -- Konfigurer systemomfattende preferanser
