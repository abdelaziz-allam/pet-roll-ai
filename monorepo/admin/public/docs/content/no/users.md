# App-brukere

App-brukermodulen gir fullstendig administrasjon av alle brukerkontoer pa Petfolioo-plattformen. Administratorer kan se brukerprofiler, opprette nye kontoer, redigere detaljer, tildele roller og utfore modereringshandlinger. Denne modulen er tilgjengelig for brukere med `super_admin`- eller `admin`-roller.

![App Users](/docs/screenshots/users.png)

---

## Brukerlistetabell

Brukerlistetabellen viser alle registrerte plattformbrukere med viktig informasjon synlig med et overblikk.

### Tabellkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Avatar | Brukerens profilbilde (sirkulart miniatyrbilde) | Nei |
| Navn | Visningsnavn | Ja |
| E-post | Registrert e-postadresse | Ja |
| Rolle | Tildelt plattformrolle (bruker, moderator, admin) | Ja |
| Status | Kontostatus (Aktiv, Ventende, Utestengt) | Ja |
| Verifisert oppdretter | Merke som indikerer verifisert oppdretterstatus | Ja |
| Antall dyr | Antall dyr registrert av denne brukeren | Ja |
| Registreringsdato | Dato for kontoopprettelse | Ja |

### Statusindikatorer

| Status | Merkefarfe | Betydning |
|--------|------------|-----------|
| Aktiv | Gronn | Kontoen er fullt funksjonell |
| Ventende | Oransje | E-postverifisering er ikke fullfort |
| Utestengt | Rod | Kontoen er suspendert av en administrator |

### Verifisert oppdretter-merke

| Indikator | Betydning |
|-----------|-----------|
| Blatt hakemerke | Brukeren har fullfort oppdrretterverifisering og er bekreftet |
| Inget merke | Brukeren har ikke sokt om eller mottatt oppdrretterverifisering |
| Klokkeikon | Soknad om oppdrretterverifisering venter pa gjennomgang |

### Tabellnavigasjon

1. **Sorter** ved a klikke pa en sorterbar kolonneoverskrift. Klikk igjen for a reversere rekkfolgen.
2. **Sok** ved a bruke sokefeltet over tabellen for a finne brukere etter navn eller e-post.
3. **Filtrer** ved a bruke status- og rollerullegardinmenyene for a begrense resultatene.
4. **Paginer** ved hjelp av kontrollene nederst (10, 20, 50 oppforinger per side).

> **Tips:** Kombiner sokefeltet med statusfiltre for raskt a finne spesifikke brukere. For eksempel, sok "john" med status "Utestengt" for a finne utestengte brukere med navnet John.

---

## Vise brukerdetaljer

Brukerdetaljpanelet gir en omfattende visning av en brukers profil og aktivitet.

### Apne detaljpanelet

1. Klikk pa en hvilken som helst rad i brukerlistetabellen.
2. Detaljpanelet glir inn fra hoyre side av skjermen.
3. Panelet inneholder flere seksjoner organisert vertikalt.

### Detaljpanelseksjoner

| Seksjon | Innhold |
|---------|---------|
| Profiloverskrift | Stor avatar, visningsnavn, e-post, rollemerke, statusmerke |
| Kontoinformasjon | Registreringsdato, siste innlogging, e-postverifiseringsstatus, autentiseringsleverandor |
| Personlige detaljer | Telefonnummer, tidssone, land, by |
| Oppdretterstatus | Verifiseringsstatus, soknadsdato, innsendte dokumenter |
| Dyreoversikt | Antall registrerte dyr med hurtiglenker til hvert |
| Aktivitetslogg | Nylige handlinger utfort av denne brukeren pa plattformen |

### Profiloverskrift

Toppen av panelet viser:

- **Avatar** i full storrelse (eller standard silhuett hvis ingen er lastet opp)
- **Visningsnavn** i stor tekst
- **E-post** under navnet
- **Rollemerke** fargekodet etter tilgangsniva
- **Statusmerke** som viser gjeldende kontostatus

### Kontoinformasjonsfelt

| Felt | Beskrivelse | Eksempel |
|------|-------------|---------|
| Bruker-ID | Unik systemidentifikator | "usr_a1b2c3d4" |
| Registreringsdato | Nar kontoen ble opprettet | "2023-01-15 09:30 UTC" |
| Siste innlogging | Nyligste innloggingstidspunkt | "2024-07-20 14:22 UTC" |
| E-post verifisert | Om e-posten er bekreftet | "Ja" / "Nei" |
| Autentiseringsleverandor | Autentiseringsmetode brukt | "E-post/Passord" eller "Google" |
| Firebase UID | Firebase Authentication bruker-ID | "Abc123Def456" |

---

## Opprette en ny bruker

Administratorer kan opprette brukerkontoer direkte fra administrasjonsportalen. Siden plattformen bruker Firebase Authentication, settes det ikke noe passord under opprettelsen - brukere vil motta en e-post for a sette sitt eget passord.

### Fremgangsmate for a opprette en bruker

1. Klikk pa **Opprett bruker**-knappen oppe til hoyre pa Brukersiden.
2. Et opprettelsesskjema vises.
3. Fyll inn de pakrevde feltene:

| Felt | Pakrevd | Beskrivelse |
|------|:-------:|-------------|
| Visningsnavn | Ja | Brukerens fulle navn eller valgte visningsnavn |
| E-post | Ja | En gyldig e-postadresse (ma vare unik pa plattformen) |

4. Klikk **Opprett** for a sende inn skjemaet.
5. Systemet vil:
   - Opprette en Firebase Authentication-post
   - Sende en velkomst-e-post til brukeren med en lenke for a sette passordet
   - Opprette brukerprofilen i plattformdatabasen
   - Tildele standardrollen "bruker"
6. Den nye brukeren vises i listetabellen med "Ventende" status til de verifiserer e-posten sin.

### Valideringsregler

| Felt | Regel |
|------|-------|
| Visningsnavn | 2-100 tegn, kan ikke vare tomt |
| E-post | Ma vare gyldig e-postformat, ma ikke allerede eksistere i systemet |

> **Merk:** Ingen passordfelt er nodvendig. Firebase Authentication handterer passordoppsett via velkomst-e-posten som sendes til brukeren. Dette sikrer at brukeren velger sitt eget sikre passord.

> **Tips:** Hvis du trenger a opprette en bruker som skal ha utvidede rettigheter, opprett dem forst med standardinnstillinger, og endre deretter rollen separat (se Endre rolle nedenfor).

---

## Redigere en bruker

Administratorer kan endre brukerprofildetaljer ved behov. Dette brukes vanligvis for a korrigere informasjon eller oppdatere detaljer pa vegne av en bruker.

### Fremgangsmate for a redigere en bruker

1. Apne brukerens detaljpanel ved a klikke pa raden deres i listetabellen.
2. Klikk pa **Rediger**-knappen (blyanntikon) i panelhodet.
3. Panelet bytter til redigeringsmodus med redigerbare skjemafelt.
4. Endre et av de tilgjengelige feltene:

| Felt | Redigerbart | Merknader |
|------|:-----------:|-----------|
| Visningsnavn | Ja | Brukerens offentlige navn |
| Telefon | Ja | Internasjonalt format anbefalt (f.eks. +971501234567) |
| Tidssone | Ja | Rullegardinmeny med IANA-tidssoner (f.eks. Asia/Dubai) |
| Land | Ja | Rullegardinmeny med alle land |
| By | Ja | Tekstfelt, oppdaterer forslag basert pa land |
| E-post | Nei | Kan ikke endres (brukes som innloggingsidentifikator) |
| Bruker-ID | Nei | Systemgenerert, uforanderlig |

5. Klikk **Lagre endringer** for a bruke redigeringene dine.
6. Et suksessvarsel bekrefter oppdateringen.
7. Panelet gar tilbake til visningsmodus og viser den oppdaterte informasjonen.

### Redigeringshistorikk

Alle redigeringer gjort gjennom administrasjonsportalen logges:

| Loggfelt | Beskrivelse |
|----------|-------------|
| Tidspunkt | Nar endringen ble gjort |
| Administrator | Hvilken administrator som gjorde endringen |
| Felt endret | Hvilket felt som ble endret |
| Gammel verdi | Den tidligere verdien |
| Ny verdi | Den oppdaterte verdien |

> **Viktig:** Redigeringer av brukerprofiler er synlige for brukeren. De vil se den oppdaterte informasjonen i appen sin. Vurder a varsle brukeren hvis du gjor endringer pa deres vegne.

---

## Endre rolle

Rolleendringer bestemmer hvilket tilgangsniva en bruker har innenfor plattformen og dens apper.

### Tilgjengelige roller

| Rolle | Beskrivelse | Muligheter |
|-------|-------------|------------|
| user | Standard plattformbruker | Kan administrere egne dyr, delta i avlsprogrammer, se oppforinger |
| moderator | Fellesskapsmoderator | Alle brukermuligheter pluss muligheten til a gjennomga og flagge innhold |
| admin | Plattformadministrator | Alle moderatormuligheter pluss tilgang til administrasjonsportalen |

### Fremgangsmate for a endre en brukers rolle

1. Apne brukerens detaljpanel ved a klikke pa raden deres.
2. Finn **Rolle**-seksjonen i panelet.
3. Klikk pa **Endre rolle**-knappen (eller det gjeldende rollemerket).
4. Et rollevalgvindu vises med:
   - Radioknapper for hver tilgjengelige rolle
   - Beskrivelsestekst som forklarer hver rolles tillatelser
   - En bekreftelsesavkrysningsboks som bekrefter endringen
5. Velg den nye rollen.
6. Les rollebeskrivelsen for a bekrefte at den er passende.
7. Kryss av **bekreftelsesavkrysningsboksen** ("Jeg forstar at dette vil endre brukerens tilgangsniva").
8. Klikk **Bekreft rolleendring**.
9. Brukerens rolle oppdateres umiddelbart.

### Begrensninger for rolleendring

| Din rolle | Kan tildele |
|-----------|-------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Kan ikke endre roller |
| viewer | Kan ikke endre roller |

> **Viktig:** A forfremme en bruker til "admin" gir dem tilgang til administrasjonsportalen. Gjor dette kun for betrodde teammedlemmer som trenger administrativ tilgang.

> **Merk:** A endre en bruker fra "admin" til "user" tilbakekaller umiddelbart deres tilgang til administrasjonsportalen. Hvis de for oyeblikket er logget inn pa portalen, vil sesjonen deres avsluttes ved neste sidenavigering.

---

## Utestenge/oppheve utestengelse av bruker

A utestenge en bruker suspenderer kontoen deres, og hindrer dem fra a logge inn pa appen eller fa tilgang til plattformfunksjoner.

### Utestenge en bruker

1. Apne brukerens detaljpanel.
2. Rull til **Handlinger**-seksjonen nederst i panelet.
3. Klikk pa **Utesteng bruker**-knappen (vist i rodt).
4. Et bekreftelsesvindu vises med:
   - Brukerens navn og e-post for bekreftelse
   - Et **Arsak**-tekstfelt (pakrevd)
   - En **Varighet**-velger (permanent, 7 dager, 30 dager, 90 dager)
5. Skriv inn en tydelig, profesjonell arsak for utestengelsen.
6. Velg varigheten for utestengelsen.
7. Klikk **Bekreft utestengelse**.

### Effekter av utestengelse

| Effekt | Beskrivelse |
|--------|-------------|
| Innlogging blokkert | Brukeren kan ikke logge inn pa mobilappen |
| Profil skjult | Brukerens profil er ikke synlig for andre brukere |
| Dyr fjernet fra lister | Alle dyr eid av denne brukeren skjules fra oppforinger |
| Varsler | Brukeren mottar en e-post som forklarer utestengelsen med oppgitt arsak |
| Aktive sesjoner | Alle gjeldende sesjoner avsluttes umiddelbart |

### Retningslinjer for arsak til utestengelse

| Retningslinje | Eksempel |
|---------------|---------|
| Var spesifikk | "Flere uredelige avlsoppforinger rapportert og bekreftet" |
| Referer til retningslinjer | "Brudd pa vilkar for bruk seksjon 4.2 angaende autentiske oppforinger" |
| Unnga vagt sprak | IKKE skriv "darlig oppforsel" - var spesifikk om hva som skjedde |
| Hold det profesjonelt | Arsaken sendes direkte til brukeren |

> **Viktig:** Arsaken for utestengelse kommuniseres til brukeren via e-post og appvarsel. Den ma vare faktabasert, spesifikk og profesjonell.

### Oppheve utestengelse av en bruker

1. Bruk **Status**-filteret og velg "Utestengt" for a finne utestengte brukere.
2. Klikk pa den utestengte brukerens rad for a apne detaljpanelet.
3. Panelet viser et **Utestengelsesinformasjon**-kort med:
   - Utestengelsesdato
   - Utestengende administrator
   - Arsak for utestengelse
   - Utestengelsesvarighet / utlop
4. Klikk pa **Opphev utestengelse**-knappen (vist i gront).
5. Et bekreftelsesvindu vises.
6. Legg eventuelt inn et notat som forklarer hvorfor utestengelsen oppheves.
7. Klikk **Bekreft oppheving**.
8. Brukerens status gar tilbake til "Aktiv" og de far full plattformtilgang igjen.
9. Brukeren mottar et varsel om at kontoen deres er gjenopprettet.

### Utestengelseshistorikk

Hver utestengelse og oppheving registreres i brukerens historikk:

| Felt | Beskrivelse |
|------|-------------|
| Utestengelsesdato | Nar utestengelsen ble iverksatt |
| Opphevelsesdato | Nar utestengelsen ble opphevet (hvis aktuelt) |
| Administrator | Hvilken administrator som utforte handlingen |
| Arsak | Den oppgitte arsaken for utestengelse |
| Varighet | Hvor lenge utestengelsen var satt til a vare |
| Losning | Hvordan den ble avsluttet (manuell oppheving, utlop, anke) |

---

## Soke og filtrere brukere

### Sokefelt

Sokefeltet overst pa Brukersiden stotter:

| Soketype | Eksempel | Treff |
|----------|---------|-------|
| Navnesok | "Sarah" | Alle brukere med "Sarah" i visningsnavnet |
| E-postsok | "gmail.com" | Alle brukere med Gmail-adresser |
| Delvise treff | "pet" | Brukere med navn som "Peter", "Petrov" osv. |

### Filterrullegardinmenyer

| Filter | Alternativer |
|--------|--------------|
| Rolle | Alle, Bruker, Moderator, Admin |
| Status | Alle, Aktiv, Ventende, Utestengt |
| Verifisert oppdretter | Alle, Verifisert, Ikke verifisert, Ventende |

### Kombinere sok og filtre

1. Skriv inn tekst i sokefeltet OG velg filterverdier samtidig.
2. Resultater ma matche ALLE kriterier (OG-logikk).
3. Fjern individuelle filtre ved a klikke pa X-knappen deres, eller fjern alle med **Tilbakestill**-knappen.

---

## Eksportere brukerdata

For a eksportere brukerdata for rapportering eller analyse:

1. Bruk onskede filtre.
2. Klikk pa **Eksporter**-knappen oppe til hoyre.
3. Velg format: **CSV** eller **Excel**.
4. Velg omfang: **Gjeldende filtrert visning** eller **Alle brukere**.
5. Nedlastingen starter automatisk.

### Eksporterte felt

| Felt | Inkludert | Merknader |
|------|:---------:|-----------|
| Visningsnavn | Ja | |
| E-post | Ja | |
| Rolle | Ja | |
| Status | Ja | |
| Land | Ja | |
| By | Ja | |
| Antall dyr | Ja | |
| Registreringsdato | Ja | |
| Siste innlogging | Ja | |
| Telefon | Nei | Ekskludert av personvernhensyn |

> **Merk:** Telefonnumre og detaljert personlig informasjon er ekskludert fra eksporter som standard for a overholde krav til databeskyttelse.

---

*Forrige: [Dyreregister](./pets.md) | Neste: [Dyrekategorier](./categories.md)*
