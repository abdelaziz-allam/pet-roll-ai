# Certyfikaty zdrowotne

Modul Certyfikatow zdrowotnych umozliwia administratorom zarzadzanie i weryfikacje certyfikatow zdrowotnych zwierzat przeslanych przez weterynarzy lub wlascicieli zwierzat. Zapewnia to, ze zwierzeta wystawione na platformie posiadaja wazna, aktualna dokumentacje zdrowotna.

![Health Records](/docs/screenshots/health-certifications.png)

---

## Tabela certyfikatow

Glowny widok wyswietla wszystkie zgloszenia certyfikatow zdrowotnych w tabeli danych.

| Kolumna | Opis |
|---------|------|
| Imie zwierzecia | Imie zwierzecia, do ktorego nalezy certyfikat |
| Dane weterynarza | Imie weterynarza i klinika |
| Lokalizacja | Kraj i miasto, w ktorym certyfikat zostal wystawiony |
| Data certyfikatu | Data wystawienia certyfikatu przez weterynarza |
| Dokumenty | Liczba zalaczonych dokumentow certyfikacyjnych |
| Status | Biezacy status certyfikatu w formie odznaki |

### Akcje w tabeli

- Kliknij dowolny wiersz, aby otworzyc **Panel szczegolow** po prawej stronie.
- Uzyj przyciskow akcji w ostatniej kolumnie do szybkiego zatwierdzenia/odrzucenia.
- Sortuj wedlug dowolnej kolumny, klikajac naglowek kolumny.

---

## Filtry

Pasek filtrow nad tabela zapewnia cztery opcje filtrowania:

### Filtr statusu

Filtruj certyfikaty wedlug ich biezacego statusu:

| Status | Kolor odznaki | Opis |
|--------|---------------|------|
| Oczekujace | Pomaranczowy | Oczekuje na przeglad administratora |
| Zatwierdzone | Zielony | Certyfikat zweryfikowany i aktywny |
| Odrzucone | Czerwony | Certyfikat nie przeszedl przegladu |
| Cofniete | Ciemnoczerwony | Wczesniej zatwierdzony certyfikat uniewazniony |
| Wygasle | Szary | Okres waznosci certyfikatu zakonczyl sie |

### Filtr gatunku

Filtruj wedlug gatunku zwierzecia:

- Pies
- Kot
- Ptak
- Krolik
- Inne

### Filtr kraju

Wybierz jeden lub wiecej krajow, aby filtrowac wedlug lokalizacji wystawienia certyfikatu.

### Filtr miasta

Dalsze zawezenie przez wybranie konkretnych miast w wybranym kraju.

> **Wskazowka:** Filtry mozna laczyc. Na przyklad filtruj wedlug Status: Oczekujace + Gatunek: Pies + Kraj: Niemcy, aby zobaczyc wszystkie oczekujace certyfikaty psow z Niemiec.

---

## Panel szczegolow

Klikniecie wiersza certyfikatu otwiera panel szczegolow po prawej stronie ekranu. Panel zawiera wyczerpujace informacje zorganizowane w sekcje.

### Baner statusu

U gory panelu kolorowy baner wyswietla:

- Biezacy status z ikona odznaki
- Date ostatniej zmiany statusu
- Nazwe administratora, ktory ostatnio podjal akcje wobec certyfikatu (jesli dotyczy)
- Powod odrzucenia lub cofniecia (jesli dotyczy, wyswietlany w alercie ostrzegawczym)

### Sekcja informacji o zwierzeciu

| Pole | Opis |
|------|------|
| Imie zwierzecia | Zarejestrowane imie zwierzecia |
| Gatunek | Gatunek zwierzecia |
| Rasa | Rasa zwierzecia |
| Data urodzenia | Data urodzenia zwierzecia |
| ID mikroczipa | Unikalny identyfikator mikroczipa (jesli dostepny) |
| Wlasciciel | Imie wlasciciela zwierzecia z linkiem do jego profilu |

### Sekcja danych weterynaryjnych

| Pole | Opis |
|------|------|
| Imie weterynarza | Pelne imie i nazwisko wystawiajacego weterynarza |
| Nazwa kliniki | Nazwa kliniki weterynaryjnej |
| Adres kliniki | Pelny adres kliniki |
| Numer licencji | Numer licencji zawodowej weterynarza |
| Telefon | Numer kontaktowy kliniki |
| Email | Adres email kliniki (jesli podany) |

> **Wskazowka:** Zweryfikuj numer licencji w bazie danych licencji weterynaryjnych danego kraju podczas przegladania certyfikatow z nieznanych klinik.

### Pasek postepu waznosci

Ponizej danych weterynaryjnych pasek postepu wizualizuje okres waznosci certyfikatu:

1. Pasek rozciaga sie od **Daty certyfikatu** (poczatek) do **Daty wygasniecia** (koniec).
2. Biezaca data jest wskazana znacznikiem na pasku.
3. Kodowanie kolorami:
   - **Zielony:** Ponad 30 dni do wygasniecia
   - **Zolty:** 30 dni lub mniej do wygasniecia
   - **Czerwony:** Wygasl
4. Procent zuzytej waznosci jest wyswietlany jako tekst.

### Siatka dokumentow

Sekcja dokumentow wyswietla przeslane pliki certyfikacyjne w ukladzie siatki.

1. Kazdy dokument jest pokazany jako karta miniaturowa z nazwa pliku ponizej.
2. Kliknij dowolna miniature, aby otworzyc nakladke **Podgladu obrazu**.
3. W nakladce podgladu:
   - Uzyj kontrolek przyblizania/oddalania, aby sprawdzic szczegoly.
   - Nawiguj miedzy dokumentami strzalkami lewo/prawo.
   - Pobierz oryginalny plik za pomoca przycisku pobierania.
   - Nacisnij **Escape**, aby zamknac podglad.
4. Obslugiwane formaty: JPEG, PNG, PDF.

> **Wskazowka:** Szukaj oficjalnych pieczatek weterynaryjnych, podpisow i numerow licencji na dokumentach certyfikacyjnych. Ogolne lub szablonowe dokumenty bez tych elementow powinny byc oznaczone do odrzucenia.

---

## Zatwierdzanie certyfikatu

Aby zatwierdzic certyfikat zdrowotny:

1. Otworz panel szczegolow certyfikatu, klikajac wiersz.
2. Przejrzyj dane weterynaryjne pod katem kompletnosci i wiarygodnosci.
3. Sprawdz wszystkie przeslane dokumenty w siatce dokumentow.
4. Kliknij przycisk **Zatwierdz** na dole panelu.
5. W oknie potwierdzenia:
   - Przejrzyj podsumowanie tego, co zatwierdzasz.
   - Data wygasniecia jest obliczana automatycznie na podstawie typu certyfikatu.
   - Kliknij **Potwierdz**.

### Lista kontrolna zatwierdzenia

Przed zatwierdzeniem zweryfikuj:

- [ ] Imie i nazwisko weterynarza oraz numer licencji sa obecne
- [ ] Dane kliniki sa kompletne i weryfikowalne
- [ ] Dokumenty sa czytelne i zawieraja oficjalne pieczatki/podpisy
- [ ] Data certyfikatu jest aktualna (w ciagu ostatnich 12 miesiecy)
- [ ] Informacje o zwierzeciu na dokumencie zgadzaja sie z rekordem na platformie
- [ ] Brak oznak manipulacji lub falszerstwa dokumentu

### Co dzieje sie po zatwierdzeniu

- Status certyfikatu zmienia sie na **Zatwierdzony**.
- Okres waznosci jest ustalany na podstawie typu certyfikatu.
- Profil zwierzecia wyswietla odznake certyfikatu zdrowotnego.
- Wlasciciel otrzymuje powiadomienie potwierdzajace zatwierdzenie.
- Pasek postepu waznosci staje sie aktywny w panelu szczegolow.

---

## Odrzucanie certyfikatu

Aby odrzucic certyfikat zdrowotny:

1. Otworz panel szczegolow certyfikatu.
2. Zidentyfikuj problemy ze zgloszeniem.
3. Kliknij przycisk **Odrzuc** na dole panelu.
4. W oknie odrzucenia:
   - Wpisz **Powod odrzucenia** w polu tekstowym. To pole jest wymagane.
   - Badz konkretny co do tego, co wymaga poprawienia.
5. Kliknij **Potwierdz odrzucenie**.

### Typowe powody odrzucenia

| Powod | Przykladowa wiadomosc |
|-------|----------------------|
| Nieczytelne dokumenty | "Przeslany dokument jest zbyt niewyrazny do odczytania. Prosimy o przeslanie wyrazniejszego skanu lub zdjecia." |
| Brak danych weterynarza | "Certyfikat nie zawiera numeru licencji weterynarza. Prosimy o ponowne przeslanie z pelnymi danymi weterynarza." |
| Przeterminowany certyfikat | "Ten certyfikat zostal wystawiony ponad 12 miesiecy temu. Prosimy o uzyskanie i przeslanie aktualnego certyfikatu." |
| Niezgodne dane zwierzecia | "Imie zwierzecia na certyfikacie nie zgadza sie z zarejestrowanym imieniem. Prosimy o zweryfikowanie i ponowne przeslanie." |
| Niekompletne dokumenty | "Przeslano tylko strone 1 z 3. Prosimy o przeslanie wszystkich stron certyfikatu." |

### Co dzieje sie po odrzuceniu

- Status certyfikatu zmienia sie na **Odrzucony**.
- Powod odrzucenia jest wyswietlany wlascicielowi zwierzecia.
- Wlasciciel otrzymuje powiadomienie z powodem.
- Wlasciciel moze przeslac nowy certyfikat w miejsce odrzuconego.

> **Wskazowka:** Zawsze podawaj konkretne wskazowki. Powiedz wlascicielowi dokladnie, co poprawic, aby mogl rozwiazac problem w jednym ponownym zgloszeniu.

---

## Cofanie certyfikatu

Cofniecie jest stosowane, gdy wczesniej zatwierdzony certyfikat okaze sie niewazny, sfalszowany lub nieobowiazujacy.

1. Przejdz do certyfikatu (filtruj wedlug Status: Zatwierdzone, jesli potrzeba).
2. Otworz panel szczegolow.
3. Kliknij przycisk **Cofnij** (widoczny tylko dla zatwierdzonych certyfikatow).
4. W oknie cofniecia:
   - Wpisz **Powod cofniecia**. To pole jest wymagane.
   - Potwierdz, ze akcja jest natychmiastowa i nieodwracalna.
5. Kliknij **Potwierdz cofniecie**.

### Kiedy cofac

- Sfalszowana dokumentacja odkryta po zatwierdzeniu
- Licencja weterynaryjna uznana za niewazna lub cofnieta
- Wlasciciel zglasza, ze certyfikat zostal przeslany omylkowo
- Organ regulacyjny zglasza zastrzezenia do certyfikatu

### Co dzieje sie po cofnieciu

- Odznaka certyfikatu zdrowotnego jest natychmiast usuwana z profilu zwierzecia.
- Status certyfikatu zmienia sie na **Cofniety**.
- Powod cofniecia jest przechowywany i widoczny w panelu szczegolow.
- Wlasciciel jest powiadamiany przez email i powiadomienie w aplikacji.
- Wlasciciel musi przeslac nowy certyfikat, jesli chce przywrocic odznake.

> **Wskazowka:** Cofniecie to powazna akcja, ktora wplywa na sygnaly zaufania zwierzecia na platformie. Upewnij sie, ze masz wystarczajace dowody przed przystapieniem.

---

## Zrozumienie waznosci i wygasania

Certyfikaty zdrowotne maja zdefiniowany okres waznosci okreslajacy, jak dlugo certyfikat pozostaje aktywny po zatwierdzeniu.

### Jak dziala waznosc

1. Gdy certyfikat zostaje zatwierdzony, system oblicza date wygasniecia.
2. Okres waznosci zalezy od typu certyfikatu:
   - Ogolny certyfikat zdrowotny: 12 miesiecy
   - Certyfikat szczepien: Zalezy od harmonogramu szczepien
   - Certyfikat przydatnosci do rozrodu: 6 miesiecy
3. **Pasek postepu waznosci** w panelu szczegolow wizualnie pokazuje pozostaly czas.

### Powiadomienia o wygasaniu

System wysyla automatyczne powiadomienia w miare zblizania sie wygasniecia:

| Dni przed wygasnieciem | Powiadomienie |
|-------------------------|---------------|
| 30 dni | Pierwsze przypomnienie dla wlasciciela o odnowieniu |
| 14 dni | Drugie przypomnienie z pilnoscia |
| 7 dni | Ostatnie ostrzezenie |
| 0 dni | Powiadomienie o wygasnieciu certyfikatu |

### Po wygasnieciu

- Status certyfikatu automatycznie zmienia sie na **Wygasly**.
- Odznaka zdrowotna jest usuwana z profilu zwierzecia.
- Wygasly certyfikat pozostaje w historii jako punkt odniesienia.
- Wlasciciel moze przeslac nowy certyfikat w dowolnym momencie.

> **Wskazowka:** Monitoruj tabele certyfikatow filtrowana wedlug "Zatwierdzone" i posortowana wedlug daty wygasniecia, aby proaktywnie identyfikowac certyfikaty bliskie wygasniecia w Twoim regionie.

---

## Akcje zbiorcze

Dla efektywnego przetwarzania wielu certyfikatow:

1. Uzyj pol wyboru po lewej stronie tabeli, aby zaznaczyc wiele wierszy.
2. Pasek akcji zbiorczych pojawia sie u gory tabeli.
3. Dostepne akcje zbiorcze:
   - **Zatwierdz wszystkie** -- Zatwierdza wszystkie zaznaczone oczekujace certyfikaty z domyslnym wygasnieciem.
   - **Eksportuj** -- Pobiera zaznaczone certyfikaty jako raport CSV.

> **Wskazowka:** Zatwierdzanie zbiorcze powinno byc uzywane tylko gdy indywidualnie zweryfikowales dokumenty kazdego zaznaczonego certyfikatu. Nigdy nie zatwierdzaj zbiorczo bez przegladu dokumentow.

---

## Czesto zadawane pytania

**P: Czy moge edytowac date wygasniecia zatwierdzonego certyfikatu?**
O: Nie. Aby zmienic date wygasniecia, musisz cofnac biezacy certyfikat i poprosic wlasciciela o ponowne zgloszenie.

**P: Co jesli dokument certyfikatu jest w jezyku, ktorego nie rozumiem?**
O: Przekaz sprawe administratorowi, ktory czyta ten jezyk, lub popros wlasciciela o dostarczenie certyfikowanego tlumaczenia.

**P: Czy zwierze moze miec wiele aktywnych certyfikatow?**
O: Tak. Zwierze moze miec jednoczesnie aktywny ogolny certyfikat zdrowotny i konkretne certyfikaty szczepien.

**P: Kto otrzymuje powiadomienia o odrzuceniu/cofnieciu?**
O: Zarejestrowany wlasciciel zwierzecia otrzymuje wszystkie powiadomienia przez email i wiadomosci w aplikacji.

---
