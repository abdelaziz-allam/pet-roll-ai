# Einstellungen

Die Einstellungsseite bietet systemweite Konfigurationsoptionen für die Petfolioo-Plattform. Einstellungen sind in drei Tabs organisiert: Allgemein, Benachrichtigungen und Sicherheit. Hier vorgenommene Änderungen betreffen das Verhalten sowohl des Admin-Portals als auch der mobilen Anwendung.

![Settings](/docs/screenshots/settings.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Überblick

Nur Administratoren mit der Rolle super_admin oder admin (mit Zugriff auf die Einstellungsseite) können Einstellungen anzeigen und ändern. Alle Änderungen erfordern explizites Speichern und treten sofort nach dem Speichern in Kraft.

---

## Zugriff auf Einstellungen

1. Klicken Sie auf **Einstellungen** im Seitenleisten-Navigationsmenü.
2. Die Einstellungsseite lädt mit drei Tabs oben.
3. Der Tab **Allgemein** ist standardmäßig ausgewählt.

---

## Tab Allgemein

Der Tab Allgemein enthält grundlegende Anwendungskonfigurationsoptionen, die definieren, wie sich die Plattform präsentiert und arbeitet.

### Felder

| Feld | Beschreibung | Standard |
|-------|-------------|---------|
| **App-Name** | Der Anzeigename der Anwendung in Benachrichtigungen und E-Mails | Petfolioo |
| **Support-E-Mail** | Die Kontakt-E-Mail-Adresse, die Benutzern für Support-Anfragen angezeigt wird | -- |
| **Standardsprache** | Die Standardsprache für neue Benutzer und Systemkommunikation | Englisch |
| **Wartungsmodus** | Umschalter zum Aktivieren oder Deaktivieren des Wartungsmodus | Aus |

### Allgemeine Einstellungen konfigurieren

#### App-Name

1. Finden Sie das Feld **App-Name**.
2. Löschen Sie den vorhandenen Wert und geben Sie den gewünschten Anwendungsnamen ein.
3. Dieser Name erscheint in Push-Benachrichtigungen, E-Mail-Headern und dem Info-Bereich der mobilen App.

#### Support-E-Mail

1. Finden Sie das Feld **Support-E-Mail**.
2. Geben Sie die E-Mail-Adresse ein, an die Benutzer Support-Anfragen richten sollen.
3. Diese E-Mail wird auf dem Hilfe-/Kontaktbildschirm der mobilen App angezeigt.

> **Tipp:** Verwenden Sie eine gemeinsame Team-E-Mail (z.B. support@petfolioo.com) statt einer persönlichen Adresse, damit mehrere Teammitglieder antworten können.

#### Standardsprache

1. Klicken Sie auf das Dropdown **Standardsprache**.
2. Wählen Sie die Sprache, die als Standard verwendet wird für:
   - Erstellung neuer Benutzerkonten
   - Systemgenerierte Benachrichtigungen
   - E-Mail-Vorlagen
3. Benutzer können dies in ihren individuellen App-Einstellungen überschreiben.

#### Wartungsmodus

Der Wartungsmodus ist eine kritische Funktion, die Benutzern signalisiert, dass die Plattform vorübergehend nicht verfügbar ist.

1. Finden Sie den **Wartungsmodus**-Umschalter.
2. Klicken Sie auf den Umschalter, um den Wartungsmodus zu aktivieren.
3. Ein Warndialog erscheint zur Bestätigung der Aktion.

**Wenn der Wartungsmodus aktiviert ist:**

| Auswirkung | Beschreibung |
|--------|-------------|
| Admin-Portal-Warnung | Ein prominentes Banner erscheint oben im Admin-Portal und zeigt an, dass der Wartungsmodus aktiv ist |
| Mobile App Auswirkung | Die mobile Anwendung zeigt Benutzern einen Wartungsbildschirm an und verhindert normale Nutzung |
| API-Verhalten | API-Endpunkte geben Wartungsstatus-Antworten zurück |
| Admin-Zugang | Administratoren können weiterhin normal auf das Admin-Portal zugreifen |

4. Um den Wartungsmodus zu deaktivieren, klicken Sie erneut auf den Umschalter.
5. Bestätigen Sie die Aktion im Dialog.
6. Die Plattform kehrt sofort zum Normalbetrieb zurück.

> **Warnung:** Das Aktivieren des Wartungsmodus betrifft sofort alle Mobile-App-Benutzer. Aktivieren Sie ihn nur während geplanter Wartungsfenster und kommunizieren Sie den Zeitplan im Voraus per Push-Benachrichtigung.

---

## Tab Benachrichtigungen

Der Tab Benachrichtigungen steuert automatisierte Benachrichtigungsverhaltensweisen -- die systemgenerierten Hinweise, die basierend auf Tierdaten an Benutzer gesendet werden.

### Felder

| Feld | Beschreibung | Typ | Standard |
|-------|-------------|------|---------|
| **Impferinnerungen** | Automatische Erinnerungen senden, wenn die Impfung eines Tieres fällig wird | Umschalter | An |
| **Trächtigkeitshinweise** | Hinweise für Trächtigkeitsmeilensteine und erwartete Geburtstermine senden | Umschalter | An |
| **Zucht-Updates** | Updates über Paarungstermine und Bestätigungen senden | Umschalter | An |
| **Erinnerungstage vor Fälligkeit** | Anzahl der Tage vor einem Fälligkeitsdatum, an dem die Erinnerung gesendet wird | Zahleneingabe | 7 |

### Benachrichtigungseinstellungen konfigurieren

#### Impferinnerungen

1. Finden Sie den **Impferinnerungen**-Umschalter.
2. Wenn **aktiviert** (Standard):
   - Benutzer erhalten Push-Benachrichtigungen vor fälligen Impfterminen ihres Tieres.
   - Die Benachrichtigung wird basierend auf der Einstellung „Erinnerungstage vor Fälligkeit" gesendet.
   - Beispiel: Bei 7 Tagen erhalten Benutzer eine Woche vor Fälligkeit eine Erinnerung.
3. Wenn **deaktiviert**:
   - Es werden keine automatischen Impferinnerungen gesendet.
   - Benutzer müssen den Impfplan ihres Tieres manuell prüfen.

#### Trächtigkeitshinweise

1. Finden Sie den **Trächtigkeitshinweise**-Umschalter.
2. Wenn **aktiviert** (Standard):
   - Benutzer, die eine Trächtigkeit verfolgen, erhalten Meilenstein-Benachrichtigungen.
   - Hinweise umfassen Erinnerungen zum erwarteten Geburtstermin und Phasenübergänge.
   - Züchter erhalten zusätzliche professionelle Tracking-Benachrichtigungen.
3. Wenn **deaktiviert**:
   - Es werden keine automatischen trächtigkeitsbezogenen Hinweise gesendet.

#### Zucht-Updates

1. Finden Sie den **Zucht-Updates**-Umschalter.
2. Wenn **aktiviert** (Standard):
   - Benutzer erhalten Benachrichtigungen über geplante Paarungsereignisse.
   - Bestätigungsbenachrichtigungen werden gesendet, wenn Paarungseinträge protokolliert werden.
   - Züchter erhalten Paarungsvorschläge und Terminerinnerungen.
3. Wenn **deaktiviert**:
   - Es werden keine automatischen zuchtbezogenen Benachrichtigungen gesendet.

#### Erinnerungstage vor Fälligkeit

1. Finden Sie die Zahleneingabe **Erinnerungstage vor Fälligkeit**.
2. Geben Sie die Anzahl der Tage vor einem Fälligkeitsdatum ein, an dem Erinnerungen gesendet werden sollen.
3. Dieser Wert gilt für alle datumsbasierten Erinnerungen (Impfungen, Termine).
4. Gültiger Bereich: 1 bis 30 Tage.

> **Tipp:** Ein Wert von 7 Tagen funktioniert für die meisten Benutzer gut. Für Züchter, die mehrere Tiere verwalten, erwägen Sie 14 Tage, um mehr Vorbereitungszeit zu geben.

### Benachrichtigungsinteraktionstabelle

| Einstellung | Betrifft | Benutzerauswirkung |
|---------|---------|-------------|
| Impferinnerungen AN + 7 Tage | Benutzer mit Tieren mit anstehenden Impfungen | „Rex' Tollwutimpfung ist in 7 Tagen fällig" |
| Trächtigkeitshinweise AN | Benutzer mit aktiven Trächtigkeitsdatensätzen | „Lunas Trächtigkeit ist in Woche 6 eingetreten" |
| Zucht-Updates AN | Benutzer mit geplanten Paarungen | „Paarungstermin mit Max für Freitag bestätigt" |
| Alle Umschalter AUS | Alle Benutzer | Keine automatisierten Benachrichtigungen; nur manuelle Admin-Benachrichtigungen |

---

## Tab Sicherheit

Der Tab Sicherheit enthält Einstellungen zur API-Ratenbegrenzung, Authentifizierungs-Token-Lebensdauern und Datei-Upload-Beschränkungen.

### Felder

| Feld | Beschreibung | Typ | Standard |
|-------|-------------|------|---------|
| **Ratenlimit pro Minute** | Maximale API-Anfragen pro Benutzer pro Minute | Zahl | 60 |
| **Access-Token-Ablauf (Stunden)** | Wie lange ein Access-Token gültig bleibt | Zahl | 24 |
| **Refresh-Token-Ablauf (Tage)** | Wie lange ein Refresh-Token gültig bleibt | Zahl | 30 |
| **Max. Fotogröße (MB)** | Maximal erlaubte Dateigröße für Tierfotos | Zahl | 5 |
| **Max. Avatargröße (MB)** | Maximal erlaubte Dateigröße für Benutzer-Avatare | Zahl | 2 |
| **Erlaubte Dateitypen** | Kommagetrennte Liste von MIME-Typen, die für Uploads akzeptiert werden | Text | image/jpeg,image/png,image/webp |

### Sicherheitseinstellungen konfigurieren

#### Ratenlimit pro Minute

1. Finden Sie das Feld **Ratenlimit pro Minute**.
2. Geben Sie die maximale Anzahl von API-Anfragen ein, die ein einzelner Benutzer pro Minute stellen kann.
3. Anfragen über diesem Limit erhalten eine 429-Antwort (Too Many Requests).
4. Empfohlener Bereich: 30-120 je nach erwarteten Nutzungsmustern.

> **Wichtig:** Ein zu niedriger Wert kann dazu führen, dass die mobile App für aktive Benutzer fehlfunktioniert. Ein zu hoher Wert kann das System anfällig für Missbrauch machen. Der Standardwert von 60 ist für die meisten Installationen geeignet.

#### Access-Token-Ablauf (Stunden)

1. Finden Sie das Feld **Access-Token-Ablauf**.
2. Geben Sie die Anzahl der Stunden ein, die ein Access-Token nach Ausstellung gültig bleibt.
3. Wenn ein Token abläuft, verwendet die App den Refresh-Token, um einen neuen zu erhalten.
4. Kürzere Werte sind sicherer; längere Werte reduzieren Login-Reibung.

| Wert | Sicherheit | Benutzererfahrung |
|-------|----------|-----------------|
| 1 Stunde | Hoch | Häufige Neuauthentifizierung |
| 24 Stunden | Mittel | Gute Balance (empfohlen) |
| 72 Stunden | Niedriger | Minimale Unterbrechung |

#### Refresh-Token-Ablauf (Tage)

1. Finden Sie das Feld **Refresh-Token-Ablauf**.
2. Geben Sie die Anzahl der Tage ein, die ein Refresh-Token gültig bleibt.
3. Wenn der Refresh-Token abläuft, muss sich der Benutzer erneut mit seinen Anmeldedaten einloggen.
4. Empfohlener Bereich: 7-90 Tage.

> **Tipp:** Für eine Consumer-App wie Petfolioo sind 30 Tage eine gute Balance. Benutzer, die die App mindestens monatlich öffnen, müssen sich nie erneut einloggen. Für Installationen mit höheren Sicherheitsanforderungen erwägen Sie 7 Tage.

#### Max. Fotogröße (MB)

1. Finden Sie das Feld **Max. Fotogröße**.
2. Geben Sie die maximale Dateigröße in Megabyte für Tierfoto-Uploads ein.
3. Fotos, die diese Größe überschreiten, werden mit einer Fehlermeldung abgelehnt.
4. Berücksichtigen Sie Speicherkosten und Upload-Zeiten für Benutzer mit langsamen Verbindungen.

| Wert | Geeignet für |
|-------|-------------|
| 2 MB | Geringer Speicher, schnelle Uploads, niedrigere Qualität |
| 5 MB | Ausgewogen (empfohlen) |
| 10 MB | Hochwertige Fotos, mehr Speicherverbrauch |

#### Max. Avatargröße (MB)

1. Finden Sie das Feld **Max. Avatargröße**.
2. Geben Sie die maximale Dateigröße in Megabyte für Benutzer-Avatar-Uploads ein.
3. Avatare sind typischerweise kleiner als Tierfotos, da sie in reduzierter Auflösung angezeigt werden.
4. Empfohlen: 1-3 MB.

#### Erlaubte Dateitypen

1. Finden Sie das Feld **Erlaubte Dateitypen**.
2. Geben Sie eine kommagetrennte Liste von MIME-Typen ein, die das System für Uploads akzeptiert.
3. Jeder MIME-Typ sollte im Format `typ/untertyp` sein.
4. Fügen Sie keine Leerzeichen zwischen den Einträgen ein, es sei denn, Sie möchten sie absichtlich im MIME-Typ-String.

**Gängige MIME-Typen für Bild-Uploads:**

| MIME-Typ | Format | Hinweise |
|-----------|--------|-------|
| `image/jpeg` | JPEG | Häufigstes Fotoformat, gute Kompression |
| `image/png` | PNG | Verlustfrei, unterstützt Transparenz |
| `image/webp` | WebP | Modernes Format, ausgezeichnete Kompression |
| `image/heic` | HEIC | Apples Format, verwendet von iPhone-Kameras |
| `image/gif` | GIF | Animierte Bilder, größere Dateien |

**Beispielkonfigurationen:**

```
Standard:     image/jpeg,image/png,image/webp
Erweitert:    image/jpeg,image/png,image/webp,image/heic,image/gif
Minimal:      image/jpeg,image/png
```

> **Warnung:** Das Hinzufügen nicht unterstützter MIME-Typen kann Uploads ermöglichen, die das System nicht verarbeiten kann. Fügen Sie nur Typen hinzu, die Ihre Bildverarbeitungspipeline unterstützt.

---

## Einstellungen speichern

Alle Einstellungsänderungen erfordern eine explizite Speicheraktion.

### Schritte zum Speichern

1. Nehmen Sie Ihre gewünschten Änderungen über einen der drei Tabs vor.
2. Klicken Sie auf die Schaltfläche **Einstellungen speichern** am unteren Rand der Seite.
3. Ein Ladeindikator erscheint, während die Änderungen angewendet werden.
4. Eine Erfolgsbenachrichtigung bestätigt, dass die Einstellungen gespeichert wurden.
5. Änderungen treten sofort plattformweit in Kraft.

### Wichtige Hinweise zum Speichern

- Änderungen werden **nicht** automatisch gespeichert. Wenn Sie die Seite verlassen, ohne zu speichern, gehen Änderungen verloren.
- Sie können Einstellungen über mehrere Tabs hinweg ändern, bevor Sie speichern -- alle Änderungen werden zusammen gespeichert.
- Bei einem Validierungsfehler wird das spezifische Feld mit einer Fehlermeldung hervorgehoben.
- Nur geänderte Felder werden an den Server gesendet (optimistisches partielles Update).

> **Tipp:** Nach dem Speichern sicherheitsrelevanter Änderungen (Ratenlimits, Token-Ablauf) überwachen Sie das System für eine kurze Zeit, um sicherzustellen, dass kein unerwartetes Verhalten auftritt.

---

## Einstellungsänderungs-Audit

Alle Einstellungsänderungen werden für Sicherheit und Rechenschaftspflicht protokolliert:

| Protokollierte Information | Beschreibung |
|--------------------|-------------|
| Admin-Name | Wer die Änderung vorgenommen hat |
| Zeitstempel | Wann die Änderung vorgenommen wurde |
| Geändertes Feld | Welche Einstellung geändert wurde |
| Vorheriger Wert | Der Wert vor der Änderung |
| Neuer Wert | Der Wert nach der Änderung |

---

## Fehlerbehebung

| Problem | Lösung |
|-------|----------|
| Kein Zugriff auf die Einstellungsseite | Überprüfen Sie, ob Ihre Rolle super_admin oder admin mit Einstellungsberechtigung ist. |
| Speichern-Schaltfläche deaktiviert | Es wurden keine Änderungen vorgenommen. Ändern Sie mindestens ein Feld, um das Speichern zu aktivieren. |
| Validierungsfehler beim Speichern | Prüfen Sie das hervorgehobene Feld auf die spezifische Fehlermeldung und korrigieren Sie den Wert. |
| Wartungsmodus betrifft App nicht | Warten Sie 1-2 Minuten, bis die Änderung an alle Mobile-App-Instanzen propagiert ist. |
| Ratenlimit zu restriktiv | Erhöhen Sie den Wert und speichern Sie. Betroffene Benutzer werden innerhalb einer Minute entsperrt. |
| Datei-Upload-Fehler nach Typänderung | Stellen Sie sicher, dass die MIME-Typen korrekt formatiert sind ohne nachfolgende Kommas oder Leerzeichen. |

---

## Verwandte Seiten

- [Admin-Benutzer](./admin-users.md) -- Verwalten, wer Einstellungen zugreifen und ändern kann
- [Benachrichtigungen](./notifications.md) -- Manuelle Benachrichtigungen an Benutzer senden
- [Analysen](./analytics.md) -- Plattformgesundheit und Nutzung überwachen
