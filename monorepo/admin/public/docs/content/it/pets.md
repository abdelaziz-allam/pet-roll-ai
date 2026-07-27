# Registro Animali

Il Registro Animali è il modulo centrale per visualizzare e gestire tutti gli animali registrati sulla piattaforma Petfolioo. Da questo modulo, gli amministratori possono consultare il catalogo completo degli animali, visualizzare profili dettagliati, verificare gli stati delle certificazioni sanitarie e intraprendere azioni di moderazione come il ban di animali che violano le policy della piattaforma.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabella Elenco Animali

La tabella dell'elenco animali visualizza tutti gli animali registrati in un formato paginato, ordinabile e filtrabile.

### Colonne della Tabella

| Colonna | Descrizione | Ordinabile |
|---------|-------------|:----------:|
| Nome | Il nome registrato dell'animale | Sì |
| Specie | Categoria di specie (es. Cane, Gatto, Uccello) | Sì |
| Razza | Razza specifica all'interno della specie | Sì |
| Stato | Stato attuale (Attivo, Bannato, In Sospeso) | Sì |
| Genere | Maschio, Femmina o Sconosciuto | Sì |
| Posizione | Paese e città dell'indirizzo registrato dell'animale | Sì |

### Indicatori di Stato

| Stato | Colore Badge | Significato |
|-------|-------------|---------|
| Attivo | Verde | Il profilo dell'animale è attivo e visibile agli altri utenti |
| Bannato | Rosso | Il profilo dell'animale è stato nascosto per violazione delle policy |
| In Sospeso | Arancione | Il profilo dell'animale è in attesa di revisione o verifica del proprietario |

### Interazioni con la Tabella

1. **Clicca l'intestazione di una colonna** per ordinare la tabella per quella colonna. Una freccia indica la direzione dell'ordinamento.
2. **Clicca una riga** per aprire il pannello dettaglio dell'animale sul lato destro dello schermo.
3. I **controlli di paginazione** in basso permettono di navigare tra le pagine e cambiare la dimensione della pagina (10, 20, 50 voci per pagina).

> **Suggerimento:** Tieni premuto `Shift` e clicca l'intestazione di una seconda colonna per applicare un ordinamento secondario.

---

## Filtri

La barra filtri sopra la tabella dell'elenco animali offre diversi modi per restringere i risultati visualizzati.

### Filtri Disponibili

| Filtro | Tipo | Descrizione |
|--------|------|-------------|
| Specie | Menu a tendina | Filtra per specie (Cane, Gatto, Uccello, Coniglio, Rettile, ecc.) |
| Stato | Menu a tendina | Filtra per stato dell'animale (Attivo, Bannato, In Sospeso) |
| Genere | Menu a tendina | Filtra per genere (Maschio, Femmina, Sconosciuto) |
| Paese | Menu a tendina | Filtra per paese di registrazione dell'animale |
| Città | Menu a tendina | Filtra per città (le opzioni si aggiornano in base alla selezione del paese) |
| Ricerca | Campo testo | Ricerca libera per nome animale, razza e numero microchip |

### Applicazione dei Filtri

1. Individua la **barra filtri** sopra la tabella.
2. Clicca qualsiasi **filtro a tendina** per vedere le opzioni disponibili.
3. Seleziona uno o più valori dai menu a tendina.
4. Digita nel campo **Ricerca** per eseguire una ricerca testuale libera.
5. I risultati si aggiornano automaticamente man mano che i filtri vengono applicati.
6. I filtri attivi sono mostrati come tag sotto la barra filtri.
7. Clicca la **X** su qualsiasi tag filtro per rimuoverlo.
8. Clicca **Cancella Tutto** per reimpostare tutti i filtri contemporaneamente.

### Combinazioni di Filtri

I filtri sono combinati con logica AND. Per esempio:

| Filtri Selezionati | Risultato |
|-------------------|---------|
| Specie: Cane | Tutti i cani indipendentemente da stato, genere o posizione |
| Specie: Cane + Genere: Femmina | Tutte le femmine di cane |
| Specie: Cane + Paese: EAU + Stato: Attivo | Tutti i cani attivi situati negli EAU |
| Ricerca: "Rex" | Tutti gli animali il cui nome, razza o microchip contiene "Rex" |

> **Nota:** Il menu a tendina città dipende dalla selezione del paese. Seleziona prima un paese per vedere le città disponibili.

---

## Pannello Dettaglio Animale

Cliccando su qualsiasi riga dell'animale si apre un pannello dettaglio che scorre dal lato destro dello schermo. Questo pannello contiene il profilo completo dell'animale organizzato in sezioni.

### Griglia Foto

In cima al pannello dettaglio, una griglia foto mostra le immagini caricate dell'animale.

| Elemento | Descrizione |
|----------|-------------|
| Foto principale | Visualizzata più grande, contrassegnata con un'icona a stella |
| Foto aggiuntive | Mostrate in layout a griglia (fino a 6 miniature) |
| Azione clic | Cliccando qualsiasi foto si apre in lightbox a schermo intero |
| Nessuna foto | Viene mostrata una silhouette segnaposto |

### Sezione Informazioni Animale

Sotto le foto, i dettagli principali dell'animale sono visualizzati in un layout strutturato.

| Campo | Descrizione | Esempio |
|-------|-------------|---------|
| Nome | Nome registrato dell'animale | "Bella" |
| Specie | Categoria di specie | "Cane" |
| Razza | Razza specifica | "Golden Retriever" |
| Colore | Colore del mantello/corpo | "Dorato" |
| Peso | Peso con unità di misura | "28,5 kg" |
| Data di Nascita | Compleanno dell'animale | "2021-03-15" |
| Età | Calcolata dalla data di nascita | "2 anni, 4 mesi" |
| Genere | Maschio o Femmina | "Femmina" |
| Numero Microchip | ID univoco del microchip se impiantato | "900118000123456" |
| Castrato/Sterilizzato | Stato di castrazione o sterilizzazione | "Sì" / "No" / "Sconosciuto" |
| Data di Registrazione | Quando l'animale è stato aggiunto alla piattaforma | "2023-07-20" |

### Stato Certificazione Sanitaria

La sezione certificazione sanitaria mostra se l'animale ha documentazione sanitaria valida in archivio.

| Elemento | Descrizione |
|----------|-------------|
| Badge certificazione | Spunta verde (valido), Avviso giallo (in scadenza), X rossa (scaduto/mancante) |
| Tipo certificato | Nome del certificato sanitario |
| Data emissione | Quando il certificato è stato emesso |
| Data scadenza | Quando il certificato scade |
| Barra di validità | Indicatore visivo del periodo di validità rimanente |

**Lettura della Barra di Validità:**

1. Una **barra verde piena** indica che il certificato è stato emesso di recente e ha la maggior parte della validità rimanente.
2. Una **barra gialla parziale** (sotto il 30% rimanente) indica che il certificato si sta avvicinando alla scadenza.
3. Una **barra rossa vuota** indica che il certificato è scaduto.
4. La percentuale rimanente è visualizzata come testo accanto alla barra.

> **Suggerimento:** I certificati in scadenza entro 30 giorni vengono automaticamente segnalati nel modulo Verifiche in Sospeso affinché il proprietario dell'animale venga notificato.

### Informazioni Proprietario

La sezione proprietario mostra i dettagli del proprietario registrato dell'animale.

| Campo | Descrizione |
|-------|-------------|
| Nome proprietario | Nome visualizzato del proprietario dell'animale |
| Email | Indirizzo email del proprietario |
| Telefono | Numero di telefono se fornito |
| Allevatore verificato | Se il proprietario ha lo stato di allevatore verificato |
| Animali totali | Quanti animali ha registrato questo proprietario |
| Membro dal | Data di registrazione del proprietario |

Cliccando il nome del proprietario si naviga al suo profilo completo nel modulo Utenti.

### Sezione Posizione

La sezione posizione mostra dove l'animale è registrato.

| Campo | Descrizione |
|-------|-------------|
| Paese | Nome del paese con icona bandiera |
| Città | Nome della città |
| Indirizzo | Indirizzo stradale se fornito (potrebbe essere parzialmente nascosto per privacy) |

---

## Azione Ban/Unban Animale

Gli amministratori e i moderatori possono bannare un animale il cui profilo viola le policy della piattaforma. Il ban nasconde l'animale dalla vista pubblica e notifica il proprietario.

### Bannare un Animale

1. Apri il pannello dettaglio dell'animale cliccando la sua riga nella tabella dell'elenco.
2. Scorri fino in fondo al pannello o individua la sezione **Azioni**.
3. Clicca il pulsante **Banna Animale** (mostrato in rosso).
4. Apparirà una finestra modale di conferma.
5. Nel campo di testo **Motivo**, inserisci una spiegazione chiara del perché l'animale viene bannato.
6. Seleziona una **categoria di violazione** dal menu a tendina (es. Annuncio fraudolento, Contenuto inappropriato, Profilo duplicato, Violazione delle policy).
7. Clicca **Conferma Ban**.
8. Lo stato dell'animale cambierà in "Bannato" e il proprietario riceverà una notifica con il motivo fornito.

### Requisiti del Motivo di Ban

| Requisito | Descrizione |
|-----------|-------------|
| Lunghezza minima | Almeno 20 caratteri |
| Linguaggio | Deve essere professionale e chiaro |
| Specificità | Deve fare riferimento alla violazione specifica |
| Visibilità | Il motivo viene mostrato direttamente al proprietario dell'animale |

> **Importante:** Il motivo del ban che fornisci verrà visualizzato al proprietario dell'animale nella notifica dell'app e nell'email. Assicurati che sia professionale, specifico e non contenga gergo interno.

### Sbannare un Animale

1. Usa il filtro **Stato** per selezionare "Bannato" e trovare gli animali bannati.
2. Clicca sulla riga dell'animale bannato per aprire il pannello dettaglio.
3. Individua il pulsante **Sbanna Animale** (mostrato in verde) nella sezione Azioni.
4. Apparirà una finestra modale di conferma che mostra il motivo e la data del ban originale.
5. Aggiungi opzionalmente una nota che spiega perché il ban viene revocato.
6. Clicca **Conferma Unban**.
7. Lo stato dell'animale tornerà ad "Attivo" e il proprietario verrà notificato.

### Storico Ban

Il pannello dettaglio di ogni animale include una sezione **Storico Ban** se l'animale è stato mai bannato:

| Colonna | Descrizione |
|---------|-------------|
| Data | Quando il ban è stato applicato |
| Admin | Quale amministratore ha eseguito l'azione |
| Motivo | Il motivo del ban fornito |
| Durata | Quanto è durato il ban |
| Risoluzione | Come è stato risolto (sbannato, appello, ecc.) |

---

## Operazioni in Blocco

Per attività di moderazione su larga scala, la tabella dell'elenco animali supporta la selezione in blocco.

### Utilizzo della Selezione in Blocco

1. Seleziona la **casella di controllo** sul lato sinistro di ogni riga che vuoi selezionare.
2. Oppure clicca la **casella di controllo dell'intestazione** per selezionare tutte le righe visibili nella pagina corrente.
3. Una **barra azioni in blocco** appare in cima alla tabella mostrando il conteggio degli elementi selezionati.
4. Le azioni in blocco disponibili includono:
   - **Esporta** - Scarica gli animali selezionati come file CSV
   - **Cambia Stato** - Applica un cambio di stato a tutti gli animali selezionati

> **Nota:** Il ban in blocco non è disponibile tramite questa interfaccia. I ban devono essere applicati individualmente per garantire che ognuno includa un motivo specifico.

---

## Esportazione Dati Animali

Per esportare i dati del registro animali:

1. Applica i filtri desiderati per restringere il dataset.
2. Clicca il pulsante **Esporta** nell'angolo in alto a destra della tabella.
3. Seleziona il formato di esportazione (CSV o Excel).
4. Scegli se esportare i **risultati filtrati** o **tutti i record**.
5. Il file verrà scaricato nella posizione di download predefinita del browser.

### Campi Esportati

| Campo | Incluso |
|-------|:-------:|
| Nome animale | Sì |
| Specie | Sì |
| Razza | Sì |
| Genere | Sì |
| Stato | Sì |
| Paese | Sì |
| Città | Sì |
| Email proprietario | Sì |
| Data di registrazione | Sì |
| Numero microchip | Sì |
| Stato certificazione sanitaria | Sì |

> **Nota:** Le foto e le cartelle cliniche dettagliate non sono incluse nelle esportazioni. Vengono esportati solo i dati di riepilogo.

---

*Precedente: [Dashboard](./dashboard.md) | Successivo: [Utenti App](./users.md)*
