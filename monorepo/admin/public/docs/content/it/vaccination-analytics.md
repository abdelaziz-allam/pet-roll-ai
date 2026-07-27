# Analytics Vaccinazioni

Il modulo Analytics Vaccinazioni fornisce agli amministratori informazioni sulle tendenze vaccinali attraverso la piattaforma. Usa questa dashboard per capire quali vaccini sono più comunemente somministrati, identificare pattern regionali e monitorare la copertura vaccinale complessiva.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Export |
> | Admin | View, Export |
> | Moderator | View |
> | Viewer | View only |

---

## Panoramica della Dashboard

La pagina Analytics Vaccinazioni è organizzata nelle seguenti sezioni:

1. **Statistiche Riepilogative** -- Metriche chiave in cima alla pagina
2. **Classifica Top 20 Vaccini** -- Lista classificata dei vaccini più utilizzati
3. **Visualizzazione Podio** -- Evidenziazione dei 3 vaccini principali
4. **Suddivisione per Vaccino** -- Distribuzione per specie per ogni vaccino
5. **Posizioni Principali** -- Distribuzione geografica per vaccino

---

## Statistiche Riepilogative

In cima alla pagina analytics, tre card statistiche mostrano metriche aggregate:

| Card Statistica | Descrizione | Icona |
|-----------------|-------------|-------|
| Vaccinazioni Totali | Numero totale di registri vaccinali tra tutti gli animali | Siringa |
| Vaccini Unici | Numero di tipi di vaccino distinti somministrati | Provetta |
| Animali Vaccinati | Numero di animali unici con almeno una vaccinazione | Zampa |

### Lettura delle Statistiche

- **Vaccinazioni Totali** conta gli eventi vaccinali individuali (un animale che riceve un vaccino = 1 conteggio).
- **Vaccini Unici** mostra la varietà di vaccini nel sistema (es. Antirabbica, DHPP, FVRCP contano ciascuno come 1).
- **Animali Vaccinati** è deduplicato -- un animale con 5 vaccinazioni conta comunque come 1 animale.

> **Suggerimento:** Confronta Vaccinazioni Totali con Animali Vaccinati per capire il numero medio di vaccinazioni per animale sulla piattaforma.

---

## Filtri

La barra filtri si applica a tutte le sezioni della pagina analytics simultaneamente.

### Filtro Periodo Temporale

Seleziona un intervallo temporale per i dati:

| Opzione | Descrizione |
|---------|-------------|
| Ultimi 7 giorni | Settimana passata |
| Ultimi 30 giorni | Mese passato |
| Ultimi 90 giorni | Trimestre passato |
| Ultimi 12 mesi | Anno passato |
| Tutto il periodo | Nessuna restrizione temporale |
| Intervallo personalizzato | Selettore date per inizio e fine |

### Filtro Specie

Filtra i dati vaccinali per specie dell'animale:

- Tutte le Specie (predefinito)
- Cane
- Gatto
- Uccello
- Coniglio
- Altro

### Filtro Paese

Seleziona uno o più paesi per vedere i dati vaccinali solo da quelle regioni.

### Filtro Città

Restringi ulteriormente i risultati selezionando città specifiche all'interno del paese scelto.

> **Suggerimento:** Combina i filtri per rispondere a domande specifiche. Per esempio: "Quali sono i vaccini principali per i cani nel Regno Unito negli ultimi 12 mesi?"

### Applicazione dei Filtri

1. Imposta i valori di filtro desiderati usando i menu a tendina.
2. Clicca **Applica Filtri** oppure i filtri si applicano automaticamente alla modifica.
3. Tutte le sezioni della dashboard si aggiornano per riflettere i dati filtrati.
4. I filtri attivi sono mostrati come tag sotto la barra filtri.
5. Clicca la **X** su qualsiasi tag filtro per rimuoverlo, o clicca **Cancella Tutto** per reimpostare.

---

## Classifica Top 20 Vaccini

La classifica mostra i 20 vaccini più frequentemente somministrati in base alla selezione di filtri corrente.

### Colonne della Tabella

| Colonna | Descrizione |
|---------|-------------|
| Posizione | Posizione da 1 a 20 |
| Nome Vaccino | Nome del vaccino |
| Conteggio | Numero di volte somministrato |
| Percentuale | Quota sul totale delle vaccinazioni |
| Tendenza | Sparkline che mostra la tendenza d'uso nel periodo selezionato |

### Lettura della Classifica

1. I vaccini sono ordinati per conteggio in ordine decrescente.
2. La colonna **Percentuale** mostra quale porzione di tutte le vaccinazioni rappresenta questo vaccino.
3. La **Tendenza** sparkline offre una rapida visuale di se l'utilizzo è in aumento, stabile o in calo.
4. Passa il mouse sulla sparkline per vedere i valori dei punti dati.

### Interazione con la Classifica

- Clicca qualsiasi riga di vaccino per scorrere alla sezione di dettaglio corrispondente.
- Usa le intestazioni delle colonne per riordinare (anche se l'ordine per posizione predefinito è il più utile).
- La tabella è paginata se i filtri producono più di 20 risultati in configurazioni rare.

> **Suggerimento:** Un vaccino con tendenza in crescita potrebbe indicare una risposta a un'epidemia regionale o una nuova raccomandazione delle associazioni veterinarie.

---

## Visualizzazione Podio

Il podio evidenzia i 3 vaccini principali in una visualizzazione in stile premiazione.

### Layout

```
        [1°]
   [2°]     [3°]
```

- **1° Posto (centro, più alto):** Card color oro con il vaccino più somministrato.
- **2° Posto (sinistra):** Card color argento con il secondo vaccino più somministrato.
- **3° Posto (destra):** Card color bronzo con il terzo vaccino più somministrato.

### Contenuto delle Card

Ogni card del podio mostra:

- Icona medaglia posizione (oro, argento, bronzo)
- Nome del vaccino
- Conteggio totale somministrazioni
- Percentuale sul totale delle vaccinazioni
- Specie principale (specie più comune che riceve questo vaccino)

### Lettura del Podio

Il podio fornisce un riepilogo a colpo d'occhio dei pattern vaccinali della piattaforma. Risultati comuni includono:

- **Cani:** Antirabbica, DHPP (Cimurro/Parvo), Bordetella spesso dominano.
- **Gatti:** FVRCP, Antirabbica, FeLV sono i vaccini tipici principali.
- **Piattaforme miste:** L'antirabbica spesso è in testa tra tutte le specie.

> **Suggerimento:** Se il podio mostra risultati inattesi dopo aver applicato i filtri, verifica se il periodo temporale o il filtro posizione sta producendo un campione piccolo che potrebbe distorcere le classifiche.

---

## Suddivisione per Specie per Vaccino

Sotto la classifica, ogni vaccino nei top 20 ha una sezione espandibile che mostra la distribuzione per specie.

### Visualizzazione della Suddivisione

1. Clicca la freccia di espansione accanto a qualsiasi vaccino nella classifica.
2. Appare un grafico a barre orizzontali impilate che mostra la distribuzione per specie.
3. Ogni segmento è colorato per specie:
   - Cani: Blu
   - Gatti: Arancione
   - Uccelli: Verde
   - Conigli: Viola
   - Altro: Grigio

### Tabella Suddivisione

Accanto al grafico a barre, una piccola tabella mostra:

| Specie | Conteggio | Percentuale |
|---------|-----------|-------------|
| Cane | 1.234 | 62% |
| Gatto | 456 | 23% |
| Uccello | 200 | 10% |
| Coniglio | 80 | 4% |
| Altro | 20 | 1% |

### Casi d'Uso

- Identificare vaccini specifici per specie vs. multi-specie.
- Rilevare pattern insoliti (es. un vaccino specifico per cani che appare nei registri dei gatti potrebbe indicare errori di inserimento dati).
- Comprendere la composizione per specie della piattaforma attraverso i dati vaccinali.

> **Suggerimento:** Vaccini specifici per una specie che appaiono sotto la specie sbagliata spesso indicano problemi di qualità dei dati che dovrebbero essere indagati.

---

## Posizioni Principali per Vaccino

Ogni vaccino mostra anche una suddivisione geografica di dove viene più frequentemente somministrato.

### Visualizzazione dei Dati di Posizione

1. Clicca la freccia di espansione accanto a qualsiasi vaccino nella classifica.
2. Passa alla scheda **Posizioni** all'interno della sezione espansa.
3. Appare un elenco classificato delle 10 posizioni principali.

### Tabella Posizioni

| Posizione | Paese | Città | Conteggio | Percentuale |
|-----------|-------|-------|-----------|-------------|
| 1 | Germania | Berlino | 543 | 18% |
| 2 | Regno Unito | Londra | 421 | 14% |
| 3 | Francia | Parigi | 389 | 13% |
| ... | ... | ... | ... | ... |

### Vista Mappa

Se disponibile, una mini heatmap mostra la concentrazione di vaccinazioni geograficamente:

- Le regioni più scure indicano conteggi vaccinali più alti.
- Passa il mouse su una regione per vedere il conteggio esatto.
- Clicca una regione per applicarla come filtro posizione.

### Casi d'Uso

- Identificare preferenze o requisiti vaccinali regionali.
- Rilevare cluster che potrebbero corrispondere a raccomandazioni veterinarie locali.
- Pianificare campagne di sensibilizzazione o partnership regionali.

> **Suggerimento:** Alcuni vaccini sono obbligatori per legge in paesi specifici (es. antirabbica in Germania). Alte concentrazioni in certe regioni sono attese per i vaccini obbligatori.

---

## Esportazione Dati

Per esportare i dati delle analytics vaccinazioni:

1. Clicca il pulsante **Esporta** nell'angolo in alto a destra della pagina.
2. Scegli il formato di esportazione:
   - **CSV** -- Dati grezzi per analisi su foglio di calcolo
   - **PDF** -- Report formattato con grafici
3. L'esportazione rispetta tutti i filtri attualmente attivi.
4. Il file viene scaricato nella posizione di download predefinita del browser.

### Contenuto dell'Esportazione

L'esportazione CSV include:

- Nome del vaccino
- Conteggio totale
- Conteggi suddivisione per specie
- Paesi e città principali
- Punti dati tendenza
- Parametri filtro utilizzati

> **Suggerimento:** Usa le esportazioni CSV per creare visualizzazioni personalizzate in strumenti come Excel o Google Sheets, o per condividere dati con partner di consulenza veterinaria.

---

## Aggiornamento Dashboard

I dati analytics vengono calcolati dai registri vaccinali e memorizzati in cache per le prestazioni.

- I dati si aggiornano automaticamente ogni 24 ore.
- Il timestamp dell'ultimo aggiornamento è mostrato in fondo alla pagina.
- Clicca l'icona **Aggiorna** accanto al timestamp per attivare un aggiornamento manuale.
- L'aggiornamento manuale potrebbe richiedere 10-30 secondi a seconda del volume dei dati.

> **Suggerimento:** Se noti discrepanze tra la dashboard analytics e i registri dei singoli animali, prova un aggiornamento manuale. Le vaccinazioni aggiunte di recente potrebbero non apparire fino al prossimo aggiornamento della cache.

---

## Domande Frequenti

**D: Perché il totale nella classifica non corrisponde al totale delle Statistiche Riepilogative?**
R: La classifica mostra i top 20 vaccini. Se ci sono più di 20 vaccini unici, i rimanenti non sono elencati ma contano comunque nel totale.

**D: Posso vedere i dati per un allevatore o proprietario specifico?**
R: No. La pagina analytics mostra dati aggregati della piattaforma. I registri vaccinali individuali sono disponibili nel profilo di ogni animale.

**D: Perché alcuni vaccini mostrano dati di tendenza pari a zero?**
R: I nuovi vaccini registrati una sola volta potrebbero non avere sufficienti punti dati per generare una linea di tendenza significativa.

**D: Quanto indietro vanno i dati storici?**
R: Il filtro "Tutto il periodo" include ogni registro vaccinale dal lancio della piattaforma. Non c'è un limite di conservazione dei dati per le analytics.

**D: Posso confrontare due periodi temporali?**
R: Non direttamente nella dashboard. Esporta i dati per due periodi diversi e confrontali in un foglio di calcolo.
