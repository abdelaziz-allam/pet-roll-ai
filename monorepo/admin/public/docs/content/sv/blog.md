# Blogg CMS

Modulen Blogg CMS låter administratörer skapa, redigera, publicera och hantera blogginlägg som visas på Petfolioos publika webbplats. Använd detta verktyg för att dela tips om djurvård, plattformsnyheter, uppfödarporträtt och utbildningsinnehåll med din gemenskap.

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

## Tabell med blogginlägg

Huvudvyn visar alla blogginlägg i en sökbar, sorterbar tabell.

| Kolumn | Beskrivning |
|--------|-------------|
| Titel | Inläggets titel med klickbar länk för redigering |
| Status | Publiceringsstatus |
| Författare | Namn på administratören som skapade inlägget |
| Visningar | Totalt antal sidvisningar sedan publicering |
| Datum | Skapandedatum (eller publiceringsdatum om publicerat) |

### Statusmärken

| Status | Färg | Beskrivning |
|--------|------|-------------|
| Utkast | Grå | Inlägget är sparat men inte synligt för allmänheten |
| Publicerad | Grön | Inlägget är live och synligt på webbplatsen |
| Utvald | Guld | Inlägget är publicerat och fäst överst |

### Tabellåtgärder

- Klicka på en inläggstitel för att öppna det för redigering.
- Använd åtgärdsmenyn (tre punkter) på varje rad för snabbåtgärder: Publicera, Avpublicera, Fäst, Avfäst, Ta bort.
- Sortera efter valfri kolumn genom att klicka på kolumnrubriken.
- Använd sökfältet för att filtrera inlägg efter titel eller innehållsnyckelord.

> **Tips:** Sortera efter Visningar fallande för att identifiera ditt mest populära innehåll. Använd dessa insikter för att planera framtida inlägg om liknande ämnen.

---

## Skapa ett inlägg

För att skapa ett nytt blogginlägg:

1. Klicka på knappen **Skapa inlägg** i det övre högra hörnet av tabellen Blogginlägg.
2. Inläggsredigeraren öppnas med följande fält.

### Titel

- Ange inläggets titel i titelfältet överst.
- Maximalt 200 tecken.
- Titeln visas som huvudrubrik på den publicerade sidan.
- Välj beskrivande, engagerande titlar som innehåller relevanta nyckelord.

### Slug

- URL-sluggen genereras automatiskt från titeln.
- Format: gemener, bindestreck ersätter mellanslag, specialtecken tas bort.
- Exempel: "Topp 10 tips för nya valpägare" blir `topp-10-tips-for-nya-valpagare`.
- Du kan manuellt redigera sluggen om den autogenererade versionen är för lång eller otydlig.
- Sluggen måste vara unik bland alla inlägg.

> **Tips:** Håll sluggar korta och nyckelordsrika för bättre SEO. Förkorta manuellt autogenererade sluggar som överskrider 5-6 ord.

### HTML-innehåll

- Huvudinnehållsområdet accepterar HTML för rik formatering.
- Använd verktygsraden i den rika textredigeraren för vanlig formatering:
  - Fet, kursiv, understrykning
  - Rubriker (H2, H3, H4)
  - Ordnade och oordnade listor
  - Länkar
  - Bilder (inline)
  - Blockcitat
  - Kodblock
- Byt till **Källkodsläge** för att redigera rå HTML direkt.
- Innehållet stöder alla standard HTML-taggar.

#### Bästa praxis för innehåll

| Gör | Gör inte |
|-----|----------|
| Använd H2 för huvudsektioner, H3 för undersektioner | Använd H1 (reserverad för titeln) |
| Inkludera bilder för att bryta upp lång text | Publicera väggar av oformaterad text |
| Håll stycken korta (3-4 meningar) | Skriv stycken längre än 5 meningar |
| Använd listor för flera relaterade punkter | Bädda in externa skript eller iframes |
| Lägg till alt-text på alla bilder | Använd inline-stilar för färger |

### Utdrag

- Skriv en kort sammanfattning av inlägget (maximalt 500 tecken).
- Utdraget visas i blogglistningssidor, sökresultat och förhandsvisningar på sociala medier.
- Om det lämnas tomt används automatiskt de första 500 tecknen av innehållet.
- Teckenräknaren visar återstående tecken medan du skriver.

> **Tips:** Skriv utdraget som en lockande teaser som får läsare att vilja klicka vidare. Det bör fungera fristående som en komplett tanke, inte sluta mitt i en mening.

### Omslagsbilduppladdning

1. Klicka på området **Ladda upp omslagsbild** eller dra och släpp en bildfil.
2. Stödda format: JPEG, PNG, WebP.
3. Rekommenderade dimensioner: 1200 x 630 pixlar (optimerat för delning på sociala medier).
4. Maximal filstorlek: 5 MB.
5. Efter uppladdning visas en förhandsgranskning av bilden.
6. Klicka på **Ta bort** för att radera den aktuella omslagsbilden och ladda upp en annan.

#### Riktlinjer för omslagsbild

- Använd bilder av hög kvalitet som är relevanta och representerar inläggets innehåll.
- Undvik textöverlägg på omslagsbilder (de kan beskäras på olika enheter).
- Säkerställ att du har rätt att använda bilden (originalfoton eller korrekt licenserade stockbilder).
- Bilder optimeras automatiskt för webbvisning efter uppladdning.

### Taggar

- Ange taggar som kommaseparerade värden i taggfältet.
- Exempel: `valpvård, träning, näring, nya ägare`
- Taggar hjälper till att kategorisera inlägg och förbättra sökbarhet.
- Befintliga taggar föreslås automatiskt medan du skriver.
- Det finns ingen gräns för antalet taggar, men 3-7 taggar per inlägg rekommenderas.

> **Tips:** Använd konsekvent taggnamn i alla inlägg. Kontrollera befintliga taggar innan du skapar nya variationer (t.ex. använd "valpvård" konsekvent istället för att alternera med "valp-vård" eller "Valpvård").

### SEO-inställningar

SEO-sektionen låter dig optimera hur inlägget visas i sökmotorer.

#### Meta-titel

- Maximalt 60 tecken.
- Visas som den klickbara rubriken i sökresultat.
- Om den lämnas tom används inläggets titel.
- Teckenräknaren blir röd när den närmar sig eller överskrider 60 tecken.
- Bästa praxis: Inkludera primärt nyckelord nära början.

#### Meta-beskrivning

- Maximalt 160 tecken.
- Visas som beskrivningstexten under titeln i sökresultat.
- Om den lämnas tom används utdraget.
- Teckenräknaren blir röd när den närmar sig eller överskrider 160 tecken.
- Bästa praxis: Inkludera en uppmaning till handling och primärt nyckelord.

#### SEO-förhandsvisning

Under metafälten visas en förhandsvisning av hur inlägget kommer att se ut i Googles sökresultat:

```
+--------------------------------------------------+
| Meta-titel (eller Inläggets titel om tom)        |
| https://petfolioo.com/blog/din-slug-har          |
| Meta-beskrivning (eller Utdrag om tomt) visas    |
| här som det skulle i sökresultat...              |
+--------------------------------------------------+
```

> **Tips:** Fyll alltid i både meta-titel och meta-beskrivning manuellt. Autogenererade värden från titeln och utdraget kanske inte är optimerade för sökintention.

### Spara som utkast

1. Efter att ha fyllt i önskade fält, klicka på **Spara utkast**.
2. Inlägget sparas med status Utkast.
3. Du kan återkomma för att redigera det när som helst från tabellen Blogginlägg.
4. Utkast är inte synliga för allmänheten.

---

## Publicera ett inlägg

För att publicera ett utkast och göra det synligt på webbplatsen:

1. Öppna inlägget från tabellen Blogginlägg.
2. Granska allt innehåll, bilder och SEO-inställningar.
3. Klicka på knappen **Publicera** i det övre högra hörnet.
4. I bekräftelsedialogen:
   - Granska inläggets titel och slug.
   - Bekräfta publiceringen.
5. Klicka på **Bekräfta publicering**.

### Vad som händer efter publicering

- Inläggets status ändras till **Publicerad**.
- Inlägget blir omedelbart synligt på den publika bloggsidan.
- Publiceringsdatumet registreras (används för sortering på bloggen).
- Inläggets URL blir aktiv: `https://petfolioo.com/blog/[slug]`.
- Sökmotorer kan nu indexera inlägget.

### Publiceringschecklista

Före publicering, verifiera:

- [ ] Titeln är tydlig, engagerande och fri från stavfel
- [ ] Innehållet är komplett och korrekt formaterat
- [ ] Alla bilder laddas korrekt
- [ ] Länkar fungerar och öppnas i lämpliga flikar
- [ ] Omslagsbilden är uppladdad och ser bra ut
- [ ] Utdraget är skrivet och under 500 tecken
- [ ] Taggar har lagts till och formaterats korrekt
- [ ] Meta-titeln är under 60 tecken
- [ ] Meta-beskrivningen är under 160 tecken
- [ ] Sluggen är ren och nyckelordsrik

---

## Avpublicera ett inlägg

För att ta bort ett publicerat inlägg från den publika webbplatsen:

1. Hitta inlägget i tabellen Blogginlägg.
2. Klicka på åtgärdsmenyn (tre punkter) på raden.
3. Välj **Avpublicera**.
4. Bekräfta åtgärden i dialogen.

### Vad som händer efter avpublicering

- Inläggets status ändras tillbaka till **Utkast**.
- Inlägget tas omedelbart bort från den publika bloggsidan.
- URL:en returnerar en 404-sida.
- Visningsantal bevaras.
- Du kan publicera om inlägget när som helst.

> **Tips:** Avpublicera istället för att ta bort om du vill tillfälligt ta bort innehåll. Avpublicerade inlägg behåller all sin data och kan återställas direkt.

---

## Fäst/Avfäst som utvald

Utvalda inlägg visas framträdande överst på bloggsidan, ovanför kronologiska listningar.

### Fästa ett inlägg

1. Hitta ett publicerat inlägg i tabellen Blogginlägg.
2. Klicka på åtgärdsmenyn (tre punkter).
3. Välj **Fäst som utvald**.
4. Statusmärket ändras till **Utvald** (guld).

### Avfästa ett inlägg

1. Hitta det utvalda inlägget i tabellen.
2. Klicka på åtgärdsmenyn (tre punkter).
3. Välj **Avfäst**.
4. Statusen återgår till **Publicerad** (grön).

### Regler för utvalda inlägg

- Endast publicerade inlägg kan fästas.
- Flera inlägg kan vara utvalda samtidigt.
- Utvalda inlägg visas i den ordning de fästes (senast fästa först).
- Att avfästa ett inlägg avpublicerar det inte; det förblir publicerat.

> **Tips:** Begränsa utvalda inlägg till 2-3 åt gången. För många utvalda inlägg späder ut betoningen och trycker ner ordinarie innehåll under scroll-gränsen.

---

## Visa på webbplats

För att förhandsgranska hur ett publicerat inlägg ser ut på den publika webbplatsen:

1. Öppna inlägget från tabellen Blogginlägg.
2. Klicka på länken **Visa på webbplats** i det övre högra området (bredvid knappen Publicera).
3. En ny webbläsarflik öppnas som visar inlägget på den publika webbplatsen.

### Anteckningar

- Länken Visa på webbplats är endast tillgänglig för inlägg med status Publicerad och Utvald.
- Utkast kan inte förhandsgranskas på den publika webbplatsen.
- Länken öppnar den aktuella live-versionen; osparade ändringar i redigeraren visas inte.

> **Tips:** Visa alltid på webbplatsen efter publicering för att verifiera att formatering, bilder och layout visas korrekt i det publika temat.

---

## Ta bort ett inlägg

För att permanent ta bort ett blogginlägg:

1. Hitta inlägget i tabellen Blogginlägg.
2. Klicka på åtgärdsmenyn (tre punkter).
3. Välj **Ta bort**.
4. En bekräftelsedialog visas:
   - Visar inläggets titel.
   - Varnar att borttagning är permanent.
   - Ber dig skriva inläggets titel för att bekräfta (för publicerade inlägg).
5. Klicka på **Bekräfta borttagning**.

### Vad som händer efter borttagning

- Inlägget tas permanent bort från systemet.
- URL:en returnerar en 404-sida.
- Inlägget kan inte återställas efter borttagning.
- Visningsstatistik går förlorad.
- Sluggen blir tillgänglig för återanvändning.

### När ska man ta bort vs. avpublicera

| Scenario | Åtgärd |
|----------|--------|
| Tillfällig borttagning av innehåll | Avpublicera |
| Föråldrat innehåll som kan uppdateras senare | Avpublicera |
| Testinlägg eller oavsiktliga dubbletter | Ta bort |
| Innehåll som aldrig borde ha skapats | Ta bort |
| Juridiskt problematiskt innehåll | Ta bort |

> **Tips:** Borttagning är oåterkallelig. När du är osäker, avpublicera istället. Du kan alltid ta bort ett avpublicerat inlägg senare, men du kan inte återställa ett borttaget inlägg.

---

## Bilduppladdning för omslagsfoton

Omslagsbilduppladdningskomponenten stöder följande arbetsflöde:

### Uppladdningsmetoder

1. **Klicka för att ladda upp:** Klicka på uppladdningsområdet för att öppna din filhanterare.
2. **Dra och släpp:** Dra en bildfil från ditt skrivbord direkt till uppladdningsområdet.

### Uppladdningsprocess

1. Välj eller släpp din bildfil.
2. Uppladdningsförloppsindikatorn visas.
3. När det är klart visas bildförhandsgranskningen i uppladdningsområdet.
4. Bildens URL sparas automatiskt med inlägget.

### Bildkrav

| Krav | Värde |
|------|-------|
| Format | JPEG, PNG, WebP |
| Minimidimensioner | 600 x 315 pixlar |
| Rekommenderade dimensioner | 1200 x 630 pixlar |
| Maximal filstorlek | 5 MB |
| Bildförhållande | 1.91:1 rekommenderat (optimerat för sociala medier) |

### Hantera uppladdade bilder

- **Ersätt:** Klicka på knappen **Ta bort** under förhandsgranskningen och ladda sedan upp en ny bild.
- **Förhandsgranska:** Klicka på bildförhandsgranskningen för att se den i full storlek.
- **Alt-text:** Ange beskrivande alt-text i fältet under bilden (viktigt för tillgänglighet och SEO).

### Bildoptimering

Uppladdade bilder:

- Komprimeras automatiskt för webbvisning (med bibehållen kvalitet).
- Serveras via CDN för snabb laddning.
- Konverteras till WebP-format för webbläsare som stöder det.
- Storleksändras till flera dimensioner för responsiv visning.

> **Tips:** Förbered dina omslagsbilder i 1200 x 630 pixlar innan uppladdning. Detta är den optimala storleken för både bloggvisning och delning på sociala medier (Open Graph).

---

## Vanliga frågor

**F: Kan flera administratörer redigera samma inlägg?**
S: Ja, men det finns ingen realtidssamarbetsfunktion. Den sista personen som sparar skriver över tidigare ändringar. Koordinera med ditt team för att undvika konflikter.

**F: Finns det en revisionshistorik?**
S: Nej. Varje sparning skriver över den tidigare versionen. Kopiera viktigt innehåll någon annanstans innan du gör större ändringar.

**F: Kan jag schemalägga ett inlägg för publicering vid ett framtida datum?**
S: Inte för närvarande. Inlägg är antingen utkast eller omedelbart publicerade. Spara som utkast och publicera manuellt vid önskat tillfälle.

**F: Vad händer med SEO om jag ändrar ett publicerat inläggs slug?**
S: Den gamla URL:en returnerar 404. Sökmotorer kommer så småningom att avindexera den gamla URL:en och indexera den nya. Undvik att ändra sluggar på etablerade inlägg.

**F: Kan jag bädda in videor i blogginlägg?**
S: Ja, använd HTML-källkodsläget för att bädda in video-iframes från YouTube eller Vimeo i innehållsområdet.

**F: Finns det en ord- eller teckengräns för inläggets innehåll?**
S: Det finns ingen hård gräns för innehållets längd. Inlägg mellan 800-2000 ord tenderar dock att prestera bäst för SEO och läsarengagemang.
