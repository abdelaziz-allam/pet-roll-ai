# Züchterverifizierung

Das Züchterverifizierungsmodul ermöglicht es Administratoren, Züchterverifizierungsanträge zu prüfen, zu genehmigen, abzulehnen und zu widerrufen. Verifizierte Züchter erhalten ein Vertrauens-Badge, das für Käufer sichtbar ist und signalisiert, dass ihre Zucht den Plattformstandards entspricht.

![Verification](/docs/screenshots/verification.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Approve, Reject |
> | Admin | View, Approve, Reject |
> | Moderator | View, Approve, Reject |
> | Viewer | View only |

---

## Verifizierungsanträge-Tabelle

Die Hauptansicht zeigt alle Verifizierungseinreichungen in einer durchsuchbaren, sortierbaren Tabelle.

| Spalte | Beschreibung |
|--------|-------------|
| Züchtername | Vollständiger Name des Züchters, der den Antrag eingereicht hat |
| Zwinger | Registrierter Zwingername des Züchters |
| Einreichungs-Nr. | Automatisch inkrementierte Einreichungsnummer (erneute Einreichungen erhalten eine neue Nummer) |
| Dokumentenanzahl | Anzahl der hochgeladenen Dokumente, die der Einreichung beigefügt sind |
| Status | Aktuelles Verifizierungsstatus-Badge |
| Ablauf | Verifizierungsablaufdatum (nur bei genehmigten Einreichungen angezeigt) |

### Tabelle filtern

1. Verwenden Sie das **Status**-Dropdown zum Filtern nach: Ausstehend, Genehmigt, Abgelehnt, Widerrufen oder Abgelaufen.
2. Verwenden Sie das **Suche**-Feld, um einen Züchter nach Name oder Zwinger zu finden.
3. Klicken Sie auf eine beliebige Spaltenüberschrift, um aufsteigend oder absteigend zu sortieren.

> **Tipp:** Die Standardansicht zeigt ausstehende Einreichungen zuerst, damit Sie neue Anträge priorisieren können.

---

## Status-Workflow

Verifizierungsanträge folgen einem definierten Lebenszyklus:

```
Ausstehend --> Genehmigt --> Abgelaufen (automatisch, nach Ablaufdatum)
   |            |
   |            +--> Widerrufen (manuelle Admin-Aktion)
   |
   +--> Abgelehnt (Züchter kann erneut einreichen)
```

### Statusdefinitionen

| Status | Badge-Farbe | Bedeutung |
|--------|-------------|---------|
| Ausstehend | Orange | Wartet auf Admin-Prüfung |
| Genehmigt | Grün | Züchter ist verifiziert und Badge ist aktiv |
| Abgelehnt | Rot | Einreichung hat die Anforderungen nicht erfüllt |
| Widerrufen | Dunkelrot | Admin hat den verifizierten Status manuell entfernt |
| Abgelaufen | Grau | Verifizierungszeitraum beendet; Züchter muss erneut einreichen |

### Übergänge

- **Ausstehend** kann zu **Genehmigt** oder **Abgelehnt** übergehen.
- **Genehmigt** kann zu **Widerrufen** (manuell) oder **Abgelaufen** (automatisch) übergehen.
- **Abgelehnt** und **Abgelaufen** erlauben dem Züchter, eine neue Einreichung zu erstellen (neuer ausstehender Eintrag).
- **Widerrufen** ist ein Endstatus für diese Einreichung.

---

## Eine Einreichung prüfen

Um einen Züchterverifizierungsantrag zu prüfen:

1. Finden Sie die Einreichung in der Verifizierungsanträge-Tabelle.
2. Klicken Sie auf die Zeile oder die Schaltfläche **Prüfen** auf der rechten Seite.
3. Das **Einreichungsdetail-Modal** öffnet sich mit zwei Tabs:
   - **Aktuelle Einreichung** -- Zeigt die aktuellen Dokumente und Züchterdetails.
   - **Einreichungsverlauf** -- Zeigt alle früheren Einreichungen dieses Züchters.

### Tab Aktuelle Einreichung

Dieser Tab zeigt:

- Züchterprofilinformationen (Name, E-Mail, Telefon, Zwingerregistrierungsnummer)
- Hochgeladene Dokumente in einem Rasterlayout
- Einreichungsdatum und -uhrzeit
- Eventuelle Notizen, die der Züchter der Einreichung beigefügt hat

### Tab Einreichungsverlauf

Dieser Tab zeigt eine chronologische Liste aller Einreichungen desselben Züchters, einschließlich:

- Einreichungsnummer
- Einreichungsdatum
- Endstatus
- Name des Prüfers
- Ablehnungsgrund (falls zutreffend)

> **Tipp:** Verwenden Sie den Tab Einreichungsverlauf, um zu prüfen, ob ein Züchter frühere Ablehnungsgründe adressiert hat, bevor Sie eine erneute Einreichung genehmigen.

---

## Dokumentenvorschau

Jedes hochgeladene Dokument erscheint als Miniaturbild im Dokumentenraster.

1. Klicken Sie auf ein beliebiges Dokumenten-Miniaturbild, um eine Vorschau in voller Größe zu öffnen.
2. Verwenden Sie die Zoom-Steuerungen, um Dokumentendetails zu prüfen.
3. Navigieren Sie zwischen Dokumenten mit den Links-/Rechts-Pfeilen im Vorschau-Overlay.
4. Drücken Sie **Escape** oder klicken Sie auf die Schließen-Schaltfläche, um zum Detail-Modal zurückzukehren.

Unterstützte Dokumentenformate umfassen:

- JPEG- und PNG-Bilder
- PDF-Dokumente (als Seitenbilder gerendert)

> **Tipp:** Achten Sie bei der Prüfung hochgeladener Dokumente auf Klarheit, Authentizität und Vollständigkeit. Unscharfe oder unvollständige Dokumente sollten mit klaren Anweisungen zur erneuten Einreichung abgelehnt werden.

---

## Eine Einreichung genehmigen

Um einen Züchterverifizierungsantrag zu genehmigen:

1. Öffnen Sie das Einreichungsdetail-Modal durch Klicken auf die Zeile in der Tabelle.
2. Prüfen Sie alle hochgeladenen Dokumente sorgfältig.
3. Klicken Sie auf die Schaltfläche **Genehmigen** am unteren Rand des Modals.
4. Im Bestätigungsdialog:
   - Setzen Sie das **Ablaufdatum** für die Verifizierung. Standard ist 1 Jahr ab heute.
   - Passen Sie das Datum optional an, wenn ein kürzerer oder längerer Zeitraum angemessen ist.
5. Klicken Sie auf **Genehmigung bestätigen**.

### Was nach der Genehmigung passiert

- Das Züchterprofil erhält sofort das Verifizierungs-Badge.
- Der Züchter wird per E-Mail und In-App-Benachrichtigung informiert.
- Der Einreichungsstatus ändert sich zu **Genehmigt** in der Tabelle.
- Das Ablaufdatum erscheint in der Ablauf-Spalte.
- Wenn das Ablaufdatum überschritten wird, wechselt der Status automatisch zu **Abgelaufen**.

> **Tipp:** Für neue Züchter mit begrenzter Dokumentation erwägen Sie, einen kürzeren Ablauf (6 Monate) zu setzen, um eine frühere erneute Verifizierung zu veranlassen.

---

## Eine Einreichung ablehnen

Um einen Züchterverifizierungsantrag abzulehnen:

1. Öffnen Sie das Einreichungsdetail-Modal.
2. Prüfen Sie die Dokumente und identifizieren Sie das/die Problem(e).
3. Klicken Sie auf die Schaltfläche **Ablehnen** am unteren Rand des Modals.
4. Im Ablehnungsdialog:
   - Geben Sie einen **Ablehnungsgrund** im Textbereich ein. Dieses Feld ist erforderlich.
   - Seien Sie spezifisch darüber, was fehlt oder unzureichend ist.
5. Klicken Sie auf **Ablehnung bestätigen**.

### Was nach der Ablehnung passiert

- Der Einreichungsstatus ändert sich zu **Abgelehnt**.
- Der Ablehnungsgrund ist für den Züchter in seinem Dashboard sichtbar.
- Der Züchter erhält eine Benachrichtigung mit Erklärung der Ablehnung.
- Der Züchter kann eine neue Einreichung erstellen, um die Probleme zu beheben.

### Gute Ablehnungsgründe formulieren

| Richtig | Falsch |
|----|--------|
| „Zwingerregistrierungsdokument ist abgelaufen (2019). Bitte laden Sie eine aktuelle Registrierung hoch." | „Dokumente nicht gut genug." |
| „Foto der Einrichtung ist zu unscharf, um die Bedingungen zu überprüfen. Bitte reichen Sie mit klareren Bildern erneut ein." | „Schlechte Fotos." |
| „Fehlende Impfnachweise für Zuchttiere." | „Unvollständig." |

> **Tipp:** Klare Ablehnungsgründe reduzieren das Hin und Her und helfen Züchtern, beim nächsten Versuch vollständige Anträge einzureichen.

---

## Verifizierung widerrufen

Der Widerruf entfernt sofort den verifizierten Status eines Züchters. Verwenden Sie dies bei Richtlinienverstößen oder nach der Genehmigung entdeckten betrügerischen Dokumenten.

1. Navigieren Sie zur Verifizierungsanträge-Tabelle.
2. Filtern Sie nach **Status: Genehmigt**, um aktive Verifizierungen zu finden.
3. Klicken Sie auf die Zeile, um die Einreichungsdetails zu öffnen.
4. Klicken Sie auf die Schaltfläche **Widerrufen** (erscheint nur bei genehmigten Einreichungen).
5. Im Widerrufsdialog:
   - Geben Sie den **Grund für den Widerruf** ein. Dies ist erforderlich.
   - Bestätigen Sie, dass Sie verstehen, dass die Aktion sofort wirksam wird.
6. Klicken Sie auf **Widerruf bestätigen**.

### Was nach dem Widerruf passiert

- Das Verifizierungs-Badge wird sofort aus dem Züchterprofil entfernt.
- Der Züchter wird per E-Mail mit dem Widerrufsgrund benachrichtigt.
- Alle aktiven Einträge des Züchters zeigen einen Warnhinweis an.
- Der Einreichungsstatus ändert sich zu **Widerrufen** (Endstatus).
- Der Züchter kann nicht gegen dieselbe Einreichung erneut einreichen; er muss neu beginnen.

> **Tipp:** Der Widerruf ist eine schwerwiegende Aktion. Dokumentieren Sie den Grund gründlich für den Fall von Streitigkeiten. Erwägen Sie, den Züchter zu kontaktieren, bevor Sie widerrufen, wenn das Problem geringfügig ist.

---

## Zeitleistenansicht

Die Zeitleistenansicht bietet einen visuellen Verlauf der Verifizierungsreise eines Züchters.

1. Öffnen Sie ein beliebiges Einreichungsdetail-Modal.
2. Wechseln Sie zum Tab **Einreichungsverlauf**.
3. Die Zeitleiste zeigt Ereignisse in chronologischer Reihenfolge an:
   - Einreichung erstellt
   - Dokumente hochgeladen
   - Admin-Prüfung begonnen
   - Status geändert (mit Prüfername)
   - Ablaufwarnungen gesendet
   - Erneute Einreichungen verknüpft

### Zeitleiste lesen

Jeder Zeitleisteneintrag zeigt:

- **Datum und Uhrzeit** des Ereignisses
- **Ereignistyp**-Symbol (Dokument, Statusänderung, Benachrichtigung)
- **Akteur** (Züchtername oder Admin-Name)
- **Details** (Begründungstext, Dokumentennamen, gesetztes Ablaufdatum)

### Anwendungsfälle der Zeitleiste

- **Streitbeilegung:** Den vollständigen Verlauf einsehen, wenn ein Züchter eine Ablehnung anficht.
- **Audit-Trail:** Nachverfolgen, welcher Admin jede Einreichung geprüft und genehmigt/abgelehnt hat.
- **Mustererkennung:** Züchter identifizieren, die wiederholt unzureichende Dokumentation einreichen.

> **Tipp:** Die Zeitleiste ist schreibgeschützt. Alle Aktionen (genehmigen, ablehnen, widerrufen) müssen vom Tab „Aktuelle Einreichung" aus durchgeführt werden.

---

## Tastaturkürzel

| Kürzel | Aktion |
|----------|--------|
| Enter | Ausgewählte Einreichung öffnen |
| Escape | Modal schließen |
| Tab | Zwischen Modal-Tabs wechseln |
| Pfeiltasten | Zwischen Dokumenten in der Vorschau navigieren |

---

## Häufig gestellte Fragen

**F: Kann ich eine Einreichung mit Bedingungen genehmigen?**
A: Nein. Genehmigungen sind bedingungslos. Wenn Dokumente teilweise akzeptabel sind, lehnen Sie mit spezifischen Anweisungen ab, was zu beheben ist, und genehmigen Sie dann die erneute Einreichung.

**F: Was passiert mit den Einträgen eines Züchters, wenn seine Verifizierung abläuft?**
A: Einträge bleiben aktiv, aber das Verifizierungs-Badge wird entfernt. Der Züchter wird 30 Tage vor Ablauf benachrichtigt, um eine erneute Einreichung zu fördern.

**F: Kann ein widerrufener Züchter sich erneut bewerben?**
A: Ja, aber er muss eine völlig neue Einreichung erstellen. Die vorherige widerrufene Einreichung verbleibt im Verlauf zu Audit-Zwecken.

**F: Wer kann Verifizierungsaktionen durchführen?**
A: Nur Administratoren mit der Rolle Verifizierungsmanager können Einreichungen genehmigen, ablehnen oder widerrufen.
