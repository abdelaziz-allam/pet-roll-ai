# Notifikationer

Sidan Notifikationer gör det möjligt för administratörer att skapa och skicka push-notiser till Petfolioo-mobilappens användare. Du kan rikta dig mot specifika målgruppssegment, granska notifikationshistorik och följa bästa praxis för effektiv kommunikation.

![Notifications](/docs/screenshots/notifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Send, Delete |
> | Admin | View, Send |
> | Moderator | View |
> | Viewer | View only |

---

## Översikt

Push-notiser är en direkt kanal till dina användare. Använd dem för att meddela nya funktioner, dela viktiga uppdateringar, skicka påminnelser eller engagera specifika användarsegment. Denna sida tillhandahåller både kompositörsverktyg och en historiklogg över alla tidigare skickade notiser.

---

## Skapa notifikation

Notifikationskompositören är det primära verktyget för att skapa och skicka push-notiser till appanvändare.

### Komma åt kompositören

1. Navigera till sidan **Notifikationer** från sidomenyn.
2. Kompositörsformuläret visas överst på sidan.

### Formulärfält

| Fält | Beskrivning | Krav |
|------|-------------|------|
| **Titel** | Notifikationsrubriken som visas framträdande på användarens enhet | Obligatoriskt. Maximalt 65 tecken rekommenderas för full synlighet. |
| **Meddelandetext** | Det detaljerade innehållet i notifikationen | Obligatoriskt. Maximalt 240 tecken rekommenderas. |
| **Målgrupp** | Den målgrupp av användare som ska ta emot notifikationen | Obligatoriskt. Välj från fördefinierade segment. |

---

## Skriva en notifikation

Följ dessa steg för att skapa och skicka en notifikation:

### Steg 1: Ange titeln

1. Klicka på fältet **Titel**.
2. Skriv en koncis, uppmärksamhetsfångande rubrik.
3. Håll den under 65 tecken för att undvika avkortning på mindre enheter.

> **Tips:** Använd handlingsorienterat språk i titlar. "Nytt: Spåra ditt husdjurs vaccinationer" är mer engagerande än "Uppdatering av vaccinationsfunktion."

### Steg 2: Skriv meddelandetexten

1. Klicka på textområdet **Meddelandetext**.
2. Skriv det detaljerade meddelande du vill att användarna ska se.
3. Inkludera relevant information som vilken åtgärd användaren bör vidta.
4. Håll meddelandet under 240 tecken för optimal visning.

### Steg 3: Välj målgrupp

1. Klicka på rullgardinsmenyn **Målgrupp**.
2. Välj ett av följande målgruppssegment:

| Målgrupp | Beskrivning |
|----------|-------------|
| **Alla användare** | Skickar notifikationen till varje registrerad appanvändare |
| **Hundägare** | Riktar sig till användare som har minst en hund registrerad i sin profil |
| **Kattägare** | Riktar sig till användare som har minst en katt registrerad i sin profil |
| **Verifierade uppfödare** | Riktar sig till användare som har blivit verifierade som professionella uppfödare |

3. Den valda målgruppen avgör vem som tar emot push-notifikationen.

> **Obs:** En användare kan tillhöra flera segment. Till exempel kommer en verifierad uppfödare som äger hundar att ta emot notifikationer riktade till "Hundägare", "Verifierade uppfödare" och "Alla användare".

### Steg 4: Granska innan sändning

1. Dubbelkolla titeln för stavfel och tydlighet.
2. Granska meddelandetexten för korrekthet och ton.
3. Bekräfta att målgruppssegmentet är korrekt.
4. Verifiera att detta inte är en dubblett av en nyligen skickad notifikation.

---

## Bekräftelse av sändning

När du är redo att skicka notifikationen säkerställer ett bekräftelsesteg att du inte av misstag skickar till fel målgrupp.

### Sändningsprocess

1. Klicka på knappen **Skicka notifikation**.
2. En bekräftelsedialog visas som visar:
   - Notifikationens titel
   - Meddelandetexten
   - Det valda målgruppssegmentet
   - Det uppskattade antalet mottagare
3. Granska alla detaljer i bekräftelsedialogen.
4. Klicka på **Bekräfta sändning** för att skicka notifikationen.
5. Alternativt, klicka på **Avbryt** för att återgå till kompositören och göra ändringar.
6. Vid lyckad leverans visas ett framgångsmeddelande som bekräftar att notifikationen har köats.

> **Viktigt:** När den bekräftats kan notifikationen inte återkallas. Dubbelkolla alltid målgrupp och innehåll innan du bekräftar.

---

## Notifikationshistorik

Under kompositörsformuläret visar sektionen Notifikationshistorik en kronologisk lista över alla tidigare skickade notifikationer.

### Kolumner i historiklistan

| Kolumn | Beskrivning |
|--------|-------------|
| **Typtagg** | En färgad tagg som indikerar målgruppssegmentet (t.ex. "Alla användare" i blått, "Hundägare" i orange) |
| **Titel** | Notifikationstiteln som den skickades |
| **Meddelande** | En förhandsvisning av meddelandetexten (avkortad om lång) |
| **Datum** | Datum och tid då notifikationen skickades |
| **Antal mottagare** | Antal användare som tog emot notifikationen |

### Visa historik

1. Scrolla ned under kompositörsformuläret för att se historiklistan.
2. Notifikationer listas i omvänd kronologisk ordning (senaste först).
3. Varje rad visar typtagg, titel, datum och antal mottagare överblickbart.
4. Klicka på valfri rad för att expandera och se fullständig meddelandetext.

### Förstå typtaggar

Typtaggar är färgkodade för snabb identifiering:

| Taggfärg | Målgrupp |
|----------|----------|
| Blå | Alla användare |
| Orange | Hundägare |
| Lila | Kattägare |
| Grön | Verifierade uppfödare |

---

## Bästa praxis för push-notiser

Effektiva push-notiser driver engagemang utan att irritera användare. Följ dessa riktlinjer:

### Frekvens

1. **Begränsa frekvensen** -- Skicka inte fler än 2-3 notifikationer per vecka om det inte är brådskande.
2. **Samla relaterade uppdateringar** -- Kombinera flera små uppdateringar till en enda notifikation.
3. **Respektera tidszoner** -- Skicka notifikationer under rimliga tider (09:00 - 20:00 lokal tid).
4. **Undvik helger** -- Om inte notifikationen är tidskänslig, föredra vardagar.

### Innehållskvalitet

1. **Var koncis** -- Kom till poängen snabbt. Användare bestämmer sig på sekunder om de ska engagera sig.
2. **Var handlingsinriktad** -- Berätta för användare vad de kan göra: "Kontrollera ditt husdjurs kommande vaccinationer."
3. **Var relevant** -- Använd målgruppsinriktning för att säkerställa att innehållet matchar användarintressen.
4. **Undvik klickbete** -- Vilseledande notifikationer urholkar förtroendet och ökar antalet avregistreringar.
5. **Personalisera när möjligt** -- Referera till målgruppssegmentet: "Uppmärksamhet hundägare" känns mer personligt.

### Timing och kontext

1. **Nya funktioner** -- Skicka när funktionen är live och tillgänglig.
2. **Hälsopåminnelser** -- Skicka några dagar innan ett husdjurs besök eller vaccination ska ske.
3. **Säsongsinnehåll** -- Anpassa efter säsonger (t.ex. fästing-/loppepåminnelser på våren).
4. **Nöduppdateringar** -- Vid brådskande frågor (underhåll, säkerhet), skicka omedelbart oavsett timingregler.

### Skriva effektiva titlar

| Bra exempel | Varför det fungerar |
|-------------|---------------------|
| "Ditt husdjurs vaccination närmar sig" | Relevant, skapar brådska, tydlig handling |
| "Nytt: Dräktighetsspårning för uppfödare" | Framhäver nytt värde, riktar sig mot målgrupp |
| "Underhåll ikväll kl. 22:00" | Tydlig, specifik, tidskänslig |

| Dåligt exempel | Varför det misslyckas |
|----------------|----------------------|
| "Kolla in detta!" | Vagt, inget värdeerbjudande |
| "Uppdatering" | För generiskt, användare kommer att ignorera |
| "Viktigt!!!" | Överanvänder brådska, känns spammigt |

### Mäta framgång

Efter att ha skickat notifikationer, övervaka:

- **Öppningsfrekvens** -- Engagerar sig användare med dina notifikationer?
- **Avregistreringsfrekvens** -- En ökning indikerar notifikationströtthet.
- **Aktivitet i appen** -- Driver en notifikation det avsedda beteendet?
- **Feedback** -- Kontrollera sidan Feedback för användarreaktioner.

---

## Detaljer om målgruppssegment

### Alla användare

- Inkluderar varje registrerat konto i systemet.
- Använd för plattformsövergripande meddelanden, underhållsnotiser eller universella funktioner.
- Största målgruppen -- använd sparsamt för att undvika notifikationströtthet.

### Hundägare

- Inkluderar användare med minst en hund i sin husdjursprofil.
- Använd för hundspecifika hälsotips, rashändelser eller funktionsuppdateringar.
- Exempel: "Påminnelse: Årlig hjärtmasksprevention för hundar."

### Kattägare

- Inkluderar användare med minst en katt i sin husdjursprofil.
- Använd för kattspecifikt innehåll, inomhushälsotips eller kattfunktioner.
- Exempel: "Nytt: Aktivitetsspårning inomhus för katter."

### Verifierade uppfödare

- Inkluderar användare som har slutfört uppfödarverifiering.
- Använd för avelsspecifika funktioner, regelefterlevnadsuppdateringar eller professionella verktyg.
- Exempel: "Förbättringar av dräktighetsspåraren nu live."

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Notifikation skickas inte | Verifiera att alla obligatoriska fält är ifyllda. Kontrollera nätverksanslutning. |
| Antal mottagare visar 0 | Det valda målgruppssegmentet kan vara tomt. Verifiera att användare finns i det segmentet. |
| Användare rapporterar att de inte tar emot | Användare kan ha inaktiverat push-notiser på sin enhet. Detta ligger utanför administratörskontroll. |
| Dubblettnotifikation skickad | Kontrollera historiklistan innan sändning. Det finns ingen ångra-funktion efter bekräftelse. |

---

## Relaterade sidor

- [Feedback](./feedback.md) -- Övervaka användarreaktioner på notifikationer
- [Analyser](./analytics.md) -- Spåra trender i användarengagemang
- [Inställningar](./settings.md) -- Konfigurera notifikationsrelaterade systeminställningar
