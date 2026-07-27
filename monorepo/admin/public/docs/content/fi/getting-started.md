# Aloitusopas

Tervetuloa Petfolioo-hallintaportaaliin. Tämä opas opastaa sinut ensimmäisen kirjautumisen läpi, selittää käyttöliittymän rakenteen ja auttaa ymmärtämään, miten roolipohjainen käyttöoikeus määrittää, mitä voit nähdä ja tehdä alustalla.

Hallintaportaali on verkkopohjainen hallintakonsoli Petfolioo-lemmikkiterveys- ja jalostusalustalle. Täältä ylläpitäjät voivat hallita käyttäjiä, lemmikkejä, kategorioita, terveystietoja, jalostusohjelmia ja alustan asetuksia.

![Login Page](/docs/screenshots/login.png)

---

## Kirjautuminen

Hallintaportaali käyttää sähköposti- ja salasanatodennusta. Vain tilit, joille on määrätty ylläpitäjärooli, voivat käyttää portaalia.

### Kirjautumisen vaiheet

1. Avaa selain ja siirry hallintaportaalin URL-osoitteeseen.
2. Näet **kirjautumissivun** osoitteessa `/login`.
3. Syötä **sähköpostiosoitteesi** ensimmäiseen kenttään.
4. Syötä **salasanasi** toiseen kenttään.
5. Napsauta **Kirjaudu sisään** -painiketta.
6. Jos tunnuksesi ovat kelvolliset ja tililläsi on ylläpitäjäoikeudet, sinut ohjataan **kojelautaan**.

> **Huomautus:** Jos näet "Ei valtuuksia" -virheilmoituksen kelvollisten tunnusten syöttämisen jälkeen, tililläsi ei ehkä ole määrätty ylläpitäjäroolia. Ota yhteyttä pääylläpitäjään roolin päivittämiseksi.

### Salasanan nollaaminen

Jos olet unohtanut salasanasi:

1. Napsauta kirjautumissivulla **Unohditko salasanan?** -linkkiä salasanakentän alapuolella.
2. Syötä ylläpitäjätiliisi liitetty sähköpostiosoite.
3. Napsauta **Lähetä nollauslinkki**.
4. Tarkista sähköpostisi Petfolioon lähettämän salasanan nollausviestin varalta.
5. Napsauta sähköpostissa olevaa linkkiä avataksesi salasanan nollauslomakkeen.
6. Syötä ja vahvista uusi salasanasi.
7. Palaa kirjautumissivulle ja kirjaudu sisään uusilla tunnuksillasi.

> **Vinkki:** Salasanan nollauslinkit vanhenevat 1 tunnin kuluttua. Jos linkkisi on vanhentunut, pyydä uusi kirjautumissivulta.

---

## Kojelaudan rakenne

Kirjautumisen jälkeen hallintaportaali näyttää yhdenmukaisen asettelun kaikilla sivuilla.

### Sivupalkki

Vasen sivupalkki sisältää päänavigointivalikon. Se sisältää linkit kaikkiin päämoduuleihin:

| Valikko | Kuvaus |
|---------|--------|
| Kojelauta | Alustan yleiskatsaus KPI-mittareilla ja analytiikalla |
| Käyttäjät | Sovelluskäyttäjien, roolien ja tilien hallinta |
| Lemmikit | Lemmikkirekisterin selaaminen ja hallinta |
| Kategoriat | Lemmikkikategorioiden määrittely ja hallinta |
| Terveystiedot | Lemmikkien terveystodistusten tarkastelu |
| Jalostus | Jalostusohjelmien ja sukulinjojen hallinta |
| Rokotukset | Rokotustietojen seuranta |
| Tiineys | Tiineysseurannan merkintöjen seuranta |
| Vahvistukset | Odottavien vahvistuspyyntöjen tarkastelu |
| Asetukset | Alustan asetukset |

Sivupalkin voi kutistaa napsauttamalla yläosan kuvaketta, jolloin sisältöalueelle jää enemmän tilaa.

### Yläpalkki

Yläpalkki sisältää:

| Elementti | Sijainti | Tarkoitus |
|-----------|----------|-----------|
| Haku | Keskellä | Yleinen haku käyttäjistä, lemmikeistä ja tietueista |
| Ilmoituskello | Oikealla | Hälytykset odottavista toimista ja järjestelmätapahtumista |
| Profiilikuva | Oikeassa reunassa | Tilivalikko profiiliasetuksilla ja uloskirjautumisella |

### Sisältöalue

Pääsisältöalue täyttää jäljelle jäävän tilan sivupalkin oikealla puolella ja yläpalkin alapuolella. Tässä näkyvät taulukot, lomakkeet, tietolaatikot ja analytiikka.

---

## Roolipohjainen käyttöoikeus

Hallintaportaali käyttää roolipohjaista käyttöoikeuksien hallintaa (RBAC). Jokaiselle ylläpitäjätilille on määrätty yksi seuraavista rooleista, joka määrittää käytettävissä olevat toiminnot.

### Roolimäärittelyt

| Rooli | Käyttötaso | Kuvaus |
|-------|------------|--------|
| `super_admin` | Täysi | Täydellinen pääsy kaikkiin moduuleihin, asetuksiin ja käyttäjähallintaan. Voi määrittää ja peruuttaa ylläpitäjärooleja. |
| `admin` | Korkea | Pääsy kaikkiin operatiivisiin moduuleihin. Voi hallita käyttäjiä, lemmikkejä ja tietueita. Ei voi muokata alustan asetuksia tai määrittää super_admin-rooleja. |
| `moderator` | Keskitaso | Voi tarkastella ja moderoida sisältöä, hyväksyä vahvistuksia ja hallita lemmikki-ilmoituksia. Ei voi luoda tai poistaa ylläpitäjätilejä. |
| `viewer` | Vain luku | Voi tarkastella kaikkia tietoja kaikissa moduuleissa, mutta ei voi luoda, muokata tai poistaa tietueita. Hyödyllinen auditointiin ja raportointiin. |

### Oikeusmatriisi

| Toiminto | super_admin | admin | moderator | viewer |
|----------|:-----------:|:-----:|:---------:|:------:|
| Näytä kojelauta | Kyllä | Kyllä | Kyllä | Kyllä |
| Hallitse käyttäjiä | Kyllä | Kyllä | Ei | Ei |
| Luo ylläpitäjätilit | Kyllä | Ei | Ei | Ei |
| Estä/Poista esto | Kyllä | Kyllä | Kyllä | Ei |
| Hallitse lemmikkejä | Kyllä | Kyllä | Kyllä | Ei |
| Hyväksy vahvistuksia | Kyllä | Kyllä | Kyllä | Ei |
| Hallitse kategorioita | Kyllä | Kyllä | Ei | Ei |
| Muokkaa alustan asetuksia | Kyllä | Ei | Ei | Ei |
| Näytä raportit | Kyllä | Kyllä | Kyllä | Kyllä |

> **Huomautus:** Jos navigointikohde ei näy sivupalkissasi, roolillasi ei ole pääsyä kyseiseen moduuliin.

---

## Navigoinnin yleiskatsaus

Alla on täysi lista hallintaportaalin moduuleista toiminnallisen alueen mukaan järjestettynä.

### Päämoduulit

1. **Kojelauta** - Alustan tilan yleiskatsaus, KPI-mittarit ja analytiikkakaaviot.
2. **Käyttäjät** - Sovelluskäyttäjien hallinta mukaan lukien profiilit, roolit ja tilin tila.
3. **Lemmikit** - Lemmikkirekisteri täydellisillä tietonäkymillä ja moderointityökaluilla.
4. **Kategoriat** - Lemmikkien laji-/tyyppikategoriointijärjestelmä.

### Terveys ja tietueet

5. **Terveystiedot** - Terveystodistusasiakirjat ja niiden vahvistustila.
6. **Rokotukset** - Rokotusaikataulut ja suoritustietueet.
7. **Tiineys** - Tiineysseuranta jalostuseläimille.

### Alustan toiminnot

8. **Vahvistukset** - Jono odottavia käyttäjä- ja lemmikkivahvistuspyyntöjä.
9. **Jalostus** - Jalostusohjelman hallinta ja sukulinjaseuranta.
10. **Asetukset** - Alustan laajuiset määritykset ja ominaisuusliput.

---

## Vinkkejä ensimmäiseen käyttökertaan

Kun käytät hallintaportaalia ensimmäistä kertaa, seuraa näitä suosituksia orientoitumiseen.

### Suositellut ensimmäiset askeleet

1. **Tarkista profiilisi** - Napsauta profiilikuvaasi oikeassa yläkulmassa ja valitse "Profiili" varmistaaksesi, että tilitietosi ovat oikein.
2. **Tutustu kojelautaan** - Perehdy KPI-kortteihin ja analytiikkaan ymmärtääksesi alustan nykyiset mittarit.
3. **Tarkista odottavat vahvistukset** - Siirry Vahvistukset-moduuliin nähdäksesi, onko tarkastettavia kohteita.
4. **Selaa aktiivisia käyttäjiä** - Siirry Käyttäjät-moduuliin ja lajittele "Liittymispäivä" laskevasti nähdäksesi viimeisimmät rekisteröinnit.
5. **Tarkista kategoriat** - Varmista, että lemmikkikategoriat on määritetty oikein alueellesi.

### Selainsuositukset

Hallintaportaali toimii parhaiten moderneilla selaimilla:

| Selain | Minimiversio |
|--------|-------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Vinkki:** Ota selainilmoitukset käyttöön pyydettäessä saadaksesi reaaliaikaisia hälytyksiä odottavista vahvistuksista ja tärkeistä järjestelmätapahtumista.

### Pikanäppäimet

| Pikanäppäin | Toiminto |
|-------------|----------|
| `/` | Kohdista yleiseen hakupalkkiin |
| `Esc` | Sulje avoimet laatikot ja modaalit |

---

## Kirjautumisongelmien vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| "Virheelliset tunnukset" -virhe | Tarkista sähköposti ja salasana. Käytä Unohditko salasanan -toimintoa tarvittaessa. |
| "Tili poistettu käytöstä" -viesti | Tilisi on deaktivoitu. Ota yhteyttä pääylläpitäjään. |
| Sivu latautuu mutta kirjautumislomake on tyhjä | Tyhjennä selaimen välimuisti ja evästeet ja lataa sivu uudelleen. |
| Ohjataan takaisin kirjautumiseen sisäänkirjautumisen jälkeen | Istuntosi on saattanut vanhentua. Yritä kirjautua uudelleen. Jos ongelma jatkuu, tarkista että evästeet ovat käytössä. |

---

## Avun saaminen

Jos kohtaat ongelmia, joita tämä opas ei kata:

1. Tarkista tämän käyttöohjeen muut osiot moduulikohtaista apua varten.
2. Ota yhteyttä organisaatiosi pääylläpitäjään rooli- ja käyttöoikeusasioissa.
3. Teknisissa ongelmissa ota yhteyttä alustan tukitiimiin.

---

*Seuraava: [Kojelauta](./dashboard.md) - Tutustu analytiikkaan ja KPI-yleiskatsaukseen.*
