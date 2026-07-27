# Fehlerbehebung

Loesungen fuer haeufige Probleme, die bei der Nutzung des Petfolioo Admin-Portals auftreten koennen.

---

## Anmeldeprobleme

### Ich kann mich nicht anmelden

**Problem:** Sie geben Ihre Anmeldedaten ein, aber die Anmeldung schlaegt fehl oder Sie sehen eine Fehlermeldung.

**Moegliche Ursachen:**
- Falsche E-Mail-Adresse oder falsches Passwort
- Ihr Konto wurde von einem Super Admin deaktiviert
- Der Authentifizierungsdienst ist voruebergehend nicht verfuegbar
- Ihr Konto wurde noch nicht im Admin-Portal erstellt

**Loesung:**
1. Ueberpruefen Sie, dass Sie die E-Mail-Adresse verwenden, die mit Ihrem Admin-Konto verknuepft ist (nicht Ihre persoenliche oder App-Benutzer-E-Mail).
2. Stellen Sie sicher, dass die Feststelltaste deaktiviert ist und keine nachgestellten Leerzeichen in Ihrem Passwort vorhanden sind.
3. Versuchen Sie, Ihr Passwort ueber den Link "Passwort vergessen" zurueckzusetzen.
4. Wenn das Problem weiterhin besteht, kontaktieren Sie einen Super Admin, um zu bestaetigen, dass Ihr Konto existiert und aktiv ist.
5. Wenn der Dienst nicht erreichbar zu sein scheint, warten Sie einige Minuten und versuchen Sie es erneut.

---

### Ich habe mein Passwort vergessen

**Problem:** Sie koennen sich nicht an Ihr Admin-Portal-Passwort erinnern.

**Moegliche Ursachen:**
- Passwort wurde geaendert und nicht gespeichert
- Verwendung von Anmeldedaten eines anderen Systems

**Loesung:**
1. Klicken Sie auf der Anmeldeseite auf "Passwort vergessen".
2. Geben Sie die E-Mail-Adresse ein, die mit Ihrem Admin-Konto verknuepft ist.
3. Pruefen Sie Ihren Posteingang (und Spam-Ordner) auf die E-Mail zum Zuruecksetzen des Passworts.
4. Klicken Sie auf den Zuruecksetzungslink und erstellen Sie ein neues Passwort.
5. Wenn Sie die E-Mail nicht innerhalb von 5 Minuten erhalten, kontaktieren Sie einen Super Admin, um Ihr Konto manuell zurueckzusetzen.

---

### Meine Sitzung ist abgelaufen

**Problem:** Sie waren angemeldet, wurden aber ploetzlich zur Anmeldeseite weitergeleitet.

**Moegliche Ursachen:**
- Ihre Sitzung hat den automatischen Timeout-Zeitraum ueberschritten (typischerweise 30 Minuten Inaktivitaet)
- Ein Super Admin hat Ihre Kontoeinstellungen oder Rolle geaendert
- Der Server wurde waehrend eines Deployments neu gestartet

**Loesung:**
1. Melden Sie sich erneut mit Ihren Anmeldedaten an. Ihre nicht gespeicherte Arbeit kann verloren gehen.
2. Wenn Sitzungen sehr haeufig ablaufen, stellen Sie sicher, dass Ihr Browser Cookies fuer die Admin-Portal-Domain nicht blockiert.
3. Speichern Sie Ihre Arbeit regelmaessig, um Datenverlust durch Sitzungs-Timeouts zu vermeiden.

---

## Berechtigungsprobleme

### Ich kann eine Seite nicht sehen, auf die ich Zugriff haben sollte

**Problem:** Ein Navigationslink oder eine Seite, auf die Sie Zugriff erwarten, ist nicht sichtbar oder zeigt einen leeren Bildschirm.

**Moegliche Ursachen:**
- Ihre Rolle beinhaltet nicht die Berechtigung, diese Seite anzuzeigen
- Ihre Rolle wurde kuerzlich geaendert und die Aenderung ist noch nicht wirksam geworden
- Ein Browser-Cache-Problem liefert eine veraltete Version der Navigation

**Loesung:**
1. Ueberpruefen Sie Ihre aktuelle Rolle in Ihrem Profil oder fragen Sie einen Super Admin. Konsultieren Sie den Rollen-&-Berechtigungen-Leitfaden, um zu sehen, welche Seiten Ihre Rolle aufrufen kann.
2. Wenn Ihre Rolle kuerzlich geaendert wurde, melden Sie sich ab und wieder an, um Ihre Berechtigungen zu aktualisieren.
3. Leeren Sie Ihren Browser-Cache oder versuchen Sie, das Portal in einem privaten/Inkognito-Fenster zu oeffnen.
4. Wenn Sie der Meinung sind, dass Ihre Rolle Zugriff auf die Seite gewaehren sollte, kontaktieren Sie einen Super Admin zur Ueberpruefung Ihrer Berechtigungen.

---

### Buttons fehlen auf einer Seite

**Problem:** Sie koennen eine Seite sehen, aber bestimmte Aktionsbuttons (Edit, Delete, Approve usw.) werden nicht angezeigt.

**Moegliche Ursachen:**
- Ihre Rolle hat nur Lesezugriff auf diese Seite (z.B. Viewer-Rolle)
- Das Element befindet sich in einem Zustand, in dem diese Aktionen nicht verfuegbar sind (z.B. bereits genehmigt)
- Ein UI-Rendering-Problem

**Loesung:**
1. Pruefen Sie die Rollen-&-Berechtigungen-Dokumentation, um zu bestaetigen, ob Ihre Rolle Schreibzugriff auf diese Funktion hat.
2. Ueberpruefen Sie, ob der aktuelle Status des Elements die erwartete Aktion zulaesst (z.B. koennen Sie eine bereits genehmigte Verifizierung nicht erneut genehmigen).
3. Aktualisieren Sie die Seite. Wenn Buttons immer noch nicht erscheinen, versuchen Sie einen anderen Browser.
4. Wenn Ihre Rolle diese Buttons haben sollte, kontaktieren Sie einen Super Admin.

---

### Ich erhalte einen 403-Fehler

**Problem:** Das Portal zeigt einen "403 Forbidden"-Fehler an, wenn Sie versuchen, auf eine Seite zuzugreifen oder eine Aktion durchzufuehren.

**Moegliche Ursachen:**
- Sie versuchen eine Aktion, die Ihre Rolle ausdruecklich nicht erlaubt
- Ihr Sitzungstoken ist ungueltig geworden
- Ihre Rolle wurde herabgestuft, waehrend Sie angemeldet waren

**Loesung:**
1. Notieren Sie, welche Seite oder Aktion den Fehler ausgeloest hat.
2. Melden Sie sich ab und wieder an, um Ihre Sitzung und Berechtigungen zu aktualisieren.
3. Wenn der Fehler weiterhin besteht, hat Ihre Rolle keinen Zugriff auf diese Ressource. Kontaktieren Sie einen Super Admin, wenn Sie erhoehte Berechtigungen benoetigen.

---

## Datenprobleme

### Meine Aenderungen werden nicht angezeigt

**Problem:** Sie haben einen Datensatz bearbeitet (Haustier, Benutzer, Blogbeitrag usw.), aber die Aenderungen werden im Portal nicht widergespiegelt.

**Moegliche Ursachen:**
- Der Speichervorgang ist aufgrund eines Netzwerkproblems stillschweigend fehlgeschlagen
- Ihr Browser zeigt eine zwischengespeicherte Version der Seite an
- Ein anderer Admin hat Ihre Aenderungen gleichzeitig ueberschrieben

**Loesung:**
1. Aktualisieren Sie die Seite mit Strg+Umschalt+R (oder Cmd+Umschalt+R auf Mac), um den Cache zu umgehen.
2. Pruefen Sie, ob der Datensatz Ihre Aenderungen zeigt. Falls nicht, wenden Sie die Bearbeitung erneut an und achten Sie auf Fehlermeldungen beim Speichern.
3. Stellen Sie eine stabile Internetverbindung sicher.
4. Wenn Sie an gemeinsam genutzten Datensaetzen arbeiten, koordinieren Sie sich mit anderen Admins, um widerspruechliche Bearbeitungen zu vermeiden.

---

### Export funktioniert nicht

**Problem:** Das Klicken auf den Export-Button bewirkt nichts, oder die heruntergeladene Datei ist leer oder beschaedigt.

**Moegliche Ursachen:**
- Ihr Browser blockiert den Download (Pop-up-Blocker oder Download-Einschraenkungen)
- Der Datensatz ist zu gross und der Export hat ein Timeout verursacht
- Ihre Rolle hat keine Export-Berechtigungen

**Loesung:**
1. Pruefen Sie, ob Ihr Browser einen Download oder ein Pop-up blockiert hat. Suchen Sie nach einer Benachrichtigung in der Adressleiste.
2. Deaktivieren Sie Pop-up-Blocker fuer die Admin-Portal-Domain.
3. Wenn der Datensatz sehr gross ist, versuchen Sie, Filter anzuwenden, um die Anzahl der Datensaetze vor dem Export zu reduzieren.
4. Versuchen Sie ein anderes Exportformat (z.B. CSV statt PDF), da es moeglicherweise schneller verarbeitet wird.
5. Wenn das Problem weiterhin besteht, kontaktieren Sie einen Super Admin, um zu ueberpruefen, ob Ihre Rolle Export-Berechtigungen beinhaltet.

---

### Suche liefert keine Ergebnisse

**Problem:** Sie suchen nach einem Datensatz, von dem Sie wissen, dass er existiert, erhalten aber ein leeres Ergebnis.

**Moegliche Ursachen:**
- Ein Tippfehler oder zusaetzliches Leerzeichen in der Suchanfrage
- Das Suchfeld filtert nach einer bestimmten Spalte (z.B. Suche nach Name, wenn Sie eine ID eingegeben haben)
- Der Datensatz wurde geloescht oder befindet sich in einem anderen Status als erwartet

**Loesung:**
1. Entfernen Sie zusaetzliche Leerzeichen aus Ihrer Suchanfrage.
2. Versuchen Sie, mit weniger Zeichen oder einer Teiluebereinstimmung zu suchen.
3. Pruefen Sie, nach welchem Feld die Suche filtert, und stellen Sie sicher, dass Ihre Anfrage zu diesem Feldtyp passt.
4. Entfernen Sie aktive Filter, die den Datensatz moeglicherweise ausschliessen.
5. Wenn Sie nach einem Haustier anhand der Mikrochip-ID suchen, stellen Sie sicher, dass Sie die vollstaendige numerische ID ohne Bindestriche eingeben.

---

## Benachrichtigungsprobleme

### Push-Benachrichtigung wurde nicht zugestellt

**Problem:** Sie haben eine Push-Benachrichtigung gesendet, aber die Zielbenutzer berichten, dass sie diese nicht erhalten haben.

**Moegliche Ursachen:**
- Der Benutzer hat Push-Benachrichtigungen auf seinem Geraet deaktiviert
- Das Geraete-Token des Benutzers ist abgelaufen (App wurde deinstalliert und neu installiert)
- Die Benachrichtigung wurde an das falsche Benutzersegment gesendet
- Es gibt eine Verzoegerung beim Push-Benachrichtigungszustelldienst

**Loesung:**
1. Pruefen Sie das Benachrichtigungs-Zustellprotokoll auf der Benachrichtigungsseite, um den Sendestatus zu sehen.
2. Ueberpruefen Sie, ob Sie die richtige Zielgruppe ausgewaehlt haben (bestimmter Benutzer, Segment oder alle Benutzer).
3. Beachten Sie, dass Push-Benachrichtigungen je nach Geraet und Netzwerkbedingungen einige Minuten zur Zustellung benoetigen koennen.
4. Wenn ein bestimmter Benutzer durchgehend keine Benachrichtigungen erhaelt, ist moeglicherweise sein Geraete-Token ungueltig. Er sollte die App oeffnen und Benachrichtigungen in seinen Geraeteeinstellungen erneut aktivieren.
5. Fuer Broadcast-Benachrichtigungen planen Sie bis zu 15 Minuten fuer die vollstaendige Zustellung an alle Benutzer ein.

---

### Ich kann keine Benachrichtigungen senden

**Problem:** Der "Send Notification"-Button ist deaktiviert oder Sie erhalten einen Fehler beim Versuch zu senden.

**Moegliche Ursachen:**
- Ihre Rolle hat keine Berechtigungen zum Senden von Benachrichtigungen (Viewers und einige Moderators)
- Pflichtfelder (Titel, Text, Zielgruppe) sind nicht ausgefuellt
- Der Benachrichtigungsdienst ist voruebergehend nicht verfuegbar

**Loesung:**
1. Stellen Sie sicher, dass alle Pflichtfelder ausgefuellt sind: Titel, Nachrichtentext und mindestens eine Zielgruppenauswahl.
2. Pruefen Sie, ob Ihre Rolle die Berechtigung zum Senden von Benachrichtigungen hat (Admin- oder Super Admin-Rolle erforderlich).
3. Wenn alle Felder ausgefuellt sind und Sie die korrekte Rolle haben, versuchen Sie, die Seite zu aktualisieren und es erneut zu versuchen.
4. Wenn der Fehler ein Dienstproblem erwaehnt, warten Sie einige Minuten und versuchen Sie es erneut. Wenn das Problem laenger als 30 Minuten besteht, melden Sie es dem technischen Team.

---

## Browserprobleme

### Die Seite laed nicht

**Problem:** Das Admin-Portal zeigt eine leere Seite, einen Ladespinner der nie fertig wird, oder einen Verbindungsfehler.

**Moegliche Ursachen:**
- Internetverbindungsproblem
- Der Admin-Portal-Dienst ist ausgefallen oder startet neu
- Browsererweiterungen stoeren das Laden der Seite
- DNS oder Firewall blockiert die Portal-Domain

**Loesung:**
1. Ueberpruefen Sie Ihre Internetverbindung, indem Sie eine andere Website besuchen.
2. Versuchen Sie, die Seite mit Strg+Umschalt+R (oder Cmd+Umschalt+R auf Mac) zu aktualisieren.
3. Versuchen Sie, das Portal in einem privaten/Inkognito-Fenster zu oeffnen, um Konflikte mit Erweiterungen auszuschliessen.
4. Leeren Sie Ihren Browser-Cache und die Cookies fuer die Portal-Domain.
5. Wenn Sie ein Unternehmensnetzwerk nutzen, pruefen Sie, ob eine Firewall oder ein Proxy den Zugriff blockiert.
6. Wenn das Portal fuer alle nicht erreichbar ist, ist moeglicherweise ein Deployment im Gange. Warten Sie 5-10 Minuten und versuchen Sie es erneut.

---

### Bilder/Screenshots sind defekt

**Problem:** Bilder im Portal (Haustierfotos, Blogbilder, Screenshots in der Dokumentation) erscheinen als defekte Symbole oder laden nicht.

**Moegliche Ursachen:**
- Der Bildspeicherdienst ist voruebergehend nicht verfuegbar
- Das Bild wurde aus dem Speicher geloescht, aber die Referenz besteht noch
- Eine Content-Security-Policy blockiert das Laden von Bildern
- Langsame Netzwerkverbindung verursacht Bild-Lade-Timeouts

**Loesung:**
1. Aktualisieren Sie die Seite, um das Laden der Bilder erneut zu versuchen.
2. Pruefen Sie, ob das Problem alle Bilder oder nur bestimmte betrifft. Wenn nur bestimmte Bilder defekt sind, wurden sie moeglicherweise aus dem Speicher geloescht.
3. Klicken Sie mit der rechten Maustaste auf ein defektes Bild und waehlen Sie "Bild in neuem Tab oeffnen". Wenn es separat laed, blockiert moeglicherweise eine Browsererweiterung eingebettete Bilder.
4. Deaktivieren Sie Werbeblocker oder Sicherheitserweiterungen voruebergehend zum Testen.
5. Wenn das Problem alle Bilder im gesamten Portal betrifft, melden Sie es dem technischen Team, da der Speicherdienst moeglicherweise Aufmerksamkeit benoetigt.

---

### Das Portal ist langsam

**Problem:** Seiten brauchen lange zum Laden, Aktionen fuehlen sich traege an oder das Portal wird nicht mehr reagiert.

**Moegliche Ursachen:**
- Langsame Internetverbindung
- Der Browser hat zu viele offene Tabs, die Speicher verbrauchen
- Grosse Datensaetze werden ohne Paginierung geladen
- Der Server steht unter hoher Last

**Loesung:**
1. Testen Sie Ihre Internetgeschwindigkeit, um ein Verbindungsproblem auszuschliessen.
2. Schliessen Sie unnoetige Browser-Tabs, um Speicher freizugeben.
3. Wenn eine bestimmte Seite langsam ist (z.B. Haustierregister mit Tausenden von Datensaetzen), wenden Sie Filter an, um die Datensatzgroesse zu reduzieren.
4. Leeren Sie Ihren Browser-Cache, der im Laufe der Zeit gross geworden sein kann.
5. Versuchen Sie einen anderen Browser, um zu sehen, ob das Problem browserspezifisch ist.
6. Wenn die Langsamkeit bei mehreren Admins konsistent auftritt, kann es ein serverseitiges Problem sein. Melden Sie es dem technischen Team mit den betroffenen Seiten und ungefaehren Antwortzeiten.
