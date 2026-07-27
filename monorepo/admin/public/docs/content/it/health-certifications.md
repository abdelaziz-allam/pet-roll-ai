# Certificazioni Sanitarie

Il modulo Certificazioni Sanitarie consente agli amministratori di gestire e verificare i certificati sanitari degli animali inviati da veterinari o proprietari di animali. Questo garantisce che gli animali presenti sulla piattaforma abbiano documentazione sanitaria valida e aggiornata.

![Health Records](/docs/screenshots/health-certifications.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabella Certificazioni

La vista principale mostra tutti gli invii di certificazioni sanitarie in una tabella dati.

| Colonna | Descrizione |
|---------|-------------|
| Nome Animale | Nome dell'animale a cui appartiene la certificazione |
| Info Veterinario | Nome del veterinario e clinica |
| Posizione | Paese e città dove la certificazione è stata emessa |
| Data Certificato | Data di emissione del certificato da parte del veterinario |
| Documenti | Numero di documenti di certificazione allegati |
| Stato | Badge dello stato attuale della certificazione |

### Azioni della Tabella

- Clicca qualsiasi riga per aprire il **Pannello Dettaglio** sul lato destro.
- Usa i pulsanti azione nell'ultima colonna per approvazione/rifiuto rapido.
- Ordina per qualsiasi colonna cliccando l'intestazione della colonna.

---

## Filtri

La barra filtri sopra la tabella offre quattro opzioni di filtro:

### Filtro Stato

Filtra le certificazioni per il loro stato attuale:

| Stato | Colore Badge | Descrizione |
|-------|-------------|-------------|
| In Sospeso | Arancione | In attesa di revisione dell'admin |
| Approvato | Verde | Certificazione verificata e attiva |
| Rifiutato | Rosso | La certificazione non ha superato la revisione |
| Revocato | Rosso Scuro | Certificazione precedentemente approvata invalidata |
| Scaduto | Grigio | Il periodo di validità della certificazione è terminato |

### Filtro Specie

Filtra per specie dell'animale:

- Cane
- Gatto
- Uccello
- Coniglio
- Altro

### Filtro Paese

Seleziona uno o più paesi per filtrare per la posizione dove la certificazione è stata emessa.

### Filtro Città

Restringi ulteriormente selezionando città specifiche all'interno del paese scelto.

> **Suggerimento:** I filtri sono combinabili. Per esempio, filtra per Stato: In Sospeso + Specie: Cane + Paese: Germania per vedere tutte le certificazioni in sospeso per cani dalla Germania.

---

## Pannello Dettaglio

Cliccando una riga di certificazione si apre un pannello dettaglio sul lato destro dello schermo. Il pannello contiene informazioni complete organizzate in sezioni.

### Banner di Stato

In cima al pannello, un banner colorato visualizza:

- Stato attuale con icona badge
- Data dell'ultimo cambio di stato
- Nome dell'admin che ha effettuato l'ultima azione sulla certificazione (se applicabile)
- Motivo del rifiuto o della revoca (se applicabile, mostrato in un avviso)

### Sezione Informazioni Animale

| Campo | Descrizione |
|-------|-------------|
| Nome Animale | Nome registrato dell'animale |
| Specie | Specie dell'animale |
| Razza | Razza dell'animale |
| Data di Nascita | Data di nascita dell'animale |
| ID Microchip | Identificatore univoco del microchip (se disponibile) |
| Proprietario | Nome del proprietario dell'animale con link al suo profilo |

### Sezione Dettagli Veterinari

| Campo | Descrizione |
|-------|-------------|
| Nome Veterinario | Nome completo del veterinario emittente |
| Nome Clinica | Nome della clinica veterinaria |
| Indirizzo Clinica | Indirizzo completo della clinica |
| Numero di Licenza | Numero di licenza professionale del veterinario |
| Telefono | Numero di telefono della clinica |
| Email | Email di contatto della clinica (se fornita) |

> **Suggerimento:** Verifica il numero di licenza consultando il database delle licenze veterinarie del tuo paese quando revisioni certificazioni da cliniche sconosciute.

### Barra di Validità

Sotto i dettagli veterinari, una barra di avanzamento visualizza il periodo di validità della certificazione:

1. La barra si estende dalla **Data Certificato** (inizio) alla **Data di Scadenza** (fine).
2. La data corrente è indicata da un marcatore sulla barra.
3. Codice colore:
   - **Verde:** Più di 30 giorni rimanenti
   - **Giallo:** 30 giorni o meno rimanenti
   - **Rosso:** Scaduto
4. La percentuale di validità consumata è visualizzata come testo.

### Griglia Documenti

La sezione documenti mostra i file di certificazione caricati in un layout a griglia.

1. Ogni documento appare come una card miniatura con il nome del file sotto.
2. Clicca qualsiasi miniatura per aprire l'overlay **Anteprima Immagine**.
3. Nell'overlay di anteprima:
   - Usa i controlli zoom avanti/indietro per ispezionare i dettagli.
   - Naviga tra i documenti con le frecce sinistra/destra.
   - Scarica il file originale usando il pulsante download.
   - Premi **Escape** per chiudere l'anteprima.
4. Formati supportati: JPEG, PNG, PDF.

> **Suggerimento:** Cerca timbri veterinari ufficiali, firme e numeri di licenza sui documenti di certificazione. Documenti generici o template senza questi elementi dovrebbero essere segnalati per il rifiuto.

---

## Approvazione di una Certificazione

Per approvare una certificazione sanitaria:

1. Apri il pannello dettaglio della certificazione cliccando la riga.
2. Rivedi i dettagli veterinari per completezza e plausibilità.
3. Ispeziona tutti i documenti caricati nella griglia documenti.
4. Clicca il pulsante **Approva** in fondo al pannello.
5. Nella finestra di conferma:
   - Rivedi il riepilogo di ciò che stai approvando.
   - La data di scadenza viene calcolata automaticamente in base al tipo di certificazione.
   - Clicca **Conferma**.

### Checklist di Approvazione

Prima di approvare, verifica:

- [ ] Il nome del veterinario e il numero di licenza sono presenti
- [ ] I dettagli della clinica sono completi e verificabili
- [ ] I documenti sono leggibili e contengono timbri/firme ufficiali
- [ ] La data di certificazione è recente (entro gli ultimi 12 mesi)
- [ ] Le informazioni dell'animale sul documento corrispondono al record sulla piattaforma
- [ ] Non ci sono segni di manomissione o falsificazione del documento

### Cosa Succede Dopo l'Approvazione

- Lo stato della certificazione cambia in **Approvato**.
- Viene impostato un periodo di validità basato sul tipo di certificazione.
- Il profilo dell'animale mostra un badge di certificazione sanitaria.
- Il proprietario riceve una notifica di conferma dell'approvazione.
- La barra di validità diventa attiva nel pannello dettaglio.

---

## Rifiuto di una Certificazione

Per rifiutare una certificazione sanitaria:

1. Apri il pannello dettaglio della certificazione.
2. Identifica il/i problema/i con l'invio.
3. Clicca il pulsante **Rifiuta** in fondo al pannello.
4. Nella finestra di rifiuto:
   - Inserisci un **Motivo del Rifiuto** nell'area di testo. Questo campo è obbligatorio.
   - Sii specifico su cosa deve essere corretto.
5. Clicca **Conferma Rifiuto**.

### Motivi di Rifiuto Comuni

| Motivo | Messaggio di Esempio |
|--------|---------------------|
| Documenti illeggibili | "Il documento caricato è troppo sfocato per essere letto. Si prega di caricare una scansione o foto più chiara." |
| Dettagli veterinario mancanti | "Il certificato non include il numero di licenza del veterinario. Si prega di reinviare con le credenziali complete del veterinario." |
| Certificazione scaduta | "Questa certificazione è stata emessa più di 12 mesi fa. Si prega di ottenere e caricare un certificato aggiornato." |
| Informazioni animale non corrispondenti | "Il nome dell'animale sul certificato non corrisponde al nome registrato. Si prega di verificare e reinviare." |
| Documenti incompleti | "È stata caricata solo la pagina 1 di 3. Si prega di caricare tutte le pagine della certificazione." |

### Cosa Succede Dopo il Rifiuto

- Lo stato della certificazione cambia in **Rifiutato**.
- Il motivo del rifiuto viene mostrato al proprietario dell'animale.
- Il proprietario riceve una notifica con il motivo.
- Il proprietario può inviare una nuova certificazione per sostituire quella rifiutata.

> **Suggerimento:** Fornisci sempre feedback attuabile. Di' al proprietario esattamente cosa correggere in modo che possa risolvere il problema con un solo reinvio.

---

## Revoca di una Certificazione

La revoca viene utilizzata quando una certificazione precedentemente approvata risulta invalida, fraudolenta o non più applicabile.

1. Naviga alla certificazione (filtra per Stato: Approvato se necessario).
2. Apri il pannello dettaglio.
3. Clicca il pulsante **Revoca** (visibile solo per le certificazioni Approvate).
4. Nella finestra di revoca:
   - Inserisci il **Motivo della Revoca**. Questo campo è obbligatorio.
   - Riconosci che questa azione è immediata e non può essere annullata.
5. Clicca **Conferma Revoca**.

### Quando Revocare

- Documentazione fraudolenta scoperta dopo l'approvazione
- Licenza veterinaria risultata invalida o revocata
- Il proprietario dell'animale segnala che la certificazione è stata inviata per errore
- Un'autorità regolatoria segnala la certificazione

### Cosa Succede Dopo la Revoca

- Il badge di certificazione sanitaria viene immediatamente rimosso dal profilo dell'animale.
- Lo stato della certificazione cambia in **Revocato**.
- Il motivo della revoca viene memorizzato e visibile nel pannello dettaglio.
- Il proprietario viene notificato via email e notifica in-app.
- Il proprietario deve inviare una nuova certificazione se desidera ripristinare il badge.

> **Suggerimento:** La revoca è un'azione seria che influisce sui segnali di fiducia dell'animale sulla piattaforma. Assicurati di avere prove sufficienti prima di procedere.

---

## Comprensione di Validità e Scadenza

Le certificazioni sanitarie hanno un periodo di validità definito che determina per quanto tempo la certificazione rimane attiva dopo l'approvazione.

### Come Funziona la Validità

1. Quando una certificazione viene approvata, il sistema calcola una data di scadenza.
2. Il periodo di validità dipende dal tipo di certificazione:
   - Certificato sanitario generale: 12 mesi
   - Certificato vaccinale: Varia in base al programma vaccinale
   - Certificato di idoneità alla riproduzione: 6 mesi
3. La **Barra di Validità** nel pannello dettaglio mostra visivamente il tempo rimanente.

### Notifiche di Scadenza

Il sistema invia notifiche automatiche all'avvicinarsi della scadenza:

| Giorni Prima della Scadenza | Notifica |
|----------------------------|----------|
| 30 giorni | Primo promemoria al proprietario per il rinnovo |
| 14 giorni | Secondo promemoria con urgenza |
| 7 giorni | Avviso finale |
| 0 giorni | Notifica di certificazione scaduta |

### Dopo la Scadenza

- Lo stato della certificazione cambia automaticamente in **Scaduto**.
- Il badge sanitario viene rimosso dal profilo dell'animale.
- La certificazione scaduta rimane nello storico come riferimento.
- Il proprietario può inviare una nuova certificazione in qualsiasi momento.

> **Suggerimento:** Monitora la tabella certificazioni filtrata per "Approvato" e ordinata per data di scadenza per identificare proattivamente le certificazioni in scadenza nella tua regione.

---

## Azioni in Blocco

Per un'elaborazione efficiente di più certificazioni:

1. Usa le caselle di controllo sul lato sinistro della tabella per selezionare più righe.
2. La barra azioni in blocco appare in cima alla tabella.
3. Azioni in blocco disponibili:
   - **Approva Tutto** -- Approva tutte le certificazioni in sospeso selezionate con scadenza predefinita.
   - **Esporta** -- Scarica le certificazioni selezionate come report CSV.

> **Suggerimento:** L'approvazione in blocco dovrebbe essere utilizzata solo quando hai verificato individualmente i documenti di ogni certificazione selezionata. Non approvare mai in blocco senza aver revisionato i documenti.

---

## Domande Frequenti

**D: Posso modificare la data di scadenza di una certificazione approvata?**
R: No. Per cambiare la scadenza, devi revocare la certificazione attuale e chiedere al proprietario di reinviare.

**D: Cosa fare se un documento di certificazione è in una lingua che non posso leggere?**
R: Escala a un admin che legge quella lingua, oppure richiedi al proprietario di fornire una traduzione certificata.

**D: Un animale può avere più certificazioni attive?**
R: Sì. Un animale può avere sia un certificato sanitario generale che certificati vaccinali specifici attivi simultaneamente.

**D: Chi riceve le notifiche di rifiuto/revoca?**
R: Il proprietario registrato dell'animale riceve tutte le notifiche via email e messaggistica in-app.
