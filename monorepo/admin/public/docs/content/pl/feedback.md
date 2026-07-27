# Zarzadzanie opiniami

Strona Zarzadzania opiniami umozliwia administratorom przegladanie, odpowiadanie i organizowanie opinii uzytkownikow przeslanych za posrednictwem aplikacji mobilnej Petfolioo. To Twoje centralne miejsce do rozumienia potrzeb uzytkownikow, sledzenia bledow i zarzadzania sugestiami funkcji.

![Feedback](/docs/screenshots/feedback.png)

---

## Przeglad

Po przejsciu na strone Opinii zobaczysz wiersz statystyk u gory podsumowujacy biezacy stan wszystkich opinii, a ponizej zakladki z trescia i kontrolki filtrowania.

---

## Wiersz statystyk

U gory strony cztery karty metryk wyswietlaja liczby w czasie rzeczywistym:

| Metryka | Opis |
|---------|------|
| **Lacznie** | Calkowita liczba wpisow opinii otrzymanych we wszystkich statusach |
| **Otwarte** | Wpisy opinii, na ktore jeszcze nie odpowiedziano ani nie zamknieto |
| **Odpowiedziane** | Wpisy opinii, w ktorych administrator opublikowal co najmniej jedna odpowiedz |
| **TODO** | Wpisy opinii przypiete przez administratora do dalszych dzialan |

> **Wskazowka:** Uzywaj licznika TODO jako szybkiego wskaznika zaleglych elementow wymagajacych uwagi. Jesli ta liczba rosnie, rozwaz triazowanie z zespolem.

---

## Zakladki

Strona Opinii jest podzielona na dwie zakladki:

### Wszystkie opinie

1. Kliknij zakladke **Wszystkie opinie** (wybrana domyslnie).
2. Ten widok wyswietla kazdy wpis opinii w systemie niezaleznie od statusu.
3. Wpisy sa sortowane wedlug daty, z najnowszymi na poczatku.
4. Uzyj filtrow (opisanych ponizej), aby zawezic wyniki.

### Lista TODO

1. Kliknij zakladke **Lista TODO**.
2. Ten widok pokazuje tylko wpisy opinii przypiete jako TODO przez administratora.
3. Uzywaj tej zakladki podczas spotkan triazowych zespolu lub codziennych przegladow.
4. Elementy pozostaja tutaj do momentu odpiecia.

---

## Filtry

Ponizej zakladek pasek filtrow zapewnia kilka kontrolek do zawezania wyswietlanych wpisow opinii.

### Filtr statusu

1. Znajdz liste rozwijana **Status** na pasku filtrow.
2. Kliknij, aby rozwinac i wybrac jedna z opcji:
   - **Wszystkie** -- Pokazuje opinie w dowolnym statusie
   - **Otwarte** -- Pokazuje tylko nierozwiazane opinie
   - **Odpowiedziane** -- Pokazuje opinie z co najmniej jedna odpowiedzia administratora
   - **Zamkniete** -- Pokazuje opinie oznaczone jako rozwiazane
3. Lista aktualizuje sie natychmiast po wyborze.

### Filtr typu

1. Znajdz liste rozwijana **Typ** na pasku filtrow.
2. Wybierz kategorie opinii, ktora chcesz zobaczyc:
   - **Wszystkie typy** -- Brak filtra typu
   - **Blad** -- Problemy lub defekty zgloszone przez uzytkownikow
   - **Sugestia** -- Prosby o funkcje i pomysly na ulepszenia
   - **Ogolne** -- Ogolne komentarze lub pytania
3. Kazdy wpis opinii jest oznaczony odznaka typu dla szybkiej identyfikacji wizualnej.

### Filtr zakresu dat

1. Kliknij selektor **Zakres dat** na pasku filtrow.
2. Wybierz date poczatkowa i koncowa z widgetu kalendarza.
3. Wyswietlane beda tylko opinie przeslane w wybranym zakresie.
4. Aby wyczyscic filtr dat, kliknij ikone czyszczenia na selektorze dat.

### Przelacznik Tylko TODO

1. Znajdz przelacznik **Tylko TODO** na pasku filtrow.
2. Wlacz go, aby pokazac tylko wpisy opinii przypiete jako TODO.
3. Zapewnia to szybka alternatywe dla przelaczania na zakladke Lista TODO przy zachowaniu innych filtrow w widoku Wszystkie opinie.

> **Wskazowka:** Lacz filtry dla zaawansowanych zapytan. Na przyklad ustaw Typ na "Blad" i Status na "Otwarte", aby zobaczyc wszystkie nierozwiazane zgloszenia bledow.

---

## Wpisy opinii

Kazdy wpis opinii na liscie wyswietla nastepujace informacje:

| Pole | Opis |
|------|------|
| **Informacje o uzytkowniku** | Wyswietlana nazwa, email i awatar uzytkownika przesylajacego |
| **Wiadomosc** | Pelna tresc opinii przeslanej przez uzytkownika |
| **Odznaka typu** | Kolorowa odznaka wskazujaca Blad (czerwony), Sugestia (niebieski) lub Ogolne (szary) |
| **Data** | Data i godzina przeslania opinii |
| **Status** | Biezacy wskaznik statusu (Otwarte, Odpowiedziane lub Zamkniete) |
| **Przypinka TODO** | Ikona pinezki wskazujaca, czy wpis jest oznaczony do dalszych dzialan |

### Przegladanie wpisu opinii

1. Znajdz wpis opinii na liscie.
2. Kliknij wiersz wpisu lub ikone rozwiniecia, aby otworzyc widok szczegolowy.
3. Widok szczegolowy pokazuje pelna wiadomosc, informacje o uzytkowniku i wszelkie wczesniejsze odpowiedzi administratora.

---

## Odpowiadanie na opinie

Administratorzy moga odpowiadac na opinie uzytkownikow. Odpowiedzi sa widoczne dla uzytkownika w aplikacji mobilnej.

### Kroki do odpowiedzi

1. Otworz wpis opinii, na ktory chcesz odpowiedziec.
2. Znajdz pole tekstowe **Odpowiedz** na dole widoku szczegolowego.
3. Wpisz swoja wiadomosc odpowiedzi w polu tekstowym.
4. Przejrzyj wiadomosc pod katem jasnosci i profesjonalizmu.
5. Kliknij przycisk **Wyslij odpowiedz**.
6. Pojawi sie komunikat potwierdzajacy pomyslne wyslanie odpowiedzi.
7. Status opinii automatycznie zmienia sie na **Odpowiedziane**.

> **Wazne:** Twoja odpowiedz bedzie widoczna dla uzytkownika w aplikacji mobilnej Petfolioo. Upewnij sie, ze Twoja odpowiedz jest pomocna, profesjonalna i bezposrednio odnosi sie do sprawy uzytkownika.

### Najlepsze praktyki odpowiadania

- Potwierdz opinie uzytkownika przed podaniem rozwiazania.
- Jesli problem jest znanym bledem, poinformuj uzytkownika, ze jest nad nim pracowane.
- Dla sugestii podziekuj uzytkownikowi i wyjasnij, czy funkcja jest rozwazana.
- Unikaj zargonu technicznego, ktorego koncowi uzytkownicy moga nie rozumiec.
- Odpowiedzi powinny byc zwiezle, ale wyczerpujace.

---

## Wczesniejsze odpowiedzi administratorow

Podczas przegladania wpisu opinii, ktory otrzymal odpowiedzi, wszystkie wczesniejsze odpowiedzi administratorow sa wyswietlane inline w kolejnosci chronologicznej.

1. Otworz widok szczegolowy wpisu opinii.
2. Przewin w dol, aby zobaczyc watek rozmowy.
3. Kazda odpowiedz pokazuje:
   - Nazwe administratora, ktory opublikowal odpowiedz
   - Date i godzine odpowiedzi
   - Pelny tekst odpowiedzi
4. Nowe odpowiedzi pojawiaja sie na dole watku.

> **Wskazowka:** Przejrzyj wczesniejsze odpowiedzi przed opublikowaniem nowej, aby uniknac duplikatow lub sprzecznych odpowiedzi.

---

## Zamykanie opinii

Gdy element opinii zostal w pelni rozwiazany, mozesz go zamknac, aby wskazac, ze dalsze dzialanie nie jest potrzebne.

### Kroki zamykania

1. Otworz wpis opinii, ktory chcesz zamknac.
2. Kliknij przycisk **Zamknij** (lub wybierz "Zamknij" z menu akcji).
3. Pojawi sie okno potwierdzenia z prosba o potwierdzenie.
4. Kliknij **Potwierdz**, aby zamknac opinie.
5. Status wpisu zmienia sie na **Zamkniete**.
6. Zamkniete wpisy pozostaja w systemie i mozna je przegladac, ustawiajac filtr statusu na "Zamkniete".

> **Uwaga:** Zamkniecie opinii nie usuwa jej. Nadal mozesz przegladac zamkniete wpisy i ponownie je otwierac w razie potrzeby.

---

## Przypinanie / Odpinanie jako TODO

Funkcja przypinania TODO pozwala administratorom oznaczac konkretne wpisy opinii do dalszych dzialan. Przypiete elementy pojawiaja sie w zakladce Lista TODO i licza sie do licznika TODO w wierszu statystyk.

### Przypinanie opinii jako TODO

1. Znajdz wpis opinii, ktory chcesz oznaczyc do dalszych dzialan.
2. Kliknij ikone **Przypnij** (pinezka) w wierszu wpisu lub otworz widok szczegolowy i kliknij **Przypnij jako TODO**.
3. Wpis jest natychmiast dodawany do Listy TODO.
4. Licznik TODO w wierszu statystyk zwieksza sie o jeden.
5. Ikona pinezki pojawia sie na wpisie, wskazujac jego status TODO.

### Odpinanie opinii

1. Znajdz przypiety wpis opinii (uzyj zakladki Lista TODO lub filtra Tylko TODO).
2. Kliknij ikone **Odepnij** w wierszu wpisu lub otworz widok szczegolowy i kliknij **Usun z TODO**.
3. Wpis jest usuwany z Listy TODO.
4. Licznik TODO w wierszu statystyk zmniejsza sie o jeden.

### Kiedy uzywac przypinek TODO

- Wpis opinii wymaga zbadania przed odpowiedzia.
- Potrzebujesz opinii innego czlonka zespolu przed odpowiedzia.
- Problem jest zwiazany z nadchodzaca wersja i powinien byc sledzony.
- Sugestia wymaga omowienia na nastepnym spotkaniu planistycznym.

---

## Podsumowanie przeplywu pracy

Zalecany przeplyw pracy do obslugi opinii to:

1. **Przegladaj** -- Sprawdzaj wiersz statystyk codziennie pod katem nowych otwartych opinii.
2. **Triazuj** -- Uzywaj filtrow, aby priorytetyzowac bledy nad sugestiami.
3. **Przypinaj** -- Oznaczaj zlozone elementy jako TODO do pozniejszych dzialan.
4. **Odpowiadaj** -- Odpowiadaj na proste elementy natychmiast.
5. **Wspolpracuj** -- Uzywaj zakladki Lista TODO podczas przegladow zespolowych.
6. **Zamykaj** -- Oznaczaj rozwiazane elementy jako zamkniete po potwierdzeniu, ze sprawa uzytkownika zostala rozwiazana.

---

## Skroty klawiszowe

| Skrot | Akcja |
|-------|-------|
| `Enter` | Otworz wybrany wpis opinii |
| `R` | Ustaw fokus na polu tekstowym odpowiedzi (gdy wpis jest otwarty) |
| `T` | Przelacz przypinke TODO na wybranym wpisie |
| `Esc` | Zamknij widok szczegolowy |

---

## Rozwiazywanie problemow

| Problem | Rozwiazanie |
|---------|-------------|
| Odpowiedz nie wysyla sie | Sprawdz polaczenie sieciowe i sprobuj ponownie. Upewnij sie, ze wiadomosc nie jest pusta. |
| Filtry nie aktualizuja sie | Odswiez strone. Jesli problem nie ustepuje, wyczysc cache przegladarki. |
| Nieprawidlowy licznik TODO | Licznik odswieza sie przy ladowaniu strony. Przejdz na inna strone i wroc, aby zaktualizowac. |
| Nie widze zamknietych opinii | Ustaw filtr Statusu na "Zamkniete" lub "Wszystkie", aby zobaczyc zamkniete wpisy. |

---

## Powiazane strony

- [Powiadomienia](./notifications.md) -- Wysylaj ogloszenia do uzytkownikow
- [Uzytkownicy administracyjni](./admin-users.md) -- Zarzadzaj, kto moze odpowiadac na opinie
- [Ustawienia](./settings.md) -- Konfiguruj preferencje systemowe

---
