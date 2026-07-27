# Impostazioni

La pagina Impostazioni fornisce opzioni di configurazione a livello di sistema per la piattaforma Petfolioo. Le impostazioni sono organizzate in tre schede: Generali, Notifiche e Sicurezza. Le modifiche apportate qui influenzano il comportamento sia del portale admin che dell'applicazione mobile.

![Settings](/docs/screenshots/settings.png)

---

## Panoramica

Solo gli amministratori con ruolo super_admin o admin (con accesso alla pagina Impostazioni) possono visualizzare e modificare le impostazioni. Tutte le modifiche richiedono un salvataggio esplicito e hanno effetto immediato dopo il salvataggio.

---

## Accesso alle Impostazioni

1. Clicca **Impostazioni** nel menu di navigazione laterale.
2. La pagina Impostazioni si carica con tre schede in alto.
3. La scheda **Generali** è selezionata per impostazione predefinita.

---

## Scheda Generali

La scheda Generali contiene le opzioni di configurazione principali dell'applicazione che definiscono come la piattaforma si presenta e opera.

### Campi

| Campo | Descrizione | Predefinito |
|-------|-------------|-------------|
| **Nome App** | Il nome visualizzato dell'applicazione mostrato nelle notifiche ed email | Petfolioo |
| **Email Supporto** | L'indirizzo email di contatto mostrato agli utenti per le richieste di supporto | -- |
| **Lingua Predefinita** | La lingua predefinita per i nuovi utenti e le comunicazioni di sistema | Inglese |
| **Modalità Manutenzione** | Toggle per abilitare o disabilitare la modalità manutenzione | Disattivata |

### Configurazione Impostazioni Generali

#### Nome App

1. Individua il campo **Nome App**.
2. Cancella il valore esistente e digita il nome dell'applicazione desiderato.
3. Questo nome appare nelle notifiche push, nelle intestazioni email e nella sezione informazioni dell'app mobile.

#### Email Supporto

1. Individua il campo **Email Supporto**.
2. Inserisci l'indirizzo email dove gli utenti devono indirizzare le richieste di supporto.
3. Questa email viene visualizzata nella schermata aiuto/contatti dell'app mobile.

> **Suggerimento:** Usa un'email di team condivisa (es. supporto@petfolioo.com) piuttosto che un indirizzo personale in modo che più membri del team possano rispondere.

#### Lingua Predefinita

1. Clicca il menu a tendina **Lingua Predefinita**.
2. Seleziona la lingua che verrà usata come predefinita per:
   - La creazione di nuovi account utente
   - Le notifiche generate dal sistema
   - I template email
3. Gli utenti possono sovrascrivere questa impostazione nelle impostazioni individuali dell'app mobile.

#### Modalità Manutenzione

La modalità manutenzione è una funzionalità critica che segnala agli utenti che la piattaforma è temporaneamente non disponibile.

1. Individua il toggle **Modalità Manutenzione**.
2. Clicca il toggle per abilitare la modalità manutenzione.
3. Appare una finestra di avviso che richiede conferma.

**Quando la Modalità Manutenzione è abilitata:**

| Effetto | Descrizione |
|---------|-------------|
| Avviso Portale Admin | Un banner prominente appare in cima al portale admin indicando che la modalità manutenzione è attiva |
| Impatto App Mobile | L'applicazione mobile mostra una schermata di manutenzione agli utenti, impedendo l'utilizzo normale |
| Comportamento API | Gli endpoint API restituiscono risposte di stato manutenzione |
| Accesso Admin | Gli amministratori possono ancora accedere normalmente al portale admin |

4. Per disabilitare la modalità manutenzione, clicca di nuovo il toggle.
5. Conferma l'azione nella finestra di dialogo.
6. La piattaforma torna immediatamente al funzionamento normale.

> **Attenzione:** Abilitare la modalità manutenzione influisce immediatamente su tutti gli utenti dell'app mobile. Abilitala solo durante finestre di manutenzione pianificate e comunica il programma in anticipo tramite notifica push.

---

## Scheda Notifiche

La scheda Notifiche controlla i comportamenti delle notifiche automatizzate -- gli avvisi generati dal sistema inviati agli utenti in base ai dati dei loro animali.

### Campi

| Campo | Descrizione | Tipo | Predefinito |
|-------|-------------|------|-------------|
| **Promemoria Vaccinazioni** | Invia promemoria automatici quando la vaccinazione di un animale si avvicina alla scadenza | Toggle | Attivato |
| **Avvisi Gravidanza** | Invia avvisi per le date milestone della gravidanza e il parto previsto | Toggle | Attivato |
| **Aggiornamenti Accoppiamento** | Invia aggiornamenti sugli eventi del calendario accoppiamenti e le conferme | Toggle | Attivato |
| **Giorni di Anticipo Promemoria** | Numero di giorni prima di una scadenza per inviare la notifica di promemoria | Input numerico | 7 |

### Configurazione Impostazioni Notifiche

#### Promemoria Vaccinazioni

1. Individua il toggle **Promemoria Vaccinazioni**.
2. Quando **abilitato** (predefinito):
   - Gli utenti ricevono notifiche push prima delle date di scadenza delle vaccinazioni dei loro animali.
   - La notifica viene inviata in base all'impostazione "Giorni di Anticipo Promemoria".
   - Esempio: Se impostato a 7 giorni, gli utenti ricevono un promemoria una settimana prima della scadenza della vaccinazione.
3. Quando **disabilitato**:
   - Nessun promemoria automatico per le vaccinazioni viene inviato.
   - Gli utenti devono controllare manualmente il programma vaccinale del loro animale.

#### Avvisi Gravidanza

1. Individua il toggle **Avvisi Gravidanza**.
2. Quando **abilitato** (predefinito):
   - Gli utenti che monitorano una gravidanza ricevono notifiche per le milestone.
   - Gli avvisi includono promemoria per la data di parto prevista e transizioni di fase.
   - Gli allevatori ricevono notifiche aggiuntive di monitoraggio professionale.
3. Quando **disabilitato**:
   - Nessun avviso automatico relativo alla gravidanza viene inviato.

#### Aggiornamenti Accoppiamento

1. Individua il toggle **Aggiornamenti Accoppiamento**.
2. Quando **abilitato** (predefinito):
   - Gli utenti ricevono notifiche sugli eventi di accoppiamento programmati.
   - Vengono inviate notifiche di conferma quando i registri di accoppiamento vengono registrati.
   - Gli allevatori ricevono suggerimenti di abbinamento e promemoria del programma.
3. Quando **disabilitato**:
   - Nessuna notifica automatica relativa all'accoppiamento viene inviata.

#### Giorni di Anticipo Promemoria

1. Individua l'input numerico **Giorni di Anticipo Promemoria**.
2. Inserisci il numero di giorni prima di una scadenza in cui i promemoria devono essere inviati.
3. Questo valore si applica a tutti i promemoria basati su date (vaccinazioni, appuntamenti).
4. Intervallo valido: da 1 a 30 giorni.

> **Suggerimento:** Un valore di 7 giorni funziona bene per la maggior parte degli utenti. Per gli allevatori che gestiscono più animali, considera di impostarlo a 14 giorni per dare più tempo di preparazione.

### Tabella Interazione Notifiche

| Impostazione | Influenza | Impatto Utente |
|-------------|-----------|----------------|
| Promemoria Vaccinazioni ATTIVO + 7 giorni | Utenti con animali che hanno vaccinazioni imminenti | "La vaccinazione antirabbica di Rex è in scadenza tra 7 giorni" |
| Avvisi Gravidanza ATTIVO | Utenti con registri di gravidanza attivi | "La gravidanza di Luna è entrata nella settimana 6" |
| Aggiornamenti Accoppiamento ATTIVO | Utenti con accoppiamenti programmati | "Appuntamento di accoppiamento con Max confermato per venerdì" |
| Tutti i toggle DISATTIVATI | Tutti gli utenti | Nessuna notifica automatizzata; solo notifiche manuali dell'admin |

---

## Scheda Sicurezza

La scheda Sicurezza contiene impostazioni che controllano il rate limiting delle API, la durata dei token di autenticazione e le restrizioni per il caricamento file.

### Campi

| Campo | Descrizione | Tipo | Predefinito |
|-------|-------------|------|-------------|
| **Rate Limit per Minuto** | Numero massimo di richieste API consentite per utente al minuto | Numero | 60 |
| **Scadenza Access Token (Ore)** | Per quanto tempo un access token rimane valido | Numero | 24 |
| **Scadenza Refresh Token (Giorni)** | Per quanto tempo un refresh token rimane valido | Numero | 30 |
| **Dimensione Massima Foto (MB)** | Dimensione massima consentita per le foto degli animali | Numero | 5 |
| **Dimensione Massima Avatar (MB)** | Dimensione massima consentita per gli avatar utente | Numero | 2 |
| **Tipi di File Consentiti** | Lista separata da virgole dei tipi MIME accettati per i caricamenti | Testo | image/jpeg,image/png,image/webp |

### Configurazione Impostazioni Sicurezza

#### Rate Limit per Minuto

1. Individua il campo **Rate Limit per Minuto**.
2. Inserisci il numero massimo di richieste API che un singolo utente può effettuare al minuto.
3. Le richieste che superano questo limite ricevono una risposta 429 (Too Many Requests).
4. Intervallo consigliato: 30-120 a seconda dei pattern di utilizzo previsti.

> **Importante:** Impostare un valore troppo basso potrebbe causare malfunzionamenti dell'app mobile per utenti attivi. Impostarlo troppo alto potrebbe lasciare il sistema vulnerabile ad abusi. Il valore predefinito di 60 è adatto alla maggior parte delle implementazioni.

#### Scadenza Access Token (Ore)

1. Individua il campo **Scadenza Access Token**.
2. Inserisci il numero di ore per cui un access token rimane valido dopo l'emissione.
3. Quando un token scade, l'app usa il refresh token per ottenerne uno nuovo.
4. Valori più brevi sono più sicuri; valori più lunghi riducono la frizione di login.

| Valore | Sicurezza | Esperienza Utente |
|--------|-----------|-------------------|
| 1 ora | Alta | Ri-autenticazione frequente |
| 24 ore | Media | Buon equilibrio (consigliato) |
| 72 ore | Inferiore | Interruzione minima |

#### Scadenza Refresh Token (Giorni)

1. Individua il campo **Scadenza Refresh Token**.
2. Inserisci il numero di giorni per cui un refresh token rimane valido.
3. Quando il refresh token scade, l'utente deve effettuare nuovamente il login con le proprie credenziali.
4. Intervallo consigliato: 7-90 giorni.

> **Suggerimento:** Per un'app consumer come Petfolioo, 30 giorni è un buon equilibrio. Gli utenti che aprono l'app almeno mensilmente non avranno mai bisogno di rifare il login. Per implementazioni a sicurezza più elevata, considera 7 giorni.

#### Dimensione Massima Foto (MB)

1. Individua il campo **Dimensione Massima Foto**.
2. Inserisci la dimensione massima del file in megabyte per i caricamenti di foto degli animali.
3. Le foto che superano questa dimensione vengono rifiutate con un messaggio di errore.
4. Considera i costi di archiviazione e i tempi di caricamento per utenti con connessioni lente.

| Valore | Adatto Per |
|--------|------------|
| 2 MB | Basso spazio di archiviazione, caricamenti veloci, qualità inferiore |
| 5 MB | Equilibrato (consigliato) |
| 10 MB | Foto di alta qualità, maggiore utilizzo di archiviazione |

#### Dimensione Massima Avatar (MB)

1. Individua il campo **Dimensione Massima Avatar**.
2. Inserisci la dimensione massima del file in megabyte per i caricamenti degli avatar profilo utente.
3. Gli avatar sono tipicamente più piccoli delle foto degli animali poiché vengono visualizzati a risoluzione ridotta.
4. Consigliato: 1-3 MB.

#### Tipi di File Consentiti

1. Individua il campo **Tipi di File Consentiti**.
2. Inserisci una lista separata da virgole di tipi MIME che il sistema accetta per i caricamenti.
3. Ogni tipo MIME deve essere nel formato `tipo/sottotipo`.
4. Non aggiungere spazi tra le voci a meno che non li voglia intenzionalmente nella stringa del tipo MIME.

**Tipi MIME comuni per caricamenti immagini:**

| Tipo MIME | Formato | Note |
|-----------|---------|------|
| `image/jpeg` | JPEG | Formato foto più comune, buona compressione |
| `image/png` | PNG | Senza perdita, supporta trasparenza |
| `image/webp` | WebP | Formato moderno, eccellente compressione |
| `image/heic` | HEIC | Formato Apple, usato dalle fotocamere iPhone |
| `image/gif` | GIF | Immagini animate, dimensioni file maggiori |

**Configurazioni di esempio:**

```
Standard:     image/jpeg,image/png,image/webp
Estesa:       image/jpeg,image/png,image/webp,image/heic,image/gif
Minimale:     image/jpeg,image/png
```

> **Attenzione:** Aggiungere tipi MIME non supportati potrebbe consentire caricamenti che il sistema non può elaborare. Aggiungi solo tipi che la tua pipeline di elaborazione immagini supporta.

---

## Salvataggio delle Impostazioni

Tutte le modifiche alle impostazioni richiedono un'azione di salvataggio esplicita.

### Procedura di Salvataggio

1. Apporta le modifiche desiderate in una qualsiasi delle tre schede.
2. Clicca il pulsante **Salva Impostazioni** in fondo alla pagina.
3. Un indicatore di caricamento appare mentre le modifiche vengono applicate.
4. Una notifica di successo conferma che le impostazioni sono state salvate.
5. Le modifiche hanno effetto immediato su tutta la piattaforma.

### Note Importanti sul Salvataggio

- Le modifiche **non** vengono salvate automaticamente. Se navighi altrove senza salvare, le modifiche vanno perse.
- Puoi modificare impostazioni su più schede prima di salvare -- tutte le modifiche vengono salvate insieme.
- Se si verifica un errore di validazione, il campo specifico viene evidenziato con un messaggio di errore.
- Solo i campi modificati vengono inviati al server (aggiornamento parziale ottimistico).

> **Suggerimento:** Dopo aver salvato modifiche relative alla sicurezza (rate limit, scadenza token), monitora il sistema per un breve periodo per assicurarti che non si verifichino comportamenti imprevisti.

---

## Audit Modifiche Impostazioni

Tutte le modifiche alle impostazioni vengono registrate per sicurezza e responsabilità:

| Informazione Registrata | Descrizione |
|------------------------|-------------|
| Nome admin | Chi ha effettuato la modifica |
| Timestamp | Quando la modifica è stata effettuata |
| Campo modificato | Quale impostazione è stata modificata |
| Valore precedente | Il valore prima della modifica |
| Nuovo valore | Il valore dopo la modifica |

---

## Risoluzione Problemi

| Problema | Soluzione |
|----------|----------|
| Impossibile accedere alla pagina Impostazioni | Verifica che il tuo ruolo sia super_admin o admin con permesso Impostazioni concesso. |
| Pulsante Salva disabilitato | Non sono state apportate modifiche. Modifica almeno un campo per abilitare il salvataggio. |
| Errore di validazione al salvataggio | Controlla il campo evidenziato per il messaggio di errore specifico e correggi il valore. |
| La modalità manutenzione non influisce sull'app | Concedi 1-2 minuti affinché la modifica si propaghi a tutte le istanze dell'app mobile. |
| Rate limit troppo restrittivo | Aumenta il valore e salva. Gli utenti interessati verranno sbloccati entro un minuto. |
| Errori di caricamento file dopo modifica tipo | Assicurati che i tipi MIME siano formattati correttamente senza virgole o spazi finali. |

---

## Pagine Correlate

- [Utenti Admin](./admin-users.md) -- Gestisci chi può accedere e modificare le impostazioni
- [Notifiche](./notifications.md) -- Invia notifiche manuali agli utenti
- [Analytics](./analytics.md) -- Monitora la salute e l'utilizzo della piattaforma
