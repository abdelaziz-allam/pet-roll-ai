# Husdjursregister

Husdjursregistret är den centrala modulen för att visa och hantera alla husdjur registrerade på Petfolioo-plattformen. Från denna modul kan administratörer bläddra i den fullständiga husdjurskatalogen, visa detaljerade profiler, granska hälsocertifieringsstatus och vidta modereringsåtgärder som att blockera husdjur som bryter mot plattformens regler.

![Pet Registry](/docs/screenshots/pets.png)

---

## Husdjurslistningstabell

Husdjurslistningstabellen visar alla registrerade husdjur i ett paginerat, sorterbart och filtrerbart format.

### Tabellkolumner

| Kolumn | Beskrivning | Sorterbar |
|--------|-------------|:---------:|
| Namn | Husdjurets registrerade namn | Ja |
| Art | Artkategori (t.ex. hund, katt, fågel) | Ja |
| Ras | Specifik ras inom arten | Ja |
| Status | Aktuell status (Aktiv, Blockerad, Väntande) | Ja |
| Kön | Hane, Hona eller Okänt | Ja |
| Plats | Land och stad för husdjurets registrerade adress | Ja |

### Statusindikatorer

| Status | Färg | Betydelse |
|--------|------|-----------|
| Aktiv | Grön | Husdjursprofilen är aktiv och synlig för andra användare |
| Blockerad | Röd | Husdjursprofilen har dolts på grund av regelbrott |
| Väntande | Orange | Husdjursprofilen väntar på granskning eller ägarverifiering |

### Tabellinteraktioner

1. **Klicka på en kolumnrubrik** för att sortera tabellen efter den kolumnen. En pil indikerar sorteringsriktning.
2. **Klicka på en rad** för att öppna husdjursdetaljpanelen på höger sida av skärmen.
3. **Pagineringskontroller** längst ned låter dig navigera mellan sidor och ändra sidstorlek (10, 20, 50 poster per sida).

> **Tips:** Håll `Shift` och klicka på en andra kolumnrubrik för att tillämpa en sekundär sortering.

---

## Filter

Filterfältet ovanför husdjurslistningstabellen erbjuder flera sätt att begränsa de visade resultaten.

### Tillgängliga filter

| Filter | Typ | Beskrivning |
|--------|-----|-------------|
| Art | Rullgardinsmeny | Filtrera efter husdjursart (hund, katt, fågel, kanin, reptil, etc.) |
| Status | Rullgardinsmeny | Filtrera efter husdjursstatus (Aktiv, Blockerad, Väntande) |
| Kön | Rullgardinsmeny | Filtrera efter kön (Hane, Hona, Okänt) |
| Land | Rullgardinsmeny | Filtrera efter husdjurets registrerade land |
| Stad | Rullgardinsmeny | Filtrera efter stad (alternativ uppdateras baserat på landsval) |
| Sök | Textfält | Fritext-sökning på husdjursnamn, ras och mikrochipnummer |

### Tillämpa filter

1. Hitta **filterfältet** ovanför tabellen.
2. Klicka på valfri **rullgardinsmeny** för att se tillgängliga alternativ.
3. Välj ett eller flera värden från rullgardinsmenyerna.
4. Skriv i **Sök**-fältet för att utföra en fritextsökning.
5. Resultat uppdateras automatiskt när filter tillämpas.
6. Aktiva filter visas som taggar under filterfältet.
7. Klicka på **X** på valfri filtertagg för att ta bort den.
8. Klicka på **Rensa alla** för att återställa alla filter på en gång.

### Filterkombinationer

Filter kombineras med OCH-logik. Exempel:

| Valda filter | Resultat |
|--------------|----------|
| Art: Hund | Alla hundar oavsett status, kön eller plats |
| Art: Hund + Kön: Hona | Alla tikar |
| Art: Hund + Land: UAE + Status: Aktiv | Alla aktiva hundar i UAE |
| Sök: "Rex" | Alla husdjur vars namn, ras eller mikrochip innehåller "Rex" |

> **Obs:** Rullgardinsmenyn för stad är beroende av landsvalet. Välj ett land först för att se tillgängliga städer.

---

## Husdjursdetaljpanel

Att klicka på valfri husdjursrad öppnar en detaljpanel som glider in från höger sida av skärmen. Denna panel innehåller den fullständiga husdjursprofilen organiserad i sektioner.

### Fotorutnät

Längst upp i detaljpanelen visar ett fotorutnät husdjurets uppladdade bilder.

| Element | Beskrivning |
|---------|-------------|
| Primärt foto | Visas större, markerat med en stjärnikon |
| Ytterligare foton | Visas i ett rutnät (upp till 6 miniatyrer) |
| Klickåtgärd | Att klicka på valfritt foto öppnar det i en helskärmslightbox |
| Inga foton | En platshållarsiluett visas |

### Sektion med husdjursinformation

Under fotona visas husdjurets grunduppgifter i en strukturerad layout.

| Fält | Beskrivning | Exempel |
|------|-------------|---------|
| Namn | Registrerat husdjursnamn | "Bella" |
| Art | Artkategori | "Hund" |
| Ras | Specifik ras | "Golden Retriever" |
| Färg | Päls-/kroppsfärg | "Gyllene" |
| Vikt | Vikt med enhet | "28,5 kg" |
| Födelsedatum | Husdjurets födelsedag | "2021-03-15" |
| Ålder | Beräknad från födelsedatum | "2 år, 4 månader" |
| Kön | Hane eller Hona | "Hona" |
| Mikrochipnummer | Unikt mikrochip-ID om implanterat | "900118000123456" |
| Kastrerad/Steriliserad | Kastrerings- eller steriliseringsstatus | "Ja" / "Nej" / "Okänt" |
| Registreringsdatum | När husdjuret lades till på plattformen | "2023-07-20" |

### Hälsocertifieringsstatus

Sektionen för hälsocertifiering visar om husdjuret har giltig hälsodokumentation registrerad.

| Element | Beskrivning |
|---------|-------------|
| Certifieringsmärke | Grön bock (giltig), gul varning (snart utgående), röd X (utgången/saknas) |
| Certifikattyp | Namn på hälsocertifikatet |
| Utfärdandedatum | När certifikatet utfärdades |
| Utgångsdatum | När certifikatet löper ut |
| Giltighetsförloppsindikator | Visuell indikator för återstående giltighetsperiod |

**Läsa giltighetsförloppsindikatorn:**

1. En **full grön stapel** indikerar att certifikatet nyligen utfärdades och har det mesta av sin giltighetstid kvar.
2. En **delvis gul stapel** (under 30% kvar) indikerar att certifikatet närmar sig utgångsdatum.
3. En **röd tom stapel** indikerar att certifikatet har gått ut.
4. Den återstående procentsatsen visas som text bredvid stapeln.

> **Tips:** Certifikat som löper ut inom 30 dagar flaggas automatiskt i modulen Väntande verifieringar för att husdjursägaren ska meddelas.

### Ägarinformation

Ägarsektionen visar information om husdjurets registrerade ägare.

| Fält | Beskrivning |
|------|-------------|
| Ägarens namn | Visningsnamn för husdjurets ägare |
| E-post | Ägarens e-postadress |
| Telefon | Telefonnummer om angivet |
| Verifierad uppfödare | Om ägaren har verifierad uppfödarstatus |
| Totalt antal husdjur | Hur många husdjur denna ägare har registrerat |
| Medlem sedan | Ägarens registreringsdatum |

Att klicka på ägarens namn navigerar till deras fullständiga profil i modulen Användare.

### Platssektion

Platssektionen visar var husdjuret är registrerat.

| Fält | Beskrivning |
|------|-------------|
| Land | Landsnamn med flaggikon |
| Stad | Stadsnamn |
| Adress | Gatuadress om angiven (kan vara delvis dold av integritetsskäl) |

---

## Blockera/Avblockera husdjur

Administratörer och moderatorer kan blockera ett husdjur vars profil bryter mot plattformens regler. Blockering döljer husdjuret från allmän vy och meddelar ägaren.

### Blockera ett husdjur

1. Öppna husdjurets detaljpanel genom att klicka på dess rad i listningstabellen.
2. Scrolla till botten av panelen eller hitta sektionen **Åtgärder**.
3. Klicka på knappen **Blockera husdjur** (visas i rött).
4. En bekräftelsedialog visas.
5. I textfältet **Orsak**, ange en tydlig förklaring till varför detta husdjur blockeras.
6. Välj en **överträdelsekategori** från rullgardinsmenyn (t.ex. Bedräglig listning, Olämpligt innehåll, Dubblettprofil, Regelbrott).
7. Klicka på **Bekräfta blockering**.
8. Husdjurets status ändras till "Blockerad" och ägaren får ett meddelande med den angivna orsaken.

### Krav på blockeringsorsak

| Krav | Beskrivning |
|------|-------------|
| Minimilängd | Minst 20 tecken |
| Språk | Måste vara professionellt och tydligt |
| Specificitet | Ska referera till den specifika överträdelsen |
| Synlighet | Orsaken visas direkt för husdjursägaren |

> **Viktigt:** Blockeringsorsaken du anger visas för husdjursägaren i deras app-notis och e-post. Säkerställ att den är professionell, specifik och inte innehåller intern jargong.

### Avblockera ett husdjur

1. Använd **Status**-filtret för att välja "Blockerad" för att hitta blockerade husdjur.
2. Klicka på det blockerade husdjurets rad för att öppna detaljpanelen.
3. Hitta knappen **Avblockera husdjur** (visas i grönt) i sektionen Åtgärder.
4. En bekräftelsedialog visas som visar den ursprungliga blockeringsorsaken och datumet.
5. Lägg valfritt till en anteckning som förklarar varför blockeringen hävs.
6. Klicka på **Bekräfta avblockering**.
7. Husdjurets status återgår till "Aktiv" och ägaren meddelas.

### Blockeringshistorik

Varje husdjurs detaljpanel inkluderar en sektion för **Blockeringshistorik** om husdjuret någonsin har blivit blockerat:

| Kolumn | Beskrivning |
|--------|-------------|
| Datum | När blockeringen tillämpades |
| Administratör | Vilken administratör som utförde åtgärden |
| Orsak | Den angivna blockeringsorsaken |
| Varaktighet | Hur länge blockeringen varade |
| Lösning | Hur det löstes (avblockerad, överklagad, etc.) |

---

## Massoperationer

För storskaliga modereringsuppgifter stöder husdjurslistningstabellen massmarkering.

### Använda massmarkering

1. Markera **kryssrutan** på vänster sida av varje rad du vill välja.
2. Eller klicka på **rubrikens kryssruta** för att välja alla synliga rader på aktuell sida.
3. Ett **fält för massåtgärder** visas överst i tabellen och visar antalet markerade objekt.
4. Tillgängliga massåtgärder inkluderar:
   - **Exportera** - Ladda ner valda husdjur som en CSV-fil
   - **Ändra status** - Tillämpa en statusändring på alla valda husdjur

> **Obs:** Massblockering är inte tillgänglig via detta gränssnitt. Blockeringar måste tillämpas individuellt för att säkerställa att varje inkluderar en specifik orsak.

---

## Exportera husdjursdata

För att exportera husdjursregisterdata:

1. Tillämpa eventuella önskade filter för att begränsa datamängden.
2. Klicka på knappen **Exportera** i det övre högra hörnet av tabellen.
3. Välj exportformat (CSV eller Excel).
4. Välj om du vill exportera **filtrerade resultat** eller **alla poster**.
5. Filen laddas ned till din webbläsares standardplats för nedladdningar.

### Exporterade fält

| Fält | Inkluderad |
|------|:----------:|
| Husdjursnamn | Ja |
| Art | Ja |
| Ras | Ja |
| Kön | Ja |
| Status | Ja |
| Land | Ja |
| Stad | Ja |
| Ägarens e-post | Ja |
| Registreringsdatum | Ja |
| Mikrochipnummer | Ja |
| Hälsocertifieringsstatus | Ja |

> **Obs:** Foton och detaljerade hälsojournaler ingår inte i exporter. Endast sammanfattningsdata exporteras.

---

*Föregående: [Instrumentpanel](./dashboard.md) | Nästa: [Appanvändare](./users.md)*
