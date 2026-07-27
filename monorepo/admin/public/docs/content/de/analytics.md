# Analysen

Die Analyseseite bietet visuelle Einblicke in die Plattformnutzung, das Benutzerwachstum, Tier-Demografien und Gesundheitsaktivitäten. Nutzen Sie diese Diagramme, um Trends zu verstehen, Engagement zu messen und datengestützte Entscheidungen über die Petfolioo-Plattform zu treffen.

![Analytics](/docs/screenshots/analytics.png)

> **Access:** Super Admin, Admin, Viewer
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | No access |
> | Viewer | View only |

---

## Überblick

Das Analyse-Dashboard präsentiert vier primäre Visualisierungen zusammen mit einem Zeitbereich-Selektor, der das Datenfenster für alle Diagramme steuert. Jedes Diagramm aktualisiert sich dynamisch, wenn Sie den ausgewählten Zeitbereich ändern.

---

## Zugriff auf Analysen

1. Klicken Sie auf **Analysen** im Seitenleisten-Navigationsmenü.
2. Das Dashboard lädt mit allen Diagrammen auf einer einzelnen scrollbaren Seite.
3. Der Standard-Zeitbereich ist **30 Tage**.

---

## Zeitbereich-Selektor

Am oberen Rand der Analyseseite ermöglicht ein Zeitbereich-Selektor die Steuerung des Datenzeitraums, der über alle Diagramme hinweg angezeigt wird.

### Verfügbare Bereiche

| Option | Zeitraum | Geeignet für |
|--------|--------|----------|
| **7d** | Letzte 7 Tage | Überwachung aktueller Aktivitäten und kurzfristiger Trends |
| **30d** | Letzte 30 Tage | Monatsberichte und allgemeine Trendanalyse (Standard) |
| **90d** | Letzte 90 Tage | Quartalsüberprüfungen und mittelfristige Mustererkennung |
| **1 Jahr** | Letzte 365 Tage | Jahresüberprüfungen, saisonale Muster und langfristiges Wachstum |

### Zeitbereich ändern

1. Finden Sie den Zeitbereich-Selektor am oberen Rand der Seite.
2. Klicken Sie auf eine der Bereichsschaltflächen: **7d**, **30d**, **90d** oder **1 Jahr**.
3. Die ausgewählte Schaltfläche wird hervorgehoben, um den aktiven Bereich anzuzeigen.
4. Alle Diagramme auf der Seite aktualisieren sich, um Daten für den gewählten Zeitraum anzuzeigen.
5. Diagrammachsen und Beschriftungen passen sich automatisch an das neue Zeitfenster an.

> **Tipp:** Beginnen Sie mit 30d für einen allgemeinen Überblick, grenzen Sie dann auf 7d ein, um aktuelle Anomalien zu untersuchen, oder erweitern Sie auf 1 Jahr für Berichte auf Vorstandsebene.

---

## Benutzerwachstumsdiagramm

### Diagrammtyp

Liniendiagramm, das Benutzerregistrierungstrends über die Zeit zeigt.

### Was es zeigt

Das Benutzerwachstumsdiagramm visualisiert die Anzahl neuer Benutzerregistrierungen über den ausgewählten Zeitraum. Jeder Datenpunkt repräsentiert die kumulative oder tägliche Anzahl neuer Benutzer.

### Diagramm lesen

| Element | Beschreibung |
|---------|-------------|
| **X-Achse** | Zeit (Tage oder Wochen je nach ausgewähltem Bereich) |
| **Y-Achse** | Anzahl neuer Benutzerregistrierungen |
| **Linie** | Eine durchgehende Linie, die Datenpunkte verbindet und die Wachstumstrajektorie zeigt |
| **Datenpunkte** | Überfahrbare Markierungen auf der Linie, die genaue Werte zeigen |
| **Tooltip** | Erscheint beim Überfahren und zeigt Datum und genaue Registrierungsanzahl |

### Daten interpretieren

1. **Aufwärtstrend** -- Konsistentes Wachstum der Benutzergewinnung. Die Plattform zieht stetig neue Benutzer an.
2. **Flache Linie** -- Benutzergewinnung hat ein Plateau erreicht. Erwägen Sie Marketingmaßnahmen oder Feature-Launches, um das Wachstum wieder anzukurbeln.
3. **Spitzen** -- Plötzliche Anstiege können mit Marketingkampagnen, Presseberichterstattung oder App-Store-Features korrelieren.
4. **Einbrüche** -- Rückgänge bei täglichen Registrierungen können auf saisonale Muster oder technische Probleme hinweisen.

### Zeitbereich-Verhalten

| Bereich | X-Achsen-Granularität | Hinweise |
|-------|-------------------|-------|
| 7d | Täglich | Jeder Tag einzeln angezeigt |
| 30d | Täglich | Jeder Tag angezeigt, gut für die Identifikation wöchentlicher Muster |
| 90d | Wöchentlich | Daten nach Wochen aggregiert für bessere Lesbarkeit |
| 1 Jahr | Monatlich | Daten nach Monaten aggregiert für die Jahrestrajektorie |

> **Tipp:** Vergleichen Sie die 7d-Ansicht mit der 30d-Ansicht. Wenn der Trend der letzten 7 Tage über dem 30-Tage-Durchschnitt liegt, beschleunigt sich das Wachstum.

---

## Artenverteilungsdiagramm

### Diagrammtyp

Kreisdiagramm (oder Donut-Diagramm), das den Anteil der Tiere nach Art zeigt.

### Was es zeigt

Das Artenverteilungsdiagramm schlüsselt alle registrierten Tiere nach ihrer Artkategorie auf und zeigt den relativen Anteil jeder Art.

### Diagramm lesen

| Element | Beschreibung |
|---------|-------------|
| **Segmente** | Jedes Segment repräsentiert eine Art (z.B. Hund, Katze, Vogel, Kaninchen) |
| **Farben** | Jeder Art ist eine eindeutige Farbe zur Identifikation zugeordnet |
| **Beschriftungen** | Artname und Prozentsatz auf oder neben jedem Segment angezeigt |
| **Legende** | Eine Legende ordnet Farben Artnamen zu |
| **Tooltip** | Fahren Sie über ein Segment, um genaue Anzahl und Prozentsatz zu sehen |

### Daten interpretieren

1. **Dominante Art** -- Das größte Segment zeigt den primären Tiertyp Ihrer Benutzerbasis an. Nutzen Sie dies zur Priorisierung von Funktionen.
2. **Kleine Segmente** -- Arten mit sehr kleinen Prozentsätzen können auf Wachstumspotenzial in unterversorgten Segmenten hinweisen.
3. **Balance** -- Eine ungefähr gleichmäßige Verteilung deutet auf breite Attraktivität über Tierbesitzertypen hinweg hin.

### Anwendungsfälle

- **Feature-Priorisierung** -- Wenn 70% der Tiere Hunde sind, priorisieren Sie hundespezifische Funktionen.
- **Inhaltsplanung** -- Erstellen Sie Bildungsinhalte proportional zur Artenverteilung.
- **Marketing-Targeting** -- Verstehen Sie, welche Zielgruppensegmente am größten sind für Werbekampagnen.
- **Benachrichtigungs-Targeting** -- Die Zielgruppensegmente in Benachrichtigungen (Hundebesitzer, Katzenbesitzer) korrelieren direkt mit diesem Diagramm.

> **Tipp:** Wenn Sie bemerken, dass eine Art schneller als andere wächst (vergleichen Sie 30d vs. 1 Jahr), erwägen Sie, in artspezifische Funktionen zu investieren, um den Trend zu nutzen.

---

## Beliebte Rassen Diagramm

### Diagrammtyp

Horizontales Balkendiagramm, das die beliebtesten Rassen rangiert.

### Was es zeigt

Das Beliebte-Rassen-Diagramm zeigt die meistregistrierten Rassen auf der Plattform, nach Anzahl rangiert. Balken erstrecken sich horizontal, was den Vergleich der Beliebtheit über Rassen hinweg erleichtert.

### Diagramm lesen

| Element | Beschreibung |
|---------|-------------|
| **Y-Achse** | Rassennamen, geordnet von beliebtester (oben) zu am wenigsten beliebter (unten) |
| **X-Achse** | Anzahl registrierter Tiere dieser Rasse |
| **Balken** | Horizontale Balken, deren Länge die Anzahl der Tiere repräsentiert |
| **Beschriftungen** | Zahlenwert am Ende jedes Balkens angezeigt |
| **Tooltip** | Fahren Sie für genaue Anzahl und Prozentsatz des Gesamten darüber |

### Daten interpretieren

1. **Top-Rassen** -- Die längsten Balken repräsentieren die häufigsten Rassen auf der Plattform. Diese Benutzer sind Ihre Kernzielgruppe.
2. **Langer Schwanz** -- Viele Rassen mit kleinen Zahlen zeigen vielfältige Benutzerinteressen.
3. **Rassenkonzentration** -- Wenn wenige Rassen dominieren (z.B. Top 3 machen 50%+ aus), hat Ihre Plattform eine konzentrierte Benutzerbasis.

### Typische Erkenntnisse

| Muster | Erkenntnis | Aktion |
|---------|---------|--------|
| Golden Retriever dominiert | Große Familienhund-Zielgruppe | Funktionen für mittelgroße/große Hunderassen priorisieren |
| Perserkatze in Top 5 | Starkes Katzenbesitzer-Segment | In katzenspezifische Gesundheitsverfolgung investieren |
| Exotische Rassen erscheinen | Nischenzüchter kommen hinzu | Erwägen Sie züchterspezifische Premium-Funktionen |
| Gleichmäßige Verteilung | Vielfältige Benutzerbasis | Allgemeine statt rassenspezifischer Funktionen bauen |

### Diagrammgrenzen

- Das Diagramm zeigt standardmäßig die **Top 10-15 Rassen**.
- Verbleibende Rassen werden unter „Andere" gruppiert, falls zutreffend.
- Die Anzahl sichtbarer Rassen kann je nach Zeitbereich variieren.

> **Tipp:** Vergleichen Sie beliebte Rassen mit Gesundheitsaktivitätsdaten. Wenn eine beliebte Rasse niedrige Gesundheitsdatenaktivität hat, benötigen diese Benutzer möglicherweise Engagement-Anstöße.

---

## Gesundheitsaktivitätsdiagramm

### Diagrammtyp

Gruppiertes Balkendiagramm, das gesundheitsbezogene Aktivitäten nach Typ kategorisiert zeigt.

### Was es zeigt

Das Gesundheitsaktivitätsdiagramm zeigt das Volumen gesundheitsbezogener Aktionen auf der Plattform, gruppiert nach Aktivitätstyp. Dies hilft Ihnen zu verstehen, wie aktiv Benutzer die Gesundheitsfunktionen nutzen.

### Diagramm lesen

| Element | Beschreibung |
|---------|-------------|
| **X-Achse** | Zeiträume (Tage, Wochen oder Monate je nach Bereich) |
| **Y-Achse** | Anzahl der Gesundheitsaktivitäten |
| **Balkengruppen** | Mehrere Balken pro Zeitraum, einer für jeden Aktivitätstyp |
| **Farben** | Jeder Aktivitätstyp hat eine eindeutige Farbe |
| **Legende** | Ordnet Farben Aktivitätstypen zu (Impfungen, Untersuchungen, Medikamente usw.) |
| **Tooltip** | Fahren Sie für genaue Anzahl pro Aktivitätstyp pro Zeitraum darüber |

### Aktivitätstypen

| Aktivität | Beschreibung | Farbe (typisch) |
|----------|-------------|-----------------|
| **Impfungen** | Impfaufzeichnungen erstellt oder aktualisiert | Blau |
| **Gesundheitsdaten** | Allgemeine Gesundheitsdaten protokolliert | Grün |
| **Gewichtsverfolgung** | Gewichtsmessungen aufgezeichnet | Orange |
| **Medikamente** | Medikamenteneinträge hinzugefügt | Lila |

### Daten interpretieren

1. **Hohe Impfbalken** -- Benutzer verfolgen aktiv Impfungen. Das Erinnerungssystem treibt wahrscheinlich das Engagement.
2. **Niedrige Gesundheitsdaten-Balken** -- Benutzer sind sich der Gesundheitsdatenfunktion möglicherweise nicht bewusst. Erwägen Sie In-App-Aufforderungen.
3. **Saisonale Muster** -- Einige Gesundheitsaktivitäten haben saisonale Spitzen (z.B. Flohbehandlungen im Frühling).
4. **Wachsende Balken über die Zeit** -- Akzeptanz der Gesundheitsfunktionen nimmt zu, was gutes Benutzerengagement anzeigt.
5. **Sinkende Balken** -- Benutzer verlieren möglicherweise das Interesse oder stoßen auf Reibung beim Protokollieren von Gesundheitsdaten.

### Aktivitätstypen vergleichen

Das gruppierte Format ermöglicht den visuellen Vergleich:

- Welche Gesundheitsfunktionen am meisten genutzt vs. untergenutzt sind.
- Ob ein Aktivitätstyp wächst, während andere sinken.
- Wie verschiedene Zeitbereiche unterschiedliche Muster offenbaren.

> **Tipp:** Wenn die Impfaktivität hoch, aber andere Gesundheitsverfolgung niedrig ist, erwägen Sie funktionsübergreifende Aufforderungen: „Sie haben eine Impfung protokolliert -- möchten Sie auch Rex' Gewicht aufzeichnen?"

---

## Dashboard-Layout

Die vier Diagramme sind auf der Analyseseite in einem Rasterlayout angeordnet:

```
+---------------------------+---------------------------+
|                           |                           |
|    Benutzerwachstum       |    Artenverteilung        |
|    (Liniendiagramm)       |    (Kreisdiagramm)        |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Beliebte Rassen        |    Gesundheitsaktivität   |
|    (Horizontaler Balken)  |    (Gruppierter Balken)   |
|                           |                           |
+---------------------------+---------------------------+
```

Jedes Diagramm befindet sich auf einer Karte mit:
- Einem Titel-Header
- Der Diagrammvisualisierung
- Interaktiven Tooltips beim Überfahren
- Responsiver Größenanpassung, die sich an die Bildschirmbreite anpasst

---

## Mit Diagrammen interagieren

### Hover-Tooltips

1. Bewegen Sie Ihren Cursor über einen beliebigen Datenpunkt, Balken oder Diagrammsegment.
2. Ein Tooltip erscheint mit:
   - Dem genauen Wert
   - Der Beschriftung (Datum, Rassenname, Art usw.)
   - Prozentsatz wo zutreffend

### Responsives Verhalten

1. Auf größeren Bildschirmen werden Diagramme in einem 2x2-Raster angezeigt.
2. Auf kleineren Bildschirmen werden Diagramme vertikal gestapelt für bessere Lesbarkeit.
3. Diagrammelemente skalieren proportional.

### Datenaktualisierung

1. Analysedaten werden beim Laden der Seite aktualisiert.
2. Das Ändern des Zeitbereichs löst einen neuen Datenabruf aus.
3. Es gibt keine automatische Aktualisierung -- laden Sie die Seite manuell neu für die aktuellsten Daten.

---

## Häufige Analyse-Workflows

### Monatsbericht

1. Wählen Sie den **30d**-Zeitbereich.
2. Notieren Sie den Benutzerwachstumstrend (steigend, flach oder sinkend).
3. Prüfen Sie die Artenverteilung auf Verschiebungen.
4. Überprüfen Sie Beliebte Rassen auf aufkommende Trends.
5. Untersuchen Sie die Gesundheitsaktivität auf Engagement-Niveau.
6. Erstellen Sie Screenshots oder exportieren Sie Daten für Berichte.

### Einen Einbruch untersuchen

1. Beginnen Sie mit **30d**, um zu identifizieren, wann der Einbruch auftrat.
2. Wechseln Sie zu **7d**, um den jüngsten Zeitraum im Detail zu untersuchen.
3. Prüfen Sie, ob der Einbruch korreliert mit:
   - Einem Systemproblem (prüfen Sie Einstellungen > Wartungsmodus-Verlauf)
   - Einer gesendeten Benachrichtigung (prüfen Sie Benachrichtigungsverlauf)
   - Einem saisonalen Muster (vergleichen Sie mit 1-Jahr-Ansicht)

### Quartalsüberprüfung

1. Wählen Sie den **90d**-Zeitbereich.
2. Vergleichen Sie die Wachstumstrajektorie mit vorherigen Quartalen.
3. Identifizieren Sie, welche Gesundheitsaktivitäten am meisten gewachsen sind.
4. Notieren Sie neue Rassen, die im Beliebte-Rassen-Diagramm erscheinen.
5. Nutzen Sie die Artenverteilung zur Validierung der Marketing-Strategieausrichtung.

### Jahresplanung

1. Wählen Sie den **1 Jahr**-Zeitbereich.
2. Identifizieren Sie saisonale Muster im Benutzerwachstum (z.B. Feiertagsspitzen).
3. Verfolgen Sie jährliche Veränderungen in der Rassenbeliebtheit.
4. Messen Sie die Akzeptanz der Gesundheitsfunktionen über das gesamte Jahr.
5. Nutzen Sie Erkenntnisse für die Produkt-Roadmap.

---

## Datenaktualität verstehen

| Aspekt | Detail |
|--------|--------|
| Datenquelle | Plattformdatenbank (aggregiert) |
| Aktualisierungshäufigkeit | Echtzeit beim Seitenladen |
| Historische Genauigkeit | Vollständig seit Plattformstart |
| Zeitzone | Serverzeit (UTC) |
| Fehlende Daten | Lücken werden als Nullwerte angezeigt, nicht interpoliert |

---

## Fehlerbehebung

| Problem | Lösung |
|-------|----------|
| Diagramme laden nicht | Prüfen Sie Ihre Netzwerkverbindung. Aktualisieren Sie die Seite. |
| Daten erscheinen veraltet | Analysen laden beim Seitenbesuch. Navigieren Sie weg und kehren Sie zurück, oder aktualisieren Sie. |
| Nullwerte für alle Metriken | Überprüfen Sie, ob der ausgewählte Zeitbereich Daten enthält. Versuchen Sie, auf 1 Jahr zu erweitern. |
| Diagramm-Tooltips erscheinen nicht | Versuchen Sie einen anderen Browser. Stellen Sie sicher, dass JavaScript aktiviert ist. |
| Zeitbereich ändert sich nicht | Klicken Sie direkt auf die Bereichsschaltfläche. Wenn nicht reagierend, aktualisieren Sie die Seite. |
| Kein Zugriff auf Analysen | Überprüfen Sie, ob Ihre Rolle und Berechtigungen den Analyseseiten-Zugriff einschließen. |

---

## Verwandte Seiten

- [Einstellungen](./settings.md) -- Plattformeinstellungen konfigurieren, die das Benutzerverhalten beeinflussen
- [Benachrichtigungen](./notifications.md) -- Benachrichtigungen senden, die Engagement-Metriken beeinflussen können
- [Feedback](./feedback.md) -- Benutzerfeedback mit Analysetrends korrelieren
- [Admin-Benutzer](./admin-users.md) -- Analysezugriff für Teammitglieder gewähren
