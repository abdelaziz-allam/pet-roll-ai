# Administratorer

Siden Administratorer giver dig mulighed for at administrere de administratorkonti, der har adgang til Petfolioo admin portalen. Her kan du oprette nye administratorer, tildele roller, konfigurere granulære tilladelser og kontrollere kontostatus.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Oversigt

Adgangskontrol er kritisk for at opretholde sikkerhed og operationel integritet. Administratorsystemet understøtter rollebaseret adgang med yderligere granulær tilladelsesstyring pr. side, hvilket sikrer, at hvert teammedlem har præcis den adgang, de har brug for.

---

## Administratortabel

Hovedvisningen viser en tabel over alle administratorkonti i systemet.

### Tabelkolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| **Navn** | Administratorens visningsnavn vist i hele portalen |
| **E-mail** | Login-e-mailadressen for administratorkontoen |
| **Rolle** | Den tildelte rolle, der bestemmer grundlæggende tilladelsesniveau |
| **Status** | Aktuel kontostatus: Aktiv eller Suspenderet |
| **Handlinger** | Rediger- og Slet-handlingsknapper |

### Tabelfunktioner

1. Tabellen er sorterbar ved at klikke på kolonneoverskrifter.
2. En søgefelt over tabellen tillader filtrering efter navn eller e-mail.
3. Sideinddelingskontroller vises i bunden for store administratorteams.
4. Aktive konti viser et grønt statusbadge; suspenderede konti viser et rødt badge.

---

## Roller

Hver administratorkonto tildeles en af fire roller. Roller definerer grundniveauet for adgang, før eventuelle granulære tilladelsesoverskrivninger anvendes.

### Rolledefinitioner

| Rolle | Adgangsniveau | Beskrivelse |
|-------|--------------|-------------|
| **super_admin** | Fuld ubegrænset | Komplet adgang til alle sider, funktioner og systemindstillinger. Kan ikke slettes eller få tilladelser begrænset. |
| **admin** | Alt indhold og brugere | Fuld adgang til indholdsstyring, brugeradministration, feedback, notifikationer og analyser. Kan ikke tilgå indstillinger på systemniveau. |
| **moderator** | Gennemgang og moderering | Kan gennemgå og moderere indhold som feedback, rapporterede profiler og markerede poster. Kan ikke oprette eller slette ressourcer. |
| **viewer** | Skrivebeskyttet | Kan se alle sider, de har adgang til, men kan ikke oprette, redigere eller slette registreringer. Ideel til interessenter, der har brug for indsigt. |

### Rollehierarki

Rollehierarkiet bestemmer, hvilke roller der kan administrere andre roller:

1. **super_admin** kan administrere alle andre roller (admin, moderator, viewer).
2. **admin** kan administrere moderator- og viewer-konti.
3. **moderator** kan ikke administrere nogen administratorkonti.
4. **viewer** kan ikke administrere nogen administratorkonti.

> **Vigtigt:** Du kan ikke tildele en rolle højere end din egen. Kun en super_admin kan oprette en anden super_admin.

---

## Oprettelse af en administrator

For at tilføje en ny administratorkonto til portalen:

### Trin

1. Klik på knappen **Tilføj administrator** i øvre højre hjørne af Administratorsiden.
2. En oprettelsesformulardialog vises med følgende felter:

| Felt | Beskrivelse | Krav |
|------|-------------|------|
| **E-mail** | Login-e-mail for den nye administrator | Påkrævet. Skal være en gyldig, unik e-mailadresse. |
| **Visningsnavn** | Navnet vist i portalens brugergrænseflade | Påkrævet. 2-50 tegn. |
| **Adgangskode** | Den indledende login-adgangskode | Påkrævet. Minimum 8 tegn, skal indeholde store bogstaver, små bogstaver og et tal. |
| **Rolle** | Adgangsrollen for denne administrator | Påkrævet. Vælg fra rullelisten. |

3. Udfyld **E-mail**-feltet med den nye administrators e-mailadresse.
4. Indtast et **Visningsnavn**, der vil identificere denne administrator i portalen.
5. Angiv en indledende **Adgangskode**, der opfylder kompleksitetskravene.
6. Vælg den passende **Rolle** fra rullelisten.
7. Klik på **Opret** for at tilføje administratorkontoen.
8. En succesbesked bekræfter, at kontoen blev oprettet.
9. Den nye administrator vises i tabellen og kan nu logge ind.

> **Tip:** Efter oprettelse af en konto, informer den nye administrator om deres legitimationsoplysninger via en sikker kanal. Anbefal, at de ændrer deres adgangskode ved første login.

---

## Redigering af en administrator

Du kan ændre en eksisterende administrators visningsnavn, rolle og status.

### Trin

1. Find administratoren i administratortabellen.
2. Klik på knappen **Rediger** (blyantikon) i Handlinger-kolonnen.
3. En redigeringsformulardialog vises med de aktuelle værdier udfyldt på forhånd.

### Redigerbare felter

| Felt | Beskrivelse | Noter |
|------|-------------|-------|
| **Visningsnavn** | Opdater administratorens synlige navn | 2-50 tegn |
| **Rolle** | Ændr administratorens adgangsniveau | Kan ikke tildele en rolle højere end din egen |
| **Status** | Sæt til Aktiv eller Suspenderet | Suspenderede administratorer kan ikke logge ind |

4. Ændr felterne efter behov.
5. Klik på **Gem ændringer** for at anvende opdateringerne.
6. En succesbesked bekræfter, at ændringerne blev gemt.

### Ændring af status

- **Aktiv** -- Administratoren kan logge ind og bruge portalen normalt.
- **Suspenderet** -- Administratoren kan ikke logge ind. Eksisterende sessioner afsluttes øjeblikkeligt.

> **Bemærk:** Suspendering af en administrator er reversibel. Brug det, når du midlertidigt skal tilbagekalde adgang uden at slette kontoen.

### Begrænsninger

- Du kan ikke redigere din egen rolle (for at forhindre utilsigtet selvdemotion).
- Du kan ikke ændre en super_admins rolle, medmindre du også er super_admin.
- E-mail kan ikke ændres efter kontooprettelse.

---

## Granulær tilladelseskonfiguration pr. side

Ud over roller understøtter admin portalen finkornet tilladelseskontrol på side-for-side-basis. Dette giver dig mulighed for at tilpasse præcis, hvilke sider og handlinger hver administrator kan tilgå.

### Adgang til tilladelseskonfiguration

1. Klik på knappen **Rediger** på den administrator, du vil konfigurere.
2. I redigeringsdialogen, naviger til sektionen **Tilladelser** (eller fanen).
3. En tilladelsesmatrix vises, der viser alle portalsider.

### Tilladelsesmatrixstruktur

Tilladelsesmatrixen viser hver portalside som en række med følgende kontroller:

| Kontrol | Beskrivelse |
|---------|-------------|
| **Adgangskontakt** | En kontakt, der aktiverer eller deaktiverer adgang til hele siden |
| **Handlings-multivælger** | En rullemenu, der giver dig mulighed for at vælge, hvilke specifikke handlinger der er tilladt på den side |

### Tilgængelige sider i matrixen

| Side | Mulige handlinger |
|------|-------------------|
| Dashboard | Vis |
| Brugere | Vis, Opret, Rediger, Slet, Suspender |
| Kæledyr | Vis, Opret, Rediger, Slet |
| Sundhedsregistreringer | Vis, Opret, Rediger, Slet |
| Vaccinationer | Vis, Opret, Rediger, Slet |
| Avl | Vis, Opret, Rediger, Slet |
| Feedback | Vis, Svar, Luk, Fastgør |
| Notifikationer | Vis, Send |
| Analyser | Vis, Eksporter |
| Indstillinger | Vis, Rediger |
| Administratorer | Vis, Opret, Rediger, Slet |

### Konfigurering af tilladelser

1. For hver siderække, skift **Adgangs**-kontakten:
   - **TIL** -- Administratoren kan tilgå denne side (specifikke handlinger kontrolleres nedenfor).
   - **FRA** -- Administratoren kan ikke se eller navigere til denne side overhovedet.
2. For sider med adgang aktiveret, klik på **Handlinger**-multivælger-rullelisten.
3. Vælg de specifikke handlinger, denne administrator har lov til at udføre:
   - Marker hver handling, du vil give.
   - Fjern markering for handlinger, du vil begrænse.
4. Gentag for hver side efter behov.
5. Klik på **Gem ændringer** for at anvende tilladelseskonfigurationen.

### Hvordan tilladelser interagerer med roller

- Rolletilladelser fungerer som **grundlinjen**.
- Tilladelser pr. side kan **begrænse** adgang under rollegundlinjen.
- Tilladelser pr. side **kan ikke give** adgang ud over, hvad rollen tillader.
- For eksempel: En admin-rolle bruger har adgang til alle indholdssider som standard. Du kan begrænse deres adgang til Avl-siden ved at slå den fra, men du kan ikke give dem Indstillingsadgang (reserveret til super_admin).

> **Tip:** Brug granulære tilladelser, når du har teammedlemmer, der har brug for en specifik delmængde af admin-funktioner. For eksempel kan en kundesupportmedarbejder have "admin"-rollen, men begrænset til kun Feedback- og Brugersider.

---

## Sletning af en administrator

Fjernelse af en administratorkonto sletter den permanent fra systemet.

### Trin

1. Find administratoren i administratortabellen.
2. Klik på knappen **Slet** (papirkurvsikon) i Handlinger-kolonnen.
3. En bekræftelsesdialog vises med administratorens navn og e-mail.
4. Skriv administratorens e-mailadresse for at bekræfte sletning (sikkerhedsforanstaltning).
5. Klik på **Bekræft sletning** for permanent at fjerne kontoen.
6. En succesbesked bekræfter sletningen.
7. Administratoren fjernes fra tabellen og kan ikke længere logge ind.

### Sletningsbegrænsninger

| Begrænsning | Årsag |
|-------------|-------|
| Kan ikke slette en super_admin | Forhindrer utilsigtet låsning af systemet |
| Kan ikke slette din egen konto | Forhindrer selvfjernelse |
| Kan ikke slette, hvis du mangler tilstrækkelig rolle | Rollehierarkiregler gælder |

> **Advarsel:** Sletning er permanent og kan ikke fortrydes. Hvis du midlertidigt skal fjerne adgang, brug Suspenderet-status i stedet.

---

## Forklaring af tilladelsesmatrix

Tilladelsessystemet i Petfolioo bruger en lagdelt tilgang:

### Lag 1: Rollebaseret adgangskontrol (RBAC)

Hver rolle har et foruddefineret sæt tilladelser, der fungerer som udgangspunkt:

```
super_admin  -->  Alle sider, alle handlinger, ingen begrænsninger
admin        -->  Alle indholds-/brugersider, alle handlinger (undtagen Indstillinger)
moderator    -->  Indholdsgennemgangssider, begrænsede handlinger (vis, svar, luk)
viewer       -->  Alle tilgængelige sider, kun visning
```

### Lag 2: Overskrivninger pr. side

Granulære tilladelser tilføjer et andet lag oven på RBAC:

```
Rolletilladelser  (grundlinje)
    |
    v
Kontakter pr. side  (kan begrænse, kan ikke udvide ud over rollen)
    |
    v
Endelige effektive tilladelser  (hvad administratoren faktisk ser)
```

### Eksempelscenarier

**Scenarie 1: Kundesupportmedarbejder**
- Rolle: admin
- Overskrivning: Deaktiver adgang til Kæledyr, Sundhedsregistreringer, Avl, Analyser, Administratorer
- Resultat: Kan kun tilgå Dashboard, Brugere, Feedback og Notifikationer

**Scenarie 2: Indholdsgennemgåer**
- Rolle: moderator
- Overskrivning: Aktiver Feedback (Vis, Svar, Luk), Brugere (kun Vis)
- Resultat: Kan gennemgå feedback og slå brugerprofiler op, men kan ikke ændre brugere

**Scenarie 3: Analyseobservatør**
- Rolle: viewer
- Overskrivning: Aktiver kun Dashboard og Analyser
- Resultat: Kan se diagrammer og målinger, men intet andet

### Visning af effektive tilladelser

1. Åbn redigeringsdialogen for enhver administrator.
2. Tilladelsessektionen viser den aktuelle effektive tilstand.
3. Kontakter og handlingsvalg afspejler, hvad der aktuelt er givet.
4. Deaktiverede (gråtonede) handlinger indikerer dem, der ligger ud over rollens tilladelse.

---

## Bedste sikkerhedspraksis

1. **Princippet om mindste privilegium** -- Tildel den minimale rolle og de minimale tilladelser, der er nødvendige for hver administrators jobfunktion.
2. **Regelmæssige revisioner** -- Gennemgå administratorkonti kvartalsvist. Fjern konti, der ikke længere er nødvendige.
3. **Suspender før sletning** -- Ved offboarding, suspender først for at sikre ingen forstyrrelser, slet derefter efter en henstandsperiode.
4. **Begræns super_admins** -- Hold antallet af super_admin-konti på et minimum (ideelt 1-2).
5. **Stærke adgangskoder** -- Håndhæv komplekse adgangskoder og anbefal adgangskodeadministratorer.
6. **Overvåg aktivitet** -- Tjek, hvem der logger ind og hvornår via systemlogs.

---

## Fejlfinding

| Problem | Løsning |
|---------|---------|
| Kan ikke oprette administrator | Verificer, at du har tilstrækkelige rolleprivilegier. Tjek, at e-mailen ikke allerede er i brug. |
| Kan ikke se Rediger/Slet-knapper | Din rolle har ikke tilladelse til at administrere administratorer på eller over målets rolleniveau. |
| Administrator kan ikke logge ind efter oprettelse | Verificer, at kontostatus er Aktiv. Bekræft, at adgangskoden blev indtastet korrekt. |
| Tilladelsesændringer træder ikke i kraft | Administratoren skal muligvis logge ud og logge ind igen, for at tilladelsesændringer kan anvendes. |
| Kan ikke slette en super_admin | Dette er designmæssigt. Super_admin-konti kan ikke slettes via brugergrænsefladen. |

---

## Relaterede sider

- [Indstillinger](./settings.md) -- Konfigurer systemsikkerhedsindstillinger
- [Feedback](./feedback.md) -- Administrer brugerfeedback (kræver Feedback-sideadgang)
- [Analyser](./analytics.md) -- Se platformmålinger (kræver Analyse-sideadgang)
