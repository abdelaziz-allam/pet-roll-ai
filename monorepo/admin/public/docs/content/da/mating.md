# Avlsmarkedsplads

Modulet Avlsmarkedsplads giver administratorer overblik over platformens matchmaking-system til kæledyrsavl. Overvåg matchanmodninger, spor succesfulde parringer og se opdrætterrangeringer.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Navigationsfaner

Avlsmarkedsplads-siden er organiseret i to hovedfaner:

| Fane | Beskrivelse |
|------|-------------|
| Matches og anmodninger | Se og administrer alle avlsmatches og afventende anmodninger |
| Opdrætterrangeringer | Ranglister over de bedst præsterende opdrættere |

Skift mellem faner ved at klikke på faneoverskriften øverst på siden.

---

## Fanen Matches og anmodninger

Denne fane viser alle avlsmatches som visuelle kort, der giver et intuitivt overblik over avlsaktiviteten på platformen.

### Matchkort

Hvert match er repræsenteret som et kort, der viser to kæledyr forbundet med en visuel hjerte-forbindelse.

#### Kortlayout

```
+------------------------------------------+
|  [Kæledyr A foto]  <3  [Kæledyr B foto] |
|  Kæledyr A navn        Kæledyr B navn    |
|  Race                  Race              |
|  Ejer                  Ejer              |
|                                          |
|  Status: [Badge]     Oprettet: [Dato]    |
|  Art: [Tag]          Placering: [By]     |
+------------------------------------------+
```

#### Kortinformation

| Element | Beskrivelse |
|---------|-------------|
| Kæledyrsfotos | Profilfotos af begge kæledyr i matchet |
| Hjerteforbindelse | Visuel forbindelse mellem de to kæledyr (animeret for aktive matches) |
| Kæledyrsnavne | Navne på begge kæledyr |
| Racer | Raceinformation for hvert kæledyr |
| Ejere | Ejernavne (klikbare for at se profiler) |
| Statusbadge | Aktuel matchstatus |
| Oprettelsesdato | Hvornår matchanmodningen blev oprettet |
| Artstag | Art for kæledyrene |
| Placering | By/land for opslaget |

### Matchstatusser

| Status | Badge-farve | Beskrivelse |
|--------|-------------|-------------|
| Afventende | Orange | Matchanmodning sendt, afventer svar |
| Accepteret | Grøn | Begge parter har accepteret matchet |
| Afvist | Rød | En part har afvist matchet |
| Gennemført | Blå | Parring bekræftet som gennemført |
| Annulleret | Grå | Matchet blev annulleret af en af parterne |
| Udløbet | Lysegrå | Anmodningen udløb uden svar |

---

## Filtre

Filterbjælken giver dig mulighed for at indsnævre de viste matches.

### Statusfilter

Vælg en eller flere statusser at vise:

1. Klik på **Status**-rullelisten.
2. Marker de statusser, du vil se.
3. Kortgitteret opdateres øjeblikkeligt.

### Artsfilter

Filtrer matches efter kæledyrsart:

- Alle arter (standard)
- Hund
- Kat
- Fugl
- Kanin
- Andet

### Landefilter

Vælg et eller flere lande at filtrere efter matchplacering.

### Byfilter

Indsnævr yderligere ved at vælge specifikke byer.

> **Tip:** Brug Status: Accepteret + dit land for at se succesfulde matches i din region, der muligvis har brug for handlingen "Send bryllupskort".

---

## Detaljevisning

Klik på et matchkort for at åbne detaljevisningen i højre side af skærmen.

### Kæledyrsfotosektion

Øverst i visningen vises større versioner af begge kæledyrsfotos side om side med hjerteforbindelsen imellem dem.

- Klik på et foto for at se det i fuld størrelse.
- Swipe gennem yderligere fotos, hvis kæledyret har et galleri.

### Opslagsinformation

| Felt | Beskrivelse |
|------|-------------|
| Opslags-ID | Unik identifikator for matchopslaget |
| Oprettet af | Hvilken kæledyrsejer der initierede opslaget |
| Oprettelsesdato | Dato for opslagets første publicering |
| Matchdato | Dato matchet blev foreslået |
| Svardato | Dato matchet blev accepteret/afvist (hvis relevant) |
| Art | Art for begge kæledyr |
| Racer | Detaljeret raceinformation |
| Placering | Fulde placeringsdetaljer |
| Noter | Eventuelle noter fra opslagejerens |

### Matchtidslinje

Visningen inkluderer en kronologisk tidslinje over begivenheder:

1. **Opslag oprettet** -- Ejer publicerede sit kæledyrs avlsopslag
2. **Match foreslået** -- Matchalgoritmen eller manuel anmodning initierede matchet
3. **Match set** -- Den anden part så matchforslaget
4. **Svar givet** -- Accept/afvisning med tidsstempel
5. **Gennemførelse registreret** -- Hvis parring blev bekræftet gennemført
6. **Bryllupskort sendt** -- Hvis admin sendte en festlig notifikation

Hver tidslinjebegivenhed viser:

- Dato og tid
- Aktør (system, ejer A, ejer B eller admin)
- Begivenhedsbeskrivelse
- Yderligere noter (hvis nogen)

> **Tip:** Tidslinjen hjælper dig med at forstå den fulde kontekst af et match, når du undersøger tvister eller problemer rapporteret af brugere.

---

## Send bryllupskort

Handlingen "Send bryllupskort" giver administratorer mulighed for at sende en festlig notifikation til begge kæledyrsejere, når et match accepteres eller gennemføres.

### Sådan sender du et bryllupskort

1. Åbn detaljevisningen for et **Accepteret** eller **Gennemført** match.
2. Klik på knappen **Send bryllupskort** i bunden af visningen.
3. I dialogen:
   - Forhåndsvis notifikationsbeskeden (autogenereret med begge kæledyrsnavne).
   - Tilføj eventuelt en personlig lykønskningsbesked.
   - Gennemgå modtagerne (begge kæledyrsejere).
4. Klik på **Send**.

### Hvad bryllupskortet indeholder

- Lykønskningsoverskrift med begge kæledyrsnavne
- Kæledyrsfotos arrangeret med dekorative elementer
- Matchdato og -placering
- Personlig adminbesked (hvis angivet)
- Link til matchdetaljesiden

### Hvornår sende

- Efter et match er accepteret, og begge parter bekræfter, at de fortsætter.
- Efter et match er markeret som gennemført.
- Kun én gang pr. match (knappen deaktiveres efter afsendelse).

> **Tip:** Bryllupskort er et fællesskabsengageringsværktøj. At sende dem for accepterede matches opmuntrer til platformdeltagelse og skaber en positiv oplevelse for opdrættere.

---

## Fanen Opdrætterrangeringer

Fanen Opdrætterrangeringer fremviser de mest aktive og succesfulde opdrættere på platformen.

### Samlet top 10-podium

Øverst på fanen Rangeringer fremhæver en podievisualisering de 10 bedste opdrættere på tværs af alle arter.

#### Podielayout

```
              [1.]
        [2.]       [3.]
   [4.]  [5.]  [6.]  [7.]
      [8.]   [9.]   [10.]
```

Hver podieposition viser:

- Opdrætternavn
- Kennelnavn
- Profilfoto
- Samlet antal matches
- Succesrate i procent

#### Podiescoring

Opdrættere rangeres efter en sammensat score baseret på:

| Faktor | Vægt | Beskrivelse |
|--------|------|-------------|
| Samlet antal matches | 30% | Antal matches initieret eller modtaget |
| Succesrate | 40% | Procentdel af matches, der nåede Accepteret/Gennemført |
| Aktive opslag | 15% | Antal aktuelt aktive avlsopslag |
| Svartid | 15% | Gennemsnitlig tid til at svare på matchforslag |

### Top 10 pr. art-gitter

Under det samlede podium viser et gitter de 10 bedste opdrættere for hver art separat.

#### Gitterlayout

Hver art har sit eget kort:

```
+-------------------+  +-------------------+  +-------------------+
|   Hunde top 10    |  |   Katte top 10    |  |   Fugle top 10   |
| 1. Opdrætternavn  |  | 1. Opdrætternavn  |  | 1. Opdrætternavn  |
| 2. Opdrætternavn  |  | 2. Opdrætternavn  |  | 2. Opdrætternavn  |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Hver post i artsgitteret viser:

- Rangnummer
- Opdrætternavn
- Kennelnavn
- Antal matches for den art
- Succesrate for den art

> **Tip:** Artsspecifikke rangeringer hjælper med at identificere specialistopdrættere, der kan være fremragende kandidater til platformpartnerskaber eller fremhævede opslag.

---

## Sorterbar rangeringstabel

Under de visuelle rangeringer giver en komplet datatabel detaljeret opdrætterstatistik.

### Tabelkolonner

| Kolonne | Sorterbar | Beskrivelse |
|---------|-----------|-------------|
| Rang | Ja | Aktuel position baseret på standardscoring |
| Opdrætternavn | Ja | Opdrætterens fulde navn |
| Kennel | Ja | Kennelnavn |
| Matches | Ja | Samlet antal matches (initieret + modtaget) |
| Opslag | Ja | Antal oprettede avlsopslag |
| Succesrate | Ja | Procentdel af matches, der nåede Accepteret/Gennemført-status |
| Visninger | Ja | Samlede visninger på deres avlsopslag |
| Art | Nej | Primær art, de avler |
| Placering | Nej | Land og by |

### Sortering af tabellen

1. Klik på en sorterbar kolonneoverskrift for at sortere stigende.
2. Klik igen for at sortere faldende.
3. Et tredje klik fjerner sorteringen på den kolonne.
4. Du kan sortere efter flere kolonner (hold Shift nede og klik).

### Tabelinteraktioner

- Klik på en opdrætterrække for at se deres fulde profil og matchhistorik.
- Brug søgebjælken over tabellen til at finde en specifik opdrætter.
- Eksporter tabeldataene ved hjælp af knappen **Eksporter CSV**.

> **Tip:** Sorter efter Succesrate faldende for at identificere opdrættere, der konsekvent producerer succesfulde matches. Disse opdrættere kan drage fordel af premium-funktioner eller hurtigere verificering.

---

## Forståelse af matchmålinger

### Beregning af succesrate

```
Succesrate = (Accepterede + Gennemførte matches) / Samlet antal matches x 100
```

- Kun matches, hvor opdrætteren var opslagejer, tæller med i deres succesrate.
- Afviste og udløbne matches reducerer succesraten.
- Annullerede matches er udelukket fra beregningen.

### Visningsmåling

Visningstællingen repræsenterer:

- Samlede unikke visninger på alle en opdrætters aktive avlsopslag.
- Tæller ikke opdrætterens egne visninger.
- Nulstilles pr. opslag (ikke kumulativt på tværs af slettede opslag).

### Aktivitetsscore

Den samlede rangering tager hensyn til aktualitet:

- Matches fra de seneste 90 dage vægtes 2x.
- Matches fra 90-180 dage vægtes 1x.
- Matches ældre end 180 dage vægtes 0,5x.

> **Tip:** En opdrætter med høje visninger men lav succesrate kan have attraktive opslag, men være for selektiv eller langsom til at svare. Overvej at kontakte dem for at forstå deres oplevelse.

---

## Ofte stillede spørgsmål

**Sp: Kan jeg manuelt oprette et match mellem to kæledyr?**
Sv: Nej. Matches oprettes af kæledyrsejere gennem appen. Administratorer kan kun overvåge og tage handlinger på eksisterende matches.

**Sp: Hvad sker der med matchdata, når et kæledyr slettes?**
Sv: Matchposten bevares af historiske årsager, men markeres med en "Kæledyr fjernet"-indikator. Matchet kan ikke fortsætte yderligere.

**Sp: Kan jeg fjerne en opdrætter fra rangeringerne?**
Sv: Rangeringer beregnes automatisk. For at fjerne en opdrætter skal deres konto suspenderes eller deres verificering tilbagekaldes, hvilket udelukker dem fra rangeringer.

**Sp: Hvor ofte opdateres rangeringer?**
Sv: Rangeringer genberegnes hver 24. time. Det seneste opdateringstidsstempel vises øverst på fanen Rangeringer.

**Sp: Kan jeg sende et bryllupskort for et afvist match?**
Sv: Nej. Knappen Send bryllupskort er kun tilgængelig for matches med status Accepteret eller Gennemført.

**Sp: Hvad hvis begge kæledyr i et match tilhører den samme ejer?**
Sv: Systemet forhindrer matches mellem kæledyr med samme ejer. Hvis du ser et, indikerer det et dataintegritets-problem, der bør rapporteres til udviklingsholdet.
