# Roles & Permissions

Portal administracyjny Petfolioo wykorzystuje system kontroli dostepu oparty na rolach (RBAC) do zarzadzania tym, co kazdy administrator moze widziec i robic. Kazdemu uzytkownikowi administracyjnemu przypisywana jest rola, a kazda rola definiuje zestaw uprawnien dostepu na poziomie stron i akcji.

---

## Przeglad rol

Platforma obsluguje cztery role administracyjne, z ktorych kazda posiada coraz szerszy zakres mozliwosci:

| Rola | Opis | Typowy przypadek uzycia |
|------|------|-------------------------|
| **Super Admin** | Pelny, nieograniczony dostep do wszystkich stron i akcji | Wlasciciel platformy, CTO, glowny administrator |
| **Admin** | Szeroki dostep do stron operacyjnych; brak dostepu do ustawien systemowych lub zarzadzania uzytkownikami admin | Menedzer platformy, kierownik operacyjny |
| **Moderator** | Ukierunkowany dostep do zadan moderacji tresci (weryfikacja, kojarzenie, zwierzeta) | Menedzer spolecznosci, recenzent tresci |
| **Viewer** | Dostep tylko do odczytu do wiekszosci stron; nie moze tworzyc, edytowac ani usuwac | Agent wsparcia, interesariusz, audytor |

---

## Struktura uprawnien

Uprawnienia sa definiowane na dwoch poziomach:

### 1. Dostep do stron

Kazdej roli przyznawany lub odmawiany jest dostep do okreslonych stron. Jesli rola nie ma dostepu do strony, strona nie pojawia sie w nawigacji bocznej, a bezposredni dostep przez URL jest blokowany.

### 2. Uprawnienia do akcji

W ramach strony, do ktorej rola ma dostep, okreslone akcje moga byc wlaczone lub wylaczone. Na przyklad Moderator moze **przegladac** zwierzeta, ale nie moze ich **usuwac**.

---

## Matryca uprawnien

Ponizasza matryca pokazuje dokladnie, co kazda rola moze robic na kazdej stronie.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Widocznosc stron wedlug roli

Ta tabela podsumowuje, ktore strony pojawiaja sie w nawigacji bocznej dla kazdej roli:

| Strona | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Jak uprawnienia wplywaja na UI

Gdy uzytkownik nie ma uprawnien do okreslonej akcji, portal administracyjny dostosowuje interfejs odpowiednio:

| Scenariusz | Zachowanie UI |
|------------|---------------|
| Brak dostepu do strony | Strona usunieta z paska bocznego; URL zwraca 403 |
| Tylko podglad (bez edit/delete) | Przyciski akcji ukryte; wiersze tabeli nie sa klikalne do edycji |
| Brak uprawnien do tworzenia | Przycisk "Create" / "Add" ukryty |
| Brak uprawnien do usuwania | Opcja Delete usunieta z menu akcji |
| Brak uprawnien do eksportu | Przycisk Export ukryty |
| Brak uprawnien approve/reject | Przyciski akcji weryfikacji ukryte; status wyswietlany jako tylko do odczytu |

> **Uwaga:** UI ukrywa niedostepne akcje zamiast wyswietlac wylaczone przyciski. Dzieki temu interfejs jest przejrzysty i unika sie nieporozumien dotyczacych tego, co jest dozwolone, a co nie.

---

## Zarzadzanie uprawnieniami

Tylko uzytkownicy **Super Admin** moga tworzyc, edytowac lub usuwac konta administratorow i modyfikowac ich uprawnienia.

### Przypisywanie roli

1. Przejdz do **Admin Users** w pasku bocznym.
2. Kliknij **Create Admin User** lub edytuj istniejacego uzytkownika.
3. Wybierz zadana role z menu rozwijanego Rola.
4. W przypadku wybrania **Super Admin** wszystkie uprawnienia sa automatycznie przyznawane i nie moga byc dostosowywane.
5. Dla pozostalych rol dostosuj dostep do stron i akcje za pomoca edytora uprawnien.

### Uprawnienia niestandardowe

Chociaz kazda rola ma typowe uprawnienia, system obsluguje dostosowywanie dla poszczegolnych uzytkownikow:

- **Admin** moze otrzymac dostep do Settings, jesli jest to potrzebne.
- **Moderator** moze otrzymac dostep do podgladu Analytics.
- **Viewer** moze zostac ograniczony do mniejszej liczby stron niz domyslna.

Uprawnienia niestandardowe nadpisuja domyslne ustawienia roli. Etykieta roli pozostaje taka sama, ale rzeczywisty dostep jest tym, co sie liczy.

### Edytor uprawnien

Edytor uprawnien wyswietla interfejs z lista kontrolna:

1. Kazda strona pojawia sie jako sekcja z przelacznikiem dostepu do strony.
2. Gdy dostep do strony jest wlaczony, dostepne akcje dla tej strony pojawiaja sie jako pola wyboru.
3. Zaznacz lub odznacz poszczegolne akcje, aby precyzyjnie dostroic mozliwosci uzytkownika.
4. Kliknij **Save**, aby natychmiast zastosowac zmiany.

> **Wazne:** Zmiany uprawnien wchodza w zycie przy nastepnym zaladowaniu strony przez uzytkownika. Jesli uzytkownik jest aktualnie zalogowany, zobaczy zaktualizowane uprawnienia po odswiezeniu przegladarki.

---

## Szybkie porownanie rol

### Super Admin
- Moze robic wszystko
- Jedyna rola, ktora moze zarzadzac uzytkownikami admin i ustawieniami systemowymi
- Jedyna rola, ktora moze usuwac uzytkownikow aplikacji i powiadomienia
- Jedyna rola, ktora moze eksportowac dane uzytkownikow
- Nie moze zostac usunieta, jesli jest to ostatnie konto Super Admin

### Admin
- Pelny dostep operacyjny do tresci i zarzadzania uzytkownikami
- Moze zatwierdzac/odrzucac weryfikacje
- Moze zarzadzac rynkiem kojarzenia
- Moze wysylac powiadomienia
- Nie ma dostepu do stron Settings ani Admin Users
- Nie moze usuwac uzytkownikow aplikacji (tylko banowac)

### Moderator
- Skupiony na jakosci tresci i bezpieczenstwie spolecznosci
- Moze zatwierdzac/odrzucac weryfikacje hodowcow
- Moze moderowac ogloszenia kojarzenia
- Moze edytowac zwierzeta (poprawiac nieprawidlowe informacje)
- Moze banowac problematycznych uzytkownikow
- Nie ma dostepu do Analytics, Settings ani Admin Users
- Nie moze tworzyc ani usuwac tresci

### Viewer
- Dostep tylko do odczytu w celach nadzorczych
- Moze przegladac dashboardy, uzytkownikow, zwierzeta, analytics
- Nie moze modyfikowac zadnych danych
- Nie moze wysylac powiadomien ani zatwierdzac weryfikacji
- Przydatny dla interesariuszy, ktorzy potrzebuja wgladu bez ryzyka

---

## Kwestie bezpieczenstwa

| Praktyka | Opis |
|----------|------|
| Minimalne uprawnienia | Przypisz minimalna role potrzebna do realizacji obowiazkow uzytkownika |
| Regularny audyt | Przegladaj liste uzytkownikow admin co kwartal; wylaczaj nieuzywane konta |
| Oddzielne konta | Kazdy administrator powinien miec wlasne konto (bez wspoldzielonych loginow) |
| Limit Super Admin | Utrzymuj liczbe Super Adminow na maksymalnie 2-3 |
| Zawieszaj, nie usuwaj | Gdy administrator odchodzi, zawies jego konto zamiast je usuwac (zachowuje sciezke audytu) |

---

## Czesto zadawane pytania

**P: Czy moge utworzyc niestandardowa role?**
O: System ma cztery stale role (Super Admin, Admin, Moderator, Viewer). Mozesz jednak dostosowac uprawnienia kazdego indywidualnego uzytkownika niezaleznie od etykiety jego roli.

**P: Co sie stanie, jesli usune dostep do strony uzytkownikowi, ktory aktualnie ja przglada?**
O: Uzytkownik zobaczy blad 403 przy nastepnej nawigacji lub odswiezeniu strony. Jego sesja nie zostanie przerwana.

**P: Czy Super Admin moze zdegradowac samego siebie?**
O: Super Admin moze zmienic swoja role, ale system uniemozliwia calkowite usuniecie ostatniego konta Super Admin.

**P: Czy uprawnienia wplywaja na Podrecznik uzytkownika?**
O: Nie. Wszyscy uzytkownicy admin maja dostep do Podrecznika uzytkownika niezaleznie od ich roli lub uprawnien. Dokumentacja jest zawsze dostepna.

**P: Czy moge zobaczyc dziennik audytu zmian uprawnien?**
O: Zmiany uprawnien sa rejestrowane ze znacznikiem czasu i identyfikatorem administratora, ktory dokonal zmiany. Sa one przechowywane w polach `updatedBy` i `updatedAt` kazdego rekordu uzytkownika admin.
