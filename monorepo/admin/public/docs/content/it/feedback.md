# Gestione Feedback

La pagina Gestione Feedback consente agli amministratori di visualizzare, rispondere e organizzare il feedback degli utenti inviato tramite l'applicazione mobile Petfolioo. Questo è il tuo hub centrale per comprendere le esigenze degli utenti, tracciare bug e gestire suggerimenti per nuove funzionalità.

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

## Panoramica

Quando navighi alla pagina Feedback, vedrai una riga di statistiche in cima che riassume lo stato attuale di tutti i feedback, seguita da aree di contenuto con schede e controlli di filtraggio.

---

## Riga Statistiche

In cima alla pagina, quattro card metriche mostrano conteggi in tempo reale:

| Metrica | Descrizione |
|---------|-------------|
| **Totale** | Il numero totale di voci di feedback ricevute in tutti gli stati |
| **Aperti** | Voci di feedback che non hanno ancora ricevuto risposta o non sono state chiuse |
| **Risposti** | Voci di feedback dove un admin ha pubblicato almeno una risposta |
| **TODO** | Voci di feedback fissate da un admin per un'azione di follow-up |

> **Suggerimento:** Usa il conteggio TODO come indicatore rapido degli elementi in sospeso che richiedono attenzione. Se questo numero cresce, considera di effettuare un triage con il team.

---

## Schede

La pagina Feedback è organizzata in due schede:

### Tutti i Feedback

1. Clicca la scheda **Tutti i Feedback** (selezionata per impostazione predefinita).
2. Questa vista mostra ogni voce di feedback nel sistema indipendentemente dallo stato.
3. Le voci sono ordinate per data, con le più recenti che appaiono per prime.
4. Usa i filtri (descritti di seguito) per restringere i risultati.

### Lista TODO

1. Clicca la scheda **Lista TODO**.
2. Questa vista mostra solo le voci di feedback che sono state fissate come TODO da un admin.
3. Usa questa scheda durante le riunioni di triage del team o le revisioni giornaliere.
4. Gli elementi rimangono qui finché non vengono rimossi dai fissati.

---

## Filtri

Sotto le schede, una barra filtri fornisce diversi controlli per restringere le voci di feedback visualizzate.

### Filtro Stato

1. Individua il menu a tendina **Stato** sulla barra filtri.
2. Clicca per espandere e seleziona una delle seguenti opzioni:
   - **Tutti** -- Mostra feedback in qualsiasi stato
   - **Aperto** -- Mostra solo feedback non risolti
   - **Risposto** -- Mostra feedback con almeno una risposta admin
   - **Chiuso** -- Mostra feedback contrassegnati come risolti
3. L'elenco si aggiorna immediatamente alla selezione.

### Filtro Tipo

1. Individua il menu a tendina **Tipo** sulla barra filtri.
2. Seleziona la categoria di feedback che vuoi visualizzare:
   - **Tutti i Tipi** -- Nessun filtro tipo applicato
   - **Bug** -- Problemi o difetti segnalati dagli utenti
   - **Suggerimento** -- Richieste di funzionalità e idee di miglioramento
   - **Generale** -- Commenti o domande generali
3. Ogni voce di feedback è etichettata con il suo badge tipo per un'identificazione visiva rapida.

### Filtro Intervallo Date

1. Clicca il selettore **Intervallo Date** sulla barra filtri.
2. Seleziona una data di inizio e una data di fine dal widget calendario.
3. Solo i feedback inviati nell'intervallo selezionato verranno visualizzati.
4. Per cancellare il filtro data, clicca l'icona cancella sul selettore date.

### Toggle Solo TODO

1. Individua l'interruttore **Solo TODO** sulla barra filtri.
2. Abilitalo per mostrare solo le voci di feedback fissate come TODO.
3. Questo offre un'alternativa rapida al passaggio alla scheda Lista TODO rimanendo nella vista Tutti i Feedback con altri filtri applicati.

> **Suggerimento:** Combina i filtri per ricerche potenti. Per esempio, imposta Tipo su "Bug" e Stato su "Aperto" per vedere tutti i bug report non risolti.

---

## Voci di Feedback

Ogni voce di feedback nell'elenco mostra le seguenti informazioni:

| Campo | Descrizione |
|-------|-------------|
| **Info Utente** | Nome visualizzato, email e avatar dell'utente che ha inviato |
| **Messaggio** | Il testo completo del feedback inviato dall'utente |
| **Badge Tipo** | Un badge colorato che indica Bug (rosso), Suggerimento (blu), o Generale (grigio) |
| **Data** | Data e ora di invio del feedback |
| **Stato** | Indicatore di stato attuale (Aperto, Risposto, o Chiuso) |
| **Pin TODO** | Un'icona pin che indica se questa voce è contrassegnata per follow-up |

### Visualizzazione di una Voce di Feedback

1. Individua la voce di feedback nell'elenco.
2. Clicca sulla riga della voce o sull'icona espandi per aprire la vista dettaglio.
3. La vista dettaglio mostra il messaggio completo, le informazioni utente e eventuali risposte admin precedenti.

---

## Rispondere al Feedback

Gli amministratori possono rispondere al feedback degli utenti. Le risposte sono visibili all'utente all'interno dell'applicazione mobile.

### Procedura per Rispondere

1. Apri la voce di feedback a cui vuoi rispondere.
2. Individua l'area di testo **Rispondi** in fondo alla vista dettaglio.
3. Digita il messaggio di risposta nell'area di testo.
4. Rivedi il messaggio per chiarezza e professionalità.
5. Clicca il pulsante **Invia Risposta**.
6. Apparirà un messaggio di conferma indicando che la risposta è stata inviata con successo.
7. Lo stato del feedback cambia automaticamente in **Risposto**.

> **Importante:** La tua risposta sarà visibile all'utente nell'app mobile Petfolioo. Assicurati che la risposta sia utile, professionale e affronti direttamente la preoccupazione dell'utente.

### Best Practice per le Risposte

- Riconosci il feedback dell'utente prima di fornire una soluzione.
- Se il problema è un bug noto, fai sapere all'utente che è in fase di risoluzione.
- Per i suggerimenti, ringrazia l'utente e spiega se la funzionalità è in fase di valutazione.
- Evita gergo tecnico che gli utenti finali potrebbero non comprendere.
- Mantieni le risposte concise ma esaustive.

---

## Risposte Admin Precedenti

Quando visualizzi una voce di feedback che ha ricevuto risposte, tutte le risposte admin precedenti sono mostrate in linea in ordine cronologico.

1. Apri la vista dettaglio della voce di feedback.
2. Scorri verso il basso per vedere il thread della conversazione.
3. Ogni risposta mostra:
   - Il nome dell'admin che ha pubblicato la risposta
   - Data e ora della risposta
   - Il testo completo della risposta
4. Le nuove risposte appaiono in fondo al thread.

> **Suggerimento:** Rivedi le risposte precedenti prima di pubblicarne una nuova per evitare risposte duplicate o contraddittorie.

---

## Chiusura del Feedback

Quando un elemento di feedback è stato completamente affrontato, puoi chiuderlo per indicare che non è necessaria ulteriore azione.

### Procedura di Chiusura

1. Apri la voce di feedback che vuoi chiudere.
2. Clicca il pulsante **Chiudi** (o seleziona "Chiudi" dal menu azioni).
3. Apparirà una finestra di conferma che chiede di confermare.
4. Clicca **Conferma** per chiudere il feedback.
5. Lo stato della voce cambia in **Chiuso**.
6. Le voci chiuse rimangono nel sistema e possono essere visualizzate impostando il filtro stato su "Chiuso."

> **Nota:** Chiudere il feedback non lo elimina. Puoi ancora visualizzare le voci chiuse e riaprirle se necessario.

---

## Fissa / Rimuovi come TODO

La funzione pin TODO consente agli admin di contrassegnare specifiche voci di feedback per il follow-up. Gli elementi fissati appaiono nella scheda Lista TODO e contribuiscono al conteggio TODO nella riga statistiche.

### Fissare un Feedback come TODO

1. Individua la voce di feedback che vuoi contrassegnare per il follow-up.
2. Clicca l'icona **Fissa** (puntina) sulla riga della voce, o apri la vista dettaglio e clicca **Fissa come TODO**.
3. La voce viene immediatamente aggiunta alla Lista TODO.
4. Il contatore TODO nella riga statistiche si incrementa di uno.
5. Un'icona pin appare sulla voce indicando il suo stato TODO.

### Rimuovere un Feedback dai Fissati

1. Individua la voce di feedback fissata (usa la scheda Lista TODO o il filtro Solo TODO).
2. Clicca l'icona **Rimuovi Pin** sulla riga della voce, o apri la vista dettaglio e clicca **Rimuovi da TODO**.
3. La voce viene rimossa dalla Lista TODO.
4. Il contatore TODO nella riga statistiche si decrementa di uno.

### Quando Usare i Pin TODO

- Un elemento di feedback richiede indagine prima di rispondere.
- Hai bisogno di input da un altro membro del team prima di rispondere.
- Il problema è correlato a un rilascio imminente e dovrebbe essere tracciato.
- Un suggerimento deve essere discusso nella prossima riunione di pianificazione.

---

## Riepilogo del Flusso di Lavoro

Il flusso di lavoro consigliato per la gestione del feedback è:

1. **Revisiona** -- Controlla la riga statistiche quotidianamente per nuovi feedback aperti.
2. **Triage** -- Usa i filtri per dare priorità ai bug rispetto ai suggerimenti.
3. **Fissa** -- Contrassegna gli elementi complessi come TODO per un follow-up successivo.
4. **Rispondi** -- Rispondi immediatamente agli elementi semplici.
5. **Collabora** -- Usa la scheda Lista TODO nelle revisioni di team.
6. **Chiudi** -- Contrassegna come chiusi gli elementi risolti dopo aver confermato che il problema dell'utente è stato affrontato.

---

## Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| `Invio` | Apri la voce di feedback selezionata |
| `R` | Metti a fuoco l'area di testo risposta (quando la voce è aperta) |
| `T` | Attiva/disattiva pin TODO sulla voce selezionata |
| `Esc` | Chiudi la vista dettaglio |

---

## Risoluzione Problemi

| Problema | Soluzione |
|----------|----------|
| Risposta non si invia | Verifica la connessione di rete e riprova. Assicurati che il messaggio non sia vuoto. |
| Filtri non si aggiornano | Aggiorna la pagina. Se il problema persiste, svuota la cache del browser. |
| Conteggio TODO non corretto | Il conteggio si aggiorna al caricamento della pagina. Naviga altrove e torna per aggiornare. |
| Non riesco a vedere i feedback chiusi | Imposta il filtro Stato su "Chiuso" o "Tutti" per visualizzare le voci chiuse. |

---

## Pagine Correlate

- [Notifiche](./notifications.md) -- Invia comunicazioni agli utenti
- [Utenti Admin](./admin-users.md) -- Gestisci chi può rispondere al feedback
- [Impostazioni](./settings.md) -- Configura le preferenze di sistema
