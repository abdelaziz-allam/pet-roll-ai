# Lemmikkirekisteri

Lemmikkirekisteri on keskeinen moduuli kaikkien Petfolioo-alustalle rekisteröityjen lemmikkien tarkasteluun ja hallintaan. Tästä moduulista ylläpitäjät voivat selata koko lemmikkikatalogia, tarkastella yksityiskohtaisia profiileja, tarkastaa terveystodistusten tilat ja suorittaa moderointitoimia, kuten alustakäytäntöjä rikkovien lemmikkien estäminen.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Lemmikkilistaus-taulukko

Lemmikkilistaus-taulukko näyttää kaikki rekisteröidyt lemmikit sivutetussa, lajiteltavassa ja suodatettavassa muodossa.

### Taulukon sarakkeet

| Sarake | Kuvaus | Lajiteltava |
|--------|--------|:-----------:|
| Nimi | Lemmikin rekisteröity nimi | Kyllä |
| Laji | Lajikategoria (esim. Koira, Kissa, Lintu) | Kyllä |
| Rotu | Tarkka rotu lajin sisällä | Kyllä |
| Tila | Nykyinen tila (Aktiivinen, Estetty, Odottaa) | Kyllä |
| Sukupuoli | Uros, Naaras tai Tuntematon | Kyllä |
| Sijainti | Lemmikin rekisteröidyn osoitteen maa ja kaupunki | Kyllä |

### Tilaindikaattorit

| Tila | Merkin väri | Merkitys |
|------|-------------|----------|
| Aktiivinen | Vihreä | Lemmikkiprofiili on aktiivinen ja näkyvissä muille käyttäjille |
| Estetty | Punainen | Lemmikkiprofiili on piilotettu käytäntörikkomuksen vuoksi |
| Odottaa | Oranssi | Lemmikkiprofiili odottaa tarkastelua tai omistajan vahvistusta |

### Taulukon vuorovaikutukset

1. **Napsauta sarakeotsikkoa** lajitellaksesi taulukon kyseisen sarakkeen mukaan. Nuoli ilmaisee lajittelusuunnan.
2. **Napsauta riviä** avataksesi lemmikin tietolaatikon näytön oikealla puolella.
3. **Sivutussäätimet** alareunassa mahdollistavat sivujen välillä navigoinnin ja sivukoon muuttamisen (10, 20, 50 merkintää per sivu).

> **Vinkki:** Pidä `Shift`-näppäintä painettuna ja napsauta toista sarakeotsikkoa käynnistääksesi toissijaisen lajittelun.

---

## Suodattimet

Lemmikkilistaus-taulukon yläpuolella oleva suodatinpalkki tarjoaa useita tapoja rajata näytettäviä tuloksia.

### Käytettävissä olevat suodattimet

| Suodatin | Tyyppi | Kuvaus |
|----------|--------|--------|
| Laji | Pudotusvalikko | Suodata lemmikkilajin mukaan (Koira, Kissa, Lintu, Kani, Matelija jne.) |
| Tila | Pudotusvalikko | Suodata lemmikin tilan mukaan (Aktiivinen, Estetty, Odottaa) |
| Sukupuoli | Pudotusvalikko | Suodata sukupuolen mukaan (Uros, Naaras, Tuntematon) |
| Maa | Pudotusvalikko | Suodata lemmikin rekisteröidyn maan mukaan |
| Kaupunki | Pudotusvalikko | Suodata kaupungin mukaan (vaihtoehdot päivittyvät maavalintaan perustuen) |
| Haku | Tekstikenttä | Vapaa tekstihaku lemmikin nimen, rodun ja mikrosirunnumeron perusteella |

### Suodattimien käyttäminen

1. Etsi **suodatinpalkki** taulukon yläpuolelta.
2. Napsauta mitä tahansa **pudotusvalikkoa** nähdäksesi käytettävissä olevat vaihtoehdot.
3. Valitse yksi tai useampi arvo pudotusvalikoista.
4. Kirjoita **Haku**-kenttään suorittaaksesi vapaan tekstihaun.
5. Tulokset päivittyvät automaattisesti suodattimien käyttöönotossa.
6. Aktiiviset suodattimet näkyvät tunnisteina suodatinpalkin alapuolella.
7. Napsauta **X**-merkkiä missä tahansa suodatintunnisteessa poistaaksesi sen.
8. Napsauta **Tyhjennä kaikki** nollataksesi kaikki suodattimet kerralla.

### Suodatinyhdistelmät

Suodattimet yhdistetään JA-logiikalla. Esimerkiksi:

| Valitut suodattimet | Tulos |
|--------------------|-------|
| Laji: Koira | Kaikki koirat tilasta, sukupuolesta tai sijainnista riippumatta |
| Laji: Koira + Sukupuoli: Naaras | Kaikki naaraskoirat |
| Laji: Koira + Maa: UAE + Tila: Aktiivinen | Kaikki aktiiviset koirat UAE:ssa |
| Haku: "Rex" | Kaikki lemmikit, joiden nimi, rotu tai mikrosiru sisältää "Rex" |

> **Huomautus:** Kaupunki-pudotusvalikko riippuu maavalinnasta. Valitse maa ensin nähdäksesi käytettävissä olevat kaupungit.

---

## Lemmikin tietolaatikko

Minkä tahansa lemmikin rivin napsauttaminen avaa tietolaatikon, joka liukuu esiin näytön oikealta puolelta. Tämä laatikko sisältää täydellisen lemmikkiprofiilin osioihin järjestettynä.

### Valokuvaruudukko

Tietolaatikon yläosassa valokuvaruudukko näyttää lemmikin ladatut kuvat.

| Elementti | Kuvaus |
|-----------|--------|
| Pääkuva | Näkyy suurempana, merkitty tähtikuvakkeella |
| Lisäkuvat | Näkyvät ruudukkoasettelussa (enintään 6 pikkukuvaa) |
| Napsautustoiminto | Minkä tahansa kuvan napsauttaminen avaa sen koko näytön valolaatikkoon |
| Ei kuvia | Paikanpitäjäsiluetti näkyy |

### Lemmikin tiedot -osio

Kuvien alapuolella lemmikin perustiedot näkyvät jäsennettynä.

| Kenttä | Kuvaus | Esimerkki |
|--------|--------|-----------|
| Nimi | Rekisteröity lemmikin nimi | "Bella" |
| Laji | Lajikategoria | "Koira" |
| Rotu | Tarkka rotu | "Kultainennoutaja" |
| Väri | Turkin/kehon väri | "Kulta" |
| Paino | Paino yksikön kanssa | "28,5 kg" |
| Syntymäpäivä | Lemmikin syntymäpäivä | "2021-03-15" |
| Ikä | Laskettu syntymäpäivästä | "2 vuotta, 4 kuukautta" |
| Sukupuoli | Uros tai Naaras | "Naaras" |
| Mikrosirunnumero | Ainutlaatuinen mikrosiru-ID jos istutettu | "900118000123456" |
| Kastroitu/Steriloitu | Kastrointi- tai sterilointitila | "Kyllä" / "Ei" / "Tuntematon" |
| Rekisteröintipäivä | Milloin lemmikki lisättiin alustalle | "2023-07-20" |

### Terveystodistuksen tila

Terveystodistusosio näyttää, onko lemmikillä voimassa olevia terveysasiakirjoja.

| Elementti | Kuvaus |
|-----------|--------|
| Todistusmerkki | Vihreä valintamerkki (voimassa), keltainen varoitus (vanhenemassa), punainen X (vanhentunut/puuttuu) |
| Todistustyyppi | Terveystodistuksen nimi |
| Myöntämispäivä | Milloin todistus myönnettiin |
| Vanhenemispäivä | Milloin todistus vanhenee |
| Voimassaolon edistymispalkki | Visuaalinen indikaattori jäljellä olevasta voimassaoloajasta |

**Voimassaolon edistymispalkin lukeminen:**

1. **Täysi vihreä palkki** tarkoittaa, että todistus on äskettäin myönnetty ja suurin osa voimassaolosta on jäljellä.
2. **Osittainen keltainen palkki** (alle 30 % jäljellä) tarkoittaa, että todistus lähestyy vanhenemista.
3. **Punainen tyhjä palkki** tarkoittaa, että todistus on vanhentunut.
4. Jäljellä oleva prosentti näkyy tekstinä palkin vieressä.

> **Vinkki:** Todistukset, jotka vanhenevat 30 päivän sisällä, merkitään automaattisesti Odottavat vahvistukset -moduuliin, jotta lemmikin omistajalle lähetetään ilmoitus.

### Omistajan tiedot

Omistajaosio näyttää tietoja lemmikin rekisteröidystä omistajasta.

| Kenttä | Kuvaus |
|--------|--------|
| Omistajan nimi | Lemmikin omistajan näyttönimi |
| Sähköposti | Omistajan sähköpostiosoite |
| Puhelin | Puhelinnumero jos annettu |
| Vahvistettu kasvattaja | Onko omistajalla vahvistettu kasvattajastatus |
| Lemmikkejä yhteensä | Kuinka monta lemmikkiä tämä omistaja on rekisteröinyt |
| Jäsen vuodesta | Omistajan rekisteröintipäivä |

Omistajan nimen napsauttaminen ohjaa hänen täydelliseen profiiliinsa Käyttäjät-moduulissa.

### Sijaintiosio

Sijaintiosio näyttää, minne lemmikki on rekisteröity.

| Kenttä | Kuvaus |
|--------|--------|
| Maa | Maan nimi lippukuvakkeella |
| Kaupunki | Kaupungin nimi |
| Osoite | Katuosoite jos annettu (voidaan osittain piilottaa yksityisyyden vuoksi) |

---

## Lemmikin estäminen ja eston poistaminen

Ylläpitäjät ja moderaattorit voivat estää lemmikin, jonka profiili rikkoo alustan käytäntöjä. Estäminen piilottaa lemmikin julkisesta näkymästä ja ilmoittaa omistajalle.

### Lemmikin estäminen

1. Avaa lemmikin tietolaatikko napsauttamalla sen riviä listaustaulukossa.
2. Vieritä laatikon alaosaan tai etsi **Toiminnot**-osio.
3. Napsauta **Estä lemmikki** -painiketta (näkyy punaisena).
4. Vahvistusmodaali tulee näkyviin.
5. Syötä **Syy**-tekstikenttään selkeä selitys miksi tämä lemmikki estetään.
6. Valitse **rikkomuskategoria** pudotusvalikosta (esim. Vilpillinen ilmoitus, Sopimaton sisältö, Kaksoisprofiili, Käytäntörikkomus).
7. Napsauta **Vahvista esto**.
8. Lemmikin tila vaihtuu tilaan "Estetty" ja omistaja saa ilmoituksen annetun syyn kanssa.

### Eston syyvaatimukset

| Vaatimus | Kuvaus |
|----------|--------|
| Vähimmäispituus | Vähintään 20 merkkiä |
| Kieli | On oltava ammattimainen ja selkeä |
| Tarkkuus | Tulisi viitata nimenomaiseen rikkomukseen |
| Näkyvyys | Syy näkyy suoraan lemmikin omistajalle |

> **Tärkeää:** Antamasi eston syy näkyy lemmikin omistajalle hänen sovellusilmoituksessaan ja sähköpostissaan. Varmista, että se on ammattimainen, tarkka eikä sisällä sisäistä ammattikieltä.

### Lemmikin eston poistaminen

1. Käytä **Tila**-suodatinta valitsemalla "Estetty" löytääksesi estetyt lemmikit.
2. Napsauta estetyn lemmikin riviä avataksesi tietolaatikon.
3. Etsi **Poista esto** -painike (näkyy vihreänä) Toiminnot-osiossa.
4. Vahvistusmodaali tulee näkyviin näyttäen alkuperäisen eston syyn ja päivämäärän.
5. Voit halutessasi lisätä huomautuksen, jossa kerrotaan miksi esto poistetaan.
6. Napsauta **Vahvista eston poisto**.
7. Lemmikin tila palautuu tilaan "Aktiivinen" ja omistajalle ilmoitetaan.

### Estohistoria

Jokaisen lemmikin tietolaatikossa on **Estohistoria**-osio, jos lemmikki on koskaan estetty:

| Sarake | Kuvaus |
|--------|--------|
| Päivä | Milloin esto asetettiin |
| Ylläpitäjä | Kuka ylläpitäjä suoritti toiminnon |
| Syy | Annettu eston syy |
| Kesto | Kuinka kauan esto kesti |
| Ratkaisu | Miten se ratkaistiin (esto poistettu, valitettu jne.) |

---

## Joukkotoiminnot

Laajamittaisiin moderointitehtäviin lemmikkilistaus-taulukko tukee joukkovalintaa.

### Joukkovalinnan käyttäminen

1. Valitse **valintaruutu** kunkin haluamasi rivin vasemmalla puolella.
2. Tai napsauta **otsikon valintaruutua** valitaksesi kaikki näkyvät rivit nykyisellä sivulla.
3. **Joukkotoimintopalkki** tulee näkyviin taulukon yläosaan näyttäen valittujen kohteiden määrän.
4. Käytettävissä olevat joukkotoiminnot:
   - **Vie** - Lataa valitut lemmikit CSV-tiedostona
   - **Muuta tila** - Muuta kaikkien valittujen lemmikkien tila

> **Huomautus:** Joukkoestäminen ei ole käytettävissä tämän käyttöliittymän kautta. Estot on asetettava yksitellen varmistaen, että jokainen sisältää erityisen syyn.

---

## Lemmikkitietojen vieminen

Lemmikkirekisteritietojen vieminen:

1. Aseta halutut suodattimet tietojoukon rajaamiseksi.
2. Napsauta **Vie**-painiketta taulukon oikeassa yläkulmassa.
3. Valitse vientimuoto (CSV tai Excel).
4. Valitse viedäänkö **suodatetut tulokset** vai **kaikki tietueet**.
5. Tiedosto latautuu selaimesi oletuslatauskansioon.

### Viedyt kentät

| Kenttä | Sisältyy |
|--------|:--------:|
| Lemmikin nimi | Kyllä |
| Laji | Kyllä |
| Rotu | Kyllä |
| Sukupuoli | Kyllä |
| Tila | Kyllä |
| Maa | Kyllä |
| Kaupunki | Kyllä |
| Omistajan sähköposti | Kyllä |
| Rekisteröintipäivä | Kyllä |
| Mikrosirunnumero | Kyllä |
| Terveystodistuksen tila | Kyllä |

> **Huomautus:** Kuvia ja yksityiskohtaisia terveystietoja ei sisällytetä vientiin. Vain yhteenvetotiedot viedään.

---

*Edellinen: [Kojelauta](./dashboard.md) | Seuraava: [Sovelluskäyttäjät](./users.md)*
