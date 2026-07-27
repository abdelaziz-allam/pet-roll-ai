# Dyreregister

Dyreregisteret er den sentrale modulen for a vise og administrere alle dyr registrert pa Petfolioo-plattformen. Fra denne modulen kan administratorer bla gjennom den komplette dyrekatalogen, vise detaljerte profiler, gjennomga helsesertifiseringsstatuser, og utfore modereringshandlinger som a utestenge dyr som bryter plattformens retningslinjer.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Dyrelistetabell

Dyrelistetabellen viser alle registrerte dyr i et paginert, sorterbart og filtrerbart format.

### Tabellkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Navn | Dyrets registrerte navn | Ja |
| Art | Artskategori (f.eks. Hund, Katt, Fugl) | Ja |
| Rase | Spesifikk rase innenfor arten | Ja |
| Status | Gjeldende status (Aktiv, Utestengt, Ventende) | Ja |
| Kjonn | Hann, Hunn eller Ukjent | Ja |
| Plassering | Land og by for dyrets registrerte adresse | Ja |

### Statusindikatorer

| Status | Merkefarfe | Betydning |
|--------|------------|-----------|
| Aktiv | Gronn | Dyreprofilen er aktiv og synlig for andre brukere |
| Utestengt | Rod | Dyreprofilen er skjult pa grunn av brudd pa retningslinjer |
| Ventende | Oransje | Dyreprofilen venter pa gjennomgang eller eierverifisering |

### Tabellinteraksjoner

1. **Klikk pa en kolonneoverskrift** for a sortere tabellen etter den kolonnen. En pil indikerer sorteringsretning.
2. **Klikk pa en rad** for a apne dyredetaljpanelet pa hoyre side av skjermen.
3. **Pagineringskontroller** nederst lar deg navigere mellom sider og endre sidestorrelse (10, 20, 50 oppforinger per side).

> **Tips:** Hold `Shift` og klikk pa en andre kolonneoverskrift for a bruke en sekundar sortering.

---

## Filtre

Filterlinjen over dyrelistetabellen gir flere mater a begrense de viste resultatene pa.

### Tilgjengelige filtre

| Filter | Type | Beskrivelse |
|--------|------|-------------|
| Art | Rullegardinmeny | Filtrer etter dyreart (Hund, Katt, Fugl, Kanin, Reptil osv.) |
| Status | Rullegardinmeny | Filtrer etter dyrestatus (Aktiv, Utestengt, Ventende) |
| Kjonn | Rullegardinmeny | Filtrer etter kjonn (Hann, Hunn, Ukjent) |
| Land | Rullegardinmeny | Filtrer etter dyrets registrerte land |
| By | Rullegardinmeny | Filtrer etter by (alternativene oppdateres basert pa landsvalg) |
| Sok | Tekstfelt | Fritekstok pa tvers av dyrenavn, rase og mikrochipnummer |

### Bruke filtre

1. Finn **filterlinjen** over tabellen.
2. Klikk pa en **rullegardinmeny** for a se tilgjengelige alternativer.
3. Velg en eller flere verdier fra rullegardinmenyene.
4. Skriv i **Sok**-feltet for a utfore et fritekstok.
5. Resultater oppdateres automatisk nar filtre brukes.
6. Aktive filtre vises som etiketter under filterlinjen.
7. Klikk pa **X** pa en filteretikett for a fjerne den.
8. Klikk **Fjern alle** for a tilbakestille alle filtre pa en gang.

### Filterkombinasjoner

Filtre kombineres med OG-logikk. For eksempel:

| Valgte filtre | Resultat |
|---------------|----------|
| Art: Hund | Alle hunder uavhengig av status, kjonn eller plassering |
| Art: Hund + Kjonn: Hunn | Alle hunnhunder |
| Art: Hund + Land: UAE + Status: Aktiv | Alle aktive hunder i UAE |
| Sok: "Rex" | Alle dyr der navn, rase eller mikrochip inneholder "Rex" |

> **Merk:** By-rullegardinmenyen er avhengig av landsvalget. Velg et land forst for a se tilgjengelige byer.

---

## Dyredetaljpanel

Klikk pa en hvilken som helst dyrerad for a apne et detaljpanel som glir inn fra hoyre side av skjermen. Dette panelet inneholder den komplette dyreprofilen organisert i seksjoner.

### Bilderutenett

Overst i detaljpanelet viser et bilderutenett dyrets opplastede bilder.

| Element | Beskrivelse |
|---------|-------------|
| Primaerbilde | Vises storre, merket med et stjerneikon |
| Tilleggsbilder | Vises i et rutenettoppsett (opptil 6 miniatyrbilder) |
| Klikkhandling | Klikk pa et bilde for a apne det i en fullskjermvisning |
| Ingen bilder | Et plassholdersilhuett vises |

### Dyreinformasjonsseksjon

Under bildene vises dyrets kjernedetaljer i et strukturert oppsett.

| Felt | Beskrivelse | Eksempel |
|------|-------------|---------|
| Navn | Registrert dyrenavn | "Bella" |
| Art | Artskategori | "Hund" |
| Rase | Spesifikk rase | "Golden Retriever" |
| Farge | Pels-/kroppsfarge | "Gyllen" |
| Vekt | Vekt med enhet | "28,5 kg" |
| Fodselsdato | Dyrets bursdag | "2021-03-15" |
| Alder | Beregnet fra fodselsdato | "2 ar, 4 maneder" |
| Kjonn | Hann eller Hunn | "Hunn" |
| Mikrochipnummer | Unikt mikrochip-ID hvis implantert | "900118000123456" |
| Kastrert/sterilisert | Kastrerings- eller steriliseringsstatus | "Ja" / "Nei" / "Ukjent" |
| Registreringsdato | Nar dyret ble lagt til pa plattformen | "2023-07-20" |

### Helsesertifiseringsstatus

Helsesertifiseringsseksjonen viser om dyret har gyldig helsedokumentasjon pa fil.

| Element | Beskrivelse |
|---------|-------------|
| Sertifiseringsmerke | Gronn hake (gyldig), Gul advarsel (utloper snart), Rod X (utlopt/mangler) |
| Sertifikattype | Navn pa helsesertifikatet |
| Utstedelsesdato | Nar sertifikatet ble utstedt |
| Utlopsdato | Nar sertifikatet utloper |
| Gyldighetsfremdriftslinje | Visuell indikator for gjenvarende gyldighetsperiode |

**Lese gyldighetsfremdriftslinjen:**

1. En **full gronn linje** indikerer at sertifikatet nylig ble utstedt og har mesteparten av gyldigheten gjenstuende.
2. En **delvis gul linje** (under 30 % gjenstaende) indikerer at sertifikatet narmer seg utlop.
3. En **rod tom linje** indikerer at sertifikatet har utlopt.
4. Prosentandelen som gjenstar vises som tekst ved siden av linjen.

> **Tips:** Sertifikater som utloper innen 30 dager blir automatisk flagget i modulen Ventende verifiseringer slik at dyreeieren kan varsles.

### Eierinformasjon

Eierseksjonen viser detaljer om dyrets registrerte eier.

| Felt | Beskrivelse |
|------|-------------|
| Eiernavn | Visningsnavn for dyrets eier |
| E-post | Eierens e-postadresse |
| Telefon | Telefonnummer hvis oppgitt |
| Verifisert oppdretter | Om eieren har verifisert oppdretterstatus |
| Totalt antall dyr | Hvor mange dyr denne eieren har registrert |
| Medlem siden | Eierens registreringsdato |

Klikk pa eierens navn for a navigere til deres fullstendige profil i Brukermodulen.

### Plasseringsseksjon

Plasseringsseksjonen viser hvor dyret er registrert.

| Felt | Beskrivelse |
|------|-------------|
| Land | Landsnavn med flaggikon |
| By | Bynavn |
| Adresse | Gateadresse hvis oppgitt (kan vare delvis skjult av personvernhensyn) |

---

## Utestenge/oppheve utestengelse av dyr

Administratorer og moderatorer kan utestenge et dyr hvis profil bryter plattformens retningslinjer. Utestengelse skjuler dyret fra offentlig visning og varsler eieren.

### Utestenge et dyr

1. Apne dyrets detaljpanel ved a klikke pa raden i listetabellen.
2. Rull til bunnen av panelet eller finn **Handlinger**-seksjonen.
3. Klikk pa **Utesteng dyr**-knappen (vist i rodt).
4. Et bekreftelsesvindu vil vises.
5. I **Arsak**-tekstfeltet, skriv inn en tydelig forklaring pa hvorfor dette dyret blir utestengt.
6. Velg en **bruddkategori** fra rullegardinmenyen (f.eks. Uredelig oppforing, Upassende innhold, Duplikatprofil, Brudd pa retningslinjer).
7. Klikk **Bekreft utestengelse**.
8. Dyrets status endres til "Utestengt" og eieren mottar et varsel med oppgitt arsak.

### Krav til arsak for utestengelse

| Krav | Beskrivelse |
|------|-------------|
| Minimumslengde | Minst 20 tegn |
| Sprak | Ma vare profesjonelt og tydelig |
| Spesifisitet | Bor referere det spesifikke bruddet |
| Synlighet | Arsaken vises direkte til dyreeieren |

> **Viktig:** Arsaken for utestengelse du oppgir vil bli vist til dyreeieren i appvarselet og e-posten deres. Sorg for at den er profesjonell, spesifikk og ikke inneholder intern sjargong.

### Oppheve utestengelse av et dyr

1. Bruk **Status**-filteret og velg "Utestengt" for a finne utestengte dyr.
2. Klikk pa det utestengte dyrets rad for a apne detaljpanelet.
3. Finn **Opphev utestengelse**-knappen (vist i gront) i Handlinger-seksjonen.
4. Et bekreftelsesvindu vises med den opprinnelige utestengelsesarsaken og datoen.
5. Legg eventuelt til et notat som forklarer hvorfor utestengelsen oppheves.
6. Klikk **Bekreft oppheving**.
7. Dyrets status gar tilbake til "Aktiv" og eieren varsles.

### Utestengelseshistorikk

Hvert dyrs detaljpanel inkluderer en **Utestengelseshistorikk**-seksjon hvis dyret noen gang har vart utestengt:

| Kolonne | Beskrivelse |
|---------|-------------|
| Dato | Nar utestengelsen ble iverksatt |
| Administrator | Hvilken administrator som utforte handlingen |
| Arsak | Den oppgitte arsaken for utestengelse |
| Varighet | Hvor lenge utestengelsen varte |
| Losning | Hvordan den ble lost (opphevet, anket osv.) |

---

## Masseoperasjoner

For store modereringsoppgaver stotter dyrelistetabellen masseutvelgelse.

### Bruke masseutvelgelse

1. Kryss av **avkrysningsboksen** pa venstre side av hver rad du vil velge.
2. Eller klikk pa **overskriftsavkrysningsboksen** for a velge alle synlige rader pa gjeldende side.
3. En **massehandlingslinje** vises oppe i tabellen som viser antall valgte elementer.
4. Tilgjengelige massehandlinger inkluderer:
   - **Eksporter** - Last ned valgte dyr som en CSV-fil
   - **Endre status** - Bruk en statusendring pa alle valgte dyr

> **Merk:** Masseutestengelse er ikke tilgjengelig via dette grensesnittet. Utestengelser ma brukes individuelt for a sikre at hver inkluderer en spesifikk arsak.

---

## Eksportere dyredata

For a eksportere dyreregisterdata:

1. Bruk onskede filtre for a begrense datasettet.
2. Klikk pa **Eksporter**-knappen oppe til hoyre i tabellen.
3. Velg eksportformat (CSV eller Excel).
4. Velg om du vil eksportere **filtrerte resultater** eller **alle poster**.
5. Filen lastes ned til nettleserens standard nedlastingsplassering.

### Eksporterte felt

| Felt | Inkludert |
|------|:---------:|
| Dyrenavn | Ja |
| Art | Ja |
| Rase | Ja |
| Kjonn | Ja |
| Status | Ja |
| Land | Ja |
| By | Ja |
| Eiers e-post | Ja |
| Registreringsdato | Ja |
| Mikrochipnummer | Ja |
| Helsesertifiseringsstatus | Ja |

> **Merk:** Bilder og detaljerte helseregistreringer er ikke inkludert i eksporter. Kun sammendragsdata eksporteres.

---

*Forrige: [Dashboard](./dashboard.md) | Neste: [App-brukere](./users.md)*
