# Kæledyrskategorier

Modulet Kæledyrskategorier giver administratorer mulighed for at definere og administrere det klassifikationssystem, der bruges til at organisere kæledyr på Petfolioo-platformen. Kategorier repræsenterer kæledyrsarter eller -typer og bruges på tværs af applikationen til filtrering, søgning og organisering. Hver kategori inkluderer et navn, etiket, emoji-ikon, beskrivelse og aktiv status.

![Pet Categories](/docs/screenshots/categories.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Kategorioversigt

Kategorisiden viser alle definerede kæledyrskategorier i et tabelformat med administrationskontroller.

### Tabelkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Navn-slug | Maskinlæsbar identifikator (f.eks. `dog`, `cat`, `bird`) | Ja |
| Etiket | Menneskelæsbart visningsnavn (f.eks. "Hund", "Kat", "Fugl") | Ja |
| Emoji-ikon | Visuelt ikon, der repræsenterer kategorien | Nej |
| Beskrivelse | Kort beskrivelse af, hvad denne kategori inkluderer | Nej |
| Aktiv | Kontakt, der viser, om kategorien er aktiv | Ja |
| Handlinger | Rediger- og Slet-knapper | Nej |

### Statusindikatorer

| Aktiv tilstand | Visning | Betydning |
|----------------|---------|---------|
| Aktiv | Grøn kontakt (tændt position) | Kategorien er tilgængelig for kæledyrsregistrering og synlig i filtre |
| Inaktiv | Grå kontakt (slukket position) | Kategorien er skjult for brugere, men eksisterende kæledyr beholder deres kategori |

### Tabelfunktioner

1. **Sorter** ved at klikke på Navn-slug-, Etiket- eller Aktiv-kolonneoverskrifterne.
2. **Hurtig kontakt** ved at klikke direkte på Aktiv-kontakten i tabelrækken.
3. **Inline-handlinger** via Rediger (blyantikon) og Slet (papirkurvsikon) knapper i hver række.
4. **Sideinddeling** i bunden til gennemsyn, når mange kategorier eksisterer.

> **Tip:** Inaktive kategorier vises med en let udtonet rækkestil for visuelt at adskille dem fra aktive.

---

## Oprettelse af en kategori

Nye kategorier kan oprettes for at understøtte yderligere kæledyrsarter eller -typer på platformen.

### Trin til at oprette en kategori

1. Klik på knappen **Tilføj kategori** i øvre højre hjørne af Kategorisiden.
2. En oprettelsesformular vises (enten som dialog eller inline-formular).
3. Udfyld de påkrævede felter:

| Felt | Påkrævet | Beskrivelse | Eksempel |
|------|:--------:|-------------|---------|
| Navn-slug | Ja | Maskinlæsbar identifikator | `golden_fish` |
| Etiket | Ja | Visningsnavn vist til brugere | "Guldfisk" |
| Emoji-ikon | Ja | Visuelt ikon for kategorien | "fish" |
| Beskrivelse | Nej | Kort forklaring af kategorien | "Ferskvands- og saltvandsfisk" |
| Aktiv | Nej | Om den skal aktiveres straks (standard er aktiv) | Til |

4. Vælg et emoji-ikon fra **Emoji-vælgeren** (se nedenfor).
5. Gennemgå dine indtastninger.
6. Klik på **Opret kategori** for at gemme.
7. Den nye kategori vises i oversigtstabellen.

### Konvention for Navn-slug

Navn-slug'en skal følge disse regler:

| Regel | Beskrivelse | Eksempel |
|-------|-------------|---------|
| Kun små bogstaver | Ingen store bogstaver tilladt | `dog` ikke `Dog` |
| Understregninger for mellemrum | Brug understregninger til at adskille ord | `guinea_pig` ikke `guinea pig` |
| Alfanumerisk + understregning | Kun bogstaver, tal og understregninger | `cat_1` er gyldigt, `cat-1` er det ikke |
| Unik | Må ikke duplikere en eksisterende kategori-slug | Systemet afviser duplikater |
| Ingen indledende/afsluttende understregninger | Kan ikke starte eller slutte med understregning | `_dog_` er ugyldigt |
| Maksimalt 50 tegn | Hold slugs kortfattede | Korte, beskrivende identifikatorer |

> **Vigtigt:** Navn-slug'en kan ikke ændres efter oprettelse. Den bruges som permanent identifikator i databasen og API'en. Vælg omhyggeligt.

### Emoji-vælger

Emoji-vælgeren giver over 100 dyre- og naturikoner til kategoriidentifikation.

| Funktion | Beskrivelse |
|----------|-------------|
| Søgning | Skriv for at filtrere tilgængelige emojis efter nøgleord |
| Kategorier | Emojis organiseret efter gruppe (Dyr, Natur, Objekter) |
| Forhåndsvisning | Valgt emoji vist i stor forhåndsvisning før bekræftelse |
| Seneste | Tidligere brugte emojis vist øverst for hurtig adgang |

**Brug af Emoji-vælgeren:**

1. Klik på **emoji-ikonfeltet** for at åbne vælgeren.
2. Gennemse kategorier eller skriv et nøgleord i søgningen (f.eks. "dog", "fish", "bird").
3. Klik på den ønskede emoji for at vælge den.
4. Den valgte emoji vises i formularfeltet som en forhåndsvisning.
5. For at ændre dit valg, klik på feltet igen for at genåbne vælgeren.

Tilgængelige emoji-kategorier inkluderer:

| Gruppe | Eksempel-emojis |
|--------|----------------|
| Husdyr | Hund, Kat, Hamster, Kanin, Mus |
| Landbrugsdyr | Hest, Ko, Gris, Får, Ged, Kylling |
| Fugle | Papegøje, Ørn, Ugle, And, Flamingo, Påfugl |
| Krybdyr | Firben, Slange, Skildpadde, Krokodille, Dinosaur |
| Vandlevende | Fisk, Tropisk fisk, Hval, Delfin, Blæksprutte, Haj |
| Insekter | Sommerfugl, Bi, Bille, Myre, Fårekylling |
| Vildt | Løve, Tiger, Bjørn, Abe, Elefant, Giraf |
| Pote/Generelt | Poteaftryk, Knogle, Hjerte, Stjerne |

---

## Redigering af kategorier

Eksisterende kategorier kan ændres for at opdatere deres etiket, ikon, beskrivelse eller aktiv status.

### Trin til at redigere en kategori

1. Find den kategori, du vil redigere, i oversigtstabellen.
2. Klik på knappen **Rediger** (blyantikon) i rækkens Handlinger-kolonne.
3. En redigeringsformular vises med de aktuelle værdier udfyldt på forhånd.
4. Ændr et af de redigerbare felter:

| Felt | Redigerbar | Noter |
|------|:----------:|-------|
| Navn-slug | Nej | Kan ikke ændres efter oprettelse |
| Etiket | Ja | Opdater visningsnavnet |
| Emoji-ikon | Ja | Vælg en ny emoji fra vælgeren |
| Beskrivelse | Ja | Opdater eller tilføj en beskrivelse |
| Aktiv | Ja | Skift aktiv/inaktiv status |

5. Foretag dine ændringer.
6. Klik på **Gem ændringer** for at anvende.
7. En succesnotifikation bekræfter opdateringen.
8. Oversigtstabellen afspejler ændringerne øjeblikkeligt.

### Redigeringsovervejelser

| Overvejelse | Detalje |
|-------------|---------|
| Etiketændringer | Afspejles øjeblikkeligt i hele appen for alle brugere |
| Emoji-ændringer | Opdateret alle steder i brugergrænsefladen, hvor kategorien vises |
| Beskrivelsesændringer | Synlige i kategorivalgsskærme i appen |
| Eksisterende kæledyr | Kæledyr, der allerede er tildelt denne kategori, påvirkes ikke af redigeringer |

> **Bemærk:** Ændring af en kategoris etiket ændrer ikke dens slug. Slug'en forbliver den permanente identifikator. Brugere og kæledyr refererer til kategorier via slug internt.

---

## Aktivering og deaktivering af kategorier

Kategorier kan skiftes mellem aktiv og inaktiv tilstand uden sletning.

### Aktivering af en kategori

1. Find den inaktive kategori i oversigten (vist med grå kontakt).
2. Klik på **kontakten** i Aktiv-kolonnen for at skifte den til tændt position.
3. Alternativt, klik på Rediger og skift Aktiv-feltet i redigeringsformularen.
4. Bekræft handlingen, hvis du bliver bedt om det.
5. Kategorien bliver tilgængelig for kæledyrsregistrering øjeblikkeligt.

### Deaktivering af en kategori

1. Find den aktive kategori i oversigten (vist med grøn kontakt).
2. Klik på **kontakten** for at skifte den til slukket position.
3. En bekræftelsesdialog vises, der forklarer påvirkningen.
4. Klik på **Bekræft deaktivering**.
5. Kategorien skjules fra nye kæledyrsregistreringer.

### Påvirkning af deaktivering

| Påvirkningsområde | Effekt |
|-------------------|--------|
| Nye registreringer | Kategorien vises ikke længere i artsvalgsrullemenuer |
| Eksisterende kæledyr | Kæledyr, der allerede er tildelt denne kategori, beholder deres tildeling |
| Filtre | Kategorien vises ikke længere i filterrullemenuer for offentlige brugere |
| Admin portal | Kategorien er stadig synlig i admin med inaktiv stil |
| API-svar | Kategorien udelades fra aktive kategorilister |
| Genaktivering | Kan genaktiveres når som helst og gendanner fuld funktionalitet |

> **Tip:** Deaktivering foretrækkes frem for sletning, når du midlertidigt vil skjule en kategori, eller når eksisterende kæledyr stadig bruger den. Det bevarer dataintegritet og begrænser samtidig ny brug.

---

## Knappen Standard-seed

Standard-seed-funktionen udfylder kategoritabellen med et foruddefineret sæt almindelige kæledyrskategorier. Dette er nyttigt til indledende platformopsætning eller gendannelse af standardkategorier.

### Brug af Standard-seed

1. Klik på knappen **Standard-seed** placeret over eller under kategoritabellen.
2. En bekræftelsesdialog vises med de kategorier, der vil blive oprettet.
3. Gennemgå listen over standardkategorier.
4. Klik på **Bekræft seed** for at fortsætte.
5. Standardkategorier oprettes og vises i oversigten.

### Standardkategorisæt

Seed'et opretter følgende standardkategorier (hvis de ikke allerede eksisterer):

| Navn-slug | Etiket | Emoji | Beskrivelse |
|-----------|--------|:-----:|-------------|
| `dog` | Hund | Hundeansigt | Husdyr af alle racer |
| `cat` | Kat | Katteansigt | Huskatte af alle racer |
| `bird` | Fugl | Fugl | Kæledyrsfugle inkl. papegøjer, kanarifugle og finker |
| `rabbit` | Kanin | Kaninansigt | Huskaniner |
| `hamster` | Hamster | Hamsteransigt | Hamstere, gerbiler og lignende smågnagere |
| `fish` | Fisk | Fisk | Ferskvands- og saltvandsakvariefisk |
| `turtle` | Skildpadde | Skildpadde | Skildpadder og landskildpadder |
| `snake` | Slange | Slange | Ikke-giftige kæledyrsslanger |
| `lizard` | Firben | Firben | Gekkoer, iguaner og andre kæledyrsfirben |
| `horse` | Hest | Hesteansigt | Heste og ponyer |
| `guinea_pig` | Marsvin | Marsvin | Marsvin og caviaer |
| `ferret` | Fritte | Fritte | Husfritter |

### Seed-adfærd

| Scenarie | Adfærd |
|----------|--------|
| Tom tabel | Alle standarder oprettes |
| Nogle standarder eksisterer | Kun manglende standarder oprettes (ingen duplikater) |
| Alle standarder eksisterer | Ingen ændringer foretages, bekræftelsesbesked vises |
| Brugerdefinerede kategorier eksisterer | Brugerdefinerede kategorier påvirkes ikke |

> **Bemærk:** Knappen Standard-seed sletter eller ændrer ikke eksisterende kategorier. Den tilføjer kun manglende standardposter. Dine brugerdefinerede kategorier er sikre.

---

## Sletning af en kategori

Kategorier kan slettes permanent, når de ikke længere er nødvendige. Denne handling kræver omhyggelig overvejelse på grund af dens påvirkning på eksisterende data.

### Trin til at slette en kategori

1. Find kategorien i oversigtstabellen.
2. Klik på knappen **Slet** (papirkurvsikon) i rækkens Handlinger-kolonne.
3. En advarselsdialog vises med:
   - Kategorinanvnet og det aktuelle antal kæledyr, der bruger denne kategori
   - En advarsel om påvirkningen på eksisterende kæledyr
   - Et tekstbekræftelsesfelt (skriv kategori-slug'en for at bekræfte)
4. Læs advarslen omhyggeligt.
5. Skriv kategoriens **navn-slug** i bekræftelsesfeltet.
6. Klik på **Slet kategori** for permanent at fjerne den.

### Påvirkning af sletning

| Påvirkningsområde | Effekt |
|-------------------|--------|
| Kategoripost | Fjernes permanent fra databasen |
| Eksisterende kæledyr | Kæledyr, der tidligere var i denne kategori, bliver **ukategoriserede** |
| Kæledyrsprofiler | Artsfeltet viser "Ukategoriseret" eller tomt |
| Filtre | Kategorien fjernes fra alle filterrullemenuer |
| Analyser | Historiske data kan vise "Ukendt kategori" for tidligere registreringer |
| Reversibilitet | Kan ikke fortrydes (skal genskabes manuelt, hvis nødvendigt) |

### Kæledyr bliver ukategoriserede

Når en kategori slettes:

1. Alle kæledyr tildelt den kategori mister deres kategoritildeling.
2. Disse kæledyr vises med en "Ukategoriseret"-etiket i Kæledyrsregistret.
3. Kæledyrsejere underrettes **ikke** automatisk.
4. Administratorer kan gentildele ukategoriserede kæledyr til en anden kategori via masseredigering.
5. Antal kæledyr for den slettede kategori vises i sletningsbekræftelsesdialogen.

> **Vigtigt:** Sletning af en kategori med aktive kæledyr tildelt vil efterlade disse kæledyr ukategoriserede. Overvej at deaktivere kategorien i stedet, eller gentildel kæledyr før sletning.

### Sletningsbegrænsninger

| Begrænsning | Beskrivelse |
|-------------|-------------|
| Standardkategorier | Seedede standardkategorier kan slettes (de kan gen-seedes) |
| Aktive kæledyr | Kategorier med kæledyr kan slettes (kæledyr bliver ukategoriserede) |
| Bekræftelse påkrævet | Slug skal indtastes for at bekræfte sletning |
| Rollekrav | Kun `super_admin`- og `admin`-roller kan slette kategorier |

---

## Bedste praksis

### Retningslinjer for kategoriadministration

1. **Brug klare, simple etiketter** - Kategorietiketter bør være umiddelbart forståelige for alle brugere uanset sprogfærdigheder.
2. **Vælg repræsentative emojis** - Vælg emojis, der klart repræsenterer dyretypen for hurtig visuel genkendelse.
3. **Skriv hjælpsomme beskrivelser** - Beskrivelser hjælper brugere med at vælge den korrekte kategori, når de registrerer deres kæledyr.
4. **Deaktiver før sletning** - Hvis du er usikker på, om en kategori er nødvendig, deaktiver den først. Slet kun, når du er sikker.
5. **Hold slugs beskrivende** - Da slugs ikke kan ændres, vælg dem omhyggeligt under oprettelse.
6. **Overvåg ukategoriserede kæledyr** - Tjek regelmæssigt for kæledyr uden kategorier og tildel dem passende.

### Eksempler på kategorinavngivning

| Godt | Dårligt | Hvorfor |
|------|---------|---------|
| `guinea_pig` | `gp` | Beskrivende og læsbart |
| `tropical_fish` | `tropicalFish` | Følger understregningskonventionen |
| `parrot` | `Parrot_1` | Små bogstaver, ingen tal nødvendige |
| `persian_cat` | `cat_breed_persian` | Kortfattet, raceniveau når nødvendigt |

---

## Ofte stillede spørgsmål

**Sp: Kan jeg flette to kategorier?**
Sv: Der er ingen indbygget flettefunktion. For at konsolidere kategorier, gentildel kæledyr fra én kategori til en anden, og slet derefter den tomme kategori.

**Sp: Hvad sker der med filtre, når jeg deaktiverer en kategori?**
Sv: Kategorien fjernes fra brugervendte filterrullemenuer, men forbliver tilgængelig i admin portalens filtre til administrationsformål.

**Sp: Kan jeg omordne kategorier?**
Sv: Kategorier vises alfabetisk efter etiket i brugervendte grænseflader. Admin-tabellen kan sorteres efter enhver kolonneoverskrift.

**Sp: Er der en grænse for, hvor mange kategorier jeg kan oprette?**
Sv: Der er ingen hård teknisk grænse, men for brugervenlighed, hold det samlede antal håndterbart (under 30 anbefales), så brugere nemt kan finde den korrekte kategori.

---

*Forrige: [App-brugere](./users.md)*
