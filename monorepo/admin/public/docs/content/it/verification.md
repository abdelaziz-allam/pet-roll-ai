# Verifica Allevatore

Il modulo Verifica Allevatore consente agli amministratori di revisionare, approvare, rifiutare e revocare le richieste di verifica degli allevatori. Gli allevatori verificati ricevono un badge di fiducia visibile agli acquirenti, che segnala che il loro allevamento soddisfa gli standard della piattaforma.

![Verification](/docs/screenshots/verification.png)

---

## Tabella Richieste di Verifica

La vista principale mostra tutte le richieste di verifica in una tabella ricercabile e ordinabile.

| Colonna | Descrizione |
|---------|-------------|
| Nome Allevatore | Nome completo dell'allevatore che ha inviato la richiesta |
| Allevamento | Nome dell'allevamento registrato associato all'allevatore |
| N. Invio | Numero di invio auto-incrementale (i reinvii ricevono un nuovo numero) |
| Documenti | Numero di documenti caricati allegati all'invio |
| Stato | Badge dello stato di verifica attuale |
| Scadenza | Data di scadenza della verifica (mostrata solo per gli invii approvati) |

### Filtrare la Tabella

1. Usa il menu a tendina **Stato** per filtrare per: In Sospeso, Approvato, Rifiutato, Revocato o Scaduto.
2. Usa il campo **Ricerca** per trovare un allevatore per nome o allevamento.
3. Clicca l'intestazione di qualsiasi colonna per ordinare in modo ascendente o discendente.

> **Suggerimento:** La vista predefinita mostra prima gli invii In Sospeso per poter dare priorità alle nuove richieste.

---

## Flusso degli Stati

Le richieste di verifica seguono un ciclo di vita definito:

```
In Sospeso --> Approvato --> Scaduto (automatico, dopo la data di scadenza)
   |               |
   |               +--> Revocato (azione manuale dell'admin)
   |
   +--> Rifiutato (l'allevatore può reinviare)
```

### Definizione degli Stati

| Stato | Colore Badge | Significato |
|-------|-------------|---------|
| In Sospeso | Arancione | In attesa di revisione da parte dell'admin |
| Approvato | Verde | L'allevatore è verificato e il badge è attivo |
| Rifiutato | Rosso | L'invio non ha soddisfatto i requisiti |
| Revocato | Rosso Scuro | L'admin ha rimosso manualmente lo stato di verificato |
| Scaduto | Grigio | Il periodo di verifica è terminato; l'allevatore deve reinviare |

### Transizioni

- **In Sospeso** può transitare ad **Approvato** o **Rifiutato**.
- **Approvato** può transitare a **Revocato** (manuale) o **Scaduto** (automatico).
- **Rifiutato** e **Scaduto** permettono all'allevatore di creare un nuovo invio (nuova voce In Sospeso).
- **Revocato** è uno stato terminale per quell'invio.

---

## Revisione di un Invio

Per revisionare una richiesta di verifica allevatore:

1. Individua l'invio nella tabella Richieste di Verifica.
2. Clicca la riga o il pulsante azione **Revisiona** sul lato destro.
3. Si apre la **Finestra Modale Dettaglio Invio** con due schede:
   - **Invio Corrente** -- Mostra i documenti attuali e i dettagli dell'allevatore.
   - **Storico Invii** -- Mostra tutti gli invii precedenti di questo allevatore.

### Scheda Invio Corrente

Questa scheda visualizza:

- Informazioni profilo dell'allevatore (nome, email, telefono, numero registrazione allevamento)
- Documenti caricati in layout a griglia
- Data e ora dell'invio
- Eventuali note che l'allevatore ha incluso con l'invio

### Scheda Storico Invii

Questa scheda mostra un elenco cronologico di tutti gli invii dello stesso allevatore, inclusi:

- Numero invio
- Data di invio
- Stato finale
- Nome del revisore
- Motivo del rifiuto (se applicabile)

> **Suggerimento:** Usa la scheda Storico Invii per verificare se un allevatore ha affrontato i precedenti motivi di rifiuto prima di approvare un reinvio.

---

## Anteprima Documenti

Ogni documento caricato appare come miniatura nella griglia documenti.

1. Clicca qualsiasi miniatura del documento per aprire un'anteprima a dimensione piena.
2. Usa i controlli di zoom per ispezionare i dettagli del documento.
3. Naviga tra i documenti usando le frecce sinistra/destra nell'overlay di anteprima.
4. Premi **Escape** o clicca il pulsante chiudi per tornare alla finestra modale dettaglio.

I formati documento supportati includono:

- Immagini JPEG e PNG
- Documenti PDF (renderizzati come immagini di pagina)

> **Suggerimento:** Verifica chiarezza, autenticità e completezza quando revisioni i documenti caricati. Documenti sfocati o parziali dovrebbero essere rifiutati con istruzioni chiare per il reinvio.

---

## Approvazione di un Invio

Per approvare una richiesta di verifica allevatore:

1. Apri la finestra modale dettaglio invio cliccando la riga nella tabella.
2. Revisiona attentamente tutti i documenti caricati.
3. Clicca il pulsante **Approva** in fondo alla finestra modale.
4. Nella finestra di conferma:
   - Imposta la **Data di Scadenza** per la verifica. Il valore predefinito è 1 anno da oggi.
   - Opzionalmente modifica la data se un periodo più breve o più lungo è appropriato.
5. Clicca **Conferma Approvazione**.

### Cosa Succede Dopo l'Approvazione

- Il profilo dell'allevatore riceve immediatamente il badge di verificato.
- L'allevatore viene notificato via email e notifica in-app.
- Lo stato dell'invio cambia in **Approvato** nella tabella.
- La data di scadenza appare nella colonna Scadenza.
- Quando la data di scadenza passa, lo stato transita automaticamente a **Scaduto**.

> **Suggerimento:** Per nuovi allevatori con documentazione limitata, considera di impostare una scadenza più breve (6 mesi) per sollecitare una ri-verifica anticipata.

---

## Rifiuto di un Invio

Per rifiutare una richiesta di verifica allevatore:

1. Apri la finestra modale dettaglio invio.
2. Revisiona i documenti e identifica il/i problema/i.
3. Clicca il pulsante **Rifiuta** in fondo alla finestra modale.
4. Nella finestra di rifiuto:
   - Inserisci un **Motivo del Rifiuto** nell'area di testo. Questo campo è obbligatorio.
   - Sii specifico su ciò che manca o è inadeguato.
5. Clicca **Conferma Rifiuto**.

### Cosa Succede Dopo il Rifiuto

- Lo stato dell'invio cambia in **Rifiutato**.
- Il motivo del rifiuto è visibile all'allevatore nella sua dashboard.
- L'allevatore riceve una notifica che spiega il rifiuto.
- L'allevatore può creare un nuovo invio per risolvere i problemi.

### Scrivere Buoni Motivi di Rifiuto

| Fare | Non Fare |
|------|----------|
| "Il documento di registrazione dell'allevamento è scaduto (2019). Si prega di caricare una registrazione aggiornata." | "Documenti non sufficienti." |
| "La foto della struttura è troppo sfocata per verificare le condizioni. Si prega di reinviare con immagini più chiare." | "Foto scadenti." |
| "Mancano i registri vaccinali per gli animali da riproduzione." | "Incompleto." |

> **Suggerimento:** Motivi di rifiuto chiari riducono il via vai e aiutano gli allevatori a inviare domande complete al prossimo tentativo.

---

## Revoca della Verifica

La revoca rimuove immediatamente lo stato di verificato di un allevatore. Usala per violazioni delle policy o documentazione fraudolenta scoperta dopo l'approvazione.

1. Naviga alla tabella Richieste di Verifica.
2. Filtra per **Stato: Approvato** per trovare le verifiche attive.
3. Clicca la riga per aprire il dettaglio dell'invio.
4. Clicca il pulsante **Revoca** (appare solo per gli invii Approvati).
5. Nella finestra di revoca:
   - Inserisci il **Motivo della Revoca**. È obbligatorio.
   - Conferma di comprendere che l'azione è immediata.
6. Clicca **Conferma Revoca**.

### Cosa Succede Dopo la Revoca

- Il badge di verificato viene rimosso immediatamente dal profilo dell'allevatore.
- L'allevatore viene notificato via email con il motivo della revoca.
- Tutti gli annunci attivi dell'allevatore mostrano un indicatore di avviso.
- Lo stato dell'invio cambia in **Revocato** (stato terminale).
- L'allevatore non può reinviare sullo stesso invio; deve ricominciare da capo.

> **Suggerimento:** La revoca è un'azione seria. Documenta il motivo in modo approfondito in caso di contestazioni. Considera di contattare l'allevatore prima di revocare se il problema è minore.

---

## Vista Timeline

La Vista Timeline fornisce uno storico visivo del percorso di verifica di un allevatore.

1. Apri qualsiasi finestra modale dettaglio invio.
2. Passa alla scheda **Storico Invii**.
3. La timeline mostra gli eventi in ordine cronologico:
   - Invio creato
   - Documenti caricati
   - Revisione admin iniziata
   - Stato cambiato (con nome del revisore)
   - Avvisi di scadenza inviati
   - Reinvii collegati

### Lettura della Timeline

Ogni voce della timeline mostra:

- **Data e ora** dell'evento
- **Icona tipo evento** (documento, cambio stato, notifica)
- **Attore** (nome allevatore o nome admin)
- **Dettagli** (testo motivo, nomi documenti, data scadenza impostata)

### Casi d'Uso della Timeline

- **Risoluzione controversie:** Vedi lo storico completo quando un allevatore contesta un rifiuto.
- **Traccia di audit:** Monitora quale admin ha revisionato e approvato/rifiutato ogni invio.
- **Rilevamento pattern:** Identifica allevatori che inviano ripetutamente documentazione inadeguata.

> **Suggerimento:** La timeline è di sola lettura. Tutte le azioni (approva, rifiuta, revoca) devono essere eseguite dalla scheda Invio Corrente.

---

## Scorciatoie da Tastiera

| Scorciatoia | Azione |
|-------------|--------|
| Invio | Apri l'invio selezionato |
| Escape | Chiudi la finestra modale |
| Tab | Passa da una scheda all'altra nella finestra modale |
| Frecce | Naviga tra i documenti nell'anteprima |

---

## Domande Frequenti

**D: Posso approvare un invio con condizioni?**
R: No. Le approvazioni sono incondizionate. Se i documenti sono parzialmente accettabili, rifiuta con istruzioni specifiche su cosa correggere, poi approva il reinvio.

**D: Cosa succede agli annunci di un allevatore quando la sua verifica scade?**
R: Gli annunci rimangono attivi ma il badge di verificato viene rimosso. L'allevatore viene notificato 30 giorni prima della scadenza per incoraggiare il reinvio.

**D: Un allevatore revocato può fare nuovamente domanda?**
R: Sì, ma deve creare un invio completamente nuovo. L'invio revocato precedente rimane nello storico per finalità di audit.

**D: Chi può eseguire le azioni di verifica?**
R: Solo gli amministratori con il ruolo Gestore Verifiche possono approvare, rifiutare o revocare invii.
