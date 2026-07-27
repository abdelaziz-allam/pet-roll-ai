# Erste Schritte

Willkommen im Petfolioo Admin-Portal. Diese Anleitung führt Sie durch Ihre erste Anmeldung, erklärt das Interface-Layout und hilft Ihnen zu verstehen, wie die rollenbasierte Zugriffskontrolle bestimmt, was Sie innerhalb der Plattform sehen und tun können.

Das Admin-Portal ist eine webbasierte Verwaltungskonsole für die Petfolioo Tiergesundheits- und Zuchtplattform. Von hier aus können Administratoren Benutzer, Tiere, Kategorien, Gesundheitsdaten, Zuchtprogramme und Plattformeinstellungen verwalten.

![Login Page](/docs/screenshots/login.png)

---

## Anmelden

Das Admin-Portal verwendet E-Mail- und Passwort-Authentifizierung. Nur Konten mit einer zugewiesenen Admin-Rolle können auf das Portal zugreifen.

### Schritte zur Anmeldung

1. Öffnen Sie Ihren Browser und navigieren Sie zur URL des Admin-Portals.
2. Sie sehen die **Anmeldeseite** unter der Route `/login`.
3. Geben Sie Ihre **E-Mail-Adresse** im ersten Feld ein.
4. Geben Sie Ihr **Passwort** im zweiten Feld ein.
5. Klicken Sie auf die Schaltfläche **Anmelden**.
6. Wenn Ihre Anmeldedaten gültig sind und Ihr Konto Admin-Zugriff hat, werden Sie zum **Dashboard** weitergeleitet.

> **Hinweis:** Wenn nach Eingabe gültiger Anmeldedaten ein „Nicht autorisiert"-Fehler erscheint, hat Ihr Konto möglicherweise keine Admin-Rolle zugewiesen. Kontaktieren Sie einen Super-Administrator, um Ihre Rolle aktualisieren zu lassen.

### Passwort zurücksetzen

Wenn Sie Ihr Passwort vergessen haben:

1. Klicken Sie auf der Anmeldeseite auf den Link **Passwort vergessen?** unterhalb des Passwortfeldes.
2. Geben Sie die E-Mail-Adresse ein, die mit Ihrem Admin-Konto verknüpft ist.
3. Klicken Sie auf **Link zum Zurücksetzen senden**.
4. Prüfen Sie Ihren E-Mail-Posteingang auf eine Nachricht zum Zurücksetzen des Passworts von Petfolioo.
5. Klicken Sie auf den Link in der E-Mail, um das Formular zum Zurücksetzen des Passworts zu öffnen.
6. Geben Sie Ihr neues Passwort ein und bestätigen Sie es.
7. Kehren Sie zur Anmeldeseite zurück und melden Sie sich mit Ihren neuen Anmeldedaten an.

> **Tipp:** Links zum Zurücksetzen des Passworts laufen nach 1 Stunde ab. Wenn Ihr Link abgelaufen ist, fordern Sie einen neuen auf der Anmeldeseite an.

---

## Das Dashboard-Layout verstehen

Nach der Anmeldung präsentiert das Admin-Portal ein einheitliches Layout auf allen Seiten.

### Seitenleisten-Navigation

Die linke Seitenleiste enthält das primäre Navigationsmenü. Es beinhaltet Links zu allen Hauptmodulen:

| Menüpunkt | Beschreibung |
|-----------|-------------|
| Dashboard | Plattformübersicht mit KPIs und Analysen |
| Benutzer | App-Benutzer, Rollen und Konten verwalten |
| Tiere | Das Tierregister durchsuchen und verwalten |
| Kategorien | Tierkategorien definieren und verwalten |
| Gesundheitsdaten | Tiergesundheitszertifikate überprüfen |
| Zucht | Zuchtprogramme und Abstammung verwalten |
| Impfungen | Impfaufzeichnungen nachverfolgen |
| Trächtigkeiten | Trächtigkeitsüberwachung einsehen |
| Verifizierungen | Ausstehende Verifizierungsanträge prüfen |
| Einstellungen | Plattformkonfiguration |

Die Seitenleiste kann durch Klicken auf das Umschaltsymbol oben eingeklappt werden, um mehr Bildschirmplatz für Inhaltsbereiche zu schaffen.

### Kopfleiste

Die obere Kopfleiste enthält:

| Element | Position | Zweck |
|---------|----------|---------|
| Suche | Mitte | Globale Suche über Benutzer, Tiere und Datensätze |
| Benachrichtigungsglocke | Rechts | Hinweise auf ausstehende Aktionen und Systemereignisse |
| Profil-Avatar | Ganz rechts | Kontomenü mit Profileinstellungen und Abmeldung |

### Inhaltsbereich

Der Hauptinhaltsbereich nimmt den verbleibenden Platz rechts von der Seitenleiste und unterhalb der Kopfleiste ein. Hier werden Tabellen, Formulare, Detail-Drawer und Analysen angezeigt.

---

## Rollenbasierter Zugriff

Das Admin-Portal setzt eine rollenbasierte Zugriffskontrolle (RBAC) durch. Jedem Admin-Konto wird eine der folgenden Rollen zugewiesen, die bestimmt, welche Aktionen verfügbar sind.

### Rollendefinitionen

| Rolle | Zugriffsebene | Beschreibung |
|------|-------------|-------------|
| `super_admin` | Voll | Vollständiger Zugriff auf alle Module, Einstellungen und Benutzerverwaltung. Kann Admin-Rollen zuweisen und entziehen. |
| `admin` | Hoch | Zugriff auf alle operativen Module. Kann Benutzer, Tiere und Datensätze verwalten. Kann keine Plattformeinstellungen ändern oder super_admin-Rollen zuweisen. |
| `moderator` | Mittel | Kann Inhalte überprüfen und moderieren, Verifizierungen genehmigen und Tiereinträge verwalten. Kann keine Admin-Konten erstellen oder löschen. |
| `viewer` | Nur-Lesen | Kann alle Daten in allen Modulen einsehen, aber keine Datensätze erstellen, bearbeiten oder löschen. Nützlich für Audits und Berichte. |

### Berechtigungsmatrix

| Aktion | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Dashboard ansehen | Ja | Ja | Ja | Ja |
| Benutzer verwalten | Ja | Ja | Nein | Nein |
| Admin-Konten erstellen | Ja | Nein | Nein | Nein |
| Benutzer sperren/entsperren | Ja | Ja | Ja | Nein |
| Tiere verwalten | Ja | Ja | Ja | Nein |
| Verifizierungen genehmigen | Ja | Ja | Ja | Nein |
| Kategorien verwalten | Ja | Ja | Nein | Nein |
| Plattformeinstellungen bearbeiten | Ja | Nein | Nein | Nein |
| Berichte ansehen | Ja | Ja | Ja | Ja |

> **Hinweis:** Wenn ein Navigationselement in Ihrer Seitenleiste nicht sichtbar ist, hat Ihre Rolle keinen Zugriff auf dieses Modul.

---

## Navigationsübersicht

Nachfolgend finden Sie eine vollständige Liste der im Admin-Portal verfügbaren Module, geordnet nach Funktionsbereich.

### Kernmodule

1. **Dashboard** - Plattformgesundheitsübersicht, KPIs und Analysediagramme.
2. **Benutzer** - App-Benutzerverwaltung einschließlich Profile, Rollen und Kontostatus.
3. **Tiere** - Das Tierregister mit vollständigen Detailansichten und Moderationswerkzeugen.
4. **Kategorien** - Kategorisierungssystem für Tierarten/Typen.

### Gesundheit und Datensätze

5. **Gesundheitsdaten** - Gesundheitszertifikate und deren Verifizierungsstatus.
6. **Impfungen** - Impfpläne und Abschlussaufzeichnungen.
7. **Trächtigkeiten** - Trächtigkeitsüberwachung für Zuchttiere.

### Plattformbetrieb

8. **Verifizierungen** - Warteschlange ausstehender Benutzer- und Tier-Verifizierungsanträge.
9. **Zucht** - Zuchtprogrammverwaltung und Abstammungsverfolgung.
10. **Einstellungen** - Plattformweite Konfiguration und Feature-Flags.

---

## Tipps für die Ersteinrichtung

Wenn Sie zum ersten Mal auf das Admin-Portal zugreifen, folgen Sie diesen Empfehlungen zur Orientierung.

### Empfohlene erste Schritte

1. **Profil überprüfen** - Klicken Sie auf Ihren Avatar oben rechts und wählen Sie „Profil", um zu prüfen, ob Ihre Kontodaten korrekt sind.
2. **Dashboard erkunden** - Machen Sie sich mit den KPI-Karten und Analysen vertraut, um aktuelle Plattformmetriken zu verstehen.
3. **Ausstehende Verifizierungen prüfen** - Navigieren Sie zum Modul Verifizierungen, um zu sehen, ob Elemente auf Prüfung warten.
4. **Aktive Benutzer durchsuchen** - Besuchen Sie das Benutzermodul und sortieren Sie nach „Beitrittsdatum" absteigend, um die neuesten Registrierungen zu sehen.
5. **Kategorien überprüfen** - Stellen Sie sicher, dass die Tierkategorien für Ihre Region korrekt konfiguriert sind.

### Browser-Empfehlungen

Das Admin-Portal funktioniert am besten mit modernen Browsern:

| Browser | Mindestversion |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Tipp:** Aktivieren Sie Browser-Benachrichtigungen, wenn Sie dazu aufgefordert werden, um Echtzeit-Hinweise für ausstehende Verifizierungen und wichtige Systemereignisse zu erhalten.

### Tastaturkürzel

| Kürzel | Aktion |
|----------|--------|
| `/` | Globale Suchleiste fokussieren |
| `Esc` | Offene Drawer und Modals schließen |

---

## Fehlerbehebung bei Anmeldeproblemen

| Problem | Lösung |
|---------|----------|
| Fehler „Ungültige Anmeldedaten" | Überprüfen Sie Ihre E-Mail und Ihr Passwort. Nutzen Sie bei Bedarf die Passwort-vergessen-Funktion. |
| Meldung „Konto deaktiviert" | Ihr Konto wurde deaktiviert. Kontaktieren Sie einen Super-Administrator. |
| Seite lädt, aber Anmeldeformular ist leer | Löschen Sie Ihren Browser-Cache und Cookies, dann laden Sie die Seite neu. |
| Weiterleitung zurück zur Anmeldung nach dem Einloggen | Ihre Sitzung ist möglicherweise abgelaufen. Versuchen Sie, sich erneut anzumelden. Wenn das Problem anhält, prüfen Sie, ob Cookies aktiviert sind. |

---

## Hilfe erhalten

Wenn Sie auf Probleme stoßen, die in dieser Anleitung nicht behandelt werden:

1. Prüfen Sie die anderen Abschnitte dieses Benutzerhandbuchs für modulspezifische Hilfe.
2. Kontaktieren Sie den Super-Administrator Ihrer Organisation bei Rollen- und Zugriffsproblemen.
3. Bei technischen Problemen wenden Sie sich an das Plattform-Support-Team.

---

*Weiter: [Dashboard](./dashboard.md) - Erfahren Sie mehr über die Analysen und KPI-Übersicht.*
