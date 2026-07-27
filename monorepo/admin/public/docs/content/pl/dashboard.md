# Panel główny

Panel główny to pierwszy ekran widoczny po zalogowaniu do Panelu Administracyjnego Petfolioo. Zapewnia przegląd kondycji platformy w czasie rzeczywistym poprzez kluczowe wskaźniki efektywności (KPI), interaktywne wykresy oraz kanały ostatniej aktywności. Używaj panelu głównego do monitorowania trendów wzrostu, identyfikowania obszarów wymagających uwagi oraz śledzenia zaangażowania na platformie na pierwszy rzut oka.

![Dashboard](/docs/screenshots/dashboard.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View |
> | Admin | View |
> | Moderator | View |
> | Viewer | View |

---

## Karty KPI

Na górze panelu głównego cztery karty podsumowujące wyświetlają najważniejsze metryki platformy. Każda karta pokazuje aktualną sumę oraz wskaźnik procentowej zmiany w porównaniu z poprzednim okresem.

### Definicje kart

| Karta | Metryka | Opis |
|------|--------|-------------|
| Łączna liczba użytkowników | Liczba zarejestrowanych użytkowników aplikacji | Wszyscy użytkownicy, którzy utworzyli konto na platformie |
| Łączna liczba zwierząt | Liczba zarejestrowanych zwierząt | Wszystkie zwierzęta dodane do rejestru niezależnie od statusu |
| Oczekujące weryfikacje | Elementy oczekujące na przegląd | Wnioski o weryfikację, które nie zostały jeszcze zatwierdzone lub odrzucone |
| Aktywne ogłoszenia | Obecnie widoczne ogłoszenia | Zwierzęta oznaczone jako dostępne do hodowli lub adopcji |

### Procent wzrostu

Każda karta KPI zawiera wskaźnik wzrostu:

- **Zielona strzałka w górę** z procentem oznacza wzrost w porównaniu z poprzednim okresem.
- **Czerwona strzałka w dół** z procentem oznacza spadek w porównaniu z poprzednim okresem.
- Okres porównawczy odpowiada wybranemu zakresowi czasowemu (patrz Selektor zakresu czasowego poniżej).

> **Wskazówka:** Najedź kursorem na kartę KPI, aby zobaczyć dokładne liczby dla bieżącego i poprzedniego okresu w dymku podpowiedzi.

### Odczytywanie kart

1. **Duża liczba** to aktualna suma.
2. **Znacznik procentowy** poniżej pokazuje zmianę okres do okresu.
3. **Etykieta** u góry identyfikuje wyświetlaną metrykę.
4. Kliknij dowolną kartę, aby przejść bezpośrednio do odpowiedniego modułu (np. kliknięcie "Łączna liczba użytkowników" otwiera listę Użytkowników).

---

## Selektor zakresu czasowego

Selektor zakresu czasowego kontroluje okno danych dla wszystkich analiz panelu głównego i porównań KPI.

### Dostępne zakresy

| Opcja | Okres | Porównanie z |
|--------|--------|--------------------|
| 7d | Ostatnie 7 dni | Poprzednie 7 dni |
| 30d | Ostatnie 30 dni | Poprzednie 30 dni |
| 90d | Ostatnie 90 dni | Poprzednie 90 dni |
| Cały okres | Od uruchomienia platformy | Brak porównania (procent wzrostu ukryty) |

### Jak zmienić zakres czasowy

1. Znajdź **selektor zakresu czasowego** w prawym górnym rogu panelu głównego, powyżej kart KPI.
2. Kliknij jeden z przycisków okresu: **7d**, **30d**, **90d** lub **Cały okres**.
3. Cały panel główny odświeży się, odzwierciedlając wybrany okres.
4. Procenty wzrostu KPI zostaną przeliczone na podstawie nowego okna porównawczego.

> **Uwaga:** Opcja "Cały okres" ukrywa procenty wzrostu, ponieważ nie ma wcześniejszego okresu do porównania.

---

## Sekcja analityki zwierząt

Poniżej kart KPI sekcja analityki zwierząt przedstawia wizualne rozkłady danych z rejestru zwierząt. Trzy typy wykresów dają różne perspektywy na populację zwierząt.

### Rozkład gatunków (wykres kołowy)

Wykres kołowy pokazuje proporcjonalny podział zwierząt według gatunków.

| Element | Opis |
|---------|-------------|
| Typ wykresu | Wykres pierścieniowy/kołowy |
| Źródło danych | Wszystkie zarejestrowane zwierzęta pogrupowane według gatunków |
| Segmenty | Jeden segment na gatunek (np. Pies, Kot, Ptak, Królik, Gad) |
| Etykiety | Nazwa gatunku i liczba wyświetlane po najechaniu kursorem |
| Legenda | Legenda z kodami kolorów poniżej lub obok wykresu |

**Interakcja z wykresem kołowym:**

1. Najedź kursorem na dowolny segment, aby zobaczyć dokładną liczbę i procent dla danego gatunku.
2. Kliknij segment, aby przefiltrować inne wykresy panelu głównego do wybranego gatunku.
3. Elementy legendy są klikalne - kliknij nazwę gatunku, aby przełączyć jego widoczność na wykresie.

### Rozkład płci (wykres słupkowy)

Pionowy wykres słupkowy pokazuje rozkład zwierząt według płci.

| Element | Opis |
|---------|-------------|
| Typ wykresu | Pionowy wykres słupkowy |
| Oś X | Kategorie płci (Samiec, Samica, Nieznana) |
| Oś Y | Liczba zwierząt |
| Słupki | Jeden słupek na płeć, oznaczony kolorem |
| Etykiety | Liczba wyświetlana nad każdym słupkiem |

**Odczytywanie wykresu płci:**

1. Każdy słupek reprezentuje jedną kategorię płci.
2. Wysokość słupka odpowiada łącznej liczbie zwierząt danej płci.
3. Dokładna liczba jest wyświetlana jako etykieta nad każdym słupkiem.
4. Najedź kursorem, aby zobaczyć dodatkowe szczegóły, w tym procent całości.

### Rozkład krajów (poziomy wykres słupkowy)

Poziomy wykres słupkowy rankinguje kraje według liczby zarejestrowanych zwierząt.

| Element | Opis |
|---------|-------------|
| Typ wykresu | Poziomy wykres słupkowy |
| Oś Y | Nazwy krajów (posortowane malejąco według liczby) |
| Oś X | Liczba zwierząt |
| Słupki | Jeden poziomy słupek na kraj |
| Wyświetlanie | Domyślnie pokazywanych jest 10 najlepszych krajów |

**Odczytywanie wykresu krajów:**

1. Kraje są posortowane od największej liczby zwierząt (góra) do najmniejszej (dół).
2. Domyślnie wyświetlanych jest tylko 10 najlepszych krajów.
3. Najedź kursorem na słupek, aby zobaczyć dokładną liczbę i procent całości.
4. Długość słupka jest proporcjonalna do liczby w stosunku do innych krajów.

---

## Filtry geograficzne i gatunkowe

Powyżej wykresów analitycznych znajdują się kontrolki filtrów, które pozwalają zawęzić wyświetlane dane.

### Dostępne filtry

| Filtr | Typ | Opcje |
|--------|------|---------|
| Gatunek | Lista rozwijana | Wszystkie gatunki dostępne na platformie (np. Pies, Kot, Ptak itp.) |
| Kraj | Lista rozwijana | Wszystkie kraje z zarejestrowanymi zwierzętami |

### Stosowanie filtrów

1. Kliknij listę rozwijaną **Gatunek**, aby wybrać konkretny gatunek zwierzęcia.
2. Kliknij listę rozwijaną **Kraj**, aby wybrać konkretny kraj.
3. Wykresy i tabele poniżej natychmiast zaktualizują się, odzwierciedlając filtr.
4. Filtry można łączyć - wybierz zarówno gatunek, jak i kraj, aby dodatkowo zawęzić wyniki.
5. Aby zresetować, wybierz "Wszystkie" z każdej listy rozwijanej lub kliknij przycisk **Resetuj filtry**.

> **Wskazówka:** Użyj filtra gatunków na widoku wykresu kołowego, aby zagłębić się w rozkłady ras w ramach jednego gatunku.

### Zachowanie filtrów

| Scenariusz | Efekt |
|----------|--------|
| Brak wybranych filtrów | Wszystkie dane wyświetlane globalnie |
| Wybrany tylko gatunek | Wykresy pokazują dane dla tego gatunku we wszystkich krajach |
| Wybrany tylko kraj | Wykresy pokazują dane dla wszystkich gatunków w tym kraju |
| Oba wybrane | Wykresy pokazują dane dla wybranego gatunku w wybranym kraju |

---

## Tabela ostatnich rejestracji użytkowników

Poniżej wykresów analitycznych tabela wyświetla najnowsze rejestracje użytkowników na platformie.

### Kolumny tabeli

| Kolumna | Opis |
|--------|-------------|
| Awatar | Miniatura zdjęcia profilowego użytkownika |
| Imię i nazwisko | Wyświetlana nazwa użytkownika |
| E-mail | Zarejestrowany adres e-mail użytkownika |
| Data dołączenia | Data i godzina utworzenia konta |
| Status | Status konta (Aktywny, Oczekujący, Zablokowany) |
| Zwierzęta | Liczba zwierząt zarejestrowanych przez tego użytkownika |

### Funkcje tabeli

1. **Sortowanie** - Kliknij nagłówek dowolnej kolumny, aby posortować według tej kolumny. Kliknij ponownie, aby odwrócić kolejność sortowania.
2. **Paginacja** - Tabela domyślnie pokazuje 10 wpisów na stronę. Użyj kontrolek paginacji na dole do nawigacji.
3. **Szybkie akcje** - Najedź kursorem na wiersz, aby wyświetlić przycisk "Wyświetl", który otwiera panel szczegółów użytkownika.

### Znaczenie wskaźników statusu

| Status | Kolor znacznika | Znaczenie |
|--------|-------------|---------|
| Aktywny | Zielony | Konto jest w dobrym stanie i w pełni funkcjonalne |
| Oczekujący | Pomarańczowy | Konto utworzone, ale e-mail nie został jeszcze zweryfikowany |
| Zablokowany | Czerwony | Konto zostało zawieszone przez administratora |

> **Uwaga:** Tabela ostatnich rejestracji zawsze pokazuje najnowszych użytkowników jako pierwszych, niezależnie od ustawienia selektora zakresu czasowego. Wyświetla rejestracje z ostatnich 30 dni.

---

## Najlepsze praktyki korzystania z panelu głównego

### Codzienna lista kontrolna monitorowania

1. Sprawdź kartę KPI **Oczekujące weryfikacje** - wysoka liczba może wskazywać na zaległości.
2. Przejrzyj **procenty wzrostu** na wszystkich czterech kartach pod kątem nieoczekiwanych spadków.
3. Przeskanuj tabelę **Ostatnich rejestracji użytkowników** pod kątem podejrzanych kont.
4. Zwróć uwagę na znaczące zmiany w wykresie **Rozkładu krajów**.

### Interpretacja trendów

| Trend | Możliwe znaczenie | Zalecane działanie |
|-------|-------------------|-------------------|
| Nagły skok rejestracji | Sukces kampanii marketingowej lub aktywność botów | Sprawdź ostatnich użytkowników pod kątem podejrzanych wzorców |
| Spadek aktywnych ogłoszeń | Zmiana sezonowa lub problem z polityką | Przejrzyj ostatnie blokady i wygaśnięcia ogłoszeń |
| Dużo oczekujących weryfikacji | Niewystarczająca kadra moderatorska | Przydziel dodatkowych moderatorów |
| Zmiana proporcji gatunków | Trend regionalny lub błąd konfiguracji kategorii | Przejrzyj ustawienia kategorii |

---

## Wydajność panelu głównego

Panel główny ładuje dane asynchronicznie. Każda sekcja ładuje się niezależnie:

1. **Karty KPI** ładują się jako pierwsze (najszybsze zapytanie).
2. **Wykresy** ładują się następnie z krótkim wskaźnikiem ładowania.
3. **Tabela ostatnich rejestracji** ładuje się jako ostatnia.

Jeśli w jakiejkolwiek sekcji pojawia się błąd ładowania:

1. Sprawdź połączenie internetowe.
2. Spróbuj odświeżyć stronę.
3. Jeśli błąd się utrzymuje, usługa backendowa może mieć problemy.

> **Wskazówka:** Panel główny automatycznie odświeża się co 5 minut. Możesz ręcznie odświeżyć, klikając ikonę odświeżania w nagłówku lub naciskając `F5`.

---

*Poprzedni: [Pierwsze kroki](./getting-started.md) | Następny: [Rejestr zwierząt](./pets.md)*
