# Parningsmarknad

Modulen Parningsmarknad ger administratörer överblick över plattformens system för avelsmatchning. Övervaka matchförfrågningar, spåra lyckade parningar och visa uppfödarnas prestationsrankningar.

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

## Navigationsflikar

Sidan Parningsmarknad är organiserad i två huvudflikar:

| Flik | Beskrivning |
|------|-------------|
| Matchningar och förfrågningar | Visa och hantera alla parningsmatchningar och väntande förfrågningar |
| Uppfödarrankningar | Topplistor som visar de mest framgångsrika uppfödarna |

Byt mellan flikar genom att klicka på flikrubriken högst upp på sidan.

---

## Fliken Matchningar och förfrågningar

Denna flik visar alla parningsmatchningar som visuella kort och ger en intuitiv översikt av avelsaktiviteten på plattformen.

### Matchningskort

Varje matchning representeras som ett kort som visar två husdjur kopplade med ett visuellt hjärta.

#### Kortlayout

```
+------------------------------------------+
|  [Husdjur A Foto]  <3  [Husdjur B Foto]  |
|  Husdjur A Namn        Husdjur B Namn    |
|  Ras                   Ras               |
|  Ägare                 Ägare             |
|                                          |
|  Status: [Märke]       Listad: [Datum]   |
|  Art: [Tagg]           Plats: [Stad]     |
+------------------------------------------+
```

#### Kortinformation

| Element | Beskrivning |
|---------|-------------|
| Husdjursfoton | Profilfoton av båda husdjuren i matchningen |
| Hjärtkoppling | Visuell länk mellan de två husdjuren (animerad för aktiva matchningar) |
| Husdjursnamn | Namn på båda husdjuren |
| Raser | Rasinformation för varje husdjur |
| Ägare | Ägarnas namn (klickbara för att visa profiler) |
| Statusmärke | Aktuell matchningsstatus |
| Listningsdatum | När matchförfrågan skapades |
| Arttagg | Husdjurens art |
| Plats | Stad/land för listningen |

### Matchningsstatusar

| Status | Färg | Beskrivning |
|--------|------|-------------|
| Väntande | Orange | Matchförfrågan skickad, väntar på svar |
| Accepterad | Grön | Båda parter har accepterat matchningen |
| Avböjd | Röd | En part avböjde matchningen |
| Genomförd | Blå | Parning bekräftad som genomförd |
| Avbruten | Grå | Matchningen avbröts av endera parten |
| Utgången | Ljusgrå | Förfrågan löpte ut utan svar |

---

## Filter

Filterfältet låter dig begränsa de visade matchningarna.

### Statusfilter

Välj en eller flera statusar att visa:

1. Klicka på rullgardinsmenyn **Status**.
2. Markera de statusar du vill se.
3. Kortrutnätet uppdateras omedelbart.

### Artfilter

Filtrera matchningar efter husdjursart:

- Alla arter (standard)
- Hund
- Katt
- Fågel
- Kanin
- Övrigt

### Landsfilter

Välj ett eller flera länder att filtrera efter matchningsplats.

### Stadsfilter

Begränsa ytterligare genom att välja specifika städer.

> **Tips:** Använd Status: Accepterad + ditt land för att se lyckade matchningar i din region som kan behöva åtgärden "Skicka bröllopskort".

---

## Detaljpanel

Klicka på valfritt matchningskort för att öppna detaljpanelen på höger sida av skärmen.

### Sektion med husdjursfoton

Längst upp i panelen visas större versioner av båda husdjurens foton sida vid sida med hjärtkopplingen mellan dem.

- Klicka på endera fotot för att visa i full storlek.
- Svep genom ytterligare foton om husdjuret har ett galleri.

### Listningsinformation

| Fält | Beskrivning |
|------|-------------|
| Listnings-ID | Unikt identifierare för matchlistningen |
| Skapad av | Vilken husdjursägare som initierade listningen |
| Skapad datum | Datum då listningen först publicerades |
| Matchdatum | Datum då matchningen föreslogs |
| Svarsdatum | Datum då matchningen accepterades/avböjdes (om tillämpligt) |
| Art | Art för båda husdjuren |
| Raser | Detaljerad rasinformation |
| Plats | Fullständiga platsdetaljer |
| Anteckningar | Eventuella anteckningar från listningsägaren |

### Matchningstidslinje

Panelen inkluderar en kronologisk tidslinje av händelser:

1. **Listning skapad** -- Ägaren publicerade sin husdjursparningslistning
2. **Matchning föreslagen** -- Matchningsalgoritmen eller manuell förfrågan initierade matchningen
3. **Matchning visad** -- Den andra parten granskade matchförslaget
4. **Svar givet** -- Acceptera/avböja med tidsstämpel
5. **Genomförande registrerat** -- Om parning bekräftats som genomförd
6. **Bröllopskort skickat** -- Om administratör skickade en gratulationsnotis

Varje tidslinjehändelse visar:

- Datum och tid
- Aktör (system, ägare A, ägare B eller administratör)
- Händelsebeskrivning
- Ytterligare anteckningar (om några)

> **Tips:** Tidslinjen hjälper dig förstå det fullständiga sammanhanget för en matchning vid utredning av tvister eller problem rapporterade av användare.

---

## Skicka bröllopskort

Åtgärden "Skicka bröllopskort" låter administratörer skicka en gratulationsnotis till båda husdjursägarna när en matchning accepteras eller genomförs.

### Hur man skickar ett bröllopskort

1. Öppna detaljpanelen för en **Accepterad** eller **Genomförd** matchning.
2. Klicka på knappen **Skicka bröllopskort** längst ned i panelen.
3. I dialogen:
   - Förhandsgranska notismeddelandet (autogenererat med båda husdjursnamnen).
   - Lägg valfritt till ett personligt gratulationsmeddelande.
   - Granska mottagarna (båda husdjursägarna).
4. Klicka på **Skicka**.

### Vad bröllopskortet innehåller

- Gratulationsrubrik med båda husdjursnamnen
- Husdjursfoton arrangerade med dekorativa element
- Matchdatum och plats
- Personligt administratörsmeddelande (om angivet)
- Länk till matchdetaljsidan

### När man bör skicka

- Efter att en matchning accepterats och båda parter bekräftar att de fortsätter.
- Efter att en matchning markerats som genomförd.
- Endast en gång per matchning (knappen inaktiveras efter sändning).

> **Tips:** Bröllopskort är ett verktyg för community-engagemang. Att skicka dem för accepterade matchningar uppmuntrar plattformsdeltagande och skapar en positiv upplevelse för uppfödare.

---

## Fliken Uppfödarrankningar

Fliken Uppfödarrankningar lyfter fram de mest aktiva och framgångsrika uppfödarna på plattformen.

### Övergripande topp 10-podium

Överst i fliken Rankningar visar en podiumvisualisering de 10 bästa uppfödarna oavsett art.

#### Podiumlayout

```
              [1:a]
        [2:a]       [3:e]
   [4:e]  [5:e]  [6:e]  [7:e]
      [8:e]   [9:e]   [10:e]
```

Varje podiumposition visar:

- Uppfödarnamn
- Kennelnamn
- Profilfoto
- Totalt antal matchningar
- Framgångsfrekvens i procent

#### Podiumpoängsättning

Uppfödare rankas efter en sammansatt poäng baserad på:

| Faktor | Vikt | Beskrivning |
|--------|------|-------------|
| Totalt antal matchningar | 30% | Antal matchningar initierade eller mottagna |
| Framgångsfrekvens | 40% | Andel matchningar som nådde Accepterad/Genomförd |
| Aktiva listningar | 15% | Antal aktuellt aktiva parningslistningar |
| Svarstid | 15% | Genomsnittlig tid att svara på matchförslag |

### Topp 10 per art-rutnät

Under det övergripande podiet visar ett rutnät de 10 bästa uppfödarna för varje art separat.

#### Rutnätslayout

Varje art har sitt eget kort:

```
+-------------------+  +-------------------+  +-------------------+
|  Hundar Topp 10   |  |  Katter Topp 10   |  |  Fåglar Topp 10  |
| 1. Uppfödarnamn   |  | 1. Uppfödarnamn   |  | 1. Uppfödarnamn   |
| 2. Uppfödarnamn   |  | 2. Uppfödarnamn   |  | 2. Uppfödarnamn   |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Varje post i artrutnätet visar:

- Ranknummer
- Uppfödarnamn
- Kennelnamn
- Antal matchningar för den arten
- Framgångsfrekvens för den arten

> **Tips:** Artspecifika rankningar hjälper till att identifiera specialistuppfödare som kan vara utmärkta kandidater för plattformspartnerskap eller utvalda listningar.

---

## Sorterbar rankningstabell

Under de visuella rankningarna ger en fullständig datatabell detaljerad uppfödarstatistik.

### Tabellkolumner

| Kolumn | Sorterbar | Beskrivning |
|--------|-----------|-------------|
| Rang | Ja | Aktuell position baserad på standardpoängsättning |
| Uppfödarnamn | Ja | Uppfödarens fullständiga namn |
| Kennel | Ja | Kennelnamn |
| Matchningar | Ja | Totalt antal matchningar (initierade + mottagna) |
| Listningar | Ja | Antal skapade parningslistningar |
| Framgångsfrekvens | Ja | Andel matchningar som nått Accepterad/Genomförd |
| Visningar | Ja | Totalt antal visningar på deras parningslistningar |
| Art | Nej | Primär art de föder upp |
| Plats | Nej | Land och stad |

### Sortera tabellen

1. Klicka på valfri sorterbar kolumnrubrik för att sortera stigande.
2. Klicka igen för att sortera fallande.
3. Ett tredje klick tar bort sorteringen på den kolumnen.
4. Du kan sortera efter flera kolumner (håll Shift och klicka).

### Tabellinteraktioner

- Klicka på en uppfödarrad för att visa deras fullständiga profil och matchhistorik.
- Använd sökfältet ovanför tabellen för att hitta en specifik uppfödare.
- Exportera tabelldata med knappen **Exportera CSV**.

> **Tips:** Sortera efter Framgångsfrekvens fallande för att identifiera uppfödare som konsekvent skapar lyckade matchningar. Dessa uppfödare kan dra nytta av premiumfunktioner eller snabbspårad verifiering.

---

## Förstå matchningsmått

### Beräkning av framgångsfrekvens

```
Framgångsfrekvens = (Accepterade + Genomförda matchningar) / Totalt antal matchningar x 100
```

- Endast matchningar där uppfödaren var listningsägaren räknas mot deras framgångsfrekvens.
- Avböjda och utgångna matchningar sänker framgångsfrekvensen.
- Avbrutna matchningar exkluderas från beräkningen.

### Visningsmått

Visningsantalet representerar:

- Totalt antal unika visningar på alla uppfödarens aktiva parningslistningar.
- Räknar inte uppfödarens egna visningar.
- Nollställs per listning (inte kumulativt över borttagna listningar).

### Aktivitetspoäng

Den övergripande rankningen tar hänsyn till aktualitet:

- Matchningar från de senaste 90 dagarna viktas 2x.
- Matchningar från 90-180 dagar viktas 1x.
- Matchningar äldre än 180 dagar viktas 0,5x.

> **Tips:** En uppfödare med höga visningar men låg framgångsfrekvens kan ha attraktiva listningar men vara för selektiv eller långsam att svara. Överväg att kontakta dem för att förstå deras upplevelse.

---

## Vanliga frågor

**F: Kan jag manuellt skapa en matchning mellan två husdjur?**
S: Nej. Matchningar skapas av husdjursägare genom appen. Administratörer kan bara övervaka och vidta åtgärder på befintliga matchningar.

**F: Vad händer med matchdata när ett husdjur tas bort?**
S: Matchningsposten behålls för historiska ändamål men markeras med en "Husdjur borttaget"-indikator. Matchningen kan inte fortskrida vidare.

**F: Kan jag ta bort en uppfödare från rankningarna?**
S: Rankningar beräknas automatiskt. För att ta bort en uppfödare måste deras konto stängas av eller deras verifiering återkallas, vilket exkluderar dem från rankningar.

**F: Hur ofta uppdateras rankningarna?**
S: Rankningar beräknas om var 24:e timme. Tidsstämpeln för senaste uppdatering visas överst i fliken Rankningar.

**F: Kan jag skicka ett bröllopskort för en avböjd matchning?**
S: Nej. Knappen Skicka bröllopskort är endast tillgänglig för matchningar med status Accepterad eller Genomförd.

**F: Vad händer om båda husdjuren i en matchning tillhör samma ägare?**
S: Systemet förhindrar matchningar med samma ägare. Om du ser en indikerar det ett dataintegritetsproblem som bör rapporteras till utvecklingsteamet.
