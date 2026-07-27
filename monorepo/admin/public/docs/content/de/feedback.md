# Feedbackverwaltung

Die Feedbackverwaltungsseite ermöglicht es Administratoren, über die Petfolioo Mobile-App eingereichte Benutzerfeedbacks anzuzeigen, darauf zu antworten und zu organisieren. Dies ist Ihre zentrale Anlaufstelle, um Benutzerbedürfnisse zu verstehen, Fehler zu verfolgen und Funktionsvorschläge zu verwalten.

![Feedback](/docs/screenshots/feedback.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Respond |
> | Viewer | View only |

---

## Überblick

Wenn Sie zur Feedback-Seite navigieren, sehen Sie oben eine Statistikzeile, die den aktuellen Stand aller Feedbacks zusammenfasst, gefolgt von Tab-Inhaltsbereichen und Filtersteuerungen.

---

## Statistikzeile

Am oberen Rand der Seite zeigen vier Metrikkarten Echtzeit-Zählungen an:

| Metrik | Beschreibung |
|--------|-------------|
| **Gesamt** | Gesamtzahl der erhaltenen Feedback-Einträge über alle Status hinweg |
| **Offen** | Feedback-Einträge, die noch nicht beantwortet oder geschlossen wurden |
| **Beantwortet** | Feedback-Einträge, bei denen ein Admin mindestens eine Antwort gepostet hat |
| **TODO** | Feedback-Einträge, die von einem Admin zur Nachverfolgung markiert wurden |

> **Tipp:** Verwenden Sie die TODO-Zählung als schnellen Indikator für offene Punkte, die Aufmerksamkeit benötigen. Wenn diese Zahl wächst, erwägen Sie eine Triagierung mit Ihrem Team.

---

## Tabs

Die Feedback-Seite ist in zwei Tabs organisiert:

### Alle Feedbacks

1. Klicken Sie auf den Tab **Alle Feedbacks** (standardmäßig ausgewählt).
2. Diese Ansicht zeigt jeden Feedback-Eintrag im System unabhängig vom Status.
3. Einträge sind nach Datum sortiert, wobei die neuesten zuerst erscheinen.
4. Verwenden Sie die Filter (unten beschrieben), um die Ergebnisse einzugrenzen.

### TODO-Liste

1. Klicken Sie auf den Tab **TODO-Liste**.
2. Diese Ansicht zeigt nur Feedback-Einträge, die von einem Admin als TODO markiert wurden.
3. Verwenden Sie diesen Tab während Team-Triagierung-Meetings oder täglichen Überprüfungen.
4. Elemente bleiben hier, bis sie losgelöst werden.

---

## Filter

Unterhalb der Tabs bietet eine Filterleiste mehrere Steuerungen zum Eingrenzen der angezeigten Feedback-Einträge.

### Statusfilter

1. Finden Sie das **Status**-Dropdown in der Filterleiste.
2. Klicken Sie zum Erweitern und wählen Sie eine der folgenden Optionen:
   - **Alle** -- Zeigt Feedbacks in jedem Status
   - **Offen** -- Zeigt nur ungelöstes Feedback
   - **Beantwortet** -- Zeigt Feedback mit mindestens einer Admin-Antwort
   - **Geschlossen** -- Zeigt als gelöst markiertes Feedback
3. Die Liste aktualisiert sich sofort bei der Auswahl.

### Typfilter

1. Finden Sie das **Typ**-Dropdown in der Filterleiste.
2. Wählen Sie die Feedback-Kategorie, die Sie anzeigen möchten:
   - **Alle Typen** -- Kein Typfilter angewendet
   - **Fehler** -- Von Benutzern gemeldete Probleme oder Defekte
   - **Vorschlag** -- Funktionsanfragen und Verbesserungsideen
   - **Allgemein** -- Allgemeine Kommentare oder Fragen
3. Jeder Feedback-Eintrag ist mit seinem Typ-Badge für schnelle visuelle Identifikation getaggt.

### Datumsbereichsfilter

1. Klicken Sie auf die **Datumsbereich**-Auswahl in der Filterleiste.
2. Wählen Sie ein Start- und Enddatum aus dem Kalender-Widget.
3. Nur Feedback, das innerhalb des ausgewählten Bereichs eingereicht wurde, wird angezeigt.
4. Um den Datumsfilter zu löschen, klicken Sie auf das Löschsymbol in der Datumsauswahl.

### Nur-TODOs-Umschalter

1. Finden Sie den **Nur TODOs**-Umschalter in der Filterleiste.
2. Aktivieren Sie ihn, um nur als TODO markierte Feedback-Einträge anzuzeigen.
3. Dies bietet eine schnelle Alternative zum Wechseln auf den TODO-Liste-Tab, während Sie in der Alle-Feedbacks-Ansicht mit anderen Filtern bleiben.

> **Tipp:** Kombinieren Sie Filter für leistungsfähige Abfragen. Setzen Sie beispielsweise Typ auf „Fehler" und Status auf „Offen", um alle ungelösten Fehlerberichte zu sehen.

---

## Feedback-Einträge

Jeder Feedback-Eintrag in der Liste zeigt folgende Informationen an:

| Feld | Beschreibung |
|-------|-------------|
| **Benutzerinfo** | Anzeigename, E-Mail und Avatar des einreichenden Benutzers |
| **Nachricht** | Der vollständige Text des vom Benutzer eingereichten Feedbacks |
| **Typ-Badge** | Ein farbiges Badge: Fehler (rot), Vorschlag (blau) oder Allgemein (grau) |
| **Datum** | Datum und Uhrzeit der Feedback-Einreichung |
| **Status** | Aktueller Statusindikator (Offen, Beantwortet oder Geschlossen) |
| **TODO-Pin** | Ein Pin-Symbol, das anzeigt, ob dieser Eintrag zur Nachverfolgung markiert ist |

### Einen Feedback-Eintrag anzeigen

1. Finden Sie den Feedback-Eintrag in der Liste.
2. Klicken Sie auf die Eintragszeile oder das Erweiterungssymbol, um die Detailansicht zu öffnen.
3. Die Detailansicht zeigt die vollständige Nachricht, Benutzerinformationen und eventuelle vorherige Admin-Antworten.

---

## Auf Feedback antworten

Administratoren können auf Benutzerfeedback antworten. Antworten sind für den Benutzer in der mobilen Anwendung sichtbar.

### Schritte zum Antworten

1. Öffnen Sie den Feedback-Eintrag, auf den Sie antworten möchten.
2. Finden Sie den **Antwort**-Textbereich am unteren Rand der Detailansicht.
3. Tippen Sie Ihre Antwortnachricht in den Textbereich.
4. Überprüfen Sie Ihre Nachricht auf Klarheit und Professionalität.
5. Klicken Sie auf die Schaltfläche **Antwort senden**.
6. Eine Bestätigungsmeldung erscheint, die anzeigt, dass die Antwort erfolgreich gesendet wurde.
7. Der Feedback-Status ändert sich automatisch zu **Beantwortet**.

> **Wichtig:** Ihre Antwort wird für den Benutzer in der Petfolioo Mobile-App sichtbar sein. Stellen Sie sicher, dass Ihre Antwort hilfreich, professionell ist und das Anliegen des Benutzers direkt anspricht.

### Best Practices für Antworten

- Würdigen Sie das Feedback des Benutzers, bevor Sie eine Lösung anbieten.
- Wenn es sich um einen bekannten Fehler handelt, lassen Sie den Benutzer wissen, dass daran gearbeitet wird.
- Bei Vorschlägen bedanken Sie sich beim Benutzer und erklären Sie, ob die Funktion in Betracht gezogen wird.
- Vermeiden Sie technischen Jargon, den Endbenutzer möglicherweise nicht verstehen.
- Halten Sie Antworten knapp, aber gründlich.

---

## Vorherige Admin-Antworten

Wenn Sie einen Feedback-Eintrag anzeigen, der Antworten erhalten hat, werden alle vorherigen Admin-Antworten inline in chronologischer Reihenfolge angezeigt.

1. Öffnen Sie die Feedback-Eintrag-Detailansicht.
2. Scrollen Sie nach unten, um den Konversationsverlauf zu sehen.
3. Jede Antwort zeigt:
   - Den Namen des Admins, der die Antwort gepostet hat
   - Datum und Uhrzeit der Antwort
   - Den vollständigen Antworttext
4. Neue Antworten erscheinen am Ende des Verlaufs.

> **Tipp:** Überprüfen Sie vorherige Antworten, bevor Sie eine neue posten, um doppelte oder widersprüchliche Antworten zu vermeiden.

---

## Feedback schließen

Wenn ein Feedback-Element vollständig behandelt wurde, können Sie es schließen, um anzuzeigen, dass keine weitere Aktion erforderlich ist.

### Schritte zum Schließen

1. Öffnen Sie den Feedback-Eintrag, den Sie schließen möchten.
2. Klicken Sie auf die Schaltfläche **Schließen** (oder wählen Sie „Schließen" aus dem Aktionsmenü).
3. Ein Bestätigungsdialog erscheint und bittet Sie um Bestätigung.
4. Klicken Sie auf **Bestätigen**, um das Feedback zu schließen.
5. Der Status des Eintrags ändert sich zu **Geschlossen**.
6. Geschlossene Einträge verbleiben im System und können angezeigt werden, indem Sie den Statusfilter auf „Geschlossen" setzen.

> **Hinweis:** Das Schließen von Feedback löscht es nicht. Sie können geschlossene Einträge weiterhin einsehen und bei Bedarf erneut öffnen.

---

## Als TODO anpinnen / loslösen

Die TODO-Pin-Funktion ermöglicht es Admins, bestimmte Feedback-Einträge zur Nachverfolgung zu markieren. Angepinnte Elemente erscheinen im TODO-Liste-Tab und tragen zur TODO-Zählung in der Statistikzeile bei.

### Feedback als TODO anpinnen

1. Finden Sie den Feedback-Eintrag, den Sie zur Nachverfolgung markieren möchten.
2. Klicken Sie auf das **Pin**-Symbol (Stecknadel) in der Eintragszeile, oder öffnen Sie die Detailansicht und klicken Sie auf **Als TODO anpinnen**.
3. Der Eintrag wird sofort zur TODO-Liste hinzugefügt.
4. Der TODO-Zähler in der Statistikzeile erhöht sich um eins.
5. Ein Pin-Symbol erscheint am Eintrag und zeigt seinen TODO-Status an.

### Feedback loslösen

1. Finden Sie den angepinnten Feedback-Eintrag (verwenden Sie den TODO-Liste-Tab oder den Nur-TODOs-Filter).
2. Klicken Sie auf das **Loslösen**-Symbol in der Eintragszeile, oder öffnen Sie die Detailansicht und klicken Sie auf **Von TODO entfernen**.
3. Der Eintrag wird aus der TODO-Liste entfernt.
4. Der TODO-Zähler in der Statistikzeile verringert sich um eins.

### Wann TODO-Pins verwenden

- Ein Feedback-Element erfordert Untersuchung vor der Antwort.
- Sie benötigen Input von einem anderen Teammitglied vor der Beantwortung.
- Das Problem steht im Zusammenhang mit einem bevorstehenden Release und sollte verfolgt werden.
- Ein Vorschlag muss im nächsten Planungsmeeting besprochen werden.

---

## Workflow-Zusammenfassung

Der empfohlene Workflow für die Bearbeitung von Feedback ist:

1. **Prüfen** -- Überprüfen Sie die Statistikzeile täglich auf neues offenes Feedback.
2. **Triagieren** -- Verwenden Sie Filter, um Fehler gegenüber Vorschlägen zu priorisieren.
3. **Anpinnen** -- Markieren Sie komplexe Elemente als TODO für spätere Nachverfolgung.
4. **Antworten** -- Beantworten Sie einfache Elemente sofort.
5. **Zusammenarbeiten** -- Verwenden Sie den TODO-Liste-Tab in Teamüberprüfungen.
6. **Schließen** -- Markieren Sie gelöste Elemente als geschlossen, nachdem Sie bestätigt haben, dass das Problem des Benutzers behoben ist.

---

## Tastaturkürzel

| Kürzel | Aktion |
|----------|--------|
| `Enter` | Ausgewählten Feedback-Eintrag öffnen |
| `R` | Antwort-Textbereich fokussieren (wenn Eintrag geöffnet ist) |
| `T` | TODO-Pin am ausgewählten Eintrag umschalten |
| `Esc` | Detailansicht schließen |

---

## Fehlerbehebung

| Problem | Lösung |
|-------|----------|
| Antwort wird nicht gesendet | Prüfen Sie Ihre Netzwerkverbindung und versuchen Sie es erneut. Stellen Sie sicher, dass die Nachricht nicht leer ist. |
| Filter aktualisieren nicht | Aktualisieren Sie die Seite. Wenn das Problem anhält, löschen Sie den Browser-Cache. |
| TODO-Zählung inkorrekt | Die Zählung aktualisiert sich beim Seitenladen. Navigieren Sie weg und kehren Sie zurück zum Aktualisieren. |
| Geschlossenes Feedback nicht sichtbar | Setzen Sie den Statusfilter auf „Geschlossen" oder „Alle", um geschlossene Einträge zu sehen. |

---

## Verwandte Seiten

- [Benachrichtigungen](./notifications.md) -- Ankündigungen an Benutzer senden
- [Admin-Benutzer](./admin-users.md) -- Verwalten, wer auf Feedback antworten kann
- [Einstellungen](./settings.md) -- Systemweite Einstellungen konfigurieren
