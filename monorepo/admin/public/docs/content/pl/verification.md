# Weryfikacja hodowcow

Modul Weryfikacji Hodowcow umozliwia administratorom przegladanie, zatwierdzanie, odrzucanie i cofanie wnioskow o weryfikacje hodowcow. Zweryfikowani hodowcy otrzymuja odznake zaufania widoczna dla kupujacych, sygnalizujaca, ze ich hodowla spelnia standardy platformy.

![Verification](/docs/screenshots/verification.png)

---

## Tabela wnioskow o weryfikacje

Glowny widok wyswietla wszystkie zgloszenia weryfikacyjne w przeszukiwalnej, sortowalnej tabeli.

| Kolumna | Opis |
|---------|------|
| Nazwa hodowcy | Pelna nazwa hodowcy, ktory zlozyl wniosek |
| Hodowla | Zarejestrowana nazwa hodowli powiazana z hodowca |
| Nr zgloszenia | Automatycznie nadawany numer zgloszenia (ponowne zgloszenia otrzymuja nowy numer) |
| Liczba dokumentow | Liczba przeslanych dokumentow dolaczonych do zgloszenia |
| Status | Biezacy status weryfikacji w formie odznaki |
| Waznosc | Data wygasniecia weryfikacji (wyswietlana tylko dla zatwierdzonych zgloszen) |

### Filtrowanie tabeli

1. Uzyj listy rozwijanej **Status**, aby filtrowac wedlug: Oczekujace, Zatwierdzone, Odrzucone, Cofniete lub Wygasle.
2. Uzyj pola **Szukaj**, aby znalezc hodowce po nazwie lub nazwie hodowli.
3. Kliknij naglowek dowolnej kolumny, aby posortowac rosnaco lub malejaco.

> **Wskazowka:** Domyslny widok pokazuje najpierw zgloszenia Oczekujace, abys mogl priorytetyzowac nowe wnioski.

---

## Przebieg statusow

Wnioski o weryfikacje przebiegaja wedlug zdefiniowanego cyklu zycia:

```
Oczekujace --> Zatwierdzone --> Wygasle (automatycznie, po dacie waznosci)
   |                |
   |                +--> Cofniete (reczna akcja administratora)
   |
   +--> Odrzucone (hodowca moze zlozyc ponowny wniosek)
```

### Definicje statusow

| Status | Kolor odznaki | Znaczenie |
|--------|---------------|-----------|
| Oczekujace | Pomaranczowy | Oczekuje na przegladniecie przez administratora |
| Zatwierdzone | Zielony | Hodowca jest zweryfikowany, odznaka jest aktywna |
| Odrzucone | Czerwony | Zgloszenie nie spelnilo wymagan |
| Cofniete | Ciemnoczerwony | Administrator recznie usunol status weryfikacji |
| Wygasle | Szary | Okres weryfikacji zakonczyl sie; hodowca musi zlozyc ponowny wniosek |

### Przejscia

- **Oczekujace** moze przejsc do **Zatwierdzone** lub **Odrzucone**.
- **Zatwierdzone** moze przejsc do **Cofniete** (recznie) lub **Wygasle** (automatycznie).
- **Odrzucone** i **Wygasle** pozwalaja hodowcy na utworzenie nowego zgloszenia (nowy wpis Oczekujace).
- **Cofniete** jest stanem koncowym dla danego zgloszenia.

---

## Przegladanie zgloszenia

Aby przejrzec wniosek o weryfikacje hodowcy:

1. Znajdz zgloszenie w tabeli Wnioskow o weryfikacje.
2. Kliknij wiersz lub przycisk akcji **Przegladaj** po prawej stronie.
3. Otworzy sie **Modal szczegolow zgloszenia** z dwiema zakladkami:
   - **Biezace zgloszenie** -- Pokazuje aktywne dokumenty i dane hodowcy.
   - **Historia zgloszen** -- Pokazuje wszystkie poprzednie zgloszenia tego hodowcy.

### Zakladka Biezace zgloszenie

Ta zakladka wyswietla:

- Informacje o profilu hodowcy (imie i nazwisko, email, telefon, numer rejestracji hodowli)
- Przeslane dokumenty w ukladzie siatki
- Date i godzine zgloszenia
- Wszelkie uwagi dodane przez hodowce do zgloszenia

### Zakladka Historia zgloszen

Ta zakladka pokazuje chronologiczna liste wszystkich zgloszen od tego samego hodowcy, w tym:

- Numer zgloszenia
- Date zlozenia
- Koncowy status
- Nazwe recenzenta
- Powod odrzucenia (jesli dotyczy)

> **Wskazowka:** Uzyj zakladki Historia zgloszen, aby sprawdzic, czy hodowca odniose sie do poprzednich powodow odrzucenia przed zatwierdzeniem ponownego zgloszenia.

---

## Podglad dokumentow

Kazdy przeslany dokument pojawia sie jako miniatura w siatce dokumentow.

1. Kliknij dowolna miniature dokumentu, aby otworzyc podglad w pelnym rozmiarze.
2. Uzyj kontrolek przyblizenia, aby sprawdzic szczegoly dokumentu.
3. Nawiguj miedzy dokumentami za pomoca strzalek lewo/prawo w nakladce podgladu.
4. Nacisnij **Escape** lub kliknij przycisk zamkniecia, aby wrocic do modalu szczegolow.

Obslugiwane formaty dokumentow:

- Obrazy JPEG i PNG
- Dokumenty PDF (renderowane jako obrazy stron)

> **Wskazowka:** Zwracaj uwage na czytelnosc, autentycznosc i kompletnosc podczas przegladania przeslanych dokumentow. Niewyrazne lub niekompletne dokumenty powinny byc odrzucone z jasnymi instrukcjami dotyczacymi ponownego zgloszenia.

---

## Zatwierdzanie zgloszenia

Aby zatwierdzic wniosek o weryfikacje hodowcy:

1. Otworz modal szczegolow zgloszenia, klikajac wiersz w tabeli.
2. Dokladnie przejrzyj wszystkie przeslane dokumenty.
3. Kliknij przycisk **Zatwierdz** na dole modalu.
4. W oknie potwierdzenia:
   - Ustaw **Date wygasniecia** weryfikacji. Domyslnie jest to 1 rok od dzisiaj.
   - Opcjonalnie dostosuj date, jesli krotszy lub dluzszy okres jest odpowiedni.
5. Kliknij **Potwierdz zatwierdzenie**.

### Co dzieje sie po zatwierdzeniu

- Profil hodowcy natychmiast otrzymuje odznake weryfikacji.
- Hodowca jest powiadamiany przez email i powiadomienie w aplikacji.
- Status zgloszenia zmienia sie na **Zatwierdzone** w tabeli.
- Data wygasniecia pojawia sie w kolumnie Waznosc.
- Gdy data wygasniecia minie, status automatycznie zmienia sie na **Wygasle**.

> **Wskazowka:** Dla nowych hodowcow z ograniczona dokumentacja, rozwaz ustawienie krotszego okresu waznosci (6 miesiecy), aby zachecic do wczesniejszej ponownej weryfikacji.

---

## Odrzucanie zgloszenia

Aby odrzucic wniosek o weryfikacje hodowcy:

1. Otworz modal szczegolow zgloszenia.
2. Przejrzyj dokumenty i zidentyfikuj problemy.
3. Kliknij przycisk **Odrzuc** na dole modalu.
4. W oknie odrzucenia:
   - Wpisz **Powod odrzucenia** w polu tekstowym. To pole jest wymagane.
   - Badz konkretny co do tego, czego brakuje lub co jest nieodpowiednie.
5. Kliknij **Potwierdz odrzucenie**.

### Co dzieje sie po odrzuceniu

- Status zgloszenia zmienia sie na **Odrzucone**.
- Powod odrzucenia jest widoczny dla hodowcy w jego panelu.
- Hodowca otrzymuje powiadomienie wyjasniajace odrzucenie.
- Hodowca moze utworzyc nowe zgloszenie, aby rozwiazac problemy.

### Pisanie dobrych powodow odrzucenia

| Dobrze | Zle |
|--------|-----|
| "Dokument rejestracji hodowli jest przeterminowany (2019). Prosimy o przeslanie aktualnej rejestracji." | "Dokumenty niewystarczajace." |
| "Zdjecie obiektu jest zbyt niewyrazne, aby zweryfikowac warunki. Prosimy o ponowne przeslanie z wyrazniejszymi zdjeciami." | "Zle zdjecia." |
| "Brak dokumentacji szczepien dla zwierzat hodowlanych." | "Niekompletne." |

> **Wskazowka:** Jasne powody odrzucenia zmniejszaja liczbe wymian korespondencji i pomagaja hodowcom zlozyc kompletne wnioski przy nastepnej probie.

---

## Cofanie weryfikacji

Cofniecie natychmiast usuwa status zweryfikowanego hodowcy. Uzyj tego w przypadku naruszen zasad lub sfalszowan dokumentacji odkrytych po zatwierdzeniu.

1. Przejdz do tabeli Wnioskow o weryfikacje.
2. Filtruj wedlug **Status: Zatwierdzone**, aby znalezc aktywne weryfikacje.
3. Kliknij wiersz, aby otworzyc szczegoly zgloszenia.
4. Kliknij przycisk **Cofnij** (pojawia sie tylko dla zatwierdzonych zgloszen).
5. W oknie cofniecia:
   - Wpisz **Powod cofniecia**. To pole jest wymagane.
   - Potwierdz, ze rozumiesz, iz akcja jest natychmiastowa.
6. Kliknij **Potwierdz cofniecie**.

### Co dzieje sie po cofnieciu

- Odznaka weryfikacji jest natychmiast usuwana z profilu hodowcy.
- Hodowca jest powiadamiany przez email z powodem cofniecia.
- Wszystkie aktywne ogloszenia hodowcy wyswietlaja wskaznik ostrzezenia.
- Status zgloszenia zmienia sie na **Cofniete** (stan koncowy).
- Hodowca nie moze zlozyc ponownego wniosku do tego samego zgloszenia; musi zaczac od nowa.

> **Wskazowka:** Cofniecie jest powazna akcja. Dokkladnie udokumentuj powod na wypadek sporow. Rozwaz skontaktowanie sie z hodowca przed cofnieciem, jesli problem jest drobny.

---

## Widok osi czasu

Widok osi czasu zapewnia wizualna historie sciezki weryfikacji hodowcy.

1. Otworz dowolny modal szczegolow zgloszenia.
2. Przejdz do zakladki **Historia zgloszen**.
3. Os czasu wyswietla wydarzenia w kolejnosci chronologicznej:
   - Zgloszenie utworzone
   - Dokumenty przeslane
   - Przeglad administratora rozpoczety
   - Status zmieniony (z nazwa recenzenta)
   - Wyslane ostrzezenia o wygasnieciu
   - Powiazane ponowne zgloszenia

### Odczytywanie osi czasu

Kazdy wpis na osi czasu pokazuje:

- **Date i godzine** wydarzenia
- **Ikone typu wydarzenia** (dokument, zmiana statusu, powiadomienie)
- **Aktora** (nazwa hodowcy lub administratora)
- **Szczegoly** (tekst powodu, nazwy dokumentow, ustawiona data waznosci)

### Zastosowania osi czasu

- **Rozwiazywanie sporow:** Przegladaj pelna historie, gdy hodowca kwestionuje odrzucenie.
- **Sciezka audytu:** Sledz, ktory administrator przejrzal i zatwierdzil/odrzucil kazde zgloszenie.
- **Wykrywanie wzorcow:** Identyfikuj hodowcow, ktorzy wielokrotnie przesylaja nieodpowiednia dokumentacje.

> **Wskazowka:** Os czasu jest tylko do odczytu. Wszystkie akcje (zatwierdzenie, odrzucenie, cofniecie) musza byc wykonywane z zakladki Biezace zgloszenie.

---

## Skroty klawiszowe

| Skrot | Akcja |
|-------|-------|
| Enter | Otworz wybrane zgloszenie |
| Escape | Zamknij modal |
| Tab | Przelacz miedzy zakladkami modalu |
| Strzalki | Nawiguj miedzy dokumentami w podgladzie |

---

## Czesto zadawane pytania

**P: Czy moge zatwierdzic zgloszenie warunkowo?**
O: Nie. Zatwierdzenia sa bezwarunkowe. Jesli dokumenty sa czesciowo akceptowalne, odrzuc z konkretnymi instrukcjami co poprawic, a nastepnie zatwierdz ponowne zgloszenie.

**P: Co dzieje sie z ogloszeniami hodowcy, gdy jego weryfikacja wygasnie?**
O: Ogloszenia pozostaja aktywne, ale odznaka weryfikacji jest usuwana. Hodowca jest powiadamiany 30 dni przed wygasnieciem, aby zachecic do ponownego zgloszenia.

**P: Czy hodowca z cofnieta weryfikacja moze ponownie aplikowac?**
O: Tak, ale musi utworzyc calkowicie nowe zgloszenie. Poprzednie cofniete zgloszenie pozostaje w historii do celow audytu.

**P: Kto moze wykonywac akcje weryfikacyjne?**
O: Tylko administratorzy z rola Menedzera Weryfikacji moga zatwierdzac, odrzucac lub cofac zgloszenia.

---
