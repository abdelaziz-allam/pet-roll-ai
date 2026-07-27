# Vianmääritys

Ratkaisuja yleisiin ongelmiin, joita saatat kohdata käyttäessäsi Petfolioo Admin-portaalia.

---

## Kirjautumisongelmat

### En pääse kirjautumaan sisään

**Ongelma:** Syötät tunnuksesi, mutta kirjautuminen epäonnistuu tai näet virheilmoituksen.

**Mahdolliset syyt:**
- Väärä sähköpostiosoite tai salasana
- Tilisi on deaktivoitu Super Adminin toimesta
- Todennuspalvelu on tilapäisesti poissa käytöstä
- Tiliäsi ei ole vielä luotu Admin-portaaliin

**Ratkaisu:**
1. Tarkista, että käytät admin-tiliisi liitettyä sähköpostiosoitetta (et henkilökohtaista tai sovelluskäyttäjän sähköpostia).
2. Varmista, että Caps Lock on pois päältä eikä salasanassasi ole ylimääräisiä välilyöntejä.
3. Kokeile salasanan nollaamista "Unohtuiko salasana" -linkillä.
4. Jos ongelma jatkuu, ota yhteyttä Super Adminiin varmistaaksesi, että tilisi on olemassa ja aktiivinen.
5. Jos palvelu näyttää olevan alhaalla, odota muutama minuutti ja yritä uudelleen.

---

### Unohdin salasanani

**Ongelma:** Et muista Admin-portaalin salasanaasi.

**Mahdolliset syyt:**
- Salasana vaihdettiin eikä sitä tallennettu
- Käytät toisen järjestelmän tunnuksia

**Ratkaisu:**
1. Napsauta kirjautumissivulla "Unohtuiko salasana."
2. Syötä admin-tiliisi liitetty sähköpostiosoite.
3. Tarkista saapuneet (ja roskapostikansio) salasanan nollaussähköpostin varalta.
4. Napsauta nollauslinkkiä ja luo uusi salasana.
5. Jos et saa sähköpostia 5 minuutin kuluessa, ota yhteyttä Super Adminiin tilisi manuaalista nollaamista varten.

---

### Istuntoni päättyi

**Ongelma:** Olit kirjautuneena, mutta sinut ohjattiin äkisti kirjautumissivulle.

**Mahdolliset syyt:**
- Istuntosi ylitti automaattisen aikakatkaisun (tyypillisesti 30 minuutin käyttämättömyys)
- Super Admin muutti tilisi asetuksia tai roolia
- Palvelin käynnistettiin uudelleen käyttöönoton aikana

**Ratkaisu:**
1. Kirjaudu uudelleen tunnuksillasi. Tallentamaton työ voi olla menetetty.
2. Jos istunnot päättyvät hyvin usein, varmista ettei selaimesi estä evästeitä Admin-portaalin verkkotunnukselle.
3. Tallenna työsi säännöllisesti välttääksesi tietojen menetyksen istuntojen aikakatkaisuista.

---

## Käyttöoikeusongelmat

### En näe sivua, johon minulla pitäisi olla pääsy

**Ongelma:** Navigointilinkki tai sivu, johon odotat pääsyä, ei ole näkyvissä tai näyttää tyhjän näytön.

**Mahdolliset syyt:**
- Roolisi ei sisällä oikeutta tarkastella kyseistä sivua
- Rooliasi muutettiin äskettäin eikä muutos ole vielä astunut voimaan
- Selaimen välimuistiongelma näyttää vanhentuneen version navigoinnista

**Ratkaisu:**
1. Tarkista nykyinen roolisi katsomalla profiiliasi tai kysymällä Super Adminilta. Katso Roolit ja käyttöoikeudet -opas nähdäksesi mihin sivuihin roolillasi on pääsy.
2. Jos rooliasi muutettiin äskettäin, kirjaudu ulos ja takaisin sisään päivittääksesi oikeutesi.
3. Tyhjennä selaimen välimuisti tai kokeile avata portaali yksityisessä/incognito-ikkunassa.
4. Jos uskot roolisi antavan pääsyn kyseiselle sivulle, ota yhteyttä Super Adminiin oikeuksiesi tarkistamiseksi.

---

### Painikkeet puuttuvat sivulta

**Ongelma:** Näet sivun, mutta tietyt toimintopainikkeet (Edit, Delete, Approve jne.) eivät näy.

**Mahdolliset syyt:**
- Roolillasi on vain luku -pääsy kyseiselle sivulle (esim. Viewer-rooli)
- Kohde on tilassa, jossa kyseiset toiminnot eivät ole käytettävissä (esim. jo hyväksytty)
- UI-renderöintiongelma

**Ratkaisu:**
1. Tarkista Roolit ja käyttöoikeudet -dokumentaatio varmistaaksesi, onko roolillasi kirjoitusoikeus kyseiseen ominaisuuteen.
2. Varmista, että kohteen nykyinen tila sallii odottamasi toiminnon (esim. et voi hyväksyä jo hyväksyttyä verifiointia).
3. Päivitä sivu. Jos painikkeet eivät edelleenkään näy, kokeile toista selainta.
4. Jos roolillasi pitäisi olla kyseiset painikkeet, ota yhteyttä Super Adminiin.

---

### Saan 403-virheen

**Ongelma:** Portaali näyttää "403 Forbidden" -virheen, kun yrität käyttää sivua tai suorittaa toiminnon.

**Mahdolliset syyt:**
- Yrität toimintoa, jota roolisi nimenomaisesti ei salli
- Istuntotokenisi on muuttunut virheelliseksi
- Roolisi alennettiin ollessasi kirjautuneena

**Ratkaisu:**
1. Merkitse muistiin mikä sivu tai toiminto aiheutti virheen.
2. Kirjaudu ulos ja takaisin sisään päivittääksesi istuntosi ja oikeutesi.
3. Jos virhe jatkuu, roolillasi ei ole pääsyä kyseiseen resurssiin. Ota yhteyttä Super Adminiin, jos tarvitset laajennettuja oikeuksia.

---

## Tietojen ongelmat

### Tekemäni muutokset eivät näy

**Ongelma:** Muokkasit tietuetta (lemmikki, käyttäjä, blogikirjoitus jne.), mutta muutokset eivät näy portaalissa.

**Mahdolliset syyt:**
- Tallennustoiminto epäonnistui hiljaisesti verkko-ongelman vuoksi
- Selaimesi näyttää sivun välimuistissa olevan version
- Toinen admin ylikirjoitti muutoksesi samanaikaisesti

**Ratkaisu:**
1. Päivitä sivu painamalla Ctrl+Shift+R (tai Cmd+Shift+R Macilla) ohittaaksesi välimuistin.
2. Tarkista näkyvätkö muutoksesi tietueessa. Jos eivät, tee muokkaus uudelleen ja seuraa virheilmoituksia tallentaessa.
3. Varmista, että sinulla on vakaa internet-yhteys.
4. Jos työskentelet jaetuilla tietueilla, koordinoi muiden adminien kanssa ristiriitaisten muokkausten välttämiseksi.

---

### Export ei toimi

**Ongelma:** Export-painikkeen napsautus ei tee mitään, tai ladattu tiedosto on tyhjä tai vioittunut.

**Mahdolliset syyt:**
- Selaimesi estää latauksen (ponnahdusikkunoiden esto tai latausrajoitukset)
- Tietojoukko on liian suuri ja vienti aikakatkaistiin
- Roolillasi ei ole vientioikeuksia

**Ratkaisu:**
1. Tarkista estikö selaimesi latauksen tai ponnahdusikkunan. Etsi ilmoitusta osoitepalkista.
2. Poista ponnahdusikkunoiden estot käytöstä Admin-portaalin verkkotunnukselle.
3. Jos tietojoukko on hyvin suuri, kokeile suodattimien käyttöä tietueiden määrän vähentämiseksi ennen vientiä.
4. Kokeile eri vientimuotoa (esim. CSV PDF:n sijaan), sillä se voi käsitellä nopeammin.
5. Jos ongelma jatkuu, ota yhteyttä Super Adminiin varmistaaksesi, että roolisi sisältää vientioikeudet.

---

### Haku ei palauta tuloksia

**Ongelma:** Haet tietuetta, jonka tiedät olevan olemassa, mutta saat tyhjän tulosjoukon.

**Mahdolliset syyt:**
- Kirjoitusvirhe tai ylimääräinen välilyönti hakukyselyssä
- Hakukenttä suodattaa tietyn sarakkeen mukaan (esim. haet nimellä kun syötit ID:n)
- Tietue poistettiin tai on eri tilassa kuin odotit

**Ratkaisu:**
1. Poista ylimääräiset välilyönnit hakukyselystäsi.
2. Kokeile hakua vähemmillä merkeillä tai osittaisella vastaavuudella.
3. Tarkista mitä kenttää haku suodattaa ja varmista, että kyselysi vastaa kenttätyyppiä.
4. Poista aktiiviset suodattimet, jotka saattavat sulkea tietueen pois.
5. Jos haet lemmikkiä mikrosiru-ID:llä, varmista että syötät täyden numeerisen ID:n ilman viivoja.

---

## Ilmoitusongelmat

### Push-ilmoitusta ei toimitettu

**Ongelma:** Lähetit push-ilmoituksen, mutta kohdekäyttäjät raportoivat, etteivät saaneet sitä.

**Mahdolliset syyt:**
- Käyttäjä on poistanut push-ilmoitukset käytöstä laitteeltaan
- Käyttäjän laitetunnus on vanhentunut (sovellus poistettiin ja asennettiin uudelleen)
- Ilmoitus lähetettiin väärään käyttäjäsegmenttiin
- Push-ilmoitusten toimituspalvelussa on viive

**Ratkaisu:**
1. Tarkista ilmoitusten toimituslokit Ilmoitukset-sivulta nähdäksesi lähetyksen tilan.
2. Varmista, että valitsit oikean kohdeyleisön (tietty käyttäjä, segmentti tai kaikki käyttäjät).
3. Huomaa, että push-ilmoitusten toimitus voi kestää muutaman minuutin laitteesta ja verkko-olosuhteista riippuen.
4. Jos tietty käyttäjä ei johdonmukaisesti saa ilmoituksia, laitetunnus voi olla virheellinen. Käyttäjän tulisi avata sovellus ja ottaa ilmoitukset uudelleen käyttöön laiteasetuksissa.
5. Yleisten ilmoitusten osalta varaa jopa 15 minuuttia toimitukseen kaikille käyttäjille.

---

### En voi lähettää ilmoituksia

**Ongelma:** "Send Notification" -painike on pois käytöstä tai saat virheen yrittäessäsi lähettää.

**Mahdolliset syyt:**
- Roolillasi ei ole ilmoitusten lähetysoikeutta (Viewers ja jotkut Moderators)
- Pakolliset kentät (otsikko, viesti, kohdeyleisö) eivät ole täytetty
- Ilmoituspalvelu on tilapäisesti poissa käytöstä

**Ratkaisu:**
1. Varmista, että kaikki pakolliset kentät on täytetty: otsikko, viestin teksti ja vähintään yksi kohdeyleisövalinta.
2. Tarkista, että roolillasi on oikeus lähettää ilmoituksia (Admin- tai Super Admin -rooli vaaditaan).
3. Jos kaikki kentät on täytetty ja sinulla on oikea rooli, kokeile sivun päivittämistä ja yritä uudelleen.
4. Jos virhe mainitsee palveluongelman, odota muutama minuutti ja yritä uudelleen. Jos ongelma jatkuu yli 30 minuuttia, raportoi se tekniselle tiimille.

---

## Selainongelmat

### Sivu ei lataudu

**Ongelma:** Admin-portaali näyttää tyhjän sivun, latausilmaisimen joka ei koskaan valmistu, tai yhteysvirheen.

**Mahdolliset syyt:**
- Internet-yhteysongelma
- Admin-portaalipalvelu on alhaalla tai käynnistyy uudelleen
- Selainlaajennukset häiritsevät sivun lataamista
- DNS tai palomuuri estää portaalin verkkotunnuksen

**Ratkaisu:**
1. Tarkista internet-yhteytesi vierailemalla toisella verkkosivustolla.
2. Kokeile sivun päivittämistä painamalla Ctrl+Shift+R (tai Cmd+Shift+R Macilla).
3. Kokeile avata portaali yksityisessä/incognito-ikkunassa laajennusristiriitojen poissulkemiseksi.
4. Tyhjennä selaimen välimuisti ja evästeet portaalin verkkotunnukselle.
5. Jos käytät yritysverkkoa, tarkista estääkö palomuuri tai välityspalvelin pääsyn.
6. Jos portaali on alhaalla kaikille, käyttöönotto voi olla käynnissä. Odota 5-10 minuuttia ja yritä uudelleen.

---

### Kuvat/kuvakaappaukset ovat rikki

**Ongelma:** Portaalin kuvat (lemmikkikuvat, blogikuvat, dokumentaation kuvakaappaukset) näkyvät rikkinäisinä kuvakkeina tai eivät lataudu.

**Mahdolliset syyt:**
- Kuvien tallennuspalvelu on tilapäisesti poissa käytöstä
- Kuva poistettiin tallennuksesta, mutta viittaus säilyy
- Sisältöturvallisuuskäytäntö estää kuvien lataamisen
- Hidas verkkoyhteys aiheuttaa kuvien latausaikakatkaisuja

**Ratkaisu:**
1. Päivitä sivu yrittääksesi kuvien lataamista uudelleen.
2. Tarkista koskeeko ongelma kaikkia kuvia vai vain tiettyjä. Jos vain tietyt kuvat ovat rikki, ne on voitu poistaa tallennuksesta.
3. Napsauta rikkinäistä kuvaa hiiren oikealla ja valitse "Avaa kuva uudessa välilehdessä." Jos se latautuu erikseen, selainlaajennus saattaa estää inline-kuvia.
4. Poista mainosten estot tai turvallisuuslaajennukset väliaikaisesti käytöstä testataksesi.
5. Jos ongelma koskee kaikkia kuvia koko portaalissa, raportoi se tekniselle tiimille, sillä tallennuspalvelu voi vaatia huomiota.

---

### Portaali on hidas

**Ongelma:** Sivujen lataaminen kestää kauan, toiminnot tuntuvat hitailta tai portaali muuttuu reagoimattomaksi.

**Mahdolliset syyt:**
- Hidas internet-yhteys
- Selaimessa on liian monta avointa välilehteä, jotka kuluttavat muistia
- Suuria tietojoukkoja ladataan ilman sivutusta
- Palvelin on raskaassa kuormituksessa

**Ratkaisu:**
1. Testaa internet-nopeutesi yhteysongelma poissulkemiseksi.
2. Sulje tarpeettomat selaimen välilehdet muistin vapauttamiseksi.
3. Jos tietty sivu on hidas (esim. lemmikirekisteri tuhansilla tietueilla), käytä suodattimia tietojoukon koon pienentämiseksi.
4. Tyhjennä selaimen välimuisti, joka on voinut kasvaa suureksi ajan myötä.
5. Kokeile toista selainta nähdäksesi onko ongelma selainkohtainen.
6. Jos hitaus on johdonmukaista usean adminin kohdalla, kyseessä voi olla palvelinpuolen ongelma. Raportoi se tekniselle tiimille mainiten tarkat sivut ja likimääräiset vastausajat.
