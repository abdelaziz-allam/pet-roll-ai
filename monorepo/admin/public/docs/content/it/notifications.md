# Notifiche

La pagina Notifiche consente agli amministratori di comporre e inviare notifiche push agli utenti dell'app mobile Petfolioo. Puoi targetizzare segmenti di pubblico specifici, consultare lo storico delle notifiche e seguire le best practice per una comunicazione efficace.

![Notifications](/docs/screenshots/notifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Send, Delete |
> | Admin | View, Send |
> | Moderator | View |
> | Viewer | View only |

---

## Panoramica

Le notifiche push sono un canale diretto verso i tuoi utenti. Usale per annunciare nuove funzionalità, condividere aggiornamenti importanti, inviare promemoria o coinvolgere segmenti di utenti specifici. Questa pagina fornisce sia gli strumenti di composizione che un registro storico di tutte le notifiche inviate in precedenza.

---

## Componi Notifica

Il compositore di notifiche è lo strumento principale per creare e inviare notifiche push agli utenti dell'app.

### Accesso al Compositore

1. Naviga alla pagina **Notifiche** dal menu nella barra laterale.
2. Il modulo di composizione è visualizzato in cima alla pagina.

### Campi del Modulo

| Campo | Descrizione | Requisiti |
|-------|-------------|-----------|
| **Titolo** | L'intestazione della notifica visualizzata in modo prominente sul dispositivo dell'utente | Obbligatorio. Massimo 65 caratteri consigliati per piena visibilità. |
| **Corpo del Messaggio** | Il contenuto dettagliato della notifica | Obbligatorio. Massimo 240 caratteri consigliati. |
| **Pubblico** | Il gruppo target di utenti che riceverà questa notifica | Obbligatorio. Seleziona dai segmenti predefiniti. |

---

## Composizione di una Notifica

Segui questi passaggi per creare e inviare una notifica:

### Passaggio 1: Inserisci il Titolo

1. Clicca sul campo di input **Titolo**.
2. Digita un'intestazione concisa e accattivante.
3. Mantienilo sotto i 65 caratteri per evitare il troncamento su dispositivi più piccoli.

> **Suggerimento:** Usa un linguaggio orientato all'azione nei titoli. "Novità: Monitora le Vaccinazioni del Tuo Animale" è più coinvolgente di "Aggiornamento Funzionalità Vaccinazioni."

### Passaggio 2: Scrivi il Corpo del Messaggio

1. Clicca sull'area di testo **Corpo del Messaggio**.
2. Scrivi il messaggio dettagliato che vuoi che gli utenti vedano.
3. Includi informazioni rilevanti come quale azione l'utente dovrebbe intraprendere.
4. Mantieni il messaggio sotto i 240 caratteri per una visualizzazione ottimale.

### Passaggio 3: Seleziona il Pubblico

1. Clicca il selettore a tendina **Pubblico**.
2. Scegli uno dei seguenti segmenti di pubblico:

| Pubblico | Descrizione |
|----------|-------------|
| **Tutti gli Utenti** | Invia la notifica a ogni utente registrato dell'app |
| **Proprietari di Cani** | Targetizza gli utenti che hanno almeno un cane registrato nel profilo |
| **Proprietari di Gatti** | Targetizza gli utenti che hanno almeno un gatto registrato nel profilo |
| **Allevatori Verificati** | Targetizza gli utenti che sono stati verificati come allevatori professionisti |

3. Il pubblico selezionato determina chi riceverà la notifica push.

> **Nota:** Un utente può appartenere a più segmenti. Per esempio, un allevatore verificato che possiede cani riceverà notifiche targetizzate a "Proprietari di Cani," "Allevatori Verificati," e "Tutti gli Utenti."

### Passaggio 4: Rivedi Prima dell'Invio

1. Ricontrolla il titolo per errori e chiarezza.
2. Rivedi il corpo del messaggio per accuratezza e tono.
3. Conferma che il segmento di pubblico sia corretto.
4. Verifica che non sia un duplicato di una notifica inviata di recente.

---

## Conferma Invio

Quando sei pronto a inviare la notifica, un passaggio di conferma assicura che non invii accidentalmente al pubblico sbagliato.

### Processo di Invio

1. Clicca il pulsante **Invia Notifica**.
2. Appare una finestra di conferma che mostra:
   - Il titolo della notifica
   - Il corpo del messaggio
   - Il segmento di pubblico selezionato
   - Il numero stimato di destinatari
3. Rivedi tutti i dettagli nella finestra di conferma.
4. Clicca **Conferma Invio** per inviare la notifica.
5. In alternativa, clicca **Annulla** per tornare al compositore e apportare modifiche.
6. Dopo l'invio riuscito, appare un messaggio di successo che conferma che la notifica è stata messa in coda.

> **Importante:** Una volta confermata, la notifica non può essere richiamata. Ricontrolla sempre pubblico e contenuto prima di confermare.

---

## Storico Notifiche

Sotto il modulo di composizione, la sezione Storico Notifiche mostra un elenco cronologico di tutte le notifiche inviate in precedenza.

### Colonne dell'Elenco Storico

| Colonna | Descrizione |
|---------|-------------|
| **Tag Tipo** | Un tag colorato che indica il segmento di pubblico (es. "Tutti gli Utenti" in blu, "Proprietari di Cani" in arancione) |
| **Titolo** | Il titolo della notifica come è stato inviato |
| **Messaggio** | Un'anteprima del corpo del messaggio (troncato se lungo) |
| **Data** | Data e ora in cui la notifica è stata inviata |
| **Conteggio Destinatari** | Il numero di utenti che hanno ricevuto la notifica |

### Visualizzazione dello Storico

1. Scorri sotto il modulo di composizione per vedere l'elenco storico.
2. Le notifiche sono elencate in ordine cronologico inverso (la più recente prima).
3. Ogni riga mostra il tag tipo, titolo, data e conteggio destinatari a colpo d'occhio.
4. Clicca su qualsiasi riga per espandere e vedere il corpo completo del messaggio.

### Comprensione dei Tag Tipo

I tag tipo sono codificati per colore per un'identificazione rapida:

| Colore Tag | Pubblico |
|------------|----------|
| Blu | Tutti gli Utenti |
| Arancione | Proprietari di Cani |
| Viola | Proprietari di Gatti |
| Verde | Allevatori Verificati |

---

## Best Practice per le Notifiche Push

Notifiche push efficaci stimolano il coinvolgimento senza infastidire gli utenti. Segui queste linee guida:

### Frequenza

1. **Limita la frequenza** -- Non inviare più di 2-3 notifiche a settimana a meno che non siano urgenti.
2. **Raggruppa aggiornamenti correlati** -- Combina più piccoli aggiornamenti in una singola notifica.
3. **Rispetta i fusi orari** -- Invia notifiche in orari ragionevoli (9:00 - 20:00 ora locale).
4. **Evita i fine settimana** -- A meno che la notifica non sia urgente, preferisci i giorni feriali.

### Qualità del Contenuto

1. **Sii conciso** -- Vai dritto al punto. Gli utenti decidono in secondi se interagire.
2. **Sii attuabile** -- Di' agli utenti cosa possono fare: "Controlla le vaccinazioni imminenti del tuo animale."
3. **Sii rilevante** -- Usa il targeting del pubblico per assicurarti che il contenuto corrisponda agli interessi dell'utente.
4. **Evita il clickbait** -- Notifiche fuorvianti erodono la fiducia e aumentano i tassi di opt-out.
5. **Personalizza quando possibile** -- Fai riferimento al segmento di pubblico: "Attenzione Proprietari di Cani" risulta più personale.

### Tempismo e Contesto

1. **Nuove funzionalità** -- Invia quando la funzionalità è attiva e accessibile.
2. **Promemoria sanitari** -- Invia qualche giorno prima dell'appuntamento o vaccinazione dell'animale.
3. **Contenuti stagionali** -- Allinea con le stagioni (es. promemoria antiparassitari in primavera).
4. **Aggiornamenti di emergenza** -- Per problemi urgenti (manutenzione, sicurezza), invia immediatamente indipendentemente dalle regole di tempismo.

### Scrivere Titoli Efficaci

| Buon Esempio | Perché Funziona |
|--------------|-----------------|
| "La Vaccinazione del Tuo Animale è in Scadenza" | Rilevante, crea urgenza, azione chiara |
| "Novità: Monitoraggio Gravidanza per Allevatori" | Evidenzia nuovo valore, targetizza il pubblico |
| "Manutenzione Stasera alle 22:00" | Chiaro, specifico, urgente |

| Cattivo Esempio | Perché Fallisce |
|-----------------|-----------------|
| "Guarda un po'!" | Vago, nessuna proposta di valore |
| "Aggiornamento" | Troppo generico, gli utenti ignoreranno |
| "Importante!!!" | Uso eccessivo dell'urgenza, sembra spam |

### Misurare il Successo

Dopo aver inviato le notifiche, monitora:

- **Tassi di apertura** -- Gli utenti interagiscono con le tue notifiche?
- **Tassi di opt-out** -- Un picco indica fatica da notifiche.
- **Attività in-app** -- La notifica stimola il comportamento desiderato?
- **Feedback** -- Controlla la pagina Feedback per le reazioni degli utenti.

---

## Dettagli Segmenti di Pubblico

### Tutti gli Utenti

- Include ogni account registrato nel sistema.
- Usa per annunci a livello di piattaforma, avvisi di manutenzione o funzionalità universali.
- Pubblico più ampio -- usa con parsimonia per evitare fatica da notifiche.

### Proprietari di Cani

- Include gli utenti con almeno un cane nel loro profilo animali.
- Usa per consigli sanitari specifici per cani, eventi di razza o aggiornamenti funzionalità.
- Esempio: "Promemoria: Prevenzione annuale della filariosi per i cani."

### Proprietari di Gatti

- Include gli utenti con almeno un gatto nel loro profilo animali.
- Usa per contenuti specifici per gatti, consigli sulla salute indoor o funzionalità feline.
- Esempio: "Novità: Monitoraggio attività indoor per gatti."

### Allevatori Verificati

- Include gli utenti che hanno completato la verifica allevatore.
- Usa per funzionalità specifiche per l'allevamento, aggiornamenti di conformità o strumenti professionali.
- Esempio: "Miglioramenti al tracker gravidanza ora disponibili."

---

## Risoluzione Problemi

| Problema | Soluzione |
|----------|----------|
| La notifica non si invia | Verifica che tutti i campi obbligatori siano compilati. Controlla la connettività di rete. |
| Il conteggio destinatari mostra 0 | Il segmento di pubblico selezionato potrebbe essere vuoto. Verifica che esistano utenti in quel segmento. |
| Gli utenti segnalano di non ricevere | Gli utenti potrebbero aver disabilitato le notifiche push sul loro dispositivo. Questo è fuori dal controllo dell'admin. |
| Notifica duplicata inviata | Controlla l'elenco storico prima di inviare. Non c'è annullamento una volta confermato. |

---

## Pagine Correlate

- [Feedback](./feedback.md) -- Monitora le reazioni degli utenti alle notifiche
- [Analytics](./analytics.md) -- Traccia le tendenze di coinvolgimento degli utenti
- [Impostazioni](./settings.md) -- Configura le impostazioni di sistema relative alle notifiche
