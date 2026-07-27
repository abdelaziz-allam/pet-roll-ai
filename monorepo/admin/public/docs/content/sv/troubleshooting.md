# Felsokning

Losningar pa vanliga problem du kan stota pa nar du anvander Petfolioo Admin Portal.

---

## Inloggningsproblem

### Jag kan inte logga in

**Problem:** Du anger dina uppgifter men inloggningen misslyckas eller du ser ett felmeddelande.

**Mojliga orsaker:**
- Felaktig e-postadress eller losenord
- Ditt konto har inaktiverats av en Super Admin
- Autentiseringstjansten ar tillfalligt otillganglig
- Ditt konto har annu inte skapats i Admin Portal

**Losning:**
1. Dubbelkolla att du anvander den e-postadress som ar kopplad till ditt adminkonto (inte din personliga eller appanvandares e-post).
2. Sakerstall att Caps Lock ar avstanat och att det inte finns nagra avslutande mellanslag i ditt losenord.
3. Forsok aterstalla ditt losenord med lanken "Glomt losenord".
4. Om problemet kvarstar, kontakta en Super Admin for att bekrafta att ditt konto existerar och ar aktivt.
5. Om tjansten verkar vara nere, vanta nagra minuter och forsok igen.

---

### Jag har glomt mitt losenord

**Problem:** Du kan inte komma ihag ditt losenord till Admin Portal.

**Mojliga orsaker:**
- Losenordet andrades och sparades inte
- Du anvander uppgifter fran ett annat system

**Losning:**
1. Pa inloggningssidan, klicka pa "Glomt losenord".
2. Ange e-postadressen som ar kopplad till ditt adminkonto.
3. Kontrollera din inkorg (och skrappostmappen) for e-postmeddelandet om losenordsaterstallning.
4. Klicka pa aterstallningslanken och skapa ett nytt losenord.
5. Om du inte far e-postmeddelandet inom 5 minuter, kontakta en Super Admin for att manuellt aterstalla ditt konto.

---

### Min session gick ut

**Problem:** Du var inloggad men blev plotsligt omdirigerad till inloggningssidan.

**Mojliga orsaker:**
- Din session overskred den automatiska tidsgransperioden (vanligtvis 30 minuters inaktivitet)
- En Super Admin andrade dina kontoinstellningar eller roll
- Servern startades om under en driftsattning

**Losning:**
1. Logga in igen med dina uppgifter. Ditt osparade arbete kan ha gatt forlorat.
2. Om sessioner gar ut mycket ofta, sakerstall att din webblasare inte blockerar cookies for Admin Portals doman.
3. Spara ditt arbete regelbundet for att undvika dataforlust fran sessionstimeouts.

---

## Behorighetsproblem

### Jag kan inte se en sida som jag borde ha tillgang till

**Problem:** En navigationslank eller sida som du forvantar dig ha tillgang till ar inte synlig eller visar en blank skarml.

**Mojliga orsaker:**
- Din roll inkluderar inte behorighet att visa den sidan
- Din roll andrades nyligen och andringen har inte tratt i kraft an
- Ett webblasarcache-problem visar en inaktuell version av navigeringen

**Losning:**
1. Kontrollera din nuvarande roll genom att titta pa din profil eller fraga en Super Admin. Referera till guiden Roller och behorigeter for att se vilka sidor din roll kan komma at.
2. Om din roll nyligen andrades, logga ut och logga in igen for att uppdatera dina behorigeter.
3. Rensa din webblasarcache eller forsok oppna portalen i ett privat/inkognitofonstre.
4. Om du tror att din roll borde ge tillgang till sidan, kontakta en Super Admin for att granska dina behorigeter.

---

### Knappar saknas pa en sida

**Problem:** Du kan se en sida men vissa atgardsknappar (Edit, Delete, Approve, etc.) visas inte.

**Mojliga orsaker:**
- Din roll har skrivskyddad tillgang till den sidan (t.ex. Viewer-rollen)
- Objektet ar i ett tillstand dar dessa atgarder inte ar tillgangliga (t.ex. redan godkant)
- Ett UI-renderingsproblem

**Losning:**
1. Kontrollera dokumentationen for Roller och behorigeter for att bekrafta om din roll har skrivtillgang till den funktionen.
2. Verifiera att objektets nuvarande status tilater den atgard du forvantar dig (t.ex. du kan inte godkanna en redan godkand verifiering).
3. Uppdatera sidan. Om knapparna fortfarande inte visas, forsok med en annan webblasare.
4. Om din roll borde ha de knapparna, kontakta en Super Admin.

---

### Jag far ett 403-fel

**Problem:** Portalen visar ett "403 Forbidden"-fel nar du forsoker komma at en sida eller utfora en atgard.

**Mojliga orsaker:**
- Du forsoker utfora en atgard som din roll uttryckligen inte tillater
- Din sessionstoken har blivit ogiltig
- Din roll nedgraderades medan du var inloggad

**Losning:**
1. Notera vilken sida eller atgard som utloste felet.
2. Logga ut och logga in igen for att uppdatera din session och dina behorigeter.
3. Om felet kvarstar har din roll inte tillgang till den resursen. Kontakta en Super Admin om du behover utokade behorigeter.

---

## Dataproblem

### Andringar jag gjorde visas inte

**Problem:** Du redigerade en post (husdjur, anvandare, blogginlagg, etc.) men andringarna aterspeglas inte i portalen.

**Mojliga orsaker:**
- Sparandet misslyckades tyst pa grund av ett natverksproblem
- Din webblasare visar en cachad version av sidan
- En annan admin overskrev dina andringar samtidigt

**Losning:**
1. Uppdatera sidan med Ctrl+Shift+R (eller Cmd+Shift+R pa Mac) for att kringg cachen.
2. Kontrollera om posten visar dina andringar. Om inte, tillamnpa redigeringen igen och var uppmmarksam pa eventuella felmeddelanden vid sparande.
3. Sakerstall att du har en stabil internetanslutning.
4. Om ni arbetar med delade poster, koordinera med andra admins for att undvika motstridiga andringar.

---

### Export fungerar inte

**Problem:** Att klicka pa Export-knappen gor ingenting, eller den nedladdade filen ar tom eller skadad.

**Mojliga orsaker:**
- Din webblasare blockerar nedladdningen (popup-blockerare eller nedladdningsbegransningar)
- Datasettett ar for stort och exporten tog for lang tid
- Din roll har inte exportbehorigeter

**Losning:**
1. Kontrollera om din webblasare blockerade en nedladdning eller popup. Leta efter en notifikation i adressfalttet.
2. Inaktivera eventuella popup-blockerare for Admin Portals doman.
3. Om datasettett ar mycket stort, forsok tillampa filter for att minska antalet poster fore export.
4. Forsok med ett annat exportformat (t.ex. CSV istallet for PDF) da det kan bearbetas snabbare.
5. Om problemet kvarstar, kontakta en Super Admin for att verifiera att din roll inkluderar exportbehorigeter.

---

### Sokning ger inga resultat

**Problem:** Du soker efter en post som du vet existerar men far en tom resultatmangd.

**Mojliga orsaker:**
- Ett stavfel eller extra mellanslag i sokfragen
- Sokfaltet filtrerar pa en specifik kolumn (t.ex. soker pa namn nar du angav ett ID)
- Posten raderades eller ar i en annan status an forvantagt

**Losning:**
1. Ta bort eventuella extra mellanslag fran din sokfraga.
2. Forsok soka med farre tecken eller en delvis matchning.
3. Kontrollera vilket falt sokningen filtrerar pa och sakerstall att din fraga matchar den falttypen.
4. Ta bort eventuella aktiva filter som kan utesluta posten.
5. Om du soker efter ett husdjur med mikrochip-ID, sakerstall att du anger det fullstandiga numeriska ID:t utan bindestreck.

---

## Notifikationsproblem

### Push-notifikation levererades inte

**Problem:** Du skickade en push-notifikation men de berorda anvandarna rapporterar att de inte fick den.

**Mojliga orsaker:**
- Anvandaren har inaktiverat push-notifikationer pa sin enhet
- Anvandarens enhetstoken har lopat ut (appen avinstallerades och ominstallerades)
- Notifikationen skickades till fel anvandarsegment
- Det finns en fordrojning i leveranstjansten for push-notifikationer

**Losning:**
1. Kontrollera notifikationsleveransloggen pa Notifikationssidan for att se sandningsstatus.
2. Verifiera att du valde ratt malgrupp (specifik anvandare, segment eller alla anvandare).
3. Observera att push-notifikationer kan ta nagra minuter att leverera beroende pa enhet och natverksforhallanden.
4. Om en specifik anvandare konsekvent inte far notifikationer kan deras enhetstoken vara ogiltig. De bor oppna appen och ateraktivera notifikationer i sina enhetsinstellningar.
5. For plattformsovergripande notifikationer, tillt upp till 15 minuter for leverans till alla anvandare.

---

### Jag kan inte skicka notifikationer

**Problem:** "Send Notification"-knappen ar inaktiverad eller du far ett fel nar du forsoker skicka.

**Mojliga orsaker:**
- Din roll har inte behorighet att skicka notifikationer (Viewer och vissa Moderator)
- Obligatoriska falt (titel, broodtext, malgrupp) ar inte ifyllda
- Notifikationstjansten ar tillfalligt otillganglig

**Losning:**
1. Sakerstall att alla obligatoriska falt ar ifyllda: titel, meddelandetext och minst ett malgruppurval.
2. Kontrollera att din roll har behorighet att skicka notifikationer (Admin- eller Super Admin-roll kravs).
3. Om alla falt ar ifyllda och du har ratt roll, forsok uppdatera sidan och forsok igen.
4. Om felet namner ett tjanteproblem, vanta nagra minuter och forsok igen. Om problemet kvarstar i mer an 30 minuter, rapportera det till det tekniska teamet.

---

## Webblasarproblem

### Sidan laddas inte

**Problem:** Admin Portal visar en blank sida, en laddningssnurra som aldrig slutar eller ett anslutningsfel.

**Mojliga orsaker:**
- Problem med internetanslutningen
- Admin Portal-tjansten ar nere eller startar om
- Webblasartillagg som stors sidladdningen
- DNS eller brandvagg blockerar portaldomanen

**Losning:**
1. Kontrollera din internetanslutning genom att besoka en annan webbplats.
2. Forsok uppdatera sidan med Ctrl+Shift+R (eller Cmd+Shift+R pa Mac).
3. Forsok oppna portalen i ett privat/inkognitofonstre for att utesluta tillnaggkonflikter.
4. Rensa din webblasarcache och cookies for portaldomanen.
5. Om du anvander ett foretagsnatverk, kontrollera om en brandvagg eller proxy blockerar atkomsten.
6. Om portalen ar nere for alla kan en driftsattning vara pagaende. Vanta 5-10 minuter och forsok igen.

---

### Bilder/skarmdumpar ar trasiga

**Problem:** Bilder i portalen (husdjursfoton, bloggbilder, skarmdumpar i dokumentationen) visas som trasiga ikoner eller laddas inte.

**Mojliga orsaker:**
- Bildlagringstjansten ar tillfalligt otillganglig
- Bilden raderades fran lagringen men referensen kvarstar
- En Content Security Policy blockerar bildladdning
- Langsam natverksanslutning som orsakar timeout vid bildladdning

**Losning:**
1. Uppdatera sidan for att forsoka ladda bilderna igen.
2. Kontrollera om problemet paverkar alla bilder eller bara specifika. Om bara specifika bilder ar trasiga kan de ha raderats fran lagringen.
3. Hogerklicka pa en trasig bild och valj "Oppna bild i ny flik." Om den laddas separat kan ett webblasartillagg blockera inbaddade bilder.
4. Inaktivera annonsblockerare eller sakerhetstillagg tillfalligt for att testa.
5. Om problemet paverkar alla bilder i hela portalen, rapportera det till det tekniska teamet da lagringstjansten kan behova atgardas.

---

### Portalen ar langsam

**Problem:** Sidor tar lang tid att ladda, atgarder kanns troga eller portalen blir oresponsiv.

**Mojliga orsaker:**
- Langsam internetanslutning
- Webblasaren har for manga oppna flikar som forbrukar minne
- Stora dataset som laddas utan paginering
- Servern ar under hog belastning

**Losning:**
1. Testa din internethastighet for att utesluta anslutningsproblem.
2. Stang onodiga webblasarflikar for att frigora minne.
3. Om en specifik sida ar langsam (t.ex. husdjursregistret med tusentals poster), tillampa filter for att minska datasettets storlek.
4. Rensa din webblasarcache, som kan ha vuxit sig stor over tid.
5. Forsok med en annan webblasare for att se om problemet ar webblasarspecifikt.
6. Om langsamheten ar konsekvent over flera admins kan det vara ett serverrelaterat problem. Rapportera det till det tekniska teamet med de specifika sidorna som paverkas och uppskattade svarstider.
