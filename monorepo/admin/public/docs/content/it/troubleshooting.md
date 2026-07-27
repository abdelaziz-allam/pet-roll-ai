# Risoluzione dei Problemi

Soluzioni ai problemi comuni che potresti incontrare durante l'utilizzo del Portale di Amministrazione di Petfolioo.

---

## Problemi di Accesso

### Non riesco ad accedere

**Problema:** Inserisci le tue credenziali ma il login fallisce o vedi un messaggio di errore.

**Possibili cause:**
- Indirizzo email o password errati
- Il tuo account e stato disattivato da un Super Admin
- Il servizio di autenticazione e temporaneamente non disponibile
- Il tuo account non e ancora stato creato nel Portale di Amministrazione

**Soluzione:**
1. Verifica di stare usando l'indirizzo email associato al tuo account amministratore (non la tua email personale o dell'app).
2. Assicurati che il Blocco Maiuscole sia disattivato e che non ci siano spazi alla fine della password.
3. Prova a reimpostare la password usando il link "Password dimenticata".
4. Se il problema persiste, contatta un Super Admin per confermare che il tuo account esista e sia attivo.
5. Se il servizio sembra essere inattivo, attendi qualche minuto e riprova.

---

### Ho dimenticato la password

**Problema:** Non riesci a ricordare la password del Portale di Amministrazione.

**Possibili cause:**
- La password e stata cambiata e non salvata
- Stai usando credenziali di un sistema diverso

**Soluzione:**
1. Nella pagina di login, clicca su "Password dimenticata".
2. Inserisci l'indirizzo email associato al tuo account amministratore.
3. Controlla la tua casella di posta (e la cartella spam) per l'email di reimpostazione password.
4. Clicca sul link di reimpostazione e crea una nuova password.
5. Se non ricevi l'email entro 5 minuti, contatta un Super Admin per reimpostare il tuo account manualmente.

---

### La mia sessione e scaduta

**Problema:** Eri connesso ma sei stato improvvisamente reindirizzato alla pagina di login.

**Possibili cause:**
- La tua sessione ha superato il periodo di timeout automatico (tipicamente 30 minuti di inattivita)
- Un Super Admin ha modificato le impostazioni del tuo account o ruolo
- Il server e stato riavviato durante un deployment

**Soluzione:**
1. Accedi nuovamente con le tue credenziali. Il lavoro non salvato potrebbe essere andato perso.
2. Se le sessioni scadono molto frequentemente, assicurati che il tuo browser non stia bloccando i cookie per il dominio del Portale di Amministrazione.
3. Salva il tuo lavoro regolarmente per evitare perdite di dati dovute ai timeout delle sessioni.

---

## Problemi di Permessi

### Non riesco a vedere una pagina a cui dovrei avere accesso

**Problema:** Un link di navigazione o una pagina che ti aspetti di poter accedere non e visibile o restituisce una schermata vuota.

**Possibili cause:**
- Il tuo ruolo non include il permesso di visualizzare quella pagina
- Il tuo ruolo e stato recentemente modificato e la modifica non ha ancora avuto effetto
- Un problema di cache del browser sta servendo una versione obsoleta della navigazione

**Soluzione:**
1. Verifica il tuo ruolo attuale guardando il tuo profilo o chiedendo a un Super Admin. Consulta la guida Ruoli e Permessi per vedere quali pagine il tuo ruolo puo accedere.
2. Se il tuo ruolo e stato recentemente modificato, esci e accedi nuovamente per aggiornare i tuoi permessi.
3. Svuota la cache del browser o prova ad aprire il portale in una finestra privata/incognito.
4. Se ritieni che il tuo ruolo dovrebbe garantire l'accesso alla pagina, contatta un Super Admin per rivedere i tuoi permessi.

---

### Mancano dei pulsanti in una pagina

**Problema:** Puoi vedere una pagina ma certi pulsanti di azione (Edit, Delete, Approve, ecc.) non vengono mostrati.

**Possibili cause:**
- Il tuo ruolo ha accesso in sola lettura a quella pagina (es., ruolo Viewer)
- L'elemento e in uno stato in cui quelle azioni non sono disponibili (es., gia approvato)
- Un problema di rendering della UI

**Soluzione:**
1. Consulta la documentazione Ruoli e Permessi per confermare se il tuo ruolo ha accesso in scrittura a quella funzionalita.
2. Verifica che lo stato attuale dell'elemento consenta l'azione che ti aspetti (es., non puoi approvare una verifica gia approvata).
3. Aggiorna la pagina. Se i pulsanti ancora non appaiono, prova un browser diverso.
4. Se il tuo ruolo dovrebbe avere quei pulsanti, contatta un Super Admin.

---

### Ricevo un errore 403

**Problema:** Il portale mostra un errore "403 Forbidden" quando provi ad accedere a una pagina o eseguire un'azione.

**Possibili cause:**
- Stai tentando un'azione che il tuo ruolo esplicitamente non consente
- Il tuo token di sessione e diventato invalido
- Il tuo ruolo e stato declassato mentre eri connesso

**Soluzione:**
1. Annota quale pagina o azione ha generato l'errore.
2. Esci e accedi nuovamente per aggiornare la sessione e i permessi.
3. Se l'errore persiste, il tuo ruolo non ha accesso a quella risorsa. Contatta un Super Admin se hai bisogno di permessi elevati.

---

## Problemi con i Dati

### Le modifiche che ho fatto non vengono mostrate

**Problema:** Hai modificato un record (animale, utente, post del blog, ecc.) ma le modifiche non si riflettono nel portale.

**Possibili cause:**
- L'operazione di salvataggio e fallita silenziosamente a causa di un problema di rete
- Il tuo browser sta mostrando una versione in cache della pagina
- Un altro amministratore ha sovrascritto le tue modifiche simultaneamente

**Soluzione:**
1. Aggiorna la pagina usando Ctrl+Shift+R (o Cmd+Shift+R su Mac) per bypassare la cache.
2. Verifica se il record mostra le tue modifiche. In caso contrario, riapplica la modifica e osserva eventuali messaggi di errore durante il salvataggio.
3. Assicurati di avere una connessione internet stabile.
4. Se lavori su record condivisi, coordinati con gli altri amministratori per evitare modifiche in conflitto.

---

### Export non funziona

**Problema:** Cliccando il pulsante Export non succede nulla, oppure il file scaricato e vuoto o corrotto.

**Possibili cause:**
- Il tuo browser sta bloccando il download (blocco pop-up o restrizioni di download)
- Il dataset e troppo grande e l'esportazione e andata in timeout
- Il tuo ruolo non ha i permessi di Export

**Soluzione:**
1. Verifica se il tuo browser ha bloccato un download o pop-up. Cerca una notifica nella barra degli indirizzi.
2. Disabilita qualsiasi blocco pop-up per il dominio del Portale di Amministrazione.
3. Se il dataset e molto grande, prova ad applicare filtri per ridurre il numero di record prima dell'esportazione.
4. Prova un formato di esportazione diverso (es., CSV invece di PDF) in quanto potrebbe essere elaborato piu velocemente.
5. Se il problema persiste, contatta un Super Admin per verificare che il tuo ruolo includa i permessi di Export.

---

### La ricerca non restituisce risultati

**Problema:** Cerchi un record che sai esistere ma ottieni un insieme di risultati vuoto.

**Possibili cause:**
- Un errore di battitura o spazio extra nella query di ricerca
- Il campo di ricerca sta filtrando su una colonna specifica (es., cercando per nome quando hai inserito un ID)
- Il record e stato eliminato o e in uno stato diverso da quello atteso

**Soluzione:**
1. Rimuovi eventuali spazi extra dalla tua query di ricerca.
2. Prova a cercare con meno caratteri o una corrispondenza parziale.
3. Verifica su quale campo sta filtrando la ricerca e assicurati che la tua query corrisponda a quel tipo di campo.
4. Rimuovi eventuali filtri attivi che potrebbero escludere il record.
5. Se cerchi un animale per Microchip ID, assicurati di inserire l'ID numerico completo senza trattini.

---

## Problemi con le Notifiche

### La notifica push non e stata consegnata

**Problema:** Hai inviato una notifica push ma gli utenti destinatari riferiscono di non averla ricevuta.

**Possibili cause:**
- L'utente ha disabilitato le notifiche push sul proprio dispositivo
- Il token del dispositivo dell'utente e scaduto (l'app e stata disinstallata e reinstallata)
- La notifica e stata inviata al segmento di utenti sbagliato
- C'e un ritardo nel servizio di consegna delle notifiche push

**Soluzione:**
1. Controlla il log di consegna delle notifiche nella pagina Notifications per vedere lo stato dell'invio.
2. Verifica di aver selezionato il pubblico destinatario corretto (utente specifico, segmento o tutti gli utenti).
3. Tieni presente che le notifiche push possono impiegare alcuni minuti per la consegna a seconda del dispositivo e delle condizioni di rete.
4. Se un utente specifico non riceve costantemente le notifiche, il suo token dispositivo potrebbe essere invalido. Dovrebbe aprire l'app e riabilitare le notifiche nelle impostazioni del dispositivo.
5. Per le notifiche broadcast, concedi fino a 15 minuti per il completamento della consegna a tutti gli utenti.

---

### Non riesco a inviare notifiche

**Problema:** Il pulsante "Send Notification" e disabilitato o ricevi un errore quando tenti di inviare.

**Possibili cause:**
- Il tuo ruolo non ha i permessi di invio notifiche (Viewers e alcuni Moderators)
- I campi obbligatori (titolo, corpo, pubblico destinatario) non sono compilati
- Il servizio notifiche e temporaneamente non disponibile

**Soluzione:**
1. Assicurati che tutti i campi obbligatori siano compilati: titolo, corpo del messaggio e almeno una selezione del pubblico destinatario.
2. Verifica che il tuo ruolo abbia il permesso di inviare notifiche (richiesto ruolo Admin o Super Admin).
3. Se tutti i campi sono compilati e hai il ruolo corretto, prova ad aggiornare la pagina e ritentare.
4. Se l'errore menziona un problema di servizio, attendi qualche minuto e riprova. Se il problema persiste per piu di 30 minuti, segnalalo al team tecnico.

---

## Problemi del Browser

### La pagina non si carica

**Problema:** Il Portale di Amministrazione mostra una pagina vuota, uno spinner di caricamento che non finisce mai o un errore di connessione.

**Possibili cause:**
- Problema di connettivita internet
- Il servizio del Portale di Amministrazione e inattivo o in riavvio
- Estensioni del browser che interferiscono con il caricamento della pagina
- DNS o firewall che bloccano il dominio del portale

**Soluzione:**
1. Verifica la tua connessione internet visitando un altro sito web.
2. Prova ad aggiornare la pagina con Ctrl+Shift+R (o Cmd+Shift+R su Mac).
3. Prova ad aprire il portale in una finestra privata/incognito per escludere conflitti con le estensioni.
4. Svuota la cache e i cookie del browser per il dominio del portale.
5. Se usi una rete aziendale, verifica se un firewall o proxy sta bloccando l'accesso.
6. Se il portale e inattivo per tutti, potrebbe essere in corso un deployment. Attendi 5-10 minuti e riprova.

---

### Le immagini/screenshot sono rotte

**Problema:** Le immagini nel portale (foto degli animali, immagini del blog, screenshot nella documentazione) appaiono come icone rotte o non si caricano.

**Possibili cause:**
- Il servizio di archiviazione immagini e temporaneamente non disponibile
- L'immagine e stata eliminata dallo storage ma il riferimento rimane
- Una policy di sicurezza dei contenuti sta bloccando il caricamento delle immagini
- Connessione di rete lenta che causa timeout nel caricamento delle immagini

**Soluzione:**
1. Aggiorna la pagina per ritentare il caricamento delle immagini.
2. Verifica se il problema riguarda tutte le immagini o solo alcune specifiche. Se solo immagini specifiche sono rotte, potrebbero essere state eliminate dallo storage.
3. Clicca col tasto destro su un'immagine rotta e seleziona "Apri immagine in nuova scheda". Se si carica separatamente, un'estensione del browser potrebbe bloccare le immagini inline.
4. Disabilita temporaneamente ad blocker o estensioni di sicurezza per testare.
5. Se il problema riguarda tutte le immagini del portale, segnalalo al team tecnico poiche il servizio di storage potrebbe necessitare attenzione.

---

### Il portale e lento

**Problema:** Le pagine impiegano molto tempo a caricarsi, le azioni risultano lente o il portale diventa non responsivo.

**Possibili cause:**
- Connessione internet lenta
- Il browser ha troppe schede aperte che consumano memoria
- Dataset grandi caricati senza paginazione
- Il server e sotto carico elevato

**Soluzione:**
1. Testa la velocita della tua connessione internet per escludere un problema di connettivita.
2. Chiudi le schede del browser non necessarie per liberare memoria.
3. Se una pagina specifica e lenta (es., Pet Registry con migliaia di record), applica filtri per ridurre la dimensione del dataset.
4. Svuota la cache del browser, che potrebbe essere cresciuta molto nel tempo.
5. Prova un browser diverso per vedere se il problema e specifico del browser.
6. Se la lentezza e consistente tra piu amministratori, potrebbe essere un problema lato server. Segnalalo al team tecnico indicando le pagine specifiche interessate e i tempi di risposta approssimativi.
