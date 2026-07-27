# Gielda kojarzen

Modul Gieldy kojarzen zapewnia administratorom nadzor nad systemem kojarzenia zwierzat hodowlanych na platformie. Monitoruj zapytania o kojarzenie, sledz udane pary i przegladaj rankingi hodowcow.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Zakladki nawigacyjne

Strona Gieldy kojarzen jest podzielona na dwie glowne zakladki:

| Zakladka | Opis |
|----------|------|
| Pary i zapytania | Przegladaj i zarzadzaj wszystkimi kojarzeniami i oczekujacymi zapytaniami |
| Rankingi hodowcow | Tabele liderow pokazujace najlepszych hodowcow |

Przelaczaj sie miedzy zakladkami, klikajac naglowek zakladki u gory strony.

---

## Zakladka Pary i zapytania

Ta zakladka wyswietla wszystkie kojarzenia jako wizualne karty, zapewniajac intuicyjny przeglad aktywnosci hodowlanej na platformie.

### Karty kojarzen

Kazde kojarzenie jest reprezentowane jako karta pokazujaca dwa zwierzeta polaczone wizualnym lacznikiem w ksztalcie serca.

#### Uklad karty

```
+------------------------------------------+
|  [Zdjecie A]  <3  [Zdjecie B]           |
|  Imie A              Imie B             |
|  Rasa                Rasa               |
|  Wlasciciel          Wlasciciel         |
|                                          |
|  Status: [Odznaka]   Dodano: [Data]     |
|  Gatunek: [Tag]      Lokalizacja: [Miasto] |
+------------------------------------------+
```

#### Informacje na karcie

| Element | Opis |
|---------|------|
| Zdjecia zwierzat | Zdjecia profilowe obu zwierzat w kojarzeniu |
| Lacznik serca | Wizualne polaczenie miedzy dwoma zwierzetami (animowane dla aktywnych kojarzen) |
| Imiona zwierzat | Imiona obu zwierzat |
| Rasy | Informacja o rasie kazdego zwierzecia |
| Wlasciciele | Imiona wlascicieli (klikalne, aby zobaczyc profile) |
| Odznaka statusu | Biezacy status kojarzenia |
| Data wystawienia | Kiedy zapytanie o kojarzenie zostalo utworzone |
| Tag gatunku | Gatunek zwierzat |
| Lokalizacja | Miasto/kraj wystawienia |

### Statusy kojarzen

| Status | Kolor odznaki | Opis |
|--------|---------------|------|
| Oczekujace | Pomaranczowy | Zapytanie o kojarzenie wyslane, oczekuje na odpowiedz |
| Zaakceptowane | Zielony | Obie strony zgodzily sie na kojarzenie |
| Odrzucone | Czerwony | Jedna strona odrzucila kojarzenie |
| Zakonczone | Niebieski | Kojarzenie potwierdzone jako zakonczone |
| Anulowane | Szary | Kojarzenie zostalo anulowane przez jedna ze stron |
| Wygasle | Jasnoszary | Zapytanie wygaslo bez odpowiedzi |

---

## Filtry

Pasek filtrow pozwala zawezic wyswietlane kojarzenia.

### Filtr statusu

Wybierz jeden lub wiecej statusow do wyswietlenia:

1. Kliknij liste rozwijana **Status**.
2. Zaznacz statusy, ktore chcesz zobaczyc.
3. Siatka kart aktualizuje sie natychmiast.

### Filtr gatunku

Filtruj kojarzenia wedlug gatunku zwierzecia:

- Wszystkie gatunki (domyslnie)
- Pies
- Kot
- Ptak
- Krolik
- Inne

### Filtr kraju

Wybierz jeden lub wiecej krajow, aby filtrowac wedlug lokalizacji kojarzenia.

### Filtr miasta

Dalsze zawezenie przez wybranie konkretnych miast.

> **Wskazowka:** Uzyj Status: Zaakceptowane + Twoj kraj, aby zobaczyc udane kojarzenia w Twoim regionie, ktore moga wymagac akcji "Wyslij kartke slubna".

---

## Panel szczegolow

Kliknij dowolna karte kojarzenia, aby otworzyc panel szczegolow po prawej stronie ekranu.

### Sekcja zdjec zwierzat

U gory panelu wyswietlane sa wieksze wersje zdjec obu zwierzat obok siebie z lacznikiem serca miedzy nimi.

- Kliknij dowolne zdjecie, aby zobaczyc w pelnym rozmiarze.
- Przesuwaj przez dodatkowe zdjecia, jesli zwierze ma galerie.

### Informacje o wystawieniu

| Pole | Opis |
|------|------|
| ID wystawienia | Unikalny identyfikator wystawienia kojarzenia |
| Utworzone przez | Ktory wlasciciel zanicjowal wystawienie |
| Data utworzenia | Data pierwszej publikacji wystawienia |
| Data kojarzenia | Data zaproponowania kojarzenia |
| Data odpowiedzi | Data zaakceptowania/odrzucenia kojarzenia (jesli dotyczy) |
| Gatunek | Gatunek obu zwierzat |
| Rasy | Szczegolowe informacje o rasach |
| Lokalizacja | Pelne dane lokalizacyjne |
| Uwagi | Wszelkie uwagi od wlasciciela wystawienia |

### Os czasu kojarzenia

Panel zawiera chronologiczna os czasu wydarzen:

1. **Wystawienie utworzone** -- Wlasciciel opublikowal wystawienie kojarzenia swojego zwierzecia
2. **Kojarzenie zaproponowane** -- Algorytm dopasowania lub reczne zapytanie zainicjowalo kojarzenie
3. **Kojarzenie wyswietlone** -- Druga strona obejrzala propozycje kojarzenia
4. **Odpowiedz udzielona** -- Akceptacja/odrzucenie ze znacznikiem czasu
5. **Zakonczenie zarejestrowane** -- Jesli kojarzenie zostalo potwierdzone jako zakonczone
6. **Kartka slubna wyslana** -- Jesli administrator wyslal powiadomienie gratulacyjne

Kazde wydarzenie na osi czasu pokazuje:

- Date i godzine
- Aktora (system, wlasciciel A, wlasciciel B lub administrator)
- Opis wydarzenia
- Dodatkowe uwagi (jesli istnieja)

> **Wskazowka:** Os czasu pomaga zrozumiec pelny kontekst kojarzenia podczas badania sporow lub problemow zgloszonych przez uzytkownikow.

---

## Wyslij kartke slubna

Akcja "Wyslij kartke slubna" pozwala administratorom wyslac powiadomienie gratulacyjne do obu wlascicieli zwierzat, gdy kojarzenie zostanie zaakceptowane lub zakonczone.

### Jak wyslac kartke slubna

1. Otworz panel szczegolow dla kojarzenia o statusie **Zaakceptowane** lub **Zakonczone**.
2. Kliknij przycisk **Wyslij kartke slubna** na dole panelu.
3. W oknie dialogowym:
   - Podglad wiadomosci powiadomienia (automatycznie generowanej z imionami obu zwierzat).
   - Opcjonalnie dodaj wlasna wiadomosc gratulacyjna.
   - Przejrzyj odbiorcow (obaj wlasciciele zwierzat).
4. Kliknij **Wyslij**.

### Co zawiera kartka slubna

- Naglowek gratulacyjny z imionami obu zwierzat
- Zdjecia zwierzat ulozone z elementami dekoracyjnymi
- Data i lokalizacja kojarzenia
- Wlasna wiadomosc administratora (jesli podana)
- Link do strony szczegolow kojarzenia

### Kiedy wysylac

- Po zaakceptowaniu kojarzenia i potwierdzeniu przez obie strony, ze kontynuuja.
- Po oznaczeniu kojarzenia jako zakonczone.
- Tylko raz na kojarzenie (przycisk jest wylaczony po wyslaniu).

> **Wskazowka:** Kartki slubne to narzedzie angazowania spolecznosci. Wysylanie ich dla zaakceptowanych kojarzen zacheca do uczestnictwa na platformie i tworzy pozytywne doswiadczenie dla hodowcow.

---

## Zakladka Rankingi hodowcow

Zakladka Rankingi hodowcow prezentuje najbardziej aktywnych i odnoszacych sukcesy hodowcow na platformie.

### Podium ogolne Top 10

U gory zakladki Rankingi, wizualizacja podium wyroznia 10 najlepszych hodowcow ze wszystkich gatunkow.

#### Uklad podium

```
              [1.]
        [2.]       [3.]
   [4.]  [5.]  [6.]  [7.]
      [8.]   [9.]   [10.]
```

Kazda pozycja na podium pokazuje:

- Nazwe hodowcy
- Nazwe hodowli
- Zdjecie profilowe
- Laczna liczbe kojarzen
- Wskaznik sukcesu w procentach

#### Punktacja podium

Hodowcy sa klasyfikowani wedlug wyniku zlozonego na podstawie:

| Czynnik | Waga | Opis |
|---------|------|------|
| Laczna liczba kojarzen | 30% | Liczba kojarzen zainicjowanych lub otrzymanych |
| Wskaznik sukcesu | 40% | Procent kojarzen, ktore osiagnely status Zaakceptowane/Zakonczone |
| Aktywne wystawienia | 15% | Liczba obecnie aktywnych wystawien kojarzen |
| Czas odpowiedzi | 15% | Sredni czas odpowiedzi na propozycje kojarzen |

### Siatka Top 10 wedlug gatunku

Ponizej ogolnego podium, siatka wyswietla 10 najlepszych hodowcow dla kazdego gatunku osobno.

#### Uklad siatki

Kazdy gatunek ma wlasna karte:

```
+-------------------+  +-------------------+  +-------------------+
|   Psy Top 10      |  |   Koty Top 10     |  |  Ptaki Top 10    |
| 1. Nazwa hodowcy  |  | 1. Nazwa hodowcy  |  | 1. Nazwa hodowcy  |
| 2. Nazwa hodowcy  |  | 2. Nazwa hodowcy  |  | 2. Nazwa hodowcy  |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Kazdy wpis w siatce gatunku pokazuje:

- Numer pozycji
- Nazwe hodowcy
- Nazwe hodowli
- Liczbe kojarzen dla danego gatunku
- Wskaznik sukcesu dla danego gatunku

> **Wskazowka:** Rankingi wedlug gatunku pomagaja identyfikowac hodowcow-specjalistow, ktorzy moga byc doskonalymi kandydatami do partnerstw platformowych lub wyroznionych wystawien.

---

## Sortowalna tabela rankingowa

Ponizej wizualnych rankingow, pelna tabela danych zawiera szczegolowe statystyki hodowcow.

### Kolumny tabeli

| Kolumna | Sortowalna | Opis |
|---------|------------|------|
| Pozycja | Tak | Biezaca pozycja na podstawie domyslnej punktacji |
| Nazwa hodowcy | Tak | Pelna nazwa hodowcy |
| Hodowla | Tak | Nazwa hodowli |
| Kojarzenia | Tak | Laczna liczba kojarzen (zainicjowane + otrzymane) |
| Wystawienia | Tak | Liczba utworzonych wystawien kojarzen |
| Wskaznik sukcesu | Tak | Procent kojarzen osiagajacych status Zaakceptowane/Zakonczone |
| Wyswietlenia | Tak | Laczne wyswietlenia ich wystawien kojarzen |
| Gatunek | Nie | Glowny gatunek, ktory hoduja |
| Lokalizacja | Nie | Kraj i miasto |

### Sortowanie tabeli

1. Kliknij naglowek dowolnej sortowalnej kolumny, aby posortowac rosnaco.
2. Kliknij ponownie, aby posortowac malejaco.
3. Trzecie klikniecie usuwa sortowanie z tej kolumny.
4. Mozesz sortowac wedlug wielu kolumn (przytrzymaj Shift i kliknij).

### Interakcje z tabela

- Kliknij wiersz hodowcy, aby zobaczyc jego pelny profil i historie kojarzen.
- Uzyj paska wyszukiwania nad tabela, aby znalezc konkretnego hodowce.
- Eksportuj dane z tabeli za pomoca przycisku **Eksportuj CSV**.

> **Wskazowka:** Sortuj wedlug Wskaznika sukcesu malejaco, aby zidentyfikowac hodowcow, ktorzy konsekwentnie osiagaja udane kojarzenia. Ci hodowcy moga skorzystac z funkcji premium lub przyspieszonej weryfikacji.

---

## Rozumienie metryk kojarzen

### Obliczanie wskaznika sukcesu

```
Wskaznik sukcesu = (Zaakceptowane + Zakonczone kojarzenia) / Laczna liczba kojarzen x 100
```

- Tylko kojarzenia, w ktorych hodowca byl wlascicielem wystawienia, licza sie do jego wskaznika sukcesu.
- Odrzucone i wygasle kojarzenia obnizaja wskaznik sukcesu.
- Anulowane kojarzenia sa wylaczone z obliczen.

### Metryka wyswietlen

Licznik wyswietlen reprezentuje:

- Laczne unikalne wyswietlenia wszystkich aktywnych wystawien kojarzen hodowcy.
- Nie liczy wlasnych wyswietlen hodowcy.
- Resetuje sie per wystawienie (nie kumuluje sie miedzy usunietymi wystawieniami).

### Wynik aktywnosci

Ogolny ranking uwzglednia aktualnosc:

- Kojarzenia z ostatnich 90 dni maja wage 2x.
- Kojarzenia z 90-180 dni maja wage 1x.
- Kojarzenia starsze niz 180 dni maja wage 0,5x.

> **Wskazowka:** Hodowca z duza liczba wyswietlen, ale niskim wskaznikiem sukcesu moze miec atrakcyjne wystawienia, ale byc zbyt wybiorczy lub wolno odpowiadac. Rozwaz skontaktowanie sie, aby zrozumiec jego doswiadczenie.

---

## Czesto zadawane pytania

**P: Czy moge recznie utworzyc kojarzenie miedzy dwoma zwierzetami?**
O: Nie. Kojarzenia sa tworzone przez wlascicieli zwierzat za posrednictwem aplikacji. Administratorzy moga jedynie monitorowac i podejmowac dzialania wobec istniejacych kojarzen.

**P: Co dzieje sie z danymi kojarzenia, gdy zwierze zostanie usuniete?**
O: Rekord kojarzenia jest zachowywany w celach historycznych, ale oznaczany wskaznikiem "Zwierze usuniete". Kojarzenie nie moze dalej postepowac.

**P: Czy moge usunac hodowce z rankingow?**
O: Rankingi sa obliczane automatycznie. Aby usunac hodowce, jego konto musi zostac zawieszone lub jego weryfikacja cofnieta, co wyklucza go z rankingow.

**P: Jak czesto aktualizowane sa rankingi?**
O: Rankingi przeliczaja sie co 24 godziny. Znacznik czasu ostatniej aktualizacji jest wyswietlany u gory zakladki Rankingi.

**P: Czy moge wyslac kartke slubna dla odrzuconego kojarzenia?**
O: Nie. Przycisk Wyslij kartke slubna jest dostepny tylko dla kojarzen o statusie Zaakceptowane lub Zakonczone.

**P: Co jesli oba zwierzeta w kojarzeniu naleza do tego samego wlasciciela?**
O: System zapobiega kojarzeniom tego samego wlasciciela. Jesli takie widzisz, wskazuje to na problem z integralnoscia danych, ktory powinien byc zgloszony do zespolu programistycznego.

---
