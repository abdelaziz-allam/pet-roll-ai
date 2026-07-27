# Blog CMS

Blog CMS-modulet giver administratorer mulighed for at oprette, redigere, publicere og administrere blogindlæg, der vises på Petfolioo's offentlige hjemmeside. Brug dette værktøj til at dele tips om kæledyrspleje, platformnyheder, opdrætterspotlights og uddannelsesindhold med dit fællesskab.

![Blog CMS](/docs/screenshots/blog.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Blogindlægstabel

Hovedvisningen viser alle blogindlæg i en søgbar, sorterbar tabel.

| Kolonne | Beskrivelse |
|---------|-------------|
| Titel | Indlægstitel med klikbart link til redigering |
| Status | Publiceringsstatus-badge |
| Forfatter | Navn på den administrator, der oprettede indlægget |
| Visninger | Samlede sidevisninger siden publicering |
| Dato | Oprettelsesdato (eller publiceringsdato, hvis publiceret) |

### Statusbadges

| Status | Badge-farve | Beskrivelse |
|--------|-------------|-------------|
| Kladde | Grå | Indlægget er gemt, men ikke synligt for offentligheden |
| Publiceret | Grøn | Indlægget er live og synligt på hjemmesiden |
| Fremhævet | Guld | Indlægget er publiceret og fastgjort øverst |

### Tabelhandlinger

- Klik på en indlægstitel for at åbne det til redigering.
- Brug handlingsmenuen (tre prikker) på hver række for hurtige handlinger: Publicer, Afpublicer, Fastgør, Frigør, Slet.
- Sorter efter enhver kolonne ved at klikke på kolonneoverskriften.
- Brug søgebjælken til at filtrere indlæg efter titel eller indholdsord.

> **Tip:** Sorter efter Visninger faldende for at identificere dit mest populære indhold. Brug disse indsigter til at planlægge fremtidige indlæg om lignende emner.

---

## Oprettelse af et indlæg

For at oprette et nyt blogindlæg:

1. Klik på knappen **Opret indlæg** i øvre højre hjørne af blogindlægstabellen.
2. Indlægsredigeringen åbnes med følgende felter.

### Titel

- Indtast indlægstitlen i titelfeltet øverst.
- Maksimalt 200 tegn.
- Titlen vises som hovedoverskriften på den publicerede side.
- Vælg beskrivende, engagerende titler, der inkluderer relevante nøgleord.

### Slug

- URL-slug'en genereres automatisk fra titlen.
- Format: små bogstaver, bindestreger erstatter mellemrum, specialtegn fjernes.
- Eksempel: "Top 10 Tips til Nye Hvalpeejere" bliver `top-10-tips-til-nye-hvalpeejere`.
- Du kan manuelt redigere slug'en, hvis den autogenererede version er for lang eller uklar.
- Slug'en skal være unik på tværs af alle indlæg.

> **Tip:** Hold slug'en kort og rig på nøgleord for bedre SEO. Forkort manuelt autogenererede slugs, der overstiger 5-6 ord.

### HTML-indhold

- Hovedindholdsområdet accepterer HTML til formatering.
- Brug rich text-editorens værktøjslinje til almindelig formatering:
  - Fed, kursiv, understreget
  - Overskrifter (H2, H3, H4)
  - Ordnede og uordnede lister
  - Links
  - Billeder (inline)
  - Blokcitater
  - Kodeblokke
- Skift til **Kildetilstand** for at redigere rå HTML direkte.
- Indhold understøtter alle standard HTML-tags.

#### Bedste praksis for indhold

| Gør | Gør ikke |
|-----|----------|
| Brug H2 til hovedsektioner, H3 til undersektioner | Brug H1 (reserveret til titlen) |
| Inkluder billeder for at bryde lang tekst op | Post vægge af uformateret tekst |
| Hold afsnit korte (3-4 sætninger) | Skriv afsnit længere end 5 sætninger |
| Brug lister til flere relaterede elementer | Indlejr eksterne scripts eller iframes |
| Tilføj alternativ tekst til alle billeder | Brug inline-stilarter til farver |

### Uddrag

- Skriv et kort resumé af indlægget (maksimalt 500 tegn).
- Uddraget vises på bloglistesider, søgeresultater og sociale medie-forhåndsvisninger.
- Hvis det efterlades tomt, bruges de første 500 tegn af indholdet automatisk.
- Tegntæller viser resterende tegn, mens du skriver.

> **Tip:** Skriv uddraget som en fængende teaser, der får læserne til at ville klikke videre. Det skal stå alene som en komplet tanke og ikke slutte midt i en sætning.

### Upload af coverbillede

1. Klik på området **Upload coverbillede** eller træk og slip en billedfil.
2. Understøttede formater: JPEG, PNG, WebP.
3. Anbefalede dimensioner: 1200 x 630 pixels (optimeret til social deling).
4. Maksimal filstørrelse: 5 MB.
5. Efter upload vises en forhåndsvisning af billedet.
6. Klik på **Fjern** for at slette det aktuelle coverbillede og uploade et nyt.

#### Retningslinjer for coverbilleder

- Brug billeder af høj kvalitet, der er relevante og repræsenterer indlæggets indhold.
- Undgå tekstoverlejringer på coverbilleder (de kan blive beskåret på forskellige enheder).
- Sørg for, at du har rettighederne til at bruge billedet (originale fotos eller korrekt licenseret stock).
- Billeder optimeres automatisk til webvisning efter upload.

### Tags

- Indtast tags som kommaseparerede værdier i tags-feltet.
- Eksempel: `hvalpepleje, træning, ernæring, nye ejere`
- Tags hjælper med at kategorisere indlæg og forbedre synlighed.
- Eksisterende tags foreslås automatisk, mens du skriver.
- Der er ingen grænse for antallet af tags, men 3-7 tags pr. indlæg anbefales.

> **Tip:** Brug konsistente tagnavne på tværs af indlæg. Tjek eksisterende tags, før du opretter nye variationer (brug f.eks. "hvalpepleje" konsekvent i stedet for at veksle med "hvalpe-pleje" eller "Hvalpepleje").

### SEO-indstillinger

SEO-sektionen giver dig mulighed for at optimere, hvordan indlægget vises i søgemaskiner.

#### Metatitel

- Maksimalt 60 tegn.
- Vises som den klikbare overskrift i søgeresultater.
- Hvis det efterlades tomt, bruges indlægstitlen.
- Tegntæller bliver rød, når den nærmer sig eller overstiger 60 tegn.
- Bedste praksis: Inkluder primært nøgleord nær begyndelsen.

#### Metabeskrivelse

- Maksimalt 160 tegn.
- Vises som beskrivelsesuddraget under titlen i søgeresultater.
- Hvis det efterlades tomt, bruges uddraget.
- Tegntæller bliver rød, når den nærmer sig eller overstiger 160 tegn.
- Bedste praksis: Inkluder en opfordring til handling og primært nøgleord.

#### SEO-forhåndsvisning

Under metafelterne viser en forhåndsvisning, hvordan indlægget vil se ud i Googles søgeresultater:

```
+--------------------------------------------------+
| Metatitel (eller indlægstitel, hvis tom)          |
| https://petfolioo.com/blog/din-slug-her          |
| Metabeskrivelse (eller uddrag, hvis tom) vises   |
| her, som det ville i søgeresultater...           |
+--------------------------------------------------+
```

> **Tip:** Udfyld altid både metatitel og metabeskrivelse manuelt. Autogenererede værdier fra titlen og uddraget er muligvis ikke optimeret til søgeintention.

### Gem som kladde

1. Når du har udfyldt de ønskede felter, klik på **Gem kladde**.
2. Indlægget gemmes med kladde-status.
3. Du kan vende tilbage og redigere det når som helst fra blogindlægstabellen.
4. Kladder er ikke synlige for offentligheden.

---

## Publicering af et indlæg

For at publicere et kladdeindlæg og gøre det synligt på hjemmesiden:

1. Åbn indlægget fra blogindlægstabellen.
2. Gennemgå alt indhold, billeder og SEO-indstillinger.
3. Klik på knappen **Publicer** i øvre højre hjørne.
4. I bekræftelsesdialogen:
   - Gennemgå indlægstitlen og slug'en.
   - Bekræft publiceringen.
5. Klik på **Bekræft publicering**.

### Hvad sker der efter publicering

- Indlæggets status ændres til **Publiceret**.
- Indlægget bliver øjeblikkeligt synligt på den offentlige blogside.
- Publiceringsdatoen registreres (bruges til sortering på bloggen).
- Indlæggets URL bliver aktiv: `https://petfolioo.com/blog/[slug]`.
- Søgemaskiner kan nu indeksere indlægget.

### Publiceringstjekliste

Før publicering, bekræft:

- [ ] Titlen er klar, engagerende og fri for stavefejl
- [ ] Indholdet er komplet og korrekt formateret
- [ ] Alle billeder indlæses korrekt
- [ ] Links virker og åbner i passende faner
- [ ] Coverbillede er uploadet og ser godt ud
- [ ] Uddrag er skrevet og under 500 tegn
- [ ] Tags er tilføjet og korrekt formateret
- [ ] Metatitel er under 60 tegn
- [ ] Metabeskrivelse er under 160 tegn
- [ ] Slug er ren og rig på nøgleord

---

## Afpublicering af et indlæg

For at fjerne et publiceret indlæg fra den offentlige hjemmeside:

1. Find indlægget i blogindlægstabellen.
2. Klik på handlingsmenuen (tre prikker) på rækken.
3. Vælg **Afpublicer**.
4. Bekræft handlingen i dialogen.

### Hvad sker der efter afpublicering

- Indlæggets status ændres tilbage til **Kladde**.
- Indlægget fjernes øjeblikkeligt fra den offentlige blogside.
- URL'en returnerer en 404-side.
- Visningstællingen bevares.
- Du kan genpublicere indlægget når som helst.

> **Tip:** Afpublicer i stedet for at slette, hvis du midlertidigt vil fjerne indhold. Afpublicerede indlæg bevarer alle deres data og kan gendannes øjeblikkeligt.

---

## Fastgør/Frigør som fremhævet

Fremhævede indlæg vises tydeligt øverst på blogsiden, over kronologiske opslag.

### Fastgørelse af et indlæg

1. Find et publiceret indlæg i blogindlægstabellen.
2. Klik på handlingsmenuen (tre prikker).
3. Vælg **Fastgør som fremhævet**.
4. Statusbadget ændres til **Fremhævet** (guld).

### Frigørelse af et indlæg

1. Find det fremhævede indlæg i tabellen.
2. Klik på handlingsmenuen (tre prikker).
3. Vælg **Frigør**.
4. Status vender tilbage til **Publiceret** (grøn).

### Regler for fremhævede indlæg

- Kun publicerede indlæg kan fastgøres.
- Flere indlæg kan fremhæves samtidigt.
- Fremhævede indlæg vises i den rækkefølge, de blev fastgjort (senest fastgjort først).
- Frigørelse af et indlæg afpublicerer det ikke; det forbliver publiceret.

> **Tip:** Begræns fremhævede indlæg til 2-3 ad gangen. For mange fremhævede indlæg udvander fremhævelsen og skubber almindeligt indhold under folden.

---

## Vis på hjemmesiden

For at se, hvordan et publiceret indlæg ser ud på den offentlige hjemmeside:

1. Åbn indlægget fra blogindlægstabellen.
2. Klik på linket **Vis på hjemmesiden** i øvre højre område (ved siden af Publicer-knappen).
3. En ny browserfane åbnes, der viser indlægget på den live hjemmeside.

### Bemærkninger

- Linket Vis på hjemmesiden er kun tilgængeligt for publicerede og fremhævede indlæg.
- Kladdeindlæg kan ikke forhåndsvises på den live side.
- Linket åbner den aktuelle live-version; ikke-gemte ændringer i editoren afspejles ikke.

> **Tip:** Vis altid på hjemmesiden efter publicering for at bekræfte, at formatering, billeder og layout vises korrekt i det offentlige tema.

---

## Sletning af et indlæg

For permanent at slette et blogindlæg:

1. Find indlægget i blogindlægstabellen.
2. Klik på handlingsmenuen (tre prikker).
3. Vælg **Slet**.
4. En bekræftelsesdialog vises:
   - Viser indlægstitlen.
   - Advarer om, at sletning er permanent.
   - Beder dig skrive indlægstitlen for at bekræfte (for publicerede indlæg).
5. Klik på **Bekræft sletning**.

### Hvad sker der efter sletning

- Indlægget fjernes permanent fra systemet.
- URL'en returnerer en 404-side.
- Indlægget kan ikke gendannes efter sletning.
- Visningsstatistikker går tabt.
- Slug'en bliver tilgængelig til genbrug.

### Hvornår slette vs. afpublicere

| Scenarie | Handling |
|----------|---------|
| Midlertidig fjernelse af indhold | Afpublicer |
| Forældet indhold, der muligvis opdateres senere | Afpublicer |
| Testindlæg eller utilsigtede duplikater | Slet |
| Indhold, der aldrig burde have været oprettet | Slet |
| Juridisk problematisk indhold | Slet |

> **Tip:** Sletning er irreversibel. Når du er i tvivl, afpublicer i stedet. Du kan altid slette et afpubliceret indlæg senere, men du kan ikke gendanne et slettet indlæg.

---

## Billedupload til coverbilleder

Coverbilledets uploadkomponent understøtter følgende arbejdsgang:

### Uploadmetoder

1. **Klik for at uploade:** Klik på uploadområdet for at åbne din filbrowser.
2. **Træk og slip:** Træk en billedfil fra dit skrivebord direkte til uploadområdet.

### Uploadproces

1. Vælg eller slip din billedfil.
2. Uploadstatusbjælken vises.
3. Når den er færdig, vises billedforhåndsvisningen i uploadområdet.
4. Billed-URL'en gemmes automatisk med indlægget.

### Billedkrav

| Krav | Værdi |
|------|-------|
| Formater | JPEG, PNG, WebP |
| Minimumdimensioner | 600 x 315 pixels |
| Anbefalede dimensioner | 1200 x 630 pixels |
| Maksimal filstørrelse | 5 MB |
| Billedformat | 1.91:1 anbefalet (optimeret til sociale medier) |

### Håndtering af uploadede billeder

- **Erstat:** Klik på knappen **Fjern** under forhåndsvisningen, og upload derefter et nyt billede.
- **Forhåndsvisning:** Klik på billedforhåndsvisningen for at se det i fuld størrelse.
- **Alternativ tekst:** Indtast beskrivende alternativ tekst i feltet under billedet (vigtigt for tilgængelighed og SEO).

### Billedoptimering

Uploadede billeder bliver automatisk:

- Komprimeret til weblevering (med bevaret kvalitet).
- Serveret via CDN for hurtig indlæsning.
- Konverteret til WebP-format for browsere, der understøtter det.
- Skaleret til flere dimensioner for responsiv visning.

> **Tip:** Forbered dine coverbilleder i 1200 x 630 pixels før upload. Dette er den optimale størrelse til både blogvisning og social mediedeling (Open Graph).

---

## Ofte stillede spørgsmål

**Sp: Kan flere administratorer redigere det samme indlæg?**
Sv: Ja, men der er ingen realtidssamarbejde. Den sidste person, der gemmer, overskriver tidligere ændringer. Koordiner med dit team for at undgå konflikter.

**Sp: Er der en revisionshistorik?**
Sv: Nej. Hver gemning overskriver den tidligere version. Kopier vigtigt indhold andetsteds, før du foretager større ændringer.

**Sp: Kan jeg planlægge et indlæg til publicering på en fremtidig dato?**
Sv: Ikke i øjeblikket. Indlæg er enten kladder eller publiceres øjeblikkeligt. Gem som kladde og publicer manuelt på det ønskede tidspunkt.

**Sp: Hvad sker der med SEO, hvis jeg ændrer et publiceret indlægs slug?**
Sv: Den gamle URL vil returnere 404. Søgemaskiner vil til sidst afindeksere den gamle URL og indeksere den nye. Undgå at ændre slugs på etablerede indlæg.

**Sp: Kan jeg indlejre videoer i blogindlæg?**
Sv: Ja, brug HTML-kildetilstanden til at indlejre video-iframes fra YouTube eller Vimeo i indholdsområdet.

**Sp: Er der en ord- eller tegngrænse for indlægsindhold?**
Sv: Der er ingen hård grænse for indholdslængde. Dog performer indlæg mellem 800-2000 ord typisk bedst for SEO og læserengagement.
