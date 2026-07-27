# Kom igång

Välkommen till Petfolioo Adminportalen. Den här guiden leder dig genom din första inloggning, förklarar gränssnittets layout och hjälper dig förstå hur rollbaserad åtkomstkontroll avgör vad du kan se och göra på plattformen.

Adminportalen är en webbaserad hanteringskonsol för Petfolioos plattform för djurhälsa och avel. Härifrån kan administratörer hantera användare, husdjur, kategorier, hälsojournaler, avelsprogram och plattformsinställningar.

![Login Page](/docs/screenshots/login.png)

---

## Logga in

Adminportalen använder autentisering med e-post och lösenord. Endast konton med en tilldelad administratörsroll kan komma åt portalen.

### Steg för att logga in

1. Öppna din webbläsare och navigera till adminportalens URL.
2. Du kommer att mötas av **Inloggningssidan** på sökvägen `/login`.
3. Ange din **e-postadress** i det första fältet.
4. Ange ditt **lösenord** i det andra fältet.
5. Klicka på knappen **Logga in**.
6. Om dina uppgifter är giltiga och ditt konto har administratörsåtkomst omdirigeras du till **Instrumentpanelen**.

> **Obs:** Om du ser ett "Obehörig"-fel efter att ha angett giltiga uppgifter kan det bero på att ditt konto inte har en administratörsroll tilldelad. Kontakta en superadministratör för att få din roll uppdaterad.

### Återställa ditt lösenord

Om du har glömt ditt lösenord:

1. Klicka på länken **Glömt lösenord?** under lösenordsfältet på inloggningssidan.
2. Ange den e-postadress som är kopplad till ditt administratörskonto.
3. Klicka på **Skicka återställningslänk**.
4. Kontrollera din inkorg för ett lösenordsåterställningsmeddelande från Petfolioo.
5. Klicka på länken i e-postmeddelandet för att öppna formuläret för lösenordsåterställning.
6. Ange och bekräfta ditt nya lösenord.
7. Gå tillbaka till inloggningssidan och logga in med dina nya uppgifter.

> **Tips:** Lösenordsåterställningslänkar upphör efter 1 timme. Om din länk har gått ut kan du begära en ny från inloggningssidan.

---

## Förstå instrumentpanelens layout

När du har loggat in presenterar adminportalen en konsekvent layout på alla sidor.

### Sidonavigering

Den vänstra sidopanelen innehåller den primära navigeringsmenyn. Den inkluderar länkar till alla huvudmoduler:

| Menyalternativ | Beskrivning |
|----------------|-------------|
| Instrumentpanel | Plattformsöversikt med KPI:er och analyser |
| Användare | Hantera appanvändare, roller och konton |
| Husdjur | Bläddra och hantera husdjursregistret |
| Kategorier | Definiera och hantera husdjurskategorier |
| Hälsojournaler | Granska hälsocertifieringar för husdjur |
| Avel | Hantera avelsprogram och härstamning |
| Vaccinationer | Spåra vaccinationsjournaler |
| Dräktighet | Övervaka dräktighetsspårning |
| Verifieringar | Granska väntande verifieringsförfrågningar |
| Inställningar | Plattformskonfiguration |

Sidopanelen kan fällas ihop genom att klicka på växlingsikonen längst upp för att ge mer skärmutrymme åt innehållsområden.

### Sidhuvud

Det övre sidhuvudet innehåller:

| Element | Placering | Syfte |
|---------|-----------|-------|
| Sök | Mitten | Global sökning över användare, husdjur och journaler |
| Aviseringsklocka | Höger | Varningar för väntande åtgärder och systemhändelser |
| Profilavatar | Längst till höger | Kontomeny med profilinställningar och utloggning |

### Innehållsområde

Huvudinnehållsområdet upptar det återstående utrymmet till höger om sidopanelen och under sidhuvudet. Det är här tabeller, formulär, detaljpaneler och analyser visas.

---

## Rollbaserad åtkomst

Adminportalen tillämpar rollbaserad åtkomstkontroll (RBAC). Varje administratörskonto tilldelas en av följande roller, som bestämmer vilka åtgärder som är tillgängliga.

### Rolldefinitioner

| Roll | Åtkomstnivå | Beskrivning |
|------|-------------|-------------|
| `super_admin` | Full | Fullständig åtkomst till alla moduler, inställningar och användarhantering. Kan tilldela och återkalla administratörsroller. |
| `admin` | Hög | Åtkomst till alla operativa moduler. Kan hantera användare, husdjur och journaler. Kan inte ändra plattformsinställningar eller tilldela super_admin-roller. |
| `moderator` | Medel | Kan granska och moderera innehåll, godkänna verifieringar och hantera husdjurslistningar. Kan inte skapa eller ta bort administratörskonton. |
| `viewer` | Skrivskyddad | Kan visa all data i alla moduler men kan inte skapa, redigera eller ta bort poster. Användbar för revision och rapportering. |

### Behörighetsmatris

| Åtgärd | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Visa instrumentpanel | Ja | Ja | Ja | Ja |
| Hantera användare | Ja | Ja | Nej | Nej |
| Skapa administratörskonton | Ja | Nej | Nej | Nej |
| Blockera/Avblockera användare | Ja | Ja | Ja | Nej |
| Hantera husdjur | Ja | Ja | Ja | Nej |
| Godkänna verifieringar | Ja | Ja | Ja | Nej |
| Hantera kategorier | Ja | Ja | Nej | Nej |
| Redigera plattformsinställningar | Ja | Nej | Nej | Nej |
| Visa rapporter | Ja | Ja | Ja | Ja |

> **Obs:** Om ett navigeringsobjekt inte syns i din sidopanel har din roll inte åtkomst till den modulen.

---

## Navigeringsöversikt

Nedan följer en komplett lista över moduler tillgängliga i adminportalen, organiserade efter funktionsområde.

### Kärnmoduler

1. **Instrumentpanel** - Plattformshälsoöversikt, KPI:er och analysdiagram.
2. **Användare** - Hantering av appanvändare inklusive profiler, roller och kontostatus.
3. **Husdjur** - Husdjursregistret med fullständiga detaljvyer och modereringsverktyg.
4. **Kategorier** - Kategoriseringssystem för husdjursarter/typer.

### Hälsa och journaler

5. **Hälsojournaler** - Hälsocertifieringsdokument och deras verifieringsstatus.
6. **Vaccinationer** - Vaccinationsscheman och genomförandejournaler.
7. **Dräktighet** - Dräktighetsspårning för avelsdjur.

### Plattformsoperationer

8. **Verifieringar** - Kö med väntande verifieringsförfrågningar för användare och husdjur.
9. **Avel** - Hantering av avelsprogram och härstamningsspårning.
10. **Inställningar** - Plattformsövergripande konfiguration och funktionsflaggor.

---

## Tips för första gången

När du först kommer åt adminportalen, följ dessa rekommendationer för att orientera dig.

### Rekommenderade första steg

1. **Granska din profil** - Klicka på din avatar i det övre högra hörnet och välj "Profil" för att verifiera att dina kontouppgifter är korrekta.
2. **Utforska instrumentpanelen** - Bekanta dig med KPI-korten och analyserna för att förstå aktuella plattformsmått.
3. **Kontrollera väntande verifieringar** - Navigera till modulen Verifieringar för att se om det finns objekt som väntar på granskning.
4. **Bläddra bland aktiva användare** - Besök modulen Användare och sortera efter "Registreringsdatum" fallande för att se de senaste registreringarna.
5. **Granska kategorier** - Säkerställ att husdjurskategorierna är korrekt konfigurerade för din region.

### Webbläsarrekommendationer

Adminportalen fungerar bäst i moderna webbläsare:

| Webbläsare | Minimiversion |
|------------|---------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tips:** Aktivera webbläsarnotiser när du uppmanas för att ta emot realtidsvarningar för väntande verifieringar och viktiga systemhändelser.

### Tangentbordsgenvägar

| Genväg | Åtgärd |
|--------|--------|
| `/` | Fokusera det globala sökfältet |
| `Esc` | Stäng öppna paneler och modaler |

---

## Felsökning av inloggningsproblem

| Problem | Lösning |
|---------|---------|
| Felmeddelande "Ogiltiga uppgifter" | Dubbelkolla din e-postadress och ditt lösenord. Använd flödet för glömt lösenord vid behov. |
| Meddelande "Konto inaktiverat" | Ditt konto har avaktiverats. Kontakta en superadministratör. |
| Sidan laddas men inloggningsformuläret är tomt | Rensa webbläsarens cache och cookies och ladda sedan om sidan. |
| Omdirigeras tillbaka till inloggningen efter inloggning | Din session kan ha gått ut. Försök logga in igen. Om problemet kvarstår, kontrollera att cookies är aktiverade. |

---

## Få hjälp

Om du stöter på problem som inte täcks i denna guide:

1. Kontrollera de andra avsnitten i denna användarmanual för modulspecifik hjälp.
2. Kontakta din organisations superadministratör för roll- och åtkomstfrågor.
3. Vid tekniska problem, kontakta plattformens supportteam.

---

*Nästa: [Instrumentpanel](./dashboard.md) - Lär dig om analys- och KPI-översikten.*
