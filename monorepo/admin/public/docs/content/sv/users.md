# Appanvändare

Modulen Appanvändare ger fullständig hantering av alla användarkonton på Petfolioo-plattformen. Administratörer kan visa användarprofiler, skapa nya konton, redigera uppgifter, tilldela roller och vidta modereringsåtgärder. Denna modul är tillgänglig för användare med rollerna `super_admin` eller `admin`.

![App Users](/docs/screenshots/users.png)

---

## Användarlistningstabell

Användarlistningstabellen visar alla registrerade plattformsanvändare med nyckelinformation synlig på ett ögonblick.

### Tabellkolumner

| Kolumn | Beskrivning | Sorterbar |
|--------|-------------|:---------:|
| Avatar | Användarens profilbild (cirkulär miniatyr) | Nej |
| Namn | Visningsnamn | Ja |
| E-post | Registrerad e-postadress | Ja |
| Roll | Tilldelad plattformsroll (användare, moderator, admin) | Ja |
| Status | Kontostatus (Aktiv, Väntande, Blockerad) | Ja |
| Verifierad uppfödare | Märke som indikerar verifierad uppfödarstatus | Ja |
| Antal husdjur | Antal husdjur registrerade av denna användare | Ja |
| Registreringsdatum | Datum då kontot skapades | Ja |

### Statusindikatorer

| Status | Färg | Betydelse |
|--------|------|-----------|
| Aktiv | Grön | Kontot är fullt fungerande |
| Väntande | Orange | E-postverifiering ej slutförd |
| Blockerad | Röd | Kontot har stängts av av en administratör |

### Märke för verifierad uppfödare

| Indikator | Betydelse |
|-----------|-----------|
| Blå bockikon | Användaren har slutfört uppfödarverifiering och är bekräftad |
| Inget märke | Användaren har inte ansökt om eller fått uppfödarverifiering |
| Klockikon | Ansökan om uppfödarverifiering väntar på granskning |

### Tabellnavigering

1. **Sortera** genom att klicka på valfri sorterbar kolumnrubrik. Klicka igen för att vända ordningen.
2. **Sök** med sökfältet ovanför tabellen för att hitta användare efter namn eller e-post.
3. **Filtrera** med rullgardinsmenyerna för status och roll för att begränsa resultaten.
4. **Paginera** med kontroller längst ned (10, 20, 50 poster per sida).

> **Tips:** Kombinera sökfältet med statusfilter för att snabbt hitta specifika användare. Sök till exempel "johan" med status "Blockerad" för att hitta blockerade användare som heter Johan.

---

## Visa användardetaljer

Användardetaljpanelen ger en omfattande vy av en användares profil och aktivitet.

### Öppna detaljpanelen

1. Klicka på valfri rad i användarlistningstabellen.
2. Detaljpanelen glider in från höger sida av skärmen.
3. Panelen innehåller flera sektioner organiserade vertikalt.

### Sektioner i detaljpanelen

| Sektion | Innehåll |
|---------|----------|
| Profilhuvud | Stor avatar, visningsnamn, e-post, rollmärke, statusmärke |
| Kontoinformation | Registreringsdatum, senaste inloggning, e-postverifieringsstatus, autentiseringsleverantör |
| Personuppgifter | Telefonnummer, tidszon, land, stad |
| Uppfödarstatus | Verifieringsstatus, ansökningsdatum, inskickade dokument |
| Husdjurssammanfattning | Antal registrerade husdjur med snabblänkar till varje |
| Aktivitetslogg | Senaste åtgärder utförda av denna användare på plattformen |

### Profilhuvud

Överst i panelen visas:

- **Avatar** i full storlek (eller standardsiluett om ingen uppladdats)
- **Visningsnamn** i stor text
- **E-post** under namnet
- **Rollmärke** färgkodat efter behörighetsnivå
- **Statusmärke** som visar aktuell kontostatus

### Fält för kontoinformation

| Fält | Beskrivning | Exempel |
|------|-------------|---------|
| Användar-ID | Unikt systemidentifierare | "usr_a1b2c3d4" |
| Registreringsdatum | När kontot skapades | "2023-01-15 09:30 UTC" |
| Senaste inloggning | Senaste inloggningstidsstämpel | "2024-07-20 14:22 UTC" |
| E-post verifierad | Om e-posten har bekräftats | "Ja" / "Nej" |
| Autentiseringsleverantör | Autentiseringsmetod som används | "E-post/Lösenord" eller "Google" |
| Firebase UID | Firebase Authentication användar-ID | "Abc123Def456" |

---

## Skapa en ny användare

Administratörer kan skapa användarkonton direkt från adminportalen. Eftersom plattformen använder Firebase Authentication sätts inget lösenord vid skapandet - användare får ett e-postmeddelande för att ställa in sitt eget lösenord.

### Steg för att skapa en användare

1. Klicka på knappen **Skapa användare** i det övre högra hörnet av sidan Användare.
2. Ett skapandeformulär visas.
3. Fyll i de obligatoriska fälten:

| Fält | Obligatoriskt | Beskrivning |
|------|:------------:|-------------|
| Visningsnamn | Ja | Användarens fullständiga namn eller valda visningsnamn |
| E-post | Ja | En giltig e-postadress (måste vara unik på plattformen) |

4. Klicka på **Skapa** för att skicka formuläret.
5. Systemet kommer att:
   - Skapa en Firebase Authentication-post
   - Skicka ett välkomstmeddelande till användaren med en länk för att ställa in sitt lösenord
   - Skapa användarprofilen i plattformens databas
   - Tilldela standardrollen "användare"
6. Den nya användaren visas i listningstabellen med status "Väntande" tills de verifierar sin e-post.

### Valideringsregler

| Fält | Regel |
|------|-------|
| Visningsnamn | 2-100 tecken, kan inte vara tomt |
| E-post | Måste vara giltigt e-postformat, får inte redan finnas i systemet |

> **Obs:** Inget lösenordsfält behövs. Firebase Authentication hanterar lösenordsinställning via välkomstmeddelandet som skickas till användaren. Detta säkerställer att användaren väljer sitt eget säkra lösenord.

> **Tips:** Om du behöver skapa en användare som ska ha förhöjda behörigheter, skapa dem först med standardinställningar och ändra sedan deras roll separat (se Ändra roll nedan).

---

## Redigera en användare

Administratörer kan ändra användarprofiluppgifter vid behov. Detta används vanligtvis för att korrigera information eller uppdatera detaljer å användarens vägnar.

### Steg för att redigera en användare

1. Öppna användarens detaljpanel genom att klicka på deras rad i listningstabellen.
2. Klicka på knappen **Redigera** (pennikonen) i panelens sidhuvud.
3. Panelen växlar till redigeringsläge med redigerbara formulärfält.
4. Ändra valfritt av de tillgängliga fälten:

| Fält | Redigerbart | Anteckningar |
|------|:-----------:|--------------|
| Visningsnamn | Ja | Användarens offentliga namn |
| Telefon | Ja | Internationellt format rekommenderas (t.ex. +46701234567) |
| Tidszon | Ja | Rullgardinsmeny med IANA-tidszoner (t.ex. Europe/Stockholm) |
| Land | Ja | Rullgardinsmeny med alla länder |
| Stad | Ja | Textfält, uppdaterar förslag baserat på land |
| E-post | Nej | Kan inte ändras (används som inloggningsidentifierare) |
| Användar-ID | Nej | Systemgenererat, oföränderligt |

5. Klicka på **Spara ändringar** för att tillämpa dina redigeringar.
6. En framgångsnotis bekräftar uppdateringen.
7. Panelen återgår till visningsläge och visar den uppdaterade informationen.

### Redigeringshistorik

Alla redigeringar som görs via adminportalen loggas:

| Loggfält | Beskrivning |
|----------|-------------|
| Tidsstämpel | När ändringen gjordes |
| Administratör | Vilken administratör som gjorde ändringen |
| Ändrat fält | Vilket fält som ändrades |
| Gammalt värde | Det tidigare värdet |
| Nytt värde | Det uppdaterade värdet |

> **Viktigt:** Redigeringar av användarprofiler är synliga för användaren. De ser den uppdaterade informationen i sin app. Överväg att meddela användaren om du gör ändringar å deras vägnar.

---

## Ändra roll

Rolländringar avgör vilken åtkomstnivå en användare har inom plattformen och dess appar.

### Tillgängliga roller

| Roll | Beskrivning | Funktioner |
|------|-------------|------------|
| user | Standard plattformsanvändare | Kan hantera sina egna husdjur, delta i avelsprogram, visa listningar |
| moderator | Gemenskapsmoderator | Alla användarfunktioner plus möjlighet att granska och flagga innehåll |
| admin | Plattformsadministratör | Alla moderatorfunktioner plus åtkomst till adminportalen |

### Steg för att ändra en användares roll

1. Öppna användarens detaljpanel genom att klicka på deras rad.
2. Hitta sektionen **Roll** i panelen.
3. Klicka på knappen **Ändra roll** (eller det aktuella rollmärket).
4. En rollvalsdialog visas med:
   - Radioknappar för varje tillgänglig roll
   - Beskrivningstext som förklarar varje rolls behörigheter
   - En bekräftelsekryssruta som bekräftar ändringen
5. Välj den nya rollen.
6. Läs rollbeskrivningen för att bekräfta att den är lämplig.
7. Markera **bekräftelsekryssrutan** ("Jag förstår att detta kommer att ändra användarens åtkomstnivå").
8. Klicka på **Bekräfta rolländring**.
9. Användarens roll uppdateras omedelbart.

### Begränsningar vid rolländring

| Din roll | Kan tilldela |
|----------|-------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Kan inte ändra roller |
| viewer | Kan inte ändra roller |

> **Viktigt:** Att befordra en användare till "admin" ger dem åtkomst till adminportalen. Gör detta endast för betrodda teammedlemmar som behöver administratörsåtkomst.

> **Obs:** Att ändra en användare från "admin" till "user" återkallar omedelbart deras adminportalåtkomst. Om de för närvarande är inloggade i portalen avslutas deras session vid nästa sidnavigering.

---

## Blockera/Avblockera användare

Att blockera en användare stänger av deras konto och förhindrar dem från att logga in i appen eller komma åt plattformens funktioner.

### Blockera en användare

1. Öppna användarens detaljpanel.
2. Scrolla till sektionen **Åtgärder** längst ned i panelen.
3. Klicka på knappen **Blockera användare** (visas i rött).
4. En bekräftelsedialog visas med:
   - Användarens namn och e-post för bekräftelse
   - Ett **Orsak**-textfält (obligatoriskt)
   - En **Varaktighet**-väljare (permanent, 7 dagar, 30 dagar, 90 dagar)
5. Ange en tydlig, professionell orsak till blockeringen.
6. Välj blockeringens varaktighet.
7. Klicka på **Bekräfta blockering**.

### Effekter av blockering

| Effekt | Beskrivning |
|--------|-------------|
| Inloggning blockerad | Användaren kan inte logga in i mobilappen |
| Profil dold | Användarens profil är inte synlig för andra användare |
| Husdjur avlistade | Alla husdjur ägda av denna användare döljs från listningar |
| Aviseringar | Användaren får ett e-postmeddelande som förklarar blockeringen med den angivna orsaken |
| Aktiva sessioner | Alla aktuella sessioner avslutas omedelbart |

### Riktlinjer för blockeringsorsak

| Riktlinje | Exempel |
|-----------|---------|
| Var specifik | "Flera bedrägliga avelslistningar rapporterade och bekräftade" |
| Referera till policy | "Brott mot användarvillkor avsnitt 4.2 gällande autentiska listningar" |
| Undvik vagt språk | Skriv INTE "dåligt beteende" - var specifik om vad som inträffat |
| Håll det professionellt | Orsaken skickas direkt till användaren |

> **Viktigt:** Blockeringsorsaken kommuniceras till användaren via e-post och app-notis. Den måste vara saklig, specifik och professionell.

### Avblockera en användare

1. Använd **Status**-filtret för att välja "Blockerad" för att hitta blockerade användare.
2. Klicka på den blockerade användarens rad för att öppna deras detaljpanel.
3. Panelen visar ett kort med **Blockeringsinformation** med:
   - Blockeringsdatum
   - Blockerande administratör
   - Blockeringsorsak
   - Blockeringsvaraktighet / utgångsdatum
4. Klicka på knappen **Avblockera användare** (visas i grönt).
5. En bekräftelsedialog visas.
6. Ange valfritt en anteckning som förklarar varför blockeringen hävs.
7. Klicka på **Bekräfta avblockering**.
8. Användarens status återgår till "Aktiv" och de återfår full plattformsåtkomst.
9. Användaren får en notis om att deras konto har återställts.

### Blockeringshistorik

Varje blockerings- och avblockeringsåtgärd loggas i användarens historik:

| Fält | Beskrivning |
|------|-------------|
| Blockeringsdatum | När blockeringen tillämpades |
| Avblockeringsdatum | När blockeringen hävdes (om tillämpligt) |
| Administratör | Vilken administratör som vidtog åtgärden |
| Orsak | Den angivna orsaken till blockeringen |
| Varaktighet | Hur länge blockeringen var inställd att vara |
| Lösning | Hur den avslutades (manuell avblockering, utgång, överklagande) |

---

## Söka och filtrera användare

### Sökfält

Sökfältet överst på sidan Användare stöder:

| Söktyp | Exempel | Matchar |
|--------|---------|---------|
| Namnsökning | "Sara" | Alla användare med "Sara" i sitt visningsnamn |
| E-postsökning | "gmail.com" | Alla användare med Gmail-adresser |
| Delmatchning | "pet" | Användare som heter "Peter", "Petrov", etc. |

### Filterrullgardinsmenyer

| Filter | Alternativ |
|--------|-----------|
| Roll | Alla, Användare, Moderator, Admin |
| Status | Alla, Aktiv, Väntande, Blockerad |
| Verifierad uppfödare | Alla, Verifierad, Ej verifierad, Väntande |

### Kombinera sök och filter

1. Ange text i sökfältet OCH välj filtervärden samtidigt.
2. Resultaten måste matcha ALLA kriterier (OCH-logik).
3. Rensa enskilda filter genom att klicka på deras X-knapp, eller rensa alla med knappen **Återställ**.

---

## Exportera användardata

För att exportera användardata för rapportering eller analys:

1. Tillämpa eventuella önskade filter.
2. Klicka på knappen **Exportera** i det övre högra området.
3. Välj format: **CSV** eller **Excel**.
4. Välj omfång: **Aktuell filtrerad vy** eller **Alla användare**.
5. Nedladdningen startar automatiskt.

### Exporterade fält

| Fält | Inkluderad | Anteckningar |
|------|:----------:|--------------|
| Visningsnamn | Ja | |
| E-post | Ja | |
| Roll | Ja | |
| Status | Ja | |
| Land | Ja | |
| Stad | Ja | |
| Antal husdjur | Ja | |
| Registreringsdatum | Ja | |
| Senaste inloggning | Ja | |
| Telefon | Nej | Exkluderad av integritetsskäl |

> **Obs:** Telefonnummer och detaljerad personlig information exkluderas från exporter som standard för att följa dataskyddskrav.

---

*Föregående: [Husdjursregister](./pets.md) | Nästa: [Husdjurskategorier](./categories.md)*
