# Pikaopas: Super Admin

Tervetuloa Petfolioo Admin-portaaliin. Super Admin -roolissa sinulla on rajoittamaton pääsy kaikkiin sivuihin, toimintoihin ja konfigurointivalintoihin alustalla. Tämä opas kattaa ensimmäisen päiväsi, päivittäiset työnkulut ja vastuualueet.

---

## Käytettävissäsi olevat sivut

| Sivu | Käytettävissä olevat toiminnot |
|------|-------------------------------|
| Dashboard | View alustan KPI-mittarit ja analytiikka |
| Sovelluskäyttäjät | View, Create, Edit, Ban, Delete, Export |
| Lemmikit | View, Edit, Delete |
| Lemmikkikategoriat | View, Create, Edit, Delete |
| Verifiointi | View, Approve, Reject |
| Paritus | View, Edit, Delete, Moderate |
| Terveystodistukset | View, Approve, Reject |
| Rokotusanalytiikka | View, Export |
| Palaute | View, Respond, Delete |
| Blogi | View, Create, Edit, Delete |
| Ilmoitukset | View, Send, Delete |
| Analytiikka | View, Export |
| Admin-käyttäjät | View, Create, Edit, Delete, Manage Permissions |
| Asetukset | View, Edit |

Sinulla on pääsy kaikkeen. Mitään sivuja ei ole piilotettu sivupalkistasi.

---

## Ensimmäiset askeleet kirjautumisen jälkeen

1. **Vahvista profiilisi** - Napsauta avatariasi oikeassa yläkulmassa ja varmista, että tilisi tiedot ovat oikein.
2. **Konfiguroi alustan asetukset** - Siirry Asetuksiin ja tarkista alustan laajuinen konfigurointi (brändäys, feature flags, oletusilmoitukset).
3. **Luo lisää admin-tilejä** - Siirry Admin-käyttäjiin ja luo tilit tiimisi jäsenille sopivilla rooleilla.
4. **Määritä lemmikkikategoriat** - Vieraile Lemmikkikategorioissa ja varmista, että laji- ja rotutaksonomia on määritetty alueellesi.
5. **Tarkista Dashboard** - Tutustu KPI-kortteihin, jotta tiedät miltä "normaali" näyttää.

---

## Päivittäinen työnkulun tarkistuslista

- [ ] Tarkista Dashboard alustan terveyden ja poikkeamien osalta
- [ ] Käy läpi odottavat verifioinnit verifiointijonossa
- [ ] Selaa Palautetta kiireellisten käyttäjävalitusten tai virheraporttien varalta
- [ ] Tarkista Admin-käyttäjälista pääsypyyntöjen tai epäilyttävien tilien osalta
- [ ] Tarkista Analytiikka käyttäjäkasvun ja sitoutumisen trendien osalta
- [ ] Seuraa paritusilmoituksia moderointilippujen osalta
- [ ] Tarkista muiden adminien lähettämät ilmoitukset asianmukaisuuden osalta
- [ ] Tarkista Asetukset säännöllisesti odottamattomien muutosten varalta

---

## Keskeiset vastuualueet

### Järjestelmän konfigurointi
Olet ainoa rooli, jolla on pääsy Asetukset-sivulle. Tähän sisältyvät alustan brändäys, feature toggles, API-avaimet ja ilmoitusmallit. Tarkista nämä neljännesvuosittain tai uusien ominaisuuksien käynnistyksen yhteydessä.

### Käyttäjähallinta
Vain sinä voit luoda, muokata ja poistaa admin-tilejä. Kun otat uusia tiimin jäseniä käyttöön, anna heille vähimmäisrooli, jonka he tarvitsevat (suosi Moderator- tai Viewer-roolia, ellei heillä ole aidosti tarvetta Admin-oikeuksille).

### Turvallisuusvalvonta
- Pidä Super Admin -tilien määrä enintään 2-3 kappaleessa.
- Tarkista admin-käyttäjien aktiivisuus neljännesvuosittain ja keskeytä käyttämättömät tilit.
- Olet ainoa rooli, joka voi poistaa sovelluskäyttäjiä ja viedä käyttäjätietoja, joten käsittele GDPR- ja tietopyynnöt henkilökohtaisesti.

### Eskalointipiste
Muut roolit eskaloivat sinulle, kun he tarvitsevat toimintoja oikeuksiensa ulkopuolelta: käyttäjien poistaminen, tietojen vienti, asetusten muuttaminen tai admin-tilien hallinta.

---

## Vinkkejä työn delegointiin

| Tehtävä | Delegoi kenelle |
|---------|-----------------|
| Päivittäiset verifiointitarkistukset | Admin tai Moderator |
| Paritusmoderointi | Admin tai Moderator |
| Lemmikkitietojen korjaukset | Admin tai Moderator |
| Alustailmoitusten lähettäminen | Admin |
| Analytiikan seuranta ja raportointi | Admin tai Viewer |
| Ongelmallisten käyttäjien bannaaminen | Admin tai Moderator |
| Blogisisällön hallinta | Admin |

Varaa aikasi tehtäville, jotka vain sinä voit suorittaa: asetusmuutokset, admin-käyttäjähallinta, tietojen viennit ja turvallisuustarkastukset. Mitä enemmän delegoit operatiivista työtä, sitä enemmän kapasiteettia sinulla on strategiseen valvontaan.

---

## Avun saaminen

Korkeimman käyttöoikeustason roolina tukikanavasi on alustan tekninen dokumentaatio ja kehitystiimi. Operatiivisiin kysymyksiin löydät vastauksia tämän käyttöoppaan muilta sivuilta.

---

*Seuraava: [Roolit ja käyttöoikeudet](./roles-permissions.md) - Täydellinen erittely kunkin roolin oikeuksista.*
