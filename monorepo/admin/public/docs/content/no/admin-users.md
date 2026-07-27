# Administratorer

Administratorer-siden lar deg administrere administratorkontoene som har tilgang til Petfolioo-adminportalen. Her kan du opprette nye administratorer, tildele roller, konfigurere detaljerte tillatelser og kontrollere kontostatus.

![Admin Users](/docs/screenshots/admin-users.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Delete, Manage Permissions |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Oversikt

Tilgangskontroll er kritisk for a opprettholde sikkerhet og operasjonell integritet. Administratorsystemet stotter rollebasert tilgang med ytterligere per-side tillatelsesgraularitet, som sikrer at hvert teammedlem har noyaktig den tilgangen de trenger.

---

## Administratortabell

Hovedvisningen viser en tabell over alle administratorkontoer i systemet.

### Tabellkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| **Navn** | Administratorens visningsnavn vist i hele portalen |
| **E-post** | Innloggings-e-postadressen for administratorkontoen |
| **Rolle** | Den tildelte rollen som bestemmer base tilgangsniva |
| **Status** | Gjeldende kontostatus: Aktiv eller Suspendert |
| **Handlinger** | Rediger- og Slett-handlingsknapper |

### Tabellfunksjoner

1. Tabellen er sorterbar ved a klikke pa kolonneoverskrifter.
2. En sokeboks over tabellen tillater filtrering etter navn eller e-post.
3. Pagineringskontroller vises nederst for store administratorteam.
4. Aktive kontoer viser et gront statusmerke; suspenderte kontoer viser et rodt merke.

---

## Roller

Hver administratorkonto tilordnes en av fire roller. Roller definerer grunnlinjenivat for tilgang for eventuelle detaljerte tillatelsesoverstyriger brukes.

### Rolledefinisjoner

| Rolle | Tilgangsniva | Beskrivelse |
|-------|-------------|-------------|
| **super_admin** | Full ubegrenset | Komplett tilgang til alle sider, funksjoner og systeminnstillinger. Kan ikke slettes eller fa tillatelser begrenset. |
| **admin** | Alt innhold og brukere | Full tilgang til innholdsadministrasjon, brukeradministrasjon, tilbakemeldinger, varsler og analyser. Kan ikke fa tilgang til innstillinger pa systemniva. |
| **moderator** | Gjennomga og moderere | Kan gjennomga og moderere innhold som tilbakemeldinger, rapporterte profiler og flaggede oppforinger. Kan ikke opprette eller slette ressurser. |
| **viewer** | Skrivebeskyttet | Kan se alle sider de har tilgang til, men kan ikke opprette, redigere eller slette noen poster. Ideelt for interessenter som trenger innsyn. |

### Rollehierarki

Rollehierarkiet bestemmer hvilke roller som kan administrere andre roller:

1. **super_admin** kan administrere alle andre roller (admin, moderator, viewer).
2. **admin** kan administrere moderator- og viewer-kontoer.
3. **moderator** kan ikke administrere noen administratorkontoer.
4. **viewer** kan ikke administrere noen administratorkontoer.

> **Viktig:** Du kan ikke tildele en rolle hoyere enn din egen. Kun en super_admin kan opprette en annen super_admin.

---

## Opprette en administrator

For a legge til en ny administratorkonto i portalen:

### Trinn

1. Klikk pa **Legg til admin**-knappen i ovre hjoyre hjorne av Administratorer-siden.
2. En opprettelsesskjemadialog vises med folgene felter:

| Felt | Beskrivelse | Krav |
|------|-------------|------|
| **E-post** | Innloggings-e-posten for den nye administratoren | Obligatorisk. Ma vaere en gyldig, unik e-postadresse. |
| **Visningsnavn** | Navnet som vises i portalens brukergrensesnitt | Obligatorisk. 2-50 tegn. |
| **Passord** | Det forste innloggingspassordet | Obligatorisk. Minimum 8 tegn, ma inkludere store bokstaver, sma bokstaver og et tall. |
| **Rolle** | Tilgangsrollen for denne administratoren | Obligatorisk. Velg fra rullegardinmenyen. |

3. Fyll inn **E-post**-feltet med den nye administratorens e-postadresse.
4. Skriv inn et **Visningsnavn** som vil identifisere denne administratoren i portalen.
5. Sett et forste **Passord** som oppfyller kompleksitetskravene.
6. Velg riktig **Rolle** fra rullegardinmenyen.
7. Klikk **Opprett** for a legge til administratorkontoen.
8. En suksessmelding bekrefter at kontoen ble opprettet.
9. Den nye administratoren vises i tabellen og kan na logge inn.

> **Tips:** Etter a ha opprettet en konto, informer den nye administratoren om legitimasjonen gjennom en sikker kanal. Anbefal at de endrer passordet ved forste innlogging.

---

## Redigere en administrator

Du kan endre en eksisterende administrators visningsnavn, rolle og status.

### Trinn

1. Finn administratoren i administratortabellen.
2. Klikk pa **Rediger**-knappen (blyantikon) i Handlinger-kolonnen.
3. En redigeringsskjemadialog vises med gjeldende verdier forhands utfylt.

### Redigerbare felter

| Felt | Beskrivelse | Merknader |
|------|-------------|-----------|
| **Visningsnavn** | Oppdater administratorens synlige navn | 2-50 tegn |
| **Rolle** | Endre administratorens tilgangsniva | Kan ikke tildele en rolle hoyere enn din egen |
| **Status** | Sett til Aktiv eller Suspendert | Suspenderte administratorer kan ikke logge inn |

4. Endre feltene etter behov.
5. Klikk **Lagre endringer** for a bruke oppdateringene.
6. En suksessmelding bekrefter at endringene ble lagret.

### Endre status

- **Aktiv** -- Administratoren kan logge inn og bruke portalen normalt.
- **Suspendert** -- Administratoren kan ikke logge inn. Eksisterende okter avsluttes umiddelbart.

> **Merk:** Suspendering av en administrator er reversibel. Bruk det nar du trenger a midlertidig tilbakekalle tilgang uten a slette kontoen.

### Begrensninger

- Du kan ikke redigere din egen rolle (for a forhindre utilsiktet selvdemotering).
- Du kan ikke endre en super_admins rolle med mindre du ogsa er en super_admin.
- E-post kan ikke endres etter kontoopprettelse.

---

## Detaljert per-side tillatelseskonfigurasjon

Utover roller stotter adminportalen finmasket tillatelseskontroll pa per-side-basis. Dette lar deg tilpasse noyaktig hvilke sider og handlinger hver administrator kan fa tilgang til.

### Tilgang til tillatelseskonfigurasjon

1. Klikk pa **Rediger**-knappen pa administratoren du vil konfigurere.
2. I redigeringsdialogen, naviger til **Tillatelser**-seksjonen (eller fanen).
3. En tillatelsesmatrise vises som viser alle portalsider.

### Tillatelsesmatrisestruktur

Tillatelsesmatrisen viser hver portalside som en rad med folgende kontroller:

| Kontroll | Beskrivelse |
|----------|-------------|
| **Tilgangsbryter** | En bryter som aktiverer eller deaktiverer tilgang til hele siden |
| **Handlings-flervalg** | En rullegardinmeny som lar deg velge hvilke spesifikke handlinger som er tillatt pa den siden |

### Tilgjengelige sider i matrisen

| Side | Mulige handlinger |
|------|-------------------|
| Dashboard | Vis |
| Brukere | Vis, Opprett, Rediger, Slett, Suspender |
| Kjaeledyr | Vis, Opprett, Rediger, Slett |
| Helsejournaler | Vis, Opprett, Rediger, Slett |
| Vaksinasjoner | Vis, Opprett, Rediger, Slett |
| Avl | Vis, Opprett, Rediger, Slett |
| Tilbakemeldinger | Vis, Svar, Lukk, Fest |
| Varsler | Vis, Send |
| Analyser | Vis, Eksporter |
| Innstillinger | Vis, Rediger |
| Administratorer | Vis, Opprett, Rediger, Slett |

### Konfigurere tillatelser

1. For hver siderad, veksle **Tilgang**-bryteren:
   - **PA** -- Administratoren kan fa tilgang til denne siden (spesifikke handlinger styres nedenfor).
   - **AV** -- Administratoren kan ikke se eller navigere til denne siden i det hele tatt.
2. For sider med tilgang aktivert, klikk pa **Handlinger**-flervalg-rullegardinmenyen.
3. Velg de spesifikke handlingene denne administratoren har lov til a utfore:
   - Kryss av for hver handling du vil gi.
   - Fjern avkrysning for handlinger du vil begrense.
4. Gjenta for hver side etter behov.
5. Klikk **Lagre endringer** for a bruke tillatelseskonfigurasjonen.

### Hvordan tillatelser samhandler med roller

- Rolletillatelser fungerer som **grunnlinjen**.
- Per-side-tillatelser kan **begrense** tilgang under rollens grunnlinje.
- Per-side-tillatelser **kan ikke gi** tilgang utover det rollen tillater.
- For eksempel: En bruker med admin-rolle har tilgang til alle innholdssider som standard. Du kan begrense tilgangen til Avl-siden ved a sla den av, men du kan ikke gi dem Innstillinger-tilgang (reservert for super_admin).

> **Tips:** Bruk detaljerte tillatelser nar du har teammedlemmer som trenger et spesifikt undersett av administratorfunksjoner. For eksempel kan en kundestoragent vaere en "admin"-rolle men begrenset til kun Tilbakemeldinger- og Brukere-sidene.

---

## Slette en administrator

Fjerning av en administratorkonto sletter den permanent fra systemet.

### Trinn

1. Finn administratoren i administratortabellen.
2. Klikk pa **Slett**-knappen (papirkurvikon) i Handlinger-kolonnen.
3. En bekreftelsesdialog vises med administratorens navn og e-post.
4. Skriv inn administratorens e-postadresse for a bekrefte sletting (sikkerhetstiltak).
5. Klikk **Bekreft sletting** for a permanent fjerne kontoen.
6. En suksessmelding bekrefter slettingen.
7. Administratoren fjernes fra tabellen og kan ikke lenger logge inn.

### Slettebegrensninger

| Begrensning | Arsak |
|-------------|-------|
| Kan ikke slette en super_admin | Forhindrer utilsiktet utestenging fra systemet |
| Kan ikke slette din egen konto | Forhindrer selvfjerning |
| Kan ikke slette hvis du mangler tilstrekkelig rolle | Rollehierarkiregler gjelder |

> **Advarsel:** Sletting er permanent og kan ikke angres. Hvis du trenger a midlertidig fjerne tilgang, bruk Suspendert-status i stedet.

---

## Forklaring av tillatelsesmatrisen

Tillatelsessystemet i Petfolioo bruker en lagdelt tilnaerming:

### Lag 1: Rollebasert tilgangskontroll (RBAC)

Hver rolle har et forhands definert sett med tillatelser som fungerer som utgangspunkt:

```
super_admin  -->  Alle sider, alle handlinger, ingen begrensninger
admin        -->  Alle innhold/bruker-sider, alle handlinger (unntatt Innstillinger)
moderator    -->  Innholdsgjennomgangssider, begrensede handlinger (vis, svar, lukk)
viewer       -->  Alle tilgjengelige sider, kun visning
```

### Lag 2: Per-side-overstyringer

Detaljerte tillatelser legger til et andre lag pa toppen av RBAC:

```
Rolletillatelser  (grunnlinje)
    |
    v
Per-side-brytere  (kan begrense, kan ikke utvide utover rolle)
    |
    v
Endelige effektive tillatelser  (det administratoren faktisk ser)
```

### Eksempelscenarier

**Scenario 1: Kundestoragent**
- Rolle: admin
- Overstyring: Deaktiver tilgang til Kjaeledyr, Helsejournaler, Avl, Analyser, Administratorer
- Resultat: Kan kun fa tilgang til Dashboard, Brukere, Tilbakemeldinger og Varsler

**Scenario 2: Innholdsgjennomgaer**
- Rolle: moderator
- Overstyring: Aktiver Tilbakemeldinger (Vis, Svar, Lukk), Brukere (kun Vis)
- Resultat: Kan gjennomga tilbakemeldinger og sla opp brukerprofiler, men kan ikke endre brukere

**Scenario 3: Analyseobservator**
- Rolle: viewer
- Overstyring: Aktiver kun Dashboard og Analyser
- Resultat: Kan se diagrammer og metrikker, men ingenting annet

### Se effektive tillatelser

1. Apne redigeringsdialogen for en administrator.
2. Tillatelser-seksjonen viser gjeldende effektiv tilstand.
3. Brytere og handlingsvalg reflekterer det som for oyeblikket er gitt.
4. Deaktiverte (gratet ut) handlinger indikerer de som er utenfor rollens tillatelse.

---

## Beste praksis for sikkerhet

1. **Prinsippet om minste privilegium** -- Tildel minimum rolle og tillatelser som trengs for hver administrators jobbfunksjon.
2. **Regelmessige revisjoner** -- Gjennomga administratorkontoer kvartalsvis. Fjern kontoer som ikke lenger trengs.
3. **Suspender for sletting** -- Ved offboarding, suspender forst for a sikre ingen forstyrrelser, slett deretter etter en frist.
4. **Begrens super_admins** -- Hold antallet super_admin-kontoer til et minimum (ideelt 1-2).
5. **Sterke passord** -- Handhev komplekse passord og anbefal passordbehandlere.
6. **Overvik aktivitet** -- Sjekk hvem som logger inn og nar gjennom systemloggene.

---

## Feilsoking

| Problem | Losning |
|---------|---------|
| Kan ikke opprette administrator | Verifiser at du har tilstrekkelige rolleprivilegier. Sjekk at e-posten ikke allerede er i bruk. |
| Kan ikke se Rediger/Slett-knapper | Rollen din har ikke tillatelse til a administrere administratorer pa eller over malets rolleniva. |
| Administrator kan ikke logge inn etter opprettelse | Verifiser at kontostatusen er Aktiv. Bekreft at passordet ble skrevet inn riktig. |
| Tillatelsesendringer trer ikke i kraft | Administratoren ma kanskje logge ut og logge inn igjen for at tillatelsesendringer skal gjelde. |
| Kan ikke slette en super_admin | Dette er ved design. Super_admin-kontoer kan ikke slettes gjennom brukergrensesnittet. |

---

## Relaterte sider

- [Innstillinger](./settings.md) -- Konfigurer systemsikkerhetsinnstillinger
- [Tilbakemeldinger](./feedback.md) -- Administrer brukertilbakemeldinger (krever tilgang til Tilbakemeldinger-siden)
- [Analyser](./analytics.md) -- Se plattformmetrikker (krever tilgang til Analyser-siden)
