# Blog CMS

Moduł Blog CMS umożliwia administratorom tworzenie, edycję, publikowanie i zarządzanie wpisami na blogu wyświetlanymi na publicznej stronie internetowej Petfolioo. Używaj tego narzędzia do dzielenia się poradami dotyczącymi opieki nad zwierzętami, wiadomościami o platformie, wyróżnieniami hodowców oraz treściami edukacyjnymi ze swoją społecznością.

![Blog CMS](/docs/screenshots/blog.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabela wpisów na blogu

Główny widok wyświetla wszystkie wpisy na blogu w tabeli z wyszukiwaniem i sortowaniem.

| Kolumna | Opis |
|--------|-------------|
| Tytuł | Tytuł wpisu z klikalnym linkiem do edycji |
| Status | Znacznik statusu publikacji |
| Autor | Imię administratora, który utworzył wpis |
| Wyświetlenia | Łączna liczba odsłon od publikacji |
| Data | Data utworzenia (lub data publikacji, jeśli opublikowany) |

### Znaczniki statusu

| Status | Kolor znacznika | Opis |
|--------|-------------|-------------|
| Szkic | Szary | Wpis jest zapisany, ale niewidoczny publicznie |
| Opublikowany | Zielony | Wpis jest aktywny i widoczny na stronie |
| Wyróżniony | Złoty | Wpis jest opublikowany i przypięty na górze |

### Akcje w tabeli

- Kliknij tytuł wpisu, aby otworzyć go do edycji.
- Użyj menu akcji (trzy kropki) w każdym wierszu dla szybkich akcji: Opublikuj, Cofnij publikację, Przypnij, Odepnij, Usuń.
- Sortuj według dowolnej kolumny, klikając nagłówek kolumny.
- Użyj paska wyszukiwania, aby filtrować wpisy po tytule lub słowach kluczowych w treści.

> **Wskazówka:** Sortuj według Wyświetleń malejąco, aby zidentyfikować najpopularniejsze treści. Wykorzystaj te informacje do planowania przyszłych wpisów na podobne tematy.

---

## Tworzenie wpisu

Aby utworzyć nowy wpis na blogu:

1. Kliknij przycisk **Utwórz wpis** w prawym górnym rogu tabeli wpisów na blogu.
2. Otworzy się edytor wpisów z następującymi polami.

### Tytuł

- Wprowadź tytuł wpisu w polu tytułu u góry.
- Maksymalnie 200 znaków.
- Tytuł pojawia się jako główny nagłówek na opublikowanej stronie.
- Wybieraj opisowe, angażujące tytuły zawierające odpowiednie słowa kluczowe.

### Slug

- URL slug jest generowany automatycznie na podstawie tytułu.
- Format: małe litery, myślniki zamiast spacji, znaki specjalne usunięte.
- Przykład: "10 najlepszych porad dla nowych właścicieli szczeniąt" staje się `10-najlepszych-porad-dla-nowych-wlascicieli-szczeniat`.
- Możesz ręcznie edytować slug, jeśli automatycznie wygenerowana wersja jest za długa lub niejasna.
- Slug musi być unikalny wśród wszystkich wpisów.

> **Wskazówka:** Utrzymuj slug krótki i bogaty w słowa kluczowe dla lepszego SEO. Ręcznie skracaj automatycznie wygenerowane slug, które przekraczają 5-6 słów.

### Treść HTML

- Główny obszar treści akceptuje HTML dla bogatego formatowania.
- Użyj paska narzędzi edytora tekstu sformatowanego dla typowego formatowania:
  - Pogrubienie, kursywa, podkreślenie
  - Nagłówki (H2, H3, H4)
  - Listy numerowane i punktowane
  - Linki
  - Obrazy (inline)
  - Cytaty blokowe
  - Bloki kodu
- Przełącz na **Tryb źródłowy**, aby edytować bezpośrednio surowy HTML.
- Treść obsługuje wszystkie standardowe tagi HTML.

#### Najlepsze praktyki dotyczące treści

| Rób | Nie rób |
|----|--------|
| Używaj H2 dla głównych sekcji, H3 dla podsekcji | Nie używaj H1 (zarezerwowane dla tytułu) |
| Dodawaj obrazy, aby przerywać długi tekst | Nie publikuj ścian niesformatowanego tekstu |
| Pisz krótkie akapity (3-4 zdania) | Nie pisz akapitów dłuższych niż 5 zdań |
| Używaj list dla wielu powiązanych elementów | Nie osadzaj zewnętrznych skryptów ani iframe |
| Dodawaj tekst alternatywny do wszystkich obrazów | Nie używaj stylów inline dla kolorów |

### Zajawka

- Napisz krótkie podsumowanie wpisu (maksymalnie 500 znaków).
- Zajawka pojawia się na stronach z listą bloga, w wynikach wyszukiwania i podglądach w mediach społecznościowych.
- Jeśli pozostawisz puste, automatycznie zostanie użyte pierwszych 500 znaków treści.
- Licznik znaków pokazuje pozostałe znaki podczas pisania.

> **Wskazówka:** Napisz zajawkę jako przekonującą zapowiedź, która zachęci czytelników do kliknięcia. Powinna stanowić samodzielną, kompletną myśl, a nie urywać się w połowie zdania.

### Przesyłanie obrazu okładki

1. Kliknij obszar **Prześlij obraz okładki** lub przeciągnij i upuść plik obrazu.
2. Obsługiwane formaty: JPEG, PNG, WebP.
3. Zalecane wymiary: 1200 x 630 pikseli (zoptymalizowane do udostępniania w mediach społecznościowych).
4. Maksymalny rozmiar pliku: 5 MB.
5. Po przesłaniu wyświetla się podgląd obrazu.
6. Kliknij **Usuń**, aby usunąć aktualny obraz okładki i przesłać inny.

#### Wytyczne dotyczące obrazu okładki

- Używaj wysokiej jakości, trafnych obrazów reprezentujących treść wpisu.
- Unikaj nakładek tekstowych na obrazach okładki (mogą być przycinane na różnych urządzeniach).
- Upewnij się, że masz prawa do użycia obrazu (oryginalne zdjęcia lub odpowiednio licencjonowane zdjęcia stockowe).
- Obrazy są automatycznie optymalizowane do wyświetlania w sieci po przesłaniu.

### Tagi

- Wprowadź tagi jako wartości oddzielone przecinkami w polu tagów.
- Przykład: `opieka nad szczeniętami, szkolenie, żywienie, nowi właściciele`
- Tagi pomagają kategoryzować wpisy i poprawiają ich wykrywalność.
- Istniejące tagi podpowiadają się automatycznie podczas pisania.
- Nie ma limitu liczby tagów, ale zaleca się 3-7 tagów na wpis.

> **Wskazówka:** Używaj spójnego nazewnictwa tagów w różnych wpisach. Sprawdź istniejące tagi przed tworzeniem nowych wariantów (np. używaj konsekwentnie "opieka nad szczeniętami" zamiast naprzemiennego "opieka-nad-szczeniętami" lub "Opieka Nad Szczeniętami").

### Ustawienia SEO

Sekcja SEO pozwala zoptymalizować wygląd wpisu w wyszukiwarkach.

#### Meta Title

- Maksymalnie 60 znaków.
- Pojawia się jako klikalny nagłówek w wynikach wyszukiwania.
- Jeśli pozostawisz puste, zostanie użyty tytuł wpisu.
- Licznik znaków zmienia kolor na czerwony przy zbliżaniu się lub przekroczeniu 60 znaków.
- Najlepsza praktyka: Umieść główne słowo kluczowe blisko początku.

#### Meta Description

- Maksymalnie 160 znaków.
- Pojawia się jako fragment opisu poniżej tytułu w wynikach wyszukiwania.
- Jeśli pozostawisz puste, zostanie użyta zajawka.
- Licznik znaków zmienia kolor na czerwony przy zbliżaniu się lub przekroczeniu 160 znaków.
- Najlepsza praktyka: Dołącz wezwanie do działania i główne słowo kluczowe.

#### Podgląd SEO

Poniżej pól meta wyświetlany jest podgląd pokazujący, jak wpis pojawi się w wynikach wyszukiwania Google:

```
+--------------------------------------------------+
| Meta Title (lub Tytuł wpisu jeśli puste)         |
| https://petfolioo.com/blog/twoj-slug-tutaj       |
| Meta Description (lub Zajawka jeśli puste)       |
| pojawia się tutaj jak w wynikach wyszukiwania... |
+--------------------------------------------------+
```

> **Wskazówka:** Zawsze wypełniaj ręcznie zarówno meta title, jak i meta description. Automatycznie generowane wartości z tytułu i zajawki mogą nie być zoptymalizowane pod kątem intencji wyszukiwania.

### Zapisywanie szkicu

1. Po wypełnieniu żądanych pól kliknij **Zapisz szkic**.
2. Wpis zostanie zapisany ze statusem Szkic.
3. Możesz wrócić do jego edycji w dowolnym momencie z tabeli wpisów na blogu.
4. Szkice nie są widoczne publicznie.

---

## Publikowanie wpisu

Aby opublikować szkic wpisu i uczynić go widocznym na stronie:

1. Otwórz wpis z tabeli wpisów na blogu.
2. Przejrzyj całą treść, obrazy i ustawienia SEO.
3. Kliknij przycisk **Opublikuj** w prawym górnym rogu.
4. W oknie potwierdzenia:
   - Sprawdź tytuł wpisu i slug.
   - Potwierdź publikację.
5. Kliknij **Potwierdź publikację**.

### Co dzieje się po publikacji

- Status wpisu zmienia się na **Opublikowany**.
- Wpis staje się natychmiast widoczny na publicznej stronie bloga.
- Data publikacji jest zapisywana (używana do sortowania na blogu).
- URL wpisu staje się aktywny: `https://petfolioo.com/blog/[slug]`.
- Wyszukiwarki mogą teraz indeksować wpis.

### Lista kontrolna przed publikacją

Przed publikacją zweryfikuj:

- [ ] Tytuł jest jasny, angażujący i wolny od literówek
- [ ] Treść jest kompletna i prawidłowo sformatowana
- [ ] Wszystkie obrazy ładują się poprawnie
- [ ] Linki działają i otwierają się w odpowiednich kartach
- [ ] Obraz okładki jest przesłany i wygląda dobrze
- [ ] Zajawka jest napisana i ma mniej niż 500 znaków
- [ ] Tagi są dodane i prawidłowo sformatowane
- [ ] Meta title ma mniej niż 60 znaków
- [ ] Meta description ma mniej niż 160 znaków
- [ ] Slug jest czysty i bogaty w słowa kluczowe

---

## Cofanie publikacji wpisu

Aby usunąć opublikowany wpis z publicznej strony:

1. Znajdź wpis w tabeli wpisów na blogu.
2. Kliknij menu akcji (trzy kropki) w wierszu.
3. Wybierz **Cofnij publikację**.
4. Potwierdź akcję w oknie dialogowym.

### Co dzieje się po cofnięciu publikacji

- Status wpisu zmienia się z powrotem na **Szkic**.
- Wpis jest natychmiast usuwany z publicznej strony bloga.
- URL zwraca stronę 404.
- Liczba wyświetleń jest zachowana.
- Możesz ponownie opublikować wpis w dowolnym momencie.

> **Wskazówka:** Cofnij publikację zamiast usuwać, jeśli chcesz tymczasowo usunąć treść. Nieopublikowane wpisy zachowują wszystkie dane i mogą być natychmiast przywrócone.

---

## Przypinanie/Odpinanie jako wyróżniony

Wyróżnione wpisy pojawiają się prominentnie na górze strony bloga, powyżej chronologicznych listingów.

### Przypinanie wpisu

1. Znajdź opublikowany wpis w tabeli wpisów na blogu.
2. Kliknij menu akcji (trzy kropki).
3. Wybierz **Przypnij jako wyróżniony**.
4. Znacznik statusu zmieni się na **Wyróżniony** (złoty).

### Odpinanie wpisu

1. Znajdź wyróżniony wpis w tabeli.
2. Kliknij menu akcji (trzy kropki).
3. Wybierz **Odepnij**.
4. Status wraca do **Opublikowany** (zielony).

### Zasady wyróżnionych wpisów

- Tylko opublikowane wpisy mogą być przypięte.
- Wiele wpisów może być wyróżnionych jednocześnie.
- Wyróżnione wpisy wyświetlają się w kolejności ich przypięcia (najnowsze przypięcie jako pierwsze).
- Odpięcie wpisu nie cofa jego publikacji; pozostaje opublikowany.

> **Wskazówka:** Ogranicz wyróżnione wpisy do 2-3 jednocześnie. Zbyt wiele wyróżnionych wpisów rozmywa podkreślenie i spycha regularne treści poniżej widocznego obszaru.

---

## Wyświetl na stronie

Aby sprawdzić, jak opublikowany wpis wygląda na publicznej stronie:

1. Otwórz wpis z tabeli wpisów na blogu.
2. Kliknij link **Wyświetl na stronie** w prawym górnym rogu (obok przycisku Opublikuj).
3. Otworzy się nowa karta przeglądarki pokazująca wpis na żywo na stronie.

### Uwagi

- Link Wyświetl na stronie jest dostępny tylko dla wpisów Opublikowanych i Wyróżnionych.
- Szkicowych wpisów nie można podglądać na żywo.
- Link otwiera aktualną wersję na żywo; niezapisane zmiany w edytorze nie są odzwierciedlone.

> **Wskazówka:** Zawsze wyświetlaj na stronie po publikacji, aby zweryfikować, czy formatowanie, obrazy i układ wyglądają prawidłowo w publicznym motywie.

---

## Usuwanie wpisu

Aby trwale usunąć wpis na blogu:

1. Znajdź wpis w tabeli wpisów na blogu.
2. Kliknij menu akcji (trzy kropki).
3. Wybierz **Usuń**.
4. Pojawi się okno potwierdzenia:
   - Pokazuje tytuł wpisu.
   - Ostrzega, że usunięcie jest trwałe.
   - Prosi o wpisanie tytułu wpisu w celu potwierdzenia (dla opublikowanych wpisów).
5. Kliknij **Potwierdź usunięcie**.

### Co dzieje się po usunięciu

- Wpis jest trwale usuwany z systemu.
- URL zwraca stronę 404.
- Wpisu nie można odzyskać po usunięciu.
- Statystyki wyświetleń są tracone.
- Slug staje się dostępny do ponownego użycia.

### Kiedy usunąć, a kiedy cofnąć publikację

| Scenariusz | Działanie |
|----------|--------|
| Tymczasowe usunięcie treści | Cofnij publikację |
| Nieaktualna treść, która może być później zaktualizowana | Cofnij publikację |
| Wpisy testowe lub przypadkowe duplikaty | Usuń |
| Treść, która nigdy nie powinna była zostać utworzona | Usuń |
| Treść problematyczna prawnie | Usuń |

> **Wskazówka:** Usunięcie jest nieodwracalne. W razie wątpliwości cofnij publikację. Nieopublikowany wpis zawsze można usunąć później, ale usuniętego wpisu nie można odzyskać.

---

## Przesyłanie obrazów dla zdjęć okładkowych

Komponent przesyłania obrazu okładki obsługuje następujący przepływ pracy:

### Metody przesyłania

1. **Kliknij, aby przesłać:** Kliknij obszar przesyłania, aby otworzyć przeglądarkę plików.
2. **Przeciągnij i upuść:** Przeciągnij plik obrazu z pulpitu bezpośrednio na obszar przesyłania.

### Proces przesyłania

1. Wybierz lub upuść plik obrazu.
2. Pojawi się pasek postępu przesyłania.
3. Po zakończeniu podgląd obrazu wyświetli się w obszarze przesyłania.
4. URL obrazu jest automatycznie zapisywany z wpisem.

### Wymagania dotyczące obrazów

| Wymaganie | Wartość |
|-------------|-------|
| Formaty | JPEG, PNG, WebP |
| Minimalne wymiary | 600 x 315 pikseli |
| Zalecane wymiary | 1200 x 630 pikseli |
| Maksymalny rozmiar pliku | 5 MB |
| Proporcje | 1.91:1 zalecane (zoptymalizowane do mediów społecznościowych) |

### Zarządzanie przesłanymi obrazami

- **Zamień:** Kliknij przycisk **Usuń** poniżej podglądu, a następnie prześlij nowy obraz.
- **Podgląd:** Kliknij podgląd obrazu, aby zobaczyć go w pełnym rozmiarze.
- **Tekst alternatywny:** Wprowadź opisowy tekst alternatywny w polu poniżej obrazu (ważne dla dostępności i SEO).

### Optymalizacja obrazów

Przesłane obrazy są automatycznie:

- Kompresowane do wyświetlania w sieci (zachowując jakość).
- Serwowane przez CDN dla szybkiego ładowania.
- Konwertowane do formatu WebP dla przeglądarek, które go obsługują.
- Zmieniane do wielu wymiarów dla responsywnego wyświetlania.

> **Wskazówka:** Przygotuj obrazy okładki w wymiarach 1200 x 630 pikseli przed przesłaniem. To optymalny rozmiar zarówno do wyświetlania na blogu, jak i udostępniania w mediach społecznościowych (Open Graph).

---

## Najczęściej zadawane pytania

**P: Czy wielu administratorów może edytować ten sam wpis?**
O: Tak, ale nie ma współpracy w czasie rzeczywistym. Ostatnia osoba, która zapisze, nadpisuje poprzednie zmiany. Koordynuj się z zespołem, aby uniknąć konfliktów.

**P: Czy istnieje historia wersji?**
O: Nie. Każdy zapis nadpisuje poprzednią wersję. Skopiuj ważną treść w inne miejsce przed wprowadzaniem istotnych zmian.

**P: Czy mogę zaplanować publikację wpisu na przyszłą datę?**
O: Obecnie nie. Wpisy są albo szkicami, albo natychmiast publikowane. Zapisz jako szkic i opublikuj ręcznie w żądanym czasie.

**P: Co dzieje się z SEO, jeśli zmienię slug opublikowanego wpisu?**
O: Stary URL będzie zwracał 404. Wyszukiwarki ostatecznie usuną stary URL z indeksu i zaindeksują nowy. Unikaj zmiany slug w ustalonych wpisach.

**P: Czy mogę osadzać filmy we wpisach na blogu?**
O: Tak, użyj trybu źródłowego HTML, aby osadzić elementy iframe z filmami z YouTube lub Vimeo w obszarze treści.

**P: Czy istnieje limit słów lub znaków dla treści wpisu?**
O: Nie ma twardego limitu długości treści. Jednak wpisy o długości 800-2000 słów zazwyczaj osiągają najlepsze wyniki pod kątem SEO i zaangażowania czytelników.
