# Blog CMS

De Blog CMS-module stelt beheerders in staat om blogberichten te maken, bewerken, publiceren en beheren die worden weergegeven op de openbare Petfolioo-website. Gebruik deze tool om tips voor huisdierverzorging, platformnieuws, fokkeruitlichtingen en educatieve inhoud te delen met uw community.

![Blog CMS](/docs/screenshots/blog.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Blogberichtentabel

De hoofdweergave toont alle blogberichten in een doorzoekbare, sorteerbare tabel.

| Kolom | Beschrijving |
|-------|-------------|
| Titel | Berichttitel met klikbare link om te bewerken |
| Status | Publicatiestatusbadge |
| Auteur | Naam van de beheerder die het bericht heeft aangemaakt |
| Weergaven | Totaal aantal paginaweergaven sinds publicatie |
| Datum | Aanmaakdatum (of publicatiedatum indien gepubliceerd) |

### Statusbadges

| Status | Badgekleur | Beschrijving |
|--------|------------|-------------|
| Concept | Grijs | Bericht is opgeslagen maar niet zichtbaar voor het publiek |
| Gepubliceerd | Groen | Bericht is live en zichtbaar op de website |
| Uitgelicht | Goud | Bericht is gepubliceerd en vastgepind bovenaan |

### Tabelacties

- Klik op een berichttitel om het te openen voor bewerking.
- Gebruik het actiemenu (drie puntjes) op elke rij voor snelle acties: Publiceren, Depubliceren, Vastpinnen, Lospinnen, Verwijderen.
- Sorteer op elke kolom door op de kolomkop te klikken.
- Gebruik de zoekbalk om berichten te filteren op titel of inhoudstrefwoorden.

> **Tip:** Sorteer op Weergaven aflopend om uw meest populaire inhoud te identificeren. Gebruik deze inzichten om toekomstige berichten over vergelijkbare onderwerpen te plannen.

---

## Een bericht maken

Om een nieuw blogbericht te maken:

1. Klik op de knop **Bericht maken** rechtsboven in de Blogberichtentabel.
2. De berichteditor opent met de volgende velden.

### Titel

- Voer de berichttitel in het titelveld bovenaan in.
- Maximaal 200 tekens.
- De titel verschijnt als de hoofdkop op de gepubliceerde pagina.
- Kies beschrijvende, aansprekende titels die relevante trefwoorden bevatten.

### Slug

- De URL-slug wordt automatisch gegenereerd uit de titel.
- Formaat: kleine letters, koppeltekens vervangen spaties, speciale tekens verwijderd.
- Voorbeeld: "Top 10 tips voor nieuwe puppyeigenaren" wordt `top-10-tips-voor-nieuwe-puppyeigenaren`.
- U kunt de slug handmatig bewerken als de automatisch gegenereerde versie te lang of onduidelijk is.
- De slug moet uniek zijn voor alle berichten.

> **Tip:** Houd slugs kort en trefwoordrijk voor betere SEO. Verkort handmatig automatisch gegenereerde slugs die meer dan 5-6 woorden bevatten.

### HTML-inhoud

- Het hoofdinhoudgebied accepteert HTML voor rijke opmaak.
- Gebruik de werkbalk van de rich text editor voor veelvoorkomende opmaak:
  - Vet, cursief, onderstrepen
  - Koppen (H2, H3, H4)
  - Geordende en ongeordende lijsten
  - Links
  - Afbeeldingen (inline)
  - Blokcitaten
  - Codeblokken
- Schakel over naar **Bronmodus** om ruwe HTML direct te bewerken.
- Inhoud ondersteunt alle standaard HTML-tags.

#### Best practices voor inhoud

| Wel | Niet |
|-----|------|
| Gebruik H2 voor hoofdsecties, H3 voor subsecties | Gebruik H1 (gereserveerd voor de titel) |
| Voeg afbeeldingen toe om lange tekst op te breken | Plaats muren van ongeformatteerde tekst |
| Houd alinea's kort (3-4 zinnen) | Schrijf alinea's langer dan 5 zinnen |
| Gebruik lijsten voor meerdere gerelateerde items | Voeg externe scripts of iframes in |
| Voeg alt-tekst toe aan alle afbeeldingen | Gebruik inline-stijlen voor kleuren |

### Samenvatting

- Schrijf een korte samenvatting van het bericht (maximaal 500 tekens).
- De samenvatting verschijnt op bloglijstpagina's, zoekresultaten en sociale media-previews.
- Als deze leeg wordt gelaten, worden automatisch de eerste 500 tekens van de inhoud gebruikt.
- Een tekenteller toont resterende tekens terwijl u typt.

> **Tip:** Schrijf de samenvatting als een overtuigende teaser die lezers aanzet om door te klikken. Het moet op zichzelf staan als een complete gedachte, niet midden in een zin eindigen.

### Omslagafbeelding uploaden

1. Klik op het gebied **Omslagafbeelding uploaden** of sleep een afbeeldingsbestand ernaartoe.
2. Ondersteunde formaten: JPEG, PNG, WebP.
3. Aanbevolen afmetingen: 1200 x 630 pixels (geoptimaliseerd voor delen op sociale media).
4. Maximale bestandsgrootte: 5 MB.
5. Na het uploaden verschijnt een voorbeeld van de afbeelding.
6. Klik op **Verwijderen** om de huidige omslagafbeelding te wissen en een andere te uploaden.

#### Richtlijnen voor omslagafbeeldingen

- Gebruik afbeeldingen van hoge kwaliteit die relevant zijn en de berichtinhoud vertegenwoordigen.
- Vermijd tekstoverlays op omslagafbeeldingen (ze kunnen worden bijgesneden op verschillende apparaten).
- Zorg ervoor dat u de rechten heeft om de afbeelding te gebruiken (originele foto's of correct gelicentieerde stockfoto's).
- Afbeeldingen worden na het uploaden automatisch geoptimaliseerd voor webweergave.

### Tags

- Voer tags in als door komma's gescheiden waarden in het tagveld.
- Voorbeeld: `puppyverzorging, training, voeding, nieuwe eigenaren`
- Tags helpen berichten te categoriseren en verbeteren de vindbaarheid.
- Bestaande tags worden automatisch voorgesteld terwijl u typt.
- Er is geen limiet op het aantal tags, maar 3-7 tags per bericht wordt aanbevolen.

> **Tip:** Gebruik consistente tagnamen voor alle berichten. Controleer bestaande tags voordat u nieuwe variaties maakt (bijv. gebruik consequent "puppyverzorging" in plaats van afwisselend "puppy-verzorging" of "Puppyverzorging").

### SEO-instellingen

De SEO-sectie stelt u in staat te optimaliseren hoe het bericht verschijnt in zoekmachines.

#### Metatitel

- Maximaal 60 tekens.
- Verschijnt als de klikbare kop in zoekresultaten.
- Als deze leeg wordt gelaten, wordt de berichttitel gebruikt.
- De tekenteller wordt rood bij het naderen of overschrijden van 60 tekens.
- Best practice: neem het primaire trefwoord op aan het begin.

#### Metabeschrijving

- Maximaal 160 tekens.
- Verschijnt als het beschrijvingsfragment onder de titel in zoekresultaten.
- Als deze leeg wordt gelaten, wordt de samenvatting gebruikt.
- De tekenteller wordt rood bij het naderen of overschrijden van 160 tekens.
- Best practice: neem een call-to-action en primair trefwoord op.

#### SEO-voorbeeld

Onder de metavelden toont een voorbeeld hoe het bericht verschijnt in Google-zoekresultaten:

```
+--------------------------------------------------+
| Metatitel (of Berichttitel indien leeg)           |
| https://petfolioo.com/blog/uw-slug-hier          |
| Metabeschrijving (of Samenvatting indien leeg)   |
| verschijnt hier zoals in zoekresultaten...       |
+--------------------------------------------------+
```

> **Tip:** Vul altijd zowel de metatitel als de metabeschrijving handmatig in. Automatisch gegenereerde waarden uit de titel en samenvatting zijn mogelijk niet geoptimaliseerd voor de zoekintentie.

### Een concept opslaan

1. Na het invullen van de gewenste velden, klik op **Concept opslaan**.
2. Het bericht wordt opgeslagen met de status Concept.
3. U kunt op elk moment terugkeren om het te bewerken vanuit de Blogberichtentabel.
4. Concepten zijn niet zichtbaar voor het publiek.

---

## Een bericht publiceren

Om een conceptbericht te publiceren en zichtbaar te maken op de website:

1. Open het bericht vanuit de Blogberichtentabel.
2. Controleer alle inhoud, afbeeldingen en SEO-instellingen.
3. Klik op de knop **Publiceren** rechtsboven.
4. In het bevestigingsvenster:
   - Controleer de berichttitel en slug.
   - Bevestig de publicatie.
5. Klik op **Publicatie bevestigen**.

### Wat er gebeurt na publicatie

- De berichtstatus verandert naar **Gepubliceerd**.
- Het bericht wordt onmiddellijk zichtbaar op de openbare blogpagina.
- De publicatiedatum wordt vastgelegd (gebruikt voor sortering op de blog).
- De bericht-URL wordt actief: `https://petfolioo.com/blog/[slug]`.
- Zoekmachines kunnen het bericht nu indexeren.

### Publicatiechecklist

Controleer voor publicatie:

- [ ] Titel is duidelijk, aansprekend en vrij van typefouten
- [ ] Inhoud is compleet en correct opgemaakt
- [ ] Alle afbeeldingen laden correct
- [ ] Links werken en openen in de juiste tabbladen
- [ ] Omslagafbeelding is geüpload en ziet er goed uit
- [ ] Samenvatting is geschreven en onder 500 tekens
- [ ] Tags zijn toegevoegd en correct opgemaakt
- [ ] Metatitel is onder 60 tekens
- [ ] Metabeschrijving is onder 160 tekens
- [ ] Slug is schoon en trefwoordrijk

---

## Een bericht depubliceren

Om een gepubliceerd bericht van de openbare website te verwijderen:

1. Zoek het bericht in de Blogberichtentabel.
2. Klik op het actiemenu (drie puntjes) op de rij.
3. Selecteer **Depubliceren**.
4. Bevestig de actie in het dialoogvenster.

### Wat er gebeurt na depublicatie

- De berichtstatus verandert terug naar **Concept**.
- Het bericht wordt onmiddellijk verwijderd van de openbare blogpagina.
- De URL geeft een 404-pagina terug.
- Het aantal weergaven blijft behouden.
- U kunt het bericht op elk moment opnieuw publiceren.

> **Tip:** Depubliceer in plaats van verwijderen als u inhoud tijdelijk wilt verwijderen. Gedepubliceerde berichten behouden al hun gegevens en kunnen direct worden hersteld.

---

## Vastpinnen/lospinnen als uitgelicht

Uitgelichte berichten verschijnen prominent bovenaan de blogpagina, boven de chronologische vermeldingen.

### Een bericht vastpinnen

1. Zoek een gepubliceerd bericht in de Blogberichtentabel.
2. Klik op het actiemenu (drie puntjes).
3. Selecteer **Vastpinnen als uitgelicht**.
4. De statusbadge verandert naar **Uitgelicht** (goud).

### Een bericht lospinnen

1. Zoek het uitgelichte bericht in de tabel.
2. Klik op het actiemenu (drie puntjes).
3. Selecteer **Lospinnen**.
4. De status keert terug naar **Gepubliceerd** (groen).

### Regels voor uitgelichte berichten

- Alleen gepubliceerde berichten kunnen worden vastgepind.
- Meerdere berichten kunnen tegelijkertijd worden uitgelicht.
- Uitgelichte berichten worden weergegeven in de volgorde waarin ze zijn vastgepind (meest recent vastgepind eerst).
- Het lospinnen van een bericht depubliceert het niet; het blijft gepubliceerd.

> **Tip:** Beperk uitgelichte berichten tot 2-3 tegelijk. Te veel uitgelichte berichten verwateren de nadruk en duwen reguliere inhoud onder de vouw.

---

## Bekijken op site

Om te bekijken hoe een gepubliceerd bericht eruitziet op de openbare website:

1. Open het bericht vanuit de Blogberichtentabel.
2. Klik op de link **Bekijken op site** rechtsboven (naast de Publiceer-knop).
3. Er wordt een nieuw browsertabblad geopend met het bericht op de live website.

### Opmerkingen

- De link Bekijken op site is alleen beschikbaar voor Gepubliceerde en Uitgelichte berichten.
- Conceptberichten kunnen niet worden bekeken op de live site.
- De link opent de huidige live versie; niet-opgeslagen wijzigingen in de editor worden niet weergegeven.

> **Tip:** Bekijk altijd op de site na publicatie om te verifiëren dat opmaak, afbeeldingen en lay-out correct verschijnen in het openbare thema.

---

## Een bericht verwijderen

Om een blogbericht permanent te verwijderen:

1. Zoek het bericht in de Blogberichtentabel.
2. Klik op het actiemenu (drie puntjes).
3. Selecteer **Verwijderen**.
4. Er verschijnt een bevestigingsvenster:
   - Toont de berichttitel.
   - Waarschuwt dat verwijdering permanent is.
   - Vraagt u de berichttitel te typen ter bevestiging (voor gepubliceerde berichten).
5. Klik op **Verwijderen bevestigen**.

### Wat er gebeurt na verwijdering

- Het bericht wordt permanent uit het systeem verwijderd.
- De URL geeft een 404-pagina terug.
- Het bericht kan na verwijdering niet worden hersteld.
- Weergavestatistieken gaan verloren.
- De slug komt beschikbaar voor hergebruik.

### Wanneer verwijderen vs. depubliceren

| Scenario | Actie |
|----------|-------|
| Tijdelijke inhoudsverwijdering | Depubliceren |
| Verouderde inhoud die later kan worden bijgewerkt | Depubliceren |
| Testberichten of onbedoelde duplicaten | Verwijderen |
| Inhoud die nooit had mogen worden aangemaakt | Verwijderen |
| Juridisch problematische inhoud | Verwijderen |

> **Tip:** Verwijdering is onomkeerbaar. Depubliceer bij twijfel in plaats daarvan. U kunt een gedepubliceerd bericht altijd later verwijderen, maar u kunt een verwijderd bericht niet herstellen.

---

## Afbeelding uploaden voor omslagfoto's

Het omslagafbeelding-uploadcomponent ondersteunt de volgende workflow:

### Uploadmethoden

1. **Klik om te uploaden:** Klik op het uploadgebied om uw bestandsbrowser te openen.
2. **Slepen en neerzetten:** Sleep een afbeeldingsbestand van uw bureaublad direct naar het uploadgebied.

### Uploadproces

1. Selecteer of sleep uw afbeeldingsbestand.
2. De uploadvoortgangsbalk verschijnt.
3. Na voltooiing wordt het afbeeldingsvoorbeeld weergegeven in het uploadgebied.
4. De afbeeldings-URL wordt automatisch opgeslagen bij het bericht.

### Afbeeldingsvereisten

| Vereiste | Waarde |
|----------|--------|
| Formaten | JPEG, PNG, WebP |
| Minimale afmetingen | 600 x 315 pixels |
| Aanbevolen afmetingen | 1200 x 630 pixels |
| Maximale bestandsgrootte | 5 MB |
| Beeldverhouding | 1,91:1 aanbevolen (geoptimaliseerd voor sociale media) |

### Geüploade afbeeldingen beheren

- **Vervangen:** Klik op de knop **Verwijderen** onder het voorbeeld en upload vervolgens een nieuwe afbeelding.
- **Voorbeeld:** Klik op het afbeeldingsvoorbeeld om het op volledig formaat te bekijken.
- **Alt-tekst:** Voer beschrijvende alt-tekst in het veld onder de afbeelding in (belangrijk voor toegankelijkheid en SEO).

### Afbeeldingsoptimalisatie

Geüploade afbeeldingen worden automatisch:

- Gecomprimeerd voor webweergave (met behoud van kwaliteit).
- Geleverd via CDN voor snelle laadtijden.
- Geconverteerd naar WebP-formaat voor browsers die dit ondersteunen.
- Geschaald naar meerdere afmetingen voor responsieve weergave.

> **Tip:** Bereid uw omslagafbeeldingen voor op 1200 x 630 pixels voordat u uploadt. Dit is het optimale formaat voor zowel de blogweergave als het delen op sociale media (Open Graph).

---

## Veelgestelde vragen

**V: Kunnen meerdere beheerders hetzelfde bericht bewerken?**
A: Ja, maar er is geen realtime samenwerking. De laatste persoon die opslaat overschrijft eerdere wijzigingen. Coördineer met uw team om conflicten te voorkomen.

**V: Is er een revisiegeschiedenis?**
A: Nee. Elke keer opslaan overschrijft de vorige versie. Kopieer belangrijke inhoud naar een andere locatie voordat u grote wijzigingen aanbrengt.

**V: Kan ik een bericht plannen om op een toekomstige datum te publiceren?**
A: Momenteel niet. Berichten zijn ofwel concepten of worden onmiddellijk gepubliceerd. Sla op als concept en publiceer handmatig op het gewenste moment.

**V: Wat gebeurt er met SEO als ik de slug van een gepubliceerd bericht wijzig?**
A: De oude URL zal een 404 teruggeven. Zoekmachines zullen uiteindelijk de oude URL deïndexeren en de nieuwe indexeren. Vermijd het wijzigen van slugs bij gevestigde berichten.

**V: Kan ik video's insluiten in blogberichten?**
A: Ja, gebruik de HTML-bronmodus om video-iframes van YouTube of Vimeo in te sluiten in het inhoudsgebied.

**V: Is er een woord- of tekenlimiet voor berichtinhoud?**
A: Er is geen harde limiet op de inhoudslengte. Berichten tussen 800-2000 woorden presteren echter het beste voor SEO en leesbetrokkenheid.
