# Sundhedscertificeringer

Modulet Sundhedscertificeringer giver administratorer mulighed for at administrere og verificere sundhedscertifikater for kæledyr indsendt af dyrlæger eller kæledyrsejere. Dette sikrer, at kæledyr opført på platformen har gyldig, opdateret sundhedsdokumentation.

![Health Records](/docs/screenshots/health-certifications.png)

---

## Certificeringstabel

Hovedvisningen viser alle indleveringer af sundhedscertificeringer i en datatabel.

| Kolonne | Beskrivelse |
|---------|-------------|
| Kæledyrsnavn | Navn på det kæledyr, certificeringen tilhører |
| Dyrlægeinfo | Dyrlægenavn og klinik |
| Placering | Land og by, hvor certificeringen blev udstedt |
| Cert.-dato | Dato, certificeringen blev udstedt af dyrlægen |
| Dokumenter | Antal vedhæftede certificeringsdokumenter |
| Status | Aktuel certificeringsstatus-badge |

### Tabelhandlinger

- Klik på en række for at åbne **Detaljevisningen** i højre side.
- Brug handlingsknapperne i sidste kolonne til hurtig godkendelse/afvisning.
- Sorter efter enhver kolonne ved at klikke på kolonneoverskriften.

---

## Filtre

Filterbjælken over tabellen giver fire filtermuligheder:

### Statusfilter

Filtrer certificeringer efter deres aktuelle status:

| Status | Badge-farve | Beskrivelse |
|--------|-------------|-------------|
| Afventende | Orange | Afventer administratorgennemgang |
| Godkendt | Grøn | Certificering verificeret og aktiv |
| Afvist | Rød | Certificering bestod ikke gennemgangen |
| Tilbagekaldt | Mørkerød | Tidligere godkendt certificering ugyldiggjort |
| Udløbet | Grå | Certificeringens gyldighedsperiode er slut |

### Artsfilter

Filtrer efter kæledyrsart:

- Hund
- Kat
- Fugl
- Kanin
- Andet

### Landefilter

Vælg et eller flere lande at filtrere efter den placering, hvor certificeringen blev udstedt.

### Byfilter

Indsnævr yderligere ved at vælge specifikke byer inden for det valgte land.

> **Tip:** Filtre kan kombineres. Filtrer f.eks. efter Status: Afventende + Art: Hund + Land: Tyskland for at se alle afventende hundecertificeringer fra Tyskland.

---

## Detaljevisning

Klik på en certificeringsrække for at åbne en detaljevisning i højre side af skærmen. Visningen indeholder omfattende information organiseret i sektioner.

### Statusbanner

Øverst i visningen viser et farvet banner:

- Aktuel status med badge-ikon
- Dato for seneste statusændring
- Navn på den administrator, der sidst behandlede certificeringen (hvis relevant)
- Afvisnings- eller tilbagekaldelsesårsag (hvis relevant, vist i en advarselsalarm)

### Kæledyrsinformationssektion

| Felt | Beskrivelse |
|------|-------------|
| Kæledyrsnavn | Registreret navn på kæledyret |
| Art | Kæledyrets art |
| Race | Kæledyrets race |
| Fødselsdato | Kæledyrets fødselsdato |
| Microchip-ID | Unikt microchip-identifikator (hvis tilgængeligt) |
| Ejer | Navn på kæledyrets ejer med link til deres profil |

### Dyrlægedetaljsektion

| Felt | Beskrivelse |
|------|-------------|
| Dyrlægenavn | Fulde navn på den udstedende dyrlæge |
| Kliniknavn | Navn på dyrlægeklinikken |
| Klinikadresse | Fuld adresse på klinikken |
| Licensnummer | Dyrlægens professionelle licensnummer |
| Telefon | Klinikkens kontakttelefon |
| E-mail | Klinikkens kontakt-e-mail (hvis angivet) |

> **Tip:** Verificer licensnummeret mod dit lands dyrlægelicensdatabase, når du gennemgår certificeringer fra ukendte klinikker.

### Gyldighedsstatusbjælke

Under dyrlægedetaljerne visualiserer en statusbjælke certificeringens gyldighedsperiode:

1. Bjælken strækker sig fra **Cert.-datoen** (start) til **Udløbsdatoen** (slut).
2. Den aktuelle dato er angivet med en markør på bjælken.
3. Farvekodning:
   - **Grøn:** Mere end 30 dage tilbage
   - **Gul:** 30 dage eller færre tilbage
   - **Rød:** Udløbet
4. Procentdel af brugt gyldighed vises som tekst.

### Dokumentgitter

Dokumentsektionen viser uploadede certificeringsfiler i et gitterlayout.

1. Hvert dokument vises som et miniaturekort med filnavnet nedenunder.
2. Klik på en miniature for at åbne **Billedforhåndsvisning**-overlejringen.
3. I forhåndsvisningsoverlejringen:
   - Brug zoom ind/ud-kontroller til at inspicere detaljer.
   - Naviger mellem dokumenter med venstre/højre pile.
   - Download den originale fil med downloadknappen.
   - Tryk på **Escape** for at lukke forhåndsvisningen.
4. Understøttede formater: JPEG, PNG, PDF.

> **Tip:** Se efter officielle dyrlægestempler, underskrifter og licensnumre på certificeringsdokumenter. Generiske dokumenter eller skabelondokumenter uden disse elementer bør markeres til afvisning.

---

## Godkendelse af en certificering

For at godkende en sundhedscertificering:

1. Åbn certificeringens detaljevisning ved at klikke på rækken.
2. Gennemgå dyrlægedetaljerne for fuldstændighed og troværdighed.
3. Inspicer alle uploadede dokumenter i dokumentgitteret.
4. Klik på knappen **Godkend** i bunden af visningen.
5. I bekræftelsesdialogen:
   - Gennemgå resuméet af, hvad du godkender.
   - Udløbsdatoen beregnes automatisk baseret på certificeringstypen.
   - Klik på **Bekræft**.

### Godkendelsestjekliste

Før godkendelse, verificer:

- [ ] Dyrlægenavn og licensnummer er til stede
- [ ] Klinikdetaljer er fuldstændige og verificerbare
- [ ] Dokumenter er læsbare og indeholder officielle stempler/underskrifter
- [ ] Certificeringsdato er nylig (inden for de seneste 12 måneder)
- [ ] Kæledyrsinformation på dokumentet matcher platformregistreringen
- [ ] Ingen tegn på dokumentmanipulation eller forfalskning

### Hvad sker der efter godkendelse

- Certificeringsstatus ændres til **Godkendt**.
- En gyldighedsperiode angives baseret på certificeringstypen.
- Kæledyrets profil viser et sundhedscertificerings-badge.
- Ejeren modtager en notifikation, der bekræfter godkendelsen.
- Gyldighedsstatusbjælken bliver aktiv i detaljevisningen.

---

## Afvisning af en certificering

For at afvise en sundhedscertificering:

1. Åbn certificeringens detaljevisning.
2. Identificer problemet/problemerne med indleveringen.
3. Klik på knappen **Afvis** i bunden af visningen.
4. I afvisningsdialogen:
   - Indtast en **Afvisningsårsag** i tekstområdet. Dette felt er påkrævet.
   - Vær specifik om, hvad der skal rettes.
5. Klik på **Bekræft afvisning**.

### Almindelige afvisningsårsager

| Årsag | Eksempelbesked |
|-------|----------------|
| Ulæselige dokumenter | "Det uploadede dokument er for sløret til at læse. Upload venligst en klarere scanning eller foto." |
| Manglende dyrlægedetaljer | "Certifikatet indeholder ikke dyrlægens licensnummer. Genindlever venligst med fuldstændige dyrlægeoplysninger." |
| Udløbet certificering | "Denne certificering blev udstedt for mere end 12 måneder siden. Indhent og upload venligst et aktuelt certifikat." |
| Uoverensstemmende kæledyrsinfo | "Kæledyrsnavnet på certifikatet matcher ikke det registrerede kæledyrsnavn. Verificer venligst og genindlever." |
| Ufuldstændige dokumenter | "Kun side 1 af 3 blev uploadet. Upload venligst alle sider af certificeringen." |

### Hvad sker der efter afvisning

- Certificeringsstatus ændres til **Afvist**.
- Afvisningsårsagen vises til kæledyrsejeren.
- Ejeren modtager en notifikation med årsagen.
- Ejeren kan indsende en ny certificering til at erstatte den afviste.

> **Tip:** Giv altid handlingsbar feedback. Fortæl ejeren præcis, hvad der skal rettes, så de kan løse problemet ved én genindlevering.

---

## Tilbagekaldelse af en certificering

Tilbagekaldelse bruges, når en tidligere godkendt certificering viser sig at være ugyldig, svigagtig eller ikke længere gældende.

1. Naviger til certificeringen (filtrer efter Status: Godkendt om nødvendigt).
2. Åbn detaljevisningen.
3. Klik på knappen **Tilbagekald** (kun synlig for godkendte certificeringer).
4. I tilbagekaldelsesdialogen:
   - Indtast **årsagen til tilbagekaldelse**. Dette felt er påkrævet.
   - Anerkend, at denne handling er øjeblikkelig og ikke kan fortrydes.
5. Klik på **Bekræft tilbagekaldelse**.

### Hvornår tilbagekalde

- Svigagtig dokumentation opdaget efter godkendelse
- Dyrlægelicens fundet at være ugyldig eller tilbagekaldt
- Kæledyrsejer rapporterer, at certificeringen blev indsendt ved en fejl
- Reguleringsmyndighed markerer certificeringen

### Hvad sker der efter tilbagekaldelse

- Sundhedscertificerings-badget fjernes øjeblikkeligt fra kæledyrets profil.
- Certificeringsstatus ændres til **Tilbagekaldt**.
- Tilbagekaldelsesårsagen gemmes og er synlig i detaljevisningen.
- Ejeren underrettes via e-mail og in-app-notifikation.
- Ejeren skal indsende en ny certificering, hvis de ønsker at gendanne badget.

> **Tip:** Tilbagekaldelse er en alvorlig handling, der påvirker kæledyrets tillidssignaler på platformen. Sørg for tilstrækkelig dokumentation, før du fortsætter.

---

## Forståelse af gyldighed og udløb

Sundhedscertificeringer har en defineret gyldighedsperiode, der bestemmer, hvor længe certificeringen forbliver aktiv efter godkendelse.

### Sådan fungerer gyldighed

1. Når en certificering godkendes, beregner systemet en udløbsdato.
2. Gyldighedsperioden afhænger af certificeringstypen:
   - Generelt sundhedscertifikat: 12 måneder
   - Vaccinationscertifikat: Varierer efter vaccinationsplan
   - Avlsegnethedscertifikat: 6 måneder
3. **Gyldighedsstatusbjælken** i detaljevisningen viser resterende tid visuelt.

### Udløbsnotifikationer

Systemet sender automatiske notifikationer, når udløb nærmer sig:

| Dage før udløb | Notifikation |
|----------------|--------------|
| 30 dage | Første påmindelse til ejeren om at forny |
| 14 dage | Anden påmindelse med øget vigtighed |
| 7 dage | Sidste advarsel |
| 0 dage | Certificering udløbet-notifikation |

### Efter udløb

- Certificeringsstatus ændres automatisk til **Udløbet**.
- Sundhedsbadget fjernes fra kæledyrets profil.
- Den udløbne certificering forbliver i historikken som reference.
- Ejeren kan indsende en ny certificering når som helst.

> **Tip:** Overvåg certificeringstabellen filtreret efter "Godkendt" og sorteret efter udløbsdato for proaktivt at identificere certificeringer, der nærmer sig udløb i din region.

---

## Massehandlinger

For effektiv behandling af flere certificeringer:

1. Brug afkrydsningsfelterne i venstre side af tabellen til at vælge flere rækker.
2. Massehandlingsbjælken vises øverst i tabellen.
3. Tilgængelige massehandlinger:
   - **Godkend alle** -- Godkender alle valgte afventende certificeringer med standardudløb.
   - **Eksporter** -- Downloader valgte certificeringer som en CSV-rapport.

> **Tip:** Massegodkendelse bør kun bruges, når du individuelt har verificeret hvert valgt certificeringsdokument. Massegodkend aldrig uden at gennemgå dokumenter.

---

## Ofte stillede spørgsmål

**Sp: Kan jeg redigere udløbsdatoen for en godkendt certificering?**
Sv: Nej. For at ændre udløbet skal du tilbagekalde den aktuelle certificering og bede ejeren om at genindlevere.

**Sp: Hvad hvis et certificeringsdokument er på et sprog, jeg ikke kan læse?**
Sv: Eskalér til en administrator, der læser det pågældende sprog, eller anmod ejeren om at levere en certificeret oversættelse.

**Sp: Kan et kæledyr have flere aktive certificeringer?**
Sv: Ja. Et kæledyr kan have både et generelt sundhedscertifikat og specifikke vaccinationscertifikater aktive samtidigt.

**Sp: Hvem modtager afvisnings-/tilbagekaldelsesnotifikationer?**
Sv: Kæledyrets registrerede ejer modtager alle notifikationer via e-mail og in-app-beskeder.
