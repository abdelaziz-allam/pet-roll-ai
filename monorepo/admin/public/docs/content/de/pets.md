# Tierregister

Das Tierregister ist das zentrale Modul zum Anzeigen und Verwalten aller auf der Petfolioo-Plattform registrierten Tiere. Von diesem Modul aus können Administratoren den vollständigen Tierkatalog durchsuchen, detaillierte Profile ansehen, den Status von Gesundheitszertifikaten überprüfen und Moderationsmaßnahmen wie das Sperren von Tieren ergreifen, die gegen Plattformrichtlinien verstoßen.

![Pet Registry](/docs/screenshots/pets.png)

---

## Tierlistentabelle

Die Tierlistentabelle zeigt alle registrierten Tiere in einem paginierbaren, sortierbaren und filterbaren Format an.

### Tabellenspalten

| Spalte | Beschreibung | Sortierbar |
|--------|-------------|:--------:|
| Name | Der registrierte Name des Tieres | Ja |
| Art | Artkategorie (z.B. Hund, Katze, Vogel) | Ja |
| Rasse | Spezifische Rasse innerhalb der Art | Ja |
| Status | Aktueller Status (Aktiv, Gesperrt, Ausstehend) | Ja |
| Geschlecht | Männlich, Weiblich oder Unbekannt | Ja |
| Standort | Land und Stadt der registrierten Adresse des Tieres | Ja |

### Statusindikatoren

| Status | Badge-Farbe | Bedeutung |
|--------|-------------|---------|
| Aktiv | Grün | Tierprofil ist aktiv und für andere Benutzer sichtbar |
| Gesperrt | Rot | Tierprofil wurde wegen eines Richtlinienverstoßes ausgeblendet |
| Ausstehend | Orange | Tierprofil wartet auf Prüfung oder Besitzerverifizierung |

### Tabelleninteraktionen

1. **Klicken Sie auf eine Spaltenüberschrift**, um die Tabelle nach dieser Spalte zu sortieren. Ein Pfeil zeigt die Sortierrichtung an.
2. **Klicken Sie auf eine Zeile**, um den Tierdetail-Drawer auf der rechten Seite des Bildschirms zu öffnen.
3. **Paginierungssteuerungen** am unteren Rand ermöglichen das Navigieren zwischen Seiten und das Ändern der Seitengröße (10, 20, 50 Einträge pro Seite).

> **Tipp:** Halten Sie `Shift` gedrückt und klicken Sie auf eine zweite Spaltenüberschrift, um eine sekundäre Sortierung anzuwenden.

---

## Filter

Die Filterleiste oberhalb der Tierlistentabelle bietet mehrere Möglichkeiten, die angezeigten Ergebnisse einzugrenzen.

### Verfügbare Filter

| Filter | Typ | Beschreibung |
|--------|------|-------------|
| Art | Dropdown-Auswahl | Nach Tierart filtern (Hund, Katze, Vogel, Kaninchen, Reptil usw.) |
| Status | Dropdown-Auswahl | Nach Tierstatus filtern (Aktiv, Gesperrt, Ausstehend) |
| Geschlecht | Dropdown-Auswahl | Nach Geschlecht filtern (Männlich, Weiblich, Unbekannt) |
| Land | Dropdown-Auswahl | Nach dem registrierten Land des Tieres filtern |
| Stadt | Dropdown-Auswahl | Nach Stadt filtern (Optionen aktualisieren sich basierend auf der Länderauswahl) |
| Suche | Texteingabe | Freitextsuche über Tiername, Rasse und Mikrochipnummer |

### Filter anwenden

1. Finden Sie die **Filterleiste** oberhalb der Tabelle.
2. Klicken Sie auf einen **Dropdown-Filter**, um verfügbare Optionen zu sehen.
3. Wählen Sie einen oder mehrere Werte aus den Dropdowns aus.
4. Tippen Sie im **Suche**-Feld, um eine Freitextsuche durchzuführen.
5. Ergebnisse werden automatisch aktualisiert, wenn Filter angewendet werden.
6. Aktive Filter werden als Tags unterhalb der Filterleiste angezeigt.
7. Klicken Sie auf das **X** eines Filter-Tags, um diesen zu entfernen.
8. Klicken Sie auf **Alle löschen**, um alle Filter auf einmal zurückzusetzen.

### Filterkombinationen

Filter werden mit UND-Logik kombiniert. Beispiel:

| Ausgewählte Filter | Ergebnis |
|-----------------|--------|
| Art: Hund | Alle Hunde unabhängig von Status, Geschlecht oder Standort |
| Art: Hund + Geschlecht: Weiblich | Alle weiblichen Hunde |
| Art: Hund + Land: VAE + Status: Aktiv | Alle aktiven Hunde in den VAE |
| Suche: „Rex" | Alle Tiere, deren Name, Rasse oder Mikrochip „Rex" enthält |

> **Hinweis:** Das Stadt-Dropdown ist von der Länderauswahl abhängig. Wählen Sie zuerst ein Land, um verfügbare Städte zu sehen.

---

## Tierdetail-Drawer

Ein Klick auf eine Tierzeile öffnet einen Detail-Drawer, der von der rechten Seite des Bildschirms eingeschoben wird. Dieser Drawer enthält das vollständige Tierprofil, unterteilt in Abschnitte.

### Fotogalerie

Am oberen Rand des Detail-Drawers zeigt ein Fotoraster die hochgeladenen Bilder des Tieres.

| Element | Beschreibung |
|---------|-------------|
| Primärfoto | Wird größer angezeigt, markiert mit einem Sternsymbol |
| Weitere Fotos | In einem Rasterlayout angezeigt (bis zu 6 Miniaturbilder) |
| Klickaktion | Ein Klick auf ein beliebiges Foto öffnet es in einer Vollbild-Lightbox |
| Keine Fotos | Eine Platzhalter-Silhouette wird angezeigt |

### Tierinformationen

Unterhalb der Fotos werden die Kerndaten des Tieres in einem strukturierten Layout angezeigt.

| Feld | Beschreibung | Beispiel |
|-------|-------------|---------|
| Name | Registrierter Tiername | „Bella" |
| Art | Artkategorie | „Hund" |
| Rasse | Spezifische Rasse | „Golden Retriever" |
| Farbe | Fell-/Körperfarbe | „Golden" |
| Gewicht | Gewicht mit Einheit | „28,5 kg" |
| Geburtsdatum | Geburtstag des Tieres | „2021-03-15" |
| Alter | Berechnet aus dem Geburtsdatum | „2 Jahre, 4 Monate" |
| Geschlecht | Männlich oder Weiblich | „Weiblich" |
| Mikrochipnummer | Eindeutige Mikrochip-ID falls implantiert | „900118000123456" |
| Kastriert/Sterilisiert | Kastrations- oder Sterilisierungsstatus | „Ja" / „Nein" / „Unbekannt" |
| Registrierungsdatum | Wann das Tier zur Plattform hinzugefügt wurde | „2023-07-20" |

### Gesundheitszertifikatsstatus

Der Gesundheitszertifikatsbereich zeigt, ob das Tier gültige Gesundheitsdokumentation vorliegen hat.

| Element | Beschreibung |
|---------|-------------|
| Zertifikats-Badge | Grünes Häkchen (gültig), Gelbe Warnung (läuft bald ab), Rotes X (abgelaufen/fehlend) |
| Zertifikatstyp | Name des Gesundheitszertifikats |
| Ausstellungsdatum | Wann das Zertifikat ausgestellt wurde |
| Ablaufdatum | Wann das Zertifikat abläuft |
| Gültigkeitsfortschrittsbalken | Visuelle Anzeige der verbleibenden Gültigkeitsdauer |

**Gültigkeitsfortschrittsbalken lesen:**

1. Ein **voller grüner Balken** zeigt an, dass das Zertifikat kürzlich ausgestellt wurde und der Großteil der Gültigkeit verbleibt.
2. Ein **teilweise gelber Balken** (unter 30% verbleibend) zeigt an, dass das Zertifikat dem Ablauf nahe kommt.
3. Ein **roter leerer Balken** zeigt an, dass das Zertifikat abgelaufen ist.
4. Der verbleibende Prozentsatz wird als Text neben dem Balken angezeigt.

> **Tipp:** Zertifikate, die innerhalb von 30 Tagen ablaufen, werden automatisch im Modul „Ausstehende Verifizierungen" markiert, damit der Tierbesitzer benachrichtigt werden kann.

### Besitzerinformationen

Der Besitzerbereich zeigt Details zum registrierten Besitzer des Tieres.

| Feld | Beschreibung |
|-------|-------------|
| Besitzername | Anzeigename des Tierbesitzers |
| E-Mail | E-Mail-Adresse des Besitzers |
| Telefon | Telefonnummer falls angegeben |
| Verifizierter Züchter | Ob der Besitzer den Status eines verifizierten Züchters hat |
| Gesamttiere | Wie viele Tiere dieser Besitzer registriert hat |
| Mitglied seit | Registrierungsdatum des Besitzers |

Ein Klick auf den Besitzernamen navigiert zu dessen vollständigem Profil im Benutzermodul.

### Standortbereich

Der Standortbereich zeigt, wo das Tier registriert ist.

| Feld | Beschreibung |
|-------|-------------|
| Land | Ländername mit Flaggensymbol |
| Stadt | Stadtname |
| Adresse | Straßenadresse falls angegeben (kann aus Datenschutzgründen teilweise verborgen sein) |

---

## Tier sperren/entsperren

Administratoren und Moderatoren können ein Tier sperren, dessen Profil gegen Plattformrichtlinien verstößt. Das Sperren verbirgt das Tier vor der öffentlichen Ansicht und benachrichtigt den Besitzer.

### Ein Tier sperren

1. Öffnen Sie den Tierdetail-Drawer, indem Sie auf die Zeile in der Listentabelle klicken.
2. Scrollen Sie zum Ende des Drawers oder finden Sie den Bereich **Aktionen**.
3. Klicken Sie auf die Schaltfläche **Tier sperren** (in Rot dargestellt).
4. Ein Bestätigungsmodal erscheint.
5. Geben Sie im Textfeld **Grund** eine klare Erklärung ein, warum dieses Tier gesperrt wird.
6. Wählen Sie eine **Verstoßkategorie** aus dem Dropdown (z.B. Betrügerischer Eintrag, Unangemessener Inhalt, Doppeltes Profil, Richtlinienverstoß).
7. Klicken Sie auf **Sperre bestätigen**.
8. Der Status des Tieres ändert sich zu „Gesperrt" und der Besitzer erhält eine Benachrichtigung mit dem angegebenen Grund.

### Anforderungen an den Sperrgrund

| Anforderung | Beschreibung |
|-------------|-------------|
| Mindestlänge | Mindestens 20 Zeichen |
| Sprache | Muss professionell und klar sein |
| Spezifität | Sollte den spezifischen Verstoß referenzieren |
| Sichtbarkeit | Der Grund wird dem Tierbesitzer direkt angezeigt |

> **Wichtig:** Der Sperrgrund, den Sie angeben, wird dem Tierbesitzer in seiner App-Benachrichtigung und E-Mail angezeigt. Stellen Sie sicher, dass er professionell und spezifisch ist und keinen internen Jargon enthält.

### Ein Tier entsperren

1. Verwenden Sie den **Status**-Filter und wählen Sie „Gesperrt", um gesperrte Tiere zu finden.
2. Klicken Sie auf die Zeile des gesperrten Tieres, um den Detail-Drawer zu öffnen.
3. Finden Sie die Schaltfläche **Tier entsperren** (in Grün dargestellt) im Aktionsbereich.
4. Ein Bestätigungsmodal erscheint, das den ursprünglichen Sperrgrund und das Datum anzeigt.
5. Fügen Sie optional eine Notiz hinzu, die erklärt, warum die Sperre aufgehoben wird.
6. Klicken Sie auf **Entsperrung bestätigen**.
7. Der Status des Tieres kehrt zu „Aktiv" zurück und der Besitzer wird benachrichtigt.

### Sperrverlauf

Der Detail-Drawer jedes Tieres enthält einen **Sperrverlauf**-Bereich, falls das Tier jemals gesperrt war:

| Spalte | Beschreibung |
|--------|-------------|
| Datum | Wann die Sperre verhängt wurde |
| Admin | Welcher Administrator die Aktion durchgeführt hat |
| Grund | Der angegebene Sperrgrund |
| Dauer | Wie lange die Sperre dauerte |
| Lösung | Wie sie gelöst wurde (entsperrt, Widerspruch usw.) |

---

## Massenoperationen

Für groß angelegte Moderationsaufgaben unterstützt die Tierlistentabelle eine Massenauswahl.

### Massenauswahl verwenden

1. Aktivieren Sie das **Kontrollkästchen** auf der linken Seite jeder Zeile, die Sie auswählen möchten.
2. Oder klicken Sie auf das **Kopfzeilen-Kontrollkästchen**, um alle sichtbaren Zeilen auf der aktuellen Seite auszuwählen.
3. Eine **Massenaktionsleiste** erscheint oben in der Tabelle und zeigt die Anzahl der ausgewählten Elemente.
4. Verfügbare Massenaktionen umfassen:
   - **Export** - Ausgewählte Tiere als CSV-Datei herunterladen
   - **Status ändern** - Eine Statusänderung auf alle ausgewählten Tiere anwenden

> **Hinweis:** Massensperren sind über diese Oberfläche nicht verfügbar. Sperren müssen einzeln vorgenommen werden, um sicherzustellen, dass jede einen spezifischen Grund enthält.

---

## Tierdaten exportieren

Um Tierregisterdaten zu exportieren:

1. Wenden Sie gewünschte Filter an, um den Datensatz einzugrenzen.
2. Klicken Sie auf die Schaltfläche **Export** in der oberen rechten Ecke der Tabelle.
3. Wählen Sie das Exportformat (CSV oder Excel).
4. Wählen Sie, ob Sie **gefilterte Ergebnisse** oder **alle Datensätze** exportieren möchten.
5. Die Datei wird in den Standard-Downloadordner Ihres Browsers heruntergeladen.

### Exportierte Felder

| Feld | Enthalten |
|-------|:--------:|
| Tiername | Ja |
| Art | Ja |
| Rasse | Ja |
| Geschlecht | Ja |
| Status | Ja |
| Land | Ja |
| Stadt | Ja |
| Besitzer-E-Mail | Ja |
| Registrierungsdatum | Ja |
| Mikrochipnummer | Ja |
| Gesundheitszertifikatsstatus | Ja |

> **Hinweis:** Fotos und detaillierte Gesundheitsdaten sind nicht in Exporten enthalten. Es werden nur Zusammenfassungsdaten exportiert.

---

*Zurück: [Dashboard](./dashboard.md) | Weiter: [App-Benutzer](./users.md)*
