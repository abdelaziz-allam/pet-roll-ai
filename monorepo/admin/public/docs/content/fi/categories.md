# Lemmikkikategoriat

Lemmikkikategoriat-moduuli mahdollistaa ylläpitäjien määritellä ja hallita luokitusjärjestelmää, jota käytetään lemmikkien järjestämiseen Petfolioo-alustalla. Kategoriat edustavat lemmikkilajeja tai -tyyppejä ja niitä käytetään kauttaaltaan sovelluksessa suodatukseen, hakuun ja järjestämiseen. Jokainen kategoria sisältää nimen, tunnisteen, emojikuvakkeen, kuvauksen ja aktiivisuustilan.

![Pet Categories](/docs/screenshots/categories.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Kategorialistaus

Kategoriat-sivu näyttää kaikki määritellyt lemmikkikategoriat taulukkomuodossa hallintasäätimillä.

### Taulukon sarakkeet

| Sarake | Kuvaus | Lajiteltava |
|--------|--------|:-----------:|
| Nimi-slug | Koneluettava tunniste (esim. `dog`, `cat`, `bird`) | Kyllä |
| Tunniste | Ihmisluettava näyttönimi (esim. "Koira", "Kissa", "Lintu") | Kyllä |
| Emojikuvake | Kategoriaa edustava visuaalinen kuvake | Ei |
| Kuvaus | Lyhyt kuvaus siitä, mitä tämä kategoria sisältää | Ei |
| Aktiivinen | Kytkin, joka näyttää onko kategoria aktiivinen | Kyllä |
| Toiminnot | Muokkaa- ja Poista-painikkeet | Ei |

### Tilaindikaattorit

| Aktiivisuustila | Näkymä | Merkitys |
|-----------------|--------|----------|
| Aktiivinen | Vihreä kytkin (päällä-asennossa) | Kategoria on käytettävissä lemmikkirekisteröintiin ja näkyy suodattimissa |
| Ei-aktiivinen | Harmaa kytkin (pois-asennossa) | Kategoria on piilotettu käyttäjiltä mutta olemassa olevat lemmikit säilyttävät kategoriansa |

### Taulukon ominaisuudet

1. **Lajittele** napsauttamalla Nimi-slug-, Tunniste- tai Aktiivinen-sarakeotsikkoja.
2. **Pikatoggla** napsauttamalla Aktiivinen-kytkintä suoraan taulukkorivillä.
3. **Rivinsisäiset toiminnot** Muokkaa- (kynäkuvake) ja Poista-painikkeilla (roskakorikuvake) jokaisella rivillä.
4. **Sivutus** alareunassa selaamiseen kun kategorioita on paljon.

> **Vinkki:** Ei-aktiiviset kategoriat näytetään hieman haalistuneella rivityylillä erottaakseen ne visuaalisesti aktiivisista.

---

## Kategorian luominen

Uusia kategorioita voidaan luoda tukemaan lisälemmikkilajeja tai -tyyppejä alustalla.

### Kategorian luomisen vaiheet

1. Napsauta **Lisää kategoria** -painiketta Kategoriat-sivun oikeassa yläkulmassa.
2. Luontilomake tulee näkyviin (joko modaalina tai sisäisenä lomakkeena).
3. Täytä vaaditut kentät:

| Kenttä | Vaadittu | Kuvaus | Esimerkki |
|--------|:--------:|--------|-----------|
| Nimi-slug | Kyllä | Koneluettava tunniste | `golden_fish` |
| Tunniste | Kyllä | Käyttäjille näytettävä nimi | "Kultakala" |
| Emojikuvake | Kyllä | Kategorian visuaalinen kuvake | "fish" |
| Kuvaus | Ei | Lyhyt selitys kategoriasta | "Makean ja suolaisen veden kalalajit" |
| Aktiivinen | Ei | Aktivoidaanko heti (oletuksena aktiivinen) | Päällä |

4. Valitse emojikuvake **Emojivalitsimesta** (katso alla).
5. Tarkista merkintäsi.
6. Napsauta **Luo kategoria** tallentaaksesi.
7. Uusi kategoria ilmestyy listaustaulukkoon.

### Nimi-slug-käytäntö

Nimi-slugin on noudatettava näitä sääntöjä:

| Sääntö | Kuvaus | Esimerkki |
|--------|--------|-----------|
| Vain pienaakkoset | Isoja kirjaimia ei sallita | `dog` ei `Dog` |
| Alaviivat välilyönneille | Käytä alaviivoja sanojen erottamiseen | `guinea_pig` ei `guinea pig` |
| Aakkosnumeeriset + alaviiva | Vain kirjaimet, numerot ja alaviivat | `cat_1` kelvollinen, `cat-1` ei |
| Uniikki | Ei saa olla olemassa olevan kategorian slug-duplikaatti | Järjestelmä hylkää duplikaatit |
| Ei alku-/loppualaviivoja | Ei voi alkaa tai päättyä alaviivaan | `_dog_` on kelvoton |
| Enintään 50 merkkiä | Pidä slugit ytimekkäinä | Lyhyet, kuvaavat tunnisteet |

> **Tärkeää:** Nimi-slugia ei voi muuttaa luomisen jälkeen. Sitä käytetään pysyvänä tunnisteena tietokannassa ja API:ssa. Valitse huolellisesti.

### Emojivalitsin

Emojivalitsin tarjoaa yli 100 eläin- ja luontokuvaketta kategorian tunnistamiseen.

| Ominaisuus | Kuvaus |
|------------|--------|
| Haku | Kirjoita suodattaaksesi saatavilla olevia emojeja avainsanalla |
| Kategoriat | Emojit järjestetty ryhmittäin (Eläimet, Luonto, Esineet) |
| Esikatselu | Valittu emoji näytetään suurena esikatseluna ennen vahvistamista |
| Viimeaikaiset | Aiemmin käytetyt emojit näytetään yläosassa nopeaa käyttöä varten |

**Emojivalitsimen käyttäminen:**

1. Napsauta **emojikuvakekenttää** avataksesi valitsimen.
2. Selaa kategorioita tai kirjoita avainsana hakuun (esim. "koira", "kala", "lintu").
3. Napsauta haluttua emojia valitaksesi sen.
4. Valittu emoji ilmestyy lomakekenttään esikatseluna.
5. Vaihda valintaasi napsauttamalla kenttää uudelleen avataksesi valitsimen.

Käytettävissä olevat emojikategoriat:

| Ryhmä | Esimerkkiemojit |
|-------|-----------------|
| Kotieläimet | Koira, Kissa, Hamsteri, Kani, Hiiri |
| Maatilaeläimet | Hevonen, Lehmä, Sika, Lammas, Vuohi, Kana |
| Linnut | Papukaija, Kotka, Pöllö, Ankka, Flamingo, Riikinkukko |
| Matelijat | Lisko, Käärme, Kilpikonna, Krokotiili, Dinosaurus |
| Vesieläimet | Kala, Trooppinen kala, Valas, Delfiini, Mustekala, Hai |
| Hyönteiset | Perhonen, Mehiläinen, Kovakuoriainen, Muurahainen, Sirkka |
| Villieläimet | Leijona, Tiikeri, Karhu, Apina, Norsu, Kirahvi |
| Tassu/Yleinen | Tassunjäljet, Luu, Sydän, Tähti |

---

## Kategorioiden muokkaaminen

Olemassa olevia kategorioita voidaan muokata päivittämään niiden tunniste, kuvake, kuvaus tai aktiivisuustila.

### Kategorian muokkaamisen vaiheet

1. Etsi muokattava kategoria listaustaulukosta.
2. Napsauta **Muokkaa**-painiketta (kynäkuvake) rivin Toiminnot-sarakkeessa.
3. Muokkauslomake tulee näkyviin nykyisillä arvoilla esitäytettynä.
4. Muokkaa mitä tahansa muokattavista kentistä:

| Kenttä | Muokattava | Huomautukset |
|--------|:----------:|--------------|
| Nimi-slug | Ei | Ei voi muuttaa luomisen jälkeen |
| Tunniste | Kyllä | Päivitä näyttönimi |
| Emojikuvake | Kyllä | Valitse uusi emoji valitsimesta |
| Kuvaus | Kyllä | Päivitä tai lisää kuvaus |
| Aktiivinen | Kyllä | Vaihda aktiivinen/ei-aktiivinen tila |

5. Tee muutoksesi.
6. Napsauta **Tallenna muutokset** käyttöönottamiseksi.
7. Onnistumisilmoitus vahvistaa päivityksen.
8. Listaustaulukko heijastaa muutokset välittömästi.

### Muokkauksen huomioitavat seikat

| Huomioitava | Yksityiskohta |
|-------------|---------------|
| Tunnisteen muutokset | Heijastuvat välittömästi koko sovelluksessa kaikille käyttäjille |
| Emojimuutokset | Päivittyvät kaikkiin käyttöliittymäsijainteihin, joissa kategoria näkyy |
| Kuvausmuutokset | Näkyvät kategorianvalintanäytöillä sovelluksessa |
| Olemassa olevat lemmikit | Tähän kategoriaan jo määrätyt lemmikit eivät ole vaikuttuneita muokkauksista |

> **Huomautus:** Kategorian tunnisteen muuttaminen ei muuta sen slug-tunnistetta. Slug pysyy pysyvänä tunnisteena. Käyttäjät ja lemmikit viittaavat kategorioihin slugin kautta sisäisesti.

---

## Kategorioiden aktivointi ja deaktivointi

Kategorioita voidaan vaihtaa aktiivisen ja ei-aktiivisen tilan välillä ilman poistamista.

### Kategorian aktivointi

1. Etsi ei-aktiivinen kategoria listauksesta (näkyy harmaalla kytkimellä).
2. Napsauta **kytkintä** Aktiivinen-sarakkeessa kääntääksesi sen päällä-asentoon.
3. Vaihtoehtoisesti napsauta Muokkaa ja vaihda Aktiivinen-kenttä muokkauslomakkeessa.
4. Vahvista toiminto pyydettäessä.
5. Kategoria tulee käytettäväksi lemmikkirekisteröintiin välittömästi.

### Kategorian deaktivointi

1. Etsi aktiivinen kategoria listauksesta (näkyy vihreällä kytkimellä).
2. Napsauta **kytkintä** kääntääksesi sen pois-asentoon.
3. Vahvistusikkuna tulee näkyviin selittäen vaikutuksen.
4. Napsauta **Vahvista deaktivointi**.
5. Kategoria piilotetaan uusilta lemmikkirekisteröinneiltä.

### Deaktivoinnin vaikutus

| Vaikutusalue | Vaikutus |
|--------------|----------|
| Uudet rekisteröinnit | Kategoria ei enää näy lajinvalintapudotusvalikoissa |
| Olemassa olevat lemmikit | Tähän kategoriaan jo määrätyt lemmikit säilyttävät määrityksensä |
| Suodattimet | Kategoria ei enää näy julkisten käyttäjien suodatinpudotusvalikoissa |
| Hallintaportaali | Kategoria edelleen näkyvissä ylläpitäjälle ei-aktiivisella tyylillä |
| API-vastaukset | Kategoria jätetään pois aktiivisten kategorioiden listoista |
| Uudelleenaktivointi | Voidaan ottaa uudelleen käyttöön milloin tahansa, palauttaen täyden toiminnallisuuden |

> **Vinkki:** Deaktivointi on suositeltavaa poistamisen sijaan, kun haluat väliaikaisesti piilottaa kategorian tai kun olemassa olevat lemmikit käyttävät sitä edelleen. Se säilyttää tietojen eheyden rajoittaen uutta käyttöä.

---

## Oletusarvojen syöttö -painike

Oletusarvojen syöttö -ominaisuus täyttää kategoriataulukon ennalta määritellyllä joukolla yleisiä lemmikkikategorioita. Tämä on hyödyllinen alustan alkuasennuksessa tai vakiokategorioiden palauttamisessa.

### Oletusarvojen syötön käyttäminen

1. Napsauta **Syötä oletusarvot** -painiketta kategoriataulukon ylä- tai alapuolella.
2. Vahvistusmodaali tulee näkyviin listaten luotavat kategoriat.
3. Tarkista oletuskategorioiden lista.
4. Napsauta **Vahvista syöttö** jatkaaksesi.
5. Oletuskategoriat luodaan ja ilmestyvät listaukseen.

### Oletuskategoriajoukko

Syöttö luo seuraavat vakiokategoriat (jos niitä ei jo ole):

| Nimi-slug | Tunniste | Emoji | Kuvaus |
|-----------|----------|:-----:|--------|
| `dog` | Dog | Koiran naama | Kotikoirat kaikista roduista |
| `cat` | Cat | Kissan naama | Kotikissat kaikista roduista |
| `bird` | Bird | Lintu | Lemmikkilinnut mukaan lukien papukaijat, kanarianlinnut ja peipot |
| `rabbit` | Rabbit | Kanin naama | Kotikanit |
| `hamster` | Hamster | Hamsterin naama | Hamsterit, gerbilit ja vastaavat pienjyrsijät |
| `fish` | Fish | Kala | Makean ja suolaisen veden akvaariot |
| `turtle` | Turtle | Kilpikonna | Kilpikonnat |
| `snake` | Snake | Käärme | Myrkyttömät lemmikkikäärmeet |
| `lizard` | Lizard | Lisko | Gekot, iguaanit ja muut lemmikkiliskot |
| `horse` | Horse | Hevosen naama | Hevoset ja ponit |
| `guinea_pig` | Guinea Pig | Marsu | Marsut |
| `ferret` | Ferret | Fretti | Kotifretit |

### Syötön käyttäytyminen

| Tilanne | Käyttäytyminen |
|---------|----------------|
| Tyhjä taulukko | Kaikki oletusarvot luodaan |
| Jotkut oletusarvot olemassa | Vain puuttuvat oletusarvot luodaan (ei duplikaatteja) |
| Kaikki oletusarvot olemassa | Muutoksia ei tehdä, vahvistusviesti näytetään |
| Mukautettuja kategorioita olemassa | Mukautetut kategoriat eivät ole vaikuttuneita |

> **Huomautus:** Oletusarvojen syöttö -painike ei poista tai muokkaa olemassa olevia kategorioita. Se lisää vain puuttuvia oletusmerkintöjä. Mukautetut kategoriasi ovat turvassa.

---

## Kategorian poistaminen

Kategorioita voidaan poistaa pysyvästi, kun niitä ei enää tarvita. Tämä toiminto vaatii huolellista harkintaa sen vaikutusten vuoksi olemassa oleviin tietoihin.

### Kategorian poistamisen vaiheet

1. Etsi kategoria listaustaulukosta.
2. Napsauta **Poista**-painiketta (roskakorikuvake) rivin Toiminnot-sarakkeessa.
3. Varoitusmodaali tulee näkyviin:
   - Kategorian nimi ja nykyinen lemmikkimäärä tätä kategoriaa käyttäen
   - Varoitus vaikutuksesta olemassa oleviin lemmikkeihin
   - Tekstivahvistuskenttä (kirjoita kategorian slug vahvistukseksi)
4. Lue varoitus huolellisesti.
5. Kirjoita kategorian **nimi-slug** vahvistuskenttään.
6. Napsauta **Poista kategoria** poistaaksesi pysyvästi.

### Poiston vaikutus

| Vaikutusalue | Vaikutus |
|--------------|----------|
| Kategoriatietue | Poistetaan pysyvästi tietokannasta |
| Olemassa olevat lemmikit | Aiemmin tässä kategoriassa olleet lemmikit tulevat **kategorisoimattomiksi** |
| Lemmikkiprofiilit | Laji-kenttä näyttää "Kategorisoimaton" tai tyhjä |
| Suodattimet | Kategoria poistetaan kaikista suodatinpudotusvalikoista |
| Analytiikka | Historialliset tiedot saattavat näyttää "Tuntematon kategoria" menneille tietueille |
| Peruutettavuus | Ei voi peruuttaa (on luotava uudelleen manuaalisesti tarvittaessa) |

### Lemmikit tulevat kategorisoimattomiksi

Kun kategoria poistetaan:

1. Kaikki kyseiseen kategoriaan määrätyt lemmikit menettävät kategoriamäärityksensä.
2. Nämä lemmikit näkyvät "Kategorisoimaton"-tunnisteella Lemmikkirekisterissä.
3. Lemmikin omistajille **ei** ilmoiteta automaattisesti.
4. Ylläpitäjät voivat määrätä kategorisoimattomat lemmikit toiseen kategoriaan joukkomuokkauksen kautta.
5. Poistetun kategorian lemmikkimäärä näkyy poiston vahvistusmodaalissa.

> **Tärkeää:** Kategorian poistaminen, johon on aktiivisia lemmikkejä määrättynä, jättää nämä lemmikit kategorisoimattomiksi. Harkitse kategorian deaktivointia sen sijaan tai lemmikkien uudelleenmäärittämistä ennen poistoa.

### Poiston rajoitukset

| Rajoitus | Kuvaus |
|----------|--------|
| Oletuskategoriat | Syötetyt oletuskategoriat voidaan poistaa (ne voidaan syöttää uudelleen) |
| Aktiiviset lemmikit | Kategoriat, joissa on lemmikkejä, voidaan poistaa (lemmikit tulevat kategorisoimattomiksi) |
| Vahvistus vaaditaan | Slug on kirjoitettava vahvistukseksi poistoa varten |
| Roolivaatimus | Vain `super_admin`- ja `admin`-roolit voivat poistaa kategorioita |

---

## Parhaat käytännöt

### Kategorioiden hallinnan ohjeet

1. **Käytä selkeitä, yksinkertaisia tunnisteita** - Kategoriatunnisteiden tulisi olla välittömästi ymmärrettäviä kaikille käyttäjille kielitaidosta riippumatta.
2. **Valitse edustavat emojit** - Valitse emojit, jotka selkeästi edustavat eläintyyppiä nopean visuaalisen tunnistamisen avuksi.
3. **Kirjoita hyödyllisiä kuvauksia** - Kuvaukset auttavat käyttäjiä valitsemaan oikean kategorian rekisteröidessään lemmikkiään.
4. **Deaktivoi ennen poistamista** - Jos olet epävarma tarvitaanko kategoriaa, deaktivoi se ensin. Poista vain kun olet varma.
5. **Pidä slugit kuvaavina** - Koska slugeja ei voi muuttaa, valitse ne huolellisesti luomisen yhteydessä.
6. **Seuraa kategorisoimattomia lemmikkejä** - Tarkista säännöllisesti lemmikit ilman kategorioita ja määrää ne asianmukaisesti.

### Kategorioiden nimeämisesimerkit

| Hyvä | Huono | Miksi |
|------|-------|-------|
| `guinea_pig` | `gp` | Kuvaava ja luettava |
| `tropical_fish` | `tropicalFish` | Noudattaa alaviivakaytäntöä |
| `parrot` | `Parrot_1` | Pienaakkoset, numeroita ei tarvita |
| `persian_cat` | `cat_breed_persian` | Ytimekäs, rotutaso tarvittaessa |

---

## Usein kysytyt kysymykset

**K: Voinko yhdistää kaksi kategoriaa?**
V: Sisäänrakennettua yhdistämistoimintoa ei ole. Konsolidoidaksesi kategorioita, määrää lemmikit yhdestä kategoriasta toiseen ja poista sitten tyhjä kategoria.

**K: Mitä tapahtuu suodattimille kun deaktivoin kategorian?**
V: Kategoria poistetaan käyttäjien suodatinpudotusvalikoista mutta pysyy saatavilla hallintaportaalin suodattimissa hallinnointitarkoituksiin.

**K: Voinko järjestää kategorioita uudelleen?**
V: Kategoriat näytetään aakkosjärjestyksessä tunnisteen mukaan käyttäjille näkyvissä käyttöliittymissä. Ylläpitäjätaulukkoa voi lajitella minkä tahansa sarakeotsikon mukaan.

**K: Onko luotavien kategorioiden määrää rajoitettu?**
V: Kovaa teknistä rajaa ei ole, mutta käytettävyyden vuoksi pidä kokonaismäärä hallittavana (alle 30 on suositeltavaa), jotta käyttäjät löytävät oikean kategorian helposti.

---

*Edellinen: [Sovelluskäyttäjät](./users.md)*
