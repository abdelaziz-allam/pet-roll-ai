# Benachrichtigungen

Die Benachrichtigungsseite ermöglicht es Administratoren, Push-Benachrichtigungen an Benutzer der Petfolioo Mobile-App zu verfassen und zu senden. Sie können bestimmte Zielgruppen-Segmente ansprechen, den Benachrichtigungsverlauf überprüfen und Best Practices für effektive Kommunikation befolgen.

![Notifications](/docs/screenshots/notifications.png)

---

## Überblick

Push-Benachrichtigungen sind ein direkter Kanal zu Ihren Benutzern. Nutzen Sie sie, um neue Funktionen anzukündigen, wichtige Updates zu teilen, Erinnerungen zu senden oder bestimmte Benutzersegmente anzusprechen. Diese Seite bietet sowohl die Erstellungswerkzeuge als auch ein Verlaufsprotokoll aller zuvor gesendeten Benachrichtigungen.

---

## Benachrichtigung verfassen

Der Benachrichtigungseditor ist das primäre Werkzeug zum Erstellen und Senden von Push-Benachrichtigungen an App-Benutzer.

### Zugriff auf den Editor

1. Navigieren Sie zur Seite **Benachrichtigungen** über das Seitenleisten-Menü.
2. Das Erstellungsformular wird oben auf der Seite angezeigt.

### Formularfelder

| Feld | Beschreibung | Anforderungen |
|-------|-------------|--------------|
| **Titel** | Die Benachrichtigungs-Überschrift, die prominent auf dem Gerät des Benutzers angezeigt wird | Erforderlich. Maximal 65 Zeichen empfohlen für volle Sichtbarkeit. |
| **Nachrichtentext** | Der detaillierte Inhalt der Benachrichtigung | Erforderlich. Maximal 240 Zeichen empfohlen. |
| **Zielgruppe** | Die Zielgruppe der Benutzer, die diese Benachrichtigung erhalten werden | Erforderlich. Aus vordefinierten Segmenten auswählen. |

---

## Eine Benachrichtigung verfassen

Folgen Sie diesen Schritten, um eine Benachrichtigung zu erstellen und zu senden:

### Schritt 1: Titel eingeben

1. Klicken Sie auf das **Titel**-Eingabefeld.
2. Tippen Sie eine prägnante, aufmerksamkeitsstarke Überschrift.
3. Halten Sie sich unter 65 Zeichen, um Abschneidung auf kleineren Geräten zu vermeiden.

> **Tipp:** Verwenden Sie handlungsorientierte Sprache in Titeln. „Neu: Impfungen Ihres Tieres verfolgen" ist ansprechender als „Update zur Impffunktion."

### Schritt 2: Nachrichtentext schreiben

1. Klicken Sie auf den **Nachrichtentext**-Textbereich.
2. Schreiben Sie die detaillierte Nachricht, die Benutzer sehen sollen.
3. Fügen Sie relevante Informationen ein, z.B. welche Aktion der Benutzer ausführen soll.
4. Halten Sie die Nachricht unter 240 Zeichen für optimale Anzeige.

### Schritt 3: Zielgruppe auswählen

1. Klicken Sie auf den **Zielgruppe**-Dropdown-Selektor.
2. Wählen Sie eines der folgenden Zielgruppen-Segmente:

| Zielgruppe | Beschreibung |
|----------|-------------|
| **Alle Benutzer** | Sendet die Benachrichtigung an jeden registrierten Benutzer der App |
| **Hundebesitzer** | Richtet sich an Benutzer, die mindestens einen Hund in ihrem Profil registriert haben |
| **Katzenbesitzer** | Richtet sich an Benutzer, die mindestens eine Katze in ihrem Profil registriert haben |
| **Verifizierte Züchter** | Richtet sich an Benutzer, die als professionelle Züchter verifiziert wurden |

3. Die ausgewählte Zielgruppe bestimmt, wer die Push-Benachrichtigung erhält.

> **Hinweis:** Ein Benutzer kann mehreren Segmenten angehören. Beispielsweise erhält ein verifizierter Züchter, der Hunde besitzt, Benachrichtigungen, die an „Hundebesitzer", „Verifizierte Züchter" und „Alle Benutzer" gerichtet sind.

### Schritt 4: Vor dem Senden überprüfen

1. Überprüfen Sie den Titel auf Tippfehler und Klarheit.
2. Überprüfen Sie den Nachrichtentext auf Genauigkeit und Ton.
3. Bestätigen Sie, dass das Zielgruppen-Segment korrekt ist.
4. Vergewissern Sie sich, dass dies kein Duplikat einer kürzlich gesendeten Benachrichtigung ist.

---

## Sendebestätigung

Wenn Sie bereit sind, die Benachrichtigung zu senden, stellt ein Bestätigungsschritt sicher, dass Sie nicht versehentlich an die falsche Zielgruppe senden.

### Sendeprozess

1. Klicken Sie auf die Schaltfläche **Benachrichtigung senden**.
2. Ein Bestätigungsdialog erscheint mit:
   - Dem Benachrichtigungstitel
   - Dem Nachrichtentext
   - Dem ausgewählten Zielgruppen-Segment
   - Der geschätzten Empfängeranzahl
3. Überprüfen Sie alle Details im Bestätigungsdialog.
4. Klicken Sie auf **Senden bestätigen**, um die Benachrichtigung abzuschicken.
5. Alternativ klicken Sie auf **Abbrechen**, um zum Editor zurückzukehren und Änderungen vorzunehmen.
6. Bei erfolgreicher Zustellung erscheint eine Erfolgsmeldung, die bestätigt, dass die Benachrichtigung in die Warteschlange gestellt wurde.

> **Wichtig:** Nach der Bestätigung kann die Benachrichtigung nicht zurückgerufen werden. Überprüfen Sie immer die Zielgruppe und den Inhalt vor der Bestätigung.

---

## Benachrichtigungsverlauf

Unterhalb des Erstellungsformulars zeigt der Bereich Benachrichtigungsverlauf eine chronologische Liste aller zuvor gesendeten Benachrichtigungen.

### Verlaufslisten-Spalten

| Spalte | Beschreibung |
|--------|-------------|
| **Typ-Tag** | Ein farbiges Tag, das das Zielgruppen-Segment anzeigt (z.B. „Alle Benutzer" in Blau, „Hundebesitzer" in Orange) |
| **Titel** | Der Benachrichtigungstitel wie gesendet |
| **Nachricht** | Eine Vorschau des Nachrichtentexts (bei Länge gekürzt) |
| **Datum** | Datum und Uhrzeit des Benachrichtigungsversands |
| **Empfängeranzahl** | Anzahl der Benutzer, die die Benachrichtigung erhalten haben |

### Verlauf anzeigen

1. Scrollen Sie unterhalb des Erstellungsformulars, um die Verlaufsliste zu sehen.
2. Benachrichtigungen sind in umgekehrter chronologischer Reihenfolge aufgelistet (neueste zuerst).
3. Jede Zeile zeigt das Typ-Tag, den Titel, das Datum und die Empfängeranzahl auf einen Blick.
4. Klicken Sie auf eine beliebige Zeile, um sie zu erweitern und den vollständigen Nachrichtentext zu sehen.

### Typ-Tags verstehen

Typ-Tags sind für schnelle Identifikation farbcodiert:

| Tag-Farbe | Zielgruppe |
|-----------|----------|
| Blau | Alle Benutzer |
| Orange | Hundebesitzer |
| Lila | Katzenbesitzer |
| Grün | Verifizierte Züchter |

---

## Best Practices für Push-Benachrichtigungen

Effektive Push-Benachrichtigungen steigern das Engagement, ohne Benutzer zu belästigen. Befolgen Sie diese Richtlinien:

### Häufigkeit

1. **Häufigkeit begrenzen** -- Senden Sie nicht mehr als 2-3 Benachrichtigungen pro Woche, außer bei dringenden Anlässen.
2. **Verwandte Updates bündeln** -- Kombinieren Sie mehrere kleine Updates in einer einzelnen Benachrichtigung.
3. **Zeitzonen respektieren** -- Senden Sie Benachrichtigungen zu angemessenen Zeiten (9-20 Uhr Ortszeit).
4. **Wochenenden vermeiden** -- Sofern die Benachrichtigung nicht zeitkritisch ist, bevorzugen Sie Werktage.

### Inhaltsqualität

1. **Prägnant sein** -- Kommen Sie schnell auf den Punkt. Benutzer entscheiden in Sekunden, ob sie sich engagieren.
2. **Handlungsorientiert sein** -- Sagen Sie Benutzern, was sie tun können: „Prüfen Sie die anstehenden Impfungen Ihres Tieres."
3. **Relevant sein** -- Verwenden Sie Zielgruppenausrichtung, um sicherzustellen, dass Inhalte zu den Benutzerinteressen passen.
4. **Clickbait vermeiden** -- Irreführende Benachrichtigungen untergraben Vertrauen und erhöhen die Abmelderate.
5. **Personalisieren wenn möglich** -- Referenzieren Sie das Zielgruppen-Segment: „Achtung Hundebesitzer" fühlt sich persönlicher an.

### Timing und Kontext

1. **Neue Funktionen** -- Senden, wenn die Funktion live und zugänglich ist.
2. **Gesundheitserinnerungen** -- Einige Tage vor dem Termin oder der fälligen Impfung eines Tieres senden.
3. **Saisonale Inhalte** -- An Jahreszeiten ausrichten (z.B. Floh-/Zeckenerinnerungen im Frühling).
4. **Notfall-Updates** -- Bei dringenden Problemen (Wartung, Sicherheit) sofort senden, ungeachtet der Timing-Regeln.

### Effektive Titel schreiben

| Gutes Beispiel | Warum es funktioniert |
|--------------|--------------|
| „Die Impfung Ihres Tieres steht bald an" | Relevant, erzeugt Dringlichkeit, klare Handlung |
| „Neu: Trächtigkeitsverfolgung für Züchter" | Hebt neuen Mehrwert hervor, spricht Zielgruppe an |
| „Wartung heute Abend um 22 Uhr" | Klar, spezifisch, zeitkritisch |

| Schlechtes Beispiel | Warum es scheitert |
|-------------|--------------|
| „Schau dir das an!" | Vage, kein Wertversprechen |
| „Update" | Zu generisch, Benutzer werden es ignorieren |
| „Wichtig!!!" | Übertriebene Dringlichkeit, wirkt wie Spam |

### Erfolg messen

Nach dem Senden von Benachrichtigungen überwachen:

- **Öffnungsraten** -- Engagieren sich Benutzer mit Ihren Benachrichtigungen?
- **Abmelderaten** -- Ein Anstieg deutet auf Benachrichtigungsmüdigkeit hin.
- **In-App-Aktivität** -- Führt eine Benachrichtigung zum beabsichtigten Verhalten?
- **Feedback** -- Überprüfen Sie die Feedback-Seite auf Benutzerreaktionen.

---

## Details zu Zielgruppen-Segmenten

### Alle Benutzer

- Umfasst jedes registrierte Konto im System.
- Verwenden für plattformweite Ankündigungen, Wartungshinweise oder universelle Funktionen.
- Größte Zielgruppe -- sparsam verwenden, um Benachrichtigungsmüdigkeit zu vermeiden.

### Hundebesitzer

- Umfasst Benutzer mit mindestens einem Hund in ihrem Tierprofil.
- Verwenden für hundespezifische Gesundheitstipps, Rasseveranstaltungen oder Funktionsupdates.
- Beispiel: „Erinnerung: Jährliche Herzwurmprävention für Hunde."

### Katzenbesitzer

- Umfasst Benutzer mit mindestens einer Katze in ihrem Tierprofil.
- Verwenden für katzenspezifische Inhalte, Indoor-Gesundheitstipps oder Katzenfunktionen.
- Beispiel: „Neu: Indoor-Aktivitätsverfolgung für Katzen."

### Verifizierte Züchter

- Umfasst Benutzer, die die Züchterverifizierung abgeschlossen haben.
- Verwenden für zuchtspezifische Funktionen, Compliance-Updates oder professionelle Werkzeuge.
- Beispiel: „Verbesserungen am Trächtigkeits-Tracker jetzt verfügbar."

---

## Fehlerbehebung

| Problem | Lösung |
|-------|----------|
| Benachrichtigung wird nicht gesendet | Überprüfen Sie, ob alle erforderlichen Felder ausgefüllt sind. Prüfen Sie die Netzwerkverbindung. |
| Empfängeranzahl zeigt 0 | Das ausgewählte Zielgruppen-Segment ist möglicherweise leer. Überprüfen Sie, ob Benutzer in diesem Segment vorhanden sind. |
| Benutzer berichten, nicht erhalten zu haben | Benutzer haben möglicherweise Push-Benachrichtigungen auf ihrem Gerät deaktiviert. Dies liegt außerhalb der Admin-Kontrolle. |
| Doppelte Benachrichtigung gesendet | Prüfen Sie die Verlaufsliste vor dem Senden. Es gibt kein Rückgängig nach der Bestätigung. |

---

## Verwandte Seiten

- [Feedback](./feedback.md) -- Benutzerreaktionen auf Benachrichtigungen überwachen
- [Analysen](./analytics.md) -- Benutzer-Engagement-Trends verfolgen
- [Einstellungen](./settings.md) -- Benachrichtigungsbezogene Systemeinstellungen konfigurieren
