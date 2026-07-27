# Impfanalysen

Das Impfanalysen-Modul bietet Administratoren Einblicke in Impftrends auf der gesamten Plattform. Nutzen Sie dieses Dashboard, um zu verstehen, welche Impfstoffe am häufigsten verabreicht werden, regionale Muster zu identifizieren und die Gesamtimpfabdeckung zu verfolgen.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

---

## Dashboard-Überblick

Die Impfanalysen-Seite ist in folgende Bereiche gegliedert:

1. **Zusammenfassende Statistiken** -- Kernmetriken am oberen Rand der Seite
2. **Top 20 Impfstoffe Bestenliste** -- Rangliste der meistverwendeten Impfstoffe
3. **Podiumsvisualisierung** -- Hervorhebung der Top 3 Impfstoffe
4. **Aufschlüsselung pro Impfstoff** -- Artenverteilung für jeden Impfstoff
5. **Top-Standorte** -- Geografische Verteilung pro Impfstoff

---

## Zusammenfassende Statistiken

Am oberen Rand der Analyseseite zeigen drei Statistikkarten aggregierte Metriken:

| Statistikkarte | Beschreibung | Symbol |
|-----------|-------------|------|
| Gesamtimpfungen | Gesamtzahl der Impfaufzeichnungen über alle Tiere | Spritze |
| Einzigartige Impfstoffe | Anzahl unterschiedlicher verabreichter Impfstofftypen | Flasche |
| Geimpfte Tiere | Anzahl einzigartiger Tiere mit mindestens einer Impfung | Pfote |

### Statistiken lesen

- **Gesamtimpfungen** zählt einzelne Impfereignisse (ein Tier erhält einen Impfstoff = 1 Zählung).
- **Einzigartige Impfstoffe** zeigt die Vielfalt der Impfstoffe im System (z.B. Tollwut, SHPPi, RCP zählen jeweils als 1).
- **Geimpfte Tiere** ist dedupliziert -- ein Tier mit 5 Impfungen zählt trotzdem als 1 Tier.

> **Tipp:** Vergleichen Sie Gesamtimpfungen mit Geimpfte Tiere, um die durchschnittliche Anzahl von Impfungen pro Tier auf der Plattform zu verstehen.

---

## Filter

Die Filterleiste gilt für alle Bereiche der Analyseseite gleichzeitig.

### Zeitraumfilter

Wählen Sie einen Zeitraum für die Daten:

| Option | Beschreibung |
|--------|-------------|
| Letzte 7 Tage | Vergangene Woche |
| Letzte 30 Tage | Vergangener Monat |
| Letzte 90 Tage | Vergangenes Quartal |
| Letzte 12 Monate | Vergangenes Jahr |
| Gesamtzeit | Keine Zeitbeschränkung |
| Benutzerdefiniert | Datumsauswahl für Start- und Enddatum |

### Artenfilter

Impfdaten nach Tierart filtern:

- Alle Arten (Standard)
- Hund
- Katze
- Vogel
- Kaninchen
- Andere

### Länderfilter

Wählen Sie ein oder mehrere Länder, um Impfdaten nur aus diesen Regionen zu sehen.

### Stadtfilter

Grenzen Sie die Ergebnisse weiter ein, indem Sie bestimmte Städte innerhalb des gewählten Landes auswählen.

> **Tipp:** Kombinieren Sie Filter, um spezifische Fragen zu beantworten. Beispiel: „Was sind die Top-Impfstoffe für Hunde in Deutschland in den letzten 12 Monaten?"

### Filter anwenden

1. Stellen Sie Ihre gewünschten Filterwerte über die Dropdowns ein.
2. Klicken Sie auf **Filter anwenden** oder die Filter werden automatisch bei Änderung angewendet.
3. Alle Dashboard-Bereiche aktualisieren sich, um die gefilterten Daten widerzuspiegeln.
4. Aktive Filter werden als Tags unterhalb der Filterleiste angezeigt.
5. Klicken Sie auf das **X** eines Filter-Tags, um ihn zu entfernen, oder klicken Sie auf **Alle löschen** zum Zurücksetzen.

---

## Top 20 Impfstoffe Bestenliste

Die Bestenliste zeigt die 20 am häufigsten verabreichten Impfstoffe basierend auf der aktuellen Filterauswahl.

### Tabellenspalten

| Spalte | Beschreibung |
|--------|-------------|
| Rang | Position von 1 bis 20 |
| Impfstoffname | Name des Impfstoffs |
| Anzahl | Anzahl der Verabreichungen |
| Prozentsatz | Anteil an den Gesamtimpfungen |
| Trend | Sparkline, die den Nutzungstrend über den ausgewählten Zeitraum zeigt |

### Bestenliste lesen

1. Impfstoffe sind nach Anzahl absteigend sortiert.
2. Die **Prozentsatz**-Spalte zeigt, welchen Anteil aller Impfungen dieser Impfstoff ausmacht.
3. Die **Trend**-Sparkline gibt einen schnellen visuellen Überblick, ob die Nutzung steigt, stabil ist oder sinkt.
4. Fahren Sie über die Sparkline, um Datenpunktwerte zu sehen.

### Mit der Bestenliste interagieren

- Klicken Sie auf eine beliebige Impfstoffzeile, um zum detaillierten Aufschlüsselungsbereich zu scrollen.
- Verwenden Sie die Spaltenüberschriften zum Neu-Sortieren (obwohl die Standard-Rangfolge am nützlichsten ist).
- Die Tabelle ist paginiert, wenn Filter in seltenen Konfigurationen mehr als 20 Ergebnisse erzeugen.

> **Tipp:** Ein Impfstoff mit steigendem Trend könnte auf eine regionale Ausbruchsreaktion oder eine neue Empfehlung von Veterinärverbänden hinweisen.

---

## Podiumsvisualisierung

Das Podium hebt die Top 3 Impfstoffe in einer visuellen Preisverleihungs-Darstellung hervor.

### Layout

```
        [1.]
   [2.]     [3.]
```

- **1. Platz (Mitte, am höchsten):** Goldfarbene Karte mit dem meistverabreichten Impfstoff.
- **2. Platz (links):** Silberfarbene Karte mit dem zweithäufigsten Impfstoff.
- **3. Platz (rechts):** Bronzefarbene Karte mit dem dritthäufigsten Impfstoff.

### Karteninhalte

Jede Podiumskarte zeigt:

- Rang-Medaillensymbol (Gold, Silber, Bronze)
- Impfstoffname
- Gesamte Verabreichungsanzahl
- Prozentsatz aller Impfungen
- Primäre Art (häufigste Art, die diesen Impfstoff erhält)

### Podium lesen

Das Podium bietet eine Zusammenfassung der Plattform-Impfmuster auf einen Blick. Häufige Ergebnisse umfassen:

- **Hunde:** Tollwut, SHPPi (Staupe/Parvo), Bordetella dominieren oft.
- **Katzen:** RCP, Tollwut, FeLV sind typische Top-Impfstoffe.
- **Gemischte Plattformen:** Tollwut führt oft über alle Arten hinweg.

> **Tipp:** Wenn das Podium nach dem Anwenden von Filtern unerwartete Ergebnisse zeigt, prüfen Sie, ob der Zeitraum- oder Standortfilter eine kleine Stichprobengröße erzeugt, die Rankings verzerren kann.

---

## Artenaufschlüsselung pro Impfstoff

Unterhalb der Bestenliste hat jeder Impfstoff in den Top 20 einen aufklappbaren Bereich, der die Artenverteilung zeigt.

### Aufschlüsselung anzeigen

1. Klicken Sie auf den Erweiterungspfeil neben einem beliebigen Impfstoff in der Bestenliste.
2. Ein horizontales gestapeltes Balkendiagramm erscheint, das die Artenverteilung zeigt.
3. Jedes Segment ist nach Art farbcodiert:
   - Hunde: Blau
   - Katzen: Orange
   - Vögel: Grün
   - Kaninchen: Lila
   - Andere: Grau

### Aufschlüsselungstabelle

Neben dem Balkendiagramm zeigt eine kleine Tabelle:

| Art | Anzahl | Prozentsatz |
|---------|-------|------------|
| Hund | 1.234 | 62% |
| Katze | 456 | 23% |
| Vogel | 200 | 10% |
| Kaninchen | 80 | 4% |
| Andere | 20 | 1% |

### Anwendungsfälle

- Impfstoffe identifizieren, die artspezifisch vs. artenübergreifend sind.
- Ungewöhnliche Muster erkennen (z.B. ein hundespezifischer Impfstoff, der in Katzendaten auftaucht, kann auf Dateneingabefehler hinweisen).
- Die Artenzusammensetzung Ihrer Plattform durch Impfdaten verstehen.

> **Tipp:** Artspezifische Impfstoffe, die unter der falschen Art auftauchen, deuten oft auf Datenqualitätsprobleme hin, die untersucht werden sollten.

---

## Top-Standorte pro Impfstoff

Jeder Impfstoff zeigt auch eine geografische Aufschlüsselung, wo er am häufigsten verabreicht wird.

### Standortdaten anzeigen

1. Klicken Sie auf den Erweiterungspfeil neben einem beliebigen Impfstoff in der Bestenliste.
2. Wechseln Sie zum Tab **Standorte** innerhalb des erweiterten Bereichs.
3. Eine Rangliste der Top 10 Standorte erscheint.

### Standorttabelle

| Rang | Land | Stadt | Anzahl | Prozentsatz |
|------|---------|------|-------|------------|
| 1 | Deutschland | Berlin | 543 | 18% |
| 2 | Vereinigtes Königreich | London | 421 | 14% |
| 3 | Frankreich | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Kartenansicht

Falls verfügbar, zeigt eine Mini-Heatmap die Konzentration von Impfungen geografisch:

- Dunklere Regionen zeigen höhere Impfzahlen an.
- Fahren Sie über eine Region, um die genaue Anzahl zu sehen.
- Klicken Sie auf eine Region, um sie als Standortfilter anzuwenden.

### Anwendungsfälle

- Regionale Impfpräferenzen oder -anforderungen identifizieren.
- Cluster erkennen, die lokalen Veterinärempfehlungen entsprechen könnten.
- Regionale Outreach- oder Partnerschaftskampagnen planen.

> **Tipp:** Einige Impfstoffe sind in bestimmten Ländern gesetzlich vorgeschrieben (z.B. Tollwut in Deutschland). Hohe Konzentrationen in bestimmten Regionen sind bei Pflichtimpfstoffen zu erwarten.

---

## Daten exportieren

Um Impfanalyse-Daten zu exportieren:

1. Klicken Sie auf die Schaltfläche **Export** in der oberen rechten Ecke der Seite.
2. Wählen Sie das Exportformat:
   - **CSV** -- Rohdaten für Tabellenanalyse
   - **PDF** -- Formatierter Bericht mit Diagrammen
3. Der Export berücksichtigt alle derzeit aktiven Filter.
4. Die Datei wird in den Standard-Downloadordner Ihres Browsers heruntergeladen.

### Export-Inhalte

Der CSV-Export umfasst:

- Impfstoffname
- Gesamtanzahl
- Artenaufschlüsselung
- Top-Länder und -Städte
- Trenddatenpunkte
- Verwendete Filterparameter

> **Tipp:** Verwenden Sie CSV-Exporte, um benutzerdefinierte Visualisierungen in Werkzeugen wie Excel oder Google Sheets zu erstellen, oder um Daten mit tierärztlichen Beratungspartnern zu teilen.

---

## Dashboard-Aktualisierung

Analysedaten werden aus Impfaufzeichnungen berechnet und für die Leistung zwischengespeichert.

- Daten werden automatisch alle 24 Stunden aktualisiert.
- Der letzte Aktualisierungszeitstempel wird am unteren Rand der Seite angezeigt.
- Klicken Sie auf das **Aktualisieren**-Symbol neben dem Zeitstempel, um eine manuelle Aktualisierung auszulösen.
- Die manuelle Aktualisierung kann je nach Datenmenge 10-30 Sekunden dauern.

> **Tipp:** Wenn Sie Diskrepanzen zwischen dem Analyse-Dashboard und einzelnen Tierdatensätzen bemerken, versuchen Sie eine manuelle Aktualisierung. Kürzlich hinzugefügte Impfungen erscheinen möglicherweise erst nach der nächsten Cache-Aktualisierung.

---

## Häufig gestellte Fragen

**F: Warum stimmt die Summe in der Bestenliste nicht mit der Zusammenfassungsstatistik überein?**
A: Die Bestenliste zeigt die Top 20 Impfstoffe. Wenn es mehr als 20 einzigartige Impfstoffe gibt, werden die übrigen nicht aufgelistet, zählen aber trotzdem zur Gesamtsumme.

**F: Kann ich Daten für einen bestimmten Züchter oder Besitzer sehen?**
A: Nein. Die Analyseseite zeigt aggregierte Plattformdaten. Individuelle Impfaufzeichnungen sind auf dem Profil jedes Tieres verfügbar.

**F: Warum zeigen einige Impfstoffe keine Trenddaten?**
A: Neue Impfstoffe, die nur einmal erfasst wurden, haben möglicherweise nicht genügend Datenpunkte, um eine aussagekräftige Trendlinie zu generieren.

**F: Wie weit reichen die historischen Daten zurück?**
A: Der Filter „Gesamtzeit" umfasst jeden Impfdatensatz seit Plattformstart. Es gibt kein Datenaufbewahrungslimit für Analysen.

**F: Kann ich zwei Zeiträume vergleichen?**
A: Nicht direkt im Dashboard. Exportieren Sie Daten für zwei verschiedene Zeiträume und vergleichen Sie sie in einer Tabellenkalkulation.
