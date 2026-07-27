# Analytiikka

Analytiikka-sivu tarjoaa visuaalisia näkemyksiä alustan käytöstä, käyttäjäkasvusta, lemmikkien demografioista ja terveystoiminnasta. Käytä näitä kaavioita ymmärtääksesi trendejä, mitataksesi sitoutumista ja tehdäksesi datapohjaisia päätöksiä Petfolioo-alustasta.

![Analytics](/docs/screenshots/analytics.png)

> **Access:** Super Admin, Admin, Viewer
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | No access |
> | Viewer | View only |

---

## Yleiskatsaus

Analytiikkakojelauta esittää neljä päävisualisointia sekä aikavälin valitsimen, joka ohjaa kaikkien kaavioiden tietoikkunaa. Jokainen kaavio päivittyy dynaamisesti kun vaihdat valittua aikaväliä.

---

## Analytiikan käyttäminen

1. Napsauta **Analytiikka** sivupalkin navigointivalikossa.
2. Kojelauta latautuu kaikki kaaviot näyttäen yhdellä vieritettävällä sivulla.
3. Oletusaikaväli on **30 päivää**.

---

## Aikavälin valitsin

Analytiikka-sivun yläosassa aikavälin valitsin mahdollistaa kaikkien kaavioiden tietojakson hallitsemisen.

### Käytettävissä olevat aikavälit

| Vaihtoehto | Ajanjakso | Parhaiten sopii |
|------------|-----------|-----------------|
| **7pv** | Viimeiset 7 päivää | Viimeaikaisen toiminnan seuranta ja lyhytaikaiset trendit |
| **30pv** | Viimeiset 30 päivää | Kuukausiraportointi ja yleinen trendianalyysi (oletus) |
| **90pv** | Viimeiset 90 päivää | Vuosineljänneskatsaukset ja keskipitkän aikavälin kuvioiden tunnistaminen |
| **1 vuosi** | Viimeiset 365 päivää | Vuosikatsaukset, kausivaihtelut ja pitkän aikavälin kasvu |

### Aikavälin vaihtaminen

1. Etsi aikavälin valitsin sivun yläosasta.
2. Napsauta yhtä aikavälipainikkeista: **7pv**, **30pv**, **90pv** tai **1 vuosi**.
3. Valittu painike korostuu ilmaisten aktiivisen aikavälin.
4. Kaikki sivun kaaviot päivittyvät näyttämään valitun ajanjakson tiedot.
5. Kaavioiden akselit ja tunnisteet mukautuvat automaattisesti uuteen aikaikkunaan.

> **Vinkki:** Aloita 30pv:lla yleiskatsaukseen, sitten rajaa 7pv:lle viimeaikaisten poikkeamien tutkimiseen tai laajenna 1 vuoteen hallitustason raportointia varten.

---

## Käyttäjäkasvukaavio

### Kaaviotyyppi

Viivakaaviojoka näyttää käyttäjärekisteröintitrendit ajan myötä.

### Mitä se näyttää

Käyttäjäkasvukaavio visualisoi uusien käyttäjärekisteröintien määrän valitulla ajanjaksolla. Jokainen datapiste edustaa uusien käyttäjien kumulatiivista tai päivittäistä määrää.

### Kaavion lukeminen

| Elementti | Kuvaus |
|-----------|--------|
| **X-akseli** | Aika (päivät tai viikot valitusta aikavälista riippuen) |
| **Y-akseli** | Uusien käyttäjärekisteröintien määrä |
| **Viiva** | Jatkuva viiva, joka yhdistää datapisteet näyttäen kasvupolun |
| **Datapisteet** | Hiirellä osoitettavat merkit viivalla näyttäen tarkat arvot |
| **Työkaluvihje** | Tulee näkyviin hiirellä osoitettaessa näyttäen päivämäärän ja tarkan rekisteröintimäärän |

### Tietojen tulkitseminen

1. **Nouseva trendi** -- Johdonmukainen kasvu käyttäjähankinnassa. Alusta houkuttelee uusia käyttäjiä tasaisesti.
2. **Tasainen viiva** -- Käyttäjähankinta on tasaantunut. Harkitse markkinointitoimia tai ominaisuusjulkaisuja kasvun elvyttämiseksi.
3. **Piikit** -- Äkilliset nousut voivat korreloida markkinointikampanjoiden, lehdistönäkyvyyden tai sovelluskaupan nostojen kanssa.
4. **Laskut** -- Päivittäisten rekisteröintien vähenemät voivat viitata kausivaihteluihin tai teknisiin ongelmiin.

### Aikavälin käyttäytyminen

| Aikaväli | X-akselin tarkkuus | Huomautukset |
|----------|-------------------|--------------|
| 7pv | Päivittäin | Jokainen päivä näytetään yksittäin |
| 30pv | Päivittäin | Jokainen päivä näytetään, hyvä viikkokuvioiden tunnistamiseen |
| 90pv | Viikoittain | Tiedot kootaan viikon mukaan luettavuuden vuoksi |
| 1 vuosi | Kuukausittain | Tiedot kootaan kuukauden mukaan vuosipolun näyttämiseksi |

> **Vinkki:** Vertaa 7pv-näkymää 30pv-näkymään. Jos viimeisten 7 päivän trendi ylittää 30 päivän keskiarvon, kasvu kiihtyy.

---

## Lajijakaumakaavio

### Kaaviotyyppi

Ympyräkaavio (tai donitsikaavio) joka näyttää lemmikkien osuudet lajin mukaan.

### Mitä se näyttää

Lajijakaumakaavio erittelee kaikki rekisteröidyt lemmikit lajikategorian mukaan näyttäen kunkin suhteellisen osuuden.

### Kaavion lukeminen

| Elementti | Kuvaus |
|-----------|--------|
| **Lohkot** | Jokainen lohko edustaa lajia (esim. Koira, Kissa, Lintu, Kani) |
| **Värit** | Jokaiselle lajille on määrätty eri väri tunnistamista varten |
| **Tunnisteet** | Lajin nimi ja prosentti näkyvät lohkossa tai sen vieressä |
| **Selite** | Selite yhdistää värit lajinimiin |
| **Työkaluvihje** | Vie hiiri lohkon päälle nähdäksesi tarkka määrä ja prosentti |

### Tietojen tulkitseminen

1. **Hallitseva laji** -- Suurin lohko viittaa ensisijaisen käyttäjäkuntasi lemmikkityyppiin. Käytä tätä ominaisuuksien priorisointiin.
2. **Pienet lohkot** -- Lajit erittäin pienillä prosenttiosuuksilla voivat viitata kasvumahdollisuuteen aliedustetuissa segmenteissä.
3. **Tasapaino** -- Suunnilleen tasainen jakautuminen viittaa laajaan vetovoimaan eri lemmikkinomistajatyyppien keskuudessa.

### Käyttötapaukset

- **Ominaisuuksien priorisointi** -- Jos 70 % lemmikeistä on koiria, priorisoi koirakohtaisia ominaisuuksia.
- **Sisällönsuunnittelu** -- Luo opetussisältöä lajijakauman mukaisessa suhteessa.
- **Markkinoinnin kohdistaminen** -- Ymmärrä mitkä yleisösegmentit ovat suurimpia mainoskampanjoihin.
- **Ilmoitusten kohdistaminen** -- Ilmoitusten yleisösegmentit (Koiranomistajat, Kissanomistajat) korreloivat suoraan tämän kaavion kanssa.

> **Vinkki:** Jos huomaat lajin kasvavan nopeammin kuin muut ajan myötä (vertaa 30pv vs. 1 vuosi), harkitse investointia lajikohtaisiin ominaisuuksiin trendin hyödyntämiseksi.

---

## Suositut rodut -kaavio

### Kaaviotyyppi

Vaakasuora pylväskaavio, joka sijoittaa suosituimmat rodut.

### Mitä se näyttää

Suositut rodut -kaavio näyttää alustalle rekisteröidyt suosituimmat rodut sijoitettuna määrän mukaan. Pylväät ulottuvat vaakasuoraan, mikä tekee rotujen suosion vertailusta helppoa.

### Kaavion lukeminen

| Elementti | Kuvaus |
|-----------|--------|
| **Y-akseli** | Rotunimet, järjestetty suosituimmasta (ylin) vähiten suosittuun (alin) |
| **X-akseli** | Kyseisen rodun rekisteröityjen lemmikkien määrä |
| **Pylväät** | Vaakasuorat pylväät, joiden pituus edustaa lemmikkien määrää |
| **Tunnisteet** | Määräarvo näytetään kunkin pylvään päässä |
| **Työkaluvihje** | Vie hiiri päälle tarkkaa määrää ja kokonaisprosenttia varten |

### Tietojen tulkitseminen

1. **Suosituimmat rodut** -- Pisimmät pylväät edustavat yleisimpiä rotuja alustalla. Nämä käyttäjät ovat ydinyleisösi.
2. **Pitkä häntä** -- Monet rodut pienillä määrillä viittaavat monipuolisiin käyttäjäkiinnostuksiin.
3. **Rotukeskittymä** -- Jos muutama rotu hallitsee (esim. top 3 muodostaa yli 50 %), alustallasi on keskittynyt käyttäjäkunta.

### Tyypilliset oivallukset

| Kuvio | Oivallus | Toimenpide |
|-------|----------|------------|
| Kultainennoutaja hallitsee | Suuri perhekoirayleisö | Priorisoi ominaisuuksia keskikokoisille/suurille koiraroduille |
| Persialainen kissa top 5:ssä | Vahva kissanomistajaegmentti | Investoi kissakohtaiseen terveysseurantaan |
| Eksoottisia rotuja ilmestyy | Erikoiskasvattajia liittyy | Harkitse kasvattajakohtaisia premium-ominaisuuksia |
| Tasainen jakautuminen | Monipuolinen käyttäjäkunta | Rakenna yleisiä ominaisuuksia rotukohtaisten sijaan |

### Kaavion rajat

- Kaavio näyttää oletuksena **top 10-15 rotua**.
- Loput rodut ryhmitellään "Muu"-kategoriaan jos sovellettavissa.
- Näkyvien rotujen määrä voi vaihdella aikavälin mukaan.

> **Vinkki:** Vertaa suosittuja rotuja terveystoimintatietoihin. Jos suositulla rodulla on matala terveystietueiden aktiivisuus, nämä käyttäjät saattavat tarvita sitoutumismuistutuksia.

---

## Terveystoimintakaavio

### Kaaviotyyppi

Ryhmitelty pylväskaavio, joka näyttää terveystoiminnot tyypeittäin.

### Mitä se näyttää

Terveystoimintakaavio näyttää alustalla tehtyjen terveyteen liittyvien toimintojen volyymin ryhmiteltyinä toimintotyypeittäin. Tämä auttaa ymmärtämään kuinka aktiivisesti käyttäjät hyödyntävät terveysominaisuuksia.

### Kaavion lukeminen

| Elementti | Kuvaus |
|-----------|--------|
| **X-akseli** | Ajanjaksot (päivät, viikot tai kuukaudet aikavälista riippuen) |
| **Y-akseli** | Terveystoimintojen määrä |
| **Pylväsryhmät** | Useita pylväitä per ajanjakso, yksi kullekin toimintotyypille |
| **Värit** | Jokaisella toimintotyypillä on eri väri |
| **Selite** | Yhdistää värit toimintotyyppeihin (Rokotukset, Terveystarkastukset, Lääkitykset jne.) |
| **Työkaluvihje** | Vie hiiri päälle tarkkaa määrää per toimintotyyppi per ajanjakso |

### Toimintotyypit

| Toiminto | Kuvaus | Väri (tyypillinen) |
|----------|--------|-------------------|
| **Rokotukset** | Luodut tai päivitetyt rokotustietueet | Sininen |
| **Terveystiedot** | Kirjatut yleiset terveystietueet | Vihreä |
| **Painonseuranta** | Kirjatut painomittaukset | Oranssi |
| **Lääkitykset** | Lisätyt lääkitysmerkinnät | Violetti |

### Tietojen tulkitseminen

1. **Korkeat rokotuspylväät** -- Käyttäjät seuraavat aktiivisesti rokotuksia. Muistutusjärjestelmä todennäköisesti edistää sitoutumista.
2. **Matalat terveystietuepylväät** -- Käyttäjät eivät ehkä ole tietoisia terveystietueet-ominaisuudesta. Harkitse sovelluksen sisäisiä kehotteita.
3. **Kausivaihtelut** -- Jotkut terveystoiminnot piikkiytyvät kausittain (esim. kirppuhoidot keväällä).
4. **Kasvavat pylväät ajan myötä** -- Terveysominaisuuksien käyttöönotto kasvaa, mikä viittaa hyvään käyttäjäsitoutumiseen.
5. **Laskevat pylväät** -- Käyttäjät saattavat menettää kiinnostustaan tai kohdata kitkaa terveystietojen kirjaamisessa.

### Toimintotyyppien vertailu

Ryhmitelty muoto mahdollistaa visuaalisen vertailun:

- Mitkä terveysominaisuudet ovat käytetyimpiä vs. alikäytettyjä.
- Kasvaako jokin toimintotyyppi toisten laskiessa.
- Miten eri aikavälit paljastavat eri kuvioita.

> **Vinkki:** Jos rokotustoiminta on korkeaa mutta muu terveyden seuranta matalaa, harkitse ominaisuuksien välisten kehotusten lisäämistä: "Kirjasit rokotuksen -- haluaisitko myös kirjata Rexin painon?"

---

## Kojelaudan asettelu

Neljä kaaviota on järjestetty Analytiikka-sivulle ruudukkoasettelussa:

```
+---------------------------+---------------------------+
|                           |                           |
|    Käyttäjäkasvu          |    Lajijakauma            |
|    (Viivakaavio)          |    (Ympyräkaavio)         |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Suositut rodut         |    Terveystoiminta        |
|    (Vaakasuora pylväs)    |    (Ryhmitelty pylväs)    |
|                           |                           |
+---------------------------+---------------------------+
```

Jokainen kaavio on kortissa, jossa on:
- Otsikko
- Kaaviovisualisointi
- Interaktiiviset työkaluvihjeet hiirellä osoitettaessa
- Responsiivinen koko, joka mukautuu näytön leveyteen

---

## Kaavioiden vuorovaikutus

### Työkaluvihjeet hiirellä

1. Siirrä kursori minkä tahansa datapisteen, pylvään tai kaavion lohkon päälle.
2. Työkaluvihje tulee näkyviin näyttäen:
   - Tarkka arvo
   - Tunniste (päivämäärä, rodun nimi, laji jne.)
   - Prosentti kun sovellettavissa

### Responsiivinen käyttäytyminen

1. Suuremmilla näytöillä kaaviot näkyvät 2x2-ruudukossa.
2. Pienemmillä näytöillä kaaviot pinoutuvat pystysuunnassa luettavuutta varten.
3. Kaavioelementit skaalautuvat suhteellisesti.

### Tietojen päivitys

1. Analytiikkatiedot päivitetään sivun latautuessa.
2. Aikavälin vaihtaminen käynnistää uuden tietohaun.
3. Automaattipäivitystä ei ole -- lataa sivu manuaalisesti uudelleen saadaksesi uusimmat tiedot.

---

## Yleiset analytiikkatyönkulut

### Kuukausiraportointi

1. Valitse **30pv** aikaväli.
2. Huomioi Käyttäjäkasvu-trendi (ylös, tasainen tai alas).
3. Tarkista Lajijakauma mahdollisten muutosten varalta.
4. Tarkista Suositut rodut nousevien trendien varalta.
5. Tutki Terveystoiminta sitoutumistason osalta.
6. Ota kuvakaappaus tai vie tiedot raportteja varten.

### Laskun tutkiminen

1. Aloita **30pv:lla** tunnistaaksesi milloin lasku tapahtui.
2. Vaihda **7pv:lle** tutkiaksesi viimeisintä jaksoa yksityiskohtaisesti.
3. Tarkista korreloiko lasku:
   - Järjestelmäongelman kanssa (tarkista Asetukset > Huoltotilahistoria)
   - Lähetetyn ilmoituksen kanssa (tarkista Ilmoitushistoria)
   - Kausivaihtelun kanssa (vertaa 1 vuoden näkymään)

### Vuosineljänneskatsaus

1. Valitse **90pv** aikaväli.
2. Vertaa kasvupolkua edellisiin vuosineljänneksiin.
3. Tunnista mitkä terveystoiminnot kasvoivat eniten.
4. Huomioi mahdolliset uudet rodut Suositut rodut -kaaviossa.
5. Käytä Lajijakaumaa markkinointistrategian kohdistuksen vahvistamiseen.

### Vuosisuunnittelu

1. Valitse **1 vuosi** aikaväli.
2. Tunnista kausivaihtelut Käyttäjäkasvussa (esim. lomapiikit).
3. Seuraa vuosittaisia rotusuosion muutoksia.
4. Mittaa terveysominaisuuksien käyttöönottoa koko vuodelta.
5. Käytä oivalluksia tuotekartan suunnitteluun.

---

## Tietojen tuoreuden ymmärtäminen

| Osa-alue | Yksityiskohta |
|----------|---------------|
| Tietolähde | Alustan tietokanta (koostettu) |
| Päivitystiheys | Reaaliaikainen sivun latautuessa |
| Historiallinen tarkkuus | Täydellinen alustan käynnistyksestä |
| Aikavyöhyke | Palvelimen aika (UTC) |
| Puuttuvat tiedot | Aukot näytetään nolla-arvoina, ei interpoloituna |

---

## Vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| Kaaviot eivät lataudu | Tarkista verkkoyhteys. Päivitä sivu. |
| Tiedot vaikuttavat vanhentuneilta | Analytiikka latautuu sivukäynnillä. Navigoi pois ja palaa tai päivitä. |
| Nolla-arvot kaikissa mittareissa | Varmista, että valitulla aikavälillä on tietoja. Kokeile laajentaa 1 vuoteen. |
| Kaavioiden työkaluvihjeet eivät näy | Kokeile eri selainta. Varmista, että JavaScript on käytössä. |
| Aikaväli ei vaihdu | Napsauta suoraan aikavälipainiketta. Jos ei reagoi, päivitä sivu. |
| Analytiikkaan ei pääse | Varmista, että roolisi ja käyttöoikeutesi sisältävät Analytiikka-sivun pääsyn. |

---

## Liittyvät sivut

- [Asetukset](./settings.md) -- Määritä alustan asetukset, jotka vaikuttavat käyttäjien käyttäytymiseen
- [Ilmoitukset](./notifications.md) -- Lähetä ilmoituksia, jotka voivat vaikuttaa sitoutumismittareihin
- [Palaute](./feedback.md) -- Korreloi käyttäjäpalaute analytiikkatrendien kanssa
- [Ylläpitäjät](./admin-users.md) -- Myönnä analytiikkapääsy tiimin jäsenille
