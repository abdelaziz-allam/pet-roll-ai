# Roller & Tilladelser

Petfolioo Admin-portalen bruger et rollebaseret adgangskontrolsystem (RBAC) til at styre, hvad hver administrator kan se og gøre. Hver admin-bruger tildeles en rolle, og hver rolle definerer et sæt af sideadgangs- og handlingstilladelser.

---

## Rolleoversigt

Platformen understøtter fire admin-roller, hver med et gradvist bredere sæt af muligheder:

| Role | Beskrivelse | Typisk anvendelse |
|------|-------------|-----------------|
| **Super Admin** | Fuld ubegrænset adgang til alle sider og handlinger | Platformejer, CTO, ledende administrator |
| **Admin** | Bred adgang til operationelle sider; ingen adgang til systemindstillinger eller admin-brugeradministration | Platformmanager, driftsleder |
| **Moderator** | Fokuseret adgang til indholdsmoderering (verifikation, parring, kæledyr) | Community manager, indholdsanmelder |
| **Viewer** | Skrivebeskyttet adgang til de fleste sider; kan ikke oprette, redigere eller slette noget | Supportmedarbejder, interessent, revisor |

---

## Tilladelsesstruktur

Tilladelser defineres på to niveauer:

### 1. Sideadgang

Hver rolle tildeles eller nægtes adgang til specifikke sider. Hvis en rolle ikke har adgang til en side, vises siden ikke i sidebjælkenavigationen, og direkte URL-adgang blokeres.

### 2. Handlingstilladelser

Inden for en side, som en rolle har adgang til, kan specifikke handlinger aktiveres eller deaktiveres. For eksempel kan en Moderator **se** kæledyr, men ikke **slette** dem.

---

## Tilladelsesmatrix

Følgende matrix viser præcist, hvad hver rolle kan gøre på hver side.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Sidesynlighed pr. rolle

Denne tabel opsummerer, hvilke sider der vises i sidebjælkenavigationen for hver rolle:

| Page | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Hvordan tilladelser påvirker UI

Når en bruger mangler tilladelse til en specifik handling, tilpasser admin-portalen grænsefladen i overensstemmelse hermed:

| Scenarie | UI-adfærd |
|----------|-------------|
| Ingen sideadgang | Siden fjernes fra sidebjælken; URL returnerer 403 |
| Kun visning (ingen edit/delete) | Handlingsknapper skjules; tabelrækker kan ikke klikkes til redigering |
| Ingen oprettelsestilladelse | "Create" / "Add"-knappen skjules |
| Ingen slettetilladelse | Slettemulighed fjernes fra handlingsmenuer |
| Ingen eksporttilladelse | Export-knappen skjules |
| Ingen approve/reject | Verifikationshandlingsknapper skjules; status vises som skrivebeskyttet |

> **Bemærk:** UI skjuler utilgængelige handlinger i stedet for at vise deaktiverede knapper. Dette holder grænsefladen ren og undgår forvirring om, hvad der er og ikke er tilladt.

---

## Administration af tilladelser

Kun **Super Admin**-brugere kan oprette, redigere eller slette admin-konti og ændre deres tilladelser.

### Tildeling af en rolle

1. Naviger til **Admin Users** i sidebjælken.
2. Klik på **Create Admin User** eller rediger en eksisterende bruger.
3. Vælg den ønskede rolle fra rullelisten Role.
4. Hvis du vælger **Super Admin**, tildeles alle tilladelser automatisk og kan ikke tilpasses.
5. For andre roller kan du tilpasse sideadgang og handlinger ved hjælp af tilladelsesredigeringsværktøjet.

### Brugerdefinerede tilladelser

Selvom hver rolle har typiske tilladelser, understøtter systemet tilpasning pr. bruger:

- En **Admin** kan tildeles Settings-adgang, hvis det er nødvendigt.
- En **Moderator** kan få Analytics-visningsadgang.
- En **Viewer** kan begrænses til færre sider end standardindstillingen.

Brugerdefinerede tilladelser tilsidesætter rollens standardindstillinger. Rolleetiketten forbliver den samme, men den faktiske adgang er det, der tæller.

### Tilladelsesredigering

Tilladelsesredigeringsværktøjet viser en tjeklisteoverflade:

1. Hver side vises som en sektion med en kontakt til sideadgang.
2. Når sideadgang er aktiveret, vises de tilgængelige handlinger for den pågældende side som afkrydsningsfelter.
3. Marker eller fjern markeringen af individuelle handlinger for at finjustere brugerens muligheder.
4. Klik på **Save** for at anvende ændringer med det samme.

> **Vigtigt:** Ændringer af tilladelser træder i kraft ved brugerens næste sideindlæsning. Hvis brugeren i øjeblikket er logget ind, vil de se de opdaterede tilladelser efter at have opdateret deres browser.

---

## Hurtig referenceguide til rollesammenligning

### Super Admin
- Kan gøre alt
- Eneste rolle, der kan administrere admin-brugere og systemindstillinger
- Eneste rolle, der kan slette app-brugere og notifikationer
- Eneste rolle, der kan eksportere brugerdata
- Kan ikke slettes, hvis det er den sidste Super Admin-konto

### Admin
- Fuld operationel adgang til indhold og brugeradministration
- Kan approve/reject verifikationer
- Kan administrere mating marketplace
- Kan sende notifikationer
- Kan ikke tilgå Settings eller Admin Users-sider
- Kan ikke slette app-brugere (kun ban)

### Moderator
- Fokuseret på indholdskvalitet og fællesskabssikkerhed
- Kan approve/reject opdrætterverifikationer
- Kan moderate parringsopslag
- Kan redigere kæledyr (rette fejlagtige oplysninger)
- Kan udelukke problematiske brugere
- Kan ikke tilgå Analytics, Settings eller Admin Users
- Kan ikke oprette eller slette indhold

### Viewer
- Skrivebeskyttet adgang til tilsynsformål
- Kan se dashboards, brugere, kæledyr, analytics
- Kan ikke ændre nogen data
- Kan ikke sende notifikationer eller godkende verifikationer
- Nyttigt for interessenter, der har brug for synlighed uden risiko

---

## Sikkerhedsovervejelser

| Praksis | Beskrivelse |
|----------|-------------|
| Mindste privilegium | Tildel den minimale rolle, der er nødvendig for brugerens ansvarsområder |
| Regelmæssig revision | Gennemgå listen over admin-brugere kvartalsvis; deaktiver ubrugte konti |
| Separate konti | Hver administrator bør have sin egen konto (ingen delte logins) |
| Super Admin-begrænsning | Hold antallet af Super Admins på maksimalt 2-3 |
| Suspender i stedet for at slette | Når en admin forlader organisationen, suspender kontoen i stedet for at slette den (bevarer revisionsspor) |

---

## Ofte stillede spørgsmål

**Sp: Kan jeg oprette en brugerdefineret rolle?**
Sv: Systemet har fire faste roller (Super Admin, Admin, Moderator, Viewer). Du kan dog tilpasse tilladelserne for enhver individuel bruger uanset deres rolleetiket.

**Sp: Hvad sker der, hvis jeg fjerner sideadgang for en bruger, der i øjeblikket ser den pågældende side?**
Sv: Brugeren vil se en 403-fejl ved næste navigation eller sideopdatering. Deres session afbrydes ikke.

**Sp: Kan en Super Admin nedgradere sig selv?**
Sv: En Super Admin kan ændre sin egen rolle, men systemet forhindrer, at den sidste Super Admin-konto fjernes helt.

**Sp: Påvirker tilladelser brugermanualen?**
Sv: Nej. Alle admin-brugere kan tilgå brugermanualen uanset deres rolle eller tilladelser. Dokumentation er altid tilgængelig.

**Sp: Kan jeg se en revisionslog over tilladelsesændringer?**
Sv: Tilladelsesændringer registreres med et tidsstempel og ID'et på den admin, der foretog ændringen. Disse gemmes i felterne `updatedBy` og `updatedAt` på hver admin-brugerpost.
