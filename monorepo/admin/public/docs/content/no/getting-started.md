# Kom i gang

Velkommen til Petfolioo-administrasjonsportalen. Denne veiledningen tar deg gjennom din forste innlogging, forklarer grensesnittets oppsett, og hjelper deg a forsta hvordan rollebasert tilgangskontroll bestemmer hva du kan se og gjore pa plattformen.

Administrasjonsportalen er en nettbasert administrasjonskonsoll for Petfolioo sin plattform for dyrehelse og avl. Herfra kan administratorer administrere brukere, dyr, kategorier, helseregistreringer, avlsprogrammer og plattforminnstillinger.

![Login Page](/docs/screenshots/login.png)

---

## Innlogging

Administrasjonsportalen bruker e-post- og passordautentisering. Kun kontoer med en tildelt administratorrolle kan fa tilgang til portalen.

### Fremgangsmate for innlogging

1. Apne nettleseren din og naviger til administrasjonsportalens URL.
2. Du vil bli presentert med **Innlogging**-siden pa `/login`-ruten.
3. Skriv inn din **e-postadresse** i det forste feltet.
4. Skriv inn ditt **passord** i det andre feltet.
5. Klikk pa **Logg inn**-knappen.
6. Hvis legitimasjonen din er gyldig og kontoen din har administratortilgang, vil du bli omdirigert til **Dashboardet**.

> **Merk:** Hvis du ser en "Uautorisert"-feil etter a ha skrevet inn gyldig legitimasjon, kan det hende at kontoen din ikke har en administratorrolle tildelt. Kontakt en superadministrator for a fa rollen din oppdatert.

### Tilbakestille passord

Hvis du har glemt passordet ditt:

1. Pa innloggingssiden, klikk pa **Glemt passord?**-lenken under passordfeltet.
2. Skriv inn e-postadressen knyttet til administratorkontoen din.
3. Klikk **Send tilbakestillingslenke**.
4. Sjekk e-postinnboksen din for en melding om tilbakestilling av passord fra Petfolioo.
5. Klikk pa lenken i e-posten for a apne skjemaet for tilbakestilling av passord.
6. Skriv inn og bekreft ditt nye passord.
7. Ga tilbake til innloggingssiden og logg inn med ditt nye passord.

> **Tips:** Lenker for tilbakestilling av passord utloper etter 1 time. Hvis lenken din har utlopt, be om en ny fra innloggingssiden.

---

## Forsta dashboardets layout

Nar du er logget inn, presenterer administrasjonsportalen et konsekvent oppsett pa tvers av alle sider.

### Sidefeltnavigasjon

Det venstre sidefeltet inneholder hovednavigasjonsmenyen. Den inkluderer lenker til alle hovedmoduler:

| Menyelement | Beskrivelse |
|-------------|-------------|
| Dashboard | Plattformoversikt med KPI-er og analyser |
| Brukere | Administrer app-brukere, roller og kontoer |
| Dyr | Bla gjennom og administrer dyreregisteret |
| Kategorier | Definer og administrer dyrekategorier |
| Helseregistreringer | Gjennomga helsesertifiseringer for dyr |
| Avl | Administrer avlsprogrammer og avstamning |
| Vaksinasjoner | Spor vaksinasjonsregistreringer |
| Drektighet | Overvak drektighetsregistreringer |
| Verifiseringer | Gjennomga ventende verifiseringsforesporsler |
| Innstillinger | Plattformkonfigurasjon |

Sidefeltet kan skjules ved a klikke pa veksleikonet oppe for a gi mer skjermplass til innholdsomrader.

### Topplinje

Den overste topplinjen inneholder:

| Element | Plassering | Formal |
|---------|------------|--------|
| Sok | Senter | Globalt sok pa tvers av brukere, dyr og registreringer |
| Varslingsbjelle | Hoyre | Varsler for ventende handlinger og systemhendelser |
| Profilavatar | Helt til hoyre | Kontomeny med profilinnstillinger og utlogging |

### Innholdsomrade

Hovedinnholdsomradet opptar den gjenvarende plassen til hoyre for sidefeltet og under topplinjen. Det er her tabeller, skjemaer, detaljpaneler og analyser vises.

---

## Rollebasert tilgang

Administrasjonsportalen handhever rollebasert tilgangskontroll (RBAC). Hver administratorkonto er tildelt en av folgende roller, som bestemmer hvilke handlinger som er tilgjengelige.

### Rolledefinisjoner

| Rolle | Tilgangsniva | Beskrivelse |
|-------|-------------|-------------|
| `super_admin` | Full | Fullstendig tilgang til alle moduler, innstillinger og brukeradministrasjon. Kan tildele og tilbakekalle administratorroller. |
| `admin` | Hoy | Tilgang til alle operasjonelle moduler. Kan administrere brukere, dyr og registreringer. Kan ikke endre plattforminnstillinger eller tildele super_admin-roller. |
| `moderator` | Middels | Kan gjennomga og moderere innhold, godkjenne verifiseringer og administrere dyreoppforinger. Kan ikke opprette eller slette administratorkontoer. |
| `viewer` | Skrivebeskyttet | Kan se alle data pa tvers av moduler, men kan ikke opprette, redigere eller slette noen registreringer. Nyttig for revisjon og rapportering. |

### Tilgangsmatrise

| Handling | super_admin | admin | moderator | viewer |
|----------|:-----------:|:-----:|:---------:|:------:|
| Se dashboard | Ja | Ja | Ja | Ja |
| Administrere brukere | Ja | Ja | Nei | Nei |
| Opprette administratorkontoer | Ja | Nei | Nei | Nei |
| Utestenge/oppheve utestengelse av brukere | Ja | Ja | Ja | Nei |
| Administrere dyr | Ja | Ja | Ja | Nei |
| Godkjenne verifiseringer | Ja | Ja | Ja | Nei |
| Administrere kategorier | Ja | Ja | Nei | Nei |
| Redigere plattforminnstillinger | Ja | Nei | Nei | Nei |
| Se rapporter | Ja | Ja | Ja | Ja |

> **Merk:** Hvis et navigasjonselement ikke er synlig i sidefeltet ditt, har ikke rollen din tilgang til den modulen.

---

## Navigasjonsoversikt

Nedenfor er en komplett liste over moduler tilgjengelig i administrasjonsportalen, organisert etter funksjonsomrade.

### Kjernemoduler

1. **Dashboard** - Plattformhelseoversikt, KPI-er og analysediagrammer.
2. **Brukere** - Administrasjon av app-brukere inkludert profiler, roller og kontostatus.
3. **Dyr** - Dyreregisteret med fullstendige detaljvisninger og modereringsverktoy.
4. **Kategorier** - Kategoriseringssystem for dyrearter/typer.

### Helse og registreringer

5. **Helseregistreringer** - Helsesertifiseringsdokumenter og deres verifiseringsstatus.
6. **Vaksinasjoner** - Vaksinasjonsplaner og fullforingsregistreringer.
7. **Drektighet** - Drektighetssporing for avlsdyr.

### Plattformdrift

8. **Verifiseringer** - Ko av ventende bruker- og dyreverifiseringsforesporsler.
9. **Avl** - Administrasjon av avlsprogrammer og avstamningssporing.
10. **Innstillinger** - Plattformomfattende konfigurasjon og funksjonsflagg.

---

## Tips for forste gangs bruk

Nar du forste gang far tilgang til administrasjonsportalen, folg disse anbefalingene for a bli kjent.

### Anbefalte forste trinn

1. **Gjennomga profilen din** - Klikk pa avataren din oppe i hoyre hjorne og velg "Profil" for a bekrefte at kontodetaljene dine er korrekte.
2. **Utforsk dashboardet** - Gjor deg kjent med KPI-kortene og analysene for a forsta gjeldende plattformberegninger.
3. **Sjekk ventende verifiseringer** - Naviger til Verifiseringsmodulen for a se om det er elementer som venter pa gjennomgang.
4. **Bla gjennom aktive brukere** - Besok Brukermodulen og sorter etter "Registreringsdato" synkende for a se de nyeste registreringene.
5. **Gjennomga kategorier** - Sorg for at dyrekategoriene er konfigurert riktig for din region.

### Nettleseranbefalinger

Administrasjonsportalen fungerer best pa moderne nettlesere:

| Nettleser | Minimumsversjon |
|-----------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tips:** Aktiver nettleservarsler nar du blir bedt om det for a motta sanntidsvarsler om ventende verifiseringer og viktige systemhendelser.

### Tastatursnarveier

| Snarvei | Handling |
|---------|---------|
| `/` | Fokuser pa den globale sokfeltet |
| `Esc` | Lukk apne paneler og dialoger |

---

## Feilsoking av innloggingsproblemer

| Problem | Losning |
|---------|---------|
| "Ugyldig legitimasjon"-feil | Dobbeltsjekk e-post og passord. Bruk Glemt passord-funksjonen om nodvendig. |
| "Konto deaktivert"-melding | Kontoen din har blitt deaktivert. Kontakt en superadministrator. |
| Siden lastes, men innloggingsskjemaet er tomt | Tom nettleserens hurtigbuffer og informasjonskapsler, last deretter inn siden pa nytt. |
| Omdirigert tilbake til innlogging etter palogning | Sesjonen din kan ha utlopt. Prov a logge inn pa nytt. Hvis problemet vedvarer, sjekk at informasjonskapsler er aktivert. |

---

## Fa hjelp

Hvis du stotter pa problemer som ikke dekkes i denne veiledningen:

1. Sjekk de andre seksjonene i denne brukermanualen for modulspesifikk hjelp.
2. Kontakt organisasjonens superadministrator for rolle- og tilgangsproblemer.
3. For tekniske problemer, ta kontakt med plattformens supportteam.

---

*Neste: [Dashboard](./dashboard.md) - Lar om analyse- og KPI-oversikten.*
