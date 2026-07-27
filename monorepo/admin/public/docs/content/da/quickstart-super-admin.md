# Hurtig start: Super Admin

Velkommen til Petfolioo Admin-portalen. Som Super Admin har du ubegrænset adgang til alle sider, handlinger og konfigurationsmuligheder på platformen. Denne guide dækker din første dag, daglige arbejdsgange og ansvarsområder.

---

## Sider tilgængelige for dig

| Side | Tilgængelige handlinger |
|------|------------------------|
| Dashboard | View platform-KPIs og analyser |
| App-brugere | View, Create, Edit, Ban, Delete, Export |
| Kæledyr | View, Edit, Delete |
| Kæledyrskategorier | View, Create, Edit, Delete |
| Verifikation | View, Approve, Reject |
| Parring | View, Edit, Delete, Moderate |
| Sundhedscertifikater | View, Approve, Reject |
| Vaccinationsanalyser | View, Export |
| Feedback | View, Respond, Delete |
| Blog | View, Create, Edit, Delete |
| Notifikationer | View, Send, Delete |
| Analyser | View, Export |
| Admin-brugere | View, Create, Edit, Delete, Manage Permissions |
| Indstillinger | View, Edit |

Du har adgang til alt. Ingen sider er skjult fra din sidebar.

---

## Første skridt efter indledende login

1. **Bekræft din profil** - Klik på dit avatar i øverste højre hjørne og bekræft, at dine kontooplysninger er korrekte.
2. **Konfigurer platformindstillinger** - Naviger til Indstillinger og gennemgå den platformdækkende konfiguration (branding, feature flags, standardnotifikationer).
3. **Opret yderligere admin-konti** - Gå til Admin-brugere og opret konti til dine teammedlemmer med passende roller.
4. **Opsæt kæledyrskategorier** - Besøg Kæledyrskategorier og sørg for, at arts- og racetaksonomien er sat op til din region.
5. **Gennemgå Dashboard** - Gør dig bekendt med KPI-kortene, så du ved, hvad "normalt" ser ud.

---

## Daglig arbejdsgangs-tjekliste

- [ ] Tjek Dashboard for platformsundhed og anomalier
- [ ] Gennemgå ventende verifikationer i verifikationskøen
- [ ] Scan Feedback for akutte brugerklager eller fejlrapporter
- [ ] Gennemgå Admin-brugerlisten for adgangsanmodninger eller mistænkelige konti
- [ ] Tjek Analyser for tendenser i brugervækst og engagement
- [ ] Overvåg parringslister for moderationsflag
- [ ] Gennemgå notifikationer sendt af andre admins for relevans
- [ ] Gennemgå Indstillinger periodisk for uventede ændringer

---

## Vigtigste ansvarsområder

### Systemkonfiguration
Du er den eneste rolle, der kan tilgå siden Indstillinger. Dette inkluderer platformbranding, feature toggles, API-nøgler og notifikationsskabeloner. Gennemgå disse kvartalsvis eller ved lancering af nye funktioner.

### Brugeradministration
Kun du kan oprette, redigere og slette admin-konti. Når du onboarder nye teammedlemmer, skal du tildele den minimale rolle, de har brug for (foretruk Moderator eller Viewer, medmindre de reelt har brug for Admin-adgang).

### Sikkerhedsoversyn
- Hold antallet af Super Admin-konti på maksimalt 2-3.
- Gennemgå admin-brugeraktivitet kvartalsvis og suspender ubrugte konti.
- Du er den eneste rolle, der kan slette app-brugere og eksportere brugerdata, så håndter GDPR- og dataanmodninger personligt.

### Eskaleringspunkt
Andre roller vil eskalere til dig, når de har brug for handlinger uden for deres tilladelser: sletning af brugere, eksport af data, ændring af indstillinger eller administration af admin-konti.

---

## Tips til delegering af arbejde

| Opgave | Deleger til |
|--------|-------------|
| Daglige verifikationsgennemgange | Admin eller Moderator |
| Parringsmoderation | Admin eller Moderator |
| Kæledyrsdatakorrektioner | Admin eller Moderator |
| Afsendelse af platformnotifikationer | Admin |
| Analyseovervågning og rapportering | Admin eller Viewer |
| Banning af problematiske brugere | Admin eller Moderator |
| Blog-indholdsstyring | Admin |

Reserver din tid til opgaver, kun du kan udføre: ændringer af indstillinger, admin-brugeradministration, dataeksporter og sikkerhedsrevisioner. Jo mere du delegerer operationelt arbejde, jo mere kapacitet har du til strategisk overblik.

---

## Få hjælp

Som den højest privilegerede rolle er din supportvej platformens tekniske dokumentation og udviklingsteamet. For operationelle spørgsmål, konsulter de andre sider i denne brugermanual.

---

*Næste: [Roller & Tilladelser](./roles-permissions.md) - Fuld oversigt over, hvad hver rolle kan gøre.*
