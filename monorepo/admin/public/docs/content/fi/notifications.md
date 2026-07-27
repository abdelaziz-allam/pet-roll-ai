# Ilmoitukset

Ilmoitukset-sivu mahdollistaa ylläpitäjien luoda ja lähettää push-ilmoituksia Petfolioo-mobiilisovelluksen käyttäjille. Voit kohdistaa tiettyihin yleisösegmentteihin, tarkastella ilmoitushistoriaa ja noudattaa parhaita käytäntöjä tehokkaaseen viestintään.

![Notifications](/docs/screenshots/notifications.png)

---

## Yleiskatsaus

Push-ilmoitukset ovat suora kanava käyttäjiisi. Käytä niitä uusien ominaisuuksien ilmoittamiseen, tärkeiden päivitysten jakamiseen, muistutusten lähettämiseen tai tiettyjen käyttäjäsegmenttien sitouttamiseen. Tämä sivu tarjoaa sekä luontityökalut että historian kaikista aiemmin lähetetyistä ilmoituksista.

---

## Ilmoituksen luominen

Ilmoituksen luontilomake on päätyökalu push-ilmoitusten luomiseen ja lähettämiseen sovelluskäyttäjille.

### Luontilomakkeen käyttäminen

1. Siirry **Ilmoitukset**-sivulle sivupalkin valikosta.
2. Luontilomake näkyy sivun yläosassa.

### Lomakkeen kentät

| Kenttä | Kuvaus | Vaatimukset |
|--------|--------|-------------|
| **Otsikko** | Ilmoituksen otsikko, joka näkyy näkyvästi käyttäjän laitteella | Pakollinen. Enintään 65 merkkiä suositeltava täyden näkyvyyden takaamiseksi. |
| **Viestin sisältö** | Ilmoituksen yksityiskohtainen sisältö | Pakollinen. Enintään 240 merkkiä suositeltava. |
| **Yleisö** | Kohderyhmä käyttäjistä, jotka vastaanottavat ilmoituksen | Pakollinen. Valitse ennalta määritetyistä segmenteistä. |

---

## Ilmoituksen kirjoittaminen

Seuraa näitä vaiheita ilmoituksen luomiseen ja lähettämiseen:

### Vaihe 1: Syötä otsikko

1. Napsauta **Otsikko**-syöttökenttää.
2. Kirjoita ytimekäs, huomiota herättävä otsikko.
3. Pidä se alle 65 merkkiä välttääksesi katkeamista pienemmillä laitteilla.

> **Vinkki:** Käytä toimintakeskeistä kieltä otsikoissa. "Uutta: Seuraa lemmikkisi rokotuksia" on kiinnostavampi kuin "Rokotusominaisuuden päivitys."

### Vaihe 2: Kirjoita viestin sisältö

1. Napsauta **Viestin sisältö** -tekstialuetta.
2. Kirjoita yksityiskohtainen viesti, jonka haluat käyttäjien näkevän.
3. Sisällytä relevanttia tietoa, kuten mitä toimintaa käyttäjän tulisi tehdä.
4. Pidä viesti alle 240 merkkiä optimaaliseen näyttöön.

### Vaihe 3: Valitse yleisö

1. Napsauta **Yleisö**-pudotusvalitsinta.
2. Valitse yksi seuraavista yleisösegmenteistä:

| Yleisö | Kuvaus |
|--------|--------|
| **Kaikki käyttäjät** | Lähettää ilmoituksen jokaiselle sovelluksen rekisteröityneelle käyttäjälle |
| **Koiranomistajat** | Kohdistaa käyttäjille, joilla on vähintään yksi koira rekisteröitynä profiilinsa |
| **Kissanomistajat** | Kohdistaa käyttäjille, joilla on vähintään yksi kissa rekisteröitynä profiilissaan |
| **Vahvistetut kasvattajat** | Kohdistaa käyttäjille, jotka on vahvistettu ammattimaisiksi kasvattajiksi |

3. Valittu yleisö määrittää, kuka vastaanottaa push-ilmoituksen.

> **Huomautus:** Käyttäjä voi kuulua useisiin segmentteihin. Esimerkiksi vahvistettu kasvattaja, joka omistaa koiria, vastaanottaa "Koiranomistajille", "Vahvistetuille kasvattajille" ja "Kaikille käyttäjille" kohdistetut ilmoitukset.

### Vaihe 4: Tarkista ennen lähettämistä

1. Tarkista otsikko kirjoitusvirheiden ja selkeyden osalta.
2. Tarkista viestin sisältö tarkkuuden ja sävyn osalta.
3. Varmista, että yleisösegmentti on oikein.
4. Vahvista, ettei tämä ole äskettäin lähetetyn ilmoituksen kopio.

---

## Lähetysvahvistus

Kun olet valmis lähettämään ilmoituksen, vahvistusvaihe varmistaa, ettet vahingossa lähetä väärille yleisölle.

### Lähetysprosessi

1. Napsauta **Lähetä ilmoitus** -painiketta.
2. Vahvistusikkuna tulee näkyviin näyttäen:
   - Ilmoituksen otsikon
   - Viestin sisällön
   - Valitun yleisösegmentin
   - Arvioidun vastaanottajamäärän
3. Tarkista kaikki tiedot vahvistusikkunassa.
4. Napsauta **Vahvista lähetys** lähettääksesi ilmoituksen.
5. Vaihtoehtoisesti napsauta **Peruuta** palataksesi luontilomakkeeseen ja tehdäksesi muutoksia.
6. Onnistuneen toimituksen yhteydessä onnistumisviesti tulee näkyviin vahvistaen, että ilmoitus on jonossa.

> **Tärkeää:** Vahvistuksen jälkeen ilmoitusta ei voi peruuttaa. Tarkista aina yleisö ja sisältö ennen vahvistamista.

---

## Ilmoitushistoria

Luontilomakkeen alapuolella Ilmoitushistoria-osio näyttää kronologisen listan kaikista aiemmin lähetetyistä ilmoituksista.

### Historialistan sarakkeet

| Sarake | Kuvaus |
|--------|--------|
| **Tyyppitagi** | Värikoodattu tagi, joka ilmaisee yleisösegmentin (esim. "Kaikki käyttäjät" sinisellä, "Koiranomistajat" oranssilla) |
| **Otsikko** | Ilmoituksen otsikko sellaisena kuin se lähetettiin |
| **Viesti** | Esikatselu viestin sisällöstä (lyhennetty jos pitkä) |
| **Päivämäärä** | Ilmoituksen lähetyspäivä ja -aika |
| **Vastaanottajamäärä** | Ilmoituksen vastaanottaneiden käyttäjien määrä |

### Historian tarkasteleminen

1. Vieritä alas luontilomakkeen alapuolelle nähdäksesi historialistan.
2. Ilmoitukset on listattu käänteisessä aikajärjestyksessä (uusin ensin).
3. Jokainen rivi näyttää tyyppitägin, otsikon, päivämäärän ja vastaanottajamäärän yhdellä silmäyksellä.
4. Napsauta mitä tahansa riviä laajentaaksesi ja nähdäksesi koko viestin sisällön.

### Tyyppitägien ymmärtäminen

Tyyppitägit ovat värikoodattuja nopeaan tunnistamiseen:

| Tägin väri | Yleisö |
|------------|--------|
| Sininen | Kaikki käyttäjät |
| Oranssi | Koiranomistajat |
| Violetti | Kissanomistajat |
| Vihreä | Vahvistetut kasvattajat |

---

## Push-ilmoitusten parhaat käytännöt

Tehokkaat push-ilmoitukset edistävät sitoutumista ärsyttämättä käyttäjiä. Noudata näitä ohjeita:

### Tiheys

1. **Rajoita tiheyttä** -- Älä lähetä enempää kuin 2-3 ilmoitusta viikossa ellei ole kiireellistä.
2. **Yhdistä liittyvät päivitykset** -- Kokoa useita pieniä päivityksiä yhteen ilmoitukseen.
3. **Kunnioita aikavyöhykkeitä** -- Lähetä ilmoitukset kohtuullisina aikoina (klo 9-20 paikallista aikaa).
4. **Vältä viikonloppuja** -- Ellei ilmoitus ole aikasensitiivinen, suosi arkipäiviä.

### Sisällön laatu

1. **Ole ytimekäs** -- Mene suoraan asiaan. Käyttäjät päättävät sekunneissa sitoutuvatko.
2. **Ole toimintakelpoinen** -- Kerro käyttäjille mitä he voivat tehdä: "Tarkista lemmikkisi tulevat rokotukset."
3. **Ole relevantti** -- Käytä yleisökohdistusta varmistaaksesi, että sisältö vastaa käyttäjien kiinnostuksia.
4. **Vältä klikkiotsikoita** -- Harhaanjohtavat ilmoitukset nakertavat luottamusta ja lisäävät ilmoitusten esto-astetta.
5. **Personoi mahdollisuuksien mukaan** -- Viittaa yleisösegmenttiin: "Huomio koiranomistajat" tuntuu henkilökohtaisemmalta.

### Ajoitus ja konteksti

1. **Uudet ominaisuudet** -- Lähetä kun ominaisuus on käytössä ja saavutettavissa.
2. **Terveysmuistutukset** -- Lähetä muutama päivä ennen lemmikin tapaamista tai rokotuksen erääntymistä.
3. **Kausisisältö** -- Kohdista vuodenaikoihin (esim. kirppu-/punkkimuistutukset keväällä).
4. **Hätäpäivitykset** -- Kiireellisille asioille (huolto, turvallisuus) lähetä välittömästi ajoitussäännöistä riippumatta.

### Tehokkaiden otsikoiden kirjoittaminen

| Hyvä esimerkki | Miksi se toimii |
|----------------|-----------------|
| "Lemmikkisi rokotus erääntyy pian" | Relevantti, luo kiireellisyyttä, selkeä toiminto |
| "Uutta: Tiineysseuranta kasvattajille" | Korostaa uutta arvoa, kohdistaa yleisöön |
| "Huoltotauko tänä iltana klo 22" | Selkeä, tarkka, aikasensitiivinen |

| Huono esimerkki | Miksi se epäonnistuu |
|-----------------|---------------------|
| "Katso tämä!" | Epämääräinen, ei arvolupausta |
| "Päivitys" | Liian yleinen, käyttäjät sivuuttavat |
| "Tärkeää!!!" | Ylikäyttää kiireellisyyttä, tuntuu roskapostilta |

### Menestyksen mittaaminen

Ilmoitusten lähettämisen jälkeen seuraa:

- **Avausprosentit** -- Sitoutuvatko käyttäjät ilmoituksiisi?
- **Estoprosentit** -- Piikki viittaa ilmoitusväsymykseen.
- **Sovelluksen sisäinen aktiivisuus** -- Ohjaako ilmoitus toivottua käyttäytymistä?
- **Palaute** -- Tarkista Palaute-sivu käyttäjien reaktioiden varalta.

---

## Yleisösegmenttien yksityiskohdat

### Kaikki käyttäjät

- Sisältää jokaisen rekisteröidyn tilin järjestelmässä.
- Käytä alustan laajuisiin tiedotteisiin, huoltoilmoituksiin tai yleisiin ominaisuuksiin.
- Suurin yleisö -- käytä säästeliäästi ilmoitusväsymyksen välttämiseksi.

### Koiranomistajat

- Sisältää käyttäjät, joilla on vähintään yksi koira lemmikkiprofiilissaan.
- Käytä koirakohtaisiin terveysvinkkeihin, rotutapahtumiin tai ominaisuuspäivityksiin.
- Esimerkki: "Muistutus: Vuosittainen sydänmatoennaltaehkäisy koirille."

### Kissanomistajat

- Sisältää käyttäjät, joilla on vähintään yksi kissa lemmikkiprofiilissaan.
- Käytä kissakohtaiseen sisältöön, sisäterveysvinkkeihin tai kissaominaisuuksiin.
- Esimerkki: "Uutta: Sisäaktiivisuuden seuranta kissoille."

### Vahvistetut kasvattajat

- Sisältää käyttäjät, jotka ovat suorittaneet kasvattajavahvistuksen.
- Käytä jalostuskohtaisiin ominaisuuksiin, vaatimustenmukaisuuspäivityksiin tai ammatillisiin työkaluihin.
- Esimerkki: "Tiineysseurannan parannukset nyt käytössä."

---

## Vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| Ilmoitus ei lähde | Varmista, että kaikki vaaditut kentät on täytetty. Tarkista verkkoyhteys. |
| Vastaanottajamäärä näyttää 0 | Valittu yleisösegmentti saattaa olla tyhjä. Varmista, että kyseisessä segmentissä on käyttäjiä. |
| Käyttäjät raportoivat etteivät vastaanota | Käyttäjät ovat saattaneet poistaa push-ilmoitukset käytöstä laitteellaan. Tämä on ylläpitäjän hallinnan ulkopuolella. |
| Kaksoiskappale lähetetty | Tarkista historialista ennen lähettämistä. Vahvistuksen jälkeen ei ole peruutusmahdollisuutta. |

---

## Liittyvät sivut

- [Palaute](./feedback.md) -- Seuraa käyttäjien reaktioita ilmoituksiin
- [Analytiikka](./analytics.md) -- Seuraa käyttäjien sitoutumistrendejä
- [Asetukset](./settings.md) -- Määritä ilmoituksiin liittyvät järjestelmäasetukset
