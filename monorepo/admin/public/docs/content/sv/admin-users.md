# Adminanvändare

Sidan Adminanvändare låter dig hantera de administratörskonton som har åtkomst till Petfolioo adminportalen. Här kan du skapa nya administratörer, tilldela roller, konfigurera detaljerade behörigheter och kontrollera kontostatus.

![Admin Users](/docs/screenshots/admin-users.png)

---

## Översikt

Åtkomstkontroll är avgörande för att upprätthålla säkerhet och driftsintegritet. Adminanvändarsystemet stöder rollbaserad åtkomst med ytterligare behörighetsgranularitet per sida, vilket säkerställer att varje teammedlem har exakt den åtkomst de behöver.

---

## Tabell med adminanvändare

Huvudvyn visar en tabell över alla administratörskonton i systemet.

### Tabellkolumner

| Kolumn | Beskrivning |
|--------|-------------|
| **Namn** | Administratörens visningsnamn som visas i portalen |
| **E-post** | Inloggnings-e-postadressen för administratörskontot |
| **Roll** | Den tilldelade rollen som bestämmer grundläggande behörighetsnivå |
| **Status** | Aktuell kontostatus: Aktiv eller Avstängd |
| **Åtgärder** | Knappar för Redigera och Ta bort |

### Tabellfunktioner

1. Tabellen är sorterbar genom att klicka på kolumnrubriker.
2. En sökruta ovanför tabellen tillåter filtrering efter namn eller e-post.
3. Pagineringskontroller visas längst ned för stora administratörsteam.
4. Aktiva konton visar ett grönt statusmärke; avstängda konton visar ett rött märke.

---

## Roller

Varje administratörskonto tilldelas en av fyra roller. Roller definierar den grundläggande åtkomstnivån innan eventuella detaljerade behörighetsåsidosättningar tillämpas.

### Rolldefinitioner

| Roll | Åtkomstnivå | Beskrivning |
|------|-------------|-------------|
| **super_admin** | Full obegränsad | Fullständig åtkomst till alla sidor, funktioner och systeminställningar. Kan inte tas bort eller få behörigheter begränsade. |
| **admin** | Allt innehåll och användare | Full åtkomst till innehållshantering, användarhantering, feedback, notifikationer och analyser. Kan inte komma åt systeminställningar. |
| **moderator** | Granska och moderera | Kan granska och moderera innehåll som feedback, rapporterade profiler och flaggade poster. Kan inte skapa eller ta bort resurser. |
| **viewer** | Skrivskyddad | Kan visa alla sidor de har åtkomst till men kan inte skapa, redigera eller ta bort poster. Idealisk för intressenter som behöver insyn. |

### Rollhierarki

Rollhierarkin bestämmer vilka roller som kan hantera andra roller:

1. **super_admin** kan hantera alla andra roller (admin, moderator, viewer).
2. **admin** kan hantera moderator- och viewer-konton.
3. **moderator** kan inte hantera några administratörskonton.
4. **viewer** kan inte hantera några administratörskonton.

> **Viktigt:** Du kan inte tilldela en roll högre än din egen. Endast en super_admin kan skapa en annan super_admin.

---

## Skapa en administratör

För att lägga till ett nytt administratörskonto i portalen:

### Steg

1. Klicka på knappen **Lägg till administratör** i det övre högra hörnet av sidan Adminanvändare.
2. En skapandedialog visas med följande fält:

| Fält | Beskrivning | Krav |
|------|-------------|------|
| **E-post** | Inloggnings-e-posten för den nya administratören | Obligatoriskt. Måste vara en giltig, unik e-postadress. |
| **Visningsnamn** | Namnet som visas i portalens gränssnitt | Obligatoriskt. 2-50 tecken. |
| **Lösenord** | Det initiala inloggningslösenordet | Obligatoriskt. Minst 8 tecken, måste inkludera versal, gemen och en siffra. |
| **Roll** | Åtkomstrollen för denna administratör | Obligatoriskt. Välj från rullgardinsmenyn. |

3. Fyll i fältet **E-post** med den nya administratörens e-postadress.
4. Ange ett **Visningsnamn** som identifierar denna administratör i portalen.
5. Ställ in ett initialt **Lösenord** som uppfyller komplexitetskraven.
6. Välj lämplig **Roll** från rullgardinsmenyn.
7. Klicka på **Skapa** för att lägga till administratörskontot.
8. Ett framgångsmeddelande bekräftar att kontot skapades.
9. Den nya administratören visas i tabellen och kan nu logga in.

> **Tips:** Efter att ha skapat ett konto, informera den nya administratören om deras uppgifter via en säker kanal. Rekommendera att de byter lösenord vid första inloggningen.

---

## Redigera en administratör

Du kan ändra en befintlig administratörs visningsnamn, roll och status.

### Steg

1. Hitta administratören i tabellen Adminanvändare.
2. Klicka på knappen **Redigera** (pennikonen) i kolumnen Åtgärder.
3. En redigeringsdialog visas med aktuella värden ifyllda.

### Redigerbara fält

| Fält | Beskrivning | Anteckningar |
|------|-------------|--------------|
| **Visningsnamn** | Uppdatera administratörens synliga namn | 2-50 tecken |
| **Roll** | Ändra administratörens åtkomstnivå | Kan inte tilldela en roll högre än din egen |
| **Status** | Ställ in till Aktiv eller Avstängd | Avstängda administratörer kan inte logga in |

4. Ändra fälten efter behov.
5. Klicka på **Spara ändringar** för att tillämpa uppdateringarna.
6. Ett framgångsmeddelande bekräftar att ändringarna sparades.

### Ändra status

- **Aktiv** -- Administratören kan logga in och använda portalen normalt.
- **Avstängd** -- Administratören kan inte logga in. Befintliga sessioner avslutas omedelbart.

> **Obs:** Att stänga av en administratör är reversibelt. Använd det när du behöver tillfälligt återkalla åtkomst utan att ta bort kontot.

### Begränsningar

- Du kan inte redigera din egen roll (för att förhindra oavsiktlig självnedgradering).
- Du kan inte ändra en super_admins roll om du inte också är super_admin.
- E-post kan inte ändras efter kontoskapande.

---

## Detaljerad behörighetskonfiguration per sida

Utöver roller stöder adminportalen finkorning behörighetskontroll per sida. Detta låter dig anpassa exakt vilka sidor och åtgärder varje administratör har åtkomst till.

### Komma åt behörighetskonfiguration

1. Klicka på knappen **Redigera** på administratören du vill konfigurera.
2. I redigeringsdialogen, navigera till sektionen **Behörigheter** (eller fliken).
3. En behörighetsmatris visas med alla portalsidor.

### Behörighetsmatrisens struktur

Behörighetsmatrisen visar varje portalsida som en rad med följande kontroller:

| Kontroll | Beskrivning |
|----------|-------------|
| **Åtkomstväxel** | En switch som aktiverar eller inaktiverar åtkomst till hela sidan |
| **Åtgärds-multiväljare** | En rullgardinsmeny som låter dig välja vilka specifika åtgärder som är tillåtna på den sidan |

### Tillgängliga sidor i matrisen

| Sida | Möjliga åtgärder |
|------|-------------------|
| Instrumentpanel | Visa |
| Användare | Visa, Skapa, Redigera, Ta bort, Stänga av |
| Husdjur | Visa, Skapa, Redigera, Ta bort |
| Hälsojournaler | Visa, Skapa, Redigera, Ta bort |
| Vaccinationer | Visa, Skapa, Redigera, Ta bort |
| Avel | Visa, Skapa, Redigera, Ta bort |
| Feedback | Visa, Svara, Stänga, Fästa |
| Notifikationer | Visa, Skicka |
| Analyser | Visa, Exportera |
| Inställningar | Visa, Redigera |
| Adminanvändare | Visa, Skapa, Redigera, Ta bort |

### Konfigurera behörigheter

1. För varje sidrad, växla **Åtkomst**-switchen:
   - **PÅ** -- Administratören kan komma åt denna sida (specifika åtgärder kontrolleras nedan).
   - **AV** -- Administratören kan inte se eller navigera till denna sida alls.
2. För sidor med åtkomst aktiverad, klicka på rullgardinsmenyn **Åtgärder**.
3. Välj de specifika åtgärder som denna administratör får utföra:
   - Markera varje åtgärd du vill bevilja.
   - Avmarkera åtgärder du vill begränsa.
4. Upprepa för varje sida efter behov.
5. Klicka på **Spara ändringar** för att tillämpa behörighetskonfigurationen.

### Hur behörigheter samverkar med roller

- Rollbehörigheter fungerar som **grundlinje**.
- Behörigheter per sida kan **begränsa** åtkomst under rollens grundlinje.
- Behörigheter per sida **kan inte bevilja** åtkomst utöver vad rollen tillåter.
- Exempel: En användare med admin-roll har åtkomst till alla innehållssidor som standard. Du kan begränsa deras åtkomst till sidan Avel genom att stänga av den, men du kan inte ge dem åtkomst till Inställningar (reserverat för super_admin).

> **Tips:** Använd detaljerade behörigheter när du har teammedlemmar som behöver en specifik delmängd av administratörsfunktioner. Till exempel kan en kundsupportagent ha rollen "admin" men vara begränsad till enbart sidorna Feedback och Användare.

---

## Ta bort en administratör

Att ta bort ett administratörskonto raderar det permanent från systemet.

### Steg

1. Hitta administratören i tabellen Adminanvändare.
2. Klicka på knappen **Ta bort** (papperskorgsikonen) i kolumnen Åtgärder.
3. En bekräftelsedialog visas med administratörens namn och e-post.
4. Skriv administratörens e-postadress för att bekräfta borttagning (säkerhetsåtgärd).
5. Klicka på **Bekräfta borttagning** för att permanent ta bort kontot.
6. Ett framgångsmeddelande bekräftar borttagningen.
7. Administratören tas bort från tabellen och kan inte längre logga in.

### Borttagningsbegränsningar

| Begränsning | Orsak |
|-------------|-------|
| Kan inte ta bort en super_admin | Förhindrar oavsiktlig utelåsning av systemet |
| Kan inte ta bort ditt eget konto | Förhindrar självborttagning |
| Kan inte ta bort om du saknar tillräcklig roll | Rollhierarkiregler gäller |

> **Varning:** Borttagning är permanent och kan inte ångras. Om du behöver tillfälligt ta bort åtkomst, använd statusen Avstängd istället.

---

## Förklaring av behörighetsmatrisen

Behörighetssystemet i Petfolioo använder en skiktad metod:

### Lager 1: Rollbaserad åtkomstkontroll (RBAC)

Varje roll har en fördefinierad uppsättning behörigheter som fungerar som utgångspunkt:

```
super_admin  -->  Alla sidor, alla åtgärder, inga begränsningar
admin        -->  Alla innehålls-/användarsidor, alla åtgärder (utom Inställningar)
moderator    -->  Innehållsgranskningssidor, begränsade åtgärder (visa, svara, stänga)
viewer       -->  Alla tillgängliga sidor, skrivskyddad
```

### Lager 2: Åsidosättningar per sida

Detaljerade behörigheter lägger till ett andra lager ovanpå RBAC:

```
Rollbehörigheter  (grundlinje)
    |
    v
Växlar per sida  (kan begränsa, kan inte expandera utöver roll)
    |
    v
Slutgiltiga effektiva behörigheter  (vad administratören faktiskt ser)
```

### Exempelscenarier

**Scenario 1: Kundsupportagent**
- Roll: admin
- Åsidosättning: Inaktivera åtkomst till Husdjur, Hälsojournaler, Avel, Analyser, Adminanvändare
- Resultat: Kan bara komma åt Instrumentpanel, Användare, Feedback och Notifikationer

**Scenario 2: Innehållsgranskare**
- Roll: moderator
- Åsidosättning: Aktivera Feedback (Visa, Svara, Stänga), Användare (Enbart visa)
- Resultat: Kan granska feedback och slå upp användarprofiler men kan inte ändra användare

**Scenario 3: Analysobservatör**
- Roll: viewer
- Åsidosättning: Aktivera enbart Instrumentpanel och Analyser
- Resultat: Kan visa diagram och mätvärden men inget annat

### Visa effektiva behörigheter

1. Öppna redigeringsdialogen för valfri administratör.
2. Sektionen Behörigheter visar det aktuella effektiva tillståndet.
3. Växlar och åtgärdsval speglar vad som för närvarande är beviljat.
4. Inaktiverade (gråade) åtgärder indikerar de som ligger utanför rollens tillåtelse.

---

## Bästa praxis för säkerhet

1. **Principen om minsta privilegium** -- Tilldela den lägsta roll och behörigheter som behövs för varje administratörs arbetsuppgift.
2. **Regelbundna revisioner** -- Granska administratörskonton kvartalsvis. Ta bort konton som inte längre behövs.
3. **Stäng av före borttagning** -- Vid offboarding, stäng av först för att säkerställa ingen störning, ta sedan bort efter en karensperiod.
4. **Begränsa super_admins** -- Håll antalet super_admin-konton till ett minimum (helst 1-2).
5. **Starka lösenord** -- Tillämpa komplexa lösenord och rekommendera lösenordshanterare.
6. **Övervaka aktivitet** -- Kontrollera vem som loggar in och när genom systemloggarna.

---

## Felsökning

| Problem | Lösning |
|---------|---------|
| Kan inte skapa administratör | Verifiera att du har tillräckliga rollprivilegier. Kontrollera att e-posten inte redan används. |
| Kan inte se Redigera/Ta bort-knapparna | Din roll har inte behörighet att hantera administratörer på eller över målets rollnivå. |
| Administratör kan inte logga in efter skapande | Verifiera att kontostatusen är Aktiv. Bekräfta att lösenordet angavs korrekt. |
| Behörighetsändringar träder inte i kraft | Administratören kan behöva logga ut och logga in igen för att behörighetsändringar ska tillämpas. |
| Kan inte ta bort en super_admin | Detta är avsiktligt. Super_admin-konton kan inte tas bort via gränssnittet. |

---

## Relaterade sidor

- [Inställningar](./settings.md) -- Konfigurera systemsäkerhetsinställningar
- [Feedback](./feedback.md) -- Hantera användarfeedback (kräver åtkomst till sidan Feedback)
- [Analyser](./analytics.md) -- Visa plattformsmätvärden (kräver åtkomst till sidan Analyser)
