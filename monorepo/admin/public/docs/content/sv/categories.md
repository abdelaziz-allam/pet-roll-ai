# Husdjurskategorier

Modulen Husdjurskategorier låter administratörer definiera och hantera klassificeringssystemet som används för att organisera husdjur på Petfolioo-plattformen. Kategorier representerar husdjursarter eller -typer och används i hela applikationen för filtrering, sökning och organisering. Varje kategori inkluderar ett namn, etikett, emoji-ikon, beskrivning och aktiv status.

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

## Kategorilistning

Kategorisidan visar alla definierade husdjurskategorier i tabellformat med hanteringskontroller.

### Tabellkolumner

| Kolumn | Beskrivning | Sorterbar |
|--------|-------------|:---------:|
| Namn-slug | Maskinläsbar identifierare (t.ex. `dog`, `cat`, `bird`) | Ja |
| Etikett | Mänskligt läsbart visningsnamn (t.ex. "Hund", "Katt", "Fågel") | Ja |
| Emoji-ikon | Visuell ikon som representerar kategorin | Nej |
| Beskrivning | Kort beskrivning av vad kategorin inkluderar | Nej |
| Aktiv | Växelkontroll som visar om kategorin är aktiv | Ja |
| Åtgärder | Knappar för Redigera och Ta bort | Nej |

### Statusindikatorer

| Aktivt tillstånd | Visning | Betydelse |
|-----------------|---------|-----------|
| Aktiv | Grön växel (på-läge) | Kategorin är tillgänglig för husdjursregistrering och synlig i filter |
| Inaktiv | Grå växel (av-läge) | Kategorin är dold för användare men befintliga husdjur behåller sin kategori |

### Tabellfunktioner

1. **Sortera** genom att klicka på kolumnrubrikerna Namn-slug, Etikett eller Aktiv.
2. **Snabbväxla** genom att klicka på Aktiv-switchen direkt i tabellraden.
3. **Inline-åtgärder** via Redigera (pennikonen) och Ta bort (papperskorgsikonen) knappar i varje rad.
4. **Paginering** längst ned för bläddring när många kategorier finns.

> **Tips:** Inaktiva kategorier visas med en något blekare radstil för att visuellt skilja dem från aktiva.

---

## Skapa en kategori

Nya kategorier kan skapas för att stödja ytterligare husdjursarter eller -typer på plattformen.

### Steg för att skapa en kategori

1. Klicka på knappen **Lägg till kategori** i det övre högra hörnet av sidan Kategorier.
2. Ett skapandeformulär visas (antingen som en dialog eller inline-formulär).
3. Fyll i de obligatoriska fälten:

| Fält | Obligatoriskt | Beskrivning | Exempel |
|------|:------------:|-------------|---------|
| Namn-slug | Ja | Maskinläsbar identifierare | `golden_fish` |
| Etikett | Ja | Visningsnamn som visas för användare | "Guldfisk" |
| Emoji-ikon | Ja | Visuell ikon för kategorin | "fish" |
| Beskrivning | Nej | Kort förklaring av kategorin | "Sötvatten- och saltvattenfiskarter" |
| Aktiv | Nej | Om den ska aktiveras omedelbart (standard är aktiv) | På |

4. Välj en emoji-ikon från **Emoji-väljaren** (se nedan).
5. Granska dina uppgifter.
6. Klicka på **Skapa kategori** för att spara.
7. Den nya kategorin visas i listningstabellen.

### Konvention för namn-slug

Namn-sluggen måste följa dessa regler:

| Regel | Beskrivning | Exempel |
|-------|-------------|---------|
| Bara gemener | Inga versaler tillåtna | `dog` inte `Dog` |
| Understreck för mellanslag | Använd understreck för att separera ord | `guinea_pig` inte `guinea pig` |
| Alfanumeriskt + understreck | Bara bokstäver, siffror och understreck | `cat_1` är giltig, `cat-1` är inte |
| Unik | Får inte duplicera en befintlig kategori-slug | Systemet avvisar dubbletter |
| Inga inledande/avslutande understreck | Kan inte börja eller sluta med understreck | `_dog_` är ogiltig |
| Maximalt 50 tecken | Håll sluggar koncisa | Korta, beskrivande identifierare |

> **Viktigt:** Namn-sluggen kan inte ändras efter skapande. Den används som permanent identifierare i databasen och API:et. Välj noggrant.

### Emoji-väljare

Emoji-väljaren tillhandahåller över 100 djur- och naturikoner för kategoriidentifiering.

| Funktion | Beskrivning |
|----------|-------------|
| Sök | Skriv för att filtrera tillgängliga emojis efter nyckelord |
| Kategorier | Emojis organiserade efter grupp (Djur, Natur, Objekt) |
| Förhandsgranskning | Vald emoji visas i stor förhandsgranskning innan bekräftelse |
| Senaste | Tidigare använda emojis visas överst för snabb åtkomst |

**Använda emoji-väljaren:**

1. Klicka på **emoji-ikonfältet** för att öppna väljaren.
2. Bläddra bland kategorier eller skriv ett nyckelord i sökningen (t.ex. "dog", "fish", "bird").
3. Klicka på önskad emoji för att välja den.
4. Den valda emojin visas i formulärfältet som förhandsgranskning.
5. För att ändra ditt val, klicka på fältet igen för att öppna väljaren.

Tillgängliga emoji-kategorier inkluderar:

| Grupp | Exempel-emojis |
|-------|---------------|
| Tamdjur | Hund, Katt, Hamster, Kanin, Mus |
| Lantbruksdjur | Häst, Ko, Gris, Får, Get, Höna |
| Fåglar | Papegoja, Örn, Uggla, Anka, Flamingo, Påfågel |
| Reptiler | Ödla, Orm, Sköldpadda, Krokodil, Dinosaurie |
| Vattenlevande | Fisk, Tropisk fisk, Val, Delfin, Bläckfisk, Haj |
| Insekter | Fjäril, Bi, Skalbagge, Myra, Syrsa |
| Vilda djur | Lejon, Tiger, Björn, Apa, Elefant, Giraff |
| Tass/Generellt | Tassavtryck, Ben, Hjärta, Stjärna |

---

## Redigera kategorier

Befintliga kategorier kan ändras för att uppdatera deras etikett, ikon, beskrivning eller aktiva status.

### Steg för att redigera en kategori

1. Hitta kategorin du vill redigera i listningstabellen.
2. Klicka på knappen **Redigera** (pennikonen) i radens kolumn Åtgärder.
3. Ett redigeringsformulär visas med aktuella värden ifyllda.
4. Ändra valfritt av de redigerbara fälten:

| Fält | Redigerbart | Anteckningar |
|------|:-----------:|--------------|
| Namn-slug | Nej | Kan inte ändras efter skapande |
| Etikett | Ja | Uppdatera visningsnamnet |
| Emoji-ikon | Ja | Välj en ny emoji från väljaren |
| Beskrivning | Ja | Uppdatera eller lägg till en beskrivning |
| Aktiv | Ja | Växla aktiv/inaktiv status |

5. Gör dina ändringar.
6. Klicka på **Spara ändringar** för att tillämpa.
7. En framgångsnotis bekräftar uppdateringen.
8. Listningstabellen speglar ändringarna omedelbart.

### Redigeringsöverväganden

| Övervägande | Detalj |
|-------------|--------|
| Etikettändringar | Speglas omedelbart i appen för alla användare |
| Emoji-ändringar | Uppdateras på alla platser i gränssnittet där kategorin visas |
| Beskrivningsändringar | Synliga på kategorivalskärmar i appen |
| Befintliga husdjur | Husdjur som redan tilldelats denna kategori påverkas inte av redigeringar |

> **Obs:** Att ändra en kategoris etikett ändrar inte dess slug. Sluggen förblir den permanenta identifieraren. Användare och husdjur refererar till kategorier via slug internt.

---

## Aktivera och inaktivera kategorier

Kategorier kan växlas mellan aktiva och inaktiva tillstånd utan borttagning.

### Aktivera en kategori

1. Hitta den inaktiva kategorin i listningen (visas med grå växel).
2. Klicka på **växelkontrollen** i kolumnen Aktiv för att slå den till på-läge.
3. Alternativt, klicka på Redigera och växla fältet Aktiv i redigeringsformuläret.
4. Bekräfta åtgärden om du uppmanas.
5. Kategorin blir tillgänglig för husdjursregistrering omedelbart.

### Inaktivera en kategori

1. Hitta den aktiva kategorin i listningen (visas med grön växel).
2. Klicka på **växelkontrollen** för att slå den till av-läge.
3. En bekräftelsedialog visas som förklarar påverkan.
4. Klicka på **Bekräfta inaktivering**.
5. Kategorin döljs från nya husdjursregistreringar.

### Effekt av inaktivering

| Påverkansområde | Effekt |
|-----------------|--------|
| Nya registreringar | Kategorin visas inte längre i rullgardinsmenyer för artval |
| Befintliga husdjur | Husdjur som redan tilldelats denna kategori behåller sin tilldelning |
| Filter | Kategorin visas inte längre i filterrullgardinsmenyer för publika användare |
| Adminportalen | Kategorin är fortfarande synlig för administratörer med inaktiv stil |
| API-svar | Kategorin exkluderas från aktiva kategorilistor |
| Återaktivering | Kan återaktiveras när som helst, vilket återställer full funktionalitet |

> **Tips:** Inaktivering föredras framför borttagning när du vill tillfälligt dölja en kategori eller när befintliga husdjur fortfarande använder den. Det bevarar dataintegritet medan ny användning begränsas.

---

## Knappen Standardvärden

Funktionen Standardvärden fyller kategoritabellen med en fördefinierad uppsättning vanliga husdjurskategorier. Detta är användbart vid initial plattformskonfiguration eller för att återställa standardkategorier.

### Använda Standardvärden

1. Klicka på knappen **Standardvärden** som finns ovanför eller under kategoritabellen.
2. En bekräftelsedialog visas som listar de kategorier som kommer att skapas.
3. Granska listan med standardkategorier.
4. Klicka på **Bekräfta** för att fortsätta.
5. Standardkategorierna skapas och visas i listningen.

### Standardkategoriuppsättning

Standardvärdena skapar följande standardkategorier (om de inte redan finns):

| Namn-slug | Etikett | Emoji | Beskrivning |
|-----------|---------|:-----:|-------------|
| `dog` | Hund | Hundansikte | Tamhundar av alla raser |
| `cat` | Katt | Kattansikte | Tamkatter av alla raser |
| `bird` | Fågel | Fågel | Husdjursfåglar inklusive papegojor, kanariefåglar och finkar |
| `rabbit` | Kanin | Kaninansikte | Tamkaniner |
| `hamster` | Hamster | Hamsteransikte | Hamstrar, gerbiler och liknande små gnagare |
| `fish` | Fisk | Fisk | Söt- och saltvattenakvariefiskar |
| `turtle` | Sköldpadda | Sköldpadda | Sköldpaddor och landsköldpaddor |
| `snake` | Orm | Orm | Icke-giftiga husormar |
| `lizard` | Ödla | Ödla | Geckos, iguaner och andra husdjursödlor |
| `horse` | Häst | Hästansikte | Hästar och ponnyer |
| `guinea_pig` | Marsvin | Marsvin | Marsvin och cavianer |
| `ferret` | Iller | Iller | Tamillrar |

### Beteende vid standardvärden

| Scenario | Beteende |
|----------|----------|
| Tom tabell | Alla standardvärden skapas |
| Vissa standardvärden finns | Bara saknade standardvärden skapas (inga dubbletter) |
| Alla standardvärden finns | Inga ändringar görs, bekräftelsemeddelande visas |
| Anpassade kategorier finns | Anpassade kategorier påverkas inte |

> **Obs:** Knappen Standardvärden tar inte bort eller ändrar befintliga kategorier. Den lägger bara till saknade standardposter. Dina anpassade kategorier är säkra.

---

## Ta bort en kategori

Kategorier kan permanent tas bort när de inte längre behövs. Denna åtgärd kräver noggrant övervägande på grund av dess påverkan på befintliga data.

### Steg för att ta bort en kategori

1. Hitta kategorin i listningstabellen.
2. Klicka på knappen **Ta bort** (papperskorgsikonen) i radens kolumn Åtgärder.
3. En varningsdialog visas med:
   - Kategorins namn och aktuellt antal husdjur som använder denna kategori
   - En varning om påverkan på befintliga husdjur
   - Ett textbekräftelsefält (skriv kategorins slug för att bekräfta)
4. Läs varningen noggrant.
5. Skriv kategorins **namn-slug** i bekräftelsefältet.
6. Klicka på **Ta bort kategori** för att permanent ta bort den.

### Effekt av borttagning

| Påverkansområde | Effekt |
|-----------------|--------|
| Kategoripost | Tas permanent bort från databasen |
| Befintliga husdjur | Husdjur som tidigare var i denna kategori blir **okategoriserade** |
| Husdjursprofiler | Artfältet visar "Okategoriserad" eller tomt |
| Filter | Kategorin tas bort från alla filterrullgardinsmenyer |
| Analyser | Historisk data kan visa "Okänd kategori" för tidigare poster |
| Reversibilitet | Kan inte ångras (måste återskapas manuellt vid behov) |

### Husdjur blir okategoriserade

När en kategori tas bort:

1. Alla husdjur tilldelade den kategorin förlorar sin kategoritilldelning.
2. Dessa husdjur visas med etiketten "Okategoriserad" i husdjursregistret.
3. Husdjursägare meddelas **inte** automatiskt.
4. Administratörer kan omtilldela okategoriserade husdjur till en annan kategori via massredigering.
5. Husdjursantalet för den borttagna kategorin visas i borttagningsbekräftelsedialogen.

> **Viktigt:** Att ta bort en kategori med aktiva husdjur tilldelade den lämnar dessa husdjur okategoriserade. Överväg att inaktivera kategorin istället, eller omtilldela husdjur före borttagning.

### Borttagningsbegränsningar

| Begränsning | Beskrivning |
|-------------|-------------|
| Standardkategorier | Standardkategorier som skapats med Standardvärden kan tas bort (de kan återskapas) |
| Aktiva husdjur | Kategorier med husdjur kan tas bort (husdjur blir okategoriserade) |
| Bekräftelse krävs | Slug måste skrivas för att bekräfta borttagning |
| Rollkrav | Endast roller `super_admin` och `admin` kan ta bort kategorier |

---

## Bästa praxis

### Riktlinjer för kategorihantering

1. **Använd tydliga, enkla etiketter** - Kategorietiketter bör vara omedelbart förståeliga för alla användare oavsett språkkunskap.
2. **Välj representativa emojis** - Välj emojis som tydligt representerar djurtypen för att underlätta snabb visuell igenkänning.
3. **Skriv hjälpsamma beskrivningar** - Beskrivningar hjälper användare att välja rätt kategori vid registrering av sitt husdjur.
4. **Inaktivera före borttagning** - Om du är osäker på om en kategori behövs, inaktivera den först. Ta bara bort när du är säker.
5. **Håll sluggar beskrivande** - Eftersom sluggar inte kan ändras, välj dem noggrant vid skapande.
6. **Övervaka okategoriserade husdjur** - Kontrollera regelbundet om det finns husdjur utan kategorier och tilldela dem lämpligt.

### Exempel på kategorinamngivning

| Bra | Dåligt | Varför |
|-----|--------|--------|
| `guinea_pig` | `gp` | Beskrivande och läsbart |
| `tropical_fish` | `tropicalFish` | Följer understreckskonventionen |
| `parrot` | `Parrot_1` | Gemener, inga siffror behövs |
| `persian_cat` | `cat_breed_persian` | Koncist, rasnivå vid behov |

---

## Vanliga frågor

**F: Kan jag sammanfoga två kategorier?**
S: Det finns ingen inbyggd sammanfogningsfunktion. För att konsolidera kategorier, omtilldela husdjur från en kategori till en annan och ta sedan bort den tomma kategorin.

**F: Vad händer med filter när jag inaktiverar en kategori?**
S: Kategorin tas bort från användarriktade filterrullgardinsmenyer men förblir tillgänglig i adminportalens filter för hanteringsändamål.

**F: Kan jag ändra ordningen på kategorier?**
S: Kategorier visas alfabetiskt efter etikett i användarriktade gränssnitt. Admintabellen kan sorteras efter valfri kolumnrubrik.

**F: Finns det en gräns för hur många kategorier jag kan skapa?**
S: Det finns ingen hård teknisk gräns, men för användbarhet bör det totala antalet hållas hanterbart (under 30 rekommenderas) så att användare enkelt kan hitta rätt kategori.

---

*Föregående: [Appanvändare](./users.md)*
