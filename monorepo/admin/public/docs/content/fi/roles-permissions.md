# Roolit & Oikeudet

Petfolioo Admin-portaali kayttaa roolipohjaista paasynhallintajarjestelmaa (RBAC) hallitakseen, mita kukin yllapitaja voi nahda ja tehda. Jokaiselle admin-kayttajalle maarataan rooli, ja jokainen rooli maarittaa joukon sivutason kayttooikeuksia ja toimintotason oikeuksia.

---

## Roolikatsaus

Alusta tukee neljaa admin-roolia, joista jokaisella on asteittain laajempi joukko valtuuksia:

| Role | Kuvaus | Tyypillinen kayttotapaus |
|------|-------------|-----------------|
| **Super Admin** | Taydellinen rajoittamaton paasy kaikkiin sivuihin ja toimintoihin | Alustan omistaja, CTO, paayllapitaja |
| **Admin** | Laaja paasy operatiivisiin sivuihin; ei paasya jarjestelmaasetuksiin tai admin-kayttajien hallintaan | Alustapaallikko, toimintojen johtaja |
| **Moderator** | Kohdennettu paasy sisallonmoderointitehtaviin (verifiointi, paritus, lemmikit) | Yhteisovastaava, sisallontarkastaja |
| **Viewer** | Vain luku -oikeus useimmille sivuille; ei voi luoda, muokata tai poistaa mitaan | Tukihenkilo, sidosryhma, tilintarkastaja |

---

## Oikeusrakenne

Oikeudet maaritellaan kahdella tasolla:

### 1. Sivupaasy

Jokaiselle roolille myonnetaan tai evataan paasy tietyille sivuille. Jos roolilla ei ole paasya sivulle, sivu ei nay sivupalkkinavigaatiossa ja suora URL-paasy estetaan.

### 2. Toiminto-oikeudet

Sivulla, johon roolilla on paasy, tietyt toiminnot voidaan ottaa kayttoon tai poistaa kaytosta. Esimerkiksi Moderator voi **katsella** lemmikkeja, mutta ei voi **poistaa** niita.

---

## Oikeusmatriisi

Seuraava matriisi nayttaa tarkalleen, mita kukin rooli voi tehda kullakin sivulla.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Sivujen nakyvyys rooleittain

Tama taulukko tiivistaa, mitka sivut nakyvat sivupalkkinavigaatiossa kullekin roolille:

| Page | Super Admin | Admin | Moderator | Viewer |
|------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Miten oikeudet vaikuttavat kayttoliittymaan

Kun kayttajalta puuttuu oikeus tiettyyn toimintoon, admin-portaali mukauttaa kayttoliittyman vastaavasti:

| Skenaario | UI-kayttaytyminen |
|----------|-------------|
| Ei sivupaasya | Sivu poistetaan sivupalkista; URL palauttaa 403 |
| Vain katselu (ei edit/delete) | Toimintopainikkeet piilotetaan; taulukon riveja ei voi napsauttaa muokkausta varten |
| Ei luontioikeutta | "Create" / "Add" -painike piilotetaan |
| Ei poisto-oikeutta | Poistovaihtoehto poistetaan toimintovalikoista |
| Ei vientioikeutta | Export-painike piilotetaan |
| Ei approve/reject-oikeutta | Verifiointitoimintopainikkeet piilotetaan; tila nakyy vain luku -muodossa |

> **Huomautus:** UI piilottaa kaytettavissa olemattomat toiminnot sen sijaan, etta nayttaisi poissa kaytosta olevia painikkeita. Tama pitaa kayttoliittyman siistina ja valttaa sekaannusta siita, mika on sallittua ja mika ei.

---

## Oikeuksien hallinta

Vain **Super Admin** -kayttajat voivat luoda, muokata tai poistaa admin-tileja ja muuttaa niiden oikeuksia.

### Roolin maaraaminen

1. Siirry kohtaan **Admin Users** sivupalkissa.
2. Napsauta **Create Admin User** tai muokkaa olemassa olevaa kayttajaa.
3. Valitse haluttu rooli Role-pudotusvalikosta.
4. Jos valitset **Super Admin**, kaikki oikeudet myonnetaan automaattisesti eika niita voi mukauttaa.
5. Muille rooleille voit mukauttaa sivupaasya ja toimintoja oikeuksienmuokkaustyokalun avulla.

### Mukautetut oikeudet

Vaikka jokaisella roolilla on tyypilliset oikeudet, jarjestelma tukee kayttajakohtaista mukauttamista:

- **Admin**-kayttajalle voidaan myontaa Settings-paasy tarvittaessa.
- **Moderator**-kayttajalle voidaan antaa Analytics-katseluoikeus.
- **Viewer**-kayttajan paasy voidaan rajoittaa oletusta harvemmille sivuille.

Mukautetut oikeudet ohittavat roolin oletusasetukset. Roolin nimi pysyy samana, mutta todellinen paasy on se, mika ratkaisee.

### Oikeuksien muokkaustyokalu

Oikeuksien muokkaustyokalu nayttaa tarkistuslistapohjaisen kayttoliittyman:

1. Jokainen sivu nakyy osiona, jossa on kytkin sivupaasylle.
2. Kun sivupaasy on kaytossa, kyseisen sivun kaytettavissa olevat toiminnot nakyvat valintaruutuina.
3. Valitse tai poista yksittaisten toimintojen valinta hienosaataaksesi kayttajan valtuuksia.
4. Napsauta **Save** ottaaksesi muutokset kayttoon valittomasti.

> **Tarkeaa:** Oikeuksien muutokset tulevat voimaan kayttajan seuraavalla sivunlatauksella. Jos kayttaja on parhaillaan kirjautuneena, han nakee paivitetyt oikeudet paivitettyaan selaimensa.

---

## Roolien vertailun pikaopas

### Super Admin
- Voi tehda kaiken
- Ainoa rooli, joka voi hallita admin-kayttajia ja jarjestelmaasetuksia
- Ainoa rooli, joka voi poistaa sovelluskayttajia ja ilmoituksia
- Ainoa rooli, joka voi vieda kayttajatietoja
- Ei voida poistaa, jos se on viimeinen Super Admin -tili

### Admin
- Taysi operatiivinen paasy sisaltoon ja kayttajahallintaan
- Voi approve/reject verifiointeja
- Voi hallita mating marketplace -palvelua
- Voi lahettaa ilmoituksia
- Ei paasya Settings- tai Admin Users -sivuille
- Ei voi poistaa sovelluskayttajia (vain ban)

### Moderator
- Keskittyy sisallon laatuun ja yhteison turvallisuuteen
- Voi approve/reject kasvattajaverifiointeja
- Voi moderoida paritusilmoituksia
- Voi muokata lemmikkeja (korjata virheellisia tietoja)
- Voi estaa ongelmallisia kayttajia
- Ei paasya Analytics-, Settings- tai Admin Users -sivuille
- Ei voi luoda tai poistaa sisaltoa

### Viewer
- Vain luku -paasy valvontatarkoituksiin
- Voi katsella hallintapaneeleja, kayttajia, lemmikkeja, analytiikkaa
- Ei voi muokata mitaan tietoja
- Ei voi lahettaa ilmoituksia tai hyvaksya verifiointeja
- Hyodyllinen sidosryhmille, jotka tarvitsevat nakyvyytta ilman riskia

---

## Turvallisuusnakokohtia

| Kaytanto | Kuvaus |
|----------|-------------|
| Vahimmat oikeudet | Maara kayttajan vastuualueisiin tarvittava vahimmaisrooli |
| Saannollinen tarkastus | Tarkista admin-kayttajalista neljannsvuosittain; poista kaytosta kayttamattomat tilit |
| Erilliset tilit | Jokaisella yllapitajalla tulee olla oma tilinsа (ei jaettuja kirjautumisia) |
| Super Admin -rajoitus | Pida Super Admin -tilien maara enintaan 2-3:ssa |
| Keskeyta ala poista | Kun admin lahtee, keskeyta tili poistamisen sijaan (sailyttaa tarkastuspolun) |

---

## Usein kysytyt kysymykset

**K: Voinko luoda mukautetun roolin?**
V: Jarjestelmassa on nelja kiinteaa roolia (Super Admin, Admin, Moderator, Viewer). Voit kuitenkin mukauttaa minka tahansa yksittaisen kayttajan oikeuksia riippumatta haiden roolimerkinnastaan.

**K: Mita tapahtuu, jos poistan sivupaasyn kayttajalta, joka parhaillaan katselee kyseista sivua?**
V: Kayttaja nakee 403-virheen seuraavalla navigoinnilla tai sivun paivityksella. Haiden istuntoaan ei keskeytetа.

**K: Voiko Super Admin alentaa itsensa?**
V: Super Admin voi muuttaa omaa rooliaan, mutta jarjestelma estaa viimeisen Super Admin -tilin poistamisen kokonaan.

**K: Vaikuttavatko oikeudet kayttajaoppaaseen?**
V: Ei. Kaikki admin-kayttajat voivat kayttaa kayttajaopasta riippumatta roolistaan tai oikeuksistaan. Dokumentaatio on aina saatavilla.

**K: Voinko nahda tarkastuslokin oikeusmuutoksista?**
V: Oikeusmuutokset tallennetaan aikaleimalla ja muutoksen tehneen adminin tunnuksella. Nama tallennetaan kunkin admin-kayttajatietueen `updatedBy`- ja `updatedAt`-kenttiin.
