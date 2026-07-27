# Feedbackhantering

Sidan Feedbackhantering låter administratörer visa, svara på och organisera användarfeedback som skickats in via Petfolioo-mobilappen. Detta är din centrala hubb för att förstå användarbehov, spåra buggar och hantera funktionsförslag.

![Feedback](/docs/screenshots/feedback.png)

---

## Översikt

När du navigerar till sidan Feedback ser du en statistikrad överst som sammanfattar aktuellt tillstånd för all feedback, följt av flikbaserade innehållsområden och filterkontroller.

---

## Statistikrad

Överst på sidan visar fyra metrikkort realtidsantal:

| Mätvärde | Beskrivning |
|----------|-------------|
| **Totalt** | Totalt antal mottagna feedback-poster oavsett status |
| **Öppna** | Feedback-poster som ännu inte har besvarats eller stängts |
| **Besvarade** | Feedback-poster där en administratör har postat minst ett svar |
| **ATT GÖRA** | Feedback-poster som en administratör har märkt för uppföljning |

> **Tips:** Använd ATT GÖRA-antalet som en snabb indikator på utestående ärenden som behöver uppmärksamhet. Om detta antal växer, överväg att prioritera med ditt team.

---

## Flikar

Sidan Feedback är organiserad i två flikar:

### All feedback

1. Klicka på fliken **All feedback** (vald som standard).
2. Denna vy visar varje feedback-post i systemet oavsett status.
3. Posterna sorteras efter datum, med de senaste först.
4. Använd filtren (beskrivna nedan) för att begränsa resultaten.

### ATT GÖRA-lista

1. Klicka på fliken **ATT GÖRA-lista**.
2. Denna vy visar endast feedback-poster som har märkts som ATT GÖRA av en administratör.
3. Använd denna flik under team-prioriteringsmöten eller dagliga genomgångar.
4. Poster stannar här tills de avmärks.

---

## Filter

Under flikarna finns ett filterfält med flera kontroller för att begränsa de visade feedback-posterna.

### Statusfilter

1. Hitta rullgardinsmenyn **Status** i filterfältet.
2. Klicka för att expandera och välj ett av följande:
   - **Alla** -- Visar feedback i valfri status
   - **Öppna** -- Visar endast olöst feedback
   - **Besvarade** -- Visar feedback med minst ett administratörssvar
   - **Stängda** -- Visar feedback markerad som löst
3. Listan uppdateras omedelbart vid val.

### Typfilter

1. Hitta rullgardinsmenyn **Typ** i filterfältet.
2. Välj kategorin av feedback du vill visa:
   - **Alla typer** -- Inget typfilter tillämpat
   - **Bugg** -- Problem eller defekter rapporterade av användare
   - **Förslag** -- Funktionsönskemål och förbättringsidéer
   - **Allmänt** -- Allmänna kommentarer eller frågor
3. Varje feedback-post är taggad med sitt typmärke för snabb visuell identifiering.

### Datumintervallfilter

1. Klicka på **Datumintervall**-väljaren i filterfältet.
2. Välj ett startdatum och slutdatum från kalenderwidgeten.
3. Endast feedback inskickad inom det valda intervallet visas.
4. För att rensa datumfiltret, klicka på rensa-ikonen på datumväljaren.

### ATT GÖRA-filter

1. Hitta **Endast ATT GÖRA**-växeln i filterfältet.
2. Aktivera den för att visa endast feedback-poster märkta som ATT GÖRA.
3. Detta ger ett snabbt alternativ till att byta till fliken ATT GÖRA-lista medan du stannar i vyn All feedback med andra filter tillämpade.

> **Tips:** Kombinera filter för kraftfulla sökningar. Ställ till exempel Typ till "Bugg" och Status till "Öppna" för att se alla olösta buggrapporter.

---

## Feedback-poster

Varje feedback-post i listan visar följande information:

| Fält | Beskrivning |
|------|-------------|
| **Användarinfo** | Den inskickande användarens visningsnamn, e-post och avatar |
| **Meddelande** | Fullständig text av feedbacken inskickad av användaren |
| **Typmärke** | Ett färgat märke som indikerar Bugg (röd), Förslag (blå) eller Allmänt (grå) |
| **Datum** | Datum och tid då feedbacken skickades in |
| **Status** | Aktuell statusindikator (Öppen, Besvarad eller Stängd) |
| **ATT GÖRA-nål** | En nålikon som indikerar om denna post är märkt för uppföljning |

### Visa en feedback-post

1. Hitta feedback-posten i listan.
2. Klicka på postraden eller expanderingsikonen för att öppna detaljvyn.
3. Detaljvyn visar fullständigt meddelande, användarinformation och eventuella tidigare administratörssvar.

---

## Svara på feedback

Administratörer kan svara på användarfeedback. Svar är synliga för användaren i mobilappen.

### Steg för att svara

1. Öppna feedback-posten du vill svara på.
2. Hitta **Svar**-textområdet längst ned i detaljvyn.
3. Skriv ditt svarsmeddelande i textområdet.
4. Granska ditt meddelande för tydlighet och professionalism.
5. Klicka på knappen **Skicka svar**.
6. Ett bekräftelsemeddelande visas som indikerar att svaret skickades framgångsrikt.
7. Feedback-statusen ändras automatiskt till **Besvarad**.

> **Viktigt:** Ditt svar kommer att vara synligt för användaren i Petfolioo-mobilappen. Säkerställ att ditt svar är hjälpsamt, professionellt och adresserar användarens ärende direkt.

### Bästa praxis för svar

- Bekräfta användarens feedback innan du ger en lösning.
- Om problemet är en känd bugg, låt användaren veta att det arbetas på.
- För förslag, tacka användaren och förklara om funktionen övervägs.
- Undvik teknisk jargong som slutanvändare kanske inte förstår.
- Håll svaren koncisa men grundliga.

---

## Tidigare administratörssvar

När du visar en feedback-post som har fått svar visas alla tidigare administratörssvar inline i kronologisk ordning.

1. Öppna feedback-postens detaljvy.
2. Scrolla ned för att se konversationstråden.
3. Varje svar visar:
   - Administratörens namn som postade svaret
   - Datum och tid för svaret
   - Fullständig svarstext
4. Nya svar visas längst ned i tråden.

> **Tips:** Granska tidigare svar innan du postar ett nytt för att undvika duplicerade eller motstridiga svar.

---

## Stänga feedback

När ett feedback-ärende har hanterats fullständigt kan du stänga det för att indikera att ingen ytterligare åtgärd behövs.

### Steg för att stänga

1. Öppna feedback-posten du vill stänga.
2. Klicka på knappen **Stäng** (eller välj "Stäng" från åtgärdsmenyn).
3. En bekräftelsedialog visas som ber dig bekräfta.
4. Klicka på **Bekräfta** för att stänga feedbacken.
5. Postens status ändras till **Stängd**.
6. Stängda poster finns kvar i systemet och kan visas genom att ställa statusfiltret till "Stängda".

> **Obs:** Att stänga feedback raderar den inte. Du kan fortfarande visa stängda poster och öppna dem igen vid behov.

---

## Fäst/Avfäst som ATT GÖRA

ATT GÖRA-nålfunktionen låter administratörer flagga specifika feedback-poster för uppföljning. Fästa poster visas i fliken ATT GÖRA-lista och bidrar till ATT GÖRA-antalet i statistikraden.

### Fästa feedback som ATT GÖRA

1. Hitta feedback-posten du vill flagga för uppföljning.
2. Klicka på **Nål**-ikonen (häftstift) på postraden, eller öppna detaljvyn och klicka på **Fäst som ATT GÖRA**.
3. Posten läggs omedelbart till i ATT GÖRA-listan.
4. ATT GÖRA-räknaren i statistikraden ökar med ett.
5. En nålikon visas på posten som indikerar dess ATT GÖRA-status.

### Avfästa feedback

1. Hitta den fästa feedback-posten (använd fliken ATT GÖRA-lista eller filtret Endast ATT GÖRA).
2. Klicka på **Avfäst**-ikonen på postraden, eller öppna detaljvyn och klicka på **Ta bort från ATT GÖRA**.
3. Posten tas bort från ATT GÖRA-listan.
4. ATT GÖRA-räknaren i statistikraden minskar med ett.

### När man bör använda ATT GÖRA-nålar

- Ett feedback-ärende kräver utredning innan svar.
- Du behöver input från en annan teammedlem innan du svarar.
- Ärendet är relaterat till en kommande release och bör spåras.
- Ett förslag behöver diskuteras vid nästa planeringsmöte.

---

## Arbetsflödessammanfattning

Det rekommenderade arbetsflödet för att hantera feedback är:

1. **Granska** -- Kontrollera statistikraden dagligen för ny öppen feedback.
2. **Prioritera** -- Använd filter för att prioritera buggar framför förslag.
3. **Fäst** -- Markera komplexa ärenden som ATT GÖRA för senare uppföljning.
4. **Svara** -- Svara på enkla ärenden omedelbart.
5. **Samarbeta** -- Använd fliken ATT GÖRA-lista vid teamgenomgångar.
6. **Stäng** -- Markera lösta ärenden som stängda efter att ha bekräftat att användarens problem är åtgärdat.

---

## Tangentbordsgenvägar

| Genväg | Åtgärd |
|--------|--------|
| `Enter` | Öppna vald feedback-post |
| `R` | Fokusera svarstextområdet (när post är öppen) |
| `T` | Växla ATT GÖRA-nål på vald post |
| `Esc` | Stäng detaljvyn |

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Svar skickas inte | Kontrollera din nätverksanslutning och försök igen. Säkerställ att meddelandet inte är tomt. |
| Filter uppdateras inte | Uppdatera sidan. Om problemet kvarstår, rensa webbläsarens cache. |
| ATT GÖRA-antal felaktigt | Antalet uppdateras vid sidladdning. Navigera bort och tillbaka för att uppdatera. |
| Kan inte se stängd feedback | Ställ statusfiltret till "Stängda" eller "Alla" för att visa stängda poster. |

---

## Relaterade sidor

- [Notifikationer](./notifications.md) -- Skicka meddelanden till användare
- [Adminanvändare](./admin-users.md) -- Hantera vem som kan svara på feedback
- [Inställningar](./settings.md) -- Konfigurera systemövergripande preferenser
