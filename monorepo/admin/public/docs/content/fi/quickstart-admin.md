# Pikaopas: Admin

Tervetuloa Petfolioo Admin-portaaliin. Admin-roolissa sinulla on laaja operatiivinen pääsy käyttäjien, lemmikkien, sisällön ja päivittäisten alustatoimintojen hallintaan. Tämä opas kattaa mitä voit tehdä, päivittäisen työnkulkusi ja milloin eskaloida Super Adminille.

---

## Käytettävissäsi olevat sivut

| Sivu | Käytettävissä olevat toiminnot |
|------|-------------------------------|
| Dashboard | View alustan KPI-mittarit ja analytiikka |
| Sovelluskäyttäjät | View, Create, Edit, Ban |
| Lemmikit | View, Edit, Delete |
| Lemmikkikategoriat | View, Create, Edit, Delete |
| Verifiointi | View, Approve, Reject |
| Paritus | View, Edit, Delete, Moderate |
| Terveystodistukset | View, Approve, Reject |
| Rokotusanalytiikka | View, Export |
| Palaute | View, Respond |
| Blogi | View, Create, Edit, Delete |
| Ilmoitukset | View, Send |
| Analytiikka | View, Export |

Sivut, jotka **eivät** näy sivupalkissasi: Admin-käyttäjät, Asetukset.

---

## Ensimmäiset askeleet pääsyn saamisen jälkeen

1. **Kirjaudu sisään ja vahvista profiilisi** - Napsauta avatariasi oikeassa yläkulmassa vahvistaaksesi, että nimesi ja sähköpostisi ovat oikein.
2. **Tutustu Dashboardiin** - Ymmärrä alustan nykyinen tila: aktiiviset käyttäjät, odottavat verifioinnit, viimeaikainen toiminta.
3. **Tarkista verifiointijono** - Katso onko odottavia kasvattaja- tai lemmikkiverifiointeja, jotka vaativat toimenpiteitä.
4. **Selaa Sovelluskäyttäjiä** - Lajittele viimeisimmän liittymispäivän mukaan nähdäksesi uudet rekisteröinnit ja tutustuaksesi käyttäjäkuntaan.
5. **Tarkista Palaute** - Katso onko avoimia käyttäjävalituksia, jotka tarvitsevat vastauksen.

---

## Päivittäinen työnkulun tarkistuslista

- [ ] Avaa Dashboard ja tarkista KPI-kortit epätavallisen varalta
- [ ] Käsittele odottavat kohteet verifiointijonossa (hyväksy tai hylkää perusteluineen)
- [ ] Tarkista paritusilmoitukset uusien tai liputettujen merkintöjen varalta, jotka vaativat moderointia
- [ ] Käy läpi Palaute-lähetykset ja vastaa kiireellisiin ongelmiin
- [ ] Seuraa Sovelluskäyttäjiä tilien osalta, jotka vaativat bannausta tai tutkintaa
- [ ] Tarkista Terveystodistukset odottavien sertifiointitarkistusten osalta
- [ ] Lähetä alustailmoituksia, jos on tiedotteita tai huoltoikkunoita
- [ ] Tarkista Analytiikka sitoutumistrendien osalta ja vie raportteja tarpeen mukaan

---

## Keskeiset vastuualueet

### Toiminnot
Olet alustan ensisijainen operaattori. Verifiointitarkistukset, paritusmoderointi ja käyttäjähallinta ovat päivittäisiä ydintehtäviäsi. Pidä verifiointijono alle 24 tuntia vanhana aina kun mahdollista.

### Sisällönhallinta
Hallitset Blogia, Lemmikkikategorioita ja lemmikkitietoja. Varmista, että blogikirjoitukset ovat tarkkoja, kategoriat vastaavat tuettuja lajeja ja lemmikkiprofiilit sisältävät oikeat tiedot.

### Käyttäjätuki
Kun sovelluskäyttäjät raportoivat ongelmia Palautteen kautta, olet vastuussa vastaamisesta. Voit muokata käyttäjätilejä, bannata väärinkäyttäjiä ja korjata lemmikkitietoja heidän puolestaan.

### Ilmoitusten hallinta
Voit lähettää alustan laajuisia tai kohdennettuja ilmoituksia. Käytä tätä huoltoikkunoihin, ominaisuustiedotteisiin tai tärkeisiin käytäntömuutoksiin.

---

## Mitä et voi tehdä

| Toiminto | Kuka voi |
|----------|----------|
| Delete sovelluskäyttäjiä | Vain Super Admin |
| Export käyttäjätietoja | Vain Super Admin |
| Delete ilmoituksia | Vain Super Admin |
| Käyttää tai muokata Asetuksia | Vain Super Admin |
| Create/Edit/Delete admin-tilejä | Vain Super Admin |
| Manage Permissions rooleille | Vain Super Admin |

---

## Milloin eskaloida

Ota yhteyttä Super Adminiisi, kun sinun tarvitsee:

- Poistaa käyttäjätili pysyvästi (voit bannata, mutta et poistaa)
- Viedä käyttäjätietoja vaatimustenmukaisuus- tai oikeudellisiin pyyntöihin
- Muuttaa alustan asetuksia tai feature flags -asetuksia
- Myöntää admin-oikeudet uudelle tiimin jäsenelle
- Poistaa virheellisesti lähetetty ilmoitus
- Käsitellä tietoturvatapahtuma, joka vaatii järjestelmätason muutoksia

---

## Avun saaminen

Moduulikohtaiseen ohjeistukseen löydät vastauksia tämän käyttöoppaan muilta sivuilta. Pääsy- tai käyttöoikeusongelmissa ota yhteyttä organisaatiosi Super Adminiin.

---

*Seuraava: [Roolit ja käyttöoikeudet](./roles-permissions.md) - Täydellinen erittely kunkin roolin oikeuksista.*
