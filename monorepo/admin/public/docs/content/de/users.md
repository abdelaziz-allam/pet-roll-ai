# App-Benutzer

Das App-Benutzer-Modul bietet eine vollständige Verwaltung aller Benutzerkonten auf der Petfolioo-Plattform. Administratoren können Benutzerprofile anzeigen, neue Konten erstellen, Details bearbeiten, Rollen zuweisen und Moderationsmaßnahmen ergreifen. Dieses Modul ist für Benutzer mit den Rollen `super_admin` oder `admin` zugänglich.

![App Users](/docs/screenshots/users.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Ban, Delete, Export |
> | Admin | View, Create, Edit, Ban |
> | Moderator | View, Ban |
> | Viewer | View only |

---

## Benutzerlistentabelle

Die Benutzerlistentabelle zeigt alle registrierten Plattformbenutzer mit den wichtigsten Informationen auf einen Blick.

### Tabellenspalten

| Spalte | Beschreibung | Sortierbar |
|--------|-------------|:--------:|
| Avatar | Profilbild des Benutzers (rundes Miniaturbild) | Nein |
| Name | Anzeigename | Ja |
| E-Mail | Registrierte E-Mail-Adresse | Ja |
| Rolle | Zugewiesene Plattformrolle (Benutzer, Moderator, Admin) | Ja |
| Status | Kontostatus (Aktiv, Ausstehend, Gesperrt) | Ja |
| Verifizierter Züchter | Badge für verifizierten Züchterstatus | Ja |
| Tieranzahl | Anzahl der von diesem Benutzer registrierten Tiere | Ja |
| Beitrittsdatum | Datum der Kontoerstellung | Ja |

### Statusindikatoren

| Status | Badge-Farbe | Bedeutung |
|--------|-------------|---------|
| Aktiv | Grün | Konto ist voll funktionsfähig |
| Ausstehend | Orange | E-Mail-Verifizierung nicht abgeschlossen |
| Gesperrt | Rot | Konto wurde von einem Administrator gesperrt |

### Badge für verifizierten Züchter

| Indikator | Bedeutung |
|-----------|---------|
| Blaues Häkchen-Badge | Benutzer hat die Züchterverifizierung abgeschlossen und ist bestätigt |
| Kein Badge | Benutzer hat sich nicht für die Züchterverifizierung beworben oder diese nicht erhalten |
| Uhr-Symbol | Züchterverifizierungsantrag wartet auf Prüfung |

### Tabellennavigation

1. **Sortieren** durch Klicken auf eine sortierbare Spaltenüberschrift. Erneut klicken, um die Reihenfolge umzukehren.
2. **Suchen** über die Suchleiste oberhalb der Tabelle, um Benutzer nach Name oder E-Mail zu finden.
3. **Filtern** über die Status- und Rollen-Dropdowns, um Ergebnisse einzugrenzen.
4. **Paginieren** über die Steuerungen am unteren Rand (10, 20, 50 Einträge pro Seite).

> **Tipp:** Kombinieren Sie die Suchleiste mit Statusfiltern, um bestimmte Benutzer schnell zu finden. Suchen Sie zum Beispiel „Hans" mit Status „Gesperrt", um gesperrte Benutzer namens Hans zu finden.

---

## Benutzerdetails anzeigen

Der Benutzerdetail-Drawer bietet eine umfassende Ansicht des Benutzerprofils und der Aktivitäten.

### Detail-Drawer öffnen

1. Klicken Sie auf eine beliebige Zeile in der Benutzerlistentabelle.
2. Der Detail-Drawer schiebt sich von der rechten Seite des Bildschirms ein.
3. Der Drawer enthält mehrere vertikal angeordnete Abschnitte.

### Detail-Drawer-Abschnitte

| Abschnitt | Inhalt |
|---------|---------|
| Profil-Header | Großer Avatar, Anzeigename, E-Mail, Rollen-Badge, Status-Badge |
| Kontoinformationen | Beitrittsdatum, Letzte Anmeldung, E-Mail-Verifizierungsstatus, Auth-Provider |
| Persönliche Daten | Telefonnummer, Zeitzone, Land, Stadt |
| Züchterstatus | Verifizierungsstatus, Antragsdatum, eingereichte Dokumente |
| Tier-Zusammenfassung | Anzahl registrierter Tiere mit Schnelllinks zu jedem |
| Aktivitätsprotokoll | Letzte Aktionen dieses Benutzers auf der Plattform |

### Profil-Header

Der obere Bereich des Drawers zeigt:

- **Avatar** in voller Größe (oder Standard-Silhouette, wenn keiner hochgeladen wurde)
- **Anzeigename** in großer Schrift
- **E-Mail** unterhalb des Namens
- **Rollen-Badge** farbcodiert nach Berechtigungsebene
- **Status-Badge** mit aktuellem Kontostatus

### Kontoinformationsfelder

| Feld | Beschreibung | Beispiel |
|-------|-------------|---------|
| Benutzer-ID | Eindeutige Systemkennung | „usr_a1b2c3d4" |
| Beitrittsdatum | Wann das Konto erstellt wurde | „2023-01-15 09:30 UTC" |
| Letzte Anmeldung | Zeitstempel der letzten Anmeldung | „2024-07-20 14:22 UTC" |
| E-Mail verifiziert | Ob die E-Mail bestätigt wurde | „Ja" / „Nein" |
| Auth-Provider | Verwendete Authentifizierungsmethode | „E-Mail/Passwort" oder „Google" |
| Firebase UID | Firebase Authentication Benutzer-ID | „Abc123Def456" |

---

## Neuen Benutzer erstellen

Administratoren können Benutzerkonten direkt über das Admin-Portal erstellen. Da die Plattform Firebase Authentication verwendet, wird bei der Erstellung kein Passwort festgelegt - Benutzer erhalten eine E-Mail, um ihr eigenes Passwort zu setzen.

### Schritte zum Erstellen eines Benutzers

1. Klicken Sie auf die Schaltfläche **Benutzer erstellen** in der oberen rechten Ecke der Benutzerseite.
2. Ein Erstellungsmodal oder Formular erscheint.
3. Füllen Sie die erforderlichen Felder aus:

| Feld | Erforderlich | Beschreibung |
|-------|:--------:|-------------|
| Anzeigename | Ja | Der vollständige Name oder gewählte Anzeigename des Benutzers |
| E-Mail | Ja | Eine gültige E-Mail-Adresse (muss auf der Plattform einzigartig sein) |

4. Klicken Sie auf **Erstellen**, um das Formular abzusenden.
5. Das System wird:
   - Einen Firebase Authentication-Datensatz erstellen
   - Eine Willkommens-E-Mail an den Benutzer mit einem Link zum Setzen des Passworts senden
   - Das Benutzerprofil in der Plattformdatenbank anlegen
   - Die Standard-Rolle „Benutzer" zuweisen
6. Der neue Benutzer erscheint in der Listentabelle mit dem Status „Ausstehend", bis er seine E-Mail verifiziert.

### Validierungsregeln

| Feld | Regel |
|-------|------|
| Anzeigename | 2-100 Zeichen, darf nicht leer sein |
| E-Mail | Muss gültiges E-Mail-Format haben, darf nicht bereits im System existieren |

> **Hinweis:** Es wird kein Passwortfeld benötigt. Firebase Authentication übernimmt die Passworteinrichtung über die Willkommens-E-Mail an den Benutzer. Dies stellt sicher, dass der Benutzer sein eigenes sicheres Passwort wählt.

> **Tipp:** Wenn Sie einen Benutzer mit erhöhten Berechtigungen erstellen müssen, erstellen Sie ihn zunächst mit Standardeinstellungen und ändern Sie dann seine Rolle separat (siehe Rolle ändern unten).

---

## Benutzer bearbeiten

Administratoren können Benutzerprofildetails bei Bedarf ändern. Dies wird häufig zur Korrektur von Informationen oder zur Aktualisierung von Details im Auftrag eines Benutzers verwendet.

### Schritte zum Bearbeiten eines Benutzers

1. Öffnen Sie den Benutzerdetail-Drawer, indem Sie auf die Zeile in der Listentabelle klicken.
2. Klicken Sie auf die Schaltfläche **Bearbeiten** (Stiftsymbol) im Drawer-Header.
3. Der Drawer wechselt in den Bearbeitungsmodus mit editierbaren Formularfeldern.
4. Ändern Sie eines der verfügbaren Felder:

| Feld | Bearbeitbar | Hinweise |
|-------|:--------:|-------|
| Anzeigename | Ja | Der öffentliche Name des Benutzers |
| Telefon | Ja | Internationales Format empfohlen (z.B. +491701234567) |
| Zeitzone | Ja | Dropdown der IANA-Zeitzonen (z.B. Europe/Berlin) |
| Land | Ja | Dropdown aller Länder |
| Stadt | Ja | Textfeld, aktualisiert Vorschläge basierend auf dem Land |
| E-Mail | Nein | Kann nicht geändert werden (wird als Login-Kennung verwendet) |
| Benutzer-ID | Nein | Systemgeneriert, unveränderlich |

5. Klicken Sie auf **Änderungen speichern**, um Ihre Bearbeitungen anzuwenden.
6. Eine Erfolgsbenachrichtigung bestätigt die Aktualisierung.
7. Der Drawer kehrt zum Ansichtsmodus zurück und zeigt die aktualisierten Informationen.

### Bearbeitungsverlauf

Alle über das Admin-Portal vorgenommenen Bearbeitungen werden protokolliert:

| Protokollfeld | Beschreibung |
|-----------|-------------|
| Zeitstempel | Wann die Änderung vorgenommen wurde |
| Admin | Welcher Administrator die Änderung vorgenommen hat |
| Geändertes Feld | Welches Feld geändert wurde |
| Alter Wert | Der vorherige Wert |
| Neuer Wert | Der aktualisierte Wert |

> **Wichtig:** Bearbeitungen an Benutzerprofilen sind für den Benutzer sichtbar. Er wird die aktualisierten Informationen in seiner App sehen. Erwägen Sie, den Benutzer zu benachrichtigen, wenn Sie Änderungen in seinem Auftrag vornehmen.

---

## Rolle ändern

Rollenänderungen bestimmen, welche Zugriffsebene ein Benutzer innerhalb der Plattform und ihrer Apps hat.

### Verfügbare Rollen

| Rolle | Beschreibung | Fähigkeiten |
|------|-------------|--------------|
| user | Standard-Plattformbenutzer | Kann eigene Tiere verwalten, an Zuchtprogrammen teilnehmen, Einträge ansehen |
| moderator | Community-Moderator | Alle Benutzerfähigkeiten plus Möglichkeit, Inhalte zu überprüfen und zu melden |
| admin | Plattformadministrator | Alle Moderatorfähigkeiten plus Zugang zum Admin-Portal |

### Schritte zum Ändern der Benutzerrolle

1. Öffnen Sie den Benutzerdetail-Drawer durch Klicken auf die Zeile.
2. Finden Sie den **Rolle**-Bereich im Drawer.
3. Klicken Sie auf die Schaltfläche **Rolle ändern** (oder das aktuelle Rollen-Badge).
4. Ein Rollenauswahl-Modal erscheint mit:
   - Radiobuttons für jede verfügbare Rolle
   - Beschreibungstext, der die Berechtigungen jeder Rolle erklärt
   - Ein Bestätigungskontrollkästchen zur Anerkennung der Änderung
5. Wählen Sie die neue Rolle aus.
6. Lesen Sie die Rollenbeschreibung, um zu bestätigen, dass sie angemessen ist.
7. Aktivieren Sie das **Bestätigungskontrollkästchen** („Ich verstehe, dass dies die Zugriffsebene des Benutzers ändern wird").
8. Klicken Sie auf **Rollenänderung bestätigen**.
9. Die Rolle des Benutzers wird sofort aktualisiert.

### Einschränkungen bei Rollenänderungen

| Ihre Rolle | Kann zuweisen |
|-----------|-----------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Kann keine Rollen ändern |
| viewer | Kann keine Rollen ändern |

> **Wichtig:** Die Beförderung eines Benutzers zu „admin" gewährt ihm Zugang zum Admin-Portal. Tun Sie dies nur für vertrauenswürdige Teammitglieder, die administrativen Zugriff benötigen.

> **Hinweis:** Das Ändern eines Benutzers von „admin" zu „user" entzieht sofort den Zugang zum Admin-Portal. Wenn der Benutzer derzeit im Portal angemeldet ist, wird seine Sitzung bei der nächsten Seitennavigation beendet.

---

## Benutzer sperren/entsperren

Das Sperren eines Benutzers setzt sein Konto aus und verhindert, dass er sich in die App einloggt oder auf Plattformfunktionen zugreift.

### Einen Benutzer sperren

1. Öffnen Sie den Benutzerdetail-Drawer.
2. Scrollen Sie zum Bereich **Aktionen** am Ende des Drawers.
3. Klicken Sie auf die Schaltfläche **Benutzer sperren** (in Rot dargestellt).
4. Ein Bestätigungsmodal erscheint mit:
   - Name und E-Mail des Benutzers zur Bestätigung
   - Ein **Grund**-Textfeld (erforderlich)
   - Ein **Dauer**-Selektor (dauerhaft, 7 Tage, 30 Tage, 90 Tage)
5. Geben Sie einen klaren, professionellen Grund für die Sperre ein.
6. Wählen Sie die Sperrdauer.
7. Klicken Sie auf **Sperre bestätigen**.

### Auswirkungen der Sperre

| Auswirkung | Beschreibung |
|--------|-------------|
| Anmeldung blockiert | Benutzer kann sich nicht in die mobile App einloggen |
| Profil versteckt | Benutzerprofil ist für andere Benutzer nicht sichtbar |
| Tiere delistet | Alle Tiere dieses Benutzers werden aus den Einträgen ausgeblendet |
| Benachrichtigungen | Benutzer erhält eine E-Mail mit Erklärung der Sperre und dem angegebenen Grund |
| Aktive Sitzungen | Alle aktuellen Sitzungen werden sofort beendet |

### Richtlinien für den Sperrgrund

| Richtlinie | Beispiel |
|-----------|---------|
| Sei spezifisch | „Mehrere betrügerische Zuchtanzeigen gemeldet und bestätigt" |
| Richtlinie referenzieren | „Verstoß gegen Nutzungsbedingungen Abschnitt 4.2 bezüglich authentischer Einträge" |
| Vage Sprache vermeiden | Schreiben Sie NICHT „schlechtes Verhalten" - seien Sie spezifisch darüber, was passiert ist |
| Professionell bleiben | Der Grund wird direkt an den Benutzer gesendet |

> **Wichtig:** Der Sperrgrund wird dem Benutzer per E-Mail und In-App-Benachrichtigung mitgeteilt. Er muss sachlich, spezifisch und professionell sein.

### Einen Benutzer entsperren

1. Verwenden Sie den **Status**-Filter und wählen Sie „Gesperrt", um gesperrte Benutzer zu finden.
2. Klicken Sie auf die Zeile des gesperrten Benutzers, um den Detail-Drawer zu öffnen.
3. Der Drawer zeigt eine **Sperrinformationen**-Karte mit:
   - Sperrdatum
   - Sperrender Administrator
   - Sperrgrund
   - Sperrdauer / Ablauf
4. Klicken Sie auf die Schaltfläche **Benutzer entsperren** (in Grün dargestellt).
5. Ein Bestätigungsmodal erscheint.
6. Geben Sie optional eine Notiz ein, die erklärt, warum die Sperre aufgehoben wird.
7. Klicken Sie auf **Entsperrung bestätigen**.
8. Der Status des Benutzers kehrt zu „Aktiv" zurück und er erhält vollen Plattformzugang.
9. Der Benutzer erhält eine Benachrichtigung, dass sein Konto wiederhergestellt wurde.

### Sperrverlauf

Jede Sperr- und Entsperraktion wird im Verlauf des Benutzers aufgezeichnet:

| Feld | Beschreibung |
|-------|-------------|
| Sperrdatum | Wann die Sperre verhängt wurde |
| Entsperrdatum | Wann die Sperre aufgehoben wurde (falls zutreffend) |
| Admin | Welcher Administrator die Aktion durchgeführt hat |
| Grund | Der angegebene Grund für die Sperre |
| Dauer | Wie lange die Sperre festgelegt war |
| Lösung | Wie sie endete (manuelle Entsperrung, Ablauf, Widerspruch) |

---

## Benutzer suchen und filtern

### Suchleiste

Die Suchleiste oben auf der Benutzerseite unterstützt:

| Suchtyp | Beispiel | Treffer |
|-------------|---------|---------|
| Namenssuche | „Sarah" | Alle Benutzer mit „Sarah" im Anzeigenamen |
| E-Mail-Suche | „gmail.com" | Alle Benutzer mit Gmail-Adressen |
| Teilübereinstimmung | „pet" | Benutzer namens „Peter", „Petrov" usw. |

### Filter-Dropdowns

| Filter | Optionen |
|--------|---------|
| Rolle | Alle, Benutzer, Moderator, Admin |
| Status | Alle, Aktiv, Ausstehend, Gesperrt |
| Verifizierter Züchter | Alle, Verifiziert, Nicht verifiziert, Ausstehend |

### Suche und Filter kombinieren

1. Geben Sie Text in die Suchleiste ein UND wählen Sie gleichzeitig Filterwerte.
2. Ergebnisse müssen ALLE Kriterien erfüllen (UND-Logik).
3. Einzelne Filter löschen Sie durch Klicken auf deren X-Schaltfläche, oder alle mit der Schaltfläche **Zurücksetzen**.

---

## Benutzerdaten exportieren

Um Benutzerdaten für Berichte oder Analysen zu exportieren:

1. Wenden Sie gewünschte Filter an.
2. Klicken Sie auf die Schaltfläche **Export** im oberen rechten Bereich.
3. Wählen Sie das Format: **CSV** oder **Excel**.
4. Wählen Sie den Umfang: **Aktuelle gefilterte Ansicht** oder **Alle Benutzer**.
5. Der Download beginnt automatisch.

### Exportierte Felder

| Feld | Enthalten | Hinweise |
|-------|:--------:|-------|
| Anzeigename | Ja | |
| E-Mail | Ja | |
| Rolle | Ja | |
| Status | Ja | |
| Land | Ja | |
| Stadt | Ja | |
| Tieranzahl | Ja | |
| Beitrittsdatum | Ja | |
| Letzte Anmeldung | Ja | |
| Telefon | Nein | Aus Datenschutzgründen ausgeschlossen |

> **Hinweis:** Telefonnummern und detaillierte persönliche Informationen werden standardmäßig aus Exporten ausgeschlossen, um Datenschutzanforderungen zu erfüllen.

---

*Zurück: [Tierregister](./pets.md) | Weiter: [Tierkategorien](./categories.md)*
