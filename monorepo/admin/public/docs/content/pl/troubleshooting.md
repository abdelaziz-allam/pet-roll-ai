# Rozwiazywanie problemow

Rozwiazania typowych problemow, ktore mozesz napotkac podczas korzystania z Panelu Administracyjnego Petfolioo.

---

## Problemy z logowaniem

### Nie moge sie zalogowac

**Problem:** Wpisujesz swoje dane logowania, ale logowanie konczy sie niepowodzeniem lub widzisz komunikat o bledzie.

**Mozliwe przyczyny:**
- Nieprawidlowy adres e-mail lub haslo
- Twoje konto zostalo dezaktywowane przez Super Admin
- Usluga uwierzytelniania jest tymczasowo niedostepna
- Twoje konto nie zostalo jeszcze utworzone w Panelu Administracyjnym

**Rozwiazanie:**
1. Sprawdz dokladnie, czy uzywasz adresu e-mail powiazanego z Twoim kontem admin (nie osobistego lub e-maila uzytkownika aplikacji).
2. Upewnij sie, ze Caps Lock jest wylaczony i nie ma dodatkowych spacji na koncu hasla.
3. Sprobuj zresetowac haslo za pomoca linku "Zapomnialem hasla".
4. Jesli problem nadal wystepuje, skontaktuj sie z Super Admin, aby potwierdzic, ze Twoje konto istnieje i jest aktywne.
5. Jesli usluga wydaje sie niedostepna, poczekaj kilka minut i sprobuj ponownie.

---

### Zapomnialem hasla

**Problem:** Nie pamietasz hasla do Panelu Administracyjnego.

**Mozliwe przyczyny:**
- Haslo zostalo zmienione i nie zapisane
- Uzywasz danych logowania z innego systemu

**Rozwiazanie:**
1. Na stronie logowania kliknij "Zapomnialem hasla".
2. Wpisz adres e-mail powiazany z Twoim kontem admin.
3. Sprawdz skrzynke odbiorcza (i folder spam) w poszukiwaniu e-maila z resetem hasla.
4. Kliknij link resetujacy i utworz nowe haslo.
5. Jesli nie otrzymasz e-maila w ciagu 5 minut, skontaktuj sie z Super Admin w celu recznego zresetowania konta.

---

### Moja sesja wygasla

**Problem:** Bylem zalogowany, ale nagle zostalam przekierowany na strone logowania.

**Mozliwe przyczyny:**
- Twoja sesja przekroczyla automatyczny okres limitu czasu (zwykle 30 minut nieaktywnosci)
- Super Admin zmienil ustawienia Twojego konta lub role
- Serwer zostal ponownie uruchomiony podczas wdrozenia

**Rozwiazanie:**
1. Zaloguj sie ponownie swoimi danymi. Niezapisana praca mogla zostac utracona.
2. Jesli sesje wygasaja bardzo czesto, upewnij sie, ze Twoja przegladarka nie blokuje plikow cookie dla domeny Panelu Administracyjnego.
3. Regularnie zapisuj swoja prace, aby uniknac utraty danych z powodu limitow czasu sesji.

---

## Problemy z uprawnieniami

### Nie widze strony, do ktorej powinienem miec dostep

**Problem:** Link nawigacyjny lub strona, do ktorej spodziewasz sie miec dostep, nie jest widoczna lub wyswietla pusty ekran.

**Mozliwe przyczyny:**
- Twoja rola nie obejmuje uprawnienia do przegladania tej strony
- Twoja rola zostala niedawno zmieniona i zmiana jeszcze nie zaczela obowiazywac
- Problem z pamiecia podreczna przegladarki wyswietla nieaktualna wersje nawigacji

**Rozwiazanie:**
1. Sprawdz swoja aktualna role, przegladajac swoj profil lub pytajac Super Admin. Zapoznaj sie z przewodnikiem Role i uprawnienia, aby zobaczyc, ktore strony Twoja rola moze otwierac.
2. Jesli Twoja rola zostala niedawno zmieniona, wyloguj sie i zaloguj ponownie, aby odswiezyc uprawnienia.
3. Wyczysc pamiec podreczna przegladarki lub sprobuj otworzyc portal w oknie prywatnym/incognito.
4. Jesli uwazasz, ze Twoja rola powinna dawac dostep do tej strony, skontaktuj sie z Super Admin w celu przegladu uprawnien.

---

### Brakuje przyciskow na stronie

**Problem:** Widzisz strone, ale niektore przyciski akcji (Edit, Delete, Approve itp.) nie sa wyswietlane.

**Mozliwe przyczyny:**
- Twoja rola ma dostep tylko do odczytu na tej stronie (np. rola Viewer)
- Element jest w stanie, w ktorym te akcje nie sa dostepne (np. juz zatwierdzony)
- Problem z renderowaniem UI

**Rozwiazanie:**
1. Sprawdz dokumentacje Role i uprawnienia, aby potwierdzic, czy Twoja rola ma dostep do zapisu dla tej funkcji.
2. Zweryfikuj, ze aktualny status elementu pozwala na oczekiwana akcje (np. nie mozesz zatwierdzic juz zatwierdzonej weryfikacji).
3. Odswiez strone. Jesli przyciski nadal sie nie pojawiaja, sprobuj innej przegladarki.
4. Jesli Twoja rola powinna miec te przyciski, skontaktuj sie z Super Admin.

---

### Otrzymuje blad 403

**Problem:** Portal wyswietla blad "403 Forbidden" podczas proby dostepu do strony lub wykonania akcji.

**Mozliwe przyczyny:**
- Probujesz wykonac akcje, ktorej Twoja rola wyraznie nie zezwala
- Twoj token sesji stal sie nieprawidlowy
- Twoja rola zostala obnigona, gdy bylem zalogowany

**Rozwiazanie:**
1. Zanotuj, ktora strona lub akcja wywolala blad.
2. Wyloguj sie i zaloguj ponownie, aby odswiezyc sesje i uprawnienia.
3. Jesli blad nadal wystepuje, Twoja rola nie ma dostepu do tego zasobu. Skontaktuj sie z Super Admin, jesli potrzebujesz podwyzszonych uprawnien.

---

## Problemy z danymi

### Zmiany, ktore wprowadzialem, nie sa wyswietlane

**Problem:** Edytowales rekord (zwierze, uzytkownik, post na blogu itp.), ale zmiany nie sa odzwierciedlone w portalu.

**Mozliwe przyczyny:**
- Operacja zapisu cicho zawiodla z powodu problemu z siecia
- Twoja przegladarka wyswietla wersje strony z pamieci podrecznej
- Inny admin jednoczesnie nadpisal Twoje zmiany

**Rozwiazanie:**
1. Odswiez strone za pomoca Ctrl+Shift+R (lub Cmd+Shift+R na Macu), aby ominac pamiec podreczna.
2. Sprawdz, czy rekord pokazuje Twoje zmiany. Jesli nie, ponownie zastosuj edycje i obserwuj komunikaty o bledach podczas zapisywania.
3. Upewnij sie, ze masz stabilne polaczenie internetowe.
4. Jesli pracujesz nad wspoldzielonymi rekordami, koordynuj sie z innymi adminami, aby uniknac konfliktow edycji.

---

### Export nie dziala

**Problem:** Klikniecie przycisku Export nic nie robi, lub pobrany plik jest pusty lub uszkodzony.

**Mozliwe przyczyny:**
- Twoja przegladarka blokuje pobieranie (blokada wyskakujacych okien lub ograniczenia pobierania)
- Zbior danych jest zbyt duzy i export przekroczyl limit czasu
- Twoja rola nie ma uprawnien do eksportu

**Rozwiazanie:**
1. Sprawdz, czy Twoja przegladarka zablokowala pobieranie lub wyskakujace okno. Poszukaj powiadomienia na pasku adresu.
2. Wylacz blokady wyskakujacych okien dla domeny Panelu Administracyjnego.
3. Jesli zbior danych jest bardzo duzy, sprobuj zastosowac filtry, aby zmniejszyc liczbe rekordow przed eksportem.
4. Sprobuj innego formatu eksportu (np. CSV zamiast PDF), poniewaz moze byc przetwarzany szybciej.
5. Jesli problem nadal wystepuje, skontaktuj sie z Super Admin, aby zweryfikowac, czy Twoja rola obejmuje uprawnienia do eksportu.

---

### Wyszukiwanie nie zwraca wynikow

**Problem:** Szukasz rekordu, o ktorym wiesz, ze istnieje, ale otrzymujesz pusty zbior wynikow.

**Mozliwe przyczyny:**
- Literowka lub dodatkowa spacja w zapytaniu wyszukiwania
- Pole wyszukiwania filtruje wedlug konkretnej kolumny (np. wyszukiwanie po nazwie, gdy wpisales ID)
- Rekord zostal usuniety lub jest w innym statusie niz oczekiwano

**Rozwiazanie:**
1. Usun dodatkowe spacje z zapytania wyszukiwania.
2. Sprobuj wyszukac mniejsza liczba znakow lub czesciowe dopasowanie.
3. Sprawdz, wedlug jakiego pola filtruje wyszukiwanie i upewnij sie, ze Twoje zapytanie odpowiada temu typowi pola.
4. Usun wszelkie aktywne filtry, ktore moga wykluczac rekord.
5. Jesli szukasz zwierzecia po identyfikatorze mikrochipa, upewnij sie, ze wpisujesz pelny numeryczny ID bez myslnikow.

---

## Problemy z powiadomieniami

### Powiadomienie push nie zostalo dostarczone

**Problem:** Wyslales powiadomienie push, ale docelowi uzytkownicy zglaszaja, ze go nie otrzymali.

**Mozliwe przyczyny:**
- Uzytkownik wylaczyl powiadomienia push na swoim urzadzeniu
- Token urzadzenia uzytkownika wygasl (aplikacja zostala odinstalowana i ponownie zainstalowana)
- Powiadomienie zostalo wyslane do zlego segmentu uzytkownikow
- Wystepuje opoznienie w usludze dostarczania powiadomien push

**Rozwiazanie:**
1. Sprawdz dziennik dostarczania powiadomien na stronie Powiadomien, aby zobaczyc status wyslania.
2. Zweryfikuj, ze wybrales prawidlowa grupe docelowa (konkretny uzytkownik, segment lub wszyscy uzytkownicy).
3. Pamietaj, ze powiadomienia push moga potrzebowac kilku minut na dostarczenie w zaleznosci od warunkow urzadzenia i sieci.
4. Jesli konkretny uzytkownik konsekwentnie nie otrzymuje powiadomien, jego token urzadzenia moze byc nieprawidlowy. Powinien otworzyc aplikacje i ponownie wlaczyc powiadomienia w ustawieniach urzadzenia.
5. W przypadku powiadomien masowych poczekaj do 15 minut na zakonczenie dostarczania do wszystkich uzytkownikow.

---

### Nie moge wysylac powiadomien

**Problem:** Przycisk "Send Notification" jest wylaczony lub otrzymujesz blad podczas proby wyslania.

**Mozliwe przyczyny:**
- Twoja rola nie ma uprawnien do wysylania powiadomien (Viewers i niektorzy Moderators)
- Wymagane pola (tytul, tresc, grupa docelowa) nie sa wypelnione
- Usluga powiadomien jest tymczasowo niedostepna

**Rozwiazanie:**
1. Upewnij sie, ze wszystkie wymagane pola sa wypelnione: tytul, tresc wiadomosci i co najmniej jedna selekcja grupy docelowej.
2. Sprawdz, czy Twoja rola ma uprawnienie do wysylania powiadomien (wymagana rola Admin lub Super Admin).
3. Jesli wszystkie pola sa wypelnione i masz prawidlowa role, sprobuj odswiezyc strone i ponownie wyslac.
4. Jesli blad wskazuje na problem z usluga, poczekaj kilka minut i sprobuj ponownie. Jesli problem utrzymuje sie dluzej niz 30 minut, zglos go zespolowi technicznemu.

---

## Problemy z przegladarka

### Strona sie nie laduje

**Problem:** Panel Administracyjny wyswietla pusta strone, ladujacy sie spinner, ktory nigdy sie nie konczy, lub blad polaczenia.

**Mozliwe przyczyny:**
- Problem z laczem internetowym
- Usluga Panelu Administracyjnego jest niedostepna lub restartuje sie
- Rozszerzenia przegladarki zaklocaja ladowanie strony
- DNS lub zapora sieciowa blokuje domene portalu

**Rozwiazanie:**
1. Sprawdz swoje polaczenie internetowe, odwiedzajac inna strone.
2. Sprobuj odswiezyc strone za pomoca Ctrl+Shift+R (lub Cmd+Shift+R na Macu).
3. Sprobuj otworzyc portal w oknie prywatnym/incognito, aby wykluczyc konflikty z rozszerzeniami.
4. Wyczysc pamiec podreczna przegladarki i pliki cookie dla domeny portalu.
5. Jesli korzystasz z sieci firmowej, sprawdz, czy zapora sieciowa lub proxy nie blokuje dostepu.
6. Jesli portal jest niedostepny dla wszystkich, moze trwac wdrozenie. Poczekaj 5-10 minut i sprobuj ponownie.

---

### Obrazy/zrzuty ekranu sa uszkodzone

**Problem:** Obrazy w portalu (zdjecia zwierzat, obrazy na blogu, zrzuty ekranu w dokumentacji) pojawiaja sie jako uszkodzone ikony lub nie laduja sie.

**Mozliwe przyczyny:**
- Usluga przechowywania obrazow jest tymczasowo niedostepna
- Obraz zostal usuniety z magazynu, ale odniesienie pozostalo
- Polityka bezpieczenstwa tresci blokuje ladowanie obrazow
- Wolne polaczenie sieciowe powodujace przekroczenie limitu czasu ladowania obrazow

**Rozwiazanie:**
1. Odswiez strone, aby ponownie sprobowac zaladowac obrazy.
2. Sprawdz, czy problem dotyczy wszystkich obrazow, czy tylko konkretnych. Jesli tylko konkretne obrazy sa uszkodzone, mogly zostac usuniete z magazynu.
3. Kliknij prawym przyciskiem myszy uszkodzony obraz i wybierz "Otworz obraz w nowej karcie". Jesli laduje sie osobno, rozszerzenie przegladarki moze blokowac obrazy wbudowane.
4. Tymczasowo wylacz blokery reklam lub rozszerzenia bezpieczenstwa w celu testu.
5. Jesli problem dotyczy wszystkich obrazow w portalu, zglos to zespolowi technicznemu, poniewaz usluga przechowywania moze wymagac uwagi.

---

### Portal jest wolny

**Problem:** Strony dlugo sie laduja, akcje wydaja sie ospiale lub portal staje sie nieresponsywny.

**Mozliwe przyczyny:**
- Wolne polaczenie internetowe
- Przegladarka ma zbyt wiele otwartych kart zuzywajaacych pamiec
- Duze zbiory danych ladowane bez paginacji
- Serwer jest pod duzym obciazeniem

**Rozwiazanie:**
1. Przetestuj predkosc internetu, aby wykluczyc problem z lacznoscia.
2. Zamknij niepotrzebne karty przegladarki, aby zwolnic pamiec.
3. Jesli konkretna strona jest wolna (np. Rejestr zwierzat z tysiacami rekordow), zastosuj filtry, aby zmniejszyc rozmiar zbioru danych.
4. Wyczysc pamiec podreczna przegladarki, ktora mogla z czasem urosna.
5. Sprobuj innej przegladarki, aby sprawdzic, czy problem jest specyficzny dla przegladarki.
6. Jesli spowolnienie jest konsekwentne u wielu adminow, moze to byc problem po stronie serwera. Zglos to zespolowi technicznemu, podajac konkretne strony i przyblizone czasy odpowiedzi.
