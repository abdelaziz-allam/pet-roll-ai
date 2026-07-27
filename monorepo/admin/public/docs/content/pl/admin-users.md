# Administratorzy

Strona Administratorzy umożliwia zarządzanie kontami administratorów, które mają dostęp do panelu administracyjnego Petfolioo. Tutaj możesz tworzyć nowych administratorów, przypisywać role, konfigurować szczegółowe uprawnienia i kontrolować status kont.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Przegląd

Kontrola dostępu jest kluczowa dla utrzymania bezpieczeństwa i integralności operacyjnej. System Administratorów obsługuje kontrolę dostępu opartą na rolach z dodatkową szczegółowością uprawnień na poziomie poszczególnych stron, zapewniając każdemu członkowi zespołu dokładnie taki dostęp, jakiego potrzebuje.

---

## Tabela administratorów

Widok główny wyświetla tabelę wszystkich kont administratorów w systemie.

### Kolumny tabeli

| Kolumna | Opis |
|---------|------|
| **Nazwa** | Wyświetlana nazwa administratora widoczna w całym portalu |
| **E-mail** | Adres e-mail do logowania na konto administratora |
| **Rola** | Przypisana rola określająca podstawowy poziom uprawnień |
| **Status** | Bieżący status konta: Aktywne lub Zawieszone |
| **Akcje** | Przyciski akcji Edytuj i Usuń |

### Funkcje tabeli

1. Tabela jest sortowalna przez kliknięcie nagłówków kolumn.
2. Pole wyszukiwania nad tabelą pozwala filtrować po nazwie lub adresie e-mail.
3. Kontrolki paginacji pojawiają się na dole dla dużych zespołów administratorów.
4. Aktywne konta wyświetlają zieloną plakietkę statusu; zawieszone konta wyświetlają czerwoną plakietkę.

---

## Role

Każde konto administratora ma przypisaną jedną z czterech ról. Role definiują podstawowy poziom dostępu przed zastosowaniem jakichkolwiek szczegółowych nadpisań uprawnień.

### Definicje ról

| Rola | Poziom dostępu | Opis |
|------|----------------|------|
| **super_admin** | Pełny, nieograniczony | Kompletny dostęp do wszystkich stron, funkcji i ustawień systemowych. Nie można go usunąć ani ograniczyć jego uprawnień. |
| **admin** | Cała treść i użytkownicy | Pełny dostęp do zarządzania treścią, zarządzania użytkownikami, opinii, powiadomień i analityki. Nie ma dostępu do ustawień systemowych. |
| **moderator** | Przeglądanie i moderowanie | Może przeglądać i moderować treści takie jak opinie, zgłoszone profile i oznaczone wpisy. Nie może tworzyć ani usuwać zasobów. |
| **viewer** | Tylko do odczytu | Może wyświetlać wszystkie strony, do których ma dostęp, ale nie może tworzyć, edytować ani usuwać żadnych rekordów. Idealna dla interesariuszy potrzebujących wglądu. |

### Hierarchia ról

Hierarchia ról określa, które role mogą zarządzać innymi rolami:

1. **super_admin** może zarządzać wszystkimi innymi rolami (admin, moderator, viewer).
2. **admin** może zarządzać kontami moderator i viewer.
3. **moderator** nie może zarządzać żadnymi kontami administratorów.
4. **viewer** nie może zarządzać żadnymi kontami administratorów.

> **Ważne:** Nie możesz przypisać roli wyższej niż Twoja własna. Tylko super_admin może utworzyć kolejnego super_admin.

---

## Tworzenie administratora

Aby dodać nowe konto administratora do portalu:

### Kroki

1. Kliknij przycisk **Dodaj administratora** w prawym górnym rogu strony Administratorzy.
2. Pojawia się formularz tworzenia z następującymi polami:

| Pole | Opis | Wymagania |
|------|------|-----------|
| **E-mail** | Adres e-mail do logowania nowego administratora | Wymagany. Musi być prawidłowym, unikalnym adresem e-mail. |
| **Wyświetlana nazwa** | Nazwa widoczna w interfejsie portalu | Wymagana. 2-50 znaków. |
| **Hasło** | Początkowe hasło logowania | Wymagane. Minimum 8 znaków, musi zawierać wielką literę, małą literę i cyfrę. |
| **Rola** | Rola dostępu dla tego administratora | Wymagana. Wybierz z rozwijanej listy. |

3. Wypełnij pole **E-mail** adresem nowego administratora.
4. Wprowadź **Wyświetlaną nazwę**, która będzie identyfikować tego administratora w portalu.
5. Ustaw początkowe **Hasło** spełniające wymagania złożoności.
6. Wybierz odpowiednią **Rolę** z rozwijanej listy.
7. Kliknij **Utwórz**, aby dodać konto administratora.
8. Komunikat o sukcesie potwierdza utworzenie konta.
9. Nowy administrator pojawia się w tabeli i może się teraz zalogować.

> **Wskazówka:** Po utworzeniu konta poinformuj nowego administratora o jego danych logowania przez bezpieczny kanał. Zalecaj zmianę hasła przy pierwszym logowaniu.

---

## Edycja administratora

Możesz modyfikować wyświetlaną nazwę, rolę i status istniejącego administratora.

### Kroki

1. Znajdź administratora w tabeli Administratorzy.
2. Kliknij przycisk **Edytuj** (ikona ołówka) w kolumnie Akcje.
3. Pojawia się formularz edycji z wstępnie wypełnionymi bieżącymi wartościami.

### Pola edytowalne

| Pole | Opis | Uwagi |
|------|------|-------|
| **Wyświetlana nazwa** | Aktualizuj widoczną nazwę administratora | 2-50 znaków |
| **Rola** | Zmień poziom dostępu administratora | Nie można przypisać roli wyższej niż własna |
| **Status** | Ustaw na Aktywne lub Zawieszone | Zawieszeni administratorzy nie mogą się logować |

4. Zmodyfikuj pola według potrzeb.
5. Kliknij **Zapisz zmiany**, aby zastosować aktualizacje.
6. Komunikat o sukcesie potwierdza zapisanie zmian.

### Zmiana statusu

- **Aktywne** -- Administrator może się logować i normalnie korzystać z portalu.
- **Zawieszone** -- Administrator nie może się zalogować. Istniejące sesje są natychmiast zakończone.

> **Uwaga:** Zawieszenie administratora jest odwracalne. Użyj go, gdy musisz tymczasowo cofnąć dostęp bez usuwania konta.

### Ograniczenia

- Nie możesz edytować własnej roli (aby zapobiec przypadkowej degradacji).
- Nie możesz zmienić roli super_admin, chyba że sam jesteś super_admin.
- Adres e-mail nie może być zmieniony po utworzeniu konta.

---

## Szczegółowa konfiguracja uprawnień na poziomie stron

Oprócz ról panel administracyjny obsługuje precyzyjną kontrolę uprawnień na poziomie poszczególnych stron. Pozwala to dokładnie dostosować, do których stron i akcji każdy administrator ma dostęp.

### Dostęp do konfiguracji uprawnień

1. Kliknij przycisk **Edytuj** przy administratorze, którego chcesz skonfigurować.
2. W oknie edycji przejdź do sekcji (lub zakładki) **Uprawnienia**.
3. Wyświetlana jest macierz uprawnień pokazująca wszystkie strony portalu.

### Struktura macierzy uprawnień

Macierz uprawnień wyświetla każdą stronę portalu jako wiersz z następującymi kontrolkami:

| Kontrolka | Opis |
|-----------|------|
| **Przełącznik dostępu** | Przełącznik włączający lub wyłączający dostęp do całej strony |
| **Wielokrotny wybór akcji** | Lista rozwijana pozwalająca wybrać, które konkretne akcje są dozwolone na tej stronie |

### Dostępne strony w macierzy

| Strona | Możliwe akcje |
|--------|---------------|
| Panel główny | Wyświetlanie |
| Użytkownicy | Wyświetlanie, Tworzenie, Edycja, Usuwanie, Zawieszanie |
| Zwierzęta | Wyświetlanie, Tworzenie, Edycja, Usuwanie |
| Karty zdrowia | Wyświetlanie, Tworzenie, Edycja, Usuwanie |
| Szczepienia | Wyświetlanie, Tworzenie, Edycja, Usuwanie |
| Hodowla | Wyświetlanie, Tworzenie, Edycja, Usuwanie |
| Opinie | Wyświetlanie, Odpowiadanie, Zamykanie, Przypinanie |
| Powiadomienia | Wyświetlanie, Wysyłanie |
| Analityka | Wyświetlanie, Eksport |
| Ustawienia | Wyświetlanie, Edycja |
| Administratorzy | Wyświetlanie, Tworzenie, Edycja, Usuwanie |

### Konfigurowanie uprawnień

1. Dla każdego wiersza strony przełącz przełącznik **Dostęp**:
   - **WŁ.** -- Administrator może uzyskać dostęp do tej strony (konkretne akcje kontrolowane poniżej).
   - **WYŁ.** -- Administrator nie może zobaczyć ani nawigować do tej strony w ogóle.
2. Dla stron z włączonym dostępem kliknij rozwijaną listę **Akcje**.
3. Wybierz konkretne akcje, które ten administrator może wykonywać:
   - Zaznacz każdą akcję, którą chcesz przyznać.
   - Odznacz akcje, które chcesz ograniczyć.
4. Powtórz dla każdej strony według potrzeb.
5. Kliknij **Zapisz zmiany**, aby zastosować konfigurację uprawnień.

### Jak uprawnienia współdziałają z rolami

- Uprawnienia roli służą jako **punkt wyjścia**.
- Uprawnienia na poziomie stron mogą **ograniczyć** dostęp poniżej poziomu podstawowego roli.
- Uprawnienia na poziomie stron **nie mogą przyznać** dostępu wykraczającego poza to, co rola pozwala.
- Na przykład: Użytkownik z rolą admin ma domyślnie dostęp do wszystkich stron treści. Możesz ograniczyć jego dostęp do strony Hodowla, wyłączając ją, ale nie możesz przyznać mu dostępu do Ustawień (zarezerwowanych dla super_admin).

> **Wskazówka:** Używaj szczegółowych uprawnień, gdy masz członków zespołu potrzebujących określonego podzbioru możliwości administracyjnych. Na przykład agent obsługi klienta może mieć rolę „admin", ale ograniczoną tylko do stron Opinie i Użytkownicy.

---

## Usuwanie administratora

Usunięcie konta administratora trwale usuwa je z systemu.

### Kroki

1. Znajdź administratora w tabeli Administratorzy.
2. Kliknij przycisk **Usuń** (ikona kosza) w kolumnie Akcje.
3. Pojawia się okno potwierdzenia z nazwą i adresem e-mail administratora.
4. Wpisz adres e-mail administratora, aby potwierdzić usunięcie (środek bezpieczeństwa).
5. Kliknij **Potwierdź usunięcie**, aby trwale usunąć konto.
6. Komunikat o sukcesie potwierdza usunięcie.
7. Administrator jest usuwany z tabeli i nie może się już zalogować.

### Ograniczenia usuwania

| Ograniczenie | Powód |
|--------------|-------|
| Nie można usunąć super_admin | Zapobiega przypadkowemu zablokowaniu systemu |
| Nie można usunąć własnego konta | Zapobiega samousiuwaniu |
| Nie można usunąć przy niewystarczającej roli | Obowiązują zasady hierarchii ról |

> **Ostrzeżenie:** Usunięcie jest trwałe i nie może być cofnięte. Jeśli musisz tymczasowo odebrać dostęp, użyj zamiast tego statusu Zawieszone.

---

## Wyjaśnienie macierzy uprawnień

System uprawnień w Petfolioo wykorzystuje podejście warstwowe:

### Warstwa 1: Kontrola dostępu oparta na rolach (RBAC)

Każda rola ma predefiniowany zestaw uprawnień, który służy jako punkt wyjścia:

```
super_admin  -->  Wszystkie strony, wszystkie akcje, bez ograniczeń
admin        -->  Wszystkie strony treści/użytkowników, wszystkie akcje (oprócz Ustawień)
moderator    -->  Strony przeglądu treści, ograniczone akcje (wyświetlanie, odpowiadanie, zamykanie)
viewer       -->  Wszystkie dostępne strony, tylko do odczytu
```

### Warstwa 2: Nadpisania na poziomie stron

Szczegółowe uprawnienia dodają drugą warstwę na RBAC:

```
Uprawnienia roli  (punkt wyjścia)
    |
    v
Przełączniki stron  (mogą ograniczać, nie mogą rozszerzać poza rolę)
    |
    v
Końcowe efektywne uprawnienia  (co administrator faktycznie widzi)
```

### Przykładowe scenariusze

**Scenariusz 1: Agent obsługi klienta**
- Rola: admin
- Nadpisanie: Wyłącz dostęp do Zwierząt, Kart zdrowia, Hodowli, Analityki, Administratorów
- Rezultat: Może uzyskać dostęp tylko do Panelu głównego, Użytkowników, Opinii i Powiadomień

**Scenariusz 2: Recenzent treści**
- Rola: moderator
- Nadpisanie: Włącz Opinie (Wyświetlanie, Odpowiadanie, Zamykanie), Użytkownicy (tylko Wyświetlanie)
- Rezultat: Może przeglądać opinie i wyszukiwać profile użytkowników, ale nie może modyfikować użytkowników

**Scenariusz 3: Obserwator analityki**
- Rola: viewer
- Nadpisanie: Włącz tylko Panel główny i Analitykę
- Rezultat: Może wyświetlać wykresy i metryki, ale nic więcej

### Wyświetlanie efektywnych uprawnień

1. Otwórz okno edycji dla dowolnego administratora.
2. Sekcja Uprawnienia pokazuje bieżący efektywny stan.
3. Przełączniki i wybory akcji odzwierciedlają to, co jest aktualnie przyznane.
4. Wyłączone (wyszarzone) akcje wskazują te wykraczające poza dozwolone przez rolę.

---

## Najlepsze praktyki bezpieczeństwa

1. **Zasada minimalnych uprawnień** -- Przypisuj minimalną rolę i uprawnienia potrzebne do funkcji zawodowej każdego administratora.
2. **Regularne audyty** -- Przeglądaj konta administratorów kwartalnie. Usuwaj konta, które nie są już potrzebne.
3. **Zawieszaj przed usunięciem** -- Przy odchodzeniu pracownika najpierw zawieś konto, aby zapewnić brak zakłóceń, a następnie usuń po okresie karencji.
4. **Ogranicz super_adminów** -- Utrzymuj minimalną liczbę kont super_admin (idealnie 1-2).
5. **Silne hasła** -- Wymuszaj złożone hasła i zalecaj menedżery haseł.
6. **Monitoruj aktywność** -- Sprawdzaj, kto się loguje i kiedy, przez logi systemowe.

---

## Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---------|-------------|
| Nie można utworzyć administratora | Zweryfikuj, czy masz wystarczające uprawnienia roli. Sprawdź, czy adres e-mail nie jest już w użyciu. |
| Nie widać przycisków Edytuj/Usuń | Twoja rola nie ma uprawnień do zarządzania administratorami na poziomie lub powyżej poziomu roli celu. |
| Administrator nie może się zalogować po utworzeniu | Zweryfikuj, czy status konta to Aktywne. Potwierdź, że hasło zostało wprowadzone poprawnie. |
| Zmiany uprawnień nie obowiązują | Administrator może potrzebować wylogowania i ponownego zalogowania, aby zmiany uprawnień zaczęły obowiązywać. |
| Nie można usunąć super_admin | Jest to celowe. Konta super_admin nie mogą być usuwane przez interfejs. |

---

## Powiązane strony

- [Ustawienia](./settings.md) -- Konfiguruj ustawienia bezpieczeństwa systemu
- [Opinie](./feedback.md) -- Zarządzaj opiniami użytkowników (wymaga dostępu do strony Opinie)
- [Analityka](./analytics.md) -- Wyświetlaj metryki platformy (wymaga dostępu do strony Analityka)

---
