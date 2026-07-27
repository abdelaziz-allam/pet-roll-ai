# Opdrætterverificering

Modulet Opdrætterverificering giver administratorer mulighed for at gennemgå, godkende, afvise og tilbagekalde opdrætterverificeringsanmodninger. Verificerede opdrættere modtager et tillids-badge, der er synligt for købere, som signal for, at deres kennel opfylder platformens standarder.

![Verification](/docs/screenshots/verification.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Approve, Reject |
> | Admin | View, Approve, Reject |
> | Moderator | View, Approve, Reject |
> | Viewer | View only |

---

## Tabel over verificeringsanmodninger

Hovedvisningen viser alle verificeringsindleveringer i en søgbar, sorterbar tabel.

| Kolonne | Beskrivelse |
|---------|-------------|
| Opdrætternavn | Fulde navn på opdrætteren, der indsendte anmodningen |
| Kennel | Registreret kennelnavn tilknyttet opdrætteren |
| Indleveringsnr. | Automatisk stigende indleveringsnummer (genindleveringer får et nyt nummer) |
| Antal dokumenter | Antal uploadede dokumenter vedhæftet indleveringen |
| Status | Aktuel verificeringsstatus-badge |
| Udløb | Verificeringsudløbsdato (vises kun for godkendte indleveringer) |

### Filtrering af tabellen

1. Brug **Status**-rullelisten til at filtrere efter: Afventende, Godkendt, Afvist, Tilbagekaldt eller Udløbet.
2. Brug **Søgningsfeltet** til at finde en opdrætter efter navn eller kennel.
3. Klik på en kolonneoverskrift for at sortere stigende eller faldende.

> **Tip:** Standardvisningen viser Afventende indleveringer først, så du kan prioritere nye anmodninger.

---

## Statusarbejdsgang

Verificeringsanmodninger følger en defineret livscyklus:

```
Afventende --> Godkendt --> Udløbet (automatisk, efter udløbsdato)
   |              |
   |              +--> Tilbagekaldt (manuel admin-handling)
   |
   +--> Afvist (opdrætter kan genindlevere)
```

### Statusdefinitioner

| Status | Badge-farve | Betydning |
|--------|-------------|---------|
| Afventende | Orange | Afventer administratorgennemgang |
| Godkendt | Grøn | Opdrætter er verificeret, og badget er aktivt |
| Afvist | Rød | Indleveringen opfyldte ikke kravene |
| Tilbagekaldt | Mørkerød | Administrator har manuelt fjernet verificeret status |
| Udløbet | Grå | Verificeringsperioden er slut; opdrætter skal genindlevere |

### Overgange

- **Afventende** kan overgå til **Godkendt** eller **Afvist**.
- **Godkendt** kan overgå til **Tilbagekaldt** (manuelt) eller **Udløbet** (automatisk).
- **Afvist** og **Udløbet** giver opdrætteren mulighed for at oprette en ny indlevering (ny Afventende post).
- **Tilbagekaldt** er en slutstatus for den pågældende indlevering.

---

## Gennemgang af en indlevering

For at gennemgå en opdrætterverificeringsanmodning:

1. Find indleveringen i tabellen over verificeringsanmodninger.
2. Klik på rækken eller handlingsknappen **Gennemgå** i højre side.
3. **Indleveringsdetaljer-dialogen** åbnes med to faner:
   - **Aktuel indlevering** -- Viser de aktive dokumenter og opdrætterdetaljer.
   - **Indleveringshistorik** -- Viser alle tidligere indleveringer fra denne opdrætter.

### Fanen Aktuel indlevering

Denne fane viser:

- Opdrætterprofilinformation (navn, e-mail, telefon, kennelregistreringsnummer)
- Uploadede dokumenter i et gitterlayout
- Indleveringsdato og -tid
- Eventuelle noter, opdrætteren inkluderede med indleveringen

### Fanen Indleveringshistorik

Denne fane viser en kronologisk liste over alle indleveringer fra den samme opdrætter, inklusiv:

- Indleveringsnummer
- Dato for indlevering
- Endelig status
- Gennemgångens navn
- Afvisningsårsag (hvis relevant)

> **Tip:** Brug fanen Indleveringshistorik til at kontrollere, om en opdrætter har adresseret tidligere afvisningsårsager, før du godkender en genindlevering.

---

## Dokumentforhåndsvisning

Hvert uploadet dokument vises som en miniature i dokumentgitteret.

1. Klik på en dokumentminiature for at åbne en forhåndsvisning i fuld størrelse.
2. Brug zoomkontrollerne til at inspicere dokumentdetaljer.
3. Naviger mellem dokumenter ved hjælp af venstre/højre pile i forhåndsvisningsoverlejringen.
4. Tryk på **Escape** eller klik på lukknappen for at vende tilbage til detaljedialog.

Understøttede dokumentformater inkluderer:

- JPEG- og PNG-billeder
- PDF-dokumenter (gengivet som sidebilleder)

> **Tip:** Se efter klarhed, ægthed og fuldstændighed, når du gennemgår uploadede dokumenter. Slørede eller ufuldstændige dokumenter bør afvises med klare instruktioner til genindlevering.

---

## Godkendelse af en indlevering

For at godkende en opdrætterverificeringsanmodning:

1. Åbn indleveringsdetaljer-dialogen ved at klikke på rækken i tabellen.
2. Gennemgå alle uploadede dokumenter omhyggeligt.
3. Klik på knappen **Godkend** i bunden af dialogen.
4. I bekræftelsesdialogen:
   - Angiv **udløbsdatoen** for verificeringen. Standard er 1 år fra i dag.
   - Juster eventuelt datoen, hvis en kortere eller længere periode er passende.
5. Klik på **Bekræft godkendelse**.

### Hvad sker der efter godkendelse

- Opdrætterens profil modtager det verificerede badge øjeblikkeligt.
- Opdrætteren underrettes via e-mail og in-app-notifikation.
- Indleveringens status ændres til **Godkendt** i tabellen.
- Udløbsdatoen vises i Udløb-kolonnen.
- Når udløbsdatoen passeres, overgår status automatisk til **Udløbet**.

> **Tip:** For nye opdrættere med begrænset dokumentation, overvej at sætte et kortere udløb (6 måneder) for at fremme en tidligere gen-verificering.

---

## Afvisning af en indlevering

For at afvise en opdrætterverificeringsanmodning:

1. Åbn indleveringsdetaljer-dialogen.
2. Gennemgå dokumenterne og identificer problemet/problemerne.
3. Klik på knappen **Afvis** i bunden af dialogen.
4. I afvisningsdialogen:
   - Indtast en **afvisningsårsag** i tekstområdet. Dette felt er påkrævet.
   - Vær specifik om, hvad der mangler eller er utilstrækkeligt.
5. Klik på **Bekræft afvisning**.

### Hvad sker der efter afvisning

- Indleveringens status ændres til **Afvist**.
- Afvisningsårsagen er synlig for opdrætteren i deres dashboard.
- Opdrætteren modtager en notifikation, der forklarer afvisningen.
- Opdrætteren kan oprette en ny indlevering for at adressere problemerne.

### Gode afvisningsårsager

| Gør | Gør ikke |
|-----|----------|
| "Kennelregistreringsdokument er udløbet (2019). Upload venligst en aktuel registrering." | "Dokumenter ikke gode nok." |
| "Foto af facilitet er for sløret til at verificere forholdene. Genindlever venligst med klarere billeder." | "Dårlige fotos." |
| "Manglende vaccinationsregistreringer for avlsdyr." | "Ufuldstændigt." |

> **Tip:** Klare afvisningsårsager reducerer frem-og-tilbage-kommunikation og hjælper opdrættere med at indsende komplette ansøgninger ved næste forsøg.

---

## Tilbagekaldelse af verificering

Tilbagekaldelse fjerner øjeblikkeligt en opdrætters verificerede status. Brug dette ved politikovertrædelser eller svigagtig dokumentation opdaget efter godkendelse.

1. Naviger til tabellen over verificeringsanmodninger.
2. Filtrer efter **Status: Godkendt** for at finde aktive verificeringer.
3. Klik på rækken for at åbne indleveringsdetaljerne.
4. Klik på knappen **Tilbagekald** (vises kun for godkendte indleveringer).
5. I tilbagekaldelsesdialogen:
   - Indtast **årsagen til tilbagekaldelse**. Dette er påkrævet.
   - Bekræft, at du forstår, at handlingen er øjeblikkelig.
6. Klik på **Bekræft tilbagekaldelse**.

### Hvad sker der efter tilbagekaldelse

- Det verificerede badge fjernes øjeblikkeligt fra opdrætterens profil.
- Opdrætteren underrettes via e-mail med tilbagekaldelsesårsagen.
- Alle aktive opslag fra opdrætteren viser en advarselsindikator.
- Indleveringens status ændres til **Tilbagekaldt** (slutstatus).
- Opdrætteren kan ikke genindlevere mod den samme indlevering; de skal starte forfra.

> **Tip:** Tilbagekaldelse er en alvorlig handling. Dokumenter årsagen grundigt i tilfælde af tvister. Overvej at kontakte opdrætteren, før du tilbagekalder, hvis problemet er mindre.

---

## Tidslinjevisning

Tidslinjevisningen giver en visuel historik over en opdrætters verificeringsrejse.

1. Åbn en indleveringsdetalje-dialog.
2. Skift til fanen **Indleveringshistorik**.
3. Tidslinjen viser begivenheder i kronologisk rækkefølge:
   - Indlevering oprettet
   - Dokumenter uploadet
   - Admin-gennemgang startet
   - Status ændret (med gennemgåers navn)
   - Udløbsadvarsler sendt
   - Genindleveringer forbundet

### Aflæsning af tidslinjen

Hver tidslinjpost viser:

- **Dato og tid** for begivenheden
- **Begivenhedstype**-ikon (dokument, statusændring, notifikation)
- **Aktør** (opdrætternavn eller adminnavn)
- **Detaljer** (årsagstekst, dokumentnavne, angivet udløbsdato)

### Anvendelsestilfælde for tidslinjen

- **Tvisteløsning:** Se den fulde historik, når en opdrætter bestrider en afvisning.
- **Revisionsspor:** Spor hvilken administrator der gennemgik og godkendte/afviste hver indlevering.
- **Mønstergenkendelse:** Identificer opdrættere, der gentagne gange indsender utilstrækkelig dokumentation.

> **Tip:** Tidslinjen er skrivebeskyttet. Alle handlinger (godkend, afvis, tilbagekald) skal udføres fra fanen Aktuel indlevering.

---

## Tastaturgenveje

| Genvej | Handling |
|--------|---------|
| Enter | Åbn valgt indlevering |
| Escape | Luk dialog |
| Tab | Skift mellem dialogfaner |
| Piletaster | Naviger mellem dokumenter i forhåndsvisning |

---

## Ofte stillede spørgsmål

**Sp: Kan jeg godkende en indlevering med betingelser?**
Sv: Nej. Godkendelser er ubetingede. Hvis dokumenter er delvist acceptable, afvis med specifikke instruktioner for, hvad der skal rettes, og godkend derefter genindleveringen.

**Sp: Hvad sker der med en opdrætters opslag, når deres verificering udløber?**
Sv: Opslag forbliver aktive, men det verificerede badge fjernes. Opdrætteren underrettes 30 dage før udløb for at opmuntre til genindlevering.

**Sp: Kan en tilbagekaldt opdrætter ansøge igen?**
Sv: Ja, men de skal oprette en helt ny indlevering. Den tidligere tilbagekaldte indlevering forbliver i historikken til revisionsformål.

**Sp: Hvem kan udføre verificeringshandlinger?**
Sv: Kun administratorer med rollen Verificeringsadministrator kan godkende, afvise eller tilbagekalde indleveringer.
