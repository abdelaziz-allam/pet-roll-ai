# Verificação de Criador

O módulo de Verificação de Criador permite aos administradores rever, aprovar, rejeitar e revogar pedidos de verificação de criadores. Os criadores verificados recebem um badge de confiança visível para os compradores, sinalizando que o seu canil cumpre os padrões da plataforma.

![Verification](/docs/screenshots/verification.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Approve, Reject |
> | Admin | View, Approve, Reject |
> | Moderator | View, Approve, Reject |
> | Viewer | View only |

---

## Tabela de Pedidos de Verificação

A vista principal apresenta todas as submissões de verificação numa tabela pesquisável e ordenável.

| Coluna | Descrição |
|--------|-------------|
| Nome do Criador | Nome completo do criador que submeteu o pedido |
| Canil | Nome do canil registado associado ao criador |
| Submissão # | Número de submissão auto-incrementado (resubmissões recebem um novo número) |
| Contagem de Documentos | Número de documentos carregados anexados à submissão |
| Estado | Badge de estado de verificação atual |
| Expiração | Data de expiração da verificação (apenas mostrada para submissões aprovadas) |

### Filtrar a Tabela

1. Utilize o dropdown **Estado** para filtrar por: Pendente, Aprovado, Rejeitado, Revogado ou Expirado.
2. Utilize o campo de **Pesquisa** para encontrar um criador por nome ou canil.
3. Clique em qualquer cabeçalho de coluna para ordenar ascendente ou descendente.

> **Dica:** A vista predefinida mostra submissões Pendentes primeiro para que possa priorizar novos pedidos.

---

## Fluxo de Estados

Os pedidos de verificação seguem um ciclo de vida definido:

```
Pendente --> Aprovado --> Expirado (automático, após data de expiração)
   |            |
   |            +--> Revogado (ação manual do admin)
   |
   +--> Rejeitado (criador pode resubmeter)
```

### Definições de Estado

| Estado | Cor do Badge | Significado |
|--------|-------------|---------|
| Pendente | Laranja | A aguardar revisão do administrador |
| Aprovado | Verde | Criador está verificado e o badge está ativo |
| Rejeitado | Vermelho | A submissão não cumpriu os requisitos |
| Revogado | Vermelho Escuro | Administrador removeu manualmente o estatuto de verificado |
| Expirado | Cinza | O período de verificação terminou; criador deve resubmeter |

### Transições

- **Pendente** pode transitar para **Aprovado** ou **Rejeitado**.
- **Aprovado** pode transitar para **Revogado** (manual) ou **Expirado** (automático).
- **Rejeitado** e **Expirado** permitem ao criador criar uma nova submissão (nova entrada Pendente).
- **Revogado** é um estado terminal para essa submissão.

---

## Rever uma Submissão

Para rever um pedido de verificação de criador:

1. Localize a submissão na tabela de Pedidos de Verificação.
2. Clique na linha ou no botão de ação **Rever** no lado direito.
3. O **Modal de Detalhe da Submissão** abre com dois separadores:
   - **Submissão Atual** -- Mostra os documentos ativos e detalhes do criador.
   - **Histórico de Submissões** -- Mostra todas as submissões anteriores deste criador.

### Separador de Submissão Atual

Este separador apresenta:

- Informação do perfil do criador (nome, email, telefone, número de registo do canil)
- Documentos carregados num layout de grelha
- Data e hora da submissão
- Quaisquer notas que o criador incluiu com a submissão

### Separador de Histórico de Submissões

Este separador mostra uma lista cronológica de todas as submissões do mesmo criador, incluindo:

- Número da submissão
- Data de submissão
- Estado final
- Nome do revisor
- Motivo de rejeição (se aplicável)

> **Dica:** Utilize o separador de Histórico de Submissões para verificar se um criador abordou os motivos de rejeição anteriores antes de aprovar uma resubmissão.

---

## Pré-visualização de Documentos

Cada documento carregado aparece como uma miniatura na grelha de documentos.

1. Clique em qualquer miniatura de documento para abrir uma pré-visualização em tamanho completo.
2. Utilize os controlos de zoom para inspecionar detalhes do documento.
3. Navegue entre documentos usando as setas esquerda/direita na sobreposição de pré-visualização.
4. Prima **Escape** ou clique no botão de fechar para regressar ao modal de detalhe.

Os formatos de documento suportados incluem:

- Imagens JPEG e PNG
- Documentos PDF (renderizados como imagens de página)

> **Dica:** Procure clareza, autenticidade e completude ao rever documentos carregados. Documentos desfocados ou parciais devem ser rejeitados com instruções claras para resubmissão.

---

## Aprovar uma Submissão

Para aprovar um pedido de verificação de criador:

1. Abra o modal de detalhe da submissão clicando na linha da tabela.
2. Reveja todos os documentos carregados cuidadosamente.
3. Clique no botão **Aprovar** no fundo do modal.
4. No diálogo de confirmação:
   - Defina a **Data de Expiração** para a verificação. O padrão é 1 ano a partir de hoje.
   - Opcionalmente ajuste a data se um período mais curto ou longo for apropriado.
5. Clique em **Confirmar Aprovação**.

### O Que Acontece Após a Aprovação

- O perfil do criador recebe o badge de verificado imediatamente.
- O criador é notificado via email e notificação na app.
- O estado da submissão muda para **Aprovado** na tabela.
- A data de expiração aparece na coluna de Expiração.
- Quando a data de expiração passar, o estado transita automaticamente para **Expirado**.

> **Dica:** Para novos criadores com documentação limitada, considere definir uma expiração mais curta (6 meses) para solicitar uma re-verificação mais cedo.

---

## Rejeitar uma Submissão

Para rejeitar um pedido de verificação de criador:

1. Abra o modal de detalhe da submissão.
2. Reveja os documentos e identifique o(s) problema(s).
3. Clique no botão **Rejeitar** no fundo do modal.
4. No diálogo de rejeição:
   - Introduza um **Motivo de Rejeição** na área de texto. Este campo é obrigatório.
   - Seja específico sobre o que está em falta ou é inadequado.
5. Clique em **Confirmar Rejeição**.

### O Que Acontece Após a Rejeição

- O estado da submissão muda para **Rejeitado**.
- O motivo da rejeição é visível para o criador no seu painel.
- O criador recebe uma notificação explicando a rejeição.
- O criador pode criar uma nova submissão para resolver os problemas.

### Escrever Bons Motivos de Rejeição

| Fazer | Não Fazer |
|----|--------|
| "O documento de registo do canil está expirado (2019). Por favor carregue um registo atual." | "Documentos insuficientes." |
| "A foto das instalações é demasiado desfocada para verificar as condições. Por favor resubmeta com imagens mais claras." | "Fotos más." |
| "Faltam registos de vacinação para os animais de criação." | "Incompleto." |

> **Dica:** Motivos de rejeição claros reduzem idas e vindas e ajudam os criadores a submeter candidaturas completas na próxima tentativa.

---

## Revogar Verificação

A revogação remove imediatamente o estatuto de verificado de um criador. Utilize isto para violações de política ou documentação fraudulenta descoberta após aprovação.

1. Navegue até à tabela de Pedidos de Verificação.
2. Filtre por **Estado: Aprovado** para encontrar verificações ativas.
3. Clique na linha para abrir o detalhe da submissão.
4. Clique no botão **Revogar** (aparece apenas para submissões Aprovadas).
5. No diálogo de revogação:
   - Introduza o **Motivo da Revogação**. Este campo é obrigatório.
   - Confirme que compreende que a ação é imediata.
6. Clique em **Confirmar Revogação**.

### O Que Acontece Após a Revogação

- O badge de verificado é removido do perfil do criador imediatamente.
- O criador é notificado via email com o motivo da revogação.
- Todas as listagens ativas do criador apresentam um indicador de aviso.
- O estado da submissão muda para **Revogado** (estado terminal).
- O criador não pode resubmeter contra a mesma submissão; deve começar de novo.

> **Dica:** A revogação é uma ação séria. Documente o motivo detalhadamente em caso de disputas. Considere contactar o criador antes de revogar se o problema for menor.

---

## Vista de Cronologia

A Vista de Cronologia fornece um histórico visual da jornada de verificação de um criador.

1. Abra qualquer modal de detalhe de submissão.
2. Mude para o separador **Histórico de Submissões**.
3. A cronologia apresenta eventos em ordem cronológica:
   - Submissão criada
   - Documentos carregados
   - Revisão do admin iniciada
   - Estado alterado (com nome do revisor)
   - Avisos de expiração enviados
   - Resubmissões ligadas

### Ler a Cronologia

Cada entrada da cronologia mostra:

- **Data e hora** do evento
- **Ícone do tipo de evento** (documento, alteração de estado, notificação)
- **Ator** (nome do criador ou nome do admin)
- **Detalhes** (texto do motivo, nomes de documentos, data de expiração definida)

### Casos de Uso da Cronologia

- **Resolução de disputas:** Ver o histórico completo quando um criador contesta uma rejeição.
- **Trilha de auditoria:** Rastrear qual admin reviu e aprovou/rejeitou cada submissão.
- **Deteção de padrões:** Identificar criadores que submetem repetidamente documentação inadequada.

> **Dica:** A cronologia é apenas de leitura. Todas as ações (aprovar, rejeitar, revogar) devem ser realizadas a partir do separador de Submissão Atual.

---

## Atalhos de Teclado

| Atalho | Ação |
|----------|--------|
| Enter | Abrir submissão selecionada |
| Escape | Fechar modal |
| Tab | Alternar entre separadores do modal |
| Teclas de seta | Navegar entre documentos na pré-visualização |

---

## Perguntas Frequentes

**P: Posso aprovar uma submissão com condições?**
R: Não. As aprovações são incondicionais. Se os documentos forem parcialmente aceitáveis, rejeite com instruções específicas sobre o que corrigir e depois aprove a resubmissão.

**P: O que acontece às listagens de um criador quando a sua verificação expira?**
R: As listagens permanecem ativas mas o badge de verificado é removido. O criador é notificado 30 dias antes da expiração para encorajar a resubmissão.

**P: Um criador revogado pode recandidatar-se?**
R: Sim, mas deve criar uma submissão inteiramente nova. A submissão revogada anterior permanece no histórico para fins de auditoria.

**P: Quem pode realizar ações de verificação?**
R: Apenas administradores com o role de Gestor de Verificação podem aprovar, rejeitar ou revogar submissões.
