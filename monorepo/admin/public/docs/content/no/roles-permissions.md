# Roller & Tillatelser

Petfolioo Admin-portalen bruker et rollebasert tilgangskontrollsystem (RBAC) for a styre hva hver administrator kan se og gjore. Hver admin-bruker tildeles en rolle, og hver rolle definerer et sett med sidetilgang og handlingstillatelser.

---

## Rolleoversikt

Plattformen stotter fire admin-roller, hver med et gradvis bredere sett av muligheter:

| Role | Beskrivelse | Typisk bruksomrade |
|------|-------------|-----------------|
| **Super Admin** | Full ubegrenset tilgang til alle sider og handlinger | Plattformeier, CTO, ledende administrator |
| **Admin** | Bred tilgang til operasjonelle sider; ingen tilgang til systeminnstillinger eller admin-brukeradministrasjon | Plattformsjef, driftsleder |
| **Moderator** | Fokusert tilgang til innholdsmoderering (verifisering, paring, kjaledyr) | Community manager, innholdsanmelder |
| **Viewer** | Skrivebeskyttet tilgang til de fleste sider; kan ikke opprette, redigere eller slette noe | Supportmedarbeider, interessent, revisor |

---

## Tillatelsesstruktur

Tillatelser defineres pa to nivaer:

### 1. Sidetilgang

Hver rolle gis eller nektes tilgang til spesifikke sider. Hvis en rolle ikke har tilgang til en side, vises ikke siden i sidefeltet, og direkte URL-tilgang blokkeres.

### 2. Handlingstillatelser

Innenfor en side som en rolle har tilgang til, kan spesifikke handlinger aktiveres eller deaktiveres. For eksempel kan en Moderator **se** kjaledyr, men ikke **slette** dem.

---

## Tillatelsesmatrise

Folgende matrise viser noyaktig hva hver rolle kan gjore pa hver side.

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

## Sidesynlighet per rolle

Denne tabellen oppsummerer hvilke sider som vises i sidefeltet for hver rolle:

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

## Hvordan tillatelser pavirker UI

Nar en bruker mangler tillatelse for en spesifikk handling, tilpasser admin-portalen grensesnittet deretter:

| Scenario | UI-oppforsel |
|----------|-------------|
| Ingen sidetilgang | Siden fjernes fra sidefeltet; URL returnerer 403 |
| Kun visning (ingen edit/delete) | Handlingsknapper skjules; tabellrader kan ikke klikkes for redigering |
| Ingen opprettelsestillatelse | "Create" / "Add"-knappen skjules |
| Ingen slettetillatelse | Slettealternativ fjernes fra handlingsmenyer |
| Ingen eksporttillatelse | Export-knappen skjules |
| Ingen approve/reject | Verifiseringshandlingsknapper skjules; status vises som skrivebeskyttet |

> **Merk:** UI skjuler utilgjengelige handlinger i stedet for a vise deaktiverte knapper. Dette holder grensesnittet rent og ungar forvirring om hva som er og ikke er tillatt.

---

## Administrasjon av tillatelser

Kun **Super Admin**-brukere kan opprette, redigere eller slette admin-kontoer og endre tillatelsene deres.

### Tildeling av en rolle

1. Naviger til **Admin Users** i sidefeltet.
2. Klikk pa **Create Admin User** eller rediger en eksisterende bruker.
3. Velg onsket rolle fra Role-rullegardinmenyen.
4. Hvis du velger **Super Admin**, tildeles alle tillatelser automatisk og kan ikke tilpasses.
5. For andre roller kan du tilpasse sidetilgang og handlinger ved hjelp av tillatelsesredigeringsverktøyet.

### Egendefinerte tillatelser

Selv om hver rolle har typiske tillatelser, stotter systemet tilpasning per bruker:

- En **Admin** kan gis Settings-tilgang ved behov.
- En **Moderator** kan fa Analytics-visningstilgang.
- En **Viewer** kan begrenses til faerre sider enn standarden.

Egendefinerte tillatelser overstyrer rollens standardinnstillinger. Rolleetiketten forblir den samme, men den faktiske tilgangen er det som teller.

### Tillatelsesredigering

Tillatelsesredigeringsverktøyet viser et sjekklistebasert grensesnitt:

1. Hver side vises som en seksjon med en bryter for sidetilgang.
2. Nar sidetilgang er aktivert, vises de tilgjengelige handlingene for den aktuelle siden som avkrysningsbokser.
3. Kryss av eller fjern avkrysning for individuelle handlinger for a finjustere brukerens muligheter.
4. Klikk pa **Save** for a bruke endringene umiddelbart.

> **Viktig:** Endringer i tillatelser trer i kraft ved brukerens neste sideinnlasting. Hvis brukeren for oyeblikket er logget inn, vil de se de oppdaterte tillatelsene etter a ha oppdatert nettleseren.

---

## Hurtigreferanse for rollesammenligning

### Super Admin
- Kan gjore alt
- Eneste rolle som kan administrere admin-brukere og systeminnstillinger
- Eneste rolle som kan slette app-brukere og varsler
- Eneste rolle som kan eksportere brukerdata
- Kan ikke slettes hvis det er den siste Super Admin-kontoen

### Admin
- Full operasjonell tilgang til innhold og brukeradministrasjon
- Kan approve/reject verifiseringer
- Kan administrere mating marketplace
- Kan sende varsler
- Kan ikke fa tilgang til Settings eller Admin Users-sider
- Kan ikke slette app-brukere (kun ban)

### Moderator
- Fokusert pa innholdskvalitet og fellesskapssikkerhet
- Kan approve/reject oppdretterverifiseringer
- Kan moderere paringsannonser
- Kan redigere kjaledyr (rette feil informasjon)
- Kan utestenge problematiske brukere
- Kan ikke fa tilgang til Analytics, Settings eller Admin Users
- Kan ikke opprette eller slette innhold

### Viewer
- Skrivebeskyttet tilgang for tilsynsformal
- Kan se dashboards, brukere, kjaledyr, analytics
- Kan ikke endre noen data
- Kan ikke sende varsler eller godkjenne verifiseringer
- Nyttig for interessenter som trenger synlighet uten risiko

---

## Sikkerhetshensyn

| Praksis | Beskrivelse |
|----------|-------------|
| Minste privilegium | Tildel den minimale rollen som er nodvendig for brukerens ansvarsomrader |
| Regelmessig revisjon | Gjennomga listen over admin-brukere kvartalsvis; deaktiver ubrukte kontoer |
| Separate kontoer | Hver administrator bor ha sin egen konto (ingen delte innlogginger) |
| Super Admin-begrensning | Hold antallet Super Admins pa maksimalt 2-3 |
| Suspender i stedet for a slette | Nar en admin slutter, suspender kontoen i stedet for a slette den (bevarer revisjonsspor) |

---

## Ofte stilte sporsmal

**Sp: Kan jeg opprette en egendefinert rolle?**
Sv: Systemet har fire faste roller (Super Admin, Admin, Moderator, Viewer). Du kan imidlertid tilpasse tillatelsene for enhver individuell bruker uavhengig av rolleetiketten deres.

**Sp: Hva skjer hvis jeg fjerner sidetilgang for en bruker som for oyeblikket ser pa den siden?**
Sv: Brukeren vil se en 403-feil ved neste navigasjon eller sideoppdatering. Sesjonen deres avbrytes ikke.

**Sp: Kan en Super Admin nedgradere seg selv?**
Sv: En Super Admin kan endre sin egen rolle, men systemet forhindrer at den siste Super Admin-kontoen fjernes helt.

**Sp: Pavirker tillatelser brukermanualen?**
Sv: Nei. Alle admin-brukere kan fa tilgang til brukermanualen uavhengig av rolle eller tillatelser. Dokumentasjon er alltid tilgjengelig.

**Sp: Kan jeg se en revisjonslogg over tillatelsesendringer?**
Sv: Tillatelsesendringer registreres med et tidsstempel og ID-en til adminen som gjorde endringen. Disse lagres i feltene `updatedBy` og `updatedAt` pa hver admin-brukerpost.
