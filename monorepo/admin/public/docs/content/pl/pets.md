# Rejestr zwierząt

Rejestr zwierząt to centralny moduł do przeglądania i zarządzania wszystkimi zwierzętami zarejestrowanymi na platformie Petfolioo. Z tego modułu administratorzy mogą przeglądać pełny katalog zwierząt, wyświetlać szczegółowe profile, weryfikować statusy certyfikatów zdrowia oraz podejmować działania moderacyjne, takie jak blokowanie zwierząt naruszających zasady platformy.

![Pet Registry](/docs/screenshots/pets.png)

---

## Tabela listy zwierząt

Tabela listy zwierząt wyświetla wszystkie zarejestrowane zwierzęta w formacie z paginacją, sortowaniem i filtrami.

### Kolumny tabeli

| Kolumna | Opis | Sortowalna |
|--------|-------------|:--------:|
| Imię | Zarejestrowane imię zwierzęcia | Tak |
| Gatunek | Kategoria gatunku (np. Pies, Kot, Ptak) | Tak |
| Rasa | Konkretna rasa w ramach gatunku | Tak |
| Status | Aktualny status (Aktywny, Zablokowany, Oczekujący) | Tak |
| Płeć | Samiec, Samica lub Nieznana | Tak |
| Lokalizacja | Kraj i miasto zarejestrowanego adresu zwierzęcia | Tak |

### Wskaźniki statusu

| Status | Kolor znacznika | Znaczenie |
|--------|-------------|---------|
| Aktywny | Zielony | Profil zwierzęcia jest aktywny i widoczny dla innych użytkowników |
| Zablokowany | Czerwony | Profil zwierzęcia został ukryty z powodu naruszenia zasad |
| Oczekujący | Pomarańczowy | Profil zwierzęcia oczekuje na przegląd lub weryfikację właściciela |

### Interakcje z tabelą

1. **Kliknij nagłówek kolumny**, aby posortować tabelę według tej kolumny. Strzałka wskazuje kierunek sortowania.
2. **Kliknij wiersz**, aby otworzyć panel szczegółów zwierzęcia po prawej stronie ekranu.
3. **Kontrolki paginacji** na dole pozwalają nawigować między stronami i zmieniać rozmiar strony (10, 20, 50 wpisów na stronę).

> **Wskazówka:** Przytrzymaj `Shift` i kliknij drugi nagłówek kolumny, aby zastosować sortowanie drugorzędne.

---

## Filtry

Pasek filtrów powyżej tabeli listy zwierząt udostępnia wiele sposobów zawężania wyświetlanych wyników.

### Dostępne filtry

| Filtr | Typ | Opis |
|--------|------|-------------|
| Gatunek | Lista rozwijana | Filtruj według gatunku (Pies, Kot, Ptak, Królik, Gad itp.) |
| Status | Lista rozwijana | Filtruj według statusu (Aktywny, Zablokowany, Oczekujący) |
| Płeć | Lista rozwijana | Filtruj według płci (Samiec, Samica, Nieznana) |
| Kraj | Lista rozwijana | Filtruj według kraju rejestracji zwierzęcia |
| Miasto | Lista rozwijana | Filtruj według miasta (opcje aktualizują się na podstawie wybranego kraju) |
| Wyszukiwarka | Pole tekstowe | Wyszukiwanie pełnotekstowe po imieniu, rasie i numerze mikroczipa |

### Stosowanie filtrów

1. Znajdź **pasek filtrów** powyżej tabeli.
2. Kliknij dowolny **filtr rozwijany**, aby zobaczyć dostępne opcje.
3. Wybierz jedną lub więcej wartości z list rozwijanych.
4. Wpisz tekst w polu **Wyszukiwarki**, aby wykonać wyszukiwanie pełnotekstowe.
5. Wyniki aktualizują się automatycznie w miarę stosowania filtrów.
6. Aktywne filtry są wyświetlane jako tagi poniżej paska filtrów.
7. Kliknij **X** na dowolnym tagu filtra, aby go usunąć.
8. Kliknij **Wyczyść wszystko**, aby zresetować wszystkie filtry naraz.

### Kombinacje filtrów

Filtry są łączone logiką AND. Na przykład:

| Wybrane filtry | Wynik |
|-----------------|--------|
| Gatunek: Pies | Wszystkie psy niezależnie od statusu, płci lub lokalizacji |
| Gatunek: Pies + Płeć: Samica | Wszystkie suczki |
| Gatunek: Pies + Kraj: ZEA + Status: Aktywny | Wszystkie aktywne psy zlokalizowane w ZEA |
| Wyszukiwarka: "Rex" | Wszystkie zwierzęta, których imię, rasa lub mikroczip zawiera "Rex" |

> **Uwaga:** Lista rozwijana miast zależy od wyboru kraju. Najpierw wybierz kraj, aby zobaczyć dostępne miasta.

---

## Panel szczegółów zwierzęcia

Kliknięcie dowolnego wiersza zwierzęcia otwiera panel szczegółów, który wysuwa się z prawej strony ekranu. Ten panel zawiera kompletny profil zwierzęcia podzielony na sekcje.

### Siatka zdjęć

Na górze panelu szczegółów siatka zdjęć wyświetla przesłane zdjęcia zwierzęcia.

| Element | Opis |
|---------|-------------|
| Zdjęcie główne | Wyświetlane większe, oznaczone ikoną gwiazdki |
| Dodatkowe zdjęcia | Pokazywane w układzie siatki (do 6 miniatur) |
| Akcja kliknięcia | Kliknięcie dowolnego zdjęcia otwiera je w pełnoekranowej przeglądarce |
| Brak zdjęć | Wyświetlany jest zastępczy kontur sylwetki |

### Sekcja informacji o zwierzęciu

Poniżej zdjęć wyświetlane są podstawowe dane zwierzęcia w ustrukturyzowanym układzie.

| Pole | Opis | Przykład |
|-------|-------------|---------|
| Imię | Zarejestrowane imię zwierzęcia | "Bella" |
| Gatunek | Kategoria gatunku | "Pies" |
| Rasa | Konkretna rasa | "Golden Retriever" |
| Kolor | Kolor sierści/ciała | "Złoty" |
| Waga | Waga z jednostką | "28,5 kg" |
| Data urodzenia | Urodziny zwierzęcia | "2021-03-15" |
| Wiek | Obliczony na podstawie daty urodzenia | "2 lata, 4 miesiące" |
| Płeć | Samiec lub Samica | "Samica" |
| Numer mikroczipa | Unikalny identyfikator mikroczipa, jeśli wszczepiony | "900118000123456" |
| Kastracja/Sterylizacja | Status kastracji lub sterylizacji | "Tak" / "Nie" / "Nieznany" |
| Data rejestracji | Kiedy zwierzę zostało dodane do platformy | "2023-07-20" |

### Status certyfikatu zdrowia

Sekcja certyfikatu zdrowia pokazuje, czy zwierzę posiada ważną dokumentację zdrowotną.

| Element | Opis |
|---------|-------------|
| Znacznik certyfikatu | Zielony znacznik (ważny), Żółte ostrzeżenie (wkrótce wygasa), Czerwony X (wygasł/brak) |
| Typ certyfikatu | Nazwa certyfikatu zdrowia |
| Data wystawienia | Kiedy certyfikat został wystawiony |
| Data ważności | Kiedy certyfikat wygasa |
| Pasek postępu ważności | Wizualny wskaźnik pozostałego okresu ważności |

**Odczytywanie paska postępu ważności:**

1. **Pełny zielony pasek** oznacza, że certyfikat został niedawno wystawiony i ma większość okresu ważności do wykorzystania.
2. **Częściowy żółty pasek** (poniżej 30% pozostałego czasu) oznacza, że certyfikat zbliża się do wygaśnięcia.
3. **Czerwony pusty pasek** oznacza, że certyfikat wygasł.
4. Procent pozostałego czasu jest wyświetlany jako tekst obok paska.

> **Wskazówka:** Certyfikaty wygasające w ciągu 30 dni są automatycznie oznaczane w module Oczekujących weryfikacji, aby właściciel zwierzęcia mógł zostać powiadomiony.

### Informacje o właścicielu

Sekcja właściciela wyświetla dane o zarejestrowanym właścicielu zwierzęcia.

| Pole | Opis |
|-------|-------------|
| Imię właściciela | Wyświetlana nazwa właściciela zwierzęcia |
| E-mail | Adres e-mail właściciela |
| Telefon | Numer telefonu, jeśli podany |
| Zweryfikowany hodowca | Czy właściciel posiada status zweryfikowanego hodowcy |
| Łączna liczba zwierząt | Ile zwierząt ten właściciel zarejestrował |
| Członek od | Data rejestracji właściciela |

Kliknięcie imienia właściciela przekierowuje do jego pełnego profilu w module Użytkownicy.

### Sekcja lokalizacji

Sekcja lokalizacji pokazuje, gdzie zwierzę jest zarejestrowane.

| Pole | Opis |
|-------|-------------|
| Kraj | Nazwa kraju z ikoną flagi |
| Miasto | Nazwa miasta |
| Adres | Adres ulicy, jeśli podany (może być częściowo ukryty ze względu na prywatność) |

---

## Akcja blokowania/odblokowania zwierzęcia

Administratorzy i moderatorzy mogą zablokować zwierzę, którego profil narusza zasady platformy. Zablokowanie ukrywa zwierzę z widoku publicznego i powiadamia właściciela.

### Blokowanie zwierzęcia

1. Otwórz panel szczegółów zwierzęcia, klikając jego wiersz w tabeli listy.
2. Przewiń na dół panelu lub znajdź sekcję **Akcje**.
3. Kliknij przycisk **Zablokuj zwierzę** (wyświetlany na czerwono).
4. Pojawi się okno potwierdzenia.
5. W polu tekstowym **Powód** wprowadź jasne wyjaśnienie, dlaczego to zwierzę jest blokowane.
6. Wybierz **kategorię naruszenia** z listy rozwijanej (np. Fałszywe ogłoszenie, Nieodpowiednia treść, Zduplikowany profil, Naruszenie zasad).
7. Kliknij **Potwierdź blokadę**.
8. Status zwierzęcia zmieni się na "Zablokowany" i właściciel otrzyma powiadomienie z podanym powodem.

### Wymagania dotyczące powodu blokady

| Wymaganie | Opis |
|-------------|-------------|
| Minimalna długość | Co najmniej 20 znaków |
| Język | Musi być profesjonalny i zrozumiały |
| Szczegółowość | Powinien wskazywać konkretne naruszenie |
| Widoczność | Powód jest wyświetlany bezpośrednio właścicielowi zwierzęcia |

> **Ważne:** Powód blokady, który podasz, zostanie wyświetlony właścicielowi zwierzęcia w powiadomieniu w aplikacji i wiadomości e-mail. Upewnij się, że jest profesjonalny, konkretny i nie zawiera wewnętrznego żargonu.

### Odblokowanie zwierzęcia

1. Użyj filtra **Status**, aby wybrać "Zablokowany" i znaleźć zablokowane zwierzęta.
2. Kliknij wiersz zablokowanego zwierzęcia, aby otworzyć panel szczegółów.
3. Znajdź przycisk **Odblokuj zwierzę** (wyświetlany na zielono) w sekcji Akcje.
4. Pojawi się okno potwierdzenia pokazujące oryginalny powód blokady i datę.
5. Opcjonalnie dodaj notatkę wyjaśniającą, dlaczego blokada jest zdejmowana.
6. Kliknij **Potwierdź odblokowanie**.
7. Status zwierzęcia wróci do "Aktywny" i właściciel zostanie powiadomiony.

### Historia blokad

Panel szczegółów każdego zwierzęcia zawiera sekcję **Historia blokad**, jeśli zwierzę kiedykolwiek było zablokowane:

| Kolumna | Opis |
|--------|-------------|
| Data | Kiedy blokada została nałożona |
| Administrator | Który administrator wykonał akcję |
| Powód | Podany powód blokady |
| Czas trwania | Jak długo blokada trwała |
| Rozwiązanie | Jak została rozwiązana (odblokowanie, odwołanie itp.) |

---

## Operacje masowe

Do zadań moderacyjnych na dużą skalę tabela listy zwierząt obsługuje masowe zaznaczanie.

### Korzystanie z masowego zaznaczania

1. Zaznacz **pole wyboru** po lewej stronie każdego wiersza, który chcesz wybrać.
2. Lub kliknij **pole wyboru w nagłówku**, aby zaznaczyć wszystkie widoczne wiersze na bieżącej stronie.
3. Na górze tabeli pojawia się **pasek akcji masowych** pokazujący liczbę wybranych elementów.
4. Dostępne akcje masowe to:
   - **Eksport** - Pobierz wybrane zwierzęta jako plik CSV
   - **Zmień status** - Zastosuj zmianę statusu do wszystkich wybranych zwierząt

> **Uwaga:** Masowe blokowanie nie jest dostępne przez ten interfejs. Blokady muszą być nakładane indywidualnie, aby każda zawierała konkretny powód.

---

## Eksportowanie danych zwierząt

Aby wyeksportować dane z rejestru zwierząt:

1. Zastosuj żądane filtry, aby zawęzić zbiór danych.
2. Kliknij przycisk **Eksport** w prawym górnym rogu tabeli.
3. Wybierz format eksportu (CSV lub Excel).
4. Wybierz, czy eksportować **przefiltrowane wyniki** czy **wszystkie rekordy**.
5. Plik zostanie pobrany do domyślnej lokalizacji pobierania w Twojej przeglądarce.

### Eksportowane pola

| Pole | Uwzględnione |
|-------|:--------:|
| Imię zwierzęcia | Tak |
| Gatunek | Tak |
| Rasa | Tak |
| Płeć | Tak |
| Status | Tak |
| Kraj | Tak |
| Miasto | Tak |
| E-mail właściciela | Tak |
| Data rejestracji | Tak |
| Numer mikroczipa | Tak |
| Status certyfikatu zdrowia | Tak |

> **Uwaga:** Zdjęcia i szczegółowe kartoteki zdrowia nie są uwzględniane w eksportach. Eksportowane są tylko dane sumaryczne.

---

*Poprzedni: [Panel główny](./dashboard.md) | Następny: [Użytkownicy aplikacji](./users.md)*
