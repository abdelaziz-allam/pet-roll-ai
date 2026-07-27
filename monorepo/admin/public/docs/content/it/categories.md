# Categorie Animali

Il modulo Categorie Animali consente agli amministratori di definire e gestire il sistema di classificazione utilizzato per organizzare gli animali sulla piattaforma Petfolioo. Le categorie rappresentano specie o tipi di animali e sono utilizzate in tutta l'applicazione per filtraggio, ricerca e organizzazione. Ogni categoria include un nome, un'etichetta, un'icona emoji, una descrizione e uno stato attivo.

![Pet Categories](/docs/screenshots/categories.png)

---

## Elenco Categorie

La pagina categorie mostra tutte le categorie animali definite in formato tabellare con controlli di gestione.

### Colonne della Tabella

| Colonna | Descrizione | Ordinabile |
|---------|-------------|:----------:|
| Name Slug | Identificatore machine-readable (es. `dog`, `cat`, `bird`) | Sì |
| Etichetta | Nome visualizzato human-readable (es. "Cane", "Gatto", "Uccello") | Sì |
| Icona Emoji | Icona visiva che rappresenta la categoria | No |
| Descrizione | Breve descrizione di cosa include questa categoria | No |
| Attivo | Interruttore toggle che mostra se la categoria è attiva | Sì |
| Azioni | Pulsanti Modifica ed Elimina | No |

### Indicatori di Stato

| Stato Attivo | Visualizzazione | Significato |
|-------------|-----------------|---------|
| Attivo | Toggle verde (posizione on) | La categoria è disponibile per la registrazione animali e visibile nei filtri |
| Inattivo | Toggle grigio (posizione off) | La categoria è nascosta agli utenti ma gli animali esistenti mantengono la loro categoria |

### Funzionalità della Tabella

1. **Ordina** cliccando le intestazioni delle colonne Name Slug, Etichetta o Attivo.
2. **Toggle rapido** cliccando l'interruttore Attivo direttamente nella riga della tabella.
3. **Azioni inline** tramite i pulsanti Modifica (icona matita) ed Elimina (icona cestino) in ogni riga.
4. **Paginazione** in basso per la navigazione quando esistono molte categorie.

> **Suggerimento:** Le categorie inattive vengono visualizzate con uno stile riga leggermente sbiadito per distinguerle visivamente da quelle attive.

---

## Creazione di una Categoria

Nuove categorie possono essere create per supportare specie o tipi di animali aggiuntivi sulla piattaforma.

### Procedura di Creazione Categoria

1. Clicca il pulsante **Aggiungi Categoria** nell'angolo in alto a destra della pagina Categorie.
2. Appare un modulo di creazione (come finestra modale o modulo inline).
3. Compila i campi obbligatori:

| Campo | Obbligatorio | Descrizione | Esempio |
|-------|:------------:|-------------|---------|
| Name Slug | Sì | Identificatore machine-readable | `golden_fish` |
| Etichetta | Sì | Nome visualizzato mostrato agli utenti | "Pesce Rosso" |
| Icona Emoji | Sì | Icona visiva per la categoria | "fish" |
| Descrizione | No | Breve spiegazione della categoria | "Pesci d'acqua dolce e salata" |
| Attivo | No | Se attivare immediatamente (predefinito: attivo) | Attivato |

4. Seleziona un'icona emoji dal **Selettore Emoji** (vedi sotto).
5. Rivedi le tue voci.
6. Clicca **Crea Categoria** per salvare.
7. La nuova categoria appare nella tabella dell'elenco.

### Convenzione Name Slug

Il name slug deve seguire queste regole:

| Regola | Descrizione | Esempio |
|--------|-------------|---------|
| Solo minuscole | Nessun carattere maiuscolo consentito | `dog` non `Dog` |
| Underscore per gli spazi | Usa underscore per separare le parole | `guinea_pig` non `guinea pig` |
| Alfanumerico + underscore | Solo lettere, numeri e underscore | `cat_1` è valido, `cat-1` non lo è |
| Univoco | Non deve duplicare uno slug di categoria esistente | Il sistema rifiuterà i duplicati |
| Nessun underscore iniziale/finale | Non può iniziare o terminare con underscore | `_dog_` non è valido |
| Massimo 50 caratteri | Mantieni gli slug concisi | Identificatori brevi e descrittivi |

> **Importante:** Il name slug non può essere modificato dopo la creazione. Viene usato come identificatore permanente nel database e nelle API. Scegli con attenzione.

### Selettore Emoji

Il selettore emoji fornisce oltre 100 icone di animali e natura per l'identificazione delle categorie.

| Funzionalità | Descrizione |
|--------------|-------------|
| Ricerca | Digita per filtrare le emoji disponibili per parola chiave |
| Categorie | Emoji organizzate per gruppo (Animali, Natura, Oggetti) |
| Anteprima | L'emoji selezionata mostrata in anteprima grande prima della conferma |
| Recenti | Le emoji usate di recente mostrate in cima per accesso rapido |

**Utilizzo del Selettore Emoji:**

1. Clicca il **campo icona emoji** per aprire il selettore.
2. Sfoglia le categorie o digita una parola chiave nella ricerca (es. "cane", "pesce", "uccello").
3. Clicca l'emoji desiderata per selezionarla.
4. L'emoji selezionata appare nel campo del modulo come anteprima.
5. Per cambiare la selezione, clicca nuovamente il campo per riaprire il selettore.

Le categorie emoji disponibili includono:

| Gruppo | Emoji di Esempio |
|--------|-----------------|
| Animali Domestici | Cane, Gatto, Criceto, Coniglio, Topo |
| Animali da Fattoria | Cavallo, Mucca, Maiale, Pecora, Capra, Gallina |
| Uccelli | Pappagallo, Aquila, Gufo, Anatra, Fenicottero, Pavone |
| Rettili | Lucertola, Serpente, Tartaruga, Coccodrillo, Dinosauro |
| Acquatici | Pesce, Pesce Tropicale, Balena, Delfino, Polpo, Squalo |
| Insetti | Farfalla, Ape, Scarabeo, Formica, Grillo |
| Fauna Selvatica | Leone, Tigre, Orso, Scimmia, Elefante, Giraffa |
| Zampa/Generico | Impronte zampe, Osso, Cuore, Stella |

---

## Modifica delle Categorie

Le categorie esistenti possono essere modificate per aggiornare la loro etichetta, icona, descrizione o stato attivo.

### Procedura di Modifica Categoria

1. Individua la categoria che vuoi modificare nella tabella dell'elenco.
2. Clicca il pulsante **Modifica** (icona matita) nella colonna Azioni della riga.
3. Appare un modulo di modifica precompilato con i valori attuali.
4. Modifica uno qualsiasi dei campi editabili:

| Campo | Modificabile | Note |
|-------|:------------:|------|
| Name Slug | No | Non può essere cambiato dopo la creazione |
| Etichetta | Sì | Aggiorna il nome visualizzato |
| Icona Emoji | Sì | Seleziona una nuova emoji dal selettore |
| Descrizione | Sì | Aggiorna o aggiungi una descrizione |
| Attivo | Sì | Attiva/disattiva lo stato attivo/inattivo |

5. Apporta le modifiche.
6. Clicca **Salva Modifiche** per applicare.
7. Una notifica di successo conferma l'aggiornamento.
8. La tabella dell'elenco riflette immediatamente le modifiche.

### Considerazioni sulla Modifica

| Considerazione | Dettaglio |
|----------------|----------|
| Modifiche etichetta | Riflesse immediatamente nell'app per tutti gli utenti |
| Modifiche emoji | Aggiornate in tutte le posizioni dell'interfaccia dove appare la categoria |
| Modifiche descrizione | Visibili nelle schermate di selezione categoria nell'app |
| Animali esistenti | Gli animali già assegnati a questa categoria non sono influenzati dalle modifiche |

> **Nota:** Cambiare l'etichetta di una categoria non cambia il suo slug. Lo slug rimane l'identificatore permanente. Utenti e animali fanno riferimento alle categorie tramite slug internamente.

---

## Attivazione e Disattivazione Categorie

Le categorie possono essere commutate tra stato attivo e inattivo senza eliminazione.

### Attivazione di una Categoria

1. Trova la categoria inattiva nell'elenco (mostrata con toggle grigio).
2. Clicca l'**interruttore toggle** nella colonna Attivo per portarlo in posizione on.
3. In alternativa, clicca Modifica e attiva il campo Attivo nel modulo di modifica.
4. Conferma l'azione se richiesto.
5. La categoria diventa immediatamente disponibile per la registrazione animali.

### Disattivazione di una Categoria

1. Trova la categoria attiva nell'elenco (mostrata con toggle verde).
2. Clicca l'**interruttore toggle** per portarlo in posizione off.
3. Appare una finestra di conferma che spiega l'impatto.
4. Clicca **Conferma Disattivazione**.
5. La categoria viene nascosta dalle nuove registrazioni animali.

### Impatto della Disattivazione

| Area di Impatto | Effetto |
|-----------------|---------|
| Nuove registrazioni | La categoria non appare più nei menu a tendina di selezione specie |
| Animali esistenti | Gli animali già assegnati a questa categoria mantengono la loro assegnazione |
| Filtri | La categoria non appare più nei menu a tendina filtro per gli utenti pubblici |
| Portale admin | La categoria rimane visibile nell'admin con stile inattivo |
| Risposte API | La categoria esclusa dalle liste categorie attive |
| Riattivazione | Può essere riabilitata in qualsiasi momento, ripristinando la piena funzionalità |

> **Suggerimento:** La disattivazione è preferibile all'eliminazione quando vuoi nascondere temporaneamente una categoria o quando animali esistenti la usano ancora. Preserva l'integrità dei dati limitando il nuovo utilizzo.

---

## Pulsante Valori Predefiniti

La funzionalità Valori Predefiniti popola la tabella categorie con un set predefinito di categorie animali comuni. È utile per la configurazione iniziale della piattaforma o per ripristinare le categorie standard.

### Utilizzo dei Valori Predefiniti

1. Clicca il pulsante **Valori Predefiniti** situato sopra o sotto la tabella categorie.
2. Appare una finestra modale di conferma che elenca le categorie che verranno create.
3. Rivedi l'elenco delle categorie predefinite.
4. Clicca **Conferma Seed** per procedere.
5. Le categorie predefinite vengono create e appaiono nell'elenco.

### Set di Categorie Predefinite

Il seed crea le seguenti categorie standard (se non esistono già):

| Name Slug | Etichetta | Emoji | Descrizione |
|-----------|-----------|:-----:|-------------|
| `dog` | Cane | Muso di cane | Cani domestici di tutte le razze |
| `cat` | Gatto | Muso di gatto | Gatti domestici di tutte le razze |
| `bird` | Uccello | Uccello | Uccelli da compagnia inclusi pappagalli, canarini e fringuelli |
| `rabbit` | Coniglio | Muso di coniglio | Conigli domestici |
| `hamster` | Criceto | Muso di criceto | Criceti, gerbilli e piccoli roditori simili |
| `fish` | Pesce | Pesce | Pesci d'acquario d'acqua dolce e salata |
| `turtle` | Tartaruga | Tartaruga | Tartarughe terrestri e acquatiche |
| `snake` | Serpente | Serpente | Serpenti da compagnia non velenosi |
| `lizard` | Lucertola | Lucertola | Gechi, iguana e altre lucertole da compagnia |
| `horse` | Cavallo | Muso di cavallo | Cavalli e pony |
| `guinea_pig` | Cavia | Cavia | Cavie e porcellini d'India |
| `ferret` | Furetto | Furetto | Furetti domestici |

### Comportamento del Seed

| Scenario | Comportamento |
|----------|---------------|
| Tabella vuota | Tutti i predefiniti vengono creati |
| Alcuni predefiniti esistono | Solo i predefiniti mancanti vengono creati (nessun duplicato) |
| Tutti i predefiniti esistono | Nessuna modifica, viene mostrato un messaggio di conferma |
| Esistono categorie personalizzate | Le categorie personalizzate non vengono influenzate |

> **Nota:** Il pulsante Valori Predefiniti non elimina né modifica le categorie esistenti. Aggiunge solo le voci predefinite mancanti. Le tue categorie personalizzate sono al sicuro.

---

## Eliminazione di una Categoria

Le categorie possono essere eliminate permanentemente quando non sono più necessarie. Questa azione richiede un'attenta valutazione a causa del suo impatto sui dati esistenti.

### Procedura di Eliminazione Categoria

1. Individua la categoria nella tabella dell'elenco.
2. Clicca il pulsante **Elimina** (icona cestino) nella colonna Azioni della riga.
3. Appare una finestra modale di avviso con:
   - Il nome della categoria e il conteggio corrente di animali che la usano
   - Un avviso sull'impatto sugli animali esistenti
   - Un campo di conferma testuale (digita lo slug della categoria per confermare)
4. Leggi attentamente l'avviso.
5. Digita il **name slug** della categoria nel campo di conferma.
6. Clicca **Elimina Categoria** per rimuoverla permanentemente.

### Impatto dell'Eliminazione

| Area di Impatto | Effetto |
|-----------------|---------|
| Record categoria | Rimosso permanentemente dal database |
| Animali esistenti | Gli animali precedentemente in questa categoria diventano **senza categoria** |
| Profili animali | Il campo specie mostra "Senza Categoria" o vuoto |
| Filtri | La categoria viene rimossa da tutti i menu a tendina filtro |
| Analytics | I dati storici potrebbero mostrare "Categoria Sconosciuta" per i record passati |
| Reversibilità | Non può essere annullata (deve essere ricreata manualmente se necessario) |

### Gli Animali Diventano Senza Categoria

Quando una categoria viene eliminata:

1. Tutti gli animali assegnati a quella categoria perdono la loro assegnazione di categoria.
2. Questi animali appaiono con un'etichetta "Senza Categoria" nel Registro Animali.
3. I proprietari degli animali **non** vengono notificati automaticamente.
4. Gli amministratori possono riassegnare gli animali senza categoria a una categoria diversa tramite modifica in blocco.
5. Il conteggio animali per la categoria eliminata viene mostrato nella finestra modale di conferma eliminazione.

> **Importante:** Eliminare una categoria con animali attivi assegnati lascerà quegli animali senza categoria. Considera di disattivare la categoria invece, o di riassegnare gli animali prima dell'eliminazione.

### Restrizioni all'Eliminazione

| Restrizione | Descrizione |
|-------------|-------------|
| Categorie predefinite | Le categorie predefinite dal seed possono essere eliminate (possono essere ri-seedate) |
| Animali attivi | Le categorie con animali possono essere eliminate (gli animali diventano senza categoria) |
| Conferma richiesta | Lo slug deve essere digitato per confermare l'eliminazione |
| Requisito di ruolo | Solo i ruoli `super_admin` e `admin` possono eliminare categorie |

---

## Best Practice

### Linee Guida per la Gestione Categorie

1. **Usa etichette chiare e semplici** - Le etichette delle categorie dovrebbero essere immediatamente comprensibili a tutti gli utenti indipendentemente dalla competenza linguistica.
2. **Scegli emoji rappresentative** - Seleziona emoji che rappresentino chiaramente il tipo di animale per facilitare il riconoscimento visivo rapido.
3. **Scrivi descrizioni utili** - Le descrizioni aiutano gli utenti a scegliere la categoria corretta quando registrano il loro animale.
4. **Disattiva prima di eliminare** - Se non sei sicuro che una categoria sia necessaria, disattivala prima. Elimina solo quando sei certo.
5. **Mantieni gli slug descrittivi** - Poiché gli slug non possono essere cambiati, sceglili con attenzione durante la creazione.
6. **Monitora gli animali senza categoria** - Controlla regolarmente gli animali senza categoria e assegnali appropriatamente.

### Esempi di Denominazione Categorie

| Buono | Cattivo | Perché |
|-------|---------|--------|
| `guinea_pig` | `gp` | Descrittivo e leggibile |
| `tropical_fish` | `tropicalFish` | Segue la convenzione underscore |
| `parrot` | `Parrot_1` | Minuscolo, nessun numero necessario |
| `persian_cat` | `cat_breed_persian` | Conciso, livello razza quando necessario |

---

## Domande Frequenti

**D: Posso unire due categorie?**
R: Non esiste una funzione di unione integrata. Per consolidare le categorie, riassegna gli animali da una categoria all'altra, poi elimina la categoria vuota.

**D: Cosa succede ai filtri quando disattivo una categoria?**
R: La categoria viene rimossa dai menu a tendina filtro rivolti agli utenti ma rimane accessibile nei filtri del portale admin per scopi di gestione.

**D: Posso riordinare le categorie?**
R: Le categorie vengono visualizzate in ordine alfabetico per etichetta nelle interfacce rivolte agli utenti. La tabella admin può essere ordinata per qualsiasi intestazione di colonna.

**D: C'è un limite al numero di categorie che posso creare?**
R: Non c'è un limite tecnico rigido, ma per l'usabilità, mantieni il numero totale gestibile (sotto 30 è consigliato) in modo che gli utenti possano facilmente trovare la categoria corretta.

---

*Precedente: [Utenti App](./users.md)*
