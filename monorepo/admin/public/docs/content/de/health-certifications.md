# Gesundheitszertifikate

Das Gesundheitszertifikate-Modul ermöglicht es Administratoren, von Tierärzten oder Tierbesitzern eingereichte Gesundheitszertifikate zu verwalten und zu verifizieren. Dies stellt sicher, dass auf der Plattform gelistete Tiere über gültige, aktuelle Gesundheitsdokumentation verfügen.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Zertifikate-Tabelle

Die Hauptansicht zeigt alle Gesundheitszertifikat-Einreichungen in einer Datentabelle.

| Spalte | Beschreibung |
|--------|-------------|
| Tiername | Name des Tieres, dem das Zertifikat gehört |
| Tierarztinfo | Name des Tierarztes und Klinik |
| Standort | Land und Stadt, wo das Zertifikat ausgestellt wurde |
| Zertifikatsdatum | Datum der Ausstellung des Zertifikats durch den Tierarzt |
| Dokumente | Anzahl der beigefügten Zertifikatsdokumente |
| Status | Aktuelles Zertifikatsstatus-Badge |

### Tabellenaktionen

- Klicken Sie auf eine beliebige Zeile, um den **Detail-Drawer** auf der rechten Seite zu öffnen.
- Verwenden Sie die Aktionsschaltflächen in der letzten Spalte für schnelles Genehmigen/Ablehnen.
- Sortieren Sie nach einer beliebigen Spalte durch Klicken auf die Spaltenüberschrift.

---

## Filter

Die Filterleiste oberhalb der Tabelle bietet vier Filteroptionen:

### Statusfilter

Zertifikate nach ihrem aktuellen Status filtern:

| Status | Badge-Farbe | Beschreibung |
|--------|-------------|-------------|
| Ausstehend | Orange | Wartet auf Admin-Prüfung |
| Genehmigt | Grün | Zertifikat verifiziert und aktiv |
| Abgelehnt | Rot | Zertifikat hat die Prüfung nicht bestanden |
| Widerrufen | Dunkelrot | Zuvor genehmigtes Zertifikat für ungültig erklärt |
| Abgelaufen | Grau | Gültigkeitszeitraum des Zertifikats ist abgelaufen |

### Artenfilter

Nach Tierart filtern:

- Hund
- Katze
- Vogel
- Kaninchen
- Andere

### Länderfilter

Wählen Sie ein oder mehrere Länder, um nach dem Ausstellungsort des Zertifikats zu filtern.

### Stadtfilter

Grenzen Sie weiter ein, indem Sie bestimmte Städte innerhalb des gewählten Landes auswählen.

> **Tipp:** Filter sind kombinierbar. Filtern Sie beispielsweise nach Status: Ausstehend + Art: Hund + Land: Deutschland, um alle ausstehenden Hundezertifikate aus Deutschland zu sehen.

---

## Detail-Drawer

Ein Klick auf eine Zertifikatszeile öffnet einen Detail-Drawer auf der rechten Seite des Bildschirms. Der Drawer enthält umfassende Informationen, die in Abschnitte gegliedert sind.

### Statusbanner

Am oberen Rand des Drawers zeigt ein farbiges Banner:

- Aktuellen Status mit Badge-Symbol
- Datum der letzten Statusänderung
- Name des Admins, der das Zertifikat zuletzt bearbeitet hat (falls zutreffend)
- Ablehnungs- oder Widerrufsgrund (falls zutreffend, in einem Warnhinweis angezeigt)

### Tierinformationen

| Feld | Beschreibung |
|-------|-------------|
| Tiername | Registrierter Name des Tieres |
| Art | Art des Tieres |
| Rasse | Rasse des Tieres |
| Geburtsdatum | Geburtsdatum des Tieres |
| Mikrochip-ID | Eindeutige Mikrochip-Kennung (falls vorhanden) |
| Besitzer | Name des Tierbesitzers mit Link zu seinem Profil |

### Tierärztliche Details

| Feld | Beschreibung |
|-------|-------------|
| Tierarztname | Vollständiger Name des ausstellenden Tierarztes |
| Klinikname | Name der Tierklinik |
| Klinikadresse | Vollständige Adresse der Klinik |
| Lizenznummer | Professionelle Lizenznummer des Tierarztes |
| Telefon | Kontakttelefonnummer der Klinik |
| E-Mail | Kontakt-E-Mail der Klinik (falls angegeben) |

> **Tipp:** Überprüfen Sie die Lizenznummer gegen die Tierarzt-Lizenzdatenbank Ihres Landes, wenn Sie Zertifikate von unbekannten Kliniken prüfen.

### Gültigkeitsfortschrittsbalken

Unterhalb der tierärztlichen Details visualisiert ein Fortschrittsbalken den Gültigkeitszeitraum des Zertifikats:

1. Der Balken spannt sich vom **Zertifikatsdatum** (Anfang) bis zum **Ablaufdatum** (Ende).
2. Das aktuelle Datum wird durch eine Markierung auf dem Balken angezeigt.
3. Farbcodierung:
   - **Grün:** Mehr als 30 Tage verbleibend
   - **Gelb:** 30 Tage oder weniger verbleibend
   - **Rot:** Abgelaufen
4. Der Prozentsatz der verbrauchten Gültigkeit wird als Text angezeigt.

### Dokumentenraster

Der Dokumentenbereich zeigt hochgeladene Zertifikatsdateien in einem Rasterlayout.

1. Jedes Dokument wird als Miniaturkarte mit dem Dateinamen darunter angezeigt.
2. Klicken Sie auf ein beliebiges Miniaturbild, um das **Bildvorschau**-Overlay zu öffnen.
3. Im Vorschau-Overlay:
   - Verwenden Sie Zoom-Steuerungen, um Details zu prüfen.
   - Navigieren Sie zwischen Dokumenten mit Links-/Rechts-Pfeilen.
   - Laden Sie die Originaldatei über die Download-Schaltfläche herunter.
   - Drücken Sie **Escape**, um die Vorschau zu schließen.
4. Unterstützte Formate: JPEG, PNG, PDF.

> **Tipp:** Achten Sie auf offizielle Tierarztstempel, Unterschriften und Lizenznummern auf Zertifikatsdokumenten. Generische oder Vorlagen-Dokumente ohne diese Elemente sollten zur Ablehnung markiert werden.

---

## Ein Zertifikat genehmigen

Um ein Gesundheitszertifikat zu genehmigen:

1. Öffnen Sie den Zertifikatsdetail-Drawer durch Klicken auf die Zeile.
2. Überprüfen Sie die tierärztlichen Details auf Vollständigkeit und Plausibilität.
3. Prüfen Sie alle hochgeladenen Dokumente im Dokumentenraster.
4. Klicken Sie auf die Schaltfläche **Genehmigen** am unteren Rand des Drawers.
5. Im Bestätigungsdialog:
   - Überprüfen Sie die Zusammenfassung dessen, was Sie genehmigen.
   - Das Ablaufdatum wird automatisch basierend auf dem Zertifikatstyp berechnet.
   - Klicken Sie auf **Bestätigen**.

### Genehmigungs-Checkliste

Vor der Genehmigung überprüfen:

- [ ] Tierarztname und Lizenznummer sind vorhanden
- [ ] Klinikdetails sind vollständig und überprüfbar
- [ ] Dokumente sind lesbar und enthalten offizielle Stempel/Unterschriften
- [ ] Zertifikatsdatum ist aktuell (innerhalb der letzten 12 Monate)
- [ ] Tierinformationen auf dem Dokument stimmen mit dem Plattformdatensatz überein
- [ ] Keine Anzeichen von Dokumentenmanipulation oder Fälschung

### Was nach der Genehmigung passiert

- Der Zertifikatsstatus ändert sich zu **Genehmigt**.
- Ein Gültigkeitszeitraum wird basierend auf dem Zertifikatstyp festgelegt.
- Das Tierprofil zeigt ein Gesundheitszertifikats-Badge an.
- Der Besitzer erhält eine Benachrichtigung zur Bestätigung der Genehmigung.
- Der Gültigkeitsfortschrittsbalken wird im Detail-Drawer aktiv.

---

## Ein Zertifikat ablehnen

Um ein Gesundheitszertifikat abzulehnen:

1. Öffnen Sie den Zertifikatsdetail-Drawer.
2. Identifizieren Sie das/die Problem(e) bei der Einreichung.
3. Klicken Sie auf die Schaltfläche **Ablehnen** am unteren Rand des Drawers.
4. Im Ablehnungsdialog:
   - Geben Sie einen **Ablehnungsgrund** im Textbereich ein. Dieses Feld ist erforderlich.
   - Seien Sie spezifisch darüber, was korrigiert werden muss.
5. Klicken Sie auf **Ablehnung bestätigen**.

### Häufige Ablehnungsgründe

| Grund | Beispielnachricht |
|--------|----------------|
| Unleserliche Dokumente | „Das hochgeladene Dokument ist zu unscharf zum Lesen. Bitte laden Sie einen klareren Scan oder ein Foto hoch." |
| Fehlende Tierarztdetails | „Das Zertifikat enthält nicht die Lizenznummer des Tierarztes. Bitte reichen Sie mit vollständigen Tierarzt-Anmeldedaten erneut ein." |
| Abgelaufenes Zertifikat | „Dieses Zertifikat wurde vor mehr als 12 Monaten ausgestellt. Bitte beschaffen und laden Sie ein aktuelles Zertifikat hoch." |
| Nicht übereinstimmende Tierinfo | „Der Tiername auf dem Zertifikat stimmt nicht mit dem registrierten Tiernamen überein. Bitte überprüfen und erneut einreichen." |
| Unvollständige Dokumente | „Nur Seite 1 von 3 wurde hochgeladen. Bitte laden Sie alle Seiten des Zertifikats hoch." |

### Was nach der Ablehnung passiert

- Der Zertifikatsstatus ändert sich zu **Abgelehnt**.
- Der Ablehnungsgrund wird dem Tierbesitzer angezeigt.
- Der Besitzer erhält eine Benachrichtigung mit dem Grund.
- Der Besitzer kann ein neues Zertifikat einreichen, um das abgelehnte zu ersetzen.

> **Tipp:** Geben Sie immer handlungsorientiertes Feedback. Sagen Sie dem Besitzer genau, was zu beheben ist, damit er das Problem in einer erneuten Einreichung korrigieren kann.

---

## Ein Zertifikat widerrufen

Der Widerruf wird verwendet, wenn ein zuvor genehmigtes Zertifikat als ungültig, betrügerisch oder nicht mehr zutreffend erkannt wird.

1. Navigieren Sie zum Zertifikat (filtern Sie bei Bedarf nach Status: Genehmigt).
2. Öffnen Sie den Detail-Drawer.
3. Klicken Sie auf die Schaltfläche **Widerrufen** (nur bei genehmigten Zertifikaten sichtbar).
4. Im Widerrufsdialog:
   - Geben Sie den **Grund für den Widerruf** ein. Dieses Feld ist erforderlich.
   - Bestätigen Sie, dass diese Aktion sofort wirksam wird und nicht rückgängig gemacht werden kann.
5. Klicken Sie auf **Widerruf bestätigen**.

### Wann widerrufen

- Betrügerische Dokumentation nach der Genehmigung entdeckt
- Tierarztlizenz als ungültig oder widerrufen erkannt
- Tierbesitzer meldet, dass das Zertifikat irrtümlich eingereicht wurde
- Aufsichtsbehörde markiert das Zertifikat

### Was nach dem Widerruf passiert

- Das Gesundheitszertifikats-Badge wird sofort aus dem Tierprofil entfernt.
- Der Zertifikatsstatus ändert sich zu **Widerrufen**.
- Der Widerrufsgrund wird gespeichert und im Detail-Drawer sichtbar.
- Der Besitzer wird per E-Mail und In-App-Benachrichtigung informiert.
- Der Besitzer muss ein neues Zertifikat einreichen, wenn er das Badge wiederherstellen möchte.

> **Tipp:** Der Widerruf ist eine schwerwiegende Aktion, die die Vertrauenssignale des Tieres auf der Plattform beeinflusst. Stellen Sie sicher, dass Sie ausreichende Beweise haben, bevor Sie fortfahren.

---

## Gültigkeit und Ablauf verstehen

Gesundheitszertifikate haben einen definierten Gültigkeitszeitraum, der bestimmt, wie lange das Zertifikat nach der Genehmigung aktiv bleibt.

### Wie die Gültigkeit funktioniert

1. Wenn ein Zertifikat genehmigt wird, berechnet das System ein Ablaufdatum.
2. Der Gültigkeitszeitraum hängt vom Zertifikatstyp ab:
   - Allgemeines Gesundheitszertifikat: 12 Monate
   - Impfzertifikat: Variiert je nach Impfplan
   - Zuchtfähigkeitszertifikat: 6 Monate
3. Der **Gültigkeitsfortschrittsbalken** im Detail-Drawer zeigt die verbleibende Zeit visuell an.

### Ablaufbenachrichtigungen

Das System sendet automatische Benachrichtigungen bei nahendem Ablauf:

| Tage vor Ablauf | Benachrichtigung |
|-------------------|--------------|
| 30 Tage | Erste Erinnerung an den Besitzer zur Erneuerung |
| 14 Tage | Zweite Erinnerung mit Dringlichkeit |
| 7 Tage | Letzte Warnung |
| 0 Tage | Benachrichtigung über abgelaufenes Zertifikat |

### Nach dem Ablauf

- Der Zertifikatsstatus ändert sich automatisch zu **Abgelaufen**.
- Das Gesundheits-Badge wird vom Tierprofil entfernt.
- Das abgelaufene Zertifikat bleibt im Verlauf zur Referenz erhalten.
- Der Besitzer kann jederzeit ein neues Zertifikat einreichen.

> **Tipp:** Überwachen Sie die Zertifikatetabelle gefiltert nach „Genehmigt" und sortiert nach Ablaufdatum, um proaktiv Zertifikate zu identifizieren, die in Ihrer Region bald ablaufen.

---

## Massenaktionen

Für effiziente Verarbeitung mehrerer Zertifikate:

1. Verwenden Sie die Kontrollkästchen auf der linken Seite der Tabelle, um mehrere Zeilen auszuwählen.
2. Die Massenaktionsleiste erscheint oben in der Tabelle.
3. Verfügbare Massenaktionen:
   - **Alle genehmigen** -- Genehmigt alle ausgewählten ausstehenden Zertifikate mit Standard-Ablauf.
   - **Export** -- Lädt ausgewählte Zertifikate als CSV-Bericht herunter.

> **Tipp:** Massengenehmigung sollte nur verwendet werden, wenn Sie die Dokumente jedes ausgewählten Zertifikats einzeln überprüft haben. Genehmigen Sie niemals massenhaft ohne Dokumentenprüfung.

---

## Häufig gestellte Fragen

**F: Kann ich das Ablaufdatum eines genehmigten Zertifikats bearbeiten?**
A: Nein. Um den Ablauf zu ändern, müssen Sie das aktuelle Zertifikat widerrufen und den Besitzer bitten, erneut einzureichen.

**F: Was wenn ein Zertifikatsdokument in einer Sprache ist, die ich nicht lesen kann?**
A: Eskalieren Sie an einen Admin, der diese Sprache liest, oder bitten Sie den Besitzer, eine beglaubigte Übersetzung bereitzustellen.

**F: Kann ein Tier mehrere aktive Zertifikate haben?**
A: Ja. Ein Tier kann sowohl ein allgemeines Gesundheitszertifikat als auch spezifische Impfzertifikate gleichzeitig aktiv haben.

**F: Wer erhält die Ablehnungs-/Widerrufsbenachrichtigungen?**
A: Der registrierte Besitzer des Tieres erhält alle Benachrichtigungen per E-Mail und In-App-Nachricht.
