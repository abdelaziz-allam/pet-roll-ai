# Roles & Permissions

Petfolioo Admin Portal anvander ett rollbaserat atkomstkontrollsystem (RBAC) for att hantera vad varje administrator kan se och gora. Varje admin-anvandare tilldelas en roll, och varje roll definierar en uppsattning sidniva-atkomst och aktionsniva-behorigheter.

---

## Rolloversikt

Plattformen stodjer fyra admin-roller, var och en med en progressivt bredare uppsattning kapaciteter:

| Role | Beskrivning | Typiskt anvandningsfall |
|------|-------------|-----------------|
| **Super Admin** | Fullstandig obegransad atkomst till alla sidor och aktioner | Plattformsagare, CTO, huvudadministrator |
| **Admin** | Bred atkomst till operativa sidor; ingen atkomst till systeminstellningar eller admin-anvandarhantering | Plattformsansvarig, driftsledare |
| **Moderator** | Fokuserad atkomst till innehallsmoderering (verifiering, parning, husdjur) | Community-ansvarig, innehallsgranskare |
| **Viewer** | Skrivskyddad atkomst till de flesta sidor; kan inte skapa, redigera eller radera nagot | Supportmedarbetare, intressent, revisor |

---

## Behorighetsstuktur

Behorigheter definieras pa tva nivaer:

### 1. Sidatkomst

Varje roll beviljas eller nekas atkomst till specifika sidor. Om en roll inte har atkomst till en sida visas sidan inte i sidofaltets navigation och direkt URL-atkomst blockeras.

### 2. Aktionsbehorigheter

Inom en sida som en roll kan komma at kan specifika aktioner vara aktiverade eller inaktiverade. Till exempel kan en Moderator **visa** husdjur men inte **radera** dem.

---

## Behorighetmatris

Foljande matris visar exakt vad varje roll kan gora pa varje sida.

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

## Sidsynlighet per roll

Denna tabell sammanfattar vilka sidor som visas i sidofaltets navigation for varje roll:

| Sida | Super Admin | Admin | Moderator | Viewer |
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

## Hur behorigheter paverkar UI

Nar en anvandare saknar behorighet for en specifik aktion anpassar admin-portalen granssnittet darefter:

| Scenario | UI-beteende |
|----------|-------------|
| Ingen sidatkomst | Sidan borttagen fran sidofaltet; URL returnerar 403 |
| Enbart visning (inget Edit/Delete) | Aktionsknappar dolda; tabellrader inte klickbara for redigering |
| Ingen Create-behorighet | "Create" / "Add"-knapp dold |
| Ingen Delete-behorighet | Delete-alternativ borttaget fran aktionsmenyer |
| Ingen Export-behorighet | Export-knapp dold |
| Inget Approve/Reject | Verifieringsaktionsknappar dolda; status visas som skrivskyddad |

> **Observera:** UI doljer otillgangliga aktioner istallet for att visa inaktiverade knappar. Detta haller granssnittet rent och undviker forvirring om vad som ar tillatet och inte.

---

## Hantera behorigheter

Endast **Super Admin**-anvandare kan skapa, redigera eller radera admin-konton och andra deras behorigheter.

### Tilldela en roll

1. Navigera till **Admin Users** i sidofaltet.
2. Klicka pa **Create Admin User** eller redigera en befintlig anvandare.
3. Valj onskad roll fran roll-rullgardinsmenyn.
4. Om du valjer **Super Admin** beviljas alla behorigheter automatiskt och kan inte anpassas.
5. For andra roller, anpassa sidatkomst och aktioner med hjalp av behorighetseditorn.

### Anpassade behorigheter

Aven om varje roll har typiska behorigheter stodjer systemet anpassning per anvandare:

- En **Admin** kan beviljas Settings-atkomst vid behov.
- En **Moderator** kan ges Analytics-visningsatkomst.
- En **Viewer** kan begransas till farre sidor an standardkonfigurationen.

Anpassade behorigheter asidosatter rollstandarderna. Rolletiketten forblir densamma men det ar den faktiska atkomsten som galler.

### Behorighetseditorn

Behorighetseditorn visar ett granssnitt med checklistor:

1. Varje sida visas som en sektion med en vaxlare for sidatkomst.
2. Nar sidatkomst ar aktiverad visas tillgangliga aktioner for den sidan som kryssrutor.
3. Kryssa i eller ur enskilda aktioner for att finjustera anvandarens kapaciteter.
4. Klicka pa **Save** for att tillampla andringarna omedelbart.

> **Viktigt:** Andringar av behorigheter trader i kraft vid anvandarens nasta sidladdning. Om anvandaren for narvarande ar inloggad ser de de uppdaterade behorigheterna efter att ha uppdaterat sin webblasare.

---

## Snabbreferens for rolljamforelse

### Super Admin
- Kan gora allt
- Enda rollen som kan hantera admin-anvandare och systeminstellningar
- Enda rollen som kan radera app-anvandare och notifieringar
- Enda rollen som kan exportera anvandardata
- Kan inte raderas om det ar det sista Super Admin-kontot

### Admin
- Fullstandig operativ atkomst till innehalls- och anvandarhantering
- Kan godkanna/avvisa verifieringar
- Kan hantera Mating Marketplace
- Kan skicka notifieringar
- Kan inte komma at Settings eller Admin Users-sidor
- Kan inte radera app-anvandare (enbart banna)

### Moderator
- Fokuserad pa innehallskvalitet och communitys sakerhet
- Kan godkanna/avvisa uppodarverifieringar
- Kan moderera parningsannonser
- Kan redigera husdjur (korrigera felaktig information)
- Kan banna problematiska anvandare
- Kan inte komma at Analytics, Settings eller Admin Users
- Kan inte skapa eller radera innehall

### Viewer
- Skrivskyddad atkomst for oversiktssyften
- Kan visa instrumentpaneler, anvandare, husdjur, analytics
- Kan inte andra nagra data
- Kan inte skicka notifieringar eller godkanna verifieringar
- Anvandbart for intressenter som behover insyn utan risk

---

## Sakerhetsovervaganden

| Praxis | Beskrivning |
|----------|-------------|
| Minsta behorighet | Tilldela den lagsta roll som kravs for anvandarens ansvarsomraden |
| Regelbunden granskning | Granska admin-anvandarlistan kvartalsvis; inaktivera oanvanda konton |
| Separata konton | Varje administrator bor ha sitt eget konto (inga delade inloggningar) |
| Super Admin-begransning | Hall antalet Super Admins till maximalt 2-3 |
| Suspendera istallet for att radera | Nar en admin slutar, suspendera deras konto istallet for att radera det (bevarar granskningsspar) |

---

## Vanliga fragor

**F: Kan jag skapa en anpassad roll?**
S: Systemet har fyra fasta roller (Super Admin, Admin, Moderator, Viewer). Du kan dock anpassa behorigheterna for varje enskild anvandare oavsett deras rolletikett.

**F: Vad hander om jag tar bort sidatkomst for en anvandare som for narvarande visar den sidan?**
S: Anvandaren ser ett 403-fel vid sin nasta navigering eller siduppdatering. Deras session avbryts inte.

**F: Kan en Super Admin degradera sig sjalv?**
S: En Super Admin kan andra sin egen roll, men systemet forhindrar att det sista Super Admin-kontot tas bort helt.

**F: Paverkar behorigheter anvandarhandboken?**
S: Nej. Alla admin-anvandare kan komma at anvandarhandboken oavsett roll eller behorigheter. Dokumentationen ar alltid tillganglig.

**F: Kan jag se en granskningslogg over behorighetandringar?**
S: Behorighetandringar registreras med en tidsstampel och ID:t for den administratorer som gjorde andringen. Dessa lagras i falten `updatedBy` och `updatedAt` pa varje admin-anvandarpost.
