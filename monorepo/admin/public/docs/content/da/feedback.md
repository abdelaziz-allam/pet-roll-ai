# Feedbackhåndtering

Siden Feedbackhåndtering giver administratorer mulighed for at se, svare på og organisere brugerfeedback indsendt via Petfolioo-mobilappen. Dette er dit centrale samlingspunkt for at forstå brugerbehov, spore fejl og håndtere funktionsforslag.

![Feedback](/docs/screenshots/feedback.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Respond |
> | Viewer | View only |

---

## Oversigt

Når du navigerer til Feedbacksiden, vil du se en statistikrække øverst, der opsummerer den aktuelle tilstand af al feedback, efterfulgt af faneinddelt indhold og filtreringskontroller.

---

## Statistikrække

Øverst på siden viser fire metrik-kort realtidsoptællinger:

| Metrik | Beskrivelse |
|--------|-------------|
| **Total** | Det samlede antal feedbackposter modtaget på tværs af alle statusser |
| **Åbne** | Feedbackposter, der endnu ikke er besvaret eller lukket |
| **Besvaret** | Feedbackposter, hvor en administrator har postet mindst ét svar |
| **TODO** | Feedbackposter fastgjort af en administrator til opfølgning |

> **Tip:** Brug TODO-tællingen som en hurtig indikator for udestående emner, der kræver opmærksomhed. Hvis dette tal vokser, overvej at triagere med dit team.

---

## Faner

Feedbacksiden er organiseret i to faner:

### Al feedback

1. Klik på fanen **Al feedback** (valgt som standard).
2. Denne visning viser alle feedbackposter i systemet uanset status.
3. Poster er sorteret efter dato, med de nyeste først.
4. Brug filtrene (beskrevet nedenfor) til at indsnævre resultater.

### TODO-liste

1. Klik på fanen **TODO-liste**.
2. Denne visning viser kun feedbackposter, der er fastgjort som TODO af en administrator.
3. Brug denne fane under team-triageringsmøder eller daglige gennemgange.
4. Emner forbliver her, indtil de frigøres.

---

## Filtre

Under fanerne giver en filterbjælke flere kontroller til at indsnævre de viste feedbackposter.

### Statusfilter

1. Find **Status**-rullelisten på filterbjælken.
2. Klik for at udvide og vælg en af følgende:
   - **Alle** -- Viser feedback i enhver status
   - **Åben** -- Viser kun uløst feedback
   - **Besvaret** -- Viser feedback med mindst ét adminsvar
   - **Lukket** -- Viser feedback markeret som løst
3. Listen opdateres øjeblikkeligt ved valg.

### Typefilter

1. Find **Type**-rullelisten på filterbjælken.
2. Vælg den kategori af feedback, du vil se:
   - **Alle typer** -- Intet typefilter anvendt
   - **Fejl** -- Problemer eller defekter rapporteret af brugere
   - **Forslag** -- Funktionsanmodninger og forbedringsidéer
   - **Generelt** -- Generelle kommentarer eller spørgsmål
3. Hver feedbackpost er tagget med sit typebadge for hurtig visuel identifikation.

### Datointervalfilter

1. Klik på **Datointerval**-vælgeren på filterbjælken.
2. Vælg en startdato og slutdato fra kalenderwidgeten.
3. Kun feedback indsendt inden for det valgte interval vises.
4. For at rydde datofiltret, klik på ryd-ikonet på datovælgeren.

### Kun TODO's-kontakt

1. Find **Kun TODO's**-kontakten på filterbjælken.
2. Aktiver den for kun at vise feedbackposter fastgjort som TODO.
3. Dette giver et hurtigt alternativ til at skifte til TODO-listen, mens du forbliver i Al feedback-visningen med andre filtre anvendt.

> **Tip:** Kombinér filtre for kraftfulde forespørgsler. Sæt f.eks. Type til "Fejl" og Status til "Åben" for at se alle uløste fejlrapporter.

---

## Feedbackposter

Hver feedbackpost i listen viser følgende information:

| Felt | Beskrivelse |
|------|-------------|
| **Brugerinfo** | Den indsendende brugers visningsnavn, e-mail og avatar |
| **Besked** | Den fulde tekst af feedbacken indsendt af brugeren |
| **Typebadge** | Et farvet badge, der indikerer Fejl (rød), Forslag (blå) eller Generelt (grå) |
| **Dato** | Dato og tid for feedbackens indsendelse |
| **Status** | Aktuel statusindikator (Åben, Besvaret eller Lukket) |
| **TODO-nål** | Et nåleikon, der angiver, om denne post er markeret til opfølgning |

### Visning af en feedbackpost

1. Find feedbackposten i listen.
2. Klik på postrækken eller udvidelsesikonet for at åbne detaljevisningen.
3. Detaljevisningen viser den fulde besked, brugerinformation og eventuelle tidligere adminsvar.

---

## Besvarelse af feedback

Administratorer kan svare på brugerfeedback. Svar er synlige for brugeren i mobilappen.

### Trin til at svare

1. Åbn den feedbackpost, du vil svare på.
2. Find **Svar**-tekstområdet i bunden af detaljevisningen.
3. Skriv din svarbesked i tekstområdet.
4. Gennemgå din besked for klarhed og professionalisme.
5. Klik på knappen **Send svar**.
6. En bekræftelsesbesked vises, der indikerer, at svaret blev sendt succesfuldt.
7. Feedbackstatus ændres automatisk til **Besvaret**.

> **Vigtigt:** Dit svar vil være synligt for brugeren i Petfolioo-mobilappen. Sørg for, at dit svar er hjælpsomt, professionelt og adresserer brugerens bekymring direkte.

### Bedste praksis for svar

- Anerkend brugerens feedback, før du giver en løsning.
- Hvis problemet er en kendt fejl, lad brugeren vide, at der arbejdes på det.
- For forslag, tak brugeren og forklar, om funktionen overvejes.
- Undgå teknisk jargon, som slutbrugere muligvis ikke forstår.
- Hold svar kortfattede, men grundige.

---

## Tidligere adminsvar

Når du ser en feedbackpost, der har modtaget svar, vises alle tidligere adminsvar inline i kronologisk rækkefølge.

1. Åbn feedbackpostens detaljevisning.
2. Scroll ned for at se samtaletråden.
3. Hvert svar viser:
   - Administratorens navn, der postede svaret
   - Dato og tid for svaret
   - Den fulde svartekst
4. Nye svar vises i bunden af tråden.

> **Tip:** Gennemgå tidligere svar, før du poster et nyt, for at undgå duplikerede eller modstridende svar.

---

## Lukning af feedback

Når et feedbackemne er fuldt adresseret, kan du lukke det for at indikere, at ingen yderligere handling er nødvendig.

### Trin til at lukke

1. Åbn den feedbackpost, du vil lukke.
2. Klik på knappen **Luk** (eller vælg "Luk" fra handlingsmenuen).
3. En bekræftelsesdialog vises, der beder dig bekræfte.
4. Klik på **Bekræft** for at lukke feedbacken.
5. Postens status ændres til **Lukket**.
6. Lukkede poster forbliver i systemet og kan ses ved at sætte statusfiltret til "Lukket".

> **Bemærk:** Lukning af feedback sletter den ikke. Du kan stadig se lukkede poster og genåbne dem om nødvendigt.

---

## Fastgør/Frigør som TODO

TODO-nålefunktionen giver administratorer mulighed for at markere specifikke feedbackposter til opfølgning. Fastgjorte emner vises i fanen TODO-liste og bidrager til TODO-tællingen i statistikrækken.

### Fastgørelse af feedback som TODO

1. Find den feedbackpost, du vil markere til opfølgning.
2. Klik på **Fastgør**-ikonet (knappenål) på postrækken, eller åbn detaljevisningen og klik på **Fastgør som TODO**.
3. Posten tilføjes øjeblikkeligt til TODO-listen.
4. TODO-tælleren i statistikrækken stiger med én.
5. Et nåleikon vises på posten, der indikerer dens TODO-status.

### Frigørelse af feedback

1. Find den fastgjorte feedbackpost (brug fanen TODO-liste eller Kun TODO's-filtret).
2. Klik på **Frigør**-ikonet på postrækken, eller åbn detaljevisningen og klik på **Fjern fra TODO**.
3. Posten fjernes fra TODO-listen.
4. TODO-tælleren i statistikrækken falder med én.

### Hvornår bruge TODO-nåle

- Et feedbackemne kræver undersøgelse, før der svares.
- Du har brug for input fra et andet teammedlem, før du svarer.
- Problemet er relateret til en kommende udgivelse og bør spores.
- Et forslag skal diskuteres på næste planlægningsmøde.

---

## Arbejdsgangsopsummering

Den anbefalede arbejdsgang for håndtering af feedback er:

1. **Gennemgå** -- Tjek statistikrækken dagligt for ny åben feedback.
2. **Triager** -- Brug filtre til at prioritere fejl over forslag.
3. **Fastgør** -- Marker komplekse emner som TODO til senere opfølgning.
4. **Svar** -- Besvar ligetil emner øjeblikkeligt.
5. **Samarbejd** -- Brug fanen TODO-liste i teamgennemgange.
6. **Luk** -- Marker løste emner som lukket efter at have bekræftet, at brugerens problem er adresseret.

---

## Tastaturgenveje

| Genvej | Handling |
|--------|---------|
| `Enter` | Åbn valgt feedbackpost |
| `R` | Fokuser svartekstområdet (når post er åben) |
| `T` | Skift TODO-nål på valgt post |
| `Esc` | Luk detaljevisningen |

---

## Fejlfinding

| Problem | Løsning |
|---------|---------|
| Svar sendes ikke | Tjek din netværksforbindelse og prøv igen. Sørg for, at beskeden ikke er tom. |
| Filtre opdaterer ikke | Genindlæs siden. Hvis problemet fortsætter, ryd browsercachen. |
| TODO-tælling forkert | Tællingen opdateres ved sideindlæsning. Naviger væk og vend tilbage for at opdatere. |
| Kan ikke se lukket feedback | Sæt statusfiltret til "Lukket" eller "Alle" for at se lukkede poster. |

---

## Relaterede sider

- [Notifikationer](./notifications.md) -- Send meddelelser til brugere
- [Administratorer](./admin-users.md) -- Administrer, hvem der kan besvare feedback
- [Indstillinger](./settings.md) -- Konfigurer systemomfattende præferencer
