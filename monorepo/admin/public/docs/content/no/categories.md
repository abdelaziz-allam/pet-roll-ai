# Kjaeledyrkategorier

Kjaeledyrkategorier-modulen lar administratorer definere og administrere klassifiseringssystemet som brukes til a organisere kjaeledyr pa Petfolioo-plattformen. Kategorier representerer kjaeledyrarter eller -typer og brukes pa tvers av applikasjonen for filtrering, sok og organisering. Hver kategori inkluderer et navn, etikett, emoji-ikon, beskrivelse og aktiv status.

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

## Kategoriliste

Kategorisiden viser alle definerte kjaeledyrkategorier i tabellformat med administrasjonskontroller.

### Tabellkolonner

| Kolonne | Beskrivelse | Sorterbar |
|---------|-------------|:---------:|
| Navne-slug | Maskinlesbar identifikator (f.eks. `dog`, `cat`, `bird`) | Ja |
| Etikett | Menneskelesbart visningsnavn (f.eks. "Dog", "Cat", "Bird") | Ja |
| Emoji-ikon | Visuelt ikon som representerer kategorien | Nei |
| Beskrivelse | Kort beskrivelse av hva denne kategorien inkluderer | Nei |
| Aktiv | Bryterknapp som viser om kategorien er aktiv | Ja |
| Handlinger | Rediger- og Slett-knapper | Nei |

### Statusindikatorer

| Aktiv tilstand | Visning | Betydning |
|----------------|---------|-----------|
| Aktiv | Gronn bryter (pa-posisjon) | Kategorien er tilgjengelig for kjaeledyrregistrering og synlig i filtre |
| Inaktiv | Gra bryter (av-posisjon) | Kategorien er skjult for brukere, men eksisterende kjaeledyr beholder sin kategori |

### Tabellfunksjoner

1. **Sorter** ved a klikke pa kolonneoverskriftene Navne-slug, Etikett eller Aktiv.
2. **Hurtigveksling** ved a klikke pa Aktiv-bryteren direkte i tabellraden.
3. **Innebygde handlinger** via Rediger (blyantikon) og Slett (papirkurvikon) knapper i hver rad.
4. **Paginering** nederst for blaing nar mange kategorier finnes.

> **Tips:** Inaktive kategorier vises med en litt falmet radstil for a visuelt skille dem fra aktive.

---

## Opprette en kategori

Nye kategorier kan opprettes for a stotte flere kjaeledyrarter eller -typer pa plattformen.

### Trinn for a opprette en kategori

1. Klikk pa **Legg til kategori**-knappen i ovre hoyre hjorne av Kategorier-siden.
2. Et opprettelsesskjema vises (enten som en modal eller innebygd skjema).
3. Fyll inn de obligatoriske feltene:

| Felt | Obligatorisk | Beskrivelse | Eksempel |
|------|:------------:|-------------|----------|
| Navne-slug | Ja | Maskinlesbar identifikator | `golden_fish` |
| Etikett | Ja | Visningsnavn vist til brukere | "Golden Fish" |
| Emoji-ikon | Ja | Visuelt ikon for kategorien | "fish" |
| Beskrivelse | Nei | Kort forklaring av kategorien | "Ferskvann- og saltvannsfiskearter" |
| Aktiv | Nei | Om den skal aktiveres umiddelbart (standard er aktiv) | Pa |

4. Velg et emoji-ikon fra **Emoji-velgeren** (se nedenfor).
5. Gjennomga oppforingene dine.
6. Klikk **Opprett kategori** for a lagre.
7. Den nye kategorien vises i listetabellen.

### Navne-slug-konvensjon

Navne-slugen ma folge disse reglene:

| Regel | Beskrivelse | Eksempel |
|-------|-------------|----------|
| Kun sma bokstaver | Ingen store bokstaver tillatt | `dog` ikke `Dog` |
| Understrek for mellomrom | Bruk understrek for a skille ord | `guinea_pig` ikke `guinea pig` |
| Alfanumerisk + understrek | Kun bokstaver, tall og understrek | `cat_1` er gyldig, `cat-1` er ikke |
| Unik | Ma ikke duplisere en eksisterende kategori-slug | Systemet vil avvise duplikater |
| Ingen ledende/etterfolgene understrek | Kan ikke starte eller slutte med understrek | `_dog_` er ugyldig |
| Maksimalt 50 tegn | Hold slugs kortfattede | Korte, beskrivende identifikatorer |

> **Viktig:** Navne-slugen kan ikke endres etter opprettelse. Den brukes som permanent identifikator i databasen og API. Velg med omhu.

### Emoji-velger

Emoji-velgeren tilbyr over 100 dyre- og naturikoner for kategoriidentifikasjon.

| Funksjon | Beskrivelse |
|----------|-------------|
| Sok | Skriv for a filtrere tilgjengelige emojier etter nokelord |
| Kategorier | Emojier organisert etter gruppe (Dyr, Natur, Objekter) |
| Forhandsvisning | Valgt emoji vises i stor forhandsvisning for bekreftelse |
| Nylige | Tidligere brukte emojier vises overst for rask tilgang |

**Bruke emoji-velgeren:**

1. Klikk pa **emoji-ikonfeltet** for a apne velgeren.
2. Bla gjennom kategorier eller skriv et nokelord i soket (f.eks. "dog", "fish", "bird").
3. Klikk pa onsket emoji for a velge den.
4. Den valgte emojien vises i skjemafeltet som en forhandsvisning.
5. For a endre valget ditt, klikk pa feltet igjen for a gjenapne velgeren.

Tilgjengelige emoji-kategorier inkluderer:

| Gruppe | Eksempel-emojier |
|--------|-----------------|
| Husdyr | Hund, Katt, Hamster, Kanin, Mus |
| Gardsdyr | Hest, Ku, Gris, Sau, Geit, Kylling |
| Fugler | Papegøye, Ørn, Ugle, And, Flamingo, Pafugl |
| Reptiler | Øgle, Slange, Skilpadde, Krokodille, Dinosaur |
| Akvatiske | Fisk, Tropisk fisk, Hval, Delfin, Blekksprut, Hai |
| Insekter | Sommerfugl, Bie, Bille, Maur, Gresshoppe |
| Ville dyr | Love, Tiger, Bjorn, Ape, Elefant, Sjiraff |
| Pote/Generisk | Poteavtrykk, Bein, Hjerte, Stjerne |

---

## Redigere kategorier

Eksisterende kategorier kan endres for a oppdatere etikett, ikon, beskrivelse eller aktiv status.

### Trinn for a redigere en kategori

1. Finn kategorien du vil redigere i listetabellen.
2. Klikk pa **Rediger**-knappen (blyantikon) i radens Handlinger-kolonne.
3. Et redigeringsskjema vises forhands utfylt med gjeldende verdier.
4. Endre noen av de redigerbare feltene:

| Felt | Redigerbar | Merknader |
|------|:----------:|-----------|
| Navne-slug | Nei | Kan ikke endres etter opprettelse |
| Etikett | Ja | Oppdater visningsnavnet |
| Emoji-ikon | Ja | Velg en ny emoji fra velgeren |
| Beskrivelse | Ja | Oppdater eller legg til en beskrivelse |
| Aktiv | Ja | Veksle aktiv/inaktiv status |

5. Gjor endringene dine.
6. Klikk **Lagre endringer** for a bruke.
7. En suksessmelding bekrefter oppdateringen.
8. Listetabellen reflekterer endringene umiddelbart.

### Redigeringshensyn

| Hensyn | Detalj |
|--------|--------|
| Etikettendringer | Reflekteres umiddelbart pa tvers av appen for alle brukere |
| Emoji-endringer | Oppdatert i alle UI-plasseringer der kategorien vises |
| Beskrivelsesendringer | Synlig i kategorivalgskjermer i appen |
| Eksisterende kjaeledyr | Kjaeledyr som allerede er tildelt denne kategorien pavirkes ikke av endringer |

> **Merk:** Endring av en kategoris etikett endrer ikke dens slug. Slugen forblir den permanente identifikatoren. Brukere og kjaeledyr refererer til kategorier via slug internt.

---

## Aktivere og deaktivere kategorier

Kategorier kan veksles mellom aktiv og inaktiv tilstand uten sletting.

### Aktivere en kategori

1. Finn den inaktive kategorien i listen (vist med gra bryter).
2. Klikk pa **bryteren** i Aktiv-kolonnen for a sla den til pa-posisjon.
3. Alternativt, klikk Rediger og veksle Aktiv-feltet i redigeringsskjemaet.
4. Bekreft handlingen hvis du blir bedt om det.
5. Kategorien blir tilgjengelig for kjaeledyrregistrering umiddelbart.

### Deaktivere en kategori

1. Finn den aktive kategorien i listen (vist med gronn bryter).
2. Klikk pa **bryteren** for a sla den til av-posisjon.
3. En bekreftelsesdialog vises som forklarer virkningen.
4. Klikk **Bekreft deaktivering**.
5. Kategorien skjules fra nye kjaeledyrregistreringer.

### Virkning av deaktivering

| Virkningsomrade | Effekt |
|-----------------|--------|
| Nye registreringer | Kategorien vises ikke lenger i artsvalg-rullegardinmenyer |
| Eksisterende kjaeledyr | Kjaeledyr som allerede er tildelt denne kategorien beholder sin tildeling |
| Filtre | Kategorien vises ikke lenger i filterrullegardinmenyer for offentlige brukere |
| Adminportalen | Kategorien er fortsatt synlig i admin med inaktiv styling |
| API-responser | Kategorien ekskluderes fra aktive kategorilister |
| Reaktivering | Kan reaktiveres nar som helst, gjenoppretter full funksjonalitet |

> **Tips:** Deaktivering foretrekkes fremfor sletting nar du vil midlertidig skjule en kategori eller nar eksisterende kjaeledyr fortsatt bruker den. Det bevarer dataintegritet mens ny bruk begrenses.

---

## Standardverdier-knapp

Standardverdier-funksjonen fyller kategoritabellen med et forhands definert sett med vanlige kjaeledyrkategorier. Dette er nyttig for forste plattformoppsett eller gjenoppretting av standardkategorier.

### Bruke standardverdier

1. Klikk pa **Standardverdier**-knappen plassert over eller under kategoritabellen.
2. En bekreftelses-modal vises som lister kategoriene som vil bli opprettet.
3. Gjennomga listen over standardkategorier.
4. Klikk **Bekreft standardverdier** for a fortsette.
5. Standardkategorier opprettes og vises i listen.

### Standard kategorisett

Standardverdier oppretter folgende standardkategorier (hvis de ikke allerede eksisterer):

| Navne-slug | Etikett | Emoji | Beskrivelse |
|------------|---------|:-----:|-------------|
| `dog` | Dog | Hundefjes | Husdyr av alle raser |
| `cat` | Cat | Kattefjes | Husdyr av alle raser |
| `bird` | Bird | Fugl | Kjaeledyrfugler inkludert papegøyer, kanarifugler og finker |
| `rabbit` | Rabbit | Kaninfjes | Tamkaniner |
| `hamster` | Hamster | Hamsterfjes | Hamstere, mus og lignende sma gnagere |
| `fish` | Fish | Fisk | Ferskvann- og saltvannsakvariefisk |
| `turtle` | Turtle | Skilpadde | Skilpadder |
| `snake` | Snake | Slange | Ikke-giftige kjaeledyrslanger |
| `lizard` | Lizard | Ogle | Gekkoer, iguaner og andre kjaeledyrogler |
| `horse` | Horse | Hestefjes | Hester og ponnier |
| `guinea_pig` | Guinea Pig | Marsvin | Marsvin |
| `ferret` | Ferret | Ilder | Tamme ildere |

### Standardverdier-atferd

| Scenario | Atferd |
|----------|--------|
| Tom tabell | Alle standarder opprettes |
| Noen standarder eksisterer | Kun manglende standarder opprettes (ingen duplikater) |
| Alle standarder eksisterer | Ingen endringer gjores, bekreftelsesmelding vises |
| Egendefinerte kategorier eksisterer | Egendefinerte kategorier pavirkes ikke |

> **Merk:** Standardverdier-knappen sletter eller endrer ikke eksisterende kategorier. Den legger kun til manglende standardoppforinger. Dine egendefinerte kategorier er trygge.

---

## Slette en kategori

Kategorier kan permanent slettes nar de ikke lenger trengs. Denne handlingen krever noe omtanke pa grunn av dens virkning pa eksisterende data.

### Trinn for a slette en kategori

1. Finn kategorien i listetabellen.
2. Klikk pa **Slett**-knappen (papirkurvikon) i radens Handlinger-kolonne.
3. En advarsels-modal vises med:
   - Kategorinavnet og gjeldende antall kjaeledyr som bruker denne kategorien
   - En advarsel om virkningen pa eksisterende kjaeledyr
   - Et tekstbekreftelse-felt (skriv kategori-slugen for a bekrefte)
4. Les advarselen noye.
5. Skriv kategoriens **navne-slug** i bekreftelsesfeltet.
6. Klikk **Slett kategori** for a permanent fjerne den.

### Virkning av sletting

| Virkningsomrade | Effekt |
|-----------------|--------|
| Kategoripost | Permanent fjernet fra databasen |
| Eksisterende kjaeledyr | Kjaeledyr som tidligere var i denne kategorien blir **ukategorisert** |
| Kjaeledyrprofiler | Artsfelt viser "Ukategorisert" eller tomt |
| Filtre | Kategorien fjernes fra alle filterrullegardinmenyer |
| Analyser | Historiske data kan vise "Ukjent kategori" for tidligere poster |
| Reverserbarhet | Kan ikke angres (ma gjenskapes manuelt hvis nodvendig) |

### Kjaeledyr blir ukategorisert

Nar en kategori slettes:

1. Alle kjaeledyr tildelt den kategorien mister sin kategoritilordning.
2. Disse kjaeledyrene vises med en "Ukategorisert"-etikett i Kjaeledyrregisteret.
3. Kjaeledyreiere blir **ikke** automatisk varslet.
4. Administratorer kan tilordne ukategoriserte kjaeledyr til en annen kategori gjennom masseredigering.
5. Kjaeledyrantallet for den slettede kategorien vises i slettingbekreftelse-modalen.

> **Viktig:** Sletting av en kategori med aktive kjaeledyr tildelt vil etterlate disse kjaeledyrene som ukategoriserte. Vurder a deaktivere kategorien i stedet, eller tilordne kjaeledyr pa nytt for sletting.

### Slettebegrensninger

| Begrensning | Beskrivelse |
|-------------|-------------|
| Standardkategorier | Standardkategorier kan slettes (de kan gjenseedes) |
| Aktive kjaeledyr | Kategorier med kjaeledyr kan slettes (kjaeledyr blir ukategorisert) |
| Bekreftelse pakreves | Slug ma skrives inn for a bekrefte sletting |
| Rollekrav | Kun `super_admin`- og `admin`-roller kan slette kategorier |

---

## Beste praksis

### Retningslinjer for kategoriadministrasjon

1. **Bruk klare, enkle etiketter** - Kategorietiketter bor vaere umiddelbart forstaelige for alle brukere uavhengig av sprakferdigheter.
2. **Velg representative emojier** - Velg emojier som tydelig representerer dyretypen for rask visuell gjenkjennelse.
3. **Skriv nyttige beskrivelser** - Beskrivelser hjelper brukere a velge riktig kategori nar de registrerer kjaeledyret sitt.
4. **Deaktiver for sletting** - Hvis du er usikker pa om en kategori trengs, deaktiver den forst. Slett kun nar du er sikker.
5. **Hold slugs beskrivende** - Siden slugs ikke kan endres, velg dem noye under opprettelse.
6. **Overvik ukategoriserte kjaeledyr** - Sjekk jevnlig for kjaeledyr uten kategorier og tildel dem riktig.

### Eksempler pa kategorinavngiving

| Bra | Darlig | Hvorfor |
|-----|--------|---------|
| `guinea_pig` | `gp` | Beskrivende og lesbar |
| `tropical_fish` | `tropicalFish` | Folger understrek-konvensjonen |
| `parrot` | `Parrot_1` | Sma bokstaver, ingen tall nodvendig |
| `persian_cat` | `cat_breed_persian` | Kortfattet, raseniva nar nodvendig |

---

## Ofte stilte sporsmal

**Sp: Kan jeg sla sammen to kategorier?**
Sv: Det finnes ingen innebygd sammenslafunksjon. For a konsolidere kategorier, tilordne kjaeledyr fra en kategori til en annen, og slett deretter den tomme kategorien.

**Sp: Hva skjer med filtre nar jeg deaktiverer en kategori?**
Sv: Kategorien fjernes fra brukervendte filterrullegardinmenyer, men forblir tilgjengelig i adminportalens filtre for administrasjonsformal.

**Sp: Kan jeg omorganisere kategorier?**
Sv: Kategorier vises alfabetisk etter etikett i brukervendte grensesnitt. Admintabellen kan sorteres etter enhver kolonneoverskrift.

**Sp: Er det en grense for hvor mange kategorier jeg kan opprette?**
Sv: Det er ingen hard teknisk grense, men for brukervennlighet, hold totalt antall handterbart (under 30 anbefales) slik at brukere enkelt kan finne riktig kategori.

---

*Forrige: [Appbrukere](./users.md)*
