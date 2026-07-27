# Indstillinger

Indstillingssiden giver systemomfattende konfigurationsmuligheder for Petfolioo-platformen. Indstillinger er organiseret i tre faner: Generelt, Notifikationer og Sikkerhed. Ændringer foretaget her påvirker adfærden for både admin portalen og mobilappen.

![Settings](/docs/screenshots/settings.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Oversigt

Kun administratorer med super_admin- eller admin-rolle (med adgang til Indstillingssiden) kan se og ændre indstillinger. Alle ændringer kræver eksplicit gemning og træder i kraft øjeblikkeligt ved gemning.

---

## Adgang til indstillinger

1. Klik på **Indstillinger** i sidebjælkenavigationsmenuen.
2. Indstillingssiden indlæses med tre faner øverst.
3. Fanen **Generelt** er valgt som standard.

---

## Fanen Generelt

Fanen Generelt indeholder kernekonfigurationsmuligheder for applikationen, der definerer, hvordan platformen præsenterer sig og fungerer.

### Felter

| Felt | Beskrivelse | Standard |
|------|-------------|---------|
| **Appnavn** | Visningsnavnet for applikationen vist i notifikationer og e-mails | Petfolioo |
| **Support-e-mail** | Kontakt-e-mailadressen vist til brugere for supporthenvendelser | -- |
| **Standardsprog** | Standardsproget for nye brugere og systemkommunikation | Engelsk |
| **Vedligeholdelsestilstand** | Kontakt til at aktivere eller deaktivere vedligeholdelsestilstand | Fra |

### Konfigurering af generelle indstillinger

#### Appnavn

1. Find feltet **Appnavn**.
2. Ryd den eksisterende værdi og skriv det ønskede applikationsnavn.
3. Dette navn vises i push-notifikationer, e-mail-hoveder og mobilappens om-sektion.

#### Support-e-mail

1. Find feltet **Support-e-mail**.
2. Indtast den e-mailadresse, hvor brugere skal rette supporthenvendelser.
3. Denne e-mail vises på mobilappens hjælp/kontakt-skærm.

> **Tip:** Brug en delt team-e-mail (f.eks. support@petfolioo.com) i stedet for en personlig adresse, så flere teammedlemmer kan svare.

#### Standardsprog

1. Klik på rullelisten **Standardsprog**.
2. Vælg det sprog, der vil blive brugt som standard for:
   - Oprettelse af nye brugerkonti
   - Systemgenererede notifikationer
   - E-mailskabeloner
3. Brugere kan overstyre dette i deres individuelle mobilappindstillinger.

#### Vedligeholdelsestilstand

Vedligeholdelsestilstand er en kritisk funktion, der signalerer til brugere, at platformen midlertidigt er utilgængelig.

1. Find kontakten **Vedligeholdelsestilstand**.
2. Klik på kontakten for at aktivere vedligeholdelsestilstand.
3. En advarselsdialog vises, der bekræfter handlingen.

**Når vedligeholdelsestilstand er aktiveret:**

| Effekt | Beskrivelse |
|--------|-------------|
| Admin portal-advarsel | Et tydeligt banner vises øverst i admin portalen, der indikerer, at vedligeholdelsestilstand er aktiv |
| Mobilapp-påvirkning | Mobilappen viser en vedligelholdelsesskærm til brugere, der forhindrer normal brug |
| API-adfærd | API-endpoints returnerer vedligeholdelsesstatus-svar |
| Admin-adgang | Administratorer kan stadig tilgå admin portalen normalt |

4. For at deaktivere vedligeholdelsestilstand, klik på kontakten igen.
5. Bekræft handlingen i dialogen.
6. Platformen vender øjeblikkeligt tilbage til normal drift.

> **Advarsel:** Aktivering af vedligeholdelsestilstand påvirker øjeblikkeligt alle mobilapp-brugere. Aktiver det kun under planlagte vedligeholdelsesvinduer og kommuniker tidsplanen på forhånd via push-notifikation.

---

## Fanen Notifikationer

Fanen Notifikationer styrer automatiseret notifikationsadfærd -- de systemgenererede advarsler, der sendes til brugere baseret på deres kæledyrsdata.

### Felter

| Felt | Beskrivelse | Type | Standard |
|------|-------------|------|---------|
| **Vaccinationspåmindelser** | Send automatiske påmindelser, når et kæledyrs vaccination nærmer sig forfaldsdato | Kontakt | Til |
| **Drægtighedsadvarsler** | Send advarsler for drægtighedsmilepælsdatoer og forventet fødsel | Kontakt | Til |
| **Avlsopdateringer** | Send opdateringer om avlsplanbegivenheder og bekræftelser | Kontakt | Til |
| **Påmindelsesdage før forfald** | Antal dage før en forfaldsdato, hvor påmindelsesnotifikationen sendes | Talinput | 7 |

### Konfigurering af notifikationsindstillinger

#### Vaccinationspåmindelser

1. Find kontakten **Vaccinationspåmindelser**.
2. Når **aktiveret** (standard):
   - Brugere modtager push-notifikationer før deres kæledyrs vaccinationsforfaldsdatoer.
   - Notifikationen sendes baseret på indstillingen "Påmindelsesdage før forfald".
   - Eksempel: Hvis sat til 7 dage, får brugere en påmindelse én uge før vaccinationen forfalder.
3. Når **deaktiveret**:
   - Ingen automatiske vaccinationspåmindelser sendes.
   - Brugere skal manuelt tjekke deres kæledyrs vaccinationsplan.

#### Drægtighedsadvarsler

1. Find kontakten **Drægtighedsadvarsler**.
2. Når **aktiveret** (standard):
   - Brugere, der sporer en drægtighed, modtager milepælsnotifikationer.
   - Advarsler inkluderer forventet fødselsdatopåmindelser og stadieovergange.
   - Opdrættere modtager yderligere professionelle sporingsnotifikationer.
3. Når **deaktiveret**:
   - Ingen automatiske drægtighedsrelaterede advarsler sendes.

#### Avlsopdateringer

1. Find kontakten **Avlsopdateringer**.
2. Når **aktiveret** (standard):
   - Brugere modtager notifikationer om planlagte avlsbegivenheder.
   - Bekræftelsesnotifikationer sendes, når avlsregistreringer logges.
   - Opdrættere modtager matchforslag og planpåmindelser.
3. Når **deaktiveret**:
   - Ingen automatiske avlsrelaterede notifikationer sendes.

#### Påmindelsesdage før forfald

1. Find talinputtet **Påmindelsesdage før forfald**.
2. Indtast antallet af dage før en forfaldsdato, hvor påmindelser skal sendes.
3. Denne værdi gælder for alle datobaserede påmindelser (vaccinationer, aftaler).
4. Gyldigt interval: 1 til 30 dage.

> **Tip:** En værdi på 7 dage fungerer godt for de fleste brugere. For opdrættere, der administrerer flere kæledyr, overvej at sætte den til 14 dage for at give mere forberedelsestid.

### Tabel over notifikationsinteraktioner

| Indstilling | Påvirker | Brugerpåvirkning |
|-------------|----------|------------------|
| Vaccinationspåmindelser TIL + 7 dage | Brugere med kæledyr med kommende vaccinationer | "Rex' rabiesvaccination forfalder om 7 dage" |
| Drægtighedsadvarsler TIL | Brugere med aktive drægtighedsregistreringer | "Lunas drægtighed er gået ind i uge 6" |
| Avlsopdateringer TIL | Brugere med planlagte parringer | "Avlsaftale med Max bekræftet til fredag" |
| Alle kontakter FRA | Alle brugere | Ingen automatiserede notifikationer; kun manuelle admin-notifikationer |

---

## Fanen Sikkerhed

Fanen Sikkerhed indeholder indstillinger, der styrer API-hastighedsbegrænsning, autentificeringstokenlevetider og filuploadrestriktioner.

### Felter

| Felt | Beskrivelse | Type | Standard |
|------|-------------|------|---------|
| **Hastighedsgrænse pr. minut** | Maksimale API-anmodninger tilladt pr. bruger pr. minut | Tal | 60 |
| **Access token-udløb (timer)** | Hvor længe et access token forbliver gyldigt | Tal | 24 |
| **Refresh token-udløb (dage)** | Hvor længe et refresh token forbliver gyldigt | Tal | 30 |
| **Maks. fotostørrelse (MB)** | Maksimal tilladt filstørrelse for kæledyrsfotos | Tal | 5 |
| **Maks. avatarstørrelse (MB)** | Maksimal tilladt filstørrelse for brugeravatarer | Tal | 2 |
| **Tilladte filtyper** | Kommasepareret liste over MIME-typer accepteret for uploads | Tekst | image/jpeg,image/png,image/webp |

### Konfigurering af sikkerhedsindstillinger

#### Hastighedsgrænse pr. minut

1. Find feltet **Hastighedsgrænse pr. minut**.
2. Indtast det maksimale antal API-anmodninger en enkelt bruger kan foretage pr. minut.
3. Anmodninger, der overskrider denne grænse, modtager et 429 (Too Many Requests)-svar.
4. Anbefalet interval: 30-120 afhængigt af forventede brugsmønstre.

> **Vigtigt:** At sætte dette for lavt kan forårsage, at mobilappen fejler for aktive brugere. At sætte det for højt kan efterlade systemet sårbart over for misbrug. Standarden på 60 er velegnet til de fleste installationer.

#### Access token-udløb (timer)

1. Find feltet **Access token-udløb**.
2. Indtast antallet af timer, et access token forbliver gyldigt efter udstedelse.
3. Når et token udløber, bruger appen refresh token til at opnå et nyt.
4. Kortere værdier er mere sikre; længere værdier reducerer login-friktion.

| Værdi | Sikkerhed | Brugeroplevelse |
|-------|----------|-----------------|
| 1 time | Høj | Hyppig gen-autentificering |
| 24 timer | Medium | God balance (anbefalet) |
| 72 timer | Lavere | Minimal afbrydelse |

#### Refresh token-udløb (dage)

1. Find feltet **Refresh token-udløb**.
2. Indtast antallet af dage, et refresh token forbliver gyldigt.
3. Når refresh token udløber, skal brugeren logge ind igen med deres legitimationsoplysninger.
4. Anbefalet interval: 7-90 dage.

> **Tip:** For en forbrugerapp som Petfolioo er 30 dage en god balance. Brugere, der åbner appen mindst månedligt, behøver aldrig at logge ind igen. For installationer med højere sikkerhedskrav, overvej 7 dage.

#### Maks. fotostørrelse (MB)

1. Find feltet **Maks. fotostørrelse**.
2. Indtast den maksimale filstørrelse i megabytes for kæledyrsfotouploads.
3. Fotos, der overskrider denne størrelse, afvises med en fejlbesked.
4. Overvej lageromkostninger og uploadtider for brugere på langsomme forbindelser.

| Værdi | Egnet til |
|-------|-----------|
| 2 MB | Lavt lagerforbrug, hurtige uploads, lavere kvalitet |
| 5 MB | Balanceret (anbefalet) |
| 10 MB | Højkvalitetsfotos, mere lagerforbrug |

#### Maks. avatarstørrelse (MB)

1. Find feltet **Maks. avatarstørrelse**.
2. Indtast den maksimale filstørrelse i megabytes for brugerprofil-avataruploads.
3. Avatarer er typisk mindre end kæledyrsfotos, da de vises i reduceret opløsning.
4. Anbefalet: 1-3 MB.

#### Tilladte filtyper

1. Find feltet **Tilladte filtyper**.
2. Indtast en kommasepareret liste over MIME-typer, som systemet accepterer til uploads.
3. Hver MIME-type skal være i formatet `type/subtype`.
4. Tilføj ikke mellemrum mellem poster, medmindre du bevidst ønsker dem i MIME-typestregen.

**Almindelige MIME-typer for billeduploads:**

| MIME-type | Format | Noter |
|-----------|--------|-------|
| `image/jpeg` | JPEG | Mest almindelige fotoformat, god komprimering |
| `image/png` | PNG | Tabsfri, understøtter gennemsigtighed |
| `image/webp` | WebP | Moderne format, fremragende komprimering |
| `image/heic` | HEIC | Apples format, bruges af iPhone-kameraer |
| `image/gif` | GIF | Animerede billeder, større filstørrelser |

**Eksempelkonfigurationer:**

```
Standard:     image/jpeg,image/png,image/webp
Udvidet:      image/jpeg,image/png,image/webp,image/heic,image/gif
Minimal:      image/jpeg,image/png
```

> **Advarsel:** Tilføjelse af ikke-understøttede MIME-typer kan tillade uploads, som systemet ikke kan behandle. Tilføj kun typer, som din billedbehandlingspipeline understøtter.

---

## Gemning af indstillinger

Alle indstillingsændringer kræver en eksplicit gemningshandling.

### Trin til at gemme

1. Foretag dine ønskede ændringer på tværs af enhver af de tre faner.
2. Klik på knappen **Gem indstillinger** i bunden af siden.
3. En indlæsningsindikator vises, mens ændringer anvendes.
4. En succesnotifikation bekræfter, at indstillingerne blev gemt.
5. Ændringer træder i kraft øjeblikkeligt på tværs af platformen.

### Vigtige noter om gemning

- Ændringer gemmes **ikke** automatisk. Hvis du navigerer væk uden at gemme, går ændringer tabt.
- Du kan ændre indstillinger på tværs af flere faner, før du gemmer -- alle ændringer gemmes samlet.
- Hvis en valideringsfejl opstår, fremhæves det specifikke felt med en fejlbesked.
- Kun felter, der er ændret, sendes til serveren (optimistisk delvis opdatering).

> **Tip:** Efter gemning af sikkerhedsrelaterede ændringer (hastighedsgrænser, token-udløb), overvåg systemet i en kort periode for at sikre, at der ikke opstår uventet adfærd.

---

## Indstillingsændringsrevision

Alle indstillingsændringer logges for sikkerhed og ansvarlighed:

| Logget information | Beskrivelse |
|--------------------|-------------|
| Admin-navn | Hvem der foretog ændringen |
| Tidsstempel | Hvornår ændringen blev foretaget |
| Ændret felt | Hvilken indstilling der blev ændret |
| Tidligere værdi | Værdien før ændringen |
| Ny værdi | Værdien efter ændringen |

---

## Fejlfinding

| Problem | Løsning |
|---------|---------|
| Kan ikke tilgå Indstillingssiden | Verificer, at din rolle er super_admin eller admin med tildelt Indstillingstilladelse. |
| Gem-knap deaktiveret | Ingen ændringer er foretaget. Ændr mindst ét felt for at aktivere gemning. |
| Valideringsfejl ved gemning | Tjek det fremhævede felt for den specifikke fejlbesked og ret værdien. |
| Vedligeholdelsestilstand påvirker ikke appen | Tillad 1-2 minutter for ændringen at udbrede sig til alle mobilapp-instanser. |
| Hastighedsgrænse for restriktiv | Øg værdien og gem. Påvirkede brugere vil blive frigjort inden for ét minut. |
| Filuploadfejl efter typeændring | Sørg for, at MIME-typerne er korrekt formateret uden efterfølgende kommaer eller mellemrum. |

---

## Relaterede sider

- [Administratorer](./admin-users.md) -- Administrer, hvem der kan tilgå og ændre indstillinger
- [Notifikationer](./notifications.md) -- Send manuelle notifikationer til brugere
- [Analyser](./analytics.md) -- Overvåg platformsundhed og -brug
