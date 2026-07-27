# Uppfödarverifiering

Modulen för uppfödarverifiering låter administratörer granska, godkänna, avvisa och återkalla verifieringsförfrågningar från uppfödare. Verifierade uppfödare får ett förtroendemärke synligt för köpare, vilket signalerar att deras kennel uppfyller plattformens standarder.

![Verification](/docs/screenshots/verification.png)

---

## Tabell med verifieringsförfrågningar

Huvudvyn visar alla verifieringsinlämningar i en sökbar, sorterbar tabell.

| Kolumn | Beskrivning |
|--------|-------------|
| Uppfödarnamn | Fullständigt namn på uppfödaren som skickat in förfrågan |
| Kennel | Registrerat kennelnamn kopplat till uppfödaren |
| Inlämning # | Automatiskt ökande inlämningsnummer (ominlämningar får ett nytt nummer) |
| Antal dokument | Antal uppladdade dokument bifogade till inlämningen |
| Status | Aktuell verifieringsstatus |
| Utgångsdatum | Verifieringens utgångsdatum (visas endast för godkända inlämningar) |

### Filtrera tabellen

1. Använd rullgardinsmenyn **Status** för att filtrera efter: Väntande, Godkänd, Avvisad, Återkallad eller Utgången.
2. Använd **Sök**-fältet för att hitta en uppfödare efter namn eller kennel.
3. Klicka på valfri kolumnrubrik för att sortera stigande eller fallande.

> **Tips:** Standardvyn visar väntande inlämningar först så att du kan prioritera nya förfrågningar.

---

## Statusarbetsflöde

Verifieringsförfrågningar följer en definierad livscykel:

```
Väntande --> Godkänd --> Utgången (automatiskt, efter utgångsdatum)
   |            |
   |            +--> Återkallad (manuell administratörsåtgärd)
   |
   +--> Avvisad (uppfödaren kan skicka in igen)
```

### Statusdefinitioner

| Status | Färg | Betydelse |
|--------|------|-----------|
| Väntande | Orange | Väntar på administratörsgranskning |
| Godkänd | Grön | Uppfödaren är verifierad och märket är aktivt |
| Avvisad | Röd | Inlämningen uppfyllde inte kraven |
| Återkallad | Mörkröd | Administratör har manuellt tagit bort verifierad status |
| Utgången | Grå | Verifieringsperioden har avslutats; uppfödaren måste skicka in igen |

### Övergångar

- **Väntande** kan övergå till **Godkänd** eller **Avvisad**.
- **Godkänd** kan övergå till **Återkallad** (manuellt) eller **Utgången** (automatiskt).
- **Avvisad** och **Utgången** tillåter uppfödaren att skapa en ny inlämning (nytt Väntande-ärende).
- **Återkallad** är ett slutgiltigt tillstånd för den inlämningen.

---

## Granska en inlämning

För att granska en verifieringsförfrågan från en uppfödare:

1. Hitta inlämningen i tabellen Verifieringsförfrågningar.
2. Klicka på raden eller knappen **Granska** på höger sida.
3. **Dialogen för inlämningsdetaljer** öppnas med två flikar:
   - **Aktuell inlämning** -- Visar de aktiva dokumenten och uppfödaruppgifter.
   - **Inlämningshistorik** -- Visar alla tidigare inlämningar från denna uppfödare.

### Fliken Aktuell inlämning

Denna flik visar:

- Uppfödarens profilinformation (namn, e-post, telefon, kennelregistreringsnummer)
- Uppladdade dokument i ett rutnät
- Inlämningsdatum och tid
- Eventuella anteckningar som uppfödaren inkluderat med inlämningen

### Fliken Inlämningshistorik

Denna flik visar en kronologisk lista över alla inlämningar från samma uppfödare, inklusive:

- Inlämningsnummer
- Datum för inlämning
- Slutlig status
- Granskarens namn
- Avvisningsorsak (om tillämpligt)

> **Tips:** Använd fliken Inlämningshistorik för att kontrollera om en uppfödare har åtgärdat tidigare avvisningsorsaker innan du godkänner en ominlämning.

---

## Dokumentförhandsgranskning

Varje uppladdat dokument visas som en miniatyr i dokumentrutnätet.

1. Klicka på valfri dokumentminiatyr för att öppna en fullstorleksförhandsgranskning.
2. Använd zoomkontrollerna för att inspektera dokumentdetaljer.
3. Navigera mellan dokument med vänster/höger-pilarna i förhandsvisningen.
4. Tryck **Escape** eller klicka på stäng-knappen för att återgå till detaljdialogen.

Stödda dokumentformat inkluderar:

- JPEG- och PNG-bilder
- PDF-dokument (renderade som sidbilder)

> **Tips:** Kontrollera tydlighet, äkthet och fullständighet vid granskning av uppladdade dokument. Suddiga eller ofullständiga dokument bör avvisas med tydliga instruktioner för ominlämning.

---

## Godkänna en inlämning

För att godkänna en verifieringsförfrågan:

1. Öppna inlämningens detaljdialog genom att klicka på raden i tabellen.
2. Granska alla uppladdade dokument noggrant.
3. Klicka på knappen **Godkänn** längst ned i dialogen.
4. I bekräftelsedialogen:
   - Ställ in **utgångsdatumet** för verifieringen. Standardvärdet är 1 år från idag.
   - Justera valfritt datumet om en kortare eller längre period är lämplig.
5. Klicka på **Bekräfta godkännande**.

### Vad som händer efter godkännande

- Uppfödarens profil får det verifierade märket omedelbart.
- Uppfödaren meddelas via e-post och app-notis.
- Inlämningens status ändras till **Godkänd** i tabellen.
- Utgångsdatumet visas i kolumnen Utgångsdatum.
- När utgångsdatumet passerar övergår statusen automatiskt till **Utgången**.

> **Tips:** För nya uppfödare med begränsad dokumentation, överväg att sätta en kortare utgångstid (6 månader) för att uppmana en tidigare omverifiering.

---

## Avvisa en inlämning

För att avvisa en verifieringsförfrågan:

1. Öppna inlämningens detaljdialog.
2. Granska dokumenten och identifiera problemet/problemen.
3. Klicka på knappen **Avvisa** längst ned i dialogen.
4. I avvisningsdialogen:
   - Ange en **avvisningsorsak** i textområdet. Detta fält är obligatoriskt.
   - Var specifik om vad som saknas eller är bristfälligt.
5. Klicka på **Bekräfta avvisning**.

### Vad som händer efter avvisning

- Inlämningens status ändras till **Avvisad**.
- Avvisningsorsaken är synlig för uppfödaren i deras instrumentpanel.
- Uppfödaren får en notis som förklarar avvisningen.
- Uppfödaren kan skapa en ny inlämning för att åtgärda problemen.

### Skriva bra avvisningsorsaker

| Gör | Gör inte |
|-----|----------|
| "Kennelregistreringsdokumentet har gått ut (2019). Vänligen ladda upp en aktuell registrering." | "Dokumenten duger inte." |
| "Foto av anläggningen är för suddigt för att verifiera förhållandena. Vänligen skicka in tydligare bilder." | "Dåliga foton." |
| "Vaccinationsjournaler för avelsdjur saknas." | "Ofullständigt." |

> **Tips:** Tydliga avvisningsorsaker minskar kommunikation fram och tillbaka och hjälper uppfödare att skicka in kompletta ansökningar vid nästa försök.

---

## Återkalla verifiering

Återkallning tar omedelbart bort en uppfödares verifierade status. Använd detta vid regelbrott eller bedräglig dokumentation som upptäckts efter godkännande.

1. Navigera till tabellen Verifieringsförfrågningar.
2. Filtrera efter **Status: Godkänd** för att hitta aktiva verifieringar.
3. Klicka på raden för att öppna inlämningsdetaljen.
4. Klicka på knappen **Återkalla** (visas endast för godkända inlämningar).
5. I återkallningsdialogen:
   - Ange **orsak till återkallning**. Detta är obligatoriskt.
   - Bekräfta att du förstår att åtgärden är omedelbar.
6. Klicka på **Bekräfta återkallning**.

### Vad som händer efter återkallning

- Det verifierade märket tas bort från uppfödarens profil omedelbart.
- Uppfödaren meddelas via e-post med återkallningsorsaken.
- Alla aktiva listningar från uppfödaren visar en varningsindikator.
- Inlämningens status ändras till **Återkallad** (slutgiltigt tillstånd).
- Uppfödaren kan inte skicka in mot samma inlämning; de måste börja om.

> **Tips:** Återkallning är en allvarlig åtgärd. Dokumentera orsaken noggrant i händelse av tvister. Överväg att kontakta uppfödaren innan du återkallar om problemet är mindre.

---

## Tidslinjevy

Tidslinjvyn ger en visuell historik över en uppfödares verifieringsresa.

1. Öppna valfri inlämningsdetaljdialog.
2. Byt till fliken **Inlämningshistorik**.
3. Tidslinjen visar händelser i kronologisk ordning:
   - Inlämning skapad
   - Dokument uppladdade
   - Administratörsgranskning påbörjad
   - Status ändrad (med granskarens namn)
   - Utgångsvarningar skickade
   - Ominlämningar länkade

### Läsa tidslinjen

Varje tidslinjeinlägg visar:

- **Datum och tid** för händelsen
- **Händelsetyp**-ikon (dokument, statusändring, notis)
- **Aktör** (uppfödarens namn eller administratörens namn)
- **Detaljer** (orsakstext, dokumentnamn, inställt utgångsdatum)

### Användningsfall för tidslinjen

- **Tvistlösning:** Se den fullständiga historiken när en uppfödare bestrider en avvisning.
- **Revisionsspår:** Spåra vilken administratör som granskade och godkände/avvisade varje inlämning.
- **Mönsteridentifiering:** Identifiera uppfödare som upprepade gånger skickar in bristfällig dokumentation.

> **Tips:** Tidslinjen är skrivskyddad. Alla åtgärder (godkänn, avvisa, återkalla) måste utföras från fliken Aktuell inlämning.

---

## Tangentbordsgenvägar

| Genväg | Åtgärd |
|--------|--------|
| Enter | Öppna vald inlämning |
| Escape | Stäng dialog |
| Tab | Växla mellan dialogflikar |
| Piltangenter | Navigera mellan dokument i förhandsgranskning |

---

## Vanliga frågor

**F: Kan jag godkänna en inlämning med villkor?**
S: Nej. Godkännanden är ovillkorliga. Om dokument delvis är acceptabla, avvisa med specifika instruktioner om vad som behöver åtgärdas och godkänn sedan ominlämningen.

**F: Vad händer med en uppfödares listningar när deras verifiering löper ut?**
S: Listningarna förblir aktiva men det verifierade märket tas bort. Uppfödaren meddelas 30 dagar före utgång för att uppmuntra ominlämning.

**F: Kan en återkallad uppfödare ansöka igen?**
S: Ja, men de måste skapa en helt ny inlämning. Den tidigare återkallade inlämningen finns kvar i historiken för revisionsändamål.

**F: Vem kan utföra verifieringsåtgärder?**
S: Endast administratörer med rollen Verifieringsansvarig kan godkänna, avvisa eller återkalla inlämningar.
