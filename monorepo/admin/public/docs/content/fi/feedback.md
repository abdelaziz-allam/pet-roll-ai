# Palautehallinta

Palautehallinta-sivu mahdollistaa ylläpitäjien tarkastella, vastata ja järjestää Petfolioo-mobiilisovelluksen kautta lähetettyä käyttäjäpalautetta. Tämä on keskitetty keskuksesi käyttäjätarpeiden ymmärtämiseen, virheiden seuraamiseen ja ominaisuusehdotusten hallintaan.

![Feedback](/docs/screenshots/feedback.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Respond |
> | Viewer | View only |

---

## Yleiskatsaus

Kun siirryt Palaute-sivulle, näet yläosassa tilastorivin, joka tiivistää kaiken palautteen nykyisen tilan, jonka jälkeen tulevat välilehtisisältöalueet ja suodatussäätimet.

---

## Tilastorivi

Sivun yläosassa neljä mittarikorttia näyttävät reaaliaikaiset määrät:

| Mittari | Kuvaus |
|---------|--------|
| **Yhteensä** | Kaikkien vastaanotettujen palautemerkintöjen kokonaismäärä kaikissa tiloissa |
| **Avoimet** | Palautemerkinnät, joihin ei ole vielä vastattu tai jotka on suljettu |
| **Vastatut** | Palautemerkinnät, joihin ylläpitäjä on kirjoittanut vähintään yhden vastauksen |
| **TODO** | Ylläpitäjän jatkotoimenpiteille merkityt palautemerkinnät |

> **Vinkki:** Käytä TODO-lukumäärää nopeana indikaattorina avoimista kohteista, jotka vaativat huomiota. Jos tämä luku kasvaa, harkitse priorisoinnin tekemistä tiimisi kanssa.

---

## Välilehdet

Palaute-sivu on järjestetty kahteen välilehteen:

### Kaikki palautteet

1. Napsauta **Kaikki palautteet** -välilehteä (valittu oletuksena).
2. Tämä näkymä näyttää jokaisen palautemerkinnän järjestelmässä tilasta riippumatta.
3. Merkinnät on lajiteltu päivämäärän mukaan, uusimmat ensin.
4. Käytä suodattimia (kuvattu alla) tulosten rajaamiseen.

### TODO-lista

1. Napsauta **TODO-lista** -välilehteä.
2. Tämä näkymä näyttää vain palautemerkinnät, jotka ylläpitäjä on merkinnyt TODO-tilaan.
3. Käytä tätä välilehteä tiimin priorisointikokouksissa tai päivittäisissä katselmoineissa.
4. Kohteet pysyvät täällä kunnes niiden merkintä poistetaan.

---

## Suodattimet

Välilehtien alapuolella suodatinpalkki tarjoaa useita säätimiä näytettyjen palautemerkintöjen rajaamiseen.

### Tilasuodatin

1. Etsi **Tila**-pudotusvalikko suodatinpalkista.
2. Napsauta laajentaaksesi ja valitse yksi seuraavista:
   - **Kaikki** -- Näyttää palautteen kaikissa tiloissa
   - **Avoin** -- Näyttää vain ratkaisemattomat palautteet
   - **Vastattu** -- Näyttää palautteet, joihin on vähintään yksi ylläpitäjän vastaus
   - **Suljettu** -- Näyttää ratkaistuksi merkityt palautteet
3. Lista päivittyy välittömästi valinnan jälkeen.

### Tyyppisuodatin

1. Etsi **Tyyppi**-pudotusvalikko suodatinpalkista.
2. Valitse tarkasteltavan palautteen kategoria:
   - **Kaikki tyypit** -- Ei tyyppisuodatinta käytössä
   - **Virhe** -- Käyttäjien raportoimat ongelmat tai puutteet
   - **Ehdotus** -- Ominaisuuspyynnöt ja parannusideat
   - **Yleinen** -- Yleiset kommentit tai kysymykset
3. Jokainen palautemerkintä on merkitty tyyppimerkillään nopeaa visuaalista tunnistusta varten.

### Päivämäärävälisuodatin

1. Napsauta **Päivämääräväli**-valitsinta suodatinpalkissa.
2. Valitse aloituspäivä ja lopetuspäivä kalenterividgetistä.
3. Vain valitun ajanjakson sisällä lähetetyt palautteet näytetään.
4. Tyhjennä päivämääräsuodatin napsauttamalla tyhjennä-kuvaketta päivämäärävalitsimessa.

### Vain TODO -kytkin

1. Etsi **Vain TODO** -kytkinkytkin suodatinpalkista.
2. Ota se käyttöön näyttääksesi vain TODO-merkityt palautemerkinnät.
3. Tämä tarjoaa nopean vaihtoehdon TODO-lista-välilehdelle siirtymiselle pysyen Kaikki palautteet -näkymässä muiden suodattimien kanssa.

> **Vinkki:** Yhdistä suodattimet tehokkaisiin kyselyihin. Esimerkiksi aseta Tyyppi "Virhe" ja Tila "Avoin" nähdäksesi kaikki ratkaisemattomat virheraporttit.

---

## Palautemerkinnät

Jokainen palautemerkintä listassa näyttää seuraavat tiedot:

| Kenttä | Kuvaus |
|--------|--------|
| **Käyttäjätiedot** | Lähettäjän näyttönimi, sähköposti ja profiilikuva |
| **Viesti** | Käyttäjän lähettämän palautteen koko teksti |
| **Tyyppimerkki** | Värikoodattu merkki: Virhe (punainen), Ehdotus (sininen) tai Yleinen (harmaa) |
| **Päivämäärä** | Palautteen lähetyspäivä ja -aika |
| **Tila** | Nykyinen tilaindikaattori (Avoin, Vastattu tai Suljettu) |
| **TODO-nasta** | Nastakuvake, joka ilmaisee onko tämä merkintä merkitty jatkotoimenpiteille |

### Palautemerkinnän tarkasteleminen

1. Etsi palautemerkintä listasta.
2. Napsauta merkintäriviä tai laajennuskuvaketta avataksesi yksityiskohtaisen näkymän.
3. Yksityiskohtainen näkymä näyttää koko viestin, käyttäjätiedot ja aiemmat ylläpitäjävastaukset.

---

## Palautteeseen vastaaminen

Ylläpitäjät voivat vastata käyttäjäpalautteeseen. Vastaukset näkyvät käyttäjälle mobiilisovelluksessa.

### Vastaamisen vaiheet

1. Avaa palautemerkintä, johon haluat vastata.
2. Etsi **Vastaus**-tekstialue yksityiskohtaisen näkymän alaosassa.
3. Kirjoita vastausviestisi tekstialueelle.
4. Tarkista viestisi selkeyden ja ammattimaisuuden osalta.
5. Napsauta **Lähetä vastaus** -painiketta.
6. Vahvistusviesti ilmestyy ilmoittaen vastauksen lähettämisen onnistuneen.
7. Palautteen tila vaihtuu automaattisesti tilaan **Vastattu**.

> **Tärkeää:** Vastauksesi näkyy käyttäjälle Petfolioo-mobiilisovelluksessa. Varmista, että vastauksesi on avulias, ammattimainen ja käsittelee käyttäjän huolenaihetta suoraan.

### Vastausten parhaat käytännöt

- Tunnusta käyttäjän palaute ennen ratkaisun tarjoamista.
- Jos ongelma on tunnettu virhe, kerro käyttäjälle että sitä työstetään.
- Ehdotuksille kiitä käyttäjää ja selitä, harkitaanko ominaisuutta.
- Vältä teknistä ammattikieltä, jota loppukäyttäjät eivät ehkä ymmärrä.
- Pidä vastaukset ytimekkäinä mutta kattavina.

---

## Aiemmat ylläpitäjävastaukset

Tarkasteltaessa palautemerkintää, joka on saanut vastauksia, kaikki aiemmat ylläpitäjävastaukset näytetään aikajärjestyksessä.

1. Avaa palautemerkinnän yksityiskohtainen näkymä.
2. Vieritä alas nähdäksesi keskusteluketjun.
3. Jokainen vastaus näyttää:
   - Vastauksen kirjoittaneen ylläpitäjän nimen
   - Vastauksen päivämäärän ja ajan
   - Koko vastaustekstin
4. Uudet vastaukset näkyvät ketjun alaosassa.

> **Vinkki:** Tarkista aiemmat vastaukset ennen uuden kirjoittamista välttääksesi päällekkäisiä tai ristiriitaisia vastauksia.

---

## Palautteen sulkeminen

Kun palautekohde on täysin käsitelty, voit sulkea sen ilmoittaaksesi ettei lisätoimia tarvita.

### Sulkemisen vaiheet

1. Avaa palautemerkintä, jonka haluat sulkea.
2. Napsauta **Sulje**-painiketta (tai valitse "Sulje" toimintovalikosta).
3. Vahvistusikkuna tulee näkyviin pyytäen vahvistamaan.
4. Napsauta **Vahvista** sulkeaksesi palautteen.
5. Merkinnän tila vaihtuu tilaan **Suljettu**.
6. Suljetut merkinnät pysyvät järjestelmässä ja ne voidaan tarkastella asettamalla tilasuodatin tilaan "Suljettu".

> **Huomautus:** Palautteen sulkeminen ei poista sitä. Voit silti tarkastella suljettuja merkintöjä ja avata ne uudelleen tarvittaessa.

---

## Merkitse/Poista merkintä TODO-tilaan

TODO-nastamerkintä mahdollistaa ylläpitäjien merkitä tiettyjä palautemerkintöjä jatkotoimenpiteille. Merkityt kohteet näkyvät TODO-lista-välilehdellä ja lisäävät TODO-lukumäärää tilastorivillä.

### Palautteen merkitseminen TODO-tilaan

1. Etsi palautemerkintä, jonka haluat merkitä jatkotoimenpiteille.
2. Napsauta **Nasta**-kuvaketta (nuppineula) merkintärivillä tai avaa yksityiskohtainen näkymä ja napsauta **Merkitse TODO-tilaan**.
3. Merkintä lisätään välittömästi TODO-listaan.
4. TODO-laskuri tilastorivillä kasvaa yhdellä.
5. Nastakuvake tulee näkyviin merkinnässä ilmaisemaan sen TODO-tilan.

### Merkinnän poistaminen

1. Etsi merkitty palautemerkintä (käytä TODO-lista-välilehteä tai Vain TODO -suodatinta).
2. Napsauta **Poista nasta** -kuvaketta merkintärivillä tai avaa yksityiskohtainen näkymä ja napsauta **Poista TODO-listalta**.
3. Merkintä poistetaan TODO-listalta.
4. TODO-laskuri tilastorivillä vähenee yhdellä.

### Milloin käyttää TODO-merkintöjä

- Palautekohde vaatii tutkimista ennen vastaamista.
- Tarvitset toisen tiimin jäsenen panoksen ennen vastaamista.
- Ongelma liittyy tulevaan julkaisuun ja sitä tulisi seurata.
- Ehdotus on keskusteltava seuraavassa suunnittelukokouksessa.

---

## Työnkulun yhteenveto

Suositeltu työnkulku palautteen käsittelyyn:

1. **Tarkastele** -- Tarkista tilastorivi päivittäin uuden avoimen palautteen varalta.
2. **Priorisoi** -- Käytä suodattimia priorisoiden virheet ehdotusten edelle.
3. **Merkitse** -- Merkitse monimutkaiset kohteet TODO-tilaan myöhempää jatkotoimenpidettä varten.
4. **Vastaa** -- Vastaa suoraviivaisiin kohteisiin välittömästi.
5. **Yhteistyö** -- Käytä TODO-lista-välilehteä tiimikatselmoinneissa.
6. **Sulje** -- Merkitse ratkaistut kohteet suljetuiksi vahvistettuasi, että käyttäjän ongelma on käsitelty.

---

## Pikanäppäimet

| Pikanäppäin | Toiminto |
|-------------|----------|
| `Enter` | Avaa valittu palautemerkintä |
| `R` | Kohdista vastaustekstialueelle (kun merkintä on auki) |
| `T` | Vaihda TODO-merkintä valitulla merkinnällä |
| `Esc` | Sulje yksityiskohtainen näkymä |

---

## Vianmääritys

| Ongelma | Ratkaisu |
|---------|----------|
| Vastaus ei lähde | Tarkista verkkoyhteys ja yritä uudelleen. Varmista, ettei viesti ole tyhjä. |
| Suodattimet eivät päivity | Päivitä sivu. Jos ongelma jatkuu, tyhjennä selaimen välimuisti. |
| TODO-lukumäärä virheellinen | Laskuri päivittyy sivun latauksen yhteydessä. Navigoi pois ja palaa päivittääksesi. |
| Suljetut palautteet eivät näy | Aseta Tila-suodatin tilaan "Suljettu" tai "Kaikki" nähdäksesi suljetut merkinnät. |

---

## Liittyvät sivut

- [Ilmoitukset](./notifications.md) -- Lähetä tiedotteita käyttäjille
- [Ylläpitäjät](./admin-users.md) -- Hallitse kuka voi vastata palautteeseen
- [Asetukset](./settings.md) -- Määritä järjestelmänlaajuiset asetukset
