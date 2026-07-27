# Mercato Riproduzione

Il modulo Mercato Riproduzione fornisce agli amministratori la supervisione del sistema di matchmaking per l'allevamento della piattaforma. Monitora le richieste di accoppiamento, traccia gli abbinamenti riusciti e visualizza le classifiche delle prestazioni degli allevatori.

![Mating Management](/docs/screenshots/mating.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete, Moderate |
> | Admin | View, Edit, Delete, Moderate |
> | Moderator | View, Moderate |
> | Viewer | View only |

---

## Schede di Navigazione

La pagina del Mercato Riproduzione è organizzata in due schede principali:

| Scheda | Descrizione |
|--------|-------------|
| Abbinamenti e Richieste | Visualizza e gestisci tutti gli abbinamenti e le richieste in sospeso |
| Classifiche Allevatori | Classifiche che mostrano gli allevatori con le migliori prestazioni |

Passa da una scheda all'altra cliccando l'intestazione della scheda in cima alla pagina.

---

## Scheda Abbinamenti e Richieste

Questa scheda mostra tutti gli abbinamenti come card visive, fornendo una panoramica intuitiva dell'attività di allevamento sulla piattaforma.

### Card Abbinamento

Ogni abbinamento è rappresentato come una card che mostra due animali collegati da un connettore visivo a cuore.

#### Layout della Card

```
+------------------------------------------+
|  [Foto Animale A]  <3  [Foto Animale B] |
|  Nome Animale A        Nome Animale B    |
|  Razza                 Razza             |
|  Proprietario          Proprietario      |
|                                          |
|  Stato: [Badge]     Inserito: [Data]    |
|  Specie: [Tag]      Posizione: [Città] |
+------------------------------------------+
```

#### Informazioni della Card

| Elemento | Descrizione |
|----------|-------------|
| Foto Animali | Foto profilo di entrambi gli animali nell'abbinamento |
| Connettore Cuore | Collegamento visivo tra i due animali (animato per abbinamenti attivi) |
| Nomi Animali | Nomi di entrambi gli animali |
| Razze | Informazioni sulla razza per ogni animale |
| Proprietari | Nomi dei proprietari (cliccabili per visualizzare i profili) |
| Badge Stato | Stato attuale dell'abbinamento |
| Data Inserimento | Quando la richiesta di abbinamento è stata creata |
| Tag Specie | Specie degli animali |
| Posizione | Città/paese dell'annuncio |

### Stati dell'Abbinamento

| Stato | Colore Badge | Descrizione |
|-------|-------------|-------------|
| In Sospeso | Arancione | Richiesta di abbinamento inviata, in attesa di risposta |
| Accettato | Verde | Entrambe le parti hanno accettato l'abbinamento |
| Rifiutato | Rosso | Una parte ha rifiutato l'abbinamento |
| Completato | Blu | Accoppiamento confermato come completato |
| Annullato | Grigio | L'abbinamento è stato annullato da una delle parti |
| Scaduto | Grigio Chiaro | La richiesta è scaduta senza risposta |

---

## Filtri

La barra filtri permette di restringere gli abbinamenti visualizzati.

### Filtro Stato

Seleziona uno o più stati da visualizzare:

1. Clicca il menu a tendina **Stato**.
2. Seleziona gli stati che vuoi vedere.
3. La griglia delle card si aggiorna immediatamente.

### Filtro Specie

Filtra gli abbinamenti per specie:

- Tutte le Specie (predefinito)
- Cane
- Gatto
- Uccello
- Coniglio
- Altro

### Filtro Paese

Seleziona uno o più paesi per filtrare per posizione dell'abbinamento.

### Filtro Città

Restringi ulteriormente selezionando città specifiche.

> **Suggerimento:** Usa Stato: Accettato + il tuo paese per vedere gli abbinamenti riusciti nella tua regione che potrebbero necessitare dell'azione "Invia Biglietto di Auguri".

---

## Pannello Dettaglio

Clicca qualsiasi card di abbinamento per aprire il pannello dettaglio sul lato destro dello schermo.

### Sezione Foto Animali

In cima al pannello, versioni più grandi delle foto di entrambi gli animali sono mostrate affiancate con il connettore a cuore tra loro.

- Clicca una delle foto per visualizzarla a dimensione piena.
- Scorri tra le foto aggiuntive se l'animale ha una galleria.

### Informazioni Annuncio

| Campo | Descrizione |
|-------|-------------|
| ID Annuncio | Identificatore univoco dell'annuncio di abbinamento |
| Creato Da | Quale proprietario ha pubblicato l'annuncio |
| Data Creazione | Data in cui l'annuncio è stato pubblicato per la prima volta |
| Data Abbinamento | Data in cui l'abbinamento è stato proposto |
| Data Risposta | Data in cui l'abbinamento è stato accettato/rifiutato (se applicabile) |
| Specie | Specie di entrambi gli animali |
| Razze | Informazioni dettagliate sulla razza |
| Posizione | Dettagli completi della posizione |
| Note | Eventuali note del proprietario dell'annuncio |

### Timeline dell'Abbinamento

Il pannello include una timeline cronologica degli eventi:

1. **Annuncio Creato** -- Il proprietario ha pubblicato l'annuncio di accoppiamento del suo animale
2. **Abbinamento Proposto** -- L'algoritmo di matching o la richiesta manuale ha avviato l'abbinamento
3. **Abbinamento Visualizzato** -- L'altra parte ha visualizzato la proposta di abbinamento
4. **Risposta Data** -- Accettazione/rifiuto con timestamp
5. **Completamento Registrato** -- Se l'accoppiamento è stato confermato come completato
6. **Biglietto di Auguri Inviato** -- Se l'admin ha inviato una notifica celebrativa

Ogni evento della timeline mostra:

- Data e ora
- Attore (sistema, proprietario A, proprietario B, o admin)
- Descrizione dell'evento
- Note aggiuntive (se presenti)

> **Suggerimento:** La timeline ti aiuta a comprendere il contesto completo di un abbinamento quando indaghi su controversie o problemi segnalati dagli utenti.

---

## Invia Biglietto di Auguri

L'azione "Invia Biglietto di Auguri" permette agli amministratori di inviare una notifica celebrativa a entrambi i proprietari degli animali quando un abbinamento viene accettato o completato.

### Come Inviare un Biglietto di Auguri

1. Apri il pannello dettaglio per un abbinamento **Accettato** o **Completato**.
2. Clicca il pulsante **Invia Biglietto di Auguri** in fondo al pannello.
3. Nella finestra di dialogo:
   - Visualizza l'anteprima del messaggio di notifica (auto-generato con i nomi di entrambi gli animali).
   - Aggiungi opzionalmente un messaggio di congratulazioni personalizzato.
   - Rivedi i destinatari (entrambi i proprietari).
4. Clicca **Invia**.

### Cosa Include il Biglietto di Auguri

- Intestazione di congratulazioni con i nomi di entrambi gli animali
- Foto degli animali disposte con elementi decorativi
- Data e posizione dell'abbinamento
- Messaggio personalizzato dell'admin (se fornito)
- Link alla pagina dettagli dell'abbinamento

### Quando Inviare

- Dopo che un abbinamento è stato accettato e entrambe le parti confermano di procedere.
- Dopo che un abbinamento è stato contrassegnato come completato.
- Solo una volta per abbinamento (il pulsante viene disabilitato dopo l'invio).

> **Suggerimento:** I biglietti di auguri sono uno strumento di coinvolgimento della community. Inviarli per gli abbinamenti accettati incoraggia la partecipazione sulla piattaforma e crea un'esperienza positiva per gli allevatori.

---

## Scheda Classifiche Allevatori

La scheda Classifiche Allevatori mostra gli allevatori più attivi e di successo sulla piattaforma.

### Podio Generale Top 10

In cima alla scheda Classifiche, una visualizzazione a podio evidenzia i 10 migliori allevatori tra tutte le specie.

#### Layout del Podio

```
              [1°]
        [2°]       [3°]
   [4°]  [5°]  [6°]  [7°]
      [8°]   [9°]   [10°]
```

Ogni posizione del podio mostra:

- Nome dell'allevatore
- Nome dell'allevamento
- Foto profilo
- Conteggio abbinamenti totali
- Percentuale di successo

#### Punteggio del Podio

Gli allevatori sono classificati con un punteggio composito basato su:

| Fattore | Peso | Descrizione |
|---------|------|-------------|
| Abbinamenti Totali | 30% | Numero di abbinamenti avviati o ricevuti |
| Percentuale Successo | 40% | Percentuale di abbinamenti che hanno raggiunto Accettato/Completato |
| Annunci Attivi | 15% | Numero di annunci di accoppiamento attualmente attivi |
| Tempo di Risposta | 15% | Tempo medio per rispondere alle proposte di abbinamento |

### Griglia Top 10 per Specie

Sotto il podio generale, una griglia mostra i 10 migliori allevatori per ogni specie separatamente.

#### Layout della Griglia

Ogni specie ha la propria card:

```
+-------------------+  +-------------------+  +-------------------+
|   Cani Top 10     |  |   Gatti Top 10    |  |  Uccelli Top 10  |
| 1. Nome Allevat.  |  | 1. Nome Allevat.  |  | 1. Nome Allevat.  |
| 2. Nome Allevat.  |  | 2. Nome Allevat.  |  | 2. Nome Allevat.  |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Ogni voce nella griglia per specie mostra:

- Numero di posizione
- Nome dell'allevatore
- Nome dell'allevamento
- Conteggio abbinamenti per quella specie
- Percentuale di successo per quella specie

> **Suggerimento:** Le classifiche per specie aiutano a identificare allevatori specialisti che potrebbero essere ottimi candidati per partnership con la piattaforma o annunci in evidenza.

---

## Tabella Classifiche Ordinabile

Sotto le classifiche visive, una tabella dati completa fornisce statistiche dettagliate sugli allevatori.

### Colonne della Tabella

| Colonna | Ordinabile | Descrizione |
|---------|:----------:|-------------|
| Posizione | Sì | Posizione attuale basata sul punteggio predefinito |
| Nome Allevatore | Sì | Nome completo dell'allevatore |
| Allevamento | Sì | Nome dell'allevamento |
| Abbinamenti | Sì | Numero totale di abbinamenti (avviati + ricevuti) |
| Annunci | Sì | Numero di annunci di accoppiamento creati |
| Percentuale Successo | Sì | Percentuale di abbinamenti che raggiungono lo stato Accettato/Completato |
| Visualizzazioni | Sì | Visualizzazioni totali sui loro annunci di accoppiamento |
| Specie | No | Specie principale che allevano |
| Posizione | No | Paese e città |

### Ordinamento della Tabella

1. Clicca l'intestazione di qualsiasi colonna ordinabile per ordinare in modo ascendente.
2. Clicca di nuovo per ordinare in modo discendente.
3. Un terzo clic rimuove l'ordinamento su quella colonna.
4. Puoi ordinare per più colonne (tieni premuto Shift e clicca).

### Interazioni della Tabella

- Clicca la riga di un allevatore per visualizzare il suo profilo completo e lo storico abbinamenti.
- Usa la barra di ricerca sopra la tabella per trovare un allevatore specifico.
- Esporta i dati della tabella usando il pulsante **Esporta CSV**.

> **Suggerimento:** Ordina per Percentuale Successo discendente per identificare gli allevatori che producono costantemente abbinamenti riusciti. Questi allevatori potrebbero beneficiare di funzionalità premium o di una verifica accelerata.

---

## Comprensione delle Metriche di Abbinamento

### Calcolo della Percentuale di Successo

```
Percentuale Successo = (Abbinamenti Accettati + Completati) / Abbinamenti Totali x 100
```

- Solo gli abbinamenti in cui l'allevatore era il proprietario dell'annuncio contano per la sua percentuale di successo.
- Gli abbinamenti rifiutati e scaduti riducono la percentuale di successo.
- Gli abbinamenti annullati sono esclusi dal calcolo.

### Metrica Visualizzazioni

Il conteggio Visualizzazioni rappresenta:

- Visualizzazioni uniche totali su tutti gli annunci di accoppiamento attivi dell'allevatore.
- Non conta le visualizzazioni dell'allevatore stesso.
- Si resetta per annuncio (non cumulativo tra annunci eliminati).

### Punteggio Attività

La classifica generale considera la recenza:

- Gli abbinamenti degli ultimi 90 giorni hanno peso 2x.
- Gli abbinamenti da 90-180 giorni hanno peso 1x.
- Gli abbinamenti più vecchi di 180 giorni hanno peso 0,5x.

> **Suggerimento:** Un allevatore con molte visualizzazioni ma bassa percentuale di successo potrebbe avere annunci attraenti ma essere troppo selettivo o lento nel rispondere. Considera di contattarlo per comprendere la sua esperienza.

---

## Domande Frequenti

**D: Posso creare manualmente un abbinamento tra due animali?**
R: No. Gli abbinamenti vengono creati dai proprietari degli animali tramite l'app. Gli amministratori possono solo monitorare e intraprendere azioni sugli abbinamenti esistenti.

**D: Cosa succede ai dati dell'abbinamento quando un animale viene eliminato?**
R: Il record dell'abbinamento viene mantenuto per scopi storici ma contrassegnato con un indicatore "Animale Rimosso". L'abbinamento non può proseguire ulteriormente.

**D: Posso rimuovere un allevatore dalle classifiche?**
R: Le classifiche vengono calcolate automaticamente. Per rimuovere un allevatore, il suo account deve essere sospeso o la sua verifica revocata, il che lo esclude dalle classifiche.

**D: Quanto spesso vengono aggiornate le classifiche?**
R: Le classifiche vengono ricalcolate ogni 24 ore. Il timestamp dell'ultimo aggiornamento è mostrato in cima alla scheda Classifiche.

**D: Posso inviare un Biglietto di Auguri per un abbinamento rifiutato?**
R: No. Il pulsante Invia Biglietto di Auguri è disponibile solo per abbinamenti con stato Accettato o Completato.

**D: Cosa succede se entrambi gli animali in un abbinamento sono dello stesso proprietario?**
R: Il sistema impedisce abbinamenti tra animali dello stesso proprietario. Se ne vedi uno, indica un problema di integrità dei dati che dovrebbe essere segnalato al team di sviluppo.
