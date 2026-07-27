# Utenti App

Il modulo Utenti App fornisce la gestione completa di tutti gli account utente sulla piattaforma Petfolioo. Gli amministratori possono visualizzare profili utente, creare nuovi account, modificare dettagli, assegnare ruoli e intraprendere azioni di moderazione. Questo modulo è accessibile agli utenti con ruolo `super_admin` o `admin`.

![App Users](/docs/screenshots/users.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Ban, Delete, Export |
> | Admin | View, Create, Edit, Ban |
> | Moderator | View, Ban |
> | Viewer | View only |

---

## Tabella Elenco Utenti

La tabella dell'elenco utenti mostra tutti gli utenti registrati sulla piattaforma con le informazioni chiave visibili a colpo d'occhio.

### Colonne della Tabella

| Colonna | Descrizione | Ordinabile |
|---------|-------------|:----------:|
| Avatar | Foto profilo dell'utente (miniatura circolare) | No |
| Nome | Nome visualizzato | Sì |
| Email | Indirizzo email registrato | Sì |
| Ruolo | Ruolo assegnato sulla piattaforma (utente, moderatore, admin) | Sì |
| Stato | Stato dell'account (Attivo, In Sospeso, Bannato) | Sì |
| Allevatore Verificato | Badge che indica lo stato di allevatore verificato | Sì |
| Numero Animali | Numero di animali registrati dall'utente | Sì |
| Data di Iscrizione | Data di creazione dell'account | Sì |

### Indicatori di Stato

| Stato | Colore Badge | Significato |
|-------|-------------|---------|
| Attivo | Verde | L'account è pienamente funzionante |
| In Sospeso | Arancione | Verifica email non completata |
| Bannato | Rosso | Account sospeso da un amministratore |

### Badge Allevatore Verificato

| Indicatore | Significato |
|------------|---------|
| Badge spunta blu | L'utente ha completato la verifica allevatore ed è confermato |
| Nessun badge | L'utente non ha richiesto o ricevuto la verifica allevatore |
| Icona orologio | La domanda di verifica allevatore è in attesa di revisione |

### Navigazione della Tabella

1. **Ordina** cliccando l'intestazione di qualsiasi colonna ordinabile. Clicca di nuovo per invertire l'ordine.
2. **Cerca** usando la barra di ricerca sopra la tabella per trovare utenti per nome o email.
3. **Filtra** usando i menu a tendina stato e ruolo per restringere i risultati.
4. **Pagina** usando i controlli in basso (10, 20, 50 voci per pagina).

> **Suggerimento:** Combina la barra di ricerca con i filtri di stato per trovare rapidamente utenti specifici. Per esempio, cerca "mario" con stato "Bannato" per trovare utenti bannati di nome Mario.

---

## Visualizzazione Dettagli Utente

Il pannello dettaglio utente fornisce una vista completa del profilo e dell'attività di un utente.

### Apertura del Pannello Dettaglio

1. Clicca su qualsiasi riga nella tabella elenco utenti.
2. Il pannello dettaglio scorre dal lato destro dello schermo.
3. Il pannello contiene più sezioni organizzate verticalmente.

### Sezioni del Pannello Dettaglio

| Sezione | Contenuto |
|---------|---------|
| Intestazione Profilo | Avatar grande, nome visualizzato, email, badge ruolo, badge stato |
| Informazioni Account | Data iscrizione, ultimo accesso, stato verifica email, provider autenticazione |
| Dettagli Personali | Numero di telefono, fuso orario, paese, città |
| Stato Allevatore | Stato verifica, data domanda, documenti inviati |
| Riepilogo Animali | Conteggio animali registrati con link rapidi a ciascuno |
| Registro Attività | Azioni recenti eseguite dall'utente sulla piattaforma |

### Intestazione Profilo

La parte superiore del pannello mostra:

- **Avatar** a dimensione piena (o silhouette predefinita se non caricato)
- **Nome Visualizzato** in testo grande
- **Email** sotto il nome
- **Badge Ruolo** con codice colore per livello di permessi
- **Badge Stato** che mostra lo stato attuale dell'account

### Campi Informazioni Account

| Campo | Descrizione | Esempio |
|-------|-------------|---------|
| ID Utente | Identificatore univoco di sistema | "usr_a1b2c3d4" |
| Data Iscrizione | Quando l'account è stato creato | "2023-01-15 09:30 UTC" |
| Ultimo Accesso | Timestamp dell'accesso più recente | "2024-07-20 14:22 UTC" |
| Email Verificata | Se l'email è stata confermata | "Sì" / "No" |
| Provider Autenticazione | Metodo di autenticazione utilizzato | "Email/Password" o "Google" |
| Firebase UID | ID utente Firebase Authentication | "Abc123Def456" |

---

## Creazione di un Nuovo Utente

Gli amministratori possono creare account utente direttamente dal portale admin. Poiché la piattaforma utilizza Firebase Authentication, non viene impostata alcuna password durante la creazione - gli utenti riceveranno un'email per impostare la propria password.

### Procedura di Creazione Utente

1. Clicca il pulsante **Crea Utente** nell'angolo in alto a destra della pagina Utenti.
2. Apparirà un modulo o una finestra modale di creazione.
3. Compila i campi obbligatori:

| Campo | Obbligatorio | Descrizione |
|-------|:------------:|-------------|
| Nome Visualizzato | Sì | Il nome completo o il nome visualizzato scelto dall'utente |
| Email | Sì | Un indirizzo email valido (deve essere univoco sulla piattaforma) |

4. Clicca **Crea** per inviare il modulo.
5. Il sistema:
   - Creerà un record Firebase Authentication
   - Invierà un'email di benvenuto all'utente con un link per impostare la password
   - Creerà il profilo utente nel database della piattaforma
   - Assegnerà il ruolo predefinito "utente"
6. Il nuovo utente apparirà nella tabella con stato "In Sospeso" fino alla verifica dell'email.

### Regole di Validazione

| Campo | Regola |
|-------|--------|
| Nome Visualizzato | 2-100 caratteri, non può essere vuoto |
| Email | Deve essere in formato email valido, non deve già esistere nel sistema |

> **Nota:** Non è necessario un campo password. Firebase Authentication gestisce l'impostazione della password tramite l'email di benvenuto inviata all'utente. Questo garantisce che l'utente scelga una password sicura autonomamente.

> **Suggerimento:** Se devi creare un utente con permessi elevati, crealo prima con le impostazioni predefinite, poi modifica il suo ruolo separatamente (vedi Modifica Ruolo di seguito).

---

## Modifica di un Utente

Gli amministratori possono modificare i dettagli del profilo utente quando necessario. Questo viene comunemente usato per correggere informazioni o aggiornare dettagli per conto di un utente.

### Procedura di Modifica Utente

1. Apri il pannello dettaglio dell'utente cliccando la sua riga nella tabella.
2. Clicca il pulsante **Modifica** (icona matita) nell'intestazione del pannello.
3. Il pannello passa alla modalità modifica con campi editabili.
4. Modifica uno qualsiasi dei campi disponibili:

| Campo | Modificabile | Note |
|-------|:------------:|------|
| Nome Visualizzato | Sì | Il nome pubblico dell'utente |
| Telefono | Sì | Formato internazionale consigliato (es. +39351234567) |
| Fuso Orario | Sì | Menu a tendina dei fusi orari IANA (es. Europe/Rome) |
| Paese | Sì | Menu a tendina di tutti i paesi |
| Città | Sì | Campo testo, aggiorna i suggerimenti in base al paese |
| Email | No | Non può essere modificata (usata come identificatore di login) |
| ID Utente | No | Generato dal sistema, immutabile |

5. Clicca **Salva Modifiche** per applicare le modifiche.
6. Una notifica di successo confermerà l'aggiornamento.
7. Il pannello torna alla modalità visualizzazione mostrando le informazioni aggiornate.

### Storico Modifiche

Tutte le modifiche effettuate tramite il portale admin vengono registrate:

| Campo Log | Descrizione |
|-----------|-------------|
| Timestamp | Quando è stata effettuata la modifica |
| Admin | Quale amministratore ha effettuato la modifica |
| Campo modificato | Quale campo è stato modificato |
| Valore precedente | Il valore precedente |
| Nuovo valore | Il valore aggiornato |

> **Importante:** Le modifiche ai profili utente sono visibili all'utente. Vedranno le informazioni aggiornate nella loro app. Considera di notificare l'utente se effettui modifiche per suo conto.

---

## Modifica Ruolo

Le modifiche al ruolo determinano il livello di accesso di un utente all'interno della piattaforma e delle sue app.

### Ruoli Disponibili

| Ruolo | Descrizione | Capacità |
|-------|-------------|----------|
| user | Utente standard della piattaforma | Può gestire i propri animali, partecipare ai programmi di allevamento, visualizzare annunci |
| moderator | Moderatore della community | Tutte le capacità utente più la possibilità di revisionare e segnalare contenuti |
| admin | Amministratore della piattaforma | Tutte le capacità moderatore più accesso al portale admin |

### Procedura per Cambiare il Ruolo di un Utente

1. Apri il pannello dettaglio dell'utente cliccando la sua riga.
2. Individua la sezione **Ruolo** nel pannello.
3. Clicca il pulsante **Cambia Ruolo** (o il badge del ruolo attuale).
4. Appare una finestra modale di selezione ruolo con:
   - Pulsanti radio per ogni ruolo disponibile
   - Testo descrittivo che spiega i permessi di ogni ruolo
   - Una casella di conferma che riconosce la modifica
5. Seleziona il nuovo ruolo.
6. Leggi la descrizione del ruolo per confermare che sia appropriato.
7. Seleziona la **casella di conferma** ("Comprendo che questo cambierà il livello di accesso dell'utente").
8. Clicca **Conferma Cambio Ruolo**.
9. Il ruolo dell'utente viene aggiornato immediatamente.

### Restrizioni sul Cambio Ruolo

| Il Tuo Ruolo | Può Assegnare |
|--------------|---------------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Non può cambiare ruoli |
| viewer | Non può cambiare ruoli |

> **Importante:** Promuovere un utente ad "admin" gli garantisce l'accesso al portale admin. Fallo solo per membri fidati del team che necessitano di accesso amministrativo.

> **Nota:** Cambiare un utente da "admin" a "user" revoca immediatamente il suo accesso al portale admin. Se è attualmente connesso al portale, la sua sessione terminerà alla prossima navigazione di pagina.

---

## Ban/Unban Utente

Bannare un utente sospende il suo account, impedendogli di accedere all'app o utilizzare qualsiasi funzionalità della piattaforma.

### Bannare un Utente

1. Apri il pannello dettaglio dell'utente.
2. Scorri fino alla sezione **Azioni** in fondo al pannello.
3. Clicca il pulsante **Banna Utente** (visualizzato in rosso).
4. Appare una finestra modale di conferma con:
   - Il nome e l'email dell'utente per conferma
   - Un campo di testo **Motivo** (obbligatorio)
   - Un selettore **Durata** (permanente, 7 giorni, 30 giorni, 90 giorni)
5. Inserisci un motivo chiaro e professionale per il ban.
6. Seleziona la durata del ban.
7. Clicca **Conferma Ban**.

### Effetti del Ban

| Effetto | Descrizione |
|---------|-------------|
| Login bloccato | L'utente non può accedere all'app mobile |
| Profilo nascosto | Il profilo dell'utente non è visibile agli altri utenti |
| Animali rimossi dagli annunci | Tutti gli animali di proprietà di questo utente sono nascosti dagli elenchi |
| Notifiche | L'utente riceve un'email che spiega il ban con il motivo fornito |
| Sessioni attive | Tutte le sessioni correnti vengono terminate immediatamente |

### Linee Guida per il Motivo del Ban

| Linea Guida | Esempio |
|-------------|---------|
| Sii specifico | "Molteplici annunci di allevamento fraudolenti segnalati e confermati" |
| Fai riferimento alla policy | "Violazione dei Termini di Servizio sezione 4.2 riguardo agli annunci autentici" |
| Evita linguaggio vago | NON scrivere "comportamento scorretto" - sii specifico su ciò che è accaduto |
| Mantieni la professionalità | Il motivo viene inviato direttamente all'utente |

> **Importante:** Il motivo del ban viene comunicato all'utente via email e notifica in-app. Deve essere fattuale, specifico e professionale.

### Sbannare un Utente

1. Usa il filtro **Stato** per selezionare "Bannato" e trovare gli utenti bannati.
2. Clicca sulla riga dell'utente bannato per aprire il pannello dettaglio.
3. Il pannello mostra una card **Informazioni Ban** con:
   - Data del ban
   - Amministratore che ha effettuato il ban
   - Motivo del ban
   - Durata del ban / scadenza
4. Clicca il pulsante **Sbanna Utente** (visualizzato in verde).
5. Appare una finestra modale di conferma.
6. Inserisci opzionalmente una nota che spiega perché il ban viene revocato.
7. Clicca **Conferma Unban**.
8. Lo stato dell'utente torna ad "Attivo" e riacquista pieno accesso alla piattaforma.
9. L'utente riceve una notifica che il suo account è stato ripristinato.

### Storico Ban

Ogni azione di ban e unban viene registrata nello storico dell'utente:

| Campo | Descrizione |
|-------|-------------|
| Data Ban | Quando il ban è stato applicato |
| Data Unban | Quando il ban è stato revocato (se applicabile) |
| Admin | Quale amministratore ha eseguito l'azione |
| Motivo | Il motivo dichiarato per il ban |
| Durata | Per quanto tempo il ban era impostato |
| Risoluzione | Come si è concluso (unban manuale, scadenza, appello) |

---

## Ricerca e Filtri Utenti

### Barra di Ricerca

La barra di ricerca in cima alla pagina Utenti supporta:

| Tipo di Ricerca | Esempio | Corrispondenze |
|-----------------|---------|----------------|
| Ricerca per nome | "Sara" | Tutti gli utenti con "Sara" nel nome visualizzato |
| Ricerca per email | "gmail.com" | Tutti gli utenti con indirizzi Gmail |
| Corrispondenza parziale | "pet" | Utenti di nome "Peter", "Petrov", ecc. |

### Filtri a Tendina

| Filtro | Opzioni |
|--------|---------|
| Ruolo | Tutti, Utente, Moderatore, Admin |
| Stato | Tutti, Attivo, In Sospeso, Bannato |
| Allevatore Verificato | Tutti, Verificato, Non Verificato, In Sospeso |

### Combinazione Ricerca e Filtri

1. Inserisci testo nella barra di ricerca E seleziona valori di filtro simultaneamente.
2. I risultati devono corrispondere a TUTTI i criteri (logica AND).
3. Cancella i singoli filtri cliccando il pulsante X, o cancella tutto con il pulsante **Reimposta**.

---

## Esportazione Dati Utenti

Per esportare i dati utente per reportistica o analisi:

1. Applica i filtri desiderati.
2. Clicca il pulsante **Esporta** nell'area in alto a destra.
3. Seleziona il formato: **CSV** o **Excel**.
4. Scegli l'ambito: **Vista filtrata corrente** o **Tutti gli utenti**.
5. Il download inizia automaticamente.

### Campi Esportati

| Campo | Incluso | Note |
|-------|:-------:|------|
| Nome Visualizzato | Sì | |
| Email | Sì | |
| Ruolo | Sì | |
| Stato | Sì | |
| Paese | Sì | |
| Città | Sì | |
| Numero Animali | Sì | |
| Data Iscrizione | Sì | |
| Ultimo Accesso | Sì | |
| Telefono | No | Escluso per privacy |

> **Nota:** I numeri di telefono e le informazioni personali dettagliate sono esclusi dalle esportazioni per impostazione predefinita per conformità ai requisiti di protezione dei dati.

---

*Precedente: [Registro Animali](./pets.md) | Successivo: [Categorie Animali](./categories.md)*
