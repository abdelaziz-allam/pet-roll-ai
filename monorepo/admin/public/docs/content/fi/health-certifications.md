# Terveystodistukset

Terveystodistukset-moduuli mahdollistaa ylläpitäjien hallita ja vahvistaa eläinlääkäreiden tai lemmikin omistajien lähettämiä terveystodistuksia. Tämä varmistaa, että alustalla listatuilla lemmikeillä on voimassa oleva, ajantasainen terveysdokumentaatio.

![Health Records](/docs/screenshots/health-certifications.png)

---

## Todistustaulukko

Päänäkymä näyttää kaikki terveystodistuslähetykset datataulukossa.

| Sarake | Kuvaus |
|--------|--------|
| Lemmikin nimi | Sen lemmikin nimi, jolle todistus kuuluu |
| Eläinlääkäritiedot | Eläinlääkärin nimi ja klinikka |
| Sijainti | Maa ja kaupunki, jossa todistus myönnettiin |
| Todistuspäivä | Päivä, jolloin eläinlääkäri myönsi todistuksen |
| Asiakirjat | Liitettyjen todistusasiakirjojen määrä |
| Tila | Nykyisen todistustilan merkki |

### Taulukon toiminnot

- Napsauta mitä tahansa riviä avataksesi **Tietolaatikon** oikealla puolella.
- Käytä viimeisen sarakkeen toimintopainikkeita nopeaan hyväksyntään/hylkäykseen.
- Lajittele minkä tahansa sarakkeen mukaan napsauttamalla sarakeotsikkoa.

---

## Suodattimet

Taulukon yläpuolella oleva suodatinpalkki tarjoaa neljä suodatusvaihtoehtoa:

### Tilasuodatin

Suodata todistukset niiden nykyisen tilan mukaan:

| Tila | Merkin väri | Kuvaus |
|------|-------------|--------|
| Odottaa | Oranssi | Odottaa ylläpitäjän tarkastelua |
| Hyväksytty | Vihreä | Todistus vahvistettu ja aktiivinen |
| Hylätty | Punainen | Todistus ei läpäissyt tarkastelua |
| Peruutettu | Tummanpunainen | Aiemmin hyväksytty todistus mitätöity |
| Vanhentunut | Harmaa | Todistuksen voimassaoloaika on päättynyt |

### Lajisuodatin

Suodata lemmikkilajin mukaan:

- Koira
- Kissa
- Lintu
- Kani
- Muu

### Maasuodatin

Valitse yksi tai useampi maa suodattaaksesi todistuksen myöntämispaikan mukaan.

### Kaupunkisuodatin

Tarkenna edelleen valitsemalla tiettyjä kaupunkeja valitun maan sisällä.

> **Vinkki:** Suodattimet ovat yhdisteltävissä. Esimerkiksi suodata Tila: Odottaa + Laji: Koira + Maa: Saksa nähdäksesi kaikki odottavat koirien todistukset Saksasta.

---

## Tietolaatikko

Todistusrivin napsauttaminen avaa tietolaatikon näytön oikealla puolella. Laatikko sisältää kattavat tiedot osioihin järjestettynä.

### Tilabanneri

Laatikon yläosassa värillinen banneri näyttää:

- Nykyinen tila merkkikuvakkeella
- Viimeisimmän tilanmuutoksen päivämäärä
- Todistuksen viimeksi käsitelleen ylläpitäjän nimi (jos sovellettavissa)
- Hylkäyksen tai peruutuksen syy (jos sovellettavissa, näkyy varoitushalytyksenä)

### Lemmikin tiedot -osio

| Kenttä | Kuvaus |
|--------|--------|
| Lemmikin nimi | Lemmikin rekisteröity nimi |
| Laji | Lemmikin laji |
| Rotu | Lemmikin rotu |
| Syntymäpäivä | Lemmikin syntymäpäivä |
| Mikrosiru-ID | Uniikki mikrosirutunniste (jos saatavilla) |
| Omistaja | Lemmikin omistajan nimi linkillä hänen profiiliinsa |

### Eläinlääkäritiedot-osio

| Kenttä | Kuvaus |
|--------|--------|
| Eläinlääkärin nimi | Myöntävän eläinlääkärin koko nimi |
| Klinikan nimi | Eläinlääkäriklinikan nimi |
| Klinikan osoite | Klinikan täydellinen osoite |
| Lisenssinumero | Eläinlääkärin ammattilisenssinumero |
| Puhelin | Klinikan yhteyspuhelinnumero |
| Sähköposti | Klinikan yhteydenotto-sähköposti (jos annettu) |

> **Vinkki:** Vahvista lisenssinumero maasi eläinlääkärilisenssitietokannasta tarkastellessasi todistuksia tuntemattomilta klinikoilta.

### Voimassaolon edistymispalkki

Eläinlääkäritietojen alapuolella edistymispalkki visualisoi todistuksen voimassaoloajan:

1. Palkki ulottuu **todistuspäivästä** (alku) **vanhenemispäivään** (loppu).
2. Nykyinen päivä on merkitty osoittimella palkissa.
3. Värikoodaus:
   - **Vihreä:** Yli 30 päivää jäljellä
   - **Keltainen:** 30 päivää tai vähemmän jäljellä
   - **Punainen:** Vanhentunut
4. Kulutetun voimassaolon prosentti näkyy tekstinä.

### Asiakirjaruudukko

Asiakirjaosio näyttää ladatut todistustiedostot ruudukkoasettelussa.

1. Jokainen asiakirja näkyy pikkukuvakorttina tiedostonimen kanssa alla.
2. Napsauta mitä tahansa pikkukuvaa avataksesi **kuvan esikatselu** -kerroksen.
3. Esikatselukerroksessa:
   - Käytä zoomaus sisään/ulos -säätimiä yksityiskohtien tarkastamiseen.
   - Navigoi asiakirjojen välillä vasemmalla/oikealla nuolilla.
   - Lataa alkuperäinen tiedosto latauspainikkeella.
   - Paina **Escape** sulkeaksesi esikatselun.
4. Tuetut muodot: JPEG, PNG, PDF.

> **Vinkki:** Etsi virallisia eläinlääkärileimoja, allekirjoituksia ja lisenssinumeroita todistusasiakirjoista. Yleiset tai malliasiakirjat ilman näitä elementtejä tulisi merkitä hylättäväksi.

---

## Todistuksen hyväksyminen

Terveystodistuksen hyväksyminen:

1. Avaa todistuksen tietolaatikko napsauttamalla riviä.
2. Tarkasta eläinlääkäritiedot täydellisyyden ja uskottavuuden osalta.
3. Tarkasta kaikki ladatut asiakirjat asiakirjaruudukossa.
4. Napsauta **Hyväksy**-painiketta laatikon alaosassa.
5. Vahvistusikkunassa:
   - Tarkista yhteenveto siitä, mitä olet hyväksymässä.
   - Vanhenemispäivä lasketaan automaattisesti todistustyypin perusteella.
   - Napsauta **Vahvista**.

### Hyväksynnän tarkistuslista

Ennen hyväksyntää varmista:

- [ ] Eläinlääkärin nimi ja lisenssinumero ovat olemassa
- [ ] Klinikan tiedot ovat täydelliset ja todennettavissa
- [ ] Asiakirjat ovat luettavia ja sisältävät viralliset leimat/allekirjoitukset
- [ ] Todistuspäivä on tuore (viimeisten 12 kuukauden sisällä)
- [ ] Asiakirjan lemmikkitiedot vastaavat alustan tietueita
- [ ] Ei merkkejä asiakirjan väärentämisestä tai peukaloinnista

### Mitä tapahtuu hyväksynnän jälkeen

- Todistuksen tila vaihtuu tilaan **Hyväksytty**.
- Voimassaoloaika asetetaan todistustyypin perusteella.
- Lemmikin profiiliin tulee terveystodistusmerkki.
- Omistaja saa ilmoituksen hyväksynnän vahvistuksesta.
- Voimassaolon edistymispalkki aktivoituu tietolaatikossa.

---

## Todistuksen hylkääminen

Terveystodistuksen hylkääminen:

1. Avaa todistuksen tietolaatikko.
2. Tunnista lähetyksen ongelmakohdat.
3. Napsauta **Hylkää**-painiketta laatikon alaosassa.
4. Hylkäysikkunassa:
   - Syötä **hylkäyksen syy** tekstialueelle. Tämä kenttä on pakollinen.
   - Ole tarkka siitä, mitä on korjattava.
5. Napsauta **Vahvista hylkäys**.

### Yleiset hylkäyssyyt

| Syy | Esimerkkiviesti |
|-----|-----------------|
| Lukukelvottomat asiakirjat | "Ladattu asiakirja on liian epäselvä luettavaksi. Lataa selkeämpi skannaus tai valokuva." |
| Puuttuvat eläinlääkäritiedot | "Todistus ei sisällä eläinlääkärin lisenssinumeroa. Lähetä uudelleen täydellisillä eläinlääkäritiedoilla." |
| Vanhentunut todistus | "Tämä todistus on myönnetty yli 12 kuukautta sitten. Hanki ja lataa voimassa oleva todistus." |
| Erilaiset lemmikkitiedot | "Todistuksen lemmikin nimi ei vastaa rekisteröityä lemmikin nimeä. Vahvista ja lähetä uudelleen." |
| Puutteelliset asiakirjat | "Vain sivu 1/3 ladattiin. Lataa kaikki todistuksen sivut." |

### Mitä tapahtuu hylkäyksen jälkeen

- Todistuksen tila vaihtuu tilaan **Hylätty**.
- Hylkäyksen syy näytetään lemmikin omistajalle.
- Omistaja saa ilmoituksen syyn kanssa.
- Omistaja voi lähettää uuden todistuksen hylätyn tilalle.

> **Vinkki:** Anna aina toimintakelpoista palautetta. Kerro omistajalle tarkalleen mitä korjata, jotta he voivat ratkaista asian yhdellä uudelleenlähetyksellä.

---

## Todistuksen peruuttaminen

Peruuttamista käytetään, kun aiemmin hyväksytty todistus havaitaan pätemättömäksi, vilpilliseksi tai ei enää soveltuvaksi.

1. Siirry todistukseen (suodata Tila: Hyväksytty tarvittaessa).
2. Avaa tietolaatikko.
3. Napsauta **Peruuta**-painiketta (näkyy vain Hyväksytty-tilaisille todistuksille).
4. Peruutusikkunassa:
   - Syötä **peruutuksen syy**. Tämä kenttä on pakollinen.
   - Tunnusta, että tämä toiminto on välitön eikä peruutettavissa.
5. Napsauta **Vahvista peruutus**.

### Milloin peruuttaa

- Vilpillinen dokumentaatio havaittu hyväksynnän jälkeen
- Eläinlääkärilisenssi todettu pätemättömäksi tai peruutetuksi
- Lemmikin omistaja ilmoittaa todistuksen lähetetyn virheellisesti
- Viranomainen merkitsee todistuksen

### Mitä tapahtuu peruutuksen jälkeen

- Terveystodistusmerkki poistetaan välittömästi lemmikin profiilista.
- Todistuksen tila vaihtuu tilaan **Peruutettu**.
- Peruutuksen syy tallennetaan ja näkyy tietolaatikossa.
- Omistajalle ilmoitetaan sähköpostitse ja sovelluksen sisäisellä ilmoituksella.
- Omistajan on lähetettävä uusi todistus, jos he haluavat palauttaa merkin.

> **Vinkki:** Peruuttaminen on vakava toimenpide, joka vaikuttaa lemmikin luottamussignaaleihin alustalla. Varmista, että sinulla on riittävästi näyttöä ennen etenemistä.

---

## Voimassaolon ja vanhenemisen ymmärtäminen

Terveystodistuksilla on määritelty voimassaoloaika, joka määrittää kuinka kauan todistus pysyy aktiivisena hyväksynnän jälkeen.

### Miten voimassaolo toimii

1. Kun todistus hyväksytään, järjestelmä laskee vanhenemispäivän.
2. Voimassaoloaika riippuu todistustyypistä:
   - Yleinen terveystodistus: 12 kuukautta
   - Rokotustodistus: Vaihtelee rokotusaikataulun mukaan
   - Jalostuskelpoisuustodistus: 6 kuukautta
3. **Voimassaolon edistymispalkki** tietolaatikossa näyttää jäljellä olevan ajan visuaalisesti.

### Vanhenemisen ilmoitukset

Järjestelmä lähettää automaattisia ilmoituksia vanhenemisen lähestyessä:

| Päivää ennen vanhenemista | Ilmoitus |
|---------------------------|----------|
| 30 päivää | Ensimmäinen muistutus omistajalle uusimisesta |
| 14 päivää | Toinen muistutus kiireellisyydellä |
| 7 päivää | Viimeinen varoitus |
| 0 päivää | Todistus vanhentunut -ilmoitus |

### Vanhenemisen jälkeen

- Todistuksen tila vaihtuu automaattisesti tilaan **Vanhentunut**.
- Terveysmerkkipoistuu lemmikin profiilista.
- Vanhentunut todistus säilyy historiassa viitteeksi.
- Omistaja voi lähettää uuden todistuksen milloin tahansa.

> **Vinkki:** Seuraa todistustaulukkoa suodatettuna "Hyväksytty" ja lajiteltuna vanhenemispäivän mukaan tunnistaaksesi ennakoivasti alueellasi pian vanhenevia todistuksia.

---

## Joukkotoiminnot

Useiden todistusten tehokkaaseen käsittelyyn:

1. Käytä taulukon vasemmalla puolella olevia valintaruutuja valitaksesi useita rivejä.
2. Joukkotoimintopalkki tulee näkyviin taulukon yläosaan.
3. Käytettävissä olevat joukkotoiminnot:
   - **Hyväksy kaikki** -- Hyväksyy kaikki valitut odottavat todistukset oletusvanhenemisella.
   - **Vie** -- Lataa valitut todistukset CSV-raporttina.

> **Vinkki:** Joukkohyväksyntää tulisi käyttää vain, kun olet yksilöllisesti tarkastanut jokaisen valitun todistuksen asiakirjat. Älä koskaan joukkohyväksy tarkastamatta asiakirjoja.

---

## Usein kysytyt kysymykset

**K: Voinko muokata hyväksytyn todistuksen vanhenemispäivää?**
V: Ei. Vanhenemisen muuttamiseksi sinun on peruutettava nykyinen todistus ja pyydettävä omistajaa lähettämään uudelleen.

**K: Entä jos todistusasiakirja on kielellä, jota en osaa lukea?**
V: Siirrä tarkastelu ylläpitäjälle, joka lukee kyseistä kieltä, tai pyydä omistajaa toimittamaan virallinen käännös.

**K: Voiko lemmikillä olla useita aktiivisia todistuksia?**
V: Kyllä. Lemmikillä voi olla sekä yleinen terveystodistus että erityiset rokotustodistukset aktiivisina samanaikaisesti.

**K: Kuka vastaanottaa hylkäys-/peruutusilmoitukset?**
V: Lemmikin rekisteröity omistaja vastaanottaa kaikki ilmoitukset sähköpostitse ja sovelluksen sisäisesti.
