# Rokotusanalytiikka

Rokotusanalytiikka-moduuli tarjoaa ylläpitäjille näkemyksiä rokotusten trendeistä koko alustalla. Käytä tätä kojelautaa ymmärtääksesi, mitkä rokotteet ovat yleisimmin annettuja, tunnistaaksesi alueellisia kuvioita ja seurataksesi kokonaisrokotuskattavuutta.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | View |
> | Viewer | View only |

---

## Kojelaudan yleiskatsaus

Rokotusanalytiikka-sivu on järjestetty seuraaviin osioihin:

1. **Yhteenvetotilastot** -- Avainmittarit sivun yläosassa
2. **Top 20 rokotteiden tulostaulu** -- Sijoitettu lista käytetyimmistä rokotteista
3. **Podiumvisualisointi** -- Kolmen parhaan rokotteen korostus
4. **Rokotekohtainen erittely** -- Lajijakauma kullekin rokotteelle
5. **Suosituimmat sijainnit** -- Maantieteellinen jakauma per rokote

---

## Yhteenvetotilastot

Analytiikkasivun yläosassa kolme tilakorttia näyttävät kokonaismittarit:

| Tilakortti | Kuvaus | Kuvake |
|------------|--------|--------|
| Rokotuksia yhteensä | Rokotustietueiden kokonaismäärä kaikilla lemmikeillä | Ruisku |
| Uniikkeja rokotteita | Annettujen eri rokotetyyppien määrä | Pullo |
| Rokotettuja lemmikkejä | Lemmikkien määrä, joilla on vähintään yksi rokotus | Tassu |

### Tilastojen lukeminen

- **Rokotuksia yhteensä** laskee yksittäiset rokotustapahtumit (yksi lemmikki saa yhden rokotteen = 1 laskenta).
- **Uniikkeja rokotteita** näyttää järjestelmän rokotteiden monimuotoisuuden (esim. Rabies, DHPP, FVRCP kukin lasketaan yhdeksi).
- **Rokotettuja lemmikkejä** on deduplikoitu -- lemmikki, jolla on 5 rokotusta, lasketaan silti yhdeksi lemmikiksi.

> **Vinkki:** Vertaa Rokotuksia yhteensä ja Rokotettuja lemmikkejä ymmärtääksesi keskimääräisen rokotusmäärän per lemmikki alustalla.

---

## Suodattimet

Suodatinpalkki koskee kaikkia analytiikkasivun osioita samanaikaisesti.

### Aikajaksosuodatin

Valitse aikaväli tiedoille:

| Vaihtoehto | Kuvaus |
|------------|--------|
| Viimeiset 7 päivää | Edellinen viikko |
| Viimeiset 30 päivää | Edellinen kuukausi |
| Viimeiset 90 päivää | Edellinen vuosineljännes |
| Viimeiset 12 kuukautta | Edellinen vuosi |
| Kaikki | Ei aikarajoitusta |
| Mukautettu aikaväli | Päivämäärävalitsin aloitus- ja lopetuspäiville |

### Lajisuodatin

Suodata rokotustiedot lemmikkilajin mukaan:

- Kaikki lajit (oletus)
- Koira
- Kissa
- Lintu
- Kani
- Muu

### Maasuodatin

Valitse yksi tai useampi maa nähdäksesi rokotustiedot vain kyseisiltä alueilta.

### Kaupunkisuodatin

Tarkenna tuloksia edelleen valitsemalla tiettyjä kaupunkeja valitun maan sisältä.

> **Vinkki:** Yhdistä suodattimet vastataksesi tiettyihin kysymyksiin. Esimerkiksi: "Mitkä ovat koirien suosituimmat rokotteet Yhdistyneessä kuningaskunnassa viimeisten 12 kuukauden aikana?"

### Suodattimien käyttöönotto

1. Aseta halutut suodatinarvot pudotusvalikoista.
2. Napsauta **Ota suodattimet käyttöön** tai suodattimet aktivoituvat automaattisesti muutoksessa.
3. Kaikki kojelaudan osiot päivittyvät näyttämään suodatetut tiedot.
4. Aktiiviset suodattimet näkyvät tunnisteina suodatinpalkin alapuolella.
5. Napsauta **X** missä tahansa suodatintunnisteessa poistaaksesi sen tai napsauta **Tyhjennä kaikki** nollataksesi.

---

## Top 20 rokotteiden tulostaulu

Tulostaulu näyttää 20 useimmin annettua rokotetta nykyisen suodatinvalinnan perusteella.

### Taulukon sarakkeet

| Sarake | Kuvaus |
|--------|--------|
| Sijoitus | Sijainti 1-20 |
| Rokotteen nimi | Rokotteen nimi |
| Määrä | Antokertojen määrä |
| Prosentti | Osuus kaikista rokotuksista |
| Trendi | Sparkline-kaavio käyttötrendistä valitulla ajanjaksolla |

### Tulostaulun lukeminen

1. Rokotteet on lajiteltu määrän mukaan laskevassa järjestyksessä.
2. **Prosentti**-sarake näyttää, mikä osuus kaikista rokotuksista tämä rokote edustaa.
3. **Trendi**-sparkline antaa nopean visuaalisen siitä, onko käyttö kasvussa, vakaata vai laskussa.
4. Vie hiiri sparklinen päälle nähdäksesi datapisteiden arvot.

### Tulostaulun vuorovaikutus

- Napsauta mitä tahansa rokoteriviä vierittääksesi alas sen yksityiskohtaiseen erittelyosioon.
- Käytä sarakeotsikkoja uudelleenlajitteluun (vaikka oletussijoitusjärjestys on hyödyllisin).
- Taulukko on sivutettu, jos suodattimet tuottavat yli 20 tulosta harvinaisissa määrityksissä.

> **Vinkki:** Nouseva trendi rokotteessa saattaa viitata alueelliseen epidemiavasteeseen tai uuteen eläinlääkäriyhdistysten suositukseen.

---

## Podiumvisualisointi

Podium korostaa 3 suosituinta rokotetta visuaalisessa palkintotyylin esityksessä.

### Asettelu

```
        [1.]
   [2.]     [3.]
```

- **1. sija (keskellä, korkein):** Kultavärinen kortti eniten annetulla rokotteella.
- **2. sija (vasemmalla):** Hopenavärinen kortti toiseksi eniten annetulla rokotteella.
- **3. sija (oikealla):** Pronssivärinen kortti kolmanneksi eniten annetulla rokotteella.

### Kortin sisältö

Jokainen podiumkortti näyttää:

- Sijoitusmitalikuvake (kulta, hopea, pronssi)
- Rokotteen nimi
- Antokertojen kokonaismäärä
- Prosentti kaikista rokotuksista
- Pääasiallinen laji (yleisin laji, joka saa tämän rokotteen)

### Podiumin lukeminen

Podium tarjoaa yhdellä silmäyksellä yhteenvedon alustan rokotuskuvioista. Tyypilliset tulokset:

- **Koirat:** Rabies, DHPP (Penikkatautirokote), Bordetella hallitsevat usein.
- **Kissat:** FVRCP, Rabies, FeLV ovat tyypillisiä kärkiokotteita.
- **Monilajialustat:** Rabies johtaa usein kaikkien lajien yli.

> **Vinkki:** Jos podium näyttää odottamattomia tuloksia suodattimien käyttöönoton jälkeen, tarkista onko aikajakso- tai sijaintisuodatin tuottanut pienen otoskoon, joka saattaa vääristää sijoituksia.

---

## Rokotekohtainen lajierittely

Tulostaulun alapuolella jokaisella top 20:n rokotteella on laajennettava osio, joka näyttää lajijakauman.

### Erittelyn tarkasteleminen

1. Napsauta laajennusnuolta minkä tahansa rokotteen vieressä tulostaulussa.
2. Vaakasuora pinottu pylväskaavio tulee näkyviin näyttäen lajijakauman.
3. Jokainen segmentti on värikoodattu lajin mukaan:
   - Koirat: Sininen
   - Kissat: Oranssi
   - Linnut: Vihreä
   - Kanit: Violetti
   - Muut: Harmaa

### Erittelytaulukko

Pylväskaavion rinnalla pieni taulukko näyttää:

| Laji | Määrä | Prosentti |
|------|-------|-----------|
| Koira | 1 234 | 62 % |
| Kissa | 456 | 23 % |
| Lintu | 200 | 10 % |
| Kani | 80 | 4 % |
| Muu | 20 | 1 % |

### Käyttötapaukset

- Tunnista rokotteet, jotka ovat lajikohtaisia vs. monilajisia.
- Havaitse epätavallisia kuvioita (esim. koirakohtainen rokote kissatietueissa saattaa viitata tiedonsyöttövirheisiin).
- Ymmärrä alustasi lajikoostumus rokotustietojen kautta.

> **Vinkki:** Lajikohtaiset rokotteet, jotka näkyvät väärän lajin alla, viittaavat usein tietojen laatuongelmiin, joita tulisi tutkia.

---

## Suosituimmat sijainnit per rokote

Jokainen rokote näyttää myös maantieteellisen erittelyn siitä, missä sitä annetaan useimmin.

### Sijaintitietojen tarkasteleminen

1. Napsauta laajennusnuolta minkä tahansa rokotteen vieressä tulostaulussa.
2. Vaihda **Sijainnit**-välilehdelle laajennetun osion sisällä.
3. Sijoitettu lista 10 suosituimmasta sijainnista tulee näkyviin.

### Sijaintitaulukko

| Sijoitus | Maa | Kaupunki | Määrä | Prosentti |
|----------|-----|----------|-------|-----------|
| 1 | Saksa | Berliini | 543 | 18 % |
| 2 | Yhdistynyt kuningaskunta | Lontoo | 421 | 14 % |
| 3 | Ranska | Pariisi | 389 | 13 % |
| ... | ... | ... | ... | ... |

### Karttanäkymä

Jos saatavilla, mini-lämpökartta näyttää rokotusten keskittymisen maantieteellisesti:

- Tummemmat alueet viittaavat korkeampiin rokotusmääriin.
- Vie hiiri alueen päälle nähdäksesi tarkka määrä.
- Napsauta aluetta käyttääksesi sitä sijaintisuodattimena.

### Käyttötapaukset

- Tunnista alueelliset rokotusmieltymykset tai -vaatimukset.
- Havaitse klustereita, jotka saattavat vastata paikallisia eläinlääkärisuosituksia.
- Suunnittele alueellisia viestintä- tai kumppanuuskampanjoita.

> **Vinkki:** Jotkut rokotteet ovat lain mukaan pakollisia tietyissä maissa (esim. rabies Saksassa). Korkeat keskittymät tietyillä alueilla ovat odotettavia pakollisille rokotteille.

---

## Tietojen vieminen

Rokotusanalytiikkatietojen vieminen:

1. Napsauta **Vie**-painiketta sivun oikeassa yläkulmassa.
2. Valitse vientimuoto:
   - **CSV** -- Raakadata taulukkolaskenta-analyysiin
   - **PDF** -- Muotoiltu raportti kaavioiden kanssa
3. Vienti noudattaa kaikkia tällä hetkellä aktiivisia suodattimia.
4. Tiedosto latautuu selaimesi oletuslatauskansioon.

### Viennin sisältö

CSV-vienti sisältää:

- Rokotteen nimi
- Kokonaismäärä
- Lajikohtaiset erittelymäärät
- Suosituimmat maat ja kaupungit
- Trendidatapisteet
- Käytetyt suodatinparametrit

> **Vinkki:** Käytä CSV-vientejä mukautettujen visualisointien luomiseen työkaluissa kuten Excel tai Google Sheets, tai tietojen jakamiseen eläinlääkärineuvontakumppaneiden kanssa.

---

## Kojelaudan päivitys

Analytiikkatiedot lasketaan rokotustietueista ja välimuistitetaan suorituskyvyn vuoksi.

- Tiedot päivittyvät automaattisesti 24 tunnin välein.
- Viimeisimmän päivityksen aikaleima näkyy sivun alaosassa.
- Napsauta **Päivitä**-kuvaketta aikaleiman vieressä käynnistääksesi manuaalisen päivityksen.
- Manuaalinen päivitys saattaa kestää 10-30 sekuntia tietomäärästä riippuen.

> **Vinkki:** Jos huomaat eroja analytiikkakojelaudan ja yksittäisten lemmikkitietueiden välillä, kokeile manuaalista päivitystä. Äskettäin lisätyt rokotukset eivät ehkä näy ennen seuraavaa välimuistipäivitystä.

---

## Usein kysytyt kysymykset

**K: Miksi tulostaulun kokonaismäärä ei vastaa yhteenvetotilastojen kokonaismäärää?**
V: Tulostaulu näyttää 20 suosituinta rokotetta. Jos uniikkeja rokotteita on yli 20, loput eivät ole listattuna mutta lasketaan silti kokonaismäärään.

**K: Voinko nähdä tiedot tietylle kasvattajalle tai omistajalle?**
V: Ei. Analytiikkasivu näyttää alustan kokonaistiedot. Yksittäiset rokotustietueet ovat saatavilla kunkin lemmikin profiilissa.

**K: Miksi joillakin rokotteilla on nolla trenditietoa?**
V: Uusilla rokotteilla, jotka on kirjattu vain kerran, ei ehkä ole tarpeeksi datapisteitä merkityksellisen trendiviivan luomiseen.

**K: Kuinka pitkälle taaksepäin historiallinen data ulottuu?**
V: "Kaikki"-suodatin sisältää jokaisen rokotustietueen alustan käynnistyksestä lähtien. Analytiikalle ei ole tietojen säilytysrajaa.

**K: Voinko vertailla kahta ajanjaksoa?**
V: Ei suoraan kojelaudassa. Vie tiedot kahdelle eri ajanjaksolle ja vertaa niitä taulukkolaskennassa.
