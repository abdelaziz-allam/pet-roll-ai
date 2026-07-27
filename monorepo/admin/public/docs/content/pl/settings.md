# Ustawienia

Strona Ustawienia zapewnia opcje konfiguracji systemowej dla platformy Petfolioo. Ustawienia są podzielone na trzy zakładki: Ogólne, Powiadomienia i Bezpieczeństwo. Wprowadzone tutaj zmiany wpływają na działanie zarówno panelu administracyjnego, jak i aplikacji mobilnej.

![Settings](/docs/screenshots/settings.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Przegląd

Tylko administratorzy z rolą super_admin lub admin (z dostępem do strony Ustawienia) mogą przeglądać i modyfikować ustawienia. Wszystkie zmiany wymagają jawnego zapisania i zaczynają obowiązywać natychmiast po zapisaniu.

---

## Dostęp do ustawień

1. Kliknij **Ustawienia** w menu nawigacyjnym na pasku bocznym.
2. Strona Ustawienia ładuje się z trzema zakładkami u góry.
3. Domyślnie wybrana jest zakładka **Ogólne**.

---

## Zakładka Ogólne

Zakładka Ogólne zawiera podstawowe opcje konfiguracji aplikacji, które definiują sposób prezentacji i działania platformy.

### Pola

| Pole | Opis | Wartość domyślna |
|------|------|------------------|
| **Nazwa aplikacji** | Wyświetlana nazwa aplikacji pokazywana w powiadomieniach i wiadomościach e-mail | Petfolioo |
| **E-mail wsparcia** | Adres e-mail kontaktowy wyświetlany użytkownikom do zgłoszeń | -- |
| **Domyślny język** | Domyślny język dla nowych użytkowników i komunikacji systemowej | Angielski |
| **Tryb konserwacji** | Przełącznik włączający lub wyłączający tryb konserwacji | Wyłączony |

### Konfiguracja ustawień ogólnych

#### Nazwa aplikacji

1. Znajdź pole **Nazwa aplikacji**.
2. Wyczyść istniejącą wartość i wpisz żądaną nazwę aplikacji.
3. Ta nazwa pojawia się w powiadomieniach push, nagłówkach e-mail i sekcji „O aplikacji" w aplikacji mobilnej.

#### E-mail wsparcia

1. Znajdź pole **E-mail wsparcia**.
2. Wprowadź adres e-mail, na który użytkownicy powinni kierować zapytania o pomoc.
3. Ten adres jest wyświetlany na ekranie pomocy/kontaktu w aplikacji mobilnej.

> **Wskazówka:** Używaj współdzielonego adresu zespołowego (np. support@petfolioo.com) zamiast adresu osobistego, aby wielu członków zespołu mogło odpowiadać.

#### Domyślny język

1. Kliknij rozwijaną listę **Domyślny język**.
2. Wybierz język, który będzie używany domyślnie dla:
   - Tworzenia nowych kont użytkowników
   - Powiadomień generowanych przez system
   - Szablonów wiadomości e-mail
3. Użytkownicy mogą nadpisać to w swoich indywidualnych ustawieniach aplikacji mobilnej.

#### Tryb konserwacji

Tryb konserwacji to krytyczna funkcja sygnalizująca użytkownikom, że platforma jest tymczasowo niedostępna.

1. Znajdź przełącznik **Tryb konserwacji**.
2. Kliknij przełącznik, aby włączyć tryb konserwacji.
3. Pojawia się okno z ostrzeżeniem potwierdzające akcję.

**Gdy tryb konserwacji jest włączony:**

| Efekt | Opis |
|-------|------|
| Ostrzeżenie w panelu administracyjnym | Wyraźny baner pojawia się u góry panelu administracyjnego informujący o aktywnym trybie konserwacji |
| Wpływ na aplikację mobilną | Aplikacja mobilna wyświetla użytkownikom ekran konserwacji, uniemożliwiając normalne korzystanie |
| Zachowanie API | Endpointy API zwracają odpowiedzi ze statusem konserwacji |
| Dostęp administratora | Administratorzy nadal mogą normalnie korzystać z panelu administracyjnego |

4. Aby wyłączyć tryb konserwacji, kliknij przełącznik ponownie.
5. Potwierdź akcję w oknie dialogowym.
6. Platforma natychmiast wraca do normalnego działania.

> **Ostrzeżenie:** Włączenie trybu konserwacji natychmiast wpływa na wszystkich użytkowników aplikacji mobilnej. Włączaj go tylko podczas planowanych okien konserwacyjnych i komunikuj harmonogram z wyprzedzeniem za pomocą powiadomień push.

---

## Zakładka Powiadomienia

Zakładka Powiadomienia kontroluje automatyczne zachowania powiadomień -- alerty generowane przez system wysyłane do użytkowników na podstawie danych ich zwierząt.

### Pola

| Pole | Opis | Typ | Wartość domyślna |
|------|------|-----|------------------|
| **Przypomnienia o szczepieniach** | Wysyłaj automatyczne przypomnienia, gdy zbliża się termin szczepienia zwierzęcia | Przełącznik | Włączony |
| **Alerty ciążowe** | Wysyłaj alerty o kamieniach milowych ciąży i przewidywanym terminie porodu | Przełącznik | Włączony |
| **Aktualizacje krycia** | Wysyłaj aktualizacje o wydarzeniach harmonogramu krycia i potwierdzeniach | Przełącznik | Włączony |
| **Dni przed terminem** | Liczba dni przed terminem, w których ma zostać wysłane przypomnienie | Pole liczbowe | 7 |

### Konfiguracja ustawień powiadomień

#### Przypomnienia o szczepieniach

1. Znajdź przełącznik **Przypomnienia o szczepieniach**.
2. Gdy jest **włączony** (domyślnie):
   - Użytkownicy otrzymują powiadomienia push przed terminem szczepienia ich zwierzęcia.
   - Powiadomienie jest wysyłane zgodnie z ustawieniem „Dni przed terminem".
   - Przykład: Jeśli ustawiono 7 dni, użytkownicy otrzymują przypomnienie tydzień przed terminem szczepienia.
3. Gdy jest **wyłączony**:
   - Żadne automatyczne przypomnienia o szczepieniach nie są wysyłane.
   - Użytkownicy muszą ręcznie sprawdzać harmonogram szczepień swoich zwierząt.

#### Alerty ciążowe

1. Znajdź przełącznik **Alerty ciążowe**.
2. Gdy jest **włączony** (domyślnie):
   - Użytkownicy śledzący ciążę otrzymują powiadomienia o kamieniach milowych.
   - Alerty obejmują przypomnienia o przewidywanym terminie porodu i przejściach między etapami.
   - Hodowcy otrzymują dodatkowe powiadomienia o profesjonalnym śledzeniu.
3. Gdy jest **wyłączony**:
   - Żadne automatyczne alerty związane z ciążą nie są wysyłane.

#### Aktualizacje krycia

1. Znajdź przełącznik **Aktualizacje krycia**.
2. Gdy jest **włączony** (domyślnie):
   - Użytkownicy otrzymują powiadomienia o zaplanowanych wydarzeniach krycia.
   - Powiadomienia potwierdzające są wysyłane po zarejestrowaniu krycia.
   - Hodowcy otrzymują sugestie dopasowań i przypomnienia o harmonogramie.
3. Gdy jest **wyłączony**:
   - Żadne automatyczne powiadomienia związane z kryciem nie są wysyłane.

#### Dni przed terminem

1. Znajdź pole liczbowe **Dni przed terminem**.
2. Wprowadź liczbę dni przed terminem, w których mają być wysyłane przypomnienia.
3. Ta wartość dotyczy wszystkich przypomnień opartych na datach (szczepienia, wizyty).
4. Prawidłowy zakres: od 1 do 30 dni.

> **Wskazówka:** Wartość 7 dni sprawdza się u większości użytkowników. Dla hodowców zarządzających wieloma zwierzętami rozważ ustawienie 14 dni, aby dać więcej czasu na przygotowanie.

### Tabela interakcji powiadomień

| Ustawienie | Wpływa na | Wpływ na użytkownika |
|------------|-----------|----------------------|
| Przypomnienia o szczepieniach WŁ. + 7 dni | Użytkownicy ze zwierzętami z nadchodzącymi szczepieniami | „Szczepienie Rex'a przeciw wściekliźnie jest za 7 dni" |
| Alerty ciążowe WŁ. | Użytkownicy z aktywnymi rekordami ciąży | „Ciąża Luny weszła w 6. tydzień" |
| Aktualizacje krycia WŁ. | Użytkownicy z zaplanowanymi kryciami | „Spotkanie krycia z Maxem potwierdzone na piątek" |
| Wszystkie przełączniki WYŁ. | Wszyscy użytkownicy | Brak automatycznych powiadomień; tylko ręczne powiadomienia administratora |

---

## Zakładka Bezpieczeństwo

Zakładka Bezpieczeństwo zawiera ustawienia kontrolujące limity API, czas życia tokenów uwierzytelniania oraz ograniczenia przesyłania plików.

### Pola

| Pole | Opis | Typ | Wartość domyślna |
|------|------|-----|------------------|
| **Limit żądań na minutę** | Maksymalna liczba żądań API dozwolona na użytkownika na minutę | Liczba | 60 |
| **Wygaśnięcie tokenu dostępu (godziny)** | Jak długo token dostępu pozostaje ważny | Liczba | 24 |
| **Wygaśnięcie tokenu odświeżania (dni)** | Jak długo token odświeżania pozostaje ważny | Liczba | 30 |
| **Maks. rozmiar zdjęcia (MB)** | Maksymalny dozwolony rozmiar pliku dla zdjęć zwierząt | Liczba | 5 |
| **Maks. rozmiar avatara (MB)** | Maksymalny dozwolony rozmiar pliku dla avatarów użytkowników | Liczba | 2 |
| **Dozwolone typy plików** | Lista typów MIME rozdzielona przecinkami, akceptowana do przesyłania | Tekst | image/jpeg,image/png,image/webp |

### Konfiguracja ustawień bezpieczeństwa

#### Limit żądań na minutę

1. Znajdź pole **Limit żądań na minutę**.
2. Wprowadź maksymalną liczbę żądań API, jaką pojedynczy użytkownik może wykonać na minutę.
3. Żądania przekraczające ten limit otrzymują odpowiedź 429 (Too Many Requests).
4. Zalecany zakres: 30-120 w zależności od oczekiwanych wzorców użytkowania.

> **Ważne:** Ustawienie zbyt niskiej wartości może powodować nieprawidłowe działanie aplikacji mobilnej dla aktywnych użytkowników. Ustawienie zbyt wysokiej wartości może pozostawić system podatnym na nadużycia. Domyślna wartość 60 jest odpowiednia dla większości wdrożeń.

#### Wygaśnięcie tokenu dostępu (godziny)

1. Znajdź pole **Wygaśnięcie tokenu dostępu**.
2. Wprowadź liczbę godzin, przez które token dostępu pozostaje ważny po wydaniu.
3. Gdy token wygaśnie, aplikacja używa tokenu odświeżania do uzyskania nowego.
4. Krótsze wartości są bezpieczniejsze; dłuższe wartości zmniejszają tarcie przy logowaniu.

| Wartość | Bezpieczeństwo | Doświadczenie użytkownika |
|---------|----------------|---------------------------|
| 1 godzina | Wysokie | Częste ponowne uwierzytelnianie |
| 24 godziny | Średnie | Dobra równowaga (zalecane) |
| 72 godziny | Niższe | Minimalne przerywanie |

#### Wygaśnięcie tokenu odświeżania (dni)

1. Znajdź pole **Wygaśnięcie tokenu odświeżania**.
2. Wprowadź liczbę dni, przez które token odświeżania pozostaje ważny.
3. Gdy token odświeżania wygaśnie, użytkownik musi zalogować się ponownie swoimi danymi uwierzytelniającymi.
4. Zalecany zakres: 7-90 dni.

> **Wskazówka:** Dla aplikacji konsumenckiej jak Petfolioo 30 dni to dobra równowaga. Użytkownicy otwierający aplikację co najmniej raz w miesiącu nigdy nie będą musieli logować się ponownie. Dla wdrożeń wymagających wyższego bezpieczeństwa rozważ 7 dni.

#### Maks. rozmiar zdjęcia (MB)

1. Znajdź pole **Maks. rozmiar zdjęcia**.
2. Wprowadź maksymalny rozmiar pliku w megabajtach dla przesyłanych zdjęć zwierząt.
3. Zdjęcia przekraczające ten rozmiar są odrzucane z komunikatem błędu.
4. Weź pod uwagę koszty przechowywania i czasy przesyłania dla użytkowników z wolnym połączeniem.

| Wartość | Odpowiednia dla |
|---------|-----------------|
| 2 MB | Niskie zużycie pamięci, szybkie przesyłanie, niższa jakość |
| 5 MB | Zrównoważone (zalecane) |
| 10 MB | Zdjęcia wysokiej jakości, większe zużycie pamięci |

#### Maks. rozmiar avatara (MB)

1. Znajdź pole **Maks. rozmiar avatara**.
2. Wprowadź maksymalny rozmiar pliku w megabajtach dla avatarów profili użytkowników.
3. Avatary są zazwyczaj mniejsze niż zdjęcia zwierząt, ponieważ są wyświetlane w zmniejszonej rozdzielczości.
4. Zalecane: 1-3 MB.

#### Dozwolone typy plików

1. Znajdź pole **Dozwolone typy plików**.
2. Wprowadź listę typów MIME rozdzieloną przecinkami, które system akceptuje do przesyłania.
3. Każdy typ MIME powinien być w formacie `typ/podtyp`.
4. Nie dodawaj spacji między wpisami, chyba że celowo chcesz je umieścić w ciągu MIME.

**Popularne typy MIME dla przesyłania obrazów:**

| Typ MIME | Format | Uwagi |
|----------|--------|-------|
| `image/jpeg` | JPEG | Najpopularniejszy format zdjęć, dobra kompresja |
| `image/png` | PNG | Bezstratny, obsługuje przezroczystość |
| `image/webp` | WebP | Nowoczesny format, doskonała kompresja |
| `image/heic` | HEIC | Format Apple, używany przez aparaty iPhone |
| `image/gif` | GIF | Animowane obrazy, większe rozmiary plików |

**Przykładowe konfiguracje:**

```
Standardowa:  image/jpeg,image/png,image/webp
Rozszerzona:  image/jpeg,image/png,image/webp,image/heic,image/gif
Minimalna:    image/jpeg,image/png
```

> **Ostrzeżenie:** Dodanie nieobsługiwanych typów MIME może pozwolić na przesyłanie plików, których system nie jest w stanie przetworzyć. Dodawaj tylko typy obsługiwane przez pipeline przetwarzania obrazów.

---

## Zapisywanie ustawień

Wszystkie zmiany ustawień wymagają jawnej akcji zapisu.

### Kroki zapisywania

1. Wprowadź żądane zmiany w dowolnej z trzech zakładek.
2. Kliknij przycisk **Zapisz ustawienia** u dołu strony.
3. Pojawia się wskaźnik ładowania podczas stosowania zmian.
4. Powiadomienie o sukcesie potwierdza zapisanie ustawień.
5. Zmiany zaczynają obowiązywać natychmiast na całej platformie.

### Ważne uwagi dotyczące zapisywania

- Zmiany **nie** są zapisywane automatycznie. Jeśli opuścisz stronę bez zapisania, zmiany zostaną utracone.
- Możesz modyfikować ustawienia w wielu zakładkach przed zapisaniem -- wszystkie zmiany zapisywane są razem.
- Jeśli wystąpi błąd walidacji, konkretne pole jest podświetlone z komunikatem błędu.
- Tylko zmienione pola są wysyłane do serwera (optymistyczna częściowa aktualizacja).

> **Wskazówka:** Po zapisaniu zmian związanych z bezpieczeństwem (limity żądań, wygaśnięcie tokenów), monitoruj system przez krótki okres, aby upewnić się, że nie wystąpiło nieoczekiwane zachowanie.

---

## Audyt zmian ustawień

Wszystkie modyfikacje ustawień są rejestrowane w celu zapewnienia bezpieczeństwa i odpowiedzialności:

| Rejestrowane informacje | Opis |
|-------------------------|------|
| Nazwa administratora | Kto dokonał zmiany |
| Znacznik czasu | Kiedy zmiana została dokonana |
| Zmienione pole | Które ustawienie zostało zmodyfikowane |
| Poprzednia wartość | Wartość przed zmianą |
| Nowa wartość | Wartość po zmianie |

---

## Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---------|-------------|
| Brak dostępu do strony Ustawienia | Zweryfikuj, czy Twoja rola to super_admin lub admin z przyznanym uprawnieniem do strony Ustawienia. |
| Przycisk zapisu nieaktywny | Nie wprowadzono żadnych zmian. Zmodyfikuj co najmniej jedno pole, aby aktywować zapisywanie. |
| Błąd walidacji przy zapisie | Sprawdź podświetlone pole pod kątem konkretnego komunikatu błędu i popraw wartość. |
| Tryb konserwacji nie wpływa na aplikację | Poczekaj 1-2 minuty, aż zmiana rozpropaguje się do wszystkich instancji aplikacji mobilnej. |
| Limit żądań zbyt restrykcyjny | Zwiększ wartość i zapisz. Dotknięci użytkownicy zostaną odblokowani w ciągu jednej minuty. |
| Błędy przesyłania plików po zmianie typów | Upewnij się, że typy MIME są poprawnie sformatowane bez końcowych przecinków lub spacji. |

---

## Powiązane strony

- [Administratorzy](./admin-users.md) -- Zarządzaj, kto może uzyskiwać dostęp i modyfikować ustawienia
- [Powiadomienia](./notifications.md) -- Wysyłaj ręczne powiadomienia do użytkowników
- [Analityka](./analytics.md) -- Monitoruj kondycję platformy i wykorzystanie

---
