# Fokkerverificatie

De module Fokkerverificatie stelt beheerders in staat om verificatieverzoeken van fokkers te beoordelen, goed te keuren, af te wijzen en in te trekken. Geverifieerde fokkers ontvangen een vertrouwensbadge die zichtbaar is voor kopers, als signaal dat hun kennel voldoet aan de platformstandaarden.

![Verification](/docs/screenshots/verification.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Approve, Reject |
> | Admin | View, Approve, Reject |
> | Moderator | View, Approve, Reject |
> | Viewer | View only |

---

## Verificatieverzoekentabel

De hoofdweergave toont alle verificatie-inzendingen in een doorzoekbare, sorteerbare tabel.

| Kolom | Beschrijving |
|-------|-------------|
| Fokkersnaam | Volledige naam van de fokker die het verzoek heeft ingediend |
| Kennel | Geregistreerde kennelnaam gekoppeld aan de fokker |
| Inzending # | Automatisch oplopend inzendingsnummer (herinzendingen krijgen een nieuw nummer) |
| Aantal documenten | Aantal geüploade documenten bij de inzending |
| Status | Huidige verificatiestatusbadge |
| Vervaldatum | Vervaldatum van verificatie (alleen getoond voor goedgekeurde inzendingen) |

### De tabel filteren

1. Gebruik de **Status**-dropdown om te filteren op: In afwachting, Goedgekeurd, Afgewezen, Ingetrokken of Verlopen.
2. Gebruik het **Zoek**-veld om een fokker te vinden op naam of kennel.
3. Klik op een kolomkop om oplopend of aflopend te sorteren.

> **Tip:** De standaardweergave toont eerst inzendingen met status In afwachting, zodat u nieuwe verzoeken kunt prioriteren.

---

## Statusworkflow

Verificatieverzoeken volgen een gedefinieerde levenscyclus:

```
In afwachting --> Goedgekeurd --> Verlopen (automatisch, na vervaldatum)
   |                  |
   |                  +--> Ingetrokken (handmatige beheerdersactie)
   |
   +--> Afgewezen (fokker kan opnieuw indienen)
```

### Statusdefinities

| Status | Badgekleur | Betekenis |
|--------|------------|---------|
| In afwachting | Oranje | Wacht op beoordeling door beheerder |
| Goedgekeurd | Groen | Fokker is geverifieerd en badge is actief |
| Afgewezen | Rood | Inzending voldeed niet aan de vereisten |
| Ingetrokken | Donkerrood | Beheerder heeft geverifieerde status handmatig verwijderd |
| Verlopen | Grijs | Verificatieperiode is beëindigd; fokker moet opnieuw indienen |

### Overgangen

- **In afwachting** kan overgaan naar **Goedgekeurd** of **Afgewezen**.
- **Goedgekeurd** kan overgaan naar **Ingetrokken** (handmatig) of **Verlopen** (automatisch).
- **Afgewezen** en **Verlopen** staan de fokker toe een nieuwe inzending te doen (nieuw item met status In afwachting).
- **Ingetrokken** is een eindstatus voor die inzending.

---

## Een inzending beoordelen

Om een fokkerverificatieverzoek te beoordelen:

1. Zoek de inzending in de Verificatieverzoekentabel.
2. Klik op de rij of de **Beoordelen**-actieknop aan de rechterkant.
3. Het **Inzendingsdetailmodal** opent met twee tabbladen:
   - **Huidige inzending** -- Toont de actieve documenten en fokkergegevens.
   - **Inzendingsgeschiedenis** -- Toont alle eerdere inzendingen van deze fokker.

### Tabblad Huidige inzending

Dit tabblad toont:

- Fokkerprofielinformatie (naam, e-mail, telefoon, kennelregistratienummer)
- Geüploade documenten in een rasterindeling
- Inzendingsdatum en -tijd
- Eventuele notities die de fokker bij de inzending heeft gevoegd

### Tabblad Inzendingsgeschiedenis

Dit tabblad toont een chronologische lijst van alle inzendingen van dezelfde fokker, inclusief:

- Inzendingsnummer
- Datum van inzending
- Eindstatus
- Naam van de beoordelaar
- Afwijzingsreden (indien van toepassing)

> **Tip:** Gebruik het tabblad Inzendingsgeschiedenis om te controleren of een fokker eerdere afwijzingsredenen heeft aangepakt voordat u een herinzending goedkeurt.

---

## Documentvoorbeeld

Elk geüpload document verschijnt als een miniatuur in het documentenraster.

1. Klik op een documentminiatuur om een voorbeeld op volledig formaat te openen.
2. Gebruik de zoombesturingen om documentdetails te inspecteren.
3. Navigeer tussen documenten met de links/rechts-pijlen in de voorbeeldoverlay.
4. Druk op **Escape** of klik op de sluitknop om terug te keren naar het detailmodal.

Ondersteunde documentformaten zijn:

- JPEG- en PNG-afbeeldingen
- PDF-documenten (weergegeven als pagina-afbeeldingen)

> **Tip:** Let op helderheid, authenticiteit en volledigheid bij het beoordelen van geüploade documenten. Wazige of onvolledige documenten moeten worden afgewezen met duidelijke instructies voor herinzending.

---

## Een inzending goedkeuren

Om een fokkerverificatieverzoek goed te keuren:

1. Open het inzendingsdetailmodal door op de rij in de tabel te klikken.
2. Beoordeel alle geüploade documenten zorgvuldig.
3. Klik op de knop **Goedkeuren** onderaan het modal.
4. In het bevestigingsvenster:
   - Stel de **Vervaldatum** in voor de verificatie. De standaard is 1 jaar vanaf vandaag.
   - Pas optioneel de datum aan als een kortere of langere periode passend is.
5. Klik op **Goedkeuring bevestigen**.

### Wat er gebeurt na goedkeuring

- Het profiel van de fokker ontvangt onmiddellijk de geverifieerde badge.
- De fokker wordt genotificeerd via e-mail en in-app melding.
- De inzendingsstatus verandert naar **Goedgekeurd** in de tabel.
- De vervaldatum verschijnt in de kolom Vervaldatum.
- Wanneer de vervaldatum verstrijkt, gaat de status automatisch over naar **Verlopen**.

> **Tip:** Overweeg voor nieuwe fokkers met beperkte documentatie een kortere vervalperiode (6 maanden) in te stellen om een eerdere herverificatie te stimuleren.

---

## Een inzending afwijzen

Om een fokkerverificatieverzoek af te wijzen:

1. Open het inzendingsdetailmodal.
2. Beoordeel de documenten en identificeer het/de probleem(en).
3. Klik op de knop **Afwijzen** onderaan het modal.
4. In het afwijzingsvenster:
   - Voer een **Afwijzingsreden** in het tekstveld in. Dit veld is verplicht.
   - Wees specifiek over wat ontbreekt of ontoereikend is.
5. Klik op **Afwijzing bevestigen**.

### Wat er gebeurt na afwijzing

- De inzendingsstatus verandert naar **Afgewezen**.
- De afwijzingsreden is zichtbaar voor de fokker in hun dashboard.
- De fokker ontvangt een melding met uitleg over de afwijzing.
- De fokker kan een nieuwe inzending doen om de problemen aan te pakken.

### Goede afwijzingsredenen schrijven

| Wel | Niet |
|-----|------|
| "Kennelregistratiedocument is verlopen (2019). Upload alstublieft een actuele registratie." | "Documenten niet goed genoeg." |
| "Foto van de faciliteit is te wazig om de omstandigheden te verifiëren. Dien opnieuw in met duidelijkere afbeeldingen." | "Slechte foto's." |
| "Ontbrekende vaccinatiegegevens voor fokdieren." | "Onvolledig." |

> **Tip:** Duidelijke afwijzingsredenen verminderen het heen-en-weer en helpen fokkers bij hun volgende poging een complete aanvraag in te dienen.

---

## Verificatie intrekken

Intrekking verwijdert onmiddellijk de geverifieerde status van een fokker. Gebruik dit bij beleidsschendingen of frauduleuze documentatie die na goedkeuring is ontdekt.

1. Navigeer naar de Verificatieverzoekentabel.
2. Filter op **Status: Goedgekeurd** om actieve verificaties te vinden.
3. Klik op de rij om het inzendingsdetail te openen.
4. Klik op de knop **Intrekken** (verschijnt alleen bij Goedgekeurde inzendingen).
5. In het intrekkingsvenster:
   - Voer de **Reden voor intrekking** in. Dit is verplicht.
   - Bevestig dat u begrijpt dat de actie onmiddellijk is.
6. Klik op **Intrekking bevestigen**.

### Wat er gebeurt na intrekking

- De geverifieerde badge wordt onmiddellijk verwijderd van het profiel van de fokker.
- De fokker wordt genotificeerd via e-mail met de intrekkingsreden.
- Alle actieve vermeldingen van de fokker tonen een waarschuwingsindicator.
- De inzendingsstatus verandert naar **Ingetrokken** (eindstatus).
- De fokker kan niet opnieuw indienen tegen dezelfde inzending; zij moeten opnieuw beginnen.

> **Tip:** Intrekking is een serieuze actie. Documenteer de reden grondig voor het geval van geschillen. Overweeg contact op te nemen met de fokker voordat u intrekt als het probleem klein is.

---

## Tijdlijnweergave

De Tijdlijnweergave biedt een visuele geschiedenis van de verificatiereis van een fokker.

1. Open een inzendingsdetailmodal.
2. Schakel naar het tabblad **Inzendingsgeschiedenis**.
3. De tijdlijn toont gebeurtenissen in chronologische volgorde:
   - Inzending aangemaakt
   - Documenten geüpload
   - Beoordeling door beheerder gestart
   - Status gewijzigd (met naam beoordelaar)
   - Vervalwaarschuwingen verzonden
   - Herinzendingen gekoppeld

### De tijdlijn lezen

Elke tijdlijnvermelding toont:

- **Datum en tijd** van de gebeurtenis
- **Gebeurtenistype**-pictogram (document, statuswijziging, melding)
- **Actor** (fokkersnaam of beheerdersnaam)
- **Details** (redentekst, documentnamen, ingestelde vervaldatum)

### Toepassingen van de tijdlijn

- **Geschiloplossing:** Bekijk de volledige geschiedenis wanneer een fokker een afwijzing betwist.
- **Audittrail:** Volg welke beheerder elke inzending heeft beoordeeld en goedgekeurd/afgewezen.
- **Patroonherkenning:** Identificeer fokkers die herhaaldelijk ontoereikende documentatie indienen.

> **Tip:** De tijdlijn is alleen-lezen. Alle acties (goedkeuren, afwijzen, intrekken) moeten worden uitgevoerd vanuit het tabblad Huidige inzending.

---

## Sneltoetsen

| Sneltoets | Actie |
|-----------|-------|
| Enter | Geselecteerde inzending openen |
| Escape | Modal sluiten |
| Tab | Schakelen tussen modaltabbladen |
| Pijltoetsen | Navigeren tussen documenten in voorbeeld |

---

## Veelgestelde vragen

**V: Kan ik een inzending voorwaardelijk goedkeuren?**
A: Nee. Goedkeuringen zijn onvoorwaardelijk. Als documenten gedeeltelijk acceptabel zijn, wijs af met specifieke instructies voor wat moet worden verbeterd, en keur vervolgens de herinzending goed.

**V: Wat gebeurt er met de vermeldingen van een fokker wanneer hun verificatie verloopt?**
A: Vermeldingen blijven actief maar de geverifieerde badge wordt verwijderd. De fokker wordt 30 dagen voor het verlopen genotificeerd om herinzending aan te moedigen.

**V: Kan een ingetrokken fokker opnieuw aanvragen?**
A: Ja, maar zij moeten een geheel nieuwe inzending aanmaken. De vorige ingetrokken inzending blijft in de geschiedenis voor auditdoeleinden.

**V: Wie kan verificatieacties uitvoeren?**
A: Alleen beheerders met de rol Verificatiebeheerder kunnen inzendingen goedkeuren, afwijzen of intrekken.
