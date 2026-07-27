# Fejlfinding

Løsninger til almindelige problemer, du kan støde på, mens du bruger Petfolioo Admin-portalen.

---

## Loginproblemer

### Jeg kan ikke logge ind

**Problem:** Du indtaster dine legitimationsoplysninger, men login fejler, eller du ser en fejlmeddelelse.

**Mulige årsager:**
- Forkert e-mailadresse eller adgangskode
- Din konto er blevet deaktiveret af en Super Admin
- Godkendelsestjenesten er midlertidigt utilgængelig
- Din konto er endnu ikke oprettet i Admin-portalen

**Løsning:**
1. Dobbelttjek, at du bruger den e-mailadresse, der er tilknyttet din admin-konto (ikke din personlige eller app-bruger e-mail).
2. Sørg for, at Caps Lock er slukket, og der ikke er ekstra mellemrum i din adgangskode.
3. Prøv at nulstille din adgangskode ved hjælp af linket "Glemt adgangskode".
4. Hvis problemet fortsætter, kontakt en Super Admin for at bekræfte, at din konto eksisterer og er aktiv.
5. Hvis tjenesten ser ud til at være nede, vent et par minutter og prøv igen.

---

### Jeg har glemt min adgangskode

**Problem:** Du kan ikke huske din Admin-portal adgangskode.

**Mulige årsager:**
- Adgangskoden blev ændret og ikke gemt
- Du bruger legitimationsoplysninger fra et andet system

**Løsning:**
1. På loginsiden, klik "Glemt adgangskode."
2. Indtast den e-mailadresse, der er tilknyttet din admin-konto.
3. Tjek din indbakke (og spam-mappe) for e-mailen til nulstilling af adgangskode.
4. Klik på nulstillingslinket og opret en ny adgangskode.
5. Hvis du ikke modtager e-mailen inden for 5 minutter, kontakt en Super Admin for manuelt at nulstille din konto.

---

### Min session er udløbet

**Problem:** Du var logget ind, men blev pludselig omdirigeret til loginsiden.

**Mulige årsager:**
- Din session overskred den automatiske timeout-periode (typisk 30 minutters inaktivitet)
- En Super Admin ændrede dine kontoindstillinger eller rolle
- Serveren blev genstartet under en udrulning

**Løsning:**
1. Log ind igen med dine legitimationsoplysninger. Dit ikke-gemte arbejde kan være tabt.
2. Hvis sessioner udløber meget hyppigt, sørg for, at din browser ikke blokerer cookies for Admin-portalens domæne.
3. Gem dit arbejde regelmæssigt for at undgå datatab fra sessionstimeouts.

---

## Tilladelssesproblemer

### Jeg kan ikke se en side, som jeg burde have adgang til

**Problem:** Et navigationslink eller en side, som du forventer at have adgang til, er ikke synlig eller returnerer en blank skærm.

**Mulige årsager:**
- Din rolle inkluderer ikke tilladelse til at se den side
- Din rolle blev for nylig ændret, og ændringen er endnu ikke trådt i kraft
- Et browser-cache-problem viser en forældet version af navigationen

**Løsning:**
1. Tjek din nuværende rolle ved at se på din profil eller spørge en Super Admin. Se guiden Roller & Tilladelser for at se, hvilke sider din rolle har adgang til.
2. Hvis din rolle for nylig blev ændret, log ud og log ind igen for at opdatere dine tilladelser.
3. Ryd din browsercache eller prøv at åbne portalen i et privat/inkognitovindue.
4. Hvis du mener, at din rolle bør give adgang til siden, kontakt en Super Admin for at gennemgå dine tilladelser.

---

### Knapper mangler på en side

**Problem:** Du kan se en side, men visse handlingsknapper (Edit, Delete, Approve osv.) vises ikke.

**Mulige årsager:**
- Din rolle har skrivebeskyttet adgang til den side (f.eks. Viewer-rollen)
- Elementet er i en tilstand, hvor disse handlinger ikke er tilgængelige (f.eks. allerede godkendt)
- Et UI-gengivelsesproblem

**Løsning:**
1. Tjek dokumentationen for Roller & Tilladelser for at bekræfte, om din rolle har skriveadgang til den funktion.
2. Bekræft, at elementets aktuelle status tillader den handling, du forventer (f.eks. kan du ikke godkende en allerede godkendt verifikation).
3. Opdater siden. Hvis knapper stadig ikke vises, prøv en anden browser.
4. Hvis din rolle burde have disse knapper, kontakt en Super Admin.

---

### Jeg får en 403-fejl

**Problem:** Portalen viser en "403 Forbidden"-fejl, når du forsøger at tilgå en side eller udføre en handling.

**Mulige årsager:**
- Du forsøger en handling, som din rolle eksplicit ikke tillader
- Dit sessionstoken er blevet ugyldigt
- Din rolle blev nedgraderet, mens du var logget ind

**Løsning:**
1. Notér hvilken side eller handling der udløste fejlen.
2. Log ud og log ind igen for at opdatere din session og tilladelser.
3. Hvis fejlen fortsætter, har din rolle ikke adgang til den ressource. Kontakt en Super Admin, hvis du har brug for udvidede tilladelser.

---

## Dataproblemer

### Ændringer jeg lavede vises ikke

**Problem:** Du redigerede en post (kæledyr, bruger, blogindlæg osv.), men ændringerne afspejles ikke i portalen.

**Mulige årsager:**
- Gemmeoperationen fejlede lydløst på grund af et netværksproblem
- Din browser viser en cached version af siden
- En anden admin overskrev dine ændringer samtidigt

**Løsning:**
1. Opdater siden med Ctrl+Shift+R (eller Cmd+Shift+R på Mac) for at omgå cachen.
2. Tjek om posten viser dine ændringer. Hvis ikke, anvend redigeringen igen og hold øje med fejlmeddelelser ved lagring.
3. Sørg for, at du har en stabil internetforbindelse.
4. Hvis du arbejder på delte poster, koordiner med andre admins for at undgå modstridende redigeringer.

---

### Export virker ikke

**Problem:** At klikke på Export-knappen gør ingenting, eller den downloadede fil er tom eller beskadiget.

**Mulige årsager:**
- Din browser blokerer downloaden (popup-blokering eller downloadrestriktioner)
- Datasættet er for stort, og eksporten fik timeout
- Din rolle har ikke eksporttilladelser

**Løsning:**
1. Tjek om din browser blokerede en download eller popup. Kig efter en notifikation i adresselinjen.
2. Deaktiver eventuelle popup-blokeringer for Admin-portalens domæne.
3. Hvis datasættet er meget stort, prøv at anvende filtre for at reducere antallet af poster før eksport.
4. Prøv et andet eksportformat (f.eks. CSV i stedet for PDF), da det kan behandles hurtigere.
5. Hvis problemet fortsætter, kontakt en Super Admin for at verificere, at din rolle inkluderer eksporttilladelser.

---

### Søgning returnerer ingen resultater

**Problem:** Du søger efter en post, som du ved eksisterer, men får et tomt resultatsæt.

**Mulige årsager:**
- En stavefejl eller ekstra mellemrum i søgeforespørgslen
- Søgefeltet filtrerer på en specifik kolonne (f.eks. søger efter navn, når du indtastede et ID)
- Posten blev slettet eller er i en anden status end forventet

**Løsning:**
1. Fjern eventuelle ekstra mellemrum fra din søgeforespørgsel.
2. Prøv at søge med færre tegn eller en delvis match.
3. Tjek hvilket felt søgningen filtrerer på, og sørg for at din forespørgsel matcher den felttype.
4. Fjern eventuelle aktive filtre, der kan udelukke posten.
5. Hvis du søger efter et kæledyr via mikrochip-ID, sørg for at du indtaster det fulde numeriske ID uden bindestreger.

---

## Notifikationsproblemer

### Push-notifikation blev ikke leveret

**Problem:** Du sendte en push-notifikation, men målbrugerne rapporterer, at de ikke modtog den.

**Mulige årsager:**
- Brugeren har deaktiveret push-notifikationer på sin enhed
- Brugerens enhedstoken er udløbet (appen blev afinstalleret og geninstalleret)
- Notifikationen blev sendt til det forkerte brugersegment
- Der er forsinkelse i push-notifikationsleverancetjenesten

**Løsning:**
1. Tjek notifikationsleveringsloggen på Notifikationssiden for at se sendestatus.
2. Bekræft, at du valgte den korrekte målgruppe (specifik bruger, segment eller alle brugere).
3. Bemærk, at push-notifikationer kan tage et par minutter at levere afhængigt af enhed og netværksforhold.
4. Hvis en specifik bruger konsekvent ikke modtager notifikationer, kan deres enhedstoken være ugyldigt. De bør åbne appen og genaktivere notifikationer i deres enhedsindstillinger.
5. For broadcast-notifikationer, tillad op til 15 minutter for levering til alle brugere.

---

### Jeg kan ikke sende notifikationer

**Problem:** Knappen "Send Notification" er deaktiveret, eller du modtager en fejl, når du forsøger at sende.

**Mulige årsager:**
- Din rolle har ikke tilladelse til at sende notifikationer (Viewers og nogle Moderators)
- Påkrævede felter (titel, brødtekst, målgruppe) er ikke udfyldt
- Notifikationstjenesten er midlertidigt utilgængelig

**Løsning:**
1. Sørg for, at alle påkrævede felter er udfyldt: titel, beskedtekst og mindst ét målgruppevalg.
2. Tjek at din rolle har tilladelse til at sende notifikationer (Admin- eller Super Admin-rolle påkrævet).
3. Hvis alle felter er udfyldt og du har den korrekte rolle, prøv at opdatere siden og forsøg igen.
4. Hvis fejlen nævner et serviceproblem, vent et par minutter og prøv igen. Hvis problemet fortsætter i mere end 30 minutter, rapporter det til det tekniske team.

---

## Browserproblemer

### Siden vil ikke indlæse

**Problem:** Admin-portalen viser en blank side, en indlæsningsspinner der aldrig fuldføres, eller en forbindelsesfejl.

**Mulige årsager:**
- Internetforbindelsesproblem
- Admin-portaltjenesten er nede eller genstarter
- Browserudvidelser forstyrrer sideindlæsning
- DNS eller firewall blokerer portaldomænet

**Løsning:**
1. Tjek din internetforbindelse ved at besøge et andet websted.
2. Prøv at opdatere siden med Ctrl+Shift+R (eller Cmd+Shift+R på Mac).
3. Prøv at åbne portalen i et privat/inkognitovindue for at udelukke udvidelseskonflikter.
4. Ryd din browsercache og cookies for portaldomænet.
5. Hvis du bruger et firmanetværk, tjek om en firewall eller proxy blokerer adgangen.
6. Hvis portalen er nede for alle, kan en udrulning være i gang. Vent 5-10 minutter og prøv igen.

---

### Billeder/skærmbilleder er ødelagte

**Problem:** Billeder i portalen (kæledyrsbilleder, blogbilleder, skærmbilleder i dokumentation) vises som ødelagte ikoner eller indlæses ikke.

**Mulige årsager:**
- Billedlagringstjenesten er midlertidigt utilgængelig
- Billedet blev slettet fra lagring, men referencen forbliver
- En indholdssikkerhedspolitik blokerer billedindlæsning
- Langsom netværksforbindelse forårsager billed-indlæsningstimeouts

**Løsning:**
1. Opdater siden for at forsøge at indlæse billederne igen.
2. Tjek om problemet påvirker alle billeder eller kun specifikke. Hvis kun specifikke billeder er ødelagte, kan de være slettet fra lagring.
3. Højreklik på et ødelagt billede og vælg "Åbn billede i ny fane." Hvis det indlæses separat, kan en browserudvidelse blokere inline-billeder.
4. Deaktiver adblockere eller sikkerhedsudvidelser midlertidigt for at teste.
5. Hvis problemet påvirker alle billeder på tværs af portalen, rapporter det til det tekniske team, da lagringstjenesten kan kræve opmærksomhed.

---

### Portalen er langsom

**Problem:** Sider tager lang tid at indlæse, handlinger føles træge, eller portalen bliver uresponsiv.

**Mulige årsager:**
- Langsom internetforbindelse
- Browseren har for mange åbne faner, der forbruger hukommelse
- Store datasæt indlæses uden paginering
- Serveren er under tung belastning

**Løsning:**
1. Test din internethastighed for at udelukke et forbindelsesproblem.
2. Luk unødvendige browserfaner for at frigøre hukommelse.
3. Hvis en specifik side er langsom (f.eks. Kæledyrsregistret med tusindvis af poster), anvend filtre for at reducere datasættets størrelse.
4. Ryd din browsercache, som kan være vokset stor over tid.
5. Prøv en anden browser for at se, om problemet er browserspecifikt.
6. Hvis langsomheden er konsistent på tværs af flere admins, kan det være et server-side-problem. Rapporter det til det tekniske team med de specifikke sider, der er påvirket, og omtrentlige svartider.
