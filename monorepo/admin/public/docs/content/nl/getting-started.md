# Aan de slag

Welkom bij het Petfolioo Admin Portaal. Deze handleiding begeleidt u bij uw eerste login, legt de interface-indeling uit en helpt u te begrijpen hoe rolgebaseerde toegangscontrole bepaalt wat u kunt zien en doen binnen het platform.

Het admin portaal is een webgebaseerde beheerconsole voor het Petfolioo huisdiergezondheids- en fokplatform. Vanuit hier kunnen beheerders gebruikers, huisdieren, categorieën, gezondheidsgegevens, fokprogramma's en platforminstellingen beheren.

![Login Page](/docs/screenshots/login.png)

---

## Inloggen

Het admin portaal maakt gebruik van e-mail- en wachtwoordauthenticatie. Alleen accounts met een toegewezen beheerdersrol hebben toegang tot het portaal.

### Stappen om in te loggen

1. Open uw browser en navigeer naar de URL van het admin portaal.
2. U wordt begroet met de **Inlogpagina** op de `/login` route.
3. Voer uw **E-mailadres** in het eerste veld in.
4. Voer uw **Wachtwoord** in het tweede veld in.
5. Klik op de knop **Inloggen**.
6. Als uw inloggegevens geldig zijn en uw account beheerderstoegang heeft, wordt u doorgestuurd naar het **Dashboard**.

> **Opmerking:** Als u een "Onbevoegd" foutmelding ziet na het invoeren van geldige inloggegevens, heeft uw account mogelijk geen beheerdersrol toegewezen. Neem contact op met een superbeheerder om uw rol bij te werken.

### Wachtwoord resetten

Als u uw wachtwoord bent vergeten:

1. Klik op de inlogpagina op de link **Wachtwoord vergeten?** onder het wachtwoordveld.
2. Voer het e-mailadres in dat gekoppeld is aan uw beheerdersaccount.
3. Klik op **Resetlink verzenden**.
4. Controleer uw e-mailinbox op een wachtwoord-resetbericht van Petfolioo.
5. Klik op de link in de e-mail om het wachtwoord-resetformulier te openen.
6. Voer uw nieuwe wachtwoord in en bevestig het.
7. Ga terug naar de inlogpagina en log in met uw nieuwe inloggegevens.

> **Tip:** Wachtwoord-resetlinks verlopen na 1 uur. Als uw link is verlopen, vraag dan een nieuwe aan via de inlogpagina.

---

## Het Dashboard begrijpen

Na het inloggen presenteert het admin portaal een consistente lay-out op alle pagina's.

### Zijbalknavigatie

De linkerzijbalk bevat het primaire navigatiemenu. Het bevat links naar alle belangrijke modules:

| Menu-item | Beschrijving |
|-----------|-------------|
| Dashboard | Platformoverzicht met KPI's en analyses |
| Gebruikers | Beheer app-gebruikers, rollen en accounts |
| Huisdieren | Blader door en beheer het huisdierenregister |
| Categorieën | Definieer en beheer huisdiercategorieën |
| Gezondheidsgegevens | Bekijk gezondheidscertificeringen van huisdieren |
| Fokken | Beheer fokprogramma's en afstamming |
| Vaccinaties | Volg vaccinatiegegevens |
| Dracht | Monitor drachttrackeringsvermeldingen |
| Verificaties | Bekijk openstaande verificatieverzoeken |
| Instellingen | Platformconfiguratie |

De zijbalk kan worden ingeklapt door op het schakelpictogram bovenaan te klikken om meer schermruimte te geven aan inhoudsgebieden.

### Kopbalk

De bovenste kopbalk bevat:

| Element | Locatie | Doel |
|---------|---------|------|
| Zoeken | Midden | Globaal zoeken in gebruikers, huisdieren en records |
| Meldingenbel | Rechts | Waarschuwingen voor openstaande acties en systeemgebeurtenissen |
| Profielavatar | Uiterst rechts | Accountmenu met profielinstellingen en uitloggen |

### Inhoudsgebied

Het hoofdinhoudsgebied neemt de resterende ruimte in rechts van de zijbalk en onder de kopbalk. Hier worden tabellen, formulieren, detailpanelen en analyses weergegeven.

---

## Rolgebaseerde toegang

Het admin portaal handhaaft rolgebaseerde toegangscontrole (RBAC). Elk beheerdersaccount krijgt een van de volgende rollen toegewezen, die bepaalt welke acties beschikbaar zijn.

### Roldefinities

| Rol | Toegangsniveau | Beschrijving |
|-----|---------------|-------------|
| `super_admin` | Volledig | Volledige toegang tot alle modules, instellingen en gebruikersbeheer. Kan beheerdersrollen toewijzen en intrekken. |
| `admin` | Hoog | Toegang tot alle operationele modules. Kan gebruikers, huisdieren en records beheren. Kan geen platforminstellingen wijzigen of super_admin-rollen toewijzen. |
| `moderator` | Gemiddeld | Kan inhoud beoordelen en modereren, verificaties goedkeuren en huisdierenlijsten beheren. Kan geen beheerdersaccounts aanmaken of verwijderen. |
| `viewer` | Alleen-lezen | Kan alle gegevens in alle modules bekijken maar kan geen records aanmaken, bewerken of verwijderen. Nuttig voor auditing en rapportage. |

### Toestemmingsmatrix

| Actie | super_admin | admin | moderator | viewer |
|-------|:-----------:|:-----:|:---------:|:------:|
| Dashboard bekijken | Ja | Ja | Ja | Ja |
| Gebruikers beheren | Ja | Ja | Nee | Nee |
| Beheerdersaccounts aanmaken | Ja | Nee | Nee | Nee |
| Gebruikers blokkeren/deblokkeren | Ja | Ja | Ja | Nee |
| Huisdieren beheren | Ja | Ja | Ja | Nee |
| Verificaties goedkeuren | Ja | Ja | Ja | Nee |
| Categorieën beheren | Ja | Ja | Nee | Nee |
| Platforminstellingen bewerken | Ja | Nee | Nee | Nee |
| Rapporten bekijken | Ja | Ja | Ja | Ja |

> **Opmerking:** Als een navigatie-item niet zichtbaar is in uw zijbalk, heeft uw rol geen toegang tot die module.

---

## Navigatieoverzicht

Hieronder vindt u een volledige lijst van modules die beschikbaar zijn in het admin portaal, georganiseerd per functioneel gebied.

### Kernmodules

1. **Dashboard** - Overzicht van platformgezondheid, KPI's en analysegrafieken.
2. **Gebruikers** - App-gebruikersbeheer inclusief profielen, rollen en accountstatus.
3. **Huisdieren** - Het huisdierenregister met volledige detailweergaven en moderatietools.
4. **Categorieën** - Categorie-indelingssysteem voor huisdiersoorten/types.

### Gezondheid en gegevens

5. **Gezondheidsgegevens** - Gezondheidscertificeringsdocumenten en hun verificatiestatus.
6. **Vaccinaties** - Vaccinatieschema's en voltooiingsrecords.
7. **Dracht** - Drachttracking voor fokdieren.

### Platformoperaties

8. **Verificaties** - Wachtrij van openstaande gebruikers- en huisdierverificatieverzoeken.
9. **Fokken** - Beheer van fokprogramma's en afstammingstracking.
10. **Instellingen** - Platformbrede configuratie en functievlaggen.

---

## Tips voor eerste gebruik

Wanneer u het admin portaal voor het eerst opent, volg dan deze aanbevelingen om uw weg te vinden.

### Aanbevolen eerste stappen

1. **Bekijk uw profiel** - Klik op uw avatar rechtsboven en selecteer "Profiel" om te controleren of uw accountgegevens correct zijn.
2. **Verken het dashboard** - Maak uzelf vertrouwd met de KPI-kaarten en analyses om de huidige platformstatistieken te begrijpen.
3. **Controleer openstaande verificaties** - Navigeer naar de module Verificaties om te zien of er items wachten op beoordeling.
4. **Blader door actieve gebruikers** - Bezoek de module Gebruikers en sorteer op "Aanmelddatum" aflopend om de meest recente registraties te zien.
5. **Controleer categorieën** - Zorg ervoor dat de huisdiercategorieën correct zijn geconfigureerd voor uw regio.

### Browseraanbevelingen

Het admin portaal werkt het beste op moderne browsers:

| Browser | Minimale versie |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tip:** Schakel browsermeldingen in wanneer daarom wordt gevraagd om realtime waarschuwingen te ontvangen voor openstaande verificaties en belangrijke systeemgebeurtenissen.

### Sneltoetsen

| Sneltoets | Actie |
|-----------|-------|
| `/` | Focus op de globale zoekbalk |
| `Esc` | Sluit geopende panelen en modals |

---

## Problemen met inloggen oplossen

| Probleem | Oplossing |
|----------|----------|
| "Ongeldige inloggegevens" fout | Controleer uw e-mailadres en wachtwoord nogmaals. Gebruik de Wachtwoord vergeten-stroom indien nodig. |
| "Account uitgeschakeld" melding | Uw account is gedeactiveerd. Neem contact op met een superbeheerder. |
| Pagina laadt maar inlogformulier is leeg | Wis uw browsercache en cookies, laad dan opnieuw. |
| Na inloggen teruggestuurd naar inlogpagina | Uw sessie is mogelijk verlopen. Probeer opnieuw in te loggen. Als het aanhoudt, controleer of cookies zijn ingeschakeld. |

---

## Hulp krijgen

Als u problemen tegenkomt die niet in deze handleiding worden behandeld:

1. Raadpleeg de andere secties van deze gebruikershandleiding voor module-specifieke hulp.
2. Neem contact op met de superbeheerder van uw organisatie voor rol- en toegangsproblemen.
3. Neem voor technische problemen contact op met het platform-supportteam.

---

*Volgende: [Dashboard](./dashboard.md) - Meer informatie over de analyses en het KPI-overzicht.*
