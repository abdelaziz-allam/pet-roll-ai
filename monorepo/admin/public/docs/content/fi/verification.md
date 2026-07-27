# Kasvattajavahvistus

Kasvattajavahvistus-moduuli mahdollistaa ylläpitäjien tarkastella, hyväksyä, hylätä ja peruuttaa kasvattajavahvistuspyyntöjä. Vahvistetut kasvattajat saavat luottamusmerkin, joka näkyy ostajille ja osoittaa, että heidän kennelinsä täyttää alustan vaatimukset.

![Verification](/docs/screenshots/verification.png)

---

## Vahvistuspyyntöjen taulukko

Päänäkymä näyttää kaikki vahvistuslähetykset haettavassa, lajiteltavassa taulukossa.

| Sarake | Kuvaus |
|--------|--------|
| Kasvattajan nimi | Pyynnön lähettäneen kasvattajan koko nimi |
| Kenneli | Kasvattajaan liitetty rekisteröity kennelin nimi |
| Lähetys # | Automaattisesti kasvava lähetysnumero (uudelleenlähetykset saavat uuden numeron) |
| Asiakirjamäärä | Lähetykseen liitettyjen ladattujen asiakirjojen määrä |
| Tila | Nykyisen vahvistustilan merkki |
| Vanheneminen | Vahvistuksen vanhenemispäivä (näkyy vain hyväksytyille lähetyksille) |

### Taulukon suodattaminen

1. Käytä **Tila**-pudotusvalikkoa suodattaaksesi: Odottaa, Hyväksytty, Hylätty, Peruutettu tai Vanhentunut.
2. Käytä **Haku**-kenttää kasvattajan etsimiseen nimen tai kennelin perusteella.
3. Napsauta mitä tahansa sarakeotsikkoa lajitellaksesi nousevasti tai laskevasti.

> **Vinkki:** Oletusnäkymä näyttää Odottaa-tilaiset lähetykset ensin, jotta voit priorisoida uudet pyynnöt.

---

## Tilan työnkulku

Vahvistuspyynnöt noudattavat määriteltyä elinkaarta:

```
Odottaa --> Hyväksytty --> Vanhentunut (automaattinen, vanhenemispäivän jälkeen)
   |            |
   |            +--> Peruutettu (manuaalinen ylläpitäjätoiminto)
   |
   +--> Hylätty (kasvattaja voi lähettää uudelleen)
```

### Tilamäärittelyt

| Tila | Merkin väri | Merkitys |
|------|-------------|----------|
| Odottaa | Oranssi | Odottaa ylläpitäjän tarkastelua |
| Hyväksytty | Vihreä | Kasvattaja on vahvistettu ja merkki on aktiivinen |
| Hylätty | Punainen | Lähetys ei täyttänyt vaatimuksia |
| Peruutettu | Tummanpunainen | Ylläpitäjä poisti vahvistetun tilan manuaalisesti |
| Vanhentunut | Harmaa | Vahvistusjakso päättyi; kasvattajan on lähetettävä uudelleen |

### Siirtymät

- **Odottaa** voi siirtyä tilaan **Hyväksytty** tai **Hylätty**.
- **Hyväksytty** voi siirtyä tilaan **Peruutettu** (manuaalinen) tai **Vanhentunut** (automaattinen).
- **Hylätty** ja **Vanhentunut** sallivat kasvattajan luoda uuden lähetyksen (uusi Odottaa-merkintä).
- **Peruutettu** on kyseisen lähetyksen lopullinen tila.

---

## Lähetyksen tarkastelu

Kasvattajavahvistuspyynnön tarkastelu:

1. Etsi lähetys Vahvistuspyyntöjen taulukosta.
2. Napsauta riviä tai **Tarkasta**-toimintopainiketta oikealla puolella.
3. **Lähetyksen tietomodaali** avautuu kahdella välilehdellä:
   - **Nykyinen lähetys** -- Näyttää aktiiviset asiakirjat ja kasvattajan tiedot.
   - **Lähetyshistoria** -- Näyttää kaikki aiemmat lähetykset tältä kasvattajalta.

### Nykyinen lähetys -välilehti

Tämä välilehti näyttää:

- Kasvattajan profiilitiedot (nimi, sähköposti, puhelin, kennelin rekisterinumero)
- Ladatut asiakirjat ruudukkoasettelussa
- Lähetyspäivä ja -aika
- Kasvattajan lähetyksen mukana lisäämät huomautukset

### Lähetyshistoria-välilehti

Tämä välilehti näyttää aikajärjestyksellisen listan kaikista saman kasvattajan lähetyksistä, mukaan lukien:

- Lähetysnumero
- Lähetyspäivä
- Lopullinen tila
- Tarkastajan nimi
- Hylkäyksen syy (jos sovellettavissa)

> **Vinkki:** Käytä Lähetyshistoria-välilehteä tarkistaaksesi, onko kasvattaja käsitellyt aiemmat hylkäyssyyt ennen uudelleenlähetyksen hyväksymistä.

---

## Asiakirjan esikatselu

Jokainen ladattu asiakirja näkyy pikkukuvana asiakirjaruudukossa.

1. Napsauta mitä tahansa asiakirjan pikkukuvaa avataksesi täysikokoisen kuvan esikatselun.
2. Käytä zoomaussäätimiä asiakirjan yksityiskohtien tarkastamiseen.
3. Navigoi asiakirjojen välillä vasemmalla/oikealla nuolilla esikatselukerroksessa.
4. Paina **Escape** tai napsauta sulkemispainiketta palataksesi tietomodaaliin.

Tuetut asiakirjamuodot:

- JPEG- ja PNG-kuvat
- PDF-asiakirjat (renderöidään sivukuvina)

> **Vinkki:** Kiinnitä huomiota selkeyteen, aitouteen ja täydellisyyteen ladattuja asiakirjoja tarkastellessasi. Epäselvät tai puutteelliset asiakirjat tulisi hylätä selkein ohjein uudelleenlähetystä varten.

---

## Lähetyksen hyväksyminen

Kasvattajavahvistuspyynnön hyväksyminen:

1. Avaa lähetyksen tietomodaali napsauttamalla riviä taulukossa.
2. Tarkasta kaikki ladatut asiakirjat huolellisesti.
3. Napsauta **Hyväksy**-painiketta modaalin alaosassa.
4. Vahvistusikkunassa:
   - Aseta vahvistuksen **vanhenemispäivä**. Oletus on 1 vuosi tästä päivästä.
   - Voit halutessasi muuttaa päivää, jos lyhyempi tai pidempi jakso on asianmukainen.
5. Napsauta **Vahvista hyväksyntä**.

### Mitä tapahtuu hyväksynnän jälkeen

- Kasvattajan profiili saa vahvistettu-merkin välittömästi.
- Kasvattajalle ilmoitetaan sähköpostitse ja sovelluksen sisäisellä ilmoituksella.
- Lähetyksen tila vaihtuu tilaan **Hyväksytty** taulukossa.
- Vanhenemispäivä näkyy Vanheneminen-sarakkeessa.
- Vanhenemispäivän koittaessa tila siirtyy automaattisesti tilaan **Vanhentunut**.

> **Vinkki:** Uusille kasvattajille, joilla on rajallinen dokumentaatio, harkitse lyhyempää vanhenemisaikaa (6 kuukautta) aiemman uudelleenvahvistuksen edistämiseksi.

---

## Lähetyksen hylkääminen

Kasvattajavahvistuspyynnön hylkääminen:

1. Avaa lähetyksen tietomodaali.
2. Tarkasta asiakirjat ja tunnista ongelmakohdat.
3. Napsauta **Hylkää**-painiketta modaalin alaosassa.
4. Hylkäysikkunassa:
   - Syötä **hylkäyksen syy** tekstialueelle. Tämä kenttä on pakollinen.
   - Ole tarkka siitä, mikä puuttuu tai on riittämätöntä.
5. Napsauta **Vahvista hylkäys**.

### Mitä tapahtuu hylkäyksen jälkeen

- Lähetyksen tila vaihtuu tilaan **Hylätty**.
- Hylkäyksen syy on näkyvissä kasvattajalle hänen hallintapaneelissaan.
- Kasvattaja saa ilmoituksen hylkäyksen selityksineen.
- Kasvattaja voi luoda uuden lähetyksen ongelmien korjaamiseksi.

### Hyvien hylkäyssyiden kirjoittaminen

| Tee | Älä tee |
|-----|---------|
| "Kennelin rekisteröintiasiakirja on vanhentunut (2019). Lataa voimassa oleva rekisteröinti." | "Asiakirjat eivät riitä." |
| "Kuva tilasta on liian epäselvä olosuhteiden tarkistamiseksi. Lähetä uudelleen selkeämmillä kuvilla." | "Huonot kuvat." |
| "Jalostuseläinten rokotustiedot puuttuvat." | "Puutteellinen." |

> **Vinkki:** Selkeät hylkäyssyyt vähentävät edestakaisin viestintää ja auttavat kasvattajia lähettämään täydelliset hakemukset seuraavalla kerralla.

---

## Vahvistuksen peruuttaminen

Peruuttaminen poistaa välittömästi kasvattajan vahvistetun tilan. Käytä tätä käytäntörikkomuksiin tai hyväksynnän jälkeen havaittuun vilpilliseen dokumentaatioon.

1. Siirry Vahvistuspyyntöjen taulukkoon.
2. Suodata **Tila: Hyväksytty** löytääksesi aktiiviset vahvistukset.
3. Napsauta riviä avataksesi lähetyksen tiedot.
4. Napsauta **Peruuta**-painiketta (näkyy vain Hyväksytty-tilaisille lähetyksille).
5. Peruutusikkunassa:
   - Syötä **peruutuksen syy**. Tämä on pakollinen.
   - Vahvista, että ymmärrät toiminnon olevan välitön.
6. Napsauta **Vahvista peruutus**.

### Mitä tapahtuu peruutuksen jälkeen

- Vahvistettu-merkki poistetaan kasvattajan profiilista välittömästi.
- Kasvattajalle ilmoitetaan sähköpostitse peruutuksen syyn kanssa.
- Kaikki kasvattajan aktiiviset ilmoitukset näyttävät varoitusindikaattorin.
- Lähetyksen tila vaihtuu tilaan **Peruutettu** (lopullinen tila).
- Kasvattaja ei voi lähettää uudelleen samaa lähetystä vastaan; hänen on aloitettava alusta.

> **Vinkki:** Peruuttaminen on vakava toimenpide. Dokumentoi syy perusteellisesti mahdollisten kiistojen varalta. Harkitse yhteydenottoa kasvattajaan ennen peruuttamista, jos asia on vähäinen.

---

## Aikajananäkymä

Aikajananäkymä tarjoaa visuaalisen historian kasvattajan vahvistusmatkasta.

1. Avaa mikä tahansa lähetyksen tietomodaali.
2. Vaihda **Lähetyshistoria**-välilehdelle.
3. Aikajana näyttää tapahtumat aikajärjestyksessä:
   - Lähetys luotu
   - Asiakirjat ladattu
   - Ylläpitäjän tarkastelu aloitettu
   - Tila vaihdettu (tarkastajan nimellä)
   - Vanhenemisvaroitukset lähetetty
   - Uudelleenlähetykset linkitetty

### Aikajanan lukeminen

Jokainen aikajananmerkintä näyttää:

- **Päivä ja aika** tapahtumalle
- **Tapahtumatyyppi**-kuvake (asiakirja, tilanmuutos, ilmoitus)
- **Toimija** (kasvattajan nimi tai ylläpitäjän nimi)
- **Yksityiskohdat** (syyteksti, asiakirjanimet, asetettu vanhenemispäivä)

### Aikajanan käyttötapaukset

- **Kiistojen ratkaiseminen:** Näe koko historia, kun kasvattaja kiistää hylkäyksen.
- **Tarkastusjälki:** Seuraa, mikä ylläpitäjä tarkasti ja hyväksyi/hylkäsi kunkin lähetyksen.
- **Kuvioiden tunnistaminen:** Tunnista kasvattajat, jotka lähettävät toistuvasti riittämätöntä dokumentaatiota.

> **Vinkki:** Aikajana on vain luku -tilassa. Kaikki toiminnot (hyväksy, hylkää, peruuta) on suoritettava Nykyinen lähetys -välilehdeltä.

---

## Pikanäppäimet

| Pikanäppäin | Toiminto |
|-------------|----------|
| Enter | Avaa valittu lähetys |
| Escape | Sulje modaali |
| Tab | Vaihda modaalin välilehtien välillä |
| Nuolinäppäimet | Navigoi asiakirjojen välillä esikatselussa |

---

## Usein kysytyt kysymykset

**K: Voinko hyväksyä lähetyksen ehdollisesti?**
V: Ei. Hyväksynnät ovat ehdottomia. Jos asiakirjat ovat osittain hyväksyttäviä, hylkää erityisillä ohjeilla korjauksista ja hyväksy sitten uudelleenlähetys.

**K: Mitä tapahtuu kasvattajan ilmoituksille, kun vahvistus vanhenee?**
V: Ilmoitukset pysyvät aktiivisina, mutta vahvistettu-merkki poistetaan. Kasvattajalle ilmoitetaan 30 päivää ennen vanhenemista uudelleenlähetyksen rohkaisemiseksi.

**K: Voiko peruutettu kasvattaja hakea uudelleen?**
V: Kyllä, mutta hänen on luotava kokonaan uusi lähetys. Aiempi peruutettu lähetys säilyy historiassa tarkastustarkoituksiin.

**K: Kuka voi suorittaa vahvistustoimintoja?**
V: Vain ylläpitäjät, joilla on Vahvistuspäällikkö-rooli, voivat hyväksyä, hylätä tai peruuttaa lähetyksiä.
