# Guida Introduttiva

Benvenuto nel Portale Admin di Petfolioo. Questa guida ti accompagna nel primo accesso, illustra il layout dell'interfaccia e ti aiuta a comprendere come i controlli di accesso basati sui ruoli determinano cosa puoi vedere e fare all'interno della piattaforma.

Il portale admin è una console di gestione web per la piattaforma Petfolioo dedicata alla salute e all'allevamento degli animali domestici. Da qui, gli amministratori possono gestire utenti, animali, categorie, cartelle cliniche, programmi di allevamento e impostazioni della piattaforma.

![Login Page](/docs/screenshots/login.png)

---

## Accesso

Il portale admin utilizza l'autenticazione tramite email e password. Solo gli account con un ruolo admin assegnato possono accedere al portale.

### Procedura di Accesso

1. Apri il browser e naviga all'URL del portale admin.
2. Verrà visualizzata la pagina di **Login** alla route `/login`.
3. Inserisci il tuo **Indirizzo Email** nel primo campo.
4. Inserisci la tua **Password** nel secondo campo.
5. Clicca il pulsante **Accedi**.
6. Se le credenziali sono valide e il tuo account ha accesso admin, verrai reindirizzato alla **Dashboard**.

> **Nota:** Se visualizzi un errore "Non autorizzato" dopo aver inserito credenziali valide, il tuo account potrebbe non avere un ruolo admin assegnato. Contatta un super amministratore per aggiornare il tuo ruolo.

### Reimpostazione della Password

Se hai dimenticato la password:

1. Nella pagina di Login, clicca il link **Password dimenticata?** sotto il campo password.
2. Inserisci l'indirizzo email associato al tuo account admin.
3. Clicca **Invia Link di Reimpostazione**.
4. Controlla la tua casella email per un messaggio di reimpostazione password da Petfolioo.
5. Clicca il link nell'email per aprire il modulo di reimpostazione password.
6. Inserisci e conferma la nuova password.
7. Torna alla pagina di login e accedi con le nuove credenziali.

> **Suggerimento:** I link di reimpostazione password scadono dopo 1 ora. Se il link è scaduto, richiedine uno nuovo dalla pagina di login.

---

## Comprendere il Layout della Dashboard

Una volta effettuato l'accesso, il portale admin presenta un layout coerente su tutte le pagine.

### Barra di Navigazione Laterale

La barra laterale sinistra contiene il menu di navigazione principale. Include collegamenti a tutti i moduli principali:

| Voce di Menu | Descrizione |
|--------------|-------------|
| Dashboard | Panoramica della piattaforma con KPI e analytics |
| Utenti | Gestione utenti dell'app, ruoli e account |
| Animali | Consultazione e gestione del registro animali |
| Categorie | Definizione e gestione delle categorie animali |
| Cartelle Cliniche | Revisione delle certificazioni sanitarie |
| Allevamento | Gestione programmi di allevamento e genealogia |
| Vaccinazioni | Monitoraggio registri vaccinali |
| Gravidanza | Monitoraggio delle gravidanze |
| Verifiche | Revisione delle richieste di verifica in sospeso |
| Impostazioni | Configurazione della piattaforma |

La barra laterale può essere compressa cliccando l'icona di toggle in alto per dare più spazio all'area dei contenuti.

### Barra di Intestazione

La barra di intestazione superiore contiene:

| Elemento | Posizione | Funzione |
|----------|-----------|----------|
| Ricerca | Centro | Ricerca globale tra utenti, animali e registri |
| Campanella Notifiche | Destra | Avvisi per azioni in sospeso ed eventi di sistema |
| Avatar Profilo | Estrema Destra | Menu account con impostazioni profilo e logout |

### Area Contenuti

L'area contenuti principale occupa lo spazio rimanente a destra della barra laterale e sotto l'intestazione. Qui vengono visualizzate tabelle, moduli, pannelli dettaglio e analytics.

---

## Accesso Basato sui Ruoli

Il portale admin applica il controllo degli accessi basato sui ruoli (RBAC). A ciascun account admin viene assegnato uno dei seguenti ruoli, che determina le azioni disponibili.

### Definizione dei Ruoli

| Ruolo | Livello di Accesso | Descrizione |
|-------|-------------------|-------------|
| `super_admin` | Completo | Accesso completo a tutti i moduli, impostazioni e gestione utenti. Può assegnare e revocare ruoli admin. |
| `admin` | Alto | Accesso a tutti i moduli operativi. Può gestire utenti, animali e registri. Non può modificare le impostazioni della piattaforma o assegnare ruoli super_admin. |
| `moderator` | Medio | Può revisionare e moderare contenuti, approvare verifiche e gestire le schede degli animali. Non può creare o eliminare account admin. |
| `viewer` | Sola Lettura | Può visualizzare tutti i dati in tutti i moduli ma non può creare, modificare o eliminare alcun record. Utile per audit e reportistica. |

### Matrice dei Permessi

| Azione | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Visualizzare dashboard | Sì | Sì | Sì | Sì |
| Gestire utenti | Sì | Sì | No | No |
| Creare account admin | Sì | No | No | No |
| Bannare/Sbannare utenti | Sì | Sì | Sì | No |
| Gestire animali | Sì | Sì | Sì | No |
| Approvare verifiche | Sì | Sì | Sì | No |
| Gestire categorie | Sì | Sì | No | No |
| Modificare impostazioni | Sì | No | No | No |
| Visualizzare report | Sì | Sì | Sì | Sì |

> **Nota:** Se una voce di navigazione non è visibile nella tua barra laterale, il tuo ruolo non ha accesso a quel modulo.

---

## Panoramica della Navigazione

Di seguito un elenco completo dei moduli disponibili nel portale admin, organizzati per area funzionale.

### Moduli Principali

1. **Dashboard** - Panoramica della piattaforma, KPI e grafici analytics.
2. **Utenti** - Gestione degli utenti dell'app inclusi profili, ruoli e stato account.
3. **Animali** - Il registro animali con viste dettagliate e strumenti di moderazione.
4. **Categorie** - Sistema di categorizzazione per specie/tipo di animale.

### Salute e Registri

5. **Cartelle Cliniche** - Documenti di certificazione sanitaria e il loro stato di verifica.
6. **Vaccinazioni** - Programmi vaccinali e registri di completamento.
7. **Gravidanza** - Monitoraggio delle gravidanze per animali da allevamento.

### Operazioni della Piattaforma

8. **Verifiche** - Coda delle richieste di verifica utenti e animali in sospeso.
9. **Allevamento** - Gestione dei programmi di allevamento e tracciamento genealogico.
10. **Impostazioni** - Configurazione generale della piattaforma e feature flag.

---

## Consigli per il Primo Utilizzo

Quando accedi al portale admin per la prima volta, segui queste raccomandazioni per orientarti.

### Primi Passi Consigliati

1. **Controlla il tuo profilo** - Clicca sul tuo avatar nell'angolo in alto a destra e seleziona "Profilo" per verificare che i dati del tuo account siano corretti.
2. **Esplora la dashboard** - Familiarizza con le card KPI e le analytics per comprendere le metriche attuali della piattaforma.
3. **Verifica le richieste in sospeso** - Naviga al modulo Verifiche per vedere se ci sono elementi in attesa di revisione.
4. **Consulta gli utenti attivi** - Visita il modulo Utenti e ordina per "Data di Iscrizione" decrescente per vedere le registrazioni più recenti.
5. **Controlla le categorie** - Assicurati che le categorie animali siano configurate correttamente per la tua regione.

### Browser Consigliati

Il portale admin funziona al meglio sui browser moderni:

| Browser | Versione Minima |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Suggerimento:** Abilita le notifiche del browser quando richiesto per ricevere avvisi in tempo reale per le verifiche in sospeso e gli eventi di sistema importanti.

### Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| `/` | Mette a fuoco la barra di ricerca globale |
| `Esc` | Chiude pannelli e finestre modali aperte |

---

## Risoluzione Problemi di Accesso

| Problema | Soluzione |
|----------|----------|
| Errore "Credenziali non valide" | Ricontrolla email e password. Usa la procedura Password dimenticata se necessario. |
| Messaggio "Account disabilitato" | Il tuo account è stato disattivato. Contatta un super amministratore. |
| La pagina si carica ma il modulo di login è vuoto | Svuota cache e cookie del browser, poi ricarica. |
| Reindirizzamento al login dopo l'accesso | La sessione potrebbe essere scaduta. Prova ad accedere di nuovo. Se persiste, verifica che i cookie siano abilitati. |

---

## Ottenere Assistenza

Se riscontri problemi non trattati in questa guida:

1. Consulta le altre sezioni di questo manuale utente per assistenza specifica sui moduli.
2. Contatta il super amministratore della tua organizzazione per problemi di ruoli e accesso.
3. Per problemi tecnici, rivolgiti al team di supporto della piattaforma.

---

*Successivo: [Dashboard](./dashboard.md) - Scopri la panoramica analytics e KPI.*
