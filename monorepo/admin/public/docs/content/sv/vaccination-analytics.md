# Vaccinationsanalys

Modulen Vaccinationsanalys ger administratörer insikter i vaccinationstrender över plattformen. Använd denna instrumentpanel för att förstå vilka vacciner som oftast administreras, identifiera regionala mönster och spåra övergripande vaccinationstäckning.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | View |
> | Viewer | View only |

---

## Översikt av instrumentpanelen

Sidan Vaccinationsanalys är organiserad i följande sektioner:

1. **Sammanfattande statistik** -- Nyckelmått överst på sidan
2. **Topp 20 vacciner-topplista** -- Rankad lista över mest använda vacciner
3. **Podiumvisualisering** -- Framhävning av topp 3-vaccinerna
4. **Uppdelning per vaccin** -- Artfördelning för varje vaccin
5. **Toppplatser** -- Geografisk fördelning per vaccin

---

## Sammanfattande statistik

Överst på analyssidan visar tre statistikkort aggregerade mätvärden:

| Statistikkort | Beskrivning | Ikon |
|---------------|-------------|------|
| Totalt antal vaccinationer | Totalt antal vaccinationsposter för alla husdjur | Spruta |
| Unika vacciner | Antal distinkta vaccintyper administrerade | Kolv |
| Vaccinerade husdjur | Antal unika husdjur med minst en vaccination | Tass |

### Läsa statistiken

- **Totalt antal vaccinationer** räknar enskilda vaccinationshändelser (ett husdjur som får ett vaccin = 1 räkning).
- **Unika vacciner** visar variationen av vacciner i systemet (t.ex. Rabies, DHPP, FVRCP räknas var som 1).
- **Vaccinerade husdjur** är deduplicerat -- ett husdjur med 5 vaccinationer räknas fortfarande som 1 husdjur.

> **Tips:** Jämför Totalt antal vaccinationer med Vaccinerade husdjur för att förstå det genomsnittliga antalet vaccinationer per husdjur på plattformen.

---

## Filter

Filterfältet tillämpas på alla sektioner av analyssidan samtidigt.

### Tidsperiodfilter

Välj ett tidsintervall för datan:

| Alternativ | Beskrivning |
|-----------|-------------|
| Senaste 7 dagarna | Senaste veckan |
| Senaste 30 dagarna | Senaste månaden |
| Senaste 90 dagarna | Senaste kvartalet |
| Senaste 12 månaderna | Senaste året |
| Hela tiden | Ingen tidsbegränsning |
| Anpassat intervall | Datumväljare för start- och slutdatum |

### Artfilter

Filtrera vaccinationsdata efter husdjursart:

- Alla arter (standard)
- Hund
- Katt
- Fågel
- Kanin
- Övrigt

### Landsfilter

Välj ett eller flera länder för att se vaccinationsdata från enbart de regionerna.

### Stadsfilter

Begränsa resultaten ytterligare genom att välja specifika städer inom det valda landet.

> **Tips:** Kombinera filter för att besvara specifika frågor. Till exempel: "Vilka är de vanligaste vaccinerna för hundar i Sverige under de senaste 12 månaderna?"

### Tillämpa filter

1. Ställ in önskade filtervärden med rullgardinsmenyerna.
2. Klicka på **Tillämpa filter** eller så tillämpas filtren automatiskt vid ändring.
3. Alla sektioner på instrumentpanelen uppdateras för att spegla den filtrerade datan.
4. Aktiva filter visas som taggar under filterfältet.
5. Klicka på **X** på valfri filtertagg för att ta bort den, eller klicka på **Rensa alla** för att återställa.

---

## Topp 20 vacciner-topplista

Topplistan visar de 20 mest frekvent administrerade vaccinerna baserat på aktuellt filterval.

### Tabellkolumner

| Kolumn | Beskrivning |
|--------|-------------|
| Rang | Position från 1 till 20 |
| Vaccinnamn | Vaccinets namn |
| Antal | Antal gånger det administrerats |
| Andel | Andel av totala vaccinationer |
| Trend | Sparkline som visar användningstrend under vald period |

### Läsa topplistan

1. Vacciner sorteras efter antal i fallande ordning.
2. Kolumnen **Andel** visar vilken del av alla vaccinationer detta vaccin representerar.
3. **Trend**-sparklinen ger en snabb visuell bild av om användningen ökar, är stabil eller minskar.
4. Håll muspekaren över sparklinen för att se datapunktsvärden.

### Interagera med topplistan

- Klicka på valfri vaccinrad för att scrolla ned till dess detaljerade uppdelningssektion.
- Använd kolumnrubrikerna för att sortera om (men standardrangordning är mest användbar).
- Tabellen är paginerad om filter producerar mer än 20 resultat i sällsynta konfigurationer.

> **Tips:** Ett vaccin med uppåtgående trend kan indikera ett regionalt utbrottssvar eller en ny rekommendation från veterinärföreningar.

---

## Podiumvisualisering

Podiet framhäver de 3 främsta vaccinerna i en visuell prisutdelningsstil.

### Layout

```
        [1:a]
   [2:a]     [3:e]
```

- **1:a plats (mitten, högst):** Guldfärgat kort med det mest administrerade vaccinet.
- **2:a plats (vänster):** Silverfärgat kort med det näst mest administrerade vaccinet.
- **3:e plats (höger):** Bronsfärgat kort med det tredje mest administrerade vaccinet.

### Kortinnehåll

Varje podiumkort visar:

- Rangmedaljikon (guld, silver, brons)
- Vaccinnamn
- Totalt antal administreringar
- Andel av alla vaccinationer
- Primär art (vanligaste arten som får detta vaccin)

### Läsa podiet

Podiet ger en överblick av plattformens vaccinationsmönster. Vanliga resultat inkluderar:

- **Hundar:** Rabies, DHPP (Valpsjuka/Parvo), Bordetella dominerar ofta.
- **Katter:** FVRCP, Rabies, FeLV är typiska toppvacciner.
- **Blandade plattformar:** Rabies leder ofta oavsett art.

> **Tips:** Om podiet visar oväntade resultat efter att filter tillämpats, kontrollera om tidsperioden eller platsfiltret ger en liten provstorlek som kan snedvrida rankningarna.

---

## Artuppdelning per vaccin

Under topplistan har varje vaccin bland topp 20 en expanderbar sektion som visar artfördelning.

### Visa uppdelningen

1. Klicka på expansionspilen bredvid valfritt vaccin i topplistan.
2. Ett horisontellt staplat stapeldiagram visas med artfördelning.
3. Varje segment är färgkodat efter art:
   - Hundar: Blå
   - Katter: Orange
   - Fåglar: Grön
   - Kaniner: Lila
   - Övrigt: Grå

### Uppdelningstabell

Bredvid stapeldiagrammet visar en liten tabell:

| Art | Antal | Andel |
|-----|-------|-------|
| Hund | 1 234 | 62% |
| Katt | 456 | 23% |
| Fågel | 200 | 10% |
| Kanin | 80 | 4% |
| Övrigt | 20 | 1% |

### Användningsfall

- Identifiera vacciner som är artspecifika vs. artövergripande.
- Upptäcka ovanliga mönster (t.ex. ett hundspecifikt vaccin som förekommer i kattjournaler kan indikera dataregistreringsfel).
- Förstå din plattforms artsammansättning genom vaccinationsdata.

> **Tips:** Artspecifika vacciner som förekommer under fel art indikerar ofta datakvalitetsproblem som bör undersökas.

---

## Toppplatser per vaccin

Varje vaccin visar också en geografisk uppdelning av var det oftast administreras.

### Visa platsdata

1. Klicka på expansionspilen bredvid valfritt vaccin i topplistan.
2. Byt till fliken **Platser** inom den expanderade sektionen.
3. En rankad lista över topp 10-platser visas.

### Platstabell

| Rang | Land | Stad | Antal | Andel |
|------|------|------|-------|-------|
| 1 | Tyskland | Berlin | 543 | 18% |
| 2 | Storbritannien | London | 421 | 14% |
| 3 | Frankrike | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Kartvy

Om tillgänglig visar en mini-värmekarta koncentrationen av vaccinationer geografiskt:

- Mörkare regioner indikerar högre vaccinationsantal.
- Håll muspekaren över en region för att se det exakta antalet.
- Klicka på en region för att tillämpa den som ett platsfilter.

### Användningsfall

- Identifiera regionala vaccinationspreferenser eller krav.
- Upptäcka kluster som kan motsvara lokala veterinärrekommendationer.
- Planera regionala kampanjer eller partnerskap.

> **Tips:** Vissa vacciner är lagstadgade i specifika länder (t.ex. rabies i Tyskland). Höga koncentrationer i vissa regioner är förväntat för obligatoriska vacciner.

---

## Exportera data

För att exportera vaccinationsanalysdata:

1. Klicka på knappen **Exportera** i det övre högra hörnet av sidan.
2. Välj exportformat:
   - **CSV** -- Rådata för kalkylbladsanalys
   - **PDF** -- Formaterad rapport med diagram
3. Exporten respekterar alla aktuellt aktiva filter.
4. Filen laddas ned till din webbläsares standardplats för nedladdningar.

### Exportinnehåll

CSV-exporten inkluderar:

- Vaccinnamn
- Totalt antal
- Artuppdelningsantal
- Toppländer och städer
- Trenddatapunkter
- Använda filterparametrar

> **Tips:** Använd CSV-exporter för att skapa anpassade visualiseringar i verktyg som Excel eller Google Sheets, eller för att dela data med veterinära rådgivningspartners.

---

## Instrumentpanelens uppdatering

Analysdata beräknas från vaccinationsposter och cachas för prestanda.

- Data uppdateras automatiskt var 24:e timme.
- Tidsstämpeln för senaste uppdatering visas längst ned på sidan.
- Klicka på **Uppdatera**-ikonen bredvid tidsstämpeln för att utlösa en manuell uppdatering.
- Manuell uppdatering kan ta 10-30 sekunder beroende på datavolym.

> **Tips:** Om du märker avvikelser mellan analysinstrumentpanelen och enskilda husdjursjournaler, prova en manuell uppdatering. Nyligen tillagda vaccinationer kanske inte visas förrän nästa cache-uppdatering.

---

## Vanliga frågor

**F: Varför matchar inte totalen i topplistan det totala i den sammanfattande statistiken?**
S: Topplistan visar de 20 främsta vaccinerna. Om det finns fler än 20 unika vacciner listas inte de återstående men räknas fortfarande mot totalen.

**F: Kan jag se data för en specifik uppfödare eller ägare?**
S: Nej. Analyssidan visar aggregerad plattformsdata. Individuella vaccinationsposter finns tillgängliga på varje husdjurs profil.

**F: Varför visar vissa vacciner noll trenddata?**
S: Nya vacciner som bara har registrerats en gång kanske inte har tillräckligt med datapunkter för att generera en meningsfull trendlinje.

**F: Hur långt tillbaka sträcker sig historisk data?**
S: Filtret "Hela tiden" inkluderar varje vaccinationspost sedan plattformens lansering. Det finns ingen gräns för datalagring för analyser.

**F: Kan jag jämföra två tidsperioder?**
S: Inte direkt i instrumentpanelen. Exportera data för två olika tidsperioder och jämför dem i ett kalkylblad.
