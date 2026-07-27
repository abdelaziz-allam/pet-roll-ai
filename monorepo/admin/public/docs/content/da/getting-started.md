# Kom godt i gang

Velkommen til Petfolioo Admin Portalen. Denne guide leder dig gennem dit første login, forklarer interfacets layout og hjælper dig med at forstå, hvordan rollebaseret adgangskontrol bestemmer, hvad du kan se og gøre på platformen.

Admin portalen er en webbaseret administrationskonsol til Petfolioo-platformen for kæledyrssundhed og avl. Herfra kan administratorer styre brugere, kæledyr, kategorier, sundhedsregistreringer, avlsprogrammer og platformindstillinger.

![Login Page](/docs/screenshots/login.png)

---

## Log ind

Admin portalen bruger e-mail- og adgangskodegodkendelse. Kun konti med en tildelt administratorrolle kan få adgang til portalen.

### Trin til at logge ind

1. Åbn din browser og naviger til admin portalens URL.
2. Du vil se **Login**-siden på `/login`-ruten.
3. Indtast din **e-mailadresse** i det første felt.
4. Indtast din **adgangskode** i det andet felt.
5. Klik på knappen **Log ind**.
6. Hvis dine legitimationsoplysninger er gyldige, og din konto har administratoradgang, bliver du omdirigeret til **Dashboardet**.

> **Bemærk:** Hvis du ser en "Uautoriseret"-fejl efter at have indtastet gyldige legitimationsoplysninger, har din konto muligvis ikke en administratorrolle tildelt. Kontakt en superadministrator for at få din rolle opdateret.

### Nulstilling af adgangskode

Hvis du har glemt din adgangskode:

1. Klik på linket **Glemt adgangskode?** under adgangskodefeltet på login-siden.
2. Indtast den e-mailadresse, der er knyttet til din administratorkonto.
3. Klik på **Send nulstillingslink**.
4. Tjek din e-mail-indbakke for en besked om nulstilling af adgangskode fra Petfolioo.
5. Klik på linket i e-mailen for at åbne formularen til nulstilling af adgangskode.
6. Indtast og bekræft din nye adgangskode.
7. Gå tilbage til login-siden og log ind med dine nye legitimationsoplysninger.

> **Tip:** Links til nulstilling af adgangskode udløber efter 1 time. Hvis dit link er udløbet, kan du anmode om et nyt fra login-siden.

---

## Forstå dashboard-layoutet

Når du er logget ind, præsenterer admin portalen et konsistent layout på tværs af alle sider.

### Sidebjælkenavigation

Den venstre sidebjælke indeholder den primære navigationsmenu. Den inkluderer links til alle hovedmoduler:

| Menupunkt | Beskrivelse |
|-----------|-------------|
| Dashboard | Platformoversigt med KPI'er og analyser |
| Brugere | Administrer app-brugere, roller og konti |
| Kæledyr | Gennemse og administrer kæledyrsregistret |
| Kategorier | Definer og administrer kæledyrskategorier |
| Sundhedsregistreringer | Gennemgå sundhedscertificeringer for kæledyr |
| Avl | Administrer avlsprogrammer og stamtavle |
| Vaccinationer | Spor vaccinationsregistreringer |
| Drægtighedsovervågning | Overvåg drægtighedssporingsindtastninger |
| Verificeringer | Gennemgå afventende verificeringsanmodninger |
| Indstillinger | Platformkonfiguration |

Sidebjælken kan skjules ved at klikke på skifteknappen øverst for at give mere skærmplads til indholdsområder.

### Topbjælke

Den øverste topbjælke indeholder:

| Element | Placering | Formål |
|---------|-----------|--------|
| Søgning | Center | Global søgning på tværs af brugere, kæledyr og registreringer |
| Notifikationsklokke | Højre | Advarsler om afventende handlinger og systembegivenheder |
| Profilavatar | Yderst til højre | Kontomenu med profilindstillinger og log ud |

### Indholdsområde

Hovedindholdsområdet optager den resterende plads til højre for sidebjælken og under topbjælken. Det er her, tabeller, formularer, detaljevisninger og analyser vises.

---

## Rollebaseret adgang

Admin portalen håndhæver rollebaseret adgangskontrol (RBAC). Hver administratorkonto er tildelt en af følgende roller, som bestemmer, hvilke handlinger der er tilgængelige.

### Rolledefinitioner

| Rolle | Adgangsniveau | Beskrivelse |
|-------|--------------|-------------|
| `super_admin` | Fuld | Komplet adgang til alle moduler, indstillinger og brugeradministration. Kan tildele og tilbagekalde administratorroller. |
| `admin` | Høj | Adgang til alle operationelle moduler. Kan administrere brugere, kæledyr og registreringer. Kan ikke ændre platformindstillinger eller tildele super_admin-roller. |
| `moderator` | Medium | Kan gennemgå og moderere indhold, godkende verificeringer og administrere kæledyrsopslag. Kan ikke oprette eller slette administratorkonti. |
| `viewer` | Skrivebeskyttet | Kan se alle data på tværs af moduler, men kan ikke oprette, redigere eller slette registreringer. Nyttigt til revision og rapportering. |

### Tilladelsesmatrix

| Handling | super_admin | admin | moderator | viewer |
|----------|:-----------:|:-----:|:---------:|:------:|
| Se dashboard | Ja | Ja | Ja | Ja |
| Administrere brugere | Ja | Ja | Nej | Nej |
| Oprette administratorkonti | Ja | Nej | Nej | Nej |
| Udelukke/ophæve udelukkelse af brugere | Ja | Ja | Ja | Nej |
| Administrere kæledyr | Ja | Ja | Ja | Nej |
| Godkende verificeringer | Ja | Ja | Ja | Nej |
| Administrere kategorier | Ja | Ja | Nej | Nej |
| Redigere platformindstillinger | Ja | Nej | Nej | Nej |
| Se rapporter | Ja | Ja | Ja | Ja |

> **Bemærk:** Hvis et navigationspunkt ikke er synligt i din sidebjælke, har din rolle ikke adgang til det pågældende modul.

---

## Navigationsoversigt

Nedenfor er en komplet liste over moduler tilgængelige i admin portalen, organiseret efter funktionsområde.

### Kernemoduler

1. **Dashboard** - Platformsundhedsoversigt, KPI'er og analysediagrammer.
2. **Brugere** - Administration af app-brugere inklusiv profiler, roller og kontostatus.
3. **Kæledyr** - Kæledyrsregistret med fulde detaljevisninger og moderationsværktøjer.
4. **Kategorier** - Kategoriseringssystem for kæledyrsarter/-typer.

### Sundhed og registreringer

5. **Sundhedsregistreringer** - Sundhedscertificeringsdokumenter og deres verificeringsstatus.
6. **Vaccinationer** - Vaccinationsplaner og afslutningsregistreringer.
7. **Drægtighedsovervågning** - Drægtighedsopfølgning for avlsdyr.

### Platformdrift

8. **Verificeringer** - Kø af afventende bruger- og kæledyrsverificeringsanmodninger.
9. **Avl** - Administration af avlsprogrammer og stamtavlesporing.
10. **Indstillinger** - Platformomfattende konfiguration og feature flags.

---

## Tips til førstegangsopsætning

Når du første gang får adgang til admin portalen, følg disse anbefalinger for at komme godt i gang.

### Anbefalede første trin

1. **Gennemgå din profil** - Klik på din avatar i øvre højre hjørne og vælg "Profil" for at bekræfte, at dine kontooplysninger er korrekte.
2. **Udforsk dashboardet** - Gør dig fortrolig med KPI-kortene og analyserne for at forstå aktuelle platformsmålinger.
3. **Tjek afventende verificeringer** - Naviger til modulet Verificeringer for at se, om der er emner, der afventer gennemgang.
4. **Gennemse aktive brugere** - Besøg modulet Brugere og sorter efter "Tilmeldingsdato" faldende for at se de seneste registreringer.
5. **Gennemgå kategorier** - Sørg for, at kæledyrskategorierne er konfigureret korrekt til din region.

### Browseranbefalinger

Admin portalen fungerer bedst i moderne browsere:

| Browser | Minimumsversion |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tip:** Aktiver browsernotifikationer, når du bliver bedt om det, for at modtage realtidsadvarsler om afventende verificeringer og vigtige systembegivenheder.

### Tastaturgenveje

| Genvej | Handling |
|--------|---------|
| `/` | Fokuser den globale søgebjælke |
| `Esc` | Luk åbne paneler og dialogbokse |

---

## Fejlfinding af login-problemer

| Problem | Løsning |
|---------|---------|
| "Ugyldige legitimationsoplysninger"-fejl | Dobbelttjek din e-mail og adgangskode. Brug Glemt adgangskode-funktionen, hvis nødvendigt. |
| "Konto deaktiveret"-besked | Din konto er blevet deaktiveret. Kontakt en superadministrator. |
| Siden indlæses, men login-formularen er blank | Ryd din browsers cache og cookies, og genindlæs derefter. |
| Omdirigeret tilbage til login efter at have logget ind | Din session kan være udløbet. Prøv at logge ind igen. Hvis det fortsætter, tjek at cookies er aktiveret. |

---

## Få hjælp

Hvis du støder på problemer, der ikke er dækket i denne guide:

1. Tjek de andre afsnit i denne brugermanual for modulspecifik hjælp.
2. Kontakt din organisations superadministrator for rolle- og adgangsproblemer.
3. For tekniske problemer, kontakt platformens supportteam.

---

*Næste: [Dashboard](./dashboard.md) - Lær om analyse- og KPI-oversigten.*
