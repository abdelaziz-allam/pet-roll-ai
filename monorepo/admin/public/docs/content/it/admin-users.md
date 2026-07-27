# Utenti Admin

La pagina Utenti Admin consente di gestire gli account amministratore che hanno accesso al portale admin di Petfolioo. Qui puoi creare nuovi admin, assegnare ruoli, configurare permessi granulari e controllare lo stato degli account.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Panoramica

Il controllo degli accessi è fondamentale per mantenere la sicurezza e l'integrità operativa. Il sistema Utenti Admin supporta l'accesso basato sui ruoli con granularità aggiuntiva dei permessi per pagina, garantendo che ogni membro del team abbia esattamente l'accesso di cui ha bisogno.

---

## Tabella Utenti Admin

La vista principale mostra una tabella di tutti gli account amministratore nel sistema.

### Colonne della Tabella

| Colonna | Descrizione |
|---------|-------------|
| **Nome** | Il nome visualizzato dell'admin mostrato in tutto il portale |
| **Email** | L'indirizzo email di login per l'account admin |
| **Ruolo** | Il ruolo assegnato che determina il livello base di permessi |
| **Stato** | Stato attuale dell'account: Attivo o Sospeso |
| **Azioni** | Pulsanti azione Modifica ed Elimina |

### Funzionalità della Tabella

1. La tabella è ordinabile cliccando sulle intestazioni delle colonne.
2. Una casella di ricerca sopra la tabella permette il filtraggio per nome o email.
3. I controlli di paginazione appaiono in basso per team admin numerosi.
4. Gli account attivi mostrano un badge di stato verde; gli account sospesi mostrano un badge rosso.

---

## Ruoli

A ogni account admin viene assegnato uno dei quattro ruoli. I ruoli definiscono il livello base di accesso prima che vengano applicati eventuali override di permessi granulari.

### Definizione dei Ruoli

| Ruolo | Livello di Accesso | Descrizione |
|-------|-------------------|-------------|
| **super_admin** | Completo senza restrizioni | Accesso completo a tutte le pagine, funzionalità e impostazioni di sistema. Non può essere eliminato né avere permessi limitati. |
| **admin** | Tutti i contenuti e utenti | Accesso completo a gestione contenuti, gestione utenti, feedback, notifiche e analytics. Non può accedere alle impostazioni a livello di sistema. |
| **moderator** | Revisione e moderazione | Può revisionare e moderare contenuti come feedback, profili segnalati e voci contrassegnate. Non può creare o eliminare risorse. |
| **viewer** | Sola lettura | Può visualizzare tutte le pagine a cui ha accesso ma non può creare, modificare o eliminare alcun record. Ideale per stakeholder che necessitano di visibilità. |

### Gerarchia dei Ruoli

La gerarchia dei ruoli determina quali ruoli possono gestire altri ruoli:

1. **super_admin** può gestire tutti gli altri ruoli (admin, moderator, viewer).
2. **admin** può gestire account moderator e viewer.
3. **moderator** non può gestire alcun account admin.
4. **viewer** non può gestire alcun account admin.

> **Importante:** Non puoi assegnare un ruolo superiore al tuo. Solo un super_admin può creare un altro super_admin.

---

## Creazione di un Admin

Per aggiungere un nuovo account amministratore al portale:

### Procedura

1. Clicca il pulsante **Aggiungi Admin** nell'angolo in alto a destra della pagina Utenti Admin.
2. Appare una finestra di dialogo con il modulo di creazione con i seguenti campi:

| Campo | Descrizione | Requisiti |
|-------|-------------|-----------|
| **Email** | L'email di login per il nuovo admin | Obbligatorio. Deve essere un indirizzo email valido e univoco. |
| **Nome Visualizzato** | Il nome mostrato nell'interfaccia del portale | Obbligatorio. 2-50 caratteri. |
| **Password** | La password iniziale di login | Obbligatoria. Minimo 8 caratteri, deve includere maiuscola, minuscola e un numero. |
| **Ruolo** | Il ruolo di accesso per questo admin | Obbligatorio. Seleziona dal menu a tendina. |

3. Compila il campo **Email** con l'indirizzo email del nuovo admin.
4. Inserisci un **Nome Visualizzato** che identificherà questo admin nel portale.
5. Imposta una **Password** iniziale che soddisfi i requisiti di complessità.
6. Seleziona il **Ruolo** appropriato dal menu a tendina.
7. Clicca **Crea** per aggiungere l'account admin.
8. Un messaggio di successo conferma che l'account è stato creato.
9. Il nuovo admin appare nella tabella e può ora effettuare il login.

> **Suggerimento:** Dopo aver creato un account, informa il nuovo admin delle sue credenziali attraverso un canale sicuro. Raccomanda di cambiare la password al primo login.

---

## Modifica di un Admin

Puoi modificare il nome visualizzato, il ruolo e lo stato di un admin esistente.

### Procedura

1. Individua l'admin nella tabella Utenti Admin.
2. Clicca il pulsante **Modifica** (icona matita) nella colonna Azioni.
3. Appare una finestra di dialogo di modifica con i valori attuali precompilati.

### Campi Modificabili

| Campo | Descrizione | Note |
|-------|-------------|------|
| **Nome Visualizzato** | Aggiorna il nome visibile dell'admin | 2-50 caratteri |
| **Ruolo** | Cambia il livello di accesso dell'admin | Non puoi assegnare un ruolo superiore al tuo |
| **Stato** | Imposta su Attivo o Sospeso | Gli admin sospesi non possono effettuare il login |

4. Modifica i campi secondo necessità.
5. Clicca **Salva Modifiche** per applicare gli aggiornamenti.
6. Un messaggio di successo conferma che le modifiche sono state salvate.

### Modifica dello Stato

- **Attivo** -- L'admin può effettuare il login e usare il portale normalmente.
- **Sospeso** -- L'admin non può effettuare il login. Le sessioni esistenti vengono terminate immediatamente.

> **Nota:** Sospendere un admin è reversibile. Usalo quando hai bisogno di revocare temporaneamente l'accesso senza eliminare l'account.

### Restrizioni

- Non puoi modificare il tuo stesso ruolo (per prevenire auto-declassamenti accidentali).
- Non puoi cambiare il ruolo di un super_admin a meno che tu non sia anche un super_admin.
- L'email non può essere cambiata dopo la creazione dell'account.

---

## Configurazione Permessi Granulari per Pagina

Oltre ai ruoli, il portale admin supporta un controllo dei permessi a grana fine per pagina. Questo ti consente di personalizzare esattamente quali pagine e azioni ogni admin può accedere.

### Accesso alla Configurazione Permessi

1. Clicca il pulsante **Modifica** sull'admin che vuoi configurare.
2. Nella finestra di modifica, naviga alla sezione **Permessi** (o scheda).
3. Viene visualizzata una matrice dei permessi che mostra tutte le pagine del portale.

### Struttura della Matrice Permessi

La matrice dei permessi mostra ogni pagina del portale come una riga con i seguenti controlli:

| Controllo | Descrizione |
|-----------|-------------|
| **Toggle Accesso** | Un interruttore che abilita o disabilita l'accesso all'intera pagina |
| **Multi-selezione Azioni** | Un menu a tendina che permette di selezionare quali azioni specifiche sono consentite su quella pagina |

### Pagine Disponibili nella Matrice

| Pagina | Azioni Possibili |
|--------|-----------------|
| Dashboard | Visualizza |
| Utenti | Visualizza, Crea, Modifica, Elimina, Sospendi |
| Animali | Visualizza, Crea, Modifica, Elimina |
| Cartelle Cliniche | Visualizza, Crea, Modifica, Elimina |
| Vaccinazioni | Visualizza, Crea, Modifica, Elimina |
| Allevamento | Visualizza, Crea, Modifica, Elimina |
| Feedback | Visualizza, Rispondi, Chiudi, Fissa |
| Notifiche | Visualizza, Invia |
| Analytics | Visualizza, Esporta |
| Impostazioni | Visualizza, Modifica |
| Utenti Admin | Visualizza, Crea, Modifica, Elimina |

### Configurazione dei Permessi

1. Per ogni riga di pagina, attiva/disattiva l'interruttore **Accesso**:
   - **ATTIVO** -- L'admin può accedere a questa pagina (azioni specifiche controllate sotto).
   - **DISATTIVATO** -- L'admin non può vedere né navigare a questa pagina.
2. Per le pagine con accesso abilitato, clicca il menu multi-selezione **Azioni**.
3. Seleziona le azioni specifiche che questo admin è autorizzato a eseguire:
   - Seleziona ogni azione che vuoi concedere.
   - Deseleziona le azioni che vuoi limitare.
4. Ripeti per ogni pagina secondo necessità.
5. Clicca **Salva Modifiche** per applicare la configurazione dei permessi.

### Come i Permessi Interagiscono con i Ruoli

- I permessi del ruolo servono come **linea base**.
- I permessi per pagina possono **restringere** l'accesso al di sotto della linea base del ruolo.
- I permessi per pagina **non possono concedere** accesso oltre quanto consentito dal ruolo.
- Per esempio: Un utente con ruolo admin ha accesso a tutte le pagine di contenuto per impostazione predefinita. Puoi restringere il suo accesso alla pagina Allevamento disattivandola, ma non puoi concedergli l'accesso alle Impostazioni (riservato al super_admin).

> **Suggerimento:** Usa i permessi granulari quando hai membri del team che necessitano di un sottoinsieme specifico di capacità admin. Per esempio, un agente del supporto clienti potrebbe avere ruolo "admin" ma essere limitato alle sole pagine Feedback e Utenti.

---

## Eliminazione di un Admin

La rimozione di un account admin lo elimina permanentemente dal sistema.

### Procedura

1. Individua l'admin nella tabella Utenti Admin.
2. Clicca il pulsante **Elimina** (icona cestino) nella colonna Azioni.
3. Appare una finestra di conferma con il nome e l'email dell'admin.
4. Digita l'indirizzo email dell'admin per confermare l'eliminazione (misura di sicurezza).
5. Clicca **Conferma Eliminazione** per rimuovere permanentemente l'account.
6. Un messaggio di successo conferma l'eliminazione.
7. L'admin viene rimosso dalla tabella e non può più effettuare il login.

### Restrizioni all'Eliminazione

| Restrizione | Motivo |
|-------------|--------|
| Non si può eliminare un super_admin | Previene il blocco accidentale del sistema |
| Non si può eliminare il proprio account | Previene l'auto-rimozione |
| Non si può eliminare senza ruolo sufficiente | Si applicano le regole della gerarchia dei ruoli |

> **Attenzione:** L'eliminazione è permanente e non può essere annullata. Se hai bisogno di rimuovere temporaneamente l'accesso, usa lo stato Sospeso.

---

## Spiegazione della Matrice Permessi

Il sistema dei permessi in Petfolioo usa un approccio a livelli:

### Livello 1: Controllo Accesso Basato sui Ruoli (RBAC)

Ogni ruolo ha un set predefinito di permessi che serve come punto di partenza:

```
super_admin  -->  Tutte le pagine, tutte le azioni, nessuna restrizione
admin        -->  Tutte le pagine contenuto/utenti, tutte le azioni (eccetto Impostazioni)
moderator    -->  Pagine di revisione contenuti, azioni limitate (visualizza, rispondi, chiudi)
viewer       -->  Tutte le pagine accessibili, solo visualizzazione
```

### Livello 2: Override per Pagina

I permessi granulari aggiungono un secondo livello sopra il RBAC:

```
Permessi del ruolo  (linea base)
    |
    v
Toggle per pagina  (possono restringere, non possono espandere oltre il ruolo)
    |
    v
Permessi effettivi finali  (ciò che l'admin effettivamente vede)
```

### Scenari di Esempio

**Scenario 1: Agente Supporto Clienti**
- Ruolo: admin
- Override: Disabilita accesso a Animali, Cartelle Cliniche, Allevamento, Analytics, Utenti Admin
- Risultato: Può accedere solo a Dashboard, Utenti, Feedback e Notifiche

**Scenario 2: Revisore Contenuti**
- Ruolo: moderator
- Override: Abilita Feedback (Visualizza, Rispondi, Chiudi), Utenti (solo Visualizza)
- Risultato: Può revisionare il feedback e consultare i profili utente ma non può modificare gli utenti

**Scenario 3: Osservatore Analytics**
- Ruolo: viewer
- Override: Abilita solo Dashboard e Analytics
- Risultato: Può visualizzare grafici e metriche ma nient'altro

### Visualizzazione dei Permessi Effettivi

1. Apri la finestra di modifica per qualsiasi admin.
2. La sezione Permessi mostra lo stato effettivo corrente.
3. Toggle e selezioni azioni riflettono ciò che è attualmente concesso.
4. Le azioni disabilitate (grigie) indicano quelle oltre il permesso del ruolo.

---

## Best Practice di Sicurezza

1. **Principio del minimo privilegio** -- Assegna il ruolo e i permessi minimi necessari per la funzione lavorativa di ogni admin.
2. **Audit regolari** -- Rivedi gli account admin trimestralmente. Rimuovi gli account non più necessari.
3. **Sospendi prima di eliminare** -- Quando dismissioni qualcuno, sospendi prima per assicurarti che non ci siano interruzioni, poi elimina dopo un periodo di grazia.
4. **Limita i super_admin** -- Mantieni il numero di account super_admin al minimo (idealmente 1-2).
5. **Password forti** -- Imponi password complesse e raccomanda l'uso di password manager.
6. **Monitora l'attività** -- Controlla chi effettua il login e quando attraverso i log di sistema.

---

## Risoluzione Problemi

| Problema | Soluzione |
|----------|----------|
| Non riesco a creare un admin | Verifica di avere privilegi di ruolo sufficienti. Controlla che l'email non sia già in uso. |
| Non vedo i pulsanti Modifica/Elimina | Il tuo ruolo non ha il permesso di gestire admin al livello o al di sopra del livello del ruolo target. |
| L'admin non riesce ad accedere dopo la creazione | Verifica che lo stato dell'account sia Attivo. Conferma che la password sia stata inserita correttamente. |
| Le modifiche ai permessi non hanno effetto | L'admin potrebbe dover effettuare logout e login affinché le modifiche ai permessi si applichino. |
| Non riesco a eliminare un super_admin | Questo è intenzionale. Gli account super_admin non possono essere eliminati tramite l'interfaccia. |

---

## Pagine Correlate

- [Impostazioni](./settings.md) -- Configura le impostazioni di sicurezza del sistema
- [Feedback](./feedback.md) -- Gestisci il feedback degli utenti (richiede accesso alla pagina Feedback)
- [Analytics](./analytics.md) -- Visualizza le metriche della piattaforma (richiede accesso alla pagina Analytics)
