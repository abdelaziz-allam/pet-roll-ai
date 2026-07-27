# Feilsøking

Løsninger på vanlige problemer du kan støte på mens du bruker Petfolioo Admin-portalen.

---

## Innloggingsproblemer

### Jeg kan ikke logge inn

**Problem:** Du skriver inn påloggingsinformasjonen din, men innloggingen mislykkes eller du ser en feilmelding.

**Mulige årsaker:**
- Feil e-postadresse eller passord
- Kontoen din har blitt deaktivert av en Super Admin
- Autentiseringstjenesten er midlertidig utilgjengelig
- Kontoen din er ennå ikke opprettet i Admin-portalen

**Løsning:**
1. Dobbeltsjekk at du bruker e-postadressen som er knyttet til admin-kontoen din (ikke din personlige eller app-bruker e-post).
2. Sørg for at Caps Lock er av og at det ikke er ekstra mellomrom i passordet ditt.
3. Prøv å tilbakestille passordet ditt med lenken "Glemt passord".
4. Hvis problemet vedvarer, kontakt en Super Admin for å bekrefte at kontoen din eksisterer og er aktiv.
5. Hvis tjenesten ser ut til å være nede, vent noen minutter og prøv igjen.

---

### Jeg har glemt passordet mitt

**Problem:** Du kan ikke huske Admin-portal-passordet ditt.

**Mulige årsaker:**
- Passordet ble endret og ikke lagret
- Du bruker påloggingsinformasjon fra et annet system

**Løsning:**
1. På innloggingssiden, klikk "Glemt passord."
2. Skriv inn e-postadressen som er knyttet til admin-kontoen din.
3. Sjekk innboksen din (og spam-mappen) for e-posten for tilbakestilling av passord.
4. Klikk på tilbakestillingslenken og opprett et nytt passord.
5. Hvis du ikke mottar e-posten innen 5 minutter, kontakt en Super Admin for å manuelt tilbakestille kontoen din.

---

### Sesjonen min utløp

**Problem:** Du var innlogget, men ble plutselig omdirigert til innloggingssiden.

**Mulige årsaker:**
- Sesjonen din overskred den automatiske tidsavbruddsperioden (typisk 30 minutters inaktivitet)
- En Super Admin endret kontoinnstillingene eller rollen din
- Serveren ble startet på nytt under en utrulling

**Løsning:**
1. Logg inn igjen med påloggingsinformasjonen din. Ulagret arbeid kan være tapt.
2. Hvis sesjoner utløper veldig hyppig, sørg for at nettleseren din ikke blokkerer informasjonskapsler for Admin-portalens domene.
3. Lagre arbeidet ditt jevnlig for å unngå datatap fra sesjonstidsavbrudd.

---

## Tillatelssproblemer

### Jeg kan ikke se en side jeg burde ha tilgang til

**Problem:** En navigasjonslenke eller side du forventer å ha tilgang til er ikke synlig eller viser en blank skjerm.

**Mulige årsaker:**
- Rollen din inkluderer ikke tillatelse til å se den siden
- Rollen din ble nylig endret og endringen har ikke trådt i kraft ennå
- Et nettleserbuffer-problem viser en utdatert versjon av navigasjonen

**Løsning:**
1. Sjekk din nåværende rolle ved å se på profilen din eller spørre en Super Admin. Se guiden Roller og tillatelser for å se hvilke sider rollen din har tilgang til.
2. Hvis rollen din nylig ble endret, logg ut og logg inn igjen for å oppdatere tillatelsene dine.
3. Tøm nettleserbufferen din eller prøv å åpne portalen i et privat/inkognitovindu.
4. Hvis du mener rollen din burde gi tilgang til siden, kontakt en Super Admin for å gjennomgå tillatelsene dine.

---

### Knapper mangler på en side

**Problem:** Du kan se en side, men visse handlingsknapper (Edit, Delete, Approve osv.) vises ikke.

**Mulige årsaker:**
- Rollen din har skrivebeskyttet tilgang til den siden (f.eks. Viewer-rollen)
- Elementet er i en tilstand der disse handlingene ikke er tilgjengelige (f.eks. allerede godkjent)
- Et UI-gjengivelsesproblem

**Løsning:**
1. Sjekk dokumentasjonen for Roller og tillatelser for å bekrefte om rollen din har skrivetilgang til den funksjonen.
2. Bekreft at elementets nåværende status tillater handlingen du forventer (f.eks. kan du ikke godkjenne en allerede godkjent verifisering).
3. Oppdater siden. Hvis knapper fortsatt ikke vises, prøv en annen nettleser.
4. Hvis rollen din burde ha disse knappene, kontakt en Super Admin.

---

### Jeg får en 403-feil

**Problem:** Portalen viser en "403 Forbidden"-feil når du prøver å åpne en side eller utføre en handling.

**Mulige årsaker:**
- Du forsøker en handling som rollen din eksplisitt ikke tillater
- Sesjonstokenet ditt har blitt ugyldig
- Rollen din ble nedgradert mens du var innlogget

**Løsning:**
1. Merk deg hvilken side eller handling som utløste feilen.
2. Logg ut og logg inn igjen for å oppdatere sesjonen og tillatelsene dine.
3. Hvis feilen vedvarer, har rollen din ikke tilgang til den ressursen. Kontakt en Super Admin hvis du trenger utvidede tillatelser.

---

## Dataproblemer

### Endringer jeg gjorde vises ikke

**Problem:** Du redigerte en post (kjæledyr, bruker, blogginnlegg osv.), men endringene reflekteres ikke i portalen.

**Mulige årsaker:**
- Lagringsoperasjonen feilet stille på grunn av et nettverksproblem
- Nettleseren din viser en bufret versjon av siden
- En annen admin overskrev endringene dine samtidig

**Løsning:**
1. Oppdater siden med Ctrl+Shift+R (eller Cmd+Shift+R på Mac) for å omgå bufferen.
2. Sjekk om posten viser endringene dine. Hvis ikke, gjør redigeringen på nytt og se etter feilmeldinger ved lagring.
3. Sørg for at du har en stabil internettforbindelse.
4. Hvis du jobber med delte poster, koordiner med andre admins for å unngå motstridende redigeringer.

---

### Export fungerer ikke

**Problem:** Å klikke på Export-knappen gjør ingenting, eller den nedlastede filen er tom eller ødelagt.

**Mulige årsaker:**
- Nettleseren din blokkerer nedlastingen (popup-blokkering eller nedlastingsrestriksjoner)
- Datasettet er for stort og eksporten fikk tidsavbrudd
- Rollen din har ikke eksporttillatelser

**Løsning:**
1. Sjekk om nettleseren din blokkerte en nedlasting eller popup. Se etter et varsel i adresselinjen.
2. Deaktiver eventuelle popup-blokkeringer for Admin-portalens domene.
3. Hvis datasettet er veldig stort, prøv å bruke filtre for å redusere antall poster før eksport.
4. Prøv et annet eksportformat (f.eks. CSV i stedet for PDF) da det kan behandles raskere.
5. Hvis problemet vedvarer, kontakt en Super Admin for å bekrefte at rollen din inkluderer eksporttillatelser.

---

### Søk returnerer ingen resultater

**Problem:** Du søker etter en post du vet eksisterer, men får et tomt resultatsett.

**Mulige årsaker:**
- En skrivefeil eller ekstra mellomrom i søket
- Søkefeltet filtrerer på en spesifikk kolonne (f.eks. søker på navn når du skrev inn en ID)
- Posten ble slettet eller er i en annen status enn forventet

**Løsning:**
1. Fjern eventuelle ekstra mellomrom fra søket ditt.
2. Prøv å søke med færre tegn eller en delvis match.
3. Sjekk hvilket felt søket filtrerer på og sørg for at søket ditt matcher den felttypen.
4. Fjern eventuelle aktive filtre som kan ekskludere posten.
5. Hvis du søker etter et kjæledyr med mikrochip-ID, sørg for at du skriver inn den fulle numeriske IDen uten bindestreker.

---

## Varslingsproblemer

### Push-varselet ble ikke levert

**Problem:** Du sendte et push-varsel, men målbrukerne rapporterer at de ikke mottok det.

**Mulige årsaker:**
- Brukeren har deaktivert push-varsler på enheten sin
- Brukerens enhetstoken har utløpt (appen ble avinstallert og reinstallert)
- Varselet ble sendt til feil brukersegment
- Det er forsinkelse i push-varslingsleveransetjenesten

**Løsning:**
1. Sjekk varslingsleveringsloggen på Varsler-siden for å se sendestatus.
2. Bekreft at du valgte riktig målgruppe (spesifikk bruker, segment eller alle brukere).
3. Merk at push-varsler kan ta noen minutter å levere avhengig av enhet og nettverksforhold.
4. Hvis en spesifikk bruker konsekvent ikke mottar varsler, kan enhetstokenet deres være ugyldig. De bør åpne appen og reaktivere varsler i enhetsinnstillingene.
5. For kringkastingsvarsler, tillat opptil 15 minutter for levering til alle brukere.

---

### Jeg kan ikke sende varsler

**Problem:** Knappen "Send Notification" er deaktivert eller du mottar en feil når du forsøker å sende.

**Mulige årsaker:**
- Rollen din har ikke tillatelse til å sende varsler (Viewers og noen Moderators)
- Obligatoriske felt (tittel, meldingstekst, målgruppe) er ikke fylt ut
- Varslingstjenesten er midlertidig utilgjengelig

**Løsning:**
1. Sørg for at alle obligatoriske felt er fylt ut: tittel, meldingstekst og minst ett målgruppevalg.
2. Sjekk at rollen din har tillatelse til å sende varsler (Admin- eller Super Admin-rolle kreves).
3. Hvis alle felt er fylt ut og du har riktig rolle, prøv å oppdatere siden og forsøk igjen.
4. Hvis feilen nevner et tjenesteproblem, vent noen minutter og prøv igjen. Hvis problemet vedvarer i mer enn 30 minutter, rapporter det til det tekniske teamet.

---

## Nettleserproblemer

### Siden vil ikke laste

**Problem:** Admin-portalen viser en blank side, en lastespinner som aldri fullføres, eller en tilkoblingsfeil.

**Mulige årsaker:**
- Internettilkoblingsproblem
- Admin-portaltjenesten er nede eller starter på nytt
- Nettleserutvidelser forstyrrer sidelasting
- DNS eller brannmur blokkerer portaldomenet

**Løsning:**
1. Sjekk internettilkoblingen din ved å besøke et annet nettsted.
2. Prøv å oppdatere siden med Ctrl+Shift+R (eller Cmd+Shift+R på Mac).
3. Prøv å åpne portalen i et privat/inkognitovindu for å utelukke utvidelseskonflikter.
4. Tøm nettleserbufferen og informasjonskapslene for portaldomenet.
5. Hvis du bruker et bedriftsnettverk, sjekk om en brannmur eller proxy blokkerer tilgangen.
6. Hvis portalen er nede for alle, kan en utrulling pågå. Vent 5-10 minutter og prøv igjen.

---

### Bilder/skjermbilder er ødelagte

**Problem:** Bilder i portalen (kjæledyrbilder, bloggbilder, skjermbilder i dokumentasjon) vises som ødelagte ikoner eller lastes ikke.

**Mulige årsaker:**
- Bildelagringstjenesten er midlertidig utilgjengelig
- Bildet ble slettet fra lagring, men referansen består
- En innholdssikkerhetspolicy blokkerer bildelasting
- Treg nettverkstilkobling forårsaker tidsavbrudd for bildelasting

**Løsning:**
1. Oppdater siden for å prøve å laste bildene på nytt.
2. Sjekk om problemet påvirker alle bilder eller bare spesifikke. Hvis bare spesifikke bilder er ødelagte, kan de ha blitt slettet fra lagring.
3. Høyreklikk på et ødelagt bilde og velg "Åpne bilde i ny fane." Hvis det lastes separat, kan en nettleserutvidelse blokkere inline-bilder.
4. Deaktiver annonseblokkere eller sikkerhetsutvidelser midlertidig for å teste.
5. Hvis problemet påvirker alle bilder på tvers av portalen, rapporter det til det tekniske teamet da lagringstjenesten kan trenge oppmerksomhet.

---

### Portalen er treg

**Problem:** Sider tar lang tid å laste, handlinger føles trege, eller portalen blir uresponsiv.

**Mulige årsaker:**
- Treg internettilkobling
- Nettleseren har for mange åpne faner som bruker minne
- Store datasett lastes uten paginering
- Serveren er under tung belastning

**Løsning:**
1. Test internetthastigheten din for å utelukke et tilkoblingsproblem.
2. Lukk unødvendige nettleserfaner for å frigjøre minne.
3. Hvis en spesifikk side er treg (f.eks. Kjæledyrregisteret med tusenvis av poster), bruk filtre for å redusere datasettets størrelse.
4. Tøm nettleserbufferen din, som kan ha blitt stor over tid.
5. Prøv en annen nettleser for å se om problemet er nettleserspesifikt.
6. Hvis tregheten er konsistent på tvers av flere admins, kan det være et serverside-problem. Rapporter det til det tekniske teamet med de spesifikke sidene som er påvirket og omtrentlige responstider.
