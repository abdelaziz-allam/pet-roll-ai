# Blogi-CMS

Blogi-CMS-moduuli mahdollistaa ylläpitäjien luoda, muokata, julkaista ja hallita blogikirjoituksia, jotka näytetään Petfolioon julkisella verkkosivustolla. Käytä tätä työkalua jakaaksesi lemmikkien hoitovinkkejä, alustauutisia, kasvattajaesittelyjä ja opetussisältöä yhteisöllesi.

![Blog CMS](/docs/screenshots/blog.png)

---

## Blogikirjoitusten taulukko

Päänäkymä näyttää kaikki blogikirjoitukset haettavassa, lajiteltavassa taulukossa.

| Sarake | Kuvaus |
|--------|--------|
| Otsikko | Kirjoituksen otsikko napsautettavalla linkillä muokkaukseen |
| Tila | Julkaisutilan merkki |
| Kirjoittaja | Kirjoituksen luoneen ylläpitäjän nimi |
| Katselut | Sivunäyttökerrat julkaisun jälkeen yhteensä |
| Päivämäärä | Luontipäivä (tai julkaisupäivä jos julkaistu) |

### Tilamerkit

| Tila | Merkin väri | Kuvaus |
|------|-------------|--------|
| Luonnos | Harmaa | Kirjoitus on tallennettu mutta ei näkyvissä yleisölle |
| Julkaistu | Vihreä | Kirjoitus on aktiivinen ja näkyvissä verkkosivustolla |
| Nostettu | Kulta | Kirjoitus on julkaistu ja kiinnitetty yläosaan |

### Taulukon toiminnot

- Napsauta kirjoituksen otsikkoa avataksesi sen muokattavaksi.
- Käytä toimintovalikkoa (kolme pistettä) kullakin rivillä pikatoimintoihin: Julkaise, Peruuta julkaisu, Kiinnitä, Poista kiinnitys, Poista.
- Lajittele minkä tahansa sarakkeen mukaan napsauttamalla sarakeotsikkoa.
- Käytä hakupalkkia suodattaaksesi kirjoituksia otsikon tai sisällön avainsanojen perusteella.

> **Vinkki:** Lajittele Katselut-sarake laskevasti tunnistaaksesi suosituimman sisältösi. Käytä näitä oivalluksia tulevien kirjoitusten suunnitteluun vastaavista aiheista.

---

## Kirjoituksen luominen

Uuden blogikirjoituksen luominen:

1. Napsauta **Luo kirjoitus** -painiketta Blogikirjoitukset-taulukon oikeassa yläkulmassa.
2. Kirjoituseditori avautuu seuraavilla kentillä.

### Otsikko

- Syötä kirjoituksen otsikko yläosan otsikkokenttään.
- Enintään 200 merkkiä.
- Otsikko näkyy pääotsikkona julkaistulla sivulla.
- Valitse kuvaavia, kiinnostavia otsikoita, jotka sisältävät relevantteja avainsanoja.

### Slug

- URL-slug luodaan automaattisesti otsikosta.
- Muoto: pienaakkoset, väliviivat korvaavat välilyönnit, erikoismerkit poistetaan.
- Esimerkki: "10 parasta vinkkiä uusille pennunomistajille" muuttuu muotoon `10-parasta-vinkkia-uusille-pennunomistajille`.
- Voit muokata slug-tunnistetta manuaalisesti, jos automaattisesti luotu versio on liian pitkä tai epäselvä.
- Slug-tunnisteen on oltava uniikki kaikkien kirjoitusten joukossa.

> **Vinkki:** Pidä slug-tunnisteet lyhyinä ja avainsanarikkaita paremman SEO:n saavuttamiseksi. Lyhennä manuaalisesti automaattisesti luodut slug-tunnisteet, jotka ylittävät 5-6 sanaa.

### HTML-sisältö

- Pääsisältöalue hyväksyy HTML-muotoilua.
- Käytä rikkaan tekstin editorin työkalupalkkia yleisiin muotoiluihin:
  - Lihavointi, kursiivi, alleviivaus
  - Otsikot (H2, H3, H4)
  - Järjestetyt ja järjestämättömät listat
  - Linkit
  - Kuvat (upotetut)
  - Lainaukset
  - Koodilohkot
- Vaihda **Lähdetilaan** muokataksesi raakaa HTML:ää suoraan.
- Sisältö tukee kaikkia tavallisia HTML-tageja.

#### Sisällön parhaat käytännöt

| Tee | Älä tee |
|-----|---------|
| Käytä H2:ta pääosioille, H3:ta alaosioille | Käytä H1:tä (varattu otsikolle) |
| Sisällytä kuvia pitkän tekstin rytmittämiseen | Julkaise muotoilemattomia tekstimassoja |
| Pidä kappaleet lyhyinä (3-4 lausetta) | Kirjoita yli 5 lauseen kappaleita |
| Käytä listoja useille liittyville kohteille | Upota ulkoisia skriptejä tai iframe-kehyksiä |
| Lisää alt-teksti kaikkiin kuviin | Käytä inline-tyylejä väreille |

### Tiivistelmä

- Kirjoita lyhyt yhteenveto kirjoituksesta (enintään 500 merkkiä).
- Tiivistelmä näkyy blogilistauksilla, hakutuloksissa ja sosiaalisen median esikatseluissa.
- Jos jätetään tyhjäksi, sisällön ensimmäiset 500 merkkiä käytetään automaattisesti.
- Merkkilaskuri näyttää jäljellä olevat merkit kirjoittaessasi.

> **Vinkki:** Kirjoita tiivistelmä houkuttelevana johdatuksena, joka saa lukijat haluamaan napsauttaa eteenpäin. Sen tulisi toimia itsenäisenä kokonaisena ajatuksena, ei päättyä keskelle lausetta.

### Kansikuvan lataus

1. Napsauta **Lataa kansikuva** -aluetta tai vedä ja pudota kuvatiedosto.
2. Tuetut muodot: JPEG, PNG, WebP.
3. Suositellut mitat: 1200 x 630 pikseliä (optimoitu sosiaaliseen jakamiseen).
4. Tiedoston enimmäiskoko: 5 MB.
5. Latauksen jälkeen kuvan esikatselu näkyy.
6. Napsauta **Poista** poistaaksesi nykyisen kansikuvan ja ladataksesi eri kuvan.

#### Kansikuvan ohjeet

- Käytä laadukkaita, relevantteja kuvia, jotka edustavat kirjoituksen sisältöä.
- Vältä tekstikerroksia kansikuvissa (ne voivat rajautua eri laitteilla).
- Varmista, että sinulla on oikeus käyttää kuvaa (alkuperäiset valokuvat tai asianmukaisesti lisensoidut kuvapankkikuvat).
- Kuvat optimoidaan automaattisesti verkkojakeluun latauksen jälkeen.

### Tunnisteet

- Syötä tunnisteet pilkuilla eroteltuina arvoina tunnistekenttään.
- Esimerkki: `pennun hoito, koulutus, ravitsemus, uudet omistajat`
- Tunnisteet auttavat luokittelemaan kirjoituksia ja parantavat löydettävyyttä.
- Olemassa olevat tunnisteet ehdottuvat automaattisesti kirjoittaessasi.
- Tunnisteiden määrää ei ole rajoitettu, mutta 3-7 tunnistetta per kirjoitus on suositeltavaa.

> **Vinkki:** Käytä johdonmukaista tunnistenimeämistä kirjoitusten välillä. Tarkista olemassa olevat tunnisteet ennen uusien variaatioiden luomista (esim. käytä "pennun hoito" johdonmukaisesti sen sijaan, että vuorottelet "pennun-hoito" tai "Pennun Hoito" välillä).

### SEO-asetukset

SEO-osio mahdollistaa kirjoituksen hakukonenäkyvyyden optimoinnin.

#### Meta-otsikko

- Enintään 60 merkkiä.
- Näkyy napsautettavana otsikkona hakutuloksissa.
- Jos jätetään tyhjäksi, kirjoituksen otsikkoa käytetään.
- Merkkilaskuri muuttuu punaiseksi lähestyttäessä tai ylitettäessä 60 merkkiä.
- Paras käytäntö: Sisällytä pääavainsana lähelle alkua.

#### Meta-kuvaus

- Enintään 160 merkkiä.
- Näkyy kuvauspätkänä otsikon alla hakutuloksissa.
- Jos jätetään tyhjäksi, tiivistelmää käytetään.
- Merkkilaskuri muuttuu punaiseksi lähestyttäessä tai ylitettäessä 160 merkkiä.
- Paras käytäntö: Sisällytä toimintakehotus ja pääavainsana.

#### SEO-esikatselu

Metakenttien alapuolella esikatselu näyttää, miten kirjoitus näkyy Googlen hakutuloksissa:

```
+--------------------------------------------------+
| Meta-otsikko (tai kirjoituksen otsikko jos tyhjä)|
| https://petfolioo.com/blog/sinun-slug-tassa      |
| Meta-kuvaus (tai tiivistelmä jos tyhjä) näkyy    |
| tässä kuten se näkyisi hakutuloksissa...         |
+--------------------------------------------------+
```

> **Vinkki:** Täytä aina sekä meta-otsikko että meta-kuvaus manuaalisesti. Automaattisesti luodut arvot otsikosta ja tiivistelmästä eivät ehkä ole optimoituja hakutarkoitukseen.

### Luonnoksen tallentaminen

1. Haluttujen kenttien täyttämisen jälkeen napsauta **Tallenna luonnos**.
2. Kirjoitus tallennetaan Luonnos-tilaan.
3. Voit palata muokkaamaan sitä milloin tahansa Blogikirjoitukset-taulukosta.
4. Luonnokset eivät ole yleisön nähtävissä.

---

## Kirjoituksen julkaiseminen

Luonnoskirjoituksen julkaiseminen ja tekeminen näkyväksi verkkosivustolla:

1. Avaa kirjoitus Blogikirjoitukset-taulukosta.
2. Tarkista kaikki sisältö, kuvat ja SEO-asetukset.
3. Napsauta **Julkaise**-painiketta oikeassa yläkulmassa.
4. Vahvistusikkunassa:
   - Tarkista kirjoituksen otsikko ja slug.
   - Vahvista julkaisu.
5. Napsauta **Vahvista julkaisu**.

### Mitä tapahtuu julkaisun jälkeen

- Kirjoituksen tila vaihtuu tilaan **Julkaistu**.
- Kirjoitus tulee välittömästi näkyviin julkisella blogisivulla.
- Julkaisupäivä tallennetaan (käytetään blogilla lajitteluun).
- Kirjoituksen URL aktivoituu: `https://petfolioo.com/blog/[slug]`.
- Hakukoneet voivat nyt indeksoida kirjoituksen.

### Julkaisun tarkistuslista

Ennen julkaisua varmista:

- [ ] Otsikko on selkeä, kiinnostava ja kirjoitusvirheistä vapaa
- [ ] Sisältö on valmis ja asianmukaisesti muotoiltu
- [ ] Kaikki kuvat latautuvat oikein
- [ ] Linkit toimivat ja avautuvat asianmukaisissa välilehdissä
- [ ] Kansikuva on ladattu ja näyttää hyvältä
- [ ] Tiivistelmä on kirjoitettu ja alle 500 merkkiä
- [ ] Tunnisteet on lisätty ja asianmukaisesti muotoiltu
- [ ] Meta-otsikko on alle 60 merkkiä
- [ ] Meta-kuvaus on alle 160 merkkiä
- [ ] Slug on siisti ja avainsanarikas

---

## Julkaisun peruuttaminen

Julkaistun kirjoituksen poistaminen julkiselta verkkosivustolta:

1. Etsi kirjoitus Blogikirjoitukset-taulukosta.
2. Napsauta toimintovalikkoa (kolme pistettä) rivillä.
3. Valitse **Peruuta julkaisu**.
4. Vahvista toiminto ikkunassa.

### Mitä tapahtuu julkaisun peruuttamisen jälkeen

- Kirjoituksen tila vaihtuu takaisin tilaan **Luonnos**.
- Kirjoitus poistetaan välittömästi julkiselta blogisivulta.
- URL palauttaa 404-sivun.
- Katselumäärä säilyy.
- Voit julkaista kirjoituksen uudelleen milloin tahansa.

> **Vinkki:** Peruuta julkaisu poistamisen sijaan, jos haluat poistaa sisältöä väliaikaisesti. Julkaisemattomat kirjoitukset säilyttävät kaikki tietonsa ja ne voidaan palauttaa välittömästi.

---

## Kiinnitä/Poista kiinnitys nostetuksi

Nostetut kirjoitukset näkyvät näkyvästi blogisivun yläosassa aikajärjestyksellisten listausten yläpuolella.

### Kirjoituksen kiinnittäminen

1. Etsi julkaistu kirjoitus Blogikirjoitukset-taulukosta.
2. Napsauta toimintovalikkoa (kolme pistettä).
3. Valitse **Kiinnitä nostetuksi**.
4. Tilamerkki vaihtuu tilaan **Nostettu** (kulta).

### Kiinnityksen poistaminen

1. Etsi nostettu kirjoitus taulukosta.
2. Napsauta toimintovalikkoa (kolme pistettä).
3. Valitse **Poista kiinnitys**.
4. Tila palautuu tilaan **Julkaistu** (vihreä).

### Nostettujen kirjoitusten säännöt

- Vain julkaistuja kirjoituksia voidaan kiinnittää.
- Useita kirjoituksia voidaan nostaa samanaikaisesti.
- Nostetut kirjoitukset näytetään kiinnitysjärjestyksessä (viimeisin kiinnitys ensin).
- Kiinnityksen poistaminen ei peru julkaisua; kirjoitus pysyy julkaistuna.

> **Vinkki:** Rajoita nostetut kirjoitukset 2-3:een kerrallaan. Liian monet nostetut kirjoitukset laimentavat painotusta ja työntävät tavallista sisältöä näkymän ulkopuolelle.

---

## Näytä sivustolla

Julkaistun kirjoituksen esikatseleminen julkisella verkkosivustolla:

1. Avaa kirjoitus Blogikirjoitukset-taulukosta.
2. Napsauta **Näytä sivustolla** -linkkiä oikeassa yläkulmassa (Julkaise-painikkeen vieressä).
3. Uusi selainvälilehti avautuu näyttäen kirjoituksen aktiivisella verkkosivustolla.

### Huomautukset

- Näytä sivustolla -linkki on käytettävissä vain Julkaistu- ja Nostettu-tilaisille kirjoituksille.
- Luonnoskirjoituksia ei voi esikatsella aktiivisella sivustolla.
- Linkki avaa nykyisen aktiivisen version; tallentamattomat muutokset editorissa eivät näy.

> **Vinkki:** Katso aina sivustolla julkaisun jälkeen varmistaaksesi, että muotoilu, kuvat ja asettelu näkyvät oikein julkisessa teemassa.

---

## Kirjoituksen poistaminen

Blogikirjoituksen pysyvä poistaminen:

1. Etsi kirjoitus Blogikirjoitukset-taulukosta.
2. Napsauta toimintovalikkoa (kolme pistettä).
3. Valitse **Poista**.
4. Vahvistusikkuna tulee näkyviin:
   - Näyttää kirjoituksen otsikon.
   - Varoittaa, että poisto on pysyvä.
   - Pyytää kirjoittamaan kirjoituksen otsikon vahvistukseksi (julkaistuille kirjoituksille).
5. Napsauta **Vahvista poisto**.

### Mitä tapahtuu poiston jälkeen

- Kirjoitus poistetaan pysyvästi järjestelmästä.
- URL palauttaa 404-sivun.
- Kirjoitusta ei voi palauttaa poiston jälkeen.
- Katselutilastot menetetään.
- Slug vapautuu uudelleenkäyttöön.

### Milloin poistaa vs. peruuttaa julkaisu

| Tilanne | Toiminto |
|---------|----------|
| Sisällön väliaikainen poisto | Peruuta julkaisu |
| Vanhentunut sisältö, jota saatetaan päivittää myöhemmin | Peruuta julkaisu |
| Testikirjoitukset tai vahingossa luodut kaksoiskappaleet | Poista |
| Sisältö, jota ei olisi pitänyt koskaan luoda | Poista |
| Oikeudellisesti ongelmallinen sisältö | Poista |

> **Vinkki:** Poisto on peruuttamaton. Jos olet epävarma, peruuta julkaisu sen sijaan. Voit aina poistaa julkaisemattoman kirjoituksen myöhemmin, mutta et voi palauttaa poistettua kirjoitusta.

---

## Kansikuvien lataus

Kansikuvan latauskomponentti tukee seuraavaa työnkulkua:

### Latausmenetelmät

1. **Napsauta ladataksesi:** Napsauta latausaluetta avataksesi tiedostoselaimen.
2. **Vedä ja pudota:** Vedä kuvatiedosto työpöydältäsi suoraan latausalueelle.

### Latausprosessi

1. Valitse tai pudota kuvatiedostosi.
2. Latauksen edistymispalkki tulee näkyviin.
3. Valmistuessa kuvan esikatselu näkyy latausalueella.
4. Kuvan URL tallennetaan automaattisesti kirjoituksen mukana.

### Kuvavaatimukset

| Vaatimus | Arvo |
|----------|------|
| Muodot | JPEG, PNG, WebP |
| Vähimmäismitat | 600 x 315 pikseliä |
| Suositellut mitat | 1200 x 630 pikseliä |
| Tiedoston enimmäiskoko | 5 MB |
| Kuvasuhde | 1.91:1 suositeltava (sosiaalinen media optimoitu) |

### Ladattujen kuvien hallinta

- **Korvaa:** Napsauta **Poista**-painiketta esikatselun alla ja lataa sitten uusi kuva.
- **Esikatselu:** Napsauta kuvan esikatselua nähdäksesi sen täydessä koossa.
- **Alt-teksti:** Syötä kuvaava alt-teksti kuvan alla olevaan kenttään (tärkeää saavutettavuudelle ja SEO:lle).

### Kuvan optimointi

Ladatut kuvat käsitellään automaattisesti:

- Pakataan verkkojakeluun (laatu säilyttäen).
- Tarjoillaan CDN:n kautta nopeaan lataamiseen.
- Muunnetaan WebP-muotoon sitä tukeville selaimille.
- Skaalataan useisiin mittoihin responsiivista näyttöä varten.

> **Vinkki:** Valmistele kansikuvat 1200 x 630 pikseliä ennen lataamista. Tämä on optimaalinen koko sekä bloginäytölle että sosiaalisen median jakamiselle (Open Graph).

---

## Usein kysytyt kysymykset

**K: Voiko useampi ylläpitäjä muokata samaa kirjoitusta?**
V: Kyllä, mutta reaaliaikaista yhteistyötä ei ole. Viimeksi tallentanut korvaa aiemmat muutokset. Koordinoi tiimisi kanssa ristiriitojen välttämiseksi.

**K: Onko versiohistoriaa?**
V: Ei. Jokainen tallennus korvaa edellisen version. Kopioi tärkeä sisältö muualle ennen suurten muutosten tekemistä.

**K: Voinko ajastaa kirjoituksen julkaistavaksi tulevaisuudessa?**
V: Ei tällä hetkellä. Kirjoitukset ovat joko luonnoksia tai välittömästi julkaistuja. Tallenna luonnoksena ja julkaise manuaalisesti haluamanasi ajankohtana.

**K: Mitä tapahtuu SEO:lle, jos vaihdan julkaistun kirjoituksen slug-tunnisteen?**
V: Vanha URL palauttaa 404:n. Hakukoneet poistavat lopulta vanhan URL:n indeksistä ja indeksoivat uuden. Vältä slug-tunnisteiden vaihtamista vakiintuneissa kirjoituksissa.

**K: Voinko upottaa videoita blogikirjoituksiin?**
V: Kyllä, käytä HTML-lähdetilaa upottaaksesi video-iframe-kehyksiä YouTubesta tai Vimeosta sisältöalueelle.

**K: Onko kirjoituksen sisällölle sana- tai merkkirajoitusta?**
V: Sisällön pituudelle ei ole kovaa rajaa. Kuitenkin 800-2000 sanan kirjoitukset toimivat yleensä parhaiten SEO:n ja lukijoiden sitoutumisen kannalta.
