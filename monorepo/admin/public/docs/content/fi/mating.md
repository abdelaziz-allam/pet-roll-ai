# Jalostusmarkkinapaikka

Jalostusmarkkinapaikka-moduuli tarjoaa ylläpitäjille valvonnan alustan lemmikkien jalostuksen matchmaking-järjestelmästä. Seuraa matchipyyntöjä, seuraa onnistuneita parituksia ja tarkastele kasvattajien suorituskykysijoituksia.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Navigointivälilehdet

Jalostusmarkkinapaikka-sivu on järjestetty kahteen päävälilehteen:

| Välilehti | Kuvaus |
|-----------|--------|
| Matchit ja pyynnöt | Tarkastele ja hallitse kaikkia jalostusmatcheja ja odottavia pyyntöjä |
| Kasvattajasijoitukset | Tulostaulut, jotka näyttävät parhaiten menestyvät kasvattajat |

Vaihda välilehtien välillä napsauttamalla välilehden otsikkoa sivun yläosassa.

---

## Matchit ja pyynnöt -välilehti

Tämä välilehti näyttää kaikki jalostusmatchit visuaalisina kortteina tarjoten intuitiivisen yleiskatsauksen jalostustoiminnasta alustalla.

### Matchikortit

Jokainen match esitetään korttina, jossa kaksi lemmikkiä on yhdistetty visuaalisella sydänkytkimellä.

#### Kortin asettelu

```
+------------------------------------------+
|  [Lemmikki A Kuva]  <3  [Lemmikki B Kuva]|
|  Lemmikki A Nimi      Lemmikki B Nimi    |
|  Rotu                 Rotu               |
|  Omistaja             Omistaja           |
|                                          |
|  Tila: [Merkki]       Listattu: [Pvm]   |
|  Laji: [Tagi]         Sijainti: [Kaup.] |
+------------------------------------------+
```

#### Kortin tiedot

| Elementti | Kuvaus |
|-----------|--------|
| Lemmikkien kuvat | Molempien matchin lemmikkien profiilikuvat |
| Sydänkytkin | Visuaalinen linkki kahden lemmikin välillä (animoitu aktiivisille matcheille) |
| Lemmikkien nimet | Molempien lemmikkien nimet |
| Rodut | Rotutieto kummallekin lemmikille |
| Omistajat | Omistajien nimet (napsautettavissa profiilien tarkasteluun) |
| Tilamerkki | Nykyinen matchin tila |
| Listauspäivä | Milloin matchipyyntö luotiin |
| Lajitagi | Lemmikkien laji |
| Sijainti | Listauksen kaupunki/maa |

### Matchien tilat

| Tila | Merkin väri | Kuvaus |
|------|-------------|--------|
| Odottaa | Oranssi | Matchipyyntö lähetetty, odottaa vastausta |
| Hyväksytty | Vihreä | Molemmat osapuolet sopivat matchista |
| Hylätty | Punainen | Toinen osapuoli hylkäsi matchin |
| Valmis | Sininen | Paritus vahvistettu suoritetuksi |
| Peruutettu | Harmaa | Match peruutettiin kumman tahansa osapuolen toimesta |
| Vanhentunut | Vaaleanharmaa | Pyyntö vanheni ilman vastausta |

---

## Suodattimet

Suodatinpalkki mahdollistaa näytettyjen matchien rajaamisen.

### Tilasuodatin

Valitse yksi tai useampi tila näytettäväksi:

1. Napsauta **Tila**-pudotusvalikkoa.
2. Valitse tilat, jotka haluat nähdä.
3. Korttiruudukko päivittyy välittömästi.

### Lajisuodatin

Suodata matchit lemmikkilajin mukaan:

- Kaikki lajit (oletus)
- Koira
- Kissa
- Lintu
- Kani
- Muu

### Maasuodatin

Valitse yksi tai useampi maa suodattaaksesi matchin sijainnin mukaan.

### Kaupunkisuodatin

Tarkenna edelleen valitsemalla tiettyjä kaupunkeja.

> **Vinkki:** Käytä Tila: Hyväksytty + oma maasi nähdäksesi onnistuneet matchit alueellasi, jotka saattavat tarvita "Lähetä hääkortti" -toiminnon.

---

## Tietolaatikko

Napsauta mitä tahansa matchikorttia avataksesi tietolaatikon näytön oikealla puolella.

### Lemmikkikuvat-osio

Laatikon yläosassa suuremmat versiot molempien lemmikkien kuvista näkyvät vierekkäin sydänkytkimen kanssa niiden välissä.

- Napsauta kumpaakaan kuvaa nähdäksesi sen täysikokoisena.
- Pyyhkäise lisäkuvien läpi, jos lemmikillä on galleria.

### Listauksen tiedot

| Kenttä | Kuvaus |
|--------|--------|
| Listaus-ID | Matchlistauksen uniikki tunniste |
| Luonut | Kumpi lemmikin omistaja aloitti listauksen |
| Luontipäivä | Päivä, jolloin listaus julkaistiin ensimmäisen kerran |
| Matchipäivä | Päivä, jolloin match ehdotettiin |
| Vastauksen päivä | Päivä, jolloin match hyväksyttiin/hylättiin (jos sovellettavissa) |
| Laji | Molempien lemmikkien laji |
| Rodut | Yksityiskohtaiset rotutiedot |
| Sijainti | Täydelliset sijaintitiedot |
| Huomautukset | Listauksen omistajan mahdolliset huomautukset |

### Matchin aikajana

Laatikko sisältää kronologisen aikajanan tapahtumista:

1. **Listaus luotu** -- Omistaja julkaisi lemmikkinsä jalostuslistauksen
2. **Match ehdotettu** -- Matchingalgoritmi tai manuaalinen pyyntö käynnisti matchin
3. **Match katsottu** -- Toinen osapuoli katsoi matchiehdotuksen
4. **Vastaus annettu** -- Hyväksyntä/hylkäys aikaleimalla
5. **Valmistuminen kirjattu** -- Jos paritus vahvistettiin suoritetuksi
6. **Hääkortti lähetetty** -- Jos ylläpitäjä lähetti onnitteluilmoituksen

Jokainen aikajanan tapahtuma näyttää:

- Päivä ja aika
- Toimija (järjestelmä, omistaja A, omistaja B tai ylläpitäjä)
- Tapahtuman kuvaus
- Lisähuomautukset (jos on)

> **Vinkki:** Aikajana auttaa ymmärtämään matchin koko kontekstin tutkiessa käyttäjien raportoimia kiistoja tai ongelmia.

---

## Lähetä hääkortti

"Lähetä hääkortti" -toiminto mahdollistaa ylläpitäjien lähettää onnitteluilmoituksen molemmille lemmikin omistajille, kun match hyväksytään tai valmistuu.

### Hääkortin lähettäminen

1. Avaa tietolaatikko **Hyväksytty**- tai **Valmis**-tilaiselle matchille.
2. Napsauta **Lähetä hääkortti** -painiketta laatikon alaosassa.
3. Ikkunassa:
   - Esikatsele ilmoitusviestiä (automaattisesti luotu molempien lemmikkien nimillä).
   - Lisää halutessasi mukautettu onnitteluviesti.
   - Tarkista vastaanottajat (molemmat lemmikin omistajat).
4. Napsauta **Lähetä**.

### Mitä hääkortti sisältää

- Onnitteluotsikko molempien lemmikkien nimillä
- Lemmikkien kuvat koristeellisin elementein
- Matchin päivämäärä ja sijainti
- Mukautettu ylläpitäjän viesti (jos annettu)
- Linkki matchin tietosivulle

### Milloin lähettää

- Kun match on hyväksytty ja molemmat osapuolet vahvistavat jatkavansa.
- Kun match on merkitty valmistuneeksi.
- Vain kerran per match (painike deaktivoidaan lähettämisen jälkeen).

> **Vinkki:** Hääkortit ovat yhteisön sitouttamistyökalu. Niiden lähettäminen hyväksytyille matcheille kannustaa alustan käyttöön ja luo positiivisen kokemuksen kasvattajille.

---

## Kasvattajasijoitukset-välilehti

Kasvattajasijoitukset-välilehti esittelee alustan aktiivisimmat ja menestyneimmät kasvattajat.

### Kokonais-Top 10 -podium

Sijoitukset-välilehden yläosassa podiumvisualisointi korostaa 10 parasta kasvattajaa kaikista lajeista.

#### Podiumin asettelu

```
              [1.]
        [2.]       [3.]
   [4.]  [5.]  [6.]  [7.]
      [8.]   [9.]   [10.]
```

Jokainen podiumsijainti näyttää:

- Kasvattajan nimi
- Kennelin nimi
- Profiilikuva
- Matchien kokonaismäärä
- Onnistumisprosentti

#### Podiumin pisteytys

Kasvattajat sijoitetaan yhdistelmäpisteillä perustuen:

| Tekijä | Paino | Kuvaus |
|--------|-------|--------|
| Matchien kokonaismäärä | 30 % | Aloitettujen tai vastaanotettujen matchien määrä |
| Onnistumisprosentti | 40 % | Prosenttiosuus matcheista, jotka saavuttivat Hyväksytty/Valmis-tilan |
| Aktiiviset listaukset | 15 % | Tällä hetkellä aktiivisten jalostuslistausten määrä |
| Vastausaika | 15 % | Keskimääräinen aika vastata matchiehdotuksiin |

### Lajikohtainen Top 10 -ruudukko

Kokonaispodiumin alapuolella ruudukko näyttää 10 parasta kasvattajaa kullekin lajille erikseen.

#### Ruudukon asettelu

Jokaisella lajilla on oma korttinsa:

```
+-------------------+  +-------------------+  +-------------------+
|  Koirat Top 10    |  |  Kissat Top 10    |  |  Linnut Top 10   |
| 1. Kasvattaja     |  | 1. Kasvattaja     |  | 1. Kasvattaja     |
| 2. Kasvattaja     |  | 2. Kasvattaja     |  | 2. Kasvattaja     |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Jokainen merkintä lajiruudukossa näyttää:

- Sijoitusnumero
- Kasvattajan nimi
- Kennelin nimi
- Matchien määrä kyseiselle lajille
- Onnistumisprosentti kyseiselle lajille

> **Vinkki:** Lajikohtaiset sijoitukset auttavat tunnistamaan erikoistuneita kasvattajia, jotka voivat olla erinomaisia ehdokkaita alustakumppanuuksille tai nostetuille listauksille.

---

## Lajiteltava sijoitustaulukko

Visuaalisten sijoitusten alapuolella täysi datataulukko tarjoaa yksityiskohtaiset kasvattajatilastot.

### Taulukon sarakkeet

| Sarake | Lajiteltava | Kuvaus |
|--------|:-----------:|--------|
| Sijoitus | Kyllä | Nykyinen sijoitus oletuspisteytyksen perusteella |
| Kasvattajan nimi | Kyllä | Kasvattajan koko nimi |
| Kenneli | Kyllä | Kennelin nimi |
| Matchit | Kyllä | Matchien kokonaismäärä (aloitetut + vastaanotetut) |
| Listaukset | Kyllä | Luotujen jalostuslistausten määrä |
| Onnistumisprosentti | Kyllä | Prosentti matcheista, jotka saavuttivat Hyväksytty/Valmis-tilan |
| Katselut | Kyllä | Jalostuslistausten katselukerrat yhteensä |
| Laji | Ei | Pääasiallinen kasvatettava laji |
| Sijainti | Ei | Maa ja kaupunki |

### Taulukon lajittelu

1. Napsauta mitä tahansa lajiteltavaa sarakeotsikkoa lajitellaksesi nousevasti.
2. Napsauta uudelleen lajitellaksesi laskevasti.
3. Kolmas napsautus poistaa kyseisen sarakkeen lajittelun.
4. Voit lajitella usean sarakkeen mukaan (pidä Shift painettuna ja napsauta).

### Taulukon vuorovaikutukset

- Napsauta kasvattajariviä nähdäksesi hänen täyden profilinsa ja matchihistoriansa.
- Käytä hakupalkkia taulukon yläpuolella tietyn kasvattajan etsimiseen.
- Vie taulukon tiedot **Vie CSV** -painikkeella.

> **Vinkki:** Lajittele Onnistumisprosentti laskevasti tunnistaaksesi kasvattajat, jotka tuottavat johdonmukaisesti onnistuneita matcheja. Nämä kasvattajat voivat hyötyä premium-ominaisuuksista tai nopeutetusta vahvistuksesta.

---

## Matchimittareiden ymmärtäminen

### Onnistumisprosentin laskenta

```
Onnistumisprosentti = (Hyväksytyt + Valmistuneet matchit) / Matchit yhteensä x 100
```

- Vain matchit, joissa kasvattaja oli listauksen omistaja, lasketaan heidän onnistumisprosenttiinsa.
- Hylätyt ja vanhentuneet matchit laskevat onnistumisprosenttia.
- Peruutetut matchit jätetään laskennan ulkopuolelle.

### Katselumittari

Katselumäärä edustaa:

- Kaikkien kasvattajan aktiivisten jalostuslistausten uniikit katselukerrat yhteensä.
- Ei laske kasvattajan omia katseluja.
- Nollautuu per listaus (ei kumulatiivinen poistettujen listausten yli).

### Aktiivisuuspisteet

Kokonaissijoitus huomioi tuoreuden:

- Viimeisten 90 päivän matchit painotetaan 2x.
- 90-180 päivän matchit painotetaan 1x.
- Yli 180 päivän matchit painotetaan 0,5x.

> **Vinkki:** Kasvattaja, jolla on korkeat katselukerrat mutta matala onnistumisprosentti, saattaa olla houkutteleva listauksiltaan mutta liian valikoiva tai hidas vastaamaan. Harkitse yhteydenottoa ymmärtääksesi heidän kokemustaan.

---

## Usein kysytyt kysymykset

**K: Voinko manuaalisesti luoda matchin kahden lemmikin välille?**
V: Ei. Matchit luodaan lemmikin omistajien toimesta sovelluksen kautta. Ylläpitäjät voivat vain seurata ja suorittaa toimintoja olemassa olevilla matcheilla.

**K: Mitä tapahtuu matchitiedoille, kun lemmikki poistetaan?**
V: Matchitietue säilytetään historiallisiin tarkoituksiin, mutta merkitään "Lemmikki poistettu" -indikaattorilla. Match ei voi edetä pidemmälle.

**K: Voinko poistaa kasvattajan sijoituksista?**
V: Sijoitukset lasketaan automaattisesti. Kasvattajan poistamiseksi hänen tilinsä on keskeytettävä tai vahvistuksensa peruutettava, mikä sulkee hänet pois sijoituksista.

**K: Kuinka usein sijoitukset päivittyvät?**
V: Sijoitukset lasketaan uudelleen 24 tunnin välein. Viimeisimmän päivityksen aikaleima näkyy Sijoitukset-välilehden yläosassa.

**K: Voinko lähettää hääkortin hylätystä matchista?**
V: Ei. Lähetä hääkortti -painike on käytettävissä vain Hyväksytty- tai Valmis-tilaisille matcheille.

**K: Entä jos molemmat matchin lemmikit ovat samalta omistajalta?**
V: Järjestelmä estää saman omistajan matchit. Jos näet sellaisen, se viittaa tietojen eheysongelmaan, josta tulisi ilmoittaa kehitystiimille.
