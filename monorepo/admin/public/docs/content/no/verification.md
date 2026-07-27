# Oppdretter-verifisering

Modulen for oppdretter-verifisering lar administratorer gjennomgå, godkjenne, avvise og tilbakekalle verifiseringsforespørsler fra oppdrettere. Verifiserte oppdrettere mottar et tillitsmerke som er synlig for kjøpere, og som signaliserer at kennelen deres oppfyller plattformens standarder.

![Verification](/docs/screenshots/verification.png)

---

## Tabell over verifiseringsforespørsler

Hovedvisningen viser alle innsendte verifiseringer i en søkbar, sorterbar tabell.

| Kolonne | Beskrivelse |
|---------|-------------|
| Oppdretter-navn | Fullt navn på oppdretteren som sendte inn forespørselen |
| Kennel | Registrert kennelnavn knyttet til oppdretteren |
| Innsendingsnr. | Automatisk inkrementert innsendingsnummer (ny innsending får nytt nummer) |
| Dokumentantall | Antall opplastede dokumenter vedlagt innsendingen |
| Status | Gjeldende verifiseringsstatusbadge |
| Utløp | Verifiseringens utløpsdato (vises kun for godkjente innsendinger) |

### Filtrering av tabellen

1. Bruk **Status**-nedtrekksmenyen for å filtrere etter: Ventende, Godkjent, Avvist, Tilbakekalt eller Utløpt.
2. Bruk **Søk**-feltet for å finne en oppdretter etter navn eller kennel.
3. Klikk på en kolonneoverskrift for å sortere stigende eller synkende.

> **Tips:** Standardvisningen viser ventende innsendinger først, slik at du kan prioritere nye forespørsler.

---

## Statusarbeidsflyt

Verifiseringsforespørsler følger en definert livssyklus:

```
Ventende --> Godkjent --> Utløpt (automatisk, etter utløpsdato)
   |            |
   |            +--> Tilbakekalt (manuell admin-handling)
   |
   +--> Avvist (oppdretter kan sende inn på nytt)
```

### Statusdefinisjoner

| Status | Badge-farge | Betydning |
|--------|-------------|-----------|
| Ventende | Oransje | Avventer admin-gjennomgang |
| Godkjent | Grønn | Oppdretteren er verifisert og merket er aktivt |
| Avvist | Rød | Innsendingen oppfylte ikke kravene |
| Tilbakekalt | Mørkerød | Admin fjernet verifisert status manuelt |
| Utløpt | Grå | Verifiseringsperioden er avsluttet; oppdretteren må sende inn på nytt |

### Overganger

- **Ventende** kan gå over til **Godkjent** eller **Avvist**.
- **Godkjent** kan gå over til **Tilbakekalt** (manuell) eller **Utløpt** (automatisk).
- **Avvist** og **Utløpt** tillater oppdretteren å opprette en ny innsending (ny ventende oppføring).
- **Tilbakekalt** er en endelig status for den innsendingen.

---

## Gjennomgang av en innsending

For å gjennomgå en verifiseringsforespørsel fra en oppdretter:

1. Finn innsendingen i tabellen over verifiseringsforespørsler.
2. Klikk på raden eller **Gjennomgå**-knappen på høyre side.
3. **Innsendingsdetalj-modalen** åpnes med to faner:
   - **Gjeldende innsending** -- Viser de aktive dokumentene og oppdretter-detaljer.
   - **Innsendingshistorikk** -- Viser alle tidligere innsendinger fra denne oppdretteren.

### Fanen Gjeldende innsending

Denne fanen viser:

- Oppdretter-profilinformasjon (navn, e-post, telefon, kennel-registreringsnummer)
- Opplastede dokumenter i et rutenettoppsett
- Innsendingsdato og -tidspunkt
- Eventuelle notater oppdretteren inkluderte med innsendingen

### Fanen Innsendingshistorikk

Denne fanen viser en kronologisk liste over alle innsendinger fra samme oppdretter, inkludert:

- Innsendingsnummer
- Dato innsendt
- Endelig status
- Navn på gjennomgåer
- Avvisningsgrunn (hvis aktuelt)

> **Tips:** Bruk fanen Innsendingshistorikk for å sjekke om en oppdretter har adressert tidligere avvisningsgrunner før du godkjenner en ny innsending.

---

## Forhåndsvisning av dokumenter

Hvert opplastet dokument vises som et miniatyrbilde i dokumentrutenettet.

1. Klikk på et dokumentminiatyrbilde for å åpne en forhåndsvisning i full størrelse.
2. Bruk zoomkontrollene for å inspisere dokumentdetaljer.
3. Naviger mellom dokumenter med venstre/høyre-pilene i forhåndsvisningsoverlegget.
4. Trykk **Escape** eller klikk lukk-knappen for å gå tilbake til detalj-modalen.

Støttede dokumentformater inkluderer:

- JPEG- og PNG-bilder
- PDF-dokumenter (gjengitt som sidebilder)

> **Tips:** Se etter klarhet, autentisitet og fullstendighet når du gjennomgår opplastede dokumenter. Uskarpe eller ufullstendige dokumenter bør avvises med tydelige instruksjoner for ny innsending.

---

## Godkjenning av en innsending

For å godkjenne en verifiseringsforespørsel fra en oppdretter:

1. Åpne innsendingsdetalj-modalen ved å klikke på raden i tabellen.
2. Gjennomgå alle opplastede dokumenter nøye.
3. Klikk **Godkjenn**-knappen nederst i modalen.
4. I bekreftelsesdialogen:
   - Angi **utløpsdatoen** for verifiseringen. Standard er 1 år fra i dag.
   - Juster eventuelt datoen hvis en kortere eller lengre periode er passende.
5. Klikk **Bekreft godkjenning**.

### Hva skjer etter godkjenning

- Oppdretter-profilen mottar verifiseringsmerket umiddelbart.
- Oppdretteren varsles via e-post og varsel i appen.
- Innsendingsstatusen endres til **Godkjent** i tabellen.
- Utløpsdatoen vises i Utløp-kolonnen.
- Når utløpsdatoen passeres, endres statusen automatisk til **Utløpt**.

> **Tips:** For nye oppdrettere med begrenset dokumentasjon, vurder å sette et kortere utløp (6 måneder) for å oppfordre til en tidligere re-verifisering.

---

## Avvisning av en innsending

For å avvise en verifiseringsforespørsel fra en oppdretter:

1. Åpne innsendingsdetalj-modalen.
2. Gjennomgå dokumentene og identifiser problemet/problemene.
3. Klikk **Avvis**-knappen nederst i modalen.
4. I avvisningsdialogen:
   - Skriv inn en **avvisningsgrunn** i tekstfeltet. Dette feltet er obligatorisk.
   - Vær spesifikk om hva som mangler eller er utilstrekkelig.
5. Klikk **Bekreft avvisning**.

### Hva skjer etter avvisning

- Innsendingsstatusen endres til **Avvist**.
- Avvisningsgrunnen er synlig for oppdretteren i deres kontrollpanel.
- Oppdretteren mottar et varsel som forklarer avvisningen.
- Oppdretteren kan opprette en ny innsending for å adressere problemene.

### Skriv gode avvisningsgrunner

| Gjør | Ikke gjør |
|------|-----------|
| "Kennel-registreringsdokument er utløpt (2019). Vennligst last opp en gjeldende registrering." | "Dokumenter er ikke gode nok." |
| "Bilde av fasiliteten er for uskarpt til å verifisere forholdene. Vennligst send inn på nytt med tydeligere bilder." | "Dårlige bilder." |
| "Mangler vaksinasjonsjournal for avlsdyr." | "Ufullstendig." |

> **Tips:** Tydelige avvisningsgrunner reduserer frem-og-tilbake-kommunikasjon og hjelper oppdrettere med å sende inn fullstendige søknader ved neste forsøk.

---

## Tilbakekalling av verifisering

Tilbakekalling fjerner umiddelbart en oppdretters verifiserte status. Bruk dette ved regelbrudd eller svindel med dokumentasjon oppdaget etter godkjenning.

1. Naviger til tabellen over verifiseringsforespørsler.
2. Filtrer etter **Status: Godkjent** for å finne aktive verifiseringer.
3. Klikk på raden for å åpne innsendingsdetaljene.
4. Klikk **Tilbakekall**-knappen (vises kun for godkjente innsendinger).
5. I tilbakekallingssdialogen:
   - Skriv inn **grunn for tilbakekalling**. Dette er obligatorisk.
   - Bekreft at du forstår at handlingen er umiddelbar.
6. Klikk **Bekreft tilbakekalling**.

### Hva skjer etter tilbakekalling

- Verifiseringsmerket fjernes fra oppdretter-profilen umiddelbart.
- Oppdretteren varsles via e-post med tilbakekallingsgrunnen.
- Alle aktive annonser fra oppdretteren viser en advarselsindikator.
- Innsendingsstatusen endres til **Tilbakekalt** (endelig status).
- Oppdretteren kan ikke sende inn på nytt mot den samme innsendingen; de må starte på nytt.

> **Tips:** Tilbakekalling er en alvorlig handling. Dokumenter grunnen grundig i tilfelle tvister. Vurder å kontakte oppdretteren før tilbakekalling hvis problemet er mindre alvorlig.

---

## Tidslinjevisning

Tidslinjevisningen gir en visuell historikk over en oppdretters verifiseringsreise.

1. Åpne en hvilken som helst innsendingsdetalj-modal.
2. Bytt til fanen **Innsendingshistorikk**.
3. Tidslinjen viser hendelser i kronologisk rekkefølge:
   - Innsending opprettet
   - Dokumenter lastet opp
   - Admin-gjennomgang startet
   - Status endret (med gjennomgåers navn)
   - Utløpsvarsler sendt
   - Nye innsendinger lenket

### Lese tidslinjen

Hver tidslinjeoppføring viser:

- **Dato og tidspunkt** for hendelsen
- **Hendelsestype**-ikon (dokument, statusendring, varsel)
- **Aktør** (oppdretter-navn eller admin-navn)
- **Detaljer** (grunntekst, dokumentnavn, utløpsdato satt)

### Bruksområder for tidslinjen

- **Tvisteløsning:** Se full historikk når en oppdretter bestrider en avvisning.
- **Revisjonsspor:** Spor hvilken admin som gjennomgikk og godkjente/avviste hver innsending.
- **Mønstergjenkjenning:** Identifiser oppdrettere som gjentatte ganger sender inn utilstrekkelig dokumentasjon.

> **Tips:** Tidslinjen er skrivebeskyttet. Alle handlinger (godkjenn, avvis, tilbakekall) må utføres fra fanen Gjeldende innsending.

---

## Tastatursnarveier

| Snarvei | Handling |
|---------|----------|
| Enter | Åpne valgt innsending |
| Escape | Lukk modal |
| Tab | Bytt mellom modal-faner |
| Piltaster | Naviger mellom dokumenter i forhåndsvisning |

---

## Ofte stilte spørsmål

**Sp: Kan jeg godkjenne en innsending med vilkår?**
Sv: Nei. Godkjenninger er uten vilkår. Hvis dokumenter er delvis akseptable, avvis med spesifikke instruksjoner om hva som må rettes, og godkjenn deretter den nye innsendingen.

**Sp: Hva skjer med en oppdretters annonser når verifiseringen utløper?**
Sv: Annonsene forblir aktive, men verifiseringsmerket fjernes. Oppdretteren varsles 30 dager før utløp for å oppfordre til ny innsending.

**Sp: Kan en tilbakekalt oppdretter søke på nytt?**
Sv: Ja, men de må opprette en helt ny innsending. Den tidligere tilbakekalte innsendingen forblir i historikken for revisjonsformål.

**Sp: Hvem kan utføre verifiseringshandlinger?**
Sv: Kun administratorer med rollen Verifiseringsansvarlig kan godkjenne, avvise eller tilbakekalle innsendinger.
