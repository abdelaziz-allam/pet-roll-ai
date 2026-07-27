# Analytics

La pagina Analytics fornisce informazioni visive sull'utilizzo della piattaforma, la crescita degli utenti, i dati demografici degli animali e l'attività sanitaria. Usa questi grafici per comprendere le tendenze, misurare il coinvolgimento e prendere decisioni basate sui dati riguardo la piattaforma Petfolioo.

![Analytics](/docs/screenshots/analytics.png)

---

## Panoramica

La dashboard Analytics presenta quattro visualizzazioni principali insieme a un selettore di intervallo temporale che controlla la finestra dati per tutti i grafici. Ogni grafico si aggiorna dinamicamente quando cambi l'intervallo temporale selezionato.

---

## Accesso alle Analytics

1. Clicca **Analytics** nel menu di navigazione laterale.
2. La dashboard si carica con tutti i grafici visualizzati su una singola pagina scorrevole.
3. L'intervallo temporale predefinito è **30 giorni**.

---

## Selettore Intervallo Temporale

In cima alla pagina Analytics, un selettore di intervallo temporale ti consente di controllare il periodo dei dati visualizzati in tutti i grafici.

### Intervalli Disponibili

| Opzione | Periodo | Ideale Per |
|---------|---------|------------|
| **7g** | Ultimi 7 giorni | Monitorare l'attività recente e le tendenze a breve termine |
| **30g** | Ultimi 30 giorni | Reportistica mensile e analisi generale delle tendenze (predefinito) |
| **90g** | Ultimi 90 giorni | Revisioni trimestrali e identificazione di pattern a medio termine |
| **1 Anno** | Ultimi 365 giorni | Revisioni annuali, pattern stagionali e crescita a lungo termine |

### Cambio dell'Intervallo Temporale

1. Individua il selettore dell'intervallo temporale in cima alla pagina.
2. Clicca su uno dei pulsanti intervallo: **7g**, **30g**, **90g**, o **1 Anno**.
3. Il pulsante selezionato diventa evidenziato per indicare l'intervallo attivo.
4. Tutti i grafici sulla pagina si aggiornano per visualizzare i dati del periodo scelto.
5. Gli assi e le etichette dei grafici si adattano automaticamente alla nuova finestra temporale.

> **Suggerimento:** Inizia con 30g per una panoramica generale, poi restringi a 7g per indagare anomalie recenti o espandi a 1 Anno per reportistica a livello dirigenziale.

---

## Grafico Crescita Utenti

### Tipo di Grafico

Grafico a linee che mostra le tendenze di registrazione utenti nel tempo.

### Cosa Mostra

Il grafico Crescita Utenti visualizza il numero di nuove registrazioni utente tracciate nel periodo temporale selezionato. Ogni punto dati rappresenta il conteggio cumulativo o giornaliero di nuovi utenti.

### Lettura del Grafico

| Elemento | Descrizione |
|----------|-------------|
| **Asse X** | Tempo (date o settimane a seconda dell'intervallo selezionato) |
| **Asse Y** | Numero di nuove registrazioni utente |
| **Linea** | Una linea continua che collega i punti dati mostrando la traiettoria di crescita |
| **Punti Dati** | Marcatori al passaggio del mouse sulla linea che mostrano i valori esatti |
| **Tooltip** | Appare al passaggio del mouse mostrando la data e il conteggio esatto delle registrazioni |

### Interpretazione dei Dati

1. **Tendenza al rialzo** -- Crescita costante nell'acquisizione utenti. La piattaforma sta attraendo nuovi utenti in modo stabile.
2. **Linea piatta** -- L'acquisizione utenti si è stabilizzata. Considera sforzi marketing o lancio di nuove funzionalità per rilanciare la crescita.
3. **Picchi** -- Aumenti improvvisi possono correlare con campagne marketing, copertura stampa o funzionalità dell'app store.
4. **Cali** -- Diminuzioni nelle registrazioni giornaliere possono indicare pattern stagionali o problemi tecnici.

### Comportamento per Intervallo Temporale

| Intervallo | Granularità Asse X | Note |
|------------|-------------------|------|
| 7g | Giornaliero | Ogni giorno mostrato individualmente |
| 30g | Giornaliero | Ogni giorno mostrato, buono per identificare pattern settimanali |
| 90g | Settimanale | Dati aggregati per settimana per leggibilità |
| 1 Anno | Mensile | Dati aggregati per mese per mostrare la traiettoria annuale |

> **Suggerimento:** Confronta la vista 7g con la vista 30g. Se la tendenza degli ultimi 7 giorni è sopra la media dei 30 giorni, la crescita sta accelerando.

---

## Grafico Distribuzione Specie

### Tipo di Grafico

Grafico a torta (o ciambella) che mostra la proporzione di animali per specie.

### Cosa Mostra

Il grafico Distribuzione Specie suddivide tutti gli animali registrati per la loro categoria di specie, mostrando la proporzione relativa di ciascuna.

### Lettura del Grafico

| Elemento | Descrizione |
|----------|-------------|
| **Fette** | Ogni fetta rappresenta una specie (es. Cane, Gatto, Uccello, Coniglio) |
| **Colori** | Ogni specie ha un colore distinto assegnato per l'identificazione |
| **Etichette** | Nome della specie e percentuale mostrati su o vicino a ogni fetta |
| **Legenda** | Una legenda mappa i colori ai nomi delle specie |
| **Tooltip** | Passa il mouse su una fetta per vedere conteggio esatto e percentuale |

### Interpretazione dei Dati

1. **Specie dominante** -- La fetta più grande indica il tipo di animale principale della tua base utenti. Usa questo per dare priorità alle funzionalità.
2. **Fette piccole** -- Specie con percentuali molto piccole possono indicare opportunità di crescita in segmenti poco serviti.
3. **Equilibrio** -- Una distribuzione approssimativamente uniforme suggerisce un appeal ampio tra i tipi di proprietari di animali.

### Casi d'Uso

- **Prioritizzazione funzionalità** -- Se il 70% degli animali sono cani, dai priorità alle funzionalità specifiche per cani.
- **Pianificazione contenuti** -- Crea contenuti educativi proporzionali alla distribuzione per specie.
- **Targeting marketing** -- Comprendi quali segmenti di pubblico sono i più grandi per le campagne pubblicitarie.
- **Targeting notifiche** -- I segmenti di pubblico nelle Notifiche (Proprietari di Cani, Proprietari di Gatti) correlano direttamente con questo grafico.

> **Suggerimento:** Se noti una specie che cresce più velocemente delle altre nel tempo (confronta 30g vs 1 Anno), considera di investire in funzionalità specifiche per quella specie per capitalizzare la tendenza.

---

## Grafico Razze Popolari

### Tipo di Grafico

Grafico a barre orizzontali che classifica le razze più popolari.

### Cosa Mostra

Il grafico Razze Popolari mostra le razze più registrate sulla piattaforma, classificate per conteggio. Le barre si estendono orizzontalmente, rendendo facile confrontare la popolarità tra le razze.

### Lettura del Grafico

| Elemento | Descrizione |
|----------|-------------|
| **Asse Y** | Nomi delle razze, ordinati dalla più popolare (in alto) alla meno popolare (in basso) |
| **Asse X** | Conteggio di animali registrati di quella razza |
| **Barre** | Barre orizzontali la cui lunghezza rappresenta il numero di animali |
| **Etichette** | Valore del conteggio visualizzato alla fine di ogni barra |
| **Tooltip** | Passa il mouse per conteggio esatto e percentuale sul totale |

### Interpretazione dei Dati

1. **Razze top** -- Le barre più lunghe rappresentano le razze più comuni sulla piattaforma. Questi utenti sono il tuo pubblico principale.
2. **Coda lunga** -- Molte razze con conteggi piccoli indicano interessi utente diversificati.
3. **Concentrazione razze** -- Se poche razze dominano (es. le top 3 rappresentano il 50%+), la piattaforma ha una base utenti concentrata.

### Insight Tipici

| Pattern | Insight | Azione |
|---------|---------|--------|
| Golden Retriever domina | Grande pubblico di cani da famiglia | Dai priorità a funzionalità per razze medie/grandi |
| Gatto Persiano nei top 5 | Forte segmento proprietari gatti | Investi nel monitoraggio salute specifico per gatti |
| Razze esotiche emergenti | Allevatori di nicchia che si uniscono | Considera funzionalità premium specifiche per allevatori |
| Distribuzione uniforme | Base utenti diversificata | Costruisci funzionalità generali piuttosto che specifiche per razza |

### Limiti del Grafico

- Il grafico mostra le **top 10-15 razze** per impostazione predefinita.
- Le razze rimanenti sono raggruppate sotto "Altro" se applicabile.
- Il numero di razze visibili può variare per intervallo temporale.

> **Suggerimento:** Incrocia le razze popolari con i dati dell'attività sanitaria. Se una razza popolare ha bassa attività sanitaria, quegli utenti potrebbero aver bisogno di stimoli al coinvolgimento.

---

## Grafico Attività Sanitaria

### Tipo di Grafico

Grafico a barre raggruppate che mostra le attività sanitarie categorizzate per tipo.

### Cosa Mostra

Il grafico Attività Sanitaria mostra il volume di azioni sanitarie eseguite sulla piattaforma, raggruppate per tipo di attività. Questo ti aiuta a capire quanto attivamente gli utenti utilizzano le funzionalità sanitarie.

### Lettura del Grafico

| Elemento | Descrizione |
|----------|-------------|
| **Asse X** | Periodi temporali (giorni, settimane o mesi a seconda dell'intervallo) |
| **Asse Y** | Conteggio delle attività sanitarie |
| **Gruppi di Barre** | Più barre per periodo temporale, una per ogni tipo di attività |
| **Colori** | Ogni tipo di attività ha un colore distinto |
| **Legenda** | Mappa i colori ai tipi di attività (Vaccinazioni, Controlli, Medicinali, ecc.) |
| **Tooltip** | Passa il mouse per il conteggio esatto per tipo di attività per periodo |

### Tipi di Attività

| Attività | Descrizione | Colore (tipico) |
|----------|-------------|-----------------|
| **Vaccinazioni** | Registri vaccinali creati o aggiornati | Blu |
| **Cartelle Cliniche** | Registri sanitari generali registrati | Verde |
| **Monitoraggio Peso** | Misurazioni del peso registrate | Arancione |
| **Medicinali** | Voci di medicinali aggiunte | Viola |

### Interpretazione dei Dati

1. **Barre vaccinazioni alte** -- Gli utenti stanno attivamente monitorando le vaccinazioni. Il sistema di promemoria sta probabilmente stimolando il coinvolgimento.
2. **Barre cartelle cliniche basse** -- Gli utenti potrebbero non essere a conoscenza della funzionalità cartelle cliniche. Considera prompt in-app.
3. **Pattern stagionali** -- Alcune attività sanitarie hanno picchi stagionali (es. trattamenti antiparassitari in primavera).
4. **Barre in crescita nel tempo** -- L'adozione delle funzionalità sanitarie sta aumentando, indicando un buon coinvolgimento degli utenti.
5. **Barre in calo** -- Gli utenti potrebbero perdere interesse o incontrare frizioni nella registrazione dei dati sanitari.

### Confronto tra Tipi di Attività

Il formato raggruppato ti permette di confrontare visivamente:

- Quali funzionalità sanitarie sono più usate vs. sottoutilizzate.
- Se un tipo di attività cresce mentre altri calano.
- Come diversi intervalli temporali rivelano pattern diversi.

> **Suggerimento:** Se l'attività vaccinazioni è alta ma il monitoraggio sanitario è basso, considera di aggiungere prompt cross-funzionalità: "Hai registrato una vaccinazione -- vuoi anche registrare il peso di Rex?"

---

## Layout della Dashboard

I quattro grafici sono disposti nella pagina Analytics in un layout a griglia:

```
+---------------------------+---------------------------+
|                           |                           |
|    Crescita Utenti        |    Distribuzione Specie   |
|    (Grafico a Linee)      |    (Grafico a Torta)      |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Razze Popolari         |    Attività Sanitaria     |
|    (Barre Orizzontali)    |    (Barre Raggruppate)    |
|                           |                           |
+---------------------------+---------------------------+
```

Ogni grafico occupa una card con:
- Un'intestazione con titolo
- La visualizzazione del grafico
- Tooltip interattivi al passaggio del mouse
- Dimensionamento responsive che si adatta alla larghezza dello schermo

---

## Interazione con i Grafici

### Tooltip al Passaggio del Mouse

1. Muovi il cursore su qualsiasi punto dati, barra o fetta del grafico.
2. Appare un tooltip che mostra:
   - Il valore esatto
   - L'etichetta (data, nome razza, specie, ecc.)
   - Percentuale dove applicabile

### Comportamento Responsive

1. Su schermi più grandi, i grafici vengono visualizzati in una griglia 2x2.
2. Su schermi più piccoli, i grafici si impilano verticalmente per leggibilità.
3. Gli elementi del grafico si ridimensionano proporzionalmente.

### Aggiornamento Dati

1. I dati analytics vengono aggiornati quando la pagina si carica.
2. Cambiare l'intervallo temporale attiva un nuovo recupero dati.
3. Non c'è aggiornamento automatico -- ricarica la pagina manualmente per i dati più recenti.

---

## Flussi di Lavoro Analytics Comuni

### Reportistica Mensile

1. Seleziona l'intervallo temporale **30g**.
2. Nota la tendenza Crescita Utenti (in salita, piatta o in calo).
3. Controlla la Distribuzione Specie per eventuali spostamenti.
4. Rivedi le Razze Popolari per tendenze emergenti.
5. Esamina l'Attività Sanitaria per i livelli di coinvolgimento.
6. Cattura lo schermo o esporta i dati per i report.

### Indagine su un Calo

1. Inizia con **30g** per identificare quando il calo si è verificato.
2. Passa a **7g** per esaminare il periodo più recente in dettaglio.
3. Verifica se il calo correla con:
   - Un problema di sistema (controlla Impostazioni > storico Modalità Manutenzione)
   - Una notifica inviata (controlla storico Notifiche)
   - Un pattern stagionale (confronta con vista 1 Anno)

### Revisione Trimestrale

1. Seleziona l'intervallo temporale **90g**.
2. Confronta la traiettoria di crescita con i trimestri precedenti.
3. Identifica quali attività sanitarie sono cresciute di più.
4. Nota eventuali nuove razze che appaiono nel grafico Razze Popolari.
5. Usa la Distribuzione Specie per validare l'allineamento della strategia marketing.

### Pianificazione Annuale

1. Seleziona l'intervallo temporale **1 Anno**.
2. Identifica i pattern stagionali nella Crescita Utenti (es. picchi festivi).
3. Monitora i cambiamenti nella popolarità delle razze anno su anno.
4. Misura l'adozione delle funzionalità sanitarie nell'intero anno.
5. Usa gli insight per informare la roadmap del prodotto.

---

## Comprensione della Freschezza dei Dati

| Aspetto | Dettaglio |
|---------|----------|
| Fonte dati | Database della piattaforma (aggregato) |
| Frequenza aggiornamento | In tempo reale al caricamento pagina |
| Accuratezza storica | Completa fino al lancio della piattaforma |
| Fuso orario | Ora del server (UTC) |
| Dati mancanti | Le lacune sono mostrate come valori zero, non interpolate |

---

## Risoluzione Problemi

| Problema | Soluzione |
|----------|----------|
| I grafici non si caricano | Verifica la connessione di rete. Aggiorna la pagina. |
| I dati appaiono obsoleti | Le analytics si caricano alla visita della pagina. Naviga altrove e torna, o aggiorna. |
| Valori zero per tutte le metriche | Verifica che l'intervallo temporale selezionato abbia dati. Prova a espandere a 1 Anno. |
| I tooltip dei grafici non appaiono | Prova un browser diverso. Assicurati che JavaScript sia abilitato. |
| L'intervallo temporale non cambia | Clicca direttamente sul pulsante dell'intervallo. Se non risponde, aggiorna la pagina. |
| Impossibile accedere alle Analytics | Verifica che il tuo ruolo e i permessi includano l'accesso alla pagina Analytics. |

---

## Pagine Correlate

- [Impostazioni](./settings.md) -- Configura le impostazioni della piattaforma che influenzano il comportamento degli utenti
- [Notifiche](./notifications.md) -- Invia notifiche che possono influenzare le metriche di coinvolgimento
- [Feedback](./feedback.md) -- Correla il feedback degli utenti con le tendenze analytics
- [Utenti Admin](./admin-users.md) -- Concedi l'accesso analytics ai membri del team
