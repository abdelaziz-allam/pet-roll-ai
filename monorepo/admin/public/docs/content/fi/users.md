# Sovelluskäyttäjät

Sovelluskäyttäjät-moduuli tarjoaa täydellisen hallinnan kaikille Petfolioo-alustan käyttäjätileille. Ylläpitäjät voivat tarkastella käyttäjäprofiileja, luoda uusia tilejä, muokata tietoja, määrittää rooleja ja suorittaa moderointitoimia. Tämä moduuli on käytettävissä `super_admin`- tai `admin`-roolien käyttäjille.

![App Users](/docs/screenshots/users.png)

---

## Käyttäjälistaus-taulukko

Käyttäjälistaus-taulukko näyttää kaikki rekisteröidyt alustan käyttäjät avaintiedot yhdellä silmäyksellä.

### Taulukon sarakkeet

| Sarake | Kuvaus | Lajiteltava |
|--------|--------|:-----------:|
| Profiilikuva | Käyttäjän profiilikuva (pyöreä pikkukuva) | Ei |
| Nimi | Näyttönimi | Kyllä |
| Sähköposti | Rekisteröity sähköpostiosoite | Kyllä |
| Rooli | Määrätty alustarooli (käyttäjä, moderaattori, ylläpitäjä) | Kyllä |
| Tila | Tilin tila (Aktiivinen, Odottaa, Estetty) | Kyllä |
| Vahvistettu kasvattaja | Merkki vahvistetusta kasvattajastatuksesta | Kyllä |
| Lemmikkimäärä | Käyttäjän rekisteröimien lemmikkien määrä | Kyllä |
| Liittymispäivä | Tilin luontipäivä | Kyllä |

### Tilaindikaattorit

| Tila | Merkin väri | Merkitys |
|------|-------------|----------|
| Aktiivinen | Vihreä | Tili on täysin toiminnallinen |
| Odottaa | Oranssi | Sähköpostivahvistusta ei ole suoritettu |
| Estetty | Punainen | Ylläpitäjä on keskeyttänyt tilin |

### Vahvistettu kasvattaja -merkki

| Indikaattori | Merkitys |
|--------------|----------|
| Sininen valintamerkki | Käyttäjä on suorittanut kasvattajavahvistuksen ja on vahvistettu |
| Ei merkkiä | Käyttäjä ei ole hakenut tai saanut kasvattajavahvistusta |
| Kellokuvake | Kasvattajavahvistushakemus odottaa tarkastelua |

### Taulukon navigointi

1. **Lajittele** napsauttamalla mitä tahansa lajiteltavaa sarakeotsikkoa. Napsauta uudelleen kääntääksesi järjestyksen.
2. **Hae** käyttämällä hakupalkkia taulukon yläpuolella käyttäjien etsimiseen nimen tai sähköpostin perusteella.
3. **Suodata** käyttämällä tila- ja roolipudotusvalikoita tulosten rajaamiseen.
4. **Sivuta** käyttämällä alareunassa olevia säätimiä (10, 20, 50 merkintää per sivu).

> **Vinkki:** Yhdistä hakupalkki tilasuodattimien kanssa löytääksesi nopeasti tietyt käyttäjät. Esimerkiksi hae "john" tilalla "Estetty" löytääksesi estetyt käyttäjät nimeltä John.

---

## Käyttäjätietojen tarkastelu

Käyttäjän tietolaatikko tarjoaa kattavan näkymän käyttäjän profiilista ja toiminnasta.

### Tietolaatikon avaaminen

1. Napsauta mitä tahansa riviä käyttäjälistaus-taulukossa.
2. Tietolaatikko liukuu esiin näytön oikealta puolelta.
3. Laatikko sisältää useita osioita pystysuunnassa järjestettynä.

### Tietolaatikon osiot

| Osio | Sisältö |
|------|---------|
| Profiilin otsikko | Suuri profiilikuva, näyttönimi, sähköposti, roolimerkki, tilamerkki |
| Tilitiedot | Liittymispäivä, viimeinen kirjautuminen, sähköpostivahvistuksen tila, todennuspalvelu |
| Henkilötiedot | Puhelinnumero, aikavyöhyke, maa, kaupunki |
| Kasvattajastatus | Vahvistuksen tila, hakemuspäivä, lähetetyt asiakirjat |
| Lemmikkiyhteenveto | Rekisteröityjen lemmikkien määrä pikalinkeillä jokaiseen |
| Toimintaloki | Käyttäjän viimeaikaiset toiminnot alustalla |

### Profiilin otsikko

Laatikon yläosassa näkyy:

- **Profiilikuva** täydessä koossa (tai oletussiluetti jos ei ladattu)
- **Näyttönimi** suurella tekstillä
- **Sähköposti** nimen alla
- **Roolimerkki** värikoodattuna käyttöoikeustason mukaan
- **Tilamerkki** näyttäen nykyisen tilin tilan

### Tilitietokentät

| Kenttä | Kuvaus | Esimerkki |
|--------|--------|-----------|
| Käyttäjä-ID | Uniikki järjestelmätunniste | "usr_a1b2c3d4" |
| Liittymispäivä | Milloin tili luotiin | "2023-01-15 09:30 UTC" |
| Viimeinen kirjautuminen | Viimeisin kirjautumisajankohta | "2024-07-20 14:22 UTC" |
| Sähköposti vahvistettu | Onko sähköposti vahvistettu | "Kyllä" / "Ei" |
| Todennuspalvelu | Käytetty todennusmenetelmä | "Sähköposti/Salasana" tai "Google" |
| Firebase UID | Firebase Authentication -käyttäjätunnus | "Abc123Def456" |

---

## Uuden käyttäjän luominen

Ylläpitäjät voivat luoda käyttäjätilejä suoraan hallintaportaalista. Koska alusta käyttää Firebase Authentication -palvelua, salasanaa ei aseteta luomisen yhteydessä - käyttäjät saavat sähköpostin oman salasanansa asettamiseksi.

### Käyttäjän luomisen vaiheet

1. Napsauta **Luo käyttäjä** -painiketta Käyttäjät-sivun oikeassa yläkulmassa.
2. Luomismodaali tai -lomake tulee näkyviin.
3. Täytä vaaditut kentät:

| Kenttä | Vaadittu | Kuvaus |
|--------|:--------:|--------|
| Näyttönimi | Kyllä | Käyttäjän koko nimi tai valittu näyttönimi |
| Sähköposti | Kyllä | Kelvollinen sähköpostiosoite (oltava uniikki alustalla) |

4. Napsauta **Luo** lähettääksesi lomakkeen.
5. Järjestelmä:
   - Luo Firebase Authentication -tietueen
   - Lähettää tervetulosähköpostin käyttäjälle linkillä salasanan asettamiseen
   - Luo käyttäjäprofiilin alustan tietokantaan
   - Määrää oletusroolin "käyttäjä"
6. Uusi käyttäjä ilmestyy listaustaulukkoon tilassa "Odottaa" kunnes he vahvistavat sähköpostinsa.

### Validointisäännöt

| Kenttä | Sääntö |
|--------|--------|
| Näyttönimi | 2-100 merkkiä, ei voi olla tyhjä |
| Sähköposti | Oltava kelvollinen sähköpostimuoto, ei saa olla jo järjestelmässä |

> **Huomautus:** Salasanakenttää ei tarvita. Firebase Authentication hoitaa salasanan asettamisen käyttäjälle lähetetyn tervetulosähköpostin kautta. Tämä varmistaa, että käyttäjä valitsee oman turvallisen salasanansa.

> **Vinkki:** Jos sinun täytyy luoda käyttäjä, jolla pitäisi olla korkeammat käyttöoikeudet, luo ensin oletusasetuksilla ja vaihda sitten rooli erikseen (katso Roolin vaihtaminen alla).

---

## Käyttäjän muokkaaminen

Ylläpitäjät voivat muokata käyttäjäprofiilin tietoja tarvittaessa. Tätä käytetään yleisesti tietojen korjaamiseen tai päivittämiseen käyttäjän puolesta.

### Käyttäjän muokkaamisen vaiheet

1. Avaa käyttäjän tietolaatikko napsauttamalla hänen riviään listaustaulukossa.
2. Napsauta **Muokkaa**-painiketta (kynäkuvake) laatikon otsikossa.
3. Laatikko vaihtuu muokkaustilaan muokattavilla lomakekentillä.
4. Muokkaa mitä tahansa käytettävissä olevista kentistä:

| Kenttä | Muokattava | Huomautukset |
|--------|:----------:|--------------|
| Näyttönimi | Kyllä | Käyttäjän julkinen nimi |
| Puhelin | Kyllä | Kansainvälinen muoto suositeltava (esim. +971501234567) |
| Aikavyöhyke | Kyllä | Pudotusvalikko IANA-aikavyöhykkeistä (esim. Asia/Dubai) |
| Maa | Kyllä | Pudotusvalikko kaikista maista |
| Kaupunki | Kyllä | Tekstikenttä, ehdotukset päivittyvät maan perusteella |
| Sähköposti | Ei | Ei voi muuttaa (käytetään kirjautumistunnisteena) |
| Käyttäjä-ID | Ei | Järjestelmän generoima, muuttumaton |

5. Napsauta **Tallenna muutokset** muokkausten käyttöönottamiseksi.
6. Onnistumisilmoitus vahvistaa päivityksen.
7. Laatikko palautuu katselutilaan näyttäen päivitetyt tiedot.

### Muokkaushistoria

Kaikki hallintaportaalin kautta tehdyt muokkaukset kirjataan:

| Lokikenttä | Kuvaus |
|------------|--------|
| Aikaleima | Milloin muutos tehtiin |
| Ylläpitäjä | Kuka ylläpitäjä teki muutoksen |
| Muutettu kenttä | Mikä kenttä muutettiin |
| Vanha arvo | Edellinen arvo |
| Uusi arvo | Päivitetty arvo |

> **Tärkeää:** Käyttäjäprofiilien muokkaukset näkyvät käyttäjälle. He näkevät päivitetyt tiedot sovelluksessaan. Harkitse käyttäjän ilmoittamista, jos teet muutoksia hänen puolestaan.

---

## Roolin vaihtaminen

Roolinmuutokset määrittävät, minkä tasoinen pääsy käyttäjällä on alustalla ja sen sovelluksissa.

### Käytettävissä olevat roolit

| Rooli | Kuvaus | Valmiudet |
|-------|--------|-----------|
| user | Tavallinen alustakäyttäjä | Voi hallita omia lemmikkejään, osallistua jalostusohjelmiin, tarkastella ilmoituksia |
| moderator | Yhteisön moderaattori | Kaikki käyttäjävalmiudet plus kyky tarkastella ja merkitä sisältöä |
| admin | Alustan ylläpitäjä | Kaikki moderaattorivalmiudet plus pääsy hallintaportaaliin |

### Käyttäjän roolin vaihtamisen vaiheet

1. Avaa käyttäjän tietolaatikko napsauttamalla hänen riviään.
2. Etsi **Rooli**-osio laatikosta.
3. Napsauta **Vaihda rooli** -painiketta (tai nykyistä roolimerkkiä).
4. Roolinvalintamodaali tulee näkyviin:
   - Valintapainikkeet kullekin käytettävissä olevalle roolille
   - Kuvausteksti selittäen kunkin roolin käyttöoikeudet
   - Vahvistusvalintaruutu muutoksen tunnustamiseksi
5. Valitse uusi rooli.
6. Lue roolin kuvaus varmistaaksesi, että se on asianmukainen.
7. Valitse **vahvistusvalintaruutu** ("Ymmärrän, että tämä muuttaa käyttäjän käyttöoikeustasoa").
8. Napsauta **Vahvista roolin vaihto**.
9. Käyttäjän rooli päivittyy välittömästi.

### Roolin vaihdon rajoitukset

| Sinun roolisi | Voi määrätä |
|---------------|-------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Ei voi vaihtaa rooleja |
| viewer | Ei voi vaihtaa rooleja |

> **Tärkeää:** Käyttäjän ylentäminen "admin"-rooliin antaa hänelle pääsyn hallintaportaaliin. Tee tämä vain luotetuille tiimin jäsenille, jotka tarvitsevat ylläpitäjäpääsyn.

> **Huomautus:** Käyttäjän vaihtaminen "admin"-roolista "user"-rooliin peruuttaa välittömästi hänen hallintaportaalipääsynsä. Jos he ovat tällä hetkellä kirjautuneena portaaliin, heidän istuntonsa päättyy seuraavassa sivunavigaatiossa.

---

## Käyttäjän estäminen ja eston poistaminen

Käyttäjän estäminen keskeyttää hänen tilinsä estäen kirjautumisen sovellukseen tai minkään alustan ominaisuuden käytön.

### Käyttäjän estäminen

1. Avaa käyttäjän tietolaatikko.
2. Vieritä **Toiminnot**-osioon laatikon alaosassa.
3. Napsauta **Estä käyttäjä** -painiketta (näkyy punaisena).
4. Vahvistusmodaali tulee näkyviin:
   - Käyttäjän nimi ja sähköposti vahvistukseksi
   - **Syy**-tekstikenttä (pakollinen)
   - **Kesto**-valitsin (pysyvä, 7 päivää, 30 päivää, 90 päivää)
5. Syötä selkeä, ammattimainen syy estolle.
6. Valitse eston kesto.
7. Napsauta **Vahvista esto**.

### Eston vaikutukset

| Vaikutus | Kuvaus |
|----------|--------|
| Kirjautuminen estetty | Käyttäjä ei voi kirjautua mobiilisovellukseen |
| Profiili piilotettu | Käyttäjän profiili ei ole näkyvissä muille käyttäjille |
| Lemmikit poistettu listoilta | Kaikki käyttäjän omistamat lemmikit piilotetaan ilmoituksista |
| Ilmoitukset | Käyttäjä saa sähköpostin, jossa selitetään esto ja annettu syy |
| Aktiiviset istunnot | Kaikki nykyiset istunnot lopetetaan välittömästi |

### Eston syyn ohjeet

| Ohje | Esimerkki |
|------|-----------|
| Ole tarkka | "Useita vilpillisiä jalostusilmoituksia raportoitu ja vahvistettu" |
| Viittaa käytäntöön | "Käyttöehtojen kohdan 4.2 rikkominen koskien aitoja ilmoituksia" |
| Vältä epämääräistä kieltä | ÄLÄ kirjoita "huono käytös" - ole tarkka siitä, mitä tapahtui |
| Pysy ammattimaisena | Syy lähetetään suoraan käyttäjälle |

> **Tärkeää:** Eston syy ilmoitetaan käyttäjälle sähköpostitse ja sovelluksen sisäisellä ilmoituksella. Sen on oltava tosiasioihin perustuva, tarkka ja ammattimainen.

### Käyttäjän eston poistaminen

1. Käytä **Tila**-suodatinta valitsemalla "Estetty" löytääksesi estetyt käyttäjät.
2. Napsauta estetyn käyttäjän riviä avataksesi hänen tietolaatikkonsa.
3. Laatikko näyttää **Estotiedot**-kortin:
   - Estopäivä
   - Eston asettanut ylläpitäjä
   - Eston syy
   - Eston kesto / vanheneminen
4. Napsauta **Poista esto** -painiketta (näkyy vihreänä).
5. Vahvistusmodaali tulee näkyviin.
6. Voit halutessasi syöttää huomautuksen, jossa selitetään miksi esto poistetaan.
7. Napsauta **Vahvista eston poisto**.
8. Käyttäjän tila palautuu tilaan "Aktiivinen" ja hän saa takaisin täyden alustapääsyn.
9. Käyttäjä saa ilmoituksen tilinsä palauttamisesta.

### Estohistoria

Jokainen esto- ja eston poistotoiminto kirjataan käyttäjän historiaan:

| Kenttä | Kuvaus |
|--------|--------|
| Estopäivä | Milloin esto asetettiin |
| Eston poistopäivä | Milloin esto poistettiin (jos sovellettavissa) |
| Ylläpitäjä | Kuka ylläpitäjä suoritti toiminnon |
| Syy | Ilmoitettu syy estolle |
| Kesto | Miten pitkäksi esto asetettiin |
| Ratkaisu | Miten se päättyi (manuaalinen eston poisto, vanheneminen, valitus) |

---

## Käyttäjien haku ja suodatus

### Hakupalkki

Käyttäjät-sivun yläosan hakupalkki tukee:

| Hakutyyppi | Esimerkki | Vastaavuudet |
|------------|-----------|--------------|
| Nimihaku | "Sarah" | Kaikki käyttäjät, joiden näyttönimessä on "Sarah" |
| Sähköpostihaku | "gmail.com" | Kaikki käyttäjät Gmail-osoitteilla |
| Osittainen vastaavuus | "pet" | Käyttäjät nimeltä "Peter", "Petrov" jne. |

### Suodatinpudotusvalikot

| Suodatin | Vaihtoehdot |
|----------|-------------|
| Rooli | Kaikki, Käyttäjä, Moderaattori, Ylläpitäjä |
| Tila | Kaikki, Aktiivinen, Odottaa, Estetty |
| Vahvistettu kasvattaja | Kaikki, Vahvistettu, Ei vahvistettu, Odottaa |

### Haun ja suodattimien yhdistäminen

1. Syötä tekstiä hakupalkkiin JA valitse suodatinarvoja samanaikaisesti.
2. Tulosten on vastattava KAIKKIA kriteereitä (JA-logiikka).
3. Tyhjennä yksittäiset suodattimet napsauttamalla niiden X-painiketta tai tyhjennä kaikki **Nollaa**-painikkeella.

---

## Käyttäjätietojen vieminen

Käyttäjätietojen vieminen raportointiin tai analyysiin:

1. Aseta halutut suodattimet.
2. Napsauta **Vie**-painiketta oikeassa yläkulmassa.
3. Valitse muoto: **CSV** tai **Excel**.
4. Valitse laajuus: **Nykyinen suodatettu näkymä** tai **Kaikki käyttäjät**.
5. Lataus alkaa automaattisesti.

### Viedyt kentät

| Kenttä | Sisältyy | Huomautukset |
|--------|:--------:|--------------|
| Näyttönimi | Kyllä | |
| Sähköposti | Kyllä | |
| Rooli | Kyllä | |
| Tila | Kyllä | |
| Maa | Kyllä | |
| Kaupunki | Kyllä | |
| Lemmikkimäärä | Kyllä | |
| Liittymispäivä | Kyllä | |
| Viimeinen kirjautuminen | Kyllä | |
| Puhelin | Ei | Jätetty pois yksityisyyssyistä |

> **Huomautus:** Puhelinnumerot ja yksityiskohtaiset henkilötiedot jätetään oletuksena pois vienneistä tietosuojavaatimusten noudattamiseksi.

---

*Edellinen: [Lemmikkirekisteri](./pets.md) | Seuraava: [Lemmikkikategoriat](./categories.md)*
