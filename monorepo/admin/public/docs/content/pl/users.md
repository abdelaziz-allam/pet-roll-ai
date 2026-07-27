# Użytkownicy aplikacji

Moduł Użytkownicy aplikacji zapewnia pełne zarządzanie wszystkimi kontami użytkowników na platformie Petfolioo. Administratorzy mogą przeglądać profile użytkowników, tworzyć nowe konta, edytować dane, przypisywać role oraz podejmować działania moderacyjne. Ten moduł jest dostępny dla użytkowników z rolami `super_admin` lub `admin`.

![App Users](/docs/screenshots/users.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Ban, Delete, Export |
> | Admin | View, Create, Edit, Ban |
> | Moderator | View, Ban |
> | Viewer | View only |

---

## Tabela listy użytkowników

Tabela listy użytkowników wyświetla wszystkich zarejestrowanych użytkowników platformy z kluczowymi informacjami widocznymi na pierwszy rzut oka.

### Kolumny tabeli

| Kolumna | Opis | Sortowalna |
|--------|-------------|:--------:|
| Awatar | Zdjęcie profilowe użytkownika (okrągła miniatura) | Nie |
| Imię i nazwisko | Wyświetlana nazwa | Tak |
| E-mail | Zarejestrowany adres e-mail | Tak |
| Rola | Przypisana rola na platformie (użytkownik, moderator, administrator) | Tak |
| Status | Status konta (Aktywny, Oczekujący, Zablokowany) | Tak |
| Zweryfikowany hodowca | Znacznik potwierdzający status zweryfikowanego hodowcy | Tak |
| Liczba zwierząt | Liczba zwierząt zarejestrowanych przez tego użytkownika | Tak |
| Data dołączenia | Data utworzenia konta | Tak |

### Wskaźniki statusu

| Status | Kolor znacznika | Znaczenie |
|--------|-------------|---------|
| Aktywny | Zielony | Konto jest w pełni funkcjonalne |
| Oczekujący | Pomarańczowy | Weryfikacja e-mail nie została ukończona |
| Zablokowany | Czerwony | Konto zawieszone przez administratora |

### Znacznik zweryfikowanego hodowcy

| Wskaźnik | Znaczenie |
|-----------|---------|
| Niebieski znacznik z haczykiem | Użytkownik przeszedł weryfikację hodowcy i został potwierdzony |
| Brak znacznika | Użytkownik nie ubiegał się o weryfikację hodowcy ani jej nie otrzymał |
| Ikona zegara | Wniosek o weryfikację hodowcy oczekuje na rozpatrzenie |

### Nawigacja w tabeli

1. **Sortuj** klikając nagłówek dowolnej sortowalnej kolumny. Kliknij ponownie, aby odwrócić kolejność.
2. **Wyszukuj** za pomocą paska wyszukiwania powyżej tabeli, aby znaleźć użytkowników po imieniu lub e-mailu.
3. **Filtruj** za pomocą list rozwijanych statusu i roli, aby zawęzić wyniki.
4. **Paginuj** za pomocą kontrolek na dole (10, 20, 50 wpisów na stronę).

> **Wskazówka:** Połącz pasek wyszukiwania z filtrami statusu, aby szybko znaleźć konkretnych użytkowników. Na przykład wyszukaj "jan" z filtrem statusu "Zablokowany", aby znaleźć zablokowanych użytkowników o imieniu Jan.

---

## Przeglądanie szczegółów użytkownika

Panel szczegółów użytkownika zapewnia kompleksowy widok profilu i aktywności użytkownika.

### Otwieranie panelu szczegółów

1. Kliknij dowolny wiersz w tabeli listy użytkowników.
2. Panel szczegółów wysuwa się z prawej strony ekranu.
3. Panel zawiera wiele sekcji ułożonych pionowo.

### Sekcje panelu szczegółów

| Sekcja | Zawartość |
|---------|---------|
| Nagłówek profilu | Duży awatar, wyświetlana nazwa, e-mail, znacznik roli, znacznik statusu |
| Informacje o koncie | Data dołączenia, ostatnie logowanie, status weryfikacji e-mail, dostawca uwierzytelniania |
| Dane osobowe | Numer telefonu, strefa czasowa, kraj, miasto |
| Status hodowcy | Status weryfikacji, data złożenia wniosku, przesłane dokumenty |
| Podsumowanie zwierząt | Liczba zarejestrowanych zwierząt z szybkimi linkami do każdego |
| Dziennik aktywności | Ostatnie działania podjęte przez tego użytkownika na platformie |

### Nagłówek profilu

Górna część panelu pokazuje:

- **Awatar** w pełnym rozmiarze (lub domyślną sylwetkę, jeśli nie przesłano zdjęcia)
- **Wyświetlaną nazwę** dużym tekstem
- **E-mail** poniżej imienia
- **Znacznik roli** oznaczony kolorem według poziomu uprawnień
- **Znacznik statusu** pokazujący aktualny status konta

### Pola informacji o koncie

| Pole | Opis | Przykład |
|-------|-------------|---------|
| ID użytkownika | Unikalny identyfikator systemowy | "usr_a1b2c3d4" |
| Data dołączenia | Kiedy konto zostało utworzone | "2023-01-15 09:30 UTC" |
| Ostatnie logowanie | Najnowszy znacznik czasu logowania | "2024-07-20 14:22 UTC" |
| E-mail zweryfikowany | Czy e-mail został potwierdzony | "Tak" / "Nie" |
| Dostawca uwierzytelniania | Użyta metoda uwierzytelniania | "E-mail/Hasło" lub "Google" |
| Firebase UID | Identyfikator użytkownika Firebase Authentication | "Abc123Def456" |

---

## Tworzenie nowego użytkownika

Administratorzy mogą tworzyć konta użytkowników bezpośrednio z panelu administracyjnego. Ponieważ platforma używa Firebase Authentication, podczas tworzenia nie jest ustawiane hasło - użytkownicy otrzymają e-mail z linkiem do ustawienia własnego hasła.

### Kroki tworzenia użytkownika

1. Kliknij przycisk **Utwórz użytkownika** w prawym górnym rogu strony Użytkownicy.
2. Pojawi się okno modalne lub formularz tworzenia.
3. Wypełnij wymagane pola:

| Pole | Wymagane | Opis |
|-------|:--------:|-------------|
| Wyświetlana nazwa | Tak | Pełne imię i nazwisko użytkownika lub wybrana nazwa wyświetlana |
| E-mail | Tak | Prawidłowy adres e-mail (musi być unikalny na platformie) |

4. Kliknij **Utwórz**, aby przesłać formularz.
5. System wykona następujące operacje:
   - Utworzy rekord Firebase Authentication
   - Wyśle powitalny e-mail do użytkownika z linkiem do ustawienia hasła
   - Utworzy profil użytkownika w bazie danych platformy
   - Przypisze domyślną rolę "użytkownik"
6. Nowy użytkownik pojawi się w tabeli listy ze statusem "Oczekujący" do momentu weryfikacji e-maila.

### Reguły walidacji

| Pole | Reguła |
|-------|------|
| Wyświetlana nazwa | 2-100 znaków, nie może być pusta |
| E-mail | Musi być w prawidłowym formacie e-mail, nie może już istnieć w systemie |

> **Uwaga:** Pole hasła nie jest potrzebne. Firebase Authentication obsługuje ustawianie hasła poprzez powitalny e-mail wysłany do użytkownika. Zapewnia to, że użytkownik sam wybierze bezpieczne hasło.

> **Wskazówka:** Jeśli musisz utworzyć użytkownika, który powinien mieć podwyższone uprawnienia, najpierw utwórz go z domyślnymi ustawieniami, a następnie zmień jego rolę osobno (patrz Zmiana roli poniżej).

---

## Edycja użytkownika

Administratorzy mogą modyfikować dane profilu użytkownika w razie potrzeby. Jest to powszechnie stosowane do korygowania informacji lub aktualizowania danych w imieniu użytkownika.

### Kroki edycji użytkownika

1. Otwórz panel szczegółów użytkownika, klikając jego wiersz w tabeli listy.
2. Kliknij przycisk **Edytuj** (ikona ołówka) w nagłówku panelu.
3. Panel przełączy się w tryb edycji z edytowalnymi polami formularza.
4. Zmodyfikuj dowolne z dostępnych pól:

| Pole | Edytowalne | Uwagi |
|-------|:--------:|-------|
| Wyświetlana nazwa | Tak | Publiczna nazwa użytkownika |
| Telefon | Tak | Zalecany format międzynarodowy (np. +48501234567) |
| Strefa czasowa | Tak | Lista rozwijana stref czasowych IANA (np. Europe/Warsaw) |
| Kraj | Tak | Lista rozwijana wszystkich krajów |
| Miasto | Tak | Pole tekstowe, sugestie aktualizują się na podstawie kraju |
| E-mail | Nie | Nie można zmienić (używany jako identyfikator logowania) |
| ID użytkownika | Nie | Generowany systemowo, niezmienny |

5. Kliknij **Zapisz zmiany**, aby zastosować edycje.
6. Powiadomienie o sukcesie potwierdzi aktualizację.
7. Panel wraca do trybu przeglądania, pokazując zaktualizowane informacje.

### Historia edycji

Wszystkie edycje wykonane przez panel administracyjny są rejestrowane:

| Pole dziennika | Opis |
|-----------|-------------|
| Znacznik czasu | Kiedy zmiana została wykonana |
| Administrator | Który administrator dokonał zmiany |
| Zmienione pole | Które pole zostało zmodyfikowane |
| Stara wartość | Poprzednia wartość |
| Nowa wartość | Zaktualizowana wartość |

> **Ważne:** Edycje profili użytkowników są widoczne dla użytkownika. Zobaczy on zaktualizowane informacje w swojej aplikacji. Rozważ powiadomienie użytkownika, jeśli dokonujesz zmian w jego imieniu.

---

## Zmiana roli

Zmiany ról określają, jaki poziom dostępu użytkownik ma w ramach platformy i jej aplikacji.

### Dostępne role

| Rola | Opis | Uprawnienia |
|------|-------------|--------------|
| user | Standardowy użytkownik platformy | Może zarządzać własnymi zwierzętami, uczestniczyć w programach hodowlanych, przeglądać ogłoszenia |
| moderator | Moderator społeczności | Wszystkie uprawnienia użytkownika plus możliwość przeglądania i oznaczania treści |
| admin | Administrator platformy | Wszystkie uprawnienia moderatora plus dostęp do panelu administracyjnego |

### Kroki zmiany roli użytkownika

1. Otwórz panel szczegółów użytkownika, klikając jego wiersz.
2. Znajdź sekcję **Rola** w panelu.
3. Kliknij przycisk **Zmień rolę** (lub aktualny znacznik roli).
4. Pojawi się okno wyboru roli z:
   - Przyciskami radio dla każdej dostępnej roli
   - Tekstem opisu wyjaśniającym uprawnienia każdej roli
   - Polem wyboru potwierdzenia zmiany
5. Wybierz nową rolę.
6. Przeczytaj opis roli, aby potwierdzić, że jest odpowiednia.
7. Zaznacz **pole wyboru potwierdzenia** ("Rozumiem, że to zmieni poziom dostępu użytkownika").
8. Kliknij **Potwierdź zmianę roli**.
9. Rola użytkownika zostanie natychmiast zaktualizowana.

### Ograniczenia zmiany ról

| Twoja rola | Może przypisać |
|-----------|-----------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Nie może zmieniać ról |
| viewer | Nie może zmieniać ról |

> **Ważne:** Awansowanie użytkownika do roli "admin" daje mu dostęp do panelu administracyjnego. Rób to tylko dla zaufanych członków zespołu, którzy potrzebują dostępu administracyjnego.

> **Uwaga:** Zmiana roli użytkownika z "admin" na "user" natychmiast odbiera mu dostęp do panelu administracyjnego. Jeśli jest aktualnie zalogowany w panelu, jego sesja zakończy się przy następnej nawigacji.

---

## Blokowanie/Odblokowanie użytkownika

Zablokowanie użytkownika zawiesza jego konto, uniemożliwiając logowanie do aplikacji i korzystanie z funkcji platformy.

### Blokowanie użytkownika

1. Otwórz panel szczegółów użytkownika.
2. Przewiń do sekcji **Akcje** na dole panelu.
3. Kliknij przycisk **Zablokuj użytkownika** (wyświetlany na czerwono).
4. Pojawi się okno potwierdzenia z:
   - Imieniem i e-mailem użytkownika do potwierdzenia
   - Polem tekstowym **Powód** (wymagane)
   - Selektorem **Czas trwania** (na stałe, 7 dni, 30 dni, 90 dni)
5. Wprowadź jasny, profesjonalny powód blokady.
6. Wybierz czas trwania blokady.
7. Kliknij **Potwierdź blokadę**.

### Skutki blokady

| Skutek | Opis |
|--------|-------------|
| Logowanie zablokowane | Użytkownik nie może zalogować się do aplikacji mobilnej |
| Profil ukryty | Profil użytkownika nie jest widoczny dla innych użytkowników |
| Zwierzęta usunięte z listy | Wszystkie zwierzęta tego użytkownika są ukryte w ogłoszeniach |
| Powiadomienia | Użytkownik otrzymuje e-mail wyjaśniający blokadę z podanym powodem |
| Aktywne sesje | Wszystkie bieżące sesje są natychmiast kończone |

### Wytyczne dotyczące powodu blokady

| Wytyczna | Przykład |
|-----------|---------|
| Bądź konkretny | "Wiele fałszywych ogłoszeń hodowlanych zgłoszonych i potwierdzonych" |
| Odwołaj się do zasad | "Naruszenie Regulaminu sekcja 4.2 dotycząca autentyczności ogłoszeń" |
| Unikaj niejasnego języka | NIE pisz "złe zachowanie" - bądź konkretny, co miało miejsce |
| Zachowaj profesjonalizm | Powód jest wysyłany bezpośrednio do użytkownika |

> **Ważne:** Powód blokady jest przekazywany użytkownikowi za pośrednictwem e-maila i powiadomienia w aplikacji. Musi być oparty na faktach, konkretny i profesjonalny.

### Odblokowanie użytkownika

1. Użyj filtra **Status**, aby wybrać "Zablokowany" i znaleźć zablokowanych użytkowników.
2. Kliknij wiersz zablokowanego użytkownika, aby otworzyć jego panel szczegółów.
3. Panel pokazuje kartę **Informacje o blokadzie** z:
   - Datą blokady
   - Administratorem blokującym
   - Powodem blokady
   - Czasem trwania blokady / datą wygaśnięcia
4. Kliknij przycisk **Odblokuj użytkownika** (wyświetlany na zielono).
5. Pojawi się okno potwierdzenia.
6. Opcjonalnie dodaj notatkę wyjaśniającą, dlaczego blokada jest zdejmowana.
7. Kliknij **Potwierdź odblokowanie**.
8. Status użytkownika wraca do "Aktywny" i odzyskuje pełny dostęp do platformy.
9. Użytkownik otrzymuje powiadomienie, że jego konto zostało przywrócone.

### Historia blokad

Każda akcja blokowania i odblokowywania jest zapisywana w historii użytkownika:

| Pole | Opis |
|-------|-------------|
| Data blokady | Kiedy blokada została nałożona |
| Data odblokowania | Kiedy blokada została zdjęta (jeśli dotyczy) |
| Administrator | Który administrator podjął akcję |
| Powód | Podany powód blokady |
| Czas trwania | Na jaki okres blokada została ustawiona |
| Rozwiązanie | Jak się zakończyła (ręczne odblokowanie, wygaśnięcie, odwołanie) |

---

## Wyszukiwanie i filtrowanie użytkowników

### Pasek wyszukiwania

Pasek wyszukiwania na górze strony Użytkownicy obsługuje:

| Typ wyszukiwania | Przykład | Dopasowania |
|-------------|---------|---------|
| Wyszukiwanie po imieniu | "Anna" | Wszyscy użytkownicy z "Anna" w wyświetlanej nazwie |
| Wyszukiwanie po e-mailu | "gmail.com" | Wszyscy użytkownicy z adresami Gmail |
| Częściowe dopasowanie | "pet" | Użytkownicy o imionach "Peter", "Petrov" itp. |

### Filtry rozwijane

| Filtr | Opcje |
|--------|---------|
| Rola | Wszystkie, Użytkownik, Moderator, Administrator |
| Status | Wszystkie, Aktywny, Oczekujący, Zablokowany |
| Zweryfikowany hodowca | Wszystkie, Zweryfikowany, Niezweryfikowany, Oczekujący |

### Łączenie wyszukiwania i filtrów

1. Wprowadź tekst w pasku wyszukiwania ORAZ jednocześnie wybierz wartości filtrów.
2. Wyniki muszą spełniać WSZYSTKIE kryteria (logika AND).
3. Usuń poszczególne filtry, klikając ich przycisk X, lub wyczyść wszystkie przyciskiem **Resetuj**.

---

## Eksportowanie danych użytkowników

Aby wyeksportować dane użytkowników do raportowania lub analizy:

1. Zastosuj żądane filtry.
2. Kliknij przycisk **Eksport** w prawym górnym rogu.
3. Wybierz format: **CSV** lub **Excel**.
4. Wybierz zakres: **Bieżący przefiltrowany widok** lub **Wszyscy użytkownicy**.
5. Pobieranie rozpocznie się automatycznie.

### Eksportowane pola

| Pole | Uwzględnione | Uwagi |
|-------|:--------:|-------|
| Wyświetlana nazwa | Tak | |
| E-mail | Tak | |
| Rola | Tak | |
| Status | Tak | |
| Kraj | Tak | |
| Miasto | Tak | |
| Liczba zwierząt | Tak | |
| Data dołączenia | Tak | |
| Ostatnie logowanie | Tak | |
| Telefon | Nie | Wykluczony ze względu na prywatność |

> **Uwaga:** Numery telefonów i szczegółowe dane osobowe są domyślnie wyłączone z eksportów w celu zgodności z wymaganiami ochrony danych.

---

*Poprzedni: [Rejestr zwierząt](./pets.md) | Następny: [Kategorie zwierząt](./categories.md)*
