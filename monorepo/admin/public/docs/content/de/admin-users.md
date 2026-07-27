# Admin-Benutzer

Die Admin-Benutzer-Seite ermöglicht es Ihnen, die Administratorkonten zu verwalten, die Zugriff auf das Petfolioo Admin-Portal haben. Hier können Sie neue Admins erstellen, Rollen zuweisen, granulare Berechtigungen konfigurieren und den Kontostatus steuern.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Überblick

Zugriffskontrolle ist entscheidend für die Aufrechterhaltung von Sicherheit und betrieblicher Integrität. Das Admin-Benutzersystem unterstützt rollenbasierte Zugriffskontrolle mit zusätzlicher seitenspezifischer Berechtigungsgranularität, die sicherstellt, dass jedes Teammitglied genau den Zugriff hat, den es benötigt.

---

## Admin-Benutzer-Tabelle

Die Hauptansicht zeigt eine Tabelle aller Administratorkonten im System.

### Tabellenspalten

| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Der Anzeigename des Admins, der im gesamten Portal angezeigt wird |
| **E-Mail** | Die Login-E-Mail-Adresse für das Admin-Konto |
| **Rolle** | Die zugewiesene Rolle, die die Basis-Berechtigungsebene bestimmt |
| **Status** | Aktueller Kontostatus: Aktiv oder Gesperrt |
| **Aktionen** | Bearbeiten- und Löschen-Aktionsschaltflächen |

### Tabellenfunktionen

1. Die Tabelle ist durch Klicken auf Spaltenüberschriften sortierbar.
2. Ein Suchfeld oberhalb der Tabelle ermöglicht das Filtern nach Name oder E-Mail.
3. Paginierungssteuerungen erscheinen am unteren Rand für große Admin-Teams.
4. Aktive Konten zeigen ein grünes Status-Badge; gesperrte Konten zeigen ein rotes Badge.

---

## Rollen

Jedem Admin-Konto wird eine von vier Rollen zugewiesen. Rollen definieren die Basis-Zugriffsebene, bevor granulare Berechtigungsüberschreibungen angewendet werden.

### Rollendefinitionen

| Rolle | Zugriffsebene | Beschreibung |
|------|-------------|-------------|
| **super_admin** | Voll uneingeschränkt | Vollständiger Zugriff auf alle Seiten, Funktionen und Systemeinstellungen. Kann nicht gelöscht werden oder Berechtigungen eingeschränkt bekommen. |
| **admin** | Alle Inhalte und Benutzer | Voller Zugriff auf Inhaltsverwaltung, Benutzerverwaltung, Feedback, Benachrichtigungen und Analysen. Kein Zugriff auf Einstellungen auf Systemebene. |
| **moderator** | Prüfen und moderieren | Kann Inhalte wie Feedback, gemeldete Profile und markierte Einträge prüfen und moderieren. Kann keine Ressourcen erstellen oder löschen. |
| **viewer** | Nur-Lesen | Kann alle Seiten einsehen, auf die Zugriff besteht, aber keine Datensätze erstellen, bearbeiten oder löschen. Ideal für Stakeholder, die Transparenz benötigen. |

### Rollenhierarchie

Die Rollenhierarchie bestimmt, welche Rollen andere Rollen verwalten können:

1. **super_admin** kann alle anderen Rollen verwalten (admin, moderator, viewer).
2. **admin** kann moderator- und viewer-Konten verwalten.
3. **moderator** kann keine Admin-Konten verwalten.
4. **viewer** kann keine Admin-Konten verwalten.

> **Wichtig:** Sie können keine Rolle zuweisen, die höher als Ihre eigene ist. Nur ein super_admin kann einen weiteren super_admin erstellen.

---

## Admin erstellen

Um ein neues Administratorkonto zum Portal hinzuzufügen:

### Schritte

1. Klicken Sie auf die Schaltfläche **Admin hinzufügen** in der oberen rechten Ecke der Admin-Benutzer-Seite.
2. Ein Erstellungsformular-Dialog erscheint mit folgenden Feldern:

| Feld | Beschreibung | Anforderungen |
|-------|-------------|--------------|
| **E-Mail** | Die Login-E-Mail für den neuen Admin | Erforderlich. Muss eine gültige, einzigartige E-Mail-Adresse sein. |
| **Anzeigename** | Der im Portal-UI angezeigte Name | Erforderlich. 2-50 Zeichen. |
| **Passwort** | Das initiale Login-Passwort | Erforderlich. Mindestens 8 Zeichen, muss Großbuchstaben, Kleinbuchstaben und eine Zahl enthalten. |
| **Rolle** | Die Zugriffsrolle für diesen Admin | Erforderlich. Aus dem Dropdown auswählen. |

3. Füllen Sie das **E-Mail**-Feld mit der E-Mail-Adresse des neuen Admins aus.
4. Geben Sie einen **Anzeigenamen** ein, der diesen Admin im Portal identifiziert.
5. Setzen Sie ein initiales **Passwort**, das die Komplexitätsanforderungen erfüllt.
6. Wählen Sie die passende **Rolle** aus dem Dropdown.
7. Klicken Sie auf **Erstellen**, um das Admin-Konto hinzuzufügen.
8. Eine Erfolgsmeldung bestätigt, dass das Konto erstellt wurde.
9. Der neue Admin erscheint in der Tabelle und kann sich nun anmelden.

> **Tipp:** Informieren Sie den neuen Admin nach der Kontoerstellung über einen sicheren Kanal über seine Anmeldedaten. Empfehlen Sie, das Passwort bei der ersten Anmeldung zu ändern.

---

## Admin bearbeiten

Sie können den Anzeigenamen, die Rolle und den Status eines bestehenden Admins ändern.

### Schritte

1. Finden Sie den Admin in der Admin-Benutzer-Tabelle.
2. Klicken Sie auf die Schaltfläche **Bearbeiten** (Stiftsymbol) in der Aktionsspalte.
3. Ein Bearbeitungsformular-Dialog erscheint mit den aktuellen Werten vorausgefüllt.

### Bearbeitbare Felder

| Feld | Beschreibung | Hinweise |
|-------|-------------|-------|
| **Anzeigename** | Den sichtbaren Namen des Admins aktualisieren | 2-50 Zeichen |
| **Rolle** | Die Zugriffsebene des Admins ändern | Kann keine höhere Rolle als die eigene zuweisen |
| **Status** | Auf Aktiv oder Gesperrt setzen | Gesperrte Admins können sich nicht anmelden |

4. Ändern Sie die Felder nach Bedarf.
5. Klicken Sie auf **Änderungen speichern**, um die Aktualisierungen anzuwenden.
6. Eine Erfolgsmeldung bestätigt, dass die Änderungen gespeichert wurden.

### Status ändern

- **Aktiv** -- Der Admin kann sich anmelden und das Portal normal nutzen.
- **Gesperrt** -- Der Admin kann sich nicht anmelden. Bestehende Sitzungen werden sofort beendet.

> **Hinweis:** Das Sperren eines Admins ist reversibel. Verwenden Sie es, wenn Sie vorübergehend den Zugriff entziehen müssen, ohne das Konto zu löschen.

### Einschränkungen

- Sie können Ihre eigene Rolle nicht bearbeiten (um versehentliche Selbst-Degradierung zu verhindern).
- Sie können die Rolle eines super_admin nicht ändern, es sei denn, Sie sind ebenfalls ein super_admin.
- Die E-Mail kann nach der Kontoerstellung nicht geändert werden.

---

## Granulare seitenspezifische Berechtigungskonfiguration

Über Rollen hinaus unterstützt das Admin-Portal eine feinkörnige Berechtigungskontrolle auf Seitenbasis. Dies ermöglicht es Ihnen, genau anzupassen, auf welche Seiten und Aktionen jeder Admin zugreifen kann.

### Zugriff auf die Berechtigungskonfiguration

1. Klicken Sie auf die Schaltfläche **Bearbeiten** bei dem Admin, den Sie konfigurieren möchten.
2. Navigieren Sie im Bearbeitungsdialog zum Bereich **Berechtigungen** (oder Tab).
3. Eine Berechtigungsmatrix wird angezeigt, die alle Portal-Seiten zeigt.

### Struktur der Berechtigungsmatrix

Die Berechtigungsmatrix zeigt jede Portal-Seite als Zeile mit folgenden Steuerungen:

| Steuerung | Beschreibung |
|---------|-------------|
| **Zugriffs-Umschalter** | Ein Schalter, der den Zugriff auf die gesamte Seite aktiviert oder deaktiviert |
| **Aktions-Mehrfachauswahl** | Ein Dropdown, mit dem Sie auswählen können, welche spezifischen Aktionen auf dieser Seite erlaubt sind |

### Verfügbare Seiten in der Matrix

| Seite | Mögliche Aktionen |
|------|-----------------|
| Dashboard | Anzeigen |
| Benutzer | Anzeigen, Erstellen, Bearbeiten, Löschen, Sperren |
| Tiere | Anzeigen, Erstellen, Bearbeiten, Löschen |
| Gesundheitsdaten | Anzeigen, Erstellen, Bearbeiten, Löschen |
| Impfungen | Anzeigen, Erstellen, Bearbeiten, Löschen |
| Zucht | Anzeigen, Erstellen, Bearbeiten, Löschen |
| Feedback | Anzeigen, Antworten, Schließen, Anpinnen |
| Benachrichtigungen | Anzeigen, Senden |
| Analysen | Anzeigen, Exportieren |
| Einstellungen | Anzeigen, Bearbeiten |
| Admin-Benutzer | Anzeigen, Erstellen, Bearbeiten, Löschen |

### Berechtigungen konfigurieren

1. Für jede Seitenzeile den **Zugriffs**-Schalter umschalten:
   - **AN** -- Der Admin kann auf diese Seite zugreifen (spezifische Aktionen werden unten gesteuert).
   - **AUS** -- Der Admin kann diese Seite nicht sehen oder zu ihr navigieren.
2. Für Seiten mit aktiviertem Zugriff auf das **Aktions**-Mehrfachauswahl-Dropdown klicken.
3. Die spezifischen Aktionen auswählen, die dieser Admin ausführen darf:
   - Jede Aktion aktivieren, die Sie gewähren möchten.
   - Aktionen deaktivieren, die Sie einschränken möchten.
4. Für jede Seite nach Bedarf wiederholen.
5. Auf **Änderungen speichern** klicken, um die Berechtigungskonfiguration anzuwenden.

### Wie Berechtigungen mit Rollen interagieren

- Rollenberechtigungen dienen als **Basis**.
- Seitenspezifische Berechtigungen können den Zugriff unter die Rollenbasis **einschränken**.
- Seitenspezifische Berechtigungen **können keinen** Zugriff über das hinaus gewähren, was die Rolle erlaubt.
- Beispiel: Ein Benutzer mit Admin-Rolle hat standardmäßig Zugriff auf alle Inhaltsseiten. Sie können seinen Zugriff auf die Zuchtseite einschränken, indem Sie sie abschalten, aber Sie können ihm keinen Einstellungszugriff gewähren (super_admin vorbehalten).

> **Tipp:** Verwenden Sie granulare Berechtigungen, wenn Sie Teammitglieder mit einem bestimmten Teilbereich der Admin-Fähigkeiten haben. Beispielsweise könnte ein Kundensupport-Mitarbeiter die Rolle „admin" haben, aber nur auf die Seiten Feedback und Benutzer beschränkt sein.

---

## Admin löschen

Das Entfernen eines Admin-Kontos löscht es dauerhaft aus dem System.

### Schritte

1. Finden Sie den Admin in der Admin-Benutzer-Tabelle.
2. Klicken Sie auf die Schaltfläche **Löschen** (Mülleimersymbol) in der Aktionsspalte.
3. Ein Bestätigungsdialog erscheint mit dem Namen und der E-Mail des Admins.
4. Tippen Sie die E-Mail-Adresse des Admins zur Bestätigung der Löschung ein (Sicherheitsmaßnahme).
5. Klicken Sie auf **Löschen bestätigen**, um das Konto dauerhaft zu entfernen.
6. Eine Erfolgsmeldung bestätigt die Löschung.
7. Der Admin wird aus der Tabelle entfernt und kann sich nicht mehr anmelden.

### Löschungseinschränkungen

| Einschränkung | Grund |
|-------------|--------|
| Kann keinen super_admin löschen | Verhindert versehentliche Sperrung des Systems |
| Kann das eigene Konto nicht löschen | Verhindert Selbstentfernung |
| Kann nicht löschen ohne ausreichende Rolle | Rollenhierarchieregeln gelten |

> **Warnung:** Die Löschung ist dauerhaft und kann nicht rückgängig gemacht werden. Wenn Sie den Zugriff vorübergehend entziehen müssen, verwenden Sie stattdessen den Status „Gesperrt".

---

## Erklärung der Berechtigungsmatrix

Das Berechtigungssystem in Petfolioo verwendet einen mehrschichtigen Ansatz:

### Schicht 1: Rollenbasierte Zugriffskontrolle (RBAC)

Jede Rolle hat einen vordefinierten Satz von Berechtigungen als Ausgangspunkt:

```
super_admin  -->  Alle Seiten, alle Aktionen, keine Einschränkungen
admin        -->  Alle Inhalts-/Benutzerseiten, alle Aktionen (außer Einstellungen)
moderator    -->  Inhaltsüberprüfungsseiten, eingeschränkte Aktionen (anzeigen, antworten, schließen)
viewer       -->  Alle zugänglichen Seiten, nur Ansicht
```

### Schicht 2: Seitenspezifische Überschreibungen

Granulare Berechtigungen fügen eine zweite Schicht über RBAC hinzu:

```
Rollenberechtigungen  (Basis)
    |
    v
Seitenspezifische Umschalter  (können einschränken, nicht über Rolle hinaus erweitern)
    |
    v
Endgültige effektive Berechtigungen  (was der Admin tatsächlich sieht)
```

### Beispielszenarien

**Szenario 1: Kundensupport-Mitarbeiter**
- Rolle: admin
- Überschreibung: Zugriff auf Tiere, Gesundheitsdaten, Zucht, Analysen, Admin-Benutzer deaktivieren
- Ergebnis: Kann nur auf Dashboard, Benutzer, Feedback und Benachrichtigungen zugreifen

**Szenario 2: Inhaltsüberprüfer**
- Rolle: moderator
- Überschreibung: Feedback (Anzeigen, Antworten, Schließen), Benutzer (nur Anzeigen) aktivieren
- Ergebnis: Kann Feedback überprüfen und Benutzerprofile nachschlagen, aber keine Benutzer ändern

**Szenario 3: Analyse-Beobachter**
- Rolle: viewer
- Überschreibung: Nur Dashboard und Analysen aktivieren
- Ergebnis: Kann Diagramme und Metriken ansehen, aber nichts anderes

### Effektive Berechtigungen anzeigen

1. Öffnen Sie den Bearbeitungsdialog für einen beliebigen Admin.
2. Der Berechtigungsbereich zeigt den aktuellen effektiven Status.
3. Umschalter und Aktionsauswahlen spiegeln wider, was derzeit gewährt ist.
4. Deaktivierte (ausgegraute) Aktionen zeigen solche an, die über die Rollenzulassung hinausgehen.

---

## Sicherheits-Best-Practices

1. **Prinzip der minimalen Berechtigung** -- Weisen Sie die minimale Rolle und Berechtigungen zu, die für die Aufgabe jedes Admins benötigt werden.
2. **Regelmäßige Audits** -- Überprüfen Sie Admin-Konten vierteljährlich. Entfernen Sie nicht mehr benötigte Konten.
3. **Sperren vor Löschen** -- Beim Offboarding zuerst sperren, um keine Störung zu verursachen, dann nach einer Übergangsfrist löschen.
4. **super_admins begrenzen** -- Halten Sie die Anzahl der super_admin-Konten minimal (idealerweise 1-2).
5. **Starke Passwörter** -- Erzwingen Sie komplexe Passwörter und empfehlen Sie Passwort-Manager.
6. **Aktivität überwachen** -- Prüfen Sie über die Systemprotokolle, wer sich wann anmeldet.

---

## Fehlerbehebung

| Problem | Lösung |
|-------|----------|
| Kann keinen Admin erstellen | Überprüfen Sie, ob Sie ausreichende Rollenberechtigungen haben. Prüfen Sie, ob die E-Mail nicht bereits verwendet wird. |
| Bearbeiten-/Löschen-Schaltflächen nicht sichtbar | Ihre Rolle hat keine Berechtigung, Admins auf oder über der Ebene des Ziels zu verwalten. |
| Admin kann sich nach Erstellung nicht anmelden | Überprüfen Sie, ob der Kontostatus Aktiv ist. Bestätigen Sie, dass das Passwort korrekt eingegeben wurde. |
| Berechtigungsänderungen wirken nicht | Der Admin muss sich möglicherweise ab- und wieder anmelden, damit Berechtigungsänderungen wirksam werden. |
| Kann einen super_admin nicht löschen | Dies ist beabsichtigt. super_admin-Konten können nicht über die UI gelöscht werden. |

---

## Verwandte Seiten

- [Einstellungen](./settings.md) -- Systemsicherheitseinstellungen konfigurieren
- [Feedback](./feedback.md) -- Benutzerfeedback verwalten (erfordert Feedback-Seitenzugriff)
- [Analysen](./analytics.md) -- Plattformmetriken anzeigen (erfordert Analysen-Seitenzugriff)
