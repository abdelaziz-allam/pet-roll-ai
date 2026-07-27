# Dashboard

La Dashboard è la prima schermata visualizzata dopo l'accesso al Portale Admin di Petfolioo. Fornisce una panoramica in tempo reale della salute della piattaforma attraverso indicatori chiave di prestazione (KPI), grafici interattivi e feed delle attività recenti. Utilizza la dashboard per monitorare le tendenze di crescita, identificare aree che richiedono attenzione e tracciare il coinvolgimento sulla piattaforma a colpo d'occhio.

![Dashboard](/docs/screenshots/dashboard.png)

---

## Card KPI

In cima alla dashboard, quattro card riepilogative mostrano le metriche più importanti della piattaforma. Ogni card mostra il totale attuale e un indicatore di variazione percentuale rispetto al periodo precedente.

### Definizione delle Card

| Card | Metrica | Descrizione |
|------|---------|-------------|
| Utenti Totali | Conteggio degli utenti registrati | Tutti gli utenti che hanno creato un account sulla piattaforma |
| Animali Totali | Conteggio degli animali registrati | Tutti gli animali aggiunti al registro indipendentemente dallo stato |
| Verifiche in Sospeso | Elementi in attesa di revisione | Richieste di verifica non ancora approvate o rifiutate |
| Annunci Attivi | Annunci attualmente visibili | Animali contrassegnati come disponibili per allevamento o adozione |

### Percentuale di Crescita

Ogni card KPI include un indicatore di crescita:

- Una **freccia verde verso l'alto** con percentuale indica crescita rispetto al periodo precedente.
- Una **freccia rossa verso il basso** con percentuale indica un calo rispetto al periodo precedente.
- Il periodo di confronto corrisponde all'intervallo temporale selezionato (vedi Selettore Intervallo Temporale di seguito).

> **Suggerimento:** Passa il mouse sopra una card KPI per vedere i numeri esatti dei periodi attuale e precedente in un tooltip.

### Lettura delle Card

1. Il **numero grande** è il conteggio totale attuale.
2. Il **badge percentuale** sottostante mostra la variazione periodo su periodo.
3. L'**etichetta** in alto identifica quale metrica è visualizzata.
4. Clicca qualsiasi card per navigare direttamente al modulo corrispondente (es. cliccando "Utenti Totali" si apre la lista Utenti).

---

## Selettore Intervallo Temporale

Il selettore dell'intervallo temporale controlla la finestra dati per tutte le analytics della dashboard e i confronti KPI.

### Intervalli Disponibili

| Opzione | Periodo | Confronto Con |
|---------|---------|---------------|
| 7g | Ultimi 7 giorni | 7 giorni precedenti |
| 30g | Ultimi 30 giorni | 30 giorni precedenti |
| 90g | Ultimi 90 giorni | 90 giorni precedenti |
| Tutto il Periodo | Dal lancio della piattaforma | Nessun confronto (percentuale di crescita nascosta) |

### Come Cambiare l'Intervallo Temporale

1. Individua il **selettore dell'intervallo temporale** nell'area in alto a destra della dashboard, sopra le card KPI.
2. Clicca su uno dei pulsanti del periodo: **7g**, **30g**, **90g**, o **Tutto il Periodo**.
3. L'intera dashboard si aggiornerà per riflettere il periodo selezionato.
4. Le percentuali di crescita KPI verranno ricalcolate in base alla nuova finestra di confronto.

> **Nota:** L'opzione "Tutto il Periodo" nasconde le percentuali di crescita poiché non c'è un periodo precedente con cui confrontare.

---

## Sezione Analytics Animali

Sotto le card KPI, la sezione Analytics Animali presenta suddivisioni visive dei dati del registro animali. Tre tipi di grafici forniscono prospettive diverse sulla popolazione animale.

### Distribuzione per Specie (Grafico a Torta)

Il grafico a torta mostra la ripartizione proporzionale degli animali per specie.

| Elemento | Descrizione |
|----------|-------------|
| Tipo di grafico | Grafico a ciambella/torta |
| Fonte dati | Tutti gli animali registrati raggruppati per specie |
| Segmenti | Un segmento per specie (es. Cane, Gatto, Uccello, Coniglio, Rettile) |
| Etichette | Nome della specie e conteggio visualizzati al passaggio del mouse |
| Legenda | Legenda con codice colore sotto o accanto al grafico |

**Interazione con il Grafico a Torta:**

1. Passa il mouse su qualsiasi segmento per vedere il conteggio esatto e la percentuale per quella specie.
2. Clicca un segmento per filtrare gli altri grafici della dashboard solo per quella specie.
3. Le voci della legenda sono cliccabili - clicca il nome di una specie per attivarne/disattivarne la visibilità nel grafico.

### Distribuzione per Genere (Grafico a Barre)

Il grafico a barre verticali mostra la distribuzione degli animali per genere.

| Elemento | Descrizione |
|----------|-------------|
| Tipo di grafico | Grafico a barre verticali |
| Asse X | Categorie di genere (Maschio, Femmina, Sconosciuto) |
| Asse Y | Conteggio animali |
| Barre | Una barra per genere, con codice colore |
| Etichette | Conteggio visualizzato sopra ogni barra |

**Lettura del Grafico per Genere:**

1. Ogni barra rappresenta una categoria di genere.
2. L'altezza della barra corrisponde al numero totale di animali di quel genere.
3. Il conteggio esatto è visualizzato come etichetta sopra ogni barra.
4. Passa il mouse per dettagli aggiuntivi inclusa la percentuale sul totale.

### Distribuzione per Paese (Grafico a Barre Orizzontali)

Il grafico a barre orizzontali classifica i paesi per numero di animali registrati.

| Elemento | Descrizione |
|----------|-------------|
| Tipo di grafico | Grafico a barre orizzontali |
| Asse Y | Nomi dei paesi (ordinati per conteggio, decrescente) |
| Asse X | Conteggio animali |
| Barre | Una barra orizzontale per paese |
| Visualizzazione | I primi 10 paesi mostrati per impostazione predefinita |

**Lettura del Grafico per Paese:**

1. I paesi sono ordinati dal maggior numero di animali (in alto) al minore (in basso).
2. Per impostazione predefinita, vengono mostrati solo i primi 10 paesi.
3. Passa il mouse su una barra per vedere il conteggio esatto e la percentuale sul totale.
4. La lunghezza della barra è proporzionale al conteggio rispetto agli altri paesi.

---

## Filtri Geografici e per Specie

Sopra i grafici analytics, i controlli filtro permettono di restringere i dati visualizzati.

### Filtri Disponibili

| Filtro | Tipo | Opzioni |
|--------|------|---------|
| Specie | Menu a tendina | Tutte le specie disponibili sulla piattaforma (es. Cane, Gatto, Uccello, ecc.) |
| Paese | Menu a tendina | Tutti i paesi con animali registrati |

### Applicazione dei Filtri

1. Clicca il menu a tendina **Specie** per selezionare una specie specifica.
2. Clicca il menu a tendina **Paese** per selezionare un paese specifico.
3. I grafici e le tabelle sottostanti si aggiorneranno immediatamente per riflettere il filtro.
4. I filtri possono essere combinati - seleziona sia una specie che un paese per restringere ulteriormente i risultati.
5. Per reimpostare, seleziona "Tutti" da ogni menu a tendina o clicca il pulsante **Reimposta Filtri**.

> **Suggerimento:** Usa il filtro per specie nella vista grafico a torta per approfondire le distribuzioni delle razze all'interno di una singola specie.

### Comportamento dei Filtri

| Scenario | Effetto |
|----------|---------|
| Nessun filtro selezionato | Tutti i dati visualizzati globalmente |
| Solo specie selezionata | I grafici mostrano i dati per quella specie in tutti i paesi |
| Solo paese selezionato | I grafici mostrano i dati per tutte le specie in quel paese |
| Entrambi selezionati | I grafici mostrano i dati per la specie selezionata nel paese selezionato |

---

## Tabella Registrazioni Utenti Recenti

Sotto i grafici analytics, una tabella mostra le registrazioni utenti più recenti sulla piattaforma.

### Colonne della Tabella

| Colonna | Descrizione |
|---------|-------------|
| Avatar | Miniatura della foto profilo utente |
| Nome | Nome visualizzato dell'utente |
| Email | Indirizzo email registrato dell'utente |
| Data di Iscrizione | Data e ora di creazione dell'account |
| Stato | Stato dell'account (Attivo, In Sospeso, Bannato) |
| Animali | Numero di animali registrati da questo utente |

### Funzionalità della Tabella

1. **Ordinamento** - Clicca l'intestazione di qualsiasi colonna per ordinare per quella colonna. Clicca di nuovo per invertire l'ordine.
2. **Paginazione** - La tabella mostra 10 voci per pagina per impostazione predefinita. Usa i controlli di paginazione in basso per navigare.
3. **Azioni Rapide** - Passa il mouse su una riga per rivelare un pulsante "Visualizza" che apre il pannello dettaglio utente.

### Comprensione degli Indicatori di Stato

| Stato | Colore Badge | Significato |
|-------|-------------|---------|
| Attivo | Verde | L'account è in regola e pienamente funzionante |
| In Sospeso | Arancione | Account creato ma email non ancora verificata |
| Bannato | Rosso | L'account è stato sospeso da un amministratore |

> **Nota:** La tabella delle registrazioni recenti mostra sempre gli utenti più nuovi per primi, indipendentemente dall'impostazione del selettore dell'intervallo temporale. Visualizza le registrazioni degli ultimi 30 giorni.

---

## Best Practice per la Dashboard

### Checklist di Monitoraggio Giornaliero

1. Controlla la card KPI **Verifiche in Sospeso** - un numero elevato potrebbe indicare un arretrato.
2. Rivedi le **percentuali di crescita** su tutte e quattro le card per cali inattesi.
3. Esamina la tabella **Registrazioni Utenti Recenti** per account sospetti.
4. Nota eventuali spostamenti significativi nel grafico **Distribuzione per Paese**.

### Interpretazione delle Tendenze

| Tendenza | Possibile Significato | Azione Consigliata |
|----------|----------------------|-------------------|
| Picco improvviso nelle registrazioni | Successo di una campagna marketing o attività bot | Controlla gli utenti recenti per pattern sospetti |
| Calo degli annunci attivi | Cambio stagionale o problema di policy | Rivedi le azioni di ban recenti e le scadenze degli annunci |
| Verifiche in sospeso elevate | Moderazione sottodimensionata | Assegna moderatori aggiuntivi |
| Spostamento nell'equilibrio delle specie | Tendenza regionale o errore di configurazione categorie | Rivedi le impostazioni delle categorie |

---

## Prestazioni della Dashboard

La dashboard carica i dati in modo asincrono. Ogni sezione si carica indipendentemente:

1. Le **card KPI** si caricano per prime (query più veloce).
2. I **grafici** si caricano successivamente con un breve spinner di caricamento.
3. La **tabella registrazioni recenti** si carica per ultima.

Se una sezione mostra un errore di caricamento:

1. Verifica la connessione internet.
2. Prova ad aggiornare la pagina.
3. Se l'errore persiste, il servizio backend potrebbe avere problemi.

> **Suggerimento:** La dashboard si aggiorna automaticamente ogni 5 minuti. Puoi aggiornare manualmente cliccando l'icona di aggiornamento nell'intestazione o premendo `F5`.

---

*Precedente: [Guida Introduttiva](./getting-started.md) | Successivo: [Registro Animali](./pets.md)*
