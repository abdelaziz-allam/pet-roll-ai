# Innstillinger

Innstillinger-siden gir systemomfattende konfigurasjonsalternativer for Petfolioo-plattformen. Innstillingene er organisert i tre faner: Generelt, Varsler og Sikkerhet. Endringer som gjores her pavirker atferden til bade adminportalen og mobilapplikasjonen.

![Settings](/docs/screenshots/settings.png)

---

## Oversikt

Kun administratorer med super_admin- eller admin-rolle (med tilgang til Innstillinger-siden) kan se og endre innstillinger. Alle endringer krever eksplisitt lagring og trer i kraft umiddelbart ved lagring.

---

## Tilgang til innstillinger

1. Klikk **Innstillinger** i sidenavigasjonsmenyen.
2. Innstillinger-siden lastes med tre faner overst.
3. Fanen **Generelt** er valgt som standard.

---

## Generelt-fanen

Generelt-fanen inneholder kjerneinnstillinger for applikasjonskonfigurasjon som definerer hvordan plattformen presenterer seg og fungerer.

### Felter

| Felt | Beskrivelse | Standard |
|------|-------------|----------|
| **Appnavn** | Visningsnavnet til applikasjonen vist i varsler og e-poster | Petfolioo |
| **Support-e-post** | Kontakt-e-postadressen vist til brukere for supporthenvendelser | -- |
| **Standardsprak** | Standardspraket for nye brukere og systemkommunikasjon | English |
| **Vedlikeholdsmodus** | Bryter for a aktivere eller deaktivere vedlikeholdsmodus | Av |

### Konfigurere generelle innstillinger

#### Appnavn

1. Finn feltet **Appnavn**.
2. Slett den eksisterende verdien og skriv inn onsket applikasjonsnavn.
3. Dette navnet vises i push-varsler, e-postoverskrifter og mobilappens om-seksjon.

#### Support-e-post

1. Finn feltet **Support-e-post**.
2. Skriv inn e-postadressen der brukere skal rette supporthenvendelser.
3. Denne e-posten vises pa mobilappens hjelp-/kontaktskjerm.

> **Tips:** Bruk en delt team-e-post (f.eks. support@petfolioo.com) i stedet for en personlig adresse slik at flere teammedlemmer kan svare.

#### Standardsprak

1. Klikk pa rullegardinmenyen **Standardsprak**.
2. Velg spraket som skal brukes som standard for:
   - Opprettelse av nye brukerkontoer
   - Systemgenererte varsler
   - E-postmaler
3. Brukere kan overstyre dette i sine individuelle mobilappinnstillinger.

#### Vedlikeholdsmodus

Vedlikeholdsmodus er en kritisk funksjon som signaliserer til brukere at plattformen er midlertidig utilgjengelig.

1. Finn **Vedlikeholdsmodus**-bryteren.
2. Klikk pa bryteren for a aktivere vedlikeholdsmodus.
3. En advarselsdialog vises som bekrefter handlingen.

**Nar vedlikeholdsmodus er aktivert:**

| Effekt | Beskrivelse |
|--------|-------------|
| Adminportal-advarsel | Et fremtredende banner vises overst i adminportalen som indikerer at vedlikeholdsmodus er aktiv |
| Mobilapp-pavirkning | Mobilapplikasjonen viser en vedlikeholdsskjerm til brukere, som forhindrer normal bruk |
| API-atferd | API-endepunkter returnerer vedlikeholdsstatusresponser |
| Admin-tilgang | Administratorer kan fortsatt bruke adminportalen normalt |

4. For a deaktivere vedlikeholdsmodus, klikk pa bryteren igjen.
5. Bekreft handlingen i dialogen.
6. Plattformen gar tilbake til normal drift umiddelbart.

> **Advarsel:** Aktivering av vedlikeholdsmodus pavirker umiddelbart alle mobilappbrukere. Aktiver den kun under planlagte vedlikeholdsvinduer og kommuniser tidsplanen pa forhand via push-varsel.

---

## Varsler-fanen

Varsler-fanen styrer automatisert varselatferd -- de systemgenererte varslene som sendes til brukere basert pa kjaeledyrdataene deres.

### Felter

| Felt | Beskrivelse | Type | Standard |
|------|-------------|------|----------|
| **Vaksinasjonspaminnelser** | Send automatiske paminnelser nar et kjaeledyrs vaksinasjon naermer seg forfallsdato | Bryter | Pa |
| **Svangerskapsvarsler** | Send varsler for svangerskap-milepael-datoer og forventet fodsel | Bryter | Pa |
| **Paringsoppdateringer** | Send oppdateringer om paringsplan-hendelser og bekreftelser | Bryter | Pa |
| **Paminnelsesdager for forfallsdato** | Antall dager for en forfallsdato for a sende paminnelsesvarselet | Tallfelt | 7 |

### Konfigurere varselinnstillinger

#### Vaksinasjonspaminnelser

1. Finn bryteren **Vaksinasjonspaminnelser**.
2. Nar **aktivert** (standard):
   - Brukere mottar push-varsler for kjaeledyrets vaksinasjonsforfallsdatoer.
   - Varselet sendes basert pa innstillingen "Paminnelsesdager for forfallsdato".
   - Eksempel: Hvis satt til 7 dager, far brukere en paminnelse en uke for vaksinasjonen forfaller.
3. Nar **deaktivert**:
   - Ingen automatiske vaksinasjonspaminnelser sendes.
   - Brukere ma manuelt sjekke kjaeledyrets vaksinasjonsplan.

#### Svangerskapsvarsler

1. Finn bryteren **Svangerskapsvarsler**.
2. Nar **aktivert** (standard):
   - Brukere som sporer et svangerskap mottar milepael-varsler.
   - Varsler inkluderer paminnelser om forventet fodselsdato og faseoverganger.
   - Oppdrettere mottar ytterligere profesjonelle sporingsvarsler.
3. Nar **deaktivert**:
   - Ingen automatiske svangerskapsrelaterte varsler sendes.

#### Paringsoppdateringer

1. Finn bryteren **Paringsoppdateringer**.
2. Nar **aktivert** (standard):
   - Brukere mottar varsler om planlagte paringshendelser.
   - Bekreftelsevarsler sendes nar paringsregistreringer logges.
   - Oppdrettere mottar forslag til partnere og planpaminnelser.
3. Nar **deaktivert**:
   - Ingen automatiske paringsrelaterte varsler sendes.

#### Paminnelsesdager for forfallsdato

1. Finn tallfeltet **Paminnelsesdager for forfallsdato**.
2. Skriv inn antall dager for en forfallsdato nar paminnelser skal sendes.
3. Denne verdien gjelder for alle datobaserte paminnelser (vaksinasjoner, avtaler).
4. Gyldig omrade: 1 til 30 dager.

> **Tips:** En verdi pa 7 dager fungerer bra for de fleste brukere. For oppdrettere som administrerer flere kjaeledyr, vurder a sette den til 14 dager for a gi mer forberedelsestid.

### Interaksjonstabell for varsler

| Innstilling | Pavirker | Brukerpavirkning |
|-------------|----------|------------------|
| Vaksinasjonspaminnelser PA + 7 dager | Brukere med kjaeledyr som har kommende vaksinasjoner | "Rex' rabiesvaksinasjon forfaller om 7 dager" |
| Svangerskapsvarsler PA | Brukere med aktive svangerskapsregistreringer | "Lunas svangerskap har gatt inn i uke 6" |
| Paringsoppdateringer PA | Brukere med planlagte paringer | "Paringsavtale med Max bekreftet for fredag" |
| Alle brytere AV | Alle brukere | Ingen automatiserte varsler; kun manuelle admin-varsler |

---

## Sikkerhet-fanen

Sikkerhet-fanen inneholder innstillinger som styrer API-hastighetsbegrensning, autentiseringstokens levetid og filopplastingsbegrensninger.

### Felter

| Felt | Beskrivelse | Type | Standard |
|------|-------------|------|----------|
| **Hastighetsgrense per minutt** | Maksimalt antall API-forsporsler tillatt per bruker per minutt | Tall | 60 |
| **Access Token-utlop (timer)** | Hvor lenge et access token forblir gyldig | Tall | 24 |
| **Refresh Token-utlop (dager)** | Hvor lenge et refresh token forblir gyldig | Tall | 30 |
| **Maks bildestorrelse (MB)** | Maksimalt tillatt filstorrelse for kjaeledyrbilder | Tall | 5 |
| **Maks avatarstorrelse (MB)** | Maksimalt tillatt filstorrelse for brukeravatarer | Tall | 2 |
| **Tillatte filtyper** | Kommaseparert liste over MIME-typer akseptert for opplasting | Tekst | image/jpeg,image/png,image/webp |

### Konfigurere sikkerhetsinnstillinger

#### Hastighetsgrense per minutt

1. Finn feltet **Hastighetsgrense per minutt**.
2. Skriv inn maksimalt antall API-forsporsler en enkelt bruker kan gjore per minutt.
3. Forsporsler som overstiger denne grensen mottar en 429 (Too Many Requests)-respons.
4. Anbefalt omrade: 30-120 avhengig av forventede bruksmonstre.

> **Viktig:** Setter du denne for lavt kan det fore til at mobilappen ikke fungerer for aktive brukere. Setter du den for hoyt kan systemet bli sarbart for misbruk. Standarden pa 60 er passende for de fleste installasjoner.

#### Access Token-utlop (timer)

1. Finn feltet **Access Token-utlop**.
2. Skriv inn antall timer et access token forblir gyldig etter utstedelse.
3. Nar et token utloper, bruker appen refresh token for a fa et nytt.
4. Kortere verdier er sikrere; lengre verdier reduserer innloggingsfriksjon.

| Verdi | Sikkerhet | Brukeropplevelse |
|-------|-----------|------------------|
| 1 time | Hoy | Hyppig re-autentisering |
| 24 timer | Middels | God balanse (anbefalt) |
| 72 timer | Lavere | Minimal avbrytelse |

#### Refresh Token-utlop (dager)

1. Finn feltet **Refresh Token-utlop**.
2. Skriv inn antall dager et refresh token forblir gyldig.
3. Nar refresh token utloper, ma brukeren logge inn igjen med sine legitimasjoner.
4. Anbefalt omrade: 7-90 dager.

> **Tips:** For en forbrukerapp som Petfolioo er 30 dager en god balanse. Brukere som apner appen minst manedlig vil aldri trenge a logge inn pa nytt. For installasjoner med hoyere sikkerhetskrav, vurder 7 dager.

#### Maks bildestorrelse (MB)

1. Finn feltet **Maks bildestorrelse**.
2. Skriv inn maksimal filstorrelse i megabyte for opplasting av kjaeledyrbilder.
3. Bilder som overstiger denne storrelsen avvises med en feilmelding.
4. Vurder lagringskostnader og opplastingstider for brukere med treg tilkobling.

| Verdi | Egnet for |
|-------|-----------|
| 2 MB | Lav lagring, raske opplastinger, lavere kvalitet |
| 5 MB | Balansert (anbefalt) |
| 10 MB | Hoy kvalitet pa bilder, mer lagringsbruk |

#### Maks avatarstorrelse (MB)

1. Finn feltet **Maks avatarstorrelse**.
2. Skriv inn maksimal filstorrelse i megabyte for opplasting av brukerprofilavatarer.
3. Avatarer er typisk mindre enn kjaeledyrbilder siden de vises i redusert opplosning.
4. Anbefalt: 1-3 MB.

#### Tillatte filtyper

1. Finn feltet **Tillatte filtyper**.
2. Skriv inn en kommaseparert liste over MIME-typer som systemet aksepterer for opplastinger.
3. Hver MIME-type skal vaere i formatet `type/subtype`.
4. Ikke legg til mellomrom mellom oppforinger med mindre du med vilje onsker dem i MIME-type-strengen.

**Vanlige MIME-typer for bildeopplasting:**

| MIME-type | Format | Merknader |
|-----------|--------|-----------|
| `image/jpeg` | JPEG | Vanligste bildeformat, god komprimering |
| `image/png` | PNG | Tapsfri, stotter gjennomsiktighet |
| `image/webp` | WebP | Moderne format, utmerket komprimering |
| `image/heic` | HEIC | Apples format, brukt av iPhone-kameraer |
| `image/gif` | GIF | Animerte bilder, storre filstorrelser |

**Eksempelkonfigurasjoner:**

```
Standard:     image/jpeg,image/png,image/webp
Utvidet:      image/jpeg,image/png,image/webp,image/heic,image/gif
Minimal:      image/jpeg,image/png
```

> **Advarsel:** A legge til MIME-typer som ikke stottes kan tillate opplastinger som systemet ikke kan behandle. Legg kun til typer som bildebehandlingspipelinen din stotter.

---

## Lagre innstillinger

Alle innstillingsendringer krever en eksplisitt lagringshandling.

### Trinn for a lagre

1. Gjor onskede endringer pa tvers av alle tre fanene.
2. Klikk pa **Lagre innstillinger**-knappen nederst pa siden.
3. En lasteindikator vises mens endringer blir brukt.
4. En suksessmelding bekrefter at innstillingene ble lagret.
5. Endringer trer i kraft umiddelbart pa tvers av plattformen.

### Viktige merknader om lagring

- Endringer lagres **ikke** automatisk. Hvis du navigerer bort uten a lagre, gar endringene tapt.
- Du kan endre innstillinger pa tvers av flere faner for lagring -- alle endringer lagres samlet.
- Hvis en valideringsfeil oppstar, markeres det spesifikke feltet med en feilmelding.
- Kun felter som er endret sendes til serveren (optimistisk delvis oppdatering).

> **Tips:** Etter lagring av sikkerhetsrelaterte endringer (hastighetsgrenser, token-utlop), overvik systemet i en kort periode for a sikre at ingen uventet atferd oppstar.

---

## Revisjonslogg for innstillingsendringer

Alle innstillingsendringer logges for sikkerhet og etterrettelighet:

| Logget informasjon | Beskrivelse |
|--------------------|-------------|
| Admin-navn | Hvem som gjorde endringen |
| Tidsstempel | Nar endringen ble gjort |
| Felt endret | Hvilken innstilling som ble endret |
| Forrige verdi | Verdien for endringen |
| Ny verdi | Verdien etter endringen |

---

## Feilsoking

| Problem | Losning |
|---------|---------|
| Kan ikke fa tilgang til Innstillinger-siden | Verifiser at rollen din er super_admin eller admin med Innstillinger-tillatelse tildelt. |
| Lagre-knappen er deaktivert | Ingen endringer er gjort. Endre minst ett felt for a aktivere lagring. |
| Valideringsfeil ved lagring | Sjekk det markerte feltet for den spesifikke feilmeldingen og korriger verdien. |
| Vedlikeholdsmodus pavirker ikke appen | Tillat 1-2 minutter for at endringen skal propagere til alle mobilappinstanser. |
| Hastighetsgrense for restriktiv | Ok verdien og lagre. Pavirte brukere blir friblokkert innen ett minutt. |
| Filopplastingsfeil etter typeendring | Sorg for at MIME-typene er korrekt formatert uten etterfolgene kommaer eller mellomrom. |

---

## Relaterte sider

- [Administratorer](./admin-users.md) -- Administrer hvem som kan fa tilgang til og endre innstillinger
- [Varsler](./notifications.md) -- Send manuelle varsler til brukere
- [Analyser](./analytics.md) -- Overvik plattformhelse og bruk
