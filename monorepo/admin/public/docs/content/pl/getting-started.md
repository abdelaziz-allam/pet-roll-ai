# Pierwsze kroki

Witamy w Panelu Administracyjnym Petfolioo. Ten przewodnik przeprowadzi Cię przez pierwsze logowanie, wyjaśni układ interfejsu oraz pomoże zrozumieć, jak kontrola dostępu oparta na rolach (RBAC) określa, co możesz widzieć i robić w ramach platformy.

Panel administracyjny to webowa konsola zarządzania platformą Petfolioo do monitorowania zdrowia zwierząt i hodowli. Stąd administratorzy mogą zarządzać użytkownikami, zwierzętami, kategoriami, kartotekami zdrowia, programami hodowlanymi oraz ustawieniami platformy.

![Login Page](/docs/screenshots/login.png)

---

## Logowanie

Panel administracyjny wykorzystuje uwierzytelnianie za pomocą adresu e-mail i hasła. Dostęp do panelu mają wyłącznie konta z przypisaną rolą administratora.

### Kroki logowania

1. Otwórz przeglądarkę i przejdź pod adres URL panelu administracyjnego.
2. Zostanie wyświetlona strona **Logowania** pod ścieżką `/login`.
3. Wpisz swój **Adres e-mail** w pierwszym polu.
4. Wpisz swoje **Hasło** w drugim polu.
5. Kliknij przycisk **Zaloguj się**.
6. Jeśli dane uwierzytelniające są prawidłowe i Twoje konto ma uprawnienia administratora, zostaniesz przekierowany do **Panelu głównego**.

> **Uwaga:** Jeśli po wprowadzeniu prawidłowych danych pojawi się błąd "Brak autoryzacji", Twoje konto może nie mieć przypisanej roli administratora. Skontaktuj się z superadministratorem, aby zaktualizować Twoją rolę.

### Resetowanie hasła

Jeśli zapomniałeś hasła:

1. Na stronie logowania kliknij link **Zapomniałeś hasła?** poniżej pola hasła.
2. Wprowadź adres e-mail powiązany z Twoim kontem administratora.
3. Kliknij **Wyślij link resetujący**.
4. Sprawdź skrzynkę odbiorczą — powinieneś otrzymać wiadomość od Petfolioo z linkiem do resetowania hasła.
5. Kliknij link w wiadomości, aby otworzyć formularz resetowania hasła.
6. Wprowadź i potwierdź nowe hasło.
7. Wróć na stronę logowania i zaloguj się nowymi danymi.

> **Wskazówka:** Linki do resetowania hasła wygasają po 1 godzinie. Jeśli Twój link wygasł, poproś o nowy ze strony logowania.

---

## Układ panelu głównego

Po zalogowaniu panel administracyjny prezentuje spójny układ na wszystkich stronach.

### Nawigacja boczna

Lewy panel boczny zawiera główne menu nawigacyjne. Obejmuje linki do wszystkich głównych modułów:

| Element menu | Opis |
|-----------|-------------|
| Panel główny | Przegląd platformy z KPI i analityką |
| Użytkownicy | Zarządzanie użytkownikami aplikacji, rolami i kontami |
| Zwierzęta | Przeglądanie i zarządzanie rejestrem zwierząt |
| Kategorie | Definiowanie i zarządzanie kategoriami zwierząt |
| Kartoteki zdrowia | Przeglądanie certyfikatów zdrowia zwierząt |
| Hodowla | Zarządzanie programami hodowlanymi i rodowodami |
| Szczepienia | Śledzenie kartotek szczepień |
| Ciąża | Monitorowanie wpisów śledzenia ciąży |
| Weryfikacje | Przeglądanie oczekujących wniosków o weryfikację |
| Ustawienia | Konfiguracja platformy |

Panel boczny można zwinąć, klikając ikonę przełącznika u góry, aby uzyskać więcej miejsca na obszar treści.

### Pasek nagłówka

Górny pasek nagłówka zawiera:

| Element | Lokalizacja | Przeznaczenie |
|---------|----------|---------|
| Wyszukiwarka | Środek | Globalne wyszukiwanie użytkowników, zwierząt i kartotek |
| Dzwonek powiadomień | Prawa strona | Alerty dotyczące oczekujących działań i zdarzeń systemowych |
| Awatar profilu | Skrajnie prawa strona | Menu konta z ustawieniami profilu i wylogowaniem |

### Obszar treści

Główny obszar treści zajmuje pozostałą przestrzeń po prawej stronie panelu bocznego i poniżej nagłówka. Tutaj wyświetlane są tabele, formularze, panele szczegółów oraz analityka.

---

## Kontrola dostępu oparta na rolach

Panel administracyjny wymusza kontrolę dostępu opartą na rolach (RBAC). Każde konto administratora ma przypisaną jedną z poniższych ról, która określa dostępne działania.

### Definicje ról

| Rola | Poziom dostępu | Opis |
|------|-------------|-------------|
| `super_admin` | Pełny | Kompletny dostęp do wszystkich modułów, ustawień i zarządzania użytkownikami. Może przypisywać i odbierać role administratora. |
| `admin` | Wysoki | Dostęp do wszystkich modułów operacyjnych. Może zarządzać użytkownikami, zwierzętami i kartotekami. Nie może modyfikować ustawień platformy ani przypisywać ról super_admin. |
| `moderator` | Średni | Może przeglądać i moderować treści, zatwierdzać weryfikacje oraz zarządzać listingami zwierząt. Nie może tworzyć ani usuwać kont administratorów. |
| `viewer` | Tylko odczyt | Może przeglądać wszystkie dane we wszystkich modułach, ale nie może tworzyć, edytować ani usuwać żadnych rekordów. Przydatne do audytów i raportowania. |

### Matryca uprawnień

| Działanie | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Wyświetlanie panelu głównego | Tak | Tak | Tak | Tak |
| Zarządzanie użytkownikami | Tak | Tak | Nie | Nie |
| Tworzenie kont administratorów | Tak | Nie | Nie | Nie |
| Blokowanie/Odblokowanie użytkowników | Tak | Tak | Tak | Nie |
| Zarządzanie zwierzętami | Tak | Tak | Tak | Nie |
| Zatwierdzanie weryfikacji | Tak | Tak | Tak | Nie |
| Zarządzanie kategoriami | Tak | Tak | Nie | Nie |
| Edycja ustawień platformy | Tak | Nie | Nie | Nie |
| Przeglądanie raportów | Tak | Tak | Tak | Tak |

> **Uwaga:** Jeśli element nawigacji nie jest widoczny w Twoim panelu bocznym, Twoja rola nie ma dostępu do tego modułu.

---

## Przegląd nawigacji

Poniżej znajduje się pełna lista modułów dostępnych w panelu administracyjnym, uporządkowana według obszaru funkcjonalnego.

### Moduły podstawowe

1. **Panel główny** - Przegląd kondycji platformy, KPI i wykresy analityczne.
2. **Użytkownicy** - Zarządzanie użytkownikami aplikacji, w tym profile, role i status kont.
3. **Zwierzęta** - Rejestr zwierząt z pełnymi widokami szczegółów i narzędziami moderacji.
4. **Kategorie** - System kategoryzacji gatunków/typów zwierząt.

### Zdrowie i kartoteki

5. **Kartoteki zdrowia** - Dokumenty certyfikatów zdrowia i ich status weryfikacji.
6. **Szczepienia** - Harmonogramy szczepień i kartoteki wykonanych szczepień.
7. **Ciąża** - Śledzenie ciąży u zwierząt hodowlanych.

### Operacje platformy

8. **Weryfikacje** - Kolejka oczekujących wniosków o weryfikację użytkowników i zwierząt.
9. **Hodowla** - Zarządzanie programami hodowlanymi i śledzenie rodowodów.
10. **Ustawienia** - Konfiguracja platformy i flagi funkcjonalności.

---

## Wskazówki dotyczące pierwszej konfiguracji

Podczas pierwszego logowania do panelu administracyjnego postępuj zgodnie z poniższymi zaleceniami, aby się zorientować.

### Zalecane pierwsze kroki

1. **Sprawdź swój profil** - Kliknij awatar w prawym górnym rogu i wybierz "Profil", aby zweryfikować poprawność danych konta.
2. **Zapoznaj się z panelem głównym** - Przejrzyj karty KPI i analitykę, aby zrozumieć aktualne metryki platformy.
3. **Sprawdź oczekujące weryfikacje** - Przejdź do modułu Weryfikacje, aby zobaczyć, czy są elementy oczekujące na przegląd.
4. **Przejrzyj aktywnych użytkowników** - Odwiedź moduł Użytkownicy i posortuj według "Daty dołączenia" malejąco, aby zobaczyć najnowsze rejestracje.
5. **Sprawdź kategorie** - Upewnij się, że kategorie zwierząt są prawidłowo skonfigurowane dla Twojego regionu.

### Zalecenia dotyczące przeglądarek

Panel administracyjny działa najlepiej w nowoczesnych przeglądarkach:

| Przeglądarka | Minimalna wersja |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Wskazówka:** Włącz powiadomienia przeglądarki, gdy zostaniesz o to poproszony, aby otrzymywać alerty w czasie rzeczywistym o oczekujących weryfikacjach i ważnych zdarzeniach systemowych.

### Skróty klawiszowe

| Skrót | Działanie |
|----------|--------|
| `/` | Ustawia fokus na globalnym pasku wyszukiwania |
| `Esc` | Zamyka otwarte panele i okna modalne |

---

## Rozwiązywanie problemów z logowaniem

| Problem | Rozwiązanie |
|---------|----------|
| Błąd "Nieprawidłowe dane logowania" | Sprawdź ponownie adres e-mail i hasło. W razie potrzeby skorzystaj z procedury resetowania hasła. |
| Komunikat "Konto wyłączone" | Twoje konto zostało dezaktywowane. Skontaktuj się z superadministratorem. |
| Strona się ładuje, ale formularz logowania jest pusty | Wyczyść pamięć podręczną przeglądarki i pliki cookie, a następnie odśwież stronę. |
| Przekierowanie z powrotem do logowania po zalogowaniu | Twoja sesja mogła wygasnąć. Spróbuj zalogować się ponownie. Jeśli problem się powtarza, sprawdź, czy pliki cookie są włączone. |

---

## Uzyskiwanie pomocy

Jeśli napotkasz problemy nieomówione w tym przewodniku:

1. Sprawdź inne sekcje niniejszej instrukcji obsługi, aby uzyskać pomoc dotyczącą konkretnych modułów.
2. Skontaktuj się z superadministratorem swojej organizacji w sprawie ról i dostępu.
3. W przypadku problemów technicznych skontaktuj się z zespołem wsparcia platformy.

---

*Dalej: [Panel główny](./dashboard.md) - Dowiedz się więcej o analityce i przeglądzie KPI.*
