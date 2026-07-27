# Instrumentpanel

Instrumentpanelen är den första skärmen du ser efter att du har loggat in på Petfolioo Adminportalen. Den ger en realtidsöversikt av plattformens hälsa genom nyckeltal (KPI:er), interaktiva diagram och flöden med senaste aktivitet. Använd instrumentpanelen för att övervaka tillväxttrender, identifiera områden som behöver uppmärksamhet och spåra plattformsengagemang på ett ögonblick.

![Dashboard](/docs/screenshots/dashboard.png)

---

## KPI-kort

Högst upp på instrumentpanelen visar fyra sammanfattningskort plattformens viktigaste mätvärden. Varje kort visar det aktuella totala antalet och en procentuell förändringsindikator jämfört med föregående period.

### Kortdefinitioner

| Kort | Mätvärde | Beskrivning |
|------|----------|-------------|
| Totalt antal användare | Antal registrerade appanvändare | Alla användare som har skapat ett konto på plattformen |
| Totalt antal husdjur | Antal registrerade husdjur | Alla husdjur som lagts till i registret oavsett status |
| Väntande verifieringar | Objekt som väntar på granskning | Verifieringsförfrågningar som ännu inte har godkänts eller avvisats |
| Aktiva listningar | Aktuellt synliga listningar | Husdjur markerade som tillgängliga för avel eller adoption |

### Tillväxtprocent

Varje KPI-kort innehåller en tillväxtindikator:

- En **grön pil uppåt** med en procentsats indikerar tillväxt jämfört med föregående period.
- En **röd pil nedåt** med en procentsats indikerar en nedgång jämfört med föregående period.
- Jämförelseperioden matchar det valda tidsintervallet (se Tidsintervallväljare nedan).

> **Tips:** Håll muspekaren över ett KPI-kort för att se de exakta siffrorna för aktuell och föregående period i en tooltip.

### Läsa korten

1. Det **stora numret** är det aktuella totala antalet.
2. **Procentmärket** nedanför visar period-över-period-förändring.
3. **Etiketten** längst upp identifierar vilket mätvärde som visas.
4. Klicka på valfritt kort för att navigera direkt till motsvarande modul (t.ex. klick på "Totalt antal användare" öppnar användarlistan).

---

## Tidsintervallväljare

Tidsintervallväljaren styr datafönstret för alla instrumentpanelens analyser och KPI-jämförelser.

### Tillgängliga intervall

| Alternativ | Period | Jämförelse mot |
|-----------|--------|----------------|
| 7d | Senaste 7 dagarna | Föregående 7 dagar |
| 30d | Senaste 30 dagarna | Föregående 30 dagar |
| 90d | Senaste 90 dagarna | Föregående 90 dagar |
| Hela tiden | Sedan plattformens lansering | Ingen jämförelse (tillväxtprocent dold) |

### Hur du ändrar tidsintervallet

1. Hitta **tidsintervallväljaren** i det övre högra området av instrumentpanelen, ovanför KPI-korten.
2. Klicka på en av periodknapparna: **7d**, **30d**, **90d** eller **Hela tiden**.
3. Hela instrumentpanelen uppdateras för att spegla den valda perioden.
4. KPI-tillväxtprocentsatser räknas om baserat på det nya jämförelsefönstret.

> **Obs:** Alternativet "Hela tiden" döljer tillväxtprocentsatser eftersom det inte finns någon tidigare period att jämföra med.

---

## Sektion för husdjursanalys

Under KPI-korten presenterar sektionen för husdjursanalys visuella uppdelningar av husdjursregistrets data. Tre diagramtyper ger olika perspektiv på husdjurspopulationen.

### Artfördelning (cirkeldiagram)

Cirkeldiagrammet visar den proportionella fördelningen av husdjur efter art.

| Element | Beskrivning |
|---------|-------------|
| Diagramtyp | Ring-/cirkeldiagram |
| Datakälla | Alla registrerade husdjur grupperade efter art |
| Segment | Ett segment per art (t.ex. hund, katt, fågel, kanin, reptil) |
| Etiketter | Artnamn och antal visas vid hovring |
| Teckenförklaring | Färgkodad teckenförklaring under eller bredvid diagrammet |

**Interagera med cirkeldiagrammet:**

1. Håll muspekaren över valfritt segment för att se det exakta antalet och procentsatsen för den arten.
2. Klicka på ett segment för att filtrera andra instrumentpanelsdiagram till enbart den arten.
3. Teckenförklaringens objekt är klickbara - klicka på ett artnamn för att växla dess synlighet i diagrammet.

### Könsfördelning (stapeldiagram)

Det vertikala stapeldiagrammet visar fördelningen av husdjur efter kön.

| Element | Beskrivning |
|---------|-------------|
| Diagramtyp | Vertikalt stapeldiagram |
| X-axel | Könskategorier (Hane, Hona, Okänt) |
| Y-axel | Antal husdjur |
| Staplar | En stapel per kön, färgkodad |
| Etiketter | Antal visas ovanför varje stapel |

**Läsa könsdiagrammet:**

1. Varje stapel representerar en könskategori.
2. Stapelns höjd motsvarar det totala antalet husdjur av det könet.
3. Det exakta antalet visas som en etikett ovanför varje stapel.
4. Håll muspekaren för ytterligare detaljer inklusive andel av totalen.

### Landsfördelning (horisontellt stapeldiagram)

Det horisontella stapeldiagrammet rangordnar länder efter antalet registrerade husdjur.

| Element | Beskrivning |
|---------|-------------|
| Diagramtyp | Horisontellt stapeldiagram |
| Y-axel | Landsnamn (sorterade efter antal, fallande) |
| X-axel | Antal husdjur |
| Staplar | En horisontell stapel per land |
| Visning | Topp 10 länder visas som standard |

**Läsa landsdiagrammet:**

1. Länder sorteras från flest husdjur (överst) till minst (nederst).
2. Som standard visas bara de 10 främsta länderna.
3. Håll muspekaren över en stapel för att se det exakta antalet och andelen av totalen.
4. Stapelns längd är proportionell mot antalet relativt andra länder.

---

## Geo- och artfilter

Ovanför analysdiagrammen finns filterkontroller som låter dig begränsa den visade datan.

### Tillgängliga filter

| Filter | Typ | Alternativ |
|--------|-----|-----------|
| Art | Rullgardinsmeny | Alla arter tillgängliga på plattformen (t.ex. hund, katt, fågel, etc.) |
| Land | Rullgardinsmeny | Alla länder med registrerade husdjur |

### Tillämpa filter

1. Klicka på rullgardinsmenyn **Art** för att välja en specifik husdjursart.
2. Klicka på rullgardinsmenyn **Land** för att välja ett specifikt land.
3. Diagram och tabeller nedan uppdateras omedelbart för att spegla filtret.
4. Filter kan kombineras - välj både en art och ett land för att ytterligare begränsa resultaten.
5. För att återställa, välj "Alla" från varje rullgardinsmeny eller klicka på knappen **Återställ filter**.

> **Tips:** Använd artfiltret i cirkeldiagramvyn för att granska rasfördelningar inom en enskild art.

### Filterbeteende

| Scenario | Effekt |
|----------|--------|
| Inga filter valda | All data visas globalt |
| Endast art vald | Diagrammen visar data för den arten i alla länder |
| Endast land valt | Diagrammen visar data för alla arter i det landet |
| Båda valda | Diagrammen visar data för den valda arten i det valda landet |

---

## Tabell med senaste användarregistreringar

Under analysdiagrammen visar en tabell de senaste användarregistreringarna på plattformen.

### Tabellkolumner

| Kolumn | Beskrivning |
|--------|-------------|
| Avatar | Miniatyr av användarens profilbild |
| Namn | Användarens visningsnamn |
| E-post | Användarens registrerade e-postadress |
| Registreringsdatum | Datum och tid då kontot skapades |
| Status | Kontostatus (Aktiv, Väntande, Blockerad) |
| Husdjur | Antal husdjur registrerade av denna användare |

### Tabellfunktioner

1. **Sortering** - Klicka på valfri kolumnrubrik för att sortera efter den kolumnen. Klicka igen för att vända sorteringsordningen.
2. **Paginering** - Tabellen visar 10 poster per sida som standard. Använd pagineringskontrollerna längst ned för att navigera.
3. **Snabbåtgärder** - Håll muspekaren över en rad för att visa en "Visa"-knapp som öppnar användardetaljpanelen.

### Förstå statusindikatorerna

| Status | Färg | Betydelse |
|--------|------|-----------|
| Aktiv | Grön | Kontot är i god ordning och fullt fungerande |
| Väntande | Orange | Konto skapat men e-post ännu inte verifierad |
| Blockerad | Röd | Kontot har stängts av av en administratör |

> **Obs:** Tabellen med senaste registreringar visar alltid de nyaste användarna först, oavsett tidsintervallväljarens inställning. Den visar registreringar från de senaste 30 dagarna.

---

## Bästa praxis för instrumentpanelen

### Daglig övervakningschecklista

1. Kontrollera KPI-kortet **Väntande verifieringar** - ett högt antal kan indikera eftersläpning.
2. Granska **tillväxtprocentsatserna** på alla fyra korten för oväntade nedgångar.
3. Skanna tabellen **Senaste användarregistreringar** efter misstänkta konton.
4. Notera eventuella betydande förändringar i **landsfördelningsdiagrammet**.

### Tolka trender

| Trend | Möjlig betydelse | Rekommenderad åtgärd |
|-------|-------------------|---------------------|
| Plötslig ökning av registreringar | Lyckad marknadsföringskampanj eller botaktivitet | Kontrollera senaste användare för misstänkta mönster |
| Minskning av aktiva listningar | Säsongsförändring eller policyändring | Granska senaste blockeringsåtgärder och listningsutgångar |
| Högt antal väntande verifieringar | Underbemanning av moderering | Tilldela ytterligare moderatorer |
| Förändring i artbalans | Regional trend eller felkonfigurering av kategori | Granska kategoriinställningar |

---

## Instrumentpanelens prestanda

Instrumentpanelen laddar data asynkront. Varje sektion laddas oberoende:

1. **KPI-kort** laddas först (snabbaste frågan).
2. **Diagram** laddas härnäst med en kort laddningssnurra.
3. **Tabellen med senaste registreringar** laddas sist.

Om någon sektion visar ett laddningsfel:

1. Kontrollera din internetanslutning.
2. Försök att uppdatera sidan.
3. Om felet kvarstår kan backend-tjänsten ha problem.

> **Tips:** Instrumentpanelen uppdateras automatiskt var 5:e minut. Du kan manuellt uppdatera genom att klicka på uppdateringsikonen i sidhuvudet eller trycka `F5`.

---

*Föregående: [Kom igång](./getting-started.md) | Nästa: [Husdjursregister](./pets.md)*
