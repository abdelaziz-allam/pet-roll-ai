# Hälsointyg

Modulen Hälsointyg låter administratörer hantera och verifiera hälsocertifikat för husdjur som skickats in av veterinärer eller husdjursägare. Detta säkerställer att husdjur listade på plattformen har giltig, aktuell hälsodokumentation.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Certifieringstabell

Huvudvyn visar alla inlämningar av hälsointyg i en datatabell.

| Kolumn | Beskrivning |
|--------|-------------|
| Husdjursnamn | Namn på husdjuret som certifieringen tillhör |
| Veterinärinfo | Veterinärens namn och klinik |
| Plats | Land och stad där certifieringen utfärdades |
| Certifieringsdatum | Datum då certifieringen utfärdades av veterinären |
| Dokument | Antal bifogade certifieringsdokument |
| Status | Aktuell certifieringsstatus |

### Tabellåtgärder

- Klicka på valfri rad för att öppna **Detaljpanelen** på höger sida.
- Använd åtgärdsknapparna i den sista kolumnen för snabb godkänna/avvisa.
- Sortera efter valfri kolumn genom att klicka på kolumnrubriken.

---

## Filter

Filterfältet ovanför tabellen erbjuder fyra filteralternativ:

### Statusfilter

Filtrera certifieringar efter deras aktuella status:

| Status | Färg | Beskrivning |
|--------|------|-------------|
| Väntande | Orange | Väntar på administratörsgranskning |
| Godkänd | Grön | Certifiering verifierad och aktiv |
| Avvisad | Röd | Certifieringen godkändes inte vid granskning |
| Återkallad | Mörkröd | Tidigare godkänd certifiering ogiltigförklarad |
| Utgången | Grå | Certifieringens giltighetsperiod har avslutats |

### Artfilter

Filtrera efter husdjursart:

- Hund
- Katt
- Fågel
- Kanin
- Övrigt

### Landsfilter

Välj ett eller flera länder att filtrera efter platsen där certifieringen utfärdades.

### Stadsfilter

Begränsa ytterligare genom att välja specifika städer inom det valda landet.

> **Tips:** Filter kan kombineras. Filtrera till exempel efter Status: Väntande + Art: Hund + Land: Tyskland för att se alla väntande hundcertifieringar från Tyskland.

---

## Detaljpanel

Att klicka på en certifieringsrad öppnar en detaljpanel på höger sida av skärmen. Panelen innehåller omfattande information organiserad i sektioner.

### Statusbanner

Längst upp i panelen visar en färgad banner:

- Aktuell status med märkesikon
- Datum för senaste statusändring
- Namn på administratören som senast hanterade certifieringen (om tillämpligt)
- Avvisnings- eller återkallningsorsak (om tillämpligt, visas i en varningsruta)

### Sektion med husdjursinformation

| Fält | Beskrivning |
|------|-------------|
| Husdjursnamn | Registrerat namn på husdjuret |
| Art | Husdjurets art |
| Ras | Husdjurets ras |
| Födelsedatum | Husdjurets födelsedatum |
| Mikrochip-ID | Unikt mikrochipidentifierare (om tillgängligt) |
| Ägare | Namn på husdjurets ägare med länk till deras profil |

### Sektion med veterinärinformation

| Fält | Beskrivning |
|------|-------------|
| Veterinärens namn | Fullständigt namn på utfärdande veterinär |
| Kliniknamn | Namn på veterinärkliniken |
| Klinikadress | Fullständig adress till kliniken |
| Licensnummer | Veterinärens professionella licensnummer |
| Telefon | Klinikens kontakttelefonnummer |
| E-post | Klinikens kontakt-e-post (om angiven) |

> **Tips:** Verifiera licensnumret mot ditt lands veterinärlicensdatabas vid granskning av certifieringar från okända kliniker.

### Giltighetsförloppsindikator

Under veterinäruppgifterna visualiserar en förloppsindikator certifieringens giltighetsperiod:

1. Indikatorn sträcker sig från **certifieringsdatumet** (start) till **utgångsdatumet** (slut).
2. Aktuellt datum indikeras av en markör på indikatorn.
3. Färgkodning:
   - **Grön:** Mer än 30 dagar kvar
   - **Gul:** 30 dagar eller färre kvar
   - **Röd:** Utgången
4. Procent av giltighetstiden som förbrukats visas som text.

### Dokumentrutnät

Dokumentsektionen visar uppladdade certifieringsfiler i ett rutnät.

1. Varje dokument visas som ett miniatyrkort med filnamnet under.
2. Klicka på valfri miniatyr för att öppna **bildförhandsgranskningen**.
3. I förhandsgranskningen:
   - Använd zoom in/ut-kontroller för att inspektera detaljer.
   - Navigera mellan dokument med vänster/höger-pilar.
   - Ladda ned originalfilen med nedladdningsknappen.
   - Tryck **Escape** för att stänga förhandsgranskningen.
4. Stödda format: JPEG, PNG, PDF.

> **Tips:** Leta efter officiella veterinärstämplar, signaturer och licensnummer på certifieringsdokument. Generiska eller malldokument utan dessa element bör flaggas för avvisning.

---

## Godkänna en certifiering

För att godkänna ett hälsointyg:

1. Öppna certifieringens detaljpanel genom att klicka på raden.
2. Granska veterinäruppgifterna för fullständighet och trovärdighet.
3. Inspektera alla uppladdade dokument i dokumentrutnätet.
4. Klicka på knappen **Godkänn** längst ned i panelen.
5. I bekräftelsedialogen:
   - Granska sammanfattningen av vad du godkänner.
   - Utgångsdatumet beräknas automatiskt baserat på certifieringstyp.
   - Klicka på **Bekräfta**.

### Godkännandechecklista

Före godkännande, verifiera:

- [ ] Veterinärens namn och licensnummer finns
- [ ] Klinikuppgifter är fullständiga och verifierbara
- [ ] Dokument är läsbara och innehåller officiella stämplar/signaturer
- [ ] Certifieringsdatumet är nyligt (inom de senaste 12 månaderna)
- [ ] Husdjursinformationen på dokumentet matchar plattformsposten
- [ ] Inga tecken på dokumentmanipulering eller förfalskning

### Vad som händer efter godkännande

- Certifieringens status ändras till **Godkänd**.
- En giltighetsperiod sätts baserat på certifieringstypen.
- Husdjurets profil visar ett hälsocertifieringsmärke.
- Ägaren får en notis som bekräftar godkännandet.
- Giltighetsförloppsindikatorn blir aktiv i detaljpanelen.

---

## Avvisa en certifiering

För att avvisa ett hälsointyg:

1. Öppna certifieringens detaljpanel.
2. Identifiera problemet/problemen med inlämningen.
3. Klicka på knappen **Avvisa** längst ned i panelen.
4. I avvisningsdialogen:
   - Ange en **avvisningsorsak** i textområdet. Detta fält är obligatoriskt.
   - Var specifik om vad som behöver korrigeras.
5. Klicka på **Bekräfta avvisning**.

### Vanliga avvisningsorsaker

| Orsak | Exempelmeddelande |
|-------|-------------------|
| Oläsliga dokument | "Det uppladdade dokumentet är för suddigt att läsa. Vänligen ladda upp en tydligare skanning eller foto." |
| Saknade veterinäruppgifter | "Certifikatet innehåller inte veterinärens licensnummer. Vänligen skicka in med fullständiga veterinäruppgifter." |
| Utgången certifiering | "Denna certifiering utfärdades för mer än 12 månader sedan. Vänligen inhämta och ladda upp ett aktuellt certifikat." |
| Felmatchad husdjursinformation | "Husdjursnamnet på certifikatet matchar inte det registrerade husdjursnamnet. Vänligen verifiera och skicka in igen." |
| Ofullständiga dokument | "Endast sida 1 av 3 laddades upp. Vänligen ladda upp alla sidor av certifieringen." |

### Vad som händer efter avvisning

- Certifieringens status ändras till **Avvisad**.
- Avvisningsorsaken visas för husdjursägaren.
- Ägaren får en notis med orsaken.
- Ägaren kan skicka in en ny certifiering för att ersätta den avvisade.

> **Tips:** Ge alltid handlingsbar feedback. Berätta för ägaren exakt vad som behöver åtgärdas så att de kan rätta till problemet vid en ominlämning.

---

## Återkalla en certifiering

Återkallning används när en tidigare godkänd certifiering visar sig vara ogiltig, bedräglig eller inte längre tillämplig.

1. Navigera till certifieringen (filtrera efter Status: Godkänd vid behov).
2. Öppna detaljpanelen.
3. Klicka på knappen **Återkalla** (endast synlig för godkända certifieringar).
4. I återkallningsdialogen:
   - Ange **orsak till återkallning**. Detta fält är obligatoriskt.
   - Bekräfta att denna åtgärd är omedelbar och inte kan ångras.
5. Klicka på **Bekräfta återkallning**.

### När man bör återkalla

- Bedräglig dokumentation upptäckt efter godkännande
- Veterinärlicens visar sig vara ogiltig eller återkallad
- Husdjursägare rapporterar att certifieringen skickades in av misstag
- Tillsynsmyndighet flaggar certifieringen

### Vad som händer efter återkallning

- Hälsocertifieringsmärket tas omedelbart bort från husdjurets profil.
- Certifieringens status ändras till **Återkallad**.
- Återkallningsorsaken lagras och är synlig i detaljpanelen.
- Ägaren meddelas via e-post och app-notis.
- Ägaren måste skicka in en ny certifiering om de önskar återställa märket.

> **Tips:** Återkallning är en allvarlig åtgärd som påverkar husdjurets förtroendesignaler på plattformen. Säkerställ att du har tillräckliga bevis innan du fortsätter.

---

## Förstå giltighet och utgång

Hälsointyg har en definierad giltighetsperiod som bestämmer hur länge certifieringen förblir aktiv efter godkännande.

### Hur giltighet fungerar

1. När en certifiering godkänns beräknar systemet ett utgångsdatum.
2. Giltighetsperioden beror på certifieringstypen:
   - Allmänt hälsointyg: 12 månader
   - Vaccinationscertifikat: Varierar enligt vaccinationsschema
   - Avelslämplighetsintycertifikat: 6 månader
3. **Giltighetsförloppsindikatorn** i detaljpanelen visar återstående tid visuellt.

### Utgångsnotiser

Systemet skickar automatiska notiser när utgångsdatumet närmar sig:

| Dagar före utgång | Notis |
|-------------------|-------|
| 30 dagar | Första påminnelsen till ägaren om förnyelse |
| 14 dagar | Andra påminnelsen med brådska |
| 7 dagar | Slutgiltig varning |
| 0 dagar | Certifiering utgången-notis |

### Efter utgång

- Certifieringens status ändras automatiskt till **Utgången**.
- Hälsomärket tas bort från husdjurets profil.
- Den utgångna certifieringen finns kvar i historiken för referens.
- Ägaren kan skicka in en ny certifiering när som helst.

> **Tips:** Övervaka certifieringstabellen filtrerad efter "Godkänd" och sorterad efter utgångsdatum för att proaktivt identifiera certifieringar som närmar sig utgång i din region.

---

## Massåtgärder

För effektiv hantering av flera certifieringar:

1. Använd kryssrutorna på vänster sida av tabellen för att välja flera rader.
2. Fältet för massåtgärder visas överst i tabellen.
3. Tillgängliga massåtgärder:
   - **Godkänn alla** -- Godkänner alla valda väntande certifieringar med standardutgång.
   - **Exportera** -- Laddar ned valda certifieringar som en CSV-rapport.

> **Tips:** Massgodkännande bör bara användas när du individuellt har verifierat varje vald certifierings dokument. Massgodkänn aldrig utan att granska dokument.

---

## Vanliga frågor

**F: Kan jag redigera utgångsdatumet för en godkänd certifiering?**
S: Nej. För att ändra utgångsdatumet måste du återkalla den aktuella certifieringen och be ägaren att skicka in igen.

**F: Vad gör jag om ett certifieringsdokument är på ett språk jag inte kan läsa?**
S: Eskalera till en administratör som läser det språket, eller begär att ägaren tillhandahåller en certifierad översättning.

**F: Kan ett husdjur ha flera aktiva certifieringar?**
S: Ja. Ett husdjur kan ha både ett allmänt hälsointyg och specifika vaccinationscertifikat aktiva samtidigt.

**F: Vem tar emot avvisnings-/återkallningsnotiserna?**
S: Husdjurets registrerade ägare tar emot alla notiser via e-post och meddelanden i appen.
