# Inställningar

Sidan Inställningar ger systemövergripande konfigurationsalternativ för Petfolioo-plattformen. Inställningar är organiserade i tre flikar: Allmänt, Notifikationer och Säkerhet. Ändringar som görs här påverkar beteendet hos både adminportalen och mobilappen.

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

## Översikt

Endast administratörer med rollen super_admin eller admin (med åtkomst till sidan Inställningar) kan visa och ändra inställningar. Alla ändringar kräver explicit sparande och träder i kraft omedelbart vid sparande.

---

## Komma åt inställningar

1. Klicka på **Inställningar** i sidomenyn.
2. Sidan Inställningar laddas med tre flikar överst.
3. Fliken **Allmänt** är vald som standard.

---

## Fliken Allmänt

Fliken Allmänt innehåller grundläggande applikationskonfiguration som definierar hur plattformen presenterar sig och fungerar.

### Fält

| Fält | Beskrivning | Standard |
|------|-------------|----------|
| **Appnamn** | Applikationens visningsnamn som visas i notifikationer och e-postmeddelanden | Petfolioo |
| **Support-e-post** | Kontakt-e-postadressen som visas för användare vid supportärenden | -- |
| **Standardspråk** | Standardspråket för nya användare och systemkommunikation | Engelska |
| **Underhållsläge** | Växla för att aktivera eller inaktivera underhållsläge | Av |

### Konfigurera allmänna inställningar

#### Appnamn

1. Hitta fältet **Appnamn**.
2. Rensa det befintliga värdet och skriv önskat applikationsnamn.
3. Detta namn visas i push-notiser, e-postrubriker och mobilappens om-sektion.

#### Support-e-post

1. Hitta fältet **Support-e-post**.
2. Ange den e-postadress dit användare ska rikta supportärenden.
3. Denna e-post visas på mobilappens hjälp-/kontaktskärm.

> **Tips:** Använd en delad team-e-post (t.ex. support@petfolioo.com) istället för en personlig adress så att flera teammedlemmar kan svara.

#### Standardspråk

1. Klicka på rullgardinsmenyn **Standardspråk**.
2. Välj det språk som ska användas som standard för:
   - Skapande av nya användarkonton
   - Systemgenererade notifikationer
   - E-postmallar
3. Användare kan åsidosätta detta i sina individuella mobilappsinställningar.

#### Underhållsläge

Underhållsläge är en kritisk funktion som signalerar till användare att plattformen är tillfälligt otillgänglig.

1. Hitta **Underhållsläge**-växeln.
2. Klicka på växeln för att aktivera underhållsläge.
3. En varningsdialog visas som bekräftar åtgärden.

**När underhållsläge är aktiverat:**

| Effekt | Beskrivning |
|--------|-------------|
| Adminportalvarning | En framträdande banner visas överst i adminportalen som indikerar att underhållsläge är aktivt |
| Mobilappåverkan | Mobilappen visar en underhållsskärm för användare, vilket förhindrar normal användning |
| API-beteende | API-ändpunkter returnerar underhållsstatussvar |
| Administratörsåtkomst | Administratörer kan fortfarande komma åt adminportalen normalt |

4. För att inaktivera underhållsläge, klicka på växeln igen.
5. Bekräfta åtgärden i dialogen.
6. Plattformen återgår till normal drift omedelbart.

> **Varning:** Att aktivera underhållsläge påverkar omedelbart alla mobilappanvändare. Aktivera det endast under planerade underhållsfönster och kommunicera schemat i förväg via push-notifikation.

---

## Fliken Notifikationer

Fliken Notifikationer kontrollerar automatiserade notifikationsbeteenden -- de systemgenererade aviseringarna som skickas till användare baserat på deras husdjursdata.

### Fält

| Fält | Beskrivning | Typ | Standard |
|------|-------------|-----|----------|
| **Vaccinationspåminnelser** | Skicka automatiska påminnelser när ett husdjurs vaccination närmar sig förfallodatum | Växel | På |
| **Dräktighetsaviseringar** | Skicka aviseringar för dräktighetsmilestonar och förväntat leveransdatum | Växel | På |
| **Parningsuppdateringar** | Skicka uppdateringar om parningsschemahändelser och bekräftelser | Växel | På |
| **Påminnelsedagar före förfallodatum** | Antal dagar före ett förfallodatum som påminnelsenotis ska skickas | Nummerfält | 7 |

### Konfigurera notifikationsinställningar

#### Vaccinationspåminnelser

1. Hitta växeln **Vaccinationspåminnelser**.
2. När **aktiverad** (standard):
   - Användare får push-notiser före deras husdjurs vaccinationsförfallodatum.
   - Notisen skickas baserat på inställningen "Påminnelsedagar före förfallodatum".
   - Exempel: Om inställt på 7 dagar får användare en påminnelse en vecka före vaccination ska ske.
3. När **inaktiverad**:
   - Inga automatiska vaccinationspåminnelser skickas.
   - Användare måste manuellt kontrollera sitt husdjurs vaccinationsschema.

#### Dräktighetsaviseringar

1. Hitta växeln **Dräktighetsaviseringar**.
2. När **aktiverad** (standard):
   - Användare som spårar en dräktighet får milstolpenotiser.
   - Aviseringar inkluderar påminnelser om förväntat leveransdatum och stadieövergångar.
   - Uppfödare får ytterligare professionella spårningsnotiser.
3. När **inaktiverad**:
   - Inga automatiska dräktighetsrelaterade aviseringar skickas.

#### Parningsuppdateringar

1. Hitta växeln **Parningsuppdateringar**.
2. När **aktiverad** (standard):
   - Användare får notiser om schemalagda parningshändelser.
   - Bekräftelsenotiser skickas när parningsposter loggas.
   - Uppfödare får matchförslag och schemapåminnelser.
3. När **inaktiverad**:
   - Inga automatiska parningsrelaterade notiser skickas.

#### Påminnelsedagar före förfallodatum

1. Hitta nummerfältet **Påminnelsedagar före förfallodatum**.
2. Ange antalet dagar före ett förfallodatum som påminnelser ska skickas.
3. Detta värde gäller för alla datumbaserade påminnelser (vaccinationer, bokningar).
4. Giltigt intervall: 1 till 30 dagar.

> **Tips:** Ett värde på 7 dagar fungerar bra för de flesta användare. För uppfödare som hanterar flera husdjur, överväg att ställa in det till 14 dagar för att ge mer förberedelsetid.

### Tabell för notifikationsinteraktion

| Inställning | Påverkar | Användareffekt |
|-------------|----------|----------------|
| Vaccinationspåminnelser PÅ + 7 dagar | Användare med husdjur som har kommande vaccinationer | "Rex rabiesvaccination ska ske om 7 dagar" |
| Dräktighetsaviseringar PÅ | Användare med aktiva dräktighetsposter | "Lunas dräktighet har gått in i vecka 6" |
| Parningsuppdateringar PÅ | Användare med schemalagda parningar | "Parningsbokning med Max bekräftad till fredag" |
| Alla växlar AV | Alla användare | Inga automatiserade notiser; endast manuella administratörsnotiser |

---

## Fliken Säkerhet

Fliken Säkerhet innehåller inställningar som kontrollerar API-hastighetsbegränsning, livstider för autentiseringstoken och filuppladdningsbegränsningar.

### Fält

| Fält | Beskrivning | Typ | Standard |
|------|-------------|-----|----------|
| **Hastighetsgräns per minut** | Maximalt antal API-förfrågningar tillåtna per användare per minut | Nummer | 60 |
| **Åtkomsttoken utgång (timmar)** | Hur länge en åtkomsttoken förblir giltig | Nummer | 24 |
| **Uppdateringstoken utgång (dagar)** | Hur länge en uppdateringstoken förblir giltig | Nummer | 30 |
| **Max fotostorlek (MB)** | Maximal tillåten filstorlek för husdjursfoton | Nummer | 5 |
| **Max avatarstorlek (MB)** | Maximal tillåten filstorlek för användaravatarer | Nummer | 2 |
| **Tillåtna filtyper** | Kommaseparerad lista av MIME-typer som accepteras för uppladdningar | Text | image/jpeg,image/png,image/webp |

### Konfigurera säkerhetsinställningar

#### Hastighetsgräns per minut

1. Hitta fältet **Hastighetsgräns per minut**.
2. Ange det maximala antalet API-förfrågningar en enskild användare kan göra per minut.
3. Förfrågningar som överskrider denna gräns får ett 429 (Too Many Requests)-svar.
4. Rekommenderat intervall: 30-120 beroende på förväntade användningsmönster.

> **Viktigt:** Att sätta detta för lågt kan göra att mobilappen fungerar fel för aktiva användare. Att sätta det för högt kan lämna systemet sårbart för missbruk. Standardvärdet 60 är lämpligt för de flesta installationer.

#### Åtkomsttoken utgång (timmar)

1. Hitta fältet **Åtkomsttoken utgång**.
2. Ange antalet timmar en åtkomsttoken förblir giltig efter utfärdande.
3. När en token löper ut använder appen uppdateringstoken för att erhålla en ny.
4. Kortare värden är säkrare; längre värden minskar inloggningsfriktion.

| Värde | Säkerhet | Användarupplevelse |
|-------|----------|-------------------|
| 1 timme | Hög | Frekvent omautentisering |
| 24 timmar | Medel | Bra balans (rekommenderat) |
| 72 timmar | Lägre | Minimal störning |

#### Uppdateringstoken utgång (dagar)

1. Hitta fältet **Uppdateringstoken utgång**.
2. Ange antalet dagar en uppdateringstoken förblir giltig.
3. När uppdateringstoken löper ut måste användaren logga in igen med sina uppgifter.
4. Rekommenderat intervall: 7-90 dagar.

> **Tips:** För en konsumentapp som Petfolioo är 30 dagar en bra balans. Användare som öppnar appen minst en gång i månaden behöver aldrig logga in igen. För installationer med högre säkerhetskrav, överväg 7 dagar.

#### Max fotostorlek (MB)

1. Hitta fältet **Max fotostorlek**.
2. Ange den maximala filstorleken i megabyte för husdjursfotouppladdningar.
3. Foton som överskrider denna storlek avvisas med ett felmeddelande.
4. Överväg lagringskostnader och uppladdningstider för användare med långsamma anslutningar.

| Värde | Lämplig för |
|-------|-------------|
| 2 MB | Låg lagring, snabba uppladdningar, lägre kvalitet |
| 5 MB | Balanserat (rekommenderat) |
| 10 MB | Högkvalitetsfoton, mer lagring |

#### Max avatarstorlek (MB)

1. Hitta fältet **Max avatarstorlek**.
2. Ange den maximala filstorleken i megabyte för användarprofilavatarer.
3. Avatarer är vanligtvis mindre än husdjursfoton eftersom de visas i reducerad upplösning.
4. Rekommenderat: 1-3 MB.

#### Tillåtna filtyper

1. Hitta fältet **Tillåtna filtyper**.
2. Ange en kommaseparerad lista av MIME-typer som systemet accepterar för uppladdningar.
3. Varje MIME-typ ska vara i formatet `type/subtype`.
4. Lägg inte till mellanslag mellan poster om du inte avsiktligt vill ha dem i MIME-typsträngen.

**Vanliga MIME-typer för bilduppladdningar:**

| MIME-typ | Format | Anteckningar |
|----------|--------|--------------|
| `image/jpeg` | JPEG | Vanligaste fotoformatet, bra komprimering |
| `image/png` | PNG | Förlustfri, stöder transparens |
| `image/webp` | WebP | Modernt format, utmärkt komprimering |
| `image/heic` | HEIC | Apples format, används av iPhone-kameror |
| `image/gif` | GIF | Animerade bilder, större filstorlekar |

**Exempelkonfigurationer:**

```
Standard:     image/jpeg,image/png,image/webp
Utökad:       image/jpeg,image/png,image/webp,image/heic,image/gif
Minimal:      image/jpeg,image/png
```

> **Varning:** Att lägga till MIME-typer som inte stöds kan tillåta uppladdningar som systemet inte kan bearbeta. Lägg bara till typer som din bildbearbetningspipeline stöder.

---

## Spara inställningar

Alla inställningsändringar kräver en explicit sparåtgärd.

### Steg för att spara

1. Gör dina önskade ändringar i valfri av de tre flikarna.
2. Klicka på knappen **Spara inställningar** längst ned på sidan.
3. En laddningsindikator visas medan ändringar tillämpas.
4. En framgångsnotis bekräftar att inställningarna sparades.
5. Ändringar träder i kraft omedelbart över plattformen.

### Viktiga anteckningar om sparande

- Ändringar sparas **inte** automatiskt. Om du navigerar bort utan att spara går ändringarna förlorade.
- Du kan ändra inställningar i flera flikar innan du sparar -- alla ändringar sparas tillsammans.
- Om ett valideringsfel uppstår markeras det specifika fältet med ett felmeddelande.
- Endast fält som har ändrats skickas till servern (optimistisk partiell uppdatering).

> **Tips:** Efter att ha sparat säkerhetsrelaterade ändringar (hastighetsgränser, token-utgång), övervaka systemet en kort period för att säkerställa att inget oväntat beteende uppstår.

---

## Revisionslogg för inställningsändringar

Alla inställningsändringar loggas för säkerhet och ansvarsskyldighet:

| Loggad information | Beskrivning |
|--------------------|-------------|
| Administratörsnamn | Vem som gjorde ändringen |
| Tidsstämpel | När ändringen gjordes |
| Ändrat fält | Vilken inställning som ändrades |
| Tidigare värde | Värdet innan ändringen |
| Nytt värde | Värdet efter ändringen |

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Kan inte komma åt sidan Inställningar | Verifiera att din roll är super_admin eller admin med behörighet till Inställningar. |
| Spara-knappen inaktiverad | Inga ändringar har gjorts. Ändra minst ett fält för att aktivera sparande. |
| Valideringsfel vid sparande | Kontrollera det markerade fältet för det specifika felmeddelandet och korrigera värdet. |
| Underhållsläge påverkar inte appen | Tillåt 1-2 minuter för ändringen att sprida sig till alla mobilappsinstanser. |
| Hastighetsgräns för restriktiv | Öka värdet och spara. Påverkade användare avblockeras inom en minut. |
| Filuppladdningsfel efter typändring | Säkerställ att MIME-typerna är korrekt formaterade utan avslutande kommatecken eller mellanslag. |

---

## Relaterade sidor

- [Adminanvändare](./admin-users.md) -- Hantera vem som kan komma åt och ändra inställningar
- [Notifikationer](./notifications.md) -- Skicka manuella notifikationer till användare
- [Analyser](./analytics.md) -- Övervaka plattformens hälsa och användning
