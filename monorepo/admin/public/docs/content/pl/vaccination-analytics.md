# Analityka szczepien

Modul Analityki szczepien zapewnia administratorom wglad w trendy szczepien na calej platformie. Uzyj tego dashboardu, aby zrozumiec, ktore szczepionki sa najczesciej podawane, zidentyfikowac wzorce regionalne i sledzic ogolne pokrycie szczepien.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | View |
> | Viewer | View only |

---

## Przeglad dashboardu

Strona Analityki szczepien jest podzielona na nastepujace sekcje:

1. **Statystyki podsumowujace** -- Kluczowe metryki u gory strony
2. **Ranking Top 20 szczepionek** -- Lista rankingowa najczesciej stosowanych szczepionek
3. **Wizualizacja podium** -- Wyroznienie top 3 szczepionek
4. **Rozbicie per szczepionka** -- Rozklad gatunkow dla kazdej szczepionki
5. **Najczestsze lokalizacje** -- Rozklad geograficzny per szczepionka

---

## Statystyki podsumowujace

U gory strony analitycznej trzy karty statystyk wyswietlaja zagregowane metryki:

| Karta statystyk | Opis | Ikona |
|-----------------|------|-------|
| Laczna liczba szczepien | Calkowita liczba rekordow szczepien dla wszystkich zwierzat | Strzykawka |
| Unikalne szczepionki | Liczba odrebnych typow szczepionek podanych | Kolba |
| Zaszczepione zwierzeta | Liczba unikalnych zwierzat z co najmniej jednym szczepieniem | Lapa |

### Odczytywanie statystyk

- **Laczna liczba szczepien** liczy indywidualne zdarzenia szczepien (jedno zwierze otrzymujace jedna szczepionke = 1 liczenie).
- **Unikalne szczepionki** pokazuje roznorodnosc szczepionek w systemie (np. Wscieklizna, DHPP, FVRCP kazda liczy sie jako 1).
- **Zaszczepione zwierzeta** jest deduplikowane -- zwierze z 5 szczepieniami nadal liczy sie jako 1 zwierze.

> **Wskazowka:** Porownaj Laczna liczbe szczepien z Zaszczepionymi zwierzetami, aby zrozumiec srednia liczbe szczepien na zwierze na platformie.

---

## Filtry

Pasek filtrow stosuje sie do wszystkich sekcji strony analitycznej jednoczesnie.

### Filtr okresu czasu

Wybierz zakres czasowy dla danych:

| Opcja | Opis |
|-------|------|
| Ostatnie 7 dni | Ostatni tydzien |
| Ostatnie 30 dni | Ostatni miesiac |
| Ostatnie 90 dni | Ostatni kwartal |
| Ostatnie 12 miesiecy | Ostatni rok |
| Caly okres | Bez ograniczen czasowych |
| Zakres niestandardowy | Selektor dat dla daty poczatkowej i koncowej |

### Filtr gatunku

Filtruj dane szczepien wedlug gatunku zwierzecia:

- Wszystkie gatunki (domyslnie)
- Pies
- Kot
- Ptak
- Krolik
- Inne

### Filtr kraju

Wybierz jeden lub wiecej krajow, aby zobaczyc dane szczepien tylko z tych regionow.

### Filtr miasta

Dalsze zawezenie wynikow przez wybranie konkretnych miast w wybranym kraju.

> **Wskazowka:** Lacz filtry, aby odpowiedziec na konkretne pytania. Na przyklad: "Jakie sa najczestsze szczepionki dla psow w Wielkiej Brytanii w ostatnich 12 miesiacach?"

### Stosowanie filtrow

1. Ustaw zadane wartosci filtrow za pomoca list rozwijanych.
2. Kliknij **Zastosuj filtry** lub filtry stosuja sie automatycznie po zmianie.
3. Wszystkie sekcje dashboardu aktualizuja sie, aby odzwierciedlic przefiltrowane dane.
4. Aktywne filtry sa wyswietlane jako tagi ponizej paska filtrow.
5. Kliknij **X** na dowolnym tagu filtra, aby go usunac, lub kliknij **Wyczysc wszystkie**, aby zresetowac.

---

## Ranking Top 20 szczepionek

Ranking wyswietla 20 najczesciej podawanych szczepionek na podstawie biezacego wyboru filtrow.

### Kolumny tabeli

| Kolumna | Opis |
|---------|------|
| Pozycja | Pozycja od 1 do 20 |
| Nazwa szczepionki | Nazwa szczepionki |
| Liczba | Ile razy zostala podana |
| Procent | Udzial w lacznej liczbie szczepien |
| Trend | Sparkline pokazujaca trend uzycia w wybranym okresie |

### Odczytywanie rankingu

1. Szczepionki sa sortowane wedlug liczby malejaco.
2. Kolumna **Procent** pokazuje, jaka czesc wszystkich szczepien stanowi ta szczepionka.
3. **Sparkline** trendu daje szybki wizualny obraz, czy uzycie rosnie, jest stabilne, czy spada.
4. Najedz kursorem na sparkline, aby zobaczyc wartosci punktow danych.

### Interakcja z rankingiem

- Kliknij dowolny wiersz szczepionki, aby przewinac do jej szczegolowej sekcji rozbicia.
- Uzyj naglowkow kolumn do ponownego sortowania (choc domyslna kolejnosc pozycji jest najbardziej uzyteczna).
- Tabela jest paginowana, jesli filtry w rzadkich konfiguracjach daja wiecej niz 20 wynikow.

> **Wskazowka:** Szczepionka z trendem rosnacym moze wskazywac na reakcje na regionalna epidemie lub nowa rekomendacje stowarzyszen weterynaryjnych.

---

## Wizualizacja podium

Podium wyroznia top 3 szczepionki w wizualnym formacie nagrodowym.

### Uklad

```
        [1.]
   [2.]     [3.]
```

- **1. miejsce (srodek, najwyzsze):** Karta w kolorze zlotym z najczesciej podawana szczepionka.
- **2. miejsce (lewo):** Karta w kolorze srebrnym z druga najczesciej podawana szczepionka.
- **3. miejsce (prawo):** Karta w kolorze brazowym z trzecia najczesciej podawana szczepionka.

### Zawartosc karty

Kazda karta podium wyswietla:

- Ikone medalu pozycji (zloty, srebrny, brazowy)
- Nazwe szczepionki
- Laczna liczbe podan
- Procent wszystkich szczepien
- Glowny gatunek (najczestszy gatunek otrzymujacy te szczepionke)

### Odczytywanie podium

Podium zapewnia przeglad wzorcow szczepien na platformie w jednym rzucie oka. Typowe wyniki obejmuja:

- **Psy:** Wscieklizna, DHPP (Nosowka/Parvo), Bordetella czesto dominuja.
- **Koty:** FVRCP, Wscieklizna, FeLV to typowe czolowe szczepionki.
- **Platformy mieszane:** Wscieklizna czesto prowadzi we wszystkich gatunkach.

> **Wskazowka:** Jesli podium pokazuje nieoczekiwane wyniki po zastosowaniu filtrow, sprawdz, czy filtr okresu lub lokalizacji nie generuje malej probki, ktora moze znieksztalcac rankingi.

---

## Rozbicie wedlug gatunku per szczepionka

Ponizej rankingu kazda szczepionka w top 20 ma rozwijana sekcje pokazujaca rozklad gatunkow.

### Wyswietlanie rozbicia

1. Kliknij strzalke rozwiniecia obok dowolnej szczepionki w rankingu.
2. Pojawia sie poziomy wykres slupkowy skumulowany pokazujacy rozklad gatunkow.
3. Kazdy segment jest kodowany kolorem wedlug gatunku:
   - Psy: Niebieski
   - Koty: Pomaranczowy
   - Ptaki: Zielony
   - Kroliki: Fioletowy
   - Inne: Szary

### Tabela rozbicia

Obok wykresu slupkowego mala tabela pokazuje:

| Gatunek | Liczba | Procent |
|---------|--------|---------|
| Pies | 1 234 | 62% |
| Kot | 456 | 23% |
| Ptak | 200 | 10% |
| Krolik | 80 | 4% |
| Inne | 20 | 1% |

### Zastosowania

- Identyfikuj szczepionki gatunkowo-specyficzne vs. miedzygatunkowe.
- Wykrywaj nietypowe wzorce (np. szczepionka specyficzna dla psow pojawiajaca sie w rekordach kotow moze wskazywac na bledy wprowadzania danych).
- Zrozum sklad gatunkowy platformy poprzez dane szczepien.

> **Wskazowka:** Szczepionki gatunkowo-specyficzne pojawiajace sie pod niewlasciwym gatunkiem czesto wskazuja na problemy z jakoscia danych, ktore powinny zostac zbadane.

---

## Najczestsze lokalizacje per szczepionka

Kazda szczepionka pokazuje rowniez rozbicie geograficzne najczestszych miejsc podawania.

### Wyswietlanie danych lokalizacyjnych

1. Kliknij strzalke rozwiniecia obok dowolnej szczepionki w rankingu.
2. Przejdz do zakladki **Lokalizacje** w rozwinietej sekcji.
3. Pojawia sie lista rankingowa top 10 lokalizacji.

### Tabela lokalizacji

| Pozycja | Kraj | Miasto | Liczba | Procent |
|---------|------|--------|--------|---------|
| 1 | Niemcy | Berlin | 543 | 18% |
| 2 | Wielka Brytania | Londyn | 421 | 14% |
| 3 | Francja | Paryz | 389 | 13% |
| ... | ... | ... | ... | ... |

### Widok mapy

Jesli jest dostepny, mini mapa cieplna pokazuje koncentracje szczepien geograficznie:

- Ciemniejsze regiony wskazuja na wyzsza liczbe szczepien.
- Najedz na region, aby zobaczyc dokladna liczbe.
- Kliknij region, aby zastosowac go jako filtr lokalizacji.

### Zastosowania

- Identyfikuj regionalne preferencje lub wymagania dotyczace szczepien.
- Wykrywaj skupiska, ktore moga odpowiadac lokalnym rekomendacjom weterynaryjnym.
- Planuj regionalne kampanie informacyjne lub partnerskie.

> **Wskazowka:** Niektore szczepionki sa prawnie wymagane w okreslonych krajach (np. wscieklizna w Niemczech). Wysokie koncentracje w okreslonych regionach sa oczekiwane dla szczepionek obowiazkowych.

---

## Eksportowanie danych

Aby wyeksportowac dane analityki szczepien:

1. Kliknij przycisk **Eksportuj** w prawym gornym rogu strony.
2. Wybierz format eksportu:
   - **CSV** -- Surowe dane do analizy w arkuszu kalkulacyjnym
   - **PDF** -- Sformatowany raport z wykresami
3. Eksport uwzglednia wszystkie aktualnie aktywne filtry.
4. Plik pobiera sie do domyslnej lokalizacji pobierania Twojej przegladarki.

### Zawartosc eksportu

Eksport CSV zawiera:

- Nazwe szczepionki
- Laczna liczbe
- Liczby rozbicia wedlug gatunku
- Najczestsze kraje i miasta
- Punkty danych trendu
- Uzyte parametry filtrow

> **Wskazowka:** Uzyj eksportow CSV do tworzenia niestandardowych wizualizacji w narzedziach takich jak Excel lub Google Sheets, lub do udostepniania danych partnerom doradczym z branzy weterynaryjnej.

---

## Odswiezanie dashboardu

Dane analityczne sa obliczane z rekordow szczepien i cachowane dla wydajnosci.

- Dane odswiezaja sie automatycznie co 24 godziny.
- Znacznik czasu ostatniego odswiezenia jest wyswietlany na dole strony.
- Kliknij ikone **Odswiez** obok znacznika czasu, aby wywolac reczne odswiezenie.
- Reczne odswiezenie moze zajac 10-30 sekund w zaleznosci od objetosci danych.

> **Wskazowka:** Jesli zauwazysz rozbieznosci miedzy dashboardem analitycznym a indywidualnymi rekordami zwierzat, sprobuj recznego odswiezenia. Niedawno dodane szczepienia moga nie pojawiac sie do nastepnego odswiezenia cache.

---

## Czesto zadawane pytania

**P: Dlaczego suma w rankingu nie zgadza sie z suma w Statystykach podsumowujacych?**
O: Ranking pokazuje top 20 szczepionek. Jesli istnieje wiecej niz 20 unikalnych szczepionek, pozostale nie sa wymienione, ale nadal licza sie do sumy.

**P: Czy moge zobaczyc dane dla konkretnego hodowcy lub wlasciciela?**
O: Nie. Strona analityczna pokazuje zagregowane dane platformy. Indywidualne rekordy szczepien sa dostepne na profilu kazdego zwierzecia.

**P: Dlaczego niektore szczepionki pokazuja zerowe dane trendu?**
O: Nowe szczepionki, ktore zostaly zarejestrowane tylko raz, moga nie miec wystarczajacej liczby punktow danych do wygenerowania znaczacej linii trendu.

**P: Jak daleko w przeszlosc siegaja dane historyczne?**
O: Filtr "Caly okres" obejmuje kazdy rekord szczepienia od uruchomienia platformy. Nie ma limitu przechowywania danych dla analityki.

**P: Czy moge porownac dwa okresy czasu?**
O: Nie bezposrednio w dashboardzie. Wyeksportuj dane dla dwoch roznych okresow i porownaj je w arkuszu kalkulacyjnym.

---
