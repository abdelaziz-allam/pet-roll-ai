# Tierkategorien

Das Tierkategorien-Modul ermöglicht es Administratoren, das Klassifizierungssystem zu definieren und zu verwalten, das zur Organisation von Tieren auf der Petfolioo-Plattform verwendet wird. Kategorien repräsentieren Tierarten oder -typen und werden in der gesamten Anwendung für Filterung, Suche und Organisation verwendet. Jede Kategorie umfasst einen Namen, ein Label, ein Emoji-Symbol, eine Beschreibung und einen Aktivstatus.

![Pet Categories](/docs/screenshots/categories.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Kategorienübersicht

Die Kategorieseite zeigt alle definierten Tierkategorien in einem Tabellenformat mit Verwaltungssteuerungen an.

### Tabellenspalten

| Spalte | Beschreibung | Sortierbar |
|--------|-------------|:--------:|
| Name-Slug | Maschinenlesbarer Bezeichner (z.B. `dog`, `cat`, `bird`) | Ja |
| Label | Menschenlesbarer Anzeigename (z.B. „Hund", „Katze", „Vogel") | Ja |
| Emoji-Symbol | Visuelles Symbol zur Darstellung der Kategorie | Nein |
| Beschreibung | Kurze Beschreibung, was diese Kategorie umfasst | Nein |
| Aktiv | Umschalter, der anzeigt, ob die Kategorie aktiv ist | Ja |
| Aktionen | Bearbeiten- und Löschen-Schaltflächen | Nein |

### Statusindikatoren

| Aktivstatus | Anzeige | Bedeutung |
|-------------|---------|---------|
| Aktiv | Grüner Umschalter (An-Position) | Kategorie ist für Tierregistrierung verfügbar und in Filtern sichtbar |
| Inaktiv | Grauer Umschalter (Aus-Position) | Kategorie ist für Benutzer verborgen, aber vorhandene Tiere behalten ihre Kategorie |

### Tabellenfunktionen

1. **Sortieren** durch Klicken auf die Spaltenüberschriften Name-Slug, Label oder Aktiv.
2. **Schnellumschaltung** durch direktes Klicken auf den Aktiv-Schalter in der Tabellenzeile.
3. **Inline-Aktionen** über Bearbeiten (Stiftsymbol) und Löschen (Mülleimersymbol) Schaltflächen in jeder Zeile.
4. **Paginierung** am unteren Rand zum Durchblättern bei vielen Kategorien.

> **Tipp:** Inaktive Kategorien werden mit einem leicht verblassten Zeilenstil angezeigt, um sie visuell von aktiven zu unterscheiden.

---

## Kategorie erstellen

Neue Kategorien können erstellt werden, um zusätzliche Tierarten oder -typen auf der Plattform zu unterstützen.

### Schritte zum Erstellen einer Kategorie

1. Klicken Sie auf die Schaltfläche **Kategorie hinzufügen** in der oberen rechten Ecke der Kategorieseite.
2. Ein Erstellungsformular erscheint (entweder als Modal oder Inline-Formular).
3. Füllen Sie die erforderlichen Felder aus:

| Feld | Erforderlich | Beschreibung | Beispiel |
|-------|:--------:|-------------|---------|
| Name-Slug | Ja | Maschinenlesbarer Bezeichner | `golden_fish` |
| Label | Ja | Anzeigename für Benutzer | „Goldfisch" |
| Emoji-Symbol | Ja | Visuelles Symbol für die Kategorie | „fish" |
| Beschreibung | Nein | Kurze Erklärung der Kategorie | „Süß- und Salzwasserfischarten" |
| Aktiv | Nein | Ob sofort aktiviert werden soll (Standard: aktiv) | An |

4. Wählen Sie ein Emoji-Symbol aus dem **Emoji-Picker** (siehe unten).
5. Überprüfen Sie Ihre Eingaben.
6. Klicken Sie auf **Kategorie erstellen** zum Speichern.
7. Die neue Kategorie erscheint in der Übersichtstabelle.

### Name-Slug-Konvention

Der Name-Slug muss diesen Regeln folgen:

| Regel | Beschreibung | Beispiel |
|------|-------------|---------|
| Nur Kleinbuchstaben | Keine Großbuchstaben erlaubt | `dog` nicht `Dog` |
| Unterstriche für Leerzeichen | Unterstriche verwenden, um Wörter zu trennen | `guinea_pig` nicht `guinea pig` |
| Alphanumerisch + Unterstrich | Nur Buchstaben, Zahlen und Unterstriche | `cat_1` ist gültig, `cat-1` nicht |
| Einzigartig | Darf keinen bestehenden Kategorie-Slug duplizieren | System lehnt Duplikate ab |
| Keine führenden/abschließenden Unterstriche | Kann nicht mit Unterstrich beginnen oder enden | `_dog_` ist ungültig |
| Maximal 50 Zeichen | Slugs kurz halten | Kurze, beschreibende Bezeichner |

> **Wichtig:** Der Name-Slug kann nach der Erstellung nicht geändert werden. Er wird als permanenter Bezeichner in der Datenbank und API verwendet. Wählen Sie sorgfältig.

### Emoji-Picker

Der Emoji-Picker bietet über 100 Tier- und Natursymbole zur Kategorieidentifikation.

| Funktion | Beschreibung |
|---------|-------------|
| Suche | Tippen Sie, um verfügbare Emojis nach Stichwort zu filtern |
| Kategorien | Emojis nach Gruppen organisiert (Tiere, Natur, Objekte) |
| Vorschau | Ausgewähltes Emoji wird vor der Bestätigung groß angezeigt |
| Zuletzt verwendet | Kürzlich verwendete Emojis werden oben für schnellen Zugriff angezeigt |

**Emoji-Picker verwenden:**

1. Klicken Sie auf das **Emoji-Symbolfeld**, um den Picker zu öffnen.
2. Durchsuchen Sie Kategorien oder tippen Sie ein Stichwort in die Suche (z.B. „dog", „fish", „bird").
3. Klicken Sie auf das gewünschte Emoji zur Auswahl.
4. Das ausgewählte Emoji erscheint als Vorschau im Formularfeld.
5. Um Ihre Auswahl zu ändern, klicken Sie erneut auf das Feld, um den Picker wieder zu öffnen.

Verfügbare Emoji-Kategorien umfassen:

| Gruppe | Beispiel-Emojis |
|-------|---------------|
| Haustiere | Hund, Katze, Hamster, Kaninchen, Maus |
| Nutztiere | Pferd, Kuh, Schwein, Schaf, Ziege, Huhn |
| Vögel | Papagei, Adler, Eule, Ente, Flamingo, Pfau |
| Reptilien | Eidechse, Schlange, Schildkröte, Krokodil, Dinosaurier |
| Wassertiere | Fisch, Tropenfisch, Wal, Delfin, Oktopus, Hai |
| Insekten | Schmetterling, Biene, Käfer, Ameise, Grille |
| Wildtiere | Löwe, Tiger, Bär, Affe, Elefant, Giraffe |
| Pfote/Allgemein | Pfotenabdrücke, Knochen, Herz, Stern |

---

## Kategorien bearbeiten

Bestehende Kategorien können geändert werden, um ihr Label, Symbol, ihre Beschreibung oder ihren Aktivstatus zu aktualisieren.

### Schritte zum Bearbeiten einer Kategorie

1. Finden Sie die Kategorie, die Sie bearbeiten möchten, in der Übersichtstabelle.
2. Klicken Sie auf die Schaltfläche **Bearbeiten** (Stiftsymbol) in der Aktionsspalte der Zeile.
3. Ein Bearbeitungsformular erscheint mit den aktuellen Werten vorausgefüllt.
4. Ändern Sie eines der bearbeitbaren Felder:

| Feld | Bearbeitbar | Hinweise |
|-------|:--------:|-------|
| Name-Slug | Nein | Kann nach der Erstellung nicht geändert werden |
| Label | Ja | Anzeigenamen aktualisieren |
| Emoji-Symbol | Ja | Neues Emoji aus dem Picker auswählen |
| Beschreibung | Ja | Beschreibung aktualisieren oder hinzufügen |
| Aktiv | Ja | Aktiv/Inaktiv-Status umschalten |

5. Nehmen Sie Ihre Änderungen vor.
6. Klicken Sie auf **Änderungen speichern** zum Anwenden.
7. Eine Erfolgsbenachrichtigung bestätigt die Aktualisierung.
8. Die Übersichtstabelle spiegelt die Änderungen sofort wider.

### Bearbeitungshinweise

| Hinweis | Detail |
|---------------|--------|
| Label-Änderungen | Werden sofort in der gesamten App für alle Benutzer reflektiert |
| Emoji-Änderungen | Werden an allen UI-Stellen aktualisiert, an denen die Kategorie erscheint |
| Beschreibungsänderungen | Sichtbar in Kategorie-Auswahlbildschirmen innerhalb der App |
| Bestehende Tiere | Bereits dieser Kategorie zugewiesene Tiere werden von Bearbeitungen nicht betroffen |

> **Hinweis:** Das Ändern des Labels einer Kategorie ändert nicht ihren Slug. Der Slug bleibt der permanente Bezeichner. Benutzer und Tiere referenzieren Kategorien intern über den Slug.

---

## Kategorien aktivieren und deaktivieren

Kategorien können zwischen aktivem und inaktivem Status umgeschaltet werden, ohne sie zu löschen.

### Kategorie aktivieren

1. Finden Sie die inaktive Kategorie in der Übersicht (mit grauem Umschalter angezeigt).
2. Klicken Sie auf den **Umschalter** in der Aktiv-Spalte, um ihn in die An-Position zu setzen.
3. Alternativ klicken Sie auf Bearbeiten und schalten Sie das Aktiv-Feld im Bearbeitungsformular um.
4. Bestätigen Sie die Aktion falls aufgefordert.
5. Die Kategorie wird sofort für die Tierregistrierung verfügbar.

### Kategorie deaktivieren

1. Finden Sie die aktive Kategorie in der Übersicht (mit grünem Umschalter angezeigt).
2. Klicken Sie auf den **Umschalter**, um ihn in die Aus-Position zu setzen.
3. Ein Bestätigungsdialog erscheint und erklärt die Auswirkungen.
4. Klicken Sie auf **Deaktivierung bestätigen**.
5. Die Kategorie wird bei neuen Tierregistrierungen ausgeblendet.

### Auswirkungen der Deaktivierung

| Auswirkungsbereich | Effekt |
|-------------|--------|
| Neue Registrierungen | Kategorie erscheint nicht mehr in Artenauswahl-Dropdowns |
| Bestehende Tiere | Bereits dieser Kategorie zugewiesene Tiere behalten ihre Zuweisung |
| Filter | Kategorie erscheint nicht mehr in Filter-Dropdowns für öffentliche Benutzer |
| Admin-Portal | Kategorie bleibt im Admin mit inaktiver Darstellung sichtbar |
| API-Antworten | Kategorie wird aus aktiven Kategorielisten ausgeschlossen |
| Reaktivierung | Kann jederzeit wieder aktiviert werden und stellt volle Funktionalität wieder her |

> **Tipp:** Deaktivierung ist dem Löschen vorzuziehen, wenn Sie eine Kategorie vorübergehend verbergen möchten oder wenn bestehende Tiere sie noch verwenden. Es bewahrt die Datenintegrität und begrenzt gleichzeitig die neue Nutzung.

---

## Standardwerte-Schaltfläche

Die Funktion „Standardwerte laden" füllt die Kategorientabelle mit einem vordefinierten Satz gängiger Tierkategorien. Dies ist nützlich für die initiale Plattformeinrichtung oder die Wiederherstellung von Standardkategorien.

### Standardwerte verwenden

1. Klicken Sie auf die Schaltfläche **Standardwerte laden** oberhalb oder unterhalb der Kategorientabelle.
2. Ein Bestätigungsmodal erscheint und listet die Kategorien auf, die erstellt werden.
3. Überprüfen Sie die Liste der Standardkategorien.
4. Klicken Sie auf **Laden bestätigen** zum Fortfahren.
5. Standardkategorien werden erstellt und erscheinen in der Übersicht.

### Standard-Kategorieset

Das Laden erstellt folgende Standardkategorien (falls sie noch nicht existieren):

| Name-Slug | Label | Emoji | Beschreibung |
|-----------|-------|:-----:|-------------|
| `dog` | Hund | Hundegesicht | Haushunde aller Rassen |
| `cat` | Katze | Katzengesicht | Hauskatzen aller Rassen |
| `bird` | Vogel | Vogel | Heimvögel einschließlich Papageien, Kanarienvögel und Finken |
| `rabbit` | Kaninchen | Kaninchengesicht | Hauskaninchen |
| `hamster` | Hamster | Hamstergesicht | Hamster, Rennmäuse und ähnliche kleine Nagetiere |
| `fish` | Fisch | Fisch | Süß- und Salzwasser-Aquarienfische |
| `turtle` | Schildkröte | Schildkröte | Schildkröten und Landschildkröten |
| `snake` | Schlange | Schlange | Ungiftige Heimschlangen |
| `lizard` | Eidechse | Eidechse | Geckos, Leguane und andere Heimeidechsen |
| `horse` | Pferd | Pferdegesicht | Pferde und Ponys |
| `guinea_pig` | Meerschweinchen | Meerschweinchen | Meerschweinchen |
| `ferret` | Frettchen | Frettchen | Hausfrettchen |

### Ladeverhalten

| Szenario | Verhalten |
|----------|----------|
| Leere Tabelle | Alle Standards werden erstellt |
| Einige Standards existieren | Nur fehlende Standards werden erstellt (keine Duplikate) |
| Alle Standards existieren | Keine Änderungen, Bestätigungsmeldung wird angezeigt |
| Benutzerdefinierte Kategorien existieren | Benutzerdefinierte Kategorien werden nicht beeinflusst |

> **Hinweis:** Die Schaltfläche „Standardwerte laden" löscht oder ändert keine bestehenden Kategorien. Sie fügt nur fehlende Standardeinträge hinzu. Ihre benutzerdefinierten Kategorien sind sicher.

---

## Kategorie löschen

Kategorien können dauerhaft gelöscht werden, wenn sie nicht mehr benötigt werden. Diese Aktion erfordert sorgfältige Überlegung aufgrund ihrer Auswirkungen auf bestehende Daten.

### Schritte zum Löschen einer Kategorie

1. Finden Sie die Kategorie in der Übersichtstabelle.
2. Klicken Sie auf die Schaltfläche **Löschen** (Mülleimersymbol) in der Aktionsspalte der Zeile.
3. Ein Warnmodal erscheint mit:
   - Dem Kategorienamen und der aktuellen Tieranzahl, die diese Kategorie verwenden
   - Einer Warnung über die Auswirkungen auf bestehende Tiere
   - Einem Textbestätigungsfeld (Kategorie-Slug eintippen zur Bestätigung)
4. Lesen Sie die Warnung sorgfältig.
5. Tippen Sie den **Name-Slug** der Kategorie im Bestätigungsfeld ein.
6. Klicken Sie auf **Kategorie löschen**, um sie dauerhaft zu entfernen.

### Auswirkungen der Löschung

| Auswirkungsbereich | Effekt |
|-------------|--------|
| Kategoriedatensatz | Dauerhaft aus der Datenbank entfernt |
| Bestehende Tiere | Zuvor in dieser Kategorie befindliche Tiere werden **unkategorisiert** |
| Tierprofile | Art-Feld zeigt „Unkategorisiert" oder leer |
| Filter | Kategorie wird aus allen Filter-Dropdowns entfernt |
| Analysen | Historische Daten zeigen möglicherweise „Unbekannte Kategorie" für vergangene Datensätze |
| Reversibilität | Kann nicht rückgängig gemacht werden (muss bei Bedarf manuell neu erstellt werden) |

### Tiere werden unkategorisiert

Wenn eine Kategorie gelöscht wird:

1. Alle dieser Kategorie zugewiesenen Tiere verlieren ihre Kategoriezuweisung.
2. Diese Tiere erscheinen mit dem Label „Unkategorisiert" im Tierregister.
3. Tierbesitzer werden **nicht** automatisch benachrichtigt.
4. Administratoren können unkategorisierte Tiere über Massenbearbeitung einer anderen Kategorie zuweisen.
5. Die Tieranzahl für die gelöschte Kategorie wird im Löschungsbestätigungsmodal angezeigt.

> **Wichtig:** Das Löschen einer Kategorie mit zugewiesenen aktiven Tieren hinterlässt diese Tiere unkategorisiert. Erwägen Sie stattdessen die Deaktivierung der Kategorie, oder weisen Sie Tiere vor der Löschung neu zu.

### Löschungseinschränkungen

| Einschränkung | Beschreibung |
|-------------|-------------|
| Standardkategorien | Geladene Standardkategorien können gelöscht werden (können erneut geladen werden) |
| Aktive Tiere | Kategorien mit Tieren können gelöscht werden (Tiere werden unkategorisiert) |
| Bestätigung erforderlich | Slug muss zur Bestätigung eingetippt werden |
| Rollenanforderung | Nur `super_admin`- und `admin`-Rollen können Kategorien löschen |

---

## Best Practices

### Richtlinien für die Kategorieverwaltung

1. **Klare, einfache Labels verwenden** - Kategorielabels sollten für alle Benutzer unabhängig von der Sprachkompetenz sofort verständlich sein.
2. **Repräsentative Emojis wählen** - Wählen Sie Emojis, die den Tiertyp klar darstellen, um schnelle visuelle Erkennung zu unterstützen.
3. **Hilfreiche Beschreibungen schreiben** - Beschreibungen helfen Benutzern, die richtige Kategorie bei der Registrierung ihres Tieres zu wählen.
4. **Deaktivieren vor Löschen** - Wenn unsicher, ob eine Kategorie benötigt wird, deaktivieren Sie sie zuerst. Löschen Sie nur bei Sicherheit.
5. **Slugs beschreibend halten** - Da Slugs nicht geändert werden können, wählen Sie sie bei der Erstellung sorgfältig.
6. **Unkategorisierte Tiere überwachen** - Prüfen Sie regelmäßig auf Tiere ohne Kategorien und weisen Sie sie entsprechend zu.

### Beispiele für Kategorienamen

| Gut | Schlecht | Warum |
|------|-----|-----|
| `guinea_pig` | `gp` | Beschreibend und lesbar |
| `tropical_fish` | `tropicalFish` | Folgt der Unterstrich-Konvention |
| `parrot` | `Parrot_1` | Kleinbuchstaben, keine Zahlen nötig |
| `persian_cat` | `cat_breed_persian` | Prägnant, Rassenebene wenn nötig |

---

## Häufig gestellte Fragen

**F: Kann ich zwei Kategorien zusammenführen?**
A: Es gibt keine eingebaute Zusammenführungsfunktion. Um Kategorien zu konsolidieren, weisen Sie Tiere von einer Kategorie zur anderen zu und löschen Sie dann die leere Kategorie.

**F: Was passiert mit Filtern, wenn ich eine Kategorie deaktiviere?**
A: Die Kategorie wird aus benutzerorientierten Filter-Dropdowns entfernt, bleibt aber in den Admin-Portal-Filtern für Verwaltungszwecke zugänglich.

**F: Kann ich Kategorien umordnen?**
A: Kategorien werden in benutzerorientierten Oberflächen alphabetisch nach Label angezeigt. Die Admin-Tabelle kann nach jeder Spaltenüberschrift sortiert werden.

**F: Gibt es ein Limit für die Anzahl der Kategorien, die ich erstellen kann?**
A: Es gibt kein hartes technisches Limit, aber für die Benutzerfreundlichkeit halten Sie die Gesamtzahl überschaubar (unter 30 wird empfohlen), damit Benutzer die richtige Kategorie leicht finden können.

---

*Zurück: [App-Benutzer](./users.md)*
