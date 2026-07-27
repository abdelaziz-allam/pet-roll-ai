# Blogg CMS

Blogg CMS-modulen lar administratorer opprette, redigere, publisere og administrere blogginnlegg som vises pa Petfolioos offentlige nettsted. Bruk dette verktoeyet til a dele tips om dyrepleie, plattformnyheter, oppdretterportrettet og pedagogisk innhold med fellesskapet ditt.

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

## Blogginnleggstabell

Hovedvisningen viser alle blogginnlegg i en sokbar, sorterbar tabell.

| Kolonne | Beskrivelse |
|---------|-------------|
| Tittel | Innleggets tittel med klikkbar lenke for redigering |
| Status | Publiseringsstatusmerke |
| Forfatter | Navn pa administratoren som opprettet innlegget |
| Visninger | Totalt antall sidevisninger siden publisering |
| Dato | Opprettelsesdato (eller publiseringsdato hvis publisert) |

### Statusmerker

| Status | Merkefarfe | Beskrivelse |
|--------|------------|-------------|
| Utkast | Gra | Innlegget er lagret, men ikke synlig for offentligheten |
| Publisert | Gronn | Innlegget er aktivt og synlig pa nettsiden |
| Fremhevet | Gull | Innlegget er publisert og festet til toppen |

### Tabellhandlinger

- Klikk pa en innleggstittel for a apne den for redigering.
- Bruk handlingsmenyen (tre prikker) pa hver rad for hurtighandlinger: Publiser, Avpubliser, Fest, Fjern festing, Slett.
- Sorter etter en hvilken som helst kolonne ved a klikke pa kolonneoverskriften.
- Bruk sokefeltet for a filtrere innlegg etter tittel eller innholdsnokkelord.

> **Tips:** Sorter etter Visninger synkende for a identifisere det mest populare innholdet ditt. Bruk denne innsikten til a planlegge fremtidige innlegg om lignende emner.

---

## Opprette et innlegg

For a opprette et nytt blogginnlegg:

1. Klikk pa **Opprett innlegg**-knappen oppe til hoyre i blogginnleggstabellen.
2. Innleggsredigereren apnes med folgende felt.

### Tittel

- Skriv inn innleggets tittel i tittelfeltet oppe.
- Maksimalt 200 tegn.
- Tittelen vises som hovedoverskriften pa den publiserte siden.
- Velg beskrivende, engasjerende titler som inkluderer relevante nokkelord.

### Slug

- URL-slugen genereres automatisk fra tittelen.
- Format: sma bokstaver, bindestreker erstatter mellomrom, spesialtegn fjernes.
- Eksempel: "Topp 10 tips for nye valpeeiere" blir `topp-10-tips-for-nye-valpeeiere`.
- Du kan manuelt redigere slugen hvis den automatisk genererte versjonen er for lang eller uklar.
- Slugen ma vare unik pa tvers av alle innlegg.

> **Tips:** Hold sluger korte og nokkelordrike for bedre SEO. Forkort manuelt automatisk genererte sluger som overskrider 5-6 ord.

### HTML-innhold

- Hovedinnholdsomradet aksepterer HTML for rik formatering.
- Bruk rikttekstredigererens verktoeylinje for vanlig formatering:
  - Fet, kursiv, understreket
  - Overskrifter (H2, H3, H4)
  - Nummererte og unummererte lister
  - Lenker
  - Bilder (integrert)
  - Blokksitater
  - Kodeblokker
- Bytt til **Kildemodus** for a redigere ra HTML direkte.
- Innholdet stotter alle standard HTML-tagger.

#### Beste praksis for innhold

| Gjor | Ikke gjor |
|------|-----------|
| Bruk H2 for hovedseksjoner, H3 for underseksjoner | Bruk H1 (reservert for tittelen) |
| Inkluder bilder for a bryte opp lang tekst | Publiser vegger av uformatert tekst |
| Hold avsnitt korte (3-4 setninger) | Skriv avsnitt lengre enn 5 setninger |
| Bruk lister for flere relaterte elementer | Bygg inn eksterne skript eller iframes |
| Legg til alt-tekst pa alle bilder | Bruk innebygde stiler for farger |

### Utdrag

- Skriv et kort sammendrag av innlegget (maksimalt 500 tegn).
- Utdraget vises pa blogglistesider, i sokeresultater og i sosiale medier-forhandsvisninger.
- Hvis det er tomt, brukes automatisk de forste 500 tegnene av innholdet.
- Tegntelleren viser gjenvarende tegn mens du skriver.

> **Tips:** Skriv utdraget som en overbevisende teaser som far leserne til a ville klikke seg videre. Det bor sta alene som en fullstendig tanke, ikke slutte midt i en setning.

### Opplasting av forsidebilde

1. Klikk pa **Last opp forsidebilde**-omradet eller dra og slipp en bildefil.
2. Stottede formater: JPEG, PNG, WebP.
3. Anbefalte dimensjoner: 1200 x 630 piksler (optimalisert for sosial deling).
4. Maksimal filstorrelse: 5 MB.
5. Etter opplasting vises en forhandsvisning av bildet.
6. Klikk **Fjern** for a slette det gjeldende forsidebildet og laste opp et annet.

#### Retningslinjer for forsidebilde

- Bruk bilder av hoy kvalitet og relevans som representerer innleggets innhold.
- Unnga tekstoverlegg pa forsidebilder (de kan beskjares pa forskjellige enheter).
- Sorg for at du har rettigheter til a bruke bildet (egne bilder eller korrekt lisensierte arkivbilder).
- Bilder optimaliseres automatisk for nettlevering etter opplasting.

### Tagger

- Skriv inn tagger som kommaseparerte verdier i taggerfeltet.
- Eksempel: `valpepleie, trening, ernaring, nye eiere`
- Tagger hjelper med a kategorisere innlegg og forbedre oppdagbarhet.
- Eksisterende tagger foresluas automatisk mens du skriver.
- Det er ingen grense for antall tagger, men 3-7 tagger per innlegg er anbefalt.

> **Tips:** Bruk konsekvent navngivning av tagger pa tvers av innlegg. Sjekk eksisterende tagger for du oppretter nye varianter (f.eks. bruk "valpepleie" konsekvent i stedet for a veksle med "valpe-pleie" eller "Valpepleie").

### SEO-innstillinger

SEO-seksjonen lar deg optimalisere hvordan innlegget vises i sokemotorer.

#### Metatittel

- Maksimalt 60 tegn.
- Vises som den klikkbare overskriften i sokeresultater.
- Hvis den er tom, brukes innleggstittelen.
- Tegntelleren blir rod nar den narmer seg eller overskrider 60 tegn.
- Beste praksis: Inkluder primaernokkelordet nart begynnelsen.

#### Metabeskrivelse

- Maksimalt 160 tegn.
- Vises som beskrivelsesteksten under tittelen i sokeresultater.
- Hvis den er tom, brukes utdraget.
- Tegntelleren blir rod nar den narmer seg eller overskrider 160 tegn.
- Beste praksis: Inkluder en oppfordring til handling og primaernokkelordet.

#### SEO-forhandsvisning

Under metafeltene viser en forhandsvisning hvordan innlegget vil vises i Google-sokeresultater:

```
+--------------------------------------------------+
| Metatittel (eller innleggstittel hvis tom)        |
| https://petfolioo.com/blog/din-slug-her           |
| Metabeskrivelse (eller utdrag hvis tom) vises     |
| her slik det ville gjort i sokeresultater...      |
+--------------------------------------------------+
```

> **Tips:** Fyll alltid inn bade metatittel og metabeskrivelse manuelt. Automatisk genererte verdier fra tittelen og utdraget er kanskje ikke optimalisert for sokeintensjon.

### Lagre et utkast

1. Etter a ha fylt inn de onskede feltene, klikk **Lagre utkast**.
2. Innlegget lagres med statusen Utkast.
3. Du kan komme tilbake for a redigere det nar som helst fra blogginnleggstabellen.
4. Utkast er ikke synlige for offentligheten.

---

## Publisere et innlegg

For a publisere et utkastinnlegg og gjore det synlig pa nettsiden:

1. Apne innlegget fra blogginnleggstabellen.
2. Gjennomga alt innhold, bilder og SEO-innstillinger.
3. Klikk pa **Publiser**-knappen oppe til hoyre.
4. I bekreftelsesdialogen:
   - Gjennomga innleggets tittel og slug.
   - Bekreft publiseringen.
5. Klikk **Bekreft publisering**.

### Hva som skjer etter publisering

- Innleggets status endres til **Publisert**.
- Innlegget blir umiddelbart synlig pa den offentlige bloggsiden.
- Publiseringsdatoen registreres (brukes til sortering pa bloggen).
- Innleggets URL blir aktiv: `https://petfolioo.com/blog/[slug]`.
- Sokemotorer kan na indeksere innlegget.

### Publiseringssjekkliste

For publisering, verifiser:

- [ ] Tittelen er tydelig, engasjerende og fri for skrivefeil
- [ ] Innholdet er fullstendig og riktig formatert
- [ ] Alle bilder lastes korrekt
- [ ] Lenker fungerer og apnes i passende faner
- [ ] Forsidebilde er lastet opp og ser bra ut
- [ ] Utdrag er skrevet og under 500 tegn
- [ ] Tagger er lagt til og riktig formatert
- [ ] Metatittel er under 60 tegn
- [ ] Metabeskrivelse er under 160 tegn
- [ ] Slug er ren og nokkelordrik

---

## Avpublisere et innlegg

For a fjerne et publisert innlegg fra den offentlige nettsiden:

1. Finn innlegget i blogginnleggstabellen.
2. Klikk pa handlingsmenyen (tre prikker) pa raden.
3. Velg **Avpubliser**.
4. Bekreft handlingen i dialogen.

### Hva som skjer etter avpublisering

- Innleggets status endres tilbake til **Utkast**.
- Innlegget fjernes umiddelbart fra den offentlige bloggsiden.
- URL-en returnerer en 404-side.
- Visningstallet beholdes.
- Du kan publisere innlegget pa nytt nar som helst.

> **Tips:** Avpubliser i stedet for a slette hvis du midlertidig vil fjerne innhold. Avpubliserte innlegg beholder alle dataene sine og kan gjenopprettes umiddelbart.

---

## Fest/fjern festing som fremhevet

Fremhevede innlegg vises fremtredende oppe pa bloggsiden, over kronologiske oppforinger.

### Feste et innlegg

1. Finn et publisert innlegg i blogginnleggstabellen.
2. Klikk pa handlingsmenyen (tre prikker).
3. Velg **Fest som fremhevet**.
4. Statusmerket endres til **Fremhevet** (gull).

### Fjerne festing av et innlegg

1. Finn det fremhevede innlegget i tabellen.
2. Klikk pa handlingsmenyen (tre prikker).
3. Velg **Fjern festing**.
4. Statusen gar tilbake til **Publisert** (gronn).

### Regler for fremhevede innlegg

- Kun publiserte innlegg kan festes.
- Flere innlegg kan vare fremhevet samtidig.
- Fremhevede innlegg vises i rekkfolgen de ble festet (nyligst festet forst).
- A fjerne festing av et innlegg avpubliserer det ikke; det forblir publisert.

> **Tips:** Begrens fremhevede innlegg til 2-3 om gangen. For mange fremhevede innlegg utvanner vektleggingen og skyver vanlig innhold under folden.

---

## Vis pa nettstedet

For a forhandsvise hvordan et publisert innlegg ser ut pa det offentlige nettstedet:

1. Apne innlegget fra blogginnleggstabellen.
2. Klikk pa **Vis pa nettstedet**-lenken oppe til hoyre (ved siden av Publiser-knappen).
3. En ny nettleserfane apnes som viser innlegget pa det aktive nettstedet.

### Merknader

- Vis pa nettstedet-lenken er kun tilgjengelig for publiserte og fremhevede innlegg.
- Utkastinnlegg kan ikke forhandsvises pa det aktive nettstedet.
- Lenken apner den gjeldende aktive versjonen; ulagrede endringer i redigereren gjenspeiles ikke.

> **Tips:** Se alltid pa nettstedet etter publisering for a verifisere at formatering, bilder og layout vises korrekt i det offentlige temaet.

---

## Slette et innlegg

For a permanent slette et blogginnlegg:

1. Finn innlegget i blogginnleggstabellen.
2. Klikk pa handlingsmenyen (tre prikker).
3. Velg **Slett**.
4. En bekreftelsesdialog vises:
   - Viser innleggets tittel.
   - Advarer om at sletting er permanent.
   - Ber deg skrive inn innleggets tittel for a bekrefte (for publiserte innlegg).
5. Klikk **Bekreft sletting**.

### Hva som skjer etter sletting

- Innlegget fjernes permanent fra systemet.
- URL-en returnerer en 404-side.
- Innlegget kan ikke gjenopprettes etter sletting.
- Visningsstatistikk gar tapt.
- Slugen blir tilgjengelig for gjenbruk.

### Nar slette vs. avpublisere

| Scenario | Handling |
|----------|----------|
| Midlertidig fjerning av innhold | Avpubliser |
| Utdatert innhold som kan oppdateres senere | Avpubliser |
| Testinnlegg eller utilsiktede duplikater | Slett |
| Innhold som aldri burde ha blitt opprettet | Slett |
| Juridisk problematisk innhold | Slett |

> **Tips:** Sletting er irreversibel. Nar du er i tvil, avpubliser i stedet. Du kan alltid slette et avpublisert innlegg senere, men du kan ikke gjenopprette et slettet innlegg.

---

## Bildeopplasting for forsidebilder

Forsidebildeopplastingskomponenten stotter folgende arbeidsflyt:

### Opplastingsmetoder

1. **Klikk for a laste opp:** Klikk pa opplastingsomradet for a apne filutforskeren.
2. **Dra og slipp:** Dra en bildefil fra skrivebordet ditt direkte til opplastingsomradet.

### Opplastingsprosess

1. Velg eller slipp bildefilen din.
2. Opplastingsfremdriftslinjen vises.
3. Nar den er fullfort, vises bildeforhandsvisningen i opplastingsomradet.
4. Bilde-URL-en lagres automatisk med innlegget.

### Bildekrav

| Krav | Verdi |
|------|-------|
| Formater | JPEG, PNG, WebP |
| Minimumsdimensjoner | 600 x 315 piksler |
| Anbefalte dimensjoner | 1200 x 630 piksler |
| Maksimal filstorrelse | 5 MB |
| Sideforhold | 1.91:1 anbefalt (optimalisert for sosiale medier) |

### Administrere opplastede bilder

- **Erstatt:** Klikk pa **Fjern**-knappen under forhandsvisningen, last deretter opp et nytt bilde.
- **Forhandsvis:** Klikk pa bildeforhandsvisningen for a se det i full storrelse.
- **Alt-tekst:** Skriv inn beskrivende alt-tekst i feltet under bildet (viktig for tilgjengelighet og SEO).

### Bildeoptimalisering

Opplastede bilder blir automatisk:

- Komprimert for nettlevering (bevarer kvaliteten).
- Levert via CDN for rask lasting.
- Konvertert til WebP-format for nettlesere som stotter det.
- Endret storrelse til flere dimensjoner for responsiv visning.

> **Tips:** Forbered forsidebildene dine i 1200 x 630 piksler for opplasting. Dette er den optimale storrelsen for bade bloggvisning og deling i sosiale medier (Open Graph).

---

## Ofte stilte sporsmal

**Sp: Kan flere administratorer redigere det samme innlegget?**
Sv: Ja, men det er ingen sanntidssamarbeid. Den siste personen som lagrer overskriver tidligere endringer. Koordiner med teamet ditt for a unnga konflikter.

**Sp: Finnes det en revisjonshistorikk?**
Sv: Nei. Hver lagring overskriver den forrige versjonen. Kopier viktig innhold et annet sted for du gjor store endringer.

**Sp: Kan jeg planlegge et innlegg til publisering pa en fremtidig dato?**
Sv: Ikke for oyeblikket. Innlegg er enten utkast eller umiddelbart publisert. Lagre som utkast og publiser manuelt pa onsket tidspunkt.

**Sp: Hva skjer med SEO hvis jeg endrer slugen pa et publisert innlegg?**
Sv: Den gamle URL-en vil returnere 404. Sokemotorer vil etterhvert avindeksere den gamle URL-en og indeksere den nye. Unnga a endre sluger pa etablerte innlegg.

**Sp: Kan jeg bygge inn videoer i blogginnlegg?**
Sv: Ja, bruk HTML-kildemodus for a bygge inn video-iframes fra YouTube eller Vimeo i innholdsomradet.

**Sp: Er det en ord- eller tegngrense for innleggsinnhold?**
Sv: Det er ingen hard grense pa innholdslengde. Imidlertid pleier innlegg mellom 800-2000 ord a prestere best for SEO og leserengasjement.
