# Blog CMS

Il modulo Blog CMS consente agli amministratori di creare, modificare, pubblicare e gestire articoli del blog visualizzati sul sito web pubblico di Petfolioo. Usa questo strumento per condividere consigli sulla cura degli animali, novità della piattaforma, approfondimenti sugli allevatori e contenuti educativi con la tua community.

![Blog CMS](/docs/screenshots/blog.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabella Articoli del Blog

La vista principale mostra tutti gli articoli del blog in una tabella ricercabile e ordinabile.

| Colonna | Descrizione |
|---------|-------------|
| Titolo | Titolo dell'articolo con link cliccabile per la modifica |
| Stato | Badge dello stato di pubblicazione |
| Autore | Nome dell'admin che ha creato l'articolo |
| Visualizzazioni | Visualizzazioni totali della pagina dalla pubblicazione |
| Data | Data di creazione (o data di pubblicazione se pubblicato) |

### Badge di Stato

| Stato | Colore Badge | Descrizione |
|-------|-------------|-------------|
| Bozza | Grigio | L'articolo è salvato ma non visibile al pubblico |
| Pubblicato | Verde | L'articolo è online e visibile sul sito web |
| In Evidenza | Oro | L'articolo è pubblicato e fissato in cima |

### Azioni della Tabella

- Clicca il titolo di un articolo per aprirlo in modifica.
- Usa il menu azioni (tre puntini) su ogni riga per azioni rapide: Pubblica, Rimuovi Pubblicazione, Fissa, Rimuovi Evidenza, Elimina.
- Ordina per qualsiasi colonna cliccando l'intestazione della colonna.
- Usa la barra di ricerca per filtrare gli articoli per titolo o parole chiave del contenuto.

> **Suggerimento:** Ordina per Visualizzazioni decrescente per identificare i contenuti più popolari. Usa queste informazioni per pianificare futuri articoli su argomenti simili.

---

## Creazione di un Articolo

Per creare un nuovo articolo del blog:

1. Clicca il pulsante **Crea Articolo** nell'angolo in alto a destra della tabella Articoli del Blog.
2. Si apre l'editor dell'articolo con i seguenti campi.

### Titolo

- Inserisci il titolo dell'articolo nel campo titolo in alto.
- Massimo 200 caratteri.
- Il titolo appare come intestazione principale nella pagina pubblicata.
- Scegli titoli descrittivi e coinvolgenti che includano parole chiave pertinenti.

### Slug

- Lo slug URL viene generato automaticamente dal titolo.
- Formato: minuscolo, i trattini sostituiscono gli spazi, i caratteri speciali vengono rimossi.
- Esempio: "10 Consigli per Nuovi Proprietari di Cuccioli" diventa `10-consigli-per-nuovi-proprietari-di-cuccioli`.
- Puoi modificare manualmente lo slug se la versione auto-generata è troppo lunga o poco chiara.
- Lo slug deve essere univoco tra tutti gli articoli.

> **Suggerimento:** Mantieni gli slug brevi e ricchi di parole chiave per una migliore SEO. Accorcia manualmente gli slug auto-generati che superano le 5-6 parole.

### Contenuto HTML

- L'area contenuti principale accetta HTML per la formattazione avanzata.
- Usa la barra strumenti dell'editor di testo per la formattazione comune:
  - Grassetto, corsivo, sottolineato
  - Intestazioni (H2, H3, H4)
  - Elenchi ordinati e non ordinati
  - Link
  - Immagini (inline)
  - Citazioni
  - Blocchi di codice
- Passa alla **Modalità Sorgente** per modificare direttamente l'HTML grezzo.
- Il contenuto supporta tutti i tag HTML standard.

#### Best Practice per i Contenuti

| Fare | Non Fare |
|------|----------|
| Usare H2 per le sezioni principali, H3 per le sottosezioni | Usare H1 (riservato al titolo) |
| Includere immagini per spezzare testi lunghi | Pubblicare blocchi di testo non formattato |
| Mantenere i paragrafi brevi (3-4 frasi) | Scrivere paragrafi più lunghi di 5 frasi |
| Usare elenchi per elementi correlati multipli | Incorporare script esterni o iframe |
| Aggiungere testo alternativo a tutte le immagini | Usare stili inline per i colori |

### Estratto

- Scrivi un breve riassunto dell'articolo (massimo 500 caratteri).
- L'estratto appare nelle pagine elenco del blog, nei risultati di ricerca e nelle anteprime dei social media.
- Se lasciato vuoto, vengono utilizzati automaticamente i primi 500 caratteri del contenuto.
- Il contatore caratteri mostra i caratteri rimanenti mentre digiti.

> **Suggerimento:** Scrivi l'estratto come un teaser coinvolgente che invogli i lettori a cliccare. Deve funzionare autonomamente come pensiero completo, non terminare a metà frase.

### Caricamento Immagine di Copertina

1. Clicca l'area **Carica Immagine di Copertina** o trascina un file immagine.
2. Formati supportati: JPEG, PNG, WebP.
3. Dimensioni consigliate: 1200 x 630 pixel (ottimizzato per la condivisione social).
4. Dimensione massima file: 5 MB.
5. Dopo il caricamento, appare un'anteprima dell'immagine.
6. Clicca **Rimuovi** per eliminare l'immagine di copertina attuale e caricarne una diversa.

#### Linee Guida per l'Immagine di Copertina

- Usa immagini di alta qualità e pertinenti che rappresentino il contenuto dell'articolo.
- Evita sovrapposizioni di testo sulle immagini di copertina (potrebbero essere ritagliate su dispositivi diversi).
- Assicurati di avere i diritti per usare l'immagine (foto originali o stock con licenza appropriata).
- Le immagini vengono ottimizzate automaticamente per la distribuzione web dopo il caricamento.

### Tag

- Inserisci i tag come valori separati da virgola nel campo tag.
- Esempio: `cura cuccioli, addestramento, nutrizione, nuovi proprietari`
- I tag aiutano a categorizzare gli articoli e migliorare la scopribilità.
- I tag esistenti vengono suggeriti automaticamente mentre digiti.
- Non c'è limite al numero di tag, ma si consigliano 3-7 tag per articolo.

> **Suggerimento:** Usa nomi di tag coerenti tra gli articoli. Verifica i tag esistenti prima di creare nuove varianti (es. usa "cura cuccioli" in modo coerente piuttosto che alternare con "cura-cuccioli" o "Cura Cuccioli").

### Impostazioni SEO

La sezione SEO ti permette di ottimizzare come l'articolo appare nei motori di ricerca.

#### Meta Title

- Massimo 60 caratteri.
- Appare come titolo cliccabile nei risultati di ricerca.
- Se lasciato vuoto, viene usato il titolo dell'articolo.
- Il contatore caratteri diventa rosso quando si avvicina o supera i 60 caratteri.
- Best practice: Includi la parola chiave principale vicino all'inizio.

#### Meta Description

- Massimo 160 caratteri.
- Appare come snippet descrittivo sotto il titolo nei risultati di ricerca.
- Se lasciata vuota, viene usato l'estratto.
- Il contatore caratteri diventa rosso quando si avvicina o supera i 160 caratteri.
- Best practice: Includi una call to action e la parola chiave principale.

#### Anteprima SEO

Sotto i campi meta, un'anteprima mostra come l'articolo apparirà nei risultati di ricerca di Google:

```
+--------------------------------------------------+
| Meta Title (o Titolo Articolo se vuoto)          |
| https://petfolioo.com/blog/il-tuo-slug-qui       |
| La Meta Description (o Estratto se vuoto) appare |
| qui come apparrebbe nei risultati di ricerca...  |
+--------------------------------------------------+
```

> **Suggerimento:** Compila sempre sia il meta title che la meta description manualmente. I valori auto-generati dal titolo e dall'estratto potrebbero non essere ottimizzati per l'intento di ricerca.

### Salvataggio come Bozza

1. Dopo aver compilato i campi desiderati, clicca **Salva Bozza**.
2. L'articolo viene salvato con stato Bozza.
3. Puoi tornare a modificarlo in qualsiasi momento dalla tabella Articoli del Blog.
4. Le bozze non sono visibili al pubblico.

---

## Pubblicazione di un Articolo

Per pubblicare un articolo bozza e renderlo visibile sul sito web:

1. Apri l'articolo dalla tabella Articoli del Blog.
2. Rivedi tutto il contenuto, le immagini e le impostazioni SEO.
3. Clicca il pulsante **Pubblica** nell'angolo in alto a destra.
4. Nella finestra di conferma:
   - Rivedi il titolo e lo slug dell'articolo.
   - Conferma la pubblicazione.
5. Clicca **Conferma Pubblicazione**.

### Cosa Succede Dopo la Pubblicazione

- Lo stato dell'articolo cambia in **Pubblicato**.
- L'articolo diventa immediatamente visibile sulla pagina blog pubblica.
- La data di pubblicazione viene registrata (usata per l'ordinamento sul blog).
- L'URL dell'articolo diventa attivo: `https://petfolioo.com/blog/[slug]`.
- I motori di ricerca possono ora indicizzare l'articolo.

### Checklist di Pubblicazione

Prima di pubblicare, verifica:

- [ ] Il titolo è chiaro, coinvolgente e privo di errori
- [ ] Il contenuto è completo e formattato correttamente
- [ ] Tutte le immagini si caricano correttamente
- [ ] I link funzionano e si aprono nelle schede appropriate
- [ ] L'immagine di copertina è caricata e si presenta bene
- [ ] L'estratto è scritto ed è sotto i 500 caratteri
- [ ] I tag sono aggiunti e formattati correttamente
- [ ] Il meta title è sotto i 60 caratteri
- [ ] La meta description è sotto i 160 caratteri
- [ ] Lo slug è pulito e ricco di parole chiave

---

## Rimozione dalla Pubblicazione

Per rimuovere un articolo pubblicato dal sito web pubblico:

1. Trova l'articolo nella tabella Articoli del Blog.
2. Clicca il menu azioni (tre puntini) sulla riga.
3. Seleziona **Rimuovi Pubblicazione**.
4. Conferma l'azione nella finestra di dialogo.

### Cosa Succede Dopo la Rimozione

- Lo stato dell'articolo torna a **Bozza**.
- L'articolo viene immediatamente rimosso dalla pagina blog pubblica.
- L'URL restituisce una pagina 404.
- Il conteggio visualizzazioni viene preservato.
- Puoi ripubblicare l'articolo in qualsiasi momento.

> **Suggerimento:** Rimuovi dalla pubblicazione piuttosto che eliminare se vuoi rimuovere temporaneamente il contenuto. Gli articoli non pubblicati mantengono tutti i loro dati e possono essere ripristinati istantaneamente.

---

## Fissare/Rimuovere dall'Evidenza

Gli articoli in evidenza appaiono in modo prominente in cima alla pagina del blog, sopra gli elenchi cronologici.

### Fissare un Articolo

1. Trova un articolo pubblicato nella tabella Articoli del Blog.
2. Clicca il menu azioni (tre puntini).
3. Seleziona **Fissa in Evidenza**.
4. Il badge di stato cambia in **In Evidenza** (oro).

### Rimuovere dall'Evidenza

1. Trova l'articolo in evidenza nella tabella.
2. Clicca il menu azioni (tre puntini).
3. Seleziona **Rimuovi dall'Evidenza**.
4. Lo stato torna a **Pubblicato** (verde).

### Regole per gli Articoli in Evidenza

- Solo gli articoli pubblicati possono essere fissati.
- Più articoli possono essere in evidenza simultaneamente.
- Gli articoli in evidenza vengono visualizzati nell'ordine in cui sono stati fissati (il più recente prima).
- Rimuovere dall'evidenza un articolo non lo rimuove dalla pubblicazione; rimane pubblicato.

> **Suggerimento:** Limita gli articoli in evidenza a 2-3 alla volta. Troppi articoli in evidenza diluiscono l'enfasi e spingono il contenuto regolare sotto la piega.

---

## Visualizza sul Sito

Per vedere come appare un articolo pubblicato sul sito web pubblico:

1. Apri l'articolo dalla tabella Articoli del Blog.
2. Clicca il link **Visualizza sul Sito** nell'area in alto a destra (accanto al pulsante Pubblica).
3. Si apre una nuova scheda del browser che mostra l'articolo sul sito live.

### Note

- Il link Visualizza sul Sito è disponibile solo per gli articoli Pubblicati e In Evidenza.
- Gli articoli Bozza non possono essere visualizzati in anteprima sul sito live.
- Il link apre la versione live corrente; le modifiche non salvate nell'editor non sono riflesse.

> **Suggerimento:** Visualizza sempre sul sito dopo la pubblicazione per verificare che formattazione, immagini e layout appaiano correttamente nel tema pubblico.

---

## Eliminazione di un Articolo

Per eliminare permanentemente un articolo del blog:

1. Trova l'articolo nella tabella Articoli del Blog.
2. Clicca il menu azioni (tre puntini).
3. Seleziona **Elimina**.
4. Appare una finestra di conferma:
   - Mostra il titolo dell'articolo.
   - Avverte che l'eliminazione è permanente.
   - Chiede di digitare il titolo dell'articolo per confermare (per gli articoli pubblicati).
5. Clicca **Conferma Eliminazione**.

### Cosa Succede Dopo l'Eliminazione

- L'articolo viene permanentemente rimosso dal sistema.
- L'URL restituisce una pagina 404.
- L'articolo non può essere recuperato dopo l'eliminazione.
- Le statistiche delle visualizzazioni vanno perse.
- Lo slug diventa disponibile per il riutilizzo.

### Quando Eliminare vs. Rimuovere dalla Pubblicazione

| Scenario | Azione |
|----------|--------|
| Rimozione temporanea del contenuto | Rimuovi pubblicazione |
| Contenuto obsoleto che potrebbe essere aggiornato in seguito | Rimuovi pubblicazione |
| Articoli di test o duplicati accidentali | Elimina |
| Contenuto che non avrebbe mai dovuto essere creato | Elimina |
| Contenuto legalmente problematico | Elimina |

> **Suggerimento:** L'eliminazione è irreversibile. In caso di dubbio, rimuovi dalla pubblicazione. Puoi sempre eliminare un articolo non pubblicato in seguito, ma non puoi recuperare un articolo eliminato.

---

## Caricamento Immagini per le Copertine

Il componente di caricamento immagine di copertina supporta il seguente flusso di lavoro:

### Metodi di Caricamento

1. **Clicca per Caricare:** Clicca l'area di caricamento per aprire il file browser.
2. **Trascina e Rilascia:** Trascina un file immagine dal desktop direttamente sull'area di caricamento.

### Processo di Caricamento

1. Seleziona o rilascia il file immagine.
2. Appare la barra di avanzamento del caricamento.
3. Una volta completato, l'anteprima dell'immagine viene visualizzata nell'area di caricamento.
4. L'URL dell'immagine viene salvato automaticamente con l'articolo.

### Requisiti Immagine

| Requisito | Valore |
|-----------|--------|
| Formati | JPEG, PNG, WebP |
| Dimensioni minime | 600 x 315 pixel |
| Dimensioni consigliate | 1200 x 630 pixel |
| Dimensione massima file | 5 MB |
| Rapporto d'aspetto | 1.91:1 consigliato (ottimizzato per i social media) |

### Gestione delle Immagini Caricate

- **Sostituisci:** Clicca il pulsante **Rimuovi** sotto l'anteprima, poi carica una nuova immagine.
- **Anteprima:** Clicca l'anteprima dell'immagine per vederla a dimensione piena.
- **Testo alternativo:** Inserisci un testo alternativo descrittivo nel campo sotto l'immagine (importante per accessibilità e SEO).

### Ottimizzazione Immagini

Le immagini caricate vengono automaticamente:

- Compresse per la distribuzione web (preservando la qualità).
- Servite tramite CDN per un caricamento veloce.
- Convertite in formato WebP per i browser che lo supportano.
- Ridimensionate a dimensioni multiple per la visualizzazione responsive.

> **Suggerimento:** Prepara le immagini di copertina a 1200 x 630 pixel prima del caricamento. Questa è la dimensione ottimale sia per la visualizzazione del blog che per la condivisione sui social media (Open Graph).

---

## Domande Frequenti

**D: Più admin possono modificare lo stesso articolo?**
R: Sì, ma non c'è collaborazione in tempo reale. L'ultima persona che salva sovrascrive le modifiche precedenti. Coordinati con il team per evitare conflitti.

**D: C'è uno storico delle revisioni?**
R: No. Ogni salvataggio sovrascrive la versione precedente. Copia i contenuti importanti altrove prima di effettuare modifiche importanti.

**D: Posso programmare un articolo per la pubblicazione a una data futura?**
R: Non attualmente. Gli articoli sono bozze o immediatamente pubblicati. Salva come bozza e pubblica manualmente al momento desiderato.

**D: Cosa succede alla SEO se cambio lo slug di un articolo pubblicato?**
R: Il vecchio URL restituirà 404. I motori di ricerca alla fine deindicizzeranno il vecchio URL e indicizzeranno il nuovo. Evita di cambiare gli slug degli articoli consolidati.

**D: Posso incorporare video negli articoli del blog?**
R: Sì, usa la modalità sorgente HTML per incorporare iframe video da YouTube o Vimeo nell'area contenuti.

**D: C'è un limite di parole o caratteri per il contenuto degli articoli?**
R: Non c'è un limite rigido sulla lunghezza del contenuto. Tuttavia, articoli tra 800-2000 parole tendono a performare meglio per SEO e coinvolgimento dei lettori.
