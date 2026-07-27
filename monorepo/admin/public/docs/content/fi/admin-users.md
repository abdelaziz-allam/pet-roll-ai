# Ylläpitäjät

Ylläpitäjät-sivu mahdollistaa Petfolioo-hallintaportaalin ylläpitäjätilien hallinnan. Täällä voit luoda uusia ylläpitäjiä, määrittää rooleja, määritellä yksityiskohtaisia käyttöoikeuksia ja hallita tilin tilaa.

![Admin Users](/docs/screenshots/admin-users.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Delete, Manage Permissions |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Yleiskatsaus

Käyttöoikeuksien hallinta on kriittistä tietoturvan ja toiminnallisen eheyden ylläpitämiseksi. Ylläpitäjäjärjestelmä tukee roolipohjaista käyttöoikeutta lisättynä sivukohtaisella käyttöoikeuksien tarkkuudella, varmistaen että jokaisella tiimin jäsenellä on juuri se pääsy, jonka he tarvitsevat.

---

## Ylläpitäjätaulukko

Päänäkymä näyttää taulukon kaikista järjestelmän ylläpitäjätileistä.

### Taulukon sarakkeet

| Sarake | Kuvaus |
|--------|--------|
| **Nimi** | Ylläpitäjän näyttönimi, joka näkyy kaikkialla portaalissa |
| **Sähköposti** | Ylläpitäjätilin kirjautumissähköpostiosoite |
| **Rooli** | Määrätty rooli, joka määrittää peruskäyttöoikeustason |
| **Tila** | Nykyinen tilin tila: Aktiivinen tai Keskeytetty |
| **Toiminnot** | Muokkaa- ja Poista-toimintopainikkeet |

### Taulukon ominaisuudet

1. Taulukko on lajiteltavissa napsauttamalla sarakeotsikkoja.
2. Hakukenttä taulukon yläpuolella mahdollistaa suodatuksen nimen tai sähköpostin perusteella.
3. Sivutussäätimet näkyvät alareunassa suurille ylläpitäjätiimeille.
4. Aktiiviset tilit näyttävät vihreän tilamerkin; keskeytetyt tilit näyttävät punaisen merkin.

---

## Roolit

Jokaiselle ylläpitäjätilille on määrätty yksi neljästä roolista. Roolit määrittävät perustason käyttöoikeuden ennen yksityiskohtaisten käyttöoikeuksien muokkauksia.

### Roolimäärittelyt

| Rooli | Käyttötaso | Kuvaus |
|-------|------------|--------|
| **super_admin** | Täysi rajoittamaton | Täydellinen pääsy kaikkiin sivuihin, ominaisuuksiin ja järjestelmäasetuksiin. Ei voi poistaa eikä käyttöoikeuksia voi rajoittaa. |
| **admin** | Kaikki sisältö ja käyttäjät | Täysi pääsy sisällönhallintaan, käyttäjähallintaan, palautteeseen, ilmoituksiin ja analytiikkaan. Ei pääsyä järjestelmätason asetuksiin. |
| **moderator** | Tarkastelu ja moderointi | Voi tarkastella ja moderoida sisältöä kuten palautetta, raportoituja profiileja ja merkittyjä merkintöjä. Ei voi luoda tai poistaa resursseja. |
| **viewer** | Vain luku | Voi tarkastella kaikkia sivuja, joihin heillä on pääsy, mutta ei voi luoda, muokata tai poistaa tietueita. Ihanteellinen sidosryhmille, jotka tarvitsevat näkyvyyttä. |

### Roolihierarkia

Roolihierarkia määrittää, mitkä roolit voivat hallita toisia rooleja:

1. **super_admin** voi hallita kaikkia muita rooleja (admin, moderator, viewer).
2. **admin** voi hallita moderator- ja viewer-tilejä.
3. **moderator** ei voi hallita ylläpitäjätilejä.
4. **viewer** ei voi hallita ylläpitäjätilejä.

> **Tärkeää:** Et voi määrätä omasi korkeampaa roolia. Vain super_admin voi luoda toisen super_admin-tilin.

---

## Ylläpitäjän luominen

Uuden ylläpitäjätilin lisääminen portaaliin:

### Vaiheet

1. Napsauta **Lisää ylläpitäjä** -painiketta Ylläpitäjät-sivun oikeassa yläkulmassa.
2. Luontilomake-ikkuna tulee näkyviin seuraavilla kentillä:

| Kenttä | Kuvaus | Vaatimukset |
|--------|--------|-------------|
| **Sähköposti** | Uuden ylläpitäjän kirjautumissähköposti | Pakollinen. Oltava kelvollinen, uniikki sähköpostiosoite. |
| **Näyttönimi** | Portaalin käyttöliittymässä näytettävä nimi | Pakollinen. 2-50 merkkiä. |
| **Salasana** | Alkuperäinen kirjautumissalasana | Pakollinen. Vähintään 8 merkkiä, sisällettävä isoja ja pieniä kirjaimia sekä numero. |
| **Rooli** | Tämän ylläpitäjän käyttöoikeusrooli | Pakollinen. Valitse pudotusvalikosta. |

3. Täytä **Sähköposti**-kenttä uuden ylläpitäjän sähköpostiosoitteella.
4. Syötä **Näyttönimi**, joka tunnistaa tämän ylläpitäjän portaalissa.
5. Aseta alkuperäinen **Salasana**, joka täyttää monimutkaisuusvaatimukset.
6. Valitse sopiva **Rooli** pudotusvalikosta.
7. Napsauta **Luo** lisätäksesi ylläpitäjätilin.
8. Onnistumisviesti vahvistaa tilin luomisen.
9. Uusi ylläpitäjä ilmestyy taulukkoon ja voi nyt kirjautua sisään.

> **Vinkki:** Tilin luomisen jälkeen ilmoita uudelle ylläpitäjälle hänen tunnuksistaan turvallisen kanavan kautta. Suosittele salasanan vaihtamista ensimmäisellä kirjautumisella.

---

## Ylläpitäjän muokkaaminen

Voit muokata olemassa olevan ylläpitäjän näyttönimeä, roolia ja tilaa.

### Vaiheet

1. Etsi ylläpitäjä Ylläpitäjät-taulukosta.
2. Napsauta **Muokkaa**-painiketta (kynäkuvake) Toiminnot-sarakkeessa.
3. Muokkauslomake-ikkuna tulee näkyviin nykyisillä arvoilla esitäytettynä.

### Muokattavat kentät

| Kenttä | Kuvaus | Huomautukset |
|--------|--------|--------------|
| **Näyttönimi** | Päivitä ylläpitäjän näkyvä nimi | 2-50 merkkiä |
| **Rooli** | Vaihda ylläpitäjän käyttöoikeustaso | Ei voi määrätä omasi korkeampaa roolia |
| **Tila** | Aseta Aktiiviseksi tai Keskeytetyksi | Keskeytetyt ylläpitäjät eivät voi kirjautua |

4. Muokkaa kenttiä tarpeen mukaan.
5. Napsauta **Tallenna muutokset** muokkausten käyttöönottamiseksi.
6. Onnistumisviesti vahvistaa muutosten tallennuksen.

### Tilan vaihtaminen

- **Aktiivinen** -- Ylläpitäjä voi kirjautua ja käyttää portaalia normaalisti.
- **Keskeytetty** -- Ylläpitäjä ei voi kirjautua. Olemassa olevat istunnot lopetetaan välittömästi.

> **Huomautus:** Ylläpitäjän keskeyttäminen on peruutettavissa. Käytä sitä, kun sinun tarvitsee väliaikaisesti peruuttaa pääsy poistamatta tiliä.

### Rajoitukset

- Et voi muokata omaa rooliasi (estämään vahingollista itsealennusta).
- Et voi vaihtaa super_admin-roolia ellei olet myös super_admin.
- Sähköpostia ei voi muuttaa tilin luomisen jälkeen.

---

## Sivukohtainen käyttöoikeuksien määrittely

Roolien lisäksi hallintaportaali tukee hienojakoista käyttöoikeuksien hallintaa sivukohtaisesti. Tämä mahdollistaa tarkan räätälöinnin siitä, mitä sivuja ja toimintoja kukin ylläpitäjä voi käyttää.

### Käyttöoikeusmäärittelyn käyttäminen

1. Napsauta **Muokkaa**-painiketta ylläpitäjälle, jonka haluat määritellä.
2. Muokkaus-ikkunassa navigoi **Käyttöoikeudet**-osioon (tai välilehteen).
3. Käyttöoikeusmatriisi tulee näkyviin näyttäen kaikki portaalin sivut.

### Käyttöoikeusmatriisin rakenne

Käyttöoikeusmatriisi näyttää jokaisen portaalin sivun rivinä seuraavilla säätimillä:

| Säädin | Kuvaus |
|--------|--------|
| **Pääsykytkin** | Kytkin, joka ottaa käyttöön tai poistaa käytöstä pääsyn koko sivulle |
| **Toimintojen monivalinta** | Pudotusvalikko, josta voit valita mitkä erityiset toiminnot ovat sallittuja kyseisellä sivulla |

### Matriisin käytettävissä olevat sivut

| Sivu | Mahdolliset toiminnot |
|------|----------------------|
| Kojelauta | Näytä |
| Käyttäjät | Näytä, Luo, Muokkaa, Poista, Keskeytä |
| Lemmikit | Näytä, Luo, Muokkaa, Poista |
| Terveystiedot | Näytä, Luo, Muokkaa, Poista |
| Rokotukset | Näytä, Luo, Muokkaa, Poista |
| Jalostus | Näytä, Luo, Muokkaa, Poista |
| Palaute | Näytä, Vastaa, Sulje, Merkitse |
| Ilmoitukset | Näytä, Lähetä |
| Analytiikka | Näytä, Vie |
| Asetukset | Näytä, Muokkaa |
| Ylläpitäjät | Näytä, Luo, Muokkaa, Poista |

### Käyttöoikeuksien määrittäminen

1. Kullakin sivurivillä vaihda **Pääsy**-kytkintä:
   - **PÄÄLLÄ** -- Ylläpitäjä voi käyttää tätä sivua (erityiset toiminnot hallitaan alla).
   - **POIS** -- Ylläpitäjä ei näe eikä voi navigoida tälle sivulle lainkaan.
2. Sivuille, joilla pääsy on käytössä, napsauta **Toiminnot**-monivalintapudotusvalikkoa.
3. Valitse erityiset toiminnot, jotka tämä ylläpitäjä saa suorittaa:
   - Valitse jokainen toiminto, jonka haluat myöntää.
   - Poista valinta toiminnoilta, jotka haluat rajoittaa.
4. Toista jokaiselle sivulle tarpeen mukaan.
5. Napsauta **Tallenna muutokset** käyttöoikeusmäärityksen käyttöönottamiseksi.

### Miten käyttöoikeudet vuorovaikuttavat roolien kanssa

- Roolien käyttöoikeudet toimivat **perustasona**.
- Sivukohtaiset käyttöoikeudet voivat **rajoittaa** pääsyä perustason alapuolelle.
- Sivukohtaiset käyttöoikeudet **eivät voi myöntää** pääsyä roolin salliman yli.
- Esimerkiksi: Admin-roolin käyttäjällä on oletuksena pääsy kaikkiin sisältösivuihin. Voit rajoittaa hänen pääsyään Jalostus-sivulle kytkemällä sen pois, mutta et voi myöntää hänelle Asetukset-pääsyä (varattu super_admin-roolille).

> **Vinkki:** Käytä yksityiskohtaisia käyttöoikeuksia, kun tiimin jäsenet tarvitsevat tietyn osajoukon ylläpitäjävalmiuksia. Esimerkiksi asiakastukihenkilö voisi olla "admin"-roolissa mutta rajoitettu vain Palaute- ja Käyttäjät-sivuille.

---

## Ylläpitäjän poistaminen

Ylläpitäjätilin poistaminen poistaa sen pysyvästi järjestelmästä.

### Vaiheet

1. Etsi ylläpitäjä Ylläpitäjät-taulukosta.
2. Napsauta **Poista**-painiketta (roskakorikuvake) Toiminnot-sarakkeessa.
3. Vahvistusikkuna tulee näkyviin ylläpitäjän nimellä ja sähköpostilla.
4. Kirjoita ylläpitäjän sähköpostiosoite vahvistaaksesi poiston (turvatoimenpide).
5. Napsauta **Vahvista poisto** poistaaksesi tilin pysyvästi.
6. Onnistumisviesti vahvistaa poiston.
7. Ylläpitäjä poistetaan taulukosta eikä voi enää kirjautua.

### Poiston rajoitukset

| Rajoitus | Syy |
|----------|-----|
| Ei voi poistaa super_admin-tiliä | Estää järjestelmän vahingollisen lukkiutumisen |
| Ei voi poistaa omaa tiliään | Estää itsensä poistamisen |
| Ei voi poistaa ilman riittävää roolia | Roolihierarkiasäännöt ovat voimassa |

> **Varoitus:** Poisto on pysyvä eikä sitä voi peruuttaa. Jos tarvitset väliaikaisesti pääsyn poistamista, käytä Keskeytä-tilaa sen sijaan.

---

## Käyttöoikeusmatriisin selitys

Petfolioon käyttöoikeusjärjestelmä käyttää kerroksellista lähestymistapaa:

### Kerros 1: Roolipohjainen käyttöoikeus (RBAC)

Jokaisella roolilla on ennalta määritellyt käyttöoikeudet lähtöpisteenä:

```
super_admin  -->  Kaikki sivut, kaikki toiminnot, ei rajoituksia
admin        -->  Kaikki sisältö-/käyttäjäsivut, kaikki toiminnot (paitsi Asetukset)
moderator    -->  Sisällön tarkastelysivut, rajoitetut toiminnot (näytä, vastaa, sulje)
viewer       -->  Kaikki saavutettavat sivut, vain näyttö
```

### Kerros 2: Sivukohtaiset muokkaukset

Yksityiskohtaiset käyttöoikeudet lisäävät toisen kerroksen RBAC:n päälle:

```
Roolin käyttöoikeudet  (perustaso)
    |
    v
Sivukohtaiset kytkimet  (voivat rajoittaa, eivät laajentaa roolin yli)
    |
    v
Lopulliset voimassa olevat käyttöoikeudet  (mitä ylläpitäjä todellisuudessa näkee)
```

### Esimerkkiskenaariot

**Skenaario 1: Asiakastukihenkilö**
- Rooli: admin
- Muokkaus: Poista pääsy Lemmikit-, Terveystiedot-, Jalostus-, Analytiikka- ja Ylläpitäjät-sivuilta
- Tulos: Voi käyttää vain Kojelauta-, Käyttäjät-, Palaute- ja Ilmoitukset-sivuja

**Skenaario 2: Sisällön tarkastaja**
- Rooli: moderator
- Muokkaus: Ota käyttöön Palaute (Näytä, Vastaa, Sulje), Käyttäjät (vain Näytä)
- Tulos: Voi tarkastella palautetta ja hakea käyttäjäprofiileja mutta ei voi muokata käyttäjiä

**Skenaario 3: Analytiikan tarkkailija**
- Rooli: viewer
- Muokkaus: Ota käyttöön vain Kojelauta ja Analytiikka
- Tulos: Voi tarkastella kaavioita ja mittareita mutta ei mitään muuta

### Voimassa olevien käyttöoikeuksien tarkasteleminen

1. Avaa muokkausikkuna mille tahansa ylläpitäjälle.
2. Käyttöoikeudet-osio näyttää nykyisen voimassa olevan tilan.
3. Kytkimet ja toimintovalinnat heijastavat mitä on tällä hetkellä myönnetty.
4. Ei-aktiiviset (harmaantuneet) toiminnot viittaavat niihin, jotka ylittävät roolin salliman.

---

## Tietoturvan parhaat käytännöt

1. **Vähimmän käyttöoikeuden periaate** -- Määrää kunkin ylläpitäjän työtehtävään tarvittava vähimmäisrooli ja käyttöoikeudet.
2. **Säännölliset auditoinnit** -- Tarkista ylläpitäjätilit neljännesvuosittain. Poista tilit, joita ei enää tarvita.
3. **Keskeytä ennen poistoa** -- Kun henkilö lähtee, keskeytä ensin häiriöiden estämiseksi ja poista sitten lisäajan jälkeen.
4. **Rajoita super_admin-tilejä** -- Pidä super_admin-tilien määrä minimissä (ihanteellisesti 1-2).
5. **Vahvat salasanat** -- Vaadi monimutkaisia salasanoja ja suosittele salasananhallintaohjelmia.
6. **Seuraa toimintaa** -- Tarkista kuka kirjautuu ja milloin järjestelmälokien kautta.

---

## Vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| Ylläpitäjää ei voi luoda | Varmista, että sinulla on riittävät roolioikeudet. Tarkista, ettei sähköposti ole jo käytössä. |
| Muokkaa-/Poista-painikkeet eivät näy | Roolisi ei salli ylläpitäjien hallintaa kohteen roolita tasolla tai yläpuolella. |
| Ylläpitäjä ei voi kirjautua luomisen jälkeen | Varmista, että tilin tila on Aktiivinen. Vahvista, että salasana syötettiin oikein. |
| Käyttöoikeusmuutokset eivät tule voimaan | Ylläpitäjän saattaa tarvita kirjautua ulos ja takaisin sisään käyttöoikeusmuutosten aktivoitumiseksi. |
| Super_admin-tiliä ei voi poistaa | Tämä on suunniteltua. Super_admin-tilejä ei voi poistaa käyttöliittymän kautta. |

---

## Liittyvät sivut

- [Asetukset](./settings.md) -- Määritä järjestelmän tietoturva-asetukset
- [Palaute](./feedback.md) -- Hallitse käyttäjäpalautetta (vaatii Palaute-sivun käyttöoikeuden)
- [Analytiikka](./analytics.md) -- Tarkastele alustamittareita (vaatii Analytiikka-sivun käyttöoikeuden)
