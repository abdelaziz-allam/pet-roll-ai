# App-brugere

Modulet App-brugere giver komplet administration af alle brugerkonti på Petfolioo-platformen. Administratorer kan se brugerprofiler, oprette nye konti, redigere detaljer, tildele roller og foretage moderationshandlinger. Dette modul er tilgængeligt for brugere med `super_admin`- eller `admin`-roller.

![App Users](/docs/screenshots/users.png)

---

## Brugeroversigtstabel

Brugeroversigtstabellen viser alle registrerede platformbrugere med nøgleinformation synlig med ét blik.

### Tabelkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Avatar | Brugerens profilbillede (cirkulær miniature) | Nej |
| Navn | Visningsnavn | Ja |
| E-mail | Registreret e-mailadresse | Ja |
| Rolle | Tildelt platformrolle (bruger, moderator, admin) | Ja |
| Status | Kontostatus (Aktiv, Afventende, Udelukket) | Ja |
| Verificeret opdrætter | Badge, der indikerer verificeret opdrætterstatus | Ja |
| Antal kæledyr | Antal kæledyr registreret af denne bruger | Ja |
| Tilmeldingsdato | Dato for kontooprettelse | Ja |

### Statusindikatorer

| Status | Badge-farve | Betydning |
|--------|-------------|---------|
| Aktiv | Grøn | Kontoen er fuldt funktionsdygtig |
| Afventende | Orange | E-mailbekræftelse ikke gennemført |
| Udelukket | Rød | Kontoen er suspenderet af en administrator |

### Verificeret opdrætter-badge

| Indikator | Betydning |
|-----------|---------|
| Blåt flueben-badge | Brugeren har gennemført opdrætterverificering og er bekræftet |
| Ingen badge | Brugeren har ikke ansøgt om eller modtaget opdrætterverificering |
| Ur-ikon | Opdrætterverificeringsansøgning afventer gennemgang |

### Tabelnavigation

1. **Sorter** ved at klikke på en sorterbar kolonneoverskrift. Klik igen for at vende rækkefølgen.
2. **Søg** ved hjælp af søgebjælken over tabellen for at finde brugere efter navn eller e-mail.
3. **Filtrer** ved hjælp af status- og rollerullemenuer for at indsnævre resultater.
4. **Paginer** ved hjælp af kontroller i bunden (10, 20, 50 poster pr. side).

> **Tip:** Kombinér søgebjælken med statusfiltre for hurtigt at finde specifikke brugere. Søg f.eks. "john" med status "Udelukket" for at finde udelukkede brugere med navnet John.

---

## Visning af brugerdetaljer

Brugerdetaljevisningen giver et omfattende overblik over en brugers profil og aktivitet.

### Åbning af detaljevisningen

1. Klik på en række i brugeroversigtstabellen.
2. Detaljevisningen glider ind fra højre side af skærmen.
3. Visningen indeholder flere sektioner organiseret vertikalt.

### Sektioner i detaljevisningen

| Sektion | Indhold |
|---------|---------|
| Profiloverskrift | Stor avatar, visningsnavn, e-mail, rollebadge, statusbadge |
| Kontoinformation | Tilmeldingsdato, seneste login, e-mailbekræftelsesstatus, godkendelsesmetode |
| Personlige oplysninger | Telefonnummer, tidszone, land, by |
| Opdrætterstatus | Verificeringsstatus, ansøgningsdato, indsendte dokumenter |
| Kæledyrsoversigt | Antal registrerede kæledyr med hurtige links til hver |
| Aktivitetslog | Seneste handlinger udført af denne bruger på platformen |

### Profiloverskrift

Øverst i visningen vises:

- **Avatar** i fuld størrelse (eller standard-silhuet, hvis ingen er uploadet)
- **Visningsnavn** i stor tekst
- **E-mail** under navnet
- **Rollebadge** farvekoderet efter tilladelsesniveau
- **Statusbadge** der viser aktuel kontostatus

### Kontoinformationsfelter

| Felt | Beskrivelse | Eksempel |
|------|-------------|---------|
| Bruger-ID | Unikt systemidentifikator | "usr_a1b2c3d4" |
| Tilmeldingsdato | Hvornår kontoen blev oprettet | "2023-01-15 09:30 UTC" |
| Seneste login | Seneste login-tidsstempel | "2024-07-20 14:22 UTC" |
| E-mail bekræftet | Om e-mailen er blevet bekræftet | "Ja" / "Nej" |
| Godkendelsesmetode | Anvendt godkendelsesmetode | "E-mail/Adgangskode" eller "Google" |
| Firebase UID | Firebase Authentication bruger-ID | "Abc123Def456" |

---

## Oprettelse af ny bruger

Administratorer kan oprette brugerkonti direkte fra admin portalen. Da platformen bruger Firebase Authentication, angives ingen adgangskode under oprettelsen - brugere modtager en e-mail til at angive deres egen adgangskode.

### Trin til at oprette en bruger

1. Klik på knappen **Opret bruger** i øvre højre hjørne af Brugersiden.
2. En oprettelsesdialog eller formular vises.
3. Udfyld de påkrævede felter:

| Felt | Påkrævet | Beskrivelse |
|------|:--------:|-------------|
| Visningsnavn | Ja | Brugerens fulde navn eller valgte visningsnavn |
| E-mail | Ja | En gyldig e-mailadresse (skal være unik på platformen) |

4. Klik på **Opret** for at indsende formularen.
5. Systemet vil:
   - Oprette en Firebase Authentication-post
   - Sende en velkomst-e-mail til brugeren med et link til at angive deres adgangskode
   - Oprette brugerprofilen i platformens database
   - Tildele standardrollen "bruger"
6. Den nye bruger vises i oversigtstabellen med "Afventende"-status, indtil de bekræfter deres e-mail.

### Valideringsregler

| Felt | Regel |
|------|-------|
| Visningsnavn | 2-100 tegn, kan ikke være tomt |
| E-mail | Skal være gyldigt e-mail-format, må ikke allerede eksistere i systemet |

> **Bemærk:** Intet adgangskodefelt er nødvendigt. Firebase Authentication håndterer opsætning af adgangskode via velkomst-e-mailen, der sendes til brugeren. Dette sikrer, at brugeren vælger deres egen sikre adgangskode.

> **Tip:** Hvis du skal oprette en bruger, der skal have forhøjede rettigheder, opret dem først med standardindstillinger, og ændr derefter deres rolle separat (se Ændring af rolle nedenfor).

---

## Redigering af en bruger

Administratorer kan ændre brugerprofilers detaljer, når det er nødvendigt. Dette bruges typisk til at rette oplysninger eller opdatere detaljer på vegne af en bruger.

### Trin til at redigere en bruger

1. Åbn brugerens detaljevisning ved at klikke på deres række i oversigtstabellen.
2. Klik på knappen **Rediger** (blyantikon) i visningens overskrift.
3. Visningen skifter til redigeringstilstand med redigerbare formularfelter.
4. Ændr et af de tilgængelige felter:

| Felt | Redigerbar | Noter |
|------|:----------:|-------|
| Visningsnavn | Ja | Brugerens offentlige navn |
| Telefon | Ja | Internationalt format anbefales (f.eks. +971501234567) |
| Tidszone | Ja | Rullemenu med IANA-tidszoner (f.eks. Asia/Dubai) |
| Land | Ja | Rullemenu med alle lande |
| By | Ja | Tekstfelt, opdaterer forslag baseret på land |
| E-mail | Nej | Kan ikke ændres (bruges som login-identifikator) |
| Bruger-ID | Nej | Systemgenereret, uforanderlig |

5. Klik på **Gem ændringer** for at anvende dine redigeringer.
6. En succesnotifikation bekræfter opdateringen.
7. Visningen vender tilbage til visningstilstand med de opdaterede oplysninger.

### Redigeringshistorik

Alle redigeringer foretaget via admin portalen logges:

| Logfelt | Beskrivelse |
|---------|-------------|
| Tidsstempel | Hvornår ændringen blev foretaget |
| Administrator | Hvilken administrator foretog ændringen |
| Ændret felt | Hvilket felt blev ændret |
| Gammel værdi | Den tidligere værdi |
| Ny værdi | Den opdaterede værdi |

> **Vigtigt:** Redigeringer af brugerprofiler er synlige for brugeren. De vil se de opdaterede oplysninger i deres app. Overvej at underrette brugeren, hvis du foretager ændringer på deres vegne.

---

## Ændring af rolle

Rolleændringer bestemmer, hvilket adgangsniveau en bruger har inden for platformen og dens apps.

### Tilgængelige roller

| Rolle | Beskrivelse | Funktioner |
|-------|-------------|------------|
| user | Standard platformbruger | Kan administrere egne kæledyr, deltage i avlsprogrammer, se opslag |
| moderator | Fællesskabsmoderator | Alle brugerfunktioner plus mulighed for at gennemgå og markere indhold |
| admin | Platformadministrator | Alle moderatorfunktioner plus adgang til admin portalen |

### Trin til at ændre en brugers rolle

1. Åbn brugerens detaljevisning ved at klikke på deres række.
2. Find sektionen **Rolle** i visningen.
3. Klik på knappen **Ændr rolle** (eller det aktuelle rollebadge).
4. En rollevalgsdialog vises med:
   - Radioknapper for hver tilgængelig rolle
   - Beskrivelsestekst, der forklarer hver rolles tilladelser
   - Et bekræftelsesafkrydsningsfelt, der anerkender ændringen
5. Vælg den nye rolle.
6. Læs rollebeskrivelsen for at bekræfte, at den er passende.
7. Marker **bekræftelsesafkrydsningsfeltet** ("Jeg forstår, at dette vil ændre brugerens adgangsniveau").
8. Klik på **Bekræft rolleændring**.
9. Brugerens rolle opdateres øjeblikkeligt.

### Rolleændringsbegrænsninger

| Din rolle | Kan tildele |
|-----------|-------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Kan ikke ændre roller |
| viewer | Kan ikke ændre roller |

> **Vigtigt:** At forfremme en bruger til "admin" giver dem adgang til admin portalen. Gør kun dette for betroede teammedlemmer, der har brug for administrativ adgang.

> **Bemærk:** Ændring af en bruger fra "admin" til "user" tilbagekalder øjeblikkeligt deres admin portal-adgang. Hvis de i øjeblikket er logget ind på portalen, afsluttes deres session ved næste sidenavigation.

---

## Udeluk/Ophæv udelukkelse af bruger

Udelukkelse af en bruger suspenderer deres konto, hvilket forhindrer dem i at logge ind på appen eller få adgang til platformens funktioner.

### Udelukkelse af en bruger

1. Åbn brugerens detaljevisning.
2. Scroll til sektionen **Handlinger** i bunden af visningen.
3. Klik på knappen **Udeluk bruger** (vist med rødt).
4. En bekræftelsesdialog vises med:
   - Brugerens navn og e-mail til bekræftelse
   - Et **Årsag**-tekstfelt (påkrævet)
   - En **Varighed**-vælger (permanent, 7 dage, 30 dage, 90 dage)
5. Indtast en klar, professionel årsag til udelukkelsen.
6. Vælg udelukkelsens varighed.
7. Klik på **Bekræft udelukkelse**.

### Effekter af udelukkelse

| Effekt | Beskrivelse |
|--------|-------------|
| Login blokeret | Brugeren kan ikke logge ind på mobilappen |
| Profil skjult | Brugerens profil er ikke synlig for andre brugere |
| Kæledyr fjernet fra lister | Alle kæledyr ejet af denne bruger skjules fra opslag |
| Notifikationer | Brugeren modtager en e-mail, der forklarer udelukkelsen med den angivne årsag |
| Aktive sessioner | Alle aktuelle sessioner afsluttes øjeblikkeligt |

### Retningslinjer for udelukkelsesårsag

| Retningslinje | Eksempel |
|---------------|---------|
| Vær specifik | "Flere svigagtige avlsopslag rapporteret og bekræftet" |
| Referer til politik | "Overtrædelse af Servicevilkår afsnit 4.2 vedrørende autentiske opslag" |
| Undgå vagt sprog | Skriv IKKE "dårlig opførsel" - vær specifik om, hvad der skete |
| Hold det professionelt | Årsagen sendes direkte til brugeren |

> **Vigtigt:** Udelukkelsesårsagen kommunikeres til brugeren via e-mail og in-app-notifikation. Den skal være faktuel, specifik og professionel.

### Ophævelse af udelukkelse af en bruger

1. Brug **Status**-filtret til at vælge "Udelukket" for at finde udelukkede brugere.
2. Klik på den udelukkede brugers række for at åbne deres detaljevisning.
3. Visningen viser et **Udelukkelsesinformation**-kort med:
   - Udelukkelsesdato
   - Udelukkende administrator
   - Udelukkelsesårsag
   - Udelukkelsesvarighed/udløb
4. Klik på knappen **Ophæv udelukkelse** (vist med grønt).
5. En bekræftelsesdialog vises.
6. Indtast eventuelt en note, der forklarer, hvorfor udelukkelsen ophæves.
7. Klik på **Bekræft ophævelse**.
8. Brugerens status vender tilbage til "Aktiv", og de genvinder fuld platformadgang.
9. Brugeren modtager en notifikation om, at deres konto er genoprettet.

### Udelukkelseshistorik

Hver udelukkelse og ophævelse logges i brugerens historik:

| Felt | Beskrivelse |
|------|-------------|
| Udelukkelsesdato | Hvornår udelukkelsen blev anvendt |
| Ophævelsesdato | Hvornår udelukkelsen blev ophævet (hvis relevant) |
| Administrator | Hvilken administrator foretog handlingen |
| Årsag | Den angivne årsag til udelukkelsen |
| Varighed | Hvor længe udelukkelsen var sat til at vare |
| Løsning | Hvordan den sluttede (manuel ophævelse, udløb, appel) |

---

## Søgning og filtrering af brugere

### Søgebjælke

Søgebjælken øverst på Brugersiden understøtter:

| Søgetype | Eksempel | Matcher |
|----------|---------|---------|
| Navnesøgning | "Sarah" | Alle brugere med "Sarah" i deres visningsnavn |
| E-mailsøgning | "gmail.com" | Alle brugere med Gmail-adresser |
| Delvis match | "pet" | Brugere med navne som "Peter", "Petrov" osv. |

### Filterrullemenuer

| Filter | Valgmuligheder |
|--------|----------------|
| Rolle | Alle, Bruger, Moderator, Admin |
| Status | Alle, Aktiv, Afventende, Udelukket |
| Verificeret opdrætter | Alle, Verificeret, Ikke verificeret, Afventende |

### Kombination af søgning og filtre

1. Indtast tekst i søgebjælken OG vælg filterværdier samtidigt.
2. Resultater skal matche ALLE kriterier (AND-logik).
3. Ryd individuelle filtre ved at klikke på deres X-knap, eller ryd alle med **Nulstil**-knappen.

---

## Eksportering af brugerdata

For at eksportere brugerdata til rapportering eller analyse:

1. Anvend eventuelle ønskede filtre.
2. Klik på knappen **Eksporter** i øvre højre område.
3. Vælg format: **CSV** eller **Excel**.
4. Vælg omfang: **Aktuel filtreret visning** eller **Alle brugere**.
5. Downloaden starter automatisk.

### Eksporterede felter

| Felt | Inkluderet | Noter |
|------|:----------:|-------|
| Visningsnavn | Ja | |
| E-mail | Ja | |
| Rolle | Ja | |
| Status | Ja | |
| Land | Ja | |
| By | Ja | |
| Antal kæledyr | Ja | |
| Tilmeldingsdato | Ja | |
| Seneste login | Ja | |
| Telefon | Nej | Udelukket af hensyn til privatliv |

> **Bemærk:** Telefonnumre og detaljerede personlige oplysninger udelades fra eksporter som standard for at overholde databeskyttelseskrav.

---

*Forrige: [Kæledyrsregister](./pets.md) | Næste: [Kæledyrskategorier](./categories.md)*
