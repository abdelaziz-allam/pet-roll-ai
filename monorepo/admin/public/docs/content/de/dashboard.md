# Dashboard

Das Dashboard ist der erste Bildschirm, den Sie nach der Anmeldung im Petfolioo Admin-Portal sehen. Es bietet einen Echtzeit-Überblick über die Plattformgesundheit durch Key Performance Indicators (KPIs), interaktive Diagramme und aktuelle Aktivitäts-Feeds. Nutzen Sie das Dashboard, um Wachstumstrends zu beobachten, Bereiche zu identifizieren, die Aufmerksamkeit benötigen, und das Plattform-Engagement auf einen Blick zu verfolgen.

![Dashboard](/docs/screenshots/dashboard.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View |
> | Admin | View |
> | Moderator | View |
> | Viewer | View |

---

## KPI-Karten

Am oberen Rand des Dashboards zeigen vier Zusammenfassungskarten die wichtigsten Metriken der Plattform an. Jede Karte zeigt die aktuelle Gesamtzahl und einen prozentualen Veränderungsindikator im Vergleich zum vorherigen Zeitraum.

### Kartendefinitionen

| Karte | Metrik | Beschreibung |
|------|--------|-------------|
| Gesamtbenutzer | Anzahl registrierter App-Benutzer | Alle Benutzer, die ein Konto auf der Plattform erstellt haben |
| Gesamttiere | Anzahl registrierter Tiere | Alle zum Register hinzugefügten Tiere unabhängig vom Status |
| Ausstehende Verifizierungen | Elemente, die auf Prüfung warten | Verifizierungsanträge, die noch nicht genehmigt oder abgelehnt wurden |
| Aktive Einträge | Derzeit sichtbare Einträge | Tiere, die als verfügbar für Zucht oder Adoption markiert sind |

### Wachstumsprozentsatz

Jede KPI-Karte beinhaltet einen Wachstumsindikator:

- Ein **grüner Pfeil nach oben** mit Prozentangabe zeigt Wachstum im Vergleich zum vorherigen Zeitraum an.
- Ein **roter Pfeil nach unten** mit Prozentangabe zeigt einen Rückgang im Vergleich zum vorherigen Zeitraum an.
- Der Vergleichszeitraum entspricht dem ausgewählten Zeitbereich (siehe Zeitbereich-Selektor unten).

> **Tipp:** Fahren Sie mit der Maus über eine KPI-Karte, um die genauen Zahlen für den aktuellen und vorherigen Zeitraum in einem Tooltip zu sehen.

### Karten lesen

1. Die **große Zahl** ist die aktuelle Gesamtanzahl.
2. Das **Prozent-Badge** darunter zeigt die Veränderung von Periode zu Periode.
3. Die **Beschriftung** oben identifiziert die angezeigte Metrik.
4. Klicken Sie auf eine beliebige Karte, um direkt zum entsprechenden Modul zu navigieren (z.B. öffnet ein Klick auf „Gesamtbenutzer" die Benutzerliste).

---

## Zeitbereich-Selektor

Der Zeitbereich-Selektor steuert das Datenfenster für alle Dashboard-Analysen und KPI-Vergleiche.

### Verfügbare Bereiche

| Option | Zeitraum | Vergleich mit |
|--------|--------|--------------------|
| 7d | Letzte 7 Tage | Vorherige 7 Tage |
| 30d | Letzte 30 Tage | Vorherige 30 Tage |
| 90d | Letzte 90 Tage | Vorherige 90 Tage |
| Gesamtzeit | Seit Plattformstart | Kein Vergleich (Wachstumsprozentsatz ausgeblendet) |

### Zeitbereich ändern

1. Finden Sie den **Zeitbereich-Selektor** im oberen rechten Bereich des Dashboards, oberhalb der KPI-Karten.
2. Klicken Sie auf eine der Periodenoptionen: **7d**, **30d**, **90d** oder **Gesamtzeit**.
3. Das gesamte Dashboard wird aktualisiert, um den ausgewählten Zeitraum widerzuspiegeln.
4. KPI-Wachstumsprozentsätze werden basierend auf dem neuen Vergleichsfenster neu berechnet.

> **Hinweis:** Die Option „Gesamtzeit" blendet Wachstumsprozentsätze aus, da kein vorheriger Zeitraum zum Vergleich vorhanden ist.

---

## Tier-Analysebereich

Unterhalb der KPI-Karten präsentiert der Tier-Analysebereich visuelle Aufschlüsselungen der Tierregisterdaten. Drei Diagrammtypen bieten verschiedene Perspektiven auf die Tierpopulation.

### Artenverteilung (Kreisdiagramm)

Das Kreisdiagramm zeigt die proportionale Aufschlüsselung der Tiere nach Art.

| Element | Beschreibung |
|---------|-------------|
| Diagrammtyp | Donut-/Kreisdiagramm |
| Datenquelle | Alle registrierten Tiere gruppiert nach Art |
| Segmente | Ein Segment pro Art (z.B. Hund, Katze, Vogel, Kaninchen, Reptil) |
| Beschriftungen | Artname und Anzahl werden beim Überfahren angezeigt |
| Legende | Farbcodierte Legende unterhalb oder neben dem Diagramm |

**Interaktion mit dem Kreisdiagramm:**

1. Fahren Sie über ein beliebiges Segment, um die genaue Anzahl und den Prozentsatz für diese Art zu sehen.
2. Klicken Sie auf ein Segment, um andere Dashboard-Diagramme nur auf diese Art zu filtern.
3. Die Legendeneinträge sind klickbar - klicken Sie auf einen Artnamen, um dessen Sichtbarkeit im Diagramm umzuschalten.

### Geschlechterverteilung (Balkendiagramm)

Das vertikale Balkendiagramm zeigt die Verteilung der Tiere nach Geschlecht.

| Element | Beschreibung |
|---------|-------------|
| Diagrammtyp | Vertikales Balkendiagramm |
| X-Achse | Geschlechtskategorien (Männlich, Weiblich, Unbekannt) |
| Y-Achse | Tieranzahl |
| Balken | Ein Balken pro Geschlecht, farbcodiert |
| Beschriftungen | Anzahl über jedem Balken angezeigt |

**Geschlechterdiagramm lesen:**

1. Jeder Balken repräsentiert eine Geschlechtskategorie.
2. Die Höhe des Balkens entspricht der Gesamtzahl der Tiere dieses Geschlechts.
3. Die genaue Anzahl wird als Beschriftung über jedem Balken angezeigt.
4. Fahren Sie mit der Maus darüber für zusätzliche Details einschließlich Prozentsatz des Gesamten.

### Länderverteilung (Horizontales Balkendiagramm)

Das horizontale Balkendiagramm rangiert Länder nach der Anzahl registrierter Tiere.

| Element | Beschreibung |
|---------|-------------|
| Diagrammtyp | Horizontales Balkendiagramm |
| Y-Achse | Ländernamen (sortiert nach Anzahl, absteigend) |
| X-Achse | Tieranzahl |
| Balken | Ein horizontaler Balken pro Land |
| Anzeige | Standardmäßig werden die Top 10 Länder angezeigt |

**Länderdiagramm lesen:**

1. Länder sind von den meisten Tieren (oben) bis zu den wenigsten (unten) sortiert.
2. Standardmäßig werden nur die Top 10 Länder angezeigt.
3. Fahren Sie über einen Balken, um die genaue Anzahl und den Prozentsatz des Gesamten zu sehen.
4. Die Balkenlänge ist proportional zur Anzahl relativ zu anderen Ländern.

---

## Geo- und Artenfilter

Oberhalb der Analysediagramme ermöglichen Filtersteuerungen die Eingrenzung der angezeigten Daten.

### Verfügbare Filter

| Filter | Typ | Optionen |
|--------|------|---------|
| Art | Dropdown-Auswahl | Alle auf der Plattform verfügbaren Arten (z.B. Hund, Katze, Vogel usw.) |
| Land | Dropdown-Auswahl | Alle Länder mit registrierten Tieren |

### Filter anwenden

1. Klicken Sie auf das **Art**-Dropdown, um eine bestimmte Tierart auszuwählen.
2. Klicken Sie auf das **Land**-Dropdown, um ein bestimmtes Land auszuwählen.
3. Diagramme und Tabellen darunter werden sofort aktualisiert, um den Filter widerzuspiegeln.
4. Filter können kombiniert werden - wählen Sie sowohl eine Art als auch ein Land, um die Ergebnisse weiter einzugrenzen.
5. Zum Zurücksetzen wählen Sie „Alle" in jedem Dropdown oder klicken Sie auf die Schaltfläche **Filter zurücksetzen**.

> **Tipp:** Verwenden Sie den Artenfilter in der Kreisdiagramm-Ansicht, um in die Rassenverteilungen innerhalb einer einzelnen Art einzutauchen.

### Filterverhalten

| Szenario | Auswirkung |
|----------|--------|
| Keine Filter ausgewählt | Alle Daten werden global angezeigt |
| Nur Art ausgewählt | Diagramme zeigen Daten für diese Art über alle Länder |
| Nur Land ausgewählt | Diagramme zeigen Daten für alle Arten in diesem Land |
| Beide ausgewählt | Diagramme zeigen Daten für die ausgewählte Art im ausgewählten Land |

---

## Tabelle der letzten Benutzerregistrierungen

Unterhalb der Analysediagramme zeigt eine Tabelle die neuesten Benutzerregistrierungen auf der Plattform.

### Tabellenspalten

| Spalte | Beschreibung |
|--------|-------------|
| Avatar | Benutzer-Profilbild-Miniatur |
| Name | Anzeigename des Benutzers |
| E-Mail | Registrierte E-Mail-Adresse des Benutzers |
| Beitrittsdatum | Datum und Uhrzeit der Kontoerstellung |
| Status | Kontostatus (Aktiv, Ausstehend, Gesperrt) |
| Tiere | Anzahl der von diesem Benutzer registrierten Tiere |

### Tabellenfunktionen

1. **Sortierung** - Klicken Sie auf eine beliebige Spaltenüberschrift, um nach dieser Spalte zu sortieren. Klicken Sie erneut, um die Sortierrichtung umzukehren.
2. **Paginierung** - Die Tabelle zeigt standardmäßig 10 Einträge pro Seite. Verwenden Sie die Paginierungssteuerungen am unteren Rand zum Navigieren.
3. **Schnellaktionen** - Fahren Sie über eine Zeile, um eine „Ansehen"-Schaltfläche zu zeigen, die den Benutzerdetail-Drawer öffnet.

### Statusindikatoren verstehen

| Status | Badge-Farbe | Bedeutung |
|--------|-------------|---------|
| Aktiv | Grün | Konto ist in gutem Zustand und voll funktionsfähig |
| Ausstehend | Orange | Konto erstellt, aber E-Mail noch nicht verifiziert |
| Gesperrt | Rot | Konto wurde von einem Administrator gesperrt |

> **Hinweis:** Die Tabelle der letzten Registrierungen zeigt immer die neuesten Benutzer zuerst, unabhängig von der Einstellung des Zeitbereich-Selektors. Sie zeigt Registrierungen der letzten 30 Tage an.

---

## Dashboard Best Practices

### Tägliche Überwachungs-Checkliste

1. Prüfen Sie die **Ausstehende Verifizierungen** KPI-Karte - eine hohe Zahl kann auf einen Rückstau hinweisen.
2. Überprüfen Sie die **Wachstumsprozentsätze** auf allen vier Karten auf unerwartete Rückgänge.
3. Scannen Sie die Tabelle **Letzte Benutzerregistrierungen** auf verdächtige Konten.
4. Beachten Sie signifikante Verschiebungen im **Länderverteilungs**-Diagramm.

### Trends interpretieren

| Trend | Mögliche Bedeutung | Empfohlene Maßnahme |
|-------|-------------------|-------------------|
| Plötzlicher Anstieg der Registrierungen | Erfolg einer Marketingkampagne oder Bot-Aktivität | Überprüfen Sie aktuelle Benutzer auf verdächtige Muster |
| Rückgang aktiver Einträge | Saisonale Veränderung oder Richtlinienproblem | Überprüfen Sie aktuelle Sperraktionen und Ablauf von Einträgen |
| Viele ausstehende Verifizierungen | Unterbesetzte Moderation | Weisen Sie zusätzliche Moderatoren zu |
| Verschiebung der Artenbalance | Regionaler Trend oder Kategoriefehlkonfiguration | Überprüfen Sie die Kategorieeinstellungen |

---

## Dashboard-Leistung

Das Dashboard lädt Daten asynchron. Jeder Bereich lädt unabhängig:

1. **KPI-Karten** laden zuerst (schnellste Abfrage).
2. **Diagramme** laden als nächstes mit einem kurzen Lade-Spinner.
3. **Tabelle der letzten Registrierungen** lädt zuletzt.

Wenn ein Bereich einen Ladefehler anzeigt:

1. Prüfen Sie Ihre Internetverbindung.
2. Versuchen Sie, die Seite zu aktualisieren.
3. Wenn der Fehler bestehen bleibt, hat der Backend-Dienst möglicherweise Probleme.

> **Tipp:** Das Dashboard aktualisiert sich automatisch alle 5 Minuten. Sie können manuell aktualisieren, indem Sie auf das Aktualisierungssymbol in der Kopfleiste klicken oder `F5` drücken.

---

*Zurück: [Erste Schritte](./getting-started.md) | Weiter: [Tierregister](./pets.md)*
