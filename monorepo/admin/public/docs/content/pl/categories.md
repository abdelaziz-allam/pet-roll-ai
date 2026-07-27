# Kategorie zwierząt

Moduł Kategorie zwierząt umożliwia administratorom definiowanie i zarządzanie systemem klasyfikacji używanym do organizacji zwierząt na platformie Petfolioo. Kategorie reprezentują gatunki lub typy zwierząt i są wykorzystywane w całej aplikacji do filtrowania, wyszukiwania i organizacji. Każda kategoria zawiera nazwę, etykietę, ikonę emoji, opis i status aktywności.

![Pet Categories](/docs/screenshots/categories.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Lista kategorii

Strona kategorii wyświetla wszystkie zdefiniowane kategorie zwierząt w formacie tabeli z kontrolkami zarządzania.

### Kolumny tabeli

| Kolumna | Opis | Sortowalna |
|---------|------|:----------:|
| Slug nazwy | Identyfikator maszynowy (np. `dog`, `cat`, `bird`) | Tak |
| Etykieta | Czytelna nazwa wyświetlana (np. „Pies", „Kot", „Ptak") | Tak |
| Ikona emoji | Ikona wizualna reprezentująca kategorię | Nie |
| Opis | Krótki opis tego, co kategoria obejmuje | Nie |
| Aktywna | Przełącznik pokazujący, czy kategoria jest aktywna | Tak |
| Akcje | Przyciski Edytuj i Usuń | Nie |

### Wskaźniki statusu

| Stan aktywności | Wygląd | Znaczenie |
|-----------------|--------|-----------|
| Aktywna | Zielony przełącznik (pozycja włączona) | Kategoria jest dostępna do rejestracji zwierząt i widoczna w filtrach |
| Nieaktywna | Szary przełącznik (pozycja wyłączona) | Kategoria jest ukryta przed użytkownikami, ale istniejące zwierzęta zachowują swoją kategorię |

### Funkcje tabeli

1. **Sortowanie** przez kliknięcie nagłówków kolumn Slug nazwy, Etykieta lub Aktywna.
2. **Szybkie przełączanie** przez kliknięcie przełącznika Aktywna bezpośrednio w wierszu tabeli.
3. **Akcje w wierszu** za pomocą przycisków Edytuj (ikona ołówka) i Usuń (ikona kosza) w każdym wierszu.
4. **Paginacja** na dole do przeglądania, gdy istnieje wiele kategorii.

> **Wskazówka:** Nieaktywne kategorie są wyświetlane z lekko przyciemnionym stylem wiersza, aby wizualnie odróżnić je od aktywnych.

---

## Tworzenie kategorii

Nowe kategorie mogą być tworzone w celu obsługi dodatkowych gatunków lub typów zwierząt na platformie.

### Kroki tworzenia kategorii

1. Kliknij przycisk **Dodaj kategorię** w prawym górnym rogu strony Kategorie.
2. Pojawia się formularz tworzenia (jako modal lub formularz w wierszu).
3. Wypełnij wymagane pola:

| Pole | Wymagane | Opis | Przykład |
|------|:--------:|------|---------|
| Slug nazwy | Tak | Identyfikator maszynowy | `golden_fish` |
| Etykieta | Tak | Nazwa wyświetlana użytkownikom | „Złota rybka" |
| Ikona emoji | Tak | Ikona wizualna kategorii | „fish" |
| Opis | Nie | Krótkie wyjaśnienie kategorii | „Ryby słodkowodne i morskie" |
| Aktywna | Nie | Czy aktywować natychmiast (domyślnie aktywna) | Włączona |

4. Wybierz ikonę emoji z **Selektora emoji** (patrz poniżej).
5. Przejrzyj swoje wpisy.
6. Kliknij **Utwórz kategorię**, aby zapisać.
7. Nowa kategoria pojawia się w tabeli.

### Konwencja slug nazwy

Slug nazwy musi spełniać następujące zasady:

| Zasada | Opis | Przykład |
|--------|------|---------|
| Tylko małe litery | Wielkie litery niedozwolone | `dog` nie `Dog` |
| Podkreślenia zamiast spacji | Używaj podkreśleń do oddzielania słów | `guinea_pig` nie `guinea pig` |
| Alfanumeryczne + podkreślenie | Tylko litery, cyfry i podkreślenia | `cat_1` jest prawidłowe, `cat-1` nie |
| Unikalny | Nie może powielać istniejącego slug kategorii | System odrzuci duplikaty |
| Bez wiodących/końcowych podkreśleń | Nie może zaczynać się ani kończyć podkreśleniem | `_dog_` jest nieprawidłowe |
| Maksymalnie 50 znaków | Utrzymuj slug zwięzłym | Krótkie, opisowe identyfikatory |

> **Ważne:** Slug nazwy nie może być zmieniony po utworzeniu. Jest używany jako trwały identyfikator w bazie danych i API. Wybieraj ostrożnie.

### Selektor emoji

Selektor emoji oferuje ponad 100 ikon zwierząt i natury do identyfikacji kategorii.

| Funkcja | Opis |
|---------|------|
| Wyszukiwanie | Wpisz, aby filtrować dostępne emoji po słowie kluczowym |
| Kategorie | Emoji zorganizowane według grup (Zwierzęta, Natura, Obiekty) |
| Podgląd | Wybrane emoji wyświetlane w dużym podglądzie przed potwierdzeniem |
| Ostatnie | Wcześniej używane emoji wyświetlane u góry dla szybkiego dostępu |

**Korzystanie z selektora emoji:**

1. Kliknij **pole ikony emoji**, aby otworzyć selektor.
2. Przeglądaj kategorie lub wpisz słowo kluczowe w wyszukiwarkę (np. „dog", „fish", „bird").
3. Kliknij żądane emoji, aby je wybrać.
4. Wybrane emoji pojawia się w polu formularza jako podgląd.
5. Aby zmienić wybór, kliknij pole ponownie, aby otworzyć selektor.

Dostępne kategorie emoji obejmują:

| Grupa | Przykładowe emoji |
|-------|-------------------|
| Zwierzęta domowe | Pies, Kot, Chomik, Królik, Mysz |
| Zwierzęta gospodarskie | Koń, Krowa, Świnia, Owca, Koza, Kurczak |
| Ptaki | Papuga, Orzeł, Sowa, Kaczka, Flaming, Paw |
| Gady | Jaszczurka, Wąż, Żółw, Krokodyl, Dinozaur |
| Wodne | Ryba, Ryba tropikalna, Wieloryb, Delfin, Ośmiornica, Rekin |
| Owady | Motyl, Pszczoła, Chrząszcz, Mrówka, Świerszcz |
| Dzikie zwierzęta | Lew, Tygrys, Niedźwiedź, Małpa, Słoń, Żyrafa |
| Łapa/Ogólne | Odciski łap, Kość, Serce, Gwiazda |

---

## Edycja kategorii

Istniejące kategorie mogą być modyfikowane w celu aktualizacji etykiety, ikony, opisu lub statusu aktywności.

### Kroki edycji kategorii

1. Znajdź kategorię, którą chcesz edytować, w tabeli.
2. Kliknij przycisk **Edytuj** (ikona ołówka) w kolumnie Akcje danego wiersza.
3. Pojawia się formularz edycji wstępnie wypełniony bieżącymi wartościami.
4. Zmodyfikuj dowolne z edytowalnych pól:

| Pole | Edytowalne | Uwagi |
|------|:----------:|-------|
| Slug nazwy | Nie | Nie można zmienić po utworzeniu |
| Etykieta | Tak | Aktualizuj wyświetlaną nazwę |
| Ikona emoji | Tak | Wybierz nowe emoji z selektora |
| Opis | Tak | Aktualizuj lub dodaj opis |
| Aktywna | Tak | Przełącz status aktywna/nieaktywna |

5. Wprowadź zmiany.
6. Kliknij **Zapisz zmiany**, aby zastosować.
7. Powiadomienie o sukcesie potwierdza aktualizację.
8. Tabela natychmiast odzwierciedla zmiany.

### Uwagi dotyczące edycji

| Kwestia | Szczegóły |
|---------|-----------|
| Zmiany etykiety | Natychmiast odzwierciedlone w aplikacji dla wszystkich użytkowników |
| Zmiany emoji | Zaktualizowane we wszystkich lokalizacjach UI, gdzie pojawia się kategoria |
| Zmiany opisu | Widoczne na ekranach wyboru kategorii w aplikacji |
| Istniejące zwierzęta | Zwierzęta już przypisane do tej kategorii nie są dotknięte edycjami |

> **Uwaga:** Zmiana etykiety kategorii nie zmienia jej slug. Slug pozostaje trwałym identyfikatorem. Użytkownicy i zwierzęta odwołują się do kategorii wewnętrznie przez slug.

---

## Aktywacja i dezaktywacja kategorii

Kategorie mogą być przełączane między stanami aktywna i nieaktywna bez usuwania.

### Aktywacja kategorii

1. Znajdź nieaktywną kategorię w tabeli (wyświetlana z szarym przełącznikiem).
2. Kliknij **przełącznik** w kolumnie Aktywna, aby przełączyć go na pozycję włączoną.
3. Alternatywnie kliknij Edytuj i przełącz pole Aktywna w formularzu edycji.
4. Potwierdź akcję, jeśli zostaniesz o to poproszony.
5. Kategoria staje się natychmiast dostępna do rejestracji zwierząt.

### Dezaktywacja kategorii

1. Znajdź aktywną kategorię w tabeli (wyświetlana z zielonym przełącznikiem).
2. Kliknij **przełącznik**, aby przełączyć go na pozycję wyłączoną.
3. Pojawia się okno potwierdzenia wyjaśniające wpływ.
4. Kliknij **Potwierdź dezaktywację**.
5. Kategoria jest ukryta przed rejestracją nowych zwierząt.

### Wpływ dezaktywacji

| Obszar wpływu | Efekt |
|---------------|-------|
| Nowe rejestracje | Kategoria nie pojawia się już w rozwijanych listach wyboru gatunku |
| Istniejące zwierzęta | Zwierzęta już przypisane do tej kategorii zachowują swoje przypisanie |
| Filtry | Kategoria nie pojawia się już w rozwijanych listach filtrów dla publicznych użytkowników |
| Panel administracyjny | Kategoria nadal widoczna w panelu z nieaktywnym stylem |
| Odpowiedzi API | Kategoria wykluczona z list aktywnych kategorii |
| Reaktywacja | Może być ponownie włączona w dowolnym momencie, przywracając pełną funkcjonalność |

> **Wskazówka:** Dezaktywacja jest preferowana nad usunięciem, gdy chcesz tymczasowo ukryć kategorię lub gdy istniejące zwierzęta nadal jej używają. Zachowuje integralność danych, ograniczając jednocześnie nowe użycie.

---

## Przycisk domyślnych wartości początkowych

Funkcja domyślnych wartości początkowych wypełnia tabelę kategorii predefiniowanym zestawem popularnych kategorii zwierząt. Jest to przydatne przy początkowej konfiguracji platformy lub przywracaniu standardowych kategorii.

### Korzystanie z domyślnych wartości początkowych

1. Kliknij przycisk **Domyślne wartości** znajdujący się nad lub pod tabelą kategorii.
2. Pojawia się modal potwierdzenia z listą kategorii, które zostaną utworzone.
3. Przejrzyj listę domyślnych kategorii.
4. Kliknij **Potwierdź**, aby kontynuować.
5. Domyślne kategorie są tworzone i pojawiają się w tabeli.

### Domyślny zestaw kategorii

Funkcja tworzy następujące standardowe kategorie (jeśli jeszcze nie istnieją):

| Slug nazwy | Etykieta | Emoji | Opis |
|------------|----------|:-----:|------|
| `dog` | Pies | Twarz psa | Psy domowe wszystkich ras |
| `cat` | Kot | Twarz kota | Koty domowe wszystkich ras |
| `bird` | Ptak | Ptak | Ptaki domowe w tym papugi, kanarki i zięby |
| `rabbit` | Królik | Twarz królika | Króliki domowe |
| `hamster` | Chomik | Twarz chomika | Chomiki, myszoskoczki i podobne małe gryzonie |
| `fish` | Ryba | Ryba | Ryby akwariowe słodkowodne i morskie |
| `turtle` | Żółw | Żółw | Żółwie wodne i lądowe |
| `snake` | Wąż | Wąż | Niejadowite węże domowe |
| `lizard` | Jaszczurka | Jaszczurka | Gekony, iguany i inne jaszczurki domowe |
| `horse` | Koń | Twarz konia | Konie i kucyki |
| `guinea_pig` | Świnka morska | Świnka morska | Świnki morskie i kawie |
| `ferret` | Fretka | Fretka | Fretki domowe |

### Zachowanie funkcji

| Scenariusz | Zachowanie |
|------------|-----------|
| Pusta tabela | Wszystkie domyślne wartości utworzone |
| Niektóre domyślne istnieją | Tylko brakujące wartości domyślne są tworzone (bez duplikatów) |
| Wszystkie domyślne istnieją | Brak zmian, wyświetlany komunikat potwierdzający |
| Istnieją własne kategorie | Własne kategorie nie są modyfikowane |

> **Uwaga:** Przycisk domyślnych wartości nie usuwa ani nie modyfikuje istniejących kategorii. Dodaje jedynie brakujące domyślne wpisy. Twoje własne kategorie są bezpieczne.

---

## Usuwanie kategorii

Kategorie mogą być trwale usuwane, gdy nie są już potrzebne. Ta akcja wymaga starannego rozważenia ze względu na jej wpływ na istniejące dane.

### Kroki usuwania kategorii

1. Znajdź kategorię w tabeli.
2. Kliknij przycisk **Usuń** (ikona kosza) w kolumnie Akcje danego wiersza.
3. Pojawia się modal ostrzeżenia z:
   - Nazwą kategorii i bieżącą liczbą zwierząt używających tej kategorii
   - Ostrzeżeniem o wpływie na istniejące zwierzęta
   - Polem potwierdzenia tekstowego (wpisz slug kategorii, aby potwierdzić)
4. Przeczytaj ostrzeżenie uważnie.
5. Wpisz **slug nazwy** kategorii w polu potwierdzenia.
6. Kliknij **Usuń kategorię**, aby trwale ją usunąć.

### Wpływ usunięcia

| Obszar wpływu | Efekt |
|---------------|-------|
| Rekord kategorii | Trwale usunięty z bazy danych |
| Istniejące zwierzęta | Zwierzęta wcześniej w tej kategorii stają się **nieskategoryzowane** |
| Profile zwierząt | Pole gatunku wyświetla „Nieskategoryzowane" lub puste |
| Filtry | Kategoria jest usuwana ze wszystkich rozwijanych list filtrów |
| Analityka | Dane historyczne mogą wyświetlać „Nieznana kategoria" dla wcześniejszych rekordów |
| Odwracalność | Nie można cofnąć (trzeba ręcznie odtworzyć w razie potrzeby) |

### Zwierzęta stają się nieskategoryzowane

Gdy kategoria jest usuwana:

1. Wszystkie zwierzęta przypisane do tej kategorii tracą swoje przypisanie.
2. Te zwierzęta pojawiają się z etykietą „Nieskategoryzowane" w Rejestrze zwierząt.
3. Właściciele zwierząt **nie** są automatycznie powiadamiani.
4. Administratorzy mogą ponownie przypisać nieskategoryzowane zwierzęta do innej kategorii poprzez edycję zbiorczą.
5. Liczba zwierząt dla usuwanej kategorii jest wyświetlana w modalu potwierdzenia usunięcia.

> **Ważne:** Usunięcie kategorii z aktywnymi przypisanymi zwierzętami spowoduje, że te zwierzęta staną się nieskategoryzowane. Rozważ dezaktywację kategorii zamiast usuwania lub ponowne przypisanie zwierząt przed usunięciem.

### Ograniczenia usuwania

| Ograniczenie | Opis |
|--------------|------|
| Domyślne kategorie | Domyślne kategorie mogą być usuwane (można je ponownie utworzyć) |
| Aktywne zwierzęta | Kategorie ze zwierzętami mogą być usuwane (zwierzęta stają się nieskategoryzowane) |
| Wymagane potwierdzenie | Slug musi zostać wpisany, aby potwierdzić usunięcie |
| Wymóg roli | Tylko role `super_admin` i `admin` mogą usuwać kategorie |

---

## Najlepsze praktyki

### Wytyczne zarządzania kategoriami

1. **Używaj jasnych, prostych etykiet** -- Etykiety kategorii powinny być natychmiast zrozumiałe dla wszystkich użytkowników, niezależnie od znajomości języka.
2. **Wybieraj reprezentatywne emoji** -- Wybieraj emoji, które jasno reprezentują typ zwierzęcia, aby ułatwić szybkie rozpoznanie wizualne.
3. **Pisz pomocne opisy** -- Opisy pomagają użytkownikom wybrać prawidłową kategorię podczas rejestracji zwierzęcia.
4. **Dezaktywuj przed usunięciem** -- Jeśli nie jesteś pewien, czy kategoria jest potrzebna, najpierw ją dezaktywuj. Usuwaj tylko gdy jesteś pewien.
5. **Utrzymuj opisy slug** -- Ponieważ slug nie mogą być zmieniane, wybieraj je starannie podczas tworzenia.
6. **Monitoruj nieskategoryzowane zwierzęta** -- Regularnie sprawdzaj zwierzęta bez kategorii i przypisuj je odpowiednio.

### Przykłady nazewnictwa kategorii

| Dobre | Złe | Dlaczego |
|-------|-----|----------|
| `guinea_pig` | `gp` | Opisowe i czytelne |
| `tropical_fish` | `tropicalFish` | Zgodne z konwencją podkreśleń |
| `parrot` | `Parrot_1` | Małe litery, bez zbędnych cyfr |
| `persian_cat` | `cat_breed_persian` | Zwięzłe, na poziomie rasy gdy potrzeba |

---

## Często zadawane pytania

**P: Czy mogę połączyć dwie kategorie?**
O: Nie ma wbudowanej funkcji łączenia. Aby skonsolidować kategorie, przypisz ponownie zwierzęta z jednej kategorii do drugiej, a następnie usuń pustą kategorię.

**P: Co się dzieje z filtrami, gdy dezaktywuję kategorię?**
O: Kategoria jest usuwana z rozwijanych list filtrów widocznych dla użytkowników, ale pozostaje dostępna w filtrach panelu administracyjnego do celów zarządzania.

**P: Czy mogę zmienić kolejność kategorii?**
O: Kategorie są wyświetlane alfabetycznie według etykiety w interfejsach widocznych dla użytkowników. Tabela w panelu administracyjnym może być sortowana po dowolnym nagłówku kolumny.

**P: Czy istnieje limit liczby kategorii, które mogę utworzyć?**
O: Nie ma twardego limitu technicznego, ale dla użyteczności utrzymuj łączną liczbę na rozsądnym poziomie (zalecane poniżej 30), aby użytkownicy mogli łatwo znaleźć prawidłową kategorię.

---

*Poprzednia: [Użytkownicy aplikacji](./users.md)*

---
