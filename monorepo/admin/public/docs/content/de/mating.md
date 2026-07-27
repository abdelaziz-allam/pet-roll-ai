# Zuchtmarktplatz

Das Zuchtmarktplatz-Modul bietet Administratoren einen Überblick über das Zuchtpaarungssystem der Plattform. Überwachen Sie Paarungsanfragen, verfolgen Sie erfolgreiche Paarungen und sehen Sie Leistungsrankings der Züchter ein.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Navigations-Tabs

Die Zuchtmarktplatz-Seite ist in zwei Haupt-Tabs organisiert:

| Tab | Beschreibung |
|-----|-------------|
| Paarungen & Anfragen | Alle Zuchtpaarungen und ausstehende Anfragen anzeigen und verwalten |
| Züchter-Rankings | Bestenlisten der leistungsstärksten Züchter |

Wechseln Sie zwischen den Tabs durch Klicken auf den Tab-Header oben auf der Seite.

---

## Tab Paarungen & Anfragen

Dieser Tab zeigt alle Zuchtpaarungen als visuelle Karten und bietet einen intuitiven Überblick über die Zuchtaktivität auf der Plattform.

### Paarungskarten

Jede Paarung wird als Karte dargestellt, die zwei Tiere mit einem visuellen Herz-Verbinder zeigt.

#### Kartenlayout

```
+------------------------------------------+
|  [Tier A Foto]  <3  [Tier B Foto]       |
|  Tier A Name         Tier B Name         |
|  Rasse               Rasse               |
|  Besitzer            Besitzer            |
|                                          |
|  Status: [Badge]     Erstellt: [Datum]   |
|  Art: [Tag]          Standort: [Stadt]   |
+------------------------------------------+
```

#### Karteninformationen

| Element | Beschreibung |
|---------|-------------|
| Tierfotos | Profilfotos beider Tiere in der Paarung |
| Herz-Verbinder | Visuelle Verbindung zwischen den zwei Tieren (animiert bei aktiven Paarungen) |
| Tiernamen | Namen beider Tiere |
| Rassen | Rasseninformationen für jedes Tier |
| Besitzer | Besitzernamen (klickbar zum Anzeigen der Profile) |
| Status-Badge | Aktueller Paarungsstatus |
| Erstellungsdatum | Wann die Paarungsanfrage erstellt wurde |
| Art-Tag | Art der Tiere |
| Standort | Stadt/Land des Eintrags |

### Paarungsstatus

| Status | Badge-Farbe | Beschreibung |
|--------|-------------|-------------|
| Ausstehend | Orange | Paarungsanfrage gesendet, wartet auf Antwort |
| Akzeptiert | Grün | Beide Parteien haben der Paarung zugestimmt |
| Abgelehnt | Rot | Eine Partei hat die Paarung abgelehnt |
| Abgeschlossen | Blau | Paarung als abgeschlossen bestätigt |
| Abgebrochen | Grau | Paarung wurde von einer Partei abgebrochen |
| Abgelaufen | Hellgrau | Anfrage ist ohne Antwort abgelaufen |

---

## Filter

Die Filterleiste ermöglicht es Ihnen, die angezeigten Paarungen einzugrenzen.

### Statusfilter

Wählen Sie einen oder mehrere Status zur Anzeige:

1. Klicken Sie auf das **Status**-Dropdown.
2. Aktivieren Sie die Status, die Sie sehen möchten.
3. Das Kartenraster aktualisiert sich sofort.

### Artenfilter

Paarungen nach Tierart filtern:

- Alle Arten (Standard)
- Hund
- Katze
- Vogel
- Kaninchen
- Andere

### Länderfilter

Wählen Sie ein oder mehrere Länder zum Filtern nach Paarungsstandort.

### Stadtfilter

Grenzen Sie weiter ein, indem Sie bestimmte Städte auswählen.

> **Tipp:** Verwenden Sie Status: Akzeptiert + Ihr Land, um erfolgreiche Paarungen in Ihrer Region zu sehen, die die Aktion „Hochzeitskarte senden" benötigen könnten.

---

## Detail-Drawer

Klicken Sie auf eine beliebige Paarungskarte, um den Detail-Drawer auf der rechten Seite des Bildschirms zu öffnen.

### Tierfotos-Bereich

Am oberen Rand des Drawers werden größere Versionen beider Tierfotos nebeneinander mit dem Herz-Verbinder dazwischen angezeigt.

- Klicken Sie auf ein Foto, um es in voller Größe zu sehen.
- Blättern Sie durch weitere Fotos, wenn das Tier eine Galerie hat.

### Eintragsinformationen

| Feld | Beschreibung |
|-------|-------------|
| Eintrags-ID | Eindeutige Kennung für den Paarungseintrag |
| Erstellt von | Welcher Tierbesitzer den Eintrag initiiert hat |
| Erstellungsdatum | Datum, an dem der Eintrag erstmals veröffentlicht wurde |
| Paarungsdatum | Datum, an dem die Paarung vorgeschlagen wurde |
| Antwortdatum | Datum, an dem die Paarung akzeptiert/abgelehnt wurde (falls zutreffend) |
| Art | Art beider Tiere |
| Rassen | Detaillierte Rasseninformationen |
| Standort | Vollständige Standortdetails |
| Notizen | Eventuelle Notizen des Eintragsbesitzers |

### Paarungszeitleiste

Der Drawer enthält eine chronologische Zeitleiste der Ereignisse:

1. **Eintrag erstellt** -- Besitzer hat den Zuchtanzeige seines Tieres veröffentlicht
2. **Paarung vorgeschlagen** -- Der Matching-Algorithmus oder eine manuelle Anfrage hat die Paarung initiiert
3. **Paarung angesehen** -- Die andere Partei hat den Paarungsvorschlag angesehen
4. **Antwort gegeben** -- Annahme/Ablehnung mit Zeitstempel
5. **Abschluss verzeichnet** -- Wenn die Paarung als abgeschlossen bestätigt wurde
6. **Hochzeitskarte gesendet** -- Wenn der Admin eine Glückwunschbenachrichtigung gesendet hat

Jedes Zeitleistenereignis zeigt:

- Datum und Uhrzeit
- Akteur (System, Besitzer A, Besitzer B oder Admin)
- Ereignisbeschreibung
- Zusätzliche Notizen (falls vorhanden)

> **Tipp:** Die Zeitleiste hilft Ihnen, den vollständigen Kontext einer Paarung zu verstehen, wenn Sie Streitigkeiten oder von Benutzern gemeldete Probleme untersuchen.

---

## Hochzeitskarte senden

Die Aktion „Hochzeitskarte senden" ermöglicht es Administratoren, eine Glückwunschbenachrichtigung an beide Tierbesitzer zu senden, wenn eine Paarung akzeptiert oder abgeschlossen wird.

### So senden Sie eine Hochzeitskarte

1. Öffnen Sie den Detail-Drawer für eine **akzeptierte** oder **abgeschlossene** Paarung.
2. Klicken Sie auf die Schaltfläche **Hochzeitskarte senden** am unteren Rand des Drawers.
3. Im Dialog:
   - Vorschau der Benachrichtigungsnachricht (automatisch generiert mit beiden Tiernamen).
   - Optional eine persönliche Glückwunschnachricht hinzufügen.
   - Empfänger überprüfen (beide Tierbesitzer).
4. Klicken Sie auf **Senden**.

### Was die Hochzeitskarte enthält

- Glückwunsch-Header mit beiden Tiernamen
- Tierfotos mit dekorativen Elementen arrangiert
- Paarungsdatum und Standort
- Persönliche Admin-Nachricht (falls angegeben)
- Link zur Paarungsdetailseite

### Wann senden

- Nachdem eine Paarung akzeptiert wurde und beide Parteien bestätigen, dass sie fortfahren.
- Nachdem eine Paarung als abgeschlossen markiert wurde.
- Nur einmal pro Paarung (die Schaltfläche wird nach dem Senden deaktiviert).

> **Tipp:** Hochzeitskarten sind ein Community-Engagement-Werkzeug. Das Senden bei akzeptierten Paarungen fördert die Plattformteilnahme und schafft eine positive Erfahrung für Züchter.

---

## Tab Züchter-Rankings

Der Tab Züchter-Rankings zeigt die aktivsten und erfolgreichsten Züchter auf der Plattform.

### Gesamt Top 10 Podium

Am oberen Rand des Rankings-Tabs hebt eine Podiumsvisualisierung die Top 10 Züchter über alle Arten hervor.

#### Podiumslayout

```
              [1.]
        [2.]       [3.]
   [4.]  [5.]  [6.]  [7.]
      [8.]   [9.]   [10.]
```

Jede Podiumsposition zeigt:

- Züchtername
- Zwingername
- Profilfoto
- Gesamtpaarungen
- Erfolgsrate in Prozent

#### Podiumsbewertung

Züchter werden nach einer zusammengesetzten Punktzahl bewertet, basierend auf:

| Faktor | Gewichtung | Beschreibung |
|--------|--------|-------------|
| Gesamtpaarungen | 30% | Anzahl initiierter oder erhaltener Paarungen |
| Erfolgsrate | 40% | Prozentsatz der Paarungen, die den Status Akzeptiert/Abgeschlossen erreicht haben |
| Aktive Einträge | 15% | Anzahl derzeit aktiver Zuchtanzeigen |
| Antwortzeit | 15% | Durchschnittliche Zeit bis zur Antwort auf Paarungsvorschläge |

### Artspezifische Top 10 Übersicht

Unterhalb des Gesamtpodiums zeigt ein Raster die Top 10 Züchter für jede Art separat.

#### Rasterlayout

Jede Art hat ihre eigene Karte:

```
+-------------------+  +-------------------+  +-------------------+
|   Hunde Top 10    |  |   Katzen Top 10   |  |   Vögel Top 10   |
| 1. Züchtername    |  | 1. Züchtername    |  | 1. Züchtername    |
| 2. Züchtername    |  | 2. Züchtername    |  | 2. Züchtername    |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Jeder Eintrag im Artenraster zeigt:

- Rangposition
- Züchtername
- Zwingername
- Paarungsanzahl für diese Art
- Erfolgsrate für diese Art

> **Tipp:** Artspezifische Rankings helfen, spezialisierte Züchter zu identifizieren, die ausgezeichnete Kandidaten für Plattformpartnerschaften oder hervorgehobene Einträge sein könnten.

---

## Sortierbare Rankings-Tabelle

Unterhalb der visuellen Rankings bietet eine vollständige Datentabelle detaillierte Züchterstatistiken.

### Tabellenspalten

| Spalte | Sortierbar | Beschreibung |
|--------|----------|-------------|
| Rang | Ja | Aktuelle Position basierend auf Standard-Bewertung |
| Züchtername | Ja | Vollständiger Name des Züchters |
| Zwinger | Ja | Zwingername |
| Paarungen | Ja | Gesamtzahl der Paarungen (initiiert + erhalten) |
| Einträge | Ja | Anzahl erstellter Zuchtanzeigen |
| Erfolgsrate | Ja | Prozentsatz der Paarungen, die den Status Akzeptiert/Abgeschlossen erreicht haben |
| Aufrufe | Ja | Gesamtaufrufe ihrer Zuchtanzeigen |
| Art | Nein | Primäre Art, die sie züchten |
| Standort | Nein | Land und Stadt |

### Tabelle sortieren

1. Klicken Sie auf eine sortierbare Spaltenüberschrift, um aufsteigend zu sortieren.
2. Klicken Sie erneut, um absteigend zu sortieren.
3. Ein dritter Klick entfernt die Sortierung dieser Spalte.
4. Sie können nach mehreren Spalten sortieren (halten Sie Shift gedrückt und klicken).

### Tabelleninteraktionen

- Klicken Sie auf eine Züchterzeile, um deren vollständiges Profil und Paarungsverlauf anzuzeigen.
- Verwenden Sie die Suchleiste oberhalb der Tabelle, um einen bestimmten Züchter zu finden.
- Exportieren Sie die Tabellendaten mit der Schaltfläche **CSV exportieren**.

> **Tipp:** Sortieren Sie nach Erfolgsrate absteigend, um Züchter zu identifizieren, die konsistent erfolgreiche Paarungen erzielen. Diese Züchter könnten von Premium-Funktionen oder beschleunigter Verifizierung profitieren.

---

## Paarungsmetriken verstehen

### Berechnung der Erfolgsrate

```
Erfolgsrate = (Akzeptierte + Abgeschlossene Paarungen) / Gesamtpaarungen x 100
```

- Nur Paarungen, bei denen der Züchter der Eintragsbesitzer war, zählen für seine Erfolgsrate.
- Abgelehnte und abgelaufene Paarungen reduzieren die Erfolgsrate.
- Abgebrochene Paarungen werden aus der Berechnung ausgeschlossen.

### Aufrufe-Metrik

Die Aufrufe-Zählung repräsentiert:

- Gesamte einzigartige Aufrufe aller aktiven Zuchtanzeigen eines Züchters.
- Zählt nicht die eigenen Aufrufe des Züchters.
- Wird pro Eintrag zurückgesetzt (nicht kumulativ über gelöschte Einträge).

### Aktivitätsbewertung

Das Gesamtranking berücksichtigt die Aktualität:

- Paarungen der letzten 90 Tage werden 2x gewichtet.
- Paarungen von 90-180 Tagen werden 1x gewichtet.
- Paarungen älter als 180 Tage werden 0,5x gewichtet.

> **Tipp:** Ein Züchter mit hohen Aufrufen aber niedriger Erfolgsrate hat möglicherweise attraktive Einträge, ist aber zu selektiv oder reagiert zu langsam. Erwägen Sie, Kontakt aufzunehmen, um seine Erfahrungen zu verstehen.

---

## Häufig gestellte Fragen

**F: Kann ich manuell eine Paarung zwischen zwei Tieren erstellen?**
A: Nein. Paarungen werden von Tierbesitzern über die App erstellt. Administratoren können nur bestehende Paarungen überwachen und Aktionen durchführen.

**F: Was passiert mit Paarungsdaten, wenn ein Tier gelöscht wird?**
A: Der Paarungsdatensatz wird zu historischen Zwecken aufbewahrt, aber mit einem „Tier entfernt"-Indikator markiert. Die Paarung kann nicht weiter fortschreiten.

**F: Kann ich einen Züchter aus den Rankings entfernen?**
A: Rankings werden automatisch berechnet. Um einen Züchter zu entfernen, muss sein Konto gesperrt oder seine Verifizierung widerrufen werden, was ihn von den Rankings ausschließt.

**F: Wie oft werden die Rankings aktualisiert?**
A: Rankings werden alle 24 Stunden neu berechnet. Der Zeitstempel der letzten Aktualisierung wird oben im Rankings-Tab angezeigt.

**F: Kann ich eine Hochzeitskarte für eine abgelehnte Paarung senden?**
A: Nein. Die Schaltfläche „Hochzeitskarte senden" ist nur für Paarungen mit dem Status Akzeptiert oder Abgeschlossen verfügbar.

**F: Was ist, wenn beide Tiere in einer Paarung demselben Besitzer gehören?**
A: Das System verhindert Paarungen desselben Besitzers. Wenn Sie eine sehen, deutet dies auf ein Datenintegritätsproblem hin, das dem Entwicklungsteam gemeldet werden sollte.
