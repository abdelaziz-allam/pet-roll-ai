# Schnellstart: Super Admin

Willkommen im Petfolioo Admin-Portal. Als Super Admin haben Sie uneingeschraenkten Zugriff auf jede Seite, Aktion und Konfigurationsoption der Plattform. Dieser Leitfaden behandelt Ihren ersten Tag, taegliche Arbeitsablaeufe und Verantwortlichkeiten.

---

## Verfuegbare Seiten

| Seite | Verfuegbare Aktionen |
|-------|---------------------|
| Dashboard | View Plattform-KPIs und Analysen |
| App-Benutzer | View, Create, Edit, Ban, Delete, Export |
| Haustiere | View, Edit, Delete |
| Haustierkategorien | View, Create, Edit, Delete |
| Verifizierung | View, Approve, Reject |
| Paarung | View, Edit, Delete, Moderate |
| Gesundheitszertifikate | View, Approve, Reject |
| Impfanalysen | View, Export |
| Feedback | View, Respond, Delete |
| Blog | View, Create, Edit, Delete |
| Benachrichtigungen | View, Send, Delete |
| Analysen | View, Export |
| Admin-Benutzer | View, Create, Edit, Delete, Manage Permissions |
| Einstellungen | View, Edit |

Sie haben Zugriff auf alles. Keine Seiten sind in Ihrer Seitenleiste ausgeblendet.

---

## Erste Schritte nach der Erstanmeldung

1. **Profil ueberpruefen** - Klicken Sie auf Ihren Avatar oben rechts und bestaetigen Sie, dass Ihre Kontodaten korrekt sind.
2. **Plattformeinstellungen konfigurieren** - Navigieren Sie zu den Einstellungen und ueberpruefen Sie die plattformweite Konfiguration (Branding, Feature-Flags, Benachrichtigungsstandards).
3. **Weitere Admin-Konten erstellen** - Gehen Sie zu Admin-Benutzer und erstellen Sie Konten fuer Ihre Teammitglieder mit den entsprechenden Rollen.
4. **Haustierkategorien anlegen** - Besuchen Sie die Haustierkategorien und stellen Sie sicher, dass die Arten- und Rassentaxonomie fuer Ihre Region eingerichtet ist.
5. **Dashboard ueberpruefen** - Machen Sie sich mit den KPI-Karten vertraut, damit Sie wissen, wie der Normalzustand aussieht.

---

## Taegliche Arbeitsablauf-Checkliste

- [ ] Dashboard auf Plattformzustand und Anomalien pruefen
- [ ] Ausstehende Verifizierungen in der Verifizierungswarteschlange ueberpruefen
- [ ] Feedback auf dringende Benutzerbeschwerden oder Fehlerberichte durchsehen
- [ ] Admin-Benutzerliste auf Zugriffsanfragen oder verdaechtige Konten pruefen
- [ ] Analysen auf Trends bei Benutzerwachstum und Engagement pruefen
- [ ] Paarungsanzeigen auf Moderationsmarkierungen ueberwachen
- [ ] Von anderen Admins gesendete Benachrichtigungen auf Angemessenheit ueberpruefen
- [ ] Einstellungen regelmaessig auf unerwartete Aenderungen pruefen

---

## Hauptverantwortlichkeiten

### Systemkonfiguration
Sie sind die einzige Rolle, die auf die Einstellungsseite zugreifen kann. Dies umfasst Plattform-Branding, Feature-Toggles, API-Schluessel und Benachrichtigungsvorlagen. Ueberpruefen Sie diese vierteljaehrlich oder bei der Einfuehrung neuer Funktionen.

### Benutzerverwaltung
Nur Sie koennen Admin-Konten erstellen, bearbeiten und loeschen. Weisen Sie beim Onboarding neuer Teammitglieder die minimal erforderliche Rolle zu (bevorzugen Sie Moderator oder Viewer, es sei denn, Admin-Zugriff ist tatsaechlich erforderlich).

### Sicherheitsaufsicht
- Halten Sie die Anzahl der Super Admin-Konten auf maximal 2-3.
- Ueberpruefen Sie vierteljaehrlich die Aktivitaet der Admin-Benutzer und sperren Sie ungenutzte Konten.
- Sie sind die einzige Rolle, die App-Benutzer loeschen und Benutzerdaten exportieren kann. Bearbeiten Sie daher DSGVO- und Datenanfragen persoenlich.

### Eskalationspunkt
Andere Rollen eskalieren an Sie, wenn sie Aktionen ausserhalb ihrer Berechtigungen benoetigen: Benutzer loeschen, Daten exportieren, Einstellungen aendern oder Admin-Konten verwalten.

---

## Tipps zur Delegation von Aufgaben

| Aufgabe | Delegieren an |
|---------|---------------|
| Taegliche Verifizierungspruefungen | Admin oder Moderator |
| Paarungsmoderation | Admin oder Moderator |
| Haustierdatenkorrekturen | Admin oder Moderator |
| Plattformbenachrichtigungen senden | Admin |
| Analyseueberwachung und Berichterstattung | Admin oder Viewer |
| Problematische Benutzer sperren | Admin oder Moderator |
| Blog-Inhaltsverwaltung | Admin |

Reservieren Sie Ihre Zeit fuer Aufgaben, die nur Sie ausfuehren koennen: Einstellungsaenderungen, Admin-Benutzerverwaltung, Datenexporte und Sicherheitspruefungen. Je mehr Sie operative Arbeit delegieren, desto mehr Kapazitaet haben Sie fuer strategische Aufsicht.

---

## Hilfe erhalten

Als Rolle mit den hoechsten Berechtigungen ist Ihr Supportweg die technische Dokumentation der Plattform und das Entwicklungsteam. Fuer betriebliche Fragen konsultieren Sie die anderen Seiten dieses Benutzerhandbuchs.

---

*Weiter: [Rollen & Berechtigungen](./roles-permissions.md) - Vollstaendige Uebersicht darueber, was jede Rolle tun kann.*
