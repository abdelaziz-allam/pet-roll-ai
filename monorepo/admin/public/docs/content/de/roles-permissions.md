# Roles & Permissions

Das Petfolioo Admin Portal verwendet ein rollenbasiertes Zugriffskontrollsystem (RBAC), um zu verwalten, was jeder Administrator sehen und tun kann. Jedem Admin-Benutzer wird eine Rolle zugewiesen, und jede Rolle definiert eine Reihe von seitenbezogenen Zugriffs- und aktionsbezogenen Berechtigungen.

---

## Rollenübersicht

Die Plattform unterstützt vier Admin-Rollen, jede mit einem progressiv erweiterten Satz an Fähigkeiten:

| Role | Beschreibung | Typischer Anwendungsfall |
|------|-------------|-----------------|
| **Super Admin** | Vollständiger, uneingeschränkter Zugriff auf alle Seiten und Aktionen | Plattformeigentümer, CTO, leitender Administrator |
| **Admin** | Breiter Zugriff auf operative Seiten; kein Zugriff auf Systemeinstellungen oder Admin-Benutzerverwaltung | Plattformmanager, Betriebsleiter |
| **Moderator** | Fokussierter Zugriff auf Inhaltsmoderationsaufgaben (Verifizierung, Paarung, Haustiere) | Community-Manager, Inhaltsüberprüfer |
| **Viewer** | Schreibgeschützter Zugriff auf die meisten Seiten; kann nichts erstellen, bearbeiten oder löschen | Support-Mitarbeiter, Stakeholder, Prüfer |

---

## Berechtigungsstruktur

Berechtigungen werden auf zwei Ebenen definiert:

### 1. Seitenzugriff

Jeder Rolle wird der Zugriff auf bestimmte Seiten gewährt oder verweigert. Wenn eine Rolle keinen Zugriff auf eine Seite hat, erscheint die Seite nicht in der Seitenleisten-Navigation und der direkte URL-Zugriff wird blockiert.

### 2. Aktionsberechtigungen

Innerhalb einer Seite, auf die eine Rolle zugreifen kann, können bestimmte Aktionen aktiviert oder deaktiviert sein. Zum Beispiel kann ein Moderator Haustiere **ansehen**, aber nicht **löschen**.

---

## Berechtigungsmatrix

Die folgende Matrix zeigt genau, was jede Rolle auf jeder Seite tun kann.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Seitensichtbarkeit nach Rolle

Diese Tabelle fasst zusammen, welche Seiten in der Seitenleisten-Navigation für jede Rolle angezeigt werden:

| Seite | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Wie Berechtigungen die UI beeinflussen

Wenn einem Benutzer die Berechtigung für eine bestimmte Aktion fehlt, passt das Admin-Portal die Benutzeroberfläche entsprechend an:

| Szenario | UI-Verhalten |
|----------|-------------|
| Kein Seitenzugriff | Seite aus der Seitenleiste entfernt; URL gibt 403 zurück |
| Nur Ansicht (kein Edit/Delete) | Aktionsschaltflächen ausgeblendet; Tabellenzeilen nicht klickbar zum Bearbeiten |
| Keine Create-Berechtigung | "Create" / "Add"-Schaltfläche ausgeblendet |
| Keine Delete-Berechtigung | Delete-Option aus Aktionsmenüs entfernt |
| Keine Export-Berechtigung | Export-Schaltfläche ausgeblendet |
| Kein Approve/Reject | Verifizierungs-Aktionsschaltflächen ausgeblendet; Status wird schreibgeschützt angezeigt |

> **Hinweis:** Die UI blendet nicht verfügbare Aktionen aus, anstatt deaktivierte Schaltflächen anzuzeigen. Dies hält die Oberfläche übersichtlich und vermeidet Verwirrung darüber, was erlaubt ist und was nicht.

---

## Berechtigungen verwalten

Nur **Super Admin**-Benutzer können Admin-Konten erstellen, bearbeiten oder löschen und deren Berechtigungen ändern.

### Eine Rolle zuweisen

1. Navigieren Sie zu **Admin Users** in der Seitenleiste.
2. Klicken Sie auf **Create Admin User** oder bearbeiten Sie einen bestehenden Benutzer.
3. Wählen Sie die gewünschte Rolle aus dem Rollen-Dropdown.
4. Bei Auswahl von **Super Admin** werden alle Berechtigungen automatisch gewährt und können nicht angepasst werden.
5. Für andere Rollen passen Sie den Seitenzugriff und die Aktionen über den Berechtigungseditor an.

### Benutzerdefinierte Berechtigungen

Obwohl jede Rolle typische Berechtigungen hat, unterstützt das System benutzerspezifische Anpassungen:

- Einem **Admin** kann bei Bedarf Settings-Zugriff gewährt werden.
- Einem **Moderator** kann Analytics-Ansichtszugriff gegeben werden.
- Ein **Viewer** kann auf weniger Seiten als standardmäßig eingeschränkt werden.

Benutzerdefinierte Berechtigungen überschreiben die Rollenstandards. Die Rollenbezeichnung bleibt gleich, aber der tatsächliche Zugriff ist entscheidend.

### Berechtigungseditor

Der Berechtigungseditor zeigt eine Checklisten-Oberfläche an:

1. Jede Seite erscheint als Abschnitt mit einem Schalter für den Seitenzugriff.
2. Wenn der Seitenzugriff aktiviert ist, werden die verfügbaren Aktionen für diese Seite als Kontrollkästchen angezeigt.
3. Aktivieren oder deaktivieren Sie einzelne Aktionen, um die Fähigkeiten des Benutzers fein abzustimmen.
4. Klicken Sie auf **Save**, um Änderungen sofort anzuwenden.

> **Wichtig:** Änderungen an Berechtigungen werden beim nächsten Seitenaufruf des Benutzers wirksam. Wenn der Benutzer derzeit angemeldet ist, sieht er die aktualisierten Berechtigungen nach dem Aktualisieren des Browsers.

---

## Rollenvergleich-Kurzreferenz

### Super Admin
- Kann alles tun
- Einzige Rolle, die Admin-Benutzer und Systemeinstellungen verwalten kann
- Einzige Rolle, die App-Benutzer und Benachrichtigungen löschen kann
- Einzige Rolle, die Benutzerdaten exportieren kann
- Kann nicht gelöscht werden, wenn es das letzte Super Admin-Konto ist

### Admin
- Vollständiger operativer Zugriff auf Inhalts- und Benutzerverwaltung
- Kann Verifizierungen genehmigen/ablehnen
- Kann den Mating Marketplace verwalten
- Kann Benachrichtigungen senden
- Kann nicht auf Settings oder Admin Users-Seiten zugreifen
- Kann App-Benutzer nicht löschen (nur sperren)

### Moderator
- Fokus auf Inhaltsqualität und Community-Sicherheit
- Kann Züchterverifizierungen genehmigen/ablehnen
- Kann Paarungsangebote moderieren
- Kann Haustiere bearbeiten (falsche Informationen korrigieren)
- Kann problematische Benutzer sperren
- Kann nicht auf Analytics, Settings oder Admin Users zugreifen
- Kann keine Inhalte erstellen oder löschen

### Viewer
- Schreibgeschützter Zugriff für Überwachungszwecke
- Kann Dashboards, Benutzer, Haustiere, Analytics einsehen
- Kann keine Daten ändern
- Kann keine Benachrichtigungen senden oder Verifizierungen genehmigen
- Nützlich für Stakeholder, die Einblick ohne Risiko benötigen

---

## Sicherheitshinweise

| Praxis | Beschreibung |
|----------|-------------|
| Minimale Berechtigung | Weisen Sie die minimal notwendige Rolle für die Verantwortlichkeiten des Benutzers zu |
| Regelmäßige Überprüfung | Überprüfen Sie die Admin-Benutzerliste vierteljährlich; deaktivieren Sie ungenutzte Konten |
| Separate Konten | Jeder Administrator sollte sein eigenes Konto haben (keine geteilten Anmeldungen) |
| Super Admin-Begrenzung | Halten Sie die Anzahl der Super Admins auf maximal 2-3 |
| Sperren statt Löschen | Wenn ein Admin ausscheidet, sperren Sie sein Konto anstatt es zu löschen (bewahrt den Prüfpfad) |

---

## Häufig gestellte Fragen

**F: Kann ich eine benutzerdefinierte Rolle erstellen?**
A: Das System hat vier feste Rollen (Super Admin, Admin, Moderator, Viewer). Sie können jedoch die Berechtigungen jedes einzelnen Benutzers unabhängig von seiner Rollenbezeichnung anpassen.

**F: Was passiert, wenn ich den Seitenzugriff für einen Benutzer entferne, der diese Seite gerade betrachtet?**
A: Der Benutzer sieht bei seiner nächsten Navigation oder Seitenaktualisierung einen 403-Fehler. Seine Sitzung wird nicht unterbrochen.

**F: Kann ein Super Admin sich selbst herabstufen?**
A: Ein Super Admin kann seine eigene Rolle ändern, aber das System verhindert das vollständige Entfernen des letzten Super Admin-Kontos.

**F: Beeinflussen Berechtigungen das Benutzerhandbuch?**
A: Nein. Alle Admin-Benutzer können unabhängig von ihrer Rolle oder ihren Berechtigungen auf das Benutzerhandbuch zugreifen. Die Dokumentation ist immer verfügbar.

**F: Kann ich ein Prüfprotokoll der Berechtigungsänderungen einsehen?**
A: Berechtigungsänderungen werden mit einem Zeitstempel und der ID des Administrators, der die Änderung vorgenommen hat, aufgezeichnet. Diese werden in den Feldern `updatedBy` und `updatedAt` jedes Admin-Benutzerdatensatzes gespeichert.
