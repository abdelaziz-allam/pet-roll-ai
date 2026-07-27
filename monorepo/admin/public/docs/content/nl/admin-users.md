# Beheerders

De pagina Beheerders stelt u in staat de beheerdersaccounts te beheren die toegang hebben tot het Petfolioo admin portaal. Hier kunt u nieuwe beheerders aanmaken, rollen toewijzen, gedetailleerde rechten configureren en de accountstatus beheren.

![Admin Users](/docs/screenshots/admin-users.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Delete, Manage Permissions |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Overzicht

Toegangscontrole is essentieel voor het handhaven van beveiliging en operationele integriteit. Het Beheerderssysteem ondersteunt rolgebaseerde toegang met aanvullende per-pagina rechtendetaillering, zodat elk teamlid precies de toegang heeft die zij nodig hebben.

---

## Beheerderstabel

De hoofdweergave toont een tabel met alle beheerdersaccounts in het systeem.

### Tabelkolommen

| Kolom | Beschrijving |
|-------|-------------|
| **Naam** | De weergavenaam van de beheerder getoond in het hele portaal |
| **E-mail** | Het login-e-mailadres voor het beheerdersaccount |
| **Rol** | De toegewezen rol die het basis-rechtenniveau bepaalt |
| **Status** | Huidige accountstatus: Actief of Geschorst |
| **Acties** | Bewerken- en Verwijderen-actieknoppen |

### Tabelfuncties

1. De tabel is sorteerbaar door op kolomkoppen te klikken.
2. Een zoekvak boven de tabel maakt filteren op naam of e-mail mogelijk.
3. Pagineringsbesturingen verschijnen onderaan voor grote beheerdersteams.
4. Actieve accounts tonen een groene statusbadge; geschorste accounts tonen een rode badge.

---

## Rollen

Elk beheerdersaccount krijgt een van vier rollen toegewezen. Rollen definiëren het basistoegansniveau voordat eventuele gedetailleerde rechten-overschrijvingen worden toegepast.

### Roldefinities

| Rol | Toegangsniveau | Beschrijving |
|-----|---------------|-------------|
| **super_admin** | Volledig onbeperkt | Volledige toegang tot alle pagina's, functies en systeeminstellingen. Kan niet worden verwijderd of rechten beperkt worden. |
| **admin** | Alle inhoud en gebruikers | Volledige toegang tot inhoudsbeheer, gebruikersbeheer, feedback, meldingen en analyses. Kan geen systeemniveau-instellingen benaderen. |
| **moderator** | Beoordelen en modereren | Kan inhoud beoordelen en modereren zoals feedback, gemelde profielen en gemarkeerde vermeldingen. Kan geen bronnen aanmaken of verwijderen. |
| **viewer** | Alleen-lezen | Kan alle pagina's bekijken waartoe zij toegang hebben maar kan geen records aanmaken, bewerken of verwijderen. Ideaal voor belanghebbenden die inzicht nodig hebben. |

### Rolhiërarchie

De rolhiërarchie bepaalt welke rollen andere rollen kunnen beheren:

1. **super_admin** kan alle andere rollen beheren (admin, moderator, viewer).
2. **admin** kan moderator- en vieweraccounts beheren.
3. **moderator** kan geen beheerdersaccounts beheren.
4. **viewer** kan geen beheerdersaccounts beheren.

> **Belangrijk:** U kunt geen rol toewijzen die hoger is dan uw eigen rol. Alleen een super_admin kan een andere super_admin aanmaken.

---

## Een beheerder aanmaken

Om een nieuw beheerdersaccount aan het portaal toe te voegen:

### Stappen

1. Klik op de knop **Beheerder toevoegen** rechtsboven op de pagina Beheerders.
2. Er verschijnt een aanmaakformuliervenster met de volgende velden:

| Veld | Beschrijving | Vereisten |
|------|-------------|-----------|
| **E-mail** | Het login-e-mailadres voor de nieuwe beheerder | Verplicht. Moet een geldig, uniek e-mailadres zijn. |
| **Weergavenaam** | De naam die wordt getoond in de portaal-UI | Verplicht. 2-50 tekens. |
| **Wachtwoord** | Het initiële loginwachtwoord | Verplicht. Minimaal 8 tekens, moet hoofdletter, kleine letter en een cijfer bevatten. |
| **Rol** | De toegangsrol voor deze beheerder | Verplicht. Selecteer uit de dropdown. |

3. Vul het veld **E-mail** in met het e-mailadres van de nieuwe beheerder.
4. Voer een **Weergavenaam** in die deze beheerder identificeert in het portaal.
5. Stel een initieel **Wachtwoord** in dat voldoet aan de complexiteitsvereisten.
6. Selecteer de juiste **Rol** uit de dropdown.
7. Klik op **Aanmaken** om het beheerdersaccount toe te voegen.
8. Een succesbericht bevestigt dat het account is aangemaakt.
9. De nieuwe beheerder verschijnt in de tabel en kan nu inloggen.

> **Tip:** Informeer de nieuwe beheerder na het aanmaken van het account via een beveiligd kanaal over hun inloggegevens. Adviseer hen hun wachtwoord te wijzigen bij eerste login.

---

## Een beheerder bewerken

U kunt de weergavenaam, rol en status van een bestaande beheerder wijzigen.

### Stappen

1. Zoek de beheerder in de Beheerderstabel.
2. Klik op de knop **Bewerken** (potloodpictogram) in de kolom Acties.
3. Er verschijnt een bewerkingsformuliervenster met de huidige waarden ingevuld.

### Bewerkbare velden

| Veld | Beschrijving | Opmerkingen |
|------|-------------|------------|
| **Weergavenaam** | Werk de zichtbare naam van de beheerder bij | 2-50 tekens |
| **Rol** | Wijzig het toegangsniveau van de beheerder | Kan geen rol hoger dan de uwe toewijzen |
| **Status** | Stel in op Actief of Geschorst | Geschorste beheerders kunnen niet inloggen |

4. Wijzig de velden naar wens.
5. Klik op **Wijzigingen opslaan** om de updates toe te passen.
6. Een succesbericht bevestigt dat de wijzigingen zijn opgeslagen.

### Status wijzigen

- **Actief** -- De beheerder kan inloggen en het portaal normaal gebruiken.
- **Geschorst** -- De beheerder kan niet inloggen. Bestaande sessies worden onmiddellijk beëindigd.

> **Opmerking:** Het schorsen van een beheerder is omkeerbaar. Gebruik het wanneer u tijdelijk de toegang moet intrekken zonder het account te verwijderen.

### Beperkingen

- U kunt uw eigen rol niet bewerken (om onbedoelde zelf-degradatie te voorkomen).
- U kunt de rol van een super_admin niet wijzigen tenzij u ook een super_admin bent.
- E-mail kan niet worden gewijzigd na accountaanmaak.

---

## Gedetailleerde per-pagina rechtenconfiguratie

Naast rollen ondersteunt het admin portaal fijnmazige rechtencontrole op per-paginabasis. Dit stelt u in staat precies te configureren welke pagina's en acties elke beheerder kan benaderen.

### Rechtenconfiguratie openen

1. Klik op de knop **Bewerken** bij de beheerder die u wilt configureren.
2. Navigeer in het bewerkingsvenster naar de sectie (of het tabblad) **Rechten**.
3. Er wordt een rechtenmatrix weergegeven die alle portaalpagina's toont.

### Structuur rechtenmatrix

De rechtenmatrix toont elke portaalpagina als een rij met de volgende besturingen:

| Besturing | Beschrijving |
|-----------|-------------|
| **Toegangsschakelaar** | Een schakelaar die toegang tot de gehele pagina in- of uitschakelt |
| **Actie-multiselect** | Een dropdown waarmee u kunt selecteren welke specifieke acties zijn toegestaan op die pagina |

### Beschikbare pagina's in de matrix

| Pagina | Mogelijke acties |
|--------|-----------------|
| Dashboard | Bekijken |
| Gebruikers | Bekijken, Aanmaken, Bewerken, Verwijderen, Schorsen |
| Huisdieren | Bekijken, Aanmaken, Bewerken, Verwijderen |
| Gezondheidsgegevens | Bekijken, Aanmaken, Bewerken, Verwijderen |
| Vaccinaties | Bekijken, Aanmaken, Bewerken, Verwijderen |
| Fokken | Bekijken, Aanmaken, Bewerken, Verwijderen |
| Feedback | Bekijken, Reageren, Sluiten, Vastpinnen |
| Meldingen | Bekijken, Versturen |
| Analyses | Bekijken, Exporteren |
| Instellingen | Bekijken, Bewerken |
| Beheerders | Bekijken, Aanmaken, Bewerken, Verwijderen |

### Rechten configureren

1. Schakel voor elke paginarij de **Toegang**-schakelaar:
   - **AAN** -- De beheerder heeft toegang tot deze pagina (specifieke acties worden hieronder beheerd).
   - **UIT** -- De beheerder kan deze pagina niet zien of ernaartoe navigeren.
2. Voor pagina's met ingeschakelde toegang, klik op de **Acties**-multiselect-dropdown.
3. Selecteer de specifieke acties die deze beheerder mag uitvoeren:
   - Vink elke actie aan die u wilt verlenen.
   - Vink acties uit die u wilt beperken.
4. Herhaal voor elke pagina naar behoefte.
5. Klik op **Wijzigingen opslaan** om de rechtenconfiguratie toe te passen.

### Hoe rechten samenwerken met rollen

- Rolrechten dienen als de **basislijn**.
- Per-pagina rechten kunnen toegang **beperken** onder de rolbasislijn.
- Per-pagina rechten **kunnen geen** toegang verlenen buiten wat de rol toestaat.
- Bijvoorbeeld: Een gebruiker met de admin-rol heeft standaard toegang tot alle inhoudspagina's. U kunt hun toegang tot de Fokken-pagina beperken door het uit te schakelen, maar u kunt hen geen Instellingen-toegang verlenen (gereserveerd voor super_admin).

> **Tip:** Gebruik gedetailleerde rechten wanneer u teamleden heeft die een specifieke subset van beheerdersmogelijkheden nodig hebben. Bijvoorbeeld, een klantenservicemedewerker kan de "admin"-rol hebben maar beperkt zijn tot alleen de pagina's Feedback en Gebruikers.

---

## Een beheerder verwijderen

Het verwijderen van een beheerdersaccount wist het permanent uit het systeem.

### Stappen

1. Zoek de beheerder in de Beheerderstabel.
2. Klik op de knop **Verwijderen** (prullenbakpictogram) in de kolom Acties.
3. Er verschijnt een bevestigingsvenster met de naam en het e-mailadres van de beheerder.
4. Typ het e-mailadres van de beheerder om verwijdering te bevestigen (veiligheidsmaatregel).
5. Klik op **Verwijderen bevestigen** om het account permanent te verwijderen.
6. Een succesbericht bevestigt de verwijdering.
7. De beheerder wordt uit de tabel verwijderd en kan niet meer inloggen.

### Verwijderingsbeperkingen

| Beperking | Reden |
|-----------|-------|
| Kan een super_admin niet verwijderen | Voorkomt onbedoelde uitsluiting van het systeem |
| Kan uw eigen account niet verwijderen | Voorkomt zelfverwijdering |
| Kan niet verwijderen zonder voldoende rol | Rolhiërarchieregels zijn van toepassing |

> **Waarschuwing:** Verwijdering is permanent en kan niet ongedaan worden gemaakt. Als u tijdelijk de toegang moet verwijderen, gebruik dan de status Schorsen.

---

## Uitleg rechtenmatrix

Het rechtensysteem in Petfolioo gebruikt een gelaagde aanpak:

### Laag 1: Rolgebaseerde toegangscontrole (RBAC)

Elke rol heeft een voorgedefinieerde set rechten die als startpunt dient:

```
super_admin  -->  Alle pagina's, alle acties, geen beperkingen
admin        -->  Alle inhoud/gebruikerspagina's, alle acties (behalve Instellingen)
moderator    -->  Inhoudsbeoordelingspagina's, beperkte acties (bekijken, reageren, sluiten)
viewer       -->  Alle toegankelijke pagina's, alleen-lezen
```

### Laag 2: Per-pagina overschrijvingen

Gedetailleerde rechten voegen een tweede laag toe bovenop RBAC:

```
Rolrechten  (basislijn)
    |
    v
Per-pagina schakelaars  (kan beperken, kan niet uitbreiden buiten rol)
    |
    v
Uiteindelijke effectieve rechten  (wat de beheerder daadwerkelijk ziet)
```

### Voorbeeldscenario's

**Scenario 1: Klantenservicemedewerker**
- Rol: admin
- Overschrijving: Schakel toegang uit tot Huisdieren, Gezondheidsgegevens, Fokken, Analyses, Beheerders
- Resultaat: Heeft alleen toegang tot Dashboard, Gebruikers, Feedback en Meldingen

**Scenario 2: Inhoudsbeoordelaar**
- Rol: moderator
- Overschrijving: Schakel Feedback (Bekijken, Reageren, Sluiten), Gebruikers (alleen Bekijken) in
- Resultaat: Kan feedback beoordelen en gebruikersprofielen opzoeken maar kan gebruikers niet wijzigen

**Scenario 3: Analyse-waarnemer**
- Rol: viewer
- Overschrijving: Schakel alleen Dashboard en Analyses in
- Resultaat: Kan grafieken en metrics bekijken maar niets anders

### Effectieve rechten bekijken

1. Open het bewerkingsvenster voor een beheerder.
2. De sectie Rechten toont de huidige effectieve staat.
3. Schakelaars en actieselecties weerspiegelen wat momenteel is verleend.
4. Uitgeschakelde (grijze) acties geven aan dat deze buiten het bereik van de rol vallen.

---

## Best practices voor beveiliging

1. **Principe van minimale rechten** -- Wijs de minimale rol en rechten toe die nodig zijn voor de functie van elke beheerder.
2. **Regelmatige audits** -- Controleer beheerdersaccounts elk kwartaal. Verwijder accounts die niet meer nodig zijn.
3. **Schors voor u verwijdert** -- Schors bij offboarding eerst om te verzekeren dat er geen verstoring is, verwijder dan na een respijtperiode.
4. **Beperk super_admins** -- Houd het aantal super_admin-accounts minimaal (idealiter 1-2).
5. **Sterke wachtwoorden** -- Dwing complexe wachtwoorden af en adviseer wachtwoordmanagers.
6. **Monitor activiteit** -- Controleer wie inlogt en wanneer via de systeemlogboeken.

---

## Probleemoplossing

| Probleem | Oplossing |
|----------|----------|
| Kan geen beheerder aanmaken | Verifieer dat u voldoende rolprivileges heeft. Controleer dat het e-mailadres niet al in gebruik is. |
| Kan Bewerken/Verwijderen-knoppen niet zien | Uw rol heeft geen toestemming om beheerders op of boven het rolniveau van het doel te beheren. |
| Beheerder kan niet inloggen na aanmaak | Verifieer dat de accountstatus Actief is. Bevestig dat het wachtwoord correct is ingevoerd. |
| Rechtenwijzigingen hebben geen effect | De beheerder moet mogelijk uitloggen en opnieuw inloggen om rechtenwijzigingen toe te passen. |
| Kan een super_admin niet verwijderen | Dit is zo ontworpen. Super_admin-accounts kunnen niet via de UI worden verwijderd. |

---

## Gerelateerde pagina's

- [Instellingen](./settings.md) -- Configureer systeembeveiligingsinstellingen
- [Feedback](./feedback.md) -- Beheer gebruikersfeedback (vereist Feedback-paginatoegang)
- [Analyses](./analytics.md) -- Bekijk platformmetrics (vereist Analyses-paginatoegang)
