# Kojelauta

Kojelauta on ensimmäinen näkymä kirjautumisen jälkeen Petfolioo-hallintaportaalissa. Se tarjoaa reaaliaikaisen yleiskatsauksen alustan tilasta keskeisten suorituskykymittareiden (KPI), interaktiivisten kaavioiden ja viimeaikaisten toimintojen syötteiden kautta. Käytä kojelautaa kasvutrendien seurantaan, huomiota vaativien alueiden tunnistamiseen ja alustan sitoutumisen tarkkailuun yhdellä silmäyksellä.

![Dashboard](/docs/screenshots/dashboard.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View |
> | Admin | View |
> | Moderator | View |
> | Viewer | View |

---

## KPI-kortit

Kojelaudan yläosassa neljä yhteenvetokorttia näyttävät alustan tärkeimmät mittarit. Jokainen kortti näyttää nykyisen kokonaismäärän ja prosentuaalisen muutoksen edelliseen ajanjaksoon verrattuna.

### Korttien määrittelyt

| Kortti | Mittari | Kuvaus |
|--------|---------|--------|
| Käyttäjät yhteensä | Rekisteröityneiden sovelluskäyttäjien määrä | Kaikki käyttäjät, jotka ovat luoneet tilin alustalle |
| Lemmikit yhteensä | Rekisteröityjen lemmikkien määrä | Kaikki rekisteriin lisätyt lemmikit tilasta riippumatta |
| Odottavat vahvistukset | Tarkastusta odottavat kohteet | Vahvistuspyynnöt, joita ei ole vielä hyväksytty tai hylätty |
| Aktiiviset ilmoitukset | Tällä hetkellä näkyvät ilmoitukset | Lemmikit, jotka on merkitty saataville jalostukseen tai adoptioon |

### Kasvuprosentti

Jokaisessa KPI-kortissa on kasvuindikaattori:

- **Vihreä nuoli ylös** prosentilla tarkoittaa kasvua edelliseen ajanjaksoon verrattuna.
- **Punainen nuoli alas** prosentilla tarkoittaa laskua edelliseen ajanjaksoon verrattuna.
- Vertailujakso vastaa valittua aikaväliä (katso Aikavälin valitsin alla).

> **Vinkki:** Vie hiiri KPI-kortin päälle nähdäksesi tarkat luvut nykyiselle ja edelliselle ajanjaksolle työkaluvihjeessä.

### Korttien lukeminen

1. **Suuri numero** on nykyinen kokonaismäärä.
2. **Prosenttimerkki** sen alapuolella näyttää jakso-jakso-muutoksen.
3. **Otsikko** yläosassa kertoo, mikä mittari on näytössä.
4. Napsauta mitä tahansa korttia siirtyäksesi suoraan vastaavaan moduuliin (esim. "Käyttäjät yhteensä" avaa Käyttäjät-listan).

---

## Aikavälin valitsin

Aikavälin valitsin ohjaa kaikkien kojelaudan analytiikkojen ja KPI-vertailujen tietoikkunaa.

### Käytettävissä olevat aikavälit

| Vaihtoehto | Ajanjakso | Vertailu |
|------------|-----------|----------|
| 7pv | Viimeiset 7 päivää | Edellinen 7 päivää |
| 30pv | Viimeiset 30 päivää | Edellinen 30 päivää |
| 90pv | Viimeiset 90 päivää | Edellinen 90 päivää |
| Kaikki | Alustan käynnistyksestä | Ei vertailua (kasvuprosentti piilotettu) |

### Aikavälin vaihtaminen

1. Etsi **aikavälin valitsin** kojelaudan oikeasta yläkulmasta KPI-korttien yläpuolelta.
2. Napsauta yhtä ajanjaksopainikkeista: **7pv**, **30pv**, **90pv** tai **Kaikki**.
3. Koko kojelauta päivittyy näyttämään valitun ajanjakson.
4. KPI-kasvuprosentit lasketaan uudelleen uuden vertailuikkunan perusteella.

> **Huomautus:** "Kaikki"-vaihtoehto piilottaa kasvuprosentit, koska ei ole aiempaa ajanjaksoa, johon verrata.

---

## Lemmikkianalytiikka-osio

KPI-korttien alapuolella Lemmikkianalytiikka-osio esittää visuaalisia erittelyjä lemmikkirekisterin tiedoista. Kolme kaaviotyyppiä tarjoavat eri näkökulmia lemmikkipopulaatioon.

### Lajijakauma (ympyräkaavio)

Ympyräkaavio näyttää lemmikkien suhteellisen jakautumisen lajin mukaan.

| Elementti | Kuvaus |
|-----------|--------|
| Kaaviotyyppi | Donitsi-/ympyräkaavio |
| Tietolähde | Kaikki rekisteröidyt lemmikit ryhmiteltyinä lajin mukaan |
| Segmentit | Yksi segmentti per laji (esim. Koira, Kissa, Lintu, Kani, Matelija) |
| Tunnisteet | Lajin nimi ja määrä näkyvät hiirellä osoitettaessa |
| Selite | Värikoodattu selite kaavion alla tai vieressä |

**Ympyräkaavion vuorovaikutus:**

1. Vie hiiri minkä tahansa segmentin päälle nähdäksesi tarkan määrän ja prosentin kyseiselle lajille.
2. Napsauta segmenttiä suodattaaksesi muut kojelaudan kaaviot vain kyseiselle lajille.
3. Selitteen kohteet ovat napsautettavia - napsauta lajin nimeä vaihtaaksesi sen näkyvyyttä kaaviossa.

### Sukupuolijakauma (pylväskaavio)

Pystysuora pylväskaavio näyttää lemmikkien jakautumisen sukupuolen mukaan.

| Elementti | Kuvaus |
|-----------|--------|
| Kaaviotyyppi | Pystysuora pylväskaavio |
| X-akseli | Sukupuolikategoriat (Uros, Naaras, Tuntematon) |
| Y-akseli | Lemmikkien määrä |
| Pylväät | Yksi pylväs per sukupuoli, värikoodattu |
| Tunnisteet | Määrä näkyy kunkin pylvään yläpuolella |

**Sukupuolikaavion lukeminen:**

1. Jokainen pylväs edustaa yhtä sukupuolikategoriaa.
2. Pylvään korkeus vastaa kyseisen sukupuolen lemmikkien kokonaismäärää.
3. Tarkka määrä näkyy tunnisteena kunkin pylvään yläpuolella.
4. Vie hiiri päälle lisätietojen, mukaan lukien kokonaisprosentti, näyttämiseksi.

### Maajakauma (vaakasuora pylväskaavio)

Vaakasuora pylväskaavio järjestää maat rekisteröityjen lemmikkien määrän mukaan.

| Elementti | Kuvaus |
|-----------|--------|
| Kaaviotyyppi | Vaakasuora pylväskaavio |
| Y-akseli | Maiden nimet (järjestetty määrän mukaan, laskeva) |
| X-akseli | Lemmikkien määrä |
| Pylväät | Yksi vaakasuora pylväs per maa |
| Näyttö | Oletuksena näkyy 10 suosituinta maata |

**Maakaavion lukeminen:**

1. Maat ovat järjestyksessä eniten lemmikeistä (ylin) vähiten (alin).
2. Oletuksena näkyy vain 10 suosituinta maata.
3. Vie hiiri pylvään päälle nähdäksesi tarkka määrä ja osuus kokonaisesta.
4. Pylvään pituus on verrannollinen määrään suhteessa muihin maihin.

---

## Maantieteelliset ja lajisuodattimet

Analytiikkakaavioiden yläpuolella suodattimet mahdollistavat näytettävien tietojen rajaamisen.

### Käytettävissä olevat suodattimet

| Suodatin | Tyyppi | Vaihtoehdot |
|----------|--------|-------------|
| Laji | Pudotusvalikko | Kaikki alustalla saatavilla olevat lajit (esim. Koira, Kissa, Lintu jne.) |
| Maa | Pudotusvalikko | Kaikki maat, joissa on rekisteröityjä lemmikkejä |

### Suodattimien käyttäminen

1. Napsauta **Laji**-pudotusvalikkoa valitaksesi tietyn lemmikkilajin.
2. Napsauta **Maa**-pudotusvalikkoa valitaksesi tietyn maan.
3. Alla olevat kaaviot ja taulukot päivittyvät välittömästi suodattimen mukaan.
4. Suodattimia voi yhdistää - valitse sekä laji että maa tulosten tarkentamiseksi.
5. Nollaaksesi valitse "Kaikki" kustakin pudotusvalikosta tai napsauta **Nollaa suodattimet** -painiketta.

> **Vinkki:** Käytä lajisuodatinta ympyräkaavionäkymässä porautuaksesi rotujakaumiin yksittäisen lajin sisällä.

### Suodattimien käyttäytyminen

| Tilanne | Vaikutus |
|---------|----------|
| Ei suodattimia valittu | Kaikki tiedot näytetään globaalisti |
| Vain laji valittu | Kaaviot näyttävät tiedot kyseiselle lajille kaikissa maissa |
| Vain maa valittu | Kaaviot näyttävät tiedot kaikille lajeille kyseisessä maassa |
| Molemmat valittu | Kaaviot näyttävät tiedot valitulle lajille valitussa maassa |

---

## Viimeaikaiset käyttäjärekisteröinnit -taulukko

Analytiikkakaavioiden alapuolella taulukko näyttää viimeisimmät käyttäjärekisteröinnit alustalla.

### Taulukon sarakkeet

| Sarake | Kuvaus |
|--------|--------|
| Profiilikuva | Käyttäjän profiilikuvan pikkukuva |
| Nimi | Käyttäjän näyttönimi |
| Sähköposti | Käyttäjän rekisteröity sähköpostiosoite |
| Liittymispäivä | Tilin luontipäivä ja -aika |
| Tila | Tilin tila (Aktiivinen, Odottaa, Estetty) |
| Lemmikit | Tämän käyttäjän rekisteröimien lemmikkien määrä |

### Taulukon ominaisuudet

1. **Lajittelu** - Napsauta mitä tahansa sarakeotsikkoa lajitellaksesi kyseisen sarakkeen mukaan. Napsauta uudelleen kääntääksesi järjestyksen.
2. **Sivutus** - Taulukko näyttää oletuksena 10 merkintää per sivu. Käytä sivutussäätimiä alareunassa navigointiin.
3. **Pikatoiminnot** - Vie hiiri rivin päälle paljastaaksesi "Näytä"-painikkeen, joka avaa käyttäjän tietolaatikon.

### Tilaindikaattorien ymmärtäminen

| Tila | Merkin väri | Merkitys |
|------|-------------|----------|
| Aktiivinen | Vihreä | Tili on hyvässä kunnossa ja täysin toiminnallinen |
| Odottaa | Oranssi | Tili luotu, mutta sähköpostia ei ole vielä vahvistettu |
| Estetty | Punainen | Ylläpitäjä on keskeyttänyt tilin |

> **Huomautus:** Viimeaikaiset rekisteröinnit -taulukko näyttää aina uusimmat käyttäjät ensin aikavälin valitsimen asetuksesta riippumatta. Se näyttää viimeisten 30 päivän rekisteröinnit.

---

## Kojelaudan parhaat käytännöt

### Päivittäinen seurantatarkistuslista

1. Tarkista **Odottavat vahvistukset** KPI-kortti - korkea määrä voi viitata ruuhkaan.
2. Tarkista **kasvuprosentit** kaikissa neljässä kortissa odottamattomien laskujen varalta.
3. Selaa **Viimeaikaiset käyttäjärekisteröinnit** -taulukkoa epäilyttävien tilien varalta.
4. Huomioi merkittävät muutokset **Maajakauma**-kaaviossa.

### Trendien tulkitseminen

| Trendi | Mahdollinen merkitys | Suositeltu toimenpide |
|--------|---------------------|----------------------|
| Äkillinen piikki rekisteröinneissä | Markkinointikampanjan onnistuminen tai bottiaktiivisuus | Tarkista viimeaikaiset käyttäjät epäilyttävien kuvioiden varalta |
| Lasku aktiivisissa ilmoituksissa | Kausimuutos tai käytäntöongelma | Tarkista viimeaikaiset estotoimet ja ilmoitusten vanhemiset |
| Korkea odottavien vahvistusten määrä | Alimitoitettu moderointi | Määrää lisää moderaattoreita |
| Lajijakauman muutos | Alueellinen trendi tai kategoriamääritysvirhe | Tarkista kategoria-asetukset |

---

## Kojelaudan suorituskyky

Kojelauta lataa tiedot asynkronisesti. Jokainen osio latautuu itsenäisesti:

1. **KPI-kortit** latautuvat ensin (nopein kysely).
2. **Kaaviot** latautuvat seuraavaksi lyhyellä latausanimaatiolla.
3. **Viimeaikaiset rekisteröinnit -taulukko** latautuu viimeisenä.

Jos jokin osio näyttää latausvirheen:

1. Tarkista internet-yhteytesi.
2. Yritä päivittää sivu.
3. Jos virhe jatkuu, taustajärjestelmä saattaa kokea ongelmia.

> **Vinkki:** Kojelauta päivittyy automaattisesti 5 minuutin välein. Voit päivittää manuaalisesti napsauttamalla päivityskuvaketta yläpalkissa tai painamalla `F5`.

---

*Edellinen: [Aloitusopas](./getting-started.md) | Seuraava: [Lemmikkirekisteri](./pets.md)*
