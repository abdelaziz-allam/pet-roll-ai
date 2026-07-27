# Roles & Permissions

Het Petfolioo-beheerportaal gebruikt een op rollen gebaseerd toegangscontrolesysteem (RBAC) om te beheren wat elke beheerder kan zien en doen. Elke beheerder krijgt een rol toegewezen en elke rol definieert een set paginatoegang en actiepermissies.

---

## Rolenoverzicht

Het platform ondersteunt vier beheerdersrollen, elk met een progressief breder scala aan mogelijkheden:

| Rol | Beschrijving | Typisch gebruiksscenario |
|-----|--------------|--------------------------|
| **Super Admin** | Volledige onbeperkte toegang tot alle pagina's en acties | Platformeigenaar, CTO, hoofdbeheerder |
| **Admin** | Brede toegang tot operationele pagina's; geen toegang tot systeeminstellingen of beheer van admin-gebruikers | Platformmanager, operationeel verantwoordelijke |
| **Moderator** | Gerichte toegang tot contentmoderatietaken (verificatie, paring, huisdieren) | Communitymanager, contentreviewer |
| **Viewer** | Alleen-lezen toegang tot de meeste pagina's; kan niets aanmaken, bewerken of verwijderen | Supportmedewerker, stakeholder, auditor |

---

## Permissiestructuur

Permissies worden op twee niveaus gedefinieerd:

### 1. Paginatoegang

Elke rol krijgt toegang tot specifieke pagina's of wordt deze ontzegd. Als een rol geen toegang heeft tot een pagina, verschijnt deze niet in de zijbalknavigatie en wordt directe URL-toegang geblokkeerd.

### 2. Actiepermissies

Binnen een pagina waartoe een rol toegang heeft, kunnen specifieke acties worden in- of uitgeschakeld. Een Moderator kan bijvoorbeeld huisdieren **bekijken** maar niet **verwijderen**.

---

## Permissiematrix

De volgende matrix toont precies wat elke rol op elke pagina kan doen.

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

## Paginazichtbaarheid per rol

Deze tabel geeft een overzicht van welke pagina's in de zijbalknavigatie verschijnen voor elke rol:

| Pagina | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
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

## Hoe permissies de UI beinvloeden

Wanneer een gebruiker geen toestemming heeft voor een specifieke actie, past het beheerportaal de interface dienovereenkomstig aan:

| Scenario | UI-gedrag |
|----------|-----------|
| Geen paginatoegang | Pagina verwijderd uit zijbalk; URL geeft 403 terug |
| Alleen bekijken (geen edit/delete) | Actieknoppen verborgen; tabelrijen niet klikbaar voor bewerking |
| Geen aanmaakpermissie | Knop "Create" / "Add" verborgen |
| Geen verwijderpermissie | Optie Delete verwijderd uit actiemenu's |
| Geen exportpermissie | Knop Export verborgen |
| Geen approve/reject | Verificatie-actieknoppen verborgen; status wordt alleen-lezen weergegeven |

> **Opmerking:** De UI verbergt niet-beschikbare acties in plaats van uitgeschakelde knoppen te tonen. Dit houdt de interface overzichtelijk en voorkomt verwarring over wat wel en niet is toegestaan.

---

## Permissies beheren

Alleen **Super Admin**-gebruikers kunnen beheerdersaccounts aanmaken, bewerken of verwijderen en hun permissies wijzigen.

### Een rol toewijzen

1. Navigeer naar **Admin Users** in de zijbalk.
2. Klik op **Create Admin User** of bewerk een bestaande gebruiker.
3. Selecteer de gewenste rol in het rolkeuzemenu.
4. Bij het selecteren van **Super Admin** worden alle permissies automatisch verleend en kunnen deze niet worden aangepast.
5. Voor andere rollen kun je paginatoegang en acties aanpassen met de permissie-editor.

### Aangepaste permissies

Hoewel elke rol typische permissies heeft, ondersteunt het systeem aanpassingen per gebruiker:

- Een **Admin** kan indien nodig toegang tot Settings krijgen.
- Een **Moderator** kan leestoegang tot Analytics krijgen.
- Een **Viewer** kan worden beperkt tot minder pagina's dan de standaardinstelling.

Aangepaste permissies overschrijven de standaardwaarden van de rol. Het rollabel blijft hetzelfde, maar de daadwerkelijke toegang is wat telt.

### Permissie-editor

De permissie-editor toont een checklistinterface:

1. Elke pagina verschijnt als een sectie met een schakelaar voor paginatoegang.
2. Wanneer paginatoegang is ingeschakeld, verschijnen de beschikbare acties voor die pagina als selectievakjes.
3. Vink individuele acties aan of uit om de mogelijkheden van de gebruiker nauwkeurig af te stemmen.
4. Klik op **Save** om wijzigingen direct toe te passen.

> **Belangrijk:** Wijzigingen in permissies worden van kracht bij de volgende paginalading van de gebruiker. Als de gebruiker momenteel is ingelogd, ziet deze de bijgewerkte permissies na het vernieuwen van de browser.

---

## Snelle rolvergelijking

### Super Admin
- Kan alles doen
- Enige rol die admin-gebruikers en systeeminstellingen kan beheren
- Enige rol die app-gebruikers en notificaties kan verwijderen
- Enige rol die gebruikersgegevens kan exporteren
- Kan niet worden verwijderd als het het laatste Super Admin-account is

### Admin
- Volledige operationele toegang tot content- en gebruikersbeheer
- Kan verificaties goedkeuren/afwijzen
- Kan de paringsmarktplaats beheren
- Kan notificaties versturen
- Geen toegang tot pagina's Settings of Admin Users
- Kan app-gebruikers niet verwijderen (alleen bannen)

### Moderator
- Gericht op contentkwaliteit en communityveiligheid
- Kan fokkerverificaties goedkeuren/afwijzen
- Kan paringsadvertenties modereren
- Kan huisdieren bewerken (onjuiste informatie corrigeren)
- Kan problematische gebruikers bannen
- Geen toegang tot Analytics, Settings of Admin Users
- Kan geen content aanmaken of verwijderen

### Viewer
- Alleen-lezen toegang voor toezichtdoeleinden
- Kan dashboards, gebruikers, huisdieren en analytics bekijken
- Kan geen gegevens wijzigen
- Kan geen notificaties versturen of verificaties goedkeuren
- Nuttig voor stakeholders die inzicht nodig hebben zonder risico

---

## Beveiligingsoverwegingen

| Praktijk | Beschrijving |
|----------|--------------|
| Minimale rechten | Wijs de minimaal benodigde rol toe voor de verantwoordelijkheden van de gebruiker |
| Regelmatige audit | Controleer de lijst met admin-gebruikers elk kwartaal; schakel ongebruikte accounts uit |
| Afzonderlijke accounts | Elke beheerder moet een eigen account hebben (geen gedeelde logins) |
| Super Admin-limiet | Houd het aantal Super Admins op maximaal 2-3 |
| Opschorten in plaats van verwijderen | Wanneer een beheerder vertrekt, schort het account op in plaats van te verwijderen (behoudt de audittrail) |

---

## Veelgestelde vragen

**V: Kan ik een aangepaste rol aanmaken?**
A: Het systeem heeft vier vaste rollen (Super Admin, Admin, Moderator, Viewer). Je kunt echter de permissies van elke individuele gebruiker aanpassen, ongeacht het rollabel.

**V: Wat gebeurt er als ik paginatoegang verwijder voor een gebruiker die die pagina momenteel bekijkt?**
A: De gebruiker ziet een 403-fout bij de volgende navigatie of paginavernieuwing. De sessie wordt niet onderbroken.

**V: Kan een Super Admin zichzelf degraderen?**
A: Een Super Admin kan zijn eigen rol wijzigen, maar het systeem voorkomt het volledig verwijderen van het laatste Super Admin-account.

**V: Beinvloeden permissies de gebruikershandleiding?**
A: Nee. Alle admin-gebruikers hebben toegang tot de gebruikershandleiding, ongeacht hun rol of permissies. Documentatie is altijd beschikbaar.

**V: Kan ik een auditlog van permissiewijzigingen bekijken?**
A: Permissiewijzigingen worden vastgelegd met een tijdstempel en het ID van de beheerder die de wijziging heeft aangebracht. Deze worden opgeslagen in de velden `updatedBy` en `updatedAt` van elk admin-gebruikersrecord.
