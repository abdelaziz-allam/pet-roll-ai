# Helsesertifikater

Modulen Helsesertifikater lar administratorer håndtere og verifisere helsesertifikater for kjæledyr innsendt av veterinærer eller dyreeiere. Dette sikrer at dyr oppført på plattformen har gyldig og oppdatert helsedokumentasjon.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Sertifikattabell

Hovedvisningen viser alle innsendte helsesertifikater i en datatabell.

| Kolonne | Beskrivelse |
|---------|-------------|
| Dyrenavn | Navnet på dyret sertifikatet tilhører |
| Vet.info | Veterinærnavn og klinikk |
| Sted | Land og by der sertifikatet ble utstedt |
| Sertifikatdato | Dato sertifikatet ble utstedt av veterinæren |
| Dokumenter | Antall vedlagte sertifikatdokumenter |
| Status | Gjeldende sertifikatstatusbadge |

### Tabellhandlinger

- Klikk på en rad for å åpne **detaljpanelet** på høyre side.
- Bruk handlingsknappene i siste kolonne for rask godkjenning/avvisning.
- Sorter etter en kolonne ved å klikke på kolonneoverskriften.

---

## Filtre

Filterlinjen over tabellen har fire filtreringsalternativer:

### Statusfilter

Filtrer sertifikater etter gjeldende status:

| Status | Badge-farge | Beskrivelse |
|--------|-------------|-------------|
| Ventende | Oransje | Avventer admin-gjennomgang |
| Godkjent | Grønn | Sertifikat verifisert og aktivt |
| Avvist | Rød | Sertifikatet bestod ikke gjennomgangen |
| Tilbakekalt | Mørkerød | Tidligere godkjent sertifikat ugyldiggjort |
| Utløpt | Grå | Sertifikatets gyldighetsperiode er avsluttet |

### Artsfilter

Filtrer etter dyreart:

- Hund
- Katt
- Fugl
- Kanin
- Annet

### Landsfilter

Velg ett eller flere land å filtrere etter stedet der sertifikatet ble utstedt.

### Byfilter

Begrens ytterligere ved å velge spesifikke byer innenfor det valgte landet.

> **Tips:** Filtre kan kombineres. For eksempel, filtrer etter Status: Ventende + Art: Hund + Land: Tyskland for å se alle ventende hundesertifikater fra Tyskland.

---

## Detaljpanel

Klikking på en sertifikatrad åpner et detaljpanel på høyre side av skjermen. Panelet inneholder omfattende informasjon organisert i seksjoner.

### Statusbanner

Øverst i panelet viser et farget banner:

- Gjeldende status med badge-ikon
- Dato for siste statusendring
- Navn på adminen som sist behandlet sertifikatet (hvis aktuelt)
- Avvisnings- eller tilbakekallingrsgrunn (hvis aktuelt, vist i en advarselsmelding)

### Seksjon for dyreinformasjon

| Felt | Beskrivelse |
|------|-------------|
| Dyrenavn | Registrert navn på dyret |
| Art | Dyrets art |
| Rase | Dyrets rase |
| Fødselsdato | Dyrets fødselsdato |
| Mikrochip-ID | Unik mikrochip-identifikator (hvis tilgjengelig) |
| Eier | Navn på dyrets eier med lenke til profilen deres |

### Seksjon for veterinærdetaljer

| Felt | Beskrivelse |
|------|-------------|
| Veterinærnavn | Fullt navn på den utstedende veterinæren |
| Klinikknavn | Navn på veterinærklinikken |
| Klinikkadresse | Full adresse til klinikken |
| Lisens-nummer | Veterinærens profesjonelle lisensnummer |
| Telefon | Klinikkens kontakttelefon |
| E-post | Klinikkens kontakt-e-post (hvis oppgitt) |

> **Tips:** Verifiser lisensnummeret mot landets veterinærlisensdatabase når du gjennomgår sertifikater fra ukjente klinikker.

### Gyldighetsfremdriftslinje

Under veterinærdetaljene visualiserer en fremdriftslinje sertifikatets gyldighetsperiode:

1. Linjen strekker seg fra **sertifikatdato** (start) til **utløpsdato** (slutt).
2. Gjeldende dato er indikert med en markør på linjen.
3. Fargekoding:
   - **Grønn:** Mer enn 30 dager gjenstår
   - **Gul:** 30 dager eller færre gjenstår
   - **Rød:** Utløpt
4. Prosentandel av gyldigheten som er brukt vises som tekst.

### Dokumentrutenett

Dokumentseksjonen viser opplastede sertifikatfiler i et rutenettoppsett.

1. Hvert dokument vises som et miniatyrbildekort med filnavnet under.
2. Klikk på et miniatyrbilde for å åpne **bildeforhåndsvisnings**-overlegget.
3. I forhåndsvisningsoverlegget:
   - Bruk zoom inn/ut-kontrollene for å inspisere detaljer.
   - Naviger mellom dokumenter med venstre/høyre-pilene.
   - Last ned originalfilen med nedlastingsknappen.
   - Trykk **Escape** for å lukke forhåndsvisningen.
4. Støttede formater: JPEG, PNG, PDF.

> **Tips:** Se etter offisielle veterinærstempler, signaturer og lisensnumre på sertifikatdokumenter. Generiske dokumenter eller maler uten disse elementene bør flagges for avvisning.

---

## Godkjenning av et sertifikat

For å godkjenne et helsesertifikat:

1. Åpne sertifikatets detaljpanel ved å klikke på raden.
2. Gjennomgå veterinærdetaljene for fullstendighet og troverdighet.
3. Inspiser alle opplastede dokumenter i dokumentrutenettet.
4. Klikk **Godkjenn**-knappen nederst i panelet.
5. I bekreftelsesdialogen:
   - Se over sammendraget av hva du godkjenner.
   - Utløpsdatoen beregnes automatisk basert på sertifikattype.
   - Klikk **Bekreft**.

### Sjekkliste for godkjenning

Før godkjenning, verifiser:

- [ ] Veterinærnavn og lisensnummer er til stede
- [ ] Klinikkdetaljer er fullstendige og verifiserbare
- [ ] Dokumenter er lesbare og inneholder offisielle stempler/signaturer
- [ ] Sertifikatdatoen er nylig (innen de siste 12 månedene)
- [ ] Dyreinformasjonen på dokumentet samsvarer med plattformoppføringen
- [ ] Ingen tegn på dokumentforfalskning eller svindel

### Hva skjer etter godkjenning

- Sertifikatstatusen endres til **Godkjent**.
- En gyldighetsperiode settes basert på sertifikattypen.
- Dyrets profil viser et helsesertifikatmerke.
- Eieren mottar et varsel som bekrefter godkjenningen.
- Gyldighetsfremdriftslinjen blir aktiv i detaljpanelet.

---

## Avvisning av et sertifikat

For å avvise et helsesertifikat:

1. Åpne sertifikatets detaljpanel.
2. Identifiser problemet/problemene med innsendingen.
3. Klikk **Avvis**-knappen nederst i panelet.
4. I avvisningsdialogen:
   - Skriv inn en **avvisningsgrunn** i tekstfeltet. Dette feltet er obligatorisk.
   - Vær spesifikk om hva som må rettes.
5. Klikk **Bekreft avvisning**.

### Vanlige avvisningsgrunner

| Grunn | Eksempelmelding |
|-------|-----------------|
| Uleselige dokumenter | "Det opplastede dokumentet er for uskarpt til å lese. Vennligst last opp en tydeligere skanning eller et tydeligere bilde." |
| Manglende vet.detaljer | "Sertifikatet inkluderer ikke veterinærens lisensnummer. Vennligst send inn på nytt med fullstendige veterinærdetaljer." |
| Utløpt sertifikat | "Dette sertifikatet ble utstedt for mer enn 12 måneder siden. Vennligst skaff og last opp et gjeldende sertifikat." |
| Uoverensstemmende dyreinformasjon | "Dyrenavnet på sertifikatet samsvarer ikke med det registrerte dyrenavnet. Vennligst verifiser og send inn på nytt." |
| Ufullstendige dokumenter | "Kun side 1 av 3 ble lastet opp. Vennligst last opp alle sidene av sertifikatet." |

### Hva skjer etter avvisning

- Sertifikatstatusen endres til **Avvist**.
- Avvisningsgrunnen vises for dyreeieren.
- Eieren mottar et varsel med grunnen.
- Eieren kan sende inn et nytt sertifikat for å erstatte det avviste.

> **Tips:** Gi alltid handlingsbar tilbakemelding. Fortell eieren nøyaktig hva som må rettes, slik at de kan korrigere problemet ved en ny innsending.

---

## Tilbakekalling av et sertifikat

Tilbakekalling brukes når et tidligere godkjent sertifikat viser seg å være ugyldig, svindelaktig eller ikke lenger gjeldende.

1. Naviger til sertifikatet (filtrer etter Status: Godkjent ved behov).
2. Åpne detaljpanelet.
3. Klikk **Tilbakekall**-knappen (kun synlig for godkjente sertifikater).
4. I tilbakekallingsdialogen:
   - Skriv inn **grunn for tilbakekalling**. Dette feltet er obligatorisk.
   - Bekreft at denne handlingen er umiddelbar og ikke kan angres.
5. Klikk **Bekreft tilbakekalling**.

### Når du bør tilbakekalle

- Svindel med dokumentasjon oppdaget etter godkjenning
- Veterinærlisens funnet å være ugyldig eller tilbakekalt
- Dyreeier rapporterer at sertifikatet ble sendt inn ved en feil
- Reguleringsmyndighet flagger sertifikatet

### Hva skjer etter tilbakekalling

- Helsesertifikatmerket fjernes umiddelbart fra dyrets profil.
- Sertifikatstatusen endres til **Tilbakekalt**.
- Tilbakekallingsgrunnen lagres og er synlig i detaljpanelet.
- Eieren varsles via e-post og varsel i appen.
- Eieren må sende inn et nytt sertifikat hvis de ønsker å gjenopprette merket.

> **Tips:** Tilbakekalling er en alvorlig handling som påvirker dyrets tillitssignaler på plattformen. Sørg for at du har tilstrekkelig bevis før du fortsetter.

---

## Forstå gyldighet og utløp

Helsesertifikater har en definert gyldighetsperiode som bestemmer hvor lenge sertifikatet forblir aktivt etter godkjenning.

### Hvordan gyldighet fungerer

1. Når et sertifikat godkjennes, beregner systemet en utløpsdato.
2. Gyldighetsperioden avhenger av sertifikattypen:
   - Generelt helsesertifikat: 12 måneder
   - Vaksinasjonssertifikat: Varierer etter vaksinasjonsplan
   - Avlsdyktighetssertifikat: 6 måneder
3. **Gyldighetsfremdriftslinjen** i detaljpanelet viser gjenværende tid visuelt.

### Utløpsvarsler

Systemet sender automatiske varsler når utløp nærmer seg:

| Dager før utløp | Varsel |
|-----------------|--------|
| 30 dager | Første påminnelse til eier om fornyelse |
| 14 dager | Andre påminnelse med hastegrad |
| 7 dager | Siste advarsel |
| 0 dager | Varsel om utløpt sertifikat |

### Etter utløp

- Sertifikatstatusen endres automatisk til **Utløpt**.
- Helsemerket fjernes fra dyrets profil.
- Det utløpte sertifikatet forblir i historikken som referanse.
- Eieren kan sende inn et nytt sertifikat når som helst.

> **Tips:** Overvåk sertifikattabellen filtrert etter "Godkjent" og sortert etter utløpsdato for proaktivt å identifisere sertifikater som nærmer seg utløp i din region.

---

## Massehandlinger

For effektiv behandling av flere sertifikater:

1. Bruk avkrysningsboksene på venstre side av tabellen for å velge flere rader.
2. Massehandlingslinjen vises øverst i tabellen.
3. Tilgjengelige massehandlinger:
   - **Godkjenn alle** -- Godkjenner alle valgte ventende sertifikater med standard utløp.
   - **Eksporter** -- Laster ned valgte sertifikater som en CSV-rapport.

> **Tips:** Massegodkjenning bør kun brukes når du individuelt har verifisert dokumentene til hvert valgt sertifikat. Aldri massegodkjenn uten å gjennomgå dokumenter.

---

## Ofte stilte spørsmål

**Sp: Kan jeg endre utløpsdatoen for et godkjent sertifikat?**
Sv: Nei. For å endre utløpet må du tilbakekalle gjeldende sertifikat og be eieren om å sende inn på nytt.

**Sp: Hva om et sertifikatdokument er på et språk jeg ikke kan lese?**
Sv: Eskaler til en admin som leser det språket, eller be eieren om å levere en sertifisert oversettelse.

**Sp: Kan et dyr ha flere aktive sertifikater?**
Sv: Ja. Et dyr kan ha både et generelt helsesertifikat og spesifikke vaksinasjonssertifikater aktive samtidig.

**Sp: Hvem mottar avvisnings-/tilbakekallingsvarslene?**
Sv: Dyrets registrerte eier mottar alle varsler via e-post og meldinger i appen.
