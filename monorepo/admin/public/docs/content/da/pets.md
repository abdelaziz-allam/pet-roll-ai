# Kæledyrsregister

Kæledyrsregistret er det centrale modul til visning og administration af alle kæledyr registreret på Petfolioo-platformen. Fra dette modul kan administratorer gennemse det komplette kæledyrskatalog, se detaljerede profiler, gennemgå sundhedscertificeringsstatus og foretage moderationshandlinger såsom udelukkelse af kæledyr, der overtræder platformens retningslinjer.

![Pet Registry](/docs/screenshots/pets.png)

---

## Kæledyrsoversigtstabel

Kæledyrsoversigtstabellen viser alle registrerede kæledyr i et pagineret, sorterbart og filtrerbart format.

### Tabelkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Navn | Kæledyrets registrerede navn | Ja |
| Art | Artskategori (f.eks. Hund, Kat, Fugl) | Ja |
| Race | Specifik race inden for arten | Ja |
| Status | Aktuel status (Aktiv, Udelukket, Afventende) | Ja |
| Køn | Han, Hun eller Ukendt | Ja |
| Placering | Land og by for kæledyrets registrerede adresse | Ja |

### Statusindikatorer

| Status | Badge-farve | Betydning |
|--------|-------------|---------|
| Aktiv | Grøn | Kæledyrsprofilen er aktiv og synlig for andre brugere |
| Udelukket | Rød | Kæledyrsprofilen er skjult pga. en overtrædelse af retningslinjerne |
| Afventende | Orange | Kæledyrsprofilen afventer gennemgang eller ejerbekræftelse |

### Tabelinteraktioner

1. **Klik på en kolonneoverskrift** for at sortere tabellen efter den kolonne. En pil angiver sorteringsretningen.
2. **Klik på en række** for at åbne kæledyrets detaljevisning i højre side af skærmen.
3. **Sideinddelingskontroller** i bunden giver dig mulighed for at navigere mellem sider og ændre sidestørrelsen (10, 20, 50 poster pr. side).

> **Tip:** Hold `Shift` nede og klik på en anden kolonneoverskrift for at anvende en sekundær sortering.

---

## Filtre

Filterbjælken over kæledyrsoversigtstabellen giver flere måder at indsnævre de viste resultater på.

### Tilgængelige filtre

| Filter | Type | Beskrivelse |
|--------|------|-------------|
| Art | Rullemenu | Filtrer efter kæledyrsart (Hund, Kat, Fugl, Kanin, Krybdyr osv.) |
| Status | Rullemenu | Filtrer efter kæledyrsstatus (Aktiv, Udelukket, Afventende) |
| Køn | Rullemenu | Filtrer efter køn (Han, Hun, Ukendt) |
| Land | Rullemenu | Filtrer efter kæledyrets registrerede land |
| By | Rullemenu | Filtrer efter by (valgmuligheder opdateres baseret på landevalg) |
| Søgning | Tekstfelt | Fritekst-søgning på tværs af kæledyrsnavn, race og microchipnummer |

### Anvendelse af filtre

1. Find **filterbjælken** over tabellen.
2. Klik på en **rullemenu** for at se tilgængelige valgmuligheder.
3. Vælg en eller flere værdier fra rullemenuen.
4. Skriv i **Søgningsfeltet** for at udføre en fritekst-søgning.
5. Resultaterne opdateres automatisk, når filtre anvendes.
6. Aktive filtre vises som tags under filterbjælken.
7. Klik på **X** på et filtertag for at fjerne det.
8. Klik på **Ryd alle** for at nulstille alle filtre på én gang.

### Filterkombinationer

Filtre kombineres med AND-logik. For eksempel:

| Valgte filtre | Resultat |
|---------------|----------|
| Art: Hund | Alle hunde uanset status, køn eller placering |
| Art: Hund + Køn: Hun | Alle hunhunde |
| Art: Hund + Land: UAE + Status: Aktiv | Alle aktive hunde i UAE |
| Søgning: "Rex" | Alle kæledyr, hvis navn, race eller microchip indeholder "Rex" |

> **Bemærk:** By-rullelisten er afhængig af landevalget. Vælg et land først for at se tilgængelige byer.

---

## Kæledyrsdetaljevisning

Klik på en kæledyrsrække for at åbne en detaljevisning, der glider ind fra højre side af skærmen. Denne visning indeholder den komplette kæledyrsprofil organiseret i sektioner.

### Fotogitter

Øverst i detaljevisningen viser et fotogitter kæledyrets uploadede billeder.

| Element | Beskrivelse |
|---------|-------------|
| Primært foto | Vises større, markeret med et stjerneikon |
| Yderligere fotos | Vist i et gitterlayout (op til 6 miniaturer) |
| Klikhandling | Klik på et foto for at åbne det i fuldskærmsbilledviser |
| Ingen fotos | En pladsholder-silhuet vises |

### Kæledyrsinformationssektion

Under fotoerne vises kæledyrets kernedetaljer i et struktureret layout.

| Felt | Beskrivelse | Eksempel |
|------|-------------|---------|
| Navn | Registreret kæledyrsnavn | "Bella" |
| Art | Artskategori | "Hund" |
| Race | Specifik race | "Golden Retriever" |
| Farve | Pels-/kropsfarve | "Gylden" |
| Vægt | Vægt med enhed | "28,5 kg" |
| Fødselsdato | Kæledyrets fødselsdag | "2021-03-15" |
| Alder | Beregnet ud fra fødselsdato | "2 år, 4 måneder" |
| Køn | Han eller Hun | "Hun" |
| Microchipnummer | Unikt microchip-ID, hvis implanteret | "900118000123456" |
| Neutraliseret/Steriliseret | Neutraliserings- eller steriliseringsstatus | "Ja" / "Nej" / "Ukendt" |
| Registreringsdato | Hvornår kæledyret blev tilføjet platformen | "2023-07-20" |

### Sundhedscertificeringsstatus

Sektionen for sundhedscertificering viser, om kæledyret har gyldig sundhedsdokumentation registreret.

| Element | Beskrivelse |
|---------|-------------|
| Certificeringsbadge | Grønt flueben (gyldig), Gult advarselsikon (udløber snart), Rødt kryds (udløbet/mangler) |
| Certifikattype | Navn på sundhedscertifikatet |
| Udstedelsesdato | Hvornår certifikatet blev udstedt |
| Udløbsdato | Hvornår certifikatet udløber |
| Gyldighedsstatusbjælke | Visuel indikator for resterende gyldighedsperiode |

**Aflæsning af gyldighedsstatusbjælken:**

1. En **fuld grøn bjælke** indikerer, at certifikatet blev udstedt for nylig og har det meste af sin gyldighed tilbage.
2. En **delvis gul bjælke** (under 30% tilbageværende) indikerer, at certifikatet nærmer sig udløb.
3. En **rød tom bjælke** indikerer, at certifikatet er udløbet.
4. Den tilbageværende procentdel vises som tekst ved siden af bjælken.

> **Tip:** Certifikater, der udløber inden for 30 dage, markeres automatisk i modulet Afventende Verificeringer, så kæledyrsejeren kan blive underrettet.

### Ejerinformation

Ejersektionen viser detaljer om kæledyrets registrerede ejer.

| Felt | Beskrivelse |
|------|-------------|
| Ejernavn | Visningsnavn for kæledyrets ejer |
| E-mail | Ejerens e-mailadresse |
| Telefon | Telefonnummer, hvis angivet |
| Verificeret opdrætter | Om ejeren har verificeret opdrætterstatus |
| Kæledyr i alt | Hvor mange kæledyr denne ejer har registreret |
| Medlem siden | Ejerens registreringsdato |

Klik på ejerens navn for at navigere til deres fulde profil i modulet Brugere.

### Placeringssektion

Placeringssektionen viser, hvor kæledyret er registreret.

| Felt | Beskrivelse |
|------|-------------|
| Land | Landenavn med flagikon |
| By | Bynavn |
| Adresse | Gadeadresse, hvis angivet (kan være delvist skjult af hensyn til privatlivets fred) |

---

## Udeluk/Ophæv udelukkelse af kæledyr

Administratorer og moderatorer kan udelukke et kæledyr, hvis profil overtræder platformens retningslinjer. Udelukkelse skjuler kæledyret fra offentlig visning og underretter ejeren.

### Udelukkelse af et kæledyr

1. Åbn kæledyrets detaljevisning ved at klikke på dets række i oversigtstabellen.
2. Scroll til bunden af visningen eller find sektionen **Handlinger**.
3. Klik på knappen **Udeluk kæledyr** (vist med rødt).
4. En bekræftelsesdialog vises.
5. I tekstfeltet **Årsag** indtaster du en klar forklaring på, hvorfor dette kæledyr udelukkes.
6. Vælg en **overtrædelseskategori** fra rullelisten (f.eks. Svigagtigt opslag, Upassende indhold, Duplikatprofil, Overtrædelse af retningslinjer).
7. Klik på **Bekræft udelukkelse**.
8. Kæledyrets status ændres til "Udelukket", og ejeren modtager en notifikation med den angivne årsag.

### Krav til udelukkelsesårsag

| Krav | Beskrivelse |
|------|-------------|
| Minimumlængde | Mindst 20 tegn |
| Sprog | Skal være professionelt og klart |
| Specificitet | Skal referere til den specifikke overtrædelse |
| Synlighed | Årsagen vises direkte til kæledyrets ejer |

> **Vigtigt:** Den udelukkelsesårsag, du angiver, vises for kæledyrets ejer i deres app-notifikation og e-mail. Sørg for, at den er professionel, specifik og ikke indeholder internt jargon.

### Ophævelse af udelukkelse af et kæledyr

1. Brug **Status**-filtret til at vælge "Udelukket" for at finde udelukkede kæledyr.
2. Klik på det udelukkede kæledyrs række for at åbne detaljevisningen.
3. Find knappen **Ophæv udelukkelse** (vist med grønt) i sektionen Handlinger.
4. En bekræftelsesdialog vises med den oprindelige udelukkelsesårsag og dato.
5. Tilføj eventuelt en note, der forklarer, hvorfor udelukkelsen ophæves.
6. Klik på **Bekræft ophævelse**.
7. Kæledyrets status vender tilbage til "Aktiv", og ejeren underrettes.

### Udelukkelseshistorik

Hver kæledyrs detaljevisning inkluderer en sektion **Udelukkelseshistorik**, hvis kæledyret nogensinde har været udelukket:

| Kolonne | Beskrivelse |
|---------|-------------|
| Dato | Hvornår udelukkelsen blev anvendt |
| Administrator | Hvilken administrator udførte handlingen |
| Årsag | Den angivne udelukkelsesårsag |
| Varighed | Hvor længe udelukkelsen varede |
| Løsning | Hvordan den blev løst (ophævet, appelleret osv.) |

---

## Massehandlinger

Til storstilet moderationsopgaver understøtter kæledyrsoversigtstabellen massevalg.

### Brug af massevalg

1. Marker **afkrydsningsfeltet** i venstre side af hver række, du vil vælge.
2. Eller klik på **hovedafkrydsningsfeltet** for at vælge alle synlige rækker på den aktuelle side.
3. En **massehandlingsbjælke** vises øverst i tabellen og viser antallet af valgte elementer.
4. Tilgængelige massehandlinger inkluderer:
   - **Eksporter** - Download valgte kæledyr som en CSV-fil
   - **Ændr status** - Anvend en statusændring på alle valgte kæledyr

> **Bemærk:** Masseudelukkelse er ikke tilgængelig via dette interface. Udelukkelser skal anvendes individuelt for at sikre, at hver enkelt inkluderer en specifik årsag.

---

## Eksportering af kæledyrsdata

For at eksportere kæledyrsregisterdata:

1. Anvend eventuelle ønskede filtre for at indsnævre datasættet.
2. Klik på knappen **Eksporter** i øvre højre hjørne af tabellen.
3. Vælg eksportformatet (CSV eller Excel).
4. Vælg om du vil eksportere **filtrerede resultater** eller **alle registreringer**.
5. Filen downloades til din browsers standard downloadplacering.

### Eksporterede felter

| Felt | Inkluderet |
|------|:----------:|
| Kæledyrsnavn | Ja |
| Art | Ja |
| Race | Ja |
| Køn | Ja |
| Status | Ja |
| Land | Ja |
| By | Ja |
| Ejer-e-mail | Ja |
| Registreringsdato | Ja |
| Microchipnummer | Ja |
| Sundhedscert.-status | Ja |

> **Bemærk:** Fotos og detaljerede sundhedsregistreringer er ikke inkluderet i eksporter. Kun oversigtsdata eksporteres.

---

*Forrige: [Dashboard](./dashboard.md) | Næste: [App-brugere](./users.md)*
