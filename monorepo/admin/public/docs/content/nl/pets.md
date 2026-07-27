# Huisdierenregister

Het Huisdierenregister is de centrale module voor het bekijken en beheren van alle huisdieren die geregistreerd zijn op het Petfolioo-platform. Vanuit deze module kunnen beheerders de volledige huisdiercatalogus doorzoeken, gedetailleerde profielen bekijken, gezondheidscertificeringsstatussen controleren en moderatieacties ondernemen zoals het blokkeren van huisdieren die het platformbeleid schenden.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Huisdierenlijsttabel

De huisdierenlijsttabel toont alle geregistreerde huisdieren in een gepagineerd, sorteerbaar en filterbaar formaat.

### Tabelkolommen

| Kolom | Beschrijving | Sorteerbaar |
|-------|-------------|:----------:|
| Naam | De geregistreerde naam van het huisdier | Ja |
| Soort | Soortcategorie (bijv. Hond, Kat, Vogel) | Ja |
| Ras | Specifiek ras binnen de soort | Ja |
| Status | Huidige status (Actief, Geblokkeerd, In afwachting) | Ja |
| Geslacht | Mannelijk, Vrouwelijk of Onbekend | Ja |
| Locatie | Land en stad van het geregistreerde adres van het huisdier | Ja |

### Statusindicatoren

| Status | Badgekleur | Betekenis |
|--------|------------|---------|
| Actief | Groen | Huisdierprofiel is live en zichtbaar voor andere gebruikers |
| Geblokkeerd | Rood | Huisdierprofiel is verborgen vanwege een beleidsschending |
| In afwachting | Oranje | Huisdierprofiel wacht op beoordeling of eigenaarverificatie |

### Tabelinteracties

1. **Klik op een kolomkop** om de tabel op die kolom te sorteren. Een pijl geeft de sorteerrichting aan.
2. **Klik op een rij** om het huisdierdetailpaneel aan de rechterkant van het scherm te openen.
3. **Pagineringsbesturingen** onderaan stellen u in staat om tussen pagina's te navigeren en de paginagrootte te wijzigen (10, 20, 50 vermeldingen per pagina).

> **Tip:** Houd `Shift` ingedrukt en klik op een tweede kolomkop om een secundaire sortering toe te passen.

---

## Filters

De filterbalk boven de huisdierenlijsttabel biedt meerdere manieren om de weergegeven resultaten te verfijnen.

### Beschikbare filters

| Filter | Type | Beschrijving |
|--------|------|-------------|
| Soort | Dropdown selectie | Filteren op huisdiersoort (Hond, Kat, Vogel, Konijn, Reptiel, enz.) |
| Status | Dropdown selectie | Filteren op huisdierstatus (Actief, Geblokkeerd, In afwachting) |
| Geslacht | Dropdown selectie | Filteren op geslacht (Mannelijk, Vrouwelijk, Onbekend) |
| Land | Dropdown selectie | Filteren op het geregistreerde land van het huisdier |
| Stad | Dropdown selectie | Filteren op stad (opties worden bijgewerkt op basis van landselectie) |
| Zoeken | Tekstinvoer | Vrije tekstzoekopdracht op huisdiernaam, ras en microchipnummer |

### Filters toepassen

1. Zoek de **filterbalk** boven de tabel.
2. Klik op een **dropdownfilter** om beschikbare opties te zien.
3. Selecteer een of meer waarden uit de dropdowns.
4. Typ in het **Zoek**-veld om een vrije tekstzoekopdracht uit te voeren.
5. Resultaten worden automatisch bijgewerkt wanneer filters worden toegepast.
6. Actieve filters worden als tags onder de filterbalk weergegeven.
7. Klik op de **X** op een filtertag om deze te verwijderen.
8. Klik op **Alles wissen** om alle filters in een keer te resetten.

### Filtercombinaties

Filters worden gecombineerd met EN-logica. Bijvoorbeeld:

| Geselecteerde filters | Resultaat |
|----------------------|-----------|
| Soort: Hond | Alle honden ongeacht status, geslacht of locatie |
| Soort: Hond + Geslacht: Vrouwelijk | Alle vrouwelijke honden |
| Soort: Hond + Land: VAE + Status: Actief | Alle actieve honden in de VAE |
| Zoeken: "Rex" | Alle huisdieren waarvan de naam, het ras of de microchip "Rex" bevat |

> **Opmerking:** De stad-dropdown is afhankelijk van de landselectie. Selecteer eerst een land om beschikbare steden te zien.

---

## Huisdierdetailpaneel

Door op een huisdierrij te klikken, wordt een detailpaneel geopend dat van rechts het scherm inschuift. Dit paneel bevat het volledige huisdierprofiel georganiseerd in secties.

### Fotoraster

Bovenaan het detailpaneel toont een fotoraster de geüploade afbeeldingen van het huisdier.

| Element | Beschrijving |
|---------|-------------|
| Primaire foto | Groter weergegeven, gemarkeerd met een sterpictogram |
| Extra foto's | Weergegeven in een rasterindeling (tot 6 miniaturen) |
| Klikactie | Door op een foto te klikken wordt deze geopend in een volledig scherm lightbox |
| Geen foto's | Een plaatshoudersilhouet wordt getoond |

### Huisdierinformatiesectie

Onder de foto's worden de kerngegevens van het huisdier weergegeven in een gestructureerde indeling.

| Veld | Beschrijving | Voorbeeld |
|------|-------------|---------|
| Naam | Geregistreerde huisdiernaam | "Bella" |
| Soort | Soortcategorie | "Hond" |
| Ras | Specifiek ras | "Golden Retriever" |
| Kleur | Vacht-/lichaamskleur | "Goud" |
| Gewicht | Gewicht met eenheid | "28,5 kg" |
| Geboortedatum | Verjaardag van het huisdier | "2021-03-15" |
| Leeftijd | Berekend vanaf geboortedatum | "2 jaar, 4 maanden" |
| Geslacht | Mannelijk of Vrouwelijk | "Vrouwelijk" |
| Microchipnummer | Uniek microchip-ID indien geïmplanteerd | "900118000123456" |
| Gecastreerd/Gesteriliseerd | Castratie- of sterilisatiestatus | "Ja" / "Nee" / "Onbekend" |
| Registratiedatum | Wanneer het huisdier aan het platform is toegevoegd | "2023-07-20" |

### Gezondheidscertificeringsstatus

De gezondheidscertificeringssectie toont of het huisdier geldige gezondheidsdocumentatie in het dossier heeft.

| Element | Beschrijving |
|---------|-------------|
| Certificeringsbadge | Groen vinkje (geldig), Gele waarschuwing (bijna verlopen), Rood kruis (verlopen/ontbrekend) |
| Certificaattype | Naam van het gezondheidscertificaat |
| Uitgiftedatum | Wanneer het certificaat is uitgegeven |
| Vervaldatum | Wanneer het certificaat verloopt |
| Geldigheidsvoortgangsbalk | Visuele indicator van resterende geldigheidsperiode |

**De geldigheidsvoortgangsbalk lezen:**

1. Een **volle groene balk** geeft aan dat het certificaat recent is uitgegeven en het meeste van zijn geldigheid nog resteert.
2. Een **gedeeltelijk gele balk** (minder dan 30% resterend) geeft aan dat het certificaat bijna verloopt.
3. Een **rode lege balk** geeft aan dat het certificaat is verlopen.
4. Het resterende percentage wordt als tekst naast de balk weergegeven.

> **Tip:** Certificaten die binnen 30 dagen verlopen worden automatisch gemarkeerd in de module Openstaande verificaties zodat de eigenaar kan worden genotificeerd.

### Eigenaarinformatie

De eigenaarssectie toont details over de geregistreerde eigenaar van het huisdier.

| Veld | Beschrijving |
|------|-------------|
| Eigenaarsnaam | Weergavenaam van de eigenaar van het huisdier |
| E-mail | E-mailadres van de eigenaar |
| Telefoon | Telefoonnummer indien opgegeven |
| Geverifieerde fokker | Of de eigenaar de status van geverifieerde fokker heeft |
| Totaal huisdieren | Hoeveel huisdieren deze eigenaar heeft geregistreerd |
| Lid sinds | Registratiedatum van de eigenaar |

Door op de naam van de eigenaar te klikken navigeert u naar hun volledige profiel in de module Gebruikers.

### Locatiesectie

De locatiesectie toont waar het huisdier is geregistreerd.

| Veld | Beschrijving |
|------|-------------|
| Land | Landnaam met vlagpictogram |
| Stad | Stadsnaam |
| Adres | Straatadres indien opgegeven (kan gedeeltelijk verborgen zijn voor privacy) |

---

## Huisdier blokkeren/deblokkeren

Beheerders en moderatoren kunnen een huisdier blokkeren waarvan het profiel het platformbeleid schendt. Blokkeren verbergt het huisdier uit het openbare zicht en informeert de eigenaar.

### Een huisdier blokkeren

1. Open het detailpaneel van het huisdier door op de rij in de lijsttabel te klikken.
2. Scroll naar de onderkant van het paneel of zoek de sectie **Acties**.
3. Klik op de knop **Huisdier blokkeren** (weergegeven in rood).
4. Er verschijnt een bevestigingsmodal.
5. Voer in het tekstveld **Reden** een duidelijke uitleg in waarom dit huisdier wordt geblokkeerd.
6. Selecteer een **schendingscategorie** uit de dropdown (bijv. Frauduleuze vermelding, Ongepaste inhoud, Dubbel profiel, Beleidsschending).
7. Klik op **Blokkering bevestigen**.
8. De status van het huisdier verandert naar "Geblokkeerd" en de eigenaar ontvangt een melding met de opgegeven reden.

### Vereisten voor blokkeringsreden

| Vereiste | Beschrijving |
|----------|-------------|
| Minimale lengte | Minimaal 20 tekens |
| Taal | Moet professioneel en duidelijk zijn |
| Specificiteit | Moet verwijzen naar de specifieke schending |
| Zichtbaarheid | De reden wordt direct aan de eigenaar van het huisdier getoond |

> **Belangrijk:** De blokkeringsreden die u opgeeft wordt weergegeven aan de eigenaar van het huisdier in hun app-melding en e-mail. Zorg ervoor dat deze professioneel, specifiek is en geen intern jargon bevat.

### Een huisdier deblokkeren

1. Gebruik het **Status**-filter om "Geblokkeerd" te selecteren om geblokkeerde huisdieren te vinden.
2. Klik op de rij van het geblokkeerde huisdier om het detailpaneel te openen.
3. Zoek de knop **Huisdier deblokkeren** (weergegeven in groen) in de sectie Acties.
4. Er verschijnt een bevestigingsmodal met de oorspronkelijke blokkeringsreden en datum.
5. Voeg optioneel een notitie toe die uitlegt waarom de blokkering wordt opgeheven.
6. Klik op **Deblokkering bevestigen**.
7. De status van het huisdier keert terug naar "Actief" en de eigenaar wordt genotificeerd.

### Blokkeringsgeschiedenis

Het detailpaneel van elk huisdier bevat een sectie **Blokkeringsgeschiedenis** als het huisdier ooit geblokkeerd is geweest:

| Kolom | Beschrijving |
|-------|-------------|
| Datum | Wanneer de blokkering is toegepast |
| Beheerder | Welke beheerder de actie heeft uitgevoerd |
| Reden | De opgegeven blokkeringsreden |
| Duur | Hoe lang de blokkering heeft geduurd |
| Oplossing | Hoe het is opgelost (gedeblokkeerd, in beroep gegaan, enz.) |

---

## Bulkbewerkingen

Voor grootschalige moderatietaken ondersteunt de huisdierenlijsttabel bulkselectie.

### Bulkselectie gebruiken

1. Vink het **selectievakje** aan de linkerkant van elke rij die u wilt selecteren aan.
2. Of klik op het **kop-selectievakje** om alle zichtbare rijen op de huidige pagina te selecteren.
3. Er verschijnt een **bulkactiebalk** bovenaan de tabel met het aantal geselecteerde items.
4. Beschikbare bulkacties zijn:
   - **Exporteren** - Download geselecteerde huisdieren als een CSV-bestand
   - **Status wijzigen** - Pas een statuswijziging toe op alle geselecteerde huisdieren

> **Opmerking:** Bulkblokkering is niet beschikbaar via deze interface. Blokkeringen moeten individueel worden toegepast om ervoor te zorgen dat elke blokkering een specifieke reden bevat.

---

## Huisdiergegevens exporteren

Om huisdierregistergegevens te exporteren:

1. Pas eventuele gewenste filters toe om de dataset te verfijnen.
2. Klik op de knop **Exporteren** rechtsboven in de tabel.
3. Selecteer het exportformaat (CSV of Excel).
4. Kies of u **gefilterde resultaten** of **alle records** wilt exporteren.
5. Het bestand wordt gedownload naar de standaard downloadlocatie van uw browser.

### Geëxporteerde velden

| Veld | Opgenomen |
|------|:---------:|
| Huisdiernaam | Ja |
| Soort | Ja |
| Ras | Ja |
| Geslacht | Ja |
| Status | Ja |
| Land | Ja |
| Stad | Ja |
| E-mail eigenaar | Ja |
| Registratiedatum | Ja |
| Microchipnummer | Ja |
| Gezondheidscertificaatstatus | Ja |

> **Opmerking:** Foto's en gedetailleerde gezondheidsgegevens zijn niet opgenomen in exports. Alleen samenvattingsgegevens worden geëxporteerd.

---

*Vorige: [Dashboard](./dashboard.md) | Volgende: [App-gebruikers](./users.md)*
