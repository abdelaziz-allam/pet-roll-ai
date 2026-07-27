# Guida Rapida: Super Admin

Benvenuto nel Portale di Amministrazione di Petfolioo. Come Super Admin, hai accesso illimitato a tutte le pagine, azioni e opzioni di configurazione della piattaforma. Questa guida copre il tuo primo giorno, i flussi di lavoro quotidiani e le responsabilita.

---

## Pagine Disponibili

| Pagina | Azioni Disponibili |
|--------|-------------------|
| Dashboard | View KPI e analisi della piattaforma |
| App Users | View, Create, Edit, Ban, Delete, Export |
| Pets | View, Edit, Delete |
| Pet Categories | View, Create, Edit, Delete |
| Verification | View, Approve, Reject |
| Mating | View, Edit, Delete, Moderate |
| Health Certs | View, Approve, Reject |
| Vax Analytics | View, Export |
| Feedback | View, Respond, Delete |
| Blog | View, Create, Edit, Delete |
| Notifications | View, Send, Delete |
| Analytics | View, Export |
| Admin Users | View, Create, Edit, Delete, Manage Permissions |
| Settings | View, Edit |

Hai accesso a tutto. Nessuna pagina e nascosta dalla tua barra laterale.

---

## Primi Passi Dopo il Login Iniziale

1. **Verifica il tuo profilo** - Clicca sul tuo avatar in alto a destra e conferma che i dettagli del tuo account siano corretti.
2. **Configura le impostazioni della piattaforma** - Naviga su Settings e rivedi la configurazione generale della piattaforma (branding, feature flag, impostazioni predefinite delle notifiche).
3. **Crea account amministratore aggiuntivi** - Vai su Admin Users e crea account per i membri del tuo team con i ruoli appropriati.
4. **Configura le categorie degli animali** - Visita Pet Categories e assicurati che la tassonomia di specie e razze sia configurata per la tua regione.
5. **Rivedi il Dashboard** - Familiarizza con le schede KPI per sapere come appare la "normalita".

---

## Checklist delle Attivita Quotidiane

- [ ] Controlla il Dashboard per verificare lo stato della piattaforma e rilevare anomalie
- [ ] Rivedi le verifiche in sospeso nella coda di Verification
- [ ] Esamina Feedback alla ricerca di reclami urgenti degli utenti o segnalazioni di bug
- [ ] Controlla la lista di Admin Users per richieste di accesso o account sospetti
- [ ] Consulta Analytics per tendenze nella crescita degli utenti e nell'engagement
- [ ] Monitora gli annunci di Mating per flag di moderazione
- [ ] Rivedi le notifiche inviate da altri amministratori per verificarne l'appropriatezza
- [ ] Verifica periodicamente Settings per rilevare modifiche impreviste

---

## Responsabilita Chiave

### Configurazione del Sistema
Sei l'unico ruolo che puo accedere alla pagina Settings. Questo include il branding della piattaforma, toggle delle funzionalita, chiavi API e template delle notifiche. Rivedili trimestralmente o al lancio di nuove funzionalita.

### Gestione Utenti
Solo tu puoi creare, modificare ed eliminare account amministratore. Quando inserisci nuovi membri del team, assegna il ruolo minimo necessario (preferisci Moderator o Viewer a meno che non abbiano realmente bisogno dell'accesso Admin).

### Supervisione della Sicurezza
- Mantieni il numero di account Super Admin a un massimo di 2-3.
- Rivedi l'attivita degli utenti amministratore trimestralmente e sospendi gli account inutilizzati.
- Sei l'unico ruolo che puo eliminare utenti dell'app ed esportare dati utente, quindi gestisci personalmente le richieste GDPR e relative ai dati.

### Punto di Escalation
Gli altri ruoli escaleranno verso di te quando necessitano azioni al di fuori dei loro permessi: eliminare utenti, esportare dati, modificare impostazioni o gestire account amministratore.

---

## Consigli per Delegare il Lavoro

| Attivita | Delegare A |
|----------|-----------|
| Revisioni giornaliere delle verifiche | Admin o Moderator |
| Moderazione Mating | Admin o Moderator |
| Correzioni dati animali | Admin o Moderator |
| Invio notifiche della piattaforma | Admin |
| Monitoraggio e reportistica analitica | Admin o Viewer |
| Blocco utenti problematici | Admin o Moderator |
| Gestione contenuti del blog | Admin |

Riserva il tuo tempo per attivita che solo tu puoi svolgere: modifiche alle impostazioni, gestione utenti amministratore, esportazione dati e audit di sicurezza. Piu deleghi il lavoro operativo, piu capacita avrai per la supervisione strategica.

---

## Ottenere Aiuto

Come ruolo con il privilegio piu alto, il tuo percorso di supporto e la documentazione tecnica della piattaforma e il team di sviluppo. Per domande operative, consulta le altre pagine di questo manuale utente.

---

*Successivo: [Ruoli e Permessi](./roles-permissions.md) - Analisi completa di cio che ogni ruolo puo fare.*
