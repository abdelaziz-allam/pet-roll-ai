# Roles & Permissions

Il portale di amministrazione Petfolioo utilizza un sistema di controllo degli accessi basato sui ruoli (RBAC) per gestire ciò che ogni amministratore può visualizzare e fare. A ogni utente amministratore viene assegnato un ruolo e ogni ruolo definisce un insieme di accessi a livello di pagina e permessi a livello di azione.

---

## Panoramica dei ruoli

La piattaforma supporta quattro ruoli amministrativi, ciascuno con un insieme progressivamente più ampio di funzionalità:

| Ruolo | Descrizione | Caso d'uso tipico |
|-------|-------------|-------------------|
| **Super Admin** | Accesso completo e illimitato a tutte le pagine e azioni | Proprietario della piattaforma, CTO, amministratore principale |
| **Admin** | Ampio accesso alle pagine operative; nessun accesso alle impostazioni di sistema o alla gestione degli utenti admin | Responsabile della piattaforma, responsabile operativo |
| **Moderator** | Accesso mirato alle attività di moderazione dei contenuti (verifiche, accoppiamento, animali) | Community manager, revisore di contenuti |
| **Viewer** | Accesso in sola lettura alla maggior parte delle pagine; non può creare, modificare o eliminare nulla | Agente di supporto, stakeholder, revisore |

---

## Struttura dei permessi

I permessi sono definiti su due livelli:

### 1. Accesso alle pagine

A ogni ruolo viene concesso o negato l'accesso a pagine specifiche. Se un ruolo non ha accesso a una pagina, questa non appare nella navigazione laterale e l'accesso diretto tramite URL viene bloccato.

### 2. Permessi sulle azioni

All'interno di una pagina a cui un ruolo può accedere, azioni specifiche possono essere abilitate o disabilitate. Ad esempio, un Moderator può **visualizzare** gli animali ma non **eliminarli**.

---

## Matrice dei permessi

La seguente matrice mostra esattamente cosa può fare ogni ruolo su ciascuna pagina.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Visibilità delle pagine per ruolo

Questa tabella riassume quali pagine appaiono nella navigazione laterale per ciascun ruolo:

| Pagina | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Come i permessi influenzano la UI

Quando un utente non ha il permesso per un'azione specifica, il portale di amministrazione adatta l'interfaccia di conseguenza:

| Scenario | Comportamento della UI |
|----------|------------------------|
| Nessun accesso alla pagina | Pagina rimossa dalla barra laterale; URL restituisce 403 |
| Solo visualizzazione (no edit/delete) | Pulsanti azione nascosti; le righe della tabella non sono cliccabili per la modifica |
| Nessun permesso di creazione | Pulsante "Create" / "Add" nascosto |
| Nessun permesso di eliminazione | Opzione Delete rimossa dai menu azione |
| Nessun permesso di esportazione | Pulsante Export nascosto |
| Nessun permesso approve/reject | Pulsanti azione di verifica nascosti; stato mostrato in sola lettura |

> **Nota:** La UI nasconde le azioni non disponibili anziché mostrare pulsanti disabilitati. Questo mantiene l'interfaccia pulita ed evita confusione su ciò che è o non è consentito.

---

## Gestione dei permessi

Solo gli utenti **Super Admin** possono creare, modificare o eliminare account amministratore e modificarne i permessi.

### Assegnazione di un ruolo

1. Naviga verso **Admin Users** nella barra laterale.
2. Clicca su **Create Admin User** o modifica un utente esistente.
3. Seleziona il ruolo desiderato dal menu a tendina Ruolo.
4. Se selezioni **Super Admin**, tutti i permessi vengono automaticamente concessi e non possono essere personalizzati.
5. Per gli altri ruoli, personalizza l'accesso alle pagine e le azioni utilizzando l'editor dei permessi.

### Permessi personalizzati

Sebbene ogni ruolo abbia permessi tipici, il sistema supporta la personalizzazione per singolo utente:

- A un **Admin** può essere concesso l'accesso a Settings se necessario.
- A un **Moderator** può essere dato l'accesso in visualizzazione ad Analytics.
- Un **Viewer** può essere limitato a meno pagine rispetto all'impostazione predefinita.

I permessi personalizzati sovrascrivono quelli predefiniti del ruolo. L'etichetta del ruolo rimane la stessa ma l'accesso effettivo è ciò che conta.

### Editor dei permessi

L'editor dei permessi mostra un'interfaccia a checklist:

1. Ogni pagina appare come una sezione con un interruttore per l'accesso alla pagina.
2. Quando l'accesso alla pagina è abilitato, le azioni disponibili per quella pagina appaiono come caselle di controllo.
3. Seleziona o deseleziona singole azioni per regolare con precisione le capacità dell'utente.
4. Clicca su **Save** per applicare immediatamente le modifiche.

> **Importante:** Le modifiche ai permessi hanno effetto al prossimo caricamento di pagina dell'utente. Se l'utente è attualmente connesso, vedrà i permessi aggiornati dopo aver aggiornato il browser.

---

## Riferimento rapido comparativo dei ruoli

### Super Admin
- Può fare tutto
- Unico ruolo che può gestire utenti admin e impostazioni di sistema
- Unico ruolo che può eliminare utenti app e notifiche
- Unico ruolo che può esportare dati utente
- Non può essere eliminato se è l'ultimo account Super Admin

### Admin
- Accesso operativo completo a contenuti e gestione utenti
- Può approvare/rifiutare verifiche
- Può gestire il marketplace di accoppiamento
- Può inviare notifiche
- Non può accedere alle pagine Settings o Admin Users
- Non può eliminare utenti app (solo bannare)

### Moderator
- Focalizzato sulla qualità dei contenuti e la sicurezza della community
- Può approvare/rifiutare verifiche degli allevatori
- Può moderare gli annunci di accoppiamento
- Può modificare gli animali (correggere informazioni errate)
- Può bannare utenti problematici
- Non può accedere ad Analytics, Settings o Admin Users
- Non può creare o eliminare contenuti

### Viewer
- Accesso in sola lettura per scopi di supervisione
- Può visualizzare dashboard, utenti, animali, analytics
- Non può modificare alcun dato
- Non può inviare notifiche o approvare verifiche
- Utile per stakeholder che necessitano visibilità senza rischi

---

## Considerazioni sulla sicurezza

| Pratica | Descrizione |
|---------|-------------|
| Privilegio minimo | Assegnare il ruolo minimo necessario per le responsabilità dell'utente |
| Audit regolare | Rivedere la lista degli utenti admin trimestralmente; disabilitare gli account inutilizzati |
| Account separati | Ogni amministratore dovrebbe avere il proprio account (nessun login condiviso) |
| Limite Super Admin | Mantenere il numero di Super Admin a un massimo di 2-3 |
| Sospendere, non eliminare | Quando un admin se ne va, sospendere il suo account anziché eliminarlo (preserva la traccia di audit) |

---

## Domande frequenti

**D: Posso creare un ruolo personalizzato?**
R: Il sistema ha quattro ruoli fissi (Super Admin, Admin, Moderator, Viewer). Tuttavia, puoi personalizzare i permessi di qualsiasi singolo utente indipendentemente dall'etichetta del ruolo.

**D: Cosa succede se rimuovo l'accesso a una pagina per un utente che la sta attualmente visualizzando?**
R: L'utente vedrà un errore 403 alla prossima navigazione o aggiornamento della pagina. La sua sessione non viene interrotta.

**D: Un Super Admin può declassare se stesso?**
R: Un Super Admin può cambiare il proprio ruolo, ma il sistema impedisce la rimozione completa dell'ultimo account Super Admin.

**D: I permessi influenzano il Manuale Utente?**
R: No. Tutti gli utenti admin possono accedere al Manuale Utente indipendentemente dal loro ruolo o permessi. La documentazione è sempre disponibile.

**D: Posso vedere un registro di audit delle modifiche ai permessi?**
R: Le modifiche ai permessi vengono registrate con un timestamp e l'ID dell'amministratore che ha effettuato la modifica. Questi dati sono memorizzati nei campi `updatedBy` e `updatedAt` di ogni record utente admin.
