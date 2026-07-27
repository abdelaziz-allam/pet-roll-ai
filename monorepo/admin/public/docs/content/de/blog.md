# Blog CMS

Das Blog CMS-Modul ermöglicht es Administratoren, Blog-Beiträge zu erstellen, zu bearbeiten, zu veröffentlichen und zu verwalten, die auf der öffentlichen Petfolioo-Website angezeigt werden. Nutzen Sie dieses Werkzeug, um Tierpflege-Tipps, Plattformneuigkeiten, Züchter-Spotlights und Bildungsinhalte mit Ihrer Community zu teilen.

![Blog CMS](/docs/screenshots/blog.png)

---

## Blog-Beiträge-Tabelle

Die Hauptansicht zeigt alle Blog-Beiträge in einer durchsuchbaren, sortierbaren Tabelle.

| Spalte | Beschreibung |
|--------|-------------|
| Titel | Beitragstitel mit klickbarem Link zum Bearbeiten |
| Status | Veröffentlichungsstatus-Badge |
| Autor | Name des Admins, der den Beitrag erstellt hat |
| Aufrufe | Gesamte Seitenaufrufe seit Veröffentlichung |
| Datum | Erstellungsdatum (oder Veröffentlichungsdatum, falls veröffentlicht) |

### Status-Badges

| Status | Badge-Farbe | Beschreibung |
|--------|-------------|-------------|
| Entwurf | Grau | Beitrag ist gespeichert, aber nicht öffentlich sichtbar |
| Veröffentlicht | Grün | Beitrag ist live und auf der Website sichtbar |
| Hervorgehoben | Gold | Beitrag ist veröffentlicht und oben angepinnt |

### Tabellenaktionen

- Klicken Sie auf einen Beitragstitel, um ihn zum Bearbeiten zu öffnen.
- Verwenden Sie das Aktionsmenü (drei Punkte) in jeder Zeile für Schnellaktionen: Veröffentlichen, Veröffentlichung aufheben, Anpinnen, Loslösen, Löschen.
- Sortieren Sie nach jeder Spalte durch Klicken auf die Spaltenüberschrift.
- Verwenden Sie die Suchleiste, um Beiträge nach Titel oder Inhaltsstichwörtern zu filtern.

> **Tipp:** Sortieren Sie nach Aufrufen absteigend, um Ihre beliebtesten Inhalte zu identifizieren. Nutzen Sie diese Erkenntnisse, um zukünftige Beiträge zu ähnlichen Themen zu planen.

---

## Beitrag erstellen

Um einen neuen Blog-Beitrag zu erstellen:

1. Klicken Sie auf die Schaltfläche **Beitrag erstellen** in der oberen rechten Ecke der Blog-Beiträge-Tabelle.
2. Der Beitragseditor öffnet sich mit den folgenden Feldern.

### Titel

- Geben Sie den Beitragstitel im Titelfeld oben ein.
- Maximal 200 Zeichen.
- Der Titel erscheint als Hauptüberschrift auf der veröffentlichten Seite.
- Wählen Sie beschreibende, ansprechende Titel, die relevante Schlüsselwörter enthalten.

### Slug

- Der URL-Slug wird automatisch aus dem Titel generiert.
- Format: Kleinbuchstaben, Bindestriche ersetzen Leerzeichen, Sonderzeichen entfernt.
- Beispiel: „Die 10 besten Tipps für neue Welpenbesitzer" wird zu `die-10-besten-tipps-fuer-neue-welpenbesitzer`.
- Sie können den Slug manuell bearbeiten, wenn die automatisch generierte Version zu lang oder unklar ist.
- Der Slug muss über alle Beiträge hinweg einzigartig sein.

> **Tipp:** Halten Sie Slugs kurz und schlüsselwortreich für besseres SEO. Kürzen Sie automatisch generierte Slugs manuell, die 5-6 Wörter überschreiten.

### HTML-Inhalt

- Der Hauptinhaltsbereich akzeptiert HTML für reichhaltige Formatierung.
- Verwenden Sie die Werkzeugleiste des Rich-Text-Editors für gängige Formatierungen:
  - Fett, Kursiv, Unterstrichen
  - Überschriften (H2, H3, H4)
  - Geordnete und ungeordnete Listen
  - Links
  - Bilder (inline)
  - Blockzitate
  - Code-Blöcke
- Wechseln Sie in den **Quellmodus**, um rohes HTML direkt zu bearbeiten.
- Der Inhalt unterstützt alle Standard-HTML-Tags.

#### Best Practices für Inhalte

| Richtig | Falsch |
|----|--------|
| H2 für Hauptabschnitte verwenden, H3 für Unterabschnitte | H1 verwenden (ist für den Titel reserviert) |
| Bilder einbinden, um langen Text aufzulockern | Textwände ohne Formatierung veröffentlichen |
| Absätze kurz halten (3-4 Sätze) | Absätze länger als 5 Sätze schreiben |
| Listen für mehrere zusammengehörige Elemente verwenden | Externe Skripte oder Iframes einbetten |
| Alt-Text für alle Bilder hinzufügen | Inline-Styles für Farben verwenden |

### Auszug

- Schreiben Sie eine kurze Zusammenfassung des Beitrags (maximal 500 Zeichen).
- Der Auszug erscheint auf Blog-Listenseiten, in Suchergebnissen und Social-Media-Vorschauen.
- Wenn er leer gelassen wird, werden automatisch die ersten 500 Zeichen des Inhalts verwendet.
- Ein Zeichenzähler zeigt die verbleibenden Zeichen während der Eingabe an.

> **Tipp:** Schreiben Sie den Auszug als fesselnden Teaser, der Leser zum Durchklicken animiert. Er sollte als vollständiger Gedanke für sich stehen und nicht mitten im Satz enden.

### Cover-Bild hochladen

1. Klicken Sie auf den Bereich **Cover-Bild hochladen** oder ziehen Sie eine Bilddatei per Drag-and-Drop hinein.
2. Unterstützte Formate: JPEG, PNG, WebP.
3. Empfohlene Maße: 1200 x 630 Pixel (optimiert für Social-Media-Sharing).
4. Maximale Dateigröße: 5 MB.
5. Nach dem Upload erscheint eine Vorschau des Bildes.
6. Klicken Sie auf **Entfernen**, um das aktuelle Cover-Bild zu löschen und ein anderes hochzuladen.

#### Richtlinien für Cover-Bilder

- Verwenden Sie hochwertige, relevante Bilder, die den Beitragsinhalt repräsentieren.
- Vermeiden Sie Textüberlagerungen auf Cover-Bildern (sie können auf verschiedenen Geräten beschnitten werden).
- Stellen Sie sicher, dass Sie die Rechte zur Verwendung des Bildes haben (eigene Fotos oder korrekt lizenziertes Stockmaterial).
- Bilder werden nach dem Upload automatisch für die Webdarstellung optimiert.

### Tags

- Geben Sie Tags als kommagetrennte Werte im Tags-Feld ein.
- Beispiel: `Welpenpflege, Training, Ernährung, Neue Besitzer`
- Tags helfen bei der Kategorisierung von Beiträgen und verbessern die Auffindbarkeit.
- Vorhandene Tags werden bei der Eingabe automatisch vorgeschlagen.
- Es gibt keine Begrenzung der Tag-Anzahl, aber 3-7 Tags pro Beitrag werden empfohlen.

> **Tipp:** Verwenden Sie eine konsistente Tag-Benennung über alle Beiträge hinweg. Prüfen Sie vorhandene Tags, bevor Sie neue Varianten erstellen (z.B. verwenden Sie konsistent „Welpenpflege" statt zwischen „welpenpflege" oder „Welpen-Pflege" zu wechseln).

### SEO-Einstellungen

Der SEO-Bereich ermöglicht es Ihnen zu optimieren, wie der Beitrag in Suchmaschinen erscheint.

#### Meta-Titel

- Maximal 60 Zeichen.
- Erscheint als klickbare Überschrift in den Suchergebnissen.
- Wenn leer gelassen, wird der Beitragstitel verwendet.
- Der Zeichenzähler wird rot, wenn er sich 60 Zeichen nähert oder diese überschreitet.
- Best Practice: Primäres Schlüsselwort am Anfang einschließen.

#### Meta-Beschreibung

- Maximal 160 Zeichen.
- Erscheint als Beschreibungsausschnitt unter dem Titel in den Suchergebnissen.
- Wenn leer gelassen, wird der Auszug verwendet.
- Der Zeichenzähler wird rot, wenn er sich 160 Zeichen nähert oder diese überschreitet.
- Best Practice: Handlungsaufforderung und primäres Schlüsselwort einschließen.

#### SEO-Vorschau

Unterhalb der Meta-Felder zeigt eine Vorschau, wie der Beitrag in Google-Suchergebnissen erscheinen wird:

```
+--------------------------------------------------+
| Meta-Titel (oder Beitragstitel wenn leer)        |
| https://petfolioo.com/blog/ihr-slug-hier         |
| Meta-Beschreibung (oder Auszug wenn leer)        |
| erscheint hier wie in den Suchergebnissen...     |
+--------------------------------------------------+
```

> **Tipp:** Füllen Sie immer sowohl Meta-Titel als auch Meta-Beschreibung manuell aus. Automatisch generierte Werte aus Titel und Auszug sind möglicherweise nicht für die Suchintention optimiert.

### Entwurf speichern

1. Nachdem Sie die gewünschten Felder ausgefüllt haben, klicken Sie auf **Entwurf speichern**.
2. Der Beitrag wird mit dem Status „Entwurf" gespeichert.
3. Sie können jederzeit aus der Blog-Beiträge-Tabelle zur Bearbeitung zurückkehren.
4. Entwürfe sind für die Öffentlichkeit nicht sichtbar.

---

## Beitrag veröffentlichen

Um einen Entwurfsbeitrag zu veröffentlichen und auf der Website sichtbar zu machen:

1. Öffnen Sie den Beitrag aus der Blog-Beiträge-Tabelle.
2. Überprüfen Sie alle Inhalte, Bilder und SEO-Einstellungen.
3. Klicken Sie auf die Schaltfläche **Veröffentlichen** in der oberen rechten Ecke.
4. Im Bestätigungsdialog:
   - Überprüfen Sie den Beitragstitel und Slug.
   - Bestätigen Sie die Veröffentlichung.
5. Klicken Sie auf **Veröffentlichung bestätigen**.

### Was nach der Veröffentlichung passiert

- Der Beitragsstatus ändert sich zu **Veröffentlicht**.
- Der Beitrag wird sofort auf der öffentlichen Blog-Seite sichtbar.
- Das Veröffentlichungsdatum wird aufgezeichnet (wird für die Sortierung im Blog verwendet).
- Die Beitrags-URL wird aktiv: `https://petfolioo.com/blog/[slug]`.
- Suchmaschinen können den Beitrag nun indexieren.

### Veröffentlichungs-Checkliste

Vor der Veröffentlichung überprüfen:

- [ ] Titel ist klar, ansprechend und frei von Tippfehlern
- [ ] Inhalt ist vollständig und ordnungsgemäß formatiert
- [ ] Alle Bilder laden korrekt
- [ ] Links funktionieren und öffnen in passenden Tabs
- [ ] Cover-Bild ist hochgeladen und sieht gut aus
- [ ] Auszug ist geschrieben und unter 500 Zeichen
- [ ] Tags sind hinzugefügt und korrekt formatiert
- [ ] Meta-Titel ist unter 60 Zeichen
- [ ] Meta-Beschreibung ist unter 160 Zeichen
- [ ] Slug ist sauber und schlüsselwortreich

---

## Veröffentlichung aufheben

Um einen veröffentlichten Beitrag von der öffentlichen Website zu entfernen:

1. Finden Sie den Beitrag in der Blog-Beiträge-Tabelle.
2. Klicken Sie auf das Aktionsmenü (drei Punkte) in der Zeile.
3. Wählen Sie **Veröffentlichung aufheben**.
4. Bestätigen Sie die Aktion im Dialog.

### Was nach dem Aufheben der Veröffentlichung passiert

- Der Beitragsstatus ändert sich zurück zu **Entwurf**.
- Der Beitrag wird sofort von der öffentlichen Blog-Seite entfernt.
- Die URL gibt eine 404-Seite zurück.
- Die Aufrufzahl bleibt erhalten.
- Sie können den Beitrag jederzeit erneut veröffentlichen.

> **Tipp:** Heben Sie die Veröffentlichung auf statt zu löschen, wenn Sie Inhalte vorübergehend entfernen möchten. Nicht veröffentlichte Beiträge behalten alle ihre Daten und können sofort wiederhergestellt werden.

---

## Als hervorgehoben anpinnen/loslösen

Hervorgehobene Beiträge erscheinen prominent oben auf der Blog-Seite, über den chronologischen Einträgen.

### Beitrag anpinnen

1. Finden Sie einen veröffentlichten Beitrag in der Blog-Beiträge-Tabelle.
2. Klicken Sie auf das Aktionsmenü (drei Punkte).
3. Wählen Sie **Als hervorgehoben anpinnen**.
4. Das Status-Badge ändert sich zu **Hervorgehoben** (Gold).

### Beitrag loslösen

1. Finden Sie den hervorgehobenen Beitrag in der Tabelle.
2. Klicken Sie auf das Aktionsmenü (drei Punkte).
3. Wählen Sie **Loslösen**.
4. Der Status kehrt zu **Veröffentlicht** (Grün) zurück.

### Regeln für hervorgehobene Beiträge

- Nur veröffentlichte Beiträge können angepinnt werden.
- Mehrere Beiträge können gleichzeitig hervorgehoben werden.
- Hervorgehobene Beiträge werden in der Reihenfolge angezeigt, in der sie angepinnt wurden (neuester zuerst).
- Das Loslösen eines Beitrags hebt seine Veröffentlichung nicht auf; er bleibt veröffentlicht.

> **Tipp:** Begrenzen Sie hervorgehobene Beiträge auf 2-3 gleichzeitig. Zu viele hervorgehobene Beiträge verwässern die Betonung und drängen reguläre Inhalte unter den sichtbaren Bereich.

---

## Auf Website ansehen

Um eine Vorschau zu sehen, wie ein veröffentlichter Beitrag auf der öffentlichen Website aussieht:

1. Öffnen Sie den Beitrag aus der Blog-Beiträge-Tabelle.
2. Klicken Sie auf den Link **Auf Website ansehen** im oberen rechten Bereich (neben der Veröffentlichen-Schaltfläche).
3. Ein neuer Browser-Tab öffnet sich mit dem Beitrag auf der Live-Website.

### Hinweise

- Der Link „Auf Website ansehen" ist nur für veröffentlichte und hervorgehobene Beiträge verfügbar.
- Entwurfsbeiträge können nicht auf der Live-Website vorgeschaut werden.
- Der Link öffnet die aktuelle Live-Version; nicht gespeicherte Änderungen im Editor werden nicht angezeigt.

> **Tipp:** Sehen Sie sich den Beitrag immer auf der Website an, nachdem Sie ihn veröffentlicht haben, um zu überprüfen, ob Formatierung, Bilder und Layout im öffentlichen Theme korrekt erscheinen.

---

## Beitrag löschen

Um einen Blog-Beitrag dauerhaft zu löschen:

1. Finden Sie den Beitrag in der Blog-Beiträge-Tabelle.
2. Klicken Sie auf das Aktionsmenü (drei Punkte).
3. Wählen Sie **Löschen**.
4. Ein Bestätigungsdialog erscheint:
   - Zeigt den Beitragstitel an.
   - Warnt, dass das Löschen dauerhaft ist.
   - Bittet Sie, den Beitragstitel zur Bestätigung einzutippen (bei veröffentlichten Beiträgen).
5. Klicken Sie auf **Löschen bestätigen**.

### Was nach dem Löschen passiert

- Der Beitrag wird dauerhaft aus dem System entfernt.
- Die URL gibt eine 404-Seite zurück.
- Der Beitrag kann nach dem Löschen nicht wiederhergestellt werden.
- Aufrufstatistiken gehen verloren.
- Der Slug wird zur Wiederverwendung frei.

### Wann löschen vs. Veröffentlichung aufheben

| Szenario | Aktion |
|----------|--------|
| Vorübergehende Inhaltsentfernung | Veröffentlichung aufheben |
| Veraltete Inhalte, die später aktualisiert werden könnten | Veröffentlichung aufheben |
| Testbeiträge oder versehentliche Duplikate | Löschen |
| Inhalte, die nie hätten erstellt werden sollen | Löschen |
| Rechtlich problematische Inhalte | Löschen |

> **Tipp:** Löschen ist unwiderruflich. Im Zweifelsfall lieber die Veröffentlichung aufheben. Sie können einen nicht veröffentlichten Beitrag immer noch später löschen, aber einen gelöschten Beitrag nicht wiederherstellen.

---

## Bild-Upload für Cover-Fotos

Die Cover-Bild-Upload-Komponente unterstützt folgenden Arbeitsablauf:

### Upload-Methoden

1. **Klick zum Hochladen:** Klicken Sie auf den Upload-Bereich, um Ihren Dateibrowser zu öffnen.
2. **Drag and Drop:** Ziehen Sie eine Bilddatei von Ihrem Desktop direkt auf den Upload-Bereich.

### Upload-Prozess

1. Wählen oder ziehen Sie Ihre Bilddatei.
2. Der Upload-Fortschrittsbalken erscheint.
3. Nach Abschluss wird die Bildvorschau im Upload-Bereich angezeigt.
4. Die Bild-URL wird automatisch mit dem Beitrag gespeichert.

### Bildanforderungen

| Anforderung | Wert |
|-------------|-------|
| Formate | JPEG, PNG, WebP |
| Mindestmaße | 600 x 315 Pixel |
| Empfohlene Maße | 1200 x 630 Pixel |
| Maximale Dateigröße | 5 MB |
| Seitenverhältnis | 1,91:1 empfohlen (Social-Media-optimiert) |

### Hochgeladene Bilder verwalten

- **Ersetzen:** Klicken Sie auf die Schaltfläche **Entfernen** unter der Vorschau und laden Sie dann ein neues Bild hoch.
- **Vorschau:** Klicken Sie auf die Bildvorschau, um es in voller Größe zu sehen.
- **Alt-Text:** Geben Sie im Feld unter dem Bild beschreibenden Alt-Text ein (wichtig für Barrierefreiheit und SEO).

### Bildoptimierung

Hochgeladene Bilder werden automatisch:

- Für Webdarstellung komprimiert (Qualität beibehaltend).
- Via CDN für schnelles Laden bereitgestellt.
- In WebP-Format konvertiert für Browser, die es unterstützen.
- Auf mehrere Dimensionen für responsive Anzeige verkleinert.

> **Tipp:** Bereiten Sie Ihre Cover-Bilder auf 1200 x 630 Pixel vor dem Upload vor. Dies ist die optimale Größe sowohl für die Blog-Anzeige als auch für Social-Media-Sharing (Open Graph).

---

## Häufig gestellte Fragen

**F: Können mehrere Admins denselben Beitrag bearbeiten?**
A: Ja, aber es gibt keine Echtzeit-Zusammenarbeit. Die letzte Person, die speichert, überschreibt vorherige Änderungen. Stimmen Sie sich mit Ihrem Team ab, um Konflikte zu vermeiden.

**F: Gibt es eine Revisionsverlauf?**
A: Nein. Jedes Speichern überschreibt die vorherige Version. Kopieren Sie wichtige Inhalte an einen anderen Ort, bevor Sie größere Änderungen vornehmen.

**F: Kann ich einen Beitrag für ein zukünftiges Datum planen?**
A: Derzeit nicht. Beiträge sind entweder Entwürfe oder sofort veröffentlicht. Speichern Sie als Entwurf und veröffentlichen Sie manuell zum gewünschten Zeitpunkt.

**F: Was passiert mit SEO, wenn ich den Slug eines veröffentlichten Beitrags ändere?**
A: Die alte URL gibt 404 zurück. Suchmaschinen werden die alte URL schließlich deindexieren und die neue indexieren. Vermeiden Sie Slug-Änderungen bei etablierten Beiträgen.

**F: Kann ich Videos in Blog-Beiträge einbetten?**
A: Ja, verwenden Sie den HTML-Quellmodus, um Video-Iframes von YouTube oder Vimeo im Inhaltsbereich einzubetten.

**F: Gibt es ein Wort- oder Zeichenlimit für Beitragsinhalte?**
A: Es gibt kein hartes Limit für die Inhaltslänge. Beiträge zwischen 800-2000 Wörtern schneiden jedoch für SEO und Leserengagement am besten ab.
