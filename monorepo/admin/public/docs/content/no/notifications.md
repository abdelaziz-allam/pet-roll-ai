# Varsler

Varsler-siden gjor det mulig for administratorer a skrive og sende push-varsler til brukere av Petfolioo-mobilappen. Du kan rette deg mot spesifikke malsegmenter, se gjennom varselhistorikk og folge beste praksis for effektiv kommunikasjon.

![Notifications](/docs/screenshots/notifications.png)

---

## Oversikt

Push-varsler er en direkte kanal til brukerne dine. Bruk dem til a annonsere nye funksjoner, dele viktige oppdateringer, sende paminnelser eller engasjere spesifikke brukersegmenter. Denne siden gir bade komposisjonsverktoy og en historikklogg over alle tidligere sendte varsler.

---

## Skriv varsel

Varselkomponisten er hovedverktoyet for a opprette og sende push-varsler til appbrukere.

### Tilgang til komponisten

1. Naviger til **Varsler**-siden fra sidemenyen.
2. Skjemaet for a skrive varsler vises overst pa siden.

### Skjemafelter

| Felt | Beskrivelse | Krav |
|------|-------------|------|
| **Tittel** | Varseloverskriften som vises fremtredende pa brukerens enhet | Obligatorisk. Maksimalt 65 tegn anbefales for full synlighet. |
| **Meldingstekst** | Det detaljerte innholdet i varselet | Obligatorisk. Maksimalt 240 tegn anbefales. |
| **Malgruppe** | Malgruppen av brukere som vil motta dette varselet | Obligatorisk. Velg fra forhands definerte segmenter. |

---

## Skrive et varsel

Folg disse trinnene for a opprette og sende et varsel:

### Trinn 1: Skriv inn tittelen

1. Klikk pa **Tittel**-inntastingsfeltet.
2. Skriv en kortfattet, oppmerksomhetsfangende overskrift.
3. Hold den under 65 tegn for a unnga avkorting pa mindre enheter.

> **Tips:** Bruk handlingsorientert sprak i titler. "Nytt: Spor kjaeledyrets vaksinasjoner" er mer engasjerende enn "Oppdatering av vaksinasjonsfunksjon."

### Trinn 2: Skriv meldingsteksten

1. Klikk pa **Meldingstekst**-tekstomradet.
2. Skriv den detaljerte meldingen du vil at brukerne skal se.
3. Inkluder relevant informasjon som hvilken handling brukeren bor ta.
4. Hold meldingen under 240 tegn for optimal visning.

### Trinn 3: Velg malgruppe

1. Klikk pa **Malgruppe**-rullegardinvelgeren.
2. Velg ett av folgende malgrupesegmenter:

| Malgruppe | Beskrivelse |
|-----------|-------------|
| **Alle brukere** | Sender varselet til alle registrerte brukere av appen |
| **Hundeeiere** | Retter seg mot brukere som har minst en hund registrert i profilen sin |
| **Katteeiere** | Retter seg mot brukere som har minst en katt registrert i profilen sin |
| **Verifiserte oppdrettere** | Retter seg mot brukere som er verifisert som profesjonelle oppdrettere |

3. Den valgte malgruppen bestemmer hvem som vil motta push-varselet.

> **Merk:** En bruker kan tilhore flere segmenter. For eksempel vil en verifisert oppdretter som eier hunder motta varsler rettet mot "Hundeeiere", "Verifiserte oppdrettere" og "Alle brukere."

### Trinn 4: Gjennomga for sending

1. Dobbeltsjekk tittelen for skrivefeil og klarhet.
2. Gjennomga meldingsteksten for noktighet og tone.
3. Bekreft at malgruppesegmentet er riktig.
4. Verifiser at dette ikke er en duplikat av et nylig sendt varsel.

---

## Sendebekreftelse

Nar du er klar til a sende varselet, sikrer et bekreftelsestrinn at du ikke ved et uhell sender til feil malgruppe.

### Sendeprosess

1. Klikk pa **Send varsel**-knappen.
2. En bekreftelsesdialog vises som viser:
   - Varseltittelen
   - Meldingsteksten
   - Det valgte malgruppesegmentet
   - Estimert antall mottakere
3. Gjennomga alle detaljer i bekreftelsesdialogen.
4. Klikk **Bekreft sending** for a sende varselet.
5. Alternativt, klikk **Avbryt** for a ga tilbake til komponisten og gjore endringer.
6. Ved vellykket levering vises en suksessmelding som bekrefter at varselet er satt i ko.

> **Viktig:** Nar det er bekreftet, kan varselet ikke tilbakekalles. Dobbeltsjekk alltid malgruppen og innholdet for du bekrefter.

---

## Varselhistorikk

Under skriveskjemaet viser Varselhistorikk-seksjonen en kronologisk liste over alle tidligere sendte varsler.

### Kolonner i historikklisten

| Kolonne | Beskrivelse |
|---------|-------------|
| **Typeetikett** | En fargekodet etikett som indikerer malgruppesegmentet (f.eks. "Alle brukere" i blatt, "Hundeeiere" i oransje) |
| **Tittel** | Varseltittelen slik den ble sendt |
| **Melding** | En forhands visning av meldingsteksten (avkortet hvis lang) |
| **Dato** | Dato og klokkeslett da varselet ble sendt |
| **Antall mottakere** | Antall brukere som mottok varselet |

### Vise historikk

1. Bla ned under skriveskjemaet for a se historikklisten.
2. Varsler er listet i omvendt kronologisk rekkefolge (nyeste forst).
3. Hver rad viser typeetikett, tittel, dato og antall mottakere med et raskt blikk.
4. Klikk pa en rad for a utvide og se hele meldingsteksten.

### Forsta typeetiketter

Typeetiketter er fargekodede for rask identifikasjon:

| Etikettfarge | Malgruppe |
|--------------|-----------|
| Bla | Alle brukere |
| Oransje | Hundeeiere |
| Lilla | Katteeiere |
| Gronn | Verifiserte oppdrettere |

---

## Beste praksis for push-varsler

Effektive push-varsler driver engasjement uten a irritere brukere. Folg disse retningslinjene:

### Frekvens

1. **Begrens frekvensen** -- Ikke send mer enn 2-3 varsler per uke med mindre det er akutt.
2. **Samle relaterte oppdateringer** -- Kombiner flere sma oppdateringer i ett enkelt varsel.
3. **Respekter tidssoner** -- Send varsler i rimelige timer (09:00 - 20:00 lokal tid).
4. **Unnga helger** -- Med mindre varselet er tidskritisk, foretrekk hverdager.

### Innholdskvalitet

1. **Vaer kortfattet** -- Kom til poenget raskt. Brukere bestemmer seg pa sekunder om de vil engasjere seg.
2. **Vaer handlingsorientert** -- Fortell brukerne hva de kan gjore: "Sjekk kjaeledyrets kommende vaksinasjoner."
3. **Vaer relevant** -- Bruk malgruppemaling for a sikre at innholdet matcher brukerinteresser.
4. **Unnga clickbait** -- Villedende varsler undergraver tillit og oker antall brukere som skrur av varsler.
5. **Personaliser nar mulig** -- Referer til malgruppesegmentet: "Til alle hundeeiere" foeles mer personlig.

### Timing og kontekst

1. **Nye funksjoner** -- Send nar funksjonen er live og tilgjengelig.
2. **Helsepaminnelser** -- Send noen dager for kjaeledyrets avtale eller vaksinasjon forfaller.
3. **Sesonginnhold** -- Tilpass til artstidene (f.eks. loppe-/flatt-paminnelser om varen).
4. **Akutte oppdateringer** -- For presserende problemer (vedlikehold, sikkerhet), send umiddelbart uavhengig av tidsregler.

### Skrive effektive titler

| Godt eksempel | Hvorfor det fungerer |
|---------------|---------------------|
| "Kjaeledyrets vaksinasjon forfaller snart" | Relevant, skaper hastefolelse, tydelig handling |
| "Nytt: Svangerskapssporing for oppdrettere" | Fremhever ny verdi, retter seg mot malgruppen |
| "Vedlikehold i kveld kl. 22:00" | Tydelig, spesifikk, tidssensitiv |

| Darlig eksempel | Hvorfor det feiler |
|-----------------|-------------------|
| "Sjekk dette!" | Vagt, ingen verdiproposisjon |
| "Oppdatering" | For generisk, brukere vil ignorere |
| "Viktig!!!" | Overbruker hastefolelse, foeles som spam |

### Male suksess

Etter sending av varsler, overvik:

- **Apningsrate** -- Engasjerer brukerne seg med varslene dine?
- **Fravalgsrate** -- En okning indikerer varselutmattelse.
- **Aktivitet i appen** -- Driver et varsel den tiltenkte atferden?
- **Tilbakemeldinger** -- Sjekk Tilbakemeldinger-siden for brukerreaksjoner.

---

## Detaljer om malgruppesegmenter

### Alle brukere

- Inkluderer alle registrerte kontoer i systemet.
- Bruk for plattformomfattende kunngoringer, vedlikeholdsvarsler eller universelle funksjoner.
- Storste malgruppe -- bruk sparsomt for a unnga varselutmattelse.

### Hundeeiere

- Inkluderer brukere med minst en hund i kjaeledyrprofilen sin.
- Bruk for hundespesifikke helsetips, raseaktiviteter eller funksjonsoppdateringer.
- Eksempel: "Paminnelse: Arlig hjerteormforebygging for hunder."

### Katteeiere

- Inkluderer brukere med minst en katt i kjaeledyrprofilen sin.
- Bruk for kattespesifikt innhold, innendors helsetips eller katterelaterte funksjoner.
- Eksempel: "Nytt: Innendors aktivitetssporing for katter."

### Verifiserte oppdrettere

- Inkluderer brukere som har fullfort oppdretter-verifisering.
- Bruk for avlsspesifikke funksjoner, samsvarsoppdateringer eller profesjonelle verktoy.
- Eksempel: "Forbedringer i svangerskapssporeren er na tilgjengelig."

---

## Feilsoking

| Problem | Losning |
|---------|---------|
| Varsel sendes ikke | Verifiser at alle obligatoriske felter er fylt ut. Sjekk nettverkstilkoblingen. |
| Antall mottakere viser 0 | Det valgte malgruppesegmentet kan vaere tomt. Verifiser at brukere finnes i det segmentet. |
| Brukere rapporterer at de ikke mottar | Brukere kan ha deaktivert push-varsler pa enheten sin. Dette er utenfor admin-kontroll. |
| Duplikatvarsel sendt | Sjekk historikklisten for sending. Det finnes ingen angre-funksjon nar det er bekreftet. |

---

## Relaterte sider

- [Tilbakemeldinger](./feedback.md) -- Overvik brukerreaksjoner pa varsler
- [Analyser](./analytics.md) -- Spor brukerengasjementtrender
- [Innstillinger](./settings.md) -- Konfigurer varselrelaterte systeminnstillinger
