# Analyser

Sidan Analyser ger visuella insikter i plattformsanvändning, användartillväxt, husdjursdemografi och hälsoaktivitet. Använd dessa diagram för att förstå trender, mäta engagemang och fatta datadrivna beslut om Petfolioo-plattformen.

![Analytics](/docs/screenshots/analytics.png)

---

## Översikt

Analysinstrumentpanelen presenterar fyra primära visualiseringar tillsammans med en tidsintervallväljare som styr datafönstret för alla diagram. Varje diagram uppdateras dynamiskt när du ändrar det valda tidsintervallet.

---

## Komma åt analyser

1. Klicka på **Analyser** i sidomenyn.
2. Instrumentpanelen laddas med alla diagram visade på en enda scrollbar sida.
3. Standardtidsintervallet är **30 dagar**.

---

## Tidsintervallväljare

Överst på sidan Analyser låter en tidsintervallväljare dig styra vilken period av data som visas i alla diagram.

### Tillgängliga intervall

| Alternativ | Period | Bäst för |
|-----------|--------|----------|
| **7d** | Senaste 7 dagarna | Övervaka senaste aktivitet och kortsiktiga trender |
| **30d** | Senaste 30 dagarna | Månadsrapportering och allmän trendanalys (standard) |
| **90d** | Senaste 90 dagarna | Kvartalsgranskningar och identifiering av medelfristiga mönster |
| **1 år** | Senaste 365 dagarna | Årsgranskningar, säsongsmönster och långsiktig tillväxt |

### Ändra tidsintervall

1. Hitta tidsintervallväljaren överst på sidan.
2. Klicka på en av intervallknapparna: **7d**, **30d**, **90d** eller **1 år**.
3. Den valda knappen markeras för att indikera aktivt intervall.
4. Alla diagram på sidan uppdateras för att visa data för den valda perioden.
5. Diagramaxlar och etiketter justeras automatiskt för att passa det nya tidsfönstret.

> **Tips:** Börja med 30d för en allmän översikt, begränsa sedan till 7d för att undersöka senaste avvikelser eller expandera till 1 år för rapportering på styrelsenivå.

---

## Diagram för användartillväxt

### Diagramtyp

Linjediagram som visar trender i användarregistrering över tid.

### Vad det visar

Diagrammet för användartillväxt visualiserar antalet nya användarregistreringar plottade över den valda tidsperioden. Varje datapunkt representerar det kumulativa eller dagliga antalet nya användare.

### Läsa diagrammet

| Element | Beskrivning |
|---------|-------------|
| **X-axel** | Tid (datum eller veckor beroende på valt intervall) |
| **Y-axel** | Antal nya användarregistreringar |
| **Linje** | En kontinuerlig linje som förbinder datapunkter och visar tillväxtbanan |
| **Datapunkter** | Hovringsbara markörer på linjen som visar exakta värden |
| **Tooltip** | Visas vid hovring med datum och exakt registreringsantal |

### Tolka data

1. **Uppåtgående trend** -- Konsekvent tillväxt i användarförvärv. Plattformen attraherar nya användare stadigt.
2. **Platt linje** -- Användarförvärv har nått en platå. Överväg marknadsföringsinsatser eller funktionslanseringar för att återstarta tillväxt.
3. **Toppar** -- Plötsliga ökningar kan korrelera med marknadsföringskampanjer, mediabevakning eller app-store-exponering.
4. **Dippar** -- Minskningar i dagliga registreringar kan indikera säsongsmönster eller tekniska problem.

### Beteende per tidsintervall

| Intervall | X-axelgranularitet | Anteckningar |
|-----------|--------------------|--------------| 
| 7d | Daglig | Varje dag visas individuellt |
| 30d | Daglig | Varje dag visas, bra för att identifiera veckotrender |
| 90d | Veckovis | Data aggregerad per vecka för läsbarhet |
| 1 år | Månadsvis | Data aggregerad per månad för att visa årsbanan |

> **Tips:** Jämför 7d-vyn med 30d-vyn. Om de senaste 7 dagarnas trend ligger över 30-dagarsgenomsnittet accelererar tillväxten.

---

## Diagram för artfördelning

### Diagramtyp

Cirkeldiagram (eller ringdiagram) som visar andelen husdjur per art.

### Vad det visar

Diagrammet för artfördelning bryter ned alla registrerade husdjur efter deras artkategori och visar den relativa andelen av varje.

### Läsa diagrammet

| Element | Beskrivning |
|---------|-------------|
| **Segment** | Varje segment representerar en art (t.ex. hund, katt, fågel, kanin) |
| **Färger** | Varje art tilldelas en distinkt färg för identifiering |
| **Etiketter** | Artnamn och procentsats visas på eller nära varje segment |
| **Teckenförklaring** | En teckenförklaring kopplar färger till artnamn |
| **Tooltip** | Håll muspekaren över ett segment för att se exakt antal och procentsats |

### Tolka data

1. **Dominant art** -- Det största segmentet indikerar din primära användarbas husdjurstyp. Använd detta för att prioritera funktioner.
2. **Små segment** -- Arter med mycket små procentsatser kan indikera möjlighet till tillväxt i underrepresenterade segment.
3. **Balans** -- En ungefärligt jämn fördelning tyder på bred attraktionskraft bland husdjursägartyper.

### Användningsfall

- **Funktionsprioritering** -- Om 70% av husdjuren är hundar, prioritera hundspecifika funktioner.
- **Innehållsplanering** -- Skapa utbildningsinnehåll proportionellt mot artfördelningen.
- **Marknadsföringsinriktning** -- Förstå vilka målgruppssegment som är störst för annonskampanjer.
- **Notifikationsinriktning** -- Målgruppssegmenten i Notifikationer (Hundägare, Kattägare) korrelerar direkt med detta diagram.

> **Tips:** Om du märker att en art växer snabbare än andra över tid (jämför 30d vs 1 år), överväg att investera i artspecifika funktioner för att kapitalisera på trenden.

---

## Diagram för populära raser

### Diagramtyp

Horisontellt stapeldiagram som rangordnar de mest populära raserna.

### Vad det visar

Diagrammet för populära raser visar de mest registrerade raserna på plattformen, rangordnade efter antal. Staplar sträcker sig horisontellt, vilket gör det enkelt att jämföra popularitet mellan raser.

### Läsa diagrammet

| Element | Beskrivning |
|---------|-------------|
| **Y-axel** | Rasnamn, ordnade från mest populär (överst) till minst populär (nederst) |
| **X-axel** | Antal registrerade husdjur av den rasen |
| **Staplar** | Horisontella staplar vars längd representerar antalet husdjur |
| **Etiketter** | Antalsvärde visat i slutet av varje stapel |
| **Tooltip** | Håll muspekaren för exakt antal och andel av totalen |

### Tolka data

1. **Toppraser** -- De längsta staplarna representerar de vanligaste raserna på plattformen. Dessa användare är din kärnmålgrupp.
2. **Lång svans** -- Många raser med låga antal indikerar mångfaldiga användarintressen.
3. **Raskoncentration** -- Om några raser dominerar (t.ex. topp 3 står för 50%+) har din plattform en koncentrerad användarbas.

### Typiska insikter

| Mönster | Insikt | Åtgärd |
|---------|--------|--------|
| Golden Retriever dominerar | Stor familjehund-målgrupp | Prioritera funktioner för medelstora/stora hundraser |
| Persisk katt i topp 5 | Starkt kattägarsegment | Investera i kattspecifik hälsospårning |
| Exotiska raser dyker upp | Nischuppfödare ansluter sig | Överväg uppfödarspecifika premiumfunktioner |
| Jämn fördelning | Mångfaldig användarbas | Bygg generella funktioner snarare än rasspecifika |

### Diagramgränser

- Diagrammet visar som standard de **topp 10-15 raserna**.
- Resterande raser grupperas under "Övrigt" om tillämpligt.
- Antalet synliga raser kan variera per tidsintervall.

> **Tips:** Korsreferera populära raser med hälsoaktivitetsdata. Om en populär ras har låg hälsojournalsaktivitet kan dessa användare behöva engagemangsuppmuntringar.

---

## Diagram för hälsoaktivitet

### Diagramtyp

Grupperat stapeldiagram som visar hälsorelaterade aktiviteter kategoriserade efter typ.

### Vad det visar

Diagrammet för hälsoaktivitet visar volymen av hälsorelaterade åtgärder utförda på plattformen, grupperade efter aktivitetstyp. Detta hjälper dig förstå hur aktivt användare engagerar sig med hälsofunktioner.

### Läsa diagrammet

| Element | Beskrivning |
|---------|-------------|
| **X-axel** | Tidsperioder (dagar, veckor eller månader beroende på intervall) |
| **Y-axel** | Antal hälsoaktiviteter |
| **Stapelgrupper** | Flera staplar per tidsperiod, en för varje aktivitetstyp |
| **Färger** | Varje aktivitetstyp har en distinkt färg |
| **Teckenförklaring** | Kopplar färger till aktivitetstyper (Vaccinationer, Kontroller, Mediciner, etc.) |
| **Tooltip** | Håll muspekaren för exakt antal per aktivitetstyp per period |

### Aktivitetstyper

| Aktivitet | Beskrivning | Färg (typisk) |
|-----------|-------------|---------------|
| **Vaccinationer** | Vaccinationsposter skapade eller uppdaterade | Blå |
| **Hälsojournaler** | Allmänna hälsoposter loggade | Grön |
| **Viktspårning** | Viktmätningar registrerade | Orange |
| **Mediciner** | Medicinposter tillagda | Lila |

### Tolka data

1. **Höga vaccinationsstaplar** -- Användare spårar aktivt vaccinationer. Påminnelsesystemet driver sannolikt engagemang.
2. **Låga hälsojournalsstaplar** -- Användare kanske inte är medvetna om hälsojournalsfunktionen. Överväg uppmaningar i appen.
3. **Säsongsmönster** -- Vissa hälsoaktiviteter toppar säsongsmässigt (t.ex. fästingbehandlingar på våren).
4. **Växande staplar över tid** -- Hälsofunktionsanvändning ökar, vilket indikerar bra användarengagemang.
5. **Minskande staplar** -- Användare kan tappa intresset eller stöta på friktion vid loggning av hälsodata.

### Jämföra aktivitetstyper

Det grupperade formatet låter dig visuellt jämföra:

- Vilka hälsofunktioner som är mest använda vs. underutnyttjade.
- Om en aktivitetstyp växer medan andra minskar.
- Hur olika tidsintervall avslöjar olika mönster.

> **Tips:** Om vaccinationsaktivitet är hög men annan hälsospårning är låg, överväg att lägga till tvärgående funktionsuppmaningar: "Du loggade en vaccination -- vill du också registrera Rex vikt?"

---

## Instrumentpanelens layout

De fyra diagrammen arrangeras på sidan Analyser i ett rutnät:

```
+---------------------------+---------------------------+
|                           |                           |
|    Användartillväxt       |    Artfördelning          |
|    (Linjediagram)         |    (Cirkeldiagram)        |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Populära raser         |    Hälsoaktivitet         |
|    (Horisontellt stapel)  |    (Grupperat stapel)     |
|                           |                           |
+---------------------------+---------------------------+
```

Varje diagram upptar ett kort med:
- En titelrubrik
- Diagramvisualiseringen
- Interaktiva tooltips vid hovring
- Responsiv storlek som anpassas efter skärmbredd

---

## Interagera med diagram

### Hover-tooltips

1. Flytta muspekaren över valfri datapunkt, stapel eller diagramsegment.
2. En tooltip visas med:
   - Det exakta värdet
   - Etiketten (datum, rasnamn, art, etc.)
   - Procentsats där tillämpligt

### Responsivt beteende

1. På större skärmar visas diagram i ett 2x2-rutnät.
2. På mindre skärmar staplas diagram vertikalt för läsbarhet.
3. Diagramelement storleksändras proportionellt.

### Datauppdatering

1. Analysdata uppdateras när sidan laddas.
2. Att ändra tidsintervall utlöser en ny datahämtning.
3. Det finns ingen automatisk uppdatering -- ladda om sidan manuellt för senaste data.

---

## Vanliga analysarbetsflöden

### Månadsrapportering

1. Välj tidsintervallet **30d**.
2. Notera trenden för Användartillväxt (uppåt, platt eller nedåt).
3. Kontrollera Artfördelning för eventuella förändringar.
4. Granska Populära raser för framväxande trender.
5. Undersök Hälsoaktivitet för engagemangsnivåer.
6. Ta skärmdump eller exportera data för rapporter.

### Utreda en nedgång

1. Börja med **30d** för att identifiera när nedgången inträffade.
2. Byt till **7d** för att undersöka den senaste perioden i detalj.
3. Kontrollera om nedgången korrelerar med:
   - Ett systemproblem (kontrollera Inställningar > Underhållslägeshistorik)
   - En skickad notifikation (kontrollera Notifikationshistorik)
   - Ett säsongsmönster (jämför med 1 år-vyn)

### Kvartalsgenomgång

1. Välj tidsintervallet **90d**.
2. Jämför tillväxtbanan mot tidigare kvartal.
3. Identifiera vilka hälsoaktiviteter som växte mest.
4. Notera eventuella nya raser som dyker upp i diagrammet Populära raser.
5. Använd Artfördelning för att validera anpassning till marknadsföringsstrategi.

### Årsplanering

1. Välj tidsintervallet **1 år**.
2. Identifiera säsongsmönster i Användartillväxt (t.ex. helgtoppar).
3. Spåra förändringar i raspopularitet från år till år.
4. Mät hälsofunktionsanvändning över hela året.
5. Använd insikter för att informera produktroadmapen.

---

## Förstå dataaktualitet

| Aspekt | Detalj |
|--------|--------|
| Datakälla | Plattformsdatabas (aggregerad) |
| Uppdateringsfrekvens | Realtid vid sidladdning |
| Historisk noggrannhet | Komplett tillbaka till plattformens lansering |
| Tidszon | Servertid (UTC) |
| Saknade data | Luckor visas som nollvärden, inte interpolerade |

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Diagram laddas inte | Kontrollera din nätverksanslutning. Uppdatera sidan. |
| Data verkar inaktuell | Analyser laddas vid sidbesök. Navigera bort och tillbaka, eller uppdatera. |
| Nollvärden för alla mätvärden | Verifiera att det valda tidsintervallet har data. Prova att expandera till 1 år. |
| Diagram-tooltips visas inte | Prova en annan webbläsare. Säkerställ att JavaScript är aktiverat. |
| Tidsintervall ändras inte | Klicka direkt på intervallknappen. Om den inte svarar, uppdatera sidan. |
| Kan inte komma åt Analyser | Verifiera att din roll och behörigheter inkluderar åtkomst till sidan Analyser. |

---

## Relaterade sidor

- [Inställningar](./settings.md) -- Konfigurera plattformsinställningar som påverkar användarbeteende
- [Notifikationer](./notifications.md) -- Skicka notifikationer som kan påverka engagemangsmätvärden
- [Feedback](./feedback.md) -- Korrelera användarfeedback med analystrender
- [Adminanvändare](./admin-users.md) -- Bevilja analysåtkomst till teammedlemmar
