# Notifikationer

Notifikationssiden giver administratorer mulighed for at sammensætte og sende push-notifikationer til Petfolioo-mobilappens brugere. Du kan målrette specifikke målgruppesegmenter, gennemgå notifikationshistorik og følge bedste praksis for effektiv kommunikation.

![Notifications](/docs/screenshots/notifications.png)

---

## Oversigt

Push-notifikationer er en direkte kanal til dine brugere. Brug dem til at annoncere nye funktioner, dele vigtige opdateringer, sende påmindelser eller engagere specifikke brugersegmenter. Denne side giver både sammensætningsværktøjer og en historiklog over alle tidligere sendte notifikationer.

---

## Sammensæt notifikation

Notifikationssammensætteren er det primære værktøj til at oprette og sende push-notifikationer til app-brugere.

### Adgang til sammensætteren

1. Naviger til **Notifikationer**-siden fra sidebjælkemenuen.
2. Sammensætningsformularen vises øverst på siden.

### Formularfelter

| Felt | Beskrivelse | Krav |
|------|-------------|------|
| **Titel** | Notifikationsoverskriften, der vises tydeligt på brugerens enhed | Påkrævet. Maksimalt 65 tegn anbefales for fuld synlighed. |
| **Beskedtekst** | Det detaljerede indhold af notifikationen | Påkrævet. Maksimalt 240 tegn anbefales. |
| **Målgruppe** | Målgruppen af brugere, der vil modtage denne notifikation | Påkrævet. Vælg fra foruddefinerede segmenter. |

---

## Sammensætning af en notifikation

Følg disse trin for at oprette og sende en notifikation:

### Trin 1: Indtast titlen

1. Klik på **Titel**-inputfeltet.
2. Skriv en kortfattet, opmærksomhedsfangende overskrift.
3. Hold den under 65 tegn for at undgå trunkering på mindre enheder.

> **Tip:** Brug handlingsorienteret sprog i titler. "Nyt: Spor dit kæledyrs vaccinationer" er mere engagerende end "Opdatering af vaccinationsfunktion."

### Trin 2: Skriv beskedteksten

1. Klik på **Beskedtekst**-tekstområdet.
2. Skriv den detaljerede besked, du ønsker brugerne skal se.
3. Inkluder relevant information, såsom hvilken handling brugeren bør tage.
4. Hold beskeden under 240 tegn for optimal visning.

### Trin 3: Vælg målgruppe

1. Klik på **Målgruppe**-rullelisten.
2. Vælg et af følgende målgruppesegmenter:

| Målgruppe | Beskrivelse |
|-----------|-------------|
| **Alle brugere** | Sender notifikationen til alle registrerede app-brugere |
| **Hundeejere** | Målretter brugere, der har mindst én hund registreret i deres profil |
| **Katteejere** | Målretter brugere, der har mindst én kat registreret i deres profil |
| **Verificerede opdrættere** | Målretter brugere, der er verificeret som professionelle opdrættere |

3. Den valgte målgruppe bestemmer, hvem der modtager push-notifikationen.

> **Bemærk:** En bruger kan tilhøre flere segmenter. F.eks. vil en verificeret opdrætter, der ejer hunde, modtage notifikationer målrettet "Hundeejere", "Verificerede opdrættere" og "Alle brugere".

### Trin 4: Gennemgå før afsendelse

1. Dobbelttjek titlen for stavefejl og klarhed.
2. Gennemgå beskedteksten for nøjagtighed og tone.
3. Bekræft, at målgruppesegmentet er korrekt.
4. Verificer, at dette ikke er en duplikat af en nyligt sendt notifikation.

---

## Afsendelsesbekræftelse

Når du er klar til at sende notifikationen, sikrer et bekræftelsestrin, at du ikke ved et uheld sender til den forkerte målgruppe.

### Afsendelsesproces

1. Klik på knappen **Send notifikation**.
2. En bekræftelsesdialog vises med:
   - Notifikationstitlen
   - Beskedteksten
   - Det valgte målgruppesegment
   - Det estimerede antal modtagere
3. Gennemgå alle detaljer i bekræftelsesdialogen.
4. Klik på **Bekræft afsendelse** for at sende notifikationen.
5. Alternativt, klik på **Annuller** for at vende tilbage til sammensætteren og foretage ændringer.
6. Ved succesfuld levering vises en succesbesked, der bekræfter, at notifikationen er sat i kø.

> **Vigtigt:** Når den er bekræftet, kan notifikationen ikke tilbagekaldes. Dobbelttjek altid målgruppe og indhold, før du bekræfter.

---

## Notifikationshistorik

Under sammensætningsformularen viser sektionen Notifikationshistorik en kronologisk liste over alle tidligere sendte notifikationer.

### Historiklistekolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| **Typetag** | Et farvet tag, der angiver målgruppesegmentet (f.eks. "Alle brugere" i blå, "Hundeejere" i orange) |
| **Titel** | Notifikationstitlen, som den blev sendt |
| **Besked** | En forhåndsvisning af beskedteksten (trunkeret, hvis lang) |
| **Dato** | Dato og tid for afsendelse af notifikationen |
| **Antal modtagere** | Antallet af brugere, der modtog notifikationen |

### Visning af historik

1. Scroll ned under sammensætningsformularen for at se historiklisten.
2. Notifikationer er opført i omvendt kronologisk rækkefølge (nyeste først).
3. Hver række viser typetag, titel, dato og antal modtagere med ét blik.
4. Klik på en række for at udvide og se den fulde beskedtekst.

### Forståelse af typetags

Typetags er farvekodede for hurtig identifikation:

| Tagfarve | Målgruppe |
|----------|-----------|
| Blå | Alle brugere |
| Orange | Hundeejere |
| Lilla | Katteejere |
| Grøn | Verificerede opdrættere |

---

## Bedste praksis for push-notifikationer

Effektive push-notifikationer driver engagement uden at irritere brugere. Følg disse retningslinjer:

### Frekvens

1. **Begræns frekvensen** -- Send ikke mere end 2-3 notifikationer pr. uge, medmindre det er presserende.
2. **Saml relaterede opdateringer** -- Kombinér flere små opdateringer i en enkelt notifikation.
3. **Respekter tidszoner** -- Send notifikationer i rimelige timer (9-20 lokal tid).
4. **Undgå weekender** -- Medmindre notifikationen er tidsfølsom, foretræk hverdage.

### Indholdskvalitet

1. **Vær kortfattet** -- Kom til sagen hurtigt. Brugere beslutter på sekunder, om de vil engagere sig.
2. **Vær handlingsorienteret** -- Fortæl brugerne, hvad de kan gøre: "Tjek dit kæledyrs kommende vaccinationer."
3. **Vær relevant** -- Brug målgruppemålretning til at sikre, at indholdet matcher brugerinteresser.
4. **Undgå clickbait** -- Vildledende notifikationer eroderer tillid og øger fravalgsrater.
5. **Personalisér, når det er muligt** -- Referer til målgruppesegmentet: "Kære hundeejere" føles mere personligt.

### Timing og kontekst

1. **Nye funktioner** -- Send, når funktionen er live og tilgængelig.
2. **Sundhedspåmindelser** -- Send et par dage, før et kæledyrs aftale eller vaccination er forfalden.
3. **Sæsonindhold** -- Tilpas til sæsoner (f.eks. loppe-/flåtpåmindelser om foråret).
4. **Nødopdateringer** -- For presserende problemer (vedligeholdelse, sikkerhed), send øjeblikkeligt uanset timingsregler.

### Skrivning af effektive titler

| Godt eksempel | Hvorfor det virker |
|---------------|-------------------|
| "Dit kæledyrs vaccination forfalder snart" | Relevant, skaber urgence, klar handling |
| "Nyt: Drægtighedssporing for opdrættere" | Fremhæver ny værdi, målretter målgruppe |
| "Vedligeholdelse i aften kl. 22" | Klar, specifik, tidsfølsom |

| Dårligt eksempel | Hvorfor det fejler |
|------------------|-------------------|
| "Tjek dette ud!" | Vagt, intet værditilbud |
| "Opdatering" | For generisk, brugere ignorerer det |
| "Vigtigt!!!" | Overbruger urgence, virker spammy |

### Måling af succes

Efter afsendelse af notifikationer, overvåg:

- **Åbningsrater** -- Engagerer brugerne sig med dine notifikationer?
- **Fravalgsrater** -- En stigning indikerer notifikationstræthed.
- **In-app-aktivitet** -- Driver en notifikation den tilsigtede adfærd?
- **Feedback** -- Tjek feedbacksiden for brugerreaktioner.

---

## Detaljer om målgruppesegmenter

### Alle brugere

- Inkluderer alle registrerede konti i systemet.
- Brug til platformomfattende meddelelser, vedligeholdelsesnotitser eller universelle funktioner.
- Største målgruppe -- brug sparsomt for at undgå notifikationstræthed.

### Hundeejere

- Inkluderer brugere med mindst én hund i deres kæledyrsprofil.
- Brug til hundespecifikke sundhedstips, racebegivenheder eller funktionsopdateringer.
- Eksempel: "Påmindelse: Årlig hjerteormforebyggelse for hunde."

### Katteejere

- Inkluderer brugere med mindst én kat i deres kæledyrsprofil.
- Brug til kattespecifikt indhold, indendørs sundhedstips eller katterelaterede funktioner.
- Eksempel: "Nyt: Indendørs aktivitetssporing for katte."

### Verificerede opdrættere

- Inkluderer brugere, der har gennemført opdrætterverificering.
- Brug til avlsspecifikke funktioner, compliance-opdateringer eller professionelle værktøjer.
- Eksempel: "Forbedringer af drægtighedstracker nu tilgængelige."

---

## Fejlfinding

| Problem | Løsning |
|---------|---------|
| Notifikation sendes ikke | Verificer, at alle påkrævede felter er udfyldt. Tjek netværksforbindelsen. |
| Antal modtagere viser 0 | Det valgte målgruppesegment kan være tomt. Verificer, at brugere eksisterer i det segment. |
| Brugere rapporterer, at de ikke modtager | Brugere kan have deaktiveret push-notifikationer på deres enhed. Dette er uden for admin-kontrol. |
| Duplikatnotifikation sendt | Tjek historiklisten, før du sender. Der er ingen fortrydelse, når den er bekræftet. |

---

## Relaterede sider

- [Feedback](./feedback.md) -- Overvåg brugerreaktioner på notifikationer
- [Analyser](./analytics.md) -- Spor brugerengagementstendenser
- [Indstillinger](./settings.md) -- Konfigurer notifikationsrelaterede systemindstillinger
