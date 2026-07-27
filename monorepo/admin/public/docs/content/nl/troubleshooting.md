# Probleemoplossing

Oplossingen voor veelvoorkomende problemen die je kunt tegenkomen bij het gebruik van het Petfolioo Admin Portaal.

---

## Inlogproblemen

### Ik kan niet inloggen

**Probleem:** Je voert je inloggegevens in maar het inloggen mislukt of je ziet een foutmelding.

**Mogelijke oorzaken:**
- Onjuist e-mailadres of wachtwoord
- Je account is gedeactiveerd door een Super Admin
- De authenticatieservice is tijdelijk niet beschikbaar
- Je account is nog niet aangemaakt in het Admin Portaal

**Oplossing:**
1. Controleer of je het e-mailadres gebruikt dat is gekoppeld aan je admin-account (niet je persoonlijke of app-gebruikers-e-mail).
2. Zorg ervoor dat Caps Lock is uitgeschakeld en dat er geen spaties aan het einde van je wachtwoord staan.
3. Probeer je wachtwoord te resetten via de link "Wachtwoord vergeten".
4. Als het probleem aanhoudt, neem contact op met een Super Admin om te bevestigen dat je account bestaat en actief is.
5. Als de service niet beschikbaar lijkt, wacht een paar minuten en probeer het opnieuw.

---

### Ik ben mijn wachtwoord vergeten

**Probleem:** Je kunt je wachtwoord voor het Admin Portaal niet herinneren.

**Mogelijke oorzaken:**
- Wachtwoord is gewijzigd en niet opgeslagen
- Je gebruikt inloggegevens van een ander systeem

**Oplossing:**
1. Klik op de inlogpagina op "Wachtwoord vergeten".
2. Voer het e-mailadres in dat is gekoppeld aan je admin-account.
3. Controleer je inbox (en spammap) op de wachtwoord-reset-e-mail.
4. Klik op de resetlink en maak een nieuw wachtwoord aan.
5. Als je de e-mail niet binnen 5 minuten ontvangt, neem contact op met een Super Admin om je account handmatig te resetten.

---

### Mijn sessie is verlopen

**Probleem:** Je was ingelogd maar werd plotseling doorgestuurd naar de inlogpagina.

**Mogelijke oorzaken:**
- Je sessie heeft de automatische time-outperiode overschreden (doorgaans 30 minuten inactiviteit)
- Een Super Admin heeft je accountinstellingen of rol gewijzigd
- De server is herstart tijdens een deployment

**Oplossing:**
1. Log opnieuw in met je inloggegevens. Je niet-opgeslagen werk kan verloren zijn gegaan.
2. Als sessies heel vaak verlopen, zorg ervoor dat je browser geen cookies blokkeert voor het Admin Portaal-domein.
3. Sla je werk regelmatig op om gegevensverlies door sessietime-outs te voorkomen.

---

## Rechtenproblemen

### Ik kan een pagina niet zien waar ik toegang tot zou moeten hebben

**Probleem:** Een navigatielink of pagina die je verwacht te kunnen openen is niet zichtbaar of geeft een leeg scherm.

**Mogelijke oorzaken:**
- Je rol omvat geen recht om die pagina te bekijken
- Je rol is recent gewijzigd en de wijziging is nog niet van kracht
- Een browsercacheprobleem toont een verouderde versie van de navigatie

**Oplossing:**
1. Controleer je huidige rol door je profiel te bekijken of een Super Admin te vragen. Raadpleeg de gids Rollen & Rechten om te zien welke pagina's je rol kan openen.
2. Als je rol recent is gewijzigd, log dan uit en weer in om je rechten te vernieuwen.
3. Wis je browsercache of probeer het portaal te openen in een prive-/incognitovenster.
4. Als je denkt dat je rol toegang zou moeten geven tot de pagina, neem contact op met een Super Admin om je rechten te beoordelen.

---

### Knoppen ontbreken op een pagina

**Probleem:** Je kunt een pagina zien maar bepaalde actieknoppen (Edit, Delete, Approve, enz.) worden niet weergegeven.

**Mogelijke oorzaken:**
- Je rol heeft alleen-lezen toegang tot die pagina (bijv. Viewer-rol)
- Het item bevindt zich in een status waarbij die acties niet beschikbaar zijn (bijv. al goedgekeurd)
- Een UI-renderingprobleem

**Oplossing:**
1. Controleer de documentatie Rollen & Rechten om te bevestigen of je rol schrijftoegang heeft tot die functie.
2. Verifieer dat de huidige status van het item de verwachte actie toestaat (bijv. je kunt een al goedgekeurde verificatie niet goedkeuren).
3. Ververs de pagina. Als knoppen nog steeds niet verschijnen, probeer een andere browser.
4. Als je rol die knoppen zou moeten hebben, neem contact op met een Super Admin.

---

### Ik krijg een 403-fout

**Probleem:** Het portaal toont een "403 Forbidden"-fout wanneer je probeert een pagina te openen of een actie uit te voeren.

**Mogelijke oorzaken:**
- Je probeert een actie uit te voeren die je rol expliciet niet toestaat
- Je sessietoken is ongeldig geworden
- Je rol is gedowngraded terwijl je was ingelogd

**Oplossing:**
1. Noteer welke pagina of actie de fout veroorzaakte.
2. Log uit en weer in om je sessie en rechten te vernieuwen.
3. Als de fout aanhoudt, heeft je rol geen toegang tot die resource. Neem contact op met een Super Admin als je verhoogde rechten nodig hebt.

---

## Gegevensproblemen

### Wijzigingen die ik heb aangebracht worden niet weergegeven

**Probleem:** Je hebt een record bewerkt (huisdier, gebruiker, blogbericht, enz.) maar de wijzigingen worden niet weerspiegeld in het portaal.

**Mogelijke oorzaken:**
- De opslagbewerking is stilzwijgend mislukt door een netwerkprobleem
- Je browser toont een gecachte versie van de pagina
- Een andere admin heeft je wijzigingen gelijktijdig overschreven

**Oplossing:**
1. Ververs de pagina met Ctrl+Shift+R (of Cmd+Shift+R op Mac) om de cache te omzeilen.
2. Controleer of het record je wijzigingen toont. Zo niet, pas de bewerking opnieuw toe en let op foutmeldingen bij het opslaan.
3. Zorg ervoor dat je een stabiele internetverbinding hebt.
4. Als je aan gedeelde records werkt, stem af met andere admins om conflicterende bewerkingen te voorkomen.

---

### Export werkt niet

**Probleem:** Klikken op de Export-knop doet niets, of het gedownloade bestand is leeg of beschadigd.

**Mogelijke oorzaken:**
- Je browser blokkeert de download (pop-upblocker of downloadbeperkingen)
- De dataset is te groot en de export is getimed-out
- Je rol heeft geen exportrechten

**Oplossing:**
1. Controleer of je browser een download of pop-up heeft geblokkeerd. Zoek naar een melding in de adresbalk.
2. Schakel pop-upblockers uit voor het Admin Portaal-domein.
3. Als de dataset erg groot is, probeer filters toe te passen om het aantal records te verminderen voor het exporteren.
4. Probeer een ander exportformaat (bijv. CSV in plaats van PDF) omdat dit sneller kan worden verwerkt.
5. Als het probleem aanhoudt, neem contact op met een Super Admin om te verifiaren dat je rol exportrechten bevat.

---

### Zoeken geeft geen resultaten

**Probleem:** Je zoekt naar een record waarvan je weet dat het bestaat maar krijgt een lege resultatenset.

**Mogelijke oorzaken:**
- Een typefout of extra spatie in de zoekopdracht
- Het zoekveld filtert op een specifieke kolom (bijv. zoeken op naam terwijl je een ID hebt ingevoerd)
- Het record is verwijderd of bevindt zich in een andere status dan verwacht

**Oplossing:**
1. Verwijder eventuele extra spaties uit je zoekopdracht.
2. Probeer te zoeken met minder tekens of een gedeeltelijke overeenkomst.
3. Controleer op welk veld de zoekopdracht filtert en zorg ervoor dat je invoer overeenkomt met dat veldtype.
4. Verwijder eventuele actieve filters die het record mogelijk uitsluiten.
5. Als je een huisdier zoekt op microchip-ID, zorg ervoor dat je het volledige numerieke ID invoert zonder streepjes.

---

## Meldingsproblemen

### Pushmelding is niet afgeleverd

**Probleem:** Je hebt een pushmelding verstuurd maar de doelgebruikers melden dat ze deze niet hebben ontvangen.

**Mogelijke oorzaken:**
- De gebruiker heeft pushmeldingen uitgeschakeld op het apparaat
- Het apparaattoken van de gebruiker is verlopen (app is verwijderd en opnieuw geinstalleerd)
- De melding is naar het verkeerde gebruikerssegment gestuurd
- Er is vertraging in de pushmeldingsafleverdienst

**Oplossing:**
1. Controleer het afleverlogboek van meldingen op de Meldingenpagina om de verzendstatus te zien.
2. Verifieer dat je de juiste doelgroep hebt geselecteerd (specifieke gebruiker, segment of alle gebruikers).
3. Houd er rekening mee dat pushmeldingen een paar minuten kunnen duren om af te leveren, afhankelijk van apparaat- en netwerkondities.
4. Als een specifieke gebruiker consequent geen meldingen ontvangt, kan het apparaattoken ongeldig zijn. Ze moeten de app openen en meldingen opnieuw inschakelen in hun apparaatinstellingen.
5. Sta voor broadcastmeldingen tot 15 minuten toe voor voltooiing van de aflevering aan alle gebruikers.

---

### Ik kan geen meldingen versturen

**Probleem:** De "Send Notification"-knop is uitgeschakeld of je ontvangt een fout bij het versturen.

**Mogelijke oorzaken:**
- Je rol heeft geen rechten om meldingen te versturen (Viewers en sommige Moderators)
- Verplichte velden (titel, tekst, doelgroep) zijn niet ingevuld
- De meldingsservice is tijdelijk niet beschikbaar

**Oplossing:**
1. Zorg ervoor dat alle verplichte velden zijn ingevuld: titel, berichttekst en ten minste een doelgroepselectie.
2. Controleer of je rol toestemming heeft om meldingen te versturen (Admin of Super Admin rol vereist).
3. Als alle velden zijn ingevuld en je de juiste rol hebt, probeer de pagina te vernieuwen en opnieuw te proberen.
4. Als de foutmelding een serviceprobleem vermeldt, wacht een paar minuten en probeer het opnieuw. Als het probleem langer dan 30 minuten aanhoudt, meld het aan het technische team.

---

## Browserproblemen

### De pagina laadt niet

**Probleem:** Het Admin Portaal toont een lege pagina, een laadspinner die nooit stopt, of een verbindingsfout.

**Mogelijke oorzaken:**
- Internetverbindingsprobleem
- De Admin Portaal-service is uitgevallen of herstart
- Browserextensies die het laden van de pagina verstoren
- DNS of firewall blokkeert het portaaldomein

**Oplossing:**
1. Controleer je internetverbinding door een andere website te bezoeken.
2. Probeer de pagina te vernieuwen met Ctrl+Shift+R (of Cmd+Shift+R op Mac).
3. Probeer het portaal te openen in een prive-/incognitovenster om extensieconflicten uit te sluiten.
4. Wis je browsercache en cookies voor het portaaldomein.
5. Als je een bedrijfsnetwerk gebruikt, controleer of een firewall of proxy de toegang blokkeert.
6. Als het portaal voor iedereen niet beschikbaar is, kan er een deployment gaande zijn. Wacht 5-10 minuten en probeer het opnieuw.

---

### Afbeeldingen/screenshots zijn kapot

**Probleem:** Afbeeldingen in het portaal (huisdierfoto's, blogafbeeldingen, screenshots in documentatie) verschijnen als kapotte pictogrammen of laden niet.

**Mogelijke oorzaken:**
- De beeldopslagservice is tijdelijk niet beschikbaar
- De afbeelding is verwijderd uit de opslag maar de verwijzing bestaat nog
- Een content security policy blokkeert het laden van afbeeldingen
- Trage netwerkverbinding veroorzaakt time-outs bij het laden van afbeeldingen

**Oplossing:**
1. Ververs de pagina om het laden van afbeeldingen opnieuw te proberen.
2. Controleer of het probleem alle afbeeldingen of alleen specifieke betreft. Als alleen specifieke afbeeldingen kapot zijn, zijn ze mogelijk verwijderd uit de opslag.
3. Klik met de rechtermuisknop op een kapotte afbeelding en selecteer "Afbeelding openen in nieuw tabblad". Als deze apart laadt, kan een browserextensie inline afbeeldingen blokkeren.
4. Schakel adblockers of beveiligingsextensies tijdelijk uit om te testen.
5. Als het probleem alle afbeeldingen in het portaal betreft, meld het aan het technische team omdat de opslagservice aandacht nodig kan hebben.

---

### Het portaal is traag

**Probleem:** Pagina's laden lang, acties voelen traag aan, of het portaal reageert niet meer.

**Mogelijke oorzaken:**
- Trage internetverbinding
- De browser heeft te veel open tabbladen die geheugen verbruiken
- Grote datasets worden geladen zonder paginering
- De server is zwaar belast

**Oplossing:**
1. Test je internetsnelheid om een verbindingsprobleem uit te sluiten.
2. Sluit onnodige browsertabbladen om geheugen vrij te maken.
3. Als een specifieke pagina traag is (bijv. Huisdierregister met duizenden records), pas filters toe om de datasetgrootte te verkleinen.
4. Wis je browsercache, die na verloop van tijd groot kan zijn geworden.
5. Probeer een andere browser om te zien of het probleem browserspecifiek is.
6. Als de traagheid consistent is bij meerdere admins, kan het een serverprobleem zijn. Meld het aan het technische team met de specifieke pagina's en geschatte reactietijden.
