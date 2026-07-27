# Asetukset

Asetukset-sivu tarjoaa järjestelmänlaajuiset asetusvaihtoehdot Petfolioo-alustalle. Asetukset on järjestetty kolmeen välilehteen: Yleiset, Ilmoitukset ja Tietoturva. Täällä tehdyt muutokset vaikuttavat sekä hallintaportaalin että mobiilisovelluksen toimintaan.

![Settings](/docs/screenshots/settings.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Yleiskatsaus

Vain ylläpitäjät, joilla on super_admin- tai admin-rooli (Asetukset-sivun käyttöoikeudella), voivat tarkastella ja muokata asetuksia. Kaikki muutokset vaativat nimenomaisen tallennuksen ja tulevat voimaan välittömästi tallennuksen jälkeen.

---

## Asetuksiin pääsy

1. Napsauta **Asetukset** sivupalkin navigointivalikossa.
2. Asetukset-sivu latautuu kolmella välilehdellä yläosassa.
3. **Yleiset**-välilehti on valittu oletuksena.

---

## Yleiset-välilehti

Yleiset-välilehti sisältää sovelluksen ydinasetusvaihtoehdot, jotka määrittävät miten alusta esittelee itsensä ja toimii.

### Kentät

| Kenttä | Kuvaus | Oletus |
|--------|--------|--------|
| **Sovelluksen nimi** | Sovelluksen näyttönimi, joka näkyy ilmoituksissa ja sähköposteissa | Petfolioo |
| **Tukisähköposti** | Käyttäjille näytettävä yhteydenotto-sähköpostiosoite tukitiedusteluihin | -- |
| **Oletuskieli** | Oletuskieli uusille käyttäjille ja järjestelmäviestinnälle | Englanti |
| **Huoltotila** | Kytkin huoltotilan käyttöönottoon tai poistamiseen | Pois |

### Yleisten asetusten määrittäminen

#### Sovelluksen nimi

1. Etsi **Sovelluksen nimi** -kenttä.
2. Tyhjennä nykyinen arvo ja kirjoita haluttu sovelluksen nimi.
3. Tämä nimi näkyy push-ilmoituksissa, sähköpostien otsikoissa ja mobiilisovelluksen tietosivulla.

#### Tukisähköposti

1. Etsi **Tukisähköposti**-kenttä.
2. Syötä sähköpostiosoite, johon käyttäjien tulisi ohjata tukitiedustelunsa.
3. Tämä sähköposti näytetään mobiilisovelluksen ohje-/yhteydenotto-näytöllä.

> **Vinkki:** Käytä jaettua tiimisähköpostia (esim. support@petfolioo.com) henkilökohtaisen osoitteen sijaan, jotta useat tiimin jäsenet voivat vastata.

#### Oletuskieli

1. Napsauta **Oletuskieli**-pudotusvalikkoa.
2. Valitse kieli, jota käytetään oletuksena:
   - Uusien käyttäjätilien luontiin
   - Järjestelmän luomiin ilmoituksiin
   - Sähköpostimalleihin
3. Käyttäjät voivat ohittaa tämän omissa mobiilisovelluksen asetuksissaan.

#### Huoltotila

Huoltotila on kriittinen ominaisuus, joka viestii käyttäjille, että alusta on väliaikaisesti pois käytöstä.

1. Etsi **Huoltotila**-kytkin.
2. Napsauta kytkintä ottaaksesi huoltotilan käyttöön.
3. Varoitusikkuna tulee näkyviin vahvistaen toiminnon.

**Kun huoltotila on käytössä:**

| Vaikutus | Kuvaus |
|----------|--------|
| Hallintaportaalin varoitus | Näkyvä banneri ilmestyy hallintaportaalin yläosaan ilmoittaen, että huoltotila on aktiivinen |
| Mobiilisovelluksen vaikutus | Mobiilisovellus näyttää käyttäjille huoltonäytön estäen normaalin käytön |
| API-käyttäytyminen | API-päätepisteet palauttavat huoltotilavastauksia |
| Ylläpitäjäpääsy | Ylläpitäjät voivat edelleen käyttää hallintaportaalia normaalisti |

4. Poista huoltotila käytöstä napsauttamalla kytkintä uudelleen.
5. Vahvista toiminto ikkunassa.
6. Alusta palautuu normaaliin toimintaan välittömästi.

> **Varoitus:** Huoltotilan käyttöönotto vaikuttaa välittömästi kaikkiin mobiilisovelluksen käyttäjiin. Ota se käyttöön vain suunniteltujen huoltoikkunoiden aikana ja viesti aikataulusta etukäteen push-ilmoituksella.

---

## Ilmoitukset-välilehti

Ilmoitukset-välilehti hallitsee automaattisia ilmoituskäyttäytymisiä -- järjestelmän luomia hälytyksiä, jotka lähetetään käyttäjille heidän lemmikkitietojensa perusteella.

### Kentät

| Kenttä | Kuvaus | Tyyppi | Oletus |
|--------|--------|--------|--------|
| **Rokotusmuistutukset** | Lähetä automaattiset muistutukset, kun lemmikin rokotuksen eräpäivä lähestyy | Kytkin | Päällä |
| **Tiineyshälytykset** | Lähetä hälytykset tiineyden virstanpylväspäiville ja odotetusta synnytyksestä | Kytkin | Päällä |
| **Jalostuspäivitykset** | Lähetä päivitykset paritusaikataulutapahtumista ja vahvistuksista | Kytkin | Päällä |
| **Muistutuspäivät ennen eräpäivää** | Päivien määrä ennen eräpäivää, jolloin muistutusilmoitus lähetetään | Numerosyöte | 7 |

### Ilmoitusasetusten määrittäminen

#### Rokotusmuistutukset

1. Etsi **Rokotusmuistutukset**-kytkin.
2. Kun **käytössä** (oletus):
   - Käyttäjät saavat push-ilmoituksia ennen lemmikkinsä rokotuksen eräpäiviä.
   - Ilmoitus lähetetään "Muistutuspäivät ennen eräpäivää" -asetuksen perusteella.
   - Esimerkki: Jos asetettu 7 päivään, käyttäjät saavat muistutuksen viikkoa ennen rokotuksen erääntymistä.
3. Kun **pois käytöstä**:
   - Automaattisia rokotusmuistutuksia ei lähetetä.
   - Käyttäjien on tarkistettava lemmikkinsä rokotusaikataulu manuaalisesti.

#### Tiineyshälytykset

1. Etsi **Tiineyshälytykset**-kytkin.
2. Kun **käytössä** (oletus):
   - Tiineyttä seuraavat käyttäjät saavat virstanpylväsilmoituksia.
   - Hälytykset sisältävät odotetun synnytyspäivän muistutukset ja vaiheiden muutokset.
   - Kasvattajat saavat lisäksi ammatillisia seurantailmoituksia.
3. Kun **pois käytöstä**:
   - Automaattisia tiineyshälytyksiä ei lähetetä.

#### Jalostuspäivitykset

1. Etsi **Jalostuspäivitykset**-kytkin.
2. Kun **käytössä** (oletus):
   - Käyttäjät saavat ilmoituksia ajoitetuista paritusapahtumista.
   - Vahvistusilmoitukset lähetetään, kun paritustietueet kirjataan.
   - Kasvattajat saavat matchiehdotuksia ja aikataulumuistutuksia.
3. Kun **pois käytöstä**:
   - Automaattisia jalostukseen liittyviä ilmoituksia ei lähetetä.

#### Muistutuspäivät ennen eräpäivää

1. Etsi **Muistutuspäivät ennen eräpäivää** -numerosyöte.
2. Syötä päivien määrä ennen eräpäivää, jolloin muistutukset tulisi lähettää.
3. Tämä arvo koskee kaikkia päivämääräpohjaisia muistutuksia (rokotukset, tapaamiset).
4. Kelvollinen alue: 1-30 päivää.

> **Vinkki:** 7 päivän arvo toimii hyvin useimmille käyttäjille. Kasvattajille, jotka hallitsevat useita lemmikkejä, harkitse 14 päivän asettamista enemmän valmistautumisajan antamiseksi.

### Ilmoitusten vuorovaikutustaulukko

| Asetus | Vaikuttaa | Käyttäjävaikutus |
|--------|-----------|-----------------|
| Rokotusmuistutukset PÄÄLLÄ + 7 päivää | Käyttäjät, joiden lemmikeillä on tulevia rokotuksia | "Rexin rabiesrokotus erääntyy 7 päivän kuluttua" |
| Tiineyshälytykset PÄÄLLÄ | Käyttäjät, joilla on aktiivisia tiineystietueita | "Lunan tiineys on edennyt viikolle 6" |
| Jalostuspäivitykset PÄÄLLÄ | Käyttäjät, joilla on ajoitettuja parituksia | "Paritustapaaminen Maxin kanssa vahvistettu perjantaiksi" |
| Kaikki kytkimet POIS | Kaikki käyttäjät | Ei automaattisia ilmoituksia; vain manuaaliset ylläpitäjäilmoitukset |

---

## Tietoturva-välilehti

Tietoturva-välilehti sisältää asetukset, jotka hallitsevat API:n nopeusrajoitusta, todennustokenien elinaikoja ja tiedostolatausrajoituksia.

### Kentät

| Kenttä | Kuvaus | Tyyppi | Oletus |
|--------|--------|--------|--------|
| **Nopeusrajoitus per minuutti** | Maksimi API-pyyntöjen määrä per käyttäjä per minuutti | Numero | 60 |
| **Käyttöoikeustokenin vanheneminen (tuntia)** | Kuinka kauan käyttöoikeustoken pysyy voimassa | Numero | 24 |
| **Uusimistokenin vanheneminen (päiviä)** | Kuinka kauan uusimistoken pysyy voimassa | Numero | 30 |
| **Kuvan maksimikoko (MB)** | Suurin sallittu tiedostokoko lemmikkikuville | Numero | 5 |
| **Profiilikuvan maksimikoko (MB)** | Suurin sallittu tiedostokoko käyttäjien profiilikuville | Numero | 2 |
| **Sallitut tiedostotyypit** | Pilkuilla erotettu lista hyväksytyistä MIME-tyypeistä latauksille | Teksti | image/jpeg,image/png,image/webp |

### Tietoturva-asetusten määrittäminen

#### Nopeusrajoitus per minuutti

1. Etsi **Nopeusrajoitus per minuutti** -kenttä.
2. Syötä maksimimäärä API-pyyntöjä, joita yksittäinen käyttäjä voi tehdä minuutissa.
3. Tämän rajan ylittävät pyynnöt saavat 429 (Too Many Requests) -vastauksen.
4. Suositeltu alue: 30-120 odotettujen käyttökuvioiden mukaan.

> **Tärkeää:** Liian matala arvo saattaa aiheuttaa mobiilisovelluksen toimintahäiriöitä aktiivisille käyttäjille. Liian korkea arvo saattaa jättää järjestelmän haavoittuvaksi väärinkäytölle. Oletus 60 soveltuu useimpiin käyttöönottoihin.

#### Käyttöoikeustokenin vanheneminen (tuntia)

1. Etsi **Käyttöoikeustokenin vanheneminen** -kenttä.
2. Syötä tuntien määrä, jonka käyttöoikeustoken pysyy voimassa myöntämisen jälkeen.
3. Kun token vanhenee, sovellus käyttää uusimistokenia uuden hankkimiseen.
4. Lyhyemmät arvot ovat turvallisempia; pidemmät arvot vähentävät kirjautumiskitkaa.

| Arvo | Tietoturva | Käyttökokemus |
|------|------------|---------------|
| 1 tunti | Korkea | Toistuva uudelleentodennus |
| 24 tuntia | Keskitaso | Hyvä tasapaino (suositeltava) |
| 72 tuntia | Matalampi | Minimaalinen keskeytys |

#### Uusimistokenin vanheneminen (päiviä)

1. Etsi **Uusimistokenin vanheneminen** -kenttä.
2. Syötä päivien määrä, jonka uusimistoken pysyy voimassa.
3. Kun uusimistoken vanhenee, käyttäjän on kirjauduttava uudelleen tunnuksillaan.
4. Suositeltu alue: 7-90 päivää.

> **Vinkki:** Kuluttajasovellukselle kuten Petfolioo 30 päivää on hyvä tasapaino. Käyttäjät, jotka avaavat sovelluksen vähintään kuukausittain, eivät koskaan joudu kirjautumaan uudelleen. Korkeamman tietoturvan käyttöönotoissa harkitse 7 päivää.

#### Kuvan maksimikoko (MB)

1. Etsi **Kuvan maksimikoko** -kenttä.
2. Syötä suurin tiedostokoko megatavuina lemmikkikuvien latauksille.
3. Tämän koon ylittävät kuvat hylätään virheilmoituksella.
4. Huomioi tallennuskustannukset ja latausajat hitailla yhteyksillä oleville käyttäjille.

| Arvo | Sopii |
|------|-------|
| 2 MB | Vähäinen tallennus, nopeat lataukset, matalampi laatu |
| 5 MB | Tasapainoinen (suositeltava) |
| 10 MB | Korkealaatuiset kuvat, enemmän tallennustilan käyttöä |

#### Profiilikuvan maksimikoko (MB)

1. Etsi **Profiilikuvan maksimikoko** -kenttä.
2. Syötä suurin tiedostokoko megatavuina käyttäjäprofiilikuvien latauksille.
3. Profiilikuvat ovat tyypillisesti pienempiä kuin lemmikkikuvat, koska ne näytetään pienennetyllä resoluutiolla.
4. Suositeltu: 1-3 MB.

#### Sallitut tiedostotyypit

1. Etsi **Sallitut tiedostotyypit** -kenttä.
2. Syötä pilkuilla erotettu lista MIME-tyypeistä, jotka järjestelmä hyväksyy latauksille.
3. Jokaisen MIME-tyypin tulisi olla muotoa `type/subtype`.
4. Älä lisää välilyöntejä merkintöjen väliin ellei tarkoita niitä MIME-tyyppimerkkijonoon.

**Yleisimmät MIME-tyypit kuvalatauksille:**

| MIME-tyyppi | Muoto | Huomautukset |
|-------------|-------|--------------|
| `image/jpeg` | JPEG | Yleisin kuvamuoto, hyvä pakkaus |
| `image/png` | PNG | Häviötön, tukee läpinäkyvyyttä |
| `image/webp` | WebP | Moderni muoto, erinomainen pakkaus |
| `image/heic` | HEIC | Applen muoto, käytetään iPhone-kameroissa |
| `image/gif` | GIF | Animoidut kuvat, suuremmat tiedostokoot |

**Esimerkkimääritykset:**

```
Vakio:      image/jpeg,image/png,image/webp
Laajennettu: image/jpeg,image/png,image/webp,image/heic,image/gif
Minimaalinen: image/jpeg,image/png
```

> **Varoitus:** Tukemattomien MIME-tyyppien lisääminen saattaa sallia latauksia, joita järjestelmä ei voi käsitellä. Lisää vain tyyppejä, joita kuvankäsittelyputkesi tukee.

---

## Asetusten tallentaminen

Kaikki asetusmuutokset vaativat nimenomaisen tallennustoiminnon.

### Tallennusvaiheet

1. Tee haluamasi muutokset mille tahansa kolmesta välilehdestä.
2. Napsauta **Tallenna asetukset** -painiketta sivun alaosassa.
3. Latausilmaisin tulee näkyviin muutosten käyttöönottamisen aikana.
4. Onnistumisilmoitus vahvistaa asetusten tallennuksen.
5. Muutokset tulevat voimaan välittömästi koko alustalla.

### Tärkeitä huomautuksia tallennuksesta

- Muutoksia **ei** tallenneta automaattisesti. Jos navigoit pois tallentamatta, muutokset menetetään.
- Voit muokata asetuksia useilla välilehdillä ennen tallentamista -- kaikki muutokset tallennetaan yhdessä.
- Jos validointivirhe tapahtuu, kyseinen kenttä korostetaan virheilmoituksella.
- Vain muuttuneet kentät lähetetään palvelimelle (optimistinen osapäivitys).

> **Vinkki:** Tietoturva-asetusten (nopeusrajoitukset, tokenien vanheneminen) tallentamisen jälkeen seuraa järjestelmää hetken varmistaaksesi, ettei odottamatonta käyttäytymistä ilmene.

---

## Asetusmuutosten auditointi

Kaikki asetusmuutokset kirjataan tietoturvan ja vastuullisuuden vuoksi:

| Kirjattu tieto | Kuvaus |
|----------------|--------|
| Ylläpitäjän nimi | Kuka teki muutoksen |
| Aikaleima | Milloin muutos tehtiin |
| Muutettu kenttä | Mikä asetus muutettiin |
| Edellinen arvo | Arvo ennen muutosta |
| Uusi arvo | Arvo muutoksen jälkeen |

---

## Vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| Asetukset-sivulle ei pääse | Varmista, että roolisi on super_admin tai admin, jolla on Asetukset-oikeus. |
| Tallenna-painike ei ole aktiivinen | Muutoksia ei ole tehty. Muokkaa vähintään yhtä kenttää aktivoidaksesi tallennuksen. |
| Validointivirhe tallennuksessa | Tarkista korostettu kenttä erityisen virheilmoituksen varalta ja korjaa arvo. |
| Huoltotila ei vaikuta sovellukseen | Anna 1-2 minuuttia muutoksen leviämiseksi kaikkiin mobiilisovelluksen instansseihin. |
| Nopeusrajoitus liian tiukka | Nosta arvoa ja tallenna. Vaikutuksen alaiset käyttäjät vapautuvat minuutin sisällä. |
| Tiedostolatausvirheitä tyypin muuttamisen jälkeen | Varmista, että MIME-tyypit on muotoiltu oikein ilman perässä olevia pilkkuja tai välilyöntejä. |

---

## Liittyvät sivut

- [Ylläpitäjät](./admin-users.md) -- Hallitse kuka voi käyttää ja muokata asetuksia
- [Ilmoitukset](./notifications.md) -- Lähetä manuaalisia ilmoituksia käyttäjille
- [Analytiikka](./analytics.md) -- Seuraa alustan terveyttä ja käyttöä
