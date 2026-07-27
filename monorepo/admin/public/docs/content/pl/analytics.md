# Analityka

Strona Analityka zapewnia wizualny wgląd w wykorzystanie platformy, wzrost użytkowników, demografię zwierząt i aktywność zdrowotną. Używaj tych wykresów, aby rozumieć trendy, mierzyć zaangażowanie i podejmować decyzje oparte na danych dotyczące platformy Petfolioo.

![Analytics](/docs/screenshots/analytics.png)

> **Access:** Super Admin, Admin, Viewer
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | No access |
> | Viewer | View only |

---

## Przegląd

Panel analityczny prezentuje cztery główne wizualizacje wraz z selektorem zakresu czasowego, który kontroluje okno danych dla wszystkich wykresów. Każdy wykres aktualizuje się dynamicznie po zmianie wybranego zakresu czasowego.

---

## Dostęp do analityki

1. Kliknij **Analityka** w menu nawigacyjnym na pasku bocznym.
2. Panel ładuje się ze wszystkimi wykresami wyświetlanymi na jednej przewijalnej stronie.
3. Domyślny zakres czasowy to **30 dni**.

---

## Selektor zakresu czasowego

Na górze strony Analityka selektor zakresu czasowego pozwala kontrolować okres wyświetlanych danych na wszystkich wykresach.

### Dostępne zakresy

| Opcja | Okres | Najlepszy do |
|-------|-------|--------------|
| **7d** | Ostatnie 7 dni | Monitorowania ostatniej aktywności i trendów krótkoterminowych |
| **30d** | Ostatnie 30 dni | Raportowania miesięcznego i ogólnej analizy trendów (domyślny) |
| **90d** | Ostatnie 90 dni | Przeglądów kwartalnych i identyfikacji wzorców średnioterminowych |
| **1 rok** | Ostatnie 365 dni | Przeglądów rocznych, wzorców sezonowych i długoterminowego wzrostu |

### Zmiana zakresu czasowego

1. Znajdź selektor zakresu czasowego u góry strony.
2. Kliknij jeden z przycisków zakresu: **7d**, **30d**, **90d** lub **1 rok**.
3. Wybrany przycisk zostaje podświetlony, wskazując aktywny zakres.
4. Wszystkie wykresy na stronie odświeżają się, aby wyświetlić dane dla wybranego okresu.
5. Osie i etykiety wykresów dostosowują się automatycznie do nowego okna czasowego.

> **Wskazówka:** Zacznij od 30d dla ogólnego przeglądu, następnie zawęź do 7d, aby zbadać ostatnie anomalie, lub rozszerz do 1 roku dla raportowania na poziomie zarządu.

---

## Wykres wzrostu użytkowników

### Typ wykresu

Wykres liniowy wyświetlający trendy rejestracji użytkowników w czasie.

### Co pokazuje

Wykres wzrostu użytkowników wizualizuje liczbę nowych rejestracji użytkowników w wybranym okresie. Każdy punkt danych reprezentuje skumulowaną lub dzienną liczbę nowych użytkowników.

### Czytanie wykresu

| Element | Opis |
|---------|------|
| **Oś X** | Czas (daty lub tygodnie w zależności od wybranego zakresu) |
| **Oś Y** | Liczba nowych rejestracji użytkowników |
| **Linia** | Ciągła linia łącząca punkty danych pokazująca trajektorię wzrostu |
| **Punkty danych** | Znaczniki na linii, po najechaniu pokazujące dokładne wartości |
| **Podpowiedź** | Pojawia się po najechaniu, pokazując datę i dokładną liczbę rejestracji |

### Interpretacja danych

1. **Trend wzrostowy** -- Stały wzrost pozyskiwania użytkowników. Platforma systematycznie przyciąga nowych użytkowników.
2. **Płaska linia** -- Pozyskiwanie użytkowników osiągnęło plateau. Rozważ działania marketingowe lub premierę nowych funkcji, aby ożywić wzrost.
3. **Skoki** -- Nagłe wzrosty mogą korelować z kampaniami marketingowymi, relacjami prasowymi lub wyróżnieniami w sklepie z aplikacjami.
4. **Spadki** -- Zmniejszenie dziennych rejestracji może wskazywać na wzorce sezonowe lub problemy techniczne.

### Zachowanie zakresu czasowego

| Zakres | Granularność osi X | Uwagi |
|--------|---------------------|-------|
| 7d | Dzienna | Każdy dzień wyświetlany indywidualnie |
| 30d | Dzienna | Każdy dzień wyświetlany, dobry do identyfikacji wzorców tygodniowych |
| 90d | Tygodniowa | Dane zagregowane tygodniowo dla czytelności |
| 1 rok | Miesięczna | Dane zagregowane miesięcznie, aby pokazać roczną trajektorię |

> **Wskazówka:** Porównaj widok 7d z widokiem 30d. Jeśli trend ostatnich 7 dni jest powyżej średniej 30-dniowej, wzrost przyspiesza.

---

## Wykres rozkładu gatunków

### Typ wykresu

Wykres kołowy (lub pierścieniowy) pokazujący proporcje zwierząt według gatunku.

### Co pokazuje

Wykres rozkładu gatunków dzieli wszystkie zarejestrowane zwierzęta według kategorii gatunku, pokazując proporcję każdego z nich.

### Czytanie wykresu

| Element | Opis |
|---------|------|
| **Wycinki** | Każdy wycinek reprezentuje gatunek (np. Pies, Kot, Ptak, Królik) |
| **Kolory** | Każdy gatunek ma przypisany odrębny kolor do identyfikacji |
| **Etykiety** | Nazwa gatunku i procent wyświetlane na lub obok każdego wycinka |
| **Legenda** | Legenda mapuje kolory na nazwy gatunków |
| **Podpowiedź** | Najedź na wycinek, aby zobaczyć dokładną liczbę i procent |

### Interpretacja danych

1. **Dominujący gatunek** -- Największy wycinek wskazuje główny typ zwierząt Twojej bazy użytkowników. Używaj tego do priorytetyzacji funkcji.
2. **Małe wycinki** -- Gatunki z bardzo małym procentem mogą wskazywać na możliwość wzrostu w niedostatecznie obsługiwanych segmentach.
3. **Równowaga** -- Mniej więcej równomierny rozkład sugeruje szeroką atrakcyjność wśród różnych typów właścicieli zwierząt.

### Przypadki użycia

- **Priorytetyzacja funkcji** -- Jeśli 70% zwierząt to psy, priorytetyzuj funkcje specyficzne dla psów.
- **Planowanie treści** -- Twórz treści edukacyjne proporcjonalnie do rozkładu gatunków.
- **Targetowanie marketingowe** -- Zrozum, które segmenty odbiorców są największe dla kampanii reklamowych.
- **Targetowanie powiadomień** -- Segmenty odbiorców w Powiadomieniach (Właściciele psów, Właściciele kotów) korelują bezpośrednio z tym wykresem.

> **Wskazówka:** Jeśli zauważysz, że jeden gatunek rośnie szybciej niż inne w czasie (porównaj 30d z 1 rokiem), rozważ inwestycję w funkcje specyficzne dla tego gatunku, aby wykorzystać trend.

---

## Wykres popularnych ras

### Typ wykresu

Poziomy wykres słupkowy rankingujący najpopularniejsze rasy.

### Co pokazuje

Wykres popularnych ras wyświetla najpopularniejsze rasy zarejestrowane na platformie, uszeregowane według liczby. Słupki rozciągają się poziomo, ułatwiając porównanie popularności między rasami.

### Czytanie wykresu

| Element | Opis |
|---------|------|
| **Oś Y** | Nazwy ras, uporządkowane od najpopularniejszej (góra) do najmniej popularnej (dół) |
| **Oś X** | Liczba zarejestrowanych zwierząt danej rasy |
| **Słupki** | Poziome słupki, których długość reprezentuje liczbę zwierząt |
| **Etykiety** | Wartość liczbowa wyświetlana na końcu każdego słupka |
| **Podpowiedź** | Najedź, aby zobaczyć dokładną liczbę i procent całości |

### Interpretacja danych

1. **Najpopularniejsze rasy** -- Najdłuższe słupki reprezentują najczęściej występujące rasy na platformie. Ci użytkownicy są Twoją główną grupą docelową.
2. **Długi ogon** -- Wiele ras z małą liczbą wskazuje na zróżnicowane zainteresowania użytkowników.
3. **Koncentracja ras** -- Jeśli kilka ras dominuje (np. top 3 stanowi ponad 50%), Twoja platforma ma skoncentrowaną bazę użytkowników.

### Typowe wnioski

| Wzorzec | Wniosek | Działanie |
|---------|---------|-----------|
| Golden Retriever dominuje | Duża grupa rodzin z psami | Priorytetyzuj funkcje dla średnich/dużych ras psów |
| Kot perski w top 5 | Silny segment właścicieli kotów | Inwestuj w śledzenie zdrowia specyficzne dla kotów |
| Pojawiają się egzotyczne rasy | Niszowi hodowcy dołączają | Rozważ funkcje premium specyficzne dla hodowców |
| Równomierny rozkład | Zróżnicowana baza użytkowników | Buduj ogólne funkcje zamiast specyficznych dla ras |

### Limity wykresu

- Wykres domyślnie wyświetla **top 10-15 ras**.
- Pozostałe rasy są grupowane jako „Inne", jeśli dotyczy.
- Liczba widocznych ras może się różnić w zależności od zakresu czasowego.

> **Wskazówka:** Porównuj popularne rasy z danymi o aktywności zdrowotnej. Jeśli popularna rasa ma niską aktywność kart zdrowia, ci użytkownicy mogą potrzebować zachęt do zaangażowania.

---

## Wykres aktywności zdrowotnej

### Typ wykresu

Grupowany wykres słupkowy pokazujący aktywności związane ze zdrowiem kategoryzowane według typu.

### Co pokazuje

Wykres aktywności zdrowotnej wyświetla wolumen działań związanych ze zdrowiem podejmowanych na platformie, pogrupowanych według typu aktywności. Pomaga to zrozumieć, jak aktywnie użytkownicy korzystają z funkcji zdrowotnych.

### Czytanie wykresu

| Element | Opis |
|---------|------|
| **Oś X** | Okresy czasowe (dni, tygodnie lub miesiące w zależności od zakresu) |
| **Oś Y** | Liczba aktywności zdrowotnych |
| **Grupy słupków** | Wiele słupków na okres, po jednym dla każdego typu aktywności |
| **Kolory** | Każdy typ aktywności ma odrębny kolor |
| **Legenda** | Mapuje kolory na typy aktywności (Szczepienia, Badania kontrolne, Leki itp.) |
| **Podpowiedź** | Najedź, aby zobaczyć dokładną liczbę na typ aktywności na okres |

### Typy aktywności

| Aktywność | Opis | Kolor (typowy) |
|-----------|------|----------------|
| **Szczepienia** | Rekordy szczepień utworzone lub zaktualizowane | Niebieski |
| **Karty zdrowia** | Ogólne rekordy zdrowotne zarejestrowane | Zielony |
| **Śledzenie wagi** | Zarejestrowane pomiary wagi | Pomarańczowy |
| **Leki** | Dodane wpisy o lekach | Fioletowy |

### Interpretacja danych

1. **Wysokie słupki szczepień** -- Użytkownicy aktywnie śledzą szczepienia. System przypomnień prawdopodobnie napędza zaangażowanie.
2. **Niskie słupki kart zdrowia** -- Użytkownicy mogą nie wiedzieć o funkcji kart zdrowia. Rozważ podpowiedzi w aplikacji.
3. **Wzorce sezonowe** -- Niektóre aktywności zdrowotne osiągają szczyt sezonowo (np. preparaty na pchły wiosną).
4. **Rosnące słupki w czasie** -- Adopcja funkcji zdrowotnych rośnie, co wskazuje na dobre zaangażowanie użytkowników.
5. **Malejące słupki** -- Użytkownicy mogą tracić zainteresowanie lub napotykać trudności w rejestrowaniu danych zdrowotnych.

### Porównywanie typów aktywności

Format grupowy pozwala wizualnie porównać:

- Które funkcje zdrowotne są najbardziej używane vs. niedostatecznie wykorzystywane.
- Czy jeden typ aktywności rośnie, podczas gdy inne maleją.
- Jak różne zakresy czasowe ujawniają różne wzorce.

> **Wskazówka:** Jeśli aktywność szczepień jest wysoka, ale inne śledzenie zdrowia niskie, rozważ dodanie podpowiedzi międzyfunkcyjnych: „Zarejestrowałeś szczepienie -- czy chcesz również odnotować wagę Rex'a?"

---

## Układ panelu

Cztery wykresy są rozmieszczone na stronie Analityka w układzie siatki:

```
+---------------------------+---------------------------+
|                           |                           |
|    Wzrost użytkowników    |    Rozkład gatunków       |
|    (Wykres liniowy)       |    (Wykres kołowy)        |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Popularne rasy         |    Aktywność zdrowotna    |
|    (Słupkowy poziomy)     |    (Słupkowy grupowany)   |
|                           |                           |
+---------------------------+---------------------------+
```

Każdy wykres zajmuje kartę z:
- Nagłówkiem tytułu
- Wizualizacją wykresu
- Interaktywnymi podpowiedziami po najechaniu
- Responsywnym rozmiarem dostosowującym się do szerokości ekranu

---

## Interakcja z wykresami

### Podpowiedzi po najechaniu

1. Przesuń kursor nad dowolny punkt danych, słupek lub wycinek wykresu.
2. Pojawia się podpowiedź wyświetlająca:
   - Dokładną wartość
   - Etykietę (data, nazwa rasy, gatunek itp.)
   - Procent, gdzie ma to zastosowanie

### Responsywne zachowanie

1. Na większych ekranach wykresy wyświetlają się w siatce 2x2.
2. Na mniejszych ekranach wykresy układają się pionowo dla czytelności.
3. Elementy wykresów zmieniają rozmiar proporcjonalnie.

### Odświeżanie danych

1. Dane analityczne są odświeżane przy ładowaniu strony.
2. Zmiana zakresu czasowego wywołuje nowe pobieranie danych.
3. Nie ma automatycznego odświeżania -- przeładuj stronę ręcznie, aby uzyskać najnowsze dane.

---

## Typowe przepływy pracy analitycznej

### Raportowanie miesięczne

1. Wybierz zakres czasowy **30d**.
2. Zwróć uwagę na trend wzrostu użytkowników (w górę, płaski lub w dół).
3. Sprawdź rozkład gatunków pod kątem zmian.
4. Przejrzyj popularne rasy pod kątem pojawiających się trendów.
5. Zbadaj aktywność zdrowotną pod kątem poziomu zaangażowania.
6. Zrób zrzut ekranu lub wyeksportuj dane do raportów.

### Badanie spadku

1. Zacznij od **30d**, aby zidentyfikować, kiedy spadek wystąpił.
2. Przełącz na **7d**, aby zbadać najnowszy okres szczegółowo.
3. Sprawdź, czy spadek koreluje z:
   - Problemem systemowym (sprawdź historię Trybu konserwacji w Ustawieniach)
   - Wysłanym powiadomieniem (sprawdź historię Powiadomień)
   - Wzorcem sezonowym (porównaj z widokiem 1 roku)

### Przegląd kwartalny

1. Wybierz zakres czasowy **90d**.
2. Porównaj trajektorię wzrostu z poprzednimi kwartałami.
3. Zidentyfikuj, które aktywności zdrowotne rosły najbardziej.
4. Zwróć uwagę na nowe rasy pojawiające się na wykresie popularnych ras.
5. Użyj rozkładu gatunków do walidacji zgodności strategii marketingowej.

### Planowanie roczne

1. Wybierz zakres czasowy **1 rok**.
2. Zidentyfikuj wzorce sezonowe we wzroście użytkowników (np. skoki świąteczne).
3. Śledź zmiany popularności ras rok do roku.
4. Mierz adopcję funkcji zdrowotnych przez cały rok.
5. Wykorzystaj wnioski do kształtowania mapy drogowej produktu.

---

## Zrozumienie aktualności danych

| Aspekt | Szczegóły |
|--------|-----------|
| Źródło danych | Baza danych platformy (zagregowane) |
| Częstotliwość aktualizacji | W czasie rzeczywistym przy ładowaniu strony |
| Dokładność historyczna | Kompletna od momentu uruchomienia platformy |
| Strefa czasowa | Czas serwera (UTC) |
| Brakujące dane | Luki wyświetlane jako wartości zerowe, nie interpolowane |

---

## Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---------|-------------|
| Wykresy się nie ładują | Sprawdź połączenie sieciowe. Odśwież stronę. |
| Dane wydają się nieaktualne | Analityka ładuje się przy wizycie na stronie. Przejdź na inną stronę i wróć lub odśwież. |
| Wartości zerowe dla wszystkich metryk | Zweryfikuj, czy wybrany zakres czasowy zawiera dane. Spróbuj rozszerzyć do 1 roku. |
| Podpowiedzi na wykresach nie pojawiają się | Spróbuj innej przeglądarki. Upewnij się, że JavaScript jest włączony. |
| Zakres czasowy się nie zmienia | Kliknij bezpośrednio na przycisk zakresu. Jeśli nie reaguje, odśwież stronę. |
| Brak dostępu do Analityki | Zweryfikuj, czy Twoja rola i uprawnienia obejmują dostęp do strony Analityka. |

---

## Powiązane strony

- [Ustawienia](./settings.md) -- Konfiguruj ustawienia platformy wpływające na zachowanie użytkowników
- [Powiadomienia](./notifications.md) -- Wysyłaj powiadomienia, które mogą wpływać na metryki zaangażowania
- [Opinie](./feedback.md) -- Koreluj opinie użytkowników z trendami analitycznymi
- [Administratorzy](./admin-users.md) -- Przyznawaj dostęp do analityki członkom zespołu

---
